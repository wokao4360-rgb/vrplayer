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
