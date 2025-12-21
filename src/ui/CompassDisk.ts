/**
 * 指南针圆盘组件
 * 当用户视角向下（pitch 足够低）时显示，随 yaw 旋转保持方向正确
 * 中心包含摄影杆遮挡效果
 */

import { computeGroundOverlayTransform, shouldShowGroundOverlay } from './groundOverlayTransform';
import { interactionBus } from './interactionBus';

type CompassDiskOptions = {
  // 可扩展选项
};

export class CompassDisk {
  private root: HTMLElement;
  private disk: HTMLElement;
  private mask: HTMLElement;
  private polemask: HTMLElement;
  private northLabel: HTMLElement;
  private eastLabel: HTMLElement;
  private southLabel: HTMLElement;
  private westLabel: HTMLElement;
  private needle: HTMLElement; // 指针元素
  private currentYaw: number = 0;
  private currentPitch: number = 0;
  private northYaw: number = 0; // 世界北方向（度），相对于全景图纹理的正前方
  private isVisible: boolean = false;
  private unsubscribeInteracting: (() => void) | null = null;
  private unsubscribeIdle: (() => void) | null = null;
  private unsubscribeUIEngaged: (() => void) | null = null;
  private baseOpacity: number = 0; // 基础透明度（由 pitch 控制）

  constructor(options: CompassDiskOptions = {}) {
    this.root = document.createElement('div');
    this.root.className = 'vr-compass';
    this.root.setAttribute('data-ui', 'CompassDisk');
    // 临时 outline 用于调试
    this.root.style.outline = '2px solid #ff00ff';

    // 圆盘容器
    this.disk = document.createElement('div');
    this.disk.className = 'vr-compass__disk';
    this.disk.setAttribute('data-ui', 'CompassDisk-disk');

    // 中心遮罩（摄影杆遮挡）
    this.mask = document.createElement('div');
    this.mask.className = 'vr-compass__mask';

    // 杆形胶囊遮罩（pole mask）
    this.polemask = document.createElement('div');
    this.polemask.className = 'vr-compass__polemask';
    this.polemask.setAttribute('aria-hidden', 'true');

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

    // 指针元素（指示当前朝向）
    this.needle = document.createElement('div');
    this.needle.className = 'vr-compass__needle';
    this.needle.setAttribute('data-ui', 'CompassDisk-needle');

    // 组装（从下到上：mask -> polemask -> labels -> needle）
    this.disk.appendChild(this.mask);
    this.disk.appendChild(this.polemask);
    this.disk.appendChild(this.northLabel);
    this.disk.appendChild(this.eastLabel);
    this.disk.appendChild(this.southLabel);
    this.disk.appendChild(this.westLabel);
    this.disk.appendChild(this.needle);
    this.root.appendChild(this.disk);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
    this.root.style.setProperty('--vr-ground-base-blur', '0px');
    // 初始化指针旋转 CSS 变量
    this.root.style.setProperty('--compass-needle-rot', '0deg');

    this.setupInteractionListeners();
  }

  private setupInteractionListeners(): void {
    // 监听交互事件
    this.unsubscribeInteracting = interactionBus.on('user-interacting', () => {
      this.root.classList.add('vr-ui-interacting');
      // filter 现在由 CSS 控制，不需要 JS 处理
    });
    this.unsubscribeIdle = interactionBus.on('user-idle', () => {
      this.root.classList.remove('vr-ui-interacting');
      // filter 现在由 CSS 控制，不需要 JS 处理
    });
    this.unsubscribeUIEngaged = interactionBus.on('ui-engaged', () => {
      this.root.classList.remove('vr-ui-interacting');
      // filter 现在由 CSS 控制，不需要 JS 处理
    });
  }

  /**
   * 挂载到父容器
   */
  mount(parent: HTMLElement): void {
    parent.appendChild(this.root);
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

      // 保存基础透明度（由 pitch 控制）
      this.baseOpacity = transform.opacity;

      // 设置 clarity CSS 变量（用于降噪/清晰度策略）
      this.root.style.setProperty('--vr-ground-clarity', String(transform.clarity));

      // 应用透明度
      this.root.style.opacity = transform.opacity.toString();

      // 应用贴地变换：translateX(-50%) + translateY + scaleY
      // transform-origin 已在 CSS 中设为底部中心 (50% 100%)
      // 注意：transform 会被 CSS 类叠加 scale(0.98)，所以这里只设置基础变换
      const baseTransform = `translateX(-50%) translateY(${transform.translateY}px) scaleY(${transform.scaleY})`;
      // 如果正在交互，需要叠加 scale(0.98)
      if (this.root.classList.contains('vr-ui-interacting')) {
        // CSS 会处理 scale，这里只设置基础变换
        this.root.style.transform = baseTransform;
      } else {
        this.root.style.transform = baseTransform;
      }
      
      // 设置基础 blur CSS 变量（用于与 clarity 合并）
      this.root.style.setProperty('--vr-ground-base-blur', `${transform.blur}px`);
      
      // 注意：filter 现在由 CSS 控制（结合 clarity），JS 不再直接设置 filter
      // interacting 时的 opacity 由 CSS 的 .vr-ui-interacting 类控制
      
      // 指针旋转逻辑：盘面固定（N/E/S/W 永远不动），只有指针旋转指示当前朝向
      // yaw 定义：0° 为正前方（+Z），逆时针为正
      // cameraYawDeg: 相机当前朝向（度）
      // northYawDeg: 世界北方向（度），相对于全景图纹理的正前方
      // needleDeg: 指针应该旋转的角度，使指针指向当前朝向（相对于世界北）
      // 公式：needleDeg = cameraYawDeg - northYawDeg
      // 当 cameraYaw = northYaw 时，needle = 0（指针朝北/朝上）
      // 当 cameraYaw 增加（向右转），needle 也增加（指针向右转）
      const cameraYawDeg = yawDeg;
      const northYawDeg = this.northYaw ?? 0;
      const needleDeg = cameraYawDeg - northYawDeg;
      
      // 只设置指针旋转，盘面和标签永远不旋转（由 CSS 控制）
      this.root.style.setProperty('--compass-needle-rot', `${needleDeg}deg`);

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
        this.baseOpacity = 0;
      }
    }
  }

  /**
   * 清理资源
   */
  dispose(): void {
    // 清理事件监听
    if (this.unsubscribeInteracting) {
      this.unsubscribeInteracting();
      this.unsubscribeInteracting = null;
    }
    if (this.unsubscribeIdle) {
      this.unsubscribeIdle();
      this.unsubscribeIdle = null;
    }
    if (this.unsubscribeUIEngaged) {
      this.unsubscribeUIEngaged();
      this.unsubscribeUIEngaged = null;
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

/**
 * 工厂函数：创建指南针圆盘
 */
export function createCompassDisk(options?: CompassDiskOptions): CompassDisk {
  return new CompassDisk(options);
}




