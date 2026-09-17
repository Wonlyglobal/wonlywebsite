create table if not exists public.cms_navigation(
 id uuid primary key default gen_random_uuid(),navigation_key text not null unique default 'primary',draft_tree jsonb not null default '[]'::jsonb,published_tree jsonb,version bigint not null default 1,status text not null default 'draft' check(status in('draft','published')),
 updated_by uuid not null references auth.users(id),published_by uuid references auth.users(id),updated_at timestamptz not null default now(),published_at timestamptz
);
alter table public.cms_navigation enable row level security;grant select on public.cms_navigation to authenticated;revoke insert,update,delete on public.cms_navigation from authenticated;
create policy "CMS reads navigation" on public.cms_navigation for select to authenticated using(public.cms_can('read'));

create or replace function public.cms_validate_navigation_items(p_items jsonb,p_depth integer default 1) returns boolean language plpgsql immutable as $$ declare item jsonb;begin
 if jsonb_typeof(p_items)<>'array' or jsonb_array_length(p_items)>30 or p_depth>3 then return false;end if;
 for item in select value from jsonb_array_elements(p_items) loop
  if length(coalesce(item->>'id',''))<2 or length(coalesce(item->>'label',''))<1 or length(item->>'label')>80 then return false;end if;
  if coalesce(item->>'url','')<>'' and not ((item->>'url') like '/%' or (item->>'url') like 'https://%') then return false;end if;
  if item?'children' and not public.cms_validate_navigation_items(item->'children',p_depth+1) then return false;end if;
 end loop;return true;end $$;

create or replace function public.cms_save_navigation(p_navigation_key text,p_tree jsonb,p_expected_version bigint default null) returns public.cms_navigation
language plpgsql security definer set search_path=public as $$ declare v_nav public.cms_navigation;
begin if not public.cms_can('edit') then raise exception 'permission_denied';end if;if not public.cms_validate_navigation_items(p_tree,1) then raise exception 'invalid_navigation_tree';end if;
 insert into public.cms_navigation(navigation_key,draft_tree,updated_by) values(p_navigation_key,p_tree,auth.uid()) on conflict(navigation_key) do update set draft_tree=excluded.draft_tree,status='draft',version=public.cms_navigation.version+1,updated_by=auth.uid(),updated_at=now() where p_expected_version is null or public.cms_navigation.version=p_expected_version returning * into v_nav;
 if v_nav.id is null then raise exception 'version_conflict';end if;insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'navigation_draft_saved','navigation',v_nav.id::text,jsonb_build_object('key',p_navigation_key,'version',v_nav.version,'items',jsonb_array_length(p_tree)));return v_nav;end $$;

create or replace function public.cms_publish_navigation(p_navigation_key text,p_expected_version bigint) returns public.cms_navigation language plpgsql security definer set search_path=public as $$ declare v_nav public.cms_navigation;
begin if not public.cms_can('publish') then raise exception 'permission_denied';end if;update public.cms_navigation set published_tree=draft_tree,status='published',published_by=auth.uid(),published_at=now(),updated_at=now() where navigation_key=p_navigation_key and version=p_expected_version and updated_by<>auth.uid() returning * into v_nav;if v_nav.id is null then raise exception 'self_approval_or_version_conflict';end if;insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'navigation_published','navigation',v_nav.id::text,jsonb_build_object('key',p_navigation_key,'version',v_nav.version));return v_nav;end $$;

create or replace view public.cms_published_navigation as select navigation_key,published_tree as items,updated_at from public.cms_navigation where status='published' and published_tree is not null;
grant select on public.cms_published_navigation to anon,authenticated;
revoke execute on function public.cms_validate_navigation_items(jsonb,integer),public.cms_save_navigation(text,jsonb,bigint),public.cms_publish_navigation(text,bigint) from public,anon;
grant execute on function public.cms_save_navigation(text,jsonb,bigint),public.cms_publish_navigation(text,bigint) to authenticated;
