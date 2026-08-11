import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Award, Home, Check, Wind, Wifi } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { SiteHeader, SiteFooter, CtaBand, useQuoteStore } from "@/lib/site-ui";
import { useLocale, type Locale } from "@/lib/i18n";
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

const X70_TOP: Partial<Record<Locale, Record<string, string>>> = {
  ar: { seoTitle:"باب الأمان الروبوتي X70 من الألمنيوم المصبوب للفلل | WONLY",seoDescription:"باب WONLY X70 الروبوتي الرائد: تعرف ثلاثي الأبعاد على الوجه، وقفل ذاتي بـ16 مزلاجاً، ومقاومة حريق EN 1634 لمدة 90 دقيقة وحماية فئة A.",home:"الرئيسية",doors:"أبواب الأمان",pioneer:"رائد",robotic:"باب الأمان الروبوتي",hero:"أبواب من الألمنيوم المصبوب تفتح عند اقترابك — ثلاثون عاماً من الأمان برؤية جديدة.",quote:"اطلب عرض سعر",range:"استكشف المجموعة",smart:"تقنية ذكية",six:"ستة أنظمة.",one:"باب ذكي واحد",auto:"فتح وإغلاق تلقائي",pinch:"نظام ذكي مضاد للانحشار",power:"مصدر طاقة مزدوج",good:"جيد",air:"مراقبة الفورمالديهايد",perimeter:"مراقبة ذكية للمحيط",voice:"رسالة صوتية ذكية",bolts:"مزاليج القفل",fire:"مقاومة الحريق",acoustic:"العزل الصوتي",cycle:"اختبار الدورات" },
  fr: { seoTitle:"Porte de sécurité robotisée X70 en aluminium moulé pour villas | WONLY",seoDescription:"Porte robotisée WONLY X70 : reconnaissance faciale 3D, verrouillage autonome à 16 pênes, résistance au feu EN 1634 de 90 minutes et protection classe A.",home:"Accueil",doors:"Portes de sécurité",pioneer:"Pionnier de la",robotic:"porte de sécurité robotisée",hero:"Des portes en aluminium moulé qui s’ouvrent à votre approche — 30 ans de sécurité réinventés.",quote:"Demander un devis",range:"Explorer la gamme",smart:"Technologie intelligente",six:"Six systèmes.",one:"Une porte intelligente",auto:"Ouverture et fermeture automatiques",pinch:"Système anti-pincement intelligent",power:"Double alimentation",good:"Bon",air:"Sentinelle du formaldéhyde",perimeter:"Surveillance intelligente du périmètre",voice:"Message vocal intelligent",bolts:"Pênes de verrouillage",fire:"Résistance au feu",acoustic:"Acoustique",cycle:"Essai de cycles" },
  ru: { seoTitle:"Роботизированная защитная дверь X70 из литого алюминия для вилл | WONLY",seoDescription:"Флагманская дверь WONLY X70: 3D-распознавание лица, автономное запирание на 16 ригелей, огнестойкость EN 1634 90 минут и класс защиты A.",home:"Главная",doors:"Защитные двери",pioneer:"Первопроходец",robotic:"роботизированных защитных дверей",hero:"Двери из литого алюминия открываются при приближении — 30 лет опыта безопасности в новом воплощении.",quote:"Запросить цену",range:"Смотреть серию",smart:"Умные технологии",six:"Шесть систем.",one:"Одна умная дверь",auto:"Автоматическое открытие и закрытие",pinch:"Умная защита от защемления",power:"Двойное питание",good:"Норма",air:"Контроль формальдегида",perimeter:"Умный контроль периметра",voice:"Умное голосовое сообщение",bolts:"Ригели",fire:"Огнестойкость",acoustic:"Звукоизоляция",cycle:"Циклический тест" },
  es: { seoTitle:"Puerta de seguridad robotizada X70 de aluminio fundido para villas | WONLY",seoDescription:"Puerta robotizada WONLY X70: reconocimiento facial 3D, cierre autónomo de 16 pernos, resistencia al fuego EN 1634 de 90 minutos y protección clase A.",home:"Inicio",doors:"Puertas de seguridad",pioneer:"Pionera de la",robotic:"puerta de seguridad robotizada",hero:"Puertas de aluminio fundido que se abren al acercarse: 30 años de seguridad reinventados.",quote:"Solicitar cotización",range:"Explorar la gama",smart:"Tecnología inteligente",six:"Seis sistemas.",one:"Una puerta inteligente",auto:"Apertura y cierre automáticos",pinch:"Sistema antipinzamiento inteligente",power:"Alimentación doble",good:"Bueno",air:"Monitor de formaldehído",perimeter:"Vigilancia inteligente del perímetro",voice:"Mensaje de voz inteligente",bolts:"Pernos de cierre",fire:"Resistencia al fuego",acoustic:"Acústica",cycle:"Prueba de ciclos" },
};

