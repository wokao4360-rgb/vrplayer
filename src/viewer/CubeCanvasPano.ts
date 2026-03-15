import {
  CanvasTexture,
  ClampToEdgeWrapping,
  FrontSide,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  sRGBEncoding,
} from '../vendor/three-core.ts';
import { decodeImageBitmapInWorker } from '../utils/bitmapWorker';
import type { CubemapTileManifest, CubeFaceId } from './tileManifest.ts';
import {
  buildCubeHighTileUrl,
  buildCubeLowFaceUrl,
  getHighTilePlan,
  getLowTilePlan,
  type TileBitmapFormat,
  type TileImageFormat,
  type TileMeshFormat,
} from './tileFormatPolicy.ts';
import { detectAvifSupport } from '../utils/imageFormatSupport';
import { TileMeshFallbackRequiredError } from './TileCanvasPano.ts';
import { buildCubeHighTileKeys, buildCubeLowFaceOrder, buildCubeVisibleHighFaces } from './cubeTilePolicy.ts';
import { CUBE_FACE_SEQUENCE, createCubeFacePlane, createCubeFaceRoot, getCubeTileAtlasDrawRect } from './cubeTileScene.ts';

type LoadState = 'empty' | 'loading' | 'ready';

type CubeLowInfo = {
  kind: 'low';
  face: CubeFaceId;
  state: LoadState;
  url: string;
  format?: TileImageFormat;
  bitmapFormats: TileBitmapFormat[];
  meshFormats: TileMeshFormat[];
  failCount: number;
  retryTimer?: number;
  lastUsed: number;
};

type CubeHighInfo = {
  kind: 'high';
  face: CubeFaceId;
  col: number;
  row: number;
  state: LoadState;
  url: string;
  format?: TileImageFormat;
  bitmapFormats: TileBitmapFormat[];
  meshFormats: TileMeshFormat[];
  failCount: number;
  retryTimer?: number;
  lastUsed: number;
};

type CubeInfo = CubeLowInfo | CubeHighInfo;

const CUBE_CANVAS_TEXTURE_ANISOTROPY = 8;

function createFaceCanvas(face: CubeFaceId, faceSize: number) {
  const canvas = document.createElement('canvas');
  canvas.width = faceSize;
  canvas.height = faceSize;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    throw new Error(`cubemap face ${face} canvas init failed`);
  }
  ctx.clearRect(0, 0, faceSize, faceSize);
  return { canvas, ctx };
}

export class CubeCanvasPano {
  private manifest: CubemapTileManifest | null = null;
  private group: Group | null = null;
  private faceRoots = new Map<CubeFaceId, Group>();
  private faceCanvases = new Map<CubeFaceId, HTMLCanvasElement>();
  private faceContexts = new Map<CubeFaceId, CanvasRenderingContext2D>();
  private faceTextures = new Map<CubeFaceId, CanvasTexture>();
  private stagedFaceCanvases = new Map<CubeFaceId, HTMLCanvasElement>();
  private stagedFaceContexts = new Map<CubeFaceId, CanvasRenderingContext2D>();
  private pendingLow: CubeLowInfo[] = [];
  private pendingHigh: CubeHighInfo[] = [];
  private lowInfos = new Map<CubeFaceId, CubeLowInfo>();
  private highInfos = new Map<string, CubeHighInfo>();
  private activeLoads = 0;
  private activeLowLoads = 0;
  private activeHighLoads = 0;
  private maxConcurrent = 6;
  private maxHighWhileLow = 1;
  private tilesVisible = false;
  private lowReadyCount = 0;
  private lowFullyReady = false;
  private lowSeeded = false;
  private highSeeded = false;
  private highReady = false;
  private avifSupported = true;
  private meshFallbackRequested = false;
  private tilesLoadedCount = 0;
  private tilesLoadingCount = 0;
  private tilesQueuedCount = 0;
  private tilesFailedCount = 0;
  private tilesRetryCount = 0;
  private lastTileUrl = '';
  private lastError = '';

