import * as THREE from 'three';
import type { Scene, InitialView } from '../types/config';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
import { LoadStatus } from '../ui/QualityIndicator';
import { NadirPatch } from './NadirPatch';
import { getYawPitchFromNDC, screenToNDC } from './picking';
import { CompassDisk } from '../ui/CompassDisk';
import { GroundNavDots } from '../ui/GroundNavDots';
import { BrandWatermark } from '../ui/BrandWatermark';
import { GroundHeadingMarker } from '../ui/GroundHeadingMarker';
import type { SceneHotspot } from '../types/config';
import { interactionBus } from '../ui/interactionBus';

/**
 * 渲染配置档位（用于画面对比：原始 vs 研学优化）
 */
enum RenderProfile {
  Original = 'original',
  Enhanced = 'enhanced',
}

type RenderPreset = {
  renderer: {
    pixelRatio: number;
    toneMapping: THREE.ToneMapping;
    toneMappingExposure: number;
    output: 'srgb';
    clearColor?: { color: number; alpha: number };
  };
  camera: {
    defaultFov: number;
  };
  texture: {
    anisotropyLimit: number;
    minFilter: THREE.TextureFilter;
    magFilter: THREE.TextureFilter;
    generateMipmaps: boolean;
    colorSpace: 'srgb';
  };
};

const RENDER_PRESETS: Record<RenderProfile, RenderPreset> = {
  // 原始显示参数（保持当前默认行为）
  [RenderProfile.Original]: {
    renderer: {
      pixelRatio: Math.min((window.devicePixelRatio || 1), 2),
      toneMapping: THREE.NoToneMapping,
      toneMappingExposure: 1.0,
      output: 'srgb',
      clearColor: undefined,
    },
    camera: {
      defaultFov: 75,
    },
    texture: {
      anisotropyLimit: 8,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
      generateMipmaps: true,
      colorSpace: 'srgb',
    },
  },
  // 研学优化显示参数
  [RenderProfile.Enhanced]: {
    renderer: {
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 0.95,
      output: 'srgb',
      clearColor: { color: 0x000000, alpha: 1 },
    },
    camera: {
      defaultFov: 70,
    },
    texture: {
      anisotropyLimit: 12,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
      generateMipmaps: true,
      colorSpace: 'srgb',
    },
  },
};

/**
 * PanoViewer - 全景图查看器
 * 
 * 资源加载策略：
 * - thumb: 缩略图，用于列表/预览（不在此处加载）
 * - panoLow: 低清全景图，首屏快速加载（优先）
 * - pano: 高清全景图，后台加载后无缝替换
 * - video: 视频资源，点击热点后才加载（不在此处加载）
 */
