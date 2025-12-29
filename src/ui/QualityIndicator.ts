/**
 * 清晰度状态指示器
 * 显示当前全景图的加载状态和清晰度信息
 * 不遮挡视野，不影响沉浸体验
 */

export enum LoadStatus {
  LOADING_LOW = 'loadingLow',    // 正在加载低清图
  LOW_READY = 'lowReady',        // 低清图已加载完成
  LOADING_HIGH = 'loadingHigh',  // 正在加载高清图
  HIGH_READY = 'highReady',      // 高清图已加载完成
  DEGRADED = 'degraded',         // 降级模式（高清加载失败，使用低清）
  ERROR = 'error',               // 加载失败
}

export class QualityIndicator {
  private element: HTMLElement;
  private currentStatus: LoadStatus = LoadStatus.LOADING_LOW;
  private autoHideTimer: number | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'quality-indicator';
    this.render();
    this.applyStyles();
  }

  /**
   * 更新加载状态
   */
  updateStatus(status: LoadStatus): void {
    this.currentStatus = status;
    this.render();
    
    // 根据状态决定是否自动隐藏
    if (status === LoadStatus.HIGH_READY || status === LoadStatus.LOW_READY) {
      // 加载完成后 3 秒自动隐藏
      if (this.autoHideTimer) {
        clearTimeout(this.autoHideTimer);
      }
      this.autoHideTimer = window.setTimeout(() => {
        this.hide();
      }, 3000);
    } else {
      // 加载中或错误时显示
      this.show();
    }
  }

  private render(): void {
    const { text, icon, className } = this.getStatusInfo();
    
    this.element.innerHTML = `
      <div class="quality-indicator-content ${className}">
        <span class="quality-icon">${icon}</span>
        <span class="quality-text">${text}</span>
      </div>
    `;
  }

  private getStatusInfo(): { text: string; icon: string; className: string } {
    switch (this.currentStatus) {
      case LoadStatus.LOADING_LOW:
        return {
          text: '正在加载低清图...',
          icon: '⏳',
          className: 'status-loading'
        };
      case LoadStatus.LOW_READY:
        return {
          text: '低清图已加载',
          icon: '✅',
          className: 'status-ready'
        };
      case LoadStatus.LOADING_HIGH:
        return {
          text: '正在加载高清图...',
          icon: '⏳',
          className: 'status-loading'
        };
      case LoadStatus.HIGH_READY:
        return {
          text: '已切换至高清',
          icon: '✨',
          className: 'status-ready'
        };
      case LoadStatus.DEGRADED:
        return {
          text: '当前为低清模式（网络较慢）',
          icon: '⚠️',
          className: 'status-degraded'
        };
      case LoadStatus.ERROR:
        return {
          text: '加载失败',
          icon: '❌',
          className: 'status-error'
        };
      default:
        return {
          text: '',
          icon: '',
          className: ''
        };
    }
  }

  show(): void {
    this.element.classList.add('show');
  }

  hide(): void {
    this.element.classList.remove('show');
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
    }
    this.element.remove();
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .quality-indicator {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
      }
      .quality-indicator.show {
        opacity: 1;
        transform: translateY(0);
      }
      .quality-indicator-content {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(0, 0, 0, 0.75);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        font-size: 13px;
        color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      .quality-icon {
        font-size: 14px;
      }
      .quality-text {
        white-space: nowrap;
      }
      .status-loading {
        border-left: 3px solid #4a90e2;
      }
      .status-ready {
        border-left: 3px solid #27ae60;
      }
      .status-degraded {
        border-left: 3px solid #f39c12;
      }
      .status-error {
        border-left: 3px solid #e74c3c;
      }
      @media (max-width: 480px), ((max-width: 520px) and (pointer: coarse)) {
        .quality-indicator {
          left: 50%;
          right: auto;
          bottom: auto;
          top: calc(12px + env(safe-area-inset-top, 0px));
          transform: translateX(-50%) translateY(10px);
        }
        .quality-indicator.show {
          transform: translateX(-50%) translateY(0);
        }
        .quality-indicator-content {
          padding: 6px 12px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}





















