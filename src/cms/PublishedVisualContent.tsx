import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CMS_PAGES } from "./pageDefinitions";
import { cmsSupabase } from "./supabase";
import { applyLayoutContent, applySeoContent, applyVisualContent, type VisualContent } from "./visualContent";

export default function PublishedVisualContent() {
  const location = useLocation();
  useEffect(() => {
    if (!cmsSupabase || location.pathname.startsWith("/cms")) return;
    const page = CMS_PAGES.find(item => item.route === location.pathname);
    if (!page) return;
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let applying = false;
    void cmsSupabase.from("cms_published_pages").select("published_content").eq("page_key", page.key).maybeSingle().then(({ data, error }) => {
      if (cancelled || error || !data) return;
      const content = data.published_content as (VisualContent & { translations?: Record<string, VisualContent> }) | null;
      const locale = document.documentElement.lang?.split("-")[0] || "en";
      const localized = locale === "en" ? content : (content?.translations?.[locale] ?? content);
      const values = localized?.visual ?? {};
      const apply = () => {
        if (applying) return;
        applying = true;
        applyLayoutContent(document, localized?.layout);
        applyVisualContent(document, values);
        applySeoContent(localized?.seo);
        queueMicrotask(() => { applying = false; });
      };
      apply();
      observer = new MutationObserver(apply);
      observer.observe(document.body, { childList: true, subtree: true });
    });
    return () => { cancelled = true; observer?.disconnect(); };
  }, [location.pathname]);
  return null;
}
