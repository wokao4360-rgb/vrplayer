import type { SceneTransitionFrame } from '../app/sceneTransitionTimeline.ts';

type TravelTransitionOverlayStartArgs = {
  fromImage?: string;
  targetImage?: string;
};

const STYLE_ID = 'vr-travel-transition-overlay-style';

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .vr-travel-transition {
      position: fixed;
      inset: 0;
      z-index: 4350;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      overflow: hidden;
      transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), visibility 180ms cubic-bezier(0.16, 1, 0.3, 1);
      --vr-travel-blur-px: 24px;
      --vr-travel-glass-alpha: 0.24;
      --vr-travel-from-shift: 0%;
      --vr-travel-to-shift: 0%;
      --vr-travel-from-scale: 1.02;
      --vr-travel-to-scale: 1.04;
      --vr-travel-from-shear: 0deg;
      --vr-travel-to-shear: 0deg;
      --vr-travel-seam-x: 100%;
      --vr-travel-seam-width: 18vw;
      --vr-travel-seam-opacity: 0.24;
      --vr-travel-occlusion-opacity: 0.18;
      --vr-travel-to-opacity: 0;
      --vr-travel-badge-opacity: 0.88;
    }

    .vr-travel-transition.is-active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .vr-travel-transition__layer,
    .vr-travel-transition__glass,
    .vr-travel-transition__grain,
    .vr-travel-transition__seam,
    .vr-travel-transition__occlusion,
    .vr-travel-transition__badge {
      position: absolute;
      inset: 0;
    }

    .vr-travel-transition__layer {
      inset: -7%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      will-change: transform, filter, opacity, clip-path;
    }

    .vr-travel-transition__from {
      filter: blur(var(--vr-travel-blur-px)) saturate(0.9) brightness(0.92);
      transform:
        translate3d(var(--vr-travel-from-shift), 0, 0)
        scale(var(--vr-travel-from-scale))
        skewX(var(--vr-travel-from-shear));
    }

    .vr-travel-transition__to {
      opacity: var(--vr-travel-to-opacity);
      filter: blur(calc(var(--vr-travel-blur-px) * 0.56)) saturate(0.98) brightness(0.98);
      transform:
        translate3d(var(--vr-travel-to-shift), 0, 0)
        scale(var(--vr-travel-to-scale))
        skewX(var(--vr-travel-to-shear));
    }

    .vr-travel-transition__glass {
      background:
        radial-gradient(circle at 50% 18%, rgba(255, 246, 232, 0.16), transparent 42%),
        linear-gradient(180deg, rgba(22, 17, 12, 0.08), rgba(22, 17, 12, 0.24));
      backdrop-filter: blur(calc(var(--vr-travel-blur-px) * 0.32));
      opacity: var(--vr-travel-glass-alpha);
      mix-blend-mode: screen;
    }

    .vr-travel-transition__grain {
      opacity: 0.12;
      mix-blend-mode: soft-light;
      background-image:
        radial-gradient(circle at 18% 24%, rgba(255,255,255,0.4) 0, transparent 18%),
        radial-gradient(circle at 80% 16%, rgba(255,255,255,0.32) 0, transparent 14%),
        radial-gradient(circle at 52% 78%, rgba(255,255,255,0.18) 0, transparent 22%);
    }

    .vr-travel-transition__occlusion {
      width: var(--vr-travel-seam-width);
      left: var(--vr-travel-seam-x);
      transform: translateX(-50%);
      opacity: var(--vr-travel-occlusion-opacity);
      background:
        linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.28) 42%, rgba(255,255,255,0.14) 72%, rgba(255,255,255,0));
      filter: blur(16px);
      mix-blend-mode: multiply;
      will-change: transform, opacity, left;
    }

    .vr-travel-transition[data-wipe-from="right"] .vr-travel-transition__occlusion {
      transform: translateX(-50%) scaleX(-1);
    }

    .vr-travel-transition__seam {
      width: var(--vr-travel-seam-width);
      left: var(--vr-travel-seam-x);
      transform: translateX(-50%);
      opacity: var(--vr-travel-seam-opacity);
      background:
        linear-gradient(90deg, rgba(255,255,255,0), rgba(255,244,230,0.72) 40%, rgba(210,169,109,0.32) 58%, rgba(255,255,255,0));
      filter: blur(10px);
      will-change: transform, opacity, left;
    }

    .vr-travel-transition[data-wipe-from="right"] .vr-travel-transition__seam {
      transform: translateX(-50%) scaleX(-1);
    }

    .vr-travel-transition__badge {
      inset: auto 20px 22px auto;
      width: auto;
      height: auto;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(25, 21, 15, 0.24);
      border: 1px solid rgba(255,255,255,0.16);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
      backdrop-filter: blur(14px);
      color: rgba(255, 248, 240, 0.92);
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: var(--vr-travel-badge-opacity);
      transition: opacity 180ms ease;
    }

    .vr-travel-transition__badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle, #f6d7aa 0%, #d2a96d 72%, rgba(210,169,109,0.14) 100%);
      box-shadow: 0 0 18px rgba(210, 169, 109, 0.64);
      flex: none;
    }

    @media (max-width: 720px) {
      .vr-travel-transition__badge {
        right: 14px;
        bottom: calc(16px + env(safe-area-inset-bottom, 0px));
        font-size: 10px;
        padding: 9px 12px;
      }
    }
  `;

  document.head.appendChild(style);
}

export class TravelTransitionOverlay {
  private readonly element: HTMLDivElement;
  private readonly fromLayer: HTMLDivElement;
  private readonly toLayer: HTMLDivElement;
  private readonly glassLayer: HTMLDivElement;
  private readonly grainLayer: HTMLDivElement;
  private readonly seamLayer: HTMLDivElement;
  private readonly occlusionLayer: HTMLDivElement;
  private readonly badge: HTMLDivElement;
  private readonly badgeText: HTMLSpanElement;
  private active = false;
  private targetImageReady = false;

  constructor() {
    ensureStyles();

    this.element = document.createElement('div');
    this.element.className = 'vr-travel-transition';
    this.element.dataset.wipeFrom = 'right';

    this.fromLayer = document.createElement('div');
    this.fromLayer.className = 'vr-travel-transition__layer vr-travel-transition__from';

    this.toLayer = document.createElement('div');
    this.toLayer.className = 'vr-travel-transition__layer vr-travel-transition__to';

    this.glassLayer = document.createElement('div');
    this.glassLayer.className = 'vr-travel-transition__glass';

    this.grainLayer = document.createElement('div');
    this.grainLayer.className = 'vr-travel-transition__grain';

    this.occlusionLayer = document.createElement('div');
    this.occlusionLayer.className = 'vr-travel-transition__occlusion';

    this.seamLayer = document.createElement('div');
    this.seamLayer.className = 'vr-travel-transition__seam';

    this.badge = document.createElement('div');
    this.badge.className = 'vr-travel-transition__badge';
    const dot = document.createElement('span');
    dot.className = 'vr-travel-transition__badge-dot';
    this.badgeText = document.createElement('span');
    this.badgeText.textContent = 'Moving to next waypoint';
    this.badge.append(dot, this.badgeText);

    this.element.append(
      this.fromLayer,
      this.toLayer,
      this.glassLayer,
      this.grainLayer,
      this.occlusionLayer,
      this.seamLayer,
      this.badge,
    );
  }

  getElement(): HTMLElement {
    return this.element;
  }

  start(args: TravelTransitionOverlayStartArgs): void {
    this.active = true;
    this.targetImageReady = Boolean(args.targetImage);
    this.setImage(this.fromLayer, args.fromImage);
    this.setImage(this.toLayer, args.targetImage);
    this.badgeText.textContent = 'Moving to next waypoint';
    this.element.classList.add('is-active');
  }

  setTargetImage(imageUrl?: string): void {
    this.targetImageReady = Boolean(imageUrl);
    this.setImage(this.toLayer, imageUrl);
  }

  render(frame: SceneTransitionFrame): void {
    if (!this.active) {
      return;
    }

    this.element.dataset.stage = frame.stage;
    this.element.dataset.wipeFrom = frame.wipeFrom;
    this.element.style.setProperty('--vr-travel-blur-px', `${Math.max(frame.blurPx, 0)}px`);
    this.element.style.setProperty('--vr-travel-glass-alpha', String(frame.glassAlpha));
    this.element.style.setProperty('--vr-travel-from-shift', `${frame.fromShiftPercent}%`);
    this.element.style.setProperty('--vr-travel-to-shift', `${frame.toShiftPercent}%`);
    this.element.style.setProperty('--vr-travel-from-scale', String(frame.zoomScale));
    this.element.style.setProperty(
      '--vr-travel-to-scale',
      String(Number((1.018 + (1 - frame.revealProgress) * 0.016).toFixed(4))),
    );
    this.element.style.setProperty('--vr-travel-from-shear', `${frame.shearDeg * 0.45}deg`);
    this.element.style.setProperty('--vr-travel-to-shear', `${frame.shearDeg}deg`);
    this.element.style.setProperty(
      '--vr-travel-seam-width',
      `${Math.max(12, 10 + frame.distortionStrength * 180)}vw`,
    );
    this.element.style.setProperty('--vr-travel-seam-opacity', String(0.12 + frame.motionBlurStrength));
    this.element.style.setProperty('--vr-travel-occlusion-opacity', String(frame.occlusionOpacity));
    this.element.style.setProperty(
      '--vr-travel-badge-opacity',
      frame.stage === 'settle' ? '0.42' : '0.88',
    );
    this.element.style.setProperty(
      '--vr-travel-to-opacity',
      this.targetImageReady ? String(Math.max(frame.revealProgress, 0.001)) : '0',
    );
    this.badgeText.textContent = frame.stage === 'turn-in'
      ? 'Turning into travel line'
      : frame.stage === 'travel'
        ? 'Traveling through scene shell'
        : 'Settling on target scene';

    const reveal = clamp(frame.revealProgress, 0, 1);
    const seamPercent = frame.wipeFrom === 'right'
      ? 100 - reveal * 100
      : reveal * 100;
    this.element.style.setProperty('--vr-travel-seam-x', `${seamPercent}%`);

    if (frame.wipeFrom === 'right') {
      this.toLayer.style.clipPath = `inset(0 0 0 ${Math.max(0, (1 - reveal) * 100)}%)`;
    } else {
      this.toLayer.style.clipPath = `inset(0 ${Math.max(0, (1 - reveal) * 100)}% 0 0)`;
    }
  }

  hide(): void {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.element.classList.remove('is-active');
    window.setTimeout(() => {
      if (this.active) {
        return;
      }
      this.setImage(this.fromLayer, undefined);
      this.setImage(this.toLayer, undefined);
      this.toLayer.style.clipPath = 'inset(0 100% 0 0)';
    }, 220);
  }

  isActive(): boolean {
    return this.active;
  }

  private setImage(element: HTMLElement, imageUrl?: string): void {
    element.style.backgroundImage = imageUrl ? `url("${imageUrl}")` : '';
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
