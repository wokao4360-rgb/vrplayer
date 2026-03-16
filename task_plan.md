# Task Plan

## Goal
把 museum shell 从已上线的 MVP 补齐到用户 prompt 要求的完整产品规格，重点完成：
- 显式页面状态机
- 配置驱动的 museum/scene shell manifest
- 分层资源预加载调度（L0/L1/L2/L3）
- 转场层的 snapshot -> preview crossfade -> sharpening
- 完整验证、发布与持久化沉淀

## Phases
- [in_progress] Phase 1: 建立隔离 worktree 基线，确认当前实现与缺口
- [pending] Phase 2: 先补 failing tests，覆盖状态机、manifest 解析、预加载计划
- [pending] Phase 3: 实现 museum shell state machine / manifest / preloader / transition UI
- [pending] Phase 4: 运行构建与浏览器验收，发布到 main 并确认 Pages

## Key Decisions
- 在仓库外同级目录 `D:\Projects\vrplayer_museum_shell_full` 建隔离 worktree，避免主仓库脏改冲突。
- 不推翻现有 cubemap 前半球规则，新的 hero 预加载直接复用 `cubeTilePolicy.ts`。
- 配置层采用“新增可选字段 + 运行时归一化 manifest”的兼容策略，不强迫一次性重写 `public/config.json`。

## Risks
- 当前 `npm run build` 在本机环境里找不到 `vite` 命令，需要并行排查为环境问题还是脚本入口问题。
- `src/main.ts` 目前已经承担较多 museum shell 逻辑，新增状态机时要避免再堆一层分支。

## Errors Encountered
- `2026-03-16 17:04:00` `npm run build` 在主仓库与 worktree 中都报 `'vite' is not recognized as an internal or external command`；待定位并收口为稳定构建入口。
