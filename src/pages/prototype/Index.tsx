import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone, Check, ShieldCheck, Play, X, TrendingUp, CalendarDays, Factory, Lightbulb, Users, Trophy } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { useQuoteStore, QuoteModal } from "@/lib/site-ui";

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
const LOGO = `${BASE}images/logo-trim.webp`;
const VIDEO_FALLBACK_DURATION = 3.5;
const IMG = {
  interior: `${BASE}images/interior-bg.jpg`,
  yizhai1: `${BASE}images/yizhai-1.webp`, // bronze relief
  yizhai2: `${BASE}images/yizhai-2.jpg`, // koi
  yizhai3: `${BASE}images/yizhai-3.jpg`, // wave
  yizhai4: `${BASE}images/yizhai-4.jpg`, // silver dragon
  haja1: `${BASE}images/haja-1.jpg`,
  haja3: `${BASE}images/haja-3.jpg`,
  factoryLab: `${BASE}images/factory-1.webp`, // clean R&D / QC lab
  factoryLine: `${BASE}images/factory-2.webp`, // SMT production line
  factoryLineA: `${BASE}images/factory-line-a.webp`, // 8K WONLY stamping line (branded)
  factoryLineB: `${BASE}images/factory-line-b.webp`, // WONLY press line + mold tower (branded)
  factoryAbb: `${BASE}images/factory-abb.webp`, // ABB robot handling a door panel
  lockS80: `${BASE}images/lock-s80.webp`, // real WONLY S80 smart lock
  aluPro: `${BASE}images/alu-k300pro.webp`,
  aluMax: `${BASE}images/alu-k300max.webp`,
  aluT200: `${BASE}images/alu-t200.webp`,
  alu40: `${BASE}images/alu-40.webp`, // 4.0 Global Series
  wood1: `${BASE}images/wood-1.png`,
  wood2: `${BASE}images/wood-2.webp`,
  proj1: `${BASE}images/proj-1.webp`, // Hangzhou G20 Expo Center
  proj2: `${BASE}images/proj-2.webp`, // Egypt New Capital CBD
  residential: `${BASE}images/proj-s-5.webp`, // Tianjin National Village — residential
  publicInst: `${BASE}images/proj-s-7.webp`, // institutional building
  top500: `${BASE}images/top500-5.jpg`,
  partnersRe: `${BASE}images/partners-re.webp`,
};

/* ── Navigation ────────────────────────────────────────────── */
type NavChild = { label: string; href?: string; to?: string };
type NavItem = { label: string; to?: string; href?: string; children?: NavChild[] };
const NAV: NavItem[] = [
  { label: "Products", to: "products", children: [
    { label: "Security Doors", href: "/products/security-doors" },
    { label: "Smart Lock S80", href: "/products/smart-locks/s80" },
    { label: "Wooden Doors", to: "products" },
    { label: "Aluminum Windows", to: "products" },
    { label: "Whole-House Intelligence", to: "products" },
  ] },
  { label: "Solutions", to: "solutions" },
  { label: "Why WONLY", to: "why" },
  { label: "Global Footprint", to: "footprint" },
  { label: "About", href: "/about" },
  { label: "Contact", to: "contact" },
];

/* ── Section 2 · capacity stats ────────────────────────────── */
const STATS: { to?: number; text?: string; comma?: boolean; suffix?: string; per?: string; label: string }[] = [
  { to: 1000000, comma: true, suffix: "+ m²", label: "Manufacturing Base" },
  { to: 6, suffix: "M", per: "/ year", label: "Annual Production Capacity" },
  { to: 60, suffix: "+", label: "Countries & Regions" },
];

/* ── Section 3 · Why WONLY ─────────────────────────────────── */
const MILESTONES = [
  { icon: TrendingUp, k: "Listed", v: "The First Listed Enterprise in China's Security Door & Lock Industry" },
  { icon: CalendarDays, k: "30 years", v: "Founded 1996 in Yongkang, Zhejiang" },
  { icon: Factory, k: "5 bases · 6 R&D centers", v: "Vertically integrated manufacturing & innovation" },
  { icon: Lightbulb, k: "1,000+ patents", v: "Proprietary security & smart-lock technology" },
  { icon: Users, k: "200M+ users", v: "Protected worldwide" },
  { icon: Trophy, k: "No.1", v: "National sales leader in smart doors & smart locks, 2024–2025" },
];
const WHO_CHECK = [
  "One-Stop Ecosystem — doors, locks, windows & whole-house intelligence",
  "Certified Quality — ISO 9001 / 14001, CE, UL, EN 1634 fire-rated",
  "Premium security 20–30% below comparable Western brands",
];
const FOOTPRINT_STATS = [
  { to: 60, suffix: "+", label: "Countries & Regions" },
  { to: 5, label: "Manufacturing Bases" },
  { to: 6, label: "R&D Centers" },
  { to: 200, suffix: "M+", label: "Users Worldwide" },
];

