/**
 * UI 让位策略（单一真源）
 * 统一管理拖动视角时 UI 的让位/恢复节奏
 */

import { interactionBus } from './interactionBus';

// 统一时间参数
const FADE_MS = 150;           // 让位淡出/隐藏的动画时长
const RESTORE_MS = 150;        // 恢复动画时长
const RESTORE_DELAY_MS = 400;  // 停止交互后延迟恢复（350-450ms 区间）

let isYielding = false;

/**
 * 获取当前是否"应让位"的布尔值
 */
export function getYieldState(): boolean {
  return isYielding;
}

/**
 * 获取统一的时间参数
 */
export function getYieldTimings() {
  return {
    fadeMs: FADE_MS,
    restoreMs: RESTORE_MS,
    restoreDelayMs: RESTORE_DELAY_MS,
  };
}

/**
 * 初始化：监听 interactionBus 更新让位状态
 */
let unsubscribeInteracting: (() => void) | null = null;
let unsubscribeIdle: (() => void) | null = null;
let unsubscribeUIEngaged: (() => void) | null = null;

export function initYieldPolicy(): void {
  unsubscribeInteracting = interactionBus.on('user-interacting', () => {
    isYielding = true;
  });
  unsubscribeIdle = interactionBus.on('user-idle', () => {
    isYielding = false;
  });
  unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
    isYielding = false;
  });
}

/**
 * 清理资源
 */
export function disposeYieldPolicy(): void {
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
}



