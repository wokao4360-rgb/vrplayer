import { LightboxImageModal } from './LightboxImageModal';
import { InfoModal } from './InfoModal';
import { VideoModal } from './VideoModal';

export type VrModalType = 'image' | 'info' | 'video';

export type VrImageModalPayload = {
  src?: string;
  title?: string;
};

export type VrInfoModalPayload = {
  title?: string;
  text?: string;
};

export type VrVideoModalPayload = {
  src?: string;
  poster?: string;
  title?: string;
};

export type VrOpenModalDetail =
  | { type: 'image'; payload: VrImageModalPayload }
  | { type: 'info'; payload: VrInfoModalPayload }
  | { type: 'video'; payload: VrVideoModalPayload };

const OPEN_EVENT = 'vr:open-modal';
const CLOSE_EVENT = 'vr:close-modal';

export function openVrModal(detail: VrOpenModalDetail): void {
  window.dispatchEvent(new CustomEvent<VrOpenModalDetail>(OPEN_EVENT, { detail }));
}

export function closeVrModal(): void {
  window.dispatchEvent(new CustomEvent(CLOSE_EVENT));
}

interface ModalInstance {
  open(): void;
  close(): void;
  destroy(): void;
  getElement(): HTMLElement;
}

class ModalHost {
  private rootEl: HTMLElement;
  private current: ModalInstance | null = null;
  private handleKeyDownBound: (e: KeyboardEvent) => void;

  constructor(rootEl: HTMLElement) {
    this.rootEl = rootEl;
    this.handleKeyDownBound = (e: KeyboardEvent) => this.handleKeyDown(e);

    window.addEventListener(OPEN_EVENT, (e) => {
      const evt = e as CustomEvent<VrOpenModalDetail>;
      this.handleOpen(evt.detail);
    });
    window.addEventListener(CLOSE_EVENT, () => this.close());
    window.addEventListener('keydown', this.handleKeyDownBound);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  private handleOpen(detail: VrOpenModalDetail): void {
    this.close();

    let instance: ModalInstance | null = null;

    if (detail.type === 'image') {
      instance = new LightboxImageModal({
        src: detail.payload.src,
        title: detail.payload.title,
        onClose: () => closeVrModal(),
      });
    } else if (detail.type === 'info') {
      instance = new InfoModal({
        title: detail.payload.title,
        text: detail.payload.text,
        onClose: () => closeVrModal(),
      });
    } else if (detail.type === 'video') {
      instance = new VideoModal({
        src: detail.payload.src,
        poster: detail.payload.poster,
        title: detail.payload.title,
        onClose: () => closeVrModal(),
      });
    }

    if (!instance) return;

    this.current = instance;
    this.rootEl.innerHTML = '';
    this.rootEl.appendChild(instance.getElement());
    instance.open();
  }

  close(): void {
    if (!this.current) return;
    this.current.close();
    this.current.destroy();
    this.current = null;
    this.rootEl.innerHTML = '';
  }
}

let hostInstance: ModalHost | null = null;

export function ensureModalHost(): void {
  if (hostInstance) return;

  let root = document.getElementById('vr-modal-root') as HTMLElement | null;
  if (!root) {
    root = document.createElement('div');
    root.id = 'vr-modal-root';
    document.body.appendChild(root);
  }

  hostInstance = new ModalHost(root);
}