/* ── Section 4 · Products ──────────────────────────────────── */
const PRODUCT_RAIL = [
  { n: "01", name: "Robotic Security Door X70", cat: "door", d: "Flagship: autonomous locking, multi-vector intrusion sensing, cast-aluminum build.", img: IMG.aluMax },
  { n: "02", name: "S80 True-Sensing Smart Lock", cat: "lock", d: "Hands-free long-range sensing, biometric + app control, tamper-proof architecture.", img: IMG.lockS80 },
  { n: "03", name: "4.0 Global Series Doors", cat: "door", d: "Fire-rated, anti-theft, climate-adapted to global standards.", img: IMG.alu40 },
  { n: "04", name: "Engineering Doors", cat: "door", d: "Fire-rated / access-control / acoustic — compliant with Gulf, SEA & Central Asia standards.", img: IMG.aluT200 },
  { n: "05", name: "Medical-Grade Doors", cat: "door", d: "Hermetic operating-room & ward doors engineered for hospitals.", img: IMG.wood2 },
];
const PROD_CATS = [
  { key: "all", label: "All" },
  { key: "door", label: "Doors" },
  { key: "lock", label: "Locks" },
];

/* ── Section 5 · Solutions ─────────────────────────────────── */
const SOLUTIONS = [
  { t: "Premium Residential & Villas", d: "Bespoke designs, ultra-high security grades and whole-house smart integration.", img: IMG.residential },
  { t: "High-Security Commercial", d: "Banks, data centers and corporate HQs — defeats forced entry while meeting fire codes.", img: IMG.proj1 },
  { t: "Medical & Public Institutions", d: "Hermetic OR doors, ward doors and access-controlled entries.", img: IMG.publicInst },
  { t: "Engineering / Bulk Projects", d: "Standardized, certified supply for large developments.", img: IMG.proj2 },
];

/* ── Section 6 · Certifications & Honors ───────────────────── */
// Real credentials only — no fabricated certifications on a live company site.
// To use actual certificate BADGE IMAGES instead of these text pills, drop them
// in public/images/certs/ and tell me the count; I'll switch the marquee to images.
const CERT_ROWS = [
  ["ISO 9001", "ISO 14001", "CE", "UL"],
  ["EN 1634 Fire", "CMA", "CSPPA", "iF Product Design Award"],
  ["National High-Tech Enterprise", "National Quality Benchmark", "National Standard Co-drafter", "TOP500 Preferred Supplier 2025"],
];

/* ── Section 7 · Partnership ───────────────────────────────── */
const PARTNERSHIP = [
  { t: "Distributor Program", d: "Join a global network backed by 30 years of brand equity, full product training and regional marketing support.", cta: "Become a Distributor", biz: "Distributor / Dealer" },
  { t: "Project Cooperation", d: "Residential, commercial, medical, hotel, government and public projects.", cta: "Submit a Project", biz: "Project / Developer" },
  { t: "OEM / ODM Services", d: "Leverage our smart factories and 1,000+ patents to build your own branded security line.", cta: "Request OEM/ODM Brief", biz: "OEM / ODM" },
  { t: "Global Distribution Network", d: "Regional HQs, local offices and authorized partners across the Middle East, Southeast Asia and Central Asia.", cta: "Find a Local Partner", biz: "Distributor / Dealer" },
];

/* ── Section 8 · Timeline ──────────────────────────────────── */
const TIMELINE = [
  { y: "1996", m: "Brand founded, Yongkang, Zhejiang" },
  { y: "2000s", m: "National sales leadership in security doors & smart locks" },
  { y: "2021", m: "Listed on Shanghai Stock Exchange (SSE: 605268)" },
  { y: "Today", m: "5 global bases, 6 R&D centers, 200M+ users worldwide" },
];

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

