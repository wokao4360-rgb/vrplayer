/**
 * 预热管理器
 * 负责资源预热：去重、并发控制、debounce、过期 token 管理
 */

type PreloadTask = () => Promise<void>;

export type PreloadManagerOptions = {
  maxConcurrent?: number;
  debounceMs?: number;
};

export class PreloadManager {
  private maxConcurrent: number;
  private debounceMs: number;
  private allowHeavyPreload: boolean = true;
  
  private currentToken: number = 0;
  private fetchedUrls: Set<string> = new Set();
  private activeCount: number = 0;
  private queue: PreloadTask[] = [];
  private debounceTimer: number | null = null;
  private pendingAim: { museumId: string; sceneId: string; payload: { thumbUrl?: string; panoUrl?: string } } | null = null;

  constructor(options: PreloadManagerOptions = {}) {
    this.maxConcurrent = options.maxConcurrent ?? 2;
    this.debounceMs = options.debounceMs ?? 150;
  }

  /**
   * 设置策略（是否允许预热大资源）
   */
  setPolicy(allowHeavy: boolean): void {
    this.allowHeavyPreload = allowHeavy;
  }

  /**
   * 清除所有预热任务
   */
  clear(): void {
    // 清除 debounce timer
    if (this.debounceTimer !== null) {
      window.clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    
    // 增加 token，使所有正在进行的任务过期
    this.currentToken++;
    
    // 清空队列
    this.queue = [];
    this.pendingAim = null;
    
    // 注意：不清除 fetchedUrls Set（保持去重缓存）
    // 注意：不清除 activeCount（让正在进行的任务自然完成，但会被 token 检查忽略）
  }

  /**
   * 目标预热（带 debounce）
   */
  aim(museumId: string, sceneId: string, payload: { thumbUrl?: string; panoUrl?: string }): void {
    // 清除之前的 debounce timer
    if (this.debounceTimer !== null) {
      window.clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    
    // 保存待处理的 aim
    this.pendingAim = { museumId, sceneId, payload };
    
    // 启动 debounce timer
    this.debounceTimer = window.setTimeout(() => {
      this.debounceTimer = null;
      if (this.pendingAim) {
        this.executeAim(this.pendingAim.museumId, this.pendingAim.sceneId, this.pendingAim.payload);
        this.pendingAim = null;
      }
    }, this.debounceMs);
  }

  /**
   * 执行预热（内部方法，在 debounce 后调用）
   */
  private executeAim(museumId: string, sceneId: string, payload: { thumbUrl?: string; panoUrl?: string }): void {
    const token = ++this.currentToken; // 更新 token
    
    // 预热 thumb（总是执行）
    if (payload.thumbUrl) {
      this.preloadImage(payload.thumbUrl, token);
    }
    
    // 预热 pano（仅在允许大资源预热时执行）
    if (this.allowHeavyPreload && payload.panoUrl) {
      this.preloadImage(payload.panoUrl, token);
    }
  }

  /**
   * 预热图片（使用 Image）
   */
  private preloadImage(url: string, token: number): void {
    // 去重检查
    if (this.fetchedUrls.has(url)) {
      return; // 已预取过，跳过
    }
    
    // 标记为已预取（立即标记，避免并发重复）
    this.fetchedUrls.add(url);
    
    // 创建任务
    const task: PreloadTask = async () => {
      try {
        // 检查 token 是否过期
        if (token !== this.currentToken) {
          return; // token 过期，忽略
        }
        
        // 使用 Image 预取（原生加载，不用 fetch）
        // 导入代理 URL 工具
        const { toProxiedImageUrl } = await import('../utils/externalImage');
        const proxiedUrl = toProxiedImageUrl(url);
        
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.referrerPolicy = 'no-referrer';
          img.crossOrigin = 'anonymous';
          img.decoding = 'async';
          img.loading = 'lazy';
          img.onload = () => {
            // 再次检查 token
            if (token === this.currentToken) {
              resolve();
            }
          };
          img.onerror = () => {
            // 预取失败也无所谓，静默忽略
            // 再次检查 token
            if (token === this.currentToken) {
              resolve(); // 即使失败也 resolve，避免阻塞队列
            }
          };
          img.src = proxiedUrl;
        });
      } catch (error) {
        // 吞掉所有错误，不污染控制台
        // 静默忽略
      } finally {
        // 减少活跃计数
        this.activeCount--;
        // 处理下一个任务
        this.processQueue();
      }
    };
    
    // 添加到队列或直接执行
    if (this.activeCount < this.maxConcurrent) {
      this.activeCount++;
      task();
    } else {
      this.queue.push(task);
    }
  }

  /**
   * 处理队列（内部方法）
   */
  private processQueue(): void {
    while (this.activeCount < this.maxConcurrent && this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        this.activeCount++;
        task();
      }
    }
  }

  /**
   * 清理资源
   */
  dispose(): void {
    this.clear();
    this.fetchedUrls.clear();
  }
}






