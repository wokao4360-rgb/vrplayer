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
