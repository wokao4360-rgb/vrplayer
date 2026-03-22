export type SceneEnterView = {
  yaw?: number;
  pitch?: number;
  fov?: number;
};

export type SceneEnterSource =
  | 'cover-cta'
  | 'hotspot'
  | 'guide-tray'
  | 'guide-drawer'
  | 'route';

export type SceneEnterMeta = {
  source: SceneEnterSource;
  hotspotScreenX?: number;
  hotspotId?: string;
};

export type SceneTransitionView = {
  yaw: number;
  pitch: number;
  fov: number;
};

