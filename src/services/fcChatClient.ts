// src/services/fcChatClient.ts
// FC Chat client - robust response parsing (supports {answer} and {code,msg,data:{answer}})

export type FcChatContext = {
  museumId?: string;
  museumName?: string;
  sceneId?: string;
  sceneTitle?: string;
  url?: string;
  userMemory?: string[];
  lastUserUtterance?: string;
  lastAssistantReply?: string;
  recentTurns?: FcChatHistoryItem[];
};

export type FcChatHistoryItem = {
  role: "user" | "assistant";
  text: string;
};

export type FcChatConfig = {
  endpoint: string;      // e.g. https://xxx.fcapp.run/
  authToken?: string;    // optional
  timeoutMs?: number;    // optional, default 15000
};

type AnyObj = Record<string, any>;
const MAX_CONTEXT_TURN_CHARS = 1600;
const MAX_CONTEXT_LAST_USER_CHARS = 800;
const MAX_CONTEXT_LAST_ASSISTANT_CHARS = 3200;
const MAX_CONTEXT_HISTORY_ITEMS = 20;

function safeJsonParse(text: string): any | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function pickString(x: any): string {
  return typeof x === "string" ? x : "";
}

function normalizeEndpoint(endpoint: string): string {
  // keep trailing slash behavior consistent
  return endpoint.endsWith("/") ? endpoint : endpoint + "/";
}

function normalizeComparableText(text: string): string {
  return (text || "").replace(/\s+/g, "").trim();
}

function buildPayload(
  question: string,
  ctx?: FcChatContext,
  history: FcChatHistoryItem[] = [],
  sessionId = ""
): AnyObj {
  const normalizedHistory = history
    .map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: typeof item.text === "string" ? item.text.trim() : "",
      text: typeof item.text === "string" ? item.text.trim() : "",
    }))
    .filter((item) => !!item.content);

  const normalizedQuestionForCompare = normalizeComparableText(question);
  const normalizedMemory = Array.isArray(ctx?.userMemory)
    ? ctx.userMemory
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter((item) => !!item)
        .filter((item) => normalizeComparableText(item) !== normalizedQuestionForCompare)
        .slice(-30)
    : [];

  const clipText = (text: string, max: number): string => {
    const trimmed = text.trim();
    if (trimmed.length <= max) return trimmed;
    return `${trimmed.slice(0, max)}...`;
  };

  let previousUserUtterance = "";
  let skippedCurrentUserQuestion = false;
  for (let i = normalizedHistory.length - 1; i >= 0; i--) {
    const item = normalizedHistory[i];
    if (item.role !== "user" || !item.text) continue;
    const comparable = normalizeComparableText(item.text);
    if (!skippedCurrentUserQuestion && comparable === normalizedQuestionForCompare) {
      skippedCurrentUserQuestion = true;
      continue;
    }
    previousUserUtterance = item.text;
    break;
  }

  let previousAssistantReply = "";
  for (let i = normalizedHistory.length - 1; i >= 0; i--) {
    const item = normalizedHistory[i];
    if (item.role === "assistant" && item.text) {
      previousAssistantReply = item.text;
      break;
    }
  }

  const recentTurns = normalizedHistory
    .slice(-8)
    .map((item) => ({
      role: item.role,
      text: clipText(item.text, MAX_CONTEXT_TURN_CHARS),
      content: clipText(item.text, MAX_CONTEXT_TURN_CHARS),
    }));

  const contextHistory = normalizedHistory
    .slice(-MAX_CONTEXT_HISTORY_ITEMS)
    .map((item) => ({
      role: item.role,
      text: clipText(item.text, MAX_CONTEXT_TURN_CHARS),
      content: clipText(item.text, MAX_CONTEXT_TURN_CHARS),
    }));

  const payload: AnyObj = { question, rawQuestion: question };
  if (sessionId) {
    payload.sessionId = sessionId;
    payload.conversationId = sessionId;
  }
  if (normalizedHistory.length > 0) {
    payload.history = normalizedHistory;
    payload.messages = normalizedHistory;
    // Keep a text-only history shape for backends that only read `text`.
    payload.chatHistory = normalizedHistory.map((item) => ({
      role: item.role,
      text: item.text,
    }));
  }
  if (ctx && typeof ctx === "object") {
    const contextRecentTurns = Array.isArray(ctx.recentTurns) ? ctx.recentTurns : [];
    payload.context = {
      museumId: ctx.museumId || "",
      museumName: ctx.museumName || "",
      sceneId: ctx.sceneId || "",
      sceneTitle: ctx.sceneTitle || "",
      url: ctx.url || "",
      sessionId: sessionId || "",
      historyLength: normalizedHistory.length,
      userMemory: normalizedMemory,
      userMemoryLength: normalizedMemory.length,
      lastUserUtterance:
        (ctx?.lastUserUtterance || previousUserUtterance)
          ? clipText(ctx?.lastUserUtterance || previousUserUtterance, MAX_CONTEXT_LAST_USER_CHARS)
          : "",
      lastAssistantReply:
        (ctx?.lastAssistantReply || previousAssistantReply)
          ? clipText(ctx?.lastAssistantReply || previousAssistantReply, MAX_CONTEXT_LAST_ASSISTANT_CHARS)
          : "",
      recentTurns:
        contextRecentTurns.length > 0
          ? contextRecentTurns.slice(-8).map((item) => ({
              role: item.role === "assistant" ? "assistant" : "user",
              text: clipText(typeof item.text === "string" ? item.text : "", MAX_CONTEXT_TURN_CHARS),
              content: clipText(typeof item.text === "string" ? item.text : "", MAX_CONTEXT_TURN_CHARS),
            }))
          : recentTurns,
      history: contextHistory,
      messages: contextHistory,
      chatHistory: contextHistory.map((item) => ({
        role: item.role,
        text: item.text,
      })),
    };
  }
  return payload;
}

