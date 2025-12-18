import * as THREE from 'three';
import { createCompassTexture } from './createCompassTexture';

type ViewAngles = { yaw: number; pitch: number };

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

function smoothstep01(x: number): number {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
}

export class NadirPatch {
  private mesh: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
  private texture: THREE.CanvasTexture;
  private radius: number;
  private opacity = 0;

  // 低头阈值（越小越“低头”）
  private showPitchDeg = -45;
  private fadeRangeDeg = 18;
  private fadeTauMs = 140; // ~150ms 级别的渐变时间常数

  constructor(scene: THREE.Scene, sphereRadius: number) {
    this.radius = sphereRadius;

    // patch 尺寸：覆盖脚底/三脚架区域（可按需要微调）
    const patchRadius = sphereRadius * 0.18;

    const geom = new THREE.CircleGeometry(patchRadius, 96);
    // CircleGeometry 默认在 XY 平面，法线 +Z；我们要水平放置并朝向相机（相机在原点，低头看 -Y）
    geom.rotateX(Math.PI / 2); // 让法线指向 -Y（从原点往下看能看到“正面”）

    this.texture = createCompassTexture(512);
    const mat = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geom, mat);
    // 贴在球体底部内侧，稍微抬起一点避免 Z-fighting
    this.mesh.position.set(0, -sphereRadius + 0.5, 0);
    this.mesh.renderOrder = 9999;
    this.mesh.visible = false;

    scene.add(this.mesh);
  }

  update(_camera: THREE.PerspectiveCamera, view: ViewAngles, dtMs: number): void {
    // yaw 旋转：让 N/E/S/W 始终与“世界方向”一致（相机 yaw 变更时罗盘同步旋转）
    // 约定：yaw=0 时 N 指向 +Z（与当前 yaw/pitch -> lookAt 的实现一致）
    const yawRad = THREE.MathUtils.degToRad(view.yaw);
    this.mesh.rotation.y = -yawRad;

    // pitch 越小表示越“低头”（朝下看），在阈值附近做渐隐渐显
    const t = smoothstep01((this.showPitchDeg - view.pitch) / this.fadeRangeDeg);
    const targetOpacity = t;

    // 指数平滑：opacity += (target - opacity) * k
    const k = 1 - Math.exp(-(dtMs || 16.7) / this.fadeTauMs);
    this.opacity = this.opacity + (targetOpacity - this.opacity) * k;

    const mat = this.mesh.material;
    mat.opacity = this.opacity;
    this.mesh.visible = this.opacity > 0.01;
  }

  dispose(scene: THREE.Scene): void {
    scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.texture.dispose();
  }
}




