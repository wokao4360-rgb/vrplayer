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

function readYanghuchengMuseum() {
  const config = readConfig();
  const museum = config.museums.find((item: { id: string }) => item.id === 'yanghucheng');

  assert.ok(museum, 'public/config.json 中必须存在 yanghucheng 展馆');
  return museum;
}

test('yanghucheng config keeps only the actually scanned scenes', () => {
  const museum = readYanghuchengMuseum();
  const errors = validateConfig(readConfig());
  const floorplan = resolveFloorplan(museum);

  assert.equal(museum.name, '杨虎城纪念馆');
  assert.deepEqual(errors, []);
  assert.deepEqual(
    museum.scenes.map((scene: { id: string }) => scene.id),
    ['west_room_1', 'east_room_1', 'east_room_2'],
  );
  assert.deepEqual(
    floorplan.renderNodes
      .filter((node) => node.status === 'disabled')
      .map((node) => node.id),
    ['west_room_2', 'south_gate'],
  );
});

test('yanghucheng floorplan keeps west room 2 and south gate as visible disabled points', () => {
  const museum = readYanghuchengMuseum();
  const connections = deriveSceneConnectionsFromFloorplan(resolveFloorplan(museum));

  assert.deepEqual(connections, [
    { from: 'east_room_2', to: 'east_room_1' },
    { from: 'west_room_1', to: 'east_room_1' },
  ]);
});

test('yanghucheng scenes all point to published cubemap AVIF manifests with jpg and ktx2 fallback', () => {
  const museum = readYanghuchengMuseum();

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
