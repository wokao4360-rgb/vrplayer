import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const THUMB_ROOT = path.resolve('public/assets/panos');
const MAX_THUMB_BYTES = 16 * 1024;

function collectThumbFiles(dir: string, output: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectThumbFiles(fullPath, output);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('-thumb.jpg')) {
      output.push(fullPath);
    }
  }
  return output.sort();
}

test('all published thumb assets stay within the loading budget', () => {
  const thumbFiles = collectThumbFiles(THUMB_ROOT);

  assert.ok(thumbFiles.length > 0, 'public/assets/panos 下至少要存在一张 thumb');

  const oversized = thumbFiles
    .map((file) => ({
      file: path.relative(process.cwd(), file),
      bytes: fs.statSync(file).size,
    }))
    .filter((entry) => entry.bytes > MAX_THUMB_BYTES);

  assert.deepEqual(
    oversized,
    [],
    `以下 thumb 超出 ${MAX_THUMB_BYTES} bytes 预算:\n${JSON.stringify(oversized, null, 2)}`,
  );
});
