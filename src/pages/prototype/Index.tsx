import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone, Check } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";

/* ── Silver-White-Gold palette ─────────────────────────────── */
const GOLD = "#BFA06A";
const CHAMP = "#D4C4A0";
const SILVER = "#B8BFC8";
const CHAMP_BG = "#F5F1EA";
const DARK = "#221F20";
const MUTED = "#5f5a54";

const BASE = import.meta.env.BASE_URL;
const DOOR_VIDEO = `${BASE}videos/hero-door.mp4`;
const DOOR_POSTER = `${BASE}videos/hero-door-poster.webp`;
const VIDEO_FALLBACK_DURATION = 3.5;
const IMG = {
  interior: `${BASE}images/interior-bg.jpg`,
  yizhai1: `${BASE}images/yizhai-1.jpg`, // bronze relief
  yizhai2: `${BASE}images/yizhai-2.jpg`, // koi
  yizhai3: `${BASE}images/yizhai-3.jpg`, // wave
  yizhai4: `${BASE}images/yizhai-4.jpg`, // silver dragon
  haja1: `${BASE}images/haja-1.jpg`,
  haja2: `${BASE}images/haja-2.jpg`,
  haja3: `${BASE}images/haja-3.jpg`,
  haja4: `${BASE}images/haja-4.jpg`,
  wood: `${BASE}images/product-3.png`,
};

/* ── Navigation ────────────────────────────────────────────── */
const NAV = [
  { label: "Products", to: "products", children: ["Security Doors", "Smart Locks", "Wooden Doors", "Aluminum Windows", "Whole-House Intelligence"] },
  { label: "Solutions", to: "solutions" },
  { label: "Why WONLY", to: "why" },
  { label: "Global Footprint", to: "footprint" },
  { label: "About", to: "why" },
  { label: "Contact", to: "contact" },
];

/* ── Section 2 · capacity stats ────────────────────────────── */
const STATS = [
  { to: 1000000, comma: true, suffix: "+ m²", label: "Manufacturing Base" },
  { to: 6, suffix: "M", per: "/ year", label: "Security Doors" },
  { to: 3, suffix: "M", per: "/ year", label: "Smart Locks" },
  { to: 30, suffix: "+", label: "Countries & Regions" },
];

/* ── Section 3 · Why WONLY ─────────────────────────────────── */
const MILESTONES = [
  { k: "Listed", v: "Shanghai Stock Exchange (SSE: 605268) — the sector's first public company, 2021" },
  { k: "30 years", v: "Founded 1996 in Yongkang, Zhejiang" },
  { k: "5 bases · 6 R&D centers", v: "Vertically integrated manufacturing & innovation" },
  { k: "1,000+ patents", v: "Proprietary security & smart-lock technology" },
  { k: "200M+ users", v: "Protected worldwide" },
  { k: "No.1", v: "National sales leader in smart doors & smart locks, 2024–2025" },
];
const VALUES = [
  { n: "01", t: "One-Stop Ecosystem", d: "Doors, smart locks, windows and whole-house intelligence under one roof. One supplier, one warranty, one accountable partner — from threshold to rooftop.", img: IMG.interior },
  { n: "02", t: "Unbeatable Cost-Performance", d: "Vertical integration across five manufacturing bases and 1,000+ patents delivers premium security at a price point 20–30% below comparable Western brands.", img: IMG.yizhai3 },
  { n: "03", t: "Quality First", d: "ISO 9001 / 14001, CE, UL and EN 1634 fire-rated. Every door passes 90-minute fire, forced-entry and 100,000-cycle testing. Three decades, zero major safety incidents.", img: IMG.yizhai1 },
];

