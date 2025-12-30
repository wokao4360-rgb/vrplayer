import type { Scene } from '../types/config';
import { navigateToScene } from '../utils/router';
import { DEFAULT_COVER_DATA_URI } from './placeholders';
import { toProxiedImageUrl } from '../utils/externalImage';
import { getIcon } from './icons';

type SceneGuideDrawerOptions = {
  museumId: string;
  currentSceneId: string;
  scenes: Scene[];
  onClose?: () => void;
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
  private searchInputEl: HTMLInputElement | null = null;
  private hoveredSceneId: string | null = null;
  private selectedSceneId: string | null = null; // 选中的场景ID（框4需要先选中再进入）
  private onClose?: () => void;

  constructor(options: SceneGuideDrawerOptions) {
    this.museumId = options.museumId;
    this.currentSceneId = options.currentSceneId;
    this.scenes = options.scenes;
    this.filteredScenes = options.scenes;
    this.onClose = options.onClose;

    this.element = document.createElement('div');
    this.element.className = 'vr-guide-drawer';

    const mask = document.createElement('div');
    mask.className = 'vr-guide-mask';

    const panel = document.createElement('div');
    panel.className = 'vr-guide-panel';

    const header = document.createElement('div');
    header.className = 'vr-guide-header';

    // 左上角：占位（保持标题居中）
    const leftBtn = document.createElement('div');
    leftBtn.className = 'vr-guide-header-left';

    const title = document.createElement('div');
    title.className = 'vr-guide-title';
    title.textContent = '导览';

    // 右上角：关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-guide-close';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.textContent = '×';

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.close();
    });

    header.appendChild(leftBtn);
    header.appendChild(title);
    header.appendChild(closeBtn);

    const searchWrap = document.createElement('div');
    searchWrap.className = 'vr-guide-search';
    const searchIcon = document.createElement('span');
    searchIcon.className = 'vr-guide-search-icon';
    searchIcon.innerHTML = getIcon('search');
    const searchInput = document.createElement('input');
    searchInput.className = 'vr-guide-search-input';
    searchInput.type = 'search';
    searchInput.placeholder = '查找场景';
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

    const enterBtn = document.createElement('button');
    enterBtn.className = 'vr-btn vr-guide-preview-enter';
    enterBtn.innerHTML = `<span class="vr-guide-enter-icon">${getIcon('arrow-right')}</span><span>前往</span>`;
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // 框4：只使用选中的场景作为进入来源，如果没有选中则使用当前场景
      const targetSceneId = this.selectedSceneId || this.currentSceneId;
      if (targetSceneId && targetSceneId !== this.currentSceneId) {
        navigateToScene(this.museumId, targetSceneId);
        this.close();
      } else if (targetSceneId === this.currentSceneId) {
        // 如果选中的就是当前场景，直接关闭抽屉即可
        this.close();
      }
    });

    preview.appendChild(previewImg);
    preview.appendChild(previewTitle);
    preview.appendChild(previewId);
    preview.appendChild(enterBtn);

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
    this.updatePreview();
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.element.classList.add('open');
    // 更新 overlay 状态
    this.updateOverlayState();
    // 打开时初始化选中状态为当前场景
    if (!this.selectedSceneId) {
      this.selectedSceneId = this.currentSceneId;
    }
    this.updateActiveState();
    this.updatePreview();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.element.classList.remove('open');
    // 更新 overlay 状态
    this.updateOverlayState();
    this.onClose?.();
  }

  private updateOverlayState(): void {
    const hasAnyOverlay = !!(
      document.querySelector('.vr-modal-overlay') ||
      (document.querySelector('.vr-guide-drawer.open') && this.isOpen) ||
      (document.querySelector('.fcchat-root') && 
       document.querySelector('.fcchat-root')?.style.display === 'flex')
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
    this.updateActiveState();
    this.updatePreview();
  }

  private bindSearch(): void {
    if (!this.searchInputEl) return;
    this.searchInputEl.addEventListener('input', () => {
      const q = (this.searchInputEl?.value || '').trim().toLowerCase();
      if (!q) {
        this.filteredScenes = this.scenes;
      } else {
        this.filteredScenes = this.scenes.filter((s) => {
          const name = s.name || '';
          return name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
        });
      }
      this.renderList();
      this.updatePreview();
    });
  }

  private renderList(): void {
    if (!this.listEl) return;
    this.listEl.innerHTML = '';

    for (const scene of this.filteredScenes) {
      const item = document.createElement('div');
      item.className = 'vr-guide-item';
      item.setAttribute('data-scene-id', scene.id);
      if (scene.id === this.currentSceneId) {
        item.classList.add('active');
      }

      const img = document.createElement('img');
      img.className = 'vr-guide-thumb';
      img.referrerPolicy = 'no-referrer';
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.loading = 'lazy';
      const thumbSrc = scene.thumb ? toProxiedImageUrl(scene.thumb) : DEFAULT_COVER_DATA_URI;
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
        // 框4：点击列表项只选中，不直接进入场景
        this.selectedSceneId = scene.id;
        // 清除所有选中状态
        this.listEl?.querySelectorAll('.vr-guide-item').forEach((el) => {
          el.classList.remove('selected');
        });
        // 设置当前项的选中状态
        item.classList.add('selected');
        // 更新预览（使用选中的场景）
        this.updatePreview();
        // 注意：这里不调用 navigateToScene，只有点击"进入"按钮才会进入场景
      });

      this.listEl.appendChild(item);
    }
  }

  private updateActiveState(): void {
    if (!this.listEl) return;
    this.listEl.querySelectorAll<HTMLElement>('.vr-guide-item').forEach((el) => {
      const id = el.getAttribute('data-scene-id');
      const isActive = id === this.currentSceneId;
      el.classList.toggle('active', isActive);
      // 如果当前项是当前场景且还没有选中项，则设置为选中状态
      if (isActive && !this.selectedSceneId) {
        this.selectedSceneId = this.currentSceneId;
        el.classList.add('selected');
      }
    });
  }

  private updatePreview(): void {
    if (!this.previewImgEl || !this.previewTitleEl || !this.previewIdEl) return;
    // 框4：优先使用选中的场景，其次hover，最后当前场景
    const targetId = this.selectedSceneId || this.hoveredSceneId || this.currentSceneId;
    const scene = this.scenes.find((s) => s.id === targetId) || this.scenes[0];
    if (!scene) return;
    const thumbSrc = scene.thumb ? toProxiedImageUrl(scene.thumb) : DEFAULT_COVER_DATA_URI;
    this.previewImgEl.src = thumbSrc;
    this.previewImgEl.alt = scene.name || scene.id;
    this.previewTitleEl.textContent = scene.name || scene.id;
    this.previewIdEl.textContent = scene.id;
  }
}
