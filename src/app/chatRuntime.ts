import type { Museum, Scene } from '../types/config';
import type { FcChatConfig } from '../services/fcChatClient';
import type { FcChatPanel } from '../ui/FcChatPanel';

type ChatContext = {
  museum: Museum;
  scene: Scene;
  fcChatConfig: FcChatConfig | null | undefined;
};

function hasValidEndpoint(config: FcChatConfig | null | undefined): config is FcChatConfig {
  return Boolean(config?.endpoint && config.endpoint.trim());
}

export class ChatRuntime {
  private context: ChatContext | null = null;
  private contextToken = 0;
  private initPromise: Promise<void> | null = null;
  private panel: FcChatPanel | null = null;

  updateContext(context: ChatContext): void {
    this.context = context;
    this.contextToken += 1;
  }

  async ensureInit(): Promise<void> {
    const context = this.context;
    if (!context || !hasValidEndpoint(context.fcChatConfig)) {
      return;
    }
    if (this.panel) {
      return;
    }
    if (this.initPromise) {
      await this.initPromise;
      return;
    }

    const token = this.contextToken;
    const pending = (async () => {
      const [{ FcChatPanel }, { FcChatClient }] = await Promise.all([
        import('../ui/FcChatPanel'),
        import('../services/fcChatClient'),
      ]);
      if (token !== this.contextToken) {
        return;
      }

      const latest = this.context;
      if (!latest || !hasValidEndpoint(latest.fcChatConfig)) {
        return;
      }

      const client = new FcChatClient({
        endpoint: latest.fcChatConfig.endpoint,
        authToken: latest.fcChatConfig.authToken,
        timeoutMs: 15000,
      });

      this.panel?.remove();
      this.panel = new FcChatPanel(client, {
        museumId: latest.museum.id,
        sceneId: latest.scene.id,
        sceneTitle: latest.scene.name,
        museumName: latest.museum.name,
        url: window.location.href,
      });
    })();

    this.initPromise = pending.finally(() => {
      if (this.initPromise === pending) {
        this.initPromise = null;
      }
    });
    await this.initPromise;
  }

  dispose(): void {
    this.contextToken += 1;
    this.context = null;
    this.initPromise = null;
    this.panel?.remove();
    this.panel = null;
  }
}
