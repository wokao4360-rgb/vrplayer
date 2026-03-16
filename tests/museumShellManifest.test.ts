import test from 'node:test';
import assert from 'node:assert/strict';

import { createMuseumShellManifest } from '../src/app/museumShellManifest.ts';
import type { AppConfig, Museum } from '../src/types/config.ts';

function createBaseMuseum(): Museum {
  return {
    id: 'linzexu',
    name: '林则徐纪念馆',
    description: '一馆一壳层的连续漫游。',
    cover: '/assets/covers/linzexu/hero-cover.jpg',
    marketing: {
      hook: '苟利国家生死以：穿梭百年，见证虎门销烟外的旷世长歌。',
      tags: ['人物', '书房'],
    },
    map: {
      width: 1200,
      height: 800,
    },
    scenes: [
      {
        id: 'south_gate',
        name: '南门',
        panoLow: '/assets/panos/linzexu/south-gate-low.jpg',
        panoTiles: {
          manifest: '/assets/panos/tiles/linzexu/south_gate/manifest.json',
        },
        thumb: '/assets/panos/linzexu/south-gate-thumb.jpg',
        initialView: { yaw: 0, pitch: 0, fov: 75 },
        mapPoint: { x: 100, y: 100 },
        hotspots: [
          {
            id: 'to-west-room-1',
            type: 'scene',
            label: '去西屋1',
            yaw: 30,
            pitch: 0,
            target: { museumId: 'linzexu', sceneId: 'west_room_1', yaw: 15, pitch: 0, fov: 70 },
          },
        ],
      },
      {
        id: 'west_room_1',
        name: '西屋1',
        pano: '/assets/panos/linzexu/west-room-1.jpg',
        panoLow: '/assets/panos/linzexu/west-room-1-low.jpg',
        thumb: '/assets/panos/linzexu/west-room-1-thumb.jpg',
        initialView: { yaw: 0, pitch: 0, fov: 75 },
        mapPoint: { x: 220, y: 220 },
        hotspots: [],
      },
    ],
  };
}

function createConfig(museum: Museum): AppConfig {
  return {
    appName: '三馆全景导览',
    landing: {
      brandTitle: '鼎虎清源',
      heroTitle: '三馆全景导览',
      heroSubtitle: '一馆一段完整旅程。',
    },
    museums: [museum],
  };
}

test('legacy museum and scene fields normalize into a shell manifest', () => {
  const museum = createBaseMuseum();
  const manifest = createMuseumShellManifest(createConfig(museum), museum);

  assert.equal(manifest.id, 'linzexu');
  assert.equal(manifest.title, '林则徐纪念馆');
  assert.equal(manifest.subtitle, museum.marketing?.hook);
  assert.equal(manifest.defaultSceneId, 'south_gate');
  assert.deepEqual(manifest.cover, {
    heroImage: '/assets/covers/linzexu/hero-cover.jpg',
    brandTitle: '鼎虎清源',
    brandLogos: [],
    ctaLabel: '点击开启 VR 漫游',
    eyebrow: 'Museum Immersion',
    note: '进入同一馆壳层内的连续漫游',
    title: '林则徐纪念馆',
    subtitle: museum.marketing?.hook ?? '',
  });

  const southGate = manifest.scenes.find((scene) => scene.id === 'south_gate');
  assert.ok(southGate);
  assert.deepEqual(southGate.preview, {
    url: '/assets/panos/linzexu/south-gate-low.jpg',
  });
  assert.deepEqual(southGate.hires, {
    format: 'tile-manifest',
    manifestUrl: '/assets/panos/tiles/linzexu/south_gate/manifest.json',
  });
  assert.deepEqual(southGate.defaultView, { yaw: 0, pitch: 0, fov: 75 });
  assert.deepEqual(southGate.neighbors, ['west_room_1']);
});

test('explicit shell config overrides legacy fallbacks and keeps hotspots intact', () => {
  const museum = createBaseMuseum() as Museum & {
    shell?: unknown;
    scenes: Array<any>;
  };
  museum.shell = {
    title: '走进林则徐',
    subtitle: '先看封面，再进入同馆连续漫游。',
    defaultSceneId: 'west_room_1',
    cover: {
      heroImage: '/assets/covers/linzexu/cover-override.jpg',
      brandLogos: ['/assets/brand/a.svg', '/assets/brand/b.svg'],
      ctaLabel: '开始沉浸漫游',
      eyebrow: 'VR Gate',
      note: '后台正在预热首屏画面',
      title: '走进林则徐',
      subtitle: '封面文案来自配置，而不是硬编码。',
    },
  };
  museum.scenes[0].shell = {
    preview: {
      url: '/assets/panos/linzexu/south-gate-preview.jpg',
      width: 2048,
      height: 1024,
    },
    hires: {
      format: 'panorama',
      url: '/assets/panos/linzexu/south-gate-hires.jpg',
    },
    neighbors: ['west_room_1'],
  };

  const manifest = createMuseumShellManifest(createConfig(museum), museum);
  const southGate = manifest.scenes.find((scene) => scene.id === 'south_gate');
  assert.ok(southGate);

  assert.equal(manifest.title, '走进林则徐');
  assert.equal(manifest.subtitle, '先看封面，再进入同馆连续漫游。');
  assert.equal(manifest.defaultSceneId, 'west_room_1');
  assert.deepEqual(manifest.cover, {
    heroImage: '/assets/covers/linzexu/cover-override.jpg',
    brandTitle: '鼎虎清源',
    brandLogos: ['/assets/brand/a.svg', '/assets/brand/b.svg'],
    ctaLabel: '开始沉浸漫游',
    eyebrow: 'VR Gate',
    note: '后台正在预热首屏画面',
    title: '走进林则徐',
    subtitle: '封面文案来自配置，而不是硬编码。',
  });
  assert.deepEqual(southGate.preview, {
    url: '/assets/panos/linzexu/south-gate-preview.jpg',
    width: 2048,
    height: 1024,
  });
  assert.deepEqual(southGate.hires, {
    format: 'panorama',
    url: '/assets/panos/linzexu/south-gate-hires.jpg',
  });
  assert.deepEqual(southGate.neighbors, ['west_room_1']);
  assert.equal(southGate.hotspots[0]?.target?.sceneId, 'west_room_1');
});
