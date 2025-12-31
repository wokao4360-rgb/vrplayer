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

  private isMobile = false;
  private swipeStartY = 0;
  private swipeActive = false;

  private messages: ChatMsg[] = [];
  private isOpen = false;
  private fabButton: HTMLButtonElement | null = null;

  // typing effect controls
  private typingTimer: number | null = null;
  private typingAbortToken = 0;

  constructor(client: FcChatClient, context: FcChatContext) {
    this.client = client;
    this.context = context;

    this.mount();
    this.injectStyles();
    this.detectMobile();
    this.ensureWelcome();
  }

  public destroy() {
    this.stopTyping(true);
    this.root?.remove();
    this.fabButton?.remove();
    this.fabButton = null;
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
    this.closeBtn.addEventListener("click", () => this.toggle());

    headerRight.appendChild(this.clearBtn);
    headerRight.appendChild(this.closeBtn);

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

    // 默认隐藏，只显示右下角按钮
    this.root.style.display = "none";
    this.root.style.right = "18px";
    this.root.style.bottom = "18px";
    
    // 确保显示右下角切换按钮
    this.ensureToggleButton();

    this.header.addEventListener("mousedown", (e) => this.onDragStart(e));
    window.addEventListener("mousemove", (e) => this.onDragMove(e));
    window.addEventListener("mouseup", () => this.onDragEnd());

    this.header.addEventListener("pointerdown", (e) => this.onSwipeStart(e), { passive: false });
    this.header.addEventListener("pointermove", (e) => this.onSwipeMove(e), { passive: false });
    this.header.addEventListener("pointerup", (e) => this.onSwipeEnd(e));
    this.header.addEventListener("pointercancel", (e) => this.onSwipeEnd(e));

    window.addEventListener("resize", () => this.detectMobile());
  }

  private hide() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.stopTyping(true);
    this.root.style.display = "none";
    this.root.classList.remove('fcchat-open');
    // 更新 FAB 状态：悬挂隐藏
    if (this.fabButton) {
      this.fabButton.classList.add('fcchat-docked');
    }
    // 从 body 移除 class，以便 CSS 选择器工作
    document.body.classList.remove('fcchat-open');
    // 更新 overlay 状态
    this.updateOverlayState();
  }

  private show() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.detectMobile();
    this.root.style.display = "flex";
    this.root.classList.add('fcchat-open');
    // 更新 FAB 状态：完整显示
    if (this.fabButton) {
      this.fabButton.classList.remove('fcchat-docked');
    }
    // 在 body 添加 class，以便 CSS 选择器工作
    document.body.classList.add('fcchat-open');
    this.scrollToBottom();
    // 移动端不自动 focus，避免弹出键盘；桌面端保留自动 focus
    if (!this.isMobile) {
      this.input.focus();
    }
    // 更新 overlay 状态
    this.updateOverlayState();
  }

  private toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  private updateOverlayState(): void {
    const hasAnyOverlay = !!(
      document.querySelector('.vr-modal-overlay') ||
      document.querySelector('.vr-guide-drawer.open') ||
      (this.root && this.root.style.display === 'flex')
    );
    if (hasAnyOverlay) {
      document.documentElement.classList.add('vr-overlay-open');
    } else {
      document.documentElement.classList.remove('vr-overlay-open');
    }
  }

  private ensureToggleButton() {
    if (this.fabButton) return;
    
    // 检查 URL 兜底
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get("reset_ui") === "1") {
      localStorage.removeItem("vr_fcchat_dock_state");
      // 移除 reset_ui=1 参数
      urlParams.delete("reset_ui");
      const newUrl = location.pathname + (urlParams.toString() ? "?" + urlParams.toString() : "") + location.hash;
      history.replaceState({}, "", newUrl);
    }
    
    // 创建 FAB 按钮（单一头像按钮）
    const fabBtn = document.createElement("button");
    fabBtn.id = "fcchat-fab";
    fabBtn.className = "fcchat-fab fcchat-docked";
    fabBtn.type = "button";
    fabBtn.setAttribute("aria-label", "打开三馆学伴");
    // 卡通助手头像 SVG（圆形底+脸+眼睛）
    fabBtn.innerHTML = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="url(#fcchat-avatar-gradient)"/>
      <defs>
        <linearGradient id="fcchat-avatar-gradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <!-- 脸 -->
      <ellipse cx="22" cy="24" rx="12" ry="13" fill="#ffffff" opacity="0.95"/>
      <!-- 左眼 -->
      <circle cx="18" cy="22" r="2.5" fill="#1e293b"/>
      <!-- 右眼 -->
      <circle cx="26" cy="22" r="2.5" fill="#1e293b"/>
      <!-- 嘴巴（微笑） -->
      <path d="M 18 28 Q 22 31 26 28" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>`;
    // 点击 FAB 切换打开/关闭
    fabBtn.addEventListener("click", () => this.toggle());
    
    this.fabButton = fabBtn;
    document.body.appendChild(fabBtn);
    
    // 初始状态：悬挂隐藏
    if (!this.isOpen) {
      fabBtn.classList.add('fcchat-docked');
    }
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
    e.preventDefault();
    this.header.setPointerCapture(e.pointerId);
  }

  private onSwipeMove(e: PointerEvent) {
    if (!this.isMobile || !this.swipeActive) return;
    e.preventDefault();
    const dy = e.clientY - this.swipeStartY;
    if (dy <= 0) {
      this.root.style.transform = "";
      return;
    }
    this.root.style.transform = `translateY(${Math.min(dy, 200)}px)`;
  }

  private onSwipeEnd(e?: PointerEvent) {
    if (!this.isMobile || !this.swipeActive) return;
    
    const currentTransform = this.root.style.transform || "";
    const m = currentTransform.match(/translateY\(([-\d.]+)px\)/);
    const dy = m ? Number(m[1]) : 0;

    this.swipeActive = false;
    this.root.classList.remove("is-swiping");
    this.root.style.transform = "";
    
    if (e) {
      this.header.releasePointerCapture(e.pointerId);
    }
    
    if (dy >= 90) {
      this.hide();
    }
  }

  private clear() {
    this.stopTyping(true);
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

  // create assistant bubble with loading dots
  private addAssistantBubbleLoading() {
    const row = document.createElement("div");
    row.className = "fcchat-row is-assistant";
    row.dataset.loading = "1";

    const bubble = document.createElement("div");
    bubble.className = "fcchat-bubble bubble-assistant";
    bubble.innerHTML = '<span class="fcchat-typing"><span></span><span></span><span></span></span>';

    row.appendChild(bubble);
    this.list.appendChild(row);
    this.scrollToBottom();

    return { row, bubble };
  }

  // create assistant bubble but return the bubble element for incremental rendering
  private addAssistantBubbleEmpty() {
    const row = document.createElement("div");
    row.className = "fcchat-row is-assistant";

    const bubble = document.createElement("div");
    bubble.className = "fcchat-bubble bubble-assistant";
    bubble.textContent = "";

    row.appendChild(bubble);
    this.list.appendChild(row);
    this.scrollToBottom();

    return bubble;
  }

  // replace loading bubble with empty bubble for typewriter
  private replaceLoadingWithEmpty(loadingRow: HTMLElement): HTMLElement {
    loadingRow.removeAttribute("data-loading");
    const bubble = loadingRow.querySelector(".fcchat-bubble") as HTMLElement;
    if (bubble) {
      bubble.innerHTML = "";
      bubble.textContent = "";
    }
    return bubble;
  }

  private scrollToBottom() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  private stopTyping(flush: boolean) {
    this.typingAbortToken++;
    if (this.typingTimer != null) {
      window.clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    // flush behavior is handled by token logic in typewriter
    // nothing else needed here
  }

  private async typewriterRender(targetEl: HTMLElement, fullText: string) {
    const token = ++this.typingAbortToken; // new session token
    const text = this.normalizeText(fullText);

    // time budget by length
    const len = text.length;
    let budgetMs = 1200;
    if (len <= 120) budgetMs = 900 + Math.floor(Math.random() * 400);
    else if (len <= 400) budgetMs = 1800 + Math.floor(Math.random() * 800);
    else budgetMs = 3000 + Math.floor(Math.random() * 1000);

    // chunking: sometimes 1 char, sometimes 2-5 chars
    let i = 0;
    const start = performance.now();

    return await new Promise<void>((resolve) => {
      const step = () => {
        // aborted (new send / close / clear)
        if (token !== this.typingAbortToken) {
          // flush instantly to avoid half message
          targetEl.textContent = text;
          this.scrollToBottom();
          resolve();
          return;
        }

        const elapsed = performance.now() - start;
        const remaining = len - i;

        // if time budget nearly exceeded, flush remaining
        if (elapsed >= budgetMs || remaining <= 0) {
          targetEl.textContent = text;
          this.scrollToBottom();
          resolve();
          return;
        }

        // progress ratio and dynamic chunk size
        const progress = i / Math.max(1, len);
        let chunk = 1;

        // Random-ish: early slower, mid faster, end medium
        const r = Math.random();
        if (progress < 0.15) chunk = r < 0.75 ? 1 : 2;
        else if (progress < 0.7) chunk = r < 0.35 ? 2 : r < 0.75 ? 3 : 4;
        else chunk = r < 0.5 ? 2 : 3;

        chunk = Math.min(chunk, remaining);

        const nextText = text.slice(0, i + chunk);
        i += chunk;
        targetEl.textContent = nextText;
        this.scrollToBottom();

        // interval jitter: 18~55ms with randomness; also occasional small pause
        let delay = 18 + Math.floor(Math.random() * 38);
        if (Math.random() < 0.06) delay += 60 + Math.floor(Math.random() * 90);

        this.typingTimer = window.setTimeout(step, delay) as unknown as number;
      };

      step();
    });
  }

  private async onSend() {
    const q = this.input.value.trim();
    if (!q) return;

    // if currently typing, force flush and stop before next request
    this.stopTyping(true);

    this.input.value = "";
    this.addMessage("user", q);

    // immediately show loading bubble (three dots animation)
    const { row: loadingRow, bubble: loadingBubble } = this.addAssistantBubbleLoading();
    this.setBusy(true, "");

    try {
      const res = await this.client.ask(q, this.context);

      // replace loading bubble with empty bubble for typewriter
      const bubble = this.replaceLoadingWithEmpty(loadingRow);
      this.setBusy(true, "输出中…");
      await this.typewriterRender(bubble, res.answer);

      // update messages array with final text
      if (this.messages.length > 0 && this.messages[this.messages.length - 1].role === "assistant") {
        this.messages[this.messages.length - 1].text = res.answer;
      }

      this.setBusy(false, "");
    } catch (e: any) {
      // replace loading bubble with error message
      const bubble = loadingRow.querySelector(".fcchat-bubble") as HTMLElement;
      if (bubble) {
        loadingRow.removeAttribute("data-loading");
        const msg = typeof e?.message === "string" ? e.message : String(e);
        bubble.textContent = `请求失败：${msg}`;
        // update messages array
        if (this.messages.length > 0 && this.messages[this.messages.length - 1].role === "assistant") {
          this.messages[this.messages.length - 1].text = `请求失败：${msg}`;
        }
      }
      this.setBusy(false, "");
    }
    this.scrollToBottom();
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
        padding: 10px 12px;
        border-bottom: 1px solid rgba(0,0,0,.06);
        background: #f8fafc;
        cursor: move;
        user-select: none;
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

      /* 默认：横屏 / 桌面 / 平板 */
      .fcchat-fab{
        position: fixed;
        z-index: 99999;
        right: 16px;
        bottom: calc(env(safe-area-inset-bottom, 0px) + 88px);
        top: auto;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        background: transparent;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 1;
        pointer-events: auto;
        box-shadow: 0 4px 16px rgba(37,99,235,.4);
        padding: 0;
        transition: opacity 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        animation: fcchat-idle 3.8s ease-in-out infinite;
      }
      /* 竖屏手机：靠近全屏按钮 */
      @media (max-width: 768px) and (orientation: portrait){
        .fcchat-fab{
          top: calc(env(safe-area-inset-top, 0px) + 88px);
          right: 12px;
          bottom: auto;
        }
      }
      .fcchat-fab:hover{
        box-shadow: 0 6px 20px rgba(37,99,235,.5);
        transform: scale(1.05);
      }
      .fcchat-fab:active{
        transform: scale(0.98);
      }
      .fcchat-fab svg{
        width: 44px;
        height: 44px;
        display: block;
      }
      /* 悬挂隐藏状态：半隐藏在屏幕外 */
      .fcchat-fab.fcchat-docked{
        transform: translateX(26px);
      }
      .fcchat-fab.fcchat-docked:hover{
        transform: translateX(26px) scale(1.05);
      }
      /* 打开状态：降低透明度避免遮挡 */
      body.fcchat-open .fcchat-fab{
        opacity: 0.6;
      }
      @keyframes fcchat-idle{
        0%, 75%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
        77%{
          transform: translate3d(0, -12px, 0) scale(1.12) rotate(5deg);
        }
        79%{
          transform: translate3d(0, -4px, 0) scale(1.06) rotate(-3deg);
        }
        81%{
          transform: translate3d(0, -10px, 0) scale(1.10) rotate(4deg);
        }
        83%{
          transform: translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
        }
        85%{
          transform: translate3d(0, -8px, 0) scale(1.08) rotate(3deg);
        }
        87%, 100%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
      }
      /* 悬挂隐藏状态下的动画需要叠加 translateX */
      .fcchat-fab.fcchat-docked{
        animation: fcchat-idle-docked 3.8s ease-in-out infinite;
      }
      @keyframes fcchat-idle-docked{
        0%, 75%{
          transform: translateX(26px) translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
        77%{
          transform: translateX(26px) translate3d(0, -12px, 0) scale(1.12) rotate(5deg);
        }
        79%{
          transform: translateX(26px) translate3d(0, -4px, 0) scale(1.06) rotate(-3deg);
        }
        81%{
          transform: translateX(26px) translate3d(0, -10px, 0) scale(1.10) rotate(4deg);
        }
        83%{
          transform: translateX(26px) translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
        }
        85%{
          transform: translateX(26px) translate3d(0, -8px, 0) scale(1.08) rotate(3deg);
        }
        87%, 100%{
          transform: translateX(26px) translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
      }
      /* 移动端悬挂隐藏动画 */
      @media (max-width: 768px), (pointer: coarse){
        .fcchat-fab.fcchat-docked{
          animation: fcchat-idle-docked-mobile 3.8s ease-in-out infinite;
        }
        @keyframes fcchat-idle-docked-mobile{
          0%, 75%{
            transform: translateX(20px) translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          77%{
            transform: translateX(20px) translate3d(0, -12px, 0) scale(1.12) rotate(5deg);
          }
          79%{
            transform: translateX(20px) translate3d(0, -4px, 0) scale(1.06) rotate(-3deg);
          }
          81%{
            transform: translateX(20px) translate3d(0, -10px, 0) scale(1.10) rotate(4deg);
          }
          83%{
            transform: translateX(20px) translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
          }
          85%{
            transform: translateX(20px) translate3d(0, -8px, 0) scale(1.08) rotate(3deg);
          }
          87%, 100%{
            transform: translateX(20px) translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }
      }

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
        }
        .fcchat-bubble{ max-width: 84%; }
        .fcchat-fab{
          width: 40px;
          height: 40px;
        }
        .fcchat-fab svg{
          width: 40px;
          height: 40px;
        }
        /* 移动端悬挂隐藏 */
        .fcchat-fab.fcchat-docked{
          transform: translateX(20px);
        }
      }

      .fcchat-root.is-swiping{
        transition: none;
      }

      /* 思考中动画 */
      .fcchat-typing{
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 0;
      }
      .fcchat-typing span{
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        animation: fcchat-typing-bounce 1.4s infinite ease-in-out;
      }
      .fcchat-typing span:nth-child(1){ animation-delay: -0.32s; }
      .fcchat-typing span:nth-child(2){ animation-delay: -0.16s; }
      .fcchat-typing span:nth-child(3){ animation-delay: 0; }
      @keyframes fcchat-typing-bounce{
        0%, 80%, 100%{ transform: scale(0.8); opacity: 0.5; }
        40%{ transform: scale(1); opacity: 1; }
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
