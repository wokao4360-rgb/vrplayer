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
- 推到 `main` 后，GitHub Actions `Deploy Cloudflare Pages` 会自动把当前提交里的 `docs/` 发布到 Cloudflare Pages

Cloudflare 自动部署前置项：

- GitHub Secret：`CLOUDFLARE_API_TOKEN`
- GitHub Secret：`CLOUDFLARE_ACCOUNT_ID`
- GitHub Variable：`CLOUDFLARE_PAGES_PROJECT_NAME`

注意：

- 自动部署 Cloudflare 不会替代本地发布源链；仍然必须先执行 `npm run build -> robocopy .\dist .\docs /MIR -> git push origin main`
- GitHub Action 部署的是仓库里已经提交的 `docs/`，不是未提交的本地 `dist/`
- `main` 会发布到生产环境；`codex/**` 分支会发布到同名 Cloudflare Pages preview 分支，便于用当前开发分支的 `pages.dev` 预览做验收

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
- `npm run host:team -- --task "<任务文本>"`

本地健康接口：
- `http://127.0.0.1:3220/health`
- `http://127.0.0.1:3220/status`
- `http://127.0.0.1:3220/recent`

新增能力：
- `host_team_execute`：主 Agent 自动拆解任务 -> 子任务并发执行 -> 自动汇总结果。

重要上下文（来自本次需求）：
- Cursor 的 Codex 主会话 token 无法被外部强制切换为 Gemini。
- 可行路径是“主会话继续用 Codex + 子任务外包给宿主（再交给 Orchestrator）”。
- 宿主默认启用零参数自动分流，优先省 token。

---

## Agent Notes (Persistent)

