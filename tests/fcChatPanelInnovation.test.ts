import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../src/ui/FcChatPanel.ts", import.meta.url),
  "utf8",
);
const bottomDockSource = readFileSync(
  new URL("../src/ui/BottomDock.tsx", import.meta.url),
  "utf8",
);
const chatRuntimeSource = readFileSync(
  new URL("../src/app/chatRuntime.ts", import.meta.url),
  "utf8",
);
const clientSource = readFileSync(
  new URL("../src/services/fcChatClient.ts", import.meta.url),
  "utf8",
);
const mainSource = readFileSync(
  new URL("../src/main.ts", import.meta.url),
  "utf8",
);

test("fc chat panel title and top chrome match the simplified chat direction", () => {
  assert.match(source, /三馆学伴/);
  assert.doesNotMatch(source, /this\.clearBtn\.textContent\s*=\s*"清空"/);
  assert.doesNotMatch(source, /this\.recallBtn\.textContent\s*=\s*"回看"/);
  assert.match(source, /AI 可能会出错/);
});

test("fc chat panel context pills keep only direct names and default to middle school mode", () => {
  assert.doesNotMatch(source, /展馆：/);
  assert.doesNotMatch(source, /点位：/);
  assert.doesNotMatch(source, /版本：/);
  assert.match(source, /private audienceMode: AudienceMode = "highschool"/);
  assert.match(source, /return "中学版"/);
  assert.match(source, /fcchat-audience-menu/);
  assert.match(source, /toggleAudienceMenu\s*\(/);
  assert.match(source, /selectAudienceMode\s*\(/);
  assert.match(source, /aria-expanded/);
  assert.match(source, /仅影响下一次回答/);
});

test("fc chat panel sends current-view image context through the external photo action", () => {
  assert.match(source, /拍照/);
  assert.match(bottomDockSource, /vr-dock-photo-action/);
  assert.match(bottomDockSource, /fcchat:photo-ask/);
  assert.match(source, /buildPhotoPrompt\s*\(/);
  assert.match(source, /captureCurrentViewImage\?: \(\) => CapturedViewImage \| null/);
  assert.match(source, /const capturedView = this\.captureCurrentViewImage\?\.\(\) \?\? null/);
  assert.match(clientSource, /imageDataUrl/);
  assert.match(clientSource, /attachments/);
  assert.match(chatRuntimeSource, /captureCurrentViewImage/);
  assert.match(mainSource, /captureCurrentViewImage:\s*\(\)\s*=>\s*this\.captureViewerSnapshot\(\)/);
});

test("fc chat panel exposes external voice action with local narration and captions", () => {
  assert.match(bottomDockSource, /vr-dock-narration-action/);
  assert.match(bottomDockSource, /fcchat:smart-narration/);
  assert.match(source, /fcchat-caption-overlay/);
  assert.match(source, /playPresetNarration\s*\(/);
  assert.match(source, /buildNarrationFallbackText\s*\(/);
});

test("fc chat panel keeps learning feedback in a separate lightweight area", () => {
  assert.match(source, /学习反馈/);
  assert.match(source, /fcchat-feedback-strip/);
  assert.match(source, /行后复盘/);
  assert.match(source, /推荐回看点位/);
  assert.match(source, /提问后可复盘/);
  assert.match(source, /shouldShowFeedbackActions\s*\(/);
});

test("fc chat panel moves point prompts into reply-level followups and shuffles them", () => {
  assert.doesNotMatch(source, /fcchat-prompt-suggestions/);
  assert.match(source, /shuffleReplyPrompts\s*\(/);
  assert.match(source, /这个点位讲了什么/);
  assert.match(source, /这里体现了什么精神/);
  assert.match(source, /回顾上文/);
  assert.match(source, /重新生成/);
  assert.match(source, /换个版本/);
  assert.match(source, /createFollowupActions\s*\(/);
});

test("fc chat panel welcome state is scene-aware instead of generic", () => {
  assert.match(source, /buildWelcomeText\s*\(/);
  assert.match(source, /先点底部“拍照”看这一幕/);
  assert.match(source, /智能讲解/);
  assert.match(source, /看这处在讲什么/);
  assert.match(source, /看这处体现什么精神/);
  assert.match(source, /\.fcchat-list\.is-welcome-only\{[\s\S]*justify-content:\s*flex-start;/);
});

test("fc chat panel still exposes runtime hooks for scene changes and guarded requests", () => {
  assert.match(source, /public updateContext\s*\(/);
  assert.match(source, /sceneTurnAnchor/);
  assert.match(source, /requestInFlight/);
  assert.match(source, /historyForRequest = this\.messages\s*\.slice\(this\.sceneTurnAnchor\)/s);
});

test("fc chat panel keeps structured response cards and fallback reliability", () => {
  assert.match(source, /responseKind:\s*"review-card"/);
  assert.match(source, /responseKind:\s*"route-card"/);
  assert.match(source, /fcchat-response-card/);
  assert.match(source, /buildStructuredResponseCardBody\s*\(/);
  assert.match(source, /buildFallbackCardText\s*\(/);
  assert.match(source, /云端讲解暂不可用/);
});
