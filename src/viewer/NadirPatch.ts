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
  // 如视模型：独立的文字sprite（每个文字朝向圆心）
  private labelSprites: Map<string, THREE.Sprite> = new Map();
  private patchRadius: number = 0;

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
    this.patchRadius = patchRadius;

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

    // 如视模型：创建独立的文字sprite（每个文字朝向圆心）
    this.createLabelSprites(scene, patchRadius, sphereRadius);

    // 调试标记（仅在 __VR_DEBUG__ 时）
    if (__VR_DEBUG__) {
      // 给 mesh 添加高对比色标记
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
    // 统一旋转规则：盘面按 -northYaw 旋转，指针按 cameraYaw 旋转
    // 总角度 = diskDeg + needleDeg = -northYaw + cameraYaw
    // 当 cameraYaw == northYaw 时，总角度 = 0，指针指向盘面 N
    // yaw 定义：0° 为正前方（+Z），逆时针为正
    // 向右转视角（yaw 增加）时，指针向右转（方向一致）
    const cameraYawDeg = view.yaw;
    const northYawDeg = this.northYaw ?? 0;
    
    // 盘面基准：让贴图的 N 对齐世界北
    const meshRotationY = THREE.MathUtils.degToRad(-northYawDeg);
    this.mesh.rotation.y = meshRotationY;
    
    // 纹理不再旋转（文字已移到独立sprite）
    this.texture.rotation = 0;
    this.texture.center.set(0.5, 0.5);
    
    // 如视模型：更新每个文字sprite的位置和旋转（朝向圆心）
    const diskYaw = -northYawDeg; // 盘面旋转角度（度）
    this.updateLabelSprites(diskYaw);
    
    // 指针表示相机朝向（相对纹理 0 的 yaw）
    if (this.needleMesh) {
      this.needleMesh.rotation.y = THREE.MathUtils.degToRad(cameraYawDeg);
    }

    // 调试：旋转监控（每 30 帧打印一次）
    if (__VR_DEBUG__) {
      this.debugFrameCount++;
      if (this.debugFrameCount % 30 === 0) {
        const rotationChanged = Math.abs(this.mesh.rotation.y - this.lastRotationY) > 0.001;
        if (rotationChanged) {
          console.debug('[NadirPatch] 旋转变化:', {
            frame: this.debugFrameCount,
            cameraYaw: cameraYawDeg.toFixed(2),
            northYaw: northYawDeg.toFixed(2),
            needleYaw: cameraYawDeg.toFixed(2),
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
    // 更新文字sprite的可见性和透明度
    this.labelSprites.forEach((sprite) => {
      sprite.visible = shouldShow;
      const spriteMat = sprite.material as THREE.SpriteMaterial;
      spriteMat.opacity = this.opacity * 0.85;
    });
    if (this.debugHelper) {
      this.debugHelper.visible = shouldShow;
    }
  }

  /**
   * 创建文字sprite（如视模型：每个文字朝向圆心）
   */
  private createLabelSprites(scene: THREE.Scene, patchRadius: number, sphereRadius: number): void {
    const labels = [
      { text: '北', baseAngle: 0 },
      { text: '东', baseAngle: 270 }, // 东（右）
      { text: '南', baseAngle: 180 },
      { text: '西', baseAngle: 90 },  // 西（左）
    ];

    labels.forEach(({ text }) => {
      // 创建文字纹理
      const canvas = document.createElement('canvas');
      const size = 128;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, size, size);
      
      // 如视风格：发光白色字体
      ctx.save();
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = `600 ${Math.round(size * 0.5)}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, size / 2, size / 2);
      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace as any;
      texture.needsUpdate = true;

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.name = `NadirPatch-label-${text}`;
      
      // 初始位置在盘面中心（稍后通过updateLabelSprites更新）
      sprite.position.set(0, -sphereRadius + 0.52, 0);
      sprite.renderOrder = 10001; // 在指针上方
      sprite.visible = false;
      
      // 设置sprite大小（相对于patch半径）
      const spriteSize = patchRadius * 0.15;
      sprite.scale.set(spriteSize, spriteSize, 1);

      scene.add(sprite);
      this.labelSprites.set(text, sprite);
    });
  }

  /**
   * 更新文字sprite的位置和旋转（如视模型：朝向圆心）
   */
  private updateLabelSprites(diskYaw: number): void {
    const labels = [
      { text: '北', baseAngle: 0 },
      { text: '东', baseAngle: 270 }, // 东（右）
      { text: '南', baseAngle: 180 },
      { text: '西', baseAngle: 90 },  // 西（左）
    ];

    labels.forEach(({ text, baseAngle }) => {
      const sprite = this.labelSprites.get(text);
      if (!sprite) return;

      // 如视模型计算：
      // labelAngle = baseAngle + diskYaw (文字在圆周上的角度)
      const labelAngle = baseAngle + diskYaw;

      // 计算文字在圆周上的位置（相对于盘面中心）
      const labelRadius = this.patchRadius * 0.56; // 文字距离圆心的距离
      const labelAngleRad = THREE.MathUtils.degToRad(labelAngle);
      
      // 盘面中心位置
      const centerY = -this.radius + 0.5;
      
      // 计算文字在圆周上的3D位置
      // 注意：盘面在XY平面（法线-Z），相机在原点向下看
      // 盘面中心在 (0, centerY, 0)
      // 文字在圆周上的位置：
      // X = sin(labelAngle) * radius
      // Z = cos(labelAngle) * radius  
      // Y = centerY (固定，稍微抬起避免z-fighting)
      const x = Math.sin(labelAngleRad) * labelRadius;
      const z = Math.cos(labelAngleRad) * labelRadius;
      sprite.position.set(x, centerY + 0.02, z);

      // 文字自身旋转，朝向圆心（相机在原点，即圆心）
      // sprite默认朝向相机，但我们需要让文字"正面"朝向相机
      // 在XY平面内，从sprite位置指向圆心的角度 = labelAngle + 180
      // 使用lookAt让sprite朝向相机（原点）
      const cameraPos = new THREE.Vector3(0, 0, 0); // 相机在原点
      sprite.lookAt(cameraPos);
    });
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
    // 清理文字sprite
    this.labelSprites.forEach((sprite) => {
      scene.remove(sprite);
      sprite.material.dispose();
      if (sprite.material.map) {
        sprite.material.map.dispose();
      }
    });
    this.labelSprites.clear();
    if (this.debugHelper) {
      scene.remove(this.debugHelper);
      this.debugHelper.dispose();
    }
  }
}




