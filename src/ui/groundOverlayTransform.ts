/**
 * 地面交互层变换工具
 * 统一 CompassDisk 和 GroundNavDots 的显示/隐藏与贴地变换逻辑
 */

const PITCH_SHOW_THRESHOLD = -55; // 开始显示的 pitch 阈值（度）
const PITCH_FULL_VISIBLE = -90; // 完全显示的 pitch（度）

export type GroundOverlayTransform = {
  opacity: number;
  translateY: number; // px
  scaleY: number;
  blur: number; // px
  clarity: number; // [0..1] pitch 越低（越接近 -90），clarity 越高
};

/**
 * 根据 pitch 计算地面交互层的贴地变换参数
 * pitch 范围：-55° ~ -90°
 * pitch 越往下，圆盘越贴地、越压扁、越明显
 */
export function computeGroundOverlayTransform(pitch: number): GroundOverlayTransform {
  // 归一化到 [0, 1]，pitch 从 -55° 到 -90°
  const t = Math.max(0, Math.min(1, 
    (pitch - PITCH_SHOW_THRESHOLD) / (PITCH_FULL_VISIBLE - PITCH_SHOW_THRESHOLD)
  ));

  // opacity: 0 -> 1（pitch 越低越明显）
  const opacity = t;

  // translateY: 0 -> -8px（向下移动，贴地效果）
  const translateY = -t * 8;

  // scaleY: 1 -> 0.3（垂直压缩，压扁效果）
  const scaleY = 1 - t * 0.7;

  // blur: 0 -> 2px（轻微模糊，增强贴地感）
  const blur = t * 2;

  // clarity: 0 -> 1（pitch 越低越清晰）
  // t 已经是从 0 到 1，pitch 从 -55° 到 -90°，所以 clarity = t
  const clarity = t;

  return { opacity, translateY, scaleY, blur, clarity };
}

/**
 * 判断是否应该显示地面交互层
 */
export function shouldShowGroundOverlay(pitch: number): boolean {
  return pitch <= PITCH_SHOW_THRESHOLD;
}




