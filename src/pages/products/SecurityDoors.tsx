import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Zap, Cpu, MapPin, Calendar, Users, Search, ChevronLeft, ChevronRight,
  Globe, ArrowRight, Play, Award, Building2, HeartHandshake,
  Lock, DoorOpen, Mail, MessageCircle, Phone, Leaf, Target, Eye,
  Layers, TrendingUp, ShieldCheck, ChevronDown, Check, Flame, Wind, Volume2,
} from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";

/* Silver-White-Gold palette */
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

/* Navigation with dropdown support */
const NAV = [
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

/* Security Door Products */
const DOOR_PRODUCTS: { n: string; name: string; desc: string; img: string; badge: string; path?: string }[] = [
  { n: "01", name: "Robotic Security Door — X70", desc: "Autonomous locking, multi-vector intrusion sensing, premium cast-aluminum build. The flagship for villas and executive residences.", img: IMG.hero, badge: "Flagship", path: "/products/security-doors/x70" },
  { n: "02", name: "4.0 Global Series Doors", desc: "International universal models — fire-rated, anti-theft, climate-adapted for global standards.", img: IMG.commercial1, badge: "Best Seller" },
  { n: "03", name: "X60Pro Robotic Door", desc: "TOP50 recommended product for new-quality housing. AI-powered entry management with facial recognition.", img: IMG.lock3, badge: "Award Winner" },
  { n: "04", name: "Engineering Fire Doors", desc: "EN 1634 fire-rated, 90-minute integrity. Compliant with Saudi, Southeast Asia & Central Asia standards.", img: IMG.factory2, badge: "Fire-Rated" },
  { n: "05", name: "Medical-Grade Doors", desc: "HIPAA-aligned ward doors, operating-room hermetic doors, medical project references.", img: IMG.hospital1, badge: "Medical" },
  { n: "06", name: "Yizhai Yishu — Ultra-Premium", desc: "Bespoke villa security doors, integrated smart entry systems, exclusive luxury customization.", img: IMG.lock4, badge: "Luxury" },
];

/* Key Features */
const FEATURES = [
  { icon: Shield, t: "Multi-Vector Intrusion Sensing", d: "Advanced sensors detect forced entry, prying, drilling, and lock-picking attempts in real-time, triggering instant alerts." },
  { icon: Flame, t: "90-Minute Fire Rating", d: "EN 1634 certified fire integrity — doors maintain structural stability and insulation for 90 minutes under fire exposure." },
  { icon: Lock, t: "Autonomous Smart Locking", d: "AI-driven locking system with biometric authentication, app control, and tamper-proof architecture for maximum security." },
  { icon: Wind, t: "Climate-Adapted Engineering", d: "Engineered for extreme conditions — hurricane-rated, corrosion-resistant, and thermal-break designs for global climates." },
  { icon: Volume2, t: "Acoustic Insulation", d: "Sound-reducing core materials and precision sealing deliver STC 35+ acoustic performance for privacy and comfort." },
  { icon: Award, t: "100,000-Cycle Durability", d: "Every door survives 100,000 open-close cycles in testing — backed by 30 years of zero major safety incidents." },
];

/* Technical Specifications */
const SPECS = [
  { label: "Security Grade", value: "Class A (Highest)" },
  { label: "Fire Rating", value: "EN 1634 — 90 min" },
  { label: "Material", value: "Cast Aluminum / Steel Core" },
  { label: "Lock System", value: "Biometric + RFID + App" },
  { label: "Door Thickness", value: "90–120 mm" },
  { label: "Acoustic Rating", value: "STC 35+" },
  { label: "Wind Resistance", value: "Class 12 (Hurricane-Rated)" },
  { label: "Cycle Test", value: "100,000+ cycles" },
  { label: "Certifications", value: "ISO 9001, CE, UL, CMA" },
];

/* Application Scenarios */
const APPLICATIONS = [
  { t: "Premium Villas & Residences", d: "Bespoke designs with ultra-high security grades and whole-house smart integration for discerning homeowners.", img: IMG.villa1 },
  { t: "Commercial & Corporate", d: "Banks, data centers, corporate HQs — engineered to defeat forced entry while meeting fire and life-safety codes.", img: IMG.commercial1 },
  { t: "Medical & Public Institutions", d: "Hermetic operating-room doors, HIPAA-aligned ward doors, and access-controlled entries for hospitals and government facilities.", img: IMG.hospital1 },
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

const SecurityDoors = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useSeo({
    title: "Security Doors — Robotic, Fire-Rated & Engineering Series | WONLY",
    description:
      "Explore WONLY's security door lineup: robotic flagship doors, EN 1634 90-minute fire-rated engineering doors, medical-grade and ultra-premium villa doors — Class A protection, certified worldwide.",
    path: "/products/security-doors",
    type: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Security Doors", item: SITE_URL + "/products/security-doors" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "WONLY Security Door Series",
        itemListElement: DOOR_PRODUCTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          ...(p.path ? { item: SITE_URL + p.path } : {}),
        })),
      },
    ],
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
                onMouseEnter={() => n.children && setOpenDrop(n.label)}
                onMouseLeave={() => setOpenDrop(null)}
              >
                <div className="px-3.5 text-white/90 text-sm cursor-pointer hover:text-[#D4C4A0] transition-colors duration-300 whitespace-nowrap flex items-center gap-1">
                  {n.label}
                  {n.children && <ChevronDown size={14} className={`transition-transform duration-300 ${openDrop === n.label ? "rotate-180" : ""}`} />}
                </div>
                {/* Dropdown */}
                {n.children && openDrop === n.label && (
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
                          onClick={() => setOpenDrop(null)}
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
            <div className="px-5 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
              <span className="text-[#221F20] text-sm font-semibold">Request a Quote</span>
            </div>
          </div>
        </div>
      </header>

      <main>
      {/* Hero */}
      <section className="relative w-full h-[80vh] min-h-[560px] flex flex-col items-center justify-center bg-blend-multiply bg-[linear-gradient(to_bottom,rgba(191,160,106,0.25),rgba(34,31,32,0.85)),url(https://picture-search.tiangong.cn/image/rt/85f08a10a5a0545fe837c5fde708f694.jpg)] bg-cover bg-center pt-24">
        <div className="flex flex-col justify-center items-center text-center px-4">
          <div className="text-[#D4C4A0] text-sm font-semibold tracking-[0.25em] uppercase mb-3">Security Doors · Since 1996</div>
          <h1 className="text-white text-4xl xl:text-6xl font-bold leading-[64px] max-w-[900px]">Security Doors Engineered to Defend Every Entry.</h1>
          <p className="mt-3 text-white/80 text-base max-w-2xl">From robotic flagship doors to fire-rated engineering series — WONLY delivers certified, project-ready security for villas, commercial, and institutional projects worldwide.</p>
          <div className="mt-5 flex items-center gap-3">
            <div className="px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
              <span className="text-[#221F20] text-sm font-semibold">Get Solutions & Quote</span><ArrowRight className="text-[#221F20]" size={16} />
            </div>
            <div className="px-5 py-2.5 bg-white/10 rounded-full border border-white/50 cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              <Play className="text-white" size={16} /><span className="text-white text-sm font-semibold">Watch Product Film</span>
            </div>
          </div>
        </div>
        {/* Key metrics */}
        <div className="mt-8 flex items-center gap-12">
          {[
            { v: <Counter to={30} />, l: "Years" },
            { v: <Counter to={90} suffix=" min" />, l: "Fire Rating" },
            { v: <Counter to={100} suffix="K+" />, l: "Cycle Test" },
            { v: <Counter to={200} suffix="M+" />, l: "Users" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold" style={{ color: GOLD }}>{s.v}</div>
              <div className="text-white/70 text-xs tracking-[0.2em] uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="mt-20 px-20">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Product Lineup</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Security Door Series</h2>
          <p className="text-neutral-500 text-base mt-3 max-w-2xl mx-auto">Six flagship series covering every security grade, fire rating, and application scenario — all backed by 1,000+ patents and 30 years of engineering.</p>
        </Reveal>
        <div className="grid grid-cols-3 gap-6">
          {DOOR_PRODUCTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div className="group rounded-2xl overflow-hidden border-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer" style={{ borderColor: "rgba(191,160,106,0.3)" }}>
                <div className="relative overflow-hidden">
                  <img className="w-full h-[280px] object-cover group-hover:scale-105 transition-all duration-500" src={p.img} alt={p.name} />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: GOLD, color: DARK }}>{p.badge}</div>
                </div>
                <div className="p-6" style={{ background: DARK }}>
                  <div className="text-xs font-mono mb-2" style={{ color: CHAMP }}>{p.n}</div>
                  <div className="text-white text-lg font-semibold mb-3 leading-tight">{p.name}</div>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{p.desc}</p>
                  {p.path ? (
                    <Link to={p.path} className="flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD }}>
                      View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD }}>
                      View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="mt-24 px-20">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Core Technology</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Engineered for Ultimate Protection</h2>
          <p className="text-neutral-500 text-base mt-3 max-w-2xl mx-auto">Six layers of defense — from multi-vector intrusion sensing to 90-minute fire integrity — built into every WONLY security door.</p>
        </Reveal>
        <div className="grid grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={i * 100}>
              <div className="p-7 rounded-2xl border hover:shadow-xl transition-all duration-300 group" style={{ borderColor: "rgba(191,160,106,0.25)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: `${GOLD}15` }}>
                  <f.icon size={28} style={{ color: GOLD }} />
                </div>
                <h3 className="text-[#221F20] text-lg font-semibold mb-3">{f.t}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="mt-24 px-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Specifications</div>
            <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Technical Excellence</h2>
            <p className="text-neutral-500 text-base mt-3">Every parameter meets or exceeds international security standards. Custom configurations available for project-specific requirements.</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
                <span className="text-[#221F20] text-sm font-semibold">Request Full Spec Sheet</span><ArrowRight className="text-[#221F20]" size={16} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "rgba(191,160,106,0.3)" }}>
              {SPECS.map((s, i) => (
                <div key={s.label} className={`flex items-center justify-between px-6 py-4 ${i !== SPECS.length - 1 ? "border-b border-gray-100" : ""} ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                  <div className="text-neutral-500 text-sm">{s.label}</div>
                  <div className="text-[#221F20] text-sm font-semibold flex items-center gap-2">
                    <Check size={14} style={{ color: GOLD }} />{s.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Application Scenarios */}
      <section className="mt-24 px-20">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Applications</div>
          <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Built for Every Space</h2>
          <p className="text-neutral-500 text-base mt-3 max-w-2xl mx-auto">From private villas to public institutions — WONLY security doors deliver certified protection across all project types.</p>
        </Reveal>
        <div className="grid grid-cols-3 gap-6">
          {APPLICATIONS.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" src={s.img} alt={s.t} />
                <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-[#221F20] via-[#221F20]/95 to-[#221F20]/0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-semibold mb-2" style={{ color: CHAMP }}>{s.t}</h3>
                  <p className="text-sm leading-relaxed mb-4 max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-500" style={{ color: `${CHAMP}cc` }}>{s.d}</p>
                  <div className="text-sm font-bold" style={{ color: GOLD }}>View Cases →</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mt-24 px-20">
        <div className="relative rounded-3xl overflow-hidden p-16 text-center" style={{ background: DARK }}>
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,rgba(191,160,106,0.4),rgba(34,31,32,0.8)),url(https://picture-search.tiangong.cn/image/rt/d0623db57d13458b3b359d9532554337.jpg)] bg-cover bg-center" />
          <div className="relative z-10">
            <Reveal>
              <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: CHAMP }}>Ready to Secure Your Project?</div>
              <h2 className="text-white text-4xl font-semibold mt-3 max-w-3xl mx-auto">Get Custom Security Door Solutions & Competitive Pricing</h2>
              <p className="text-white/60 text-base mt-3 max-w-2xl mx-auto">Our engineering team responds within 24 hours with tailored specifications, compliance documentation, and project pricing.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="px-6 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
                  <span className="text-[#221F20] text-sm font-semibold">Get Solutions & Quote</span><ArrowRight className="text-[#221F20]" size={16} />
                </div>
                <div className="px-6 py-3 rounded-full border border-white/40 cursor-pointer hover:bg-white/10 transition-all duration-300">
                  <span className="text-white text-sm font-semibold">Download Catalog PDF</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="mt-24 px-20 pt-16 pb-10 grid grid-cols-5 gap-10 border-t border-gray-100">
        <div className="col-span-2">
          <div className="text-[#221F20] text-2xl font-bold tracking-[0.15em]">WONLY</div>
          <p className="text-neutral-500 text-sm mt-4 max-w-md leading-relaxed">China's No.1 security door brand. Listed on Shanghai Stock Exchange (SSE: 605268). 5 global manufacturing bases, 6 R&D centers, 200M+ users worldwide.</p>
          <div className="flex items-center gap-3 mt-6">
            {[Mail, MessageCircle, Phone].map((Icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300" style={{ borderColor: SILVER }}>
                <Icon size={18} style={{ color: DARK }} />
              </div>
            ))}
          </div>
        </div>
        {[
          { h: "Products", links: ["Security Doors", "Smart Locks", "Wooden Doors", "Aluminum Windows", "Whole-House Intelligence"] },
          { h: "Solutions", links: ["Residential", "Commercial", "Medical & Public", "Engineering", "OEM/ODM"] },
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
                <div className="text-[#D4C4A0] text-xs tracking-[0.2em] uppercase">Security Doors · Get Solutions & Pricing</div>
                <div className="text-white text-xl font-semibold mt-1">Request Solutions & Quote</div>
              </div>
              <button onClick={() => setShowInquiry(false)} className="text-white/70 hover:text-white transition-colors text-2xl leading-none">×</button>
            </div>
            <div className="px-8 py-6">
              <p className="text-neutral-500 text-sm mb-5">Tell us about your project — our team will respond within 24 hours with tailored specifications and pricing.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 text-xs">Project Type</label>
                  <select className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A]">
                    <option>Premium Residential</option>
                    <option>Commercial</option>
                    <option>Medical & Public</option>
                    <option>Engineering</option>
                    <option>OEM/ODM</option>
                  </select>
                </div>
                <div>
                  <label className="text-neutral-400 text-xs">Volume</label>
                  <select className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A]">
                    <option>1–10 units</option>
                    <option>10–100 units</option>
                    <option>100–500 units</option>
                    <option>500–1000 units</option>
                    <option>1000+ units</option>
                  </select>
                </div>
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
                <button className="px-6 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-all" style={{ background: GOLD, color: DARK }}>Get Solutions & Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityDoors;
