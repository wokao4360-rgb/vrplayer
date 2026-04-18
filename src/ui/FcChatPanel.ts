import { FcChatClient } from "../services/fcChatClient";
import type { FcChatContext, FcChatImageAttachment } from "../services/fcChatClient";

type Role = "assistant" | "user" | "system";
type MessageKind = "text" | "review-card" | "route-card";
type ChatMsg = {
  id: string;
  role: Role;
  text: string;
  requestText?: string;
  kind?: MessageKind;
  cardTitle?: string;
  variant?: "welcome";
};
type PromptSendOptions = {
  displayText?: string;
  responseKind?: MessageKind;
  fallbackKind?: FallbackKind;
  speakAfter?: boolean;
  imageAttachment?: FcChatImageAttachment | null;
};
type PresetPrompt = {
  displayText: string;
  prompt: string;
  responseKind?: MessageKind;
  fallbackKind?: FallbackKind;
  speakAfter?: boolean;
  imageAttachment?: FcChatImageAttachment | null;
};
type AudienceMode = "default" | "highschool" | "teacher" | "english";
type FallbackKind =
  | "scene-view"
  | "scene-story"
  | "scene-spirit"
  | "narration"
  | "review-card"
  | "route-card";
export type CapturedViewImage = {
  dataUrl: string;
  mimeType?: string;
  width?: number;
  height?: number;
};
type FcChatPanelOptions = {
  captureCurrentViewImage?: () => CapturedViewImage | null;
};

