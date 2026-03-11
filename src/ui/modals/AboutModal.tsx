type AboutModalOptions = {
  appName?: string;
  brandText?: string;
};

export class AboutModal {
  private element: HTMLElement;
  private isOpen = false;

  constructor(options: AboutModalOptions = {}) {
    this.element = document.createElement('div');
    this.element.className = 'vr-modal';

    const mask = document.createElement('div');
    mask.className = 'vr-modal-mask';

    const card = document.createElement('div');
    card.className = 'vr-modal-card';

    const title = document.createElement('div');
    title.className = 'vr-modal-title';
    const brandText = options.brandText || options.appName || 'VR 全景导览';
    title.textContent = brandText;

    const desc = document.createElement('div');
    desc.className = 'vr-modal-desc';
    desc.innerHTML = `
      <div>欢迎体验 ${options.appName ? `<b>${options.appName}</b>` : 'VR 全景导览'}。</div>
      <div style="margin-top:8px;">本站面向多展馆全景参观，支持场景切换、热点跳转、结构视图与移动端沉浸式浏览。</div>
    `;

    const actions = document.createElement('div');
    actions.className = 'vr-modal-actions';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-modal-close';
    closeBtn.textContent = '知道了';
    closeBtn.addEventListener('click', () => this.close());

    actions.appendChild(closeBtn);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(actions);

    mask.addEventListener('click', () => this.close());
    card.addEventListener('click', (e) => e.stopPropagation());

    this.element.appendChild(mask);
    this.element.appendChild(card);
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

  toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
