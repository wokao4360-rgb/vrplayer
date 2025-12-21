import * as THREE from 'three';
import { createCompassTexture } from './createCompassTexture';
import { __VR_DEBUG__ } from '../utils/debug';

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
  private needleMesh: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshBasicMaterial> | null = null;
  private texture: THREE.CanvasTexture;
  private radius: number;
  private opacity = 0;
  private northYaw = 0; // 世界北方向（度），相对于全景图纹理的正前方
  private debugHelper: THREE.AxesHelper | null = null;

  // 低头阈值（越小越"低头"）
  private showPitchDeg = -45;
  private fadeRangeDeg = 18;
  private fadeTauMs = 140; // ~150ms 级别的渐变时间常数

  // 调试：旋转监控
  private lastRotationY = 0;
  private debugFrameCount = 0;
  private isDebugVisible = true; // 调试开关：按键 N 切换

  constructor(scene: THREE.Scene, sphereRadius: number) {
    this.radius = sphereRadius;

    // patch 尺寸：覆盖脚底/三脚架区域（可按需要微调）
    const patchRadius = sphereRadius * 0.18;

    const geom = new THREE.CircleGeometry(patchRadius, 96);
    // CircleGeometry 默认在 XY 平面，法线 +Z；我们要水平放置并朝向相机（相机在原点，低头看 -Y）
    geom.rotateX(Math.PI / 2); // 让法线指向 -Y（从原点往下看能看到"正面"）

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
    this.mesh.name = 'NadirPatch-compass-disk'; // 标记名称，方便调试定位
    // 贴在球体底部内侧，稍微抬起一点避免 Z-fighting
    this.mesh.position.set(0, -sphereRadius + 0.5, 0);
    this.mesh.renderOrder = 9999;
    this.mesh.visible = false;
    // 盘面固定不旋转（修复：不再跟随 yaw）
    this.mesh.rotation.y = 0;

    scene.add(this.mesh);

    // 创建指针（needle）
    const needleRadius = patchRadius * 0.008; // 指针宽度
    const needleHeight = patchRadius * 0.35; // 指针长度（从中心到边缘）
    const needleGeom = new THREE.CylinderGeometry(needleRadius, needleRadius, needleHeight, 8);
    needleGeom.rotateX(Math.PI / 2); // 水平放置（Z轴方向）
    needleGeom.translate(0, 0, needleHeight / 2); // 将原点移到圆柱底部（中心）
    const needleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      depthTest: false,
      depthWrite: false,
    });
    this.needleMesh = new THREE.Mesh(needleGeom, needleMat);
    this.needleMesh.name = 'NadirPatch-compass-needle';
    // 指针位置：在盘面中心，稍微抬起避免 z-fighting
    this.needleMesh.position.set(0, -sphereRadius + 0.51, 0);
    // 旋转原点在底部中心
    this.needleMesh.rotation.order = 'YXZ';
    this.needleMesh.renderOrder = 10000; // 在盘面上方
    this.needleMesh.visible = false;
    scene.add(this.needleMesh);

    // 调试标记（仅在 __VR_DEBUG__ 时）
    if (__VR_DEBUG__) {
      // 给 mesh 添加高对比色标记
      const originalColor = mat.color.clone();
      mat.color.setHex(0x00ffff); // 青色标记

      // 添加 AxesHelper
      this.debugHelper = new THREE.AxesHelper(patchRadius * 0.5);
      this.debugHelper.position.copy(this.mesh.position);
      this.debugHelper.renderOrder = 10001;
      scene.add(this.debugHelper);

      // 打印定位信息
      console.debug('[NadirPatch] 对象已创建:', {
        uuid: this.mesh.uuid,
        name: this.mesh.name,
        type: this.mesh.type,
        position: this.mesh.position,
        rotation: this.mesh.rotation,
      });
    }

    // 监听按键 N（切换显示/隐藏）
    if (typeof window !== 'undefined') {
      const handleKeyDown = (e: KeyboardEvent) => {
        // 检查是否按了 N 键（不区分大小写），且不在输入框中
        if ((e.key === 'N' || e.key === 'n') && 
            !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          this.isDebugVisible = !this.isDebugVisible;
          this.mesh.visible = this.isDebugVisible && this.opacity > 0.01;
          if (this.needleMesh) {
            this.needleMesh.visible = this.isDebugVisible && this.opacity > 0.01;
          }
          if (this.debugHelper) {
            this.debugHelper.visible = this.isDebugVisible && this.opacity > 0.01;
          }
          console.debug(`[NadirPatch] 显示状态切换为: ${this.isDebugVisible ? '显示' : '隐藏'}`);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
    }
  }

  /**
   * 设置世界北方向（度）
   */
  setNorthYaw(yaw: number): void {
    this.northYaw = yaw;
  }

  update(_camera: THREE.PerspectiveCamera, view: ViewAngles, dtMs: number): void {
    // 修复：盘面固定不旋转，只有指针旋转
    // 盘面 rotation.y 保持为 0（盘面固定，N 始终在上）
    this.mesh.rotation.y = 0;

    // 指针旋转：根据当前相机 yaw 和世界北方向计算
    // 公式：needleYawDeg = cameraYawDeg - northYawDeg
    // 当 cameraYaw = northYaw 时，needle = 0（指针朝北/朝上）
    // 当 cameraYaw 增加（向右转），needle 也增加（指针向右转）
    const cameraYawDeg = view.yaw;
    const northYawDeg = this.northYaw;
    const needleYawDeg = cameraYawDeg - northYawDeg;
    const needleYawRad = THREE.MathUtils.degToRad(needleYawDeg);
    if (this.needleMesh) {
      this.needleMesh.rotation.y = needleYawRad;
    }

    // 临时日志：每 60 帧打印一次（便于验证）
    this.debugFrameCount++;
    if (this.debugFrameCount % 60 === 0) {
      console.log('[nadir]', {
        cameraYawDeg: cameraYawDeg.toFixed(2),
        northYawDeg: northYawDeg.toFixed(2),
        needleDeg: needleYawDeg.toFixed(2),
      });
    }

    // 调试：旋转监控（每 30 帧打印一次，仅在 __VR_DEBUG__ 时）
    if (__VR_DEBUG__) {
      if (this.debugFrameCount % 30 === 0) {
        const rotationChanged = Math.abs(this.mesh.rotation.y - this.lastRotationY) > 0.001;
        if (rotationChanged) {
          console.debug('[NadirPatch] 旋转变化:', {
            frame: this.debugFrameCount,
            cameraYaw: cameraYawDeg.toFixed(2),
            northYaw: northYawDeg.toFixed(2),
            needleYaw: needleYawDeg.toFixed(2),
            diskRotationY: this.mesh.rotation.y,
            needleRotationY: this.needleMesh?.rotation.y,
            diskPosition: this.mesh.position,
          });
        }
        this.lastRotationY = this.mesh.rotation.y;
      }
    }

    // pitch 越小表示越"低头"（朝下看），在阈值附近做渐隐渐显
    const t = smoothstep01((this.showPitchDeg - view.pitch) / this.fadeRangeDeg);
    const targetOpacity = t;

    // 指数平滑：opacity += (target - opacity) * k
    const k = 1 - Math.exp(-(dtMs || 16.7) / this.fadeTauMs);
    this.opacity = this.opacity + (targetOpacity - this.opacity) * k;

    const mat = this.mesh.material;
    mat.opacity = this.opacity;
    const shouldShow = this.isDebugVisible && this.opacity > 0.01;
    this.mesh.visible = shouldShow;
    if (this.needleMesh) {
      this.needleMesh.visible = shouldShow;
      const needleMat = this.needleMesh.material as THREE.MeshBasicMaterial;
      needleMat.opacity = this.opacity * 0.9;
    }
    if (this.debugHelper) {
      this.debugHelper.visible = shouldShow;
    }
  }

  dispose(scene: THREE.Scene): void {
    scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.texture.dispose();
    if (this.needleMesh) {
      scene.remove(this.needleMesh);
      this.needleMesh.geometry.dispose();
      this.needleMesh.material.dispose();
    }
    if (this.debugHelper) {
      scene.remove(this.debugHelper);
      this.debugHelper.dispose();
    }
  }
}




