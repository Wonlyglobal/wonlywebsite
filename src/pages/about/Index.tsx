import { Cpu, FlaskConical, Lightbulb, Target, Eye, BadgeCheck, Layers, MapPin, HeartHandshake, Gem, Handshake } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { GOLD, CHAMP, SILVER, CHAMP_BG, DARK, MUTED, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand } from "@/lib/site-ui";

const IMG = {
  hero: `${BASE}images/factory-line-a.webp`,
  factoryB: `${BASE}images/factory-line-b.webp`,
  robot: `${BASE}images/factory-abb.webp`,
  door: `${BASE}images/alu-k300pro.webp`,
  lock: `${BASE}images/lock-s80.webp`,
  wood: `${BASE}images/wood-2.webp`,
  window: `${BASE}images/alu-t200.webp`,
  g20: `${BASE}images/proj-1.webp`,
  egypt: `${BASE}images/proj-2.webp`,
  daxing: `${BASE}images/landmark-daxing.webp`,
  asianGames: `${BASE}images/landmark-asiangames.webp`,
  tianjin: `${BASE}images/proj-s-5.webp`,
  govHousing: `${BASE}images/landmark-govhousing.webp`,
};

const STATS = [
  { v: "30", s: "yrs", label: "Since 1996" },
  { v: "200M", s: "+", label: "Users Protected" },
  { v: "50M", s: "+", label: "Families Served" },
  { v: "No.1", s: "", label: "Brand Value · 14 yrs" },
];

const ECOSYSTEM = [
  { img: IMG.door, name: "Security Doors", d: "Cast-aluminum and robotic anti-theft doors that defeat forced entry while meeting global fire and acoustic codes." },
  { img: IMG.lock, name: "Smart Locks", d: "True-sensing, face-recognition and app-controlled locks — the intelligent layer of the modern entrance." },
  { img: IMG.wood, name: "Wooden & Medical Doors", d: "Steel-wood anti-warp silent doors and hermetic medical doors — craftsmanship meets engineered stability." },
  { img: IMG.window, name: "Windows & Whole-House", d: "Smart aluminum windows and a 28-category whole-house intelligence ecosystem that ties the building together." },
];

const RD = [
  { icon: FlaskConical, t: "5 R&D Bases · 6 Centers", d: "Yongkang, Hangzhou, Shenzhen, Shanghai and Munich — a 400+ engineer team investing ¥80M+ each year, including a joint lab with Peking University." },
  { icon: Lightbulb, t: "1,000+ Patents", d: "Over 1,000 national patents and 300+ invention patents — more than the rest of the industry's top ten combined; co-author of ~100 national and industry standards." },
  { icon: Cpu, t: "National 5G Future Factory", d: "The sector's only state-recognised 5G smart factory — robotic lines with automotive-grade coating precision to 1/10 of a human hair." },
  { icon: Layers, t: "Five Manufacturing Bases", d: "Yongkang, Wuyi, Sichuan, Hangzhou and Hubei (under construction) — 3M smart locks, 3M wooden doors and 6M steel doors a year." },
];

const STORY = [
  { y: "1996", m: "WONLY is founded in Yongkang, Zhejiang — a singular focus on entrance security begins." },
  { y: "2003", m: "Wins the 'Challenge the Lock-Picking Champion' — its locks remain unopened 20+ years on." },
  { y: "2005", m: "Named a China Well-Known Trademark — the sector's only dual commercial + judicial recognition." },
  { y: "2021", m: "Lists on the Shanghai Stock Exchange (605268) — the industry's only main-board company." },
  { y: "2024", m: "Opens the sector's only national-level 5G future factory." },
  { y: "2026", m: "Launches global expansion — the first year of the going-global strategy." },
];

const LANDMARKS = [
  { img: IMG.g20, name: "G20 Summit Venue", place: "Hangzhou, China" },
  { img: IMG.asianGames, name: "Hangzhou Asian Games", place: "Hangzhou, China" },
  { img: IMG.daxing, name: "Beijing Daxing Int'l Airport", place: "Beijing, China" },
  { img: IMG.egypt, name: "New Administrative Capital CBD", place: "Cairo, Egypt" },
  { img: IMG.tianjin, name: "National Games Village", place: "Tianjin, China" },
  { img: IMG.govHousing, name: "Central Ministry Residences", place: "Beijing, China" },
];

