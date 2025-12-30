import { loadConfig, getMuseum, getScene, clearConfigCache } from './utils/config';
import { parseRoute, navigateToMuseumList, navigateToSceneList, navigateToScene, isDebugMode, isEditorMode } from './utils/router';
import { normalizePathname } from './utils/urlBuilder';
import { PanoViewer } from './viewer/PanoViewer';
import { TitleBar } from './ui/TitleBar';
import { MuseumList } from './ui/MuseumList';
import { SceneList } from './ui/SceneList';
import { MapOverlay } from './ui/MapOverlay';
import { Hotspots } from './ui/Hotspots';
import { VideoPlayer } from './ui/VideoPlayer';
import { ControlBar } from './ui/ControlBar';
import { Loading } from './ui/Loading';
import { ConfigErrorPanel } from './ui/ConfigErrorPanel';
import { DebugPanel } from './ui/DebugPanel';
import { ConfigStudio } from './ui/ConfigStudio';
import { QualityIndicator, LoadStatus } from './ui/QualityIndicator';
import './ui/ui.css';
import { TopRightControls } from './ui/TopRightControls';
import { BrandMark } from './ui/BrandMark';
import { BottomDock } from './ui/BottomDock';
import { SceneGuideDrawer } from './ui/SceneGuideDrawer';
import { GuideTray } from './ui/GuideTray';
import { TopModeTabs, type AppViewMode } from './ui/TopModeTabs';
import { StructureView2D } from './ui/StructureView2D';
import { StructureView3D } from './ui/StructureView3D';
import { buildSceneGraph } from './graph/sceneGraph';
import { resolveAssetUrl, AssetType } from './utils/assetResolver';
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
import { NorthCalibrationPanel } from './ui/NorthCalibrationPanel';
import { FcChatPanel } from './ui/FcChatPanel';
import { FcChatClient, type FcChatConfig } from './services/fcChatClient';
import { initFullscreenState } from './utils/fullscreenState';
import { clearAllToasts } from './ui/toast';
import { initVrMode, enableVrMode, disableVrMode, isVrModeEnabled, setInteractingCallback } from './utils/vrMode';
import { requestFullscreenBestEffort, exitFullscreenBestEffort } from './ui/fullscreen';
import { mountModal, type MountedModal } from './ui/Modal';
import { getPreferredQuality, setPreferredQuality, type QualityLevel } from './utils/qualityPreference';
import { isTouchDevice, isMouseDevice } from './utils/deviceDetect';

/**
 * 罗盘旋转验证点（修复"脚底下东西南北罗盘跟着视角一起转"问题）：
 * - 非全屏模式下拖动视角：罗盘盘面（N/E/S/W 或 wedge/tick）不随 yaw 旋转；needle 旋转。
 * - 如果盘面仍跟着转：说明还有一个 transform 写在更外层 wrapper（继续向上找 parent 元素的 style.transform 写入点，直到消失）。
 * - GroundHeadingMarker: root 和 inner 的 transform 只包含 translateX/translateY/scaleY，不包含 rotate
 * - CompassDisk: root 的 transform 只包含 translateX/translateY/scaleY，不包含 rotate
 * - 只有 needle 通过 CSS 变量 --groundheading-needle-rot 和 --compass-needle-rot 旋转
 */

/**
 * 初始化调试工具（仅在 debug=1 时启用）
 */
if (__VR_DEBUG__) {
  // 挂载状态快照函数
  (window as any).__vrDump = () => {
    const snapshot = dumpVRState();
    console.debug('[VR State Snapshot]', snapshot);
    return snapshot;
  };

  // 挂载一键复位函数
  (window as any).__vrResetUI = () => {
    console.debug('[VR Reset UI] 正在清理所有 UI 状态...');
    resetVRUI(interactionBus);
    console.debug('[VR Reset UI] 清理完成');
  };

  console.debug('[VR Debug] 调试模式已启用。使用 __vrDump() 查看状态，使用 __vrResetUI() 复位 UI');
}

