import { buildSameDirUrl, buildCleanUrl } from './urlBuilder';
import { emitSceneFocus } from '../ui/sceneLinkBus';

export interface RouteParams {
  museumId?: string;
  sceneId?: string;
  yaw?: number;
  pitch?: number;
  fov?: number;
}

export interface SceneRouteView {
  yaw?: number;
  pitch?: number;
  fov?: number;
}

type RouteHistoryMode = 'push' | 'replace';

function commitRoute(url: string, historyMode: RouteHistoryMode): void {
  if (historyMode === 'replace') {
    window.history.replaceState({}, '', url);
    return;
  }
  window.history.pushState({}, '', url);
}

export function parseRoute(): RouteParams {
  const params = new URLSearchParams(window.location.search);
  const yaw = params.get('yaw');
  const pitch = params.get('pitch');
  const fov = params.get('fov');

  return {
    museumId: params.get('museum') || undefined,
    sceneId: params.get('scene') || undefined,
    yaw: yaw ? parseFloat(yaw) : undefined,
    pitch: pitch ? parseFloat(pitch) : undefined,
    fov: fov ? parseFloat(fov) : undefined,
  };
}

export function isDebugMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('debug') === '1';
}

export function isEditorMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('editor') === '1' || params.get('debug') === '1';
}

export function navigateToMuseumList(): void {
  const url = buildCleanUrl();
  window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('popstate'));
}

export function navigateToMuseum(museumId: string): void {
  const url = buildSameDirUrl({
    museum: museumId,
    scene: null,
    yaw: null,
    pitch: null,
    fov: null,
  });
  commitRoute(url, 'push');
  window.dispatchEvent(new Event('popstate'));
}

export function navigateToSceneList(museumId: string): void {
  navigateToMuseum(museumId);
}

export function navigateToScene(
  museumId: string,
  sceneId: string,
  view?: SceneRouteView,
  options?: {
    history?: RouteHistoryMode;
    emitFocus?: boolean;
    focusSource?: 'dock' | 'pano' | 'pano-auto' | 'shell';
  },
): void {
  const url = buildSameDirUrl({
    museum: museumId,
    scene: sceneId,
    yaw: view?.yaw,
    pitch: view?.pitch,
    fov: view?.fov,
  });
  commitRoute(url, options?.history ?? 'push');

  if (options?.emitFocus !== false) {
    emitSceneFocus({
      type: 'focus',
      museumId,
      sceneId,
      source: options?.focusSource ?? 'dock',
      ts: Date.now(),
    });
  }

  window.dispatchEvent(new Event('popstate'));
}

export function replaceSceneView(
  museumId: string,
  sceneId: string,
  view?: SceneRouteView,
): void {
  const url = buildSameDirUrl({
    museum: museumId,
    scene: sceneId,
    yaw: view?.yaw,
    pitch: view?.pitch,
    fov: view?.fov,
  });
  commitRoute(url, 'replace');
}