// Accept these response shapes:
//
// A) { answer: "..." , model?: "..." }
// B) { code: 0, msg: "ok", data: { answer: "...", model?: "..." } }
// C) { code: 40101, msg: "unauthorized", data?: null }
// D) other => error
function extractAnswerOrError(json: any): { ok: true; answer: string; model?: string } | { ok: false; code?: number; msg: string } {
  // A) direct answer
  if (json && typeof json === "object" && typeof json.answer === "string" && json.answer.trim()) {
    return { ok: true, answer: json.answer.trim(), model: pickString(json.model) || undefined };
  }

  // B/C) envelope
  if (json && typeof json === "object" && ("code" in json || "msg" in json || "data" in json)) {
    const code = typeof json.code === "number" ? json.code : undefined;
    const msg = pickString(json.msg) || "";

    // B) success envelope
    const data = json.data;
    if ((code === 0 || code === undefined) && data && typeof data === "object") {
      const ans = typeof data.answer === "string" ? data.answer.trim() : "";
      if (ans) return { ok: true, answer: ans, model: pickString(data.model) || undefined };
    }

    // C) unauthorized or other business error
    if (code === 40101 || msg.toLowerCase() === "unauthorized") {
      return { ok: false, code: 40101, msg: "unauthorized" };
    }

    // other business error
    if (code !== undefined && code !== 0) {
      return { ok: false, code, msg: msg || `error code=${code}` };
    }
    if (msg && msg.toLowerCase() !== "ok") {
      return { ok: false, code, msg };
    }
  }

  return { ok: false, msg: "服务返回异常数据" };
}

export class FcChatClient {
  private endpoint: string;
  private authToken: string;
  private timeoutMs: number;

  constructor(cfg: FcChatConfig) {
    if (!cfg?.endpoint) throw new Error("fcChat endpoint is empty");
    this.endpoint = normalizeEndpoint(cfg.endpoint);
    this.authToken = cfg.authToken || "";
    this.timeoutMs = typeof cfg.timeoutMs === "number" && cfg.timeoutMs > 0 ? cfg.timeoutMs : 15000;
  }

  async ask(
    question: string,
    ctx?: FcChatContext,
    history: FcChatHistoryItem[] = [],
    sessionId = ""
  ): Promise<{ answer: string; model?: string }> {
    const q = (question || "").trim();
    if (!q) throw new Error("empty question");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // If you later enable trigger auth, keep this:
      // - many gateways accept "Authorization: Bearer <token>"
      // - if not, you can also add "x-fc-authorization" etc. (but only when needed)
      if (this.authToken) {
        headers["Authorization"] = this.authToken.startsWith("Bearer ") ? this.authToken : `Bearer ${this.authToken}`;
      }

      const resp = await fetch(this.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(buildPayload(q, ctx, history, sessionId)),
        signal: controller.signal,
      });

      const text = await resp.text();
      const json = safeJsonParse(text);

      // If server returns non-JSON, treat as error text
      if (!json) {
        if (!resp.ok) {
          throw new Error(`服务暂不可用（HTTP ${resp.status}）`);
        }
        throw new Error("服务返回异常数据");
      }

      const parsed = extractAnswerOrError(json);

      if (parsed.ok) {
        return { answer: parsed.answer, model: parsed.model };
      }

      // business unauthorized
      if (parsed.code === 40101) {
        const e: any = new Error("unauthorized (code=40101)");
        e.code = 40101;
        throw e;
      }

      // other business errors
      const detailRaw = parsed.code ? `${parsed.msg} (code=${parsed.code})` : parsed.msg;
      const detail = detailRaw && detailRaw.toLowerCase().includes("bad response")
        ? "服务返回异常数据"
        : detailRaw;
      throw new Error(detail || "请求失败");
    } catch (e: any) {
      // AbortError
      if (e?.name === "AbortError") throw new Error(`timeout (${this.timeoutMs}ms)`);
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }
}

