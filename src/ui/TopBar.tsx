import { isFullscreen, toggleFullscreen } from './fullscreen';

type TopBarOptions = {
  title: string;
  viewerRootEl?: HTMLElement;
  onTogglePickMode?: () => boolean;
};

function createFullscreenIcon(): string {
  // 简单的 “全屏” 图标（SVG）
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

export class TopBar {
  private element: HTMLElement;
  private titleEl: HTMLElement;
  private fullscreenBtn: HTMLButtonElement;
  private pickModeBtn: HTMLButtonElement | null = null;
  private viewerRootEl?: HTMLElement;
  private onTogglePickMode?: () => boolean;
  private isPickModeActive = false;

  constructor(options: TopBarOptions) {
    this.viewerRootEl = options.viewerRootEl;
    this.onTogglePickMode = options.onTogglePickMode;
    this.element = document.createElement('div');
    this.element.className = 'vr-topbar vr-glass';

    // 监听拾取模式切换事件（用于从外部关闭拾取模式）
    const handlePickModeChange = (e: Event) => {
      const evt = e as CustomEvent<{ enabled: boolean }>;
      this.updatePickModeState(evt.detail.enabled);
    };
    window.addEventListener('vr:pickmode', handlePickModeChange);

    const inner = document.createElement('div');
    inner.className = 'vr-topbar-inner';

    const left = document.createElement('div');

    this.titleEl = document.createElement('div');
    this.titleEl.className = 'vr-topbar-title';
    this.titleEl.textContent = options.title;

    const right = document.createElement('div');
    right.className = 'vr-topbar-right';

    this.fullscreenBtn = document.createElement('button');
    this.fullscreenBtn.className = 'vr-btn vr-icon-btn';
    this.fullscreenBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = this.viewerRootEl;
      if (!target) {
        console.warn('[ui] fullscreen target not set');
        return;
      }
      try {
        await toggleFullscreen(target);
      } catch (err) {
        console.warn('[ui] toggleFullscreen failed', err);
      } finally {
        this.syncFullscreenState();
      }
    });

    this.syncFullscreenState();

    // 拾取模式按钮
    if (this.onTogglePickMode) {
      this.pickModeBtn = document.createElement('button');
      this.pickModeBtn.className = 'vr-btn vr-icon-btn';
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
      right.appendChild(this.pickModeBtn);
    }

    right.appendChild(this.fullscreenBtn);
    inner.appendChild(left);
    inner.appendChild(this.titleEl);
    inner.appendChild(right);
    this.element.appendChild(inner);
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

  setTitle(title: string): void {
    this.titleEl.textContent = title;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
