import { FcChatClient } from "../services/fcChatClient";
import type { FcChatContext } from "../services/fcChatClient";

type Role = "assistant" | "user";
type ChatMsg = { role: Role; text: string };

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

  // mobile swipe-to-close
  private isMobile = false;
  private swipeStartY = 0;
  private swipeActive = false;

  private messages: ChatMsg[] = [];

  constructor(client: FcChatClient, context: FcChatContext) {
    this.client = client;
    this.context = context;

    this.mount();
    this.injectStyles();
    this.detectMobile();
    this.ensureWelcome();
  }

  public destroy() {
    this.root?.remove();
    document.getElementById("fcchat-toggle-btn")?.remove();
  }

  private detectMobile() {
    const mq1 = window.matchMedia?.("(max-width: 768px)").matches ?? false;
    const mq2 = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    this.isMobile = mq1 || mq2;

    this.root.dataset.mobile = this.isMobile ? "1" : "0";
  }

  private mount() {
    this.root = document.createElement("div");
    this.root.className = "fcchat-root";
    this.root.setAttribute("role", "dialog");
    this.root.setAttribute("aria-label", "三馆学伴");

    this.header = document.createElement("div");
    this.header.className = "fcchat-header";

    const left = document.createElement("div");
    left.className = "fcchat-title";
    left.textContent = "三馆学伴";

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

    // mobile handle
    const handle = document.createElement("div");
    handle.className = "fcchat-handle";
    this.header.appendChild(handle);

    const headerRow = document.createElement("div");
    headerRow.className = "fcchat-header-row";
    headerRow.appendChild(left);
    headerRow.appendChild(headerRight);

    this.header.appendChild(headerRow);

    this.body = document.createElement("div");
    this.body.className = "fcchat-body";

    this.list = document.createElement("div");
    this.list.className = "fcchat-list";
    this.body.appendChild(this.list);

    this.statusLine = document.createElement("div");
    this.statusLine.className = "fcchat-status";
    this.statusLine.textContent = "";
    this.body.appendChild(this.statusLine);

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

    // default position (desktop)
    this.root.style.right = "18px";
    this.root.style.bottom = "18px";

    // desktop drag
    this.header.addEventListener("mousedown", (e) => this.onDragStart(e));
    window.addEventListener("mousemove", (e) => this.onDragMove(e));
    window.addEventListener("mouseup", () => this.onDragEnd());

    // mobile swipe-to-close (pointer events)
    this.header.addEventListener("pointerdown", (e) => this.onSwipeStart(e));
    this.header.addEventListener("pointermove", (e) => this.onSwipeMove(e));
    this.header.addEventListener("pointerup", () => this.onSwipeEnd());
    this.header.addEventListener("pointercancel", () => this.onSwipeEnd());

    // on resize re-detect
    window.addEventListener("resize", () => this.detectMobile());
  }

  private hide() {
    this.root.style.display = "none";
    this.ensureToggleButton();
  }

  private show() {
    this.detectMobile();
    this.root.style.display = "flex";
    document.getElementById("fcchat-toggle-btn")?.remove();
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
    if (this.isMobile) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    this.dragging = true;
    const rect = this.root.getBoundingClientRect();
    this.dragOffsetX = e.clientX - rect.left;
    this.dragOffsetY = e.clientY - rect.top;

    this.root.style.right = "auto";
    this.root.style.bottom = "auto";
    this.root.style.left = rect.left + "px";
    this.root.style.top = rect.top + "px";
  }

  private onDragMove(e: MouseEvent) {
    if (!this.dragging || this.isMobile) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = this.root.getBoundingClientRect();

    let left = e.clientX - this.dragOffsetX;
    let top = e.clientY - this.dragOffsetY;

    left = Math.max(8, Math.min(left, vw - rect.width - 8));
    top = Math.max(8, Math.min(top, vh - rect.height - 8));

    this.root.style.left = left + "px";
    this.root.style.top = top + "px";
  }

  private onDragEnd() {
    this.dragging = false;
  }

  private onSwipeStart(e: PointerEvent) {
    if (!this.isMobile) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    this.swipeActive = true;
    this.swipeStartY = e.clientY;
    this.root.classList.add("is-swiping");
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  private onSwipeMove(e: PointerEvent) {
    if (!this.isMobile || !this.swipeActive) return;
    const dy = e.clientY - this.swipeStartY;
    if (dy <= 0) return;
    // translate down a bit (visual feedback)
    this.root.style.transform = `translateY(${Math.min(dy, 160)}px)`;
  }

  private onSwipeEnd() {
    if (!this.isMobile || !this.swipeActive) return;
    this.swipeActive = false;
    this.root.classList.remove("is-swiping");

    const currentTransform = this.root.style.transform || "";
    const m = currentTransform.match(/translateY\(([-\d.]+)px\)/);
    const dy = m ? Number(m[1]) : 0;

    this.root.style.transform = "";
    if (dy >= 90) {
      this.hide();
    }
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
        transform: none;
      }

      .fcchat-header{
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content:center;
        padding: 8px 10px 8px 10px;
        border-bottom: 1px solid rgba(0,0,0,.06);
        background: #f8fafc;
        cursor: move;
        user-select: none;
        gap: 6px;
      }
      .fcchat-handle{
        display:none;
        width: 44px;
        height: 4px;
        border-radius: 999px;
        background: rgba(0,0,0,.18);
        margin: 0 auto;
      }
      .fcchat-header-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
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
        -webkit-overflow-scrolling: touch;
      }

      .fcchat-row{ display:flex; }
      .fcchat-row.is-user{ justify-content:flex-end; }
      .fcchat-row.is-assistant{ justify-content:flex-start; }

      .fcchat-bubble{
        max-width: 72%;
        padding: 8px 10px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.45;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .bubble-user{
        background: #2563eb;
        color:#fff;
        border-top-right-radius: 6px;
      }
      .bubble-assistant{
        background: #eef2f7;
        color:#111827;
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
        flex:1;
        height: 36px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,.12);
        padding: 0 10px;
        font-size: 13px;
        outline:none;
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
        cursor:pointer;
        user-select:none;
      }
      .fcchat-btn:disabled{ opacity:.6; cursor:not-allowed; }
      .fcchat-btn-primary{ background:#2563eb; color:#fff; }
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

      /* Mobile adaptation */
      @media (max-width: 768px), (pointer: coarse){
        .fcchat-root{
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          top: auto !important;
          width: 100vw !important;
          height: min(75vh, 680px) !important;
          border-radius: 16px 16px 0 0 !important;
          resize: none !important;
          min-width: 0 !important;
          min-height: 0 !important;
          box-shadow: 0 -10px 40px rgba(0,0,0,.20);
        }
        .fcchat-header{
          cursor: default !important;
          padding-top: 10px;
        }
        .fcchat-handle{ display:block; }
        .fcchat-bubble{ max-width: 84%; }
        .fcchat-toggle-btn{
          right: 14px;
          bottom: 14px;
        }
      }

      .fcchat-root.is-swiping{
        transition: none;
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
