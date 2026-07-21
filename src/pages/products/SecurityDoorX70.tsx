import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Award, Home, Check, Wind, Wifi } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { SiteHeader, SiteFooter, CtaBand, useQuoteStore } from "@/lib/site-ui";

/* Silver-White-Gold palette */
const GOLD = "#BFA06A";
const CHAMP = "#D4C4A0";
const DARK = "#221F20";

// Declared before GALLERY / media() below — they read it at module scope, so a
// later `const` would leave them in the temporal dead zone and blank the page.
const BASE = import.meta.env.BASE_URL;

const IMG = {
  hero: "https://picture-search.tiangong.cn/image/rt/85f08a10a5a0545fe837c5fde708f694.jpg",
  lock1: "https://picture-search.tiangong.cn/image/rt/37df649adeceb5a6e298b9c079ca9832.jpg",
  lock3: "https://picture-search.tiangong.cn/image/rt/f934bfc19ceac72bf7e72780c251bc7c.jpg",
  lock4: "https://picture-search.tiangong.cn/image/rt/b6ea3d6292ee76a9c7725b407fa4b514.jpg",
  factory2: "https://picture-search.tiangong.cn/image/rt/5d75fa99cd91354289665c7242112e13.jpg",
  villa1: "https://picture-search.tiangong.cn/image/rt/449f44b1cf3e44f55f6bcab2ee518982.jpg",
  commercial1: "https://picture-search.tiangong.cn/image/rt/571ffb7e8d819bc25651e98e64cab5a2.jpg",
};

/* Product gallery */
const GALLERY = [
  { src: `${BASE}images/door/gallery/g1-front.jpg`, alt: "WONLY X70 robotic security door — front view with smart panel and lock" },
  { src: `${BASE}images/door/gallery/g2-scene.jpg`, alt: "WONLY X70 cast-aluminium door in a premium residential entrance" },
  { src: `${BASE}images/door/gallery/g3-detail.jpg`, alt: "WONLY X70 door body and smart-lock detail on the production line" },
  { src: `${BASE}images/door/gallery/g4-factory.jpg`, alt: "WONLY X70 security doors on the 5G smart-factory line" },
];

/* ── Banner + Smart Features (merged in from the Metal Door page) ─────────────
   Local media, referenced via Vite's BASE_URL so paths resolve on both the root
   domain and a GitHub Pages project sub-path. encodeURI keeps the spaces (and the
   "&" in "Auto Open & Close.mp4") valid inside the directory name once deployed. */
const media = (file: string) => encodeURI(`${BASE}images/door/selling point/${file}`);
const BANNER = `${BASE}images/door/door-banner7-1920x1000.jpg`;

/* Pixel replica of public/_agent/metal-door-reference.html — the reference class
   names are preserved verbatim but scoped under `.md-root` so they never collide
   with Tailwind's global styles. Keyframes are renamed (md-fill / md-pulse) for the
   same reason. */
