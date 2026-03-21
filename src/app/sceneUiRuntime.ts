import type { Museum, Scene } from '../types/config';
import type { PanoViewer } from '../viewer/PanoViewer';
import type { SceneEnterMeta, SceneEnterView } from './sceneTransitionTypes.ts';
import type { BottomDock } from '../ui/BottomDock';
import type { TopModeTabs, AppViewMode } from '../ui/TopModeTabs';
import type { Hotspots } from '../ui/Hotspots';
import type { VideoPlayer } from '../ui/VideoPlayer';
import type { GuideTray } from '../ui/GuideTray';
import type { SceneGuideDrawer } from '../ui/SceneGuideDrawer';
import type { QualityIndicator } from '../ui/QualityIndicator';
import { LoadStatus } from '../types/loadStatus';
import { WarmupScheduler, type WarmupQueueTask } from './warmupScheduler';

let bottomDockModulePromise: Promise<typeof import('../ui/BottomDock')> | null = null;
let topModeTabsModulePromise: Promise<typeof import('../ui/TopModeTabs')> | null = null;
let hotspotsModulePromise: Promise<typeof import('../ui/Hotspots')> | null = null;
let videoPlayerModulePromiseShared: Promise<typeof import('../ui/VideoPlayer')> | null = null;
let guideTrayModulePromiseShared: Promise<typeof import('../ui/GuideTray')> | null = null;
let sceneGuideDrawerModulePromiseShared: Promise<typeof import('../ui/SceneGuideDrawer')> | null = null;

function loadBottomDockModule(): Promise<typeof import('../ui/BottomDock')> {
  if (!bottomDockModulePromise) {
    bottomDockModulePromise = import('../ui/BottomDock');
  }
  return bottomDockModulePromise;
}

function loadTopModeTabsModule(): Promise<typeof import('../ui/TopModeTabs')> {
  if (!topModeTabsModulePromise) {
    topModeTabsModulePromise = import('../ui/TopModeTabs');
  }
  return topModeTabsModulePromise;
}

function loadHotspotsModule(): Promise<typeof import('../ui/Hotspots')> {
  if (!hotspotsModulePromise) {
    hotspotsModulePromise = import('../ui/Hotspots');
  }
  return hotspotsModulePromise;
}

function loadVideoPlayerModuleShared(): Promise<typeof import('../ui/VideoPlayer')> {
  if (!videoPlayerModulePromiseShared) {
    videoPlayerModulePromiseShared = import('../ui/VideoPlayer');
  }
  return videoPlayerModulePromiseShared;
}

function loadGuideTrayModuleShared(): Promise<typeof import('../ui/GuideTray')> {
  if (!guideTrayModulePromiseShared) {
    guideTrayModulePromiseShared = import('../ui/GuideTray');
  }
  return guideTrayModulePromiseShared;
}

function loadSceneGuideDrawerModuleShared(): Promise<typeof import('../ui/SceneGuideDrawer')> {
  if (!sceneGuideDrawerModulePromiseShared) {
    sceneGuideDrawerModulePromiseShared = import('../ui/SceneGuideDrawer');
  }
  return sceneGuideDrawerModulePromiseShared;
}

export async function prewarmSceneUiRuntimeModules(): Promise<void> {
  await Promise.allSettled([
    loadBottomDockModule(),
    loadTopModeTabsModule(),
    loadHotspotsModule(),
    loadVideoPlayerModuleShared(),
    loadGuideTrayModuleShared(),
    loadSceneGuideDrawerModuleShared(),
  ]);
}

type SceneUiRuntimeOptions = {
  appElement: HTMLElement;
  viewerContainer: HTMLElement;
  museum: Museum;
  scene: Scene;
  initialMode: AppViewMode;
  getPanoViewer: () => PanoViewer | null;
  getCurrentSceneId: () => string | null;
  onModeChange: (mode: AppViewMode) => void;
  onEnterScene: (
    sceneId: string,
    view?: SceneEnterView,
    meta?: SceneEnterMeta,
  ) => void;
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

  async mountCore(): Promise<void> {
    if (this.coreMounted || this.coreMounting || this.disposed || !this.isAlive()) {
      return;
    }
    this.coreMounting = true;
    try {
      const [{ BottomDock }, { TopModeTabs }, { Hotspots }] = await Promise.all([
        loadBottomDockModule(),
        loadTopModeTabsModule(),
        loadHotspotsModule(),
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
          onSceneClick: (sceneId, meta) => {
            this.options.onEnterScene(sceneId, undefined, meta);
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
    const tasks: WarmupQueueTask[] = [
      { task: () => this.loadGuideTrayModule(), priority: 'high' },
      { task: () => this.loadSceneGuideDrawerModule(), priority: 'high' },
      { task: () => this.loadVideoPlayerModule(), priority: 'high' },
      { task: () => Promise.resolve(this.options.onWarmupFeatures?.()), priority: 'normal' },
    ];
    this.warmupScheduler.schedule(tasks, startMode);
  }

  handleStatusChange(status: LoadStatus): void {
    if (
      !this.observerMounted &&
      !this.observerMounting &&
      !this.disposed &&
      (status === LoadStatus.LOW_READY ||
        status === LoadStatus.HIGH_READY ||
        status === LoadStatus.DEGRADED)
    ) {
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
        onSceneEnter: (sceneId, meta) => {
          this.options.onEnterScene(sceneId, undefined, meta);
        },
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
      this.observerMounted = true;
    } finally {
      this.observerMounting = false;
    }
  }

  private loadVideoPlayerModule(): Promise<typeof import('../ui/VideoPlayer')> {
    return loadVideoPlayerModuleShared();
  }

  private loadGuideTrayModule(): Promise<typeof import('../ui/GuideTray')> {
    return loadGuideTrayModuleShared();
  }

  private loadSceneGuideDrawerModule(): Promise<typeof import('../ui/SceneGuideDrawer')> {
    return loadSceneGuideDrawerModuleShared();
  }

  private isAlive(): boolean {
    if (this.disposed) {
      return false;
    }
    const currentSceneId = this.options.getCurrentSceneId();
    return Boolean(currentSceneId && currentSceneId === this.options.scene.id);
  }
}
