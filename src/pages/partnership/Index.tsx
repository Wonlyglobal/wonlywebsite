import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, BASE, eyebrow, Reveal, useQuoteStore } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";

const PATHS = [
  { t: "Distributor Program", d: "Join a global network backed by 30 years of brand equity — with full product training, marketing support and protected territories.", cta: "Become a Distributor", biz: "Distributor / Dealer" },
  { t: "Project Cooperation", d: "Residential, commercial, medical, hotel, government and public projects — certified, project-ready security at scale.", cta: "Submit a Project", biz: "Project / Developer" },
  { t: "OEM / ODM Services", d: "Leverage our smart factories and 1,000+ patents to build your own branded security-door and smart-lock line.", cta: "Request OEM / ODM Brief", biz: "OEM / ODM" },
  { t: "Global Distribution Network", d: "Regional HQs, local offices and authorized partners across the Middle East, Southeast Asia and Central Asia — radiating worldwide.", cta: "Find a Local Partner", biz: "Distributor / Dealer" },
];

const PARTNERS = [
  { img: "partner-huawei.webp", n: "Huawei", y: "2020" },
  { img: "partner-siemens.webp", n: "Siemens", y: "2019" },
  { img: "partner-alibaba.webp", n: "Alibaba", y: "2021" },
  { img: "partner-hikvision.webp", n: "Hikvision", y: "2019" },
  { img: "partner-china-mobile.webp", n: "China Mobile", y: "2019" },
  { img: "partner-china-telecom.webp", n: "China Telecom", y: "2020" },
  { img: "partner-midea.webp", n: "Midea", y: "2021" },
  { img: "partner-foxconn.webp", n: "Foxconn", y: "2018" },
  { img: "partner-shanghai-electric.webp", n: "Shanghai Electric", y: "2019" },
];

const RE = Array.from({ length: 30 }, (_, i) => `re-${String(i + 1).padStart(2, "0")}.png`);

export default function Partnership() {
  const openQuote = useQuoteStore((s) => s.openQuote);
  useSeo({
    title: "Partnership | WONLY",
    description: "Partner with WONLY — distributor programs, project cooperation and OEM/ODM services. Trusted by Huawei, Siemens, Alibaba and China's leading developers. SSE: 605268.",
    path: "/partnership",
  });

  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative text-white px-[6vw] pt-[150px] pb-[90px] overflow-hidden" style={{ background: "radial-gradient(120% 100% at 78% 15%, #2a2627 0%, #0d0d0d 72%)" }}>
        <Reveal className="max-w-[1200px] mx-auto">
          <div className={eyebrow} style={{ color: CHAMP }}>Partner With WONLY</div>
          <h1 className="mt-4 font-light leading-[1.05] tracking-[-1px] text-[clamp(34px,5vw,64px)]">Open the Door to <span style={{ color: CHAMP }}>Partnership</span></h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.72)" }}>
            Distributors, developers and OEM/ODM brands build on 30 years of WONLY engineering, five smart factories and 1,000+ patents — with a partner trusted from residences to national institutions.
          </p>
        </Reveal>
      </section>

      {/* Partnership paths */}
      <section className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PATHS.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div className="h-full bg-white border rounded-2xl p-9 flex flex-col" style={{ borderColor: "#e4ddcf" }}>
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: GOLD }}>0{i + 1}</div>
                <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.3px]">{p.t}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] flex-1" style={{ color: MUTED }}>{p.d}</p>
                <button onClick={() => openQuote({ biz: p.biz })} className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold w-fit" style={{ color: "#221F20" }}>
                  <span className="border-b-[1.5px] pb-0.5" style={{ borderColor: GOLD }}>{p.cta}</span> <ArrowRight size={15} style={{ color: GOLD }} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Strategic partners — ceremony photos */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Strategic Partners</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">Trusted by <b className="font-semibold">Industry Leaders</b></h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-9">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.n} delay={i * 60}>
                <div className="group relative rounded-2xl overflow-hidden h-[240px]">
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={`${BASE}images/partners-ceremony/${p.img}`} alt={`WONLY strategic partnership — ${p.n}`} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(12,10,9,0.85) 0%,rgba(12,10,9,0.1) 45%,transparent 65%)" }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-white text-[17px] font-semibold leading-tight">{p.n}</div>
                    <div className="mt-0.5 text-[10px] tracking-[0.14em] uppercase" style={{ color: CHAMP }}>Partner · {p.y}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real-estate developers logo wall */}
      <section className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
        <Reveal>
          <div className={eyebrow} style={{ color: GOLD }}>Real-Estate Partners</div>
          <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">Trusted by China's <b className="font-semibold">Leading Developers</b></h2>
        </Reveal>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-9">
          {RE.map((f, i) => (
            <Reveal key={f} delay={(i % 6) * 40}>
              <div className="bg-white border rounded-xl h-[84px] flex items-center justify-center p-4 transition-shadow hover:shadow-[0_14px_30px_-20px_rgba(34,31,32,0.5)]" style={{ borderColor: "#e9e2d4" }}>
                <img className="max-h-[46px] max-w-full object-contain" src={`${BASE}images/partners-re/${f}`} alt="WONLY real-estate developer partner" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand eyebrowText="Partner With WONLY" title="Let's Build Your Market Together" sub="Tell us about your territory or project — our partnership team replies within 24 hours with programs, terms and support." />
      <SiteFooter />
    </div>
  );
}
