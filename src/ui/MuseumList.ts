import type { Museum } from '../types/config';
import { navigateToSceneList } from '../utils/router';

export class MuseumList {
  private element: HTMLElement;
  private museums: Museum[];

  constructor(museums: Museum[]) {
    this.museums = museums;
    this.element = document.createElement('div');
    this.element.className = 'museum-list';
    this.render();
    this.applyStyles();
  }

  private render(): void {
    const activeMuseums = this.museums.filter(m => m.id === 'wangding');
    const buildingMuseums = this.museums.filter(m => m.id !== 'wangding');

    this.element.innerHTML = `
      <div class="museum-list-container">
        <h1 class="museum-list-title">王鼎纪念馆</h1>
        <p class="museum-list-subtitle">以王鼎生平为主线的红色研学展馆</p>
        <div class="museum-grid">
          ${activeMuseums.map(museum => `
            <div class="museum-card museum-card-active" data-museum-id="${museum.id}">
              <div class="museum-cover">
                <img src="${museum.cover}" alt="${museum.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${museum.name}</h2>
                  ${museum.description ? `<p class="museum-desc">${museum.description}</p>` : ''}
                  <p class="museum-scene-count">${museum.scenes.length} 个场景</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        ${buildingMuseums.length > 0 ? `
        <div class="museum-grid muted">
          ${buildingMuseums.map(museum => `
            <div class="museum-card museum-card-disabled">
              <div class="museum-cover">
                <img src="${museum.cover}" alt="${museum.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${museum.name}</h2>
                  <p class="museum-desc">建设中，敬请期待</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>
    `;

    // 绑定点击事件
    this.element.querySelectorAll('.museum-card-active').forEach(card => {
      card.addEventListener('click', () => {
        const museumId = card.getAttribute('data-museum-id');
        if (museumId) {
          navigateToSceneList(museumId);
        }
      });
    });
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .museum-list {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding-top: calc(44px + env(safe-area-inset-top, 0px));
      }
      .museum-list-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .museum-list-title {
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
      }
      .museum-list-subtitle {
        font-size: 16px;
        color: rgba(255,255,255,0.9);
        text-align: center;
        margin-top: -12px;
        margin-bottom: 24px;
      }
      .museum-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .museum-grid.muted {
        opacity: 0.7;
      }
      .museum-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .museum-card-disabled {
        cursor: not-allowed;
        filter: grayscale(0.3);
      }
      .museum-card:active {
        transform: scale(0.98);
      }
      .museum-card-disabled:active {
        transform: none;
      }
      .museum-cover {
        position: relative;
        width: 100%;
        padding-top: 60%;
        overflow: hidden;
      }
      .museum-cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .museum-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 20px;
        color: #fff;
      }
      .museum-name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .museum-desc {
        font-size: 14px;
        margin: 6px 0;
        line-height: 1.5;
      }
      .museum-scene-count {
        font-size: 14px;
        opacity: 0.9;
      }
    `;
    document.head.appendChild(style);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}












