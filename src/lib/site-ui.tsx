import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, X, Check } from "lucide-react";
import { create } from "zustand";

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

/* Shared "Get a Quote" modal state (zustand) */
export const useQuoteStore = create<{
  open: boolean; presetBiz: string; presetSubject: string;
  setOpen: (v: boolean) => void;
  openQuote: (opts?: { biz?: string; subject?: string }) => void;
}>((set) => ({
  open: false,
  presetBiz: "",
  presetSubject: "",
  setOpen: (v) => set({ open: v }),
  openQuote: (opts) => set({ open: true, presetBiz: opts?.biz || "", presetSubject: opts?.subject || "" }),
}));

const QUOTE_PRODUCTS = ["Security Doors", "Smart Locks", "Wooden Doors", "Aluminum Windows", "Whole-House Intelligence", "Medical Doors"];
const BIZ_TYPES = ["Distributor / Dealer", "Project / Developer", "OEM / ODM", "Retailer", "Architect / Specifier", "Other"];
const VOLUMES = ["1–50 units", "50–500 units", "500–2,000 units", "2,000+ units", "Not sure yet"];
const TIMELINES = ["Immediately", "Within 1–3 months", "3–6 months", "6+ months / planning"];

const qLabel = "text-[11px] tracking-[0.08em] uppercase font-medium";
const qInput = "mt-1.5 w-full bg-white rounded-lg px-4 py-2.5 text-sm text-[#221F20] placeholder-black/25 focus:outline-none";

