import type { MapPoint } from '../types/config.ts';
import { LoadStatus } from '../types/loadStatus.ts';
import { TravelTransitionOverlay } from '../ui/TravelTransitionOverlay.ts';
import { buildSceneTransitionCameraView } from './sceneTransitionCamera.ts';
import {
  computeSceneTransitionPlan,
  type SceneTransitionPlan,
} from './sceneTransitionMath.ts';
import {
  computeSceneTransitionProgress,
  MIN_TARGET_REVEAL_PROGRESS,
  isTransitionReleaseReady,
  type SceneTransitionReleaseMode,
  type TransitionProgressState,
} from './sceneTransitionGate.ts';
import { createInitialTransitionProgressState } from './sceneTransitionRuntime.ts';
import {
  buildSceneTransitionFrame,
  type SceneTransitionFrame,
} from './sceneTransitionTimeline.ts';

export type SceneTransitionView = {
  yaw: number;
  pitch: number;
  fov: number;
};

export type SceneTransitionControllerStartArgs = {
  currentWorldView: SceneTransitionView;
  targetWorldView: SceneTransitionView;
  sourceKind?: 'scene' | 'cover';
  fromMapPoint?: MapPoint;
  toMapPoint?: MapPoint;
  fromImage?: string;
  targetPreviewImage?: string;
  hotspotScreenX?: number;
  onCameraFrame?: (
    view: SceneTransitionView,
    context: {
      useTargetScene: boolean;
      frame: SceneTransitionFrame;
    },
  ) => void;
  onInteractionLock?: (locked: boolean) => void;
  releaseMode?: SceneTransitionReleaseMode;
};

type TransitionCompletion = 'completed' | 'cancelled';
type TransitionSessionState = TransitionProgressState;

export class SceneTransitionController {
  private readonly overlay: TravelTransitionOverlay;
  private activeSession: TransitionSession | null = null;

  constructor(root: HTMLElement) {
    this.overlay = new TravelTransitionOverlay();
    root.appendChild(this.overlay.getElement());
  }

  start(args: SceneTransitionControllerStartArgs): TransitionSession {
    this.activeSession?.cancel();
    const session = new TransitionSession(this.overlay, args, () => {
      if (this.activeSession === session) {
        this.activeSession = null;
      }
    });
    this.activeSession = session;
    session.start();
    return session;
  }

  isActive(): boolean {
    return this.activeSession?.isActive() ?? false;
  }
}

export class TransitionSession {
  readonly plan: SceneTransitionPlan;
  private readonly overlay: TravelTransitionOverlay;
  private readonly args: SceneTransitionControllerStartArgs;
  private readonly handleDispose: () => void;
  private rafId: number | null = null;
  private startTs = 0;
  private completionPromise: Promise<TransitionCompletion>;
  private resolveCompletion!: (value: TransitionCompletion) => void;
  private state: TransitionSessionState;
  private active = false;

  constructor(
    overlay: TravelTransitionOverlay,
    args: SceneTransitionControllerStartArgs,
    handleDispose: () => void,
  ) {
    this.overlay = overlay;
    this.args = args;
    this.handleDispose = handleDispose;
    this.plan = computeSceneTransitionPlan({
      currentWorldYaw: args.currentWorldView.yaw,
      targetWorldYaw: args.targetWorldView.yaw,
      hotspotScreenX: args.hotspotScreenX,
      fromMapPoint: args.fromMapPoint,
      toMapPoint: args.toMapPoint,
    });
    this.state = createInitialTransitionProgressState(args.targetPreviewImage);
    this.completionPromise = new Promise<TransitionCompletion>((resolve) => {
      this.resolveCompletion = resolve;
    });
  }

  start(): void {
    this.active = true;
    this.args.onInteractionLock?.(true);
    const overlayElement = this.overlay.getElement();
    overlayElement.dataset.durationMs = String(this.plan.durationMs);
    overlayElement.dataset.settleMs = String(this.plan.settleMs);
    overlayElement.dataset.turnLead = String(this.plan.turnLead);
    this.overlay.start({
      fromImage: this.args.fromImage,
      targetImage: this.args.targetPreviewImage,
    });
    this.rafId = window.requestAnimationFrame(this.renderFrame);
  }

  setTargetPreviewImage(imageUrl?: string): void {
    if (!imageUrl) {
      return;
    }
    this.overlay.setTargetImage(imageUrl);
  }

