import type { AppConfig, Museum, Scene } from '../types/config';
import { validateConfig, type ValidationError } from './configValidator';

let configCache: AppConfig | null = null;

/**
 * 加载并校验配置
 * @throws 如果配置校验失败，抛出包含 ValidationError[] 的错误
 */
export async function loadConfig(): Promise<AppConfig> {
  if (configCache) {
    return configCache;
  }

  try {
    const response = await fetch('./config.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`加载配置失败: ${response.status}`);
    }
    const data = await response.json();
    
    // 运行时校验
    const errors = validateConfig(data);
    if (errors.length > 0) {
      const validationError = new Error('配置校验失败');
      (validationError as any).validationErrors = errors;
      throw validationError;
    }
    
    configCache = data as AppConfig;
    return configCache;
  } catch (error) {
    console.error('加载配置失败:', error);
    throw error;
  }
}

/**
 * 清除配置缓存（用于重新加载）
 */
export function clearConfigCache(): void {
  configCache = null;
}

export function getMuseum(museumId: string): Museum | undefined {
  if (!configCache) return undefined;
  return configCache.museums.find(m => m.id === museumId);
}

export function getScene(museumId: string, sceneId: string): Scene | undefined {
  const museum = getMuseum(museumId);
  if (!museum) return undefined;
  return museum.scenes.find(s => s.id === sceneId);
}















