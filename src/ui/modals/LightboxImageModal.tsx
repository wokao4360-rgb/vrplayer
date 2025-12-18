type LightboxImageModalOptions = {
  src?: string;
  title?: string;
  onClose?: () => void;
};

export class LightboxImageModal {
  private element: HTMLElement;
  private isOpen = false;
  private options: LightboxImageModalOptions;

  constructor(options: LightboxImageModalOptions) {
    this.options = options;

    const root = document.createElement('div');
    root.className = 'vr-modal vr-modal--media vr-modal--image';

    const mask = document.createElement('div');
    mask.className = 'vr-modal-mask';
    mask.addEventListener('click', () => this.handleClose());

    const card = document.createElement('div');
    card.className = 'vr-modal-card vr-modal-card--media vr-modal-card--image';
    card.addEventListener('click', (e) => e.stopPropagation());

    const header = document.createElement('div');
    header.className = 'vr-modal-header';

    const titleEl = document.createElement('div');
    titleEl.className = 'vr-modal-title';
    titleEl.textContent = options.title || '图片预览';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-modal-close-icon';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.handleClose());

    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.className = 'vr-modal-body vr-modal-body--image';

    const img = document.createElement('img');
    img.className = 'vr-modal-image';
    if (options.src) {
      img.src = options.src;
    }
    img.alt = options.title || '热点图片';
    img.loading = 'lazy';

    body.appendChild(img);

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




