# task_plan.md

## 任务
VRPlayer 第七轮一次性收口优化（DeepWiki/GPT 建议闭环版）

## 时间
- 创建时间：2026-02-11 18:51:14
- 最新更新：2026-02-12 00:31:57

## 已完成基线
- 第一轮：入口依赖瘦身、Dock 惰性化、CDN 后台探测、关键生命周期清理。
- 第二轮：KTX2/three-extras 按需化、聊天首交互触发、SW 壳层预缓存、发布上线。
- 第三轮：main 入口深度解耦、SceneListPage 拆分、路由级按需加载、发布上线。

## 第四轮阶段状态
- [x] 阶段0：规划文件中文化与编码治理（清理乱码/控制字符，统一简体中文记录）
- [x] 阶段1（P0）：图片请求调度器落地（分通道并发：tile/pano/preload/ui）
- [x] 阶段2（P1）：CDN 探测并行竞速 + 默认超时收敛到 1000ms
- [x] 阶段3（P1）：SW 跨域全景缓存对齐（保持 /config.json network-only）
- [x] 阶段4（P2）：输入事件聚合到每帧应用，保持全速渲染并默认关闭自动节流降载
- [x] 阶段5：构建验证 + chrome-devtools 证据采样
- [x] 阶段6：按 SOP 发布（dist -> docs -> commit -> push）

## 第五轮阶段状态（本次）
- [x] 阶段0（P0）：确认用户偏好变更（任务完成后不再做 Cloudflare 部署侧 commit 对齐核验）
- [x] 阶段1（P0）：修复底部品牌、信息弹窗、更多设置弹窗中文乱码
- [x] 阶段2（P0）：补充中文乱码防回归守卫（`scripts/check-text-quality.mjs` + `npm run check:text`）
- [x] 阶段3（P1）：建立构建体积基线脚本（`scripts/perf-baseline.mjs` + `reports/perf-baseline/latest.json`）
- [ ] 阶段4（P1）：`main.ts` / `PanoViewer.ts` 结构性拆分（降低长期耦合复杂度）
- [x] 阶段5：按 SOP 发布第五轮改动

## 第六轮阶段状态（本次）
- [x] 阶段0（规划）：基线勘测与优先级锁定（保持全速渲染，不降帧率/画质）
- [x] 阶段1（P0）：`PanoViewer` 渲染循环与事件监听生命周期收口
- [x] 阶段2（P1）：`main.ts` 信息/更多弹窗模块拆分并按需动态加载
- [x] 阶段3：构建验证 + chrome-devtools 证据采样
- [x] 阶段4：按 SOP 发布第六轮改动

## 第七轮阶段状态（本次）
- [x] 阶段0（P0）：`main.ts` 场景 UI 装配从内联迁移到 `SceneUiRuntime`（核心层/次级层/观测层）
- [x] 阶段1（P0）：聊天初始化迁移到 `ChatRuntime`，并改为“社区 tab 首次点击触发”
- [x] 阶段2（P0）：`BottomDock` 新增 `onOpenCommunity` 回调接口并接入主链路
- [x] 阶段3（P0）：`picking/spatialProjection/createCompassTexture/Hotspots/NadirPatch/TileCanvasPano/TileMeshPano/PanoViewer/dollhouseScene` 改为 three 按需命名导入
- [x] 阶段4（P1）：`vite.config.ts` 更新拆包策略（`three-renderer/three-math`）并过滤 HTML preload
- [x] 阶段5：`npm run check:text` + `npm run build` + `npm run perf:baseline` 验证通过
- [x] 阶段6：chrome-devtools 证据采样（snapshot + network + console）
- [x] 阶段7：按 SOP 发布第七轮（dist -> docs -> commit -> push）

