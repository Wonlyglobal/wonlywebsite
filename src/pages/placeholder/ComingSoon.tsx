import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { SiteHeader, SiteFooter, GOLD, DARK, CHAMP } from "@/lib/site-ui";
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
            Our new global website is still under construction. In the meantime, you can explore this section on our previous website — or email us for richer, more detailed information.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="http://en.wanglianfang.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>
              Visit Our Previous Site <ArrowUpRight size={16} />
            </a>
            <a href="mailto:inquiry@wonlyglobal.com" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border transition-colors hover:bg-white/5" style={{ borderColor: "rgba(191,160,106,0.5)", color: CHAMP }}>
              <Mail size={16} /> inquiry@wonlyglobal.com
            </a>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-light transition-colors hover:text-white" style={{ color: CHAMP }}>
              <ArrowLeft size={15} /> Back to Home
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
