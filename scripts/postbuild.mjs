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
const TODAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const shell = readFileSync(src, 'utf8');

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const renderInline = (value = '') => {
  const text = String(value);
  const token = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let html = '';
  let cursor = 0;
  for (const match of text.matchAll(token)) {
    const index = match.index ?? 0;
    html += escapeHtml(text.slice(cursor, index));
    const part = match[0];
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const safeHref = /^(?:\/|https?:\/\/)/.test(href) ? href : '#';
      html += `<a href="${escapeHtml(safeHref)}">${escapeHtml(label)}</a>`;
    } else if (part.startsWith('**')) {
      html += `<strong>${escapeHtml(part.slice(2, -2))}</strong>`;
    } else {
      html += `<em>${escapeHtml(part.slice(1, -1))}</em>`;
    }
    cursor = index + part.length;
  }
  return html + escapeHtml(text.slice(cursor));
};

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
    blocks.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
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
      blocks.push(`<p>${renderInline(line)}</p>`);
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

const PRIORITY_LANDING_PAGES = [
  {
    route: '/security-door-manufacturer/',
    title: 'Security Door Manufacturer & OEM Supplier | WONLY',
    description: 'Source steel, cast-aluminium and fire-rated security doors from WONLY for distribution, residential and commercial projects with OEM/ODM support.',
    eyebrow: 'Manufacturer & OEM',
    h1: 'Security Door Manufacturer for Global Projects',
    lead: 'Work directly with a security door manufacturer covering engineered doorsets, custom finishes, smart-lock integration, project documentation and export delivery.',
    sections: [
      ['A Manufacturing Partner From Specification to Delivery', 'WONLY manufactures security doors for residential, hospitality, commercial and institutional projects. The range covers steel and cast-aluminium entrance doors, fire-rated configurations, smart doors and coordinated lock options.'],
      ['What Buyers Should Define Before Quotation', 'Provide the destination market, opening schedule, quantity, security target, fire and acoustic requirements, finish, smart-lock integration and export delivery plan.'],
      ['From Requirement to Delivery', 'Review the proposed doorset, drawings and compliance scope; approve samples and a reference specification; then inspect, package and deliver with installation and handover documentation.'],
    ],
    faq: [
      ['Does WONLY support OEM and private-label security doors?', 'Yes. Branding, finish, configuration and packaging can be reviewed against production, certification and minimum-order requirements.'],
      ['Which security door types can be supplied?', 'The portfolio includes steel and cast-aluminium security doors, smart doors, fire-rated project doors and application-specific entrance solutions.'],
    ],
  },
  {
    route: '/smart-door-manufacturer/',
    title: 'Smart Door Manufacturer for Projects & Distribution | WONLY',
    description: 'Source integrated smart doors with biometric entry, sensing, automatic opening and project engineering from WONLY, a global smart door manufacturer.',
    eyebrow: 'Integrated Smart Entry',
    h1: 'Smart Door Manufacturer for Connected Entrances',
    lead: 'Specify the door, lock, sensors, power, emergency access and whole-home connectivity as one coordinated entrance system.',
    sections: [
      ['Smart Entry Works Best as One Engineered System', 'A smart door is more than a conventional leaf fitted with an electronic lock. Structure, sensing distance, motorised opening, anti-pinch protection, power backup, network behaviour and mechanical emergency access must work together.'],
      ['What Buyers Should Define Before Quotation', 'Define the user journey, door construction, access methods, power and connectivity, safety behaviour and the local service model before selecting a platform.'],
      ['From Requirement to Delivery', 'Select a platform and confirm the door, lock, sensor, power and integration boundary; approve a working sample; then plan production, commissioning materials, spares and after-sales handover.'],
    ],
    faq: [
      ['Can WONLY supply a complete smart door rather than only a lock?', 'Yes. WONLY coordinates the physical doorset and smart-entry functions as one product platform.'],
      ['How is access retained during a power or network failure?', 'The specified configuration should include documented battery, backup-power and mechanical emergency-access paths.'],
    ],
  },
  {
    route: '/smart-lock-oem-odm/',
    title: 'Smart Lock OEM & ODM Manufacturer | WONLY',
    description: 'Build a private-label fingerprint, face or palm-vein smart lock range with WONLY OEM/ODM engineering, sampling, production and export support.',
    eyebrow: 'Private Label Programme',
    h1: 'Smart Lock OEM & ODM Manufacturing',
    lead: 'Develop a market-ready smart-lock line with verified hardware, biometric options, branding, packaging and scalable production support.',
    sections: [
      ['Define the Market Before Selecting the Lock', 'A reliable OEM/ODM programme starts with the door type, target price band, user flow, climate, credentials, connectivity and local service model—not a cosmetic logo change at the end.'],
      ['What Buyers Should Define Before Quotation', 'Confirm the target segment, door compatibility, credential mix, brand package, compliance and privacy requirements, quality controls and after-sales responsibility.'],
      ['From Requirement to Delivery', 'Select the base platform, confirm engineering and compliance scope, validate samples for fit and reliability, then release production with inspection criteria and support documents.'],
    ],
    faq: [
      ['What can be customised in an OEM smart lock?', 'Depending on the platform, options may include logo, colour, access methods, mortise preparation, packaging, manuals and selected software settings.'],
      ['Can WONLY match a smart lock to an existing door range?', 'Yes. Door thickness, preparation, mortise, handing, wiring and installation details must be reviewed before selection.'],
    ],
  },
  {
    route: '/solutions/acoustic-stc-entrance-doors/',
    title: 'Acoustic & STC-Rated Entrance Doors for Projects | WONLY',
    description: 'Specify acoustic entrance doors for apartments, hotels and premium projects with STC targets, seals, thresholds, hardware and installation coordinated by WONLY.',
    eyebrow: 'Acoustic Door Systems',
    h1: 'Acoustic and STC-Rated Entrance Doors',
    lead: 'Coordinate the complete opening around a measurable sound-control target instead of treating the door leaf as an isolated acoustic product.',
    sections: [
      ['Acoustic Performance Belongs to the Complete Opening', 'STC or Rw performance depends on the tested door, frame, perimeter seals, threshold, glazing, hardware preparation and installation.'],
      ['What Buyers Should Define Before Quotation', 'State the rating system and target, wall and frame construction, seal strategy, hardware preparation, conflicting fire or egress requirements and site acceptance method.'],
      ['Evidence Before Award', 'Compare the proposed opening with the test specimen, approve seal-detail drawings and define installation and field-verification checkpoints.'],
    ],
    faq: [
      ['Is STC the same as Rw?', 'No. They are different rating systems and should not be treated as numerically interchangeable without an acoustic consultant review.'],
      ['Does a laboratory rating guarantee site performance?', 'No. Field performance also depends on wall interfaces, installation quality, gaps, seals and adjacent construction.'],
    ],
  },
  {
    route: '/products/security-doors/fire-rated/',
    title: 'Fire-Rated Security Door Manufacturer for Projects | WONLY',
    description: 'Specify fire-rated security doors for residential and commercial projects with documentation review, hardware coordination and bulk delivery support from WONLY.',
    eyebrow: 'Project Doors',
    h1: 'Fire-Rated Security Doors for Project Specifications',
    lead: 'Coordinate fire resistance, forced-entry protection, hardware and installation as one documented doorset for residential, hospitality and commercial projects.',
    sections: [
      ['Fire Rating Belongs to the Tested Assembly', 'The leaf, frame, seals, hinges, lock, closer, glazing and installation method must match the documented assembly.'],
      ['What Buyers Should Define Before Quotation', 'State the jurisdiction, test standard, rated duration, opening schedule, wall type, hardware, access-control needs and required submittal package.'],
      ['Evidence Before Award', 'Verify the report scope against the exact proposed configuration and approve shop drawings, hardware matrix, labels, installation instructions and maintenance requirements.'],
    ],
    faq: [
      ['Is every security door automatically fire-rated?', 'No. Fire resistance requires separate evidence for the complete doorset and intended configuration.'],
      ['Can access control be added?', 'Often yes, but the selected hardware and preparation must remain within the approved assembly or be reviewed by the responsible authority.'],
    ],
  },
  {
    route: '/solutions/coastal-corrosion-resistant-security-doors/',
    title: 'Coastal Corrosion-Resistant Security Doors | WONLY',
    description: 'Specify corrosion-resistant security doors for coastal villas and projects with material, finish, hardware, salt-exposure and maintenance requirements reviewed by WONLY.',
    eyebrow: 'Coastal Project Doors',
    h1: 'Coastal and Corrosion-Resistant Security Doors',
    lead: 'Select the complete doorset for salt, humidity, UV and cleaning exposure—not only a decorative finish described as weather resistant.',
    sections: [
      ['Durability Starts With the Exposure Category', 'Direct salt spray, prevailing weather, sheltered wet zones, humidity, UV, cleaning chemicals and maintenance frequency influence the required material and finish system.'],
      ['What Buyers Should Define Before Quotation', 'Document exposure, compatible base materials, finish layers, hardware durability, drainage details and the maintenance plan.'],
      ['Evidence Before Award', 'Review material declarations, finish specifications, hardware compatibility, applicable corrosion evidence, approved samples and maintenance instructions.'],
    ],
    faq: [
      ['Is aluminium automatically suitable for every coastal project?', 'No. Alloy, surface preparation, coating, hardware compatibility and maintenance must match the actual exposure.'],
      ['Can coastal doors include smart locks?', 'Yes, but electronic modules, cable entries, seals, mechanical components and backup access require coordinated moisture protection.'],
    ],
  },
  {
    route: '/solutions/commercial-steel-security-doors/',
    title: 'Commercial Steel Security Doors for Projects | WONLY',
    description: 'Specify commercial steel security doors for offices, hotels, apartments and public buildings with coordinated ratings, hardware, access control and project delivery.',
    eyebrow: 'Commercial Door Systems',
    h1: 'Commercial Steel Security Doors for Building Projects',
    lead: 'Turn the building risk strategy into coordinated steel doorsets, hardware, access control, fire and egress requirements for every opening.',
    sections: [
      ['Specify the Opening, Not a Generic Steel Door', 'Commercial entrances, service routes, plant rooms, offices and secure back-of-house openings face different traffic, attack, fire and egress conditions.'],
      ['What Buyers Should Define Before Quotation', 'Issue the opening schedule, risk zones, performance criteria, hardware sets, access-control matrix, finishes, quantities and delivery batches.'],
      ['Evidence Before Award', 'Verify the complete doorset, configuration-specific reports, hardware and controls matrix, approved sample, inspection plan and handover record.'],
    ],
    faq: [
      ['Are commercial steel security doors automatically fire-rated?', 'No. Forced-entry, fire, smoke and egress are separate requirements. Where several apply, evidence must cover the proposed complete assembly.'],
      ['Can access control and panic hardware be combined?', 'Often yes, but the operating logic, free egress, fire-alarm response, power-loss state and approved hardware configuration must be coordinated.'],
    ],
  },
];

