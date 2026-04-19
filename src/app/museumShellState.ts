import type { Museum, Scene, SceneHotspot } from '../types/config.ts';
import type { MuseumShellCoverViewModel } from '../ui/MuseumShellChrome.ts';
import { getMuseumEntrySceneId } from '../utils/museumEntry.ts';

export type MuseumShellRouteDecision =
  | {
      kind: 'cover';
      museumId: string;
      targetSceneId: string;
      requestedSceneId: string | null;
    }
  | {
      kind: 'scene';
      museumId: string;
      targetSceneId: string;
    };

export type MuseumSceneRuntimePlan = {
  shellStrategy: 'mount-shell' | 'reuse-shell';
  transitionDriver: 'viewer' | 'shell';
  viewStrategy: 'reset-to-target' | 'preserve-current';
};

type RequestedView = {
  yaw?: number;
  pitch?: number;
  fov?: number;
};

type BuildMuseumCoverModelArgs = {
  appName: string;
  brandTitle: string;
  museum: Museum;
  targetSceneId: string;
};

type BuildMuseumPreloadPlanArgs = {
  museum: Museum;
  targetSceneId: string;
};

type PreloadPlan = {
  primarySceneIds: string[];
  neighborSceneIds: string[];
  previewAssets: string[];
};

type ResolveMuseumShellRouteArgs = {
  museum: Museum;
  requestedSceneId?: string;
  hasEnteredMuseum: boolean;
};

type ResolveMuseumSceneRuntimePlanArgs = {
  currentMuseumId: string | null;
  hasViewerShell: boolean;
  nextMuseumId: string;
  requestedView?: RequestedView;
};

export function resolveMuseumShellRoute({
  museum,
  requestedSceneId,
  hasEnteredMuseum,
}: ResolveMuseumShellRouteArgs): MuseumShellRouteDecision {
  const entrySceneId = getMuseumEntrySceneId(museum);
  const targetSceneId = requestedSceneId ?? entrySceneId;
  if (!targetSceneId) {
    throw new Error(`museum ${museum.id} does not contain any scenes`);
  }

  if (!hasEnteredMuseum || !requestedSceneId) {
    return {
      kind: 'cover',
      museumId: museum.id,
      targetSceneId,
      requestedSceneId: requestedSceneId ?? null,
    };
  }

  return {
    kind: 'scene',
    museumId: museum.id,
    targetSceneId,
  };
}

export function resolveMuseumSceneRuntimePlan({
  currentMuseumId,
  hasViewerShell,
  nextMuseumId,
  requestedView,
}: ResolveMuseumSceneRuntimePlanArgs): MuseumSceneRuntimePlan {
  const sameMuseum = Boolean(hasViewerShell && currentMuseumId && currentMuseumId === nextMuseumId);
  if (!sameMuseum) {
    return {
      shellStrategy: 'mount-shell',
      transitionDriver: 'shell',
      viewStrategy: 'reset-to-target',
    };
  }

  return {
    shellStrategy: 'reuse-shell',
    transitionDriver: 'viewer',
    viewStrategy: hasExplicitRequestedView(requestedView) ? 'reset-to-target' : 'preserve-current',
  };
}

export function buildMuseumCoverModel({
  appName,
  brandTitle,
  museum,
  targetSceneId,
}: BuildMuseumCoverModelArgs): MuseumShellCoverViewModel & { targetSceneId: string } {
  return {
    appName,
    brandTitle,
    title: museum.name,
    subtitle:
      museum.marketing?.hook?.trim() ||
      museum.description?.trim() ||
      `${museum.name} 单馆连续漫游，进入后可在同一壳层内切换场景。`,
    ctaLabel: '点击开启 VR 漫游',
    heroImage: museum.cover,
    targetSceneId,
  };
}

export function buildMuseumPreloadPlan({
  museum,
  targetSceneId,
}: BuildMuseumPreloadPlanArgs): PreloadPlan {
  const targetScene = museum.scenes.find((scene) => scene.id === targetSceneId) ?? null;
  const primarySceneIds = targetScene ? [targetScene.id] : [];
  const neighborSceneIds = targetScene ? collectNeighborSceneIds(targetScene) : [];
  const previewAssets = uniqueDefinedStrings([
    targetScene?.panoLow ?? targetScene?.thumb,
    ...neighborSceneIds.map((sceneId) => {
      const neighborScene = museum.scenes.find((scene) => scene.id === sceneId);
      return neighborScene?.panoLow ?? neighborScene?.thumb;
    }),
  ]);

  return {
    primarySceneIds,
    neighborSceneIds,
    previewAssets,
  };
}

function hasExplicitRequestedView(requestedView?: RequestedView): boolean {
  if (!requestedView) return false;
  return [requestedView.yaw, requestedView.pitch, requestedView.fov].some(
    (value) => typeof value === 'number' && Number.isFinite(value),
  );
}

function collectNeighborSceneIds(scene: Scene): string[] {
  const sceneIds = scene.hotspots
    .filter(isSceneHotspot)
    .map((hotspot) => hotspot.target?.sceneId)
    .filter((value): value is string => typeof value === 'string' && value.length > 0);
  return Array.from(new Set(sceneIds));
}

function isSceneHotspot(hotspot: SceneHotspot): boolean {
  return hotspot.type === 'scene' && Boolean(hotspot.target?.sceneId);
}

function uniqueDefinedStrings(values: Array<string | undefined | null>): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    if (!value || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}