## 第七轮补充收口（本次）
- [x] 阶段0（P0）：`main.ts` 入口继续瘦身，`ConfigErrorPanel` 改为按需加载
- [x] 阶段1（P0）：`SceneUiRuntime/ChatRuntime` 从静态入口依赖改为场景路径动态加载
- [x] 阶段2（P1）：debug helper 改为 `debug=1` 时动态加载，减少常规首屏入口负担
- [x] 阶段3：构建验证（`npm run check:text` + `npm run build` + `npm run perf:baseline`）
- [x] 阶段4：chrome-devtools 证据采样（snapshot + network + console）
- [ ] 阶段5：按 SOP 发布补充收口改动

## 第八轮交互体验收口（本次）
- [x] 阶段0（P0）：高清就绪后后台预热“导览/社区/信息/更多”相关模块，降低首次点击卡顿
- [x] 阶段1（P0）：恢复低清加载状态提示链路（确保 `LOADING_LOW/LOW_READY` 可见）
- [x] 阶段2（P0）：保持“三馆学伴头像”仅在点击“社区”后显示，首屏不展示
- [x] 阶段3：构建验证 + chrome-devtools 证据采样
- [ ] 阶段4：按 SOP 发布第八轮改动

## 约束
- 不降帧率，不降画质，渲染循环保持全速。
- 不手改 dist/**、docs/**。
- 所有“修复成立”结论必须有 MCP 证据（snapshot + network/console）。

## 关键决策
| 决策 | 原因 |
|---|---|
| 引入分通道并发调度器 | 解除全局并发=2 的瓶颈，提升全景与瓦片爬升速度 |
| CDN probe 并行化 | 缩短可用 CDN 选路时间，弱网下更快可用 |
| SW 支持跨域全景缓存 | 提升回访命中与跨域资源复用 |
| 事件增量每帧应用 | 降低高频输入导致的主线程抖动，提升流畅性 |
| 默认关闭自动 tile 节流 | 满足“全速渲染、不降载”要求 |
| 任务完成后不做 Cloudflare commit 对齐核验 | 按用户工作分工：用户自行目视验收线上站点 |
| 构建前强制执行乱码检查 | 在 CI/本地构建前拦截中文乱码回归 |
| 新增性能基线脚本 | 形成长期可比较的首屏与网络体积数据 |
| 第六轮优先做生命周期收口 | 先解决旧 RAF 与监听残留风险，再做入口拆分 |

## 风险与应对
| 风险 | 应对 |
|---|---|
| 并发提高导致弱网抖动 | 按设备档位区分并发上限（桌面/移动） |
| 跨域缓存不可见头部 | 允许 opaque 响应缓存，仅限全景资源路径 |
| 调整输入链路引发交互回归 | 用 chrome-devtools 做交互与网络双采样回归 |

## 第九轮阶段状态（本次）
- [x] 阶段0（P0）：`three-renderer` 继续瘦身（Structure3D runtime 拆分 + `PanoViewer` 中 `NadirPatch` 改为按需加载）
- [x] 阶段1（P0）：`main.ts / PanoViewer.ts` 结构解耦（`ViewSessionRuntime`、`PanoLifecycleRuntime` 落地）
- [x] 阶段2（P1）：预热改为预算化调度（`WarmupScheduler` + `sceneUiRuntime` 分档触发）
- [x] 阶段3（P1）：中文乱码全链路守卫（`check-encoding` + 文案源统一 + build 前置校验）
- [x] 阶段4：构建验证 + `chrome-devtools` 证据采样（`snapshot + network + console`）
- [x] 阶段5：按 SOP 发布第九轮（`dist -> docs -> commit -> push`，本次包含 `AGENTS.md`）

## 第十轮阶段状态（本次）
- [x] 阶段0（P0）：大陆访问链路收口，`assetCdn.baseUrls` 增加海外回退
- [x] 阶段1（P0）：静态资源缓存策略增强，`_headers` 增加 hash `js/css/worker` 长缓存
- [x] 阶段2（P0）：预热调度改为优先级队列（导览/信息优先，社区次级）
- [x] 阶段3（P1）：修复用户可见 pick 提示乱码，并补充文本守卫特征
- [ ] 阶段4：构建验证 + chrome-devtools 证据采样
- [ ] 阶段5：按 SOP 发布第十轮（`dist -> docs -> commit -> push`）
