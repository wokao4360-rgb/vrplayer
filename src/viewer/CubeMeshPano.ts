import {
  ClampToEdgeWrapping,
  FrontSide,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Texture,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
} from '../vendor/three-core.ts';
import { decodeImageBitmapInWorker } from '../utils/bitmapWorker';
import { loadExternalImageBitmap } from '../utils/externalImage';
import type { CubemapTileManifest, CubeFaceId } from './tileManifest.ts';
import { buildCubeHighTileUrl, buildCubeLowFaceUrl, getHighTilePlan, getLowTilePlan, type TileImageFormat, type TileMeshFormat } from './tileFormatPolicy.ts';
import { buildCubeHighTileKeys, buildCubeLowFaceOrder, buildCubeVisibleHighFaces } from './cubeTilePolicy.ts';
import { CUBE_FACE_SEQUENCE, createCubeFacePlane, createCubeFaceRoot, createCubeTilePlane } from './cubeTileScene.ts';
import { resolveKtx2TranscoderPath } from './tileMeshPanoRules.ts';

type LoadState = 'empty' | 'loading' | 'ready';

type CubeMeshInfo = {
  kind: 'low' | 'high';
  face: CubeFaceId;
  col?: number;
  row?: number;
  state: LoadState;
  url: string;
  format?: TileImageFormat;
  meshFormats: TileMeshFormat[];
  failCount: number;
  retryTimer?: number;
  lastUsed: number;
  mesh?: Mesh;
};

type Ktx2LoaderLike = {
  setTranscoderPath: (path: string) => void;
  detectSupport: (renderer: WebGLRenderer) => void;
  setWorkerLimit: (limit: number) => void;
  dispose: () => void;
  _createTexture: (buffer: ArrayBuffer) => Promise<Texture>;
};

export class CubeMeshPano {
  private manifest: CubemapTileManifest | null = null;
  private group: Group | null = null;
  private faceRoots = new Map<CubeFaceId, Group>();
  private faceLowGroups = new Map<CubeFaceId, Group>();
  private faceHighGroups = new Map<CubeFaceId, Group>();
  private pendingLow: CubeMeshInfo[] = [];
  private pendingHigh: CubeMeshInfo[] = [];
  private lowInfos = new Map<CubeFaceId, CubeMeshInfo>();
  private highInfos = new Map<string, CubeMeshInfo>();
  private activeLoads = 0;
  private activeHighLoads = 0;
  private activeLowLoads = 0;
  private maxConcurrent = 6;
  private maxHighWhileLow = 1;
  private lowReadyCount = 0;
  private lowFullyReady = false;
  private lowSeeded = false;
  private highSeeded = false;
  private highReady = false;
  private meshFormats: TileMeshFormat[] = ['ktx2', 'jpg'];
  private ktx2Loader: Ktx2LoaderLike | null = null;
  private ktx2Disabled = false;
  private tilesVisible = false;
  private tilesLoadedCount = 0;
  private tilesLoadingCount = 0;
  private tilesQueuedCount = 0;
  private tilesFailedCount = 0;
  private tilesRetryCount = 0;
  private lastTileUrl = '';
  private lastError = '';

  constructor(
    private scene: Scene,
    private renderer: WebGLRenderer,
    private onFirstDraw: () => void,
    private onHighReady: () => void,
  ) {}

  async load(manifest: CubemapTileManifest, options?: { fallbackVisible?: boolean }): Promise<void> {
    this.manifest = manifest;
    this.meshFormats = getHighTilePlan(manifest, { avifSupported: true }).meshFormats;
    if (this.meshFormats.length === 0) {
      this.meshFormats = ['jpg'];
    }
    this.ktx2Disabled = false;
    this.pendingLow = [];
    this.pendingHigh = [];
    this.lowInfos.clear();
    this.highInfos.clear();
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

    if (this.group) {
      this.scene.remove(this.group);
    }
    this.group = new Group();
    this.group.renderOrder = 1;
    this.scene.add(this.group);
    this.faceRoots.clear();
    this.faceLowGroups.clear();
    this.faceHighGroups.clear();

    for (const face of CUBE_FACE_SEQUENCE) {
      const root = createCubeFaceRoot(face, 500);
      const lowGroup = new Group();
      const highGroup = new Group();
      highGroup.visible = false;
      root.add(lowGroup);
      root.add(highGroup);
      this.group.add(root);
      this.faceRoots.set(face, root);
      this.faceLowGroups.set(face, lowGroup);
      this.faceHighGroups.set(face, highGroup);
      this.lowInfos.set(face, {
        kind: 'low',
        face,
        state: this.lowFullyReady ? 'ready' : 'empty',
        url: buildCubeLowFaceUrl(manifest.baseUrl, face, getLowTilePlan(manifest, { avifSupported: true }).bitmapFormats[1] ?? 'jpg'),
        format: 'jpg',
        meshFormats: ['jpg'],
        failCount: 0,
        lastUsed: 0,
      });
    }
  }

