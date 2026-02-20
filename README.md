# VR 全景 Web 播放器（vrplayer）

基于 Three.js 的全景 Web 播放器，支持多馆多场景、热点导航、地图导览与低清到高清渐进加载。

协作硬规则以 `AGENTS.md` 为准；本 README 只保留项目使用说明与持久化要点。
memory 写入相关请先读：`MEMORY_WRITE_FIRST.md`。

---

## 快速开始

```bash
npm install
npm run dev
```

构建产物：

```bash
npm run build
```

---

## 目录约定

- `src/**`：业务源码
- `public/**`：静态资源与唯一配置源（含 `public/config.json`）
- `dist/**`：构建产物（禁止手改）
- `docs/**`：发布目录（禁止手改，仅由 `dist -> docs` 同步生成）

---

## 配置与资源要点

- 仅编辑 `public/config.json`，不要手改 `dist/config.json` 或 `docs/config.json`。
- 场景资源建议：
  - `panoLow`：低清首屏兜底
  - `pano`：整图高清
  - `panoTiles.manifest`：分块高清（支持 KTX2/JPG）
- 大陆网络加速入口统一通过 `assetCdn`，并保持“先探测可达，再改写 URL；不可达自动回源”。

---

## 发布（唯一正确链路）

在系统 PowerShell 中执行：

```powershell
cd D:\Projects\vrplayer
git checkout main
git pull --rebase origin main
npm run build
robocopy .\dist .\docs /MIR
git add -A
git commit -m "chore: publish"
git push origin main
```

发布完成判定：

- 远端存在新 commit（与本地一致）
- Pages 已部署到该 commit

---

## 调试入口参数

在 URL 后追加参数（已有参数时用 `&`）：

- `debug=1`：开启调试模式（含拾取与调试面板）
- `editor=1`：开启可视化配置编辑器（坐标拾取、北向校准）
- `tilesDebug=1`：显示瓦片状态条
- `metrics=1`：显示加载指标

示例：

- `...?museum=wangding&scene=memorial_wall&editor=1`
- `...?museum=wangding&scene=front_yard&tilesDebug=1&metrics=1`

---

## Codex 宿主（可被插件访问）

记录时间：`2026-02-20 22:02:50`

本仓库新增了一个“宿主 MCP 服务”，用于让 Codex 插件把子任务统一委托到 AIClient Orchestrator（从而优先走 Gemini 池）。

位置：
- `tools/codex-host/server.mjs`
- `tools/codex-host/README.md`

脚本：
- `npm run host:start`
- `npm run host:selftest`

本地健康接口：
- `http://127.0.0.1:3220/health`
- `http://127.0.0.1:3220/status`
- `http://127.0.0.1:3220/recent`

重要上下文（来自本次需求）：
- Cursor 的 Codex 主会话 token 无法被外部强制切换为 Gemini。
- 可行路径是“主会话继续用 Codex + 子任务外包给宿主（再交给 Orchestrator）”。
- 宿主默认启用零参数自动分流，优先省 token。

---

## Agent Notes (Persistent)

