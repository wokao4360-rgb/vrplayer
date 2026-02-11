import type { Museum, Scene } from '../types/config';
import type { PanoViewer } from '../viewer/PanoViewer';
import type { BottomDock } from '../ui/BottomDock';
import type { TopModeTabs, AppViewMode } from '../ui/TopModeTabs';
import type { Hotspots } from '../ui/Hotspots';
import type { VideoPlayer } from '../ui/VideoPlayer';
import type { GuideTray } from '../ui/GuideTray';
import type { SceneGuideDrawer } from '../ui/SceneGuideDrawer';
import type { QualityIndicator } from '../ui/QualityIndicator';
import { LoadStatus } from '../types/loadStatus';
import { WarmupScheduler } from './warmupScheduler';

type SceneUiRuntimeOptions = {
  appElement: HTMLElement;
  viewerContainer: HTMLElement;
  museum: Museum;
  scene: Scene;
  initialMode: AppViewMode;
  getPanoViewer: () => PanoViewer | null;
  getCurrentSceneId: () => string | null;
  onModeChange: (mode: AppViewMode) => void;
  onEnterScene: (sceneId: string) => void;
  onOpenInfo: () => void;
  onOpenSettings: () => void;
  onOpenCommunity: () => void;
  onWarmupFeatures?: () => Promise<void> | void;
};

type IdleHandle = number;

type IdleCallback = (deadline?: { didTimeout: boolean; timeRemaining: () => number }) => void;

const requestIdle =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? (window.requestIdleCallback as (callback: IdleCallback, options?: { timeout: number }) => IdleHandle)
    : null;

const cancelIdle =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? (window.cancelIdleCallback as (handle: IdleHandle) => void)
    : null;

export class SceneUiRuntime {
  private readonly options: SceneUiRuntimeOptions;
  private disposed = false;
  private coreMounted = false;
  private coreMounting = false;
  private deferredMounted = false;
  private deferredMounting = false;
  private observerMounted = false;
  private observerMounting = false;
  private observerIdleHandle: IdleHandle | null = null;
  private featureWarmupStarted = false;
  private readonly warmupScheduler = new WarmupScheduler();

  private bottomDock: BottomDock | null = null;
  private topModeTabs: TopModeTabs | null = null;
  private hotspots: Hotspots | null = null;
  private videoPlayer: VideoPlayer | null = null;
  private guideTray: GuideTray | null = null;
  private sceneGuideDrawer: SceneGuideDrawer | null = null;
  private qualityIndicator: QualityIndicator | null = null;
  private handleMetricsEvent: ((event: Event) => void) | null = null;

  private videoPlayerModulePromise: Promise<typeof import('../ui/VideoPlayer')> | null = null;
  private guideTrayModulePromise: Promise<typeof import('../ui/GuideTray')> | null = null;
  private sceneGuideDrawerModulePromise: Promise<typeof import('../ui/SceneGuideDrawer')> | null = null;
  private qualityIndicatorModulePromise: Promise<typeof import('../ui/QualityIndicator')> | null = null;
  private dockPanelsModulePromise: Promise<typeof import('../ui/DockPanels')> | null = null;
  private communityPanelModulePromise: Promise<typeof import('../ui/community/CommunityPanel')> | null = null;

  constructor(options: SceneUiRuntimeOptions) {
    this.options = options;
  }

  getBottomDock(): BottomDock | null {
    return this.bottomDock;
  }

  getTopModeTabs(): TopModeTabs | null {
    return this.topModeTabs;
  }

  getHotspots(): Hotspots | null {
    return this.hotspots;
  }

  getVideoPlayer(): VideoPlayer | null {
    return this.videoPlayer;
  }

  getGuideTray(): GuideTray | null {
    return this.guideTray;
  }

  getSceneGuideDrawer(): SceneGuideDrawer | null {
    return this.sceneGuideDrawer;
  }

  getQualityIndicator(): QualityIndicator | null {
    return this.qualityIndicator;
  }

  async ensureQualityIndicatorMounted(): Promise<void> {
    await this.mountObserver();
  }

