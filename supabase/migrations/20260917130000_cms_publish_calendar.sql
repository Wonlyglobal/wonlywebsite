create table if not exists public.cms_publish_schedules (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.cms_pages(id) on delete cascade,
  review_request_id uuid not null references public.cms_review_requests(id),
  scheduled_for timestamptz not null,
  timezone text not null default 'Asia/Shanghai',
  status text not null default 'pending' check (status in ('pending','running','completed','cancelled','failed')),
  created_by uuid not null references auth.users(id),
  cancelled_by uuid references auth.users(id),
  executed_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists cms_publish_schedules_one_pending_page on public.cms_publish_schedules(page_id) where status='pending';
create index if not exists cms_publish_schedules_due_idx on public.cms_publish_schedules(status,scheduled_for);
alter table public.cms_publish_schedules enable row level security;
grant select on public.cms_publish_schedules to authenticated;
revoke insert,update,delete on public.cms_publish_schedules from authenticated;
create policy "CMS reads publish schedules" on public.cms_publish_schedules for select to authenticated using(public.cms_can('read'));

create or replace function public.cms_schedule_publish(p_page_id uuid,p_scheduled_for timestamptz,p_timezone text default 'Asia/Shanghai') returns public.cms_publish_schedules
language plpgsql security definer set search_path=public as $$
declare v_page public.cms_pages; v_review public.cms_review_requests; v_schedule public.cms_publish_schedules;
begin
  if not public.cms_can('publish') then raise exception 'permission_denied'; end if;
  if p_scheduled_for<=now() then raise exception 'schedule_must_be_future'; end if;
  select * into v_page from public.cms_pages where id=p_page_id for update;
  if v_page.id is null then raise exception 'page_not_found'; end if;
  if v_page.workflow_status<>'approved' then raise exception 'page_not_approved'; end if;
  select * into v_review from public.cms_review_requests where page_id=p_page_id and status='approved' and requested_version=v_page.content_version order by reviewed_at desc limit 1;
  if v_review.id is null then raise exception 'approved_snapshot_required'; end if;
  insert into public.cms_publish_schedules(page_id,review_request_id,scheduled_for,timezone,created_by) values(p_page_id,v_review.id,p_scheduled_for,coalesce(nullif(p_timezone,''),'Asia/Shanghai'),auth.uid()) returning * into v_schedule;
  insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'publish_scheduled','publish_schedule',v_schedule.id::text,jsonb_build_object('page_id',p_page_id,'scheduled_for',p_scheduled_for,'timezone',v_schedule.timezone,'version',v_page.content_version));
  return v_schedule;
exception when unique_violation then raise exception 'pending_schedule_exists';
end $$;

create or replace function public.cms_cancel_schedule(p_schedule_id uuid) returns public.cms_publish_schedules
language plpgsql security definer set search_path=public as $$
declare v_schedule public.cms_publish_schedules;
begin
  if not public.cms_can('publish') then raise exception 'permission_denied'; end if;
  update public.cms_publish_schedules set status='cancelled',cancelled_by=auth.uid(),updated_at=now() where id=p_schedule_id and status='pending' returning * into v_schedule;
  if v_schedule.id is null then raise exception 'schedule_not_pending'; end if;
  insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'publish_schedule_cancelled','publish_schedule',p_schedule_id::text,jsonb_build_object('page_id',v_schedule.page_id,'scheduled_for',v_schedule.scheduled_for));
  return v_schedule;
end $$;

create or replace function public.cms_run_due_publications(p_limit integer default 25)
returns table(schedule_id uuid,page_id uuid,result text)
language plpgsql security definer set search_path=public as $$
declare item public.cms_publish_schedules; v_page public.cms_pages; v_review public.cms_review_requests;
begin
  if auth.role()<>'service_role' then raise exception 'service_role_required'; end if;
  for item in select * from public.cms_publish_schedules where status='pending' and scheduled_for<=now() order by scheduled_for for update skip locked limit greatest(1,least(p_limit,100)) loop
    update public.cms_publish_schedules set status='running',updated_at=now() where id=item.id;
    begin
      select * into v_page from public.cms_pages where id=item.page_id for update;
      select * into v_review from public.cms_review_requests where id=item.review_request_id;
      if v_review.id is null or v_review.status<>'approved' or v_review.requested_version<>v_page.content_version or v_page.workflow_status<>'approved' then raise exception 'approved_snapshot_required'; end if;
      update public.cms_pages set published_content=v_review.snapshot,status='published',workflow_status='published',published_at=now(),updated_at=now() where id=v_page.id;
      update public.cms_review_requests set status='published' where id=v_review.id;
      update public.cms_publish_schedules set status='completed',executed_at=now(),updated_at=now(),error_message=null where id=item.id;
      insert into public.cms_revisions(page_id,action,snapshot,created_by) values(v_page.id,'published',v_review.snapshot,item.created_by);
      insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(item.created_by,'scheduled_publish_completed','publish_schedule',item.id::text,jsonb_build_object('page_id',v_page.id,'version',v_page.content_version));
      schedule_id:=item.id;page_id:=item.page_id;result:='completed';return next;
    exception when others then
      update public.cms_publish_schedules set status='failed',executed_at=now(),updated_at=now(),error_message=sqlerrm where id=item.id;
      insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(item.created_by,'scheduled_publish_failed','publish_schedule',item.id::text,jsonb_build_object('page_id',item.page_id,'error',sqlerrm));
      schedule_id:=item.id;page_id:=item.page_id;result:='failed';return next;
    end;
  end loop;
end $$;

revoke execute on function public.cms_schedule_publish(uuid,timestamptz,text),public.cms_cancel_schedule(uuid),public.cms_run_due_publications(integer) from public,anon;
grant execute on function public.cms_schedule_publish(uuid,timestamptz,text),public.cms_cancel_schedule(uuid) to authenticated;
grant execute on function public.cms_run_due_publications(integer) to service_role;
