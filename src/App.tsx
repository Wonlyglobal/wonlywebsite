import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/not-found/Index";

// Lazy-loaded so each route ships as its own chunk and never enters the initial
// bundle the homepage visitor downloads.
const Prototype = lazy(() => import("./pages/prototype/Index"));
const Index = lazy(() => import("./pages/home/Index"));
const About = lazy(() => import("./pages/about/Index"));
const Projects = lazy(() => import("./pages/projects/Index"));
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
const EngineeringDoors = lazy(() => import("./pages/products/EngineeringDoors"));
const MedicalDoors = lazy(() => import("./pages/products/MedicalDoors"));
const YizhaiYishu = lazy(() => import("./pages/products/YizhaiYishu"));
// Unified placeholders for planned-but-unbuilt pages.
const ProductComingSoon = lazy(() => import("./pages/placeholder/ComingSoon").then((m) => ({ default: m.ProductComingSoon })));
const SectionComingSoon = lazy(() => import("./pages/placeholder/ComingSoon").then((m) => ({ default: m.SectionComingSoon })));

const queryClient = new QueryClient();

// Derived from Vite's `base` (see vite.config.ts). "/" for a custom domain at
// root, "/<repo>" for a GitHub Pages project page — keeps routing correct in both.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <Routes>
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
          {/* Metal Door — merged into the X70 flagship page (Banner + Smart Features + full X70 content). */}
          <Route path="/products/door/metal-door" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SecurityDoors /></Suspense>} />
          <Route path="/products/smart-locks" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartLocks /></Suspense>} />
          <Route path="/products/smart-windows" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartWindows /></Suspense>} />
          <Route path="/products/whole-house" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WholeHouse /></Suspense>} />
          {/* Detailed sub-pages already built. */}
          <Route path="/products/smart-locks/s80" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartLockS80 /></Suspense>} />
          <Route path="/products/security-doors/x70" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SecurityDoorX70 /></Suspense>} />
          <Route path="/products/engineering-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><EngineeringDoors /></Suspense>} />
          <Route path="/products/medical-doors" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><MedicalDoors /></Suspense>} />
          <Route path="/products/yizhai-yishu" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><YizhaiYishu /></Suspense>} />

          {/* New IA — singular /product/* scheme (reuses existing pages; placeholders for the rest). */}
          <Route path="/product/door" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><EntranceDoor /></Suspense>} />
          <Route path="/product/door/metal-door" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SecurityDoors /></Suspense>} />
          <Route path="/product/door/wooden-door" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WoodenDoors /></Suspense>} />
          <Route path="/product/door/wpc-door" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><ProductComingSoon /></Suspense>} />
          <Route path="/product/smart-lock" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartLocks /></Suspense>} />
          <Route path="/product/smart-window" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SmartWindows /></Suspense>} />
          <Route path="/product/whole-house" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><WholeHouse /></Suspense>} />
          {/* Sections not yet built → placeholder (hash anchors resolve within them). */}
          <Route path="/advantages" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SectionComingSoon /></Suspense>} />
          <Route path="/manufacturing-rd" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SectionComingSoon /></Suspense>} />
          <Route path="/global-strategy" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SectionComingSoon /></Suspense>} />
          <Route path="/partnership" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SectionComingSoon /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><SectionComingSoon /></Suspense>} />

          <Route path="/prototype" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Prototype /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
