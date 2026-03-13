import type { Museum, Scene } from '../types/config';
import { navigateToScene } from '../utils/router';
import { AssetType, resolveAssetUrl } from '../utils/assetResolver';
import { resolveMuseumMarketing } from './discoveryContent';

export class SceneListPage {
  private element: HTMLElement;

  constructor(private readonly museum: Museum) {
    this.element = document.createElement('div');
    this.element.className = 'vr-discovery-page';
    this.render();
  }

  private renderSceneCard(scene: Scene, index: number): string {
    return `
      <article class="vr-scene-card vr-card-enter" style="--vr-card-index:${index}">
        <button class="vr-scene-card__button" type="button" data-scene-id="${scene.id}" aria-label="进入${scene.name}">
          <div class="vr-scene-card__media">
            <img src="${resolveAssetUrl(scene.thumb, AssetType.THUMB)}" alt="${scene.name}" loading="lazy" decoding="async">
            <div class="vr-scene-card__veil"></div>
            <span class="vr-scene-card__seal">场景点位</span>
          </div>
          <div class="vr-scene-card__body">
            <div class="vr-scene-card__eyebrow">实拍场景</div>
            <h2 class="vr-scene-card__name">${scene.name}</h2>
            <p class="vr-scene-card__hook">进入这一处空间，沿着真实拍摄视角继续向前漫游。</p>
            <div class="vr-scene-card__footer">
              <span>360° 实拍漫游</span>
              <span class="vr-scene-card__cta">进入场景</span>
            </div>
          </div>
        </button>
      </article>
    `;
  }

  private render(): void {
    const marketing = resolveMuseumMarketing(this.museum);

    this.element.innerHTML = `
      <div class="vr-discovery-shell vr-discovery-shell--scene-list">
        <section class="vr-scene-banner vr-page-enter">
          <div class="vr-scene-banner__copy">
            <div>
              <div class="vr-discovery-eyebrow">馆内目录</div>
              <h1 class="vr-scene-banner__title">${this.museum.name}</h1>
              <p class="vr-scene-banner__desc">${marketing.hook}</p>
            </div>
            <div>
              <div class="vr-discovery-tags">
                ${marketing.tags
                  .slice(0, 3)
                  .map((tag) => `<span class="vr-discovery-tag">${tag}</span>`)
                  .join('')}
              </div>
              ${
                this.museum.description
                  ? `<p class="vr-scene-banner__desc">${this.museum.description}</p>`
                  : ''
              }
            </div>
          </div>
          <div class="vr-scene-banner__media">
            <img src="${resolveAssetUrl(this.museum.cover, AssetType.COVER)}" alt="${this.museum.name}" loading="eager" decoding="async">
          </div>
        </section>

        <section class="vr-discovery-section">
          <div class="vr-discovery-section-head vr-page-enter">
            <div>
              <div class="vr-discovery-eyebrow">点位目录</div>
              <h2 class="vr-discovery-section-title">从一个门槛、一段回廊，走进展馆真正的空间顺序</h2>
            </div>
            <p class="vr-discovery-section-note">场景卡片会保留你熟悉的进入方式，但以更清楚的目录感呈现，先看清，再进入。</p>
          </div>
          <div class="vr-scene-grid">
            ${this.museum.scenes.map((scene, index) => this.renderSceneCard(scene, index)).join('')}
          </div>
        </section>
      </div>
    `;

    this.element.querySelectorAll<HTMLButtonElement>('.vr-scene-card__button').forEach((card) => {
      card.addEventListener('click', () => {
        const sceneId = card.getAttribute('data-scene-id');
        if (sceneId) {
          navigateToScene(this.museum.id, sceneId);
        }
      });
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
