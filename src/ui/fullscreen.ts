import { isMouseDevice } from '../utils/deviceDetect';
import { showToast } from './toast';

type AnyDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type AnyElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

function getFullscreenElement(): Element | null {
  const d = document as AnyDocument;
  return document.fullscreenElement || d.webkitFullscreenElement || null;
}

export function isFullscreen(): boolean {
  return Boolean(getFullscreenElement());
}

export async function requestFullscreen(el: HTMLElement): Promise<void> {
  const target = el as AnyElement;
  if (target.requestFullscreen) {
    await target.requestFullscreen();
    return;
  }
  if (target.webkitRequestFullscreen) {
    await target.webkitRequestFullscreen();
    return;
  }
  throw new Error('Fullscreen API not supported');
}

export async function exitFullscreen(): Promise<void> {
  const d = document as AnyDocument;
  if (document.exitFullscreen) {
    await document.exitFullscreen();
    return;
  }
  if (d.webkitExitFullscreen) {
    await d.webkitExitFullscreen();
    return;
  }
}

/**
 * 请求全屏（best-effort，包含错误处理）
 */
export async function requestFullscreenBestEffort(el?: HTMLElement): Promise<void> {
  const target = el || document.body;
  
  // 鼠标端：在进入全屏前显示短暂提示（700ms）
  // 注意：必须在 requestFullscreen 之前调用，进入全屏后会被 gating + clear 清掉
  if (!isFullscreen() && isMouseDevice()) {
    showToast('鼠标滑至最上方可退出全屏', 700);
  }
  
  await requestFullscreen(target);
  // 全屏后不显示任何提示（toast.ts 中的 gating 会阻止）
}

/**
 * 退出全屏（best-effort，包含错误处理）
 */
export async function exitFullscreenBestEffort(): Promise<void> {
  try {
    await exitFullscreen();
    unlockOrientationBestEffort();
  } catch (err) {
    // 忽略错误，best-effort
    // 注意：这里不使用 __VR_DEBUG__，因为可能未定义，使用 console.debug 即可
    console.debug('[fullscreen] exitFullscreenBestEffort failed:', err);
  }
}

function isMobileLike(): boolean {
  // 尽量保守：移动端才提示“建议横屏观看”
  const ua = navigator.userAgent || '';
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
}

export async function lockLandscapeBestEffort(): Promise<void> {
  try {
    // 需要 user gesture；iOS Safari 多数不可用
    if (screen.orientation?.lock) {
      await screen.orientation.lock('landscape');
      return;
    }
    // 旧 webkit/ios：大概率没有 lock 能力
    throw new Error('screen.orientation.lock not available');
  } catch {
    // 全屏后不显示任何提示
  }
}

export function unlockOrientationBestEffort(): void {
  try {
    screen.orientation?.unlock?.();
  } catch {
    // ignore
  }
}

export async function toggleFullscreen(targetEl: HTMLElement): Promise<void> {
  if (isFullscreen()) {
    await exitFullscreen();
    unlockOrientationBestEffort(); // 退出全屏时解锁横屏
    return;
  }

  await requestFullscreen(targetEl);
  await lockLandscapeBestEffort();
  // 全屏后不显示任何提示
}





