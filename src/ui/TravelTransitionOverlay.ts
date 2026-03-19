import {
  ClampToEdgeWrapping,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  Vector2,
  WebGLRenderer,
} from '../vendor/three-core.ts';
import type { SceneTransitionFrame } from '../app/sceneTransitionTimeline.ts';

type TravelTransitionOverlayStartArgs = {
  fromImage?: string;
  targetImage?: string;
};

type TextureSlot = 'from' | 'to';

const STYLE_ID = 'vr-travel-transition-overlay-style';
const CLEAR_DELAY_MS = 220;

const VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;

  uniform sampler2D uFromTex;
  uniform sampler2D uToTex;
  uniform vec2 uResolution;
  uniform float uRevealProgress;
  uniform float uTargetMixProgress;
  uniform float uProgress;
  uniform float uTravelDirX;
  uniform float uCurveStrength;
  uniform float uWipeSoftness;
  uniform float uDistortionStrength;
  uniform float uBlurStrength;
  uniform float uMotionBlurStrength;
  uniform float uGlassAlpha;
  uniform float uOcclusionOpacity;
  uniform float uZoomScale;
  uniform float uFromShift;
  uniform float uToShift;
  uniform float uShearRad;
  uniform float uSettleStrength;
  uniform float uTargetMixReady;

  varying vec2 vUv;

  vec2 clampUv(vec2 uv) {
    return clamp(uv, vec2(0.001), vec2(0.999));
  }

  vec2 coverUv(vec2 uv, float scale, float shiftPercent, float shearRad) {
    vec2 p = uv - 0.5;
    p.x += shiftPercent * 0.01;
    p.y += p.x * tan(shearRad) * 0.18;
    p /= max(scale, 0.0001);
    return clampUv(p + 0.5);
  }

  vec4 sampleLayer(sampler2D tex, vec2 uv, vec2 dir, float blurPx) {
    vec2 px = 1.0 / max(uResolution, vec2(1.0));
    vec2 delta = dir * blurPx * px;
    vec4 color = texture2D(tex, clampUv(uv)) * 0.34;
    color += texture2D(tex, clampUv(uv + delta * 0.45)) * 0.23;
    color += texture2D(tex, clampUv(uv - delta * 0.45)) * 0.23;
    color += texture2D(tex, clampUv(uv + delta * 0.9)) * 0.1;
    color += texture2D(tex, clampUv(uv - delta * 0.9)) * 0.1;
    return color;
  }

  void main() {
    float reveal = clamp(uRevealProgress, 0.0, 1.0);
    float mixProgress = clamp(uTargetMixProgress, 0.0, 1.0);
    float settleStrength = clamp(uSettleStrength, 0.0, 1.0);
    float soft = max(0.012, uWipeSoftness * 0.55);
    float seam = uTravelDirX > 0.0 ? 1.0 - reveal : reveal;
    float mask = uTravelDirX > 0.0
      ? smoothstep(seam - soft, seam + soft, vUv.x)
      : 1.0 - smoothstep(seam - soft, seam + soft, vUv.x);
    float seamDistance = abs(vUv.x - seam);
    float edge = 1.0 - smoothstep(0.0, soft * 2.4, seamDistance);
    float bend = sin((vUv.y + uProgress * 0.28) * 3.14159265) * 0.52
      + sin((vUv.y * 2.0 - 1.0) * 1.57079632) * 0.22;
    vec2 travelDir = vec2(uTravelDirX, bend * (0.04 + uCurveStrength * 0.06));
    float distortion = edge * uDistortionStrength * (0.022 + uCurveStrength * 0.03);
    float motionAmount = uMotionBlurStrength * 8.0;

    vec2 fromUv = coverUv(vUv, uZoomScale, uFromShift, uShearRad * 0.55);
    vec2 toUv = coverUv(vUv, max(1.0, uZoomScale - 0.012), uToShift, uShearRad);

    fromUv += travelDir * distortion * 0.65;
    toUv += travelDir * distortion * 1.08;
    toUv.y += edge * uCurveStrength * 0.01 * bend;

    vec2 smearDir = normalize(vec2(uTravelDirX, bend * 0.34 + 0.0001));
    float corridor = 1.0 - smoothstep(0.06, 0.34, abs(vUv.y - 0.5 - bend * 0.035));
    float centerFocus = 1.0 - smoothstep(
      0.08,
      0.72,
      length(vUv - vec2(0.5 - uTravelDirX * 0.04 * (1.0 - mixProgress), 0.48 + bend * 0.03))
    );
    float revealMask = clamp(mask + corridor * mixProgress * 0.34 + centerFocus * mixProgress * 0.24, 0.0, 1.0);
    vec4 fromColor = sampleLayer(
      uFromTex,
      fromUv,
      smearDir,
      max(0.0, uBlurStrength * (0.56 + uMotionBlurStrength * 0.42))
    );
    vec4 toColor = sampleLayer(
      uToTex,
      toUv,
      smearDir,
      max(0.0, uBlurStrength * (0.42 - reveal * 0.28) + motionAmount)
    );
    vec4 toSharp = texture2D(uToTex, clampUv(toUv));
    toColor = mix(fromColor, toColor, uTargetMixReady * mixProgress);
    toColor.rgb = mix(toColor.rgb, toSharp.rgb, clamp(settleStrength * 0.76 + mixProgress * 0.22, 0.0, 1.0));

    vec4 color = mix(fromColor, toColor, revealMask * uTargetMixReady);

    float occlusion = edge * uOcclusionOpacity;
    color.rgb *= 1.0 - occlusion * 0.78;
    color.rgb += edge * vec3(1.0, 0.94, 0.84) * 0.08 * uGlassAlpha * (0.82 + mixProgress * 0.18);

    float radial = smoothstep(0.92, 0.12, length(vUv - vec2(0.5, 0.44)));
    float topGlow = smoothstep(0.92, 0.18, 1.0 - vUv.y);
    vec3 glassTint = vec3(1.0, 0.96, 0.9);
    color.rgb += glassTint * (0.05 * uGlassAlpha * radial + 0.03 * uGlassAlpha * topGlow) * (1.0 - settleStrength * 0.55);
    color.rgb *= mix(0.9, 1.0, radial) * mix(0.96, 1.02, settleStrength);
    color.rgb = mix(color.rgb, color.rgb * 1.04 + vec3(0.014, 0.01, 0.006), settleStrength * 0.32);

    gl_FragColor = vec4(color.rgb, 1.0);
  }