const MD_CSS = `
.md-root{--gold:#B08D4F;--gold2:#C9A15E;--gold-soft:#E6CE97;--ink:#231f1c;--dink:#0c0b0a;--tile:#161311;--line:rgba(201,161,94,.18);background:#ece4d6;color:var(--ink);font-family:"Poppins","PingFang SC",system-ui,sans-serif;}
.md-root *{font-family:inherit;}
/* ===== SECTION 1 — BANNER ===== */
.md-root .hero{position:relative;width:100%;aspect-ratio:1920/1000;max-height:100vh;overflow:hidden;display:flex;align-items:center;}
.md-root .hero .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:0;}
.md-root .hero::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(90deg,rgba(236,228,214,.55) 0%,rgba(236,228,214,.12) 34%,rgba(236,228,214,0) 55%);}
.md-root .tx{position:relative;z-index:2;padding:0 6vw;max-width:680px;}
.md-root .hero .eyebrow{font-size:clamp(10px,.9vw,12px);letter-spacing:.34em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:16px;}
.md-root h1{font-size:clamp(32px,4.4vw,64px);font-weight:300;line-height:1.03;letter-spacing:-1.2px;color:#201c19;}
.md-root h1 b{font-weight:600;}
.md-root .sub{color:#4a433b;font-size:clamp(13px,1.1vw,16px);margin-top:16px;max-width:380px;line-height:1.6;}
.md-root .cta{display:flex;gap:14px;margin-top:26px;}
.md-root .btn{display:inline-flex;align-items:center;gap:9px;padding:14px 26px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;transition:.2s;cursor:pointer;border:1px solid var(--ink);}
.md-root .btn.solid{background:var(--ink);color:#fff;}.md-root .btn.solid:hover{gap:14px;}
.md-root .btn.line{background:rgba(255,255,255,.35);color:var(--ink);backdrop-filter:blur(4px);}.md-root .btn.line:hover{background:var(--ink);color:#fff;}
@media(max-width:760px){.md-root .hero{aspect-ratio:3/4;}.md-root .hero .bg{object-position:74% center;}.md-root .hero::after{background:linear-gradient(180deg,rgba(236,228,214,.82),rgba(236,228,214,.2) 46%,rgba(236,228,214,.9));}}
/* ===== SECTION 2 — SMART FEATURES (dark bento) ===== */
.md-root .feat{background:var(--dink);color:#f4efe6;padding:92px 5vw;}
.md-root .fhead{max-width:1320px;margin:0 auto 40px;}
.md-root .feat .eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold2);font-weight:700;}
.md-root .feat .eyebrow::before{content:"";width:26px;height:1px;background:linear-gradient(90deg,transparent,var(--gold2));}
.md-root .feat h2{font-size:clamp(28px,3.3vw,44px);font-weight:200;line-height:1.12;margin-top:15px;color:#f7f2e9;}
.md-root .feat h2 b{font-weight:600;background:linear-gradient(90deg,var(--gold-soft),var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent;}
.md-root .bento{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:210px 210px 300px;grid-auto-rows:210px;gap:14px;}
.md-root .tile{position:relative;border-radius:16px;overflow:hidden;background:var(--tile);border:1px solid var(--line);}
.md-root .tile.big{grid-column:span 2;grid-row:span 2;}
.md-root .tile.wide{grid-column:span 2;grid-row:span 1;}
.md-root .tile.sm{grid-column:span 1;grid-row:span 1;}
.md-root .tile video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;}
.md-root .tile .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,7,6,.72) 0%,rgba(8,7,6,.15) 34%,transparent 60%);pointer-events:none;}
.md-root .tile .label{position:absolute;top:22px;left:24px;right:24px;z-index:3;}
.md-root .tile .label h3{font-size:17px;font-weight:600;letter-spacing:-.2px;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.5);}
.md-root .tile.big .label h3{font-size:21px;}
/* HUD: Formaldehyde Sentinel (pure CSS/SVG, no video) */
.md-root .air{background:radial-gradient(120% 100% at 50% 20%,#16221c,#0b120e);display:flex;align-items:center;justify-content:center}
.md-root .air svg{width:150px;height:150px;transform:rotate(-90deg);margin-top:14px}
.md-root .air .track{fill:none;stroke:rgba(255,255,255,.08);stroke-width:9}
.md-root .air .arc{fill:none;stroke:url(#ag);stroke-width:9;stroke-linecap:round;stroke-dasharray:314;stroke-dashoffset:314;animation:md-fill 2.4s cubic-bezier(.3,0,.2,1) forwards}
@keyframes md-fill{to{stroke-dashoffset:226}}
.md-root .air .read{position:absolute;text-align:center;margin-top:14px}
.md-root .air .read .n{font-size:30px;font-weight:300;color:#eafff2;letter-spacing:-.5px}
.md-root .air .read .u{font-size:10px;letter-spacing:.14em;color:#8bbfa2;text-transform:uppercase;margin-top:2px}
.md-root .air .stat{position:absolute;bottom:22px;left:24px;z-index:3;display:flex;align-items:center;gap:7px;font-size:11px;letter-spacing:.1em;color:#bfe8cf}
.md-root .air .stat i{width:8px;height:8px;border-radius:50%;background:#5fd08a;box-shadow:0 0 8px #5fd08a;animation:md-pulse 1.8s ease-in-out infinite}
@keyframes md-pulse{50%{opacity:.4}}
.md-root .air .pm{position:absolute;bottom:22px;right:24px;z-index:3;font:600 11px/1 "SF Mono",ui-monospace,monospace;color:rgba(180,225,200,.8)}
@media(max-width:820px){.md-root .bento{grid-template-columns:1fr;grid-template-rows:none;grid-auto-rows:220px;}
 .md-root .tile.big,.md-root .tile.wide,.md-root .tile.sm{grid-column:span 1;grid-row:span 1;}}
`;

