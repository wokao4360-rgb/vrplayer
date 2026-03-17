import { loadConfig, getMuseum, getScene, clearConfigCache } from './utils/config';
import {
  parseRoute,
  navigateToMuseumList,
  navigateToScene,
  replaceSceneView,
  isDebugMode,
  isEditorMode,
} from './utils/router';
import { normalizePathname } from './utils/urlBuilder';
import type { PanoViewer } from './viewer/PanoViewer';
import type { TitleBar } from './ui/TitleBar';
import type { MuseumList } from './ui/MuseumList';
import type { SceneListPage } from './ui/SceneListPage';
import type { Hotspots } from './ui/Hotspots';
import type { VideoPlayer } from './ui/VideoPlayer';
import { Loading } from './ui/Loading';
import type { ConfigErrorPanel } from './ui/ConfigErrorPanel';
import type { DebugPanel } from './ui/DebugPanel';
import type { ConfigStudio } from './ui/ConfigStudio';
import { LoadStatus } from './types/loadStatus';
import type { QualityIndicator } from './ui/QualityIndicator';
import './ui/ui.css';
import type { TopRightControls } from './ui/TopRightControls';
import type { BrandMark } from './ui/BrandMark';
import type { BottomDock } from './ui/BottomDock';
import type { SceneGuideDrawer } from './ui/SceneGuideDrawer';
import type { GuideTray } from './ui/GuideTray';
import type { TopModeTabs, AppViewMode } from './ui/TopModeTabs';
import { resolveAssetUrl, AssetType, setAssetResolverConfig } from './utils/assetResolver';
import { isFullscreen, unlockOrientationBestEffort } from './ui/fullscreen';
import type { AppConfig, Museum, Scene } from './types/config';
import type { ValidationError } from './utils/configValidator';
import { ensureModalHost } from './ui/modals/ModalHost';
import { showToast } from './ui/toast';
import { showPickMarker } from './ui/PickMarker';
import { setLastPick } from './viewer/pickBus';
import { initYieldClassManager } from './ui/yieldClassManager';
import { initYieldPolicy } from './ui/uiYieldPolicy';
import { __VR_DEBUG__ } from './utils/debug';
import type { NorthCalibrationPanel } from './ui/NorthCalibrationPanel';
import { initFullscreenState } from './utils/fullscreenState';
import { clearAllToasts } from './ui/toast';
import { requestFullscreenBestEffort, exitFullscreenBestEffort } from './ui/fullscreen';
import type { MountedModal } from './ui/Modal';
import type { SceneUiRuntime } from './app/sceneUiRuntime';
import type { ChatRuntime } from './app/chatRuntime';
import { ViewSessionRuntime } from './app/viewSessionRuntime';
import { ZH_CN } from './i18n/zh-CN';
import { getMuseumEntrySceneId } from './utils/museumEntry';
import { resolveLandingContent } from './ui/discoveryContent';
import { internalYawToWorldYaw, worldYawToInternalYaw } from './viewer/cubemapViewSemantics';
import {
  buildMuseumCoverModel,
  resolveMuseumSceneRuntimePlan,
  resolveMuseumShellRoute,
} from './app/museumShellState';
import type { MuseumSceneRuntimePlan } from './app/museumShellState';
import type { MuseumShellChrome, MuseumShellTransitionViewModel } from './ui/MuseumShellChrome';
import {
  createMuseumShellManifest,
  getMuseumShellScene,
  type MuseumShellManifest,
} from './app/museumShellManifest';
import { MuseumShellPreloader } from './app/museumShellPreloader';
import {
  createMuseumShellState,
  reduceMuseumShellState,
  type MuseumShellState,
} from './app/museumShellStateMachine';
import './ui/uiRefresh.css';
if (__VR_DEBUG__) {
  void Promise.all([import('./utils/debugHelper'), import('./ui/interactionBus')])
    .then(([debugHelperModule, interactionBusModule]) => {
      const { dumpVRState, resetVRUI } = debugHelperModule;
      const { interactionBus } = interactionBusModule;
      (window as any).__vrDump = () => {
        const snapshot = dumpVRState();
        console.debug('[VR State Snapshot]', snapshot);
        return snapshot;
      };
      (window as any).__vrResetUI = () => {
        console.debug('[VR Reset UI] 正在清理所有 UI 状态...');
        resetVRUI(interactionBus);
        console.debug('[VR Reset UI] 清理完成');
      };
      console.debug('[VR Debug] 调试模式已启用。使用 __vrDump() 查看状态，使用 __vrResetUI() 复位 UI');
    })
    .catch(() => {
      // debug helper 按需加载失败时不阻断主流程
    });
}
normalizePathname();
initYieldPolicy();
initYieldClassManager();
initFullscreenState();
const handleFullscreenChange = () => {
  const d = document as any;
  const isFullscreenNow = Boolean(document.fullscreenElement || d.webkitFullscreenElement);
  if (isFullscreenNow) {
    clearAllToasts();
  }
};
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange as EventListener);
/**
 * 检测是否为开发者模式
 * URL 参数：development=1 / dev=1 / #development
 */
function isDevMode(): boolean {
  const params = new URLSearchParams(location.search);
  return params.has('development') || params.get('dev') === '1' || location.hash.includes('development');
}
/**
 * DNS 预热：已禁用
 * 图片现在通过同源代理 /_img 加载，不再需要 preconnect 到第三方域名
 */
