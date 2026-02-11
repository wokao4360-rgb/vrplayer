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

## 第六轮发布确认（2026-02-11 20:37:26）
- 发布 commit：`86c2cb1`。
- 发布内容：`PanoViewer` 生命周期收口 + 弹窗按需加载 + docs 构建产物同步。

## 第七轮新增发现（2026-02-11 21:31:40）
1. `main.ts` 在第六轮后仍承载场景 UI 装配细节，导致“首屏路径与可选路径”边界不清晰，不利于继续压缩首屏请求。
2. 聊天采用“首交互监听”会在非目标操作（任意键盘/触摸）提前加载 `chat-community`，与“用户显式触发才加载”目标冲突。
3. `three` 命名空间导入在大文件中会放大依赖可见范围，不利于后续按职责拆包与长期维护。
4. 原 `perf-baseline` 脚本仅识别 `three-core`，在新拆包命名下会出现指标盲区，需要同步更新统计口径。

## 第七轮实施结果（2026-02-11 21:31:40）
1. 结构解耦（P0）：
   - 新增 `src/app/sceneUiRuntime.ts`，将场景 UI 装配拆为三层：
     - 核心层（`LOW_READY`）：`BottomDock`、`TopModeTabs`、`Hotspots`
     - 次级层（用户导览触发）：`GuideTray`、`SceneGuideDrawer`、`VideoPlayer`
     - 观测层（`HIGH_READY/DEGRADED` + idle）：`QualityIndicator`
   - `main.ts` 保留路由与场景装配，移除大段内联 UI 装配。
2. 聊天触发收口（P1）：
   - 新增 `src/app/chatRuntime.ts`，统一聊天初始化与销毁。
   - 删除首交互全局监听，改为点击“社区”tab 后首次初始化聊天。
3. three 导入与拆包（P0）：
   - 9 个关键文件从 `import * as THREE` 改为按需命名导入。
   - `vite.config.ts` 拆包更新为 `three-renderer` + `three-math`，并继续过滤 HTML 级 preload。
4. 指标与脚本同步（P1）：
   - `scripts/perf-baseline.mjs` 新增 `three-renderer/three-math/three 合计` 指标，避免新命名下出现 `N/A`。

## 第七轮验收证据（2026-02-11 21:31:40）
1. 构建链路：
   - `npm run check:text`：通过
   - `npm run build`：通过
   - `npm run perf:baseline`：通过
2. 体积数据（最新）：
   - `index`: `77.95kB`
   - `PanoViewer`: `69.2kB`
   - `three-renderer`: `501.39kB`
   - `three-math`: `2.28kB`
   - three 合计：`503.68kB`
3. chrome-devtools（`?museum=wangding&scene=memorial_wall`）：
   - snapshot：页面中文文案显示正常；
   - network：未点社区前无 `chat-community`，点击社区后首次加载；
   - network：未点导览前无 `GuideTray/VideoPlayer`，点击导览后首次加载；
   - console：仅非阻断项，无新增阻断错误。

## 第七轮发布确认（2026-02-11 21:36:22）
- 发布 commit：`eb353cc`。
- 发布链路：`dist -> docs -> commit -> push` 已完成。
- 本次按用户分工未执行 Cloudflare 部署侧 commit 对齐核验（用户自行线上目视验收）。

## 第七轮补充收口发现（2026-02-11 21:53:13）
1. `main.ts` 仍存在三个可继续瘦身的入口静态依赖：
   - `ConfigErrorPanel`（仅配置错误分支使用）
   - `SceneUiRuntime` / `ChatRuntime`（仅场景路径需要）
   - debug helper（仅 `debug=1` 使用）
2. 这些依赖不属于“首屏必需执行链路”，迁移为动态加载后可直接降低主包体积与入口执行负担。

## 第七轮补充收口结果（2026-02-11 21:53:13）
1. 入口瘦身落地：
   - `ConfigErrorPanel` 改为按需 `import()`
   - `SceneUiRuntime/ChatRuntime` 改为场景路径按需加载
   - debug helper 改为 `debug=1` 时动态加载
2. 量化结果：
   - `index` 主包：`77.95kB -> 57.16kB`（下降约 26.67%）
   - 已满足并超出本轮 `index <= 65kB` 目标
3. 构建与证据：
   - `npm run check:text`、`npm run build`、`npm run perf:baseline` 全通过
   - chrome-devtools 复验通过：社区/导览均为“点击后首次加载”
4. 中文显示复验：
   - 标题、底部导航、信息弹窗文案为正常简体中文
   - 未观察到用户反馈的弹窗中文乱码复现

## 第八轮新增发现（2026-02-11 22:55:46）
1. 当前“点击后才动态加载”策略虽然减轻首屏，但会把模块解析成本集中到首次点击，导览/社区/信息/更多会出现体感卡顿。
2. 低清状态提示在快网环境下容易被后续状态快速覆盖，用户主观上会感知“低清提示消失”。
3. “三馆学伴”浮窗由 `FcChatPanel` 实例化时创建，因此必须严格控制在社区显式触发后才初始化，避免首屏干扰。

## 第八轮实施结果（2026-02-11 22:55:46）
1. 高清后后台预热（不实例化 UI）：
   - `SceneUiRuntime` 在 `HIGH_READY/DEGRADED` 后预热导览/社区相关模块；
   - `ChatRuntime.warmup()` 仅导入模块，不创建 `FcChatPanel`；
   - `main.ts` 同步预热 `appModals`（信息/更多）。
2. 低清提示恢复：
   - 场景运行时启动后立即挂载质量指示器；
   - `QualityIndicator` 增加低清状态最短展示时长，降低被瞬时覆盖概率。
3. 学伴头像展示时机：
   - 首屏不创建聊天面板；
   - 仅点击“社区”后调用 `ensureInit()`，再显示头像与面板。

## 第八轮验收证据（2026-02-11 22:55:46）
1. 构建与基线：
   - `npm run check:text` 通过
   - `npm run build` 通过
   - `npm run perf:baseline` 通过（`index ≈ 57.31kB`）
2. chrome-devtools：
   - 首屏 snapshot：无学伴头像浮窗；
   - 点击社区后 snapshot：出现“打开三馆学伴”按钮；
   - network：在未点击前已加载 `GuideTray/VideoPlayer/SceneGuideDrawer/dock-panels/chat-community/appModals`，确认后台预热已生效。
