/**
 * VR模式管理器
 * 处理陀螺仪/设备方向控制，用于移动端VR眼镜功能
 */

import { isFullscreen } from './fullscreenState';
import { showToast } from '../ui/toast';

type OrientationUpdateCallback = (yaw: number, pitch: number) => void;

let vrModeEnabled = false;
let orientationHandler: ((e: DeviceOrientationEvent) => void) | null = null;
let updateCallback: OrientationUpdateCallback | null = null;

// 扩展DeviceOrientationEvent类型（浏览器原生类型）
interface DeviceOrientationEvent extends Event {
  alpha: number | null; // 0-360, 设备绕Z轴旋转（指南针方向）
  beta: number | null;   // -180-180, 设备绕X轴旋转（前后倾斜）
  gamma: number | null; // -90-90, 设备绕Y轴旋转（左右倾斜）
}
let initialAlpha: number | null = null;
let initialBeta: number | null = null;
let initialGamma: number | null = null;
let hasInitialOrientation = false;

/**
 * 检查是否为iOS设备
 */
function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * 请求iOS陀螺仪权限
 * 必须在用户手势回调内调用
 */
async function requestIOSPermission(): Promise<boolean> {
  if (!isIOS()) {
    return true; // 非iOS设备不需要权限
  }

  // iOS 13+ 需要权限
  if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
    try {
      const permission = await (DeviceOrientationEvent as any).requestPermission();
      return permission === 'granted';
    } catch (err) {
      console.warn('[VRMode] iOS permission request failed:', err);
      return false;
    }
  }

  // iOS 12及以下不需要权限
  return true;
}

/**
 * 将设备方向数据转换为yaw/pitch
 * alpha: 0-360, 设备绕Z轴旋转（指南针方向）
 * beta: -180-180, 设备绕X轴旋转（前后倾斜）
 * gamma: -90-90, 设备绕Y轴旋转（左右倾斜）
 */
function convertOrientationToYawPitch(
  alpha: number | null,
  beta: number | null,
  gamma: number | null
): { yaw: number; pitch: number } | null {
  if (alpha === null || beta === null || gamma === null) {
    return null;
  }

  // 初始化：记录初始方向作为基准
  if (!hasInitialOrientation) {
    initialAlpha = alpha;
    initialBeta = beta;
    initialGamma = gamma;
    hasInitialOrientation = true;
    return null; // 第一次返回null，不更新视角
  }

  // 计算相对于初始方向的偏移
  let yaw = alpha - (initialAlpha ?? 0);
  // 归一化到 -180 到 180
  while (yaw > 180) yaw -= 360;
  while (yaw < -180) yaw += 360;

  // pitch: beta表示前后倾斜，正值表示设备向后倾斜（抬头），负值表示向前倾斜（低头）
  // beta越大（向后倾斜）→ pitch应该越大（向上看）
  // 同时需要限制范围
  let pitch = beta - (initialBeta ?? 0);
  pitch = Math.max(-90, Math.min(90, pitch));

  return { yaw, pitch };
}

/**
 * 启用VR模式
 */
export async function enableVrMode(
  onUpdate: OrientationUpdateCallback
): Promise<boolean> {
  if (vrModeEnabled) {
    return true;
  }

  // 请求权限（iOS特殊处理）
  const hasPermission = await requestIOSPermission();
  if (!hasPermission) {
    showToast('未获得陀螺仪权限，无法进入VR模式');
    return false;
  }

  // 重置初始方向
  hasInitialOrientation = false;
  initialAlpha = null;
  initialBeta = null;
  initialGamma = null;

  updateCallback = onUpdate;

  // 监听设备方向事件
  orientationHandler = (e: DeviceOrientationEvent) => {
    if (!vrModeEnabled || !updateCallback) {
      return;
    }

    const result = convertOrientationToYawPitch(e.alpha, e.beta, e.gamma);
    if (result) {
      updateCallback(result.yaw, result.pitch);
    }
  };

  // 使用 deviceorientation 事件（标准）
  // 注意：iOS可能需要 deviceorientationabsolute，但先尝试标准事件
  window.addEventListener('deviceorientation', orientationHandler as EventListener);

  vrModeEnabled = true;
  return true;
}

/**
 * 禁用VR模式
 */
export function disableVrMode(): void {
  if (!vrModeEnabled) {
    return;
  }

  if (orientationHandler) {
    window.removeEventListener('deviceorientation', orientationHandler as EventListener);
    orientationHandler = null;
  }

  updateCallback = null;
  vrModeEnabled = false;
  hasInitialOrientation = false;
  initialAlpha = null;
  initialBeta = null;
  initialGamma = null;
}

/**
 * 切换VR模式
 */
export async function toggleVrMode(
  onUpdate: OrientationUpdateCallback
): Promise<boolean> {
  if (vrModeEnabled) {
    disableVrMode();
    return false;
  } else {
    return await enableVrMode(onUpdate);
  }
}

/**
 * 获取当前VR模式状态
 */
export function isVrModeEnabled(): boolean {
  return vrModeEnabled;
}

/**
 * 初始化：监听全屏状态变化，退出全屏时自动关闭VR模式
 */
export function initVrMode(): void {
  const handleFullscreenChange = () => {
    const isFullscreenNow = isFullscreen();
    if (!isFullscreenNow && vrModeEnabled) {
      // 退出全屏时自动关闭VR模式
      disableVrMode();
    }
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange as EventListener);
}

