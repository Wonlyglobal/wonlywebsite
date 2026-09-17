-- Evidence-backed GA4/GSC/CMS enquiry dashboard snapshots.
create table if not exists public.cms_analytics_syncs(id uuid primary key default gen_random_uuid(),status text not null default 'pending' check(status in('pending','running','completed','failed')),requested_by uuid not null references auth.users(id),requested_at timestamptz not null default now(),completed_at timestamptz,error_message text);
create table if not exists public.cms_analytics_snapshots(id uuid primary key default gen_random_uuid(),sync_id uuid not null references public.cms_analytics_syncs(id) on delete cascade,provider text not null check(provider in('ga4','gsc')),period_start date not null,period_end date not null,metrics jsonb not null,dimensions jsonb not null default '{}'::jsonb,source_updated_at timestamptz not null,fetched_at timestamptz not null default now(),unique(sync_id,provider));
create index if not exists cms_analytics_snapshots_latest_idx on public.cms_analytics_snapshots(provider,fetched_at desc);
alter table public.cms_analytics_syncs enable row level security; alter table public.cms_analytics_snapshots enable row level security;
grant select on public.cms_analytics_syncs,public.cms_analytics_snapshots to authenticated;
create policy "CMS reads analytics syncs" on public.cms_analytics_syncs for select to authenticated using(public.cms_current_role() in('super_admin','seo','reviewer','sales'));
create policy "CMS reads analytics snapshots" on public.cms_analytics_snapshots for select to authenticated using(public.cms_current_role() in('super_admin','seo','reviewer','sales'));

create or replace function public.cms_request_analytics_sync() returns public.cms_analytics_syncs language plpgsql security definer set search_path=public as $$ declare v_sync public.cms_analytics_syncs; begin
 if public.cms_current_role() not in('super_admin','seo') then raise exception 'permission_denied'; end if;
 if exists(select 1 from public.cms_analytics_syncs where status in('pending','running') and requested_at>now()-interval '15 minutes') then raise exception 'sync_already_running'; end if;
 insert into public.cms_analytics_syncs(requested_by) values(auth.uid()) returning * into v_sync;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'analytics_sync_requested','analytics_sync',v_sync.id::text,'{}'); return v_sync;
end $$;

create or replace function public.cms_record_analytics_sync(p_sync_id uuid,p_snapshots jsonb,p_error text default null) returns void language plpgsql security definer set search_path=public as $$ declare v_item jsonb; begin
 if auth.role()<>'service_role' then raise exception 'service_role_required'; end if;
 update public.cms_analytics_syncs set status=case when p_error is null then 'completed' else 'failed' end,completed_at=now(),error_message=p_error where id=p_sync_id and status in('pending','running');
 if not found then raise exception 'sync_not_mutable'; end if;
 if p_error is null then
  if jsonb_array_length(p_snapshots)<>2 then raise exception 'ga4_and_gsc_required'; end if;
  for v_item in select value from jsonb_array_elements(p_snapshots) loop
   if v_item->>'provider' not in('ga4','gsc') or jsonb_typeof(v_item->'metrics')<>'object' then raise exception 'invalid_snapshot'; end if;
   insert into public.cms_analytics_snapshots(sync_id,provider,period_start,period_end,metrics,dimensions,source_updated_at) values(p_sync_id,v_item->>'provider',(v_item->>'period_start')::date,(v_item->>'period_end')::date,v_item->'metrics',coalesce(v_item->'dimensions','{}'),(v_item->>'source_updated_at')::timestamptz);
  end loop;
 end if;
end $$;

create or replace function public.cms_inquiry_dashboard() returns jsonb language plpgsql stable security definer set search_path=public as $$ declare v_result jsonb; begin
 if public.cms_current_role() not in('super_admin','sales','reviewer') then raise exception 'permission_denied'; end if;
 select jsonb_build_object('total_28d',count(*) filter(where created_at>=now()-interval '28 days'),'previous_28d',count(*) filter(where created_at>=now()-interval '56 days' and created_at<now()-interval '28 days'),'new',count(*) filter(where status='new'),'contacted',count(*) filter(where status='contacted'),'qualified',count(*) filter(where status='qualified'),'closed',count(*) filter(where status='closed'),'source_updated_at',max(updated_at)) into v_result from public.cms_inquiries; return v_result;
end $$;
revoke execute on function public.cms_request_analytics_sync(),public.cms_record_analytics_sync(uuid,jsonb,text),public.cms_inquiry_dashboard() from public,anon;
grant execute on function public.cms_request_analytics_sync(),public.cms_inquiry_dashboard() to authenticated; grant execute on function public.cms_record_analytics_sync(uuid,jsonb,text) to service_role;
