export type MuseumShellPhase =
  | 'COVER'
  | 'ENTER_PRELOADING'
  | 'SCENE_ACTIVE'
  | 'SCENE_TRANSITION'
  | 'SCENE_PREVIEW_READY'
  | 'SCENE_SHARPENING'
  | 'ERROR_FALLBACK';

export type MuseumShellState = {
  phase: MuseumShellPhase;
  museumId: string | null;
  currentSceneId: string | null;
  pendingSceneId: string | null;
  previewUrl: string | null;
  overlayVisible: boolean;
  inputLocked: boolean;
  lastError: string | null;
};

export type MuseumShellEvent =
  | { type: 'SHOW_COVER'; museumId: string }
  | {
      type: 'START_ENTER';
      museumId: string;
      sceneId: string;
      previewAlreadyReady: boolean;
      previewUrl?: string;
    }
  | {
      type: 'START_SCENE_TRANSITION';
      museumId: string;
      fromSceneId: string;
      toSceneId: string;
    }
  | { type: 'TARGET_PREVIEW_READY'; sceneId: string; previewUrl: string }
  | { type: 'SCENE_LOW_READY'; sceneId: string }
  | { type: 'SCENE_HIGH_READY'; sceneId: string }
  | { type: 'SCENE_DEGRADED_READY'; sceneId: string }
  | { type: 'SCENE_ERROR'; sceneId: string; message: string }
  | { type: 'RETRY_SCENE'; museumId: string; sceneId: string };

export function createMuseumShellState(
  seed: Partial<MuseumShellState> = {},
): MuseumShellState {
  return {
    phase: seed.phase ?? 'COVER',
    museumId: seed.museumId ?? null,
    currentSceneId: seed.currentSceneId ?? null,
    pendingSceneId: seed.pendingSceneId ?? null,
    previewUrl: seed.previewUrl ?? null,
    overlayVisible: seed.overlayVisible ?? false,
    inputLocked: seed.inputLocked ?? false,
    lastError: seed.lastError ?? null,
  };
}

export function reduceMuseumShellState(
  state: MuseumShellState,
  event: MuseumShellEvent,
): MuseumShellState {
  switch (event.type) {
    case 'SHOW_COVER':
      return {
        ...state,
        phase: 'COVER',
        museumId: event.museumId,
        pendingSceneId: null,
        previewUrl: null,
        overlayVisible: true,
        inputLocked: false,
        lastError: null,
      };
    case 'START_ENTER':
      return {
        ...state,
        phase: event.previewAlreadyReady ? 'SCENE_PREVIEW_READY' : 'ENTER_PRELOADING',
        museumId: event.museumId,
        pendingSceneId: event.sceneId,
        previewUrl: event.previewUrl ?? null,
        overlayVisible: true,
        inputLocked: true,
        lastError: null,
      };
    case 'START_SCENE_TRANSITION':
      return {
        ...state,
        phase: 'SCENE_TRANSITION',
        museumId: event.museumId,
        currentSceneId: event.fromSceneId,
        pendingSceneId: event.toSceneId,
        previewUrl: null,
        overlayVisible: true,
        inputLocked: true,
        lastError: null,
      };
    case 'TARGET_PREVIEW_READY':
      if (state.pendingSceneId !== event.sceneId) return state;
      return {
        ...state,
        phase: 'SCENE_PREVIEW_READY',
        previewUrl: event.previewUrl,
        overlayVisible: true,
        inputLocked: true,
      };
    case 'SCENE_LOW_READY':
      if (state.pendingSceneId !== event.sceneId && state.currentSceneId !== event.sceneId) {
        return state;
      }
      return {
        ...state,
        phase: 'SCENE_SHARPENING',
        overlayVisible: true,
        inputLocked: true,
      };
    case 'SCENE_HIGH_READY':
    case 'SCENE_DEGRADED_READY':
      if (state.pendingSceneId !== event.sceneId && state.currentSceneId !== event.sceneId) {
        return state;
      }
      return {
        ...state,
        phase: 'SCENE_ACTIVE',
        currentSceneId: event.sceneId,
        pendingSceneId: null,
        previewUrl: null,
        overlayVisible: false,
        inputLocked: false,
        lastError: null,
      };
    case 'SCENE_ERROR':
      return {
        ...state,
        phase: 'ERROR_FALLBACK',
        pendingSceneId: event.sceneId,
        overlayVisible: true,
        inputLocked: true,
        lastError: event.message,
      };
    case 'RETRY_SCENE':
      return {
        ...state,
        phase: 'SCENE_TRANSITION',
        museumId: event.museumId,
        pendingSceneId: event.sceneId,
        overlayVisible: true,
        inputLocked: true,
        lastError: null,
      };
    default:
      return state;
  }
}
