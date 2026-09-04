import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType } from "react-router-dom";
import NotFound from "./pages/not-found/Index";
import { initAnalytics, trackPageview } from "@/lib/analytics";
import FloatingContact from "@/lib/floating-contact";
import { LocaleDocument, localeFromPath } from "@/lib/i18n";
import { FloatingLanguageSwitcher } from "@/lib/site-ui";
import { getCmsSetting } from "@/lib/cms-site-settings";

// Take over scroll handling from the browser so lazy routes behave predictably.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Forward navigation (PUSH) opens a page at its banner; browser back/forward
// (POP) restores the scroll position the user left that page at. Lazy pages get
// a short retry loop so restoration waits for the content to finish mounting.
function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();

  // Record the position while the page is still on screen. Saving it in a
  // cleanup instead would always store 0: by the time a passive effect cleanup
  // runs the outgoing page's DOM is gone and the browser has clamped scrollY to
  // the (viewport-height) Suspense fallback. The listener is registered in a
  // layout effect so it is detached before that teardown, and the clamp-to-zero
  // scroll event it fires never lands on the outgoing page's key.
  useLayoutEffect(() => {
    const key = `scroll:${location.key}`;
    // Only real scroll events are recorded — writing once on mount would clobber
    // the stored position with 0 before the restore effect below gets to read it.
    const onScroll = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  useEffect(() => {
    if (navType === "POP") {
      const saved = sessionStorage.getItem(`scroll:${location.key}`);
      if (saved !== null) {
        const y = parseInt(saved, 10);
        let tries = 0;
        const restore = () => {
          window.scrollTo(0, y);
          if (Math.abs(window.scrollY - y) > 2 && tries++ < 20) {
            requestAnimationFrame(restore);
          }
        };
        requestAnimationFrame(restore);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location, navType]);

  // Analytics: initialise once, then send a page_view on every SPA route change.
  useEffect(() => { initAnalytics(); }, []);
  useEffect(() => {
    if (location.pathname.startsWith("/cms")) return;
    trackPageview(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}

function SiteFloaters() {
  const location = useLocation();
  if (location.pathname.startsWith("/cms")) return null;
  return <><FloatingLanguageSwitcher /><FloatingContact /></>;
}

function CmsRedirects() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/cms")) return;
    let active = true;
    void getCmsSetting("redirects").then(config => {
      if (!active) return;
      const rule = config?.items?.find(item => item.from === location.pathname);
      if (!rule || rule.to === location.pathname) return;
      if (/^https:\/\//i.test(rule.to)) window.location.replace(rule.to);
      else window.location.replace(`${rule.to}${location.search}${location.hash}`);
    });
    return () => { active = false; };
  }, [location.pathname, location.search, location.hash]);
  return null;
}

// Lazy-loaded so each route ships as its own chunk and never enters the initial
// bundle the homepage visitor downloads.
const Prototype = lazy(() => import("./pages/prototype/Index"));
const Index = lazy(() => import("./pages/home/Index"));
const About = lazy(() => import("./pages/about/Index"));
const Contact = lazy(() => import("./pages/contact/Index"));
const Manufacturing = lazy(() => import("./pages/manufacturing/Index"));
const Partnership = lazy(() => import("./pages/partnership/Index"));
const Advantages = lazy(() => import("./pages/advantages/Index"));
const GlobalStrategy = lazy(() => import("./pages/global-strategy/Index"));
const Projects = lazy(() => import("./pages/projects/Index"));
const Insights = lazy(() => import("./pages/insights/Index"));
const InsightArticle = lazy(() => import("./pages/insights/Article"));
const IntentLandingPage = lazy(() => import("../IntentLandingPage"));
// Product category pages (each lists the full series in its line)
const EntranceDoor = lazy(() => import("./pages/products/EntranceDoor"));
const SecurityDoors = lazy(() => import("./pages/products/SecurityDoors"));
const SmartLocks = lazy(() => import("./pages/products/SmartLocks"));
const WoodenDoors = lazy(() => import("./pages/products/WoodenDoors"));
const SmartWindows = lazy(() => import("./pages/products/SmartWindows"));
const WholeHouse = lazy(() => import("./pages/products/WholeHouse"));
// Detailed / sub-line pages
const SecurityDoorX70 = lazy(() => import("./pages/products/SecurityDoorX70"));
const SmartLockS80 = lazy(() => import("./pages/products/SmartLockS80"));
const CatalogProductDetail = lazy(() => import("./pages/products/CatalogProductDetail"));
const DoorGradePage = lazy(() => import("./pages/products/DoorGradePage"));
const WoodenDoorSeriesDetail = lazy(() => import("./pages/products/WoodenDoorSeriesDetail"));
const EngineeringDoors = lazy(() => import("./pages/products/EngineeringDoors"));
const MedicalDoors = lazy(() => import("./pages/products/MedicalDoors"));
const YizhaiYishu = lazy(() => import("./pages/products/YizhaiYishu"));
// Unified placeholders for planned-but-unbuilt pages.
const SectionComingSoon = lazy(() => import("./pages/placeholder/ComingSoon").then((m) => ({ default: m.SectionComingSoon })));
// Legal pages (Privacy Policy + Terms of Service).
const Privacy = lazy(() => import("./pages/legal/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/legal/Legal").then((m) => ({ default: m.Terms })));
const PublishedVisualContent = lazy(() => import("./cms/PublishedVisualContent"));

function LegacyCmsRedirect() {
  useEffect(() => {
    const target = `https://cms.wonlyglobal.com/${window.location.search}${window.location.hash}`;
    window.location.replace(target);
  }, []);
  return <main className="min-h-screen grid place-items-center bg-slate-950 text-white">
    <p>正在前往 WONLY 网站管理后台… <a className="underline" href="https://cms.wonlyglobal.com/">立即打开</a></p>
  </main>;
}

const queryClient = new QueryClient();

// Derived from Vite's `base` (see vite.config.ts). "/" for a custom domain at
// root, "/<repo>" for a GitHub Pages project page — keeps routing correct in both.
const buildBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const initialLocale = typeof window === "undefined" ? "en" : localeFromPath(window.location.pathname);
const localeBase = initialLocale === "en" ? "" : `/${initialLocale}`;
const basename = `${buildBase}${localeBase}` || "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <ScrollManager />
        <CmsRedirects />
        <LocaleDocument />
        <Suspense fallback={null}><PublishedVisualContent /></Suspense>
        <Routes>
          <Route path="/cms/*" element={<LegacyCmsRedirect />} />
          {/* The /prototype interactive page is now the official homepage. */}
          <Route path="/" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Prototype /></Suspense>} />
          {/* Previous homepage kept for reference (not linked). */}
          <Route path="/home-old" element={<Index />} />
          <Route path="/about" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><About /></Suspense>} />
          {/* Full projects portfolio page. */}
          <Route path="/projects" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Projects /></Suspense>} />
          {/* Product-line category pages — each shows the full series in that line. */}
          <Route path="/products/entrance-door" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><EntranceDoor /></Suspense>} />
          <Route path="/products/security-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SecurityDoors /></Suspense>} />
          <Route path="/products/wooden-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WoodenDoors /></Suspense>} />
          {/* Metal Door — lands on the Security Doors series page; the X70 sub-page carries the
              Banner + Smart Features detail content. */}
          <Route path="/products/door/metal-door" element={<Navigate to="/products/security-doors" replace />} />
          <Route path="/products/smart-locks" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartLocks /></Suspense>} />
          <Route path="/products/smart-windows" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartWindows /></Suspense>} />
          <Route path="/products/whole-house" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WholeHouse /></Suspense>} />
          {/* Detailed sub-pages already built. */}
          <Route path="/products/smart-locks/s80" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartLockS80 /></Suspense>} />
          <Route path="/products/smart-locks/s80-max" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><CatalogProductDetail product="s80-max" /></Suspense>} />
          <Route path="/products/smart-locks/s60-max" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="s60-max" /></Suspense>} />
          <Route path="/products/smart-locks/s60-pro" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="s60-pro" /></Suspense>} />
          <Route path="/products/smart-locks/s50-pro" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="s50-pro" /></Suspense>} />
          <Route path="/products/smart-locks/s58-pro" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="s58-pro" /></Suspense>} />
          <Route path="/products/smart-locks/p10-pro" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="p10-pro" /></Suspense>} />
          <Route path="/products/smart-locks/s922-max" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="s922-max" /></Suspense>} />
          <Route path="/products/smart-locks/s936" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="s936" /></Suspense>} />
          <Route path="/products/metal-doors/1-0" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="metal-1-0" /></Suspense>} />
          <Route path="/products/metal-doors/1-0-pro" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="metal-1-0-pro" /></Suspense>} />
          <Route path="/products/metal-doors/2-0" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="metal-2-0" /></Suspense>} />
          <Route path="/products/metal-doors/3-0" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="metal-3-0" /></Suspense>} />
          <Route path="/products/smart-doors/3-0-pro" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="smart-3-0-pro" /></Suspense>} />
          <Route path="/products/smart-doors/3-0-max" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="smart-3-0-max" /></Suspense>} />
          <Route path="/products/smart-doors/4-0" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="smart-4-0" /></Suspense>} />
          <Route path="/products/smart-doors/5-0" element={<Suspense fallback={<div className="min-h-screen" />}><DoorGradePage grade="smart-5-0" /></Suspense>} />
          <Route path="/products/security-doors/x60-max" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="x60-max" /></Suspense>} />
          <Route path="/products/security-doors/x60-pro" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="x60-pro" /></Suspense>} />
          <Route path="/products/security-doors/x50-max" element={<Suspense fallback={<div className="min-h-screen" />}><CatalogProductDetail product="x50-max" /></Suspense>} />
          <Route path="/products/security-doors/x50-pro" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><CatalogProductDetail product="x50-pro" /></Suspense>} />
          <Route path="/products/security-doors/t200" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><CatalogProductDetail product="t200" /></Suspense>} />
          <Route path="/products/wooden-doors/custom" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WoodenDoorSeriesDetail series="custom" /></Suspense>} />
          <Route path="/products/wooden-doors/minimalist" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WoodenDoorSeriesDetail series="minimalist" /></Suspense>} />
          <Route path="/products/wooden-doors/pvc" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WoodenDoorSeriesDetail series="pvc" /></Suspense>} />
          <Route path="/products/wooden-doors/solid-wood" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WoodenDoorSeriesDetail series="solid-wood" /></Suspense>} />
          <Route path="/products/wooden-doors/aluminum-alloy" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WoodenDoorSeriesDetail series="aluminum-alloy" /></Suspense>} />
          <Route path="/products/security-doors/x70" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SecurityDoorX70 /></Suspense>} />
          <Route path="/products/engineering-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><EngineeringDoors /></Suspense>} />
          <Route path="/products/medical-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><MedicalDoors /></Suspense>} />
          <Route path="/products/yizhai-yishu" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><YizhaiYishu /></Suspense>} />
          {/* High-intent English landing pages. They remain English-only until
              market-reviewed translations are available, so localized copies
              are not exposed to crawlers. */}
          <Route path="/products/security-doors/cast-aluminium" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><IntentLandingPage pageKey="cast-aluminium-security-doors" /></Suspense>} />
          <Route path="/products/security-doors/fire-rated" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><IntentLandingPage pageKey="fire-rated-security-doors" /></Suspense>} />
          <Route path="/solutions/hotel-security-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><IntentLandingPage pageKey="hotel-security-doors" /></Suspense>} />
          <Route path="/solutions/villa-security-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><IntentLandingPage pageKey="villa-security-doors" /></Suspense>} />
          <Route path="/global/saudi-arabia/security-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><IntentLandingPage pageKey="saudi-arabia-security-doors" /></Suspense>} />
          <Route path="/global/uae/security-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><IntentLandingPage pageKey="uae-security-doors" /></Suspense>} />

          {/* Legacy singular /product/* URLs resolve to the canonical /products/* structure. */}
          <Route path="/product/door" element={<Navigate to="/products/entrance-door" replace />} />
          <Route path="/product/door/metal-door" element={<Navigate to="/products/metal-doors/3-0" replace />} />
          <Route path="/product/door/wooden-door" element={<Navigate to="/products/wooden-doors" replace />} />
          <Route path="/product/door/wpc-door" element={<Navigate to="/products/entrance-door" replace />} />
          <Route path="/product/smart-lock" element={<Navigate to="/products/smart-locks" replace />} />
          <Route path="/product/smart-window" element={<Navigate to="/products/smart-windows" replace />} />
          <Route path="/product/whole-house" element={<Navigate to="/products/whole-house" replace />} />
          {/* Sections not yet built → placeholder (hash anchors resolve within them). */}
          <Route path="/advantages" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Advantages /></Suspense>} />
          <Route path="/manufacturing-rd" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Manufacturing /></Suspense>} />
          <Route path="/global-strategy" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><GlobalStrategy /></Suspense>} />
          <Route path="/partnership" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Partnership /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Contact /></Suspense>} />
          <Route path="/insights" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Insights /></Suspense>} />
          <Route path="/insights/:slug" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><InsightArticle /></Suspense>} />

          <Route path="/prototype" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Prototype /></Suspense>} />

          {/* Legal */}
          <Route path="/privacy" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Privacy /></Suspense>} />
          <Route path="/terms" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Terms /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteFloaters />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
