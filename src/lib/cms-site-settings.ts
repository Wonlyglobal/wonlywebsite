import { useEffect, useState } from "react";
import { cmsSupabase } from "@/cms/supabase";

export type CmsNavigationItem = { label: string; url: string; children?: CmsNavigationItem[] };
export type CmsRedirectItem = { from: string; to: string; status: "301" | "302" };
export type CmsSiteSettings = {
  siteName?: string;
  contactEmail?: string;
  whatsapp?: string;
  whatsappLabel?: string;
  defaultLanguage?: string;
  timezone?: string;
};

type SettingMap = {
  navigation: { items?: CmsNavigationItem[] };
  redirects: { items?: CmsRedirectItem[] };
  settings: CmsSiteSettings;
};
const cache = new Map<keyof SettingMap, unknown>();
const pending = new Map<keyof SettingMap, PromiseLike<unknown>>();

async function readSetting<K extends keyof SettingMap>(key: K): Promise<SettingMap[K] | undefined> {
  if (cache.has(key)) return cache.get(key) as SettingMap[K];
  if (!cmsSupabase) return undefined;
  if (!pending.has(key)) {
    if (key === "navigation") {
      pending.set(key, cmsSupabase.from("cms_published_navigation").select("items").eq("navigation_key", "primary").maybeSingle().then(async ({ data, error }) => {
        if (!error && data?.items) return { items: data.items };
        const fallback = await cmsSupabase.from("cms_published_pages").select("published_content").eq("page_key", `setting:${key}`).maybeSingle();
        return fallback.error ? undefined : fallback.data?.published_content;
      }).then(value => { pending.delete(key); if (!value) return undefined; cache.set(key, value); return value; }));
      return Promise.resolve(pending.get(key) as PromiseLike<SettingMap[K] | undefined>);
    }
    pending.set(key, cmsSupabase.from("cms_published_pages").select("published_content").eq("page_key", `setting:${key}`).maybeSingle()
      .then(async ({ data, error }) => {
        if (!error && data?.published_content) return data.published_content;
        const fallback = await cmsSupabase.from("cms_site_settings").select("value").eq("key", key).maybeSingle();
        return fallback.error ? undefined : fallback.data?.value;
      })
      .then(value => {
        pending.delete(key);
        if (!value) return undefined;
        cache.set(key, value);
        return value;
      }));
  }
  return Promise.resolve(pending.get(key) as PromiseLike<SettingMap[K] | undefined>);
}

export function useCmsSetting<K extends keyof SettingMap>(key: K) {
  const [value, setValue] = useState<SettingMap[K] | undefined>(() => cache.get(key) as SettingMap[K] | undefined);
  useEffect(() => {
    let active = true;
    void readSetting(key).then(next => { if (active && next) setValue(next); });
    return () => { active = false; };
  }, [key]);
  return value;
}

export function getCmsSetting<K extends keyof SettingMap>(key: K) {
  return readSetting(key);
}
