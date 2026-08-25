import { createClient } from "@supabase/supabase-js";

// Publishable keys are intentionally safe to ship to browsers. Every write is
// still protected by Supabase Auth + RLS; secret/service_role keys never belong
// in this client. Environment variables remain available for local overrides.
const url = import.meta.env.VITE_CMS_SUPABASE_URL?.trim()
  || "https://rpiviiyvbpwslyxywqcd.supabase.co";
const publishableKey = import.meta.env.VITE_CMS_SUPABASE_PUBLISHABLE_KEY?.trim()
  || "sb_publishable_kbl7m_Du8X_rreH5_lCKCw_LVCKFeUB";

export const cmsIsConfigured = Boolean(url && publishableKey);
export const cmsSupabase = cmsIsConfigured
  ? createClient(url, publishableKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null;
export const cmsProjectUrl = url ?? "";
