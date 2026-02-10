import type { DockTabKey } from './DockPanels';
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

type DockPanelsLike = {
  setVisible(visible: boolean): void;
  setTab(tab: DockTabKey): void;
  setSceneContext(sceneId: string, sceneName?: string): void;
  setMuseumContext(museum: Museum, scenes: Scene[], currentSceneId: string): void;
  getElement(): HTMLElement;
  remove(): void;
  closeAllPanels?: () => void;
};

const TAB_LABELS: Array<{ key: DockTabKey; label: string }> = [
  { key: 'guide', label: '导览' },
  { key: 'community', label: '社区' },
  { key: 'info', label: '信息' },
  { key: 'settings', label: '更多' },
];

function isPanelTab(tab: DockTabKey): tab is 'community' | 'map' | 'dollhouse' {
  return tab === 'community' || tab === 'map' || tab === 'dollhouse';
}

export class BottomDock {
  private element: HTMLElement;
  private dockEl: HTMLElement;
  private panelsHost: HTMLElement;
  private panels: DockPanelsLike | null = null;
  private panelsLoadPromise: Promise<void> | null = null;
  private destroyed = false;
  private activeTabs: Set<DockTabKey>;
  private onGuideClick?: () => void;
  private onOpenInfo?: () => void;
  private onOpenSettings?: () => void;
  private initialTab: DockTabKey;
  private sceneId?: string;
  private sceneName?: string;
  private museum?: Museum;
  private scenes?: Scene[];
  private currentSceneId?: string;
  private unsubscribeInteracting: (() => void) | null = null;
  private unsubscribeIdle: (() => void) | null = null;
  private unsubscribeUIEngaged: (() => void) | null = null;
  private handleDockTabOpen?: (e: Event) => void;
  private handleDockTabClose?: (e: Event) => void;
  private handleClosePanels?: () => void;

