import test from 'node:test';
import assert from 'node:assert/strict';

import { resolveSceneTransitionAssets } from '../src/app/sceneTransitionAssets.ts';

test('cover-driven transition uses target preview shell instead of cover hero as source image', () => {
  const assets = resolveSceneTransitionAssets({
    coverWasVisible: true,
    previewUrl: '/assets/panos/wangding/anti-corruption_interactive-low.jpg',
    previewAlreadyReady: false,
    coverHeroUrl: '/assets/covers/wangding/hero-cover.jpg',
  });

  assert.equal(
    assets.fromImage,
    '/assets/panos/wangding/anti-corruption_interactive-low.jpg',
  );
  assert.equal(assets.targetPreviewImage, undefined);
});

test('scene-to-scene transition prefers live viewer snapshot over previous low preview shell', () => {
  const assets = resolveSceneTransitionAssets({
    coverWasVisible: false,
    previewUrl: '/assets/panos/wangding/culture_achievement-low.jpg',
    previewAlreadyReady: true,
    coverHeroUrl: '/assets/covers/wangding/hero-cover.jpg',
    viewerSnapshot: 'data:image/jpeg;base64,current-view',
    previousScenePreviewImage: '/assets/panos/wangding/south_gate-low.jpg',
  });

  assert.equal(assets.fromImage, 'data:image/jpeg;base64,current-view');
  assert.equal(
    assets.targetPreviewImage,
    '/assets/panos/wangding/culture_achievement-low.jpg',
  );
});