  constructor(
    private scene: Scene,
    private onFirstDraw: () => void,
    private onHighReady: () => void,
    private onMeshFallback?: (error: TileMeshFallbackRequiredError) => void | Promise<void>,
  ) {}

  async load(manifest: CubemapTileManifest, options?: { fallbackVisible?: boolean }): Promise<void> {
    this.manifest = manifest;
    this.avifSupported = await detectAvifSupport();
    this.meshFallbackRequested = false;
    this.lowReadyCount = 0;
    this.lowFullyReady = Boolean(options?.fallbackVisible);
    this.lowSeeded = false;
    this.highSeeded = false;
    this.highReady = false;
    this.tilesVisible = false;
    this.tilesLoadedCount = 0;
    this.tilesLoadingCount = 0;
    this.tilesQueuedCount = 0;
    this.tilesFailedCount = 0;
    this.tilesRetryCount = 0;
    this.lowInfos.clear();
    this.highInfos.clear();
    this.pendingLow = [];
    this.pendingHigh = [];

    if (this.group) {
      this.scene.remove(this.group);
    }
    this.group = new Group();
    this.group.renderOrder = 1;
    this.scene.add(this.group);
    this.faceRoots.clear();
    this.faceCanvases.clear();
    this.faceContexts.clear();
    this.faceTextures.clear();
    this.stagedFaceCanvases.clear();
    this.stagedFaceContexts.clear();

    const highFaceSize = manifest.highTileSize * manifest.highGrid;
    for (const face of CUBE_FACE_SEQUENCE) {
      const root = createCubeFaceRoot(face, 500);
      const { canvas, ctx } = createFaceCanvas(face, highFaceSize);
      const { canvas: stagedCanvas, ctx: stagedCtx } = createFaceCanvas(face, highFaceSize);
      const texture = new CanvasTexture(canvas);
      texture.flipY = true;
      texture.wrapS = ClampToEdgeWrapping;
      texture.wrapT = ClampToEdgeWrapping;
      texture.minFilter = LinearMipmapLinearFilter;
      texture.magFilter = LinearFilter;
      texture.generateMipmaps = true;
      texture.anisotropy = CUBE_CANVAS_TEXTURE_ANISOTROPY;
      if ('colorSpace' in texture) {
        (texture as any).colorSpace = SRGBColorSpace;
      } else {
        (texture as any).encoding = sRGBEncoding;
      }
      const material = new MeshBasicMaterial({
        map: texture,
        side: FrontSide,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
      });
      material.toneMapped = false;
      const plane = createCubeFacePlane(1000, material);
      root.add(plane);
      this.group.add(root);
      this.faceRoots.set(face, root);
      this.faceCanvases.set(face, canvas);
      this.faceContexts.set(face, ctx);
      this.faceTextures.set(face, texture);
      this.stagedFaceCanvases.set(face, stagedCanvas);
      this.stagedFaceContexts.set(face, stagedCtx);

      const lowPlan = getLowTilePlan(manifest, { avifSupported: this.avifSupported });
      this.lowInfos.set(face, {
        kind: 'low',
        face,
        state: this.lowFullyReady ? 'ready' : 'empty',
        url: buildCubeLowFaceUrl(manifest.baseUrl, face, lowPlan.bitmapFormats[0] ?? 'jpg'),
        format: lowPlan.bitmapFormats[0] ?? 'jpg',
        bitmapFormats: [...lowPlan.bitmapFormats],
        meshFormats: [],
        failCount: 0,
        lastUsed: 0,
      });
    }
  }

  prime(camera: PerspectiveCamera): void {
    this.update(camera);
  }

