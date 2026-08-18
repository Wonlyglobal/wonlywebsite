import { Link } from "react-router-dom";
import { Shield, Flame, Lock, Wind, Volume2, Award, ArrowRight, Check, ShieldCheck, Home, Building2, Cross } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { GOLD, CHAMP, SILVER, CHAMP_BG, DARK, MUTED, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand } from "@/lib/site-ui";
import { useLocale } from "@/lib/i18n";
import { securityApplication, securityDoorText, securityFeature, securitySeries } from "@/lib/product-locales";
import { RelatedInsights } from "@/lib/related-insights";

const IMG = {
  hero: `${BASE}images/alu-k300max.webp`,
  x70: `${BASE}images/alu-k300max.webp`,
  global40: `${BASE}images/alu-40.webp`,
  k300pro: `${BASE}images/alu-k300pro.webp`,
  engineering: `${BASE}images/alu-t200.webp`,
  medical: `${BASE}images/wood-2.webp`,
  luxury: `${BASE}images/yizhai-1.webp`,
  villa: `${BASE}images/yizhai-2.webp`,
  commercial: `${BASE}images/proj-1.webp`,
  institutional: `${BASE}images/proj-s-7.webp`,
  band: `${BASE}images/factory-2.webp`,
};

const STATS = [
  { v: "30", s: "", label: "Years" },
  { v: "90", s: "min", label: "Fire Rating" },
  { v: "200", s: "K+", label: "Cycle Test" },
  { v: "A", s: "", label: "Class Grade" },
];

const SERIES = [
  { n: "01", name: "Robotic Security Door X70", tag: "Flagship", d: "Autonomous locking, multi-vector intrusion sensing and a premium cast-aluminum build — the flagship for villas and executive residences.", img: IMG.x70, path: "/products/security-doors/x70" },
  { n: "02", name: "4.0 Global Series", tag: "Best Seller", d: "International universal models — fire-rated, anti-theft and climate-adapted to global standards.", img: IMG.global40 },
  { n: "03", name: "K300 Pro Robotic Door", tag: "Smart", d: "AI-powered entry with facial recognition and app management, built for new-quality housing.", img: IMG.k300pro },
  { n: "04", name: "Engineering Fire Doors", tag: "Fire-Rated", d: "EN 1634 fire-rated with 90-minute integrity — compliant with Gulf, SE Asia and Central Asia codes.", img: IMG.engineering },
  { n: "05", name: "Medical-Grade Doors", tag: "Medical", d: "Hermetic operating-room and ward doors engineered for hospitals and clean environments.", img: IMG.medical },
  { n: "06", name: "YIZHAI YISHU — Artisan", tag: "Luxury", d: "Bespoke villa doors where protection becomes heritage art, with integrated smart entry.", img: IMG.luxury },
];

const FEATURES = [
  { icon: Shield, t: "Multi-Vector Intrusion Sensing", d: "Sensors detect forced entry, prying, drilling and lock-picking in real time and trigger instant alerts." },
  { icon: Flame, t: "90-Minute Fire Rating", d: "EN 1634 certified — doors hold structural stability and insulation for 90 minutes under fire exposure." },
  { icon: Lock, t: "Autonomous Smart Locking", d: "AI-driven locking with biometric authentication, app control and tamper-proof architecture." },
  { icon: Wind, t: "Climate-Adapted Engineering", d: "Hurricane-rated, corrosion-resistant and thermal-break designs built for the world's harshest climates." },
  { icon: Volume2, t: "Acoustic Insulation", d: "Sound-reducing cores and precision sealing deliver STC 35+ for privacy and quiet." },
  { icon: Award, t: "200,000-Cycle Durability", d: "Every door survives 200,000 open-close cycles in testing — backed by 30 years without a major safety incident." },
];

