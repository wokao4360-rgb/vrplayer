import type { DockTabKey } from './DockPanels';
import { DockPanels } from './DockPanels';
import type { Museum, Scene } from '../types/config';
import { interactionBus } from './interactionBus';
import { mountModal } from './Modal';

type BottomDockOptions = {
  initialTab?: DockTabKey;
  onGuideClick?: () => void;
  onOpenInfo?: () => void;
  onOpenSettings?: () => void;
  sceneId?: string;
  sceneName?: string;
  museum?: Museum;
  scenes?: Scene[];
  currentSceneId?: string;
};

const TAB_LABELS: Array<{ key: DockTabKey; label: string }> = [
  { key: 'guide', label: '导览' },
  // 移除 map 和 dollhouse，它们已移到顶部Tab
  { key: 'community', label: '社区' },
  { key: 'info', label: '信息' },
  { key: 'settings', label: '更多' },
];

export class BottomDock {
  private element: HTMLElement;
  private dockEl: HTMLElement;
  private panels: DockPanels;
  private activeTab: DockTabKey | null;
  private onOpenInfo?: () => void;
  private onOpenSettings?: () => void;
  private unsubscribeInteracting: (() => void) | null = null;
  private unsubscribeIdle: (() => void) | null = null;
  private unsubscribeUIEngaged: (() => void) | null = null;

  constructor(options: BottomDockOptions = {}) {
    this.activeTab = null;
    this.onOpenInfo = options.onOpenInfo;
    this.onOpenSettings = options.onOpenSettings;

    this.element = document.createElement('div');
    this.element.className = 'vr-dock-wrap';

    this.panels = new DockPanels({
      initialTab: this.activeTab || 'guide',
      sceneId: options.sceneId,
      sceneName: options.sceneName,
      museum: options.museum,
      scenes: options.scenes,
      currentSceneId: options.currentSceneId || options.sceneId,
    });
    this.panels.setVisible(true);

    this.dockEl = document.createElement('div');
    this.dockEl.className = 'vr-dock vr-glass';

    for (const tab of TAB_LABELS) {
      const btn = document.createElement('button');
      btn.className = 'vr-btn vr-dock-tab';
      btn.setAttribute('data-tab', tab.key);
      btn.innerHTML = `<div class="vr-dock-tab-label">${tab.label}</div>`;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // UI 被点击，立即恢复
        interactionBus.emitUIEngaged();
        // 先设置高亮
        this.setActiveTab(tab.key);
        // 然后触发对应动作
        if (tab.key === 'guide' && options.onGuideClick) {
          options.onGuideClick();
        }
      });
      this.dockEl.appendChild(btn);
    }

    this.element.appendChild(this.panels.getElement());
    this.element.appendChild(this.dockEl);

    this.syncActiveClass();
    this.setupInteractionListeners();
    
    // 监听外部 tab 切换事件（用于同步状态，例如从 DockPanels 内部关闭面板时）
    const handleTabChange = (e: Event) => {
      const evt = e as CustomEvent<{ tab: DockTabKey | null }>;
      if (evt.detail.tab !== undefined) {
        this.setActiveTab(evt.detail.tab);
      }
    };
    window.addEventListener('vr:bottom-dock-tab-change', handleTabChange);

    // 监听关闭面板事件（优先级最高，必须清空高亮）
    const handleClosePanels = () => {
      this.clearActive();
    };
    window.addEventListener('vr:close-panels', handleClosePanels);
  }

  private setupInteractionListeners(): void {
    // 注意：class管理由 yieldClassManager 统一处理（通过 document.documentElement）
    // 这里不需要手动管理 class，保留空实现以避免类型错误
  }

  private syncActiveClass(): void {
    this.dockEl.querySelectorAll('.vr-dock-tab').forEach((el) => {
      const key = el.getAttribute('data-tab') as DockTabKey | null;
      if (!key) return;
      el.classList.toggle('active', key === this.activeTab);
    });
  }

  setActiveTab(tab: DockTabKey | null): void {
    this.activeTab = tab;
    this.syncActiveClass();
    
    if (tab !== null) {
      this.panels.setTab(tab);
      // 派发事件通知TopModeTabs同步状态
      window.dispatchEvent(new CustomEvent('vr:bottom-dock-tab-change', {
        detail: { tab },
      }));

      // 额外行为：信息 / 设置 打开弹窗
      if (tab === 'info') {
        if (this.onOpenInfo) {
          this.onOpenInfo();
        } else {
          this.openFallbackInfoModal();
        }
      } else if (tab === 'settings') {
        if (this.onOpenSettings) {
          this.onOpenSettings();
        } else {
          this.openFallbackSettingsModal();
        }
      }
    }
  }

  getActiveTab(): DockTabKey | null {
    return this.activeTab;
  }

  setSceneContext(sceneId: string, sceneName?: string): void {
    this.panels.setSceneContext(sceneId, sceneName);
  }

  setMuseumContext(museum: Museum, scenes: Scene[], currentSceneId: string): void {
    this.panels.setMuseumContext(museum, scenes, currentSceneId);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  /**
   * 清除所有按钮的激活态（UI 上不保留高亮）
   */
  clearActive(): void {
    this.dockEl.querySelectorAll('.vr-dock-tab').forEach((el) => {
      el.classList.remove('active');
    });
  }

  /**
   * 没有传入上层回调时的兜底信息弹窗
   */
  private openFallbackInfoModal(): void {
    mountModal({
      title: '信息',
      contentHtml: `
        <div class="vr-modal-info-list">
          <div><span class="vr-modal-info-row-label">馆：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">场景：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">采集于</span><span> 2025-12-27</span></div>
        </div>
      `,
    });
  }

  /**
   * 没有传入上层回调时的兜底设置弹窗
   */
  private openFallbackSettingsModal(): void {
    mountModal({
      title: '设置',
      contentHtml: `
        <div class="vr-modal-settings-list">
          <div>此版本暂未接入设置功能。</div>
        </div>
      `,
    });
  }

  remove(): void {
    // 清理事件监听
    if (this.unsubscribeInteracting) {
      this.unsubscribeInteracting();
      this.unsubscribeInteracting = null;
    }
    if (this.unsubscribeIdle) {
      this.unsubscribeIdle();
      this.unsubscribeIdle = null;
    }
    if (this.unsubscribeUIEngaged) {
      this.unsubscribeUIEngaged();
      this.unsubscribeUIEngaged = null;
    }
    this.panels.remove();
    this.element.remove();
  }
}