/**
 * 最后一次人工回归路径清单（上线前人工确认）
 * 
 * 1. 快速左右拖动
 *    - 验证：所有 UI 立即隐藏，无残留状态
 * 
 * 2. 低头扫多个地面点
 *    - 验证：只有一个目标被认定，无闪烁
 *    - 验证：底部横条只轻微跟随，不抢控制权
 *    - 验证：预览卡稳定切换无闪烁
 * 
 * 3. 扫点 → 立刻滑横条
 *    - 验证：系统不抢控制权，自动行为立即停止
 *    - 验证：停手后才恢复自动行为
 * 
 * 4. 扫点 → 抬头
 *    - 验证：所有状态立即清空，无残留
 * 
 * 5. 自动进入触发瞬间点击其他 UI
 *    - 验证：所有提示/倒计时/瞄准状态立即清空
 *    - 验证：不会触发自动进入
 * 
 * 调试开关：在 src/utils/debug.ts 中将 __VR_DEBUG__ 设为 true 可查看状态流转日志
 */

/**
 * 发布流程清单
 * 
 * PowerShell 下删除 docs/assets 和 docs/index.html 的命令：
 * Remove-Item -Recurse -Force .\docs\assets -ErrorAction SilentlyContinue
 * Remove-Item -Force .\docs\index.html -ErrorAction SilentlyContinue
 */

// 【入口】修复双斜杠路径问题（如 //vrplayer// -> /vrplayer/）
normalizePathname();

// 初始化 UI 让位策略
initYieldPolicy();
initYieldClassManager();

// 初始化全屏状态管理器
initFullscreenState();

// 初始化VR模式管理器（监听全屏状态变化）
const setVrModeChangeCallback = initVrMode();

// 监听全屏状态变化，清除所有提示
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
 * URL 参数：?development=1 或 ?dev=1 或 #development
 */
function isDevMode(): boolean {
  const params = new URLSearchParams(location.search);
  return params.has('development') || params.get('dev') === '1' || location.hash.includes('development');
}

/**
 * DNS 预热：已禁用
 * 由于图片现在通过同源代理 /_img 加载，不再需要 preconnect 到第三方域名
 */
