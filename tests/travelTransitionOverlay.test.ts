import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const overlaySource = readFileSync(
  new URL('../src/ui/TravelTransitionOverlay.ts', import.meta.url),
  'utf8',
);

test('travel transition overlay explicitly promotes inline visibility on start', () => {
  assert.match(overlaySource, /this\.element\.style\.opacity = '1';/);
  assert.match(overlaySource, /this\.element\.style\.visibility = 'visible';/);
  assert.match(overlaySource, /this\.element\.style\.pointerEvents = 'none';/);
});

test('travel transition overlay clears inline visibility during teardown', () => {
  assert.match(overlaySource, /this\.element\.style\.visibility = 'hidden';/);
  assert.match(overlaySource, /this\.element\.style\.visibility = '';/);
  assert.match(overlaySource, /this\.element\.style\.pointerEvents = '';/);
});
