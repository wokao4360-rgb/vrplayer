import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('layout profile resolves compact mobile for coarse small viewport', async () => {
  let module: typeof import('../src/ui/layoutProfile.ts') | null = null;
  try {
    module = await import('../src/ui/layoutProfile.ts');
  } catch {
    assert.fail('layoutProfile.ts should exist and export resolveVrLayoutProfile');
  }

  assert.equal(
    module.resolveVrLayoutProfile({
      width: 393,
      height: 852,
      coarsePointer: true,
    }),
    'mobile-compact',
  );
});

test('layout profile keeps desktop for wide fine-pointer viewport', async () => {
  let module: typeof import('../src/ui/layoutProfile.ts') | null = null;
  try {
    module = await import('../src/ui/layoutProfile.ts');
  } catch {
    assert.fail('layoutProfile.ts should exist and export resolveVrLayoutProfile');
  }

  assert.equal(
    module.resolveVrLayoutProfile({
      width: 1440,
      height: 960,
      coarsePointer: false,
    }),
    'desktop',
  );
});

test('mobile layout profile is wired into the main runtime and mobile-heavy UI surfaces', () => {
  const mainSource = readFileSync(
    new URL('../src/main.ts', import.meta.url),
    'utf8',
  );
  const uiCssSource = readFileSync(
    new URL('../src/ui/ui.css', import.meta.url),
    'utf8',
  );
  const fcChatSource = readFileSync(
    new URL('../src/ui/FcChatPanel.ts', import.meta.url),
    'utf8',
  );
  const shellChromeSource = readFileSync(
    new URL('../src/ui/MuseumShellChrome.ts', import.meta.url),
    'utf8',
  );
  const guideDrawerSource = readFileSync(
    new URL('../src/ui/SceneGuideDrawer.tsx', import.meta.url),
    'utf8',
  );

  assert.ok(
    mainSource.includes('syncLayoutProfile()'),
    'App should sync a global layout profile for mobile-first chrome overrides',
  );
  assert.ok(
    mainSource.includes("document.documentElement.dataset.vrLayout"),
    'App should expose the layout profile on documentElement',
  );

  assert.ok(
    uiCssSource.includes('html[data-vr-layout="mobile-compact"] .vr-topmodes'),
    'Top mode tabs should have dedicated compact-mobile overrides',
  );
  assert.ok(
    uiCssSource.includes('html[data-vr-layout="mobile-compact"] .vr-dock-wrap'),
    'Bottom dock should have dedicated compact-mobile overrides',
  );
  assert.ok(
    uiCssSource.includes('html[data-vr-layout="mobile-compact"] .vr-scenetitle'),
    'Scene title should have dedicated compact-mobile overrides',
  );
  assert.ok(
    fcChatSource.includes('html[data-vr-layout="mobile-compact"] .fcchat-root'),
    'Companion sheet should have dedicated compact-mobile overrides',
  );
  assert.ok(
    shellChromeSource.includes('html[data-vr-layout="mobile-compact"] .vr-shell-chrome__card'),
    'Museum shell cover should have dedicated compact-mobile overrides',
  );
  assert.ok(
    guideDrawerSource.includes('html[data-vr-layout="mobile-compact"] .vr-guide-panel'),
    'Guide drawer should have dedicated compact-mobile overrides',
  );
});
