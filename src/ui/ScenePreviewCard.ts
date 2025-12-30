/**
 * 场景预览卡片组件
 * 当 GroundNavDots 的 dot 进入 is-aimed 时显示，显示目标场景的名称和缩略图
 */

import { interactionBus } from './interactionBus';
import { debugLog } from '../utils/debug';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
import { onSceneFocus, SceneFocusEvent } from './sceneLinkBus';
import { PreloadManager } from './preloadManager';
import { getNetworkPolicy } from './networkPolicy';

type SceneMeta = {
  title: string;
  thumb?: string;
  panoUrl?: string; // 可选：全景图 URL（用于预热）
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
  private preload: PreloadManager;
  private hintEl: HTMLElement | null = null; // 意图提示文案元素
  private autoNavTargetSceneId: string | null = null; // 当前自动导航目标 sceneId
  private emphasisTimer: number | null = null; // 倒计时最后25%强调定时器
  
  private unsubscribeInteracting?: () => void;
  private unsubscribeIdle?: () => void;
  private unsubscribeUIEngaged?: () => void;
  private unsubscribeFocus?: () => void;
  private aimHandler?: (e: Event) => void;
  private focusHandler?: (e: Event) => void;
  private closePanelsHandler?: () => void;
  private autoNavHandler?: (e: Event) => void;

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

    // 初始化预热管理器
    this.preload = new PreloadManager({
      maxConcurrent: 2,
      debounceMs: 150,
    });
    // 初始化策略（会在每次 aim 时重新获取，保证实时性）
    const initialPolicy = getNetworkPolicy();
    this.preload.setPolicy(initialPolicy.allowHeavyPreload);

    // 接入 interactionBus
    this.setupInteractionListeners();

    // 监听场景聚焦事件（focus 时隐藏）
    this.setupFocusListener();

    // 监听 vr:scene-aim 事件
    this.setupAimListener();

    // 监听 vr:scene-autonav 事件
    this.setupAutoNavListener();

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
      // 清理所有定时器和状态
      this.cancelEmphasis();
      // 强制隐藏：CSS 已处理，这里只做状态清理
      this.hide();
      this.hideHint();
      this.autoNavTargetSceneId = null;
      // 清除预热
      this.preload.clear();
    });
    this.unsubscribeIdle = interactionBus.on('user-idle', () => {
      this.setInteracting(false);
      // 不自动 show，等下一次 aim（CSS 会自动恢复）
    });
    this.unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
      this.setInteracting(false);
      // 清理所有定时器和状态
      this.cancelEmphasis();
      // 立即清理状态（CSS 会立即恢复）
      this.hideHint();
      this.autoNavTargetSceneId = null;
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
        // 场景切换时：清理所有定时器和状态
        this.cancelEmphasis();
        this.hide();
        this.preload.clear();
        this.hideHint();
        this.autoNavTargetSceneId = null;
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

      // 如果正在交互，忽略所有事件（等待交互结束后的新事件）
      if (this.isInteracting) return;

      if (customEvent.detail.type === 'aim' && customEvent.detail.sceneId) {
        const sceneId = customEvent.detail.sceneId;
        
        // 兜底校验：确保 sceneId 存在
        if (!sceneId) {
          debugLog('setupAimListener: sceneId is missing, skipping');
          return;
        }
        
        // 如果正在交互，忽略（等待交互结束后的新事件）
        if (this.isInteracting) {
          return;
        }
        
        const meta = this.getSceneMeta(sceneId);
        
        // 若无 meta => hide
        if (!meta) {
          this.hide();
          this.preload.clear();
          return;
        }

        // 修复闪烁：先隐藏再更新（确保稳定切换）
        this.hide();
        
        // 取消旧的资源预热任务和强调定时器（确保只保留最新目标）
        this.preload.clear();
        this.cancelEmphasis();

        // 更新内容
        this.updateContent(sceneId, meta);

        // 重新获取网络策略（保证实时性，避免用户中途切换省流/网络档位导致策略不更新）
        const policy = getNetworkPolicy();
        this.preload.setPolicy(policy.allowHeavyPreload);

        // 弱网/低性能设备兜底：当 allowHeavyPreload === false 时，不等待图片加载
        // 预览卡只显示文字 + 占位，不等待任何图片完成
        // 自动进入逻辑不依赖任何资源加载完成与否
        if (policy.allowHeavyPreload) {
          // 预热资源（通过 PreloadManager）- 只预热最新目标
          const thumbUrl = meta.thumb ? resolveAssetUrl(meta.thumb, AssetType.THUMB) : undefined;
          this.preload.aim(
            this.museumId,
            sceneId,
            {
              thumbUrl,
              panoUrl: meta.panoUrl,
            }
          );
        } else {
          debugLog('弱网模式: 跳过资源预热', { sceneId });
          // 弱网模式下不预热，预览卡会显示占位
        }

        // 不在这里显示 hint，hint 只在 vr:scene-autonav start 时显示

        // 若 !isInteracting：show()
        if (!this.isInteracting) {
          this.show();
        }
      } else if (customEvent.detail.type === 'clear') {
        // clear 时：清理所有定时器和状态
        this.cancelEmphasis();
        this.hide();
        this.preload.clear();
        this.hideHint();
        this.autoNavTargetSceneId = null;
      }
    };

    window.addEventListener('vr:scene-aim', this.aimHandler);
  }

  /**
   * 监听 vr:scene-autonav 事件（自动导航倒计时开始/取消）
   */
  private setupAutoNavListener(): void {
    this.autoNavHandler = (e: Event) => {
      const customEvent = e as CustomEvent<{
        type: 'start' | 'cancel';
        museumId: string;
        sceneId?: string;
        ts: number;
      }>;

      // 只处理当前博物馆的事件
      if (customEvent.detail?.museumId !== this.museumId) return;

      if (customEvent.detail.type === 'start' && customEvent.detail.sceneId) {
        const sceneId = customEvent.detail.sceneId;
        // 确保单点发生：新目标出现时，先清理旧目标
        if (this.autoNavTargetSceneId !== null && this.autoNavTargetSceneId !== sceneId) {
          this.cancelEmphasis();
          this.hideHint();
        }
        // 只在非 interacting 状态显示 hint
        if (!this.isInteracting) {
          this.showHint();
          this.autoNavTargetSceneId = sceneId;
          // 安排倒计时最后25%的视觉强调（650ms的25% = 162.5ms，从487.5ms后开始）
          this.scheduleEmphasis(487.5);
        }
      } else if (customEvent.detail.type === 'cancel') {
        // 取消时：清理所有定时器和状态
        this.cancelEmphasis();
        this.hideHint();
        this.autoNavTargetSceneId = null;
      }
    };

    window.addEventListener('vr:scene-autonav', this.autoNavHandler);
  }

  /**
   * 监听 vr:close-panels 事件
   */
  private setupClosePanelsListener(): void {
    this.closePanelsHandler = () => {
      // 关闭面板时：清理所有定时器和状态
      this.cancelEmphasis();
      this.hide();
      this.preload.clear();
      this.hideHint();
      this.autoNavTargetSceneId = null;
    };
    window.addEventListener('vr:close-panels', this.closePanelsHandler);
  }

  /**
   * 显示意图提示
   */
  private showHint(): void {
    if (this.hintEl) {
      this.hintEl.classList.add('is-visible');
    }
  }

  /**
   * 隐藏意图提示
   */
  private hideHint(): void {
    if (this.hintEl) {
      this.hintEl.classList.remove('is-visible', 'is-emphasizing');
    }
    this.cancelEmphasis();
  }

  /**
   * 安排倒计时最后25%的视觉强调
   */
  private scheduleEmphasis(delayMs: number): void {
    this.cancelEmphasis();
    this.emphasisTimer = window.setTimeout(() => {
      this.emphasisTimer = null;
      // 兜底校验：组件是否仍存活
      if (!this.root.parentNode) {
        debugLog('emphasisTimer: component disposed, skipping');
        return;
      }
      if (this.hintEl && this.hintEl.classList.contains('is-visible')) {
        this.hintEl.classList.add('is-emphasizing');
      }
    }, delayMs);
  }

  /**
   * 取消视觉强调
   */
  private cancelEmphasis(): void {
    if (this.emphasisTimer !== null) {
      window.clearTimeout(this.emphasisTimer);
      this.emphasisTimer = null;
    }
    if (this.hintEl) {
      this.hintEl.classList.remove('is-emphasizing');
    }
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
        img.referrerPolicy = 'no-referrer';
        (img as any).loading = 'lazy';
        (img as any).decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.loading = 'lazy';
        img.decoding = 'async';
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
    // 清理所有定时器和状态
    this.cancelEmphasis();
    this.hideHint();
    this.autoNavTargetSceneId = null;
    
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
    if (this.autoNavHandler) {
      window.removeEventListener('vr:scene-autonav', this.autoNavHandler);
      this.autoNavHandler = undefined;
    }

    // 移除 DOM
    if (this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }

    // 清理预热管理器
    this.preload.dispose();
  }

  /**
   * 获取根元素（用于测试等）
   */
  getElement(): HTMLElement {
    return this.root;
  }
}

