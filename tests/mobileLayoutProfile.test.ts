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

test('compact mobile dock narrows the nav pill and moves narration to the photo right side', () => {
  const uiCssSource = readFileSync(
    new URL('../src/ui/ui.css', import.meta.url),
    'utf8',
  );

  assert.ok(
    uiCssSource.includes('width: min(84vw, 320px);'),
    'compact mobile dock should stop stretching nearly edge-to-edge',
  );
  assert.ok(
    uiCssSource.includes('html[data-vr-layout="mobile-compact"] .vr-dock-wrap .vr-dock-narration-action'),
    'compact mobile dock should have a dedicated narration-action placement rule',
  );
  assert.ok(
    uiCssSource.includes('left: calc(50% - 16px);'),
    'compact mobile narration action should sit on the photo right side while keeping the pair centered as a group',
  );
  assert.ok(
    uiCssSource.includes('left: calc(50% - 48px);'),
    'compact mobile photo action should shift left so the photo+narration pair is visually centered',
  );
  assert.ok(
    uiCssSource.includes('min-width: 88px;'),
    'compact mobile narration action should use a steadier pill width so the pair feels consistent',
  );
  assert.ok(
    uiCssSource.includes('html[data-vr-layout="mobile-compact"] .vr-dock-wrap .vr-dock-side-action{\n  bottom: 58px;'),
    'compact mobile narration action should rise above the dock pill instead of being covered by it',
  );
  assert.ok(
    uiCssSource.includes('bottom: 58px;'),
    'compact mobile photo action should sit clearly above the dock pill',
  );
});
