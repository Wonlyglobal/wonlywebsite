// Prerender each canonical route to a real static HTML file so GitHub Pages
// serves a 200 (not a 404) for deep links, and Google/social crawlers see
// per-page <title>/<meta>/content in the initial HTML.
//
// How it works: build first (dist/ exists), then this script starts a tiny
// static server over dist/ (with SPA fallback), launches headless Chromium via
// Playwright, visits every URL from dist/sitemap.xml, waits for the app to
// render + useSeo() to set the head, and writes the resulting HTML to
// dist/<route>/index.html. The SPA still boots on top (createRoot re-render),
// so interactivity is unchanged.
//
// Runs in CI only (see .github/workflows/deploy.yml) — `npm run build` stays
// browser-free for local/dev use.
import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const DIST = path.resolve('dist');
const PORT = 4321;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain',
  '.xml': 'application/xml', '.pdf': 'application/pdf', '.map': 'application/json',
};

function hasExt(p) {
  const last = p.split('/').pop() || '';
  return last.includes('.');
}

// Read the pristine shell once so serving it as the SPA fallback never depends
// on files this run has already written.
const shellPath = path.join(DIST, 'index.html');
if (!existsSync(shellPath)) {
  console.error('prerender: dist/index.html not found — run the build first.');
  process.exit(1);
}
const SHELL = await readFile(shellPath, 'utf8');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
        // Asset request (has a file extension) -> serve the real file if present.
        if (hasExt(urlPath)) {
          const filePath = path.join(DIST, urlPath);
          if (existsSync(filePath) && statSync(filePath).isFile()) {
            res.setHeader('Content-Type', MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
            createReadStream(filePath).pipe(res);
            return;
          }
          res.statusCode = 404;
          res.end('not found');
          return;
        }
        // Route request -> always serve the SPA shell with 200 so the app boots.
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(SHELL);
      } catch (err) {
        res.statusCode = 500;
        res.end('server error');
      }
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function getRoutes() {
  const smPath = path.join(DIST, 'sitemap.xml');
  const routes = new Set(['/']);
  if (existsSync(smPath)) {
    const xml = await readFile(smPath, 'utf8');
    const locs = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
    for (const raw of locs) {
      const url = raw.replace(/<\/?loc>/g, '').trim();
      try {
        const u = new URL(url);
        let p = u.pathname || '/';
        if (p.length > 1) p = p.replace(/\/$/, '');
        routes.add(p);
      } catch { /* ignore malformed */ }
    }
  }
  return [...routes];
}

function outFileFor(route) {
  if (route === '/' || route === '') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

async function main() {
  const routes = await getRoutes();
  console.log(`prerender: ${routes.length} routes to render`);
  const server = await startServer();
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  let ok = 0;
  const failed = [];
  for (const route of routes) {
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    // Block analytics/tag scripts: keeps prerender hits out of GA4/Clarity and
    // avoids background network that can stall load detection.
    const BLOCKED = ['googletagmanager.com', 'google-analytics.com', 'analytics.google.com',
      'clarity.ms', 'doubleclick.net', 'googleadservices.com', 'connect.facebook.net'];
    await page.route('**/*', (r) => {
      let host = '';
      try { host = new URL(r.request().url()).hostname; } catch { /* keep '' */ }
      if (BLOCKED.some((h) => host === h || host.endsWith('.' + h))) return r.abort();
      return r.continue();
    });
    try {
      // domcontentloaded (not networkidle) — the real gate is the app-rendered
      // check below, which is independent of any long-lived analytics sockets.
      await page.goto(ORIGIN + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
      // Wait until the app has mounted and useSeo() has set a title.
      await page.waitForFunction(() => {
        const root = document.getElementById('root');
        return !!root && root.children.length > 0 && !!document.title;
      }, { timeout: 20000 });
      // Give route-level useEffect (meta/canonical/jsonld) a beat to settle.
      await page.waitForTimeout(500);

      const html = await page.content();
      const title = await page.title();
      const out = outFileFor(route);
      await mkdir(path.dirname(out), { recursive: true });
      await writeFile(out, html, 'utf8');
      ok++;
      console.log(`  ok  ${route}  ->  ${path.relative(DIST, out)}  [${title.slice(0, 60)}]`);
    } catch (err) {
      failed.push(route);
      console.warn(`  FAIL ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`prerender: done — ${ok}/${routes.length} rendered, ${failed.length} failed`);
  if (failed.length) console.warn('prerender: failed routes:', failed.join(', '));
  // Non-fatal: any route we did render now serves a proper 200 page; routes that
  // failed simply keep the SPA 404-fallback behaviour. Only hard-fail if nothing
  // rendered at all (indicates a setup/browser problem worth surfacing in CI).
  if (ok === 0) {
    console.error('prerender: nothing rendered — failing the build.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('prerender: fatal', err);
  process.exit(1);
});
