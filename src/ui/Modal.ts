export type MountModalOptions = {
  title: string;
  /**
   * 传入已构建好的内容节点，或 HTML 字符串
   */
  contentEl?: HTMLElement;
  contentHtml?: string;
  /**
   * 关闭回调（包括点击遮罩、点 ×、按 ESC）
   */
  onClose?: () => void;
  /**
   * 可选：为 panel 增加额外 class（例如区分“信息/设置”）
   */
  panelClassName?: string;
};

export type MountedModal = {
  close: () => void;
};

/**
 * 轻量级全局弹窗挂载工具
 * - overlay：全屏遮罩
 * - panel：白色/浅色卡片，包含标题与右上角 ×
 * - 点击遮罩、按 ESC 均会关闭
 * - 关闭时从 DOM 移除，并清理所有事件监听（避免残留拦截交互）
 */
export function mountModal(options: MountModalOptions): MountedModal {
  const { title, contentEl, contentHtml, onClose, panelClassName } = options;

  // 避免双重创建
  const overlay = document.createElement('div');
  overlay.className = 'vr-modal-overlay';

  const panel = document.createElement('div');
  panel.className = 'vr-modal-panel';
  if (panelClassName) {
    panel.classList.add(panelClassName);
  }

  const header = document.createElement('div');
  header.className = 'vr-modal-header';

  const titleEl = document.createElement('div');
  titleEl.className = 'vr-modal-header-title';
  titleEl.textContent = title;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'vr-modal-header-close vr-icon-btn';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', '关闭弹窗');
  closeBtn.innerHTML = '×';

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  const body = document.createElement('div');
  body.className = 'vr-modal-body';
  if (contentEl) {
    body.appendChild(contentEl);
  } else if (contentHtml) {
    body.innerHTML = contentHtml;
  }

  panel.appendChild(header);
  panel.appendChild(body);
  overlay.appendChild(panel);

  // 统一插入到 body 底部，确保层级最高且不干扰其它容器
  document.body.appendChild(overlay);

  // 如果是"更多"弹窗，使用两段式 class 确保动效稳定触发
  if (panelClassName === 'vr-modal-settings') {
    // 初始状态已通过 CSS 设置（opacity 0 + translateY 16px）
    // 下一帧添加 is-in class 触发过渡
    requestAnimationFrame(() => {
      panel.classList.add('is-in');
    });
  }

  let closed = false;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      api.close();
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
    // 只在点击遮罩区域时关闭，点击 panel 内部不关闭
    if (e.target === overlay) {
      api.close();
    }
  };

  const handleCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    api.close();
  };

  window.addEventListener('keydown', handleKeyDown);
  overlay.addEventListener('click', handleOverlayClick);
  closeBtn.addEventListener('click', handleCloseClick);

  const api: MountedModal = {
    close: () => {
      if (closed) return;
      closed = true;

      // 清理事件监听
      window.removeEventListener('keydown', handleKeyDown);
      overlay.removeEventListener('click', handleOverlayClick);
      closeBtn.removeEventListener('click', handleCloseClick);

      // 从 DOM 移除，避免遮挡后续交互
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }

      if (onClose) {
        try {
          onClose();
        } catch {
          // onClose 失败不影响主流程
        }
      }
    },
  };

  return api;
}