  async mountCore(): Promise<void> {
    if (this.coreMounted || this.coreMounting || this.disposed || !this.isAlive()) {
      return;
    }
    this.coreMounting = true;
    try {
      const [{ BottomDock }, { TopModeTabs }, { Hotspots }] = await Promise.all([
        import('../ui/BottomDock'),
        import('../ui/TopModeTabs'),
        import('../ui/Hotspots'),
      ]);
      if (this.coreMounted || this.disposed || !this.isAlive()) {
        return;
      }

      const panoViewer = this.options.getPanoViewer();
      if (!panoViewer) {
        return;
      }

      const sceneNameMap = new Map(this.options.museum.scenes.map((item) => [item.id, item.name]));

      this.bottomDock = new BottomDock({
        onGuideClick: () => {
          void this.openGuideTray();
        },
        onOpenCommunity: () => {
          this.options.onOpenCommunity();
        },
        onOpenInfo: this.options.onOpenInfo,
        onOpenSettings: this.options.onOpenSettings,
        sceneId: this.options.scene.id,
        sceneName: this.options.scene.name,
        museum: this.options.museum,
        scenes: this.options.museum.scenes,
        currentSceneId: this.options.scene.id,
      });
      this.options.appElement.appendChild(this.bottomDock.getElement());

      this.topModeTabs = new TopModeTabs({
        initialMode: this.options.initialMode,
        onModeChange: this.options.onModeChange,
      });
      this.options.appElement.appendChild(this.topModeTabs.getElement());

      this.hotspots = new Hotspots(panoViewer, this.options.scene.hotspots, {
        resolveSceneName: (sceneId) => sceneNameMap.get(sceneId),
        onEnterScene: this.options.onEnterScene,
        museumId: this.options.museum.id,
      });
      this.options.viewerContainer.appendChild(this.hotspots.getElement());

      this.coreMounted = true;
    } finally {
      this.coreMounting = false;
    }
  }

  async mountDeferred(): Promise<void> {
    if (this.deferredMounted || this.deferredMounting || this.disposed || !this.isAlive()) {
      return;
    }
    this.deferredMounting = true;
    try {
      const [{ VideoPlayer }, { GuideTray }] = await Promise.all([
        this.loadVideoPlayerModule(),
        this.loadGuideTrayModule(),
      ]);
      if (this.deferredMounted || this.disposed || !this.isAlive()) {
        return;
      }

      if (!this.videoPlayer) {
        this.videoPlayer = new VideoPlayer();
        this.options.appElement.appendChild(this.videoPlayer.getElement());
      }

      if (!this.guideTray) {
        this.guideTray = new GuideTray({
          museumId: this.options.museum.id,
          currentSceneId: this.options.scene.id,
          scenes: this.options.museum.scenes,
          onSceneClick: (sceneId) => {
            this.options.onEnterScene(sceneId);
          },
          onMoreClick: () => {
            void this.openSceneGuideDrawer();
          },
          onClose: () => {
            this.guideTray?.setVisible(false);
            window.dispatchEvent(
              new CustomEvent('vr:dock-tab-close', {
                detail: { tab: 'guide' },
              }),
            );
          },
        });
        this.guideTray.setVisible(false);
        this.options.appElement.appendChild(this.guideTray.getElement());
      }

      this.deferredMounted = true;
    } finally {
      this.deferredMounting = false;
    }
  }

  scheduleObserverMount(): void {
    if (this.observerMounted || this.observerMounting || this.disposed || this.observerIdleHandle !== null) {
      return;
    }

    if (requestIdle && cancelIdle) {
      this.observerIdleHandle = requestIdle(() => {
        this.observerIdleHandle = null;
        void this.mountObserver();
      }, { timeout: 1200 });
      return;
    }

    this.observerIdleHandle = window.setTimeout(() => {
      this.observerIdleHandle = null;
      void this.mountObserver();
    }, 500);
  }

  scheduleFeatureWarmup(startMode: 'idle' | 'immediate' = 'idle'): void {
    if (this.featureWarmupStarted || this.disposed || !this.isAlive()) {
      return;
    }
    this.featureWarmupStarted = true;
    this.warmupScheduler.schedule([
      () => this.loadVideoPlayerModule(),
      () => this.loadGuideTrayModule(),
      () => this.loadSceneGuideDrawerModule(),
      () => this.loadDockPanelsModule(),
      () => this.loadCommunityPanelModule(),
      () => Promise.resolve(this.options.onWarmupFeatures?.()),
    ], startMode);
  }

  handleStatusChange(status: LoadStatus): void {
    this.qualityIndicator?.updateStatus(status);
    if (!this.observerMounted && !this.observerMounting && !this.disposed) {
      void this.mountObserver();
    }
    if (status === LoadStatus.HIGH_READY) {
      this.scheduleFeatureWarmup('immediate');
    } else if (status === LoadStatus.DEGRADED) {
      this.scheduleFeatureWarmup('idle');
    }
  }

