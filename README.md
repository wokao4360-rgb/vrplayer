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

- `...?museum=wangding&scene=era_chapter&editor=1`
- `...?museum=yanghucheng&scene=east_room_1&tilesDebug=1&metrics=1`

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

- [2026-03-21 17:24:09] `SceneTransitionController` / `TravelTransitionOverlay` 链路里，`targetPreviewImage` 或 preview shell ready 绝不等于 target scene ready；当前稳定基线：只有 `loadCommitted=true` 且收到目标场景 `LOW_READY/HIGH_READY/DEGRADED` 后，`isTargetSceneReadyForReveal()` 才能返回 true。若后续又回到“目标预览一有图就整张铺到中央”，第一优先检查 `markTargetReady()`、`isTargetSceneReadyForReveal()` 和 preview image 注入是否重新耦合了。
- [2026-03-21 17:24:09] transition reveal 的时间线必须锚定 `targetReadyProgress`，不能直接沿用全局 `progress`；当前稳定基线：`sceneTransitionTimeline.ts` 里的 `resolveTargetRevealState()` 必须从 `targetReadyProgress` 重新起算 `revealProgress / targetMixProgress / targetFocus`，避免 target 晚 ready 时直接跳成整张 target pano 平板。若后续又出现“目标低清刚 ready 就整张贴上来”，第一优先检查这条 ready-anchored reveal 逻辑是否被回退。
- [2026-03-21 17:24:09] `showScene()` 安装新一轮 `setOnStatusChange()` 后，未 `commitSceneLoad()` 前的 ready 事件不属于目标场景，禁止推进 transition、shell ready 或新场景 UI；当前稳定基线：只有 `shouldForwardCommittedSceneStatus(sceneLoadCommitted, status)` 为 true 时，才允许 `transitionSession.markStatus()`、`SCENE_LOW_READY/HIGH_READY/DEGRADED_READY`、`mountCore()`、`scheduleFeatureWarmup()`、`loading.hide()` 进入目标场景链路。若后续又出现旧场景 ready 污染新转场，先查这层 gate。

