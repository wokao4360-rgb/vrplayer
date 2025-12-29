/**
 * 全局全屏状态管理器
 * 监听全屏状态变化，提供统一的 isFullscreen 状态
 */

let isFullscreenState = false;

/**
 * 检查当前是否处于全屏状态
 */
export function isFullscreen(): boolean {
  const d = document as any;
  return Boolean(document.fullscreenElement || d.webkitFullscreenElement);
}

/**
 * 初始化全屏状态监听
 */
export function initFullscreenState(): void {
  const updateState = () => {
    isFullscreenState = isFullscreen();
  };

  document.addEventListener('fullscreenchange', updateState);
  document.addEventListener('webkitfullscreenchange', updateState);
  
  // 初始化状态
  updateState();
}

/**
 * 获取当前全屏状态（缓存值）
 */
export function getFullscreenState(): boolean {
  return isFullscreenState;
}

