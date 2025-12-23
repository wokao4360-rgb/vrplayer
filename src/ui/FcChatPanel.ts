import { FcChatClient, type FcChatConfig, type FcChatContext } from '../services/fcChatClient';

type Message = {
  role: 'user' | 'assistant' | 'system';
  text: string;
};

type FcChatPanelOptions = {
  endpoint: string;
  authToken?: string;
  context?: FcChatContext; // 可选：传 museumId/sceneId 等上下文
};

export class FcChatPanel {
  private element: HTMLElement;
  private isOpen = false;
  private input: HTMLInputElement | null = null;
  private messagesContainer: HTMLElement | null = null;
  private errorEl: HTMLElement | null = null;
  private messages: Message[] = [
    { role: 'assistant', text: '我是三馆学伴。你可以问我：展览亮点、参观路线、人物故事等。' },
  ];
  private loading = false;
  private client: FcChatClient;
  private context: FcChatContext | undefined;

  constructor(options: FcChatPanelOptions) {
    const config: FcChatConfig = {
      endpoint: options.endpoint,
      authToken: options.authToken,
      timeoutMs: 15000,
    };
    this.client = new FcChatClient(config);
    this.context = options.context;
    
    this.element = document.createElement('div');
    this.element.className = 'fc-chat-panel-container';
    this.render();
    this.applyStyles();
  }

