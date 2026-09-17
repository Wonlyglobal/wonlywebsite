-- WONLY CMS governance: roles, audit trail, optimistic autosave, approvals and blocks.
-- This migration assumes the original cms_admins/cms_pages/cms_revisions tables exist.

create extension if not exists pgcrypto;

alter table public.cms_admins
  add column if not exists role text not null default 'super_admin',
  add column if not exists is_active boolean not null default true;

alter table public.cms_admins drop constraint if exists cms_admins_role_check;
alter table public.cms_admins add constraint cms_admins_role_check check (
  role in ('super_admin','editor','seo','translator','sales','reviewer','viewer')
);

alter table public.cms_pages
  add column if not exists content_version bigint not null default 1,
  add column if not exists workflow_status text not null default 'draft';

alter table public.cms_pages drop constraint if exists cms_pages_page_type_check;
alter table public.cms_pages add constraint cms_pages_page_type_check check (
  page_type in ('home','about','product','landing','content','article','legal')
);

alter table public.cms_pages drop constraint if exists cms_pages_workflow_status_check;
alter table public.cms_pages add constraint cms_pages_workflow_status_check check (
  workflow_status in ('draft','in_review','approved','published','changes_requested')
);

alter table public.cms_revisions drop constraint if exists cms_revisions_action_check;
alter table public.cms_revisions add constraint cms_revisions_action_check check (
  action in ('autosaved','draft_saved','submitted','approved','rejected','published','restored')
);

create table if not exists public.cms_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_review_requests (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  requested_version bigint not null,
  snapshot jsonb not null,
  snapshot_hash text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected','superseded','published')),
  requested_by uuid not null references auth.users(id),
  reviewed_by uuid references auth.users(id),
  review_comment text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.cms_page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  section_key text not null,
  label text not null,
  position integer not null default 0,
  is_hidden boolean not null default false,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(page_id, section_key)
);

create table if not exists public.cms_content_blocks (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.cms_page_sections(id) on delete cascade,
  block_type text not null check (block_type in ('text','image','button','video','product','faq','form','spacer')),
  position integer not null default 0,
  is_hidden boolean not null default false,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_audit_logs_created_idx on public.cms_audit_logs(created_at desc);
create index if not exists cms_review_requests_page_idx on public.cms_review_requests(page_id, created_at desc);
create index if not exists cms_page_sections_page_position_idx on public.cms_page_sections(page_id, position);
create index if not exists cms_content_blocks_section_position_idx on public.cms_content_blocks(section_id, position);

create or replace function public.cms_current_role()
returns text language sql stable security definer set search_path = public
as $$ select role from public.cms_admins where user_id = auth.uid() and is_active limit 1 $$;

create or replace function public.cms_can(capability text)
returns boolean language sql stable security definer set search_path = public
as $$
  select case public.cms_current_role()
    when 'super_admin' then true
    when 'editor' then capability = any(array['read','edit','submit','assets'])
    when 'seo' then capability = any(array['read','edit_seo','submit'])
    when 'translator' then capability = any(array['read','edit_translation','submit'])
    when 'reviewer' then capability = any(array['read','review','publish'])
    when 'sales' then capability = any(array['read','read_inquiries'])
    when 'viewer' then capability = 'read'
    else false end
$$;

create or replace function public.cms_save_draft(
  p_page_id uuid,
  p_content jsonb,
  p_expected_version bigint,
  p_action text default 'autosaved',
  p_locale text default 'en'
) returns public.cms_pages
language plpgsql security definer set search_path = public
as $$
declare v_page public.cms_pages;
begin
  if not public.cms_can('edit') then raise exception 'permission_denied'; end if;
  update public.cms_pages
     set draft_content = case when p_locale='en' then p_content else draft_content end,
         translations = case when p_locale='en' then translations else jsonb_set(translations,array[p_locale],p_content,true) end,
         content_version = content_version + 1,
         workflow_status = 'draft',
         updated_by = auth.uid(),
         updated_at = now()
   where id = p_page_id and content_version = p_expected_version
   returning * into v_page;
  if v_page.id is null then raise exception 'version_conflict'; end if;
  update public.cms_review_requests set status='superseded'
   where page_id=p_page_id and status in ('pending','approved');
  insert into public.cms_revisions(page_id,action,snapshot,created_by)
    values(p_page_id,case when p_action='draft_saved' then 'draft_saved' else 'autosaved' end,jsonb_build_object('locale',p_locale,'content',p_content),auth.uid());
  insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata)
    values(auth.uid(),p_action,'page',p_page_id::text,jsonb_build_object('version',v_page.content_version));
  return v_page;
end $$;

