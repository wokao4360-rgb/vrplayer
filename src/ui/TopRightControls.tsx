/**
 * 右上角控制按钮（全屏 + 坐标拾取）
 * 独立于 TopBar，浮动在右上角
 */

import { isFullscreen, requestFullscreenBestEffort, exitFullscreenBestEffort } from './fullscreen';
import { __VR_DEBUG__ } from '../utils/debug';

type TopRightControlsOptions = {
  viewerRootEl?: HTMLElement;
  onTogglePickMode?: () => boolean;
  onOpenNorthCalibration?: () => void;
  showNorthCalibration?: boolean; // 是否显示校准北向按钮（默认仅在 debug 模式）
};

function createFullscreenIcon(): string {
  // 简单的 "全屏" 图标（SVG）
  return `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 4H4V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 4H20V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 20H4V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 20H20V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

function createExitFullscreenIcon(): string {
  return `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 9V4h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 9V4h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 15v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 15v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 9l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 9l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 15l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 15l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

export class TopRightControls {
  private element: HTMLElement;
  private fullscreenBtn: HTMLButtonElement;
  private pickModeBtn: HTMLButtonElement | null = null;
  private northCalibrationBtn: HTMLButtonElement | null = null;
  private viewerRootEl?: HTMLElement;
  private onTogglePickMode?: () => boolean;
  private onOpenNorthCalibration?: () => void;
  private isPickModeActive = false;

  constructor(options: TopRightControlsOptions = {}) {
    this.viewerRootEl = options.viewerRootEl;
    this.onTogglePickMode = options.onTogglePickMode;
    this.onOpenNorthCalibration = options.onOpenNorthCalibration;

    this.element = document.createElement('div');
    this.element.className = 'vr-topright-controls';

    // 监听拾取模式切换事件（用于从外部关闭拾取模式）
    const handlePickModeChange = (e: Event) => {
      const evt = e as CustomEvent<{ enabled: boolean }>;
      this.updatePickModeState(evt.detail.enabled);
    };
    window.addEventListener('vr:pickmode', handlePickModeChange);

    // 监听全屏状态变化，更新按钮图标
    const handleFullscreenChange = () => {
      this.syncFullscreenState();
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange as EventListener);

    // 全屏按钮
    this.fullscreenBtn = document.createElement('button');
    this.fullscreenBtn.className = 'vr-topright-btn';
    this.fullscreenBtn.setAttribute('aria-label', '进入全屏');
    this.fullscreenBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isCurrentlyFullscreen = isFullscreen();
      try {
        if (isCurrentlyFullscreen) {
          // 当前是全屏状态，退出全屏
          await exitFullscreenBestEffort();
        } else {
          // 当前不是全屏，进入全屏
          const target = this.viewerRootEl;
          if (!target) {
            console.warn('[TopRightControls] fullscreen target not set');
            return;
          }
          await requestFullscreenBestEffort(target);
        }
      } catch (err) {
        if (__VR_DEBUG__) {
          console.debug('[TopRightControls] fullscreen toggle failed', err);
        }
      } finally {
        // 延迟一下确保状态更新
        setTimeout(() => {
          this.syncFullscreenState();
        }, 100);
      }
    });

    this.syncFullscreenState();

    // 拾取模式按钮（如果提供了回调）
    if (this.onTogglePickMode) {
      this.pickModeBtn = document.createElement('button');
      this.pickModeBtn.className = 'vr-topright-btn';
      this.pickModeBtn.setAttribute('aria-label', '拾取模式');
      this.pickModeBtn.title = '拾取模式：点一下画面获取 yaw/pitch';
      this.pickModeBtn.textContent = '🎯';
      this.pickModeBtn.style.fontSize = '18px';
      this.pickModeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.onTogglePickMode) {
          const isActive = this.onTogglePickMode();
          this.updatePickModeState(isActive);
        }
      });
      this.element.appendChild(this.pickModeBtn);
    }

    // 校准北向按钮（如果提供了回调，或显示标志为 true）
    const shouldShowNorthCalibration = options.showNorthCalibration !== false && 
                                       (options.onOpenNorthCalibration || __VR_DEBUG__);
    if (shouldShowNorthCalibration && this.onOpenNorthCalibration) {
      this.northCalibrationBtn = document.createElement('button');
      this.northCalibrationBtn.className = 'vr-topright-btn';
      this.northCalibrationBtn.setAttribute('aria-label', '校准北向');
      this.northCalibrationBtn.title = '校准北向：设置当前场景的北方向';
      this.northCalibrationBtn.textContent = '🧭';
      this.northCalibrationBtn.style.fontSize = '18px';
      this.northCalibrationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.onOpenNorthCalibration) {
          this.onOpenNorthCalibration();
        }
      });
      this.element.appendChild(this.northCalibrationBtn);
    }

    this.element.appendChild(this.fullscreenBtn);
  }

  private updatePickModeState(isActive: boolean): void {
    this.isPickModeActive = isActive;
    if (this.pickModeBtn) {
      this.pickModeBtn.setAttribute('aria-label', isActive ? '关闭拾取模式' : '开启拾取模式');
      this.pickModeBtn.title = isActive ? '关闭拾取模式' : '开启拾取模式：点一下画面获取 yaw/pitch';
      if (isActive) {
        this.pickModeBtn.style.background = 'rgba(255,255,255,0.18)';
      } else {
        this.pickModeBtn.style.background = '';
      }
    }
  }

  setViewerRootEl(el: HTMLElement): void {
    this.viewerRootEl = el;
  }

  syncFullscreenState(): void {
    const full = isFullscreen();
    this.fullscreenBtn.setAttribute('aria-label', full ? '退出全屏' : '进入全屏');
    this.fullscreenBtn.title = full ? '退出全屏' : '进入全屏';
    this.fullscreenBtn.innerHTML = full ? createExitFullscreenIcon() : createFullscreenIcon();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}


