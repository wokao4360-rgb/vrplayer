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
  private manifest: TileManifest | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private texture: THREE.CanvasTexture;
  private mesh: THREE.Mesh;
  private pending: TileInfo[] = [];
  private activeLoads = 0;
  private maxConcurrent = 4;
  private lastUpdate = 0;
  private tilesMap: Map<string, TileInfo> = new Map();
  private highestLevel: TileLevel | null = null;
  private tilesVisible = false;
  private tilesVisibleFrames = 0;
  private tilesLoadedCount = 0;
  private tilesLoadingCount = 0;
  private lastTileUrl = '';
  private lastError = '';
  private lruLimit = 64;

  constructor(private scene: THREE.Scene) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false })!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.flipY = false;
    this.texture.wrapS = THREE.ClampToEdgeWrapping;
    this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.repeat.set(1, -1);
    this.texture.offset.set(0, 1);
    this.texture.needsUpdate = true;

    const geom = new THREE.SphereGeometry(500, 64, 64);
    geom.scale(-1, 1, 1);
    const mat = new THREE.MeshBasicMaterial({
      map: this.texture,
      side: THREE.BackSide,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      depthTest: false,
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.renderOrder = 1;
    this.scene.add(this.mesh);
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
    this.canvas.width = manifest.tileSize * maxCols;
    this.canvas.height = manifest.tileSize * maxRows;
    this.texture.needsUpdate = true;
    // 先画 z0 作为首屏
    const z0 = manifest.levels.find((l) => l.z === 0);
    if (!z0) throw new Error('manifest 缺少 z0');
    await this.drawTile({ z: 0, col: 0, row: 0 });
  }

  dispose(): void {
    this.tilesMap.forEach((t) => t.bitmap?.close?.());
    this.tilesMap.clear();
    if (this.mesh.geometry) this.mesh.geometry.dispose();
    const mat = this.mesh.material as THREE.MeshBasicMaterial;
    if (mat.map) (mat.map as THREE.CanvasTexture).dispose();
    mat.dispose();
    this.scene.remove(this.mesh);
  }

  update(camera: THREE.PerspectiveCamera): void {
    if (!this.manifest || !this.highestLevel) return;
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
    this.tilesLoadingCount = this.pending.length + Array.from(this.tilesMap.values()).filter((t) => t.state === 'loading').length;
    this.tilesLoadedCount = Array.from(this.tilesMap.values()).filter((t) => t.state === 'ready').length;
    this.processQueue();
    this.runLru(now);
  }

  getStatus() {
    return {
      tilesVisible: this.tilesVisible,
      fallbackVisible: false,
      tilesLoadedCount: this.tilesLoadedCount,
      tilesLoadingCount: this.tilesLoadingCount,
      lastTileUrl: this.lastTileUrl,
      lastError: this.lastError,
    };
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
      const bmp = await loadExternalImageBitmap(info.url, { timeoutMs: 12000, retries: 1 });
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

  private async drawTile(info: { z: number; col: number; row: number; bitmap?: ImageBitmap }): Promise<void> {
    if (!this.manifest || !this.highestLevel) return;
    const level = this.manifest.levels.find((l) => l.z === info.z);
    if (!level) return;
    const size = this.manifest.tileSize;
    const x = info.col * size;
    const y = info.row * size;
    const bmp = info.bitmap;
    if (!bmp) {
      const url = `${this.manifest.baseUrl}/z${info.z}/${info.col}_${info.row}.jpg`;
      const fetched = await loadExternalImageBitmap(url, { timeoutMs: 12000, retries: 1 });
      this.ctx.drawImage(fetched, x, y, size, size);
      fetched.close?.();
    } else {
      this.ctx.drawImage(bmp, x, y, size, size);
    }
    this.texture.needsUpdate = true;
    this.tilesVisibleFrames += 1;
    if (this.tilesVisibleFrames >= 1) {
      this.tilesVisible = true;
      const mat = this.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 1;
      mat.needsUpdate = true;
    }
  }

  private computeNeededTiles(camera: THREE.PerspectiveCamera, level: TileLevel): Array<{ col: number; row: number }> {
    // 基于相机 yaw/pitch/fov 计算可视经纬度范围
    const fovRad = THREE.MathUtils.degToRad(camera.fov);
    const margin = THREE.MathUtils.degToRad(20);
    const yaw = -camera.rotation.y; // internal yaw 已取反，这里还原到世界角度
    const pitch = camera.rotation.x;
    const halfV = fovRad / 2 + margin;
    const halfH = fovRad * (camera.aspect) / 2 + margin;
    const minYaw = this.normAngle(yaw - halfH);
    const maxYaw = this.normAngle(yaw + halfH);
    const minPitch = THREE.MathUtils.clamp(pitch - halfV, -Math.PI / 2, Math.PI / 2);
    const maxPitch = THREE.MathUtils.clamp(pitch + halfV, -Math.PI / 2, Math.PI / 2);

    const colsRange = this.yawToCols(minYaw, maxYaw, level.cols);
    const rowMin = Math.max(0, Math.floor(((maxPitch * -1 + Math.PI / 2) / Math.PI) * level.rows));
    const rowMax = Math.min(level.rows - 1, Math.floor(((minPitch * -1 + Math.PI / 2) / Math.PI) * level.rows));
    const rows: number[] = [];
    for (let r = rowMin; r <= rowMax; r++) rows.push(r);
    const needed: Array<{ col: number; row: number }> = [];
    for (const c of colsRange) {
      for (const r of rows) {
        needed.push({ col: c, row: r });
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
