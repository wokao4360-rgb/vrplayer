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
  camera: THREE.Camera,
  sphereRadius: number = 500
): { yaw: number; pitch: number } | null {
  // 创建射线
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);

  // 创建球体几何用于相交检测
  const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
  const sphereMesh = new THREE.Mesh(sphereGeometry);
  sphereMesh.position.set(0, 0, 0);

  // 计算射线与球面的交点
  const intersects = raycaster.intersectObject(sphereMesh);
  if (intersects.length === 0) {
    return null;
  }

  // 取第一个交点（最近的点）
  const point = intersects[0].point;

  // 归一化到单位向量
  const normalized = point.normalize();

  // 计算 pitch（仰俯角）：arcsin(y)，范围 [-90, 90]
  const pitch = THREE.MathUtils.radToDeg(Math.asin(Math.max(-1, Math.min(1, normalized.y))));

  // 计算 yaw（水平角）：atan2(x, z)，范围 [-180, 180]
  const yaw = THREE.MathUtils.radToDeg(Math.atan2(normalized.x, normalized.z));

  return { yaw, pitch };
}

