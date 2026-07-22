import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo, SITE_URL } from "@/lib/seo";
import { SiteHeader, SiteFooter, CtaBand, Reveal, eyebrow, GOLD_DEEP, CHAMP, DARK, MUTED, CHAMP_BG } from "@/lib/site-ui";
import { ARTICLES, type ArticleCategory } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

const CATEGORIES: (ArticleCategory | "All")[] = ["All", "Buying Guide", "Technology", "Market Insight", "Company"];

const Insights = () => {
  const [cat, setCat] = useState<ArticleCategory | "All">("All");
  useSeo({
    title: "News & Insights — Security Door & Smart Lock Guides | WONLY",
    description: "WONLY News & Insights: buying guides, product technology, market outlooks and company updates for security door and smart lock distributors and project buyers.",
    path: "/insights",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "WONLY News & Insights",
      url: `${SITE_URL}/insights`,
      description: "Guides, technology and market insights for security door and smart lock buyers.",
    },
  });

  const items = cat === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === cat);

  return (
    <div style={{ background: "#fff" }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden px-[7vw] pt-40 pb-20" style={{ background: `radial-gradient(120% 90% at 78% 15%, #2a2627, #0d0d0d 72%)` }}>
        <Reveal>
          <div className={eyebrow} style={{ color: CHAMP }}>News &amp; Insights</div>
          <h1 className="mt-4 font-light leading-[1.05] tracking-[-0.5px] text-white text-[38px] md:text-[64px]">
            Guides, Technology &amp; <span className="font-semibold" style={{ color: CHAMP }}>Market Insight</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "rgba(245,241,234,0.72)" }}>
            Practical knowledge for security door and smart lock distributors, project buyers and partners — from selection guides to market outlooks.
          </p>
        </Reveal>
      </section>

      {/* Filter + grid */}
      <section className="px-[7vw] py-16 md:py-24" style={{ background: CHAMP_BG }}>
        <div className="flex flex-wrap gap-2.5 mb-12">
          {CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
                style={{
                  background: active ? DARK : "#fff",
                  color: active ? "#fff" : MUTED,
                  border: `1px solid ${active ? DARK : "#e4ddcf"}`,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={i * 60}>
              <Link
                to={`/insights/${a.slug}`}
                className="group block h-full rounded-2xl overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-40px_rgba(34,31,32,0.4)]"
                style={{ border: "1px solid #e4ddcf" }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img src={a.cover} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ background: "rgba(255,255,255,0.92)", color: GOLD_DEEP }}>
                    {a.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col h-[calc(100%-200px)]">
                  <div className="text-[12px]" style={{ color: MUTED }}>{a.dateLabel} · {a.readMins} min read</div>
                  <h3 className="mt-2 text-[19px] font-semibold leading-snug transition-colors text-[#221F20] group-hover:text-[#B08D4F]">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed flex-1" style={{ color: MUTED }}>{a.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: GOLD_DEEP }}>
                    Read Article <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </div>
  );
};

export default Insights;
