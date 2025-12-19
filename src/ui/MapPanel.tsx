import type { Museum, Scene } from '../types/config';
import { navigateToScene } from '../utils/router';

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
  private mapImage: HTMLImageElement;
  private pointsContainer: HTMLElement;

  constructor(props: MapPanelProps) {
    this.museum = props.museum;
    this.scenes = props.scenes;
    this.currentSceneId = props.currentSceneId;
    this.onClose = props.onClose;

    this.element = document.createElement('div');
    this.element.className = 'vr-map-panel';

    this.render();
  }

  private render(): void {
    // Header
    const header = document.createElement('div');
    header.className = 'vr-map-header';

    const title = document.createElement('div');
    title.className = 'vr-map-title';
    title.textContent = '平面图';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-map-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      if (this.onClose) {
        this.onClose();
      }
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Map container
    this.mapContainer = document.createElement('div');
    this.mapContainer.className = 'vr-map-container';

    // Map image
    this.mapImage = document.createElement('img');
    this.mapImage.className = 'vr-map-image';
    this.mapImage.src = this.museum.map.image;
    this.mapImage.alt = `${this.museum.name} 平面图`;
    this.mapImage.style.width = '100%';
    this.mapImage.style.height = 'auto';
    this.mapImage.style.display = 'block';

    // Points container (absolute positioned overlay)
    this.pointsContainer = document.createElement('div');
    this.pointsContainer.className = 'vr-map-points';

    this.mapContainer.appendChild(this.mapImage);
    this.mapContainer.appendChild(this.pointsContainer);

    // Body
    const body = document.createElement('div');
    body.className = 'vr-map-body';
    body.appendChild(this.mapContainer);

    // Assemble
    this.element.appendChild(header);
    this.element.appendChild(body);

    // Wait for image load to render points
    this.mapImage.addEventListener('load', () => {
      this.renderPoints();
    });

    // If image already loaded
    if (this.mapImage.complete) {
      this.renderPoints();
    }
  }

  private renderPoints(): void {
    // Clear existing points
    this.pointsContainer.innerHTML = '';

    if (!this.mapImage.complete || !this.mapContainer.offsetWidth) {
      // Retry after a short delay if image not loaded yet
      setTimeout(() => this.renderPoints(), 100);
      return;
    }

    const mapWidth = this.museum.map.width;
    const mapHeight = this.museum.map.height;
    const displayWidth = this.mapContainer.offsetWidth;
    const displayHeight = (displayWidth * mapHeight) / mapWidth;

    // Set container height to match image aspect ratio
    this.mapContainer.style.height = `${displayHeight}px`;

    // Scale factor
    const scaleX = displayWidth / mapWidth;
    const scaleY = displayHeight / mapHeight;

    // Render each scene point
    this.scenes.forEach((scene) => {
      if (!scene.mapPoint) return;

      const point = document.createElement('button');
      point.className = 'vr-btn vr-map-point';
      point.setAttribute('data-scene-id', scene.id);
      point.setAttribute('aria-label', scene.name);

      const isCurrent = scene.id === this.currentSceneId;
      if (isCurrent) {
        point.classList.add('vr-map-point--current');
      }

      // Position (mapPoint coordinates are relative to map image dimensions)
      const x = scene.mapPoint.x * scaleX;
      const y = scene.mapPoint.y * scaleY;

      point.style.left = `${x}px`;
      point.style.top = `${y}px`;

      // Point marker
      const marker = document.createElement('div');
      marker.className = 'vr-map-point-marker';
      point.appendChild(marker);

      // Tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'vr-map-point-tooltip';
      tooltip.textContent = scene.name;
      point.appendChild(tooltip);

      // Click handler
      point.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToScene(this.museum.id, scene.id);
        if (this.onClose) {
          this.onClose();
        }
      });

      this.pointsContainer.appendChild(point);
    });
  }

  updateCurrentScene(sceneId: string): void {
    this.currentSceneId = sceneId;
    // Re-render points to update highlight
    this.renderPoints();
  }

  updateMuseum(museum: Museum, scenes: Scene[], currentSceneId: string): void {
    this.museum = museum;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    // Update image source
    this.mapImage.src = museum.map.image;
    // Re-render points
    this.renderPoints();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
