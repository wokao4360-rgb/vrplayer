# findings.md

## 需求与约束（本轮）
- 目标：继续优化首屏和整体网络访问速度。
- 硬约束：不降帧率、不降画质，渲染循环保持全速。
- 工程约束：`docs/**` 仅通过 `dist -> docs` 生成，不手改。
- 验证约束：结论前必须有 MCP 证据（snapshot + network/console）。

## 关键发现
1. `externalImage.ts` 原实现是全局并发硬编码 2，会限制瓦片与全景并发拉取能力。
2. `assetResolver.ts` 之前探测默认 1800ms，且链路可进一步并行化提速。
3. `sw.js` 之前只处理同源请求，跨域 CDN 全景资源无法进入 SW 缓存链路。
4. `PanoViewer` 高速拖拽时，输入事件线程频繁直接更新相机，存在主线程抖动空间。

## 技术决策（已实施）
| 决策 | 实施点 | 预期收益 |
|---|---|---|
| 分通道并发调度 | `src/utils/imageRequestScheduler.ts` + 调用链接入 | 解除全局并发瓶颈，提升清晰度爬升速度 |
| probe 并行竞速 + 缩时 | `src/utils/assetResolver.ts` + `public/config.json` | 更快选出可用 CDN，弱网首屏更稳 |
| SW 跨域全景缓存对齐 | `public/sw.js` | 回访加载更快，跨域资源可复用 |
| 输入增量每帧应用 | `src/viewer/PanoViewer.ts` | 降低输入抖动，提升交互流畅性 |
| 默认不自动节流降载 | `src/viewer/PanoViewer.ts` | 满足“全速渲染，不降载”策略 |

## Context7 依据
- Vite：`build.modulePreload.resolveDependencies` 支持按 hostType 过滤 preload 依赖。
- Vite：动态 import 的依赖预取由 Vite 重写处理，可通过配置精细控制。
- MDN：Service Worker 可缓存跨域 `opaque` 响应，但应采用可刷新的缓存策略。

## 风险与验证重点
1. 并发提高后弱网设备是否抖动：重点看 network waterfall 与 console 错误增长。
2. 跨域缓存是否污染非目标资源：仅允许全景路径进入该策略。
3. 输入链路变更是否影响交互精度：重点采样拖拽与切场景流畅性。

## 验证结果（2026-02-11 19:15:19）
1. 构建通过：`npm run build` 无编译错误。
2. `dist/index.html` 已不包含 `three-extras` 预加载。
3. chrome-devtools 证据：
   - 未交互前未请求 `chat-community` chunk；
   - 首次点击“导览”后才请求 `chat-community` 与 `store`；
   - Console 无新的阻断错误。

## 发布确认（2026-02-11 19:19:01）
- 发布 commit：`50254a8c83556f576890891fe0693da3b5936ad2`。
- 远端 `origin/main` 已对齐该 commit。
- 线上页面主入口已命中新 hash：`index-CQkzrWWN.js`。
- 线上 `/config.json` 已生效：`assetCdn.probeTimeoutMs=1000`。