  prime(camera: PerspectiveCamera): void {
    this.update(camera);
  }

  update(camera: PerspectiveCamera): void {
    if (!this.manifest || !this.group) return;
    const view = this.getView(camera);
    if (!this.lowFullyReady) {
      if (!this.lowSeeded) {
        this.lowSeeded = true;
        for (const face of buildCubeLowFaceOrder(view)) {
          const info = this.lowInfos.get(face);
          if (!info || info.state !== 'empty') continue;
          info.state = 'loading';
          this.pendingLow.push(info);
        }
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
      this.group.traverse((obj: any) => {
        if (obj.geometry?.dispose) obj.geometry.dispose();
        if (obj.material?.map?.dispose) obj.material.map.dispose();
        if (obj.material?.dispose) obj.material.dispose();
      });
      this.group = null;
    }
    this.faceRoots.clear();
    this.faceLowGroups.clear();
    this.faceHighGroups.clear();
    if (this.ktx2Loader) {
      this.ktx2Loader.dispose();
      this.ktx2Loader = null;
    }
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
      fallbackVisible: this.lowFullyReady,
      tilesLoadedCount: this.tilesLoadedCount,
      tilesLoadingCount: this.tilesLoadingCount,
      tilesQueuedCount: this.tilesQueuedCount,
      tilesFailedCount: this.tilesFailedCount,
      tilesRetryCount: this.tilesRetryCount,
      lastTileUrl: this.lastTileUrl,
      lastError: this.lastError,
      canvasSize: '',
      canvasScale: 1,
      maxLevel: this.manifest ? `cube:${this.manifest.highGrid}x${this.manifest.highGrid}` : '',
      highReady: this.highReady,
      zMax: this.manifest?.highGrid ?? 0,
      levels: this.manifest ? `cube-low-${this.manifest.lowFaceSize},cube-high-${this.manifest.highTileSize}` : '',
      lowReady: this.lowFullyReady,
      lowLevel: 'cube',
    };
  }

