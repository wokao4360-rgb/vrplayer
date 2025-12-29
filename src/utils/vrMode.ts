/**
 * VR模式管理器
 * 处理陀螺仪/设备方向控制，用于移动端VR眼镜功能
 * 使用相对四元数 + 前向向量解算，彻底去耦pitch-yaw
 */

import { Quaternion, Euler, Vector3, MathUtils } from 'three';
import { isFullscreen } from './fullscreenState';
import { showToast } from '../ui/toast';

type OrientationUpdateCallback = (yawDelta: number, pitchDelta: number) => void;

let vrModeEnabled = false;
let orientationHandler: ((e: DeviceOrientationEvent) => void) | null = null;
let updateCallback: OrientationUpdateCallback | null = null;

// 扩展DeviceOrientationEvent类型（浏览器原生类型）
interface DeviceOrientationEvent extends Event {
  alpha: number | null; // 0-360, 设备绕Z轴旋转（指南针方向）
  beta: number | null;   // -180-180, 设备绕X轴旋转（前后倾斜）
  gamma: number | null; // -90-90, 设备绕Y轴旋转（左右倾斜）
}

// 基准四元数（进入VR模式时的设备姿态）
let qBaseline: Quaternion | null = null;
let hasBaseline = false;

// 平滑滤波状态（弧度）
let smoothedYawDelta = 0;
let smoothedPitchDelta = 0;
let isFirstFrame = true;

// three.js DeviceOrientationControls 标准常量
const zee = new Vector3(0, 0, 1);
const euler = new Euler();
const q0 = new Quaternion();
const q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // -PI/2 around X
const qCurrent = new Quaternion();
const forward = new Vector3(0, 0, -1); // 基准前向向量

/**
 * 获取屏幕方向角度（弧度）
 */
function getScreenOrientationRad(): number {
  const so: any = (screen as any).orientation;
  const angle = (so && typeof so.angle === 'number') 
    ? so.angle 
    : (typeof (window as any).orientation === 'number' 
      ? (window as any).orientation 
      : 0);
  return MathUtils.degToRad(angle || 0);
}

/**
 * 构建设备方向四元数（使用three.js DeviceOrientationControls标准算法）
 */
function buildDeviceQuaternion(alphaDeg: number, betaDeg: number, gammaDeg: number): Quaternion {
  const alpha = MathUtils.degToRad(alphaDeg || 0);
  const beta = MathUtils.degToRad(betaDeg || 0);
  const gamma = MathUtils.degToRad(gammaDeg || 0);
  const orient = getScreenOrientationRad();

  // three.js DeviceOrientationControls标准顺序：YXZ
  euler.set(beta, alpha, -gamma, 'YXZ');
  qCurrent.setFromEuler(euler);
  qCurrent.multiply(q1);
  qCurrent.multiply(q0.setFromAxisAngle(zee, -orient));
  
  return qCurrent.clone();
}

/**
 * 角度归一化到 [-PI, PI]（弧度）
 */
function normalizeAngleRad(angle: number): number {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
}

/**
 * 角度线性插值（处理跨-PI/PI边界，弧度）
 */
function lerpAngleRad(from: number, to: number, t: number): number {
  from = normalizeAngleRad(from);
  to = normalizeAngleRad(to);

  let diff = to - from;
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;

  return normalizeAngleRad(from + diff * t);
}

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

  // 重置基准和平滑状态
  hasBaseline = false;
  qBaseline = null;
  smoothedYawDelta = 0;
  smoothedPitchDelta = 0;
  isFirstFrame = true;

  updateCallback = onUpdate;

  // 监听设备方向事件
  orientationHandler = (e: DeviceOrientationEvent) => {
    if (!vrModeEnabled || !updateCallback) {
      return;
    }

    if (e.alpha === null || e.beta === null || e.gamma === null) {
      return;
    }

    // 构建当前设备方向四元数
    const qNow = buildDeviceQuaternion(e.alpha, e.beta, e.gamma);

    // 记录基准（第一次有效数据）
    if (!hasBaseline) {
      qBaseline = qNow.clone();
      hasBaseline = true;
      return; // 第一次不更新视角
    }

    // 计算相对旋转：qRel = qNow * qBaseline.invert()
    const qBaselineInv = qBaseline.clone().invert();
    const qRel = qNow.clone().multiply(qBaselineInv);

    // 用相对旋转旋转基准前向向量
    const fwd = forward.clone().applyQuaternion(qRel);

    // 从前向向量解算yaw/pitch（弧度）
    // yaw = atan2(fwd.x, -fwd.z)
    // pitch = asin(clamp(fwd.y, -1, 1))
    const yawDeltaRad = Math.atan2(fwd.x, -fwd.z);
    const pitchDeltaRad = Math.asin(Math.max(-1, Math.min(1, fwd.y)));

    // 平滑滤波（防止抖动）
    if (isFirstFrame) {
      smoothedYawDelta = yawDeltaRad;
      smoothedPitchDelta = pitchDeltaRad;
      isFirstFrame = false;
    } else {
      // yaw使用角度lerp（处理跨-PI/PI边界）
      smoothedYawDelta = lerpAngleRad(smoothedYawDelta, yawDeltaRad, 0.15);
      // pitch使用线性lerp
      smoothedPitchDelta = smoothedPitchDelta + (pitchDeltaRad - smoothedPitchDelta) * 0.2;
    }

    // 转换为度并调用回调
    const yawDeltaDeg = MathUtils.radToDeg(smoothedYawDelta);
    const pitchDeltaDeg = MathUtils.radToDeg(smoothedPitchDelta);

    updateCallback(yawDeltaDeg, pitchDeltaDeg);
  };

  // 使用 deviceorientation 事件（标准）
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
  hasBaseline = false;
  qBaseline = null;
  smoothedYawDelta = 0;
  smoothedPitchDelta = 0;
  isFirstFrame = true;
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
