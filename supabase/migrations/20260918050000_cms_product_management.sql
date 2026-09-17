create table if not exists public.cms_products(
 id uuid primary key default gen_random_uuid(),product_key text not null unique,sku text not null unique,family text not null,route text not null unique,
 draft_data jsonb not null default '{}'::jsonb,published_data jsonb,translations jsonb not null default '{}'::jsonb,version bigint not null default 1,
 status text not null default 'draft' check(status in('draft','in_review','published','archived')),created_by uuid not null references auth.users(id),updated_by uuid not null references auth.users(id),published_by uuid references auth.users(id),created_at timestamptz not null default now(),updated_at timestamptz not null default now(),published_at timestamptz
);
alter table public.cms_products enable row level security;grant select on public.cms_products to authenticated;revoke insert,update,delete on public.cms_products from authenticated;
create policy "CMS reads products" on public.cms_products for select to authenticated using(public.cms_can('read'));
create index if not exists cms_products_family_status_idx on public.cms_products(family,status,updated_at desc);

create or replace function public.cms_validate_product_data(p_data jsonb) returns boolean language sql immutable as $$
 select jsonb_typeof(p_data)='object' and length(coalesce(p_data->>'model','')) between 1 and 100 and length(coalesce(p_data->>'title','')) between 1 and 180
 and length(coalesce(p_data->>'description',''))<=500 and coalesce(p_data->>'hero','') like '/%'
 and (not (p_data?'highlights') or jsonb_typeof(p_data->'highlights')='array') and (not (p_data?'specs') or jsonb_typeof(p_data->'specs')='array') and (not (p_data?'faq') or jsonb_typeof(p_data->'faq')='array')
$$;

create or replace function public.cms_save_product(p_id uuid,p_product_key text,p_sku text,p_family text,p_route text,p_data jsonb,p_expected_version bigint default null) returns public.cms_products
language plpgsql security definer set search_path=public as $$ declare v_product public.cms_products;
begin if not public.cms_can('edit') then raise exception 'permission_denied';end if;
 if p_product_key!~'^[a-z0-9][a-z0-9\-]{1,79}$' or p_sku!~'^[A-Za-z0-9][A-Za-z0-9._\-]{1,79}$' or p_route not like '/products/%' or not public.cms_validate_product_data(p_data) then raise exception 'invalid_product_data';end if;
 if p_id is null then insert into public.cms_products(product_key,sku,family,route,draft_data,created_by,updated_by) values(p_product_key,p_sku,p_family,p_route,p_data,auth.uid(),auth.uid()) returning * into v_product;
 else update public.cms_products set sku=p_sku,family=p_family,route=p_route,draft_data=p_data,status='draft',version=version+1,updated_by=auth.uid(),updated_at=now() where id=p_id and version=p_expected_version returning * into v_product;if v_product.id is null then raise exception 'version_conflict';end if;end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'product_draft_saved','product',v_product.id::text,jsonb_build_object('product_key',v_product.product_key,'sku',v_product.sku,'version',v_product.version));return v_product;end $$;

create or replace function public.cms_set_product_review(p_id uuid,p_expected_version bigint) returns public.cms_products language plpgsql security definer set search_path=public as $$ declare v_product public.cms_products;
begin if not public.cms_can('submit') then raise exception 'permission_denied';end if;update public.cms_products set status='in_review',updated_by=auth.uid(),updated_at=now() where id=p_id and version=p_expected_version and status='draft' returning * into v_product;if v_product.id is null then raise exception 'version_conflict_or_invalid_status';end if;insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'product_submitted','product',p_id::text,jsonb_build_object('version',v_product.version));return v_product;end $$;

create or replace function public.cms_publish_product(p_id uuid,p_expected_version bigint) returns public.cms_products language plpgsql security definer set search_path=public as $$ declare v_product public.cms_products;
begin if not public.cms_can('publish') then raise exception 'permission_denied';end if;update public.cms_products set published_data=draft_data,status='published',published_by=auth.uid(),published_at=now(),updated_at=now() where id=p_id and version=p_expected_version and status='in_review' and updated_by<>auth.uid() returning * into v_product;if v_product.id is null then raise exception 'self_approval_or_invalid_status';end if;insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'product_published','product',p_id::text,jsonb_build_object('product_key',v_product.product_key,'version',v_product.version));return v_product;end $$;

create or replace view public.cms_published_products as select product_key,sku,family,route,published_data as data,translations,updated_at from public.cms_products where status='published' and published_data is not null;
grant select on public.cms_published_products to anon,authenticated;
revoke execute on function public.cms_validate_product_data(jsonb),public.cms_save_product(uuid,text,text,text,text,jsonb,bigint),public.cms_set_product_review(uuid,bigint),public.cms_publish_product(uuid,bigint) from public,anon;
grant execute on function public.cms_validate_product_data(jsonb),public.cms_save_product(uuid,text,text,text,text,jsonb,bigint),public.cms_set_product_review(uuid,bigint),public.cms_publish_product(uuid,bigint) to authenticated;
