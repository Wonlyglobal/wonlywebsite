import sharp from 'sharp';
import { statSync, existsSync } from 'node:fs';
const jobs = [
  ['public/images/智能锁/效果图.png', 'public/images/lock-s80-render.webp', 1600, 84],
  ['public/images/智能锁/S80-2.png', 'public/images/lock-s80-alt.webp', 1400, 84],
];
for (const [src, out, w, q] of jobs) {
  if (!existsSync(src)) { console.log('SKIP', src); continue; }
  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(out);
  console.log(`${out.split('/').pop()} ${Math.round(statSync(out).size/1024)} KB`);
}
