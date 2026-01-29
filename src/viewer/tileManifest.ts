export type TileLevel = {
  z: number;
  cols: number;
  rows: number;
};

export type TileManifest = {
  type: 'equirect-tiles';
  tileSize: number;
  baseUrl: string;
  levels: TileLevel[];
  tileFormat?: 'jpg' | 'ktx2';
};

export async function fetchTileManifest(url: string): Promise<TileManifest> {
  const init: RequestInit = {
    cache: 'default',
  };
  (init as any).priority = 'high';
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`manifest 加载失败: ${url}`);
  }
  const manifest = (await res.json()) as TileManifest;
  if (!manifest.tileFormat) manifest.tileFormat = 'jpg';
  return manifest;
}
