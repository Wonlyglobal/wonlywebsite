import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { assertRouteHreflang } from './lib/hreflang.mjs';

const configured = JSON.parse(readFileSync('content/settings/route-languages.json', 'utf8'));
const actual = {};
for (const [, url] of readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)) {
  let route = new URL(url).pathname;
  const locale = route.match(/^\/(ar|fr|ru|es|pt)(?=\/)/)?.[1] || 'en';
  if (locale !== 'en') route = route.slice(locale.length + 1);
  (actual[route] ||= []).push(locale);
}
for (const [route, locales] of Object.entries(actual)) {
  const expected = route.startsWith('/insights/') ? ['en', 'ar', 'fr', 'ru', 'es', 'pt'] : configured[route];
  assert.ok(expected, `Missing language configuration: ${route}`);
  assert.deepEqual([...locales].sort(), [...expected].sort(), `Language mismatch: ${route}`);
}
for (const route of Object.keys(configured)) assert.ok(actual[route], `Stale route: ${route}`);
let checked = 0;
for (const [base, locales] of Object.entries(actual)) {
  for (const locale of locales) {
    const route = `${locale === 'en' ? '' : `/${locale}`}${base}`;
    const file = `dist${route}index.html`;
    if (!existsSync(file)) continue; // Non-static routes are checked after prerender.
    assertRouteHreflang(readFileSync(file, 'utf8'), route, locales);
    checked++;
  }
}
console.log(`Language menu/sitemap consistency passed: ${Object.keys(actual).length} routes`);
console.log(`Exact hreflang equivalents passed: ${checked} generated HTML pages`);
