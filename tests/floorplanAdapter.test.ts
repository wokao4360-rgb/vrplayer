import test from 'node:test';
import assert from 'node:assert/strict';

import {
  deriveSceneConnectionsFromFloorplan,
  resolveFloorplan,
} from '../src/floorplan/floorplanAdapter.ts';
import { buildSceneGraph } from '../src/graph/sceneGraph.ts';
import { validateConfig } from '../src/utils/configValidator.ts';

function createScene(id: string, name: string, x: number, y: number) {
  return {
    id,
    name,
    pano: '/assets/placeholders/pano-black.jpg',
    panoLow: '/assets/placeholders/pano-black.jpg',
    thumb: '/assets/placeholders/scene-pending.svg',
    initialView: {
      yaw: 0,
      pitch: 0,
      fov: 75,
    },
    mapPoint: { x, y },
    hotspots: [],
  };
}

test('resolveFloorplan prefers museum.map.nodes and keeps disabled floorplan-only points', () => {
  const museum = {
    id: 'linzexu',
    name: '林则徐纪念馆',
    cover: '/assets/placeholders/linzexu-cover.svg',
    map: {
      width: 1000,
      height: 1400,
      nodes: [
        {
          id: 'west_room_3',
          x: 120,
          y: 80,
          label: '西屋3',
          kind: 'scene',
          status: 'ready',
          sceneId: 'west_room_3',
        },
        {
          id: 'east_room_3',
          x: 760,
          y: 80,
          label: '东屋3（暂未扫描）',
          kind: 'scene',
          status: 'disabled',
        },
        {
          id: 'junction_north_house',
          x: 420,
          y: 460,
          label: '北屋连接点',
          kind: 'waypoint',
          status: 'ready',
        },
      ],
      paths: [
        {
          id: 'north_row',
          points: ['west_room_3', 'east_room_3'],
        },
      ],
    },
    scenes: [
      createScene('west_room_3', '西屋3', 1, 1),
    ],
  };

  const floorplan = resolveFloorplan(museum as any);
  const disabledNode = floorplan.renderNodes.find((node) => node.id === 'east_room_3');
  const waypoint = floorplan.nodes.find((node) => node.id === 'junction_north_house');
  const sceneNode = floorplan.renderNodes.find((node) => node.id === 'west_room_3');

  assert.ok(disabledNode);
  assert.equal(disabledNode?.status, 'disabled');
  assert.equal(disabledNode?.sceneId, undefined);
  assert.ok(waypoint);
  assert.equal(waypoint?.kind, 'waypoint');
  assert.ok(sceneNode);
  assert.equal(sceneNode?.x, 120);
  assert.equal(sceneNode?.y, 80);
  assert.equal(floorplan.pathSegments.length, 1);
});

test('deriveSceneConnectionsFromFloorplan bridges waypoints but skips disabled placeholders', () => {
  const museum = {
    id: 'linzexu',
    name: '林则徐纪念馆',
    cover: '/assets/placeholders/linzexu-cover.svg',
    map: {
      width: 1000,
      height: 1400,
      nodes: [
        {
          id: 'west_room_3',
          x: 120,
          y: 80,
          label: '西屋3',
          kind: 'scene',
          status: 'ready',
          sceneId: 'west_room_3',
        },
        {
          id: 'cross_north',
          x: 420,
          y: 80,
          label: '北路口',
          kind: 'scene',
          status: 'ready',
          sceneId: 'cross_north',
        },
        {
          id: 'east_room_3',
          x: 760,
          y: 80,
          label: '东屋3（暂未扫描）',
          kind: 'scene',
          status: 'disabled',
        },
        {
          id: 'junction_middle',
          x: 420,
          y: 260,
          label: '中部连接点',
          kind: 'waypoint',
          status: 'ready',
        },
        {
          id: 'west_room_2',
          x: 180,
          y: 260,
          label: '西屋2',
          kind: 'scene',
          status: 'ready',
          sceneId: 'west_room_2',
        },
        {
          id: 'east_room_2',
          x: 620,
          y: 260,
          label: '东屋2',
          kind: 'scene',
          status: 'ready',
          sceneId: 'east_room_2',
        },
      ],
      paths: [
        {
          id: 'north_row',
          points: ['west_room_3', 'cross_north', 'east_room_3'],
        },
        {
          id: 'middle_row',
          points: ['west_room_2', 'junction_middle', 'east_room_2'],
        },
      ],
    },
    scenes: [
      createScene('west_room_3', '西屋3', 1, 1),
      createScene('cross_north', '北路口', 2, 2),
      createScene('west_room_2', '西屋2', 3, 3),
      createScene('east_room_2', '东屋2', 4, 4),
    ],
  };

  const connections = deriveSceneConnectionsFromFloorplan(resolveFloorplan(museum as any));

  assert.deepEqual(connections, [
    { from: 'west_room_3', to: 'cross_north' },
    { from: 'west_room_2', to: 'east_room_2' },
  ]);
});

