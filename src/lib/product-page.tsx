import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { useSeo } from "@/lib/seo";
import { GOLD, CHAMP, SILVER, CHAMP_BG, DARK, MUTED, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand, useQuoteStore } from "@/lib/site-ui";

export type Feature = { icon: LucideIcon; t: string; d: string };
export type ProductPageData = {
  seo: { title: string; description: string; path: string };
  hero: { eyebrow: string; title: React.ReactNode; sub: string; img: string; mode: "render" | "scene" };
  highlights?: string[];
  featuresEyebrow: string;
  featuresTitle: string;
  features: Feature[];
  band?: { img: string; eyebrow: string; title: string };
  specs?: [string, string][];
  cta: { eyebrow?: string; title: string; sub: string };
};

export function ProductPage({ data }: { data: ProductPageData }) {
  useSeo({ title: data.seo.title, description: data.seo.description, path: data.seo.path, type: "product" });
  const openQuote = useQuoteStore((s) => s.openQuote);
  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {data.hero.mode === "render" ? (
        <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center" style={{ background: "radial-gradient(120% 90% at 80% 22%, #2a2627 0%, #0d0d0d 70%)" }}>
          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[7vw] grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-24 pb-16">
            <div>
              <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>{data.hero.eyebrow}</div>
              <h1 className="font-light uppercase text-white leading-[1.07] tracking-[0.05em] text-[38px] md:text-[62px]">{data.hero.title}</h1>
              <p className="mt-7 max-w-md text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>{data.hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => openQuote()} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Get a Quote <ArrowRight size={15} /></button>
                <a href="#features" className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-medium border transition-colors hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>Learn More</a>
              </div>
            </div>
            <Reveal className="relative">
              <div className="relative mx-auto w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(212,196,160,0.14), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.1)" }}>
                <img src={data.hero.img} alt="" className="absolute inset-0 w-full h-full object-contain p-8" />
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="relative h-[82vh] min-h-[520px] w-full overflow-hidden flex items-center" style={{ background: "#0d0d0d" }}>
          <img src={data.hero.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.5) 60%, rgba(13,13,13,0.25) 100%)" }} />
          <div className="relative z-10 px-[7vw] max-w-3xl">
            <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>{data.hero.eyebrow}</div>
            <h1 className="font-light uppercase text-white leading-[1.08] tracking-[0.05em] text-[40px] md:text-[70px]">{data.hero.title}</h1>
            <p className="mt-7 max-w-lg text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>{data.hero.sub}</p>
            <button onClick={() => openQuote()} className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Get a Quote <ArrowRight size={15} /></button>
          </div>
        </section>
      )}

      {data.highlights && (
        <section className="px-[7vw] py-16 md:py-20" style={{ background: "#fff" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {data.highlights.map((h, i) => (
              <Reveal key={h} delay={i * 80}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}1f` }}><Check size={14} style={{ color: GOLD }} /></span>
                  <span className="text-base font-normal leading-relaxed" style={{ color: DARK }}>{h}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section id="features" className="px-[7vw] py-24 md:py-32" style={{ background: data.highlights ? CHAMP_BG : "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{data.featuresEyebrow}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{data.featuresTitle}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.features.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#fff", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}>
                  <f.icon size={20} style={{ color: "#fff" }} />
                </div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{f.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {data.band && (
        <section className="relative h-[54vh] min-h-[360px] w-full overflow-hidden flex items-center justify-center">
          <img src={data.band.img} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.5), rgba(34,31,32,0.72))" }} />
          <Reveal className="relative z-10 text-center px-6 max-w-4xl">
            <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>{data.band.eyebrow}</div>
            <h2 className="font-light text-white leading-[1.1] text-[28px] md:text-[50px]">{data.band.title}</h2>
          </Reveal>
        </section>
      )}

      {data.specs && (
        <section className="px-[7vw] py-24 md:py-32" style={{ background: data.band ? CHAMP_BG : "#fff" }}>
          <Reveal className="max-w-3xl">
            <div className={eyebrow} style={{ color: GOLD }}>Specifications</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>The details, in full.</h2>
          </Reveal>
          <div className="mt-12 max-w-4xl border-t" style={{ borderColor: `${SILVER}66` }}>
            {data.specs.map(([k, v]) => (
              <Reveal key={k}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 py-5 border-b" style={{ borderColor: `${SILVER}44` }}>
                  <div className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: GOLD }}>{k}</div>
                  <div className="md:col-span-2 text-sm md:text-base font-normal" style={{ color: DARK }}>{v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaBand eyebrowText={data.cta.eyebrow} title={data.cta.title} sub={data.cta.sub} />
      <SiteFooter />
    </div>
  );
}
