import sharp from 'sharp';
import { statSync, existsSync } from 'node:fs';

// [src, out, maxW, quality]
const jobs = [
  ['public/images/标杆项目/北京大兴国际机场.jpg', 'public/images/landmark-daxing.webp', 1400, 78],
  ['public/images/标杆项目/杭州亚运会.jpg', 'public/images/landmark-asiangames.webp', 1400, 78],
  ['public/images/标杆项目/中央部委住宅.jpg', 'public/images/landmark-govhousing.webp', 1400, 78],
  ['public/images/proj-s-8.jpg', 'public/images/landmark-metro.webp', 1400, 78],
  ['public/images/top500-2.png', 'public/images/top500-2.webp', 1000, 82],
  ['public/images/top500-3.png', 'public/images/top500-3.webp', 1000, 82],
  ['public/images/top500-4.png', 'public/images/top500-4.webp', 1000, 82],
  ['public/images/top500-5.jpg', 'public/images/top500-5.webp', 1000, 82],
  ['public/images/yizhai-2.jpg', 'public/images/yizhai-2.webp', 1000, 80],
  ['public/images/yizhai-3.jpg', 'public/images/yizhai-3.webp', 1000, 80],
];

let before = 0, after = 0;
for (const [src, out, w, q] of jobs) {
  if (!existsSync(src)) { console.log('SKIP (missing):', src); continue; }
  before += statSync(src).size;
  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(out);
  after += statSync(out).size;
  console.log(`${out.split('/').pop().padEnd(24)} ${Math.round(statSync(out).size/1024)} KB`);
}
console.log(`\nTOTAL ${Math.round(before/1024)} KB -> ${Math.round(after/1024)} KB`);
