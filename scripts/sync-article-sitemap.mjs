// Inject sitemap <url> entries for date-scheduled articles that are now live.
//
// Reads src/lib/articles.ts, extracts every { slug, date } pair, and for each
// article whose publish date has arrived (UTC) adds
//   https://www.wonlyglobal.com/insights/<slug>/
// to public/sitemap.xml unless it is already there. Future-dated articles are
// skipped, so unpublished URLs never leak into the sitemap or the prerender.
// Idempotent — safe to run on every CI build.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const SITE = "https://www.wonlyglobal.com";
const CONTENT_DIR = "content/articles";
const SITEMAP = "public/sitemap.xml";

const today = new Date().toISOString().slice(0, 10);

// One markdown file per article; slug + date live in the frontmatter.
const pairs = readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const src = readFileSync(`${CONTENT_DIR}/${f}`, "utf8");
    const slug = src.match(/^slug:\s*"?([^"\n]+)"?$/m)?.[1];
    const date = src.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?$/m)?.[1];
    return slug && date ? { slug, date } : null;
  })
  .filter(Boolean);

if (pairs.length === 0) {
  console.error("sync-article-sitemap: no articles found — aborting without changes");
  process.exit(0);
}

let sitemap = readFileSync(SITEMAP, "utf8");
let added = 0;

for (const { slug, date } of pairs) {
  if (date > today) continue; // not published yet
  const loc = `${SITE}/insights/${slug}/`;
  if (sitemap.includes(`<loc>${loc}</loc>`)) continue; // already present
  const entry =
    `  <url>\n` +
    `    <loc>${loc}</loc>\n` +
    `    <lastmod>${date}</lastmod>\n` +
    `    <changefreq>monthly</changefreq>\n` +
    `    <priority>0.6</priority>\n` +
    `  </url>\n`;
  sitemap = sitemap.replace("</urlset>", entry + "</urlset>");
  added++;
  console.log(`sitemap + /insights/${slug}/ (published ${date})`);
}

if (added > 0) writeFileSync(SITEMAP, sitemap);
console.log(`sync-article-sitemap: ${added} added, ${pairs.length} articles scanned, today=${today}`);