  markTargetReady(): void {
    this.maybeActivateReveal(performance.now(), this.state.currentProgress);
  }

  markLoadCommitted(): void {
    this.state.loadCommitted = true;
  }

  markStatus(status: LoadStatus): void {
    if (status === LoadStatus.LOW_READY) {
      this.state.lowReady = true;
      this.maybeActivateReveal(performance.now(), this.state.currentProgress);
      return;
    }
    if (status === LoadStatus.HIGH_READY || status === LoadStatus.DEGRADED) {
      this.state.lowReady = true;
      this.state.sharpReady = true;
      this.maybeActivateReveal(performance.now(), this.state.currentProgress);
    }
  }

  markError(): void {
    this.state.failed = true;
    this.maybeActivateReveal(performance.now(), this.state.currentProgress);
  }

  isActive(): boolean {
    return this.active;
  }

  waitForCompletion(): Promise<TransitionCompletion> {
    return this.completionPromise;
  }

  cancel(): void {
    if (!this.active) {
      return;
    }
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.overlay.hide();
    this.args.onInteractionLock?.(false);
    this.active = false;
    this.resolveCompletion('cancelled');
    this.handleDispose();
  }

  private readonly renderFrame = (ts: number): void => {
    if (!this.active) {
      return;
    }
    if (!this.startTs) {
      this.startTs = ts;
      if (this.state.targetReady && this.state.targetReadyAtTs === 0) {
        this.state.targetReadyAtTs = ts;
      }
    }
    let progress = this.computeProgress(ts);
    this.state.currentProgress = progress;
    if (this.maybeActivateReveal(ts, progress)) {
      progress = this.computeProgress(ts);
      this.state.currentProgress = progress;
    }
    const frame = buildSceneTransitionFrame({
      currentWorldYaw: this.args.currentWorldView.yaw,
      targetWorldYaw: this.args.targetWorldView.yaw,
      plan: this.plan,
      progress,
      targetReady: this.state.targetReady,
      targetReadyProgress: this.state.targetReadyProgress,
      sourceKind: this.args.sourceKind ?? 'scene',
    });
    this.overlay.render(frame);
    this.driveCamera(frame);

    if (progress >= 1 && isTransitionReleaseReady(this.state, this.args.releaseMode ?? 'high')) {
      this.finish();
      return;
    }
    this.rafId = window.requestAnimationFrame(this.renderFrame);
  };

  private computeProgress(ts: number): number {
    return computeSceneTransitionProgress({
      ts,
      startTs: this.startTs,
      durationMs: this.plan.durationMs,
      settleMs: this.plan.settleMs,
      state: this.state,
      releaseMode: this.args.releaseMode ?? 'high',
    });
  }

  private driveCamera(frame: SceneTransitionFrame): void {
    if (!this.args.onCameraFrame) {
      return;
    }
    const nextView = buildSceneTransitionCameraView({
      frame,
      currentWorldView: this.args.currentWorldView,
      targetWorldView: this.args.targetWorldView,
      loadCommitted: this.state.loadCommitted,
    });
    this.args.onCameraFrame(nextView, {
      useTargetScene: this.state.loadCommitted,
      frame,
    });
  }

  private finish(): void {
    if (!this.active) {
      return;
    }
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.overlay.hide();
    this.args.onInteractionLock?.(false);
    this.active = false;
    this.resolveCompletion('completed');
    this.handleDispose();
  }

  private maybeActivateReveal(ts: number, progress: number): boolean {
    if (this.state.targetReady) {
      return false;
    }
    const revealCandidate = this.state.failed || (
      this.state.loadCommitted &&
      (this.state.lowReady || this.state.sharpReady)
    );
    if (!revealCandidate || progress < MIN_TARGET_REVEAL_PROGRESS) {
      return false;
    }
    this.state.targetReady = true;
    this.state.targetReadyAtTs = ts;
    this.state.targetReadyProgress = progress;
    this.markReleaseReady(ts);
    return true;
  }

  private markReleaseReady(ts: number): void {
    if (this.state.releaseAtTs != null) {
      return;
    }
    if (!isTransitionReleaseReady(this.state, this.args.releaseMode ?? 'high')) {
      return;
    }
    this.state.releaseAtTs = ts;
    this.state.releaseProgress = this.state.currentProgress;
  }
}
