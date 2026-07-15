import sharp from 'sharp';
import { statSync, existsSync } from 'node:fs';
const jobs = [
  ['public/项目案例/埃及新行政首都CBD项目1.jpg', 'public/images/proj-egypt-cbd.webp', 1400, 80],
  ['public/项目案例/巴巴多斯粮食中心项目1.jpg', 'public/images/proj-barbados.webp', 1400, 78],
  ['public/项目案例/莫桑比克综合体项目1.jpg', 'public/images/proj-mozambique.webp', 1400, 78],
  ['public/项目案例/埃及开罗圆弧酒店1.jpg', 'public/images/proj-cairo-hotel.webp', 1400, 78],
  ['public/项目案例/沙特阿拉伯吉赞工业城F-7006别墅项目5.jpg', 'public/images/proj-saudi-villa.webp', 1400, 78],
];
for (const [src, out, w, q] of jobs) {
  if (!existsSync(src)) { console.log('SKIP', src); continue; }
  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(out);
  console.log(`${out.split('/').pop()} ${Math.round(statSync(out).size/1024)} KB`);
}