create or replace function public.cms_create_page(
  p_page_key text,p_page_type text,p_route text,p_title text,p_content jsonb
) returns public.cms_pages
language plpgsql security definer set search_path = public
as $$
declare v_page public.cms_pages;
begin
  if not public.cms_can('edit') then raise exception 'permission_denied'; end if;
  insert into public.cms_pages(page_key,page_type,route,title,source_locale,draft_content,translations,status,workflow_status,content_version,updated_by)
    values(p_page_key,p_page_type,p_route,p_title,'en',p_content,'{}'::jsonb,'draft','draft',1,auth.uid())
    returning * into v_page;
  insert into public.cms_revisions(page_id,action,snapshot,created_by) values(v_page.id,'draft_saved',p_content,auth.uid());
  insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata)
    values(auth.uid(),'created','page',v_page.id::text,jsonb_build_object('page_key',p_page_key));
  return v_page;
end $$;

create or replace function public.cms_submit_review(p_page_id uuid, p_expected_version bigint)
returns public.cms_review_requests
language plpgsql security definer set search_path = public
as $$
declare v_page public.cms_pages; v_request public.cms_review_requests;
begin
  if not public.cms_can('submit') then raise exception 'permission_denied'; end if;
  select * into v_page from public.cms_pages where id=p_page_id and content_version=p_expected_version for update;
  if v_page.id is null then raise exception 'version_conflict'; end if;
  update public.cms_review_requests set status='superseded' where page_id=p_page_id and status='pending';
  insert into public.cms_review_requests(page_id,requested_version,snapshot,snapshot_hash,requested_by)
    values(p_page_id,v_page.content_version,v_page.draft_content||jsonb_build_object('translations',v_page.translations),encode(digest((v_page.draft_content||jsonb_build_object('translations',v_page.translations))::text,'sha256'),'hex'),auth.uid()) returning * into v_request;
  update public.cms_pages set workflow_status='in_review',updated_at=now() where id=p_page_id;
  insert into public.cms_revisions(page_id,action,snapshot,created_by) values(p_page_id,'submitted',v_page.draft_content,auth.uid());
  insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata)
    values(auth.uid(),'submitted','page',p_page_id::text,jsonb_build_object('version',v_page.content_version,'request_id',v_request.id));
  return v_request;
end $$;

create or replace function public.cms_review(p_request_id uuid, p_decision text, p_comment text default '')
returns public.cms_review_requests
language plpgsql security definer set search_path = public
as $$
declare v_request public.cms_review_requests; v_action text;
begin
  if not public.cms_can('review') or p_decision not in ('approved','rejected') then raise exception 'permission_denied'; end if;
  select * into v_request from public.cms_review_requests where id=p_request_id and status='pending' for update;
  if v_request.id is null then raise exception 'review_not_pending'; end if;
  if v_request.requested_by=auth.uid() and public.cms_current_role()<>'super_admin' then raise exception 'self_approval_forbidden'; end if;
  update public.cms_review_requests set status=p_decision,reviewed_by=auth.uid(),review_comment=p_comment,reviewed_at=now()
    where id=p_request_id returning * into v_request;
  update public.cms_pages set workflow_status=case when p_decision='approved' then 'approved' else 'changes_requested' end,updated_at=now() where id=v_request.page_id;
  v_action := case when p_decision='approved' then 'approved' else 'rejected' end;
  insert into public.cms_revisions(page_id,action,snapshot,created_by) values(v_request.page_id,v_action,v_request.snapshot,auth.uid());
  insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata)
    values(auth.uid(),v_action,'review_request',p_request_id::text,jsonb_build_object('comment',p_comment));
  return v_request;
end $$;

create or replace function public.cms_publish_approved(p_page_id uuid)
returns public.cms_pages
language plpgsql security definer set search_path = public
as $$
declare v_page public.cms_pages; v_request public.cms_review_requests;
begin
  if not public.cms_can('publish') then raise exception 'permission_denied'; end if;
  select * into v_page from public.cms_pages where id=p_page_id for update;
  select * into v_request from public.cms_review_requests
   where page_id=p_page_id and status='approved' and requested_version=v_page.content_version
   order by reviewed_at desc limit 1;
  if v_request.id is null then raise exception 'approved_snapshot_required'; end if;
  update public.cms_pages set published_content=v_request.snapshot,status='published',workflow_status='published',published_at=now(),updated_at=now()
   where id=p_page_id returning * into v_page;
  update public.cms_review_requests set status='published' where id=v_request.id;
  insert into public.cms_revisions(page_id,action,snapshot,created_by) values(p_page_id,'published',v_request.snapshot,auth.uid());
  insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata)
    values(auth.uid(),'published','page',p_page_id::text,jsonb_build_object('version',v_page.content_version,'request_id',v_request.id));
  return v_page;
