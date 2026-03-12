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
