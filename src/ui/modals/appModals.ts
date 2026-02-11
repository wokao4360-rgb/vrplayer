import type { Scene } from '../../types/config';
import type { PanoViewer } from '../../viewer/PanoViewer';
import { mountModal, type MountedModal } from '../Modal';
import { showToast } from '../toast';
import { isMouseDevice, isTouchDevice } from '../../utils/deviceDetect';
import { getPreferredQuality, setPreferredQuality, type QualityLevel } from '../../utils/qualityPreference';
import { ZH_CN } from '../../i18n/zh-CN';

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
  currentScene: Scene | null;
  panoViewer: PanoViewer | null;
  bottomDock: DockLike | null;
  onToggleVrMode: (viewerContainer: HTMLElement) => Promise<boolean>;
  onDockTabClose: (tab: DockCloseTab) => void;
};

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
  const currentQuality = getPreferredQuality();

  const container = document.createElement('div');
  container.className = 'vr-modal-settings-list';

  const qualityLabel = document.createElement('div');
  qualityLabel.className = 'vr-modal-settings-item-label';
  qualityLabel.textContent = ZH_CN.modal.qualityLabel;

  const qualityGroup = document.createElement('div');
  qualityGroup.className = 'vr-modal-settings-quality';

  const highBtn = document.createElement('button');
  highBtn.className = 'vr-modal-settings-quality-btn';
  highBtn.textContent = ZH_CN.modal.qualityHigh;
  highBtn.dataset.level = 'high';

  const lowBtn = document.createElement('button');
  lowBtn.className = 'vr-modal-settings-quality-btn';
  lowBtn.textContent = ZH_CN.modal.qualityLow;
  lowBtn.dataset.level = 'low';

  const applyQualityActive = (level: QualityLevel) => {
    highBtn.classList.toggle('is-active', level === 'high');
    lowBtn.classList.toggle('is-active', level === 'low');
  };
  applyQualityActive(currentQuality);

  const handleQualityClick = (level: QualityLevel) => {
    if (!options.currentScene || !options.panoViewer) return;
    const prev = getPreferredQuality();
    if (prev === level) return;
    setPreferredQuality(level);
    applyQualityActive(level);
    options.panoViewer.loadScene(options.currentScene, { preserveView: true });
  };
  highBtn.addEventListener('click', () => handleQualityClick('high'));
  lowBtn.addEventListener('click', () => handleQualityClick('low'));
  qualityGroup.appendChild(highBtn);
  qualityGroup.appendChild(lowBtn);

  const qualityRow = document.createElement('div');
  qualityRow.appendChild(qualityLabel);
  qualityRow.appendChild(qualityGroup);

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
    const internalYaw = -worldYaw;
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
  };

  if (isTouch) {
    syncVrBtnState();
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

  container.appendChild(qualityRow);
  container.appendChild(resetRow);
  container.appendChild(zoomRow);
  container.appendChild(vrRow);

  options.bottomDock?.setMoreOpen(true);

  return mountModal({
    title: ZH_CN.modal.settingsTitle,
    contentEl: container,
    panelClassName: 'vr-modal-settings',
    onClose: () => {
      options.bottomDock?.setMoreOpen(false);
      options.onDockTabClose('settings');
    },
  });
}
