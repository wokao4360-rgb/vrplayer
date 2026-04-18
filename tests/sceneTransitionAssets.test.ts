import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveSceneTransitionAssets } from '../src/app/sceneTransitionAssets.ts';

test('cover route prefers preview image and keeps target preview gated', () => {
  const assets = resolveSceneTransitionAssets({
    coverWasVisible: true,
    previewUrl: 'preview-low.jpg',
    previewAlreadyReady: false,
    coverHeroUrl: 'cover-hero.jpg',
    viewerSnapshot: 'snapshot.jpg',
    previousScenePreviewImage: 'prev-preview.jpg',
  });

  assert.equal(assets.fromImage, 'preview-low.jpg');
  assert.equal(assets.targetPreviewImage, undefined);
});

test('scene route prefers current viewer snapshot before previous scene preview fallback', () => {
  const assets = resolveSceneTransitionAssets({
    coverWasVisible: false,
    previewUrl: 'preview-low.jpg',
    previewAlreadyReady: true,
    coverHeroUrl: 'cover-hero.jpg',
    viewerSnapshot: 'snapshot.jpg',
    previousScenePreviewImage: 'prev-preview.jpg',
  });

  assert.equal(assets.fromImage, 'snapshot.jpg');
  assert.equal(assets.targetPreviewImage, 'preview-low.jpg');
});