- [2026-03-21 12:53:38] `Loading` 旧等待层禁止在 hidden 状态继续把 spinner / “加载中...” 留在 DOM 或可访问树里；当前稳定基线：`Loading.ts` 只能在 `show()` 时注入内容，`hide()` 后必须清空内容并恢复 `aria-hidden=true`。若后续切点验收里又看到等待页文案或自动化快照仍能抓到“加载中...”，第一优先检查 `Loading.ts` 是否在 constructor 或 hidden 状态提前 render。
- [2026-03-21 00:46:00] 转场与场景进入链路禁止再向用户暴露任何状态 badge/toast；当前稳定基线：`SceneUiRuntime` 不再挂 `QualityIndicator`，`Hotspots` 不再在 scene jump 前弹“进入 xxx”，`PanoViewer` 的瓦片/高清失败提示只留日志不再 show toast。若后续线上又出现“正在加载低清图”“已切换至高清”或进入提示，第一优先检查 `sceneUiRuntime.ts`、`Hotspots.ts`、`PanoViewer.ts` 是否把状态 UI 恢复了。
- [2026-03-21 00:35:00] `scene -> scene` 转场禁止再把 `captureViewerSnapshot()` 当默认中央 source；当前稳定基线：`resolveSceneTransitionAssets()` 必须优先用 target `previewUrl` 作为 transition shell，`viewerSnapshot` 只能留在没有 target/previous preview 时兜底。若后续又回到“旧场景整张糊在中央”或“街景/人物鬼影占屏”，第一优先检查 `sceneTransitionAssets.ts` 是否把 `viewerSnapshot` 又提回 `fromImage` 首选。
- [2026-03-20 23:40:30] `scene -> scene` 且 `targetReady=false` 时，不能只靠旧场景 blur 顶住；当前稳定基线是 `TravelTransitionOverlay` 在 `targetImageLoaded=true` 后允许极低权重的 `target preview shell` 以重模糊玻璃影提前介入，但真正 `target reveal / mix ready` 仍必须继续受 `frame.targetReady && overlay.targetImageLoaded` 共同约束。若后续又回到“中段看起来还是上一个点位本体”，优先检查 `uTargetPreviewLoaded`、`previewPresence` 和 fallback target backdrop 的预览壳层注入是否被删回。
- [2026-03-20 22:40:21] `cover` 进入点位时，transition 的 `fromImage` 不能再在 `previewAlreadyReady=false` 时回退到 `hero-cover`；当前稳定基线：`main.ts` 必须优先把 `shellScene.preview.url / panoLow` 当作 transition source shell，只把 cover hero 留作最后兜底。若后续又出现“封面飞脸 / 王鼎遗像在中央晃糊了”，第一优先检查 `resolveSceneTransitionAssets()` 是否被回退到 `cover hero -> fromImage` 路径。
- [2026-03-20 09:40:00] cover CTA/导览切点的转场源图不能再把 `hero-cover.jpg` 或 `captureViewerSnapshot()` 当成全屏主体去做大面积 blur/smear；当前稳定基线：`TravelTransitionOverlay` 只允许旧场景保留“源侧边缘遮挡 + 玻璃残影”，中央主视觉必须尽早交给 target preview/low，禁止再出现“中央人物拖影/鬼片感”。
- [2026-03-20 09:40:00] target preview 未 ready 时，transition progress 只能停在 travel hold，禁止进入 settle 语义或显示任何“已到目标场景”的视觉暗示；若后续又出现 badge/动画已经像 finish 但画面仍是上一场景，第一优先检查 `sceneTransitionGate.ts` 的 `TARGET_READY_HOLD_PROGRESS` 是否回退到 settle 区间。
- [2026-03-20 19:08:00] `TravelTransitionOverlay` 必须保持“纯视觉层”，禁止再挂任何阶段文案/徽标 DOM；上一轮残留的 `badge` 因 CSS 同规则内 `display: none` 又被 `display: inline-flex` 覆盖，直接把“Settling on target scene”漏到用户视野。后续若线上再出现转场说明文字，第一优先检查 overlay 是否又混入可见文案节点。
- [2026-03-19 15:10:00] 场景切换在 target scene commit 之后，transition camera 的 yaw 语义必须立即切到 target scene 再做 `worldYawToInternalYaw()`；禁止 commit 后继续拿 previous scene 做 world/internal 转换补偿。当前稳定基线：`SceneTransitionController.onCameraFrame` 只透出 `useTargetScene` 上下文，`main.ts` 只复用现有唯一入口 `worldYawToInternalYaw()/internalYawToWorldYaw()`，不允许再新增第二次取反或组件内私有补偿。
- [2026-03-19 15:10:00] `TravelTransitionOverlay` 现已固定为“WebGL compositing shader + from/to 双层 blurred fallback backdrop”架构：target preview/low 未 ready 时继续用模糊后的上一点位顶住，target ready 后通过 directional wipe + local distortion + targetMix/settle 接管；禁止退回等待页、黑屏、白屏或单层 CSS 假过渡。

