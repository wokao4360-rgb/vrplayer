/**
 * 场景预览卡片组件
 * 当 GroundNavDots 的 dot 进入 is-aimed 时显示，显示目标场景的名称和缩略图
 */

import { interactionBus } from './interactionBus';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
import { onSceneFocus, SceneFocusEvent } from './sceneLinkBus';

type SceneMeta = {
  title: string;
  thumb?: string;
};

type ScenePreviewCardOptions = {
  museumId: string;
  getSceneMeta: (sceneId: string) => SceneMeta | null;
};

export class ScenePreviewCard {
  private root: HTMLElement;
  private thumbEl: HTMLElement;
  private thumbImg: HTMLImageElement | null = null;
  private titleEl: HTMLElement;
  private museumId: string;
  private getSceneMeta: (sceneId: string) => SceneMeta | null;
  private visible: boolean = false;
  private isInteracting: boolean = false;
  private currentSceneId: string | null = null;
  private prefetchedThumbUrls: Set<string> = new Set();
  
  private unsubscribeInteracting?: () => void;
  private unsubscribeIdle?: () => void;
  private unsubscribeUIEngaged?: () => void;
  private unsubscribeFocus?: () => void;
  private aimHandler?: (e: Event) => void;
  private focusHandler?: (e: Event) => void;
  private closePanelsHandler?: () => void;

  constructor(container: HTMLElement, options: ScenePreviewCardOptions) {
    this.museumId = options.museumId;
    this.getSceneMeta = options.getSceneMeta;

    // 创建根元素
    this.root = document.createElement('div');
    this.root.className = 'vr-previewcard';

    // 创建缩略图容器
    this.thumbEl = document.createElement('div');
    this.thumbEl.className = 'vr-previewcard__thumb';

    // 创建标题元素
    this.titleEl = document.createElement('div');
    this.titleEl.className = 'vr-previewcard__title';

    // 组装
    this.root.appendChild(this.thumbEl);
    this.root.appendChild(this.titleEl);
    container.appendChild(this.root);

    // 接入 interactionBus
    this.setupInteractionListeners();

    // 监听场景聚焦事件（focus 时隐藏）
    this.setupFocusListener();

    // 监听 vr:scene-aim 事件
    this.setupAimListener();

    // 监听 vr:close-panels 事件
    this.setupClosePanelsListener();

    // 初始隐藏
    this.hide();
  }

