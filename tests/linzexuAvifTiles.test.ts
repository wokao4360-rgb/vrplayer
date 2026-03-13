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

test('linzexu tile manifests are AVIF-first with low/high scheduling hints', () => {
  const sceneDirs = getSceneDirs();

  assert.ok(sceneDirs.length > 0, '林则徐馆至少应存在一组瓦片目录');

  for (const sceneDir of sceneDirs) {
    const manifestPath = path.join(sceneDir, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const sceneName = path.basename(sceneDir);

    assert.equal(manifest.tileFormat, 'avif', `${sceneName} manifest 应切到 avif`);
    assert.equal(manifest.lowFallbackFormat, 'jpg', `${sceneName} 低清回退应保留 jpg`);
    assert.equal(manifest.lowLevelZ, 2, `${sceneName} 应指定 z2 作为低清首屏层`);
    assert.equal(manifest.highWarmupTileBudget, 12, `${sceneName} 应限制首轮高清预热为 12 张`);
    assert.deepEqual(
      manifest.highFallbackFormats,
      ['ktx2', 'jpg'],
      `${sceneName} 高清回退链应为 ktx2 -> jpg`,
    );
  }
});

test('linzexu z0 tiles keep avif + jpg + ktx2 assets together for real fallback validation', () => {
  const sceneDirs = getSceneDirs();

  for (const sceneDir of sceneDirs) {
    const z0Dir = path.join(sceneDir, 'z0');
    assert.ok(fs.existsSync(path.join(z0Dir, '0_0.avif')), `${path.basename(sceneDir)} 缺少 z0 avif`);
    assert.ok(fs.existsSync(path.join(z0Dir, '0_0.jpg')), `${path.basename(sceneDir)} 缺少 z0 jpg fallback`);
    assert.ok(fs.existsSync(path.join(z0Dir, '0_0.ktx2')), `${path.basename(sceneDir)} 缺少 z0 ktx2 fallback`);
  }
});
