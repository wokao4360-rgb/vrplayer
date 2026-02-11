import { MathUtils, PerspectiveCamera, Vector3 } from 'three';

/**
 * 将 yaw/pitch 角度转换为世界空间中的单位向量
 * @param yaw 偏航角（度），0 为正前方，逆时针为正
 * @param pitch 俯仰角（度），0 为水平，向下为正
 * @returns 单位向量（世界空间）
 */
export function yawPitchToVector3(yaw: number, pitch: number): Vector3 {
  const yawRad = MathUtils.degToRad(yaw);
  const pitchRad = MathUtils.degToRad(pitch);

  const x = Math.cos(pitchRad) * Math.sin(yawRad);
  const y = Math.sin(pitchRad);
  const z = Math.cos(pitchRad) * Math.cos(yawRad);

  return new Vector3(x, y, z);
}

/**
 * 将世界空间中的点投影到屏幕坐标
 * @param worldPos 世界空间位置（单位向量，需要乘以半径）
 * @param camera 相机
 * @param dom 容器 DOM 元素（用于获取尺寸）
 * @returns 屏幕坐标和可见性
 */
export function projectToScreen(
  worldPos: Vector3,
  camera: PerspectiveCamera,
  dom: HTMLElement
): { x: number; y: number; visible: boolean } {
  // 检查是否在相机后方
  const camPos = new Vector3();
  const camDir = new Vector3();
  camera.getWorldPosition(camPos);
  camera.getWorldDirection(camDir);
  
  const toPoint = new Vector3().copy(worldPos).sub(camPos);
  if (toPoint.dot(camDir) <= 0) {
    return { x: 0, y: 0, visible: false };
  }

  // 投影到 NDC（归一化设备坐标）
  const ndc = new Vector3().copy(worldPos).project(camera);
  
  // 检查是否在视锥体内
  const inFrustum = 
    ndc.x >= -1 && ndc.x <= 1 && 
    ndc.y >= -1 && ndc.y <= 1 && 
    ndc.z >= -1 && ndc.z <= 1;
  
  if (!inFrustum) {
    return { x: 0, y: 0, visible: false };
  }

  // NDC 转屏幕坐标
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  const x = (ndc.x + 1) * 0.5 * width;
  const y = (1 - (ndc.y + 1) * 0.5) * height;

  return { x, y, visible: true };
}

/**
 * 将 yaw/pitch 角度转换为屏幕坐标
 * @param yaw 偏航角（度）
 * @param pitch 俯仰角（度）
 * @param camera 相机
 * @param dom 容器 DOM 元素
 * @param radius 球体半径（默认 500，与 PanoViewer 一致）
 * @returns 屏幕坐标和可见性
 */
export function yawPitchToScreen(
  yaw: number,
  pitch: number,
  camera: PerspectiveCamera,
  dom: HTMLElement,
  radius: number = 500
): { x: number; y: number; visible: boolean } {
  // 转换为世界空间向量
  const direction = yawPitchToVector3(yaw, pitch);
  
  // 乘以半径得到世界空间位置（创建新向量避免修改原向量）
  const worldPos = direction.clone().multiplyScalar(radius);
  
  // 投影到屏幕
  return projectToScreen(worldPos, camera, dom);
}








