type VideoModalOptions = {
  src?: string;
  poster?: string;
  title?: string;
  onClose?: () => void;
};

export class VideoModal {
  private element: HTMLElement;
  private isOpen = false;
  private videoEl: HTMLVideoElement;
  private options: VideoModalOptions;

  constructor(options: VideoModalOptions) {
    this.options = options;

    const root = document.createElement('div');
    root.className = 'vr-modal vr-modal--media vr-modal--video';

    const mask = document.createElement('div');
    mask.className = 'vr-modal-mask';
    mask.addEventListener('click', () => this.handleClose());

    const card = document.createElement('div');
    card.className = 'vr-modal-card vr-modal-card--media vr-modal-card--video';
    card.addEventListener('click', (e) => e.stopPropagation());

    const header = document.createElement('div');
    header.className = 'vr-modal-header';

    const titleEl = document.createElement('div');
    titleEl.className = 'vr-modal-title';
    titleEl.textContent = options.title || '视频';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-modal-close-icon';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.handleClose());

    header.appendChild(titleEl);
    header.appendChild(closeBtn);

    const body = document.createElement('div');
    body.className = 'vr-modal-body vr-modal-body--video';

    const video = document.createElement('video');
    video.className = 'vr-modal-video';
    if (options.src) {
      video.src = options.src;
    }
    if (options.poster) {
      video.poster = options.poster;
    }
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';

    this.videoEl = video;

    body.appendChild(video);

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
    // 关闭时停止播放
    try {
      this.videoEl.pause();
      this.videoEl.currentTime = 0;
      this.videoEl.removeAttribute('src');
      this.videoEl.load();
    } catch {
      // ignore
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  destroy(): void {
    this.close();
    this.element.remove();
  }
}


