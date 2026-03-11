import { ensureModalHost } from './modals/ModalHost';

type TeamIntroModalOptions = {
  appName?: string;
  brandText?: string;
  onClose?: () => void;
};

export class TeamIntroModal {
  private root: HTMLElement;
  private backdrop: HTMLElement;
  private card: HTMLElement;
  private closeBtn: HTMLButtonElement;
  private isOpen = false;
  private readonly onCloseCallback?: () => void;
  private readonly escapeHandler: (event: KeyboardEvent) => void;
  private readonly appName: string;
  private readonly brandText: string;

  constructor(options: TeamIntroModalOptions = {}) {
    this.onCloseCallback = options.onClose;
    this.appName = options.appName || 'VR 全景导览';
    this.brandText = options.brandText || this.appName;

    this.root = document.createElement('div');
    this.root.className = 'vr-teammodal';

    this.backdrop = document.createElement('div');
    this.backdrop.className = 'vr-teammodal-backdrop';
    this.backdrop.addEventListener('click', () => this.close());
    this.root.appendChild(this.backdrop);

    this.card = document.createElement('div');
    this.card.className = 'vr-teammodal-card';

    this.closeBtn = document.createElement('button');
    this.closeBtn.className = 'vr-teammodal-close';
    this.closeBtn.type = 'button';
    this.closeBtn.innerHTML = '&times;';
    this.closeBtn.setAttribute('aria-label', '关闭');
    this.closeBtn.addEventListener('click', () => this.close());

    const title = document.createElement('div');
    title.className = 'vr-teammodal-title';
    title.textContent = this.brandText;

    const subtitle = document.createElement('div');
    subtitle.className = 'vr-teammodal-subtitle';
    subtitle.textContent = '全景导览项目';

    const content = document.createElement('div');
    content.className = 'vr-teammodal-content';

    [
      `${this.appName} 通过多展馆、多场景的 360° 全景内容，帮助观众在线完成导览、预习和回顾。`,
      '当前站点支持场景切换、热点跳转、结构视图与移动端沉浸式浏览；讲解内容请以现场展陈和馆方信息为准。',
    ].forEach((text) => {
      const paragraph = document.createElement('p');
      paragraph.className = 'vr-teammodal-text';
      paragraph.textContent = text;
      content.appendChild(paragraph);
    });

    const footer = document.createElement('div');
    footer.className = 'vr-teammodal-footer';
    footer.textContent = `© 2026 ${this.brandText}`;

    const header = document.createElement('div');
    header.className = 'vr-teammodal-header';
    header.appendChild(title);
    header.appendChild(this.closeBtn);

    this.card.appendChild(header);
    this.card.appendChild(subtitle);
    this.card.appendChild(content);
    this.card.appendChild(footer);
    this.root.appendChild(this.card);

    this.escapeHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };
    window.addEventListener('keydown', this.escapeHandler);
  }

  private getModalRoot(): HTMLElement {
    let root = document.getElementById('vr-modal-root');
    if (!root) {
      ensureModalHost();
      root = document.getElementById('vr-modal-root');
      if (!root) {
        throw new Error('vr-modal-root missing, please call ensureModalHost() first');
      }
    }
    return root;
  }

  mount(parent: HTMLElement): void {
    if (this.root.parentNode !== parent) {
      if (this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
      parent.appendChild(this.root);
    }
  }

  open(): void {
    if (this.isOpen) {
      return;
    }

    const modalRoot = this.getModalRoot();
    if (this.root.parentNode !== modalRoot) {
      if (this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
      modalRoot.appendChild(this.root);
    }

    this.isOpen = true;
    requestAnimationFrame(() => {
      this.root.classList.add('open');
    });
  }

  close(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.root.classList.remove('open');
    if (this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
    this.onCloseCallback?.();
  }

  dispose(): void {
    window.removeEventListener('keydown', this.escapeHandler);
    if (this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }

  getElement(): HTMLElement {
    return this.root;
  }
}

export function createTeamIntroModal(options?: TeamIntroModalOptions): TeamIntroModal {
  return new TeamIntroModal(options);
}
