import type { AppConfig, Museum } from '../types/config';
import { navigateToMuseum } from '../utils/router';
import { AssetType, resolveAssetUrl } from '../utils/assetResolver';
import { resolveLandingContent, resolveMuseumMarketing } from './discoveryContent';

export class MuseumList {
  private element: HTMLElement;

  constructor(private readonly config: AppConfig) {
    this.element = document.createElement('div');
    this.element.className = 'vr-discovery-page';
    this.render();
    this.markReady();
  }

  private renderMuseumCard(museum: Museum, index: number): string {
    const marketing = resolveMuseumMarketing(museum);
    const coverUrl = resolveAssetUrl(museum.cover, AssetType.COVER);

    return `
      <article class="vr-museum-card vr-card-enter" style="--vr-card-index:${index}">
        <button
          class="vr-museum-card__button"
          type="button"
          data-museum-id="${museum.id}"
          aria-label="进入${museum.name}"
        >
          <div class="vr-museum-card__media">
            <img src="${coverUrl}" alt="${museum.name}" loading="lazy" decoding="async">
            <div class="vr-museum-card__veil"></div>
            <span class="vr-museum-card__seal">纪念馆</span>
          </div>
          <div class="vr-museum-card__body">
            <div class="vr-museum-card__eyebrow">沉浸研学</div>
            <h2 class="vr-museum-card__name">${museum.name}</h2>
            <p class="vr-museum-card__hook">${marketing.hook}</p>
            <div class="vr-discovery-tags">
              ${marketing.tags
                .slice(0, 3)
                .map((tag) => `<span class="vr-discovery-tag">${tag}</span>`)
                .join('')}
            </div>
            <div class="vr-museum-card__footer">
              <span>${museum.scenes.length} 个场景</span>
              <span class="vr-museum-card__cta">进入封面页</span>
            </div>
          </div>
        </button>
      </article>
    `;
  }

  private render(): void {
    const activeMuseums = this.config.museums.filter((museum) => museum.scenes.length > 0);
    const landing = resolveLandingContent(this.config);

    this.element.innerHTML = `
      <div class="vr-discovery-shell">
        <section class="vr-discovery-hero vr-page-enter">
          <div class="vr-discovery-brand">${landing.brandTitle}</div>
          <h1 class="vr-discovery-hero-title">${landing.heroTitle}</h1>
          <p class="vr-discovery-hero-subtitle">${landing.heroSubtitle}</p>
        </section>

        <section class="vr-discovery-section">
          <div class="vr-discovery-section-head vr-page-enter">
            <div>
              <div class="vr-discovery-eyebrow">馆藏入口</div>
              <h2 class="vr-discovery-section-title">从一张门票感，走进一段正在发生的历史</h2>
            </div>
            <p class="vr-discovery-section-note">
              这里不是开发态的点位列表，而是面向研学的沉浸式入口。先选一座馆，再沿着空间与故事进入现场。
            </p>
          </div>

          <div class="vr-museum-grid">
            ${activeMuseums.map((museum, index) => this.renderMuseumCard(museum, index)).join('')}
          </div>
        </section>

        <section class="vr-discovery-note-card vr-page-enter">
          ${landing.projectNote}
        </section>
      </div>
    `;

    this.element.querySelectorAll<HTMLButtonElement>('.vr-museum-card__button').forEach((card) => {
      card.addEventListener('click', () => {
        const museumId = card.getAttribute('data-museum-id');
        if (museumId) {
          navigateToMuseum(museumId);
        }
      });
    });
  }

  private markReady(): void {
    requestAnimationFrame(() => {
      this.element.classList.add('is-ready');
    });
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
