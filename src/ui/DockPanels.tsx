import type { Museum, Scene } from '../types/config';
import { interactionBus } from './interactionBus';

export type DockTabKey = 'guide' | 'info' | 'settings' | 'community' | 'map' | 'dollhouse';

type DockPanelsOptions = {
  initialTab: DockTabKey;
  sceneId?: string;
  sceneName?: string;
  museum?: Museum;
  scenes?: Scene[];
  currentSceneId?: string;
};

type CommunityPanelLike = {
  getElement(): HTMLElement;
  remove(): void;
  setScene(sceneId: string, sceneName?: string): void;
};

type MapPanelLike = {
  getElement(): HTMLElement;
  remove(): void;
  updateCurrentScene(sceneId: string): void;
  updateMuseum(museum: Museum, scenes: Scene[], currentSceneId: string): void;
};

type DollhousePanelLike = {
  getElement(): HTMLElement;
  remove(): void;
  updateCurrentScene(sceneId: string): void;
  updateMuseum(museum: Museum, scenes: Scene[], currentSceneId: string): void;
};

export class DockPanels {
  private element: HTMLElement;
  private currentTab: DockTabKey | null;
  private sceneId?: string;
  private sceneName?: string;
  private museum?: Museum;
  private scenes?: Scene[];
  private currentSceneId?: string;
  private communityPanel: CommunityPanelLike | null = null;
  private mapPanel: MapPanelLike | null = null;
  private dollhousePanel: DollhousePanelLike | null = null;
  private handleClosePanels: (() => void) | null = null;
  private handlePanelClickCapture: ((e: Event) => void) | null = null;
  private renderToken = 0;

  constructor(options: DockPanelsOptions) {
    this.currentTab = options.initialTab;
    this.sceneId = options.sceneId;
    this.sceneName = options.sceneName;
    this.museum = options.museum;
    this.scenes = options.scenes;
    this.currentSceneId = options.currentSceneId || options.sceneId;

    this.element = document.createElement('div');
    this.element.className = 'vr-panl vr-glass hidden';

    this.handlePanelClickCapture = () => {
      interactionBus.emitUIEngaged();
    };
    this.element.addEventListener('click', this.handlePanelClickCapture, true);

    this.handleClosePanels = () => {
      this.closeAllPanels();
    };
    window.addEventListener('vr:close-panels', this.handleClosePanels);

    void this.render();
  }

  private disposeCommunityPanel(): void {
    if (this.communityPanel) {
      this.communityPanel.remove();
      this.communityPanel = null;
    }
  }

  private disposeMapPanel(): void {
    if (this.mapPanel) {
      this.mapPanel.remove();
      this.mapPanel = null;
    }
  }

  private disposeDollhousePanel(): void {
    if (this.dollhousePanel) {
      this.dollhousePanel.remove();
      this.dollhousePanel = null;
    }
  }

  private async ensureCommunityPanel(): Promise<CommunityPanelLike | null> {
    const sid = this.sceneId || 'unknown';
    if (!this.communityPanel) {
      const { CommunityPanel } = await import('./community/CommunityPanel');
      this.communityPanel = new CommunityPanel({
        sceneId: sid,
        sceneName: this.sceneName,
        onClose: () => {
          this.disposeCommunityPanel();
          this.element.classList.add('hidden');
          this.element.innerHTML = '';
        },
      });
    } else {
      this.communityPanel.setScene(sid, this.sceneName);
    }
    return this.communityPanel;
  }

  private async ensureMapPanel(sceneId: string): Promise<MapPanelLike | null> {
    if (!this.museum || !this.scenes || this.scenes.length === 0) {
      return null;
    }
    if (!this.mapPanel) {
      const { MapPanel } = await import('./MapPanel');
      this.mapPanel = new MapPanel({
        museum: this.museum,
        scenes: this.scenes,
        currentSceneId: sceneId,
        onClose: () => {
          window.dispatchEvent(new CustomEvent('vr:close-panels'));
        },
      });
    } else {
      this.mapPanel.updateCurrentScene(sceneId);
    }
    return this.mapPanel;
  }

  private async ensureDollhousePanel(sceneId: string): Promise<DollhousePanelLike | null> {
    if (!this.museum || !this.scenes || this.scenes.length === 0) {
      return null;
    }
    if (!this.dollhousePanel) {
      const { Dollhouse3DPanel } = await import('./Dollhouse3DPanel');
      this.dollhousePanel = new Dollhouse3DPanel({
        museum: this.museum,
        scenes: this.scenes,
        currentSceneId: sceneId,
        onClose: () => {
          window.dispatchEvent(new CustomEvent('vr:close-panels'));
        },
      });
    } else {
      this.dollhousePanel.updateCurrentScene(sceneId);
    }
    return this.dollhousePanel;
  }

