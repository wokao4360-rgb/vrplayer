import { TeamIntroModal } from './TeamIntroModal';

type BrandMarkOptions = {
  appName?: string;
  brandText?: string;
};

export class BrandMark {
  private element: HTMLElement;
  private teamIntroModal: TeamIntroModal;

  constructor(options: BrandMarkOptions = {}) {
    this.teamIntroModal = new TeamIntroModal({});

    this.element = document.createElement('div');
    this.element.className = 'vr-brandmark';
    this.element.textContent = options.brandText || '鼎虎清源';

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.teamIntroModal.open();
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getAboutModal(): TeamIntroModal {
    // 保持兼容性：main.ts 中调用了 getAboutModal()
    return this.teamIntroModal;
  }

  remove(): void {
    this.element.remove();
    this.teamIntroModal.dispose();
  }
}