  update(camera: PerspectiveCamera): void {
    if (!this.manifest || !this.group || this.meshFallbackRequested) return;
    const view = { yawDeg: this.getYaw(camera), pitchDeg: this.getPitch(camera) };

    if (!this.lowFullyReady) {
      if (!this.lowSeeded) {
        this.lowSeeded = true;
        for (const face of buildCubeLowFaceOrder(view)) {
          const info = this.lowInfos.get(face);
          if (!info || info.state !== 'empty') continue;
          info.state = 'loading';
          info.lastUsed = performance.now();
          this.pendingLow.push(info);
        }
      } else {
        this.reorderLowQueue(view);
      }
    } else {
      const faces = buildCubeVisibleHighFaces(view);
      this.enqueueHighFaces(faces);
      this.highSeeded = true;
      this.maybeMarkHighReady();
    }

    this.tilesQueuedCount = this.pendingLow.length + this.pendingHigh.length;
    this.tilesLoadingCount = this.activeLoads;
    this.processQueue();
  }

  dispose(): void {
    if (this.group) {
      this.scene.remove(this.group);
      for (const root of this.faceRoots.values()) {
        root.traverse((obj: any) => {
          if (obj.geometry?.dispose) obj.geometry.dispose();
          if (obj.material?.map?.dispose) obj.material.map.dispose();
          if (obj.material?.dispose) obj.material.dispose();
        });
      }
      this.group = null;
    }
    this.faceRoots.clear();
    this.faceCanvases.clear();
    this.faceContexts.clear();
    this.faceTextures.clear();
    this.stagedFaceCanvases.clear();
    this.stagedFaceContexts.clear();
  }

  setPerformanceMode(mode: 'normal' | 'throttle'): void {
    if (mode === 'throttle') {
      this.maxConcurrent = 3;
      this.maxHighWhileLow = 0;
      return;
    }
    this.maxConcurrent = 6;
    this.maxHighWhileLow = 1;
  }

  getStatus() {
    return {
      tilesVisible: this.tilesVisible,
      fallbackVisible: false,
      tilesLoadedCount: this.tilesLoadedCount,
      tilesLoadingCount: this.tilesLoadingCount,
      tilesQueuedCount: this.tilesQueuedCount,
      tilesFailedCount: this.tilesFailedCount,
      tilesRetryCount: this.tilesRetryCount,
      lastTileUrl: this.lastTileUrl,
      lastError: this.lastError,
      canvasSize: this.manifest ? `${this.manifest.highTileSize * this.manifest.highGrid}x${this.manifest.highTileSize * this.manifest.highGrid}` : '',
      canvasScale: 1,
      maxLevel: this.manifest ? `cube:${this.manifest.highGrid}x${this.manifest.highGrid}` : '',
      highReady: this.highReady,
      zMax: this.manifest?.highGrid ?? 0,
      levels: this.manifest ? `cube-low-${this.manifest.lowFaceSize},cube-high-${this.manifest.highTileSize}` : '',
      lowReady: this.lowFullyReady,
      lowLevel: 'cube',
    };
  }

  private reorderLowQueue(view: { yawDeg: number; pitchDeg: number }): void {
    if (this.pendingLow.length < 2) return;
    const order = buildCubeLowFaceOrder(view);
    const rank = new Map(order.map((face, index) => [face, index]));
    this.pendingLow.sort((a, b) => (rank.get(a.face) ?? 99) - (rank.get(b.face) ?? 99));
  }

