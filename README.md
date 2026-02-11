# VR 全景 Web 播放器（vrplayer）

基于 Three.js 的全景 Web 播放器，支持多馆多场景、热点导航、地图导览与低清到高清渐进加载。

协作硬规则以 `AGENTS.md` 为准；本 README 只保留项目使用说明与持久化要点。

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
