import type { Museum, Scene } from '../../types/config';
import type { PanoViewer } from '../../viewer/PanoViewer';
import { mountModal, type MountedModal } from '../Modal';
import { showToast } from '../toast';
import { copyText } from '../copyText';
import { isMouseDevice, isTouchDevice } from '../../utils/deviceDetect';
import { ZH_CN } from '../../i18n/zh-CN';
import { internalYawToWorldYaw, worldYawToInternalYaw } from '../../viewer/cubemapViewSemantics';
import {
  buildMailShareUrl,
  buildQqShareUrl,
  buildSceneShareText,
  buildSceneShareTitle,
  buildSceneShareUrl,
  buildWeiboShareUrl,
  type SceneSharePayload,
} from '../../app/sceneShare';

type DockCloseTab = 'info' | 'settings';

type DockLike = {
  setMoreOpen(open: boolean): void;
};

type OpenInfoModalOptions = {
  museumName: string;
  sceneName: string;
  onOpenBrand: () => void;
  onDockTabClose: (tab: DockCloseTab) => void;
};

type OpenSettingsModalOptions = {
  currentMuseum: Museum | null;
  currentScene: Scene | null;
  panoViewer: PanoViewer | null;
  bottomDock: DockLike | null;
  onToggleVrMode: (viewerContainer: HTMLElement) => Promise<boolean>;
  onDockTabClose: (tab: DockCloseTab) => void;
};

function openShareWindow(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function resolveSceneSharePayload(options: OpenSettingsModalOptions): SceneSharePayload | null {
  if (!options.currentMuseum || !options.currentScene) {
    return null;
  }

  const currentView = options.panoViewer?.getCurrentView();
  const shareView = currentView
    ? {
        yaw: internalYawToWorldYaw(options.currentScene, currentView.yaw),
        pitch: currentView.pitch,
        fov: currentView.fov,
      }
    : {
        yaw: options.currentScene.initialView?.yaw ?? 0,
        pitch: options.currentScene.initialView?.pitch ?? 0,
        fov: options.currentScene.initialView?.fov ?? 75,
      };

  return {
    baseUrl: window.location.href,
    museumId: options.currentMuseum.id,
    sceneId: options.currentScene.id,
    museumName: options.currentMuseum.name,
    sceneName: options.currentScene.name,
    view: shareView,
  };
}

async function copyShareUrl(payload: SceneSharePayload, successMessage: string): Promise<void> {
  const ok = await copyText(buildSceneShareUrl(payload));
  showToast(ok ? successMessage : '复制失败，请稍后重试', 1600);
}

function createInfoRow(labelText: string, valueText: string): HTMLDivElement {
  const row = document.createElement('div');
  const label = document.createElement('span');
  label.className = 'vr-modal-info-row-label';
  label.textContent = labelText;
  const value = document.createElement('span');
  value.textContent = valueText;
  row.appendChild(label);
  row.appendChild(value);
  return row;
}

export function openInfoModal(options: OpenInfoModalOptions): MountedModal {
  const content = document.createElement('div');
  content.className = 'vr-modal-info-list';
  content.appendChild(createInfoRow(ZH_CN.modal.museumLabel, options.museumName));
  content.appendChild(createInfoRow(ZH_CN.modal.sceneLabel, options.sceneName));
  content.appendChild(createInfoRow(ZH_CN.modal.collectDateLabel, '2025-12-27'));

  const copyrightRow = document.createElement('div');
  copyrightRow.className = 'vr-modal-info-copyright';
  const copyrightBtn = document.createElement('button');
  copyrightBtn.type = 'button';
  copyrightBtn.role = 'button';
  copyrightBtn.className = 'vr-modal-info-copyright-btn';
  copyrightBtn.textContent = ZH_CN.brand.copyright;
  copyrightRow.appendChild(copyrightBtn);
  content.appendChild(copyrightRow);

  let mounted: MountedModal | null = null;
  copyrightBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    mounted?.close();
    setTimeout(() => {
      options.onOpenBrand();
    }, 0);
  });

  mounted = mountModal({
    title: ZH_CN.modal.infoTitle,
    contentEl: content,
    onClose: () => {
      options.onDockTabClose('info');
    },
  });
  return mounted;
}

