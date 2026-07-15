import sharp from 'sharp';
import { statSync } from 'node:fs';
// One door "cell": door #2 centred, edges at the gaps between doors so it tiles.
// Source is 5504x3072.
await sharp('public/images/factory door.png')
  .extract({ left: 1569, top: 0, width: 1183, height: 3072 })
  .resize({ width: 560 })
  .webp({ quality: 84, effort: 6 })
  .toFile('public/images/door-cell.webp');
console.log('door-cell.webp', Math.round(statSync('public/images/door-cell.webp').size / 1024), 'KB');
