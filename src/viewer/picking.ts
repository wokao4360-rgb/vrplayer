import { MathUtils, Raycaster, Vector2 } from '../vendor/three-core';
import type { Camera } from 'three';

/**
 * 灞忓箷鍧愭爣杞?NDC锛堟爣鍑嗗寲璁惧鍧愭爣锛? * @param clientX 灞忓箷 X 鍧愭爣
 * @param clientY 灞忓箷 Y 鍧愭爣
 * @param canvasRect canvas 鍏冪礌鐨?getBoundingClientRect()
 * @returns NDC 鍧愭爣 { x: [-1,1], y: [-1,1] }
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
 * 浠?NDC 鍧愭爣璁＄畻鍏ㄦ櫙鐞冧笂鐨?yaw/pitch锛堝害锛? * @param ndcX NDC X 鍧愭爣 [-1, 1]
 * @param ndcY NDC Y 鍧愭爣 [-1, 1]
 * @param camera Three.js 鐩告満
 * @param sphereRadius 鍏ㄦ櫙鐞冨崐寰勶紙涓嶅啀浣跨敤锛屼繚鐣欏弬鏁颁互鍏煎璋冪敤鏂癸級
 * @returns { yaw: number, pitch: number } | null
 *   - yaw: 姘村钩瑙掞紙搴︼級锛岃寖鍥?[-180, 180]
 *   - pitch: 浠颁刊瑙掞紙搴︼級锛岃寖鍥?[-90, 90]
 *   - null: 浠呭湪 ray.direction 涓嶅瓨鍦ㄦ椂杩斿洖
 */
export function getYawPitchFromNDC(
  ndcX: number,
  ndcY: number,
  camera: Camera,
  sphereRadius: number = 500
): { yaw: number; pitch: number } | null {
  // 鍒涘缓灏勭嚎
  const raycaster = new Raycaster();
  raycaster.setFromCamera(new Vector2(ndcX, ndcY), camera);

  // 鐩存帴浣跨敤 ray.direction锛堝綊涓€鍖栧悜閲忥級璁＄畻 yaw/pitch锛屼笉渚濊禆鐞冧綋鐩镐氦
  const dir = raycaster.ray.direction;
  if (!dir || dir.length() === 0) {
    return null;
  }

  // 褰掍竴鍖栨柟鍚戝悜閲忥紙纭繚鏄崟浣嶅悜閲忥級
  const normalized = dir.normalize();

  // 璁＄畻 pitch锛堜话淇锛夛細arcsin(y)锛岃寖鍥?[-90, 90]
  const pitchRad = Math.asin(Math.max(-1, Math.min(1, normalized.y)));
  const pitch = MathUtils.radToDeg(pitchRad);

  // 璁＄畻 yaw锛堟按骞宠锛夛細atan2(x, z)锛岃寖鍥?[-180, 180]
  const yawRad = Math.atan2(normalized.x, normalized.z);
  const yaw = MathUtils.radToDeg(yawRad);

  return { yaw, pitch };
}

