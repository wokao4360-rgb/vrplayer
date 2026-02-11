export type RequestChannel = 'tile' | 'pano' | 'preload' | 'ui';

type QueueItem<T> = {
  task: () => Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

type SchedulerProfile = {
  global: number;
  channels: Record<RequestChannel, number>;
};

type ChannelState = {
  active: number;
  queue: QueueItem<any>[];
};

const CHANNEL_ORDER: RequestChannel[] = ['tile', 'pano', 'ui', 'preload'];

const DESKTOP_PROFILE: SchedulerProfile = {
  global: 10,
  channels: {
    tile: 6,
    pano: 3,
    preload: 2,
    ui: 4,
  },
};

const MOBILE_PROFILE: SchedulerProfile = {
  global: 6,
  channels: {
    tile: 4,
    pano: 2,
    preload: 1,
    ui: 2,
  },
};

const channels: Record<RequestChannel, ChannelState> = {
  tile: { active: 0, queue: [] },
  pano: { active: 0, queue: [] },
  preload: { active: 0, queue: [] },
  ui: { active: 0, queue: [] },
};

let globalActive = 0;
let pumping = false;

function isLikelyMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  const nav = navigator as Navigator & { userAgentData?: { mobile?: boolean } };
  if (nav.userAgentData?.mobile === true) return true;

  const hasTouch = (navigator.maxTouchPoints || 0) > 1;
  const ua = navigator.userAgent || '';
  const uaMobile = /Android|iPhone|iPad|iPod|Mobile|HarmonyOS/i.test(ua);

  if (typeof window !== 'undefined') {
    const smallViewport = Math.min(window.innerWidth, window.innerHeight) <= 900;
    return hasTouch && (uaMobile || smallViewport);
  }
  return hasTouch || uaMobile;
}

function currentProfile(): SchedulerProfile {
  return isLikelyMobileDevice() ? MOBILE_PROFILE : DESKTOP_PROFILE;
}

function runNext(channel: RequestChannel): boolean {
  const profile = currentProfile();
  const state = channels[channel];
  const channelLimit = profile.channels[channel];
  if (state.active >= channelLimit) return false;
  if (globalActive >= profile.global) return false;

  const item = state.queue.shift();
  if (!item) return false;

  state.active += 1;
  globalActive += 1;
  void item
    .task()
    .then((result) => item.resolve(result))
    .catch((error) => item.reject(error))
    .finally(() => {
      state.active = Math.max(0, state.active - 1);
      globalActive = Math.max(0, globalActive - 1);
      pump();
    });
  return true;
}

function pump(): void {
  if (pumping) return;
  pumping = true;
  try {
    let progressed = true;
    while (progressed) {
      progressed = false;
      for (const channel of CHANNEL_ORDER) {
        if (runNext(channel)) {
          progressed = true;
        }
      }
    }
  } finally {
    pumping = false;
  }
}

export function scheduleImageRequest<T>(channel: RequestChannel, task: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    channels[channel].queue.push({ task, resolve, reject });
    pump();
  });
}

export function getImageSchedulerStats(): {
  profile: SchedulerProfile;
  globalActive: number;
  channels: Record<RequestChannel, { active: number; queued: number }>;
} {
  const profile = currentProfile();
  return {
    profile,
    globalActive,
    channels: {
      tile: { active: channels.tile.active, queued: channels.tile.queue.length },
      pano: { active: channels.pano.active, queued: channels.pano.queue.length },
      preload: { active: channels.preload.active, queued: channels.preload.queue.length },
      ui: { active: channels.ui.active, queued: channels.ui.queue.length },
    },
  };
}
