/**
 * VR模式管理器
 * 处理陀螺仪/设备方向控制，用于移动端VR眼镜功能
 * 使用四元数解耦算法，避免万向节锁和pitch-yaw串扰
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

// 基准视角（解耦后的yaw/pitch）
let baselineYaw: number | null = null;
let baselinePitch: number | null = null;
let hasBaseline = false;

// 平滑滤波状态
let smoothedYaw = 0;
let smoothedPitch = 0;
let isFirstFrame = true;

/**
 * 四元数类（简化版，用于设备方向计算）
 */
class Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  multiply(q: Quaternion): Quaternion {
    return new Quaternion(
      this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
      this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
      this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w,
      this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
    );
  }

  normalize(): Quaternion {
    const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (len === 0) return new Quaternion(0, 0, 0, 1);
    return new Quaternion(this.x / len, this.y / len, this.z / len, this.w / len);
  }
}

/**
 * 从欧拉角（度）创建四元数（ZYX顺序，即yaw-pitch-roll）
 */
function eulerToQuaternion(yawDeg: number, pitchDeg: number, rollDeg: number): Quaternion {
  const yaw = (yawDeg * Math.PI) / 180;
  const pitch = (pitchDeg * Math.PI) / 180;
  const roll = (rollDeg * Math.PI) / 180;

  const cy = Math.cos(yaw * 0.5);
  const sy = Math.sin(yaw * 0.5);
  const cp = Math.cos(pitch * 0.5);
  const sp = Math.sin(pitch * 0.5);
  const cr = Math.cos(roll * 0.5);
  const sr = Math.sin(roll * 0.5);

  return new Quaternion(
    cy * cp * sr - sy * sp * cr,
    sy * cp * sr + cy * sp * cr,
    sy * cp * cr - cy * sp * sr,
    cy * cp * cr + sy * sp * sr
  ).normalize();
}

/**
 * 从四元数提取欧拉角（ZYX顺序，返回yaw-pitch-roll，单位：度）
 */
function quaternionToEuler(q: Quaternion): { yaw: number; pitch: number; roll: number } {
  const qx = q.x;
  const qy = q.y;
  const qz = q.z;
  const qw = q.w;

  // 提取yaw (Z轴旋转)
  const siny_cosp = 2 * (qw * qz + qx * qy);
  const cosy_cosp = 1 - 2 * (qy * qy + qz * qz);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);

  // 提取pitch (Y轴旋转)
  const sinp = 2 * (qw * qy - qz * qx);
  let pitch: number;
  if (Math.abs(sinp) >= 1) {
    pitch = Math.sign(sinp) * Math.PI / 2; // 使用90度避免万向节锁
  } else {
    pitch = Math.asin(sinp);
  }

  // 提取roll (X轴旋转)
  const sinr_cosp = 2 * (qw * qx + qy * qz);
  const cosr_cosp = 1 - 2 * (qx * qx + qy * qy);
  const roll = Math.atan2(sinr_cosp, cosr_cosp);

  return {
    yaw: (yaw * 180) / Math.PI,
    pitch: (pitch * 180) / Math.PI,
    roll: (roll * 180) / Math.PI,
  };
}

/**
 * 获取屏幕方向角度（度）
 */
function getScreenOrientationAngle(): number {
  // 优先使用screen.orientation API
  if (typeof screen !== 'undefined' && screen.orientation && typeof screen.orientation.angle === 'number') {
    return screen.orientation.angle;
  }
  // 兼容旧API
  if (typeof window !== 'undefined' && typeof (window as any).orientation === 'number') {
    return (window as any).orientation;
  }
  return 0;
}

/**
 * 角度归一化到 [-180, 180]
 */
function normalizeAngle(angle: number): number {
  while (angle > 180) angle -= 360;
  while (angle < -180) angle += 360;
  return angle;
}

/**
 * 角度线性插值（处理跨-180/180边界）
 */
