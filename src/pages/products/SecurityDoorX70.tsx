import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Award, Home, Check, Wind, Wifi } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { SiteHeader, SiteFooter, CtaBand, useQuoteStore } from "@/lib/site-ui";
import { RelatedInsights } from "@/lib/related-insights";

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
.md-root .hero::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(236,228,214,.55) 0%,rgba(236,228,214,.12) 34%,rgba(236,228,214,0) 55%);}
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
.md-root .air .arc{fill:none;stroke:url(#ag);stroke-width:9;stroke-linecap:round;stroke-dasharray:314;transition:stroke-dashoffset .9s cubic-bezier(.3,0,.2,1);animation:md-glow 2.8s ease-in-out infinite}
@keyframes md-glow{0%,100%{filter:drop-shadow(0 0 3px rgba(95,208,138,.35))}50%{filter:drop-shadow(0 0 11px rgba(95,208,138,.7))}}
.md-root .air .spin{fill:none;stroke:rgba(95,208,138,.4);stroke-width:1.5;stroke-dasharray:2 7;transform-origin:60px 60px;animation:md-spin 7s linear infinite}
@keyframes md-spin{to{transform:rotate(360deg)}}
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

// Poster-first, queued viewport video. The previous version attached src and
// called play() on all five clips at once; on a slow connection Chrome's media
// pipeline sat "waiting for the first frame" on five stalled fetches, which
// visibly froze the page and left the tiles black. Now every tile paints its
// poster immediately, the clips download ONE at a time through a tiny queue as
// tiles near the viewport, and a clip that cannot produce a frame in 8s falls
// back to its poster for good.
const vidQueue: (() => void)[] = [];
let vidBusy = false;
const vidPump = () => { if (vidBusy) return; const next = vidQueue.shift(); if (next) { vidBusy = true; next(); } };
const vidDone = () => { vidBusy = false; vidPump(); };

function LazyVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [attach, setAttach] = useState(false); // our queue turn arrived - src goes on
  const [dead, setDead] = useState(false);     // clip failed - poster only, forever
  const seenRef = useRef(false);

  // Near the viewport: enqueue this tile's download; pause/resume on later scrolls.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          if (!seenRef.current) { seenRef.current = true; vidQueue.push(() => setAttach(true)); vidPump(); }
          else { el.muted = true; el.play?.().catch(() => {}); }
        } else { el.pause?.(); }
      }),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Queue turn: play, then hand the queue on at first frame, error, or an 8s stall.
  useEffect(() => {
    if (!attach) return;
    const el = ref.current;
    if (!el) { vidDone(); return; }
    let tid = 0;
    let settled = false;
    const settle = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(tid);
      if (!ok) { try { el.pause(); el.removeAttribute("src"); el.load(); } catch { /* poster stays */ } setDead(true); }
      vidDone();
    };
    const onFrame = () => settle(true);
    const onError = () => settle(false);
    el.addEventListener("loadeddata", onFrame);
    el.addEventListener("error", onError);
    tid = window.setTimeout(() => settle(false), 8000);
    el.muted = true; // React does not reliably set muted from the attribute
    el.play?.().catch(() => {});
    return () => { el.removeEventListener("loadeddata", onFrame); el.removeEventListener("error", onError); window.clearTimeout(tid); };
  }, [attach]);

  return <video ref={ref} src={attach && !dead ? src : undefined} poster={poster} muted loop playsInline preload="none" controlsList="nodownload nofullscreen noremoteplayback" onContextMenu={(e) => e.preventDefault()} />;
}

