import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const config = JSON.parse(readFileSync('content/settings/navigation.json', 'utf8'));
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const routes = new Set([...sitemap.matchAll(/<loc>https:\/\/www.wonlyglobal.com([^<]+)<\/loc>/g)].map(m => m[1].replace(/\/$/, '') || '/'));
let checked = 0;
function visit(items) {
  for (const item of items) {
    if (item.href?.startsWith('/')) {
      const route = item.href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
      assert(!route.startsWith('/product/'), `Legacy redirect link: ${route}`);
      assert(routes.has(route), `Link absent from canonical sitemap: ${route}`);
      checked++;
    }
    visit(item.children || item.links || []);
  }
}
visit(config.nav);
visit(config.footer);
const home = readFileSync('src/pages/prototype/Index.tsx', 'utf8');
assert(home.includes('= SITE_FOOTER;'), 'Homepage must share footer configuration');
assert(!/(?:href|to):?\s*[=]?\s*"\/product\//.test(home), 'Homepage has legacy product links');
assert(config.footer.some(column => column.links.some(link => link.href === '/insights')), 'Footer must link to Insights');
console.log(`Navigation audit passed: ${checked} internal links resolve to sitemap routes; shared footer includes Insights.`);
