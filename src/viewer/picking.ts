import { Camera, MathUtils, Raycaster, Vector2 } from 'three';

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
 * @param sphereRadius 全景球半径（不再使用，保留参数以兼容调用方）
 * @returns { yaw: number, pitch: number } | null
 *   - yaw: 水平角（度），范围 [-180, 180]
 *   - pitch: 仰俯角（度），范围 [-90, 90]
 *   - null: 仅在 ray.direction 不存在时返回
 */
export function getYawPitchFromNDC(
  ndcX: number,
  ndcY: number,
  camera: Camera,
  sphereRadius: number = 500
): { yaw: number; pitch: number } | null {
  // 创建射线
  const raycaster = new Raycaster();
  raycaster.setFromCamera(new Vector2(ndcX, ndcY), camera);

  // 直接使用 ray.direction（归一化向量）计算 yaw/pitch，不依赖球体相交
  const dir = raycaster.ray.direction;
  if (!dir || dir.length() === 0) {
    return null;
  }

  // 归一化方向向量（确保是单位向量）
  const normalized = dir.normalize();

  // 计算 pitch（仰俯角）：arcsin(y)，范围 [-90, 90]
  const pitchRad = Math.asin(Math.max(-1, Math.min(1, normalized.y)));
  const pitch = MathUtils.radToDeg(pitchRad);

  // 计算 yaw（水平角）：atan2(x, z)，范围 [-180, 180]
  const yawRad = Math.atan2(normalized.x, normalized.z);
  const yaw = MathUtils.radToDeg(yawRad);

  return { yaw, pitch };
}
