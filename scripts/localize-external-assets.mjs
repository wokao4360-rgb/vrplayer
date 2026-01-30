import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';

const CONFIG_PATH = path.resolve('public/config.json');
const OUT_ROOT = path.resolve('public/assets/external');
const ALLOWED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const INTERNAL_HOSTS = new Set(['xn--48s508d.xyz', '研学.xyz']);

function isExternalUrl(value) {
  if (typeof value !== 'string') return false;
  if (!/^https?:\/\//i.test(value)) return false;
  try {
    const url = new URL(value);
    return !INTERNAL_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function getExt(url) {
  try {
    const u = new URL(url);
    const ext = path.extname(u.pathname || '').toLowerCase();
    return ext || '';
  } catch {
    return '';
  }
}

function toLocalPath(url) {
  const u = new URL(url);
  const ext = getExt(url) || '.bin';
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 12);
  const filename = `${hash}${ext}`;
  const rel = `/assets/external/${u.hostname}/${filename}`;
  const abs = path.join(OUT_ROOT, u.hostname, filename);
  return { rel, abs };
}

async function downloadWithRetry(url, absPath, attempts = 3) {
  if (fs.existsSync(absPath)) return true;
  await fs.promises.mkdir(path.dirname(absPath), { recursive: true });
  let lastErr = null;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.promises.writeFile(absPath, buf);
      return true;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  const curl = spawnSync('curl', ['-L', '--retry', '3', '--retry-delay', '1', '-o', absPath, url], {
    encoding: 'utf-8',
  });
  if (curl.status === 0 && fs.existsSync(absPath)) {
    return true;
  }
  console.error(`[localize] 下载失败: ${url}`);
  if (lastErr) console.error(lastErr);
  return false;
}

function walkAndReplace(node, replacer, pathKey = '') {
  if (Array.isArray(node)) {
    return node.map((item, idx) => walkAndReplace(item, replacer, `${pathKey}[${idx}]`));
  }
  if (node && typeof node === 'object') {
    const out = {};
    for (const [key, val] of Object.entries(node)) {
      out[key] = walkAndReplace(val, replacer, pathKey ? `${pathKey}.${key}` : key);
    }
    return out;
  }
  return replacer(node, pathKey);
}

const raw = await fs.promises.readFile(CONFIG_PATH, 'utf-8');
const config = JSON.parse(raw);

const downloads = [];
const skipped = [];
const replaced = new Map();
const successes = new Set();

walkAndReplace(config, (val, keyPath) => {
  if (!isExternalUrl(val)) return val;
  const ext = getExt(val);
  if (!ALLOWED_EXTS.has(ext)) {
    skipped.push({ url: val, path: keyPath, ext: ext || 'unknown' });
    return val;
  }
  if (!replaced.has(val)) {
    const { rel, abs } = toLocalPath(val);
    replaced.set(val, rel);
    downloads.push({ url: val, abs, rel, path: keyPath });
  }
  return replaced.get(val);
});

for (const item of downloads) {
  const ok = await downloadWithRetry(item.url, item.abs, 3);
  if (ok) successes.add(item.url);
}

const nextConfig = walkAndReplace(config, (val) => {
  if (!isExternalUrl(val)) return val;
  if (!successes.has(val)) return val;
  return replaced.get(val) || val;
});

await fs.promises.writeFile(CONFIG_PATH, `${JSON.stringify(nextConfig, null, 2)}\n`, 'utf-8');

console.log(`[localize] 替换完成: ${downloads.length} 个外链图片`);
if (skipped.length) {
  console.log(`[localize] 跳过 ${skipped.length} 个非图片外链`);
  for (const s of skipped) {
    console.log(`- ${s.path}: ${s.url} (${s.ext})`);
  }
}
