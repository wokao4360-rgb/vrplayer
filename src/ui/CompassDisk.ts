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
  private currentYaw: number = 0;
  private currentPitch: number = 0;
  private isVisible: boolean = false;
  private unsubscribeInteracting: (() => void) | null = null;
  private unsubscribeIdle: (() => void) | null = null;
  private unsubscribeUIEngaged: (() => void) | null = null;
  private baseOpacity: number = 0; // 基础透明度（由 pitch 控制）

  constructor(options: CompassDiskOptions = {}) {
    this.root = document.createElement('div');
    this.root.className = 'vr-compass';

    // 圆盘容器
    this.disk = document.createElement('div');
    this.disk.className = 'vr-compass__disk';

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

    // 组装（从下到上：mask -> polemask -> labels）
    this.disk.appendChild(this.mask);
    this.disk.appendChild(this.polemask);
    this.disk.appendChild(this.northLabel);
    this.disk.appendChild(this.eastLabel);
    this.disk.appendChild(this.southLabel);
    this.disk.appendChild(this.westLabel);
    this.root.appendChild(this.disk);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
    this.root.style.setProperty('--vr-ground-base-blur', '0px');
    // 初始化罗盘旋转 CSS 变量
    this.root.style.setProperty('--compass-disk-rot', '0deg');
    this.root.style.setProperty('--compass-label-rot', '0deg');

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
      
      // 旋转圆盘内容（反向旋转以保持方向正确）
      // 相机往右转（yaw 增加），罗盘盘面应反向旋转，使 N 始终指向世界北
      // yaw 定义：0° 为正前方（+Z），逆时针为正
      // 正确做法：盘面旋转 -yawDeg，这样相机右转时盘面左转，N 保持指向世界北
      const rotationDeg = -yawDeg;
      
      // 使用 CSS 变量控制盘面和标签的旋转
      // 盘面旋转：反向旋转以抵消相机旋转
      // 标签旋转：再反向旋转回来，保持字母正向可读
      this.root.style.setProperty('--compass-disk-rot', `${rotationDeg}deg`);
      this.root.style.setProperty('--compass-label-rot', `${-rotationDeg}deg`);

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




