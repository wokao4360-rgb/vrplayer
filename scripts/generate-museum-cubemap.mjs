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
  console.error('[museum-cubemap] 缺少 --museum');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const museum = config.museums.find((item) => item.id === museumId);
if (!museum) {
  console.error(`[museum-cubemap] 找不到 museum: ${museumId}`);
  process.exit(1);
}

for (const scene of museum.scenes) {
  const manifest = scene.panoTiles?.manifest;
  if (!manifest || !scene.pano) {
    continue;
  }

  const input = path.resolve('public', scene.pano.replace(/^\/+/, ''));
  const outDir = path.resolve('public', path.dirname(manifest).replace(/^\/+/, ''));

  const generate = spawnSync(
    process.execPath,
    ['scripts/generate-pano-cubemap.mjs', '--in', input, '--out', outDir],
    { stdio: 'inherit' },
  );
  if (generate.status !== 0) {
    process.exit(generate.status || 1);
  }

  const toKtx2 = spawnSync(
    process.execPath,
    [
      'scripts/convert-tiles-ktx2.mjs',
      '--in',
      outDir,
      '--out',
      outDir,
      ...(force ? ['--force'] : []),
    ],
    { stdio: 'inherit' },
  );
  if (toKtx2.status !== 0) {
    process.exit(toKtx2.status || 1);
  }

  const toAvif = spawnSync(
    process.execPath,
    [
      'scripts/convert-tiles-avif.mjs',
      '--in',
      outDir,
      '--out',
      outDir,
      ...(force ? ['--force'] : []),
    ],
    { stdio: 'inherit' },
  );
  if (toAvif.status !== 0) {
    process.exit(toAvif.status || 1);
  }
}

console.log(`[museum-cubemap] ${museumId} cubemap AVIF/KTX2 资源生成完成`);
