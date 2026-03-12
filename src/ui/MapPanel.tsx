import type { Museum, Scene } from '../types/config';
import { hasFloorplanData, resolveFloorplan } from '../floorplan/floorplanAdapter';
import { renderFloorplanSvg } from '../floorplan/renderFloorplanSvg';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
import { navigateToScene } from '../utils/router';
import { emitSceneFocus, onSceneFocus, type SceneFocusEvent } from './sceneLinkBus';

type MapPanelProps = {
  museum: Museum;
  scenes: Scene[];
  currentSceneId: string;
  onClose?: () => void;
};

export class MapPanel {
  private element: HTMLElement;
  private museum: Museum;
  private scenes: Scene[];
  private currentSceneId: string;
  private onClose?: () => void;
  private mapContainer: HTMLElement;
  private stateEl: HTMLElement | null = null;
  private unsubscribeFocus: (() => void) | null = null;

  constructor(props: MapPanelProps) {
    this.museum = props.museum;
    this.scenes = props.scenes;
    this.currentSceneId = props.currentSceneId;
    this.onClose = props.onClose;

    this.element = document.createElement('div');
    this.element.className = 'vr-map-panel';

    this.render();
  }

  private getMuseumSnapshot(): Museum {
    return {
      ...this.museum,
      scenes: this.scenes,
    };
  }

  private render(): void {
    const header = document.createElement('div');
    header.className = 'vr-map-header';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'vr-map-title-wrap';

    const title = document.createElement('div');
    title.className = 'vr-map-title';
    title.textContent = '平面图';

    this.stateEl = document.createElement('div');
    this.stateEl.className = 'vr-map-state';

    titleWrap.appendChild(title);
    titleWrap.appendChild(this.stateEl);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-map-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      this.onClose?.();
    });

    header.appendChild(titleWrap);
    header.appendChild(closeBtn);

    this.mapContainer = document.createElement('div');
    this.mapContainer.className = 'vr-map-container';

    const body = document.createElement('div');
    body.className = 'vr-map-body';
    body.appendChild(this.mapContainer);

    this.element.appendChild(header);
    this.element.appendChild(body);

    this.renderMap();

    this.unsubscribeFocus = onSceneFocus((event) => {
      this.handleSceneFocus(event);
    });
  }

  private handleSceneFocus(event: SceneFocusEvent): void {
    if (event.type !== 'focus' || event.source === 'map' || !event.sceneId) {
      return;
    }

    const target = this.mapContainer.querySelector(
      `[data-scene-id="${event.sceneId}"]`,
    ) as HTMLElement | null;

    if (target) {
      target.classList.add('vr-map-point--focus-flash');
      window.setTimeout(() => {
        target.classList.remove('vr-map-point--focus-flash');
      }, 300);
    }
  }

  private updateStateText(): void {
    if (!this.stateEl) {
      return;
    }

    const museum = this.getMuseumSnapshot();
    if (!hasFloorplanData(museum)) {
      this.stateEl.textContent = '暂无平面图数据';
      return;
    }

    const floorplan = resolveFloorplan(museum);
    const readyCount = floorplan.renderNodes.filter((node) => node.interactive).length;
    const disabledCount = floorplan.renderNodes.filter((node) => !node.interactive).length;
    this.stateEl.textContent = disabledCount > 0
      ? `可进入 ${readyCount} 个点位，待补 ${disabledCount} 个点位`
      : `当前开放 ${readyCount} 个点位`;
  }

  private renderMap(): void {
    const museum = this.getMuseumSnapshot();
    this.mapContainer.innerHTML = '';

    if (!hasFloorplanData(museum)) {
      this.mapContainer.classList.add('is-empty');
      this.mapContainer.innerHTML = '<div class="vr-map-empty">此展馆暂未提供平面图</div>';
      this.updateStateText();
      return;
    }

    this.mapContainer.classList.remove('is-empty');

    const floorplan = resolveFloorplan(museum);
    this.mapContainer.style.aspectRatio = `${floorplan.width} / ${floorplan.height}`;

    if (floorplan.image) {
      const imageUrl = resolveAssetUrl(floorplan.image, AssetType.MAP);
      if (imageUrl) {
        const image = document.createElement('img');
        image.className = 'vr-map-image';
        image.src = imageUrl;
        image.alt = `${museum.name} 平面图`;
        this.mapContainer.appendChild(image);
      }
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'vr-map-svg');

    renderFloorplanSvg(svg, floorplan, {
      currentSceneId: this.currentSceneId,
      onSceneClick: (sceneId) => {
        emitSceneFocus({
          type: 'focus',
          museumId: museum.id,
          sceneId,
          source: 'map',
          ts: Date.now(),
        });
        navigateToScene(museum.id, sceneId);
        this.onClose?.();
      },
      onSceneHover: (sceneId) => {
        emitSceneFocus({
          type: 'hover',
          museumId: museum.id,
          sceneId,
          source: 'map',
          ts: Date.now(),
        });
      },
    });

    this.mapContainer.appendChild(svg);
    this.updateStateText();
  }

  updateCurrentScene(sceneId: string): void {
    this.currentSceneId = sceneId;
    this.renderMap();
  }

  updateMuseum(museum: Museum, scenes: Scene[], currentSceneId: string): void {
    this.museum = museum;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    this.renderMap();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    if (this.unsubscribeFocus) {
      this.unsubscribeFocus();
      this.unsubscribeFocus = null;
    }
    this.element.remove();
  }
}
