import { BASE } from "@/lib/site-ui";
import type { Locale } from "@/lib/i18n";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type ArticleCategory = "Buying Guide" | "Technology" | "Market Insight" | "Company";

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: ArticleCategory;
  date: string;
  dateLabel: string;
  readMins: number;
  cover: string;
  excerpt: string;
  keywords: string[];
  body: ArticleBlock[];
}

// ── Content lives in content/articles/*.md (edited via /admin CMS or git) ────
// Each file: YAML frontmatter + markdown body (## → h2, "- " lines → ul,
// blank-line-separated text → p). Vite inlines every file at build time, so
// the runtime bundle is identical in nature to the old hardcoded array.

const RAW = import.meta.glob("/content/articles/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/** Strip matching double quotes and unescape \" \\ in a YAML scalar. */
const unq = (s: string): string => {
  const t = s.trim();
  if (t.startsWith('"') && t.endsWith('"')) {
    return t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  return t;
};

const parseFrontmatter = (fm: string): Record<string, string | string[]> => {
  const out: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of fm.split(/\r?\n/)) {
    const li = line.match(/^\s+-\s+(.*)$/);
    if (li && listKey) {
      (out[listKey] as string[]).push(unq(li[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (!kv) continue;
    if (kv[2] === "") {
      listKey = kv[1];
      out[listKey] = [];
    } else {
      listKey = null;
      out[kv[1]] = unq(kv[2]);
    }
  }
  return out;
};

const mdToBlocks = (md: string): ArticleBlock[] => {
  const blocks: ArticleBlock[] = [];
  // 段落以空行分隔;段内保持顺序处理
  for (const chunk of md.split(/\n\s*\n/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    let items: string[] = [];
    const flushItems = () => {
      if (items.length) { blocks.push({ type: "ul", items }); items = []; }
    };
    for (const line of lines) {
      if (/^##\s+/.test(line)) {
        flushItems();
        blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") });
      } else if (/^[-*]\s+/.test(line)) {
        items.push(line.replace(/^[-*]\s+/, ""));
      } else {
        flushItems();
        blocks.push({ type: "p", text: line });
      }
    }
    flushItems();
  }
  return blocks;
};

const isCanonicalArticlePath = (filePath: string): boolean =>
  /\/[-a-z0-9]+\.md$/i.test(filePath);

const ALL_ARTICLES: (Article & { locale: Locale })[] = Object.entries(RAW)
  .filter(([filePath]) => isCanonicalArticlePath(filePath))
  .map(([file, raw]): (Article & { locale: Locale }) | null => {
    // Accept both LF (localized files created in Git) and CRLF (older English
    // CMS files created on Windows). A strict LF-only parser silently dropped
    // every English article while the translated copies continued to load.
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) return null;
    const fm = parseFrontmatter(m[1]);
    const cover = String(fm.cover || "");
    const localeMatch = file.match(/\/content\/articles\/(ar|fr|ru|es|pt)\//);
    return {
      slug: String(fm.slug || ""),
      title: String(fm.title || ""),
      seoTitle: String(fm.seoTitle || ""),
      description: String(fm.description || ""),
      category: (String(fm.category || "Buying Guide") as ArticleCategory),
      date: String(fm.date || ""),
      dateLabel: String(fm.dateLabel || ""),
      readMins: Number(fm.readMins || 6),
      cover: `${BASE}images/${cover.replace(/^\/?(images\/)?/, "")}`,
      excerpt: String(fm.excerpt || ""),
      keywords: Array.isArray(fm.keywords) ? fm.keywords : [],
      body: mdToBlocks(m[2].trim()),
      locale: (localeMatch?.[1] as Locale | undefined) ?? "en",
    };
  })
  .filter((a): a is Article => !!a && !!a.slug && !!a.date);

// Scheduled publishing: articles with a future date stay hidden until the daily
// rebuild on/after that date. Dates compare as UTC ISO strings on both the CI
// build and the client, so visibility is consistent everywhere.
const TODAY = new Date().toISOString().slice(0, 10);
export const articlesForLocale = (locale: Locale): Article[] => ALL_ARTICLES
  .filter((a) => a.locale === locale && a.date <= TODAY)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const ARTICLES: Article[] = articlesForLocale("en");

export const getArticle = (slug: string, locale: Locale = "en"): Article | undefined =>
  articlesForLocale(locale).find((a) => a.slug === slug) ?? ARTICLES.find((a) => a.slug === slug);

const topicTokens = (article: Article): Set<string> => {
  const text = [article.title, article.category, ...article.keywords].join(" ").toLowerCase();
  return new Set(
    text
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 2 && !["and", "for", "the", "with", "from", "vs"].includes(token))
  );
};

export const relatedArticles = (slug: string, n = 3, locale: Locale = "en"): Article[] => {
  const pool = articlesForLocale(locale);
  const current = pool.find((article) => article.slug === slug) ?? getArticle(slug, locale);
  if (!current) return [];
  const currentTokens = topicTokens(current);

  return pool
    .filter((article) => article.slug !== slug)
    .map((article) => {
      const overlap = [...topicTokens(article)].filter((token) => currentTokens.has(token)).length;
      const sharedKeywords = article.keywords.filter((keyword) =>
        current.keywords.some((candidate) => candidate.toLowerCase() === keyword.toLowerCase())
      ).length;
      const score = overlap * 2 + sharedKeywords * 5 + (article.category === current.category ? 3 : 0);
      return { article, score };
    })
    .sort((a, b) => b.score - a.score || b.article.date.localeCompare(a.article.date))
    .slice(0, n)
    .map(({ article }) => article);
};
