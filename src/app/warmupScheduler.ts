type WarmupTask = () => Promise<unknown> | unknown;
type WarmupStartMode = 'idle' | 'immediate';

type WarmupBudget = {
  maxConcurrent: number;
  staggerMs: number;
  idleTimeoutMs: number;
};

type IdleHandle = number;
type IdleCallback = (deadline?: { didTimeout: boolean; timeRemaining: () => number }) => void;

const requestIdle =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? (window.requestIdleCallback as (callback: IdleCallback, options?: { timeout: number }) => IdleHandle)
    : null;

const cancelIdle =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? (window.cancelIdleCallback as (handle: IdleHandle) => void)
    : null;

function detectBudget(): WarmupBudget {
  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string;
      saveData?: boolean;
      downlink?: number;
    };
  };

  const connection = nav.connection;
  const effectiveType = connection?.effectiveType || '';
  const saveData = Boolean(connection?.saveData);
  const downlink = connection?.downlink || 0;

  if (saveData || effectiveType.includes('2g')) {
    return { maxConcurrent: 1, staggerMs: 260, idleTimeoutMs: 2200 };
  }
  if (effectiveType.includes('3g') || downlink < 1.5) {
    return { maxConcurrent: 1, staggerMs: 180, idleTimeoutMs: 1800 };
  }
  if (downlink > 0 && downlink < 5) {
    return { maxConcurrent: 2, staggerMs: 140, idleTimeoutMs: 1500 };
  }
  return { maxConcurrent: 3, staggerMs: 100, idleTimeoutMs: 1200 };
}

export class WarmupScheduler {
  private disposed = false;
  private started = false;
  private queue: WarmupTask[] = [];
  private active = 0;
  private readonly budget = detectBudget();
  private idleHandle: IdleHandle | null = null;
  private timerHandle: number | null = null;

  schedule(tasks: WarmupTask[], startMode: WarmupStartMode = 'idle'): void {
    if (this.disposed || this.started || tasks.length === 0) {
      return;
    }

    this.started = true;
    this.queue = tasks.slice();

    if (startMode === 'immediate') {
      this.pump();
      return;
    }

    this.startWhenIdle();
  }

  dispose(): void {
    this.disposed = true;
    this.queue = [];

    if (this.idleHandle !== null) {
      if (requestIdle && cancelIdle) {
        cancelIdle(this.idleHandle);
      } else {
        clearTimeout(this.idleHandle);
      }
      this.idleHandle = null;
    }

    if (this.timerHandle !== null) {
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
  }

  private startWhenIdle(): void {
    if (this.disposed) return;

    if (requestIdle && cancelIdle) {
      this.idleHandle = requestIdle(() => {
        this.idleHandle = null;
        this.pump();
      }, { timeout: this.budget.idleTimeoutMs });
      return;
    }

    this.idleHandle = window.setTimeout(() => {
      this.idleHandle = null;
      this.pump();
    }, 220);
  }

  private pump(): void {
    if (this.disposed) return;

    while (this.active < this.budget.maxConcurrent && this.queue.length > 0) {
      const task = this.queue.shift();
      if (!task) continue;

      this.active += 1;
      void Promise.resolve(task())
        .catch(() => {
          // 预热任务失败不阻断主流程。
        })
        .finally(() => {
          this.active = Math.max(0, this.active - 1);
          if (this.disposed) return;
          if (this.queue.length === 0 && this.active === 0) return;

          if (this.timerHandle !== null) {
            clearTimeout(this.timerHandle);
          }

          this.timerHandle = window.setTimeout(() => {
            this.timerHandle = null;
            this.pump();
          }, this.budget.staggerMs);
        });
    }
  }
}
