import { ArrowRight } from "lucide-react";
import { useSeo } from "@/lib/seo";
import { GOLD, GOLD_DEEP, CHAMP, CHAMP_BG, DARK, MUTED, SILVER, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand, useQuoteStore } from "@/lib/site-ui";

const PROJECTS = [
  { name: "New Administrative Capital CBD", place: "Cairo, Egypt", tag: "Government", img: `${BASE}images/proj-egypt-cbd.webp` },
  { name: "National Food Centre", place: "Barbados", tag: "Government", img: `${BASE}images/proj-barbados.webp` },
  { name: "New Capital Arc Landmark", place: "Cairo, Egypt", tag: "Landmark", img: `${BASE}images/proj-cairo-hotel.webp` },
  { name: "Jazan Industrial City", place: "Saudi Arabia", tag: "Industrial", img: `${BASE}images/proj-saudi-villa.webp` },
  { name: "Mixed-Use Complex", place: "Mozambique · 35,000 m²", tag: "Commercial", img: `${BASE}images/proj-s-7.webp` },
  { name: "Convention & Expo Center", place: "Asia-Pacific", tag: "Commercial", img: `${BASE}images/proj-1.webp` },
  { name: "International Airport", place: "Aviation Hub", tag: "Infrastructure", img: `${BASE}images/landmark-daxing.webp` },
  { name: "Olympic Sports Center", place: "Stadium & Arena", tag: "Public", img: `${BASE}images/landmark-asiangames.webp` },
  { name: "Metropolitan Residential", place: "Smart Community", tag: "Residential", img: `${BASE}images/landmark-metro.webp` },
];

const STATS = [
  { v: "60+", label: "Countries & Regions" },
  { v: "600+", label: "International Projects" },
  { v: "2010", label: "Overseas Since" },
  { v: "200M+", label: "Users Protected" },
];

export default function Projects() {
  useSeo({
    title: "Global Landmark Projects — Government & Institutional References | WONLY",
    description: "WONLY security doors, smart locks and windows are specified across 60+ countries — from sovereign capital districts and national institutions to airports, stadiums and landmark residential developments.",
    path: "/projects",
    type: "website",
  });
  const openQuote = useQuoteStore((s) => s.openQuote);
  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[74vh] min-h-[480px] w-full overflow-hidden flex items-center" style={{ background: "#0d0d0d" }}>
        <img src={`${BASE}images/proj-egypt-cbd.webp`} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.55) 60%, rgba(13,13,13,0.3) 100%)" }} />
        <div className="relative z-10 px-[7vw] max-w-3xl">
          <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>Global Landmark Projects</div>
          <h1 className="font-light uppercase text-white leading-[1.08] tracking-[0.05em] text-[40px] md:text-[70px]">Trusted where failure<br /><span style={{ color: CHAMP }}>isn't an option</span></h1>
          <p className="mt-7 max-w-lg text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>From sovereign capital districts to national institutions, WONLY is specified across 60+ countries where security, fire performance and reliability cannot fail.</p>
          <button onClick={() => openQuote()} className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Discuss Your Project <ArrowRight size={15} /></button>
        </div>
      </section>

      {/* Stats */}
      <section className="px-[7vw] py-14 md:py-16" style={{ background: "#fff" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="text-4xl md:text-5xl font-light leading-none" style={{ color: GOLD }}>{s.v}</div>
              <div className="mt-2 text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: DARK }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-[7vw] py-20 md:py-28" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD_DEEP }}>Selected References</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Specified Across 60+ Countries</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 80}>
              <div className="group relative rounded-2xl overflow-hidden h-[280px]">
                <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 42%, rgba(13,13,13,0.88))" }} />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: GOLD, color: DARK }}>{p.tag}</div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-white text-lg md:text-xl font-medium leading-tight">{p.name}</div>
                  <div className="mt-1 text-[11px] tracking-[0.16em] uppercase" style={{ color: CHAMP }}>{p.place}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm font-light" style={{ color: MUTED }}>Further references include Ethiopia's Abyssinia Bank and presidential-palace projects in Togo and Vanuatu — alongside distributors and installations across the Middle East, Southeast Asia, Central Asia, Africa and the Americas.</p>
      </section>

      {/* Sectors */}
      <section className="px-[7vw] py-20 md:py-28" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD_DEEP }}>Where We Deliver</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Built For Every Project Type</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t" style={{ borderColor: `${SILVER}66` }}>
          {[
            ["Government & Institutional", "Capital districts, ministries, banks and national institutions where compliance and reliability are mandatory."],
            ["Hospitality & Landmark", "Hotels, arenas, airports and signature towers that demand design and performance in equal measure."],
            ["Residential Developments", "Villas, gated communities and high-rise housing with whole-house smart-security integration."],
            ["Industrial & Public", "Industrial cities, hospitals and public facilities engineered for fire, access-control and durability."],
          ].map(([t, d]) => (
            <Reveal key={t}>
              <div className="py-7 border-b" style={{ borderColor: `${SILVER}44` }}>
                <h3 className="text-xl font-light" style={{ color: DARK }}>{t}</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand eyebrowText="Global Projects" title="Have A Project In Mind?" sub="Tell us your territory or specification — our team replies within 24 hours with references, compliance docs and pricing." />
      <SiteFooter />
    </div>
  );
}
