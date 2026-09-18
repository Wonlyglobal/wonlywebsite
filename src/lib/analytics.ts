// Site analytics: Google Analytics 4 (gtag) + Microsoft Clarity.
// Fill the two IDs below once each property is created. Leaving an ID empty
// keeps that tool fully disabled — no script is injected and no request is made.
export const GA_MEASUREMENT_ID = "G-PV49HRLD18"; // e.g. "G-XXXXXXXXXX"  (Google Analytics 4)
export const CLARITY_PROJECT_ID = "xptk0qka3l"; // e.g. "abcdefghij"    (Microsoft Clarity)

let started = false;
type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue>;
type ClickContext = { cta_name: string; source_section: string; destination?: string; captured_at: number };
let lastClick: ClickContext | null = null;
const JOURNEY_SESSION_KEY = "wonly_inquiry_journey_session";
const JOURNEY_EVENT_NAMES = new Set(["cta_click", "form_open", "form_start", "form_submit", "form_error", "form_abandon", "contact_click"]);
type JourneyEvent = {
  event_name: string; event_at: string; session_ref: string; form_id?: string;
  page_path: string; page_title: string; cta_name?: string; section_name?: string;
  language?: string; product_context?: string; error_type?: string;
};
const journeyEvents: JourneyEvent[] = [];

export function getJourneySession(): string {
  if (typeof window === "undefined") return "";
  try {
    let value = window.sessionStorage.getItem(JOURNEY_SESSION_KEY) || "";
    if (!value) {
      value = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `journey-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem(JOURNEY_SESSION_KEY, value);
    }
    return value;
  } catch { return `journey-${Date.now()}`; }
}

export function serializeInquiryJourney(formId: string): string {
  return JSON.stringify(journeyEvents.filter((event) => event.form_id === formId).slice(-99));
}

const pageContext = (): AnalyticsParams => ({
  source_page: window.location.pathname + window.location.search,
  page_location: window.location.href,
  page_title: document.title,
  language: document.documentElement.lang || "en",
});

const sectionName = (element: Element) => {
  const section = element.closest("section, header, footer");
  return section?.id || section?.tagName.toLowerCase() || "unknown";
};

/** Inject the analytics scripts once. Safe to call on every mount. */
export function initAnalytics(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  const w = window as any;

  // --- Google Analytics 4 (gtag.js) ---
  if (GA_MEASUREMENT_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() { w.dataLayer.push(arguments); };
    w.gtag("js", new Date());
    // This is a single-page app, so we emit page_view manually on route change.
    w.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  }

  // --- Microsoft Clarity ---
  if (CLARITY_PROJECT_ID) {
    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode!.insertBefore(t, y);
    })(w, document, "clarity", "script", CLARITY_PROJECT_ID);
  }

  // Remember the exact element that initiated a conversion. Quote-modal calls can
  // consume this context even when their React handlers live in shared components.
  document.addEventListener("click", (event) => {
    const element = (event.target as Element | null)?.closest("button, a");
    if (!element) return;
    const ctaName = (element.textContent || element.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 120);
    const rawHref = element.getAttribute("href") || "";
    const href = element instanceof HTMLAnchorElement ? element.href : "";
    lastClick = { cta_name: ctaName || element.tagName.toLowerCase(), source_section: sectionName(element), destination: href || undefined, captured_at: Date.now() };
    if (/^mailto:/i.test(rawHref)) trackEvent("contact_click", { channel: "email", cta_name: ctaName, source_section: sectionName(element), destination: rawHref });
    else if (/^tel:/i.test(rawHref)) trackEvent("contact_click", { channel: "phone", cta_name: ctaName, source_section: sectionName(element), destination: rawHref });
    else if (/wa\.me\//i.test(href)) trackEvent("contact_click", { channel: "whatsapp", cta_name: ctaName, source_section: sectionName(element), destination: href });
    else if (rawHref.includes("#contact")) {
      trackEvent("cta_click", { cta_name: ctaName, source_section: sectionName(element), destination: "homepage_contact" });
    } else if (/^\/(?:(?:ar|fr|ru|es|pt)\/)?contact\/?(?:[?#].*)?$/i.test(rawHref)) {
      trackEvent("cta_click", { cta_name: ctaName, source_section: sectionName(element), destination: "contact_page", form_id: "contact_page" });
    }
  }, true);
}

/** Send a structured GA4 event and a matching Clarity session marker. */
export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as any;
  const payload = { ...pageContext(), ...(name === "form_abandon" ? { transport_type: "beacon" } : {}), ...params };
  if (JOURNEY_EVENT_NAMES.has(name)) {
    const formId = typeof payload.form_id === "string"
      ? payload.form_id
      : payload.destination === "homepage_contact" ? "homepage_contact" : undefined;
    journeyEvents.push({
      event_name: name,
      event_at: new Date().toISOString(),
      session_ref: getJourneySession(),
      form_id: formId,
      page_path: String(payload.source_page || window.location.pathname).slice(0, 300),
      page_title: String(payload.page_title || document.title).slice(0, 160),
      cta_name: typeof payload.cta_name === "string" ? payload.cta_name.slice(0, 120) : undefined,
      section_name: typeof payload.source_section === "string" ? payload.source_section.slice(0, 120) : undefined,
      language: typeof payload.language === "string" ? payload.language.slice(0, 20) : undefined,
      product_context: typeof payload.product_context === "string" ? payload.product_context.slice(0, 160) : undefined,
      error_type: name === "form_error" && typeof payload.error_type === "string" ? payload.error_type.slice(0, 80) : undefined,
    });
    if (journeyEvents.length > 300) journeyEvents.splice(0, journeyEvents.length - 300);
  }
  if (GA_MEASUREMENT_ID && w.gtag) w.gtag("event", name, payload);
  if (CLARITY_PROJECT_ID && w.clarity) w.clarity("event", name);
}

export function trackQuoteOpen(params: AnalyticsParams = {}): void {
  const click = lastClick && Date.now() - lastClick.captured_at < 1500 ? lastClick : null;
  const context = click ? { cta_name: click.cta_name, source_section: click.source_section, destination: click.destination || "quote_modal" } : {};
  trackEvent("cta_click", { ...context, ...params, destination: "quote_modal", form_id: "quote_modal" });
  trackEvent("form_open", { ...context, ...params, form_id: "quote_modal" });
}

export function trackFormEvent(name: "form_start" | "form_submit" | "form_error" | "form_abandon", formId: string, params: AnalyticsParams = {}): void {
  trackEvent(name, { form_id: formId, ...params });
}

/** Report a virtual page view to GA4 after a client-side route change. */
export function trackPageview(path: string): void {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (GA_MEASUREMENT_ID && w.gtag) {
    w.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}

/** GA4 lead-generation conversion — fire on a successful enquiry submit. */
export function trackLead(params: Record<string, string> = {}): void {
  trackEvent("generate_lead", { currency: "USD", value: 0, ...params });
}
