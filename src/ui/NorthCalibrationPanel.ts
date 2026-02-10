/**
 * 校准北向工具面板
 * 帮助用户通过简单的操作获取 northYaw 值
 */

import { copyText } from './copyText';
import { showToast } from './toast';
import { __VR_DEBUG__ } from '../utils/debug';

type NorthCalibrationPanelOptions = {
  getCurrentYaw: () => number;
  sceneId: string;
  onClose?: () => void;
};

export class NorthCalibrationPanel {
  private element: HTMLElement;
  private overlay: HTMLElement;
  private getCurrentYaw: () => number;
  private sceneId: string;
  private onClose?: () => void;
  private currentYawEl: HTMLElement | null = null;
  private resultEl: HTMLElement | null = null;
  private updateTimer: number | null = null;
  private northYawValue: number | null = null;
  private handleOverlayClick: ((e: MouseEvent) => void) | null = null;
  private handleKeyDown: ((e: KeyboardEvent) => void) | null = null;

  constructor(options: NorthCalibrationPanelOptions) {
    this.getCurrentYaw = options.getCurrentYaw;
    this.sceneId = options.sceneId;
    this.onClose = options.onClose;

    // 创建浮层容器（不遮挡拖动，使用 pointer-events: none 但内部元素 auto）
    this.overlay = document.createElement('div');
    this.overlay.className = 'vr-north-calibration-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 3000;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 16px;
      padding-top: calc(16px + env(safe-area-inset-top, 0px));
    `;

    // 创建面板
    this.element = document.createElement('div');
    this.element.className = 'vr-north-calibration-panel';
    this.element.style.cssText = `
      pointer-events: auto;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 12px;
      padding: 20px;
      min-width: 280px;
      max-width: 380px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    this.render();
    this.overlay.appendChild(this.element);
    document.body.appendChild(this.overlay);

    // 开始实时更新 yaw 显示
    this.startYawUpdate();

    // 点击外部关闭（但不影响拖动）
    this.handleOverlayClick = (e: MouseEvent) => {
      if (e.target === this.overlay) {
        this.close();
      }
    };
    this.overlay.addEventListener('click', this.handleOverlayClick);

    // ESC 键关闭
    this.handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.close();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', this.handleKeyDown);
  }

  private render(): void {
    const yaw = this.getCurrentYaw();
    const yawText = yaw.toFixed(1);

    this.element.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
          🧭 校准北向
        </h3>
        <button class="vr-close-btn" style="
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
        ">×</button>
      </div>

      <div style="margin-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
        <div style="margin-bottom: 8px;">
          <strong>场景 ID：</strong><code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 12px;">${this.sceneId}</code>
        </div>
        <div style="margin-bottom: 12px;">
          <strong>当前 yaw：</strong><span class="vr-current-yaw" style="font-weight: 600; color: rgba(255, 255, 255, 0.9);">${yawText}°</span>
        </div>
        <div style="margin-top: 12px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border-left: 3px solid rgba(255, 255, 255, 0.3);">
          <div style="margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.9);">使用说明：</div>
          <div style="font-size: 12px; line-height: 1.5;">
            1. 将画面对准现实中的<strong>正北方向</strong><br>
            2. 点击下方【设为北】按钮<br>
            3. 复制显示的 <code>northYaw</code> 值<br>
            4. 在 config.json 中该场景的 <code>northYaw</code> 字段填入该值
          </div>
        </div>
        <div style="margin-top: 12px; font-size: 12px; color: rgba(255, 255, 255, 0.6);">
          <strong>含义：</strong>northYaw 表示当你"面向现实北"时的 yaw 值。校准就是：面向北 → 记录当前 yaw → 写入该场景的 northYaw。
        </div>
      </div>

      <div class="vr-calibration-result" style="
        ${this.northYawValue === null ? 'display: none;' : ''}
        margin-bottom: 16px;
        padding: 12px;
        background: rgba(76, 175, 80, 0.15);
        border: 1px solid rgba(76, 175, 80, 0.3);
        border-radius: 8px;
      ">
        <div style="font-size: 13px; color: rgba(255, 255, 255, 0.9); margin-bottom: 8px; font-weight: 600;">
          ✅ 已设为北向
        </div>
        <div class="vr-copy-target" style="
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.95);
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 8px;
          word-break: break-all;
          user-select: all;
        "></div>
        <button class="vr-copy-btn" style="
          width: 100%;
          padding: 8px;
          background: rgba(76, 175, 80, 0.3);
          border: 1px solid rgba(76, 175, 80, 0.5);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        ">点击复制</button>
      </div>