- [2026-03-19 13:10:00] museum shell / hotspot / 导览切点的过渡层现在必须统一走 `SceneTransitionController + TravelTransitionOverlay`，禁止再让 `MuseumShellChrome` 复活旧的中心等待卡片。当前稳定基线：`MuseumShellChrome.transitionLayer` 永久 `hidden + aria-hidden`，其 `showEnterPreloading/startSceneTransition/markPreviewReady/markSharpening/showErrorFallback/completeTransition` 只保留签名，不再产生任何可见 UI；所有真实过渡只能由 `main.ts -> sceneTransitionController.start()` 驱动。
- [2026-03-19 13:10:00] 场景切换不得在 `LOW_READY/preview ready` 时提前露出目标场景。当前稳定基线：`SceneTransitionController` 默认 `releaseMode='high'`，进度先 hold 在 `TARGET_READY_HOLD_PROGRESS=0.92`，只有 `LoadStatus.HIGH_READY / DEGRADED` 或失败兜底才允许 release 到 1；如果后续又出现“点击开启 VR 漫游后首屏还是糊的，转到后方才变清晰”，第一优先检查 `sceneTransitionGate.ts` 的 release gating 是否被回退。
- [2026-03-18 15:10:00] museum shell cover 阶段若要真正争取 CTA 后的首屏清晰时间，不能只预热 `hero-cover.jpg`、`low.jpg` 和 tile blob；必须连当前首屏 `6` 张 low AVIF 与前半球 `12` 张 hero high AVIF 的 `ImageBitmap` 解码结果一起预热，并在 viewer 接管时复用同一份 decoded bitmap / blob promise。若后续再次出现“封面阶段 Network 已经把首屏块图拉完，但点击开启 VR 漫游后首屏仍是一整屏糊图，只有转到背面才变清晰”，第一优先检查 `museumShellPreloader.ensureDecodedTile()`、`bitmapWorker` 的 decoded cache，以及 `CubeCanvasPano` 是否错误地在首帧绘制后立刻 `bitmap.close()` 破坏了 handoff 复用。
- [2026-03-18 11:35:00] cubemap 首屏 hero 调度必须统一以“internal 几何朝向”判定可见半球，不允许 museum shell 预热和 viewer 接管分别用两套坐标系。当前稳定基线：`museumShellPreloadPlanner` 先把 route/world 视角通过 `worldViewToInternalLoadView()` 转成 internal load view，再调用 `buildCubeLowFaceOrder()` / `buildCubeVisibleHighFaces()`；`CubeCanvasPano` / `CubeMeshPano` 直接基于 `camera.getWorldDirection()` 的 internal yaw/pitch 选 low/high faces，禁止再通过 `internalYawToWorldYaw()` 还原回 world 后选面。若后续再出现“封面阶段已拉 hero tiles，但点击 CTA 后首屏仍糊、必须转到背面才清晰”，第一优先检查这条 internal/world 调度基线是否被回退。
- [2026-03-18 11:35:00] museum shell 转场不能把 `tilePano.load()` 或 `viewer.onLoad()` 当成 `HIGH_READY`。当前稳定基线：`PanoViewer` 只有在 tiles 真正 `onFirstDraw` 后才能上报 `LOW_READY`，`main.ts` 的 museum shell 只能在 `LoadStatus.HIGH_READY / DEGRADED` 时执行 `completeTransition()`；若在 `load()` resolve 或 `onLoad()` 时提前结束转场，会把低清预览/未 prime 的 tiles 直接暴露给用户，表现为“点击开启 VR 漫游后首屏一整屏糊图”。
- [2026-03-17 14:25:00] 自定义域名 `研学.xyz / xn--48s508d.xyz` 线上验收时，若 Network/Console 里再次出现 `raw.githubusercontent.com ... net::ERR_FAILED`、`config.json?__cdn_probe=` 或大量 `sw.js` 二次资源行，第一优先检查两条基线是否被回退：`public/config.json.assetCdn.enabled` 必须保持 `false`，`public/sw.js` 必须保持“被动 worker”模式（不再拦 JS/CSS/全景资源请求）。否则会出现同一场景一部分资源走同源、一部分走外部 CDN/Service Worker 的混合链路，直接导致 cover 阶段和 CTA 后的重复请求、失败请求与顺序错乱。
- [2026-03-17 14:25:00] museum cover 的正确预热顺序是：先显式预热 `hero-cover.jpg` 并将其转成 blob URL 交给 `MuseumShellChrome`，再预热 `scene preview(low.jpg)`，随后再进入首屏 `6` 张 low AVIF 与前半球 `12` 张 high AVIF；CTA 接管时必须复用同一条 `warm()` promise，禁止重新起第二份 museum-entry 预热。若用户再次反馈“点击开启 VR 漫游后又从头传、Console 一片红”，优先排查 `main.ts` 里的 `warmMuseumShellScene()` 去重是否被绕开。

