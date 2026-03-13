import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const TILE_ROOT = path.resolve('public/assets/panos/tiles/linzexu');

function getSceneDirs(): string[] {
  return fs
    .readdirSync(TILE_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(TILE_ROOT, entry.name))
    .sort();
}

test('linzexu tile manifests are AVIF-first cubemap manifests with strict low/high scheduling hints', () => {
  const sceneDirs = getSceneDirs();

  assert.ok(sceneDirs.length > 0, '林则徐馆至少应存在一组瓦片目录');

  for (const sceneDir of sceneDirs) {
    const manifestPath = path.join(sceneDir, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const sceneName = path.basename(sceneDir);

    assert.equal(manifest.type, 'cubemap-tiles', `${sceneName} manifest 应切到 cubemap-tiles`);
    assert.equal(manifest.tileFormat, 'avif', `${sceneName} manifest 应切到 avif`);
    assert.equal(manifest.lowFallbackFormat, 'jpg', `${sceneName} 低清回退应保留 jpg`);
    assert.equal(manifest.lowFaceSize, 512, `${sceneName} 低清面尺寸应固定为 512`);
    assert.equal(manifest.highTileSize, 1024, `${sceneName} 高清 tile 尺寸应固定为 1024`);
    assert.equal(manifest.highGrid, 2, `${sceneName} 每个面应固定为 2x2 高清 tile`);
    assert.equal(manifest.highWarmupTileBudget, 12, `${sceneName} 应限制首轮高清预热为 12 张`);
    assert.deepEqual(
      manifest.highFallbackFormats,
      ['ktx2', 'jpg'],
      `${sceneName} 高清回退链应为 ktx2 -> jpg`,
    );
  }
});

test('linzexu cubemap assets keep avif + jpg + ktx2 fallbacks together for real validation', () => {
  const sceneDirs = getSceneDirs();
  const lowFaces = ['f', 'r', 'b', 'l', 'u', 'd'];

  for (const sceneDir of sceneDirs) {
    const sceneName = path.basename(sceneDir);
    const lowDir = path.join(sceneDir, 'low');
    const highDir = path.join(sceneDir, 'high');
    for (const face of lowFaces) {
      assert.ok(fs.existsSync(path.join(lowDir, `${face}.avif`)), `${sceneName} 缺少 low/${face}.avif`);
      assert.ok(fs.existsSync(path.join(lowDir, `${face}.jpg`)), `${sceneName} 缺少 low/${face}.jpg fallback`);
      for (const col of [0, 1]) {
        for (const row of [0, 1]) {
          const base = path.join(highDir, face, `${col}_${row}`);
          assert.ok(fs.existsSync(`${base}.avif`), `${sceneName} 缺少 high/${face}/${col}_${row}.avif`);
          assert.ok(fs.existsSync(`${base}.jpg`), `${sceneName} 缺少 high/${face}/${col}_${row}.jpg fallback`);
          assert.ok(fs.existsSync(`${base}.ktx2`), `${sceneName} 缺少 high/${face}/${col}_${row}.ktx2 fallback`);
        }
      }
    }
  }
});
