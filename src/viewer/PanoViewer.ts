import * as THREE from 'three';
import type { Scene, InitialView } from '../types/config';
import { resolveAssetUrl, AssetType } from '../utils/assetResolver';
import { LoadStatus } from '../ui/QualityIndicator';
import { getPreferredQuality } from '../utils/qualityPreference';
import { NadirPatch } from './NadirPatch';
import { getYawPitchFromNDC, screenToNDC } from './picking';
import { CompassDisk } from '../ui/CompassDisk';
import { GroundNavDots } from '../ui/GroundNavDots';
import { GroundHeadingMarker } from '../ui/GroundHeadingMarker';
import type { SceneHotspot } from '../types/config';
import { interactionBus } from '../ui/interactionBus';
import { loadExternalImageBitmap, ExternalImageLoadError } from '../utils/externalImage';
import { ZoomHud } from '../ui/ZoomHud';
import { showToast } from '../ui/toast';
import { TileCanvasPano } from './TileCanvasPano';
import { TileMeshPano } from './TileMeshPano';
import { fetchTileManifest } from './tileManifest';

type LoadMetrics = {
  sceneId: string;
  startAt: number;
  lowReadyAt: number;
  highReadyAt: number;
  tilesLoaded: number;
  tilesFailed: number;
  tilesRetries: number;
  tileHitRate: number;
  perfMode: 'normal' | 'throttle';
  renderSource: 'none' | 'fallback' | 'low' | 'tiles';
  lastError: string;
};

/**
 * 娓叉煋閰嶇疆妗ｄ綅锛堢敤浜庣敾闈㈠姣旓細鍘熷 vs 鐮斿浼樺寲锛? */
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
  // 科技增强显示参数
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
 * PanoViewer - 鍏ㄦ櫙鍥炬煡鐪嬪櫒
 * 
 * 璧勬簮鍔犺浇绛栫暐锛? * - thumb: 缂╃暐鍥撅紝鐢ㄤ簬鍒楄〃/棰勮锛堜笉鍦ㄦ澶勫姞杞斤級
 * - panoLow: 浣庢竻鍏ㄦ櫙鍥撅紝棣栧睆蹇€熷姞杞斤紙浼樺厛锛? * - pano: 楂樻竻鍏ㄦ櫙鍥撅紝鍚庡彴鍔犺浇鍚庢棤缂濇浛鎹? * - video: 瑙嗛璧勬簮锛岀偣鍑荤儹鐐瑰悗鎵嶅姞杞斤紙涓嶅湪姝ゅ鍔犺浇锛? */
