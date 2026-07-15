import sharp from 'sharp';
import { statSync } from 'node:fs';
await sharp('public/images/factory door.png')
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile('public/images/door-factory.webp');
console.log('door-factory.webp', Math.round(statSync('public/images/door-factory.webp').size / 1024), 'KB');
