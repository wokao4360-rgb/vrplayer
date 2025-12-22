/**
 * StructureView2D - 全屏2D结构图Overlay
 * 显示场景图（节点=scene，边=scene热点跳转）
 */

import type { Museum, Scene } from '../types/config';
import type { SceneGraph, SceneGraphNode } from '../graph/sceneGraph';
import { forceLayout2D, shouldUseAutoLayout } from '../graph/autoLayout';
import { navigateToScene } from '../utils/router';

type StructureView2DOptions = {
  museum: Museum;
  graph: SceneGraph;
  currentSceneId: string;
  onClose?: () => void;
  onNodeClick?: (museumId: string, sceneId: string) => void;
};

export class StructureView2D {
  private element: HTMLElement;
  private svg: SVGSVGElement;
  private museum: Museum;
  private graph: SceneGraph;
  private currentSceneId: string;
  private onClose?: () => void;
  private onNodeClick?: (museumId: string, sceneId: string) => void;
  private layout: Record<string, { x: number; y: number }> = {};

  constructor(options: StructureView2DOptions) {
    this.museum = options.museum;
    this.graph = options.graph;
    this.currentSceneId = options.currentSceneId;
    this.onClose = options.onClose;
    this.onNodeClick = options.onNodeClick;

    this.element = document.createElement('div');
    this.element.className = 'vr-structure2d-overlay';

    this.render();
    this.bindEvents();
  }

  private render(): void {
    // Header
    const header = document.createElement('div');
    header.className = 'vr-structure2d-header';

    const title = document.createElement('div');
    title.className = 'vr-structure2d-title';
    title.textContent = '结构图';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-structure2d-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      this.close();
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Canvas container
    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'vr-structure2d-canvas';

    // SVG
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('class', 'vr-structure2d-svg');

    canvasContainer.appendChild(this.svg);

    // Assemble
    this.element.appendChild(header);
    this.element.appendChild(canvasContainer);

    // 计算布局并渲染
    this.computeLayout();
    this.renderGraph();
  }

  private computeLayout(): void {
    const useAutoLayout = shouldUseAutoLayout(this.graph.nodes);
    const mapWidth = this.museum.map?.width || 1000;
    const mapHeight = this.museum.map?.height || 600;

    if (useAutoLayout) {
      // 使用自动布局
      this.layout = forceLayout2D(this.graph.nodes, this.graph.edges, {
        width: mapWidth,
        height: mapHeight,
        iterations: 300,
        padding: 40,
      });
    } else {
      // 使用现有的 mapPoint
      this.layout = {};
      for (const node of this.graph.nodes) {
        if (node.mapPoint) {
          this.layout[node.id] = {
            x: node.mapPoint.x,
            y: node.mapPoint.y,
          };
        }
      }
    }
  }

  private renderGraph(): void {
    // Clear SVG
    this.svg.innerHTML = '';

    const mapWidth = this.museum.map?.width || 1000;
    const mapHeight = this.museum.map?.height || 600;

    // Set SVG viewBox
    this.svg.setAttribute('viewBox', `0 0 ${mapWidth} ${mapHeight}`);

    // Render edges (lines)
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

    // Render nodes (circles + labels)
    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodesGroup.setAttribute('class', 'vr-structure2d-nodes');

    for (const node of this.graph.nodes) {
      const pos = this.layout[node.id];
      if (!pos) continue;

      const isCurrent = node.id === this.currentSceneId;

      // Node group
      const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeGroup.setAttribute('class', `vr-structure2d-node ${isCurrent ? 'is-current' : ''}`);
      nodeGroup.setAttribute('data-scene-id', node.id);
      nodeGroup.style.cursor = 'pointer';

      // Circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x.toString());
      circle.setAttribute('cy', pos.y.toString());
      circle.setAttribute('r', isCurrent ? '12' : '8');
      circle.setAttribute('class', 'vr-structure2d-node-circle');

      // Label text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', pos.x.toString());
      text.setAttribute('y', (pos.y + (isCurrent ? 25 : 20)).toString());
      text.setAttribute('class', 'vr-structure2d-node-label');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = node.name;

      nodeGroup.appendChild(circle);
      nodeGroup.appendChild(text);
      nodesGroup.appendChild(nodeGroup);

      // Click handler
      nodeGroup.addEventListener('click', () => {
        if (this.onNodeClick) {
          this.onNodeClick(this.museum.id, node.id);
        }
      });
    }

    this.svg.appendChild(nodesGroup);
  }

  private bindEvents(): void {
    // ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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

    this.computeLayout();
    this.renderGraph();
  }

  open(): void {
    this.element.classList.add('is-visible');
  }

  close(): void {
    this.element.classList.remove('is-visible');
    if (this.onClose) {
      this.onClose();
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}

