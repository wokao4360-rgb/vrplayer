/**
 * 网络策略判断
 * 用于判断是否允许预热大资源（如全景图）
 */

export type NetworkPolicy = {
  allowHeavyPreload: boolean;
  reason?: string;
};

/**
 * 获取网络策略
 * 使用浏览器标准 API 判断网络状态，全部可选兜底
 */
export function getNetworkPolicy(): NetworkPolicy {
  const nav = navigator as any;
  
  // 检查 NetworkInformation API
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  if (connection) {
    // 1. 检查 saveData（省流模式）
    if (connection.saveData === true) {
      return {
        allowHeavyPreload: false,
        reason: 'saveData enabled',
      };
    }
    
    // 2. 检查 effectiveType（网络类型）
    if (connection.effectiveType) {
      const slowTypes = ['slow-2g', '2g'];
      if (slowTypes.includes(connection.effectiveType)) {
        return {
          allowHeavyPreload: false,
          reason: `effectiveType: ${connection.effectiveType}`,
        };
      }
    }
  }
  
  // 兜底：没有 connection API 或网络正常时，允许预热大资源
  return {
    allowHeavyPreload: true,
  };
}





