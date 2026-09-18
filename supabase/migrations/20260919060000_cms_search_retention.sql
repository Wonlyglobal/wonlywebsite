create or replace function public.cms_prune_search_events(p_keep_days integer default 180)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_keep_days integer:=least(greatest(coalesce(p_keep_days,180),30),365);v_deleted_searches integer:=0;
begin
 if auth.role()<>'service_role' then raise exception 'permission_denied';end if;
 with deleted as(delete from public.cms_search_events where searched_at<now()-make_interval(days=>v_keep_days)returning id)
 select count(*)into v_deleted_searches from deleted;
 return jsonb_build_object('keep_days',v_keep_days,'deleted_searches',v_deleted_searches,'completed_at',now());
end$$;
revoke execute on function public.cms_prune_search_events(integer)from public,anon,authenticated;
grant execute on function public.cms_prune_search_events(integer)to service_role;
