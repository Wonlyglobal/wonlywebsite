import { useParams, Link, Navigate } from "react-router-dom";
import { useSeo, SITE_URL } from "@/lib/seo";
import { SiteHeader, SiteFooter, CtaBand, Reveal, GOLD, GOLD_DEEP, DARK, MUTED, CHAMP_BG } from "@/lib/site-ui";
import { getArticle, relatedArticles } from "@/lib/articles";
import { ChevronRight, ArrowRight } from "lucide-react";

const ArticlePage = () => {
  const { slug = "" } = useParams();
  const article = getArticle(slug);

  useSeo(
    article
      ? {
          title: article.seoTitle,
          description: article.description,
          path: `/insights/${article.slug}`,
          image: article.cover,
          type: "article",
          jsonLd: {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            image: `${SITE_URL}${article.cover.replace(/^\.?\//, "/")}`,
            datePublished: article.date,
            dateModified: article.date,
            keywords: article.keywords.join(", "),
            articleSection: article.category,
            author: { "@type": "Organization", name: "WONLY" },
            publisher: {
              "@type": "Organization",
              name: "WONLY",
              logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-256.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/insights/${article.slug}` },
          },
        }
      : { title: "News & Insights | WONLY", description: "WONLY News & Insights.", path: "/insights" }
  );

  if (!article) return <Navigate to="/insights" replace />;

  const related = relatedArticles(article.slug);

  return (
    <div style={{ background: "#fff" }}>
      <SiteHeader />

      {/* Header */}
      <section className="px-[7vw] pt-36 pb-10" style={{ background: CHAMP_BG }}>
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-[12px] mb-6" style={{ color: MUTED }}>
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={13} />
          <Link to="/insights" className="hover:underline">News &amp; Insights</Link>
          <ChevronRight size={13} />
          <span style={{ color: DARK }}>{article.category}</span>
        </nav>
        <div className="max-w-3xl">
          <span className="text-[12px] font-semibold tracking-[0.14em] uppercase" style={{ color: GOLD_DEEP }}>{article.category}</span>
          <h1 className="mt-3 font-light leading-[1.1] tracking-[-0.5px] text-[30px] md:text-[48px]" style={{ color: DARK }}>{article.title}</h1>
          <div className="mt-4 text-[13px]" style={{ color: MUTED }}>{article.dateLabel} · {article.readMins} min read · WONLY</div>
        </div>
      </section>

      {/* Cover */}
      <div className="px-[7vw]" style={{ background: CHAMP_BG }}>
        <div className="max-w-4xl mx-auto -mb-16">
          <img src={article.cover} alt={article.title} className="w-full h-[240px] md:h-[420px] object-cover rounded-2xl" style={{ boxShadow: "0 40px 80px -50px rgba(34,31,32,0.5)" }} />
        </div>
      </div>

      {/* Body */}
      <section className="px-[7vw] pt-28 pb-20">
        <article className="max-w-[720px] mx-auto">
          {article.body.map((b, i) => {
            if (b.type === "h2")
              return <h2 key={i} className="mt-11 mb-3 text-[22px] md:text-[26px] font-semibold leading-snug" style={{ color: DARK }}>{b.text}</h2>;
            if (b.type === "ul")
              return (
                <ul key={i} className="my-4 space-y-2.5 pl-1">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-[16px] leading-relaxed" style={{ color: "#3a3632" }}>
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full flex-none" style={{ background: GOLD }} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            return <p key={i} className="my-4 text-[16px] leading-[1.8]" style={{ color: "#3a3632" }}>{b.text}</p>;
          })}

          {/* Keyword chips */}
          <div className="mt-10 flex flex-wrap gap-2">
            {article.keywords.map((k) => (
              <span key={k} className="px-3 py-1 rounded-full text-[12px]" style={{ background: CHAMP_BG, color: MUTED, border: "1px solid #e4ddcf" }}>{k}</span>
            ))}
          </div>
        </article>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-[7vw] py-16 md:py-20" style={{ background: CHAMP_BG }}>
          <h2 className="text-[13px] tracking-[0.2em] uppercase font-semibold mb-8" style={{ color: GOLD_DEEP }}>More From News &amp; Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <Link to={`/insights/${a.slug}`} className="group block h-full rounded-2xl overflow-hidden bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-40px_rgba(34,31,32,0.4)]" style={{ border: "1px solid #e4ddcf" }}>
                  <div className="h-[160px] overflow-hidden">
                    <img src={a.cover} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: GOLD_DEEP }}>{a.category}</div>
                    <h3 className="mt-2 text-[16px] font-semibold leading-snug" style={{ color: DARK }}>{a.title}</h3>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: GOLD_DEEP }}>
                      Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaBand />
      <SiteFooter />
    </div>
  );
};

export default ArticlePage;
