import { loadConfig, getMuseum, getScene, clearConfigCache } from './utils/config';
import { parseRoute, navigateToMuseumList, navigateToSceneList, navigateToScene, isDebugMode, isEditorMode } from './utils/router';
import { normalizePathname } from './utils/urlBuilder';
import { PanoViewer } from './viewer/PanoViewer';
import { TitleBar } from './ui/TitleBar';
import { MuseumList } from './ui/MuseumList';
import { SceneList } from './ui/SceneList';
import { MapOverlay } from './ui/MapOverlay';
import type { Hotspots } from './ui/Hotspots';
import type { VideoPlayer } from './ui/VideoPlayer';
import { ControlBar } from './ui/ControlBar';
import { Loading } from './ui/Loading';
import { ConfigErrorPanel } from './ui/ConfigErrorPanel';
import type { DebugPanel } from './ui/DebugPanel';
import type { ConfigStudio } from './ui/ConfigStudio';
import { LoadStatus, type QualityIndicator } from './ui/QualityIndicator';
import './ui/ui.css';
import { TopRightControls } from './ui/TopRightControls';
import { BrandMark } from './ui/BrandMark';
import type { BottomDock } from './ui/BottomDock';
import type { SceneGuideDrawer } from './ui/SceneGuideDrawer';
import type { GuideTray } from './ui/GuideTray';
import type { TopModeTabs, AppViewMode } from './ui/TopModeTabs';
import { StructureView2D } from './ui/StructureView2D';
import type { StructureView3D } from './ui/StructureView3D';
import { buildSceneGraph } from './graph/sceneGraph';
import { resolveAssetUrl, AssetType, setAssetResolverConfig } from './utils/assetResolver';
import { toProxiedImageUrl } from './utils/externalImage';
import { isFullscreen, unlockOrientationBestEffort } from './ui/fullscreen';
import type { AppConfig, Museum, Scene } from './types/config';
import type { ValidationError } from './utils/configValidator';
import { ensureModalHost } from './ui/modals/ModalHost';
import { showToast } from './ui/toast';
import { showPickMarker } from './ui/PickMarker';
import { setLastPick } from './viewer/pickBus';
import { initYieldClassManager } from './ui/yieldClassManager';
import { initYieldPolicy } from './ui/uiYieldPolicy';
import { interactionBus } from './ui/interactionBus';
import { __VR_DEBUG__ } from './utils/debug';
import { dumpVRState, resetVRUI } from './utils/debugHelper';
import type { NorthCalibrationPanel } from './ui/NorthCalibrationPanel';
import type { FcChatPanel } from './ui/FcChatPanel';
import type { FcChatConfig } from './services/fcChatClient';
import { initFullscreenState } from './utils/fullscreenState';
import { clearAllToasts } from './ui/toast';
import { initVrMode, enableVrMode, disableVrMode, isVrModeEnabled, setInteractingCallback } from './utils/vrMode';
import { requestFullscreenBestEffort, exitFullscreenBestEffort } from './ui/fullscreen';
import { mountModal, type MountedModal } from './ui/Modal';
import { getPreferredQuality, setPreferredQuality, type QualityLevel } from './utils/qualityPreference';
import { isTouchDevice, isMouseDevice } from './utils/deviceDetect';
import './ui/uiRefresh.css';

/**
 * 缃楃洏鏃嬭浆楠岃瘉鐐癸紙淇"鑴氬簳涓嬩笢瑗垮崡鍖楃綏鐩樿窡鐫€瑙嗚涓€璧疯浆"闂锛夛細
 * - 闈炲叏灞忔ā寮忎笅鎷栧姩瑙嗚锛氱綏鐩樼洏闈紙N/E/S/W 鎴?wedge/tick锛変笉闅?yaw 鏃嬭浆锛沶eedle 鏃嬭浆銆?
 * - 濡傛灉鐩橀潰浠嶈窡鐫€杞細璇存槑杩樻湁涓€涓?transform 鍐欏湪鏇村灞?wrapper锛堢户缁悜涓婃壘 parent 鍏冪礌鐨?style.transform 鍐欏叆鐐癸紝鐩村埌娑堝け锛夈€?
 * - GroundHeadingMarker: root 鍜?inner 鐨?transform 鍙寘鍚?translateX/translateY/scaleY锛屼笉鍖呭惈 rotate
 * - CompassDisk: root 鐨?transform 鍙寘鍚?translateX/translateY/scaleY锛屼笉鍖呭惈 rotate
 * - 鍙湁 needle 閫氳繃 CSS 鍙橀噺 --groundheading-needle-rot 鍜?--compass-needle-rot 鏃嬭浆
 */

/**
 * 鍒濆鍖栬皟璇曞伐鍏凤紙浠呭湪 debug=1 鏃跺惎鐢級
 */
if (__VR_DEBUG__) {
  // 鎸傝浇鐘舵€佸揩鐓у嚱鏁?
  (window as any).__vrDump = () => {
    const snapshot = dumpVRState();
    console.debug('[VR State Snapshot]', snapshot);
    return snapshot;
  };

  // 鎸傝浇涓€閿浣嶅嚱鏁?
  (window as any).__vrResetUI = () => {
    console.debug('[VR Reset UI] 姝ｅ湪娓呯悊鎵€鏈?UI 鐘舵€?..');
    resetVRUI(interactionBus);
    console.debug('[VR Reset UI] 娓呯悊瀹屾垚');
  };

  console.debug('[VR Debug] 璋冭瘯妯″紡宸插惎鐢ㄣ€備娇鐢?__vrDump() 鏌ョ湅鐘舵€侊紝浣跨敤 __vrResetUI() 澶嶄綅 UI');
}

