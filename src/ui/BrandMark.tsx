import { TeamIntroModal } from './TeamIntroModal';

type BrandMarkOptions = {
  appName?: string;
  brandText?: string;
};

export class BrandMark {
  private element: HTMLElement;
  private teamIntroModal: TeamIntroModal;

  constructor(options: BrandMarkOptions = {}) {
    const brandText = options.brandText || options.appName || 'VR 全景导览';
    this.teamIntroModal = new TeamIntroModal({
      appName: options.appName,
      brandText,
    });

    this.element = document.createElement('div');
    this.element.className = 'vr-brandmark';
    this.element.textContent = brandText;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getAboutModal(): TeamIntroModal {
    return this.teamIntroModal;
  }

  remove(): void {
    this.element.remove();
    this.teamIntroModal.dispose();
  }
}
