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
  const forwardRevealMode = sceneSource && frame.wipeFrom === 'center';
  const previewShellActive = sceneSource && targetImageLoaded && !frame.targetReady;
  const stageOpacity = sceneSource
    ? frame.stage === 'turn-in'
      ? frame.targetReady
        ? 0.88 + frame.stageProgress * 0.06
        : previewShellActive
          ? forwardRevealMode
            ? 0.42 + frame.stageProgress * 0.08 + frame.forwardDriveStrength * 0.08
            : 0.54 + frame.stageProgress * 0.1 + frame.forwardDriveStrength * 0.08
          : 0.46 + frame.stageProgress * 0.1 + frame.forwardDriveStrength * 0.06
      : frame.stage === 'travel'
        ? frame.targetReady
          ? Math.min(
            forwardRevealMode ? 0.76 : 0.98,
              (forwardRevealMode ? 0.68 : 0.9) +
                frame.targetFocus * (forwardRevealMode ? 0.02 : 0.05) +
                frame.revealProgress * (forwardRevealMode ? 0.015 : 0.03),
            )
          : previewShellActive
            ? Math.min(
                forwardRevealMode ? 0.72 : 0.84,
                (forwardRevealMode ? 0.44 : 0.58) +
                  frame.targetFocus * (forwardRevealMode ? 0.03 : 0.08) +
                  frame.stageProgress * (forwardRevealMode ? 0.08 : 0.14) +
                  frame.forwardDriveStrength * (forwardRevealMode ? 0.08 : 0.08),
              )
            : Math.min(0.72, 0.5 + frame.stageProgress * 0.1 + frame.forwardDriveStrength * 0.05)
        : Math.max(0.12, 0.26 - frame.settleStrength * 0.14)
    : 1;

  const fallbackBlur = frame.targetReady && targetImageLoaded
    ? sceneSource
      ? Math.max(frame.blurPx * 0.5, 4.5)
      : Math.max(frame.blurPx * 0.7, 6)
    : Math.max(
        frame.blurPx * (sceneSource ? 0.48 - frame.forwardDriveStrength * 0.1 : 1.35),
        sceneSource ? 10 : 24,
      );

  const fromBackdropOpacity = frame.fromOpacity * (
    sceneSource
      ? frame.targetReady
        ? forwardRevealMode
          ? 0.38
          : 0.42
        : previewShellActive
          ? forwardRevealMode
            ? Math.max(0.22, 0.42 - frame.forwardDriveStrength * 0.02)
            : Math.max(0.04, 0.18 - frame.forwardDriveStrength * 0.08)
          : Math.max(0.08, 0.24 - frame.forwardDriveStrength * 0.08)
        : 0.74
  );

  const backdropBrightness = sceneSource
    ? frame.stage === 'settle'
      ? 1
      : frame.targetReady && forwardRevealMode
        ? 0.48 - frame.forwardDriveStrength * 0.04
        : previewShellActive
          ? (forwardRevealMode ? 0.56 : 0.82) - frame.forwardDriveStrength * (forwardRevealMode ? 0.08 : 0.06)
          : 0.9 - frame.forwardDriveStrength * 0.04
    : frame.stage === 'settle'
      ? 0.9
      : 0.82;

  const fromCenterCutInner = sceneSource
    ? frame.targetReady
      ? forwardRevealMode
        ? 44 + frame.fromEdgeMix * 14
        : 26 + frame.fromEdgeMix * 18
      : previewShellActive
        ? forwardRevealMode
          ? 58 + frame.fromEdgeMix * 12 + frame.forwardDriveStrength * 8
          : 46 + frame.fromEdgeMix * 16 + frame.forwardDriveStrength * 10
        : 34 + frame.fromEdgeMix * 14 + frame.forwardDriveStrength * 8
    : 24 + frame.fromEdgeMix * 12;

  const targetBackdropBlur = sceneSource
    ? Math.max(frame.blurPx * (frame.targetReady ? 0.26 : 0.3), 2.5)
    : Math.max(frame.blurPx * (0.5 - frame.settleStrength * 0.18), 3);

  const targetBackdropOpacity = targetImageLoaded
    ? frame.targetReady
      ? sceneSource
        ? Math.min(
            Math.max(
              frame.revealProgress * (forwardRevealMode ? 0.08 : 0.18) +
                frame.targetMixProgress * (forwardRevealMode ? 0.04 : 0.08) +
                frame.targetFocus * (forwardRevealMode ? 0.02 : 0.04),
              frame.stage === 'settle' ? (forwardRevealMode ? 0.1 : 0.18) : 0.02,
            ),
            forwardRevealMode ? 0.08 : 0.16,
          )
        : Math.min(
            Math.max(
              frame.targetMixProgress * 0.64 + frame.targetFocus * 0.22,
              frame.stage === 'settle' ? 0.68 : 0.18,
            ),
            0.96,
          )
        : sceneSource
          ? previewShellActive
            ? Math.min(
                forwardRevealMode ? 0.12 : 0.46,
                0.04 +
                  frame.stageProgress * (forwardRevealMode ? 0.04 : 0.18) +
                  frame.targetFocus * (forwardRevealMode ? 0.03 : 0.18) +
                  frame.forwardDriveStrength * (forwardRevealMode ? 0.03 : 0.14),
              )
            : 0
          : Math.min(0.16, 0.06 + frame.targetFocus * 0.22)
    : 0;

  const revealFactor = targetImageLoaded
      ? frame.targetReady
      ? Math.max(
          frame.revealProgress * (sceneSource ? (forwardRevealMode ? 0.58 : 0.96) : 1),
          frame.targetMixProgress * (sceneSource ? (forwardRevealMode ? 0.16 : 0.42) : 0.46) +
            frame.targetFocus * (sceneSource ? (forwardRevealMode ? 0.05 : 0.12) : 0.16),
        )
      : sceneSource
        ? previewShellActive
          ? forwardRevealMode
            ? Math.min(
                0.24,
                0.02 +
                  frame.stageProgress * 0.035 +
                  frame.targetFocus * 0.02 +
                  frame.forwardDriveStrength * 0.04,
              )
            : Math.min(0.78, 0.34 + frame.stageProgress * 0.26 + frame.targetFocus * 0.12 + frame.forwardDriveStrength * 0.18)
          : 0
        : Math.max(0.12, frame.targetFocus * 0.28)
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
