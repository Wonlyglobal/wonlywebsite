import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.wonlyglobal.com";
const LOCALES = ["en", "ar", "fr", "ru", "es"];
const xml = fs.readFileSync("dist/sitemap.xml", "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const errors = [];

const routeFromUrl = (url) => new URL(url).pathname;
const fileForRoute = (route) => route === "/"
  ? path.join("dist", "index.html")
  : path.join("dist", route.replace(/^\//, ""), "index.html");
const localeForRoute = (route) => LOCALES.includes(route.split("/").filter(Boolean)[0])
  ? route.split("/").filter(Boolean)[0]
  : "en";
const baseRoute = (route) => route.replace(/^\/(ar|fr|ru|es)(?=\/|$)/, "") || "/";
const localUrl = (base, locale) => locale === "en"
  ? `${SITE}${base}`
  : `${SITE}/${locale}${base === "/" ? "/" : base}`;
const titleOf = (html) => html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";

for (const url of urls) {
  const route = routeFromUrl(url);
  const file = fileForRoute(route);
  if (!fs.existsSync(file)) { errors.push(`${route}: missing prerendered HTML`); continue; }
  const html = fs.readFileSync(file, "utf8");
  const locale = localeForRoute(route);
  const base = baseRoute(route);
  if (!html.includes(`href="${url}"`) || !html.includes('rel="canonical"')) errors.push(`${route}: canonical URL missing`);
  if (!/name="robots" content="index,follow"|content="index,follow" name="robots"/.test(html)) errors.push(`${route}: robots is not index,follow`);
  if (!html.includes(`<html lang="${locale}"`)) errors.push(`${route}: html lang is not ${locale}`);
  if (locale === "ar" && !html.includes('dir="rtl"')) errors.push(`${route}: Arabic page is not RTL`);

  const isLegal = base === "/privacy/" || base === "/terms/";
  const expectedLocales = isLegal ? ["en"] : LOCALES;
  for (const alternateLocale of expectedLocales) {
    if (!html.includes(`hreflang="${alternateLocale}"`) || !html.includes(`href="${localUrl(base, alternateLocale)}"`)) {
      errors.push(`${route}: missing ${alternateLocale} alternate`);
    }
  }
  if (!html.includes('hreflang="x-default"')) errors.push(`${route}: missing x-default alternate`);

  if (locale !== "en") {
    const englishFile = fileForRoute(base);
    if (fs.existsSync(englishFile) && titleOf(html) === titleOf(fs.readFileSync(englishFile, "utf8"))) {
      errors.push(`${route}: title still equals English`);
    }
  }
}

if (errors.length) {
  console.error(`prerender audit failed (${errors.length})`);
  errors.slice(0, 100).forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`prerender audit passed: ${urls.length} sitemap URLs have static HTML, canonical, robots, lang/dir and hreflang.`);
