import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createMuseumShellState,
  reduceMuseumShellState,
} from '../src/app/museumShellStateMachine.ts';

test('entry flow walks from cover to preview-ready to scene active without black-screen gap', () => {
  let state = createMuseumShellState();
  state = reduceMuseumShellState(state, { type: 'SHOW_COVER', museumId: 'linzexu' });
  assert.equal(state.phase, 'COVER');
  assert.equal(state.overlayVisible, true);
  assert.equal(state.inputLocked, false);

  state = reduceMuseumShellState(state, {
    type: 'START_ENTER',
    museumId: 'linzexu',
    sceneId: 'south_gate',
    previewAlreadyReady: false,
  });
  assert.equal(state.phase, 'ENTER_PRELOADING');
  assert.equal(state.pendingSceneId, 'south_gate');
  assert.equal(state.inputLocked, true);

  state = reduceMuseumShellState(state, {
    type: 'TARGET_PREVIEW_READY',
    sceneId: 'south_gate',
    previewUrl: '/assets/panos/linzexu/south-gate-preview.jpg',
  });
  assert.equal(state.phase, 'SCENE_PREVIEW_READY');
  assert.equal(state.previewUrl, '/assets/panos/linzexu/south-gate-preview.jpg');

  state = reduceMuseumShellState(state, { type: 'SCENE_LOW_READY', sceneId: 'south_gate' });
  assert.equal(state.phase, 'SCENE_SHARPENING');

  state = reduceMuseumShellState(state, { type: 'SCENE_HIGH_READY', sceneId: 'south_gate' });
  assert.equal(state.phase, 'SCENE_ACTIVE');
  assert.equal(state.currentSceneId, 'south_gate');
  assert.equal(state.pendingSceneId, null);
  assert.equal(state.overlayVisible, false);
  assert.equal(state.inputLocked, false);
});

test('scene handoff locks input immediately and falls back cleanly on error', () => {
  let state = createMuseumShellState({
    phase: 'SCENE_ACTIVE',
    museumId: 'linzexu',
    currentSceneId: 'south_gate',
    overlayVisible: false,
    inputLocked: false,
    pendingSceneId: null,
    previewUrl: null,
    lastError: null,
  });

  state = reduceMuseumShellState(state, {
    type: 'START_SCENE_TRANSITION',
    museumId: 'linzexu',
    fromSceneId: 'south_gate',
    toSceneId: 'west_room_1',
  });
  assert.equal(state.phase, 'SCENE_TRANSITION');
  assert.equal(state.pendingSceneId, 'west_room_1');
  assert.equal(state.overlayVisible, true);
  assert.equal(state.inputLocked, true);

  state = reduceMuseumShellState(state, {
    type: 'SCENE_ERROR',
    sceneId: 'west_room_1',
    message: 'preview timeout',
  });
  assert.equal(state.phase, 'ERROR_FALLBACK');
  assert.equal(state.lastError, 'preview timeout');
  assert.equal(state.overlayVisible, true);
  assert.equal(state.inputLocked, true);

  state = reduceMuseumShellState(state, {
    type: 'RETRY_SCENE',
    museumId: 'linzexu',
    sceneId: 'west_room_1',
  });
  assert.equal(state.phase, 'SCENE_TRANSITION');
  assert.equal(state.pendingSceneId, 'west_room_1');
});

test('preview-ready start skips enter-preloading but still keeps overlay visible until sharpened', () => {
  let state = reduceMuseumShellState(createMuseumShellState(), {
    type: 'START_ENTER',
    museumId: 'linzexu',
    sceneId: 'south_gate',
    previewAlreadyReady: true,
    previewUrl: '/assets/panos/linzexu/south-gate-preview.jpg',
  });
  assert.equal(state.phase, 'SCENE_PREVIEW_READY');
  assert.equal(state.overlayVisible, true);
  assert.equal(state.inputLocked, true);

  state = reduceMuseumShellState(state, { type: 'SCENE_DEGRADED_READY', sceneId: 'south_gate' });
  assert.equal(state.phase, 'SCENE_ACTIVE');
  assert.equal(state.currentSceneId, 'south_gate');
  assert.equal(state.overlayVisible, false);
});