  private async render(): Promise<void> {
    const token = ++this.renderToken;

    this.element.classList.remove('vr-panel--community', 'vr-panel--map', 'vr-panel--dollhouse');

    if (!this.currentTab) {
      this.element.classList.add('hidden');
      this.element.innerHTML = '';
      this.disposeCommunityPanel();
      this.disposeMapPanel();
      this.disposeDollhousePanel();
      return;
    }

    if (this.currentTab === 'community') {
      this.element.classList.add('vr-panel--community');
      this.element.innerHTML = '';
      this.disposeMapPanel();
      this.disposeDollhousePanel();
      const panel = await this.ensureCommunityPanel();
      if (!panel || token !== this.renderToken || this.currentTab !== 'community') {
        return;
      }
      this.element.appendChild(panel.getElement());
      return;
    }

    if (this.currentTab === 'map') {
      this.element.classList.add('vr-panel--map');
      this.element.innerHTML = '';
      this.disposeCommunityPanel();
      this.disposeDollhousePanel();

      const sid = this.currentSceneId || this.sceneId || this.scenes?.[0]?.id;
      if (!sid) {
        this.element.innerHTML = `
          <div class="vr-panel-title">平面图</div>
          <div class="vr-panel-body">此展馆暂无平面图</div>
        `;
        return;
      }
      const panel = await this.ensureMapPanel(sid);
      if (!panel || token !== this.renderToken || this.currentTab !== 'map') {
        return;
      }
      this.element.appendChild(panel.getElement());
      return;
    }

    if (this.currentTab === 'dollhouse') {
      this.element.classList.add('vr-panel--dollhouse');
      this.element.innerHTML = '';
      this.disposeCommunityPanel();
      this.disposeMapPanel();

      const sid = this.currentSceneId || this.sceneId || this.scenes?.[0]?.id;
      if (!sid) {
        this.element.innerHTML = `
          <div class="vr-panel-title">三维图</div>
          <div class="vr-panel-body">此展馆暂无三维图</div>
        `;
        return;
      }
      const panel = await this.ensureDollhousePanel(sid);
      if (!panel || token !== this.renderToken || this.currentTab !== 'dollhouse') {
        return;
      }
      this.element.appendChild(panel.getElement());
      return;
    }

    this.disposeCommunityPanel();
    this.disposeMapPanel();
    this.disposeDollhousePanel();
    this.element.classList.add('hidden');
    this.element.innerHTML = '';
  }

  setSceneContext(sceneId: string, sceneName?: string): void {
    this.sceneId = sceneId;
    this.sceneName = sceneName;
    this.currentSceneId = sceneId;

    if (this.currentTab === 'community') {
      if (this.communityPanel) {
        this.communityPanel.setScene(sceneId, sceneName);
      } else {
        void this.render();
      }
    }

    if (this.currentTab === 'map') {
      if (this.mapPanel) {
        this.mapPanel.updateCurrentScene(sceneId);
      } else {
        void this.render();
      }
    }

    if (this.currentTab === 'dollhouse') {
      if (this.dollhousePanel) {
        this.dollhousePanel.updateCurrentScene(sceneId);
      } else {
        void this.render();
      }
    }
  }

  setMuseumContext(museum: Museum, scenes: Scene[], currentSceneId: string): void {
    this.museum = museum;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;

    if (this.currentTab === 'map') {
      if (this.mapPanel) {
        this.mapPanel.updateMuseum(museum, scenes, currentSceneId);
      } else {
        void this.render();
      }
    }

    if (this.currentTab === 'dollhouse') {
      if (this.dollhousePanel) {
        this.dollhousePanel.updateMuseum(museum, scenes, currentSceneId);
      } else {
        void this.render();
      }
    }
  }

  setVisible(visible: boolean): void {
    this.element.classList.remove('hidden', 'visible');
    this.element.classList.add(visible ? 'visible' : 'hidden');
  }

  setTab(tab: DockTabKey): void {
    this.currentTab = tab;
    this.setVisible(false);
    window.setTimeout(() => {
      void this.render();
      this.setVisible(true);
    }, 40);
  }

  closeAllPanels(): void {
    this.renderToken += 1;
    this.currentTab = null;
    this.disposeCommunityPanel();
    this.disposeMapPanel();
    this.disposeDollhousePanel();
    this.element.classList.add('hidden');
    this.element.innerHTML = '';
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.renderToken += 1;
    if (this.handleClosePanels) {
      window.removeEventListener('vr:close-panels', this.handleClosePanels);
      this.handleClosePanels = null;
    }
    if (this.handlePanelClickCapture) {
      this.element.removeEventListener('click', this.handlePanelClickCapture, true);
      this.handlePanelClickCapture = null;
    }
    this.disposeCommunityPanel();
    this.disposeMapPanel();
    this.disposeDollhousePanel();
    this.element.remove();
  }
}