type X70BodyCopy = {
  text: Record<string, string>;
  overviewPoints: string[];
  corePoints: string[];
  specLabels: string[];
  variants: { tag: string; d: string }[];
  scenarios: { t: string; d: string }[];
};
const X70_BODY: Partial<Record<Locale, X70BodyCopy>> = {
  ar: {
    text: { overview:"نظرة عامة", overviewTitle:"أمان يعمل تلقائياً ويستجيب لك", overviewBody:"X70 هو باب الأمان الروبوتي الرائد من WONLY. عند إغلاقه تدخل ستة عشر مزلاجاً مقسّى في الحواف الأربع ميكانيكياً، دون انتظار محرك أو احتمال نسيان القفل. يتيح التعرف ثلاثي الأبعاد دخول الأسرة دون لمس، بينما تراقب المستشعرات متعددة الاتجاهات أي محاولة اقتحام. ويجمع الهيكل المصبوب من الألمنيوم قلباً مقاوماً للحريق وفق EN 1634 واختبار 200,000 دورة وخبرة WONLY الممتدة ثلاثين عاماً.", solutions:"اطلب الحل والسعر", download:"تنزيل ورقة المواصفات", standard:"أسطوانة تقليدية", wonlyCore:"قلب WONLY الأسطواني", anti:"مقاومة الفتح التقني مقارنة بأعلى درجة وطنية", coreEyebrow:"إعادة ابتكار القلب", coreTitle:"قلب قفل أسطواني — وليس الأسطوانة التقليدية المستخدمة لدى الجميع", coreBody:"تعتمد معظم أبواب الأمان على أسطوانة تقليدية بشكل رقم ثمانية ذات غلاف نحاسي ومجرى مفتاح مكشوف. استبدلتها WONLY بقلب أسطواني حاصل على براءة اختراع وفريد في الصناعة، صُمم لإطالة زمن الفتح غير الإتلافي بدرجة تتجاوز أعلى معيار وطني ولمقاومة الحفر.", specs:"المواصفات", specTitle:"كل معلمة موثقة", specBody:"يلبي X70 أو يتجاوز المعايير الدولية للأمان والحريق والصوتيات. تتوفر مقاسات وتشطيبات وتجهيزات مخصصة لمتطلبات المشاريع.", hurricane:"مقاوم للأعاصير", ready:"جاهز للمنزل الذكي", request:"اطلب ورقة المواصفات الكاملة", configurations:"التكوينات", choose:"اختر X70 المناسب", configBody:"تشترك ثلاثة تكوينات في القلب الروبوتي نفسه، مع خيارات التعرف على أوردة الكف أو مدخل فلل مزدوج الضلفة.", enquire:"استفسر", application:"في الاستخدام", belongs:"المكان المناسب لـ X70", ctaEye:"أدخل X70 في مشروعك", ctaTitle:"احصل على مواصفات X70 وأسعار المشاريع", ctaSub:"يرد فريقنا الهندسي خلال 24 ساعة بمواصفات مخصصة ووثائق مطابقة وأسعار كميات للموزعين والمطورين." },
    overviewPoints:["فتح بالوجه ثلاثي الأبعاد حتى 1.5 متر مع مقاومة الانتحال في أقل من ثانية","قفل ميكانيكي ذاتي بـ16 مزلاجاً عند كل إغلاق، دون محرك","قلب أسطواني حاصل على براءة اختراع ومقاوم للحفر والفتح والصدمات","شاشة HD بقياس 10.1 بوصة وعتبة سهلة المرور مع مانع تسرب هابط","سلامة حريق EN 1634 لمدة 90 دقيقة وأمان من الفئة A","تحكم كامل بالمنزل الذكي وتنبيهات العبث والدخول"],
    corePoints:["قلب أسطواني حاصل على براءة اختراع وفريد في الصناعة","مقاومة للفتح التقني تتجاوز أعلى درجة وطنية حتى 36 مرة","بنية مقسّاة مقاومة للحفر والفتح والصدمات","تقارير اختبار الاقتحام والفتح التقني متاحة عند الطلب"],
    specLabels:["الطراز","درجة الأمان","مقاومة الحريق","هيكل الباب","نقاط القفل","طرق الفتح","قلب القفل","الشاشة الذكية","كاميرا الباب","سماكة الباب","العزل الصوتي","مقاومة الرياح","الاتصال","الطاقة","اختبار الدورات","الضمان","الشهادات"],
    variants:[{tag:"الرائد",d:"الباب الروبوتي الأساسي مع فتح ثلاثي الأبعاد للوجه وقفل ذاتي بـ16 مزلاجاً وتكامل كامل للمنزل الذكي."},{tag:"متقدم",d:"يضيف التحقق بأوردة الكف وشاشة عين باب HD مدمجة وتبديلاً شبكياً مزدوجاً للمنازل عالية الأمان."},{tag:"فلل",d:"مدخل فخم مزدوج الضلفة من الألمنيوم المصبوب واستشعار ممتد وتشطيبات مخصصة لمشاريع الفلل."}],
    scenarios:[{t:"فلل تنفيذية",d:"مداخل فخمة تجمع جماليات راقية وأعلى تصنيف أمان مدني وتحكماً ذكياً متكاملاً."},{t:"شقق فاخرة",d:"دخول عائلي دون لمس وفتح عن بعد للضيوف وتنبيهات عبث للمجمعات الراقية."},{t:"مكاتب تنفيذية",d:"سجلات دخول قابلة للتدقيق وقفل مجدول وتكامل مؤسسي للمكاتب الخاصة."}]
  },
  fr: {
    text:{overview:"Présentation",overviewTitle:"Une sécurité autonome, toujours sous votre contrôle",overviewBody:"La X70 est la porte de sécurité robotisée phare de WONLY. À la fermeture, seize pênes trempés s’engagent mécaniquement sur les quatre côtés : fermer, c’est verrouiller. La reconnaissance faciale 3D accueille la famille sans contact et des capteurs multiaxes surveillent toute tentative d’effraction. Le corps en aluminium moulé intègre une âme coupe-feu EN 1634, testée sur 200 000 cycles et issue de 30 ans d’ingénierie WONLY.",solutions:"Solutions et devis",download:"Télécharger la fiche",standard:"Cylindre standard",wonlyCore:"Cœur cylindrique WONLY",anti:"Résistance à l’ouverture technique face au niveau national maximal",coreEyebrow:"Le cœur réinventé",coreTitle:"Un cœur cylindrique — pas le cylindre conventionnel des autres portes",coreBody:"La plupart des portes de sécurité utilisent le même cylindre conventionnel en huit, avec coque en laiton tendre et entrée de clé exposée. WONLY l’a remplacé par un cœur cylindrique breveté, unique dans le secteur, conçu pour résister bien au-delà de la norme nationale la plus élevée et empêcher le perçage.",specs:"Spécifications",specTitle:"Chaque paramètre est documenté",specBody:"La X70 satisfait ou dépasse les normes internationales de sécurité, de feu et d’acoustique. Dimensions, finitions et quincailleries sur mesure sont disponibles.",hurricane:"Résistance aux ouragans",ready:"Compatible maison intelligente",request:"Demander la fiche complète",configurations:"Configurations",choose:"Choisissez votre X70",configBody:"Trois configurations partagent le même cœur robotisé, jusqu’à l’authentification veineuse de la paume ou l’entrée de villa à deux vantaux.",enquire:"Nous consulter",application:"Applications",belongs:"Les environnements de la X70",ctaEye:"Intégrez la X70 à votre projet",ctaTitle:"Spécifications X70 et prix projet",ctaSub:"Notre équipe technique répond sous 24 heures avec spécifications, conformité et prix de volume pour distributeurs et promoteurs."},
    overviewPoints:["Déverrouillage facial 3D jusqu’à 1,5 m, anti-usurpation en moins d’une seconde","Auto-verrouillage mécanique à 16 pênes à chaque fermeture, sans moteur","Cœur cylindrique breveté résistant au perçage, crochetage et bumping","Écran HD 10,1 pouces et seuil accessible avec joint automatique","Intégrité feu EN 1634 de 90 minutes et sécurité classe A","Contrôle domotique complet, alertes d’accès et de sabotage"],
    corePoints:["Cœur cylindrique breveté, exclusif au secteur","Résistance à l’ouverture technique jusqu’à 36 fois supérieure au niveau national maximal","Construction trempée anti-perçage, anti-crochetage et anti-bumping","Rapports d’essai d’effraction et d’ouverture technique disponibles"],
    specLabels:["Modèle","Classe de sécurité","Résistance au feu","Corps de porte","Points de verrouillage","Méthodes d’ouverture","Cœur de serrure","Écran intelligent","Caméra de porte","Épaisseur","Acoustique","Résistance au vent","Connectivité","Alimentation","Essai de cycles","Garantie","Certifications"],
    variants:[{tag:"Phare",d:"Porte robotisée centrale avec visage 3D, auto-verrouillage à 16 pênes et intégration domotique complète."},{tag:"Avancée",d:"Ajoute l’authentification veineuse de la paume, un écran judas HD et un réseau redondant pour les résidences très sécurisées."},{tag:"Villa",d:"Grande entrée à deux vantaux en aluminium moulé, détection étendue et finitions sur mesure pour villas."}],
    scenarios:[{t:"Villas de prestige",d:"Entrées majestueuses associant esthétique, niveau maximal de sécurité civile et commande domotique."},{t:"Appartements de luxe",d:"Accès familial mains libres, ouverture distante des invités et alertes de sabotage."},{t:"Bureaux de direction",d:"Journaux auditables, verrouillage programmé et intégration d’entreprise."}]
  },
  ru: {
    text:{overview:"Обзор",overviewTitle:"Безопасность работает сама и подчиняется вам",overviewBody:"X70 — флагманская роботизированная защитная дверь WONLY. При закрытии шестнадцать закалённых ригелей механически входят в коробку со всех четырёх сторон: закрыть дверь означает запереть её. 3D-распознавание лица обеспечивает вход без рук, а многовекторные датчики контролируют попытки взлома. Литой алюминиевый корпус содержит огнестойкий сердечник EN 1634, испытанный на 200 000 циклов и созданный на основе 30 лет инженерного опыта.",solutions:"Решение и цена",download:"Скачать спецификацию",standard:"Стандартный цилиндр",wonlyCore:"Цилиндрический сердечник WONLY",anti:"Стойкость к техническому вскрытию относительно высшего национального класса",coreEyebrow:"Сердечник нового поколения",coreTitle:"Цилиндрический сердечник — не обычный цилиндр всех остальных дверей",coreBody:"Почти все защитные двери используют одинаковый цилиндр в форме восьмёрки с мягким латунным корпусом и открытой скважиной. WONLY заменил его запатентованным цилиндрическим сердечником, уникальным для отрасли, который значительно превосходит высший национальный норматив и противостоит сверлению.",specs:"Характеристики",specTitle:"Каждый параметр документирован",specBody:"X70 соответствует или превосходит международные нормы безопасности, огнестойкости и акустики. Доступны проектные размеры, отделки и фурнитура.",hurricane:"Ураганостойкость",ready:"Готов к умному дому",request:"Запросить полную спецификацию",configurations:"Конфигурации",choose:"Выберите свою X70",configBody:"Три конфигурации используют единое роботизированное ядро — вплоть до вен ладони и двустворчатого входа для виллы.",enquire:"Запросить",application:"Применение",belongs:"Где устанавливают X70",ctaEye:"Добавьте X70 в свой проект",ctaTitle:"Спецификации X70 и проектная цена",ctaSub:"Инженеры ответят в течение 24 часов и подготовят параметры, документы соответствия и оптовые цены для дистрибьюторов и застройщиков."},
    overviewPoints:["3D-распознавание лица до 1,5 м с защитой от подделки менее чем за секунду","Механическое автозапирание на 16 ригелей при каждом закрытии, без мотора","Запатентованный цилиндрический сердечник против сверления, отмычек и бампинга","HD-экран 10,1 дюйма и безбарьерный порог с автоматическим уплотнителем","Огнестойкость EN 1634 90 минут и класс безопасности A","Полное управление умным домом и уведомления о доступе и вмешательстве"],
    corePoints:["Запатентованный цилиндрический сердечник, уникальный для отрасли","Стойкость к техническому вскрытию до 36 раз выше высшего национального класса","Закалённая конструкция против сверления, отмычек и бампинга","Отчёты испытаний на силовой взлом и техническое вскрытие по запросу"],
    specLabels:["Модель","Класс безопасности","Огнестойкость","Полотно двери","Точки запирания","Способы открытия","Сердечник замка","Умный дисплей","Камера","Толщина двери","Звукоизоляция","Ветровая нагрузка","Связь","Питание","Циклический тест","Гарантия","Сертификаты"],
    variants:[{tag:"Флагман",d:"Основная роботизированная дверь с 3D-лицом, 16 ригелями и полной интеграцией с умным домом."},{tag:"Расширенная",d:"Распознавание вен ладони, встроенный HD-видеоглазок и резервирование сети для домов с повышенной защитой."},{tag:"Вилла",d:"Двустворчатый вход из литого алюминия, увеличенная дальность датчиков и индивидуальные отделки."}],
    scenarios:[{t:"Премиальные виллы",d:"Парадные входы сочетают эстетику усадьбы, высший гражданский класс защиты и умное управление."},{t:"Элитные квартиры",d:"Семейный вход без рук, удалённый доступ гостей и сигналы вмешательства."},{t:"Офисы руководителей",d:"Журналы для аудита, запирание по расписанию и корпоративная интеграция."}]
  },
  es: {
    text:{overview:"Descripción",overviewTitle:"Seguridad autónoma que responde ante usted",overviewBody:"La X70 es la puerta de seguridad robotizada insignia de WONLY. Al cerrarse, dieciséis pernos endurecidos se insertan mecánicamente en los cuatro bordes: cerrar es bloquear. El reconocimiento facial 3D recibe a la familia sin manos y los sensores multivector vigilan cualquier intento de fuerza. El cuerpo de aluminio fundido integra un núcleo cortafuego EN 1634, probado durante 200.000 ciclos y respaldado por 30 años de ingeniería.",solutions:"Soluciones y cotización",download:"Descargar ficha",standard:"Cilindro estándar",wonlyCore:"Núcleo cilíndrico WONLY",anti:"Resistencia a apertura técnica frente al grado nacional superior",coreEyebrow:"El núcleo reinventado",coreTitle:"Un núcleo cilíndrico, no el cilindro convencional de los demás",coreBody:"Casi todas las puertas de seguridad utilizan el mismo cilindro convencional en forma de ocho, con carcasa de latón blando y bocallave expuesto. WONLY lo sustituyó por un núcleo cilíndrico patentado, único en el sector, diseñado para superar ampliamente la norma nacional más alta y resistir la perforación.",specs:"Especificaciones",specTitle:"Cada parámetro, documentado",specBody:"La X70 cumple o supera normas internacionales de seguridad, fuego y acústica. Hay tamaños, acabados y herrajes personalizados para proyectos.",hurricane:"Resistente a huracanes",ready:"Preparada para hogar inteligente",request:"Solicitar ficha completa",configurations:"Configuraciones",choose:"Elija su X70",configBody:"Tres configuraciones comparten el núcleo robotizado, con opciones de vena de la palma o entrada de villa de doble hoja.",enquire:"Consultar",application:"Aplicaciones",belongs:"Dónde encaja la X70",ctaEye:"Incorpore la X70 a su proyecto",ctaTitle:"Especificaciones X70 y precios de proyecto",ctaSub:"Nuestro equipo técnico responde en 24 horas con especificaciones, conformidad y precios por volumen para distribuidores y promotores."},
    overviewPoints:["Rostro 3D hasta 1,5 m con protección anti-suplantación en menos de un segundo","Cierre mecánico automático de 16 pernos en cada cierre, sin motor","Núcleo cilíndrico patentado contra perforación, ganzúa y bumping","Pantalla HD de 10,1 pulgadas y umbral accesible con sello automático","Integridad al fuego EN 1634 de 90 minutos y seguridad clase A","Control integral del hogar inteligente y alertas de acceso y sabotaje"],
    corePoints:["Núcleo cilíndrico patentado y exclusivo del sector","Resistencia a apertura técnica hasta 36 veces superior al grado nacional máximo","Construcción endurecida contra perforación, ganzúa y bumping","Informes de entrada forzada y apertura técnica disponibles"],
    specLabels:["Modelo","Grado de seguridad","Resistencia al fuego","Cuerpo de puerta","Puntos de cierre","Métodos de apertura","Núcleo de cerradura","Pantalla inteligente","Cámara de puerta","Espesor","Clasificación acústica","Resistencia al viento","Conectividad","Alimentación","Prueba de ciclos","Garantía","Certificaciones"],
    variants:[{tag:"Insignia",d:"Puerta robotizada central con rostro 3D, cierre automático de 16 pernos e integración total del hogar inteligente."},{tag:"Avanzada",d:"Añade vena de la palma, pantalla HD de mirilla y red redundante para viviendas de alta seguridad."},{tag:"Villa",d:"Entrada de doble hoja en aluminio fundido, detección ampliada y acabados personalizados para villas."}],
    scenarios:[{t:"Villas ejecutivas",d:"Grandes entradas con estética de finca, máxima seguridad civil y control inteligente integral."},{t:"Apartamentos de lujo",d:"Acceso familiar sin manos, apertura remota para invitados y alertas de sabotaje."},{t:"Oficinas ejecutivas",d:"Registros auditables, cierre programado e integración empresarial."}]
  }
};

