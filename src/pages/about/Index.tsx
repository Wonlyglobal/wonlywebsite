import { ShieldCheck, Factory, Globe2, Award, Cpu, FlaskConical, Lightbulb, Target, Eye, BadgeCheck, Layers, Users, MapPin } from "lucide-react";
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
  award1: `${BASE}images/top500-2.webp`,
  award2: `${BASE}images/top500-3.webp`,
  award3: `${BASE}images/top500-4.webp`,
  award4: `${BASE}images/top500-5.webp`,
};

const STATS = [
  { v: "30", s: "yrs", label: "Since 1996" },
  { v: "5", s: "", label: "Manufacturing Bases" },
  { v: "6", s: "", label: "R&D Centers" },
  { v: "200M", s: "+", label: "Users Protected" },
];

const ECOSYSTEM = [
  { img: IMG.door, name: "Security Doors", d: "Cast-aluminum and steel doors that defeat forced entry while meeting global fire and acoustic codes." },
  { img: IMG.lock, name: "Smart Locks", d: "True-sensing, biometric and app-controlled locks — the intelligent layer of the modern entrance." },
  { img: IMG.wood, name: "Wooden Doors", d: "Interior and villa doors where craftsmanship meets engineered stability and finish." },
  { img: IMG.window, name: "Aluminum Windows", d: "Weather-sealed systems and whole-house intelligence that tie the building envelope together." },
];

const RD = [
  { icon: FlaskConical, t: "Six R&D Centers", d: "Dedicated labs for structural security, biometrics, materials and firmware — testing to destruction so the field never sees failure." },
  { icon: Lightbulb, t: "1,000+ Patents", d: "A proprietary library of locking mechanisms, sensing algorithms and anti-tamper architecture built over three decades." },
  { icon: Cpu, t: "5G Smart Factories", d: "Robotic stamping, welding and assembly lines with automated storage and full digital traceability per unit." },
  { icon: Layers, t: "Vertically Integrated", d: "From cast aluminum to finished smart door — designed, tooled and built in-house across five bases." },
];

const STORY = [
  { y: "1996", m: "Founded in Yongkang, Zhejiang — China's hardware capital." },
  { y: "2000s", m: "Becomes the national sales leader in security doors and smart locks." },
  { y: "2021", m: "Lists on the Shanghai Stock Exchange (605268) — the sector's first public company." },
  { y: "Today", m: "Five bases, six R&D centers, 200M+ users across 60+ countries." },
];

const LANDMARKS = [
  { img: IMG.g20, name: "G20 Summit Venue", place: "Hangzhou, China" },
  { img: IMG.asianGames, name: "Hangzhou Asian Games", place: "Hangzhou, China" },
  { img: IMG.daxing, name: "Beijing Daxing Int'l Airport", place: "Beijing, China" },
  { img: IMG.egypt, name: "New Administrative Capital CBD", place: "Cairo, Egypt" },
  { img: IMG.tianjin, name: "National Games Village", place: "Tianjin, China" },
  { img: IMG.govHousing, name: "Central Ministry Residences", place: "Beijing, China" },
];

const CERTS = ["ISO 9001", "ISO 14001", "ISO 45001", "CE", "UL", "EN 1634 Fire", "CMA", "CSPPA"];
const HONORS = [
  "iF Product Design Award",
  "National High-Tech Enterprise",
  "National Quality Benchmark",
  "National Standard Co-drafter",
  "TOP500 Preferred Supplier — China Real-Estate Supply Chain",
];
const AWARDS = [IMG.award1, IMG.award2, IMG.award3, IMG.award4];

const VALUES = [
  { icon: ShieldCheck, t: "Security is Non-Negotiable", d: "Every design decision starts from the threat model and works backwards — never the other way around." },
  { icon: Award, t: "Certified, Not Claimed", d: "Independent testing and international certification back every specification we publish." },
  { icon: Users, t: "Built for Partners", d: "Distributor training, regional support and OEM/ODM flexibility make us easy to build a business on." },
  { icon: Globe2, t: "Global by Design", d: "Products climate-adapted and standards-compliant for the Gulf, SE Asia, Central Asia and beyond." },
];

