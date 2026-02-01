import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function getArg(name, fallback = '') {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] || fallback;
}

const input = getArg('--in');
const output = getArg('--out');
const width = Number(getArg('--width', '2048')) || 2048;
const quality = Number(getArg('--quality', '82')) || 82;

if (!input || !output) {
  console.error('用法: node scripts/generate-pano-low.mjs --in <input.jpg> --out <output.jpg> [--width 2048]');
  process.exit(1);
}

const inPath = path.resolve(input);
const outPath = path.resolve(output);

await fs.promises.mkdir(path.dirname(outPath), { recursive: true });

await sharp(inPath)
  .resize({ width, withoutEnlargement: true })
  .jpeg({ quality, mozjpeg: true })
  .toFile(outPath);

console.log(`[pano-low] ${path.relative(process.cwd(), inPath)} -> ${path.relative(process.cwd(), outPath)} (w=${width}, q=${quality})`);
