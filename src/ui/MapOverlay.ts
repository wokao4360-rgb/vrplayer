import type { MapConfig, Museum, Scene } from '../types/config';
import { hasFloorplanData, resolveFloorplan } from '../floorplan/floorplanAdapter';
import { renderFloorplanSvg } from '../floorplan/renderFloorplanSvg';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
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

  private getMuseumSnapshot(): Museum {
    return {
      id: this.museumId,
      name: '',
      cover: '',
      map: this.mapConfig,
      scenes: this.scenes,
    };
  }

  private render(): void {
    const museum = this.getMuseumSnapshot();
    const floorplan = resolveFloorplan(museum);
    const scaleX = Math.min(1, window.innerWidth / floorplan.width);
    const scaleY = Math.min(1, (window.innerHeight * 0.8) / floorplan.height);
    const scale = Math.min(scaleX, scaleY);
    const displayWidth = floorplan.width * scale;
    const displayHeight = floorplan.height * scale;

    this.element.innerHTML = `
      <div class="map-overlay-backdrop"></div>
      <div class="map-overlay-content">
        <div class="map-overlay-header">
          <h3>地图导航</h3>
          <button class="map-overlay-close">×</button>
        </div>
        <div class="map-container" style="width: ${displayWidth}px; height: ${displayHeight}px;"></div>
      </div>
    `;

    const container = this.element.querySelector('.map-container') as HTMLElement | null;
    if (container) {
      container.style.aspectRatio = `${floorplan.width} / ${floorplan.height}`;

      if (floorplan.image) {
        const imageUrl = resolveAssetUrl(floorplan.image, AssetType.MAP);
        if (imageUrl) {
          const image = document.createElement('img');
          image.src = imageUrl;
          image.alt = '地图';
          image.className = 'map-image';
          container.appendChild(image);
        }
      }

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'map-svg');

      if (hasFloorplanData(museum)) {
        renderFloorplanSvg(svg, floorplan, {
          currentSceneId: this.currentSceneId,
          onSceneClick: (sceneId) => {
            if (sceneId !== this.currentSceneId) {
              navigateToScene(this.museumId, sceneId);
            }
            this.close();
          },
        });
      } else {
        svg.innerHTML =
          '<text x="50%" y="50%" text-anchor="middle" class="map-empty-text">此展馆暂未提供平面图</text>';
      }

      container.appendChild(svg);
    }

    const backdrop = this.element.querySelector('.map-overlay-backdrop');
    const closeBtn = this.element.querySelector('.map-overlay-close');

    backdrop?.addEventListener('click', () => this.close());
    closeBtn?.addEventListener('click', () => this.close());
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
        inset: 0;
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
        border-radius: 8px;
        overflow: hidden;
        background: linear-gradient(180deg, #f5f5f5, #e8ecef);
      }
      .map-image,
      .map-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .map-image {
        object-fit: contain;
      }
      .map-empty-text {
        fill: rgba(31, 42, 55, 0.7);
        font-size: 24px;
        font-weight: 600;
      }
      .map-svg .vr-floorplan-path {
        stroke: rgba(31, 42, 55, 0.45);
      }
      .map-svg .vr-floorplan-node-dot {
        fill: rgba(47, 95, 174, 0.9);
        stroke: rgba(255, 255, 255, 0.95);
      }
      .map-svg .vr-floorplan-node.is-disabled .vr-floorplan-node-dot {
        fill: rgba(148, 163, 184, 0.85);
      }
      .map-svg .vr-floorplan-node-label {
        fill: rgba(17, 24, 39, 0.95);
        stroke: rgba(255, 255, 255, 0.9);
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
      this.close();
      this.render();
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
