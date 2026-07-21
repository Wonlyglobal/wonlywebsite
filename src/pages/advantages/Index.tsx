import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, BASE, eyebrow, Reveal } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";

const DOOR = {
  img: "hero-door.png", eb: "Why WONLY Door", h: "Built to Defend, Everywhere",
  p: "A cast-aluminium body over a honeycomb steel core — engineered to resist fire, force and the harshest climates, and certified to the standards export projects demand.",
  li: [
    "EN 1634 — 90-minute fire rating",
    "Grade-A security · 16-bolt, 4-edge auto-locking",
    "Cast-aluminium body — corrosion & weather resistant",
    "Adapted to Middle East, Southeast Asia & Central Asia standards",
  ],
};

const LOCK = {
  img: "lock-s80-render.webp", eb: "Why WONLY Lock", h: "Beyond the Mechanical Lock",
  p: "Traditional locks trade convenience for security. WONLY smart locks deliver both — biometric, hands-free access with layered anti-intrusion protection, remote control and tamper alarms.",
  li: [
    "3D face · fingerprint · palm-vein · RFID · App · PIN",
    "Hands-free, no-sense unlocking as you approach",
    "Anti-technical-opening — bump & pick resistant",
    "Remote App control, pry & tamper alarms, 200,000+ cycle tested",
  ],
};

const AWARDS = [
  { f: "reddot.png", a: "Red Dot Design Award" },
  { f: "forbes.png", a: "Forbes" },
  { f: "if-design.png", a: "iF Design Award" },
  { f: "china-hardware-gold.png", a: "China Hardware Gold Award" },
];
const CERTS = ["iso", "ce", "ul", "saso", "rohs", "esg", "etl", "fsc", "iecee"];

function Split({ d, rev }: { d: typeof DOOR; rev?: boolean }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 items-center ${rev ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <Reveal className="rounded-2xl overflow-hidden h-[440px] flex items-center justify-center" style={{ background: "#eceae4" }}>
        <img className="max-h-full max-w-full object-contain p-6" src={`${BASE}images/${d.img}`} alt={d.h} loading="lazy" />
      </Reveal>
      <Reveal>
        <div className={eyebrow} style={{ color: GOLD }}>{d.eb}</div>
        <h3 className="mt-3 font-light leading-[1.1] text-[clamp(26px,3vw,40px)]">{d.h}</h3>
        <p className="mt-4 text-[15px] leading-[1.75] max-w-[480px]" style={{ color: MUTED }}>{d.p}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {d.li.map((x) => (
            <li key={x} className="text-[14.5px] pl-[24px] relative"><span style={{ position: "absolute", left: 0, color: GOLD, fontWeight: 700 }}>✓</span>{x}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export default function Advantages() {
  useSeo({
    title: "Advantages | WONLY",
    description: "Why WONLY: fire-rated cast-aluminium security doors, biometric smart locks, and 1,000+ patents — certified by ISO, CE, UL, SASO and honoured with Red Dot & iF Design awards.",
    path: "/advantages",
  });

  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="text-white px-[6vw] pt-[150px] pb-[90px]" style={{ background: "radial-gradient(120% 100% at 78% 15%, #2a2627 0%, #0d0d0d 72%)" }}>
        <Reveal className="max-w-[1200px] mx-auto">
          <div className={eyebrow} style={{ color: CHAMP }}>Advantages</div>
          <h1 className="mt-4 font-light leading-[1.05] tracking-[-1px] text-[clamp(34px,5vw,64px)]">Engineered to <span style={{ color: CHAMP }}>Outperform</span></h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.72)" }}>
            Every WONLY door and lock is built to exceed international security, fire and durability standards — and certified, tested and awarded to prove it.
          </p>
        </Reveal>
      </section>

      {/* Why Door */}
      <section id="why-wonly-door" className="scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]"><Split d={DOOR} /></div>
      </section>

      {/* Why Lock */}
      <section id="why-wonly-lock" className="bg-white scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]"><Split d={LOCK} rev /></div>
      </section>

      {/* Innovation & Certifications */}
      <section id="innovation-certifications" className="scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]">
          <Reveal className="text-center">
            <div className={eyebrow} style={{ color: GOLD }}>Innovation &amp; Certifications</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">Recognised. <b className="font-semibold">Certified. Awarded.</b></h2>
            <p className="mt-4 max-w-[560px] mx-auto text-[15px] leading-[1.7]" style={{ color: MUTED }}>Backed by 1,000+ patents, honoured by international design juries, and certified to the standards global projects require.</p>
          </Reveal>

          <Reveal className="mt-12">
            <div className="text-center text-[11px] tracking-[0.28em] uppercase font-semibold mb-6" style={{ color: MUTED }}>Design Awards</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[860px] mx-auto">
              {AWARDS.map((a) => (
                <div key={a.f} className="bg-white border rounded-xl h-[92px] flex items-center justify-center p-5" style={{ borderColor: "#e9e2d4" }}>
                  <img className="max-h-[48px] max-w-full object-contain" src={`${BASE}images/awards/${a.f}`} alt={a.a} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="text-center text-[11px] tracking-[0.28em] uppercase font-semibold mb-6" style={{ color: MUTED }}>Certifications</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 max-w-[1000px] mx-auto">
              {CERTS.map((c) => (
                <div key={c} className="bg-white border rounded-xl h-[80px] flex items-center justify-center p-4" style={{ borderColor: "#e9e2d4" }}>
                  <img className="max-h-[44px] max-w-full object-contain" src={`${BASE}images/certs/${c}.png`} alt={`${c.toUpperCase()} certification`} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand eyebrowText="See the Difference" title="Request Specs, Compliance & Test Reports" sub="Our team shares full certification documents and technical specifications within 24 hours." />
      <SiteFooter />
    </div>
  );
}
