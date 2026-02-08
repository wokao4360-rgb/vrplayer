---
description:
alwaysApply: true
---

# AGENTS.md — vrplayer Agent Constitution (HARD RULES)

本仓库采用 AI 协作开发（Codex / Cursor）。
以下规则为强约束，默认始终生效。

---

## 0) 协作契约（HARD）

- 用户职责：只执行 Cursor 与 PowerShell 发布命令。
- Agent 职责：给出可执行、可落地、确定性的实现与发布结果。

Agent MUST NOT:
- 要求用户打开 DevTools / Console 进行调试。
- 要求用户手工修改任何配置文件。
- 使用“try / maybe / 看看是否可行”这类不确定表达。
- 提供多选方案让用户自行排雷。
- 在未确认发布完成前要求用户线上验收。

Agent MUST:
- 明确修改文件与预期结果。
- 先实现、构建、发布、确认部署，再让用户做线上目视验证。

---

## 1) 仓库事实（Ground Truth）

- 工作目录：`D:\Projects\vrplayer`（真实 git 仓库）。
- 分支：`main`。
- 托管：Cloudflare Pages / GitHub Pages 以 `docs/` 为发布目录。
- 构建产物：`dist/`（Vite）。
- 结论：发布链路必须是 `dist -> docs -> commit -> push`。

---

## 2) 配置单一事实源（HARD）

- 唯一可编辑配置源：`public/config.json`。
- 禁止手改：`dist/config.json`、`docs/config.json`。

配置流：
- `public/config.json` -> `npm run build` -> `dist/config.json` -> `robocopy` -> `docs/config.json` -> 线上 `/config.json`

---

## 3) 允许与禁止修改范围（HARD）

允许修改：
- `src/**`
- `public/**`（含 `public/config.json`）
- 根目录工程文档（如 `README.md`、`AGENTS.md`）

禁止手工修改：
- `dist/**`
- `docs/**`

说明：`docs/**` 只能通过 `dist -> docs` 同步生成。

---

## 4) 发布 SOP（唯一正确流程，HARD）

环境要求：
- Windows + 系统 PowerShell（非 VSCode 内置终端优先）。

步骤：
1. `cd D:\Projects\vrplayer`
2. `git checkout main`，确认非 detached HEAD
3. `git pull --rebase origin main`
4. `npm run build`
5. `robocopy .\dist .\docs /MIR`
6. `git add -A`
7. `git commit -m "<提交信息>"`
8. `git push origin main`
9. 确认远端最新 commit 为刚推送 commit，且 Pages 已部署到该 commit
10. 仅此之后才允许用户做线上验证

若用户反馈“线上未变化”，第一假设必须是发布链路问题：
- 漏了 robocopy / 无新 commit / push 失败 / Pages 未部署到该 commit / 缓存命中旧资源

---

## 5) Git 与网络约束（HARD）

- Git/SSH 操作使用系统 PowerShell。
- SSH 走 `ssh.github.com:443`（兼容受限网络环境）。
- 非必要不做破坏性 git 操作；遇到冲突先保证可追溯与可恢复。

---

## 6) 构建产物冲突规则（docs/assets）

- `docs/assets/*` 是构建产物，不是源码。
- 冲突时禁止手工逐文件合并构建产物。
- 正确做法：以源码为准，重新构建并同步 `dist -> docs`。

---

## 7) 默认架构原则（静默执行）

无需在回复里长篇论证，默认按以下原则实现：

### A) SOLID
- SRP：单一职责，单一主要变更原因。
- OCP：优先扩展而非破坏既有核心行为。
- LSP：替换子类型不改变外部可观察行为。
- ISP：接口小而专，避免胖接口。
- DIP：在降低耦合时依赖抽象而非具体实现。

### B) 高内聚、低耦合
- 变更局部化，控制影响面。
- 避免循环依赖与新增全局状态捷径。
- 保持单一真相源，避免并行“第二套规则”。
- 仅在“小且安全”前提下做必要重构。

### C) 输出与沟通
- 优先直接给最终可执行改动。
- 非明确要求时，不输出冗长自检报告。
- 若规则冲突或仓库现实不确定：先停下并提问，不猜。

---

## 8) 坐标系统宪法（HARD）

定义：
- `yaw / pitch / northYaw`（配置与 URL）均为世界角度（world）。
- three.js 内部使用 internal 角度。

规则：
- world -> internal 转换只允许在单一入口执行一次。
- 唯一允许形式：`internalYaw = -worldYaw`。

禁止：
- 多处重复取反。
- 组件内私有“再反一次”修补。
- fallback 分支里再做符号补偿。

---

## 9) 罗盘系统三实现同步（HARD）

方向相关改动必须同步评估以下三处：
1. `src/ui/CompassDisk.ts`
2. `src/ui/GroundHeadingMarker.ts`
3. `src/viewer/NadirPatch.ts`

禁止“先改一处试试看”。

---

## 10) 罗盘产品决策（锁定）

- `initialView.yaw`：初始视角方向（world）。
- `northYaw`：真实北向（world）。
- Pointer 表示当前相机朝向。
- Dial 与 Pointer 职责分离，不可混用。

验收不变量：当 `cameraYaw == northYaw` 时，必须同时满足：
- pointer angle == 0
- pointer 指向盘面 N
- 初始朝向与配置北向一致

---

## 11) North Calibration（如功能存在）

- 仅用于配置辅助：读取当前 yaw -> 产出 northYaw。
- 禁止引入运行时隐式自动校正或隐藏状态变异。

---

## 12) Pick 规则（HARD）

- Pick 的 yaw/pitch 必须基于 `Raycaster.ray.direction` 计算。
- 禁止依赖 intersection point 作为唯一来源。

---

## 13) MCP / Skills 验证要求（HARD）

- 调试与验收优先使用 MCP/skills，不允许只凭代码推断。
- 任何“修复成立”结论前，至少执行一次 `chrome-devtools MCP` 的以下任一组合：
  - 页面快照 + Network 采样
  - 页面快照 + Console 采样

---

## 14) README 持久化知识（REQUIRED）

当发现新的关键坑、约束或 SOP 变化时：
- 必须更新 `README.md` 的 `Agent Notes (Persistent)`。
- 内容保持简短、可检索、可执行。

---

## 15) 输出语言与风格

- 输出、总结、提交信息默认使用简体中文。
- 未被明确要求时不切换英文。
- 默认采用“最小、安全、可验证”的改动策略；非必要不做大范围重构。

---

## 16) MCP 工具使用约定

- 需要时优先使用：`chrome-devtools`、`github`、`filesystem` MCP。
- 涉及 OpenAI API / ChatGPT Apps SDK / Codex 能力时，优先使用 OpenAI 官方文档 MCP。
- 涉及库/API 文档、配置与代码生成时，优先使用 Context7 MCP。
