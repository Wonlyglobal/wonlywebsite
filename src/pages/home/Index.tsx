import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import {
  Shield, Zap, Cpu, MapPin, Calendar, Users, Search, ChevronLeft, ChevronRight,
  Globe, ArrowRight, Play, Award, Building2, HeartHandshake,
  Lock, DoorOpen, Mail, MessageCircle, Phone, Leaf, Target, Eye,
  Layers, TrendingUp, ShieldCheck, ChevronDown,
} from "lucide-react";

/* Silver-White-Gold palette: Gold #BFA06A / Champagne #D4C4A0 / Silver #B8BFC8 / Dark #221F20 / White #FFFFFF */
const GOLD = "#BFA06A";
const CHAMP = "#D4C4A0";
const DARK = "#221F20";
const SILVER = "#B8BFC8";

const IMG = {
  hero: "https://picture-search.tiangong.cn/image/rt/85f08a10a5a0545fe837c5fde708f694.jpg",
  lock1: "https://picture-search.tiangong.cn/image/rt/37df649adeceb5a6e298b9c079ca9832.jpg",
  lock2: "https://picture-search.tiangong.cn/image/rt/c3b89bcb61c6165c652f5a3913ce6408.jpg",
  lock3: "https://picture-search.tiangong.cn/image/rt/f934bfc19ceac72bf7e72780c251bc7c.jpg",
  lock4: "https://picture-search.tiangong.cn/image/rt/b6ea3d6292ee76a9c7725b407fa4b514.jpg",
  factory1: "https://picture-search.tiangong.cn/image/rt/d0623db57d13458b3b359d9532554337.jpg",
  factory2: "https://picture-search.tiangong.cn/image/rt/5d75fa99cd91354289665c7242112e13.jpg",
  factory3: "https://picture-search.tiangong.cn/image/rt/624ee8b0834b1bf4f3b39de5b48563d5.jpg",
  commercial1: "https://picture-search.tiangong.cn/image/rt/571ffb7e8d819bc25651e98e64cab5a2.jpg",
  commercial2: "https://picture-search.tiangong.cn/image/rt/c20a10b3d12180d86a87243b1f767bca.jpg",
  villa1: "https://picture-search.tiangong.cn/image/rt/449f44b1cf3e44f55f6bcab2ee518982.jpg",
  hospital1: "https://picture-search.tiangong.cn/image/rt/5cffc7b7ae7b3b5207c9df8e5d0108c1.jpg",
  shake1: "https://picture-search.tiangong.cn/image/rt/fcbce1d1c42a06661429ab53cad0d025.jpg",
  shake2: "https://picture-search.tiangong.cn/image/rt/7322155cabd3fe0e34d7ba8cb32402af.jpg",
  shake3: "https://picture-search.tiangong.cn/image/rt/e9e59941a28e60e4928b6004b5876c9c.jpg",
};

const NAV: { label: string; children?: { name: string; desc: string; path: string; icon: any }[] }[] = [
  {
    label: "Products",
    children: [
      { name: "Security Doors", desc: "Premium & fire-rated entry doors", path: "/products/security-doors", icon: Shield },
      { name: "Smart Locks", desc: "Biometric & app-controlled locks", path: "/products/smart-locks", icon: Lock },
      { name: "Wooden Doors", desc: "Crafted premium wooden entries", path: "/products/wooden-doors", icon: DoorOpen },
      { name: "Aluminum Windows", desc: "Energy-saving smart windows", path: "/products/aluminum-windows", icon: Layers },
      { name: "Whole-House Intelligence", desc: "Integrated smart home ecosystem", path: "/products/whole-house", icon: Cpu },
    ],
  },
  { label: "Solutions" },
  { label: "Why WONLY" },
  { label: "Global Footprint" },
  { label: "R&D" },
  { label: "About" },
  { label: "Contact" },
];

const PRODUCTS: { n: string; name: string; desc: string; cta: string; img: string; path?: string }[] = [
  { n: "01", name: "Robotic Security Door — X70", desc: "Autonomous locking, multi-vector intrusion sensing, premium cast-aluminum build. The flagship for villas and executive residences.", cta: "View X70 →", img: IMG.hero, path: "/products/security-doors/x70" },
  { n: "02", name: "4.0 Global Series Doors", desc: "International universal models — fire-rated, anti-theft, climate-adapted for global standards.", cta: "Browse Catalog →", img: IMG.commercial1 },
  { n: "03", name: "S80 True-Sensing Smart Lock", desc: "Hands-free long-range sensing, biometric + app control, tamper-proof architecture.", cta: "View S80 →", img: IMG.lock1 },
  { n: "04", name: "Global Smart Lock Series", desc: "Backward-compatible with global lock body standards; full install guides & warranty.", cta: "Browse Series →", img: IMG.lock2 },
  { n: "05", name: "Smart Windows & Doors", desc: "Energy-saving smart windows, balcony/patio smart doors, hurricane-rated series for North America & Caribbean.", cta: "Explore →", img: IMG.villa1 },
  { n: "06", name: "Engineering Doors", desc: "Fire-rated · Access-control · Acoustic doors — compliant with Saudi, Southeast Asia & Central Asia standards.", cta: "Project Inquiry →", img: IMG.factory2 },
  { n: "07", name: "Medical-Grade Doors", desc: "HIPAA-aligned ward doors, operating-room hermetic doors, medical project references.", cta: "View Medical Line →", img: IMG.hospital1 },
  { n: "08", name: "Yizhai Yishu — Ultra-Premium", desc: "Bespoke villa security doors, integrated smart entry systems, exclusive luxury customization.", cta: "Request Private Consultation →", img: IMG.lock4 },
];

