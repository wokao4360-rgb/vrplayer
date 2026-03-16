import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const FACES = ['f', 'r', 'b', 'l', 'u', 'd'] as const;

function readConfig() {
  return JSON.parse(fs.readFileSync('public/config.json', 'utf8'));
}

function getReadyScenesWithPanos() {
  const config = readConfig();
  return (config.museums || []).flatMap((museum: any) =>
    (museum.scenes || []).map((scene: any) => ({
      museumId: museum.id,
      scene,
    })),
  );
}

test('all scanned scenes publish south_gate-style cubemap assets with avif primary and ktx2/jpg fallback', async () => {
  for (const { museumId, scene } of getReadyScenesWithPanos()) {
    assert.ok(scene.panoTiles, `${museumId}/${scene.id} 缺少 panoTiles`);

    const manifestPath = path.resolve(
      'public',
      scene.panoTiles.manifest.replace(/^\/+/, ''),
    );
    assert.ok(fs.existsSync(manifestPath), `${museumId}/${scene.id} 缺少 manifest: ${manifestPath}`);

    const sceneRoot = path.dirname(manifestPath);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(manifest.type, 'cubemap-tiles', `${museumId}/${scene.id} manifest.type 必须是 cubemap-tiles`);
    assert.equal(manifest.tileFormat, 'avif', `${museumId}/${scene.id} tileFormat 必须是 avif`);
    assert.equal(manifest.lowFallbackFormat, 'jpg', `${museumId}/${scene.id} lowFallbackFormat 必须是 jpg`);
    assert.deepEqual(
      manifest.highFallbackFormats,
      ['ktx2', 'jpg'],
      `${museumId}/${scene.id} highFallbackFormats 必须是 ['ktx2','jpg']`,
    );
    assert.equal(manifest.lowFaceSize, 512, `${museumId}/${scene.id} lowFaceSize 必须是 512`);
    assert.equal(manifest.highTileSize, 1024, `${museumId}/${scene.id} highTileSize 必须是 1024`);
    assert.equal(manifest.highGrid, 2, `${museumId}/${scene.id} highGrid 必须是 2`);
    assert.equal(manifest.highWarmupTileBudget, 12, `${museumId}/${scene.id} highWarmupTileBudget 必须是 12`);

    for (const face of FACES) {
      const lowAvifPath = path.join(sceneRoot, 'low', `${face}.avif`);
      const lowJpgPath = path.join(sceneRoot, 'low', `${face}.jpg`);
      assert.ok(fs.existsSync(lowAvifPath), `${museumId}/${scene.id} 缺少 ${lowAvifPath}`);
      assert.ok(fs.existsSync(lowJpgPath), `${museumId}/${scene.id} 缺少 ${lowJpgPath}`);

      const lowAvifMeta = await sharp(lowAvifPath).metadata();
      assert.equal(lowAvifMeta.width, 512, `${museumId}/${scene.id} low/${face}.avif width 必须是 512`);
      assert.equal(lowAvifMeta.height, 512, `${museumId}/${scene.id} low/${face}.avif height 必须是 512`);

      for (const col of [0, 1]) {
        for (const row of [0, 1]) {
          const avifPath = path.join(sceneRoot, 'high', face, `${col}_${row}.avif`);
          const jpgPath = path.join(sceneRoot, 'high', face, `${col}_${row}.jpg`);
          const ktx2Path = path.join(sceneRoot, 'high', face, `${col}_${row}.ktx2`);
          assert.ok(fs.existsSync(avifPath), `${museumId}/${scene.id} 缺少 ${avifPath}`);
          assert.ok(fs.existsSync(jpgPath), `${museumId}/${scene.id} 缺少 ${jpgPath}`);
          assert.ok(fs.existsSync(ktx2Path), `${museumId}/${scene.id} 缺少 ${ktx2Path}`);

          const highMeta = await sharp(avifPath).metadata();
          assert.equal(highMeta.width, 1024, `${museumId}/${scene.id} high/${face}/${col}_${row}.avif width 必须是 1024`);
          assert.equal(highMeta.height, 1024, `${museumId}/${scene.id} high/${face}/${col}_${row}.avif height 必须是 1024`);
        }
      }
    }
  }
});
