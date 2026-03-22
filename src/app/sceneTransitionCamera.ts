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

  return {
    yaw: frame.displayWorldYaw,
    pitch: round2(pitch),
    fov: round2(baseFov + frame.fovDelta),
  };
}

function resolveTargetBlend(frame: SceneTransitionFrame, loadCommitted: boolean): number {
  if (frame.stage === 'turn-in') {
    const base = mix(0.04, 0.14, frame.stageProgress);
    return clamp(loadCommitted ? base + 0.08 : base, 0, 0.24);
  }
  if (frame.stage === 'travel') {
    const revealBias = Math.max(frame.revealProgress, frame.stageProgress * 0.72);
    const base = mix(loadCommitted ? 0.42 : 0.14, loadCommitted ? 0.86 : 0.42, revealBias);
    return clamp(base, 0, loadCommitted ? 0.9 : 0.46);
  }
  return clamp(mix(loadCommitted ? 0.82 : 0.42, 1, frame.stageProgress), 0, 1);
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

