export interface InitialView {
  yaw: number;
  pitch: number;
  fov?: number;
}

export interface MapPoint {
  x: number;
  y: number;
}

export interface MapConfig {
  image?: string;
  width: number;
  height: number;
}

export interface DollhouseConfig {
  modelUrl?: string;
  scale?: number;
  offset?: { x: number; y: number; z: number };
}

export interface SceneHotspotTarget {
  museumId?: string;
  sceneId?: string;
  yaw?: number;
  pitch?: number;
  fov?: number;
  url?: string;
  imageUrl?: string;
  text?: string;
  poster?: string;
}

export interface SceneHotspot {
  id: string;
  type: 'scene' | 'video' | 'image' | 'info';
  label: string;
  yaw: number;
  pitch: number;
  target?: SceneHotspotTarget;
  src?: string;
  text?: string;
  title?: string;
  poster?: string;
}

export interface PanoTilesConfig {
  manifest: string;
  fallbackPano?: string;
  fallbackPanoLow?: string;
}

export interface Scene {
  id: string;
  name: string;
  pano?: string;
  panoLow?: string;
  panoTiles?: PanoTilesConfig;
  thumb: string;
  initialView: InitialView;
  mapPoint: MapPoint;
  hotspots: SceneHotspot[];
  northYaw?: number;
}

export interface Museum {
  id: string;
  name: string;
  cover: string;
  map: MapConfig;
  dollhouse?: DollhouseConfig;
  scenes: Scene[];
}

export interface FcChatConfig {
  endpoint?: string;
  authToken?: string;
}

export interface AssetCdnConfig {
  enabled?: boolean;
  baseUrl?: string;
  includePrefixes?: string[];
  excludePrefixes?: string[];
}

export interface AppConfig {
  appName: string;
  museums: Museum[];
  fcChat?: FcChatConfig;
  assetCdn?: AssetCdnConfig;
}
