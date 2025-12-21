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
  image: string;
  width: number;
  height: number;
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
  // 可选快捷字段：用于 image/info/video 等轻量配置
  src?: string;
  text?: string;
  title?: string;
  poster?: string;
}

export interface Scene {
  id: string;
  name: string;
  pano?: string; // 高清全景图（可选，如果提供了 panoLow）
  panoLow?: string; // 低清全景图（可选，优先加载）
  thumb: string;
  initialView: InitialView;
  mapPoint: MapPoint;
  hotspots: SceneHotspot[];
  northYaw?: number; // 世界北方向（度），相对于全景图纹理的正前方。如果未指定，默认为 0（纹理正前方就是北）
}

export interface Museum {
  id: string;
  name: string;
  cover: string;
  map: MapConfig;
  scenes: Scene[];
}

export interface AppConfig {
  appName: string;
  museums: Museum[];
}

