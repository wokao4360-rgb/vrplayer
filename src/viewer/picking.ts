import * as THREE from 'three';

/**
 * 屏幕坐标转 NDC（标准化设备坐标）
 * @param clientX 屏幕 X 坐标
 * @param clientY 屏幕 Y 坐标
 * @param canvasRect canvas 元素的 getBoundingClientRect()
 * @returns NDC 坐标 { x: [-1,1], y: [-1,1] }
 */
export function screenToNDC(
  clientX: number,
  clientY: number,
  canvasRect: DOMRect
): { x: number; y: number } {
  const x = ((clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
  const y = -(((clientY - canvasRect.top) / canvasRect.height) * 2 - 1);
  return { x, y };
}

/**
 * 从 NDC 坐标计算全景球上的 yaw/pitch（度）
 * @param ndcX NDC X 坐标 [-1, 1]
 * @param ndcY NDC Y 坐标 [-1, 1]
 * @param camera Three.js 相机
 * @param sphereRadius 全景球半径（默认 500）
 * @returns { yaw: number, pitch: number } | null
 *   - yaw: 水平角（度），范围 [-180, 180]
 *   - pitch: 仰俯角（度），范围 [-90, 90]
 *   - null: 射线未击中球（理论上不会发生）
 */
export function getYawPitchFromNDC(
  ndcX: number,
  ndcY: number,
  camera: THREE.Camera
): { yaw: number; pitch: number } {
  // 直接射线方向
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
  const dir = raycaster.ray.direction.clone().normalize();

  // 计算 yaw
  let yaw = THREE.MathUtils.radToDeg(Math.atan2(dir.x, dir.z));
  // 归一化到 [-180, 180]
  if (yaw < -180) yaw += 360;
  if (yaw > 180) yaw -= 360;

  // 计算 pitch
  let pitch = THREE.MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, dir.y))));
  // 归一化，理论正常 asin 已在区间内
  if (pitch < -90) pitch = -90;
  if (pitch > 90) pitch = 90;

  return { yaw, pitch };
}


