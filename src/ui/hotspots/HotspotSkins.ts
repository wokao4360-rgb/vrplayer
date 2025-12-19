export type HotspotSkinType = 'scene' | 'image' | 'info' | 'video';

export type HotspotSkinInput = {
  id: string;
  type: string;
  tooltip?: string;
  isGround?: boolean; // 是否为地面热点（pitch < -20）
};

function svgMagnifier(): string {
  return `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" />
  <path d="M16.2 16.2 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;
}

function svgPlay(): string {
  return `
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 7.5v9l8-4.5-8-4.5Z"/>
</svg>`;
}

function createTooltip(text?: string): HTMLDivElement {
  const t = document.createElement('div');
  t.className = 'hotspot-tooltip';
  t.textContent = text || '';
  t.setAttribute('role', 'tooltip');
  return t;
}

function createIconCircle(innerHtml: string, extraClass?: string): HTMLDivElement {
  const icon = document.createElement('div');
  icon.className = `hotspot-icon-circle${extraClass ? ` ${extraClass}` : ''}`;
  icon.innerHTML = innerHtml;
  return icon;
}

function svgArrow(): string {
  return `
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4v16M12 4l6 6M12 4l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

export function createHotspotSkin(input: HotspotSkinInput): {
  rootClassName: string;
  contentEl: HTMLElement;
  tooltipEl: HTMLDivElement;
} {
  const tooltipEl = createTooltip(input.tooltip);
  const isGround = input.isGround ?? false;

  // 默认兜底：圆点
  let rootClassName = 'hotspot hotspot--unknown';
  let contentEl: HTMLElement = document.createElement('div');
  contentEl.className = 'hotspot-dot';

  const type = input.type as HotspotSkinType;
  
  if (isGround) {
    // 地面热点：中空圆环（如视风格）
    rootClassName = 'hotspot hotspot--ground';
    const ring = document.createElement('div');
    ring.className = 'hotspot-ground-ring';
    contentEl = ring;
  } else if (type === 'scene') {
    // 非地面场景热点：箭头
    rootClassName = 'hotspot hotspot--scene';
    contentEl = createIconCircle(svgArrow(), 'hotspot-icon hotspot-icon-arrow');
  } else if (type === 'image') {
    rootClassName = 'hotspot hotspot--image';
    contentEl = createIconCircle(svgMagnifier(), 'hotspot-icon');
  } else if (type === 'info') {
    rootClassName = 'hotspot hotspot--info';
    const info = createIconCircle('<span class="hotspot-info-text">i</span>', 'hotspot-icon');
    contentEl = info;
  } else if (type === 'video') {
    rootClassName = 'hotspot hotspot--video';
    contentEl = createIconCircle(svgPlay(), 'hotspot-icon hotspot-icon-play');
  }

  return { rootClassName, contentEl, tooltipEl };
}