      <div style="display: flex; gap: 8px;">
        <button class="vr-set-north-btn" style="
          flex: 1;
          padding: 10px;
          background: rgba(33, 150, 243, 0.3);
          border: 1px solid rgba(33, 150, 243, 0.5);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        ">设为北</button>
      </div>
    `;

    // 绑定事件
    const closeBtn = this.element.querySelector('.vr-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
      (closeBtn as HTMLElement).addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.color = 'rgba(255, 255, 255, 0.9)';
      });
      (closeBtn as HTMLElement).addEventListener('mouseleave', function() {
        this.style.background = 'none';
        this.style.color = 'rgba(255, 255, 255, 0.6)';
      });
    }

    const setNorthBtn = this.element.querySelector('.vr-set-north-btn');
    if (setNorthBtn) {
      setNorthBtn.addEventListener('click', () => this.handleSetNorth());
      (setNorthBtn as HTMLElement).addEventListener('mouseenter', function() {
        this.style.background = 'rgba(33, 150, 243, 0.4)';
      });
      (setNorthBtn as HTMLElement).addEventListener('mouseleave', function() {
        this.style.background = 'rgba(33, 150, 243, 0.3)';
      });
      (setNorthBtn as HTMLElement).addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
      });
      (setNorthBtn as HTMLElement).addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
      });
    }

    const copyBtn = this.element.querySelector('.vr-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.handleCopy());
      (copyBtn as HTMLElement).addEventListener('mouseenter', function() {
        this.style.background = 'rgba(76, 175, 80, 0.4)';
      });
      (copyBtn as HTMLElement).addEventListener('mouseleave', function() {
        this.style.background = 'rgba(76, 175, 80, 0.3)';
      });
      (copyBtn as HTMLElement).addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
      });
      (copyBtn as HTMLElement).addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
      });
    }

    this.currentYawEl = this.element.querySelector('.vr-current-yaw');
    this.resultEl = this.element.querySelector('.vr-calibration-result');
  }

  private startYawUpdate(): void {
    const update = () => {
      if (this.currentYawEl && !this.northYawValue) {
        const yaw = this.getCurrentYaw();
        this.currentYawEl.textContent = `${yaw.toFixed(1)}°`;
      }
      this.updateTimer = window.setTimeout(update, 100); // 每 100ms 更新一次
    };
    update();
  }

  private stopYawUpdate(): void {
    if (this.updateTimer !== null) {
      clearTimeout(this.updateTimer);
      this.updateTimer = null;
    }
  }

  private handleSetNorth(): void {
    const currentYaw = this.getCurrentYaw();
    this.northYawValue = currentYaw;

    // 显示结果区域
    if (this.resultEl) {
      this.resultEl.style.display = 'block';
    }

    // 更新复制目标文本
    const copyTarget = this.element.querySelector('.vr-copy-target');
    if (copyTarget) {
      // 提供两种格式：单独值和 JSON 片段
      const jsonValue = `"northYaw": ${currentYaw.toFixed(1)}`;
      copyTarget.textContent = jsonValue;
      copyTarget.setAttribute('data-copy-text', jsonValue);
    }

    // 停止实时更新 yaw 显示
    this.stopYawUpdate();
    if (this.currentYawEl) {
      this.currentYawEl.textContent = `${currentYaw.toFixed(1)}°`;
    }

    showToast(`已记录北向值: ${currentYaw.toFixed(1)}°`);
  }

  private async handleCopy(): Promise<void> {
    const copyTarget = this.element.querySelector('.vr-copy-target');
    if (!copyTarget) return;

    const textToCopy = copyTarget.getAttribute('data-copy-text') || copyTarget.textContent || '';
    const success = await copyText(textToCopy);
    if (success) {
      showToast('已复制到剪贴板');
      const copyBtn = this.element.querySelector('.vr-copy-btn');
      if (copyBtn) {
        const originalText = copyBtn.textContent;
        (copyBtn as HTMLElement).textContent = '✓ 已复制';
        setTimeout(() => {
          (copyBtn as HTMLElement).textContent = originalText;
        }, 2000);
      }
    } else {
      showToast('复制失败，请手动选择文本');
    }
  }

  close(): void {
    this.stopYawUpdate();
    if (this.handleOverlayClick) {
      this.overlay.removeEventListener('click', this.handleOverlayClick);
      this.handleOverlayClick = null;
    }
    if (this.handleKeyDown) {
      window.removeEventListener('keydown', this.handleKeyDown);
      this.handleKeyDown = null;
    }
    if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    if (this.onClose) {
      this.onClose();
    }
  }

  getElement(): HTMLElement {
    return this.overlay;
  }
}

