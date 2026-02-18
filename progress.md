# progress.md

## 2026-02-11 18:57:19
- 确认进入执行模式，分支为 `main`，工作区干净。
- 按用户要求开始实施计划，并要求执行过程中使用 Context7。

## 2026-02-11 18:59:03
- 使用 Context7 获取 Vite 文档依据：`build.modulePreload.resolveDependencies` 与 `manualChunks` 相关说明。
- 使用 Context7 获取 MDN 依据：Service Worker 对跨域 opaque 响应缓存策略要点。

## 2026-02-11 19:02:10
- 新增 `src/utils/imageRequestScheduler.ts`，实现分通道并发调度：`tile/pano/preload/ui`。
- 并发档位采用“稳中求快”：桌面（6/3/2/4）与移动（4/2/1/2）差异化策略。

## 2026-02-11 19:03:21
- 重写 `src/utils/externalImage.ts`：移除全局并发=2，改为按通道调度。
- `ExternalImageLoadOptions` 新增 `channel`，并保持原有超时/重试/fetch fallback 行为。

## 2026-02-11 19:03:56
- 接入调用链路：
  - `src/viewer/PanoViewer.ts` 加入 `channel: 'pano'`
  - `src/viewer/TileCanvasPano.ts`、`src/viewer/TileMeshPano.ts` 加入 `channel: 'tile'`
  - `src/ui/preloadManager.ts` 改为通过 `loadExternalImageElement(..., channel: 'preload')`

## 2026-02-11 19:04:31
- `src/utils/assetResolver.ts`：CDN probe 改并行竞速，默认超时由 1800ms 收敛为 1000ms。
- `public/config.json`：`assetCdn.probeTimeoutMs` 同步调整为 1000。

## 2026-02-11 19:04:58
- `public/sw.js`：
  - 升级 `CACHE_VERSION`
  - 支持跨域全景资源缓存
  - 对跨域全景请求允许缓存 opaque 响应
  - 继续保持 `/config.json` network-only

## 2026-02-11 19:05:13
- `src/viewer/PanoViewer.ts`：
  - 输入事件改为“增量累计 + 每帧应用”
  - 默认关闭自动 tile 节流降载（仅 `?tileThrottle=1` 时启用）
  - 保持 RAF 全速渲染
- 重新整理 `task_plan.md/progress.md/findings.md` 为简体中文可读内容。

## 待执行
- 运行 `npm run build` 验证 TypeScript 与打包结果。
- 使用 chrome-devtools 做 snapshot + network + console 证据采样。
- 如验证通过，执行发布 SOP（dist -> docs -> commit -> push）。

## 2026-02-11 19:15:19
- 执行 `npm run build`，构建成功；关键产物：`index-CQkzrWWN.js 77.43kB`、`PanoViewer-V7D8Ehe8.js 71.21kB`、`three-core 513.43kB`。
- 复核 `dist/index.html`：无 `three-extras` 的 `modulepreload`。
- 通过 `chrome-devtools` 完成 `snapshot + network + console` 采样：
  - 未交互前无 `chat-community` 请求；
  - 点击“导览”后出现 `chat-community-BRM8ZAeZ.js` 与 `store-B83L8bDT.js`；
  - console 仅剩非阻断 warning/issue（无持续增长型错误）。

## 2026-02-11 19:15:19
- 修复 `README.md` 持久化记录乱码并统一为 UTF-8；补充第四轮优化结论条目（含完整时间戳）。
- 当前待执行：按 SOP 发布（`dist -> docs -> commit -> push`）。

## 2026-02-11 19:19:01
- 按 SOP 完成发布：`npm run build` -> `robocopy .\\dist .\\docs /MIR` -> `git add -A` -> `git commit` -> `git push origin main`。
- 发布提交：`50254a8c83556f576890891fe0693da3b5936ad2`。
- 远端核对：`origin/main` 已指向同一 commit。
- 线上核对：`https://wokao4360-rgb.github.io/vrplayer/` 返回 `index-CQkzrWWN.js`，且线上 `/config.json` 的 `assetCdn.probeTimeoutMs=1000`，与本次发布一致。

## 2026-02-11 19:44:47
- 启用 `brainstorming + planning-with-files` 工作流后，锁定本次优先级：P0 先修乱码与防回归，P1 补性能基线。
- 已记录用户偏好：任务完成后不再执行 Cloudflare 部署侧 commit 对齐核验，用户自行线上目视验收。

## 2026-02-11 19:44:47
- 修复 `src/main.ts` 的用户可见乱码文案：
  - 左下角品牌文案：`鼎虎清源`
  - 信息弹窗：标题/字段名/版权文字
  - 更多弹窗：标题、画质、视角、缩放、VR 等文案
  - 配置示例页与关键错误提示文案
