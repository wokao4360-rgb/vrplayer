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
  hintLabel?: string;
  yaw: number;
  pitch: number;
  preloadHint?: 'entry' | 'neighbor' | 'hero' | 'background';
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
  worldYawOffset?: number;
}

export interface SceneShellPreviewConfig {
  url: string;
  width?: number;
  height?: number;
}

export interface SceneShellHiresTileManifestConfig {
  format: 'tile-manifest';
  manifestUrl: string;
}

export interface SceneShellHiresPanoramaConfig {
  format: 'panorama';
  url: string;
}

export type SceneShellHiresConfig =
  | SceneShellHiresTileManifestConfig
  | SceneShellHiresPanoramaConfig;

export interface SceneShellConfig {
  preview?: SceneShellPreviewConfig;
  hires?: SceneShellHiresConfig;
  neighbors?: string[];
}

export interface Scene {
  id: string;
  name: string;
  pano?: string;
  panoLow?: string;
  panoTiles?: PanoTilesConfig;
  shell?: SceneShellConfig;
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

export interface MuseumShellCoverConfig {
  heroImage?: string;
  brandLogos?: string[];
  ctaLabel?: string;
  eyebrow?: string;
  note?: string;
  title?: string;
  subtitle?: string;
}

export interface MuseumShellConfig {
  title?: string;
  subtitle?: string;
  defaultSceneId?: string;
  cover?: MuseumShellCoverConfig;
}

export interface Museum {
  id: string;
  name: string;
  description?: string;
  cover: string;
  marketing?: MuseumMarketing;
  shell?: MuseumShellConfig;
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
