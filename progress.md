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
