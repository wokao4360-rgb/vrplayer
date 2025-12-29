import { isFullscreen } from '../utils/fullscreenState';

let toastTimer: number | null = null;

export function showToast(message: string, durationMs = 1500): void {
  // 全屏状态下不显示任何提示
  if (isFullscreen()) {
    return;
  }

  const existing = document.querySelector('.vr-toast') as HTMLElement | null;
  const el = existing ?? document.createElement('div');
  el.className = 'vr-toast';
  el.textContent = message;
  if (!existing) document.body.appendChild(el);

  window.requestAnimationFrame(() => el.classList.add('show'));
  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    el.classList.remove('show');
    window.setTimeout(() => el.remove(), 220);
    toastTimer = null;
  }, durationMs);
}

/**
 * 清除所有 toast（全屏时调用）
 */
export function clearAllToasts(): void {
  const existing = document.querySelector('.vr-toast') as HTMLElement | null;
  if (existing) {
    existing.classList.remove('show');
    window.setTimeout(() => existing.remove(), 220);
  }
  if (toastTimer) {
    window.clearTimeout(toastTimer);
    toastTimer = null;
  }
}