  private enqueueHighFaces(faces: CubeFaceId[]): void {
    if (!this.manifest) return;
    for (const { face, col, row } of buildCubeHighTileKeys(faces, this.manifest.highGrid)) {
      const key = `${face}_${col}_${row}`;
      let info = this.highInfos.get(key);
      if (!info) {
        const plan = getHighTilePlan(this.manifest, { avifSupported: this.avifSupported });
        const initialFormat = plan.bitmapFormats[0] ?? plan.meshFormats[0] ?? 'jpg';
        info = {
          kind: 'high',
          face,
          col,
          row,
          state: 'empty',
          url: buildCubeHighTileUrl(this.manifest.baseUrl, face, col, row, initialFormat),
          format: initialFormat,
          bitmapFormats: [...plan.bitmapFormats],
          meshFormats: [...plan.meshFormats],
          failCount: 0,
          lastUsed: 0,
        };
        this.highInfos.set(key, info);
      }
      if (info.state === 'empty' && !info.retryTimer) {
        info.state = 'loading';
        info.lastUsed = performance.now();
        this.pendingHigh.push(info);
      }
    }
  }

  private processQueue(): void {
    while (this.activeLoads < this.maxConcurrent && (this.pendingLow.length > 0 || this.pendingHigh.length > 0)) {
      const takeHigh =
        this.lowFullyReady &&
        this.pendingHigh.length > 0 &&
        (this.pendingLow.length === 0 || this.activeHighLoads < this.maxHighWhileLow + 1);
      const info = takeHigh ? this.pendingHigh.shift()! : this.pendingLow.shift()!;
      void this.loadInfo(info);
    }
  }

  private async loadInfo(info: CubeInfo): Promise<void> {
    this.activeLoads += 1;
    if (info.kind === 'low') this.activeLowLoads += 1;
    else this.activeHighLoads += 1;
    try {
      const bitmap = await this.fetchBitmap(info);
      this.drawBitmap(info, bitmap);
      bitmap.close?.();
      info.state = 'ready';
      info.failCount = 0;
      if (info.kind === 'low') {
        this.lowReadyCount += 1;
        if (this.lowReadyCount >= CUBE_FACE_SEQUENCE.length) {
          this.lowFullyReady = true;
        }
      }
      this.tilesLoadedCount += 1;
    } catch (error) {
      if (error instanceof TileMeshFallbackRequiredError) {
        info.state = 'empty';
        if (!this.meshFallbackRequested) {
          this.meshFallbackRequested = true;
          this.pendingHigh = [];
          this.lastError = error.message;
          await this.onMeshFallback?.(error);
        }
      } else {
        info.state = 'empty';
        info.failCount += 1;
        this.tilesFailedCount += 1;
        this.lastError = error instanceof Error ? error.message : String(error);
        this.scheduleRetry(info);
      }
    } finally {
      this.activeLoads = Math.max(0, this.activeLoads - 1);
      if (info.kind === 'low') this.activeLowLoads = Math.max(0, this.activeLowLoads - 1);
      else this.activeHighLoads = Math.max(0, this.activeHighLoads - 1);
      this.tilesLoadingCount = this.activeLoads;
      this.tilesQueuedCount = this.pendingLow.length + this.pendingHigh.length;
      this.maybeMarkHighReady();
      this.processQueue();
    }
  }

  private maybeMarkHighReady(): void {
    if (this.highReady || !this.highSeeded || this.highInfos.size === 0) return;
    for (const info of this.highInfos.values()) {
      if (info.state !== 'ready') {
        return;
      }
    }
    this.activateHighFaces();
    this.highReady = true;
    this.onHighReady();
  }

  private scheduleRetry(info: CubeInfo): void {
    if (info.retryTimer) return;
    this.tilesRetryCount += 1;
    info.retryTimer = window.setTimeout(() => {
      info.retryTimer = undefined;
      if (info.state !== 'empty') return;
      info.state = 'loading';
      if (info.kind === 'low') this.pendingLow.push(info);
      else this.pendingHigh.push(info);
      this.processQueue();
    }, Math.min(1000 * Math.pow(2, Math.max(0, info.failCount - 1)), 15000));
  }

