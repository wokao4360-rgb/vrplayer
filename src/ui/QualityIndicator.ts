/**
 * 清晰度状态指示器
 * 显示当前全景图的加载状态和清晰度信息
 * 不遮挡视野，不影响沉浸体验
 */

import { isFullscreen } from '../utils/fullscreenState';
import { LoadStatus } from '../types/loadStatus';

export { LoadStatus } from '../types/loadStatus';

export class QualityIndicator {
  private element: HTMLElement;
  private currentStatus: LoadStatus = LoadStatus.LOADING_LOW;
  private autoHideTimer: number | null = null;
  private maxVisibleTimer: number | null = null;
  private readonly maxVisibleMs = 10000;
  private readonly readyHideMs = 2500;
  private metricsText = '';

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
    // 全屏状态下不显示任何提示
    if (isFullscreen()) {
      this.hide();
      return;
    }

    this.currentStatus = status;
    this.render();

    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
      this.autoHideTimer = null;
    }
    if (this.maxVisibleTimer) {
      clearTimeout(this.maxVisibleTimer);
      this.maxVisibleTimer = null;
    }

    // 加载中或错误时显示（但最多显示 10 秒）
    if (
      status === LoadStatus.LOADING_LOW ||
      status === LoadStatus.LOADING_HIGH ||
      status === LoadStatus.ERROR ||
      status === LoadStatus.DEGRADED
    ) {
      this.show();
      this.maxVisibleTimer = window.setTimeout(() => {
        this.hide();
      }, this.maxVisibleMs);
      return;
    }

    // 加载完成后短暂显示再隐藏
    if (status === LoadStatus.HIGH_READY || status === LoadStatus.LOW_READY) {
      this.show();
      this.autoHideTimer = window.setTimeout(() => {
        this.hide();
      }, this.readyHideMs);
    }
  }

  updateMetrics(metrics: {
    lowReadyMs?: number;
    highReadyMs?: number;
    tileHitRate?: number;
    tilesFailed?: number;
    tilesRetries?: number;
    perfMode?: string;
    renderSource?: string;
  }): void {
    const params = new URLSearchParams(window.location.search);
    const enable =
      params.get('metrics') === '1' ||
      params.get('metrics') === 'true' ||
      params.get('tilesDebug') === '1';
    if (!enable) return;
    const low = metrics.lowReadyMs ?? -1;
    const high = metrics.highReadyMs ?? -1;
    const hit = metrics.tileHitRate ?? 0;
    const failed = metrics.tilesFailed ?? 0;
    const retries = metrics.tilesRetries ?? 0;
    const perf = metrics.perfMode ?? '';
    const source = metrics.renderSource ?? '';
    this.metricsText =
      `low:${low}ms high:${high}ms ` +
      `hit:${hit}% fail:${failed} retry:${retries} ` +
      `${perf ? `perf:${perf} ` : ''}${source ? `src:${source}` : ''}`.trim();
    this.render();
  }

  private render(): void {
    const { text, icon, className } = this.getStatusInfo();

    this.element.innerHTML = `
      <div class="quality-indicator-content ${className}">
        <span class="quality-icon">${icon}</span>
        <span class="quality-text">${text}</span>
        ${this.metricsText ? `<span class="quality-metrics">${this.metricsText}</span>` : ''}
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
          icon: '✨',
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
          text: '网络较慢，已先使用低清',
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
    if (this.maxVisibleTimer) {
      clearTimeout(this.maxVisibleTimer);
    }
    this.element.remove();
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .quality-indicator {
        position: fixed;
        left: 50%;
        top: calc(16px + env(safe-area-inset-top, 0px));
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
      }
      .quality-indicator.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
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
      .quality-metrics {
        margin-left: 6px;
        font-size: 11px;
        opacity: 0.7;
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
        .quality-indicator-content {
          padding: 6px 12px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
