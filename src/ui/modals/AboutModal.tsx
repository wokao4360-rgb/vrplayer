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
    title.textContent = options.brandText || '鼎虎清源';

    const desc = document.createElement('div');
    desc.className = 'vr-modal-desc';
    desc.innerHTML = `
      <div>欢迎体验 ${options.appName ? `<b>${options.appName}</b>` : 'VR 全景导览'}。</div>
      <div style="margin-top:8px;">这是一个多展馆/多场景的 360° 全景演示播放器：支持场景传送（热点/导览）、地图入口（后续扩展位），并对移动端手势做了适配。</div>
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