// function warmupExternalImageHostsFromConfig(config: AppConfig): void {
//   // 已禁用：图片通过同源代理加载，不需要 preconnect
// }
type VrModeModule = typeof import('./utils/vrMode');
class App {
  private appElement: HTMLElement;
  private config: AppConfig | null = null;
  private panoViewer: PanoViewer | null = null;
  private titleBar: TitleBar | null = null;
  private topRightControls: TopRightControls | null = null;
  private topModeTabs: TopModeTabs | null = null;
  private sceneTitleEl: HTMLElement | null = null;
  private brandMark: BrandMark | null = null;
  private bottomDock: BottomDock | null = null;
  private sceneGuideDrawer: SceneGuideDrawer | null = null;
  private guideTray: GuideTray | null = null;
  private museumList: MuseumList | null = null;
  private sceneListPage: SceneListPage | null = null;
  private hotspots: Hotspots | null = null;
  private videoPlayer: VideoPlayer | null = null;
  private loading: Loading;
  private debugPanel: DebugPanel | null = null;
  private configStudio: ConfigStudio | null = null;
  private qualityIndicator: QualityIndicator | null = null;
  private northCalibrationPanel: NorthCalibrationPanel | null = null;
  private currentMuseum: Museum | null = null;
  private currentScene: Scene | null = null;
  private viewerContainer: HTMLElement | null = null;
  private museumShellChrome: MuseumShellChrome | null = null;
  private readonly museumShellPreloader = new MuseumShellPreloader();
  private readonly museumShellManifestCache = new Map<string, MuseumShellManifest>();
  private museumShellState: MuseumShellState = createMuseumShellState();
  private sceneUiRuntime: SceneUiRuntime | null = null;
  private chatRuntime: ChatRuntime | null = null;
  private viewSessionRuntime: ViewSessionRuntime;
  private readonly enteredMuseumIds = new Set<string>();
  private routeViewSyncDisposer: (() => void) | null = null;
  private lastRouteViewSyncAt = 0;
  private lastRouteViewSignature = '';
  private hasBoundFullscreenEvents = false;
  private mode: AppViewMode = 'tour';
  private infoModalMounted: MountedModal | null = null;
  private settingsModalMounted: MountedModal | null = null;
  private handlePopState: (() => void) | null = null;
  private handlePickEvent: ((e: Event) => void) | null = null;
  private handlePickModeEvent: ((e: Event) => void) | null = null;
  private debugPanelRafId: number | null = null;
  private panoViewerModulePromise: Promise<typeof import('./viewer/PanoViewer')> | null = null;
  private topRightControlsModulePromise: Promise<typeof import('./ui/TopRightControls')> | null = null;
  private brandMarkModulePromise: Promise<typeof import('./ui/BrandMark')> | null = null;
  private structureView2DModulePromise: Promise<typeof import('./ui/StructureView2D')> | null = null;
  private structureView3DModulePromise: Promise<typeof import('./ui/StructureView3D')> | null = null;
  private titleBarModulePromise: Promise<typeof import('./ui/TitleBar')> | null = null;
  private museumListModulePromise: Promise<typeof import('./ui/MuseumList')> | null = null;
  private sceneListPageModulePromise: Promise<typeof import('./ui/SceneListPage')> | null = null;
  private sceneGraphModulePromise: Promise<typeof import('./graph/sceneGraph')> | null = null;
  private vrModeModulePromise: Promise<VrModeModule> | null = null;
  private vrModeInitialized = false;
  private externalImageModulePromise: Promise<typeof import('./utils/externalImage')> | null = null;
  private appModalsModulePromise: Promise<typeof import('./ui/modals/appModals')> | null = null;
  private sceneUiRuntimeModulePromise: Promise<typeof import('./app/sceneUiRuntime')> | null = null;
  private chatRuntimeModulePromise: Promise<typeof import('./app/chatRuntime')> | null = null;
  private configErrorPanelModulePromise: Promise<typeof import('./ui/ConfigErrorPanel')> | null = null;
  private museumShellChromeModulePromise: Promise<typeof import('./ui/MuseumShellChrome')> | null = null;
  constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) {
      throw new Error('找不到 #app 元素');
    }
    this.appElement = appElement;
    // 鍒濆鍖栧叏灞€ ModalHost锛堢敤浜庣儹鐐瑰脊绐楃瓑锛?
    ensureModalHost();
    
    this.loading = new Loading();
    this.appElement.appendChild(this.loading.getElement());
    this.viewSessionRuntime = new ViewSessionRuntime({
      appElement: this.appElement,
      getCurrentMuseum: () => this.currentMuseum,
      getCurrentScene: () => this.currentScene,
      getMode: () => this.mode,
      onSwitchToTour: () => {
        this.mode = 'tour';
        this.topModeTabs?.setMode('tour');
      },
      navigateToScene: (museumId, sceneId) => {
        navigateToScene(museumId, sceneId);
      },
      loadSceneGraphModule: () => this.loadSceneGraphModule(),
      loadStructureView2DModule: () => this.loadStructureView2DModule(),
      loadStructureView3DModule: () => this.loadStructureView3DModule(),
    });
    
    this.bindFullscreenEventsOnce();
    this.init();
  }
  private bindFullscreenEventsOnce(): void {
    if (this.hasBoundFullscreenEvents) return;
    this.hasBoundFullscreenEvents = true;
    const handler = () => {
      // 鍚屾 TopRightControls 鍥炬爣/aria
      this.topRightControls?.syncFullscreenState();
      // 鍚屾VR妯″紡鐘舵€侊紙濡傛灉VR妯″紡鍥犻€€鍑哄叏灞忚€屽叧闂級
      if (!isFullscreen()) {
        this.syncVrModeUi(false);
        unlockOrientationBestEffort();
      }
    };
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler as EventListener);
  }
  private loadPanoViewerModule(): Promise<typeof import('./viewer/PanoViewer')> {
    if (!this.panoViewerModulePromise) {
      this.panoViewerModulePromise = import('./viewer/PanoViewer');
    }
    return this.panoViewerModulePromise;
  }
  private loadTopRightControlsModule(): Promise<typeof import('./ui/TopRightControls')> {
    if (!this.topRightControlsModulePromise) {
      this.topRightControlsModulePromise = import('./ui/TopRightControls');
    }
    return this.topRightControlsModulePromise;
  }
  private loadBrandMarkModule(): Promise<typeof import('./ui/BrandMark')> {
    if (!this.brandMarkModulePromise) {
      this.brandMarkModulePromise = import('./ui/BrandMark');
    }
    return this.brandMarkModulePromise;
  }
  private loadStructureView2DModule(): Promise<typeof import('./ui/StructureView2D')> {
    if (!this.structureView2DModulePromise) {
      this.structureView2DModulePromise = import('./ui/StructureView2D');
    }
    return this.structureView2DModulePromise;
  }
  private loadStructureView3DModule(): Promise<typeof import('./ui/StructureView3D')> {
    if (!this.structureView3DModulePromise) {
      this.structureView3DModulePromise = import('./ui/StructureView3D');
    }
    return this.structureView3DModulePromise;
  }
  private loadTitleBarModule(): Promise<typeof import('./ui/TitleBar')> {
    if (!this.titleBarModulePromise) {
      this.titleBarModulePromise = import('./ui/TitleBar');
    }
    return this.titleBarModulePromise;
  }
  private loadMuseumListModule(): Promise<typeof import('./ui/MuseumList')> {
    if (!this.museumListModulePromise) {
      this.museumListModulePromise = import('./ui/MuseumList');
    }
    return this.museumListModulePromise;
  }
  private loadSceneListPageModule(): Promise<typeof import('./ui/SceneListPage')> {
    if (!this.sceneListPageModulePromise) {
      this.sceneListPageModulePromise = import('./ui/SceneListPage');
    }
    return this.sceneListPageModulePromise;
  }
  private loadSceneGraphModule(): Promise<typeof import('./graph/sceneGraph')> {
    if (!this.sceneGraphModulePromise) {
      this.sceneGraphModulePromise = import('./graph/sceneGraph');
    }
    return this.sceneGraphModulePromise;
  }
  private loadVrModeModule(): Promise<VrModeModule> {
    if (!this.vrModeModulePromise) {
      this.vrModeModulePromise = import('./utils/vrMode');
    }
    return this.vrModeModulePromise;
  }
  private loadAppModalsModule(): Promise<typeof import('./ui/modals/appModals')> {
    if (!this.appModalsModulePromise) {
      this.appModalsModulePromise = import('./ui/modals/appModals');
    }
    return this.appModalsModulePromise;
  }

  private setDocumentTitle(...parts: Array<string | null | undefined>): void {
    const filtered = parts
      .map((part) => (typeof part === 'string' ? part.trim() : ''))
      .filter((part) => part.length > 0);
    document.title = filtered.length > 0 ? filtered.join(' - ') : 'VR 全景导览';
  }

  private syncVrModeUi(isActive: boolean): void {
    if (this.panoViewer) {
      this.panoViewer.setVrModeEnabled(isActive);
    }
    if (this.topRightControls) {
      this.topRightControls.updateVrModeState(isActive);
    }
    window.dispatchEvent(
      new CustomEvent('vr:mode-change', {
        detail: { active: isActive },
      }),
    );
  }
  private loadSceneUiRuntimeModule(): Promise<typeof import('./app/sceneUiRuntime')> {
    if (!this.sceneUiRuntimeModulePromise) {
      this.sceneUiRuntimeModulePromise = import('./app/sceneUiRuntime');
    }
    return this.sceneUiRuntimeModulePromise;
  }
  private loadChatRuntimeModule(): Promise<typeof import('./app/chatRuntime')> {
    if (!this.chatRuntimeModulePromise) {
      this.chatRuntimeModulePromise = import('./app/chatRuntime');
    }
    return this.chatRuntimeModulePromise;
  }
  private loadConfigErrorPanelModule(): Promise<typeof import('./ui/ConfigErrorPanel')> {
    if (!this.configErrorPanelModulePromise) {
      this.configErrorPanelModulePromise = import('./ui/ConfigErrorPanel');
    }
    return this.configErrorPanelModulePromise;
  }
  private loadMuseumShellChromeModule(): Promise<typeof import('./ui/MuseumShellChrome')> {
    if (!this.museumShellChromeModulePromise) {
      this.museumShellChromeModulePromise = import('./ui/MuseumShellChrome');
    }
    return this.museumShellChromeModulePromise;
  }
  private async ensureVrModeInitialized(): Promise<VrModeModule> {
    const vrMode = await this.loadVrModeModule();
    if (!this.vrModeInitialized) {
      vrMode.initVrMode();
      this.vrModeInitialized = true;
    }
    return vrMode;
  }
  private async resolveProxiedImageUrl(rawUrl: string): Promise<string> {
    if (!this.externalImageModulePromise) {
      this.externalImageModulePromise = import('./utils/externalImage');
    }
    try {
      const { toProxiedImageUrl } = await this.externalImageModulePromise;
      return toProxiedImageUrl(rawUrl);
    } catch {
      return rawUrl;
    }
  }
  private async ensureMuseumShellChrome(): Promise<MuseumShellChrome> {
    if (!this.museumShellChrome) {
      const { MuseumShellChrome } = await this.loadMuseumShellChromeModule();
      this.museumShellChrome = new MuseumShellChrome();
      this.appElement.appendChild(this.museumShellChrome.getElement());
    } else if (!this.museumShellChrome.getElement().isConnected) {
      this.appElement.appendChild(this.museumShellChrome.getElement());
    }
    return this.museumShellChrome;
  }
  private getMuseumShellManifest(museum: Museum): MuseumShellManifest {
    const cached = this.museumShellManifestCache.get(museum.id);
    if (cached) {
      return cached;
    }
    if (!this.config) {
      throw new Error('config is not ready');
    }
    const manifest = createMuseumShellManifest(this.config, museum);
    this.museumShellManifestCache.set(museum.id, manifest);
    return manifest;
  }
  private applyMuseumShellEvent(event: Parameters<typeof reduceMuseumShellState>[1]): void {
    this.museumShellState = reduceMuseumShellState(this.museumShellState, event);
  }
  private resolveShellSceneView(
    sceneView: { yaw: number; pitch: number; fov: number },
    route: { yaw?: number; pitch?: number; fov?: number },
  ): { yaw: number; pitch: number; fov: number } {
    return {
      yaw: route.yaw !== undefined ? route.yaw : sceneView.yaw,
      pitch: route.pitch !== undefined ? route.pitch : sceneView.pitch,
      fov: route.fov !== undefined ? route.fov : sceneView.fov,
    };
  }
  private buildMuseumTransitionModel(museum: Museum, scene: Scene): MuseumShellTransitionViewModel {
    const museumShellManifest = this.getMuseumShellManifest(museum);
    const shellScene = getMuseumShellScene(museumShellManifest, scene.id);
    return {
      brandTitle: museumShellManifest.cover.brandTitle,
      title: shellScene?.title || scene.name,
      subtitle: `${museumShellManifest.title} · 正在进入下一个展点`,
      backgroundImage: resolveAssetUrl(museumShellManifest.cover.heroImage, AssetType.COVER) || '',
      snapshotImage: this.resolveScenePreviewAsset(scene),
      previewImage:
        resolveAssetUrl(shellScene?.preview.url, AssetType.PANO) || this.resolveScenePreviewAsset(scene),
      progressLabel: '正在复用馆内壳层并恢复场景',
      eyebrow: 'Scene handoff',
      note: museumShellManifest.cover.note,
    };
  }
  private warmMuseumPreviewAssets(museum: Museum, targetSceneId: string): void {
    const museumShellManifest = this.getMuseumShellManifest(museum);
    const shellScene = getMuseumShellScene(museumShellManifest, targetSceneId);
    if (!shellScene) return;
    const route = parseRoute();
    void this.museumShellPreloader
      .warm({
        museum: museumShellManifest,
        sceneId: targetSceneId,
        phase: 'museum-entry',
        view: this.resolveShellSceneView(shellScene.defaultView, route),
      })
      .catch(() => {
        // 预热失败不阻断封面页
      });
  }
  private async showMuseumCover(museum: Museum, targetSceneId: string): Promise<void> {
    if (!this.config) return;
    const museumShellManifest = this.getMuseumShellManifest(museum);
    this.currentMuseum = museum;
    this.currentScene = null;
    this.setDocumentTitle(museum.name, this.config.appName);
    this.applyMuseumShellEvent({ type: 'SHOW_COVER', museumId: museum.id });
    this.loading.hide();
    void this.loadPanoViewerModule();
    void this.loadTopRightControlsModule();
    void this.loadBrandMarkModule();
    const shellChrome = await this.ensureMuseumShellChrome();
    shellChrome.setCoverAction(() => {
      this.enteredMuseumIds.add(museum.id);
      const route = parseRoute();
      if (route.museumId === museum.id && route.sceneId === targetSceneId) {
        void this.handleRoute();
        return;
      }
      navigateToScene(museum.id, targetSceneId);
    });
    shellChrome.showCover({
      appName: this.config.appName,
      brandTitle: museumShellManifest.cover.brandTitle,
      title: museumShellManifest.cover.title,
      subtitle: museumShellManifest.cover.subtitle,
      ctaLabel: museumShellManifest.cover.ctaLabel,
      heroImage: resolveAssetUrl(museumShellManifest.cover.heroImage, AssetType.COVER) || museumShellManifest.cover.heroImage,
      eyebrow: museumShellManifest.cover.eyebrow,
      note: museumShellManifest.cover.note,
      brandLogos: museumShellManifest.cover.brandLogos.map(
        (logo) => resolveAssetUrl(logo, AssetType.COVER) || logo,
      ),
    });
    this.warmMuseumPreviewAssets(museum, targetSceneId);
  }
  private ensureLoadingElementAttached(): void {
    const loadingEl = this.loading.getElement();
    if (!loadingEl.isConnected) {
      this.appElement.appendChild(loadingEl);
    }
  }
  private async ensureViewerShell(debugMode: boolean): Promise<HTMLElement> {
    if (!this.viewerContainer) {
      this.viewerContainer = document.createElement('div');
      this.viewerContainer.className = 'viewer-container';
      this.viewerContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      `;
      this.appElement.appendChild(this.viewerContainer);
    } else if (!this.viewerContainer.isConnected) {
      this.appElement.appendChild(this.viewerContainer);
    }
    if (!this.panoViewer) {
      const { PanoViewer } = await this.loadPanoViewerModule();
      this.panoViewer = new PanoViewer(this.viewerContainer, debugMode);
    }
    return this.viewerContainer;
  }
  private resolveScenePreviewAsset(scene: Scene): string {
    return (
      resolveAssetUrl(scene.panoLow, AssetType.PANO) ||
      resolveAssetUrl(scene.thumb, AssetType.THUMB) ||
      scene.panoLow ||
      scene.thumb ||
      ''
    );
  }
  private captureViewerSnapshot(): string {
    const canvas = this.panoViewer?.getDomElement();
    if (!(canvas instanceof HTMLCanvasElement)) {
      return '';
    }
    try {
      return canvas.toDataURL('image/jpeg', 0.76);
    } catch {
      return '';
    }
  }
  private detachRouteViewSync(): void {
    if (this.routeViewSyncDisposer) {
      this.routeViewSyncDisposer();
      this.routeViewSyncDisposer = null;
    }
    this.lastRouteViewSyncAt = 0;
    this.lastRouteViewSignature = '';
  }
  private bindRouteViewSync(): void {
    this.detachRouteViewSync();
    if (!this.panoViewer) {
      return;
    }
    this.routeViewSyncDisposer = this.panoViewer.onFrame(() => {
      if (!this.panoViewer || !this.currentMuseum || !this.currentScene) {
        return;
      }
      if (this.museumShellChrome?.isCoverVisible()) {
        return;
      }
      const now = performance.now();
      if (now - this.lastRouteViewSyncAt < 480) {
        return;
      }
      const route = parseRoute();
      if (route.museumId !== this.currentMuseum.id || route.sceneId !== this.currentScene.id) {
        return;
      }
      const currentView = this.panoViewer.getCurrentView();
      const nextView = {
        yaw: Number(internalYawToWorldYaw(this.currentScene, currentView.yaw).toFixed(2)),
        pitch: Number(currentView.pitch.toFixed(2)),
        fov: Number(currentView.fov.toFixed(1)),
      };
      const nextSignature = `${nextView.yaw}/${nextView.pitch}/${nextView.fov}`;
      const routeSignature = `${route.yaw ?? ''}/${route.pitch ?? ''}/${route.fov ?? ''}`;
      if (nextSignature === routeSignature || nextSignature === this.lastRouteViewSignature) {
        return;
      }
      this.lastRouteViewSignature = nextSignature;
      this.lastRouteViewSyncAt = now;
      replaceSceneView(this.currentMuseum.id, this.currentScene.id, nextView);
    });
  }
  private async init(): Promise<void> {
    try {
      this.loading.show();
      
      // 妫€鏌ユ槸鍚︽槸缂栬緫鍣ㄦā寮?
      if (isEditorMode()) {
        await this.initEditorMode();
        this.loading.hide();
        return;
      }
      
      // 鍔犺浇閰嶇疆
      this.config = await loadConfig();
      setAssetResolverConfig(this.config.assetCdn);
      this.setDocumentTitle(this.config.appName);
      
      // DNS 棰勭儹宸茬鐢細鍥剧墖閫氳繃鍚屾簮浠ｇ悊 /_img 鍔犺浇
      
      // 璁剧疆搴旂敤鏍囬
      if (this.titleBar) {
        this.titleBar.setTitle(this.config.appName);
      }
      
      // 鐩戝惉璺敱鍙樺寲
      if (!this.handlePopState) {
        this.handlePopState = () => {
          void this.handleRoute();
        };
        window.addEventListener('popstate', this.handlePopState);
      }
      
      // 澶勭悊鍒濆璺敱锛圲I缁勪欢鍒濆鍖栧け璐ヤ笉闃诲鍏ㄦ櫙鏄剧ず锛?
      // showScene 鍐呴儴宸叉湁闄嶇骇淇濇姢锛屽崟涓粍浠跺け璐ヤ笉浼氭姏鍑哄紓甯?
      await this.handleRoute();
      
      this.loading.hide();
    } catch (error: any) {
      console.error('配置加载失败:', error);
      this.loading.hide();
      
      // 妫€鏌ユ槸鍚︽槸閰嶇疆鏍￠獙閿欒
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        await this.showConfigErrorPanel(error.validationErrors);
      } else {
        // 閰嶇疆鍔犺浇澶辫触锛坒etch/瑙ｆ瀽澶辫触锛?
        this.showError('加载配置失败，请刷新页面重试');
      }
    }
  }
  /**
   * 鍒濆鍖栫紪杈戝櫒妯″紡
   */
  private async initEditorMode(): Promise<void> {
    try {
      // 鍔犺浇閰嶇疆
      this.config = await loadConfig();
      setAssetResolverConfig(this.config.assetCdn);
      
      // DNS 棰勭儹宸茬鐢細鍥剧墖閫氳繃鍚屾簮浠ｇ悊 /_img 鍔犺浇
      
      // 娓呯┖褰撳墠瑙嗗浘
      this.appElement.innerHTML = '';
      
      // 鍒涘缓閰嶇疆宸ヤ綔鍙?
      const { ConfigStudio } = await import('./ui/ConfigStudio');
      this.configStudio = new ConfigStudio(this.config, (newConfig) => {
        // 閰嶇疆鍙樻洿鍥炶皟锛氭洿鏂板唴閮ㄩ厤缃紝浣嗕笉閲嶆柊鍔犺浇椤甸潰
        this.config = newConfig;
        this.museumShellManifestCache.clear();
        setAssetResolverConfig(newConfig.assetCdn);
        // 娓呴櫎缂撳瓨锛屼互渚夸笅娆″姞杞戒娇鐢ㄦ柊閰嶇疆
        clearConfigCache();
      });
      
      this.appElement.appendChild(this.configStudio.getElement());
    } catch (error: any) {
      console.error('初始化编辑器模式失败:', error);
      
      // 妫€鏌ユ槸鍚︽槸閰嶇疆鏍￠獙閿欒
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        await this.showConfigErrorPanel(error.validationErrors);
      } else {
      this.showError('加载配置失败，请刷新页面重试');
      }
    }
  }
  private async showConfigErrorPanel(errors: ValidationError[]): Promise<void> {
    // 娓呯┖褰撳墠瑙嗗浘
    this.appElement.innerHTML = '';
    const { ConfigErrorPanel } = await this.loadConfigErrorPanelModule();
    const errorPanel = new ConfigErrorPanel(
      errors,
      () => {
        // 鍒锋柊閲嶈瘯
        clearConfigCache();
        window.location.reload();
      },
      () => {
        // 鏄剧ず绀轰緥閰嶇疆锛堣烦杞埌 README 鎴栨樉绀虹ず渚嬶級
        this.showConfigExample();
      }
    );
    
    this.appElement.appendChild(errorPanel.getElement());
  }
  private showConfigExample(): void {
    const exampleWindow = window.open('', '_blank');
    if (exampleWindow) {
      exampleWindow.document.write(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>config.json 示例</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              background: #1a1a1a;
              color: #fff;
            }
            pre {
              background: #0f0f0f;
              padding: 20px;
              border-radius: 8px;
              overflow-x: auto;
            }
            code {
              color: #4a90e2;
            }
          </style>
        </head>
        <body>
          <h1>config.json 示例配置</h1>
          <pre><code>{
  "appName": "应用名称",
  "museums": [
    {
      "id": "museum_id",
      "name": "展馆名称",
      "cover": "https://example.com/cover.jpg",
      "map": {
        "image": "https://example.com/map.jpg",
        "width": 1000,
        "height": 600
      },
      "scenes": [
        {
          "id": "scene_id",
          "name": "场景名称",
          "panoLow": "https://example.com/pano-low.jpg",
          "pano": "https://example.com/pano.jpg",
          "thumb": "https://example.com/thumb.jpg",
          "initialView": {
            "yaw": 0,
            "pitch": 0,
            "fov": 75
          },
          "mapPoint": {
            "x": 420,
            "y": 310
          },
          "hotspots": [
            {
              "id": "hotspot_id",
              "type": "scene",
              "label": "热点标签",
              "yaw": 35,
              "pitch": -5,
              "target": {
                "museumId": "museum_id",
                "sceneId": "target_scene_id",
                "yaw": 120,
                "pitch": 0
              }
            }
          ]
        }
      ]
    }
  ]
}</code></pre>
          <p>详细配置说明请查看 README.md</p>
        </body>
        </html>
      `);
    }
  }
  private async handleRoute(): Promise<void> {
    if (!this.config) return;
    const route = parseRoute();
    // 鍦烘櫙璺敱棰勭儹锛氬彧鍦?scene 妯″紡涓嬫墠鎷夎捣閲嶈祫婧愭ā鍧楋紝閬垮厤鍒楄〃椤典篃涓嬭浇 three 鏍稿績銆?
    if (route.sceneId) {
      void this.loadPanoViewerModule();
      void this.loadTopRightControlsModule();
      void this.loadBrandMarkModule();
    }
    
    if (!route.museumId) {
      this.clearView();
      this.setDocumentTitle(this.config.appName);
      await this.showMuseumList();
      return;
    }

    const museum = getMuseum(route.museumId);
    if (!museum) {
      this.clearView();
      this.showError('未找到指定展馆');
      navigateToMuseumList();
      return;
    }

    const routeDecision = resolveMuseumShellRoute({
      museum,
      requestedSceneId: route.sceneId,
      hasEnteredMuseum: this.enteredMuseumIds.has(museum.id),
    });
    if (routeDecision.kind === 'cover') {
      const preserveSameMuseumViewer =
        this.currentMuseum?.id === museum.id &&
        Boolean(this.panoViewer && this.viewerContainer);
      this.clearView({
        preserveViewerShell: preserveSameMuseumViewer,
        preserveMuseumShell: preserveSameMuseumViewer,
      });
      await this.showMuseumCover(museum, routeDecision.targetSceneId);
      return;
    }

    const scene = getScene(route.museumId, routeDecision.targetSceneId);
    if (!scene) {
      this.clearView();
      this.showError('未找到指定场景');
      const entrySceneId = getMuseumEntrySceneId(museum);
      if (entrySceneId) {
        navigateToScene(museum.id, entrySceneId);
        return;
      }
      navigateToMuseumList();
      return;
    }

    const runtimePlan = resolveMuseumSceneRuntimePlan({
      currentMuseumId: this.currentMuseum?.id ?? null,
      hasViewerShell: Boolean(this.panoViewer && this.viewerContainer),
      nextMuseumId: museum.id,
      requestedView: {
        yaw: route.yaw,
        pitch: route.pitch,
        fov: route.fov,
      },
    });
    this.clearView({
      preserveViewerShell: runtimePlan.shellStrategy === 'reuse-shell',
      preserveMuseumShell:
        runtimePlan.shellStrategy === 'reuse-shell' || this.museumShellChrome?.isCoverVisible() === true,
    });
    await this.showScene(museum, scene, runtimePlan);
  }
  private async showMuseumList(): Promise<void> {
    if (!this.config) return;
    const [{ TitleBar }, { MuseumList }] = await Promise.all([
      this.loadTitleBarModule(),
      this.loadMuseumListModule(),
    ]);
    const landing = resolveLandingContent(this.config);
    // 鍒涘缓鏍囬鏍?
    this.titleBar = new TitleBar(landing.brandTitle);
    this.appElement.appendChild(this.titleBar.getElement());
    this.setDocumentTitle(this.config.appName);
    // 鍒涘缓棣嗗垪琛?
    this.museumList = new MuseumList(this.config);
    this.appElement.appendChild(this.museumList.getElement());
  }
  private async showSceneList(museum: Museum): Promise<void> {
    const { TitleBar } = await this.loadTitleBarModule();
    // 鍒涘缓鏍囬鏍?
    this.titleBar = new TitleBar(museum.name);
    this.appElement.appendChild(this.titleBar.getElement());
    this.setDocumentTitle(museum.name, this.config?.appName);
    const { SceneListPage } = await this.loadSceneListPageModule();
    this.sceneListPage = new SceneListPage(museum);
    this.appElement.appendChild(this.sceneListPage.getElement());
  }
  private async showScene(
    museum: Museum,
    scene: Scene,
    runtimePlan: MuseumSceneRuntimePlan,
  ): Promise<void> {
    const route = parseRoute();
    const museumShellManifest = this.getMuseumShellManifest(museum);
    const shellScene = getMuseumShellScene(museumShellManifest, scene.id);
    if (!shellScene) {
      throw new Error(`museum shell scene missing: ${museum.id}/${scene.id}`);
    }
    const targetView = this.resolveShellSceneView(shellScene.defaultView, route);
    const previewAlreadyReady = this.museumShellPreloader.isPreviewReady(scene.id);
    const previewUrl =
      this.museumShellPreloader.getPreviewUrl(scene.id) ||
      (resolveAssetUrl(shellScene.preview.url, AssetType.PANO) || shellScene.preview.url);
    const runtimeSceneData =
      previewAlreadyReady && previewUrl
        ? ({ ...scene, panoLow: previewUrl } as Scene)
        : scene;
    this.currentMuseum = museum;
    this.currentScene = scene;
    this.enteredMuseumIds.add(museum.id);
    if (runtimePlan.shellStrategy === 'reuse-shell' && this.museumShellState.pendingSceneId !== scene.id) {
      this.applyMuseumShellEvent({
        type: 'START_SCENE_TRANSITION',
        museumId: museum.id,
        fromSceneId: this.museumShellState.currentSceneId || scene.id,
        toSceneId: scene.id,
      });
    } else {
      this.applyMuseumShellEvent({
        type: 'START_ENTER',
        museumId: museum.id,
        sceneId: scene.id,
        previewAlreadyReady,
        previewUrl: previewAlreadyReady ? previewUrl : undefined,
      });
    }
    this.loading.hide();
    this.setDocumentTitle(scene.name, museum.name, this.config?.appName);
    const debugMode = isDebugMode();
    const viewerContainer = await this.ensureViewerShell(debugMode);
    const shellChrome = await this.ensureMuseumShellChrome();
    const transitionModel = this.buildMuseumTransitionModel(museum, scene);
    const transitionSnapshot = this.captureViewerSnapshot() || transitionModel.snapshotImage;
    if (runtimePlan.shellStrategy === 'reuse-shell') {
      shellChrome.startSceneTransition({
        ...transitionModel,
        snapshotImage: transitionSnapshot,
        previewImage: previewUrl || transitionModel.previewImage,
      });
    } else {
      shellChrome.showEnterPreloading({
        ...transitionModel,
        snapshotImage: transitionSnapshot,
        previewImage: previewUrl || transitionModel.previewImage,
        accentLabel: shellChrome.isCoverVisible() ? '即将进入首个场景' : 'Loading scene shell',
      });
    }
    const warmPhase = runtimePlan.shellStrategy === 'reuse-shell' ? 'scene-transition' : 'museum-entry';
    void this.museumShellPreloader
      .warm({
        museum: museumShellManifest,
        sceneId: scene.id,
        phase: warmPhase,
        view: targetView,
      })
      .then((warmResult) => {
        if (this.currentMuseum?.id !== museum.id || this.currentScene?.id !== scene.id) {
          return;
        }
        const readyPreviewUrl =
          warmResult.previewUrl ||
          (resolveAssetUrl(shellScene.preview.url, AssetType.PANO) || shellScene.preview.url);
        this.applyMuseumShellEvent({
          type: 'TARGET_PREVIEW_READY',
          sceneId: scene.id,
          previewUrl: readyPreviewUrl,
        });
        shellChrome.markPreviewReady({
          previewImage: readyPreviewUrl,
          progressLabel: '目标场景低清预览已接管，正在恢复清晰',
          accentLabel: 'Preview ready',
        });
      })
      .catch((error) => {
        if (this.currentMuseum?.id !== museum.id || this.currentScene?.id !== scene.id) {
          return;
        }
        const message = error instanceof Error ? error.message : 'scene preload failed';
        this.applyMuseumShellEvent({
          type: 'SCENE_ERROR',
          sceneId: scene.id,
          message,
        });
        shellChrome.showErrorFallback({
          ...transitionModel,
          snapshotImage: transitionSnapshot,
          previewImage: previewUrl || transitionModel.previewImage,
          progressLabel: '目标场景预热较慢，正在继续等待资源',
          accentLabel: 'Error fallback',
        });
      });
    const devMode = isDevMode();
    void this.mountTopRightControls(viewerContainer, scene, devMode);
    // 鏂?UI锛氬乏涓婅鍦烘櫙鏍囬锛堝瑙嗛鏍硷級
    this.sceneTitleEl = document.createElement('div');
    this.sceneTitleEl.className = 'vr-scenetitle';
    this.sceneTitleEl.textContent = scene.name || this.config?.appName || 'VR Player';
    this.appElement.appendChild(this.sceneTitleEl);
    // 鐩戝惉鎷惧彇浜嬩欢
    if (this.handlePickEvent) {
      window.removeEventListener('vr:pick', this.handlePickEvent);
      this.handlePickEvent = null;
    }
    this.handlePickEvent = (e: Event) => {
      const evt = e as CustomEvent<{ x: number; y: number; yaw: number; pitch: number }>;
      const { x, y, yaw, pitch } = evt.detail;
      // 淇濆瓨鍒板叏灞€缂撳瓨锛堜緵 ConfigStudio 浣跨敤锛?
      setLastPick({ yaw, pitch, ts: Date.now() });
      showToast(`已复制 yaw: ${yaw.toFixed(2)}, pitch: ${pitch.toFixed(2)}`);
      if (this.panoViewer) {
        const viewerEl = this.panoViewer.getDomElement();
        showPickMarker(viewerEl, x, y);
      }
    };
    window.addEventListener('vr:pick', this.handlePickEvent);
    // 鐩戝惉鎷惧彇妯″紡鍒囨崲浜嬩欢锛堢敤浜庝粠 ConfigStudio 鍏抽棴鎷惧彇妯″紡锛?
    if (this.handlePickModeEvent) {
      window.removeEventListener('vr:pickmode', this.handlePickModeEvent);
      this.handlePickModeEvent = null;
    }
    this.handlePickModeEvent = (e: Event) => {
      const evt = e as CustomEvent<{ enabled: boolean }>;
      if (this.panoViewer && !evt.detail.enabled && this.panoViewer.isPickModeEnabled()) {
        this.panoViewer.disablePickMode();
        // TopRightControls 浼氶€氳繃 vr:pickmode 浜嬩欢鑷姩鏇存柊鐘舵€?
      }
    };
    window.addEventListener('vr:pickmode', this.handlePickModeEvent);
    void this.mountBrandMark();
    
    if (debugMode && !this.debugPanel) {
      const { DebugPanel } = await import('./ui/DebugPanel');
      this.debugPanel = new DebugPanel();
      this.appElement.appendChild(this.debugPanel.getElement());
      if (this.debugPanelRafId !== null) {
        cancelAnimationFrame(this.debugPanelRafId);
        this.debugPanelRafId = null;
      }
      const updateDebugPanel = () => {
        if (this.debugPanel && this.panoViewer) {
          const view = this.panoViewer.getCurrentView();
          this.debugPanel.updateView(view.yaw, view.pitch, view.fov);
        }
        this.debugPanelRafId = requestAnimationFrame(updateDebugPanel);
      };
      updateDebugPanel();
    }
    if (this.panoViewer && this.debugPanel) {
      this.panoViewer.setOnDebugClick((x, y, yaw, pitch, fov) => {
        if (this.debugPanel) {
          this.debugPanel.show(x, y, yaw, pitch, fov);
        }
      });
    }
    const [{ ChatRuntime }, { SceneUiRuntime }] = await Promise.all([
      this.loadChatRuntimeModule(),
      this.loadSceneUiRuntimeModule(),
    ]);
    this.chatRuntime = new ChatRuntime();
    this.chatRuntime.updateContext({
      museum,
      scene,
      fcChatConfig: this.config?.fcChat,
    });
    this.sceneUiRuntime = new SceneUiRuntime({
      appElement: this.appElement,
      viewerContainer,
      museum,
      scene,
      initialMode: this.mode,
      getPanoViewer: () => this.panoViewer,
      getCurrentSceneId: () => this.currentScene?.id ?? null,
      onModeChange: (mode) => {
        this.setMode(mode);
      },
      onEnterScene: (sceneId, view) => {
        if (this.museumShellState.inputLocked) {
          return;
        }
        navigateToScene(museum.id, sceneId, view);
      },
      onOpenInfo: () => {
        void this.openInfoModal();
      },
      onOpenSettings: () => {
        void this.openSettingsModal();
      },
      onOpenCommunity: () => {
        void this.chatRuntime?.ensureInit();
      },
      onWarmupFeatures: async () => {
        await this.loadAppModalsModule();
      },
    });
    const syncSceneUiRuntimeRefs = () => {
      this.bottomDock = this.sceneUiRuntime?.getBottomDock() ?? null;
      this.topModeTabs = this.sceneUiRuntime?.getTopModeTabs() ?? null;
      this.hotspots = this.sceneUiRuntime?.getHotspots() ?? null;
      this.videoPlayer = this.sceneUiRuntime?.getVideoPlayer() ?? null;
      this.guideTray = this.sceneUiRuntime?.getGuideTray() ?? null;
      this.sceneGuideDrawer = this.sceneUiRuntime?.getSceneGuideDrawer() ?? null;
      this.qualityIndicator = this.sceneUiRuntime?.getQualityIndicator() ?? null;
    };
    let coreUiRequested = false;
    let chatInitRequested = false;
    let lowSceneReady = false;
    let transitionCompleted = false;
    let chatInitFallbackTimer: number | null = window.setTimeout(() => {
      if (chatInitRequested) return;
      chatInitRequested = true;
      void this.chatRuntime?.ensureInit();
      if (__VR_DEBUG__) {
        console.debug('[showScene] chat init fallback triggered');
      }
    }, 3500);

    const completeTransition = (status: LoadStatus) => {
      if (transitionCompleted) return;
      transitionCompleted = true;
      if (status === LoadStatus.HIGH_READY) {
        this.applyMuseumShellEvent({ type: 'SCENE_HIGH_READY', sceneId: scene.id });
        shellChrome.markSharpening('高清已接管，正在收束转场');
      } else {
        this.applyMuseumShellEvent({ type: 'SCENE_DEGRADED_READY', sceneId: scene.id });
        shellChrome.markSharpening('网络较慢，先以可用画质进入场景');
      }
      window.setTimeout(() => {
        shellChrome.completeTransition();
      }, 320);
    };

    const clearChatInitFallback = () => {
      if (chatInitFallbackTimer == null) return;
      window.clearTimeout(chatInitFallbackTimer);
      chatInitFallbackTimer = null;
    };

    const ensureCoreSceneUi = () => {
      if (coreUiRequested) return;
      coreUiRequested = true;
      void this.sceneUiRuntime
        ?.mountCore()
        .then(() => {
          syncSceneUiRuntimeRefs();
        })
        .catch((err) => {
          if (__VR_DEBUG__) {
            console.debug('[showScene] 核心场景 UI 创建失败，已跳过', err);
          }
        });
    };
    // 璁剧疆鍔犺浇鐘舵€佸彉鍖栧洖璋?
    this.panoViewer.setOnStatusChange((status) => {
      this.sceneUiRuntime?.handleStatusChange(status);
      syncSceneUiRuntimeRefs();
      if (
        (runtimePlan.shellStrategy === 'reuse-shell' || this.museumShellState.overlayVisible) &&
        status === LoadStatus.LOW_READY &&
        !lowSceneReady
      ) {
        lowSceneReady = true;
        this.applyMuseumShellEvent({ type: 'SCENE_LOW_READY', sceneId: scene.id });
        shellChrome.markSharpening('目标场景低清已可见，正在补齐前方高清资源');
      }
      if (
        (runtimePlan.shellStrategy === 'reuse-shell' || this.museumShellState.overlayVisible) &&
        (status === LoadStatus.HIGH_READY || status === LoadStatus.DEGRADED)
      ) {
        completeTransition(status);
      }
      if (
        !coreUiRequested &&
        (status === LoadStatus.LOW_READY ||
          status === LoadStatus.HIGH_READY ||
          status === LoadStatus.DEGRADED)
      ) {
        window.setTimeout(() => {
          ensureCoreSceneUi();
        }, 0);
      }
      if (status === LoadStatus.HIGH_READY || status === LoadStatus.DEGRADED) {
        this.sceneUiRuntime?.scheduleFeatureWarmup(status === LoadStatus.HIGH_READY ? 'immediate' : 'idle');
      }
      if (
        !chatInitRequested &&
        (status === LoadStatus.LOW_READY ||
          status === LoadStatus.HIGH_READY ||
          status === LoadStatus.DEGRADED)
      ) {
        chatInitRequested = true;
        clearChatInitFallback();
        void this.chatRuntime?.ensureInit();
      }
      if (
        status === LoadStatus.LOW_READY ||
        status === LoadStatus.HIGH_READY ||
        status === LoadStatus.DEGRADED
      ) {
        this.loading.hide();
      }
    });
    // 鍔犺浇鍦烘櫙
    this.panoViewer.setOnLoad(() => {
      ensureCoreSceneUi();
      if (!chatInitRequested) {
        chatInitRequested = true;
        clearChatInitFallback();
        void this.chatRuntime?.ensureInit();
      }
      clearChatInitFallback();
      this.loading.hide();
      this.hideUIError();
      if (!transitionCompleted) {
        completeTransition(LoadStatus.HIGH_READY);
      }
      
      this.preloadNextScene(museum, scene);
    });
    this.panoViewer.setOnError((error) => {
      clearChatInitFallback();
      console.error('加载场景失败:', error);
      this.loading.hide();
      this.showError('加载全景图失败，请检查网络连接');
      this.applyMuseumShellEvent({
        type: 'SCENE_ERROR',
        sceneId: scene.id,
        message: error instanceof Error ? error.message : 'scene load failed',
      });
      shellChrome.showErrorFallback({
        ...this.buildMuseumTransitionModel(museum, scene),
        snapshotImage: this.captureViewerSnapshot() || transitionSnapshot,
        previewImage: previewUrl || transitionModel.previewImage,
        progressLabel: '转场失败，请检查资源后重试',
      });
      if (this.qualityIndicator) {
        this.qualityIndicator.updateStatus(LoadStatus.ERROR);
      }
    });
    if (runtimePlan.viewStrategy === 'reset-to-target') {
      const worldTargetYaw = targetView.yaw;
      const targetPitch = targetView.pitch;
      const targetFov = targetView.fov;
      
      // 缁熶竴涓栫晫 鈫?鍐呴儴 yaw锛堝叧閿級
      const internalTargetYaw = worldYawToInternalYaw(scene, worldTargetYaw);
      
      this.panoViewer.setView(internalTargetYaw, targetPitch, targetFov);
    }
    this.panoViewer.loadScene(runtimeSceneData, { preserveView: true });
    this.panoViewer.setSceneData(museum.id, scene.id, scene.hotspots);
    this.bindRouteViewSync();
  }
  private async mountTopRightControls(viewerContainer: HTMLElement, scene: Scene, devMode: boolean): Promise<void> {
    try {
      const { TopRightControls } = await this.loadTopRightControlsModule();
      if (!this.panoViewer) return;
      if (!this.currentScene || this.currentScene.id !== scene.id) return;
      this.topRightControls?.remove();
      this.topRightControls = new TopRightControls({
        viewerRootEl: viewerContainer,
        onTogglePickMode: devMode
          ? () => {
              if (this.panoViewer) {
                if (this.panoViewer.isPickModeEnabled()) {
                  this.panoViewer.disablePickMode();
                } else {
                  this.panoViewer.enablePickMode();
                }
                return this.panoViewer.isPickModeEnabled();
              }
              return false;
            }
          : undefined,
        onOpenNorthCalibration: devMode
          ? () => {
              void this.openNorthCalibration(scene.id);
            }
          : undefined,
        showNorthCalibration: devMode,
        onToggleVrMode: async () => {
          return this.toggleVrModeFromUI(viewerContainer);
        },
      });
      this.appElement.appendChild(this.topRightControls.getElement());
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] TopRightControls 创建失败，已跳过', err);
      }
      this.topRightControls = null;
    }
  }
  private async mountBrandMark(): Promise<void> {
    try {
      const { BrandMark } = await this.loadBrandMarkModule();
      const existingBrandMark = this.appElement.querySelector('.vr-brandmark');
      if (existingBrandMark) {
        return;
      }
      this.brandMark = new BrandMark({
        appName: this.config?.appName,
        brandText: this.config ? resolveLandingContent(this.config).brandTitle : ZH_CN.brand.name,
      });
      const el = this.brandMark.getElement();
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openDingHuQingYuan();
      });
      this.appElement.appendChild(el);
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] BrandMark 创建失败，已跳过', err);
      }
      this.brandMark = null;
    }
  }
  /**
   * 棰勫姞杞戒笅涓€涓満鏅殑缂╃暐鍥?
   * 璧勬簮绫诲瀷锛歵humb锛堢敤浜庡垪琛?棰勮锛?
   */
  private preloadNextScene(museum: Museum, currentScene: Scene): void {
    const museumShellManifest = this.getMuseumShellManifest(museum);
    void this.museumShellPreloader.warmNeighborPreviews(museumShellManifest, currentScene.id);
  }
  private clearView(options: { preserveViewerShell?: boolean; preserveMuseumShell?: boolean } = {}): void {
    const preserveViewerShell = options.preserveViewerShell === true;
    const preserveMuseumShell = options.preserveMuseumShell === true;
    this.viewSessionRuntime.clearOverlayState();
    this.detachRouteViewSync();
    if (this.handlePickEvent) {
      window.removeEventListener('vr:pick', this.handlePickEvent);
      this.handlePickEvent = null;
    }
    if (this.handlePickModeEvent) {
      window.removeEventListener('vr:pickmode', this.handlePickModeEvent);
      this.handlePickModeEvent = null;
    }
    if (this.debugPanelRafId !== null) {
      cancelAnimationFrame(this.debugPanelRafId);
      this.debugPanelRafId = null;
    }
    this.infoModalMounted?.close();
    this.infoModalMounted = null;
    this.settingsModalMounted?.close();
    this.settingsModalMounted = null;
    if (this.chatRuntime) {
      this.chatRuntime.dispose();
      this.chatRuntime = null;
    }
    if (this.sceneUiRuntime) {
      this.sceneUiRuntime.dispose();
      this.sceneUiRuntime = null;
    }
    this.bottomDock = null;
    this.topModeTabs = null;
    this.hotspots = null;
    this.videoPlayer = null;
    this.guideTray = null;
    this.sceneGuideDrawer = null;
    this.qualityIndicator = null;
    if (!preserveViewerShell && this.panoViewer) {
      this.panoViewer.dispose();
      this.panoViewer = null;
    }
    
    if (this.titleBar) {
      this.titleBar.remove();
      this.titleBar = null;
    }
    if (this.topRightControls) {
      this.topRightControls.remove();
      this.topRightControls = null;
    }
    if (this.northCalibrationPanel) {
      this.northCalibrationPanel.close();
      this.northCalibrationPanel = null;
    }
    if (this.sceneTitleEl) {
      this.sceneTitleEl.remove();
      this.sceneTitleEl = null;
    }
    if (this.brandMark) {
      this.brandMark.remove();
      this.brandMark = null;
    }
    if (this.museumList) {
      this.museumList.remove();
      this.museumList = null;
    }
    if (this.sceneListPage) {
      this.sceneListPage.remove();
      this.sceneListPage = null;
    }
    
    if (this.debugPanel) {
      this.debugPanel.remove();
      this.debugPanel = null;
    }
    
    if (this.configStudio) {
      this.configStudio.remove();
      this.configStudio = null;
    }
    
    if (!preserveMuseumShell && this.museumShellChrome) {
      this.museumShellChrome.getElement().remove();
      this.museumShellChrome = null;
    }
    if (!preserveViewerShell && this.viewerContainer) {
      this.viewerContainer.remove();
      this.viewerContainer = null;
    }
    this.mode = 'tour';
    this.currentScene = null;
    if (!preserveViewerShell) {
      this.currentMuseum = null;
    }
    this.ensureLoadingElementAttached();
  }
  private uiErrorElement: HTMLElement | null = null;
  private hideUIError(): void {
    if (this.uiErrorElement && this.uiErrorElement.parentNode) {
      this.uiErrorElement.parentNode.removeChild(this.uiErrorElement);
      this.uiErrorElement = null;
    }
  }
  /**
   * 璁剧疆鍏ㄥ眬妯″紡锛坱our / structure2d / structure3d锛?
   */
  private setMode(mode: AppViewMode): void {
    if (this.mode === mode) return;
    this.mode = mode;
    
    // 鏇存柊 TopModeTabs
    if (this.topModeTabs) {
      this.topModeTabs.setMode(mode);
    }
    
    // 濡傛灉鍒囨崲鍒皌our妯″紡锛屼笖褰撳墠鏈塷verlay鎵撳紑锛屽厛鍏抽棴overlay
    if (mode === 'tour' && this.viewSessionRuntime.isStructureOverlayOpen()) {
      this.viewSessionRuntime.closeStructureOverlay({ toTour: false });
    }
    
    // 澶勭悊 structure2d overlay
    if (mode === 'structure2d') {
      void this.viewSessionRuntime.openStructure2D();
    } else if (mode === 'structure3d') {
      void this.viewSessionRuntime.openStructure3D();
    }
  }
  private async openNorthCalibration(sceneId: string): Promise<void> {
    // 娓呯悊涔嬪墠鐨勬牎鍑嗛潰鏉匡紙濡傛灉瀛樺湪锛?
    if (this.northCalibrationPanel) {
      this.northCalibrationPanel.close();
      this.northCalibrationPanel = null;
    }
    if (!this.panoViewer) {
      console.warn('[openNorthCalibration] PanoViewer 未初始化');
      return;
    }
    // 鍒涘缓鏍″噯闈㈡澘
    try {
      const { NorthCalibrationPanel } = await import('./ui/NorthCalibrationPanel');
      this.northCalibrationPanel = new NorthCalibrationPanel({
        getCurrentYaw: () => {
          const view = this.panoViewer?.getCurrentView();
          return view?.yaw ?? 0;
        },
        sceneId: sceneId,
        onClose: () => {
          this.northCalibrationPanel = null;
        },
      });
    } catch (err) {
      console.error('[openNorthCalibration] 创建校准面板失败:', err);
      this.northCalibrationPanel = null;
    }
  }
  private showError(message: string): void {
    // 闅愯棌涔嬪墠鐨勯敊璇紙濡傛灉鏈夛級
    this.hideUIError();
    this.uiErrorElement = document.createElement('div');
    this.uiErrorElement.className = 'error-message';
    this.uiErrorElement.textContent = message;
    this.uiErrorElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: #fff;
      padding: 20px 30px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 16px;
      text-align: center;
      max-width: 80vw;
    `;
    this.appElement.appendChild(this.uiErrorElement);
    
    setTimeout(() => {
      this.hideUIError();
    }, 3000);
  }
  /**
   * 缁熶竴鎵撳紑鈥滈紟铏庢竻婧愨€濆洟闃熶粙缁嶅脊绐?
   */
  private openDingHuQingYuan(): void {
    if (!this.brandMark) return;
    try {
      const modal = this.brandMark.getAboutModal();
      modal.open();
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[openDingHuQingYuan] 打开团队介绍失败:', err);
      }
    }
  }
  /**
   * 底部“信息”弹窗（按需加载）
   */
  private async openInfoModal(): Promise<void> {
    this.infoModalMounted?.close();
    this.infoModalMounted = null;
    const { openInfoModal } = await this.loadAppModalsModule();
    this.infoModalMounted = openInfoModal({
      museumName: this.currentMuseum?.name || '-',
      sceneName: this.currentScene?.name || '-',
      onOpenBrand: () => {
        this.openDingHuQingYuan();
      },
      onDockTabClose: () => {
        this.infoModalMounted = null;
        window.dispatchEvent(
          new CustomEvent('vr:dock-tab-close', {
            detail: { tab: 'info' },
          }),
        );
      },
    });
  }
  /**
   * 缁熶竴 VR 妯″紡寮€鍏抽€昏緫锛屼緵鍙充笂瑙掓寜閽笌璁剧疆寮圭獥鍏辩敤
   */
  private async toggleVrModeFromUI(viewerContainer: HTMLElement): Promise<boolean> {
    if (!this.panoViewer) {
      return false;
    }
    const vrMode = await this.ensureVrModeInitialized();
    const currentlyEnabled = vrMode.isVrModeEnabled();
    if (currentlyEnabled) {
      // 褰撳墠宸插惎鐢紝鍏抽棴VR妯″紡
      vrMode.disableVrMode();
      this.syncVrModeUi(false);
      // 閫€鍑哄叏灞忥紙鎺ㄨ崘锛?
      await exitFullscreenBestEffort();
      return false;
    } else {
      // 褰撳墠鏈惎鐢紝鍚敤VR妯″紡
      try {
        await requestFullscreenBestEffort(viewerContainer);
      } catch (err) {
        if (__VR_DEBUG__) {
          console.debug('[VRMode] fullscreen request failed', err);
        }
        return false;
      }
      // 鍚敤VR妯″紡锛堥檧铻轰华鎺у埗锛?
      const initialView = this.panoViewer.getCurrentView();
      // 璁剧疆浜や簰妫€鏌ュ洖璋冿紙鎷栨嫿鏃舵殏鍋滈檧铻轰华鏇存柊锛?
      vrMode.setInteractingCallback(() => {
        return this.panoViewer?.isInteracting() ?? false;
      });
      const success = await vrMode.enableVrMode((yawDelta, pitchDelta) => {
        if (this.panoViewer) {
          const newYaw = initialView.yaw + yawDelta;
          const newPitch = Math.max(-90, Math.min(90, initialView.pitch + pitchDelta));
          this.panoViewer.setView(newYaw, newPitch);
        }
      });
      if (success) {
        this.syncVrModeUi(true);
        return true;
      } else {
        await exitFullscreenBestEffort();
        return false;
      }
    }
  }
  private async openSettingsModal(): Promise<void> {
    this.settingsModalMounted?.close();
    this.settingsModalMounted = null;
    const { openSettingsModal } = await this.loadAppModalsModule();
    this.settingsModalMounted = openSettingsModal({
      currentScene: this.currentScene,
      panoViewer: this.panoViewer,
      bottomDock: this.bottomDock,
      onToggleVrMode: async (viewerContainer) => this.toggleVrModeFromUI(viewerContainer),
      onDockTabClose: () => {
        this.settingsModalMounted = null;
        window.dispatchEvent(
          new CustomEvent('vr:dock-tab-close', {
            detail: { tab: 'settings' },
          }),
        );
      },
    });
  }
}
new App();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const scopeUrl = new URL('./', window.location.href);
    const swUrl = new URL('sw.js', scopeUrl);
    navigator.serviceWorker.register(swUrl.toString(), {
      scope: scopeUrl.pathname,
    }).catch(() => {
      // ????????????
    });
  });
}

