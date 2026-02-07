import * as THREE from 'three';
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
  priorityRank?: number;
  bitmap?: ImageBitmap;
  lastUsed: number;
  failCount: number;
  retryTimer?: number;
};

export class TileCanvasPano {
  private maxTextureSize: number;
  private manifest: TileManifest | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private texture: THREE.CanvasTexture | null = null;
  private mesh: THREE.Mesh | null = null;
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
  private tilesFailedCount = 0;
  private tilesRetryCount = 0;
  private lastTileUrl = '';
  private lastError = '';
  private lruLimit = 64;
  private highReady = false;
  private canvasScale = 1;
  private fallbackVisible = false;
  private prefetchSeeded = false;

  constructor(
    private scene: THREE.Scene,
    private onFirstDraw: () => void,
    private onHighReady: () => void,
    maxTextureSize = 0
  ) {
    this.maxTextureSize = Math.max(0, maxTextureSize);
  }

  async load(manifest: TileManifest, options?: { fallbackVisible?: boolean }): Promise<void> {
    this.manifest = manifest;
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
    this.prefetchSeeded = false;
    this.tilesVisible = false;
    this.tilesLoadedCount = 0;
    this.tilesLoadingCount = 0;
    this.tilesQueuedCount = 0;
    this.tilesFailedCount = 0;
    this.tilesRetryCount = 0;
    this.activeLoads = 0;
    this.activeLowLoads = 0;
    this.activeHighLoads = 0;

    const maxCols = this.highestLevel.cols;
    const maxRows = this.highestLevel.rows;
    const tileSize = manifest.tileSize;
    const rawW = tileSize * maxCols;
    const rawH = tileSize * maxRows;
    let canvasW = rawW;
    let canvasH = rawH;
    this.canvasScale = 1;
    if (this.maxTextureSize > 0 && (canvasW > this.maxTextureSize || canvasH > this.maxTextureSize)) {
      const scale = Math.min(this.maxTextureSize / canvasW, this.maxTextureSize / canvasH);
      canvasW = Math.max(1, Math.floor(canvasW * scale));
      canvasH = Math.max(1, Math.floor(canvasH * scale));
      this.canvasScale = scale;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasW;
    this.canvas.height = canvasH;
    this.ctx = this.canvas.getContext('2d', { alpha: true })!;
    if (this.fallbackVisible) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.texture = new THREE.CanvasTexture(this.canvas);
    // Canvas 2D 与球面 UV 以 WebGL 纹理坐标对齐，禁止二次翻转。
    this.texture.flipY = false;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = false;
    if ('colorSpace' in this.texture) {
      (this.texture as any).colorSpace = THREE.SRGBColorSpace;
    } else {
      (this.texture as any).encoding = THREE.sRGBEncoding;
    }
    this.texture.needsUpdate = true;

    const geom = new THREE.SphereGeometry(500, 64, 64);
    geom.scale(-1, 1, 1);
    const mat = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
    });
    mat.toneMapped = false;
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.renderOrder = 1;
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);

    // 先画 z0 作为首屏（无 fallback 时）
    if (!this.fallbackVisible) {
      const z0 = manifest.levels.find((l) => l.z === 0);
      if (!z0) throw new Error('manifest 缺少 z0');
      const z0Url = `${manifest.baseUrl}/z0/0_0.jpg`;
      const z0Bitmap = await this.fetchTileBitmap(z0Url, 'high');
      const z0Info: TileInfo = {
        z: 0,
        col: 0,
        row: 0,
        url: z0Url,
        state: 'ready',
        priority: 'low',
        bitmap: z0Bitmap,
        lastUsed: performance.now(),
        failCount: 0,
      };
      await this.drawTile(z0Info);
      z0Bitmap.close?.();
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
    this.tilesMap.forEach((t) => t.bitmap?.close?.());
    this.tilesMap.clear();
    if (this.mesh) {
      if (this.mesh.geometry) this.mesh.geometry.dispose();
      const mat = this.mesh.material as THREE.MeshBasicMaterial;
      if (mat.map) (mat.map as THREE.CanvasTexture).dispose();
      mat.dispose();
      this.scene.remove(this.mesh);
    }
  }

  update(camera: THREE.PerspectiveCamera): void {
    if (!this.manifest || !this.highestLevel || !this.ctx) return;
    const now = performance.now();
    if (now - this.lastUpdate < 150) return;
    this.lastUpdate = now;

    const allowHigh = !this.lowLevel || this.lowFullyReady || this.highSeeded;
    if (allowHigh && this.highestLevel) {
      const indices = this.computeNeededTiles(camera, this.highestLevel, {
        marginDeg: 10,
        expandNeighbors: false,
      });
      for (const { col, row, rank } of indices) {
        const key = `${this.highestLevel.z}_${col}_${row}`;
        let info = this.tilesMap.get(key);
        if (!info) {
          info = {
            z: this.highestLevel.z,
            col,
            row,
            url: `${this.manifest.baseUrl}/z${this.highestLevel.z}/${col}_${row}.jpg`,
            state: 'empty',
            priority: 'high',
            lastUsed: now,
            failCount: 0,
          };
          this.tilesMap.set(key, info);
        }
        info.priority = 'high';
        info.priorityRank = rank;
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
    if (!this.manifest || !this.highestLevel || !this.ctx) return;
    camera.updateMatrixWorld(true);
    const now = performance.now();
    if (this.highestLevel && !this.highSeeded) {
      const indices = this.computeNeededTiles(camera, this.highestLevel, {
        marginDeg: 10,
        expandNeighbors: false,
      });
      if (indices.length > 0) {
        for (const { col, row, rank } of indices) {
          const key = `${this.highestLevel.z}_${col}_${row}`;
          let info = this.tilesMap.get(key);
          if (!info) {
            info = {
              z: this.highestLevel.z,
              col,
              row,
              url: `${this.manifest.baseUrl}/z${this.highestLevel.z}/${col}_${row}.jpg`,
              state: 'empty',
              priority: 'high',
              lastUsed: now,
              failCount: 0,
            };
            this.tilesMap.set(key, info);
          }
          info.priority = 'high';
          info.priorityRank = rank;
          info.lastUsed = now;
          if (info.state === 'empty' && !info.retryTimer) {
            info.state = 'loading';
            this.pendingHigh.push(info);
          }
        }
        this.highSeeded = true;
      }
    }
    this.reprioritizeLowQueue(camera);
    this.seedHighPreload(camera);
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
      tilesFailedCount: this.tilesFailedCount,
      tilesRetryCount: this.tilesRetryCount,
      lastTileUrl: this.lastTileUrl,
      lastError: this.lastError,
      canvasSize: this.canvas ? `${this.canvas.width}x${this.canvas.height}` : '0x0',
      canvasScale: this.canvasScale,
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
            url: `${this.manifest!.baseUrl}/z${level.z}/${col}_${row}.jpg`,
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
    this.sortPendingHighQueue();
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
      const bmp = await this.fetchTileBitmap(info.url, info.priority);
      info.bitmap = bmp;
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
      this.tilesFailedCount += 1;
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
    this.tilesRetryCount += 1;
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

  private async fetchTileBitmap(
    url: string,
    priority: 'low' | 'high',
    timeoutMs = 12000
  ): Promise<ImageBitmap> {
    try {
      const bmp = await decodeImageBitmapInWorker(url, { timeoutMs, priority });
      if (bmp) return bmp;
    } catch {
      // worker ?????????
    }
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const init: RequestInit = {
        mode: 'cors',
        cache: 'default',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
      };
      (init as any).priority = priority === 'high' ? 'high' : 'low';
      const response = await fetch(url, init);
      if (!response.ok) {
        throw new Error(`tile HTTP ${response.status}: ${url}`);
      }
      const blob = await response.blob();
      return await createImageBitmap(blob);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private hasHigherReadyTile(z: number, col: number, row: number): boolean {
    if (!this.highestLevel) return false;
    const maxZ = this.highestLevel.z;
    if (z >= maxZ) return false;
    const factor = 1 << (maxZ - z);
    for (let dy = 0; dy < factor; dy++) {
      for (let dx = 0; dx < factor; dx++) {
        const key = `${maxZ}_${col * factor + dx}_${row * factor + dy}`;
        const info = this.tilesMap.get(key);
        if (info && info.state === 'ready') return true;
      }
    }
    return false;
  }

  private async drawTile(info: TileInfo): Promise<void> {
    if (!this.manifest || !this.highestLevel || !this.ctx || !this.canvas) return;
    const level = this.manifest.levels.find((l) => l.z === info.z);
    if (!level) return;
    if (this.hasHigherReadyTile(info.z, info.col, info.row)) {
      return;
    }
    const tileW = this.canvas.width / level.cols;
    const tileH = this.canvas.height / level.rows;
    const x = info.col * tileW;
    const y = info.row * tileH;
    if (x < 0 || y < 0 || x + tileW > this.canvas.width || y + tileH > this.canvas.height) {
      this.lastError = `tile out of canvas: z${info.z} ${info.col}_${info.row}`;
      return;
    }
    const bmp = info.bitmap;
    if (!bmp) {
      const url = info.url || `${this.manifest.baseUrl}/z${info.z}/${info.col}_${info.row}.jpg`;
      const fetched = await loadExternalImageBitmap(url, {
        timeoutMs: 12000,
        retries: 1,
        priority: info.priority,
      });
      this.ctx.drawImage(fetched, x, y, tileW, tileH);
      fetched.close?.();
    } else {
      this.ctx.drawImage(bmp, x, y, tileW, tileH);
    }
    if (this.texture) this.texture.needsUpdate = true;
    if (!this.tilesVisible) {
      this.tilesVisible = true;
      this.onFirstDraw();
    }
    const mat = this.mesh?.material as THREE.MeshBasicMaterial;
    if (mat) {
      mat.opacity = 1;
      mat.needsUpdate = true;
    }
    if (this.highestLevel && info.z === this.highestLevel.z && !this.highReady) {
      this.highReady = true;
      this.onHighReady();
    }
  }

  private computeNeededTiles(
    camera: THREE.PerspectiveCamera,
    level: TileLevel,
    options: { marginDeg?: number; expandNeighbors?: boolean } = {}
  ): Array<{ col: number; row: number; rank: number }> {
    const { yaw, pitch } = this.getViewAngles(camera);
    const fovRad = THREE.MathUtils.degToRad(camera.fov);
    const margin = THREE.MathUtils.degToRad(options.marginDeg ?? 20);
    const halfV = fovRad / 2 + margin;
    const halfH = (fovRad * camera.aspect) / 2 + margin;
    const minYaw = this.normAngle(yaw - halfH);
    const maxYaw = this.normAngle(yaw + halfH);
    const minPitch = THREE.MathUtils.clamp(pitch - halfV, -Math.PI / 2, Math.PI / 2);
    const maxPitch = THREE.MathUtils.clamp(pitch + halfV, -Math.PI / 2, Math.PI / 2);

    const colsRange = this.yawToCols(minYaw, maxYaw, level.cols);
    const centerCol = this.yawToCols(yaw - 1e-6, yaw + 1e-6, level.cols)[0] ?? 0;
    if (!colsRange.includes(centerCol)) colsRange.push(centerCol);
    const rowMin = Math.max(0, Math.floor(((maxPitch * -1 + Math.PI / 2) / Math.PI) * level.rows));
    const rowMax = Math.min(level.rows - 1, Math.floor(((minPitch * -1 + Math.PI / 2) / Math.PI) * level.rows));
    const rows: number[] = [];
    for (let r = rowMin; r <= rowMax; r++) rows.push(r);
    const centerRow = Math.min(
      level.rows - 1,
      Math.max(0, Math.floor(((-pitch + Math.PI / 2) / Math.PI) * level.rows))
    );
    if (!rows.includes(centerRow)) rows.push(centerRow);
    // 閭昏繎涓€鍦?
    const expandNeighbors = options.expandNeighbors !== false;
    const expandedCols = [...colsRange];
    if (expandNeighbors) {
      for (const c of colsRange) {
        expandedCols.push(((c + 1) % level.cols + level.cols) % level.cols);
        expandedCols.push(((c - 1) % level.cols + level.cols) % level.cols);
      }
    }
    const expandedRows = [...rows];
    if (expandNeighbors) {
      for (const r of rows) {
        if (r + 1 < level.rows) expandedRows.push(r + 1);
        if (r - 1 >= 0) expandedRows.push(r - 1);
      }
    }

    const needed = new Map<string, { col: number; row: number; rank: number }>();
    const push = (c: number, r: number) => {
      const key = `${c}_${r}`;
      const colDelta = Math.abs(c - centerCol);
      const colDist = Math.min(colDelta, level.cols - colDelta);
      const rowDist = Math.abs(r - centerRow);
      const rank = colDist * colDist + rowDist * rowDist;
      const existing = needed.get(key);
      if (!existing || rank < existing.rank) {
        needed.set(key, { col: c, row: r, rank });
      }
    };
    for (const c of expandedCols) {
      for (const r of expandedRows) {
        push(c, r);
      }
    }
    return Array.from(needed.values()).sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      if (a.row !== b.row) return a.row - b.row;
      return a.col - b.col;
    });
  }

  private sortPendingHighQueue(): void {
    if (this.pendingHigh.length < 2) return;
    this.pendingHigh.sort((a, b) => {
      const ra = a.priorityRank ?? Number.POSITIVE_INFINITY;
      const rb = b.priorityRank ?? Number.POSITIVE_INFINITY;
      if (ra !== rb) return ra - rb;
      return b.lastUsed - a.lastUsed;
    });
  }

  private reprioritizeLowQueue(camera: THREE.PerspectiveCamera): void {
    if (!this.lowLevel || this.pendingLow.length < 2) return;
    const needed = this.computeNeededTiles(camera, this.lowLevel);
    if (needed.length === 0) return;
    const rankMap = new Map<string, number>();
    for (const item of needed) {
      rankMap.set(`${item.col}_${item.row}`, item.rank);
    }
    const indexMap = new Map<TileInfo, number>();
    this.pendingLow.forEach((info, idx) => indexMap.set(info, idx));
    this.pendingLow.sort((a, b) => {
      const ra = rankMap.get(`${a.col}_${a.row}`);
      const rb = rankMap.get(`${b.col}_${b.row}`);
      const aHas = ra !== undefined;
      const bHas = rb !== undefined;
      if (aHas && bHas && ra !== rb) return ra - rb;
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      return (indexMap.get(a) ?? 0) - (indexMap.get(b) ?? 0);
    });
  }

  private seedHighPreload(camera: THREE.PerspectiveCamera): void {
    if (this.prefetchSeeded || !this.manifest || !this.highestLevel) return;
    this.prefetchSeeded = true;
    const { yaw: baseYaw, pitch: basePitch } = this.getViewAngles(camera);
    const level = this.highestLevel;
    const yawStep = (Math.PI * 2) / level.cols;
    const pitchStep = Math.PI / level.rows;
    const now = performance.now();
    for (let row = 0; row < level.rows; row++) {
      const pitch = Math.PI / 2 - (row + 0.5) * pitchStep;
      const pitchDist = Math.abs(pitch - basePitch);
      for (let col = 0; col < level.cols; col++) {
        const yaw = -Math.PI + (col + 0.5) * yawStep;
        const yawDist = this.angularDistance(yaw, baseYaw);
        const phase = yawDist <= Math.PI / 2 ? 0 : 1;
        const rank = phase * 1_000_000 + Math.round(yawDist * 1000) + Math.round(pitchDist * 10);
        const key = `${level.z}_${col}_${row}`;
        if (this.tilesMap.has(key)) continue;
        const info: TileInfo = {
          z: level.z,
          col,
          row,
          url: `${this.manifest.baseUrl}/z${level.z}/${col}_${row}.jpg`,
          state: 'loading',
          priority: 'high',
          priorityRank: rank,
          lastUsed: now,
          failCount: 0,
        };
        this.tilesMap.set(key, info);
        this.pendingHigh.push(info);
      }
    }
  }

  private yawToCols(minYaw: number, maxYaw: number, cols: number): number[] {
    const wrap = (v: number) => ((v % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const shift = Math.PI; // 灏?yaw=0 瀵归綈鍒板浘鍍忎腑绾匡紙閬垮厤鍓嶅悗棰犲€掞級
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

  private angularDistance(a: number, b: number): number {
    return Math.abs(this.normAngle(a - b));
  }

  private getViewAngles(camera: THREE.PerspectiveCamera): { yaw: number; pitch: number } {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    return {
      yaw: -Math.atan2(dir.x, dir.z),
      pitch: Math.asin(dir.y),
    };
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
      t.bitmap?.close?.();
      t.bitmap = undefined;
      t.state = 'empty';
      this.tilesMap.delete(`${t.z}_${t.col}_${t.row}`);
    }
  }
}

