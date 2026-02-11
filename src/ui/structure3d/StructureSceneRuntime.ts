import {
  AmbientLight,
  Box3,
  BufferGeometry,
  DirectionalLight,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import type { Museum } from '../../types/config';
import type { SceneGraph } from '../../graph/sceneGraph';
import { forceLayout2D, shouldUseAutoLayout } from '../../graph/autoLayout';
import { getNodeDegree } from '../../graph/sceneGraph';
import { resolveAssetUrl, AssetType } from '../../utils/assetResolver';

type StructureRuntimeOptions = {
  container: HTMLElement;
  museum: Museum;
  graph: SceneGraph;
  currentSceneId: string;
  onNodeClick?: (museumId: string, sceneId: string) => void;
  onStatusChange?: (status: RuntimeStatus) => void;
  onWebGlUnavailable?: () => void;
  onModelError?: (message: string) => void;
};

type RuntimeStatus = {
  modelStatus: 'none' | 'loading' | 'loaded' | 'error';
  nodeCount: number;
  edgeCount: number;
  width: number;
  height: number;
};

type OrbitControlsLike = {
  enableDamping: boolean;
  dampingFactor: number;
  minDistance: number;
  maxDistance: number;
  maxPolarAngle: number;
  minPolarAngle: number;
  target: Vector3;
  update(): void;
  dispose(): void;
};

export class StructureSceneRuntime {
  private readonly options: StructureRuntimeOptions;
  private scene: Scene | null = null;
  private camera: PerspectiveCamera | null = null;
  private renderer: WebGLRenderer | null = null;
  private controls: OrbitControlsLike | null = null;
  private modelGroup: Group | null = null;
  private sceneNodes: Map<string, Mesh> = new Map();
  private edgeLines: Line[] = [];
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private readonly handleWindowResize = () => this.handleResize();
  private readonly canvasListeners: Array<() => void> = [];
  private disposed = false;
  private modelStatus: RuntimeStatus['modelStatus'] = 'none';
  private hoveredSceneId: string | null = null;

  constructor(options: StructureRuntimeOptions) {
    this.options = options;
  }

  async init(): Promise<boolean> {
    if (this.disposed) {
      return false;
    }
    const container = this.options.container;
    const initialAspect =
      container.clientWidth > 0 && container.clientHeight > 0
        ? container.clientWidth / container.clientHeight
        : window.innerWidth / Math.max(1, window.innerHeight);

    this.scene = new Scene();
    this.scene.background = null;
    this.camera = new PerspectiveCamera(60, initialAspect, 0.1, 1000);
    this.camera.position.set(0, 12, 18);
    this.camera.lookAt(0, 0, 0);

    try {
      this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(this.renderer.domElement);
    } catch {
      this.options.onWebGlUnavailable?.();
      return false;
    }

    await this.initControls();
    this.mountLights();
    this.modelGroup = new Group();
    this.scene.add(this.modelGroup);

    if (this.options.museum.dollhouse?.modelUrl) {
      this.modelStatus = 'loading';
      this.emitStatus();
      await this.loadModel();
    } else {
      this.modelStatus = 'none';
      this.generateGraph();
      this.emitStatus();
    }

    this.setupResizeObserver();
    this.bindCanvasEvents();
    this.handleResize();
    return true;
  }

  open(): void {
    if (!this.renderer || !this.scene || !this.camera || this.animationId !== null || this.disposed) {
      return;
    }
    const tick = () => {
      if (this.disposed || !this.renderer || !this.scene || !this.camera) {
        return;
      }
      this.animationId = requestAnimationFrame(tick);
      if (this.controls) {
        this.controls.update();
      }
      const time = Date.now() * 0.001;
      this.sceneNodes.forEach((mesh) => {
        if (mesh.userData.isCurrent) {
          const pulse = Math.sin(time * 2) * 0.1 + 1;
          mesh.scale.setScalar(pulse * 1.2);
          const material = mesh.material as MeshStandardMaterial;
          material.opacity = 0.7 + Math.sin(time * 2) * 0.2;
        }
      });
      this.renderer.render(this.scene, this.camera);
    };
    this.animationId = requestAnimationFrame(tick);
  }

  updateContext(opts: { museum: Museum; graph: SceneGraph; currentSceneId: string }): void {
    if (this.disposed) return;
    const previousModelUrl = this.options.museum.dollhouse?.modelUrl;
    this.options.museum = opts.museum;
    this.options.graph = opts.graph;
    this.options.currentSceneId = opts.currentSceneId;

    const nextModelUrl = opts.museum.dollhouse?.modelUrl;
    if (previousModelUrl !== nextModelUrl) {
      this.reloadModel().catch(() => {
        // 模型重载失败由内部回调处理
      });
      return;
    }
    this.generateGraph();
    this.emitStatus();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    for (const remove of this.canvasListeners) {
      remove();
    }
    this.canvasListeners.length = 0;
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    window.removeEventListener('resize', this.handleWindowResize);
    this.clearGraph();
    this.clearModelGroup();
    this.controls?.dispose();
    this.controls = null;
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
      this.renderer = null;
    }
    this.camera = null;
    this.scene = null;
  }

  private async initControls(): Promise<void> {
    if (!this.renderer || !this.camera) {
      return;
    }
    try {
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      const controls = new OrbitControls(this.camera, this.renderer.domElement) as OrbitControlsLike;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 50;
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.minPolarAngle = Math.PI / 6;
      controls.target.set(0, 0, 0);
      this.controls = controls;
    } catch {
      this.controls = null;
    }
  }

  private mountLights(): void {
    if (!this.scene) return;
    const ambientLight = new AmbientLight(0xffffff, 0.6);
    const directionalLight = new DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
  }

  private async reloadModel(): Promise<void> {
    this.clearModelGroup();
    if (!this.scene) return;
    this.modelGroup = new Group();
    this.scene.add(this.modelGroup);
    if (this.options.museum.dollhouse?.modelUrl) {
      this.modelStatus = 'loading';
      this.emitStatus();
      await this.loadModel();
      return;
    }
    this.modelStatus = 'none';
    this.generateGraph();
    this.emitStatus();
  }

  private async loadModel(): Promise<void> {
    if (!this.scene || !this.modelGroup) return;
    const rawUrl = this.options.museum.dollhouse?.modelUrl;
    if (!rawUrl) {
      this.modelStatus = 'none';
      this.generateGraph();
      this.emitStatus();
      return;
    }
    const modelUrl = resolveAssetUrl(rawUrl, AssetType.DOLLHOUSE);
    if (!modelUrl) {
      this.modelStatus = 'error';
      this.options.onModelError?.('模型 URL 无效');
      this.generateGraph();
      this.emitStatus();
      return;
    }

    try {
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(modelUrl);

      this.clearModelGroup();
      this.modelGroup = new Group();
      this.scene.add(this.modelGroup);

      const model = gltf.scene;
      const scale = this.options.museum.dollhouse?.scale ?? 1;
      const offset = this.options.museum.dollhouse?.offset ?? { x: 0, y: 0, z: 0 };
      model.scale.set(scale, scale, scale);
      model.position.set(offset.x, offset.y, offset.z);
      this.modelGroup.add(model);

      this.modelStatus = 'loaded';
      this.generateGraph();
      this.fitModelToView();
      this.options.onModelError?.('');
      this.emitStatus();
    } catch (error) {
      this.modelStatus = 'error';
      const message = error instanceof Error ? error.message : String(error);
      this.options.onModelError?.(message);
      this.generateGraph();
      this.emitStatus();
    }
  }

  private fitModelToView(): void {
    if (!this.modelGroup || !this.scene || !this.camera || !this.controls) return;
    const box = new Box3().setFromObject(this.modelGroup);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const distance = maxDim * 2;

    this.camera.position.set(center.x, center.y + size.y * 0.5, center.z + distance);
    this.camera.lookAt(center);
    this.camera.updateProjectionMatrix();
    this.controls.target.copy(center);
    this.controls.update();
    this.controls.minDistance = maxDim * 0.5;
    this.controls.maxDistance = maxDim * 5;
  }

  private bindCanvasEvents(): void {
    if (!this.renderer) return;
    const canvas = this.renderer.domElement;
    const onClick = (event: MouseEvent) => this.handleClick(event);
    const onMove = (event: MouseEvent) => this.handleMouseMove(event);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('mousemove', onMove);
    this.canvasListeners.push(() => {
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousemove', onMove);
    });
  }

  private handleClick(event: MouseEvent): void {
    if (!this.renderer || !this.camera || this.sceneNodes.size === 0) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(new Vector2(x, y), this.camera);
    const intersects = raycaster.intersectObjects(Array.from(this.sceneNodes.values()));
    if (intersects.length === 0) return;
    const mesh = intersects[0].object as Mesh;
    const sceneId = mesh.userData.sceneId;
    if (sceneId && this.options.onNodeClick) {
      this.options.onNodeClick(this.options.museum.id, sceneId);
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.renderer || !this.camera || this.sceneNodes.size === 0) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new Raycaster();
    raycaster.setFromCamera(new Vector2(x, y), this.camera);
    const intersects = raycaster.intersectObjects(Array.from(this.sceneNodes.values()));

    this.sceneNodes.forEach((mesh) => {
      if (!mesh.userData.isCurrent) {
        const material = mesh.material as MeshStandardMaterial;
        material.opacity = 0.7;
      }
    });

    if (intersects.length > 0) {
      const mesh = intersects[0].object as Mesh;
      const sceneId = mesh.userData.sceneId as string | undefined;
      if (!mesh.userData.isCurrent) {
        const material = mesh.material as MeshStandardMaterial;
        material.opacity = 0.9;
      }
      this.hoveredSceneId = sceneId ?? null;
      this.renderer.domElement.style.cursor = 'pointer';
      return;
    }
    this.hoveredSceneId = null;
    this.renderer.domElement.style.cursor = 'default';
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', this.handleWindowResize);
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.options.container);
  }

  private handleResize(): void {
    if (!this.renderer || !this.camera) return;
    const width = this.options.container.clientWidth;
    const height = this.options.container.clientHeight;
    if (width <= 0 || height <= 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.emitStatus();
  }

  private generateGraph(): void {
    if (!this.scene) return;
    this.clearGraph();

    const hasRealModel = this.modelStatus === 'loaded' && this.modelGroup && this.modelGroup.children.length > 0;
    const layout2D = this.computeLayout2D();
    const layout3D = this.normalizeTo3D(layout2D);

    if (!hasRealModel) {
      for (const edge of this.options.graph.edges) {
        const fromPos = layout3D[edge.from];
        const toPos = layout3D[edge.to];
        if (!fromPos || !toPos) continue;
        const geometry = new BufferGeometry().setFromPoints([
          new Vector3(fromPos.x, fromPos.y, fromPos.z),
          new Vector3(toPos.x, toPos.y, toPos.z),
        ]);
        const material = new LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });
        const line = new Line(geometry, material);
        this.scene.add(line);
        this.edgeLines.push(line);
      }
    }

    for (const node of this.options.graph.nodes) {
      const pos = layout3D[node.id];
      if (!pos) continue;
      const isCurrent = node.id === this.options.currentSceneId;
      const geometry = new SphereGeometry(isCurrent ? 0.8 : 0.6, 16, 16);
      const material = new MeshStandardMaterial({
        color: isCurrent ? 0x4a90e2 : 0x888888,
        opacity: isCurrent ? 0.9 : 0.7,
        transparent: true,
        metalness: 0.1,
        roughness: 0.7,
      });
      const mesh = new Mesh(geometry, material);

      if (hasRealModel && this.modelGroup) {
        const box = new Box3().setFromObject(this.modelGroup);
        const center = box.getCenter(new Vector3());
        const size = box.getSize(new Vector3());
        mesh.position.set(
          center.x + pos.x * 0.1,
          center.y + size.y * 0.5 + pos.y * 0.1 + 1,
          center.z + pos.z * 0.1,
        );
      } else {
        mesh.position.set(pos.x, pos.y, pos.z);
      }

      mesh.userData = { sceneId: node.id, sceneName: node.name, isCurrent };
      if (isCurrent) {
        mesh.scale.setScalar(1.2);
      }

      this.scene.add(mesh);
      this.sceneNodes.set(node.id, mesh);
    }
  }

  private computeLayout2D(): Record<string, { x: number; y: number }> {
    const useAutoLayout = shouldUseAutoLayout(this.options.graph.nodes);
    const mapWidth = this.options.museum.map?.width || 1000;
    const mapHeight = this.options.museum.map?.height || 600;
    if (useAutoLayout) {
      return forceLayout2D(this.options.graph.nodes, this.options.graph.edges, {
        width: mapWidth,
        height: mapHeight,
        iterations: 300,
        padding: 40,
      });
    }

    const layout: Record<string, { x: number; y: number }> = {};
    for (const node of this.options.graph.nodes) {
      if (!node.mapPoint) continue;
      layout[node.id] = { x: node.mapPoint.x, y: node.mapPoint.y };
    }
    return layout;
  }

  private normalizeTo3D(
    layout: Record<string, { x: number; y: number }>,
  ): Record<string, { x: number; y: number; z: number }> {
    const entries = Object.entries(layout);
    if (entries.length === 0) return {};
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const [, point] of entries) {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }

    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;
    const scaleX = 20 / spanX;
    const scaleZ = 20 / spanY;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const layout3D: Record<string, { x: number; y: number; z: number }> = {};
    for (const [id, point] of entries) {
      const degree = getNodeDegree(this.options.graph, id);
      const zNoise = (Math.random() - 0.5) * 0.5;
      layout3D[id] = {
        x: (point.x - centerX) * scaleX,
        y: degree * 1.5 + zNoise,
        z: (point.y - centerY) * scaleZ,
      };
    }
    return layout3D;
  }

  private clearGraph(): void {
    if (!this.scene) return;
    this.sceneNodes.forEach((mesh) => {
      this.scene?.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => material.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.sceneNodes.clear();

    this.edgeLines.forEach((line) => {
      this.scene?.remove(line);
      line.geometry.dispose();
      if (Array.isArray(line.material)) {
        line.material.forEach((material) => material.dispose());
      } else {
        line.material.dispose();
      }
    });
    this.edgeLines = [];
  }

  private clearModelGroup(): void {
    if (!this.scene || !this.modelGroup) return;
    this.modelGroup.traverse((object3d) => {
      if (object3d instanceof Mesh) {
        object3d.geometry?.dispose();
        if (Array.isArray(object3d.material)) {
          object3d.material.forEach((material) => material.dispose());
        } else {
          object3d.material?.dispose();
        }
      }
    });
    this.scene.remove(this.modelGroup);
    this.modelGroup.clear();
    this.modelGroup = null;
  }

  private emitStatus(): void {
    this.options.onStatusChange?.({
      modelStatus: this.modelStatus,
      nodeCount: this.options.graph.nodes.length,
      edgeCount: this.options.graph.edges.length,
      width: this.options.container.clientWidth || 0,
      height: this.options.container.clientHeight || 0,
    });
  }
}

