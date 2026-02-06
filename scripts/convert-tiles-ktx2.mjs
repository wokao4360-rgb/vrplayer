#!/usr/bin/env node
/**
 * 将 tiles 批量转换为 KTX2（Basis）
 * 用法：
 *   node scripts/convert-tiles-ktx2.mjs --in public/assets/panos/tiles/sceneA
 * 可选：
 *   --out 输出目录（默认同目录）
 *   --force 覆盖已存在 .ktx2
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import https from 'node:https';

const args = process.argv.slice(2);
let inDir = '';
let outDir = '';
let force = false;

for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--in') inDir = args[i + 1];
  if (args[i] === '--out') outDir = args[i + 1];
  if (args[i] === '--force') force = true;
}

if (!inDir) {
  console.error('[ktx2] 缺少 --in');
  process.exit(1);
}

const absIn = path.resolve(inDir);
const absOut = outDir ? path.resolve(outDir) : absIn;
const manifestPath = path.join(absIn, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error(`[ktx2] manifest 不存在: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
if (!manifest.levels || !manifest.tileSize || !manifest.baseUrl) {
  console.error('[ktx2] manifest 格式不合法');
  process.exit(1);
}

const toktx = await resolveToktx();
console.log(`[ktx2] using toktx: ${toktx}`);

fs.mkdirSync(absOut, { recursive: true });
for (const level of manifest.levels) {
  const levelDir = path.join(absIn, `z${level.z}`);
  const outLevelDir = path.join(absOut, `z${level.z}`);
  fs.mkdirSync(outLevelDir, { recursive: true });
  for (let row = 0; row < level.rows; row++) {
    for (let col = 0; col < level.cols; col++) {
      const baseName = `${col}_${row}`;
      const srcJpg = path.join(levelDir, `${baseName}.jpg`);
      const srcPng = path.join(levelDir, `${baseName}.png`);
      const src = fs.existsSync(srcJpg) ? srcJpg : fs.existsSync(srcPng) ? srcPng : '';
      if (!src) continue;
      const dst = path.join(outLevelDir, `${baseName}.ktx2`);
      if (!force && fs.existsSync(dst)) continue;
      const result = spawnSync(
        toktx,
        ['--t2', '--encode', 'etc1s', '--qlevel', '80', '--clevel', '2', dst, src],
        { stdio: 'inherit' }
      );
      if (result.status !== 0) {
        console.error(`[ktx2] 转换失败: ${src}`);
        process.exit(result.status || 1);
      }
    }
  }
}

const outManifest = {
  ...manifest,
  tileFormat: 'ktx2',
  baseUrl: resolveBaseUrl(absOut),
};
fs.writeFileSync(path.join(absOut, 'manifest.json'), JSON.stringify(outManifest, null, 2), 'utf-8');
console.log('[ktx2] manifest 更新完成');

async function resolveToktx() {
  if (process.env.KTX2_TOKTX && fs.existsSync(process.env.KTX2_TOKTX)) {
    return process.env.KTX2_TOKTX;
  }
  const fromPath = findToktxInPath();
  if (fromPath) return fromPath;
  const fromDefault = findToktxInDefaultInstall();
  if (fromDefault) return fromDefault;
  const fromTools = findToktxInTools();
  if (fromTools) return fromTools;
  const fromInstall = findToktxInInstall(path.resolve('tools/ktx/ktx-install'));
  if (fromInstall) return fromInstall;
  await downloadToktx();
  const downloaded = findToktxInTools();
  if (downloaded) return downloaded;
  console.error('[ktx2] 找不到 toktx，请设置 KTX2_TOKTX 或确保安装 KTX-Software');
  process.exit(1);
}

function findToktxInPath() {
  const result = spawnSync('where', ['toktx'], { encoding: 'utf-8' });
  if (result.status !== 0) return '';
  const line = String(result.stdout || '').split(/\r?\n/).find(Boolean);
  return line || '';
}

function findToktxInInstall(installDir) {
  if (!fs.existsSync(installDir)) return '';
  let match = '';
  walk(installDir, (file) => {
    if (!match && file.toLowerCase().endsWith('toktx.exe')) match = file;
  });
  return match;
}

function findToktxInDefaultInstall() {
  const candidates = [
    'C:/Program Files/KTX-Software/bin/toktx.exe',
    'C:/Program Files (x86)/KTX-Software/bin/toktx.exe',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return '';
}

function findToktxInTools() {
  const toolsDir = path.resolve('tools/ktx');
  if (!fs.existsSync(toolsDir)) return '';
  const matches = [];
  walk(toolsDir, (file) => {
    if (file.toLowerCase().endsWith('toktx.exe')) matches.push(file);
  });
  return matches[0] || '';
}

function walk(dir, cb) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

async function downloadToktx() {
  const toolsDir = path.resolve('tools/ktx');
  fs.mkdirSync(toolsDir, { recursive: true });
  const data = await fetchJson('https://api.github.com/repos/KhronosGroup/KTX-Software/releases/latest', {
    headers: { 'User-Agent': 'vrplayer-ktx2', Accept: 'application/vnd.github+json' },
  });
  const assets = data.assets || [];
  const zipAsset = assets.find((a) => String(a.name || '').includes('Windows-64bit.zip'));
  const exeAsset = assets.find((a) => String(a.name || '').includes('Windows-x64.exe'));
  const asset = zipAsset || exeAsset;
  if (!asset || !asset.browser_download_url) {
    throw new Error('未找到可用的 Windows 安装包');
  }
  const url = asset.browser_download_url;
  const fileName = String(asset.name || 'ktx-installer');
  const filePath = path.join(toolsDir, fileName);
  console.log(`[ktx2] downloading ${url}`);
  await downloadFile(url, filePath);
  if (fileName.toLowerCase().endsWith('.zip')) {
    console.log('[ktx2] extracting zip');
    const ps = spawnSync('powershell', [
      '-NoProfile',
      '-Command',
      `Expand-Archive -Path "${filePath}" -DestinationPath "${toolsDir}" -Force`,
    ]);
    if (ps.status !== 0) {
      console.error('[ktx2] 解压失败');
      process.exit(ps.status || 1);
    }
    return;
  }
  if (fileName.toLowerCase().endsWith('.exe')) {
    console.log('[ktx2] installing exe');
    const installDir = path.join(toolsDir, 'ktx-install');
    fs.mkdirSync(installDir, { recursive: true });
    const attempts = [
      [' /VERYSILENT', ' /SUPPRESSMSGBOXES', ' /NORESTART', ` /DIR=${installDir}`].join(''),
      [' /S', ` /D=${installDir}`].join(''),
    ];
    let ok = false;
    for (const args of attempts) {
      const ps = spawnSync(filePath, args.trim().split(' '), { stdio: 'inherit' });
      if (ps.status === 0) {
        ok = true;
        break;
      }
    }
    const found = findToktxInInstall(installDir);
    if (!ok && !found) {
      console.error('[ktx2] 安装失败');
      process.exit(1);
    }
    return;
  }
}

function fetchJson(url, options = {}) {
  if (typeof fetch === 'function') {
    return fetch(url, options).then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
  }
  return new Promise((resolve, reject) => {
    const headers = options.headers || {};
    const req = https.get(url, { headers }, (res) => {
      const status = res.statusCode || 0;
      let raw = '';
      res.setEncoding('utf-8');
      res.on('data', (chunk) => {
        raw += chunk;
      });
      res.on('end', () => {
        if (status < 200 || status >= 300) {
          reject(new Error(`HTTP ${status}`));
          return;
        }
        try {
          resolve(JSON.parse(raw));
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', reject);
  });
}

function downloadFile(url, outPath, retries = 3) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);
    const cleanAndRetry = (err, redirectUrl) => {
      try {
        file.close();
      } catch {}
      if (fs.existsSync(outPath)) {
        try {
          fs.unlinkSync(outPath);
        } catch {}
      }
      if (retries > 0) {
        const nextDelay = (4 - retries) * 1000;
        setTimeout(() => {
          downloadFile(redirectUrl || url, outPath, retries - 1).then(resolve).catch(reject);
        }, nextDelay);
      } else {
        reject(err);
      }
    };

    https
      .get(url, (res) => {
        const status = res.statusCode || 0;
        if ([301, 302, 303, 307, 308].includes(status) && res.headers.location) {
          const redirectUrl = res.headers.location;
          cleanAndRetry(new Error(`HTTP ${status}`), redirectUrl);
          return;
        }
        if (status !== 200) {
          cleanAndRetry(new Error(`HTTP ${status}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      })
      .on('error', (err) => {
        cleanAndRetry(err);
      });
  });
}

function resolveBaseUrl(absOutDir) {
  const rel = path.relative(path.resolve('public'), absOutDir).split(path.sep).join('/');
  if (rel.startsWith('.')) {
    const cleaned = rel.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    return `/${cleaned}`;
  }
  return `/${rel}`;
}
