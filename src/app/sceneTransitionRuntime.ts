import type { Scene } from '../types/config';
import type { TransitionProgressState } from './sceneTransitionGate.ts';
import type { SceneTransitionFrame } from './sceneTransitionTimeline.ts';

export const LOAD_COMMIT_TRAVEL_PROGRESS = 0.58;

export function createInitialTransitionProgressState(
  _previewImage?: string,
): TransitionProgressState {
  return {
    targetReady: false,
    lowReady: false,
    sharpReady: false,
    loadCommitted: false,
    failed: false,
    currentProgress: 0,
    targetReadyAtTs: null,
    targetReadyProgress: 0,
    releaseAtTs: null,
    releaseProgress: 0,
  };
}

export function resolveRuntimeTransitionScene(
  scene: Scene,
  previewUrl?: string,
): Scene {
  if (scene.panoTiles?.manifest || scene.panoLow || scene.pano) {
    return scene;
  }
  if (!previewUrl) {
    return scene;
  }
  return {
    ...scene,
    panoLow: previewUrl,
  };
}

export function shouldCommitSceneLoad(
  frame: Pick<SceneTransitionFrame, 'stage' | 'stageProgress'>,
): boolean {
  return frame.stage === 'settle' || (
    frame.stage === 'travel' &&
    frame.stageProgress >= LOAD_COMMIT_TRAVEL_PROGRESS
  );
}

export function shouldForwardCommittedSceneStatus(
  loadCommitted: boolean,
  status: string,
): boolean {
  if (!loadCommitted) {
    return false;
  }
  return status === 'lowReady' ||
    status === 'highReady' ||
    status === 'degraded';
}