- [2026-03-23 10:25:00] `MuseumShellChrome` 的 transition progress 文案不能再有默认值，也不能在未激活时把“低清预览已就绪 / 正在恢复清晰 / 正在准备下一段漫游画面”这类字符串常驻在 DOM。当前安全基线是：`progressLabel` 只有显式传入时才渲染；未传时 `transitionProgress.hidden = true` 且 `textContent=''`。
- [2026-03-23 10:25:00] Cloudflare Pages workflow 现已区分生产与 preview：`push main` 部署生产，`push codex/**` 部署同名 preview 分支，`pages deploy docs --branch=${github.ref_name}`。以后用户若拿 `pages.dev` 预览验收，先确认该预览域名对应的分支和 bundle，而不是默认它会跟随本地分支自动更新。
- [2026-03-22 19:35:00] 同馆 `scene` 切点的高级转场主链已恢复为 `requestSceneEntry -> showScene(viewer transition) -> SceneTransitionController -> TravelTransitionOverlay`。即使 `resolveMuseumSceneRuntimePlan().transitionDriver === 'viewer'`，也不能再退回成只有 `sceneMotion` / `allowPendingBlack` 的裸切路径。当前安全基线是：同馆 `fromImage` 优先取当前 viewer snapshot 而不是上一场景整张 preview，且 `.vr-travel-transition.is-active` 必须保持 `pointer-events:none`，保证转场期间用户拖动不会被 overlay 吃掉。
- [2026-03-22 21:45:00] `TravelTransitionOverlay` 不能只依赖 `.is-active` 的 CSS 类来显隐；同馆高级转场里必须由 `start()/render()/hide()` 显式写入 `visibility/opacity/pointer-events`，否则会出现 transition session 已 active 但 overlay 仍停在 `opacity:0/visibility:hidden`、用户体感为“完全没有动画”的退化。
- [2026-03-22 17:10:41] Cloudflare 现已补齐“push main 后自动部署”这条 CI 线：GitHub Actions `Deploy Cloudflare Pages` 会直接把当前提交里的 `docs/` 发布到 `CLOUDFLARE_PAGES_PROJECT_NAME`。这条自动化只接管 Cloudflare 部署，不会替代 `build -> dist -> docs` 源链；以后若线上还是旧版本，先查本次 push 里的 `docs/**` 是否已同步，再查 Actions 里的 Cloudflare deploy job。
- [2026-03-22 11:48:00] `Loading` 组件的隐藏态现已要求“DOM 也无文案残留”：`Loading.show()` 才允许注入 `<p class="loading-text">加载中...</p>`，`hide()` 必须清空 overlay 子节点，不能只靠 `opacity:0` 留一份隐藏文字在 DOM。后续若自动化用 `body.innerText`/可访问树仍扫到“加载中...”，先回查 [src/ui/Loading.ts](/D:/Projects/vrplayer/src/ui/Loading.ts) 是否又退回成常驻 innerHTML。
- [2026-03-22 11:36:00] 同馆 `scene` 切点现已收口为 `viewer` 主导：`resolveMuseumSceneRuntimePlan().transitionDriver === 'viewer'` 时，`showScene()` 不允许再调用 `MuseumShellChrome.startSceneTransition()`，而是走“pre-commit 相机 motion -> hard commit -> settle”。`PanoViewer.loadScene(..., { allowPendingBlack: true, silentFallback: true })` 是这条链路的固定兜底，目标 low/high 未 ready 时只能露 renderer 黑底，不允许再把旧场景截图、cover、模糊 pano 或 shell 文案接回主视觉。点击后若用户先拖动，必须立即 commit 目标 scene 并取消剩余脚本 motion，不能继续锁交互等 ready。
- [2026-03-16 16:42:00] 单馆漫游壳层现已锁定为“`?museum=<id>` 先出馆级 cover gate，点击 CTA 后再进入 scene；同馆 `scene` 切换只做 shallow route，不允许销毁 `PanoViewer` 根实例”。当前稳定链路是：`resolveMuseumShellRoute -> cover gate / scene`，`resolveMuseumSceneRuntimePlan -> mount-shell / reuse-shell`，`App.clearView({ preserveViewerShell, preserveMuseumShell })` 决定是否保留 viewer 与转场层。后续若馆内切点 снова出现黑屏、整页跳页感或返回键直接离馆，先查这里，不要再回到“scene 路由一律 clearView + 重建 viewer”的旧实现。
- [2026-03-16 16:42:00] 馆内转场与路由同步现已收口为：点击 CTA/点位后立即显示 `MuseumShellChrome` 的模糊玻璃过渡层，转场层必须拦截 pointer，直到目标场景达到 `LOW_READY/HIGH_READY/DEGRADED` 再收束；相机视角变化只允许 `replaceState` 更新 `yaw/pitch/fov`，不得再用 `pushState` 污染返回栈。`src/utils/urlBuilder.ts` 也已改为保留 `tilesDebug/debug/fresh` 等非路由参数，后续不要再用“清空所有 query 后重建 URL”的方式破坏调试态。
- [2026-03-16 14:06:20] `src/app/museumShellState.ts` 现已成为 museum shell 路由与同馆切景策略的单一状态层；后续不要再把 cover gate 判定、preview 预热、同馆 shell/view 复用逻辑散落回 `main.ts`。另一个稳定坑点是：凡是要被 `node --test` 直接执行的 `.ts` 状态模块，其 value import 必须写显式 `.ts` 扩展名；否则 Vite 构建能过，但 Node ESM 测试会在运行时 `ERR_MODULE_NOT_FOUND`。
- [2026-03-16 13:56:27] 单馆入口路由现已锁定为“先馆级 cover gate、后进场景”。`?museum=<id>` 不再自动跳首个 scene；首次 deep link `?museum=<id>&scene=<id>` 也必须先显示该馆 cover gate，再由 CTA 进入目标 scene。后续若再改 museum 路由，不要回到“museum 路由一进来就重定向 entry scene”的旧口径。
- [2026-03-16 13:56:27] 同馆 scene 切换现已锁定为“复用同一 viewer shell/canvas”。`App.handleRoute()` 对同馆 scene 变化不能再无条件 `clearView()` 销毁 `PanoViewer`；当前稳定规则是：同馆且 URL 未显式带 `yaw/pitch/fov` 时复用 shell 并保留当前视角，同馆但显式带相机参数时仍复用 shell 但重置到目标视角。跨馆切换才允许重新 mount viewer shell。
- [2026-03-16 11:19:15] Windows 下 `playwright MCP` 若用默认持久化 profile `C:\Users\Lenovo\AppData\Local\ms-playwright\mcp-chrome`，残留 `chrome.exe` 会把后续 `browserType.launchPersistentContext` 顶成“浏览器已在现有会话中打开”，表现为 MCP 启动秒退。当前安全基线是：`C:\Users\Lenovo\.codex\config.toml` 的 `[mcp_servers.playwright]` 必须启用 `--isolated`，避免复用落盘 profile；若已卡死，先清掉命令行里带 `mcp-chrome` 的 Chrome 进程，再重启 Codex。
- [2026-03-16 09:09:38] `turn-prompt-clean` 现已进入 turn 级 authoritative drill-down：`runtime truth` 的 `objectEvidence.turn-prompt-clean` 会稳定输出 `promptTurnDrilldown`，并显式携带 `agentId / sessionId / transcriptPath / latestPromptErrorTimestamp / latestPromptErrorModel / latestPromptErrorMessage / lastUser / lastAssistant / lastSuccessAge`。live supervision 的 `Focused Inspection` 也已前台化 `Prompt Drift Turn Drilldown` 表；后续排查 prompt drift 时，优先消费这层 turn 级证据，不再只看 agent 摘要或 prompt error samples。
- [2026-03-15 11:10:00] `cubemap-tiles` 的 2x2 AVIF face 若直接按整块 `drawImage` 无重叠贴进 Canvas atlas，前后两个面的中心十字缝会暴露独立编码边界，表现为“首屏正前方/正后方图片拼接错误”。当前安全基线是：`CubeCanvasPano` 的高层 tile 绘制必须对内部边界做 `1px` atlas bleed（仅内边扩张，不得越出 face canvas）。
- [2026-03-15 15:13:58] `D:\Projects\vrplayer\scripts\openclaw_supervision_server.py` 的后台动作完成后，server 端必须主动 fresh 刷新 authoritative truth，不能默认把 stale snapshot 留给 `/api/action-status`。当前稳定逻辑已收口为：优先 `build_snapshot(refresh=True)`；只有 fresh 失败时才回退旧 snapshot，并显式标记 `needsRefresh=true`。
- [2026-03-15 15:13:58] live dashboard 的 `Action Output` 现已固定为 compact supervision summary，不再直接 dump 完整嵌套 snapshot JSON。稳定展示面当前只保留：`ok/running/action/status/startedAt/finishedAt/needsRefresh/error/result`，外加精简后的 `snapshot.generatedAt/checks/alert titles/recommended action ids`；后续若页面再次被大段原始状态 JSON 淹没，优先回查前端 `renderActionState()` 是否回退成 raw payload 输出。
- [2026-03-15 21:20:00] `linzexu/south_gate` 的产品约束锁定为 `cubemap-tiles`：请求预算必须是 `6` 张 `512x512` low face + `24` 张 `1024x1024` high tile。若首屏出现“中心先浮一块高清方形”，不要再切回 `equirect-tiles`；正确修法是保持 low face 持续可见，把 high tile 先画到暂存层，待 `24` 张全部 ready 后再一次性切换。
- [2026-03-14 19:22:13] `main / telegram-fast -> ops-exec` 的重执行委派链现已进一步收口：`C:\Users\Lenovo\.openclaw\bin\oc-ops-exec.py` 现在同时接受 `--prompt`、`--prompt-file` 和位置参数回退，因此即使前台首跳把任务写成 `oc-ops-exec.cmd "..."`，也不会再因为缺少 `--prompt` 先失败一轮。最新 fresh 验证已再次成立：`telegram-fast` 直接委派 `打开 https://example.com 并只回复一行，格式 title=<标题>`，返回 `title=Example Domain`，耗时约 `15.1s`。
- [2026-03-14 18:44:45] `D:\Projects\灵感包\入口脚本\build_rag_corpus.py` 里曾同时生成两套 RAG 检索顺序：`README` 旧口径是 `source_catalog -> sentence -> chunk -> tag_index -> source_path`，而 `handoff_prompt / retrieval_recipes` 口径是 `tag_index -> source_catalog -> chunk -> sentence -> source_path`。当前已修正生成源并重建产物；以后 RAG 运行时统一以 `tag_index -> source_catalog -> chunk -> sentence -> source_path` 为准，概览层与运行 SOP 不再分裂。
- [2026-03-14 16:55:47] 若 `openclaw status --deep` 里出现 `Node service = Scheduled Task installed · missing/unknown` 或 `Scheduled Task not installed`，不要先判 nodes 主链故障。当前节点真相源已收口为 `openclaw nodes status --json` 的 `connected` 字段：本轮已先通过 `openclaw node uninstall` 清掉历史官方 node-service 残留，再复验 `nodes status --json` 仍保持 `connected=true`。也就是说，Windows 当前稳定节点主链是“用户态 node host + Startup 自启 + `oc-runtime-heal.ps1` 恢复”，不是官方 Scheduled Task node service。
- [2026-03-14 16:35:00] `telegram-fast` 的 direct CLI `--json` 直调已恢复稳定：fresh `openclaw agent --agent telegram-fast --session-id <guid> --message "只回答当前运行模型ID。" --json` 当前可在约 `2.6s` 内稳定返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`，`status --deep` 的活会话模型也已重新对齐为 `gemini-3-flash-preview`。此前“直调可能超时/不回包”的判断应降级为历史现象，不再作为当前活跃阻塞项。
- [2026-03-14 16:35:00] `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` 现已扩展为 runtime + hygiene 一体化恢复入口：除 `gateway/browser/nodes` 恢复外，还会把 `C:\Users\Lenovo\.openclaw\agents\main\agent` 下早于当前 `models.json` 的 `models.json.*.tmp` 残留自动归档到时间戳目录（如 `tmp-archive-20260314-163609`），并返回 `archivedMainModelTmpCount / mainModelTmpArchiveDir / mainModelTmpCountAfter`。最新一次真回放已归档 `61` 个旧 `.tmp`，愈合后 fresh `main` 调用恢复到约 `2.5s` 且 `.tmp` 数量保持 `0`。
- [2026-03-14 16:23:45] `main -> ops-exec` 已完成 fresh direct JSON 验证：`Use ops-exec to open https://example.com and answer with the page title only.` 当前可稳定返回 `Example Domain`，且 `main` fresh `systemPromptReport.tools.entries` 仍只收口为 `exec / process / session_status`。`telegram-fast` 的运行时委派链也已在 fresh session transcript `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\e57207c1-ab08-4556-aaef-7f2b002c47ab.jsonl` 中实锤为 `oc-ops-exec.cmd --prompt ... -> Example Domain -> [[reply_to_current]] Example Domain`。本条里的“包装层剩余断点”仅代表当时快照，后续已由 `2026-03-14 16:35:00` 的 runtime heal 与 fresh 回放收口。
- [2026-03-14 14:15:40] `telegram-fast` 的 fresh 运行态现已实锤为最小前台：`systemPromptReport.tools.entries` 只剩 `exec / process / session_status`，默认不再暴露 `subagents`。后续若 `status --deep` 与 fresh self-check 冲突，优先以 fresh `openclaw agent --agent ... --json` 的 `agentMeta.model` 与 `systemPromptReport.tools.entries` 为实时真值，不以旧会话状态为准。
- [2026-03-14 14:15:40] browser / nodes 的当前真实问题不是配置坏，而是 runtime availability 会掉回未激活态。正式恢复入口现已固定为 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1`（或 `oc-runtime-heal.cmd`）：先校验 Gateway，再启动 browser，再调用 `C:\Users\Lenovo\.openclaw\start-node-host.ps1`，最后输出状态 JSON。该入口已完成一次真回放，返回 `gatewayOk=true / browserRunning=true / browserCdpReady=true / connectedNodeCount=1 / nodeHostCount=1`。以后断网、Gateway 重启或运行面波动后，优先走这条入口，不再手工回忆多步 SOP。
- [2026-03-14 14:02:49] 新增 primary `6qU71R2VmKk / mgq3Jua03KQ` 已把当前 OpenClaw 架构选型规则继续钉实：先问控制度、问题复杂度、资源约束、专业深度；默认先单体+Skills / workflow，只有在极度开放探索、明确领域冲突、或真实并行收益成立时才升级多 agent。`Sequential` 解决可控性/审计，`Parallel` 解决独立任务的速度或多视角置信度，`Evaluator-Optimizer` 只在质量标准明确且值得迭代打磨时启用。
- [2026-03-14 12:18:10] Windows node host 当前已从“只能临时前台拉起”升级为“有稳定用户态启动入口”。真实恢复链是：先用 `C:\Users\Lenovo\.openclaw\start-node-host.ps1` 防重启动，再由 `C:\Users\Lenovo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\start-openclaw-node.cmd` 接入登录自启。实测已完成一次“停掉全部 node host -> `connected=false` -> 运行 Startup 入口 -> `connected=true`”回放，且最终只保留单实例宿主。`openclaw node install` 仍会因 `schtasks create failed: 拒绝访问` 失败，但这已不再阻塞 nodes 主链恢复。
- [2026-03-13 21:27:34] OpenClaw 当前已正式分成三层：`telegram-fast` = 轻前台接单/路由，`main` = 后台总管与 review/compaction/计划收口位，`ops-exec` = 高权限浏览器 / 桌面 / RPA / Codex 执行位。当前最稳定的重执行真相链不是假定模型原生必然暴露 `browser/nodes`，而是 `ops-exec` 通过 `exec` 调官方 CLI：`openclaw browser start/open/tabs/snapshot`。截至本轮，browser 已 `running=true / cdpReady=true` 且能取回 `https://example.com/` 页面快照；nodes 仍是 `paired=true / connected=false`。
- [2026-03-13 21:27:34] Windows node 当前的真实断点不在 OpenClaw 配置，而在宿主常驻链路：`openclaw node install` 在当前权限下会因 `schtasks create failed: 拒绝访问` 失败；`openclaw node status` 虽提示 `openclaw node start`，但该子命令当前并不存在。后续若要恢复节点，先按“计划任务权限 / 显式前台常驻”排查，不要把它误判成模型或 agent 工具面问题。
- [2026-03-12 09:27:47] Windows 下若用脚本重写 `public/config.json` 且内容含中文，不能只看“UTF-8 编码检查通过”；中文被直接写成 `?` 仍会通过编码门禁。改完配置后必须额外抽查关键中文字段（如馆名、场景名）在源码文件与线上 `/config.json` 中都保持原文。
- [2026-03-12 20:32:00] 自定义平面图拓扑现在以 `museum.map.nodes / museum.map.paths` 为单一事实源；一旦某馆配置了这套结构，`StructureView2D`、`MapPanel`、旧 `MapOverlay` 与 `sceneGraph` 兜底拓扑都必须优先读取它，不能再各自从 `scene.mapPoint` 私下重建第二套点位关系。`scene.mapPoint` 只保留给旧馆兼容和无 floorplan museum 的回退。
- [2026-03-12 08:31:01] 若 `C:\\Users\\Lenovo\\.openclaw\\agents\\main\\agent` 下出现 `models.json.*.tmp` 堆积并伴随历史 `EPERM rename` 告警，不要先判成活故障。固定排查顺序是：先记录 fresh `openclaw agent --agent main` 前后的 `.tmp` 数量；若调用连续成功且数量不增长，就把这些 `.tmp` 归档到时间戳目录（如 `tmp-archive-*`）而不是直接删除，再次 fresh 调用确认 `.tmp` 仍为 `0`。当前已验证这类残留更像目录写入 hygiene，不再阻塞 `main` 的 Gemini 主链运行。
- [2026-03-12 08:19:51] 当前 OpenClaw 模型基线已进一步细化：`main` 维持 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`，`telegram-fast` 切到 `custom-127-0-0-1-3000/gemini-3-flash-preview`。根因不是“前台一定要弱模型”，而是实测中 `gemini-3.1-pro-preview` 在真实流式链路里更容易连续触发 `429`，而 `gemini-3-flash-preview` 与 `gemini-3.1-pro-preview` 的最小 unary 请求都可成功。因此当前产品口径是“前台优先 flash 保速度与稳定，后台保留 pro 做更重分析”；验证必须同时看 `openclaw status --deep` 的活会话模型和 direct self-check，不能只看全局 default。
- [2026-03-12 08:05:27] ChatGPT 免费账号链路当前已不稳定支持 `openai-codex-oauth:gpt-5.4` / `gpt-5.3-codex` 作为 OpenClaw 主路；遇到 Telegram/CLI 突然从可用变成持续 `400` 时，第一优先不要再盯 Telegram 通道，而是检查 `AIClient2API` provider 日志是否仍在打 Codex 路由。当前安全切回基线是：`main` 与 `telegram-fast` 都改回 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`，清空对应 `sessions.json` 强制 fresh session，再用 `openclaw status --deep` 和 `openclaw agent --agent <id> --message "只回答当前运行模型ID。"` 复核运行模型。
- [2026-03-11 22:05:59] `TileMeshPano` 的高清块图不能再用“UV 半像素内缩 + depthTest/depthWrite 全关闭”这套策略；这会直接把顶/底极区分片裁坏，并让后加载 tile 盖住底部罗盘。当前安全基线是：tile UV 边界保持精确 `0..1`，tile mesh 继续走正常深度链路，高层只靠更高 `renderOrder` 覆盖低层。
- [2026-03-11 17:00:17] GitHub Pages 项目子路径（如 `/vrplayer/`）下，不能再假设站点根路径就是应用根路径：`public/config.json` 里的 `/assets/...`、`KTX2Loader.setTranscoderPath(...)`、`sw.js` 注册路径都必须先按当前应用基路径重写成 `/vrplayer/...`，不能再写死站点根路径；否则首页封面、场景缩略图、KTX2 transcoder、全景资源或 SW 注册都会在线上命中站点根目录 404。
- [2026-03-11 16:45:15] 三馆学伴当前产品决策已改为“场景一打开就出现”，不再要求必须点“社区”后才初始化；后续若继续调首屏性能，不要误把“延迟到社区点击后再显示学伴”当成当前有效规则。
- [2026-03-11 16:38:19] 仓库根目录的 `config.json` 是历史遗留假真源；当前运行与发布只认 `public/config.json -> build -> dist/config.json -> robocopy -> docs/config.json`，不要再从根目录旧配置回填线上配置。
- [2026-03-11 16:38:19] `museum.map.image` 现在允许留空；没有真实平面图时必须省略该字段，禁止写 `"1"` 这类占位字符串，否则前台会真的去请求错误路径。无平面图时统一走“结构图 graph fallback / 平面图面板提示暂无平面图”。
- [2026-03-09 22:33:00] `telegram-fast` 现在已经能把“请用 ACP 的 Codex 执行这条指令：只回答 hi。不要自己回答，不要解释。”真实转给 Codex 并回 `hi`；稳定路径是“先试 ACP runtime，若撞 Telegram 线程限制则立即转 `C:\Users\Lenovo\.openclaw\bin\oc-acpx.cmd`”。长提示/多行提示不要硬塞进 `cmd /c`，应先写 UTF-8 临时文本，再用 `--prompt-file` 调共享包装器。
- [2026-03-09 22:34:00] Windows 当前 shell 若没有管理员权限，`openclaw node install` 可能因 `schtasks create failed: 拒绝访问` 失败。此时仍可用隐藏前台方式先把 node host 接回 Gateway：`powershell -NoProfile -ExecutionPolicy Bypass -Command "& 'C:\Users\Lenovo\AppData\Roaming\npm\openclaw.ps1' node run --host 127.0.0.1 --port 18789"`；验证口径仍是 `openclaw nodes status --json` 的 `connected=true`。
- [2026-03-09 21:52:00] OpenClaw 让 agent 自己去驱动 Codex 时，不要在 Windows `exec` 里临场拼 `PowerShell + npm install + acpx` 长命令。当前稳定入口已收口为共享包装器 `C:\Users\Lenovo\.openclaw\bin\oc-acpx.cmd`；先试官方 ACP runtime，若命中 `Thread bindings do not support ACP thread spawn for telegram.` 或 `spawnedBy is only supported for subagent:* sessions`，立即改走该包装器。不要把 ACPX 错猜到 `C:\Users\Lenovo\.openclaw\workspace\extensions\acpx\...`。
- [2026-03-09 21:56:00] OpenClaw 的 browser 自动化与 Windows node host 不是一回事。即使 node host 断开，官方 browser 路径仍可独立完成“打开抖音 -> 搜索关键词 -> 点击视频 -> 播放”的网页自动化；node 只影响桌面/系统窗口类能力。若 `openclaw node status` 显示 `Scheduled Task (missing)` 或 `openclaw nodes status --json` 显示 `connected=false`，恢复顺序固定为 `openclaw node install -> openclaw node restart -> openclaw nodes status --json`。
- [2026-03-09 16:53:03] `telegram-fast` 现已开放只读记忆工具 `memory_search / memory_get`。产品边界收口为：Telegram 前台可以借长期记忆补事实，但长期记忆写入真通道仍只有 HTTP memories；不要把只读 OpenClaw memory 误解成第二写入真源。
- [2026-03-09 16:12:14] OpenClaw 已从 `2026.3.2` 升级到 `2026.3.8`。Windows 全局升级前必须先停 `OpenClaw Gateway` 并释放占用 `C:\Users\Lenovo\AppData\Roaming\npm\node_modules\openclaw` 的 `node.exe` 锁，否则 `npm i -g openclaw@latest` 会因 `EBUSY: rename` 失败。升级后需复验 `status --deep`、`gateway health`、`channels status --probe`，并确认 `telegram-fast` 仍按 `openai-codex-oauth:gpt-5.4` 运行。
- [2026-03-09 15:55:08] `telegram-fast` 的高价值外挂基线已放开：当前显式开放 `group:ui / group:automation / group:nodes / agents_list / subagents / sessions_list / sessions_history / sessions_send / sessions_spawn / message`，继续保留 `gateway / tts` 关闭；Dashboard 的 Tools 页现显示 `19/25 enabled`，`browser / canvas / nodes / sessions_* / subagents / message / agents_list` 均已启用。节点宿主当前仍是 `nodes=0`、`Node service not installed`，这表示节点能力入口已开，但还没有配对节点可用。
- [2026-03-09 15:40:00] Memory 主通道的复利工程已单独沉淀到 `D:\Projects\灵感包\研究沉淀\ai_harness\memory_mcp_compound_playbook.md`。以后排查记忆写入时，优先看这份手册里的真源、SOP、去重口径与恢复顺序；`mcp__memory` 图谱工具不作为本仓主记忆通道。
- [2026-03-09 15:26:00] 当前窗口的 OpenClaw 复利工程已单独沉淀到 `D:\Projects\灵感包\研究沉淀\ai_harness\openclaw_compound_playbook.md`。以后排查 `telegram-fast` 的模型漂移、项目路由、session reset、真源判断时，优先读这份手册，不要只翻历史聊天或旧截图。
- [2026-03-09 14:18:00] `telegram-fast` 的项目上下文注入规则已经收口：用户消息若命中 `vrplayer / 项目网站 / D:\Projects\vrplayer / 三馆学伴 / 页面 / 场景 / 功能 / 报错` 等项目线索，首轮必须先按项目语义回答，再决定是否执行；`VR眼镜 / 绿灯 / 退出后` 这类弱词单独出现时不算项目命中，fresh 会话下应先按通用硬件/平台问题回答。实现真源在 `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\AGENTS.md` 与 `workspace-telegram-fast/memory/project-*.md`。
- [2026-03-09 15:18:00] 若另一个窗口或旧会话仍持有“Gemini 为默认模型”的旧上下文，不得据此把 `telegram-fast` 主模型改回 Gemini。当前模型真值只看 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `agents.defaults.model.primary` 与 `agents.list[id=telegram-fast].model.primary`；历史 memory、旧摘要、旧截图都只能当历史证据，不能当回写指令。
- [2026-03-09 11:52:00] OpenClaw 的“真全局默认模型”不能只改 `agents.defaults.model.primary`；凡是被 channel binding 直接命中的 agent（当前是 `telegram-fast`）也必须同步改 `agents.list[].model.primary`。否则状态页会显示默认是 `gpt-5.4`，但 Telegram 实际仍按 agent 局部配置跑 Gemini。
- [2026-03-09 11:45:00] OpenClaw 的 Telegram 直连会话不要只看 `agents.defaults.model.primary`；`telegram-fast` 实际会跟随 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `agents.list[].model.primary` 和 `workspace-telegram-fast/TOOLS.md` 的注入口径。如果这两处仍写 Gemini，即使全局默认已切 `gpt-5.4`，TG 也会继续自称 Gemini。修正后需刷新/丢弃旧 TG 直连 session store，让下一条消息 fresh start。
- [2026-03-09 11:45:00] `telegram-fast` 若未开放 `group:web`，就不能对“业界是否发布某模型”这类时效性事实下结论；当前正确口径是“优先用 web 工具查证，查不到就明确无法外部核验，不要猜”。
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
- [2026-02-22 16:00:43] 开机启动口径统一：`127.0.0.1:3217/admin` 是 AIClient Orchestrator 控制台（旧后台）；`127.0.0.1:3220/admin/` 是 Codex Host v2 控制台（新后台）。启动脚本 `C:\Users\Lenovo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\start-aiclient-orchestrator.cmd` 已改为开机同时拉起两者。
- [2026-02-22 16:22:07] 开机自动启动已升级为四服务链路：`AIClient-2-API(3000)`、`Memory HTTP(8000)`、`AIClient Orchestrator(3217)`、`Codex Host(3220)`。统一入口仍为 `C:\Users\Lenovo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\start-aiclient-orchestrator.cmd`，重启后无需手动逐个启动。
- [2026-02-20 21:37:52] 三馆学伴事实回忆兜底：当用户追问“我今天干了什么/我刚才说了什么”时，前端必须先从本地会话历史直接回忆回复（`FcChatPanel` 本地分支），不要完全依赖后端 history 解析，避免再次出现“姓名可记住但事实失忆”。
- [2026-02-20 22:06:55] 三馆学伴记忆策略升级：禁止只做固定关键词问法匹配；回忆分支必须基于“历史消息语义打分（token overlap + 主语命中 + 近因权重）”选取候选句，确保“姥姥干了家务 -> 姥姥干了啥”这类改写问法也能命中同一会话记忆。
- [2026-03-03 13:25:00] 三馆学伴记忆链路改造：移除 `FcChatPanel` 前端“正则/过滤回忆拦截回复”分支，避免误判生成固定话术；改为请求体同时携带 `context.userMemory` 与 `question` 内嵌的“用户已提供信息”提示，确保后端在“你还记得我今天做了什么吗”这类追问中可基于会话事实作答；`清空` 按钮会同步清空 `userMemory`，防止旧会话串线。
- [2026-03-03 14:08:54] 三馆学伴“原话复述”修复：`fcChatClient` 对“复述助手内容”请求改为先按问题主题关键词重排 `assistantRecentReplies`（`候选1=最相关`，不再固定最新），并在上送 `context.userMemory` 时剔除“我刚才说了什么/回顾上下文”等元问题噪音，避免把“最近一次回忆回答”误当成待复述原话。
- [2026-03-03 21:13:34] 三馆学伴会话口径收敛：`fcChatClient` 停止基于“回忆/复述”正则改写用户问题，统一改为“原问直传 + 结构化上下文（`lastUserUtterance/lastAssistantReply/recentTurns`）”；`FcChatPanel` 新增“回顾卡片 + 快捷提问”可视化入口，并在场景加载 3.5s 后增加 `chatRuntime.ensureInit()` 兜底触发，避免首屏未显示学伴头像。
- [2026-03-03 21:46:15] 三馆学伴记忆完整性修复：`fcChatClient` 的 `context` 需同时携带 `recentTurns/history/messages/chatHistory`（历史项含 `text + content` 双字段）并提高 `lastAssistantReply` 长度上限；仅传短裁剪 `recentTurns` 时，后端会更易误判“没有可复述原话”。
- [2026-03-04 12:49:05] 三馆学伴 UI 交互约束：快捷提示词行应放在输入框上方（`fcchat-composer`），且 `fcchat-recall-panel` 必须显式声明 `[hidden]{display:none!important}`；否则会出现“回顾面板与主聊天列表上下重复显示”。
- [2026-02-20 22:04:20] 新增 Codex 宿主 `tools/codex-host/server.mjs`：用于把 Codex 插件子任务转发到 AIClient Orchestrator。关键边界：Codex 主会话 token 不能外部强制改 Gemini；省 token 方案是“主会话保留 + 子任务外包 Gemini 优先分流”。
- [2026-02-21 16:59:30] Orchestrator 第一阶段升级已落地：`route/batch` 支持 `execution=concurrent|serial` 与 `concurrency(1-6)`；新增软闸门告警（`codex_light_mode` / `codex_share_high`）与接口 `GET /admin/api/alerts`、`GET /admin/api/routing/policy`；控制台新增“非 Codex 占比/软闸门告警”KPI 与并发/阈值配置项。默认策略：并发批量+软闸门仅告警不阻断。
- [2026-02-21 17:12:56] 运维调用固定入口：单任务执行必须使用 `POST /admin/api/route/task`（`/admin/api/route` 为 404）；控制台“Cursor Codex 插件请求摘要”已做去噪截断，优先显示真实任务句，避免 IDE 背景上下文淹没关键信息。
- [2026-02-21 17:55:03] 宿主并发编排基线：`host_team_execute`/`npm run host:team` 已支持“自动拆解 -> 并发子任务 -> 汇总”。默认 Gemini-first（planner/worker/merge 可分开指定），并发建议 `concurrency=2~4`，用于把轻中任务持续外包给 Gemini，降低 Codex 主会话消耗。
- [2026-02-21 19:39:40] 宿主编排默认策略升级为 `quality-first-adaptive`：`planner=gemini`、`worker=codex`、`merge=gemini`；`planner/merge` 默认 deep 且在高复杂度下自动降为 balanced，`worker` 默认 deep 且仅在超大上下文下降级。返回结果 `settings` 新增各阶段模式决策原因，便于审计 token/质量权衡。
- [2026-02-21 20:18:00] 宿主新增“上下文工程层”：`host_team_execute` 支持 `context_mode/context_files/context_max_chars/chat_history`，并提供 `host_context_preview` 预览 context packet。策略是先压缩聊天记录与重点文件，再拼接 AGENTS/README/package/git 摘要，避免把无关上下文整包灌入导致 token 爆炸。
- [2026-02-21 20:48:00] 新增 Codex 插件可复制模板：`tools/codex-host/CODEX_PROMPTS.md`。包含标准双阶段（preview->execute）、省 token、重任务、高质量 UI 四套提示词，统一参数口径便于跨会话复用。
- [2026-02-21 21:26:00] 宿主上下文聚焦支持“自然语言选文件”：新增 `focus_hint`（中文描述重点文件/模块）和自动文件推断。默认可不传 `context_files`；系统会从 `task/context/chat_history/focus_hint` 提取文件线索，并在 `settings.contextFile*` 字段回显“显式/推断/最终解析”结果用于审计。
- [2026-02-21 22:18:30] 宿主能力扩展到“Project 插件同类工作流（v1）”：新增 `host_capabilities/host_files_find/host_file_read/host_shell_exec/host_skills_list/host_skill_read/host_task_autopilot`。可在 Codex 插件内直接做“查文件、读文件、查技能、读技能、跑命令、自动编排执行”闭环；文件索引改为 `git ls-files + rg --files` 合并，未跟踪文件也可被自然语言聚焦命中。
- [2026-02-21 22:47:30] 宿主升级 `autopilot v2`：`host_task_autopilot` 先自动分类（搜索调研/UI设计/规范检查/Debug修复/通用实现）再决策执行路径，并返回推荐 skills/MCP 与执行理由；新增 `--autopilot-preview`（`npm run host:autopilot -- --task \"...\"`）用于“只看策略不执行”。默认继续 Gemini-first，复杂任务才提升到 Codex Worker。
- [2026-02-21 23:52:00] Codex Host v2“四缺口”已落地：新增 `host_execute` 零参数主入口；团队流水线升级为 `research -> planner -> worker -> merge -> compaction` 并记录角色明细；引入本地持久化状态目录 `%USERPROFILE%/.codex/codex-host/state`（`history.jsonl/roles.jsonl/sessions.json/history-index.json`）；新增 `http://127.0.0.1:3220/admin/` 及接口 `/admin/api/overview|history|models|roles|compact`，支持模型明细、无限分页历史、会话压缩与术语解释。
- [2026-02-22 17:51:50] Codex Host v3 已上线：接入 GSD 直嵌规划增强与 Claude MEM 侧车适配（可选），新增 MCP 工具 `host_integrations_status` / `host_memory_retrieve_preview` / `host_strategy_explain`，并扩展后台接口 `/admin/api/integrations`、`/admin/api/context-evidence`、`/admin/api/cost-breakdown`。`3220/admin` 控制台新增“集成健康、成本拆解、上下文证据”面板，支持真实消耗与估算节省双列审计。
- [2026-02-22 18:36:30] Codex Host v3 控制台文案已统一为可读中文；历史任务与“上下文证据详情”均可展开查看角色明细（Research/Planner/Worker/Merge/Compaction 的状态、provider、model、token、耗时、说明）。
- [2026-02-22 18:36:30] Compaction 固定为本地阶段：`provider=local`、`model=session-compactor-v1`、`token=0`，用于会话压缩快照持久化；GSD 与 Claude MEM 不直接执行 compaction。
- [2026-02-22 19:25:00] Memory HTTP 出现 `insufficient_scope` 的高频根因是“当前会话进程未加载 `MCP_API_KEY`（重启后常见）”，即使服务端健康也会写入失败。固定做法：把 `MCP_API_KEY` 写入 User 级环境变量（或每次会话显式设置），并在写入请求中始终携带 `Authorization: Bearer $env:MCP_API_KEY`。
- [2026-02-22 23:24:12] 平台导入脚本写入 `D:\AIClient-2-API\configs\provider_pools.json` 后，若 `host:platforms:show` 仍显示未配置，优先判定为 AIClient 进程未刷新配置缓存；固定做法改为 `npm run host:platforms:import:restart` 一步完成“导入+重启+再探测”。iFlow 显示 `Usage query not supported by this provider` 仅表示“不提供额度查询接口”，不代表接入失败；成功判据是 `configured=yes + accounts>=1 + models>0`。
- [2026-02-22 23:58:40] 多平台接入校验补充：Groq/SiliconFlow/Zhipu/ModelScope/iFlow/讯飞均可直连 OpenAI 兼容 `chat/completions`；Cerebras 当前返回 `402 payment_required`（账号需充值后可调用）。`xfyun-maas` 的 `/models` 非 OpenAI 标准 JSON，平台能力页已加回退逻辑：当模型探测为空时展示 `checkModelName`（当前 `xopglm5`），避免控制台出现“已配置但无模型可见”。
- [2026-02-23 09:30:14] 平台接入新增 `google-ai-studio` 与 `wisdom-gate`：`host:platforms:import:restart` 现可直接导入这两个平台（默认 Base URL 分别为 `https://generativelanguage.googleapis.com/v1beta/openai` 与 `https://wisdom-gate.juheapi.com/v1`），并在 `host:platforms:show` / `3220/admin` 中显示模型列表。
- [2026-02-23 09:30:14] 新增命令 `npm run host:platforms:probe-limits`：对已接入 OpenAI 兼容平台执行 `/models + /chat/completions` 实测，输出速率限制响应头（如 Groq `x-ratelimit-*`）与真实调用状态，避免把“无额度接口”误判为“接入失败”。
- [2026-02-23 09:30:14] `claude-mem-sidecar` 默认运行口径固化为“开机即启用”：用户级环境变量已写入 `HOST_CLAUDE_MEM_ENABLED=true`、`HOST_CLAUDE_MEM_BASE_URL=http://127.0.0.1:37777`；若控制台显示关闭，优先执行 `start-local-stack.ps1` 并调用 `/admin/api/integrations/reload` 刷新健康状态。
- [2026-02-23 09:57:05] 平台额度探测补充：`groq` 与 `wisdom-gate` 已接入“速率头轻量探测”并反映到 `provider-capabilities`（`usageProbeOk=1/1`）；可在 `host:platforms:show` 与 `3220/admin/api/models?refreshUsage=1` 看到 reset hints。`wisdom-gate` 默认探测模型已固定为 `gpt-5-nano`，避免 `gpt-5` 权限不足导致探测失败。
- [2026-02-23 11:17:45] 平台探测升级：`host:platforms:probe-limits` 改为“多模型探测”模式（`wisdom-gate` 默认探测 8 个模型，输出每个模型的 HTTP 状态与错误摘要），不再只测单模型；新增 `npm run host:platforms:show:full` 可打印完整模型列表。`codex-host` 的 `3220/admin` 也已取消平台模型 `slice(20)` 截断，展开可查看完整示例。
- [2026-02-23 12:35:02] 平台下线记录：按用户要求移除 `Cerebras API` 与 `Google AI Studio API`（`provider_pools.json` 已删除对应节点，`host:platforms:show` 显示两者 `configured=no`）。若 Orchestrator 顶部仍显示“连接异常”，首要排查 `openai-codex-oauth` 健康状态（当前 `No healthy provider found`），与上述两平台下线无关。
- [2026-02-23 13:36:32] Codex Host 路由自动调优入口已固化：新增脚本 `npm run host:router:autotune:preview` 与 `npm run host:router:autotune:apply`，用于把 Orchestrator 运行配置自动收敛到“Gemini 优先、省 token、复杂任务保留 Codex”的默认策略。
- [2026-02-23 13:36:32] `tools/codex-host/README.md` 与 `tools/codex-host/CODEX_PROMPTS.md` 已重写为 UTF-8 简体中文版本；调用口径统一为自然语言零参数，不再要求手写 `task/context_files` 参数格式。
- [2026-02-23 15:35:34] worker-hard 路由短路修复：`decideHardWorkerProvider()` 不再把“高复杂度本身”视作强制 Codex 条件；仅当命中高风险信号（如 `rollback/deadlock/线上故障`）才强制 Codex。高复杂普通任务将按策略先试 `gemini deep`，失败子任务再自动回退 Codex deep。
- [2026-02-23 17:03:30] Codex Host v3.1 控制台补齐“角色模型矩阵 / 平台评分榜 / 回退轨迹 / 配额可见性说明”，并新增后端接口 `/admin/api/model-matrix`、`/admin/api/provider-scores`、`/admin/api/benchmark/run-once`、`/admin/api/benchmark/manual-probe`、`/admin/api/providers/prune`。若 3220 页面仍显示旧版本或新接口 404，首要判因是 `codex-host` 进程未重启加载新代码，固定做法是先重启 `npm run host:start` 再刷新页面。
- [2026-02-23 17:20:48] 路由复杂度评分已补齐中文工程信号（重构/并发/事务/回滚/压测/安全/迁移等）与结构特征（行数/分点），并加入“只回复/一句话/润色”降权；验收口径固定为：轻任务应命中 `worker_normal`，复杂工程任务应命中 `worker_hard`，避免复杂中文任务被误判为低复杂度。
- [2026-02-25 21:25:17] Memory 永久档案治理补充：`contextctl` 已支持 `-Action memory-tag-hash`（`-Hashes/-HashFile/-HashReason`）并在 `monthly-maintain` 自动读取 `C:\Users\Lenovo\.codex\context-hub\governance\manual_archive_hashes.txt` 做队列化非破坏式打标；队列文件解析已兼容 UTF-8 BOM，避免注释首行被误识别为 hash。
- [2026-02-23 18:26:02] Benchmark 关键细节已固化：`host_benchmark_run_once` 支持 `samples_per_role=1~12`（默认 8）；修复未传 `providers` 时误生成 `providerFilter=["unknown"]` 导致学习空跑的问题。控制台“学习一次”改为“单角色 8 样本 / 全角色 2 样本”，用于兼顾定标质量与 token 成本。
- [2026-02-24 09:47:58] Codex Host v4 评分与全平台基准已落地：评分改为“按角色权重 + 稳定性惩罚 + 同分裁决（success->quality->latency->cost->samples->priority）”；新增 `GET /admin/api/model-families`、`POST /admin/api/benchmark/run-mainstream`、MCP 工具 `host_model_families` 与 `host_benchmark_run_mainstream`；控制台新增“当前模型家族池、角色评分全榜单、Gemini/Codex 不可用回退链”；`google-ai-studio` 与 `cerebras` 保持排除态。
- [2026-02-24 11:26:35] 全局上下文治理收口：`aiclient-orchestrator` 切换为 `C:\Users\Lenovo\.codex\tools\orchestrator-launcher.mjs` 启动入口，`start-local-stack.ps1` 同步改为 launcher 优先并保留回退；`context-hub` 新增 `global/TOOL_CANONICAL_SOURCES.json` 与 `CONTEXT_ROUTING.json`，明确 `global/projects/*/source_mirror` 为 `archive-only`（不作为运行真源、不作为默认上下文读取源）。
- [2026-02-24 13:30:39] Codex Host v4 补丁：`run-mainstream/run-once` 新增 `include_unhealthy`（默认 false，仅健康平台进入基准；必要时可显式 true 纳入不健康平台），并修复 `host_team_execute.focus_hint` 的乱码 schema 文案，避免控制台/接口描述污染。
- [2026-02-24 13:56:02] Codex Host v4 控制台“学习一次”已参数化：新增 `样本/角色`、`延续上次学习`、`纳入不健康平台` 三个可视开关；自动样本策略固定为“全角色=2、单角色=8”，并透传到 `POST /admin/api/benchmark/run-mainstream`，用于兼顾省 token 与可控压测。
- [2026-02-24 14:51:21] Codex Host v4 CLI 直达链路已固化：新增 `npm run host:model-families`、`npm run host:provider-scores`、`npm run host:benchmark:mainstream`、`npm run host:benchmark:once`，用于无 UI 场景下直接完成“家族池查看 / 评分榜查看 / 主流压测 / 角色学习”闭环。
- [2026-02-24 16:15:17] Codex Host v4 收口补丁：移除“非 Codex 占比 >=80%”硬约束（默认 `HOST_ENFORCE_NON_CODEX_TARGET=false`，仅监控展示占比），同时保留页面 KPI；新增成本基线接口 `GET/POST /admin/api/cost-baseline` 与窗口对比（真实消耗/估算节省/净消耗/命中率变化）；成本拆解新增“上下文命中率”量化字段（总命中/记忆命中/文件命中）；修复 `3220/admin` 顶栏“北京时间”和初始化失败提示的乱码文案。
- [2026-02-24 20:48:44] v4 持续执行口径固化：`host:v4-progress` 当前 `overallReady=true`（5/5 角色候选与区分度达标）；全量基准建议采用“分角色短批次 + continue_from_last=true”避免前台长时超时；控制台验收仍按 `chrome-devtools` 快照 + Network（`/admin/api/overview`、`/admin/api/model-families`、`/admin/api/provider-scores`、`/admin/api/v4-progress` 均 200）作为修复成立证据。
- [2026-02-24 23:47:44] v4 进度假性未达标修复：`buildV4ProgressPayload` 改为以“非冷却角色榜候选”计算 Top5 区分度，不再强制与健康候选池做键交集过滤；健康池仅保留用于候选阈值自适应。修复后 `merge` 不再被误判 `0/2`，`/admin/api/v4-progress` 与 CLI `host:v4-progress` 均恢复 `overallReady=true`（runCount=37）。
- [2026-02-25 15:10:50] v4 评分与榜单口径更新：角色评分已去除“时间分”权重（`latency=0`，权重回收到 `quality`），榜单改为“全量模型同榜 + 全量角色榜（不再默认 top60 截断）”；`worker_normal` 纳入 `gpt5/claude` 家族候选。新增 worker 安全闸：`run-mainstream` 中若 worker 位出现“非 gpt5/gemini/claude”模型综合分超过 `gpt-5.3-codex`，基准任务会自动中止并返回原因。`wisdom-gate/groq` 的额度探测对临时 `overloaded/429/5xx` 已改为“降级展示（不爆红）”。
- [2026-02-25 15:26:40] `wisdom-gate` 额度探测新增“配额受限软降级”：当返回 `insufficient fund / quota exceeded / 余额不足` 时，不再标记为硬失败红爆，而是记为“可达但当前 key 额度受限（degraded）”；保留原始错误到 `usageProbe.raw.message` 供控制台解释。
- [2026-02-26 16:08:33] 上下文工程运维口径补充：`contextctl` 新增 `ops-health`（真源/服务/记忆自检/评估新鲜度/控制字符）与 `resolve-error`（按 ErrorCode 非破坏式收敛 pending/captured）；`02-收工.ps1` 默认执行 `ops-health`（可 `-SkipOpsHealth`）。PowerShell 写文档时避免使用“反引号+数字”组合（如 `` `02``），否则会写入 NUL 控制字符并引发隐性乱码。
- [2026-02-26 17:28:30] `ops-health` 巡检范围已扩展到全局治理关键文档：`governance/CONTEXT_ENGINE_MASTER_PLAN_v3.md`、`todo/USER_RETURN_BRIEF.md`、`todo/AUTO_EXECUTION_LOG.latest.md`。后续以 `ops-health` 作为“文档健康 + 服务健康”统一门禁，防止治理文档损坏漏检。
- [2026-02-26 19:13:20] `monthly-maintain` 运行时禁止把实时输出文件写在 `C:\Users\Lenovo\.codex\context-hub` 根目录；备份阶段会打包该目录，若输出文件被占用会触发 `BACKUP_FAILED`。固定做法：直接读取标准输出，或写到 context-hub 目录外的临时文件。
- [2026-02-26 19:27:20] 告警治理口径：`monthly-maintain` 与 `ops-health` 失败路径统一写入 `governance/alerts.jsonl`，并刷新 `todo/ALERTS.latest.md`；默认“告警开启、自动冻结关闭”，先可观测再逐步加硬约束。
- [2026-02-27 11:46:51] 自动化登录风控经验（可能结论）：`chrome-devtools MCP` 驱动窗口在部分站点更容易被识别为自动化（可能出现“Chrome 正受到自动测试软件的控制”提示），Google/Cloudflare 等登录敏感链路触发风控概率更高；`playwright MCP` 在当前环境测试中未出现该提示，登录页可达性更高。该结论为经验性，后续需按站点与会话复验。
- [2026-02-27 11:49:20] 外部聊天桥接质量口径补充：`codex-session` 历史会话中顶层 `turn_context/compacted/session_state/task_*` 事件必须归类为 `system`，否则会导致 `kept_by_role.unknown` 虚高并降低跨聊天复盘可读性。当前修复后 `external_chat_bridge.latest.json` 的 `unknown_role_ratio=0`，可作为 start-session 轻量注入的默认质量阈值。
- [2026-02-27 11:58:45] 上下文证据入口补充：`import-chat` 需固定输出 `parse_stats`（`json_decode_errors/non_object_records/blank_lines/total_skipped`），`ops-health` 固定展示 `bridge_quality`（unknown/dropped/parse_skipped），`pack/session_capsule` 固定输出 `evidence_refs.reports[]`（latest 报告路径）。目标是新会话首轮先证据再结论，减少人工路径回忆成本。
- [2026-03-02 22:04:30] KTX 过渡稳定策略：当场景已显示 fallback 整图时，跳过低层瓦片（如 z2）仅加载最高层；`TileMeshPano` 关闭 `depthWrite/depthTest` 并按 `z` 固定 `renderOrder`；fallback 只在最高层瓦片全量就绪后清理，避免加载过程中出现错位/撕裂感。
- [2026-03-03 21:00:00] 网页会话注入链路补充：`codex-host` 已支持 `web_context`（CLI: `--web-context-file/--web-context-source/...`）自动执行 `import-chat -> 标准化 context packet -> host_execute/host_team_execute 注入`；默认 `isolate=true` 时会使用隔离 `sessionId` 且 compaction 默认关闭，避免污染当前窗口上下文。若导入 JSON 带 BOM 会触发 `import-chat` 解析失败，需使用 UTF-8 无 BOM（或先转码）。
- [2026-03-08 18:22:09] OpenClaw 自定义 provider 的上下文窗口真源在 `~/.openclaw/agents/<agentId>/agent/models.json`；`~/.openclaw/agents/<agentId>/sessions/sessions.json` 的 `contextTokens` 可能滞留旧值并误导 `openclaw status`。若模型已升到 `200k` 但状态页仍显示 `16k`，先重启官方 Gateway 刷新活会话，再校正遗留旧 session 元数据，不要误判为主链实际只有 `16k`。
- [2026-03-08 18:38:23] OpenClaw `workspace-telegram-fast` 的骨架文件必须保持简短且为干净 UTF-8；Windows PowerShell `Get-Content` 读取无 BOM UTF-8 时可能显示假乱码，但 OpenClaw 运行时仍按 UTF-8 读取。判断 Telegram fast prompt 是否真的干净，优先看 Python `utf-8` 解码结果或 `/context detail` 的活会话输出，不要只凭终端显示误判。
- [2026-03-08 19:10:16] Telegram fast 的 prompt 优化不能直接拿全局 `skills.allowBundled` 试刀。当前已核实它是官方支持项，但尚未证实可按 agent 单独收窄；若未先证明 per-agent 生效就全局关闭，可能误伤 `main agent` 的能力面。后续必须先查清 agent 级作用域或采用会话/骨架级减负，再动全局技能池。
- [2026-03-08 19:31:47] 监督 kyuu 主链时，不要直接相信 `pending_execution_plan.json` 与 `execution_eta.latest.json` 就代表当前主线；它们可能明显滞后于官方 OpenClaw cutover 状态。优先读取 `C:\Users\Lenovo\.codex\context-hub\data\views\supervisor_digest.latest.md/json` 交叉检查主链健康、执行锚点年龄与历史待办污染，再决定下一步。
- [2026-03-08 19:48:01] 当 `telegram-fast` 的 Telegram 直连会话残留陈旧 `systemPromptReport/tools` 快照、导致 prompt 负担看起来明显重于 fresh session 时，优先使用官方 `sessions.reset` 刷新这条直连 session，不要往用户 TG 主会话里塞隐藏测试消息。已验证 `openclaw gateway call sessions.reset --params ...` 会归档旧 transcript、清空旧 token 计数与 `systemPromptReport`，并让下一条真实 Telegram 消息从 fresh session 起跑，同时不回退旧 worker。
- [2026-03-08 20:50:18] Night Work ROI 的最终采纳信号已收口为结构化字段：统一通过 `contextctl.ps1 -Action adoption-mark -Outcome accepted|reverted|rolled_back -Ref <stable-id> -Note <short-text> -Scope product|ops|prompt|config|docs` 一次写入 `events/cognition/evo_units` 三本账。`supervisor_digest.py` 现以 `adoption_outcome/adoption_ref` 为主口径去重计数，旧 regex 仅保留兼容 fallback。

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
- [2026-02-26 17:40:30] 上下文工程巡检补充：`ops-health` 已将“文本异常守卫（断词/受损拼写）”纳入门禁，除 `control_char_count` 外新增 `text_anomaly_count`；后续以二者同时为 0 作为文档健康基线。
- [2026-02-26 18:26:20] 上下文巡检规则升级：文本异常守卫规则已外置到 `C:\Users\Lenovo\.codex\context-hub\governance\text_anomaly_rules.v1.json`，`ops-health` 采用“规则文件优先+默认回退”执行，控制面文件同步纳入巡检。
- [2026-02-26 18:31:20] `ops-health` 报告增强：除 `text_anomaly_count` 外，`ops_health.latest.md` 现输出 `Text Anomaly Hits` 明细，异常定位无需二次查询。
- [2026-02-26 18:38:10] 周报脚本兼容性修复：`memory_rollup_weekly.py` 已兼容 `valid_from/last_verified`，避免 `weekly-review` 在 curated 数据下误报 `count=0`。
- [2026-02-26 19:05:10] 周复盘巡检增强：`weekly-review` 固定输出 `weekly_review.latest.md`，`ops-health` 新增 weekly 新鲜度门禁与 `Stale Reports` 明细，周报链路可被自动监控。
- [2026-03-08 21:27:20] 官方 OpenClaw 复杂任务闭环新增两条监督动作：`contextctl.ps1 -Action telegram-realtrace-once` 与 `contextctl.ps1 -Action morning-digest`。前者即使在等待真实 Telegram 消息时也必须落 `telegram_realtrace.latest.{md,json}`，避免 supervisor 只看到 `missing`；后者统一聚合 `supervisor_digest / execution_eta / night_work_roi / ASYNC_COMMUNICATION / pending_execution_plan`，不另造第二套监督真源。
- [2026-03-08 22:27:13] 官方 OpenClaw Telegram fast 的附件坑点补充：仅从 `tools.allow` 里移除 `image` 不足以阻止读图，因为 `read` 工具本身也能打开 `jpg/png`。代码/仓库/日志类任务必须在 `workspace-telegram-fast/AGENTS.md` 明确“忽略附件标记、优先执行文本任务、先回执再异步执行”；检索命令默认用 PowerShell 原生收敛写法（`Get-ChildItem -Recurse -File -Include ... | Select-String`），长命令优先带 `yieldMs`。若 Telegram 直连会话仍挂旧 runtime model，优先走官方 `sessions.reset` + `sessions.patch`，不要回退旧 worker。
- [2026-03-08 23:05:00] 当用户要求进入长期自治循环时，不要停在“等用户下一句”。每轮至少完成 1 份外部网页/官方资料采样、1 份本地转写/灵感库采样、1 条新的可执行 backlog，并把结果写回 `task_plan.md / progress.md / findings.md / D:\Projects\灵感包\研究沉淀\ai_harness\supervisor_brief.md / pending_execution_plan.json`。只有红灯风险才暂停；普通研究、收敛和方案生成不等待用户确认。
- [2026-03-08 23:12:30] 长期自治循环中的用户可见回复应改为“过程型进度更新”，避免用收尾式总结把线程停住。除红灯风险或用户明确要求总结外，不使用“完成/接下来/等你回复”这类交棒式结束语。
- [2026-03-09 00:20:00] Memory Management 用例当前只吸收低风险三件套：`Three-Tier Memory` 采用“长期层(MEMORY+HTTP memories) / 项目层(ASYNC+BRIDGE+pending plan) / 新鲜度层(supervisor/morning/heartbeat views)”映射；`Heartbeat State Monitor` 采用被动 freshness 视图 `contextctl.ps1 -Action heartbeat-state`，不打开常驻 heartbeat；`Safe Operations Ledger` 采用显式账本 `SAFE_OPERATIONS.md + safe_ops_ledger.latest.{md,json}`。`self-improving-agent` 只保留只读评估与规则草案，不允许运行时自动改写生产策略。
- [2026-03-09 08:05:30] `heartbeat-state` 的产品语义已收口到“官方 OpenClaw 主链健康优先”：`safe_ops_ledger / supervisor_digest / telegram_realtrace` 属于主判断项，`ops_health` 仅保留为辅助治理信号，避免旧 V1 试运行/评估 freshness 噪声把 kyuu 主链误判成故障。`self-improving-agent` 的当前外部仓结构证明它更像“learn log + promotion + optional hooks”，现阶段只借鉴其记录/提升机制，不直接装进生产主链。
- [2026-03-09 10:10:48] 三馆学伴云函数错误包兼容：当 `fcChat.endpoint` 返回 `{RequestId, Code, Message}` 且 HTTP 非 2xx 时，前端必须优先解析并展示真实服务原因。已验证 `403 + AccessDenied + Current user is in debt.` 应显示为 `请求失败：服务暂不可用（云函数账户欠费，HTTP 403）`，不要再笼统落成 `服务返回异常数据`。
- [2026-03-09 11:20:00] OpenClaw 接 `AIClient2API(127.0.0.1:3000)` 时，不要把返回体里的 `model: gpt-5.4` 当成“真走了 GPT-5.4”。当前稳定命中 Codex/OpenAI 路由的做法是使用带 provider 前缀的 `openai-codex-oauth:gpt-5.4`；裸模型名 `gpt-5.4` 在现有多 provider 运行时下仍可能被前置 provider 偷吃并回落到 Gemini。
- [2026-03-13 20:41:15] OpenClaw `main` 若再次出现“gateway timeout -> embedded fallback -> session file locked”连锁失败，第一优先怀疑遗留的 `gateway --force` 孤儿进程链，而不是先怪模型链。固定恢复 SOP：杀掉残留 `cmd/node` 链、归档并重置 `C:\Users\Lenovo\.openclaw\agents\main\sessions`、重新拉起 Gateway，再用单独串行的 `openclaw.cmd agent --agent main ...` 做 fresh 验证。
- [2026-03-13 20:41:15] `openclaw.json` 当前不支持 `skillsFilter`；若 runtime 仍默认注入 6 个 bundled skills，就必须按运行真相记录，不能把“希望只剩 2 个 skills”写成工作区事实。skills prompt 的进一步收窄需要另找官方支持入口，不能假设配置已生效。
- [2026-03-14 12:46:40] OpenClaw 的前台模式初判当前应以 `telegram-fast` 为准，不要把 `main` 当成自然语言模式分类的权威解释器。已验证 fresh smoke 下，`telegram-fast` 能把“固定流程图 + 中间校验”判到 `workflow/sequential`，而 `main` 仍可能误答成 `evaluator/review`。当前稳定分工应收口为：`telegram-fast` 做前台模式路由，`main` 负责已判定模式后的计划、监督、review、compaction 与后台收口。
- [2026-03-14 13:12:00] `main -> ops-exec` 的高权限委派若放任模型临场猜 CLI，容易误造不存在的 `openclaw agents run ...`。当前稳定入口已收口为 `C:\Users\Lenovo\.openclaw\bin\oc-ops-exec.cmd`：短任务用 `--prompt`，多行/中文/长任务先写 UTF-8 临时文件，再用 `--prompt-file`；不要再让 `main` 直接猜原生命令。
- [2026-03-14 18:57:39] Windows node host 当前真实指纹已切到 `openclaw.mjs node run --host 127.0.0.1 --port 18789`；旧的 `*index.js*node run*` 匹配会漏掉真宿主，导致 `start-node-host.ps1` 误报“未启动”。同一次 `node run` 现在会形成“wrapper node -> real node”的双 `node.exe` 进程链，因此运行统计必须只数根进程；`C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` 已按这个口径修正，`nodeHostCount=1` 现在代表 1 条真实宿主链，节点运行真相仍只看 `openclaw nodes status --json` 的 `connected=true`。
- [2026-03-14 19:51:14] 统一运行真相快照入口已收口为 `py -3.12 -X utf8 D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`；它会同时采样 `health/channels/browser/nodes/approvals/sessions/system presence`，并落 `openclaw_runtime_truth.latest.json` 与 `openclaw_runtime_truth.latest.md`。当前 Telegram 通道真相应优先看 `channels status --probe --json`，因为 `health --json` 仍可能显示 `running=false / tokenSource=none`，而 `channels status` 已是 `running=true / tokenSource=config / mode=polling`。
- [2026-03-14 20:26:12] `oc-runtime-truth` 的正式入口已收口为 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd` / `.ps1`：默认输出精简 summary，`-Raw` 直出 `openclaw_runtime_truth.latest.json`，`-Markdown` 直出 `openclaw_runtime_truth.latest.md`。验证这三个入口时不要再用 `| Select-Object -First ...` 之类的截断管道充当成功标准；该做法可能让 PowerShell 提前截流，误造成“打印成功但 exit code 非 0”的假故障。
- [2026-03-14 20:35:47] `runtime truth` 已进一步前台化为 HTML 状态面：`D:\Projects\vrplayer\openclaw_runtime_truth.latest.html`。`C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.ps1` / `.cmd` 现支持 `-Html`，可直接输出这份状态页内容；默认 summary 也会带 `htmlOut` 路径，便于监督入口或本地浏览器直接消费。
- [2026-03-14 20:40:23] `oc-runtime-truth` 现支持 `-Open`：会先 fresh 刷新 `runtime truth`，再直接用系统默认浏览器打开 `D:\Projects\vrplayer\openclaw_runtime_truth.latest.html`。当前本地最省事的监督入口已经收口为 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd -Open`，不需要再手工找 HTML 路径。
- [2026-03-14 21:23:02] `runtime truth` 的 transcript 错误统计已正式分层：`activeErrors` 只表示最后一次成功事件之后仍未被覆盖的活错误，`historicalErrorCount` 统计已被后续成功压过去的旧错误，`recentErrors` 只保留最近 5 条历史样本做排障回看。后续判断 agent 当前是否仍在报错时，优先看 `activeErrors`，不要再把 `recentErrors` 直接当成活故障。
- [2026-03-14 21:33:46] 监督快捷入口已进一步收口为 `C:\Users\Lenovo\.openclaw\bin\oc-supervise.cmd` / `.ps1`：默认直接等价于 `oc-runtime-truth -Open`，不再要求记住 `-Open` 参数。桌面快捷方式 `C:\Users\Lenovo\Desktop\OpenClaw Runtime Truth.lnk` 也已指向这个入口；后续本机一键监督优先用 `oc-supervise`，定向取原始产物时再回 `oc-runtime-truth -Raw/-Markdown/-Html`。
- [2026-03-14 21:45:46] 监督入口已再补一层正式菜单面：`C:\Users\Lenovo\.openclaw\bin\oc-supervise-menu.cmd` / `.ps1`，桌面快捷方式为 `C:\Users\Lenovo\Desktop\OpenClaw Supervision Menu.lnk`。当前菜单动作固定为：`OpenTruth / OpenMarkdown / OpenJson / HealRuntime / StartNodeHost`。Windows PowerShell 直接执行的 GUI 入口默认保持 ASCII 文案，避免脚本文件因本机默认编码误解而启动失败。
 - [2026-03-14 22:08:50] `runtime truth` 已升级为对象级状态面：统一新增 `Alerts / Services / Recent Sessions` 三层，并同时进入 `openclaw_runtime_truth.latest.{json,md,html}`。当前 fresh 结果下，browser heal 后只剩 `Telegram health/channel mismatch` 这一条 `info` 告警；Telegram 通道真相继续以 `channels status --probe --json` 优先，`health --json` 仅作辅助展示层。
- [2026-03-15 10:50:53] Windows node 当前真实阻塞已钉实为同一设备身份的 `node` role-upgrade 未批准，不是 identity mismatch。`C:\Users\Lenovo\.openclaw\identity\device.json` 与 gateway paired table 使用同一 `deviceId=96c978...`；当 paired roles 只有 `operator` 时，`openclaw node run` 会返回 `pairing required`。当前稳定恢复 SOP 是：先执行 `openclaw devices approve --latest --json` 批准 `node-host` repair 请求，再跑 `C:\Users\Lenovo\.openclaw\start-node-host.ps1`，最后以 `openclaw nodes status --json` 的 `connected=true` 为准。
- [2026-03-15 10:50:53] `pending.json` 在批准后可短暂滞后，不应单独当成 pairing 真相；后续排障时优先信 `openclaw devices list --json` 与 `openclaw nodes status --json`。`runtime truth` 的 node service 文案也已收口：`nodeServiceInstalled=false` 只代表官方 Scheduled Task 未安装；若用户态 node host 已连上 gateway，则状态面应显示 `user-mode host active (scheduled-task not installed)`，不再直接暴露本机乱码错误串。
- [2026-03-15 11:23:58] `runtime truth` 现已显式输出 node pairing 真相：`pairedDeviceCount / pendingDeviceCount / nodeRoleGrantedCount / pairedRoles / pairedDevices / pendingDevices`。后续判断 node 是否真正修好时，优先看这组 pairing 对象和 `nodes status.connected`，不要再只盯 `connectedCount`。
- [2026-03-15 11:23:58] 当前全量 fresh `runtime truth` 串行采样约需 `50s`，因为会依次跑 `health/channels/browser/nodes/devices/status/approvals/sessions/presence`。这属于正常刷新成本；判断是否异常时应看 `generatedAt`、产物时间戳和最终 `exit code`，不要因为几十秒无输出就误判脚本卡死。
- [2026-03-15 14:08:50] `oc-supervise-live` 当前已收口为“后台动作 job + action-status 轮询”模式：`/api/heal`、`/api/start-node-host`、`/api/approve-latest-device`、`/api/follow-recommendations` 不再同步阻塞到 fresh snapshot 完成后才返回。POST 现在应在 1 秒左右返回 `running=true`，真正完成态统一看 `/api/action-status`；若 `needsRefresh=true`，前端再单独拉 `/api/truth` 刷新。后续不要再把 live dashboard 动作端点当同步 RPC 来验收。
- [2026-03-15 15:26:51] `oc-supervise-live` 的 `Current Action` 已正式前台化成 `action-banner + action-timeline`。当前产品态应优先看这两块可视状态，再看 `Action Output` 的 compact debug summary；后者不再承担“给人读懂当前动作”的职责。DevTools 验收里当前唯一 console 报错是 supervision 页的 `favicon.ico` 404，属于无害展示层噪声，不应误判成动作链或 truth 链故障。
- [2026-03-15 15:40:31] `Action Output` 已进一步降级为折叠式 `Debug Output` 面板：默认折叠，失败时自动展开。当前 live dashboard 的“给人读的动作状态”正式以 `action-banner + action-timeline` 为准；`Debug Output` 仅保留排障用途。最新 DevTools 验收下 console 已清零，主 API 请求继续全部 `200`。
- [2026-03-15 15:53:47] live supervision 现已补齐 `Recent Actions` 历史视图，并把动作历史正式落盘到 `D:\Projects\vrplayer\openclaw_supervision_action_history.latest.json`。`/api/action-status` 现在会同时返回当前动作状态与 `history`；判断上一轮恢复或修复是否真实成功时，优先看 `history[0].action/status/finishedAt`，不要只看当前 idle/completed 卡片。
- [2026-03-15 16:03:10] `Recent Actions` 已继续产品化为“计数摘要 + 状态筛选 + truth 列”。当前 live supervision 页面会显式给出 `All/Completed/Failed` 计数与筛选按钮，并在每条历史项上显示 `fresh @ generatedAt` 或 `needs refresh`。判断最近一轮动作是否已把 truth 真正刷新到位时，优先看历史项的 `truthGeneratedAt`，不要只看 `status=completed`。
- [2026-03-15 16:35:51] `Recent Actions` 现已继续前台化为“状态 + 时间范围 + 动作类型”三维筛选，并新增 `Duration` 列。当前 live supervision 页面会显式提供 `All/1h/6h/24h` 与动态动作类型按钮；判断最近一轮监督动作时，优先先缩时间窗和动作类型，再看单行历史，不要再手工扫整表。
- [2026-03-15 16:35:51] `follow-recommendations` 已改为 truth-driven 迭代链：每一步都会重新读取最新 `runtime truth` 和推荐项，再决定下一步执行 `approve-latest-device / heal / start-node-host`。后续若 `approve-latest-device` 触发了新的 node pairing 或 node host 建议，应继续信这条迭代链，不要再把“初始 recommendations 快照”当最终动作计划。
- [2026-03-15 16:55:25] `runtime truth` 与 live supervision 已正式前台化 `Control Plane`。后续判断 OpenClaw 控制状态时，优先看 `controlPlane.approvals / sessions / presence / governance`，不要再用 agent 自述或零散 CLI 文本反推控制状态。
- [2026-03-15 16:55:25] `Control Plane` 当前稳定字段已收口为：`ask/security/askFallback/socketConfigured/agentOverrides`、`storeCount/sessionCount/defaultModel/defaultContextTokens`、`gatewayCount/backendRoles/operatorPresent/nodePresent`、`queuedSystemEvents/agentCount/agentsWithActiveErrors`；这层对象已进入 `runtime truth` 产物和 live supervision 页面。
- [2026-03-15 17:20:37] `runtime truth` 与 live supervision 现已进一步前台化 `Control Signals`：当前 canonical signals 固定为 `approvals-aligned / session-defaults-ready / backend-presence-ready / governance-clean`。后续监督应优先看这组 signal，而不是回到原始 `controlPlane` 卡片逐项人工解读。
- [2026-03-15 17:20:37] `Control Signals` 当前稳定 payload 已收口为：`status / detail / automatable / endpoint`。当前 fresh 真相下四个 signals 全部 `ok`，`recommendedActions=[]`，其中 `backend-presence-ready.automatable=false` 代表此刻无需再从 signal 面触发动作，不是能力缺失。
- [2026-03-15 18:22:52] canonical live supervision 默认入口现已加入版本淘汰逻辑：`C:\Users\Lenovo\.openclaw\bin\oc-supervise-live.ps1` 会按 `stateVersion + scriptMtimeUtc` 判断 18891 端口上的 server 是否过期；若命中旧进程，会先杀掉旧 listener 再拉起最新 `D:\Projects\vrplayer\scripts\openclaw_supervision_server.py`。`/api/ping` 现已显式返回 `stateVersion / scriptMtimeUtc / script`，默认 18891 live dashboard 也已直接带出 `Object Signals / Object Supervision / Threads / Turns / Items`，不再需要临时端口兜底验收。
- [2026-03-15 18:50:47] 对象级监督现已进入 signal/history 阶段：`D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py` 当前会稳定输出 `objectSignals / objectSupervision / objectHistory`，其中 `objectSignals` 固定为 8 个 canonical signals，并带 `group / affectedAgents`；`D:\Projects\vrplayer\openclaw_object_history.latest.json` 则持久化最近 `36` 次对象级快照。live supervision 页面已同步补齐 `Object Signals` 的 `status/group` 筛选、`Object History` 区块，以及 `Threads / Turns / Items` 的 `Last Event Age / Boundary / Roundtrip` 新列。当前 authoritative truth 下唯一对象级 `warn` signal 是 `turn-prompt-clean`，但 `toolRoundTripMismatchCount=0`、`agentsWithActiveErrors=[]` 已成立。
- [2026-03-15 19:13:07] 对象级监督历史现已继续产品化为 `signal + agent` 双聚合：`D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py` 会在 `objectHistory` 下稳定输出 `signalSummary / agentSummary`，并把每次 `warn` 快照显式带上 `warnSignals` 细节；live supervision 页面已补齐 `Object History` 的 `signal/agent` 双筛选与 `Signal Hotspots / Agent Hotspots`。当前 runtime truth 也已修正 `backend-presence-ready` 口径：确认过的用户态 node 主链（`connectedNodeCount>0` 或 `nodeRoleGrantedCount>0`）现在会被视为 `nodeOperational=true`，不会再因为 `presence.backendRoles` 未列出 `node` 而误报控制面漂移。
- [2026-03-15 19:36:39] 对象级监督的 `approval/status` 信号现已拆细为 `approval-defaults-ready / approval-socket-ready / status-session-coverage-aligned / status-queue-clean`，不再沿用粗粒度 `approval-status-linked / session-object-aligned`。当前 fresh truth 下，对象级推荐动作也已收口为 `inspect-object-supervision`；当 `recommendedActions` 给出这条动作时，优先回到对象层检查 `turn-prompt-clean` 与 `status-session-coverage-aligned`，不要先改 prompt、routing 或模型。
- [2026-03-15 19:41:19] 对象级推荐动作现已继续拆细，不再停在总入口 `inspect-object-supervision`：当前 authoritative truth 会直接给出 `inspect-turn-prompts` 和 `inspect-session-coverage`。当 `recommendedActions` 出现这两条动作时，优先把排障视线分别拉回 turn prompt 历史与 session coverage 差值，不要再先改 prompt、routing、模型或 runtime defaults。
- [2026-03-15 19:49:18] live supervision 现已把对象级手动推荐动作继续前台化成可点击监督入口：`inspect-turn-prompts` 与 `inspect-session-coverage` 会显式携带 `signalId/group`，页面按钮会直接聚焦对应 `Object Signals` 分组和 `Object History` signal 过滤。后续看到这两条 recommendation 时，优先点击进入对应对象层视图，不要先手工扫全表。
- [2026-03-15 19:55:47] live supervision 现已补齐 `Focused Inspection`：点击 `inspect-turn-prompts` 或 `inspect-session-coverage` 后，不只会改筛选，还会直接渲染对应 signal 的专用检查视图。当前 `turn-prompt-clean` 会落成 prompt drift agents 表，`status-session-coverage-aligned` 会落成 session coverage 差值摘要；后续对象级 recommendation 应优先走这种 “signal -> action -> focused evidence” 路径。
- [2026-03-15 20:26:27] `Focused Inspection` 现已从摘要视图继续推进成 authoritative `objectEvidence` 视图：`turn-prompt-clean` 会直接暴露 `promptDriftAgents + promptErrorSamples`，并显式带出 `sessionId / transcriptPath`；`status-session-coverage-aligned` 会直接暴露 `coverageDiagnosis / duplicateConfiguredAgents / missingSessionObjectRows / configuredSessionRows / sessionObjectRows`。后续排障优先消费这层 evidence，不再只看 signal 摘要。
- [2026-03-15 20:26:27] 当前 `status-session-coverage-aligned` 的活根因已钉实为 duplicate configured `telegram-fast` session rows：authoritative truth 显示 `configuredSessionCount=4`、`sessionObjectCount=3`，重复 session 为 `c7110231-7ebf-47f4-872b-fd4311cb6a2a` 与 `98f92cc1-5854-4bb6-9b25-23948ee4ecab`；`missingSessionObjectRows=[]` 已成立，因此当前更应先处理配置重复，而不是怀疑 session object 丢失。
- [2026-03-16 08:13:42] `status-session-coverage-aligned` 的 authoritative drill-down 已继续细化到 configured row 级别：`configuredSessionRows` 现固定携带 `coverageRole / coverageRoleLabel / threadSessionId / threadSessionMatch`，并新增 `duplicateConfiguredRowDrilldown`。后续区分 active row 与 stale row 时，优先看这层对象证据，不再只看 duplicate agent 摘要。
- [2026-03-16 08:13:42] live supervision 的 `Focused Inspection` 现已直接前台化 `Duplicate Session Row Drilldown`：当前 authoritative truth 已钉实 `telegram-fast` 的 `98f92cc1-5854-4bb6-9b25-23948ee4ecab` 是 active configured row，`c7110231-7ebf-47f4-872b-fd4311cb6a2a` 是 stale configured row。后续遇到 session coverage drift 时，先按 active/stale drill-down 看对象根因，再决定是否动配置或 runtime。
- [2026-03-16 08:31:23] 对象级 supervision 现已把 live coverage drift 与 stale configured row hygiene 正式拆开：`status-session-coverage-aligned` 当前只衡量 live session objects 与 visible transcripts 是否对齐，`status-stale-configured-rows` 单独承载 stale duplicate configured row。当前 authoritative truth 已确认：`status-session-coverage-aligned=ok`、`status-stale-configured-rows=warn`，且唯一 stale row 为 `telegram-fast:c7110231-7ebf-47f4-872b-fd4311cb6a2a`，active companion row 为 `telegram-fast:98f92cc1-5854-4bb6-9b25-23948ee4ecab`。
- [2026-03-16 08:58:02] `telegram-fast` 的 Telegram direct recent row 现已正式建模为有效 `surface-row`，不再当作 stale configured row。当前 authoritative truth 已对齐为：`status-session-coverage-aligned=ok`、`status-stale-configured-rows=ok`、`recommendedActions=[inspect-turn-prompts]`；最新 live `/api/truth` 的 `recentSessions` 当前显式包含 `agent:telegram-fast:telegram:direct:1262756389 -> c7110231-7ebf-47f4-872b-fd4311cb6a2a (telegram/direct)` 这条有效 surface session，而不是 stale hygiene 问题。
- [2026-03-16 09:24:47] 对象级 supervision 现已把 prompt 问题正式拆成两层：`turn-prompt-clean` 只表示 live active prompt drift，`turn-prompt-debt-contained` 单独承载 historical prompt debt。当前 fresh truth 已对齐为：`turn-prompt-clean=ok`、`turn-prompt-debt-contained=warn`、`activePromptErrorAgentCount=0`、`historicalPromptDebtAgentCount=3`、`recommendedActions=[inspect-prompt-debt]`。
- [2026-03-16 09:24:47] live `Focused Inspection` 现已补齐 historical prompt debt 专用 evidence 视图：`Historical Prompt Debt Agents / Historical Prompt Debt Drilldown / Historical Prompt Error Samples`，并显式带出 `latestHistoricalPromptErrorTimestamp / latestHistoricalPromptErrorModel / latestHistoricalPromptErrorMessage`。后续若 recommendation 为 `inspect-prompt-debt`，优先看这层 historical debt evidence，不再把旧 prompt errors 误当 live drift。
- [2026-03-16 09:49:24] `inspect-prompt-debt` 已继续产品化成 timeline 治理面：`objectEvidence.turn-prompt-debt-contained` 现固定输出 `historicalPromptDebtTimelineAgentSummary / historicalPromptDebtTimelineModelSummary / historicalPromptDebtTimeline`，live `Focused Inspection` 也已补齐 `Historical Prompt Debt Agent Hotspots / Historical Prompt Debt Model Hotspots / timeline agent filter / visibleRows`。当前 fresh truth 为 `recommendedActions=[inspect-prompt-debt]`、`historicalPromptDebtTimeline count=6`、`agentSummaryCount=3`、`modelSummaryCount=3`；后续 historical debt 排障优先消费这层聚合+筛选视图，不再只扫长表。
- [2026-03-16 10:05:18] `inspect-prompt-debt` 现已继续推进到时间窗治理视图：`objectEvidence.turn-prompt-debt-contained` 新增 `historicalPromptDebtTimelineWindowSummary`，timeline 每条 debt 事件固定携带 `windowKey/windowLabel`。live `Focused Inspection` 也已补齐 `Historical Prompt Debt Time Windows` 与 `timeline window` 过滤器。当前 fresh truth 为 `recommendedActions=[inspect-prompt-debt]`、`windowSummaryCount=1`、`firstWindow=Last 72h`；后续 historical debt 治理应优先先看时间窗，再决定是否继续按 transcript/turn 下钻。
- [2026-03-16 10:18:17] `inspect-prompt-debt` 现已继续推进到 transcript/session 级清债治理：`objectEvidence.turn-prompt-debt-contained` 新增 `historicalPromptDebtTranscriptSummary` 与 `historicalPromptDebtCleanupPriority`。live `Focused Inspection` 也已补齐 `Historical Prompt Debt Transcripts` 和 `Prompt Debt Cleanup Priority` 两块专用视图。当前 fresh truth 为 `recommendedActions=[inspect-prompt-debt]`、`transcriptSummaryCount=3`、`cleanupPriorityCount=3`、`firstPriority=P2/Next`；后续 historical debt 清理应先看 priority 表，再回到 transcript timeline。
- [2026-03-16 10:57:48] `inspect-prompt-debt` 现已继续推进到 cleanup rules：`objectEvidence.turn-prompt-debt-contained` 新增 `historicalPromptDebtCleanupRules` 与 `historicalPromptDebtTurnRules`。当前 transcript 级规则已固定覆盖 `rebaseline-prompt-baseline / queue-transcript-cleanup / archive-historical-debt / observe-only`，turn 级规则则负责把每条债锚到 latest debt turn；后续如果推进不能改变清理动作或停止条件，就不要继续细分表格。
- [2026-03-16 10:57:48] 笔记本断网恢复后的 runtime heal 已收口：先跑 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` 再 fresh `runtime truth`。当前最新 fresh truth 为 `recommendedActions=[inspect-prompt-debt]`、`browserRunning=true`、`browserCdpReady=true`、`connectedNodeCount=1`；因此网络恢复后的主判断应优先回到 prompt debt 治理，不要把 browser/nodes 重新误判成活故障。
- [2026-03-16 11:16:06] `inspect-prompt-debt` 现已继续推进到 execution/stop criteria：`objectEvidence.turn-prompt-debt-contained` 新增 `historicalPromptDebtExecutionPlan` 与 `historicalPromptDebtStopCriteria`。live `Focused Inspection` 也已补齐 `Prompt Debt Execution Plan / Prompt Debt Stop Criteria`。当前 fresh truth 为 `recommendedActions=[inspect-prompt-debt]`、`executionPlanCount=3`、`stopCriteriaCount=3`、`firstExecution=E2/Next/rebaseline-prompt-baseline`、`firstStop=S2/P2`；后续如果做不到把这些计划真正落成自动清理动作，就停止继续细分监督面。
- [2026-03-16 11:36:51] `prompt debt` 当前不存在可直接复用的真实清理原语：`openclaw sessions cleanup --all-agents --dry-run --json` 返回 `wouldMutate=false`，不会处理这批 transcript。后续若 debt 仅落在 `24h/72h` 近窗且无 active prompt drift，监督层应改为 `deferredReview=true + nextReviewAt`，并从 `recommendedActions` 移除 `inspect-prompt-debt`；只有出现真正可执行 backlog 时才恢复这条 recommendation。
- [2026-03-16 11:48:10] `deferred review` 不能只埋在 truth JSON 里。当前 live `Focused Inspection` 已新增 `Prompt Debt Review State`，会直接显示 `Deferred Review / Next Review / Recommendation`。后续若 `recommendedActions=[]` 但 `turn-prompt-debt-contained=warn`，先看这张卡判断是否只是延后复查，不要误当成漏了动作。
- [2026-03-16 12:29:53] 对象级监督里，`approval-defaults-ready / approval-socket-ready / status-queue-clean` 已升级成专用 recommendation 与 `Focused Inspection` evidence，不再埋进泛化的 `inspect-object-supervision`。当前这三类 signal 均为 `ok` 时，排障主线应继续看真实运行阻塞（例如 browser runtime），不要回头在 approval/status 上做表面排查。
- [2026-03-16 12:56:03] `browser runtime` 现已正式进入对象级监督主线：`runtime-browser-ready` 会单独产出 `inspect-browser-runtime` recommendation，并在 live `Focused Inspection` 里直接暴露 `Browser Runtime State / Browser Runtime Recovery`。当 `browserRunning=false` 或 `browserCdpReady=false` 时，后续排障应先看这层对象证据与 `heal-runtime`，不要再先回头查 approval/status 或 prompt debt。
- [2026-03-16 13:25:04] `Phase Readiness` 现已成为第二阶段 supervision 线的正式 stop criteria。当前 authoritative truth 以 `summary.phaseReadiness` 为准；当 `status=sealed`、`blockingKeys=[]`，且只剩 `turn-prompt-debt-contained + deferredReview` 时，停止继续细分 supervision 面，转入下一产品阶段。
- [2026-03-16 13:32:05] `oc-supervise-live` 的版本淘汰不能只看磁盘上的 `scriptMtimeUtc`。`openclaw_supervision_server.py` 现在会在进程启动时固化 `startupScriptMtimeUtc + startupScriptSha256`，`C:\Users\Lenovo\.openclaw\bin\oc-supervise-live.ps1` 也改为按这组 startup fingerprint 判断是否复用 18891 端口上的 live server。后续若页面 HTML 没吃到新模板，先看 `/api/ping` 的 `startupScript*` 是否与当前文件一致，不要再被旧进程读取新文件 mtime 的伪新鲜状态误导。