  dispose(): void {
    this.disposed = true;

    if (this.observerIdleHandle !== null) {
      if (requestIdle && cancelIdle) {
        cancelIdle(this.observerIdleHandle);
      } else {
        clearTimeout(this.observerIdleHandle);
      }
      this.observerIdleHandle = null;
    }
    this.warmupScheduler.dispose();

    if (this.handleMetricsEvent) {
      window.removeEventListener('vr:metrics', this.handleMetricsEvent);
      this.handleMetricsEvent = null;
    }

    this.qualityIndicator?.remove();
    this.qualityIndicator = null;
    this.sceneGuideDrawer?.remove();
    this.sceneGuideDrawer = null;
    this.guideTray?.remove();
    this.guideTray = null;
    this.videoPlayer?.remove();
    this.videoPlayer = null;
    this.hotspots?.remove();
    this.hotspots = null;

    if (this.topModeTabs) {
      this.topModeTabs.getElement().remove();
      this.topModeTabs = null;
    }

    this.bottomDock?.remove();
    this.bottomDock = null;
  }

  private async openGuideTray(): Promise<void> {
    await this.mountDeferred();
    if (this.disposed || !this.isAlive()) {
      return;
    }
    this.guideTray?.setVisible(true);
  }

  private async openSceneGuideDrawer(): Promise<void> {
    await this.mountDeferred();
    if (this.disposed || !this.isAlive()) {
      return;
    }

    if (!this.sceneGuideDrawer) {
      const { SceneGuideDrawer } = await this.loadSceneGuideDrawerModule();
      if (this.disposed || !this.isAlive()) {
        return;
      }
      this.sceneGuideDrawer = new SceneGuideDrawer({
        museumId: this.options.museum.id,
        currentSceneId: this.options.scene.id,
        scenes: this.options.museum.scenes,
        onClose: () => {
          // no-op
        },
      });
      this.options.appElement.appendChild(this.sceneGuideDrawer.getElement());
    }

    this.guideTray?.setVisible(false);
    this.sceneGuideDrawer.open();
  }

  private async mountObserver(): Promise<void> {
    if (this.observerMounted || this.observerMounting || this.disposed || !this.isAlive()) {
      return;
    }
    this.observerMounting = true;
    try {
      const { QualityIndicator } = await this.loadQualityIndicatorModule();
      if (this.observerMounted || this.disposed || !this.isAlive()) {
        return;
      }

      if (!this.qualityIndicator) {
        this.qualityIndicator = new QualityIndicator();
        this.options.appElement.appendChild(this.qualityIndicator.getElement());
      }

      const panoViewer = this.options.getPanoViewer();
      if (panoViewer) {
        this.qualityIndicator.updateStatus(panoViewer.getLoadStatus());
      }

      if (!this.handleMetricsEvent) {
        this.handleMetricsEvent = (event: Event) => {
          if (!this.qualityIndicator) {
            return;
          }
          const detail = (event as CustomEvent).detail || {};
          this.qualityIndicator.updateMetrics(detail);
        };
        window.addEventListener('vr:metrics', this.handleMetricsEvent);
      }

      this.observerMounted = true;
    } finally {
      this.observerMounting = false;
    }
  }

  private loadVideoPlayerModule(): Promise<typeof import('../ui/VideoPlayer')> {
    if (!this.videoPlayerModulePromise) {
      this.videoPlayerModulePromise = import('../ui/VideoPlayer');
    }
    return this.videoPlayerModulePromise;
  }

  private loadGuideTrayModule(): Promise<typeof import('../ui/GuideTray')> {
    if (!this.guideTrayModulePromise) {
      this.guideTrayModulePromise = import('../ui/GuideTray');
    }
    return this.guideTrayModulePromise;
  }

  private loadSceneGuideDrawerModule(): Promise<typeof import('../ui/SceneGuideDrawer')> {
    if (!this.sceneGuideDrawerModulePromise) {
      this.sceneGuideDrawerModulePromise = import('../ui/SceneGuideDrawer');
    }
    return this.sceneGuideDrawerModulePromise;
  }

  private loadQualityIndicatorModule(): Promise<typeof import('../ui/QualityIndicator')> {
    if (!this.qualityIndicatorModulePromise) {
      this.qualityIndicatorModulePromise = import('../ui/QualityIndicator');
    }
    return this.qualityIndicatorModulePromise;
  }

  private loadDockPanelsModule(): Promise<typeof import('../ui/DockPanels')> {
    if (!this.dockPanelsModulePromise) {
      this.dockPanelsModulePromise = import('../ui/DockPanels');
    }
    return this.dockPanelsModulePromise;
  }

  private loadCommunityPanelModule(): Promise<typeof import('../ui/community/CommunityPanel')> {
    if (!this.communityPanelModulePromise) {
      this.communityPanelModulePromise = import('../ui/community/CommunityPanel');
    }
    return this.communityPanelModulePromise;
  }

  private isAlive(): boolean {
    if (this.disposed) {
      return false;
    }
    const currentSceneId = this.options.getCurrentSceneId();
    return Boolean(currentSceneId && currentSceneId === this.options.scene.id);
  }
}