/* Dotted world map, generated from continent ellipses (no external map data needed) */
function WorldDots({ className = "" }: { className?: string }) {
  const blobs = [
    // North America
    { cx: 16, cy: 12, rx: 8, ry: 6 }, { cx: 23, cy: 8, rx: 7, ry: 3.5 }, { cx: 9, cy: 15, rx: 3, ry: 4 }, { cx: 12, cy: 19, rx: 3.5, ry: 3 }, { cx: 16, cy: 22, rx: 2.2, ry: 1.6 },
    // Greenland
    { cx: 33, cy: 6, rx: 3.5, ry: 3 },
    // South America
    { cx: 27, cy: 33, rx: 5, ry: 6 }, { cx: 25, cy: 41, rx: 3, ry: 5 },
    // Europe
    { cx: 48, cy: 11, rx: 5, ry: 4 }, { cx: 45, cy: 15, rx: 3, ry: 2.5 },
    // Africa
    { cx: 50, cy: 26, rx: 6, ry: 7 }, { cx: 53, cy: 33, rx: 4, ry: 4 },
    // Middle East
    { cx: 57, cy: 20, rx: 3.5, ry: 3 },
    // Asia
    { cx: 70, cy: 13, rx: 14, ry: 7 }, { cx: 64, cy: 22, rx: 4, ry: 4 }, { cx: 78, cy: 20, rx: 6, ry: 4 }, { cx: 82, cy: 26, rx: 3.5, ry: 3 },
    // Oceania
    { cx: 85, cy: 38, rx: 6, ry: 4 }, { cx: 92, cy: 43, rx: 1.6, ry: 2 },
  ];
  const inLand = (x: number, y: number) => blobs.some((b) => ((x - b.cx) / b.rx) ** 2 + ((y - b.cy) / b.ry) ** 2 <= 1);
  const dots: [number, number][] = [];
  for (let y = 2; y < 50; y += 1.3) {
    for (let x = 1; x < 100; x += 1.3) {
      if (inLand(x, y)) dots.push([x, y]);
    }
  }
  // Key target markets highlighted in gold (China HQ, Middle East, SE Asia, Central Asia, Europe, Americas)
  const markets: [number, number][] = [[75, 16], [57, 20], [80, 24], [62, 13], [48, 12], [16, 13]];
  return (
    <svg viewBox="0 0 100 50" className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={0.42} fill={SILVER} />)}
      {markets.map(([x, y], i) => (
        <g key={`m${i}`}>
          <circle cx={x} cy={y} r={1.9} fill={GOLD} opacity={0.18} />
          <circle cx={x} cy={y} r={0.85} fill={GOLD} />
        </g>
      ))}
    </svg>
  );
}

