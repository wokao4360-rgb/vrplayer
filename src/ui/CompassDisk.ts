/**
 * 指南针圆盘组件
 * 当用户视角向下（pitch 足够低）时显示，随 yaw 旋转保持方向正确
 * 中心包含摄影杆遮挡效果
 */

import { computeGroundOverlayTransform, shouldShowGroundOverlay } from './groundOverlayTransform';

type CompassDiskOptions = {
  // 可扩展选项
};

export class CompassDisk {
  private root: HTMLElement;
  private disk: HTMLElement;
  private mask: HTMLElement;
  private northLabel: HTMLElement;
  private eastLabel: HTMLElement;
  private southLabel: HTMLElement;
  private westLabel: HTMLElement;
  private currentYaw: number = 0;
  private currentPitch: number = 0;
  private isVisible: boolean = false;

  constructor(options: CompassDiskOptions = {}) {
    this.root = document.createElement('div');
    this.root.className = 'vr-compass';

    // 圆盘容器
    this.disk = document.createElement('div');
    this.disk.className = 'vr-compass__disk';

    // 中心遮罩（摄影杆遮挡）
    this.mask = document.createElement('div');
    this.mask.className = 'vr-compass__mask';

    // 方向标签
    this.northLabel = document.createElement('div');
    this.northLabel.className = 'vr-compass__label vr-compass__label--north';
    this.northLabel.textContent = 'N';

    this.eastLabel = document.createElement('div');
    this.eastLabel.className = 'vr-compass__label vr-compass__label--east';
    this.eastLabel.textContent = 'E';

    this.southLabel = document.createElement('div');
    this.southLabel.className = 'vr-compass__label vr-compass__label--south';
    this.southLabel.textContent = 'S';

    this.westLabel = document.createElement('div');
    this.westLabel.className = 'vr-compass__label vr-compass__label--west';
    this.westLabel.textContent = 'W';

    // 组装
    this.disk.appendChild(this.mask);
    this.disk.appendChild(this.northLabel);
    this.disk.appendChild(this.eastLabel);
    this.disk.appendChild(this.southLabel);
    this.disk.appendChild(this.westLabel);
    this.root.appendChild(this.disk);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
    this.root.style.filter = 'blur(0px)';
  }

  /**
   * 挂载到父容器
   */
  mount(parent: HTMLElement): void {
    parent.appendChild(this.root);
  }

  /**
   * 设置当前视角（yaw 和 pitch，单位：度）
   */
  setYawPitch(yawDeg: number, pitchDeg: number): void {
    this.currentYaw = yawDeg;
    this.currentPitch = pitchDeg;

    // 计算显示状态（使用公共函数）
    const shouldShow = shouldShowGroundOverlay(pitchDeg);
    
    if (shouldShow) {
      // 计算贴地变换参数（使用公共函数）
      const transform = computeGroundOverlayTransform(pitchDeg);

      // 应用透明度
      this.root.style.opacity = transform.opacity.toString();

      // 应用贴地变换：translateX(-50%) + translateY + scaleY
      // transform-origin 已在 CSS 中设为底部中心 (50% 100%)
      this.root.style.transform = `translateX(-50%) translateY(${transform.translateY}px) scaleY(${transform.scaleY})`;
      
      // 应用模糊效果
      this.root.style.filter = `blur(${transform.blur}px)`;
      
      // 旋转圆盘内容（反向旋转以保持方向正确）
      // 相机往右转（yaw 增加），罗盘应反向旋转
      const rotationDeg = -yawDeg;
      this.disk.style.transform = `rotateZ(${rotationDeg}deg)`;

      if (!this.isVisible) {
        this.isVisible = true;
      }
    } else {
      // 隐藏
      if (this.isVisible) {
        this.root.style.opacity = '0';
        this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
        this.root.style.filter = 'blur(0px)';
        this.isVisible = false;
      }
    }
  }

  /**
   * 清理资源
   */
  dispose(): void {
    if (this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }

  /**
   * 获取根元素（用于测试等）
   */
  getElement(): HTMLElement {
    return this.root;
  }
}

/**
 * 工厂函数：创建指南针圆盘
 */
export function createCompassDisk(options?: CompassDiskOptions): CompassDisk {
  return new CompassDisk(options);
}
