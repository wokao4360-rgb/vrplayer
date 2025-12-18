import { CommunityPanel } from './community/CommunityPanel';

export type DockTabKey = 'guide' | 'info' | 'settings' | 'community';

type DockPanelsOptions = {
  initialTab: DockTabKey;
  sceneId?: string;
  sceneName?: string;
};

export class DockPanels {
  private element: HTMLElement;
  private currentTab: DockTabKey;
  private sceneId?: string;
  private sceneName?: string;
  private communityPanel: CommunityPanel | null = null;

  constructor(options: DockPanelsOptions) {
    this.currentTab = options.initialTab;
    this.sceneId = options.sceneId;
    this.sceneName = options.sceneName;
    this.element = document.createElement('div');
    this.element.className = 'vr-panel vr-glass hidden';
    this.render();
  }

  private render(): void {
    // 清理 community 变体
    this.element.classList.remove('vr-panel--community');

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

    if (this.communityPanel) {
      this.communityPanel.remove();
      this.communityPanel = null;
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
    if (this.currentTab === 'community' && this.communityPanel) {
      this.communityPanel.setScene(sceneId, sceneName);
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
    this.element.remove();
  }
}
