import assert from 'node:assert/strict';

const SITE = 'https://www.wonlyglobal.com';
const normalize = route => route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;

export function assertRouteHreflang(html, route, locales) {
  const base = normalize(route.replace(/^\/(ar|fr|ru|es|pt)(?=\/)/, '') || '/');
  const expected = locales.map(locale => [locale, `${SITE}${locale === 'en' ? '' : `/${locale}`}${base}`]);
  expected.push(['x-default', `${SITE}${base}`]);
  const actual = [];
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*["']([^"']*)["']/g)].map(([, key, value]) => [key.toLowerCase(), value]));
    if (attributes.rel?.toLowerCase() === 'alternate' && attributes.hreflang) {
      actual.push([attributes.hreflang, attributes.href]);
    }
  }
  const sort = entries => entries.sort((a, b) => a[0].localeCompare(b[0]));
  assert.deepEqual(sort(actual), sort(expected), `Incorrect language equivalents: ${route}`);
}

export function sitemapLanguageGroups(xml) {
  const groups = {};
  for (const [, url] of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const route = new URL(url).pathname;
    const locale = route.match(/^\/(ar|fr|ru|es|pt)(?=\/)/)?.[1] || 'en';
    const base = normalize(locale === 'en' ? route : route.slice(locale.length + 1));
    (groups[base] ||= []).push(locale);
  }
  return groups;
}
