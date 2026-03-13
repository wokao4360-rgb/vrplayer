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

function readLinzexuMuseum() {
  const config = readConfig();
  const museum = config.museums.find((item: { id: string }) => item.id === 'linzexu');

  assert.ok(museum, 'public/config.json 中必须存在 linzexu 展馆');
  return museum;
}

test('linzexu config matches the latest scanned material set', () => {
  const museum = readLinzexuMuseum();
  const errors = validateConfig(readConfig());
  const floorplan = resolveFloorplan(museum);

  assert.deepEqual(errors, []);
  assert.deepEqual(
    museum.scenes.map((scene: { id: string }) => scene.id),
    [
      'south_gate',
      'cross_south',
      'west_room_1',
      'east_room_1',
      'lianwu_1',
      'cross_mid',
      'lianwu_2_west',
      'lianwu_2_east',
      'west_room_2',
      'cross_north',
      'north_house_west',
      'north_house_east',
    ],
  );
  assert.deepEqual(
    floorplan.renderNodes
      .filter((node) => node.status === 'disabled')
      .map((node) => node.id),
    ['east_room_2'],
  );
});

test('linzexu floorplan fallback connections follow the revised hand-drawn topology', () => {
  const museum = readLinzexuMuseum();
  const connections = deriveSceneConnectionsFromFloorplan(resolveFloorplan(museum));

  assert.deepEqual(connections, [
    { from: 'cross_south', to: 'south_gate' },
    { from: 'west_room_1', to: 'cross_south' },
    { from: 'cross_south', to: 'east_room_1' },
    { from: 'cross_mid', to: 'lianwu_1' },
    { from: 'lianwu_1', to: 'cross_south' },
    { from: 'cross_north', to: 'cross_mid' },
    { from: 'lianwu_2_west', to: 'cross_mid' },
    { from: 'lianwu_2_east', to: 'cross_mid' },
    { from: 'west_room_2', to: 'cross_north' },
    { from: 'north_house_west', to: 'cross_north' },
    { from: 'north_house_east', to: 'cross_north' },
  ]);
});

test('linzexu scenes all point to published AVIF tile manifests with jpg and ktx2 fallback', () => {
  const museum = readLinzexuMuseum();

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
    assert.equal(manifest.type, 'equirect-tiles');
    assert.equal(manifest.tileFormat, 'avif');
    assert.equal(manifest.lowFallbackFormat, 'jpg');
    assert.deepEqual(manifest.highFallbackFormats, ['ktx2', 'jpg']);
    assert.equal(Array.isArray(manifest.levels), true);
    assert.equal(manifest.levels.length, 4);
    assert.equal(
      manifest.baseUrl,
      path.posix.dirname(scene.panoTiles.manifest),
      `scene ${scene.id} 的 manifest.baseUrl 必须与 manifest 所在目录一致`,
    );
  }
});
