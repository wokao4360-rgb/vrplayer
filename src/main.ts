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
import { TopBar } from './ui/TopBar';
import { BrandMark } from './ui/BrandMark';
import { BottomDock } from './ui/BottomDock';
import { SceneGuideDrawer } from './ui/SceneGuideDrawer';
import { isFullscreen, unlockOrientationBestEffort } from './ui/fullscreen';
import type { AppConfig, Museum, Scene } from './types/config';
import type { ValidationError } from './utils/configValidator';
import { ensureModalHost } from './ui/modals/ModalHost';
import { showToast } from './ui/toast';
import { showPickMarker } from './ui/PickMarker';
import { setLastPick } from './viewer/pickBus';

// 【入口】修复双斜杠路径问题（如 //vrplayer// -> /vrplayer/）
normalizePathname();

class App {
  private appElement: HTMLElement;
  private config: AppConfig | null = null;
  private panoViewer: PanoViewer | null = null;
  private titleBar: TitleBar | null = null;
  private topBar: TopBar | null = null;
  private brandMark: BrandMark | null = null;
  private bottomDock: BottomDock | null = null;
  private sceneGuideDrawer: SceneGuideDrawer | null = null;
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
      // 同步 TopBar 图标/aria
      this.topBar?.syncFullscreenState();
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
      
      // 处理初始路由
      await this.handleRoute();
      
      this.loading.hide();
    } catch (error: any) {
      console.error('初始化失败:', error);
      this.loading.hide();
      
      // 检查是否是配置校验错误
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        this.showConfigErrorPanel(error.validationErrors);
      } else {
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

    // 创建全景查看器容器
    const viewerContainer = document.createElement('div');
    viewerContainer.className = 'viewer-container';
    viewerContainer.style.cssText = `
      position: fixed;
      top: calc(44px + env(safe-area-inset-top, 0px));
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `;
    this.appElement.appendChild(viewerContainer);

    // 创建全景查看器（检查是否启用调试模式）
    const debugMode = isDebugMode();
    this.panoViewer = new PanoViewer(viewerContainer, debugMode);

    // 新 UI：顶部半透明 TopBar（全屏目标：viewerContainer）
    this.topBar = new TopBar({
      title: scene.name || this.config?.appName || 'VR Player',
      viewerRootEl: viewerContainer,
      onTogglePickMode: () => {
        if (!this.panoViewer) return false;
        const isActive = this.panoViewer.togglePickMode();
        if (isActive) {
          showToast('拾取已开启：点一下画面获取 yaw/pitch');
        } else {
          showToast('拾取已关闭');
        }
        return isActive;
      },
    });
    this.appElement.appendChild(this.topBar.getElement());

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
        if (this.topBar) {
          // 同步 TopBar 按钮状态（需要添加一个方法来更新状态）
          // 这里暂时通过重新创建 TopBar 的方式同步，或者 TopBar 自己监听事件
        }
      }
    };
    window.addEventListener('vr:pickmode', handlePickModeChange);

    // 新 UI：左下角水印 + About 弹窗
    this.brandMark = new BrandMark({
      appName: this.config?.appName,
      brandText: '鼎虎清源',
    });
    this.appElement.appendChild(this.brandMark.getElement());
    this.appElement.appendChild(this.brandMark.getAboutModal().getElement());
    
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
    
    // 创建视频播放器
    this.videoPlayer = new VideoPlayer();
    this.appElement.appendChild(this.videoPlayer.getElement());

    // 新 UI：导览抽屉（替换旧 SceneList Drawer）
    this.sceneGuideDrawer = new SceneGuideDrawer({ scenes: museum.scenes });
    this.appElement.appendChild(this.sceneGuideDrawer.getElement());

    // 新 UI：底部 Dock（导览 tab 打开抽屉）
    this.bottomDock = new BottomDock({
      initialTab: 'guide',
      onGuideClick: () => this.sceneGuideDrawer?.toggle(),
      sceneId: scene.id,
      sceneName: scene.name,
    });
    this.appElement.appendChild(this.bottomDock.getElement());

    // 创建热点（DOM Overlay：每帧跟随 camera 投影）
    // SceneLink：点击将真正切换场景（通过路由进入既有 showScene 流程）
    const sceneNameMap = new Map(museum.scenes.map((s) => [s.id, s.name]));
    this.hotspots = new Hotspots(this.panoViewer, scene.hotspots, {
      resolveSceneName: (sceneId) => sceneNameMap.get(sceneId),
      onEnterScene: (sceneId) => {
        // 走既有路由/加载链路，避免重构私有 showScene
        navigateToScene(museum.id, sceneId);
      },
    });
    viewerContainer.appendChild(this.hotspots.getElement());

    // 创建清晰度状态指示器
    this.qualityIndicator = new QualityIndicator();
    this.appElement.appendChild(this.qualityIndicator.getElement());

    // 设置加载状态变化回调
    this.panoViewer.setOnStatusChange((status) => {
      if (this.qualityIndicator) {
        this.qualityIndicator.updateStatus(status);
      }
    });

    // 加载场景
    this.panoViewer.setOnLoad(() => {
      this.loading.hide();
      
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

    if (this.topBar) {
      this.topBar.remove();
      this.topBar = null;
    }

    if (this.brandMark) {
      this.brandMark.remove();
      this.brandMark = null;
    }

    if (this.bottomDock) {
      this.bottomDock.remove();
      this.bottomDock = null;
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

  private showError(message: string): void {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
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
    this.appElement.appendChild(errorElement);
    
    setTimeout(() => {
      errorElement.remove();
    }, 3000);
  }
}

// 启动应用
new App();

