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
import { resolveTravelOverlayPresentation } from '../app/sceneTransitionOverlayPresentation.ts';
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
  uniform float uTargetPreviewLoaded;
  uniform float uTargetMixReady;
  uniform float uFromOpacity;
  uniform float uFromEdgeMix;
  uniform float uTargetFocus;

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
    vec4 color = texture2D(tex, clampUv(uv)) * 0.42;
    color += texture2D(tex, clampUv(uv + delta * 0.3)) * 0.24;
    color += texture2D(tex, clampUv(uv + delta * 0.72)) * 0.18;
    color += texture2D(tex, clampUv(uv + delta * 1.08)) * 0.1;
    color += texture2D(tex, clampUv(uv - delta * 0.2)) * 0.06;
    return color;
  }

  void main() {
    float reveal = clamp(uRevealProgress, 0.0, 1.0);
    float mixProgress = clamp(uTargetMixProgress, 0.0, 1.0);
    float settleStrength = clamp(uSettleStrength, 0.0, 1.0);
    float previewReady = clamp(uTargetPreviewLoaded, 0.0, 1.0);
    float mixReady = clamp(uTargetMixReady, 0.0, 1.0);
    float targetHold = 1.0 - mixReady;
    float soft = max(0.01, uWipeSoftness * 0.58);
    float seam = uTravelDirX > 0.0 ? 1.0 - reveal : reveal;
    float mask = uTravelDirX > 0.0
      ? smoothstep(seam - soft, seam + soft, vUv.x)
      : 1.0 - smoothstep(seam - soft, seam + soft, vUv.x);
    float seamDistance = abs(vUv.x - seam);
    float edge = 1.0 - smoothstep(0.0, soft * 2.1, seamDistance);
    float bend = sin((vUv.y + uProgress * 0.24) * 3.14159265) * 0.36
      + sin((vUv.y * 2.0 - 1.0) * 1.57079632) * 0.16;
    vec2 travelDir = vec2(uTravelDirX, bend * (0.028 + uCurveStrength * 0.05));
    float distortion = edge * uDistortionStrength * (0.014 + uCurveStrength * 0.02);
    float motionAmount = uMotionBlurStrength * 6.0;

    vec2 fromUv = coverUv(vUv, uZoomScale + uFromEdgeMix * 0.08, uFromShift, uShearRad * 0.4);
    vec2 toUv = coverUv(vUv, max(1.0, uZoomScale - 0.01), uToShift, uShearRad * 0.85);

    fromUv += travelDir * distortion * 0.38;
    toUv += travelDir * distortion * 0.74;
    toUv.y += edge * uCurveStrength * 0.006 * bend;

    vec2 smearDir = normalize(vec2(uTravelDirX, bend * 0.26 + 0.0001));
    float corridor = 1.0 - smoothstep(0.04, 0.22, abs(vUv.y - 0.5 - bend * 0.024));
    float centerFocus = 1.0 - smoothstep(
      0.08,
      0.42,
      length(vUv - vec2(0.5 - uTravelDirX * 0.05 * (1.0 - mixProgress), 0.49 + bend * 0.02))
    );
    float edgeBand = max(
      1.0 - smoothstep(0.02, 0.14 + uCurveStrength * 0.04, vUv.x),
      1.0 - smoothstep(0.02, 0.14 + uCurveStrength * 0.04, 1.0 - vUv.x)
    );
    float sourceSideResidue = uTravelDirX > 0.0
      ? 1.0 - smoothstep(0.2, 0.62, vUv.x)
      : 1.0 - smoothstep(0.2, 0.62, 1.0 - vUv.x);
    float centerCut = 1.0 - smoothstep(
      0.16,
      0.34 + (1.0 - uFromEdgeMix) * 0.12,
      length(vUv - vec2(0.5 - uTravelDirX * 0.03 * (1.0 - mixProgress), 0.5 + bend * 0.015))
    );
    float sourceResidueMask = max(edge, edgeBand * max(0.42, sourceSideResidue));
    float sourceMask = mix(1.0 - centerCut, sourceResidueMask, clamp(uFromEdgeMix, 0.0, 1.0));
    sourceMask *= clamp(uFromOpacity, 0.0, 1.0);

    vec4 fromColor = sampleLayer(
      uFromTex,
      fromUv,
      smearDir,
      max(12.0, uBlurStrength * (0.34 + (1.0 - uFromOpacity) * 0.52) + motionAmount * 0.2)
    );
    vec4 frostedFrom = sampleLayer(
      uFromTex,
      coverUv(vUv, uZoomScale + 0.16 + uFromEdgeMix * 0.04, uFromShift * 1.3, uShearRad * 0.18),
      smearDir,
      max(14.0, uBlurStrength * (0.92 + uFromEdgeMix * 0.48))
    );
    vec4 abstractFrom = sampleLayer(
      uFromTex,
      coverUv(vUv, uZoomScale + 0.22 + uFromEdgeMix * 0.06, uFromShift * 1.45, uShearRad * 0.12),
      smearDir,
      max(18.0, uBlurStrength * (1.08 + uFromEdgeMix * 0.48))
    );
    float centerSuppression = (1.0 - smoothstep(
      0.12,
      0.34,
      length(vUv - vec2(0.5 - uTravelDirX * 0.02 * (1.0 - mixProgress), 0.5 + bend * 0.012))
    )) * min(1.0, uFromEdgeMix * (1.0 + targetHold * 0.55));
    vec4 sourceBase = mix(
      frostedFrom,
      fromColor,
      clamp(sourceMask * mix(0.56, 0.26, targetHold), 0.0, 1.0)
    );
    float abstractResidue = clamp(
      edge * (0.22 + targetHold * 0.16) +
      edgeBand * 0.08 +
      max(0.0, sourceSideResidue - 0.24) * 0.12,
      0.0,
      0.42
    );
    sourceBase = mix(sourceBase, abstractFrom, abstractResidue);
    float sourceLuma = dot(sourceBase.rgb, vec3(0.299, 0.587, 0.114));
    float holdCorridor = targetHold * corridor * (0.06 + edge * 0.16 + centerFocus * 0.08);
    sourceBase.rgb = mix(
      sourceBase.rgb,
      vec3(sourceLuma) * vec3(1.0, 0.975, 0.94),
      centerSuppression * (0.08 + targetHold * 0.06) + holdCorridor * 0.14
    );
    sourceBase.rgb = mix(
      sourceBase.rgb,
      vec3(sourceLuma) * vec3(0.95, 0.92, 0.88),
      holdCorridor * 0.18
    );
    sourceBase.rgb *= mix(1.0, 0.94, centerSuppression * (0.12 + targetHold * 0.08) + holdCorridor * 0.08);

    vec4 toBlur = sampleLayer(
      uToTex,
      toUv,
      smearDir,
      max(0.0, uBlurStrength * (0.24 - reveal * 0.14) + motionAmount * 0.45)
    );
    vec4 toPreview = sampleLayer(
      uToTex,
      coverUv(vUv, uZoomScale + 0.03, uToShift * 0.35, uShearRad * 0.42),
      smearDir,
      max(14.0, uBlurStrength * (0.96 + targetHold * 0.44) + motionAmount * 0.28)
    );
    vec4 toSharp = texture2D(uToTex, clampUv(toUv));
    vec4 toMain = mix(
      toBlur,
      toSharp,
      clamp(0.52 + mixProgress * 0.66 + settleStrength * 0.18, 0.0, 1.0)
    );

    float targetCoreGate = clamp(
      reveal * 1.12 +
      mixProgress * 0.38 +
      settleStrength * 0.24,
      0.0,
      1.0
    );
    float targetPresence = clamp(
      mask * (0.22 + mixProgress * 0.58) +
      corridor * (0.08 + uTargetFocus * 0.16) +
      centerFocus * (0.04 + uTargetFocus * 0.16),
      0.0,
      1.0
    ) * mixReady * targetCoreGate;
    float preRevealHold = 1.0 - clamp(targetCoreGate * 1.4 + reveal * 0.3, 0.0, 1.0);
    float previewPresence = previewReady * clamp(
      targetHold * (
        edge * (0.05 + uTargetFocus * 0.06) +
        corridor * (0.018 + uTargetFocus * 0.028) +
        centerFocus * (0.003 + uTargetFocus * 0.006)
      ) +
      (1.0 - smoothstep(0.18, 0.72, mixProgress)) * (
        edge * (0.018 + uTargetFocus * 0.016) +
        corridor * (0.006 + uTargetFocus * 0.01)
      ),
      0.0,
      0.07
    ) * mix(1.0, 0.18, preRevealHold);

    vec4 color = mix(sourceBase, toPreview, previewPresence);
    color = mix(color, toMain, targetPresence);

    float occlusion = edge * uOcclusionOpacity * (0.72 + uFromOpacity * 0.28);
    color.rgb *= 1.0 - occlusion * 0.62;
    color.rgb += edge * vec3(1.0, 0.95, 0.88) * 0.06 * uGlassAlpha * (0.76 + mixProgress * 0.24);

    float radial = smoothstep(0.92, 0.12, length(vUv - vec2(0.5, 0.44)));
    float topGlow = smoothstep(0.92, 0.18, 1.0 - vUv.y);
    vec3 glassTint = vec3(1.0, 0.97, 0.92);
    color.rgb += glassTint * (0.022 * uGlassAlpha * radial + 0.003 * uGlassAlpha * topGlow * edge) * (1.0 - settleStrength * 0.6);
    color.rgb *= mix(0.92, 1.0, radial) * mix(0.98, 1.015, settleStrength);
    color.rgb = mix(color.rgb, color.rgb * 1.03 + vec3(0.008, 0.006, 0.004), settleStrength * 0.22);
    float liveWindow = targetHold * clamp(
      centerFocus * 0.62 +
      corridor * 0.34 +
      (1.0 - sourceSideResidue) * 0.08 -
      edge * 0.08,
      0.0,
      0.74
    );
    float directionalVeil = targetHold * (
      uTravelDirX > 0.0
        ? smoothstep(0.0, 0.28 + uCurveStrength * 0.1, vUv.x) * (1.0 - smoothstep(0.58, 0.88, vUv.x))
        : smoothstep(0.0, 0.28 + uCurveStrength * 0.1, 1.0 - vUv.x) * (1.0 - smoothstep(0.58, 0.88, 1.0 - vUv.x))
    );
    color.rgb *= 1.0 - directionalVeil * 0.06;
    float outputAlpha = clamp((1.0 - liveWindow * 1.95) * mix(0.72, 0.16, preRevealHold), 0.02, 0.82);

    gl_FragColor = vec4(color.rgb, outputAlpha);
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
      --vr-travel-from-cut-inner: 0%;
      --vr-travel-from-cut-outer: 100%;
    }

    .vr-travel-transition.is-active {
      opacity: 1;
      visibility: visible;
      pointer-events: none;
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
      -webkit-mask-image: radial-gradient(
        circle at 50% 50%,
        transparent 0%,
        transparent var(--vr-travel-from-cut-inner),
        rgba(0, 0, 0, 0.95) var(--vr-travel-from-cut-outer),
        #000 100%
      );
      mask-image: radial-gradient(
        circle at 50% 50%,
        transparent 0%,
        transparent var(--vr-travel-from-cut-inner),
        rgba(0, 0, 0, 0.95) var(--vr-travel-from-cut-outer),
        #000 100%
      );
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
  `;

  document.head.appendChild(style);
}

export class TravelTransitionOverlay {
  private readonly element: HTMLDivElement;
  private readonly fromBackdrop: HTMLDivElement;
  private readonly toBackdrop: HTMLDivElement;
  private readonly canvasHost: HTMLDivElement;
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

    this.element.append(this.fromBackdrop, this.toBackdrop, this.canvasHost);
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
    this.element.style.opacity = '';
    this.setBackdropImage(this.fromBackdrop, args.fromImage);
    this.setBackdropImage(this.toBackdrop, args.targetImage);
    this.element.classList.add('is-active');
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

    const presentation = resolveTravelOverlayPresentation(frame, this.targetImageLoaded);
    this.element.style.opacity = String(presentation.stageOpacity);
    this.updateFallbackMotion(frame, presentation);
    this.element.dataset.wipeFrom = frame.wipeFrom;

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
    uniforms.uTargetPreviewLoaded.value = this.targetImageLoaded ? 1 : 0;
    uniforms.uTargetMixReady.value = this.targetImageLoaded
      ? frame.targetReady
        ? Math.min(
            1,
            Math.max(
              frame.targetMixProgress * 0.76 + frame.targetFocus * 0.22,
              frame.stage === 'settle' ? 0.72 : 0.14,
            ),
          )
        : 0
      : 0;
    uniforms.uFromOpacity.value = frame.fromOpacity;
    uniforms.uFromEdgeMix.value = frame.fromEdgeMix;
    uniforms.uTargetFocus.value = frame.targetFocus;

    this.renderer.render(this.scene!, this.camera!);
  }

  hide(): void {
    if (!this.active) {
      return;
    }
    this.active = false;
    this.element.style.opacity = '0';
    this.element.style.setProperty('--vr-travel-from-backdrop-opacity', '0');
    this.element.style.setProperty('--vr-travel-target-backdrop-opacity', '0');
    this.element.style.setProperty('--vr-travel-target-reveal-inset', '100%');
    this.element.style.setProperty('--vr-travel-backdrop-blur', '0px');
    this.element.style.setProperty('--vr-travel-target-backdrop-blur', '0px');
    this.element.classList.remove('is-active');
    this.clearTimer = window.setTimeout(() => {
      if (this.active) {
        return;
      }
      this.element.style.opacity = '';
      this.setBackdropImage(this.fromBackdrop, undefined);
      this.setBackdropImage(this.toBackdrop, undefined);
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
          uTargetPreviewLoaded: { value: 0 },
          uTargetMixReady: { value: 0 },
          uFromOpacity: { value: 1 },
          uFromEdgeMix: { value: 0 },
          uTargetFocus: { value: 0 },
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

  private updateFallbackMotion(
    frame: SceneTransitionFrame,
    presentation = resolveTravelOverlayPresentation(frame, this.targetImageLoaded),
  ): void {
    this.element.style.setProperty('--vr-travel-backdrop-blur', `${presentation.fallbackBlur}px`);
    this.element.style.setProperty(
      '--vr-travel-backdrop-scale',
      String(Number((frame.zoomScale + frame.fromEdgeMix * (frame.sourceKind === 'cover' ? 0.08 : 0.03)).toFixed(4))),
    );
    this.element.style.setProperty('--vr-travel-backdrop-shift', `${frame.fromShiftPercent}%`);
    this.element.style.setProperty(
      '--vr-travel-from-backdrop-opacity',
      String(presentation.fromBackdropOpacity),
    );
    this.element.style.setProperty('--vr-travel-backdrop-brightness', String(presentation.backdropBrightness));
    this.element.style.setProperty('--vr-travel-from-cut-inner', `${presentation.fromCenterCutInner}%`);
    this.element.style.setProperty('--vr-travel-from-cut-outer', `${presentation.fromCenterCutOuter}%`);
    this.element.style.setProperty(
      '--vr-travel-target-backdrop-blur',
      `${presentation.targetBackdropBlur}px`,
    );
    this.element.style.setProperty(
      '--vr-travel-target-backdrop-scale',
      String(Number(Math.max(1, frame.zoomScale - 0.01).toFixed(4))),
    );
    this.element.style.setProperty('--vr-travel-target-backdrop-shift', `${frame.toShiftPercent}%`);
    this.element.style.setProperty('--vr-travel-target-backdrop-opacity', String(presentation.targetBackdropOpacity));
    this.element.style.setProperty('--vr-travel-target-reveal-inset', `${presentation.targetRevealInset}%`);
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
