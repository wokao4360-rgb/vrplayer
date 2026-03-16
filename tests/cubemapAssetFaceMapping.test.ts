import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function readConfig() {
  return JSON.parse(fs.readFileSync('public/config.json', 'utf8'));
}

function getScenesWithCubemapTiles() {
  const config = readConfig();
  return (config.museums || []).flatMap((museum: any) =>
    (museum.scenes || [])
      .filter((scene: any) => typeof scene.panoTiles?.manifest === 'string')
      .map((scene: any) => ({
        museumId: museum.id,
        sceneId: scene.id,
        manifestPath: path.resolve('public', scene.panoTiles.manifest.replace(/^\/+/, '')),
      })),
  );
}

test('all cubemap manifests explicitly swap front and back asset faces', () => {
  for (const { museumId, sceneId, manifestPath } of getScenesWithCubemapTiles()) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(manifest.type, 'cubemap-tiles', `${museumId}/${sceneId} must stay on cubemap-tiles`);
    assert.deepEqual(
      manifest.assetFaceByWorldFace ?? null,
      { f: 'b', b: 'f' },
      `${museumId}/${sceneId} must declare assetFaceByWorldFace { f:'b', b:'f' }`,
    );
  }
});