// Force muted before autoplay — React does not reliably set the `muted` DOM
// property from the attribute alone, and browsers block unmuted autoplay.
const forceMute = (v: HTMLVideoElement | null) => { if (v) v.muted = true; };

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
  { label: "Cycle Test", value: "200,000+ open-close cycles" },
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
  const [activeImg, setActiveImg] = useState(0);
  // Every "quote" button on the page drives the shared modal that SiteHeader renders.
  const openQuote = useQuoteStore((s) => s.openQuote);

  // HCHO live read-out for the Formaldehyde Sentinel tile, cleaned up on unmount.
  const [hcho, setHcho] = useState("0.03");
  useEffect(() => {
    const id = setInterval(() => setHcho((0.02 + Math.random() * 0.02).toFixed(2)), 1600);
    return () => clearInterval(id);
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
      <SiteHeader />

      <main>
        {/* Banner + Smart Features — scoped under .md-root so the reference CSS
            never leaks into the Tailwind-styled sections below. */}
        <div className="md-root">
          <style>{MD_CSS}</style>

          {/* SECTION 1: BANNER */}
          <section className="hero">
            <img className="bg" src={BANNER} alt="WONLY X70 robotic security door" />
            <div className="tx">
              <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs tracking-wide" style={{ color: "#8a8378" }}>
                <li><Link to="/" className="flex items-center gap-1 hover:text-[#BFA06A] transition-colors"><Home size={13} /> Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li><Link to="/products/security-doors" className="hover:text-[#BFA06A] transition-colors">Security Doors</Link></li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li aria-current="page" className="font-semibold" style={{ color: GOLD }}>X70</li>
              </ol>
            </nav>
              <h1>Pioneer of the<br /><b>Robotic Security Door</b></h1>
              <p className="sub">Cast-aluminium doors that open as you approach — 30 years of security, reimagined.</p>
              <div className="cta">
                <a className="btn solid" onClick={() => openQuote({ subject: "X70 Robotic Security Door" })}>Get a Quote &rarr;</a>
                <a className="btn line" href="#configurations">Explore the Range</a>
              </div>
            </div>
          </section>

          {/* SECTION 2: SMART FEATURES */}
          <section className="feat" id="features">
            <div className="fhead">
              <div className="eyebrow">Smart Technology</div>
              <h2>Six Systems. <b>One Intelligent Door</b></h2>
            </div>
            <div className="bento">
              <div className="tile big">
                <video ref={forceMute} src={media("Auto Open & Close.mp4")} autoPlay muted loop playsInline preload="metadata" />
                <div className="scrim" />
                <div className="label"><h3>Auto Open &amp; Close</h3></div>
              </div>
              <div className="tile wide">
                <video ref={forceMute} src={media("Smart Anti-Pinch System.mp4")} autoPlay muted loop playsInline preload="metadata" />
                <div className="scrim" />
                <div className="label"><h3>Smart Anti-Pinch System</h3></div>
              </div>
              <div className="tile sm">
                <video ref={forceMute} src={media("power supply3.mp4")} autoPlay muted loop playsInline preload="metadata" />
                <div className="scrim" />
                <div className="label"><h3>Dual Power Supply</h3></div>
              </div>
              <div className="tile sm air">
                <svg viewBox="0 0 120 120">
                  <defs>
                    <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#5fd08a" />
                      <stop offset="1" stopColor="#C9A15E" />
                    </linearGradient>
                  </defs>
                  <circle className="track" cx="60" cy="60" r="50" />
                  <circle className="arc" cx="60" cy="60" r="50" />
                </svg>
                <div className="read"><div className="n">{hcho}</div><div className="u">HCHO mg/m3</div></div>
                <div className="stat"><i />Good</div>
                <div className="pm">PM2.5 12</div>
                <div className="label"><h3>Formaldehyde Sentinel</h3></div>
              </div>
              <div className="tile wide">
                <video ref={forceMute} src={media("Smart Perimeter Monitoring.mp4")} autoPlay muted loop playsInline preload="metadata" />
                <div className="scrim" />
                <div className="label"><h3>Smart Perimeter Monitoring</h3></div>
              </div>
              <div className="tile wide">
                <video ref={forceMute} src={media("Smart Voice Message2.mp4")} autoPlay muted loop playsInline preload="metadata" />
                <div className="scrim" />
                <div className="label"><h3>Smart Voice Message</h3></div>
              </div>
            </div>
          </section>
        </div>

        {/* Breadcrumb + key figures — the strip the old hero used to carry. */}
        <section className="px-20 py-8 border-b border-gray-100">
          <div className="mt-6 flex items-center justify-center gap-16">
            {[
              { v: <Counter to={16} />, l: "Locking Bolts" },
              { v: <Counter to={90} suffix=" min" />, l: "Fire Rating" },
              { v: <Counter to={38} suffix=" STC" />, l: "Acoustic" },
              { v: <Counter to={200} suffix="K+" />, l: "Cycle Test" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold" style={{ color: GOLD }}>{s.v}</div>
                <div className="text-neutral-400 text-xs tracking-[0.2em] uppercase mt-1">{s.l}</div>
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
                The X70 is WONLY's flagship robotic security door: the instant it closes, sixteen hardened bolts drive home across all four edges — no turn of a key, no forgotten deadbolt. 3D facial recognition welcomes your family hands-free, while multi-vector sensors watch the frame for any attempt to force it. Behind the aesthetics sits a cast-aluminum body with an EN 1634 fire-rated core, tested to survive 200,000 cycles and three decades of WONLY engineering.
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
                <button className="px-6 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => openQuote({ subject: "X70 Robotic Security Door" })}>
                  <span className="text-[#221F20] text-sm font-semibold">Get Solutions & Quote</span><ArrowRight className="text-[#221F20]" size={16} />
                </button>
                <button className="px-6 py-3 rounded-full border text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all" style={{ borderColor: GOLD, color: GOLD }}>
                  Download Spec Sheet
                </button>
              </div>
            </Reveal>
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
                <button className="px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2" style={{ background: GOLD }} onClick={() => openQuote({ subject: "X70 Robotic Security Door" })}>
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
        <section id="configurations" className="mt-24 px-20 scroll-mt-24">
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
                  <button onClick={() => openQuote({ subject: "X70 Robotic Security Door" })} className="mt-6 flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD }}>
                    Enquire <ArrowRight size={14} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* In application */}
        <section className="mt-24 pb-28 px-20">
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
      </main>

      <CtaBand eyebrowText="Bring the X70 to Your Project" title="Get X70 Specs & Project Pricing" sub="Our engineering team replies within 24 hours with tailored specifications, compliance documentation and volume pricing for distributors and developers." />
      <SiteFooter />

    </div>
  );
};

export default SecurityDoorX70;