  private async fetchBitmap(info: CubeInfo): Promise<ImageBitmap> {
    let lastError: unknown = null;
    for (const format of info.bitmapFormats) {
      const url =
        info.kind === 'low'
          ? buildCubeLowFaceUrl(this.manifest!.baseUrl, info.face, format)
          : buildCubeHighTileUrl(this.manifest!.baseUrl, info.face, info.col, info.row, format);
      info.url = url;
      info.format = format;
      this.lastTileUrl = url;
      try {
        return await this.fetchBitmapFromUrl(url, info.kind === 'low' ? 'high' : 'low');
      } catch (error) {
        lastError = error;
      }
    }

    if (info.kind === 'high' && info.meshFormats.length > 0) {
      throw new TileMeshFallbackRequiredError(info.format ?? null, info.meshFormats);
    }

    throw lastError instanceof Error ? lastError : new Error(`cubemap resource load failed: ${info.url}`);
  }

  private async fetchBitmapFromUrl(url: string, priority: 'low' | 'high'): Promise<ImageBitmap> {
    try {
      const bmp = await decodeImageBitmapInWorker(url, { timeoutMs: 12000, priority });
      if (bmp) return bmp;
    } catch {
      // ignore worker decode failure and fall back to fetch
    }
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'default',
      referrerPolicy: 'no-referrer',
      priority: priority === 'high' ? 'high' : 'low',
    } as RequestInit);
    if (!response.ok) {
      throw new Error(`tile HTTP ${response.status}: ${url}`);
    }
    return await createImageBitmap(await response.blob(), { premultiplyAlpha: 'none' });
  }

  private drawBitmap(info: CubeInfo, bitmap: ImageBitmap): void {
    const ctx =
      info.kind === 'low'
        ? this.faceContexts.get(info.face)
        : this.stagedFaceContexts.get(info.face);
    const texture = this.faceTextures.get(info.face);
    const material = this.faceRoots.get(info.face)?.children[0]?.material as MeshBasicMaterial | undefined;
    if (!ctx) return;
    const faceSize = this.manifest!.highTileSize * this.manifest!.highGrid;
    if (info.kind === 'low') {
      ctx.clearRect(0, 0, faceSize, faceSize);
      ctx.drawImage(bitmap, 0, 0, faceSize, faceSize);
      if (!texture) return;
      texture.needsUpdate = true;
      if (material && material.opacity !== 1) {
        material.opacity = 1;
        material.needsUpdate = true;
      }
      if (!this.tilesVisible) {
        this.tilesVisible = true;
        this.onFirstDraw();
      }
      return;
    }

    const rect = getCubeTileAtlasDrawRect(
      faceSize,
      this.manifest!.highGrid,
      info.col,
      info.row,
    );
    ctx.drawImage(
      bitmap,
      rect.x,
      rect.y,
      rect.width,
      rect.height,
    );
  }

  private activateHighFaces(): void {
    for (const face of CUBE_FACE_SEQUENCE) {
      const stagedCanvas = this.stagedFaceCanvases.get(face);
      const ctx = this.faceContexts.get(face);
      const texture = this.faceTextures.get(face);
      const material = this.faceRoots.get(face)?.children[0]?.material as MeshBasicMaterial | undefined;
      if (!stagedCanvas || !ctx || !texture) continue;
      ctx.clearRect(0, 0, stagedCanvas.width, stagedCanvas.height);
      ctx.drawImage(stagedCanvas, 0, 0);
      texture.needsUpdate = true;
      if (material && material.opacity !== 1) {
        material.opacity = 1;
        material.needsUpdate = true;
      }
    }
    if (!this.tilesVisible) {
      this.tilesVisible = true;
      this.onFirstDraw();
    }
  }

  private getYaw(camera: PerspectiveCamera): number {
    const tmp = new Vector3();
    camera.getWorldDirection(tmp);
    return MathUtils.radToDeg(Math.atan2(tmp.x, tmp.z));
  }

  private getPitch(camera: PerspectiveCamera): number {
    const tmp = new Vector3();
    camera.getWorldDirection(tmp);
    return MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, tmp.y))));
  }
}
