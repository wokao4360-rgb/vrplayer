import type { Scene } from '../types/config';
import { navigateToScene } from '../utils/router';

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
            <div class="scene-item" data-scene-id="${scene.id}">
              <img src="${scene.thumb}" alt="${scene.name}" loading="lazy">
              <div class="scene-item-info">
                <h3>${scene.name}</h3>
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
        background: #fff;
        border-radius: 20px 20px 0 0;
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
        padding: 20px;
        border-bottom: 1px solid #eee;
      }
      .scene-list-header h2 {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin: 0;
      }
      .scene-list-close {
        width: 32px;
        height: 32px;
        border: none;
        background: #f5f5f5;
        border-radius: 50%;
        font-size: 24px;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      .scene-list-items {
        overflow-y: auto;
        padding: 10px;
        flex: 1;
      }
      .scene-item {
        display: flex;
        align-items: center;
        padding: 12px;
        margin-bottom: 10px;
        background: #f9f9f9;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
      }
      .scene-item:active {
        background: #eee;
      }
      .scene-item img {
        width: 80px;
        height: 45px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 12px;
      }
      .scene-item-info h3 {
        font-size: 16px;
        color: #333;
        margin: 0;
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
























