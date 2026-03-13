#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
let inDir = '';
let outDir = '';
let force = false;
let quality = 58;

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--in') inDir = args[i + 1];
  if (args[i] === '--out') outDir = args[i + 1];
  if (args[i] === '--force') force = true;
  if (args[i] === '--quality') quality = Number.parseInt(args[i + 1] || '58', 10);
}

if (!inDir) {
  console.error('[avif] 缺少 --in');
  process.exit(1);
}

const absIn = path.resolve(inDir);
const absOut = outDir ? path.resolve(outDir) : absIn;
const manifestPath = path.join(absIn, 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error(`[avif] manifest 不存在: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

if (!manifest.levels || !manifest.tileSize || !manifest.baseUrl) {
  console.error('[avif] manifest 格式不合法');
  process.exit(1);
}

fs.mkdirSync(absOut, { recursive: true });

for (const level of manifest.levels) {
  const levelDir = path.join(absIn, `z${level.z}`);
  const outLevelDir = path.join(absOut, `z${level.z}`);
  fs.mkdirSync(outLevelDir, { recursive: true });

  for (let row = 0; row < level.rows; row += 1) {
    for (let col = 0; col < level.cols; col += 1) {
      const baseName = `${col}_${row}`;
      const srcJpg = path.join(levelDir, `${baseName}.jpg`);
      const srcPng = path.join(levelDir, `${baseName}.png`);
      const src = fs.existsSync(srcJpg) ? srcJpg : fs.existsSync(srcPng) ? srcPng : '';
      if (!src) continue;

      const dst = path.join(outLevelDir, `${baseName}.avif`);
      if (!force && fs.existsSync(dst)) continue;

      await sharp(src)
        .avif({ quality, effort: 6, chromaSubsampling: '4:2:0' })
        .toFile(dst);
    }
  }
}

const outManifest = {
  ...manifest,
  tileFormat: 'avif',
  lowFallbackFormat: 'jpg',
  highFallbackFormats: ['ktx2', 'jpg'],
  baseUrl: resolveBaseUrl(absOut),
};

fs.writeFileSync(path.join(absOut, 'manifest.json'), JSON.stringify(outManifest, null, 2), 'utf8');
console.log('[avif] manifest 更新完成');

function resolveBaseUrl(absOutDir) {
  const rel = path.relative(path.resolve('public'), absOutDir).split(path.sep).join('/');
  if (rel.startsWith('.')) {
    const cleaned = rel.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    return `/${cleaned}`;
  }
  return `/${rel}`;
}
