/**
 * 顶部模式切换Tab组件（如视风格）
 * 显示：漫游 / 平面图 / 三维模型
 */

type ViewMode = 'pano' | 'map' | 'dollhouse';

type TopModeTabsOptions = {
  initialMode?: ViewMode;
  onModeChange?: (mode: ViewMode) => void;
};

export class TopModeTabs {
  private element: HTMLElement;
  private currentMode: ViewMode;
  private onModeChange?: (mode: ViewMode) => void;

  constructor(options: TopModeTabsOptions = {}) {
    this.currentMode = options.initialMode || 'pano';
    this.onModeChange = options.onModeChange;

    this.element = document.createElement('div');
    this.element.className = 'vr-topmodes';

    const modes: Array<{ key: ViewMode; label: string }> = [
      { key: 'pano', label: '漫游' },
      { key: 'map', label: '平面图' },
      { key: 'dollhouse', label: '三维模型' },
    ];

    modes.forEach((mode) => {
      const btn = document.createElement('button');
      btn.className = 'vr-topmodes__btn';
      btn.textContent = mode.label;
      btn.setAttribute('data-mode', mode.key);

      if (mode.key === this.currentMode) {
        btn.classList.add('is-active');
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setMode(mode.key);
      });

      this.element.appendChild(btn);
    });

    this.syncActiveState();
  }

  private syncActiveState(): void {
    this.element.querySelectorAll('.vr-topmodes__btn').forEach((btn) => {
      const mode = btn.getAttribute('data-mode') as ViewMode;
      btn.classList.toggle('is-active', mode === this.currentMode);
    });
  }

  setMode(mode: ViewMode): void {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    this.syncActiveState();
    if (this.onModeChange) {
      this.onModeChange(mode);
    }
  }

  getMode(): ViewMode {
    return this.currentMode;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

