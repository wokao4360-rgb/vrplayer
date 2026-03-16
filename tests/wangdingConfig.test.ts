import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  deriveSceneConnectionsFromFloorplan,
  resolveFloorplan,
} from '../src/floorplan/floorplanAdapter.ts';
import { validateConfig } from '../src/utils/configValidator.ts';

function readConfig() {
  return JSON.parse(fs.readFileSync('public/config.json', 'utf8'));
}

function readWangdingMuseum() {
  const config = readConfig();
  const museum = config.museums.find((item: { id: string }) => item.id === 'wangding');

  assert.ok(museum, 'public/config.json 中必须存在 wangding 展馆');
  return museum;
}

test('wangding config matches the scanned 王鼎 material set', () => {
  const museum = readWangdingMuseum();
  const errors = validateConfig(readConfig());
  const floorplan = resolveFloorplan(museum);

  assert.equal(museum.name, '王鼎纪念馆');
  assert.deepEqual(errors, []);
  assert.deepEqual(
    museum.scenes.map((scene: { id: string }) => scene.id),
    [
      'south_gate',
      'temper_talent',
      'prominent_achievement',
      'lianwu',
      'culture_achievement',
      'family_instruction',
      'point_1',
      'point_2',
      'point_3',
      'point_4',
      'point_5',
      'clean_history',
      'point_6',
      'anti_corruption_interactive',
      'research_space_west',
      'research_space_east',
      'conduct_west',
      'point_7',
      'conduct_east',
      'study_room',
      'political_chapter',
      'resume_chapter',
      'reception_room',
      'era_chapter',
    ],
  );
  assert.deepEqual(
    floorplan.renderNodes
      .filter((node) => node.status === 'disabled')
      .map((node) => node.id),
    ['north_gate', 'qian_gu_liu_fang'],
  );
  assert.equal(
    floorplan.renderNodes.some((node) => node.id === 'wangding_statue'),
    false,
  );
});

test('wangding floorplan fallback connections follow the latest hand-drawn topology', () => {
  const museum = readWangdingMuseum();
  const connections = deriveSceneConnectionsFromFloorplan(resolveFloorplan(museum));

  assert.deepEqual(connections, [
    { from: 'point_7', to: 'point_6' },
    { from: 'point_6', to: 'point_5' },
    { from: 'point_5', to: 'point_4' },
    { from: 'point_4', to: 'point_3' },
    { from: 'point_3', to: 'point_2' },
    { from: 'point_2', to: 'point_1' },
    { from: 'point_1', to: 'lianwu' },
    { from: 'lianwu', to: 'south_gate' },
    { from: 'conduct_west', to: 'point_7' },
    { from: 'point_7', to: 'conduct_east' },
    { from: 'point_7', to: 'study_room' },
    { from: 'study_room', to: 'reception_room' },
    { from: 'reception_room', to: 'era_chapter' },
    { from: 'political_chapter', to: 'study_room' },
    { from: 'study_room', to: 'resume_chapter' },
    { from: 'research_space_west', to: 'point_6' },
    { from: 'point_6', to: 'research_space_east' },
    { from: 'clean_history', to: 'point_6' },
    { from: 'point_6', to: 'anti_corruption_interactive' },
    { from: 'culture_achievement', to: 'point_1' },
    { from: 'point_1', to: 'family_instruction' },
    { from: 'temper_talent', to: 'lianwu' },
    { from: 'lianwu', to: 'prominent_achievement' },
  ]);
});

test('wangding scenes all point to published cubemap AVIF manifests with jpg and ktx2 fallback', () => {
  const museum = readWangdingMuseum();

  for (const scene of museum.scenes) {
    assert.ok(scene.panoTiles, `scene ${scene.id} 缺少 panoTiles`);
    assert.equal(
      scene.panoTiles.fallbackPano,
      scene.pano,
      `scene ${scene.id} 的 fallbackPano 必须与 pano 对齐`,
    );
    assert.equal(
      scene.panoTiles.fallbackPanoLow,
      scene.panoLow,
      `scene ${scene.id} 的 fallbackPanoLow 必须与 panoLow 对齐`,
    );

    const manifestPath = path.resolve(
      'public',
      scene.panoTiles.manifest.replace(/^\/+/, ''),
    );
    assert.ok(fs.existsSync(manifestPath), `scene ${scene.id} 的 manifest 不存在: ${manifestPath}`);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(manifest.type, 'cubemap-tiles');
    assert.equal(manifest.tileFormat, 'avif');
    assert.equal(manifest.lowFallbackFormat, 'jpg');
    assert.deepEqual(manifest.highFallbackFormats, ['ktx2', 'jpg']);
    assert.equal(manifest.lowFaceSize, 512);
    assert.equal(manifest.highTileSize, 1024);
    assert.equal(manifest.highGrid, 2);
    assert.equal(manifest.highWarmupTileBudget, 12);
    assert.equal(
      manifest.baseUrl,
      path.posix.dirname(scene.panoTiles.manifest),
      `scene ${scene.id} 的 manifest.baseUrl 必须与 manifest 所在目录一致`,
    );
  }
});
