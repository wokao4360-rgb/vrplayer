import test from 'node:test';
import assert from 'node:assert/strict';

import { probeBaseUrlsSequentially } from '../src/utils/assetResolverProbe.ts';

test('asset CDN probe stops after the first successful base URL', async () => {
  const calls: string[] = [];
  const winner = await probeBaseUrlsSequentially(
    [
      'https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
      'https://github.cnxiaobai.com/https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
    ],
    async (baseUrl) => {
      calls.push(baseUrl);
      return baseUrl.startsWith('https://raw.githubusercontent.com/');
    },
  );

  assert.equal(
    winner,
    'https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
  );
  assert.deepEqual(calls, [
    'https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
  ]);
});

test('asset CDN probe falls back to the next base URL only after the previous one fails', async () => {
  const calls: string[] = [];
  const winner = await probeBaseUrlsSequentially(
    [
      'https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
      'https://github.cnxiaobai.com/https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
    ],
    async (baseUrl) => {
      calls.push(baseUrl);
      return baseUrl.includes('github.cnxiaobai.com');
    },
  );

  assert.equal(
    winner,
    'https://github.cnxiaobai.com/https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
  );
  assert.deepEqual(calls, [
    'https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
    'https://github.cnxiaobai.com/https://raw.githubusercontent.com/wokao4360-rgb/vrplayer/main/docs',
  ]);
});