- [2026-02-01 10:30:00] 全景方向稳定链路：`SphereGeometry.scale(-1,1,1)` + `texture.flipY = false`（低清/高清/瓦片统一）。
- [2026-02-01 10:40:00] 纯全景链路使用 `createImageBitmap(..., { imageOrientation: 'flipY' })`，避免与瓦片 UV 处理冲突。
- [2026-02-01 10:50:00] 高清瓦片加载期间必须保留低清底图可见；禁止“先清底图再贴瓦片”，避免黑屏。
- [2026-02-01 11:00:00] `TileMeshPano` 经线起点必须与整图对齐：`phiStart = col * phiLength`，不要再加 `-Math.PI` 偏移（会导致首屏相差 180°）。
- [2026-02-01 11:10:00] 预览图统一使用 `*-nail.jpg`，低清全景使用 `*-low.jpg`，避免加载错图与体积过大。
- [2026-02-01 11:20:00] 若配置/文案改了但线上仍旧，先提升 `public/sw.js` 的 `CACHE_VERSION`，再按发布链路重新发布。
- [2026-02-01 11:30:00] 大陆网络下资源失败优先检查 CDN 可达性与回源逻辑，不要先判断为渲染逻辑故障。
- [2026-02-01 11:40:00] 每次宣称“修复成立”前，至少做一次 chrome-devtools 的页面快照 + Network/Console 采样。
- [2026-02-08 23:45:00] 三馆学伴上下文修复：请求体必须携带 `sessionId + history/messages + context.historyLength`；聊天面板销毁重建后从 `localStorage` 恢复消息与会话，避免每条消息都被后端视作新会话。
- [2026-02-10 22:15:09] 首屏链路约束：`editor/debug/structure3d/north-calibration/dock-panels` 必须按需 `import()`；`chat-community` 不得首屏静态加载，改为场景可见后按策略触发。
- [2026-02-10 23:08:18] 第二轮性能收口：`TileMeshPano/KTX2Loader` 按需加载；禁止 `three-extras` 进入 `index` preload；聊天改为首交互触发；Service Worker 仅壳层预缓存，`/config.json` 保持 `network-only`。
- [2026-02-11 00:06:15] 第三轮入口解耦：`main` 禁止静态导入 `PanoViewer/vrMode/three`；列表路由不触发 `three-core`，three 仅在 scene 路由按需加载。
- [2026-02-11 19:14:08] 第四轮网络与流畅性：引入图片分通道并发调度（`tile/pano/preload/ui`），CDN 探测并行竞速并默认 `1000ms` 超时，SW 支持跨域全景缓存，输入事件改为每帧聚合应用且默认不启用自动降载。
- [2026-02-11 19:45:49] 中文乱码防回归：构建前必须先过 `npm run check:text`；禁止非 UTF-8 写回中文文案；品牌/信息/更多弹窗中文统一使用简体并在 chrome-devtools 快照复验。
- [2026-02-11 20:33:40] 生命周期与按需加载：`PanoViewer` 在 `dispose()` 必须显式停止 RAF 并解绑 DOM 输入监听；信息/更多弹窗必须走动态 import（`src/ui/modals/appModals.ts`），禁止回退到入口内联重逻辑。
- [2026-02-11 21:31:40] 第七轮收口：场景 UI 装配必须走 `SceneUiRuntime` 分层（核心/次级/观测）；聊天必须通过 `ChatRuntime` 在“社区 tab 首次点击”后按需初始化，禁止恢复全局首交互预热监听。
- [2026-02-11 21:53:13] 入口瘦身补充：`main.ts` 禁止静态依赖 `ConfigErrorPanel`、`SceneUiRuntime`、`ChatRuntime` 与 debug helper；这些模块必须按路径/条件动态加载，确保 `index` 主包保持在 65kB 以下。
- [2026-02-11 22:55:46] 交互体验约束：导览/社区/信息/更多模块在 `HIGH_READY/DEGRADED` 后必须后台预热（只导入不实例化）；“三馆学伴”头像只能在点击“社区”后出现；低清提示链路必须可见（`LOADING_LOW/LOW_READY` 不可被瞬时吞没）。
- [2026-02-13 16:22:14] 用户网络环境关键约束（大陆 + Karing VPN）：OpenCode 使用 `ChatGPT Pro/Plus (browser)` 登录时，若 `Karing` 未开启 `TUN`，会出现“浏览器授权成功但 OpenCode 端 token exchange 失败（常见 403）”；开启 `TUN` 并授予系统代理权限后可稳定登录。后续凡遇 OpenCode/ChatGPT/Codex 相关认证或网络异常，优先按“`TUN` 状态 + 本地回调/代理链路”排查。
- [2026-02-18 22:15:43] 自动化制作旅行视频时，`Pixabay/Pexels` 直链在命令行常出现 `403`；需要稳定批量拉取时优先用 `Wikimedia/Wikipedia API` 获取可下载素材，再本地离线渲染，避免导出阶段因远程资源失败中断。
- [2026-02-19 00:05:00] Memory “写不进去”首要根因通常不是“没读文档”，而是鉴权不完整（`insufficient_scope` / 未带可写权限）。固定写法：`POST http://127.0.0.1:8000/api/memories` + 请求头 `Authorization: Bearer $env:MCP_API_KEY` + `Content-Type: application/json; charset=utf-8`，并在写入前执行 `chcp 65001` 与 `$env:PYTHONUTF8=1`。每次会话先查 `/api/health/detailed` 确认 `database_path` 后再写。
- [2026-02-20 13:35:00] Memory 中文防乱码最终规则：禁止 PowerShell 直接字符串 `-Body` 写 `/api/memories`；统一使用 `python scripts/memory_write_safe.py --content-b64 ... --verify-roundtrip`（脚本内部 `ensure_ascii=True`，请求体全 ASCII，服务端解码后回读校验完全一致）。会话前必须跑 `python scripts/memory_selftest_utf8.py`。
- [2026-02-20 13:36:30] 终端/插件通道可能在“进入进程前”把内联中文参数替换为 `?`；因此写 Memory 时不要把中文直接拼进命令行，必须先转 `UTF-8 bytes -> Base64` 再传 `--content-b64`。
- [2026-02-20 21:10:00] 三馆学伴会话记忆兼容修复：`fcChat` 请求体历史项同时携带 `content + text`，并补充 `chatHistory`（`role + text`）以兼容后端不同解析口径；聊天错误文案统一为 `请求失败：<msg>`，避免模板串显示异常。
- [2026-02-20 21:37:52] 三馆学伴事实回忆兜底：当用户追问“我今天干了什么/我刚才说了什么”时，前端必须先从本地会话历史直接回忆回复（`FcChatPanel` 本地分支），不要完全依赖后端 history 解析，避免再次出现“姓名可记住但事实失忆”。
- [2026-02-20 22:06:55] 三馆学伴记忆策略升级：禁止只做固定关键词问法匹配；回忆分支必须基于“历史消息语义打分（token overlap + 主语命中 + 近因权重）”选取候选句，确保“姥姥干了家务 -> 姥姥干了啥”这类改写问法也能命中同一会话记忆。
- [2026-02-20 22:04:20] 新增 Codex 宿主 `tools/codex-host/server.mjs`：用于把 Codex 插件子任务转发到 AIClient Orchestrator。关键边界：Codex 主会话 token 不能外部强制改 Gemini；省 token 方案是“主会话保留 + 子任务外包 Gemini 优先分流”。

