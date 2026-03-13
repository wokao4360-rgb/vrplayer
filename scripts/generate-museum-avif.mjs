#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function getArg(name, fallback = '') {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  return process.argv[index + 1] || fallback;
}

const configPath = path.resolve(getArg('--config', 'public/config.json'));
const museumId = getArg('--museum');
const force = process.argv.includes('--force');

if (!museumId) {
  console.error('[museum-avif] 缺少 --museum');
  process.exit(1);
}

if (!fs.existsSync(configPath)) {
  console.error(`[museum-avif] 配置不存在: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const museum = config.museums.find((item) => item.id === museumId);

if (!museum) {
  console.error(`[museum-avif] 找不到 museum: ${museumId}`);
  process.exit(1);
}

for (const scene of museum.scenes) {
  const manifest = scene.panoTiles?.manifest;
  if (!manifest || typeof manifest !== 'string') {
    continue;
  }

  const tileDir = path.resolve('public', path.dirname(manifest).replace(/^\//, ''));
  const result = spawnSync(
    process.execPath,
    [
      'scripts/convert-tiles-avif.mjs',
      '--in',
      tileDir,
      '--out',
      tileDir,
      ...(force ? ['--force'] : []),
    ],
    { stdio: 'inherit' },
  );

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log(`[museum-avif] ${museumId} AVIF 块图生成完成`);
