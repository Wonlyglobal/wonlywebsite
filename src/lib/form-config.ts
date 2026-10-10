import { cmsSupabase } from "@/cms/supabase";

/* Published form schemas and success copy remain CMS-managed. Customer submissions
 * go to the CRM intake endpoint; the CMS/Web3Forms path is not a fallback because
 * it could report success without creating a CRM inquiry. These are public client
 * settings only. The CRM service-role key stays inside the Edge Function. */
const CRM_INTAKE_ENDPOINT =
  "https://plhverjihjilnuhlhlxi.supabase.co/functions/v1/website-inquiry-intake";
const CRM_PUBLISHABLE_KEY = "sb_publishable_uDiOI4MTIoHbsQDAqHsH1A_4Db3Hmmw";

const RAW = import.meta.glob("/content/settings/site.json", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const CFG = (() => {
  try { return JSON.parse(Object.values(RAW)[0] || "{}"); } catch { return {}; }
})() as Record<string, unknown>;
const FORM_KEY = (typeof CFG.formKey === "string" ? CFG.formKey : "").trim() || "0f0709cb-edc8-4112-be79-11ee3a633e20";
const FORM_CC = (typeof CFG.formCc === "string" ? CFG.formCc : "").trim();

type PublishedField = { key: string; required?: boolean };
type PublishedForm = { schema?: { fields?: PublishedField[] }; success_message?: string };
const formCache = new Map<string, PublishedForm | null>();
const USER_FIELDS = new Set(["name", "company", "job_title", "country", "email", "phone", "business_type", "message", "consent"]);
const pendingSubmissionIds = new Map<string, string>();

async function getPublishedForm(formKey: string): Promise<PublishedForm | null> {
  if (!cmsSupabase || !formKey) return null;
  if (formCache.has(formKey)) return formCache.get(formKey) ?? null;
  const { data, error } = await cmsSupabase.from("cms_published_forms").select("schema,success_message").eq("form_key", formKey).maybeSingle();
  const value = error ? null : data as PublishedForm | null;
  formCache.set(formKey, value);
  return value;
}

function getSubmissionId(formKey: string): string {
  const key = formKey || "website";
  const existing = pendingSubmissionIds.get(key);
  if (existing) return existing;
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `web-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
  pendingSubmissionIds.set(key, id);
  return id;
}

function parseJourneyEvents(value: string | undefined): unknown[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.slice(0, 99) : [];
  } catch {
    return [];
  }
}

function queryValue(params: URLSearchParams, key: string): string {
  return params.get(key)?.trim().slice(0, 300) || "";
}

/* The CRM is the source of truth. Legacy CMS/email copies run only after CRM
 * confirms creation; their failure cannot turn a successfully stored inquiry
 * into a misleading failure (or an email-only lead outside the CRM). */
export async function submitEnquiry(payload: Record<string, string>): Promise<{ success: boolean; message?: string }> {
  const formKey = payload.source || "";
  const definition = await getPublishedForm(formKey);
  const fields = definition?.schema?.fields;
  if (fields?.length) {
    const allowed = new Set(fields.map(field => field.key));
    const missing = fields.find(field => field.required && !payload[field.key]?.trim());
    if (missing) return { success: false, message: `${missing.key} is required.` };
    payload = Object.fromEntries(Object.entries(payload).filter(([key]) => !USER_FIELDS.has(key) || allowed.has(key)));
  }

  const submissionId = getSubmissionId(formKey);
  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  let journeyEvents: unknown[] = [];
  try { journeyEvents = parseJourneyEvents(payload.journey_events); } catch { /* malformed analytics must not block an inquiry */ }

  const crmPayload = {
    submission_id: submissionId,
    submitted_at: new Date().toISOString(),
    name: payload.name || "",
    company: payload.company || "",
    job_title: payload.job_title || "",
    country: payload.country || "",
    email: payload.email || "",
    phone: payload.phone || "",
    product: payload.product || payload.product_category || payload.business_type || payload.interests || payload.subject || "",
    quantity: payload.quantity || payload.volume || "",
    message: payload.message || "",
    landing_page: typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}${window.location.search}`.slice(0, 2000),
    referrer_url: typeof document === "undefined" ? "" : document.referrer.slice(0, 2000),
    session_ref: payload.session_ref || payload.journey_session || "",
    utm_source: payload.utm_source || queryValue(params, "utm_source"),
    utm_medium: payload.utm_medium || queryValue(params, "utm_medium"),
    utm_campaign: payload.utm_campaign || queryValue(params, "utm_campaign"),
    utm_content: payload.utm_content || queryValue(params, "utm_content"),
    utm_term: payload.utm_term || queryValue(params, "utm_term"),
    journey_events: journeyEvents,
  };

  try {
    const response = await fetch(CRM_INTAKE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: CRM_PUBLISHABLE_KEY,
        Authorization: `Bearer ${CRM_PUBLISHABLE_KEY}`,
        "x-idempotency-key": submissionId,
      },
      body: JSON.stringify(crmPayload),
    });
    const result = await response.json() as { status?: string };
    if (response.ok && (result.status === "completed" || result.status === "duplicate")) {
      pendingSubmissionIds.delete(formKey || "website");
      if (result.status === "completed") {
        const mirrorTasks: Promise<unknown>[] = [];
        if (cmsSupabase) {
          mirrorTasks.push((async () => {
            await cmsSupabase.from("cms_inquiries").insert({
              subject: payload.subject || "Website enquiry", name: payload.name || "", company: payload.company || "",
              job_title: payload.job_title || "", country: payload.country || "", email: payload.email || "", phone: payload.phone || "",
              business_type: payload.business_type || "", message: payload.message || "",
              language: payload.language || (typeof document === "undefined" ? "en" : document.documentElement.lang || "en"),
              source: formKey || "website",
            });
          })());
        }
        if (FORM_KEY) {
          const emailBody: Record<string, string> = { access_key: FORM_KEY, from_name: "WONLY Website", ...payload };
          if (FORM_CC) emailBody.ccemail = FORM_CC;
          if (payload.email) emailBody.replyto = payload.email;
          mirrorTasks.push(fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(emailBody),
          }));
        }
        await Promise.allSettled(mirrorTasks);
      }
      return { success: true, message: definition?.success_message || "Your enquiry has been sent to our overseas team." };
    }
  } catch {
    // Preserve the idempotency key so a retry after an ambiguous network failure
    // cannot create a second CRM inquiry.
  }

  return {
    success: false,
    message: "We couldn't confirm your enquiry in our CRM. Please retry; if it persists, email inquiry@wonlyglobal.com.",
  };
}
