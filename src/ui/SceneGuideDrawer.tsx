import type { Scene } from '../types/config';
import { navigateToScene } from '../utils/router';
import { AssetType, resolveAssetUrl } from '../utils/assetResolver';
import { DEFAULT_COVER_DATA_URI } from './placeholders';
import { toProxiedImageUrl } from '../utils/externalImage';
import { getIcon } from './icons';
import type { SceneEnterMeta } from '../app/sceneTransitionTypes';

type SceneGuideDrawerOptions = {
  museumId: string;
  currentSceneId: string;
  scenes: Scene[];
  onClose?: () => void;
  onEnterScene?: (
    sceneId: string,
    view?: {
      yaw?: number;
      pitch?: number;
      fov?: number;
    },
    meta?: SceneEnterMeta,
  ) => void;
};

type RouteSample = {
  id: string;
  title: string;
  summary: string;
  sceneIds: string[];
};

const ROUTE_SAMPLES: Record<string, RouteSample[]> = {
  wangding: [
    {
      id: 'family',
      title: '\u5bb6\u98ce\u7814\u5b66\u7ebf',
      summary:
        '\u5148\u770b\u5bb6\u98ce\u5bb6\u8baf\uff0c\u518d\u770b\u6e05\u5ec9\u7acb\u8eab\u4e0e\u6587\u5316\u6210\u5c31\uff0c\u6700\u540e\u5728\u8fde\u5c4b\u6536\u675f\u6210\u4e00\u53e5\u201c\u5982\u4f55\u7acb\u8eab\u201d\u3002',
      sceneIds: ['family_instruction', 'culture_achievement', 'lianwu'],
    },
    {
      id: 'spirit',
      title: '\u7cbe\u795e\u7814\u5b66\u7ebf',
      summary:
        '\u56f4\u7ed5\u62c5\u5f53\u3001\u6c14\u8282\u4e0e\u65f6\u4ee3\u4ef7\u503c\u5c55\u5f00\uff0c\u5feb\u901f\u6293\u4f4f\u4eba\u7269\u7cbe\u795e\u4e3b\u7ebf\u3002',
      sceneIds: ['south_gate', 'political_chapter', 'prominent_achievement'],
    },
    {
      id: 'study',
      title: '\u901f\u89c8\u7814\u5b66\u7ebf',
      summary:
        '\u5728\u6700\u77ed\u65f6\u95f4\u5185\u4e32\u8d77\u5357\u95e8\u4e0e\u6838\u5fc3\u5c55\u533a\uff0c\u9002\u5408\u5165\u9986\u9884\u4e60\u548c\u5feb\u901f\u5bfc\u89c8\u3002',
      sceneIds: ['south_gate', 'point_1', 'study_room'],
    },
  ],
  yanghucheng: [
    {
      id: 'spirit',
      title: '\u62c5\u5f53\u7814\u5b66\u7ebf',
      summary:
        '\u805a\u7126\u5bb6\u56fd\u62c5\u5f53\u4e0e\u5173\u952e\u62e9\u62fc\uff0c\u5f62\u6210\u4e00\u6761\u7ea2\u8272\u4e3b\u9898\u5bfc\u89c8\u7ebf\u3002',
      sceneIds: ['entrance', 'west_room_1', 'east_room_1'],
    },
    {
      id: 'war',
      title: '\u6297\u6218\u7814\u5b66\u7ebf',
      summary:
        '\u56f4\u7ed5\u897f\u5b89\u4e8b\u53d8\u4e0e\u6297\u6218\u80cc\u666f\u5c55\u5f00\uff0c\u628a\u5386\u53f2\u4e8b\u4ef6\u4e3b\u7ebf\u4e32\u8d77\u6765\u3002',
      sceneIds: ['entrance', 'east_room_1', 'east_room_2'],
    },
    {
      id: 'study',
      title: '\u901f\u89c8\u7814\u5b66\u7ebf',
      summary:
        '\u7528\u6700\u5c11\u65f6\u95f4\u4e32\u8d77\u7eaa\u5ff5\u9986\u5173\u952e\u70b9\u4f4d\uff0c\u9002\u5408\u7b2c\u4e00\u6b21\u8fdb\u5165\u9986\u5185\u65f6\u9884\u4e60\u3002',
      sceneIds: ['entrance', 'west_room_1', 'east_room_1'],
    },
  ],
  linzexu: [
    {
      id: 'spirit',
      title: '\u6c14\u8282\u7814\u5b66\u7ebf',
      summary:
        '\u4ece\u7981\u70df\u884c\u52a8\u4e0e\u6c11\u65cf\u610f\u8bc6\u5207\u5165\uff0c\u6293\u4f4f\u6797\u5219\u5f90\u7684\u6c14\u8282\u4e0e\u8d23\u4efb\u3002',
      sceneIds: ['south_gate', 'cross_mid', 'north_house_west'],
    },
    {
      id: 'patriot',
      title: '\u5bb6\u56fd\u7814\u5b66\u7ebf',
      summary:
        '\u56f4\u7ed5\u5371\u673a\u610f\u8bc6\u4e0e\u4e2a\u4eba\u62c5\u5f53\u5c55\u5f00\uff0c\u9002\u5408\u7231\u56fd\u4e3b\u4e49\u6559\u80b2\u573a\u666f\u3002',
      sceneIds: ['south_gate', 'lianwu_1', 'north_house_east'],
    },
    {
      id: 'study',
      title: '\u901f\u89c8\u7814\u5b66\u7ebf',
      summary:
        '\u4e32\u8054\u5357\u95e8\u3001\u8fde\u5c4b\u4e0e\u6838\u5fc3\u5c55\u70b9\uff0c\u9002\u5408\u77ed\u65f6\u6570\u5b57\u5bfc\u89c8\u4e0e\u9884\u4e60\u3002',
      sceneIds: ['south_gate', 'cross_mid', 'north_house_west'],
    },
  ],
};

