export type VrLayoutProfile = 'desktop' | 'mobile-compact';

export type VrLayoutProfileInput = {
  width: number;
  height: number;
  coarsePointer: boolean;
};

export function resolveVrLayoutProfile({
  width,
  height,
  coarsePointer,
}: VrLayoutProfileInput): VrLayoutProfile {
  const safeWidth = Math.max(0, width);
  const safeHeight = Math.max(0, height);
  const shortestEdge = Math.min(safeWidth, safeHeight);
  const longestEdge = Math.max(safeWidth, safeHeight);

  if (safeWidth <= 820) {
    return 'mobile-compact';
  }

  if (coarsePointer && shortestEdge <= 900 && longestEdge <= 1400) {
    return 'mobile-compact';
  }

  return 'desktop';
}

export function detectCurrentVrLayoutProfile(
  targetWindow: Window = window,
): VrLayoutProfile {
  const coarsePointer =
    targetWindow.matchMedia?.('(pointer: coarse)').matches ?? false;

  return resolveVrLayoutProfile({
    width: targetWindow.innerWidth,
    height: targetWindow.innerHeight,
    coarsePointer,
  });
}

export function applyVrLayoutProfile(
  targetDocument: Document = document,
  profile: VrLayoutProfile,
): void {
  targetDocument.documentElement.dataset.vrLayout = profile;
  targetDocument.body?.setAttribute('data-vr-layout', profile);
  targetDocument.body?.classList.toggle(
    'vr-layout-mobile-compact',
    profile === 'mobile-compact',
  );
}
