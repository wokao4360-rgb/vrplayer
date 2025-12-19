import { CommunityPanel } from './community/CommunityPanel';
import { MapPanel } from './MapPanel';
import { Dollhouse3DPanel } from './Dollhouse3DPanel';
import type { Museum, Scene } from '../types/config';

export type DockTabKey = 'guide' | 'info' | 'settings' | 'community' | 'map' | 'dollhouse';

type DockPanelsOptions = {
  initialTab: DockTabKey;
  sceneId?: string;
  sceneName?: string;
  museum?: Museum;
  scenes?: Scene[];
  currentSceneId?: string;
};

export class DockPanels {
  private element: HTMLElement;
  private currentTab: DockTabKey;
  private sceneId?: string;
  private sceneName?: string;
  private museum?: Museum;
  private scenes?: Scene[];
  private currentSceneId?: string;
  private communityPanel: CommunityPanel | null = null;
  private mapPanel: MapPanel | null = null;
  private dollhousePanel: Dollhouse3DPanel | null = null;

  constructor(options: DockPanelsOptions) {
    this.currentTab = options.initialTab;
    this.sceneId = options.sceneId;
    this.sceneName = options.sceneName;
    this.museum = options.museum;
    this.scenes = options.scenes;
    this.currentSceneId = options.currentSceneId || options.sceneId;
    this.element = document.createElement('div');
    this.element.className = 'vr-panel vr-glass hidden';
    this.render();
  }

  private render(): void {
    // 清理变体类
    this.element.classList.remove('vr-panel--community', 'vr-panel--map', 'vr-panel--dollhouse');

    if (this.currentTab === 'community') {
      this.element.classList.add('vr-panel--community');
      this.element.innerHTML = '';
      const sid = this.sceneId || 'unknown';
      if (!this.communityPanel) {
        this.communityPanel = new CommunityPanel({ sceneId: sid, sceneName: this.sceneName });
      } else {
        this.communityPanel.setScene(sid, this.sceneName);
      }
      this.element.appendChild(this.communityPanel.getElement());
      return;
    }

    if (this.currentTab === 'map') {
      this.element.classList.add('vr-panel--map');
      this.element.innerHTML = '';
      
      if (this.communityPanel) {
        this.communityPanel.remove();
        this.communityPanel = null;
      }
      if (this.dollhousePanel) {
        this.dollhousePanel.remove();
        this.dollhousePanel = null;
      }

      if (this.museum && this.scenes && this.scenes.length > 0) {
        const sid = this.currentSceneId || this.sceneId || this.scenes[0].id;
        if (!this.mapPanel) {
          this.mapPanel = new MapPanel({
            museum: this.museum,
            scenes: this.scenes,
            currentSceneId: sid,
            onClose: () => {
              // 关闭 MapPanel 时切换到其他 tab
              this.setTab('guide');
            },
          });
        } else {
          this.mapPanel.updateCurrentScene(sid);
        }
        this.element.appendChild(this.mapPanel.getElement());
      } else {
        // 如果没有数据，显示提示
        this.element.innerHTML = `
          <div class="vr-panel-title">平面图</div>
          <div class="vr-panel-body">暂无平面图数据</div>
        `;
      }
      return;
    }

    if (this.currentTab === 'dollhouse') {
      this.element.classList.add('vr-panel--dollhouse');
      this.element.innerHTML = '';
      
      if (this.communityPanel) {
        this.communityPanel.remove();
        this.communityPanel = null;
      }
      if (this.mapPanel) {
        this.mapPanel.remove();
        this.mapPanel = null;
      }

      if (this.museum && this.scenes && this.scenes.length > 0) {
        const sid = this.currentSceneId || this.sceneId || this.scenes[0].id;
        if (!this.dollhousePanel) {
          this.dollhousePanel = new Dollhouse3DPanel({
            museum: this.museum,
            scenes: this.scenes,
            currentSceneId: sid,
            onClose: () => {
              // 关闭 DollhousePanel 时切换到其他 tab
              this.setTab('guide');
            },
          });
        } else {
          this.dollhousePanel.updateCurrentScene(sid);
        }
        this.element.appendChild(this.dollhousePanel.getElement());
      } else {
        // 如果没有数据，显示提示
        this.element.innerHTML = `
          <div class="vr-panel-title">三维图</div>
          <div class="vr-panel-body">暂无场景数据</div>
        `;
      }
      return;
    }

    // 清理其他面板
    if (this.communityPanel) {
      this.communityPanel.remove();
      this.communityPanel = null;
    }
    if (this.mapPanel) {
      this.mapPanel.remove();
      this.mapPanel = null;
    }
    if (this.dollhousePanel) {
      this.dollhousePanel.remove();
      this.dollhousePanel = null;
    }

    const { title, body } = this.getContentForTab(this.currentTab);
    this.element.innerHTML = `
      <div class="vr-panel-title">${title}</div>
      <div class="vr-panel-body">${body}</div>
    `;
  }

  private getContentForTab(tab: DockTabKey): { title: string; body: string } {
    if (tab === 'guide') {
      return { title: '导览', body: '打开导览抽屉，选择一个场景进入（当前仅 console.log）。' };
    }
    if (tab === 'info') {
      return { title: '信息', body: '这里预留展示当前场景/展馆信息（后续接入配置与热点说明）。' };
    }
    if (tab === 'settings') {
      return { title: '设置', body: '这里预留清晰度/灵敏度/陀螺仪等设置入口（仅骨架）。' };
    }
    return { title: '社区', body: '' };
  }

  setSceneContext(sceneId: string, sceneName?: string): void {
    this.sceneId = sceneId;
    this.sceneName = sceneName;
    this.currentSceneId = sceneId;
    
    if (this.currentTab === 'community' && this.communityPanel) {
      this.communityPanel.setScene(sceneId, sceneName);
    }
    
    if (this.currentTab === 'map' && this.mapPanel) {
      this.mapPanel.updateCurrentScene(sceneId);
    }
    
    if (this.currentTab === 'dollhouse' && this.dollhousePanel) {
      this.dollhousePanel.updateCurrentScene(sceneId);
    }
  }

  setMuseumContext(museum: Museum, scenes: Scene[], currentSceneId: string): void {
    this.museum = museum;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    
    if (this.currentTab === 'map' && this.mapPanel) {
      this.mapPanel.updateMuseum(museum, scenes, currentSceneId);
    } else if (this.currentTab === 'map') {
      // 如果当前是 map tab 但没有 panel，重新渲染
      this.render();
    }
    
    if (this.currentTab === 'dollhouse' && this.dollhousePanel) {
      this.dollhousePanel.updateMuseum(museum, scenes, currentSceneId);
    } else if (this.currentTab === 'dollhouse') {
      // 如果当前是 dollhouse tab 但没有 panel，重新渲染
      this.render();
    }
  }

  setVisible(visible: boolean): void {
    this.element.classList.remove('hidden', 'visible');
    this.element.classList.add(visible ? 'visible' : 'hidden');
  }

  setTab(tab: DockTabKey): void {
    this.currentTab = tab;
    // 简单切换：先隐藏再显示，触发 opacity/translateY 动画
    this.setVisible(false);
    window.setTimeout(() => {
      this.render();
      this.setVisible(true);
    }, 40);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    if (this.communityPanel) {
      this.communityPanel.remove();
      this.communityPanel = null;
    }
    if (this.mapPanel) {
      this.mapPanel.remove();
      this.mapPanel = null;
    }
    if (this.dollhousePanel) {
      this.dollhousePanel.remove();
      this.dollhousePanel = null;
    }
    this.element.remove();
  }
}
