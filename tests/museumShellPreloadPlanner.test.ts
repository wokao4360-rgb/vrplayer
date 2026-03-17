import test from 'node:test';
import assert from 'node:assert/strict';

import type { CubemapTileManifest } from '../src/viewer/tileManifest.ts';
import { buildMuseumShellPreloadPlan } from '../src/app/museumShellPreloadPlanner.ts';
import type { MuseumShellManifest } from '../src/app/museumShellManifest.ts';

const cubemapManifest: CubemapTileManifest = {
  type: 'cubemap-tiles',
  baseUrl: '/assets/panos/tiles/linzexu/south_gate',
  lowFaceSize: 512,
  highTileSize: 1024,
  highGrid: 2,
  tileFormat: 'avif',
  lowFallbackFormat: 'jpg',
  highFallbackFormats: ['ktx2', 'jpg'],
  assetFaceByWorldFace: { f: 'b', b: 'f' },
};

const museumShellManifest: MuseumShellManifest = {
  id: 'linzexu',
  title: '林则徐纪念馆',
  subtitle: '一馆一段完整旅程。',
  defaultSceneId: 'south_gate',
  cover: {
    heroImage: '/assets/covers/linzexu/hero-cover.jpg',
    brandTitle: '鼎虎清源',
    brandLogos: [],
    ctaLabel: '点击开启 VR 漫游',
    eyebrow: 'Museum Immersion',
    note: '进入同一馆壳层内的连续漫游',
    title: '林则徐纪念馆',
    subtitle: '一馆一段完整旅程。',
  },
  scenes: [
    {
      id: 'south_gate',
      title: '南门',
      preview: { url: '/assets/panos/linzexu/south-gate-preview.jpg' },
      hires: {
        format: 'tile-manifest',
        manifestUrl: '/assets/panos/tiles/linzexu/south_gate/manifest.json',
      },
      defaultView: { yaw: 180, pitch: 0, fov: 75 },
      hotspots: [],
      neighbors: ['west_room_1'],
    },
    {
      id: 'west_room_1',
      title: '西屋1',
      preview: { url: '/assets/panos/linzexu/west-room-1-preview.jpg' },
      hires: {
        format: 'panorama',
        url: '/assets/panos/linzexu/west-room-1.jpg',
      },
      defaultView: { yaw: 0, pitch: 0, fov: 75 },
      hotspots: [],
      neighbors: ['south_gate'],
    },
  ],
};

test('museum-entry preload keeps L0 to manifest only while cover UI itself loads the hero image', () => {
  const plan = buildMuseumShellPreloadPlan({
    museum: museumShellManifest,
    sceneId: 'south_gate',
    phase: 'museum-entry',
    view: { yaw: 180, pitch: 0, fov: 75 },
    hiresManifestBySceneId: {
      south_gate: cubemapManifest,
    },
  });

  assert.deepEqual(
    plan.L0.map((asset) => `${asset.kind}:${asset.role}:${asset.url}`),
    [
      'json:scene-hires-manifest:/assets/panos/tiles/linzexu/south_gate/manifest.json',
    ],
  );
  assert.deepEqual(
    plan.L1.map((asset) => `${asset.role}:${asset.url}`),
    [
      'scene-preview:/assets/panos/linzexu/south-gate-preview.jpg',
      'neighbor-preview:/assets/panos/linzexu/west-room-1-preview.jpg',
    ],
  );
  assert.deepEqual(
    plan.L2.slice(0, 6).map((asset) => asset.url),
    [
      '/assets/panos/tiles/linzexu/south_gate/low/b.avif',
      '/assets/panos/tiles/linzexu/south_gate/low/r.avif',
      '/assets/panos/tiles/linzexu/south_gate/low/l.avif',
      '/assets/panos/tiles/linzexu/south_gate/low/u.avif',
      '/assets/panos/tiles/linzexu/south_gate/low/d.avif',
      '/assets/panos/tiles/linzexu/south_gate/low/f.avif',
    ],
  );
  assert.equal(plan.L2.filter((asset) => asset.role === 'hero-high-tile').length, 12);
  assert.deepEqual(
    plan.L2
      .filter((asset) => asset.role === 'hero-high-tile')
      .slice(0, 4)
      .map((asset) => asset.url),
    [
      '/assets/panos/tiles/linzexu/south_gate/high/b/1_1.avif',
      '/assets/panos/tiles/linzexu/south_gate/high/b/0_1.avif',
      '/assets/panos/tiles/linzexu/south_gate/high/b/1_0.avif',
      '/assets/panos/tiles/linzexu/south_gate/high/b/0_0.avif',
    ],
  );
});

test('scene-transition preload keeps cover assets out and defers remaining tiles into L3', () => {
  const plan = buildMuseumShellPreloadPlan({
    museum: museumShellManifest,
    sceneId: 'south_gate',
    phase: 'scene-transition',
    view: { yaw: 180, pitch: 0, fov: 75 },
    hiresManifestBySceneId: {
      south_gate: cubemapManifest,
    },
  });

  assert.deepEqual(
    plan.L0.map((asset) => `${asset.kind}:${asset.role}:${asset.url}`),
    ['json:scene-hires-manifest:/assets/panos/tiles/linzexu/south_gate/manifest.json'],
  );
  assert.equal(plan.L2.filter((asset) => asset.role === 'hero-high-tile').length, 12);
  assert.equal(plan.L3.filter((asset) => asset.role === 'remaining-high-tile').length, 12);
  assert.ok(plan.L3.some((asset) => asset.url.endsWith('/high/u/1_1.avif')));
  assert.ok(plan.L3.some((asset) => asset.url.endsWith('/high/d/0_0.avif')));
  assert.ok(plan.L3.some((asset) => asset.url.endsWith('/high/f/1_0.avif')));
});

test('panorama hires scenes degrade gracefully to preview plus single hires asset planning', () => {
  const plan = buildMuseumShellPreloadPlan({
    museum: museumShellManifest,
    sceneId: 'west_room_1',
    phase: 'scene-transition',
    view: { yaw: 0, pitch: 0, fov: 75 },
  });

  assert.deepEqual(
    plan.L1.map((asset) => `${asset.role}:${asset.url}`),
    [
      'scene-preview:/assets/panos/linzexu/west-room-1-preview.jpg',
      'neighbor-preview:/assets/panos/linzexu/south-gate-preview.jpg',
    ],
  );
  assert.deepEqual(
    plan.L2.map((asset) => `${asset.role}:${asset.url}`),
    ['hero-panorama:/assets/panos/linzexu/west-room-1.jpg'],
  );
  assert.equal(plan.L3.length, 0);
});
