create index if not exists cms_pages_published_search_idx on public.cms_pages using gin(to_tsvector('simple',coalesce(title,'')||' '||coalesce(published_content::text,'')));

create or replace function public.cms_search_site(p_query text,p_locale text default 'en',p_limit integer default 12)
returns table(page_key text,title text,route text,page_type text,snippet text,rank real,updated_at timestamptz)
language plpgsql stable security definer set search_path=public as $$
declare v_query text:=trim(p_query);v_ts tsquery;v_limit integer:=least(greatest(coalesce(p_limit,12),1),20);
begin
 if length(v_query)<2 or length(v_query)>100 then raise exception 'search_query_length_invalid';end if;
 if p_locale not in('en','ar','fr','ru','es','pt') then raise exception 'unsupported_locale';end if;
 v_ts:=websearch_to_tsquery('simple',v_query);
 return query
 with source as(
  select p.page_key,p.title,p.route,p.page_type,p.updated_at,
   case when p_locale='en' then p.published_content else coalesce(p.published_content->'translations'->p_locale,p.translations->p_locale,p.published_content) end as body
  from public.cms_pages p where p.status='published' and p.published_content is not null
 ), ranked as(
  select s.*,to_tsvector('simple',coalesce(s.title,'')||' '||coalesce(s.body::text,'')) document from source s
 )
 select r.page_key,coalesce(r.body->'seo'->>'title',r.body->>'title',r.title),
  r.route,r.page_type,
  left(regexp_replace(coalesce(r.body->'seo'->>'description',r.body->>'description',r.body->>'body',r.body::text),'[{}\[\]"]',' ','g'),260),
  ts_rank_cd(r.document,v_ts),r.updated_at from ranked r where r.document@@v_ts order by ts_rank_cd(r.document,v_ts) desc,r.updated_at desc limit v_limit;
end $$;

revoke execute on function public.cms_search_site(text,text,integer) from public;
grant execute on function public.cms_search_site(text,text,integer) to anon,authenticated;
