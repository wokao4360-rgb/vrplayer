export class TitleBar {
  private element: HTMLElement;

  constructor(title: string) {
    this.element = document.createElement('div');
    this.element.className = 'title-bar';
    this.element.innerHTML = `
      <div class="title-bar-content">
        <span class="title-text">${title}</span>
      </div>
    `;
    this.applyStyles();
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .title-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        padding-top: env(safe-area-inset-top, 0px);
        height: calc(44px + env(safe-area-inset-top, 0px));
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .title-bar-content {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 60px;
      }
      .title-text {
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
    document.head.appendChild(style);
  }

  setTitle(title: string): void {
    const titleText = this.element.querySelector('.title-text');
    if (titleText) {
      titleText.textContent = title;
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
