const SPECS: [string, string][] = [
  ["Security Grade", "Class A (highest)"],
  ["Fire Rating", "EN 1634 — 90 minutes"],
  ["Material", "Cast aluminum / steel core"],
  ["Lock System", "Biometric + RFID + App"],
  ["Door Thickness", "90–120 mm"],
  ["Acoustic Rating", "STC 35+"],
  ["Wind Resistance", "Class 12 (hurricane-rated)"],
  ["Cycle Test", "200,000+ cycles"],
  ["Certifications", "ISO 9001 · CE · UL · CMA"],
];

const APPLICATIONS = [
  { icon: Home, t: "Premium Villas & Residences", d: "Bespoke designs with ultra-high security grades and whole-house smart integration.", img: IMG.villa },
  { icon: Building2, t: "Commercial & Corporate", d: "Banks, data centers and HQs — engineered to defeat forced entry while meeting life-safety codes.", img: IMG.commercial },
  { icon: Cross, t: "Medical & Public Institutions", d: "Hermetic OR doors, ward doors and access-controlled entries for hospitals and government facilities.", img: IMG.institutional },
];

const CERTS = ["ISO 9001", "ISO 14001", "CE", "UL", "EN 1634 Fire", "Class A Anti-Theft", "CMA", "CSPPA"];

