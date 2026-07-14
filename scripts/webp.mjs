import sharp from 'sharp';
import { statSync, existsSync } from 'node:fs';

// [src, out, maxW, maxH, quality]
const jobs = [
  ['public/videos/hero-door-poster.jpg', 'public/videos/hero-door-poster.webp', 1920, null, 76],
  ['public/images/factory-2.jpg', 'public/images/factory-2.webp', 1920, null, 78],
  ['public/images/factory-1.jpg', 'public/images/factory-1.webp', 1600, null, 78],
  ['public/images/factory-line-a.jpg', 'public/images/factory-line-a.webp', 1600, null, 78],
  ['public/images/factory-line-b.jpg', 'public/images/factory-line-b.webp', 1600, null, 78],
  ['public/images/factory-abb.jpg', 'public/images/factory-abb.webp', 1600, null, 78],
  ['public/images/yizhai-1.jpg', 'public/images/yizhai-1.webp', 1200, null, 78],
  ['public/images/proj-1.jpg', 'public/images/proj-1.webp', 1600, null, 78],
  ['public/images/proj-s-5.jpg', 'public/images/proj-s-5.webp', 1400, null, 78],
  ['public/images/proj-s-7.jpg', 'public/images/proj-s-7.webp', 1600, null, 78],
  // PNGs with alpha -> webp (keeps transparency)
  ['public/images/alu-k300pro.png', 'public/images/alu-k300pro.webp', 900, 1600, 82],
  ['public/images/alu-k300max.png', 'public/images/alu-k300max.webp', 900, 1200, 82],
  ['public/images/alu-t200.png', 'public/images/alu-t200.webp', 900, 1600, 82],
  ['public/images/alu-40.png', 'public/images/alu-40.webp', 900, 1600, 82],
  ['public/images/lock-s80.png', 'public/images/lock-s80.webp', 900, null, 82],
  ['public/images/wood-2.png', 'public/images/wood-2.webp', 800, 1200, 82],
  ['public/images/proj-2.png', 'public/images/proj-2.webp', 1200, null, 80],
  ['public/images/partners-re.png', 'public/images/partners-re.webp', 2400, null, 84],
  ['public/images/logo-trim.png', 'public/images/logo-trim.webp', 700, null, 90],
];

let before = 0, after = 0;
for (const [src, out, w, h, q] of jobs) {
  if (!existsSync(src)) { console.log('SKIP (missing):', src); continue; }
  before += statSync(src).size;
  await sharp(src).resize({ width: w, height: h, fit: 'inside', withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(out);
  const kb = Math.round(statSync(out).size / 1024);
  after += statSync(out).size;
  console.log(`${out.split('/').pop().padEnd(24)} ${kb} KB`);
}
console.log(`\nTOTAL  ${Math.round(before/1024)} KB  ->  ${Math.round(after/1024)} KB`);
