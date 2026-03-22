import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const panoViewerSource = readFileSync(new URL('../src/viewer/PanoViewer.ts', import.meta.url), 'utf8');

test('loadScene exposes pending-black and silent-fallback options', () => {
  assert.match(
    panoViewerSource,
    /loadScene\(sceneData: Scene, options\?: \{ preserveView\?: boolean; allowPendingBlack\?: boolean; silentFallback\?: boolean \}\)/,
  );
});

test('pending-black disables initial tile fallback planning', () => {
  assert.match(panoViewerSource, /const fallbackPlanned = !allowPendingBlack && Boolean\(fallbackUrlLow \|\| fallbackUrlHigh\);/);
});

test('silent fallback suppresses fallback toast while preserving legacy fallback path', () => {
  assert.match(panoViewerSource, /if \(!silentFallback\) \{\s*showToast\('瓦片加载失败，已回退到全景图', 2000\);/);
  assert.match(
    panoViewerSource,
    /this\.fallbackToLegacy\(sceneData, tilesConfig, \{ silentFallback, allowPendingBlack \}\);/,
  );
});
