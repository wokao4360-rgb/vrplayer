import { MathUtils, PerspectiveCamera, Vector3 } from '../vendor/three-core';

/**
 * 灏?yaw/pitch 瑙掑害杞崲涓轰笘鐣岀┖闂翠腑鐨勫崟浣嶅悜閲?
 * @param yaw 鍋忚埅瑙掞紙搴︼級锛? 涓烘鍓嶆柟锛岄€嗘椂閽堜负姝?
 * @param pitch 淇话瑙掞紙搴︼級锛? 涓烘按骞筹紝鍚戜笅涓烘
 * @returns 鍗曚綅鍚戦噺锛堜笘鐣岀┖闂达級
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
 * 灏嗕笘鐣岀┖闂翠腑鐨勭偣鎶曞奖鍒板睆骞曞潗鏍?
 * @param worldPos 涓栫晫绌洪棿浣嶇疆锛堝崟浣嶅悜閲忥紝闇€瑕佷箻浠ュ崐寰勶級
 * @param camera 鐩告満
 * @param dom 瀹瑰櫒 DOM 鍏冪礌锛堢敤浜庤幏鍙栧昂瀵革級
 * @returns 灞忓箷鍧愭爣鍜屽彲瑙佹€?
 */
export function projectToScreen(
  worldPos: Vector3,
  camera: PerspectiveCamera,
  dom: HTMLElement
): { x: number; y: number; visible: boolean } {
  // 妫€鏌ユ槸鍚﹀湪鐩告満鍚庢柟
  const camPos = new Vector3();
  const camDir = new Vector3();
  camera.getWorldPosition(camPos);
  camera.getWorldDirection(camDir);
  
  const toPoint = new Vector3().copy(worldPos).sub(camPos);
  if (toPoint.dot(camDir) <= 0) {
    return { x: 0, y: 0, visible: false };
  }

  // 鎶曞奖鍒?NDC锛堝綊涓€鍖栬澶囧潗鏍囷級
  const ndc = new Vector3().copy(worldPos).project(camera);
  
  // 妫€鏌ユ槸鍚﹀湪瑙嗛敟浣撳唴
  const inFrustum = 
    ndc.x >= -1 && ndc.x <= 1 && 
    ndc.y >= -1 && ndc.y <= 1 && 
    ndc.z >= -1 && ndc.z <= 1;
  
  if (!inFrustum) {
    return { x: 0, y: 0, visible: false };
  }

  // NDC 杞睆骞曞潗鏍?
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  const x = (ndc.x + 1) * 0.5 * width;
  const y = (1 - (ndc.y + 1) * 0.5) * height;

  return { x, y, visible: true };
}

/**
 * 灏?yaw/pitch 瑙掑害杞崲涓哄睆骞曞潗鏍?
 * @param yaw 鍋忚埅瑙掞紙搴︼級
 * @param pitch 淇话瑙掞紙搴︼級
 * @param camera 鐩告満
 * @param dom 瀹瑰櫒 DOM 鍏冪礌
 * @param radius 鐞冧綋鍗婂緞锛堥粯璁?500锛屼笌 PanoViewer 涓€鑷达級
 * @returns 灞忓箷鍧愭爣鍜屽彲瑙佹€?
 */
export function yawPitchToScreen(
  yaw: number,
  pitch: number,
  camera: PerspectiveCamera,
  dom: HTMLElement,
  radius: number = 500
): { x: number; y: number; visible: boolean } {
  // 杞崲涓轰笘鐣岀┖闂村悜閲?
  const direction = yawPitchToVector3(yaw, pitch);
  
  // 涔樹互鍗婂緞寰楀埌涓栫晫绌洪棿浣嶇疆锛堝垱寤烘柊鍚戦噺閬垮厤淇敼鍘熷悜閲忥級
  const worldPos = direction.clone().multiplyScalar(radius);
  
  // 鎶曞奖鍒板睆骞?
  return projectToScreen(worldPos, camera, dom);
}









