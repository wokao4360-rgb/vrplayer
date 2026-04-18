import type { SceneTransitionFrame } from './sceneTransitionTimeline.ts';

export type TravelOverlayPresentation = {
  stageOpacity: number;
  fallbackBlur: number;
  fromBackdropOpacity: number;
  backdropBrightness: number;
  fromCenterCutInner: number;
  fromCenterCutOuter: number;
  targetBackdropBlur: number;
  targetBackdropOpacity: number;
  targetRevealInset: number;
};

export function resolveTravelOverlayPresentation(
  frame: SceneTransitionFrame,
  targetImageLoaded: boolean,
): TravelOverlayPresentation {
  const sceneSource = frame.sourceKind === 'scene';
  const previewShellActive = sceneSource && targetImageLoaded && !frame.targetReady;
  const stageOpacity = sceneSource
    ? frame.stage === 'turn-in'
      ? frame.targetReady
        ? 0.1 + frame.stageProgress * 0.06
        : previewShellActive
          ? 0.22 + frame.stageProgress * 0.05
          : 0.08 + frame.stageProgress * 0.06
      : frame.stage === 'travel'
        ? frame.targetReady
          ? Math.min(0.26, 0.12 + frame.targetFocus * 0.06 + frame.revealProgress * 0.06)
          : previewShellActive
            ? Math.min(0.28, 0.22 + frame.targetFocus * 0.05 + frame.stageProgress * 0.03)
            : Math.min(0.18, 0.1 + frame.targetFocus * 0.04)
        : Math.max(0.06, 0.14 - frame.settleStrength * 0.08)
    : 1;

  const fallbackBlur = frame.targetReady && targetImageLoaded
    ? sceneSource
      ? Math.max(frame.blurPx * 0.42, 3.5)
      : Math.max(frame.blurPx * 0.7, 6)
    : Math.max(
        frame.blurPx * (sceneSource ? 0.7 : 1.35),
        sceneSource ? 8 : 24,
      );

  const fromBackdropOpacity = frame.fromOpacity * (
    sceneSource
      ? frame.targetReady
        ? 0.24
        : 0.18
      : 0.74
  );

  const backdropBrightness = sceneSource
    ? frame.stage === 'settle'
      ? 1
      : 0.98
    : frame.stage === 'settle'
      ? 0.9
      : 0.82;

  const fromCenterCutInner = sceneSource
    ? frame.targetReady
      ? 34 + frame.fromEdgeMix * 18
      : 40 + frame.fromEdgeMix * 16
    : 24 + frame.fromEdgeMix * 12;

  const targetBackdropBlur = sceneSource
    ? Math.max(frame.blurPx * (frame.targetReady ? 0.24 : 0.32), 2.5)
    : Math.max(frame.blurPx * (0.5 - frame.settleStrength * 0.18), 3);

  const targetBackdropOpacity = targetImageLoaded
    ? frame.targetReady
      ? sceneSource
        ? Math.min(
            Math.max(
              frame.revealProgress * 0.14 + frame.targetMixProgress * 0.04 + frame.targetFocus * 0.02,
              frame.stage === 'settle' ? 0.08 : 0.02,
            ),
            0.14,
          )
        : Math.min(
            Math.max(
              frame.targetMixProgress * 0.64 + frame.targetFocus * 0.22,
              frame.stage === 'settle' ? 0.68 : 0.18,
            ),
            0.96,
          )
      : sceneSource
        ? Math.min(0.03, 0.004 + frame.targetFocus * 0.03)
        : Math.min(0.16, 0.06 + frame.targetFocus * 0.22)
    : 0;

  const revealFactor = targetImageLoaded
    ? frame.targetReady
      ? Math.max(
          frame.revealProgress,
          frame.targetMixProgress * (sceneSource ? 0.22 : 0.46) + frame.targetFocus * (sceneSource ? 0.04 : 0.16),
        )
      : Math.max(sceneSource ? 0.04 : 0.12, frame.targetFocus * (sceneSource ? 0.06 : 0.28))
    : Math.max(0, frame.revealProgress);

  return {
    stageOpacity: round3(stageOpacity),
    fallbackBlur: round2(fallbackBlur),
    fromBackdropOpacity: round3(fromBackdropOpacity),
    backdropBrightness: round3(backdropBrightness),
    fromCenterCutInner: round2(fromCenterCutInner),
    fromCenterCutOuter: round2(Math.min(fromCenterCutInner + 18, 100)),
    targetBackdropBlur: round2(targetBackdropBlur),
    targetBackdropOpacity: round3(targetBackdropOpacity),
    targetRevealInset: round2(Math.max(0, (1 - revealFactor) * 100)),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
}

