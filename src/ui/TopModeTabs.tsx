/**
 * 顶部模式切换Tab组件（如视风格）
 * 显示：漫游 / 结构图 / 三维模型
 */

export type AppViewMode = 'tour' | 'structure2d' | 'structure3d';

type TopModeTabsOptions = {
  initialMode?: AppViewMode;
  onModeChange?: (mode: AppViewMode) => void;
};

export class TopModeTabs {
  private element: HTMLElement;
  private currentMode: AppViewMode;
  private onModeChange?: (mode: AppViewMode) => void;

  constructor(options: TopModeTabsOptions = {}) {
    this.currentMode = options.initialMode || 'tour';
    this.onModeChange = options.onModeChange;

    this.element = document.createElement('div');
    this.element.className = 'vr-topmodes';

    const modes: Array<{ key: AppViewMode; label: string }> = [
      { key: 'tour', label: '漫游' },
      { key: 'structure2d', label: '结构图' },
      { key: 'structure3d', label: '三维模型' },
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
      const mode = btn.getAttribute('data-mode') as AppViewMode;
      btn.classList.toggle('is-active', mode === this.currentMode);
    });
  }

  setMode(mode: AppViewMode): void {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    this.syncActiveState();
    if (this.onModeChange) {
      this.onModeChange(mode);
    }
  }

  getMode(): AppViewMode {
    return this.currentMode;
  }

  getElement(): HTMLElement {
    return this.element;
  }
}


