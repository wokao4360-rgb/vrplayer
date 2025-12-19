import type { DockTabKey } from './DockPanels';
import { DockPanels } from './DockPanels';
import type { Museum, Scene } from '../types/config';

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
  { key: 'map', label: '平面图' },
  { key: 'community', label: '社区' },
  { key: 'settings', label: '设置' },
  { key: 'info', label: '信息' },
];

export class BottomDock {
  private element: HTMLElement;
  private dockEl: HTMLElement;
  private panels: DockPanels;
  private activeTab: DockTabKey;

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
    this.panels.remove();
    this.element.remove();
  }
}
