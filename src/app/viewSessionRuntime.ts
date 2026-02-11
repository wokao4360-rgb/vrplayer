import type { Museum, Scene } from '../types/config';
import type { StructureView2D } from '../ui/StructureView2D';
import type { StructureView3D } from '../ui/StructureView3D';
import type { AppViewMode } from '../ui/TopModeTabs';

type ViewSessionRuntimeOptions = {
  appElement: HTMLElement;
  getCurrentMuseum: () => Museum | null;
  getCurrentScene: () => Scene | null;
  getMode: () => AppViewMode;
  onSwitchToTour: () => void;
  navigateToScene: (museumId: string, sceneId: string) => void;
  loadSceneGraphModule: () => Promise<typeof import('../graph/sceneGraph')>;
  loadStructureView2DModule: () => Promise<typeof import('../ui/StructureView2D')>;
  loadStructureView3DModule: () => Promise<typeof import('../ui/StructureView3D')>;
};

export class ViewSessionRuntime {
  private readonly options: ViewSessionRuntimeOptions;
  private structure3DLoadToken = 0;
  private structureView2D: StructureView2D | null = null;
  private structureView3D: StructureView3D | null = null;
  private structureOverlayOpen = false;

  constructor(options: ViewSessionRuntimeOptions) {
    this.options = options;
  }

  isStructureOverlayOpen(): boolean {
    return this.structureOverlayOpen;
  }

  clearOverlayState(): void {
    this.structure3DLoadToken += 1;
    this.structureOverlayOpen = false;
    if (this.structureView2D) {
      this.structureView2D.remove();
      this.structureView2D = null;
    }
    if (this.structureView3D) {
      this.structureView3D.remove();
      this.structureView3D = null;
    }
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.body.style.overscrollBehavior = '';
  }

  async openStructure2D(): Promise<void> {
    const museum = this.options.getCurrentMuseum();
    const scene = this.options.getCurrentScene();
    if (!museum || !scene) return;

    if (this.structureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }

    this.structure3DLoadToken += 1;
    const loadToken = this.structure3DLoadToken;
    const [{ buildSceneGraph }, { StructureView2D }] = await Promise.all([
      this.options.loadSceneGraphModule(),
      this.options.loadStructureView2DModule(),
    ]);

    if (loadToken !== this.structure3DLoadToken || this.options.getMode() !== 'structure2d') {
      return;
    }
    const liveMuseum = this.options.getCurrentMuseum();
    const liveScene = this.options.getCurrentScene();
    if (!liveMuseum || !liveScene) return;

    const graph = buildSceneGraph(liveMuseum, liveScene.id);
    if (!this.structureView2D) {
      this.structureView2D = new StructureView2D({
        museum: liveMuseum,
        graph,
        currentSceneId: liveScene.id,
        onClose: () => {
          this.closeStructureOverlay({ toTour: true });
        },
        onNodeClick: (museumId, sceneId) => {
          this.closeStructureOverlay({ toTour: false });
          this.options.navigateToScene(museumId, sceneId);
        },
      });
      this.options.appElement.appendChild(this.structureView2D.getElement());
    } else {
      this.structureView2D.updateContext({
        museum: liveMuseum,
        graph,
        currentSceneId: liveScene.id,
      });
    }

    this.structureOverlayOpen = true;
    document.body.style.overflow = 'hidden';
    this.structureView2D.open();
  }

  async openStructure3D(): Promise<void> {
    const museum = this.options.getCurrentMuseum();
    const scene = this.options.getCurrentScene();
    if (!museum || !scene) return;

    if (this.structureOverlayOpen) {
      this.closeStructureOverlay({ toTour: false });
    }

    this.structure3DLoadToken += 1;
    const loadToken = this.structure3DLoadToken;
    const [{ buildSceneGraph }, { StructureView3D }] = await Promise.all([
      this.options.loadSceneGraphModule(),
      this.options.loadStructureView3DModule(),
    ]);

    if (loadToken !== this.structure3DLoadToken || this.options.getMode() !== 'structure3d') {
      return;
    }
    const liveMuseum = this.options.getCurrentMuseum();
    const liveScene = this.options.getCurrentScene();
    if (!liveMuseum || !liveScene) return;

    const graph = buildSceneGraph(liveMuseum, liveScene.id);
    if (!this.structureView3D) {
      this.structureView3D = new StructureView3D({
        museum: liveMuseum,
        graph,
        currentSceneId: liveScene.id,
        onClose: () => {
          this.closeStructureOverlay({ toTour: true });
        },
        onNodeClick: (museumId, sceneId) => {
          this.closeStructureOverlay({ toTour: false });
          this.options.navigateToScene(museumId, sceneId);
        },
      });
      this.options.appElement.appendChild(this.structureView3D.getElement());
    } else {
      this.structureView3D.updateContext({
        museum: liveMuseum,
        graph,
        currentSceneId: liveScene.id,
      });
    }

    this.structureOverlayOpen = true;
    document.body.style.overflow = 'hidden';
    this.structureView3D.open();
  }

  closeStructureOverlay(options: { toTour: boolean }): void {
    if (!this.structureOverlayOpen) return;
    this.clearOverlayState();
    if (options.toTour) {
      this.options.onSwitchToTour();
    }
  }

  dispose(): void {
    this.clearOverlayState();
  }
}