const SCENARIOS = [
  { t: "Premium Residential & Villas", d: "Bespoke designs, ultra-high security grades, and whole-house smart integration for discerning homeowners and developers.", cta: "View Residential Cases →", img: IMG.villa1 },
  { t: "High-Security Commercial", d: "Banks, data centers, corporate HQs — engineered to defeat forced entry while meeting fire and life-safety codes.", cta: "View Commercial Cases →", img: IMG.commercial1 },
  { t: "Medical & Public Institutions", d: "Hermetic operating-room doors, HIPAA-aligned ward doors, and access-controlled entries for hospitals and government facilities.", cta: "View Institutional Cases →", img: IMG.hospital1 },
];

const CERTS = ["ISO 9001", "ISO 14001", "CE", "UL", "EN 1634 Fire", "CMA", "CSPPA", "Fortune 500 Partners"];
const PARTNERS_TECH = ["Huawei", "Alibaba Cloud", "Siemens", "Foxconn", "Hikvision", "China Telecom", "China Mobile", "China Unicom", "Midea Remac Smart"];
const PARTNERS_RE = ["Vanke", "Country Garden", "Poly", "CR Land", "China Overseas", "Merchants Shekou", "Shimao", "Greentown", "Gemdale", "CIFI", "Yuexiu", "C&D", "Huafa", "Jinke", "Zhongnan", "Yuzhou"];

const TECH_LOGOS: Record<string, string> = {
  "Huawei": "https://picture-search.tiangong.cn/image/rt/2f3898eb69a2852bccae54d6928b84fe.jpg",
  "Alibaba Cloud": "https://picture-search.tiangong.cn/image/rt/d43ec1b354bf586cff0650fe43708ba3.jpg",
  "Siemens": "https://picture-search.tiangong.cn/image/rt/420998cfcb41f257e86c565a20c37901.jpg",
  "Foxconn": "https://picture-search.tiangong.cn/image/rt/4ca67905b4b6934a496010a86177ff38.jpg",
  "Hikvision": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/hikvision_logo_png_transparent_httpx_43095e10_1_afc4bb8d36cb4c2c86a7cb7fbba7026c.png",
  "China Telecom": "https://picture-search.tiangong.cn/image/rt/7c3a2bfae4e3ed648ca1c4a8cf4dc369.jpg",
  "China Mobile": "https://picture-search.tiangong.cn/image/rt/9e32fc52f7127cef21d94c6197a5aa90.jpg",
  "China Unicom": "https://picture-search.tiangong.cn/image/rt/a1f8f366b7a6f3a60c9235024e5b1a91.jpg",
  "Midea Remac Smart": "https://picture-search.tiangong.cn/image/rt/a217f44b78e00bf6bacf6ee169f9d894.jpg",
};
const RE_LOGOS: Record<string, string> = {
  "Vanke": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/vanke_logo_png_transparent_httpx_95f3a745_1_fb01192eb43544dcae8fd8b85c380e44.png",
  "Country Garden": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/country_garden_logo_png_httpx_1e642746_1_d0d6d0583c66475eb9a6684b7c24b531.png",
  "Poly": "https://picture-search.tiangong.cn/image/rt/570fa54f0ab148d95cd61e0a1ebc64c5.jpg",
  "CR Land": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/cr_land_china_resources_logo_png_httpx_e8f2b997_2_2b1ed357c91d472785b924b95717e6e0.png",
  "China Overseas": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/china_overseas_logo_png_httpx_48199d2c_1_c4c811f57ad34493b792eac89a1d8065.jpeg",
  "Merchants Shekou": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/china_merchants_shekou_logo_png_httpx_eecdf9f9_1_c3976c2adbba418e99c5571304edc49e.png",
  "Greentown": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/greentown_logo_png_httpx_c47807eb_1_2512aeae076d4602bce9977421be6157.png",
  "Gemdale": "https://skyagent-artifacts.tiangong.cn/router/agent/2026-07-07/prod_agent_019f3bd7-4123-7b80-ac8e-ed7498414be1/gemdale_logo_png_httpx_462575ac_2_ea27b9df2a8145c0950d3a3db43bdae5.png",
};

