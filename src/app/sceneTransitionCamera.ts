import type { SceneTransitionFrame } from './sceneTransitionTimeline.ts';

export type SceneTransitionCameraView = {
  yaw: number;
  pitch: number;
  fov: number;
};

type BuildSceneTransitionCameraViewArgs = {
  frame: SceneTransitionFrame;
  currentWorldView: SceneTransitionCameraView;
  targetWorldView: SceneTransitionCameraView;
  loadCommitted: boolean;
};

export function buildSceneTransitionCameraView({
  frame,
  currentWorldView,
  targetWorldView,
  loadCommitted,
}: BuildSceneTransitionCameraViewArgs): SceneTransitionCameraView {
  if (frame.progress >= 1) {
    return { ...targetWorldView };
  }

  const blend = resolveTargetBlend(frame, loadCommitted);
  const pitch = mix(currentWorldView.pitch, targetWorldView.pitch, blend);
  const baseFov = mix(currentWorldView.fov, targetWorldView.fov, blend);
  const pitchPulse = resolvePitchPulse(frame);

  return {
    yaw: frame.displayWorldYaw,
    pitch: round2(pitch + pitchPulse),
    fov: round2(baseFov + frame.fovDelta),
  };
}

function resolveTargetBlend(frame: SceneTransitionFrame, loadCommitted: boolean): number {
  if (frame.stage === 'turn-in') {
    const base = mix(0.02, 0.08, frame.stageProgress);
    return clamp(loadCommitted ? base + 0.05 : base, 0, 0.16);
  }
  if (frame.stage === 'travel') {
    if (frame.stageProgress < 0.38) {
      return clamp(
        mix(loadCommitted ? 0.18 : 0.06, loadCommitted ? 0.4 : 0.16, frame.stageProgress / 0.38),
        0,
        loadCommitted ? 0.4 : 0.16,
      );
    }
    if (frame.stageProgress < 0.72) {
      const ramp = (frame.stageProgress - 0.38) / 0.34;
      return clamp(
        mix(loadCommitted ? 0.4 : 0.16, loadCommitted ? 0.78 : 0.34, ramp),
        0,
        loadCommitted ? 0.78 : 0.34,
      );
    }
    const tail = (frame.stageProgress - 0.72) / 0.28;
    return clamp(
      mix(loadCommitted ? 0.78 : 0.34, loadCommitted ? 0.92 : 0.5, tail),
      0,
      loadCommitted ? 0.92 : 0.5,
    );
  }
  return clamp(mix(loadCommitted ? 0.84 : 0.52, 1, frame.stageProgress), 0, 1);
}

function resolvePitchPulse(frame: SceneTransitionFrame): number {
  const strength = clamp(frame.forwardDriveStrength, 0, 1);
  if (strength <= 0.04) {
    return 0;
  }
  const centerModeBoost = frame.wipeFrom === 'center' ? 1.2 : 1;

  if (frame.stage === 'turn-in') {
    return mix(-0.35, -2.4 * centerModeBoost, frame.stageProgress) * strength;
  }
  if (frame.stage === 'travel') {
    if (frame.stageProgress < 0.42) {
      return mix(-2.4 * centerModeBoost, -0.9 * centerModeBoost, frame.stageProgress / 0.42) * strength;
    }
    return mix(-0.9 * centerModeBoost, 0.75, (frame.stageProgress - 0.42) / 0.58) * strength;
  }
  return mix(0.75, 0, frame.stageProgress) * strength;
}

function mix(from: number, to: number, t: number): number {
  return from + (to - from) * clamp(t, 0, 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round2(value: number): number {
  return Number(value.toFixed(2));
}
