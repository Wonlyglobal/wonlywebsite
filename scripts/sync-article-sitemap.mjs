// Generate the production sitemap for all translated public routes and every
// article whose scheduled publication date has arrived. Each translated URL
// carries a complete hreflang cluster; English-only legal pages remain single.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const SITE = "https://www.wonlyglobal.com";
const CONTENT_DIR = "content/articles";
const SITEMAP = "public/sitemap.xml";
const LOCALES = ["en", "ar", "fr", "ru", "es", "pt"];
const ARTICLE_LOCALES = ["en", "ar", "fr", "ru", "es", "pt"];
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const routes = [
  ["/", "2026-08-11", "weekly", "1.0"],
  ["/about/", "2026-08-11", "monthly", "0.6"],
  ["/projects/", "2026-08-11", "monthly", "0.6"],
  ["/products/entrance-door/", "2026-08-11", "monthly", "0.7"],
  ["/products/security-doors/", "2026-08-11", "monthly", "0.9"],
  ["/products/security-doors/x70/", "2026-08-11", "monthly", "0.9"],
  ["/products/wooden-doors/", "2026-08-11", "monthly", "0.8"],
  ["/products/smart-locks/", "2026-08-11", "monthly", "0.8"],
  ["/products/smart-locks/s80/", "2026-08-11", "monthly", "0.8"],
  ["/products/smart-windows/", "2026-08-11", "monthly", "0.8"],
  ["/products/whole-house/", "2026-08-11", "monthly", "0.8"],
  ["/products/engineering-doors/", "2026-08-11", "monthly", "0.7"],
  ["/products/medical-doors/", "2026-08-11", "monthly", "0.7"],
  ["/products/yizhai-yishu/", "2026-08-11", "monthly", "0.7"],
  ["/advantages/", "2026-08-11", "monthly", "0.8"],
  ["/manufacturing-rd/", "2026-08-11", "monthly", "0.8"],
  ["/global-strategy/", "2026-08-11", "monthly", "0.7"],
  ["/partnership/", "2026-08-11", "monthly", "0.7"],
  ["/contact/", "2026-08-11", "monthly", "0.7"],
  ["/insights/", "2026-08-11", "weekly", "0.7"],
];

const englishOnlyRoutes = [
  ["/security-door-manufacturer/", "2026-09-07", "monthly", "0.9"],
  ["/smart-door-manufacturer/", "2026-09-07", "monthly", "0.9"],
  ["/smart-lock-oem-odm/", "2026-09-07", "monthly", "0.9"],
  ["/products/smart-locks/s80-max/", "2026-09-01", "monthly", "0.9"],
  ...["s60-max", "s60-pro", "s50-pro", "s58-pro", "p10-pro", "s922-max", "s936"].map((model) => [`/products/smart-locks/${model}/`, "2026-09-01", "monthly", "0.8"]),
  ...["1-0", "1-0-pro", "2-0", "3-0"].map((level) => [`/products/metal-doors/${level}/`, "2026-09-02", "monthly", "0.9"]),
  ...["3-0-pro", "3-0-max", "4-0", "5-0"].map((level) => [`/products/smart-doors/${level}/`, "2026-09-02", "monthly", "0.9"]),
  ...["x60-max", "x60-pro", "x50-max"].map((model) => [`/products/security-doors/${model}/`, "2026-09-01", "monthly", "0.9"]),
  ["/products/security-doors/x50-pro/", "2026-09-01", "monthly", "0.9"],
  ["/products/security-doors/t200/", "2026-09-01", "monthly", "0.9"],
  ["/products/wooden-doors/custom/", "2026-09-01", "monthly", "0.8"],
  ["/products/wooden-doors/minimalist/", "2026-09-01", "monthly", "0.8"],
  ["/products/wooden-doors/pvc/", "2026-09-01", "monthly", "0.8"],
  ["/products/wooden-doors/solid-wood/", "2026-09-01", "monthly", "0.8"],
  ["/products/wooden-doors/aluminum-alloy/", "2026-09-01", "monthly", "0.8"],
  ["/products/security-doors/cast-aluminium/", "2026-08-25", "monthly", "0.8"],
  ["/products/security-doors/fire-rated/", "2026-08-25", "monthly", "0.8"],
  ["/solutions/hotel-security-doors/", "2026-08-25", "monthly", "0.8"],
  ["/solutions/villa-security-doors/", "2026-08-25", "monthly", "0.8"],
  ["/global/saudi-arabia/security-doors/", "2026-08-25", "monthly", "0.8"],
  ["/global/uae/security-doors/", "2026-08-25", "monthly", "0.8"],
];

const localizedPath = (route, locale) => locale === "en"
  ? route
  : route === "/" ? `/${locale}/` : `/${locale}${route}`;

const alternates = (route, localeSet = LOCALES) => [
  ...localeSet.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE}${localizedPath(route, locale)}" />`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${route}" />`,
].join("\n");

const entry = (route, lastmod, changefreq, priority, localized = true, localeSet = localized ? LOCALES : ["en"]) => {
  return localeSet.map((locale) => [
    "  <url>",
    `    <loc>${SITE}${localizedPath(route, locale)}</loc>`,
    localized ? alternates(route, localeSet) : "",
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].filter(Boolean).join("\n")).join("\n");
};

const articles = readdirSync(CONTENT_DIR)
  .filter((file) => /^[-a-z0-9]+\.md$/i.test(file))
  .map((file) => {
    const source = readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const slug = source.match(/^slug:\s*"?([^"\n]+)"?$/m)?.[1]?.trim();
    const date = source.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?$/m)?.[1];
    if (!slug || !date) throw new Error(`${file}: missing slug or date`);
    return { slug, date };
  })
  .filter(({ date }) => date <= today)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const body = [
  ...routes.map(([route, lastmod, changefreq, priority]) => entry(route, lastmod, changefreq, priority)),
  ...englishOnlyRoutes.map(([route, lastmod, changefreq, priority]) => entry(route, lastmod, changefreq, priority, false)),
  entry("/privacy/", "2026-07-27", "yearly", "0.3", false),
  entry("/terms/", "2026-07-27", "yearly", "0.3", false),
  ...articles.map(({ slug, date }) => entry(`/insights/${slug}/`, date, "monthly", "0.6", true, ARTICLE_LOCALES)),
].join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
writeFileSync(SITEMAP, xml);
console.log(`sync-article-sitemap: ${routes.length} translated routes, ${articles.length} published articles, ${LOCALES.length} locales, today=${today}`);
