/**
 * 配置工作台 Config Studio
 * 可视化编辑 config.json 的工具，仅在 editor 模式下显示
 */

import type { AppConfig, Museum, Scene, SceneHotspot } from '../types/config';
import { validateConfig, type ValidationError } from '../utils/configValidator';
import { ERROR_TITLES, ERROR_HINTS } from '../utils/errorMessages';
import { navigateToScene } from '../utils/router';
import { loadDraft, saveDraft, clearDraft } from '../utils/draftStorage';
import { getLastPick } from '../viewer/pickBus';
import { showToast } from './toast';

type EditingTarget = 
  | { type: 'global' }
  | { type: 'museum'; museumIndex: number }
  | { type: 'scene'; museumIndex: number; sceneIndex: number }
  | { type: 'hotspot'; museumIndex: number; sceneIndex: number; hotspotIndex: number };

const DRAFT_IGNORE_SESSION_KEY = 'vrplayer_config_draft_ignore_session';

export class ConfigStudio {
  private element: HTMLElement;
  private config: AppConfig;
  private initialConfig: AppConfig;
  private editingTarget: EditingTarget = { type: 'global' };
  private simpleMode = true; // 简易模式，默认开启
  private validationErrors: ValidationError[] = [];
  private validationDebounceTimer: number | null = null;
  private draftSaveTimer: number | null = null;
  private draftLoaded = false;
  private draftIgnoreSession = false;
  private draftBannerMessage: string | null = null;
  private onConfigChange?: (config: AppConfig) => void;

  constructor(config: AppConfig, onConfigChange?: (config: AppConfig) => void) {
    this.config = JSON.parse(JSON.stringify(config)); // 深拷贝
    this.initialConfig = JSON.parse(JSON.stringify(config));
    this.onConfigChange = onConfigChange;
    try {
      this.draftIgnoreSession = sessionStorage.getItem(DRAFT_IGNORE_SESSION_KEY) === '1';
    } catch (error) {
      console.warn('读取草稿忽略状态失败', error);
      this.draftIgnoreSession = false;
    }
    this.tryRestoreDraft();
    this.element = document.createElement('div');
    this.element.className = 'config-studio';
    this.render();
    this.applyStyles();
    this.renderDraftBanner();
    this.validateConfig();
  }

  private tryRestoreDraft(): void {
    if (this.draftIgnoreSession) return;

    const draft = loadDraft();
    if (draft) {
      this.config = JSON.parse(JSON.stringify(draft));
      this.draftLoaded = true;
      this.draftBannerMessage = '检测到未导出的草稿，已自动恢复。';
      if (this.onConfigChange) {
        this.onConfigChange(this.config);
      }
    }
  }

  private renderDraftBanner(): void {
    const bannerEl = this.element.querySelector('#draft-banner');
    if (!bannerEl) return;

    if (!this.draftLoaded || this.draftIgnoreSession) {
      bannerEl.innerHTML = '';
      bannerEl.style.display = 'none';
      return;
    }

    const message = this.draftBannerMessage || '检测到未导出的草稿，已自动恢复。';
    bannerEl.innerHTML = `
      <div class="draft-banner-content">
        <span class="draft-banner-text">${this.escapeHtml(message)}</span>
        <div class="draft-banner-actions">
          <button class="banner-btn" data-banner-action="export">导出</button>
          <button class="banner-btn" data-banner-action="clear">清空草稿</button>
          <button class="banner-btn" data-banner-action="ignore">忽略本次</button>
        </div>
      </div>
    `;
    bannerEl.style.display = 'flex';
    this.bindDraftBannerEvents();
  }

  private bindDraftBannerEvents(): void {
    const bannerEl = this.element.querySelector('#draft-banner');
    if (!bannerEl) return;

    bannerEl.querySelectorAll('[data-banner-action]').forEach(btn => {
      btn.addEventListener('click', (event) => {
        const action = (event.currentTarget as HTMLElement).getAttribute('data-banner-action');
        if (action === 'export') {
          this.handleExport();
        } else if (action === 'clear') {
          this.handleClearDraft();
        } else if (action === 'ignore') {
          this.handleIgnoreDraft();
        }
      });
    });
  }

  private handleIgnoreDraft(): void {
    this.draftIgnoreSession = true;
    try {
      sessionStorage.setItem(DRAFT_IGNORE_SESSION_KEY, '1');
    } catch (error) {
      console.warn('记录忽略草稿状态失败', error);
    }
    this.config = JSON.parse(JSON.stringify(this.initialConfig));
    this.draftLoaded = false;
    this.draftBannerMessage = null;
    this.renderSidebar();
    this.renderEditor();
    this.bindEvents();
    this.debouncedValidate();
    this.notifyChange({ skipDraftSave: true });
    this.renderDraftBanner();
    this.showToast('已忽略草稿，本次会话使用默认配置');
  }

  private handleClearDraft(): void {
    const confirmed = confirm('确定清空本地草稿？');
    if (!confirmed) return;
    clearDraft();
    this.draftLoaded = false;
    this.draftBannerMessage = null;
    this.renderDraftBanner();
    this.showToast('草稿已清空');
  }

  private handleExport(): void {
    this.exportConfig();
    const draft = loadDraft();
    if (draft && this.isConfigSameAs(draft)) {
      this.showToast('已导出（草稿仍保留）');
    }
  }

