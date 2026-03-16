import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildMuseumCoverModel,
  buildMuseumPreloadPlan,
  resolveMuseumSceneRuntimePlan,
  resolveMuseumShellRoute,
} from '../src/app/museumShellState.ts';

const museum = {
  id: 'linzexu',
  name: '林则徐纪念馆',
  description: '从门庭到展厅的连续漫游。',
  cover: '/assets/covers/linzexu/hero-cover.jpg',
  marketing: {
    hook: '从门庭到展厅的连续漫游。',
    tags: ['沉浸漫游', '低清预热'],
  },
  scenes: [
    {
      id: 'south_gate',
      name: '南门',
      thumb: '/assets/thumbs/linzexu/south_gate.jpg',
      panoLow: '/assets/panos/linzexu/south_gate-low.jpg',
      panoTiles: {
        manifest: '/assets/panos/tiles/linzexu/south_gate/manifest.json',
      },
      hotspots: [
        {
          id: 'hs-west-room',
          type: 'scene',
          label: '去西屋',
          yaw: 0,
          pitch: 0,
          target: {
            sceneId: 'west_room_1',
          },
        },
        {
          id: 'hs-east-room',
          type: 'scene',
          label: '去东屋',
          yaw: 0,
          pitch: 0,
          target: {
            sceneId: 'east_room_1',
          },
        },
      ],
    },
    {
      id: 'west_room_1',
      name: '西屋1',
      thumb: '/assets/thumbs/linzexu/west_room_1.jpg',
      panoLow: '/assets/panos/linzexu/west_room_1-low.jpg',
      hotspots: [],
    },
    {
      id: 'east_room_1',
      name: '东屋1',
      thumb: '/assets/thumbs/linzexu/east_room_1.jpg',
      panoLow: '/assets/panos/linzexu/east_room_1-low.jpg',
      hotspots: [],
    },
  ],
};

test('museum-only route enters cover mode and targets the entry scene for CTA', () => {
  const decision = resolveMuseumShellRoute({
    museum,
    requestedSceneId: undefined,
    hasEnteredMuseum: false,
  });

  assert.deepEqual(decision, {
    kind: 'cover',
    museumId: 'linzexu',
    targetSceneId: 'south_gate',
    requestedSceneId: null,
  });
});

test('first deep link keeps the cover gate but preserves the requested scene target', () => {
  const decision = resolveMuseumShellRoute({
    museum,
    requestedSceneId: 'west_room_1',
    hasEnteredMuseum: false,
  });

  assert.deepEqual(decision, {
    kind: 'cover',
    museumId: 'linzexu',
    targetSceneId: 'west_room_1',
    requestedSceneId: 'west_room_1',
  });
});

test('entered museum scene routes go straight to the active scene without cover replay', () => {
  const decision = resolveMuseumShellRoute({
    museum,
    requestedSceneId: 'west_room_1',
    hasEnteredMuseum: true,
  });

  assert.deepEqual(decision, {
    kind: 'scene',
    museumId: 'linzexu',
    targetSceneId: 'west_room_1',
  });
});

test('cover model stays config-driven and falls back to museum metadata', () => {
  const cover = buildMuseumCoverModel({
    appName: '三馆全景导览',
    brandTitle: '鼎虎清源',
    museum,
    targetSceneId: 'south_gate',
  });

  assert.equal(cover.title, '林则徐纪念馆');
  assert.equal(cover.subtitle, '从门庭到展厅的连续漫游。');
  assert.equal(cover.ctaLabel, '点击开启 VR 漫游');
  assert.equal(cover.heroImage, '/assets/covers/linzexu/hero-cover.jpg');
  assert.equal(cover.targetSceneId, 'south_gate');
});

test('preload plan prioritizes target scene preview and one-hop neighbors', () => {
  const plan = buildMuseumPreloadPlan({
    museum,
    targetSceneId: 'south_gate',
  });

  assert.deepEqual(plan.primarySceneIds, ['south_gate']);
  assert.deepEqual(plan.neighborSceneIds, ['west_room_1', 'east_room_1']);
  assert.deepEqual(plan.previewAssets, [
    '/assets/panos/linzexu/south_gate-low.jpg',
    '/assets/thumbs/linzexu/west_room_1.jpg',
    '/assets/thumbs/linzexu/east_room_1.jpg',
  ]);
});

test('same museum route reuses viewer shell and preserves current view when URL has no explicit camera', () => {
  const plan = resolveMuseumSceneRuntimePlan({
    currentMuseumId: 'linzexu',
    hasViewerShell: true,
    nextMuseumId: 'linzexu',
  });

  assert.deepEqual(plan, {
    shellStrategy: 'reuse-shell',
    viewStrategy: 'preserve-current',
  });
});

test('same museum route still resets to target view when URL explicitly carries camera params', () => {
  const plan = resolveMuseumSceneRuntimePlan({
    currentMuseumId: 'linzexu',
    hasViewerShell: true,
    nextMuseumId: 'linzexu',
    requestedView: {
      yaw: 35,
    },
  });

  assert.deepEqual(plan, {
    shellStrategy: 'reuse-shell',
    viewStrategy: 'reset-to-target',
  });
});

test('different museum route mounts a fresh viewer shell', () => {
  const plan = resolveMuseumSceneRuntimePlan({
    currentMuseumId: 'linzexu',
    hasViewerShell: true,
    nextMuseumId: 'wangding',
  });

  assert.deepEqual(plan, {
    shellStrategy: 'mount-shell',
    viewStrategy: 'reset-to-target',
  });
});
