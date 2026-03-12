/**
 * StructureView2D - 全屏 2D 结构图 / 平面图覆盖层
 * - floorplan 模式：统一读取 museum.map.nodes / museum.map.paths，可选叠加底图
 * - graph 模式：读取 sceneGraph，展示热点或 floorplan 兜底后的结构关系
 */

import type { Museum } from '../types/config';
import type { SceneGraph } from '../graph/sceneGraph';
import { forceLayout2D, shouldUseAutoLayout } from '../graph/autoLayout';
import { hasFloorplanData, resolveFloorplan } from '../floorplan/floorplanAdapter';
import { renderFloorplanSvg } from '../floorplan/renderFloorplanSvg';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';

type StructureView2DOptions = {
  museum: Museum;
  graph: SceneGraph;
  currentSceneId: string;
  onClose?: () => void;
  onNodeClick?: (museumId: string, sceneId: string) => void;
};

type ViewMode = 'floorplan' | 'graph';

export class StructureView2D {
  private element: HTMLElement;
  private canvasContainer: HTMLElement;
  private svg: SVGSVGElement;
  private floorplanImg: HTMLImageElement | null = null;
  private statusEl: HTMLElement | null = null;
  private toggleBtn: HTMLButtonElement | null = null;
  private museum: Museum;
  private graph: SceneGraph;
  private currentSceneId: string;
  private onClose?: () => void;
  private onNodeClick?: (museumId: string, sceneId: string) => void;
  private layout: Record<string, { x: number; y: number }> = {};
  private mode: ViewMode = 'graph';
  private hasFloorplan = false;

  constructor(options: StructureView2DOptions) {
    this.museum = options.museum;
    this.graph = options.graph;
    this.currentSceneId = options.currentSceneId;
    this.onClose = options.onClose;
    this.onNodeClick = options.onNodeClick;

    this.hasFloorplan = hasFloorplanData(this.museum);
    this.mode = this.hasFloorplan ? 'floorplan' : 'graph';

    this.element = document.createElement('div');
    this.element.className = 'vr-structure2d-overlay';

    this.render();
    this.bindEvents();
  }

  private render(): void {
    const header = document.createElement('div');
    header.className = 'vr-structure2d-header';

    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'vr-structure2d-header-main';

    const title = document.createElement('div');
    title.className = 'vr-structure2d-title';
    title.textContent = '结构图';

    this.statusEl = document.createElement('div');
    this.statusEl.className = 'vr-structure2d-status';

    titleWrapper.appendChild(title);
    titleWrapper.appendChild(this.statusEl);

    const actions = document.createElement('div');
    actions.className = 'vr-structure2d-header-actions';

    this.toggleBtn = document.createElement('button');
    this.toggleBtn.className = 'vr-btn vr-structure2d-toggle';
    this.toggleBtn.addEventListener('click', () => {
      if (!this.hasFloorplan) {
        return;
      }
      this.mode = this.mode === 'floorplan' ? 'graph' : 'floorplan';
      this.syncHeaderState();
      this.renderContent();
    });
    actions.appendChild(this.toggleBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-structure2d-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      this.close();
    });
    actions.appendChild(closeBtn);

    header.appendChild(titleWrapper);
    header.appendChild(actions);

    this.canvasContainer = document.createElement('div');
    this.canvasContainer.className = 'vr-structure2d-canvas';

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('class', 'vr-structure2d-svg');
    this.canvasContainer.appendChild(this.svg);

    this.element.appendChild(header);
    this.element.appendChild(this.canvasContainer);

