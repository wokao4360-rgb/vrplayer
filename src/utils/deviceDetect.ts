/**
 * 设备类型检测工具
 * 区分触控设备和鼠标设备
 */

let cachedDeviceType: 'touch' | 'mouse' | null = null;

/**
 * 检测设备类型
 * A 类（触控设备）：支持 touch 事件，或 pointerType === 'touch'，或 navigator.maxTouchPoints > 0
 * B 类（鼠标设备）：不支持 touch，pointerType === 'mouse'
 */
export function detectInputType(): 'touch' | 'mouse' {
  if (cachedDeviceType !== null) {
    return cachedDeviceType;
  }

  // 检查 maxTouchPoints（最可靠的方式）
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
    cachedDeviceType = 'touch';
    return cachedDeviceType;
  }

  // 检查是否支持 touch 事件（作为后备）
  if (typeof window !== 'undefined') {
    if (
      'ontouchstart' in window ||
      (window as any).DocumentTouch && document instanceof (window as any).DocumentTouch
    ) {
      cachedDeviceType = 'touch';
      return cachedDeviceType;
    }
  }

  // 默认判定为鼠标设备
  cachedDeviceType = 'mouse';
  return cachedDeviceType;
}

/**
 * 判断是否为触控设备
 */
export function isTouchDevice(): boolean {
  return detectInputType() === 'touch';
}

/**
 * 判断是否为鼠标设备
 */
export function isMouseDevice(): boolean {
  return detectInputType() === 'mouse';
}

