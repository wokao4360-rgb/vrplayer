/**
 * 团队介绍弹窗组件
 * 半透明玻璃态弹窗，显示团队信息
 */

type TeamIntroModalOptions = {
  onClose?: () => void;
};

export class TeamIntroModal {
  private root: HTMLElement;
  private backdrop: HTMLElement;
  private card: HTMLElement;
  private closeBtn: HTMLElement;
  private isOpen: boolean = false;
  private onCloseCallback?: () => void;
  private escapeHandler?: (e: KeyboardEvent) => void;

  constructor(options: TeamIntroModalOptions = {}) {
    this.onCloseCallback = options.onClose;

    // 根容器
    this.root = document.createElement('div');
    this.root.className = 'vr-teammodal';

    // 遮罩层
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'vr-teammodal-backdrop';
    this.backdrop.addEventListener('click', () => this.close());
    this.root.appendChild(this.backdrop);

    // 卡片容器
    this.card = document.createElement('div');
    this.card.className = 'vr-teammodal-card';

    // 关闭按钮
    this.closeBtn = document.createElement('button');
    this.closeBtn.className = 'vr-teammodal-close';
    this.closeBtn.innerHTML = '×';
    this.closeBtn.setAttribute('aria-label', '关闭');
    this.closeBtn.addEventListener('click', () => this.close());
    this.closeBtn.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      this.close();
    });

    // 标题
    const title = document.createElement('div');
    title.className = 'vr-teammodal-title';
    title.textContent = '鼎虎清源';

    // 副标题
    const subtitle = document.createElement('div');
    subtitle.className = 'vr-teammodal-subtitle';
    subtitle.textContent = 'VR 研学项目';

    // 内容区域
    const content = document.createElement('div');
    content.className = 'vr-teammodal-content';

    // 简介段落
    const intro1 = document.createElement('p');
    intro1.className = 'vr-teammodal-text';
    intro1.textContent = '致力于打造沉浸式虚拟现实研学体验，让学习更生动、更直观。';

    const intro2 = document.createElement('p');
    intro2.className = 'vr-teammodal-text';
    intro2.textContent = '通过 360° 全景技术，为师生提供身临其境的探索之旅。';

    const intro3 = document.createElement('p');
    intro3.className = 'vr-teammodal-text';
    intro3.textContent = '融合创新科技与教育理念，开启数字化学习新篇章。';

    // 版权/联系方式
    const footer = document.createElement('div');
    footer.className = 'vr-teammodal-footer';
    footer.textContent = '© 2024 鼎虎清源 | 联系方式待补充';

    // 组装内容
    content.appendChild(intro1);
    content.appendChild(intro2);
    content.appendChild(intro3);

    // 组装卡片
    const header = document.createElement('div');
    header.className = 'vr-teammodal-header';
    header.appendChild(title);
    header.appendChild(this.closeBtn);

    this.card.appendChild(header);
    this.card.appendChild(subtitle);
    this.card.appendChild(content);
    this.card.appendChild(footer);

    this.root.appendChild(this.card);

    // ESC 键处理
    this.escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };
    window.addEventListener('keydown', this.escapeHandler);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.pointerEvents = 'none';
  }

  /**
   * 挂载到父容器
   */
  mount(parent: HTMLElement): void {
    parent.appendChild(this.root);
  }

  /**
   * 打开弹窗
   */
  open(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.root.style.pointerEvents = 'auto';
    
    // 触发动画
    requestAnimationFrame(() => {
      this.root.classList.add('open');
    });
  }

  /**
   * 关闭弹窗
   */
  close(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.root.classList.remove('open');
    
    // 动画结束后禁用 pointer-events
    setTimeout(() => {
      if (!this.isOpen) {
        this.root.style.pointerEvents = 'none';
      }
    }, 250);

    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
  }

  /**
   * 清理资源
   */
  dispose(): void {
    if (this.escapeHandler) {
      window.removeEventListener('keydown', this.escapeHandler);
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
 * 工厂函数：创建团队介绍弹窗
 */
export function createTeamIntroModal(options?: TeamIntroModalOptions): TeamIntroModal {
  return new TeamIntroModal(options);
}
