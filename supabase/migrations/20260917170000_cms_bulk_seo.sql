create or replace function public.cms_bulk_update_seo(p_updates jsonb) returns jsonb
language plpgsql security definer set search_path=public as $$
declare
  v_item jsonb;
  v_page public.cms_pages;
  v_page_id uuid;
  v_expected_version bigint;
  v_seo jsonb;
  v_count integer:=0;
  v_results jsonb:='[]'::jsonb;
begin
  if not (public.cms_can('edit') or public.cms_can('edit_seo')) then raise exception 'permission_denied';end if;
  if jsonb_typeof(p_updates)<>'array' then raise exception 'updates_must_be_array';end if;
  if jsonb_array_length(p_updates)=0 or jsonb_array_length(p_updates)>100 then raise exception 'updates_count_out_of_range';end if;
  for v_item in select value from jsonb_array_elements(p_updates) loop
    v_page_id:=(v_item->>'page_id')::uuid;
    v_expected_version:=(v_item->>'expected_version')::bigint;
    v_seo:=coalesce(v_item->'seo','{}'::jsonb);
    if jsonb_typeof(v_seo)<>'object' or exists(select 1 from jsonb_object_keys(v_seo) as k where k not in ('title','description','canonical','robots','ogImage')) then raise exception 'invalid_seo_fields';end if;
    if length(coalesce(v_seo->>'title',''))>70 then raise exception 'seo_title_too_long';end if;
    if length(coalesce(v_seo->>'description',''))>180 then raise exception 'seo_description_too_long';end if;
    if coalesce(v_seo->>'canonical','')<>'' and not ((v_seo->>'canonical') like '/%' or (v_seo->>'canonical') like 'https://%') then raise exception 'invalid_canonical';end if;
    if coalesce(v_seo->>'robots','')<>'' and (v_seo->>'robots') not in ('index,follow','noindex,follow','noindex,nofollow') then raise exception 'invalid_robots';end if;
    update public.cms_pages
       set draft_content=jsonb_set(coalesce(draft_content,'{}'::jsonb),'{seo}',v_seo,true),
           content_version=content_version+1,workflow_status='draft',updated_by=auth.uid(),updated_at=now()
     where id=v_page_id and content_version=v_expected_version
     returning * into v_page;
    if v_page.id is null then raise exception 'version_conflict:%',v_page_id;end if;
    update public.cms_review_requests set status='superseded' where page_id=v_page_id and status in ('pending','approved');
    update public.cms_publish_schedules set status='cancelled',cancelled_by=auth.uid(),updated_at=now(),error_message='content_changed_after_scheduling' where page_id=v_page_id and status='pending';
    insert into public.cms_revisions(page_id,action,snapshot,created_by) values(v_page_id,'bulk_seo_saved',v_page.draft_content,auth.uid());
    insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'bulk_seo_updated','page',v_page_id::text,jsonb_build_object('version',v_page.content_version,'fields',(select jsonb_agg(k) from jsonb_object_keys(v_seo) k)));
    v_count:=v_count+1;
    v_results:=v_results||jsonb_build_array(jsonb_build_object('page_id',v_page_id,'content_version',v_page.content_version));
  end loop;
  return jsonb_build_object('updated',v_count,'pages',v_results);
end $$;

revoke execute on function public.cms_bulk_update_seo(jsonb) from public,anon;
grant execute on function public.cms_bulk_update_seo(jsonb) to authenticated;
