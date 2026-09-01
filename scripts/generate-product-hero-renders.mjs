import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const background = path.join(root, "public/images/catalog-2026/hero-renders/tapnow-unified-background.webp");
const outputDir = path.join(root, "public/images/catalog-2026/hero-renders");

const products = [
  ["x70", "public/images/door/gallery/g1-front.jpg", "contain"],
  ["x50-pro", "public/images/catalog-2026/x50.webp", "cover"],
  ["t200", "public/images/catalog-2026/t200.webp", "contain"],
  ["s80", "public/images/lock-s80.webp", "transparent"],
  ["s80-max", "public/images/catalog-2026/s80.webp", "cover"],
  ["wood-custom", "public/images/catalog-2026/wood-custom.webp", "cover"],
  ["wood-minimalist", "public/images/catalog-2026/wood-minimalist.webp", "cover"],
  ["wood-pvc", "public/images/catalog-2026/wood-pvc.webp", "cover"],
  ["wood-solid", "public/images/catalog-2026/wood-solid.webp", "cover"],
  ["wood-aluminum", "public/images/catalog-2026/wood-aluminum.webp", "cover"],
];

await fs.mkdir(outputDir, { recursive: true });

const width = 2400;
const height = 1350;
const panelWidth = 1120;
const panelHeight = 1030;
const panelLeft = 1160;
const panelTop = 155;
const radius = 42;
const panelMask = Buffer.from(`<svg width="${panelWidth}" height="${panelHeight}"><rect width="100%" height="100%" rx="${radius}" fill="white"/></svg>`);
const border = Buffer.from(`<svg width="${width}" height="${height}"><rect x="${panelLeft - 2}" y="${panelTop - 2}" width="${panelWidth + 4}" height="${panelHeight + 4}" rx="${radius + 2}" fill="none" stroke="rgba(218,183,116,.7)" stroke-width="4"/></svg>`);

for (const [slug, input, mode] of products) {
  const base = sharp(background).resize(width, height, { fit: "cover" }).modulate({ saturation: 0.92, brightness: 0.9 });
  const overlays = [];

  if (mode === "transparent") {
    const product = await sharp(path.join(root, input))
      .resize(980, 1120, { fit: "contain" })
      .sharpen({ sigma: 0.8 })
      .png()
      .toBuffer();
    overlays.push({ input: product, left: 1280, top: 100 });
  } else {
    const fitted = await sharp(path.join(root, input))
      .resize(panelWidth, panelHeight, {
        fit: mode === "cover" ? "cover" : "contain",
        position: "centre",
        background: { r: 243, g: 238, b: 229, alpha: 1 },
      })
      .sharpen({ sigma: 0.65 })
      .png()
      .composite([{ input: panelMask, blend: "dest-in" }])
      .toBuffer();
    overlays.push({ input: fitted, left: panelLeft, top: panelTop });
    overlays.push({ input: border, left: 0, top: 0 });
  }

  await base
    .composite(overlays)
    .webp({ quality: 91, effort: 5 })
    .toFile(path.join(outputDir, `${slug}.webp`));
}

console.log(`Generated ${products.length} TapNow-based product hero renders in ${outputDir}`);
