import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://www.wonlyglobal.com";
const tdk = JSON.parse(fs.readFileSync("content/settings/tdk.json", "utf8")).pages || [];
const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
const app = fs.readFileSync("src/App.tsx", "utf8");
const errors = [];
const warnings = [];
const normalized = (path) => path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
const seenPaths = new Set();
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const page of tdk) {
  const path = normalized(page.path || "");
  const title = (page.title || "").trim();
  const description = (page.description || "").trim();
  if (!title) errors.push(`${path}: missing title`);
  if (!description) errors.push(`${path}: missing description`);
  if (seenPaths.has(path)) errors.push(`${path}: duplicate TDK path`);
  seenPaths.add(path);
  if (title.length > 65) warnings.push(`${path}: title is ${title.length} characters`);
  if (title.length < 25 && !["/privacy/", "/terms/"].includes(path)) warnings.push(`${path}: title is only ${title.length} characters`);
  if (description.length > 170) warnings.push(`${path}: description is ${description.length} characters`);
  if (description.length < 110 && !["/privacy/", "/terms/"].includes(path)) warnings.push(`${path}: description is only ${description.length} characters`);
  if (seenTitles.has(title)) errors.push(`${path}: duplicate title also used by ${seenTitles.get(title)}`);
  if (seenDescriptions.has(description)) errors.push(`${path}: duplicate description also used by ${seenDescriptions.get(description)}`);
  seenTitles.set(title, path);
  seenDescriptions.set(description, path);
  if (!sitemap.includes(`<loc>${SITE_URL}${path}</loc>`)) warnings.push(`${path}: missing from sitemap.xml`);
}

const staticRoutes = [...app.matchAll(/<Route\s+path="(\/[^"*:]+)"/g)].map((m) => normalized(m[1]));
const legacyRedirects = new Set(["/products/door/metal-door/"]);
for (const route of staticRoutes) {
  if (route.startsWith("/product/") || legacyRedirects.has(route) || route === "/prototype/" || route === "/home-old/") continue;
  if (!seenPaths.has(route)) warnings.push(`${route}: route has no CMS TDK entry`);
}

const today = new Date().toISOString().slice(0, 10);
for (const file of fs.readdirSync("content/articles").filter((name) => name.endsWith(".md"))) {
  const source = fs.readFileSync(path.join("content/articles", file), "utf8");
  const field = (name) => source.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?$`, "m"))?.[1]?.trim() || "";
  const slug = field("slug");
  const date = field("date");
  const title = field("seoTitle");
  const description = field("description");
  if (!slug || !date || !title || !description) {
    errors.push(`${file}: incomplete article SEO frontmatter`);
    continue;
  }
  if (title.length > 70) warnings.push(`/insights/${slug}/: article title is ${title.length} characters`);
  if (description.length > 175) warnings.push(`/insights/${slug}/: article description is ${description.length} characters`);
  if (date <= today && !sitemap.includes(`<loc>${SITE_URL}/insights/${slug}/</loc>`)) warnings.push(`/insights/${slug}/: published article missing from sitemap.xml`);
}

for (const claim of ["30+ countries", "certified worldwide", "Trusted by Huawei", "China's No.1"]) {
  for (const page of tdk) {
    if (`${page.title} ${page.description}`.includes(claim)) warnings.push(`${normalized(page.path)}: review claim “${claim}”`);
  }
}

console.log(`TDK pages: ${tdk.length}`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.log(`- ${warning}`));
}
if (errors.length) {
  console.error(`Errors (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log("TDK check passed with no blocking errors.");
