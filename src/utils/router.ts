import { buildSameDirUrl, buildCleanUrl } from './urlBuilder';
import { emitSceneFocus } from '../ui/sceneLinkBus';

export interface RouteParams {
  museumId?: string;
  sceneId?: string;
  yaw?: number;
  pitch?: number;
  fov?: number;
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

/**
 * 检查是否启用调试模式（?debug=1）
 */
export function isDebugMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('debug') === '1';
}

/**
 * 检查是否启用编辑器模式（?editor=1 或 ?debug=1）
 */
export function isEditorMode(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('editor') === '1' || params.get('debug') === '1';
}

export function navigateToMuseumList(): void {
  const url = buildCleanUrl();
  window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('popstate'));
}

export function navigateToSceneList(museumId: string): void {
  const url = buildSameDirUrl({ museum: museumId });
  window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('popstate'));
}

export function navigateToScene(museumId: string, sceneId: string, view?: { yaw?: number; pitch?: number; fov?: number }): void {
  const url = buildSameDirUrl({
    museum: museumId,
    scene: sceneId,
    yaw: view?.yaw,
    pitch: view?.pitch,
    fov: view?.fov,
  });
  window.history.pushState({}, '', url);
  
  // 派发场景聚焦事件（在 popstate 之前，确保其他端能收到）
  emitSceneFocus({
    type: 'focus',
    museumId,
    sceneId,
    source: 'dock',
    ts: Date.now(),
  });
  
  window.dispatchEvent(new Event('popstate'));
}

