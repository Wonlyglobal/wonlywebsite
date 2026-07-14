import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

/* Shared silver-white-gold design tokens (matches the homepage) */
export const GOLD = "#BFA06A";
export const CHAMP = "#D4C4A0";
export const SILVER = "#B8BFC8";
export const CHAMP_BG = "#F5F1EA";
export const DARK = "#221F20";
export const MUTED = "#5f5a54";
export const BASE = import.meta.env.BASE_URL;
export const LOGO = `${BASE}images/logo-trim.webp`;

export const eyebrow = "text-[11px] tracking-[0.5em] uppercase font-light";
export const h2cls = "font-light leading-[1.1] tracking-[0.01em] text-[34px] md:text-[58px]";

/* Scroll-reveal wrapper (identical behaviour to the homepage) */
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVis(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* Full nav framework (mirrors the homepage). Section items link back to the
   homepage and scroll there via its hash handler; S80 + About are real pages. */
const NAV: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Products", href: "/#products", children: [
    { label: "Security Doors", href: "/products/security-doors" },
    { label: "Smart Lock S80", href: "/products/smart-locks/s80" },
    { label: "Wooden Doors", href: "/#products" },
    { label: "Aluminum Windows", href: "/#products" },
    { label: "Whole-House Intelligence", href: "/#products" },
  ] },
  { label: "Solutions", href: "/#solutions" },
  { label: "Why WONLY", href: "/#why" },
  { label: "Global Footprint", href: "/#footprint" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

/* Sticky header — transparent over a dark hero, frosted once scrolled */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-[70] transition-[background-color,box-shadow] duration-500 ${solid ? "bg-[#F5F1EA]/90 backdrop-blur-md shadow-[0_1px_0_rgba(34,31,32,0.06)]" : "bg-transparent"}`}>
      {!solid && <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0))" }} />}
      <div className="relative max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        <Link to="/" className="shrink-0" aria-label="WONLY — home">
          <img src={LOGO} alt="WONLY" className="h-5 md:h-6 w-auto transition-[filter] duration-500" style={{ filter: solid ? "none" : "brightness(0) invert(1)" }} />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <div key={n.label} className="relative" onMouseEnter={() => n.children && setOpenDrop(true)} onMouseLeave={() => setOpenDrop(false)}>
              <Link to={n.href} className="px-3.5 py-2 text-sm font-light flex items-center gap-1 transition-colors" style={{ color: solid ? DARK : "rgba(255,255,255,0.95)" }}>
                {n.label}{n.children && <ChevronDown size={13} />}
              </Link>
              {n.children && openDrop && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 rounded-xl bg-[#F5F1EA] shadow-2xl border border-black/5 p-2">
                  {n.children.map((c) => (
                    <Link key={c.label} to={c.href} className="block w-full text-left px-4 py-2.5 text-sm font-light rounded-lg hover:bg-black/[0.04] transition-colors" style={{ color: DARK }}>{c.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <Link to="/#contact" className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Get Solutions &amp; Quote</Link>
      </div>
    </header>
  );
}

/* Closing CTA band shared by subpages */
export function CtaBand({ eyebrowText = "Get Solutions & Quote", title = "Ready to open your market?", sub = "Tell us about your project or territory — our team replies within 24 hours." }: { eyebrowText?: string; title?: string; sub?: string }) {
  return (
    <section className="px-[7vw] py-24 md:py-32 text-center" style={{ background: DARK }}>
      <Reveal className="max-w-3xl mx-auto">
        <div className={eyebrow} style={{ color: CHAMP }}>{eyebrowText}</div>
        <h2 className="mt-5 font-light leading-[1.1] text-[32px] md:text-[56px] text-white">{title}</h2>
        <p className="mt-6 max-w-xl mx-auto text-base font-normal leading-relaxed" style={{ color: "rgba(245,241,234,0.7)" }}>{sub}</p>
        <Link to="/#contact" className="mt-9 inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>
          Get Solutions &amp; Quote <ArrowRight size={15} />
        </Link>
      </Reveal>
    </section>
  );
}

const FOOTER = [
  { h: "Products", links: ["Security Doors", "Smart Locks", "Wooden Doors", "Aluminum Windows", "Whole-House Intelligence"] },
  { h: "Company", links: ["About WONLY", "Global Footprint", "Newsroom", "ESG"] },
  { h: "Contact", links: ["overseas@wonly.net", "WhatsApp +86 137-3896-0922", "LinkedIn · YouTube", "Facebook · X · Instagram"] },
];

export function SiteFooter() {
  return (
    <footer className="px-[7vw] pt-16 pb-10" style={{ background: "#1a1718" }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <img src={LOGO} alt="WONLY" className="h-6 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          <p className="mt-4 text-xs font-normal leading-relaxed" style={{ color: "rgba(245,241,234,0.5)" }}>Global Smart-Security Ecosystem Leader. SSE: 605268.</p>
        </div>
        {FOOTER.map((col) => (
          <div key={col.h}>
            <h4 className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: CHAMP }}>{col.h}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l} className="text-xs font-light" style={{ color: "rgba(245,241,234,0.6)" }}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-14 pt-6 border-t text-center text-[11px] font-light" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(245,241,234,0.4)" }}>
        © 2026 WONLY Security Technology Holding Co., Ltd. · SSE: 605268 · Privacy · Terms
      </div>
    </footer>
  );
}
