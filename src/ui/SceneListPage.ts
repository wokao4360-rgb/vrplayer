import type { Museum } from '../types/config';
import { navigateToScene } from '../utils/router';

let styleInjected = false;

export class SceneListPage {
  private element: HTMLElement;

  constructor(private readonly museum: Museum) {
    this.element = document.createElement('div');
    this.element.className = 'scene-list-page';
    this.render();
    this.applyStyles();
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="scene-list-container">
        <h1 class="scene-list-title">${this.museum.name} - 场景列表</h1>
        ${this.museum.description ? `<p class="scene-list-desc">${this.museum.description}</p>` : ''}
        <div class="scene-grid">
          ${this.museum.scenes
            .map(
              (scene) => `
            <div class="scene-card" data-scene-id="${scene.id}">
              <div class="scene-cover">
                <img src="${scene.thumb}" alt="${scene.name}" loading="lazy">
                <div class="scene-overlay">
                  <h2 class="scene-name">${scene.name}</h2>
                </div>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    `;

    this.element.querySelectorAll('.scene-card').forEach((card) => {
      card.addEventListener('click', () => {
        const sceneId = card.getAttribute('data-scene-id');
        if (sceneId) {
          navigateToScene(this.museum.id, sceneId);
        }
      });
    });
  }

  private applyStyles(): void {
    if (styleInjected) return;
    styleInjected = true;

    const style = document.createElement('style');
    style.textContent = `
      .scene-list-page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding-top: calc(44px + env(safe-area-inset-top, 0px));
      }
      .scene-list-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .scene-list-title {
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
      }
      .scene-list-desc {
        max-width: 820px;
        margin: -12px auto 26px;
        color: rgba(255, 255, 255, 0.92);
        font-size: 15px;
        line-height: 1.6;
        text-align: center;
      }
      .scene-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
      .scene-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }
      .scene-card:active {
        transform: scale(0.98);
      }
      .scene-cover {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        overflow: hidden;
      }
      .scene-cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .scene-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        padding: 15px;
        color: #fff;
      }
      .scene-name {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
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
