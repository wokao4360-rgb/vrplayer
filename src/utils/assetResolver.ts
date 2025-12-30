/**
 * 资源 URL 解析器
 * 统一处理所有资源 URL，方便未来切换到不同 CDN 或存储方案
 */

/**
 * 资源类型枚举
 */
export enum AssetType {
  THUMB = 'thumb',        // 缩略图：用于列表/预览
  PANO_LOW = 'panoLow',  // 低清全景图：首屏快速加载
  PANO = 'pano',         // 高清全景图：高清替换
  VIDEO = 'video',       // 视频：点击热点后才加载
  COVER = 'cover',       // 封面图：博物馆封面
  MAP = 'map',           // 地图图片
  DOLLHOUSE = 'dollhouse', // 三维模型（glb/gltf）
}

/**
 * 解析资源 URL
 * 
 * 当前实现：直接返回原始 URL（向后兼容）
 * 未来可扩展：
 * - 支持相对路径转换为绝对路径
 * - 支持腾讯云 COS URL 签名
 * - 支持本地开发环境路径映射
 * - 支持 CDN 域名切换
 * 
 * @param url 原始 URL（可能为空）
 * @param type 资源类型（用于日志和未来扩展）
 * @returns 解析后的 URL，如果输入为空则返回空字符串
 */
export function resolveAssetUrl(url: string | undefined, type: AssetType): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return '';
  }

  const trimmedUrl = url.trim();

  // 当前实现：直接返回（向后兼容）
  // 未来可以在这里添加：
  // - URL 验证
  // - 协议检查（http/https）
  // - CDN 域名替换
  // - 签名参数添加（如腾讯云 COS）
  
  return trimmedUrl;
}

/**
 * 预加载资源（用于缩略图等）
 * @param url 资源 URL
 * @param type 资源类型
 * @returns Promise，加载成功 resolve，失败 reject
 */
export function preloadAsset(url: string, type: AssetType): Promise<void> {
  return new Promise((resolve, reject) => {
    const resolvedUrl = resolveAssetUrl(url, type);
    
    if (!resolvedUrl) {
      reject(new Error(`资源 URL 为空 (${type})`));
      return;
    }

    if (type === AssetType.VIDEO) {
      // 视频预加载：创建 video 元素
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error(`视频加载失败: ${resolvedUrl}`));
      video.src = resolvedUrl;
    } else {
      // 图片预加载：创建 Image 元素（原生加载，不用 fetch）
      // 导入代理 URL 工具
      import('./externalImage').then(({ toProxiedImageUrl }) => {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.crossOrigin = 'anonymous';
        (img as any).loading = 'lazy';
        img.decoding = 'async';
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`图片加载失败: ${resolvedUrl}`));
        img.src = toProxiedImageUrl(resolvedUrl);
      }).catch((error) => {
        reject(new Error(`导入代理工具失败: ${error}`));
      });
    }
  });
}





















