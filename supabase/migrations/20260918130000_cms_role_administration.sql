-- Governed CMS administrator and role management.
alter table public.cms_admins add column if not exists updated_at timestamptz not null default now(), add column if not exists updated_by uuid references auth.users(id);

create or replace function public.cms_list_admins()
returns table(user_id uuid,email text,role text,is_active boolean,last_sign_in_at timestamptz,created_at timestamptz,updated_at timestamptz)
language plpgsql security definer set search_path=public,auth as $$
begin
 if public.cms_current_role()<>'super_admin' then raise exception 'permission_denied'; end if;
 return query select a.user_id,u.email::text,a.role,a.is_active,u.last_sign_in_at,u.created_at,a.updated_at from public.cms_admins a join auth.users u on u.id=a.user_id order by a.is_active desc,u.email;
end $$;

create or replace function public.cms_set_admin_role(p_user_id uuid,p_role text,p_is_active boolean)
returns void language plpgsql security definer set search_path=public as $$
declare v_before public.cms_admins; v_active_super_admins integer;
begin
 if public.cms_current_role()<>'super_admin' then raise exception 'permission_denied'; end if;
 if p_role not in ('super_admin','editor','seo','translator','sales','reviewer','viewer') then raise exception 'invalid_role'; end if;
 select * into v_before from public.cms_admins where user_id=p_user_id for update;
 if not found then raise exception 'admin_not_found'; end if;
 if v_before.role='super_admin' and v_before.is_active and (p_role<>'super_admin' or not p_is_active) then
  select count(*) into v_active_super_admins from public.cms_admins where role='super_admin' and is_active and user_id<>p_user_id;
  if v_active_super_admins=0 then raise exception 'last_super_admin_protected'; end if;
 end if;
 update public.cms_admins set role=p_role,is_active=p_is_active,updated_at=now(),updated_by=auth.uid() where user_id=p_user_id;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'admin_role_updated','cms_admin',p_user_id::text,jsonb_build_object('before_role',v_before.role,'before_active',v_before.is_active,'role',p_role,'is_active',p_is_active));
end $$;

create or replace function public.cms_register_invited_admin(p_user_id uuid,p_role text)
returns void language plpgsql security definer set search_path=public as $$
begin
 if auth.role()<>'service_role' then raise exception 'service_role_required'; end if;
 if p_role not in ('super_admin','editor','seo','translator','sales','reviewer','viewer') then raise exception 'invalid_role'; end if;
 insert into public.cms_admins(user_id,role,is_active,updated_at) values(p_user_id,p_role,true,now()) on conflict(user_id) do update set role=excluded.role,is_active=true,updated_at=now();
end $$;

revoke execute on function public.cms_list_admins(),public.cms_set_admin_role(uuid,text,boolean),public.cms_register_invited_admin(uuid,text) from public,anon;
grant execute on function public.cms_list_admins(),public.cms_set_admin_role(uuid,text,boolean) to authenticated;
grant execute on function public.cms_register_invited_admin(uuid,text) to service_role;
