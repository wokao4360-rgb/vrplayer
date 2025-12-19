/**
 * 场景导览条组件（Scene Strip）
 * 底部横向滚动条，显示当前博物馆的所有场景
 */

import type { SceneHotspot, Scene } from '../types/config';
import { emitSceneFocus, onSceneFocus, SceneFocusEvent } from './sceneLinkBus';
import { interactionBus } from './interactionBus';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';

type SceneStripOptions = {
  museumId: string;
  currentSceneId: string;
  hotspots: SceneHotspot[];
  scenes: Scene[]; // 用于获取场景名称和缩略图
  onNavigateToScene: (sceneId: string) => void;
};

export class SceneStrip {
  private element: HTMLElement;
  private scrollContainer: HTMLElement;
  private museumId: string;
  private currentSceneId: string;
  private hotspots: SceneHotspot[];
  private scenes: Scene[];
  private onNavigateToScene: (sceneId: string) => void;
  private sceneItems: Map<string, HTMLElement> = new Map();
  private unsubscribeFocus?: () => void;
  private unsubscribeInteracting?: () => void;
  private unsubscribeIdle?: () => void;
  private unsubscribeUIEngaged?: () => void;

  constructor(options: SceneStripOptions) {
    this.museumId = options.museumId;
    this.currentSceneId = options.currentSceneId;
    this.hotspots = options.hotspots;
    this.scenes = options.scenes;
    this.onNavigateToScene = options.onNavigateToScene;

    // 创建根元素
    this.element = document.createElement('div');
    this.element.className = 'vr-scenestrip';

    // 创建滚动容器
    this.scrollContainer = document.createElement('div');
    this.scrollContainer.className = 'vr-scenestrip__scroll';
    this.element.appendChild(this.scrollContainer);

    // 渲染场景项
    this.renderItems();

    // 监听场景聚焦事件
    this.setupFocusListener();

    // 接入 interactionBus
    this.setupInteractionListeners();
  }

  /**
   * 过滤并排序场景热点
   */
  private getSceneHotspots(): Array<SceneHotspot & { sceneId: string }> {
    // 过滤：只保留 type='scene' 且 target.sceneId 存在
    const filtered = this.hotspots
      .filter((h) => h.type === 'scene' && h.target?.sceneId)
      .map((h) => ({
        ...h,
        sceneId: h.target!.sceneId!,
      }));

    // 按 yaw 升序排列（归一化到 [0, 360]）
    return filtered.sort((a, b) => {
      const normalizeYaw = (yaw: number) => {
        // 归一化到 [0, 360]
        let normalized = yaw % 360;
        if (normalized < 0) normalized += 360;
        return normalized;
      };
      return normalizeYaw(a.yaw) - normalizeYaw(b.yaw);
    });
  }

  /**
   * 获取场景信息（名称和缩略图）
   */
  private getSceneInfo(sceneId: string): { name: string; thumb: string | null } {
    const scene = this.scenes.find((s) => s.id === sceneId);
    if (scene) {
      return {
        name: scene.name,
        thumb: scene.thumb || null,
      };
    }
    // 如果找不到场景，使用热点的 label
    const hotspot = this.hotspots.find((h) => h.target?.sceneId === sceneId);
    return {
      name: hotspot?.label || sceneId,
      thumb: null,
    };
  }

