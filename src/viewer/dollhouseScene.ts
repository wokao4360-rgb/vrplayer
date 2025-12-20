import * as THREE from 'three';
import type { Scene, Museum } from '../types/config';
import { emitSceneFocus, onSceneFocus, type SceneFocusEvent } from '../ui/sceneLinkBus';

/**
 * 3D Dollhouse 场景管理器
 * 用于生成和渲染空间概览的三维图
 */
export class DollhouseScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;
  private controls: any; // OrbitControls (动态导入)
  private sceneNodes: Map<string, THREE.Mesh> = new Map();
  private currentSceneId: string | null = null;
  private animationId: number | null = null;
  private museumId: string;
  private museum: Museum | null = null;
  private scenes: Scene[];
  private onSceneClick?: (museumId: string, sceneId: string) => void;
  private unsubscribeFocus: (() => void) | null = null;
  private hoveredSceneId: string | null = null;
  private focusAnimation: { target: THREE.Vector3; start: THREE.Vector3; progress: number } | null = null;

  constructor(
    container: HTMLElement,
    museumId: string,
    scenes: Scene[],
    currentSceneId: string,
    onSceneClick?: (museumId: string, sceneId: string) => void,
    museum?: Museum
  ) {
    this.container = container;
    this.museumId = museumId;
    this.museum = museum || null;
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    this.onSceneClick = onSceneClick;

    // 创建场景
    this.scene = new THREE.Scene();
    this.scene.background = null; // 透明背景

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // 透明背景
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // 初始化 OrbitControls（动态导入）
    this.initControls();

    // 生成场景节点
    this.generateNodes();

    // 添加基础光照
    this.setupLighting();

    // 开始渲染循环
    this.animate();

    // 响应窗口大小变化
    window.addEventListener('resize', () => this.handleResize());

    // 监听场景聚焦事件
    this.unsubscribeFocus = onSceneFocus((event) => {
      this.handleSceneFocus(event);
    });
  }

  private handleSceneFocus(event: SceneFocusEvent): void {
    if (event.type === 'focus' && event.source !== 'dollhouse') {
      // 聚焦动画：相机轻微平滑移动，让目标节点更居中
      const targetNode = this.sceneNodes.get(event.sceneId);
      if (targetNode) {
        const targetPos = targetNode.position.clone();
        // 计算相机目标位置（稍微后退和抬高）
        const cameraTarget = new THREE.Vector3(
          targetPos.x * 0.3,
          targetPos.y + 3,
          targetPos.z + 8
        );
        
        this.focusAnimation = {
          target: cameraTarget,
          start: this.camera.position.clone(),
          progress: 0,
        };
      }
    }
  }

  private async initControls(): Promise<void> {
    try {
      // 动态导入 OrbitControls（避免增加 bundle 大小）
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.minDistance = 3;
      this.controls.maxDistance = 30;
      this.controls.maxPolarAngle = Math.PI / 2.2; // 限制角度，避免翻转
      this.controls.minPolarAngle = Math.PI / 6; // 限制最低角度
    } catch (error) {
      console.warn('Failed to load OrbitControls:', error);
      // 如果加载失败，仍然可以渲染，只是没有交互控制
    }
  }

  private setupLighting(): void {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(directionalLight);
  }

  private generateNodes(): void {
    // 清理现有节点
    this.sceneNodes.forEach((mesh) => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.sceneNodes.clear();

    // 计算布局
    const layout = this.calculateLayout();

    // 为每个场景创建节点
    this.scenes.forEach((scene, index) => {
      const position = layout[index];
      const node = this.createSceneNode(scene, position, scene.id === this.currentSceneId);
      this.sceneNodes.set(scene.id, node);
      this.scene.add(node);
    });
  }

  private calculateLayout(): Array<{ x: number; y: number; z: number }> {
    const positions: Array<{ x: number; y: number; z: number }> = [];
    
    // 检查是否有 museum.map 配置（用于获取 map 尺寸）
    // 由于我们只有 scenes，需要从第一个有 mapPoint 的 scene 推断
    const scenesWithMapPoint = this.scenes.filter(s => s.mapPoint);
    const hasMapPoints = scenesWithMapPoint.length > 0;

    if (hasMapPoints) {
      // 使用 mapPoint 布局（优先使用 museum.map 尺寸）
      const mapWidth = this.museum?.map?.width || 1000;
      const mapHeight = this.museum?.map?.height || 600;
      
      // 找到 mapPoint 的边界
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      scenesWithMapPoint.forEach(s => {
        if (s.mapPoint) {
          minX = Math.min(minX, s.mapPoint.x);
          maxX = Math.max(maxX, s.mapPoint.x);
          minY = Math.min(minY, s.mapPoint.y);
          maxY = Math.max(maxY, s.mapPoint.y);
        }
      });
      
      // 归一化并映射到 3D 空间（-5 到 5 的范围）
      const rangeX = maxX - minX || mapWidth;
      const rangeY = maxY - minY || mapHeight;
      const scaleX = rangeX > 0 ? 10 / rangeX : 0.01;
      const scaleZ = rangeY > 0 ? 10 / rangeY : 0.01;
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      for (const scene of this.scenes) {
        if (scene.mapPoint) {
          positions.push({
            x: (scene.mapPoint.x - centerX) * scaleX,
            y: 0,
            z: (scene.mapPoint.y - centerY) * scaleZ,
          });
        } else {
          // fallback: grid 布局
          const cols = Math.ceil(Math.sqrt(this.scenes.length));
          const row = Math.floor(positions.length / cols);
          const col = positions.length % cols;
          positions.push({
            x: (col - cols / 2) * 2,
            y: 0,
            z: (row - cols / 2) * 2,
          });
        }
      }
    } else {
      // fallback: grid 布局
      const cols = Math.ceil(Math.sqrt(this.scenes.length));
      for (let i = 0; i < this.scenes.length; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        positions.push({
          x: (col - cols / 2) * 2,
          y: 0,
          z: (row - cols / 2) * 2,
        });
      }
    }

    return positions;
  }

  private createSceneNode(
    scene: Scene,
    position: { x: number; y: number; z: number },
    isCurrent: boolean
  ): THREE.Mesh {
    // 创建几何体（Box 或 Plane）
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    
    // 创建材质（低饱和、半透明）
    const baseColor = isCurrent ? 0x4a90e2 : 0x888888;
    const material = new THREE.MeshStandardMaterial({
      color: baseColor,
      opacity: isCurrent ? 0.8 : 0.5,
      transparent: true,
      metalness: 0.1,
      roughness: 0.7,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.userData = { sceneId: scene.id, sceneName: scene.name };

    // 添加点击事件
    mesh.userData.onClick = () => {
      if (this.onSceneClick) {
        this.onSceneClick(this.museumId, scene.id);
      }
    };

    // 当前场景节点添加脉冲动画
    if (isCurrent) {
      mesh.userData.isCurrent = true;
      mesh.scale.set(1.2, 1.2, 1.2);
    }

    return mesh;
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // 更新 controls
    if (this.controls) {
      this.controls.update();
    }

    // 处理聚焦动画（相机平滑移动）
    if (this.focusAnimation) {
      this.focusAnimation.progress += 0.05; // 约 200ms 完成（1/0.05 = 20帧）
      if (this.focusAnimation.progress >= 1) {
        this.camera.position.copy(this.focusAnimation.target);
        this.camera.lookAt(0, 0, 0);
        if (this.controls) {
          this.controls.update();
        }
        this.focusAnimation = null;
      } else {
        // Lerp 插值
        this.camera.position.lerpVectors(
          this.focusAnimation.start,
          this.focusAnimation.target,
          this.focusAnimation.progress
        );
        this.camera.lookAt(0, 0, 0);
      }
    }

    // 更新当前场景节点的脉冲动画
    const time = Date.now() * 0.001;
    this.sceneNodes.forEach((mesh) => {
      if (mesh.userData.isCurrent) {
        const pulse = Math.sin(time * 2) * 0.1 + 1;
        mesh.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2);
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
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

  /**
   * 更新当前场景高亮
   */
  updateCurrentScene(sceneId: string): void {
    this.currentSceneId = sceneId;
    this.generateNodes();
  }

  /**
   * 更新场景数据
   */
  updateScenes(scenes: Scene[], currentSceneId: string): void {
    this.scenes = scenes;
    this.currentSceneId = currentSceneId;
    this.generateNodes();
  }

  /**
   * 设置点击回调
   */
  setOnSceneClick(callback: (museumId: string, sceneId: string) => void): void {
    this.onSceneClick = callback;
  }

  /**
   * 处理鼠标点击（射线检测）
   */
  handleClick(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    const intersects = raycaster.intersectObjects(Array.from(this.sceneNodes.values()));
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const sceneId = mesh.userData.sceneId;
      
      // 点击前先 emit focus（虽然 router 也会发，但这里确保立即响应）
      emitSceneFocus({
        type: 'focus',
        museumId: this.museumId,
        sceneId,
        source: 'dollhouse',
        ts: Date.now(),
      });
      
      if (mesh.userData.onClick) {
        mesh.userData.onClick();
      }
    }
  }

  /**
   * 处理鼠标移动（hover 检测）
   */
  handleMouseMove(event: MouseEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    const intersects = raycaster.intersectObjects(Array.from(this.sceneNodes.values()));
    
    // 重置所有节点的 hover 状态
    this.sceneNodes.forEach((mesh) => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!mesh.userData.isCurrent) {
        material.opacity = 0.5;
      }
    });

    // 设置 hover 节点
    if (intersects.length > 0) {
      const mesh = intersects[0].object as THREE.Mesh;
      const material = mesh.material as THREE.MeshStandardMaterial;
      const sceneId = mesh.userData.sceneId;
      
      if (!mesh.userData.isCurrent) {
        material.opacity = 0.7;
      }
      
      // 发送 hover 事件
      if (this.hoveredSceneId !== sceneId) {
        this.hoveredSceneId = sceneId;
        emitSceneFocus({
          type: 'hover',
          museumId: this.museumId,
          sceneId,
          source: 'dollhouse',
          ts: Date.now(),
        });
      }
      
      this.renderer.domElement.style.cursor = 'pointer';
    } else {
      // 清除 hover
      if (this.hoveredSceneId !== null) {
        this.hoveredSceneId = null;
        emitSceneFocus({
          type: 'hover',
          museumId: this.museumId,
          sceneId: null,
          source: 'dollhouse',
          ts: Date.now(),
        });
      }
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  /**
   * 获取 DOM 元素（用于事件绑定）
   */
  getDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  /**
   * 清理资源
   */
  dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // 取消事件监听
    if (this.unsubscribeFocus) {
      this.unsubscribeFocus();
      this.unsubscribeFocus = null;
    }

    // 清理节点
    this.sceneNodes.forEach((mesh) => {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    this.sceneNodes.clear();

    // 清理渲染器
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }

    // 清理 controls
    if (this.controls) {
      this.controls.dispose();
    }
  }
}








