import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";
import SecurityDoors from "./pages/products/SecurityDoors";
import SecurityDoorX70 from "./pages/products/SecurityDoorX70";
import NotFound from "./pages/not-found/Index";

// Lazy-loaded so GSAP ships only on /prototype and never enters the main bundle.
const Prototype = lazy(() => import("./pages/prototype/Index"));

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
          <Route path="/products/security-doors" element={<SecurityDoors />} />
          <Route path="/products/security-doors/x70" element={<SecurityDoorX70 />} />
          <Route path="/prototype" element={<Suspense fallback={<div className="min-h-screen" style={{ background: "#0d0d0d" }} />}><Prototype /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