  private render(): void {
    this.element.innerHTML = `
      <button class="fc-chat-toggle-btn" style="display: none;">三馆学伴</button>
      <div class="fc-chat-panel" style="display: none;">
        <div class="fc-chat-header">
          <div class="fc-chat-title">三馆学伴</div>
          <div class="fc-chat-header-actions">
            <button class="fc-chat-clear-btn">清空</button>
            <button class="fc-chat-close-btn">✕</button>
          </div>
        </div>
        <div class="fc-chat-messages"></div>
        <div class="fc-chat-footer">
          <div class="fc-chat-error"></div>
          <div class="fc-chat-input-row">
            <input 
              class="fc-chat-input" 
              type="text" 
              placeholder="输入问题，回车发送"
            />
            <button class="fc-chat-send-btn">发送</button>
          </div>
        </div>
      </div>
    `;

    const toggleBtn = this.element.querySelector('.fc-chat-toggle-btn') as HTMLButtonElement;
    const panel = this.element.querySelector('.fc-chat-panel') as HTMLElement;
    const closeBtn = this.element.querySelector('.fc-chat-close-btn') as HTMLButtonElement;
    const clearBtn = this.element.querySelector('.fc-chat-clear-btn') as HTMLButtonElement;
    const sendBtn = this.element.querySelector('.fc-chat-send-btn') as HTMLButtonElement;
    this.input = this.element.querySelector('.fc-chat-input') as HTMLInputElement;
    this.messagesContainer = this.element.querySelector('.fc-chat-messages') as HTMLElement;
    this.errorEl = this.element.querySelector('.fc-chat-error') as HTMLElement;

    toggleBtn?.addEventListener('click', () => this.open());
    closeBtn?.addEventListener('click', () => this.close());
    clearBtn?.addEventListener('click', () => this.clearMessages());
    sendBtn?.addEventListener('click', () => this.handleSend());
    this.input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleSend();
      }
    });

    this.updateMessagesDisplay();
    this.updateToggleButton();
  }

  private updateToggleButton(): void {
    const toggleBtn = this.element.querySelector('.fc-chat-toggle-btn') as HTMLButtonElement;
    const panel = this.element.querySelector('.fc-chat-panel') as HTMLElement;
    if (this.isOpen) {
      toggleBtn.style.display = 'none';
      panel.style.display = 'flex';
    } else {
      toggleBtn.style.display = 'block';
      panel.style.display = 'none';
    }
  }

  private updateMessagesDisplay(): void {
    if (!this.messagesContainer) return;
    
    this.messagesContainer.innerHTML = this.messages.map((msg) => {
      const align = msg.role === 'user' ? 'flex-end' : 'flex-start';
      const bg = msg.role === 'user' ? 'rgba(0,0,0,.08)' : 'rgba(33,150,243,.10)';
      
      return `
        <div style="margin-bottom: 10px; display: flex; justify-content: ${align};">
          <div style="max-width: 85%; padding: 8px 10px; border-radius: 10px; background: ${bg}; white-space: pre-wrap; line-height: 1.45;">
            ${this.escapeHtml(msg.text)}
          </div>
        </div>
      `;
    }).join('');
    
    // 滚动到底部
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private clearMessages(): void {
    this.messages = [
      { role: 'assistant', text: '我是三馆学伴。你可以问我：展览亮点、参观路线、人物故事等。' },
    ];
    this.updateMessagesDisplay();
  }

  private async handleSend(): Promise<void> {
    if (!this.input || this.loading) return;
    
    const question = this.input.value.trim();
    if (!question) return;

    this.input.value = '';
    this.setError('');
    this.setLoading(true);

    this.messages.push({ role: 'user', text: question });
    this.updateMessagesDisplay();

    try {
      const res = await this.client.ask(question, this.context);
      this.messages.push({ role: 'assistant', text: res.answer });
      this.updateMessagesDisplay();
    } catch (e: any) {
      const msg = String(e?.message ?? e ?? 'unknown error');
      this.setError(msg);
      this.messages.push({ role: 'assistant', text: `请求失败：${msg}` });
      this.updateMessagesDisplay();
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    if (this.input) {
      this.input.disabled = loading;
      this.input.placeholder = loading ? '发送中...' : '输入问题，回车发送';
    }
    const sendBtn = this.element.querySelector('.fc-chat-send-btn') as HTMLButtonElement;
    if (sendBtn) {
      sendBtn.disabled = loading;
      sendBtn.style.opacity = loading ? '0.5' : '1';
      sendBtn.style.cursor = loading ? 'not-allowed' : 'pointer';
    }
  }

  private setError(error: string): void {
    if (this.errorEl) {
      this.errorEl.textContent = error || '';
      this.errorEl.style.display = error ? 'block' : 'none';
    }
  }

  open(): void {
    this.isOpen = true;
    this.updateToggleButton();
  }

  close(): void {
    this.isOpen = false;
    this.updateToggleButton();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.element.remove();
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .fc-chat-panel-container {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 99999;
        font-family: system-ui, -apple-system, sans-serif;
      }
      
      .fc-chat-toggle-btn {
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,.15);
        background: white;
        cursor: pointer;
        box-shadow: 0 6px 24px rgba(0,0,0,.12);
        font-size: 14px;
        font-weight: 500;
      }
      
      .fc-chat-panel {
        width: 360px;
        height: 420px;
        border-radius: 12px;
        border: 1px solid rgba(0,0,0,.15);
        background: white;
        box-shadow: 0 12px 40px rgba(0,0,0,.18);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .fc-chat-header {
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,.08);
        display: flex;
        align-items: center;
      }
      
      .fc-chat-title {
        font-weight: 600;
        font-size: 14px;
      }
      
      .fc-chat-header-actions {
        margin-left: auto;
        display: flex;
        gap: 8px;
      }
      
      .fc-chat-clear-btn,
      .fc-chat-close-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        color: #555;
        font-size: 14px;
        padding: 4px 8px;
      }
      
      .fc-chat-close-btn {
        font-size: 16px;
        padding: 0;
        width: 24px;
        height: 24px;
      }
      
      .fc-chat-messages {
        flex: 1;
        padding: 10px;
        overflow: auto;
      }
      
      .fc-chat-footer {
        padding: 10px;
        border-top: 1px solid rgba(0,0,0,.08);
      }
      
      .fc-chat-error {
        color: #c00;
        font-size: 12px;
        margin-bottom: 6px;
        display: none;
      }
      
      .fc-chat-input-row {
        display: flex;
        gap: 8px;
      }
      
      .fc-chat-input {
        flex: 1;
        padding: 8px 10px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,.2);
        font-size: 14px;
      }
      
      .fc-chat-input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .fc-chat-send-btn {
        padding: 8px 12px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,.15);
        background: white;
        cursor: pointer;
        font-size: 14px;
      }
      
      .fc-chat-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);
  }
}

