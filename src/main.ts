import { loadConfig, getMuseum, getScene, clearConfigCache } from './utils/config';
import { parseRoute, navigateToMuseumList, navigateToSceneList, navigateToScene, isDebugMode, isEditorMode } from './utils/router';
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
  private sceneUiRuntime: SceneUiRuntime | null = null;
  private chatRuntime: ChatRuntime | null = null;
  private viewSessionRuntime: ViewSessionRuntime;
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
        if (this.topRightControls) {
          this.topRightControls.updateVrModeState(false);
        }
        // 閲嶇疆PanoViewer鐨刅R妯″紡鏍囧織
        if (this.panoViewer && this.panoViewer.isVrModeEnabled()) {
          this.panoViewer.setVrModeEnabled(false);
        }
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
    
    // 娓呯悊褰撳墠瑙嗗浘
    this.clearView();
    // 榛樿鐩存帴杩涘叆鐜嬮紟绾康棣嗭紙鎴栧敮涓€灞曢锛?
    if (!route.museumId) {
      const defaultMuseum = this.config.museums.find(m => m.id === 'wangding') || this.config.museums[0];
      if (defaultMuseum) {
        if (defaultMuseum.scenes && defaultMuseum.scenes.length > 0) {
          navigateToScene(defaultMuseum.id, defaultMuseum.scenes[0].id);
          return;
        }
        navigateToSceneList(defaultMuseum.id);
        return;
      }
    }
    if (!route.museumId) {
      // 鏄剧ず棣嗗垪琛?
      await this.showMuseumList();
    } else if (!route.sceneId) {
      // 鏄剧ず鍦烘櫙鍒楄〃
      const museum = getMuseum(route.museumId);
      if (museum) {
        await this.showSceneList(museum);
      } else {
        this.showError('未找到指定展馆');
        navigateToMuseumList();
      }
    } else {
      // 鏄剧ず鍦烘櫙
      const museum = getMuseum(route.museumId);
      const scene = getScene(route.museumId, route.sceneId);
      
      if (museum && scene) {
        await this.showScene(museum, scene);
      } else {
        this.showError('未找到指定场景');
        if (museum) {
          navigateToSceneList(museum.id);
        } else {
          navigateToMuseumList();
        }
      }
    }
  }
  private async showMuseumList(): Promise<void> {
    if (!this.config) return;
    const [{ TitleBar }, { MuseumList }] = await Promise.all([
      this.loadTitleBarModule(),
      this.loadMuseumListModule(),
    ]);
    // 鍒涘缓鏍囬鏍?
    this.titleBar = new TitleBar(this.config.appName);
    this.appElement.appendChild(this.titleBar.getElement());
    // 鍒涘缓棣嗗垪琛?
    this.museumList = new MuseumList(this.config.museums);
    this.appElement.appendChild(this.museumList.getElement());
  }
  private async showSceneList(museum: Museum): Promise<void> {
    const { TitleBar } = await this.loadTitleBarModule();
    // 鍒涘缓鏍囬鏍?
    this.titleBar = new TitleBar(museum.name);
    this.appElement.appendChild(this.titleBar.getElement());
    const { SceneListPage } = await this.loadSceneListPageModule();
    this.sceneListPage = new SceneListPage(museum);
    this.appElement.appendChild(this.sceneListPage.getElement());
  }
  private async showScene(museum: Museum, scene: Scene): Promise<void> {
    this.currentMuseum = museum;
    this.currentScene = scene;
    this.loading.show();
    // 鍒涘缓鍏ㄦ櫙鏌ョ湅鍣ㄥ鍣紙涓嶅啀闇€瑕佷负TopBar棰勭暀绌洪棿锛?
    const viewerContainer = document.createElement('div');
    viewerContainer.className = 'viewer-container';
    viewerContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `;
    this.appElement.appendChild(viewerContainer);
    // 鍒涘缓鍏ㄦ櫙鏌ョ湅鍣紙妫€鏌ユ槸鍚﹀惎鐢ㄨ皟璇曟ā寮忥級
    const debugMode = isDebugMode();
    const { PanoViewer } = await this.loadPanoViewerModule();
    this.panoViewer = new PanoViewer(viewerContainer, debugMode);
    // 鏂?UI锛氬彸涓婅鎺у埗鎸夐挳锛堝叏灞?+ 鍧愭爣鎷惧彇 + 鏍″噯鍖楀悜锛夛級闈炵鍒濆睆锛屾敼涓哄紓姝ユ寕杞姐€?
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
    // 鏂?UI锛氬乏涓嬭姘村嵃 + About 寮圭獥锛氶潪棣栧睆鍏抽敭锛屽紓姝ユ寕杞姐€?
    void this.mountBrandMark();
    
    // 濡傛灉鍚敤璋冭瘯妯″紡锛屽垱寤鸿皟璇曢潰鏉?
    if (debugMode) {
      const { DebugPanel } = await import('./ui/DebugPanel');
      this.debugPanel = new DebugPanel();
      this.appElement.appendChild(this.debugPanel.getElement());
      
      // 璁剧疆璋冭瘯鐐瑰嚮鍥炶皟
      this.panoViewer.setOnDebugClick((x, y, yaw, pitch, fov) => {
        if (this.debugPanel) {
          this.debugPanel.show(x, y, yaw, pitch, fov);
        }
      });
      
      // 瀹炴椂鏇存柊璋冭瘯闈㈡澘锛堝綋瑙嗚鏀瑰彉鏃讹級
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
      onEnterScene: (sceneId) => {
        navigateToScene(museum.id, sceneId);
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
      this.loading.hide();
      // 鍏ㄦ櫙鍔犺浇鎴愬姛鍚庯紝娓呴櫎浠讳綍 UI 閿欒閬僵锛堜絾淇濈暀 config 閿欒锛?
      this.hideUIError();
      
      // 棰勫姞杞戒笅涓€涓満鏅殑缂╃暐鍥?
      this.preloadNextScene(museum, scene);
    });
    this.panoViewer.setOnError((error) => {
      console.error('加载场景失败:', error);
      this.loading.hide();
      this.showError('加载全景图失败，请检查网络连接');
      if (this.qualityIndicator) {
        this.qualityIndicator.updateStatus(LoadStatus.ERROR);
      }
    });
    // 銆愭渶缁堥搧寰嬨€戞墍鏈夋潵鑷?config.json 鎴?URL 鐨?yaw 閮芥槸銆愮幇瀹炰笘鐣岃搴︺€?
    // 杩涘叆娓叉煋/缃楃洏绯荤粺鍓嶏紝蹇呴』缁熶竴鍙栧弽涓€娆★細internalYaw = -worldYaw
    
    // 搴旂敤鍒濆瑙嗚锛堜紭鍏堜娇鐢?URL 鍙傛暟涓殑瑙嗚锛屽惁鍒欎娇鐢ㄥ満鏅厤缃殑瑙嗚锛?
    const route = parseRoute();
    const worldTargetYaw = route.yaw !== undefined ? route.yaw : (scene.initialView.yaw || 0);
    const targetPitch = route.pitch !== undefined ? route.pitch : (scene.initialView.pitch || 0);
    const targetFov = route.fov !== undefined ? route.fov : (scene.initialView.fov || 75);
    
    // 缁熶竴涓栫晫 鈫?鍐呴儴 yaw锛堝叧閿級
    const internalTargetYaw = -worldTargetYaw;
    
    this.panoViewer.setView(internalTargetYaw, targetPitch, targetFov);
    this.panoViewer.loadScene(scene);
    
    // 璁剧疆鍦烘櫙鏁版嵁锛堢敤浜?GroundNavDots锛?
    this.panoViewer.setSceneData(museum.id, scene.id, scene.hotspots);
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
        brandText: ZH_CN.brand.name,
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
    const currentIndex = museum.scenes.findIndex(s => s.id === currentScene.id);
    const nextIndex = (currentIndex + 1) % museum.scenes.length;
    const nextScene = museum.scenes[nextIndex];
    
    if (nextScene && nextScene.thumb) {
      const resolvedUrl = resolveAssetUrl(nextScene.thumb, AssetType.THUMB);
      if (resolvedUrl) {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.crossOrigin = 'anonymous';
        (img as any).loading = 'lazy';
        img.decoding = 'async';
        void this.resolveProxiedImageUrl(resolvedUrl)
          .then((proxiedUrl) => {
            img.src = proxiedUrl;
          })
          .catch(() => {
            img.src = resolvedUrl;
          });
      }
    }
  }
  private clearView(): void {
    // 清理所有场景级组件
    this.viewSessionRuntime.clearOverlayState();
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
    if (this.panoViewer) {
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
    
    // 重置 mode（刷新后回到 tour）
    this.mode = 'tour';
    // 清空容器
    this.appElement.innerHTML = '';
    this.appElement.appendChild(this.loading.getElement());
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
      this.panoViewer.setVrModeEnabled(false);
      // 鏇存柊鍙充笂瑙掓寜閽姸鎬?
      if (this.topRightControls) {
        this.topRightControls.updateVrModeState(false);
      }
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
        this.panoViewer.setVrModeEnabled(true);
        if (this.topRightControls) {
          this.topRightControls.updateVrModeState(true);
        }
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
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // ????????????
    });
  });
}