/* ── Section 4 · Products ──────────────────────────────────── */
const COLLECTIONS = [
  { name: "YIZHAI YISHU", tag: "Artisan Collection", d: "Sculptural luxury doors for villas and flagship projects — where security becomes heritage art.", img: IMG.yizhai1 },
  { name: "HAJA", tag: "Smart Security", d: "Reliable smart doors and locks engineered for residential and commercial projects at scale.", img: IMG.haja1 },
];
const PRODUCT_RAIL = [
  { n: "01", name: "Robotic Security Door X70", d: "Flagship: autonomous locking, multi-vector intrusion sensing, cast-aluminum build.", img: IMG.haja2 },
  { n: "02", name: "S80 True-Sensing Smart Lock", d: "Hands-free long-range sensing, biometric + app control, tamper-proof architecture.", img: IMG.haja1 },
  { n: "03", name: "4.0 Global Series Doors", d: "Fire-rated, anti-theft, climate-adapted to global standards.", img: IMG.haja4 },
  { n: "04", name: "Engineering Doors", d: "Fire-rated / access-control / acoustic — compliant with Gulf, SEA & Central Asia standards.", img: IMG.haja3 },
  { n: "05", name: "Medical-Grade Doors", d: "Hermetic operating-room & ward doors engineered for hospitals.", img: IMG.wood },
];

/* ── Section 5 · Solutions ─────────────────────────────────── */
const SOLUTIONS = [
  { t: "Premium Residential & Villas", d: "Bespoke designs, ultra-high security grades and whole-house smart integration.", img: IMG.interior },
  { t: "High-Security Commercial", d: "Banks, data centers and corporate HQs — defeats forced entry while meeting fire codes.", img: IMG.yizhai4 },
  { t: "Medical & Public Institutions", d: "Hermetic OR doors, ward doors and access-controlled entries.", img: IMG.wood },
  { t: "Engineering / Bulk Projects", d: "Standardized, certified supply for large developments.", img: IMG.haja3 },
];

/* ── Section 6 · Certifications & Honors ───────────────────── */
const CERTS = ["ISO 9001", "ISO 14001", "CE", "UL", "EN 1634 Fire", "CMA", "CSPPA"];
const HONORS = [
  "iF Product Design Award",
  "National High-Tech Enterprise",
  "National Quality Benchmark",
  "National Standard Co-drafter",
  "TOP500 Preferred Supplier — China Real-Estate Supply Chain, 2025",
];

/* ── Section 7 · Partnership ───────────────────────────────── */
const PARTNERSHIP = [
  { t: "Distributor Program", d: "Join a global network backed by 30 years of brand equity, full product training and regional marketing support.", cta: "Become a Distributor" },
  { t: "Project Cooperation", d: "Residential, commercial, medical, hotel, government and public projects.", cta: "Submit a Project" },
  { t: "OEM / ODM Services", d: "Leverage our smart factories and 1,000+ patents to build your own branded security line.", cta: "Request OEM/ODM Brief" },
  { t: "Global Distribution Network", d: "Regional HQs, local offices and authorized partners across the Middle East, Southeast Asia and Central Asia.", cta: "Find a Local Partner" },
];

/* ── Section 8 · Timeline ──────────────────────────────────── */
const TIMELINE = [
  { y: "1996", m: "Brand founded, Yongkang, Zhejiang" },
  { y: "2000s", m: "National sales leadership in security doors & smart locks" },
  { y: "2021", m: "Listed on Shanghai Stock Exchange (SSE: 605268)" },
  { y: "Today", m: "5 global bases, 6 R&D centers, 200M+ users worldwide" },
];

/* ── Section 9 · Partners (text only — logos pending authorization) ── */
const PARTNER_NAMES = ["Huawei", "Alibaba Cloud", "Siemens", "Foxconn", "Hikvision", "Vanke", "Country Garden", "Poly", "CR Land", "China Overseas", "Greentown"];

/* ── Footer ────────────────────────────────────────────────── */
const FOOTER = [
  { h: "Products", links: ["Security Doors", "Smart Locks", "Wooden Doors", "Aluminum Windows", "Whole-House Intelligence"] },
  { h: "Solutions", links: ["Premium Residential", "Commercial", "Medical & Public", "Engineering", "OEM / ODM"] },
  { h: "Company", links: ["Why WONLY", "Global Footprint", "About", "Newsroom", "ESG"] },
  { h: "Resources", links: ["Product Catalogs", "Certifications", "Install Guides", "Warranty"] },
  { h: "Contact", links: ["overseas@wonly.net", "WhatsApp +86 137-3896-0922", "LinkedIn · YouTube", "Facebook · X · Instagram"] },
];