export class PanoViewer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private sphere: THREE.Mesh | null = null;
  private tilePano: TileCanvasPano | TileMeshPano | null = null;
  private fallbackSphere: THREE.Mesh | null = null;
  private container: HTMLElement;
  private frameListeners: Array<(dtMs: number) => void> = [];
  private nadirPatch: NadirPatch | null = null;
  private compassDisk: CompassDisk | null = null;
  private groundNavDots: GroundNavDots | null = null;
  private groundHeading: GroundHeadingMarker | null = null;
  // Enhanced 为默认科学展示，Original 为保守备用。
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
  private tilesDebugEl: HTMLDivElement | null = null;
  private tilesVisibleStableFrames = 0;
  private tilesLastError = '';
  private tilesLowReady = false;
  private tilesLastLoadedCount = 0;
  private tilesLastProgressAt = 0;
  private tilesHighStartAt = 0;
  private tilesDegradedNotified = false;
  private longPressThreshold = 500; // 长按阈值（毫秒）
  private renderSource: 'none' | 'fallback' | 'low' | 'tiles' = 'none';
  private perfSamples: number[] = [];
  private perfMode: 'normal' | 'throttle' = 'normal';
  private perfLastChangeAt = 0;
  private renderSwitchReason = '';
  private clearedCount = 0;
  private aspectWarnedUrls = new Set<string>();
  private metrics: LoadMetrics = {
    sceneId: '',
    startAt: 0,
    lowReadyAt: 0,
    highReadyAt: 0,
    tilesLoaded: 0,
    tilesFailed: 0,
    tilesRetries: 0,
    tileHitRate: 0,
    perfMode: 'normal',
    renderSource: 'none',
    lastError: '',
  };
  private lastMetricsEmitAt = 0;
  
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
  // 交互检测（用于 UI 自动定位）
  private lastYaw: number = 0;
  private lastPitch: number = 0;
  private lastFov: number = 75;
  private isViewChanging: boolean = false;
  private viewChangeThreshold: number = 0.5; // 瑙嗚鍙樺寲闃堝€硷紙搴︼級

  // VR 模式标记（需用拖拽控制）
  private vrModeEnabled = false;

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

    // Nadir patch：补丁不影响全景主材质
    this.nadirPatch = new NadirPatch(this.scene, 500);
    
    // 指南针圆盘（DOM overlay，可强制关闭）
    this.compassDisk = new CompassDisk();
    this.compassDisk.mount(container);
    this.compassDisk.getElement().style.display = 'none';
    
    // 地面导航点（DOM overlay，初始为空，后续通过 setSceneData 设置，可强制关闭）
    this.groundNavDots = new GroundNavDots({
      museumId: '',
      currentSceneId: '',
      sceneHotspots: [],
    });
    this.groundNavDots.mount(container);
    this.groundNavDots.getElement().style.display = 'none';
    
    // 地面方向标（DOM overlay，可强制关闭）
    this.groundHeading = new GroundHeadingMarker(container);
    this.groundHeading.getElement().style.display = 'none';
    
    // 背景蒙版右移由 main.ts 统一管理，避免重复显示
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
   * 璋冭瘯妯″紡涓嬬殑鐐瑰嚮澶勭悊
   */
  private handleDebugClick(x: number, y: number): void {
    if (this.onDebugClick && this.debugMode) {
      const view = this.getCurrentView();
      this.onDebugClick(x, y, view.yaw, view.pitch, view.fov);
    }
  }
  
  /**
   * 璁剧疆璋冭瘯鐐瑰嚮鍥炶皟
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
    
    this.yaw += deltaX * 0.5;
    this.pitch += deltaY * 0.5;
    this.pitch = Math.max(-90, Math.min(90, this.pitch));
    
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    
    this.updateCamera();
    
    // 调试模式：实时更新调试面板
    if (this.debugMode && this.onDebugClick) {
      const view = this.getCurrentView();
      this.onDebugClick(this.lastMouseX, this.lastMouseY, view.yaw, view.pitch, view.fov);
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
    
    // 单指拖拽控制（VR模式下也允许）
    if (e.touches.length === 1 && this.isDragging) {
      const deltaX = e.touches[0].clientX - this.lastMouseX;
      const deltaY = e.touches[0].clientY - this.lastMouseY;
      
      this.yaw += deltaX * 0.5;
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
      const newFov = this.fov + delta * 0.5;
      this.setFovInternal(newFov);
      
      this.lastTouchDistance = distance;
    }
  }

  private onTouchEnd(): void {
    this.isDragging = false;
    this.isPinching = false;
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const newFov = this.fov + e.deltaY * 0.1;
    this.setFovInternal(newFov);
    
    // 缩放时发出交互信号
    interactionBus.emitInteracting();
    
    // 调试模式：实时更新调试面板
    if (this.debugMode && this.onDebugClick) {
      const view = this.getCurrentView();
      this.onDebugClick(this.lastMouseX, this.lastMouseY, view.yaw, view.pitch, view.fov);
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
   * 鍔犺浇鍦烘櫙鍏ㄦ櫙鍥?   * 
   * 璧勬簮鍔犺浇绛栫暐锛?   * - thumb: 鍒楄〃/棰勮锛堜笉鍦ㄦ澶勫姞杞斤級
   * - panoLow: 棣栧睆蹇€熷姞杞斤紙浼樺厛锛?   * - pano: 楂樻竻鏇挎崲锛堝悗鍙板姞杞斤級
   * - video: 鐐瑰嚮鐑偣鍚庢墠鍔犺浇锛堜笉鍦ㄦ澶勫姞杞斤級
   * 
   * 鏀寔娓愯繘寮忓姞杞斤細鍏堝姞杞戒綆娓呭浘锛坧anoLow锛夛紝鍐嶆棤缂濇浛鎹负楂樻竻鍥撅紙pano锛?   */
  loadScene(sceneData: Scene, options?: { preserveView?: boolean }): void {
    // 重置状态
    this.isDegradedMode = false;
    this.resetMetrics(sceneData.id);
    this.updateLoadStatus(LoadStatus.LOADING_LOW);
    this.renderSource = 'none';
    this.clearedCount = 0;
    
    //
    // 移除旧的几何体
    if (this.tilePano) {
      this.tilePano.dispose();
      this.tilePano = null;
    }
    this.clearFallback();
    if (this.sphere) {
      this.scene.remove(this.sphere);
      if (this.sphere.geometry) this.sphere.geometry.dispose();
      if (this.sphere.material && 'map' in this.sphere.material) {
        const material = this.sphere.material as THREE.MeshBasicMaterial;
        if (material.map) material.map.dispose();
        material.dispose();
      }
    }

    // 【最终产品定义】所有来自 config.json 的 yaw（northYaw、initialView.yaw）都是世界角
    // 进入渲染/罗盘系统前统一取反一次：internalYaw = -worldYaw
    // preserveView = true 时，切换场景保持当前视角，不重置 yaw/pitch/fov
    const preserveView = options?.preserveView === true;
    if (!preserveView) {
      // 设置初始视角（world yaw -> internal yaw）
      // 注意：如果 this.yaw 已被 setView/URL 参数设置，则不再覆盖
      const iv = sceneData.initialView;
      const worldInitialYaw = iv.yaw || 0;
      if (this.yaw === 0 && worldInitialYaw !== 0) {
        this.yaw = -worldInitialYaw; // 统一取反：世界 -> 内部
      }
      this.pitch = iv.pitch || 0;
      const preset = RENDER_PRESETS[this.renderProfile];
      this.fov = iv.fov !== undefined ? iv.fov : preset.camera.defaultFov;
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
      this.updateCamera();
      // 注意：loadScene 初始化时不显示 HUD，避免启动闪屏
    }
    // 初始化视角监测状态
    this.lastYaw = this.yaw;
    this.lastPitch = this.pitch;
    this.lastFov = this.fov;
    this.isViewChanging = false;

    // 统一 world yaw -> internal yaw（只做一次反转）
    const worldNorthYaw =
      typeof sceneData.northYaw === 'number'
        ? sceneData.northYaw
        : sceneData.initialView?.yaw ?? 0;
    
    const northYaw = -worldNorthYaw;
    
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

    //
    // 创建几何体
    const geometry = new THREE.SphereGeometry(500, 64, 64);
    geometry.scale(-1, 1, 1); // 内表面

    // 瓦片优先：若配置了 panoTiles，则走瓦片加载，失败时自动回退到传统全景
    const tilesConfig = (sceneData as any).panoTiles;
    if (tilesConfig?.manifest) {
      const manifestUrl = resolveAssetUrl(tilesConfig.manifest, AssetType.PANO);
      const fallbackUrlLow = tilesConfig.fallbackPanoLow || sceneData.panoLow;
      const fallbackUrlHigh = tilesConfig.fallbackPano || sceneData.pano;
      const fallbackPlanned = Boolean(fallbackUrlLow || fallbackUrlHigh);
      this.tilesVisibleStableFrames = 0;
      this.tilesLastError = '';
      this.tilesLowReady = false;
      this.tilesLastLoadedCount = 0;
      this.tilesLastProgressAt = performance.now();
      this.tilesHighStartAt = 0;
      this.tilesDegradedNotified = false;
      if (fallbackUrlLow) {
        this.showFallbackTexture(resolveAssetUrl(fallbackUrlLow, AssetType.PANO_LOW), geometry, true);
      } else if (fallbackUrlHigh) {
        this.showFallbackTexture(resolveAssetUrl(fallbackUrlHigh, AssetType.PANO), geometry, false);
      }
      const onFirstDraw = () => {
        if (!this.tilesLowReady) {
          this.tilesLowReady = true;
          this.updateLoadStatus(LoadStatus.LOW_READY);
          this.setRenderSource('low', 'tiles 首屏可见');
          if (this.onLoadCallback) this.onLoadCallback();
        }
        if (this.loadStatus !== LoadStatus.HIGH_READY) {
          this.updateLoadStatus(LoadStatus.LOADING_HIGH);
        }
      };
      const onHighReady = () => {
        this.updateLoadStatus(LoadStatus.HIGH_READY);
        this.setRenderSource('tiles', 'tiles 高清可见');
        this.isDegradedMode = false;
      };
      fetchTileManifest(manifestUrl)
        .then((manifest) => {
          // KTX2 走 Mesh 渲染，其它格式走 Canvas 拼接
          this.tilePano = manifest.tileFormat === 'ktx2'
            ? new TileMeshPano(this.scene, this.renderer, onFirstDraw, onHighReady)
            : new TileCanvasPano(
                this.scene,
                onFirstDraw,
                onHighReady,
                this.renderer.capabilities.maxTextureSize || 0
              );
          if (this.tilePano && 'setPerformanceMode' in this.tilePano) {
            (this.tilePano as any).setPerformanceMode(this.perfMode);
          }
          return this.tilePano.load(manifest, {
            fallbackVisible: fallbackPlanned,
          });
        })
        .then(() => {
          if (!this.tilesLowReady) {
            this.tilesLowReady = true;
            this.updateLoadStatus(LoadStatus.LOW_READY);
            if (this.onLoadCallback) this.onLoadCallback();
          }
          this.tilePano?.prime(this.camera);
        })
        .catch((err) => {
          console.error('瓦片加载失败，回退传统全景', err);
          this.tilesLastError = err instanceof Error ? err.message : String(err);
          showToast('瓦片加载失败，已回退到全景图', 2000);
          this.fallbackToLegacy(sceneData, tilesConfig);
        });
      return;
    }

    //
    // 解析资源 URL（统一处理）
    const panoLowUrl = resolveAssetUrl(sceneData.panoLow, AssetType.PANO_LOW);
    const panoUrl = resolveAssetUrl(sceneData.pano, AssetType.PANO);

    const quality = getPreferredQuality();
    
    // 画质策略：low 仅加载 panoLow；high 按渐进策略加载
    if (quality === 'low') {
      if (panoLowUrl) {
        this.loadSingleTexture(geometry, panoLowUrl, true);
        return;
      }
      if (panoUrl) {
        this.loadSingleTexture(geometry, panoUrl, false);
        return;
      }
    } else {
      //
    // 如果只提供 pano，则直接加载（高分辨率）
      if (!panoLowUrl && panoUrl) {
        this.loadSingleTexture(geometry, panoUrl, false);
        return;
      }
      
      // 如果只提供 panoLow，则直接加载（低分辨率）
      if (panoLowUrl && !panoUrl) {
        this.loadSingleTexture(geometry, panoLowUrl, true);
        return;
      }
      
      // 若两者都提供，先加载低清，再切换高清
      if (panoLowUrl && panoUrl) {
        this.loadProgressiveTextures(geometry, panoLowUrl, panoUrl);
        return;
      }
    }
    
    // 如果都未提供，抛错
    this.updateLoadStatus(LoadStatus.ERROR);
    if (this.onErrorCallback) {
      this.onErrorCallback(new Error('场景未提供全景图 URL'));
    }
  }

  /**
   * 鍔犺浇鍗曚釜绾圭悊锛堜娇鐢ㄥ閾惧浘鐗囧姞杞藉櫒锛?   * @param geometry 鐞冧綋鍑犱綍浣?   * @param url 鍥剧墖 URL
   * @param isLowRes 鏄惁涓轰綆娓呭浘锛堢敤浜庣姸鎬佹爣璁帮級
   */
  private async loadSingleTexture(
    geometry: THREE.SphereGeometry,
    url: string,
    isLowRes: boolean
  ): Promise<void> {
    if (isLowRes) {
      this.updateLoadStatus(LoadStatus.LOADING_LOW);
    } else {
      this.updateLoadStatus(LoadStatus.LOADING_HIGH);
    }

    try {
      // 使用外链图片加载器（含超时/重试）
      // 优先使用 Image() 原生加载，不用 fetch 底层
      const imageBitmap = await loadExternalImageBitmap(url, {
        timeoutMs: 15000,
        retries: 2,
        retryBaseDelayMs: 300,
        referrerPolicy: 'no-referrer',
        crossOrigin: 'anonymous',
        allowFetchFallback: false,
        priority: 'high',
        imageOrientation: 'flipY',
      });

      // 转为 THREE.Texture
      const texture = new THREE.CanvasTexture(imageBitmap);
      this.applyTextureSettings(texture);
      this.warnIfNotPanoAspect(texture, url);

      // 纯全景链路在解码阶段翻转，纹理阶段不再翻转，避免重复翻转导致倒立。
      texture.flipY = false;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;
      // --- end fix ---
      
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.sphere = new THREE.Mesh(geometry, material);
      this.scene.add(this.sphere);
      this.setRenderSource(isLowRes ? 'low' : 'tiles', isLowRes ? 'panoLow 可见' : 'pano 可见');
      
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
    } catch (error) {
      console.error('加载全景图失败', url, error);
      this.updateLoadStatus(LoadStatus.ERROR);
      if (this.onErrorCallback) {
        const errorMessage = error instanceof ExternalImageLoadError
          ? `加载全景图失败：${url} - ${error.message}`
          : `加载全景图失败：${url}`;
        this.onErrorCallback(new Error(errorMessage));
      }
    }
  }

  /**
   * 娓愯繘寮忓姞杞斤細鍏堝姞杞戒綆娓呭浘锛屽啀鏃犵紳鏇挎崲涓洪珮娓呭浘
   * 鏇挎崲鏃朵繚鎸佸綋鍓嶈瑙掞紙yaw/pitch/fov锛変笉鍙?   * 
   * 澶辫触鍏滃簳绛栫暐锛?   * - 浣庢竻鍥惧け璐ワ細灏濊瘯鍔犺浇楂樻竻鍥?   * - 楂樻竻鍥惧け璐ワ細淇濈暀浣庢竻鍥撅紝鏍囪涓洪檷绾фā寮忥紙涓嶈Е鍙戦敊璇洖璋冿紝涓嶅奖鍝嶇敤鎴蜂綋楠岋級
   */
  private async loadProgressiveTextures(
    geometry: THREE.SphereGeometry,
    panoLowUrl: string,
    panoUrl: string
  ): Promise<void> {
    // 第一步：加载低清图（首屏快速显示）
    this.updateLoadStatus(LoadStatus.LOADING_LOW);
    
    try {
      // 使用外链图片加载器加载低清（优先 Image 原生）
      const lowImageBitmap = await loadExternalImageBitmap(panoLowUrl, {
        timeoutMs: 15000,
        retries: 2,
        retryBaseDelayMs: 300,
        referrerPolicy: 'no-referrer',
        crossOrigin: 'anonymous',
        allowFetchFallback: false,
        priority: 'high',
        imageOrientation: 'flipY',
      });

      // 转为 THREE.Texture
      const lowTexture = new THREE.CanvasTexture(lowImageBitmap);
      this.applyTextureSettings(lowTexture);
      this.warnIfNotPanoAspect(lowTexture, panoLowUrl);
      
      // 纯全景链路在解码阶段翻转，纹理阶段不再翻转，避免重复翻转导致倒立。
      lowTexture.flipY = false;
      lowTexture.wrapS = THREE.ClampToEdgeWrapping;
      lowTexture.wrapT = THREE.ClampToEdgeWrapping;
      lowTexture.needsUpdate = true;
        // --- end fix ---
      
      const material = new THREE.MeshBasicMaterial({ map: lowTexture });
      this.sphere = new THREE.Mesh(geometry, material);
      this.scene.add(this.sphere);
      this.setRenderSource('low', 'panoLow 可见');
      
      // 低清加载完成，更新状态
      this.updateLoadStatus(LoadStatus.LOW_READY);
      
      // 低清加载完成，触发回调（用户可开始交互）
      if (this.onLoadCallback) {
        this.onLoadCallback();
      }
      
      // 第二步：后台加载高清（无缝切换）
      this.updateLoadStatus(LoadStatus.LOADING_HIGH);
      
      try {
        // 使用外链图片加载器加载高清（优先 Image 原生）
        const highImageBitmap = await loadExternalImageBitmap(panoUrl, {
          timeoutMs: 15000,
          retries: 2,
          retryBaseDelayMs: 300,
          referrerPolicy: 'no-referrer',
          crossOrigin: 'anonymous',
          allowFetchFallback: false,
          priority: 'low',
          imageOrientation: 'flipY',
        });
        
        // 转为 THREE.Texture
        const highTexture = new THREE.CanvasTexture(highImageBitmap);
        this.applyTextureSettings(highTexture);
        this.warnIfNotPanoAspect(highTexture, panoUrl);
        
        // 纯全景链路在解码阶段翻转，纹理阶段不再翻转，避免重复翻转导致倒立。
        highTexture.flipY = false;
        highTexture.wrapS = THREE.ClampToEdgeWrapping;
        highTexture.wrapT = THREE.ClampToEdgeWrapping;
        highTexture.needsUpdate = true;
          // --- end fix ---
        
        // 保存当前视角（保证切换时视角不变）
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
          this.setRenderSource('tiles', 'pano 高清可见');
        }
        
        // 保持当前视角不被重置
        this.setView(currentView.yaw, currentView.pitch, currentView.fov);

        // 更新状态：高清全景图就绪
        this.updateLoadStatus(LoadStatus.HIGH_READY);
        this.isDegradedMode = false;
      } catch (error) {
        // 高清加载失败，继续使用低清（降级模式），不再触发 onErrorCallback（低清已可用）
        console.error('高清全景图加载失败，继续使用低清', panoUrl, error);
        this.isDegradedMode = true;
        this.updateLoadStatus(LoadStatus.DEGRADED);
      }
    } catch (error) {
      // 低清加载失败，尝试直接加载高清兜底
      console.error('低清全景图加载失败，尝试加载高清兜底', panoLowUrl, error);
      await this.loadSingleTexture(geometry, panoUrl, false);
    }
  }

  /**
   * 璁剧疆鍔犺浇瀹屾垚鍥炶皟锛堜綆娓呭浘鍔犺浇瀹屾垚鏃惰Е鍙戯紝鐢ㄦ埛鍙互寮€濮嬩氦浜掞級
   */
  setOnLoad(callback: () => void): void {
    this.onLoadCallback = callback;
  }

  /**
   * 璁剧疆閿欒鍥炶皟锛堟墍鏈夎祫婧愬姞杞藉け璐ユ椂瑙﹀彂锛?   */
  setOnError(callback: (error: Error) => void): void {
    this.onErrorCallback = callback;
  }

  /**
   * 璁剧疆鍔犺浇鐘舵€佸彉鍖栧洖璋冿紙鐢ㄤ簬 UI 鏇存柊锛?   */
  setOnStatusChange(callback: (status: LoadStatus) => void): void {
    this.onStatusChangeCallback = callback;
  }

  /**
   * 鑾峰彇褰撳墠鍔犺浇鐘舵€?   */
  getLoadStatus(): LoadStatus {
    return this.loadStatus;
  }

  private resetMetrics(sceneId: string): void {
    const now = performance.now();
    this.metrics = {
      sceneId,
      startAt: now,
      lowReadyAt: 0,
      highReadyAt: 0,
      tilesLoaded: 0,
      tilesFailed: 0,
      tilesRetries: 0,
      tileHitRate: 0,
      perfMode: this.perfMode,
      renderSource: this.renderSource,
      lastError: '',
    };
    this.emitMetrics('reset', true);
  }

  private emitMetrics(reason: string, force = false): void {
    const now = performance.now();
    if (!force && now - this.lastMetricsEmitAt < 800) return;
    const status = this.tilePano?.getStatus();
    const tilesLoaded = status?.tilesLoadedCount ?? 0;
    const tilesFailed = (status as any)?.tilesFailedCount ?? 0;
    const tilesRetries = (status as any)?.tilesRetryCount ?? 0;
    const total = tilesLoaded + tilesFailed;
    const hitRate = total > 0 ? Number(((tilesLoaded / total) * 100).toFixed(2)) : 0;
    this.metrics.tilesLoaded = tilesLoaded;
    this.metrics.tilesFailed = tilesFailed;
    this.metrics.tilesRetries = tilesRetries;
    this.metrics.tileHitRate = hitRate;
    this.metrics.perfMode = this.perfMode;
    this.metrics.renderSource = this.renderSource;
    this.metrics.lastError = this.tilesLastError || (status?.lastError ?? '');
    const lowMs = this.metrics.lowReadyAt
      ? Math.round(this.metrics.lowReadyAt - this.metrics.startAt)
      : -1;
    const highMs = this.metrics.highReadyAt
      ? Math.round(this.metrics.highReadyAt - this.metrics.startAt)
      : -1;
    const payload = {
      ...this.metrics,
      lowReadyMs: lowMs,
      highReadyMs: highMs,
      reason,
      at: Math.round(now),
    };
    (window as any).__VR_METRICS__ = payload;
    window.dispatchEvent(new CustomEvent('vr:metrics', { detail: payload }));
    this.lastMetricsEmitAt = now;
  }

  /**
   * 鏄惁澶勪簬闄嶇骇妯″紡锛堥珮娓呭姞杞藉け璐ワ紝浣跨敤浣庢竻锛?   */
  isInDegradedMode(): boolean {
    return this.isDegradedMode;
  }

  /**
   * 鏇存柊鍔犺浇鐘舵€佸苟瑙﹀彂鍥炶皟
   */
  private updateLoadStatus(status: LoadStatus): void {
    if (this.loadStatus === status) return;
    this.loadStatus = status;
    const now = performance.now();
    if (status === LoadStatus.LOW_READY && this.metrics.lowReadyAt === 0) {
      this.metrics.lowReadyAt = now;
    }
    if (status === LoadStatus.HIGH_READY && this.metrics.highReadyAt === 0) {
      this.metrics.highReadyAt = now;
    }
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(status);
    }
    this.emitMetrics(`status:${status}`);
  }

  getCurrentView(): { yaw: number; pitch: number; fov: number } {
    return { yaw: this.yaw, pitch: this.pitch, fov: this.fov };
  }

  setView(yaw: number, pitch: number, fov?: number): void {
    this.yaw = yaw;
    this.pitch = Math.max(-90, Math.min(90, pitch));
    if (fov !== undefined) {
      this.setFovInternal(fov, false); // setView 鏃朵笉闇€瑕佹樉绀?HUD锛堥伩鍏嶅垵濮嬪寲鏃舵樉绀猴級
    }
    this.updateCamera();
  }

  /**
   * 缁熶竴鐨?FOV 璁剧疆鏂规硶锛堝唴閮ㄤ娇鐢級
   * @param fov 鏂扮殑 FOV 鍊?   * @param showHud 鏄惁鏄剧ず缂╂斁 HUD锛堥粯璁?true锛?   */
  private setFovInternal(fov: number, showHud: boolean = true): void {
    this.fov = Math.max(30, Math.min(120, fov));
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
    
    // 显示缩放 HUD
    if (showHud) {
      const defaultFov = RENDER_PRESETS[this.renderProfile].camera.defaultFov;
      const percent = Math.round((defaultFov / this.fov) * 100);
      const clamped = Math.max(50, Math.min(250, percent));
      ZoomHud.show(clamped);
    }
  }

  /**
   * 璁剧疆 FOV锛堝叕寮€鏂规硶锛岀敤浜庡閮ㄦ帶鍒剁缉鏀撅級
   * @param fov 鏂扮殑 FOV 鍊?   */
  setFov(fov: number): void {
    this.setFovInternal(fov, true);
  }

  /**
   * 璁剧疆VR妯″紡鐘舵€侊紙鍚敤/绂佺敤鎷栨嫿鎺у埗锛?   */
  setVrModeEnabled(enabled: boolean): void {
    this.vrModeEnabled = enabled;
    // 如果禁用 VR 模式，同时停止拖拽状态
    if (!enabled) {
      this.isDragging = false;
    }
  }

  /**
   * 鑾峰彇VR妯″紡鐘舵€?   */
  isVrModeEnabled(): boolean {
    return this.vrModeEnabled;
  }

  /**
   * 妫€鏌ユ槸鍚︽鍦ㄤ氦浜掞紙鎷栨嫿涓級
   * 鐢ㄤ簬VR妯″紡涓嬫殏鍋滈檧铻轰华鏇存柊
   */
  isInteracting(): boolean {
    return this.isDragging || this.isPinching;
  }

  private handleResize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private updatePerformanceGuard(dtMs: number): void {
    const fps = 1000 / Math.max(1, dtMs);
    this.perfSamples.push(fps);
    if (this.perfSamples.length > 30) this.perfSamples.shift();
    const avg = this.perfSamples.reduce((a, b) => a + b, 0) / this.perfSamples.length;
    const now = performance.now();
    if (avg < 28 && this.perfMode === 'normal' && now - this.perfLastChangeAt > 2000) {
      this.perfMode = 'throttle';
      this.perfLastChangeAt = now;
      if (this.tilePano && 'setPerformanceMode' in this.tilePano) {
        (this.tilePano as any).setPerformanceMode('throttle');
      }
      this.emitMetrics('perf:throttle', true);
    }
    if (avg > 45 && this.perfMode === 'throttle' && now - this.perfLastChangeAt > 3000) {
      this.perfMode = 'normal';
      this.perfLastChangeAt = now;
      if (this.tilePano && 'setPerformanceMode' in this.tilePano) {
        (this.tilePano as any).setPerformanceMode('normal');
      }
      this.emitMetrics('perf:normal', true);
    }
  }

  private updateTilesDebug(): void {
    const params = new URLSearchParams(window.location.search);
    const enable =
      params.get('tilesDebug') === '1' ||
      params.get('tilesDebug') === 'true' ||
      params.get('tilesDebug') === 'on';
    if (!enable) {
      if (this.tilesDebugEl) {
        this.tilesDebugEl.remove();
        this.tilesDebugEl = null;
      }
      return;
    }
    if (!this.tilesDebugEl) {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = '8px';
      el.style.top = '8px';
      el.style.padding = '6px 8px';
      el.style.background = 'rgba(0,0,0,0.55)';
      el.style.color = '#fff';
      el.style.fontSize = '12px';
      el.style.lineHeight = '1.4';
      el.style.borderRadius = '6px';
      el.style.zIndex = '9999';
      el.style.pointerEvents = 'none';
      this.tilesDebugEl = el;
      this.container.appendChild(el);
    }
    const status = this.tilePano?.getStatus();
    const mode = this.tilePano ? 'tiles' : 'fallback';
    const tilesVisible = status?.tilesVisible ? 'true' : 'false';
    const tilesCount = status?.tilesLoadedCount ?? 0;
    const tilesLoading = status?.tilesLoadingCount ?? 0;
    const tilesQueued = status?.tilesQueuedCount ?? 0;
    const lastTileUrl = status?.lastTileUrl ?? '';
    const lastError = this.tilesLastError || status?.lastError || '';
    const fallbackVisible = this.fallbackSphere ? 'true' : 'false';
    const canvasSize = status?.canvasSize ?? '';
    const maxLevel = status?.maxLevel ?? '';
    const highReady = status?.highReady ? 'true' : 'false';
    const levels = status?.levels ?? '';
    const renderSource = this.renderSource;
    const switchReason = this.renderSwitchReason;
    const clearedCount = this.clearedCount;
    this.tilesDebugEl.textContent =
      `mode=${mode}\n` +
      `renderSource=${renderSource}\n` +
      `switchReason=${switchReason}\n` +
      `cleared=${clearedCount}\n` +
      `fallbackVisible=${fallbackVisible}\n` +
      `tilesVisible=${tilesVisible}\n` +
      `tilesLoaded=${tilesCount}\n` +
      `tilesLoading=${tilesLoading}\n` +
      `tilesQueued=${tilesQueued}\n` +
      `lastTileUrl=${lastTileUrl}\n` +
      `lastError=${lastError}\n` +
      `canvas=${canvasSize} zMax=${maxLevel} levels=${levels} highReady=${highReady}\n` +
      `lowReady=${this.tilesLowReady}`;
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const now = performance.now();
    const dtMs = this.lastFrameTimeMs ? now - this.lastFrameTimeMs : 16.7;
    this.updatePerformanceGuard(dtMs);
    this.lastFrameTimeMs = now;
    
    // 检查视角变化（用于 UI 自动定位）
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
    
    // 每帧更新相机，确保热点与罗盘使用最新状态
    this.updateCamera();
    if (this.tilePano) {
      this.tilePano.update(this.camera);
      const status = this.tilePano.getStatus();
      const fallbackVisible = !!this.fallbackSphere;
      const tilesVisible = status.tilesVisible;
      // 仅在瓦片低层已完整覆盖后再清理 fallback，避免“先清底图再出瓦片”的黑屏闪断。
      const lowCoverageReady = status.lowReady;
      if (fallbackVisible && tilesVisible && lowCoverageReady) {
        this.tilesVisibleStableFrames += 1;
        if (this.tilesVisibleStableFrames >= 2) {
          this.clearFallback();
        }
      } else {
        this.tilesVisibleStableFrames = 0;
      }
      if (!fallbackVisible && !tilesVisible) {
        this.noteCleared('无可见源');
      }
      if (tilesVisible && this.renderSource === 'fallback' && this.tilesLowReady) {
        this.setRenderSource('low', 'tiles 低清覆盖可见');
      }
      if (tilesVisible && status.highReady) {
        this.setRenderSource('tiles', 'tiles 高清可见');
      }
      if (status.lastError) {
        this.tilesLastError = status.lastError;
      }
      if (!this.tilesLowReady && status.tilesLoadedCount > 0) {
        this.tilesLowReady = true;
        this.updateLoadStatus(LoadStatus.LOW_READY);
      }
      if (status.highReady) {
        this.updateLoadStatus(LoadStatus.HIGH_READY);
        this.isDegradedMode = false;
        this.tilesDegradedNotified = false;
      }

      if (status.tilesLoadedCount > this.tilesLastLoadedCount) {
        this.tilesLastLoadedCount = status.tilesLoadedCount;
        this.tilesLastProgressAt = now;
        if (this.tilesDegradedNotified && !status.highReady) {
          this.tilesDegradedNotified = false;
        }
      }

      if (
        this.tilesHighStartAt === 0 &&
        (status.tilesQueuedCount > 0 || status.tilesLoadingCount > 0)
      ) {
        this.tilesHighStartAt = now;
        if (this.tilesLastProgressAt === 0) this.tilesLastProgressAt = now;
      }

      const stalled =
        this.tilesHighStartAt > 0 &&
        now - this.tilesLastProgressAt > 12000 &&
        !status.highReady;

      if (stalled && !this.tilesDegradedNotified && this.tilesLowReady) {
        this.isDegradedMode = true;
        this.updateLoadStatus(LoadStatus.DEGRADED);
        this.tilesDegradedNotified = true;
      }
    }

    this.updateTilesDebug();
    this.emitMetrics('frame');
    
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
    
    // 更新热点（需在相机更新后，使用最新相机状态）
    for (const listener of this.frameListeners) {
      listener(dtMs);
    }
    this.renderer.render(this.scene, this.camera);
  }
  private lastFrameTimeMs: number | null = null;

  /**
   * 姣忎竴甯э紙render 鍓嶏級瑙﹀彂锛岀敤浜?DOM Overlay锛堢儹鐐圭瓑锛夋洿鏂?   */
  onFrame(listener: (dtMs: number) => void): () => void {
    this.frameListeners.push(listener);
    return () => {
      const idx = this.frameListeners.indexOf(listener);
      if (idx >= 0) this.frameListeners.splice(idx, 1);
    };
  }

  /**
   * 鏆撮湶鐩告満锛氱敤浜庡皢 world position 鎶曞奖鍒板睆骞曪紙DOM Overlay 鐑偣锛?   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  /**
   * 鑾峰彇 DOM 鍏冪礌锛堢敤浜庢嬀鍙栨ā寮忕瓑锛?   */
  getDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  /**
   * 璁剧疆鍦烘櫙鏁版嵁锛堢敤浜?GroundNavDots锛?   */
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
   * 鑾峰彇鐞冧綋鍗婂緞
   */
  getSphereRadius(): number {
    return 500;
  }

  /**
   * 褰撳墠娓叉煋灏哄锛堜笌 canvas 涓€鑷达級
   */
  getViewportSize(): { width: number; height: number } {
    return { width: this.container.clientWidth, height: this.container.clientHeight };
  }

  /**
   * 鍚敤鎷惧彇妯″紡
   */
  enablePickMode(): void {
    if (this.pickMode) return;
    this.pickMode = true;
    this.setupPickModeListeners();
  }

  /**
   * 绂佺敤鎷惧彇妯″紡
   */
  disablePickMode(): void {
    if (!this.pickMode) return;
    this.pickMode = false;
    this.removePickModeListeners();
  }

  /**
   * 鍒囨崲鎷惧彇妯″紡
   * @returns 褰撳墠鏄惁鍚敤
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
   * 鑾峰彇鎷惧彇妯″紡鐘舵€?   */
  isPickModeEnabled(): boolean {
    return this.pickMode;
  }

  /**
   * 璁剧疆鎷惧彇妯″紡鐩戝惉鍣?   */
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

      //
      // 判断是否为拖动：移动距离 > 阈值 或 按下时间 > 阈值且发生移动
      const isDrag = distance > this.pickDragThreshold || (elapsed > this.pickTimeThreshold && this.pickHasMoved);

      if (!isDrag) {
        // 视为点击拾取
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
   * 绉婚櫎鎷惧彇妯″紡鐩戝惉鍣?   */
  private removePickModeListeners(): void {
    this.pickModeListeners.forEach((remove) => remove());
    this.pickModeListeners = [];
  }

  /**
   * 澶勭悊鎷惧彇鐐瑰嚮
   */
  private handlePick(clientX: number, clientY: number): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = screenToNDC(clientX, clientY, rect);
    const result = getYawPitchFromNDC(ndc.x, ndc.y, this.camera, this.getSphereRadius());

    // 使用 ray.direction 计算，理论上不会返回 null，但做守护
    if (!result) {
      // 仅在 debug 模式输出，避免生产噪音
      if (typeof __VR_DEBUG__ !== 'undefined' && __VR_DEBUG__) {
        console.debug('[pick] 无法计算 yaw/pitch（ray.direction 为空）');
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

    // 触发自定义事件，供外部 UI 显示 toast 和标注
    window.dispatchEvent(
      new CustomEvent('vr:pick', {
        detail: { x: clientX, y: clientY, yaw, pitch },
      })
    );
  }

  /**
   * 濡傛灉鍏ㄦ櫙鍥炬瘮渚嬩笉鏄?2:1锛屾墦鍗拌鍛婁絾涓嶉樆濉炲姞杞?   */
  private warnIfNotPanoAspect(texture: THREE.Texture, url: string): void {
    if (!texture.image) return;
    const image: any = texture.image;
    const width = image.width;
    const height = image.height;
    if (!width || !height) return;
    const ratio = width / height;
    const tolerance = 0.02; // 鍏佽灏戦噺娴姩
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
    if (this.tilePano) {
      this.tilePano.dispose();
      this.tilePano = null;
    }
    this.clearFallback();
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
    this.renderer.dispose();
    window.removeEventListener('resize', () => this.handleResize());
  }

  /**
   * 鏍规嵁棰勮搴旂敤娓叉煋鍣ㄥ弬鏁帮紙鐢ㄤ簬鍘熷/鐮斿浼樺寲瀵规瘮锛?   */
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
   * 浠?URL 鍙傛暟妫€娴嬫覆鏌撴。浣嶏紙榛樿 Original锛屾敮鎸??render=enhanced锛?   */
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

  private fallbackToLegacy(sceneData: Scene, tilesConfig?: { fallbackPano?: string; fallbackPanoLow?: string }): void {
    const fallbackScene: Scene = {
      ...sceneData,
      pano: tilesConfig?.fallbackPano ?? sceneData.pano,
      panoLow: tilesConfig?.fallbackPanoLow ?? sceneData.panoLow,
      panoTiles: undefined,
    };
    if (fallbackScene.pano || fallbackScene.panoLow) {
      showToast('瓦片加载失败，已回退到全景图', 2000);
      this.setRenderSource('fallback', 'tiles 失败自动回退');
      this.loadScene(fallbackScene, { preserveView: true });
    } else {
      this.updateLoadStatus(LoadStatus.ERROR);
      if (this.onErrorCallback) {
        this.onErrorCallback(new Error('瓦片与全景资源均不可用'));
      }
    }
  }

  private setRenderSource(source: 'none' | 'fallback' | 'low' | 'tiles', reason: string): void {
    if (this.renderSource !== source || reason) {
      this.renderSource = source;
      this.renderSwitchReason = reason;
    }
  }

  private noteCleared(reason: string): void {
    this.clearedCount += 1;
    this.renderSwitchReason = reason;
  }

  private async showFallbackTexture(url: string, geometry: THREE.SphereGeometry, isLow: boolean): Promise<void> {
    try {
      const imageBitmap = await loadExternalImageBitmap(url, {
        timeoutMs: 15000,
        retries: 1,
        allowFetchFallback: true,
        priority: 'high',
        imageOrientation: 'flipY',
      });
      const texture = new THREE.CanvasTexture(imageBitmap);
      this.applyTextureSettings(texture);
      // 纯全景链路在解码阶段翻转，纹理阶段不再翻转，避免重复翻转导致倒立。
      texture.flipY = false;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        depthWrite: false,
        depthTest: false,
      });
      const mesh = new THREE.Mesh(geometry.clone(), material);
      mesh.renderOrder = 0;
      this.fallbackSphere = mesh;
      this.scene.add(mesh);
      this.updateLoadStatus(isLow ? LoadStatus.LOW_READY : LoadStatus.HIGH_READY);
      this.setRenderSource('fallback', isLow ? 'fallback 低清可见' : 'fallback 高清可见');
      if (isLow) {
        this.tilesLowReady = true;
      }
      if (this.onLoadCallback) {
        this.onLoadCallback();
      }
    } catch (err) {
      console.error('fallback 贴图加载失败', err);
    }
  }

  private clearFallback(): void {
    if (this.fallbackSphere) {
      if (this.fallbackSphere.geometry) this.fallbackSphere.geometry.dispose();
      const mat = this.fallbackSphere.material as THREE.MeshBasicMaterial;
      if (mat.map) mat.map.dispose();
      mat.dispose();
      this.scene.remove(this.fallbackSphere);
      this.fallbackSphere = null;
    }
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