`;

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
      --vr-travel-backdrop-blur: 28px;
      --vr-travel-backdrop-scale: 1.03;
      --vr-travel-backdrop-shift: 0%;
      --vr-travel-from-backdrop-opacity: 1;
      --vr-travel-backdrop-brightness: 0.92;
      --vr-travel-target-backdrop-blur: 18px;
      --vr-travel-target-backdrop-scale: 1.01;
      --vr-travel-target-backdrop-shift: 0%;
      --vr-travel-target-backdrop-opacity: 0;
      --vr-travel-target-reveal-inset: 100%;
      --vr-travel-badge-opacity: 0.88;
    }

    .vr-travel-transition.is-active {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .vr-travel-transition__fallback,
    .vr-travel-transition__canvas {
      position: absolute;
      inset: 0;
    }

    .vr-travel-transition__fallback {
      inset: -7%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      will-change: transform, filter, opacity, clip-path;
    }

    .vr-travel-transition__fallback--from {
      filter: blur(var(--vr-travel-backdrop-blur)) saturate(0.92) brightness(var(--vr-travel-backdrop-brightness));
      transform: translate3d(var(--vr-travel-backdrop-shift), 0, 0) scale(var(--vr-travel-backdrop-scale));
      opacity: var(--vr-travel-from-backdrop-opacity);
    }

    .vr-travel-transition__fallback--to {
      filter: blur(var(--vr-travel-target-backdrop-blur)) saturate(0.98) brightness(0.98);
      transform: translate3d(var(--vr-travel-target-backdrop-shift), 0, 0) scale(var(--vr-travel-target-backdrop-scale));
      opacity: var(--vr-travel-target-backdrop-opacity);
    }

    .vr-travel-transition[data-wipe-from="right"] .vr-travel-transition__fallback--to {
      clip-path: inset(0 0 0 var(--vr-travel-target-reveal-inset));
    }

    .vr-travel-transition[data-wipe-from="left"] .vr-travel-transition__fallback--to {
      clip-path: inset(0 var(--vr-travel-target-reveal-inset) 0 0);
    }

    .vr-travel-transition__canvas canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .vr-travel-transition__badge {
      position: absolute;
      right: 20px;
      bottom: 22px;
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
  private readonly fromBackdrop: HTMLDivElement;
  private readonly toBackdrop: HTMLDivElement;
  private readonly canvasHost: HTMLDivElement;
  private readonly badge: HTMLDivElement;
  private readonly badgeText: HTMLSpanElement;
  private renderer: WebGLRenderer | null = null;
  private scene: Scene | null = null;
  private camera: OrthographicCamera | null = null;
  private material: ShaderMaterial | null = null;
  private quad: Mesh | null = null;
  private readonly resolution = new Vector2(1, 1);
  private active = false;
  private webglEnabled = false;
  private targetImageLoaded = false;
  private currentSize = { width: 0, height: 0 };
  private clearTimer: number | null = null;
  private fromTexture: Texture | null = null;
  private toTexture: Texture | null = null;
  private fromLoadToken = 0;
  private toLoadToken = 0;
  private currentFromUrl?: string;
  private currentToUrl?: string;

  constructor() {
    ensureStyles();

    this.element = document.createElement('div');
    this.element.className = 'vr-travel-transition';
    this.element.dataset.wipeFrom = 'right';

    this.fromBackdrop = document.createElement('div');
    this.fromBackdrop.className = 'vr-travel-transition__fallback vr-travel-transition__fallback--from';

    this.toBackdrop = document.createElement('div');
    this.toBackdrop.className = 'vr-travel-transition__fallback vr-travel-transition__fallback--to';

    this.canvasHost = document.createElement('div');
    this.canvasHost.className = 'vr-travel-transition__canvas';

    this.badge = document.createElement('div');
    this.badge.className = 'vr-travel-transition__badge';
    const dot = document.createElement('span');
    dot.className = 'vr-travel-transition__badge-dot';
    this.badgeText = document.createElement('span');
    this.badgeText.textContent = 'Traveling to next waypoint';
    this.badge.append(dot, this.badgeText);

    this.element.append(this.fromBackdrop, this.toBackdrop, this.canvasHost, this.badge);
    this.initWebgl();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  start(args: TravelTransitionOverlayStartArgs): void {
    if (this.clearTimer !== null) {
      window.clearTimeout(this.clearTimer);
      this.clearTimer = null;
    }
    this.active = true;
    this.targetImageLoaded = false;
    this.currentFromUrl = args.fromImage;
    this.currentToUrl = args.targetImage;
    this.setBackdropImage(this.fromBackdrop, args.fromImage);
    this.setBackdropImage(this.toBackdrop, args.targetImage);
    this.element.classList.add('is-active');
    this.badgeText.textContent = 'Turning into travel line';
    void this.loadTexture('from', args.fromImage);
    void this.loadTexture('to', args.targetImage);
  }

  setTargetImage(imageUrl?: string): void {
    this.currentToUrl = imageUrl;
    this.setBackdropImage(this.toBackdrop, imageUrl);
    void this.loadTexture('to', imageUrl);
  }

  render(frame: SceneTransitionFrame): void {
    if (!this.active) {
      return;
    }

    this.updateFallbackMotion(frame);
    this.element.dataset.wipeFrom = frame.wipeFrom;
    this.badgeText.textContent = frame.stage === 'turn-in'
      ? 'Turning into travel line'
      : frame.stage === 'travel'
        ? 'Traveling through scene shell'
        : 'Settling on target scene';
    this.element.style.setProperty(
      '--vr-travel-badge-opacity',
      frame.stage === 'settle' ? '0.46' : '0.88',
    );

    if (!this.webglEnabled || !this.renderer || !this.material) {
      return;
    }

    this.ensureRendererSize();

    const uniforms = this.material.uniforms;
    uniforms.uProgress.value = frame.progress;
    uniforms.uRevealProgress.value = frame.revealProgress;
    uniforms.uTargetMixProgress.value = frame.targetMixProgress;
    uniforms.uTravelDirX.value = frame.travelDirX;
    uniforms.uCurveStrength.value = frame.curveStrength;
    uniforms.uWipeSoftness.value = frame.wipeSoftness;
    uniforms.uDistortionStrength.value = frame.distortionStrength;
    uniforms.uBlurStrength.value = frame.blurPx;
    uniforms.uMotionBlurStrength.value = frame.motionBlurStrength;
    uniforms.uGlassAlpha.value = frame.glassAlpha;
    uniforms.uOcclusionOpacity.value = frame.occlusionOpacity;
    uniforms.uZoomScale.value = frame.zoomScale;
    uniforms.uFromShift.value = frame.fromShiftPercent;
    uniforms.uToShift.value = frame.toShiftPercent;
    uniforms.uShearRad.value = degreesToRadians(frame.shearDeg);
    uniforms.uSettleStrength.value = frame.settleStrength;
    uniforms.uTargetMixReady.value = frame.targetReady && this.targetImageLoaded ? 1 : 0;

    this.renderer.render(this.scene!, this.camera!);
  }

  hide(): void {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.element.classList.remove('is-active');
    this.clearTimer = window.setTimeout(() => {
      if (this.active) {
        return;
      }
      this.setBackdropImage(this.fromBackdrop, undefined);
      this.setBackdropImage(this.toBackdrop, undefined);
      this.badgeText.textContent = 'Traveling to next waypoint';
      this.targetImageLoaded = false;
      this.currentFromUrl = undefined;
      this.currentToUrl = undefined;
    }, CLEAR_DELAY_MS);
  }

  isActive(): boolean {
    return this.active;
  }

  private initWebgl(): void {
    try {
      this.renderer = new WebGLRenderer({
        antialias: false,
        alpha: true,
        premultipliedAlpha: true,
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      this.renderer.setClearColor(0x000000, 0);

      this.scene = new Scene();
      this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.material = new ShaderMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uFromTex: { value: null },
          uToTex: { value: null },
          uResolution: { value: this.resolution },
          uRevealProgress: { value: 0 },
          uTargetMixProgress: { value: 0 },
          uProgress: { value: 0 },
          uTravelDirX: { value: 1 },
          uCurveStrength: { value: 0 },
          uWipeSoftness: { value: 0.16 },
          uDistortionStrength: { value: 0.22 },
          uBlurStrength: { value: 24 },
          uMotionBlurStrength: { value: 0.1 },
          uGlassAlpha: { value: 0.22 },
          uOcclusionOpacity: { value: 0.18 },
          uZoomScale: { value: 1.02 },
          uFromShift: { value: 0 },
          uToShift: { value: 0 },
          uShearRad: { value: 0 },
          uSettleStrength: { value: 0 },
          uTargetMixReady: { value: 0 },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
      });
      const geometry = new PlaneGeometry(2, 2);
      this.quad = new Mesh(geometry, this.material);
      this.scene.add(this.quad);

      this.canvasHost.appendChild(this.renderer.domElement);
      this.webglEnabled = true;
      this.ensureRendererSize();
    } catch {
      this.webglEnabled = false;
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.material = null;
      this.quad = null;
    }
  }

  private ensureRendererSize(): void {
    if (!this.renderer) {
      return;
    }
    const width = Math.max(window.innerWidth, 1);
    const height = Math.max(window.innerHeight, 1);
    if (this.currentSize.width === width && this.currentSize.height === height) {
      return;
    }
    this.currentSize = { width, height };
    this.resolution.set(width, height);
    this.renderer.setSize(width, height, false);
  }

  private async loadTexture(slot: TextureSlot, imageUrl?: string): Promise<void> {
    const tokenKey = slot === 'from' ? 'fromLoadToken' : 'toLoadToken';
    const urlKey = slot === 'from' ? 'currentFromUrl' : 'currentToUrl';
    const nextToken = this[tokenKey] + 1;
    this[tokenKey] = nextToken;

    if (!imageUrl) {
      this.applyTexture(slot, null, undefined, nextToken);
      return;
    }
    if (this[urlKey] === imageUrl && this.getTexture(slot)) {
      if (slot === 'to') {
        this.targetImageLoaded = true;
      }
      return;
    }

    try {
      const image = await loadImage(imageUrl);
      const texture = createTexture(image);
      this.applyTexture(slot, texture, imageUrl, nextToken);
      if (slot === 'to') {
        this.targetImageLoaded = true;
      }
    } catch {
      if (slot === 'to') {
        this.targetImageLoaded = false;
      }
      this.applyTexture(slot, null, imageUrl, nextToken);
    }
  }

  private applyTexture(
    slot: TextureSlot,
    nextTexture: Texture | null,
    imageUrl: string | undefined,
    token: number,
  ): void {
    const tokenKey = slot === 'from' ? this.fromLoadToken : this.toLoadToken;
    if (token !== tokenKey) {
      nextTexture?.dispose();
      return;
    }

    const currentTexture = this.getTexture(slot);
    if (currentTexture && currentTexture !== nextTexture) {
      currentTexture.dispose();
    }

    if (slot === 'from') {
      this.fromTexture = nextTexture;
      this.currentFromUrl = imageUrl;
      this.setBackdropImage(this.fromBackdrop, imageUrl);
      if (this.material) {
        this.material.uniforms.uFromTex.value = nextTexture;
        if (!this.toTexture) {
          this.material.uniforms.uToTex.value = nextTexture;
        }
      }
      return;
    }

    this.toTexture = nextTexture;
    this.currentToUrl = imageUrl;
    this.setBackdropImage(this.toBackdrop, imageUrl);
    if (this.material) {
      this.material.uniforms.uToTex.value = nextTexture ?? this.fromTexture;
    }
  }

  private getTexture(slot: TextureSlot): Texture | null {
    return slot === 'from' ? this.fromTexture : this.toTexture;
  }

  private updateFallbackMotion(frame: SceneTransitionFrame): void {
    const fallbackBlur = frame.targetReady && this.targetImageLoaded
      ? Math.max(frame.blurPx * 0.72, 6)
      : Math.max(frame.blurPx * 1.08, 16);
    const targetBackdropOpacity = frame.targetReady && this.targetImageLoaded
      ? Math.min(Math.max(frame.targetMixProgress * 0.88, frame.stage === 'settle' ? 0.68 : 0), 0.94)
      : 0;
    this.element.style.setProperty('--vr-travel-backdrop-blur', `${fallbackBlur}px`);
    this.element.style.setProperty('--vr-travel-backdrop-scale', String(frame.zoomScale));
    this.element.style.setProperty('--vr-travel-backdrop-shift', `${frame.fromShiftPercent}%`);
    this.element.style.setProperty(
      '--vr-travel-from-backdrop-opacity',
      String(targetBackdropOpacity > 0 ? Math.max(0.48, 1 - frame.targetMixProgress * 0.52) : 1),
    );
    this.element.style.setProperty(
      '--vr-travel-backdrop-brightness',
      frame.stage === 'settle' ? '0.98' : '0.92',
    );
    this.element.style.setProperty(
      '--vr-travel-target-backdrop-blur',
      `${Math.max(frame.blurPx * (0.58 - frame.settleStrength * 0.22), 3)}px`,
    );
    this.element.style.setProperty(
      '--vr-travel-target-backdrop-scale',
      String(Number(Math.max(1, frame.zoomScale - 0.01).toFixed(4))),
    );
    this.element.style.setProperty('--vr-travel-target-backdrop-shift', `${frame.toShiftPercent}%`);
    this.element.style.setProperty('--vr-travel-target-backdrop-opacity', String(targetBackdropOpacity));
    this.element.style.setProperty(
      '--vr-travel-target-reveal-inset',
      `${Math.max(0, (1 - frame.revealProgress) * 100)}%`,
    );
  }

  private setBackdropImage(element: HTMLElement, imageUrl?: string): void {
    element.style.backgroundImage = imageUrl ? `url("${imageUrl}")` : '';
  }
}

function createTexture(image: HTMLImageElement): Texture {
  const texture = new Texture(image);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

function loadImage(imageUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`image load failed: ${imageUrl}`));
    image.src = imageUrl;
    if (typeof image.decode === 'function') {
      image.decode().then(() => resolve(image)).catch(() => {
        // onload will still resolve for browsers that reject decode() early
      });
    }
  });
}

function degreesToRadians(value: number): number {
  return (value * Math.PI) / 180;
}