/* ── Helpers ───────────────────────────────────────────────── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

function CountUp({ to, run, comma = false, suffix = "" }: { to: number; run?: boolean; comma?: boolean; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const play = () => {
      if (done.current) return;
      done.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1700, 1);
        setN(Math.floor(p * to));
        if (p < 1) requestAnimationFrame(tick); else setN(to);
      };
      requestAnimationFrame(tick);
    };
    if (run !== undefined) { if (run) play(); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); play(); } }), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [run, to]);
  return <span ref={ref}>{comma ? n.toLocaleString("en-US") : n}{suffix}</span>;
}

const eyebrow = "text-[11px] tracking-[0.5em] uppercase font-light";
const h2cls = "font-thin leading-[1.1] tracking-[0.01em] text-[34px] md:text-[58px]";

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const Prototype = () => {
  const doorVideo = useRef<HTMLVideoElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [contentIn, setContentIn] = useState(false);
  const [solid, setSolid] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);

  useSeo({
    title: "WONLY | Global Smart-Security Ecosystem Leader — Security Doors & Smart Locks Manufacturer",
    description:
      "WONLY is a listed (SSE: 605268) manufacturer of premium security doors and smart locks — 1,000,000+ m² base, 6M doors & 3M locks a year, 1,000+ patents, serving distributors and projects in 30+ countries.",
    path: "/prototype",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "WONLY",
      legalName: "WONLY Security Technology Holding Co., Ltd.",
      url: SITE_URL + "/",
      slogan: "Global Smart-Security Ecosystem Leader",
      foundingDate: "1996",
      email: "overseas@wonly.net",
    },
  });

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero: scroll once → autoplay the door open → reveal copy on the bright interior frame → release page.
  useLayoutEffect(() => {
    const v = doorVideo.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showReveal = () => { if (reveal.current) { reveal.current.style.opacity = "1"; reveal.current.style.visibility = "visible"; } setContentIn(true); };

    if (reduced) {
      if (v) {
        v.pause();
        const setOpen = () => { try { v.currentTime = v.duration || VIDEO_FALLBACK_DURATION; } catch { /* poster ok */ } };
        if (v.readyState >= 1) setOpen(); else v.addEventListener("loadedmetadata", setOpen, { once: true });
      }
      if (title.current) title.current.style.opacity = "0";
      if (scrim.current) scrim.current.style.opacity = "0";
      showReveal();
      return;
    }

    if (reveal.current) { reveal.current.style.opacity = "0"; reveal.current.style.visibility = "hidden"; reveal.current.style.transition = "opacity 1s ease"; }

    let triggered = false;
    let done = false;
    const lock = () => { document.body.style.overflow = "hidden"; document.body.style.touchAction = "none"; };
    const unlock = () => { document.body.style.overflow = ""; document.body.style.touchAction = ""; };
    const removeIntent = () => { window.removeEventListener("wheel", onIntent); window.removeEventListener("touchmove", onIntent); window.removeEventListener("keydown", onKey); };

    const finish = () => {
      if (done) return;
      done = true;
      removeIntent();
      unlock();
      if (reveal.current) reveal.current.style.visibility = "visible";
      requestAnimationFrame(() => { if (reveal.current) reveal.current.style.opacity = "1"; });
      setContentIn(true);
    };
    const startPlay = () => {
      if (triggered) return;
      triggered = true;
      window.scrollTo(0, 0);
      if (title.current) { title.current.style.transition = "opacity 1.1s ease, transform 1.1s ease"; title.current.style.opacity = "0"; title.current.style.transform = "translateY(-60px)"; }
      if (scrim.current) { scrim.current.style.transition = "opacity 1.4s ease"; scrim.current.style.opacity = "0"; }
      if (v) v.play().catch(() => finish()); else finish();
    };
    function onIntent(e: Event) { if (done) return; if (e.cancelable) e.preventDefault(); if (!triggered) startPlay(); }
    function onKey(e: KeyboardEvent) { if (done || triggered) return; if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); startPlay(); } }

    window.scrollTo(0, 0);
    lock();
    window.addEventListener("wheel", onIntent, { passive: false });
    window.addEventListener("touchmove", onIntent, { passive: false });
    window.addEventListener("keydown", onKey);
    const onEnded = () => finish();
    v?.addEventListener("ended", onEnded);

    skipRef.current = () => {
      if (done) return;
      if (v) { v.pause(); try { v.currentTime = v.duration || VIDEO_FALLBACK_DURATION; } catch { /* ignore */ } }
      if (title.current) title.current.style.opacity = "0";
      if (scrim.current) scrim.current.style.opacity = "0";
      finish();
    };

    return () => { removeIntent(); v?.removeEventListener("ended", onEnded); unlock(); };
  }, []);

  return (
    <div className="w-full text-[#221F20] font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG }}>
      {/* ══ Header ══ */}
      <header className={`fixed top-0 inset-x-0 z-[70] transition-all duration-500 ${solid ? "bg-[#F5F1EA]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(34,31,32,0.06)]" : "bg-transparent"}`}>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          <button onClick={() => scrollToId("top")} className="text-xl font-bold tracking-[0.2em]" style={{ color: solid ? DARK : "#fff" }}>WONLY</button>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <div key={n.label} className="relative" onMouseEnter={() => n.children && setOpenDrop(true)} onMouseLeave={() => setOpenDrop(false)}>
                <button onClick={() => scrollToId(n.to)} className="px-3.5 py-2 text-sm font-light flex items-center gap-1 transition-colors" style={{ color: solid ? DARK : "rgba(255,255,255,0.9)" }}>
                  {n.label}{n.children && <ChevronDown size={13} />}
                </button>
                {n.children && openDrop && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 rounded-xl bg-[#F5F1EA] shadow-2xl border border-black/5 p-2">
                    {n.children.map((c) => (
                      <button key={c} onClick={() => scrollToId("products")} className="block w-full text-left px-4 py-2.5 text-sm font-light rounded-lg hover:bg-black/[0.04] transition-colors" style={{ color: DARK }}>{c}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button onClick={() => scrollToId("contact")} className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>
            Get Solutions &amp; Quote
          </button>
        </div>
      </header>

      {/* ══ 1 · Hero door video + 2 · reveal on interior frame ══ */}
      <section id="top" className="relative h-[100dvh] w-full overflow-hidden" style={{ background: "#0d0d0d" }}>
        <video ref={doorVideo} className="absolute top-0 left-0 z-0 object-cover object-center" style={{ width: "100vw", height: "100dvh" }} src={DOOR_VIDEO} poster={DOOR_POSTER} muted playsInline preload="auto" aria-hidden="true" />

        <div ref={scrim} className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(72% 78% at 50% 45%, rgba(13,13,13,0.68) 0%, rgba(13,13,13,0.40) 50%, rgba(13,13,13,0) 82%)" }} />

        {/* Title over closed door */}
        <div ref={title} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 py-[8vh] pointer-events-none text-center">
          <div className="tracking-[0.38em] uppercase font-semibold mb-[2.2vh]" style={{ fontSize: "clamp(10px, 1.1vw, 13px)", color: CHAMP, textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}>Security Doors · Smart Locks · OEM/ODM Manufacturer</div>
          <h1 className="font-light uppercase text-white leading-[1.02] tracking-[0.08em]" style={{ fontSize: "clamp(2.1rem, min(6vw, 8.4vh), 5.2rem)", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
            Open the Door<br />to Your<br /><span style={{ color: CHAMP }}>Next Market</span>
          </h1>
          <p className="mt-[3vh] max-w-xl font-light leading-relaxed" style={{ fontSize: "clamp(13px, 1.05vw, 16px)", color: "#efe9dd", textShadow: "0 1px 14px rgba(0,0,0,0.5)" }}>A trusted manufacturer of premium security doors and smart locks — supplying distributors and projects worldwide.</p>
          <div className="mt-[3.2vh] flex flex-col items-center gap-2">
            <span className="text-[11px] tracking-[0.5em] uppercase font-light" style={{ color: CHAMP_BG, textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>Scroll to Enter ↓</span>
            <span className="block w-px h-[6vh] max-h-12 animate-pulse" style={{ background: `linear-gradient(${GOLD}, transparent)` }} />
          </div>
        </div>

        {/* Reveal copy on bright interior end frame */}
        <div ref={reveal} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-[7vw] py-16 overflow-y-auto">
          <div className="relative z-10 w-full max-w-6xl mx-auto text-center" style={{ textShadow: "0 1px 18px rgba(245,241,234,0.92), 0 1px 4px rgba(245,241,234,0.7)" }}>
            <div className={eyebrow + " mb-5"} style={{ color: GOLD }}>The Partnership</div>
            <h2 className="font-thin leading-[1.12] tracking-[0.06em] text-[36px] md:text-[64px]" style={{ color: DARK }}>Global Smart-Security<br />Ecosystem Leader</h2>
            <div className="mt-12 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-extralight leading-none whitespace-nowrap" style={{ color: GOLD }}>
                    <span className="text-[32px] md:text-[46px]"><CountUp to={s.to} run={contentIn} comma={s.comma} suffix={s.suffix} /></span>
                    {s.per && <span className="text-base md:text-lg ml-1 font-light">{s.per}</span>}
                  </div>
                  <div className="mt-3 text-[11px] md:text-xs tracking-[0.22em] uppercase font-medium" style={{ color: DARK }}>{s.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs md:text-sm font-light" style={{ color: MUTED }}>Plus 3M wooden doors and 1.5M m² of doors &amp; windows produced annually.</p>
            <div className="mt-10 text-[11px] tracking-[0.4em] uppercase font-light animate-pulse" style={{ color: DARK }}>Scroll ↓</div>
          </div>
        </div>

        <button type="button" onClick={() => skipRef.current()} className="absolute bottom-6 right-6 z-40 text-[11px] tracking-[0.3em] uppercase font-light text-white/60 hover:text-white transition-colors mix-blend-difference">Skip ↓</button>
      </section>

      {/* ══ 3 · Why WONLY ══ */}
      <section id="why" className="px-[7vw] py-28 md:py-36">
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Why WONLY</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>A partner built for scale, trusted at the top.</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 border-t" style={{ borderColor: `${SILVER}66` }}>
          {MILESTONES.map((m, i) => (
            <Reveal key={m.k} delay={(i % 3) * 80} className="pt-8 border-t md:border-t-0" >
              <div className="text-2xl md:text-[28px] font-thin" style={{ color: GOLD }}>{m.k}</div>
              <div className="mt-3 text-sm font-light leading-relaxed" style={{ color: MUTED }}>{m.v}</div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 space-y-20 md:space-y-28">
          {VALUES.map((val, i) => (
            <Reveal key={val.n}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <div className="[direction:ltr] overflow-hidden">
                  <img src={val.img} alt={val.t} loading="lazy" className="w-full h-[280px] md:h-[420px] object-cover" />
                </div>
                <div className="[direction:ltr]">
                  <div className="font-mono text-sm mb-4" style={{ color: GOLD }}>{val.n}</div>
                  <h3 className="text-2xl md:text-4xl font-thin tracking-tight" style={{ color: DARK }}>{val.t}</h3>
                  <p className="mt-5 max-w-md text-base font-light leading-relaxed" style={{ color: MUTED }}>{val.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 4 · Products ══ */}
      <section id="products" className="px-[7vw] py-28 md:py-36" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Our Products</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Two icon collections. A full building-entry portfolio.</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {COLLECTIONS.map((c) => (
            <Reveal key={c.name}>
              <div className="group">
                <div className="overflow-hidden">
                  <img src={c.img} alt={`${c.name} — ${c.tag}`} loading="lazy" className="w-full h-[420px] md:h-[560px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <h3 className="text-2xl md:text-3xl font-thin tracking-[0.06em]" style={{ color: DARK }}>{c.name}</h3>
                  <span className="text-[11px] tracking-[0.28em] uppercase font-medium" style={{ color: GOLD }}>{c.tag}</span>
                </div>
                <p className="mt-4 max-w-md text-sm md:text-base font-light leading-relaxed" style={{ color: MUTED }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* horizontal product rail */}
        <div className="mt-20">
          <div className="flex items-baseline justify-between mb-6">
            <div className="text-[11px] tracking-[0.4em] uppercase font-light" style={{ color: MUTED }}>Flagship line-up</div>
            <div className="text-[11px] tracking-[0.3em] uppercase font-light" style={{ color: SILVER }}>scroll →</div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-[7vw] px-[7vw]" style={{ scrollSnapType: "x mandatory" }}>
            {PRODUCT_RAIL.map((p) => (
              <div key={p.n} className="shrink-0 w-[300px] md:w-[360px]" style={{ scrollSnapAlign: "start" }}>
                <div className="overflow-hidden"><img src={p.img} alt={p.name} loading="lazy" className="w-full h-[300px] object-cover" /></div>
                <div className="mt-4 font-mono text-xs" style={{ color: GOLD }}>{p.n}</div>
                <div className="mt-1 text-lg font-light" style={{ color: DARK }}>{p.name}</div>
                <p className="mt-2 text-sm font-light leading-relaxed" style={{ color: MUTED }}>{p.d}</p>
              </div>
            ))}
          </div>
          <button onClick={() => scrollToId("contact")} className="mt-8 inline-flex items-center gap-2 text-sm font-medium" style={{ color: GOLD }}>Browse Full Catalog <ArrowRight size={15} /></button>
        </div>
      </section>

      {/* ══ 5 · Solutions ══ */}
      <section id="solutions" className="px-[7vw] py-28 md:py-36">
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Solutions</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Engineered for every project type.</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.t} delay={(i % 2) * 90}>
              <div className="group">
                <div className="relative overflow-hidden h-[300px] md:h-[380px]">
                  <img src={s.img} alt={s.t} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute top-5 left-5 font-mono text-xs px-2.5 py-1 rounded-full" style={{ background: `${CHAMP_BG}e6`, color: DARK }}>{`0${i + 1}`}</div>
                </div>
                <h3 className="mt-6 text-xl md:text-2xl font-thin" style={{ color: DARK }}>{s.t}</h3>
                <p className="mt-3 max-w-md text-sm font-light leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <button onClick={() => scrollToId("contact")} className="mt-12 inline-flex items-center gap-2 text-sm font-medium" style={{ color: GOLD }}>Explore Solutions <ArrowRight size={15} /></button>
      </section>

      {/* ══ 6 · Certifications & Honors ══ */}
      <section id="certs" className="px-[7vw] py-28 md:py-36" style={{ background: DARK }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: CHAMP }}>Certified &amp; Recognized</div>
          <h2 className={h2cls + " mt-5 text-white"}>Held to standards, honored at the top.</h2>
        </Reveal>
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-y py-8" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
          {CERTS.map((c) => (
            <span key={c} className="font-mono text-sm md:text-base tracking-wide" style={{ color: "rgba(245,241,234,0.85)" }}>{c}</span>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5">
          {HONORS.map((h, i) => (
            <Reveal key={h} delay={(i % 2) * 80}>
              <div className="flex items-start gap-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="font-mono text-xs mt-1" style={{ color: GOLD }}>{`0${i + 1}`}</span>
                <span className="text-base font-light" style={{ color: "rgba(245,241,234,0.92)" }}>{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 7 · Partnership ══ */}
      <section id="partnership" className="px-[7vw] py-28 md:py-36">
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Partner With WONLY</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Open the door to partnership.</h2>
        </Reveal>
        <div className="mt-14 border-t" style={{ borderColor: `${SILVER}66` }}>
          {PARTNERSHIP.map((p, i) => (
            <Reveal key={p.t}>
              <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-8 border-b" style={{ borderColor: `${SILVER}66` }}>
                <div className="md:col-span-1 font-mono text-sm" style={{ color: GOLD }}>{`0${i + 1}`}</div>
                <h3 className="md:col-span-3 text-xl md:text-2xl font-thin" style={{ color: DARK }}>{p.t}</h3>
                <p className="md:col-span-5 text-sm font-light leading-relaxed" style={{ color: MUTED }}>{p.d}</p>
                <div className="md:col-span-3 md:text-right">
                  <button onClick={() => scrollToId("contact")} className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3" style={{ color: DARK }}>{p.cta} <ArrowUpRight size={15} style={{ color: GOLD }} /></button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 8 · Global Footprint ══ */}
      <section id="footprint" className="px-[7vw] py-28 md:py-36" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Global Footprint</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>From Yongkang to 30+ countries and regions.</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.y} delay={i * 100}>
              <div className="relative pt-8 border-t-2" style={{ borderColor: GOLD }}>
                <div className="text-3xl md:text-4xl font-thin" style={{ color: DARK }}>{t.y}</div>
                <p className="mt-3 text-sm font-light leading-relaxed" style={{ color: MUTED }}>{t.m}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 9 · Partners (text, logos pending authorization) ══ */}
      <section id="partners" className="px-[7vw] py-20 md:py-24 text-center">
        <Reveal>
          <div className={eyebrow + " mb-6"} style={{ color: GOLD }}>Trusted Across Industries</div>
          <p className="text-lg md:text-2xl font-thin max-w-4xl mx-auto leading-snug" style={{ color: DARK }}>
            Trusted by leading technology companies and top real-estate developers across Asia and the Middle East.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-4xl mx-auto">
            {PARTNER_NAMES.map((p) => (
              <span key={p} className="text-sm font-light" style={{ color: SILVER }}>{p}</span>
            ))}
          </div>
          {/* TODO: replace text with authorized partner logos once usage rights are confirmed */}
        </Reveal>
      </section>

      {/* ══ 10 · Contact / Inquiry ══ */}
      <section id="contact" className="px-[7vw] py-28 md:py-36" style={{ background: DARK }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
          <Reveal>
            <div className={eyebrow} style={{ color: CHAMP }}>Get Solutions &amp; Quote</div>
            <h2 className="mt-5 font-thin leading-[1.1] text-[38px] md:text-[64px] text-white">Ready to open<br />your market?</h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed" style={{ color: "rgba(245,241,234,0.7)" }}>
              Tell us about your project or territory — our team replies within 24 hours with tailored specifications, compliance documentation and pricing.
            </p>
            <div className="mt-10 space-y-3 text-sm font-light" style={{ color: "rgba(245,241,234,0.85)" }}>
              <div className="flex items-center gap-3"><Mail size={16} style={{ color: GOLD }} /> overseas@wonly.net</div>
              <div className="flex items-center gap-3"><MessageCircle size={16} style={{ color: GOLD }} /> WhatsApp +86 137-3896-0922</div>
              <div className="flex items-center gap-3"><Phone size={16} style={{ color: GOLD }} /> LinkedIn · YouTube · Facebook · X · Instagram</div>
            </div>
          </Reveal>

          {/* TODO: wire submission to a real endpoint (overseas@wonly.net or a form service) before launch */}
          <Reveal delay={120}>
            <form onSubmit={(e) => { e.preventDefault(); /* TODO: connect real recipient */ }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[["Name", "Your full name"], ["Company", "Company name"], ["Country", "Country / region"], ["Email", "you@company.com"]].map(([l, ph]) => (
                <label key={l} className="block">
                  <span className="text-[11px] tracking-wide uppercase" style={{ color: "rgba(245,241,234,0.55)" }}>{l}</span>
                  <input className="mt-1.5 w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#BFA06A]" placeholder={ph} />
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className="text-[11px] tracking-wide uppercase" style={{ color: "rgba(245,241,234,0.55)" }}>Interest</span>
                <select className="mt-1.5 w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#BFA06A]">
                  <option className="text-black">Distributor</option>
                  <option className="text-black">Project</option>
                  <option className="text-black">OEM / ODM</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[11px] tracking-wide uppercase" style={{ color: "rgba(245,241,234,0.55)" }}>Message</span>
                <textarea rows={3} className="mt-1.5 w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#BFA06A] resize-none" placeholder="Tell us about your project or territory..." />
              </label>
              <button type="submit" className="sm:col-span-2 mt-2 px-8 py-4 rounded-full text-sm font-medium transition-transform hover:scale-[1.02]" style={{ background: GOLD, color: DARK }}>Get Solutions &amp; Quote</button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <footer className="px-[7vw] pt-16 pb-10" style={{ background: "#1a1718" }}>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold tracking-[0.2em] text-white">WONLY</div>
            <p className="mt-4 text-xs font-light leading-relaxed" style={{ color: "rgba(245,241,234,0.5)" }}>Global Smart-Security Ecosystem Leader. SSE: 605268.</p>
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
    </div>
  );
};

export default Prototype;
