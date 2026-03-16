import test from 'node:test';
import assert from 'node:assert/strict';

import { getSceneWorldYawOffset, worldYawToInternalYaw } from '../src/viewer/cubemapViewSemantics.ts';

test('plain pano scenes keep the original world yaw semantics', () => {
  const scene = {
    initialView: { yaw: 0, pitch: 0, fov: 75 },
  };

  assert.equal(getSceneWorldYawOffset(scene), 0);
  assert.equal(worldYawToInternalYaw(scene, 0), 0);
  assert.equal(worldYawToInternalYaw(scene, 90), -90);
});

test('cubemap scenes default to a 180 degree world-yaw compensation', () => {
  const scene = {
    initialView: { yaw: 0, pitch: 0, fov: 75 },
    panoTiles: {
      manifest: '/assets/panos/tiles/linzexu/south_gate/manifest.json',
    },
  };

  assert.equal(getSceneWorldYawOffset(scene), 180);
  assert.equal(worldYawToInternalYaw(scene, 0), -180);
  assert.equal(worldYawToInternalYaw(scene, 90), -270);
});

test('scene-level world-yaw override can opt out or choose a custom compensation', () => {
  const zeroOffsetScene = {
    initialView: { yaw: 0, pitch: 0, fov: 75 },
    panoTiles: {
      manifest: '/assets/panos/tiles/demo/manifest.json',
      worldYawOffset: 0,
    },
  };
  const customOffsetScene = {
    initialView: { yaw: 0, pitch: 0, fov: 75 },
    panoTiles: {
      manifest: '/assets/panos/tiles/demo/manifest.json',
      worldYawOffset: 90,
    },
  };

  assert.equal(getSceneWorldYawOffset(zeroOffsetScene), 0);
  assert.equal(worldYawToInternalYaw(zeroOffsetScene, 30), -30);
  assert.equal(getSceneWorldYawOffset(customOffsetScene), 90);
  assert.equal(worldYawToInternalYaw(customOffsetScene, 30), -120);
});