- [2026-03-17 00:20:00] cubemap viewer 运行时的首批 low/high 面优先级必须基于 world yaw，而不是 three.js internal yaw。`museum shell` cover 预热用的是 world 视角，`PanoViewer` 接管后若直接拿 `camera.getWorldDirection()` 算内部角度，会把首屏前后半球翻转，表现为 cover 阶段先拉对的 `high/b|l|r/*`，点击进入后 viewer 又补错的 `high/f/*`。修复基线：`CubeCanvasPano` / `CubeMeshPano` 在调用 `buildCubeLowFaceOrder()` 与 `buildCubeVisibleHighFaces()` 前必须先通过 `internalYawToWorldYaw()` 还原成 world yaw。
- [2026-03-17 00:20:00] asset CDN probe 不得并发 race 多个 base URL，否则胜者返回后其余探测会以 `net::ERR_ABORTED` 残留在 Network。当前基线：`assetResolver` 按 `public/config.json.assetCdn.baseUrls` 顺序串行探测，默认首选 `raw.githubusercontent.com`，仅当首选失败时才回退到后备源；`museum shell` cover 计划不再重复预拉 `hero-cover`，tile manifest 预热也必须等 `waitForAssetResolverReady()` 后再取 URL，避免 cover/viewer 之间出现轻量重复请求。
- [2026-03-17 10:45:00] assetResolver 命中有效的 `vrplayer.assetCdn.lastSuccess` 缓存后，必须直接采用缓存 base URL 并跳过后台 refresh probe；否则 Network 里仍会出现额外的 `config.json?__cdn_probe=...` 成功/失败噪声，用户会把它误判成资源错误。
- [2026-03-17 10:45:00] museum shell 的 scene preview 必须先经 `imageBlobCache` 预热，再把 blob URL 传给 `showScene()/PanoViewer`；`fetchTileManifest()` 也必须做进程内 promise 级复用。否则 CTA handoff 会把同一个 `*-low.jpg` 和 `manifest.json` 再下载一遍，即使封面阶段已经 ready。

- [2026-03-16 21:25:00] museum shell 的 `warm()` 执行层现已固定为 `L0/L1/L2`：cover / ENTER_PRELOADING / scene-transition 阶段必须在 `hero-cover.jpg`、scene preview、manifest 之后继续预热首屏 `low-face` 与前半球 `hero-high-tile`，用封面停留时间争取首屏出图；但这些 AVIF tile 必须在 `waitForAssetResolverReady()` 之后统一走共享 blob 缓存（`imageBlobCache` + `bitmapWorker` 传 blob 而非 URL），并且 tile builder 必须按当前 asset CDN 状态实时解算 URL，确保 cover 预热和 viewer 接管命中同一条 CDN URL，不得出现“cover 拉 Pages 源、viewer 又拉 raw CDN”的双份传输。若后续又出现“缓冲页已经拉过图，点击进入后黑屏并把同一批 tile 重拉一遍”的现象，第一优先检查 `museumShellPreloadExecution` 是否丢了 `L2`，以及 `waitForAssetResolverReady` / `buildCubeLowFaceUrl` / `buildCubeHighTileUrl` / `decodeImageBitmapInWorker` 是否重新退回 URL 漂移或双 fetch。
- [2026-03-16 20:15:00] 所有 `tileFormat=avif` 的全景球运行时现已锁定为 `AVIF-only`：manifest 里的 `lowFallbackFormat=jpg` 与 `highFallbackFormats=[ktx2,jpg]` 仅保留为静态资产元数据，不再进入实际请求候选；`PanoViewer` 也不再在 AVIF 失败时自动切到 `KTX2/JPG` mesh 或整图 fallback。后续若线上仍出现 `.ktx2` 或 `.jpg` 的全景球请求，第一优先检查 `tileFormatPolicy` 与 `shouldAllowLegacyTileFallback()` 是否被绕过。

