import { CommunityPanel } from './community/CommunityPanel';
import { MapPanel } from './MapPanel';
import { Dollhouse3DPanel } from './Dollhouse3DPanel';
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
  private unsubscribeInteracting: (() => void) | null = null;
  private unsubscribeIdle: (() => void) | null = null;
  private unsubscribeUIEngaged: (() => void) | null = null;

  constructor(options: DockPanelsOptions) {
    this.currentTab = options.initialTab;
    this.sceneId = options.sceneId;
    this.sceneName = options.sceneName;
    this.museum = options.museum;
    this.scenes = options.scenes;
    this.currentSceneId = options.currentSceneId || options.sceneId;
    this.element = document.createElement('div');
    this.element.className = 'vr-panl vr-glass hidden';
    this.render();
    this.setupInteractionListeners();
  }

  private setupInteractionListeners(): void {
    // 注意：class管理由 yieldClassManager 统一处理（通过 document.documentElement）
    // 这里不需要手动管理 class

    // 监听面板内的点击事件（包括 MapPanel 和 Dollhouse3DPanel）
    this.element.addEventListener('click', (e) => {
      // UI 被点击，立即恢复
      interactionBus.emitUIEngaged();
    }, true); // 使用捕获阶段确保所有子元素点击都能捕获

    // 监听关闭面板事件
    const handleClosePanels = () => {
      // 关闭社区面板时，切换到 guide tab（guide tab 面板是隐藏的）
      if (this.currentTab === 'community') {
        this.setTab('guide');
        // 派发事件通知 BottomDock 同步 tab 状态
        window.dispatchEvent(new CustomEvent('vr:bottom-dock-tab-change', {
          detail: { tab: 'guide' },
        }));
      }
    };
    window.addEventListener('vr:close-panels', handleClosePanels);
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

    // guide/info/settings 标签：直接隐藏panel，不显示任何说明框
    // 点击"导览"后直接由 GuideTray 处理，不再显示中间说明框
    this.element.classList.add('hidden');
    this.element.innerHTML = '';
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
