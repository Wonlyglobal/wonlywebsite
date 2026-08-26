import { createClient } from "@supabase/supabase-js";

const rememberPreferenceKey = "wonly-cms-remember-session";
const shouldRememberSession = () => typeof localStorage === "undefined" || localStorage.getItem(rememberPreferenceKey) !== "0";
const authStorage = {
  getItem(key: string) {
    if (typeof localStorage === "undefined") return null;
    return (shouldRememberSession() ? localStorage : sessionStorage).getItem(key);
  },
  setItem(key: string, value: string) {
    if (typeof localStorage === "undefined") return;
    const primary = shouldRememberSession() ? localStorage : sessionStorage;
    const secondary = shouldRememberSession() ? sessionStorage : localStorage;
    primary.setItem(key, value);
    secondary.removeItem(key);
  },
  removeItem(key: string) {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

export function getCmsRememberSession() {
  return shouldRememberSession();
}

export function setCmsRememberSession(enabled: boolean) {
  if (typeof localStorage !== "undefined") localStorage.setItem(rememberPreferenceKey, enabled ? "1" : "0");
}

// Publishable keys are intentionally safe to ship to browsers. Every write is
// still protected by Supabase Auth + RLS; secret/service_role keys never belong
// in this client. Environment variables remain available for local overrides.
const url = import.meta.env.VITE_CMS_SUPABASE_URL?.trim()
  || "https://rpiviiyvbpwslyxywqcd.supabase.co";
const publishableKey = import.meta.env.VITE_CMS_SUPABASE_PUBLISHABLE_KEY?.trim()
  || "sb_publishable_kbl7m_Du8X_rreH5_lCKCw_LVCKFeUB";

export const cmsIsConfigured = Boolean(url && publishableKey);
export const cmsSupabase = cmsIsConfigured
  ? createClient(url, publishableKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: authStorage } })
  : null;
export const cmsProjectUrl = url ?? "";
