import test from 'node:test';
import assert from 'node:assert/strict';

import {
  resolveTravelOverlayPresentation,
  type TravelOverlayPresentation,
} from '../src/app/sceneTransitionOverlayPresentation.ts';
import type { SceneTransitionFrame } from '../src/app/sceneTransitionTimeline.ts';

function createFrame(overrides: Partial<SceneTransitionFrame>): SceneTransitionFrame {
  return {
    progress: 0.3,
    stageProgress: 0.4,
    targetReady: true,
    stage: 'travel',
    sourceKind: 'scene',
    displayWorldYaw: 0,
    travelDirX: 1,
    wipeFrom: 'right',
    revealProgress: 0.24,
    targetMixProgress: 0.34,
    settleStrength: 0,
    fromOpacity: 0.22,
    fromEdgeMix: 0.92,
    targetFocus: 0.4,
    wipeSoftness: 0.1,
    distortionStrength: 0.13,
    blurPx: 10,
    glassAlpha: 0.22,
    motionBlurStrength: 0.05,
    fovDelta: -1.2,
    zoomScale: 1.02,
    fromShiftPercent: 1.4,
    toShiftPercent: 3.1,
    shearDeg: 1.6,
    curveStrength: 0.3,
    forwardDriveStrength: 0.32,
    occlusionOpacity: 0.18,
    ...overrides,
  };
}

function assertPresentationBounds(presentation: TravelOverlayPresentation, limits: {
  stageOpacityMax: number;
  fromBackdropOpacityMax: number;
  targetBackdropOpacityMax: number;
  fallbackBlurMax: number;
  brightnessMin: number;
}): void {
  assert.ok(
    presentation.stageOpacity <= limits.stageOpacityMax,
    `stage opacity ${presentation.stageOpacity} exceeds ${limits.stageOpacityMax}`,
  );
  assert.ok(
    presentation.fromBackdropOpacity <= limits.fromBackdropOpacityMax,
    `from backdrop opacity ${presentation.fromBackdropOpacity} exceeds ${limits.fromBackdropOpacityMax}`,
  );
  assert.ok(
    presentation.targetBackdropOpacity <= limits.targetBackdropOpacityMax,
    `target backdrop opacity ${presentation.targetBackdropOpacity} exceeds ${limits.targetBackdropOpacityMax}`,
  );
  assert.ok(
    presentation.fallbackBlur <= limits.fallbackBlurMax,
    `fallback blur ${presentation.fallbackBlur} exceeds ${limits.fallbackBlurMax}`,
  );
  assert.ok(
    presentation.backdropBrightness >= limits.brightnessMin,
    `backdrop brightness ${presentation.backdropBrightness} is below ${limits.brightnessMin}`,
  );
}

test('scene travel presentation keeps whole-screen haze restrained after target preview is ready', () => {
  const presentation = resolveTravelOverlayPresentation(createFrame({}), true);

  assert.ok(
    presentation.stageOpacity >= 0.28,
    `stage opacity ${presentation.stageOpacity} is too weak to read as a real transition layer`,
  );
  assert.ok(
    presentation.targetBackdropOpacity >= 0.08,
    `target backdrop opacity ${presentation.targetBackdropOpacity} is too weak to create target-side presence`,
  );
  assertPresentationBounds(presentation, {
    stageOpacityMax: 0.98,
    fromBackdropOpacityMax: 0.14,
    targetBackdropOpacityMax: 0.22,
    fallbackBlurMax: 9,
    brightnessMin: 0.88,
  });
});

test('scene turn-in presentation avoids dark full-screen veil before target preview is ready', () => {
  const presentation = resolveTravelOverlayPresentation(
    createFrame({
      stage: 'turn-in',
      targetReady: false,
      stageProgress: 0.35,
      revealProgress: 0,
      targetMixProgress: 0,
      fromOpacity: 0.5,
      targetFocus: 0.18,
      blurPx: 13,
    }),
    false,
  );

  assertPresentationBounds(presentation, {
    stageOpacityMax: 0.95,
    fromBackdropOpacityMax: 0.38,
    targetBackdropOpacityMax: 0,
    fallbackBlurMax: 13,
    brightnessMin: 0.88,
  });
});

test('scene turn-in keeps enough overlay coverage when preview shell exists but target low is still not ready', () => {
  const presentation = resolveTravelOverlayPresentation(
    createFrame({
      stage: 'turn-in',
      targetReady: false,
      stageProgress: 0.35,
      revealProgress: 0,
      targetMixProgress: 0,
      fromOpacity: 0.5,
      targetFocus: 0.18,
      blurPx: 13,
    }),
    true,
  );

  assert.ok(
    presentation.stageOpacity >= 0.3,
    `stage opacity ${presentation.stageOpacity} is too weak to cover early target leakage`,
  );
  assert.ok(
    presentation.targetBackdropOpacity <= 0.38,
    `target backdrop opacity ${presentation.targetBackdropOpacity} is too strong before target low is ready`,
  );
  assert.ok(
    presentation.targetRevealInset >= 46,
    `target reveal inset ${presentation.targetRevealInset} opens too wide before target low is ready`,
  );
});

test('forward center-reveal keeps target preview constrained to a corridor instead of flattening into a full-screen plate', () => {
  const presentation = resolveTravelOverlayPresentation(
    createFrame({
      stage: 'travel',
      targetReady: false,
      wipeFrom: 'center',
      stageProgress: 0.42,
      revealProgress: 0,
      targetMixProgress: 0,
      fromOpacity: 0.7,
      fromEdgeMix: 0.8,
      targetFocus: 0.12,
      forwardDriveStrength: 1,
      blurPx: 12,
    }),
    true,
  );

  assert.ok(
    presentation.backdropBrightness <= 0.7,
    `center reveal brightness ${presentation.backdropBrightness} is too bright and reads as a flat haze`,
  );
  assert.ok(
    presentation.targetBackdropOpacity <= 0.14,
    `center reveal target backdrop opacity ${presentation.targetBackdropOpacity} is too strong before target ready`,
  );
  assert.ok(
    presentation.targetRevealInset >= 70,
    `center reveal inset ${presentation.targetRevealInset} opens too wide for an early corridor hold`,
  );
});

test('scene settle presentation sheds residual overlay quickly instead of lingering as a full-screen mist', () => {
  const presentation = resolveTravelOverlayPresentation(
    createFrame({
      stage: 'settle',
      stageProgress: 0.6,
      settleStrength: 0.6,
      revealProgress: 1,
      targetMixProgress: 1,
      targetFocus: 1,
      fromOpacity: 0.04,
      blurPx: 3,
    }),
    true,
  );

  assertPresentationBounds(presentation, {
    stageOpacityMax: 0.24,
    fromBackdropOpacityMax: 0.04,
    targetBackdropOpacityMax: 0.22,
    fallbackBlurMax: 5,
    brightnessMin: 0.99,
  });
});
