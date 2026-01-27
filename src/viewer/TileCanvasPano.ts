import * as THREE from 'three';
import { loadExternalImageBitmap } from '../utils/externalImage';

type TileState = 'empty' | 'loading' | 'ready';

type TileInfo = {
  z: number;
  col: number;
  row: number;
  url: string;
  state: TileState;
  bitmap?: ImageBitmap;
  lastUsed: number;
};

type TileLevel = {
  z: number;
  cols: number;
  rows: number;
};

export type TileManifest = {
  type: 'equirect-tiles';
  tileSize: number;
  baseUrl: string;
  levels: TileLevel[];
};

export class TileCanvasPano {
  private maxTextureSize: number;
  private manifest: TileManifest | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private texture: THREE.CanvasTexture | null = null;
  private mesh: THREE.Mesh | null = null;
  private pending: TileInfo[] = [];
  private activeLoads = 0;
  private maxConcurrent = 4;
  private lastUpdate = 0;
  private tilesMap: Map<string, TileInfo> = new Map();
  private highestLevel: TileLevel | null = null;
  private tilesVisible = false;
  private tilesLoadedCount = 0;
  private tilesLoadingCount = 0;
  private tilesQueuedCount = 0;
  private lastTileUrl = '';
  private lastError = '';
  private lruLimit = 64;
  private highReady = false;
  private canvasScale = 1;

  constructor(
    private scene: THREE.Scene,
    private onFirstDraw: () => void,
    private onHighReady: () => void,
    maxTextureSize = 0
  ) {
    this.maxTextureSize = Math.max(0, maxTextureSize);
  }

