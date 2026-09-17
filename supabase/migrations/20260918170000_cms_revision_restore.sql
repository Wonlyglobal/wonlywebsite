-- Restore an immutable historical revision into a new draft version.
create or replace function public.cms_restore_revision(p_revision_id uuid,p_expected_version bigint)
returns public.cms_pages language plpgsql security definer set search_path=public as $$
declare v_revision public.cms_revisions; v_page public.cms_pages; v_content jsonb; v_translations jsonb; v_locale text;
begin
 if not public.cms_can('edit') then raise exception 'permission_denied'; end if;
 select * into v_revision from public.cms_revisions where id=p_revision_id;
 if not found then raise exception 'revision_not_found'; end if;
 select * into v_page from public.cms_pages where id=v_revision.page_id and content_version=p_expected_version for update;
 if not found then raise exception 'version_conflict'; end if;

 v_locale:=coalesce(v_revision.snapshot->>'locale','en');
 v_content:=case when v_revision.snapshot?'content' then v_revision.snapshot->'content' else v_revision.snapshot-'translations' end;
 v_translations:=case when v_revision.snapshot?'translations' then v_revision.snapshot->'translations' else v_page.translations end;
 if v_locale<>'en' then v_translations:=jsonb_set(v_translations,array[v_locale],v_content,true); v_content:=v_page.draft_content; end if;

 update public.cms_pages set draft_content=v_content,translations=v_translations,content_version=content_version+1,workflow_status='draft',updated_by=auth.uid(),updated_at=now() where id=v_page.id returning * into v_page;
 update public.cms_review_requests set status='superseded' where page_id=v_page.id and status in ('pending','approved');
 update public.cms_publish_schedules set status='cancelled',error_message='content_changed_after_scheduling',updated_at=now() where page_id=v_page.id and status='pending';
 insert into public.cms_revisions(page_id,action,snapshot,created_by) values(v_page.id,'restored',jsonb_build_object('restored_revision_id',p_revision_id,'content',v_content,'translations',v_translations),auth.uid());
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'revision_restored','page',v_page.id::text,jsonb_build_object('source_revision_id',p_revision_id,'new_version',v_page.content_version));
 return v_page;
end $$;
revoke execute on function public.cms_restore_revision(uuid,bigint) from public,anon;
grant execute on function public.cms_restore_revision(uuid,bigint) to authenticated;
