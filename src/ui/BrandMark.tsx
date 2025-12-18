import { AboutModal } from './modals/AboutModal';

type BrandMarkOptions = {
  appName?: string;
  brandText?: string;
};

export class BrandMark {
  private element: HTMLElement;
  private aboutModal: AboutModal;

  constructor(options: BrandMarkOptions = {}) {
    this.aboutModal = new AboutModal({
      appName: options.appName,
      brandText: options.brandText || '鼎虎清源',
    });

    this.element = document.createElement('div');
    this.element.className = 'vr-brandmark';
    this.element.textContent = options.brandText || '鼎虎清源';

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.aboutModal.open();
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getAboutModal(): AboutModal {
    return this.aboutModal;
  }

  remove(): void {
    this.element.remove();
    this.aboutModal.remove();
  }
}
