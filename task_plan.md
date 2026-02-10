# task_plan.md

## 任务
VRPlayer 首轮高 ROI 全仓优化（性能优先 + 关键稳定性修复）

## 时间
- 创建时间: 2026-02-10 21:46:36
- 最新更新: 2026-02-10 22:15:09

## 阶段状态
- [x] 阶段1 入口依赖瘦身（`main.ts` 动态加载 `editor/debug/structure3d/north-calibration/chat`）
- [x] 阶段2 Dock 面板惰性化（`DockPanels.tsx` 面板 loader；`BottomDock.tsx` 按需加载 `DockPanels`）
- [x] 阶段3 Dollhouse 降耦（`Dollhouse3DPanel.tsx` 动态加载 `DollhouseScene` + token 防并发）
- [x] 阶段4 CDN 探测去阻塞（`assetResolver.ts` 缓存上次成功 CDN + TTL + 后台复探测；`main.ts` 不阻塞等待）
- [x] 阶段5 关键稳定性修复（全局监听与 RAF 生命周期清理）
- [x] 阶段6 构建拆包（`vite.config.ts` manualChunks + `onlyExplicitManualChunks`）
- [x] 阶段7 发布（`dist -> docs -> commit -> push`）

## 约束
- 仅修改 `src/**`、`README.md`、规划记录文件。
- 不手改 `dist/**`、`docs/**`。
- 结论前必须有构建与 `chrome-devtools` 证据采样（snapshot + network/console）。
