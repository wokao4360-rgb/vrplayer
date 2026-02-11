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

## 乱码根因分析（2026-02-11 19:44:47）
1. **编码误处理**：历史改动中存在“UTF-8 文本按 GBK/ANSI 解码后再写回”的情况，导致文案从“鼎虎清源”等正常中文变成“乱码样例串”这类异常文本。
2. **硬编码散落**：`src/main.ts` 中信息/更多弹窗文案与日志字符串分散硬编码，一旦某次写回编码不一致，易出现批量乱码。
3. **缺少守门机制**：此前构建链路没有在 `vite build` 前进行中文乱码检查，导致乱码可直接进入产物并上线。

## 防复发措施（已落地）
1. 构建前强制执行文本质量检查：`npm run check:text`（已接入 `npm run build`）。
2. 新增检测脚本：`scripts/check-text-quality.mjs`，对源码字符串与关键配置文件执行已知乱码特征扫描。
3. 本轮已修复用户可见乱码入口：左下角品牌、信息弹窗、更多弹窗、配置示例页与关键错误提示。
4. 任务分工固化：Cloudflare 部署侧 commit 对齐核验由用户自行线上验收，不再纳入 AI 的默认发布核验步骤。

## P1 后续计划（已排期）
1. 继续拆分 `main.ts` / `PanoViewer.ts` 的高耦合逻辑，降低维护与编码污染风险。
2. 持续执行 `npm run perf:baseline`，沉淀体积数据并追踪首屏网络开销趋势。

## 守卫校验记录（2026-02-11 19:47:53）
- `check:text` 已在构建前生效，成功拦截一次文档中的乱码样例串。
- 处理后 `npm run build` 与 `npm run perf:baseline` 均通过，说明守卫链路可用。

## 第五轮发布确认（2026-02-11 19:50:57）
- 发布 commit：`6f8560426a8b25ea58138cfb3d2576bbe3511726`。
- 远端 `origin/main` 已对齐该 commit。
- 线上主页已切换新入口：`index-Cos8uFQt.js`。
- 线上 `config.json` 已切换为修复后的封面：`/assets/panos/gate-nail.jpg`。

## 第六轮新增发现（2026-02-11 20:24:30）
1. `src/viewer/PanoViewer.ts` 现有动画循环通过 `requestAnimationFrame(() => this.animate())` 自递归，但无显式 RAF 句柄与销毁短路，`dispose()` 时未硬停止循环，属于长期性能与生命周期风险点。
2. `PanoViewer` 输入事件在 `setupEvents()` 里大量使用匿名函数注册，虽然容器销毁后通常可回收，但缺少成对解绑会增加切场景后隐患与排障成本。
3. `src/main.ts` 的信息弹窗/更多弹窗仍是重 DOM 构建逻辑内联在入口文件，虽然功能正确，但会提高入口复杂度，不利于后续继续瘦首屏与治理乱码风险。
4. 当前体积基线（`reports/perf-baseline/latest.json`）显示 `index=79.23kB`，仍有继续下探空间，适合将“低频交互逻辑”迁移到按需模块。

## 第六轮实施结果（2026-02-11 20:32:35）
1. 生命周期收口（P0）：
   - `src/viewer/PanoViewer.ts` 增加 `animationFrameId` 与 `disposed`，`dispose()` 时显式停止 RAF；
   - 输入事件改为统一登记/统一解绑（`domEventRemovers` + `clearDomEvents()`），避免匿名监听残留。
2. 入口继续瘦身（P1）：
   - 新增 `src/ui/modals/appModals.ts`；
   - `main.ts` 的信息弹窗/更多弹窗改为动态 import 按需加载；
   - 点击“信息/更多”前不请求弹窗模块，点击后才加载 `appModals` chunk。
3. 量化结果：
   - `index` 主包：`79.23kB -> 73.77kB`（下降约 6.89%）；
   - `PanoViewer` 小幅增加（事件生命周期治理引入少量代码），但总体验证通过且换来稳定性收益。
4. devtools 证据：
   - snapshot：信息/更多弹窗文案正常简体中文；
   - network：`appModals-*.js` 仅在点击对应 tab 后出现；
   - console：仅保留历史非阻断 warning，无新增阻断错误。
