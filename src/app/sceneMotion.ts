type SameMuseumSceneMotionArgs = {
  currentYaw: number;
  currentPitch: number;
  currentFov: number;
  targetYaw: number;
  targetPitch: number;
  targetFov: number;
};

export type SameMuseumSceneMotion = {
  currentYaw: number;
  currentPitch: number;
  currentFov: number;
  targetYaw: number;
  targetPitch: number;
  targetFov: number;
  commitMs: number;
  totalMs: number;
  preCommitYaw: number;
  preCommitPitch: number;
  preCommitFov: number;
};

export type SameMuseumSceneMotionSample = {
  yaw: number;
  pitch: number;
  fov: number;
  didCommit: boolean;
  done: boolean;
};

const MIN_TOTAL_MS = 420;
const MAX_TOTAL_MS = 560;
const MIN_COMMIT_MS = 120;
const MAX_COMMIT_MS = 180;
const PRECOMMIT_PROGRESS = 0.38;
const MAX_FOV_PULSE = 2.8;

export function buildSameMuseumSceneMotion(
  args: SameMuseumSceneMotionArgs,
): SameMuseumSceneMotion {
  const yawDelta = shortestAngleDelta(args.currentYaw, args.targetYaw);
  const pitchDelta = args.targetPitch - args.currentPitch;
  const fovDelta = args.targetFov - args.currentFov;
  const totalMs = clamp(
    MIN_TOTAL_MS + Math.abs(yawDelta) * 1.6 + Math.abs(pitchDelta) * 4 + Math.abs(fovDelta) * 5,
    MIN_TOTAL_MS,
    MAX_TOTAL_MS,
  );
  const commitMs = clamp(
    MIN_COMMIT_MS + Math.abs(yawDelta) * 0.55 + Math.abs(pitchDelta) * 2,
    MIN_COMMIT_MS,
    Math.min(MAX_COMMIT_MS, totalMs * 0.48),
  );
  const preCommitYaw = args.currentYaw + yawDelta * PRECOMMIT_PROGRESS;
  const preCommitPitch = args.currentPitch + pitchDelta * 0.24;
  const preCommitFov = args.currentFov + clamp(fovDelta * 0.4 - 1.4, -MAX_FOV_PULSE, 1.2);

  return {
    ...args,
    commitMs,
    totalMs,
    preCommitYaw,
    preCommitPitch,
    preCommitFov,
  };
}

export function sampleSameMuseumSceneMotion(
  motion: SameMuseumSceneMotion,
  timeMs: number,
): SameMuseumSceneMotionSample {
  const clampedTimeMs = clamp(timeMs, 0, motion.totalMs);
  if (clampedTimeMs <= motion.commitMs) {
    const progress = motion.commitMs <= 0 ? 1 : clampedTimeMs / motion.commitMs;
    return {
      yaw: lerp(motion.currentYaw, motion.preCommitYaw, easeOutCubic(progress)),
      pitch: lerp(motion.currentPitch, motion.preCommitPitch, easeOutCubic(progress)),
      fov: lerp(motion.currentFov, motion.preCommitFov, easeOutCubic(progress)),
      didCommit: clampedTimeMs >= motion.commitMs,
      done: clampedTimeMs >= motion.totalMs,
    };
  }

  const settleDuration = Math.max(1, motion.totalMs - motion.commitMs);
  const progress = (clampedTimeMs - motion.commitMs) / settleDuration;
  return {
    yaw: lerp(motion.preCommitYaw, motion.targetYaw, easeOutQuad(progress)),
    pitch: lerp(motion.preCommitPitch, motion.targetPitch, easeOutQuad(progress)),
    fov: lerp(motion.preCommitFov, motion.targetFov, easeOutQuad(progress)),
    didCommit: true,
    done: clampedTimeMs >= motion.totalMs,
  };
}

function shortestAngleDelta(from: number, to: number): number {
  let delta = to - from;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return delta;
}

function easeOutCubic(value: number): number {
  const t = clamp(value, 0, 1);
  return 1 - (1 - t) ** 3;
}

function easeOutQuad(value: number): number {
  const t = clamp(value, 0, 1);
  return 1 - (1 - t) * (1 - t);
}

function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * clamp(progress, 0, 1);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