end $$;

alter table public.cms_audit_logs enable row level security;
alter table public.cms_review_requests enable row level security;
alter table public.cms_page_sections enable row level security;
alter table public.cms_content_blocks enable row level security;

grant select on public.cms_audit_logs,public.cms_review_requests,public.cms_page_sections,public.cms_content_blocks to authenticated;
grant insert,update,delete on public.cms_page_sections,public.cms_content_blocks to authenticated;
revoke execute on function public.cms_current_role(),public.cms_can(text),public.cms_create_page(text,text,text,text,jsonb),public.cms_save_draft(uuid,jsonb,bigint,text,text),public.cms_submit_review(uuid,bigint),public.cms_review(uuid,text,text),public.cms_publish_approved(uuid) from public,anon;
grant execute on function public.cms_current_role(),public.cms_can(text),public.cms_create_page(text,text,text,text,jsonb),public.cms_save_draft(uuid,jsonb,bigint,text,text),public.cms_submit_review(uuid,bigint),public.cms_review(uuid,text,text),public.cms_publish_approved(uuid) to authenticated;

create policy "CMS reads audit by role" on public.cms_audit_logs for select to authenticated using (public.cms_can('read'));
create policy "CMS reads reviews" on public.cms_review_requests for select to authenticated using (public.cms_can('read'));
create policy "CMS reads sections" on public.cms_page_sections for select to authenticated using (public.cms_can('read'));
create policy "CMS edits sections" on public.cms_page_sections for all to authenticated using (public.cms_can('edit')) with check (public.cms_can('edit'));
create policy "CMS reads blocks" on public.cms_content_blocks for select to authenticated using (public.cms_can('read'));
create policy "CMS edits blocks" on public.cms_content_blocks for all to authenticated using (public.cms_can('edit')) with check (public.cms_can('edit'));

revoke insert,update,delete on public.cms_audit_logs,public.cms_review_requests from authenticated;

-- Remove the original all-admin write path. Page mutations now go through the
-- security-definer functions above so role, version and approval checks cannot
-- be bypassed by calling the REST table endpoint directly.
drop policy if exists "CMS admin manages pages" on public.cms_pages;
drop policy if exists "CMS role reads pages" on public.cms_pages;
create policy "CMS role reads pages" on public.cms_pages for select to authenticated using (public.cms_can('read'));
revoke insert,update,delete on public.cms_pages from authenticated;
revoke insert on public.cms_revisions from authenticated;

drop policy if exists "CMS admin manages assets" on public.cms_assets;
drop policy if exists "CMS role reads assets" on public.cms_assets;
drop policy if exists "CMS role creates assets" on public.cms_assets;
create policy "CMS role reads assets" on public.cms_assets for select to authenticated using (public.cms_can('read'));
create policy "CMS role creates assets" on public.cms_assets for insert to authenticated with check (public.cms_can('assets') and uploaded_by=auth.uid());

drop policy if exists "CMS admins read site settings" on public.cms_site_settings;
drop policy if exists "CMS admins insert site settings" on public.cms_site_settings;
drop policy if exists "CMS admins update site settings" on public.cms_site_settings;
create policy "CMS role reads site settings" on public.cms_site_settings for select to authenticated using (public.cms_can('read'));
create policy "CMS role inserts site settings" on public.cms_site_settings for insert to authenticated with check (public.cms_can('edit') and updated_by=auth.uid());
create policy "CMS role updates site settings" on public.cms_site_settings for update to authenticated using (public.cms_can('edit')) with check (public.cms_can('edit') and updated_by=auth.uid());

drop policy if exists "CMS admin uploads website assets" on storage.objects;
drop policy if exists "CMS admin updates website assets" on storage.objects;
drop policy if exists "CMS admin deletes website assets" on storage.objects;
drop policy if exists "CMS admin lists website assets" on storage.objects;
create policy "CMS role uploads website assets" on storage.objects for insert to authenticated with check (bucket_id='website-assets' and owner_id=auth.uid()::text and public.cms_can('assets'));
create policy "CMS role updates website assets" on storage.objects for update to authenticated using (bucket_id='website-assets' and owner_id=auth.uid()::text and public.cms_can('assets')) with check (bucket_id='website-assets' and owner_id=auth.uid()::text);
create policy "CMS role deletes website assets" on storage.objects for delete to authenticated using (bucket_id='website-assets' and owner_id=auth.uid()::text and public.cms_can('assets'));
create policy "CMS role lists website assets" on storage.objects for select to authenticated using (bucket_id='website-assets' and public.cms_can('read'));