export class SceneGuideDrawer {
  private element: HTMLElement;
  private isOpen = false;
  private museumId: string;
  private currentSceneId: string;
  private scenes: Scene[];
  private filteredScenes: Scene[];
  private listEl: HTMLElement | null = null;
  private previewImgEl: HTMLImageElement | null = null;
  private previewTitleEl: HTMLElement | null = null;
  private previewIdEl: HTMLElement | null = null;
  private previewRouteEl: HTMLElement | null = null;
  private previewOrderEl: HTMLElement | null = null;
  private previewHintEl: HTMLElement | null = null;
  private routeTitleEl: HTMLElement | null = null;
  private routeFlowEl: HTMLElement | null = null;
  private routeStateEl: HTMLElement | null = null;
  private routeChipWrapEl: HTMLElement | null = null;
  private routeSummaryEl: HTMLElement | null = null;
  private searchInputEl: HTMLInputElement | null = null;
  private hoveredSceneId: string | null = null;
  private selectedSceneId: string | null = null;
  private selectedRouteId: string | null = null;
  private searchQuery = '';
  private onClose?: () => void;
  private onEnterScene?: SceneGuideDrawerOptions['onEnterScene'];

  constructor(options: SceneGuideDrawerOptions) {
    this.museumId = options.museumId;
    this.currentSceneId = options.currentSceneId;
    this.scenes = options.scenes;
    this.filteredScenes = options.scenes;
    this.onClose = options.onClose;
    this.onEnterScene = options.onEnterScene;

    this.injectStyles();

    this.element = document.createElement('div');
    this.element.className = 'vr-guide-drawer';
    this.element.setAttribute('aria-label', '场景导览抽屉');

    const mask = document.createElement('div');
    mask.className = 'vr-guide-mask';

    const panel = document.createElement('div');
    panel.className = 'vr-guide-panel';

    const header = document.createElement('div');
    header.className = 'vr-guide-header';

    const leftBtn = document.createElement('div');
    leftBtn.className = 'vr-guide-header-left';

    const title = document.createElement('div');
    title.className = 'vr-guide-title';
    title.textContent = '场景导览';

    const headerSummary = document.createElement('div');
    headerSummary.className = 'vr-guide-subtitle';
    headerSummary.textContent = '把搜索、路线、预览和进入收成一条线，先看清楚，再决定下一步。';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-guide-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', '\u5173\u95ed');
    closeBtn.textContent = '\u00d7';
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.close();
    });

    header.appendChild(leftBtn);
    header.appendChild(title);
    header.appendChild(headerSummary);

    const innovationStrip = document.createElement('div');
    innovationStrip.className = 'vr-guide-innovation-strip';
    const innovationDefs = [
      {
        label: '搜索点位',
        detail: '在整馆里快速定位目标场景。',
      },
      {
        label: '任务路线',
        detail: '把点位串成可以直接执行的导览线。',
      },
      {
        label: '重点预览',
        detail: '先看图和摘要，再决定是否进入。',
      },
      {
        label: '一键进入',
        detail: '确认后直接跳转到当前场景。',
      },
    ];
    innovationDefs.forEach((item) => {
      const chip = document.createElement('div');
      chip.className = 'vr-guide-innovation-chip';
      const chipLabel = document.createElement('strong');
      chipLabel.textContent = item.label;
      const chipDetail = document.createElement('span');
      chipDetail.textContent = item.detail;
      chip.appendChild(chipLabel);
      chip.appendChild(chipDetail);
      innovationStrip.appendChild(chip);
    });
    header.appendChild(innovationStrip);
    header.appendChild(closeBtn);

    const searchWrap = document.createElement('div');
    searchWrap.className = 'vr-guide-search';
    const searchIcon = document.createElement('span');
    searchIcon.className = 'vr-guide-search-icon';
    searchIcon.innerHTML = getIcon('search');
    const searchInput = document.createElement('input');
    searchInput.className = 'vr-guide-search-input';
    searchInput.type = 'search';
    searchInput.id = 'vr-guide-search-input';
    searchInput.name = 'scene-search';
    searchInput.setAttribute('aria-label', '搜索点位');
    searchInput.placeholder = '\u67e5\u627e\u70b9\u4f4d';
    searchWrap.appendChild(searchIcon);
    searchWrap.appendChild(searchInput);
    this.searchInputEl = searchInput;

    const body = document.createElement('div');
    body.className = 'vr-guide-body';

    const list = document.createElement('div');
    list.className = 'vr-guide-list';
    this.listEl = list;

    const preview = document.createElement('div');
    preview.className = 'vr-guide-preview';

    const previewImg = document.createElement('img');
    previewImg.className = 'vr-guide-preview-image';
    previewImg.referrerPolicy = 'no-referrer';
    previewImg.crossOrigin = 'anonymous';
    previewImg.decoding = 'async';
    previewImg.loading = 'lazy';
    this.previewImgEl = previewImg;

    const previewTitle = document.createElement('div');
    previewTitle.className = 'vr-guide-preview-title';
    this.previewTitleEl = previewTitle;

    const previewId = document.createElement('div');
    previewId.className = 'vr-guide-preview-id';
    this.previewIdEl = previewId;

    const previewRoute = document.createElement('div');
    previewRoute.className = 'vr-guide-preview-id';
    this.previewRouteEl = previewRoute;

    const previewOrder = document.createElement('div');
    previewOrder.className = 'vr-guide-route-summary';
    this.previewOrderEl = previewOrder;

    const previewHint = document.createElement('div');
    previewHint.className = 'vr-guide-route-summary';
    this.previewHintEl = previewHint;

    const enterBtn = document.createElement('button');
    enterBtn.className = 'vr-guide-preview-enter';
    enterBtn.type = 'button';
    const enterIcon = document.createElement('span');
    enterIcon.className = 'vr-guide-enter-icon';
    enterIcon.innerHTML = getIcon('arrow-right');
    const enterLabel = document.createElement('span');
    enterLabel.textContent = '\u8fdb\u5165\u5f53\u524d\u70b9\u4f4d';
    enterBtn.appendChild(enterIcon);
    enterBtn.appendChild(enterLabel);
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetSceneId = this.selectedSceneId || this.currentSceneId;
      if (targetSceneId && targetSceneId !== this.currentSceneId) {
        if (this.onEnterScene) {
          this.onEnterScene(targetSceneId, undefined, { source: 'guide-drawer' });
        } else {
          navigateToScene(this.museumId, targetSceneId);
        }
        this.close();
      } else if (targetSceneId === this.currentSceneId) {
        this.close();
      }
    });

    preview.appendChild(previewImg);
    preview.appendChild(previewTitle);
    preview.appendChild(previewId);
    preview.appendChild(previewRoute);
    preview.appendChild(previewOrder);
    preview.appendChild(previewHint);
    preview.appendChild(enterBtn);

    const routeCard = document.createElement('div');
    routeCard.className = 'vr-guide-route-card';

    const routeTitle = document.createElement('div');
    routeTitle.className = 'vr-guide-route-title';
    routeTitle.textContent = '\u4efb\u52a1\u5316\u7814\u5b66\u8def\u7ebf';
    this.routeTitleEl = routeTitle;

    const routeFlow = document.createElement('div');
    routeFlow.className = 'vr-guide-route-summary';
    routeFlow.textContent = '1 搜点位 · 2 选路线 · 3 看预览 · 4 进当前点位';
    this.routeFlowEl = routeFlow;

    const routeState = document.createElement('div');
    routeState.className = 'vr-guide-preview-id';
    this.routeStateEl = routeState;

    const routeChipWrap = document.createElement('div');
    routeChipWrap.className = 'vr-guide-route-chips';
    this.routeChipWrapEl = routeChipWrap;

    const routeSummary = document.createElement('div');
    routeSummary.className = 'vr-guide-route-summary';
    this.routeSummaryEl = routeSummary;

    routeCard.appendChild(routeTitle);
    routeCard.appendChild(routeFlow);
    routeCard.appendChild(routeState);
    routeCard.appendChild(routeChipWrap);
    routeCard.appendChild(routeSummary);
    preview.appendChild(routeCard);

    body.appendChild(list);
    body.appendChild(preview);

    mask.addEventListener('click', () => this.close());
    panel.addEventListener('click', (e) => e.stopPropagation());

    panel.appendChild(header);
    panel.appendChild(searchWrap);
    panel.appendChild(body);

    this.element.appendChild(mask);
    this.element.appendChild(panel);

    this.bindSearch();
    this.renderList();
    this.renderRouteSamples();
    this.updatePreview();
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.element.classList.add('open');
    this.updateOverlayState();
    this.selectedSceneId = this.currentSceneId;
    this.selectedRouteId = this.getRouteSamples().find((item) => item.sceneIds.includes(this.currentSceneId))?.id ?? null;
    this.hoveredSceneId = null;
    this.updateActiveState();
    this.renderRouteSamples();
    this.updatePreview();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.element.classList.remove('open');
    this.updateOverlayState();
    this.onClose?.();
  }

  private updateOverlayState(): void {
    const fcChatRoot = document.querySelector<HTMLElement>('.fcchat-root');
    const hasAnyOverlay = !!(
      document.querySelector('.vr-modal-overlay') ||
      (document.querySelector('.vr-guide-drawer.open') && this.isOpen) ||
      (fcChatRoot && fcChatRoot.style.display === 'flex')
    );
    if (hasAnyOverlay) {
      document.documentElement.classList.add('vr-overlay-open');
    } else {
      document.documentElement.classList.remove('vr-overlay-open');
    }
  }

  toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }

  setCurrentScene(sceneId: string): void {
    this.currentSceneId = sceneId;
    this.selectedSceneId = sceneId;
    this.selectedRouteId = this.getRouteSamples().find((item) => item.sceneIds.includes(sceneId))?.id ?? null;
    this.hoveredSceneId = null;
    this.updateActiveState();
    this.renderRouteSamples();
    this.updatePreview();
  }

  private getRouteSamples(): RouteSample[] {
    return ROUTE_SAMPLES[this.museumId] || [];
  }

  private getActiveRoute(): RouteSample | undefined {
    const samples = this.getRouteSamples();
    return (
      (this.selectedRouteId && samples.find((item) => item.id === this.selectedRouteId)) ||
      samples.find((item) => item.sceneIds.includes(this.currentSceneId))
    );
  }

  private getSceneOrderInRoute(route: RouteSample | undefined, sceneId: string): number {
    if (!route) return -1;
    return route.sceneIds.indexOf(sceneId);
  }

  private getBestPreviewSceneId(route?: RouteSample): string | null {
    const candidates = this.filteredScenes.length > 0 ? this.filteredScenes : this.scenes;
    if (this.hoveredSceneId && candidates.some((scene) => scene.id === this.hoveredSceneId)) {
      return this.hoveredSceneId;
    }
    if (this.selectedSceneId && candidates.some((scene) => scene.id === this.selectedSceneId)) {
      return this.selectedSceneId;
    }
    if (route) {
      const currentInRoute = candidates.find((scene) => scene.id === this.currentSceneId);
      if (currentInRoute) {
        return currentInRoute.id;
      }
      const firstRouteScene = candidates.find((scene) => route.sceneIds.includes(scene.id));
      if (firstRouteScene) {
        return firstRouteScene.id;
      }
    }
    return candidates[0]?.id || null;
  }

  private bindSearch(): void {
    if (!this.searchInputEl) return;
    this.searchInputEl.addEventListener('input', () => {
      this.searchQuery = (this.searchInputEl?.value || '').trim().toLowerCase();
      this.filteredScenes = this.applyFilters();
      this.renderList();
      this.renderRouteSamples();
      this.updatePreview();
    });
  }

  private applyFilters(): Scene[] {
    let next = [...this.scenes];
    const samples = this.getRouteSamples();
    const activeRoute = samples.find((item) => item.id === this.selectedRouteId);
    if (activeRoute) {
      const allow = new Set(activeRoute.sceneIds);
      next = next.filter((scene) => allow.has(scene.id));
    }
    const q = this.searchQuery;
    if (q) {
      next = next.filter((scene) => {
        const name = scene.name || '';
        return name.toLowerCase().includes(q) || scene.id.toLowerCase().includes(q);
      });
    }
    return next;
  }

  private renderList(): void {
    if (!this.listEl) return;
    this.listEl.innerHTML = '';

    if (this.filteredScenes.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'vr-guide-empty';
      empty.textContent = '\u5f53\u524d\u8def\u7ebf\u4e0b\u6682\u65f6\u6ca1\u6709\u5339\u914d\u70b9\u4f4d\uff0c\u53ef\u4ee5\u5207\u6362\u8def\u7ebf\u6216\u8c03\u6574\u641c\u7d22\u6761\u4ef6\u3002';
      this.listEl.appendChild(empty);
      return;
    }

    const activeRoute = this.getActiveRoute();
    const selectedSceneId = this.selectedSceneId || this.currentSceneId;

    for (const scene of this.filteredScenes) {
      const item = document.createElement('div');
      item.className = 'vr-guide-item';
      item.setAttribute('data-scene-id', scene.id);
      if (scene.id === this.currentSceneId) {
        item.classList.add('active');
      }
      if (scene.id === selectedSceneId) {
        item.classList.add('selected');
      }

      const img = document.createElement('img');
      img.className = 'vr-guide-thumb';
      img.referrerPolicy = 'no-referrer';
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.loading = 'lazy';
      const thumbUrl = scene.thumb ? resolveAssetUrl(scene.thumb, AssetType.THUMB) : '';
      const thumbSrc = thumbUrl ? toProxiedImageUrl(thumbUrl) : DEFAULT_COVER_DATA_URI;
      img.src = thumbSrc;
      img.alt = scene.name || scene.id;

      const meta = document.createElement('div');
      meta.className = 'vr-guide-meta';

      const nameEl = document.createElement('div');
      nameEl.className = 'vr-guide-name';
      nameEl.textContent = scene.name || scene.id;

      const idEl = document.createElement('div');
      idEl.className = 'vr-guide-id';
      idEl.textContent = scene.id;

      meta.appendChild(nameEl);
      meta.appendChild(idEl);

      if (activeRoute) {
        const order = this.getSceneOrderInRoute(activeRoute, scene.id);
        const relationEl = document.createElement('div');
        relationEl.className = 'vr-guide-id';
        if (scene.id === this.currentSceneId) {
          relationEl.textContent =
            order >= 0
              ? '\u5f53\u524d\u70b9\u4f4d \u00b7 \u8def\u7ebf\u7b2c ' + (order + 1) + ' \u7ad9'
              : '\u5f53\u524d\u70b9\u4f4d \u00b7 \u4e0d\u5728\u672c\u6761\u8def\u7ebf';
        } else {
          relationEl.textContent =
            order >= 0
              ? '\u91cd\u70b9\u70b9\u4f4d \u00b7 \u8def\u7ebf\u7b2c ' + (order + 1) + ' \u7ad9'
              : '\u8def\u7ebf\u5916\u70b9\u4f4d';
        }
        meta.appendChild(relationEl);
      }

      item.appendChild(img);
      item.appendChild(meta);

      item.addEventListener('mouseenter', () => {
        this.hoveredSceneId = scene.id;
        this.updatePreview();
      });

      item.addEventListener('mouseleave', () => {
        this.hoveredSceneId = null;
        this.updatePreview();
      });

      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.selectedSceneId = scene.id;
        this.listEl?.querySelectorAll('.vr-guide-item').forEach((el) => {
          el.classList.remove('selected');
        });
        item.classList.add('selected');
        this.updatePreview();
      });

      this.listEl.appendChild(item);
    }
  }

  private updateActiveState(): void {
    if (!this.listEl) return;
    const selectedSceneId = this.selectedSceneId || this.currentSceneId;
    this.listEl.querySelectorAll<HTMLElement>('.vr-guide-item').forEach((el) => {
      const id = el.getAttribute('data-scene-id');
      const isActive = id === this.currentSceneId;
      el.classList.toggle('active', isActive);
      el.classList.toggle('selected', id === selectedSceneId);
    });
  }

  private updatePreview(): void {
    if (
      !this.previewImgEl ||
      !this.previewTitleEl ||
      !this.previewIdEl ||
      !this.previewRouteEl ||
      !this.previewOrderEl ||
      !this.previewHintEl
    ) {
      return;
    }

    const activeRoute = this.getActiveRoute();
    const targetId = this.getBestPreviewSceneId(activeRoute) || this.currentSceneId;
    const candidates = this.filteredScenes.length > 0 ? this.filteredScenes : this.scenes;
    const scene = candidates.find((s) => s.id === targetId) || candidates[0];
    if (!scene) return;

    const thumbUrl = scene.thumb ? resolveAssetUrl(scene.thumb, AssetType.THUMB) : '';
    const thumbSrc = thumbUrl ? toProxiedImageUrl(thumbUrl) : DEFAULT_COVER_DATA_URI;
    this.previewImgEl.src = thumbSrc;
    this.previewImgEl.alt = scene.name || scene.id;
    this.previewTitleEl.textContent = scene.name || scene.id;
    this.previewIdEl.textContent = scene.id;

    if (activeRoute) {
      const order = this.getSceneOrderInRoute(activeRoute, scene.id);
      this.previewRouteEl.textContent = '\u4efb\u52a1\u8def\u7ebf\uff1a' + activeRoute.title;
      this.previewOrderEl.textContent =
        order >= 0
          ? '\u8fd9\u662f\u672c\u8def\u7ebf\u7b2c ' +
            (order + 1) +
            ' \u4e2a\u91cd\u70b9\u70b9\u4f4d\uff0c\u4e0b\u4e00\u6b65\u53ef\u4ee5\u7ee7\u7eed\u6309\u7ebf\u8def\u5f80\u4e0b\u770b\u3002'
          : '\u5f53\u524d\u9884\u89c8\u4e0d\u5728\u300c' + activeRoute.title + '\u300d\u8fd9\u6761\u4efb\u52a1\u7ebf\u4e2d\uff0c\u5148\u786e\u8ba4\u662f\u5426\u9700\u8981\u5207\u6362\u8def\u7ebf\u3002';
      this.previewHintEl.textContent =
        scene.id === this.currentSceneId
          ? '\u53ef\u4ee5\u76f4\u63a5\u8fdb\u5165\u5f53\u524d\u70b9\u4f4d\uff0c\u6216\u5207\u6362\u8def\u7ebf\u7ee7\u7eed\u770b\u3002'
          : '\u5148\u786e\u8ba4\u5f53\u524d\u70b9\u4f4d\uff0c\u518d\u70b9\u51fb\u8fdb\u5165\u5f53\u524d\u573a\u666f\u3002';
    } else {
      this.previewRouteEl.textContent = '\u81ea\u7531\u6d4f\u89c8';
      this.previewOrderEl.textContent =
        '\u5f53\u524d\u70b9\u4f4d\u6ca1\u6709\u5339\u914d\u7684\u4efb\u52a1\u8def\u7ebf\uff0c\u9002\u5408\u5148\u770b\u5b8c\u9884\u89c8\u518d\u51b3\u5b9a\u8981\u4e0d\u8981\u52a0\u5165\u8def\u7ebf\u3002';
      this.previewHintEl.textContent =
        scene.id === this.currentSceneId
          ? '\u53ef\u4ee5\u76f4\u63a5\u8fdb\u5165\u5f53\u524d\u70b9\u4f4d\uff0c\u6216\u7ee7\u7eed\u641c\u7d22\u522b\u7684\u573a\u666f\u3002'
          : '\u5148\u786e\u8ba4\u5f53\u524d\u70b9\u4f4d\uff0c\u518d\u70b9\u51fb\u8fdb\u5165\u5f53\u524d\u573a\u666f\u3002';
    }
  }

  private renderRouteSamples(): void {
    if (!this.routeTitleEl || !this.routeFlowEl || !this.routeStateEl || !this.routeChipWrapEl || !this.routeSummaryEl) {
      return;
    }

    const samples = this.getRouteSamples();
    this.routeChipWrapEl.innerHTML = '';

    if (samples.length === 0) {
      this.routeStateEl.textContent = '\u5f53\u524d\u9986\u8fd8\u6ca1\u6709\u914d\u7f6e\u4efb\u52a1\u5316\u8def\u7ebf\u3002';
      this.routeSummaryEl.textContent = '\u4f60\u4ecd\u7136\u53ef\u4ee5\u76f4\u63a5\u641c\u7d22\u573a\u666f\uff0c\u81ea\u7531\u6d4f\u89c8\u5168\u90e8\u70b9\u4f4d\u3002';
      return;
    }

    const currentRoute = samples.find((item) => item.sceneIds.includes(this.currentSceneId));
    const active = (this.selectedRouteId && samples.find((item) => item.id === this.selectedRouteId)) || currentRoute || null;

    this.routeTitleEl.textContent = '\u4efb\u52a1\u5316\u7814\u5b66\u8def\u7ebf';
    this.routeFlowEl.textContent = '1 搜点位 · 2 选路线 · 3 看预览 · 4 进当前点位';
    if (active) {
      const activeCount = active.sceneIds.length;
      this.routeStateEl.textContent =
        '\u5f53\u524d\u5df2\u9009\uff1a' + active.title + ' \u00b7 \u5df2\u9501\u5b9a ' + activeCount + ' \u4e2a\u91cd\u70b9\u70b9\u4f4d';
      this.routeSummaryEl.textContent = active.summary;
    } else {
      this.routeStateEl.textContent = '\u5f53\u524d\u70b9\u4f4d\u6682\u65e0\u5339\u914d\u7684\u4efb\u52a1\u8def\u7ebf\u3002';
      this.routeSummaryEl.textContent = '\u53ef\u4ee5\u5148\u81ea\u7531\u6d4f\u89c8\uff0c\u6216\u8005\u4ece\u4e0b\u65b9\u9009\u4e00\u6761\u66f4\u8d34\u8fd1\u5f53\u524d\u70b9\u4f4d\u7684\u8def\u7ebf\u3002';
    }

    samples.forEach((sample) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'vr-guide-route-chip';
      if (sample.id === this.selectedRouteId) {
        chip.classList.add('is-active');
      }
      chip.textContent = sample.title + ' \u00b7 ' + sample.sceneIds.length + ' \u7ad9';
      chip.title = sample.summary;
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.selectedRouteId = sample.id;
        this.filteredScenes = this.applyFilters();
        const nextSceneId =
          this.filteredScenes.find((scene) => scene.id === this.currentSceneId)?.id ||
          this.filteredScenes[0]?.id ||
          this.currentSceneId;
        this.selectedSceneId = nextSceneId;
        this.renderList();
        this.renderRouteSamples();
        this.updatePreview();
      });
      this.routeChipWrapEl?.appendChild(chip);
    });
  }

  private injectStyles(): void {
    if (document.getElementById('scene-guide-drawer-style')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'scene-guide-drawer-style';
    style.textContent = `
      .vr-guide-drawer{
        position: fixed;
        inset: 0;
        z-index: 2600;
        pointer-events: none;
        opacity: 0;
        transition: opacity 180ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-drawer.open{
        pointer-events: auto;
        opacity: 1;
      }
      .vr-guide-mask{
        position: absolute;
        inset: 0;
        background: rgba(28, 21, 16, 0.26);
        backdrop-filter: blur(2px);
      }
      .vr-guide-panel{
        position: absolute;
        right: 18px;
        bottom: calc(18px + env(safe-area-inset-bottom, 0px));
        width: min(1080px, calc(100vw - 36px));
        height: min(78vh, 760px);
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: 1px solid rgba(103, 78, 54, 0.16);
        background:
          radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.88) 0%, transparent 42%),
          linear-gradient(145deg, rgba(252, 248, 241, 0.98) 0%, rgba(244, 236, 224, 0.98) 100%);
        box-shadow: 0 18px 44px rgba(73, 49, 28, 0.2);
        color: #1f1c17;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 220ms cubic-bezier(.2,.8,.2,1), transform 220ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-drawer.open .vr-guide-panel{
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .vr-guide-header{
        padding: 14px 16px 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-bottom: 1px solid rgba(103, 78, 54, 0.16);
        background:
          linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248, 241, 231, 0.96) 100%);
      }
      .vr-guide-header-left{
        width: 0;
        flex: 0;
      }
      .vr-guide-title{
        font-size: 22px;
        line-height: 1.2;
        font-weight: 600;
        letter-spacing: 0.01em;
        color: #1f1c17;
        font-family: var(--vr-font-chat-title, Georgia, serif);
      }
      .vr-guide-subtitle{
        margin-top: -2px;
        font-size: 13px;
        line-height: 1.55;
        color: rgba(106, 97, 87, 0.95);
        max-width: 56ch;
      }
      .vr-guide-innovation-strip{
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 8px;
      }
      .vr-guide-innovation-chip{
        min-height: 56px;
        padding: 10px 11px;
        border-radius: 14px;
        border: 1px solid rgba(201, 100, 66, 0.12);
        background: rgba(255, 255, 255, 0.72);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .vr-guide-innovation-chip strong{
        font-size: 13px;
        line-height: 1.2;
        font-weight: 600;
        color: #a84e2d;
      }
      .vr-guide-innovation-chip span{
        font-size: 11px;
        line-height: 1.45;
        color: rgba(106, 97, 87, 0.92);
      }
      .vr-guide-close{
        position: absolute;
        top: 14px;
        right: 16px;
        width: 32px;
        height: 32px;
        border-radius: 999px;
        border: 1px solid rgba(103, 78, 54, 0.14);
        background: rgba(255,255,255,0.72);
        color: #1f1c17;
        display: grid;
        place-items: center;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-close:hover{
        background: rgba(255,255,255,0.9);
        box-shadow: 0 6px 14px rgba(166, 77, 45, 0.14);
      }
      .vr-guide-close:active{
        transform: scale(0.96);
      }
      .vr-guide-search{
        padding: 0 16px 12px;
        position: relative;
        display: flex;
        align-items: center;
      }
      .vr-guide-search-icon{
        position: absolute;
        left: 28px;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(106, 97, 87, 0.6);
        pointer-events: none;
      }
      .vr-guide-search-icon svg{
        width: 100%;
        height: 100%;
        stroke: currentColor;
        fill: none;
      }
      .vr-guide-search-input{
        width: 100%;
        height: 36px;
        border-radius: 999px;
        border: 1px solid rgba(103, 78, 54, 0.18);
        background: rgba(255, 255, 255, 0.88);
        color: #1f1c17;
        padding: 0 14px 0 44px;
        font-size: 13px;
        outline: none;
        box-sizing: border-box;
      }
      .vr-guide-search-input::placeholder{
        color: rgba(106, 97, 87, 0.68);
      }
      .vr-guide-search-input:focus{
        border-color: rgba(168, 78, 45, 0.42);
        box-shadow: 0 0 0 3px rgba(168, 78, 45, 0.12);
      }
      .vr-guide-body{
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(280px, 1.12fr) minmax(320px, 0.88fr);
        gap: 12px;
        padding: 0 16px 16px;
        overflow: hidden;
      }
      .vr-guide-list{
        flex: 1;
        padding: 0 2px 0 0;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        gap: 6px;
        pointer-events: auto;
        scroll-padding-top: 12px;
      }
      .vr-guide-item{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px;
        border-radius: 14px;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1), border-color 150ms cubic-bezier(.2,.8,.2,1);
        border: 1px solid transparent;
        min-width: 0;
      }
      .vr-guide-item:hover{
        background: rgba(201, 100, 66, 0.06);
        transform: translateY(-1px);
      }
      .vr-guide-item.active{
        background: rgba(201, 100, 66, 0.08);
        border-color: rgba(201, 100, 66, 0.12);
      }
      .vr-guide-item.selected{
        background: rgba(168, 78, 45, 0.12);
        border-color: rgba(168, 78, 45, 0.24);
      }
      .vr-guide-thumb{
        width: 58px;
        height: 58px;
        border-radius: 12px;
        flex-shrink: 0;
        object-fit: cover;
        background: rgba(255,255,255,0.66);
        box-shadow: inset 0 0 0 1px rgba(103, 78, 54, 0.12);
      }
      .vr-guide-meta{
        flex: 1;
        min-width: 0;
      }
      .vr-guide-name{
        font-size: 13px;
        font-weight: 600;
        color: #1f1c17;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .vr-guide-id{
        margin-top: 2px;
        font-size: 11px;
        line-height: 1.45;
        color: rgba(106, 97, 87, 0.84);
      }
      .vr-guide-empty{
        padding: 14px 12px;
        border-radius: 12px;
        background: rgba(255,255,255,0.74);
        border: 1px dashed rgba(103, 78, 54, 0.16);
        color: rgba(106, 97, 87, 0.92);
        font-size: 12px;
        line-height: 1.55;
      }
      .vr-guide-preview{
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }
      .vr-guide-preview-image{
        width: 100%;
        height: 210px;
        border-radius: 16px;
        object-fit: cover;
        background: rgba(255,255,255,0.72);
        box-shadow: inset 0 0 0 1px rgba(103, 78, 54, 0.12);
      }
      .vr-guide-preview-title{
        font-size: 14px;
        font-weight: 600;
        line-height: 1.3;
        color: #1f1c17;
      }
      .vr-guide-preview-id{
        font-size: 11px;
        line-height: 1.45;
        color: rgba(106, 97, 87, 0.84);
      }
      .vr-guide-route-card{
        margin-top: 2px;
        padding: 14px;
        border-radius: 16px;
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.72) 0%, transparent 48%),
          linear-gradient(145deg, rgba(201, 100, 66, 0.08) 0%, rgba(245, 238, 228, 0.94) 100%);
        border: 1px solid rgba(103, 78, 54, 0.14);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .vr-guide-route-title{
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: rgba(168, 78, 45, 0.96);
        text-transform: uppercase;
      }
      .vr-guide-route-chips{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .vr-guide-route-chip{
        height: 28px;
        padding: 0 12px;
        border-radius: 999px;
        border: 1px solid rgba(103, 78, 54, 0.14);
        background: rgba(255,255,255,0.72);
        color: #1f1c17;
        font-size: 12px;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1), border-color 150ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-route-chip:hover{
        background: rgba(201, 100, 66, 0.1);
        border-color: rgba(201, 100, 66, 0.22);
        transform: translateY(-1px);
      }
      .vr-guide-route-chip:active{
        transform: translateY(0);
      }
      .vr-guide-route-chip.is-active{
        background: linear-gradient(145deg, rgba(201, 100, 66, 0.96) 0%, rgba(168, 78, 45, 0.96) 100%);
        border-color: transparent;
        color: #fff;
      }
      .vr-guide-route-summary{
        font-size: 12px;
        line-height: 1.55;
        color: rgba(106, 97, 87, 0.92);
      }
      .vr-guide-preview-enter{
        margin-top: auto;
        align-self: flex-start;
        height: 34px;
        padding: 0 14px;
        border-radius: 999px;
        background: linear-gradient(145deg, rgba(201, 100, 66, 0.96) 0%, rgba(168, 78, 45, 0.96) 100%);
        color: #fff;
        font-size: 13px;
        cursor: pointer;
        border: 0;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1);
        box-shadow: 0 10px 20px rgba(166, 77, 45, 0.2);
      }
      .vr-guide-preview-enter:hover{
        transform: translateY(-1px);
        box-shadow: 0 12px 24px rgba(166, 77, 45, 0.24);
      }
      .vr-guide-preview-enter:active{
        transform: translateY(0);
      }
      .vr-guide-enter-icon{
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .vr-guide-enter-icon svg{
        width: 100%;
        height: 100%;
        stroke: currentColor;
        fill: none;
      }
      @media (max-width: 899px){
        .vr-guide-panel{
          left: 12px;
          right: 12px;
          width: auto;
          height: min(82vh, 760px);
        }
        .vr-guide-innovation-strip{
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .vr-guide-body{
          grid-template-columns: 1fr;
          grid-template-rows: auto minmax(0, 1fr);
        }
        .vr-guide-preview{
          order: -1;
        }
        .vr-guide-preview-image{
          height: 170px;
        }
      }
      @media (max-width: 520px){
        .vr-guide-panel{
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: min(86vh, 780px);
          border-radius: 18px 18px 0 0;
        }
        .vr-guide-header{
          padding: 14px 14px 12px;
        }
        .vr-guide-search{
          padding: 0 14px 12px;
        }
        .vr-guide-body{
          padding: 0 14px 14px;
        }
        .vr-guide-title{
          font-size: 20px;
        }
        .vr-guide-preview-image{
          height: 148px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