const MAX_HISTORY_MESSAGES = 40;
const MAX_USER_MEMORY_ITEMS = 120;
const HISTORY_KEY_PREFIX = "fcchat_history_v2";
const SESSION_KEY_PREFIX = "fcchat_session_v1";
const SCENE_KEY_PREFIX = "fcchat_scene_v1";
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

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
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
  private contextBar!: HTMLDivElement;
  private audienceMenu!: HTMLDivElement;
  private workbench!: HTMLDivElement;
  private workbenchPanel!: HTMLDivElement;
  private reviewActions!: HTMLDivElement;
  private captionOverlay!: HTMLDivElement;
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
  private sceneStorageKey: string;
  private userMemoryStorageKey: string;
  private sessionId: string;
  private userMemory: string[] = [];
  private sceneUserMemory: string[] = [];
  private sceneTurnAnchor = 0;
  private contextVersion = 0;
  private recallOpen = false;
  private requestInFlight = false;
  private isSpeaking = false;
  private audienceMode: AudienceMode = "highschool";
  private audienceMenuOpen = false;
  private lastAssistantMessageId: string | null = null;

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
  private readonly captureCurrentViewImage?: () => CapturedViewImage | null;
  private readonly handleDocumentPointerDown = (event: PointerEvent) => {
    if (!this.audienceMenuOpen) return;
    const target = event.target as Node | null;
    if (target && this.header.contains(target)) {
      return;
    }
    this.setAudienceMenuOpen(false);
  };

  // typing effect controls
  private typingTimer: number | null = null;
  private typingAbortToken = 0;
  private statusTimer: number | null = null;

  constructor(client: FcChatClient, context: FcChatContext, options: FcChatPanelOptions = {}) {
    this.client = client;
    this.context = context;
    this.captureCurrentViewImage = options.captureCurrentViewImage;
    this.historyStorageKey = buildScopedKey(HISTORY_KEY_PREFIX, context.museumId);
    this.sessionStorageKey = buildScopedKey(SESSION_KEY_PREFIX, context.museumId);
    this.sceneStorageKey = buildScopedKey(SCENE_KEY_PREFIX, context.museumId);
    this.userMemoryStorageKey = buildScopedKey(USER_MEMORY_KEY_PREFIX, context.museumId);
    this.sessionId = this.loadSessionId();
    this.userMemory = this.loadUserMemory();
    const previousSceneId = this.loadStoredSceneId();

    this.mount();
    this.injectStyles();
    this.detectMobile();
    this.restoreHistoryOrWelcome();
    this.applySceneChange(previousSceneId);
    this.persistCurrentSceneId();
  }

  public destroy() {
    this.stopTyping(true);
    this.stopSpeaking();
    this.clearStatusTimer();
    document.removeEventListener("pointerdown", this.handleDocumentPointerDown);
    if (this.snapTimer) {
      window.clearTimeout(this.snapTimer);
      this.snapTimer = null;
    }
    this.root?.remove();
    this.fabButton?.remove();
    this.fabButton = null;
    this.captionOverlay?.remove();
  }

  public updateContext(context: FcChatContext): void {
    const previousSceneId = this.context.sceneId;
    this.context = {
      ...this.context,
      ...context,
    };
    this.contextVersion += 1;
    this.applySceneChange(previousSceneId);
    this.persistCurrentSceneId();

    this.renderContextBar();
    this.renderWorkbench();
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
    this.clearBtn.addEventListener("click", () => this.clear());

    this.recallBtn = document.createElement("button");
    this.recallBtn.className = "fcchat-btn fcchat-btn-ghost";
    this.recallBtn.type = "button";
    this.recallBtn.setAttribute("aria-label", "查看会话回看");
    this.recallBtn.setAttribute("aria-pressed", "false");
    this.recallBtn.addEventListener("click", () => this.toggleRecallPanel());

    this.closeBtn = document.createElement("button");
    this.closeBtn.className = "fcchat-btn fcchat-btn-ghost fcchat-close";
    this.closeBtn.type = "button";
    this.closeBtn.setAttribute("aria-label", "关闭");
    this.closeBtn.textContent = "×";
    this.closeBtn.addEventListener("click", () => this.toggle());

    headerRight.appendChild(this.closeBtn);

    const headerRow = document.createElement("div");
    headerRow.className = "fcchat-header-row";
    headerRow.appendChild(left);
    headerRow.appendChild(headerRight);
    this.header.appendChild(headerRow);

    const disclaimer = document.createElement("div");
    disclaimer.className = "fcchat-disclaimer";
    disclaimer.textContent = "AI 可能会出错，仅供参考，请以现场讲解为准。";
    this.header.appendChild(disclaimer);

    this.contextBar = document.createElement("div");
    this.contextBar.className = "fcchat-contextbar";
    this.header.appendChild(this.contextBar);

    this.audienceMenu = document.createElement("div");
    this.audienceMenu.className = "fcchat-audience-menu";
    this.audienceMenu.setAttribute("role", "menu");
    this.audienceMenu.hidden = true;
    this.header.appendChild(this.audienceMenu);

    this.workbench = document.createElement("div");
    this.workbench.className = "fcchat-workbench";

    this.workbenchPanel = document.createElement("div");
    this.workbenchPanel.className = "fcchat-workbench-panel";

    this.reviewActions = document.createElement("div");
    this.reviewActions.className = "fcchat-workbench-actions";
    this.workbench.appendChild(this.workbenchPanel);

    this.captionOverlay = document.createElement("div");
    this.captionOverlay.className = "fcchat-caption-overlay";
    this.captionOverlay.hidden = true;

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
    this.input.placeholder = "继续提问";
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
    composer.appendChild(inputBar);

    this.root.appendChild(this.header);
    this.root.appendChild(this.workbench);
    this.root.appendChild(this.body);
    this.root.appendChild(composer);

    document.body.appendChild(this.root);
    document.body.appendChild(this.captionOverlay);
    document.addEventListener("pointerdown", this.handleDocumentPointerDown);

    this.root.style.display = "none";
    this.root.style.right = "18px";
    this.root.style.bottom = "18px";

    this.ensureToggleButton();
    this.renderContextBar();
    this.renderWorkbench();

    this.header.addEventListener("mousedown", (e) => this.onDragStart(e));
    window.addEventListener("mousemove", (e) => this.onDragMove(e));
    window.addEventListener("mouseup", () => this.onDragEnd());

    this.header.addEventListener("pointerdown", (e) => this.onSwipeStart(e), { passive: false });
    this.header.addEventListener("pointermove", (e) => this.onSwipeMove(e), { passive: false });
    this.header.addEventListener("pointerup", (e) => this.onSwipeEnd(e));
    this.header.addEventListener("pointercancel", (e) => this.onSwipeEnd(e));

    window.addEventListener("resize", () => this.detectMobile());
    this.syncActionButtonsDisabled();
  }

  private renderContextBar(): void {
    if (!this.contextBar) return;
    this.contextBar.innerHTML = "";
    this.audienceMenu.innerHTML = "";

    const museumPill = document.createElement("span");
    museumPill.className = "fcchat-context-pill";
    museumPill.textContent = this.context.museumName || "当前展馆";

    const scenePill = document.createElement("span");
    scenePill.className = "fcchat-context-pill";
    scenePill.textContent = this.context.sceneTitle || "当前点位";

    const audiencePill = document.createElement("button");
    audiencePill.type = "button";
    audiencePill.className = "fcchat-context-pill";
    audiencePill.textContent = this.getAudienceModeLabel();
    audiencePill.setAttribute("aria-haspopup", "menu");
    audiencePill.setAttribute("aria-expanded", this.audienceMenuOpen ? "true" : "false");
    audiencePill.addEventListener("click", () => this.toggleAudienceMenu());

    this.contextBar.appendChild(museumPill);
    this.contextBar.appendChild(scenePill);
    this.contextBar.appendChild(audiencePill);

    const defs: Array<{ label: string; value: AudienceMode }> = [
      { label: "中学版", value: "highschool" },
      { label: "教师版", value: "teacher" },
      { label: "英语版", value: "english" },
      { label: "通用版", value: "default" },
    ];

    defs.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fcchat-chip fcchat-chip-audience";
      btn.textContent = item.label;
      btn.setAttribute("role", "menuitemradio");
      btn.setAttribute("aria-checked", this.audienceMode === item.value ? "true" : "false");
      btn.classList.toggle("is-active", this.audienceMode === item.value);
      btn.addEventListener("click", () => this.selectAudienceMode(item.value));
      this.audienceMenu.appendChild(btn);
    });

    this.setAudienceMenuOpen(this.audienceMenuOpen);
  }

  private renderWorkbench(): void {
    if (!this.workbench) return;
    this.workbench.classList.add("is-feedback-only");
    this.workbenchPanel.hidden = false;
    this.workbenchPanel.innerHTML = "";
    this.workbenchPanel.className = "fcchat-feedback-strip";
    this.workbenchPanel.classList.toggle("is-passive", !this.shouldShowFeedbackActions());

    const label = document.createElement("span");
    label.className = "fcchat-feedback-label";
    label.textContent = "学习反馈";
    this.workbenchPanel.appendChild(label);
    if (this.shouldShowFeedbackActions()) {
      this.renderReviewWorkbench();
      this.workbenchPanel.appendChild(this.reviewActions);
      return;
    }

    const hint = document.createElement("span");
    hint.className = "fcchat-feedback-hint";
    hint.textContent = "提问后可复盘";
    this.workbenchPanel.appendChild(hint);
  }

  private renderReviewWorkbench(): void {
    this.reviewActions.innerHTML = "";
    const defs = [
      { label: "行后复盘", prompt: this.buildReviewCardPrompt(), responseKind: "review-card" as const },
      { label: "推荐回看点位", prompt: this.buildReviewRoutePrompt(), responseKind: "route-card" as const },
    ];

    defs.forEach((item) => {
      const btn = this.createActionChip(item.label, "fcchat-chip fcchat-chip-review");
      btn.addEventListener("click", () =>
        void this.sendPresetPrompt({
          displayText: item.label,
          prompt: item.prompt,
          responseKind: item.responseKind,
          fallbackKind: item.responseKind,
        })
      );
      this.reviewActions.appendChild(btn);
    });
  }

  private setAudienceMenuOpen(open: boolean): void {
    this.audienceMenuOpen = open;
    if (this.audienceMenu) {
      this.audienceMenu.hidden = !open;
      this.audienceMenu.classList.toggle("is-open", open);
    }
    this.contextBar
      ?.querySelectorAll<HTMLButtonElement>("button.fcchat-context-pill")
      .forEach((button) => {
        const expanded = open && button.textContent === this.getAudienceModeLabel();
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
        button.classList.toggle("is-active", expanded);
      });
  }

  private toggleAudienceMenu(): void {
    this.setAudienceMenuOpen(!this.audienceMenuOpen);
  }

  private selectAudienceMode(mode: AudienceMode): void {
    this.audienceMode = mode;
    this.setAudienceMenuOpen(false);
    this.renderContextBar();
    this.announceStatus(`已切换为${this.getAudienceModeLabel()}，仅影响下一次回答。`);
  }

  private cycleAudienceMode(): void {
    const order: AudienceMode[] = ["highschool", "teacher", "english", "default"];
    const currentIndex = Math.max(0, order.indexOf(this.audienceMode));
    this.audienceMode = order[(currentIndex + 1) % order.length];
    this.renderContextBar();
  }

  private createActionChip(label: string, className: string): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.textContent = label;
    return btn;
  }

  private buildWelcomeText(): string {
    const sceneName = this.context.sceneTitle || "当前点位";
    return `你现在在“${sceneName}”。先点底部“拍照”看这一幕，或点“智能讲解”听讲解。`;
  }

  private buildScenePrompt(kind: "view" | "story" | "spirit"): string {
    const sceneName = this.context.sceneTitle || "当前点位";
    const museumName = this.context.museumName || "当前展馆";
    if (kind === "view") {
      return `我现在正在 ${museumName} 的“${sceneName}”。请围绕我眼前这一幕，用 3 到 4 句话告诉我先看什么、为什么值得看。`;
    }
    if (kind === "story") {
      return `请围绕 ${museumName} 的“${sceneName}”，用适合现场导览的方式讲清这个点位主要在讲什么。`;
    }
    return `请结合 ${museumName} 的“${sceneName}”，告诉我这里主要体现了什么精神线索，并说明它和今天有什么关系。`;
  }

  private buildPhotoPrompt(): string {
    const sceneName = this.context.sceneTitle || "当前点位";
    const museumName = this.context.museumName || "当前展馆";
    return `我现在正在 ${museumName} 的“${sceneName}”，并附上了我当前视角的截图。请先根据这张图判断我眼前最值得先看的内容，再用 3 到 4 句话说明为什么值得看。`;
  }

  private buildNarrationPrompt(): string {
    const sceneName = this.context.sceneTitle || "当前点位";
    const museumName = this.context.museumName || "当前展馆";
    return `请为 ${museumName} 的“${sceneName}”生成一段约 30 秒的陪伴式讲解，口语化一些，适合直接播报。`;
  }

  private buildSceneFallbackText(kind: "scene-view" | "scene-story" | "scene-spirit"): string {
    const sceneName = this.context.sceneTitle || "当前点位";
    const museumName = this.context.museumName || "当前展馆";

    if (this.audienceMode === "english") {
      if (kind === "scene-view") {
        return `You are now at ${sceneName} in ${museumName}. Start by noticing the space in front of you and ask what kind of first impression this scene is trying to create. Then look for the clue that tells you who is being remembered here and why this stop matters.`;
      }
      if (kind === "scene-story") {
        return `At ${sceneName} in ${museumName}, this stop works like an opening frame. It helps visitors enter the historical setting, identify the central figure, and understand why the later exhibits carry weight.`;
      }
      return `The spirit here is responsibility turned into action. This scene is not only about a place; it invites you to ask how personal choices become part of a larger national story.`;
    }

    if (this.audienceMode === "teacher") {
      if (kind === "scene-view") {
        return `现在你在 ${museumName} 的“${sceneName}”。如果带队，可以先请学生观察入口空间最显眼的线索，再追问：这里为什么适合做整馆叙事的起点。先让大家说看到什么，再补充史实，效果会更稳。`;
      }
      if (kind === "scene-story") {
        return `“${sceneName}”适合先用半分钟交代它在整馆里的功能：它不是单独的景，而是在把人物、时代和后续展陈的主线铺开。接下来可顺势追问学生，这个点位最先想让我们记住什么。`;
      }
      return `这里适合提炼的精神线索是：把家国责任落实到具体行动。带队讲解时，不必先下结论，可以先让学生从空间、文字和人物处境里自己归纳，再做提升。`;
    }

    if (this.audienceMode === "highschool") {
      if (kind === "scene-view") {
        return `你现在看到的是 ${museumName} 的“${sceneName}”。先把它当成整段故事的开场：别急着记结论，先看这里最想让你注意的空间和细节，再想它为什么被放在这里。`;
      }
      if (kind === "scene-story") {
        return `这个点位主要不是在堆信息，而是在告诉你：后面整座馆会围绕什么人物和什么时代问题展开。抓住“为什么从这里开始”，后面的内容会更容易串起来。`;
      }
      return `这里体现出来的精神，不是抽象口号，而是人在关键时刻怎么做选择。你可以带着一个问题继续看：如果换成自己站在那个时代，会不会也能做出同样的决定。`;
    }

    if (kind === "scene-view") {
      return `你现在来到 ${museumName} 的“${sceneName}”。先别急着往里走，先看这里最先进入视线的空间和细节，它们通常在告诉你这段历史该从哪里开始理解。`;
    }
    if (kind === "scene-story") {
      return `“${sceneName}”更像这座馆的叙事入口。它先把人物、时代和后续展陈的观看方式定下来，让你知道后面不是零散陈列，而是一条可以一路追下去的故事线。`;
    }
    return `这里最值得抓住的精神线索，是把家国责任落到具体选择上。它提醒我们，历史并不只是被讲述出来的，也是人在关键时刻一步步做出来的。`;
  }

  private buildNarrationFallbackText(): string {
    const sceneName = this.context.sceneTitle || "当前点位";
    const museumName = this.context.museumName || "当前展馆";

    if (this.audienceMode === "english") {
      return `We are now at ${sceneName} in ${museumName}. Treat this as the opening scene of the museum, not just a doorway. As you move on, keep one question in mind: what does this place want you to remember first about the person, the time, and the choices that followed?`;
    }

    if (this.audienceMode === "teacher") {
      return `现在我们来到 ${museumName} 的“${sceneName}”。如果你在带队，可以先请学生用十秒钟说出这里最先看到的线索，再追问它为什么适合作为整馆叙事的开场。带着“这里先让我们理解什么”继续往里走，后面的讲解会更容易组织起来。`;
    }

    if (this.audienceMode === "highschool") {
      return `现在我们来到 ${museumName} 的“${sceneName}”。先把这里当成故事开头，不用急着背知识点，先看它最想让你注意什么。带着“为什么从这里开始讲”这个问题继续往里走，你会更容易把整座馆的线索连起来。`;
    }

    return `现在我们来到 ${museumName} 的“${sceneName}”。先别急着往里走，先把这里当成一段历史的开场：它在提醒我们，后面的每个点位都不是孤立陈列，而是在把人物、时代和选择慢慢铺开。带着“这里为什么值得先看”这个问题继续往里走，你会更容易把整座馆串起来。`;
  }

  public playPresetNarration(): void {
    const text = this.buildNarrationFallbackText();
    this.speakText(text);
    this.captionOverlay.textContent = text;
    this.captionOverlay.hidden = false;
  }

  public askCurrentView(): void {
    if (!this.isOpen) this.show();
    const capturedView = this.captureCurrentViewImage?.() ?? null;
    void this.sendPresetPrompt({
      displayText: "拍照",
      prompt: capturedView?.dataUrl ? this.buildPhotoPrompt() : this.buildScenePrompt("view"),
      fallbackKind: "scene-view",
      imageAttachment: capturedView
        ? {
            type: "image",
            dataUrl: capturedView.dataUrl,
            mimeType: capturedView.mimeType || "image/jpeg",
            width: capturedView.width,
            height: capturedView.height,
            sceneId: this.context.sceneId,
            sceneTitle: this.context.sceneTitle,
          }
        : null,
    });
  }

  private buildReviewCardPrompt(): string {
    const museumName = this.context.museumName || "当前展馆";
    return `请根据我们刚才围绕 ${museumName} 的交流，给我一张简短的行后复盘卡：包括 3 个记住点、1 个值得再想的问题、1 条现实启发。`;
  }

  private buildReviewRoutePrompt(): string {
    const museumName = this.context.museumName || "当前展馆";
    const sceneName = this.context.sceneTitle || "当前点位";
    return `如果我在 ${museumName} 看完“${sceneName}”后还想继续，请推荐 2 到 3 个值得回看或继续走的点位，并说明每个点位应该带着什么问题去看。`;
  }

  private getAudienceModeLabel(): string {
    switch (this.audienceMode) {
      case "highschool":
        return "中学版";
      case "teacher":
        return "教师版";
      case "english":
        return "英语版";
      default:
        return "通用版";
    }
  }

  private getCardTitle(kind: MessageKind | undefined): string | undefined {
    if (kind === "review-card") {
      return "行后复盘";
    }
    if (kind === "route-card") {
      return "推荐回看点位";
    }
    return undefined;
  }

  private isStructuredCardKind(kind?: MessageKind): kind is Exclude<MessageKind, "text"> {
    return kind === "review-card" || kind === "route-card";
  }

  private buildFallbackCardText(kind: Exclude<MessageKind, "text">): string {
    const museumName = this.context.museumName || "当前展馆";
    const sceneName = this.context.sceneTitle || "当前点位";

    if (kind === "review-card") {
      return [
        "说明：云端讲解暂不可用，以下为当前点位的本地示意卡。",
        "记住点",
        `1. “${sceneName}”是你进入 ${museumName} 当前叙事的重要落点，先抓住它在整馆里的位置。`,
        "2. 先看最直观的空间线索，再回到人物、事件和时代背景，理解会更稳。",
        "3. 把“这个点位想让我记住什么”作为主问题，后续场景会更容易串起来。",
        "值得再想的问题",
        `1. 如果你只给同伴 30 秒介绍“${sceneName}”，你会先保留哪一个细节？`,
        "现实启发",
        "1. 面对历史现场时，先看证据、再下判断，比直接背结论更容易形成自己的理解。",
        "提示：云端恢复后，可再次点击入口生成实时讲解卡。",
      ].join("\n");
    }

    return [
      "说明：云端讲解暂不可用，以下为当前点位的本地示意路线卡。",
      "推荐回看点位",
      `1. 先回看“${sceneName}”，确认它在 ${museumName} 整体叙事里承担的是开场、转折还是落点。`,
      "2. 再找一个能补充人物行动或时代背景的点位，把单点观察串成完整故事线。",
      "建议问题",
      "1. 这个点位和我刚看过的内容，哪一处在回答“为什么发生”，哪一处在回答“如何被记住”？",
      "2. 如果带着同学继续走，下一站最值得让大家停下来的细节是什么？",
      "下一步建议",
      "1. 带着一个具体问题继续走，比泛泛地看下一个点位更容易形成记忆。",
      "提示：云端恢复后，可再次点击入口生成实时推荐卡。",
    ].join("\n");
  }

  private buildPresetFallbackText(kind: FallbackKind): string {
    if (kind === "review-card" || kind === "route-card") {
      return this.buildFallbackCardText(kind);
    }
    if (kind === "narration") {
      return this.buildNarrationFallbackText();
    }
    return this.buildSceneFallbackText(kind);
  }

  private getFallbackStatusText(kind: FallbackKind): string {
    if (kind === "narration") {
      return "云端讲解暂不可用，已切换为本地陪伴式讲解。";
    }
    if (kind === "review-card" || kind === "route-card") {
      return "云端讲解暂不可用，已切换为本地示意卡。";
    }
    return "云端讲解暂不可用，已切换为本地示意讲解。";
  }

  private hide() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.stopTyping(true);
    this.setAudienceMenuOpen(false);
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
    this.stopSpeaking();
    this.setAudienceMenuOpen(false);
    this.messages = [];
    this.userMemory = [];
    this.sceneUserMemory = [];
    this.sceneTurnAnchor = 0;
    this.lastAssistantMessageId = null;
    this.list.innerHTML = "";
    this.statusLine.textContent = "";
    this.sessionId = generateSessionId();
    this.persistSessionId();
    this.persistMessages();
    this.persistUserMemory();
    this.ensureWelcome();
    this.renderWorkbench();
    this.renderContextBar();
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

  private loadStoredSceneId(): string {
    try {
      return localStorage.getItem(this.sceneStorageKey)?.trim() || "";
    } catch {
      return "";
    }
  }

  private persistSessionId(): void {
    try {
      localStorage.setItem(this.sessionStorageKey, this.sessionId);
    } catch {
      // ignore
    }
  }

  private persistCurrentSceneId(): void {
    try {
      localStorage.setItem(this.sceneStorageKey, this.context.sceneId || "");
    } catch {
      // ignore
    }
  }

  private applySceneChange(previousSceneId?: string): void {
    const nextSceneId = this.context.sceneId || "";
    if (!nextSceneId || nextSceneId === previousSceneId) {
      return;
    }
    this.sceneTurnAnchor = this.messages.length;
    this.sceneUserMemory = [];
    this.sessionId = generateSessionId();
    this.persistSessionId();
    this.stopSpeaking();
    this.setAudienceMenuOpen(false);
    const hasMeaningfulConversation =
      this.messages.some((msg) => msg.role === "user") ||
      this.messages.filter((msg) => msg.role === "assistant").length > 1;
    if (hasMeaningfulConversation) {
      this.addSceneDivider(this.context.sceneTitle || "当前点位");
    }
    this.statusLine.textContent = "";
    this.renderContextBar();
    this.renderWorkbench();
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

  private isConversationMessage(message: ChatMsg): message is ChatMsg & { role: "assistant" | "user" } {
    return message.role === "assistant" || message.role === "user";
  }

  private getRequestText(message: ChatMsg): string {
    return this.normalizeText(message.requestText ?? message.text).trim();
  }

  private buildRequestContext(currentQuestion?: string): FcChatContext {
    const normalizedQuestion = this.normalizeText(currentQuestion || "").trim();
    const sharedMemory = this.userMemory.filter((item) => item !== normalizedQuestion);
    const sceneMemory = this.sceneUserMemory.filter((item) => item !== normalizedQuestion);
    const mergedMemory = [...sharedMemory, ...sceneMemory].slice(-30);
    const conversationMessages = this.messages.filter(
      (msg): msg is ChatMsg & { role: "assistant" | "user" } => this.isConversationMessage(msg)
    );
    const sceneConversation = this.messages
      .slice(this.sceneTurnAnchor)
      .filter((msg): msg is ChatMsg & { role: "assistant" | "user" } => this.isConversationMessage(msg));

    const recentTurns = sceneConversation
      .slice(-8)
      .map((msg) => ({
        role: msg.role,
        text: this.getRequestText(msg),
      }))
      .filter((msg) => !!msg.text);

    const latestUser = [...conversationMessages]
      .reverse()
      .find(
        (msg) =>
          msg.role === "user" &&
          !!this.getRequestText(msg) &&
          this.getRequestText(msg) !== normalizedQuestion
      );
    const latestAssistant = [...conversationMessages]
      .reverse()
      .find((msg) => msg.role === "assistant" && !!this.getRequestText(msg));

    return {
      ...this.context,
      userMemory: mergedMemory,
      lastUserUtterance: latestUser ? this.getRequestText(latestUser) : "",
      lastAssistantReply: latestAssistant ? this.getRequestText(latestAssistant) : "",
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
              id: typeof item?.id === "string" && item.id.trim() ? item.id.trim() : generateMessageId(),
              role:
                item?.role === "assistant"
                  ? "assistant"
                  : item?.role === "system"
                  ? "system"
                  : "user",
              text: typeof item?.text === "string" ? item.text.trim() : "",
              requestText: typeof item?.requestText === "string" ? item.requestText.trim() : undefined,
              kind: item?.kind === "review-card" || item?.kind === "route-card" ? item.kind : undefined,
              cardTitle: typeof item?.cardTitle === "string" ? item.cardTitle.trim() : undefined,
            }))
            .filter((item: ChatMsg) => !!item.text) as ChatMsg[];
          if (history.length > 0) {
            this.messages = history.slice(-MAX_HISTORY_MESSAGES);
            this.lastAssistantMessageId = this.getLatestAssistantMessageId();
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
    const isWelcomeOnly =
      this.messages.length === 1 &&
      this.messages[0]?.role === "assistant" &&
      this.messages[0]?.variant === "welcome";
    this.list.classList.toggle("is-welcome-only", isWelcomeOnly);
    this.lastAssistantMessageId = this.getLatestAssistantMessageId();
    for (const msg of this.messages) {
      this.list.appendChild(this.createMessageRow(msg));
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
    this.addMessage("assistant", this.buildWelcomeText(), undefined, {
      variant: "welcome",
    });
  }

  private shouldShowFeedbackActions(): boolean {
    return this.messages.some((msg) => msg.role === "user");
  }

  private setBusy(busy: boolean, statusText = "") {
    if (statusText) {
      this.clearStatusTimer();
    }
    this.requestInFlight = busy;
    this.sendBtn.disabled = busy;
    this.input.disabled = busy;
    this.statusLine.textContent = statusText;
    this.syncActionButtonsDisabled();
  }

  private clearStatusTimer(): void {
    if (this.statusTimer != null) {
      window.clearTimeout(this.statusTimer);
      this.statusTimer = null;
    }
  }

  private announceStatus(message: string, autoClearMs = 2600): void {
    this.clearStatusTimer();
    this.statusLine.textContent = message;
    if (autoClearMs > 0) {
      this.statusTimer = window.setTimeout(() => {
        if (!this.requestInFlight && this.statusLine.textContent === message) {
          this.statusLine.textContent = "";
        }
        this.statusTimer = null;
      }, autoClearMs) as unknown as number;
    }
  }

  private syncActionButtonsDisabled(): void {
    const selectors = [
      ".fcchat-workbench-panel button",
      ".fcchat-feedback-strip button",
      ".fcchat-followup-actions button",
    ];
    selectors.forEach((selector) => {
      this.root.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
        button.disabled = this.requestInFlight;
      });
    });
  }

  private stopSpeaking(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    if (this.captionOverlay) {
      this.captionOverlay.hidden = true;
    }
    this.syncActionButtonsDisabled();
  }

  private speakText(text: string): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    this.stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.audienceMode === "english" ? "en-US" : "zh-CN";
    utterance.rate = this.audienceMode === "teacher" ? 0.95 : 1;
    utterance.onend = () => {
      this.isSpeaking = false;
      this.syncActionButtonsDisabled();
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      this.syncActionButtonsDisabled();
    };
    this.isSpeaking = true;
    this.syncActionButtonsDisabled();
    window.speechSynthesis.speak(utterance);
  }

  private rememberSceneMessage(text: string): void {
    const normalized = this.normalizeText(text).trim();
    if (!normalized) return;
    if (this.sceneUserMemory[this.sceneUserMemory.length - 1] === normalized) return;
    this.sceneUserMemory.push(normalized);
    if (this.sceneUserMemory.length > 12) {
      this.sceneUserMemory = this.sceneUserMemory.slice(-12);
    }
  }

  private getAudienceInstruction(): string {
    switch (this.audienceMode) {
      case "highschool":
        return "请用适合中学生研学的方式回答，尽量具体、易懂、有启发。";
      case "teacher":
        return "请用适合教师带队讲解的方式回答，突出教学组织和可讨论的问题。";
      case "english":
        return "Please answer in natural English for a museum guide context.";
      default:
        return "请用自然、克制、适合第一次参观者理解的方式回答。";
    }
  }

  private composeQuestion(rawQuestion: string): string {
    return `${this.getAudienceInstruction()}\n\n${rawQuestion}`;
  }

  private async sendPresetPrompt({
    displayText,
    prompt,
    responseKind,
    fallbackKind,
    speakAfter,
    imageAttachment,
  }: PresetPrompt): Promise<void> {
    if (this.requestInFlight) return;
    await this.sendQuestion(prompt, {
      displayText,
      responseKind,
      fallbackKind,
      speakAfter,
      imageAttachment,
    });
  }

  private normalizeText(s: string) {
    return (s ?? "").replace(/^\s+/, "");
  }

  private isResponseSectionTitle(segment: string): boolean {
    return /^(记住点|值得再想的问题|现实启发|推荐回看点位|建议问题|下一步建议|带着什么问题去看)\s*[：:]?$/.test(segment);
  }

  private isResponseListItem(segment: string): boolean {
    return /^([0-9一二三四五六七八九十]+[\.、]|[-•·])\s*/.test(segment);
  }

  private cleanResponseListItem(segment: string): string {
    return segment.replace(/^([0-9一二三四五六七八九十]+[\.、]|[-•·])\s*/, "").trim();
  }

  private isResponseNote(segment: string): boolean {
    return /^(说明|提示)\s*[：:]/.test(segment);
  }

  private buildStructuredResponseCardBody(text: string): HTMLDivElement {
    const body = document.createElement("div");
    body.className = "fcchat-response-card-body";
    const segments = this.normalizeText(text)
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (segments.length === 0) {
      const line = document.createElement("p");
      line.textContent = "";
      body.appendChild(line);
      return body;
    }

    let currentList: HTMLUListElement | null = null;

    const flushList = () => {
      currentList = null;
    };

    segments.forEach((segment) => {
      if (this.isResponseSectionTitle(segment)) {
        flushList();
        const title = document.createElement("div");
        title.className = "fcchat-response-section-title";
        title.textContent = segment.replace(/[：:]$/, "");
        body.appendChild(title);
        return;
      }

      if (this.isResponseListItem(segment)) {
        if (!currentList) {
          currentList = document.createElement("ul");
          currentList.className = "fcchat-response-list";
          body.appendChild(currentList);
        }
        const item = document.createElement("li");
        item.className = "fcchat-response-list-item";
        item.textContent = this.cleanResponseListItem(segment);
        currentList.appendChild(item);
        return;
      }

      if (this.isResponseNote(segment)) {
        flushList();
        const note = document.createElement("div");
        note.className = "fcchat-response-note";
        note.textContent = segment;
        body.appendChild(note);
        return;
      }

      flushList();
      const line = document.createElement("p");
      line.textContent = segment;
      body.appendChild(line);
    });
    return body;
  }

  private getLatestConversationMessageId(): string | null {
    const latest = this.messages[this.messages.length - 1];
    if (!latest || !this.isConversationMessage(latest)) {
      return null;
    }
    return latest.id;
  }

  private getLatestAssistantMessageId(): string | null {
    const latest = [...this.messages]
      .reverse()
      .find((msg) => msg.role === "assistant");
    return latest?.id ?? null;
  }

  private shouldShowFollowupActions(msg: ChatMsg): boolean {
    return (
      msg.role === "assistant" &&
      !this.requestInFlight &&
      this.lastAssistantMessageId === msg.id &&
      this.getLatestConversationMessageId() === msg.id
    );
  }

  private shuffleReplyPrompts<T>(items: T[]): T[] {
    const next = [...items];
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  private createFollowupActions(msg: ChatMsg): HTMLDivElement {
    const container = document.createElement("div");
    container.className = "fcchat-followup-actions";

    const promptDefs = this.shuffleReplyPrompts([
      {
        label: "这个点位讲了什么",
        prompt: this.buildScenePrompt("story"),
        fallbackKind: "scene-story" as const,
      },
      {
        label: "这里体现了什么精神",
        prompt: this.buildScenePrompt("spirit"),
        fallbackKind: "scene-spirit" as const,
      },
      {
        label: "回顾上文",
        prompt: "请先用三句话回顾我们刚才已经讲到的重点，再继续回答。",
      },
    ]);

    const visiblePromptDefs =
      msg.variant === "welcome"
        ? promptDefs
            .filter((item) => item.label !== "回顾上文")
            .map((item) => ({
              ...item,
              label:
                item.label === "这个点位讲了什么"
                  ? "看这处在讲什么"
                  : item.label === "这里体现了什么精神"
                    ? "看这处体现什么精神"
                    : item.label,
            }))
        : promptDefs;

    visiblePromptDefs.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fcchat-chip fcchat-chip-secondary";
      btn.textContent = item.label;
      btn.addEventListener("click", () =>
        void this.sendPresetPrompt({
          displayText: item.label,
          prompt: item.prompt,
          fallbackKind: "fallbackKind" in item ? item.fallbackKind : undefined,
        })
      );
      container.appendChild(btn);
    });

    if (msg.variant === "welcome") {
      return container;
    }

    const defs = [
      { label: "重新生成", action: "retry" as const },
      { label: "换个版本", action: "version" as const },
    ];

    defs.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fcchat-chip fcchat-chip-secondary";
      btn.textContent = item.label;
      btn.addEventListener("click", () => {
        if (item.action === "version") {
          this.cycleAudienceMode();
        }
        const latestUser = [...this.messages].reverse().find((msg) => msg.role === "user");
        const prompt = latestUser ? this.getRequestText(latestUser) : item.label;
        void this.sendPresetPrompt({
          displayText: item.label,
          prompt,
        });
      });
      container.appendChild(btn);
    });

    return container;
  }

  private createMessageRow(msg: ChatMsg): HTMLDivElement {
    const row = document.createElement("div");
    row.className =
      msg.role === "system"
        ? "fcchat-row is-system"
        : `fcchat-row ${msg.role === "user" ? "is-user" : "is-assistant"}`;

    if (msg.role === "system") {
      const content = document.createElement("div");
      content.className = "fcchat-scene-divider";
      content.textContent = this.normalizeText(msg.text);
      row.appendChild(content);
      return row;
    }

    const stack = document.createElement("div");
    stack.className = "fcchat-message-stack";

    if (msg.role === "assistant" && msg.kind && msg.kind !== "text") {
      const card = document.createElement("div");
      card.className = `fcchat-response-card ${msg.kind}`;

      const cardTitle = document.createElement("div");
      cardTitle.className = "fcchat-response-card-title";
      cardTitle.textContent = msg.cardTitle || this.getCardTitle(msg.kind) || "学习反馈";

      card.appendChild(cardTitle);
      card.appendChild(this.buildStructuredResponseCardBody(msg.text));
      stack.appendChild(card);
      if (this.shouldShowFollowupActions(msg)) {
        stack.appendChild(this.createFollowupActions(msg));
      }
      row.appendChild(stack);
      return row;
    }

    const content = document.createElement("div");
    content.className = `fcchat-bubble ${msg.role === "user" ? "bubble-user" : "bubble-assistant"}`;
    content.textContent = this.normalizeText(msg.text);

    stack.appendChild(content);
    if (this.shouldShowFollowupActions(msg)) {
      stack.appendChild(this.createFollowupActions(msg));
    }
    row.appendChild(stack);
    return row;
  }

  private addMessage(
    role: Role,
    text: string,
    requestText = text,
    options: Partial<Pick<ChatMsg, "kind" | "cardTitle" | "variant">> = {}
  ) {
    const normalizedText = this.normalizeText(text);
    const normalizedRequestText = this.normalizeText(requestText);
    const msg: ChatMsg = {
      id: generateMessageId(),
      role,
      text: normalizedText,
      kind: options.kind,
      cardTitle: options.cardTitle,
      variant: options.variant,
    };
    if (role !== "system") {
      msg.requestText = normalizedRequestText;
    }
    this.messages.push(msg);
    if (this.messages.length > MAX_HISTORY_MESSAGES) {
      this.messages = this.messages.slice(-MAX_HISTORY_MESSAGES);
    }
    if (msg.role === "assistant") {
      this.lastAssistantMessageId = msg.id;
    }
    this.renderMessages();
    this.persistMessages();
    this.renderRecallPanel();
  }

  private addSceneDivider(sceneTitle: string): void {
    this.addMessage("system", `已切换到：${sceneTitle}`);
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
      .filter((msg) => msg.role !== "system")
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
    const question = this.input.value.trim();
    if (!question || this.requestInFlight) return;
    this.input.value = "";
    await this.sendQuestion(question);
  }

  private async sendQuestion(question: string, options: PromptSendOptions = {}): Promise<void> {
    const q = question.trim();
    const { displayText, responseKind, fallbackKind, imageAttachment } = options;
    if (!q) return;

    if (this.recallOpen) {
      this.toggleRecallPanel(false);
    }

    this.stopTyping(true);
    this.stopSpeaking();
    this.setAudienceMenuOpen(false);

    this.addMessage("user", displayText ?? q, q);

    const { row: loadingRow } = this.addAssistantBubbleLoading();
    this.setBusy(true, "正在整理讲解...");

    try {
      const requestContextVersion = this.contextVersion;
      const requestSceneId = this.context.sceneId || "";
      const historyForRequest = this.messages
        .slice(this.sceneTurnAnchor)
        .filter((msg): msg is ChatMsg & { role: "assistant" | "user" } => this.isConversationMessage(msg))
        .slice(-MAX_HISTORY_MESSAGES);
      const contextForRequest = this.buildRequestContext(q);
      this.rememberUserMessage(q);
      this.rememberSceneMessage(q);
      const res = await this.client.ask(
        this.composeQuestion(q),
        contextForRequest,
        historyForRequest
          .map((msg) => ({
            role: msg.role,
            text: this.getRequestText(msg),
          }))
          .filter((msg) => !!msg.text),
        this.sessionId,
        imageAttachment ?? undefined,
      );

      if (
        requestContextVersion !== this.contextVersion ||
        requestSceneId !== (this.context.sceneId || "")
      ) {
        const staleBubble = loadingRow.querySelector(".fcchat-bubble") as HTMLElement | null;
        if (staleBubble) {
          loadingRow.removeAttribute("data-loading");
          staleBubble.textContent = "点位已经切换，请重新围绕当前点位发问。";
        }
        this.setBusy(false, "");
        return;
      }

      const assistantMessage: ChatMsg = {
        id: generateMessageId(),
        role: "assistant",
        text: this.normalizeText(res.answer),
        requestText: this.normalizeText(res.answer),
        kind: responseKind,
        cardTitle: this.getCardTitle(responseKind),
      };

      if (!responseKind || responseKind === "text") {
        const bubble = this.replaceLoadingWithEmpty(loadingRow);
        this.setBusy(true, "正在整理讲解...");
        await this.typewriterRender(bubble, res.answer);
      }

      this.messages.push(assistantMessage);
      this.lastAssistantMessageId = assistantMessage.id;
      if (this.messages.length > MAX_HISTORY_MESSAGES) {
        this.messages = this.messages.slice(-MAX_HISTORY_MESSAGES);
      }
      this.renderMessages();
      this.persistMessages();
      this.renderRecallPanel();

      this.setBusy(false, "");
      this.renderMessages();
      if (options.speakAfter) {
        this.speakText(res.answer);
      }
    } catch (e: any) {
      const bubble = loadingRow.querySelector(".fcchat-bubble") as HTMLElement;
      if (bubble) {
        loadingRow.removeAttribute("data-loading");
        const msg = typeof e?.message === "string" ? e.message : String(e);
        const errText = `请求失败：${msg}`;
        const resolvedFallbackKind = fallbackKind || (this.isStructuredCardKind(responseKind) ? responseKind : undefined);
        const fallbackText = resolvedFallbackKind ? this.buildPresetFallbackText(resolvedFallbackKind) : errText;
        const fallbackMessageKind =
          resolvedFallbackKind === "review-card" || resolvedFallbackKind === "route-card"
            ? resolvedFallbackKind
            : undefined;
        const assistantMessage: ChatMsg = {
          id: generateMessageId(),
          role: "assistant",
          text: fallbackText,
          requestText: resolvedFallbackKind ? "" : errText,
          kind: fallbackMessageKind,
          cardTitle: this.getCardTitle(fallbackMessageKind),
        };
        if (resolvedFallbackKind && !fallbackMessageKind) {
          bubble.textContent = "";
          await this.typewriterRender(bubble, fallbackText);
        } else {
          bubble.textContent = errText;
        }
        this.messages.push(assistantMessage);
        this.lastAssistantMessageId = assistantMessage.id;
        if (this.messages.length > MAX_HISTORY_MESSAGES) {
          this.messages = this.messages.slice(-MAX_HISTORY_MESSAGES);
        }
        this.renderMessages();
        this.persistMessages();
        this.renderRecallPanel();
        if (resolvedFallbackKind === "narration" && options.speakAfter) {
          this.speakText(fallbackText);
        }
      }
      this.setBusy(
        false,
        fallbackKind ? this.getFallbackStatusText(fallbackKind) : this.isStructuredCardKind(responseKind) ? "云端讲解暂不可用，已切换为本地示意卡。" : ""
      );
      this.renderMessages();
    }
    this.scrollToBottom();
  }

  private injectStyles() {
    if (document.getElementById("fcchat-style")) return;

    const style = document.createElement("style");
    style.id = "fcchat-style";
    style.textContent = `
      .fcchat-root{
        --fcchat-paper: #f5f1e7;
        --fcchat-paper-soft: #fcfaf4;
        --fcchat-ink: #1f1c17;
        --fcchat-ink-soft: #6a6157;
        --fcchat-border: rgba(103, 78, 54, 0.18);
        --fcchat-accent: #c96442;
        --fcchat-accent-strong: #a84e2d;
        --fcchat-assistant: #f7efe4;
        --fcchat-assistant-border: rgba(201, 100, 66, 0.18);
        --fcchat-chip-bg: rgba(201, 100, 66, 0.08);
        --fcchat-chip-border: rgba(201, 100, 66, 0.18);
        --fcchat-shadow: 0 18px 44px rgba(73, 49, 28, 0.18);
        position: fixed;
        z-index: 99999;
        width: min(400px, calc(100vw - 24px));
        height: min(520px, calc(100vh - 28px));
        display: flex;
        flex-direction: column;
        border-radius: 18px;
        background:
          radial-gradient(120% 100% at 0% 0%, rgba(255, 255, 255, 0.86) 0%, transparent 42%),
          linear-gradient(145deg, var(--fcchat-paper-soft) 0%, var(--fcchat-paper) 100%);
        box-shadow: var(--fcchat-shadow);
        border: 1px solid rgba(103, 78, 54, 0.18);
        overflow: hidden;
        resize: both;
        min-width: 320px;
        min-height: 340px;
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
        gap: 5px;
        padding: 12px 14px 8px;
        border-bottom: 1px solid var(--fcchat-border);
        background:
          linear-gradient(180deg, rgba(255,252,246,0.96) 0%, rgba(245,237,225,0.92) 100%);
        cursor: move;
        user-select: none;
      }
      .fcchat-header-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
      }
      .fcchat-title{
        font-size: 22px;
        font-weight: 500;
        letter-spacing: 0.01em;
        color: var(--fcchat-ink);
        font-family: var(--vr-font-chat-title, Georgia, serif);
      }
      .fcchat-header-right{
        display:flex;
        align-items:center;
        gap: 8px;
      }
      .fcchat-disclaimer{
        margin-top: -1px;
        font-size: 10px;
        line-height: 1.35;
        color: rgba(106, 97, 87, 0.78);
      }
      .fcchat-contextbar{
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .fcchat-context-pill{
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        padding: 0 10px;
        border-radius: 999px;
        border: 1px solid rgba(168, 78, 45, 0.12);
        background: rgba(255, 255, 255, 0.72);
        color: var(--fcchat-ink-soft);
        font-size: 12px;
        line-height: 1;
      }
      button.fcchat-context-pill{
        cursor: pointer;
      }
      button.fcchat-context-pill.is-active{
        border-color: rgba(201, 100, 66, 0.22);
        background: rgba(255, 249, 244, 0.94);
        color: var(--fcchat-accent-strong);
      }
      .fcchat-audience-menu{
        display: none;
        margin-top: 6px;
        padding: 8px 0 0;
        gap: 6px;
        flex-wrap: wrap;
      }
      .fcchat-audience-menu.is-open{
        display: flex;
      }
      .fcchat-section-label{
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(106, 97, 87, 0.88);
      }
      .fcchat-workbench{
        padding: 6px 12px 7px;
        border-bottom: 1px solid rgba(103, 78, 54, 0.12);
        background: rgba(250, 247, 241, 0.94);
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .fcchat-workbench.is-feedback-only{
        gap: 0;
      }
      .fcchat-feedback-strip{
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        padding-top: 0;
      }
      .fcchat-feedback-strip.is-passive{
        gap: 8px;
      }
      .fcchat-feedback-label{
        font-size: 11px;
        color: var(--fcchat-ink-soft);
        margin-right: 2px;
      }
      .fcchat-feedback-hint{
        font-size: 11px;
        color: rgba(106, 97, 87, 0.76);
      }
      .fcchat-workbench-tabs{
        display: flex;
        align-items: center;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: thin;
      }
      .fcchat-workbench-tab{
        height: 34px;
        border-radius: 999px;
        border: 1px solid rgba(209, 207, 197, 0.9);
        background: rgba(255,255,255,0.72);
        color: rgba(77, 76, 72, 0.92);
        padding: 0 14px;
        font-size: 13px;
        cursor: pointer;
        white-space: nowrap;
        transition: background 160ms cubic-bezier(.2,.8,.2,1), color 160ms cubic-bezier(.2,.8,.2,1), box-shadow 160ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-workbench-tab.is-active{
        color: #fff;
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        border-color: transparent;
        box-shadow: 0 0 0 1px rgba(201, 100, 66, 0.18);
      }
      .fcchat-workbench-summary{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: 34px;
      }
      .fcchat-workbench-summary-text{
        font-size: 12px;
        line-height: 1.5;
        color: rgba(106, 97, 87, 0.92);
        flex: 1;
      }
      .fcchat-workbench-expand{
        flex-shrink: 0;
      }
      .fcchat-workbench-panel{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px 12px 14px;
        border-radius: 16px;
        border: 1px solid rgba(240, 238, 230, 0.96);
        background: rgba(255,255,255,0.66);
        box-shadow: 0 0 0 1px rgba(209, 207, 197, 0.3);
        max-height: 188px;
        overflow: auto;
      }
      .fcchat-workbench-actions{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .fcchat-inline-state{
        font-size: 12px;
        line-height: 1.55;
        color: rgba(106, 97, 87, 0.95);
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(255,255,255,0.72);
        border: 1px solid rgba(209, 207, 197, 0.68);
      }

      .fcchat-composer{
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 10px 12px 12px;
        border-top: 1px solid var(--fcchat-border);
        background: rgba(255, 253, 249, 0.9);
        backdrop-filter: blur(6px);
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
      .fcchat-chip:disabled{
        opacity: .55;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
      .fcchat-chip:hover{
        transform: translateY(-1px);
        background: rgba(201, 100, 66, 0.14);
        box-shadow: 0 4px 12px rgba(166, 77, 45, 0.16);
      }
      .fcchat-chip:active{
        transform: translateY(0);
      }
      .fcchat-chip-primary,
      .fcchat-chip.is-active{
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 8px 16px rgba(166, 77, 45, 0.18);
      }
      .fcchat-chip-primary.is-speaking{
        box-shadow: 0 0 0 2px rgba(201, 100, 66, 0.22);
      }
      .fcchat-chip-secondary{
        background: rgba(255, 255, 255, 0.7);
      }
      .fcchat-chip-scene{
        background: rgba(201, 100, 66, 0.12);
      }
      .fcchat-chip-audience{
        background: rgba(103, 78, 54, 0.08);
      }
      .fcchat-chip-review{
        background: rgba(168, 78, 45, 0.1);
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
        border: 1px solid rgba(103, 78, 54, 0.18);
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
        letter-spacing: 0.01em;
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
        padding: 10px 14px 10px 14px;
        display:flex;
        flex-direction: column;
        gap: 12px;
        -webkit-overflow-scrolling: touch;
      }
      .fcchat-list.is-welcome-only{
        justify-content: flex-start;
        padding-top: 18px;
      }

      .fcchat-row{
        display:flex;
        animation: fcchat-bubble-in 220ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-row.is-user{ justify-content:flex-end; }
      .fcchat-row.is-assistant{ justify-content:flex-start; }
      .fcchat-row.is-system{ justify-content:center; }
      .fcchat-message-stack{
        display:flex;
        flex-direction:column;
        gap: 8px;
        max-width: 88%;
      }
      .fcchat-row.is-user .fcchat-message-stack{
        align-items:flex-end;
      }
      .fcchat-row.is-assistant .fcchat-message-stack{
        align-items:flex-start;
      }
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
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color:#fff;
        border-top-right-radius: 6px;
        box-shadow: 0 10px 22px rgba(37, 99, 235, 0.24);
      }
      .bubble-assistant{
        background: linear-gradient(150deg, rgba(255, 255, 255, 0.96) 0%, var(--fcchat-assistant) 100%);
        color: var(--fcchat-ink);
        border-top-left-radius: 6px;
        border-color: var(--fcchat-assistant-border);
      }
      .fcchat-response-card{
        max-width: 88%;
        border-radius: 18px;
        padding: 14px 14px 12px;
        border: 1px solid #f0eee6;
        background: #faf9f5;
        box-shadow:
          0 0 0 1px rgba(209, 207, 197, 0.55),
          0 8px 22px rgba(20, 20, 19, 0.05);
      }
      .fcchat-response-card.review-card{
        border-color: rgba(201, 100, 66, 0.2);
        box-shadow:
          0 0 0 1px rgba(201, 100, 66, 0.12),
          0 8px 22px rgba(20, 20, 19, 0.05);
      }
      .fcchat-response-card.route-card{
        border-color: rgba(143, 86, 56, 0.18);
        box-shadow:
          0 0 0 1px rgba(143, 86, 56, 0.1),
          0 8px 22px rgba(20, 20, 19, 0.05);
      }
      .fcchat-response-card-title{
        font-size: 18px;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: 0.01em;
        color: #141413;
        font-family: var(--vr-font-chat-title, Georgia, serif);
      }
      .fcchat-response-card-body{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .fcchat-response-section-title{
        margin-top: 2px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(168, 78, 45, 0.92);
      }
      .fcchat-response-list{
        margin: 0;
        padding-left: 18px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .fcchat-response-list-item{
        font-size: 14px;
        line-height: 1.6;
        color: var(--fcchat-ink);
      }
      .fcchat-response-note{
        font-size: 12px;
        line-height: 1.55;
        color: var(--fcchat-ink-soft);
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(232, 230, 220, 0.7);
        border: 1px solid rgba(209, 207, 197, 0.65);
      }
      .fcchat-response-card-body p{
        margin: 0;
        font-size: 14px;
        line-height: 1.65;
        color: var(--fcchat-ink);
        white-space: pre-wrap;
        word-break: break-word;
      }
      .fcchat-followup-actions{
        display:flex;
        flex-wrap:wrap;
        gap: 6px;
      }
      .fcchat-scene-divider{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 28px;
        padding: 0 12px;
        border-radius: 999px;
        background: rgba(103, 78, 54, 0.08);
        color: var(--fcchat-ink-soft);
        font-size: 12px;
        letter-spacing: 0.04em;
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
        padding: 2px 0 0;
        border-top: 0;
        background: transparent;
        backdrop-filter: none;
      }
      .fcchat-input{
        flex:1;
        height: 44px;
        border-radius: 12px;
        border: 1px solid rgba(103, 78, 54, 0.18);
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
        border: 1px solid rgba(103, 78, 54, 0.18);
        padding: 0 12px;
        font-size: 14px;
        cursor:pointer;
        user-select:none;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-btn:disabled{ opacity:.6; cursor:not-allowed; }
      .fcchat-btn-primary{
        min-width: 84px;
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color:#fff;
        border-color: transparent;
        box-shadow: 0 8px 16px rgba(166, 77, 45, 0.22);
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
        padding: 2px 0 0;
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
        box-shadow: 0 8px 20px rgba(166, 77, 45, 0.28);
        padding: 2px 0 0;
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
        box-shadow: 0 10px 24px rgba(166, 77, 45, 0.34);
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
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        transform: translate3d(12px, 0, 0) scale(0.92);
      }
      .fcchat-caption-overlay{
        position: fixed;
        left: 50%;
        bottom: calc(env(safe-area-inset-bottom, 0px) + 72px);
        transform: translateX(-50%);
        z-index: 2602;
        width: min(520px, calc(100vw - 32px));
        max-height: 96px;
        overflow: auto;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.22);
        background: rgba(20, 20, 20, 0.62);
        color: rgba(255,255,255,0.95);
        padding: 10px 12px;
        font-size: 13px;
        line-height: 1.55;
        box-shadow: 0 10px 26px rgba(0,0,0,0.26);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }
      .fcchat-caption-overlay[hidden]{
        display: none !important;
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
          height: min(78vh, 720px) !important;
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
        .fcchat-caption-overlay{
          bottom: calc(env(safe-area-inset-bottom, 0px) + 62px);
          max-height: 88px;
        }
        .fcchat-title{
          font-size: 20px;
        }
        .fcchat-workbench{
          padding: 8px 10px 10px;
        }
        .fcchat-workbench-panel{
          max-height: 164px;
          padding: 10px 10px 12px;
        }
        .fcchat-workbench-tab{
          height: 36px;
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
        border: 1px solid rgba(103, 78, 54, 0.18);
        background: linear-gradient(140deg, rgba(255,255,255,0.96), rgba(246, 238, 227, 0.96));
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



