import * as THREE from 'three';
import { loadExternalImageBitmap } from '../utils/externalImage';

export type TileManifest = {
  type: 'equirect-tiles';
  tileSize: number;
  baseUrl: string;
  levels: Array<{ z: number; cols: number; rows: number }>;
};

type TileLevel = {
  z: number;
  cols: number;
  rows: number;
  radius: number;
  entries: TileEntry[];
};

type TileEntry = {
  key: string;
  level: TileLevel;
  row: number;
  col: number;
  mesh: THREE.Mesh;
  status: 'empty' | 'loading' | 'ready';
  texture?: THREE.Texture;
  lastUsed: number;
};

export class TilePanoSphere {
  private manifest: TileManifest | null = null;
  private group: THREE.Group | null = null;
  private levels: TileLevel[] = [];
  private baseSphere: THREE.Mesh | null = null;
  private pending: TileEntry[] = [];
  private activeLoads = 0;
  private maxConcurrent = 4;
  private lastUpdate = 0;
  private highReady = false;
  private lruKeys: string[] = [];
  private lruLimit = 64;

  constructor(
    private scene: THREE.Scene,
    private applyTexture: (texture: THREE.Texture) => void,
    private onLowReady?: () => void,
    private onHighReady?: () => void
  ) {}

  async load(manifestUrl: string): Promise<void> {
    const res = await fetch(manifestUrl);
    if (!res.ok) throw new Error(`manifest 加载失败: ${manifestUrl}`);
    const manifest = (await res.json()) as TileManifest;
    this.manifest = manifest;

    this.group = new THREE.Group();
    this.scene.add(this.group);

    await this.loadBaseLevel();
    if (this.onLowReady) this.onLowReady();

    this.buildLevels();
  }

  update(camera: THREE.PerspectiveCamera): void {
    if (!this.manifest || !this.levels.length) return;
    const now = performance.now();
    if (now - this.lastUpdate < 150) return;
    this.lastUpdate = now;

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
    const fovRad = THREE.MathUtils.degToRad(camera.fov);
    const threshold = Math.cos(fovRad / 2 + THREE.MathUtils.degToRad(20));

    this.queueVisibleTiles(this.levels.find((l) => l.z === 2)!, forward, threshold);
    this.queueVisibleTiles(this.levels.find((l) => l.z === 3)!, forward, threshold);
    this.processQueue();
  }

  dispose(): void {
    if (this.group) {
      this.scene.remove(this.group);
    }
    if (this.baseSphere) {
      this.disposeMesh(this.baseSphere);
      this.baseSphere = null;
    }
    for (const level of this.levels) {
      for (const entry of level.entries) {
        this.disposeMesh(entry.mesh);
        if (entry.texture) entry.texture.dispose();
      }
    }
    this.levels = [];
    this.pending = [];
    this.group = null;
  }

  private async loadBaseLevel(): Promise<void> {
    if (!this.manifest || !this.group) return;
    const z0 = this.manifest.levels.find((l) => l.z === 0);
    if (!z0) throw new Error('manifest 缺少 z0');
    const tileUrl = `${this.manifest.baseUrl}/z0/0_0.jpg`;
    const bitmap = await loadExternalImageBitmap(tileUrl, { timeoutMs: 12000, retries: 1 });
    const texture = new THREE.CanvasTexture(bitmap);
    texture.flipY = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, -1);
    texture.offset.set(0, 1);
    this.applyTexture(texture);