  private enqueueHighFaces(faces: CubeFaceId[]): void {
    if (!this.manifest) return;
    for (const { face, col, row } of buildCubeHighTileKeys(faces, this.manifest.highGrid)) {
      const key = `${face}_${col}_${row}`;
      let info = this.highInfos.get(key);
      if (!info) {
        info = {
          kind: 'high',
          face,
          col,
          row,
          state: 'empty',
          url: buildCubeHighTileUrl(this.manifest.baseUrl, face, col, row, this.meshFormats[0] ?? 'jpg'),
          format: this.meshFormats[0] ?? 'jpg',
          meshFormats: [...this.meshFormats],
          failCount: 0,
          lastUsed: 0,
        };
        this.highInfos.set(key, info);
      }
      if (info.state === 'empty' && !info.retryTimer) {
        info.state = 'loading';
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

  private async loadInfo(info: CubeMeshInfo): Promise<void> {
    this.activeLoads += 1;
    if (info.kind === 'low') this.activeLowLoads += 1;
    else this.activeHighLoads += 1;
    try {
      if (info.kind === 'low') {
        await this.drawLowFace(info);
        this.lowReadyCount += 1;
        if (this.lowReadyCount >= CUBE_FACE_SEQUENCE.length) {
          this.lowFullyReady = true;
        }
      } else {
        await this.drawHighTile(info);
      }
      info.state = 'ready';
      info.failCount = 0;
      this.tilesLoadedCount += 1;
    } catch (error) {
      info.state = 'empty';
      info.failCount += 1;
      this.tilesFailedCount += 1;
      this.lastError = error instanceof Error ? error.message : String(error);
      this.scheduleRetry(info);
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

  private scheduleRetry(info: CubeMeshInfo): void {
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

  private async drawLowFace(info: CubeMeshInfo): Promise<void> {
    const texture = await this.loadJpgTexture(info.url, 'high');
    const material = new MeshBasicMaterial({
      map: texture,
      side: FrontSide,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      depthTest: false,
    });
    material.toneMapped = false;
    const mesh = createCubeFacePlane(1000, material);
    this.faceLowGroups.get(info.face)?.add(mesh);
    info.mesh = mesh;
    if (!this.tilesVisible) {
      this.tilesVisible = true;
      this.onFirstDraw();
    }
  }

  private async drawHighTile(info: CubeMeshInfo): Promise<void> {
    const texture = await this.fetchTileTexture(info);
    const material = new MeshBasicMaterial({
      map: texture,
      side: FrontSide,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      depthTest: false,
    });
    material.toneMapped = false;
    const mesh = createCubeTilePlane(500, this.manifest!.highGrid, info.col!, info.row!, material);
    this.faceHighGroups.get(info.face)?.add(mesh);
    info.mesh = mesh;
  }

  private activateHighFaces(): void {
    for (const face of CUBE_FACE_SEQUENCE) {
      const highGroup = this.faceHighGroups.get(face);
      const lowGroup = this.faceLowGroups.get(face);
      if (highGroup) {
        highGroup.visible = true;
      }
      if (lowGroup) {
        lowGroup.visible = false;
      }
    }
    if (!this.tilesVisible) {
      this.tilesVisible = true;
      this.onFirstDraw();
    }
  }

  private async fetchTileTexture(info: CubeMeshInfo): Promise<Texture> {
    for (const format of info.meshFormats) {
      const url = buildCubeHighTileUrl(this.manifest!.baseUrl, info.face, info.col!, info.row!, format);
      info.url = url;
      info.format = format;
      this.lastTileUrl = url;
      if (format === 'ktx2' && !this.ktx2Disabled) {
        try {
          return await this.loadKtx2Texture(url, 'low');
        } catch (error) {
          this.recordKtx2Failure(error);
          continue;
        }
      }
      if (format === 'jpg') {
        return await this.loadJpgTexture(url, 'low');
      }
    }
    throw new Error(`cubemap mesh tile 无可用格式: ${info.face}/${info.col}_${info.row}`);
  }

  private async loadKtx2Texture(url: string, priority: 'low' | 'high'): Promise<Texture> {
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'default',
      referrerPolicy: 'no-referrer',
      priority: priority === 'high' ? 'high' : 'low',
    } as RequestInit);
    if (!response.ok) throw new Error(`tile HTTP ${response.status}: ${url}`);
    const buffer = await response.arrayBuffer();
    const loader = await this.ensureKtx2Loader();
    const texture = await loader._createTexture(buffer);
    texture.flipY = false;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.anisotropy = this.getTextureAnisotropy();
    if ('colorSpace' in texture) {
      (texture as any).colorSpace = SRGBColorSpace;
    } else {
      (texture as any).encoding = sRGBEncoding;
    }
    texture.needsUpdate = true;
    return texture;
  }

  private async ensureKtx2Loader(): Promise<Ktx2LoaderLike> {
    if (this.ktx2Loader) {
      return this.ktx2Loader;
    }
    const { KTX2Loader } = await import('three/examples/jsm/loaders/KTX2Loader.js');
    const loader = new KTX2Loader() as unknown as Ktx2LoaderLike;
    loader.setTranscoderPath(resolveKtx2TranscoderPath());
    loader.detectSupport(this.renderer);
    loader.setWorkerLimit(2);
    this.ktx2Loader = loader;
    return loader;
  }

  private async loadJpgTexture(url: string, priority: 'low' | 'high'): Promise<Texture> {
    let bmp: ImageBitmap | null = null;
    try {
      bmp = await decodeImageBitmapInWorker(url, { timeoutMs: 12000, priority });
    } catch {
      bmp = null;
    }
    if (!bmp) {
      bmp = await loadExternalImageBitmap(url, {
        timeoutMs: 12000,
        retries: 1,
        allowFetchFallback: true,
        priority,
        channel: 'tile',
      });
    }
    const texture = new Texture(bmp);
    texture.flipY = true;
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = this.getTextureAnisotropy();
    if ('colorSpace' in texture) {
      (texture as any).colorSpace = SRGBColorSpace;
    } else {
      (texture as any).encoding = sRGBEncoding;
    }
    texture.needsUpdate = true;
    return texture;
  }

  private recordKtx2Failure(err: unknown): void {
    const msg = err instanceof Error ? err.message : String(err);
    const httpMatch = msg.match(/HTTP\s+(\d+)/i);
    if (httpMatch) {
      const code = Number(httpMatch[1]);
      if (code === 404 || code === 403 || code === 410) {
        return;
      }
    }
    this.ktx2Disabled = true;
    this.lastError = `ktx2 disabled: ${msg}`;
  }

  private getView(camera: PerspectiveCamera) {
    const tmp = new Vector3();
    camera.getWorldDirection(tmp);
    return {
      yawDeg: Math.atan2(tmp.x, tmp.z) * 180 / Math.PI,
      pitchDeg: Math.asin(Math.max(-1, Math.min(1, tmp.y))) * 180 / Math.PI,
    };
  }

  private getTextureAnisotropy(): number {
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy?.() ?? 1;
    return Math.min(8, Math.max(1, maxAniso));
  }
}
