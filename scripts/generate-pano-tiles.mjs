#!/usr/bin/env node
/**
 * 全景瓦片生成脚本（固定 512 tile / 4 级 1x1/2x1/4x2/8x4）
 * 用法：
 *   node scripts/generate-pano-tiles.mjs --in public/assets/panos/demo.jpg --out public/assets/panos/tiles/yhc-dongwu3
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
let input = null;
let output = null;
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--in') input = args[i + 1];
  if (args[i] === '--out') output = args[i + 1];
}

if (!input || !output) {
  console.error('[tiles] 缺少参数，请使用 --in 源图 --out 输出目录');
  process.exit(1);
}

const tileSize = 512;
const levels = [
  { z: 0, cols: 1, rows: 1 },
  { z: 1, cols: 2, rows: 1 },
  { z: 2, cols: 4, rows: 2 },
  { z: 3, cols: 8, rows: 4 },
];

async function main() {
  const absIn = path.resolve(input);
  const absOut = path.resolve(output);
  if (!fs.existsSync(absIn)) {
    console.error(`[tiles] 源文件不存在: ${absIn}`);
    process.exit(1);
  }
  fs.mkdirSync(absOut, { recursive: true });

  const img = sharp(absIn);
  const meta = await img.metadata();
  if (!meta.width || !meta.height) {
    console.error('[tiles] 读取图片尺寸失败');
    process.exit(1);
  }

  for (const level of levels) {
    const levelDir = path.join(absOut, `z${level.z}`);
    fs.mkdirSync(levelDir, { recursive: true });
    const targetW = level.cols * tileSize;
    const targetH = level.rows * tileSize;
    const resized = img.clone().resize({ width: targetW, height: targetH, fit: 'fill' });
    const buffer = await resized.jpeg({ quality: 90 }).toBuffer();
    const levelImg = sharp(buffer);

    for (let y = 0; y < level.rows; y += 1) {
      for (let x = 0; x < level.cols; x += 1) {
        const left = x * tileSize;
        const top = y * tileSize;
        const extractW = Math.min(tileSize, targetW - left);
        const extractH = Math.min(tileSize, targetH - top);
        const tilePath = path.join(levelDir, `${x}_${y}.jpg`);
        const tile = levelImg.clone().extract({ left, top, width: extractW, height: extractH });
        await tile.jpeg({ quality: 90 }).toFile(tilePath);
      }
    }
    console.log(`[tiles] 生成 level z${level.z} -> ${level.cols}x${level.rows} tiles`);
  }

  const manifest = {
    type: 'equirect-tiles',
    tileSize,
    levels,
    baseUrl: normalizePath(path.relative(path.resolve('public'), absOut)).startsWith('.')
      ? `/${normalizePath(path.relative(path.resolve('public'), absOut)).replace(/^\.+/, '')}`
      : `/${normalizePath(path.relative(path.resolve('public'), absOut))}`,
  };
  fs.writeFileSync(path.join(absOut, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('[tiles] manifest 写入完成');
}

function normalizePath(p) {
  return p.split(path.sep).join('/');
}

main().catch((err) => {
  console.error('[tiles] 生成失败', err);
  process.exit(1);
});
