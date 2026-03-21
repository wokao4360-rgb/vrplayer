export type ResolveSceneTransitionAssetsArgs = {
  coverWasVisible: boolean;
  previewUrl?: string;
  previewAlreadyReady: boolean;
  coverHeroUrl?: string;
  viewerSnapshot?: string;
  previousScenePreviewImage?: string;
};

export type SceneTransitionAssets = {
  fromImage?: string;
  targetPreviewImage?: string;
};

export function resolveSceneTransitionAssets(
  args: ResolveSceneTransitionAssetsArgs,
): SceneTransitionAssets {
  const previewImage = firstNonEmpty(args.previewUrl);
  const targetPreviewImage = args.previewAlreadyReady ? previewImage : undefined;

  if (args.coverWasVisible) {
    return {
      fromImage: firstNonEmpty(
        previewImage,
        args.previousScenePreviewImage,
        args.viewerSnapshot,
        args.coverHeroUrl,
      ),
      targetPreviewImage,
    };
  }

  return {
    fromImage: firstNonEmpty(
      args.previousScenePreviewImage,
      previewImage,
      args.viewerSnapshot,
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
