import * as THREE from 'three';
import type { SceneHotspot } from '../types/config';
import type { PanoViewer } from '../viewer/PanoViewer';
import { createHotspotSkin } from './hotspots/HotspotSkins.ts';
import { openVrModal } from './modals/ModalHost';
import { showToast } from './toast';

type HotspotsOptions = {
  onEnterScene?: (sceneId: string) => void;
  resolveSceneName?: (sceneId: string) => string | undefined;
};

type HotspotBaseData = {
  id: string;
  type: string;
  yaw: number;
  pitch: number;
  tooltip?: string;
};

abstract class BaseDomHotspot<T extends HotspotBaseData> {
  protected data: T;
  protected el: HTMLDivElement;
  protected contentEl: HTMLElement;
  protected tooltipEl: HTMLDivElement;
  protected worldPos: THREE.Vector3;
  protected radius = 500; // 与 PanoViewer 的 SphereGeometry 半径一致
  private tooltipTimer: number | null = null;

  constructor(data: T) {
    this.data = data;
    this.el = document.createElement('div');
    const skin = createHotspotSkin({ id: data.id, type: data.type, tooltip: data.tooltip });
    this.el.className = skin.rootClassName;
    this.el.setAttribute('data-hotspot-id', data.id);
    this.el.setAttribute('data-hotspot-type', data.type);
    this.el.style.pointerEvents = 'auto';

    this.contentEl = skin.contentEl;
    this.tooltipEl = skin.tooltipEl;

    this.el.appendChild(this.contentEl);
    this.el.appendChild(this.tooltipEl);

    // hover tooltip：仅在“支持 hover 的设备”启用
    const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches ?? false;
    if (canHover) {
      this.el.addEventListener('mouseenter', () => this.showTooltip());
      this.el.addEventListener('mouseleave', () => this.hideTooltip());
    }

    // press 动效：pointerdown/up
    this.el.addEventListener('pointerdown', (e) => {
      // 避免拖拽 viewer 的 pointerdown 时误触：热点自身区域才会触发
      e.stopPropagation();
      this.el.classList.add('is-pressed');
    });
    const clearPress = () => this.el.classList.remove('is-pressed');
    this.el.addEventListener('pointerup', clearPress);
    this.el.addEventListener('pointercancel', clearPress);
    this.el.addEventListener('pointerleave', clearPress);

    this.worldPos = new THREE.Vector3();
    this.updateWorldPosition();
  }

  getElement(): HTMLElement {
    return this.el;
  }

  getData(): T {
    return this.data;
  }

  updateWorldPosition(): void {
    const yawRad = THREE.MathUtils.degToRad(this.data.yaw);
    const pitchRad = THREE.MathUtils.degToRad(this.data.pitch);

    const x = Math.cos(pitchRad) * Math.sin(yawRad);
    const y = Math.sin(pitchRad);
    const z = Math.cos(pitchRad) * Math.cos(yawRad);

    this.worldPos.set(x, y, z).multiplyScalar(this.radius);
  }

  /**
   * 每帧调用：根据 camera matrix 更新屏幕位置；超出视野自动隐藏
   */
  updateScreenPosition(camera: THREE.PerspectiveCamera, viewport: { width: number; height: number }): void {
    // 视野/背面裁剪：在相机后方的点直接隐藏
    const camPos = camera.getWorldPosition(_tmpCamPos);
    const camDir = camera.getWorldDirection(_tmpCamDir);
    const toPoint = _tmpToPoint.copy(this.worldPos).sub(camPos);
    if (toPoint.dot(camDir) <= 0) {
      this.el.style.opacity = '0';
      return;
    }

    const ndc = _tmpNdc.copy(this.worldPos).project(camera);
    const inFrustum = ndc.x >= -1 && ndc.x <= 1 && ndc.y >= -1 && ndc.y <= 1 && ndc.z >= -1 && ndc.z <= 1;
    if (!inFrustum) {
      this.el.style.opacity = '0';
      return;
    }

    const x = (ndc.x + 1) * 0.5 * viewport.width;
    const y = (1 - (ndc.y + 1) * 0.5) * viewport.height;

    this.el.style.opacity = '1';
    // 给 CSS hover/press 动效提供稳定基准（避免覆盖 transform）
    this.el.style.setProperty('--hs-x', `${x}px`);
    this.el.style.setProperty('--hs-y', `${y}px`);
    // 不使用固定 left/top 百分比；每帧用 transform 写入像素位置
    this.el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }

  showTooltip(ms?: number): void {
    if (!this.data.tooltip) return;
    this.tooltipEl.classList.add('show');
    if (this.tooltipTimer) {
      window.clearTimeout(this.tooltipTimer);
      this.tooltipTimer = null;
    }
    if (ms && ms > 0) {
      this.tooltipTimer = window.setTimeout(() => this.hideTooltip(), ms);
    }
  }

  hideTooltip(): void {
    this.tooltipEl.classList.remove('show');
    if (this.tooltipTimer) {
      window.clearTimeout(this.tooltipTimer);
      this.tooltipTimer = null;
    }
  }

  abstract onClick(): void;
}

const _tmpCamPos = new THREE.Vector3();
const _tmpCamDir = new THREE.Vector3();
const _tmpToPoint = new THREE.Vector3();
const _tmpNdc = new THREE.Vector3();

export class SceneLinkHotspot extends BaseDomHotspot<
  HotspotBaseData & { type: 'scene'; targetSceneId?: string }
> {
  onClick(): void {
    console.log('[hotspot] scene click', { id: this.data.id, targetSceneId: this.data.targetSceneId });
  }
}

