import { TeamIntroModal } from './TeamIntroModal';

type BrandMarkOptions = {
  appName?: string;
  brandText?: string;
};

export class BrandMark {
  private element: HTMLElement;
  private teamModal: TeamIntroModal;

  constructor(options: BrandMarkOptions = {}) {
    this.teamModal = new TeamIntroModal({});

    this.element = document.createElement('div');
    this.element.className = 'vr-brandmark';
    this.element.textContent = options.brandText || '鼎虎清源';

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.teamModal.open();
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getTeamModal(): TeamIntroModal {
    return this.teamModal;
  }

  remove(): void {
    this.element.remove();
    this.teamModal.dispose();
  }
}
