export interface InitialView {
  yaw: number;
  pitch: number;
  fov?: number;
}

export interface MapPoint {
  x: number;
  y: number;
}

export type FloorplanNodeKind = 'scene' | 'waypoint';

export type FloorplanNodeStatus = 'ready' | 'disabled';

export interface FloorplanNode {
  id: string;
  x: number;
  y: number;
  label: string;
  kind: FloorplanNodeKind;
  status: FloorplanNodeStatus;
  sceneId?: string;
}

export interface FloorplanPath {
  id: string;
  points: string[];
}

export interface MapConfig {
  image?: string;
  width: number;
  height: number;
  nodes?: FloorplanNode[];
  paths?: FloorplanPath[];
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

export interface LandingConfig {
  brandTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  projectNote?: string;
}

export interface MuseumMarketing {
  hook: string;
  tags: string[];
}

export interface Museum {
  id: string;
  name: string;
  description?: string;
  cover: string;
  marketing?: MuseumMarketing;
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
  baseUrls?: string[];
  includePrefixes?: string[];
  excludePrefixes?: string[];
  probePath?: string;
  probeTimeoutMs?: number;
}

export interface AppConfig {
  appName: string;
  landing?: LandingConfig;
  museums: Museum[];
  fcChat?: FcChatConfig;
  assetCdn?: AssetCdnConfig;
}