  constructor(options: BottomDockOptions = {}) {
    this.activeTabs = new Set<DockTabKey>();
    this.onGuideClick = options.onGuideClick;
    this.onOpenInfo = options.onOpenInfo;
    this.onOpenSettings = options.onOpenSettings;
    this.initialTab = options.initialTab || 'guide';
    this.sceneId = options.sceneId;
    this.sceneName = options.sceneName;
    this.museum = options.museum;
    this.scenes = options.scenes;
    this.currentSceneId = options.currentSceneId || options.sceneId;

    this.element = document.createElement('div');
    this.element.className = 'vr-dock-wrap';

    this.panelsHost = document.createElement('div');
    this.panelsHost.className = 'vr-dock-panels-host';
    this.element.appendChild(this.panelsHost);

    this.dockEl = document.createElement('div');
    this.dockEl.className = 'vr-dock vr-glass';
    this.element.appendChild(this.dockEl);

    for (const tab of TAB_LABELS) {
      const btn = document.createElement('button');
      btn.className = 'vr-btn vr-dock-tab';
      btn.setAttribute('data-tab', tab.key);
      const iconName =
        tab.key === 'guide'
          ? 'guide'
          : tab.key === 'community'
            ? 'community'
            : tab.key === 'info'
              ? 'info'
              : 'more';
      btn.innerHTML = `<span class="vr-dock-tab-icon">${getIcon(iconName)}</span><div class="vr-dock-tab-label">${tab.label}</div>`;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        interactionBus.emitUIEngaged();

        if (tab.key === 'guide') {
          this.setTabActive('guide', true);
          if (this.onGuideClick) {
            this.onGuideClick();
          }
          return;
        }

        if (tab.key === 'community') {
          this.setTabActive('community', true);
          return;
        }

        if (tab.key === 'info') {
          this.setTabActive('info', true);
          if (this.onOpenInfo) {
            this.onOpenInfo();
          } else {
            this.openFallbackInfoModal();
          }
          return;
        }

        this.setTabActive('settings', true);
        if (this.onOpenSettings) {
          this.onOpenSettings();
        } else {
          this.openFallbackSettingsModal();
        }
      });
      this.dockEl.appendChild(btn);
    }

    this.syncActiveClass();
    this.setupInteractionListeners();
    this.setupDockEventListeners();

    if (isPanelTab(this.initialTab)) {
      this.setTabActive(this.initialTab, true);
    }
  }

  private async ensurePanels(): Promise<DockPanelsLike | null> {
    if (this.panels) {
      return this.panels;
    }
    if (this.panelsLoadPromise) {
      await this.panelsLoadPromise;
      return this.panels;
    }

    this.panelsLoadPromise = (async () => {
      const { DockPanels } = await import('./DockPanels');
      if (this.destroyed) {
        return;
      }

      const panels = new DockPanels({
        initialTab: this.initialTab,
        sceneId: this.sceneId,
        sceneName: this.sceneName,
        museum: this.museum,
        scenes: this.scenes,
        currentSceneId: this.currentSceneId || this.sceneId,
      });
      panels.setVisible(true);

      if (this.destroyed) {
        panels.remove();
        return;
      }

      this.panels = panels;
      this.panelsHost.appendChild(panels.getElement());
    })().finally(() => {
      this.panelsLoadPromise = null;
    });

    await this.panelsLoadPromise;
    return this.panels;
  }

  private async openPanelTab(tab: 'community' | 'map' | 'dollhouse'): Promise<void> {
    const panels = await this.ensurePanels();
    if (!panels || this.destroyed) return;
    panels.setTab(tab);
  }

  private setupInteractionListeners(): void {
    // class 管理由 yieldClassManager 统一处理
  }

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

  setTabActive(tab: DockTabKey, active: boolean): void {
    if (active) {
      this.activeTabs.add(tab);
    } else {
      this.activeTabs.delete(tab);
    }
    this.syncActiveClass();

    if (active && isPanelTab(tab)) {
      void this.openPanelTab(tab);
      return;
    }

    if (!active && isPanelTab(tab) && this.panels) {
      const hasAnyPanelOpen =
        this.activeTabs.has('community') ||
        this.activeTabs.has('map') ||
        this.activeTabs.has('dollhouse');
      if (!hasAnyPanelOpen && this.panels.closeAllPanels) {
        this.panels.closeAllPanels();
      }
    }
  }

  isTabActive(tab: DockTabKey): boolean {
    return this.activeTabs.has(tab);
  }

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

    this.handleClosePanels = () => {
      this.setTabActive('community', false);
      this.setTabActive('map', false);
      this.setTabActive('dollhouse', false);
      if (this.panels?.closeAllPanels) {
        this.panels.closeAllPanels();
      }
    };

    window.addEventListener('vr:dock-tab-open', this.handleDockTabOpen as EventListener);
    window.addEventListener('vr:dock-tab-close', this.handleDockTabClose as EventListener);
    window.addEventListener('vr:close-panels', this.handleClosePanels);
  }

  setSceneContext(sceneId: string, sceneName?: string): void {
    this.sceneId = sceneId;
    this.sceneName = sceneName;
    this.currentSceneId = sceneId;
    if (this.panels) {
      this.panels.setSceneContext(sceneId, sceneName);
    }
  }

  setMuseumContext(museum: Museum, scenes: Scene[], currentSceneId: string): void {
    this.museum = museum;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    if (this.panels) {
      this.panels.setMuseumContext(museum, scenes, currentSceneId);
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setMoreOpen(isOpen: boolean): void {
    if (isOpen) {
      this.element.classList.add('dock--more-open');
    } else {
      this.element.classList.remove('dock--more-open');
    }
  }

  private openFallbackInfoModal(): void {
    mountModal({
      title: '信息',
      contentHtml: `
        <div class="vr-modal-info-list">
          <div><span class="vr-modal-info-row-label">馆：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">场景：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">采集日：</span><span>2025-12-27</span></div>
        </div>
      `,
    });
  }

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
    this.destroyed = true;

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
    if (this.panels) {
      this.panels.remove();
      this.panels = null;
    }
    this.element.remove();
  }
}
