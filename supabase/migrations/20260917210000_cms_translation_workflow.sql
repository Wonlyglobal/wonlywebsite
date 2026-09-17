create table if not exists public.cms_translation_jobs(
 id uuid primary key default gen_random_uuid(),page_id uuid not null references public.cms_pages(id) on delete cascade,locale text not null check(locale in('ar','fr','ru','es','pt')),
 status text not null default 'assigned' check(status in('assigned','ai_draft','editing','in_review','approved','changes_requested')),
 source_version bigint not null,translation_version bigint not null default 0,assignee_id uuid references auth.users(id),reviewer_id uuid references auth.users(id),review_comment text not null default '',
 created_by uuid not null references auth.users(id),updated_by uuid not null references auth.users(id),created_at timestamptz not null default now(),updated_at timestamptz not null default now(),unique(page_id,locale)
);
alter table public.cms_translation_jobs enable row level security;
grant select on public.cms_translation_jobs to authenticated;
revoke insert,update,delete on public.cms_translation_jobs from authenticated;
create policy "CMS reads translation jobs" on public.cms_translation_jobs for select to authenticated using(public.cms_can('read'));

create or replace function public.cms_assign_translation(p_page_id uuid,p_locale text,p_assignee_id uuid default null) returns public.cms_translation_jobs
language plpgsql security definer set search_path=public as $$ declare v_page public.cms_pages;v_job public.cms_translation_jobs;
begin
 if not public.cms_can('edit') then raise exception 'permission_denied';end if;
 if p_locale not in('ar','fr','ru','es','pt') then raise exception 'unsupported_locale';end if;
 select * into v_page from public.cms_pages where id=p_page_id;if v_page.id is null then raise exception 'page_not_found';end if;
 insert into public.cms_translation_jobs(page_id,locale,source_version,assignee_id,created_by,updated_by) values(p_page_id,p_locale,v_page.content_version,p_assignee_id,auth.uid(),auth.uid())
 on conflict(page_id,locale) do update set status='assigned',source_version=excluded.source_version,assignee_id=excluded.assignee_id,reviewer_id=null,review_comment='',updated_by=auth.uid(),updated_at=now() returning * into v_job;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'translation_assigned','translation_job',v_job.id::text,jsonb_build_object('page_id',p_page_id,'locale',p_locale,'source_version',v_page.content_version));return v_job;
end $$;

create or replace function public.cms_save_translation(p_job_id uuid,p_content jsonb,p_expected_translation_version bigint,p_origin text default 'human') returns public.cms_translation_jobs
language plpgsql security definer set search_path=public as $$ declare v_job public.cms_translation_jobs;v_page public.cms_pages;
begin
 if not public.cms_can('edit_translation') and not public.cms_can('edit') then raise exception 'permission_denied';end if;
 if p_origin not in('human','ai_preview_applied') then raise exception 'invalid_translation_origin';end if;
 select * into v_job from public.cms_translation_jobs where id=p_job_id for update;if v_job.id is null then raise exception 'translation_job_not_found';end if;
 if v_job.translation_version<>p_expected_translation_version then raise exception 'version_conflict';end if;
 select * into v_page from public.cms_pages where id=v_job.page_id for update;if v_page.content_version<>v_job.source_version then raise exception 'source_changed_reassign_required';end if;
 update public.cms_pages set translations=jsonb_set(coalesce(translations,'{}'::jsonb),array[v_job.locale],p_content,true),content_version=content_version+1,workflow_status='draft',updated_by=auth.uid(),updated_at=now() where id=v_job.page_id;
 update public.cms_translation_jobs set status=case when p_origin='ai_preview_applied' then 'ai_draft' else 'editing' end,translation_version=translation_version+1,updated_by=auth.uid(),updated_at=now() where id=p_job_id returning * into v_job;
 insert into public.cms_revisions(page_id,action,snapshot,created_by) values(v_job.page_id,'translation_saved',jsonb_build_object('locale',v_job.locale,'content',p_content,'origin',p_origin),auth.uid());
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'translation_saved','translation_job',p_job_id::text,jsonb_build_object('locale',v_job.locale,'origin',p_origin,'translation_version',v_job.translation_version));return v_job;
end $$;

create or replace function public.cms_submit_translation(p_job_id uuid,p_expected_translation_version bigint) returns public.cms_translation_jobs
language plpgsql security definer set search_path=public as $$ declare v_job public.cms_translation_jobs;
begin if not public.cms_can('submit') then raise exception 'permission_denied';end if;
 update public.cms_translation_jobs set status='in_review',updated_by=auth.uid(),updated_at=now() where id=p_job_id and translation_version=p_expected_translation_version and status in('ai_draft','editing','changes_requested') returning * into v_job;
 if v_job.id is null then raise exception 'version_conflict_or_invalid_status';end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'translation_submitted','translation_job',p_job_id::text,jsonb_build_object('locale',v_job.locale,'translation_version',v_job.translation_version));return v_job;end $$;

create or replace function public.cms_review_translation(p_job_id uuid,p_decision text,p_comment text default '') returns public.cms_translation_jobs
language plpgsql security definer set search_path=public as $$ declare v_job public.cms_translation_jobs;
begin if not public.cms_can('review') or p_decision not in('approved','changes_requested') then raise exception 'permission_denied';end if;
 update public.cms_translation_jobs set status=p_decision,reviewer_id=auth.uid(),review_comment=coalesce(p_comment,''),updated_by=auth.uid(),updated_at=now() where id=p_job_id and status='in_review' and updated_by<>auth.uid() returning * into v_job;
 if v_job.id is null then raise exception 'self_review_or_invalid_status';end if;
 insert into public.cms_audit_logs(actor_id,action,resource_type,resource_id,metadata) values(auth.uid(),'translation_'||p_decision,'translation_job',p_job_id::text,jsonb_build_object('locale',v_job.locale,'comment',coalesce(p_comment,'')));return v_job;end $$;

revoke execute on function public.cms_assign_translation(uuid,text,uuid),public.cms_save_translation(uuid,jsonb,bigint,text),public.cms_submit_translation(uuid,bigint),public.cms_review_translation(uuid,text,text) from public,anon;
grant execute on function public.cms_assign_translation(uuid,text,uuid),public.cms_save_translation(uuid,jsonb,bigint,text),public.cms_submit_translation(uuid,bigint),public.cms_review_translation(uuid,text,text) to authenticated;