- [2026-03-16 18:35:00] museum shell 的长期实现约束已经补齐为显式三层：`museumShellManifest` 负责把 legacy config 归一成 cover / preview / hires / neighbors 的配置驱动 schema；`museumShellStateMachine` 负责 `COVER -> ENTER_PRELOADING -> SCENE_PREVIEW_READY -> SCENE_SHARPENING -> SCENE_ACTIVE / ERROR_FALLBACK` 的单一状态真相；`museumShellPreloadPlanner` 负责 `L0/L1/L2/L3` 资源分层。后续新增转场或预热规则时，优先改这三层，不要再把状态散落回 `main.ts`。
- [2026-03-16 18:35:00] museum shell 转场视觉现已固定为“上一帧 snapshot + blur + frosted veil + preview crossfade + sharpening exit”。`MuseumShellChrome` 不再只是文案遮罩：目标 scene 的 low preview 一 ready 就必须 crossfade 接管，低清进场后仍保留轻模糊，直到 `HIGH_READY/DEGRADED` 才退掉转场层。若后续又出现点击热点后黑屏或瞬切，优先回查 `MuseumShellChrome` 与 `MuseumShellStateMachine` 的阶段推进，而不是先改 viewer。

- [2026-03-16 15:40:00] 单馆入口现已锁定为 museum shell：`?museum=<id>` 必须先显示馆级 `cover gate`，CTA 才进入目标场景；首次 deep link `?museum=<id>&scene=<id>` 也先显示封面，再进入该 scene。后续若又出现“museum 路由直接跳首场景”的行为，优先回查 `resolveMuseumShellRoute()`，不要再在路由入口里做无条件重定向。
- [2026-03-16 15:40:00] 同馆场景切换现已锁定为“复用同一 viewer shell + 浅路由 + 过渡层遮挡加载”：scene 变化只能 shallow update URL，不允许销毁 `PanoViewer` 根实例；相机转动只允许 `replaceState` 同步 `yaw/pitch/fov`，且必须保留 `tilesDebug/debug/fresh` 等既有 query。转场层必须保留上一帧快照并拦截 pointer，直到目标场景达到 `LOW_READY/HIGH_READY/DEGRADED` 再退场。
- [2026-03-16 08:30:00] 全馆 cubemap rollout 当前统一收口为 `south_gate` 规范：每个已扫描场景都必须在 `public/config.json` 中配置 `scene.panoTiles.manifest`，资源目录固定为 `/assets/panos/tiles/<museum>/<scene>/manifest.json`，manifest 固定 `type=cubemap-tiles`、`tileFormat=avif`、`lowFallbackFormat=jpg`、`highFallbackFormats=[ktx2,jpg]`、`lowFaceSize=512`、`highTileSize=1024`、`highGrid=2`、`highWarmupTileBudget=12`。未来给新馆补齐这套资源时，先改 `public/config.json`，再运行 `npm run tiles:museum:cubemap -- --museum <museumId>`，不要再为单馆单点位维护第二套块图规范。
- [2026-03-16 08:30:00] cubemap 首屏加载顺序不能绑死在 `f/b/r/l/u/d` 文件名上，必须始终以场景当前首屏朝向（`initialView.yaw` / URL `yaw`）推导“世界前方半球”。当前稳定规则是：低清按“前、左、右、上、下、后”加载；高清首屏只加载当前前半球 3 个面的 12 张 `1024x1024` AVIF，后半球继续留在低清，等用户转到对应半球时再补传输与渲染。若场景存在 `assetFaceByWorldFace`（如 `linzexu/south_gate` 的 `f/b` 互换），它只负责 world face 到 asset face 的映射，不得篡改前半球判定规则。
- [2026-03-16 09:48:00] `assetFaceByWorldFace` 现在是全量 cubemap manifest 的必填规范，不再允许只给单场景特判。当前稳定基线是：所有 `/assets/panos/tiles/**/manifest.json` 都必须显式声明 `{ "f": "b", "b": "f" }`；运行时 low/high 两层统一通过这条映射解算 asset face。若 rollout 后再次出现“正前方/正后方高清方块错位”，第一优先检查是否有新场景漏写这条 manifest 映射，而不是先改渲染器。
- [2026-03-16 11:30:00] 全量 cubemap 在采用 `{ "f": "b", "b": "f" }` 的 `assetFaceByWorldFace` 后，`initialView.yaw` / URL `yaw` / `northYaw` 仍必须保持“世界朝向”产品语义，不允许因为 asset face 互换把默认首屏翻到原图背面。当前稳定基线是：cubemap 场景默认额外补 `180°` world yaw 偏移，再统一做一次 `internalYaw = -(worldYaw + worldYawOffset)`；若个别场景例外，只允许在 `scene.panoTiles.worldYawOffset` 上显式覆写，禁止在渲染器、罗盘或 URL 分支里各自再补一套符号修正。