export class PanoViewer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private sphere: THREE.Mesh | null = null;
  private container: HTMLElement;
  private frameListeners: Array<(dtMs: number) => void> = [];
  private nadirPatch: NadirPatch | null = null;
  private compassDisk: CompassDisk | null = null;
  private groundNavDots: GroundNavDots | null = null;
  private groundHeading: GroundHeadingMarker | null = null;
  private brandWatermark: BrandWatermark | null = null;
  // Enhanced 为默认研学展示档，Original 为兜底备用档
  private renderProfile: RenderProfile = RenderProfile.Enhanced;
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private yaw = 0;
  private pitch = 0;
  private fov = 75;
  private onLoadCallback?: () => void;
  private onErrorCallback?: (error: Error) => void;
  private onStatusChangeCallback?: (status: LoadStatus) => void;
  private debugMode = false;
  private onDebugClick?: (x: number, y: number, yaw: number, pitch: number, fov: number) => void;
  private longPressTimer: number | null = null;
  private longPressThreshold = 500; // 长按阈值（毫秒）
  private aspectWarnedUrls = new Set<string>();
  
  // 加载状态管理
  private loadStatus: LoadStatus = LoadStatus.LOADING_LOW;
  private isDegradedMode = false; // 是否处于降级模式（高清加载失败）

  // 拾取模式
  private pickMode = false;
  private pickModeListeners: Array<() => void> = [];
  private pickStartX = 0;
  private pickStartY = 0;
  private pickStartTime = 0;
  private pickHasMoved = false;
  private pickDragThreshold = 8; // 拖动判定阈值（像素）
  private pickTimeThreshold = 250; // 拖动判定阈值（毫秒）

  // 交互检测（用于 UI 自动让位）
  private lastYaw: number = 0;
  private lastPitch: number = 0;
  private lastFov: number = 75;
  private isViewChanging: boolean = false;
  private viewChangeThreshold: number = 0.5; // 视角变化阈值（度）

  constructor(container: HTMLElement, debugMode = false) {
    this.container = container;
    this.debugMode = debugMode;
    this.renderProfile = this.detectRenderProfile();
    
    // 创建场景
    this.scene = new THREE.Scene();
    
    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      RENDER_PRESETS[this.renderProfile].camera.defaultFov,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 0);
    this.fov = RENDER_PRESETS[this.renderProfile].camera.defaultFov;
    
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.applyRendererProfile();
    container.appendChild(this.renderer.domElement);

    // Nadir patch：额外几何体叠加，不影响全景球主材质
    this.nadirPatch = new NadirPatch(this.scene, 500);
    
    // 指南针圆盘（DOM overlay）- 强制关闭
    this.compassDisk = new CompassDisk();
    this.compassDisk.mount(container);
    this.compassDisk.getElement().style.display = 'none';
    
    // 地面导航点（DOM overlay，初始为空，后续通过 setSceneData 设置）- 强制关闭
    this.groundNavDots = new GroundNavDots({
      museumId: '',
      currentSceneId: '',
      sceneHotspots: [],
    });
    this.groundNavDots.mount(container);
    this.groundNavDots.getElement().style.display = 'none';
    
    // 地面方向标（DOM overlay）- 强制关闭
    this.groundHeading = new GroundHeadingMarker(container);
    this.groundHeading.getElement().style.display = 'none';
    
    // 品牌水印（DOM overlay，左下角）
    this.brandWatermark = new BrandWatermark();
    this.brandWatermark.mount(container);
    
    // 绑定事件
    this.setupEvents();
    
    // 开始渲染循环
    this.animate();
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => this.handleResize());
  }

  private setupEvents(): void {
    const dom = this.renderer.domElement;
    
    // 鼠标/触摸拖拽
    dom.addEventListener('mousedown', (e) => this.onPointerDown(e));
    dom.addEventListener('mousemove', (e) => this.onPointerMove(e));
    dom.addEventListener('mouseup', () => this.onPointerUp());
    dom.addEventListener('mouseleave', () => this.onPointerUp());
    
    // 触摸事件
    dom.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    dom.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    dom.addEventListener('touchend', () => this.onTouchEnd());
    
    // 滚轮缩放（桌面端）
    dom.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    
    // 调试模式：双击（PC）或长按（移动端）显示调试信息
    if (this.debugMode) {
      dom.addEventListener('dblclick', (e) => this.handleDebugClick(e.clientX, e.clientY));
      
      // 移动端长按
      let touchStartTime = 0;
      let touchStartX = 0;
      let touchStartY = 0;
      
      dom.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartTime = Date.now();
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          
          this.longPressTimer = window.setTimeout(() => {
            this.handleDebugClick(touchStartX, touchStartY);
          }, this.longPressThreshold);
        }
      }, { passive: true });
      
      dom.addEventListener('touchmove', () => {
        if (this.longPressTimer) {
          clearTimeout(this.longPressTimer);
          this.longPressTimer = null;
        }
      }, { passive: true });
      
      dom.addEventListener('touchend', () => {
        if (this.longPressTimer) {
          clearTimeout(this.longPressTimer);
          this.longPressTimer = null;
        }
      }, { passive: true });
    }
  }
  
  /**
   * 调试模式下的点击处理
   */
  private handleDebugClick(x: number, y: number): void {
    if (this.onDebugClick && this.debugMode) {
      const view = this.getCurrentView();
      this.onDebugClick(x, y, view.yaw, view.pitch, view.fov);
    }
  }
  
  /**
   * 设置调试点击回调
   */
  setOnDebugClick(callback: (x: number, y: number, yaw: number, pitch: number, fov: number) => void): void {
    this.onDebugClick = callback;
  }

  private onPointerDown(e: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    // 拖动开始时发出交互信号
    interactionBus.emitInteracting();
  }

  private onPointerMove(e: MouseEvent): void {
    if (!this.isDragging) return;
    
    const deltaX = e.clientX - this.lastMouseX;
    const deltaY = e.clientY - this.lastMouseY;
    
    this.yaw -= deltaX * 0.5;
    this.pitch += deltaY * 0.5;
    this.pitch = Math.max(-90, Math.min(90, this.pitch));
    
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    
    this.updateCamera();
    
    // 调试模式：实时更新调试面板
    if (this.debugMode && this.onDebugClick) {
      const view = this.getCurrentView();
      // 这里不触发显示，只是更新（如果面板已显示）
    }
  }

  private onPointerUp(): void {
    this.isDragging = false;
  }

  private touchStartX = 0;
  private touchStartY = 0;
  private lastTouchDistance = 0;
  private isPinching = false;

  private onTouchStart(e: TouchEvent): void {
    if (e.touches.length === 1) {
      this.isDragging = true;
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.lastMouseX = this.touchStartX;
      this.lastMouseY = this.touchStartY;
      // 拖动开始时发出交互信号
      interactionBus.emitInteracting();
    } else if (e.touches.length === 2) {
      this.isPinching = true;
      this.isDragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this.lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
      // 缩放开始时发出交互信号
      interactionBus.emitInteracting();
    }
  }

  private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    
    // 如果正在长按等待调试面板，取消它
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
    
    if (e.touches.length === 1 && this.isDragging) {
      const deltaX = e.touches[0].clientX - this.lastMouseX;
      const deltaY = e.touches[0].clientY - this.lastMouseY;
      
      this.yaw -= deltaX * 0.5;
      this.pitch += deltaY * 0.5;
      this.pitch = Math.max(-90, Math.min(90, this.pitch));
      
      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;
      
      this.updateCamera();
    } else if (e.touches.length === 2 && this.isPinching) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const delta = this.lastTouchDistance - distance;
      this.fov += delta * 0.5;
      this.fov = Math.max(30, Math.min(120, this.fov));
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
      
      this.lastTouchDistance = distance;
    }
  }

  private onTouchEnd(): void {
    this.isDragging = false;
    this.isPinching = false;
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    this.fov += e.deltaY * 0.1;
    this.fov = Math.max(30, Math.min(120, this.fov));
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
    
    // 缩放时发出交互信号
    interactionBus.emitInteracting();
    
    // 调试模式：实时更新调试面板
    if (this.debugMode && this.onDebugClick) {
      const view = this.getCurrentView();
      // 这里不触发显示，只是更新（如果面板已显示）
    }
  }

  private updateCamera(): void {
    const yawRad = THREE.MathUtils.degToRad(this.yaw);
    const pitchRad = THREE.MathUtils.degToRad(this.pitch);
    
    const x = Math.cos(pitchRad) * Math.sin(yawRad);
    const y = Math.sin(pitchRad);
    const z = Math.cos(pitchRad) * Math.cos(yawRad);
    
    this.camera.lookAt(x, y, z);
  }

  /**
   * 加载场景全景图
   * 
   * 资源加载策略：
   * - thumb: 列表/预览（不在此处加载）
   * - panoLow: 首屏快速加载（优先）
   * - pano: 高清替换（后台加载）
   * - video: 点击热点后才加载（不在此处加载）
   * 
   * 支持渐进式加载：先加载低清图（panoLow），再无缝替换为高清图（pano）
   */
  loadScene(sceneData: Scene): void {
    // 重置状态
    this.isDegradedMode = false;
    this.updateLoadStatus(LoadStatus.LOADING_LOW);
    
    // 移除旧的球体
    if (this.sphere) {
      this.scene.remove(this.sphere);
      if (this.sphere.geometry) this.sphere.geometry.dispose();
      if (this.sphere.material && 'map' in this.sphere.material) {
        const material = this.sphere.material as THREE.MeshBasicMaterial;
        if (material.map) material.map.dispose();
        material.dispose();
      }
    }

    // 【最终铁律】所有来自 config.json 的 yaw（northYaw、initialView.yaw）都是【现实世界角度】
    // 内部坐标系 yaw 方向与现实世界一致，直接使用：internalYaw = worldYaw
    
    // 设置初始视角（world yaw → internal yaw，直接使用，不取反）
    // 注意：如果 this.yaw 已经被 setView 设置过（例如来自 URL 参数），则不再覆盖
    const iv = sceneData.initialView;
    const worldInitialYaw = iv.yaw || 0;
    // 只有在 yaw 为初始值（0）或未设置时才使用 initialView.yaw
    // 这样可以保留 URL 参数或 setView 设置的值
    if (this.yaw === 0 && worldInitialYaw !== 0) {
      this.yaw = worldInitialYaw; // 直接使用：现实世界 = 内部坐标系
    }
    // pitch 方向：现实世界向下为正，内部向上为正，需要取反
    const worldInitialPitch = iv.pitch || 0;
    this.pitch = -worldInitialPitch;
    const preset = RENDER_PRESETS[this.renderProfile];
    this.fov = iv.fov !== undefined ? iv.fov : preset.camera.defaultFov;
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
    this.updateCamera();
    
    // 初始化视角检测状态
    this.lastYaw = this.yaw;
    this.lastPitch = this.pitch;
    this.lastFov = this.fov;
    this.isViewChanging = false;

    // 统一世界北方向计算（world yaw → internal yaw）
    // - 若 scene.northYaw 已存在，用它
    // - 否则，使用 initialView.yaw 作为世界北
    const worldNorthYaw =
      typeof sceneData.northYaw === 'number'
        ? sceneData.northYaw
        : sceneData.initialView?.yaw ?? 0;
    
    // 统一世界 → 内部 yaw（直接使用，不取反）
    const northYaw = worldNorthYaw;
    
    // 只做一次传递（不要再计算，不要在组件里再 fallback 或再取反）
    if (this.nadirPatch) {
      this.nadirPatch.setNorthYaw(northYaw);
    }
    if (this.compassDisk) {
      this.compassDisk.setSceneId(sceneData.id);
      this.compassDisk.setNorthYaw(northYaw);
    }
    if (this.groundHeading) {
      this.groundHeading.setNorthYaw(northYaw);
    }

    // 创建球体几何
    const geometry = new THREE.SphereGeometry(500, 64, 64);
    geometry.scale(-1, 1, 1); // 内表面

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    
    // 解析资源 URL（统一处理）
    const panoLowUrl = resolveAssetUrl(sceneData.panoLow, AssetType.PANO_LOW);
    const panoUrl = resolveAssetUrl(sceneData.pano, AssetType.PANO);
    
    // 如果只提供了 pano，直接加载（作为高清图）
    if (!panoLowUrl && panoUrl) {
      this.loadSingleTexture(loader, geometry, panoUrl, false);
      return;
    }
    
    // 如果只提供了 panoLow，直接加载（作为低清图）
    if (panoLowUrl && !panoUrl) {
      this.loadSingleTexture(loader, geometry, panoLowUrl, true);
      return;
    }
    
    // 如果两者都提供了，先加载低清，再替换高清
    if (panoLowUrl && panoUrl) {
      this.loadProgressiveTextures(loader, geometry, panoLowUrl, panoUrl);
      return;
    }
    
    // 如果都没有提供，报错
    this.updateLoadStatus(LoadStatus.ERROR);
    if (this.onErrorCallback) {
      this.onErrorCallback(new Error('场景未提供全景图 URL'));
    }
  }

  /**
   * 加载单个纹理（传统方式）
   * @param loader Three.js 纹理加载器
   * @param geometry 球体几何体
   * @param url 图片 URL
   * @param isLowRes 是否为低清图（用于状态标记）
   */
  private loadSingleTexture(
    loader: THREE.TextureLoader,
    geometry: THREE.SphereGeometry,
    url: string,
    isLowRes: boolean
  ): void {
    if (isLowRes) {
      this.updateLoadStatus(LoadStatus.LOADING_LOW);
    } else {
      this.updateLoadStatus(LoadStatus.LOADING_HIGH);
    }

    loader.load(
      url,
      (texture) => {
        this.applyTextureSettings(texture);
        this.warnIfNotPanoAspect(texture, url);
        
        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
        
        // 更新状态
        if (isLowRes) {
          this.updateLoadStatus(LoadStatus.LOW_READY);
        } else {
          this.updateLoadStatus(LoadStatus.HIGH_READY);
        }
        
        // 触发加载完成回调
        if (this.onLoadCallback) {
          this.onLoadCallback();
        }
      },
      undefined,
      (error) => {
        console.error('加载全景图失败:', url, error);
        this.updateLoadStatus(LoadStatus.ERROR);
        if (this.onErrorCallback) {
          this.onErrorCallback(new Error(`加载全景图失败：${url}`));
        }
      }
    );
  }

  /**
   * 渐进式加载：先加载低清图，再无缝替换为高清图
   * 替换时保持当前视角（yaw/pitch/fov）不变
   * 
   * 失败兜底策略：
   * - 低清图失败：尝试加载高清图
   * - 高清图失败：保留低清图，标记为降级模式
   */
  private loadProgressiveTextures(
    loader: THREE.TextureLoader,
    geometry: THREE.SphereGeometry,
    panoLowUrl: string,
    panoUrl: string
  ): void {
    // 第一步：加载低清图（首屏快速显示）
    this.updateLoadStatus(LoadStatus.LOADING_LOW);
    
    loader.load(
      panoLowUrl,
      (lowTexture) => {
        this.applyTextureSettings(lowTexture);
        this.warnIfNotPanoAspect(lowTexture, panoLowUrl);
        
        const material = new THREE.MeshBasicMaterial({ map: lowTexture });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
        
        // 低清图加载完成，更新状态
        this.updateLoadStatus(LoadStatus.LOW_READY);
        
        // 低清图加载完成，触发加载回调（用户可以开始交互）
        if (this.onLoadCallback) {
          this.onLoadCallback();
        }
        
        // 第二步：后台加载高清图（无缝替换）
        this.updateLoadStatus(LoadStatus.LOADING_HIGH);
        
        loader.load(
          panoUrl,
          (highTexture) => {
            // 高清图加载成功，无缝替换
            this.applyTextureSettings(highTexture);
            this.warnIfNotPanoAspect(highTexture, panoUrl);
            
            // 保存当前视角（确保替换时视角不变）
            const currentView = this.getCurrentView();
            
            // 替换纹理
            if (this.sphere && this.sphere.material && 'map' in this.sphere.material) {
              const material = this.sphere.material as THREE.MeshBasicMaterial;
              // 释放旧纹理
              if (material.map) {
                material.map.dispose();
              }
              // 设置新纹理
              material.map = highTexture;
              material.needsUpdate = true;
            }
            
            // 确保视角没有被重置
            this.setView(currentView.yaw, currentView.pitch, currentView.fov);
            
            // 更新状态：高清图已加载完成
            this.updateLoadStatus(LoadStatus.HIGH_READY);
            this.isDegradedMode = false;
          },
          undefined,
          (error) => {
            // 高清图加载失败，继续使用低清图（降级模式）
            console.error('高清全景图加载失败，继续使用低清图:', panoUrl, error);
            this.isDegradedMode = true;
            this.updateLoadStatus(LoadStatus.DEGRADED);
            // 注意：这里不调用 onErrorCallback，因为低清图已经加载成功，用户可以正常使用
          }
        );
      },
      undefined,
      (error) => {
        // 低清图加载失败，尝试加载高清图作为兜底
        console.error('低清全景图加载失败，尝试加载高清图:', panoLowUrl, error);
        this.loadSingleTexture(loader, geometry, panoUrl, false);
      }
    );
  }

  /**
   * 设置加载完成回调（低清图加载完成时触发，用户可以开始交互）
   */
  setOnLoad(callback: () => void): void {
    this.onLoadCallback = callback;
  }

  /**
   * 设置错误回调（所有资源加载失败时触发）
   */
  setOnError(callback: (error: Error) => void): void {
    this.onErrorCallback = callback;
  }

  /**
   * 设置加载状态变化回调（用于 UI 更新）
   */
  setOnStatusChange(callback: (status: LoadStatus) => void): void {
    this.onStatusChangeCallback = callback;
  }

  /**
   * 获取当前加载状态
   */
  getLoadStatus(): LoadStatus {
    return this.loadStatus;
  }

  /**
   * 是否处于降级模式（高清加载失败，使用低清）
   */
  isInDegradedMode(): boolean {
    return this.isDegradedMode;
  }

  /**
   * 更新加载状态并触发回调
   */
  private updateLoadStatus(status: LoadStatus): void {
    this.loadStatus = status;
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(status);
    }
  }

  getCurrentView(): { yaw: number; pitch: number; fov: number } {
    return { yaw: this.yaw, pitch: this.pitch, fov: this.fov };
  }

  setView(yaw: number, pitch: number, fov?: number): void {
    this.yaw = yaw;
    this.pitch = Math.max(-90, Math.min(90, pitch));
    if (fov !== undefined) {
      this.fov = Math.max(30, Math.min(120, fov));
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
    }
    this.updateCamera();
  }

  private handleResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const now = performance.now();
    const dtMs = this.lastFrameTimeMs ? now - this.lastFrameTimeMs : 16.7;
    this.lastFrameTimeMs = now;

    // 检测视角变化（用于 UI 自动让位）
    const view = this.getCurrentView();
    const yawDelta = Math.abs(view.yaw - this.lastYaw);
    const pitchDelta = Math.abs(view.pitch - this.lastPitch);
    const fovDelta = Math.abs(view.fov - this.lastFov);
    const isChanging = yawDelta > this.viewChangeThreshold || 
                       pitchDelta > this.viewChangeThreshold || 
                       fovDelta > this.viewChangeThreshold;

    if (isChanging) {
      if (!this.isViewChanging) {
        this.isViewChanging = true;
        interactionBus.emitInteracting();
      }
    } else {
      if (this.isViewChanging) {
        this.isViewChanging = false;
        interactionBus.scheduleIdle();
      }
    }

    this.lastYaw = view.yaw;
    this.lastPitch = view.pitch;
    this.lastFov = view.fov;

    // 关键：每帧更新相机，确保热点和罗盘使用最新的相机状态（无延迟）
    this.updateCamera();

    // 更新 nadir patch（低头时渐显 + yaw 罗盘旋转）
    if (this.nadirPatch) {
      this.nadirPatch.update(this.camera, { yaw: view.yaw, pitch: view.pitch }, dtMs);
    }

    // 更新指南针圆盘
    if (this.compassDisk) {
      this.compassDisk.setYawPitch(view.yaw, view.pitch);
    }

    // 更新地面导航点
    if (this.groundNavDots) {
      this.groundNavDots.setYawPitch(view.yaw, view.pitch);
    }

    // 更新地面方向标
    if (this.groundHeading) {
      this.groundHeading.setYawPitch(view.yaw, view.pitch);
    }

    // 更新热点（必须在相机更新后，使用最新的相机状态）
    for (const listener of this.frameListeners) {
      listener(dtMs);
    }
    this.renderer.render(this.scene, this.camera);
  }
  private lastFrameTimeMs: number | null = null;

  /**
   * 每一帧（render 前）触发，用于 DOM Overlay（热点等）更新
   */
  onFrame(listener: (dtMs: number) => void): () => void {
    this.frameListeners.push(listener);
    return () => {
      const idx = this.frameListeners.indexOf(listener);
      if (idx >= 0) this.frameListeners.splice(idx, 1);
    };
  }

  /**
   * 暴露相机：用于将 world position 投影到屏幕（DOM Overlay 热点）
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  /**
   * 获取 DOM 元素（用于拾取模式等）
   */
  getDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  /**
   * 设置场景数据（用于 GroundNavDots）
   */
  setSceneData(museumId: string, currentSceneId: string, sceneHotspots: SceneHotspot[]): void {
    if (this.groundNavDots) {
      // 过滤出 type=scene 且 target.sceneId 存在的热点
      const sceneHotspotsFiltered = sceneHotspots
        .filter((hotspot) => hotspot.type === 'scene' && hotspot.target?.sceneId)
        .map((hotspot) => ({
          id: hotspot.id,
          label: hotspot.label,
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
          target: {
            museumId: hotspot.target!.museumId!,
            sceneId: hotspot.target!.sceneId!,
          },
        }));
      
      this.groundNavDots.updateScene(museumId, currentSceneId, sceneHotspotsFiltered);
    }
  }

  /**
   * 获取球体半径
   */
  getSphereRadius(): number {
    return 500;
  }

  /**
   * 当前渲染尺寸（与 canvas 一致）
   */
  getViewportSize(): { width: number; height: number } {
    return { width: this.container.clientWidth, height: this.container.clientHeight };
  }

  /**
   * 启用拾取模式
   */
  enablePickMode(): void {
    if (this.pickMode) return;
    this.pickMode = true;
    this.setupPickModeListeners();
  }

  /**
   * 禁用拾取模式
   */
  disablePickMode(): void {
    if (!this.pickMode) return;
    this.pickMode = false;
    this.removePickModeListeners();
  }

  /**
   * 切换拾取模式
   * @returns 当前是否启用
   */
  togglePickMode(): boolean {
    if (this.pickMode) {
      this.disablePickMode();
    } else {
      this.enablePickMode();
    }
    return this.pickMode;
  }

  /**
   * 获取拾取模式状态
   */
  isPickModeEnabled(): boolean {
    return this.pickMode;
  }

  /**
   * 设置拾取模式监听器
   */
  private setupPickModeListeners(): void {
    const dom = this.renderer.domElement;

    const onPointerDown = (e: PointerEvent | MouseEvent | TouchEvent) => {
      if (!this.pickMode) return;

      let clientX: number;
      let clientY: number;

      if (e instanceof TouchEvent) {
        if (e.touches.length !== 1) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      this.pickStartX = clientX;
      this.pickStartY = clientY;
      this.pickStartTime = Date.now();
      this.pickHasMoved = false;
    };

    const onPointerMove = (e: PointerEvent | MouseEvent | TouchEvent) => {
      if (!this.pickMode) return;

      let clientX: number;
      let clientY: number;

      if (e instanceof TouchEvent) {
        if (e.touches.length !== 1) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = Math.abs(clientX - this.pickStartX);
      const dy = Math.abs(clientY - this.pickStartY);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > this.pickDragThreshold) {
        this.pickHasMoved = true;
      }
    };

    const onPointerUp = (e: PointerEvent | MouseEvent | TouchEvent) => {
      if (!this.pickMode) return;

      let clientX: number;
      let clientY: number;

      if (e instanceof TouchEvent) {
        if (e.changedTouches.length !== 1) return;
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const elapsed = Date.now() - this.pickStartTime;
      const dx = Math.abs(clientX - this.pickStartX);
      const dy = Math.abs(clientY - this.pickStartY);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 判定是否为拖动：移动距离 > 阈值 或 按下时间 > 阈值且发生了移动
      const isDrag = distance > this.pickDragThreshold || (elapsed > this.pickTimeThreshold && this.pickHasMoved);

      if (!isDrag) {
        // 认为是点击拾取
        this.handlePick(clientX, clientY);
      }

      // 重置状态
      this.pickHasMoved = false;
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('mousemove', onPointerMove);
    dom.addEventListener('touchmove', onPointerMove, { passive: true });
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('touchend', onPointerUp, { passive: true });

    this.pickModeListeners.push(() => {
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('mousedown', onPointerDown);
      dom.removeEventListener('touchstart', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('mousemove', onPointerMove);
      dom.removeEventListener('touchmove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchend', onPointerUp);
    });
  }

  /**
   * 移除拾取模式监听器
   */
  private removePickModeListeners(): void {
    this.pickModeListeners.forEach((remove) => remove());
    this.pickModeListeners = [];
  }

  /**
   * 处理拾取点击
   */
  private handlePick(clientX: number, clientY: number): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = screenToNDC(clientX, clientY, rect);
    const result = getYawPitchFromNDC(ndc.x, ndc.y, this.camera, this.getSphereRadius());

    // 使用 ray.direction 计算，理论上不会返回 null，但做防御性检查
    if (!result) {
      // 只在 debug 模式输出，避免生产环境日志污染
      if (typeof __VR_DEBUG__ !== 'undefined' && __VR_DEBUG__) {
        console.debug('[pick] 未能计算 yaw/pitch（ray.direction 为空）');
      }
      return;
    }

    const { yaw, pitch } = result;
    const text = `yaw: ${yaw.toFixed(2)}, pitch: ${pitch.toFixed(2)}`;

    // 输出到 console
    console.log(`[pick] yaw=${yaw.toFixed(2)}, pitch=${pitch.toFixed(2)}`);

    // 复制到剪贴板（best-effort）
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {
        // 忽略失败
      });
    }

    // 触发自定义事件，让外部 UI 显示 toast 和标记
    window.dispatchEvent(
      new CustomEvent('vr:pick', {
        detail: { x: clientX, y: clientY, yaw, pitch },
      })
    );
  }

  /**
   * 如果全景图比例不是 2:1，打印警告但不阻塞加载
   */
  private warnIfNotPanoAspect(texture: THREE.Texture, url: string): void {
    if (!texture.image) return;
    const image: any = texture.image;
    const width = image.width;
    const height = image.height;
    if (!width || !height) return;
    const ratio = width / height;
    const tolerance = 0.02; // 允许少量浮动
    if (Math.abs(ratio - 2) > tolerance && !this.aspectWarnedUrls.has(url)) {
      console.warn(
        `[PanoViewer] 全景图比例不是 2:1，可能出现轻微变形（实际 ${ratio.toFixed(
          2
        )}），来源: ${url}`
      );
      this.aspectWarnedUrls.add(url);
    }
  }

  dispose(): void {
    if (this.sphere) {
      this.scene.remove(this.sphere);
      if (this.sphere.geometry) this.sphere.geometry.dispose();
      if (this.sphere.material && 'map' in this.sphere.material) {
        const material = this.sphere.material as THREE.MeshBasicMaterial;
        if (material.map) material.map.dispose();
        material.dispose();
      }
    }
    if (this.nadirPatch) {
      this.nadirPatch.dispose(this.scene);
      this.nadirPatch = null;
    }
    if (this.compassDisk) {
      this.compassDisk.dispose();
      this.compassDisk = null;
    }
    if (this.groundNavDots) {
      this.groundNavDots.dispose();
      this.groundNavDots = null;
    }
    if (this.groundHeading) {
      this.groundHeading.dispose();
      this.groundHeading = null;
    }
    if (this.brandWatermark) {
      this.brandWatermark.dispose();
      this.brandWatermark = null;
    }
    this.renderer.dispose();
    window.removeEventListener('resize', () => this.handleResize());
  }

  /**
   * 根据预设应用渲染器参数（用于原始/研学优化对比）
   */
  private applyRendererProfile(): void {
    const preset = RENDER_PRESETS[this.renderProfile];
    this.renderer.setPixelRatio(preset.renderer.pixelRatio);
    if ('outputColorSpace' in this.renderer) {
      (this.renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    } else {
      (this.renderer as any).outputEncoding = THREE.sRGBEncoding;
    }
    this.renderer.toneMapping = preset.renderer.toneMapping;
    this.renderer.toneMappingExposure = preset.renderer.toneMappingExposure;
    if (preset.renderer.clearColor) {
      this.renderer.setClearColor(preset.renderer.clearColor.color, preset.renderer.clearColor.alpha);
    }
  }

  /**
   * 从 URL 参数检测渲染档位（默认 Original，支持 ?render=enhanced）
   */
  private detectRenderProfile(): RenderProfile {
    try {
      const params = new URLSearchParams(window.location.search);
      const render = params.get('render');
      if (render && render.toLowerCase() === RenderProfile.Original) {
        return RenderProfile.Original;
      }
    } catch {
      // 忽略解析错误，保持默认
    }
    return RenderProfile.Enhanced;
  }

  private applyTextureSettings(texture: THREE.Texture): void {
    const preset = RENDER_PRESETS[this.renderProfile];
    const maxAniso = (this.renderer.capabilities as any).getMaxAnisotropy
      ? this.renderer.capabilities.getMaxAnisotropy()
      : 1;
    texture.anisotropy = Math.min(preset.texture.anisotropyLimit, Math.max(1, maxAniso || 1));
    texture.minFilter = preset.texture.minFilter;
    texture.magFilter = preset.texture.magFilter;
    texture.generateMipmaps = preset.texture.generateMipmaps;
    if ('colorSpace' in texture) {
      (texture as any).colorSpace = THREE.SRGBColorSpace;
    } else {
      (texture as any).encoding = THREE.sRGBEncoding;
    }
    texture.needsUpdate = true;

    if (this.debugMode) {
      const img: any = texture.image || {};
      console.log('pano texture', {
        w: img.width,
        h: img.height,
        colorSpace: (texture as any).colorSpace,
        encoding: (texture as any).encoding,
        anisotropy: texture.anisotropy,
        minFilter: texture.minFilter,
        magFilter: texture.magFilter
      });
    }
  }
}