const About = () => {
  useSeo({
    title: "About WONLY | 30-Year Listed Security Door & Smart Lock Manufacturer",
    description:
      "WONLY (SSE: 605268) — a Shanghai-listed manufacturer of security doors and smart locks. Founded 1996, five bases, six R&D centers, 1,000+ patents, protecting 200M+ users across 60+ countries.",
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
          <p className="mt-7 max-w-lg text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>For nearly three decades we have engineered the moment a door opens into something safe, effortless and intelligent.</p>
        </div>
      </section>

      {/* Heritage + stats */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Our Heritage</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>A workshop that became a listed leader.</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              WONLY began in 1996 in Yongkang — the town Chinese industry calls its "hardware capital." What started as a single security-door workshop grew, decade by decade, into a Shanghai-listed group (605268) whose products now guard homes, banks, hospitals and landmark projects on four continents.
            </p>
            <p className="mt-4 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              The obsession has never changed: get the entrance right — the one part of a building everyone touches, every day.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl p-6" style={{ background: "#f7f7f5", border: `1px solid ${SILVER}44` }}>
                  <div className="font-light leading-none" style={{ color: GOLD }}>
                    <span className="text-[34px] md:text-[42px]">{s.v}</span><span className="text-lg ml-0.5">{s.s}</span>
                  </div>
                  <div className="mt-3 text-[11px] tracking-[0.18em] uppercase font-medium" style={{ color: DARK }}>{s.label}</div>
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
            <h3 className="text-2xl md:text-4xl font-light leading-[1.15] text-white">Make world-class security effortless — for every family and building we serve.</h3>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-2.5 mb-5"><Eye size={18} style={{ color: GOLD }} /><span className={eyebrow} style={{ color: CHAMP }}>Vision</span></div>
            <h3 className="text-2xl md:text-4xl font-light leading-[1.15] text-white">To be the global standard for the intelligent, secure entrance.</h3>
          </Reveal>
        </div>
        {/* Ecosystem */}
        <div className="mt-16 md:mt-20">
          <Reveal><div className={eyebrow + " mb-8"} style={{ color: CHAMP }}>One Ecosystem · Four Pillars</div></Reveal>
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
            <div className={eyebrow} style={{ color: GOLD }}>R&D &amp; Smart Manufacturing</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Engineered, then proven — in-house.</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              Security you can trust has to be manufactured, not just designed. WONLY controls the entire chain — from casting aluminum to writing lock firmware — in 5G-connected smart factories, then tests every design to destruction before it ships.
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {STORY.map((t, i) => (
            <Reveal key={t.y} delay={i * 90}>
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
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: MUTED }}><MapPin size={16} style={{ color: GOLD }} /> 60+ countries &amp; regions</div>
          </Reveal>
        </div>
        <p className="mt-6 max-w-3xl text-base font-normal leading-relaxed" style={{ color: MUTED }}>
          From summit venues and international airports to sovereign capital districts, WONLY is specified where security, fire performance and reliability are not allowed to fail. A selection of landmark deployments:
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
      </section>

      {/* Certifications & honors */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: DARK }}>
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-5"><BadgeCheck size={18} style={{ color: CHAMP }} /><span className={eyebrow} style={{ color: CHAMP }}>Qualifications, Certifications &amp; Honors</span></div>
          <h2 className={h2cls + " text-white"}>Held to standards, honored at the top.</h2>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <Reveal key={c}><span className="px-5 py-2.5 rounded-full text-sm font-medium border" style={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "rgba(245,241,234,0.92)" }}>{c}</span></Reveal>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <ul className="space-y-4">
              {HONORS.map((h, i) => (
                <li key={h} className="flex items-start gap-4 py-1">
                  <span className="text-sm mt-0.5 font-light" style={{ color: GOLD }}>{`0${i + 1}`}</span>
                  <span className="text-base font-light" style={{ color: "rgba(245,241,234,0.9)" }}>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {AWARDS.map((a, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ background: "#fff" }}>
                  <img src={a} alt="WONLY honor / recognition" loading="lazy" className="w-full h-36 object-contain p-3" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>What We Stand For</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Principles behind every product.</h2>
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
