/**
 * 右上角控制按钮（全屏 + 坐标拾取 + 北向校准 + VR）
 */

import { isFullscreen, requestFullscreenBestEffort, exitFullscreenBestEffort } from './fullscreen';
import { __VR_DEBUG__ } from '../utils/debug';
import { isTouchDevice } from '../utils/deviceDetect';

type TopRightControlsOptions = {
  viewerRootEl?: HTMLElement;
  onTogglePickMode?: () => boolean;
  onOpenNorthCalibration?: () => void;
  showNorthCalibration?: boolean;
  onToggleVrMode?: () => Promise<boolean>;
};

function createFullscreenIcon(): string {
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
  private vrModeBtn: HTMLButtonElement | null = null;
  private handlePickModeChange: ((e: Event) => void) | null = null;
  private handleFullscreenChange: (() => void) | null = null;
  private viewerRootEl?: HTMLElement;
  private onTogglePickMode?: () => boolean;
  private onOpenNorthCalibration?: () => void;
  private onToggleVrMode?: () => Promise<boolean>;
  private isPickModeActive = false;
  private isVrModeActive = false;

  constructor(options: TopRightControlsOptions = {}) {
    this.viewerRootEl = options.viewerRootEl;
    this.onTogglePickMode = options.onTogglePickMode;
    this.onOpenNorthCalibration = options.onOpenNorthCalibration;
    this.onToggleVrMode = options.onToggleVrMode;

    this.element = document.createElement('div');
    this.element.className = 'vr-topright-controls';

    this.handlePickModeChange = (e: Event) => {
      const evt = e as CustomEvent<{ enabled: boolean }>;
      this.updatePickModeState(evt.detail.enabled);
    };
    window.addEventListener('vr:pickmode', this.handlePickModeChange);

    this.handleFullscreenChange = () => {
      this.syncFullscreenState();
    };
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange as EventListener);

    this.fullscreenBtn = document.createElement('button');
    this.fullscreenBtn.className = 'vr-topright-btn vr-top-icon-only vr-icon-btn';
    this.fullscreenBtn.setAttribute('aria-label', '进入全屏');
    this.fullscreenBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isCurrentlyFullscreen = isFullscreen();
      try {
        if (isCurrentlyFullscreen) {
          await exitFullscreenBestEffort();
        } else {
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
        window.setTimeout(() => {
          this.syncFullscreenState();
        }, 100);
      }
    });

    this.syncFullscreenState();

    if (this.onTogglePickMode) {
      this.pickModeBtn = document.createElement('button');
      this.pickModeBtn.className = 'vr-topright-btn';
      this.pickModeBtn.setAttribute('aria-label', '拾取模式');
      this.pickModeBtn.title = '拾取模式：点击画面获取 yaw/pitch';
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

    const shouldShowNorthCalibration = options.showNorthCalibration !== false
      && (options.onOpenNorthCalibration || __VR_DEBUG__);
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

    if (isTouchDevice() && this.onToggleVrMode) {
      this.vrModeBtn = document.createElement('button');
      this.vrModeBtn.className = 'vr-topright-btn vr-top-icon-only vr-icon-btn';
      this.vrModeBtn.setAttribute('aria-label', 'VR眼镜');
      this.vrModeBtn.title = 'VR眼镜：转动设备控制视角';
      this.vrModeBtn.textContent = '🥽';
      this.vrModeBtn.style.fontSize = '18px';
      this.vrModeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.onToggleVrMode) {
          try {
            const isEnabled = await this.onToggleVrMode();
            this.updateVrModeState(isEnabled);
          } catch (err) {
            if (__VR_DEBUG__) {
              console.debug('[TopRightControls] VR mode toggle failed', err);
            }
          }
        }
      });
      this.element.appendChild(this.vrModeBtn);
    }

    this.element.appendChild(this.fullscreenBtn);
  }

  private updatePickModeState(isActive: boolean): void {
    this.isPickModeActive = isActive;
    if (this.pickModeBtn) {
      this.pickModeBtn.setAttribute('aria-label', isActive ? '关闭拾取模式' : '开启拾取模式');
      this.pickModeBtn.title = isActive ? '关闭拾取模式' : '开启拾取模式：点击画面获取 yaw/pitch';
      this.pickModeBtn.style.background = isActive ? 'rgba(255,255,255,0.18)' : '';
    }
  }

  updateVrModeState(isActive: boolean): void {
    this.isVrModeActive = isActive;
    if (this.vrModeBtn) {
      this.vrModeBtn.setAttribute('aria-label', isActive ? '退出VR模式' : '进入VR模式');
      this.vrModeBtn.title = isActive ? '退出VR模式' : 'VR眼镜：转动设备控制视角';
      this.vrModeBtn.style.background = isActive ? 'rgba(255,255,255,0.18)' : '';
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
    if (this.handlePickModeChange) {
      window.removeEventListener('vr:pickmode', this.handlePickModeChange);
      this.handlePickModeChange = null;
    }
    if (this.handleFullscreenChange) {
      document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange as EventListener);
      this.handleFullscreenChange = null;
    }
    this.element.remove();
  }
}
