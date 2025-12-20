import type { DockTabKey } from './DockPanels';
import { DockPanels } from './DockPanels';
import type { Museum, Scene } from '../types/config';
import { interactionBus } from './interactionBus';

type BottomDockOptions = {
  initialTab?: DockTabKey;
  onGuideClick?: () => void;
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
  { key: 'settings', label: '设置' },
  { key: 'info', label: '信息' },
];

export class BottomDock {
  private element: HTMLElement;
  private dockEl: HTMLElement;
  private panels: DockPanels;
  private activeTab: DockTabKey;
  private unsubscribeInteracting: (() => void) | null = null;
  private unsubscribeIdle: (() => void) | null = null;
  private unsubscribeUIEngaged: (() => void) | null = null;

  constructor(options: BottomDockOptions = {}) {
    this.activeTab = options.initialTab || 'guide';

    this.element = document.createElement('div');
    this.element.className = 'vr-dock-wrap';

    this.panels = new DockPanels({
      initialTab: this.activeTab,
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
        this.setActiveTab(tab.key);
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
      const evt = e as CustomEvent<{ tab: DockTabKey }>;
      if (evt.detail.tab && evt.detail.tab !== this.activeTab) {
        this.activeTab = evt.detail.tab;
        this.syncActiveClass();
      }
    };
    window.addEventListener('vr:bottom-dock-tab-change', handleTabChange);
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

  setActiveTab(tab: DockTabKey): void {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    this.syncActiveClass();
    this.panels.setTab(tab);
    // 派发事件通知TopModeTabs同步状态
    window.dispatchEvent(new CustomEvent('vr:bottom-dock-tab-change', {
      detail: { tab },
    }));
  }

  getActiveTab(): DockTabKey {
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