---

## 会话复盘（OpenCode 登录坑）

记录时间：`2026-02-13 21:43:17`

本段用于沉淀一次完整排障过程，便于后续快速复用。

### 1) 问题现象（用户侧）

- `2026-02-13 15:xx:xx`：在 OpenCode 选择 `ChatGPT Pro/Plus (browser)` 登录。
- 浏览器回调页显示 `Authorization Successful`，地址形如 `http://localhost:1455/auth/callback?...`。
- OpenCode 客户端同时报错：`Token exchange failed: 403 at exchangeCodeForTokens`。
- 结论：不是“浏览器未登录”，而是“客户端拿到 code 后换 token 失败”。

### 2) 关键环境事实（必须长期记忆）

- 用户网络环境：大陆网络 + `Karing` VPN。
- 默认状态：`Karing` 未开启 `TUN`。
- 触发条件：未开 `TUN` 时，浏览器流程可成功，但 OpenCode 端 token 交换高概率失败（403）。
- 修复条件：开启 `TUN` 并完成权限授权后，OpenCode `browser` 登录成功。

### 3) 根因归纳（结合本次证据）

- OAuth 是两段链路：
- A 段：浏览器与 OpenAI 授权站点交互（可成功）。
- B 段：OpenCode 本地进程与 token 端点交互（失败点）。
- 未开 `TUN` 时，A 段可通不代表 B 段可通，导致“网页成功 + 客户端失败”的表象分裂。
- 本次环境下，`TUN` 打通了 OpenCode 进程的实际网络路径后，B 段恢复正常。

### 4) 固化后的成功 SOP（OpenCode + ChatGPT 登录）

1. 启动 `Karing`，先授权系统代理权限。
2. 打开 `TUN` 模式并确认生效。
3. 打开 OpenCode，选择 `ChatGPT Pro/Plus (browser)`。
4. 在浏览器完成工作区选择与授权。
5. 返回 OpenCode 确认已登录。

### 5) 失败时的第一排查顺序（按优先级）

1. 先查 `Karing TUN` 是否开启且权限有效。
2. 再查 localhost 回调链路（`localhost:1455`）是否被代理/安全软件干扰。
3. 再查 OpenCode 版本与插件缓存是否过旧。
4. 最后再看账号权限或工作区选择。

### 6) 可复用范围（不仅限 OpenCode）

- 同类报错关键词：`token exchange failed`、`403 forbidden`、`browser success but client failed`。
- 可迁移到：Codex CLI / IDE 插件 / 其他本地应用 OAuth 回调场景。
- 统一策略：优先判断“浏览器链路”和“本地进程链路”是否在同一代理路径。

### 7) 本次会话产出（文档化结果）

- 已在 `Agent Notes (Persistent)` 增加长期规则：`2026-02-13 16:22:14` 条目。
- 已在本节保留完整复盘，供后续排障直接复用。
