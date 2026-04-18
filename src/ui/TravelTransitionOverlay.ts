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
  uniform float uCenterRevealMode;
  uniform float uCurveStrength;
  uniform float uForwardDriveStrength;
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
    float soft = max(0.014, uWipeSoftness * 0.82);
    float centerMode = clamp(uCenterRevealMode, 0.0, 1.0);
    float seam = uTravelDirX > 0.0 ? 1.0 - reveal : reveal;
    float lateralMask = uTravelDirX > 0.0
      ? smoothstep(seam - soft, seam + soft, vUv.x)
      : 1.0 - smoothstep(seam - soft, seam + soft, vUv.x);
    float lateralSeamDistance = abs(vUv.x - seam);
    float centerHalfWidth = mix(0.0, 0.62, reveal);
    float centerDistance = abs(vUv.x - 0.5);
    float centerMask = 1.0 - smoothstep(centerHalfWidth - soft * 0.6, centerHalfWidth + soft * 1.3, centerDistance);
    float centerSeamDistance = abs(centerDistance - centerHalfWidth);
    float mask = mix(lateralMask, centerMask, centerMode);
    float seamDistance = mix(lateralSeamDistance, centerSeamDistance, centerMode);
    float edge = 1.0 - smoothstep(0.0, soft * mix(2.1, 1.35, centerMode), seamDistance);
    float sweepBand = 1.0 - smoothstep(0.0, soft * mix(1.7, 1.16, centerMode), seamDistance);
    float streakCenter = mix(
      seam - uTravelDirX * mix(0.12, 0.03, clamp(uProgress, 0.0, 1.0)),
      centerHalfWidth + mix(0.08, 0.03, clamp(uProgress, 0.0, 1.0)),
      centerMode
    );
    float streak = mix(
      1.0 - smoothstep(0.0, soft * 2.1, abs(vUv.x - streakCenter)),
      1.0 - smoothstep(0.0, soft * 2.4, abs(centerDistance - streakCenter)),
      centerMode
    );
    float bend = sin((vUv.y + uProgress * 0.26) * 3.14159265) * 0.62
      + sin((vUv.y * 2.0 - 1.0) * 1.57079632) * 0.3;
    vec2 travelDir = mix(
      vec2(uTravelDirX, bend * (0.05 + uCurveStrength * 0.095)),
      vec2(0.0, -0.08 + bend * (0.06 + uCurveStrength * 0.03)),
      centerMode
    );
    float distortion = max(max(edge, sweepBand * 0.82), streak * 0.9) * uDistortionStrength * (0.03 + uCurveStrength * 0.038);
    float motionAmount = uMotionBlurStrength * 10.8;

    vec2 smearDir = normalize(mix(
      vec2(uTravelDirX, bend * 0.26 + 0.0001),
      vec2(0.0, -0.2 + bend * 0.2),
      centerMode
    ));
    vec2 fromUv = coverUv(vUv, uZoomScale + uFromEdgeMix * 0.08, uFromShift, uShearRad * 0.4);
    vec2 toUv = coverUv(vUv, max(1.0, uZoomScale - 0.01), uToShift, uShearRad * 0.85);
    vec2 tunnelCenter = mix(
      vec2(0.5 - uTravelDirX * 0.012 * (1.0 - mixProgress), 0.5 + bend * 0.012),
      vec2(0.5, 0.5 + bend * 0.008),
      centerMode
    );
    vec2 tunnelVector = vUv - tunnelCenter;

    fromUv += travelDir * distortion * 0.62;
    toUv += travelDir * distortion * 1.18;
    toUv.y += edge * uCurveStrength * 0.014 * bend;
    fromUv -= smearDir * streak * 0.004 * (0.4 + uCurveStrength * 0.4);
    toUv += smearDir * streak * 0.007 * (0.46 + uCurveStrength * 0.5);

    float corridor = 1.0 - smoothstep(0.04, 0.22, abs(vUv.y - 0.5 - bend * 0.024));
    float forwardCorridor = 1.0 - smoothstep(
      0.04,
      mix(0.22, 0.1, clamp(uForwardDriveStrength, 0.0, 1.0)),
      abs(vUv.y - 0.5 - bend * 0.02)
    );
    float centerFocus = 1.0 - smoothstep(
      0.08,
      0.42,
      length(vUv - mix(
        vec2(0.5 - uTravelDirX * 0.05 * (1.0 - mixProgress), 0.49 + bend * 0.02),
        vec2(0.5, 0.49 + bend * 0.012),
        centerMode
      ))
    );
    float portalRing = centerMode * smoothstep(0.12, 0.2, centerDistance) * (1.0 - smoothstep(0.28, 0.38, centerDistance));
    vec2 tunnelDir = normalize(tunnelVector + vec2(0.0001, 0.0001));
    float forwardPulse = clamp(
      (0.22 + sweepBand * 0.38 + streak * 0.24 + forwardCorridor * 0.36) * uForwardDriveStrength,
      0.0,
      0.62
    );
    fromUv += tunnelVector * forwardPulse * 0.036;
    toUv += tunnelVector * forwardPulse * 0.082;
    fromUv += tunnelDir * portalRing * uForwardDriveStrength * 0.008;
    toUv -= tunnelDir * portalRing * (0.01 + uTargetFocus * 0.004);
    float edgeBand = max(
      1.0 - smoothstep(0.02, 0.14 + uCurveStrength * 0.04, vUv.x),
      1.0 - smoothstep(0.02, 0.14 + uCurveStrength * 0.04, 1.0 - vUv.x)
    );
    float sourceSideResidue = mix(
      uTravelDirX > 0.0
        ? 1.0 - smoothstep(0.2, 0.62, vUv.x)
        : 1.0 - smoothstep(0.2, 0.62, 1.0 - vUv.x),
      smoothstep(0.16, 0.5, centerDistance),
      centerMode
    );
    float centerCut = 1.0 - smoothstep(
      0.16,
      0.34 + (1.0 - uFromEdgeMix) * 0.12,
      length(vUv - mix(
        vec2(0.5 - uTravelDirX * 0.03 * (1.0 - mixProgress), 0.5 + bend * 0.015),
        vec2(0.5, 0.5 + bend * 0.01),
        centerMode
      ))
    );
    float sourceResidueMask = max(edge, edgeBand * max(0.42, sourceSideResidue));
    float forwardOuterShell = smoothstep(0.18, 0.5, centerDistance);
    sourceResidueMask = mix(sourceResidueMask, max(edge, forwardOuterShell * 0.94), centerMode);
    float sourceMask = mix(1.0 - centerCut, sourceResidueMask, clamp(uFromEdgeMix, 0.0, 1.0));
    sourceMask *= clamp(uFromOpacity, 0.0, 1.0);
    float directionalGate = mix(
      uTravelDirX > 0.0
        ? smoothstep(seam - soft * 0.08, seam + soft * 1.85, vUv.x)
        : 1.0 - smoothstep(seam - soft * 1.85, seam + soft * 0.08, vUv.x),
      mask,
      centerMode
    );

    vec4 fromColor = sampleLayer(
      uFromTex,
      fromUv,
      smearDir,
      max(15.0, uBlurStrength * (0.5 + (1.0 - uFromOpacity) * 0.62) + motionAmount * 0.28)
    );
    vec4 frostedFrom = sampleLayer(
      uFromTex,
      coverUv(vUv, uZoomScale + 0.16 + uFromEdgeMix * 0.04, uFromShift * 1.3, uShearRad * 0.18),
      smearDir,
      max(18.0, uBlurStrength * (1.14 + uFromEdgeMix * 0.62))
    );
    vec4 abstractFrom = sampleLayer(
      uFromTex,
      coverUv(vUv, uZoomScale + 0.22 + uFromEdgeMix * 0.06, uFromShift * 1.45, uShearRad * 0.12),
      smearDir,
      max(22.0, uBlurStrength * (1.34 + uFromEdgeMix * 0.62))
    );
    float centerSuppression = (1.0 - smoothstep(
      0.1,
      0.24,
      length(vUv - mix(
        vec2(0.5 - uTravelDirX * 0.02 * (1.0 - mixProgress), 0.5 + bend * 0.012),
        vec2(0.5, 0.5 + bend * 0.008),
        centerMode
      ))
    )) * min(0.34, max(0.0, uFromEdgeMix - 0.18) * (0.3 + targetHold * 0.08));
    float sourceLiteralMix = clamp(
      sourceMask * mix(
        0.92,
        mix(0.54, 0.78, centerMode),
        clamp(mixProgress * 0.55 + reveal * 0.25, 0.0, 1.0)
      ),
      0.0,
      1.0
    );
    vec4 sourceBase = mix(
      frostedFrom,
      fromColor,
      sourceLiteralMix
    );
    float abstractResidue = clamp(
      edge * (0.18 + targetHold * 0.1) +
      edgeBand * 0.06 +
      max(0.0, sourceSideResidue - 0.24) * 0.08,
      0.0,
      0.28
    );
    sourceBase = mix(sourceBase, abstractFrom, abstractResidue);
    float sourceLuma = dot(sourceBase.rgb, vec3(0.299, 0.587, 0.114));
    float holdCorridor = targetHold * corridor * (0.008 + edge * 0.03 + centerFocus * 0.012);
    sourceBase.rgb = mix(
      sourceBase.rgb,
      vec3(sourceLuma) * vec3(1.0, 0.975, 0.94),
      centerSuppression * (0.016 + targetHold * 0.012) + holdCorridor * 0.016
    );
    sourceBase.rgb = mix(
      sourceBase.rgb,
      vec3(sourceLuma) * vec3(0.95, 0.92, 0.88),
      holdCorridor * 0.012
    );
    sourceBase.rgb *= mix(1.0, 0.992, centerSuppression * (0.024 + targetHold * 0.014) + holdCorridor * 0.008);

    vec4 toBlur = sampleLayer(
      uToTex,
      toUv,
      smearDir,
      max(0.0, uBlurStrength * (0.42 - reveal * 0.18) + motionAmount * 0.72)
    );
    vec4 toPreview = sampleLayer(
      uToTex,
      coverUv(vUv, uZoomScale + 0.03, uToShift * 0.35, uShearRad * 0.42),
      smearDir,
      max(18.0, uBlurStrength * (1.18 + targetHold * 0.6) + motionAmount * 0.42)
    );
    vec4 toSharp = texture2D(uToTex, clampUv(toUv));
    vec4 toMain = mix(
      toBlur,
      toSharp,
      clamp(0.22 + mixProgress * 0.58 + settleStrength * 0.14, 0.0, 1.0)
    );

    float gatedMixProgress = mixProgress * mixReady;
    float targetCoreGate = clamp(
      reveal * 1.08 +
      gatedMixProgress * 0.34 +
      settleStrength * 0.28,
      0.0,
      1.0
    );
    float targetPresence = clamp(
      directionalGate * (0.04 + reveal * 0.88) +
      sweepBand * (0.24 + uTargetFocus * 0.3) +
      streak * (0.12 + uTargetFocus * 0.14) +
      corridor * sweepBand * 0.05 +
      forwardCorridor * (0.12 + uForwardDriveStrength * 0.18) +
      centerFocus * sweepBand * (0.06 + uForwardDriveStrength * 0.04) * (0.12 + reveal * 0.88),
      0.0,
      1.0
    ) * mixReady * clamp(0.16 + targetCoreGate * 0.96, 0.0, 1.0);
    float forwardTargetPresence = clamp(
      mask * (0.12 + reveal * 0.74 + uTargetFocus * 0.12) +
      edge * (0.22 + uTargetFocus * 0.18) +
      streak * (0.16 + uTargetFocus * 0.1) +
      forwardCorridor * mask * (0.16 + uForwardDriveStrength * 0.14) +
      centerFocus * mask * 0.06,
      0.0,
      1.0
    ) * mixReady * clamp(0.14 + targetCoreGate * 1.02, 0.0, 1.0);
    targetPresence = mix(
      targetPresence,
      forwardTargetPresence * mix(0.46, 0.88, clamp(reveal * 0.7 + mixProgress * 0.5, 0.0, 1.0)),
      centerMode
    );
    float preRevealHold = 1.0 - clamp(targetCoreGate * 1.72 + reveal * 0.42, 0.0, 1.0);
    float previewPresence = previewReady * clamp(
      targetHold * (
        sweepBand * (0.22 + uTargetFocus * 0.16) +
        streak * (0.14 + uTargetFocus * 0.14) +
        forwardCorridor * (0.14 + uForwardDriveStrength * 0.16) +
        directionalGate * 0.08
      ) +
      (1.0 - smoothstep(0.24, 0.76, mixProgress)) * (
        sweepBand * (0.06 + uTargetFocus * 0.05) +
        streak * (0.05 + uTargetFocus * 0.04) +
        forwardCorridor * (0.08 + uForwardDriveStrength * 0.08)
      ),
      0.0,
      0.42
    ) * mix(1.0, 0.12, preRevealHold);
    float forwardPreviewPresence = previewReady * clamp(
      targetHold * (
        mask * (0.12 + uTargetFocus * 0.1) +
        edge * (0.22 + uTargetFocus * 0.1) +
        streak * (0.14 + uTargetFocus * 0.1) +
        forwardCorridor * mask * (0.12 + uForwardDriveStrength * 0.12)
      ) +
      (1.0 - smoothstep(0.24, 0.72, mixProgress)) * (
        mask * 0.08 +
        streak * 0.05 +
        forwardCorridor * edge * (0.05 + uForwardDriveStrength * 0.05)
      ),
      0.0,
      0.32
    ) * mix(1.0, 0.12, preRevealHold);
    previewPresence *= smoothstep(0.12, 0.4, uProgress) * smoothstep(0.06, 0.24, reveal + mixReady * 0.62);
    forwardPreviewPresence *= smoothstep(0.08, 0.32, uProgress) * smoothstep(0.04, 0.2, reveal + mixReady * 0.62);
    previewPresence = mix(
      previewPresence,
      forwardPreviewPresence * (0.56 + forwardCorridor * 0.1),
      centerMode
    );

    vec4 color = mix(sourceBase, toPreview, previewPresence);
    color = mix(color, toMain, targetPresence);

    float occlusion = edge * uOcclusionOpacity * (0.72 + uFromOpacity * 0.28);
    color.rgb *= 1.0 - occlusion * (0.14 + (1.0 - preRevealHold) * 0.2);
    color.rgb *= 1.0 - sweepBand * mix(
      0.025 + (1.0 - preRevealHold) * 0.04 + targetHold * 0.015,
      0.08 + (1.0 - preRevealHold) * 0.06 + targetHold * 0.025,
      centerMode
    );
    color.rgb += sweepBand *
      mix(vec3(1.0, 0.93, 0.84), vec3(0.97, 0.91, 0.84), centerMode) *
      mix(0.12 + uGlassAlpha * 0.06 + targetHold * 0.02, 0.032 + uGlassAlpha * 0.018 + targetHold * 0.006, centerMode);
    color.rgb += streak *
      mix(vec3(1.0, 0.96, 0.9), vec3(0.98, 0.92, 0.86), centerMode) *
      mix(0.05 + uGlassAlpha * 0.04 + targetHold * 0.02, 0.014 + uGlassAlpha * 0.014 + targetHold * 0.004, centerMode);
    color.rgb += edge * vec3(1.0, 0.95, 0.88) * 0.12 * uGlassAlpha * (0.82 + mixProgress * 0.2);
    color.rgb += forwardCorridor * vec3(1.0, 0.95, 0.88) *
      mix(0.026 + uForwardDriveStrength * 0.04, 0.006 + uForwardDriveStrength * 0.012, centerMode) *
      (0.32 + targetHold * 0.72);

    float radial = 1.0 - smoothstep(0.12, 0.92, length(vUv - vec2(0.5, 0.44)));
    float topGlow = 1.0 - smoothstep(0.18, 0.92, 1.0 - vUv.y);
    vec3 glassTint = vec3(1.0, 0.97, 0.92);
    color.rgb += glassTint * (0.032 * uGlassAlpha * radial + 0.005 * uGlassAlpha * topGlow * edge) * (1.0 - settleStrength * 0.6) * mix(1.0, 0.46, centerMode);
    color.rgb *= mix(0.92, 1.0, radial) * mix(0.98, 1.015, settleStrength);
    color.rgb = mix(color.rgb, color.rgb * 1.03 + vec3(0.008, 0.006, 0.004), settleStrength * 0.22);
    float liveWindow = targetHold * clamp(
      sweepBand * 0.045 +
      corridor * 0.02 +
      centerFocus * 0.01 +
      (1.0 - sourceSideResidue) * 0.018 -
      edge * 0.02,
      0.0,
      0.06
    );
    liveWindow *= smoothstep(0.4, 0.62, uProgress) * smoothstep(0.26, 0.52, targetCoreGate + reveal * 0.6);
    float directionalVeil = mix(
      targetHold * (
        uTravelDirX > 0.0
          ? smoothstep(0.0, 0.28 + uCurveStrength * 0.1, vUv.x) * (1.0 - smoothstep(0.58, 0.88, vUv.x))
          : smoothstep(0.0, 0.28 + uCurveStrength * 0.1, 1.0 - vUv.x) * (1.0 - smoothstep(0.58, 0.88, 1.0 - vUv.x))
      ),
      targetHold * smoothstep(0.18, 0.48, centerDistance) * (0.62 + uForwardDriveStrength * 0.22),
      centerMode
    );
    color.rgb *= 1.0 - directionalVeil * mix(0.028, 0.11, centerMode);
    color.rgb *= 1.0 - (1.0 - forwardCorridor) * uForwardDriveStrength * mix(0.18, 0.44, centerMode);
    color.rgb *= 1.0 - portalRing * (0.028 + uForwardDriveStrength * 0.06);
    color.rgb += portalRing * vec3(1.0, 0.94, 0.86) * (0.004 + reveal * 0.012 + uTargetFocus * 0.01);
    float centerToneDown = centerMode * clamp(
      0.06 +
      targetHold * 0.1 +
      uForwardDriveStrength * 0.04 +
      directionalVeil * 0.08 -
      settleStrength * 0.05,
      0.0,
      0.22
    );
    color.rgb *= 1.0 - centerToneDown;
    float outputAlphaFloor = mix(0.48, 0.72, mixReady);
    float outputAlphaCeil = 0.94 - targetHold * 0.12;
    float outputAlpha = clamp(
      (1.0 - liveWindow * 0.72) * mix(
        mix(outputAlphaCeil, 0.74, centerMode),
        mix(0.86, 0.78, centerMode),
        clamp(targetCoreGate * 0.92 + settleStrength * 0.4, 0.0, 1.0)
      ),
      outputAlphaFloor,
      0.995
    );

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
      --vr-travel-sweep-offset: 0%;
      --vr-travel-sweep-rotate: 0deg;
      --vr-travel-sweep-opacity: 0;
      --vr-travel-corridor-opacity: 0;
      --vr-travel-directional-veil-opacity: 0;
      --vr-travel-directional-veil-width: 44%;
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

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__fallback--to {
      clip-path: inset(0 calc(var(--vr-travel-target-reveal-inset) / 2) 0 calc(var(--vr-travel-target-reveal-inset) / 2));
    }

    .vr-travel-transition__canvas canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .vr-travel-transition__corridor,
    .vr-travel-transition__sweep,
    .vr-travel-transition__directional-veil {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .vr-travel-transition__corridor {
      inset: -10%;
      background:
        radial-gradient(
          82% 46% at 50% 50%,
          rgba(255, 248, 236, 0.02) 0%,
          rgba(255, 248, 236, 0.02) 28%,
          rgba(20, 24, 32, 0.08) 46%,
          rgba(10, 12, 18, 0.22) 66%,
          rgba(4, 6, 10, 0.44) 86%,
          rgba(2, 3, 6, 0.58) 100%
        );
      mix-blend-mode: multiply;
      opacity: var(--vr-travel-corridor-opacity);
      transition: opacity 120ms linear;
    }

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__corridor {
      background:
        radial-gradient(
          68% 38% at 50% 50%,
          rgba(255, 248, 236, 0.02) 0%,
          rgba(255, 248, 236, 0.01) 18%,
          rgba(18, 22, 30, 0.16) 34%,
          rgba(8, 10, 16, 0.36) 52%,
          rgba(3, 4, 8, 0.6) 74%,
          rgba(2, 3, 6, 0.78) 100%
        );
    }

    .vr-travel-transition__sweep {
      inset: -18%;
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0) 0%,
          rgba(8, 10, 16, 0.08) 18%,
          rgba(10, 12, 18, 0.26) 34%,
          rgba(244, 228, 201, 0.18) 45%,
          rgba(255, 248, 236, 0.72) 50%,
          rgba(244, 228, 201, 0.24) 57%,
          rgba(10, 12, 18, 0.22) 72%,
          rgba(8, 10, 16, 0) 100%
        );
      filter: blur(22px) saturate(0.94);
      mix-blend-mode: normal;
      opacity: var(--vr-travel-sweep-opacity);
      transform: translate3d(var(--vr-travel-sweep-offset), 0, 0) rotate(var(--vr-travel-sweep-rotate));
      transform-origin: center center;
      transition:
        opacity 120ms linear,
        transform 120ms linear;
    }

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__sweep {
      inset: -12%;
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0.72) 0%,
          rgba(8, 10, 16, 0.46) 18%,
          rgba(244, 228, 201, 0.01) 40%,
          rgba(255, 246, 230, 0.18) 50%,
          rgba(244, 228, 201, 0.01) 60%,
          rgba(8, 10, 16, 0.46) 82%,
          rgba(8, 10, 16, 0.72) 100%
        );
      filter: blur(10px) saturate(0.74);
      transform: translate3d(0, 0, 0) rotate(0deg);
    }

    .vr-travel-transition__directional-veil {
      opacity: var(--vr-travel-directional-veil-opacity);
      transition: opacity 120ms linear;
      mix-blend-mode: multiply;
    }

    .vr-travel-transition[data-wipe-from="right"] .vr-travel-transition__directional-veil {
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0) 0%,
          rgba(8, 10, 16, 0.04) 24%,
          rgba(8, 10, 16, 0.12) 48%,
          rgba(8, 10, 16, 0.32) 78%,
          rgba(8, 10, 16, 0.46) 100%
        );
      clip-path: inset(0 0 0 calc(100% - var(--vr-travel-directional-veil-width)));
    }

    .vr-travel-transition[data-wipe-from="left"] .vr-travel-transition__directional-veil {
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0.46) 0%,
          rgba(8, 10, 16, 0.32) 22%,
          rgba(8, 10, 16, 0.12) 52%,
          rgba(8, 10, 16, 0.04) 76%,
          rgba(8, 10, 16, 0) 100%
        );
      clip-path: inset(0 calc(100% - var(--vr-travel-directional-veil-width)) 0 0);
    }

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__directional-veil {
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0.68) 0%,
          rgba(8, 10, 16, 0.4) 18%,
          rgba(8, 10, 16, 0.1) 38%,
          rgba(8, 10, 16, 0) 50%,
          rgba(8, 10, 16, 0.1) 62%,
          rgba(8, 10, 16, 0.4) 82%,
          rgba(8, 10, 16, 0.68) 100%
        );
      clip-path: inset(0 calc((100% - var(--vr-travel-directional-veil-width)) / 2));
    }
  `;

  document.head.appendChild(style);
}

export class TravelTransitionOverlay {
  private readonly element: HTMLDivElement;
  private readonly fromBackdrop: HTMLDivElement;
  private readonly toBackdrop: HTMLDivElement;
  private readonly canvasHost: HTMLDivElement;
  private readonly corridorLayer: HTMLDivElement;
  private readonly sweepLayer: HTMLDivElement;
  private readonly directionalVeilLayer: HTMLDivElement;
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

    this.corridorLayer = document.createElement('div');
    this.corridorLayer.className = 'vr-travel-transition__corridor';

    this.sweepLayer = document.createElement('div');
    this.sweepLayer.className = 'vr-travel-transition__sweep';

    this.directionalVeilLayer = document.createElement('div');
    this.directionalVeilLayer.className = 'vr-travel-transition__directional-veil';

    this.element.append(
      this.fromBackdrop,
      this.toBackdrop,
      this.canvasHost,
      this.directionalVeilLayer,
      this.corridorLayer,
      this.sweepLayer,
    );
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
    this.canvasHost.style.opacity = '0';
    this.element.style.transition = 'none';
    this.element.style.opacity = '1';
    this.element.style.visibility = 'visible';
    this.element.style.pointerEvents = 'none';
    this.element.style.setProperty('--vr-travel-backdrop-blur', args.targetImage ? '12px' : '22px');
    this.element.style.setProperty('--vr-travel-target-backdrop-blur', args.targetImage ? '8px' : '0px');
    this.element.style.setProperty('--vr-travel-from-backdrop-opacity', args.targetImage ? '0.14' : '0.46');
    this.element.style.setProperty('--vr-travel-target-backdrop-opacity', args.targetImage ? '0.28' : '0');
    this.element.style.setProperty('--vr-travel-target-reveal-inset', args.targetImage ? '62%' : '100%');
    this.element.style.setProperty('--vr-travel-from-cut-inner', args.targetImage ? '56%' : '30%');
    this.element.style.setProperty('--vr-travel-from-cut-outer', args.targetImage ? '78%' : '48%');
    this.element.style.setProperty('--vr-travel-backdrop-brightness', args.targetImage ? '0.82' : '0.9');
    this.element.style.setProperty('--vr-travel-sweep-offset', args.targetImage ? '16%' : '0%');
    this.element.style.setProperty('--vr-travel-sweep-rotate', args.targetImage ? '7deg' : '0deg');
    this.element.style.setProperty('--vr-travel-sweep-opacity', args.targetImage ? '0.18' : '0');
    this.element.style.setProperty('--vr-travel-corridor-opacity', args.targetImage ? '0.2' : '0.08');
    this.element.style.setProperty('--vr-travel-directional-veil-opacity', args.targetImage ? '0.14' : '0');
    this.element.style.setProperty('--vr-travel-directional-veil-width', args.targetImage ? '48%' : '0%');
    this.setBackdropImage(this.fromBackdrop, args.fromImage);
    this.setBackdropImage(this.toBackdrop, args.targetImage);
    this.element.classList.add('is-active');
    this.element.dataset.stage = 'starting';
    this.element.dataset.progress = '0';
    this.element.dataset.targetReady = 'false';
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
    this.element.style.visibility = 'visible';
    this.element.style.pointerEvents = 'none';
    this.element.style.opacity = String(presentation.stageOpacity);
    this.element.dataset.stage = frame.stage;
    this.element.dataset.progress = String(frame.progress);
    this.element.dataset.targetReady = String(frame.targetReady);
    this.updateFallbackMotion(frame, presentation);
    this.element.dataset.wipeFrom = frame.wipeFrom;

    if (!this.webglEnabled || !this.renderer || !this.material) {
      return;
    }

    const sourceTextureReady = Boolean(this.fromTexture);
    this.canvasHost.style.opacity = sourceTextureReady
      ? String(frame.targetReady ? 1 : 0.84 + frame.stageProgress * 0.1)
      : '0';
    if (!sourceTextureReady) {
      return;
    }

    this.ensureRendererSize();

    const uniforms = this.material.uniforms;
    uniforms.uProgress.value = frame.progress;
    uniforms.uRevealProgress.value = frame.revealProgress;
    uniforms.uTargetMixProgress.value = frame.targetMixProgress;
    uniforms.uTravelDirX.value = frame.travelDirX;
    uniforms.uCenterRevealMode.value = frame.wipeFrom === 'center' ? 1 : 0;
    uniforms.uCurveStrength.value = frame.curveStrength;
    uniforms.uForwardDriveStrength.value = frame.forwardDriveStrength;
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
              frame.revealProgress * 0.82 +
                frame.targetMixProgress * 0.3 +
                frame.targetFocus * 0.08,
              frame.stage === 'settle' ? 0.82 : 0.12,
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
    this.element.style.transition =
      'opacity 140ms cubic-bezier(0.16, 1, 0.3, 1), visibility 140ms cubic-bezier(0.16, 1, 0.3, 1)';
    this.element.style.opacity = '0';
    this.element.style.visibility = 'hidden';
    this.element.style.pointerEvents = 'none';
    this.element.style.setProperty('--vr-travel-from-backdrop-opacity', '0');
    this.element.style.setProperty('--vr-travel-target-backdrop-opacity', '0');
    this.element.style.setProperty('--vr-travel-target-reveal-inset', '100%');
    this.element.style.setProperty('--vr-travel-backdrop-blur', '0px');
    this.element.style.setProperty('--vr-travel-target-backdrop-blur', '0px');
    this.element.style.setProperty('--vr-travel-sweep-opacity', '0');
    this.element.style.setProperty('--vr-travel-corridor-opacity', '0');
    this.element.style.setProperty('--vr-travel-directional-veil-opacity', '0');
    this.canvasHost.style.opacity = '0';
    this.element.dataset.stage = 'idle';
    this.element.dataset.progress = '1';
    this.element.dataset.targetReady = 'false';
    this.element.classList.remove('is-active');
    this.clearTimer = window.setTimeout(() => {
      if (this.active) {
        return;
      }
      this.element.style.opacity = '';
      this.element.style.visibility = '';
      this.element.style.transition = '';
      this.element.style.pointerEvents = '';
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
          uCenterRevealMode: { value: 0 },
          uCurveStrength: { value: 0 },
          uForwardDriveStrength: { value: 0 },
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
    let fallbackBlur = presentation.fallbackBlur;
    let fromBackdropOpacity = presentation.fromBackdropOpacity;
    let targetBackdropBlur = presentation.targetBackdropBlur;
    let targetBackdropOpacity = presentation.targetBackdropOpacity;

    const sourceTextureReady = Boolean(this.fromTexture);
    const targetTextureReady = Boolean(this.toTexture) && this.targetImageLoaded;

    if (this.webglEnabled && sourceTextureReady) {
      const sourceTakeover = frame.targetReady
        ? Math.min(
            1,
            0.48 + frame.revealProgress * 0.32 + frame.targetMixProgress * 0.22,
          )
        : Math.min(
            0.74,
            0.18 + frame.targetFocus * 0.28 + frame.revealProgress * 0.14,
          );
      fallbackBlur = Math.max(2.2, fallbackBlur * (1 - sourceTakeover * 0.78));
      fromBackdropOpacity *= frame.targetReady
        ? Math.max(0.1, 0.34 - sourceTakeover * 0.16)
        : Math.max(0.24, 0.72 - sourceTakeover * 0.28);
    }

    if (this.webglEnabled && targetTextureReady) {
      const targetTakeover = frame.targetReady
        ? Math.min(
            1,
            0.42 + frame.revealProgress * 0.34 + frame.targetMixProgress * 0.24,
          )
        : Math.min(
            0.68,
            0.22 + frame.targetFocus * 0.28 + frame.revealProgress * 0.12,
          );
      targetBackdropBlur = Math.max(1.2, targetBackdropBlur * (1 - targetTakeover * 0.88));
      targetBackdropOpacity *= frame.targetReady
        ? Math.max(0.02, 0.08 - targetTakeover * 0.06)
        : Math.max(0.0, 0.02 - targetTakeover * 0.02);
    }

    this.element.style.setProperty('--vr-travel-backdrop-blur', `${fallbackBlur}px`);
    this.element.style.setProperty(
      '--vr-travel-backdrop-scale',
      String(Number((frame.zoomScale + frame.fromEdgeMix * (frame.sourceKind === 'cover' ? 0.08 : 0.03)).toFixed(4))),
    );
    this.element.style.setProperty('--vr-travel-backdrop-shift', `${frame.fromShiftPercent}%`);
    this.element.style.setProperty(
      '--vr-travel-from-backdrop-opacity',
      String(fromBackdropOpacity),
    );
    this.element.style.setProperty('--vr-travel-backdrop-brightness', String(presentation.backdropBrightness));
    this.element.style.setProperty('--vr-travel-from-cut-inner', `${presentation.fromCenterCutInner}%`);
    this.element.style.setProperty('--vr-travel-from-cut-outer', `${presentation.fromCenterCutOuter}%`);
    this.element.style.setProperty(
      '--vr-travel-target-backdrop-blur',
      `${targetBackdropBlur}px`,
    );
    this.element.style.setProperty(
      '--vr-travel-target-backdrop-scale',
      String(Number(Math.max(1, frame.zoomScale - 0.01).toFixed(4))),
    );
    this.element.style.setProperty('--vr-travel-target-backdrop-shift', `${frame.toShiftPercent}%`);
    this.element.style.setProperty('--vr-travel-target-backdrop-opacity', String(targetBackdropOpacity));
    this.element.style.setProperty('--vr-travel-target-reveal-inset', `${presentation.targetRevealInset}%`);
    const forwardRevealMode = frame.wipeFrom === 'center';
    const sweepOffset = forwardRevealMode
      ? frame.stage === 'turn-in'
        ? 0
        : frame.stage === 'travel'
          ? 0
          : 0
      : frame.travelDirX * (
          frame.stage === 'turn-in'
            ? 8 - frame.stageProgress * 22
            : frame.stage === 'travel'
              ? -4 - frame.stageProgress * 32
              : -12 + frame.settleStrength * 8
        );
    const sweepRotate = forwardRevealMode
      ? frame.stage === 'turn-in'
        ? frame.curveStrength * 1.2
        : frame.stage === 'travel'
          ? frame.curveStrength * 1.8
          : 0
      : frame.travelDirX * (
          frame.stage === 'turn-in'
            ? 6 + frame.curveStrength * 5 + frame.forwardDriveStrength * 4
            : frame.stage === 'travel'
              ? 8 + frame.curveStrength * 8 + frame.forwardDriveStrength * 5
              : 2 + frame.curveStrength * 2
        );
    const sweepOpacity = clamp(
      frame.stage === 'settle'
        ? 0.22 - frame.settleStrength * 0.18
        : forwardRevealMode
          ? 0.26 + frame.stageProgress * 0.18 + frame.forwardDriveStrength * 0.14 + frame.curveStrength * 0.03
          : 0.24 + frame.stageProgress * 0.22 + frame.forwardDriveStrength * 0.2 + frame.curveStrength * 0.1,
      0,
      forwardRevealMode ? 0.68 : 0.72,
    );
    const corridorOpacity = clamp(
      frame.stage === 'settle'
        ? 0.12 - frame.settleStrength * 0.1
        : forwardRevealMode
          ? 0.24 + frame.forwardDriveStrength * 0.2 + frame.curveStrength * 0.03 + frame.targetFocus * 0.03
          : 0.16 + frame.forwardDriveStrength * 0.18 + frame.curveStrength * 0.06 + frame.targetFocus * 0.08,
      0,
      forwardRevealMode ? 0.54 : 0.44,
    );
    this.element.style.setProperty('--vr-travel-sweep-offset', `${sweepOffset}%`);
    this.element.style.setProperty('--vr-travel-sweep-rotate', `${sweepRotate}deg`);
    this.element.style.setProperty('--vr-travel-sweep-opacity', String(round3(sweepOpacity)));
    this.element.style.setProperty('--vr-travel-corridor-opacity', String(round3(corridorOpacity)));
    const directionalVeilOpacity = clamp(
      frame.stage === 'settle'
        ? 0.1 - frame.settleStrength * 0.08
        : forwardRevealMode
          ? 0.26 + frame.stageProgress * 0.1 + frame.forwardDriveStrength * 0.16
          : 0.16 + frame.stageProgress * 0.12 + frame.forwardDriveStrength * 0.1 + frame.curveStrength * 0.08,
      0,
      forwardRevealMode ? 0.58 : 0.38,
    );
    const directionalVeilWidth = clamp(
      forwardRevealMode
        ? 34 + frame.forwardDriveStrength * 14
        : 38 + frame.forwardDriveStrength * 10 + frame.curveStrength * 12,
      forwardRevealMode ? 28 : 34,
      forwardRevealMode ? 52 : 58,
    );
    this.element.style.setProperty('--vr-travel-directional-veil-opacity', String(round3(directionalVeilOpacity)));
    this.element.style.setProperty('--vr-travel-directional-veil-width', `${round3(directionalVeilWidth)}%`);
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

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round3(value: number): number {
  return Math.round(value * 1000) / 1000;
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
