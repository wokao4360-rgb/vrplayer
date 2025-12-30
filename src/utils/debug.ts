/**
 * 轻量级调试开关（默认关闭）
 * 开启时会在控制台打印关键状态变化，用于调试和问题排查
 * 
 * 使用方式：
 * - URL 参数：?debug=1 自动启用
 * - 本地调试：将默认值改为 true
 * - 生产环境：保持 false，不产生任何日志、无性能影响
 */
export const __VR_DEBUG__ = (() => {
  // 检查 URL 参数 ?debug=1
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === '1';
  }
  return false;
})();

/**
 * 调试日志输出（仅在 __VR_DEBUG__ 为 true 时生效）
 */
export function debugLog(...args: any[]): void {
  if (__VR_DEBUG__) {
    console.debug('[VR Debug]', ...args);
  }
}

