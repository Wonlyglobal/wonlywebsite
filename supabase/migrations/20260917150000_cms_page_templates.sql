create table if not exists public.cms_page_templates(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  page_type text not null,
  snapshot jsonb not null,
  source_page_id uuid references public.cms_pages(id) on delete set null,
  is_active boolean not null default true,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cms_page_templates_type_idx on public.cms_page_templates(page_type,is_active,updated_at desc);
alter table public.cms_page_templates enable row level security;
grant select on public.cms_page_templates to authenticated;
revoke insert,update,delete on public.cms_page_templates from authenticated;
create policy "CMS reads page templates" on public.cms_page_templates for select to authenticated using(public.cms_can('read'));

create or replace function public.cms_create_template(p_page_id uuid,p_name text,p_description text default '') returns public.cms_page_templates
language plpgsql security definer set search_path=public as $$
declare v_page public.cms_pages;v_template public.cms_page_templates;
begin
 if not public.cms_can('edit') then raise exception 'permission_denied';end if;
 if length(trim(p_name))<2 then raise exception 'template_name_required';end if;
 select * into v_page from public.cms_pages where id=p_page_id;
 if v_page.id is null then raise exception 'page_not_found';end if;
 insert into public.cms_page_templates(name,description,page_type,snapshot,source_page_id,created_by) values(trim(p_name),coalesce(p_description,''),v_page.page_type,v_page.draft_content,v_page.id,auth.uid()) returning * into v_template;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'template_created','page_template',v_template.id::text,jsonb_build_object('source_page_id',v_page.id,'page_type',v_page.page_type));
 return v_template;
end $$;

create or replace function public.cms_apply_template(p_template_id uuid,p_page_id uuid,p_expected_version bigint) returns public.cms_pages
language plpgsql security definer set search_path=public as $$
declare v_template public.cms_page_templates;v_page public.cms_pages;
begin
 if not public.cms_can('edit') then raise exception 'permission_denied';end if;
 select * into v_template from public.cms_page_templates where id=p_template_id and is_active;
 if v_template.id is null then raise exception 'template_not_available';end if;
 update public.cms_pages set draft_content=v_template.snapshot,content_version=content_version+1,workflow_status='draft',updated_by=auth.uid(),updated_at=now() where id=p_page_id and content_version=p_expected_version returning * into v_page;
 if v_page.id is null then raise exception 'version_conflict';end if;
 update public.cms_review_requests set status='superseded' where page_id=p_page_id and status in ('pending','approved');
 update public.cms_publish_schedules set status='cancelled',cancelled_by=auth.uid(),updated_at=now(),error_message='content_changed_after_scheduling' where page_id=p_page_id and status='pending';
 insert into public.cms_revisions(page_id,action,snapshot,created_by) values(p_page_id,'draft_saved',v_template.snapshot,auth.uid());
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'template_applied','page',p_page_id::text,jsonb_build_object('template_id',p_template_id,'version',v_page.content_version));
 return v_page;
end $$;

create or replace function public.cms_set_template_active(p_template_id uuid,p_active boolean) returns public.cms_page_templates
language plpgsql security definer set search_path=public as $$
declare v_template public.cms_page_templates;
begin
 if not public.cms_can('edit') then raise exception 'permission_denied';end if;
 update public.cms_page_templates set is_active=p_active,updated_at=now() where id=p_template_id returning * into v_template;
 if v_template.id is null then raise exception 'template_not_found';end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),case when p_active then 'template_enabled' else 'template_disabled' end,'page_template',p_template_id::text,'{}'::jsonb);
 return v_template;
end $$;

revoke execute on function public.cms_create_template(uuid,text,text),public.cms_apply_template(uuid,uuid,bigint),public.cms_set_template_active(uuid,boolean) from public,anon;
grant execute on function public.cms_create_template(uuid,text,text),public.cms_apply_template(uuid,uuid,bigint),public.cms_set_template_active(uuid,boolean) to authenticated;