    this.computeLayout();
    this.syncFloorplanImage();
    this.syncHeaderState();
    this.renderContent();
  }

  private syncHeaderState(): void {
    if (this.statusEl) {
      const nodeCount =
        this.mode === 'floorplan'
          ? resolveFloorplan(this.museum).renderNodes.length
          : this.graph.nodes.length;
      this.statusEl.textContent = `mode: ${this.mode}, nodes: ${nodeCount}`;
    }

    if (this.toggleBtn) {
      this.toggleBtn.style.display = this.hasFloorplan ? '' : 'none';
      this.toggleBtn.textContent = this.mode === 'floorplan' ? '结构图' : '平面图';
    }
  }

  private syncFloorplanImage(): void {
    if (this.floorplanImg) {
      this.floorplanImg.remove();
      this.floorplanImg = null;
    }

    if (!this.museum.map?.image) {
      return;
    }

    const imageUrl = resolveAssetUrl(this.museum.map.image, AssetType.MAP);
    if (!imageUrl) {
      return;
    }

    this.floorplanImg = document.createElement('img');
    this.floorplanImg.className = 'vr-structure2d-floorplan';
    this.floorplanImg.src = imageUrl;
    this.floorplanImg.alt = `${this.museum.name} 平面图`;
    this.canvasContainer.insertBefore(this.floorplanImg, this.svg);
  }

  private renderContent(): void {
    if (this.mode === 'floorplan') {
      this.renderFloorplan();
    } else {
      this.renderGraph();
    }
  }

  private computeLayout(): void {
    const mapWidth = this.museum.map?.width || 1000;
    const mapHeight = this.museum.map?.height || 600;
    const useAutoLayout = shouldUseAutoLayout(this.graph.nodes);

    if (useAutoLayout) {
      this.layout = forceLayout2D(this.graph.nodes, this.graph.edges, {
        width: mapWidth,
        height: mapHeight,
        iterations: 300,
        padding: 40,
      });
      return;
    }

    this.layout = {};
    for (const node of this.graph.nodes) {
      if (!node.mapPoint) continue;
      this.layout[node.id] = {
        x: node.mapPoint.x,
        y: node.mapPoint.y,
      };
    }
  }

  private renderFloorplan(): void {
    const floorplan = resolveFloorplan(this.museum);

    this.svg.style.position = 'absolute';
    this.svg.style.inset = '0';
    this.svg.style.display = 'block';
    this.svg.style.pointerEvents = 'auto';

    if (this.floorplanImg) {
      this.floorplanImg.style.display = 'block';
    }

    renderFloorplanSvg(this.svg, floorplan, {
      currentSceneId: this.currentSceneId,
      onSceneClick: (sceneId) => {
        this.onNodeClick?.(this.museum.id, sceneId);
      },
    });
  }

  private renderGraph(): void {
    if (this.floorplanImg) {
      this.floorplanImg.style.display = 'none';
    }

    this.svg.style.position = '';
    this.svg.style.display = 'block';
    this.svg.style.pointerEvents = 'auto';
    this.svg.innerHTML = '';

    const mapWidth = this.museum.map?.width || 1000;
    const mapHeight = this.museum.map?.height || 600;
    this.svg.setAttribute('viewBox', `0 0 ${mapWidth} ${mapHeight}`);
    this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    edgesGroup.setAttribute('class', 'vr-structure2d-edges');

    for (const edge of this.graph.edges) {
      const fromPos = this.layout[edge.from];
      const toPos = this.layout[edge.to];
      if (!fromPos || !toPos) continue;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', fromPos.x.toString());
      line.setAttribute('y1', fromPos.y.toString());
      line.setAttribute('x2', toPos.x.toString());
      line.setAttribute('y2', toPos.y.toString());
      line.setAttribute('class', 'vr-structure2d-edge');
      edgesGroup.appendChild(line);
    }

    this.svg.appendChild(edgesGroup);

    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodesGroup.setAttribute('class', 'vr-structure2d-nodes');

    for (const node of this.graph.nodes) {
      const pos = this.layout[node.id];
      if (!pos) continue;

      const isCurrent = node.id === this.currentSceneId;
      const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeGroup.setAttribute('class', `vr-structure2d-node ${isCurrent ? 'is-current' : ''}`);
      nodeGroup.setAttribute('data-scene-id', node.id);
      nodeGroup.style.cursor = 'pointer';

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x.toString());
      circle.setAttribute('cy', pos.y.toString());
      circle.setAttribute('r', isCurrent ? '12' : '8');
      circle.setAttribute('class', 'vr-structure2d-node-circle');

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', pos.x.toString());
      text.setAttribute('y', (pos.y + (isCurrent ? 25 : 20)).toString());
      text.setAttribute('class', 'vr-structure2d-node-label');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = node.name;

      nodeGroup.appendChild(circle);
      nodeGroup.appendChild(text);
      nodeGroup.addEventListener('click', () => {
        this.onNodeClick?.(this.museum.id, node.id);
      });

      nodesGroup.appendChild(nodeGroup);
    }

    this.svg.appendChild(nodesGroup);
  }

  private bindEvents(): void {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    this.element.addEventListener('vr:cleanup', () => {
      document.removeEventListener('keydown', handleKeyDown);
    });
  }

  updateContext(opts: {
    museum: Museum;
    graph: SceneGraph;
    currentSceneId: string;
  }): void {
    this.museum = opts.museum;
    this.graph = opts.graph;
    this.currentSceneId = opts.currentSceneId;
    this.hasFloorplan = hasFloorplanData(this.museum);
    if (!this.hasFloorplan) {
      this.mode = 'graph';
    }

    this.computeLayout();
    this.syncFloorplanImage();
    this.syncHeaderState();
    this.renderContent();
  }

  open(): void {
    this.element.classList.add('is-visible');
  }

  close(): void {
    this.element.classList.remove('is-visible');
    this.onClose?.();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}
