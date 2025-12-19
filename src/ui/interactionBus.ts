/**
 * 交互事件总线
 * 用于视角驱动的 UI 自动让位系统
 * 
 * 事件类型：
 * - 'user-interacting': 用户开始拖动/缩放
 * - 'user-idle': 停止操作一段时间后
 * - 'ui-engaged': 用户点击任何 UI
 */

type InteractionEventType = 'user-interacting' | 'user-idle' | 'ui-engaged';

type InteractionListener = () => void;

class InteractionBus {
  private listeners: Map<InteractionEventType, Set<InteractionListener>> = new Map();
  private lastInteractionTs: number = 0;
  private idleDelay: number = 800; // 800ms
  private idleTimer: number | null = null;
  private rafId: number | null = null;
  private isScheduled: boolean = false;

  constructor() {
    // 初始化事件类型
    this.listeners.set('user-interacting', new Set());
    this.listeners.set('user-idle', new Set());
    this.listeners.set('ui-engaged', new Set());
  }

  /**
   * 订阅事件
   */
  on(event: InteractionEventType, listener: InteractionListener): () => void {
    const set = this.listeners.get(event);
    if (!set) {
      console.warn(`[InteractionBus] 未知事件类型: ${event}`);
      return () => {};
    }
    set.add(listener);
    return () => {
      set.delete(listener);
    };
  }

  /**
   * 取消订阅
   */
  off(event: InteractionEventType, listener: InteractionListener): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(listener);
    }
  }

  /**
   * 触发事件（统一调度，避免重复触发）
   */
  private emit(event: InteractionEventType): void {
    if (!this.isScheduled) {
      this.isScheduled = true;
      // 使用 requestAnimationFrame 统一调度
      this.rafId = requestAnimationFrame(() => {
        this.isScheduled = false;
        const set = this.listeners.get(event);
        if (set) {
          set.forEach((listener) => {
            try {
              listener();
            } catch (error) {
              console.error(`[InteractionBus] 事件监听器执行失败:`, error);
            }
          });
        }
      });
    }
  }

  /**
   * 用户开始交互（拖动/缩放）
   */
  emitInteracting(): void {
    this.lastInteractionTs = Date.now();
    
    // 清除之前的 idle 定时器
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    
    this.emit('user-interacting');
  }

  /**
   * 用户停止交互，等待 idleDelay 后触发 idle
   */
  scheduleIdle(): void {
    // 清除之前的 idle 定时器
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    
    // 设置新的 idle 定时器
    this.idleTimer = window.setTimeout(() => {
      const elapsed = Date.now() - this.lastInteractionTs;
      // 确保在 idleDelay 时间内没有新的交互
      if (elapsed >= this.idleDelay) {
        this.idleTimer = null;
        this.emit('user-idle');
      }
    }, this.idleDelay);
  }

  /**
   * UI 被点击（立即恢复）
   */
  emitUIEngaged(): void {
    this.lastInteractionTs = Date.now();
    
    // 清除 idle 定时器
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    
    this.emit('ui-engaged');
  }

  /**
   * 清理资源
   */
  dispose(): void {
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.listeners.forEach((set) => set.clear());
    this.listeners.clear();
  }
}

// 单例
export const interactionBus = new InteractionBus();



