import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceRoots = ['src', 'public'];
const extraFiles = [
  'index.html',
  'public/config.json',
  'README.md',
  'task_plan.md',
  'progress.md',
  'findings.md',
];

const codeExts = new Set(['.ts', '.tsx', '.js', '.jsx']);
const textExts = new Set(['.css', '.json', '.html', '.md']);
const targetExts = new Set([...codeExts, ...textExts]);

const mojibakePatterns = [
  '锟',
  '鎵句笉鍒',
  '姝ｅ湪',
  '娓呯悊',
  '璋冭瘯',
  '鍔犺浇',
  '鏄剧ず',
  '妫€',
  '鍙傛暟',
  '榧庤檸娓呮簮',
  '瀵艰',
  '绀惧尯',
  '淇℃伅',
  '鏇村',
  '灞曢',
  '鍦烘櫙',
  '閲囬泦鏃ユ湡',
  '楂樻竻',
  '鐪佹祦',
  '瑙嗚',
  '鎭㈠鍒濆瑙嗚',
  '缂╂斁',
  '鏀惧ぇ',
  '缂╁皬',
  '漏 2025',
  '銆',
  '鈥',
  '鈫',
  '\uFFFD',
];

const utf8Decoder = new TextDecoder('utf-8', { fatal: true });

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'docs' || entry.name === '.git') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    if (targetExts.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractStringLiterals(code) {
  const out = [];
  let i = 0;
  let state = 'normal';
  let quote = '';
  let buffer = '';

  while (i < code.length) {
    const ch = code[i];
    const next = i + 1 < code.length ? code[i + 1] : '';

    if (state === 'normal') {
      if (ch === '/' && next === '/') {
        state = 'lineComment';
        i += 2;
        continue;
      }
      if (ch === '/' && next === '*') {
        state = 'blockComment';
        i += 2;
        continue;
      }
      if (ch === '\'' || ch === '"' || ch === '`') {
        state = 'string';
        quote = ch;
        buffer = '';
        i += 1;
        continue;
      }
      i += 1;
      continue;
    }

    if (state === 'lineComment') {
      if (ch === '\n') state = 'normal';
      i += 1;
      continue;
    }

    if (state === 'blockComment') {
      if (ch === '*' && next === '/') {
        state = 'normal';
        i += 2;
        continue;
      }
      i += 1;
      continue;
    }

    if (state === 'string') {
      if (ch === '\\') {
        if (i + 1 < code.length) {
          buffer += ch + code[i + 1];
          i += 2;
          continue;
        }
      }
      if (ch === quote) {
        out.push(buffer);
        state = 'normal';
        quote = '';
        buffer = '';
        i += 1;
        continue;
      }
      buffer += ch;
      i += 1;
    }
  }

  return out;
}

function hasMojibake(text) {
  return mojibakePatterns.some((pattern) => text.includes(pattern));
}

const files = [];
for (const root of sourceRoots) {
  const absRoot = path.join(projectRoot, root);
  if (fs.existsSync(absRoot)) {
    files.push(...walk(absRoot));
  }
}
for (const relPath of extraFiles) {
  const absPath = path.join(projectRoot, relPath);
  if (fs.existsSync(absPath)) {
    files.push(absPath);
  }
}

const issues = [];
for (const absPath of files) {
  const relPath = path.relative(projectRoot, absPath).replace(/\\/g, '/');
  if (relPath === 'scripts/check-text-quality.mjs' || relPath === 'scripts/check-encoding.mjs') {
    continue;
  }

  const ext = path.extname(absPath).toLowerCase();
  const buf = fs.readFileSync(absPath);

  let decoded = '';
  try {
    decoded = utf8Decoder.decode(buf);
  } catch (error) {
    issues.push({
      file: relPath,
      reason: `UTF-8 解码失败：${error instanceof Error ? error.message : String(error)}`,
    });
    continue;
  }

  if (decoded.includes('\uFFFD')) {
    issues.push({
      file: relPath,
      reason: '包含 Unicode 替换字符（�），疑似编码损坏',
    });
    continue;
  }

  if (codeExts.has(ext)) {
    const literals = extractStringLiterals(decoded);
    const hit = literals.find((text) => hasMojibake(text));
    if (hit) {
      issues.push({
        file: relPath,
        reason: `字符串命中乱码特征：${hit.slice(0, 80)}`,
      });
    }
    continue;
  }

  if (textExts.has(ext)) {
    const hit = mojibakePatterns.find((pattern) => decoded.includes(pattern));
    if (hit) {
      issues.push({
        file: relPath,
        reason: `文本命中乱码特征：${hit}`,
      });
    }
  }
}

if (issues.length > 0) {
  console.error('检测到编码问题，请修复后再构建：');
  for (const issue of issues) {
    console.error(`- ${issue.file}: ${issue.reason}`);
  }
  process.exit(1);
}

console.log('编码检查通过：目标文件均为有效 UTF-8，且未命中乱码特征。');