- 修复 `public/config.json` 馆封面字段乱码：`cover` 改为 `/assets/panos/gate-nail.jpg`。

## 2026-02-11 19:44:47
- 新增乱码守卫：`scripts/check-text-quality.mjs`，并接入 `package.json`：
  - `npm run check:text`
  - `npm run build` 前置执行 `check:text`
- 新增 P1 体积基线：`scripts/perf-baseline.mjs`，产出 `reports/perf-baseline/latest.json`。
- 本地执行：`npm run check:text`、`npm run build`、`npm run perf:baseline` 全部通过。

## 2026-02-11 19:44:47
- chrome-devtools 证据采样（`snapshot + network + console`）已完成：
  - URL：`?museum=wangding&scene=memorial_wall&v=5`
  - 左下角显示 `鼎虎清源` 正常
  - “更多”弹窗显示 `更多/画质/高清/省流/视角/恢复初始视角/缩放/缩小/放大/VR 眼镜`
  - “信息”弹窗显示 `信息/展馆/场景/采集日期/© 2025 鼎虎清源`

## 2026-02-11 19:47:53
- `npm run build` 首次被 `check:text` 拦截：`findings.md` 中记录了“乱码样例串”导致误报。
- 已将示例文本改为中性描述后重跑构建，`check:text + vite build` 全部通过。
- 重新生成性能基线：`reports/perf-baseline/latest.json`（时间戳 `2026-02-11 19:47:53`）。

## 2026-02-11 19:50:57
- 按发布 SOP 完成第五轮上线：`npm run build` -> `robocopy .\\dist .\\docs /MIR` -> `git add -A` -> `git commit` -> `git push origin main`。
- 发布提交：`6f8560426a8b25ea58138cfb3d2576bbe3511726`。
- 远端对齐：`origin/main` 已指向同一提交。
- Pages 轮询确认：线上已切换到 `index-Cos8uFQt.js`，且 `/config.json` 的 `museums[0].cover=/assets/panos/gate-nail.jpg`，发布生效。

## 2026-02-11 20:24:30
- 启用 `brainstorming + planning-with-files` 进入第六轮计划执行。
- 完成基线勘测：`main.ts` 1852 行、`PanoViewer.ts` 1684 行，且 `PanoViewer` 仍存在“RAF 未显式停止 + 匿名监听不易解绑”的生命周期风险。
- 锁定本轮目标：先做 P0 生命周期治理，再做 P1 入口弹窗逻辑拆分与按需加载，保持全速渲染、不做降帧降画质策略。

## 2026-02-11 20:29:48
- 完成 P0：`src/viewer/PanoViewer.ts` 新增可取消 RAF（`animationFrameId`）与销毁短路（`disposed`），`dispose()` 中显式 `cancelAnimationFrame` 并清理 DOM 输入监听。
- 完成 P1：新增 `src/ui/modals/appModals.ts`，将信息弹窗/更多弹窗 DOM 构建迁移为按需模块；`src/main.ts` 改为点击时动态 import。
- 构建验证通过：`npm run check:text`、`npm run build`、`npm run perf:baseline` 全部通过。
- 新基线：`index` 从 `79.23kB` 降至 `73.77kB`。

## 2026-02-11 20:32:35
- `chrome-devtools` 证据采样完成（snapshot + network + console）：
  - 普通场景加载正常，无阻断错误；
  - 首次点击“信息”后才请求 `assets/appModals-*.js`，按需加载生效；
  - “更多”弹窗中文显示正常；
  - 场景来回切换后 console 未出现新增持续增长型错误。

## 2026-02-11 20:37:26
- 已按 SOP 发布第六轮：`git checkout main` -> `git pull --rebase --autostash origin main` -> `npm run build` -> `robocopy .\\dist .\\docs /MIR` -> `git add -A` -> `git commit` -> `git push origin main`。
- 发布提交：`86c2cb1`。

## 2026-02-11 21:12:08
- 使用 Context7 拉取 Vite 文档依据：确认 `build.modulePreload.resolveDependencies` 可按 `hostType=html` 过滤预加载依赖，并结合 `manualChunks` 控制动态 import 拆包边界。

## 2026-02-11 21:19:47
- 新增 `src/app/sceneUiRuntime.ts`：将场景 UI 改为三层运行时装配。
  - 核心层：`BottomDock`、`TopModeTabs`、`Hotspots`（`LOW_READY` 后挂载）
  - 次级层：`GuideTray`、`SceneGuideDrawer`、`VideoPlayer`（用户触发导览时按需加载）
  - 观测层：`QualityIndicator`（`HIGH_READY/DEGRADED` 后 idle 挂载）