const HONORS = [
  { en: "National Quality Benchmark", d: "Awarded by the China Quality Association — recognizing enterprise-wide quality management excellence." },
  { en: "MPS S&T Award", d: "3rd Prize for key technical standards in physical security protection, co-awarded with MPS research institutes." },
  { en: "iF Product Design Award", d: "Internationally recognized design excellence — a mark of product design quality from Germany." },
  { en: "National High-Tech Enterprise", d: "Jointly certified by Zhejiang provincial S&T, Finance, and Tax authorities — recognizing R&D intensity and IP portfolio." },
  { en: "National Standard Co-drafter", d: "WONLY participates in drafting national industry standards — setting the benchmark for the security-door sector." },
  { en: "No.1 Market Position", d: "Independent research confirms WONLY leads national sales volume in both smart doors and smart locks (2024–2025)." },
  { en: "5A Supplier — CREAA", d: "Recognized by the China Real Estate Association as a top-tier supply-chain partner." },
  { en: "TOP500 Preferred Supplier", d: "Ranked as the preferred steel entry-door supplier in the 2025 China Real-Estate Supply Chain TOP500." },
  { en: "TOP50 Recommended — X60Pro", d: "The WONLY X60Pro Robotic Security Door named among TOP50 recommended products for new-quality housing 2025." },
];

const WHY = [
  { icon: Layers, t: "One-Stop Service", d: "From doors to smart locks to windows — WONLY delivers the full building-entry ecosystem under one roof. One supplier, one warranty, one accountable partner from threshold to rooftop, eliminating multi-vendor coordination and risk.", img: IMG.commercial2 },
  { icon: TrendingUp, t: "Unbeatable Cost-Performance", d: "Vertical integration across 5 manufacturing bases and 1,000+ patents drives costs down without compromising grade. Global clients get premium security at a price point 20–30% below comparable Western brands.", img: IMG.factory2 },
  { icon: ShieldCheck, t: "Quality First", d: "ISO 9001 / 14001, CE, UL, and EN 1634 fire-rated. Every door survives 90-min fire, forced-entry, and 200,000-cycle testing before it ships. Three decades of zero major safety incidents — that is the standard.", img: IMG.lock3 },
];

const PARTNER_PATHS = [
  { t: "Distributor Program", d: "Join a global network backed by 30 years of brand equity, full product training, and regional marketing support.", cta: "Become a Distributor →" },
  { t: "Project Cooperation", d: "Residential developments, commercial & industrial complexes, medical & hotel projects, government & public institutions.", cta: "Submit a Project →" },
  { t: "OEM / ODM Services", d: "Leverage our 5G smart factories and 1,000+ patent portfolio to build your own branded security line.", cta: "Request OEM/ODM Brief →" },
  { t: "Global Distribution Network", d: "Regional headquarters, local offices, and authorized partners across the Middle East, Southeast Asia, and Central Asia.", cta: "Find a Local Partner →" },
];

const TIMELINE = [
  { y: "1996", m: "Brand founded, Yongkang, Zhejiang" },
  { y: "2000s", m: "National sales leadership in security doors & smart locks" },
  { y: "2021", m: "Listed on Shanghai Stock Exchange (SSE: 605268), China's first in the sector" },
  { y: "Today", m: "5 global bases, 6 R&D centers, 200M+ users worldwide" },
];

