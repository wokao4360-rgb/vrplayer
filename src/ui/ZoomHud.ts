/**
 * 缩放百分比 HUD 组件
 * 在屏幕正中心显示当前缩放百分比，淡入淡出
 */

class ZoomHud {
  private element: HTMLElement | null = null;
  private textEl: HTMLElement | null = null;
  private hideTimer: number | null = null;

  private ensure(): void {
    if (this.element) return;

    this.element = document.createElement('div');
    this.element.className = 'vr-zoom-hud';

    this.textEl = document.createElement('div');
    this.textEl.className = 'vr-zoom-hud__text';
    this.textEl.textContent = '缩放 100%';

    this.element.appendChild(this.textEl);
    document.body.appendChild(this.element);
  }

  show(percent: number): void {
    this.ensure();
    if (!this.element || !this.textEl) return;

    // 清除旧的 timer
    if (this.hideTimer !== null) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    // 更新文本
    this.textEl.textContent = `缩放 ${percent}%`;

    // 显示（添加 is-on class 触发淡入）
    this.element.classList.add('is-on');

    // 设置自动隐藏 timer（0.6s 显示后开始淡出）
    this.hideTimer = window.setTimeout(() => {
      this.hide();
    }, 600);
  }

  hide(): void {
    if (this.hideTimer !== null) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.element) {
      this.element.classList.remove('is-on');
    }
  }

  static instance: ZoomHud | null = null;

  static ensure(): ZoomHud {
    if (!ZoomHud.instance) {
      ZoomHud.instance = new ZoomHud();
    }
    return ZoomHud.instance;
  }

  static show(percent: number): void {
    ZoomHud.ensure().show(percent);
  }

  static hide(): void {
    if (ZoomHud.instance) {
      ZoomHud.instance.hide();
    }
  }
}

export { ZoomHud };

