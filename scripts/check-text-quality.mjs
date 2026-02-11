import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceRoots = ['src'];
const extraFiles = ['public/config.json', 'README.md', 'task_plan.md', 'progress.md', 'findings.md'];
const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);

// 已知乱码特征（UTF-8 被错误按 GBK/ANSI 处理后的常见片段）
const mojibakePatterns = [
  '榧庤檸娓呮簮',
  '灞曢',
  '鍦烘櫙',
  '鏇村',
  '淇℃伅',
  '閲囬泦',
  '鐢昏川',
  '楂樻竻',
  '鐪佹祦',
  '瑙嗚',
  '鎭㈠',
  '缂╂斁',
  '缂╁皬',
  '鏀惧ぇ',
  '鍔犺浇',
  '鏈壘',
  '鍒涘缓澶辫触',
  '閰嶇疆',
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
    if (exts.has(path.extname(entry.name))) {
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
      continue;
    }
  }

  return out;
}

function hasMojibake(text) {
  if (text.includes('�')) return true;
  return mojibakePatterns.some((p) => text.includes(p));
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
  const content = fs.readFileSync(absPath, 'utf8');
  const ext = path.extname(absPath);

  if (exts.has(ext)) {
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

  if (hasMojibake(content)) {
    let hit = '�';
    if (!content.includes('�')) {
      hit = mojibakePatterns.find((p) => content.includes(p)) || mojibakePatterns[0];
    }
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