- [2026-03-15 19:18:00] `south_gate` ?????????? face ????????????????????????? `assetFaceByWorldFace` ????? `/assets/panos/tiles/**/manifest.json` ? service worker ? `staleWhileRevalidate` ?????????? manifest ??????????? tile ???????????????? manifest ???????????? manifest URL??? SW ? manifest ??????

- [2026-03-15 19:20:00] cubemap ??????????????????????/?/?/?/?/?????????? `f/r/b/l/u/d` ??????????????????????????????????????? 3 ??? 12 ? `1024x1024` tile?????????????????????????????????????????????????????????


- [2026-03-15 17:43:59] `/assets/panos/tiles/**/manifest.json` ????? service worker ? `staleWhileRevalidate`?????? face ???tile ?????????? manifest ?????????????????????????tile manifest ???? `no-store`?SW ?????? `networkOnly`?????? `?fresh=` ??? manifest URL ????????

- [2026-03-15 17:04:24] ?? cubemap ????? face ????? viewer ????????????? `cubeTileScene` ? face ???????? manifest ?? `assetFaceByWorldFace` ? scene ???????? `linzexu/south_gate` ???? `f -> b`?`b -> f`?low/high ????????????

- [2026-03-15 11:10:00] `cubemap-tiles` ? 2x2 AVIF face ?????? `drawImage` ????? Canvas atlas???????????????????????????????/???????????????????`CubeCanvasPano` ??? tile ?????????? `1px` atlas bleed??????????? face canvas??
- [2026-03-15 21:20:00] `linzexu/south_gate` ???????? `cubemap-tiles`???????? `6` ? `512x512` low face + `24` ? `1024x1024` high tile???????????????????????? `equirect-tiles`???????? low face ?????? high tile ???????? `24` ??? ready ????????
- [2026-03-15 15:41:00] cubemap ???????? manifest ?????????? low/high ???????`south_gate` ?????? AVIF ????????????????? `512/1024`???? `tilesDebug` ?? `requestBudget` ? `lastTilePixels`????? Network ?????????????

- [2026-03-14 21:39:40] `cubemap-tiles` ???????? + BackSide?????????????????????????????????? face root ????????`f:PI, b:0, r:-PI/2, l:+PI/2, u:+PI/2, d:-PI/2`??Canvas ? Mesh ???????? `FrontSide`?
- [2026-03-13 19:02:00] ????6 ? 512 low + 24 ? 1024 high + ????????????? cubemap ?????`equirect-tiles` ? `1x1/2x1/4x2/8x4` ????????????????????????????????? `cubemap-tiles` manifest ? face/tile ???
- [2026-03-13 18:14:37] Canvas ????????? tile ??? `imageOrientation: 'flipY'`??????????????????????????????tile bitmap ???????? atlas `CanvasTexture.flipY = true` ?????
- [2026-03-13 18:14:37] ?? `vite preview` ????? `assetCdn`?`/assets/panos/**` ??????? `docs` ????? `public` ??????? tile manifest/???????????????? source asset ?????????????? CDN ????????

