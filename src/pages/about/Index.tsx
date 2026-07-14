import { ShieldCheck, Factory, Globe2, Award } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { GOLD, CHAMP, SILVER, CHAMP_BG, DARK, MUTED, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand } from "@/lib/site-ui";

const IMG = {
  hero: `${BASE}images/factory-line-a.webp`,
  lineB: `${BASE}images/factory-line-b.webp`,
  abb: `${BASE}images/factory-abb.webp`,
  proj: `${BASE}images/proj-1.webp`,
  door: `${BASE}images/alu-k300pro.webp`,
};

const STATS = [
  { v: "30", s: "yrs", label: "Since 1996" },
  { v: "1M", s: "+ m²", label: "Manufacturing Base" },
  { v: "1,000", s: "+", label: "Patents" },
  { v: "200M", s: "+", label: "Users Worldwide" },
];

const STORY = [
  { y: "1996", m: "WONLY founded in Yongkang, Zhejiang — China's \"hardware capital.\"" },
  { y: "2000s", m: "Grows into the national sales leader in security doors and smart locks." },
  { y: "2021", m: "Listed on the Shanghai Stock Exchange (SSE: 605268) — the industry's first public company." },
  { y: "Today", m: "Five manufacturing bases, six R&D centers and 200M+ users protected worldwide." },
];

const VALUES = [
  { icon: ShieldCheck, t: "Security First", d: "Every product is engineered to defeat forced entry while meeting global fire and safety codes." },
  { icon: Factory, t: "Vertically Integrated", d: "Doors, locks, windows and whole-house intelligence — built end-to-end in our own smart factories." },
  { icon: Award, t: "Certified Quality", d: "ISO 9001 / 14001, CE, UL and EN 1634 fire-rated — held to standards, honored at the top." },
  { icon: Globe2, t: "Global Partner", d: "Distributors and projects across 60+ countries, backed by regional HQs and local support." },
];

const About = () => {
  useSeo({
    title: "About WONLY | 30-Year Listed Security Door & Smart Lock Manufacturer",
    description:
      "WONLY (SSE: 605268) is a listed manufacturer of security doors and smart locks — founded 1996, 1,000,000+ m² base, five bases, six R&D centers, 1,000+ patents, protecting 200M+ users worldwide.",
    path: "/about",
    type: "website",
    jsonLd: { "@context": "https://schema.org", "@type": "AboutPage", name: "About WONLY", url: SITE_URL + "/about" },
  });

  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden flex items-center" style={{ background: "#0d0d0d" }}>
        <img src={IMG.hero} alt="WONLY smart factory production line" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,13,13,0.82) 0%, rgba(13,13,13,0.45) 60%, rgba(13,13,13,0.2) 100%)" }} />
        <div className="relative z-10 px-[7vw] max-w-3xl">
          <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>About WONLY</div>
          <h1 className="font-light uppercase text-white leading-[1.08] tracking-[0.06em] text-[40px] md:text-[74px]">Securing the world's<br /><span style={{ color: CHAMP }}>front doors</span></h1>
          <p className="mt-7 max-w-lg text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>Three decades of vertically integrated manufacturing — from a Zhejiang workshop to a listed global smart-security ecosystem leader.</p>
        </div>
      </section>

      {/* Who we are + stats */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Who We Are</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>One partner for the entire building entry.</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              Founded in 1996 and listed on the Shanghai Stock Exchange (SSE: 605268), WONLY manufactures security doors, smart locks, wooden doors and aluminum windows across five bases and six R&amp;D centers — protecting over 200 million users worldwide.
            </p>
            <div className="mt-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full" style={{ background: `${GOLD}1f` }}>
              <ShieldCheck size={16} style={{ color: GOLD }} />
              <span className="text-xs font-medium" style={{ color: DARK }}>No.1 in China · Smart Doors &amp; Locks</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl p-6" style={{ background: CHAMP_BG }}>
                  <div className="font-light leading-none" style={{ color: GOLD }}>
                    <span className="text-[34px] md:text-[42px]">{s.v}</span>
                    <span className="text-lg ml-1">{s.s}</span>
                  </div>
                  <div className="mt-3 text-[11px] tracking-[0.18em] uppercase font-medium" style={{ color: DARK }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed manufacturing band */}
      <section className="relative h-[56vh] min-h-[380px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.lineB} alt="WONLY press line and mold tower" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.5), rgba(34,31,32,0.68))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>Manufacturing</div>
          <h2 className="font-light text-white leading-[1.1] text-[30px] md:text-[54px]">Built in our own 5G-connected smart factories.</h2>
        </Reveal>
      </section>

      {/* Story timeline */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Our Story</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>From a Zhejiang workshop to a listed leader.</h2>
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

      {/* Values */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Why WONLY</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Built for scale, trusted at the top.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#faf8f4", borderColor: `${SILVER}55` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: `${GOLD}1a` }}>
                  <v.icon size={20} style={{ color: GOLD }} />
                </div>
                <h3 className="mt-5 text-lg font-light" style={{ color: DARK }}>{v.t}</h3>
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
