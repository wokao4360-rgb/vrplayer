#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function getArg(name, fallback = '') {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  return process.argv[index + 1] || fallback;
}

const root = path.resolve(getArg('--root', 'public/assets/panos'));
const width = Number(getArg('--width', '480')) || 480;
const quality = Number(getArg('--quality', '54')) || 54;

function collectThumbFiles(dir, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectThumbFiles(fullPath, output);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('-thumb.jpg')) {
      output.push(fullPath);
    }
  }
  return output;
}

if (!fs.existsSync(root)) {
  console.error(`[thumbs] root 不存在: ${root}`);
  process.exit(1);
}

const files = collectThumbFiles(root).sort();
if (files.length === 0) {
  console.warn('[thumbs] 没找到任何 *-thumb.jpg');
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const before = fs.statSync(file).size;
  totalBefore += before;

  const buffer = await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toBuffer();

  const tempPath = `${file}.tmp`;
  await fs.promises.writeFile(tempPath, buffer);
  fs.renameSync(tempPath, file);

  const after = fs.statSync(file).size;
  totalAfter += after;
  console.log(
    `[thumbs] ${path.relative(process.cwd(), file)} ${before} -> ${after} bytes (w=${width}, q=${quality})`,
  );
}

console.log(
  `[thumbs] 完成 ${files.length} 张，total ${totalBefore} -> ${totalAfter} bytes`,
);