export class ImageHotspot extends BaseDomHotspot<
  HotspotBaseData & { type: 'image'; imageUrl?: string; title?: string }
> {
  onClick(): void {
    if (!this.data.imageUrl) {
      console.warn('[hotspot] image click but no src configured', this.data);
      showToast('未配置内容', 1500);
      return;
    }
    openVrModal({
      type: 'image',
      payload: {
        src: this.data.imageUrl,
        title: this.data.title || this.data.tooltip,
      },
    });
  }
}

export class InfoHotspot extends BaseDomHotspot<
  HotspotBaseData & { type: 'info'; text?: string; title?: string }
> {
  onClick(): void {
    const hasContent = !!(this.data.text || this.data.title || this.data.tooltip);
    if (!hasContent) {
      console.warn('[hotspot] info click but no text/title configured', this.data);
      showToast('未配置内容', 1500);
      return;
    }
    openVrModal({
      type: 'info',
      payload: {
        title: this.data.title || this.data.tooltip,
        text: this.data.text,
      },
    });
  }
}

export class VideoHotspot extends BaseDomHotspot<
  HotspotBaseData & { type: 'video'; url?: string; poster?: string; title?: string }
> {
  onClick(): void {
    if (!this.data.url) {
      console.warn('[hotspot] video click but no src/url configured', this.data);
      showToast('未配置内容', 1500);
      return;
    }
    openVrModal({
      type: 'video',
      payload: {
        src: this.data.url,
        poster: this.data.poster,
        title: this.data.title || this.data.tooltip,
      },
    });
  }
}

export class Hotspots {
  private element: HTMLDivElement;
  private viewer: PanoViewer;
  private disposeFrameListener: (() => void) | null = null;
  private hotspotInstances: BaseDomHotspot<any>[] = [];
  private options: HotspotsOptions;

  constructor(viewer: PanoViewer, hotspots: SceneHotspot[], options: HotspotsOptions = {}) {
    this.viewer = viewer;
    this.options = options;
    this.element = document.createElement('div');
    this.element.className = 'hotspots-container';
    this.element.style.pointerEvents = 'none';
    this.updateHotspots(hotspots);

    this.disposeFrameListener = this.viewer.onFrame(() => {
      const camera = this.viewer.getCamera();
      const viewport = this.viewer.getViewportSize();
      for (const hs of this.hotspotInstances) {
        hs.updateScreenPosition(camera, viewport);
      }
    });
  }

  updateHotspots(hotspots: SceneHotspot[]): void {
    this.hotspotInstances = [];
    this.element.innerHTML = '';

    const isTouchLike = window.matchMedia?.('(hover: none) and (pointer: coarse)')?.matches ?? false;

    const renderHotspot = (h: any): BaseDomHotspot<any> | null => {
      if (h.type === 'scene') {
        const sceneId = h.target?.sceneId;
        const sceneName = sceneId ? this.options.resolveSceneName?.(sceneId) : undefined;
        const tooltip = `进入：${sceneName || h.label || sceneId || '未知场景'}`;
        return new SceneLinkHotspot({
          id: h.id,
          type: 'scene',
          yaw: h.yaw,
          pitch: h.pitch,
          tooltip,
          targetSceneId: sceneId,
        });
      }
      if (h.type === 'video') {
        // 兼容：优先使用 target.url，其次使用顶层 src
        const videoUrl: string | undefined = h.target?.url || h.src;
        const poster: string | undefined = h.target?.poster || h.poster;
        const title: string | undefined = h.title || h.label;
        return new VideoHotspot({
          id: h.id,
          type: 'video',
          yaw: h.yaw,
          pitch: h.pitch,
          tooltip: title,
          url: videoUrl,
          poster,
          title,
        });
      }
      if (h.type === 'image') {
        // 兼容：优先使用 target.imageUrl，其次使用 target.url，最后使用顶层 src
        const imageUrl: string | undefined = h.target?.imageUrl || h.target?.url || h.src;
        const title: string | undefined = h.title || h.label;
        return new ImageHotspot({
          id: h.id,
          type: 'image',
          yaw: h.yaw,
          pitch: h.pitch,
          tooltip: title,
          imageUrl,
          title,
        });
      }
      if (h.type === 'info') {
        const title: string | undefined = h.title || h.label;
        const text: string | undefined = h.target?.text || h.text;
        return new InfoHotspot({
          id: h.id,
          type: 'info',
          yaw: h.yaw,
          pitch: h.pitch,
          tooltip: title,
          text,
          title,
        });
      }
      return null;
    };

    for (const hs of hotspots as any[]) {
      const instance = renderHotspot(hs);
      if (!instance) continue;

      instance.getElement().addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = instance.getData();
        const isScene = data.type === 'scene';

        // 移动端：单击显示 tooltip 1.2s（SceneLink 也显示，但不阻塞进入）
        if (isTouchLike) instance.showTooltip(1200);

        if (isScene) {
          const targetSceneId = (data as any).targetSceneId as string | undefined;
          if (targetSceneId && this.options.onEnterScene) {
            showToast(`进入 ${this.options.resolveSceneName?.(targetSceneId) || targetSceneId}`, 1000);
            this.options.onEnterScene(targetSceneId);
            return;
          }
        }

        instance.onClick();
      });

      this.hotspotInstances.push(instance);
      this.element.appendChild(instance.getElement());
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    if (this.disposeFrameListener) {
      this.disposeFrameListener();
      this.disposeFrameListener = null;
    }
    this.element.remove();
  }
}

