/**
 * 配置错误清单面板
 * 当 config.json 校验失败时显示，列出所有错误并提供操作按钮
 * 显示用户友好的错误卡片，而不是技术性的路径信息
 */

import type { ValidationError } from '../utils/configValidator';
import { ERROR_TITLES, ERROR_HINTS } from '../utils/errorMessages';

export class ConfigErrorPanel {
  private element: HTMLElement;

  constructor(errors: ValidationError[], onRetry: () => void, onShowExample: () => void) {
    this.element = document.createElement('div');
    this.element.className = 'config-error-panel';
    this.render(errors, onRetry, onShowExample);
    this.applyStyles();
  }

  private render(errors: ValidationError[], onRetry: () => void, onShowExample: () => void): void {
    this.element.innerHTML = `
      <div class="error-panel-content">
        <div class="error-panel-header">
          <h2>⚠️ 配置错误</h2>
          <p class="error-summary">发现 ${errors.length} 个配置错误，请检查 config.json</p>
        </div>
        <div class="error-list">
          ${errors.map((error, index) => this.renderErrorCard(error, index)).join('')}
        </div>
        <div class="error-actions">
          <button class="btn btn-primary" id="retry-btn">🔄 刷新重试</button>
          <button class="btn btn-secondary" id="example-btn">📖 查看示例配置</button>
        </div>
      </div>
    `;

    // 绑定事件
    const retryBtn = this.element.querySelector('#retry-btn');
    const exampleBtn = this.element.querySelector('#example-btn');
    
    if (retryBtn) {
      retryBtn.addEventListener('click', onRetry);
    }
    
    if (exampleBtn) {
      exampleBtn.addEventListener('click', onShowExample);
    }
  }

  /**
   * 渲染单个错误卡片
   * 显示用户友好的错误信息，包括标题、位置、字段路径和修复提示
   */
  private renderErrorCard(error: ValidationError, index: number): string {
    const title = ERROR_TITLES[error.code] || '配置错误';
    const hint = ERROR_HINTS[error.code] || '请检查配置文件的格式和内容';
    
    // 构建位置信息
    const locationParts: string[] = [];
    if (error.museumName) {
      locationParts.push(`馆：${error.museumName}`);
    }
    if (error.sceneName) {
      locationParts.push(`场景：${error.sceneName}`);
    }
    const locationText = locationParts.length > 0 ? locationParts.join(' / ') : '全局配置';
    
    return `
      <div class="error-card">
        <div class="error-card-header">
          <span class="error-icon">❌</span>
          <span class="error-title">${this.escapeHtml(title)}</span>
        </div>
        <div class="error-card-body">
          <div class="error-location">
            <span class="location-icon">📍</span>
            <span class="location-text">${this.escapeHtml(locationText)}</span>
          </div>
          ${error.fieldName ? `
            <div class="error-field">
              <span class="field-label">字段：</span>
              <span class="field-name">${this.escapeHtml(error.fieldName)}</span>
            </div>
          ` : ''}
          <div class="error-path">
            <span class="path-label">技术路径：</span>
            <code class="path-code">${this.escapeHtml(error.path)}</code>
          </div>
          <div class="error-hint">
            <span class="hint-icon">💡</span>
            <span class="hint-text">${this.escapeHtml(hint)}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * HTML 转义，防止 XSS
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .config-error-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
      }
      .error-panel-content {
        max-width: 800px;
        width: 100%;
        background: #1a1a1a;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      }
      .error-panel-header {
        margin-bottom: 24px;
        text-align: center;
      }
      .error-panel-header h2 {
        font-size: 24px;
        color: #ff6b6b;
        margin-bottom: 8px;
      }
      .error-summary {
        color: #ccc;
        font-size: 14px;
      }
      .error-list {
        max-height: 400px;
        overflow-y: auto;
        margin-bottom: 24px;
        background: #0f0f0f;
        border-radius: 8px;
        padding: 16px;
      }
      .error-card {
        padding: 16px;
        margin-bottom: 12px;
        background: #252525;
        border-left: 4px solid #ff6b6b;
        border-radius: 8px;
        transition: background 0.2s;
      }
      .error-card:hover {
        background: #2a2a2a;
      }
      .error-card:last-child {
        margin-bottom: 0;
      }
      .error-card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .error-icon {
        font-size: 20px;
      }
      .error-title {
        font-size: 16px;
        font-weight: 600;
        color: #ff6b6b;
      }
      .error-card-body {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .error-location {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #4a90e2;
      }
      .location-icon {
        font-size: 14px;
      }
      .location-text {
        font-weight: 500;
      }
      .error-field {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #ccc;
      }
      .field-label {
        color: #999;
      }
      .field-name {
        color: #ffd93d;
        font-weight: 500;
      }
      .error-path {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
      .path-label {
        color: #666;
        white-space: nowrap;
      }
      .path-code {
        font-family: 'Courier New', monospace;
        color: #888;
        word-break: break-all;
        background: #1a1a1a;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
      }
      .error-hint {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-top: 8px;
        padding: 10px;
        background: #1a1a1a;
        border-radius: 6px;
        border-left: 3px solid #4a90e2;
      }
      .hint-icon {
        font-size: 16px;
        flex-shrink: 0;
        margin-top: 2px;
      }
      .hint-text {
        font-size: 13px;
        color: #ccc;
        line-height: 1.5;
      }
      .error-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
      }
      .btn-primary {
        background: #4a90e2;
        color: #fff;
      }
      .btn-primary:hover {
        background: #357abd;
      }
      .btn-primary:active {
        transform: scale(0.98);
      }
      .btn-secondary {
        background: #555;
        color: #fff;
      }
      .btn-secondary:hover {
        background: #666;
      }
      .btn-secondary:active {
        transform: scale(0.98);
      }
      @media (max-width: 600px) {
        .error-panel-content {
          padding: 16px;
        }
        .error-actions {
          flex-direction: column;
        }
        .btn {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }
}





















