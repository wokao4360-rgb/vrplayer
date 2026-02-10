# progress.md

## 2026-02-10 21:46:36
- 创建 `task_plan.md` / `findings.md` / `progress.md`。
- 进入分阶段实施。

## 2026-02-10 22:00:12
- 完成入口动态加载改造（`ConfigStudio`、`DebugPanel`、`StructureView3D`、`NorthCalibrationPanel`、`FcChatPanel/FcChatClient`）。
- 完成稳定性修复（监听器与 RAF 清理）。

## 2026-02-10 22:08:27
- 完成 `DockPanels.tsx` 异步面板加载与 `Dollhouse3DPanel.tsx` 动态场景加载。
- 完成 `assetResolver.ts` 上次成功 CDN 缓存 + TTL + 后台复探测。

## 2026-02-10 22:12:54
- 修复 `main.ts` 语法断点与异常注释块，恢复可构建状态。
- `npm run build` 通过。

## 2026-02-10 22:15:09
- 重构 `BottomDock.tsx` 为按需加载 `DockPanels`，修正 optional chunk 首屏预拉取。
- 调整 `vite.config.ts`（`onlyExplicitManualChunks` + 手工分包）。
- 完成多轮 `chrome-devtools` 证据采样（normal/debug/editor/community/map/dollhouse/structure3d）。
- 待执行：`dist -> docs -> commit -> push` 发布链路。