  private exportConfig(): void {
    const json = JSON.stringify(this.config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  private isConfigSameAs(target: AppConfig): boolean {
    try {
      return JSON.stringify(this.config) === JSON.stringify(target);
    } catch {
      return false;
    }
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="studio-container">
        <div class="draft-banner" id="draft-banner" aria-live="polite"></div>
        <!-- 顶部工具条 -->
        <div class="studio-toolbar">
          <div class="toolbar-left">
            <button class="toolbar-btn" id="import-btn">📥 导入配置</button>
            <button class="toolbar-btn" id="export-btn">📤 导出配置</button>
            <button class="toolbar-btn" id="reset-btn">🔄 重置为示例</button>
            <button class="toolbar-btn" id="clear-draft-btn">🗑️ 清空草稿</button>
          </div>
          <div class="toolbar-right">
            <label class="simple-toggle">
              <input type="checkbox" id="simple-mode-toggle" checked>
              <span>简易模式</span>
            </label>
            <div class="validation-status" id="validation-status">⏳ 校验中...</div>
          </div>
        </div>

        <!-- 主内容区：左右两栏 -->
        <div class="studio-content">
          <!-- 左栏：馆/场景树 -->
          <div class="studio-sidebar">
            <div class="sidebar-header">配置结构</div>
            <div class="sidebar-tree" id="sidebar-tree"></div>
          </div>

          <!-- 右栏：表单编辑区 -->
          <div class="studio-editor">
            <div class="editor-header" id="editor-header">选择左侧项目进行编辑</div>
            <div class="editor-form" id="editor-form"></div>
          </div>
        </div>

        <!-- 底部：错误面板 -->
        <div class="studio-errors" id="studio-errors"></div>
      </div>

      <!-- 隐藏的文件输入 -->
      <input type="file" id="file-input" accept=".json" style="display: none;">
    `;

    this.renderSidebar();
    this.renderEditor();
    this.bindEvents();
  }

  private renderSidebar(): void {
    const treeEl = this.element.querySelector('#sidebar-tree');
    if (!treeEl) return;

    treeEl.innerHTML = `
      <div class="tree-item ${this.editingTarget.type === 'global' ? 'active' : ''}" data-target="global">
        <span class="tree-icon">🌐</span>
        <span class="tree-label">全局配置</span>
      </div>
      ${this.config.museums.map((museum, mIndex) => `
        <div class="tree-item museum-item ${this.editingTarget.type === 'museum' && this.editingTarget.museumIndex === mIndex ? 'active' : ''}" data-target="museum:${mIndex}">
          <span class="tree-icon">🏛️</span>
          <span class="tree-label">${this.escapeHtml(museum.name)}</span>
          <button class="tree-btn-add" data-action="add-scene" data-museum="${mIndex}" title="添加场景">+</button>
          <button class="tree-btn-del" data-action="del-museum" data-museum="${mIndex}" title="删除博物馆">×</button>
        </div>
        ${museum.scenes.map((scene, sIndex) => `
          <div class="tree-item scene-item ${this.editingTarget.type === 'scene' && this.editingTarget.museumIndex === mIndex && this.editingTarget.sceneIndex === sIndex ? 'active' : ''}" data-target="scene:${mIndex}:${sIndex}">
            <span class="tree-icon">📷</span>
            <span class="tree-label">${this.escapeHtml(scene.name)}</span>
            ${this.simpleMode ? `
              <button class="tree-btn-add" data-action="add-hotspot-scene" data-museum="${mIndex}" data-scene="${sIndex}" title="添加跳转热点">+ 添加跳转</button>
              <button class="tree-btn-add" data-action="add-hotspot-video" data-museum="${mIndex}" data-scene="${sIndex}" title="添加视频热点">+ 添加视频</button>
            ` : `
              <button class="tree-btn-add" data-action="add-hotspot" data-museum="${mIndex}" data-scene="${sIndex}" title="添加热点">+</button>
            `}
            <button class="tree-btn-del" data-action="del-scene" data-museum="${mIndex}" data-scene="${sIndex}" title="删除场景">×</button>
          </div>
          ${scene.hotspots.map((hotspot, hIndex) => `
            <div class="tree-item hotspot-item ${this.editingTarget.type === 'hotspot' && this.editingTarget.museumIndex === mIndex && this.editingTarget.sceneIndex === sIndex && this.editingTarget.hotspotIndex === hIndex ? 'active' : ''}" data-target="hotspot:${mIndex}:${sIndex}:${hIndex}">
              <span class="tree-icon">📍</span>
              <span class="tree-label">${this.escapeHtml(hotspot.label)}${this.simpleMode && hotspot.type !== 'scene' && hotspot.type !== 'video' ? '（高级模式编辑）' : ''}</span>
              <button class="tree-btn-del" data-action="del-hotspot" data-museum="${mIndex}" data-scene="${sIndex}" data-hotspot="${hIndex}" title="删除热点">×</button>
            </div>
          `).join('')}
        `).join('')}
      `).join('')}
      <div class="tree-item tree-item-add">
        <button class="tree-btn-add-main" id="add-museum-btn">+ 添加博物馆</button>
      </div>
    `;
  }

  private renderEditor(): void {
    const headerEl = this.element.querySelector('#editor-header');
    const formEl = this.element.querySelector('#editor-form');
    if (!headerEl || !formEl) return;

    if (this.simpleMode) {
      this.renderSimpleForm(headerEl, formEl);
    } else {
      this.renderAdvancedForm(headerEl, formEl);
    }
  }

  /**
   * 简易模式渲染：只显示老师/运营能理解的核心字段
   */
  private renderSimpleForm(headerEl: HTMLElement, formEl: HTMLElement): void {
    if (this.editingTarget.type === 'global') {
      headerEl.textContent = '全局配置';
      formEl.innerHTML = `
        <div class="form-group">
          <label>应用名称</label>
          <input type="text" id="field-appName" value="${this.escapeHtml(this.config.appName)}" placeholder="应用名称">
        </div>
      `;
      return;
    }

    if (this.editingTarget.type === 'museum') {
      const museum = this.config.museums[this.editingTarget.museumIndex];
      headerEl.textContent = `编辑博物馆：${museum.name}`;
      formEl.innerHTML = `
        <div class="form-group">
          <label>馆ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(museum.id)}" placeholder="museum_id">
        </div>
        <div class="form-group">
          <label>馆名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(museum.name)}" placeholder="博物馆名称">
        </div>
        <div class="form-group">
          <label>封面图 URL</label>
          <input type="text" id="field-cover" value="${this.escapeHtml(museum.cover)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
      `;
      return;
    }

    if (this.editingTarget.type === 'scene') {
      const scene = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];
      headerEl.textContent = `编辑场景：${scene.name}`;
      formEl.innerHTML = `
        <div class="form-group">
          <label>场景ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(scene.id)}" placeholder="scene_id">
        </div>
        <div class="form-group">
          <label>场景名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(scene.name)}" placeholder="场景名称">
        </div>
        <div class="form-group">
          <label>缩略图</label>
          <input type="text" id="field-thumb" value="${this.escapeHtml(scene.thumb)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-group">
          <label>低清全景 (panoLow)</label>
          <input type="text" id="field-panoLow" value="${scene.panoLow ? this.escapeHtml(scene.panoLow) : ''}" placeholder="https://...">
          <div class="input-hint">首屏快速加载，网络慢时优先使用</div>
        </div>
        <div class="form-group">
          <label>高清全景 (pano)</label>
          <input type="text" id="field-pano" value="${scene.pano ? this.escapeHtml(scene.pano) : ''}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-actions">
          <button class="btn-preview" id="preview-scene-btn">👁️ 预览此场景</button>
          <button class="btn-pick-hotspot" id="pick-hotspot-btn">🎯 用拾取落点新增热点</button>
        </div>
      `;
      return;
    }

    if (this.editingTarget.type === 'hotspot') {
      const hotspot = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];
      const isSceneType = hotspot.type === 'scene';
      const isVideoType = hotspot.type === 'video';

      headerEl.textContent = `编辑热点：${hotspot.label}`;

      if (!isSceneType && !isVideoType) {
        formEl.innerHTML = `
          <div class="notice-box">
            该热点类型仅可在高级模式编辑，请切换到高级模式。
          </div>
        `;
        return;
      }

      formEl.innerHTML = `
        <div class="form-actions" style="margin-bottom: 16px;">
          <button class="btn-pick-reposition" id="pick-reposition-btn">🎯 重新拾取位置</button>
        </div>
        <div class="form-group">
          <label>热点类型</label>
          <select id="field-type">
            <option value="scene" ${isSceneType ? 'selected' : ''}>跳转场景</option>
            <option value="video" ${isVideoType ? 'selected' : ''}>播放视频</option>
          </select>
        </div>
        <div class="form-group">
          <label>热点标题</label>
          <input type="text" id="field-label" value="${this.escapeHtml(hotspot.label)}" placeholder="如：进入展厅">
        </div>
        <div class="form-group">
          <label>左右角度 (yaw)</label>
          <input type="number" id="field-yaw" value="${hotspot.yaw ?? 0}" step="0.1">
        </div>
        <div class="form-group">
          <label>上下角度 (pitch)</label>
          <input type="number" id="field-pitch" value="${hotspot.pitch ?? 0}" step="0.1">
        </div>
        ${isSceneType ? `
          <div class="form-group">
            <label>目标场景 ID</label>
            <input type="text" id="field-target-sceneId" value="${hotspot.target.sceneId || ''}" placeholder="scene_id">
            <div class="input-hint">跳转到同馆内的场景 ID</div>
          </div>
        ` : `
          <div class="form-group">
            <label>视频链接</label>
            <input type="text" id="field-target-url" value="${hotspot.target.url || ''}" placeholder="https://...">
            <div class="input-hint">建议使用可直接访问的 https 链接</div>
          </div>
        `}
      `;
      return;
    }
  }

  /**
   * 高级模式渲染：完整字段（原有逻辑）
   */
  private renderAdvancedForm(headerEl: HTMLElement, formEl: HTMLElement): void {
    if (this.editingTarget.type === 'global') {
      headerEl.textContent = '全局配置';
      formEl.innerHTML = this.renderGlobalForm();
    } else if (this.editingTarget.type === 'museum') {
      const museum = this.config.museums[this.editingTarget.museumIndex];
      headerEl.textContent = `编辑博物馆：${museum.name}`;
      formEl.innerHTML = this.renderMuseumForm(museum, this.editingTarget.museumIndex);
    } else if (this.editingTarget.type === 'scene') {
      const scene = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];
      headerEl.textContent = `编辑场景：${scene.name}`;
      formEl.innerHTML = this.renderSceneForm(scene, this.editingTarget.museumIndex, this.editingTarget.sceneIndex);
    } else if (this.editingTarget.type === 'hotspot') {
      const hotspot = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];
      headerEl.textContent = `编辑热点：${hotspot.label}`;
      formEl.innerHTML = this.renderHotspotForm(hotspot, this.editingTarget.museumIndex, this.editingTarget.sceneIndex, this.editingTarget.hotspotIndex);
    }
  }

  private renderGlobalForm(): string {
    return `
      <div class="form-group">
        <label>应用名称</label>
        <input type="text" id="field-appName" value="${this.escapeHtml(this.config.appName)}" placeholder="应用名称">
      </div>
    `;
  }

  private renderMuseumForm(museum: Museum, museumIndex: number): string {
    return `
      <div class="form-group">
        <label>博物馆 ID</label>
        <input type="text" id="field-id" value="${this.escapeHtml(museum.id)}" placeholder="museum_id">
      </div>
      <div class="form-group">
        <label>博物馆名称</label>
        <input type="text" id="field-name" value="${this.escapeHtml(museum.name)}" placeholder="博物馆名称">
      </div>
      <div class="form-group">
        <label>封面图 URL</label>
        <input type="text" id="field-cover" value="${this.escapeHtml(museum.cover)}" placeholder="https://...">
      </div>
    `;
  }

  private renderSceneForm(scene: Scene, museumIndex: number, sceneIndex: number): string {
    return `
      <div class="form-group">
        <label>场景 ID</label>
        <input type="text" id="field-id" value="${this.escapeHtml(scene.id)}" placeholder="scene_id">
      </div>
      <div class="form-group">
        <label>场景名称</label>
        <input type="text" id="field-name" value="${this.escapeHtml(scene.name)}" placeholder="场景名称">
      </div>
      <div class="form-group">
        <label>缩略图 URL</label>
        <input type="text" id="field-thumb" value="${this.escapeHtml(scene.thumb)}" placeholder="https://...">
      </div>
      <div class="form-group">
        <label>低清全景图 URL (panoLow)</label>
        <input type="text" id="field-panoLow" value="${scene.panoLow ? this.escapeHtml(scene.panoLow) : ''}" placeholder="https://...">
      </div>
      <div class="form-group">
        <label>高清全景图 URL (pano)</label>
        <input type="text" id="field-pano" value="${scene.pano ? this.escapeHtml(scene.pano) : ''}" placeholder="https://...">
      </div>
      <div class="form-actions">
        <button class="btn-preview" id="preview-scene-btn">👁️ 预览此场景</button>
      </div>
    `;
  }

  private renderHotspotForm(hotspot: SceneHotspot, museumIndex: number, sceneIndex: number, hotspotIndex: number): string {
    const isSceneType = hotspot.type === 'scene';
    return `
      <div class="form-actions" style="margin-bottom: 16px;">
        <button class="btn-pick-reposition" id="pick-reposition-btn">🎯 重新拾取位置</button>
      </div>
      <div class="form-group">
        <label>热点类型</label>
        <select id="field-type">
          <option value="scene" ${isSceneType ? 'selected' : ''}>场景跳转</option>
          <option value="video" ${!isSceneType ? 'selected' : ''}>视频播放</option>
        </select>
      </div>
      <div class="form-group">
        <label>热点标签</label>
        <input type="text" id="field-label" value="${this.escapeHtml(hotspot.label)}" placeholder="热点标签">
      </div>
      <div class="form-group">
        <label>水平角度 (yaw)</label>
        <input type="number" id="field-yaw" value="${hotspot.yaw ?? 0}" step="0.1">
      </div>
      <div class="form-group">
        <label>垂直角度 (pitch)</label>
        <input type="number" id="field-pitch" value="${hotspot.pitch ?? 0}" step="0.1">
      </div>
      ${isSceneType ? `
        <div class="form-group">
          <label>目标博物馆 ID</label>
          <input type="text" id="field-target-museumId" value="${hotspot.target.museumId || ''}" placeholder="museum_id">
        </div>
        <div class="form-group">
          <label>目标场景 ID</label>
          <input type="text" id="field-target-sceneId" value="${hotspot.target.sceneId || ''}" placeholder="scene_id">
        </div>
      ` : `
        <div class="form-group">
          <label>视频 URL</label>
          <input type="text" id="field-target-url" value="${hotspot.target.url || ''}" placeholder="https://...">
        </div>
      `}
    `;
  }

  private bindEvents(): void {
    // 工具栏按钮
    const importBtn = this.element.querySelector('#import-btn');
    const exportBtn = this.element.querySelector('#export-btn');
    const resetBtn = this.element.querySelector('#reset-btn');
    const clearDraftBtn = this.element.querySelector('#clear-draft-btn');
    const fileInput = this.element.querySelector('#file-input') as HTMLInputElement;
    const simpleToggle = this.element.querySelector('#simple-mode-toggle') as HTMLInputElement | null;

    if (simpleToggle) {
      simpleToggle.checked = this.simpleMode;
      simpleToggle.addEventListener('change', () => {
        this.simpleMode = simpleToggle.checked;
        this.renderSidebar();
        this.renderEditor();
        this.bindEvents();
      });
    }

    importBtn?.addEventListener('click', () => {
      const jsonText = prompt('请粘贴 JSON 配置：');
      if (jsonText) {
        try {
          const config = JSON.parse(jsonText);
          this.config = config;
          this.initialConfig = JSON.parse(JSON.stringify(config));
          this.draftLoaded = false;
          this.draftBannerMessage = null;
          this.renderSidebar();
          this.renderEditor();
          this.validateConfig();
          this.notifyChange();
          this.renderDraftBanner();
        } catch (e) {
          alert('JSON 格式错误：' + e);
        }
      }
    });

    exportBtn?.addEventListener('click', () => {
      this.handleExport();
    });

    resetBtn?.addEventListener('click', async () => {
      try {
        const response = await fetch('./config.json', { cache: 'no-store' });
        const config = await response.json();
        this.config = config;
        this.initialConfig = JSON.parse(JSON.stringify(config));
        this.draftLoaded = false;
        this.draftBannerMessage = null;
        this.renderSidebar();
        this.renderEditor();
        this.validateConfig();
        this.notifyChange();
        this.renderDraftBanner();
      } catch (e) {
        alert('加载示例配置失败：' + e);
      }
    });

    clearDraftBtn?.addEventListener('click', () => {
      this.handleClearDraft();
    });

    // 树形结构点击
    this.element.querySelectorAll('.tree-item[data-target]').forEach(item => {
      item.addEventListener('click', (e) => {
        const target = item.getAttribute('data-target');
        if (!target) return;
        
        if (target === 'global') {
          this.editingTarget = { type: 'global' };
        } else if (target.startsWith('museum:')) {
          const index = parseInt(target.split(':')[1]);
          this.editingTarget = { type: 'museum', museumIndex: index };
        } else if (target.startsWith('scene:')) {
          const [_, mIndex, sIndex] = target.split(':').map(Number);
          this.editingTarget = { type: 'scene', museumIndex: mIndex, sceneIndex: sIndex };
        } else if (target.startsWith('hotspot:')) {
          const [_, mIndex, sIndex, hIndex] = target.split(':').map(Number);
          this.editingTarget = { type: 'hotspot', museumIndex: mIndex, sceneIndex: sIndex, hotspotIndex: hIndex };
        }
        
        this.renderSidebar();
        this.renderEditor();
        this.bindFormEvents();
      });
    });

    // 添加/删除按钮
    this.element.querySelector('#add-museum-btn')?.addEventListener('click', () => {
      this.addMuseum();
    });

    this.element.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.getAttribute('data-action');
        const museumIndex = parseInt(btn.getAttribute('data-museum') || '0');
        const sceneIndex = parseInt(btn.getAttribute('data-scene') || '0');
        const hotspotIndex = parseInt(btn.getAttribute('data-hotspot') || '0');

        if (action === 'add-scene') {
          this.addScene(museumIndex);
        } else if (action === 'del-museum') {
          if (confirm('确定删除此博物馆？')) {
            this.deleteMuseum(museumIndex);
          }
        } else if (action === 'add-hotspot') {
          this.addHotspot(museumIndex, sceneIndex, 'scene');
        } else if (action === 'add-hotspot-scene') {
          this.addHotspot(museumIndex, sceneIndex, 'scene');
        } else if (action === 'add-hotspot-video') {
          this.addHotspot(museumIndex, sceneIndex, 'video');
        } else if (action === 'del-scene') {
          if (confirm('确定删除此场景？')) {
            this.deleteScene(museumIndex, sceneIndex);
          }
        } else if (action === 'del-hotspot') {
          if (confirm('确定删除此热点？')) {
            this.deleteHotspot(museumIndex, sceneIndex, hotspotIndex);
          }
        }
      });
    });

    this.bindFormEvents();
  }

  private bindFormEvents(): void {
    // 全局表单
    if (this.editingTarget.type === 'global') {
      const appNameInput = this.element.querySelector('#field-appName') as HTMLInputElement;
      appNameInput?.addEventListener('input', () => {
        this.config.appName = appNameInput.value;
        this.debouncedValidate();
        this.notifyChange();
      });
    }

    // 博物馆表单
    if (this.editingTarget.type === 'museum') {
      const idInput = this.element.querySelector('#field-id') as HTMLInputElement;
      const nameInput = this.element.querySelector('#field-name') as HTMLInputElement;
      const coverInput = this.element.querySelector('#field-cover') as HTMLInputElement;

      idInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].id = idInput.value;
        this.debouncedValidate();
        this.notifyChange();
      });
      nameInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].name = nameInput.value;
        this.renderSidebar();
        this.debouncedValidate();
        this.notifyChange();
      });
      coverInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].cover = coverInput.value;
        this.debouncedValidate();
        this.notifyChange();
      });
    }

    // 场景表单
    if (this.editingTarget.type === 'scene') {
      const idInput = this.element.querySelector('#field-id') as HTMLInputElement;
      const nameInput = this.element.querySelector('#field-name') as HTMLInputElement;
      const thumbInput = this.element.querySelector('#field-thumb') as HTMLInputElement;
      const panoLowInput = this.element.querySelector('#field-panoLow') as HTMLInputElement;
      const panoInput = this.element.querySelector('#field-pano') as HTMLInputElement;
      const previewBtn = this.element.querySelector('#preview-scene-btn');

      idInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].id = idInput.value;
        this.debouncedValidate();
        this.notifyChange();
      });
      nameInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].name = nameInput.value;
        this.renderSidebar();
        this.debouncedValidate();
        this.notifyChange();
      });
      thumbInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].thumb = thumbInput.value;
        this.debouncedValidate();
        this.notifyChange();
      });
      panoLowInput?.addEventListener('input', () => {
        const scene = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];
        if (panoLowInput.value) {
          scene.panoLow = panoLowInput.value;
        } else {
          delete scene.panoLow;
        }
        this.debouncedValidate();
        this.notifyChange();
      });
      panoInput?.addEventListener('input', () => {
        const scene = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];
        if (panoInput.value) {
          scene.pano = panoInput.value;
        } else {
          delete scene.pano;
        }
        this.debouncedValidate();
        this.notifyChange();
      });

      previewBtn?.addEventListener('click', () => {
        const museum = this.config.museums[this.editingTarget.museumIndex];
        const scene = museum.scenes[this.editingTarget.sceneIndex];
        navigateToScene(museum.id, scene.id);
      });

      const pickHotspotBtn = this.element.querySelector('#pick-hotspot-btn');
      pickHotspotBtn?.addEventListener('click', () => {
        this.handleAddHotspotFromPick();
      });
    }

    // 热点表单
    if (this.editingTarget.type === 'hotspot') {
      const typeSelect = this.element.querySelector('#field-type') as HTMLSelectElement;
      const labelInput = this.element.querySelector('#field-label') as HTMLInputElement;
      const yawInput = this.element.querySelector('#field-yaw') as HTMLInputElement;
      const pitchInput = this.element.querySelector('#field-pitch') as HTMLInputElement;
      const targetMuseumIdInput = this.element.querySelector('#field-target-museumId') as HTMLInputElement;
      const targetSceneIdInput = this.element.querySelector('#field-target-sceneId') as HTMLInputElement;
      const targetUrlInput = this.element.querySelector('#field-target-url') as HTMLInputElement;

      typeSelect?.addEventListener('change', () => {
        const hotspot = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];
        hotspot.type = typeSelect.value as 'scene' | 'video';
        if (hotspot.type === 'scene') {
          hotspot.target = { museumId: '', sceneId: '' };
        } else {
          hotspot.target = { url: '' };
        }
        this.renderEditor();
        this.bindFormEvents();
        this.debouncedValidate();
        this.notifyChange();
      });

      labelInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].label = labelInput.value;
        this.renderSidebar();
        this.debouncedValidate();
        this.notifyChange();
      });
      yawInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].yaw = parseFloat(yawInput.value) || 0;
        this.debouncedValidate();
        this.notifyChange();
      });
      pitchInput?.addEventListener('input', () => {
        this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].pitch = parseFloat(pitchInput.value) || 0;
        this.debouncedValidate();
        this.notifyChange();
      });

      const pickRepositionBtn = this.element.querySelector('#pick-reposition-btn');
      pickRepositionBtn?.addEventListener('click', () => {
        this.handleRepositionHotspot();
      });

      if (targetMuseumIdInput) {
        targetMuseumIdInput.addEventListener('input', () => {
          const target = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;
          if (!target.museumId) target.museumId = '';
          target.museumId = targetMuseumIdInput.value;
          this.debouncedValidate();
          this.notifyChange();
        });
      }
      if (targetSceneIdInput) {
        targetSceneIdInput.addEventListener('input', () => {
          const target = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;
          if (!target.sceneId) target.sceneId = '';
          target.sceneId = targetSceneIdInput.value;
          this.debouncedValidate();
          this.notifyChange();
        });
      }
      if (targetUrlInput) {
        targetUrlInput.addEventListener('input', () => {
          const target = this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;
          if (!target.url) target.url = '';
          target.url = targetUrlInput.value;
          this.debouncedValidate();
          this.notifyChange();
        });
      }
    }
  }

  private addMuseum(): void {
    const newMuseum: Museum = {
      id: `museum_${Date.now()}`,
      name: '新博物馆',
      cover: '',
      map: { image: '', width: 1000, height: 600 },
      scenes: []
    };
    this.config.museums.push(newMuseum);
    this.editingTarget = { type: 'museum', museumIndex: this.config.museums.length - 1 };
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();
    this.debouncedValidate();
    this.notifyChange();
  }

  private addScene(museumIndex: number): void {
    const newScene: Scene = {
      id: `scene_${Date.now()}`,
      name: '新场景',
      thumb: '',
      pano: '',
      initialView: { yaw: 0, pitch: 0, fov: 75 },
      mapPoint: { x: 0, y: 0 },
      hotspots: []
    };
    this.config.museums[museumIndex].scenes.push(newScene);
    this.editingTarget = { type: 'scene', museumIndex, sceneIndex: this.config.museums[museumIndex].scenes.length - 1 };
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();
    this.debouncedValidate();
    this.notifyChange();
  }

  private addHotspot(museumIndex: number, sceneIndex: number, type: 'scene' | 'video' = 'scene'): void {
    const newHotspot: SceneHotspot = {
      id: `hotspot_${Date.now()}`,
      type,
      label: type === 'video' ? '新视频热点' : '新跳转热点',
      yaw: 0,
      pitch: 0,
      target: type === 'video'
        ? { url: '' }
        : { museumId: this.config.museums[museumIndex].id, sceneId: '' }
    };
    this.config.museums[museumIndex].scenes[sceneIndex].hotspots.push(newHotspot);
    this.editingTarget = { type: 'hotspot', museumIndex, sceneIndex, hotspotIndex: this.config.museums[museumIndex].scenes[sceneIndex].hotspots.length - 1 };
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();
    this.debouncedValidate();
    this.notifyChange();
  }

  private deleteMuseum(museumIndex: number): void {
    this.config.museums.splice(museumIndex, 1);
    this.editingTarget = { type: 'global' };
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();
    this.debouncedValidate();
    this.notifyChange();
  }

  private deleteScene(museumIndex: number, sceneIndex: number): void {
    this.config.museums[museumIndex].scenes.splice(sceneIndex, 1);
    this.editingTarget = { type: 'museum', museumIndex };
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();
    this.debouncedValidate();
    this.notifyChange();
  }

  private deleteHotspot(museumIndex: number, sceneIndex: number, hotspotIndex: number): void {
    this.config.museums[museumIndex].scenes[sceneIndex].hotspots.splice(hotspotIndex, 1);
    this.editingTarget = { type: 'scene', museumIndex, sceneIndex };
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();
    this.debouncedValidate();
    this.notifyChange();
  }

  private debouncedValidate(): void {
    if (this.validationDebounceTimer) {
      clearTimeout(this.validationDebounceTimer);
    }
    this.validationDebounceTimer = window.setTimeout(() => {
      this.validateConfig();
    }, 200);
  }

  private validateConfig(): void {
    this.validationErrors = validateConfig(this.config);
    this.updateValidationStatus();
    this.renderErrors();
  }

  private scheduleDraftSave(skipSave: boolean): void {
    if (skipSave) return;
    if (this.draftSaveTimer) {
      clearTimeout(this.draftSaveTimer);
    }
    this.draftSaveTimer = window.setTimeout(() => {
      const result = saveDraft(this.config);
      if (!result.ok) {
        this.showToast(`草稿保存失败：${result.reason || '未知原因'}`);
      } else {
        this.draftLoaded = true;
      }
    }, 300);
  }

  private updateValidationStatus(): void {
    const statusEl = this.element.querySelector('#validation-status');
    if (!statusEl) return;

    if (this.validationErrors.length === 0) {
      statusEl.innerHTML = '✅ 配置通过';
      statusEl.className = 'validation-status status-ok';
    } else {
      statusEl.innerHTML = `❌ ${this.validationErrors.length} 个错误`;
      statusEl.className = 'validation-status status-error';
    }
  }

  private renderErrors(): void {
    const errorsEl = this.element.querySelector('#studio-errors');
    if (!errorsEl) return;

    if (this.validationErrors.length === 0) {
      errorsEl.innerHTML = '';
      return;
    }

    // 复用 ConfigErrorPanel 的错误卡片样式，但不显示操作按钮
    errorsEl.innerHTML = `
      <div class="studio-errors-content">
        <div class="errors-header">配置错误 (${this.validationErrors.length} 个)</div>
        <div class="errors-list">
          ${this.validationErrors.map(error => {
            const title = error.code ? (ERROR_TITLES[error.code] || '配置错误') : '配置错误';
            const hint = error.code ? (ERROR_HINTS[error.code] || '请检查配置') : '请检查配置';
            const locationParts: string[] = [];
            if (error.museumName) locationParts.push(`馆：${error.museumName}`);
            if (error.sceneName) locationParts.push(`场景：${error.sceneName}`);
            const locationText = locationParts.length > 0 ? locationParts.join(' / ') : '全局配置';
            
            return `
              <div class="error-card-mini">
                <div class="error-card-header">
                  <span class="error-icon">❌</span>
                  <span class="error-title">${this.escapeHtml(title)}</span>
                </div>
                <div class="error-card-body">
                  <div class="error-location">📍 ${this.escapeHtml(locationText)}</div>
                  ${error.fieldName ? `<div class="error-field">字段：${this.escapeHtml(error.fieldName)}</div>` : ''}
                  <div class="error-hint">💡 ${this.escapeHtml(hint)}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  private notifyChange(options?: { skipDraftSave?: boolean }): void {
    if (this.onConfigChange) {
      this.onConfigChange(this.config);
    }
    this.scheduleDraftSave(!!options?.skipDraftSave);
  }

  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.className = 'studio-toast';
    toast.textContent = message;
    this.element.appendChild(toast);

    // 触发过渡
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    window.setTimeout(() => {
      toast.classList.remove('show');
      window.setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 用拾取落点新增热点
   */
  private handleAddHotspotFromPick(): void {
    const pick = getLastPick();
    if (!pick) {
      showToast('没有拾取点：先点右上角🎯，在全景里点一下');
      return;
    }

    if (this.editingTarget.type !== 'scene') {
      showToast('请先选择一个场景');
      return;
    }

    const { museumIndex, sceneIndex } = this.editingTarget;
    const scene = this.config.museums[museumIndex].scenes[sceneIndex];

    // 构造热点对象
    const newHotspot: SceneHotspot = {
      id: `hs_${Date.now()}`,
      type: 'scene',
      yaw: pick.yaw,
      pitch: pick.pitch,
      label: '进入场景',
      target: { sceneId: '' }, // 默认空字符串，用户后续补全
    };

    // 追加到 hotspots 数组
    if (!scene.hotspots) {
      scene.hotspots = [];
    }
    scene.hotspots.push(newHotspot);

    // 刷新 UI
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();

    // 高亮新增的热点项
    const newHotspotIndex = scene.hotspots.length - 1;
    this.highlightNewHotspot(museumIndex, sceneIndex, newHotspotIndex);

    // 自动选中新增的热点
    this.editingTarget = {
      type: 'hotspot',
      museumIndex,
      sceneIndex,
      hotspotIndex: newHotspotIndex,
    };
    this.renderSidebar();
    this.renderEditor();
    this.bindFormEvents();

    this.debouncedValidate();
    this.notifyChange();
    showToast('已新增热点：请在配置里补全目标场景');
  }

  /**
   * 高亮新增的热点项（300ms flash）
   */
  private highlightNewHotspot(museumIndex: number, sceneIndex: number, hotspotIndex: number): void {
    // 等待 DOM 更新
    window.setTimeout(() => {
      const treeEl = this.element.querySelector('#sidebar-tree');
      if (!treeEl) return;

      const hotspotItems = treeEl.querySelectorAll('.hotspot-item');
      const targetItem = hotspotItems[hotspotItems.length - 1] as HTMLElement;
      if (targetItem) {
        targetItem.classList.add('tree-item--flash');
        window.setTimeout(() => {
          targetItem.classList.remove('tree-item--flash');
        }, 300);
      }
    }, 50);
  }

  /**
   * 重新拾取位置（校准热点）
   */
  private handleRepositionHotspot(): void {
    if (this.editingTarget.type !== 'hotspot') {
      showToast('请先选择一个热点');
      return;
    }

    const pick = getLastPick();
    if (!pick) {
      showToast('没有拾取点：先点右上角🎯，在全景里点一下');
      return;
    }

    const { museumIndex, sceneIndex, hotspotIndex } = this.editingTarget;
    const hotspot = this.config.museums[museumIndex].scenes[sceneIndex].hotspots[hotspotIndex];

    // 保留 1 位小数
    const round1 = (n: number) => Math.round(n * 10) / 10;
    const newYaw = round1(pick.yaw);
    const newPitch = round1(pick.pitch);

    // 直接覆盖 yaw/pitch
    hotspot.yaw = newYaw;
    hotspot.pitch = newPitch;

    // 刷新 UI（保持选中该热点）
    this.renderEditor();
    this.bindFormEvents();

    // 高亮该热点列表项
    this.highlightHotspotItem(museumIndex, sceneIndex, hotspotIndex);

    // 触发验证和保存
    this.debouncedValidate();
    this.notifyChange();

    // 可选：发送事件关闭拾取模式
    window.dispatchEvent(
      new CustomEvent('vr:pickmode', { detail: { enabled: false } })
    );

    showToast(`已更新位置 yaw:${newYaw.toFixed(1)} pitch:${newPitch.toFixed(1)}`);
  }

  /**
   * 高亮指定的热点项（300ms flash）
   */
  private highlightHotspotItem(museumIndex: number, sceneIndex: number, hotspotIndex: number): void {
    window.setTimeout(() => {
      const treeEl = this.element.querySelector('#sidebar-tree');
      if (!treeEl) return;

      // 找到对应的热点项（通过 data-target 属性）
      const targetAttr = `hotspot:${museumIndex}:${sceneIndex}:${hotspotIndex}`;
      const targetItem = treeEl.querySelector(`[data-target="${targetAttr}"]`) as HTMLElement;
      if (targetItem) {
        targetItem.classList.add('tree-item--flash');
        window.setTimeout(() => {
          targetItem.classList.remove('tree-item--flash');
        }, 300);
      }
    }, 50);
  }

  getConfig(): AppConfig {
    return this.config;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .config-studio {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #1a1a1a;
        z-index: 20000;
        display: flex;
        flex-direction: column;
        color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      .studio-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .studio-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        background: #252525;
        border-bottom: 1px solid #333;
      }
      .draft-banner {
        display: none;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        background: #2c3e50;
        border-bottom: 1px solid #34495e;
        font-size: 14px;
        color: #fff;
      }
      .draft-banner-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;
      }
      .draft-banner-text {
        flex: 1;
      }
      .draft-banner-actions {
        display: flex;
        gap: 8px;
        flex-shrink: 0;
      }
      .banner-btn {
        padding: 6px 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
      }
      .banner-btn:hover {
        background: #357abd;
      }
      .toolbar-left {
        display: flex;
        gap: 8px;
      }
      .toolbar-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .simple-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      .simple-toggle input {
        width: 16px;
        height: 16px;
      }
      .toolbar-btn {
        padding: 8px 16px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .toolbar-btn:hover {
        background: #357abd;
      }
      .validation-status {
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
      }
      .status-ok {
        background: #27ae60;
        color: #fff;
      }
      .status-error {
        background: #e74c3c;
        color: #fff;
      }
      .studio-content {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
      .studio-sidebar {
        width: 300px;
        background: #1f1f1f;
        border-right: 1px solid #333;
        overflow-y: auto;
      }
      .sidebar-header {
        padding: 16px;
        font-weight: 600;
        border-bottom: 1px solid #333;
      }
      .sidebar-tree {
        padding: 8px;
      }
      .tree-item {
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
        transition: background 0.2s;
      }
      .tree-item:hover {
        background: #2a2a2a;
      }
      .tree-item.active {
        background: #4a90e2;
      }
      .tree-item-add {
        margin-top: 16px;
        padding: 0;
      }
      .tree-icon {
        font-size: 16px;
      }
      .tree-label {
        flex: 1;
        font-size: 14px;
      }
      .museum-item {
        font-weight: 500;
      }
      .scene-item {
        padding-left: 32px;
        font-size: 13px;
      }
      .hotspot-item {
        padding-left: 56px;
        font-size: 12px;
        color: #ccc;
      }
      .tree-btn-add,
      .tree-btn-del {
        padding: 2px 6px;
        background: transparent;
        border: 1px solid #555;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .tree-item:hover .tree-btn-add,
      .tree-item:hover .tree-btn-del {
        opacity: 1;
      }
      .tree-btn-add:hover {
        background: #27ae60;
        border-color: #27ae60;
      }
      .tree-btn-del:hover {
        background: #e74c3c;
        border-color: #e74c3c;
      }
      .tree-btn-add-main {
        width: 100%;
        padding: 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      .tree-btn-add-main:hover {
        background: #357abd;
      }
      .studio-editor {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
      }
      .editor-header {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-group label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        color: #ccc;
      }
      .form-group input,
      .form-group select {
        width: 100%;
        padding: 10px;
        background: #252525;
        border: 1px solid #444;
        border-radius: 6px;
        color: #fff;
        font-size: 14px;
        font-family: inherit;
      }
      .input-hint {
        margin-top: 4px;
        color: #888;
        font-size: 12px;
      }
      .notice-box {
        padding: 12px;
        background: #252525;
        border-left: 3px solid #f39c12;
        border-radius: 6px;
        color: #f1c40f;
        font-size: 13px;
      }
      .form-group input:focus,
      .form-group select:focus {
        outline: none;
        border-color: #4a90e2;
      }
      .form-actions {
        margin-top: 24px;
      }
      .btn-preview {
        padding: 10px 20px;
        background: #27ae60;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .btn-preview:hover {
        background: #229954;
      }
      .btn-pick-hotspot {
        padding: 10px 20px;
        background: #f39c12;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 8px;
      }
      .btn-pick-hotspot:hover {
        background: #e67e22;
      }
      .btn-pick-reposition {
        padding: 10px 20px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .btn-pick-reposition:hover {
        background: #357abd;
      }
      .tree-item--flash {
        animation: tree-item-flash 0.3s ease-out;
      }
      @keyframes tree-item-flash {
        0% { background: rgba(74, 144, 226, 0.4); }
        100% { background: transparent; }
      }
      .studio-errors {
        max-height: 200px;
        overflow-y: auto;
        border-top: 1px solid #333;
        background: #0f0f0f;
      }
      .studio-errors-content {
        padding: 16px;
      }
      .errors-header {
        font-weight: 600;
        margin-bottom: 12px;
        color: #ff6b6b;
      }
      .errors-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .error-card-mini {
        padding: 12px;
        background: #252525;
        border-left: 3px solid #ff6b6b;
        border-radius: 6px;
        font-size: 12px;
      }
      .error-card-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
      }
      .error-icon {
        font-size: 14px;
      }
      .error-title {
        font-weight: 600;
        color: #ff6b6b;
      }
      .error-card-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
        color: #ccc;
      }
      .error-location {
        color: #4a90e2;
      }
      .error-field {
        color: #ffd93d;
      }
      .error-hint {
        color: #999;
        font-size: 11px;
      }
      .studio-toast {
        position: fixed;
        right: 20px;
        top: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        opacity: 0;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 30000;
      }
      .studio-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }
}