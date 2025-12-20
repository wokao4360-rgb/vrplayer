import type { Museum, Scene } from '../types/config';
import { navigateToScene } from '../utils/router';
import { DollhouseScene } from '../viewer/dollhouseScene';

type Dollhouse3DPanelProps = {
  museum: Museum;
  scenes: Scene[];
  currentSceneId: string;
  onClose?: () => void;
};

export class Dollhouse3DPanel {
  private element: HTMLElement;
  private museum: Museum;
  private scenes: Scene[];
  private currentSceneId: string;
  private onClose?: () => void;
  private container: HTMLElement;
  private dollhouseScene: DollhouseScene | null = null;

  constructor(props: Dollhouse3DPanelProps) {
    this.museum = props.museum;
    this.scenes = props.scenes;
    this.currentSceneId = props.currentSceneId;
    this.onClose = props.onClose;

    this.element = document.createElement('div');
    this.element.className = 'vr-dollhouse-panel';

    this.render();
  }

  private render(): void {
    // Header
    const header = document.createElement('div');
    header.className = 'vr-dollhouse-header';

    const title = document.createElement('div');
    title.className = 'vr-dollhouse-title';
    title.textContent = '三维图';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-dollhouse-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      if (this.onClose) {
        this.onClose();
      }
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // 3D Container
    this.container = document.createElement('div');
    this.container.className = 'vr-dollhouse-container';

    // Body
    const body = document.createElement('div');
    body.className = 'vr-dollhouse-body';
    body.appendChild(this.container);

    // Assemble
    this.element.appendChild(header);
    this.element.appendChild(body);

    // 初始化 3D 场景
    this.initDollhouseScene();
  }

  private initDollhouseScene(): void {
    if (this.dollhouseScene) {
      this.dollhouseScene.dispose();
    }

    this.dollhouseScene = new DollhouseScene(
      this.container,
      this.museum.id,
      this.scenes,
      this.currentSceneId,
      (museumId, sceneId) => {
        navigateToScene(museumId, sceneId);
        if (this.onClose) {
          this.onClose();
        }
      },
      this.museum
    );

    // 绑定点击事件
    const canvas = this.dollhouseScene.getDomElement();
    canvas.addEventListener('click', (e) => {
      this.dollhouseScene?.handleClick(e);
    });

    // 绑定 hover 事件
    canvas.addEventListener('mousemove', (e) => {
      this.dollhouseScene?.handleMouseMove(e);
    });
  }

  updateCurrentScene(sceneId: string): void {
    this.currentSceneId = sceneId;
    if (this.dollhouseScene) {
      this.dollhouseScene.updateCurrentScene(sceneId);
    }
  }

  updateMuseum(museum: Museum, scenes: Scene[], currentSceneId: string): void {
    this.museum = museum;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    
    if (this.dollhouseScene) {
      this.dollhouseScene.updateScenes(scenes, currentSceneId);
    } else {
      this.initDollhouseScene();
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    if (this.dollhouseScene) {
      this.dollhouseScene.dispose();
      this.dollhouseScene = null;
    }
    this.element.remove();
  }
}







