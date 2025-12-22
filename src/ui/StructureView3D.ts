/**
 * StructureView3D - 全屏3D结构图Overlay
 * 显示场景图的三维视图（节点=scene球体，边=scene热点跳转连线）
 */

import * as THREE from 'three';
import type { Museum } from '../types/config';
import type { SceneGraph } from '../graph/sceneGraph';
import { getNodeDegree } from '../graph/sceneGraph';
import { forceLayout2D, shouldUseAutoLayout } from '../graph/autoLayout';
import { navigateToScene } from '../utils/router';

type StructureView3DOptions = {
  museum: Museum;
  graph: SceneGraph;
  currentSceneId: string;
  onClose?: () => void;
  onNodeClick?: (museumId: string, sceneId: string) => void;
};

export class StructureView3D {
  private element: HTMLElement;
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: any; // OrbitControls (动态导入)
  private museum: Museum;
  private graph: SceneGraph;
  private currentSceneId: string;
  private onClose?: () => void;
  private onNodeClick?: (museumId: string, sceneId: string) => void;
  private animationId: number | null = null;
  private sceneNodes: Map<string, THREE.Mesh> = new Map();
  private edgeLines: THREE.Line[] = [];
  private hoveredSceneId: string | null = null;

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
    this.init3D().then(() => {
      this.bindEvents();
    });
  }

  private render(): void {
    // Header
    const header = document.createElement('div');
    header.className = 'vr-structure3d-header';

    const title = document.createElement('div');
    title.className = 'vr-structure3d-title';
    title.textContent = '三维模型';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-structure3d-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.addEventListener('click', () => {
      this.close();
    });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Assemble
    this.element.appendChild(header);
    this.element.appendChild(this.container);
  }

  private async init3D(): Promise<void> {
    // 创建场景
    this.scene = new THREE.Scene();
    this.scene.background = null; // 透明背景

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 15);
    this.camera.lookAt(0, 0, 0);

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 初始化 OrbitControls
    try {
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.minDistance = 3;
      this.controls.maxDistance = 50;
      this.controls.maxPolarAngle = Math.PI / 2.2;
      this.controls.minPolarAngle = Math.PI / 6;
    } catch (error) {
      // OrbitControls 加载失败，仍然可以渲染，只是没有交互控制
    }

    // 添加基础光照
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(directionalLight);

    // 生成节点和边
    this.generateGraph();

    // 开始渲染循环
    this.animate();

    // 响应窗口大小变化
    window.addEventListener('resize', () => this.handleResize());
  }

  private generateGraph(): void {
    // 清理现有节点和边
    this.sceneNodes.forEach((mesh) => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.sceneNodes.clear();

    this.edgeLines.forEach((line) => {
      this.scene.remove(line);
      line.geometry.dispose();
      if (Array.isArray(line.material)) {
        line.material.forEach((m) => m.dispose());
      } else {
        line.material.dispose();
      }
    });
    this.edgeLines = [];

    // 计算2D布局
    const useAutoLayout = shouldUseAutoLayout(this.graph.nodes);
    const mapWidth = this.museum.map?.width || 1000;
    const mapHeight = this.museum.map?.height || 600;

    let layout2D: Record<string, { x: number; y: number }> = {};

    if (useAutoLayout) {
      layout2D = forceLayout2D(this.graph.nodes, this.graph.edges, {
        width: mapWidth,
        height: mapHeight,
        iterations: 300,
        padding: 40,
      });
    } else {
      for (const node of this.graph.nodes) {
        if (node.mapPoint) {
          layout2D[node.id] = {
            x: node.mapPoint.x,
            y: node.mapPoint.y,
          };
        }
      }
    }

    // 归一化到 3D 空间（-10 到 10 的范围）
    const normalizeTo3D = (
      layout: Record<string, { x: number; y: number }>
    ): Record<string, { x: number; y: number; z: number }> => {
      const entries = Object.entries(layout);
      if (entries.length === 0) return {};

      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;

      for (const [, p] of entries) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
      }

      const spanX = maxX - minX || 1;
      const spanY = maxY - minY || 1;
      const scaleX = 20 / spanX;
      const scaleZ = 20 / spanY;
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      const layout3D: Record<string, { x: number; y: number; z: number }> = {};

      for (const [id, p] of entries) {
        const degree = getNodeDegree(this.graph, id);
        const zNoise = (Math.random() - 0.5) * 0.5;
        layout3D[id] = {
          x: (p.x - centerX) * scaleX,
          y: degree * 1.5 + zNoise, // z = degree * 1.5 + 噪声
          z: (p.y - centerY) * scaleZ,
        };
      }

      return layout3D;
    };

    const layout3D = normalizeTo3D(layout2D);

    // 渲染边（先渲染边，节点在上层）
    for (const edge of this.graph.edges) {
      const fromPos = layout3D[edge.from];
      const toPos = layout3D[edge.to];

      if (!fromPos || !toPos) continue;

      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(fromPos.x, fromPos.y, fromPos.z),
        new THREE.Vector3(toPos.x, toPos.y, toPos.z),
      ]);

      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.3,
        transparent: true,
      });

      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
      this.edgeLines.push(line);
    }

    // 渲染节点（球体）
    for (const node of this.graph.nodes) {
      const pos = layout3D[node.id];
      if (!pos) continue;

      const isCurrent = node.id === this.currentSceneId;
      const degree = getNodeDegree(this.graph, node.id);

      // 创建球体
      const geometry = new THREE.SphereGeometry(
        isCurrent ? 0.8 : 0.6,
        16,
        16
      );
      const material = new THREE.MeshStandardMaterial({
        color: isCurrent ? 0x4a90e2 : 0x888888,
        opacity: isCurrent ? 0.9 : 0.7,
        transparent: true,
        metalness: 0.1,
        roughness: 0.7,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.userData = { sceneId: node.id, sceneName: node.name };

      // 当前节点添加脉冲动画（通过 scale）
      if (isCurrent) {
        mesh.userData.isCurrent = true;
        mesh.scale.set(1.2, 1.2, 1.2);
      }

      this.scene.add(mesh);
      this.sceneNodes.set(node.id, mesh);
    }
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // 更新 controls
    if (this.controls) {
      this.controls.update();
    }

    // 更新当前节点的脉冲动画
    const time = Date.now() * 0.001;
    this.sceneNodes.forEach((mesh) => {
      if (mesh.userData.isCurrent) {
        const pulse = Math.sin(time * 2) * 0.1 + 1;
        mesh.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2);
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.opacity = 0.7 + Math.sin(time * 2) * 0.2;
      }
    });

    // 渲染
    this.renderer.render(this.scene, this.camera);
  };

  private handleResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private handleClick(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    const intersects = raycaster.intersectObjects(
      Array.from(this.sceneNodes.values())
    );

    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const sceneId = mesh.userData.sceneId;

      if (this.onNodeClick) {
        this.onNodeClick(this.museum.id, sceneId);
      }
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    const intersects = raycaster.intersectObjects(
      Array.from(this.sceneNodes.values())
    );

    // 重置所有节点的 hover 状态
    this.sceneNodes.forEach((mesh) => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!mesh.userData.isCurrent) {
        material.opacity = 0.7;
      }
    });

    // 设置 hover 节点
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const sceneId = mesh.userData.sceneId;

      if (!mesh.userData.isCurrent) {
        material.opacity = 0.9;
      }

      this.hoveredSceneId = sceneId;
      this.renderer.domElement.style.cursor = 'pointer';
    } else {
      this.hoveredSceneId = null;
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  private bindEvents(): void {
    if (!this.renderer) return;
    
    const canvas = this.renderer.domElement;

    canvas.addEventListener('click', (e) => this.handleClick(e));
    canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));

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

    this.generateGraph();
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
    // 清理动画
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // 清理节点
    this.sceneNodes.forEach((mesh) => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.sceneNodes.clear();

    // 清理边
    this.edgeLines.forEach((line) => {
      this.scene.remove(line);
      line.geometry.dispose();
      if (Array.isArray(line.material)) {
        line.material.forEach((m) => m.dispose());
      } else {
        line.material.dispose();
      }
    });
    this.edgeLines = [];

    // 清理渲染器
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }

    // 清理 controls
    if (this.controls) {
      this.controls.dispose();
    }

    // 清理事件监听
    window.removeEventListener('resize', () => this.handleResize());

    this.element.remove();
  }
}