    const geometry = new THREE.SphereGeometry(500, 64, 64);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    this.baseSphere = new THREE.Mesh(geometry, material);
    this.group.add(this.baseSphere);
  }

  private buildLevels(): void {
    if (!this.manifest || !this.group) return;
    const levelDefs = this.manifest.levels.filter((l) => l.z === 2 || l.z === 3);
    for (const def of levelDefs) {
      const level: TileLevel = {
        z: def.z,
        cols: def.cols,
        rows: def.rows,
        radius: def.z === 2 ? 499.6 : 499.2,
        entries: [],
      };
      for (let row = 0; row < level.rows; row += 1) {
        for (let col = 0; col < level.cols; col += 1) {
          const mesh = this.createTileMesh(level, row, col);
          const entry: TileEntry = {
            key: `${level.z}_${row}_${col}`,
            level,
            row,
            col,
            mesh,
            status: 'empty',
            lastUsed: 0,
          };
          level.entries.push(entry);
          this.group.add(mesh);
        }
      }
      this.levels.push(level);
    }
  }

  private createTileMesh(level: TileLevel, row: number, col: number): THREE.Mesh {
    const phiStart = (col / level.cols) * Math.PI * 2;
    const phiLength = (1 / level.cols) * Math.PI * 2;
    const thetaStart = (row / level.rows) * Math.PI;
    const thetaLength = (1 / level.rows) * Math.PI;
    const geometry = new THREE.SphereGeometry(level.radius, 12, 8, phiStart, phiLength, thetaStart, thetaLength);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1,
      side: THREE.BackSide,
      depthWrite: false,
    });
    return new THREE.Mesh(geometry, material);
  }

  private queueVisibleTiles(level: TileLevel, forward: THREE.Vector3, threshold: number): void {
    if (!level) return;
    const candidates: Array<{ entry: TileEntry; score: number }> = [];
    for (const entry of level.entries) {
      const dir = this.tileDirection(level, entry.row, entry.col);
      const score = dir.dot(forward);
      if (score > threshold) {
        candidates.push({ entry, score });
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    for (const item of candidates) {
      if (item.entry.status === 'empty') {
        this.pending.push(item.entry);
        item.entry.status = 'loading';
      } else if (item.entry.status === 'ready') {
        item.entry.lastUsed = performance.now();
      }
    }
  }

  private processQueue(): void {
    while (this.activeLoads < this.maxConcurrent && this.pending.length > 0) {
      const entry = this.pending.shift()!;
      this.loadTile(entry).catch((err) => {
        console.error('[tiles] 加载失败', entry.key, err);
        entry.status = 'empty';
      });
    }
  }

  private async loadTile(entry: TileEntry): Promise<void> {
    this.activeLoads += 1;
    if (!this.manifest) throw new Error('manifest 未就绪');
    const url = `${this.manifest.baseUrl}/z${entry.level.z}/${entry.col}_${entry.row}.jpg`;
    try {
      const bitmap = await loadExternalImageBitmap(url, { timeoutMs: 12000, retries: 1 });
      const texture = new THREE.CanvasTexture(bitmap);
      texture.flipY = false;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.repeat.set(1, -1);
      texture.offset.set(0, 1);
      this.applyTexture(texture);

      const material = entry.mesh.material as THREE.MeshBasicMaterial;
      if (material.map) material.map.dispose();
      material.map = texture;
      material.needsUpdate = true;
      entry.texture = texture;
      entry.status = 'ready';
      entry.lastUsed = performance.now();
      if (entry.level.z === 3) {
        this.lruKeys.push(entry.key);
        this.shrinkLRU();
        if (!this.highReady && this.onHighReady) {
          this.highReady = true;
          this.onHighReady();
        }
      }
    } finally {
      this.activeLoads -= 1;
    }
  }

  private shrinkLRU(): void {
    while (this.lruKeys.length > this.lruLimit) {
      const key = this.lruKeys.shift();
      if (!key) break;
      for (const level of this.levels) {
        const entry = level.entries.find((e) => e.key === key);
        if (entry && entry.status === 'ready' && entry.texture) {
          entry.texture.dispose();
          entry.texture = undefined;
          entry.status = 'empty';
          const mat = entry.mesh.material as THREE.MeshBasicMaterial;
          mat.map = null;
          mat.needsUpdate = true;
        }
      }
    }
  }

  private tileDirection(level: TileLevel, row: number, col: number): THREE.Vector3 {
    const phiCenter = ((col + 0.5) / level.cols) * Math.PI * 2;
    const thetaCenter = ((row + 0.5) / level.rows) * Math.PI;
    const x = Math.sin(thetaCenter) * Math.sin(phiCenter);
    const y = Math.cos(thetaCenter);
    const z = Math.sin(thetaCenter) * Math.cos(phiCenter);
    return new THREE.Vector3(x, y, z).normalize();
  }

  private disposeMesh(mesh: THREE.Mesh): void {
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[];
    if (Array.isArray(mat)) {
      mat.forEach((m) => m.dispose());
    } else {
      mat.dispose();
    }
  }
}
