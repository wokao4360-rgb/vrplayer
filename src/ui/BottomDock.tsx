import type { DockTabKey } from './DockPanels';
import { DockPanels } from './DockPanels';
import type { Museum, Scene } from '../types/config';
import { interactionBus } from './interactionBus';
import { mountModal } from './Modal';
import { getIcon } from './icons';

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
  private activeTabs: Set<DockTabKey>;
  private onOpenInfo?: () => void;
  private onOpenSettings?: () => void;
  private unsubscribeInteracting: (() => void) | null = null;
  private unsubscribeIdle: (() => void) | null = null;
  private unsubscribeUIEngaged: (() => void) | null = null;
  private handleDockTabOpen?: (e: Event) => void;
  private handleDockTabClose?: (e: Event) => void;
  private handleClosePanels?: () => void;

  constructor(options: BottomDockOptions = {}) {
    // 默认不高亮任何按钮（支持多选高亮）
    this.activeTabs = new Set<DockTabKey>();
    this.onOpenInfo = options.onOpenInfo;
    this.onOpenSettings = options.onOpenSettings;

    this.element = document.createElement('div');
    this.element.className = 'vr-dock-wrap';

    this.panels = new DockPanels({
      // DockPanels 仍需要一个初始 tab（用于内部状态），但底部高亮保持为空
      initialTab: options.initialTab || 'guide',
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
      const iconName = tab.key === 'guide' ? 'guide' : tab.key === 'community' ? 'community' : tab.key === 'info' ? 'info' : 'more';
      btn.innerHTML = `<span class="vr-dock-tab-icon">${getIcon(iconName)}</span><div class="vr-dock-tab-label">${tab.label}</div>`;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // UI 被点击，立即恢复
        interactionBus.emitUIEngaged();
        // 点击按钮：仅切换对应 tab 的激活态/打开对应面板，不影响其他 tab
        if (tab.key === 'guide') {
          // 导览：只控制导览窗口
          this.setTabActive('guide', true);
          if (options.onGuideClick) {
            options.onGuideClick();
          }
        } else if (tab.key === 'community') {
          // 社区：打开 DockPanels 内的社区窗口
          this.setTabActive('community', true);
          this.panels.setTab('community');
        } else if (tab.key === 'info') {
          // 信息：高亮信息 tab，并打开信息弹窗
          this.setTabActive('info', true);
          if (this.onOpenInfo) {
            this.onOpenInfo();
          } else {
            this.openFallbackInfoModal();
          }
        } else if (tab.key === 'settings') {
          // 更多：高亮设置 tab，并打开设置弹窗
          this.setTabActive('settings', true);
          if (this.onOpenSettings) {
            this.onOpenSettings();
          } else {
            this.openFallbackSettingsModal();
          }
        }
      });
      this.dockEl.appendChild(btn);
    }

    this.element.appendChild(this.panels.getElement());
    this.element.appendChild(this.dockEl);

    this.syncActiveClass();
    this.setupInteractionListeners();
    this.setupDockEventListeners();
  }

  private setupInteractionListeners(): void {
    // 注意：class管理由 yieldClassManager 统一处理（通过 document.documentElement）
    // 这里不需要手动管理 class，保留空实现以避免类型错误
  }

  /**
   * 根据 activeTabs 状态同步按钮的 .active class
   */
  syncActiveClass(): void {
    const buttons = this.dockEl.querySelectorAll<HTMLButtonElement>('.vr-dock-tab');
    buttons.forEach((btn) => {
      const key = btn.getAttribute('data-tab') as DockTabKey | null;
      if (key && this.activeTabs.has(key)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * 设置某个 tab 是否激活（只影响该 tab，不影响其它 tab）
   */
  setTabActive(tab: DockTabKey, active: boolean): void {
    if (active) {
      this.activeTabs.add(tab);
    } else {
      this.activeTabs.delete(tab);
    }
    this.syncActiveClass();

    // DockPanels 只负责管理自己的子面板（community/map/dollhouse）
    if (active && (tab === 'community' || tab === 'map' || tab === 'dollhouse')) {
      this.panels.setTab(tab);
    }
  }

  /**
   * 查询某个 tab 当前是否处于激活态
   */
  isTabActive(tab: DockTabKey): boolean {
    return this.activeTabs.has(tab);
  }

  /**
   * 监听全局 Dock 相关事件（打开/关闭单个 tab、统一关闭 DockPanels）
   */
  private setupDockEventListeners(): void {
    this.handleDockTabOpen = (e: Event) => {
      const evt = e as CustomEvent<{ tab: DockTabKey }>;
      if (!evt.detail?.tab) return;
      this.setTabActive(evt.detail.tab, true);
    };

    this.handleDockTabClose = (e: Event) => {
      const evt = e as CustomEvent<{ tab: DockTabKey }>;
      if (!evt.detail?.tab) return;
      this.setTabActive(evt.detail.tab, false);
    };

    // 统一关闭 DockPanels 所属的 tab（不影响导览/信息/更多）
    this.handleClosePanels = () => {
      this.setTabActive('community', false);
      this.setTabActive('map', false);
      this.setTabActive('dollhouse', false);
    };

    window.addEventListener('vr:dock-tab-open', this.handleDockTabOpen as EventListener);
    window.addEventListener('vr:dock-tab-close', this.handleDockTabClose as EventListener);
    window.addEventListener('vr:close-panels', this.handleClosePanels);
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
   * 设置"更多"打开状态（用于 Dock 淡出动效）
   */
  setMoreOpen(isOpen: boolean): void {
    if (isOpen) {
      this.element.classList.add('dock--more-open');
    } else {
      this.element.classList.remove('dock--more-open');
    }
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
    if (this.handleDockTabOpen) {
      window.removeEventListener('vr:dock-tab-open', this.handleDockTabOpen as EventListener);
      this.handleDockTabOpen = undefined;
    }
    if (this.handleDockTabClose) {
      window.removeEventListener('vr:dock-tab-close', this.handleDockTabClose as EventListener);
      this.handleDockTabClose = undefined;
    }
    if (this.handleClosePanels) {
      window.removeEventListener('vr:close-panels', this.handleClosePanels);
      this.handleClosePanels = undefined;
    }
    this.panels.remove();
    this.element.remove();
  }
}