const CERTS = ["ISO 9001", "ISO 14001", "CE", "UL", "EN 1634 Fire", "RoHS", "ETL", "IECEE", "SASO", "FSC"];
const HONORS = [
  "Red Dot Best of the Best",
  "iF Product Design Award",
  "Forbes Design Leader Brand",
  "China Well-Known Trademark (dual-certified)",
  "National Quality Benchmark Enterprise",
  "TOP500 Preferred Supplier — 12 consecutive years",
];
const VALUES = [
  { icon: HeartHandshake, t: "Integrity & Gratitude", d: "We keep our word — to customers, partners and each other — and never forget who put their trust in us." },
  { icon: Gem, t: "Humility & Respect", d: "We respect the craft, the standards and the responsibility that comes with protecting people's homes." },
  { icon: Target, t: "Diligence & Accountability", d: "We push quality relentlessly forward and own every outcome, from the factory floor to the front door." },
  { icon: Handshake, t: "Win-Win Cooperation", d: "We grow by making our partners successful — profitable, protected and supported for the long term." },
];

const About = () => {
  useSeo({
    title: "About WONLY | China's No.1 Security Door & Smart Lock Brand (SSE: 605268)",
    description:
      "WONLY (SSE: 605268) — the industry's only A-share main-board listed door & lock maker, brand value No.1 for 14 years. Founded 1996: 5 bases, 6 R&D centers, 1,000+ patents, 200M+ users across 60+ countries.",
    path: "/about",
    type: "website",
    jsonLd: { "@context": "https://schema.org", "@type": "AboutPage", name: "About WONLY", url: SITE_URL + "/about" },
  });

  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[82vh] min-h-[520px] w-full overflow-hidden flex items-center" style={{ background: "#0d0d0d" }}>
        <img src={IMG.hero} alt="WONLY smart factory production line" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.45) 60%, rgba(13,13,13,0.2) 100%)" }} />
        <div className="relative z-10 px-[7vw] max-w-3xl">
          <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>About WONLY</div>
          <h1 className="font-light uppercase text-white leading-[1.08] tracking-[0.06em] text-[40px] md:text-[74px]">Securing the world's<br /><span style={{ color: CHAMP }}>front doors</span></h1>
          <p className="mt-7 max-w-lg text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>For 30 years we have engineered the moment a door opens into something safe, effortless and intelligent.</p>
        </div>
      </section>

      {/* Heritage + stats */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Who We Are</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>China's No.1 in entrance security.</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              WONLY is a high-tech security group that unites R&amp;D, design, manufacturing, sales and service under one roof. Founded in 1996 in Yongkang — China's "hardware capital" — it is today the industry's <strong style={{ color: DARK, fontWeight: 500 }}>only company listed on China's A-share main board</strong> (SSE: 605268), with a brand value ranked first in its sector for 14 consecutive years.
            </p>
            <p className="mt-4 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              That focus protects more than 200 million users and 50 million families — and now reaches homes, banks, hospitals and landmark projects across four continents.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl p-6" style={{ background: "#f7f7f5", border: `1px solid ${SILVER}44` }}>
                  <div className="font-light leading-none whitespace-nowrap" style={{ color: GOLD }}>
                    <span className="text-[32px] md:text-[40px]">{s.v}</span><span className="text-lg ml-0.5">{s.s}</span>
                  </div>
                  <div className="mt-3 text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: DARK }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: DARK }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <div className="flex items-center gap-2.5 mb-5"><Target size={18} style={{ color: GOLD }} /><span className={eyebrow} style={{ color: CHAMP }}>Mission</span></div>
            <h3 className="text-2xl md:text-4xl font-light leading-[1.15] text-white">Let families around the world enjoy a safe, smart and better life.</h3>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-2.5 mb-5"><Eye size={18} style={{ color: GOLD }} /><span className={eyebrow} style={{ color: CHAMP }}>Vision</span></div>
            <h3 className="text-2xl md:text-4xl font-light leading-[1.15] text-white">Become the leader of the global smart-security ecosystem.</h3>
          </Reveal>
        </div>
        {/* Ecosystem */}
        <div className="mt-16 md:mt-20">
          <Reveal><div className={eyebrow + " mb-8"} style={{ color: CHAMP }}>One Ecosystem · Seven Categories</div></Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {ECOSYSTEM.map((e, i) => (
              <Reveal key={e.name} delay={(i % 4) * 80}>
                <div className="group rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="h-40 overflow-hidden" style={{ background: "#15100f" }}>
                    <img src={e.img} alt={e.name} loading="lazy" className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-medium text-white">{e.name}</h4>
                    <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: "rgba(245,241,234,0.65)" }}>{e.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* R&D + Smart Manufacturing */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[320px] md:h-[440px] rounded-2xl overflow-hidden">
              <img src={IMG.factoryB} alt="WONLY press line" loading="lazy" className="row-span-2 w-full h-full object-cover" />
              <img src={IMG.robot} alt="WONLY robotic automation" loading="lazy" className="w-full h-full object-cover" />
              <img src={IMG.hero} alt="WONLY branded stamping line" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className={eyebrow} style={{ color: GOLD }}>R&amp;D &amp; Smart Manufacturing</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Patents no rival can match.</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              Security you can trust has to be engineered and proven — not just designed. WONLY controls the entire chain, from casting aluminum to writing lock firmware, and holds a patent portfolio larger than the rest of the industry's top ten combined.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RD.map((r) => (
                <div key={r.t} className="rounded-2xl p-5" style={{ background: "#f7f7f5", border: `1px solid ${SILVER}44` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: GOLD }}><r.icon size={18} style={{ color: "#fff" }} /></div>
                  <h4 className="mt-4 text-base font-medium" style={{ color: DARK }}>{r.t}</h4>
                  <p className="mt-1.5 text-[13px] font-normal leading-relaxed" style={{ color: MUTED }}>{r.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story timeline */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Milestones</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Thirty years, one direction.</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8">
          {STORY.map((t, i) => (
            <Reveal key={t.y} delay={(i % 3) * 90}>
              <div className="relative pt-8 border-t-2" style={{ borderColor: GOLD }}>
                <div className="text-3xl md:text-4xl font-light" style={{ color: DARK }}>{t.y}</div>
                <p className="mt-3 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{t.m}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Global footprint + landmark projects */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal className="max-w-2xl">
            <div className={eyebrow} style={{ color: GOLD }}>Global Footprint</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Chosen for the projects that cannot fail.</h2>
          </Reveal>
          <Reveal>
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: MUTED }}><MapPin size={16} style={{ color: GOLD }} /> Overseas since 2010 · 600+ international projects</div>
          </Reveal>
        </div>
        <p className="mt-6 max-w-3xl text-base font-normal leading-relaxed" style={{ color: MUTED }}>
          Across 60+ countries — Africa, the Middle East, Southeast Asia and the Americas — WONLY is specified where security cannot be compromised, from presidential palaces and sovereign banks to summit venues and international airports. A selection of landmark deployments:
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LANDMARKS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 80}>
              <div className="group rounded-2xl overflow-hidden relative h-[240px]">
                <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 40%, rgba(13,13,13,0.85))" }} />
                <div className="absolute bottom-0 left-0 p-5">
                  <div className="text-white text-base font-medium">{p.name}</div>
                  <div className="mt-1 text-[11px] tracking-[0.14em] uppercase" style={{ color: CHAMP }}>{p.place}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm font-light" style={{ color: MUTED }}>
          International references include the Egypt New Administrative Capital CBD, Ethiopia's Abyssinia Bank, and presidential palace projects in Togo and Vanuatu.
        </p>
      </section>

      {/* Certifications & honors */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: DARK }}>
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-5"><BadgeCheck size={18} style={{ color: CHAMP }} /><span className={eyebrow} style={{ color: CHAMP }}>Qualifications, Certifications &amp; Honors</span></div>
          <h2 className={h2cls + " text-white"}>16 national honors. 1,000+ awards.</h2>
          <p className="mt-5 text-base font-light leading-relaxed" style={{ color: "rgba(245,241,234,0.7)" }}>If it isn't the only, it's the first — from international design's highest prizes to national quality benchmarks.</p>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <Reveal key={c}><span className="px-5 py-2.5 rounded-full text-sm font-medium border" style={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "rgba(245,241,234,0.92)" }}>{c}</span></Reveal>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {HONORS.map((h, i) => (
            <Reveal key={h}>
              <div className="flex items-start gap-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="text-sm mt-0.5 font-light" style={{ color: GOLD }}>{`0${i + 1}`}</span>
                <span className="text-base font-light" style={{ color: "rgba(245,241,234,0.9)" }}>{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Core Values</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>What we stand for.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#f7f7f5", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}>
                  <v.icon size={20} style={{ color: "#fff" }} />
                </div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{v.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Partner with WONLY." sub="Distributor, project or OEM/ODM — tell us your territory and our team will reply within 24 hours." />
      <SiteFooter />
    </div>
  );
};

export default About;
