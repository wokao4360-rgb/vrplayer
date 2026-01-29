import * as THREE from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { loadExternalImageBitmap } from '../utils/externalImage';
import { decodeImageBitmapInWorker } from '../utils/bitmapWorker';
import type { TileManifest, TileLevel } from './tileManifest';

type TileState = 'empty' | 'loading' | 'ready';

type TileInfo = {
  z: number;
  col: number;
  row: number;
  url: string;
  state: TileState;
  priority: 'low' | 'high';
  texture?: THREE.Texture;
  mesh?: THREE.Mesh;
  lastUsed: number;
  failCount: number;
  retryTimer?: number;
};

export class TileMeshPano {
  private manifest: TileManifest | null = null;
  private group: THREE.Group | null = null;
  private pendingLow: TileInfo[] = [];
  private pendingHigh: TileInfo[] = [];
  private activeLoads = 0;
  private activeLowLoads = 0;
  private activeHighLoads = 0;
  private maxConcurrent = 6;
  private maxHighWhileLow = 2;
  private defaultMaxConcurrent = 6;
  private defaultMaxHighWhileLow = 2;
  private lastUpdate = 0;
  private tilesMap: Map<string, TileInfo> = new Map();
  private highestLevel: TileLevel | null = null;
  private lowLevel: TileLevel | null = null;
  private lowReadyCount = 0;
  private lowTotalCount = 0;
  private lowFullyReady = false;
  private highSeeded = false;
  private tilesVisible = false;
  private tilesLoadedCount = 0;
  private tilesLoadingCount = 0;
  private tilesQueuedCount = 0;
  private lastTileUrl = '';
  private lastError = '';
  private lruLimit = 64;
  private highReady = false;
  private fallbackVisible = false;
  private useKtx2 = false;
  private ktx2Loader: KTX2Loader;

  constructor(
    private scene: THREE.Scene,
    private renderer: THREE.WebGLRenderer,
    private onFirstDraw: () => void,
    private onHighReady: () => void
  ) {
    this.ktx2Loader = new KTX2Loader();
    this.ktx2Loader.setTranscoderPath('/assets/basis/');
    this.ktx2Loader.detectSupport(renderer);
    this.ktx2Loader.setWorkerLimit(2);
  }

  async load(manifest: TileManifest, options?: { fallbackVisible?: boolean }): Promise<void> {
    this.manifest = manifest;
    this.useKtx2 = manifest.tileFormat === 'ktx2';
    this.fallbackVisible = Boolean(options?.fallbackVisible);
    this.highestLevel = manifest.levels.reduce((a, b) => (b.z > a.z ? b : a));
    if (!this.highestLevel) throw new Error('manifest 缺少 level');
    this.lruLimit = Math.max(64, Math.min(this.highestLevel.cols * this.highestLevel.rows, 256));
    const lowCandidates = manifest.levels.filter((l) => l.z < this.highestLevel!.z);
    this.lowLevel = lowCandidates.length
      ? lowCandidates.reduce((a, b) => (b.z > a.z ? b : a))
      : null;
    this.lowReadyCount = 0;
    this.lowTotalCount = this.lowLevel ? this.lowLevel.cols * this.lowLevel.rows : 0;
    this.lowFullyReady = this.lowTotalCount === 0;
    this.highSeeded = false;
    this.tilesVisible = false;
    this.tilesLoadedCount = 0;
    this.tilesLoadingCount = 0;
    this.tilesQueuedCount = 0;
    this.activeLoads = 0;
    this.activeLowLoads = 0;
    this.activeHighLoads = 0;

    if (this.group) {
      this.scene.remove(this.group);
    }
    this.group = new THREE.Group();
    this.group.renderOrder = 1;
    this.scene.add(this.group);

    if (!this.fallbackVisible) {
      const z0 = manifest.levels.find((l) => l.z === 0);
      if (!z0) throw new Error('manifest 缺少 z0');
      await this.loadSingleTile(z0.z, 0, 0, 'low');
    }
    if (this.lowLevel) {
      this.enqueueLevel(this.lowLevel, 'low');
    }
  }

