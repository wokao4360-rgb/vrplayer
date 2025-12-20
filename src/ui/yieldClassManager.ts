/**
 * UI 让位 Class 管理器
 * 统一管理 document.documentElement 上的 .vr-ui-interacting 和 .vr-ui-restoring class
 * 实现统一的恢复延迟机制
 */

import { interactionBus } from './interactionBus';
import { getYieldTimings } from './uiYieldPolicy';

let restoreTimer: number | null = null;
let unsubscribeInteracting: (() => void) | null = null;
let unsubscribeIdle: (() => void) | null = null;
let unsubscribeUIEngaged: (() => void) | null = null;

/**
 * 初始化 yield class manager
 */
export function initYieldClassManager(): void {
  const timings = getYieldTimings();

  unsubscribeInteracting = interactionBus.on('user-interacting', () => {
    // 清除恢复定时器
    if (restoreTimer !== null) {
      clearTimeout(restoreTimer);
      restoreTimer = null;
    }
    
    // 添加 interacting class，移除 restoring class
    document.documentElement.classList.add('vr-ui-interacting');
    document.documentElement.classList.remove('vr-ui-restoring');
  });

  unsubscribeIdle = interactionBus.on('user-idle', () => {
    // 清除恢复定时器
    if (restoreTimer !== null) {
      clearTimeout(restoreTimer);
      restoreTimer = null;
    }

    // 先移除 interacting class，但延迟后再移除 restoring（触发恢复动画）
    document.documentElement.classList.remove('vr-ui-interacting');
    
    // 延迟后移除 restoring class，触发恢复
    restoreTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('vr-ui-restoring');
      restoreTimer = null;
    }, timings.restoreDelayMs);
  });

  unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
    // 清除恢复定时器
    if (restoreTimer !== null) {
      clearTimeout(restoreTimer);
      restoreTimer = null;
    }

    // UI 被点击时立即恢复（不等延迟）
    document.documentElement.classList.remove('vr-ui-interacting');
    document.documentElement.classList.remove('vr-ui-restoring');
  });
}

/**
 * 清理资源
 */
export function disposeYieldClassManager(): void {
  if (restoreTimer !== null) {
    clearTimeout(restoreTimer);
    restoreTimer = null;
  }
  if (unsubscribeInteracting) {
    unsubscribeInteracting();
    unsubscribeInteracting = null;
  }
  if (unsubscribeIdle) {
    unsubscribeIdle();
    unsubscribeIdle = null;
  }
  if (unsubscribeUIEngaged) {
    unsubscribeUIEngaged();
    unsubscribeUIEngaged = null;
  }
  // 清理 class
  document.documentElement.classList.remove('vr-ui-interacting', 'vr-ui-restoring');
}