/* Detailed quote-request modal, opened from any CTA on the subpages */
export function QuoteModal() {
  const { open, setOpen, presetBiz, presetSubject } = useQuoteStore();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", role: "", country: "", email: "", phone: "", biz: "", volume: "", timeline: "", message: "" });
  const [picks, setPicks] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setForm((f) => ({ ...f, biz: presetBiz || f.biz, message: presetSubject && !f.message ? `I'm interested in WONLY's ${presetSubject}. ` : f.message }));
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, presetBiz, presetSubject]);

  if (!open) return null;

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => { if (!e[k]) return e; const n = { ...e }; delete n[k]; return n; });
  };
  const togglePick = (p: string) => setPicks((ps) => ps.includes(p) ? ps.filter((x) => x !== p) : [...ps, p]);
  const close = () => { setOpen(false); setTimeout(() => setSent(false), 300); };
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.company.trim()) e.company = "Please enter your company.";
    if (!form.country.trim()) e.country = "Please enter your country or region.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.biz) e.biz = "Please select a business type.";
    if (!form.message.trim()) e.message = "Please tell us about your project.";
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const border = (k: string) => ({ border: `1px solid ${errors[k] ? "#c0564a" : "rgba(34,31,32,0.16)"}` });
  const Err = ({ k }: { k: string }) => errors[k] ? <span className="mt-1 block text-[11px]" style={{ color: "#c0564a" }}>{errors[k]}</span> : null;

  return (
    <div className="fixed inset-0 z-[120] flex items-start md:items-center justify-center p-4 overflow-y-auto" style={{ background: "rgba(13,13,13,0.75)" }} onClick={close}>
      <div className="relative w-full max-w-2xl my-6 rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 md:px-8 py-5" style={{ background: DARK }}>
          <div>
            <div className={eyebrow} style={{ color: CHAMP }}>Get Solutions &amp; Quote</div>
            <div className="mt-1 text-white text-lg font-light">{sent ? "Request received" : "Tell us about your project"}</div>
          </div>
          <button onClick={close} aria-label="Close" className="text-white/70 hover:text-white transition-colors"><X size={22} /></button>
        </div>

        {sent ? (
          <div className="p-10 md:p-14 text-center">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${GOLD}22` }}><Check size={22} style={{ color: GOLD }} /></div>
            <h3 className="mt-5 text-xl md:text-2xl font-light" style={{ color: DARK }}>Thank you — we'll be in touch within 24 hours.</h3>
            <p className="mt-3 text-sm font-light" style={{ color: MUTED }}>Our team will reply with tailored specifications, compliance documentation and pricing.</p>
            <button onClick={close} className="mt-7 px-7 py-3 rounded-full text-sm font-medium" style={{ background: GOLD, color: DARK }}>Close</button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="p-6 md:p-8 max-h-[72vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Full Name <span style={{ color: "#c0564a" }}>*</span></span>
                <input className={qInput} style={border("name")} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" /><Err k="name" /></label>
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Company <span style={{ color: "#c0564a" }}>*</span></span>
                <input className={qInput} style={border("company")} value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" /><Err k="company" /></label>
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Job Title</span>
                <input className={qInput} style={border("role")} value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Purchasing Manager" /></label>
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Country / Region <span style={{ color: "#c0564a" }}>*</span></span>
                <input className={qInput} style={border("country")} value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Country / region" /><Err k="country" /></label>
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Email <span style={{ color: "#c0564a" }}>*</span></span>
                <input type="email" className={qInput} style={border("email")} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" /><Err k="email" /></label>
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Phone / WhatsApp</span>
                <input className={qInput} style={border("phone")} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 ..." /></label>
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Business Type <span style={{ color: "#c0564a" }}>*</span></span>
                <select className={qInput} style={{ ...border("biz"), color: form.biz ? "#221F20" : "rgba(34,31,32,0.4)" }} value={form.biz} onChange={(e) => set("biz", e.target.value)}>
                  <option value="" disabled>Select…</option>{BIZ_TYPES.map((b) => <option key={b}>{b}</option>)}
                </select><Err k="biz" /></label>
              <label className="block"><span className={qLabel} style={{ color: MUTED }}>Estimated Volume</span>
                <select className={qInput} style={{ ...border("volume"), color: form.volume ? "#221F20" : "rgba(34,31,32,0.4)" }} value={form.volume} onChange={(e) => set("volume", e.target.value)}>
                  <option value="" disabled>Select…</option>{VOLUMES.map((b) => <option key={b}>{b}</option>)}
                </select></label>
              <label className="block sm:col-span-2"><span className={qLabel} style={{ color: MUTED }}>Target Timeline</span>
                <select className={qInput} style={{ ...border("timeline"), color: form.timeline ? "#221F20" : "rgba(34,31,32,0.4)" }} value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
                  <option value="" disabled>Select…</option>{TIMELINES.map((b) => <option key={b}>{b}</option>)}
                </select></label>
            </div>

            <div className="mt-5"><span className={qLabel} style={{ color: MUTED }}>Products of Interest</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {QUOTE_PRODUCTS.map((p) => {
                  const on = picks.includes(p);
                  return <button type="button" key={p} onClick={() => togglePick(p)} className="px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors" style={on ? { background: GOLD, color: DARK } : { background: "transparent", color: MUTED, border: `1px solid ${SILVER}88` }}>{p}</button>;
                })}
              </div>
            </div>

            <label className="block mt-5"><span className={qLabel} style={{ color: MUTED }}>Message <span style={{ color: "#c0564a" }}>*</span></span>
              <textarea rows={3} className={qInput + " resize-none"} style={border("message")} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about your project, territory or requirements…" /><Err k="message" /></label>

            <button type="submit" className="mt-6 w-full px-8 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.01]" style={{ background: GOLD, color: DARK }}>Submit Request</button>
            <p className="mt-3 text-center text-[11px] font-light" style={{ color: MUTED }}>We reply within 24 hours. Your details are used only to respond to this enquiry.</p>
          </form>
        )}
      </div>
    </div>
  );
}

/* Sticky header — transparent over a dark hero, frosted once scrolled */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const openQuote = useQuoteStore((s) => s.openQuote);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
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
        <button onClick={() => openQuote()} className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Get Solutions &amp; Quote</button>
      </div>
    </header>
    <QuoteModal />
    </>
  );
}

/* Closing CTA band shared by subpages */
export function CtaBand({ eyebrowText = "Get Solutions & Quote", title = "Ready to open your market?", sub = "Tell us about your project or territory — our team replies within 24 hours." }: { eyebrowText?: string; title?: string; sub?: string }) {
  const openQuote = useQuoteStore((s) => s.openQuote);
  return (
    <section className="px-[7vw] py-24 md:py-32 text-center" style={{ background: DARK }}>
      <Reveal className="max-w-3xl mx-auto">
        <div className={eyebrow} style={{ color: CHAMP }}>{eyebrowText}</div>
        <h2 className="mt-5 font-light leading-[1.1] text-[32px] md:text-[56px] text-white">{title}</h2>
        <p className="mt-6 max-w-xl mx-auto text-base font-normal leading-relaxed" style={{ color: "rgba(245,241,234,0.7)" }}>{sub}</p>
        <button onClick={() => openQuote()} className="mt-9 inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>
          Get Solutions &amp; Quote <ArrowRight size={15} />
        </button>
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
