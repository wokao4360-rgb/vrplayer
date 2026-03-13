type SceneLike = {
  id: string;
};

type MuseumLike = {
  scenes?: SceneLike[];
};

export function getMuseumEntrySceneId(museum: MuseumLike | null | undefined): string | null {
  if (!museum || !Array.isArray(museum.scenes) || museum.scenes.length === 0) {
    return null;
  }

  return museum.scenes[0]?.id ?? null;
}
