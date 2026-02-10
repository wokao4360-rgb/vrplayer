import type { Museum, Scene } from '../types/config';
import type { DollhouseScene } from '../viewer/dollhouseScene';
import { navigateToScene } from '../utils/router';

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
  private initToken = 0;
  private handleCanvasClick: ((e: MouseEvent) => void) | null = null;
  private handleCanvasMove: ((e: MouseEvent) => void) | null = null;

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

    this.container = document.createElement('div');
    this.container.className = 'vr-dollhouse-container';

    const body = document.createElement('div');
    body.className = 'vr-dollhouse-body';
    body.appendChild(this.container);

    this.element.appendChild(header);
    this.element.appendChild(body);

    void this.initDollhouseScene();
  }

  private teardownDollhouseScene(): void {
    if (!this.dollhouseScene) {
      return;
    }
    const canvas = this.dollhouseScene.getDomElement();
    if (this.handleCanvasClick) {
      canvas.removeEventListener('click', this.handleCanvasClick);
      this.handleCanvasClick = null;
    }
    if (this.handleCanvasMove) {
      canvas.removeEventListener('mousemove', this.handleCanvasMove);
      this.handleCanvasMove = null;
    }
    this.dollhouseScene.dispose();
    this.dollhouseScene = null;
  }

  private async initDollhouseScene(): Promise<void> {
    this.initToken += 1;
    const token = this.initToken;

    this.teardownDollhouseScene();

    const { DollhouseScene } = await import('../viewer/dollhouseScene');
    if (token !== this.initToken) {
      return;
    }

    const sceneInstance = new DollhouseScene(
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
      this.museum,
    );

    if (token !== this.initToken) {
      sceneInstance.dispose();
      return;
    }

    this.dollhouseScene = sceneInstance;

    const canvas = this.dollhouseScene.getDomElement();
    this.handleCanvasClick = (e: MouseEvent) => {
      this.dollhouseScene?.handleClick(e);
    };
    this.handleCanvasMove = (e: MouseEvent) => {
      this.dollhouseScene?.handleMouseMove(e);
    };
    canvas.addEventListener('click', this.handleCanvasClick);
    canvas.addEventListener('mousemove', this.handleCanvasMove);
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
      void this.initDollhouseScene();
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.initToken += 1;
    this.teardownDollhouseScene();
    this.element.remove();
  }
}
