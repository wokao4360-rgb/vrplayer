/**
 * 调试面板
 * 在 ?debug=1 模式下显示，用于查看相机参数和复制热点 JSON
 */

export class DebugPanel {
  private element: HTMLElement;
  private isVisible = false;
  private currentYaw = 0;
  private currentPitch = 0;
  private currentFov = 75;
  private clickX = 0;
  private clickY = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'debug-panel';
    this.element.style.display = 'none';
    this.render();
    this.applyStyles();
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="debug-panel-content">
        <div class="debug-panel-header">
          <h3>🔧 调试信息</h3>
          <button class="debug-close-btn" id="debug-close-btn">×</button>
        </div>
        <div class="debug-info">
          <div class="debug-item">
            <span class="debug-label">Yaw:</span>
            <span class="debug-value" id="debug-yaw">0</span>°
          </div>
          <div class="debug-item">
            <span class="debug-label">Pitch:</span>
            <span class="debug-value" id="debug-pitch">0</span>°
          </div>
          <div class="debug-item">
            <span class="debug-label">FOV:</span>
            <span class="debug-value" id="debug-fov">75</span>°
          </div>
        </div>
        <div class="debug-actions">
          <button class="debug-btn" id="debug-copy-btn">📋 复制热点 JSON</button>
        </div>
      </div>
    `;

    // 绑定关闭按钮
    const closeBtn = this.element.querySelector('#debug-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hide();
      });
    }

    // 绑定复制按钮
    const copyBtn = this.element.querySelector('#debug-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        this.copyHotspotJSON();
      });
    }
  }

  /**
   * 显示调试面板
   * @param x 点击位置的 X 坐标
   * @param y 点击位置的 Y 坐标
   * @param yaw 当前 yaw 角度
   * @param pitch 当前 pitch 角度
   * @param fov 当前 fov 角度
   */
  show(x: number, y: number, yaw: number, pitch: number, fov: number): void {
    this.clickX = x;
    this.clickY = y;
    this.currentYaw = yaw;
    this.currentPitch = pitch;
    this.currentFov = fov;

    // 更新显示的值
    const yawEl = this.element.querySelector('#debug-yaw');
    const pitchEl = this.element.querySelector('#debug-pitch');
    const fovEl = this.element.querySelector('#debug-fov');
    
    if (yawEl) yawEl.textContent = yaw.toFixed(1);
    if (pitchEl) pitchEl.textContent = pitch.toFixed(1);
    if (fovEl) fovEl.textContent = fov.toFixed(1);

    // 计算面板位置（确保不超出屏幕）
    const panelWidth = 280;
    const panelHeight = 200;
    const padding = 20;
    
    let left = x - panelWidth / 2;
    let top = y - panelHeight / 2;
    
    // 限制在屏幕内
    left = Math.max(padding, Math.min(left, window.innerWidth - panelWidth - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - panelHeight - padding));

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.element.style.display = 'block';
    this.isVisible = true;
  }

  /**
   * 隐藏调试面板
   */
  hide(): void {
    this.element.style.display = 'none';
    this.isVisible = false;
  }

  /**
   * 更新相机参数（实时更新）
   */
  updateView(yaw: number, pitch: number, fov: number): void {
    this.currentYaw = yaw;
    this.currentPitch = pitch;
    this.currentFov = fov;

    if (this.isVisible) {
      const yawEl = this.element.querySelector('#debug-yaw');
      const pitchEl = this.element.querySelector('#debug-pitch');
      const fovEl = this.element.querySelector('#debug-fov');
      
      if (yawEl) yawEl.textContent = yaw.toFixed(1);
      if (pitchEl) pitchEl.textContent = pitch.toFixed(1);
      if (fovEl) fovEl.textContent = fov.toFixed(1);
    }
  }

  /**
   * 复制热点 JSON 到剪贴板
   */
  private async copyHotspotJSON(): Promise<void> {
    // 生成热点 JSON
    const hotspotJSON = {
      id: `hs_${Date.now()}`,
      yaw: Math.round(this.currentYaw * 10) / 10,
      pitch: Math.round(this.currentPitch * 10) / 10,
      type: 'scene',
      targetSceneId: '',
      label: '热点'
    };

    const jsonString = JSON.stringify(hotspotJSON, null, 2);

    try {
      await navigator.clipboard.writeText(jsonString);
      this.showToast('✅ 已复制到剪贴板');
    } catch (error) {
      // 降级方案：使用传统方法
      const textarea = document.createElement('textarea');
      textarea.value = jsonString;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        this.showToast('✅ 已复制到剪贴板');
      } catch (err) {
        this.showToast('❌ 复制失败，请手动复制');
      }
      document.body.removeChild(textarea);
    }
  }

  /**
   * 显示提示消息
   */
  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.className = 'debug-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .debug-panel {
        position: fixed;
        z-index: 10001;
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #4a90e2;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        min-width: 280px;
        max-width: 90vw;
      }
      .debug-panel-content {
        padding: 16px;
      }
      .debug-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
      }
      .debug-panel-header h3 {
        margin: 0;
        font-size: 18px;
        color: #4a90e2;
      }
      .debug-close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s;
      }
      .debug-close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .debug-info {
        margin-bottom: 16px;
      }
      .debug-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #222;
      }
      .debug-item:last-child {
        border-bottom: none;
      }
      .debug-label {
        color: #999;
        font-size: 14px;
      }
      .debug-value {
        color: #4a90e2;
        font-weight: 600;
        font-family: 'Courier New', monospace;
      }
      .debug-actions {
        display: flex;
        gap: 8px;
      }
      .debug-btn {
        flex: 1;
        padding: 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;
        font-family: inherit;
      }
      .debug-btn:hover {
        background: #357abd;
      }
      .debug-btn:active {
        transform: scale(0.98);
      }
      .debug-toast {
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10002;
        opacity: 0;
        transition: all 0.3s;
        pointer-events: none;
      }
      .debug-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}





















