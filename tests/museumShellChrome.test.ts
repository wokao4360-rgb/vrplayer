import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const shellSource = readFileSync(
  new URL('../src/ui/MuseumShellChrome.ts', import.meta.url),
  'utf8',
);

test('museum shell transition progress stays hidden unless a label is explicitly provided', () => {
  assert.match(shellSource, /this\.transitionProgress\.hidden = true;/);
  assert.match(shellSource, /this\.setTransitionProgressLabel\(model\.progressLabel\);/);
  assert.match(shellSource, /this\.transitionProgress\.hidden = nextLabel\.length === 0;/);
});

test('museum shell no longer hardcodes low\/high loading copy into the progress label flow', () => {
  assert.doesNotMatch(shellSource, /低清预览已就绪/);
  assert.doesNotMatch(shellSource, /正在恢复清晰/);
  assert.doesNotMatch(shellSource, /正在准备下一段漫游画面/);
});