  setPerformanceMode(mode: 'normal' | 'throttle'): void {
    if (mode === 'throttle') {
      this.maxConcurrent = 2;
      this.maxHighWhileLow = 0;
    } else {
      this.maxConcurrent = this.defaultMaxConcurrent;
      this.maxHighWhileLow = this.defaultMaxHighWhileLow;
    }
  }

  dispose(): void {
    this.tilesMap.forEach((t) => {
      t.texture?.dispose();
      if (t.mesh) {
        t.mesh.geometry.dispose();
        (t.mesh.material as THREE.MeshBasicMaterial).dispose();
      }
    });
    this.tilesMap.clear();
    if (this.group) {
      this.scene.remove(this.group);
      this.group = null;
    }
    this.ktx2Loader.dispose();
  }

  update(camera: THREE.PerspectiveCamera): void {
    if (!this.manifest || !this.highestLevel) return;
    const now = performance.now();
    if (now - this.lastUpdate < 150) return;
    this.lastUpdate = now;

    const allowHigh = !this.lowLevel || this.lowFullyReady || this.highSeeded;
    if (allowHigh && this.highestLevel) {
      const indices = this.computeNeededTiles(camera, this.highestLevel);
      for (const { col, row } of indices) {
        const key = `${this.highestLevel.z}_${col}_${row}`;
        let info = this.tilesMap.get(key);
        if (!info) {
          info = {
            z: this.highestLevel.z,
            col,
            row,
            url: this.buildTileUrl(this.highestLevel.z, col, row, this.useKtx2),
            state: 'empty',
            priority: 'high',
            lastUsed: now,
            failCount: 0,
          };
          this.tilesMap.set(key, info);
        }
        info.priority = 'high';
        info.lastUsed = now;
        if (info.state === 'empty' && !info.retryTimer) {
          info.state = 'loading';
          this.pendingHigh.push(info);
        }
      }
    }

    const loadingCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'loading').length;
    const readyCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'ready').length;
    if (this.lowLevel && !this.lowFullyReady) {
      const lowLoading = Array.from(this.tilesMap.values()).filter(
        (t) => t.z === this.lowLevel!.z && t.state === 'loading'
      ).length;
      if (this.pendingLow.length === 0 && lowLoading === 0) {
        this.lowFullyReady = true;
      }
    }
    this.tilesQueuedCount = this.pendingLow.length + this.pendingHigh.length;
    this.tilesLoadingCount = loadingCount;
    this.tilesLoadedCount = readyCount;
    this.processQueue();
    this.runLru(now);
  }

  prime(camera: THREE.PerspectiveCamera): void {
    if (!this.manifest || !this.highestLevel) return;
    camera.updateMatrixWorld(true);
    const now = performance.now();
    if (this.highestLevel && !this.highSeeded) {
      const indices = this.computeNeededTiles(camera, this.highestLevel);
      if (indices.length > 0) {
        for (const { col, row } of indices) {
          const key = `${this.highestLevel.z}_${col}_${row}`;
          let info = this.tilesMap.get(key);
          if (!info) {
            info = {
              z: this.highestLevel.z,
              col,
              row,
              url: this.buildTileUrl(this.highestLevel.z, col, row, this.useKtx2),
              state: 'empty',
              priority: 'high',
              lastUsed: now,
              failCount: 0,
            };
            this.tilesMap.set(key, info);
          }
          info.priority = 'high';
          info.lastUsed = now;
          if (info.state === 'empty' && !info.retryTimer) {
            info.state = 'loading';
            this.pendingHigh.push(info);
          }
        }
        this.highSeeded = true;
      }
    }
    this.tilesQueuedCount = this.pendingLow.length + this.pendingHigh.length;
    this.tilesLoadingCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'loading').length;
    this.processQueue();
  }

  getStatus() {
    return {
      tilesVisible: this.tilesVisible,
      fallbackVisible: this.fallbackVisible,
      tilesLoadedCount: this.tilesLoadedCount,
      tilesLoadingCount: this.tilesLoadingCount,
      tilesQueuedCount: this.tilesQueuedCount,
      lastTileUrl: this.lastTileUrl,
      lastError: this.lastError,
      canvasSize: '',
      canvasScale: 1,
      maxLevel: this.highestLevel ? `${this.highestLevel.cols}x${this.highestLevel.rows}` : '',
      highReady: this.highReady,
      zMax: this.highestLevel?.z ?? 0,
      levels: this.manifest ? this.manifest.levels.map((l) => l.z).join(',') : '',
      lowReady: this.lowFullyReady,
      lowLevel: this.lowLevel?.z ?? '',
    };
  }

  private enqueueLevel(level: TileLevel, priority: 'low' | 'high'): void {
    const now = performance.now();
    for (let row = 0; row < level.rows; row++) {
      for (let col = 0; col < level.cols; col++) {
        const key = `${level.z}_${col}_${row}`;
        let info = this.tilesMap.get(key);
        if (!info) {
          info = {
            z: level.z,
            col,
            row,
            url: this.buildTileUrl(level.z, col, row, this.useKtx2),
            state: 'empty',
            priority,
            lastUsed: now,
            failCount: 0,
          };
          this.tilesMap.set(key, info);
        }
        info.priority = priority;
        info.lastUsed = now;
        if (info.state === 'empty' && !info.retryTimer) {
          info.state = 'loading';
          if (priority === 'low') {
            this.pendingLow.push(info);
          } else {
            this.pendingHigh.push(info);
          }
        }
      }
    }
    this.tilesQueuedCount = this.pendingLow.length + this.pendingHigh.length;
    this.tilesLoadingCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'loading').length;
    this.processQueue();
  }

  private processQueue(): void {
    while (this.activeLoads < this.maxConcurrent && (this.pendingLow.length > 0 || this.pendingHigh.length > 0)) {
      const hasLow = this.pendingLow.length > 0;
      const canTakeHigh =
        this.pendingHigh.length > 0 &&
        (!hasLow || this.activeHighLoads < this.maxHighWhileLow);
      const info = canTakeHigh ? this.pendingHigh.shift()! : this.pendingLow.shift()!;
      this.loadTile(info);
    }
  }

  private async loadTile(info: TileInfo): Promise<void> {
    if (info.failCount === undefined || info.failCount === null) info.failCount = 0;
    if (!info.priority) info.priority = 'high';
    this.activeLoads += 1;
    if (info.priority === 'high') {
      this.activeHighLoads += 1;
    } else {
      this.activeLowLoads += 1;
    }
    this.lastTileUrl = info.url;
    try {
      const texture = await this.fetchTileTexture(info);
      info.texture = texture;
      info.state = 'ready';
      info.failCount = 0;
      if (info.retryTimer) {
        clearTimeout(info.retryTimer);
        info.retryTimer = undefined;
      }
      this.drawTile(info);
      this.tilesLoadedCount += 1;
      if (this.lowLevel && info.z === this.lowLevel.z) {
        this.lowReadyCount += 1;
        if (this.lowReadyCount >= this.lowTotalCount) {
          this.lowFullyReady = true;
        }
      }
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
      info.state = 'empty';
      info.failCount += 1;
      const backoffMs = Math.min(1000 * Math.pow(2, Math.max(0, info.failCount - 1)), 15000);
      this.scheduleRetry(info, backoffMs);
    } finally {
      this.activeLoads -= 1;
      if (info.priority === 'high') {
        this.activeHighLoads = Math.max(0, this.activeHighLoads - 1);
      } else {
        this.activeLowLoads = Math.max(0, this.activeLowLoads - 1);
      }
      this.processQueue();
    }
  }

  private scheduleRetry(info: TileInfo, delayMs: number): void {
    if (info.retryTimer) return;
    info.retryTimer = window.setTimeout(() => {
      info.retryTimer = undefined;
      if (info.state !== 'empty') return;
      if (info.priority === 'low') {
        this.pendingLow.push(info);
      } else {
        this.pendingHigh.push(info);
      }
      this.tilesQueuedCount = this.pendingLow.length + this.pendingHigh.length;
      this.processQueue();
    }, delayMs);
  }

  private async fetchTileTexture(info: TileInfo): Promise<THREE.Texture> {
    const baseUrl = `${this.manifest!.baseUrl}/z${info.z}/${info.col}_${info.row}`;
    const ktx2Url = `${baseUrl}.ktx2`;
    const jpgUrl = `${baseUrl}.jpg`;
    if (this.useKtx2) {
      try {
        const texture = await this.loadKtx2Texture(ktx2Url, info.priority);
        texture.name = ktx2Url;
        return texture;
      } catch (err) {
        this.lastError = err instanceof Error ? err.message : String(err);
      }
    }
    const texture = await this.loadJpgTexture(jpgUrl, info.priority);
    texture.name = jpgUrl;
    return texture;
  }

  private async loadKtx2Texture(url: string, priority: 'low' | 'high'): Promise<THREE.Texture> {
    const init: RequestInit = {
      mode: 'cors',
      cache: 'default',
      referrerPolicy: 'no-referrer',
    };
    (init as any).priority = priority === 'high' ? 'high' : 'low';
    const response = await fetch(url, init);
    if (!response.ok) throw new Error(`tile HTTP ${response.status}: ${url}`);
    const buffer = await response.arrayBuffer();
    const texture = await (this.ktx2Loader as any)._createTexture(buffer);
    texture.flipY = false;
    if ('colorSpace' in texture) {
      (texture as any).colorSpace = THREE.SRGBColorSpace;
    } else {
      (texture as any).encoding = THREE.sRGBEncoding;
    }
    texture.needsUpdate = true;
    return texture;
  }

  private async loadJpgTexture(url: string, priority: 'low' | 'high'): Promise<THREE.Texture> {
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
      });
    }
    const texture = new THREE.Texture(bmp);
    texture.flipY = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, -1);
    texture.offset.set(0, 1);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    if ('colorSpace' in texture) {
      (texture as any).colorSpace = THREE.SRGBColorSpace;
    } else {
      (texture as any).encoding = THREE.sRGBEncoding;
    }
    texture.needsUpdate = true;
    return texture;
  }

  private async loadSingleTile(z: number, col: number, row: number, priority: 'low' | 'high'): Promise<void> {
    const info: TileInfo = {
      z,
      col,
      row,
      url: this.buildTileUrl(z, col, row, this.useKtx2),
      state: 'loading',
      priority,
      lastUsed: performance.now(),
      failCount: 0,
    };
    this.tilesMap.set(`${z}_${col}_${row}`, info);
    await this.loadTile(info);
  }

  private drawTile(info: TileInfo): void {
    if (!this.manifest || !this.group || !info.texture) return;
    const level = this.manifest.levels.find((l) => l.z === info.z);
    if (!level) return;
    const geom = this.buildTileGeometry(level, info.col, info.row);
    const mat = new THREE.MeshBasicMaterial({
      map: info.texture,
      depthWrite: false,
      depthTest: false,
    });
    mat.toneMapped = false;
    const mesh = new THREE.Mesh(geom, mat);
    mesh.renderOrder = info.priority === 'high' ? 3 : 2;
    mesh.frustumCulled = false;
    info.mesh = mesh;
    this.group.add(mesh);

    if (!this.tilesVisible) {
      this.tilesVisible = true;
      this.onFirstDraw();
    }
    if (this.highestLevel && info.z === this.highestLevel.z && !this.highReady) {
      this.highReady = true;
      this.onHighReady();
    }
  }

  private buildTileGeometry(level: TileLevel, col: number, row: number): THREE.SphereGeometry {
    const radius = 500;
    const phiLength = (Math.PI * 2) / level.cols;
    const thetaLength = Math.PI / level.rows;
    const phiStart = col * phiLength - Math.PI;
    const thetaStart = row * thetaLength;
    const widthSegments = Math.max(4, Math.round(64 / level.cols));
    const heightSegments = Math.max(4, Math.round(32 / level.rows));
    const geom = new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
    geom.scale(-1, 1, 1);
    return geom;
  }

  private buildTileUrl(z: number, col: number, row: number, ktx2: boolean): string {
    const ext = ktx2 ? 'ktx2' : 'jpg';
    return `${this.manifest!.baseUrl}/z${z}/${col}_${row}.${ext}`;
  }

  private computeNeededTiles(camera: THREE.PerspectiveCamera, level: TileLevel): Array<{ col: number; row: number }> {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const yaw = -Math.atan2(dir.x, dir.z);
    const pitch = Math.asin(dir.y);
    const fovRad = THREE.MathUtils.degToRad(camera.fov);
    const margin = THREE.MathUtils.degToRad(20);
    const halfV = fovRad / 2 + margin;
    const halfH = (fovRad * camera.aspect) / 2 + margin;
    const minYaw = this.normAngle(yaw - halfH);
    const maxYaw = this.normAngle(yaw + halfH);
    const minPitch = THREE.MathUtils.clamp(pitch - halfV, -Math.PI / 2, Math.PI / 2);
    const maxPitch = THREE.MathUtils.clamp(pitch + halfV, -Math.PI / 2, Math.PI / 2);

    const colsRange = this.yawToCols(minYaw, maxYaw, level.cols);
    const centerCol = this.yawToCols(yaw - 1e-6, yaw + 1e-6, level.cols)[0];
    if (!colsRange.includes(centerCol)) colsRange.push(centerCol);
    const rowMin = Math.max(0, Math.floor(((maxPitch * -1 + Math.PI / 2) / Math.PI) * level.rows));
    const rowMax = Math.min(level.rows - 1, Math.floor(((minPitch * -1 + Math.PI / 2) / Math.PI) * level.rows));
    const rows: number[] = [];
    for (let r = rowMin; r <= rowMax; r++) rows.push(r);
    const centerRow = Math.floor(((-pitch + Math.PI / 2) / Math.PI) * level.rows);
    if (!rows.includes(centerRow)) rows.push(centerRow);
    const expandedCols = [...colsRange];
    for (const c of colsRange) {
      expandedCols.push(((c + 1) % level.cols + level.cols) % level.cols);
      expandedCols.push(((c - 1) % level.cols + level.cols) % level.cols);
    }
    const expandedRows = [...rows];
    for (const r of rows) {
      if (r + 1 < level.rows) expandedRows.push(r + 1);
      if (r - 1 >= 0) expandedRows.push(r - 1);
    }

    const needed: Array<{ col: number; row: number }> = [];
    for (const c of expandedCols) {
      for (const r of expandedRows) {
        if (!needed.find((n) => n.col === c && n.row === r)) {
          needed.push({ col: c, row: r });
        }
      }
    }
    return needed;
  }

  private yawToCols(minYaw: number, maxYaw: number, cols: number): number[] {
    const wrap = (v: number) => ((v % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const shift = Math.PI;
    const min = wrap(minYaw + shift);
    const max = wrap(maxYaw + shift);
    const indices: number[] = [];
    const push = (c: number) => {
      const cc = ((c % cols) + cols) % cols;
      if (!indices.includes(cc)) indices.push(cc);
    };
    const start = Math.floor((min / (Math.PI * 2)) * cols);
    const end = Math.floor((max / (Math.PI * 2)) * cols);
    if (min <= max) {
      for (let c = start; c <= end; c++) push(c);
    } else {
      for (let c = start; c < cols; c++) push(c);
      for (let c = 0; c <= end; c++) push(c);
    }
    return indices;
  }

  private normAngle(a: number): number {
    return ((a + Math.PI) % (2 * Math.PI)) - Math.PI;
  }

  private runLru(now: number): void {
    if (!this.highestLevel) return;
    const readyHigh = Array.from(this.tilesMap.values()).filter(
      (t) => t.z === this.highestLevel!.z && t.state === 'ready'
    );
    if (readyHigh.length <= this.lruLimit) return;
    readyHigh.sort((a, b) => a.lastUsed - b.lastUsed);
    const toDrop = readyHigh.slice(0, readyHigh.length - this.lruLimit);
    for (const t of toDrop) {
      t.texture?.dispose();
      if (t.mesh) {
        t.mesh.geometry.dispose();
        (t.mesh.material as THREE.MeshBasicMaterial).dispose();
        this.group?.remove(t.mesh);
      }
      this.tilesMap.delete(`${t.z}_${t.col}_${t.row}`);
    }
  }
}
