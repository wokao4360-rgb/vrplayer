type InfoModalOptions = {
  title?: string;
  text?: string;
  onClose?: () => void;
};

export class InfoModal {
  private element: HTMLElement;
  private isOpen = false;
  private options: InfoModalOptions;

  constructor(options: InfoModalOptions) {
    this.options = options;

    const root = document.createElement('div');
    root.className = 'vr-modal vr-modal--info';

    const mask = document.createElement('div');
    mask.className = 'vr-modal-mask';
    mask.addEventListener('click', () => this.handleClose());

    const card = document.createElement('div');
    card.className = 'vr-modal-card vr-modal-card--info';
    card.addEventListener('click', (e) => e.stopPropagation());

    const header = document.createElement('div');
    header.className = 'vr-modal-header';

    const titleEl = document.createElement('div');
    titleEl.className = 'vr-modal-title';
    titleEl.textContent = options.title || '详情';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-modal-close-icon';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.handleClose());

    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.className = 'vr-modal-body vr-modal-body--info';
    body.textContent = options.text || '未配置内容';

    card.appendChild(header);
    card.appendChild(body);

    root.appendChild(mask);
    root.appendChild(card);

    this.element = root;
  }

  private handleClose(): void {
    this.close();
    this.options.onClose?.();
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.element.classList.add('open');
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.element.classList.remove('open');
  }

  getElement(): HTMLElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}




