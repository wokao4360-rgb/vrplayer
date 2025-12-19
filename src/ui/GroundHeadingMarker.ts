/**
 * 地面方向标组件（Ground Heading Marker）
 * 在地面层显示当前 yaw 指向的细箭头/扇形刻度，贴地、低对比、如视风格
 */

import { computeGroundOverlayTransform, shouldShowGroundOverlay } from './groundOverlayTransform';
import { interactionBus } from './interactionBus';

type GroundHeadingMarkerOptions = {
  // 可扩展选项
};

export class GroundHeadingMarker {
  private root: HTMLElement;
  private inner: HTMLElement;
  private wedge: HTMLElement;
  private northTick: HTMLElement;
  private currentYaw: number = 0;
  private currentPitch: number = 0;
  private isVisible: boolean = false;
  private unsubscribeInteracting?: () => void;
  private unsubscribeIdle?: () => void;
  private unsubscribeUIEngaged?: () => void;

  constructor(container: HTMLElement, options: GroundHeadingMarkerOptions = {}) {
    // 创建根元素
    this.root = document.createElement('div');
    this.root.className = 'vr-groundheading';

    // 创建内部容器（用于旋转）
    this.inner = document.createElement('div');
    this.inner.className = 'vr-groundheading__inner';

    // 创建扇形/箭头主体
    this.wedge = document.createElement('div');
    this.wedge.className = 'vr-groundheading__wedge';

    // 创建北向刻度线
    this.northTick = document.createElement('div');
    this.northTick.className = 'vr-groundheading__northTick';

    // 组装
    this.inner.appendChild(this.wedge);
    this.inner.appendChild(this.northTick);
    this.root.appendChild(this.inner);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
    this.root.style.setProperty('--vr-ground-base-blur', '0px');

    // 挂载到容器
    container.appendChild(this.root);

    // 接入 interactionBus
    this.setupInteractionListeners();
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

      // 设置 clarity CSS 变量（用于降噪/清晰度策略）
      this.root.style.setProperty('--vr-ground-clarity', String(transform.clarity));

      // 应用透明度
      this.root.style.opacity = transform.opacity.toString();

      // 应用贴地变换：translateX(-50%) + translateY + scaleY
      // transform-origin 已在 CSS 中设为底部中心 (50% 100%)
      this.root.style.transform = `translateX(-50%) translateY(${transform.translateY}px) scaleY(${transform.scaleY})`;
      
      // 设置基础 blur CSS 变量（用于与 clarity 合并）
      this.root.style.setProperty('--vr-ground-base-blur', `${transform.blur}px`);
      
      // 旋转方向标（与 CompassDisk 一致，使用反向旋转）
      // 相机往右转（yaw 增加），方向标应同向转，使箭头指向前进方向
      // 采用 rotateZ(-yawDeg) 与 CompassDisk disk 一致
      const rotationDeg = -yawDeg;
      this.inner.style.transform = `rotateZ(${rotationDeg}deg)`;

      if (!this.isVisible) {
        this.isVisible = true;
      }
    } else {
      // 隐藏
      if (this.isVisible) {
        this.root.style.opacity = '0';
        this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
        this.root.style.setProperty('--vr-ground-base-blur', '0px');
        this.isVisible = false;
      }
    }
  }

  /**
   * 设置交互状态（接入 interactionBus）
   */
  setInteracting(isInteracting: boolean): void {
    if (isInteracting) {
      this.root.classList.add('vr-ui-interacting');
    } else {
      this.root.classList.remove('vr-ui-interacting');
    }
  }

  /**
   * 接入 interactionBus
   */
  private setupInteractionListeners(): void {
    this.unsubscribeInteracting = interactionBus.on('user-interacting', () => {
      this.root.classList.add('vr-ui-interacting');
    });
    this.unsubscribeIdle = interactionBus.on('user-idle', () => {
      this.root.classList.remove('vr-ui-interacting');
    });
    this.unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
      this.root.classList.remove('vr-ui-interacting');
    });
  }

  /**
   * 清理资源
   */
  dispose(): void {
    // 清理事件监听
    if (this.unsubscribeInteracting) {
      this.unsubscribeInteracting();
      this.unsubscribeInteracting = undefined;
    }
    if (this.unsubscribeIdle) {
      this.unsubscribeIdle();
      this.unsubscribeIdle = undefined;
    }
    if (this.unsubscribeUIEngaged) {
      this.unsubscribeUIEngaged();
      this.unsubscribeUIEngaged = undefined;
    }
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




