import { useEffect, useState } from "react";
import { BASE, SiteHeader, SiteFooter, useQuoteStore } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";

// Local media, referenced via Vite's BASE_URL so paths resolve on both the root
// domain and a GitHub Pages project sub-path. encodeURI keeps the spaces (and the
// "&" in "Auto Open & Close.mp4") valid inside the directory name once deployed.
const media = (file: string) => encodeURI(`${BASE}images/door/selling point/${file}`);

const BANNER = `${BASE}images/door/door-banner6-1920x1000.jpg`;

// Pixel replica of public/_agent/metal-door-reference.html — the reference class
// names are preserved verbatim but scoped under `.md-root` so they never collide
// with Tailwind's global styles. Keyframes are renamed (md-fill / md-pulse) for the
// same reason.
const CSS = `
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

export default function MetalDoor() {
  useSeo({
    title: "Metal Door — Robotic Cast-Aluminium Security Door | WONLY",
    description:
      "WONLY cast-aluminium metal doors that open as you approach — six intelligent systems in one robotic security door: auto open & close, anti-pinch, dual power, perimeter monitoring, voice message and a formaldehyde sentinel.",
    path: "/products/door/metal-door",
    type: "product",
  });
  const openQuote = useQuoteStore((s) => s.openQuote);

  // HCHO live read-out: replicates the reference's setInterval, cleaned up on unmount.
  const [hcho, setHcho] = useState("0.03");
  useEffect(() => {
    const id = setInterval(() => setHcho((0.02 + Math.random() * 0.02).toFixed(2)), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="md-root">
      <style>{CSS}</style>
      <SiteHeader />

      {/* SECTION 1: BANNER */}
      <section className="hero">
        <img className="bg" src={BANNER} alt="WONLY metal door" />
        <div className="tx">
          <div className="eyebrow">WONLY · Metal Door</div>
          <h1>Pioneer of the<br /><b>Robotic Security Door</b></h1>
          <p className="sub">Cast-aluminium doors that open as you approach — 30 years of security, reimagined.</p>
          <div className="cta">
            <a className="btn solid" onClick={() => openQuote()}>Get a Quote &rarr;</a>
            <a className="btn line" href="#features">Explore the Range</a>
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
            <video ref={forceMute} src={media("Smart Voice Message.mp4")} autoPlay muted loop playsInline preload="metadata" />
            <div className="scrim" />
            <div className="label"><h3>Smart Voice Message</h3></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
