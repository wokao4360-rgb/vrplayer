import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

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

test('wangding config keeps only scanned scenes and exposes disabled floorplan placeholders', () => {
  const museum = readWangdingMuseum();
  const errors = validateConfig(readConfig());
  const floorplan = resolveFloorplan(museum);

  assert.deepEqual(errors, []);
  assert.deepEqual(
    museum.scenes.map((scene: { id: string }) => scene.id),
    ['front_yard', 'exhibit_hall', 'memorial_wall'],
  );
  assert.deepEqual(
    museum.scenes.map((scene: { name: string }) => scene.name),
    ['西屋1', '东屋1', '东屋2'],
  );
  assert.deepEqual(
    floorplan.renderNodes
      .filter((node) => node.status === 'disabled')
      .map((node) => node.id),
    ['west_room_2', 'south_gate'],
  );
});

test('wangding floorplan keeps west room 2 and south gate as visible disabled points', () => {
  const museum = readWangdingMuseum();
  const connections = deriveSceneConnectionsFromFloorplan(resolveFloorplan(museum));

  assert.deepEqual(connections, [
    { from: 'memorial_wall', to: 'exhibit_hall' },
    { from: 'front_yard', to: 'exhibit_hall' },
  ]);
});
