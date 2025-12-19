/**
 * 场景联动事件总线
 * 用于 PanoViewer / MapPanel / Dollhouse 三端共享"当前场景"与"选中/hover场景"状态
 */

export type SceneFocusSource = 'pano' | 'map' | 'dollhouse' | 'dock';

export type SceneFocusEvent =
  | { type: 'focus'; museumId: string; sceneId: string; source: SceneFocusSource; ts: number }
  | { type: 'hover'; museumId: string; sceneId: string | null; source: SceneFocusSource; ts: number };

type SceneFocusHandler = (event: SceneFocusEvent) => void;

// 去抖：避免重复事件
let lastFocusKey: string | null = null;
let lastFocusTs: number = 0;
const DEBOUNCE_MS = 200;

/**
 * 派发场景聚焦事件
 */
export function emitSceneFocus(event: SceneFocusEvent): void {
  // focus 事件去抖
  if (event.type === 'focus') {
    const key = `${event.museumId}:${event.sceneId}`;
    const now = Date.now();
    
    // 如果与上次 focus 相同且在去抖窗口内，忽略
    if (key === lastFocusKey && now - lastFocusTs < DEBOUNCE_MS) {
      return;
    }
    
    lastFocusKey = key;
    lastFocusTs = now;
  }

  // 派发自定义事件
  window.dispatchEvent(
    new CustomEvent<SceneFocusEvent>('vr:scene-focus', {
      detail: event,
    })
  );
}

/**
 * 监听场景聚焦事件
 * @returns 取消监听的函数
 */
export function onSceneFocus(handler: SceneFocusHandler): () => void {
  const wrappedHandler = (e: Event) => {
    const customEvent = e as CustomEvent<SceneFocusEvent>;
    handler(customEvent.detail);
  };

  window.addEventListener('vr:scene-focus', wrappedHandler);

  return () => {
    window.removeEventListener('vr:scene-focus', wrappedHandler);
  };
}



