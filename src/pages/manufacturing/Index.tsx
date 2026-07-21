import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, BASE, eyebrow, Reveal } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";

const STATS = [
  { n: "1,000,000+ m²", l: "Manufacturing Base" },
  { n: "5", l: "Production Bases" },
  { n: "6", l: "R&D Centers" },
  { n: "1,000+", l: "Patents" },
  { n: "6M / 3M", l: "Doors / Locks a Year" },
];

const STORY = [
  {
    img: "mfg-line.jpg", eb: "Vertically Integrated", h: "One Roof, Full Control",
    p: "Stamping, coating, foaming and final assembly all happen in-house across five production bases — so quality, consistency and lead time stay in our hands, not a supply chain's.",
    li: ["In-house stamping, PU foaming, powder coating & assembly", "Five vertically integrated bases across China", "6 million doors & 3 million locks produced per year"],
  },
  {
    img: "mfg-robot.jpg", eb: "Robotic Precision", h: "Automation Export Projects Rely On",
    p: "ABB automated welding cells and robotic handling hold the tolerances that international projects demand — repeatable, certified quality at volume.",
    li: ["ABB automated welding & robotic handling", "CNC machining for tight, repeatable tolerances", "5G-connected smart-factory monitoring"],
  },
  {
    img: "mfg-inspect.jpg", eb: "Quality & Testing", h: "Tested Beyond the Standard",
    p: "Every product line is validated against international security, fire and durability standards before it ships — including 200,000+ open-close cycle testing.",
    li: ["200,000+ cycle durability testing", "Fire, security & acoustic validation", "ISO 9001 · CE · UL certified processes"],
  },
];

const RD = [
  { big: "6", t: "R&D Centers", d: "Six dedicated centers driving continuous innovation in security doors, smart locks and whole-house intelligence." },
  { big: "1,000+", t: "Patents", d: "Over a thousand proprietary patents in structural security, biometric locking and IoT integration." },
  { big: "SSE 605268", t: "Listed Group", d: "The sector's first main-board company on the Shanghai Stock Exchange (2021) — the backing behind every warranty." },
];

export default function Manufacturing() {
  useSeo({
    title: "Manufacturing & R&D | WONLY",
    description: "WONLY manufacturing & R&D: 1,000,000+ m² of vertically integrated smart factories, ABB robotic lines, five production bases, six R&D centers and 1,000+ patents. SSE: 605268.",
    path: "/manufacturing-rd",
  });

  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden text-white px-[6vw] pt-[120px] pb-[80px]">
        <img className="absolute inset-0 w-full h-full object-cover" src={`${BASE}images/mfg-hero.jpg`} alt="WONLY smart factory" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(13,13,13,0.88) 0%,rgba(13,13,13,0.5) 48%,rgba(13,13,13,0.15) 100%)" }} />
        <Reveal className="relative z-10 max-w-[680px]">
          <div className={eyebrow} style={{ color: CHAMP }}>Manufacturing &amp; R&amp;D</div>
          <h1 className="mt-4 font-light leading-[1.03] tracking-[-1.2px] text-[clamp(36px,5.2vw,68px)]">Engineered at Scale.<br /><b className="font-semibold" style={{ color: CHAMP }}>Built to Last</b></h1>
          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.82)" }}>
            Thirty years of vertically integrated manufacturing from Yongkang, Zhejiang — over 1,000,000 m² of smart factories, robotic precision lines, and six R&amp;D centers behind every door and lock we ship.
          </p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="px-[6vw] py-11" style={{ background: "#17140f" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-5 items-start">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="font-semibold leading-none tracking-[-0.5px] text-[clamp(19px,2vw,31px)] whitespace-nowrap" style={{ color: CHAMP }}>{s.n}</div>
              <div className="mt-2.5 text-[11px] tracking-[0.15em] uppercase leading-[1.3]" style={{ color: "rgba(245,241,234,0.6)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story sections */}
      {STORY.map((s, i) => (
        <section key={s.eb} className={i % 2 === 1 ? "bg-white" : ""}>
          <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]">
            <div className={`grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal className="rounded-2xl overflow-hidden h-[400px] shadow-[0_30px_60px_-40px_rgba(34,31,32,0.4)]">
                <img className="w-full h-full object-cover" src={`${BASE}images/${s.img}`} alt={s.h} loading="lazy" />
              </Reveal>
              <Reveal>
                <div className={eyebrow} style={{ color: GOLD }}>{s.eb}</div>
                <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.3px]">{s.h}</h3>
                <p className="mt-3.5 text-[15px] leading-[1.75] max-w-[460px]" style={{ color: MUTED }}>{s.p}</p>
                <ul className="mt-[18px] flex flex-col gap-2.5">
                  {s.li.map((x) => (
                    <li key={x} className="text-[14px] pl-[22px] relative" style={{ color: "#221F20" }}><span style={{ position: "absolute", left: 0, color: GOLD }}>—</span>{x}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* R&D */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Research &amp; Development</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">Six Centers, <b className="font-semibold">One Thousand Patents</b></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-[34px]">
            {RD.map((r, i) => (
              <Reveal key={r.t} delay={i * 100}>
                <div className="rounded-2xl p-[30px] h-full border" style={{ background: "#F5F1EA", borderColor: "#e4ddcf" }}>
                  <div className="text-[38px] font-semibold tracking-[-1px]" style={{ color: GOLD }}>{r.big}</div>
                  <div className="text-[16px] font-semibold mt-2">{r.t}</div>
                  <div className="text-[13.5px] mt-2 leading-[1.6]" style={{ color: MUTED }}>{r.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrowText="OEM / ODM Partnership" title="Build Your Brand on Our Factories" sub="Leverage our smart factories and 1,000+ patents through OEM / ODM — your own branded security line, engineered and produced by WONLY." />
      <SiteFooter />
    </div>
  );
}
