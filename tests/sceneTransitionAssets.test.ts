import test from 'node:test';
import assert from 'node:assert/strict';

import {
  resolveSceneTransitionAssets,
  resolveSceneTransitionPreviewUrl,
} from '../src/app/sceneTransitionAssets.ts';

test('transition preview can prefer thumb before panoLow for source-side continuity', () => {
  const preview = resolveSceneTransitionPreviewUrl({
    thumbUrl: 'scene-thumb.jpg',
    panoLowUrl: 'scene-low.jpg',
    prefer: 'thumb',
  });

  assert.equal(preview, 'scene-thumb.jpg');
});

test('transition preview can prefer thumb before panoLow for target-side reveal', () => {
  const preview = resolveSceneTransitionPreviewUrl({
    thumbUrl: 'scene-thumb.jpg',
    panoLowUrl: 'scene-low.jpg',
    prefer: 'thumb',
  });

  assert.equal(preview, 'scene-thumb.jpg');
});

test('cover route keeps target preview gated and falls back to source continuity image', () => {
  const assets = resolveSceneTransitionAssets({
    coverWasVisible: true,
    sourcePreviewUrl: 'scene-thumb.jpg',
    targetPreviewUrl: 'preview-low.jpg',
    targetPreviewAlreadyReady: false,
    coverHeroUrl: 'cover-hero.jpg',
    viewerSnapshot: 'snapshot.jpg',
    previousScenePreviewImage: 'prev-preview.jpg',
  });

  assert.equal(assets.fromImage, 'scene-thumb.jpg');
  assert.equal(assets.targetPreviewImage, undefined);
});

test('scene route prefers current viewer snapshot and still provides target preview to the seam layer', () => {
  const assets = resolveSceneTransitionAssets({
    coverWasVisible: false,
    sourcePreviewUrl: 'scene-thumb.jpg',
    targetPreviewUrl: 'preview-low.jpg',
    targetPreviewAlreadyReady: true,
    coverHeroUrl: 'cover-hero.jpg',
    viewerSnapshot: 'snapshot.jpg',
    previousScenePreviewImage: 'prev-preview.jpg',
  });

  assert.equal(assets.fromImage, 'snapshot.jpg');
  assert.equal(assets.targetPreviewImage, 'preview-low.jpg');
});
