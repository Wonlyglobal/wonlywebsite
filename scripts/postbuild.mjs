// SPA fallback for GitHub Pages + BrowserRouter.
// GitHub Pages returns 404.html for any path it can't find on disk (e.g. a
// deep link like /products/security-doors refreshed directly). By making
// 404.html a copy of index.html, the app still boots and React Router renders
// the correct route from window.location — so refreshes never 404.
import { copyFileSync, existsSync } from 'node:fs';

const src = 'dist/index.html';
const dest = 'dist/404.html';

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log(`postbuild: created ${dest} from ${src}`);
} else {
  console.warn(`postbuild: ${src} not found — did the build run?`);
  process.exit(1);
}
