// src/services/fcChatClient.ts
// FC Chat client - robust response parsing (supports {answer} and {code,msg,data:{answer}})

export type FcChatContext = {
  museumId?: string;
  museumName?: string;
  sceneId?: string;
  sceneTitle?: string;
  url?: string;
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

  const payload: AnyObj = { question };
  if (sessionId) {
    payload.sessionId = sessionId;
    payload.conversationId = sessionId;
  }
  if (normalizedHistory.length > 0) {
    payload.history = normalizedHistory;
    payload.messages = normalizedHistory;
    // 兼容部分后端只识别 text 字段的历史格式
    payload.chatHistory = normalizedHistory.map((item) => ({
      role: item.role,
      text: item.text,
    }));
  }
  if (ctx && typeof ctx === "object") {
    payload.context = {
      museumId: ctx.museumId || "",
      museumName: ctx.museumName || "",
      sceneId: ctx.sceneId || "",
      sceneTitle: ctx.sceneTitle || "",
      url: ctx.url || "",
      sessionId: sessionId || "",
      historyLength: normalizedHistory.length,
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

  return { ok: false, msg: "bad response" };
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
        // HTTP status hint
        const msg = text ? `bad response: ${text}` : `http ${resp.status}`;
        throw new Error(msg);
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
      const detail = parsed.code ? `${parsed.msg} (code=${parsed.code})` : parsed.msg;
      throw new Error(detail || "request failed");
    } catch (e: any) {
      // AbortError
      if (e?.name === "AbortError") throw new Error(`timeout (${this.timeoutMs}ms)`);
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }
}
