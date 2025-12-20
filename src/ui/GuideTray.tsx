/**
 * 导览轻量预览条（框3）
 * 显示一行可横滑的小缩略图，左上角"更多"按钮，右上角"X"关闭按钮
 */

import type { Scene } from '../types/config';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';

type GuideTrayOptions = {
  museumId: string;
  currentSceneId: string;
  scenes: Scene[];
  onSceneClick?: (sceneId: string) => void;
  onMoreClick?: () => void;
  onClose?: () => void;
};

export class GuideTray {
  private element: HTMLElement;
  private scrollEl: HTMLElement;
  private museumId: string;
  private currentSceneId: string;
  private scenes: Scene[];
  private onSceneClick?: (sceneId: string) => void;
  private onMoreClick?: () => void;
  private onClose?: () => void;

  constructor(options: GuideTrayOptions) {
    this.museumId = options.museumId;
    this.currentSceneId = options.currentSceneId;
    this.scenes = options.scenes;
    this.onSceneClick = options.onSceneClick;
    this.onMoreClick = options.onMoreClick;
    this.onClose = options.onClose;

    this.element = document.createElement('div');
    this.element.className = 'vr-guidetray';

    // Header: 左上角"更多" + 右上角"X"
    const header = document.createElement('div');
    header.className = 'vr-guidetray-header';

    const moreBtn = document.createElement('button');
    moreBtn.className = 'vr-btn vr-guidetray-more';
    moreBtn.textContent = '更多';
    moreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.onMoreClick?.();
    });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-guidetray-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.onClose?.();
    });

    header.appendChild(moreBtn);
    header.appendChild(closeBtn);

    // 滚动容器
    this.scrollEl = document.createElement('div');
    this.scrollEl.className = 'vr-guidetray-scroll';

    this.element.appendChild(header);
    this.element.appendChild(this.scrollEl);

    this.render();
  }

  private render(): void {
    this.scrollEl.innerHTML = '';

    // 渲染场景缩略图
    this.scenes.forEach((scene) => {
      const item = document.createElement('div');
      item.className = 'vr-guidetray-item';
      item.setAttribute('data-scene-id', scene.id);
      if (scene.id === this.currentSceneId) {
        item.classList.add('is-current');
      }

      const thumb = document.createElement('img');
      thumb.className = 'vr-guidetray-item-thumb';
      const thumbUrl = scene.thumb ? resolveAssetUrl(scene.thumb, AssetType.THUMB) : undefined;
      if (thumbUrl) {
        thumb.src = thumbUrl;
      }
      thumb.alt = scene.name;

      const title = document.createElement('div');
      title.className = 'vr-guidetray-item-title';
      title.textContent = scene.name;

      item.appendChild(thumb);
      item.appendChild(title);

      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 框3点击直接切换场景
        if (this.onSceneClick) {
          this.onSceneClick(scene.id);
        }
      });

      this.scrollEl.appendChild(item);
    });

    // 最后一个item：+更多
    const moreItem = document.createElement('div');
    moreItem.className = 'vr-guidetray-item vr-guidetray-item-more';
    moreItem.innerHTML = `
      <div class="vr-guidetray-item-thumb vr-guidetray-more-icon">+</div>
      <div class="vr-guidetray-item-title">更多</div>
    `;
    moreItem.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.onMoreClick?.();
    });
    this.scrollEl.appendChild(moreItem);
  }

  updateCurrentScene(sceneId: string): void {
    this.currentSceneId = sceneId;
    this.scrollEl.querySelectorAll('.vr-guidetray-item').forEach((item) => {
      const el = item as HTMLElement;
      if (el.getAttribute('data-scene-id') === sceneId) {
        el.classList.add('is-current');
      } else {
        el.classList.remove('is-current');
      }
    });
  }

  setVisible(visible: boolean): void {
    this.element.classList.toggle('visible', visible);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}


