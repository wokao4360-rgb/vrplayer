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
