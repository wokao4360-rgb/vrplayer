export type ResolveSceneTransitionAssetsArgs = {
  coverWasVisible: boolean;
  sourcePreviewUrl?: string;
  targetPreviewUrl?: string;
  targetPreviewAlreadyReady: boolean;
  coverHeroUrl?: string;
  viewerSnapshot?: string;
  previousScenePreviewImage?: string;
};

export type SceneTransitionAssets = {
  fromImage?: string;
  targetPreviewImage?: string;
};

export function resolveSceneTransitionPreviewUrl(args: {
  thumbUrl?: string;
  panoLowUrl?: string;
  prefer?: 'thumb' | 'panoLow';
}): string | undefined {
  return args.prefer === 'panoLow'
    ? firstNonEmpty(args.panoLowUrl, args.thumbUrl)
    : firstNonEmpty(args.thumbUrl, args.panoLowUrl);
}

export function resolveSceneTransitionAssets(
  args: ResolveSceneTransitionAssetsArgs,
): SceneTransitionAssets {
  const sourcePreviewImage = firstNonEmpty(args.sourcePreviewUrl);
  const targetPreviewImage = args.targetPreviewAlreadyReady
    ? firstNonEmpty(args.targetPreviewUrl)
    : undefined;

  if (args.coverWasVisible) {
    return {
      fromImage: firstNonEmpty(
        targetPreviewImage,
        sourcePreviewImage,
        args.previousScenePreviewImage,
        args.viewerSnapshot,
        args.coverHeroUrl,
      ),
      targetPreviewImage,
    };
  }

  return {
    fromImage: firstNonEmpty(
      args.viewerSnapshot,
      sourcePreviewImage,
      args.previousScenePreviewImage,
      targetPreviewImage,
      args.coverHeroUrl,
    ),
    targetPreviewImage,
  };
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }
  return undefined;
}
