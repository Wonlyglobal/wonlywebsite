import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone, Check, Play, X } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { useQuoteStore, QuoteModal } from "@/lib/site-ui";

/* ── Silver-White-Gold palette ─────────────────────────────── */
const GOLD = "#BFA06A";
const GOLD_DEEP = "#B08D4F"; // deeper, higher-contrast gold for uppercase kickers/eyebrows
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
  proj2: `${BASE}images/landmark-daxing.webp`, // Daxing airport — major engineering/bulk project (text-free)
  residential: `${BASE}images/landmark-metro.webp`, // aerial residential community (text-free)
  publicInst: `${BASE}images/landmark-asiangames.webp`, // Olympic sports center — public institution (text-free)
  top500: `${BASE}images/top500-5.jpg`,
};

/* ── Navigation ────────────────────────────────────────────── */
type NavChild = { label: string; href?: string; to?: string; img?: string };
type NavItem = { label: string; to?: string; href?: string; children?: NavChild[] };
const NAV: NavItem[] = [
  { label: "Products", to: "products", children: [
    { label: "Security Doors", href: "/products/security-doors", img: IMG.aluMax },
    { label: "Wooden Doors", href: "/products/wooden-doors", img: IMG.wood2 },
    { label: "Smart Locks", href: "/products/smart-locks", img: IMG.lockS80 },
    { label: "Smart Windows", href: "/products/smart-windows", img: `${BASE}images/5products/dropdown-window.png` },
    { label: "Whole-House Intelligence", href: "/products/whole-house", img: `${BASE}images/5products/dropdown-control.png` },
  ] },
  { label: "Projects", to: "projects" },
  { label: "R&D & Manufacturing", to: "why" },
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
// Real project/landmark photo behind every stat — no more flat black cards.
const STAT_CARDS = [
  { value: "30 Years", label: "Since 1996", img: `${BASE}images/landmark-daxing.webp` },
  { value: "Listed", label: "SSE 605268", img: `${BASE}images/landmark-asiangames.webp` },
  { value: "No.1", label: "Smart Doors & Locks · 2024–2025", img: `${BASE}images/landmark-metro.webp` },
  { value: "5", label: "Production Bases", img: `${BASE}images/proj-cairo-hotel.webp` },
  { value: "6", label: "R&D Centers", img: `${BASE}images/proj-egypt-cbd.webp` },
  { value: "1,000+", label: "Patents", img: `${BASE}images/proj-saudi-villa.webp` },
  { value: "200M+", label: "Users Protected", img: `${BASE}images/proj-1.webp` },
];
const WHY_FEATURES = [
  { img: `${BASE}images/card-vertically-integrated.jpg`, t: "Vertically integrated", d: "Stamping, coating, foaming and assembly under one roof — full control over quality and lead time." },
  { img: `${BASE}images/card-robotic-precision.jpg`, t: "Robotic precision", d: "ABB automated welding and CNC lines hold the tolerances export projects depend on." },
  { img: `${BASE}images/card-listed-group4.jpg`, t: "Backed by a listed group", d: "A Shanghai-listed parent (SSE: 605268) stands behind every contract and warranty." },
];
const FOOTPRINT_STATS = [
  { to: 60, suffix: "+", label: "Countries & Regions" },
  { to: 5, label: "Manufacturing Bases" },
  { to: 6, label: "R&D Centers" },
  { to: 200, suffix: "M+", label: "Users Worldwide" },
];
// Clean, text-free landmark references for the Global Footprint strip.
const LANDMARKS = [
  { img: `${BASE}images/landmark-daxing.webp`, t: "International Airport", d: "Aviation hub" },
  { img: `${BASE}images/landmark-asiangames.webp`, t: "Olympic Sports Center", d: "Stadium & arena" },
  { img: `${BASE}images/landmark-metro.webp`, t: "Metropolitan Residential", d: "Smart community" },
];

/* ── Featured overseas projects (government & institutional first) ──
   English site: clean, TEXT-FREE photos only + English HTML overlays. Never a burned-in-Chinese image. */
const PROJECTS: { name: string; place: string; tag: string; img?: string; placeholder?: boolean }[] = [
  { name: "New Administrative Capital CBD", place: "Cairo, Egypt", tag: "Government", img: `${BASE}images/proj-egypt-cbd.webp` },
  { name: "National Food Centre", place: "Barbados", tag: "Government", img: `${BASE}images/proj-barbados.webp` },
  { name: "New Capital Arc Landmark", place: "Cairo, Egypt", tag: "Landmark", img: `${BASE}images/proj-cairo-hotel.webp` },
  { name: "Jazan Industrial City", place: "Saudi Arabia", tag: "Industrial", img: `${BASE}images/proj-saudi-villa.webp` },
  { name: "Mixed-Use Complex", place: "Mozambique · 35,000 m²", tag: "Commercial", img: `${BASE}images/proj-s-7.webp` },
];

/* ── Section 4 · Products ──────────────────────────────────── */
// Product gallery — doors first. Each card links to its /products/ route (see App.tsx).
const PRODUCTS_GALLERY = [
  { name: "Security Doors", href: "/products/security-doors", img: `${BASE}images/5products/prod-security-doors.jpg`, d: "Cast-aluminum security doors — autonomous locking and multi-vector intrusion sensing." },
  { name: "Wooden Doors", href: "/products/wooden-doors", img: `${BASE}images/5products/prod-wooden-doors.jpg`, d: "Warm, quiet interior doors — steel-reinforced cores that stay true and never warp." },
  { name: "Smart Locks", href: "/products/smart-locks", img: `${BASE}images/5products/prod-smart-locks.jpg`, d: "True-sensing biometric locks with hands-free entry and encrypted access control." },
  { name: "Smart Windows", href: "/products/smart-windows", img: `${BASE}images/5products/prod-smart-windows.jpg`, d: "Sealed aluminum systems that insulate like a wall and auto-close in wind and rain." },
  { name: "Whole-House Intelligence", href: "/products/whole-house", img: `${BASE}images/5products/prod-whole-house.jpg`, d: "One ecosystem linking doors, locks and windows into a single smart-home layer." },
];

/* ── Section 5 · Solutions ─────────────────────────────────── */
/* ── Section 6 · Certifications & Honors ───────────────────── */
// Real credentials only — no fabricated certifications on a live company site.
// To use actual certificate BADGE IMAGES instead of these text pills, drop them
// in public/images/certs/ and tell me the count; I'll switch the marquee to images.
// Stylised colored badges (recognisable colored mark + label — not the trademarked artwork).
// Real logo artwork lives in public/images/{awards,certs}. Editorial grayscale
// logo wall — brightens to full color on hover.
const AWARD_LOGOS = [
  { f: "reddot.png", alt: "Red Dot Design Award" },
  { f: "forbes.png", alt: "Forbes" },
  { f: "if-design.png", alt: "iF Design Award" },
  { f: "china-hardware-gold.png", alt: "China Hardware Gold Award" },
];
const CERT_LOGOS = [
  { f: "iso.png", alt: "ISO 9001 / 14001" },
  { f: "ce.png", alt: "CE Marking" },
  { f: "ul.png", alt: "UL Listed" },
  { f: "saso.png", alt: "SASO" },
  { f: "rohs.png", alt: "RoHS" },
  { f: "esg.png", alt: "ESG" },
  { f: "etl.png", alt: "ETL Listed" },
  { f: "fsc.png", alt: "FSC Certified" },
  { f: "iecee.png", alt: "IECEE CB" },
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
  { y: "1996", m: "Brand founded in Yongkang, Zhejiang." },
  { y: "2003", m: "Wins the 'Challenge the Lock-Picking Champion' — unopened 20+ years since." },
  { y: "2005", m: "Named a China Well-Known Trademark — the sector's only dual certification." },
  { y: "2016", m: "SAP go-live — the start of digital transformation." },
  { y: "2021", m: "Listed on the Shanghai Stock Exchange (605268) — the industry's only main-board company." },
  { y: "2024", m: "Opens the sector's only national-level 5G future factory." },
  { y: "2026", m: "Global expansion begins — the first year of the going-global strategy." },
];

/* ── Footer ────────────────────────────────────────────────── */
/* Strategic collaborations (English names + year of agreement; ceremony photos omitted — Chinese banners) */
// Strategic-partner signing-ceremony photos (optimized from the source archive).
const PARTNER_PHOTOS = [
  { img: `${BASE}images/partners-ceremony/partner-huawei.webp`, n: "Huawei", y: "2020" },
  { img: `${BASE}images/partners-ceremony/partner-siemens.webp`, n: "Siemens", y: "2019" },
  { img: `${BASE}images/partners-ceremony/partner-alibaba.webp`, n: "Alibaba", y: "2021" },
  { img: `${BASE}images/partners-ceremony/partner-hikvision.webp`, n: "Hikvision", y: "2019" },
  { img: `${BASE}images/partners-ceremony/partner-china-telecom.webp`, n: "China Telecom", y: "2020" },
  { img: `${BASE}images/partners-ceremony/partner-china-mobile.webp`, n: "China Mobile", y: "2019" },
  { img: `${BASE}images/partners-ceremony/partner-midea.webp`, n: "Midea", y: "2021" },
  { img: `${BASE}images/partners-ceremony/partner-shanghai-electric.webp`, n: "Shanghai Electric", y: "2019" },
  { img: `${BASE}images/partners-ceremony/partner-foxconn.webp`, n: "Foxconn", y: "2018" },
];

type FooterLink = { l: string; href?: string; to?: string };
const FOOTER: { h: string; links: FooterLink[] }[] = [
  { h: "Products", links: [
    { l: "Security Doors", href: "/products/security-doors" },
    { l: "Wooden Doors", href: "/products/wooden-doors" },
    { l: "Smart Locks", href: "/products/smart-locks" },
    { l: "Smart Windows", href: "/products/smart-windows" },
    { l: "Whole-House Intelligence", href: "/products/whole-house" },
  ] },
  { h: "Company", links: [
    { l: "Why WONLY", to: "why" },
    { l: "Global Footprint", to: "footprint" },
    { l: "Projects", to: "projects" },
    { l: "About", href: "/about" },
  ] },
  { h: "Explore", links: [
    { l: "Certifications", to: "certs" },
    { l: "Partners", to: "partners" },
    { l: "Get a Quote", to: "contact" },
    { l: "All Projects", href: "/projects" },
  ] },
  { h: "Contact", links: [
    { l: "wonlyglobal@wonly.net", href: "mailto:wonlyglobal@wonly.net" },
    { l: "WhatsApp +1 (205) 240-1832", href: "https://wa.me/12052401832" },
    { l: "LinkedIn · YouTube" },
    { l: "Facebook · X · Instagram" },
  ] },
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

/* Auto-advancing flagship product rail (pauses on hover, wraps instantly) */
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
      <div className="relative mb-8 hidden lg:block">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 overflow-hidden" style={{ background: `${SILVER}44` }}>
          {on && <div className="timeline-progress-line h-full" style={{ background: GOLD }} />}
        </div>
        <div className="relative grid grid-cols-7">
          {items.map((t, i) => (
            <span key={t.y} className={`block w-3 h-3 rounded-full ${on ? "timeline-node-active" : ""}`} style={{ background: GOLD, opacity: on ? 1 : 0, animationDelay: `${i * 0.35}s` }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5">
        {items.map((t, i) => (
          <div key={t.y} className={on ? "timeline-card-in" : ""} style={{ opacity: on ? undefined : 0, animationDelay: `${0.3 + i * 0.35}s` }}>
            <div className="text-2xl md:text-3xl font-light" style={{ color: DARK }}>{t.y}</div>
            <p className="mt-3 text-[13px] font-normal leading-relaxed" style={{ color: MUTED }}>{t.m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Real-photo door production line: doors ride a red monorail across a light workshop;
   the photo tiles seamlessly in an infinite marquee, with gold data nameplates over the floor. */
function DoorConveyor() {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map((c, i) => (
        <Reveal key={c.value} delay={(i % 4) * 80} className={i === 0 ? "sm:col-span-2" : ""}>
          <div className="group relative rounded-2xl overflow-hidden h-[190px] md:h-[210px]" style={{ background: "#0d0d0d" }}>
            <img src={c.img} alt="" aria-hidden loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.06]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.30) 0%, rgba(13,13,13,0.42) 45%, rgba(13,13,13,0.88) 100%)" }} />
            <div className="absolute top-6 left-6 h-[2px] w-9" style={{ background: GOLD }} />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="text-white font-light leading-none text-[34px] md:text-[42px]">{c.value}</div>
              <div className="mt-2.5 text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: CHAMP }}>{c.label}</div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

const eyebrow = "text-[12px] tracking-[0.3em] uppercase font-semibold text-[#B08D4F]";
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
      email: "wonlyglobal@wonly.net",
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[330px] rounded-xl bg-[#F5F1EA] shadow-2xl border border-black/5 p-2">
                    {n.children.map((c) => {
                      const cls = "flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-light rounded-lg hover:bg-black/[0.04] transition-colors";
                      const inner = (<>
                        {c.img && <span className="w-9 h-9 rounded-md shrink-0 overflow-hidden flex items-center justify-center p-1 bg-white"><img src={c.img} alt="" loading="lazy" className="max-w-full max-h-full object-contain" /></span>}
                        <span className="leading-tight whitespace-nowrap">{c.label}</span>
                      </>);
                      return c.href
                        ? <Link key={c.label} to={c.href} className={cls} style={{ color: DARK }}>{inner}</Link>
                        : <button key={c.label} onClick={() => scrollToId(c.to || "products")} className={cls} style={{ color: DARK }}>{inner}</button>;
                    })}
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
        <video ref={doorVideo} className="absolute top-0 left-0 z-0 object-cover object-center" style={{ width: "100vw", height: "100dvh", transform: "translateZ(0)", willChange: "transform", backfaceVisibility: "hidden" }} src={DOOR_VIDEO} poster={DOOR_POSTER} muted playsInline preload="auto" aria-hidden="true" />

        <div ref={scrim} className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(72% 78% at 50% 45%, rgba(13,13,13,0.68) 0%, rgba(13,13,13,0.40) 50%, rgba(13,13,13,0) 82%)", willChange: "opacity", transform: "translateZ(0)" }} />

        {/* Title over closed door */}
        <div ref={title} className="absolute inset-0 z-20 pointer-events-none" style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}>
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
        <Reveal className="max-w-3xl">
          <div className={eyebrow}>Why WONLY</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>A partner built for scale, trusted at the top</h2>
          <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed" style={{ color: MUTED }}>Thirty years of vertically integrated manufacturing — five bases, six R&D centers and a listed parent standing behind every order.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 90}>
              <div className="h-full flex flex-col rounded-2xl overflow-hidden" style={{ background: CHAMP_BG }}>
                <img src={f.img} alt={f.t} loading="lazy" className="w-full h-[200px] md:h-[230px] object-cover shrink-0" />
                <div className="p-6 md:p-7">
                  <div className="text-lg md:text-xl font-medium" style={{ color: DARK }}>{f.t}</div>
                  <div className="mt-2 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{f.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <DoorConveyor />
      </section>

      {/* ══ Full-bleed image band A ══ */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.factoryLine} alt="WONLY 5G-connected smart factory production line" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.5), rgba(34,31,32,0.68))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>Manufacturing</div>
          <h2 className="font-light text-white leading-[1.1] text-[30px] md:text-[54px]">Built in our own 5G-connected smart factories</h2>
          <button onClick={() => setVideoOpen(true)} className="mt-9 inline-flex items-center gap-3 pl-3 pr-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>
            <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: DARK }}><Play size={13} style={{ color: GOLD }} fill={GOLD} /></span>
            Watch the Factory Tour
          </button>
        </Reveal>
      </section>

      {/* ══ 4 · Products — expanding horizontal gallery ══ */}
      <section id="products" className="px-[7vw] pt-24 pb-12 md:pt-28 md:pb-14 md:h-screen md:max-h-[940px] flex flex-col" style={{ background: CHAMP_BG }}>
        <Reveal className="shrink-0">
          <div className={eyebrow}>Our Products</div>
          <h2 className={h2cls + " mt-4"} style={{ color: DARK }}>Built for every opening</h2>
        </Reveal>
        <div className="product-gallery mt-8 md:mt-10 flex-1 min-h-0 flex flex-col md:flex-row gap-1.5">
          {PRODUCTS_GALLERY.map((p) => (
            <Link key={p.name} to={p.href} className="product-card group relative block overflow-hidden rounded-2xl min-w-0 h-[240px] md:h-auto">
              <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(0deg, rgba(12,10,9,.88), rgba(12,10,9,.12) 34%, transparent 50%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">{p.name}</h3>
                <div className="overflow-hidden transition-all duration-500 ease-out max-h-40 opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
                  <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-[16rem]">{p.d}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium" style={{ color: CHAMP }}>Discover <ArrowRight size={15} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ 5 · Global landmark projects (below the product line) ══ */}
      <section id="projects" className="px-[7vw] py-28 md:py-36" style={{ background: "#fff" }}>
        {/* Global landmark projects — header row: copy left, CTA bottom-right */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div className="max-w-3xl">
              <div className={eyebrow}>Global Landmark Projects</div>
              <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Trusted by governments and institutions</h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed" style={{ color: MUTED }}>From sovereign capital districts to national institutions, WONLY is specified across 60+ countries where security, fire performance and reliability are not allowed to fail.</p>
            </div>
            <Link to="/projects" className="shrink-0 self-start md:self-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Explore All Projects <ArrowRight size={15} /></Link>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.slice(0, 2).map((p) => (
            <Reveal key={p.name}>
              <div className="group relative rounded-2xl overflow-hidden h-[320px] md:h-[360px]">
                {p.placeholder ? (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2a2627,#0d0d0d)" }}><span className="text-[11px] tracking-[0.22em] uppercase" style={{ color: "rgba(245,241,234,0.4)" }}>Photo coming soon</span></div>
                ) : (
                  <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 38%, rgba(13,13,13,0.9))" }} />
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: GOLD, color: DARK }}>{p.tag}</div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-white text-xl md:text-2xl font-medium">{p.name}</div>
                  <div className="mt-1 text-[11px] tracking-[0.16em] uppercase" style={{ color: CHAMP }}>{p.place}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PROJECTS.slice(2).map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 80}>
              <div className="group relative rounded-2xl overflow-hidden h-[240px]">
                {p.placeholder ? (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2a2627,#0d0d0d)" }}><span className="text-[11px] tracking-[0.22em] uppercase" style={{ color: "rgba(245,241,234,0.4)" }}>Photo coming soon</span></div>
                ) : (
                  <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 42%, rgba(13,13,13,0.88))" }} />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: `${CHAMP_BG}e6`, color: DARK }}>{p.tag}</div>
                <div className="absolute bottom-0 left-0 p-5">
                  <div className="text-white text-base font-medium">{p.name}</div>
                  <div className="mt-1 text-[10px] tracking-[0.14em] uppercase" style={{ color: CHAMP }}>{p.place}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm font-light" style={{ color: MUTED }}>Further references include Ethiopia's Abyssinia Bank and presidential-palace projects in Togo and Vanuatu.</p>
      </section>

      {/* ══ Full-bleed image band B ══ */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.proj1} alt="WONLY doors installed in landmark projects" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.42), rgba(34,31,32,0.7))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>Landmark Projects</div>
          <h2 className="font-light text-white leading-[1.1] text-[30px] md:text-[54px]">Chosen for the projects that cannot fail</h2>
        </Reveal>
      </section>

      {/* ══ 6 · Certifications & Honors — real-logo wall (one screen, centered) ══ */}
      <section id="certs" className="px-[7vw] py-16 md:py-0 md:min-h-screen md:max-h-[880px] flex flex-col md:justify-center" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow}>Certified &amp; Recognized</div>
          <h2 className="font-light leading-[1.1] tracking-[0.01em] text-[28px] md:text-[44px] mt-4" style={{ color: DARK }}>Held to standards, honored at the top</h2>
        </Reveal>

        <Reveal className="mt-10">
          <div className="text-[12px] tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: GOLD_DEEP }}>Design Awards</div>
          <div className="flex flex-wrap items-center gap-x-14 gap-y-8">
            {AWARD_LOGOS.map((a) => (
              <img key={a.f} src={`${BASE}images/awards/${a.f}`} alt={a.alt} loading="lazy" className="h-11 md:h-12 w-auto object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100" />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="pt-10 border-t" style={{ borderColor: `${SILVER}55` }}>
            <div className="text-[12px] tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: GOLD_DEEP }}>Certifications</div>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
              {CERT_LOGOS.map((c) => (
                <img key={c.f} src={`${BASE}images/certs/${c.f}`} alt={c.alt} loading="lazy" className="h-11 md:h-12 w-auto object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100" />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ 7 · Partnership (visual anchor — dark image background) ══ */}
      <section id="partnership" className="relative px-[7vw] py-28 md:py-36 overflow-hidden">
        <img src={IMG.yizhai1} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "rgba(26,23,24,0.9)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal className="max-w-3xl">
            <div className={eyebrow} style={{ color: CHAMP }}>Partner With WONLY</div>
            <h2 className={h2cls + " mt-5 text-white"}>Open the door to partnership</h2>
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

      {/* ══ 8 · Global Footprint (one screen, centered) ══ */}
      <section id="footprint" className="px-[7vw] pt-12 pb-12 md:pt-20 md:pb-20 flex flex-col" style={{ background: CHAMP_BG }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <Reveal>
            <WorldDots className="w-full h-auto" />
          </Reveal>
          <Reveal delay={120}>
            <div className={eyebrow}>Global Footprint</div>
            <h2 className={h2cls + " mt-4"} style={{ color: DARK }}>We spread around the world</h2>
            <p className="mt-4 max-w-md text-base font-normal leading-relaxed" style={{ color: MUTED }}>From Yongkang, Zhejiang to distributors and projects in 60+ countries and regions — backed by five manufacturing bases and six R&D centers.</p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {FOOTPRINT_STATS.map((s) => (
                <div key={s.label} className="rounded-xl p-5" style={{ background: "#efeae0" }}>
                  <div className="text-3xl md:text-4xl font-light leading-none" style={{ color: GOLD }}><CountUp to={s.to} suffix={s.suffix || ""} /></div>
                  <div className="mt-2 text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: DARK }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Landmark installations — text-free reference photos */}
        <Reveal className="mt-10">
          <div className="text-[12px] tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: GOLD_DEEP }}>Landmark Installations</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LANDMARKS.map((l) => (
              <div key={l.t} className="group relative rounded-2xl overflow-hidden h-[160px] md:h-[190px]">
                <img src={l.img} alt={l.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.05) 40%, rgba(13,13,13,0.82) 100%)" }} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-white text-base font-medium leading-tight">{l.t}</div>
                  <div className="mt-1 text-[11px] tracking-[0.14em] uppercase" style={{ color: CHAMP }}>{l.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══ Company timeline ══ */}
      <section className="px-[7vw] pt-24 pb-14 md:pt-28 md:pb-16" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow}>Our Journey</div>
          <h2 className={h2cls + " mt-4"} style={{ color: DARK }}>Three decades in the making</h2>
        </Reveal>
        <Timeline items={TIMELINE} />
      </section>

      {/* ══ 9 · Partners (text, logos pending authorization) ══ */}
      <section id="partners" className="px-[7vw] pt-12 pb-20 md:pt-14 md:pb-24 text-center" style={{ background: "#fff" }}>
        <Reveal>
          <div className={eyebrow + " mb-6"}>Trusted Across Industries</div>
          <p className="font-light leading-[1.1] tracking-[0.01em] text-[28px] md:text-[44px] max-w-4xl mx-auto" style={{ color: DARK }}>
            Trusted by leading technology companies and top real-estate developers across Asia and the Middle East.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
            {PARTNER_PHOTOS.map((p) => (
              <div key={p.n} className="group relative rounded-2xl overflow-hidden">
                <img src={p.img} alt={`WONLY strategic partnership — ${p.n}`} loading="lazy" className="w-full h-[200px] md:h-[220px] object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 45%, rgba(13,13,13,0.85) 100%)" }} />
                <div className="absolute left-4 bottom-3 text-left">
                  <div className="text-white text-sm md:text-base font-semibold leading-tight">{p.n}</div>
                  <div className="text-[10px] tracking-[0.16em] uppercase" style={{ color: CHAMP }}>Strategic Partner · {p.y}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted by China's leading developers — full-bleed logo carousel */}
          <div className="mt-16 text-[12px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD_DEEP }}>Trusted by China&apos;s Leading Developers</div>
          <div className="mt-7 w-screen ml-[calc(50%-50vw)] overflow-hidden">
            <div className="flex flex-col gap-3 md:gap-4">
              {[0, 1, 2].map((row) => {
                const items = Array.from({ length: 10 }, (_, i) => `re-${String(row * 10 + i + 1).padStart(2, "0")}.png`);
                return (
                  <div key={row} className="partner-row overflow-hidden">
                    <div className={`${row % 2 === 1 ? "partner-track-right" : "partner-track-left"} flex gap-3 md:gap-4 w-max px-2`}>
                      {[...items, ...items].map((f, i) => (
                        <div key={i} className="flex items-center justify-center rounded-xl bg-white h-20 md:h-24 w-36 md:w-44 shrink-0 p-3 md:p-4 border shadow-sm" style={{ borderColor: `${SILVER}44` }}>
                          <img src={`${BASE}images/partners-re/${f}`} alt="" aria-hidden="true" loading="lazy" className="max-h-full max-w-full object-contain opacity-90" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
              <a href="mailto:wonlyglobal@wonly.net" className="flex items-center gap-3 hover:underline"><Mail size={16} style={{ color: GOLD }} /> wonlyglobal@wonly.net</a>
              <a href="https://wa.me/12052401832" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline"><MessageCircle size={16} style={{ color: GOLD }} /> WhatsApp +1 (205) 240-1832</a>
              <div className="flex items-center gap-3"><Phone size={16} style={{ color: GOLD }} /> LinkedIn · YouTube · Facebook · X · Instagram</div>
            </div>
          </Reveal>

          {/* TODO: wire submission to a real endpoint (wonlyglobal@wonly.net or a form service) before launch */}
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <img src={LOGO} alt="WONLY" className="h-6 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            <p className="mt-4 text-xs font-normal leading-relaxed" style={{ color: "rgba(245,241,234,0.5)" }}>Global Smart-Security Ecosystem Leader. SSE: 605268.</p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.h}>
              <h4 className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: CHAMP }}>{col.h}</h4>
              <ul className="space-y-2.5">
                {col.links.map((item) => {
                  const cls = "text-xs font-light transition-colors hover:text-white";
                  const style = { color: "rgba(245,241,234,0.6)" };
                  return (
                    <li key={item.l}>
                      {item.href
                        ? (/^(mailto:|tel:|https?:)/.test(item.href)
                            ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className={cls} style={style}>{item.l}</a>
                            : <Link to={item.href} className={cls} style={style}>{item.l}</Link>)
                        : item.to
                          ? <button onClick={() => scrollToId(item.to!)} className={cls + " text-left"} style={style}>{item.l}</button>
                          : <span className="text-xs font-light" style={style}>{item.l}</span>}
                    </li>
                  );
                })}
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
            {videoOpen && <iframe src="https://www.youtube.com/embed/XAfeQnuuRxE?autoplay=1&rel=0&modestbranding=1" title="WONLY factory tour" className="w-full h-full rounded-xl bg-black shadow-2xl" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />}
          </div>
        </div>
      )}
      <QuoteModal />
    </div>
  );
};

export default Prototype;
