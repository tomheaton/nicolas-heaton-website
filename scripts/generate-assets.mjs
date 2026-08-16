import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Resolves both fill="currentColor" and stroke="currentColor" (the monogram ring is stroked).
const readSvg = (file, color) =>
  readFileSync(new URL(file, import.meta.url), "utf8").replaceAll("currentColor", color);

const lockupSvg = readSvg("../src/assets/logo.svg", "#F5F0E6");
const monogramIvorySvg = readSvg("../src/assets/monogram.svg", "#F5F0E6");
// Pad the 813-wide monogram out to a 1125 square so icons scale without distortion.
const monogramOnyxSquareSvg = readSvg("../src/assets/monogram.svg", "#141210")
  .replace('viewBox="0 0 813 1125"', 'viewBox="0 0 1125 1125"')
  .replace(/<svg[^>]*>/, '$&<g transform="translate(156,0)">')
  .replace("</svg>", "</g></svg>");

const ONYX = { r: 20, g: 18, b: 16 };
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

async function compositeCentered(source, canvasW, canvasH, fitHeight, background = ONYX) {
  const resized = source.resize({ height: fitHeight });
  const { data, info } = await resized.png().toBuffer({ resolveWithObject: true });
  const left = Math.round((canvasW - info.width) / 2);
  const top = Math.round((canvasH - info.height) / 2);
  return sharp({
    create: { width: canvasW, height: canvasH, channels: 3, background },
  }).composite([{ input: data, left, top }]);
}

mkdirSync(new URL("../public/", import.meta.url), { recursive: true });

await (await compositeCentered(sharp(Buffer.from(lockupSvg)), 1200, 630, 460))
  .png()
  .toFile(out("logo.png"));

await (await compositeCentered(sharp(Buffer.from(monogramIvorySvg)), 512, 512, 340))
  .png()
  .toFile(out("monogram.png"));

writeFileSync(out("favicon.svg"), monogramOnyxSquareSvg);

const iconSizes = [64, 48, 32, 16];
const pngs = [];
let offset = 6 + iconSizes.length * 16;
const entries = [];
for (const size of iconSizes) {
  const png = await sharp(Buffer.from(monogramOnyxSquareSvg))
    .resize({ width: size, height: size })
    .png()
    .toBuffer();
  pngs.push(png);
  entries.push(
    Buffer.from([
      size,
      size,
      0,
      0,
      1,
      0,
      32,
      0,
      png.length & 0xff,
      (png.length >> 8) & 0xff,
      (png.length >> 16) & 0xff,
      (png.length >> 24) & 0xff,
      offset & 0xff,
      (offset >> 8) & 0xff,
      (offset >> 16) & 0xff,
      (offset >> 24) & 0xff,
    ]),
  );
  offset += png.length;
}

const header = Buffer.from([0, 0, 1, 0, iconSizes.length, 0]);
const favicon = Buffer.concat([header, ...entries, ...pngs]);
writeFileSync(out("favicon.ico"), favicon);

console.log(
  "Generated public/logo.png, public/monogram.png, public/favicon.svg, public/favicon.ico",
);
