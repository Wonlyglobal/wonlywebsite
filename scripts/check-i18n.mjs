import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.wonlyglobal.com";
const LOCALES = ["ar", "fr", "ru", "es"];
const ARTICLE_ROOT = "content/articles";
const errors = [];
const PUBLIC_ROUTES = [
  "/", "/about", "/projects", "/products/entrance-door", "/products/security-doors",
  "/products/security-doors/x70", "/products/wooden-doors", "/products/smart-locks",
  "/products/smart-locks/s80", "/products/smart-windows", "/products/whole-house",
  "/products/engineering-doors", "/products/medical-doors", "/products/yizhai-yishu",
  "/advantages", "/manufacturing-rd", "/global-strategy", "/partnership", "/contact", "/insights",
];

const frontmatter = (file) => {
  const source = fs.readFileSync(file, "utf8");
  const field = (name) => source.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?$`, "m"))?.[1]?.trim() || "";
  return { slug: field("slug"), title: field("title"), seoTitle: field("seoTitle"), description: field("description"), body: source.replace(/^---[\s\S]*?---\s*/, "").trim() };
};

const englishFiles = fs.readdirSync(ARTICLE_ROOT).filter((file) => file.endsWith(".md")).sort();
for (const file of englishFiles) {
  const raw = fs.readFileSync(path.join(ARTICLE_ROOT, file), "utf8");
  if (!/^---\r?\n[\s\S]*?\r?\n---\r?\n/.test(raw)) errors.push(`${file}: frontmatter is not accepted by the runtime parser`);
}
for (const file of englishFiles) {
  const english = frontmatter(path.join(ARTICLE_ROOT, file));
  for (const locale of LOCALES) {
    const localizedFile = path.join(ARTICLE_ROOT, locale, file);
    if (!fs.existsSync(localizedFile)) { errors.push(`${locale}/${file}: missing localized article`); continue; }
    const localized = frontmatter(localizedFile);
    for (const key of ["slug", "title", "seoTitle", "description", "body"]) if (!localized[key]) errors.push(`${locale}/${file}: missing ${key}`);
    if (localized.slug !== english.slug) errors.push(`${locale}/${file}: slug differs from English`);
    for (const key of ["title", "seoTitle", "description", "body"]) if (localized[key] === english[key]) errors.push(`${locale}/${file}: ${key} still equals English`);
  }
}

const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
const seo = fs.readFileSync("src/lib/seo.tsx", "utf8");
const seoLocales = fs.readFileSync("src/lib/seo-locales.ts", "utf8");
for (const route of PUBLIC_ROUTES) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const occurrences = [...seoLocales.matchAll(new RegExp(`"${escaped}"\\s*:`, "g"))].length;
  if (occurrences !== LOCALES.length) errors.push(`localized TDK: ${route} has ${occurrences}/${LOCALES.length} locale entries`);
}
for (const locale of ["en", ...LOCALES]) {
  const root = locale === "en" ? `${SITE}/` : `${SITE}/${locale}/`;
  if (!sitemap.includes(`<loc>${root}</loc>`)) errors.push(`sitemap: missing ${locale} homepage`);
  if (!sitemap.includes(`hreflang="${locale}"`)) errors.push(`sitemap: missing ${locale} hreflang`);
}
if (!sitemap.includes('hreflang="x-default"')) errors.push("sitemap: missing x-default hreflang");
if (seo.includes('upsertMeta("name", "robots", locale === "en"')) errors.push("SEO: legacy blanket noindex remains");
if (!seo.includes("for (const language of LANGUAGES)")) errors.push("SEO: full hreflang loop missing");

if (errors.length) {
  console.error(`i18n QA failed (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`i18n QA passed: ${englishFiles.length} articles × ${LOCALES.length} translations, sitemap and hreflang checks passed.`);
