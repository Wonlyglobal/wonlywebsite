alter table public.cms_assets add column if not exists alt_text text not null default '';
alter table public.cms_assets add column if not exists tags text[] not null default '{}';
alter table public.cms_assets add column if not exists status text not null default 'active';
alter table public.cms_assets add column if not exists replaced_by uuid references public.cms_assets(id) on delete set null;
alter table public.cms_assets add column if not exists updated_at timestamptz not null default now();
alter table public.cms_assets drop constraint if exists cms_assets_status_check;
alter table public.cms_assets add constraint cms_assets_status_check check(status in('active','archived','replaced','broken'));
create index if not exists cms_assets_search_idx on public.cms_assets(status,mime_type,created_at desc);

create or replace function public.cms_update_asset_metadata(p_asset_id uuid,p_alt_text text,p_tags text[],p_status text default 'active') returns public.cms_assets
language plpgsql security definer set search_path=public as $$ declare v_asset public.cms_assets;
begin if not public.cms_can('assets') then raise exception 'permission_denied';end if;if p_status not in('active','archived','broken') then raise exception 'invalid_asset_status';end if;
 update public.cms_assets set alt_text=left(coalesce(p_alt_text,''),300),tags=coalesce(p_tags,'{}'),status=p_status,updated_at=now() where id=p_asset_id returning * into v_asset;if v_asset.id is null then raise exception 'asset_not_found';end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'asset_metadata_updated','asset',p_asset_id::text,jsonb_build_object('status',p_status,'tags',to_jsonb(coalesce(p_tags,'{}'))));return v_asset;end $$;

create or replace function public.cms_replace_asset(p_old_asset_id uuid,p_new_asset_id uuid) returns jsonb
language plpgsql security definer set search_path=public as $$ declare v_old public.cms_assets;v_new public.cms_assets;v_count integer;
begin if not public.cms_can('assets') then raise exception 'permission_denied';end if;if p_old_asset_id=p_new_asset_id then raise exception 'same_asset_forbidden';end if;
 select * into v_old from public.cms_assets where id=p_old_asset_id for update;select * into v_new from public.cms_assets where id=p_new_asset_id;if v_old.id is null or v_new.id is null then raise exception 'asset_not_found';end if;
 update public.cms_pages set draft_content=replace(draft_content::text,to_json(v_old.public_url)::text,to_json(v_new.public_url)::text)::jsonb,translations=replace(translations::text,to_json(v_old.public_url)::text,to_json(v_new.public_url)::text)::jsonb,content_version=content_version+1,workflow_status='draft',updated_by=auth.uid(),updated_at=now() where draft_content::text like '%'||v_old.public_url||'%' or translations::text like '%'||v_old.public_url||'%';get diagnostics v_count=row_count;
 update public.cms_assets set status='replaced',replaced_by=p_new_asset_id,updated_at=now() where id=p_old_asset_id;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'asset_replaced','asset',p_old_asset_id::text,jsonb_build_object('new_asset_id',p_new_asset_id,'draft_pages_updated',v_count));return jsonb_build_object('draft_pages_updated',v_count,'published_content_changed',false);end $$;

revoke execute on function public.cms_update_asset_metadata(uuid,text,text[],text),public.cms_replace_asset(uuid,uuid) from public,anon;
grant execute on function public.cms_update_asset_metadata(uuid,text,text[],text),public.cms_replace_asset(uuid,uuid) to authenticated;
