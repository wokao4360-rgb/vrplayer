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
  console.error('[museum-ktx2] 缺少 --museum');
  process.exit(1);
}

if (!fs.existsSync(configPath)) {
  console.error(`[museum-ktx2] 配置不存在: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const museum = config.museums.find((item) => item.id === museumId);

if (!museum) {
  console.error(`[museum-ktx2] 找不到 museum: ${museumId}`);
  process.exit(1);
}

for (const scene of museum.scenes) {
  if (!scene.pano || typeof scene.pano !== 'string') {
    console.warn(`[museum-ktx2] 跳过 ${scene.id}，缺少 pano`);
    continue;
  }

  const input = path.resolve('public', scene.pano.replace(/^\/+/, ''));
  const outputDir = path.resolve('public/assets/panos/tiles', museumId, scene.id);
  const manifestPath = path.join(outputDir, 'manifest.json');

  if (!force && fs.existsSync(manifestPath)) {
    console.log(`[museum-ktx2] 跳过 ${scene.id}，manifest 已存在`);
    continue;
  }

  const generateResult = spawnSync(
    process.execPath,
    ['scripts/generate-pano-tiles.mjs', '--in', input, '--out', outputDir],
    { stdio: 'inherit' },
  );
  if (generateResult.status !== 0) {
    process.exit(generateResult.status || 1);
  }

  const convertArgs = ['scripts/convert-tiles-ktx2.mjs', '--in', outputDir, '--out', outputDir];
  if (force) convertArgs.push('--force');
  const convertResult = spawnSync(process.execPath, convertArgs, {
    stdio: 'inherit',
  });
  if (convertResult.status !== 0) {
    process.exit(convertResult.status || 1);
  }
}

console.log(`[museum-ktx2] ${museumId} KTX2 块图生成完成`);
