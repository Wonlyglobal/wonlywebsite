create table if not exists public.cms_forms(
 id uuid primary key default gen_random_uuid(),form_key text not null unique,title text not null,description text not null default '',draft_schema jsonb not null default '{"fields":[]}'::jsonb,published_schema jsonb,
 version bigint not null default 1,status text not null default 'draft' check(status in('draft','published','disabled')),success_message text not null default 'Thank you. We will contact you shortly.',created_by uuid not null references auth.users(id),updated_by uuid not null references auth.users(id),published_by uuid references auth.users(id),created_at timestamptz not null default now(),updated_at timestamptz not null default now(),published_at timestamptz
);
alter table public.cms_forms enable row level security;grant select on public.cms_forms to authenticated;revoke insert,update,delete on public.cms_forms from authenticated;
create policy "CMS reads forms" on public.cms_forms for select to authenticated using(public.cms_can('read'));

create or replace function public.cms_validate_form_schema(p_schema jsonb) returns boolean language plpgsql immutable as $$ declare f jsonb;keys text[]:='{}';begin
 if jsonb_typeof(p_schema)<>'object' or jsonb_typeof(p_schema->'fields')<>'array' or jsonb_array_length(p_schema->'fields')>20 then return false;end if;
 for f in select value from jsonb_array_elements(p_schema->'fields') loop
  if f->>'key' not in('name','company','job_title','country','email','phone','business_type','message','consent') or f->>'type' not in('text','email','tel','textarea','select','checkbox') or length(coalesce(f->>'label',''))<1 then return false;end if;
  if (f->>'key')=any(keys) then return false;end if;keys:=array_append(keys,f->>'key');
 end loop;return true;end $$;

create or replace function public.cms_save_form(p_id uuid,p_form_key text,p_title text,p_description text,p_schema jsonb,p_success_message text,p_expected_version bigint default null) returns public.cms_forms
language plpgsql security definer set search_path=public as $$ declare v_form public.cms_forms;
begin if not public.cms_can('edit') then raise exception 'permission_denied';end if;if p_form_key!~'^[a-z0-9_\-]{3,50}$' or not public.cms_validate_form_schema(p_schema) then raise exception 'invalid_form_schema';end if;
 if p_id is null then insert into public.cms_forms(form_key,title,description,draft_schema,success_message,created_by,updated_by) values(p_form_key,trim(p_title),coalesce(p_description,''),p_schema,coalesce(p_success_message,''),auth.uid(),auth.uid()) returning * into v_form;
 else update public.cms_forms set title=trim(p_title),description=coalesce(p_description,''),draft_schema=p_schema,success_message=coalesce(p_success_message,''),version=version+1,status='draft',updated_by=auth.uid(),updated_at=now() where id=p_id and version=p_expected_version returning * into v_form;if v_form.id is null then raise exception 'version_conflict';end if;end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'form_draft_saved','form',v_form.id::text,jsonb_build_object('form_key',v_form.form_key,'version',v_form.version));return v_form;end $$;

create or replace function public.cms_publish_form(p_id uuid,p_expected_version bigint) returns public.cms_forms
language plpgsql security definer set search_path=public as $$ declare v_form public.cms_forms;
begin if not public.cms_can('publish') then raise exception 'permission_denied';end if;
 update public.cms_forms set published_schema=draft_schema,status='published',published_by=auth.uid(),published_at=now(),updated_at=now() where id=p_id and version=p_expected_version returning * into v_form;if v_form.id is null then raise exception 'version_conflict';end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'form_published','form',p_id::text,jsonb_build_object('form_key',v_form.form_key,'version',v_form.version));return v_form;end $$;

create or replace view public.cms_published_forms as select form_key,title,description,published_schema as schema,success_message,updated_at from public.cms_forms where status='published' and published_schema is not null;
grant select on public.cms_published_forms to anon,authenticated;
revoke execute on function public.cms_validate_form_schema(jsonb),public.cms_save_form(uuid,text,text,text,jsonb,text,bigint),public.cms_publish_form(uuid,bigint) from public,anon;
grant execute on function public.cms_validate_form_schema(jsonb),public.cms_save_form(uuid,text,text,text,jsonb,text,bigint),public.cms_publish_form(uuid,bigint) to authenticated;