- [2026-03-13 16:05:00] AVIF ???????? `fallbackPanoLow/panoLow`?`PanoViewer` ?? Canvas ????????fallback ???????????? z0/low tile?????????? `panoLow.jpg -> ?? avif`????? `avif -> jpg` ????????????AVIF ??????? `z0/low avif`?fallback ????????????????????
- [2026-03-13 15:38:00] AVIF 块图主链路当前已收口为：低层 `avif -> jpg`，高层 `avif -> ktx2 -> jpg`。关键约束是：Canvas 路径只负责 `avif/jpg`，若高层 AVIF 失败且存在 `ktx2` fallback，必须由 `PanoViewer` 触发一次性后端切换到 `TileMeshPano`，不要在 Canvas 内直接跳到 JPG，否则会把 KTX2 高清兜底链路短路掉。
- [2026-03-13 12:52:26] 当前站点全局 `body` 仍保持 `overflow: hidden` 以服务全景页；首页/馆入口页若要可滚，页面根容器必须自己成为固定高度滚动层（如 `height: 100% + overflow-y: auto + -webkit-overflow-scrolling: touch`）。只给 `min-height` 不给固定高度，会出现“看起来是长页但实际上滑不动”。
- [2026-03-12 17:42:01] 首页营销封面若放在 `/assets/covers/**`，必须同步把 `/assets/covers/` 纳入 `assetCdn.includePrefixes`；否则全景资源会走加速而首页封面仍直连 Pages，首屏出图会明显慢一截。
- [2026-03-12 17:42:01] Windows PowerShell 5.1 直接 `Get-Content` 无 BOM UTF-8 源文件时，可能把正常中文显示成假乱码。判断源码是否真的损坏，优先用 Node `fs.readFileSync(..., 'utf8')` 或直接跑测试，不要只凭终端显示二次改坏文件。
- [2026-03-12 13:51:58] 导览封面与场景列表当前共用 *-thumb.jpg；为了首屏速度，thumb 预算收口为单张 ≤ 16KB。Windows 下批量压缩 JPG 时不能直接覆盖原文件，必须先写临时文件再 rename，否则会偶发 UNKNOWN open。
- [2026-03-12 13:51:58] 若要让 KTX 块图继续走 ssetCdn 加速，tile manifest 与目录必须保持在 /assets/panos/tiles/<museum>/<scene>/manifest.json 这一条 /assets/panos/ 前缀下；改到别的目录会绕过 CDN URL 改写。

- [2026-03-12 10:25:00] Windows PowerShell 5.1 下用 Set-Content -Encoding utf8 回写 public/config.json 会自动带 BOM；Node 侧直接 JSON.parse(fs.readFileSync(..., 'utf8')) 会把 BOM 当成非法字符。以后脚本写配置时必须改用 UTF-8 无 BOM（如 [System.IO.File]::WriteAllText(..., (New-Object System.Text.UTF8Encoding(False)))），并在回归测试里直接读一次源配置确认无 BOM。

