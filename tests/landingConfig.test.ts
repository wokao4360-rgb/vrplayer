import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { validateConfig } from '../src/utils/configValidator.ts';

function readConfig() {
  return JSON.parse(fs.readFileSync('public/config.json', 'utf8'));
}

test('config exposes landing copy and museum marketing metadata for the homepage', () => {
  const config = readConfig();
  const errors = validateConfig(config);

  assert.deepEqual(errors, []);
  assert.equal(config.landing?.brandTitle, '研学.xyz');
  assert.equal(config.landing?.heroTitle, '三馆全景导览');
  assert.ok(
    typeof config.landing?.heroSubtitle === 'string' &&
      config.landing.heroSubtitle.includes('沉浸'),
    'landing.heroSubtitle 应提供首页品牌副文案',
  );
  assert.ok(
    Array.isArray(config.assetCdn?.includePrefixes) &&
      config.assetCdn.includePrefixes.includes('/assets/covers/'),
    '封面资源也应纳入 assetCdn 加速前缀',
  );

  for (const museum of config.museums) {
    assert.ok(
      museum.marketing && typeof museum.marketing === 'object',
      `${museum.id} 缺少 marketing 字段`,
    );
    assert.ok(
      typeof museum.marketing.hook === 'string' && museum.marketing.hook.trim() !== '',
      `${museum.id} 缺少首页钩子文案`,
    );
    assert.ok(
      Array.isArray(museum.marketing.tags) && museum.marketing.tags.length >= 2,
      `${museum.id} 至少需要 2 个首页标签`,
    );
    assert.ok(
      museum.marketing.tags.every((tag: unknown) => typeof tag === 'string' && tag.trim() !== ''),
      `${museum.id} 的 marketing.tags 只能包含非空字符串`,
    );
  }
});

test('linzexu cover points to the processed Gemini homepage cover asset', () => {
  const config = readConfig();
  const museum = config.museums.find((item: { id: string }) => item.id === 'linzexu');
  const coverPath = 'public/assets/covers/linzexu/hero-cover.jpg';

  assert.ok(museum, 'public/config.json 中必须存在 linzexu 展馆');
  assert.equal(museum.cover, '/assets/covers/linzexu/hero-cover.jpg');
  assert.ok(fs.existsSync(coverPath));
  assert.ok(
    fs.statSync(coverPath).size < 300 * 1024,
    '首页封面应为处理后的轻量资源，而不是原始大图直出',
  );
});