export function openSettingsModal(options: OpenSettingsModalOptions): MountedModal {
  const isTouch = isTouchDevice();
  const isMouse = isMouseDevice();

  const container = document.createElement('div');
  container.className = 'vr-modal-settings-list';

  const resetLabel = document.createElement('div');
  resetLabel.className = 'vr-modal-settings-item-label';
  resetLabel.textContent = ZH_CN.modal.viewLabel;

  const resetBtn = document.createElement('button');
  resetBtn.className = 'vr-modal-settings-row-btn';
  resetBtn.type = 'button';
  resetBtn.textContent = ZH_CN.modal.resetView;
  resetBtn.addEventListener('click', () => {
    if (!options.currentScene || !options.panoViewer) return;
    const iv = options.currentScene.initialView || { yaw: 0, pitch: 0, fov: 75 };
    const worldYaw = iv.yaw || 0;
    const internalYaw = worldYawToInternalYaw(options.currentScene, worldYaw);
    const pitch = iv.pitch || 0;
    const fov = iv.fov ?? 75;
    options.panoViewer.setView(internalYaw, pitch, fov);
  });

  const resetRow = document.createElement('div');
  resetRow.appendChild(resetLabel);
  resetRow.appendChild(resetBtn);

  const vrLabel = document.createElement('div');
  vrLabel.className = 'vr-modal-settings-item-label';
  vrLabel.textContent = ZH_CN.modal.vrLabel;

  const vrBtn = document.createElement('button');
  vrBtn.className = 'vr-modal-settings-row-btn';
  vrBtn.type = 'button';
  vrBtn.textContent = ZH_CN.modal.vrLabel;

  const syncVrBtnState = () => {
    const active = options.panoViewer?.isVrModeEnabled() ?? false;
    vrBtn.classList.toggle('is-on', active);
    vrBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
  };

  const handleVrModeChange = () => {
    syncVrBtnState();
  };

  if (isTouch) {
    syncVrBtnState();
    window.addEventListener('vr:mode-change', handleVrModeChange);
    vrBtn.addEventListener('click', async () => {
      if (!options.panoViewer) return;
      const viewerContainer = options.panoViewer.getDomElement();
      await options.onToggleVrMode(viewerContainer);
      syncVrBtnState();
    });
  } else if (isMouse) {
    vrBtn.classList.add('is-disabled');
    const handler = () => {
      showToast('移动端可体验此功能', 1500);
    };
    vrBtn.addEventListener('mouseenter', handler);
    vrBtn.addEventListener('click', handler);
  }

  const vrRow = document.createElement('div');
  vrRow.appendChild(vrLabel);
  vrRow.appendChild(vrBtn);

  const zoomLabel = document.createElement('div');
  zoomLabel.className = 'vr-modal-settings-item-label';
  zoomLabel.textContent = ZH_CN.modal.zoomLabel;

  const zoomGroup = document.createElement('div');
  zoomGroup.className = 'vr-modal-settings-quality';
  zoomGroup.style.gap = '8px';

  const zoomOutBtn = document.createElement('button');
  zoomOutBtn.className = 'vr-modal-settings-quality-btn';
  zoomOutBtn.textContent = ZH_CN.modal.zoomOut;
  zoomOutBtn.style.minWidth = '70px';

  const zoomInBtn = document.createElement('button');
  zoomInBtn.className = 'vr-modal-settings-quality-btn';
  zoomInBtn.textContent = ZH_CN.modal.zoomIn;
  zoomInBtn.style.minWidth = '70px';

  const handleZoomOut = () => {
    if (!options.panoViewer) return;
    const currentView = options.panoViewer.getCurrentView();
    const newFov = Math.min(120, currentView.fov * 1.12);
    options.panoViewer.setFov(newFov);
  };

  const handleZoomIn = () => {
    if (!options.panoViewer) return;
    const currentView = options.panoViewer.getCurrentView();
    const newFov = Math.max(30, currentView.fov / 1.12);
    options.panoViewer.setFov(newFov);
  };

  zoomOutBtn.addEventListener('click', handleZoomOut);
  zoomInBtn.addEventListener('click', handleZoomIn);
  zoomGroup.appendChild(zoomOutBtn);
  zoomGroup.appendChild(zoomInBtn);

  const zoomRow = document.createElement('div');
  zoomRow.appendChild(zoomLabel);
  zoomRow.appendChild(zoomGroup);

  const shareLabel = document.createElement('div');
  shareLabel.className = 'vr-modal-settings-item-label';
  shareLabel.textContent = '分享当前视角';

  const shareHint = document.createElement('div');
  shareHint.className = 'vr-modal-settings-share-hint';
  shareHint.textContent = '复制当前视角链接，或发到 QQ、微信、微博、邮件。移动端可直接调用系统分享。';

  const shareGroup = document.createElement('div');
  shareGroup.className = 'vr-modal-settings-share-group';

  const createShareButton = (label: string, action: string, onClick: () => void | Promise<void>) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'vr-modal-settings-row-btn vr-modal-settings-share-btn';
    button.textContent = label;
    button.setAttribute('data-share-action', action);
    button.addEventListener('click', () => {
      void onClick();
    });
    shareGroup.appendChild(button);
  };

  createShareButton('复制链接', 'copy', async () => {
    const payload = resolveSceneSharePayload(options);
    if (!payload) {
      showToast('当前场景尚未就绪，暂时无法分享', 1500);
      return;
    }
    await copyShareUrl(payload, '当前视角链接已复制');
  });

  createShareButton('系统分享', 'native', async () => {
    const payload = resolveSceneSharePayload(options);
    if (!payload) {
      showToast('当前场景尚未就绪，暂时无法分享', 1500);
      return;
    }

    const shareUrl = buildSceneShareUrl(payload);
    const canNativeShare =
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function';

    if (canNativeShare) {
      try {
        await navigator.share({
          title: buildSceneShareTitle(payload),
          text: buildSceneShareText(payload),
          url: shareUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    await copyShareUrl(payload, '当前设备不支持系统分享，已复制链接');
  });

  createShareButton('QQ', 'qq', () => {
    const payload = resolveSceneSharePayload(options);
    if (!payload) {
      showToast('当前场景尚未就绪，暂时无法分享', 1500);
      return;
    }
    openShareWindow(buildQqShareUrl(payload));
  });

  createShareButton('微信', 'wechat', async () => {
    const payload = resolveSceneSharePayload(options);
    if (!payload) {
      showToast('当前场景尚未就绪，暂时无法分享', 1500);
      return;
    }
    await copyShareUrl(payload, '链接已复制，请到微信中粘贴发送');
  });

  createShareButton('微博', 'weibo', () => {
    const payload = resolveSceneSharePayload(options);
    if (!payload) {
      showToast('当前场景尚未就绪，暂时无法分享', 1500);
      return;
    }
    openShareWindow(buildWeiboShareUrl(payload));
  });

  createShareButton('邮件', 'mail', () => {
    const payload = resolveSceneSharePayload(options);
    if (!payload) {
      showToast('当前场景尚未就绪，暂时无法分享', 1500);
      return;
    }
    window.location.href = buildMailShareUrl(payload);
  });

  const shareRow = document.createElement('div');
  shareRow.appendChild(shareLabel);
  shareRow.appendChild(shareHint);
  shareRow.appendChild(shareGroup);

  container.appendChild(resetRow);
  container.appendChild(zoomRow);
  container.appendChild(shareRow);
  container.appendChild(vrRow);

  options.bottomDock?.setMoreOpen(true);

  return mountModal({
    title: ZH_CN.modal.settingsTitle,
    contentEl: container,
    panelClassName: 'vr-modal-settings',
    onClose: () => {
      window.removeEventListener('vr:mode-change', handleVrModeChange);
      options.bottomDock?.setMoreOpen(false);
      options.onDockTabClose('settings');
    },
  });
}
