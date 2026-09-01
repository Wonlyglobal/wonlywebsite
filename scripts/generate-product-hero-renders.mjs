import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public/images/catalog-2026/hero-renders");
const sampleCutout = path.join(outputDir, "s80-max-cutout.png");

await fs.mkdir(outputDir, { recursive: true });

const width = 2400;
const height = 1350;

// TapNow provides only the empty studio. Product pixels come from the
// catalogue so controls, handles and mechanical details cannot be redrawn.
const product = await sharp(sampleCutout)
  // Keep only the two catalogue panels. The source PNG contains transparent
  // canvas pixels which `trim` can misread as black edge rules.
  .extract({ left: 185, top: 90, width: 320, height: 590 })
  .resize(1050, 1240, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .sharpen({ sigma: 0.7 })
  .png()
  .toBuffer();

const studioGradient = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="studio" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#eee8df"/>
        <stop offset="0.72" stop-color="#e1d7ca"/>
        <stop offset="1" stop-color="#cfc0ad"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#studio)"/>
  </svg>
`);

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 238, g: 232, b: 223, alpha: 1 },
  },
})
  .composite([
    { input: studioGradient, blend: "over" },
    // The hero image is a standalone card beside the page copy, so the real
    // product—not unused negative space—must be the visual focal point.
    { input: product, left: 675, top: 55 },
  ])
  .webp({ quality: 92, effort: 5 })
  .toFile(path.join(outputDir, "s80-max.webp"));

console.log("Generated S80 Max approval sample with a neutral champagne studio gradient and exact catalogue product pixels.");
