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
  image?: string; // 真实平面图图片（可选，如视导出的结构图/平面图）
  width: number;
  height: number;
}

export interface DollhouseConfig {
  modelUrl?: string; // 真实三维模型 glb/gltf（如视导出或其他）
  scale?: number; // 可选缩放
  offset?: { x: number; y: number; z: number }; // 可选平移
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
  dollhouse?: DollhouseConfig; // 真实三维模型配置（可选）
  scenes: Scene[];
}

export interface FcChatConfig {
  endpoint?: string;
  authToken?: string;
}

export interface AppConfig {
  appName: string;
  museums: Museum[];
  fcChat?: FcChatConfig;
}

