export type FcChatSuccess = {
  answer: string;
  model?: string;
};

export type FcChatUnauthorized = {
  code: number; // e.g. 40101
  msg: string;  // "unauthorized"
  data?: any;
};

export type FcChatAny = FcChatSuccess | FcChatUnauthorized | any;

export type FcChatClientOptions = {
  endpoint: string;          // 例如 https://chat-fachfrmdcz.cn-hangzhou.fcapp.run/
  authToken?: string;        // 可选：如果你后端需要鉴权（你截图里出现 unauthorized 就用这个）
  timeoutMs?: number;        // 默认 15000
};

function withTimeout<T>(p: Promise<T>, ms: number, label = "timeout") {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(label)), ms);
    p.then((v) => { clearTimeout(t); resolve(v); })
     .catch((e) => { clearTimeout(t); reject(e); });
  });
}

function normalizeEndpoint(url: string) {
  // 保证末尾有 /
  if (!url) return "";
  return url.endsWith("/") ? url : url + "/";
}

export function createFcChatClient(opts: FcChatClientOptions) {
  const endpoint = normalizeEndpoint(opts.endpoint);
  const timeoutMs = typeof opts.timeoutMs === "number" ? opts.timeoutMs : 15000;

  async function ask(question: string, extra?: Record<string, any>): Promise<FcChatSuccess> {
    if (!endpoint) throw new Error("FC chat endpoint not set");
    const q = (question ?? "").trim();
    if (!q) throw new Error("empty question");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      // 不要加任何 Access-Control-Allow-*（那是响应头，不是请求头）
    };

    // 可选鉴权（如果后端要求）
    if (opts.authToken && String(opts.authToken).trim()) {
      headers["Authorization"] = `Bearer ${String(opts.authToken).trim()}`;
    }

    const body = JSON.stringify({
      question: q,
      ...((extra && typeof extra === "object") ? extra : {}),
    });

    const res = await withTimeout(
      fetch(endpoint, {
        method: "POST",
        mode: "cors",
        headers,
        body,
      }),
      timeoutMs
    );

    // 先读 text，再尝试 json（避免一些网关返回非 JSON 导致直接 throw）
    const text = await res.text();
    let data: any = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    // 你现在后端会返回 statusCode=200 + body里有 {"code":40101,...} 这种
    // 这里统一识别并抛出可读错误
    if (data && typeof data === "object" && typeof data.code === "number" && data.code === 40101) {
      throw new Error(`unauthorized (code=${data.code})`);
    }

    // 也可能直接是 {answer:"..."}
    const answer = data?.answer;
    if (typeof answer === "string" && answer.trim()) {
      return { answer: answer.trim(), model: data?.model };
    }

    // 有些实现可能返回 { body:"{...}" }
    if (data?.body && typeof data.body === "string") {
      try {
        const inner = JSON.parse(data.body);
        const a2 = inner?.answer;
        if (typeof a2 === "string" && a2.trim()) return { answer: a2.trim(), model: inner?.model };
        if (inner?.code === 40101) throw new Error(`unauthorized (code=${inner.code})`);
      } catch {}
    }

    // HTTP 层非 2xx 也给出信息
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${typeof data === "string" ? data : JSON.stringify(data)}`);
    }

    throw new Error(`bad response: ${typeof data === "string" ? data : JSON.stringify(data)}`);
  }

  return { ask };
}

