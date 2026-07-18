import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Cpu, ChevronRight, Globe, ArrowRight, Play, Award, Home,
  Lock, DoorOpen, Mail, MessageCircle, Phone, Layers, Check,
  Wind, Wifi, ChevronDown,
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
  lock3: "https://picture-search.tiangong.cn/image/rt/f934bfc19ceac72bf7e72780c251bc7c.jpg",
  lock4: "https://picture-search.tiangong.cn/image/rt/b6ea3d6292ee76a9c7725b407fa4b514.jpg",
  factory2: "https://picture-search.tiangong.cn/image/rt/5d75fa99cd91354289665c7242112e13.jpg",
  villa1: "https://picture-search.tiangong.cn/image/rt/449f44b1cf3e44f55f6bcab2ee518982.jpg",
  commercial1: "https://picture-search.tiangong.cn/image/rt/571ffb7e8d819bc25651e98e64cab5a2.jpg",
};

/* Navigation with dropdown support */
const NAV: { label: string; children?: { name: string; desc: string; path: string; icon: typeof Shield }[] }[] = [
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

/* Product gallery */
const GALLERY = [
  { src: IMG.hero, alt: "WONLY X70 robotic security door — front view on a luxury villa entrance" },
  { src: IMG.lock1, alt: "X70 biometric smart lock module with facial recognition panel" },
  { src: IMG.lock3, alt: "X70 cast-aluminum door edge showing multi-point locking bolts" },
  { src: IMG.factory2, alt: "X70 security door on a 5G smart-factory production line" },
];

/* Signature capabilities — image-background cards */
const BASE = import.meta.env.BASE_URL;
const HIGHLIGHTS: { t: string; d: string; img?: string }[] = [
  { t: "Remote Sensing", d: "3–6 m hands-free entry — the X70 senses you approaching and readies to open.", img: `${BASE}images/door-factory.webp` },
  { t: "Auto Open & Close", d: "The door opens as you arrive and closes securely behind you — no hands needed.", img: `${BASE}images/door-cell.webp` },
  { t: "AI Anti-Pinch", d: "Safe for kids, pets and busy hands — it detects the path and stops instantly." },
  { t: "10.1\" Smart Screen", d: "Hi-def touch control at eye level — no bending down to a keypad." },
  { t: "Formaldehyde Sentinel", d: "Continuous air-quality monitoring with instant alerts to your phone." },
  { t: "Auto Arm & Disarm", d: "Arms itself when you leave and disarms the moment you return home." },
];

/* Full technical specifications */
const SPECS: { label: string; value: string }[] = [
  { label: "Model", value: "X70 Robotic Security Door" },
  { label: "Security Grade", value: "Class A (Highest)" },
  { label: "Fire Rating", value: "EN 1634 — 90 min" },
  { label: "Door Body", value: "Cast Aluminum + Honeycomb Steel Core" },
  { label: "Locking Points", value: "16-bolt, 4-edge auto-lock" },
  { label: "Unlock Methods", value: "3D Face · Fingerprint · RFID · App · PIN · Key" },
  { label: "Door Thickness", value: "90–120 mm" },
  { label: "Acoustic Rating", value: "STC 38" },
  { label: "Wind Resistance", value: "Class 12 (Hurricane-Rated)" },
  { label: "Connectivity", value: "Wi-Fi 2.4 GHz · Bluetooth 5.0 · Zigbee" },
  { label: "Power", value: "8000 mAh rechargeable · USB-C backup" },
  { label: "Cycle Test", value: "100,000+ open-close cycles" },
  { label: "Warranty", value: "5-year hardware · 2-year electronics" },
  { label: "Certifications", value: "ISO 9001 · CE · UL · CMA" },
];

/* Configurations */
const VARIANTS = [
  { name: "X70", tag: "Flagship", d: "The core robotic door — 3D face unlock, 16-bolt auto-locking, and full smart-home integration for premium residences.", featured: true },
  { name: "X70 Pro", tag: "Advanced", d: "Adds palm-vein authentication, a built-in HD peephole display, and dual-network failover for high-security homes.", featured: false },
  { name: "X70 Max", tag: "Villa", d: "Double-leaf grand entrance in cast aluminum, extended-reach sensing, and bespoke finishes for villa and estate projects.", featured: false },
];

/* In-application scenarios */
const SCENARIOS = [
  { t: "Executive Villas", d: "Grand entrances that pair estate-grade aesthetics with the highest civilian security rating and whole-house smart control.", img: IMG.villa1 },
  { t: "Luxury Apartments", d: "Hands-free family access, remote guest unlocking, and tamper alerts — engineered for high-rise and gated communities.", img: IMG.commercial1 },
  { t: "Executive Offices", d: "Audit-ready access logs, scheduled locking, and enterprise integration for private offices and boardroom suites.", img: IMG.factory2 },
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

const PAGE_PATH = "/products/security-doors/x70";

const SecurityDoorX70 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useSeo({
    title: "WONLY X70 Robotic Security Door | 3D Face Unlock & 90-Min Fire Rating",
    description:
      "The WONLY X70 flagship robotic security door: 3D facial recognition, 16-bolt autonomous locking, EN 1634 90-minute fire rating, and Class A protection for villas and premium homes.",
    path: PAGE_PATH,
    image: IMG.hero,
    type: "product",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "WONLY X70 Robotic Security Door",
        image: GALLERY.map((g) => g.src),
        description:
          "Flagship robotic security door with 3D facial recognition, 16-bolt autonomous locking, EN 1634 90-minute fire rating, STC 38 acoustic insulation, and Class A security for villas and premium residences.",
        sku: "WONLY-X70",
        brand: { "@type": "Brand", name: "WONLY" },
        category: "Security Doors",
        manufacturer: { "@type": "Organization", name: "WONLY Security Technology Holding Co., Ltd." },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Security Grade", value: "Class A" },
          { "@type": "PropertyValue", name: "Fire Rating", value: "EN 1634 — 90 min" },
          { "@type": "PropertyValue", name: "Acoustic Rating", value: "STC 38" },
        ],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          price: "0",
          url: SITE_URL + PAGE_PATH,
          seller: { "@type": "Organization", name: "WONLY" },
          description: "Contact WONLY for project pricing and a tailored quote.",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Security Doors", item: SITE_URL + "/products/security-doors" },
          { "@type": "ListItem", position: 3, name: "X70 Robotic Security Door", item: SITE_URL + PAGE_PATH },
        ],
      },
    ],
  });

  return (
    <div className="min-w-[1000px] bg-white text-[#221F20] font-sans">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#221F20]/85 backdrop-blur-xl shadow-lg" : "bg-[#221F20]/40 backdrop-blur-sm"}`}>
        <div className="flex items-center justify-between px-10 py-3 max-w-[1920px] mx-auto">
          <Link to="/" className="text-white text-xl font-bold tracking-[0.15em] shrink-0 cursor-pointer">WONLY</Link>
          <nav aria-label="Primary" className="flex items-center justify-center flex-1 px-4">
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
            <button className="px-5 py-1.5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
              <span className="text-[#221F20] text-sm font-semibold">Request a Quote</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative w-full h-[80vh] min-h-[560px] flex flex-col items-center justify-center bg-blend-multiply bg-[linear-gradient(to_bottom,rgba(191,160,106,0.25),rgba(34,31,32,0.88)),url(https://picture-search.tiangong.cn/image/rt/85f08a10a5a0545fe837c5fde708f694.jpg)] bg-cover bg-center pt-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-white/70 text-xs tracking-wide">
              <li><Link to="/" className="flex items-center gap-1 hover:text-[#D4C4A0] transition-colors"><Home size={13} /> Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={13} /></li>
              <li><Link to="/products/security-doors" className="hover:text-[#D4C4A0] transition-colors">Security Doors</Link></li>
              <li aria-hidden="true"><ChevronRight size={13} /></li>
              <li aria-current="page" className="text-[#D4C4A0] font-semibold">X70</li>
            </ol>
          </nav>
          <div className="flex flex-col justify-center items-center text-center px-4">
            <div className="text-[#D4C4A0] text-sm font-semibold tracking-[0.25em] uppercase mb-3">Flagship · Robotic Security Door</div>
            <h1 className="text-white text-4xl xl:text-6xl font-bold leading-[1.1] max-w-[900px]">The X70 Guards Your Home Before You Ask</h1>
            <p className="mt-4 text-white/80 text-base max-w-2xl">Robotic auto-locking, 3D face unlock, and 90-minute fire integrity — the flagship security door engineered for villas and executive residences that accept nothing less than Class A.</p>
            <div className="mt-6 flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
                <span className="text-[#221F20] text-sm font-semibold">Get a Quote</span><ArrowRight className="text-[#221F20]" size={16} />
              </button>
              <button className="px-5 py-2.5 bg-white/10 rounded-full border border-white/50 cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Play className="text-white" size={16} /><span className="text-white text-sm font-semibold">Watch Product Film</span>
              </button>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-12">
            {[
              { v: <Counter to={16} />, l: "Locking Bolts" },
              { v: <Counter to={90} suffix=" min" />, l: "Fire Rating" },
              { v: <Counter to={38} suffix=" STC" />, l: "Acoustic" },
              { v: <Counter to={100} suffix="K+" />, l: "Cycle Test" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold" style={{ color: GOLD }}>{s.v}</div>
                <div className="text-white/70 text-xs tracking-[0.2em] uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Overview: gallery + summary */}
        <section className="mt-20 px-20">
          <div className="grid grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "rgba(191,160,106,0.3)" }}>
                <img className="w-full h-[460px] object-cover transition-all duration-500" src={GALLERY[activeImg].src} alt={GALLERY[activeImg].alt} loading="lazy" />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {GALLERY.map((g, i) => (
                  <button
                    key={g.src}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Show image ${i + 1}: ${g.alt}`}
                    aria-pressed={activeImg === i}
                    className="rounded-xl overflow-hidden border-2 transition-all duration-300"
                    style={{ borderColor: activeImg === i ? GOLD : "transparent" }}
                  >
                    <img className="w-full h-20 object-cover" src={g.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Overview</div>
              <h2 className="text-[#221F20] text-4xl font-semibold mt-3 leading-tight">Security That Runs Itself — And Answers To You</h2>
              <p className="text-neutral-600 text-base mt-4 leading-relaxed">
                The X70 is WONLY's flagship robotic security door: the instant it closes, sixteen hardened bolts drive home across all four edges — no turn of a key, no forgotten deadbolt. 3D facial recognition welcomes your family hands-free, while multi-vector sensors watch the frame for any attempt to force it. Behind the aesthetics sits a cast-aluminum body with an EN 1634 fire-rated core, tested to survive 100,000 cycles and three decades of WONLY engineering.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "3D face unlock from up to 1.5 m — anti-spoofing, sub-second",
                  "16-bolt autonomous locking on every close",
                  "EN 1634 90-minute fire integrity · Class A security",
                  "Full smart-home control with tamper and access alerts",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}1a` }}>
                      <Check size={13} style={{ color: GOLD }} />
                    </span>
                    <span className="text-neutral-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3">
                <button className="px-6 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
                  <span className="text-[#221F20] text-sm font-semibold">Get Solutions & Quote</span><ArrowRight className="text-[#221F20]" size={16} />
                </button>
                <button className="px-6 py-3 rounded-full border text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all" style={{ borderColor: GOLD, color: GOLD }}>
                  Download Spec Sheet
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-24 px-20">
          <Reveal className="text-center mb-10">
            <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Signature Capabilities</div>
            <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Six Reasons The X70 Leads</h2>
            <p className="text-neutral-500 text-base mt-3 max-w-2xl mx-auto">Every feature earns its place — engineered to protect, tested to last, and designed to disappear into daily life.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((f, i) => (
              <Reveal key={f.t} delay={i * 100}>
                <div className="group relative rounded-2xl overflow-hidden h-[300px] md:h-[340px]" style={{ background: "linear-gradient(140deg,#2a2627,#0d0d0d)" }}>
                  {f.img && <img src={f.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                  <div className="absolute inset-0" style={{ background: f.img ? "linear-gradient(rgba(13,13,13,0.2) 30%, rgba(13,13,13,0.9) 100%)" : "linear-gradient(150deg, rgba(191,160,106,0.14), rgba(13,13,13,0.25) 60%)" }} />
                  <div className="absolute top-6 left-7 w-9 h-[2px]" style={{ background: GOLD }} />
                  <div className="absolute bottom-0 left-0 p-7">
                    <h3 className="text-white text-2xl font-light leading-tight">{f.t}</h3>
                    <p className="mt-2.5 text-sm font-light leading-relaxed max-w-[94%]" style={{ color: CHAMP }}>{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mt-24 px-20">
          <div className="grid grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Specifications</div>
              <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Every Parameter, Documented</h2>
              <p className="text-neutral-500 text-base mt-3">The X70 meets or exceeds international security, fire, and acoustic standards. Custom sizes, finishes, and hardware are available for project-specific requirements.</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { icon: Wind, l: "Hurricane-rated" },
                  { icon: Wifi, l: "Smart-home ready" },
                  { icon: Award, l: "ISO · CE · UL" },
                ].map((b) => (
                  <div key={b.l} className="p-4 rounded-xl border text-center" style={{ borderColor: "rgba(191,160,106,0.25)" }}>
                    <b.icon size={22} style={{ color: GOLD }} className="mx-auto mb-2" />
                    <div className="text-neutral-600 text-xs font-medium">{b.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
                  <span className="text-[#221F20] text-sm font-semibold">Request Full Spec Sheet</span><ArrowRight className="text-[#221F20]" size={16} />
                </button>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "rgba(191,160,106,0.3)" }}>
                {SPECS.map((s, i) => (
                  <div key={s.label} className={`flex items-center justify-between px-6 py-3.5 ${i !== SPECS.length - 1 ? "border-b border-gray-100" : ""} ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                    <div className="text-neutral-500 text-sm">{s.label}</div>
                    <div className="text-[#221F20] text-sm font-semibold text-right max-w-[60%]">{s.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Configurations */}
        <section className="mt-24 px-20">
          <Reveal className="text-center mb-10">
            <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>Configurations</div>
            <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Choose Your X70</h2>
            <p className="text-neutral-500 text-base mt-3 max-w-2xl mx-auto">Three configurations share the same robotic core — scale up to palm-vein security or a double-leaf villa entrance.</p>
          </Reveal>
          <div className="grid grid-cols-3 gap-6">
            {VARIANTS.map((v, i) => (
              <Reveal key={v.name} delay={i * 100}>
                <div
                  className="p-8 rounded-2xl border-2 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderColor: v.featured ? GOLD : "rgba(191,160,106,0.25)", background: v.featured ? `${GOLD}0d` : "#fff" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[#221F20] text-2xl font-bold">{v.name}</div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: v.featured ? GOLD : `${GOLD}1a`, color: v.featured ? DARK : GOLD }}>{v.tag}</span>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed flex-1">{v.d}</p>
                  <button onClick={() => setShowInquiry(true)} className="mt-6 flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD }}>
                    Enquire <ArrowRight size={14} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* In application */}
        <section className="mt-24 px-20">
          <Reveal className="text-center mb-10">
            <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>In Application</div>
            <h2 className="text-[#221F20] text-5xl font-semibold mt-3">Where The X70 Belongs</h2>
          </Reveal>
          <div className="grid grid-cols-3 gap-6">
            {SCENARIOS.map((s, i) => (
              <Reveal key={s.t} delay={i * 120}>
                <div className="group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer">
                  <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500" src={s.img} alt={`WONLY X70 security door installed for ${s.t.toLowerCase()}`} loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 p-7 bg-gradient-to-t from-[#221F20] via-[#221F20]/95 to-[#221F20]/0">
                    <h3 className="text-2xl font-semibold mb-2" style={{ color: CHAMP }}>{s.t}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: `${CHAMP}cc` }}>{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-24 px-20">
          <div className="relative rounded-3xl overflow-hidden p-16 text-center" style={{ background: DARK }}>
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,rgba(191,160,106,0.4),rgba(34,31,32,0.8)),url(https://picture-search.tiangong.cn/image/rt/5d75fa99cd91354289665c7242112e13.jpg)] bg-cover bg-center" />
            <div className="relative z-10">
              <Reveal>
                <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: CHAMP }}>Bring the X70 to Your Project</div>
                <h2 className="text-white text-4xl font-semibold mt-3 max-w-3xl mx-auto">Get X70 Specifications & Competitive Project Pricing</h2>
                <p className="text-white/60 text-base mt-3 max-w-2xl mx-auto">Our engineering team responds within 24 hours with tailored specifications, compliance documentation, and volume pricing for distributors and developers.</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button className="px-6 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => setShowInquiry(true)}>
                    <span className="text-[#221F20] text-sm font-semibold">Get Solutions & Quote</span><ArrowRight className="text-[#221F20]" size={16} />
                  </button>
                  <button className="px-6 py-3 rounded-full border border-white/40 cursor-pointer hover:bg-white/10 transition-all duration-300">
                    <span className="text-white text-sm font-semibold">Download Catalog PDF</span>
                  </button>
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
                <div className="text-[#D4C4A0] text-xs tracking-[0.2em] uppercase">X70 · Get Solutions & Pricing</div>
                <div className="text-white text-xl font-semibold mt-1">Request Solutions & Quote</div>
              </div>
              <button onClick={() => setShowInquiry(false)} aria-label="Close" className="text-white/70 hover:text-white transition-colors text-2xl leading-none">×</button>
            </div>
            <div className="px-8 py-6">
              <p className="text-neutral-500 text-sm mb-5">Tell us about your project — our team will respond within 24 hours with tailored X70 specifications and pricing.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-400 text-xs">Project Type</label>
                  <select className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#BFA06A]">
                    <option>Premium Residential</option>
                    <option>Villa & Estate</option>
                    <option>Commercial</option>
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

export default SecurityDoorX70;
