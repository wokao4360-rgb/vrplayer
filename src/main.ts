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
import { TopModeTabs } from './ui/TopModeTabs';
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
      // 退出全屏后：尽量恢复方向锁定
      if (!isFullscreen()) {
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
    try {
      this.topRightControls = new TopRightControls({
        viewerRootEl: viewerContainer,
        onTogglePickMode: () => {
          if (this.panoViewer) {
            if (this.panoViewer.isPickModeEnabled()) {
              this.panoViewer.disablePickMode();
            } else {
              this.panoViewer.enablePickMode();
            }
            return this.panoViewer.isPickModeEnabled();
          }
          return false;
        },
        onOpenNorthCalibration: () => {
          this.openNorthCalibration(scene.id);
        },
        showNorthCalibration: true, // 常驻显示（也可以在 debug 模式才显示）
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

    // 新 UI：左下角水印 + About 弹窗 - 降级保护
    try {
      this.brandMark = new BrandMark({
        appName: this.config?.appName,
        brandText: '鼎虎清源',
      });
      this.appElement.appendChild(this.brandMark.getElement());
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
          // 关闭框3
          if (this.guideTray) {
            this.guideTray.setVisible(false);
          }
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
        initialTab: 'guide',
        onGuideClick: () => {
          // 点击"导览"时显示框3（GuideTray）
          if (this.guideTray) {
            this.guideTray.setVisible(true);
          }
        },
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
        initialMode: 'pano',
        onModeChange: (mode) => {
          // 切换模式：通过BottomDock的setActiveTab来切换
          if (this.bottomDock) {
            if (mode === 'map') {
              this.bottomDock.setActiveTab('map');
            } else if (mode === 'dollhouse') {
              this.bottomDock.setActiveTab('dollhouse');
            } else {
              // pano模式：切换到guide tab
              this.bottomDock.setActiveTab('guide');
            }
          }
        },
      });
      // 监听bottomDock的tab变化，同步到topModeTabs
      const handleBottomDockTabChange = (e: Event) => {
        const evt = e as CustomEvent<{ tab: string }>;
        if (this.topModeTabs) {
          if (evt.detail.tab === 'map') {
            this.topModeTabs.setMode('map');
          } else if (evt.detail.tab === 'dollhouse') {
            this.topModeTabs.setMode('dollhouse');
          } else {
            this.topModeTabs.setMode('pano');
          }
        }
      };
      window.addEventListener('vr:bottom-dock-tab-change', handleBottomDockTabChange);
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

    // 应用初始视角（优先使用 URL 参数中的视角，否则使用场景配置的视角）
    const route = parseRoute();
    const targetYaw = route.yaw !== undefined ? route.yaw : (scene.initialView.yaw || 0);
    const targetPitch = route.pitch !== undefined ? route.pitch : (scene.initialView.pitch || 0);
    const targetFov = route.fov !== undefined ? route.fov : (scene.initialView.fov || 75);
    
    this.panoViewer.setView(targetYaw, targetPitch, targetFov);
    this.panoViewer.loadScene(scene);
    
    // 设置场景数据（用于 GroundNavDots）
    this.panoViewer.setSceneData(museum.id, scene.id, scene.hotspots);
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
      import('./utils/assetResolver').then(({ resolveAssetUrl, AssetType }) => {
        const resolvedUrl = resolveAssetUrl(nextScene.thumb, AssetType.THUMB);
        if (resolvedUrl) {
      const img = new Image();
          img.src = resolvedUrl;
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
}

// 启动应用
new App();

