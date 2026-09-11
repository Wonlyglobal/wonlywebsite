// SPA fallback for GitHub Pages + BrowserRouter.
// GitHub Pages returns 404.html for any path it can't find on disk (e.g. a
// deep link like /products/security-doors refreshed directly). By making
// 404.html a copy of index.html, the app still boots and React Router renders
// the correct route from window.location — so refreshes never 404.
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const src = 'dist/index.html';
const dest = 'dist/404.html';

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log(`postbuild: created ${dest} from ${src}`);
} else {
  console.warn(`postbuild: ${src} not found — did the build run?`);
  process.exit(1);
}

// Codeup's production job runs `npm run build` and packages dist/ immediately.
// Keep scheduled articles and their crawler-facing HTML inside that standard
// build instead of depending on a separate Chromium prerender step.
execFileSync(process.execPath, ['scripts/sync-article-sitemap.mjs'], { stdio: 'inherit' });
copyFileSync('public/sitemap.xml', 'dist/sitemap.xml');

const SITE = 'https://www.wonlyglobal.com';
const ARTICLE_DIR = 'content/articles';
const LOCALES = ['en', 'ar', 'fr', 'ru', 'es', 'pt'];
const RTL = new Set(['ar']);
const TODAY = new Date().toISOString().slice(0, 10);
const shell = readFileSync(src, 'utf8');

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const unquote = (value = '') => {
  const trimmed = value.trim();
  return trimmed.startsWith('"') && trimmed.endsWith('"')
    ? trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
    : trimmed;
};

function parseArticle(file) {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: invalid frontmatter`);
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (item && item[2]) meta[item[1]] = unquote(item[2]);
  }
  return { meta, body: match[2].trim() };
}

function articleBody(article) {
  const blocks = [];
  let list = [];
  const flush = () => {
    if (!list.length) return;
    blocks.push(`<ul>${list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
    list = [];
  };
  for (const rawLine of article.body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) { flush(); continue; }
    if (line.startsWith('## ')) {
      flush();
      blocks.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ''));
    } else {
      flush();
      blocks.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  flush();
  return blocks.join('\n');
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

// The production pipeline packages the Vite build without running Chromium.
// Articles already get static HTML below; give every Portuguese core route an
// equivalent crawler-facing shell so it never falls back to the English home
// canonical before React boots.
function renderPortugueseCorePages() {
  const seoSource = readFileSync('src/lib/seo-locales.ts', 'utf8');
  const ptBlock = seoSource.match(/\n\s*pt:\s*\{([\s\S]*?)\n\s*\},\n\};/)?.[1];
  if (!ptBlock) throw new Error('postbuild: Portuguese SEO map not found');
  const entries = [...ptBlock.matchAll(/"([^"]+)":\s*\{\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)"\s*\}/g)];
  if (entries.length !== 20) throw new Error(`postbuild: expected 20 Portuguese core SEO entries, found ${entries.length}`);

  for (const [, baseRoute, title, description] of entries) {
    const normalizedBase = baseRoute === '/' ? '/' : `${baseRoute}/`;
    const route = baseRoute === '/' ? '/pt/' : `/pt${normalizedBase}`;
    const canonical = `${SITE}${route}`;
    const alternates = [
      ...LOCALES.map((locale) => `<link rel="alternate" hreflang="${locale}" href="${SITE}${locale === 'en' ? normalizedBase : `/${locale}${normalizedBase}`}" />`),
      `<link rel="alternate" hreflang="x-default" href="${SITE}${normalizedBase}" />`,
    ].join('\n');
    let html = shell
      .replace(/<html\b[^>]*>/i, '<html lang="pt" dir="ltr">')
      .replace(/<link\s+rel="alternate"[^>]*>\s*/gi, '')
      .replace('</head>', `${alternates}\n</head>`);
    html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
    html = replaceTag(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
    html = replaceTag(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
    html = replaceTag(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
    html = replaceTag(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
    html = replaceTag(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" />`);
    const output = path.join('dist', route.replace(/^\//, ''), 'index.html');
    mkdirSync(path.dirname(output), { recursive: true });
    writeFileSync(output, html, 'utf8');
  }
  console.log(`postbuild: generated ${entries.length} Portuguese core route shells`);
}

function renderArticle(article, locale) {
  const { meta } = article;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const route = `${prefix}/insights/${meta.slug}/`;
  const canonical = `${SITE}${route}`;
  const cover = `${SITE}/images/${String(meta.cover || '').replace(/^\/?(images\/)?/, '')}`;
  const alternates = [
    ...LOCALES.map((lang) => {
      const langPrefix = lang === 'en' ? '' : `/${lang}`;
      return `<link rel="alternate" hreflang="${lang}" href="${SITE}${langPrefix}/insights/${meta.slug}/" />`;
    }),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/insights/${meta.slug}/" />`,
  ].join('\n');
  const jsonLd = escapeHtml(JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: cover,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'WONLY' },
    publisher: { '@type': 'Organization', name: 'WONLY' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  })).replace(/&quot;/g, '"');
  const staticArticle = `<main id="seo-article" style="max-width:900px;margin:0 auto;padding:48px 24px;font-family:Arial,sans-serif;color:#221f20"><article><p>${escapeHtml(meta.category)}</p><h1>${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.dateLabel)}</p><img src="${escapeHtml(cover)}" alt="${escapeHtml(meta.title)}" style="max-width:100%;height:auto" /><p>${escapeHtml(meta.excerpt)}</p>${articleBody(article)}</article></main>`;

  let html = shell
    .replace(/<html\b[^>]*>/i, `<html lang="${locale}" dir="${RTL.has(locale) ? 'rtl' : 'ltr'}">`)
    .replace(/<link\s+rel="alternate"[^>]*>\s*/gi, '')
    .replace('</head>', `${alternates}\n<script type="application/ld+json">${jsonLd}</script>\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${staticArticle}</div>`);
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.seoTitle)}</title>`);
  html = replaceTag(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = replaceTag(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceTag(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(meta.seoTitle)}" />`);
  html = replaceTag(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = replaceTag(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" />`);
  html = replaceTag(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${cover}" />`);
  return { route, html };
}

let rendered = 0;
for (const locale of LOCALES) {
  const directory = locale === 'en' ? ARTICLE_DIR : path.join(ARTICLE_DIR, locale);
  for (const name of readdirSync(directory).filter((item) => /^[-a-z0-9]+\.md$/i.test(item))) {
    const article = parseArticle(path.join(directory, name));
    if (!article.meta.slug || !article.meta.date || article.meta.date > TODAY) continue;
    const { route, html } = renderArticle(article, locale);
    const output = path.join('dist', route.replace(/^\//, ''), 'index.html');
    mkdirSync(path.dirname(output), { recursive: true });
    writeFileSync(output, html, 'utf8');
    rendered++;
  }
}

console.log(`postbuild: generated ${rendered} scheduled article HTML files through ${TODAY}`);
renderPortugueseCorePages();
