create table if not exists public.cms_redirect_rules(
 id uuid primary key default gen_random_uuid(),source_path text not null unique,target_url text not null,http_status integer not null default 301 check(http_status in(301,302)),
 status text not null default 'draft' check(status in('draft','active','disabled')),version bigint not null default 1,hit_count bigint not null default 0,
 created_by uuid not null references auth.users(id),updated_by uuid not null references auth.users(id),activated_by uuid references auth.users(id),created_at timestamptz not null default now(),updated_at timestamptz not null default now(),activated_at timestamptz
);
alter table public.cms_redirect_rules enable row level security;
grant select on public.cms_redirect_rules to authenticated;
revoke insert,update,delete on public.cms_redirect_rules from authenticated;
create policy "CMS reads redirects" on public.cms_redirect_rules for select to authenticated using(public.cms_can('read'));

create or replace function public.cms_save_redirect(p_id uuid,p_source_path text,p_target_url text,p_http_status integer,p_expected_version bigint default null) returns public.cms_redirect_rules
language plpgsql security definer set search_path=public as $$
declare v_rule public.cms_redirect_rules;v_source text:=regexp_replace(trim(p_source_path),'/+$','');v_target text:=trim(p_target_url);
begin
 if not (public.cms_can('edit') or public.cms_can('edit_seo')) then raise exception 'permission_denied';end if;
 if v_source='' then v_source:='/';end if;
 if v_source not like '/%' or v_source like '%?%' or v_source like '%#%' then raise exception 'invalid_source_path';end if;
 if not (v_target like '/%' or v_target like 'https://%') then raise exception 'invalid_target_url';end if;
 if v_target=v_source then raise exception 'self_redirect_forbidden';end if;
 if p_http_status not in(301,302) then raise exception 'invalid_http_status';end if;
 if v_target like '/%' and exists(select 1 from public.cms_redirect_rules where source_path=v_target and target_url=v_source and status<>'disabled' and (p_id is null or id<>p_id)) then raise exception 'redirect_loop_detected';end if;
 if p_id is null then
  insert into public.cms_redirect_rules(source_path,target_url,http_status,created_by,updated_by) values(v_source,v_target,p_http_status,auth.uid(),auth.uid()) returning * into v_rule;
 else
  update public.cms_redirect_rules set source_path=v_source,target_url=v_target,http_status=p_http_status,status='draft',version=version+1,updated_by=auth.uid(),updated_at=now(),activated_by=null,activated_at=null where id=p_id and version=p_expected_version returning * into v_rule;
  if v_rule.id is null then raise exception 'version_conflict';end if;
 end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'redirect_draft_saved','redirect',v_rule.id::text,jsonb_build_object('source',v_source,'target',v_target,'status',p_http_status,'version',v_rule.version));
 return v_rule;
end $$;

create or replace function public.cms_set_redirect_status(p_id uuid,p_status text,p_expected_version bigint) returns public.cms_redirect_rules
language plpgsql security definer set search_path=public as $$
declare v_rule public.cms_redirect_rules;
begin
 if not public.cms_can('publish') then raise exception 'permission_denied';end if;
 if p_status not in('active','disabled') then raise exception 'invalid_redirect_status';end if;
 update public.cms_redirect_rules set status=p_status,version=version+1,updated_by=auth.uid(),updated_at=now(),activated_by=case when p_status='active' then auth.uid() else activated_by end,activated_at=case when p_status='active' then now() else activated_at end where id=p_id and version=p_expected_version returning * into v_rule;
 if v_rule.id is null then raise exception 'version_conflict';end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),case when p_status='active' then 'redirect_activated' else 'redirect_disabled' end,'redirect',p_id::text,jsonb_build_object('version',v_rule.version));
 return v_rule;
end $$;

create or replace view public.cms_active_redirects as select source_path,target_url,http_status,updated_at from public.cms_redirect_rules where status='active';
grant select on public.cms_active_redirects to anon,authenticated;
revoke execute on function public.cms_save_redirect(uuid,text,text,integer,bigint),public.cms_set_redirect_status(uuid,text,bigint) from public,anon;
grant execute on function public.cms_save_redirect(uuid,text,text,integer,bigint),public.cms_set_redirect_status(uuid,text,bigint) to authenticated;
