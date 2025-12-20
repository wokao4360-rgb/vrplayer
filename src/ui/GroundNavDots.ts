/**
 * 地面导航点组件
 * 当用户视角向下（pitch 足够低）时显示，在固定半径圆环上显示场景导航点
 * 与 CompassDisk 同步显示逻辑和贴地变换
 */

import { onSceneFocus, SceneFocusEvent } from './sceneLinkBus';
import { navigateToScene } from '../utils/router';
import { emitSceneFocus } from './sceneLinkBus';
import { computeGroundOverlayTransform, shouldShowGroundOverlay } from './groundOverlayTransform';
import { interactionBus } from './interactionBus';
import { debugLog } from '../utils/debug';

const RING_RADIUS = 60; // 圆环半径（px）

// 视线瞄准相关常量
const AIM_THRESHOLD_DEG = 14; // 瞄准阈值（度），建议 10~15
const AIM_HYSTERESIS_DEG = 4; // 防抖阈值（度），避免在边界来回跳

// 自动导航相关常量
const AUTO_NAV_DELAY_MS = 650;        // 稳定瞄准多久触发（毫秒）
const AUTO_NAV_MIN_DWELL_MS = 120;    // aimed 刚变化的短保护（避免抖动马上计时）
const AUTO_NAV_COOLDOWN_MS = 900;     // 切换后冷却，避免连续跳（毫秒）
const AUTO_NAV_PITCH_GATE = -62;      // 比显示阈值更严格一点：必须更低头才允许自动切（度）

// 目标变化防抖常量（统一节奏）
const AIM_CHANGE_DEBOUNCE_MS = 150;   // 目标变化后的防抖延迟（毫秒），避免频繁切换

type SceneHotspot = {
  id: string;
  label: string;
  yaw: number;
  pitch: number;
  target: {
    museumId: string;
    sceneId: string;
  };
};

type GroundNavDotsOptions = {
  museumId: string;
  currentSceneId: string;
  sceneHotspots: SceneHotspot[];
  onNavigateToScene?: (museumId: string, sceneId: string) => void;
};

export class GroundNavDots {
  private root: HTMLElement;
  private container: HTMLElement;
  private dots: Map<string, HTMLElement> = new Map();
  private dotYawDeg: Map<string, number> = new Map(); // sceneId -> yaw 角度
  private currentYaw: number = 0;
  private currentPitch: number = 0;
  private isVisible: boolean = false;
  private museumId: string;
  private currentSceneId: string;
  private sceneHotspots: SceneHotspot[];
  private hoverSceneId: string | null = null;
  private onNavigateToScene: (museumId: string, sceneId: string) => void;
  private unsubscribeFocus?: () => void;
  private lastYawDeg: number = 0;
  private lastPitchDeg: number = 0;
  private aimedSceneId: string | null = null;
  private isInteracting: boolean = false;
  private unsubscribeInteracting?: () => void;
  private unsubscribeIdle?: () => void;
  private unsubscribeUIEngaged?: () => void;
  private idleRecoveryTimer: number | null = null; // user-idle 恢复定时器
  
  // 自动导航相关字段
  private lastAimChangeTs: number = 0;
  private autoNavTimer: number | null = null;
  private autoNavTargetSceneId: string | null = null;
  private lastAutoNavTs: number = 0;
  private aimDebounceTimer: number | null = null; // 目标变化防抖定时器

  constructor(options: GroundNavDotsOptions) {
    this.museumId = options.museumId;
    this.currentSceneId = options.currentSceneId;
    this.sceneHotspots = options.sceneHotspots;
    this.onNavigateToScene = options.onNavigateToScene || navigateToScene;

    // 创建根容器
    this.root = document.createElement('div');
    this.root.className = 'vr-groundnav';

    // 创建圆点容器
    this.container = document.createElement('div');
    this.container.className = 'vr-groundnav__container';
    this.root.appendChild(this.container);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
    this.root.style.setProperty('--vr-ground-base-blur', '0px');

    // 监听场景聚焦事件
    this.unsubscribeFocus = onSceneFocus((event: SceneFocusEvent) => {
      this.handleSceneFocus(event);
    });

    // 接入 interactionBus
    this.setupInteractionListeners();

    // 渲染圆点
    this.renderDots();
  }

