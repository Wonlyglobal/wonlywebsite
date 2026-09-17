-- Public view never exposes drafts from a published row.
revoke all on table public.cms_pages from anon;
drop view if exists public.cms_published_pages;
create view public.cms_published_pages with(security_barrier=true)as select page_key,route,source_locale,published_content,published_at from public.cms_pages where status='published'and published_at is not null;
revoke all on table public.cms_published_pages from public;grant select on table public.cms_published_pages to anon,authenticated;
