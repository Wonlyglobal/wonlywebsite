import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter, GOLD, DARK, CHAMP, useQuoteStore } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";

// Turn a URL path into a readable title, e.g. "/product/door/wpc-door" → "WPC Door".
function titleFromPath(pathname: string) {
  const seg = pathname.split("/").filter(Boolean).pop() || "";
  const words = seg.split("-").map((w) => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)));
  return words.join(" ") || "Page";
}

/* Shared placeholder for pages that are planned but not built yet. `kind` only
   tweaks the eyebrow label (Product line vs. site section). */
function ComingSoon({ kind }: { kind: "product" | "section" }) {
  const { pathname } = useLocation();
  const title = titleFromPath(pathname);
  const openQuote = useQuoteStore((s) => s.openQuote);
  useSeo({
    title: `${title} | WONLY`,
    description: `${title} — page coming soon. WONLY, global smart-security ecosystem leader (SSE: 605268).`,
    path: pathname,
  });
  return (
    <div className="min-h-screen flex flex-col" style={{ background: DARK }}>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-[6vw] pt-32 pb-24 text-center">
        <div className="max-w-xl">
          <div className="text-[12px] tracking-[0.3em] uppercase font-bold" style={{ color: GOLD }}>
            {kind === "product" ? "Product" : "WONLY"}
          </div>
          <h1 className="mt-5 font-light leading-[1.1] text-[34px] md:text-[52px] text-white">{title}</h1>
          <p className="mt-5 text-base font-normal leading-relaxed" style={{ color: "rgba(245,241,234,0.7)" }}>
            This page is coming soon. In the meantime, tell us what you need and our team will reply within 24 hours.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => openQuote()} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>
              Get Solutions &amp; Quote
            </button>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-light transition-colors hover:text-white" style={{ color: CHAMP }}>
              <ArrowLeft size={15} /> Back to home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function ProductComingSoon() { return <ComingSoon kind="product" />; }
export function SectionComingSoon() { return <ComingSoon kind="section" />; }