/* Three-row certification marquee — adjacent rows scroll in opposite directions */
function CertMarquee({ rows }: { rows: string[][] }) {
  return (
    <div className="space-y-4" style={{ maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}>
      {rows.map((row, ri) => (
        <div key={ri} className="partner-row overflow-hidden">
          <div className={`${ri % 2 === 0 ? "partner-track-left" : "partner-track-right"} flex gap-4 w-max`}>
            {[...row, ...row, ...row, ...row].map((c, i) => (
              <span key={i} className="shrink-0 whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium border" style={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "rgba(245,241,234,0.92)" }}>{c}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Auto-advancing flagship product rail (pauses on hover, wraps instantly) */
function ProductRail({ items }: { items: typeof PRODUCT_RAIL }) {
  const ref = useRef<HTMLDivElement>(null);
  const idx = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let paused = false;
    const enter = () => { paused = true; };
    const leave = () => { paused = false; };
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    const id = setInterval(() => {
      if (paused) return;
      const cards = el.children;
      if (!cards.length) return;
      idx.current = (idx.current + 1) % cards.length;
      const card = cards[idx.current] as HTMLElement;
      el.scrollTo({ left: card.offsetLeft, behavior: idx.current === 0 ? "auto" : "smooth" });
    }, 3200);
    return () => { clearInterval(id); el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div ref={ref} className="relative flex gap-6 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
      {items.map((p) => (
        <div key={p.n} className="shrink-0 w-[300px] md:w-[360px]" style={{ scrollSnapAlign: "start" }}>
          <div className="overflow-hidden"><img src={p.img} alt={p.name} loading="lazy" className="w-full h-[300px] object-cover" /></div>
          <div className="mt-4 text-xs tracking-[0.2em]" style={{ color: GOLD }}>{p.n}</div>
          <div className="mt-1 text-lg font-light" style={{ color: DARK }}>{p.name}</div>
          <p className="mt-2 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{p.d}</p>
        </div>
      ))}
    </div>
  );
}

/* Interactive company timeline — progress line fills, nodes pop, cards fade in on view */
function Timeline({ items }: { items: { y: string; m: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="mt-20">
      <div className="relative mb-8 hidden md:block">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 overflow-hidden" style={{ background: `${SILVER}44` }}>
          {on && <div className="timeline-progress-line h-full" style={{ background: GOLD }} />}
        </div>
        <div className="relative grid grid-cols-4">
          {items.map((t, i) => (
            <span key={t.y} className={`block w-3 h-3 rounded-full ${on ? "timeline-node-active" : ""}`} style={{ background: GOLD, opacity: on ? 1 : 0, animationDelay: `${i * 0.45}s` }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {items.map((t, i) => (
          <div key={t.y} className={on ? "timeline-card-in" : ""} style={{ opacity: on ? undefined : 0, animationDelay: `${0.35 + i * 0.45}s` }}>
            <div className="text-3xl md:text-4xl font-light" style={{ color: DARK }}>{t.y}</div>
            <p className="mt-3 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{t.m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const eyebrow = "text-[11px] tracking-[0.5em] uppercase font-light";
const h2cls = "font-light leading-[1.1] tracking-[0.01em] text-[34px] md:text-[58px]";

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const Prototype = () => {
  const doorVideo = useRef<HTMLVideoElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const [contentIn, setContentIn] = useState(false);
  const [solid, setSolid] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [sent, setSent] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [prodCat, setProdCat] = useState("all");
  const openQuote = useQuoteStore((s) => s.openQuote);
  const [form, setForm] = useState({ name: "", company: "", country: "", email: "", interest: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setField = (name: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => { if (!er[name]) return er; const n = { ...er }; delete n[name]; return n; });
  };
  const onContactSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.company.trim()) e.company = "Please enter your company name.";
    if (!form.country.trim()) e.country = "Please enter your country or region.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.interest) e.interest = "Please select an option.";
    if (!form.message.trim()) e.message = "Please tell us about your project.";
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  useSeo({
    title: "WONLY | Global Smart-Security Ecosystem Leader — Security Doors & Smart Locks Manufacturer",
    description:
      "WONLY is a listed (SSE: 605268) manufacturer of premium security doors and smart locks — 1,000,000+ m² base, 6M doors & 3M locks a year, 1,000+ patents, serving distributors and projects in 60+ countries.",
    path: "/",
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

  // Arriving at /#contact (etc.) from another page: jump to that section.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    return () => clearTimeout(t);
  }, []);

  // Hero: scroll once → autoplay the door open → reveal copy on the bright interior frame → release page.
  useLayoutEffect(() => {
    const v = doorVideo.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showReveal = () => { if (reveal.current) { reveal.current.style.opacity = "1"; reveal.current.style.visibility = "visible"; } setContentIn(true); };

    if (reduced || window.location.hash) {
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

    return () => { removeIntent(); v?.removeEventListener("ended", onEnded); unlock(); };
  }, []);

  return (
    <div className="w-full text-[#221F20] font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG }}>
      {/* ══ Header ══ */}
      <header className={`fixed top-0 inset-x-0 z-[70] transition-[background-color,box-shadow] duration-500 ${solid ? "bg-[#F5F1EA]/90 backdrop-blur-md shadow-[0_1px_0_rgba(34,31,32,0.06)]" : "bg-transparent"}`}>
        {!solid && <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.42), rgba(0,0,0,0))" }} />}
        <div className="relative max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          <button onClick={() => scrollToId("top")} className="shrink-0" aria-label="WONLY — home">
            <img src={LOGO} alt="WONLY" className="h-5 md:h-6 w-auto transition-[filter] duration-500" style={{ filter: solid ? "none" : "brightness(0) invert(1)" }} />
          </button>
          <nav className="hidden lg:flex items-center gap-1 transition-opacity duration-700" style={{ opacity: contentIn ? 1 : 0, pointerEvents: contentIn ? "auto" : "none" }}>
            {NAV.map((n) => (
              <div key={n.label} className="relative" onMouseEnter={() => n.children && setOpenDrop(true)} onMouseLeave={() => setOpenDrop(false)}>
                {n.href ? (
                  <Link to={n.href} className="px-3.5 py-2 text-sm font-light flex items-center gap-1 transition-colors" style={{ color: solid ? DARK : "rgba(255,255,255,0.95)" }}>{n.label}</Link>
                ) : (
                  <button onClick={() => scrollToId(n.to!)} className="px-3.5 py-2 text-sm font-light flex items-center gap-1 transition-colors" style={{ color: solid ? DARK : "rgba(255,255,255,0.95)" }}>
                    {n.label}{n.children && <ChevronDown size={13} />}
                  </button>
                )}
                {n.children && openDrop && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 rounded-xl bg-[#F5F1EA] shadow-2xl border border-black/5 p-2">
                    {n.children.map((c) => (
                      c.href ? (
                        <Link key={c.label} to={c.href} className="block w-full text-left px-4 py-2.5 text-sm font-light rounded-lg hover:bg-black/[0.04] transition-colors" style={{ color: DARK }}>{c.label}</Link>
                      ) : (
                        <button key={c.label} onClick={() => scrollToId(c.to || "products")} className="block w-full text-left px-4 py-2.5 text-sm font-light rounded-lg hover:bg-black/[0.04] transition-colors" style={{ color: DARK }}>{c.label}</button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button onClick={() => scrollToId("contact")} className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-700 hover:scale-[1.03]" style={{ background: GOLD, color: DARK, opacity: contentIn ? 1 : 0, pointerEvents: contentIn ? "auto" : "none" }}>
            Get Solutions &amp; Quote
          </button>
        </div>
      </header>

      {/* ══ 1 · Hero door video + 2 · reveal on interior frame ══ */}
      <section id="top" className="relative h-[100dvh] w-full overflow-hidden" style={{ background: "#0d0d0d" }}>
        <video ref={doorVideo} className="absolute top-0 left-0 z-0 object-cover object-center" style={{ width: "100vw", height: "100dvh" }} src={DOOR_VIDEO} poster={DOOR_POSTER} muted playsInline preload="metadata" aria-hidden="true" />

        <div ref={scrim} className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(72% 78% at 50% 45%, rgba(13,13,13,0.68) 0%, rgba(13,13,13,0.40) 50%, rgba(13,13,13,0) 82%)" }} />

        {/* Title over closed door */}
        <div ref={title} className="absolute inset-0 z-20 pointer-events-none">
          {/* Eyebrow + headline + sub + scroll cue — dead-centered in the viewport */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div className="text-[12px] sm:text-[13px] tracking-[0.4em] uppercase font-semibold mb-8" style={{ color: CHAMP, textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}>Security Doors · Smart Locks · OEM/ODM Manufacturer</div>
            <h1 className="font-light uppercase text-white leading-[1.08] tracking-[0.08em] text-[38px] sm:text-[60px] md:text-[82px] lg:text-[92px]" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
              Open the Door<br />to Your<br /><span style={{ color: CHAMP }}>Next Market</span>
            </h1>
            <p className="mt-8 max-w-lg text-sm md:text-base font-normal leading-relaxed" style={{ color: "#efe9dd", textShadow: "0 1px 14px rgba(0,0,0,0.5)" }}>A trusted manufacturer of premium security doors and smart locks — supplying distributors and projects worldwide.</p>
            {/* Scroll cue — directly below the sub copy */}
            <div className="mt-12 flex flex-col items-center gap-3">
              <span className="text-[11px] tracking-[0.5em] uppercase font-light" style={{ color: CHAMP_BG, textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}>Scroll to Enter ↓</span>
              <span className="block w-px h-12 animate-pulse" style={{ background: `linear-gradient(${GOLD}, transparent)` }} />
            </div>
          </div>
        </div>

        {/* Reveal copy on interior end frame — no full overlay; per-stat glass panels keep copy readable */}
        <div ref={reveal} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-[7vw] pt-40 md:pt-52 pb-16 overflow-hidden">
          {/* subtle dark gradient so the white heading stays readable without a hard overlay */}
          <div className="absolute inset-x-0 top-0 h-[68%] pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.28) 45%, rgba(13,13,13,0) 100%)" }} />
          <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
            <h2 className="font-light uppercase leading-[1.12] tracking-[0.08em] text-[36px] md:text-[64px] text-white">Global Smart-Security<br />Ecosystem Leader</h2>
            <div className="mt-12 md:mt-14 rounded-3xl px-6 py-9 md:px-12 md:py-11" style={{ background: "rgba(20,18,19,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-8">
                {STATS.map((s) => (
                  <div key={s.label} className="px-2">
                    <div className="font-light leading-none whitespace-nowrap" style={{ color: GOLD }}>
                      <span className="text-[30px] md:text-[44px]">{s.text ? s.text : <CountUp to={s.to!} run={contentIn} comma={s.comma} suffix={s.suffix} />}</span>
                      {s.per && <span className="text-base md:text-lg ml-1 font-light">{s.per}</span>}
                    </div>
                    <div className="mt-3 text-[11px] md:text-xs tracking-[0.22em] uppercase font-medium leading-snug" style={{ color: "rgba(245,241,234,0.9)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 text-[11px] tracking-[0.4em] uppercase font-light animate-pulse" style={{ color: "rgba(245,241,234,0.9)", textShadow: "0 1px 10px rgba(0,0,0,0.65)" }}>Scroll ↓</div>
          </div>
        </div>

      </section>

      {/* ══ 3 · Why WONLY ══ */}
      <section id="why" className="px-[7vw] py-28 md:py-36" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Why WONLY</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>A partner built for scale, trusted at the top.</h2>
            <p className="mt-6 max-w-md text-base font-normal leading-relaxed" style={{ color: MUTED }}>Thirty years of vertically integrated manufacturing — five bases, six R&D centers and a listed parent standing behind every order.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-[300px] md:h-[400px]">
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full rounded-2xl overflow-hidden">
                <img src={IMG.factoryLineA} alt="WONLY smart stamping line" loading="lazy" className="row-span-2 w-full h-full object-cover" />
                <img src={IMG.factoryLineB} alt="WONLY press line and mold tower" loading="lazy" className="w-full h-full object-cover" />
                <img src={IMG.factoryAbb} alt="WONLY ABB robotic automation" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.k} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl p-6 md:p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#f7f7f5", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}>
                  <m.icon size={20} style={{ color: "#fff" }} />
                </div>
                <div className="mt-5 text-2xl md:text-[26px] font-normal" style={{ color: DARK }}>{m.k}</div>
                <div className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{m.v}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Who We Are — structured panel */}
        <Reveal>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden" style={{ background: "#efeae0" }}>
            <div className="p-8 md:p-14 flex flex-col justify-center order-2 md:order-1">
              <div className={eyebrow} style={{ color: GOLD }}>Who We Are</div>
              <h3 className="mt-4 text-2xl md:text-[38px] font-light leading-[1.15]" style={{ color: DARK }}>One partner for the entire building entry.</h3>
              <p className="mt-5 text-base font-normal leading-relaxed" style={{ color: MUTED }}>Founded in 1996 and listed on the Shanghai Stock Exchange (SSE: 605268), WONLY manufactures security doors, smart locks, wooden doors and aluminum windows across five bases and six R&D centers — protecting over 200 million users worldwide.</p>
              <div className="mt-6 inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full" style={{ background: `${GOLD}1f` }}>
                <ShieldCheck size={16} style={{ color: GOLD }} />
                <span className="text-xs font-medium" style={{ color: DARK }}>No.1 in China · Smart Doors &amp; Locks</span>
              </div>
              <ul className="mt-7 space-y-3.5">
                {WHO_CHECK.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}22` }}><Check size={13} style={{ color: GOLD }} /></span>
                    <span className="text-sm font-normal" style={{ color: DARK }}>{it}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollToId("contact")} className="mt-8 self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Get Solutions &amp; Quote <ArrowRight size={15} /></button>
            </div>
            <div className="relative min-h-[340px] md:min-h-0 order-1 md:order-2">
              <img src={IMG.aluPro} alt="WONLY flagship cast-aluminum security door" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ Full-bleed image band A ══ */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.factoryLine} alt="WONLY 5G-connected smart factory production line" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.5), rgba(34,31,32,0.68))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>Manufacturing</div>
          <h2 className="font-light text-white leading-[1.1] text-[30px] md:text-[54px]">Built in our own 5G-connected smart factories.</h2>
          <button onClick={() => setVideoOpen(true)} className="mt-9 inline-flex items-center gap-3 pl-3 pr-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>
            <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: DARK }}><Play size={13} style={{ color: GOLD }} fill={GOLD} /></span>
            Watch the Factory Tour
          </button>
        </Reveal>
      </section>

      {/* ══ 4 · Products ══ */}
      <section id="products" className="px-[7vw] py-28 md:py-36" style={{ background: CHAMP_BG }}>
        {/* horizontal product rail */}
        <div>
          <Reveal className="max-w-3xl">
            <div className={eyebrow} style={{ color: GOLD }}>Our Products</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Flagship line-up.</h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2.5">
              {PROD_CATS.map((c) => (
                <button key={c.key} onClick={() => setProdCat(c.key)} className="px-5 py-2 rounded-full text-[13px] font-medium transition-all" style={prodCat === c.key ? { background: GOLD, color: DARK } : { background: "transparent", color: MUTED, border: `1px solid ${SILVER}66` }}>{c.label}</button>
              ))}
            </div>
            <div className="text-[11px] tracking-[0.3em] uppercase font-light" style={{ color: SILVER }}>scroll →</div>
          </div>
          <ProductRail key={prodCat} items={PRODUCT_RAIL.filter((p) => prodCat === "all" || p.cat === prodCat)} />
          <button onClick={() => scrollToId("contact")} className="mt-8 inline-flex items-center gap-2 text-sm font-medium" style={{ color: GOLD }}>Browse Full Catalog <ArrowRight size={15} /></button>
        </div>
      </section>

      {/* ══ 5 · Solutions ══ */}
      <section id="solutions" className="px-[7vw] py-28 md:py-36" style={{ background: "#fff" }}>
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
                </div>
                <h3 className="mt-6 text-xl md:text-2xl font-light" style={{ color: DARK }}>{s.t}</h3>
                <p className="mt-3 max-w-md text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <button onClick={() => scrollToId("contact")} className="mt-12 inline-flex items-center gap-2 text-sm font-medium" style={{ color: GOLD }}>Explore Solutions <ArrowRight size={15} /></button>
      </section>

      {/* ══ Full-bleed image band B ══ */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.proj1} alt="WONLY doors installed in landmark projects" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.42), rgba(34,31,32,0.7))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>Landmark Projects</div>
          <h2 className="font-light text-white leading-[1.1] text-[30px] md:text-[54px]">Chosen for the projects that cannot fail.</h2>
        </Reveal>
      </section>

      {/* ══ 6 · Certifications & Honors ══ */}
      <section id="certs" className="px-[7vw] py-28 md:py-36" style={{ background: DARK }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: CHAMP }}>Certified &amp; Recognized</div>
          <h2 className={h2cls + " mt-5 text-white"}>Held to standards, honored at the top.</h2>
        </Reveal>
        <Reveal className="mt-14">
          <CertMarquee rows={CERT_ROWS} />
        </Reveal>
      </section>

      {/* ══ 7 · Partnership (visual anchor — dark image background) ══ */}
      <section id="partnership" className="relative px-[7vw] py-28 md:py-36 overflow-hidden">
        <img src={IMG.yizhai1} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "rgba(26,23,24,0.9)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal className="max-w-3xl">
            <div className={eyebrow} style={{ color: CHAMP }}>Partner With WONLY</div>
            <h2 className={h2cls + " mt-5 text-white"}>Open the door to partnership.</h2>
          </Reveal>
          <div className="mt-14 border-t" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
            {PARTNERSHIP.map((p, i) => (
              <Reveal key={p.t}>
                <button onClick={() => openQuote({ biz: p.biz, subject: p.t })} className="group w-full text-left grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-center py-7 md:py-9 border-b transition-colors duration-300 hover:bg-white/[0.05] px-2 md:px-6 -mx-2 md:-mx-6" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <div className="md:col-span-2 text-5xl md:text-7xl font-light leading-none" style={{ color: GOLD }}>{`0${i + 1}`}</div>
                  <h3 className="md:col-span-3 text-xl md:text-2xl font-light text-white">{p.t}</h3>
                  <p className="md:col-span-4 text-sm font-normal leading-relaxed" style={{ color: "rgba(245,241,234,0.6)" }}>{p.d}</p>
                  <div className="md:col-span-3 md:text-right">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-4">{p.cta} <ArrowUpRight size={16} style={{ color: GOLD }} /></span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8 · Global Footprint ══ */}
      <section id="footprint" className="px-[7vw] py-28 md:py-36" style={{ background: CHAMP_BG }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <WorldDots className="w-full h-auto" />
          </Reveal>
          <Reveal delay={120}>
            <div className={eyebrow} style={{ color: GOLD }}>Global Footprint</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>We spread around the world.</h2>
            <p className="mt-5 max-w-md text-base font-normal leading-relaxed" style={{ color: MUTED }}>From Yongkang, Zhejiang to distributors and projects in 60+ countries and regions — backed by five manufacturing bases and six R&D centers.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {FOOTPRINT_STATS.map((s) => (
                <div key={s.label} className="rounded-xl p-5" style={{ background: "#efeae0" }}>
                  <div className="text-3xl md:text-4xl font-light leading-none" style={{ color: GOLD }}><CountUp to={s.to} suffix={s.suffix || ""} /></div>
                  <div className="mt-2 text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: DARK }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Timeline items={TIMELINE} />
      </section>

      {/* ══ 9 · Partners (text, logos pending authorization) ══ */}
      <section id="partners" className="px-[7vw] py-20 md:py-24 text-center" style={{ background: "#fff" }}>
        <Reveal>
          <div className={eyebrow + " mb-6"} style={{ color: GOLD }}>Trusted Across Industries</div>
          <p className="text-lg md:text-2xl font-light max-w-4xl mx-auto leading-snug" style={{ color: DARK }}>
            Trusted by leading technology companies and top real-estate developers across Asia and the Middle East.
          </p>
          <img src={IMG.partnersRe} alt="WONLY's real-estate development partners" loading="lazy" className="mt-12 w-full max-w-5xl mx-auto h-auto" />
        </Reveal>
      </section>

      {/* ══ 10 · Contact / Inquiry ══ */}
      <section id="contact" className="px-[7vw] py-28 md:py-36" style={{ background: DARK }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
          <Reveal>
            <div className={eyebrow} style={{ color: CHAMP }}>Get Solutions &amp; Quote</div>
            <h2 className="mt-5 font-light leading-[1.1] text-[38px] md:text-[64px] text-white">Ready to open<br />your market?</h2>
            <p className="mt-6 max-w-md text-base font-normal leading-relaxed" style={{ color: "rgba(245,241,234,0.7)" }}>
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
            {sent ? (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-10 md:p-14 text-center">
                <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${GOLD}22` }}><Check size={22} style={{ color: GOLD }} /></div>
                <h3 className="mt-5 text-xl md:text-2xl font-light text-white">Thank you — your request has been received.</h3>
                <p className="mt-3 text-sm font-light" style={{ color: "rgba(245,241,234,0.7)" }}>Our team will reply within 24 hours with tailored specifications, compliance documentation and pricing.</p>
              </div>
            ) : (
            <form noValidate onSubmit={onContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([["name", "Name", "Your full name", "text"], ["company", "Company", "Company name", "text"], ["country", "Country", "Country / region", "text"], ["email", "Email", "you@company.com", "email"]] as const).map(([key, l, ph, t]) => (
                <label key={key} className="block">
                  <span className="text-[11px] tracking-wide uppercase" style={{ color: "rgba(245,241,234,0.55)" }}>{l} <span style={{ color: "#e6928a" }}>*</span></span>
                  <input type={t} value={form[key]} onChange={(ev) => setField(key, ev.target.value)} aria-invalid={!!errors[key]} className="mt-1.5 w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#BFA06A]" style={{ borderColor: errors[key] ? "#c0564a" : "rgba(255,255,255,0.15)" }} placeholder={ph} />
                  {errors[key] && <span className="mt-1 block text-[11px]" style={{ color: "#e79b93" }}>{errors[key]}</span>}
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className="text-[11px] tracking-wide uppercase" style={{ color: "rgba(245,241,234,0.55)" }}>Interest <span style={{ color: "#e6928a" }}>*</span></span>
                <select value={form.interest} onChange={(ev) => setField("interest", ev.target.value)} aria-invalid={!!errors.interest} className="mt-1.5 w-full bg-white/5 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#BFA06A]" style={{ borderColor: errors.interest ? "#c0564a" : "rgba(255,255,255,0.15)", color: form.interest ? "#fff" : "rgba(255,255,255,0.3)" }}>
                  <option value="" disabled className="text-black">Select an option…</option>
                  <option className="text-black">Distributor</option>
                  <option className="text-black">Project</option>
                  <option className="text-black">OEM / ODM</option>
                </select>
                {errors.interest && <span className="mt-1 block text-[11px]" style={{ color: "#e79b93" }}>{errors.interest}</span>}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[11px] tracking-wide uppercase" style={{ color: "rgba(245,241,234,0.55)" }}>Message <span style={{ color: "#e6928a" }}>*</span></span>
                <textarea rows={3} value={form.message} onChange={(ev) => setField("message", ev.target.value)} aria-invalid={!!errors.message} className="mt-1.5 w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#BFA06A] resize-none" style={{ borderColor: errors.message ? "#c0564a" : "rgba(255,255,255,0.15)" }} placeholder="Tell us about your project or territory..." />
                {errors.message && <span className="mt-1 block text-[11px]" style={{ color: "#e79b93" }}>{errors.message}</span>}
              </label>
              <button type="submit" className="sm:col-span-2 mt-2 px-8 py-4 rounded-full text-sm font-medium transition-transform hover:scale-[1.02]" style={{ background: GOLD, color: DARK }}>Get Solutions &amp; Quote</button>
            </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <footer className="px-[7vw] pt-16 pb-10" style={{ background: "#1a1718" }}>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
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

      {/* Factory-tour video lightbox — drop the real clip at public/videos/factory-tour.mp4 */}
      {videoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(13,13,13,0.92)" }} onClick={() => setVideoOpen(false)}>
          <button onClick={() => setVideoOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" aria-label="Close video"><X size={30} /></button>
          <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            {/* TODO: restore <video src={`${BASE}videos/factory-tour.mp4`} controls autoPlay /> once the .mov is compressed to a web-friendly MP4 (H.264) */}
            <img src={IMG.factoryLineA} alt="WONLY smart factory" className="w-full h-full object-cover rounded-xl bg-black shadow-2xl" />
          </div>
        </div>
      )}
      <QuoteModal />
    </div>
  );
};

export default Prototype;