  /**
   * 接入 interactionBus
   * 注意：class管理由 yieldClassManager 统一处理，这里只做状态清理
   */
  private setupInteractionListeners(): void {
    this.unsubscribeInteracting = interactionBus.on('user-interacting', () => {
      debugLog('统一终止触发点: 用户交互');
      this.isInteracting = true;
      // 清理所有定时器
      this.clearAllTimers();
      // 立即清除所有状态，不再派发任何aim/autonav事件
      this.clearAimed();
      this.cancelAutoNav();
    });
    this.unsubscribeIdle = interactionBus.on('user-idle', () => {
      // 清理之前的恢复定时器
      if (this.idleRecoveryTimer !== null) {
        clearTimeout(this.idleRecoveryTimer);
        this.idleRecoveryTimer = null;
      }
      // 延迟恢复：由 yieldClassManager 统一处理延迟，这里只恢复状态标志
      // 使用与 yieldClassManager 相同的延迟时间
      this.idleRecoveryTimer = window.setTimeout(() => {
        this.idleRecoveryTimer = null;
        // 兜底校验：组件是否仍存活
        if (!this.root.parentNode) {
          debugLog('idleRecoveryTimer: component disposed, skipping');
          return;
        }
        this.isInteracting = false;
      }, 400); // 与 yieldClassManager 的 restoreDelayMs 一致
    });
    this.unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
      debugLog('统一终止触发点: UI 点击');
      // 清理所有定时器
      this.clearAllTimers();
      // UI被点击时立即清除所有状态并立即恢复（yieldClassManager 会立即移除 class）
      this.isInteracting = false;
      this.clearAimed();
      this.cancelAutoNav();
    });
  }

  /**
   * 清理所有定时器（统一入口）
   */
  private clearAllTimers(): void {
    if (this.idleRecoveryTimer !== null) {
      clearTimeout(this.idleRecoveryTimer);
      this.idleRecoveryTimer = null;
    }
    if (this.autoNavTimer !== null) {
      clearTimeout(this.autoNavTimer);
      this.autoNavTimer = null;
    }
    this.clearAimDebounce();
  }

  /**
   * 角度归一化到 [0, 360)
   */
  private normalizeDeg(d: number): number {
    return ((d % 360) + 360) % 360;
  }

  /**
   * 计算两个角度之间的最短差值（返回 [-180, 180]）
   */
  private shortestDeltaDeg(a: number, b: number): number {
    const d = this.normalizeDeg(a) - this.normalizeDeg(b);
    return ((d + 180) % 360) - 180;
  }

  /**
   * 清除 aimed 状态
   */
  private clearAimed(): void {
    if (this.aimedSceneId !== null) {
      const dot = this.dots.get(this.aimedSceneId);
      if (dot) {
        dot.classList.remove('is-aimed', 'is-autonav', 'is-autonav-progress');
        // 移除进度指示器
        this.removeProgress(this.aimedSceneId);
      }
      this.aimedSceneId = null;
      // 清除防抖定时器
      this.clearAimDebounce();
      // 派发 clear 事件（仅在确实有 aimedSceneId 时）
      this.emitSceneAim('clear', null);
    }
    // 取消自动导航计时
    this.cancelAutoNav();
  }

  /**
   * 取消自动导航计时
   */
  private cancelAutoNav(): void {
    if (this.autoNavTimer != null) {
      window.clearTimeout(this.autoNavTimer);
      this.autoNavTimer = null;
    }
    // 移除倒计时视觉提示
    if (this.autoNavTargetSceneId !== null) {
      const targetSceneId = this.autoNavTargetSceneId;
      // 兜底校验：确保 sceneId 存在
      if (targetSceneId) {
        this.removeProgress(targetSceneId);
        const dot = this.dots.get(targetSceneId);
        if (dot) {
          dot.classList.remove('is-autonav', 'is-autonav-progress');
        }
        // 派发 cancel 事件
        this.emitSceneAutoNav('cancel', targetSceneId);
      }
      this.autoNavTargetSceneId = null;
    }
  }

  /**
   * 移除进度指示器
   */
  private removeProgress(sceneId: string): void {
    const dot = this.dots.get(sceneId);
    if (!dot) return;
    
    const progress = dot.querySelector('.vr-groundnav__progress');
    if (progress) {
      dot.removeChild(progress);
    }
  }

  /**
   * 添加进度指示器
   */
  private addProgress(sceneId: string): void {
    const dot = this.dots.get(sceneId);
    if (!dot) return;
    
    // 如果已存在，先移除
    this.removeProgress(sceneId);
    
    // 创建进度元素
    const progress = document.createElement('div');
    progress.className = 'vr-groundnav__progress';
    // 设置动画时长（通过 CSS 变量）
    progress.style.setProperty('--progress-duration', `${AUTO_NAV_DELAY_MS}ms`);
    
    dot.appendChild(progress);
    dot.classList.add('is-autonav-progress');
  }

  /**
   * 尝试启动自动导航计时（在满足条件时）
   */
  private scheduleAutoNavIfAllowed(sceneId: string): void {
    // 兜底校验：sceneId 非空
    if (!sceneId) {
      debugLog('scheduleAutoNavIfAllowed: sceneId is missing, skipping');
      return;
    }
    
    const now = Date.now();

    // 1) interacting 时禁用
    if (this.isInteracting) {
      debugLog('scheduleAutoNavIfAllowed: isInteracting, skipping');
      return;
    }

    // 2) pitch gate（更严格）：必须更低头才允许自动切
    if (this.lastPitchDeg > AUTO_NAV_PITCH_GATE) {
      debugLog('scheduleAutoNavIfAllowed: pitch too high, skipping', this.lastPitchDeg);
      return;
    }

    // 3) 冷却期：刚自动切过不要再触发
    if (now - this.lastAutoNavTs < AUTO_NAV_COOLDOWN_MS) {
      debugLog('scheduleAutoNavIfAllowed: cooldown, skipping');
      return;
    }

    // 4) 保护期：aim 刚变更不要立刻开始倒计时（防抖）
    if (now - this.lastAimChangeTs < AUTO_NAV_MIN_DWELL_MS) {
      debugLog('scheduleAutoNavIfAllowed: min dwell, skipping');
      return;
    }

    // 5) 若 sceneId 与当前场景相同则 return
    if (this.currentSceneId && sceneId === this.currentSceneId) {
      debugLog('scheduleAutoNavIfAllowed: same as current scene, skipping');
      return;
    }

    // 确保单点发生：新目标出现时，先清理旧目标
    if (this.autoNavTargetSceneId !== null && this.autoNavTargetSceneId !== sceneId) {
      this.cancelAutoNav();
    }

    debugLog('scene-autonav: start', { sceneId });
    
    // 启动计时
    this.autoNavTargetSceneId = sceneId;
    const dot = this.dots.get(sceneId);
    if (dot) {
      dot.classList.add('is-autonav');
      // 添加进度指示器
      this.addProgress(sceneId);
    }
    
    // 派发 start 事件
    this.emitSceneAutoNav('start', sceneId);
    
    this.autoNavTimer = window.setTimeout(() => {
      this.autoNavTimer = null;
      // 兜底校验：组件是否仍存活
      if (!this.root.parentNode) {
        debugLog('autoNavTimer: component disposed, skipping');
        return;
      }
      // 兜底校验：sceneId 非空
      if (!sceneId) {
        debugLog('autoNavTimer: sceneId is missing, skipping');
        return;
      }
      this.tryAutoNavigate(sceneId);
    }, AUTO_NAV_DELAY_MS);
  }

  /**
   * 尝试执行自动导航
   */
  private tryAutoNavigate(sceneId: string): void {
    // 兜底校验：sceneId 非空
    if (!sceneId) {
      debugLog('tryAutoNavigate: sceneId is missing, skipping');
      this.cancelAutoNav();
      return;
    }

    // 再次校验（关键：避免定时器触发时状态已变）
    if (this.isInteracting) {
      debugLog('tryAutoNavigate: isInteracting, canceling');
      this.cancelAutoNav();
      this.clearAimed();
      return;
    }
    if (!this.aimedSceneId || this.aimedSceneId !== sceneId) {
      debugLog('tryAutoNavigate: aimedSceneId mismatch, canceling', { aimedSceneId: this.aimedSceneId, sceneId });
      this.cancelAutoNav();
      this.clearAimed();
      return;
    }
    if (this.lastPitchDeg > AUTO_NAV_PITCH_GATE) {
      debugLog('tryAutoNavigate: pitch too high, canceling', this.lastPitchDeg);
      this.cancelAutoNav();
      this.clearAimed();
      return;
    }
    const now = Date.now();
    if (now - this.lastAutoNavTs < AUTO_NAV_COOLDOWN_MS) {
      debugLog('tryAutoNavigate: cooldown, canceling');
      this.cancelAutoNav();
      this.clearAimed();
      return;
    }

    // 兜底校验：确保 museumId 存在
    if (!this.museumId) {
      debugLog('tryAutoNavigate: museumId is missing, canceling');
      this.cancelAutoNav();
      this.clearAimed();
      return;
    }

    debugLog('scene-autonav: trigger', { museumId: this.museumId, sceneId });
    
    // 执行自动切换前，先清理所有状态（确保无残留）
    const targetSceneId = sceneId;
    this.cancelAutoNav();
    this.clearAimed();
    
    // 执行自动切换
    this.lastAutoNavTs = now;

    // 1) 关闭面板
    window.dispatchEvent(new CustomEvent('vr:close-panels'));

    // 2) 先发 focus（source 标记为 pano-auto，方便其他组件区分）
    emitSceneFocus({
      type: 'focus',
      museumId: this.museumId,
      sceneId: targetSceneId,
      source: 'pano-auto',
      ts: now,
    });

    // 3) 导航
    this.onNavigateToScene(this.museumId, targetSceneId);
  }

  /**
   * 根据 pitch 检查是否需要取消自动导航
   */
  private maybeRescheduleOrCancelByPitch(pitchDeg: number): void {
    if (pitchDeg > AUTO_NAV_PITCH_GATE) {
      // pitch 过高，取消自动导航并清理 aimed（抬头时彻底清理）
      if (this.autoNavTargetSceneId) {
        this.cancelAutoNav();
      }
      if (this.aimedSceneId) {
        this.clearAimed();
      }
    } else if (this.aimedSceneId && pitchDeg <= AUTO_NAV_PITCH_GATE) {
      // pitch 满足条件，如果还没开始计时且不在交互状态，尝试启动
      if (!this.isInteracting && !this.autoNavTimer && this.aimedSceneId !== this.autoNavTargetSceneId) {
        this.scheduleAutoNavIfAllowed(this.aimedSceneId);
      }
    }
  }

  /**
   * 派发 vr:scene-aim 事件
   */
  private emitSceneAim(type: 'aim' | 'clear', sceneId: string | null): void {
    // 兜底校验：确保 museumId 存在
    if (!this.museumId) {
      debugLog('emitSceneAim: museumId is missing, skipping');
      return;
    }
    
    debugLog('scene-aim', { type, museumId: this.museumId, sceneId });
    
    window.dispatchEvent(new CustomEvent('vr:scene-aim', {
      detail: {
        type,
        museumId: this.museumId,
        sceneId: sceneId || undefined,
        source: 'groundnav',
        ts: Date.now(),
      },
    }));
  }

  /**
   * 派发 vr:scene-autonav 事件（自动导航倒计时开始/取消）
   */
  private emitSceneAutoNav(type: 'start' | 'cancel', sceneId: string | null): void {
    // 兜底校验：确保 museumId 存在
    if (!this.museumId) {
      debugLog('emitSceneAutoNav: museumId is missing, skipping');
      return;
    }
    
    debugLog('scene-autonav', { type, museumId: this.museumId, sceneId });
    
    window.dispatchEvent(
      new CustomEvent('vr:scene-autonav', {
        detail: {
          type,
          museumId: this.museumId,
          sceneId: sceneId ?? undefined,
          ts: Date.now(),
        },
      })
    );
  }

  /**
   * 更新 aimed 状态（根据当前 yaw）
   */
  private updateAimed(yawDeg: number): void {
    // 如果正在交互或不可见，不计算 aimed
    if (this.isInteracting || !this.isVisible) {
      this.clearAimed();
      return;
    }

    // 只考虑 scene 类型且 target.sceneId 存在的热点
    const sceneHotspots = this.sceneHotspots.filter(
      (hotspot) => hotspot.target?.sceneId
    );

    if (sceneHotspots.length === 0) {
      this.clearAimed();
      return;
    }

    // 找到最接近的 dot
    let bestSceneId: string | null = null;
    let bestDelta: number = Infinity;

    sceneHotspots.forEach((hotspot) => {
      const sceneId = hotspot.target.sceneId;
      // 严格过滤：忽略当前场景的目标
      if (sceneId === this.currentSceneId) return;
      
      const dotYaw = hotspot.yaw;
      const delta = Math.abs(this.shortestDeltaDeg(yawDeg, dotYaw));

      if (delta < bestDelta) {
        bestDelta = delta;
        bestSceneId = sceneId;
      }
    });

    // 判断是否应该进入 aimed 状态
    let shouldAim = false;
    if (bestSceneId !== null) {
      if (this.aimedSceneId === null) {
        // 没有当前 aimed，直接判断阈值
        shouldAim = bestDelta <= AIM_THRESHOLD_DEG;
      } else {
        // 已有 aimed，使用 hysteresis
        if (bestSceneId === this.aimedSceneId) {
          // 同一个 dot，保持 aimed 直到超过阈值 + hysteresis
          shouldAim = bestDelta <= AIM_THRESHOLD_DEG + AIM_HYSTERESIS_DEG;
        } else {
          // 不同的 dot，需要新的 dot 更接近才切换
          shouldAim = bestDelta <= AIM_THRESHOLD_DEG;
        }
      }
    }

    // 如果正在interacting，立即清理aimed状态，不更新也不派发事件
    if (this.isInteracting) {
      this.clearAimed();
      return;
    }

    // 更新 aimed 状态
    if (shouldAim && bestSceneId !== null) {
      if (this.aimedSceneId !== bestSceneId) {
        // aimedSceneId 发生变化
        // 记录变化时间
        this.lastAimChangeTs = Date.now();
        
        // 取消旧的自动导航计时
        this.cancelAutoNav();
        
        // 清除旧的 aimed
        if (this.aimedSceneId !== null) {
          const oldDot = this.dots.get(this.aimedSceneId);
          if (oldDot) {
            oldDot.classList.remove('is-aimed', 'is-autonav', 'is-autonav-progress');
            // 移除旧的进度指示器
            this.removeProgress(this.aimedSceneId);
          }
        }
        // 设置新的 aimed（视觉状态立即更新）
        this.aimedSceneId = bestSceneId;
        const newDot = this.dots.get(bestSceneId);
        if (newDot) {
          newDot.classList.add('is-aimed');
        }
        
        // 统一节奏与防抖：目标变化后延迟派发事件（避免频繁切换）
        this.clearAimDebounce();
        this.aimDebounceTimer = window.setTimeout(() => {
          this.aimDebounceTimer = null;
          // 兜底校验：组件是否仍存活（通过检查 root 是否仍在 DOM 中）
          if (!this.root.parentNode) {
            debugLog('aimDebounceTimer: component disposed, skipping');
            return;
          }
          // 再次检查：确保目标没有再次变化，且不在交互状态，且仍然可见
          if (this.aimedSceneId === bestSceneId && !this.isInteracting && this.isVisible) {
            // 派发 aim 事件
            this.emitSceneAim('aim', bestSceneId);
            // 尝试启动新的自动导航计时
            this.scheduleAutoNavIfAllowed(bestSceneId);
          } else {
            // 如果状态已变，清理 aimed（确保无残留）
            if (this.aimedSceneId === bestSceneId) {
              this.clearAimed();
            }
          }
        }, AIM_CHANGE_DEBOUNCE_MS);
      } else {
        // aimedSceneId 没变化，如果还没启动计时，尝试启动
        if (!this.autoNavTimer && this.aimedSceneId !== this.autoNavTargetSceneId) {
          this.scheduleAutoNavIfAllowed(bestSceneId);
        }
      }
    } else {
      // 清除 aimed
      this.clearAimed();
    }
  }


  /**
   * 处理场景聚焦事件（hover/focus）
   */
  private handleSceneFocus(event: SceneFocusEvent): void {
    if (event.type === 'hover') {
      this.hoverSceneId = event.sceneId;
    } else if (event.type === 'focus') {
      // 场景切换时：立即终止所有自动进入相关状态（统一终止条件）
      debugLog('统一终止触发点: 场景切换', { sceneId: event.sceneId });
      this.clearAllTimers();
      this.clearAimed();
      this.cancelAutoNav();
      
      // 兜底校验：确保 sceneId 存在
      if (event.sceneId) {
        this.currentSceneId = event.sceneId;
      }
      this.hoverSceneId = null; // focus 时清除 hover
    }
    this.updateDotStates();
  }

  /**
   * 更新圆点状态（current/hover）
   * 注意：不删除 is-aimed，因为它是独立的状态
   */
  private updateDotStates(): void {
    this.dots.forEach((dot, sceneId) => {
      dot.classList.remove('is-current', 'is-hover');
      
      if (sceneId === this.currentSceneId) {
        dot.classList.add('is-current');
      } else if (sceneId === this.hoverSceneId) {
        dot.classList.add('is-hover');
      }
      // is-aimed 由 updateAimed 单独管理，不在这里处理
    });
  }

  /**
   * 渲染所有圆点
   */
  private renderDots(): void {
    // 清空现有圆点
    this.container.innerHTML = '';
    this.dots.clear();
    this.dotYawDeg.clear();
    this.aimedSceneId = null; // 重置 aimed 状态

    // 只渲染 type=scene 且 target.sceneId 存在的热点
    const sceneHotspots = this.sceneHotspots.filter(
      (hotspot) => hotspot.target?.sceneId
    );

    sceneHotspots.forEach((hotspot) => {
      const sceneId = hotspot.target.sceneId;
      const dot = document.createElement('div');
      dot.className = 'vr-groundnav__dot';
      dot.setAttribute('data-scene-id', sceneId);
      dot.setAttribute('title', hotspot.label);

      // 保存 dot 的 yaw 角度
      this.dotYawDeg.set(sceneId, hotspot.yaw);

      // 点击事件
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // 点击防护：立即终止所有"瞄准/倒计时/预览/自动进入"相关状态
        // 清理所有定时器（防止残留导致二次触发）
        this.clearAllTimers();
        // 清除瞄准状态
        this.clearAimed();
        // 取消自动导航计时
        this.cancelAutoNav();
        // 触发交互信号（让其他组件也清理状态）
        interactionBus.emitUIEngaged();
        
        // 派发 focus 事件（确保其他端同步）
        emitSceneFocus({
          type: 'focus',
          museumId: hotspot.target.museumId,
          sceneId: hotspot.target.sceneId,
          source: 'pano',
          ts: Date.now(),
        });

        // 关闭可能打开的面板（通过派发事件）
        window.dispatchEvent(new CustomEvent('vr:close-panels'));

        // 导航到场景（兜底校验：确保 museumId 和 sceneId 存在）
        if (hotspot.target.museumId && hotspot.target.sceneId) {
          this.onNavigateToScene(hotspot.target.museumId, hotspot.target.sceneId);
        } else {
          debugLog('dot click: museumId or sceneId is missing, skipping navigation');
        }
      });

      // hover 事件
      dot.addEventListener('mouseenter', () => {
        emitSceneFocus({
          type: 'hover',
          museumId: hotspot.target.museumId,
          sceneId: hotspot.target.sceneId,
          source: 'pano',
          ts: Date.now(),
        });
      });

      dot.addEventListener('mouseleave', () => {
        emitSceneFocus({
          type: 'hover',
          museumId: hotspot.target.museumId,
          sceneId: null,
          source: 'pano',
          ts: Date.now(),
        });
      });

      this.container.appendChild(dot);
      this.dots.set(hotspot.target.sceneId, dot);
    });

    // 更新初始状态
    this.updateDotStates();
    // 更新位置
    this.updateDotPositions();
  }

  /**
   * 更新圆点位置（根据 yaw）
   */
  private updateDotPositions(): void {
    // 只渲染 type=scene 且 target.sceneId 存在的热点
    const sceneHotspots = this.sceneHotspots.filter(
      (hotspot) => hotspot.target?.sceneId
    );

    sceneHotspots.forEach((hotspot) => {
      const dot = this.dots.get(hotspot.target.sceneId);
      if (!dot) return;

      // 计算角度：hotspot.yaw 转弧度
      // yaw 定义：0° 为正前方（+Z），逆时针为正
      // 在屏幕坐标系中：y 向下，x 向右
      // 为了与 CompassDisk 一致（0° 在屏幕上方），需要调整：
      // - yaw=0 应该对应屏幕上方 (0, -R)
      // - yaw=90 应该对应屏幕右侧 (R, 0)
      // - yaw=-90 应该对应屏幕左侧 (-R, 0)
      // 使用：x = sin(yaw), y = -cos(yaw)
      const angleRad = (hotspot.yaw * Math.PI) / 180;
      const x = Math.sin(angleRad) * RING_RADIUS;
      const y = -Math.cos(angleRad) * RING_RADIUS;

      dot.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /**
   * 设置当前视角（yaw 和 pitch，单位：度）
   */
  setYawPitch(yawDeg: number, pitchDeg: number): void {
    this.currentYaw = yawDeg;
    this.currentPitch = pitchDeg;
    const yawChanged = Math.abs(this.lastYawDeg - yawDeg) > 0.1; // 0.1度阈值
    this.lastYawDeg = yawDeg;
    this.lastPitchDeg = pitchDeg;

    // 计算显示状态（使用公共函数）
    const shouldShow = shouldShowGroundOverlay(pitchDeg);

    if (shouldShow) {
      // 计算贴地变换参数（使用公共函数）
      const transform = computeGroundOverlayTransform(pitchDeg);

      // 性能优化：只在值真正变化时才更新DOM（避免每帧不必要的操作）
      const clarityStr = String(transform.clarity);
      if (this.root.style.getPropertyValue('--vr-ground-clarity') !== clarityStr) {
        this.root.style.setProperty('--vr-ground-clarity', clarityStr);
      }

      const opacityStr = transform.opacity.toString();
      if (this.root.style.opacity !== opacityStr) {
        this.root.style.opacity = opacityStr;
      }

      const transformStr = `translateX(-50%) translateY(${transform.translateY}px) scaleY(${transform.scaleY})`;
      if (this.root.style.transform !== transformStr) {
        this.root.style.transform = transformStr;
      }

      const blurStr = `${transform.blur}px`;
      if (this.root.style.getPropertyValue('--vr-ground-base-blur') !== blurStr) {
        this.root.style.setProperty('--vr-ground-base-blur', blurStr);
      }

      if (!this.isVisible) {
        this.isVisible = true;
      }

      // 更新 aimed 状态（只在可见且非交互时，且yaw有变化时才更新，减少计算）
      if (!this.isInteracting && yawChanged) {
        this.updateAimed(yawDeg);
        // 根据 pitch 检查是否需要取消自动导航
        this.maybeRescheduleOrCancelByPitch(pitchDeg);
      }
    } else {
      // 隐藏
      if (this.isVisible) {
        this.root.style.opacity = '0';
        this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
        this.root.style.setProperty('--vr-ground-base-blur', '0px');
        this.isVisible = false;
        // 清除 aimed（pitch > -55 时）
        this.clearAimed();
      }
    }

    // 更新圆点位置（只在yaw变化时）
    if (yawChanged) {
      this.updateDotPositions();
    }
  }

  /**
   * 更新场景数据
   */
  updateScene(museumId: string, currentSceneId: string, sceneHotspots: SceneHotspot[]): void {
    // 场景切换时：清理所有状态和定时器
    debugLog('统一终止触发点: 博物馆/场景切换', { museumId, currentSceneId });
    this.clearAllTimers();
    this.clearAimed();
    this.cancelAutoNav();
    
    // 兜底校验：确保 museumId 存在
    if (!museumId) {
      debugLog('updateScene: museumId is missing');
      return;
    }
    this.museumId = museumId;
    // currentSceneId 可以为空（列表页）
    this.currentSceneId = currentSceneId;
    this.sceneHotspots = sceneHotspots;
    this.hoverSceneId = null;
    this.renderDots();
  }

  /**
   * 挂载到父容器
   */
  mount(parent: HTMLElement): void {
    parent.appendChild(this.root);
  }

  /**
   * 清理资源
   */
  dispose(): void {
    // 清理所有定时器和状态
    this.clearAllTimers();
    this.cancelAutoNav();
    this.clearAimed();
    
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
    if (this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }

  /**
   * 获取根元素（用于测试等）
   */
  getElement(): HTMLElement {
    return this.root;
  }
}

/**
 * 工厂函数：创建地面导航点
 */
export function createGroundNavDots(options: GroundNavDotsOptions): GroundNavDots {
  return new GroundNavDots(options);
}




