create or replace function public.cms_search_discovery_dashboard_v2(p_days integer default 30,p_locale text default null,p_query text default null)
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare v_days integer:=least(greatest(coalesce(p_days,30),1),180);v_since timestamptz;v_locale text:=nullif(trim(p_locale),'');v_query text:=nullif(lower(trim(p_query)),'');v_summary jsonb;v_queries jsonb;v_empty jsonb;v_content jsonb;v_trend jsonb;
begin
 if not public.cms_can('read')then raise exception'permission_denied';end if;
 if v_locale is not null and v_locale not in('en','ar','fr','ru','es','pt')then raise exception'unsupported_locale';end if;
 if v_query is not null and length(v_query)>100 then raise exception'query_filter_too_long';end if;
 v_since:=date_trunc('day',now())-make_interval(days=>v_days-1);
 with filtered as(select*from public.cms_search_events where searched_at>=v_since and(v_locale is null or locale=v_locale)and(v_query is null or position(v_query in lower(query_text))>0))
 select jsonb_build_object('searches',count(*),'zero_results',count(*)filter(where result_count=0),'clicks',(select count(*)from public.cms_search_clicks c join filtered f on f.id=c.search_event_id),'click_through_rate',case when count(*)=0 then 0 else round((select count(distinct c.search_event_id)from public.cms_search_clicks c join filtered f on f.id=c.search_event_id)::numeric/count(*)::numeric,4)end)into v_summary from filtered;
 with filtered as(select*from public.cms_search_events where searched_at>=v_since and(v_locale is null or locale=v_locale)and(v_query is null or position(v_query in lower(query_text))>0))
 select coalesce(jsonb_agg(to_jsonb(x)),'[]')into v_queries from(select query_text,locale,count(*)searches,round(avg(result_count),1)average_results from filtered where query_text<>'[redacted sensitive query]'group by query_text,locale order by count(*)desc,query_text limit 50)x;
 with filtered as(select*from public.cms_search_events where searched_at>=v_since and(v_locale is null or locale=v_locale)and(v_query is null or position(v_query in lower(query_text))>0))
 select coalesce(jsonb_agg(to_jsonb(x)),'[]')into v_empty from(select query_text,locale,count(*)searches from filtered where result_count=0 and query_text<>'[redacted sensitive query]'group by query_text,locale order by count(*)desc,query_text limit 50)x;
 with filtered as(select*from public.cms_search_events where searched_at>=v_since and(v_locale is null or locale=v_locale)and(v_query is null or position(v_query in lower(query_text))>0))
 select coalesce(jsonb_agg(to_jsonb(x)),'[]')into v_content from(select c.page_key,p.title,p.route,count(*)clicks,round(avg(c.result_position),1)average_position from public.cms_search_clicks c join filtered f on f.id=c.search_event_id join public.cms_pages p on p.page_key=c.page_key group by c.page_key,p.title,p.route order by count(*)desc limit 50)x;
 with days as(select generate_series(v_since::date,current_date,'1 day')::date day),filtered as(select*from public.cms_search_events where searched_at>=v_since and(v_locale is null or locale=v_locale)and(v_query is null or position(v_query in lower(query_text))>0)),searches as(select searched_at::date day,count(*)searches,count(*)filter(where result_count=0)zero_results from filtered group by 1),clicks as(select c.clicked_at::date day,count(*)clicks from public.cms_search_clicks c join filtered f on f.id=c.search_event_id group by 1)
 select coalesce(jsonb_agg(jsonb_build_object('date',d.day,'searches',coalesce(s.searches,0),'zero_results',coalesce(s.zero_results,0),'clicks',coalesce(c.clicks,0))order by d.day),'[]')into v_trend from days d left join searches s using(day)left join clicks c using(day);
 return jsonb_build_object('days',v_days,'locale',v_locale,'query_filter',v_query,'summary',v_summary,'trend',v_trend,'top_queries',v_queries,'zero_result_queries',v_empty,'popular_content',v_content);
end$$;
revoke execute on function public.cms_search_discovery_dashboard_v2(integer,text,text)from public;
grant execute on function public.cms_search_discovery_dashboard_v2(integer,text,text)to authenticated;
