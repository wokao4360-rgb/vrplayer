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

function createVrIcon(): string {
  return `
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 9.5C4 8.67157 4.67157 8 5.5 8H8.2C8.73104 8 9.22368 8.28121 9.49584 8.7396L10.2 9.925H13.8L14.5042 8.7396C14.7763 8.28121 15.269 8 15.8 8H18.5C19.3284 8 20 8.67157 20 9.5V14.5C20 15.3284 19.3284 16 18.5 16H15.7C15.1767 16 14.6905 15.7268 14.4158 15.2797L13.7 14.125H10.3L9.58422 15.2797C9.30955 15.7268 8.82335 16 8.3 16H5.5C4.67157 16 4 15.3284 4 14.5V9.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M8.5 12.1C8.5 13.2046 7.60457 14.1 6.5 14.1C5.39543 14.1 4.5 13.2046 4.5 12.1C4.5 10.9954 5.39543 10.1 6.5 10.1C7.60457 10.1 8.5 10.9954 8.5 12.1Z" stroke="currentColor" stroke-width="1.8"/>
  <path d="M19.5 12.1C19.5 13.2046 18.6046 14.1 17.5 14.1C16.3954 14.1 15.5 13.2046 15.5 12.1C15.5 10.9954 16.3954 10.1 17.5 10.1C18.6046 10.1 19.5 10.9954 19.5 12.1Z" stroke="currentColor" stroke-width="1.8"/>
</svg>`;
}

function createPickIcon(): string {
  return `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M12 17V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M3 12H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M17 12H21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
</svg>`;
}

function createCompassIcon(): string {
  return `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/>
  <path d="M10.2 10.2L15.6 8.4L13.8 13.8L8.4 15.6L10.2 10.2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
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
      this.pickModeBtn.innerHTML = createPickIcon();
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
      this.northCalibrationBtn.innerHTML = createCompassIcon();
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
      this.vrModeBtn.innerHTML = createVrIcon();
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
