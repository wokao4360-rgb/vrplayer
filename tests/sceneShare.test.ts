import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildMailShareUrl,
  buildQqShareUrl,
  buildSceneShareText,
  buildSceneShareTitle,
  buildSceneShareUrl,
  buildWeiboShareUrl,
  normalizeSceneShareView,
} from '../src/app/sceneShare.ts';

const payload = {
  baseUrl: 'https://xn--48s508d.xyz/?museum=wangding&scene=south_gate&debug=1&tilesDebug=1&fresh=local',
  museumId: 'wangding',
  sceneId: 'culture_achievement',
  museumName: '王鼎纪念馆',
  sceneName: '文化成就',
  view: {
    yaw: 12.3456,
    pitch: -8.7654,
    fov: 74.56,
  },
};

test('normalizeSceneShareView keeps world view precision stable', () => {
  assert.deepEqual(normalizeSceneShareView(payload.view), {
    yaw: 12.35,
    pitch: -8.77,
    fov: 74.6,
  });
});

test('buildSceneShareUrl emits clean stable route params only', () => {
  assert.equal(
    buildSceneShareUrl(payload),
    'https://xn--48s508d.xyz/?museum=wangding&scene=culture_achievement&yaw=12.35&pitch=-8.77&fov=74.6',
  );
});

test('share title and text describe the museum scene succinctly', () => {
  assert.equal(buildSceneShareTitle(payload), '王鼎纪念馆 · 文化成就');
  assert.match(buildSceneShareText(payload), /王鼎纪念馆/);
  assert.match(buildSceneShareText(payload), /文化成就/);
});

test('QQ and Weibo share URLs include the current view link', () => {
  const qqUrl = new URL(buildQqShareUrl(payload));
  assert.equal(qqUrl.origin + qqUrl.pathname, 'https://connect.qq.com/widget/shareqq/index.html');
  assert.equal(
    qqUrl.searchParams.get('url'),
    'https://xn--48s508d.xyz/?museum=wangding&scene=culture_achievement&yaw=12.35&pitch=-8.77&fov=74.6',
  );

  const weiboUrl = new URL(buildWeiboShareUrl(payload));
  assert.equal(weiboUrl.origin + weiboUrl.pathname, 'https://service.weibo.com/share/share.php');
  assert.equal(
    weiboUrl.searchParams.get('url'),
    'https://xn--48s508d.xyz/?museum=wangding&scene=culture_achievement&yaw=12.35&pitch=-8.77&fov=74.6',
  );
});

test('mail share URL includes subject and current view link', () => {
  const mailUrl = buildMailShareUrl(payload);
  assert.match(mailUrl, /^mailto:\?/);
  assert.match(mailUrl, /subject=/);
  assert.match(mailUrl, /body=/);
  assert.match(mailUrl, /culture_achievement/);
});
