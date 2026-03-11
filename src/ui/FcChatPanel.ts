import { FcChatClient } from "../services/fcChatClient";
import type { FcChatContext } from "../services/fcChatClient";

type Role = "assistant" | "user";
type ChatMsg = { role: Role; text: string };

const MAX_HISTORY_MESSAGES = 40;
const MAX_USER_MEMORY_ITEMS = 120;
const HISTORY_KEY_PREFIX = "fcchat_history_v2";
const SESSION_KEY_PREFIX = "fcchat_session_v1";
const USER_MEMORY_KEY_PREFIX = "fcchat_user_memory_v1";

function buildScopedKey(prefix: string, museumId?: string): string {
  const scope = (museumId || "global").trim() || "global";
  return `${prefix}:${scope}`;
}

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `fcchat_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

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
  private recallBtn!: HTMLButtonElement;
  private closeBtn!: HTMLButtonElement;
  private statusLine!: HTMLDivElement;
  private quickActions!: HTMLDivElement;
  private recallPanel!: HTMLDivElement;

  private dragging = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  private isMobile = false;
  private swipeStartY = 0;
  private swipeActive = false;

  private messages: ChatMsg[] = [];
  private isOpen = false;
  private fabButton: HTMLButtonElement | null = null;
  private historyStorageKey: string;
  private sessionStorageKey: string;
  private userMemoryStorageKey: string;
  private sessionId: string;
  private userMemory: string[] = [];
  private recallOpen = false;

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
    this.historyStorageKey = buildScopedKey(HISTORY_KEY_PREFIX, context.museumId);
    this.sessionStorageKey = buildScopedKey(SESSION_KEY_PREFIX, context.museumId);
    this.userMemoryStorageKey = buildScopedKey(USER_MEMORY_KEY_PREFIX, context.museumId);
    this.sessionId = this.loadSessionId();
    this.userMemory = this.loadUserMemory();

    this.mount();
    this.injectStyles();
    this.detectMobile();
    this.restoreHistoryOrWelcome();
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

    this.recallBtn = document.createElement("button");
    this.recallBtn.className = "fcchat-btn fcchat-btn-ghost";
    this.recallBtn.type = "button";
    this.recallBtn.textContent = "回顾";
    this.recallBtn.setAttribute("aria-label", "查看会话回顾");
    this.recallBtn.setAttribute("aria-pressed", "false");
    this.recallBtn.addEventListener("click", () => this.toggleRecallPanel());

    this.closeBtn = document.createElement("button");
    this.closeBtn.className = "fcchat-btn fcchat-btn-ghost fcchat-close";
    this.closeBtn.type = "button";
    this.closeBtn.setAttribute("aria-label", "关闭");
    this.closeBtn.textContent = "×";
    this.closeBtn.addEventListener("click", () => this.toggle());

    headerRight.appendChild(this.clearBtn);
    headerRight.appendChild(this.recallBtn);
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

    this.quickActions = document.createElement("div");
    this.quickActions.className = "fcchat-quick-actions";
    const quickActionDefs = [
      { label: "回顾上文", prompt: "请先简要回顾我们刚才的对话重点，再继续回答。" },
      { label: "我刚才说了什么？", prompt: "我刚才说了什么？" },
      { label: "你刚才说了什么？", prompt: "你刚才说了什么？" },
    ];
    quickActionDefs.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fcchat-chip";
      btn.textContent = item.label;
      btn.addEventListener("click", () => {
        this.input.value = item.prompt;
        if (!this.isOpen) this.show();
        if (!this.isMobile) this.input.focus();
      });
      this.quickActions.appendChild(btn);
    });
    this.body = document.createElement("div");
    this.body.className = "fcchat-body";

    this.recallPanel = document.createElement("div");
    this.recallPanel.className = "fcchat-recall-panel";
    this.recallPanel.hidden = true;
    this.body.appendChild(this.recallPanel);

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
    this.input.id = "fcchat-message-input";
    this.input.name = "message";
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

    const composer = document.createElement("div");
    composer.className = "fcchat-composer";
    composer.appendChild(this.quickActions);
    composer.appendChild(inputBar);

    this.root.appendChild(this.header);
    this.root.appendChild(this.body);
    this.root.appendChild(composer);

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
    this.toggleRecallPanel(false);
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
    this.userMemory = [];
    this.list.innerHTML = "";
    this.statusLine.textContent = "";
    this.sessionId = generateSessionId();
    this.persistSessionId();
    this.persistMessages();
    this.persistUserMemory();
    this.ensureWelcome();
    this.renderRecallPanel();
  }

  private loadSessionId(): string {
    try {
      const saved = localStorage.getItem(this.sessionStorageKey);
      if (saved && saved.trim()) return saved;
    } catch {
      // ignore
    }
    const next = generateSessionId();
    try {
      localStorage.setItem(this.sessionStorageKey, next);
    } catch {
      // ignore
    }
    return next;
  }

  private persistSessionId(): void {
    try {
      localStorage.setItem(this.sessionStorageKey, this.sessionId);
    } catch {
      // ignore
    }
  }

  private loadUserMemory(): string[] {
    try {
      const raw = localStorage.getItem(this.userMemoryStorageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((item) => (typeof item === "string" ? this.normalizeText(item).trim() : ""))
        .filter((item) => !!item)
        .slice(-MAX_USER_MEMORY_ITEMS);
    } catch {
      return [];
    }
  }

  private persistUserMemory(): void {
    try {
      localStorage.setItem(
        this.userMemoryStorageKey,
        JSON.stringify(this.userMemory.slice(-MAX_USER_MEMORY_ITEMS))
      );
    } catch {
      // ignore
    }
  }

  private rememberUserMessage(text: string): void {
    const normalized = this.normalizeText(text).trim();
    if (!normalized) return;
    if (this.userMemory[this.userMemory.length - 1] === normalized) return;
    this.userMemory.push(normalized);
    if (this.userMemory.length > MAX_USER_MEMORY_ITEMS) {
      this.userMemory = this.userMemory.slice(-MAX_USER_MEMORY_ITEMS);
    }
    this.persistUserMemory();
  }

  private buildRequestContext(currentQuestion?: string): FcChatContext {
    const normalizedQuestion = this.normalizeText(currentQuestion || "").trim();
    let memory = this.userMemory.slice();
    if (normalizedQuestion && memory[memory.length - 1] === normalizedQuestion) {
      memory = memory.slice(0, -1);
    }

    const recentTurns = this.messages
      .slice(-8)
      .map((msg) => ({
        role: msg.role,
        text: this.normalizeText(msg.text).trim(),
      }))
      .filter((msg) => !!msg.text);

    const latestUser = [...this.messages]
      .reverse()
      .find(
        (msg) =>
          msg.role === "user" &&
          !!this.normalizeText(msg.text).trim() &&
          this.normalizeText(msg.text).trim() !== normalizedQuestion
      );
    const latestAssistant = [...this.messages]
      .reverse()
      .find((msg) => msg.role === "assistant" && !!this.normalizeText(msg.text).trim());

    return {
      ...this.context,
      userMemory: memory.slice(-30),
      lastUserUtterance: latestUser ? this.normalizeText(latestUser.text).trim() : "",
      lastAssistantReply: latestAssistant ? this.normalizeText(latestAssistant.text).trim() : "",
      recentTurns,
    };
  }

  private restoreHistoryOrWelcome(): void {
    let restored = false;
    try {
      const raw = localStorage.getItem(this.historyStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const history = parsed
            .map((item: any) => ({
              role: item?.role === "assistant" ? "assistant" : "user",
              text: typeof item?.text === "string" ? item.text.trim() : "",
            }))
            .filter((item: ChatMsg) => !!item.text) as ChatMsg[];
          if (history.length > 0) {
            this.messages = history.slice(-MAX_HISTORY_MESSAGES);
            this.renderMessages();
            restored = true;
          }
        }
      }
    } catch {
      // ignore
    }

    if (!restored) {
      this.ensureWelcome();
      this.persistMessages();
    }

    if (this.userMemory.length === 0 && this.messages.length > 0) {
      this.userMemory = this.messages
        .filter((msg) => msg.role === "user")
        .map((msg) => this.normalizeText(msg.text).trim())
        .filter((text) => !!text)
        .slice(-MAX_USER_MEMORY_ITEMS);
      this.persistUserMemory();
    }

    this.renderRecallPanel();
  }

  private renderMessages(): void {
    this.list.innerHTML = "";
    for (const msg of this.messages) {
      const row = document.createElement("div");
      row.className = `fcchat-row ${msg.role === "user" ? "is-user" : "is-assistant"}`;

      const bubble = document.createElement("div");
      bubble.className = `fcchat-bubble ${msg.role === "user" ? "bubble-user" : "bubble-assistant"}`;
      bubble.textContent = this.normalizeText(msg.text);

      row.appendChild(bubble);
      this.list.appendChild(row);
    }
    this.scrollToBottom();
    this.renderRecallPanel();
  }

  private persistMessages(): void {
    try {
      localStorage.setItem(
        this.historyStorageKey,
        JSON.stringify(this.messages.slice(-MAX_HISTORY_MESSAGES))
      );
    } catch {
      // ignore
    }
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
    if (this.messages.length > MAX_HISTORY_MESSAGES) {
      this.messages = this.messages.slice(-MAX_HISTORY_MESSAGES);
    }

    const row = document.createElement("div");
    row.className = `fcchat-row ${role === "user" ? "is-user" : "is-assistant"}`;

    const bubble = document.createElement("div");
    bubble.className = `fcchat-bubble ${role === "user" ? "bubble-user" : "bubble-assistant"}`;
    bubble.textContent = msg.text;

    row.appendChild(bubble);
    this.list.appendChild(row);
    this.scrollToBottom();
    this.persistMessages();
    this.renderRecallPanel();
  }

  private toggleRecallPanel(next?: boolean): void {
    const willOpen = typeof next === "boolean" ? next : !this.recallOpen;
    this.recallOpen = willOpen;
    this.body.classList.toggle("is-recall-open", willOpen);
    this.recallPanel.hidden = !willOpen;
    this.list.hidden = willOpen;
    this.statusLine.hidden = willOpen;
    this.recallBtn.setAttribute("aria-pressed", willOpen ? "true" : "false");
    this.recallBtn.classList.toggle("is-active", willOpen);
    if (willOpen) {
      this.renderRecallPanel();
    } else {
      this.scrollToBottom();
    }
  }

  private renderRecallPanel(): void {
    if (!this.recallPanel) return;
    this.recallPanel.innerHTML = "";
    const turns = this.messages
      .map((msg) => ({
        role: msg.role,
        text: this.normalizeText(msg.text).trim(),
      }))
      .filter((msg) => !!msg.text)
      .slice(-12)
      .reverse();

    if (turns.length === 0) {
      const empty = document.createElement("div");
      empty.className = "fcchat-recall-empty";
      empty.textContent = "暂无可回顾内容，先聊一句吧。";
      this.recallPanel.appendChild(empty);
      return;
    }

    turns.forEach((msg) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `fcchat-recall-card ${msg.role === "user" ? "is-user" : "is-assistant"}`;

      const roleLabel = document.createElement("span");
      roleLabel.className = "fcchat-recall-role";
      roleLabel.textContent = msg.role === "user" ? "你" : "学伴";

      const text = document.createElement("span");
      text.className = "fcchat-recall-text";
      text.textContent = msg.text.length > 96 ? `${msg.text.slice(0, 96)}...` : msg.text;

      card.appendChild(roleLabel);
      card.appendChild(text);
      card.addEventListener("click", () => {
        this.input.value = msg.text;
        if (!this.isOpen) this.show();
        if (!this.isMobile) this.input.focus();
      });
      this.recallPanel.appendChild(card);
    });
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

    if (this.recallOpen) {
      this.toggleRecallPanel(false);
    }

    // if currently typing, force flush and stop before next request
    this.stopTyping(true);

    this.input.value = "";
    this.addMessage("user", q);

    // immediately show loading bubble (three dots animation)
    const { row: loadingRow } = this.addAssistantBubbleLoading();
    this.setBusy(true, "输出中...");

    try {
      const historyForRequest = this.messages.slice(-MAX_HISTORY_MESSAGES);
      const contextForRequest = this.buildRequestContext(q);
      this.rememberUserMessage(q);
      const res = await this.client.ask(q, contextForRequest, historyForRequest, this.sessionId);

      // replace loading bubble with empty bubble for typewriter
      const bubble = this.replaceLoadingWithEmpty(loadingRow);
      this.setBusy(true, "输出中...");
      await this.typewriterRender(bubble, res.answer);

      this.messages.push({ role: "assistant", text: this.normalizeText(res.answer) });
      if (this.messages.length > MAX_HISTORY_MESSAGES) {
        this.messages = this.messages.slice(-MAX_HISTORY_MESSAGES);
      }
      this.persistMessages();
      this.renderRecallPanel();

      this.setBusy(false, "");
    } catch (e: any) {
      // replace loading bubble with error message
      const bubble = loadingRow.querySelector(".fcchat-bubble") as HTMLElement;
      if (bubble) {
        loadingRow.removeAttribute("data-loading");
        const msg = typeof e?.message === "string" ? e.message : String(e);
        const errText = `请求失败：${msg}`;
        bubble.textContent = errText;
        this.messages.push({ role: "assistant", text: errText });
        if (this.messages.length > MAX_HISTORY_MESSAGES) {
          this.messages = this.messages.slice(-MAX_HISTORY_MESSAGES);
        }
        this.persistMessages();
        this.renderRecallPanel();
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
        --fcchat-paper: #f7f3e8;
        --fcchat-paper-soft: #fbf8f1;
        --fcchat-ink: #1f2a37;
        --fcchat-ink-soft: #415164;
        --fcchat-border: rgba(77, 56, 34, 0.18);
        --fcchat-accent: #2f5fae;
        --fcchat-accent-strong: #1f4f9d;
        --fcchat-assistant: #e8edf4;
        --fcchat-assistant-border: rgba(31, 79, 157, 0.16);
        --fcchat-chip-bg: rgba(45, 84, 140, 0.08);
        --fcchat-chip-border: rgba(45, 84, 140, 0.2);
        --fcchat-shadow: 0 18px 44px rgba(26, 36, 56, 0.26);
        position: fixed;
        z-index: 99999;
        width: 420px;
        height: 560px;
        display: flex;
        flex-direction: column;
        border-radius: 18px;
        background:
          radial-gradient(120% 100% at 0% 0%, rgba(255, 255, 255, 0.86) 0%, transparent 42%),
          linear-gradient(145deg, var(--fcchat-paper-soft) 0%, var(--fcchat-paper) 100%);
        box-shadow: var(--fcchat-shadow);
        border: 1px solid var(--fcchat-border);
        overflow: hidden;
        resize: both;
        min-width: 320px;
        min-height: 360px;
        transform: none;
        opacity: 0;
        animation: fcchat-panel-in 360ms cubic-bezier(.2,.8,.2,1) forwards;
        font-family: var(--vr-font-chat-body, var(--vr-font-ui));
      }
      .fcchat-root.fcchat-open{
        opacity: 1;
      }
      @keyframes fcchat-panel-in{
        from{ opacity: 0; transform: translate3d(0, 10px, 0) scale(0.98); }
        to{ opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }

      .fcchat-header{
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content:center;
        padding: 12px 14px;
        border-bottom: 1px solid var(--fcchat-border);
        background:
          linear-gradient(160deg, rgba(255,255,255,0.82) 0%, rgba(238,230,214,0.74) 100%);
        cursor: move;
        user-select: none;
      }
      .fcchat-header-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
      }
      .fcchat-title{
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: var(--fcchat-ink);
        font-family: var(--vr-font-chat-title, var(--vr-font-ui));
      }
      .fcchat-header-right{
        display:flex;
        align-items:center;
        gap: 8px;
      }
      .fcchat-disclaimer{
        margin-top: 6px;
        font-size: 12px;
        line-height: 1.45;
        color: var(--fcchat-ink-soft);
        opacity: 0.82;
      }

      .fcchat-composer{
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 12px 12px;
        border-top: 1px solid var(--fcchat-border);
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(6px);
      }
      .fcchat-quick-actions{
        display: flex;
        align-items: center;
        gap: 8px;
        overflow-x: auto;
        padding: 0;
        scrollbar-width: thin;
      }
      .fcchat-quick-actions::-webkit-scrollbar{
        height: 4px;
      }
      .fcchat-chip{
        height: 30px;
        border-radius: 9999px;
        border: 1px solid var(--fcchat-chip-border);
        background: var(--fcchat-chip-bg);
        color: var(--fcchat-accent-strong);
        font-size: 12px;
        padding: 0 12px;
        cursor: pointer;
        white-space: nowrap;
        transition: transform 160ms cubic-bezier(.2,.8,.2,1), box-shadow 160ms cubic-bezier(.2,.8,.2,1), background 160ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-chip:hover{
        transform: translateY(-1px);
        background: rgba(45, 84, 140, 0.14);
        box-shadow: 0 4px 12px rgba(20, 44, 82, 0.15);
      }
      .fcchat-chip:active{
        transform: translateY(0);
      }

      .fcchat-body{
        flex: 1;
        display:flex;
        flex-direction: column;
        min-height: 0;
        background:
          radial-gradient(120% 100% at 100% 0%, rgba(241, 237, 228, 0.75) 0%, transparent 50%),
          linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(246, 243, 236, 0.78) 100%);
      }
      .fcchat-body.is-recall-open .fcchat-recall-panel{
        flex: 1;
        max-height: none;
        border-bottom: none;
      }
      .fcchat-body.is-recall-open .fcchat-list,
      .fcchat-body.is-recall-open .fcchat-status{
        display: none;
      }
      .fcchat-recall-panel{
        max-height: 156px;
        overflow: auto;
        border-bottom: 1px dashed var(--fcchat-border);
        background: rgba(255, 255, 255, 0.55);
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .fcchat-recall-panel[hidden]{
        display: none !important;
      }
      .fcchat-recall-empty{
        font-size: 12px;
        color: var(--fcchat-ink-soft);
        opacity: 0.9;
      }
      .fcchat-recall-card{
        width: 100%;
        border: 1px solid var(--fcchat-border);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.86);
        text-align: left;
        padding: 8px 10px;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1), border-color 150ms cubic-bezier(.2,.8,.2,1);
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .fcchat-recall-card:hover{
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(31, 79, 157, 0.14);
        border-color: rgba(31, 79, 157, 0.28);
      }
      .fcchat-recall-role{
        font-size: 11px;
        letter-spacing: 0.06em;
        color: var(--fcchat-accent-strong);
        opacity: 0.9;
      }
      .fcchat-recall-card.is-user .fcchat-recall-role{
        color: #2665c3;
      }
      .fcchat-recall-card.is-assistant .fcchat-recall-role{
        color: #8b5a2b;
      }
      .fcchat-recall-text{
        font-size: 13px;
        color: var(--fcchat-ink);
        line-height: 1.45;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .fcchat-list{
        flex: 1;
        overflow: auto;
        padding: 14px 14px 10px 14px;
        display:flex;
        flex-direction: column;
        gap: 12px;
        -webkit-overflow-scrolling: touch;
      }

      .fcchat-row{
        display:flex;
        animation: fcchat-bubble-in 220ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-row.is-user{ justify-content:flex-end; }
      .fcchat-row.is-assistant{ justify-content:flex-start; }
      @keyframes fcchat-bubble-in{
        from{ opacity: 0; transform: translate3d(0, 6px, 0); }
        to{ opacity: 1; transform: translate3d(0, 0, 0); }
      }

      .fcchat-bubble{
        max-width: 80%;
        padding: 11px 13px;
        border-radius: 14px;
        font-size: 17px;
        line-height: 1.62;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
        border: 1px solid transparent;
      }
      .bubble-user{
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, #256cd5 100%);
        color:#fff;
        border-top-right-radius: 5px;
        box-shadow: 0 10px 22px rgba(37, 99, 235, 0.24);
      }
      .bubble-assistant{
        background: linear-gradient(150deg, rgba(255, 255, 255, 0.95) 0%, var(--fcchat-assistant) 100%);
        color: var(--fcchat-ink);
        border-top-left-radius: 5px;
        border-color: var(--fcchat-assistant-border);
      }

      .fcchat-status{
        padding: 6px 14px 0 14px;
        font-size: 12px;
        color: var(--fcchat-ink-soft);
        min-height: 18px;
      }

      .fcchat-inputbar{
        display:flex;
        gap: 10px;
        padding: 0;
        border-top: 0;
        background: transparent;
        backdrop-filter: none;
      }
      .fcchat-input{
        flex:1;
        height: 44px;
        border-radius: 12px;
        border: 1px solid var(--fcchat-border);
        background: rgba(255, 255, 255, 0.92);
        color: var(--fcchat-ink);
        padding: 0 12px;
        font-size: 16px;
        outline:none;
      }
      .fcchat-input:focus{
        border-color: rgba(31,79,157,.45);
        box-shadow: 0 0 0 3px rgba(31,79,157,.14);
      }

      .fcchat-btn{
        height: 44px;
        border-radius: 10px;
        border: 1px solid var(--fcchat-border);
        padding: 0 12px;
        font-size: 14px;
        cursor:pointer;
        user-select:none;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-btn:disabled{ opacity:.6; cursor:not-allowed; }
      .fcchat-btn-primary{
        min-width: 84px;
        background: linear-gradient(150deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color:#fff;
        border-color: transparent;
        box-shadow: 0 8px 16px rgba(31, 79, 157, 0.25);
      }
      .fcchat-btn-primary:hover{
        transform: translateY(-1px);
        box-shadow: 0 10px 20px rgba(31, 79, 157, 0.3);
      }
      .fcchat-btn-primary:active{
        transform: translateY(0);
      }
      .fcchat-btn-ghost{
        background: rgba(255,255,255,.66);
        color: var(--fcchat-ink);
        border-color: var(--fcchat-border);
        height: 30px;
        padding: 0 10px;
        border-radius: 10px;
        font-size: 12px;
      }
      .fcchat-btn-ghost:hover{
        background: rgba(255,255,255,.9);
      }
      .fcchat-btn-ghost.is-active{
        color: #fff;
        background: linear-gradient(145deg, var(--fcchat-accent), var(--fcchat-accent-strong));
        border-color: transparent;
      }
      .fcchat-close{
        width: 30px;
        padding: 0;
        font-size: 18px;
        line-height: 28px;
      }

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
        box-shadow: 0 8px 20px rgba(31, 79, 157, 0.36);
        padding: 0;
        transition: opacity 220ms ease, box-shadow 220ms ease, transform 220ms ease;
        animation: fcchat-idle 3.6s ease-in-out infinite;
        touch-action: none;
        -webkit-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      @media (max-width: 768px) and (orientation: portrait){
        .fcchat-fab{
          top: calc(env(safe-area-inset-top, 0px) + 88px);
          right: 12px;
          bottom: auto;
        }
      }
      .fcchat-fab:hover{
        box-shadow: 0 10px 24px rgba(31, 79, 157, 0.42);
        transform: scale(1.06);
      }
      .fcchat-fab:active{
        transform: scale(0.98);
      }
      .fcchat-fab svg{
        width: 44px;
        height: 44px;
        display: block;
      }
      .fcchat-fab.fcchat-dragging{
        transition: none !important;
        cursor: grabbing;
        animation: none !important;
      }
      .fcchat-fab.fcchat-snapping{
        transition: left 220ms cubic-bezier(0.2, 0.9, 0.2, 1), top 220ms cubic-bezier(0.2, 0.9, 0.2, 1);
      }
      .fcchat-fab.fcchat-docked{
        transform: translateX(14px);
        animation: none;
      }
      .fcchat-fab.fcchat-docked:hover{
        transform: translateX(10px) scale(1.05);
      }
      body.fcchat-open .fcchat-fab{
        opacity: 0.72;
      }
      @keyframes fcchat-idle{
        0%, 68%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
        74%{
          transform: translate3d(0, -10px, 0) scale(1.12) rotate(4deg);
        }
        80%{
          transform: translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
        }
        87%, 100%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
      }

      @media (max-width: 768px), (pointer: coarse){
        .fcchat-root{
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          top: auto !important;
          width: 100vw !important;
          height: min(82vh, 760px) !important;
          border-radius: 18px 18px 0 0 !important;
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
        .fcchat-fab.fcchat-docked{
          transform: translateX(10px);
        }
        .fcchat-title{
          font-size: 20px;
        }
        .fcchat-bubble{
          font-size: 15px;
          line-height: 1.58;
          max-width: 88%;
        }
        .fcchat-input{
          font-size: 16px;
        }
        .fcchat-recall-panel{
          max-height: 138px;
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

      .fcchat-first-hint{
        position: fixed;
        z-index: 99998;
        transform: translate(-100%, -50%);
        max-width: 260px;
        border-radius: 14px;
        border: 1px solid var(--fcchat-border);
        background: linear-gradient(140deg, rgba(255,255,255,0.95), rgba(245, 240, 230, 0.95));
        color: var(--fcchat-ink);
        padding: 10px 12px;
        font-size: 13px;
        line-height: 1.45;
        box-shadow: 0 10px 24px rgba(20, 30, 50, 0.22);
        pointer-events: none;
        opacity: 1;
        transition: opacity 280ms ease, transform 280ms ease;
      }
      .fcchat-first-hint.is-hide{
        opacity: 0;
        transform: translate(calc(-100% - 6px), -50%);
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

