/**
 * 场景导览条组件（Scene Strip）
 * 底部横向滚动条，显示当前博物馆的所有场景
 */

import type { SceneHotspot, Scene } from '../types/config';
import { emitSceneFocus, onSceneFocus, SceneFocusEvent } from './sceneLinkBus';
import { interactionBus } from './interactionBus';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
import { toProxiedImageUrl } from '../utils/externalImage';

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
  
  // 用户手动滚动检测
  private userScrolling: boolean = false;
  private lastUserScrollTs: number = 0;
  private userScrollCheckTimer: number | null = null; // requestAnimationFrame ID
  private scrollHandlers: Array<() => void> = [];
  private itemsSignature: string = ''; // 用于检测列表变化

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

    // 设置用户手动滚动检测
    this.setupUserScrollDetection();
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
    
    // 更新 itemsSignature（用于检测列表变化）
    this.itemsSignature = sceneHotspots.map((h) => h.sceneId).join('|');

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
          img.referrerPolicy = 'no-referrer';
          img.crossOrigin = 'anonymous';
          img.decoding = 'async';
          img.src = toProxiedImageUrl(thumbUrl);
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

    // 延迟滚动到当前场景（确保 DOM 已更新）
    requestAnimationFrame(() => {
      this.scrollToCurrent();
    });
  }

  /**
   * 滚动到指定场景项（居中）
   * @param sceneId 场景 ID
   * @param behavior 滚动行为
   * @param force 是否强制滚动（忽略 userScrolling 状态）
   */
  private scrollToItem(sceneId: string, behavior: ScrollBehavior = 'smooth', force: boolean = false): void {
    const item = this.sceneItems.get(sceneId);
    if (!item || !this.scrollContainer) return;

    // 如果正在用户手动滚动且不是强制，则跳过
    if (this.userScrolling && !force) return;

    // 计算居中位置
    const stripRect = this.scrollContainer.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    // 计算 strip 中心位置
    const stripCenter = stripRect.left + stripRect.width / 2;
    
    // 计算 item 中心位置
    const itemCenter = itemRect.left + itemRect.width / 2;
    
    // 计算需要的滚动距离
    const delta = itemCenter - stripCenter;
    const targetScrollLeft = this.scrollContainer.scrollLeft + delta;

    // 执行滚动
    this.scrollContainer.scrollTo({
      left: targetScrollLeft,
      behavior: behavior,
    });
  }

  /**
   * 滚动到当前场景
   */
  private scrollToCurrent(): void {
    // 使用新的 scrollToItem 方法
    this.scrollToItem(this.currentSceneId, 'smooth', false);
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
          // hover 时轻滑入视野（不强制，不抢用户手动滚动）
          // 如果正在用户手动滚动，完全忽略
          if (event.museumId === this.museumId && !this.userScrolling) {
            this.scrollToItem(sceneId, 'smooth', false);
          }
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
            // 滚动到该场景（外部切换后居中，但要在下一帧执行并再次检查userScrolling）
            requestAnimationFrame(() => {
              // 再次检查是否仍在用户滚动状态
              if (!this.userScrolling) {
                this.scrollToItem(sceneId, 'smooth', true);
              }
            });
          }
        }
      });
    });

    // 监听 vr:scene-aim 事件（来自 GroundNavDots）
    const handleSceneAim = (e: Event) => {
      const customEvent = e as CustomEvent<{
        type: 'aim' | 'clear';
        museumId: string;
        sceneId?: string;
        source: string;
        ts: number;
      }>;
      
      // 只处理来自 groundnav 的事件
      if (customEvent.detail.source !== 'groundnav') return;
      
      // 只处理当前博物馆的事件
      if (customEvent.detail.museumId !== this.museumId) return;

      // 如果正在用户手动滚动，完全忽略（绝不抢回控制权）
      if (this.userScrolling) return;

      if (customEvent.detail.type === 'aim' && customEvent.detail.sceneId) {
        const sceneId = customEvent.detail.sceneId;
        
        // 严格过滤：忽略当前场景的目标
        if (this.currentSceneId && sceneId === this.currentSceneId) return;
        
        // aim 时只允许轻滑入视野，禁止强制居中
        // 再次检查 userScrolling（双重保险）
        if (!this.userScrolling) {
          this.scrollToItem(sceneId, 'smooth', false);
        }
      }
      // clear 时不处理（SceneStrip 保持当前状态）
    };

    window.addEventListener('vr:scene-aim', handleSceneAim);

    // 保存清理函数（在 dispose 中使用）
    if (!this.scrollHandlers) {
      this.scrollHandlers = [];
    }
    this.scrollHandlers.push(() => {
      window.removeEventListener('vr:scene-aim', handleSceneAim);
    });
  }

  /**
   * 接入 interactionBus
   * 注意：class管理由 yieldClassManager 统一处理（通过 document.documentElement）
   */
  private setupInteractionListeners(): void {
    // class管理由 yieldClassManager 统一处理，这里不需要手动管理

    // 条内任意点击先 emit ui-engaged
    this.scrollContainer.addEventListener('click', () => {
      interactionBus.emitUIEngaged();
    }, true); // 使用捕获阶段确保所有点击都能捕获
  }

  /**
   * 设置用户手动滚动检测
   */
  private setupUserScrollDetection(): void {
    // 检查是否停止滚动的轮询函数
    const checkUserScrollStop = () => {
      const now = performance.now();
      if (now - this.lastUserScrollTs >= 400) {
        // 用户已停止滚动 400ms
        this.userScrolling = false;
        this.element.classList.remove('is-user-scrolling');
        this.userScrollCheckTimer = null;
      } else {
        // 继续检查
        this.userScrollCheckTimer = requestAnimationFrame(checkUserScrollStop);
      }
    };

    // 标记用户开始手动滚动
    const markUserScrolling = () => {
      this.userScrolling = true;
      this.lastUserScrollTs = performance.now();
      this.element.classList.add('is-user-scrolling');
      
      // 触发交互信号（中断自动导航倒计时）
      debugLog('统一终止触发点: 横条滚动');
      interactionBus.emitInteracting();
      
      // 清除之前的定时器
      if (this.userScrollCheckTimer !== null) {
        cancelAnimationFrame(this.userScrollCheckTimer);
      }
      
      // 开始轮询检查是否停止滚动
      this.userScrollCheckTimer = requestAnimationFrame(checkUserScrollStop);
    };

    // 监听滚动事件
    const onScroll = () => {
      markUserScrolling();
    };

    // 监听指针/触摸/滚轮事件
    const onPointerDown = () => {
      markUserScrolling();
    };

    const onTouchStart = () => {
      markUserScrolling();
    };

    const onWheel = () => {
      markUserScrolling();
    };

    // 绑定事件
    this.scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    this.scrollContainer.addEventListener('pointerdown', onPointerDown, { passive: true });
    this.scrollContainer.addEventListener('touchstart', onTouchStart, { passive: true });
    this.scrollContainer.addEventListener('wheel', onWheel, { passive: true });

    // 保存清理函数
    this.scrollHandlers.push(() => {
      this.scrollContainer.removeEventListener('scroll', onScroll);
      this.scrollContainer.removeEventListener('pointerdown', onPointerDown);
      this.scrollContainer.removeEventListener('touchstart', onTouchStart);
      this.scrollContainer.removeEventListener('wheel', onWheel);
    });
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
      // 延迟滚动到新场景（确保 DOM 已更新）
      requestAnimationFrame(() => {
        this.scrollToCurrent();
      });
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
    // 清理用户滚动检测定时器（requestAnimationFrame）
    if (this.userScrollCheckTimer !== null) {
      cancelAnimationFrame(this.userScrollCheckTimer);
      this.userScrollCheckTimer = null;
    }

    // 清理滚动事件监听器
    this.scrollHandlers.forEach((cleanup) => cleanup());
    this.scrollHandlers = [];

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