  /**
   * 接入 interactionBus
   */
  private setupInteractionListeners(): void {
    this.unsubscribeInteracting = interactionBus.on('user-interacting', () => {
      this.setInteracting(true);
      this.hide();
    });
    this.unsubscribeIdle = interactionBus.on('user-idle', () => {
      this.setInteracting(false);
      // 不自动 show，等下一次 aim
    });
    this.unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
      this.setInteracting(false);
      // 不自动 show，等下一次 aim
    });
  }

  /**
   * 监听场景聚焦事件
   */
  private setupFocusListener(): void {
    this.focusHandler = (e: Event) => {
      const customEvent = e as CustomEvent<SceneFocusEvent>;
      // 若 detail.type==='focus'：hide()（只要 focus 就收起，避免切场景残留）
      if (customEvent.detail?.type === 'focus') {
        this.hide();
      }
    };

    // 使用 sceneLinkBus 的 onSceneFocus（内部会转换为 window 事件）
    // 但我们也可以直接监听 window 事件，更简单
    window.addEventListener('vr:scene-focus', this.focusHandler);
  }

  /**
   * 监听 vr:scene-aim 事件
   */
  private setupAimListener(): void {
    this.aimHandler = (e: Event) => {
      const customEvent = e as CustomEvent<{
        type: 'aim' | 'clear';
        museumId: string;
        sceneId?: string;
        source: string;
        ts: number;
      }>;

      // 只处理来自 groundnav 的事件
      if (customEvent.detail?.source !== 'groundnav') return;

      // 只处理当前博物馆的事件
      if (customEvent.detail?.museumId !== this.museumId) return;

      if (customEvent.detail.type === 'aim' && customEvent.detail.sceneId) {
        const sceneId = customEvent.detail.sceneId;
        const meta = this.getSceneMeta(sceneId);
        
        // 若无 meta => hide
        if (!meta) {
          this.hide();
          return;
        }

        // 更新内容
        this.updateContent(sceneId, meta);

        // 预取缩略图（如果存在且没预取过）
        if (meta.thumb) {
          this.prefetchThumb(meta.thumb);
        }

        // 若 !isInteracting：show()
        if (!this.isInteracting) {
          this.show();
        }
      } else if (customEvent.detail.type === 'clear') {
        this.hide();
      }
    };

    window.addEventListener('vr:scene-aim', this.aimHandler);
  }

  /**
   * 监听 vr:close-panels 事件
   */
  private setupClosePanelsListener(): void {
    this.closePanelsHandler = () => {
      this.hide();
    };
    window.addEventListener('vr:close-panels', this.closePanelsHandler);
  }

  /**
   * 更新内容（标题和缩略图）
   */
  private updateContent(sceneId: string, meta: SceneMeta): void {
    this.currentSceneId = sceneId;

    // 更新标题
    this.titleEl.textContent = meta.title;

    // 清空缩略图容器
    this.thumbEl.innerHTML = '';
    this.thumbImg = null;

    // 移除 is-empty class
    this.thumbEl.classList.remove('is-empty');

    if (meta.thumb) {
      // 解析缩略图 URL
      const thumbUrl = resolveAssetUrl(meta.thumb, AssetType.THUMB);
      if (thumbUrl) {
        // 创建 img 元素
        const img = document.createElement('img');
        img.src = thumbUrl;
        img.alt = meta.title;
        this.thumbEl.appendChild(img);
        this.thumbImg = img;
      } else {
        // URL 解析失败，显示占位
        this.thumbEl.classList.add('is-empty');
      }
    } else {
      // 无 thumb，显示占位
      this.thumbEl.classList.add('is-empty');
    }
  }

  /**
   * 预取缩略图
   */
  private prefetchThumb(thumb: string): void {
    const thumbUrl = resolveAssetUrl(thumb, AssetType.THUMB);
    if (!thumbUrl) return;

    // 如果已经预取过，跳过
    if (this.prefetchedThumbUrls.has(thumbUrl)) {
      return;
    }

    // 预取
    const img = new Image();
    img.onload = () => {
      // 预取成功，缓存 URL
      this.prefetchedThumbUrls.add(thumbUrl);
    };
    img.onerror = () => {
      // 预取失败，也缓存 URL（避免重复尝试）
      this.prefetchedThumbUrls.add(thumbUrl);
    };
    img.src = thumbUrl;
  }

  /**
   * 显示预览卡
   */
  private show(): void {
    if (!this.visible) {
      this.visible = true;
      this.root.classList.add('is-visible');
    }
  }

  /**
   * 隐藏预览卡
   */
  private hide(): void {
    if (this.visible) {
      this.visible = false;
      this.root.classList.remove('is-visible');
    }
  }

  /**
   * 设置交互状态
   */
  setInteracting(isInteracting: boolean): void {
    this.isInteracting = isInteracting;
  }

  /**
   * 清理资源
   */
  dispose(): void {
    // 清理事件监听
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
    if (this.focusHandler) {
      window.removeEventListener('vr:scene-focus', this.focusHandler);
      this.focusHandler = undefined;
    }
    if (this.aimHandler) {
      window.removeEventListener('vr:scene-aim', this.aimHandler);
      this.aimHandler = undefined;
    }
    if (this.closePanelsHandler) {
      window.removeEventListener('vr:close-panels', this.closePanelsHandler);
      this.closePanelsHandler = undefined;
    }

    // 移除 DOM
    if (this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }

    // 清理缓存
    this.prefetchedThumbUrls.clear();
  }

  /**
   * 获取根元素（用于测试等）
   */
  getElement(): HTMLElement {
    return this.root;
  }
}

