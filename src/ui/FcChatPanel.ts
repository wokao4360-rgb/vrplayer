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

  // FAB drag state
  private snapTimer: number | null = null;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private startLeft = 0;
  private startTop = 0;
  private lastLeft = 0;
  private lastTop = 0;
  private moved = false;
  private hasUserPlaced = false; // 用户是否拖拽过

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
    if (this.snapTimer) {
      window.clearTimeout(this.snapTimer);
      this.snapTimer = null;
    }
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

    // 免责声明
    const disclaimer = document.createElement("div");
    disclaimer.className = "fcchat-disclaimer";
    disclaimer.textContent = "提示：AI 可能会出错，内容仅供参考；请以现场展陈/讲解为准。";
    this.header.appendChild(disclaimer);

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

  private getSafeBounds(): { minLeft: number; maxLeft: number; minTop: number; maxTop: number } {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fab = this.fabButton;
    if (!fab) {
      return { minLeft: 8, maxLeft: vw - 52, minTop: 12, maxTop: vh - 64 };
    }
    const rect = fab.getBoundingClientRect();
    const fabWidth = rect.width;
    const fabHeight = rect.height;
    
    // 顶部留出：移动端至少避开顶部标题/全屏按钮区域
    const safeTop = 12 + (this.isMobile ? 56 : 12);
    // 底部避开 dock 区域
    const safeBottom = 12 + (this.isMobile ? 96 : 12);
    const safeLeft = 8;
    const safeRight = 8;
    
    return {
      minLeft: safeLeft,
      maxLeft: vw - fabWidth - safeRight,
      minTop: safeTop,
      maxTop: vh - fabHeight - safeBottom,
    };
  }

  private clampPos(left: number, top: number): { left: number; top: number } {
    const bounds = this.getSafeBounds();
    return {
      left: Math.max(bounds.minLeft, Math.min(left, bounds.maxLeft)),
      top: Math.max(bounds.minTop, Math.min(top, bounds.maxTop)),
    };
  }

  private snapToEdge() {
    const fab = this.fabButton;
    if (!fab) return;
    
    const bounds = this.getSafeBounds();
    const rect = fab.getBoundingClientRect();
    const currentLeft = rect.left;
    const currentTop = rect.top;
    
    // 计算到四边距离
    const dLeft = currentLeft - bounds.minLeft;
    const dRight = bounds.maxLeft - currentLeft;
    const dTop = currentTop - bounds.minTop;
    const dBottom = bounds.maxTop - currentTop;
    
    // 取最小距离对应的边
    const minDist = Math.min(dLeft, dRight, dTop, dBottom);
    let targetLeft = currentLeft;
    let targetTop = currentTop;
    
    if (minDist === dLeft) {
      targetLeft = bounds.minLeft;
    } else if (minDist === dRight) {
      targetLeft = bounds.maxLeft;
    } else if (minDist === dTop) {
      targetTop = bounds.minTop;
    } else if (minDist === dBottom) {
      targetTop = bounds.maxTop;
    }
    
    // 应用贴边位置
    fab.style.left = `${targetLeft}px`;
    fab.style.top = `${targetTop}px`;
    fab.style.right = 'auto';
    fab.style.bottom = 'auto';
    
    // 保存位置到 localStorage
    localStorage.setItem('fcchat_fab_pos_v1', JSON.stringify({ left: targetLeft, top: targetTop }));
    
    // 移除 snapping class（动画完成后）
    setTimeout(() => {
      fab.classList.remove('fcchat-snapping');
    }, 220);
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
    // Pointer 事件处理（按下即拖）
    fabBtn.addEventListener('pointerdown', (e) => this.onFabPointerDown(e), { passive: false });
    fabBtn.addEventListener('pointermove', (e) => this.onFabPointerMove(e), { passive: false });
    fabBtn.addEventListener('pointerup', (e) => this.onFabPointerUp(e), { passive: false });
    fabBtn.addEventListener('pointercancel', (e) => this.onFabPointerUp(e), { passive: false });
    
    this.fabButton = fabBtn;
    document.body.appendChild(fabBtn);
    
    // 恢复上次位置（如果用户拖拽过）
    const savedPos = localStorage.getItem('fcchat_fab_pos_v1');
    if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        fabBtn.style.left = `${pos.left}px`;
        fabBtn.style.top = `${pos.top}px`;
        fabBtn.style.right = 'auto';
        fabBtn.style.bottom = 'auto';
        fabBtn.classList.remove('fcchat-docked'); // 恢复位置时移除悬挂状态
        this.hasUserPlaced = true;
      } catch (e) {
        // 忽略解析错误
      }
    }
    
    // 初始状态：悬挂隐藏（仅当没有保存位置时）
    if (!this.hasUserPlaced && !this.isOpen) {
      fabBtn.classList.add('fcchat-docked');
    }
    
    // 显示首屏新手提示（仅一次）
    this.maybeShowFirstVisitHint();
  }

  private maybeShowFirstVisitHint() {
    // 只在当前会话首屏显示一次
    const KEY = 'fcchat_first_hint_shown';

    if (sessionStorage.getItem(KEY)) return;

    sessionStorage.setItem(KEY, '1');

    const fab = this.fabButton;
    if (!fab) return;

    const hint = document.createElement('div');
    hint.className = 'fcchat-first-hint';
    hint.textContent = '我是三馆学伴，为你解疑答惑😉';

    document.body.appendChild(hint);

    // 定位到 FAB 左侧（自动跟随）
    const place = () => {
      const rect = fab.getBoundingClientRect();
      hint.style.left = `${rect.left - 8}px`;
      hint.style.top = `${rect.top + rect.height / 2}px`;
    };

    place();

    // 防止屏幕旋转 / resize 位置错位
    window.addEventListener('resize', place);

    // 10 秒后淡出并销毁
    setTimeout(() => {
      hint.classList.add('is-hide');
      setTimeout(() => {
        window.removeEventListener('resize', place);
        hint.remove();
      }, 300);
    }, 10000);
  }

  private onFabPointerDown(e: PointerEvent) {
    const fab = this.fabButton;
    if (!fab) return;

    e.preventDefault();

    // 进入"可能拖拽"状态，但不立刻算拖拽（靠 move threshold 判定）
    this.isDragging = false;
    this.moved = false;

    this.startX = e.clientX;
    this.startY = e.clientY;

    // 取当前定位（优先 inline left/top；没有就从 rect 推）
    const rect = fab.getBoundingClientRect();
    const left = parseFloat(fab.style.left || '');
    const top = parseFloat(fab.style.top || '');

    this.startLeft = Number.isFinite(left) ? left : rect.left;
    this.startTop = Number.isFinite(top) ? top : rect.top;

    // 断触修复：捕获指针
    try {
      fab.setPointerCapture(e.pointerId);
    } catch {}

    // 拖拽期间不要受 docked translateX 影响
    fab.classList.remove('fcchat-docked');
  }

  private onFabPointerMove(e: PointerEvent) {
    const fab = this.fabButton;
    if (!fab) return;

    // 必须 preventDefault，避免浏览器滚动抢走
    e.preventDefault();

    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    if (!this.isDragging) {
      if (Math.abs(dx) + Math.abs(dy) < 4) return; // MOVE_THRESHOLD = 4px
      this.isDragging = true;
      fab.classList.add('fcchat-dragging');
    }

    const next = this.clampPos(this.startLeft + dx, this.startTop + dy);
    this.lastLeft = next.left;
    this.lastTop = next.top;

    // 进入"用户放置模式"：用 left/top 驱动
    fab.style.left = `${this.lastLeft}px`;
    fab.style.top = `${this.lastTop}px`;
    fab.style.right = 'auto';
    fab.style.bottom = 'auto';
    this.hasUserPlaced = true;
  }

  private onFabPointerUp(e: PointerEvent) {
    const fab = this.fabButton;
    if (!fab) return;
    e.preventDefault();

    try {
      fab.releasePointerCapture(e.pointerId);
    } catch {}

    if (!this.isDragging) {
      // 轻点：走原 toggle（打开/关闭聊天）
      this.toggle();
      return;
    }

    // 拖拽结束
    this.isDragging = false;
    fab.classList.remove('fcchat-dragging');

    // 持久化当前位置
    try {
      localStorage.setItem('fcchat_fab_pos_v1', JSON.stringify({ left: this.lastLeft, top: this.lastTop }));
    } catch {}

    // 5 秒后贴边（先清理旧 timer）
    if (this.snapTimer) {
      window.clearTimeout(this.snapTimer);
    }
    fab.classList.add('fcchat-snapping');
    this.snapTimer = window.setTimeout(() => {
      this.snapToEdge();
      this.snapTimer = null;
    }, 5000) as unknown as number;
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
      .fcchat-disclaimer{
        margin-top: 6px;
        font-size: 12px;
        line-height: 1.3;
        opacity: 0.7;
        color: #6b7280;
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
        touch-action: none; /* 关键：禁止浏览器把手势当滚动/缩放 */
        -webkit-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
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
      /* 拖拽状态 */
      .fcchat-fab.fcchat-dragging{
        transition: none !important;
        cursor: grabbing;
        animation: none !important; /* 拖拽时停止 idle 动画 */
      }
      /* 贴边动画状态 */
      .fcchat-fab.fcchat-snapping{
        transition: left 220ms cubic-bezier(0.2, 0.9, 0.2, 1), top 220ms cubic-bezier(0.2, 0.9, 0.2, 1);
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