  async load(manifestUrl: string): Promise<void> {
    const res = await fetch(manifestUrl);
    if (!res.ok) throw new Error(`manifest 加载失败: ${manifestUrl}`);
    const manifest = (await res.json()) as TileManifest;
    this.manifest = manifest;
    this.highestLevel = manifest.levels.reduce((a, b) => (b.z > a.z ? b : a));
    if (!this.highestLevel) throw new Error('manifest 缺少 level');

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
    this.ctx = this.canvas.getContext('2d', { alpha: false })!;

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.flipY = false;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.repeat.set(1, -1);
    this.texture.offset.set(0, 1);
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

    // 先画 z0 作为首屏
    const z0 = manifest.levels.find((l) => l.z === 0);
    if (!z0) throw new Error('manifest 缺少 z0');
    const z0Url = `${manifest.baseUrl}/z0/0_0.jpg`;
    const z0Bitmap = await this.fetchTileBitmap(z0Url);
    await this.drawTile({ z: 0, col: 0, row: 0, bitmap: z0Bitmap });
    z0Bitmap.close?.();
    const z1 = manifest.levels.find((l) => l.z === 1);
    if (z1) {
      const z1Url = `${manifest.baseUrl}/z1/0_0.jpg`;
      try {
        const z1Bitmap = await this.fetchTileBitmap(z1Url);
        z1Bitmap.close?.();
      } catch (err) {
        this.lastError = err instanceof Error ? err.message : String(err);
      }
    const z2 = manifest.levels.find((l) => l.z === 2);
    if (z2) {
      this.enqueueLevel(z2);
    }
    }
    this.onFirstDraw();
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

    const targetLevels = this.manifest.levels.filter((l) => l.z === 2 || l.z === 3);
    const needed: TileInfo[] = [];
    for (const lvl of targetLevels) {
      const indices = this.computeNeededTiles(camera, lvl);
      for (const { col, row } of indices) {
        const key = `${lvl.z}_${col}_${row}`;
        let info = this.tilesMap.get(key);
        if (!info) {
          info = {
            z: lvl.z,
            col,
            row,
            url: `${this.manifest.baseUrl}/z${lvl.z}/${col}_${row}.jpg`,
            state: 'empty',
            lastUsed: now,
          };
          this.tilesMap.set(key, info);
        }
        info.lastUsed = now;
        if (info.state === 'empty') {
          info.state = 'loading';
          this.pending.push(info);
        }
        needed.push(info);
      }
    }
    const loadingCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'loading').length;
    const readyCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'ready').length;
    this.tilesQueuedCount = this.pending.length;
    this.tilesLoadingCount = loadingCount;
    this.tilesLoadedCount = readyCount;
    this.processQueue();
    this.runLru(now);
  }

  prime(camera: THREE.PerspectiveCamera): void {
    if (!this.manifest || !this.highestLevel || !this.ctx) return;
    camera.updateMatrixWorld(true);
    const now = performance.now();
    const targetLevels = this.manifest.levels.filter((l) => l.z === 2 || l.z === 3);
    for (const lvl of targetLevels) {
      const indices = this.computeNeededTiles(camera, lvl);
      if (indices.length === 0) continue;
      const { col, row } = indices[0];
      const key = `${lvl.z}_${col}_${row}`;
      let info = this.tilesMap.get(key);
      if (!info) {
        info = {
          z: lvl.z,
          col,
          row,
          url: `${this.manifest.baseUrl}/z${lvl.z}/${col}_${row}.jpg`,
          state: 'empty',
          lastUsed: now,
        };
        this.tilesMap.set(key, info);
      }
      info.lastUsed = now;
      if (info.state === 'empty') {
        info.state = 'loading';
        this.pending.push(info);
      }
    }
    this.tilesQueuedCount = this.pending.length;
    this.tilesLoadingCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'loading').length;
    this.processQueue();
  }


  getStatus() {
    return {
      tilesVisible: this.tilesVisible,
      fallbackVisible: false,
      tilesLoadedCount: this.tilesLoadedCount,
      tilesLoadingCount: this.tilesLoadingCount,
      tilesQueuedCount: this.tilesQueuedCount,
      lastTileUrl: this.lastTileUrl,
      lastError: this.lastError,
      canvasSize: this.canvas ? `${this.canvas.width}x${this.canvas.height}` : '0x0',
      canvasScale: this.canvasScale,
      maxLevel: this.highestLevel ? `${this.highestLevel.cols}x${this.highestLevel.rows}` : '',
      highReady: this.highReady,
      zMax: this.highestLevel?.z ?? 0,
      levels: this.manifest ? this.manifest.levels.map((l) => l.z).join(',') : '',
    };
  }

  private enqueueLevel(level: TileLevel): void {
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
            lastUsed: now,
          };
          this.tilesMap.set(key, info);
        }
        info.lastUsed = now;
        if (info.state === 'empty') {
          info.state = 'loading';
          this.pending.push(info);
        }
      }
    }
    this.tilesQueuedCount = this.pending.length;
    this.tilesLoadingCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'loading').length;
    this.processQueue();
  }

  private processQueue(): void {
    while (this.activeLoads < this.maxConcurrent && this.pending.length > 0) {
      const info = this.pending.shift()!;
      this.loadTile(info);
    }
  }

  private async loadTile(info: TileInfo): Promise<void> {
    this.activeLoads += 1;
    this.lastTileUrl = info.url;
    try {
      const bmp = await this.fetchTileBitmap(info.url);
      info.bitmap = bmp;
      info.state = 'ready';
      this.drawTile(info);
      this.tilesLoadedCount += 1;
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
      info.state = 'empty';
    } finally {
      this.activeLoads -= 1;
      this.processQueue();
    }
  }

  private async fetchTileBitmap(url: string, timeoutMs = 12000): Promise<ImageBitmap> {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        mode: 'cors',
        cache: 'reload',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
      });
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

  private async drawTile(info: { z: number; col: number; row: number; bitmap?: ImageBitmap }): Promise<void> {
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
      const url = `${this.manifest.baseUrl}/z${info.z}/${info.col}_${info.row}.jpg`;
      const fetched = await loadExternalImageBitmap(url, { timeoutMs: 12000, retries: 1 });
      this.ctx.drawImage(fetched, x, y, tileW, tileH);
      fetched.close?.();
    } else {
      this.ctx.drawImage(bmp, x, y, tileW, tileH);
    }
    if (this.texture) this.texture.needsUpdate = true;
    this.tilesVisible = true;
    const mat = this.mesh?.material as THREE.MeshBasicMaterial;
    if (mat) {
      mat.opacity = 1;
      mat.needsUpdate = true;
    }
    if (info.z === 3 && !this.highReady) {
      this.highReady = true;
      this.onHighReady();
    }
  }

  private computeNeededTiles(camera: THREE.PerspectiveCamera, level: TileLevel): Array<{ col: number; row: number }> {
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const yaw = Math.atan2(dir.x, dir.z);
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
    const centerRow = Math.floor((( -pitch + Math.PI / 2) / Math.PI) * level.rows);
    if (!rows.includes(centerRow)) rows.push(centerRow);
    // 邻近一圈
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
        const key = `${c}_${r}`;
        if (!needed.find((n) => n.col === c && n.row === r)) {
          needed.push({ col: c, row: r });
        }
      }
    }
    return needed;
  }

  private yawToCols(minYaw: number, maxYaw: number, cols: number): number[] {
    const wrap = (v: number) => ((v % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const min = wrap(minYaw);
    const max = wrap(maxYaw);
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
    const readyZ3 = Array.from(this.tilesMap.values()).filter((t) => t.z === 3 && t.state === 'ready');
    if (readyZ3.length <= this.lruLimit) return;
    readyZ3.sort((a, b) => a.lastUsed - b.lastUsed);
    const toDrop = readyZ3.slice(0, readyZ3.length - this.lruLimit);
    for (const t of toDrop) {
      t.bitmap?.close?.();
      t.bitmap = undefined;
      t.state = 'empty';
      this.tilesMap.delete(`${t.z}_${t.col}_${t.row}`);
    }
  }
}
