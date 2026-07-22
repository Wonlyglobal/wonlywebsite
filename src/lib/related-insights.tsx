import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ARTICLES, type Article } from "@/lib/articles";
import { GOLD_DEEP, DARK, eyebrow, Reveal } from "@/lib/site-ui";

/** Reusable "From Our Insights" block for cross-linking product pages to articles (SEO internal links). */
export function RelatedInsights({ title = "Buyer Guides & Insights", slugs }: { title?: string; slugs?: string[] }) {
  const items: Article[] =
    slugs && slugs.length
      ? slugs.map((s) => ARTICLES.find((a) => a.slug === s)).filter((a): a is Article => !!a)
      : ARTICLES.slice(0, 3);
  if (!items.length) return null;

  return (
    <section className="px-[7vw] py-16 md:py-24" style={{ background: "#fff" }}>
      <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
        <div>
          <div className={eyebrow} style={{ color: GOLD_DEEP }}>From Our Insights</div>
          <h2 className="mt-3 font-light leading-tight text-[28px] md:text-[40px]" style={{ color: DARK }}>{title}</h2>
        </div>
        <Link to="/insights" className="inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: GOLD_DEEP }}>
          View All Articles <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((a, i) => (
          <Reveal key={a.slug} delay={i * 60}>
            <Link
              to={`/insights/${a.slug}`}
              className="group block h-full rounded-2xl overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-40px_rgba(34,31,32,0.4)]"
              style={{ border: "1px solid #e4ddcf" }}
            >
              <div className="h-[170px] overflow-hidden">
                <img src={a.cover} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: GOLD_DEEP }}>{a.category}</div>
                <h3 className="mt-2 text-[16px] font-semibold leading-snug text-[#221F20] group-hover:text-[#B08D4F] transition-colors">{a.title}</h3>
                <div className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: GOLD_DEEP }}>
                  Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
