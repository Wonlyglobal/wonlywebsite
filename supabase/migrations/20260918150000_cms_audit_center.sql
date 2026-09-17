-- Paginated, role-restricted audit center.
create or replace function public.cms_list_audit_logs(p_query text default null,p_action text default null,p_resource_type text default null,p_from timestamptz default null,p_to timestamptz default null,p_limit integer default 50,p_offset integer default 0)
returns table(id uuid,actor_id uuid,actor_email text,action text,resource_type text,resource_id text,metadata jsonb,created_at timestamptz,total_count bigint)
language plpgsql security definer set search_path=public,auth as $$
begin
 if public.cms_current_role() not in ('super_admin','reviewer') then raise exception 'permission_denied'; end if;
 if p_limit<1 or p_limit>200 or p_offset<0 then raise exception 'invalid_pagination'; end if;
 return query
 select l.id,l.actor_id,u.email::text,l.action,l.resource_type,l.resource_id,l.metadata,l.created_at,count(*) over()
 from public.cms_audit_logs l left join auth.users u on u.id=l.actor_id
 where (nullif(trim(p_query),'') is null or coalesce(u.email,'') ilike '%'||trim(p_query)||'%' or coalesce(l.resource_id,'') ilike '%'||trim(p_query)||'%' or l.metadata::text ilike '%'||trim(p_query)||'%')
 and (nullif(p_action,'') is null or l.action=p_action)
 and (nullif(p_resource_type,'') is null or l.resource_type=p_resource_type)
 and (p_from is null or l.created_at>=p_from) and (p_to is null or l.created_at<p_to)
 order by l.created_at desc limit p_limit offset p_offset;
end $$;

revoke execute on function public.cms_list_audit_logs(text,text,text,timestamptz,timestamptz,integer,integer) from public,anon;
grant execute on function public.cms_list_audit_logs(text,text,text,timestamptz,timestamptz,integer,integer) to authenticated;

create or replace function public.cms_prevent_audit_mutation() returns trigger language plpgsql as $$ begin raise exception 'audit_logs_are_immutable'; end $$;
drop trigger if exists cms_audit_logs_immutable on public.cms_audit_logs;
create trigger cms_audit_logs_immutable before update or delete on public.cms_audit_logs for each row execute function public.cms_prevent_audit_mutation();