  /**
   * 渲染场景项
   */
  private renderItems(): void {
    this.scrollContainer.innerHTML = '';
    this.sceneItems.clear();

    const sceneHotspots = this.getSceneHotspots();

    sceneHotspots.forEach((hotspot) => {
      const sceneId = hotspot.sceneId;
      const sceneInfo = this.getSceneInfo(sceneId);
      const isCurrent = sceneId === this.currentSceneId;

      // 创建场景项
      const item = document.createElement('div');
      item.className = 'vr-scenestrip__item';
      item.setAttribute('data-scene-id', sceneId);
      if (isCurrent) {
        item.classList.add('is-current');
      }

      // 缩略图容器
      const thumbContainer = document.createElement('div');
      thumbContainer.className = 'vr-scenestrip__thumb';
      if (sceneInfo.thumb) {
        const thumbUrl = resolveAssetUrl(sceneInfo.thumb, AssetType.THUMB);
        if (thumbUrl) {
          const img = document.createElement('img');
          img.src = thumbUrl;
          img.alt = sceneInfo.name;
          img.loading = 'lazy';
          thumbContainer.appendChild(img);
        } else {
          // 占位渐变
          thumbContainer.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
        }
      } else {
        // 占位渐变
        thumbContainer.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
      }

      // 场景名称
      const nameEl = document.createElement('div');
      nameEl.className = 'vr-scenestrip__name';
      nameEl.textContent = sceneInfo.name;

      item.appendChild(thumbContainer);
      item.appendChild(nameEl);

      // 点击事件
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // UI 被点击，立即恢复
        interactionBus.emitUIEngaged();
        
        // 派发 focus 事件
        emitSceneFocus({
          type: 'focus',
          museumId: this.museumId,
          sceneId: sceneId,
          source: 'dock',
          ts: Date.now(),
        });

        // 关闭面板
        window.dispatchEvent(new CustomEvent('vr:close-panels'));

        // 导航到场景
        this.onNavigateToScene(sceneId);
      });

      // hover 事件（用于高亮）
      item.addEventListener('mouseenter', () => {
        emitSceneFocus({
          type: 'hover',
          museumId: this.museumId,
          sceneId: sceneId,
          source: 'dock',
          ts: Date.now(),
        });
      });

      item.addEventListener('mouseleave', () => {
        emitSceneFocus({
          type: 'hover',
          museumId: this.museumId,
          sceneId: null,
          source: 'dock',
          ts: Date.now(),
        });
      });

      this.scrollContainer.appendChild(item);
      this.sceneItems.set(sceneId, item);
    });

    // 滚动到当前场景
    this.scrollToCurrent();
  }

  /**
   * 滚动到当前场景
   */
  private scrollToCurrent(): void {
    const currentItem = this.sceneItems.get(this.currentSceneId);
    if (currentItem) {
      // 使用 scrollIntoView 平滑滚动
      currentItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }

  /**
   * 监听场景聚焦事件
   */
  private setupFocusListener(): void {
    this.unsubscribeFocus = onSceneFocus((event: SceneFocusEvent) => {
      // 只处理来自其他源的事件（source != 'dock'）
      if (event.source === 'dock') return;

      // 更新 hover 状态
      this.sceneItems.forEach((item, sceneId) => {
        if (event.type === 'hover') {
          if (event.sceneId === sceneId) {
            item.classList.add('is-hover');
          } else {
            item.classList.remove('is-hover');
          }
        } else if (event.type === 'focus') {
          // focus 时移除 hover
          item.classList.remove('is-hover');
          // 如果是当前博物馆的场景，更新当前状态并滚动
          if (event.museumId === this.museumId && event.sceneId === sceneId) {
            // 更新当前场景状态
            this.sceneItems.forEach((otherItem, otherSceneId) => {
              if (otherSceneId === sceneId) {
                otherItem.classList.add('is-current');
              } else {
                otherItem.classList.remove('is-current');
              }
            });
            this.currentSceneId = sceneId;
            // 滚动到该场景
            item.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
          }
        }
      });
    });
  }

  /**
   * 接入 interactionBus
   */
  private setupInteractionListeners(): void {
    this.unsubscribeInteracting = interactionBus.on('user-interacting', () => {
      this.element.classList.add('vr-ui-interacting');
    });
    this.unsubscribeIdle = interactionBus.on('user-idle', () => {
      this.element.classList.remove('vr-ui-interacting');
    });
    this.unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
      this.element.classList.remove('vr-ui-interacting');
    });

    // 条内任意点击先 emit ui-engaged
    this.scrollContainer.addEventListener('click', () => {
      interactionBus.emitUIEngaged();
    }, true); // 使用捕获阶段确保所有点击都能捕获
  }

  /**
   * 更新当前场景
   */
  updateCurrentScene(sceneId: string): void {
    if (this.currentSceneId === sceneId) return;
    
    // 更新当前状态
    const oldItem = this.sceneItems.get(this.currentSceneId);
    if (oldItem) {
      oldItem.classList.remove('is-current');
    }
    
    this.currentSceneId = sceneId;
    const newItem = this.sceneItems.get(sceneId);
    if (newItem) {
      newItem.classList.add('is-current');
      // 滚动到新场景
      this.scrollToCurrent();
    }
  }

  /**
   * 更新热点数据
   */
  updateHotspots(hotspots: SceneHotspot[]): void {
    this.hotspots = hotspots;
    this.renderItems();
  }

  /**
   * 获取根元素
   */
  getElement(): HTMLElement {
    return this.element;
  }

  /**
   * 清理资源
   */
  dispose(): void {
    if (this.unsubscribeFocus) {
      this.unsubscribeFocus();
      this.unsubscribeFocus = undefined;
    }
    if (this.unsubscribeInteracting) {
      this.unsubscribeInteracting();
      this.unsubscribeInteracting = undefined;
    }
    if (this.unsubscribeIdle) {
      this.unsubscribeIdle();
      this.unsubscribeIdle = undefined;
    }
    if (this.unsubscribeUIEngaged) {
      this.unsubscribeUIEngaged();
      this.unsubscribeUIEngaged = undefined;
    }
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
