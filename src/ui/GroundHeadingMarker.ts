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
  private needle: HTMLElement; // 指针元素（指示当前朝向）
  private currentYaw: number = 0;
  private currentPitch: number = 0;
  private northYaw: number = 0; // 世界北方向（度），相对于全景图纹理的正前方
  private isVisible: boolean = false;
  private unsubscribeInteracting?: () => void;
  private unsubscribeIdle?: () => void;
  private unsubscribeUIEngaged?: () => void;

  constructor(container: HTMLElement, options: GroundHeadingMarkerOptions = {}) {
    // 创建根元素
    this.root = document.createElement('div');
    this.root.className = 'vr-groundheading';
    this.root.setAttribute('data-ui', 'GroundHeadingMarker');
    // 临时 outline 用于调试
    this.root.style.outline = '2px solid #00ffff';

    // 创建内部容器（用于旋转）
    this.inner = document.createElement('div');
    this.inner.className = 'vr-groundheading__inner';

    // 创建扇形/箭头主体
    this.wedge = document.createElement('div');
    this.wedge.className = 'vr-groundheading__wedge';

    // 创建北向刻度线
    this.northTick = document.createElement('div');
    this.northTick.className = 'vr-groundheading__northTick';

    // 创建指针元素（指示当前朝向）
    this.needle = document.createElement('div');
    this.needle.className = 'vr-groundheading__needle';

    // 组装（inner 固定不旋转，只旋转 needle）
    this.inner.appendChild(this.wedge);
    this.inner.appendChild(this.northTick);
    this.inner.appendChild(this.needle);
    this.root.appendChild(this.inner);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
    this.root.style.setProperty('--vr-ground-base-blur', '0px');
    // 初始化旋转 CSS 变量
    this.root.style.setProperty('--groundheading-disk-rot', '0deg');
    this.root.style.setProperty('--groundheading-needle-rot', '0deg');

    // 挂载到容器
    container.appendChild(this.root);

    // 接入 interactionBus
    this.setupInteractionListeners();
  }

  /**
   * 设置世界北方向（度）
   * @param yaw 世界北方向，相对于全景图纹理的正前方。如果未指定，默认为 0（纹理正前方就是北）
   */
  setNorthYaw(yaw: number): void {
    this.northYaw = yaw;
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
      
      // 统一旋转规则：盘面（inner）按 -northYaw 旋转，指针按 cameraYaw 旋转
      // 总角度 = diskDeg + needleDeg = -northYaw + cameraYaw
      // 当 cameraYaw == northYaw 时，总角度 = 0，指针指向盘面 N
      // yaw 定义：0° 为正前方（+Z），逆时针为正
      // 向右转视角（yaw 增加）时，指针向右转（方向一致）
      const cameraYawDeg = yawDeg;
      const northYawDeg = this.northYaw ?? 0;
      const diskDeg = -northYawDeg;  // 盘面旋转：让盘面 N 对齐世界北
      const needleDeg = cameraYawDeg; // 指针旋转：表示当前相机朝向
      
      // 设置盘面和指针旋转
      this.root.style.setProperty('--groundheading-disk-rot', `${diskDeg}deg`);
      this.root.style.setProperty('--groundheading-needle-rot', `${needleDeg}deg`);

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




