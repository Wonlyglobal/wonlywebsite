// Inject sitemap <url> entries for date-scheduled articles that are now live.
//
// Reads src/lib/articles.ts, extracts every { slug, date } pair, and for each
// article whose publish date has arrived (UTC) adds
//   https://www.wonlyglobal.com/insights/<slug>/
// to public/sitemap.xml unless it is already there. Future-dated articles are
// skipped, so unpublished URLs never leak into the sitemap or the prerender.
// Idempotent — safe to run on every CI build.

import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://www.wonlyglobal.com";
const ARTICLES_TS = "src/lib/articles.ts";
const SITEMAP = "public/sitemap.xml";

const src = readFileSync(ARTICLES_TS, "utf8");
const today = new Date().toISOString().slice(0, 10);

// Pair each slug with the first date that follows it (fields are adjacent in
// every article object, so a joint scan keeps them correctly matched).
const pairs = [...src.matchAll(/slug: "([^"]+)"[\s\S]*?date: "(\d{4}-\d{2}-\d{2})"/g)]
  .map((m) => ({ slug: m[1], date: m[2] }));

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