function Reveal({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }); }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { const start = performance.now(); const dur = 1600; const tick = (t: number) => { const p = Math.min((t - start) / dur, 1); setN(Math.floor(p * to)); if (p < 1) requestAnimationFrame(tick); else setN(to); }; requestAnimationFrame(tick); io.disconnect(); } }); }, { threshold: 0.5 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function TimelineInteractive() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { setTriggered(true); io.disconnect(); } }); }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!triggered) return;
    TIMELINE.forEach((_, i) => {
      setTimeout(() => setActive(i + 1), i * 500);
    });
  }, [triggered]);
  return (
    <div ref={ref} className="mb-12 px-4">
      <div className="flex justify-between items-start relative">
        <div className="absolute top-3 left-0 right-0 h-0.5" style={{ background: `${GOLD}22` }} />
        {triggered && <div className="absolute top-3 left-0 h-0.5 timeline-progress-line" style={{ background: GOLD }} />}
        {TIMELINE.map((t, i) => (
          <div key={t.y} className="flex-1 text-center relative cursor-pointer group" onMouseEnter={() => setActive(i + 1)} onClick={() => setActive(i + 1)}>
            {i < TIMELINE.length - 1 && <div className="absolute top-3 left-1/2 w-full h-0.5" style={{ background: "transparent" }} />}
            <div className={`relative z-10 w-6 h-6 mx-auto rounded-full border-4 border-white shadow mb-3 transition-all duration-300 ${active > i ? "timeline-node-active" : ""}`} style={{ background: active > i ? GOLD : `${GOLD}44`, transform: active === i + 1 ? "scale(1.4)" : "scale(1)" }} />
            <div className="text-lg font-bold transition-colors duration-300" style={{ color: active >= i + 1 ? GOLD : `${GOLD}66` }}>{t.y}</div>
            <div className="text-neutral-600 text-xs mt-1 max-w-[160px] mx-auto leading-relaxed transition-all duration-300" style={{ opacity: active >= i + 1 ? 1 : 0.4 }}>{t.m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [navDrop, setNavDrop] = useState<string | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [certRow, setCertRow] = useState(0);
  const [form, setForm] = useState({ region: "Global Markets", project: "Select Type", timeline: "Choose Date", volume: "Units Needed" });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTrack = (dir: number) => { const t = trackRef.current; if (t) t.scrollBy({ left: dir * 420, behavior: "smooth" }); };

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const id = setInterval(() => {
      if (!t) return;
      if (t.scrollLeft + t.clientWidth >= t.scrollWidth - 10) {
        t.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        t.scrollBy({ left: 420, behavior: "smooth" });
      }
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCertRow((r) => (r + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  const CERT_ROWS = [
    ["ISO 9001", "ISO 14001", "CE"],
    ["UL", "EN 1634 Fire", "CMA"],
    ["CSPPA", "Fortune 500 Partners", "National High-Tech Enterprise"],
  ];

  const OPTIONS: Record<string, string[]> = {
    region: ["Global Markets", "Middle East", "Southeast Asia", "Central Asia", "North America", "Caribbean", "Europe"],
    project: ["Select Type", "Premium Residential", "Commercial", "Medical & Public", "Engineering", "OEM/ODM"],
    timeline: ["Choose Date", "Within 1 month", "1–3 months", "3–6 months", "6+ months", "Flexible"],
    volume: ["Units Needed", "1–10", "10–100", "100–500", "500–1000", "1000+"],
  };
  const FIELDS = [
    { key: "region", icon: MapPin, label: "Region" },
    { key: "project", icon: Building2, label: "Project" },
    { key: "timeline", icon: Calendar, label: "Timeline" },
    { key: "volume", icon: Users, label: "Volume" },
  ] as const;

  useSeo({
    title: "WONLY | Security Doors, Smart Locks & Whole-House Intelligence",
    description:
      "WONLY is China's No.1 security door and smart lock brand — 30 years of manufacturing, 1,000+ patents, EN 1634 fire-rated doors, and Class A protection for 200M+ users worldwide.",
    path: "/",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "WONLY",
      url: "https://www.wonly.net/",
    },
  });

  return (
    <div className="min-w-[1000px] bg-white text-[#221F20] font-sans">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#221F20]/85 backdrop-blur-xl shadow-lg" : "bg-[#221F20]/40 backdrop-blur-sm"}`}>
        <div className="flex items-center justify-between px-10 py-3 max-w-[1920px] mx-auto">
          <Link to="/" className="text-white text-xl font-bold tracking-[0.15em] shrink-0 cursor-pointer">WONLY</Link>
          <nav className="flex items-center justify-center flex-1 px-4">
            {NAV.map((n) => (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => n.children && setNavDrop(n.label)}
                onMouseLeave={() => setNavDrop(null)}
              >
                <div className="px-3.5 text-white/90 text-sm cursor-pointer hover:text-[#D4C4A0] transition-colors duration-300 whitespace-nowrap flex items-center gap-1">
                  {n.label}
                  {n.children && <ChevronDown size={14} className={`transition-transform duration-300 ${navDrop === n.label ? "rotate-180" : ""}`} />}
                </div>
                {n.children && navDrop === n.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50"
                    style={{ animation: "dropdown-in 0.25s ease" }}
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {n.children.map((c) => (
                        <Link
                          key={c.name}
                          to={c.path}
                          className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer group"
                          onClick={() => setNavDrop(null)}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300" style={{ background: `${GOLD}15` }}>
                            <c.icon size={20} style={{ color: GOLD }} />
                          </div>
                          <div className="flex-1">
                            <div className="text-[#221F20] text-sm font-semibold group-hover:text-[#BFA06A] transition-colors">{c.name}</div>
                            <div className="text-neutral-400 text-xs mt-0.5">{c.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-3 border-t border-gray-100 px-3.5 pb-1">
                      <Link to="/products/security-doors" className="text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: GOLD }}>
                        View All Products <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-1.5 rounded-full border border-white/50 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all duration-300">
              <Globe className="text-white" size={18} /><span className="text-white text-sm font-semibold">EN</span>
            </div>
            <div className="px-5 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" style={{ background: GOLD }}>
              <span className="text-[#221F20] text-sm font-semibold">Request a Quote</span>
            </div>
          </div>
        </div>
      </header>

      <main>
      {/* Hero */}
      <section className="relative w-full h-[88vh] min-h-[600px] flex flex-col items-center justify-start bg-blend-multiply bg-[linear-gradient(to_bottom,rgba(191,160,106,0.3),rgba(34,31,32,0.82)),url(https://picture-search.tiangong.cn/image/rt/85f08a10a5a0545fe837c5fde708f694.jpg)] bg-cover bg-center pt-24">
        <div className="flex flex-col justify-center items-center text-center px-4">
          <div className="text-[#D4C4A0] text-sm font-semibold tracking-[0.25em] uppercase mb-3">China's No.1 Security Door Brand</div>
          <h1 className="text-white text-4xl xl:text-6xl font-bold leading-[64px] max-w-[900px]">The Door to One-stop Home Security.</h1>
          <p className="mt-3 text-white/80 text-base">Your Partner for Every Entry</p>
          <div className="mt-5 flex items-center gap-3">
            <div className="px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }}>
              <span className="text-[#221F20] text-sm font-semibold">Explore Solutions</span><ArrowRight className="text-[#221F20]" size={16} />
            </div>
            <div className="px-5 py-2.5 bg-white/10 rounded-full border border-white/50 cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              <Play className="text-white" size={16} /><span className="text-white text-sm font-semibold">Watch Brand Film</span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-8 flex-shrink-0 px-4 py-2 bg-white rounded-full flex items-center shadow-2xl relative z-20">
          {FIELDS.map((f) => (
            <div key={f.key} className="relative">
              <div
                className="flex items-center gap-3 p-3.5 min-w-[200px] cursor-pointer hover:bg-gray-50 rounded-xl transition-all duration-300"
                onClick={() => setOpenDrop(openDrop === f.key ? null : f.key)}
              >
                <f.icon size={20} style={{ color: GOLD }} />
                <div>
                  <div className="text-neutral-400 text-xs leading-tight">{f.label}</div>
                  <div className="text-neutral-900 text-sm font-medium">{form[f.key]}</div>
                </div>
              </div>
              {openDrop === f.key && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-60 overflow-auto">
                  {OPTIONS[f.key].map((opt) => (
                    <div
                      key={opt}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${form[f.key] === opt ? "font-semibold" : ""}`}
                      style={form[f.key] === opt ? { color: GOLD } : {}}
                      onClick={() => { setForm({ ...form, [f.key]: opt }); setOpenDrop(null); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div
            className="p-3.5 rounded-full justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300 ml-1"
            style={{ background: GOLD }}
            onClick={() => setShowInquiry(true)}
          >
            <Search className="text-white" size={20} />
          </div>
        </div>

        {/* Key metrics */}
        <div className="mt-6 flex items-center gap-12">
          {[
            { v: <Counter to={1} />, l: "Listed" },
            { v: <Counter to={30} />, l: "Years" },
            { v: <Counter to={5} />, l: "Bases" },
            { v: <><Counter to={1000} suffix="+" /></>, l: "Patents" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold" style={{ color: GOLD }}>{s.v}</div>
              <div className="text-white/70 text-xs tracking-[0.2em] uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Products */}
      <section className="mt-20">
        <div className="px-20 flex items-center justify-between">
          <Reveal>
            <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Flagship Products</div>
            <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Engineered for Every Entry</h2>
            <p className="text-neutral-500 text-base mt-3">Eight product lines, one standard of excellence.</p>
          </Reveal>
          <div className="flex items-center gap-4">
            <div onClick={() => scrollTrack(-1)} className="w-14 h-14 rounded-full border flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300" style={{ borderColor: SILVER }}><ChevronLeft className="text-[#221F20]" size={20} /></div>
            <div onClick={() => scrollTrack(1)} className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300" style={{ background: GOLD }}><ChevronRight className="text-white" size={20} /></div>
          </div>
        </div>
        <div ref={trackRef} className="px-20 mt-10 flex gap-7 overflow-x-auto pb-4" style={{ scrollbarColor: "transparent transparent", scrollSnapType: "x mandatory" }}>
          {PRODUCTS.map((p) => (
            <div key={p.n} className="w-[386px] shrink-0 p-3 rounded-2xl border-2 hover:scale-[1.03] transition-all duration-300 cursor-pointer" style={{ background: DARK, borderColor: "rgba(191,160,106,0.4)", scrollSnapAlign: "start" }}>
              <img className="w-full h-[252px] rounded-2xl mb-5 object-cover" src={p.img} alt={p.name} />
              <div className="mx-3">
                <div className="text-xs font-mono mb-2" style={{ color: CHAMP }}>{p.n}</div>
                <div className="text-white text-xl font-semibold mb-3 leading-tight">{p.name}</div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{p.desc}</p>
                <div className="flex items-center justify-between mb-5">
                  {p.path ? (
                    <Link to={p.path} className="px-4 py-2.5 rounded-full border border-white/40 hover:bg-white hover:scale-105 transition-all duration-300 group"><span className="text-white text-sm group-hover:text-[#221F20]">{p.cta}</span></Link>
                  ) : (
                    <div className="px-4 py-2.5 rounded-full border border-white/40 hover:bg-white hover:scale-105 transition-all duration-300 group"><span className="text-white text-sm group-hover:text-[#221F20]">{p.cta}</span></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-20 mt-6 flex gap-4">
          <div className="px-6 py-3 rounded-full text-white text-sm font-semibold cursor-pointer transition-all" style={{ background: DARK }}>Download Full Product Catalog PDF</div>
          <div className="px-6 py-3 rounded-full border text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all" style={{ borderColor: GOLD, color: GOLD }}>Custom Solution Inquiry</div>
        </div>
      </section>

      {/* Scenario Solutions */}
      <section className="px-20 mt-24">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Scenario Solutions</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Built for the World's Most Demanding Spaces</h2>
          <p className="text-neutral-500 text-base mt-3 max-w-2xl mx-auto">From private villas to public institutions — WONLY delivers certified, project-ready security.</p>
        </Reveal>
        <div className="grid grid-cols-3 gap-6">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" src={s.img} alt={s.t} />
                <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-[#221F20] via-[#221F20]/95 to-[#221F20]/0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-semibold mb-2" style={{ color: CHAMP }}>{s.t}</h3>
                  <p className="text-sm leading-relaxed mb-4 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500" style={{ color: `${CHAMP}cc` }}>{s.d}</p>
                  <div className="text-sm font-bold" style={{ color: GOLD }}>{s.cta}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Case Studies & Partners */}
      <section className="px-20 mt-24">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Global Case Studies & Partners</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Trusted by Tech Giants and Top Developers</h2>
          <p className="text-neutral-500 text-base mt-3 max-w-3xl mx-auto">From strategic alliances with the world's leading technology companies to partnerships with China's biggest real-estate developers — WONLY's ecosystem of trust spans industries and continents.</p>
        </Reveal>
        {(() => {
          const ALL_LOGOS = [
            ...PARTNERS_TECH.map((p) => ({ name: p, url: TECH_LOGOS[p] })),
            ...PARTNERS_RE.filter((p) => RE_LOGOS[p]).map((p) => ({ name: p, url: RE_LOGOS[p] })),
          ];
          const rows = [ALL_LOGOS.slice(0, 6), ALL_LOGOS.slice(6, 12), ALL_LOGOS.slice(12)];
          const dirs = ["right", "left", "right"];
          return rows.map((row, ri) => (
            <div key={ri} className="partner-row overflow-hidden mb-4">
              <div className={`flex gap-5 w-max ${dirs[ri] === "left" ? "partner-track-left" : "partner-track-right"}`}>
                {[...row, ...row].map((logo, i) => (
                  <div key={i} className="h-16 w-36 flex-shrink-0 flex items-center justify-center px-4 rounded-xl border bg-white hover:shadow-md transition-all duration-300" style={{ borderColor: `${GOLD}33` }}>
                    <img src={logo.url} alt={logo.name} className="max-h-12 max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          ));
        })()}

        <div className="grid grid-cols-4 gap-4 mb-10">
          {[IMG.shake1, IMG.shake2, IMG.shake3, IMG.factory1].map((img, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden h-48 cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" src={img} alt="" />
              <div className="absolute inset-0 bg-[#221F20]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
                <div className="text-sm font-semibold" style={{ color: CHAMP }}>Strategic Partnership Signing</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {HONORS.map((h, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div className="p-5 bg-white rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: `${GOLD}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = GOLD} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${GOLD}33`}>
                <div className="flex items-center gap-2 mb-2"><Award size={18} style={{ color: GOLD }} /><span className="text-sm font-semibold" style={{ color: GOLD }}>{h.en}</span></div>
                <p className="text-neutral-500 text-xs leading-relaxed">{h.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why WONLY */}
      <section className="px-20 mt-24">
        <Reveal className="text-center mb-12">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Why WONLY</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Why the World Chooses WONLY</h2>
        </Reveal>
        {WHY.map((w, i) => (
          <Reveal key={w.t}>
            <div className={`flex items-center gap-12 mb-16 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${GOLD}1a` }}><w.icon size={28} style={{ color: GOLD }} /></div>
                <h3 className="text-[#221F20] text-3xl font-semibold mb-4">{w.t}</h3>
                <p className="text-neutral-600 text-base leading-relaxed">{w.d}</p>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden h-72"><img className="w-full h-full object-cover hover:scale-105 transition-all duration-500" src={w.img} alt={w.t} /></div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* R&D & Manufacturing */}
      <section className="px-20 mt-24">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>R&D & Manufacturing</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">The Future Factory Behind Every WONLY</h2>
        </Reveal>
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden h-80 mb-8 bg-[linear-gradient(to_right,rgba(34,31,32,0.92),rgba(34,31,32,0.2)),url(https://picture-search.tiangong.cn/image/rt/d0623db57d13458b3b359d9532554337.jpg)] bg-cover bg-center">
            <div className="p-12 max-w-xl">
              <h3 className="text-white text-3xl font-semibold mb-3">5G Fully-Connected Smart Factory</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-5">Step inside our 5G fully-connected smart factory — where robotic flexible production lines craft every door and lock to micron precision. Real-time quality data flows from stamping to final assembly, setting a new global benchmark for intelligent production.</p>
              <div className="px-5 py-2.5 rounded-full inline-flex items-center gap-2 cursor-pointer transition-all" style={{ background: GOLD }}><Play className="text-white" size={16} /><span className="text-white text-sm font-semibold">Watch Factory Film</span></div>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-6">
          {[
            { v: "5", l: "R&D Bases" }, { v: "6", l: "R&D Centers" }, { v: "∞", l: "Joint Labs with Peking University & Top-Tier Institutions" },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="p-8 bg-white rounded-2xl border border-gray-200 text-center hover:shadow-xl transition-all">
                <div className="text-5xl font-bold mb-2" style={{ color: GOLD }}>{c.v}</div>
                <div className="text-neutral-700 text-sm font-medium">{c.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Global Partners */}
      <section className="px-20 mt-24">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Global Partners</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Partner With the No.1</h2>
          <p className="text-neutral-500 text-base mt-3">Four pathways to build with WONLY worldwide.</p>
        </Reveal>
        <div className="grid grid-cols-4 gap-5">
          {PARTNER_PATHS.map((p, i) => (
            <Reveal key={p.t} delay={i * 100}>
              <div className="p-7 bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col" style={{ borderColor: `${GOLD}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = GOLD} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${GOLD}33`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${GOLD}1a` }}><HeartHandshake size={24} style={{ color: GOLD }} /></div>
                <h3 className="text-[#221F20] text-lg font-semibold mb-3">{p.t}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed flex-1">{p.d}</p>
                <div className="text-sm font-semibold mt-4" style={{ color: GOLD }}>{p.cta}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About WONLY */}
      <section className="px-20 mt-24">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>About WONLY</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">30 Years. One Mission.</h2>
        </Reveal>
        <Reveal>
          <div className="flex gap-10 items-center mb-12">
            <div className="flex-1 rounded-2xl overflow-hidden h-72"><img className="w-full h-full object-cover" src={IMG.factory2} alt="WONLY campus" /></div>
            <div className="flex-1">
              <p className="text-neutral-600 text-base leading-relaxed">Founded in Zhejiang, China, WONLY Security Technology Holding Co., Ltd is the first enterprise listed on China's A-share security door & lock market (SSE: 605268). For 30 years we have led the industry in sales volume, engineering the entry systems that protect over 200 million users worldwide.</p>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { icon: Target, t: "Mission", d: "Enable global families to enjoy a safe and intelligent life of great happiness." },
            { icon: Eye, t: "Vision", d: "Become the leader in the global intelligent security ecosystem." },
            { icon: HeartHandshake, t: "Core Values", d: "Integrity · Excellence · Innovation · Win-Win." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <div className="p-7 rounded-2xl border" style={{ background: `${GOLD}0d`, borderColor: `${GOLD}33` }}>
                <c.icon size={26} style={{ color: GOLD }} className="mb-3" />
                <h3 className="text-[#221F20] text-lg font-semibold mb-2">{c.t}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <TimelineInteractive />
        <Reveal>
          <div className="p-8 rounded-2xl" style={{ background: DARK }}>
            <div className="flex items-center gap-2 mb-3"><Leaf size={22} style={{ color: CHAMP }} /><h3 className="text-white text-xl font-semibold">Sustainability & ESG</h3></div>
            <p className="text-white/70 text-sm leading-relaxed max-w-4xl">Sustainability is engineered into every WONLY product — from energy-efficient smart windows that cut building HVAC loads, to closed-loop steel recycling in our 5G factory, to community safety programs that bring certified security to underserved institutions. We report ESG progress annually because our global partners demand accountability, and we welcome it.</p>
          </div>
        </Reveal>
      </section>

      {/* Contact CTA */}
      <section className="px-20 mt-24">
        <div className="relative rounded-2xl overflow-hidden h-80 flex items-center justify-center bg-[linear-gradient(to_bottom,rgba(191,160,106,0.85),rgba(34,31,32,0.85)),url(https://picture-search.tiangong.cn/image/rt/571ffb7e8d819bc25651e98e64cab5a2.jpg)] bg-cover bg-center">
          <div className="text-center px-4">
            <h2 className="text-white text-4xl font-semibold mb-4">Let's Build Safer Entries, Together</h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {["Request a Quote →", "Book a Consultation", "Become a Partner"].map((c) => (
                <div key={c} className="px-6 py-3 bg-white rounded-full text-sm font-semibold cursor-pointer hover:scale-105 transition-all" style={{ color: GOLD }}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="grid grid-cols-5 gap-8 px-20 py-16">
        <div className="col-span-1">
          <h3 className="text-[#221F20] text-xl font-medium mb-4">WONLY</h3>
          <p className="text-neutral-600 text-sm mb-5">The Door to One-stop Home Security.</p>
          <div className="flex gap-3">
            {[Mail, MessageCircle, Phone].map((Icon, i) => (
              <div key={i} className="w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300" style={{ borderColor: SILVER }} onMouseEnter={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.borderColor = GOLD; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = SILVER; }}><Icon size={16} style={{ color: DARK }} /></div>
            ))}
          </div>
          <div className="mt-4 text-neutral-500 text-xs space-y-1">
            <div>Email: wonlyglobal@wonly.net</div>
            <div>WhatsApp: +1 (205) 240-1832</div>
            <div className="text-neutral-400">LinkedIn · YouTube · Facebook · X · Instagram</div>
          </div>
        </div>
        {[
          { h: "Products", links: ["Security Doors", "Smart Locks", "Wooden Doors", "Smart Windows & Doors", "Engineering Doors", "Medical Doors", "Yizhai Yishu", "Smart Home"] },
          { h: "Solutions", links: ["Premium Residential", "Commercial", "Medical & Public", "Engineering", "OEM/ODM"] },
          { h: "Company", links: ["About", "R&D", "Global Footprint", "ESG", "Careers", "Newsroom"] },
          { h: "Resources", links: ["Product Catalogs", "Install Guides", "Warranty", "Certifications", "Contact"] },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="text-[#221F20] text-lg font-medium mb-6">{col.h}</h4>
            <div className="space-y-3.5">
              {col.links.map((l) => (
                <div key={l} className="text-neutral-500 text-sm hover:translate-x-1 transition-all duration-300 cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = GOLD} onMouseLeave={(e) => e.currentTarget.style.color = ""}>{l}</div>
              ))}
            </div>
          </div>
        ))}
      </footer>
      <div className="px-20 pb-10 text-neutral-400 text-xs text-center">© 2026 WONLY Security Technology Holding Co., Ltd. SSE: 605268 · Privacy Policy · Terms · Cookie Settings</div>

      {/* Inquiry modal */}
      {showInquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(34,31,32,0.6)" }} onClick={() => setShowInquiry(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100" style={{ background: DARK }}>
              <div>
                <div className="text-[#D4C4A0] text-xs tracking-[0.2em] uppercase">Get Solutions & Pricing</div>
                <div className="text-white text-xl font-semibold mt-1">Request Solutions & Quote</div>
              </div>
              <button onClick={() => setShowInquiry(false)} className="text-white/70 hover:text-white transition-colors text-2xl leading-none">×</button>
            </div>
            <div className="px-8 py-6">
              <p className="text-neutral-500 text-sm mb-5">Your selections have been pre-filled below. Confirm or adjust, then submit — our team will respond within 24 hours.</p>
              <div className="grid grid-cols-2 gap-4">
                {FIELDS.map((f) => (
                  <div key={f.key}>
                    <label className="text-neutral-400 text-xs">{f.label}</label>
                    <div className="mt-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium" style={{ color: DARK }}>{form[f.key]}</div>
                  </div>
                ))}
                <div>
                  <label className="text-neutral-400 text-xs">Name *</label>
                  <input className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A]" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-neutral-400 text-xs">Email *</label>
                  <input className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A]" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-neutral-400 text-xs">Company</label>
                  <input className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A]" placeholder="Company name" />
                </div>
                <div>
                  <label className="text-neutral-400 text-xs">Phone</label>
                  <input className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A]" placeholder="+1 ..." />
                </div>
                <div className="col-span-2">
                  <label className="text-neutral-400 text-xs">Message</label>
                  <textarea className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A] resize-none" rows={3} placeholder="Tell us about your project requirements..." />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 justify-end">
                <button onClick={() => setShowInquiry(false)} className="px-5 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-neutral-600 hover:bg-gray-50 transition-all">Cancel</button>
                <button className="px-6 py-2.5 rounded-full text-sm font-semibold text-white hover:scale-105 transition-all" style={{ background: GOLD, color: DARK }}>Get Solutions & Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
