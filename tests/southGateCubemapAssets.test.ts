import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SCENE_ROOT = path.resolve('public/assets/panos/tiles/linzexu/south_gate');
const FACES = ['f', 'r', 'b', 'l', 'u', 'd'] as const;

test('south_gate cubemap files keep the required 512 low faces and 1024 high tiles', async () => {
  for (const face of FACES) {
    const lowMeta = await sharp(path.join(SCENE_ROOT, 'low', `${face}.avif`)).metadata();
    assert.equal(lowMeta.width, 512, `low/${face}.avif width should be 512`);
    assert.equal(lowMeta.height, 512, `low/${face}.avif height should be 512`);

    for (const col of [0, 1]) {
      for (const row of [0, 1]) {
        const highMeta = await sharp(path.join(SCENE_ROOT, 'high', face, `${col}_${row}.avif`)).metadata();
        assert.equal(highMeta.width, 1024, `high/${face}/${col}_${row}.avif width should be 1024`);
        assert.equal(highMeta.height, 1024, `high/${face}/${col}_${row}.avif height should be 1024`);
      }
    }
  }
});

test('south_gate manifest follows the global cubemap front/back asset swap rule', async () => {
  const manifest = JSON.parse(await fs.readFile(path.join(SCENE_ROOT, 'manifest.json'), 'utf8'));
  assert.deepEqual(manifest.assetFaceByWorldFace, {
    f: 'b',
    b: 'f',
  });
});
