/**
 * StructureView3D - 全屏 3D 结构图 Overlay（UI 壳层）
 * 运行时逻辑在 structure3d/StructureSceneRuntime 中按需加载
 */

import type { Museum } from '../types/config';
import type { SceneGraph } from '../graph/sceneGraph';
import type { StructureSceneRuntime } from './structure3d/StructureSceneRuntime';

type StructureView3DOptions = {
  museum: Museum;
  graph: SceneGraph;
  currentSceneId: string;
  onClose?: () => void;
  onNodeClick?: (museumId: string, sceneId: string) => void;
};

type StructureRuntimeModule = typeof import('./structure3d/StructureSceneRuntime');

export class StructureView3D {
  private element: HTMLElement;
  private container: HTMLElement;
  private museum: Museum;
  private graph: SceneGraph;
  private currentSceneId: string;
  private onClose?: () => void;
  private onNodeClick?: (museumId: string, sceneId: string) => void;
  private statusEl: HTMLElement | null = null;
  private webglErrorEl: HTMLElement | null = null;
  private modelErrorEl: HTMLElement | null = null;
  private runtime: StructureSceneRuntime | null = null;
  private runtimeModulePromise: Promise<StructureRuntimeModule> | null = null;
  private runtimeInitPromise: Promise<void> | null = null;
  private opened = false;
  private disposed = false;
  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  constructor(options: StructureView3DOptions) {
    this.museum = options.museum;
    this.graph = options.graph;
    this.currentSceneId = options.currentSceneId;
    this.onClose = options.onClose;
    this.onNodeClick = options.onNodeClick;

    this.element = document.createElement('div');
    this.element.className = 'vr-structure3d-overlay';

    this.container = document.createElement('div');
    this.container.className = 'vr-structure3d-canvas';

    this.render();
    void this.ensureRuntime();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  updateContext(opts: { museum: Museum; graph: SceneGraph; currentSceneId: string }): void {
    this.museum = opts.museum;
    this.graph = opts.graph;
    this.currentSceneId = opts.currentSceneId;
    this.runtime?.updateContext(opts);
    this.updateStatusText('loading');
  }

  open(): void {
    this.element.classList.add('is-visible');
    this.opened = true;
    document.addEventListener('keydown', this.handleKeyDown);
    void this.ensureRuntime().then(() => {
      if (this.disposed || !this.opened) return;
      this.runtime?.open();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.runtime?.open();
        });
      });
    });
  }

  close(): void {
    this.element.classList.remove('is-visible');
    this.opened = false;
    document.removeEventListener('keydown', this.handleKeyDown);
    this.onClose?.();
  }

  remove(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.opened = false;
    document.removeEventListener('keydown', this.handleKeyDown);
    this.runtime?.dispose();
    this.runtime = null;
    this.element.remove();
  }

  private render(): void {
    const header = document.createElement('div');
    header.className = 'vr-structure3d-header';

    const titleWrapper = document.createElement('div');
    titleWrapper.style.display = 'flex';
    titleWrapper.style.flexDirection = 'column';
    titleWrapper.style.gap = '4px';

    const title = document.createElement('div');
    title.className = 'vr-structure3d-title';
    title.textContent = '三维模型';

    this.statusEl = document.createElement('div');
    this.statusEl.className = 'vr-structure3d-status';
    this.updateStatusText('loading');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-structure3d-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      this.close();
    });

    titleWrapper.appendChild(title);
    titleWrapper.appendChild(this.statusEl);
    header.appendChild(titleWrapper);
    header.appendChild(closeBtn);

    this.webglErrorEl = document.createElement('div');
    this.webglErrorEl.className = 'vr-structure3d-webgl-error';
    this.webglErrorEl.style.display = 'none';
    this.webglErrorEl.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">WebGL 不可用</div>
        <div style="font-size: 13px; opacity: 0.8;">请尝试更换浏览器或设备</div>
      </div>
    `;

    this.modelErrorEl = document.createElement('div');
    this.modelErrorEl.className = 'vr-structure3d-model-error';
    this.modelErrorEl.style.display = 'none';
    this.modelErrorEl.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: rgba(255,200,100,0.95);">模型加载失败</div>
        <div style="font-size: 13px; opacity: 0.8;">请检查 URL 或网络连接</div>
      </div>
    `;

    this.element.appendChild(header);
    this.element.appendChild(this.container);
    this.element.appendChild(this.webglErrorEl);
    this.element.appendChild(this.modelErrorEl);
  }

  private async ensureRuntime(): Promise<void> {
    if (this.runtime || this.disposed) return;
    if (this.runtimeInitPromise) {
      await this.runtimeInitPromise;
      return;
    }

    const pending = (async () => {
      const { StructureSceneRuntime } = await this.loadRuntimeModule();
      if (this.disposed) return;
      const runtime = new StructureSceneRuntime({
        container: this.container,
        museum: this.museum,
        graph: this.graph,
        currentSceneId: this.currentSceneId,
        onNodeClick: this.onNodeClick,
        onStatusChange: (status) => {
          this.updateStatusText(status.modelStatus, status.nodeCount, status.edgeCount, status.width, status.height);
        },
        onWebGlUnavailable: () => {
          if (this.webglErrorEl) {
            this.webglErrorEl.style.display = 'block';
          }
        },
        onModelError: (message) => {
          if (!this.modelErrorEl) return;
          this.modelErrorEl.style.display = message ? 'block' : 'none';
        },
      });
      const ready = await runtime.init();
      if (!ready || this.disposed) {
        runtime.dispose();
        return;
      }
      this.runtime = runtime;
      if (this.opened) {
        runtime.open();
      }
    })().finally(() => {
      if (this.runtimeInitPromise === pending) {
        this.runtimeInitPromise = null;
      }
    });

    this.runtimeInitPromise = pending;
    await pending;
  }

  private loadRuntimeModule(): Promise<StructureRuntimeModule> {
    if (!this.runtimeModulePromise) {
      this.runtimeModulePromise = import('./structure3d/StructureSceneRuntime');
    }
    return this.runtimeModulePromise;
  }

  private updateStatusText(
    modelStatus: 'none' | 'loading' | 'loaded' | 'error' = 'loading',
    nodeCount = 0,
    edgeCount = 0,
    width = 0,
    height = 0,
  ): void {
    if (!this.statusEl) return;
    if (nodeCount === 0) {
      this.statusEl.textContent = `model: ${modelStatus}, no nodes`;
      this.statusEl.style.color = 'rgba(255,200,100,0.9)';
      return;
    }
    this.statusEl.textContent = `model: ${modelStatus}, nodes: ${nodeCount}, edges: ${edgeCount}, size: ${width}x${height}`;
    this.statusEl.style.color = 'rgba(255,255,255,0.65)';
  }
}
