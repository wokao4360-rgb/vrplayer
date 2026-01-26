#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PANO_DIR = path.join(PUBLIC_DIR, 'assets', 'panos');
const TILE_ROOT = path.join(PUBLIC_DIR, 'assets', 'panos_tiles');
const CONFIG_PATH = path.join(PUBLIC_DIR, 'config.json');

const LEVEL_PRESETS = [
  { id: 'low', maxWidth: 2048, tileSize: 512 },
  { id: 'high', maxWidth: 4096, tileSize: 512 },
];

function readJsonSafe(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function parseTileScenesFromConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return [];
  const cfg = readJsonSafe(CONFIG_PATH);
  const result = new Set();
  for (const museum of cfg.museums || []) {
    for (const scene of museum.scenes || []) {
      const candidate = scene.panoTiles?.manifest || scene.panoTileset || scene.pano || scene.panoLow;
      if (typeof candidate === 'string' && candidate.startsWith('tileset:')) {
        const raw = candidate.replace('tileset:', '');
        const parts = raw.split('/').filter(Boolean);
        const name = parts.length >= 2 ? parts[parts.length - 2] : parts[parts.length - 1]?.replace('tileset.json', '');
        if (name) result.add(name);
      }
    }
  }
  return Array.from(result);
}

async function generateTilesFor(name) {
  const sourcePath = path.join(PANO_DIR, `${name}.jpg`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`[tiles] 源文件不存在: ${sourcePath}`);
    return false;
  }

  const outDir = path.join(TILE_ROOT, name);
  const metaPath = path.join(outDir, 'tileset.json');
  ensureDir(outDir);

  const image = sharp(sourcePath);
  const meta = await image.metadata();
  if (!meta.width || !meta.height) {
    console.error(`[tiles] 读取尺寸失败: ${sourcePath}`);
    return false;
  }

  const tileset = {
    name,
    type: 'equirect',
    width: meta.width,
    height: meta.height,
    format: 'jpg',
    levels: [],
  };

  for (const preset of LEVEL_PRESETS) {
    const scale = Math.min(1, preset.maxWidth / meta.width);
    const levelWidth = Math.round(meta.width * scale);
    const levelHeight = Math.round(meta.height * scale);
    const cols = Math.ceil(levelWidth / preset.tileSize);
    const rows = Math.ceil(levelHeight / preset.tileSize);
    const levelDir = path.join(outDir, preset.id);

    ensureDir(levelDir);

    const resizedBuffer = await image.resize({ width: levelWidth }).jpeg({ quality: 90 }).toBuffer();
    const levelSharp = sharp(resizedBuffer);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const left = col * preset.tileSize;
        const top = row * preset.tileSize;
        const width = Math.min(preset.tileSize, levelWidth - left);
        const height = Math.min(preset.tileSize, levelHeight - top);
        const tilePath = path.join(levelDir, `${row}_${col}.jpg`);
        await levelSharp.extract({ left, top, width, height }).jpeg({ quality: 90 }).toFile(tilePath);
      }
    }

    tileset.levels.push({
      id: preset.id,
      width: levelWidth,
      height: levelHeight,
      tileSize: preset.tileSize,
      cols,
      rows,
      path: `./${preset.id}/{row}_{col}.jpg`,
    });
  }

  fs.writeFileSync(metaPath, JSON.stringify(tileset, null, 2), 'utf-8');
  console.log(`[tiles] 生成完成: ${metaPath}`);
  return true;
}

async function run() {
  const arg = process.argv[2];
  let targets = [];
  if (arg && arg !== 'all') {
    targets = [arg];
  } else {
    targets = parseTileScenesFromConfig();
    if (targets.length === 0) {
      console.warn('[tiles] 配置中未找到 tileset 场景，尝试 demo');
      targets = ['demo'];
    }
  }

  ensureDir(TILE_ROOT);

  for (const name of targets) {
    await generateTilesFor(name);
  }
}

run().catch((err) => {
  console.error('[tiles] 生成失败:', err);
  process.exit(1);
});