function renderStaticRoute({ route, title, description, body, jsonLd, alternates = '' }) {
  const canonical = `${SITE}${route}`;
  let html = shell
    .replace(/<html\b[^>]*>/i, '<html lang="en" dir="ltr">')
    .replace(/<link\s+rel="alternate"[^>]*>\s*/gi, '')
    .replace('</head>', `${alternates}${jsonLd ? `\n<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
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

function renderEnglishPriorityRoutes() {
  for (const page of PRIORITY_LANDING_PAGES) {
    const faq = page.faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } }));
    const body = `<main id="seo-priority-page" style="max-width:980px;margin:0 auto;padding:48px 24px;font-family:Arial,sans-serif;color:#221f20"><article><p>${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.lead)}</p>${page.sections.map(([heading, text]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p></section>`).join('')}<section><h2>Procurement Questions</h2>${page.faq.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join('')}</section><p><a href="/contact">Discuss Your Requirement</a></p></article></main>`;
    renderStaticRoute({
      ...page,
      body,
      jsonLd: [
        { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.description, url: `${SITE}${page.route}` },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` }, { '@type': 'ListItem', position: 2, name: page.h1, item: `${SITE}${page.route}` }] },
      ],
    });
  }

  const published = readdirSync(ARTICLE_DIR)
    .filter((name) => /^[-a-z0-9]+\.md$/i.test(name))
    .map((name) => parseArticle(path.join(ARTICLE_DIR, name)))
    .filter((article) => article.meta.slug && article.meta.date && article.meta.date <= TODAY)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
  const insightsTitle = 'News & Insights — Security Door & Smart Lock Guides | WONLY';
  const insightsDescription = 'WONLY News & Insights: buying guides, product technology, market outlooks and company updates for security door and smart lock distributors and project buyers.';
  const articleLinks = published.map(({ meta }) => `<article><p>${escapeHtml(meta.category)} · ${escapeHtml(meta.dateLabel || meta.date)}</p><h2><a href="/insights/${escapeHtml(meta.slug)}/">${escapeHtml(meta.title)}</a></h2><p>${escapeHtml(meta.excerpt)}</p></article>`).join('');
  const insightAlternates = [...LOCALES.map((locale) => `<link rel="alternate" hreflang="${locale}" href="${SITE}${locale === 'en' ? '' : `/${locale}`}/insights/" />`), `<link rel="alternate" hreflang="x-default" href="${SITE}/insights/" />`].join('\n');
  renderStaticRoute({
    route: '/insights/',
    title: insightsTitle,
    description: insightsDescription,
    alternates: `${insightAlternates}\n`,
    body: `<main id="seo-insights-index" style="max-width:1100px;margin:0 auto;padding:48px 24px;font-family:Arial,sans-serif;color:#221f20"><header><p>News & Insights</p><h1>Guides, Technology & Market Insight</h1><p>Practical knowledge for security door and smart lock distributors, project buyers and partners.</p></header><section>${articleLinks}</section></main>`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'Blog', name: 'WONLY News & Insights', url: `${SITE}/insights/`, description: insightsDescription },
  });
  console.log(`postbuild: generated ${PRIORITY_LANDING_PAGES.length + 1} English priority route shells`);
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
renderEnglishPriorityRoutes();