- 新增 `src/app/chatRuntime.ts`：聊天改为上下文化运行时，`ensureInit()` 仅在触发时初始化并带场景 token 失效保护。
- `src/ui/BottomDock.tsx` 新增 `onOpenCommunity` 回调并在点击“社区”时触发。
- `src/main.ts` 完成接线：移除首交互聊天监听，切换为“社区 tab 首次点击初始化聊天”。

## 2026-02-11 21:24:31
- 完成 three 命名导入改造（去除 `import * as THREE`）：
  - `src/viewer/picking.ts`
  - `src/viewer/spatialProjection.ts`
  - `src/viewer/createCompassTexture.ts`
  - `src/viewer/NadirPatch.ts`
  - `src/ui/Hotspots.ts`
  - `src/viewer/TileCanvasPano.ts`
  - `src/viewer/TileMeshPano.ts`
  - `src/viewer/PanoViewer.ts`
  - `src/viewer/dollhouseScene.ts`
- `vite.config.ts` 更新拆包：
  - 新增 `three-math`
  - `three-core` 更名为 `three-renderer`
  - HTML 预加载过滤扩展为 `three-extras/three-renderer/three-math`

## 2026-02-11 21:27:19
- 构建验证通过：`npm run check:text`、`npm run build`、`npm run perf:baseline` 全通过。
- 新基线：
  - `index`: `77.95kB`
  - `PanoViewer`: `69.2kB`
  - `three-renderer`: `501.39kB`
  - `three-math`: `2.28kB`
  - three 合计：`503.68kB`
- `dist/index.html` 复核：无 `three-extras` / `three-renderer` / `three-math` 的 HTML 级 preload。

## 2026-02-11 21:31:40
- chrome-devtools 证据采样完成（`snapshot + network + console`）：
  - 首屏快照中文正常（标题/底部导航/顶部模式/品牌）。
  - 未点击“社区”前，network 不存在 `chat-community` 请求。
  - 点击“社区”后首次出现 `chat-community-C6ZbaM52.js` 与 `store-B83L8bDT.js`。
  - 未点击“导览”前不请求 `GuideTray/VideoPlayer`；点击“导览”后首次加载 `GuideTray-DA1_STCM.js` 与 `VideoPlayer-CyQLSIuS.js`。
  - console 仅保留非阻断项（meta deprecate + 表单字段 issue），无新增阻断错误。

## 2026-02-11 21:36:22
- 已按第七轮 SOP 发布：`git checkout main` -> `git pull --rebase --autostash origin main` -> `npm run build` -> `robocopy .\\dist .\\docs /MIR` -> `git add -A`（排除用户本地 `AGENTS.md`）-> `git commit` -> `git push origin main`。
- 发布提交：`eb353cc`。
- 远端状态：`origin/main` 已对齐到 `eb353cc`。

## 2026-02-11 21:53:13
- 按“补充收口”继续执行：`main.ts` 将 `ConfigErrorPanel`、`SceneUiRuntime`、`ChatRuntime`、debug helper 迁移为按需动态加载，移除入口静态依赖。
- 重新构建验证：`npm run check:text`、`npm run build`、`npm run perf:baseline` 全通过。
- 新体积结果：`index` 主包降至 `57.16kB`（已明显低于 `<=65kB` 目标）。
- `dist/index.html` 复核：仅保留入口脚本与样式，不再 preload `scene-runtime`。

## 2026-02-11 21:53:13
- `chrome-devtools` 证据采样完成（`?museum=wangding&scene=memorial_wall&v=8`）：
  - snapshot：标题、底部导航、信息弹窗中文显示正常（简体中文）。
  - network：未点击“社区”前无 `chat-community`；点击“社区”后首次出现 `chat-community-*.js`。
  - network：点击“导览”后首次出现 `GuideTray-*.js` 与 `VideoPlayer-*.js`。
  - console：仅剩非阻断 warning/issue（meta deprecate + form field id/name）。

## 2026-02-11 22:55:46
- 新一轮交互体验优化已完成实现：
  - `src/app/sceneUiRuntime.ts`：新增“高清就绪后后台预热”逻辑，预热 `GuideTray/VideoPlayer/SceneGuideDrawer/DockPanels/CommunityPanel`。
  - `src/app/chatRuntime.ts`：新增 `warmup()`，仅预热聊天模块，不创建面板实例。
  - `src/main.ts`：接入 `onWarmupFeatures`，在高清就绪后预热 `appModals` 和聊天模块。
  - `src/main.ts`：场景运行时创建后立即挂载质量指示器，避免错过低清状态。
  - `src/ui/QualityIndicator.ts`：加入低清状态最短可见时长（低清加载 500ms、低清就绪 1200ms）。