- [2026-03-12 09:27:47] Windows 下若用脚本重写 `public/config.json` 且内容含中文，不能只看“UTF-8 编码检查通过”；中文被直接写成 `?` 仍会通过编码门禁。改完配置后必须额外抽查关键中文字段（如馆名、场景名）在源码文件与线上 `/config.json` 中都保持原文。
- [2026-03-12 20:32:00] 自定义平面图拓扑现在以 `museum.map.nodes / museum.map.paths` 为单一事实源；一旦某馆配置了这套结构，`StructureView2D`、`MapPanel`、旧 `MapOverlay` 与 `sceneGraph` 兜底拓扑都必须优先读取它，不能再各自从 `scene.mapPoint` 私下重建第二套点位关系。`scene.mapPoint` 只保留给旧馆兼容和无 floorplan museum 的回退。

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
- [2026-03-09 15:40:00] Memory 主通道的复利工程已单独沉淀到 `D:\Projects\vrplayer\memory_mcp_compound_playbook.md`。以后排查记忆写入时，优先看这份手册里的真源、SOP、去重口径与恢复顺序；`mcp__memory` 图谱工具不作为本仓主记忆通道。
- [2026-03-09 15:26:00] 当前窗口的 OpenClaw 复利工程已单独沉淀到 `D:\Projects\vrplayer\openclaw_compound_playbook.md`。以后排查 `telegram-fast` 的模型漂移、项目路由、session reset、真源判断时，优先读这份手册，不要只翻历史聊天或旧截图。
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
- [2026-03-08 23:05:00] 当用户要求进入长期自治循环时，不要停在“等用户下一句”。每轮至少完成 1 份外部网页/官方资料采样、1 份本地转写/灵感库采样、1 条新的可执行 backlog，并把结果写回 `task_plan.md / progress.md / findings.md / supervisor_brief.md / pending_execution_plan.json`。只有红灯风险才暂停；普通研究、收敛和方案生成不等待用户确认。
- [2026-03-08 23:12:30] 长期自治循环中的用户可见回复应改为“过程型进度更新”，避免用收尾式总结把线程停住。除红灯风险或用户明确要求总结外，不使用“完成/接下来/等你回复”这类交棒式结束语。
- [2026-03-09 00:20:00] Memory Management 用例当前只吸收低风险三件套：`Three-Tier Memory` 采用“长期层(MEMORY+HTTP memories) / 项目层(ASYNC+BRIDGE+pending plan) / 新鲜度层(supervisor/morning/heartbeat views)”映射；`Heartbeat State Monitor` 采用被动 freshness 视图 `contextctl.ps1 -Action heartbeat-state`，不打开常驻 heartbeat；`Safe Operations Ledger` 采用显式账本 `SAFE_OPERATIONS.md + safe_ops_ledger.latest.{md,json}`。`self-improving-agent` 只保留只读评估与规则草案，不允许运行时自动改写生产策略。
- [2026-03-09 08:05:30] `heartbeat-state` 的产品语义已收口到“官方 OpenClaw 主链健康优先”：`safe_ops_ledger / supervisor_digest / telegram_realtrace` 属于主判断项，`ops_health` 仅保留为辅助治理信号，避免旧 V1 试运行/评估 freshness 噪声把 kyuu 主链误判成故障。`self-improving-agent` 的当前外部仓结构证明它更像“learn log + promotion + optional hooks”，现阶段只借鉴其记录/提升机制，不直接装进生产主链。
- [2026-03-09 10:10:48] 三馆学伴云函数错误包兼容：当 `fcChat.endpoint` 返回 `{RequestId, Code, Message}` 且 HTTP 非 2xx 时，前端必须优先解析并展示真实服务原因。已验证 `403 + AccessDenied + Current user is in debt.` 应显示为 `请求失败：服务暂不可用（云函数账户欠费，HTTP 403）`，不要再笼统落成 `服务返回异常数据`。
- [2026-03-09 11:20:00] OpenClaw 接 `AIClient2API(127.0.0.1:3000)` 时，不要把返回体里的 `model: gpt-5.4` 当成“真走了 GPT-5.4”。当前稳定命中 Codex/OpenAI 路由的做法是使用带 provider 前缀的 `openai-codex-oauth:gpt-5.4`；裸模型名 `gpt-5.4` 在现有多 provider 运行时下仍可能被前置 provider 偷吃并回落到 Gemini。
