import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public/images/category-renders");

const categories = [
  { name: "door", source: "public/images/alu-k300max.webp", width: 430, height: 840 },
  { name: "metal-door", source: "public/images/5products/nav-security-door.png", width: 520, height: 760 },
  { name: "wooden-door", source: "public/images/5products/nav-wooden-door.png", width: 520, height: 760 },
  { name: "smart-lock", source: "public/images/lock-s80.webp", width: 590, height: 760 },
  { name: "smart-window", source: "public/images/5products/dropdown-window.png", width: 660, height: 690 },
  { name: "whole-house", source: "public/images/5products/dropdown-control.png", width: 660, height: 690 },
];

const canvas = 1200;

await mkdir(outputDir, { recursive: true });

for (const category of categories) {
  const sourcePath = path.join(root, category.source);
  const product = await sharp(sourcePath)
    .resize(category.width, category.height, { fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();
  const metadata = await sharp(product).metadata();
  const left = Math.round((canvas - (metadata.width ?? category.width)) / 2);
  const top = Math.round((canvas - (metadata.height ?? category.height)) / 2 - 28);
  const shadowWidth = Math.max(240, Math.round((metadata.width ?? category.width) * 0.68));
  const shadowLeft = Math.round((canvas - shadowWidth) / 2);
  const shadowTop = Math.min(canvas - 105, top + (metadata.height ?? category.height) - 8);
  const shadow = Buffer.from(`
    <svg width="${canvas}" height="${canvas}" xmlns="http://www.w3.org/2000/svg">
      <defs><filter id="b"><feGaussianBlur stdDeviation="18"/></filter></defs>
      <ellipse cx="${shadowLeft + shadowWidth / 2}" cy="${shadowTop}" rx="${shadowWidth / 2}" ry="20" fill="#1c1917" opacity="0.11" filter="url(#b)"/>
    </svg>
  `);

  await sharp({ create: { width: canvas, height: canvas, channels: 4, background: "#ffffff" } })
    .composite([
      { input: shadow, top: 0, left: 0 },
      { input: product, top: Math.max(32, top), left },
    ])
    .webp({ quality: 92, effort: 6 })
    .toFile(path.join(outputDir, `${category.name}.webp`));
}

console.log(`Generated ${categories.length} category renders in ${outputDir}`);