/**
 * 鏈€鍚庝竴娆′汉宸ュ洖褰掕矾寰勬竻鍗曪紙涓婄嚎鍓嶄汉宸ョ‘璁わ級
 * 
 * 1. 蹇€熷乏鍙虫嫋鍔?
 *    - 楠岃瘉锛氭墍鏈?UI 绔嬪嵆闅愯棌锛屾棤娈嬬暀鐘舵€?
 * 
 * 2. 浣庡ご鎵涓湴闈㈢偣
 *    - 楠岃瘉锛氬彧鏈変竴涓洰鏍囪璁ゅ畾锛屾棤闂儊
 *    - 楠岃瘉锛氬簳閮ㄦí鏉″彧杞诲井璺熼殢锛屼笉鎶㈡帶鍒舵潈
 *    - 楠岃瘉锛氶瑙堝崱绋冲畾鍒囨崲鏃犻棯鐑?
 * 
 * 3. 鎵偣 鈫?绔嬪埢婊戞í鏉?
 *    - 楠岃瘉锛氱郴缁熶笉鎶㈡帶鍒舵潈锛岃嚜鍔ㄨ涓虹珛鍗冲仠姝?
 *    - 楠岃瘉锛氬仠鎵嬪悗鎵嶆仮澶嶈嚜鍔ㄨ涓?
 * 
 * 4. 鎵偣 鈫?鎶ご
 *    - 楠岃瘉锛氭墍鏈夌姸鎬佺珛鍗虫竻绌猴紝鏃犳畫鐣?
 * 
 * 5. 鑷姩杩涘叆瑙﹀彂鐬棿鐐瑰嚮鍏朵粬 UI
 *    - 楠岃瘉锛氭墍鏈夋彁绀?鍊掕鏃?鐬勫噯鐘舵€佺珛鍗虫竻绌?
 *    - 楠岃瘉锛氫笉浼氳Е鍙戣嚜鍔ㄨ繘鍏?
 * 
 * 璋冭瘯寮€鍏筹細鍦?src/utils/debug.ts 涓皢 __VR_DEBUG__ 璁句负 true 鍙煡鐪嬬姸鎬佹祦杞棩蹇?
 */

/**
 * 鍙戝竷娴佺▼娓呭崟
 * 
 * PowerShell 涓嬪垹闄?docs/assets 鍜?docs/index.html 鐨勫懡浠わ細
 * Remove-Item -Recurse -Force .\docs\assets -ErrorAction SilentlyContinue
 * Remove-Item -Force .\docs\index.html -ErrorAction SilentlyContinue
 */

// 銆愬叆鍙ｃ€戜慨澶嶅弻鏂滄潬璺緞闂锛堝 //vrplayer// -> /vrplayer/锛?
normalizePathname();

// 鍒濆鍖?UI 璁╀綅绛栫暐
initYieldPolicy();
initYieldClassManager();

// 鍒濆鍖栧叏灞忕姸鎬佺鐞嗗櫒
initFullscreenState();

// 鍒濆鍖朧R妯″紡绠＄悊鍣紙鐩戝惉鍏ㄥ睆鐘舵€佸彉鍖栵級
const setVrModeChangeCallback = initVrMode();

// 鐩戝惉鍏ㄥ睆鐘舵€佸彉鍖栵紝娓呴櫎鎵€鏈夋彁绀?
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
 * 妫€娴嬫槸鍚︿负寮€鍙戣€呮ā寮?
 * URL 鍙傛暟锛?development=1 鎴??dev=1 鎴?#development
 */
function isDevMode(): boolean {
  const params = new URLSearchParams(location.search);
  return params.has('development') || params.get('dev') === '1' || location.hash.includes('development');
}

/**
 * DNS 棰勭儹锛氬凡绂佺敤
 * 鐢变簬鍥剧墖鐜板湪閫氳繃鍚屾簮浠ｇ悊 /_img 鍔犺浇锛屼笉鍐嶉渶瑕?preconnect 鍒扮涓夋柟鍩熷悕
 */