// function warmupExternalImageHostsFromConfig(config: AppConfig): void {
//   // 已禁用：图片通过同源代理加载，不需要 preconnect
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
  private isStructureOverlayOpen = false; // 结构图/三维模型overlay是否打开
  private structureView2D: StructureView2D | null = null;
  private structureView3D: StructureView3D | null = null;
  private fcChatPanel: FcChatPanel | null = null;
  private infoModalMounted: MountedModal | null = null;
  private settingsModalMounted: MountedModal | null = null;

  constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) {
      throw new Error('找不到 #app 元素');
    }
    this.appElement = appElement;
    // 初始化全局 ModalHost（用于热点弹窗等）
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
      // 同步 TopRightControls 图标/aria
      this.topRightControls?.syncFullscreenState();
      // 同步VR模式状态（如果VR模式因退出全屏而关闭）
      if (!isFullscreen()) {
        if (this.topRightControls && !isVrModeEnabled()) {
          this.topRightControls.updateVrModeState(false);
        }
        // 重置PanoViewer的VR模式标志
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
      
      // 检查是否是编辑器模式
      if (isEditorMode()) {
        await this.initEditorMode();
        this.loading.hide();
        return;
      }
      
      // 加载配置
      this.config = await loadConfig();
      
      // DNS 预热已禁用：图片通过同源代理 /_img 加载
      
      // 设置应用标题
      if (this.titleBar) {
        this.titleBar.setTitle(this.config.appName);
      }
      
      // 监听路由变化
      window.addEventListener('popstate', () => this.handleRoute());
      
      // 处理初始路由（UI组件初始化失败不阻塞全景显示）
      // showScene 内部已有降级保护，单个组件失败不会抛出异常
      await this.handleRoute();
      
      this.loading.hide();
    } catch (error: any) {
      console.error('配置加载失败:', error);
      this.loading.hide();
      
      // 检查是否是配置校验错误
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        this.showConfigErrorPanel(error.validationErrors);
      } else {
        // 配置加载失败（fetch/解析失败）
        this.showError('加载配置失败，请刷新页面重试');
      }
    }
  }

  /**
   * 初始化编辑器模式
   */
  private async initEditorMode(): Promise<void> {
    try {
      // 加载配置
      this.config = await loadConfig();
      
      // DNS 预热已禁用：图片通过同源代理 /_img 加载
      
      // 清空当前视图
      this.appElement.innerHTML = '';
      
      // 创建配置工作台
      this.configStudio = new ConfigStudio(this.config, (newConfig) => {
        // 配置变更回调：更新内部配置，但不重新加载页面
        this.config = newConfig;
        // 清除缓存，以便下次加载使用新配置
        clearConfigCache();
      });
      
      this.appElement.appendChild(this.configStudio.getElement());
    } catch (error: any) {
      console.error('初始化编辑器模式失败:', error);
      
      // 检查是否是配置校验错误
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        this.showConfigErrorPanel(error.validationErrors);
      } else {
      this.showError('加载配置失败，请刷新页面重试');
      }
    }
  }

  private showConfigErrorPanel(errors: ValidationError[]): void {
    // 清空当前视图
    this.appElement.innerHTML = '';
    
    const errorPanel = new ConfigErrorPanel(
      errors,
      () => {
        // 刷新重试
        clearConfigCache();
        window.location.reload();
      },
      () => {
        // 显示示例配置（跳转到 README 或显示示例）
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
    
    // 清理当前视图
    this.clearView();

    // 默认直接进入王鼎纪念馆（或唯一展馆）
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
      // 显示馆列表
      this.showMuseumList();
    } else if (!route.sceneId) {
      // 显示场景列表
      const museum = getMuseum(route.museumId);
      if (museum) {
        this.showSceneList(museum);
      } else {
        this.showError('未找到指定的展馆');
        navigateToMuseumList();
      }
    } else {
      // 显示场景
      const museum = getMuseum(route.museumId);
      const scene = getScene(route.museumId, route.sceneId);
      
      if (museum && scene) {
        await this.showScene(museum, scene);
      } else {
        this.showError('未找到指定的场景');
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

    // 创建标题栏
    this.titleBar = new TitleBar(this.config.appName);
    this.appElement.appendChild(this.titleBar.getElement());

    // 创建馆列表
    this.museumList = new MuseumList(this.config.museums);
    this.appElement.appendChild(this.museumList.getElement());
  }

  private showSceneList(museum: Museum): void {
    // 创建标题栏
    this.titleBar = new TitleBar(museum.name);
    this.appElement.appendChild(this.titleBar.getElement());

    // 创建场景列表（类似馆列表的展示方式）
    const sceneListElement = document.createElement('div');
    sceneListElement.className = 'scene-list-page';
    sceneListElement.innerHTML = `
      <div class="scene-list-container">
        <h1 class="scene-list-title">${museum.name} - 场景列表</h1>
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

    // 添加样式
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

    // 绑定点击事件
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

    // 创建全景查看器容器（不再需要为TopBar预留空间）
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

    // 创建全景查看器（检查是否启用调试模式）
    const debugMode = isDebugMode();
    this.panoViewer = new PanoViewer(viewerContainer, debugMode);

    // 新 UI：右上角控制按钮（全屏 + 坐标拾取 + 校准北向）- 降级保护
    // 开发者模式：仅当 URL 带 development 参数时才显示坐标拾取和校准北向
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
          this.openNorthCalibration(scene.id);
        } : undefined,
        showNorthCalibration: devMode, // 仅开发者模式显示
        onToggleVrMode: async () => {
          return this.toggleVrModeFromUI(viewerContainer);
        },
      });
      this.appElement.appendChild(this.topRightControls.getElement());
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] TopRightControls 创建失败，跳过:', err);
      }
      this.topRightControls = null;
    }

    // 新 UI：左上角场景标题（如视风格）
    this.sceneTitleEl = document.createElement('div');
    this.sceneTitleEl.className = 'vr-scenetitle';
    this.sceneTitleEl.textContent = scene.name || this.config?.appName || 'VR Player';
    this.appElement.appendChild(this.sceneTitleEl);

    // 监听拾取事件
    const handlePick = (e: Event) => {
      const evt = e as CustomEvent<{ x: number; y: number; yaw: number; pitch: number }>;
      const { x, y, yaw, pitch } = evt.detail;
      // 保存到全局缓存（供 ConfigStudio 使用）
      setLastPick({ yaw, pitch, ts: Date.now() });
      showToast(`已复制 yaw: ${yaw.toFixed(2)}, pitch: ${pitch.toFixed(2)}`);
      if (this.panoViewer) {
        const viewerEl = this.panoViewer.getDomElement();
        showPickMarker(viewerEl, x, y);
      }
    };
    window.addEventListener('vr:pick', handlePick);

    // 监听拾取模式切换事件（用于从 ConfigStudio 关闭拾取模式）
    const handlePickModeChange = (e: Event) => {
      const evt = e as CustomEvent<{ enabled: boolean }>;
      if (this.panoViewer && !evt.detail.enabled && this.panoViewer.isPickModeEnabled()) {
        this.panoViewer.disablePickMode();
        // TopRightControls 会通过 vr:pickmode 事件自动更新状态
      }
    };
    window.addEventListener('vr:pickmode', handlePickModeChange);

    // 新 UI：左下角水印 + About 弹窗 - 降级保护 + 幂等保护
    try {
      // 幂等保护：如果已存在，不再重复创建
      const existingBrandMark = this.appElement.querySelector('.vr-brandmark');
      if (!existingBrandMark) {
        this.brandMark = new BrandMark({
          appName: this.config?.appName,
          brandText: '鼎虎清源',
        });
        const el = this.brandMark.getElement();
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openDingHuQingYuan();
        });
        this.appElement.appendChild(el);
      } else {
        // 如果已存在，复用现有元素
        if (__VR_DEBUG__) {
          console.debug('[showScene] BrandMark 已存在，跳过重复创建');
        }
      }
      // TeamIntroModal 不再直接挂载，只在 open() 时挂载到 #vr-modal-root
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] BrandMark 创建失败，跳过:', err);
      }
      this.brandMark = null;
    }
    
    // 如果启用调试模式，创建调试面板
    if (debugMode) {
      this.debugPanel = new DebugPanel();
      this.appElement.appendChild(this.debugPanel.getElement());
      
      // 设置调试点击回调
      this.panoViewer.setOnDebugClick((x, y, yaw, pitch, fov) => {
        if (this.debugPanel) {
          this.debugPanel.show(x, y, yaw, pitch, fov);
        }
      });
      
      // 实时更新调试面板（当视角改变时）
      const updateDebugPanel = () => {
        if (this.debugPanel && this.panoViewer) {
          const view = this.panoViewer.getCurrentView();
          this.debugPanel.updateView(view.yaw, view.pitch, view.fov);
        }
        requestAnimationFrame(updateDebugPanel);
      };
      updateDebugPanel();
    }
    
    // 创建视频播放器 - 降级保护
    try {
      this.videoPlayer = new VideoPlayer();
      this.appElement.appendChild(this.videoPlayer.getElement());
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] VideoPlayer 创建失败，跳过:', err);
      }
      this.videoPlayer = null;
    }

    // 新 UI：导览轻量预览条（框3）- 降级保护
    try {
      this.guideTray = new GuideTray({
        museumId: museum.id,
        currentSceneId: scene.id,
        scenes: museum.scenes,
        onSceneClick: (sceneId) => {
          // 框3点击直接切换场景
          navigateToScene(museum.id, sceneId);
        },
        onMoreClick: () => {
          // 打开框4（完整导览抽屉）
          if (!this.sceneGuideDrawer) {
            try {
              this.sceneGuideDrawer = new SceneGuideDrawer({
                museumId: museum.id,
                currentSceneId: scene.id,
                scenes: museum.scenes,
                onClose: () => {
                  // 框4关闭时，框3保持显示
                },
              });
              this.appElement.appendChild(this.sceneGuideDrawer.getElement());
            } catch (err) {
              if (__VR_DEBUG__) {
                console.debug('[GuideTray] SceneGuideDrawer 创建失败:', err);
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
          // 关闭框3并熄灭导览高亮
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
      this.guideTray.setVisible(false); // 初始隐藏
      this.appElement.appendChild(this.guideTray.getElement());
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] GuideTray 创建失败，跳过:', err);
      }
      this.guideTray = null;
    }

    // 新 UI：导览抽屉（框4）- 延迟创建，只在点击"更多"时创建
    // this.sceneGuideDrawer 将在 onMoreClick 中创建

    // SceneStrip 已删除，不再创建常驻缩略图横条

    // 新 UI：场景预览卡片（Scene Preview Card）
    // 构建 sceneIndex Map（sceneId -> { title, thumb, panoUrl }）
    const sceneIndex = new Map<string, { title: string; thumb?: string; panoUrl?: string }>();
    museum.scenes.forEach((s) => {
      // 解析 pano URL（优先 panoLow，否则 pano）
      let panoUrl: string | undefined;
      if (s.panoLow) {
        const resolved = resolveAssetUrl(s.panoLow, AssetType.PANO_LOW);
        if (resolved) panoUrl = resolved;
      } else if (s.pano) {
        const resolved = resolveAssetUrl(s.pano, AssetType.PANO);
        if (resolved) panoUrl = resolved;
      }

      sceneIndex.set(s.id, {
        title: s.name,
        thumb: s.thumb, // 缩略图URL（用于场景索引，可选）
        panoUrl, // 可选：用于预热
      });
    });


    // 新 UI：底部 Dock（导览 tab 打开抽屉）- 降级保护
    try {
      this.bottomDock = new BottomDock({
        onGuideClick: () => {
          // 点击"导览"时显示框3（GuideTray）
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
        console.debug('[showScene] BottomDock 创建失败，跳过:', err);
      }
      this.bottomDock = null;
    }

    // 新 UI：顶部模式切换Tab（如视风格）- 降级保护
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
        console.debug('[showScene] TopModeTabs 创建失败，跳过:', err);
      }
      this.topModeTabs = null;
    }


    // 创建热点（DOM Overlay：每帧跟随 camera 投影）- 降级保护
    try {
      const sceneNameMap = new Map(museum.scenes.map((s) => [s.id, s.name]));
      this.hotspots = new Hotspots(this.panoViewer, scene.hotspots, {
        resolveSceneName: (sceneId) => sceneNameMap.get(sceneId),
        onEnterScene: (sceneId) => {
          // 走既有路由/加载链路，避免重构私有 showScene
          navigateToScene(museum.id, sceneId);
        },
        museumId: museum.id, // 传入 museumId 用于匹配 hover 事件
      });
      viewerContainer.appendChild(this.hotspots.getElement());
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] Hotspots 创建失败，跳过:', err);
      }
      this.hotspots = null;
    }

    // 创建清晰度状态指示器 - 降级保护
    try {
      this.qualityIndicator = new QualityIndicator();
      this.appElement.appendChild(this.qualityIndicator.getElement());
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] QualityIndicator 创建失败，跳过:', err);
      }
      this.qualityIndicator = null;
    }

    // 设置加载状态变化回调
    this.panoViewer.setOnStatusChange((status) => {
      if (this.qualityIndicator) {
        this.qualityIndicator.updateStatus(status);
      }
    });

    // 加载场景
    this.panoViewer.setOnLoad(() => {
      this.loading.hide();
      // 全景加载成功后，清除任何 UI 错误遮罩（但保留 config 错误）
      this.hideUIError();
      
      // 预加载下一个场景的缩略图
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

    // 【最终铁律】所有来自 config.json 或 URL 的 yaw 都是【现实世界角度】
    // 进入渲染/罗盘系统前，必须统一取反一次：internalYaw = -worldYaw
    
    // 应用初始视角（优先使用 URL 参数中的视角，否则使用场景配置的视角）
    const route = parseRoute();
    const worldTargetYaw = route.yaw !== undefined ? route.yaw : (scene.initialView.yaw || 0);
    const targetPitch = route.pitch !== undefined ? route.pitch : (scene.initialView.pitch || 0);
    const targetFov = route.fov !== undefined ? route.fov : (scene.initialView.fov || 75);
    
    // 统一世界 → 内部 yaw（关键）
    const internalTargetYaw = -worldTargetYaw;
    
    this.panoViewer.setView(internalTargetYaw, targetPitch, targetFov);
    this.panoViewer.loadScene(scene);
    
    // 设置场景数据（用于 GroundNavDots）
    this.panoViewer.setSceneData(museum.id, scene.id, scene.hotspots);

    // 创建聊天面板（学伴/问答）- 降级保护
    try {
      const fcChatConfig = this.config?.fcChat;
      if (fcChatConfig?.endpoint && fcChatConfig.endpoint.trim()) {
        const clientConfig: FcChatConfig = {
          endpoint: fcChatConfig.endpoint,
          authToken: fcChatConfig.authToken,
          timeoutMs: 15000,
        };
        const client = new FcChatClient(clientConfig);
        this.fcChatPanel = new FcChatPanel(client, {
          museumId: museum.id,
          sceneId: scene.id,
          sceneTitle: scene.name,
          museumName: museum.name,
          url: window.location.href,
        });
        // FcChatPanel 已自动 append 到 body，不需要再 append
      }
    } catch (err) {
      if (__VR_DEBUG__) {
        console.debug('[showScene] FcChatPanel 创建失败，跳过:', err);
      }
      this.fcChatPanel = null;
    }
  }

  /**
   * 预加载下一个场景的缩略图
   * 资源类型：thumb（用于列表/预览）
   */
  private preloadNextScene(museum: Museum, currentScene: Scene): void {
    const currentIndex = museum.scenes.findIndex(s => s.id === currentScene.id);
    const nextIndex = (currentIndex + 1) % museum.scenes.length;
    const nextScene = museum.scenes[nextIndex];
    
    if (nextScene && nextScene.thumb) {
      // 使用资源解析器统一处理 URL
      Promise.all([
        import('./utils/assetResolver'),
        import('./utils/externalImage')
      ]).then(([{ resolveAssetUrl, AssetType }, { toProxiedImageUrl }]) => {
        const resolvedUrl = resolveAssetUrl(nextScene.thumb, AssetType.THUMB);
        if (resolvedUrl) {
          const img = new Image();
          img.referrerPolicy = 'no-referrer';
          img.crossOrigin = 'anonymous';
          (img as any).loading = 'lazy';
          img.decoding = 'async';
          img.src = toProxiedImageUrl(resolvedUrl);
        }
      });
    }
  }

  private clearView(): void {
    // 清理所有组件
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


    // 清理结构图/三维模型overlay
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
   * 设置全局模式（tour / structure2d / structure3d）
   */
  private setMode(mode: AppViewMode): void {
    if (this.mode === mode) return;
    const previousMode = this.mode;
    this.mode = mode;
    
    // 更新 TopModeTabs
    if (this.topModeTabs) {
      this.topModeTabs.setMode(mode);
    }
    
    // 如果切换到tour模式，且当前有overlay打开，先关闭overlay
    if (mode === 'tour' && this.isStructureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }
    
    // 处理 structure2d overlay
    if (mode === 'structure2d') {
      this.openStructure2D();
    } else if (mode === 'structure3d') {
      this.openStructure3D();
    }
  }

  /**
   * 打开结构图2D overlay
   */
  private openStructure2D(): void {
    if (!this.currentMuseum || !this.currentScene) return;
    
    // 如果已有overlay打开，先清场
    if (this.isStructureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }
    
    const graph = buildSceneGraph(this.currentMuseum, this.currentScene.id);
    
    // 创建或更新 structure2d overlay
    if (!this.structureView2D) {
      this.structureView2D = new StructureView2D({
        museum: this.currentMuseum,
        graph,
        currentSceneId: this.currentScene.id,
        onClose: () => {
          // 点击×关闭时，关闭overlay并切回tour
          this.closeStructureOverlay({ toTour: true });
        },
        onNodeClick: (museumId, sceneId) => {
          // 点击节点时，先关闭overlay，再跳转场景
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
    
    // 标记overlay已打开
    this.isStructureOverlayOpen = true;
    
    // 设置body overflow
    document.body.style.overflow = 'hidden';
    
    // 打开overlay
    this.structureView2D.open();
  }

  /**
   * 打开三维模型3D overlay
   */
  private openStructure3D(): void {
    if (!this.currentMuseum || !this.currentScene) return;
    
    // 如果已有overlay打开，先清场
    if (this.isStructureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }
    
    const graph = buildSceneGraph(this.currentMuseum, this.currentScene.id);
    
    // 创建或更新 structure3d overlay
    if (!this.structureView3D) {
      this.structureView3D = new StructureView3D({
        museum: this.currentMuseum,
        graph,
        currentSceneId: this.currentScene.id,
        onClose: () => {
          // 点击×关闭时，关闭overlay并切回tour
          this.closeStructureOverlay({ toTour: true });
        },
        onNodeClick: (museumId, sceneId) => {
          // 点击节点时，先关闭overlay，再跳转场景
          this.closeStructureOverlay({ toTour: false });
          navigateToScene(museumId, sceneId);
        },
      });
      this.appElement.appendChild(this.structureView3D.getElement());
    } else {
      this.structureView3D.updateContext({
        museum: this.currentMuseum,
        graph,
        currentSceneId: this.currentScene.id,
      });
    }
    
    // 标记overlay已打开
    this.isStructureOverlayOpen = true;
    
    // 设置body overflow
    document.body.style.overflow = 'hidden';
    
    // 打开overlay
    this.structureView3D.open();
  }

  /**
   * 关闭结构图/三维模型overlay（唯一关闭入口）
   * @param toTour 是否切换到tour模式
   */
  private closeStructureOverlay(options: { toTour: boolean }): void {
    // 如果overlay未打开，直接返回
    if (!this.isStructureOverlayOpen) return;
    
    // 标记overlay已关闭
    this.isStructureOverlayOpen = false;
    
    // 从DOM中彻底移除overlay元素（而不是只隐藏）
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
    
    // 恢复body样式（清除所有可能添加的样式）
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.body.style.overscrollBehavior = '';
    
    // 如果要求切换到tour模式，更新状态和UI
    if (options.toTour) {
      this.mode = 'tour';
      if (this.topModeTabs) {
        this.topModeTabs.setMode('tour');
      }
    }
  }

  private openNorthCalibration(sceneId: string): void {
    // 清理之前的校准面板（如果存在）
    if (this.northCalibrationPanel) {
      this.northCalibrationPanel.close();
      this.northCalibrationPanel = null;
    }

    if (!this.panoViewer) {
      console.warn('[openNorthCalibration] PanoViewer 未初始化');
      return;
    }

    // 创建校准面板
    try {
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
    // 隐藏之前的错误（如果有）
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
   * 统一打开“鼎虎清源”团队介绍弹窗
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
   * 底部「信息」弹窗
   */
  private openInfoModal(): void {
    // 确保单例：如已存在先关闭
    this.infoModalMounted?.close();
    this.infoModalMounted = null;

    const museumName = this.currentMuseum?.name || '-';
    const sceneName = this.currentScene?.name || '-';

    const content = document.createElement('div');
    content.className = 'vr-modal-info-list';
    content.innerHTML = `
      <div><span class="vr-modal-info-row-label">馆：</span><span>${museumName}</span></div>
      <div><span class="vr-modal-info-row-label">场景：</span><span>${sceneName}</span></div>
      <div><span class="vr-modal-info-row-label">采集于</span><span> 2025-12-27</span></div>
    `;

    // 底部“鼎虎清源”链接
    const link = document.createElement('button');
    link.type = 'button';
    link.className = 'vr-modal-info-link';
    link.textContent = '鼎虎清源';
    content.appendChild(link);

    // 先挂载信息弹窗，再在点击时关闭本弹窗、下一帧打开“鼎虎清源”弹窗
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // 方案 1：先关闭信息弹窗，再打开鼎虎清源，避免层级遮挡
      if (this.infoModalMounted) {
        this.infoModalMounted.close();
      }
      setTimeout(() => {
        this.openDingHuQingYuan();
      }, 0);
    });

    this.infoModalMounted = mountModal({
      title: '信息',
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
   * 统一 VR 模式开关逻辑，供右上角按钮与设置弹窗共用
   */
  private async toggleVrModeFromUI(viewerContainer: HTMLElement): Promise<boolean> {
    if (!this.panoViewer) {
      return false;
    }

    const currentlyEnabled = isVrModeEnabled();

    if (currentlyEnabled) {
      // 当前已启用，关闭VR模式
      disableVrMode();
      this.panoViewer.setVrModeEnabled(false);
      // 更新右上角按钮状态
      if (this.topRightControls) {
        this.topRightControls.updateVrModeState(false);
      }
      // 退出全屏（推荐）
      await exitFullscreenBestEffort();
      return false;
    } else {
      // 当前未启用，启用VR模式
      try {
        await requestFullscreenBestEffort(viewerContainer);
      } catch (err) {
        if (__VR_DEBUG__) {
          console.debug('[VRMode] fullscreen request failed', err);
        }
        return false;
      }

      // 启用VR模式（陀螺仪控制）
      const initialView = this.panoViewer.getCurrentView();

      // 设置交互检查回调（拖拽时暂停陀螺仪更新）
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
   * 底部「设置」弹窗
   */
  private openSettingsModal(): void {
    // 确保单例：如已存在先关闭
    this.settingsModalMounted?.close();
    this.settingsModalMounted = null;

    const isTouch = isTouchDevice();
    const isMouse = isMouseDevice();
    const currentQuality = getPreferredQuality();

    const container = document.createElement('div');
    container.className = 'vr-modal-settings-list';

    // 画质切换
    const qualityLabel = document.createElement('div');
    qualityLabel.className = 'vr-modal-settings-item-label';
    qualityLabel.textContent = '画质';

    const qualityGroup = document.createElement('div');
    qualityGroup.className = 'vr-modal-settings-quality';

    const highBtn = document.createElement('button');
    highBtn.className = 'vr-modal-settings-quality-btn';
    highBtn.textContent = '高清';
    highBtn.dataset.level = 'high';

    const lowBtn = document.createElement('button');
    lowBtn.className = 'vr-modal-settings-quality-btn';
    lowBtn.textContent = '省流';
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
      // 使用 preserveView 重新加载当前场景资源
      this.panoViewer.loadScene(this.currentScene, { preserveView: true });
    };

    highBtn.addEventListener('click', () => handleQualityClick('high'));
    lowBtn.addEventListener('click', () => handleQualityClick('low'));

    qualityGroup.appendChild(highBtn);
    qualityGroup.appendChild(lowBtn);

    const qualityRow = document.createElement('div');
    qualityRow.appendChild(qualityLabel);
    qualityRow.appendChild(qualityGroup);

    // 重置视角
    const resetLabel = document.createElement('div');
    resetLabel.className = 'vr-modal-settings-item-label';
    resetLabel.textContent = '重置视角';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'vr-modal-settings-row-btn';
    resetBtn.type = 'button';
    resetBtn.textContent = '重置视角';
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

    // VR 眼镜
    const vrLabel = document.createElement('div');
    vrLabel.className = 'vr-modal-settings-item-label';
    vrLabel.textContent = 'VR 眼镜';

    const vrBtn = document.createElement('button');
    vrBtn.className = 'vr-modal-settings-row-btn';
    vrBtn.type = 'button';
    vrBtn.textContent = 'VR 眼镜';

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
          // 兜底同步
          syncVrBtnState();
        } else {
          syncVrBtnState();
        }
      });
    } else if (isMouse) {
      vrBtn.classList.add('is-disabled');
      const handler = () => {
        showToast('移动端访问可体验该功能', 1500);
      };
      vrBtn.addEventListener('mouseenter', handler);
      vrBtn.addEventListener('click', handler);
    }

    const vrRow = document.createElement('div');
    vrRow.appendChild(vrLabel);
    vrRow.appendChild(vrBtn);

    container.appendChild(qualityRow);
    container.appendChild(resetRow);
    container.appendChild(vrRow);

    this.settingsModalMounted = mountModal({
      title: '更多',
      contentEl: container,
      panelClassName: 'vr-modal-settings',
      onClose: () => {
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

// 启动应用
new App();