/* Full technical specifications */
const SPECS: { label: string; value: string }[] = [
  { label: "Model", value: "X70 Robotic Security Door" },
  { label: "Security Grade", value: "Class A (Highest)" },
  { label: "Fire Rating", value: "EN 1634 — 90 min" },
  { label: "Door Body", value: "Cast Aluminum + Honeycomb Steel Core" },
  { label: "Locking Points", value: "16-bolt, 4-edge auto-lock" },
  { label: "Unlock Methods", value: "3D Face · Fingerprint · RFID · App · PIN · Key" },
  { label: "Lock Core", value: "Patented cylindrical core (anti-drill / pick / bump)" },
  { label: "Smart Display", value: "10.1\" HD · touch on Pro/Max" },
  { label: "Door Camera", value: "Frame-mounted HD peephole · night vision · live stream" },
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
  const [pm25, setPm25] = useState(12);
  useEffect(() => {
    const id = setInterval(() => setPm25(9 + Math.floor(Math.random() * 8)), 2200);
    return () => clearInterval(id);
  }, []);
  const [hcho, setHcho] = useState("0.03");
  useEffect(() => {
    const id = setInterval(() => setHcho((0.02 + Math.random() * 0.02).toFixed(2)), 1600);
    return () => clearInterval(id);
  }, []);

  useSeo({
    title: "X70 Cast-Aluminium Robotic Security Door for Villas | WONLY",
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
              <h2>Eight Systems. <b>One Intelligent Door</b></h2>
            </div>
            <div className="bento">
              <div className="tile big">
                <LazyVideo src={media("Auto Open & Close.mp4")} poster={media("Auto Open & Close-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>Auto Open &amp; Close</h3></div>
              </div>
              <div className="tile wide">
                <LazyVideo src={media("Smart Anti-Pinch System.mp4")} poster={media("Smart Anti-Pinch System-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>Smart Anti-Pinch System</h3></div>
              </div>
              <div className="tile sm">
                <LazyVideo src={media("power supply3.mp4")} poster={media("power supply3-poster.jpg")} />
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
                  <circle className="spin" cx="60" cy="60" r="40" />
                  <circle className="arc" cx="60" cy="60" r="50" style={{ strokeDashoffset: 314 * (1 - Math.min(0.9, 0.55 + (parseFloat(hcho) - 0.02) / 0.02 * 0.3)) }} />
                </svg>
                <div className="read"><div className="n">{hcho}</div><div className="u">HCHO mg/m3</div></div>
                <div className="stat"><i />Good</div>
                <div className="pm">PM2.5 {pm25}</div>
                <div className="label"><h3>Formaldehyde Sentinel</h3></div>
              </div>
              <div className="tile wide">
                <LazyVideo src={media("Smart Perimeter Monitoring.mp4")} poster={media("Smart Perimeter Monitoring-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>Smart Perimeter Monitoring</h3></div>
              </div>
              <div className="tile wide">
                <LazyVideo src={media("Smart Voice Message2.mp4")} poster={media("Smart Voice Message2-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>Smart Voice Message</h3></div>
              </div>
              <div className="tile wide" style={{ background: "radial-gradient(120% 100% at 30% 15%, #1b1815, #0b0908)", display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
                {/* stylised on-door screen */}
                <div style={{ zIndex: 3, width: 148, height: 94, borderRadius: 10, border: "1px solid rgba(201,161,94,0.55)", background: "linear-gradient(135deg, #16130f, #262019)", boxShadow: "0 14px 34px rgba(0,0,0,0.55), inset 0 0 20px rgba(201,161,94,0.12)", padding: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ width: 24, height: 4, borderRadius: 2, background: "rgba(201,161,94,0.85)" }} />
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#5fd08a", boxShadow: "0 0 6px #5fd08a" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
                    <span style={{ height: 24, borderRadius: 4, background: "rgba(201,161,94,0.22)", border: "1px solid rgba(201,161,94,0.25)" }} />
                    <span style={{ height: 24, borderRadius: 4, background: "rgba(244,239,230,0.10)", border: "1px solid rgba(244,239,230,0.08)" }} />
                    <span style={{ height: 24, borderRadius: 4, background: "rgba(244,239,230,0.10)", border: "1px solid rgba(244,239,230,0.08)" }} />
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "rgba(244,239,230,0.16)", width: "62%" }} />
                </div>
                <div style={{ textAlign: "left", zIndex: 3, maxWidth: 220 }}>
                  <div style={{ fontSize: 46, fontWeight: 300, color: "#f4efe6", letterSpacing: "-1.5px", lineHeight: 1 }}>10.1<span style={{ fontSize: 22 }}>&quot;</span></div>
                  <div style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#C9A15E", marginTop: 8 }}>HD · Touch on Pro / Max</div>
                  <div style={{ fontSize: 11, color: "rgba(244,239,230,0.55)", marginTop: 8, lineHeight: 1.7 }}>Live door camera, visitor records and scene controls — right on the door.</div>
                </div>
                <div className="label"><h3>10.1&quot; Smart Display</h3></div>
              </div>
              </div>
              <div className="tile wide" style={{ background: "radial-gradient(120% 100% at 70% 15%, #16221c, #0b120e)", display: "flex", alignItems: "center", justifyContent: "center", gap: 26 }}>
                {/* flat-entry cross-section: door leaf, drop-seal, glide arrows over a level floor */}
                <svg viewBox="0 0 220 110" style={{ width: 180, flexShrink: 0, zIndex: 3 }} aria-hidden="true">
                  <line x1="6" y1="94" x2="214" y2="94" stroke="rgba(191,232,207,0.55)" strokeWidth="2" strokeLinecap="round" />
                  <rect x="97" y="10" width="16" height="70" rx="2" fill="rgba(244,239,230,0.14)" stroke="rgba(191,232,207,0.5)" />
                  <line x1="105" y1="60" x2="105" y2="72" stroke="#5fd08a" strokeWidth="1.5" strokeDasharray="2 3" />
                  <rect x="99" y="80" width="12" height="11" rx="1.5" fill="#5fd08a" opacity="0.85" />
                  <line x1="26" y1="87" x2="80" y2="87" stroke="#C9A15E" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="72,81 82,87 72,93" fill="none" stroke="#C9A15E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="130" y1="87" x2="184" y2="87" stroke="#C9A15E" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="176,81 186,87 176,93" fill="none" stroke="#C9A15E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ textAlign: "left", zIndex: 3, maxWidth: 200 }}>
                  <div style={{ fontSize: 13, letterSpacing: ".12em", color: "#bfe8cf" }}>No sill · auto drop-seal</div>
                  <div style={{ fontSize: 11, color: "rgba(180,225,200,0.6)", marginTop: 6, lineHeight: 1.7 }}>Sealed against wind, dust and insects — yet perfectly flat for strollers, luggage and wheelchairs.</div>
                </div>
                <div className="label"><h3>Barrier-Free Threshold</h3></div>
              </div>
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
                The X70 is WONLY's flagship robotic security door: the instant it closes, sixteen hardened bolts drive home across all four edges — mechanically, with no motor to wait on and no forgotten deadbolt: closing the door is locking it. 3D facial recognition welcomes your family hands-free, while multi-vector sensors watch the frame for any attempt to force it. Behind the aesthetics sits a cast-aluminum body with an EN 1634 fire-rated core, tested to survive 200,000 cycles and three decades of WONLY engineering.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "3D face unlock from up to 1.5 m — anti-spoofing, sub-second",
                  "16-bolt mechanical self-locking on every close — no motor",
                  "Patented cylindrical lock core — anti-drill, pick and bump",
                  "10.1\" HD display and barrier-free threshold with auto drop-seal",
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

        {/* Lock Core — the industry-exclusive cylindrical core (V8 headline proof point) */}
        <section className="mt-24 px-20">
          <div className="grid grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="rounded-2xl border-2 p-10 flex flex-col items-center justify-center" style={{ borderColor: "rgba(191,160,106,0.3)", background: "radial-gradient(120% 100% at 50% 0%, #2a2627, #0d0d0d)", minHeight: 380 }}>
                <svg width="340" height="180" viewBox="0 0 340 180" fill="none" aria-label="WONLY cylindrical lock core compared with a standard gourd cylinder">
                  <defs>
                    <linearGradient id="lc" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#3a3021" />
                      <stop offset="1" stopColor="#161311" />
                    </linearGradient>
                  </defs>
                  <g opacity="0.6">
                    <circle cx="82" cy="66" r="32" fill="#3a3633" stroke="#6b6560" strokeWidth="2" />
                    <circle cx="82" cy="106" r="19" fill="#3a3633" stroke="#6b6560" strokeWidth="2" />
                    <rect x="78" y="52" width="8" height="28" rx="4" fill="#0d0d0d" />
                    <text x="82" y="150" fill="#9a938c" fontSize="11" textAnchor="middle" fontFamily="sans-serif">Standard &quot;gourd&quot; cylinder</text>
                  </g>
                  <g>
                    <circle cx="252" cy="84" r="46" fill="url(#lc)" stroke="#BFA06A" strokeWidth="2.5" />
                    <circle cx="252" cy="84" r="30" fill="none" stroke="#BFA06A" strokeWidth="1.5" opacity="0.55" />
                    <rect x="247" y="58" width="10" height="34" rx="5" fill="#0d0d0d" />
                    <text x="252" y="150" fill="#D4C4A0" fontSize="11" textAnchor="middle" fontFamily="sans-serif">WONLY cylindrical core</text>
                  </g>
                </svg>
                <div style={{ marginTop: 22, textAlign: "center" }}>
                  <div style={{ fontSize: 54, fontWeight: 300, color: GOLD, lineHeight: 1 }}>36&times;</div>
                  <div style={{ fontSize: 10.5, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,241,234,0.6)", marginTop: 8 }}>Anti-technical-opening vs top national grade</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>The Core, Reinvented</div>
              <h2 className="text-[#221F20] text-4xl font-semibold mt-3 leading-tight">A Cylindrical Lock Core — Not the Cylinder Everyone Else Uses</h2>
              <p className="text-neutral-600 text-base mt-4 leading-relaxed">
                Almost every security door on the market — whatever the brand — is built around the same conventional figure-eight &quot;gourd&quot; cylinder: a soft brass shell, a rotating face and an exposed keyway that skilled attackers open in seconds. WONLY replaced it. Our patented cylindrical lock core is the only one of its kind in the industry, engineered so that non-destructive opening takes far longer than the highest national standard demands — and a drill will not bite into it.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Patented cylindrical core — industry-exclusive, not a re-shelled standard cylinder",
                  "Anti-technical-opening resistance exceeding the top national grade by up to 36×",
                  "Drill-, pick- and bump-resistant hardened construction",
                  "Full forced-entry and technical-opening test reports available on request",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}1a` }}>
                      <Check size={13} style={{ color: GOLD }} />
                    </span>
                    <span className="text-neutral-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
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

      <RelatedInsights />
      <CtaBand eyebrowText="Bring the X70 to Your Project" title="Get X70 Specs & Project Pricing" sub="Our engineering team replies within 24 hours with tailored specifications, compliance documentation and volume pricing for distributors and developers." />
      <SiteFooter />

    </div>
  );
};

export default SecurityDoorX70;
