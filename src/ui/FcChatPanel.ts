import { FcChatClient, FcChatContext } from "../services/fcChatClient";

type Message = {
  role: "user" | "assistant" | "system";
  text: string;
};

export class FcChatPanel {
  private root!: HTMLDivElement;
  private header!: HTMLDivElement;
  private body!: HTMLDivElement;
  private input!: HTMLInputElement;
  private sendBtn!: HTMLButtonElement;

  private messages: Message[] = [];
  private client: FcChatClient;
  private context?: FcChatContext;

  private dragging = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  constructor(client: FcChatClient, context?: FcChatContext) {
    this.client = client;
    this.context = context;
    this.createUI();
    this.bindDrag();
  }

  /* ---------------- UI ---------------- */

  private createUI() {
    // root
    this.root = document.createElement("div");
    this.root.style.cssText = `
      position: fixed;
      right: 24px;
      bottom: 24px;
      width: 360px;
      height: 420px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,.18);
      display: flex;
      flex-direction: column;
      z-index: 9999;
      resize: both;
      overflow: hidden;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    `;

    /* ---------- header ---------- */
    this.header = document.createElement("div");
    this.header.innerText = "三馆学伴";
    this.header.style.cssText = `
      height: 40px;
      line-height: 40px;
      padding: 0 12px;
      font-size: 14px;
      font-weight: 600;
      color: #111;
      background: #f5f7fa;
      cursor: move;
      user-select: none;
      border-bottom: 1px solid #e5e7eb;
      flex-shrink: 0;
    `;
    this.root.appendChild(this.header);

    /* ---------- body ---------- */
    this.body = document.createElement("div");
    this.body.style.cssText = `
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      background: #fafafa;
    `;
    this.root.appendChild(this.body);

    /* ---------- footer ---------- */
    const footer = document.createElement("div");
    footer.style.cssText = `
      display: flex;
      gap: 8px;
      padding: 8px;
      border-top: 1px solid #e5e7eb;
      background: #fff;
      flex-shrink: 0;
    `;

    this.input = document.createElement("input");
    this.input.placeholder = "输入问题，回车发送";
    this.input.style.cssText = `
      flex: 1;
      height: 32px;
      font-size: 13px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      outline: none;
    `;

    this.sendBtn = document.createElement("button");
    this.sendBtn.innerText = "发送";
    this.sendBtn.style.cssText = `
      height: 32px;
      padding: 0 14px;
      font-size: 13px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: #2563eb;
      color: #fff;
    `;

    footer.appendChild(this.input);
    footer.appendChild(this.sendBtn);
    this.root.appendChild(footer);

    document.body.appendChild(this.root);

    this.sendBtn.onclick = () => this.send();
    this.input.onkeydown = (e) => {
      if (e.key === "Enter") this.send();
    };

    // greeting
    this.addMessage("assistant", "我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。");
  }

  /* ---------------- Drag ---------------- */

  private bindDrag() {
    this.header.addEventListener("mousedown", (e) => {
      this.dragging = true;
      const rect = this.root.getBoundingClientRect();
      this.dragOffsetX = e.clientX - rect.left;
      this.dragOffsetY = e.clientY - rect.top;
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.dragging) return;
      this.root.style.left = `${e.clientX - this.dragOffsetX}px`;
      this.root.style.top = `${e.clientY - this.dragOffsetY}px`;
      this.root.style.right = "auto";
      this.root.style.bottom = "auto";
    });

    document.addEventListener("mouseup", () => {
      this.dragging = false;
      document.body.style.userSelect = "";
    });
  }

  /* ---------------- Messages ---------------- */

  private addMessage(role: Message["role"], text: string) {
    const msg = document.createElement("div");
    msg.style.cssText = `
      max-width: 80%;
      margin-bottom: 8px;
      padding: 6px 10px;
      border-radius: 10px;
      font-size: 13px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-word;
    `;

    if (role === "user") {
      msg.style.marginLeft = "auto";
      msg.style.background = "#2563eb";
      msg.style.color = "#fff";
    } else {
      msg.style.marginRight = "auto";
      msg.style.background = "#e5e7eb";
      msg.style.color = "#111";
    }

    // 去掉首字符异常空白
    msg.textContent = text.trimStart();

    this.body.appendChild(msg);
    this.body.scrollTop = this.body.scrollHeight;
  }

  /* ---------------- Send ---------------- */

  private async send() {
    const q = this.input.value.trim();
    if (!q) return;

    this.input.value = "";
    this.addMessage("user", q);

    try {
      const res = await this.client.ask(q, this.context);
      this.addMessage("assistant", res.answer);
    } catch (e: any) {
      this.addMessage("assistant", `请求失败：${e.message || "unknown error"}`);
    }
  }

  getElement(): HTMLElement {
    return this.root;
  }

  remove(): void {
    this.root.remove();
  }
}