test('buildSceneGraph falls back to floorplan topology when scene hotspots are absent', () => {
  const museum = {
    id: 'linzexu',
    name: '林则徐纪念馆',
    cover: '/assets/placeholders/linzexu-cover.svg',
    map: {
      width: 1000,
      height: 1400,
      nodes: [
        {
          id: 'cross_north',
          x: 400,
          y: 80,
          label: '北路口',
          kind: 'scene',
          status: 'ready',
          sceneId: 'cross_north',
        },
        {
          id: 'junction_middle',
          x: 420,
          y: 300,
          label: '中部连接点',
          kind: 'waypoint',
          status: 'ready',
        },
        {
          id: 'junction_north_house',
          x: 420,
          y: 460,
          label: '北屋连接点',
          kind: 'waypoint',
          status: 'ready',
        },
        {
          id: 'north_house_west',
          x: 240,
          y: 520,
          label: '北屋（西半）',
          kind: 'scene',
          status: 'ready',
          sceneId: 'north_house_west',
        },
        {
          id: 'north_house_east',
          x: 560,
          y: 520,
          label: '北屋（东半）',
          kind: 'scene',
          status: 'ready',
          sceneId: 'north_house_east',
        },
        {
          id: 'cross_mid',
          x: 420,
          y: 700,
          label: '中路口',
          kind: 'scene',
          status: 'ready',
          sceneId: 'cross_mid',
        },
      ],
      paths: [
        {
          id: 'spine_middle',
          points: ['cross_north', 'junction_middle', 'junction_north_house', 'cross_mid'],
        },
        {
          id: 'north_house_west_path',
          points: ['north_house_west', 'junction_north_house', 'cross_mid'],
        },
        {
          id: 'north_house_east_path',
          points: ['north_house_east', 'junction_north_house', 'cross_mid'],
        },
      ],
    },
    scenes: [
      createScene('cross_north', '北路口', 2, 2),
      createScene('cross_mid', '中路口', 5, 5),
      createScene('north_house_west', '北屋（西半）', 3, 3),
      createScene('north_house_east', '北屋（东半）', 4, 4),
    ],
  };

  const graph = buildSceneGraph(museum as any, 'cross_north');

  assert.deepEqual(
    graph.nodes.map((node) => node.id),
    ['cross_north', 'cross_mid', 'north_house_west', 'north_house_east'],
  );
  assert.deepEqual(graph.edges, [
    { from: 'cross_north', to: 'cross_mid' },
    { from: 'north_house_west', to: 'cross_mid' },
    { from: 'north_house_east', to: 'cross_mid' },
  ]);
});

test('buildSceneGraph preserves hotspot topology when museum already has scene hotspots', () => {
  const museum = {
    id: 'wangding',
    name: '杨虎城纪念馆',
    cover: '/assets/panos/gate-nail.jpg',
    map: {
      width: 1000,
      height: 600,
      nodes: [
        {
          id: 'gate',
          x: 100,
          y: 100,
          label: '正门',
          kind: 'scene',
          status: 'ready',
          sceneId: 'gate',
        },
        {
          id: 'front_yard',
          x: 300,
          y: 100,
          label: '西屋2',
          kind: 'scene',
          status: 'ready',
          sceneId: 'front_yard',
        },
      ],
      paths: [
        {
          id: 'fallback_only',
          points: ['gate', 'front_yard'],
        },
      ],
    },
    scenes: [
      {
        ...createScene('gate', '正门', 100, 100),
        hotspots: [
          {
            id: 'gate_to_front_yard',
            type: 'scene',
            label: '前往西屋2',
            yaw: 0,
            pitch: 0,
            target: {
              sceneId: 'front_yard',
            },
          },
        ],
      },
      createScene('front_yard', '西屋2', 300, 100),
    ],
  };

  const graph = buildSceneGraph(museum as any, 'gate');

  assert.deepEqual(graph.edges, [{ from: 'gate', to: 'front_yard' }]);
});

test('validateConfig accepts floorplan nodes and paths with waypoints and disabled placeholders', () => {
  const config = {
    appName: '三馆全景导览',
    museums: [
      {
        id: 'linzexu',
        name: '林则徐纪念馆',
        cover: '/assets/placeholders/linzexu-cover.svg',
        map: {
          width: 1000,
          height: 1400,
          nodes: [
            {
              id: 'west_room_3',
              x: 120,
              y: 80,
              label: '西屋3',
              kind: 'scene',
              status: 'ready',
              sceneId: 'west_room_3',
            },
            {
              id: 'east_room_3',
              x: 760,
              y: 80,
              label: '东屋3（暂未扫描）',
              kind: 'scene',
              status: 'disabled',
            },
            {
              id: 'junction_middle',
              x: 420,
              y: 340,
              label: '中部连接点',
              kind: 'waypoint',
              status: 'ready',
            },
          ],
          paths: [
            {
              id: 'north_row',
              points: ['west_room_3', 'east_room_3'],
            },
            {
              id: 'middle_spine',
              points: ['west_room_3', 'junction_middle'],
            },
          ],
        },
        scenes: [
          createScene('west_room_3', '西屋3', 120, 80),
        ],
      },
    ],
  };

  const errors = validateConfig(config);

  assert.deepEqual(errors, []);
});
