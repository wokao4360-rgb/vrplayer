export type SceneShareView = {
  yaw: number;
  pitch: number;
  fov: number;
};

export type SceneSharePayload = {
  baseUrl: string;
  museumId: string;
  sceneId: string;
  museumName: string;
  sceneName: string;
  view: SceneShareView;
};

const YAW_PRECISION = 2;
const PITCH_PRECISION = 2;
const FOV_PRECISION = 1;

function roundTo(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function normalizeSceneShareView(view: SceneShareView): SceneShareView {
  return {
    yaw: roundTo(view.yaw, YAW_PRECISION),
    pitch: roundTo(view.pitch, PITCH_PRECISION),
    fov: roundTo(view.fov, FOV_PRECISION),
  };
}

export function buildSceneShareUrl(payload: SceneSharePayload): string {
  const url = new URL(payload.baseUrl);
  const view = normalizeSceneShareView(payload.view);
  url.hash = '';
  url.search = '';
  url.searchParams.set('museum', payload.museumId);
  url.searchParams.set('scene', payload.sceneId);
  url.searchParams.set('yaw', String(view.yaw));
  url.searchParams.set('pitch', String(view.pitch));
  url.searchParams.set('fov', String(view.fov));
  return url.toString();
}

export function buildSceneShareTitle(payload: SceneSharePayload): string {
  return `${payload.museumName} · ${payload.sceneName}`;
}

export function buildSceneShareText(payload: SceneSharePayload): string {
  return `我正在看「${payload.museumName}」的「${payload.sceneName}」这个视角，打开链接即可进入同一视角。`;
}

export function buildQqShareUrl(payload: SceneSharePayload): string {
  const shareUrl = new URL('https://connect.qq.com/widget/shareqq/index.html');
  shareUrl.searchParams.set('url', buildSceneShareUrl(payload));
  shareUrl.searchParams.set('title', buildSceneShareTitle(payload));
  shareUrl.searchParams.set('summary', buildSceneShareText(payload));
  return shareUrl.toString();
}

export function buildWeiboShareUrl(payload: SceneSharePayload): string {
  const shareUrl = new URL('https://service.weibo.com/share/share.php');
  shareUrl.searchParams.set('url', buildSceneShareUrl(payload));
  shareUrl.searchParams.set('title', buildSceneShareText(payload));
  return shareUrl.toString();
}

export function buildMailShareUrl(payload: SceneSharePayload): string {
  const subject = encodeURIComponent(buildSceneShareTitle(payload));
  const body = encodeURIComponent(`${buildSceneShareText(payload)}\n${buildSceneShareUrl(payload)}`);
  return `mailto:?subject=${subject}&body=${body}`;
}
