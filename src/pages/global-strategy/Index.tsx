import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, SILVER, BASE, eyebrow, Reveal } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";

/* Dotted world map with breathing gold market markers (self-contained). */
function WorldDots({ className = "" }: { className?: string }) {
  const blobs = [
    { cx: 16, cy: 12, rx: 8, ry: 6 }, { cx: 23, cy: 8, rx: 7, ry: 3.5 }, { cx: 9, cy: 15, rx: 3, ry: 4 }, { cx: 12, cy: 19, rx: 3.5, ry: 3 }, { cx: 16, cy: 22, rx: 2.2, ry: 1.6 },
    { cx: 33, cy: 6, rx: 3.5, ry: 3 },
    { cx: 27, cy: 33, rx: 5, ry: 6 }, { cx: 25, cy: 41, rx: 3, ry: 5 },
    { cx: 48, cy: 11, rx: 5, ry: 4 }, { cx: 45, cy: 15, rx: 3, ry: 2.5 },
    { cx: 50, cy: 26, rx: 6, ry: 7 }, { cx: 53, cy: 33, rx: 4, ry: 4 },
    { cx: 57, cy: 20, rx: 3.5, ry: 3 },
    { cx: 70, cy: 13, rx: 14, ry: 7 }, { cx: 64, cy: 22, rx: 4, ry: 4 }, { cx: 78, cy: 20, rx: 6, ry: 4 }, { cx: 82, cy: 26, rx: 3.5, ry: 3 },
    { cx: 85, cy: 38, rx: 6, ry: 4 }, { cx: 92, cy: 43, rx: 1.6, ry: 2 },
  ];
  const inLand = (x: number, y: number) => blobs.some((b) => ((x - b.cx) / b.rx) ** 2 + ((y - b.cy) / b.ry) ** 2 <= 1);
  const dots: [number, number][] = [];
  for (let y = 2; y < 50; y += 1.3) for (let x = 1; x < 100; x += 1.3) if (inLand(x, y)) dots.push([x, y]);
  const markets: { x: number; y: number; big?: boolean }[] = [
    { x: 75, y: 16, big: true }, { x: 82, y: 15 }, { x: 80, y: 13.5 }, { x: 70, y: 12 },
    { x: 79, y: 21 }, { x: 77, y: 21.5 }, { x: 82.5, y: 23.5 }, { x: 80, y: 26.5 }, { x: 83, y: 27.5 }, { x: 80.5, y: 27.5 },
    { x: 56.5, y: 21.5 }, { x: 59, y: 22 }, { x: 58, y: 20.6 }, { x: 53.5, y: 23 }, { x: 60.5, y: 19 },
    { x: 63, y: 13 }, { x: 61, y: 15.5 },
    { x: 46, y: 21 }, { x: 48.5, y: 27 }, { x: 55, y: 26.5 }, { x: 54, y: 30.5 }, { x: 53, y: 34 }, { x: 51, y: 36 },
    { x: 48, y: 12 }, { x: 45.5, y: 13.5 }, { x: 50.5, y: 10 }, { x: 44, y: 11 },
    { x: 23, y: 7 }, { x: 27, y: 8 }, { x: 49, y: 8.5 }, { x: 58, y: 11 }, { x: 66, y: 9 }, { x: 72, y: 9.5 },
    { x: 20, y: 12, big: true }, { x: 9, y: 15 }, { x: 17, y: 11 }, { x: 15, y: 16 }, { x: 19, y: 17 }, { x: 9.5, y: 10.5 },
    { x: 19, y: 10 }, { x: 10, y: 9.5 }, { x: 14, y: 19 },
    { x: 26, y: 29 }, { x: 28, y: 33 }, { x: 30, y: 34.5 }, { x: 24.5, y: 36 }, { x: 26, y: 38 }, { x: 24, y: 42 }, { x: 26, y: 44 },
    { x: 84, y: 38 }, { x: 88, y: 39 }, { x: 92, y: 43 },
    { x: 64, y: 22 }, { x: 65, y: 24.5 }, { x: 65, y: 16.5 }, { x: 76, y: 19 }, { x: 50, y: 30 }, { x: 45, y: 24 }, { x: 48, y: 32 }, { x: 33, y: 6 },
  ];
  return (
    <svg viewBox="0 0 100 50" className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {dots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={0.42} fill={SILVER} />)}
      {markets.map((m, i) => {
        const delay = `${(i % 7) * 0.32}s`;
        return (
          <g key={`m${i}`}>
            <circle cx={m.x} cy={m.y} r={m.big ? 2.4 : 1.8} fill={GOLD} opacity={0.15} />
            <circle className="map-ping" cx={m.x} cy={m.y} r={m.big ? 1.15 : 0.85} fill="none" stroke={GOLD} strokeWidth={0.35} style={{ animationDelay: delay }} />
            <circle className="map-dot" cx={m.x} cy={m.y} r={m.big ? 1.15 : 0.85} fill={GOLD} style={{ animationDelay: delay }} />
          </g>
        );
      })}
    </svg>
  );
}

