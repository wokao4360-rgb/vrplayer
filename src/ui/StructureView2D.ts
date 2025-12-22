/**
 * StructureView2D - 全屏2D结构图Overlay
 * 支持两种模式：
 * - 平面图模式：显示真实平面图底图 + 点位叠加（如果 museum.map.image 存在）
 * - 结构图模式：显示 SVG graph（节点+边，fallback）
 */

import type { Museum, Scene } from '../types/config';
import type { SceneGraph, SceneGraphNode } from '../graph/sceneGraph';
import { forceLayout2D, shouldUseAutoLayout } from '../graph/autoLayout';
import { navigateToScene } from '../utils/router';
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
  private toggleBtn: HTMLElement | null = null;
  private museum: Museum;
  private graph: SceneGraph;
  private currentSceneId: string;
  private onClose?: () => void;
  private onNodeClick?: (museumId: string, sceneId: string) => void;
  private layout: Record<string, { x: number; y: number }> = {};
  private mode: ViewMode = 'graph'; // 默认结构图模式
  private hasFloorplan: boolean = false; // 是否有真实平面图

  constructor(options: StructureView2DOptions) {
    this.museum = options.museum;
    this.graph = options.graph;
    this.currentSceneId = options.currentSceneId;
    this.onClose = options.onClose;
    this.onNodeClick = options.onNodeClick;

    // 检查是否有真实平面图
    this.hasFloorplan = !!(this.museum.map?.image);

    // 如果有平面图，默认使用平面图模式
    this.mode = this.hasFloorplan ? 'floorplan' : 'graph';

    this.element = document.createElement('div');
    this.element.className = 'vr-structure2d-overlay';

    this.render();
    this.bindEvents();
  }

  private render(): void {
    // Header
    const header = document.createElement('div');
    header.className = 'vr-structure2d-header';

    const titleWrapper = document.createElement('div');
    titleWrapper.style.display = 'flex';
    titleWrapper.style.flexDirection = 'column';
    titleWrapper.style.gap = '4px';

    const title = document.createElement('div');
    title.className = 'vr-structure2d-title';
    title.textContent = '结构图';

    // 状态文本（自检UI）
    this.statusEl = document.createElement('div');
    this.statusEl.className = 'vr-structure2d-status';
    this.updateStatusText();

    titleWrapper.appendChild(title);
    titleWrapper.appendChild(this.statusEl);

    // Toggle 按钮（仅在有平面图时显示）
    if (this.hasFloorplan) {
      this.toggleBtn = document.createElement('button');
      this.toggleBtn.className = 'vr-btn vr-structure2d-toggle';
      this.toggleBtn.textContent = this.mode === 'floorplan' ? '结构图' : '平面图';
      this.toggleBtn.addEventListener('click', () => {
        this.mode = this.mode === 'floorplan' ? 'graph' : 'floorplan';
        this.toggleBtn!.textContent = this.mode === 'floorplan' ? '结构图' : '平面图';
        this.updateStatusText();
        this.renderContent();
      });
      header.appendChild(this.toggleBtn);
    }

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-structure2d-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      this.close();
    });

    header.appendChild(titleWrapper);
    header.appendChild(closeBtn);

    // Canvas container
    this.canvasContainer = document.createElement('div');
    this.canvasContainer.className = 'vr-structure2d-canvas';

    // SVG（用于结构图模式）
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('class', 'vr-structure2d-svg');

    this.canvasContainer.appendChild(this.svg);

    // 平面图图片（用于平面图模式）
    if (this.hasFloorplan && this.museum.map?.image) {
      const imgUrl = resolveAssetUrl(this.museum.map.image, AssetType.MAP);
      if (imgUrl) {
        this.floorplanImg = document.createElement('img');
        this.floorplanImg.className = 'vr-structure2d-floorplan';
        this.floorplanImg.src = imgUrl;
        this.floorplanImg.style.display = 'none'; // 默认隐藏
        this.canvasContainer.appendChild(this.floorplanImg);

        // 图片加载完成后渲染点位
        this.floorplanImg.onload = () => {
          if (this.mode === 'floorplan') {
            this.renderContent();
          }
        };
      }
    }

    // Assemble
    this.element.appendChild(header);
    this.element.appendChild(this.canvasContainer);

    // 计算布局并渲染
    this.computeLayout();
    this.renderContent();
  }

  private updateStatusText(): void {
    if (!this.statusEl) return;
    const nodeCount = this.graph.nodes.length;
    this.statusEl.textContent = `mode: ${this.mode}, nodes: ${nodeCount}`;
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

    // 优先使用 scene.mapPoint（如果存在）
    // 如果 mapPoint 不足或缺失，fallback 到 autoLayout
    const useAutoLayout = shouldUseAutoLayout(this.graph.nodes);

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

  private renderFloorplan(): void {
    // 隐藏 SVG，显示平面图
    if (this.svg) {
      this.svg.style.display = 'none';
    }
    if (this.floorplanImg) {
      this.floorplanImg.style.display = 'block';
    }

    // 在 SVG 上叠加点位（复用 SVG 绘制能力，但作为 overlay）
    this.svg.innerHTML = '';
    this.svg.style.display = 'block';
    this.svg.style.position = 'absolute';
    this.svg.style.top = '0';
    this.svg.style.left = '0';
    this.svg.style.pointerEvents = 'none';

    const mapWidth = this.museum.map?.width || 1000;
    const mapHeight = this.museum.map?.height || 600;

    // Set SVG viewBox（匹配平面图尺寸）
    this.svg.setAttribute('viewBox', `0 0 ${mapWidth} ${mapHeight}`);
    this.svg.style.pointerEvents = 'auto'; // 节点可点击

    // 渲染节点（不渲染边，只显示点位）
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

  private renderGraph(): void {
    // 隐藏平面图，显示 SVG graph
    if (this.floorplanImg) {
      this.floorplanImg.style.display = 'none';
    }
    if (this.svg) {
      this.svg.style.display = 'block';
      this.svg.style.position = '';
      this.svg.style.pointerEvents = 'auto';
    }

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

    // 重新检查是否有平面图
    this.hasFloorplan = !!(this.museum.map?.image);

    this.computeLayout();
    this.updateStatusText();
    this.renderContent();
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

