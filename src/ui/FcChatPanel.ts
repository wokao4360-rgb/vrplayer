import { FcChatClient } from "../services/fcChatClient";
import type { FcChatContext } from "../services/fcChatClient";

type Role = "assistant" | "user";

type ChatMsg = {
  role: Role;
  text: string;
};

export class FcChatPanel {
  private client: FcChatClient;
  private context: FcChatContext;

  private root!: HTMLDivElement;
  private header!: HTMLDivElement;
  private body!: HTMLDivElement;
  private list!: HTMLDivElement;
  private input!: HTMLInputElement;
  private sendBtn!: HTMLButtonElement;
  private clearBtn!: HTMLButtonElement;
  private closeBtn!: HTMLButtonElement;
  private statusLine!: HTMLDivElement;

  private dragging = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  private messages: ChatMsg[] = [];

  constructor(client: FcChatClient, context: FcChatContext) {
    this.client = client;
    this.context = context;

    this.mount();
    this.injectStyles();
    this.ensureWelcome();
  }

  public destroy() {
    this.root?.remove();
  }

  private mount() {
    // Root
    this.root = document.createElement("div");
    this.root.className = "fcchat-root";
    this.root.setAttribute("role", "dialog");
    this.root.setAttribute("aria-label", "三馆学伴");

    // Header
    this.header = document.createElement("div");
    this.header.className = "fcchat-header";

    const title = document.createElement("div");
    title.className = "fcchat-title";
    title.textContent = "三馆学伴";

    const headerRight = document.createElement("div");
    headerRight.className = "fcchat-header-right";

    this.clearBtn = document.createElement("button");
    this.clearBtn.className = "fcchat-btn fcchat-btn-ghost";
    this.clearBtn.type = "button";
    this.clearBtn.textContent = "清空";
    this.clearBtn.addEventListener("click", () => this.clear());

    this.closeBtn = document.createElement("button");
    this.closeBtn.className = "fcchat-btn fcchat-btn-ghost fcchat-close";
    this.closeBtn.type = "button";
    this.closeBtn.setAttribute("aria-label", "关闭");
    this.closeBtn.textContent = "×";
    this.closeBtn.addEventListener("click", () => this.hide());

    headerRight.appendChild(this.clearBtn);
    headerRight.appendChild(this.closeBtn);

    this.header.appendChild(title);
    this.header.appendChild(headerRight);

    // Body
    this.body = document.createElement("div");
    this.body.className = "fcchat-body";

    // List
    this.list = document.createElement("div");
    this.list.className = "fcchat-list";
    this.body.appendChild(this.list);

    // Status line
    this.statusLine = document.createElement("div");
    this.statusLine.className = "fcchat-status";
    this.statusLine.textContent = "";
    this.body.appendChild(this.statusLine);

    // Input bar
    const inputBar = document.createElement("div");
    inputBar.className = "fcchat-inputbar";

    this.input = document.createElement("input");
    this.input.className = "fcchat-input";
    this.input.type = "text";
    this.input.placeholder = "输入问题，回车发送";
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.onSend();
    });

    this.sendBtn = document.createElement("button");
    this.sendBtn.className = "fcchat-btn fcchat-btn-primary";
    this.sendBtn.type = "button";
    this.sendBtn.textContent = "发送";
    this.sendBtn.addEventListener("click", () => this.onSend());

    inputBar.appendChild(this.input);
    inputBar.appendChild(this.sendBtn);

    this.root.appendChild(this.header);
    this.root.appendChild(this.body);
    this.root.appendChild(inputBar);

    document.body.appendChild(this.root);

    // Default position
    this.root.style.left = "auto";
    this.root.style.top = "auto";
    this.root.style.right = "18px";
    this.root.style.bottom = "18px";

    // Drag (desktop only; mobile adaptation in next step)
    this.header.addEventListener("mousedown", (e) => this.onDragStart(e));
    window.addEventListener("mousemove", (e) => this.onDragMove(e));
    window.addEventListener("mouseup", () => this.onDragEnd());
  }

  private hide() {
    this.root.style.display = "none";
    this.ensureToggleButton();
  }

  private show() {
    this.root.style.display = "flex";
    const btn = document.getElementById("fcchat-toggle-btn");
    if (btn) btn.remove();
    this.scrollToBottom();
    this.input.focus();
  }

  private ensureToggleButton() {
    if (document.getElementById("fcchat-toggle-btn")) return;

    const btn = document.createElement("button");
    btn.id = "fcchat-toggle-btn";
    btn.className = "fcchat-toggle-btn";
    btn.type = "button";
    btn.textContent = "三馆学伴";
    btn.addEventListener("click", () => this.show());
    document.body.appendChild(btn);
  }

  private onDragStart(e: MouseEvent) {
    // prevent drag when clicking buttons
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    this.dragging = true;

    const rect = this.root.getBoundingClientRect();
    this.dragOffsetX = e.clientX - rect.left;
    this.dragOffsetY = e.clientY - rect.top;

    // switch to left/top positioning
    this.root.style.right = "auto";
    this.root.style.bottom = "auto";
    this.root.style.left = rect.left + "px";
    this.root.style.top = rect.top + "px";
  }

  private onDragMove(e: MouseEvent) {
    if (!this.dragging) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = this.root.getBoundingClientRect();

    let left = e.clientX - this.dragOffsetX;
    let top = e.clientY - this.dragOffsetY;

    // clamp
    left = Math.max(8, Math.min(left, vw - rect.width - 8));
    top = Math.max(8, Math.min(top, vh - rect.height - 8));

    this.root.style.left = left + "px";
    this.root.style.top = top + "px";
  }

  private onDragEnd() {
    this.dragging = false;
  }

  private clear() {
    this.messages = [];
    this.list.innerHTML = "";
    this.statusLine.textContent = "";
    this.ensureWelcome();
  }

  private ensureWelcome() {
    if (this.messages.length > 0) return;
    this.addMessage("assistant", "我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。");
  }

  private setBusy(busy: boolean, statusText = "") {
    this.sendBtn.disabled = busy;
    this.input.disabled = busy;
    this.statusLine.textContent = statusText;
  }

  private normalizeText(s: string) {
    // 去掉首字符前的空白（你提到的问题）
    return (s ?? "").replace(/^\s+/, "");
  }

  private addMessage(role: Role, text: string) {
    const msg: ChatMsg = { role, text: this.normalizeText(text) };
    this.messages.push(msg);

    const row = document.createElement("div");
    row.className = `fcchat-row ${role === "user" ? "is-user" : "is-assistant"}`;

    const bubble = document.createElement("div");
    bubble.className = `fcchat-bubble ${role === "user" ? "bubble-user" : "bubble-assistant"}`;
    bubble.textContent = msg.text;

    row.appendChild(bubble);
    this.list.appendChild(row);

    this.scrollToBottom();
  }

  private scrollToBottom() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  private async onSend() {
    const q = this.input.value.trim();
    if (!q) return;

    this.input.value = "";
    this.addMessage("user", q);

    try {
      this.setBusy(true, "思考中…");
      const res = await this.client.ask(q, this.context);
      this.addMessage("assistant", res.answer);
      this.setBusy(false, "");
    } catch (e: any) {
      const msg = typeof e?.message === "string" ? e.message : String(e);
      this.addMessage("assistant", `请求失败：${msg}`);
      this.setBusy(false, "");
    }
  }

  private injectStyles() {
    if (document.getElementById("fcchat-style")) return;

    const style = document.createElement("style");
    style.id = "fcchat-style";
    style.textContent = `
      .fcchat-root{
        position: fixed;
        z-index: 99999;
        width: 420px;
        height: 520px;
        display: flex;
        flex-direction: column;
        border-radius: 14px;
        background: #fff;
        box-shadow: 0 14px 50px rgba(0,0,0,.18);
        overflow: hidden;
        resize: both;
        min-width: 320px;
        min-height: 360px;
      }

      .fcchat-header{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding: 10px 10px 10px 12px;
        border-bottom: 1px solid rgba(0,0,0,.06);
        background: #f8fafc;
        cursor: move;
        user-select: none;
      }
      .fcchat-title{
        font-size: 15px;
        font-weight: 700;
        color: #111827;
      }
      .fcchat-header-right{
        display:flex;
        align-items:center;
        gap: 8px;
      }

      .fcchat-body{
        flex: 1;
        display:flex;
        flex-direction: column;
        min-height: 0;
        background: #ffffff;
      }
      .fcchat-list{
        flex: 1;
        overflow: auto;
        padding: 12px;
        display:flex;
        flex-direction: column;
        gap: 10px;
      }

      .fcchat-row{
        display:flex;
      }
      .fcchat-row.is-user{
        justify-content: flex-end;
      }
      .fcchat-row.is-assistant{
        justify-content: flex-start;
      }

      /* 气泡：限制最大宽度，解决"你好"太长 */
      .fcchat-bubble{
        max-width: 72%;
        padding: 8px 10px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.45;
        letter-spacing: .1px;
        white-space: pre-wrap;
        overflow-wrap: anywhere; /* 强制长串断行 */
        word-break: break-word;
      }
      .bubble-user{
        background: #2563eb;
        color: #fff;
        border-top-right-radius: 6px;
      }
      .bubble-assistant{
        background: #eef2f7;
        color: #111827;
        border-top-left-radius: 6px;
      }

      .fcchat-status{
        padding: 6px 12px 0 12px;
        font-size: 12px;
        color: #6b7280;
        min-height: 18px;
      }

      .fcchat-inputbar{
        display:flex;
        gap: 10px;
        padding: 10px;
        border-top: 1px solid rgba(0,0,0,.06);
        background: #fff;
      }
      .fcchat-input{
        flex: 1;
        height: 36px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,.12);
        padding: 0 10px;
        font-size: 13px;
        outline: none;
      }
      .fcchat-input:focus{
        border-color: rgba(37,99,235,.55);
        box-shadow: 0 0 0 3px rgba(37,99,235,.12);
      }

      .fcchat-btn{
        height: 36px;
        border-radius: 10px;
        border: 1px solid transparent;
        padding: 0 12px;
        font-size: 13px;
        cursor: pointer;
        user-select: none;
      }
      .fcchat-btn:disabled{
        opacity: .6;
        cursor: not-allowed;
      }
      .fcchat-btn-primary{
        background: #2563eb;
        color: #fff;
      }
      .fcchat-btn-ghost{
        background: transparent;
        color: #111827;
        border-color: rgba(0,0,0,.10);
        height: 30px;
        padding: 0 10px;
        border-radius: 10px;
        font-size: 12px;
      }
      .fcchat-close{
        width: 30px;
        padding: 0;
        font-size: 18px;
        line-height: 28px;
      }

      .fcchat-toggle-btn{
        position: fixed;
        z-index: 99998;
        right: 18px;
        bottom: 18px;
        height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: none;
        background: #2563eb;
        color: #fff;
        font-size: 13px;
        box-shadow: 0 10px 30px rgba(37,99,235,.35);
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  getElement(): HTMLElement {
    return this.root;
  }

  remove(): void {
    this.destroy();
  }
}
