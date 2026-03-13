#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const args = process.argv.slice(2);
let input = '';
let output = '';
let lowFaceSize = 512;
let highTileSize = 1024;
let highGrid = 2;

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--in') input = args[i + 1];
  if (args[i] === '--out') output = args[i + 1];
  if (args[i] === '--lowFaceSize') lowFaceSize = Number.parseInt(args[i + 1] || '512', 10);
  if (args[i] === '--highTileSize') highTileSize = Number.parseInt(args[i + 1] || '1024', 10);
  if (args[i] === '--highGrid') highGrid = Number.parseInt(args[i + 1] || '2', 10);
}

if (!input || !output) {
  console.error('[cubemap] 缺少参数，请使用 --in 源图 --out 输出目录');
  process.exit(1);
}

const FACE_LAYOUT = {
  r: { col: 0, row: 0 },
  l: { col: 1, row: 0 },
  u: { col: 2, row: 0 },
  d: { col: 0, row: 1 },
  f: { col: 1, row: 1 },
  b: { col: 2, row: 1 },
};

const FACE_IDS = ['f', 'r', 'b', 'l', 'u', 'd'];

async function main() {
  const absIn = path.resolve(input);
  const absOut = path.resolve(output);
  if (!fs.existsSync(absIn)) {
    console.error(`[cubemap] 源文件不存在: ${absIn}`);
    process.exit(1);
  }

  const highFaceSize = highTileSize * highGrid;
  const atlasWidth = highFaceSize * 3;
  const atlasHeight = highFaceSize * 2;
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vrplayer-cubemap-'));
  const atlasPath = path.join(tempDir, 'atlas.png');

  fs.mkdirSync(absOut, { recursive: true });
  fs.mkdirSync(path.join(absOut, 'low'), { recursive: true });
  fs.mkdirSync(path.join(absOut, 'high'), { recursive: true });

  const ffmpeg = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      absIn,
      '-vf',
      `v360=input=equirect:output=c3x2:out_forder=rludfb:w=${atlasWidth}:h=${atlasHeight}`,
      '-frames:v',
      '1',
      atlasPath,
    ],
    { stdio: 'inherit' },
  );

  if (ffmpeg.status !== 0 || !fs.existsSync(atlasPath)) {
    console.error('[cubemap] ffmpeg 立方体投影失败');
    process.exit(ffmpeg.status || 1);
  }

  const atlas = sharp(atlasPath);
  for (const face of FACE_IDS) {
    const slot = FACE_LAYOUT[face];
    const faceImage = atlas
      .clone()
      .extract({
        left: slot.col * highFaceSize,
        top: slot.row * highFaceSize,
        width: highFaceSize,
        height: highFaceSize,
      });

    await faceImage
      .clone()
      .resize({ width: lowFaceSize, height: lowFaceSize, fit: 'fill' })
      .jpeg({ quality: 82 })
      .toFile(path.join(absOut, 'low', `${face}.jpg`));

    const highFaceDir = path.join(absOut, 'high', face);
    fs.mkdirSync(highFaceDir, { recursive: true });

    const highFaceBuffer = await faceImage
      .clone()
      .resize({ width: highFaceSize, height: highFaceSize, fit: 'fill' })
      .jpeg({ quality: 90 })
      .toBuffer();
    const highFace = sharp(highFaceBuffer);

    for (let row = 0; row < highGrid; row += 1) {
      for (let col = 0; col < highGrid; col += 1) {
        await highFace
          .clone()
          .extract({
            left: col * highTileSize,
            top: row * highTileSize,
            width: highTileSize,
            height: highTileSize,
          })
          .jpeg({ quality: 90 })
          .toFile(path.join(highFaceDir, `${col}_${row}.jpg`));
      }
    }
  }

  const manifest = {
    type: 'cubemap-tiles',
    baseUrl: resolveBaseUrl(absOut),
    faces: FACE_IDS,
    lowFaceSize,
    highTileSize,
    highGrid,
    tileFormat: 'jpg',
    highWarmupTileBudget: 12,
  };

  fs.writeFileSync(path.join(absOut, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('[cubemap] manifest 写入完成');
}

function resolveBaseUrl(absOutDir) {
  const rel = path.relative(path.resolve('public'), absOutDir).split(path.sep).join('/');
  if (rel.startsWith('.')) {
    const cleaned = rel.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    return `/${cleaned}`;
  }
  return `/${rel}`;
}

main().catch((err) => {
  console.error('[cubemap] 生成失败', err);
  process.exit(1);
});