const SecurityDoors = () => {
  const { locale, t } = useLocale();
  const st = (text: string) => securityDoorText(locale, text);
  useSeo({
    title: st("SEO Title") === "SEO Title" ? "Security Door Manufacturer — Cast-Aluminium & Fire-Rated | WONLY" : st("SEO Title"),
    description: st("SEO Description") === "SEO Description" ? "WONLY security door manufacturer and OEM/ODM supplier: robotic flagship, EN 1634 90-minute fire-rated, medical-grade and artisan villa doors — Class A protection, certified worldwide, for distributors and projects." : st("SEO Description"),
    path: "/products/security-doors",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "WONLY Security Door Series",
      itemListElement: SERIES.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, ...(p.path ? { item: SITE_URL + p.path } : {}) })),
    },
  });

  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative min-h-[92vh] w-full overflow-hidden flex items-center" style={{ background: "radial-gradient(120% 90% at 78% 25%, #2a2627 0%, #0d0d0d 70%)" }}>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[7vw] grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-24 pb-16">
          <div>
            <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>{st("Security Doors · Since 1996")}</div>
            <h1 className="font-light uppercase text-white leading-[1.07] tracking-[0.05em] text-[38px] md:text-[64px]">{st("Engineered to")}<br /><span style={{ color: CHAMP }}>{st("defend")}</span> {st("every entry")}</h1>
            <p className="mt-7 max-w-md text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>{st("Hero Description")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>{t("Get Solutions & Quote")} <ArrowRight size={15} /></Link>
              <a href="#series" className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-medium border transition-colors hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>{st("View the Range")}</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-light leading-none" style={{ color: GOLD }}><span className="text-[28px] md:text-[34px]">{s.v}</span><span className="text-base ml-0.5">{s.s}</span></div>
                  <div className="mt-1.5 text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(245,241,234,0.6)" }}>{st(s.label)}</div>
                </div>
              ))}
            </div>
          </div>
          <Reveal className="relative">
            <div className="relative mx-auto w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(212,196,160,0.14), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img src={IMG.hero} alt="WONLY flagship cast-aluminum security door" className="absolute inset-0 w-full h-full object-contain p-8" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product series */}
      <section id="series" className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{st("The Range")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{st("Six Series. Every Grade And Scenario")}</h2>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed" style={{ color: MUTED }}>{st("Range Description")}</p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERIES.map((p, i) => {
            const localized = securitySeries(locale, i, { title: p.name, tag: p.tag, description: p.d });
            // Cards that have a detail page are clickable in full — the "View Details"
            // line is only the affordance, not the sole hit area.
            const card = (
              <div
                className={`group h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${p.path ? "hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" : ""}`}
                style={{ background: "#f7f7f5", border: `1px solid ${SILVER}55` }}
              >
                <div className="relative h-[260px] overflow-hidden" style={{ background: "#ecebe7" }}>
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: GOLD, color: DARK }}>{localized.tag}</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-light tracking-[0.2em]" style={{ color: GOLD }}>{p.n}</div>
                  <h3 className="mt-2 text-lg font-medium leading-tight" style={{ color: DARK }}>{localized.title}</h3>
                  <p className="mt-2.5 text-sm font-normal leading-relaxed flex-1" style={{ color: MUTED }}>{localized.description}</p>
                  {p.path && (
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3" style={{ color: GOLD }}>View Details <ArrowRight size={14} /></span>
                  )}
                </div>
              </div>
            );
            return (
              <Reveal key={p.n} delay={(i % 3) * 90}>
                {p.path ? <Link to={p.path} className="block h-full" aria-label={`${p.name} — view details`}>{card}</Link> : card}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Core technology */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{st("Core Technology")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{st("Six Layers Of Defense, In Every Door")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#fff", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}>
                  <f.icon size={20} style={{ color: "#fff" }} />
                </div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{securityFeature(locale, i, { title: f.t, description: f.d }).title}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{securityFeature(locale, i, { title: f.t, description: f.d }).description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Full-bleed band */}
      <section className="relative h-[54vh] min-h-[360px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.band} alt="WONLY security-door manufacturing" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.5), rgba(34,31,32,0.7))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>{st("Tested to Destruction")}</div>
          <h2 className="font-light text-white leading-[1.1] text-[28px] md:text-[50px]">{st("Certified In Our Own Labs Before It Ships")}</h2>
        </Reveal>
      </section>

      {/* Specs */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>{st("Specifications")}</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{st("Technical Excellence, To Spec")}</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>{st("Spec Description")}</p>
            <Link to="/#contact" className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>{st("Request Full Spec Sheet")} <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="border-t" style={{ borderColor: `${SILVER}66` }}>
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-6 py-4 border-b" style={{ borderColor: `${SILVER}44` }}>
                  <div className="text-sm" style={{ color: MUTED }}>{st(k)}</div>
                  <div className="text-sm font-medium text-right flex items-center gap-2" style={{ color: DARK }}><Check size={14} style={{ color: GOLD }} />{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Applications */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{st("Applications")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{st("Built For Every Space")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {APPLICATIONS.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="group relative rounded-2xl overflow-hidden h-[400px]">
                <img src={s.img} alt={s.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 35%, rgba(13,13,13,0.9))" }} />
                <div className="absolute bottom-0 left-0 p-7">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: GOLD }}><s.icon size={18} style={{ color: "#fff" }} /></div>
                  <h3 className="text-xl font-medium text-white">{securityApplication(locale, i, { title: s.t, description: s.d }).title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed" style={{ color: "rgba(245,241,234,0.8)" }}>{securityApplication(locale, i, { title: s.t, description: s.d }).description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="px-[7vw] py-20 md:py-24" style={{ background: DARK }}>
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-5"><ShieldCheck size={18} style={{ color: CHAMP }} /><span className={eyebrow} style={{ color: CHAMP }}>Certified &amp; Recognized</span></div>
          <h2 className="text-2xl md:text-4xl font-light text-white">{st("Held To The Highest Security Standards")}</h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <span key={c} className="px-5 py-2.5 rounded-full text-sm font-medium border" style={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "rgba(245,241,234,0.92)" }}>{c}</span>
          ))}
        </div>
      </section>

      <RelatedInsights
        title="Security Door Standards & Buyer Guides"
        slugs={[
          "gb-17565-class-a-security-door-standard",
          "en-1627-rc2-rc3-rc4-security-door-grades",
          "cast-aluminium-vs-steel-security-doors",
        ]}
      />

      <CtaBand eyebrowText={st("Ready to Secure Your Project?")} title={st("Custom Security-Door Solutions & Pricing")} sub={st("CTA Description")} />
      <SiteFooter />
    </div>
  );
};

export default SecurityDoors;
