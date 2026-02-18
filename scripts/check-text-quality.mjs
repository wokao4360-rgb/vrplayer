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
const textExts = new Set(['.css', '.html', '.json', '.md']);

// 常见 UTF-8 被错误按 GBK/ANSI 解释后的特征片段
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
  '宸插鍒',
  '鍒濆',
  '鍏ㄦ櫙',
];

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

    const ext = path.extname(entry.name).toLowerCase();
    if (codeExts.has(ext) || textExts.has(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractStringLiterals(code) {
  const out = [];
  let i = 0;
  let line = 1;
  let state = 'normal';
  let quote = '';
  let startLine = 1;
  let buffer = '';

  while (i < code.length) {
    const ch = code[i];
    const next = i + 1 < code.length ? code[i + 1] : '';

    if (ch === '\n') {
      line += 1;
    }

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
        startLine = line;
        buffer = '';
        i += 1;
        continue;
      }
      i += 1;
      continue;
    }

    if (state === 'lineComment') {
      if (ch === '\n') {
        state = 'normal';
      }
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
          if (code[i + 1] === '\n') {
            line += 1;
          }
          i += 2;
          continue;
        }
      }
      if (ch === quote) {
        out.push({ text: buffer, line: startLine });
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

function locatePatternLine(content, pattern) {
  const idx = content.indexOf(pattern);
  if (idx < 0) return 1;
  return content.slice(0, idx).split('\n').length;
}

const targetFiles = [];
for (const root of sourceRoots) {
  const abs = path.join(projectRoot, root);
  if (fs.existsSync(abs)) {
    targetFiles.push(...walk(abs));
  }
}

for (const rel of extraFiles) {
  const abs = path.join(projectRoot, rel);
  if (fs.existsSync(abs)) {
    targetFiles.push(abs);
  }
}

const issues = [];

for (const absPath of targetFiles) {
  const relPath = path.relative(projectRoot, absPath).replace(/\\/g, '/');
  if (relPath === 'scripts/check-text-quality.mjs' || relPath === 'scripts/check-encoding.mjs') {
    continue;
  }
  const content = fs.readFileSync(absPath, 'utf8');
  const ext = path.extname(absPath).toLowerCase();

  if (codeExts.has(ext)) {
    const literals = extractStringLiterals(content);
    for (const literal of literals) {
      if (!hasMojibake(literal.text)) continue;
      issues.push({
        file: relPath,
        line: literal.line,
        sample: literal.text.slice(0, 80),
      });
    }
    continue;
  }

  if (textExts.has(ext) && hasMojibake(content)) {
    const hit = mojibakePatterns.find((pattern) => content.includes(pattern)) || mojibakePatterns[0];
    issues.push({
      file: relPath,
      line: locatePatternLine(content, hit),
      sample: hit,
    });
  }
}

if (issues.length > 0) {
  console.error('检测到潜在中文乱码，请先修复后再构建：');
  for (const issue of issues) {
    console.error(`- ${issue.file}:${issue.line} -> ${issue.sample}`);
  }
  process.exit(1);
}

console.log('文本质量检查通过：未检测到已知乱码特征。');