const SecurityDoorX70 = () => {
  const { locale } = useLocale();
  const tx = (key: string, fallback: string) => X70_TOP[locale]?.[key] ?? fallback;
  const body = X70_BODY[locale];
  const bt = (key: string, fallback: string) => body?.text[key] ?? fallback;
  const overviewPoints = body?.overviewPoints ?? [
    "3D face unlock from up to 1.5 m — anti-spoofing, sub-second", "16-bolt mechanical self-locking on every close — no motor", "Patented cylindrical lock core — anti-drill, pick and bump", "10.1\" HD display and barrier-free threshold with auto drop-seal", "EN 1634 90-minute fire integrity · Class A security", "Full smart-home control with tamper and access alerts",
  ];
  const corePoints = body?.corePoints ?? [
    "Patented cylindrical core — industry-exclusive, not a re-shelled standard cylinder", "Anti-technical-opening resistance exceeding the top national grade by up to 36×", "Drill-, pick- and bump-resistant hardened construction", "Full forced-entry and technical-opening test reports available on request",
  ];
  const specs = SPECS.map((item, i) => ({ ...item, label: body?.specLabels[i] ?? item.label }));
  const variants = VARIANTS.map((item, i) => ({ ...item, ...body?.variants[i] }));
  const scenarios = SCENARIOS.map((item, i) => ({ ...item, ...body?.scenarios[i] }));
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
    title: tx("seoTitle", "X70 Cast-Aluminium Robotic Security Door for Villas | WONLY"),
    description: tx("seoDescription", "The WONLY X70 flagship robotic security door: 3D facial recognition, 16-bolt autonomous locking, EN 1634 90-minute fire rating, and Class A protection for villas and premium homes."),
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
                <li><Link to="/" className="flex items-center gap-1 hover:text-[#BFA06A] transition-colors"><Home size={13} /> {tx("home", "Home")}</Link></li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li><Link to="/products/security-doors" className="hover:text-[#BFA06A] transition-colors">{tx("doors", "Security Doors")}</Link></li>
                <li aria-hidden="true"><ChevronRight size={13} /></li>
                <li aria-current="page" className="font-semibold" style={{ color: GOLD }}>X70</li>
              </ol>
            </nav>
              <h1>{tx("pioneer", "Pioneer of the")}<br /><b>{tx("robotic", "Robotic Security Door")}</b></h1>
              <p className="sub">{tx("hero", "Cast-aluminium doors that open as you approach — 30 years of security, reimagined.")}</p>
              <div className="cta">
                <a className="btn solid" onClick={() => openQuote({ subject: "X70 Robotic Security Door" })}>{tx("quote", "Get a Quote")} &rarr;</a>
                <a className="btn line" href="#configurations">{tx("range", "Explore the Range")}</a>
              </div>
            </div>
          </section>

          {/* SECTION 2: SMART FEATURES */}
          <section className="feat" id="features">
            <div className="fhead">
              <div className="eyebrow">{tx("smart", "Smart Technology")}</div>
              <h2>{tx("six", "Six Systems.")} <b>{tx("one", "One Intelligent Door")}</b></h2>
            </div>
            <div className="bento">
              <div className="tile big">
                <LazyVideo src={media("Auto Open & Close.mp4")} poster={media("Auto Open & Close-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>{tx("auto", "Auto Open & Close")}</h3></div>
              </div>
              <div className="tile wide">
                <LazyVideo src={media("Smart Anti-Pinch System.mp4")} poster={media("Smart Anti-Pinch System-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>{tx("pinch", "Smart Anti-Pinch System")}</h3></div>
              </div>
              <div className="tile sm">
                <LazyVideo src={media("power supply3.mp4")} poster={media("power supply3-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>{tx("power", "Dual Power Supply")}</h3></div>
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
                <div className="stat"><i />{tx("good", "Good")}</div>
                <div className="pm">PM2.5 {pm25}</div>
                <div className="label"><h3>{tx("air", "Formaldehyde Sentinel")}</h3></div>
              </div>
              <div className="tile wide">
                <LazyVideo src={media("Smart Perimeter Monitoring.mp4")} poster={media("Smart Perimeter Monitoring-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>{tx("perimeter", "Smart Perimeter Monitoring")}</h3></div>
              </div>
              <div className="tile wide">
                <LazyVideo src={media("Smart Voice Message2.mp4")} poster={media("Smart Voice Message2-poster.jpg")} />
                <div className="scrim" />
                <div className="label"><h3>{tx("voice", "Smart Voice Message")}</h3></div>
              </div>
            </div>
          </section>
        </div>

        {/* Breadcrumb + key figures — the strip the old hero used to carry. */}
        <section className="px-20 py-8 border-b border-gray-100">
          <div className="mt-6 flex items-center justify-center gap-16">
            {[
              { v: <Counter to={16} />, l: tx("bolts", "Locking Bolts") },
              { v: <Counter to={90} suffix=" min" />, l: tx("fire", "Fire Rating") },
              { v: <Counter to={38} suffix=" STC" />, l: tx("acoustic", "Acoustic") },
              { v: <Counter to={200} suffix="K+" />, l: tx("cycle", "Cycle Test") },
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
              <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>{bt("overview", "Overview")}</div>
              <h2 className="text-[#221F20] text-4xl font-semibold mt-3 leading-tight">{bt("overviewTitle", "Security That Runs Itself — And Answers To You")}</h2>
              <p className="text-neutral-600 text-base mt-4 leading-relaxed">
                {bt("overviewBody", "The X70 is WONLY's flagship robotic security door: the instant it closes, sixteen hardened bolts drive home across all four edges — mechanically, with no motor to wait on and no forgotten deadbolt: closing the door is locking it. 3D facial recognition welcomes your family hands-free, while multi-vector sensors watch the frame for any attempt to force it. Behind the aesthetics sits a cast-aluminum body with an EN 1634 fire-rated core, tested to survive 200,000 cycles and three decades of WONLY engineering.")}
              </p>
              <ul className="mt-6 space-y-3">
                {overviewPoints.map((point) => (
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
                  <span className="text-[#221F20] text-sm font-semibold">{bt("solutions", "Get Solutions & Quote")}</span><ArrowRight className="text-[#221F20]" size={16} />
                </button>
                <button className="px-6 py-3 rounded-full border text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all" style={{ borderColor: GOLD, color: GOLD }}>
                  {bt("download", "Download Spec Sheet")}
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
                    <text x="82" y="150" fill="#9a938c" fontSize="11" textAnchor="middle" fontFamily="sans-serif">{bt("standard", "Standard cylinder")}</text>
                  </g>
                  <g>
                    <circle cx="252" cy="84" r="46" fill="url(#lc)" stroke="#BFA06A" strokeWidth="2.5" />
                    <circle cx="252" cy="84" r="30" fill="none" stroke="#BFA06A" strokeWidth="1.5" opacity="0.55" />
                    <rect x="247" y="58" width="10" height="34" rx="5" fill="#0d0d0d" />
                    <text x="252" y="150" fill="#D4C4A0" fontSize="11" textAnchor="middle" fontFamily="sans-serif">{bt("wonlyCore", "WONLY cylindrical core")}</text>
                  </g>
                </svg>
                <div style={{ marginTop: 22, textAlign: "center" }}>
                  <div style={{ fontSize: 54, fontWeight: 300, color: GOLD, lineHeight: 1 }}>36&times;</div>
                  <div style={{ fontSize: 10.5, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,241,234,0.6)", marginTop: 8 }}>{bt("anti", "Anti-technical-opening vs top national grade")}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>{bt("coreEyebrow", "The Core, Reinvented")}</div>
              <h2 className="text-[#221F20] text-4xl font-semibold mt-3 leading-tight">{bt("coreTitle", "A Cylindrical Lock Core — Not the Cylinder Everyone Else Uses")}</h2>
              <p className="text-neutral-600 text-base mt-4 leading-relaxed">
                {bt("coreBody", "Almost every security door on the market is built around the same conventional figure-eight cylinder. WONLY replaced it with a patented cylindrical lock core engineered to exceed the highest national standard and resist drilling.")}
              </p>
              <ul className="mt-6 space-y-3">
                {corePoints.map((point) => (
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
              <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>{bt("specs", "Specifications")}</div>
              <h2 className="text-[#221F20] text-5xl font-semibold mt-3">{bt("specTitle", "Every Parameter, Documented")}</h2>
              <p className="text-neutral-500 text-base mt-3">{bt("specBody", "The X70 meets or exceeds international security, fire, and acoustic standards. Custom sizes, finishes, and hardware are available for project-specific requirements.")}</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { icon: Wind, l: bt("hurricane", "Hurricane-rated") },
                  { icon: Wifi, l: bt("ready", "Smart-home ready") },
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
                  <span className="text-[#221F20] text-sm font-semibold">{bt("request", "Request Full Spec Sheet")}</span><ArrowRight className="text-[#221F20]" size={16} />
                </button>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="rounded-2xl overflow-hidden border-2" style={{ borderColor: "rgba(191,160,106,0.3)" }}>
                {specs.map((s, i) => (
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
            <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>{bt("configurations", "Configurations")}</div>
            <h2 className="text-[#221F20] text-5xl font-semibold mt-3">{bt("choose", "Choose Your X70")}</h2>
            <p className="text-neutral-500 text-base mt-3 max-w-2xl mx-auto">{bt("configBody", "Three configurations share the same robotic core — scale up to palm-vein security or a double-leaf villa entrance.")}</p>
          </Reveal>
          <div className="grid grid-cols-3 gap-6">
            {variants.map((v, i) => (
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
                    {bt("enquire", "Enquire")} <ArrowRight size={14} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* In application */}
        <section className="mt-24 pb-28 px-20">
          <Reveal className="text-center mb-10">
            <div className="text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: GOLD }}>{bt("application", "In Application")}</div>
            <h2 className="text-[#221F20] text-5xl font-semibold mt-3">{bt("belongs", "Where The X70 Belongs")}</h2>
          </Reveal>
          <div className="grid grid-cols-3 gap-6">
            {scenarios.map((s, i) => (
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
      <CtaBand eyebrowText={bt("ctaEye", "Bring the X70 to Your Project")} title={bt("ctaTitle", "Get X70 Specs & Project Pricing")} sub={bt("ctaSub", "Our engineering team replies within 24 hours with tailored specifications, compliance documentation and volume pricing for distributors and developers.")} />
      <SiteFooter />

    </div>
  );
};

export default SecurityDoorX70;