function lerpAngle(from: number, to: number, t: number): number {
  // 归一化到 [-180, 180]
  from = normalizeAngle(from);
  to = normalizeAngle(to);

  // 处理跨边界情况
  let diff = to - from;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  return normalizeAngle(from + diff * t);
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
 * 将设备方向数据转换为yaw/pitch（使用四元数解耦）
 * 参考three.js DeviceOrientationControls算法
 * 
 * W3C DeviceOrientation约定：
 * - alpha: 0-360, 绕Z轴旋转（指南针方向）
 * - beta: -180-180, 绕X轴旋转（前后倾斜）
 * - gamma: -90-90, 绕Y轴旋转（左右倾斜）
 */
function convertOrientationToYawPitch(
  alpha: number | null,
  beta: number | null,
  gamma: number | null
): { yaw: number; pitch: number } | null {
  if (alpha === null || beta === null || gamma === null) {
    return null;
  }

  // 1. 将alpha/beta/gamma转为弧度
  const alphaRad = (alpha * Math.PI) / 180;
  const betaRad = (beta * Math.PI) / 180;
  const gammaRad = (gamma * Math.PI) / 180;

  // 2. 构造设备方向四元数（按W3C约定：ZYX顺序，即alpha绕Z，beta绕X，gamma绕Y）
  // 注意：gamma需要取反以匹配相机坐标系（设备Y轴与相机Y轴相反）
  const qDevice = eulerToQuaternion(alpha, beta, -gamma);

  // 3. 设备坐标系到相机坐标系的固定旋转（-PI/2 around X轴）
  // 这会将设备坐标系（Z向前）转换为相机坐标系（Z向后）
  const q1 = eulerToQuaternion(0, 0, -90);

  // 4. 屏幕方向修正（考虑屏幕旋转）
  const screenAngle = getScreenOrientationAngle();
  const q0 = eulerToQuaternion(screenAngle, 0, 0);

  // 5. 组合：q = q0 * q1 * qDevice
  // 注意：四元数乘法顺序是从右到左应用变换
  const q = q0.multiply(q1).multiply(qDevice).normalize();

  // 6. 提取欧拉角（yaw-pitch-roll，ZYX顺序）
  const euler = quaternionToEuler(q);

  // 7. 奇异点防护：限制pitch范围到[-85, 85]避免万向节锁
  // 在pitch接近±90度时会出现万向节锁，限制范围可以避免
  let pitch = Math.max(-85, Math.min(85, euler.pitch));

  // 8. 归一化yaw到[-180, 180]
  let yaw = normalizeAngle(euler.yaw);

  // 9. 平滑滤波（防止抖动和暴走）
  if (isFirstFrame) {
    smoothedYaw = yaw;
    smoothedPitch = pitch;
    isFirstFrame = false;
  } else {
    // yaw使用更强的平滑（系数0.15），防止立正附近的暴走
    // pitch使用稍弱的平滑（系数0.2），保持响应性
    smoothedYaw = lerpAngle(smoothedYaw, yaw, 0.15);
    smoothedPitch = lerpAngle(smoothedPitch, pitch, 0.2);
  }

  return { yaw: smoothedYaw, pitch: smoothedPitch };
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
  baselineYaw = null;
  baselinePitch = null;
  smoothedYaw = 0;
  smoothedPitch = 0;
  isFirstFrame = true;

  updateCallback = onUpdate;

  // 监听设备方向事件
  orientationHandler = (e: DeviceOrientationEvent) => {
    if (!vrModeEnabled || !updateCallback) {
      return;
    }

    const result = convertOrientationToYawPitch(e.alpha, e.beta, e.gamma);
    if (!result) {
      return;
    }

    // 记录基准（第一次有效数据）
    if (!hasBaseline) {
      baselineYaw = result.yaw;
      baselinePitch = result.pitch;
      hasBaseline = true;
      return; // 第一次不更新视角
    }

    // 计算相对于基准的偏移
    const deltaYaw = normalizeAngle(result.yaw - (baselineYaw ?? 0));
    const deltaPitch = result.pitch - (baselinePitch ?? 0);

    // 调用回调，传递偏移量
    updateCallback(deltaYaw, deltaPitch);
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
  baselineYaw = null;
  baselinePitch = null;
  smoothedYaw = 0;
  smoothedPitch = 0;
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
