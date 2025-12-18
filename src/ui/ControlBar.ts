import { SceneList } from './SceneList';
import { MapOverlay } from './MapOverlay';
import type { Museum, Scene } from '../types/config';

export class ControlBar {
  private element: HTMLElement;
  private sceneList: SceneList;
  private mapOverlay: MapOverlay;
  private videoPlayer: any; // 避免循环依赖，使用 any

  constructor(museum: Museum, currentScene: Scene, videoPlayer: any) {
    this.videoPlayer = videoPlayer;
    this.sceneList = new SceneList(museum.id, museum.scenes);
    this.mapOverlay = new MapOverlay(museum.id, museum.map, museum.scenes, currentScene.id);
    
    this.element = document.createElement('div');
    this.element.className = 'control-bar';
    this.render();
    this.applyStyles();
  }

  private render(): void {
    this.element.innerHTML = `
      <button class="control-btn scene-list-btn" title="场景列表">
        <span>📋</span>
      </button>
      <button class="control-btn map-btn" title="地图">
        <span>🗺️</span>
      </button>
    `;

    const sceneListBtn = this.element.querySelector('.scene-list-btn');
    const mapBtn = this.element.querySelector('.map-btn');

    sceneListBtn?.addEventListener('click', () => {
      this.sceneList.toggle();
    });

    mapBtn?.addEventListener('click', () => {
      this.mapOverlay.toggle();
    });
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .control-bar {
        position: fixed;
        bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        left: 20px;
        z-index: 1500;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .control-btn {
        width: 56px;
        height: 56px;
        border: none;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        border-radius: 50%;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, background 0.2s;
      }
      .control-btn:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.8);
      }
      .control-btn span {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  getSceneList(): SceneList {
    return this.sceneList;
  }

  getMapOverlay(): MapOverlay {
    return this.mapOverlay;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
    this.sceneList.remove();
    this.mapOverlay.remove();
  }
}
























