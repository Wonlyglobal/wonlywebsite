import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const date = JSON.parse(readFileSync('dist/publication.json', 'utf8')).date;
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const routes = new Set([...sitemap.matchAll(/<loc>https:\/\/www.wonlyglobal.com([^<]+)<\/loc>/g)].map(m => m[1].replace(/\/$/, '') || '/'));
const covers = new Set();
let checked = 0;
for (const file of readdirSync('content/articles').filter(f => f.endsWith('.md'))) {
  for (const locale of ['en', 'ar', 'fr', 'ru', 'es', 'pt']) {
    const source = readFileSync(`content/articles/${locale === 'en' ? '' : locale + '/'}${file}`, 'utf8');
    const field = name => source.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?$`, 'm'))?.[1]?.trim();
    const slug = field('slug');
    const route = `${locale === 'en' ? '' : '/' + locale}/insights/${slug}`;
    const output = `dist${route}/index.html`;
    const published = field('date') <= date;
    assert.equal(routes.has(route), published, `Sitemap cutoff: ${route}`);
    assert.equal(existsSync(output), published, `Static HTML cutoff: ${route}`);
    const cover = 'public/' + field('cover').replace(/^\//, '');
    assert.ok(existsSync(cover), `Missing cover: ${cover}`);
    if (locale === 'en') {
      const hash = createHash('sha256').update(readFileSync(cover)).digest('hex');
      assert.ok(!covers.has(hash), `Duplicate cover: ${file}`);
      covers.add(hash);
    }
    if (!published) continue;
    const html = readFileSync(output, 'utf8');
    assert.ok(html.includes(`https://www.wonlyglobal.com${route}/`), `Canonical URL missing: ${route}`);
    assert.match(html, /<h1[ >]/, `H1 missing: ${route}`);
    assert.match(html, /application\/ld\+json/, `Structured data missing: ${route}`);
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const normalized = href.replace(/\/$/, '') || '/';
      assert.ok(routes.has(normalized) || existsSync('dist' + href), `Broken internal link ${route} -> ${href}`);
    }
    checked++;
  }
}
console.log(`Publication audit passed: cutoff ${date}, ${checked} six-language HTML pages, ${covers.size} unique covers; future URLs excluded.`);
