/**
 * 拾取落点全局缓存（用于 ConfigStudio 一键新增热点）
 */

export type PickPoint = {
  yaw: number;
  pitch: number;
  ts: number;
};

const STORAGE_KEY = 'vr_last_pick_v1';

// 内存缓存
let lastPick: PickPoint | null = null;

/**
 * 从 localStorage 恢复（如果存在）
 */
function restoreFromStorage(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PickPoint;
      // 验证数据结构
      if (typeof parsed.yaw === 'number' && typeof parsed.pitch === 'number' && typeof parsed.ts === 'number') {
        lastPick = parsed;
      }
    }
  } catch {
    // 忽略解析错误
  }
}

// 初始化时尝试恢复
restoreFromStorage();

/**
 * 设置最近一次拾取点
 */
export function setLastPick(p: PickPoint): void {
  lastPick = p;
  // 同时保存到 localStorage（方便刷新后还能用）
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // 忽略存储失败（如隐私模式）
  }
}

/**
 * 获取最近一次拾取点
 */
export function getLastPick(): PickPoint | null {
  return lastPick;
}

/**
 * 清除最近一次拾取点
 */
export function clearLastPick(): void {
  lastPick = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 忽略清除失败
  }
}

