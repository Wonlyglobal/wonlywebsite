// Site analytics: Google Analytics 4 (gtag) + Microsoft Clarity.
// Fill the two IDs below once each property is created. Leaving an ID empty
// keeps that tool fully disabled — no script is injected and no request is made.
export const GA_MEASUREMENT_ID = "G-PV49HRLD18"; // e.g. "G-XXXXXXXXXX"  (Google Analytics 4)
export const CLARITY_PROJECT_ID = "xptk0qka3l"; // e.g. "abcdefghij"    (Microsoft Clarity)

let started = false;

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
  if (typeof window === "undefined") return;
  const w = window as any;
  if (GA_MEASUREMENT_ID && w.gtag) {
    w.gtag("event", "generate_lead", { currency: "USD", value: 0, ...params });
  }
}
