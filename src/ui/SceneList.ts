import type { Scene } from '../types/config';
import { navigateToScene } from '../utils/router';
import { AssetType, resolveAssetUrl } from '../utils/assetResolver';

export class SceneList {
  private element: HTMLElement;
  private scenes: Scene[];
  private museumId: string;
  private isOpen = false;

  constructor(museumId: string, scenes: Scene[]) {
    this.museumId = museumId;
    this.scenes = scenes;
    this.element = document.createElement('div');
    this.element.className = 'scene-list-drawer';
    this.render();
    this.applyStyles();
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="scene-list-overlay"></div>
      <div class="scene-list-content">
        <div class="scene-list-header">
          <h2>场景列表</h2>
          <button class="scene-list-close">×</button>
        </div>
        <div class="scene-list-items">
          ${this.scenes.map(scene => `
            <div class="scene-item vr-scene-drawer-item" data-scene-id="${scene.id}">
              <img src="${resolveAssetUrl(scene.thumb, AssetType.THUMB)}" alt="${scene.name}" loading="lazy">
              <div class="scene-item-info vr-scene-drawer-item__info">
                <div class="vr-scene-drawer-item__label">场景点位</div>
                <h3 class="vr-scene-drawer-item__title">${scene.name}</h3>
                <p class="vr-scene-drawer-item__hint">点击进入当前展馆的实拍场景</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // 绑定事件
    const overlay = this.element.querySelector('.scene-list-overlay');
    const closeBtn = this.element.querySelector('.scene-list-close');
    
    overlay?.addEventListener('click', () => this.close());
    closeBtn?.addEventListener('click', () => this.close());

    this.element.querySelectorAll('.scene-item').forEach(item => {
      item.addEventListener('click', () => {
        const sceneId = item.getAttribute('data-scene-id');
        if (sceneId) {
          navigateToScene(this.museumId, sceneId);
          this.close();
        }
      });
    });
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .scene-list-drawer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .scene-list-drawer.open {
        pointer-events: all;
        opacity: 1;
      }
      .scene-list-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }
      .scene-list-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(180deg, rgba(253,249,240,0.98), rgba(246,238,225,0.98));
        border-radius: 28px 28px 0 0;
        border: 1px solid rgba(120, 90, 56, 0.16);
        box-shadow: 0 -18px 44px rgba(55, 38, 24, 0.16);
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        transform: translateY(100%);
        transition: transform 0.3s;
      }
      .scene-list-drawer.open .scene-list-content {
        transform: translateY(0);
      }
      .scene-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 18px 16px;
        border-bottom: 1px solid rgba(120, 90, 56, 0.12);
      }
      .scene-list-header h2 {
        font-size: 18px;
        font-weight: 700;
        color: #241913;
        margin: 0;
      }
      .scene-list-close {
        width: 32px;
        height: 32px;
        border: none;
        background: rgba(140, 43, 31, 0.08);
        border-radius: 50%;
        font-size: 22px;
        color: #6d271e;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      .scene-list-items {
        overflow-y: auto;
        padding: 12px;
        flex: 1;
      }
      .scene-item {
        cursor: pointer;
      }
      .scene-item:active {
        transform: translateY(-1px) scale(0.99);
      }
      .scene-item img {
        margin-right: 0;
      }
    `;
    document.head.appendChild(style);
  }

  open(): void {
    this.isOpen = true;
    this.element.classList.add('open');
  }

  close(): void {
    this.isOpen = false;
    this.element.classList.remove('open');
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
