## 2026-02-11 22:55:46
- 构建验证通过：`npm run check:text`、`npm run build`、`npm run perf:baseline`。
- 新基线：`index` 约 `57.31kB`（保持在目标线以内）。
- `chrome-devtools` 证据采样（`?museum=wangding&scene=memorial_wall&v=11`）：
  - 首屏快照无“打开三馆学伴”头像按钮。
  - 点击“社区”后才出现“打开三馆学伴”按钮与学伴浮窗。
  - 未点击按钮前网络已出现 `GuideTray/VideoPlayer/SceneGuideDrawer/dock-panels/chat-community/appModals`，说明“高清后后台预热”生效。

## 2026-02-12 00:24:13
- 第九轮四项一次收口代码已落地并合并到当前工作区：
  - `StructureView3D` 拆分为外壳 + `structure3d/StructureSceneRuntime` 动态加载；
  - `PanoViewer` 中 `NadirPatch` 改为按需加载，避免首屏强制进入该链路；
  - 新增 `viewSessionRuntime` 与 `panoLifecycleRuntime`，收口入口和 viewer 生命周期调度；
  - 新增 `warmupScheduler`，`HIGH_READY` 走 `immediate` 预算化预热，`DEGRADED` 走 `idle` 预热；
  - 文案源统一到 `src/i18n/zh-CN.ts`，并引入 `check-encoding` 构建前守卫。
- 当前待执行：最终一轮验证与发布（本次按用户要求把 `AGENTS.md` 一并提交上线）。

## 2026-02-12 00:28:56
- 最终验证完成：
  - `npm run check:encoding` 通过；
  - `npm run check:text` 通过；
  - `npm run build` 通过；
  - `npm run perf:baseline` 通过（`index=58.43kB`，`three-renderer=459.82kB`）。
- `chrome-devtools` 证据采样完成（`snapshot + network + console`，URL：`?museum=wangding&scene=memorial_wall&v=24`）：
  - 首页标题、底部品牌、信息弹窗均为正确简体中文；
  - “社区”点击后才出现“打开三馆学伴”；
  - 点击“三维模型”后首次请求 `structure3d-runtime-BBIptQ-6.js`；
  - Console 仅剩历史非阻断 warning/issue（无新增阻断错误）。
- 当前待执行：按 SOP 发布到 `main`（本次提交包含 `AGENTS.md`）。

## 2026-02-12 00:31:57
- 按 SOP 完成第九轮发布：
  - `git checkout main`
  - `git pull --rebase --autostash origin main`
  - `npm run build`
  - `robocopy dist -> docs /MIR`
  - `git add -A`（包含 `AGENTS.md`）
  - `git commit` + `git push origin main`
- 发布提交：`499ed3f0049f9b7643e13cc37ea98da8592fd47f`。
- 远端核对：`origin/main` 已对齐到同一 commit。

## 2026-02-19 00:18:39
- 按“大陆优先 + 速度第一”开始第十轮执行，已完成 P0 主改动：
  - `public/config.json`：`assetCdn.baseUrls` 新增 `raw.githubusercontent.com` 作为海外回退。
  - `src/utils/assetResolver.ts`：成功 CDN 缓存 TTL 从 12h 提升到 24h。
  - `public/_headers`：新增 `/assets/*.js`、`/assets/*.css`、`/assets/*.worker.js` 的 immutable 长缓存。
  - `src/app/warmupScheduler.ts`：增加预热任务优先级（high/normal/low）。
  - `src/app/sceneUiRuntime.ts`：预热顺序调整为导览/信息优先，社区预热降级到低优先级。
  - `src/main.ts`：修复 pick 成功提示乱码为“已复制 yaw/pitch”。
  - `scripts/check-text-quality.mjs`：补充乱码特征，防止同类回归。
- Orchestrator 计数核验：已主动调用 `route_task`，`/admin/api/stats` 返回 `requestsTotal=7`（非 5）。
- 当前待执行：`check/build/perf` + `chrome-devtools` 证据采样 + 发布。

## 2026-02-19 00:21:52
- 验证完成：
  - `npm run check:encoding` 通过；
  - `npm run check:text` 通过；
  - `npm run build` 通过；
  - `npm run perf:baseline` 通过（`index=58.42kB`，`three-renderer=459.82kB`）。
- `chrome-devtools` 采样完成（本地 `http://127.0.0.1:4173/?museum=wangding&scene=memorial_wall`）：
  - snapshot：页面中文文案正常，底部功能可见；
  - network：已出现双路 CDN probe（`github.cnxiaobai` + `raw.githubusercontent`）；
  - network：预热优先模块先加载（`GuideTray/SceneGuideDrawer/VideoPlayer` 在社区模块前完成请求）；
  - console：仅剩 `apple-mobile-web-app-capable` deprecate 与本地 `favicon 404`（非阻断）。
- 当前待执行：按 SOP 发布第十轮改动（排除 `AGENTS.md/README.md/.gitignore`）。