const STATS = [
  { n: "60+", l: "Countries & Regions" },
  { n: "5", l: "Production Bases" },
  { n: "6", l: "R&D Centers" },
  { n: "200M+", l: "Users Protected" },
];

const ROADMAP = [
  { n: "01", t: "Core Markets", d: "Middle East, Southeast Asia and Central Asia — our strategic entry regions, with certified products tuned to local climate and standards." },
  { n: "02", t: "Expanding Reach", d: "Radiating to Africa, Latin America and Oceania through distributor networks and landmark project references." },
  { n: "03", t: "Localized Ecosystem", d: "Regional HQs, authorized partners and local service teams bring the whole-building security ecosystem to every market." },
];

const PROJECTS = [
  { img: "gs-egypt-cbd.jpg", n: "New Administrative Capital CBD", loc: "Egypt" },
  { img: "gs-saudi-villa.jpg", n: "Jizan Industrial City Villas", loc: "Saudi Arabia" },
  { img: "gs-barbados.jpg", n: "National Grain Centre", loc: "Barbados" },
  { img: "gs-mozambique.jpg", n: "Mixed-Use Complex", loc: "Mozambique" },
];

export default function GlobalStrategy() {
  useSeo({
    title: "Global Strategy | WONLY",
    description: "2026 marks WONLY's 30th anniversary and the launch of its global development strategy — 60+ countries, five production bases, six R&D centers, and landmark projects across the Middle East, Africa and beyond.",
    path: "/global-strategy",
  });

  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="text-white px-[6vw] pt-[150px] pb-[80px]" style={{ background: "radial-gradient(120% 100% at 80% 15%, #2a2627 0%, #0d0d0d 72%)" }}>
        <Reveal className="max-w-[1200px] mx-auto">
          <div className={eyebrow} style={{ color: CHAMP }}>Global Strategy</div>
          <h1 className="mt-4 font-light leading-[1.05] tracking-[-1px] text-[clamp(34px,5vw,64px)]">A New Era, <span style={{ color: CHAMP }}>Going Global</span></h1>
          <p className="mt-5 max-w-[600px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.72)" }}>
            2026 marks WONLY's 30th anniversary — and the launch of our global development strategy, taking premium smart-security from Yongkang, Zhejiang to distributors and projects worldwide.
          </p>
        </Reveal>
      </section>

      {/* World map + stats */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[80px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal><WorldDots className="w-full h-auto" /></Reveal>
          <Reveal delay={120}>
            <div className={eyebrow} style={{ color: GOLD }}>Global Footprint</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,44px)]">We Spread <b className="font-semibold">Around the World</b></h2>
            <p className="mt-4 text-[15px] leading-[1.7] max-w-[460px]" style={{ color: MUTED }}>From Yongkang, Zhejiang to 60+ countries and regions — backed by five manufacturing bases and six R&D centers.</p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.l} className="rounded-xl p-5" style={{ background: "#efeae0" }}>
                  <div className="text-[32px] font-light leading-none" style={{ color: GOLD }}>{s.n}</div>
                  <div className="mt-2 text-[11px] tracking-[0.15em] uppercase font-medium">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Going-global roadmap */}
      <section className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
        <Reveal>
          <div className={eyebrow} style={{ color: GOLD }}>Going-Global Roadmap</div>
          <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,44px)]">Core to <b className="font-semibold">Worldwide</b></h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-9">
          {ROADMAP.map((r, i) => (
            <Reveal key={r.n} delay={i * 100}>
              <div className="h-full bg-white border rounded-2xl p-8" style={{ borderColor: "#e4ddcf" }}>
                <div className="text-[13px] font-semibold tracking-[0.14em]" style={{ color: GOLD }}>{r.n}</div>
                <h3 className="mt-3 text-[20px] font-semibold">{r.t}</h3>
                <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: MUTED }}>{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Global landmark projects */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Global Landmark Projects</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,44px)]">Trusted <b className="font-semibold">Across Borders</b></h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-9">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="group relative rounded-2xl overflow-hidden h-[300px]">
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={`${BASE}images/${p.img}`} alt={`WONLY project — ${p.n}, ${p.loc}`} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(12,10,9,0.88) 0%,rgba(12,10,9,0.15) 45%,transparent 62%)" }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-[10px] tracking-[0.16em] uppercase" style={{ color: CHAMP }}>{p.loc}</div>
                    <div className="mt-1 text-white text-[16px] font-semibold leading-tight">{p.n}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="px-[6vw] py-[90px] text-center" style={{ background: "#17140f", color: "#fff" }}>
        <Reveal className="max-w-[820px] mx-auto">
          <div className={eyebrow} style={{ color: CHAMP }}>Our Vision</div>
          <h2 className="mt-4 font-light leading-[1.15] text-[clamp(26px,3.2vw,44px)]">To Become the <b className="font-semibold" style={{ color: CHAMP }}>Global Smart-Security Ecosystem Leader</b></h2>
        </Reveal>
      </section>

      <CtaBand eyebrowText="Grow With WONLY" title="Bring WONLY to Your Market" sub="Distributors and project partners — tell us your territory and our team replies within 24 hours." />
      <SiteFooter />
    </div>
  );
}
