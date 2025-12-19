/**
 * 品牌水印组件
 * 固定在左下角，低对比度，可点击弹出团队介绍
 */

type BrandWatermarkOptions = {
  // 可扩展选项
};

export class BrandWatermark {
  private root: HTMLElement;
  private textEl: HTMLElement;
  private isModalOpen: boolean = false;
  private modalInstance: any = null; // TeamIntroModal 实例，延迟加载避免循环依赖

  constructor(options: BrandWatermarkOptions = {}) {
    this.root = document.createElement('div');
    this.root.className = 'vr-watermark';

    // 文字元素
    this.textEl = document.createElement('div');
    this.textEl.className = 'vr-watermark__text';
    this.textEl.textContent = '鼎虎清源';
    this.root.appendChild(this.textEl);

    // 点击事件
    this.textEl.addEventListener('click', () => this.handleClick());
    this.textEl.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      this.handleClick();
    });

    // 初始状态
    this.root.style.pointerEvents = 'none'; // 默认不拦截事件
    this.textEl.style.pointerEvents = 'auto'; // 只有文字区域可点击
  }

  /**
   * 挂载到父容器
   */
  mount(parent: HTMLElement): void {
    parent.appendChild(this.root);
  }

  /**
   * 处理点击事件
   */
  private handleClick(): void {
    if (this.isModalOpen) {
      return;
    }

    // 延迟加载 TeamIntroModal 避免循环依赖
    if (!this.modalInstance) {
      import('./TeamIntroModal').then((module) => {
        const TeamIntroModal = module.TeamIntroModal;
        this.modalInstance = new TeamIntroModal({
          onClose: () => {
            this.isModalOpen = false;
          },
        });
        this.modalInstance.mount(document.body);
        this.modalInstance.open();
        this.isModalOpen = true;
      });
    } else {
      this.modalInstance.open();
      this.isModalOpen = true;
    }
  }

  /**
   * 清理资源
   */
  dispose(): void {
    if (this.modalInstance) {
      this.modalInstance.dispose();
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
 * 工厂函数：创建品牌水印
 */
export function createBrandWatermark(options?: BrandWatermarkOptions): BrandWatermark {
  return new BrandWatermark(options);
}