// function warmupExternalImageHostsFromConfig(config: AppConfig): void {
//   // 宸茬鐢細鍥剧墖閫氳繃鍚屾簮浠ｇ悊鍔犺浇锛屼笉闇€瑕?preconnect
// }

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
  private sceneList: SceneList | null = null;
  private mapOverlay: MapOverlay | null = null;
  private hotspots: Hotspots | null = null;
  private videoPlayer: VideoPlayer | null = null;
  private controlBar: ControlBar | null = null;
  private loading: Loading;
  private debugPanel: DebugPanel | null = null;
  private configStudio: ConfigStudio | null = null;
  private qualityIndicator: QualityIndicator | null = null;
  private northCalibrationPanel: NorthCalibrationPanel | null = null;
  private currentMuseum: Museum | null = null;
  private currentScene: Scene | null = null;
  private hasBoundFullscreenEvents = false;
  private mode: AppViewMode = 'tour';
  private isStructureOverlayOpen = false; // 缁撴瀯鍥?涓夌淮妯″瀷overlay鏄惁鎵撳紑
  private structureView2D: StructureView2D | null = null;
  private structureView3D: StructureView3D | null = null;
  private fcChatPanel: FcChatPanel | null = null;
  private infoModalMounted: MountedModal | null = null;
  private settingsModalMounted: MountedModal | null = null;
  private handlePopState: (() => void) | null = null;
  private handlePickEvent: ((e: Event) => void) | null = null;
  private handlePickModeEvent: ((e: Event) => void) | null = null;
  private handleMetricsEvent: ((e: Event) => void) | null = null;
  private debugPanelRafId: number | null = null;
  private structure3DLoadToken = 0;
  private chatInitToken = 0;
  private chatFirstInteractionHandler: (() => void) | null = null;

  constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) {
      throw new Error('鎵句笉鍒?#app 鍏冪礌');
    }
    this.appElement = appElement;
    // 鍒濆鍖栧叏灞€ ModalHost锛堢敤浜庣儹鐐瑰脊绐楃瓑锛?
    ensureModalHost();
    
    this.loading = new Loading();
    this.appElement.appendChild(this.loading.getElement());
    
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
        if (this.topRightControls && !isVrModeEnabled()) {
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
      console.error('閰嶇疆鍔犺浇澶辫触:', error);
      this.loading.hide();
      
      // 妫€鏌ユ槸鍚︽槸閰嶇疆鏍￠獙閿欒
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        this.showConfigErrorPanel(error.validationErrors);
      } else {
        // 閰嶇疆鍔犺浇澶辫触锛坒etch/瑙ｆ瀽澶辫触锛?
        this.showError('鍔犺浇閰嶇疆澶辫触锛岃鍒锋柊椤甸潰閲嶈瘯');
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
      console.error('鍒濆鍖栫紪杈戝櫒妯″紡澶辫触:', error);
      
      // 妫€鏌ユ槸鍚︽槸閰嶇疆鏍￠獙閿欒
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        this.showConfigErrorPanel(error.validationErrors);
      } else {
      this.showError('鍔犺浇閰嶇疆澶辫触锛岃鍒锋柊椤甸潰閲嶈瘯');
      }
    }
  }

  private showConfigErrorPanel(errors: ValidationError[]): void {
    // 娓呯┖褰撳墠瑙嗗浘
    this.appElement.innerHTML = '';
    
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
          <title>config.json 绀轰緥</title>
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
          <h1>config.json 绀轰緥閰嶇疆</h1>
          <pre><code>{
  "appName": "搴旂敤鍚嶇О",
  "museums": [
    {
      "id": "museum_id",
      "name": "灞曢鍚嶇О",
      "cover": "https://example.com/cover.jpg",
      "map": {
        "image": "https://example.com/map.jpg",
        "width": 1000,
        "height": 600
      },
      "scenes": [
        {
          "id": "scene_id",
          "name": "鍦烘櫙鍚嶇О",
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
              "label": "鐑偣鏍囩",
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
          <p>璇︾粏閰嶇疆璇存槑璇锋煡鐪?README.md</p>
        </body>
        </html>
      `);
    }
  }

  private async handleRoute(): Promise<void> {
    if (!this.config) return;

    const route = parseRoute();
    
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
      this.showMuseumList();
    } else if (!route.sceneId) {
      // 鏄剧ず鍦烘櫙鍒楄〃
      const museum = getMuseum(route.museumId);
      if (museum) {
        this.showSceneList(museum);
      } else {
        this.showError('鏈壘鍒版寚瀹氱殑灞曢');
        navigateToMuseumList();
      }
    } else {
      // 鏄剧ず鍦烘櫙
      const museum = getMuseum(route.museumId);
      const scene = getScene(route.museumId, route.sceneId);
      
      if (museum && scene) {
        await this.showScene(museum, scene);
      } else {
        this.showError('鏈壘鍒版寚瀹氱殑鍦烘櫙');
        if (museum) {
          navigateToSceneList(museum.id);
        } else {
          navigateToMuseumList();
        }
      }
    }
  }

  private showMuseumList(): void {
    if (!this.config) return;

    // 鍒涘缓鏍囬鏍?
    this.titleBar = new TitleBar(this.config.appName);
    this.appElement.appendChild(this.titleBar.getElement());

    // 鍒涘缓棣嗗垪琛?
    this.museumList = new MuseumList(this.config.museums);
    this.appElement.appendChild(this.museumList.getElement());
  }

  private showSceneList(museum: Museum): void {
    // 鍒涘缓鏍囬鏍?
    this.titleBar = new TitleBar(museum.name);
    this.appElement.appendChild(this.titleBar.getElement());

    // 鍒涘缓鍦烘櫙鍒楄〃锛堢被浼奸鍒楄〃鐨勫睍绀烘柟寮忥級
    const sceneListElement = document.createElement('div');
    sceneListElement.className = 'scene-list-page';
    sceneListElement.innerHTML = `
      <div class="scene-list-container">
        <h1 class="scene-list-title">${museum.name} - 鍦烘櫙鍒楄〃</h1>
        ${museum.description ? `<p class="scene-list-desc">${museum.description}</p>` : ''}
        <div class="scene-grid">
          ${museum.scenes.map(scene => `
            <div class="scene-card" data-scene-id="${scene.id}">
              <div class="scene-cover">
                <img src="${scene.thumb}" alt="${scene.name}" loading="lazy">
                <div class="scene-overlay">
                  <h2 class="scene-name">${scene.name}</h2>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // 娣诲姞鏍峰紡
    const style = document.createElement('style');
    style.textContent = `
      .scene-list-page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding-top: calc(44px + env(safe-area-inset-top, 0px));
      }
      .scene-list-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .scene-list-title {
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
      }
      .scene-list-desc {
        max-width: 820px;
        margin: -12px auto 26px;
        color: rgba(255,255,255,0.92);
        font-size: 15px;
        line-height: 1.6;
        text-align: center;
      }
      .scene-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
      .scene-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }
      .scene-card:active {
        transform: scale(0.98);
      }
      .scene-cover {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        overflow: hidden;
      }
      .scene-cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .scene-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 15px;
        color: #fff;
      }
      .scene-name {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }
    `;
    document.head.appendChild(style);

    // 缁戝畾鐐瑰嚮浜嬩欢
    sceneListElement.querySelectorAll('.scene-card').forEach(card => {
      card.addEventListener('click', () => {
        const sceneId = card.getAttribute('data-scene-id');
        if (sceneId) {
          navigateToScene(museum.id, sceneId);
        }
      });
    });

    this.appElement.appendChild(sceneListElement);
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
    this.panoViewer = new PanoViewer(viewerContainer, debugMode);

    // 鏂?UI锛氬彸涓婅鎺у埗鎸夐挳锛堝叏灞?+ 鍧愭爣鎷惧彇 + 鏍″噯鍖楀悜锛? 闄嶇骇淇濇姢
    // 寮€鍙戣€呮ā寮忥細浠呭綋 URL 甯?development 鍙傛暟鏃舵墠鏄剧ず鍧愭爣鎷惧彇鍜屾牎鍑嗗寳鍚?
    const devMode = isDevMode();
    try {
      this.topRightControls = new TopRightControls({
        viewerRootEl: viewerContainer,
        onTogglePickMode: devMode ? () => {
          if (this.panoViewer) {
            if (this.panoViewer.isPickModeEnabled()) {
              this.panoViewer.disablePickMode();
            } else {
              this.panoViewer.enablePickMode();
            }
            return this.panoViewer.isPickModeEnabled();
          }
          return false;
        } : undefined,
        onOpenNorthCalibration: devMode ? () => {
          void this.openNorthCalibration(scene.id);
        } : undefined,
        showNorthCalibration: devMode, // 浠呭紑鍙戣€呮ā寮忔樉绀?
        onToggleVrMode: async () => {
          return this.toggleVrModeFromUI(viewerContainer);
        },
      });
      this.appElement.appendChild(this.topRightControls.getElement());
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] TopRightControls 鍒涘缓澶辫触锛岃烦杩?', err);
      }
      this.topRightControls = null;
    }

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
      showToast(`宸插鍒?yaw: ${yaw.toFixed(2)}, pitch: ${pitch.toFixed(2)}`);
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

    // 鏂?UI锛氬乏涓嬭姘村嵃 + About 寮圭獥 - 闄嶇骇淇濇姢 + 骞傜瓑淇濇姢
    try {
      // 骞傜瓑淇濇姢锛氬鏋滃凡瀛樺湪锛屼笉鍐嶉噸澶嶅垱寤?
      const existingBrandMark = this.appElement.querySelector('.vr-brandmark');
      if (!existingBrandMark) {
        this.brandMark = new BrandMark({
          appName: this.config?.appName,
          brandText: '榧庤檸娓呮簮',
        });
        const el = this.brandMark.getElement();
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openDingHuQingYuan();
        });
        this.appElement.appendChild(el);
      } else {
        // 濡傛灉宸插瓨鍦紝澶嶇敤鐜版湁鍏冪礌
        if (__VR_DEBUG__) {
          console.debug('[showScene] BrandMark 宸插瓨鍦紝璺宠繃閲嶅鍒涘缓');
        }
      }
      // TeamIntroModal 涓嶅啀鐩存帴鎸傝浇锛屽彧鍦?open() 鏃舵寕杞藉埌 #vr-modal-root
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] BrandMark 鍒涘缓澶辫触锛岃烦杩?', err);
      }
      this.brandMark = null;
    }
    
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
    
    let deferredUiMounted = false;
    let deferredUiLoading = false;
    const mountDeferredSceneUI = async () => {
      if (deferredUiMounted || deferredUiLoading) return;
      if (!this.panoViewer) return;
      if (!this.currentScene || this.currentScene.id !== scene.id) return;
      deferredUiLoading = true;

      try {
        const [
          { VideoPlayer },
          { GuideTray },
          { SceneGuideDrawer },
          { BottomDock },
          { TopModeTabs },
          { Hotspots },
          { QualityIndicator },
        ] = await Promise.all([
          import('./ui/VideoPlayer'),
          import('./ui/GuideTray'),
          import('./ui/SceneGuideDrawer'),
          import('./ui/BottomDock'),
          import('./ui/TopModeTabs'),
          import('./ui/Hotspots'),
          import('./ui/QualityIndicator'),
        ]);

        if (deferredUiMounted) return;
        if (!this.panoViewer) return;
        if (!this.currentScene || this.currentScene.id !== scene.id) return;
        deferredUiMounted = true;

        // 鍒涘缓瑙嗛鎾斁鍣?- 闄嶇骇淇濇姢
        try {
          this.videoPlayer = new VideoPlayer();
          this.appElement.appendChild(this.videoPlayer.getElement());
        } catch (err) {
          if (__VR_DEBUG__) {
            console.debug('[showScene] VideoPlayer 鍒涘缓澶辫触锛岃烦杩?', err);
          }
          this.videoPlayer = null;
        }

        // 鏂?UI锛氬瑙堣交閲忛瑙堟潯锛堟3锛? 闄嶇骇淇濇姢
        try {
          this.guideTray = new GuideTray({
            museumId: museum.id,
            currentSceneId: scene.id,
            scenes: museum.scenes,
            onSceneClick: (sceneId) => {
              navigateToScene(museum.id, sceneId);
            },
            onMoreClick: () => {
              if (!this.sceneGuideDrawer) {
                try {
                  this.sceneGuideDrawer = new SceneGuideDrawer({
                    museumId: museum.id,
                    currentSceneId: scene.id,
                    scenes: museum.scenes,
                    onClose: () => {
                      // no-op
                    },
                  });
                  this.appElement.appendChild(this.sceneGuideDrawer.getElement());
                } catch (err) {
                  if (__VR_DEBUG__) {
                    console.debug('[GuideTray] SceneGuideDrawer 鍒涘缓澶辫触:', err);
                  }
                }
              }
              if (this.guideTray) {
                this.guideTray.setVisible(false);
              }
              if (this.sceneGuideDrawer) {
                this.sceneGuideDrawer.open();
              }
            },
            onClose: () => {
              if (this.guideTray) {
                this.guideTray.setVisible(false);
              }
              window.dispatchEvent(
                new CustomEvent('vr:dock-tab-close', {
                  detail: { tab: 'guide' },
                }),
              );
            },
          });
          this.guideTray.setVisible(false);
          this.appElement.appendChild(this.guideTray.getElement());
        } catch (err) {
          if (__VR_DEBUG__) {
            console.debug('[showScene] GuideTray 鍒涘缓澶辫触锛岃烦杩?', err);
          }
          this.guideTray = null;
        }

        // 鏂?UI锛氬簳閮?Dock锛堝瑙?tab 鎵撳紑鎶藉眽锛? 闄嶇骇淇濇姢
        try {
          this.bottomDock = new BottomDock({
            onGuideClick: () => {
              if (this.guideTray) {
                this.guideTray.setVisible(true);
              }
            },
            onOpenInfo: () => this.openInfoModal(),
            onOpenSettings: () => this.openSettingsModal(),
            sceneId: scene.id,
            sceneName: scene.name,
            museum: museum,
            scenes: museum.scenes,
            currentSceneId: scene.id,
          });
          this.appElement.appendChild(this.bottomDock.getElement());
        } catch (err) {
          if (__VR_DEBUG__) {
            console.debug('[showScene] BottomDock 鍒涘缓澶辫触锛岃烦杩?', err);
          }
          this.bottomDock = null;
        }

        // 鏂?UI锛氶《閮ㄦā寮忓垏鎹ab锛堝瑙嗛鏍硷級- 闄嶇骇淇濇姢
        try {
          this.topModeTabs = new TopModeTabs({
            initialMode: this.mode,
            onModeChange: (mode) => {
              this.setMode(mode);
            },
          });
          this.appElement.appendChild(this.topModeTabs.getElement());
        } catch (err) {
          if (__VR_DEBUG__) {
            console.debug('[showScene] TopModeTabs 鍒涘缓澶辫触锛岃烦杩?', err);
          }
          this.topModeTabs = null;
        }

        // 鍒涘缓鐑偣锛圖OM Overlay锛氭瘡甯ц窡闅?camera 鎶曞奖锛? 闄嶇骇淇濇姢
        try {
          const sceneNameMap = new Map(museum.scenes.map((s) => [s.id, s.name]));
          this.hotspots = new Hotspots(this.panoViewer, scene.hotspots, {
            resolveSceneName: (sceneId) => sceneNameMap.get(sceneId),
            onEnterScene: (sceneId) => {
              navigateToScene(museum.id, sceneId);
            },
            museumId: museum.id,
          });
          viewerContainer.appendChild(this.hotspots.getElement());
        } catch (err) {
          if (__VR_DEBUG__) {
            console.debug('[showScene] Hotspots 鍒涘缓澶辫触锛岃烦杩?', err);
          }
          this.hotspots = null;
        }

        // 鍒涘缓娓呮櫚搴︾姸鎬佹寚绀哄櫒 - 闄嶇骇淇濇姢
        try {
          this.qualityIndicator = new QualityIndicator();
          this.appElement.appendChild(this.qualityIndicator.getElement());
          if (this.panoViewer) {
            this.qualityIndicator.updateStatus(this.panoViewer.getLoadStatus());
          }
        } catch (err) {
          if (__VR_DEBUG__) {
            console.debug('[showScene] QualityIndicator 鍒涘缓澶辫触锛岃烦杩?', err);
          }
          this.qualityIndicator = null;
        }
        if (this.handleMetricsEvent) {
          window.removeEventListener('vr:metrics', this.handleMetricsEvent);
          this.handleMetricsEvent = null;
        }
        this.handleMetricsEvent = (event: Event) => {
          if (!this.qualityIndicator) return;
          const detail = (event as CustomEvent).detail || {};
          this.qualityIndicator.updateMetrics(detail);
        };
        window.addEventListener('vr:metrics', this.handleMetricsEvent);
      } finally {
        deferredUiLoading = false;
      }
    };

    // 璁剧疆鍔犺浇鐘舵€佸彉鍖栧洖璋?
    this.panoViewer.setOnStatusChange((status) => {
      if (this.qualityIndicator) {
        this.qualityIndicator.updateStatus(status);
      }
      if (
        !deferredUiMounted &&
        (status === LoadStatus.LOW_READY ||
          status === LoadStatus.HIGH_READY ||
          status === LoadStatus.DEGRADED)
      ) {
        window.setTimeout(() => {
          void mountDeferredSceneUI();
        }, 0);
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
      void mountDeferredSceneUI();
      this.loading.hide();
      // 鍏ㄦ櫙鍔犺浇鎴愬姛鍚庯紝娓呴櫎浠讳綍 UI 閿欒閬僵锛堜絾淇濈暀 config 閿欒锛?
      this.hideUIError();
      
      // 棰勫姞杞戒笅涓€涓満鏅殑缂╃暐鍥?
      this.preloadNextScene(museum, scene);
    });

    this.panoViewer.setOnError((error) => {
      console.error('鍔犺浇鍦烘櫙澶辫触:', error);
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

    // 鍒涘缓鑱婂ぉ闈㈡澘锛堝浼?闂瓟锛夛細改为首交互触发，避免首屏空闲预热占用
    this.setupChatOnFirstInteraction(museum, scene);
  }

  private setupChatOnFirstInteraction(museum: Museum, scene: Scene): void {
    this.chatInitToken += 1;
    this.clearChatFirstInteractionListeners();

    const fcChatConfig = this.config?.fcChat;
    if (!fcChatConfig?.endpoint || !fcChatConfig.endpoint.trim()) {
      return;
    }

    const chatToken = this.chatInitToken;
    const trigger = () => {
      this.clearChatFirstInteractionListeners();
      void this.initChatPanel(chatToken, fcChatConfig, museum, scene);
    };

    this.chatFirstInteractionHandler = trigger;
    window.addEventListener('pointerdown', trigger, { passive: true });
    window.addEventListener('touchstart', trigger, { passive: true });
    window.addEventListener('keydown', trigger);
  }

  private async initChatPanel(
    chatToken: number,
    fcChatConfig: FcChatConfig,
    museum: Museum,
    scene: Scene
  ): Promise<void> {
    if (chatToken !== this.chatInitToken) return;
    if (!this.currentScene || this.currentScene.id !== scene.id) return;

    try {
      const [{ FcChatPanel }, { FcChatClient }] = await Promise.all([
        import('./ui/FcChatPanel'),
        import('./services/fcChatClient'),
      ]);
      if (chatToken !== this.chatInitToken) return;
      if (!this.currentScene || this.currentScene.id !== scene.id) return;

      const clientConfig: FcChatConfig = {
        endpoint: fcChatConfig.endpoint,
        authToken: fcChatConfig.authToken,
        timeoutMs: 15000,
      };
      const client = new FcChatClient(clientConfig);

      if (this.fcChatPanel) {
        this.fcChatPanel.remove();
        this.fcChatPanel = null;
      }

      this.fcChatPanel = new FcChatPanel(client, {
        museumId: museum.id,
        sceneId: scene.id,
        sceneTitle: scene.name,
        museumName: museum.name,
        url: window.location.href,
      });
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] FcChatPanel 鍒涘缓澶辫触锛岃烦杩?', err);
      }
      this.fcChatPanel = null;
    }
  }

  private clearChatFirstInteractionListeners(): void {
    if (!this.chatFirstInteractionHandler) return;
    window.removeEventListener('pointerdown', this.chatFirstInteractionHandler);
    window.removeEventListener('touchstart', this.chatFirstInteractionHandler);
    window.removeEventListener('keydown', this.chatFirstInteractionHandler);
    this.chatFirstInteractionHandler = null;
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
        img.src = toProxiedImageUrl(resolvedUrl);
      }
    }
  }

  private clearView(): void {
    // 娓呯悊鎵€鏈夌粍浠?
    this.chatInitToken += 1;
    this.clearChatFirstInteractionListeners();
    this.structure3DLoadToken += 1;

    if (this.handlePickEvent) {
      window.removeEventListener('vr:pick', this.handlePickEvent);
      this.handlePickEvent = null;
    }
    if (this.handlePickModeEvent) {
      window.removeEventListener('vr:pickmode', this.handlePickModeEvent);
      this.handlePickModeEvent = null;
    }
    if (this.handleMetricsEvent) {
      window.removeEventListener('vr:metrics', this.handleMetricsEvent);
      this.handleMetricsEvent = null;
    }
    if (this.debugPanelRafId !== null) {
      cancelAnimationFrame(this.debugPanelRafId);
      this.debugPanelRafId = null;
    }

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

    if (this.topModeTabs) {
      this.topModeTabs.getElement().remove();
      this.topModeTabs = null;
    }

    if (this.sceneTitleEl) {
      this.sceneTitleEl.remove();
      this.sceneTitleEl = null;
    }

    if (this.brandMark) {
      this.brandMark.remove();
      this.brandMark = null;
    }

    if (this.bottomDock) {
      this.bottomDock.remove();
      this.bottomDock = null;
    }

    if (this.guideTray) {
      this.guideTray.remove();
      this.guideTray = null;
    }

    if (this.sceneGuideDrawer) {
      this.sceneGuideDrawer.remove();
      this.sceneGuideDrawer = null;
    }

    if (this.museumList) {
      this.museumList.remove();
      this.museumList = null;
    }
    
    if (this.sceneList) {
      this.sceneList.remove();
      this.sceneList = null;
    }
    
    if (this.mapOverlay) {
      this.mapOverlay.remove();
      this.mapOverlay = null;
    }
    
    if (this.hotspots) {
      this.hotspots.remove();
      this.hotspots = null;
    }
    
    if (this.videoPlayer) {
      this.videoPlayer.remove();
      this.videoPlayer = null;
    }
    
    if (this.controlBar) {
      this.controlBar.remove();
      this.controlBar = null;
    }
    
    if (this.debugPanel) {
      this.debugPanel.remove();
      this.debugPanel = null;
    }
    
    if (this.configStudio) {
      this.configStudio.remove();
      this.configStudio = null;
    }
    
    if (this.qualityIndicator) {
      this.qualityIndicator.remove();
      this.qualityIndicator = null;
    }


    // 娓呯悊缁撴瀯鍥?涓夌淮妯″瀷overlay
    if (this.structureView2D) {
      const element = this.structureView2D.getElement();
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.structureView2D = null;
    }
    if (this.structureView3D) {
      const element = this.structureView3D.getElement();
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.structureView3D = null;
    }
    this.isStructureOverlayOpen = false;

    if (this.fcChatPanel) {
      this.fcChatPanel.remove();
      this.fcChatPanel = null;
    }

    // 閲嶇疆 mode锛堝埛鏂板悗鍥炲埌 tour锛?
    this.mode = 'tour';

    // 娓呯┖瀹瑰櫒
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
    const previousMode = this.mode;
    this.mode = mode;
    
    // 鏇存柊 TopModeTabs
    if (this.topModeTabs) {
      this.topModeTabs.setMode(mode);
    }
    
    // 濡傛灉鍒囨崲鍒皌our妯″紡锛屼笖褰撳墠鏈塷verlay鎵撳紑锛屽厛鍏抽棴overlay
    if (mode === 'tour' && this.isStructureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }
    
    // 澶勭悊 structure2d overlay
    if (mode === 'structure2d') {
      this.openStructure2D();
    } else if (mode === 'structure3d') {
      void this.openStructure3D();
    }
  }

  /**
   * 鎵撳紑缁撴瀯鍥?D overlay
   */
  private openStructure2D(): void {
    if (!this.currentMuseum || !this.currentScene) return;
    
    // 濡傛灉宸叉湁overlay鎵撳紑锛屽厛娓呭満
    if (this.isStructureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }
    
    const graph = buildSceneGraph(this.currentMuseum, this.currentScene.id);
    
    // 鍒涘缓鎴栨洿鏂?structure2d overlay
    if (!this.structureView2D) {
      this.structureView2D = new StructureView2D({
        museum: this.currentMuseum,
        graph,
        currentSceneId: this.currentScene.id,
        onClose: () => {
          // 鐐瑰嚮脳鍏抽棴鏃讹紝鍏抽棴overlay骞跺垏鍥瀟our
          this.closeStructureOverlay({ toTour: true });
        },
        onNodeClick: (museumId, sceneId) => {
          // 鐐瑰嚮鑺傜偣鏃讹紝鍏堝叧闂璷verlay锛屽啀璺宠浆鍦烘櫙
          this.closeStructureOverlay({ toTour: false });
          navigateToScene(museumId, sceneId);
        },
      });
      this.appElement.appendChild(this.structureView2D.getElement());
    } else {
      this.structureView2D.updateContext({
        museum: this.currentMuseum,
        graph,
        currentSceneId: this.currentScene.id,
      });
    }
    
    // 鏍囪overlay宸叉墦寮€
    this.isStructureOverlayOpen = true;
    
    // 璁剧疆body overflow
    document.body.style.overflow = 'hidden';
    
    // 鎵撳紑overlay
    this.structureView2D.open();
  }

  /**
   * 鎵撳紑涓夌淮妯″瀷3D overlay
   */
  private async openStructure3D(): Promise<void> {
    if (!this.currentMuseum || !this.currentScene) return;
    
    // 濡傛灉宸叉湁overlay鎵撳紑锛屽厛娓呭満
    if (this.isStructureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }
    
    this.structure3DLoadToken += 1;
    const loadToken = this.structure3DLoadToken;
    const graph = buildSceneGraph(this.currentMuseum, this.currentScene.id);
    
    // 鍒涘缓鎴栨洿鏂?structure3d overlay
    if (!this.structureView3D) {
      const { StructureView3D } = await import('./ui/StructureView3D');
      if (loadToken !== this.structure3DLoadToken || this.mode !== 'structure3d') {
        return;
      }
      this.structureView3D = new StructureView3D({
        museum: this.currentMuseum,
        graph,
        currentSceneId: this.currentScene.id,
        onClose: () => {
          // 鐐瑰嚮脳鍏抽棴鏃讹紝鍏抽棴overlay骞跺垏鍥瀟our
          this.closeStructureOverlay({ toTour: true });
        },
        onNodeClick: (museumId, sceneId) => {
          // 鐐瑰嚮鑺傜偣鏃讹紝鍏堝叧闂璷verlay锛屽啀璺宠浆鍦烘櫙
          this.closeStructureOverlay({ toTour: false });
          navigateToScene(museumId, sceneId);
        },
      });
      this.appElement.appendChild(this.structureView3D.getElement());
    } else {
      if (loadToken !== this.structure3DLoadToken || this.mode !== 'structure3d') {
        return;
      }
      this.structureView3D.updateContext({
        museum: this.currentMuseum,
        graph,
        currentSceneId: this.currentScene.id,
      });
    }
    
    // 鏍囪overlay宸叉墦寮€
    this.isStructureOverlayOpen = true;
    
    // 璁剧疆body overflow
    document.body.style.overflow = 'hidden';
    
    // 鎵撳紑overlay
    this.structureView3D.open();
  }

  /**
   * 鍏抽棴缁撴瀯鍥?涓夌淮妯″瀷overlay锛堝敮涓€鍏抽棴鍏ュ彛锛?
   * @param toTour 鏄惁鍒囨崲鍒皌our妯″紡
   */
  private closeStructureOverlay(options: { toTour: boolean }): void {
    // 濡傛灉overlay鏈墦寮€锛岀洿鎺ヨ繑鍥?
    if (!this.isStructureOverlayOpen) return;
    this.structure3DLoadToken += 1;
    
    // 鏍囪overlay宸插叧闂?
    this.isStructureOverlayOpen = false;
    
    // 浠嶥OM涓交搴曠Щ闄verlay鍏冪礌锛堣€屼笉鏄彧闅愯棌锛?
    if (this.structureView2D) {
      const element = this.structureView2D.getElement();
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.structureView2D = null;
    }
    
    if (this.structureView3D) {
      const element = this.structureView3D.getElement();
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.structureView3D = null;
    }
    
    // 鎭㈠body鏍峰紡锛堟竻闄ゆ墍鏈夊彲鑳芥坊鍔犵殑鏍峰紡锛?
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.body.style.overscrollBehavior = '';
    
    // 濡傛灉瑕佹眰鍒囨崲鍒皌our妯″紡锛屾洿鏂扮姸鎬佸拰UI
    if (options.toTour) {
      this.mode = 'tour';
      if (this.topModeTabs) {
        this.topModeTabs.setMode('tour');
      }
    }
  }

  private async openNorthCalibration(sceneId: string): Promise<void> {
    // 娓呯悊涔嬪墠鐨勬牎鍑嗛潰鏉匡紙濡傛灉瀛樺湪锛?
    if (this.northCalibrationPanel) {
      this.northCalibrationPanel.close();
      this.northCalibrationPanel = null;
    }

    if (!this.panoViewer) {
      console.warn('[openNorthCalibration] PanoViewer 鏈垵濮嬪寲');
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
      console.error('[openNorthCalibration] 鍒涘缓鏍″噯闈㈡澘澶辫触:', err);
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
        console.debug('[openDingHuQingYuan] 鎵撳紑鍥㈤槦浠嬬粛澶辫触:', err);
      }
    }
  }

  /**
   * 搴曢儴銆屼俊鎭€嶅脊绐?
   */
  private openInfoModal(): void {
    // 纭繚鍗曚緥锛氬宸插瓨鍦ㄥ厛鍏抽棴
    this.infoModalMounted?.close();
    this.infoModalMounted = null;

    const museumName = this.currentMuseum?.name || '-';
    const sceneName = this.currentScene?.name || '-';

    const content = document.createElement('div');
    content.className = 'vr-modal-info-list';
    content.innerHTML = `
      <div><span class="vr-modal-info-row-label">灞曢</span><span>${museumName}</span></div>
      <div><span class="vr-modal-info-row-label">鍦烘櫙</span><span>${sceneName}</span></div>
      <div><span class="vr-modal-info-row-label">閲囬泦鏃堕棿</span><span> 2025-12-27</span></div>
      <div class="vr-modal-info-copyright">
        <button type="button" role="button" class="vr-modal-info-copyright-btn">漏 2025 榧庤檸娓呮簮</button>
      </div>
    `;

    // 搴曢儴鐗堟潈鏂囨湰鐐瑰嚮浜嬩欢锛氬厛鍏抽棴淇℃伅寮圭獥锛屽啀鎵撳紑鈥滈紟铏庢竻婧愨€濆脊绐?
    const copyrightBtn = content.querySelector('.vr-modal-info-copyright-btn') as HTMLButtonElement;
    if (copyrightBtn) {
      copyrightBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 鍏堝叧闂俊鎭脊绐楋紝鍐嶆墦寮€榧庤檸娓呮簮锛岄伩鍏嶅眰绾ч伄鎸?
        if (this.infoModalMounted) {
          this.infoModalMounted.close();
        }
        setTimeout(() => {
          this.openDingHuQingYuan();
        }, 0);
      });
    }

    this.infoModalMounted = mountModal({
      title: '淇℃伅',
      contentEl: content,
      onClose: () => {
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

    const currentlyEnabled = isVrModeEnabled();

    if (currentlyEnabled) {
      // 褰撳墠宸插惎鐢紝鍏抽棴VR妯″紡
      disableVrMode();
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
      setInteractingCallback(() => {
        return this.panoViewer?.isInteracting() ?? false;
      });

      const success = await enableVrMode((yawDelta, pitchDelta) => {
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

  /**
   * 搴曢儴銆岃缃€嶅脊绐?
   */
  private openSettingsModal(): void {
    // 纭繚鍗曚緥锛氬宸插瓨鍦ㄥ厛鍏抽棴
    this.settingsModalMounted?.close();
    this.settingsModalMounted = null;

    const isTouch = isTouchDevice();
    const isMouse = isMouseDevice();
    const currentQuality = getPreferredQuality();

    const container = document.createElement('div');
    container.className = 'vr-modal-settings-list';

    // 鐢昏川鍒囨崲
    const qualityLabel = document.createElement('div');
    qualityLabel.className = 'vr-modal-settings-item-label';
    qualityLabel.textContent = '鐢昏川';

    const qualityGroup = document.createElement('div');
    qualityGroup.className = 'vr-modal-settings-quality';

    const highBtn = document.createElement('button');
    highBtn.className = 'vr-modal-settings-quality-btn';
    highBtn.textContent = '楂樻竻';
    highBtn.dataset.level = 'high';

    const lowBtn = document.createElement('button');
    lowBtn.className = 'vr-modal-settings-quality-btn';
    lowBtn.textContent = '鐪佹祦';
    lowBtn.dataset.level = 'low';

    const applyQualityActive = (level: QualityLevel) => {
      highBtn.classList.toggle('is-active', level === 'high');
      lowBtn.classList.toggle('is-active', level === 'low');
    };

    applyQualityActive(currentQuality);

    const handleQualityClick = (level: QualityLevel) => {
      if (!this.currentScene || !this.panoViewer) return;
      const prev = getPreferredQuality();
      if (prev === level) return;
      setPreferredQuality(level);
      applyQualityActive(level);
      // 浣跨敤 preserveView 閲嶆柊鍔犺浇褰撳墠鍦烘櫙璧勬簮
      this.panoViewer.loadScene(this.currentScene, { preserveView: true });
    };

    highBtn.addEventListener('click', () => handleQualityClick('high'));
    lowBtn.addEventListener('click', () => handleQualityClick('low'));

    qualityGroup.appendChild(highBtn);
    qualityGroup.appendChild(lowBtn);

    const qualityRow = document.createElement('div');
    qualityRow.appendChild(qualityLabel);
    qualityRow.appendChild(qualityGroup);

    // 閲嶇疆瑙嗚
    const resetLabel = document.createElement('div');
    resetLabel.className = 'vr-modal-settings-item-label';
    resetLabel.textContent = '瑙嗚';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'vr-modal-settings-row-btn';
    resetBtn.type = 'button';
    resetBtn.textContent = '鎭㈠鍒濆瑙嗚';
    resetBtn.addEventListener('click', () => {
      if (!this.currentScene || !this.panoViewer) return;
      const iv = this.currentScene.initialView || { yaw: 0, pitch: 0, fov: 75 };
      const worldYaw = iv.yaw || 0;
      const internalYaw = -worldYaw;
      const pitch = iv.pitch || 0;
      const fov = iv.fov ?? 75;
      this.panoViewer.setView(internalYaw, pitch, fov);
    });

    const resetRow = document.createElement('div');
    resetRow.appendChild(resetLabel);
    resetRow.appendChild(resetBtn);

    // VR 鐪奸暅
    const vrLabel = document.createElement('div');
    vrLabel.className = 'vr-modal-settings-item-label';
    vrLabel.textContent = 'VR 鐪奸暅';

    const vrBtn = document.createElement('button');
    vrBtn.className = 'vr-modal-settings-row-btn';
    vrBtn.type = 'button';
    vrBtn.textContent = 'VR 鐪奸暅';

    const syncVrBtnState = () => {
      const active = isVrModeEnabled();
      vrBtn.classList.toggle('is-on', active);
    };

    if (isTouch) {
      syncVrBtnState();
      vrBtn.addEventListener('click', async () => {
        if (!this.panoViewer) return;
        const viewerContainer = this.panoViewer.getDomElement();
        const enabled = await this.toggleVrModeFromUI(viewerContainer);
        if (enabled !== isVrModeEnabled()) {
          // 鍏滃簳鍚屾
          syncVrBtnState();
        } else {
          syncVrBtnState();
        }
      });
    } else if (isMouse) {
      vrBtn.classList.add('is-disabled');
      const handler = () => {
        showToast('移动端可体验此功能', 1500);
      };
      vrBtn.addEventListener('mouseenter', handler);
      vrBtn.addEventListener('click', handler);
    }

    const vrRow = document.createElement('div');
    vrRow.appendChild(vrLabel);
    vrRow.appendChild(vrBtn);

    // 缂╂斁鎺у埗
    const zoomLabel = document.createElement('div');
    zoomLabel.className = 'vr-modal-settings-item-label';
    zoomLabel.textContent = '缂╂斁';

    const zoomGroup = document.createElement('div');
    zoomGroup.className = 'vr-modal-settings-quality';
    zoomGroup.style.gap = '8px';

    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'vr-modal-settings-quality-btn';
    zoomOutBtn.textContent = '缂╁皬';
    zoomOutBtn.style.minWidth = '70px';

    const zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'vr-modal-settings-quality-btn';
    zoomInBtn.textContent = '鏀惧ぇ';
    zoomInBtn.style.minWidth = '70px';

    const handleZoomOut = () => {
      if (!this.panoViewer) return;
      const currentView = this.panoViewer.getCurrentView();
      const newFov = Math.min(120, currentView.fov * 1.12);
      this.panoViewer.setFov(newFov);
    };

    const handleZoomIn = () => {
      if (!this.panoViewer) return;
      const currentView = this.panoViewer.getCurrentView();
      const newFov = Math.max(30, currentView.fov / 1.12);
      this.panoViewer.setFov(newFov);
    };

    zoomOutBtn.addEventListener('click', handleZoomOut);
    zoomInBtn.addEventListener('click', handleZoomIn);

    zoomGroup.appendChild(zoomOutBtn);
    zoomGroup.appendChild(zoomInBtn);

    const zoomRow = document.createElement('div');
    zoomRow.appendChild(zoomLabel);
    zoomRow.appendChild(zoomGroup);

    container.appendChild(qualityRow);
    container.appendChild(resetRow);
    container.appendChild(zoomRow);
    container.appendChild(vrRow);

    // 鎵撳紑"鏇村"鏃讹紝璁?Dock 娣″嚭
    if (this.bottomDock) {
      this.bottomDock.setMoreOpen(true);
    }

    this.settingsModalMounted = mountModal({
      title: '鏇村',
      contentEl: container,
      panelClassName: 'vr-modal-settings',
      onClose: () => {
        // 鍏抽棴"鏇村"鏃讹紝鎭㈠ Dock
        if (this.bottomDock) {
          this.bottomDock.setMoreOpen(false);
        }
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

// 鍚姩搴旂敤
new App();


// Service Worker?stale-while-revalidate ?????
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // ????????????
    });
  });
}

