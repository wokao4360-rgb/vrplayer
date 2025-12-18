import type { MapConfig, Scene } from '../types/config';
import { navigateToScene } from '../utils/router';

export class MapOverlay {
  private element: HTMLElement;
  private mapConfig: MapConfig;
  private scenes: Scene[];
  private museumId: string;
  private currentSceneId: string;
  private isOpen = false;

  constructor(museumId: string, mapConfig: MapConfig, scenes: Scene[], currentSceneId: string) {
    this.museumId = museumId;
    this.mapConfig = mapConfig;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    this.element = document.createElement('div');
    this.element.className = 'map-overlay';
    this.render();
    this.applyStyles();
  }

  private render(): void {
    const scaleX = Math.min(1, window.innerWidth / this.mapConfig.width);
    const scaleY = Math.min(1, (window.innerHeight * 0.8) / this.mapConfig.height);
    const scale = Math.min(scaleX, scaleY);
    const displayWidth = this.mapConfig.width * scale;
    const displayHeight = this.mapConfig.height * scale;

    this.element.innerHTML = `
      <div class="map-overlay-backdrop"></div>
      <div class="map-overlay-content">
        <div class="map-overlay-header">
          <h3>地图导航</h3>
          <button class="map-overlay-close">×</button>
        </div>
        <div class="map-container" style="width: ${displayWidth}px; height: ${displayHeight}px;">
          <img src="${this.mapConfig.image}" alt="地图" class="map-image">
          <div class="map-points">
            ${this.scenes.map(scene => {
              const x = (scene.mapPoint.x / this.mapConfig.width) * 100;
              const y = (scene.mapPoint.y / this.mapConfig.height) * 100;
              const isCurrent = scene.id === this.currentSceneId;
              return `
                <div 
                  class="map-point ${isCurrent ? 'current' : ''}" 
                  data-scene-id="${scene.id}"
                  style="left: ${x}%; top: ${y}%;"
                  title="${scene.name}"
                >
                  <div class="map-point-dot"></div>
                  ${isCurrent ? '<div class="map-point-pulse"></div>' : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // 绑定事件
    const backdrop = this.element.querySelector('.map-overlay-backdrop');
    const closeBtn = this.element.querySelector('.map-overlay-close');
    
    backdrop?.addEventListener('click', () => this.close());
    closeBtn?.addEventListener('click', () => this.close());

    this.element.querySelectorAll('.map-point').forEach(point => {
      point.addEventListener('click', (e) => {
        e.stopPropagation();
        const sceneId = point.getAttribute('data-scene-id');
        if (sceneId && sceneId !== this.currentSceneId) {
          navigateToScene(this.museumId, sceneId);
          this.close();
        }
      });
    });
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .map-overlay {
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
      .map-overlay.open {
        pointer-events: all;
        opacity: 1;
      }
      .map-overlay-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }
      .map-overlay-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 12px;
        padding: 20px;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
      }
      .map-overlay-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      .map-overlay-header h3 {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin: 0;
      }
      .map-overlay-close {
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
      .map-container {
        position: relative;
        margin: 0 auto;
      }
      .map-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
      }
      .map-points {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .map-point {
        position: absolute;
        transform: translate(-50%, -50%);
        cursor: pointer;
        z-index: 10;
      }
      .map-point-dot {
        width: 16px;
        height: 16px;
        background: #4A90E2;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }
      .map-point:active .map-point-dot {
        transform: scale(0.9);
      }
      .map-point.current .map-point-dot {
        background: #FF6B6B;
        width: 20px;
        height: 20px;
      }
      .map-point-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background: #FF6B6B;
        border-radius: 50%;
        animation: pulse 2s infinite;
        opacity: 0.6;
      }
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
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
























