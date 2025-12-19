/**
 * 地面导航点组件
 * 当用户视角向下（pitch 足够低）时显示，在固定半径圆环上显示场景导航点
 * 与 CompassDisk 同步显示逻辑和贴地变换
 */

import { onSceneFocus, SceneFocusEvent } from './sceneLinkBus';
import { navigateToScene } from '../utils/router';
import { emitSceneFocus } from './sceneLinkBus';
import { computeGroundOverlayTransform, shouldShowGroundOverlay } from './groundOverlayTransform';

const RING_RADIUS = 60; // 圆环半径（px）

type SceneHotspot = {
  id: string;
  label: string;
  yaw: number;
  pitch: number;
  target: {
    museumId: string;
    sceneId: string;
  };
};

type GroundNavDotsOptions = {
  museumId: string;
  currentSceneId: string;
  sceneHotspots: SceneHotspot[];
  onNavigateToScene?: (museumId: string, sceneId: string) => void;
};

export class GroundNavDots {
  private root: HTMLElement;
  private container: HTMLElement;
  private dots: Map<string, HTMLElement> = new Map();
  private currentYaw: number = 0;
  private currentPitch: number = 0;
  private isVisible: boolean = false;
  private museumId: string;
  private currentSceneId: string;
  private sceneHotspots: SceneHotspot[];
  private hoverSceneId: string | null = null;
  private onNavigateToScene: (museumId: string, sceneId: string) => void;
  private unsubscribeFocus?: () => void;

  constructor(options: GroundNavDotsOptions) {
    this.museumId = options.museumId;
    this.currentSceneId = options.currentSceneId;
    this.sceneHotspots = options.sceneHotspots;
    this.onNavigateToScene = options.onNavigateToScene || navigateToScene;

    // 创建根容器
    this.root = document.createElement('div');
    this.root.className = 'vr-groundnav';

    // 创建圆点容器
    this.container = document.createElement('div');
    this.container.className = 'vr-groundnav__container';
    this.root.appendChild(this.container);

    // 初始隐藏
    this.root.style.opacity = '0';
    this.root.style.transform = 'translateX(-50%) translateY(0px) scaleY(1)';
    this.root.style.filter = 'blur(0px)';

    // 监听场景聚焦事件
    this.unsubscribeFocus = onSceneFocus((event: SceneFocusEvent) => {
      this.handleSceneFocus(event);
    });

    // 渲染圆点
    this.renderDots();
  }


  /**
   * 处理场景聚焦事件（hover/focus）
   */
  private handleSceneFocus(event: SceneFocusEvent): void {
    if (event.type === 'hover') {
      this.hoverSceneId = event.sceneId;
    } else if (event.type === 'focus') {
      this.currentSceneId = event.sceneId;
      this.hoverSceneId = null; // focus 时清除 hover
    }
    this.updateDotStates();
  }

  /**
   * 更新圆点状态（current/hover）
   */
  private updateDotStates(): void {
    this.dots.forEach((dot, sceneId) => {
      dot.classList.remove('is-current', 'is-hover');
      
      if (sceneId === this.currentSceneId) {
        dot.classList.add('is-current');
      } else if (sceneId === this.hoverSceneId) {
        dot.classList.add('is-hover');
      }
    });
  }

  /**
   * 渲染所有圆点
   */
  private renderDots(): void {
    // 清空现有圆点
    this.container.innerHTML = '';
    this.dots.clear();

    // 只渲染 type=scene 且 target.sceneId 存在的热点
    const sceneHotspots = this.sceneHotspots.filter(
      (hotspot) => hotspot.target?.sceneId
    );

    sceneHotspots.forEach((hotspot) => {
      const dot = document.createElement('div');
      dot.className = 'vr-groundnav__dot';
      dot.setAttribute('data-scene-id', hotspot.target.sceneId);
      dot.setAttribute('title', hotspot.label);

      // 点击事件
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // 派发 focus 事件（确保其他端同步）
        emitSceneFocus({
          type: 'focus',
          museumId: hotspot.target.museumId,
          sceneId: hotspot.target.sceneId,
          source: 'pano',
          ts: Date.now(),
        });

        // 关闭可能打开的面板（通过派发事件）
        window.dispatchEvent(new CustomEvent('vr:close-panels'));

        // 导航到场景
        this.onNavigateToScene(hotspot.target.museumId, hotspot.target.sceneId);
      });

      // hover 事件
      dot.addEventListener('mouseenter', () => {
        emitSceneFocus({
          type: 'hover',
          museumId: hotspot.target.museumId,
          sceneId: hotspot.target.sceneId,
          source: 'pano',
          ts: Date.now(),
        });
      });

      dot.addEventListener('mouseleave', () => {
        emitSceneFocus({
          type: 'hover',
          museumId: hotspot.target.museumId,
          sceneId: null,
          source: 'pano',
          ts: Date.now(),
        });
      });

      this.container.appendChild(dot);
      this.dots.set(hotspot.target.sceneId, dot);
    });

    // 更新初始状态
    this.updateDotStates();
    // 更新位置
    this.updateDotPositions();
  }

  /**
   * 更新圆点位置（根据 yaw）
   */
  private updateDotPositions(): void {
    // 只渲染 type=scene 且 target.sceneId 存在的热点
    const sceneHotspots = this.sceneHotspots.filter(
      (hotspot) => hotspot.target?.sceneId
    );

    sceneHotspots.forEach((hotspot) => {
      const dot = this.dots.get(hotspot.target.sceneId);
      if (!dot) return;

      // 计算角度：hotspot.yaw 转弧度
      // yaw 定义：0° 为正前方（+Z），逆时针为正
      // 在屏幕坐标系中：y 向下，x 向右
      // 为了与 CompassDisk 一致（0° 在屏幕上方），需要调整：
      // - yaw=0 应该对应屏幕上方 (0, -R)
      // - yaw=90 应该对应屏幕右侧 (R, 0)
      // - yaw=-90 应该对应屏幕左侧 (-R, 0)
      // 使用：x = sin(yaw), y = -cos(yaw)
      const angleRad = (hotspot.yaw * Math.PI) / 180;
      const x = Math.sin(angleRad) * RING_RADIUS;
      const y = -Math.cos(angleRad) * RING_RADIUS;

      dot.style.transform = `translate(${x}px, ${y}px)`;
    });
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

    // 更新圆点位置（yaw 变化时）
    this.updateDotPositions();
  }

  /**
   * 更新场景数据
   */
  updateScene(museumId: string, currentSceneId: string, sceneHotspots: SceneHotspot[]): void {
    this.museumId = museumId;
    this.currentSceneId = currentSceneId;
    this.sceneHotspots = sceneHotspots;
    this.hoverSceneId = null;
    this.renderDots();
  }

  /**
   * 挂载到父容器
   */
  mount(parent: HTMLElement): void {
    parent.appendChild(this.root);
  }

  /**
   * 清理资源
   */
  dispose(): void {
    if (this.unsubscribeFocus) {
      this.unsubscribeFocus();
      this.unsubscribeFocus = undefined;
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
 * 工厂函数：创建地面导航点
 */
export function createGroundNavDots(options: GroundNavDotsOptions): GroundNavDots {
  return new GroundNavDots(options);
}
