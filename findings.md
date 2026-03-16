# findings.md

## 需求与约束（本轮）
- 目标：继续优化首屏和整体网络访问速度。
- 硬约束：不降帧率、不降画质，渲染循环保持全速。
- 工程约束：`docs/**` 仅通过 `dist -> docs` 生成，不手改。
- 验证约束：结论前必须有 MCP 证据（snapshot + network/console）。

## 关键发现
### 2026-03-14 19:22:13（ops-exec 首跳包装层已收口）
1. `main / telegram-fast -> ops-exec` 当前已不存在“能力面不通”的问题，最新 fresh 验证再次表明 `telegram-fast` 直接委派 `打开 https://example.com 并只回复一行，格式 title=<标题>` 可稳定返回 `title=Example Domain`。
2. 此前残留的真正根因不是模型不会委派，而是 `C:\Users\Lenovo\.openclaw\bin\oc-ops-exec.py` 对 prompt 入口过严：如果首跳写成 `oc-ops-exec.cmd "..."` 而不是 `--prompt "..."`，就会先撞 argparse 用法错误，再靠第二次重试补救。
3. 现在 wrapper 已经吸收这类参数漂移：`--prompt`、`--prompt-file`、位置参数三种入口都能等价工作。也就是说，模型首跳即使不够工整，执行链也不会先因为 CLI 形状问题硬失败。
4. 因此这条 OpenClaw / harness 落地线的下一步不再是“继续修 wrapper 首跳”，而是把 thread/turn/item/approval/status 这套对象级真相面继续前台化，减少用户只能靠自然语言猜当前运行态的地方。

### 2026-03-14 18:44:45（RAG 检索顺序冲突已从生成源修掉）
1. 之前的 RAG 入口冲突不只是文档表面不一致，而是 `D:\Projects\灵感包\入口脚本\build_rag_corpus.py` 同时生成了两套不同顺序。现在已经从生成源修掉，不再需要靠“口头指定 README 只当概览层”去兜底。
2. 当前统一后的检索顺序已经固定为 `tag_index -> source_catalog -> chunk -> sentence -> source_path`。这个顺序同时体现在重建后的 `README.md`、`retrieval_recipes.md`、`handoff_prompt.md` 中。
3. 因此以后再有新增转写时，最可靠的做法仍然是“先改生成源，再重建产物”，而不是只手工改某一个入口文档。RAG 包的主真相源已经明确是生成脚本及其产物链，而不是单个 README。

### 2026-03-14 16:55:47（Node truth 与 node service 安装态已分离）
1. `openclaw status --deep` 里的 `Node service` 行当前只能说明“官方 Scheduled Task node service 是否安装”，不能再当 nodes 可用性的主真相源。本轮清理前它会误导性显示为 `installed · missing/unknown`，清理后已稳定变成 `Scheduled Task not installed`。
2. 真正的节点运行真相已经收口到 `openclaw nodes status --json`：本轮在清理官方 node-service 残留后，节点 `LAPTOP-T5MDFHST` 仍保持 `paired=true / connected=true`，说明主链没有掉线。
3. 因此 Windows 当前稳定节点主链已经明确是“用户态 node host + Startup 自启 + `oc-runtime-heal.ps1` 恢复”，而不是官方 Scheduled Task node service。以后若 `Node service` 行和 `nodes status --json` 冲突，优先以前者为安装面、以后者为运行面。

### 2026-03-14 16:35:00（包装层残余已操作性收口）
1. `telegram-fast` 的 direct CLI `--json` 本轮 fresh 复验已恢复稳定，不再复现上一轮“可能超时/不回包”的活跃现象：fresh 最小调用约 `2.6s` 即返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`。
2. `status --deep` 当前也已重新对齐为 `agent:telegram-fast:main -> gemini-3-flash-preview`，因此上一轮的 `gemini-2.5-pro-preview-06-05` 现已确认是旧会话状态残留，不是当前运行真值。
3. `main` 侧的 `models.json.*.tmp` 问题本轮没有继续当作“根因追杀”，而是被收成了正式恢复链的一部分：`oc-runtime-heal.ps1` 现会自动归档所有早于当前 `models.json` 的旧 `.tmp`，并输出归档目录与剩余数量。
4. 这次真回放已归档 `61` 个旧 `.tmp` 到 `C:\Users\Lenovo\.openclaw\agents\main\agent\tmp-archive-20260314-163609`；愈合后 fresh `main` 再次调用成功，且目录中 `.tmp` 数量保持 `0`。这说明当前最值的不是继续追查 Windows `EPERM rename` 的底层瞬时原因，而是把历史残留从运行视野里稳定移除。
5. 因此当前这条 OpenClaw/harness 落地线的包装层残余已经具备“可恢复、可复验、可文档化”的稳定状态，不再属于活跃阻塞。

### 2026-03-14 16:23:45（ops-exec 委派链已落地，残余只剩包装层）
1. `main -> ops-exec` 的重执行委派链当前已经不是“理论可行”，而是 fresh direct JSON 已成功：`Use ops-exec to open https://example.com and answer with the page title only.` 返回 `Example Domain`，耗时约 `16.6s`。这说明后台总管直连重执行位已经落地。
2. `main` 在这条链路下没有重新膨胀成旧式全能前台：fresh `systemPromptReport.tools.entries` 仍只剩 `exec / process / session_status`。因此当前产品分层“轻前台 / 后台总管 / 重执行位”在运行态上是成立的。
3. `telegram-fast` 的运行时委派链本身也已在 transcript 层实锤成功，不需要再靠猜：`C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\e57207c1-ab08-4556-aaef-7f2b002c47ab.jsonl` 中已完整记录 `oc-ops-exec.cmd --prompt ...` -> toolResult `Example Domain` -> 最终 `[[reply_to_current]] Example Domain`。
4. 因此当前剩余问题不在 `ops-exec` 委派逻辑，而在外层包装：`openclaw agent --agent telegram-fast --json` 直调仍可能超时/不回包；`main` 的 gateway 路径这次又重新冒出 `models.json.*.tmp` 的 `EPERM rename` 并触发 embedded fallback，说明主阻塞已收缩到 CLI/gateway 壳层稳定性。
5. `main` 的 `models.json.*.tmp` 问题也不该再表述成“已经彻底治好”。本轮 fresh direct JSON 成功的同时，`C:\Users\Lenovo\.openclaw\agents\main\agent` 下新的 `.tmp` 数量已回升到 `52`，这说明目录 hygiene 曾收口，但 gateway 路径仍会继续产生新残留；后续应把它当“残余包装层故障”持续跟踪，而不是误写成已根治。

### 2026-03-14 14:15:40（fresh 运行态与 runtime 恢复链再收口）
1. `telegram-fast` 的 fresh 运行态已经真正瘦下来了：最小 direct 调用的 `systemPromptReport.tools.entries` 只剩 `exec / process / session_status`，默认前台不再暴露 `subagents`。这说明“从 allowlist 里移除 `subagents`”已经不只是纸面配置，而是运行时事实。
2. 当前 `main` 的 fresh 运行模型也已经钉实：`openclaw agent --agent main --message "只回答当前运行模型ID，不要解释。" --json` 返回的是 `custom-127-0-0-1-3000/gemini-3-flash-preview`。因此此前 `status --deep` 一度显示的 `gemini-2.5-pro-preview-06-05` 更像旧会话或状态残留，不应再拿它当实时真值。
3. `browser` 与 `nodes` 目前的真实问题不是“配置坏掉”，而是它们在 Gateway 重启或运行面波动后会掉回未激活态：`browser` 会回到 `running=false / cdpReady=false`，`nodes` 会回到 `connected=false`。这更像 runtime availability 问题，而不是产品取舍问题。
4. 这条剩余断点现已收口成正式恢复入口：`C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` / `oc-runtime-heal.cmd`。它固定执行：`gateway health -> browser start -> start-node-host -> 输出最终 JSON`。也就是说，browser/node 的恢复现在已经从“记忆里的手工 SOP”升级成“可复用的运行脚本”。
5. 当前这条恢复入口已经过了一次真回放：运行 `oc-runtime-heal.cmd` 后，最终返回 `gatewayOk=true / browserRunning=true / browserCdpReady=true / connectedNodeCount=1 / nodeHostCount=1`。因此这不是“有脚本但没验证”，而是已验证可用的统一恢复入口。

### 2026-03-14 14:02:49（新增两条 primary 的最终裁决）
1. `6qU71R2VmKk` 与 `mgq3Jua03KQ` 没有推翻当前主线，反而把“先单体+skills / workflow，后多 agent”的判断压得更硬。它们给出的正式判定框架是：先问控制度、问题复杂度、资源约束、专业深度。
2. 这两条新增最值钱的新细化，不是“多 agent 仍然有用”，而是 **单体 Agent + Skills 是多 agent 之前的正式中间态**。多领域但可顺序处理的问题，优先单体+skills，不要直接跳到多体协调复杂度。
3. `Sequential / Parallel / Evaluator-Optimizer` 的边界也被重新钉实：
   - `Sequential` 用于中间结果必须校验、需要审计追踪、或天然线性依赖的流程
   - `Parallel` 只在子任务彼此独立、瓶颈是速度，或需要多视角置信度时成立
   - `Evaluator-Optimizer` 只在质量标准明确、且质量比速度更重要时成立
4. 因此当前最值得顺手落地的一刀不是“继续加更多 agent”，而是把 Telegram 前台从默认多 agent 协调入口再收紧一点：前台默认先单体+skills / workflow，真正的多 agent 只保留为升级链路。

### 2026-03-12 10:07:30（取舍表 v2 反查当前 OpenClaw 现状）
1. 当前 OpenClaw 并不是“缺能力”，而是“默认前台过重”。最新最小调用 `openclaw agent --agent telegram-fast --message "只回答ok" --json` 已成功，但仍携带 `promptTokens=7749`、`systemPromptChars=16045`、`tools.schemaChars=17912`。这说明 `telegram-fast` 已经偏离了“轻前台”的目标。
2. 当前前后台模型分层是符合主线的：`main=gemini-3.1-pro-preview`，`telegram-fast=gemini-3-flash-preview`；Telegram 通道也仍健康，`probe.ok=true`。因此当前主问题不是模型分层又坏了，也不是 Telegram 通道挂了。
3. `nodes` 当前 `paired=true` 但 `connected=false`，说明“节点入口已存在但执行面未连通”。这更像运行面断链，不像产品取舍问题。
4. `browser` 当前 `running=false / cdpReady=false`，这意味着“高价值浏览器自动化升级链路”现在并没有真正拉起；因此任何关于浏览器高权限控制的判断都不该被误解成已经稳定在线。
5. `openclaw status --deep` 仍显示 `sources memory · plugin memory-core`，而当前长期记忆主写通道已被锁定为 HTTP memory。这说明系统里仍存在“内部 memory 表面”和“外部 HTTP 真写通道”两层口径，需要继续避免混写。
6. 结合这轮运行态证据，当前最值动作排序已经可以固定为：先把 `telegram-fast` 真瘦回前台最小默认，再恢复 browser 运行态，再恢复 nodes 连通；这比继续扩能力或继续读更多材料更接近真实收益。

### 2026-03-12 10:10:40（telegram-fast 前台瘦身顺序 v1）
1. 当前 `telegram-fast` 的最小调用已经把“前台过重”的具体来源量出来了：`message` 单项就占了 `5013 schemaChars`，`browser=2799`，`nodes=1800`，`sessions_spawn=922`，`exec=1086`，`process=961`，`web_search=1084`；另外 `cron` 虽 schema 不大，但 summary 本身就占了 `2689 chars`。
2. 这意味着当前最该砍的不是 `read/write/edit` 这种核心原子能力，而是“前台每轮都不必带上的高阶协作/浏览器/节点/消息面”。
3. 第一刀最值的是把 `message / cron / nodes / canvas` 从默认前台注入里剥掉。它们并不直接服务于 Telegram 的大多数首轮接单，却明显拉高默认负担。
4. 第二刀才是把 `browser / ui / automation` 从默认链路下沉成升级链路。它们很值钱，但更适合作为“命中特定任务才升格”的能力，不适合每轮都压进前台。
5. 第三刀是收窄 `sessions_spawn / subagents / default skills`。这些能力不是不值钱，而是应该在“前台已经判定值得派工”后再上，不该成为最小问答的默认负担。
6. 当前默认 skills 也偏离了“轻前台”：`acp-router / healthcheck / skill-creator / video-frames / weather` 这组并非 Telegram 每轮都必须带上，尤其 `skill-creator / video-frames / weather` 更像偏题噪音。

### 2026-03-12 10:14:20（telegram-fast 过重的根因级判断）
1. 当前 `telegram-fast` 默认前台过重，根因不只是“allow 太多”，而是它现在挂着 `tools.profile=full`。这意味着 Telegram 前台天然会继承一批高阶工具面，而不是只吃最小白名单。
2. 这个判断已经有直接运行态证据：`openclaw.json` 的显式 allowlist 里没有 `cron`，但 `telegram-fast` 的最小调用 `systemPromptReport.tools.entries` 里仍然出现了 `cron`。最合理解释就是 `full profile` 在向前台继承额外工具。
3. 因此当前真正该设计的，不只是“删几个工具”，而是先把 `telegram-fast` 从 `full profile` 收回前台最小 profile，再决定哪些能力通过显式 allow 作为升级链路挂回去。
4. 以当前主线看，三层能力面已经可以定型：
   - 保留默认：`read / edit / write / exec / process / web_search / web_fetch / memory_get / memory_search`
   - 按需升级：`browser / canvas / ui / automation / agents_list / session_status / sessions_* / subagents`
   - 后台专属：`message / cron / nodes / gateway / tts`
5. 这意味着后面若继续完善 OpenClaw，前台瘦身的第一刀应优先落在 `profile`，而不是继续对着 allowlist 零敲碎打。

### 2026-03-12 10:18:40（official docs 校准后的实施级判断）
1. OpenClaw 官方文档已经把工具策略顺序讲清楚了：`tools.profile` 先给基础 allowlist，`tools.allow` 再往上加，`tools.deny` 最后兜底。`full` 等于不限制，而不是“有点限制”。
2. 官方现成 profile 只有四种：`minimal / coding / messaging / full`。其中没有一个能直接命中我们现在想要的“轻前台 + web + 只读 memory + 最小执行”。
3. `coding` 看起来接近，但它会把 `group:sessions` 整组带进来，不够轻；`messaging` 会把 `message` 带进来，也偏离“前台最小执行面”。
4. 因此当前最优实施路径已经可以明确：`telegram-fast` 若真要瘦下来，第一步应改成 `profile=minimal`，然后只显式 allow：
   - `read / write / edit / exec / process / web_search / web_fetch / memory_get / memory_search`
5. 这也把一个更深的产品结论钉实了：如果后面还想保留 `browser / ui / automation / sessions_spawn / subagents / nodes / message` 这些升级能力，最稳的做法不是继续留在同一个前台 agent，而是拆成独立 agent/subagent 或独立升级入口。

### 2026-03-13 21:27:34（ops-exec 落地后的重执行真相面）
1. 当前最稳定的高权限浏览器执行真相，并不是“模型已原生拿到 browser/nodes 工具并直接会用”，而是新增的 `ops-exec` 通过 `exec` 调官方 CLI：`openclaw browser start/open/tabs/snapshot`。
2. 这轮已经有直接运行态证据：即使 `ops-exec` 显式 allow 了 `group:ui / group:automation / browser / canvas / nodes / sessions_* / subagents`，最小 direct self-check 的 `systemPromptReport.tools.entries` 仍只出现 `exec / process / session_status`。因此“allowlist 已开”不等于“模型面前就一定出现同名原生工具”。
3. 目前更可靠的产品分层已经正式成型：
   - `telegram-fast` = 轻前台接单/路由
   - `main` = 后台总管与计划/评审收口
   - `ops-exec` = 高权限浏览器/桌面/RPA/Codex 执行位
4. 当前浏览器升级链路已经恢复到真实可用：`openclaw browser start --json` 后 `running=true / cdpReady=true`，并已通过 `tabs/snapshot` 取回 `https://example.com/` 的 `Example Domain` 页面结构。
5. 当时尚未恢复的节点执行面，现已在下一轮通过用户态稳定入口收口；本条结论保留为历史快照，不再视作当前活跃阻塞。

### 2026-03-14 12:18:10（Windows node host 稳定入口已落地）
1. `openclaw node install` 的 `schtasks create failed: 拒绝访问` 仍然成立，但它已从“节点主链阻塞点”降级为“服务安装方式受限”。当前稳定恢复链已经换成用户态启动入口，而不是继续等待计划任务权限。
2. 真实稳定入口现已落成两层：
   - `C:\Users\Lenovo\.openclaw\start-node-host.ps1`
   - `C:\Users\Lenovo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\start-openclaw-node.cmd`
3. 这次不是纸面配置。我已经完成一次完整回放：先停掉全部 `openclaw ... node run --host 127.0.0.1 --port 18789` 宿主，再看 `openclaw nodes status --json` 回到 `connected=false`，随后运行 Startup 入口，节点恢复为 `connected=true`。
4. 节点恢复后的真实能力面已经明确：`caps=["browser","system"]`，`commands=["browser.proxy","system.run","system.run.prepare","system.which"]`。这说明节点当前不是“只算连上了”，而是系统/浏览器代理能力都已回到 Gateway。
5. 新发现的次级坑也已收口：如果宿主进程匹配规则写得过窄，会在已有 node host 存在时误判成“未启动”，从而多拉起一个重复宿主。本轮已修正启动脚本匹配条件，并复验当前只剩单实例。
6. 因此现在关于 Windows node 的正确产品口径是：问题不再是“节点是否可用”，而是“是否有稳定的用户态常驻入口”；当前答案已经是有。
### 2026-03-12 08:31:01（main 侧 models.json 临时文件残留已收口）
1. `main` 侧此前的 `models.json` 问题当前更像历史孤儿 `.tmp` 残留，而不是仍在持续发生的活跃 `EPERM rename`。证据是三次 fresh `openclaw agent --agent main --message "只回答ok" --json` 均成功，且 `models.json.*.tmp` 数量保持 `34 -> 34`，没有继续增长。
2. 安全清理策略已经验证成立：把 `C:\\Users\\Lenovo\\.openclaw\\agents\\main\\agent` 下这 34 个 `.tmp` 归档到 `tmp-archive-20260312-082945` 后，再做两次 fresh `main` 调用，结果均成功，且 `.tmp` 数量继续保持 `0`。
3. 因此当前正确口径不是“main 仍有写目录活故障”，而是“目录里保留了旧的原子写入残渣”；处理方式应是“先取证、再归档、再 fresh 调用复验”，不要直接把这种历史残留误判成模型链路仍未恢复。
4. 本轮 fresh 调用仍出现明显时延波动（约 `7s` 到 `40s+`），但这已经和 `.tmp` 残留脱钩，更像 Gemini `pro` 路由本身的运行时波动，不应再混入 `EPERM` 结论里。

### 2026-03-12 08:19:51（OpenClaw 前后台模型分层）
1. `gemini-3-flash-preview` 与 `gemini-3.1-pro-preview` 的最小 unary 请求当前都能成功，因此 Gemini 总体并未整体失效。
2. 真正影响 Telegram 体感的是流式链路：`D:\AIClient-2-API\logs\app-2026-03-11.log` 已显示 `gemini-3.1-pro-preview` 在真实流式请求中更容易连续触发 `429`，而这类负担主要落在 Telegram 前台。
3. 因此当前更优的产品分层不是“全部统一成同一个 Gemini 模型”，而是 `main=pro`、`telegram-fast=flash`：后台保留更强分析，前台优先速度与稳定。
4. 对 OpenClaw 当前链路，判断真实运行模型必须同时看三层：`openclaw.json`、`openclaw status --deep` 的活会话、direct self-check；只看 global default 或旧摘要都不够。

### 2026-03-12 08:05:27（OpenClaw 模型切回 Gemini 的根因与验证）
1. 当前 OpenClaw 主链近期失稳的第一根因不是 Telegram 通道，而是 `ChatGPT 免费账号 -> openai-codex-oauth:gpt-5.4 / gpt-5.3-codex` 路由不再稳定可用；`AIClient2API` 日志中已出现 Codex 路径下的持续 `400`。
2. 这类故障不能只看 OpenClaw 返回体里的 `model` 字段，必须交叉看 `D:\AIClient-2-API\logs\app-2026-03-11.log` 的 provider 路由日志，确认到底是不是仍在真实命中 Codex。
3. 当前安全恢复路径已经钉实：先把 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `main` 与 `telegram-fast` 的 primary 统一切回 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`，再清空对应 `sessions.json` 强制 fresh session，最后用 `openclaw status --deep` 与 direct self-check 双复核。
4. 运行态复核结果已成立：`gateway health=OK`，Telegram probe 正常，`main` 与 `telegram-fast` 活会话都已重新登记成 `gemini-3.1-pro-preview`。
5. 当前仍留有一个独立残余问题：`main` 侧 `models.json` 的原子写入偶发 `EPERM rename`，但这已经是目录写入 hygiene 问题，不再是模型切换阻塞项。

### 2026-03-10 07:53:47（灵感库逐条阅读 Round 1-3：harness 新增比较）
1. `01_vY32FEl1gJ8.txt` 把 harness 定义成“Agent 的操作系统”而不是 agent 本身：它负责 prompt presets、tool call handling、lifecycle hooks 和高阶能力注入，核心价值是托住长生命周期工作流的可靠性。
2. `02_QVLHlf9cmzg.txt` 把工程角色重新定义为 Harness Engineering：真正的瓶颈不是模型笨，而是环境、意图和反馈闭环没搭好；工程师的主要工作转成“设计环境 + 明确意图 + 构建反馈”。
3. `03_OAoVurGk64A.txt` 给出了当前争议的边界：不是单纯 `big model` 或 `big harness` 二选一，而是当任务进入企业上下文、长工作流和复杂工具表达后，模型价值必须通过 harness 才能真正落到车上。
4. `04_-tuM5rY0CWQ.txt` 把“能力扩张”的正确方向钉实了：不要直接把所有能力都加成主工具，而要靠渐进式披露、文档入口和专用子代理，把能力网络挂在主干之外，避免主 Agent 认知膨胀。
5. `05_R_xkuPGSP34.txt` 说明工具不是加完就永远不动。随着模型和多 agent 协作能力变强，单 agent 时代的 Todo 式工具会变成阻碍；工具必须围绕新的协作语义重构，而且最好只服务于能力相近的一组模型。
6. `06_kix1-w8vd64.txt` 给出更细的设计标准：工具是否有效，不看主观感觉，要看调用频率、调用时机和输出质量；一个工具最好只对应一种意图，结构化 schema 和节奏控制很关键。
7. 这六条 primary transcript 放在一起时，已经形成更完整的主张：当前 OpenClaw 主线不应继续只优化单次回答速度，而要把“环境定义、反馈闭环、上下文组织、生命周期控制、渐进式披露、工具语义演进”一起当成第一类产品对象。
8. 当前最值得转化成实现项的不是再换更强模型，而是把现有系统里的 harness 层做厚：明确 Codex relay 路径、让失败回退稳定、把工具/反馈/审查循环从经验变成固定工作流，并避免主 Agent 工具面继续无节制膨胀。
9. `02_BqvtMYdKt8Y.txt` 把 Codex-first 仓库的配套设施讲得更完整：worktree 启动实例、Chrome DevTools Protocol、可观测性查询、结构化 docs + 简短 `Agents.md` 目录、架构 lint/结构测试、后台清理任务，这些都不是锦上添花，而是让代理端到端开发真正成立的仓库内化条件。
10. `01_rLBsav2GIro.txt` 原始 `_all` 版本确实存在编码污染，但同源 `media\\01_rLBsav2GIro_whisper.txt` 可读，因此当前已按同源可读稿回填修正，并重新纳入 primary 判断。使用边界也要记住：它现在是“可读可用”的 primary，但文本质量仍弱于本批次其余几条，适合支撑方向判断，不适合单独承担精细措辞级比较。

### 2026-03-10 08:10:22（context_engineering 首批三条后的新增发现）
1. `14_dvQQGjT0yPk.txt` 把“文件系统即上下文”讲得最直接：不可逆压缩会导致失忆，真正稳的做法是把文件系统当外部长期记忆，让模型通过读写文件来加载和更新记忆。
2. `18_gBpAw_e-PA0.txt` 给出了一套更系统的框架：上下文工程的三根支柱是卸载、缩减、隔离。其核心不是追求一个超大窗口，而是让信息能按需外置、按需压缩、按需拆隔离上下文。
3. `18_gBpAw_e-PA0.txt` 还把“卸载工具”和“渐进式披露”连起来了：顶级 agent 倾向于保持极简原子工具层，把大部分动作卸载到文件系统脚本和 skills，再由模型按需发现和加载。
4. `19_Of0t7UDpTw8.txt` 对编程场景的边界判断最有价值：在当前阶段，长任务续航的主解法不是盲目多 agent 并行，而是单决策流 + 串行接力 + 文件/日志交接 + Clean State。多 agent 更像未来可能增强的外围专家层，而不是当前默认主架构。
5. 这三条 primary 合起来后，当前对 OpenClaw 的最稳启发已经明确：应继续把任务交接、状态外置、结构化 docs、可回读日志和干净状态交付做厚，而不是把更多历史硬塞进主会话。

### 2026-03-10 08:16:50（context_engineering 第二批两条后的新增发现）
1. `47_zaGprccLFO8.txt` 把“摘要如何不失真”讲得更细：开放式总结提示极不稳定，真正稳的做法是固定 schema/表单，让模型只填字段而不是自由发挥。这样关键字段如改了哪些文件、用户目标、当前进度才不会随机丢失。
2. 同一条 `47_zaGprccLFO8.txt` 还澄清了一个重要权衡：并不是所有工具结果都该立刻卸载到文件。对“主 agent 大概率马上要用”的简单搜索结果，直接把原文先返给主 agent 更省一轮 LLM 往返，启动更快；但要同步把关键中间洞见主动写入文件，防止系统级压缩来得太早。
3. 对复杂搜索，`47_zaGprccLFO8.txt` 的结论则相反：应把多步搜索、整合、提炼外包给子 agent，让主 agent 只接一个固定结构化结果。这样复杂性被封装，主上下文更干净。
4. `48_-W-aKyS1KAc.txt` 进一步钉实：工具过多时，问题不只是 prompt 长，而是会造成工具混淆。`RAG for tools` 式动态热加载也不是稳解，因为它会不断改 prompt 前缀、破坏 KV cache，还会让上下文残留的旧工具调用记录继续误导模型。
5. `48_-W-aKyS1KAc.txt` 给出的更稳架构是三层行动空间：
   - 第一层：小而固定的原子函数层，直接给模型，追求模式安全和缓存友好
   - 第二层：可发现、可学习的沙盒工具/命令行层，承担大部分可扩展能力
   - 第三层：按能力缺口才写代码/API 的开放层，承担最复杂、最自由的任务
6. 这两条 primary 合起来后，对当前 OpenClaw 的直接产品启发已经更清楚：
   - 第一层接口必须稳定、简小、长期不乱变
   - 真正的扩展性尽量外推到子 agent、沙盒工具和代码层
   - “更多工具直接塞进前台 prompt”不是能力增强，而更可能是性能和可靠性的倒退

### 2026-03-10 08:18:28（memory 首批四条后的新增发现）
1. `04_RnNCCsbttEI.txt` 的核心价值不在“记忆要分长期和短期”这件老话，而在于把记忆管理本身工具化：长期记忆的 `ADD/UPDATE/DELETE/RETRIEVE`，短期记忆的 `SUMMARY/FILTER`，都由 agent 主动决策调用。也就是说，真正该设计的是记忆控制层，不只是存储层。
2. 同一条 `04_RnNCCsbttEI.txt` 还给出一个强产品判断：长期记忆、短期记忆和上下文管理不能再各自为政。若长期记忆由一套规则硬写、短期记忆由另一套 RAG/压缩硬筛，中间没有统一控制器，最终效果会像“两个机器人拼一起”，协同很差。
3. `05_zzK4p2vVE20.txt` 把记忆系统的真正瓶颈从“存储技术”转向“检索策略”。它强调：很多时候不是记忆库没有东西，而是一次盲搜拿不到对的证据。MemR3 的高价值点是反思式检索控制器、证据缺口跟踪、查询精炼和避免重复检索。
4. `05_zzK4p2vVE20.txt` 的证据缺口跟踪尤其值得记住：它把“已经知道什么、还缺什么”显式化，而且证据只增不减、缺口只减不增。这对当前 OpenClaw 的复杂任务、长任务和后续可解释性都很对路。
5. `01_7eKq4DY62xM.txt` 提供了一个不同方向：通过向量数据库替换文本匹配，提高长期记忆检索准确率。这个观点有价值，但它更偏存储层升级，不应压过前两条关于“控制器/检索策略”的主线判断。
6. `30_YFifZEWR9bI.txt` 里的 self-improvement、共享进化市场、张量记忆更像高波动宣传方向。它们可以作为远期灵感，但当前和你的主线约束并不完全相容，不能直接拿来压过前面三条更扎实的 primary 证据。
7. 这四条合起来后的当前主判断很清楚：对我们现在这条 OpenClaw 主线，最值钱的不是再引入一个更大的 memory 基座，而是先把“只读检索控制 + 关键洞见写入 + 项目/会话外部记忆 + 证据缺口跟踪”做强。

### 2026-03-10 08:20:34（ui_automation 首批三条后的新增发现）
1. `01_tasXZY7ig24.txt` 当前存在明显编码污染，但仍能支持一个粗粒度方向判断：单靠浏览器/API 的 OpenClaw 在国内闭塞场景不够，确实需要浏览器外的 UI skill/子代理补位。使用边界也要记住：这条文件当前不能承担细节级比较。
2. `02_kf3Kwo7bNNs.txt` 把 UI agent 的真痛点讲得很清楚：不是“点不了”，而是截图、上传、理解、规划、执行这一整轮视觉链路太慢。作者给出的直接经验是，一条简单的 UI 任务就可能跑到 2.5 分钟量级。
3. `02_kf3Kwo7bNNs.txt` 还给出一个更务实的产品方向：对重复流程，应该把已经探索过的操作收成 RPA/录屏回放/脚本化流程，而不是让 UI agent 每次都重新看图、重新判断。
4. 同一条 `02_kf3Kwo7bNNs.txt` 也提醒了模型编排的边界：规划模型 + 执行模型的双模型拆分会进一步拉高延迟；在强模型条件下，统一成单模型可能更稳更简单。
5. `02_q3Es3x3Df20.txt` 虽然不直接讲“点 UI”，但它给出了 UI 自动化真正落地时必须搭配的上层组织：Quick Note、异步沟通文件、通知机制、红绿灯边界。也就是说，UI 自动化不是只靠点屏幕本身，而要嵌进一套不会拖垮人的异步协作协议。
6. 这三条合起来后，对当前 OpenClaw 的直接产品启发已经很明确：
   - UI 自动化可以继续放开，而且应作为浏览器/API 覆盖不到场景的补位能力
   - 但不能把它当默认主工作流
   - 真正可持续的方向是“视觉探索一次，重复任务转固化回放”，再配上异步沟通而不是高频实时盯梢

### 2026-03-10 08:23:58（security 首批三条后的新增发现）
1. `03_Bhy30vnrXPU.txt` 给出的最强警告是：一旦把远程桌面/控制面绑定到 `0.0.0.0` 且没有密码，本质上就是把整台机器公开给公网。这里的风险不只是 OpenClaw 本身，而是会连带浏览器登录态、支付后台、验证码邮箱等真实资产一起暴露。
2. 同一条 `03_Bhy30vnrXPU.txt` 还给出了当前最稳的修复顺序：Gateway 绑定必须优先 `loopback`；若真要远程访问，必须叠加认证、HTTPS 和额外边界；曾写入过配置文件的 API key / OAuth token，一旦怀疑泄露就应轮换。
3. `04_1Q17ZUctNFY.txt` 从另一个角度强化了同一结论：安全主线的第一步不是讨论功能，而是先自查暴露面，再做认证、移除不必要公开暴露、补丁升级。这说明对当前 OpenClaw 主线而言，安全不是附加项，而是前置门禁。
4. `05_wf9lZgB8N0M.txt` 说明 Telegram 驱动的特有风险非常现实：如果 bot 对所有人开放聊天，或者 bot 身份被公开暴露，攻击面就不只是“别人给它发消息”，而是别人可能借它探查你的个人信息和协作系统边界。
5. 这三条合起来后，对当前产品的正确判断不是“为了安全就别加能力”，而是：能力可以继续加，但入口必须受控。也就是说，当前更稳的是保持 Gateway loopback、Telegram allowlist、认证和最小暴露，而不是把远程入口做成完全开放。
6. 这也解释了为什么我们当前一直坚持：旧自造 worker 不回主线、Gateway 继续本地化、Telegram 受 allowlist 约束、长期记忆主写通道单一。它们不是保守，而是当前能力扩张下的最低安全护栏。

### 2026-03-09 22:51:53（OpenClaw 真正接通 Codex 与自动化后的新增发现）
1. 当前系统已经跨过“理论可行”阶段：`main` 和 `telegram-fast` 都能把真实指令转给 Codex 并拿回结果，官方 browser 也仍保持可用。这意味着当前主线不再是“OpenClaw 能不能操控 Codex/浏览器”，而是“如何把中继过程做快、做稳”。
2. 官方 ACP runtime 本身不是完全失效，而是在当前 Telegram / direct session 形态下存在两个稳定已知限制：`Thread bindings do not support ACP thread spawn for telegram.` 与 `spawnedBy is only supported for subagent:* sessions`。因此正确产品策略不是继续硬怼 runtime，而是把它降级成“优先尝试”，一旦命中这两个错误就立即切共享包装器。
3. 共享包装器是当前 Windows 环境下的真正稳定点。直接让 agent 在 `exec` 里临场拼 `PowerShell + npm + acpx` 长命令，会带来路径猜错、shell 语法串线、中文引号/多行 prompt 崩坏等一整串偶发问题；统一收口到 `C:\Users\Lenovo\.openclaw\bin\oc-acpx.cmd` 后，这类问题基本被消掉了。
4. 浏览器自动化与 node host 必须继续分开看：browser 走官方 Chrome/CDP 路径，本身就能完成“打开抖音 -> 搜索 -> 点击视频 -> 播放”；node host 只负责系统/桌面层能力。之前把两者混在一起，会误判成“node 不通所以自动化全坏了”。
5. Windows 上 `openclaw node install` 失败并不代表 nodes 彻底不可用。当前这台机器真正的阻塞点只是 `schtasks create failed: 拒绝访问`；改用隐藏前台 `openclaw node run` 后，`nodes status --json` 已恢复到 `connected=true`。也就是说，当前问题是“服务常驻方式未固化”，不是“node 能力不存在”。
6. 当前最真实的性能瓶颈已经清楚：一句 `hi` 级别的 Codex relay 仍然要 80~130 秒，说明大头在 OpenClaw 编排、进程收集和回包链，而不是 Codex 本身不会执行。这和前期 Telegram 主链“会接单但像卡住”是同一类产品问题，只是现在已经从能力空洞收敛成编排开销过大。

### 2026-03-09 16:53:03（为什么现在可以把只读 memory 开给 telegram-fast）
1. 之前不给 `telegram-fast` 开 memory，不是技术上不能，而是为了先把 Telegram 前台维持在“轻、快、单真源”的状态。
2. 但 `main` 本来就已经拥有 `memory_get / memory_search`，而这两个工具本质只是“读和搜”，不涉及长期记忆写入。既然风险不在写入，而在误用，那么该收口的是使用边界，不是继续把前台完全挡在外面。
3. 因此本轮更合理的产品判断是：把 `memory_get / memory_search` 开给 `telegram-fast`，但明确它们只用于借长期记忆补事实，不能压过项目 capsule、当前真配置和源码证据，也不能被误当成第二写入真源。
4. 当前运行态已证明这不是纸面放权：`telegram-fast` 的最小 smoke 直接回 `memory_search,memory_get`，且 `systemPromptReport.tools.entries` 已出现两项。
5. 这轮之后，`main` 和 `telegram-fast` 的差别更清楚了：`main` 仍是后台总管，保留 `gateway / tts / session_status / memory_*` 等更重能力；`telegram-fast` 则成为“前台接单 + 项目判断 + UI/automation + 会话协作 + 只读 memory”的远程执行入口。

### 2026-03-09 16:12:14（Windows 上更新 OpenClaw 的真坑点）
1. 当前这台机器上，官方 `openclaw update --yes` 不一定能一次成功；最常见失败不是版本问题，而是 Windows 文件锁。只要 `OpenClaw Gateway` 正在运行，`npm` 在升级全局包时就可能因安装目录被占用而报 `EBUSY: rename '...\\node_modules\\openclaw' -> '...\\.openclaw-*'`。
2. 这次失败根因已被钉实：`Get-NetTCPConnection -LocalPort 18789` 对应 PID `83816`，而 `Win32_Process` 显示它正是 `...\\openclaw\\dist\\index.js gateway --port 18789`。也就是说，占锁的不是别的程序，就是 OpenClaw 自己的 Gateway。
3. 正确升级顺序已收口成可复用 SOP：先 `openclaw gateway stop`，再确认 `18789` 不再监听，必要时 `Stop-Process` 释放残留 `node.exe`；之后直接 `npm i -g openclaw@latest`，最后 `openclaw gateway start` 并做回归。
4. 升级后的第一轮 agent 调用曾出现一次 `gateway closed (1006 abnormal closure)` 并自动回退到 embedded 模式，但 5 秒后 `gateway health`、`channels status --probe` 和新的 `openclaw agent` 调用都恢复正常。这说明风险点是“重启瞬间抖动”，不是升级把 Telegram 主链打坏了。
5. 升级到 `2026.3.8` 后，`telegram-fast` 的关键定制未丢：主模型仍是 `openai-codex-oauth:gpt-5.4`，外挂工具面里的 `browser / canvas / nodes / message / agents_list / sessions_* / subagents` 仍在 `systemPromptReport.tools.entries` 中出现。

### 2026-03-09 15:55:08（为什么这轮可以开始给 telegram-fast 真放权）
1. 最新灵感包 `20260309_ui_automation_efficiency` 证明当前最值钱的不是继续堆更强模型，而是把“视觉理解 -> 自动化回放 -> 外部循环/派工”接进执行链。这和 `telegram-fast` 当前的瓶颈完全对齐。
2. `telegram-fast` 之前真正受限的不是 skills 数量，而是工具面被硬锁在 `group:fs / group:runtime / group:web`。这会让它能读代码、能跑命令、能查网页，但遇到 UI 状态、重复流程、跨会话协作时仍会掉回“只会说”。
3. 当前最合理的放权不是一口气把系统总控权交出去，而是开放高价值外挂：`group:ui / group:automation / group:nodes / agents_list / message / sessions_* / subagents`；同时继续保留 `gateway / tts` 关闭。这样前台 agent 获得“看界面、做自动化、派工、跨会话推进”的能力，但不会直接拥有系统总闸。
4. 本轮配置后，`systemPromptReport.tools.entries` 已稳定出现 `browser / canvas / nodes / message / agents_list / sessions_list / sessions_history / sessions_send / sessions_spawn / subagents`，说明这不是只改了 Dashboard 表单，而是实际注入到 agent 运行态了。
5. Dashboard 也给了可视证据：`telegram-fast -> Tools` 当前为 `19/25 enabled`，`browser / canvas / nodes / message / agents_list / sessions_* / subagents` 均已启用，而 `memory_get / memory_search / gateway / tts / image / session_status` 仍关闭。
6. 当前节点能力的真实状态是“入口已开，宿主未装”：`openclaw status --deep` 仍显示 `Node service not installed`，而本地 smoke 里 `nodes=0`。这意味着后续若要上 Windows MCP/node host，是增量启用宿主的问题，不是 `telegram-fast` 工具权限不够。
7. `subagents` 的真实状态是“入口已开，但还没被打磨到稳定精收口”。最小 smoke 已回 `delegated=yes`，说明派工链路可用了；但对子代理结果的结构化回收仍可能出现 `unknown` 这类保守值，所以当前更适合把它用于并行探索和后台拆活，而不是第一时间当作精准报表引擎。

### 2026-03-09 15:40:00（为什么 Memory 体系也要单独做复利工程）
1. 当前仓库的记忆体系并不是“随手 POST 一下就行”，而是已经形成一条稳定工程链：`/api/health/detailed` 判库、Bearer 鉴权、`memory_write_safe.py` 安全写入、`memory_selftest_utf8.py` UTF-8 自测、`memory_repair_mojibake.py` 历史修复。
2. 若这些规则只散落在 `README` 和历史排障记录里，后续窗口很容易再次混用 `mcp__memory` 图谱通道、直接字符串 `-Body`、或把 `Duplicate content detected` 误判为“服务故障”。
3. 因此本轮正确收口方式是新增 `D:\Projects\vrplayer\memory_mcp_compound_playbook.md`，把真源、SOP、去重口径、假乱码/真乱码、快速判因收成单独入口。
4. 这轮还完成了一个实用脚本增强：`scripts/memory_write_safe.py` 现在会显式输出 `accepted / dedup_rejected / failed / net_new`。这样以后看到 `Duplicate content detected` 时，可以直接判为“去重拦下”，而不是误记为失败。
5. 本轮实测还再次证明：在不可信命令通道里直接内联中文，即使最终进的是 Python，也可能在进入进程前就被替换成 `?`。这说明“先 `UTF-8 bytes -> Base64` 再传 `--content-b64`”不是风格问题，而是硬约束。

### 2026-03-09 15:26:00（为什么需要把当前窗口单独做成复利手册）
1. 这一窗口的高价值知识已经不只是“修了一个点”，而是形成了一条完整的 OpenClaw 主线治理链：模型真值、项目路由、反回滚恢复、工具面边界、fresh session 验证口径。
2. 若这些知识只留在 `progress.md / findings.md / 聊天记录` 里，后续窗口很容易再次被旧 Gemini 口径、旧截图、旧摘要带偏，重复走同样的弯路。
3. 因此本轮正确做法是把这组稳定规则单独沉淀成 `D:\Projects\vrplayer\openclaw_compound_playbook.md`，并在 `README.md` 留入口，让后续排查直接命中“真源 -> 恢复步骤 -> 最小 smoke”，而不是重新从零拼装。

### 2026-03-09 15:18:00（为什么另一个窗口会把 `telegram-fast` 又改回 Gemini）
1. 这次不是 OpenClaw 自己随机漂移，而是另一个窗口在缺失最新上下文时，拿旧阶段的 Gemini 口径继续写回 `telegram-fast` 工作区与模型配置。
2. 真证据有三层：`C:\Users\Lenovo\.openclaw\openclaw.json` 一度再次出现 `telegram-fast.model.primary = gemini-3-flash-preview`；`workspace-telegram-fast/AGENTS.md`、`TOOLS.md`、`MEMORY.md` 被冲淡成缺少模型治理与项目路由的弱版本；你在网页里手工改回 `gpt-5.4` 后，磁盘真配置已恢复，但若不清 fresh session，旧 prompt 仍可能继续粘住。
3. 仅改 Dashboard 不够。正确收口仍是“三件套”：恢复 `telegram-fast` 工作区真注入文件、确认 `openclaw.json` 中 `agents.defaults` 与 `telegram-fast` 同时指向 `openai-codex-oauth:gpt-5.4`、再丢弃 `telegram-fast` 活会话快照。
4. 这次已再次验证：清空 `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\sessions.json` 后，`openclaw status --deep` 的活会话重新登记为 `openai-codex-oauth:gpt-5.4`，本地 `openclaw agent --agent telegram-fast` 自述模型也为 `gpt-5.4`。
5. 以后判断“模型是不是又漂了”，优先看三处真值：`openclaw.json`、`openclaw status --deep` 的 `agent:telegram-fast:main`、以及 `openclaw agent --agent telegram-fast --message "你现在的运行模型ID是什么？..."` 的直接自述；不要只看历史摘要或旧截图。

### 2026-03-09 14:18:00（telegram-fast 为什么会把 vrplayer 问题答成通用 VR 常识）
1. 根因不是“它不知道 `vrplayer` 仓库存在”，而是 `telegram-fast` 之前没有明确的“项目命中 -> 项目语义优先”规则。用户一旦只说 `VR眼镜 / 绿灯 / 退出后` 这类歧义词，模型就会掉回通用 VR/硬件常识。
2. OpenClaw 官方自动注入边界也解释了为什么旧方案不稳：系统默认只注入 `AGENTS.md / SOUL.md / TOOLS.md / USER.md / MEMORY.md`。如果项目 capsule 只是聊天里说过、或放在没被明确读取的位置，模型首轮并不会稳定带上这些事实。
3. 当前正确落地方式是“两层结构”：
   - 注入层：把项目域判定、弱触发/强触发边界、会话项目粘性写进 `workspace-telegram-fast/AGENTS.md / TOOLS.md / MEMORY.md / USER.md`
   - capsule 层：把 `vrplayer` 的术语、锚点和当前高价值事实写进 `workspace-telegram-fast/memory/project-routing.md` 与 `memory/project-vrplayer.md`
4. 这轮还钉实了一个二阶坑：如果只强调“提到 VR眼镜 就切项目”，会导致 fresh 会话下的纯歧义问法也被硬拉进 `vrplayer`。因此必须把边界写死为：`VR眼镜 / 绿灯 / 退出后` 单独出现时不算项目命中；只有和 `vrplayer / 项目网站 / 仓库 / 页面 / 场景 / 功能 / 报错 / 三馆学伴` 同时出现，或上一轮已锁定项目，才切到 `vrplayer`。
5. 目前这套规则已经用本地 smoke 证明可执行，而不是停留在文档层：
   - `这是我的 vrplayer 项目网站，vr眼镜退出后 ui 为什么还是绿的？` -> `这是项目内问题。`
   - `帮我看 vrplayer 里三馆学伴为什么报错。` -> `这是项目内问题。`
   - 项目锁定后 `这个绿灯是不是没退出？` -> `这是项目内问题。`
   - fresh 会话下 `VR眼镜退出后还绿着，怎么回事？` -> `这是通用硬件问题。`
6. 这轮顺手修正了一个会持续放大误导的真配置漂移：`telegram-fast` 主模型和 `agents.defaults.model.primary` 之前又漂回了 Gemini / `gpt-5.3-codex`。当前已重新收口为 `openai-codex-oauth:gpt-5.4`，否则即使项目路由正确，Telegram 主链的自述与行为也会继续飘。

### 2026-03-09 11:52:00（为什么“全局默认 GPT-5.4”仍可能对 Telegram 不生效）
1. OpenClaw 的“全局默认模型”分两层：`agents.defaults.model.primary` 只是默认值；只要某个被 channel binding 命中的 agent 自己写了 `model.primary`，真实执行就会以 agent 局部配置为准。
2. 当前 Telegram 主链绑定的是 `telegram-fast`，而不是抽象的“全局默认 agent”。因此只改 `agents.defaults` 不足以让 Telegram 真正切到 GPT；还必须同步改 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `agents.list[].id=telegram-fast` 的 `model.primary`。
3. 这次回归已经被真实自检证据抓到：在修复前，`openclaw agent --agent telegram-fast --message "你是什么模型？..." --json` 直接返回 `gemini-3-flash-preview`，说明问题不在 TG UI，而在 agent 真配置与活会话。
4. 正确收口动作是“三件套”：改 `telegram-fast.model.primary`、同步 `workspace-telegram-fast/TOOLS.md` 的模型口径、清空 `telegram-fast` 的活 session store。缺一项，都可能继续出现“配置说 GPT，真实还在跑 Gemini”的假切换。

### 2026-03-09 11:45:00（为什么 Telegram 里的 kyuu 还会自称 Gemini）
1. 这不是“状态页显示错了”，而是 `telegram-fast` 真配置和工作区提示词发生了局部漂移。`agents.defaults.model.primary` 虽然已经切到 `openai-codex-oauth:gpt-5.4`，但 `C:\Users\Lenovo\.openclaw\openclaw.json` 里 `agents.list[].id=telegram-fast` 仍主用 `gemini-3-flash-preview`，因此 Telegram 绑定 agent 会继续按 Gemini 跑。
2. `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\TOOLS.md` 也仍在注入 `Primary model: custom-127-0-0-1-3000/gemini-3-flash-preview`，这会直接污染“你是什么模型”这类自我描述问题。
3. 真实证据已闭合：`C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\0061d2b0-c8ff-4109-afbd-a9405eb66138.jsonl` 里，2026-03-09 11:29 与 11:30 的 Telegram 直连回复都明确记录为 `provider=custom-127-0-0-1-3000`、`model=gemini-3-flash-preview`。所以那句“我是 Gemini 3 Flash”是旧真源驱动出来的，不是用户看错。
4. “它不会先搜索一下网络”也有真因：旧 `telegram-fast` 配置明确 deny 了 `group:web`，因此它本来就不具备外部网页检索能力。在这种工具面下，它不应该对“业界是否有 gpt-5.4”下判断；正确行为应该是“无法外部核验，不下结论”。
5. 正确修法不是只改全局 default，而是三件事一起做：改 `telegram-fast` agent 真配置、改 `workspace-telegram-fast/TOOLS.md` 的模型/查证规则、并清掉已被旧 Gemini 上下文污染的 TG 直连 session store。

### 2026-03-09 11:20:00（OpenClaw 默认模型切到真 gpt-5.4 路由）
1. 新 Codex CLI 号本地可见 `gpt-5.4`，但这不等于 `AIClient2API(127.0.0.1:3000)` 裸入口已经把 `gpt-5.4` 正确路由到 OpenAI/Codex。
2. 关键坑点已验证：裸请求 `model='gpt-5.4'` 即使响应里回显 `model='gpt-5.4'`，在日志里仍可能真实落到 `gemini-cli-oauth` 并出现 `Model 'gpt-5.4' not found. Using default model: 'gemini-2.5-flash'`；因此“回显模型名”不能作为路由证据。
3. 当前稳定可用的真实路由是带 provider 前缀的 `openai-codex-oauth:gpt-5.4`。已实测该模型请求成功返回 `ROUTE_GPT54`，且 `D:\AIClient-2-API\logs\app-2026-03-09.log` 明确记录 `Req Protocol: openai -> openai-codex-oauth | Model: gpt-5.4`。
4. 因此本轮正确做法不是继续赌裸 `gpt-5.4`，而是把 OpenClaw 默认主模型直接切成 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`。但这一步只保证“全局默认 + 本地会话”走通；后续在 `2026-03-09 11:45:00` 已进一步证实 Telegram 绑定 agent 和 TG 直连旧 session 还需要单独收口。

### 2026-03-09 10:10:48（三馆学伴真实复杂任务样本）
1. `三馆学伴` 当前真实根因不在前端，而在服务端账户状态：浏览器新请求 `POST https://chat-fachfrmdcz.cn-hangzhou.fcapp.run/` 返回 `HTTP 403`，响应体为 `{"RequestId":"...","Code":"AccessDenied","Message":"Current user is in debt."}`。
2. 前端旧 `fcChatClient` 之前只识别 `{answer}`、`{code,msg,data}` 等少数包型，没有识别阿里云函数常见的 `{RequestId, Code, Message}` 错误包，所以把一个清晰的欠费/拒绝访问错误误判成了 `服务返回异常数据`。
3. 当前最小正确修复不是伪造聊天成功，而是把用户可见错误改成真实原因。`src/services/fcChatClient.ts` 现已把 `403 + AccessDenied + debt` 映射为 `服务暂不可用（云函数账户欠费，HTTP 403）`。
4. chrome-devtools 页面复验已经确认新文案真实生效：旧历史气泡仍保留旧文本，但新发送的 `hi` 已显示 `请求失败：服务暂不可用（云函数账户欠费，HTTP 403）`。这说明修复已命中新请求链路，而不是只停在源码层。
5. 当前第二层问题是请求体偏大而不是本轮主因。最新失败请求 `reqid=306` 的 `content-length=43022`，说明会话历史已明显推高 payload；但在当前样本里，真正阻断回答的仍是云函数账户欠费，而不是前端上下文尺寸。

1. `externalImage.ts` 原实现是全局并发硬编码 2，会限制瓦片与全景并发拉取能力。
2. `assetResolver.ts` 之前探测默认 1800ms，且链路可进一步并行化提速。
3. `sw.js` 之前只处理同源请求，跨域 CDN 全景资源无法进入 SW 缓存链路。
4. `PanoViewer` 高速拖拽时，输入事件线程频繁直接更新相机，存在主线程抖动空间。

## 技术决策（已实施）
| 决策 | 实施点 | 预期收益 |
|---|---|---|
| OpenClaw 默认主模型改为 provider-prefixed `gpt-5.4` | `C:\Users\Lenovo\.openclaw\openclaw.json` + `telegram-fast` 活会话元数据 | 避免裸 `gpt-5.4` 被 Gemini 偷吃，确保 Telegram 主链真实优先走 Codex/OpenAI |
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
1. `src/viewer/PanoViewer.ts` 现有动画循环通过 equestAnimationFrame(() => this.animate())` 自递归，但无显式 RAF 句柄与销毁短路，`dispose()` 时未硬停止循环，属于长期性能与生命周期风险点。
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

## 第九轮新增发现（2026-02-12 00:24:13）
1. `StructureView3D` 仍携带 three 构建细节，首开 3D 时解析与初始化链路偏重，且难以独立复用。
2. `PanoViewer` 早期初始化路径里存在 `NadirPatch` 提前进入风险，影响首屏链路纯度。
3. 交互模块预热虽已接入，但缺少统一预算器时会出现任务同时触发、抢占网络和主线程的问题。
4. 中文文案已经修复多轮，必须将“编码校验 + 文案单一来源”变成构建硬闸，才能防止回退。

## 第九轮实施结果（2026-02-12 00:24:13）
1. three 链路瘦身（P0）：
   - `StructureView3D` 改为 UI 外壳，three 场景逻辑迁移到 `src/ui/structure3d/StructureSceneRuntime.ts` 并按需加载。
   - `PanoViewer` 中 `NadirPatch` 改为条件触发 `ensureNadirPatch()`，不再在常规首屏路径强制加载。
2. 结构解耦（P0）：
   - 新增 `src/app/viewSessionRuntime.ts` 与 `src/viewer/panoLifecycleRuntime.ts`，将入口调度与 viewer 生命周期治理拆出。
3. 预热预算化（P1）：
   - 新增 `src/app/warmupScheduler.ts`，按网络状态和模式（`immediate/idle`）分配预热预算，保持全速渲染且不降画质。
4. 中文守卫永久化（P1）：
   - 新增 `scripts/check-encoding.mjs`，并与 `check:text` 共同前置到 `npm run build`。
   - 文案统一至 `src/i18n/zh-CN.ts`，减少散落硬编码导致的乱码回归。

## 第九轮待发布项（2026-02-12 00:24:13）
1. 执行最终验证：`npm run check:encoding`、`npm run check:text`、`npm run build`、`npm run perf:baseline`。
2. 使用 `chrome-devtools` 完成本轮最终证据采样（`snapshot + network + console`）。
3. 按 SOP 一次发布，并按用户要求将 `AGENTS.md` 一并提交上线。

## 第九轮最终验证结果（2026-02-12 00:28:56）
1. 命令验证全部通过：
   - `check:encoding` 通过；
   - `check:text` 通过；
   - `build` 通过；
   - `perf:baseline` 通过（`index=58.43kB`，`three-renderer=459.82kB`）。
2. `chrome-devtools` 证据结论：
   - snapshot：标题/品牌/信息弹窗均为正确简体中文；
   - network：点击“社区”后出现学伴入口，点击“三维模型”后首次请求 `structure3d-runtime`；
   - console：仅保留非阻断警告，无新增阻断错误。
3. 注意项：
   - 构建产物仍会生成 `three.module-*.js`（用于可选链路），不在 HTML preload 中，不阻塞首页渲染路径。

## 第九轮发布确认（2026-02-12 00:31:57）
- 发布 commit：`499ed3f0049f9b7643e13cc37ea98da8592fd47f`。
- 发布链路：`dist -> docs -> commit -> push` 已完成。
- 本次按用户要求，`AGENTS.md` 已随同代码一并上线。

## 第十轮新增发现（2026-02-19 00:18:39）
1. Orchestrator 控制台“总请求数”只统计真实上游模型请求；本地文件读写与普通 MCP 调用不会计入该指标。
2. `assetCdn.baseUrls` 只有单一路径时，跨境链路波动会拉高首屏探测抖动风险，尤其大陆网络环境下更明显。
3. 线上 hash 资源仍存在可优化空间：`_headers` 未覆盖 `/assets/*.js` 与 `/assets/*.css` 时，回访会触发更多协商请求。
4. 预热逻辑应按“交互收益优先级”调度；社区链路不应和导览/信息抢同一波预热预算。
5. `src/main.ts` 仍存在用户可见乱码字符串（pick toast），会直接影响交互可信度，必须优先修复。

## 第十轮已实施决策（进行中）
1. CDN 主备：`public/config.json` 增加海外回退 baseUrl。
2. CDN 缓存：`assetResolver` 成功节点缓存 TTL 提升到 24h，减少重复探测开销。
3. 缓存头：`public/_headers` 增加 hash 资源的 immutable 缓存策略。
4. 预热队列：`WarmupScheduler` 支持优先级，`SceneUiRuntime` 按 high/normal/low 排序执行。
5. 中文守卫：修复用户可见乱码并增强 `check-text` 规则，构建前阻断回退。

## 第十轮验证结论（2026-02-19 00:21:52）
1. 构建链路通过：`check:encoding`、`check:text`、`build`、`perf:baseline` 全部通过。
2. 性能基线：
   - `index-*.js = 58.42kB`（保持低位）；
   - `three-renderer = 459.82kB`；
   - `JS 总量 = 1459.12kB`。
3. 浏览器证据（chrome-devtools）：
   - 已确认双路 CDN probe 同时执行，符合“国内主 + 海外回退”策略。
   - 预热顺序符合优先级策略：导览相关模块先于社区模块加载。
4. 已知非阻断项：
   - `<meta name=\"apple-mobile-web-app-capable\">` deprecate warning；
   - 本地预览 `favicon.ico` 404（不影响生产功能）。

## 2026-02-19 16:42:28
- 第十轮增量优化：去除场景初始化的阻塞等待（移除 `await sceneUiRuntime.ensureQualityIndicatorMounted()`）。
- 预热策略收敛：自动预热仅保留导览/信息相关模块，不再自动预热 dock-panels/community/chat。
- 目标结果：减少首屏与高清爬升阶段的网络争抢，社区链路改为“点击后再加载”。

## 2026-02-20 21:09:42
- 控制台与聊天链路复核：chatRuntime -> FcChatPanel -> fcChatClient。
- 三馆学伴会话记忆兼容修复：请求体历史项新增 `text`，并新增 chatHistory 兼容字段，避免后端仅识别 `text` 时丢失上下文。
- 三馆学伴文案修复：聊天面板状态/错误文案统一简体中文，错误提示改为 请求失败：<msg>。
- 约束保持：聊天入口仍为“点击社区后初始化”，未改回首屏显示头像。

## 2026-02-20 21:20:35
- 新增三馆学伴前端兜底记忆：按馆持久化 profile(name)，识别“我叫xxx/我的名字是xxx/叫我xxx”。
- 命中“我叫什么/我的名字/记得我名字”等问句时，本地直答，避免后端忽略 history 导致失忆。
- 修复姓名提取边界：过滤“什么/啥/名字”等占位词，避免误把“我叫什么”写成名字。
- Playwright 实测：点击社区后才显示学伴头像；清空后输入“我叫sgm”再问“我叫什么”，回复“你叫sgm。我已经记住了。”

## 2026-02-20 21:37:52
### 新发现
1. 当前“姓名记忆”已可本地兜底，但“事实追问记忆”（如“我今天干了什么”）仍完全依赖后端对 history 的理解，导致线上仍会出现失忆回复。
2. 用户实际诉求是“对刚说过的事实做即时回忆”，该能力可以在前端直接确定性实现，不必等待后端模型稳定支持。
3. `chrome-devtools MCP` 当前会话不可用（`Transport closed`），本轮改为 Playwright 完成页面快照与网络/控制台采样。

## 2026-02-20 22:03:35
### 新发现
1. 用户截图中的关键目标是“做一个可被 Codex 插件直接访问的宿主”，不是再做一层手工脚本流程。
2. 真实约束已确认：Codex 插件主会话 token 无法外部强制改成 Gemini；可做的是把子任务转交宿主，再由宿主交给 Orchestrator 自动分流。
3. 现有 `aiclient-orchestrator` 已具备完备路由能力，宿主只需提供“插件友好入口 + 健康观测 + 委托工具”即可落地。

### 决策
1. 新建 `tools/codex-host/server.mjs`，作为轻量 MCP 宿主，直接复用 Orchestrator 接口。
2. 宿主默认 `use_cache=false`（便于用户直观看到真实消耗），并保留可配置开关。
3. 同时暴露本地 HTTP 健康接口（`/health`、`/status`、`/recent`）用于快速验活和证据采样。

### 已落地修复
1. `src/ui/FcChatPanel.ts` 新增 `isAskRecentActivity` 与 `buildRecentActivityAnswer`：
   - 识别“我今天干了什么/我刚才说了什么/你还记得我说了什么”等追问。
   - 从本地 `messages` 中回忆最近有效 user 事实句，直接本地回复，不再走后端请求。
2. 增加回忆候选过滤：
   - 跳过“我叫什么/我今天干了什么/你好/谢谢”等无效候选，降低误回忆。
   - 优先选含“今天/刚才/去了/做了/参观”等事实词的最近一句。

### 证据
1. 构建命令通过：`npm run check:text`、`npm run build`。
2. Playwright 复现通过：
   - 清空后输入“我今天吃了白茶，去了王鼎纪念馆”；
   - 再问“我今天干了什么”；
   - 回答为“你刚才说的是：我今天吃了白茶，去了王鼎纪念馆”。
3. 兼容性验证通过：
   - 未点击“社区”前不显示学伴头像；
   - 点击“社区”后才出现学伴入口与聊天面板。

### 发布结果（2026-02-20 21:43:47）
1. 已执行 `dist -> docs -> commit -> push`。
2. 发布 commit：`2aebdbfd6d81b0ccceed5203b231a639d3a23f46`。
3. 远端 `origin/main` 已对齐到同一 commit。

## 2026-02-20 22:06:55
### 新发现
1. “我今天干了什么”已修复，但用户真实问题是“同义改写问法仍失忆”，例如“姥姥干了家务 -> 姥姥干了啥”。
2. 仅靠固定触发词会导致命中面窄，改写问法很容易漏掉并落回后端泛答。
3. 因此回忆逻辑必须从“关键词硬匹配”升级为“历史候选打分检索”。

### 已落地修复
1. `src/ui/FcChatPanel.ts` 用 `buildRecallAnswer` 替换旧的固定问法分支：
   - 判定回忆意图：`isLikelyRecallQuestion`
   - 构建 token：`buildRecallTokenSet`
   - 相似度：`scoreTokenSimilarity`
   - 主语提取：`extractRecallSubject`
   - 候选排序：`相似度 + 主语命中 + 近因权重`
2. 低质量候选过滤仍保留：跳过问句本身/寒暄空话，避免回忆“你好/谢谢”。

### 证据
1. 构建验证：`npm run check:text`、`npm run build` 均通过。
2. Playwright 复现（`snapshot`）：
   - 输入“姥姥干了家务”
   - 再问“姥姥干了啥”
   - 返回“你刚才提到：姥姥干了家务”
3. Playwright `network + console`：
   - 本会话仅 1 条聊天后端 `POST`（首句）；
   - 回忆句无新增聊天 `POST`，说明命中本地回忆分支；
   - console 仅非阻断 warning（`apple-mobile-web-app-capable` deprecate）。

## 2026-02-21 16:59:30
### 新发现
1. 现状里的 oute/batch` 是串行 `for + await`，属于“假并发”，会拖慢多子任务吞吐。
2. 用户核心目标“80%任务不走 Codex”可通过“请求占比”稳定衡量，必须新增可视化 KPI 与告警。
3. 软闸门要“只告警不阻断”，否则会影响你当前工作连续性。

### 已落地
1. `aiclient-orchestrator/server.js`
   - unDelegateBatch` 支持 `execution=concurrent|serial` 与 `concurrency(1-6)`。
   - 新增 unBatchWithConcurrency` 并发池执行器，保序返回结果。
   - 新增软闸门告警：`codex_light_mode`、`codex_share_high`。
   - 新增接口：`GET /admin/api/alerts`、`GET /admin/api/routing/policy`。
   - 统计项新增：`nonCodexSharePct`、`codexSharePct`、`batchConcurrentRuns`、`batchSerialRuns`、`codexInQuickUiCount`、`softGateAlertCount`。
2. `admin-web`
   - KPI 新增“非 Codex 占比”“软闸门告警”。
   - 配置项新增：批量执行模式、并发数、软闸门开关、窗口、阈值。
   - 时间线新增软闸门中文解释。
3. `tools/codex-host/server.mjs`
   - 新增工具：`host_delegate_batch_concurrent`、`host_policy_snapshot`、`host_alerts_recent`。

### 证据
1. 语法检查：`node --check`（orchestrator server/app.js/codex-host）均通过。
2. 接口验证：
   - `GET /admin/api/routing/policy` 返回并发与软闸门配置；
   - `POST /admin/api/route/batch` 返回 `execution=concurrent`；
   - 强制 oute=codex, mode=quick` 后 `GET /admin/api/alerts` 可见 `codex_light_mode` 告警。
3. 浏览器证据（chrome-devtools）：
   - snapshot 显示新 KPI 与新配置字段；
   - network 采样包含 `/admin/api/dashboard?refreshUsage=1` 200 与 `/admin/api/config` 200。

## 2026-02-21 17:06:40
### 新增发现
1. Memory API 当前健康检查返回 `database_path=C:\Users\Lenovo\.codex\mcp-memory\memories.db`，满足会话记忆统一落库基线。
2. `scripts/memory_write_safe.py` 已内置 Bearer 鉴权、UTF-8 安全写入和回读校验，适合默认作为本机记忆写入入口。
3. Context7 复核结果与当前服务端实现一致：批量异步路径必须把异常汇总并走统一错误中间件，避免“单任务失败拖垮整批”。

### 执行结论
1. 本轮关键记忆已成功写入 `/api/memories`，并通过 `roundtrip_ok=true` 回读校验。
2. 新会话恢复所需上下文已同步到 `task_plan.md / findings.md / progress.md`，不会丢链路状态。

## 2026-02-21 17:12:56
### 新增发现
1. `Cursor Codex 插件请求摘要` 原始展示会把 IDE 上下文整段塞进表格，可读性差且难以定位真实任务句。
2. 管理台操作状态区（任务执行/批量/配置）缺少 `aria-live`，对辅助技术不友好。
3. 运维测试中常误用 `/admin/api/route`，当前真实可执行路由为 `/admin/api/route/task`。

### 已落地
1. `admin-web/app.js` 新增插件请求摘要归一化：提取 `My request for Codex` 主体、去除上下文噪音、统一截断展示。
2. `admin-web/index.html` 为 outeSummary/batchSummary/configSummary` 增加 ole=\"status\" + aria-live=\"polite\"`。
3. 修复 `tools/codex-host/README.md` 乱码，重写为 UTF-8 简体中文说明。

### 证据
1. `node --check admin-web/app.js` 通过。
2. `chrome-devtools` 刷新后快照显示：插件请求摘要已短化为省略形式（可见 `…`），状态区具备 `live=\"polite\"`。
3. 实际任务调用：`POST /admin/api/route/task` 成功返回 `provider=gemini`，并写入“当前任务状态”时间线。

## 2026-02-21 17:55:03
### 新增发现
1. 用户目标“Codex当大脑 + 多模型并发干活”可以在宿主层完成，不需要改 Cursor 插件本体。
2. `host_team_execute` 适合做主Agent编排：拆解任务（planner）-> 并发子任务（workers）-> 结果汇总（merge）。
3. 现实行为中 planner 可能不严格输出 JSON，必须提供文本步骤提取兜底，否则会退化成单任务。

### 已落地
1. `tools/codex-host/server.mjs` 新增：
   - `runTeamWorkflow` 编排主流程；
   - `parseTeamPlan` + `extractSubtasksFromText` 双层解析；
   - MCP 工具 `host_team_execute`；
   - CLI 模式 `--team-run`（配套 npm 脚本 `host:team`）。
2. `tools/codex-host/README.md` 补充“主Agent团队并发”实操命令与参数说明。

### 证据
1. `npm run host:team -- --task "把旅游站首页改版任务拆为并行子任务并输出执行要点"` 返回：
   - `plan.subtasks=3`
   - `batch.execution=concurrent`
   - `batch.okCount=3`
   - `merge.ok=true`
2. `chrome-devtools` 快照显示：
   - 总请求数增至 `47`
   - 非 Codex 占比 `95.74%`
   - 时间线新增本轮 planner/batch/merge 三段任务记录。

## 2026-02-21 22:48:25
### 新增发现
1. 原 host_task_autopilot 仅按文本长度做二分，无法稳定覆盖搜索/UI/规范检查/debug 这四类任务。
2. 若不提供策略预览，用户无法在执行前审计 token 风险与模型分配逻辑。
3. 编码历史污染会导致中文字符串变成乱码，最稳妥做法是使用 ASCII + Unicode 转义保证脚本可编译。

### 已落地
1. 新增 v2 策略引擎 `buildAutopilotStrategy + classifyAutopilotProfile`。
2. `host_task_autopilot` 返回推荐 skills/MCP、分类得分、执行理由、执行计划。
3. 新增 CLI：`node tools/codex-host/server.mjs --autopilot-preview`（对应 `npm run host:autopilot`）。


## 2026-02-23 15:11:50（本轮发现：worker-hard 与候选模型）
1. `gemini-3.1-pro-preview` 与 `gemini-claude-opus-4-6-thinking` 之前未成为主候选，根因是 `buildRouterAutotuneTarget()` 的候选顺序没有把它们放在 deep/ui 优先位。
2. `worker` 普通实现偏向 `gemini-2.5-flash*`，根因是 balanced/quick 候选优先顺序和 `buildAutopilotStrategy()` 的 provider 阈值共同作用。
3. 当前实现缺少“worker-hard 先试再升”的持久状态，重启后无法记住试运行结果。
4. 当前 team 工作流在 `worker=gemini, mode=deep` 场景下，若子任务失败不会自动升 Codex 重试。

## 2026-02-23 15:11:50（本轮决策）
1. 保持“质量优先 + 省 token”：高复杂任务引入 `Gemini deep(含 opus)` 先试机制，但必须有 Codex deep 自动回退兜底。
2. 把 worker-hard 试运行状态持久化到本地状态目录，避免每次重启重复试错。
3. 在 README 明确新增策略与环境变量，确保可控可回滚。

## 2026-02-23 15:35:34（本轮新增发现）
1. `decideHardWorkerProvider()` 之前调用 `isCriticalTaskForCodex()`，而该函数含“复杂度>=阈值即 critical”规则，导致 worker-hard 高复杂任务被短路到 Codex。
2. 短路修复后，`preview-only` 与真实执行均可稳定命中 `worker_provider=gemini`（高复杂但非高风险信号任务）。
3. 两次真实执行样本中，planner/worker 均命中 `gemini-claude-opus-4-6-thinking`，并写入 `hardWorkerRoutingState: trials=2, success=2, promoted=true`，说明“先试再晋升”已自动收口到 Gemini 优先。
4. 仍保留安全兜底：命中高风险信号（例如 ollback/deadlock/线上故障`）时，hard worker 仍会强制 Codex。

## 2026-02-24 10:20:30（上下文工程迁移新增发现）
### 新增发现
1. `D:\Projects\vrplayer` 内的“项目日志 + 工具日志 + 全局规范”长期混写，已造成跨项目新会话上下文读取歧义。
2. 同名文件冲突已实证存在：`AGENTS.md` 多份、`task_plan/progress/findings` 多份、`README.md` 大量；仅靠文件名读取会误命中。
3. 在“不能丢内容、尽量不删改”的约束下，最稳妥方案是先做**非破坏迁移**：抽取 + 镜像 + 映射 + 哈希校验。

### 已落地
1. 迁移批次：`C:\Users\Lenovo\.codex\context-hub\migrations\20260224-101500`。
2. 已输出分层内容：
   - 全局：`C:\Users\Lenovo\.codex\context-hub\global\README_GLOBAL.migrated.md`
   - 工具：`D:\Projects\vrplayer\tools\codex-host\context\*.migrated.md`
   - 项目：`D:\Projects\vrplayer\context\notes.vrplayer.migrated.md`
3. 已补“非常见规范文件”索引：`C:\Users\Lenovo\.codex\context-hub\indexes\uncommon_spec_index.md`。
4. 已补“迁移映射”清单：`C:\Users\Lenovo\.codex\context-hub\migrations\20260224-101500\migration_map.json`。

### 证据
1. 迁移前后源文件哈希比对：`inventory_compare.json` 差异为 `0`（总和保持一致）。
2. 未判定条目已隔离：`agent_notes_uncertain.md`（9 条）并暂停迁移，等待用户决策。
3. 已写入 Memory HTTP，回读校验成功：`content_hash=23064e4e487f48862ba640f5fd3e12abf154b3d239f3ecc7c76cb3c0087a2452`，`roundtrip_ok=true`。

## 2026-02-24 10:39:44（用户确认后第二阶段迁移）
### 新增发现
1. 用户要求工具链几乎全部全局化是合理的：`codex-host/orchestrator/aiclient2api/memory` 具有跨项目复用属性，不应依附单一项目目录理解。
2. “没看到 Orchestrator 文件”的原因是首轮仅镜像了 `README + start-local-stack`，未建立全局项目镜像分区。

### 已落地
1. 新增全局项目镜像区：`C:\Users\Lenovo\.codex\context-hub\global\projects`。
2. 已镜像：
   - `codex-host`：`global/projects/codex-host/source_mirror`
   - `orchestrator`：`global/projects/orchestrator/source_mirror`
   - `aiclient2api`：`global/projects/aiclient2api/source_mirror`（聚焦 configs/scripts）
   - `memory`：`global/projects/memory/source_mirror`（规则与脚本）
3. 未判定 9 条已全部归位，结果文件：
   - `migrations/20260224-101500/agent_notes_uncertain.resolved.md`
   - `migrations/20260224-101500/uncertain_resolution.json`
4. `context-hub/README.md` 与 `indexes/uncommon_spec_index.md` 已补充全局项目入口与状态说明。

### 证据
1. 全局项目清单：`global/projects/GLOBAL_PROJECTS_MANIFEST.json`。
2. 归位状态：`uncertainResolved=9`、`uncertainPending=0`（见 `migration_summary.json` 的 `postActions`）。
3. 全程保留原始源文件与未判定底稿，不执行删除动作。

## 2026-02-24 10:45:30（安全迁移版切换新增发现）
### 新增发现
1. 直接把 `mcp_servers.codex-host` 指向全局镜像会遇到依赖缺口（`@modelcontextprotocol/sdk` 在镜像目录不可解析）。
2. 最稳方案是 launcher 双路径：全局优先，依赖不可用时自动回退本地项目源，保证服务不断。

### 已落地
1. 新增 launcher：`C:\Users\Lenovo\.codex\tools\codex-host-launcher.mjs`。
2. `config.toml` 已切换到 launcher，并注入：
   - `CODEX_HOST_PRIMARY=C:\Users\Lenovo\.codex\context-hub\global\projects\codex-host\source_mirror\server.mjs`
   - `CODEX_HOST_FALLBACK=D:\Projects\vrplayer\tools\codex-host\server.mjs`
3. `start-local-stack.ps1` 的 3220 启动链路已改为 launcher，且保留旧路径回退。
4. 备份已落盘：`migrations/20260224-101500/safety_cutover_backup`。

### 证据
1. `node --check C:\Users\Lenovo\.codex\tools\codex-host-launcher.mjs` 通过。
2. `node C:\Users\Lenovo\.codex\tools\codex-host-launcher.mjs --self-test` 返回 `exit=0`。
3. 输出提示 `primary source missing dependencies, fallback enabled`，证明回退链路生效。

## 2026-02-24 11:26:35（全局工具关联项补查与降噪结论）
### 发现
1. 真实运行链路不仅包含 orchestrator/codex-host/sidecar，还包含 Startup 启动项、start-local-stack.ps1、config.toml、%USERPROFILE%\\.codex\\codex-host\\state、Cursor User History、opencode。
2. source_mirror 若参与运行或默认上下文读取，会形成双源并发与检索噪音。
3. 保留镜像本身不危险；危险点在于镜像被误当成真源。

### 落地策略
1. 运行真源统一在 launcher + canonical sources 注册表约束下执行。
2. source_mirror 保留原文但标记归档（ARCHIVE_ONLY.md），并在 CONTEXT_ROUTING.json 中默认排除。
3. 启动与 MCP 配置统一收口到 C:\Users\Lenovo\.codex\config.toml 与 C:\Users\Lenovo\.codex\tools\start-local-stack.ps1。

### 证据
1. C:\Users\Lenovo\.codex\context-hub\global\TOOL_CANONICAL_SOURCES.json
2. C:\Users\Lenovo\.codex\context-hub\CONTEXT_ROUTING.json
3. C:\Users\Lenovo\.codex\context-hub\global\projects\GLOBAL_PROJECTS_MANIFEST.json
4. 健康检查：3217/3220/8000 均返回 200。

## 2026-02-24 13:30:39（v4 持续落地：健康筛选 + 乱码修复）
### 新增发现
1. `collectMainstreamCandidates()` 之前只看 `configured/totalCount`，会把“已配置但 unhealthy”平台纳入默认基准，导致角色候选被污染。
2. `host_team_execute` 的 `focus_hint` schema 描述存在超长乱码文本，影响工具描述可读性，且会污染部分控制台展示。

### 已落地
1. `run-mainstream` 新增 `include_unhealthy`（默认 `false`）：
   - 默认仅纳入健康平台；
   - 仅在显式设置 `include_unhealthy=true` 时纳入 unhealthy 平台。
2. 新参数透传补齐到 HTTP API 与 MCP 工具：
   - `POST /admin/api/benchmark/run-mainstream`
   - `POST /admin/api/benchmark/run-once`
   - `host_benchmark_run_mainstream`
   - `host_benchmark_run_once`
3. 修复 `tools/codex-host/server.mjs` 中 `focus_hint` 的乱码描述为简洁英文示例。

### 证据
1. 语法验证：`node --check tools/codex-host/server.mjs` 通过。
2. 自测验证：`npm run host:selftest` 通过。
3. 对照实测（`platforms=['groq']`）：
   - `include_unhealthy=false` => `candidateCount=0, attemptedSamples=0`
   - `include_unhealthy=true` => `candidateCount=7, attemptedSamples=7`
4. AIClient 能力快照显示 `groq` 当前 `configured=true, healthyCount=0`，与对照结果一致，证明默认健康筛选生效。

## 2026-02-24 13:56:02（v4 持续落地：学习入口参数化 + UI 可控）
### 新增发现
1. 控制台“学习一次”之前是固定参数（每角色 8 样本 + 延续上次=true + 未显式暴露 unhealthy 开关），与“省 token + 可控压测”目标不完全一致。
2. `run-mainstream` 虽已支持 `include_unhealthy`，但 UI 未暴露开关，用户无法在控制台层直接控制健康筛选策略。

### 已落地
1. `tools/codex-host/admin/index.html` 新增学习参数控件：
   - `样本/角色` 下拉（自动/2/4/8/12）；
   - `延续上次学习` 勾选框；
   - `纳入不健康平台` 勾选框（默认关闭）。
2. `tools/codex-host/admin/app.js` 新增参数逻辑：
   - 自动样本策略：单角色默认 8、全角色默认 2；
   - 将 `samples_per_role/continue_from_last/include_unhealthy/roles` 全量透传到 `POST /admin/api/benchmark/run-mainstream`；
   - 运行完成提示新增本次参数回显（是否纳入 unhealthy、是否延续上次）。
3. `tools/codex-host/README.md` 已补齐 `include_unhealthy` 示例与“控制台学习一次默认行为”说明。

### 证据
1. `node --check tools/codex-host/admin/app.js` 通过。
2. `npm run host:selftest` 通过。
3. `chrome-devtools` 快照可见新增控件：`样本/角色`、`延续上次学习`、`纳入不健康平台`。
4. `chrome-devtools` 网络采样抓到请求体：
   - `{\"samples_per_role\":2,\"continue_from_last\":true,\"include_unhealthy\":true,\"roles\":[\"research\"]}`。

## 2026-02-24 14:51:21（v4 持续落地：CLI 直达链路补齐）
### 新增发现
1. v4 主能力虽已在 HTTP/MCP 可用，但缺少统一 CLI 入口会导致“实现已完成、落地可操作性不足”的体验断层。
2. 角色评分/家族池是高频排障入口，必须支持命令行一键拉取，避免只依赖浏览器控制台。

### 已落地
1. `tools/codex-host/server.mjs` 新增 CLI 分支：
   - `--model-families`
   - `--provider-scores`
   - `--benchmark-run-mainstream`
   - `--benchmark-run-once`
2. `package.json` 新增脚本：
   - `host:model-families`
   - `host:provider-scores`
   - `host:benchmark:mainstream`
   - `host:benchmark:once`
3. `tools/codex-host/README.md` 增补 “v4 CLI 快捷命令” 文档，形成“启动 -> 自检 -> 家族池 -> 评分榜 -> 基准学习”的闭环命令序列。

### 证据
1. `node --check tools/codex-host/server.mjs` 通过。
2. `npm run host:selftest` 通过（集成健康项包含 `gsd/memory-http/claude-mem-sidecar`）。
3. `npm run host:model-families` 返回 `ok=true` 且 `excludedPlatforms` 已包含 `google-ai-studio` 与 `cerebras`。
4. `npm run host:provider-scores` 返回 oleLeaderboards`，字段包含 `finalScore/baseScore/stabilityPenalty/variance/quarantinedUntil`。

## 2026-02-24 14:57:11（v4 持续落地：benchmark CLI 冒烟）
### 新增发现
1. 新增 CLI 参数分支必须做“低样本真实调用”验证，否则只能证明参数解析，不足以证明评分链路可落盘。
2. 单角色单样本冒烟可以在低 token 成本下覆盖“请求 -> 打分 -> 落盘 -> 榜单刷新”全流程。

### 已落地
1. 运行：`node tools/codex-host/server.mjs --benchmark-run-mainstream --roles research --platforms gemini-cli --samples-per-role=1 --continue-from-last=true --include-unhealthy=false`。
2. 运行：`node tools/codex-host/server.mjs --benchmark-run-once --roles research --providers gemini --samples-per-role=1 --continue-from-last=true`。
3. 两条链路均返回 `ok=true`，并在结果中输出 `runCount`、`providerScores`、角色结果与样本详情。

### 证据
1. `run-mainstream` 返回：`attemptedSamples=2`、`role=research`、`selectedRoles=['research']`。
2. `run-once` 返回：`roles=['research']`，并包含 `gemini-3-flash-preview` 与 `gemini-2.5-flash` 的 `avgLatencyMs/avgTokens/score`。

## 2026-02-24 14:30:00（全机上下文工程最终态实施发现）
1. 现有 context-hub 缺少执行层脚本，导致“有规则但不可自动运行”。
2. 现有体系缺少写入门禁，长期记忆容易被低价值会话污染。
3. 现有路由缺 profile 化，跨任务场景下读取顺序不够稳定。
4. source_mirror 已标注归档，但缺少控制面显式门禁会造成误读风险。

### 本轮决策
- 采用“并行升级，不删原文”：新增系统层而非推翻旧结构。
- codex-host 保持项目真源，先不切源，避免打断独立更新任务。
- 先把执行脚本跑通，再逐步把会话接管切到 view pack 模式。



## 2026-02-24 15:20:00（最终态收口发现）
1. 风险点：文档中潜入控制字符会在多工具链中放大为“乱码/解析异常”，必须纳入固定清理流程。
2. 验证结论：四平面系统已具备执行闭环（控制面约束 -> 执行脚本 -> 结构化提升 -> 周期治理）。
3. 现阶段边界：`source_mirror` 仍保持归档角色，默认读链与运行真源已被控制面显式隔离。
4. 后续建议：将 `verify_canonical_sources.ps1` 与 `contextctl pack` 纳入每次会话启动前置检查。

## 2026-02-24 16:35:38（自动化机制发现）
1. 旧 `promote` 实现存在“逻辑穿透”：默认将 `inbox-only` 转为 `promote`，会导致长期层噪声扩散。
2. 修复后机制：
   - `inbox-only` 仅留在 inbox；
   - `promote/reject` 处理后从 inbox 移除；
   - 决策轨迹落到 `data/archive/promote-decisions-*.jsonl`。
3. 会话自动化收益：
   - 启动阶段从“手工多步”变为 `start-session` 一步；
   - 收尾阶段从“记忆漏写”变为 `session-close` 一步。
4. 风险与边界：
   - 规则命中依赖关键词，后续应逐步升级为结构化标签+阈值评分；
   - 当前 weekly-review 统计近 7 天条目，仍建议保留人工复核环节。

## 2026-02-24 16:54:48（总控自动化机制发现）
1. 手工多命令链路最易造成“步骤漏执行”，总控命令能显著降低操作复杂度。
2. 备份设计必须规避目标目录自包含问题，否则在 Windows 下易出现文件句柄占用异常。
3. `daily-start/daily-close/monthly-maintain` 已覆盖“从启动校验到收口维护”的核心闭环。
4. 当前仍建议保留 `start-session/session-close` 作为细粒度入口，满足非标准流程场景。

## 2026-02-24 18:09:30（Memory MCP 治理发现）
1. 升级后若直接手工启动 memory.exe，容易丢失环境变量而误写到默认空库；必须走标准启动链或显式设置 MCP_MEMORY_SQLITE_PATH。
2. “后台凌乱”的本质是：标签命名分散 + memory_type 缺失，单靠逐条写入无法形成可复用结构。
3. 已通过治理脚本把“原始记忆 -> 结构化目录 -> 可读摘要”打通，后续 AI 可优先读取 catalog/digest 而非逐条全扫。
4. 记忆内容本身 UTF-8 正常；PowerShell 默认编码显示会出现伪乱码，诊断时应以 Python/HTTP UTF-8 解码结果为准。

## 2026-02-24 20:48:44（v4 继续落地发现）
1. 当前 v4 验收状态已全绿（overallReady=true），继续优化应转为“持续学习与榜单刷新”，而非结构性缺口修复。
2. host:benchmark:mainstream 在全量前台执行时可能超时，建议维持“分角色短批次 + continue_from_last=true”的执行口径，避免长时阻塞。
3. v4 候选阈值采用“上限 12 + 健康候选池自适应”后，能够避免因平台暂时不可用导致的误判未达标。
4. 区分度采用“家族去重 Top5 分差”后，能显著降低同家族同分挤压问题，榜单更可解释。

## v4 进度误判根因与修复（2026-02-24 23:47:44）
1. 根因：/admin/api/v4-progress 在区分度计算前使用“健康候选池键交集”过滤角色榜，导致已实测有效高分候选被误排除（典型是 merge 的 iflow/deepseek-v3）。
2. 表现：同一轮基准中，model-matrix 显示 merge 头部有明显分差，但 v4 进度仍显示 merge 为“区分度不足(0/2)”。
3. 修复：改为仅过滤“冷却候选”（isCandidateQuarantined），不再对角色榜做健康池键交集硬过滤；保留健康池用于候选阈值自适应。
4. 结果：top5MedianGap(merge) 从  恢复到 26.58，v4 汇总从 allGapMet=false 变为 allGapMet=true，overallReady=true。

## 2026-02-25 14:03:45（研究结论）
- 20集里最可迁移且非共识的方法：可逆压缩、受控多样性、启动序列标准化、错误保留、工具渐进披露。
- 结合近期 memory 状态，当前最大收益不是“再扩组件”，而是“先提稳定性和可读性”（尤其编码链路与恢复链路）。
- 已形成三档升级方案：
  - 方案A：稳态增强（低风险，两周见效）
  - 方案B：高杠杆改造（4~6周）
  - 方案C：双向进化闭环（持续）

## 本轮新增发现（2026-02-25 15:49:26）
1. 现有 contextctl.ps1 已具备统一入口能力，但 pack 产物缺少“为什么这样读取”的可解释字段。
2. 现有记忆管道以单轨为主，缺少 long-track/short-track 显式分流，长期检索会持续混入短期噪声。
3. memory_governance.py 具备全量拉取和归一能力，可直接复用为双轨治理的执行基础。
4. 基于 Context7 的 Python 实践，tempfile + os.replace 适合作为 latest 视图安全写入策略，避免异常覆盖。
5. 用户新增核心原则：需求含糊时必须追问到高置信度再给方案，该原则应进入治理规则而非停留口头。

## 阶段验收证据（2026-02-25 15:55:22）
1. contextctl -Action pack 输出包含 PACK_OK + CAPSULE_OK。
2. contextctl -Action start-session 返回 capsule_path、missing_required_count、context_digest。
3. `view_pack.general_ops.json` 中已包含 `decision_trace`，且读取 `decision_policy.v1.json` 成功。
4. `session_capsule.latest.json` 已包含 `next_actions` 与可解释路由信息。
5. contextctl -Action promote 已输出 promoted_long/promoted_short/kept_long/kept_short 统计。

## 本轮新增发现（2026-02-25 16:12:42）
1. contextctl 原本缺少统一指标记录，导致执行质量难量化；补齐后可按动作追踪接管耗时与分流结果。
2. 错误如果只在控制台出现而不入账，后续无法复盘；新增 error_journal 后形成可追溯错误资产。
3. memory_governance 的 latest 文件此前为直接写入；改为原子替换后可避免异常中断导致 latest 损坏。
4. memory 目录项新增 source_pointer（raw_latest/raw_snapshot/line/hash），实现“摘要可回溯原文”。

## 本轮新增发现（2026-02-25 16:16:18）
1. 若无 runtime_state 分离，会话执行上下文只能依赖 views/latest，容易被并行任务覆盖。
2. 增加 runtime_state/session 与 runtime_state/global 后，可同时保留会话快照与全局最新指针。
3. last_close.json 可作为恢复入口，直接提供上一轮 promote 统计和 archive 指针。

## 本轮新增发现（2026-02-25 16:23:28）
1. 原子工具脚本采用“只委托不重复实现”可显著降低分叉风险，适合渐进重构。
2. 将 	ool_surface.v1.json 纳入 routing 默认读取后，跨模型新会话可直接感知原子动作层。
3. contextctl 保留主入口可避免现有自动化脚本和历史流程失效。

## 本轮新增发现（2026-02-25 16:27:33）
1. 将 Invoke-Promote 内部直接落账可覆盖所有入口（直接 promote 或 session-close 内部 promote）。
2. 双账本与 metrics 并行后，可同时做行为统计与决策复盘，不再依赖口头回忆。
3. Evo Unit 最小字段（action/decision/rationale/outcome）已可满足阶段性复盘需求。

## v3 继续执行发现（2026-02-25 16:36:02）
1. session-close/daily-close 直接调用 Invoke-Promote() 会导致账本中出现“close 动作 + promote 动作”双份记录，长期会放大噪音。
2. 仅有 events/cognition 两账本时，仍缺“单次演进单元”的结构化记录，不利于后续做复盘自动化。
3. context-hub/README.md 的 v3 第二/第三/第四阶段描述存在路径转义字符异常（展示层易混淆），需要文本级修复。

## v3 继续执行决策（2026-02-25 16:36:02）
1. 新增 evo_units.jsonl，统一记录 input -> decision -> action_taken -> evidence -> recovery。
2. Invoke-Promote 默认保留记账能力，但在 close 场景下改为关闭内部记账，只由 close 动作写一次总账。
3. ledger_policy.v1.json 升级到 1.1.0，补齐三账本定义与 Evo Unit 必填字段，保证后续治理脚本可校验。

## v3 继续执行验收结论（2026-02-25 16:41:46）
1. start-session/pack/promote/session-close 全链路可运行，runtime_state + decision_trace + session_capsule + ledgers 一致联动。
2. 账本噪音收敛生效：本次 session-close 未再新增 events/cognition 的 promote 子记录，仅保留 close 汇总记录。
3. Evo Unit 现状：
   - 独立 promote 会写 promote-cycle；
   - session-close/daily-close 只写 close-cycle（不再重复写 promote-cycle）。
4. Memory HTTP 写入提示：终端链路写入中文时，回包可能出现显示级乱码（?），但请求返回 success=true；后续建议通过 memory-govern 做统一整理并核验可读性。



## 全局升级新增发现（2026-02-25 18:34:29）
1. 之前 start-session 虽可运行，但缺统一“定位-回忆-复原-领任务”输出，导致新会话执行姿势不稳定。
2. 目标文件缺失时，系统无法判断“是否可执行”，容易在目标不清情况下直接进入实现。
3. 旧指标体系没有 context 前缀稳定度，无法量化“上下文是否频繁漂移”。

## 全局升级执行决策（2026-02-25 18:34:29）
1. 在 contextctl 落地启动仪式对象 startup_ritual，强制输出任务定位、近期回忆、恢复检查与目标状态。
2. 引入 todo/current_goal.md 作为目标校准锚点；若缺失则自动创建模板，goal_ready=false 明确反馈。
3. 在 metrics.jsonl 增加 prefix_stability_score 与 cache_hit_proxy，把“上下文稳定”从主观感受变成可测量指标。
4. 新增 strategy_switch_hint：当摘要连续重复，提醒切换执行策略，降低机械重复。

## 全局升级收口发现（2026-02-25 18:39:24）
1. 本地 Memory HTTP 接口在中文内容写入时，仍可能出现“成功写入但内容被问号替换”的编码退化现象。
2. 在问题修复前，关键收口记忆需追加一条 ASCII-safe 版本，确保可检索与可复盘。
3. 此问题不影响数据库连通性与鉴权，属于写入链路的字符编码一致性缺陷，应作为下一优先级修复项。

## 全局升级新增发现（2026-02-25 18:46:30）
1. 仅有 `strategy_switch_hint` 会提示但不会执行，实际收益有限；必须落地自动轮换执行器才能形成闭环。
2. `start-session` 连续触发时上下文摘要长期一致，采用三策略轮换可主动打破执行路径单一化。
3. 原子写入在并发覆盖场景会触发“目标已存在”异常；替换前显式删除目标文件后，稳定性明显提升。
4. 策略层落地后，A3 从“建议”升级为“可执行机制”，并可通过 `strategy_id/strategy_rotated` 指标追踪效果。

## 全局升级新增发现（2026-02-25 19:06:00）
1. Memory 中文“看起来乱码”与“实际存储乱码”是两件事：本轮已证实多数场景是终端显示层乱码，数据库内可保持正确 UTF-8。
2. 仅靠 `-Message` 传中文，仍可能被终端参数编码污染；新增 `MessageB64` 后可稳定规避该风险。
3. 记忆写入需要统一走安全通道并做 roundtrip，自检失败时不能直接信任“写入成功”提示。
4. `memory-selftest` 必须容忍语义去重（Duplicate）场景，否则会出现误报失败。

## 历史记忆体检发现（2026-02-25 19:10:00）
1. 当前记忆库总量 197 条，其中存在 12 条“问号型不可逆乱码”历史记录。
2. 这 12 条属于既有污染，不是当前安全写入链路新增问题。
3. 该类记录无法自动恢复原文，只能执行“删除旧条目 + 补写摘要”策略。
4. 由于涉及历史数据删除，必须作为单独决策执行，不能默认自动清理。

## 治理策略修订（2026-02-25 19:20:00）
1. 按用户最新原则，记忆治理改为“永久档案制”：不删除历史，不销毁低价值日志。
2. 对“问号型不可逆”条目采用非破坏式归档索引，而不是删除或覆盖。
3. 默认读链排除 archive，确保执行效率；需要时可显式读取 archive 文件实现追溯。
4. 该方案兼顾了两点：长期可追溯（全保留）与日常低噪音（默认降噪）。

## 机制细节补充（2026-02-25 19:37:35）
1. 压缩包（zip）不适合作为默认在线上下文源：AI 不能稳定直接检索 zip 内文本，通常要先解压再读。
2. 推荐做法：默认保留“可读文本索引层”（jsonl/json/md），zip 仅作为冷备份副本。
3. 本轮已采用该做法：archive 保留可读索引，未把可读层替换为纯压缩包。

## 非破坏式标签化发现（2026-02-25 19:50:24）
1. 对“不可逆问号型”条目做 tags/metadata 打标，比删除更符合长期复盘需求，同时不影响原文保留。
2. 默认读取链路排除 archive 后，执行侧噪音显著降低，但追溯能力完整保留。
3. 打标动作需要可重复执行且幂等；本轮已验证首轮 `applied=12`，后续重复执行应以 `skipped` 为主。

## 标签化幂等性修复（2026-02-25 19:55:28）
1. `archive_tagged_at` 若每次重写，会导致月维护重复更新同一批条目，放大治理噪音。
2. 修复后仅在首次打标时写入 `archive_tagged_at`，后续重复执行保持 `skipped`。
3. 当前验证：重复执行后 `applied=0`、`skipped=12`、`failed=0`。

## 归档可读性发现（2026-02-25 20:15:29）
1. 仅保留 archive 原文并不能保证可快速复用，必须配套“归档总索引”让 AI 直接检索。
2. archive-catalog 属于非破坏式增强：不删任何原文，仅增加目录视图（json+md）。
3. 将 archive-catalog 接入 monthly-maintain 后，可保证归档索引与真实文件长期同步。


## UTF-8 自测基线发现（2026-02-25 20:21:47）
1. 记忆链路是否健康，不能只看 roundtrip=true，必须同时检查回读文本是否为正确简体中文。
2. 自测脚本若使用了历史乱码样本，会形成“假健康”结论；必须定期校验测试基线本身。
3. 在 contextctl 入口统一设置 PYTHONUTF8=1 后，跨脚本输出一致性明显提升。


## 精确 hash 归档化发现（2026-02-25 20:35:10）
1. 自动候选规则覆盖不到的历史脏条目，可以走“按 hash 精确打标”补充治理。
2. 非破坏式治理的关键是：只改标签与元数据，不改 content，不做删除。
3. 精确打标后应立即跑一次 memory-govern，避免本地索引与远端状态短期不一致。

## 精确归档机制发现（2026-02-25 21:22:12）
1. 仅靠自动候选无法覆盖所有历史脏记忆，必须保留“按 hash 精确打标”补充通道。
2. 自动化队列文件是高复用入口，但必须兼容 UTF-8 BOM，否则会把注释首行误当 hash。
3. 把精确打标并入 monthly-maintain 后，系统从“人工补洞”升级为“持续自愈”，且全程非破坏式。

## 自愈链路发现（2026-02-25 21:27:42）
1. 把精确 hash 打标纳入 monthly-maintain 后，记忆治理从手工补洞变为自动化闭环。
2. 队列文件必须支持 BOM 容错，否则月维护会误报 hash 404。

## 自动推进策略固化发现（2026-02-25 21:36:55）
1. 仅靠口头偏好无法长期稳定执行风格，必须把“默认自动推进 + 高风险确认门”写入控制面策略文件。
2. 启动模板若不显式声明自动推进，跨模型/跨会话容易回退到“每步询问”的高摩擦模式。
3. 把自动推进策略写进 session capsule 的 next_actions，可以让新会话在读取入口包后直接继承执行节奏。
4. mojibake 判因需要多信号组合（replacement char + Latin 指纹 + 中文乱码指纹）；单一特征容易漏检。

## Batch48 差异方法提炼（2026-02-26 12:08:45）
1. **Harness 导向（工程支架优先）**：重点不是“多写代码”，而是“把纪律写进系统支架”。核心动作包括：黄金规则机器化、技术债持续小额自动偿还、阻塞门控最小化。
2. **多 Agent 的边界前置**：先问“是否必须多 Agent”，不是默认并行。仅在上下文污染、覆盖不足、职责冲突三类条件成立时切换多 Agent。
3. **Workflow 决策显式化**：`Prompt Chaining / Routing / Parallel / Evaluator` 不是风格偏好，而是质量-成本-速度三角上的工程选择。
4. **评估金字塔**：代码评分（快）+ 模型评分（语义）+ 人类评分（校准）三层闭环；核心判据是 `Outcome`，不是口头“我修好了”。
5. **Skill 体系化**：Skill=过程知识+组织背景；采用“元数据->正文->附属文件”的渐进式披露，避免把大体量知识一次塞入上下文。
6. **行动空间分层**：原子函数层（模式安全）/ 沙盒工具层（可扩展）/ 代码执行层（能力上限）分层协作，兼顾稳定性与扩展性。
7. **压缩不是删信息**：摘要需 schema 化；简单任务可“先返回后压缩”，复杂任务交给子 Agent 封装，并配“关键洞见落盘”保险机制。

## 对当前全局工程的策略结论（2026-02-26 12:08:45）
1. **阶段优先级调整**：从“省 token 优先”切换到“高质量 + 高效率优先”，token 优化降级为约束项而非主目标。
2. **codex-host 定位调整**：进入“保留维护、暂缓新功能”状态，避免在核心价值切换期继续扩展边缘复杂度。
3. **后续主线**：先补评估与可观测性，再谈能力扩展；坚持“可验证产出”优先于“功能堆叠”。

## 风险与注意（2026-02-26 12:08:45）
1. `memory_digest.latest.md` 仍存在历史乱码内容混入，说明“历史污染可见性”问题未完全消除；当前不影响库可用性，但会降低阅读质量。
2. 历史污染治理仍应坚持非破坏式原则：不删原文，以标签化、归档索引、路由降噪为主。

## Phase A 评估底盘新增发现（2026-02-26 14:49:06）
1. 过去治理链路“可运行但不可量化”是主要短板：缺统一 Outcome/Trial/Transcript 结构，导致跨轮比较困难。
2. 将评估入口收敛到 `contextctl -Action eval-run` 后，启动、记忆、门禁三条链路可一次性采样，复盘效率显著提升。
3. `foundation.v1` 采用 7 个最小 case（真源文件、health、memory roundtrip、pack smoke）即可覆盖当前关键失效面，属于低扰动高价值基线。
4. 报告双轨（latest + stamped）对“当前状态查看”和“历史趋势追溯”同时友好，避免 latest 覆盖导致证据丢失。
5. 实测结论：本轮 `eval-run` 为 `7/7 pass`，`memory_db_path` 正确指向 `C:\Users\Lenovo\.codex\mcp-memory\memories.db`，符合 AGENTS 的记忆写入硬约束。
6. 下一步建议（Phase B）：在不改现有主流程的前提下，补充二级 suite（高负载/异常注入）与周对比摘要，形成“可观测退化预警”。

## Phase B 评估产品化发现（2026-02-26 14:58:03）
1. 单套件评估可以证明“本次可用”，但无法回答“近期是否退化”；批量 + 趋势是进入工程治理闭环的必要升级。
2. `foundation-matrix` 的价值在于提前暴露路由层退化，不必等到真实业务会话才发现 profile 映射问题。
3. 评估结果文件必须分层：
   - 单套件 latest（快速定位）
   - batch latest（总览）
   - trend latest（趋势）
   - stamped（证据档案）
4. `eval-trend` 首次错误证明：评估系统本身也需要被评估；把“报错 -> 根因 -> 修复 -> 再验证”写进进展日志可显著提升可维护性。
5. 目前趋势窗口=2，统计意义有限；后续至少积累到 8-12 条后，趋势分析才具备稳定参考价值。

## Phase C 看板化发现（2026-02-26 15:03:07）
1. 只有 json 报告会提高读取门槛；把批量结果压成单页 dashboard 后，回会话接管速度明显提升。
2. 看板只展示“状态+趋势+关键证据指针”，不替代原始报告；这种“摘要 + 可追溯”组合最稳。
3. 当前趋势窗口较小（3），适合作为健康指示，不适合作为长期统计结论；应继续累积样本。
4. 这轮完成后，评估系统具备四层产物：single / batch / trend / dashboard，可覆盖执行、复盘、交接三个场景。

## 自动托管执行发现（2026-02-26 15:05:40）
1. 在用户离线场景下，最有效的收口方式是“产物先行”：先把系统状态沉淀成 dashboard 与 return brief，再等待用户拍板下一步。
2. 记忆写入用 `MessageB64 + roundtrip` 可以稳定规避终端编码波动，适合无人值守阶段。
3. 当动作链条跨多个阶段时，必须同步写入 task/progress/findings + memory，否则跨会话恢复会出现“产物有了但决策链断裂”。

## 自动化入口补齐发现（2026-02-26 15:08:21）
1. 把评估动作收敛为“单脚本一键执行”可以显著降低回归成本，尤其适合你离线或切窗口后快速恢复节奏。
2. 评估系统最怕“能用但不执行”；补一键脚本后执行概率会明显提升，这比继续堆新规则更有收益。

## 脚本层稳定性发现（2026-02-26 15:14:43）
1. 脚本编排层里“参数透传方式”本身就是高风险点；即便业务逻辑正确，也会因调用方式不稳定导致误判失败。
2. 把参数调用统一成 hashtable splat 后，跨动作一致性明显更好，且后续扩展参数更安全。
3. 将评估链默认绑定到收工脚本，能把“评估忘跑”这个人为风险降到最低。

## 月维护接入评估链发现（2026-02-26 15:17:49）
1. 把评估动作并入月维护后，治理与质量不再割裂，避免“治理做了但质量没验”的常见断点。
2. 统一入口价值高于新增命令：同一个 `monthly-maintain` 直接输出治理结果和质量状态，最符合长期复利。
3. 对离线/低关注维护场景，这种“默认自动收口”比额外提醒更可靠。

## 日志编码治理发现（2026-02-26 15:27:53）
1. 日志文件中的不可见控制字符会直接造成文本显示异常与后续解析不稳定，属于必须优先治理的问题。
2. 对日志做控制字符清洗属于无损治理（不改业务语义），建议保持为常规维护项。

## 运维巡检闭环发现（2026-02-26 15:42:32）
1. 仅有 eval 看板不足以覆盖“真源偏移/编码污染”问题，必须加独立 ops-health 才能在离线时提前预警。
2. 月维护接入 ops-health 后，治理动作从“只做整理”升级为“整理 + 健康判定 + 可追溯报告”一体化。
3. 控制字符检查应保留在巡检主链路，否则日志乱码会在后续会话中再次放大。
4. ops-health 报告采用 latest + stamped 双轨后，既能看当前状态，也能做历史对比，适合长期复利治理。

## 错误台账收敛发现（2026-02-26 15:57:51）
1. 错误日志如果只追加不收敛，会长期污染启动引导；必须提供 resolve 通道。
2. 按 ErrorCode 批量将 pending/captured 标记为 resolved，可以在不删除原始记录前提下降低噪声。
3. 
`resolve-error` 设计为幂等后，重复执行不会再次修改已解决条目，适合自动化周期调用。

## 收工入口优化发现（2026-02-26 16:00:47）
1. 仅做 daily-close 不能覆盖配置偏移与编码污染风险，收工后追加 ops-health 更稳。
2. 给收工脚本保留 -SkipOpsHealth 可兼顾速度与排障场景，默认仍应启用。

## 最终复核发现（2026-02-26 16:04:39）
1. 巡检和月维同时通过，说明新增能力与既有链路兼容，无回归迹象。
2. 在当前结构下，最容易失稳的点已转为“策略拍板类事项”，不再是脚本可用性故障。

## 交接文件编码发现（2026-02-26 16:08:09）
1. PowerShell 双引号 here-string 中的反引号数字组合（如 02）会写入 NUL 字符，导致隐藏乱码。
2. 交接文本应统一使用单引号 here-string 或避免反引号包裹数字前缀文件名。


## 开工入口优化发现（2026-02-26 16:19:11）
1. 开工即巡检能提前发现真源、编码、报告新鲜度问题，降低“带病开工”概率。
2. 开工和收工都默认巡检后，系统健康状态在会话边界两侧都可追溯。







## 日志可读性修复发现（2026-02-26 16:40:44）
1. 受损文案主要来源于早前控制字符/NUL 清洗后的断词副作用，常见表现为命令首字母丢失与代码标记断裂。
2. 本次采用“仅修文本、不改语义”的回正策略，重点修复 resolve-error、run-mainstream/run-once、robocopy、roundtrip_ok 等高频关键词。
3. 修复后复核结果：task_plan.md、progress.md、findings.md 控制字符计数均为 0，日志可读性恢复。

## 日志回正复核（2026-02-26 16:55:00）
1. 历史日志中存在“清洗后首字母丢失”现象，已补齐关键命令与字段名称，避免后续误读。
2. 本次修复仅针对文本可读性，不改变任何功能实现与发布结论。
3. 复验通过：控制字符计数为 0，ops-health 为 PASS。
## 治理文档防复发发现（2026-02-26 17:28:30）
1. 只巡检项目三文件不足以覆盖全局上下文工程，治理主文档损坏会直接影响后续会话接管质量。
2. 将 `CONTEXT_ENGINE_MASTER_PLAN_v3.md` 与交接文档纳入 `ops-health` 后，文档健康从“人工发现”升级为“自动发现”。
3. 本轮修复不涉及业务逻辑，仅修复字符与巡检覆盖面，风险低但长期收益高。
4. 证据化验收已补齐：chrome-devtools snapshot + network + console 采样均通过。
## 文本异常守卫接入发现（2026-02-26 17:40:30）
1. 仅检测控制字符不足以覆盖“断词型文档损坏”（如命令首字母缺失、受损拼写）。
2. `Get-TextAnomalyStats` 已存在但未接入主流程，属于典型“能力存在但未生效”风险。
3. 接入 `ops-health` 后，文本损坏从“人工阅读发现”升级为“自动巡检发现”，可显著降低复发漏检概率。
4. 本轮接入保持低风险：仅扩展巡检与指标，不改业务功能与外部接口。
## 文本异常规则文件化发现（2026-02-26 18:26:20）
1. 把异常规则放在脚本里会抬高维护成本，且每次加规则都要改代码并重复发布。
2. 规则外置到 `governance/text_anomaly_rules.v1.json` 后，治理策略可独立演进，执行器保持稳定。
3. 保留“默认规则回退”可避免规则文件缺失导致巡检失效，兼顾可靠性与可维护性。
4. 将 control 面关键文件纳入同一巡检集合后，文档与策略文件健康可统一度量。
## 巡检报告可读性发现（2026-02-26 18:31:20）
1. 只有异常计数不够用于排障，必须在报告层给出可直接执行的定位信息。
2. 新增 `Text Anomaly Hits` 明细后，文本损坏问题可以直接从报告定位到文件和修复提示。
## Weekly 计数修复发现（2026-02-26 18:38:10）
1. 周报计数为 0 并不等于“没有数据”，也可能是时间字段适配缺失。
2. `curated_items` 与 `memory_api` 时间字段不一致（`valid_from` vs `timestamp`），聚合脚本必须兼容两类结构。
3. 修复后周报恢复可用，说明“治理脚本的 schema 演进兼容”是长期稳定性的关键点。
## Weekly 新鲜度门禁增强发现（2026-02-26 19:05:10）
1. 仅按 eval 报告判断新鲜度会漏掉“周复盘链路失效”问题。
2. 为 weekly 增加 `latest` 固定视图后，巡检可稳定覆盖周复盘产物。
3. 在巡检报告新增 `Stale Reports` 明细，可把“发现异常”直接转成“可执行排障线索”。
4. PowerShell 读取中文文件需显式 `-Encoding UTF8`，否则易出现终端显示乱码假象。

## 月维护回归闭环发现（2026-02-26 19:13:20）
1. `monthly-maintain` 接入 `weekly-review` 后，必须同时验证“动作输出”和“指标落盘”两层，单看命令成功不够。
2. 本轮已验证 `weekly_review_ok/weekly_review_count` 同步进入 `metrics.jsonl`，说明周维链路已纳入长期可观测面。
3. `monthly-maintain` 运行中若将输出重定向到 `context-hub` 根目录文件，备份打包会因文件占用触发 `BACKUP_FAILED`；这属于执行方式问题，不是治理逻辑故障。
4. 规避规则应固定为：维护动作执行时，避免向被备份目录写实时输出文件，优先直接读取标准输出或写到外部临时目录。

## 告警治理补齐发现（2026-02-26 19:27:20）
1. 仅有“健康报告”不够，失败路径需要自动落到统一告警账本，否则故障会被下一轮日志覆盖。
2. 告警策略应“默认开启、默认非阻断”：先确保可观测，再逐步启用强约束（冻结策略）。
3. `monthly-maintain` 新增 `alerts` 输出后，回归收口可以直接判断“是否有健康隐患”而不必二次读多份报告。
4. 冻结策略先保持 `enabled=false` 可避免误伤正常流程，同时保留 `freeze_recommended` 作为治理建议位，适合渐进升级。

## 路由读取链扩展发现（2026-02-26 19:35:40）
1. 告警策略与告警摘要如果不进入默认读取链，AI 在新会话里会“看不到治理告警面”，造成信息盲区。
2. 将 `alert_policy` 与 `ALERTS.latest` 放入 profile 默认读取顺序后，启动阶段即可感知当前是否有未处理风险。
3. 错误台账收敛应与规则落地同步执行，否则 `recent_errors` 会长期显示已知问题，干扰后续判断。

## 告警治理终验发现（2026-02-26 19:40:20）
1. 告警系统在健康路径下应“零噪声”：本轮 `alerts.emitted=0`，说明新增逻辑没有引入误报。
2. 把告警写入和健康巡检分层（`alerts.jsonl` + `ops_health.latest`）后，排障路径更清晰：一个看“事件”，一个看“状态”。
3. 冻结机制保持建议态（`freeze_recommended`）是当前阶段最稳妥选择：既保留升级空间，又不阻断日常自动化。

## 告警脚本编码稳定性发现（2026-02-26 19:47:26）
1. 在杂项脚本目录中，中文脚本体在不同终端编码下仍可能触发解析异常；告警查看脚本首版已出现该问题。
2. 对于“运维入口脚本”优先采用纯 ASCII 脚本体最稳，可避免跨终端编码差异影响执行。
3. 文档与展示内容仍可保留中文，但脚本执行核心路径应优先稳态兼容。

## 本轮终验发现（2026-02-26 19:50:20）
1. 告警治理增强后，健康场景仍保持零噪声（`alerts.emitted=0`），说明改造没有引入副作用。
2. 将“规则文件 + 路由读取链 + 外层脚本 + 记忆收口”一起做完，跨会话接管稳定性明显更高。

## 巡检覆盖面补齐发现（2026-02-26 19:56:20）
1. `ops-health` 的报告新鲜度检查应覆盖“记忆摘要 + 告警摘要”两条治理关键视图，避免只监控评估报告。
2. 本轮补齐后仍保持 `stale_report_count=0`，说明新增覆盖项与当前治理节奏兼容。

## 自动冻结执行态落地发现（2026-02-26 20:16:20）
1. 冻结机制真正有价值的前提是“可执行门禁 + 可恢复状态”，仅有 `freeze_recommended` 不足以防误操作。
2. 先把拦截范围收敛到 `quarterly-prune`，可以在不影响日常流程的前提下实现强约束。
3. 冻结状态必须落盘（`runtime_state/global/freeze_state.json`），否则跨会话无法保持一致行为。
4. 冻结门禁应在动作分发前执行，才能统一覆盖 CLI 入口和自动化脚本入口。

## 冻结执行态收口发现（2026-02-26 20:38:20）
1. aalert_policy.v1.json 的说明文字即使不参与执行逻辑，也会影响跨会话理解质量；必须纳入“可读性即稳定性”治理范围。
2. monthly-maintain 的备份阶段对根目录实时输出文件锁非常敏感；同类动作应避免把实时输出写入 context-hub 根目录。
3. 自动冻结启用后，保持“最小拦截面（仅 quarterly-prune）+ 状态落盘 + 可恢复”是当前最稳的执行态。
4. 本轮复核后，告警/冻结/巡检/评估链路已形成一致闭环，未见回归。



## 日志回归修复发现（2026-02-26 20:34:50）
1. 在 PowerShell here-string 里直接使用反引号标记命令，会有概率注入控制字符并引发断词型污染。
2. 日志类文档必须避免使用反引号包裹高频关键字（例如 resolve-error、freeze_policy），建议改为纯文本或单引号字符串拼接。
3. ops-health 对控制字符 + 文本异常的双门禁是有效的，能在同轮发现并阻断该类回归。


## 防压缩执行锚点发现（2026-02-26 21:31:16）
1. 仅依赖会话上下文会有压缩后丢失风险，必须有会话外锚点文件。
2. 计划需要双形态保存：人类可读（NEXT_ACTIONS.latest.md）+ 机器可读（pending_execution_plan.json）。
3. 在用户连续提问阶段，锁定 auto_execute=false 可以降低误推进风险。

## 证据事件层收口发现（2026-02-27 01:19:06）
1. “语义记忆可去重”与“验证证据不可去重”必须分层；否则会出现结论可查、证据缺失的审计断层。
2. 把证据事件落为独立 `jsonl`（含 `trial_id/case_id/req字段`）后，跨会话复盘可以直接按事件检索，不再依赖摘要文本命中。
3. 证据门禁应与评估同程执行；若放在会话后处理，会出现“先宣告通过，再发现证据缺口”的流程倒挂。

## 记忆写入口径统一发现（2026-02-27 01:19:06）
1. 仅记录 `ok/content_hash` 无法表达“被去重但非失败”的真实状态，容易引发统计误读。
2. 统一为 `attempted/accepted/dedup_rejected/failed/net_new` 后，写入结果具备可计算性，周报与趋势图可直接使用。
3. `memory_selftest` 与 `memory_write` 的门禁字段必须区分“必要字段”和“可选字段”，否则会把健康写入误判为失败。

## Agent Teams 条件接入发现（2026-02-27 01:19:06）
1. 并行团队不应默认全开；应由条件触发并可解释输出，否则会增加 token 成本与流程噪声。
2. `team_policy=auto|force|off` 是稳定的人机协作接口：默认自动、需要时强制、排障时关闭，避免“黑箱路由”。
3. 在自动策略输出中增加 `teamActivation`（触发信号）后，调度决策从“结果可见”升级为“决策可审计”。

## 抖音48集方法映射（本轮已落地部分）
1. 已落地“证据账本优先”（事件层）与“执行可解释化”（teamActivation），对应长期复利中的可追溯与可演进能力。
2. 仍待落地：Evo Unit 评分器（P1-2）与跨外部聊天平台接入层（P1-3），下轮继续按 P1 队列推进。

## 2026-02-27 10:31:55（本轮收口新增发现）
1. contextctl 全局参数默认 Source=manual 会误伤 import-chat 的自动来源识别，导致导入质量退化（表现为 source=manual、角色统计粗糙）。
2. 将 import-chat 的 manual 映射为 auto 后，codex-session 可恢复结构化解析统计。
3. 外部会话格式存在历史差异，codex-session 解析需要“结构化优先 + generic 回退”双通道，才能同时保证质量与不丢记录。
4. 当前 kept_by_role.unknown 仍偏高，属于下一批可优化项（P2），不影响本轮 P1 完成判定。



## 2026-02-27 10:34:58（记忆与巡检补充发现）
1. memory-selftest 在内容语义重复时会返回 duplicate-tolerated（不算服务故障），与普通业务记忆写入口径应分开看。
2. 关键记忆写入应优先使用 contextctl -Action memory-write，可稳定得到 attempted/accepted/dedup_rejected/net_new 结构化结果。
3. 本轮 ops-health 全绿，说明本次收口未引入新的控制字符或策略文件回归。


## 2026-02-27 10:38:02（记忆写入口径缺陷修复）
1. 发现旧逻辑缺陷：/api/memories 在 HTTP 200 但 success=false（去重）时被误统计为 accepted。
2. 已修复为“HTTP 状态 + 业务 success 双判定”，确保去重场景正确归类到 dedup_rejected。
3. 复验通过：重复写入样本返回 dedup_rejected，不再虚增 net_new。

## 2026-02-27 11:47:20（P2 收口新增发现）
1. `unknown` 角色高占比的根因不是文本抽取失败，而是 codex 历史会话里存在顶层 `turn_context/compacted` 事件，之前未映射角色导致落入 unknown。
2. 在 `infer_codex_fallback_role` 中补齐顶层系统事件映射后，`external_chat` 导入质量显著提升（unknown 归零），且不需要删除任何原始记录。
3. `evo-score` 趋势与 `ops-health` 新鲜度联动后，质量评分从“单点可用”升级为“趋势可观测 + 过期可告警”。
4. start-session 的轻量注入新增 `external_chat_bridge` 指标（含 `unknown_role_ratio`）后，跨聊天复盘可先读摘要再按需读原始层，冷启动成本更低。

## 2026-02-27 11:56:20（P3 首批收口新增发现）
1. 桥接质量如果只看 `kept_records`，无法判断导入过程中是否存在被静默跳过的数据；必须显式输出 `parse_stats`。
2. `ops-health` 中加入 `bridge_quality` 后，可在一次巡检中同时看到“服务健康 + 文本健康 + 桥接健康”，排障入口统一。
3. 把 `evidence_refs` 固化进 `pack/capsule` 后，新会话首轮不再需要人工回忆报告路径，验收链路更稳定。
4. `unknown_role_ratio=0` 与 `parse_skipped_total=0` 组合可作为当前桥接质量达标信号。

## 2026-02-27 12:36:51（P4 收口发现与结论）
1. 仅有 parse_stats 无法做跨版本质量回归，必须补齐“结构版本 + 解析器版本”双锚点。
2. ops-health 之前只展示 bridge 质量，不会主动告警，导致异常只能人工盯报告发现。
3. evidence_refs 缺少时效信息时，AI 在长会话中可能误引用过期证据，影响验收可信度。

### 本轮落地
- external_chat_bridge 视图新增 source_schema_version/parser_version。
- ops-health 新增 bridge_quality_policy + bridge_quality_alerts，告警走软阈值（不影响 ok 判定）。
- view_pack/session_capsule 证据项新增 freshness_hours/age_hours/stale。

### 回归证据
- import-chat 输出显示：source_schema_version=external_chat_bridge.v2、parser_version=import_external_chat.py@2026-02-27.1。
- ops_health.latest.json 显示 bridge_quality_policy 与 bridge_quality_alerts 字段存在，当前告警数为 0。
- view_pack.general_ops.json 与 session_capsule.latest.json 的 evidence_refs.reports[] 已包含新鲜度字段。

## 2026-02-27 12:58:22（P5 收口发现）
1. bridge 软阈值告警在连续巡检场景会出现“同原因重复刷屏”，必须在告警层增加时间窗去抖，避免告警噪音掩盖新问题。
2. 证据新鲜度既要在 `pack/capsule` 显式标注，也要在 `ops-health` 给出 completion gate，否则仍可能“带过期证据宣告完成”。
3. bridge 质量治理不能只看 latest 单点，趋势视图是判断“治理是否持续有效”的必要补充。
4. 本轮回归显示 `verification_gate_allow_completion=true` 且 stale 证据数为 0，说明新门禁没有误伤健康流程。

## 2026-02-27 13:16:27（P6 收口发现）
1. completion gate 如果只出现在 `ops-health` 报告中，收口动作仍可能“先完成后发现问题”；必须前置到 `session-close/daily-close`。
2. 告警与证据视图要做成独立 Action 才能在不同会话、不同 Agent 中复用，避免强绑定单一流程。
3. `weekly-review` 自动附带告警/证据摘要后，周复盘不再需要手动拼接多份报告，入口复杂度明显下降。
4. 当前回归中 `verification_gate.allow_completion=true`，说明前置 gate 接入没有影响正常收口链路。

## 2026-02-27 13:36:09（P7 收口发现）
1. 新增视图如果不进入 `ops-health` 新鲜度门禁，会出现“摘要可生但长期不更新仍被判健康”的盲区。
2. `monthly-maintain` 是最稳定的批量治理入口，适合自动串起告警与证据摘要刷新，减少手动维护动作。
3. gate 阻断必须伴随标准恢复步骤输出，否则用户知道“被拦截”但不知道下一步如何恢复。
4. 本轮大回归（含 monthly-maintain）全绿，说明 P7 改造未破坏现有治理闭环。

## 2026-02-27 14:35:24（P8 收口发现）
1. gate/alerts/evidence 分别看报告会造成决策切换成本高，聚合总览（verification-board）能显著降低冷启动判断时间。
2. 阻断机制如果不做“可演练 + 可回放”，长期会出现规则漂移；`verification-drill` 把这件事变成可重复检查项。
3. 高频成功指标持续全量写入会稀释异常信号，成功采样压缩能在不丢失败记录的前提下降噪。
4. 采样策略必须可配置、可审计（策略文件 + 状态文件），否则后续无法解释“为什么这条成功指标没写入”。

## 2026-02-27 14:40:56（P9 收口发现）
1. 仅有 vverification_board 还不够，必须把指针挂到 weekly-review 才能进入固定复盘路径。
2. 成功采样若直接丢弃会破坏“原始层永久可读”原则；分流到 `metrics_raw.jsonl` 可同时满足降噪与追溯。
3. 采样状态如果不落盘，跨会话会重复计数导致采样不稳定；`metrics_sampling_state.json` 可保证一致性。
4. 连续 `ops-health` 回归中 sampled-out 记录正确落 raw，说明采样链路可用且无数据丢失。

## 2026-02-27 15:10:43（P10 收口发现）
1. vverification_board 的硬编码阈值会导致后续策略调整必须改代码，外置为 policy 后可实现“调参即治理”。
2. verification_drill 单场景无法覆盖真实故障类型，多场景模板（stale/network/parse）能把恢复路径标准化。
3. metrics 主账本采样降噪后，必须有 raw 月维归档索引保障可追溯；否则长期审计会出现“有策略无入口”。
4. monthly-maintain 自动执行 metrics_raw 归档可避免运维遗忘，符合“低风险自动推进”规则。

## 2026-02-27 15:21:18（P10 收口后补充）
1. 双引号 here-string 中反引号会触发转义规则，含 verification 等以 v 开头的 markdown 代码片段容易引入垂直制表符。
2. 该类污染不会总是立刻导致脚本失败，但会影响巡检与后续可读性，必须当轮清洗并复验。
3. 对日志/计划类文档，建议优先使用单引号 here-string 或不包反引号代码样式。


## 2026-02-27 17:12:14（外部方案研究发现：stellarlinkco/codex）
1. 目标仓库已实现的硬能力：
   - 多 Agent 工具链：spawn_team/wait_team/team_task_*/team_message/team_broadcast/team_cleanup（core handler 与 tools spec 均有注册）。
   - hooks 体系：支持 config 全局 hooks 与 skill-scoped hooks，含 SessionStart/PreToolUse/PostToolUse/PermissionRequest/SubagentStart/TaskCompleted。
   - serve 体系：codex serve 使用 axum + SSE + WebSocket + token 校验，支持单进程多会话 web 入口。
   - Anthropic 接入：存在 client_anthropic.rs 与依赖项。
2. 风险与边界：
   - 安装文档口径存在差异（README 提供 Windows PowerShell 安装，但 install 文档强调 Windows 11 via WSL2）。
   - 许可证为 AGPL-3.0，若做修改并对外提供网络服务需评估源码开放义务（需法务口径确认）。
   - agent teams 文档标注 experimental，适合灰度接入，不适合一次性替换全部生产路径。
3. 与我方现状对比（客观）：
   - 我方在“上下文治理/记忆生命周期/证据门禁/巡检看板”更强（context-hub v3 已形成闭环）。
   - 目标仓库在“内核级 teams + hooks + serve 协议栈”更强。
4. 产品方向判断：
   - 最优不是“全替换”，而是“并行接入 + 分层择优”：保留我方治理面，按需吸收其内核执行能力。

## 2026-02-27 17:32:29（增强版出现后的升级发现）
1. `stellarlinkco/codex` 的优势在执行内核（agent teams + hooks + serve），我方优势在治理内核（context-hub + gate + evidence + ops-health）。
2. 最优路径不是替换，而是“治理内核保持不动 + 执行内核按需吸收”，先并行接入再做切流决策。
3. 抖音方法集里对我们最有增益的不是“共同点”，而是差异方法：可逆压缩、受控多样性、启动序列硬化、错误资产化、runtime_state 隔离、双账本。
4. 风险控制策略：允许一般风险，但必须避免三类高代价风险（上下文污染不可回退、证据链断裂、自动化黑箱不可解释）。
5. 下一阶段应聚焦“接入能力与治理能力融合”，而不是单纯追新功能清单。

## 2026-02-27 17:45:30（巡检异常判因补充）
1. `ops-health` 的失败主因并非系统损坏，而是健康门禁已纳入两份“未来视图”，当前尚未实现生成动作：
   - `data/views/vverification_drill_coverage.latest.json`
   - `data/views/metrics_raw_quarterly.latest.json`
2. 这类失败属于“规划未落地导致的门禁缺口”，应按 P11 任务补齐，不应通过手工伪造文件掩盖。
3. 另发现 `contextctl.ps1` 文本异常检测函数缺少空值保护，已补丁修复，避免后续巡检误中断。

## 2026-02-27 18:15:34（P11 落地发现）
1. ValidateSet 存在并不代表动作可用；若 switch() 或内部函数缺失，会形成“可调用但无产物”的隐性故障。
2. ops-health 将目标视图纳入 stale 检查后，能可靠暴露“规划未实现”的缺口，不应通过手工补文件绕过。
3. PowerShell 变量大小写不敏感，参数名与局部变量名仅大小写区别会互相覆盖，需避免（本轮已修复 EvoScore 覆盖误判）。
4. drill coverage 与 quarterly 视图接入 monthly-maintain 后，可把“单次手工执行”变为“周期自动刷新”，显著降低回归风险。

## 2026-02-27 19:04:38（P12/P13 收口发现）
1. P12/P13 的关键能力（执行内核适配、条件多Agent、三轴验收）已全部进入 contextctl 主动作链，且 latest 视图稳定生成。
2. 先前 monthly-maintain 的超时问题在本轮未复现，整链已成功跑通；主要风险由“逻辑失败”转为“执行耗时较长（约 495s）”。
3. 三轴验收在当前基线下给出 status=healthy、grade=A，说明接管质量与证据完备性已达到可持续运营状态。
4. 下一阶段重点从“功能补齐”转向“灰度策略与长期趋势校准”（P14）。

## 2026-02-27 19:26:17（P14-1/P14-2 收口发现）
1. 灰度策略必须是“多门禁叠加”而不是单阈值：本轮把 task_type、kernel、critical_alert、complexity、sampling 五个维度统一到 rollout 判定，避免盲目并行。
2. 周维稳定性视图是必要中间层：仅看 latest 无法判断策略是否稳定；agent-team-weekly 让 mode 分布、预算区间、采样命中具备趋势可读性。
3. 初版时间解析实现存在 DateTime.TryParse 用法陷阱（ref 变量未类型化），已修复并复验，避免周视图误报 total=0。
4. 本轮整链验证通过后，剩余重点是 P14-3：将三轴阈值与趋势基线做策略化校准，减少“看板有值但阈值未对齐”的风险。

## 2026-02-27 19:45:30（P14-3 收口发现）
1. `acceptance-triad-baseline` 的价值是把“单次分数”升级为“窗口统计 + 阈值建议”，从而让 healthy/attention 判定可持续调优。
2. PowerShell 字符串转义（`\"`）在脚本文件中会直接破坏语法树，属于高优先级稳定性风险；修复后应立即跑完整链路回归。
3. 当前 30 天窗口样本下，triad 建议阈值为 `healthy=86`、`attention=78`（仅建议，不自动落盘覆盖现行策略）。
4. P14 全收口后，下一阶段重点应从“指标补齐”转向“体验与执行协同”：对标报告产品化、注入质量自动验收、shadow-mode 稳态固化。

## 2026-02-27 20:24:20（P15 收口发现）
1. “能力已实现但执行锚点未更新”会造成错觉性 backlog；必须把 latest 产物状态和计划文件状态同步收口。
2. shadow-mode 的有效验收不是只看 status，而是必须跑一次 disable/enable 双向切换并复核 strategy 输出。
3. 注入质量验收三场景（全量上下文/仅全局上下文/抗噪）可以作为新窗口无缝接管的统一质量基线。
4. 对标报告产品化后，关于 Codex 增强版的决策从“口头比较”升级为“可计算、可复验、可周维追踪”。
5. 下一阶段应做 P16：把注入验收从 latest 升级到周维趋势，并把多Agent触发质量做成稳定看板。
## 2026-02-27 21:14:33（P16 收口发现）
1. 仅把 P16 三视图纳入 `ops-health` stale 检查还不够，必须再纳入“解析摘要 + Markdown 主视图”，否则用户在单页健康报告里看不到 P16 核心状态。
2. `monthly-maintain` 已具备 P16 视图执行与指标写入能力，但若 `ops-health` 不同步解析，巡检与月维会出现信息不对称。
3. 本轮补丁后，`ops-health.latest.md` 已统一输出：注入周维状态、AutoGate 风险等级、多Agent 触发质量指标，收口决策可直接在一页完成。
4. P16 三项已形成闭环：独立 action -> latest 视图 -> ops-health 摘要 -> monthly-maintain 指标；后续可直接进入 P17“执行态联动”阶段。
## 2026-02-27 22:17:40（P17 收口发现）
1. `daily-close` 已有 AutoGate 执行态，但 `session-close` 缺失同等门禁会导致收口策略不一致；双链路对齐后，阻断语义与恢复步骤一致。
2. 仅在 `ops-health` 展示 P16 三视图不够，`verification-board` 与 `weekly-review` 也必须挂载同源摘要，才能形成“周报-看板-巡检”一致口径。
3. 多Agent 触发质量阈值告警如果不进入 `monthly-maintain` 指标，将无法做月维趋势治理；本轮已补齐 `agent_trigger_quality_alerts_count` 指标链路。
4. 本轮真实阻塞并非逻辑错误，而是环境容量：`monthly-maintain` 备份阶段会写入大型 zip，C 盘 0 字节时必然触发 `BACKUP_FAILED`。
5. 处理策略采用无损迁移而非删除：将 `context-hub\\migrations` 大备份整体迁移到 D 盘归档目录，既恢复可写空间，又保留永久档案可追溯。

## 2026-02-27 23:15:30（P18 收口发现）
1. 之前“是否超过增强版/能否实战”主要靠口头解释，缺少可计算判定，容易引发执行边界不清。
2. 把 V1 门禁产品化为 v1-readiness 后，完成标准变成可重复执行、可追踪指标，而不是主观判断。
3. verification-board 挂载 V1 摘要后，周报、看板、月维输出口径一致，减少“看板通过但收口不确定”的灰区。
4. 本轮实测结果为 ready_for_v1(score=100)，说明当前体系已满足“进入 7 天真实项目试运行”的最低门槛。


## 2026-02-27 23:42:58（P19 收口发现）
1. 仅有 latest 报告不足以驱动会话接管，必须把 readiness 摘要直接注入 start-session/daily-start 返回值，才能稳定降低新窗口冷启动成本。
2. 7 天实战看板与 ETA 视图接入后，执行状态从“主观估计”升级为“可计算剩余工时 + 可观测阶段进度”。
3. 执行锚点不回写会造成“功能已做完但计划仍 pending”的错觉；因此本轮把锚点回写列为单独收口步骤。
4. 本轮复验显示治理链路稳定：新增视图未引入 stale/missing/control/text 异常。

## 2026-02-28 00:34:21（P20 收口新增发现）
1. daily-start 失败的主因不是脚本逻辑，而是运行环境：127.0.0.1:8000 的 memory 服务未启动，导致健康门禁失败。
2. trial-preflight 结果需要在 ops-health 和 monthly-maintain 同步可见，否则会形成“门禁通过但巡检不可见”的信息断层。
3. trial-preflight 报告摘要中的 v1_trial 字段必须显式赋值，否则会出现 null，影响可解释性。
4. 本轮已验证：修复后 trial-preflight=ready_for_formal_run，且 ops-health/daily-start/monthly-maintain 全部通过。



## 2026-02-28 09:45:56
- 问题：memory 自检长期出现 duplicate-tolerated，无法形成 roundtrip 证据。
- 原因：自检文本语义模板固定 + Windows 子进程编码默认 GBK。
- 处理：引入高熵随机内容生成；subprocess.run 改为 bytes 捕获并显式 UTF-8 解码；保留多次重试。
- 验证：python memory_selftest_utf8.py 返回 roundtrip_verified=true；contextctl -Action ops-health 通过。

## 2026-03-02 13:58:03（OpenClaw24 研究新增发现）
1. 这批视频最有价值的不是“功能堆叠”，而是三条工程主线：事件化回调、上下文预算化、协作模板化。
2. StopHook + SessionEnd 双回调模式对我们价值很高，可替代部分主链路轮询，直接降低 token 与等待成本。
3. QMD/索引注入 的本质是“每轮注入预算硬门禁”，这与我们现有 pack 思路一致，但我们缺少运行态阈值策略。
4. “有记忆不等于会进化”这点成立：必须把执行反馈写回策略层，而不是只存对话历史。
5. 对我们而言，最优仍是“保留治理内核 + 吸收执行内核优势”，不建议整套替换为外部增强版。

## 2026-03-02 21:02:40（本轮新增发现）
1. 上下文注入验收从 A 降到 B（83.33）的主因不是缺文件，而是 NEXT_ACTIONS/pending_plan 新鲜度超过 48 小时阈值。
2. 记忆巡检显示 memory-govern 执行成功（applied=127, failed=0），但 memory digest 文档存在历史乱码内容，属于数据层历史污染，不影响服务可用性，但会影响可读性。
3. evidence_events 近 24h 为 0、近 7d pass_rate=0.9958，说明近期未跑大量真实任务，证据事件主要来自治理动作。

## 2026-03-02 21:02:40（本轮决策）
1. 继续保持“主链稳定优先”：先跑真实任务积累 7 天证据，再进入 OpenClaw 隔离接入验证。
2. OpenClaw 采取“隔离试装 + Shadow 对比 + 可回退”路径，不做直接替换。
3. 下一轮应优先处理 memory digest 可读性治理（编码与污染条目标记），避免长期阅读成本上升。
## 2026-03-02 21:06:59（注入质量回归）
1. 刷新执行锚点后，context 注入评分从 B 恢复到 A（100/100）。
2. 结论：此前扣分属于执行锚点新鲜度问题，不是体系结构缺陷。
## 2026-03-02 21:14:06（记忆摘要可读性修复）
1. 乱码根因确认：memory_digest.latest.md 由 Python 以 UTF-8 无 BOM 写出，Windows PowerShell 默认按 ANSI 读取时出现假乱码。
2. 修复策略：仅将 digest 输出改为 utf-8-sig，不改 raw/catalog 原始数据，保证“可读性提升 + 数据不破坏”。
3. 回归结果：memory-govern 再跑后，digest 在终端与编辑器均可正常显示简体中文。

## 2026-03-04 14:15:38（OpenClaw 接入新增发现）
1. 仅开启候选内核会触发选路逻辑缺陷暴露：原排序实现对 hashtable 行为不稳定，导致低优先级内核被误选。
2. 排序修复后，接入策略可稳定实现“已接入、可观测、可回退、但不抢主链”。
3. 当前最优路径仍是：OpenClaw 作为执行候选并行；治理内核与记忆主通道保持不替换。
4. 接入后主链健康保持：ops-health=ok，trial-preflight=ready_for_formal_run。

## 2026-03-04 17:49:52（OpenClaw 参数绑定故障复盘）
1. 根因不是业务逻辑，而是 PowerShell 参数传递机制：数组 splatting（@array）会按位置传参，不保证命名参数绑定，易引发错位。
2. 在脚本封装场景中，优先使用 hashtable splatting（@{ Port=... }）可显著降低命名参数错位风险。
3. 回归策略应固定为串行：并发调用 contextctl 会争用同一状态文件，可能触发原子写入冲突。
4. 本次修复后，OpenClaw 启停链路已可稳定复用到后续自动化动作（含 restart 与状态观测）。

## 2026-03-04 18:36:57（OpenClaw 启动稳定性与守卫策略发现）
1. traffic-guard 适合做观测指标，不应默认做启动阻断；对演示/试跑阶段会放大非功能性失败。
2. OpenClaw 启动失败的真实根因是 token 值首字符为 - 时被 CLI 解析为新参数，而非端口或进程问题。
3. 参数传递在 CLI 封装层应优先使用 --key=value，可显著降低边界值被误解析概率。
4. 修复后串行回归稳定通过，说明当前 OpenClaw 接入链路已具备“可启停、可观测、可回退”的运行条件。


## 2026-03-04 19:29:11（Telegram -> OpenClaw 远程执行新增发现）
1. PowerShell 中使用 $pid 会命中内置只读变量 $PID，在 stop 脚本中会直接抛异常；必须改为自定义变量（如 $procId）。
2. Telegram worker 的 daemon 常驻策略已可在 token 缺失时保持进程存活，适合先部署后注入凭据。
3. /exec 直调 OpenClaw 已可稳定执行并返回结果，说明“Telegram 命令 -> worker -> OpenClaw exec”主路径可用。
4. 当前未打通的仅是外部鉴权数据（bot token + allowed chat ids），属于运行参数缺失，不是代码链路故障。

## 2026-03-04 19:43:42（Telegram 文案质量收口）
1. 之前 Telegram worker 的回执文本存在历史编码污染，虽然执行链路可用，但会直接降低远程协作可读性。
2. 本轮将命令帮助、执行结果、latest 视图等可见文本统一回正为简体中文，确保“可执行 + 可理解”同时成立。
3. /help 与 /exec 回归后输出正常，说明修复未引入行为回退。

## 2026-03-04 20:21:32（Telegram 远程链路新增发现）
1. 仅支持环境变量会放大“凭据注入时机”问题；加入 auth-file 通道后，daemon 可先常驻再后置注入凭据。
2. Windows PowerShell 5 与 PowerShell 7 语法差异（如 ??）会导致脚本在真实机器上间歇不可用，必须按系统 PowerShell 兼容语法编写。
3. llowed_chat_ids 若只写单值，JSON 可能退化成标量；worker 端应容忍数组/标量/逗号串，避免因格式细节导致收不到消息。
4. 当前系统已具备“无环境变量也可配置凭据”的能力，最后阻塞从“代码问题”收敛为“真实凭据缺失”。

## 2026-03-04 20:44:13（并发写入与质量门禁补充）
1. contextctl 在并行动作下会争用 metrics.jsonl，需要在写入层做重试而不是上层串行化，才能兼顾稳定和吞吐。
2. ops-health 的 control-char 门禁能及时发现日志文档污染；本轮 4 个控制字符均来自 progress.md/findings.md，清洗后健康状态恢复为 PASS。
3. 对 Telegram 远程链路而言，当前系统风险已从“代码不稳”转为“凭据缺失”，具备进入外部联调的前置条件。

## 2026-03-05 07:13:02（Guardian 落地发现）
1. 仅依赖 daemon start/status 无法覆盖崩溃后自恢复；新增 guardian 循环后可自动拉起 openclaw 与 telegram daemon。
2. 远程链路现阶段故障域已收敛到外部凭据，不再是代码链路问题。
3. trial-preflight 当前为 ready_with_risk 的唯一高项是 execution_eta 未清空，与 Telegram 远程链路可用性无直接冲突。

## 2026-03-07 21:14:08（OpenClaw 官方主链时延专项诊断）
1. 当前官方 OpenClaw 主链已从“不会干活”转为“能干活但时延波动明显”，问题性质已变化。
2. `openclaw.json` 当前主路为 `gemini-3.1-pro-preview`，fallback 仍偏向 pro/codex 档，尚未做 flash 类对照实验。
3. 当前模型配置里已明确 `reasoning=false`，因此“推理强度太深”不是唯一主嫌，必须用基准对比排除。
4. 下一个最值动作不是继续加 skills/key，而是用同一任务样本对比模型等级与主链开销，再决定是否将 Telegram 聊天主路切向 flash。

## 2026-03-07 21:41:33（OpenClaw 官方主链时延专项诊断新增发现）
1. 官方 openclaw agent 的默认路径与显式 --thinking off 存在数量级时延差异：默认约 347.8s，--thinking off 约 14.6s。
2. 但当前 C:\Users\Lenovo\.openclaw\openclaw.json 中各模型已显式设置 easoning=false，且 session 事件中也出现 	hinkingLevel=off，因此单靠“推理太深”无法解释全部慢点。
3. D:\AIClient-2-API\logs\app-2026-03-07.log 明确记录 gemini-3.1-pro-preview 连续 429、指数退避与凭据切换，这构成当前时延的最强外部证据。
4. /v1/models 已确认 gemini-3-flash-preview 可用，且不在用户禁用清单（仅禁 gemini-2.5-flash 与 gemini-2.5-flash-lite）。
5. 因此下一步最值动作不是继续加技能或盲调 OpenClaw，而是把官方主路切到 gemini-3-flash-preview 做同路径对照实验。

## 2026-03-07 22:00:00（OpenClaw flash 主路复验结论）
1. gemini-3-flash-preview 明显比 gemini-3.1-pro-preview 更适合作为官方 OpenClaw 当前主路：
   - 旧主路 gemini-3.1-pro-preview：默认调用约 347.8 秒。
   - 新主路 gemini-3-flash-preview：默认调用约 70.903 秒。
2. 显式 --thinking off 时，flash 主路约 6.742 秒，说明 flash 模型本身不是慢根因。
3. 默认调用仍慢，AIClient2API 日志已证明存在多次 429 与指数退避，现阶段主因仍是容量/额度退避，不是单纯 thinking 深度。
4. 当前最优产品判断：保留 flash 作为主路，再做 Telegram 官方主链真实自然语言验收；暂不继续盲改 full + all 或大量 skills。
## 2026-03-07 23:56:16（OpenClaw 转写资料库新发现）
1. 博主资料中最值得借鉴的不是“多装技能”，而是异步协作、远程安全、分层治理与最小必要自动化。
2. 对我们当前机器而言，WSL 是未来优化路线，不应抢在官方 Windows 主链稳定之前迁移；否则会同时引入文件系统、权限、systemd、网络四类变量。
3. 官方 OpenClaw workspace 现在应承担“主管人格 + 远程协作规则”的职责，而全局 context-hub 继续承担长期治理与跨项目记忆。

## 2026-03-09 08:05:30（Heartbeat 主链语义与 self-improving-agent 外证）
1. `ops-health` 目前混有旧 V1 试运行治理门禁、eval freshness 和历史试运行阈值，因此不能再直接作为“官方 OpenClaw 主链是否健康”的唯一心跳来源。
2. 更合理的产品口径是：Heartbeat 优先看 `safe_ops_ledger`、`supervisor_digest`、`telegram_realtrace` 和执行锚点；`ops_health` 保留为辅助治理告警，但不再单独把 kyuu 主链打成故障。
3. 新 Heartbeat 已按这个口径落地：
   - `ops_health.affectsOverall=false`
   - 新增 `safe_ops_ledger` 为主判断项
   - 只有官方主链边界违规、真实链路探针异常或监督摘要失败时，Heartbeat 才真正转红
4. `peterskoett/self-improving-agent` 的外部仓证据显示，它当前主要由三部分组成：
   - `SKILL.md`：把 learnings/errors/feature requests 记入 `.learnings/*`
   - `references/openclaw-integration.md`：建议把 learnings 提升到 `AGENTS.md / SOUL.md / TOOLS.md`
   - `hooks/openclaw/*`：提供可选 hook 提醒，而非强制运行时自改
5. 因此对 kyuu 最稳的借鉴不是“直接装 skill + 开 hook + 让它自己改自己”，而是吸收它的记录与提升机制：
   - 借鉴 `.learnings` 思想进入非生产草案或监督层
   - 借鉴 promotion decision tree 写回 `AGENTS.md / TOOLS.md / SOUL.md`
   - 不直接把它接入生产主链 hook，更不允许它运行时改写主链 prompt / policy / secrets

## 2026-03-08 10:13:40（OpenClaw Telegram 输出策略新增发现）
1. 官方文档当前字段是 channels.telegram.streamMode，不是旧的 streaming；旧字段会造成我们以为已开启渐进输出，但实际不一定被当前版本正确消费。
2. 在 flash 主路 + thinkingDefault=minimal 的当前配置下，本地官方 agent 轻问答约 4.6 秒完成；显式 thinking off 早前反而更慢，因此“回复慢主要因为推理太深”目前不成立。
3. 当前更合理的主嫌已收敛到 Telegram 输出策略/渠道行为，而不是模型等级本身；因此本轮启用 block streaming 属于对症优化。
4. 现阶段最值的下一步不是继续加 skills/key，也不是立即迁 WSL，而是做 Telegram 官方主链真实自然语言验收。

## 2026-03-08 17:50:27（官方 Telegram 主链慢响应根因复盘）
1. 2026-03-08 17:34 的官方 Telegram 直链慢响应，根因不是 Telegram 通道本身，也不是旧 worker 介入，而是 AIClient2API 运行时将 gemini-cli-oauth 节点判为不健康，导致 `gemini-3-flash-preview` 被静默回退到 `openai-codex-oauth / gpt-5.3-codex`。
2. 这个错路由有完整日志证据：`D:\AIClient-2-API\logs\app-2026-03-08.log` 同时出现 `No available providers for type: gemini-cli-oauth that support model: gemini-3-flash-preview`、`Trying Model Fallback Mapping -> openai-codex-oauth (gpt-5.3-codex)` 与 `Req Protocol: openai -> openai-codex-oauth | Model: gpt-5.3-codex`。
3. Gemini provider 并非永久失效。仅重启 AIClient2API 后，服务立即自动发现有效 `PROJECT_ID=polynomial-song-r1zb6`，并恢复对 `gemini-3-flash-preview` 的真实承载；随后官方 Telegram 直链探针由约 10.334 秒降到约 1.925 秒。
4. 当前最小持久化修正不是改 OpenClaw 主模型，也不是回退到旧 Telegram worker，而是把已验证有效的 `PROJECT_ID` 固化进 `D:\AIClient-2-API\configs\provider_pools.json`，避免下次服务重启再次依赖临时 discover 流程。
5. 持久化后复验已通过：AIClient2API 启动日志从 `Discovering Project ID...` 变为 `Using provided Project ID: polynomial-song-r1zb6`；官方 Telegram 直链 `probe_oc_1751` 仍稳定走 `gemini-cli-oauth / gemini-3-flash-preview`，总时延约 3.167 秒。
6. 需要纠偏的历史结论：2026-03-08 10:13:40 那轮关于 `streamMode=partial + blockStreaming=true` 的判断不再可直接当真。当前活配置经再次读取，实际仍是 `streaming=partial`、`channels.telegram.blockStreaming=false`、`agents.defaults.blockStreamingDefault=off`，因此“回复慢已靠 Telegram 输出策略修完”不成立。

## 2026-03-08 18:22:09（OpenClaw 16k 上下文假象根因复盘）
1. `openclaw status` 里看到的 `8.4k/16k` 并不等于模型真上限。当前活配置 `C:\Users\Lenovo\.openclaw\openclaw.json` 与每个 agent 的 `agent\models.json` 都已经把 `gemini-3-flash-preview` 的 `contextWindow` 提到 `200000`。
2. 造成“只有 16k”错觉的主因是 session store 残留旧元数据：`~/.openclaw/agents/<agentId>/sessions/sessions.json` 里的 `contextTokens` 会被 `openclaw status` 直接展示，但它可能滞留旧值，仅代表会话存档元信息，不一定代表当前真实模型上限。
3. 这次之所以需要重启，不是因为配置没写进去，而是因为 Gateway 运行进程仍延续旧运行态；重启官方 Gateway 后，活 Telegram 直链会话在下一次请求中已自动刷新成 `contextTokens=200000`，说明真运行态已回到当前模型目录定义。
4. 遗留的 `agent:telegram-fast:main` 与 `agent:main:main` 两条旧会话项不会自己马上刷新，因此还需要最小化校正它们的 `contextTokens`，否则状态页会继续混着显示 `16k` 和 `200k`。
5. 本轮还发现一个运维细节：`openclaw channels status --probe --json` 可能出现瞬时 10 秒网关探针超时，但只要同轮 `openclaw gateway status` 为 `RPC probe: ok`、本地 `http://127.0.0.1:18789/` 返回 `200`、重跑 probe 恢复正常，就不应立即判成系统性网关故障。
6. 因此当前正确结论是：OpenClaw 官方 Telegram 主链实际已运行在 `gemini-3-flash-preview (200k ctx)`；下一阶段性能优化应回到“系统提示 + 工具 schema + 会话历史”这类真实 prompt 负担，而不是继续围着“16k 上下文太小”做误诊。

## 2026-03-08 18:38:23（Telegram fast 固定 prompt 负担进一步收口）
1. 新鲜 `/context detail` 证据已经证明，当前 `telegram-fast` 的真实工具面只有 `read/edit/write/exec/process` 5 个工具，`tools.schemaChars=3343`，因此“工具 schema 过大”已不是当前 Telegram fast 主链的第一大头。
2. 当前更大的固定开销来自 skills 列表：`skills.promptChars=2601`。这意味着下一阶段如果要继续压 prompt，优先级应是“skills 注入范围”和“骨架文件体积”，而不是继续盯工具 allow/deny。
3. `workspace-telegram-fast` 的 `AGENTS.md` 与 `TOOLS.md` 之前确实存在乱码注入问题，但这里要区分两层事实：
   - Windows PowerShell `Get-Content` 会把无 BOM UTF-8 中文显示成假乱码；
   - Python 按 UTF-8 直接解码可读到干净内容，且 OpenClaw `/context detail` 的自然语言摘要也已恢复正常中文，说明运行时读取并未损坏。
4. 这类“终端看着坏、运行时其实好”的现象很容易误导排障。如果只凭 PowerShell 终端输出判断，会把编码显示问题误当成 OpenClaw 注入问题。
5. 当前又出现了一个和 `16k` 假象相似的现象：主会话的 `systemPromptReport.injectedWorkspaceFiles.rawChars` 仍显示旧值（`AGENTS=784`、`TOOLS=806`），但文件本体已缩到 `389/688` chars，说明这部分统计也存在会话级快照/口径滞后，不能直接当作“新骨架未生效”的证据。
6. 因此本阶段最稳判断是：`telegram-fast` 的真实运行语义已经恢复干净，真正剩余的大头是全局 bundled skills 列表；但官方文档当前只明确 `skills.allowBundled` 是全局配置，本轮不应为了 Telegram 体验贸然影响 `main` agent 的技能能力。

## 2026-03-08 19:10:16（Memory Management 用例落地主判断）
1. 这批用例里，最值得立刻借鉴到当前主线的不是“自动变聪明”，而是“监督可见层”：`45 Morning Digest Generator`、`48 Night Work ROI Tracker`、`42 Safe Operations Ledger`。
2. 我们现有体系已经实质覆盖了三层记忆、心跳新鲜度、周归档这三块：
   - `OpenClaw workspace + CONTEXT_BRIDGE + context-hub` 已形成三层记忆；
   - `ops-health/daily-start/pending_execution_plan` 已形成 freshness/heartbeat；
   - `memory_digest/weekly_review` 已形成周归档与摘要链。
3. 当前真正的缺口不是“没有 memory 系统”，而是“监督者看不到一页式产品摘要”。这也是为什么需要新增 `supervisor_brief.md`，并继续推进 Morning Digest / ROI 视图，而不是重写底层。
4. `39 Daily Self-Improvement Cron` 现在不应进主线，因为它会把自动扩技能、自动加能力带回主路，和“优先保证 kyuu 成功率与智力不退化”的原则冲突。
5. `40 Knowledge Graph Rebuilder` 也不适合作为当前主线落地，因为本会话硬规则已经锁定“记忆主通道 = HTTP memories”；图谱最多只能做后续离线分析层，不能替代当前长期记忆真源。
6. 因此当前最优产品路线是：保持现有 `HTTP memories + context-hub + OpenClaw bridge` 结构不动，把新增精力放在“监督层可见性”和“Telegram fast 定向 prompt 优化”上，而不是扩大底层复杂度。

## 2026-03-08 19:31:47（监督视图链路落地后的新增发现）
1. `Morning Digest + Night Work ROI` 可以先作为“只读监督层”落地，不需要先改 memory 主通道，也不需要先改 OpenClaw 主链配置。这次新增的 `supervisor-digest` action 已经证明，直接复用 `ops_health / verification_board / execution_eta / alerts_weekly / evidence_events_digest / CONTEXT_BRIDGE / workspace memory` 就能生成有价值的一页式监督摘要。
2. 当前真正会污染监督口径的，不是 OpenClaw 主链健康，而是执行锚点陈旧：`pending_execution_plan.json` 约 84 小时未刷新，仍残留“等待 Telegram 凭据”时代的待办。这个问题如果不修，会持续把监督视图引回旧主线。
3. `Night Work ROI` 当前只能诚实地给出两层信息：
   - 运行 ROI：可从 `evo_units/events/cognition` 算出；
   - 产品采纳 ROI：当前仍缺显式字段，状态只能是 `missing`。
4. 这意味着下一阶段不要伪造“夜间推进很有价值”的漂亮结论，而是要补一个最小采纳信号：至少能记录 `accepted/reverted/rolled_back`，否则监督层永远只能看到“做了什么”，看不到“最后有没有被采用”。
5. 实施层也暴露了一个新坑：PowerShell 终端读取 UTF-8 Markdown 仍会出现假乱码，但 Python `utf-8` 读回 supervisor digest / ROI 视图是正常的；因此这条监督链后续验收应以 JSON 与 Python 回读为准，不以终端显示为准。

## 2026-03-08 19:48:01（Telegram 直连 session 负担的真实来源）
1. 当前 `telegram-fast` 的重负担并不来自活配置本身。fresh session 的 `/context detail` 已证明当前真实工具面只有 5 个工具，`tools.schemaChars=3343`，所以“现在的 telegram-fast 仍然背着整套旧工具”这个判断不成立。
2. 造成 Telegram 直连会话比 fresh session 更重的主因，是这条直连 session 自己存着一份陈旧 `systemPromptReport/tools` 快照。`C:\\Users\\Lenovo\\.openclaw\\agents\\telegram-fast\\sessions\\sessions.json` 中同一个 agent 的 fresh session 与 Telegram 直连 session 同时存在两套明显不同的 prompt 报告，就是直接证据。
3. OpenClaw 官方 `sessions.reset` 是当前最小、最正路的修复手段。它不会把系统带回旧 worker，也不需要手改配置；它会自动归档旧 transcript、清零会话 token 计数，并移除陈旧 `systemPromptReport`，让下一条真实 Telegram 消息从 fresh session 起跑。
4. 这条官方 reset 路径还有一个产品层收益：不用为了验证而往用户真实 TG 会话里塞隐藏 `/context detail` 测试消息，从而避免生成“用户看不见但会污染上下文”的内部历史。
5. 因此当前下一步不再是继续猜 bundled skills 作用域，而是等待第一条 post-reset 的真实 Telegram 入站消息，再抓实际时延与 token 证据，验证主会话是否已回到 fresh session 档位。

## 2026-03-08 20:50:18（Night Work ROI 采纳信号闭环后的新增发现）
1. `Night Work ROI` 的缺口已经从“看不到最终采纳结果”收口成“有结构化结果，但样本还少”。说明当前下一步不该再补监督底座，而该回到真实 Telegram 主链时延复验。
2. 监督层如果直接统计三本账本，会把同一次采纳动作重复算三遍；因此 `supervisor_digest.py` 必须以 `adoption_outcome + adoption_ref` 去重，不能直接拿 `events/cognition/evo_units` 的行数当采纳计数。
3. 结构化字段应该优先于 regex 探测。旧 regex 只能知道“似乎出现过 accepted/reverted/rolled_back 字样”，但不知道它们是否属于同一动作、是否带稳定引用、是否能追溯到具体落地对象。
4. `adoption-mark` 统一写三本账是当前最小且正确的产品做法：`events` 记“发生了结果”，`cognition` 记“为什么这么标”，`evo_units` 记“输入-决策-动作-证据-恢复”。这样既不需要新系统，也不会破坏现有 ledger 角色。
5. 当前 `recent_records` 应优先展示 `evo_units` 视角，而不是被同时间戳的 `cognition/events` 抢走口径；否则监督者会看到“有结果”，但不直观知道这是一个完整演进单元。
6. `accepted=3 / reverted=3 / rolled_back=3` 这组现值来自三轮安全 TDD 样本，不代表线上真实 adoption 分布；但它已经足够证明新链路能稳定写入、去重、汇总和出视图。

## 2026-03-08 21:27:20（复杂任务与复利闭环新增发现）
1. `telegram-realtrace-once` 必须即使在“还没等到真实 Telegram 消息”的等待态，也照样落 `telegram_realtrace.latest.{md,json}`。否则 supervisor digest 只能看到 `missing`，看不到“主链健康但样本未到”的真实状态。
2. OCP-6 的产品价值不只是抓到一条样本，更是把“等待真实流量”从聊天里的口头待办变成可机读的监督状态：`status=waiting_for_real_message`、`official_service=true`、`probe_ok=true`、`legacy_worker_enabled=false`。
3. `morning-digest` 的最佳输入不是重新扫全仓，而是直接复用 `supervisor_digest / execution_eta / night_work_roi / ASYNC_COMMUNICATION / pending_execution_plan` 这几份真源；这样成本低、复用高，也更容易稳定持续生成。
4. 复杂任务协议最关键的不是“再造一个自动化系统”，而是把行为边界明确到 workspace prompt：什么算复杂任务、何时生成 `task_ref`、何时默认继续做、何时才算红灯停下。
5. 在当前 Windows 官方链路上，bundled `coding-agent` 已经足够作为复杂代码任务的第一杠杆；现在不需要为了“能接复杂任务”去扩新 skills/key。
6. 当前真正剩余的外部依赖只剩两类：首条 post-reset 真实 Telegram 消息，以及首条真实 Telegram 复杂任务。其他底座、监督层和执行协议都已进入可运行状态。

## 2026-03-08 22:27:13（官方 Telegram 主链无响应的新增发现）
1. “删掉 `image` 工具”并不能阻止 Telegram 附件被吞进上下文，因为 `read` 工具本身就支持打开 `jpg/png/gif/webp`。如果只改 `tools.allow` 而不改 workspace 规则，模型仍然可能通过 `read` 直接把入站截图整张读进 prompt。
2. 对官方 Telegram 主链来说，更稳的修法是三件事一起做：`Media Triage` 明确忽略附件标记、复杂任务先发启动回执、仓库搜索改成 PowerShell 原生收敛写法。只做其中一件，用户体感仍可能像“没回”。
3. Windows 这台机器上的 `rg.exe` 不能作为 Telegram fast 的可靠默认工具面，`Get-Command rg` 虽然能解析到 Codex App 内置路径，但真实执行会报 `Access is denied`。
4. `exec` 工具真实支持 `yieldMs`，而且 OpenClaw 自带系统提示也明确建议长命令用 `yieldMs/background + process`。如果不把这条写进 workspace 规则，模型很容易跑出“长命令已启动，但当前轮没继续接管后台”的半成品行为。
5. `gemini-3-flash-preview` 并非一直不可用，但在复杂任务上近期多次出现 `429`；当前 `gemini-3.1-pro-preview` 的短探针更稳。因此 Telegram fast 把主模型切到 `gemini-3.1-pro-preview`、再把 Flash 降为第一回退，是这轮“体验与执行优先”口径下更稳的产品选择。
6. 本地 smoke 已证明新规则生效后的首条用户可见消息，已经从“沉默/读图/让用户重述”变成“收到 + task_ref + 已开始执行”。这还不是完整闭环，但已经实质解决了“像没反应”的第一层体验问题。

## 2026-03-08 23:05:00（月度自治循环首轮研究）
1. 官方 OpenClaw 当前文档已经直接给出四条可落地抓手：`Queue` 适合把长任务从主会话里拆出去，`Hooks` 适合把完成回调从轮询改成事件化，`Session Scoping` 适合保证 Telegram DM 的上下文边界，`Reply Tags` 适合稳住“先回执、后执行”的用户面体验。也就是说，接下来不必再靠自造流程拼接复杂任务自治，官方栈本身已经足够承载下一轮增强。
2. GitHub 仓库 `EvoLinkAI/awesome-openclaw-usecases` 中最贴近当前主线的不是“多炫的自动体”，而是 `Three-Tier Memory / Safe Operations Ledger / Morning Digest / Night Work ROI` 这几类监督与复利能力。它们和现有 `context-hub + HTTP memories + supervisor_digest` 是同一方向，说明当前主线不是偏题，而是还差继续产品化。
3. 本地 `openclaw24` 转写与蓝图仍然稳定支持五条主题：`事件化回调`、`上下文预算`、`协作模板库`、`模型容灾链`、`规则回写`。这组主题没有因为近期 Telegram 主链修复而失效，反而和今天的真实瓶颈更贴合。
4. 因此，用户离开期最值的自治循环不应只是“盯着 Telegram 等一条消息”，而应并行做两条线：一条线继续守官方主链的真实流量闭环，另一条线持续把 `queue/hooks/context budget/team modes/fallback/rule writeback` 收敛为新的可执行 backlog。

## 2026-03-08 23:18:20（官方文档对照的新增发现）
1. 官方 `Command Queue` 文档已经非常明确：默认推荐 `collect`，并且 typing indicator 会在 enqueue 时立即触发。当前 `openclaw.json` 里 `messages.queue=null`，说明我们还没把这套机制显式化地纳入 Telegram fast 主链策略。
2. 官方文档还明确了 queue 的核心控制面：`mode / debounceMs / cap / drop`。这对当前 Telegram fast 很关键，因为复杂任务时我们真正想要的是“先让用户看到即时反应，再把接连到来的补充消息安全合并”，而不是让多条入站消息互相撞会话。
3. 官方 Hooks 文档说明 hooks 可以监听 command/session/agent/gateway/message 事件，并且工作区级 hooks 的优先级最高。当前活系统里只有 bundled `command-logger` 和 `session-memory` 处于 ready，`boot-md` 与 `bootstrap-extra-files` 仍禁用，说明事件化回调层还远没用满。
4. 官方 Telegram 文档已经明确 `replyToMode` 的配置面存在，且默认 `off`；当前活配置里 `channels.telegram.replyToMode=null`，等价于仍在吃默认隐式值。对我们这条“先回执、后执行”的主链来说，这意味着还没把 reply threading 当成显式可调的产品抓手。
5. 官方 Telegram 文档还强调了 `dmHistoryLimit`、`dmPolicy`、论坛 topic session key 与 `message_thread_id` 路由细节。当前直连 DM 虽然可用，但“会话边界策略”依旧更多依靠默认行为，而不是我们主动锁定的配置。
6. 因此这轮研究后的正确产品判断是：Telegram fast 当前最大增量不在“再造一套自定义远程链路”，而在“把官方已经有的 queue/hooks/reply/threading/session controls 显式化、产品化、验证化”。

## 2026-03-08 23:26:40（半轮实施后的新增发现）
1. 对 Telegram fast 来说，把 `messages.queue` 显式写成官方默认建议值，本身就是一种产品增益：它把“当前其实依赖默认 collect”的隐式事实，变成了可审计、可复盘、可后续调参的显式策略。
2. `channels.telegram.replyToMode=first` 是当前“先回执、后执行”口径下最小且对路的 threading 选择。它不会像 `all` 那样把后续每条输出都强制绑到上一个消息，也不会像 `off` 那样继续完全依赖显式 reply tags 才有 threading。
3. `openclaw gateway restart` 的 timeout 再次证明它不能当作唯一健康信号。当前更稳的判断顺序应继续是：`gateway health` -> `channels status --probe --json` -> 活配置回读。
4. 这半轮改动后，官方主链的剩余大头已经更聚焦：不是 queue/reply 是否存在，而是它们在真实 Telegram 流量中的体感效果，以及 hooks 是否值得承接“复杂任务完成回调”。

## 2026-03-08 23:32:10（hooks 草案落地后的新增发现）
1. 对当前主线来说，最稳的 hooks 推进方式不是直接把实验逻辑丢进 `workspace/hooks/`，而是先在项目里生成可迁移草案。这样既能把事件、字段和输出口径固定下来，又不会在未验证前影响官方主链。
2. `message:preprocessed` 是当前 Telegram fast 最值的首个 message hook 事件，因为它正好位于“媒体/link 富化完成、agent 看到内容之前”这个关键点，最适合验证 `Media Triage` 规则是否真正挡住了“带截图的代码任务先读图”。
3. `message:sent + command:stop` 组合是当前最值的 closeout 草案事件，因为它们能为 `task_ref`、停止、完成、生命周期 fanout 提供最小事件化抓手，而不必马上改造主会话逻辑。
4. 当前把 hook 草案继续推进到生产的门槛已经很清楚：
   - 至少有一条真实 Telegram 样本能证明 queue/reply 改动稳定
   - hook 首刀必须保持 observe-only
   - 不得直接改写用户可见消息或现有 runtime state

## 2026-03-09 00:20:00（Memory Management 与 self-improving 的新增发现）
1. `Three-Tier Memory System` 与我方现状是天然同向的，但不应该照抄成新的大文件体系。当前更稳的吸收方式是映射而不是增系统：
   - 长期层：`workspace/MEMORY.md + HTTP memories`
   - 项目层：`ASYNC_COMMUNICATION.md / CONTEXT_BRIDGE.md / pending_execution_plan.json`
   - 新鲜度层：`supervisor_digest / morning_digest / heartbeat_state / telegram_realtrace`
2. `Heartbeat State Monitor` 适合当前主线，但只能做“被动 freshness monitor”，不能误解成“开启常驻 heartbeat 任务”。你之前明确不希望后台常驻消耗 token，这与官方 `HEARTBEAT.md` 保持为空的口径完全一致。
3. `Safe Operations Ledger` 是当前最值得落地主线的 memory 用例之一，因为它正好回应了“我们之前改原厂配置会不会太激进、伤成功率或智力”的担心。真正需要的是一份显式账本，把“什么可自治、什么必须停”写死，而不是继续靠聊天记忆。
4. `Daily Self-Improvement Cron` 现在不适合直接进主链。原因不是它没价值，而是当前最关键的仍是稳定复杂任务成功率与监督闭环；如果默认每天自动加 skills/MCP/服务，会直接撞上用户“不要太激进、不要伤智力”的风险边界。
5. `Knowledge Graph Rebuilder` 目前也不进主链。除了用户已锁定 HTTP memory 为唯一主记忆通道外，这类 nightly graph rebuild 更容易把当前明确的 memory discipline 再次复杂化。
6. `self-improving-agent` 从深转写里真正可采纳的不是“运行时自改自己”，而是：
   - 先定义改进成功判据
   - 明确 memory 可写边界
   - 先做只读评估回路和 policy 草案
   - 有回滚与审计后再考虑放权
   这说明当前最稳的产品化方向是“rule writeback 草案”，而不是“自动改写生产策略”。
7. “养一群龙虾 / 多 agent” 当前不应默认主线化。外部用例与本地转写都指向同一个结论：多 agent 是性能放大器，也是风险放大器；只有当任务接口清晰、hooks 生命周期明确、上下文预算可控时，才会产生净收益。
8. 对 kyuu 当前阶段最值的增强顺序已经更清楚了：
   - 先稳自治边界与 freshness
   - 再稳 hooks 事件化
   - 再评估 context budget
   - 最后才考虑默认多 agent 扩张

## 2026-03-09 11:18:46（OpenClaw Telegram 时延新根因钉实）
1. 当前 Telegram 主链慢的第一证据不是“thinking 太深”，而是 	elegram-fast 绑定仍主用 gemini-3.1-pro-preview；全局 defaults 已切 flash 并不代表 Telegram 绑定 agent 已切。
2. 当前慢的第二证据是上下文真实过重：AIClient2API 日志里一条轻问答已经带出 prompt_tokens=10726 / cached_tokens=10482 / completion_tokens=0，说明主耗时在模型接收和处理巨量上下文，而不是回答内容本身。
3. Karing 当前是系统代理、未开 TUN，这不会直接证明 OpenClaw 配置错误，但足以解释“为什么不是所有进程都同样快”；因此代理覆盖面必须作为排障背景条件，而不是被忽略。
4. 当前最小且对路的调优顺序应是：先把 	elegram-fast 主模型降到 flash、同时收窄 dmHistoryLimit 并刷新会话；只有这组动作完成后仍慢，才值得继续深调 compaction / queue / session baggage。
### 2026-03-10 08:27:00（workflow 首批四条后的新增发现）
1. `17_D2CnFzzTeBo.txt` 把 workflow 选型的第一原则讲得非常硬：默认解永远应该更简单。单次 prompt / 单 agent 能解决的，就不要为了“系统更高级”而先上复杂 workflow。
2. 同一条 `17_D2CnFzzTeBo.txt` 还给出当前最适合 OpenClaw 的顺序：先路由，再串行可控，再并行提效，最后才是质量兜底。也就是说，复杂结构应该被真实瓶颈逼出来，而不是先验铺满。
3. `18_RcPUsqsp3CE.txt` 明确了 evaluator-optimizer 的边界：它只适合“事情已经能做出来，但还不够好，而且你知道什么是好、知道怎么改”的场景。对当前 OpenClaw 主线，它不是默认项，更适合放在高价值交付结果的最终打磨阶段。
4. `24_ZpU8LQp5GpQ.txt` 给出了多 agent 最稳的第一刀：不是思考子代理，而是验证子代理。验证子代理天生适合黑盒检查、合规核对、事实核查、格式校验，因为它不需要吞完整上下文，不会掉进传声筒陷阱。
5. `24_ZpU8LQp5GpQ.txt` 还提醒了一个很现实的坑：验证子代理会“过早胜利”。如果不强制它跑完整检查、覆盖边界、做负向测试，它很容易测两下就宣布通过。
6. `32_v2rvO799KWs.txt` 则把评估体系讲完整了：健康体系应该是金字塔结构，底座是代码评分，中层是模型评分，塔尖是人类校准。单靠任何一层，都会让系统变得偏、脆或漂。
7. 这四条合起来后，对当前 OpenClaw 的最值启发已经清晰：
   - `telegram-fast` 应继续做轻前台与路由入口
   - `main` 继续做单决策流主干
   - 如果后续要引入更多 agent，第一批优先是验证/审查/事实核查型子代理，而不是再造一个更重的前台大脑

### 2026-03-10 08:30:55（harness 追加两条后的新增发现）
1. `06_Ss5gfemWiQE.txt` 把 agent 时代的软件工程成本结构讲得很直接：当代码产能暴涨后，等待会变成比修正更贵的成本。也就是说，传统的人类式“层层 review、层层审批、每一步都强阻塞”的流程，可能会从质量保障变成产能瓶颈。
2. 同一条 `06_Ss5gfemWiQE.txt` 还给出了更适合 agent 时代的三件事：最小阻塞门控、短生命周期变更、以及对 flaky test 的快速重跑/修复。这不是降低质量，而是把质量保障从“卡死在门口”改成“快速暴露、快速反攻”。
3. `12_zpI3Hhz_RKw.txt` 则钉实了另一个高价值 harness 改进点：强制模型验证。最常见失败不是模型不会写，而是它写完后只读了一眼自己写的代码，就主观宣布完成，根本没运行测试。
4. `12_zpI3Hhz_RKw.txt` 给出的两道防线非常适合当前主线：第一道是把“规划-构建-验证-修复”写进系统规则；第二道是退出前系统卡口，只有真实运行过验证、并且结果对照的是原始任务要求，而不是模型自己的代码，才允许完成。
5. 这两条和前面已读的 workflow 证据合并后，当前最值的产品结论更明确了：OpenClaw 下一阶段真正该强化的，不是再加一个更强的大脑，而是把验证、closeout、快速修正和低阻塞门控做成系统能力。
### 2026-03-10 08:37:49（cross-theme primary 追加后的新增发现）
1. `01_D6FkxqDhrRs.txt` 把一个很容易被忽视的事实说透了：一轮 agent 成本真正大的，不只是用户问题，而是系统提示、workspace 文件、历史、工具输出一起打包的整包输入。因此，后续判断“慢”和“贵”时，优先怀疑 harness 打包方式，而不是先怪模型不行。
2. 同一条 `01_D6FkxqDhrRs.txt` 还证明了一个对当前主线很有价值的方向：检索式注入的收益，核心不在“再加一个记忆库”，而在“把整库硬塞改成只注入命中片段”。这和当前我们要做的轻前台、低噪音、外部文件式上下文治理是一致的。
3. `13_0LOKPvfhMIQ.txt` 进一步钉实：环境地图、评估标准、时间预算，都不该让 agent 自己临场摸索。Harness 的职责就是把这些运行条件预整理后直接递给模型，减少路径猜测和无效搜索。
4. `15_C-PWSwrgn0s.txt` 给出了比“换更强模型”更值钱的产品原则：算力要按阶段分配。规划和最终验证值得高推理强度，中间实现阶段不该全程开满；否则不是更聪明，而是更容易超时和浪费。
5. 同一条 `15_C-PWSwrgn0s.txt` 还把“模型与 harness 的关系”讲清楚了：很多 harness 原则能复用，但要把某个模型逼近上限，仍需要针对它单独迭代。这意味着我们后面不能再把“全局默认模型”和“agent 局部覆盖”当成一个层面的事情。
6. `02_3oSL3fxEJqs.txt` 把浏览器/网页能力分成四层是非常有产品价值的：
   - 公开信息先 `WebFetch`
   - 跨平台舆情与趋势再走 `API/search skill`
   - 长期登录态和稳定自动化走隔离浏览器档案
   - 只有必须复用当前浏览器生态时才走 relay
   这对当前 OpenClaw 主线非常重要，因为它告诉我们“能点网页”不等于“默认该用最重自动化链路”。
7. `13_9ZmsoNOGJSw.txt` 看似在列技能清单，真正高价值的信息其实是：skills 应该被组织成执行流水线，而不是堆成收藏夹。安全扫描、任务后复盘、知识库沉淀、浏览器抓取、代码工作流、身份隔离、归档与备份，这些都更像能力层，而不是单点玩具。
8. 因此，这一轮 cross-theme primary 合并后的产品方向更清晰了：
   - 继续做轻前台 + 路由
   - 强化 harness 对环境/评估/时间/算力的前置编排
   - 把浏览器与 skill 能力显式分层路由
   - 继续把复利落在“任务后复盘与外部记忆沉淀”，而不是运行时自改

### 2026-03-10 08:40:51（cross-theme primary 再追加后的新增发现）
1. `14_TrVbBUKsbSM.txt` 把 loop detection 的边界讲得非常清楚：它不是保证换方向的逻辑锁，而是给模型一次“别再局部小修、回到整体方案”的启发式干预机会。对当前 OpenClaw 主线来说，这种护栏非常值钱，因为它正好对应“长任务做到一半卡在局部”的真实失败形态。
2. 同一条 `14_TrVbBUKsbSM.txt` 还给出一个长期非常重要的态度：`harness 是为了删除而构建`。这意味着我们现在加上的很多中间护栏，不该被神化成永久体系；它们是为了跨过当前模型短板，等模型进化后应该主动拆掉。
3. `11_45LHV3tynB8.txt` 进一步钉实：会记住用户偏好，不等于会进化。真正的自我改进是把执行过程、结果、错误和抽象规则接成反馈循环，改的是未来决策规则，而不是只往记忆里多塞几条偏好。
4. 因此，对当前主线来说，`self-improving-agent` 类思路仍然应该被吸收为“任务后复盘和规则沉淀”，而不是“再加一个更大的记忆模块”。
5. `03_io67uFrd54M.txt` 对部署选择给了一个很务实的判断：如果目标是解锁浏览器、本地文件和本地应用，那么本地机器优先于云 VPS。云端 24/7 和隔离是优势，但会直接损失本地主执行面的价值。
6. 同一条 `03_io67uFrd54M.txt` 也支持我们现在对 Windows/WSL 的态度：隔离很重要，但它必须服务于权限边界设计，而不是为了“更标准”就把本地执行面先阉掉。
7. `04_tHzef6d08ac.txt` 则把用户价值感知讲得很直白：OpenClaw 真正让人上头的，不是继续聊天，而是“你在远程一句话，它真的去操控浏览器、桌面应用、定时任务、本地文件，替你把事做了”。
8. 但这条证据也继续强化了一个现实：能力强了，稳定性和安全性就会同时掉。所以对我们来说，真正有价值的产品动作不是无限加权限，而是把这些强能力放进更清晰的路由、护栏和 closeout 里。

### 2026-03-10 08:49:49（cross-theme primary 三轮追加后的新增发现）
1. `15_DS6oQtfwBME.txt` 把长任务管理的分层解法说得很完整：第一层“直接换超大上下文模型”表面简单，但会更贵，而且会撞上 `lost in the middle`；第二层 `session compaction + memory flush` 有价值，但更多是在延命；第三层“状态外化到项目文档”才是最本质的长期解。
2. 这条证据对当前 OpenClaw 主线非常关键，因为它再次证明：复杂任务稳定推进的根，不在于把单个 session 撑得更久，而在于让任何新 session/重启后的 agent 都能读到完整项目状态并无缝接力。
3. `03_p5XgacMxfnk.txt` 支持“按职责拆 agent、按入口做绑定”，它证明了专事专办确实能省 token、提效果。但它支持的是“任务域拆分”，不是“默认所有复杂任务都多 agent 并行”。
4. 因此，这条证据和我们当前路线并不冲突，反而更强化了一个判断：如果后面继续扩 agent，最稳的方式是按主题/职责拆入口，而不是让多个 agent 同时抢同一条任务。
5. `02_l692H9z2YT8.txt` 的表面叙事是“21 个 agent 很强、云上一键很爽”，但真正值钱的结论更朴素：一个系统之所以会被天天打开，不是因为参数最强，而是因为门槛低、可持续使用、人格和规则稳定、长期记忆真正越用越顺手。
6. 同时，这条证据也提醒我们不要被“云上一键部署 + 全家桶技能 + 全自动”带偏。它更适合拿来理解“用户为什么愿意每天打开”，不适合直接压过当前对本地执行面、权限边界和交付稳定性的主判断。
7. `10_5HgJsB_1Dbc.txt` 则把 harness 的长期工程哲学讲透了：`build to delete`。也就是说，过度精细的手工控制流、状态机、if-else 护栏，随着模型升级会很快从保护层变成阻力层。
8. 同一条 `10_5HgJsB_1Dbc.txt` 还给出另一个高价值视角：Harness 的价值不只在控流程，更在采集失败轨迹。真正稀缺的不是“又写了一层控制器”，而是“长任务在哪一步漂移、在哪一步违背规则、在哪一步崩盘”的高质量 trace。
9. 这一轮合并后的产品取舍更清楚了：
   - 继续把复杂任务主解放在“状态外化 + 外部项目文档 + session 接力”
   - 多 agent 只做职责拆分，不做默认并行
   - Harness 持续保持轻量、可删、强 trace，而不是走向越来越厚的手写编排

### 2026-03-10 08:52:10（少量精读后的新增发现）
1. `11_rket6Pz63Ns.txt` 把 trace 在 harness 里的地位讲得更精确：trace 不是“调试时顺便看看”的附件，而是整条改进闭环的核心信号。没有 trace，很多系统设计缺口最终都会被误归因成“模型不够聪明”。
2. 同一条 `11_rket6Pz63Ns.txt` 还把一个非常实用的工程流程讲清楚了：`抓 trace -> 并行分析 -> 主 agent 汇总 -> 人工审查 -> 下一轮改动`。这比人工逐行翻日志更接近可持续的 agent 时代工程流程。
3. 这条证据也补上了一个很重要的边界：改进建议必须尽量通用，不能为了修一个具体任务而过拟合，导致其他任务表现倒退。
4. `08_l3hZDLruPj8.txt` 则把 agent 时代技术债的治理逻辑讲透了：agent 天生会复制已有模式，所以一处小妥协会被快速放大。人工每周抽时间清理不可扩展，因为自动生成的速度远高于人工偿债速度。
5. 同一条 `08_l3hZDLruPj8.txt` 给出的可执行方案也非常有价值：先把工程品味编码成黄金规则，再让后台持续、小步、自动地产生清理 PR。也就是说，技术债治理应该更像垃圾回收机制，而不是周期性大扫除。
6. 这两条合起来，对当前 OpenClaw 主线的最值启发是：
   - 后续如果继续做复利工程，最该加厚的不是“更大的上下文”或“更多的 agent”，而是 `trace 改进闭环` 和 `持续小额自动清理`
   - 真正长期有复利的，是系统能不能自动发现坏模式、结构化提出改进、再把偏移一点点拉回主线

### 2026-03-10 08:56:56（少量精读再追加后的新增发现）
1. `04_A0fJV942nnw.txt` 把“地图，不是说明书”这条原则讲得比之前更完整：巨型 `Agents.md` 会同时带来四个问题，上下文稀缺、重点失真、文档腐烂、难以验证。因此它不是“写得越全越好”，而是“越像百科全书越容易坏”。
2. 同一条 `04_A0fJV942nnw.txt` 给出的正解非常贴近当前主线：让 `Agents.md` 只做小而稳定的入口，把真正的知识真相源放进结构化 docs、architecture、执行计划、技术债追踪和质量评分文档里。
3. 这条证据继续加强了我们之前的判断：对 agent 来说，不在仓库里的关键知识就等于不存在。所以真正该做的是把 Slack/聊天/脑内的隐性知识，整理成可推理、可版本化、可验证的仓库内知识，而不是继续在会话里口头补充。
4. `09_i2OfHLwQSSQ.txt` 则把整个话语体系重新钉实：Harness 是包在模型外面的操作系统层，不是 agent 本体。它负责 prompt presets、tool handling、lifecycle hooks 和高阶能力装配，目标是把模型不稳定的智能塑造成稳定执行系统。
5. 同一条 `09_i2OfHLwQSSQ.txt` 最值钱的一点是：Harness 的真正价值在于弥合 benchmark 和真实长任务体验之间的鸿沟。模型静态跑分接近，并不代表它们在几十步、几百步的真实任务中同样可靠。
6. 这两条合起来，让当前主线又更清楚了一步：
   - 不继续追求“更大的单文件提示词”
   - 继续做“地图式入口 + 仓库知识真相源 + OS 层 harness”
   - 把 OpenClaw 设计成一个机器可读、可验证、可持续改进的认知系统，而不是一个靠长提示词硬撑的聊天窗口

### 2026-03-10 09:03:33（少量精读继续追加后的新增发现）
1. `02_55ecZkrVUSc.txt` 把工程师角色迁移讲得比前面更落地：当代码变成廉价编译产物后，工程师的核心职责就只剩三件事，设计环境、明确意图、构建反馈。这不是“少写代码”那么简单，而是工作重心彻底迁移。
2. 同一条 `02_55ecZkrVUSc.txt` 还补了一条非常关键的工程判断：当 agent 犯错时，第一反应不该是修那行代码，而该问“环境里缺了什么信息、工具或反馈，才让它在这里犯错”。这条非常适合当前 OpenClaw 主线。
3. 这条证据也继续支持一个杠杆判断：在 agent 时代，新人如果是在升级流水线，人均吞吐可以随着团队扩大而继续上升。也就是说，基础设施投入不是辅助项，而是主生产力。
4. `05_qnoL0d-qVJc.txt` 则把“文档不够、规则要代码化”说得更硬：Agent 会复制已有结构并放大已有模式，所以如果架构约束只停留在文档层，坏模式最终几乎一定会被指数级放大。
5. 同一条 `05_qnoL0d-qVJc.txt` 给出的最值钱原则是：只强制不变量，不微观管理实现。也就是，底线必须刚性封死，但边界之内让 agent 自由实现。
6. 这条证据还进一步强化了我们对 linter 的理解：在 agent 时代，自定义 linter 不只是报错工具，而是自带修复指令的 prompt 注入器；规则不再只是“告诉你别这样做”，而是“拦住你并告诉你怎么改对”。
7. 这两条合起来后，对当前主线的取舍更硬了：
   - 少继续写大段文字规范
   - 多把反复出现的工程品味升级成可执行规则
   - 把人类角色收敛成“为机器世界立法、设计反馈、修环境”，而不是继续亲手补每一个局部实现

### 2026-03-10 09:08:40（少量精读继续补齐后的新增发现）
1. `01_fbix4vwUkAE.txt` 把“渐进式披露”讲得比前面更具体：不要替 agent 预先决定它需要全部看什么。更稳的方式是给它搜索能力、入口文件、文件引用和按需展开路径，让它自己按缺口去挖上下文。
2. 同一条 `01_fbix4vwUkAE.txt` 还给出了一个很值钱的工程判断：扩能力优先用子代理、文件引用和延迟加载，而不是一味增加工具数。工具过多会让模型每轮都多很多选择负担，反而伤稳定性。
3. 这条证据也继续钉实了“旧工具会变成枷锁”这一点：随着模型能力增强，之前为弱模型设计的提醒器和辅助器，后面可能反而限制模型调整和重排任务的自由度。
4. `03_cz03F10yeN0.txt` 则把“自主验证”的前提讲清楚了：验证能力真正的瓶颈，不是 agent 会不会写测试，而是它能不能直接看见系统状态。没有状态可读性，所谓自验证只是空话。
5. 同一条 `03_cz03F10yeN0.txt` 最值钱的投入方向有两类：
   - 眼睛：浏览器/CDP/DOM 快照/页面导航
   - 听诊器：日志、指标、链路追踪、可观测性查询
6. 这意味着当前主线后续如果继续加厚，最值得继续做重的不是“更大上下文”，而是“更好的状态可读性基础设施”。只有 UI、日志和性能都对 agent 透明，它才可能真的自己写、自己看、自己修、自己验。
7. 这两条合起来后，当前产品判断又更清楚了一步：
   - 继续减少一次性硬塞给 agent 的内容
   - 继续增加它按需发现上下文和按需验证状态的能力
   - 把 OpenClaw 做成一个会自己找上下文、也看得见结果的执行系统

### 2026-03-10 09:10:43（自治少量精读后的新增发现）
1. `06_iNpP7f5T0ag.txt` 给了一个非常实用的 UI 自动化经验：实时自动化失败时，先让 agent 截图、用视觉模型定位按钮，再把已经跑通的步骤脚本化并回放验证。也就是说，最稳的模式不是“永远实时看图”，而是“探索一次、固化流程、多次复用”。
2. 这条证据和之前关于 UI 自动化的判断是同向的：视觉能力最适合做探索和补位，不适合每一步都重走高成本感知链。
3. `08_1AI-2nRIEEw.txt` 则补了一个更现实的浏览器控制结论：在复杂网页自动化里，浏览器 debug 模式可能比 relay、playwright 包装层和原生扩展都更稳。但它本质上是高权限重武器，默认前台不该直接走这条链。
4. 这条证据对当前主线的价值，不是让我们立刻全面切换到高权限 debug 模式，而是确认一件事：后面如果要冲更复杂的网页登录、上传、营销流，确实应该准备一条“隔离环境 + 高权限浏览器控制”的升级通道。
5. `10_1rgGQZ28uxc.txt` 的证据层级不高，但有一个稳定结论：官方技能站和聚合搜索降低了 skill 发现门槛。它更适合支持“技能发现机制”设计，不足以单独支持“继续盲目加 skill”。
6. 因此，这一轮新增判断继续保持克制：
   - 浏览器高成功率方案要有，但放在隔离重链路
   - 默认主线仍是轻前台 + 渐进式披露 + 状态可读性
   - skill 价值重点在发现和组织，不在堆数量

### 2026-03-10 09:13:32（自治补齐 openclaw24 短 primary 后的新增发现）
1. `07_BslzLq-Zncs.txt` 的高价值点不是作者个人效率神话，而是它把一个可复用的 operating loop 讲得很实：灵感输入 -> spec 文档 -> 对抗式挑错 -> 修正 spec -> 原子实现 -> 原子提交 -> 测试兜底。对当前主线，这条最值钱的是 `spec-first` 和 `对抗评审` 两步。
2. 这条证据继续支持我们前面的方向：与其让 agent 直接上手硬做，不如先把 spec 打磨到够清晰，再进入执行环。planning 在 agent 时代不是准备动作，而是主生产力。
3. `09_yxc2qlkd2-o.txt`、`12_TXLOCdRqhRw.txt`、`14__4NxY0LruH8.txt` 三条内容都比较轻，但合起来能支持一个稳定判断：大 skill 仓库、官方 skill 站、案例仓库，主要提供的是发现和启发，不是交付质量本身。
4. 也就是说，这些仓库对当前主线的真正价值，是降低“我还能加什么能力”的发现成本，而不是直接回答“什么能力最值得现在就加”。
5. 这几条轻证据也顺带补强了一个边界：如果后面我们确实扩 skill 或外挂，应该把它们当作候选池，而不是自动默认安装池。决定优先级的仍然是主线瓶颈，而不是仓库里能找到多少条技能名字。

### 2026-03-10 11:18:19（补读 20260225 系统性 primary 后的新增发现）
1. `01_p3zFZQGJ7r4.txt` 与 `05_0kt51Mn0oHk.txt` 合起来，把上下文工程的主语重新钉清楚了：它不是“写更好的提示”，而是像操作系统一样持续管理模型的工作内存。对当前 OpenClaw 主线，这意味着后续优化重点应继续放在信息调度，而不是只怪模型本身。
2. `02_PG3H7F7SOKQ.txt` 把静态上下文的工程原则压得很实：系统提示要有“合适的高度”，工具要坚持最小可行集合，示例要追求代表性而不是堆数量。这继续支持“地图式入口 + 精简工具面 + 少量强示例”的路线。
3. `03_xuGgmsBJf8s.txt` 给出了当前最贴合 OpenClaw 的动态上下文判断：纯预检索太僵，纯即时检索太重，真正稳的是混合策略。也就是预装少量稳定项目理解，同时保留运行时文件/网页检索能力。
4. 同一条 `03_xuGgmsBJf8s.txt` 还继续强化了“元数据优先”和“渐进式披露”两条路线：agent 不该一上来吞整个仓库，而应先利用目录结构、文件名、时间戳、路径线索决定往哪里挖。
5. `06_bmFEILTeUgU.txt` 给了一个非常适合后面做系统治理的诊断框架：污染、干扰、混淆、冲突是四类可见并发症，而“上下文腐烂”是底层病因。也就是说，后面做 trace 和 failure taxonomy 时，不该只写“回答慢/回答错”，而应把错分型。
6. `13_o4sednNl6fM.txt` 进一步确认：`RAG for tools` 对生产 agent 是双输，一边伤 KV/cache，一边伤逻辑一致性。把工具热插拔出前缀，会让历史调用与当前上下文断裂，增加幻觉风险。
7. 同一条 `13_o4sednNl6fM.txt` 也给出更稳的替代方案：保持稳定工具前缀，再用响应预填充和约束解码控制调用模式。对我们现在这条主线，它比继续折腾“按轮切工具说明”更有产品价值。
8. `15__oDNye8VCeA.txt` 的核心不是 `todo.md` 这个文件名，而是“复述循环”。把完整导航信息在每个阶段重写到最近位置，本质上是在对抗 long-task 里的目标漂移和 `lost in the middle`。
9. `16_SVBM1T8uR3Q.txt` 与 `17_m9IQkXeUKcQ.txt` 共同给出了一条很值钱的长期原则：一边不能删失败记录，一边还要防 agent 被自己的历史动作模板催眠。也就是既要保留错误证据，又要防止历史样本把未来决策锁死。
10. `20_ukUJI6tV82w.txt` 则把长任务真正的工程骨架讲透了：结构化 feature list、一次只做一个功能、Clean State、Git 回退、端到端视觉验证，以及 `定位 -> 回忆 -> 领任务 -> 复原 -> 验证` 的固定启动顺序。它非常适合作为当前 OpenClaw 主线后面做“复杂任务收尾能力”的直接参考。

### 2026-03-10 11:23:43（补读 20260225 第二批后的新增发现）
1. `11_EFP8HdhyK10.txt` 把一个经常被讲得很虚的战略问题讲实了：对绝大多数团队来说，默认先做上下文工程比先做微调更合理。它不是否定微调，而是把“快迭代、快验证、快跟随底层模型升级”放在第一优先级。
2. 这条证据和当前主线高度一致：OpenClaw 现在的主要瓶颈不在“模型内部权重不够专”，而在“环境、路由、状态、验证和上下文管理还没到位”。
3. `07_WxozmiPjDSQ.txt` 把记忆写入的两层结构说透了：草稿纸负责任务内连续性，长期记忆负责未来任务的高阶结论。对当前主线，这意味着不能再把“执行过程日志”“长期规则”“项目洞察”混写成同一种记忆。
4. 同一条 `07_WxozmiPjDSQ.txt` 还给了两个非常实用的长期记忆生成机制：`PreFlection` 偏失败驱动的规则提炼，`Generative Agents` 偏周期性的观察升华。它们都比“再换一个 memory 库”更像真正的复利机制。
5. `08_jqcTp9P6qRs.txt` 把“选择”层的复杂度讲得更完整：草稿纸、长期记忆、工具集、知识库都要按场景筛。特别是长期记忆选择，不能只看语义像不像，还得看任务意图是否匹配，否则“有记忆”会比“没记忆”更糟。
6. 同一条 `08_jqcTp9P6qRs.txt` 也给了当前主线一个更细的工具选择判断：开放大工具库更适合动态选择框架，小而稳的工具集更适合 Menace 式性能优先链路。后面做取舍时，不能把这两种路线混成一个结论。
7. `12_Zhht6_XJoCI.txt` 正式把 KV 缓存命中率钉成了生产级 agent 的北极星指标之一。对当前 OpenClaw，这条证据最重要的地方是：后面任何上下文工程设计，都要显式面对“前缀稳定 vs 灵活检索”的架构权衡。
8. 同一条 `12_Zhht6_XJoCI.txt` 的五条实践法则也很值得后面拿来对照现状：会话保持、前缀稳定、只追加、必要时显式缓存断点。这些都可以直接变成后续审视 OpenClaw session/prompt 构造的检查框架。

### 2026-03-10 12:18:26（补读 20260225 + aibaihua6 + image7 后的新增发现）
1. `04_atJSJ1YxZs8.txt` 把长任务接力的真正取舍讲得更细：压缩、结构化笔记、子代理都不是默认答案，而应按任务特征选型。也就是说，先判断当前任务更适合“继续单流”，还是已经值得拆出子任务和独立上下文。
2. `09_mG-UPf3eyN0.txt` 把压缩拆成了两个不同动作：`summary` 用在高价值、大块、非结构化输入、工具输出和交接材料；`trimming` 更适合低风险、例行性、可再生的信息维护。对当前主线，这条很关键，因为“过早总结一切”会直接抹掉后面排障最需要的细节。
3. `10_UHpmGqqmKO0.txt` 进一步说明：隔离不只是“多开几个 agent”，还包括环境沙箱和 runtime state object。更稳的默认仍然是单决策流；一旦进入隔离模式，就该先画清边界，再在边界内检索和选择。
4. `02_FewLiMha3Uk.txt` 的高价值点不在“某项目很火”，而在它把上下文工程包装成按需加载的 skill 集。对当前主线最有启发的不是直接照搬 skill 包，而是继续坚持：初始只暴露名称和短描述，命中后再加载细节。
5. 同一条 `02_FewLiMha3Uk.txt` 还强化了一个已有判断：工具输出往往才是上下文体积的大头。因此后续若再优化主链慢点，优先看工具输出清洗、结构化和分层加载，而不是先怪会话历史太长。
6. `06_item_02.txt` 的可借鉴部分不是整套产品宣讲，而是三点：文件系统式组织比平铺资料池更适合机器定位；`L0/L1/L2` 分层加载比一次性读原文更稳；检索路径可见性本身就是调试资产。这三点都适合做当前主线的“方法库”，不适合直接替换现有真源体系。
7. `03_NUAr1v5bo4Y.txt` 证明了“任务型外挂”这条路线是成立的：像 `Scrapling` 这种反防爬、抗改版、断点恢复型能力，确实应该作为明确工作负载下的专用外挂出现，而不是前台默认主链能力。
8. `07_IoXpDP8CNP4.txt` 没带来新的主方向，但再次钉实了一个已经稳定的边界：高权限远控路径应被视为升级链路，而不是默认链路。它更适合作为“为何必须显式升级”的佐证，不需要再扩大成新的主线主题。

### 2026-03-10 12:52:26（补读 20260226_batch48 多 agent 架构后的新增发现）
1. `11_tFM-2mvdBxQ.txt` 说明：持续自治的最低可行形态不一定是复杂 orchestrator。极简 `while True` harness、明确 task prop、持续日志，已经足够把“别停、继续做、记住下一步”跑起来。
2. 同一条 `11_tFM-2mvdBxQ.txt` 还给出一个很实用的协作结论：早期多 agent 协调可以先用 Git 文件锁、任务看板和显式消息，而不是一开始就上重型编排基础设施。
3. `40_iDuJwtH8YKg.txt` 把 Lead Agent 的边界讲得非常硬：Lead 先做任务分类、路线选择和高密度派工，不该把主要精力花在亲自做原始研究上。
4. 这条证据还把一个很值钱的流程讲清楚了：任务先分 `depth-first / breadth-first / direct-query`，再决定派几个 worker、先并行还是先验证。也就是说，派工逻辑本身应该被产品化，而不是临场发挥。
5. `42__p_DPOvKWl8.txt` 证明了“内容生成”和“证据审计”最好拆开。`Citing Agent` 只补引用、不改正文，这种关注点分离非常适合当前主线未来的验证型子代理。
6. 同一条 `42__p_DPOvKWl8.txt` 还再次加强了我们已经在走的路线：长任务先把 plan 保存到外部记忆/外部文档，再去派工。否则主线任务会被回流结果挤出窗口。
7. `05_bEaYiZSditM.txt` 则把“仓库可读性就是多 agent 杠杆”这件事讲得更完整：短入口、结构化 docs、质量评分、技术债追踪、文档园丁，都是机器认知系统的基础设施，不是整理洁癖。
8. 这四条 batch48 primary 合起来后，当前更稳的扩展顺序是：`轻前台 -> Lead 收口 -> 验证/引用型子代理 -> 外部计划保存 -> 显式任务看板/消息`，而不是默认去中心化蜂群。

### 2026-03-10 12:56:41（继续补读 20260226_batch48 后的新增发现）
1. `35_iGqUPV2WN98.txt` 明确给出当前最重要的架构分界线：弱耦合任务适合并行多 agent，强耦合任务尤其是代码实现和长链推理，更稳的是 `one brain one stream`。
2. 同一条 `35_iGqUPV2WN98.txt` 还很关键地指出：即使采用子智能体，也应优先只给它们只读研究权，不给代码写权限。这和我们当前对 OpenClaw 的“前台可派工、主干集中写入”判断完全同向。
3. `10_49swsWg1DG0.txt` 把 agent 友好反馈的形态讲得非常实：日志必须短、机器可 grep、错误要显式、统计要预先算好；否则上下文窗口会被滚动输出直接污染。
4. 同一条 `10_49swsWg1DG0.txt` 还补了一个很值钱的运行策略：测试要允许 fast 子样本迭代，既保持速度，又让不同 worker 的子样本具备可覆盖性。
5. `46_tC6aivMplhs.txt` 把 `skill` 和 `tool` 的职责重新钉清楚了：tool 是原子能力，skill 是过程性 SOP。也就是说，skill 的真正产品价值是把“怎么做”打包成可复用流程，而不是再堆一层执行器。
6. `45_qHs7afP6ibM.txt` 进一步把 skill 的三层披露结构讲完整了：`name/description` 只负责发现，正文负责 SOP，附属文件和脚本按需展开。真正的“近似无限上下文”来自认知与执行分离，不来自更大窗口。
7. `34_nDgTrvi4ySU.txt` 给了一个非常重要的生产级边界：长任务系统要先解决 `断点续传`、`错误喂回 agent 自愈`、`只看结构不看内容的可观测性` 和 `彩虹部署`，而不是急着追异步并发。
8. 同一条 `34_nDgTrvi4ySU.txt` 还说明：异步确实会带来更高吞吐，但状态一致性和错误传递会陡增复杂度。因此它更适合作为长期升级方向，而不是当前主线的立即切换项。

### 2026-03-10 13:21:08（继续补读 20260226_batch48 的新增发现）
1. `07_JClCkY2rSPc.txt` 再次把 `Harness Engineering` 钉成系统层工作：工程师最值钱的三件事是 `设计环境 / 明确意图 / 构建反馈`。这和当前 OpenClaw 主线完全同向，也说明“环境定义不足”比“模型不够聪明”更像一手根因。
2. 同一条 `07_JClCkY2rSPc.txt` 还补强了当前一个很关键的调试姿势：agent 犯错时，优先问环境里缺了什么信息、工具或反馈，而不是先修那一行代码。
3. `06_OOGrue257rM.txt` 把“自主验证”的前提讲得更完整：不是只加测试，而是给 agent 装眼睛和听诊器。前者是浏览器、DOM 快照、截图、页面导航，后者是日志、指标、链路和按任务隔离的可观测性查询。
4. 同一条 `06_OOGrue257rM.txt` 的真正价值是把“状态可读性”正式钉成高优先级基础设施。后面若继续增强 OpenClaw，最值钱的不是更厚 prompt，而是让状态对 agent 透明、可解析、可验证。
5. `09_Ow8I9aOvxCQ.txt` 把项目级 autonomy 与普通副驾驶模式的分界讲清楚了：项目级代理的稀缺资源不是代码产量，而是更严苛、更具穿透力的验证与审计机制。测试全绿可能只是危险麻醉剂。
6. `13_o1FVeHXnXCs.txt` 则把执行层的产品分层钉实：高频核心动作固化成 tool，通用探索交给 bash，复杂动态逻辑交给 code generation，外部系统接入走 MCP。这是后面给 OpenClaw 继续加外挂时最值得沿用的分层标准。
7. 同一条 `13_o1FVeHXnXCs.txt` 还给出一条很实用的工具面原则：少即是多。比起 `list all` 这类胖工具，更值钱的是 `search/merge multi-step` 这类高频高影响工具。
8. `14_L9uj7lYMU7E.txt` 继续加强了我们已经在走的路线：`Gather Context` 默认先走文件系统式 `agentic search`，也就是 grep/tail 这种透明、可追溯、可组合的检索；只有在表达变体很多或速度要求更高时，再引入 semantic search。
9. 同一条 `14_L9uj7lYMU7E.txt` 也把上下文维护的两种机制再钉实了一次：`subagents` 更偏空间隔离，`compaction` 更偏时间维度管理；这两者不是互斥，而是分工不同。
10. `12_2Cd0ecO8MSE.txt` 给出了一个当前很适合直接落地的验证顺序：先 `rules`，再 `visual feedback`，最后才 `LLM-as-judge`。也就是说，确定性卡口应先于主观型审查，浏览器核查应先于“再问一个模型怎么看”。

### 2026-03-10 13:31:52（继续补读 20260226_batch48 workflow 后的新增发现）
1. `15_mgI0Wh1ZM3g.txt` 把 builder 视角讲得更完整：Claude Code 的价值不在“它是个编码产品”，而在“它背后的 SDK 证明了给 agent 一台电脑就足够打开大量数字工作场景”。这继续支持当前 OpenClaw 主线把终端、文件、浏览器和验证链当成骨架，而不是把能力理解成一堆零散插件。
2. 同一条 `15_mgI0Wh1ZM3g.txt` 还再次强化了标准 agent loop：`Gather Context -> Take Action -> Verify Work`。它不是编码特例，而是通用数字工作的最小闭环。
3. `19_HWI80m9E9W4.txt` 把 `Orchestrator-Workers` 的适用边界讲透了：它真正适合的是 breadth-first、信息源多、可相对独立拆分、单上下文装不下的任务。也就是说，它不是“多 agent 很强”就该默认启用的结构。
4. 同一条 `19_HWI80m9E9W4.txt` 也给了当前主线一个明确产品判断：OpenClaw 后面如果上 orchestrator-workers，更适合大规模研究/资料汇总/批量覆盖，不适合强耦合代码执行主线。
5. `20_dRl14yIfN3k.txt` 把 `Voting` 钉成了可靠性型并行：它不是为了快，而是为了稳；本质上是在为业务风险买保险。
6. 这条 `20_dRl14yIfN3k.txt` 对当前主线最值钱的地方是：后面如果真的在 OpenClaw 里引入 voting，它应该落在合规、安全、关键拦截、错误不可接受的判断上，而不是普通问答或一般执行链。
7. `16_ke1MTyt7sAQ.txt` 与 `09_Ow8I9aOvxCQ.txt` 基本是重复主题稿，当前只保留共识判断，不单独抬高权重。这也再次提醒：灵感库后续整合必须继续去重、去重复口号化表达。

### 2026-03-10 13:31:52（当前 OpenClaw 主线明确取舍表 v1）
1. 先做：`轻前台 + 单决策流主干 + Lead 收口 + 状态可读性 + 机器友好反馈 + 外部计划保存 + 验证型子代理优先`。
2. 后做：`Orchestrator-Workers`、`semantic search`、`高权限浏览器控制`、`异步并发 / 彩虹部署 / 自愈式长任务系统`。
3. 现在不做：把所有外挂默认塞给 Telegram 前台、把强耦合代码任务改成默认多 agent 并行写、把更长上下文当主解、把 voting 当普通执行链默认结构。

### 2026-03-10 13:39:30（继续补读 20260226_batch48 workflow 后的新增发现）
1. `22_of1DjMYd2_0.txt` 把 `Routing` 的真正价值讲清楚了：它不是“多一层聪明判断”，而是把关注点分离固化到入口层。当不同输入在质量、成本、处理节奏上存在明显冲突时，不分诊就会彼此伤害。
2. 同一条 `22_of1DjMYd2_0.txt` 也给当前主线一个非常直接的产品启发：Telegram 前台继续做轻路由是对的。简单请求、复杂任务、高风险任务，不该共享同一套优化目标和同一条执行路径。
3. `23_ZVjRvx68Ez8.txt` 把 `Prompt Chaining` 的价值讲透了：它不是“更会思考”，而是把中间产物显式化、可 gate 化、可中断化。它最适合结构已知、阶段稳定、错误成本高的任务。
4. 同一条 `23_ZVjRvx68Ez8.txt` 还补强了一个很实用的工程判断：prompt chaining 允许不同阶段混搭不同模型，这比“全程豪赌一个最强模型”更可控，也更接近真正的系统设计。
5. `21_G5qERQf_dRA.txt` 把 `Sectioning` 的边界钉得很清楚：只有当子任务彼此独立、且在执行前就能固定拆分时，sectioning 才成立。否则就不该假装是 sectioning。
6. 这条 `21_G5qERQf_dRA.txt` 让当前并行结构更完整了：`sectioning = 固定子任务效率并行`，`orchestrator-workers = 动态并行`，`voting = 可靠性并行`。三者不能再混用成一句“多 agent 并行”。
7. `25_XxKC7YEzO5I.txt` 则把多 agent 失败的常见真因钉实了：不是 agent 不够聪明，而是拆分边界拆错了。按人类公司职能去拆 agent，极容易把 token 浪费在传话和同步上。
8. 同一条 `25_XxKC7YEzO5I.txt` 给出的正解非常适合当前主线：多 agent 必须以上下文为中心拆分。真正适合拆出去的是独立研究路径、清晰接口组件和黑盒验证任务；而同一功能的设计/实现/测试这类共享一套上下文的工作，默认仍应留在同一主干里。

### 2026-03-10 13:47:18（继续补读 20260226_batch48 multi-agent / eval 后的新增发现）
1. `26_91PTF0hfgek.txt` 把一个经常被讲反的结论讲得很清楚：多 agent 不是“更高级的默认形态”，而是昂贵权衡。默认先从单 agent 出发，如非必要勿增实体。
2. 同一条 `26_91PTF0hfgek.txt` 还给出了当前主线非常实用的前置检查：如果只是上下文顶爆、工具太多或任务天然可并行，先试上下文工程和 `tool search`，它们不够再上多 agent。
3. 这条证据也补上了三个稳定正收益场景：`上下文保护`、`并行覆盖`、`专业化分工`。它们都不是口号，而是有明确前提的结构选择。
4. `27_tOkWT1XQMoU.txt` 把评估工具的定位钉得很准：框架只是加速器，不是灵魂。真正决定评估价值的是任务设计和评分器设计。
5. 这条 `27_tOkWT1XQMoU.txt` 对当前主线最值钱的启发是：评估栈不该从“先选最先进工具”开始，而应从“先选一个贴合工作流、能跑起来的框架”开始，然后把精力投给测试题与评分器。
6. `28_lCv6cgRjax8.txt` 把“自动化评估不是全部真相”讲透了：自动化评估、生产监控、AB测试、用户反馈、人工读 transcript、系统化人类评估是互补层，不是替代关系。
7. 这条 `28_lCv6cgRjax8.txt` 最值钱的工程隐喻是瑞士奶酪模型：单层评估一定有洞，真正可靠的是多层防线叠加，而不是迷信某一层分数。
8. `29_Vu8-V2Fgo6Q.txt` 则把“评估怎么落地”讲得非常实：尽早从 `20-50` 个真实任务开始；题目要无歧义、有参考答案、包含正反例；先修环境隔离和评分器，再看分数；评分器必须可调试、可校准、可防御。
9. 同一条 `29_Vu8-V2Fgo6Q.txt` 也继续加强了我们当前主线：读轨迹不是附加动作，而是判断评分器是否公平、是否真的在测重要东西的关键技能。
10. 这一批证据合起来后，当前更稳的排序是：`先路由与上下文工程 -> 再评估与验证基础设施 -> 最后才考虑多 agent 结构升级`。

### 2026-03-10 13:21:46（继续补读 20260226_batch48 尾部与 Menace 收口后的新增发现）
1. `43_GY0O_GAN8QU.txt` 进一步钉实：多 agent 的最大价值是并行压缩海量外部信息，而不是默认替代强耦合写代码主线。它最适合广度优先研究、审查、竞品/行业扫描。
2. 同一条 `43_GY0O_GAN8QU.txt` 也把成本边界讲透了：多 agent 的智能提升本质上是在用大量 token 和等待时间换深思熟虑，所以只适合高价值、高人工成本任务，不适合前台默认链路。
3. `44_izDviZEYlBU.txt` 最重要的产品结论是：skill 应从真实失败里长出来。先跑真实任务、观察卡点，再围绕失败样本补一个小 skill，然后多轮验证迭代。
4. 同一条 `44_izDviZEYlBU.txt` 也把 `skill` 与 `MCP` 的互补边界讲清楚了：skill 负责方法和 SOP，MCP 负责外部连接与行动接口。两者不是替身关系。
5. `47_zaGprccLFO8.txt` 把摘要质量问题讲得非常实：开放式“请总结”不够稳，真正可控的是 schema/表单式摘要。对当前主线，这意味着 closeout、handoff、压缩都应优先结构化字段，而不是自由散文。
6. 同一条 `47_zaGprccLFO8.txt` 还给了当前搜索链一个很值钱的分流规则：简单搜索可先完整返回、再由后续压缩回收；复杂搜索更适合封装成子 agent，只把固定结构结果交回主干。
7. `48_-W-aKyS1KAc.txt` 把工具过载的主解法讲透了：不是动态热插拔工具，而是分层行动空间。第一层只保留固定原子函数；第二层把大量沙盒工具藏到 shell/手册学习链里；第三层才是写代码、调 API 和做大内存计算。
8. 同一条 `48_-W-aKyS1KAc.txt` 继续支持当前主线两个关键判断：`固定前缀 + 统一原子接口` 对 KV 缓存和模式安全极重要；高能力层应该卸载到外部执行环境，而不是继续堆进前台 prompt。

### 2026-03-11 00:00:00（继续补读 20260226_batch48 前半与剩余 primary 后的新增发现）
1. `01_gWIJRNQ1dMU.txt` 再次把技术债治理钉成系统层复利：agent 时代的人类大扫除不可扩展，真正可持续的是“黄金规则代码化 + 后台小步自动清理 + 自动生成小型重构 PR”。
2. `04_p4Wnc5ezfO0.txt` 把“建议升级成法律”的逻辑讲透了：文档只是建议，不变量必须写成代码检查；而且最有杠杆的 linter 不是只报错，而是附带修复指令，让规则本身变成 prompt。
3. `08_0PfR8Ay0U8c.txt` 继续加强了当前知识治理主线：`Agents.md` 必须是地图，docs 必须是真相源，仓库必须变成机器认知系统；不在仓库里的知识，对 agent 就等于不存在。
4. `03_RvlFzjXHYc8.txt` 把吞吐量时代的合并逻辑讲得非常实：当修正成本远低于等待成本时，系统要做的是最小化阻塞门控、缩短 PR 生命周期、对 flaky test 采用重跑/快速反攻，而不是维持低吞吐时代的重审批习惯。
5. `02_4Z54NY5tWV4.txt` 则把端到端自治的边界拉清楚了：Agent 能深度接管代码、测试、CI、评审、监控乃至合并，但这种自洽闭环强依赖于具体代码库结构与工具链，不能被误读成“任何仓库现在都能复制”。
6. `17_D2CnFzzTeBo.txt` 把 workflow 选型真正收口成一个工程决策框架：默认先简单，再判断是否需要 routing，再根据瓶颈决定是否用 chaining、sectioning、orchestrator-workers、voting 或 evaluator-optimizer。
7. `24_ZpU8LQp5GpQ.txt` 继续把“验证型子代理优先”钉成第一拆分点：不要拆白盒测试编写，要先拆黑盒执行验证；而且验证者必须被强制覆盖边界情况和负向测试，防止过早胜利。
8. `18_RcPUsqsp3CE.txt` 把 `Evaluator-Optimizer` 和 `Voting` 的分界线讲得非常适合直接落地：不确定选哪个用 voting，知道哪里不好、也知道怎么改，用 evaluator-optimizer。
9. `32_v2rvO799KWs.txt` 则把 grader 体系讲成了可执行金字塔：底座代码评分，中层模型评分，塔尖人类校准。对当前主线最值钱的点是“结果验证是唯一真理，代码评分过滤低级错误，模型评分处理语义，人类负责长期校准”。

### 2026-03-11 00:10:00（当前主线收口后的最终发现）
1. 到这一步，当前 OpenClaw 主线已经不再缺“观点”，而是缺“严格执行这些法则的工程动作”。
2. 最核心的产品收口已经完成：前台轻、主干单流、验证优先、规则代码化、仓库真相源、分层评估。
3. 之前灵感库里很多会让人兴奋的结构，现在都已经被归类成“升级链路”，不是默认入口。这一步很关键，因为它避免我们被多 agent、异步并发和高权限控制的热度带偏。
4. 现在真正有复利的，不是继续追新结构，而是围绕这 8 条法则持续建设状态、反馈、规则、评估和清理机制。

### 2026-03-11 22:22:57（继续补读 20260226_batch48 尾部 eval / research / citation / prompt engineering 后的新增发现）
1. `30_7qJmHipfqy8.txt` 明确说明：不同 agent 类型必须配不同评分器。当前 OpenClaw 后续如果做评估，至少要拆成 `代码 / 对话 / 研究 / 电脑操作` 四类，而不是追求一个万能总分。
2. `31_j_COyjcBjC4.txt` 把一个经常被混淆的边界讲透了：`能做出来` 和 `能稳定做出来` 不是一个指标。后续评估池如果不拆成 `capability pool` 与 `regression pool`，很容易出现研发期高分掩盖生产期不稳定。
3. `33_kJkc11xmKfg.txt` 再次钉实：`Outcome` 才是最终真相，`Transcript` 是复盘证据，`Trial` 是对抗随机性的动作。也就是说，后续任何“修好了”的判断，最终都不能只靠 agent 口头陈述。
4. `36_N6Xb-hJi08g.txt` 把多 agent 评估的边界讲得很值钱：我们要评估“过程是否合理”，而不是死查“是否按预设步骤执行”。这让后续验证型子代理的设计空间更大，也更贴近真实系统。
5. `37_gjWGuRVws9A.txt` 与 `38_rsj321VCV4I.txt` 属于同源重复稿，但高价值结论很稳定：`Citation Agent` 只应负责加引用，不应改正文；而且应在去掉标签后与原文逐字一致。这非常适合作为“只读验证/增强”型子代理范式。
6. `39_6d8gjkVK02k.txt` 给 `Research Sub-agent` 画清了边界：预算先行、内部工具优先、宽查后窄查、冲突原样上交、边际收益递减时立刻停手。它适合独立研究 worker，不适合作为 Telegram 前台默认行为。
7. `41_5OV-XVTjkJk.txt` 的真正高价值不是“主代理要管很多子代理”，而是子任务说明必须至少包含 `objective / output format / tool guidance / task boundaries` 四项；另外，工具描述就是界面文档，这对当前 OpenClaw 的 MCP/skill 扩展很有指导价值。
8. 这一轮之后，当前主线的多 agent 形态已经更清楚了：先上 `引用校验 / 黑盒验证 / 独立研究` 这三类子代理，比先再造一个会想会写的并行大脑更稳、更符合已读 primary 共识。

### 2026-03-11 22:29:03（第一次冲突整理后的新增发现）
1. “多 agent 很强”与“单决策流更稳”这组冲突，现在可以正式裁决了：对当前 OpenClaw 主线，默认仍是 `轻前台 + 单决策流主干`；多 agent 只作为研究、验证、引用、独立 worker 的升级链路。
2. “更大上下文”与“状态外化”这组冲突，也已经被读透：当前主解不是继续堆窗口，而是把计划、closeout、失败轨迹、项目 capsule 和规则真相源放到会话外。
3. “记忆更多”与“系统更会进化”这组冲突，当前也可收口：记忆本身不等于进化；真正的复利来自 `反馈循环 + 技术债清理 + 规则代码化 + 分层评估`。
4. “自动化评分足够”与“必须看 transcript / human”这组冲突，当前应判为后者胜出：自动化评分只是底座，Transcript 与人类校准必须留在链路里。
5. “浏览器/UI 自动化应默认全开”与“高权限能力只做升级链路”这组冲突，当前仍应判为后者胜出：高权限控制很有价值，但不进入前台默认入口。
6. “把所有工具都动态暴露给 agent”与“固定原子接口 + 分层能力空间”这组冲突，也已经稳定：当前主线应坚持后者，不把动态热插拔当默认设计。

### 2026-03-11 22:29:03（按 8 条产品法则反查当前 OpenClaw 现状后的新增发现）
1. `法则1：默认先简单` 当前只部分符合。配置和研究判断都已收口，但现实配置里 `telegram-fast` 已被放开到 `ui / automation / nodes / sessions_* / subagents / memory_*`，前台已经不再“轻”，有向升级链路越界的趋势。
2. `法则2：Telegram 前台必须轻` 当前不符合。`openclaw.json` 里 `telegram-fast` 权限面已经明显偏重，这和已读 primary 的默认入口判断发生了正面冲突。
3. `法则3：代码主线 one brain one stream` 当前大方向仍符合，因为默认并未把强耦合代码主线改成多 agent 并行写；但工具面已为并行扩张敞开，后续稍不收束就容易漂移。
4. `法则4：状态可读性与机器友好反馈优先` 当前不符合。实测里 `openclaw channels status --probe --json` 会超时，`gateway health` 虽为 `OK` 但 Telegram `failed (unknown)`，`nodes status` 显示 `paired=true / connected=false`，`openclaw agent` 还出现 `400 + EPERM rename models.json`。这说明状态可读性和运行稳定性没有真正守住。
5. `法则5：仓库必须是机器认知系统` 当前部分符合。`workspace / workspace-telegram-fast`、项目 capsule、task/progress/findings 已经形成真相源体系，但运行面并没有稳到能持续兑现这些规则。
6. `法则6：skill / tool / MCP 分层` 当前部分符合。认知上已经分层，配置上也保留了 `memory_get/search` 只读边界；但 `telegram-fast` 前台的工具面过宽，正在削弱这条分层原则。
7. `法则7：规则代码化` 当前不符合。现在大量判断仍停留在文档和工作区规则层，真正落到程序级 lint/schema/provider 入口的硬卡口仍然偏少。
8. `法则8：评估分层且分类型` 当前不符合。研究层已经形成明确方法论，但现实系统里还没有看到被程序化的 `capability/regression` 池、`Outcome/Transcript/Trial` 框架和按 agent 类型拆分的评分器。
9. 当前最值钱的下一刀已经变清楚了：不是再扩能力，而是先把“运行面退化”收回到最小可用真状态，尤其是 `Telegram probe`、`node connected`、`browser/node/gateway` 这一条活链。
10. 只有运行面重新稳定后，才值得继续讨论哪些升级链路真的要进入默认入口；否则只会继续出现“纸面能力更强，真实交付更差”的负优化。

### 2026-03-12 08:54:50（继续补读 topic15 / image7 / aibaihua6 / mxai2 后的新增发现）
1. `07_CiI8juADMus.txt` 把工程范围讲得更彻底了：agent 时代真正接管的是整条工程链，而不是“只会写代码”。这进一步支持当前把 harness、环境、验收标准和验证系统当主产品的路线。
2. `01_Jn3ywgwIpw0.txt` 再次钉实：单 agent 默认仍是最优起手式。先保持系统简单、模块化、可观测，再在复杂度真的越界时才升级为多 agent。
3. `02_kZ0-h7csizM.txt` 提供了一个长期方向判断：软件正在从“人类优先”转向“agent 优先”。这意味着后续关键能力应尽量暴露为 `API / MCP / CLI / 结构化检索 / 审计 / 身份` 这类机器可用界面，而不是过度依赖 UI。
4. `06_gptFbbbs6Pk.txt` 只提供了极弱的 `self-improving-agent` 支持信号，不能单独抬高到当前主线；它更适合作为现有“反思/提升机制”判断的补充材料。
5. `01_vTaEqS2tI8w.txt` 更偏操作员能量管理，不构成当前 OpenClaw 架构排序的主证据，只保留观察。
6. `01_QpM8abg6s8Y.txt` 当前存在明显编码污染，只能粗粒度支持 `OpenViking` 的文件系统式组织、分层加载与透明检索路径；在修复语料前，不承担细节比较。
7. 这批新 primary 没有推翻现有主线，反而进一步强化了三个判断：`轻前台`、`单 agent 默认`、`机器可用接口优先`。

### 2026-03-12 08:58:56（继续补读 openclaw24 多 agent / memory / hooks / node 后的新增发现）
1. `16_wawNvxapF1s.txt` 把多 agent 的四层设计讲成了 `部署层 / 身份层 / 路由层 / 状态层`。真正最值钱的不是“多 agent 很多”，而是不同层能显式决定隔离程度与交互方式。
2. 同一条 `16_wawNvxapF1s.txt` 也给出一个重要反证：`单 agent 多 session` 在共享 workspace 下，很容易造成记忆串线、要求积累和 system prompt 膨胀。它支持“按入口/职责拆 workspace”，但不自动支持“默认全系统多 agent”。
3. `17_GVTynFMMTwM.txt` 进一步钉实三条主线增强：`heartbeat` 提升主动汇报，`可重入性` 让长任务断线后能接着做，`像 AI 一样思考` 则要求优先 API/脚本/路径共享，而不是模仿人类点浏览器。
4. `18_x7yadOEV1bo.txt` 的高价值部分是 `Memory Topics`：`Memory = 索引 + 核心规则 + 主题文件`，这能减少首轮上下文负担并提升按主题命中。它支持我们继续做记忆分层和按需加载，但不足以单独支持“现在就切整个记忆底座到 LanceDB”。
5. `19_h6e4sogMQr4.txt` 继续强化：强记忆确实能让系统跨 session 复用踩坑经验和方法论，但这里真正值钱的是 `混合检索 + 显式写入纪律 + 方法论与技术细节一起存`，不是插件宣传本身。
6. `20_B_CM_M-I-0s.txt` 对当前主线极重要：调用 `Cloud Code/Codex` 的高 token 开销，很多不是任务本身，而是前台轮询造成的。更优结构是 `派工一次 -> 后台独跑 -> hooks 回调 -> 单独通知`。
7. 同一条 `20_B_CM_M-I-0s.txt` 也进一步支持异步收尾槽位：长任务结果最好单独进入通知群/异步沟通文件，而不是持续占用主对话窗口。
8. `22_c44yRfk2UOY.txt` 与 `23_hFJxXK88U0Q.txt` 主要提供了一个补位判断：云端聊天入口、Codespaces 沙盒、skills、定时任务、浏览器自动化和 coding-agent 这些能力形态成立；但云端无法替代本地文件/本地应用操作面，所以仍只适合作为补位能力。
9. `24_XNJMwUdOzEc.txt` 提供了三个值得保留的方向：`模型容灾与多凭据轮换`、`Node 反向隧道配对本地设备`、`主 agent 调度专职 agent`。其中前两条更接近当前主线，后三种协作模式仍更像升级链路。

### 2026-03-12 09:00:39（继续补读 openclaw24 尾部 UI Agent / 高级教程后的新增发现）
1. `21_YoA2bf76t9E.txt` 与 `20_B_CM_M-I-0s.txt` 基本是同主题重复稿，继续加强的是 `Hooks 零轮询派工`，不再单独抬高权重。
2. `28_KMN-hSKDP_g.txt` 对自动化路线的启发很直接：国内平台如微信、抖音，稳定自动化不该默认只靠浏览器或纯视觉 UI Agent。更稳的是 `RPA 负责固化路径，UI Agent 负责理解、判断和兜底`。
3. 同一条 `28_KMN-hSKDP_g.txt` 也进一步钉实：纯 UI Agent 太慢，更适合探索与补位；重复动作应尽量固化成脚本/RPA/低层接口。
4. `29_wOi3MLssnnw.txt` 的高价值部分主要是：搜索可以用 skill 与工具提示修复，`Dual-Agent` 的真正价值是独立 workspace，`Heartbeat` 适合带完整历史的周期性任务。
5. 同一条 `29_wOi3MLssnnw.txt` 也提供了当前不采纳的反例：把角色默认切到 `Full`、把高权限能力默认全开，这更像教程式快捷做法，不适合作为当前默认主线。

### 2026-03-12 09:06:18（继续补读 batch48 尾部与 muzi3 重复稿后的新增发现）
1. `05_bEaYiZSditM.txt` 是当前最值钱的新证据之一：`Agents.md` 应短、稳、可验证，结构化 `docs` 才是真相源；执行计划、技术债、质量评分和产品规格都应版本化在仓库里。
2. 同一条 `05_bEaYiZSditM.txt` 还继续钉实：不在仓库里的知识，对 agent 等于不存在。Slack、Google Docs、人口口相传的经验，只有迁移进仓库后才会进入机器推理面。
3. `05_bEaYiZSditM.txt` 也支持“无聊技术 / 透明实现 / 必要时自己造小轮子”的工程偏好，因为它们对 agent 更可读、稳定和可修。
4. `11_tFM-2mvdBxQ.txt` 与 `40_iDuJwtH8YKg.txt` 互相印证：研究型 `Lead Agent` 的职责是 `分类 / 规划 / 委派 / 合成 / 止损 / 最终报告`，而不是前台默认人格。
5. 这两条材料共同给出一个重要边界：研究链里可以按 `深度优先 / 广度优先 / 直接查询` 选择 `1 / 2-3 / 5-10` 个子代理；超过 `20` 个通常是方法设计有问题，不应继续线性加人。
6. 同一组材料还钉实：子代理指令必须高信息密度，至少明确 `目标 / 输出格式 / 起手信源 / 工具边界`；最终报告应由 Lead 亲自收口，不应再委派代写。
7. `42__p_DPOvKWl8.txt` 把研究型多 agent 的最小闭环讲清楚了：`Lead -> Search Workers -> Citation Worker`；其中真正值钱的是 `citation worker` 作为验证子代理的角色，而不是“动态派生很多工人”本身。
8. `42__p_DPOvKWl8.txt` 还给出两个重要工程信号：长任务在派工前先 `save plan` 到外部 memory 确实能降低忘本风险；`search-think-search` 更适合研究 worker，不适合默认推广成所有执行链。
9. `muzi3` 的三条（`01_D6FkxqDhrRs / 02_3oSL3fxEJqs / 03_io67uFrd54M`）与已读 `openclaw24` 高度重合，本轮只用于“加强共识”，不新增主判断。
10. 它们继续加强的共识是：真正大的不是用户这句话，而是整包输入；浏览器能力应分层；当目标包含本地文件、浏览器登录态和本地应用时，本地机器优先于云端 VPS。

### 2026-03-12 09:13:47（进入 supplemental：stellarlinkco-codex 白名单入口后的新增发现）
1. `D:\Projects\_research\stellarlinkco-codex\README.md` 的高价值部分很有限：它说明这个 fork 的目标是 `agent teams / hooks / Web UI / long-running orchestration`。这只能作为“升级链路有哪些形态”的补充，不足以压过 primary 对默认入口复杂度的限制。
2. `D:\Projects\_research\stellarlinkco-codex\codex-cli\README.md` 提供了一个关键实现语义：Codex 会按 `~/.codex/AGENTS.md -> repo root AGENTS.md -> cwd AGENTS.md` 叠加项目文档。这与我们当前“地图式 AGENTS + 仓库真相源”的方向完全一致。
3. 同一条 `codex-cli README` 也支持一个现实边界：Codex 的平台/权限模型是 first-class 的。自动写文件、自动跑命令和 shell 权限，本来就是产品面的一等问题，不是实现细节。
4. `D:\Projects\_research\stellarlinkco-codex\shell-tool-mcp\README.md` 非常值钱：shell MCP 的关键不在“多了一个 shell”，而在它是 `execve` 级别拦截，能基于 `.rules` 精确控制最终执行的可执行路径。
5. 同一条 `shell-tool-mcp README` 还给出一个很硬的 harness 结论：客户端会给 MCP 下发 `codex/sandbox-state/update`，也就是说真正的 shell harness 是“动态沙箱状态 + 规则执行”，而不是静态 shell 权限开关。
6. `D:\Projects\_research\stellarlinkco-codex\codex-rs\core\README.md` 则把另一层做实：`SandboxPolicy`、可写根、网络访问、平台差异、Apple Events/automation 权限都属于 core business logic。这继续支持“harness 是 OS 层，不是聊天层”。
7. 这一轮 supplemental 没有推翻 primary 主线，反而把一个长期判断做实了：后续如果让 OpenClaw 稳定操控 Codex，更值得做的是 `显式规则 / 动态沙箱状态 / 少量稳定原子接口`，而不是继续放大前台人格或堆更厚 prompt。

### 2026-03-12 09:27:31（supplemental：hooks / compaction / review / skills 的新增发现）
1. `D:\Projects\_research\stellarlinkco-codex\docs\hooks.md` 明确了 hooks 的系统语义：命中 hooks 并行执行、相同 handler 自动去重、skill frontmatter 里的 hooks 只在该 turn 生命周期内生效。
2. 同一份 `hooks.md` 也钉实了一个重要边界：只有 command hooks 支持 `async=true`，而且 async hook 不会阻断当前动作，输出只会进入下一轮。这很适合 closeout/writeback，不适合当前动作内的强制审查。
3. `codex-rs\app-server\tests\suite\v2\compaction.rs` 把 compaction 的真实语义钉实了：`thread/compact/start` 是“立即返回 + 事件流跟进”的异步动作，客户端不能把它当同步 RPC 结果来等。
4. 同一组 `compaction` 测试还说明：真正的 compaction 状态应该盯 `item/started` / `item/completed` 里的 `contextCompaction` item，而不是只盯 turn 成败。
5. `codex-rs\app-server\tests\suite\v2\review.rs` 明确表明：`review/start` 天然就是验证链能力，而不是聊天入口能力。它支持 `Inline` 和 `Detached` 两种 delivery，说明 review thread 本来就可以从主线程独立出来。
6. 同一组 `review` 测试还支持一个当前主线判断：review 生命周期被 `EnteredReviewMode / ExitedReviewMode` 明确建模，说明验证型子代理最稳的做法是“显式模式切换 + 独立结果项”，不是把验证揉进前台人格。
7. `codex-rs\app-server\tests\suite\v2\skills_list.rs` 给出一个很值钱的 skill 发现边界：skills 应按 `cwd` 精确发现，支持为特定 cwd 加额外 roots，但 roots 必须是绝对路径，而且默认会命中缓存。
8. 这继续支持“按需发现 / forceReload 明确刷新”，不支持“默认全量热插拔”。

### 2026-03-12 09:28:17（supplemental：execpolicy / network-proxy / sdk / process-hardening 的新增发现）
1. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\execpolicy\\README.md` 最值钱的不是“又一个规则文件”，而是它把命令边界升级成了可测试法律：`pattern / decision / justification / match / not_match` 一起构成可验证的 prefix 规则引擎。
2. 同一条 `execpolicy` 还明确了一个长期正确方向：相较于 prompt 里说“别这么做”，命令前缀政策更适合当 harness 的稳定硬卡口，因为它可加载校验、可组合、可给出理由。
3. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\process-hardening\\README.md` 信息量虽小但很硬：禁 core dump、禁 ptrace、清理 `LD_PRELOAD / DYLD_*` 这类危险环境变量，说明进程硬化属于 pre-main 的运行边界，不属于聊天层能力。
4. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\network-proxy\\README.md` 把网络权限的系统语义钉实了：`allowlist-first`、`deny-wins`、`loopback clamp`、`limited=GET/HEAD/OPTIONS only` 都是网络 harness 的一等规则，不是外围补丁。
5. 同一条 `network-proxy` 还给出一个非常高价值的接口：`policy_decider` 能接到 `command / exec_policy_hint`，这意味着后面完全可以把“exec 已审批的命令前缀”映射成网络放行，而不是让网络权限永久静态化。
6. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server-test-client\\README.md` 证明了 `thread rejoin while turn in progress` 是可直接测试的运行时性质；这对长任务断线恢复、前台掉线后重连、后台任务持续推进都有现实价值。
7. `D:\\Projects\\_research\\stellarlinkco-codex\\sdk\\typescript\\README.md` 把 Codex 的真实控制单位讲透了：`Thread` 才是主抽象，`run()` 继续对话，`runStreamed()` 暴露中间事件，`resumeThread()` 复活已有线程，`outputSchema` 和 `config overrides` 都是一等输入。
8. 这一轮 supplemental 继续稳固了一个总判断：如果后面真要让 OpenClaw 稳定操控 Codex，主轴应该是 `thread化控制面 + prefix policy + 动态网络/沙箱状态 + 进程硬化`，而不是把前台人格继续做厚。

### 2026-03-12 09:33:40（supplemental：linux-sandbox / exec-server / debug-client / file-search 的新增发现）
1. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\linux-sandbox\\README.md` 继续把 harness 的执行边界讲硬了：`--ro-bind / /`、按 root 分层可写、`.git/.codex` 等受保护子路径回写只读、`unshare-pid / unshare-net / seccomp`，说明“哪些地方可写、是否能联网、进程怎么隔离”应由系统显式控制。
2. 同一条 `linux-sandbox` 还给出一个重要实现边界：当前 Linux 路径本身也存在 rollout feature flag，这提醒我们 harness 的强约束能力也应支持渐进式切换，而不是一次性把所有入口都改成重防护。
3. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\exec-server\\README.md` 最值钱的是它把执行语义正式拆成 `Run / Escalate / Deny` 三分：在沙箱里跑、升级到外部 faithfully 跑、或直接拒绝。这说明“是否允许命令脱离沙箱”应是可审计的系统判决，而不是前台人格自由发挥。
4. 同一条 `exec-server` 还继续强化：`EXEC_WRAPPER` 和 `CODEX_ESCALATE_SOCKET` 这种命令级桥接才是稳定的控制面；这比在前台 prompt 里说“尽量别做危险动作”更接近真正可执行的 law。
5. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\debug-client\\README.md` 的真正价值不是“可交互 CLI”，而是它把 protocol v2 的 JSON-RPC 事件流完整暴露出来，还支持 `new / resume / use / refresh-thread`。这使它更像调试工位和协议观察器，不像默认用户入口。
6. 这条 `debug-client` 也进一步支持一个当前主线判断：后面若调 OpenClaw-Codex 线程、resume、approval 或 streamed events，最值钱的是留一个“能看全量事件流”的 debug 工位，而不是继续把问题塞回前台聊天窗口里猜。
7. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\file-search\\README.md` 信息量不大，但补强了一个稳判断：文件搜索本身应尽量建立在尊重 `.gitignore`、透明遍历、可复现匹配的文件系统基础上；这继续支持 `agentic search` 优先于黑箱化检索。
8. 这一轮 supplemental 没有推翻当前主线，反而继续强化了一个系统判断：如果后面真要让 OpenClaw 更深地操控 Codex，默认主线应继续围绕 `显式执行边界 + 可升级执行语义 + 线程级调试工位 + 透明文件搜索` 展开，而不是继续堆前台人格和更多动态热插拔。

### 2026-03-12 09:45:39（supplemental：Windows sandbox / MCP exec approval / config hooks 的新增发现）
1. `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\config.md` 的高价值不在“列配置项”，而在它把 hooks 和 project-level `./.codex/config.toml` 直接抬成了 first-class 配置层。这意味着后面若要做项目级行为约束，正确落点不只是工作区文档，还包括 trusted project config。
2. 同一条 `docs/config.md` 也给了一个重要边界：project config 在 untrusted 项目里可能被禁用，必须通过 `trust_level` 明确授权。这说明项目局部能力不是天然生效，而是受信任模型控制。
3. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\windows-sandbox-rs\\src\\lib.rs` 表明 Windows 路径下并不是“没有真沙箱”。它已经把 `ACL / token / workspace protection / audit / firewall / identity / DPAPI / process creation` 组织成完整本地执行面，说明本地主机控制面可以有真正系统边界，而不是只能靠文档约束。
4. 同一套 `windows-sandbox-rs` 还暴露出一个对当前主线很值钱的现实：Windows 本地执行面本来就是 workspace-aware 的，像 `protect_workspace_agents_dir / protect_workspace_codex_dir` 这种点位，说明“保护 agent 自己的工作区与元数据”应是系统设计的一部分。
5. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\windows-sandbox-rs\\src\\policy.rs` 明确拒绝 `DangerFullAccess` 和 `ExternalSandbox` 进入这条 policy 解析路径，只接受 `read-only / workspace-write` 或等价 JSON。这继续支持“默认主线应围绕显式 sandbox policy 建模”，而不把全开放当正常模式。
6. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\shell-command\\src\\parse_command.rs` 的真正价值不是“解析命令字符串”，而是它把命令解析服务于 `human-readable gist / approval UX / safety metadata`。也就是说，命令解析是审批与可观测性的底座，不只是 shell 小工具。
7. 同一条 `parse_command.rs` 还给出一个值得保留的工程信号：这类解析逻辑复杂且易碎，源码里明确鼓励 `TDD + Codex 修实现`，这与我们当前“规则代码化、测试优先于口头解释”的主线一致。
8. `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\mcp-server\\src\\exec_approval.rs` 把命令审批的真实控制面钉实了：前台不是随便问一句，而是通过 `elicitation/create -> ExecApprovalResponse -> Op::ExecApproval` 走线程级协议链，且请求里携带 `threadId / parsed_cmd / cwd / tool_call_id / event_id` 这些关联信息。
9. 这一轮 supplemental 继续强化一个总判断：如果后面真要让 OpenClaw 稳定操控 Codex，本地主机上的 `project trust + sandbox policy + workspace protection + protocolized approvals` 才是高价值主轴，而不是继续把前台聊天人格做得更全能。

### 2026-03-12 09:48:10（supplemental：agent-teams 的新增发现）
1. `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\agent-teams.md` 的真正新增价值不在“支持 team”，而在它把团队运行语义正式建模出来了：`spawn_team / wait_team / close_team / team_cleanup / team_task_* / team_inbox_*` 已经形成一套持久化协作面。
2. 同一份 `agent-teams.md` 还给出一个很关键的系统判断：团队消息不是临时聊天，而是 durable-first。`team_message / team_broadcast / team_ask_lead` 都先写 inbox JSONL，再 best-effort live delivery，这与我们前面从 primary 收口出的“长任务状态要外化”高度一致。
3. 这份 `agent-teams.md` 还把另一条边界讲清楚了：团队配置、任务、inbox cursor、lock 文件都落在磁盘上，说明真正的团队协作不是“多几个会想的窗口”，而是“有持久状态、有任务账本、有消息账本”的工作流系统。
4. 但它目前仍被文档自己标成 `experimental`，而且更适合复杂研究/多工位协作，不足以推翻当前默认主线里的 `轻前台 + 单决策流主干`。也就是说，团队化现在是升级链路，不是默认入口。

### 2026-03-12 09:50:11（取舍表 v2：正式裁决）
1. 默认主线正式裁决为：`轻前台 + 单决策流主干 + 状态外化 + 仓库真相源 + 显式执行边界 + thread 化控制面 + 验证优先 + 透明检索`。
2. 这里的“显式执行边界”已经不再是抽象口号，而是由 `sandbox policy / prefix policy / network policy / protocolized approvals / workspace protection` 这一组系统语义共同支撑。
3. 这里的“thread 化控制面”也已不再是概念，而是明确指向 `Thread / run / runStreamed / resume / rejoin / review / compaction` 这些一等抽象；后续若让 OpenClaw 稳定操控 Codex，应围绕这些对象设计。
4. 第一批应保留为升级链路、而非默认入口的能力已经稳定：`研究子代理 / 引用校验 / 黑盒验证 / detached review / async hooks / compaction / agent-teams / RPA+UI Agent / 高权限浏览器控制 / Orchestrator-Workers / Voting / Evaluator-Optimizer`。
5. 当前正式判为暂不采纳的方向也已稳定：`巨胖前台人格`、`默认全量热插拔工具面`、`强耦合代码主线默认多 agent`、`把更大上下文当主解`、`把 memory 误当成进化`、`把自动化总分当最终真相`。
6. 这一轮之后，继续散读补充文档的价值已经下降；更有价值的动作变成：用这份取舍表 v2 反查当前 OpenClaw 现状，找“纸面主线”和“运行现实”的差距。

### 2026-03-12 10:22:40（openclaw24_deep 第一批 high-signal deep 校准）
1. `D6FkxqDhrRs.deep.md` 与 `DS6oQtfwBME.deep.md` 继续强化了同一条主线：token 问题的主解不是“更大窗口”，而是 `session compaction / memory flush / session lock / 外部化状态` 这组治理原语。
2. `B_CM_M-I-0s.deep.md` 与 `l692H9z2YT8.deep.md` 共同把 `skills / Cloudhub` 钉成了 `能力资产化 + 编排`，而不是“多写一点 prompt / 多装一点 skill”。
3. `io67uFrd54M.deep.md` 继续加强 `本地优先`：当任务涉及本地文件、登录态、桌面应用和浏览器真实环境时，VPS/relay 仍只能做补位层，不能替代本地执行面。
4. `1AI-2nRIEEw.deep.md` 明确了浏览器工程顺序：先稳定本地最小链，再隔离 `Profile/User Data`，最后才构造 `relay / remote-debugging` 闭环；这继续支持高权限浏览器控制只做升级链路。
5. `x7yadOEV1bo.deep.md` 局部污染，但仍能粗粒度支持一个高价值判断：真正可追溯的交付链应落在 `issue / PR / workspace / README / release note` 这些外部产物上，而不是只停在 agent 对话窗口。

### 2026-03-12 10:33:20（openclaw24_deep 第二批与 Codex docs 壳层的新增发现）
1. `GVTynFMMTwM.deep.md` 继续强化：`heartbeat / uptime / gateway / session / fix` 应被视为同一条运行治理链；Agent 系统要先解决“活着、可达、可续、可修”，才谈智能上限。
2. `wawNvxapF1s.deep.md` 虽有明显编码污染，但仍能粗粒度支持：`Agent Sessions + workspace + system prompt + channel + gateway` 属于同一控制面；会话边界和共享工作区不应被分开设计。
3. `YoA2bf76t9E.deep.md` 继续把 `Token / Hooks / Stop / Wake / Session End / Agent Teams` 钉成同一问题：长任务系统真正缺的是事件边界和成本治理，不是再多一个会干活的 agent。
4. `XNJMwUdOzEc.deep.md` 继续加强：`OpenCloud` 更像“Agent 运行与调度中枢”，重点在 `fallback / session memory / node-gateway / team task` 这条控制链，而不是某个单独模型入口。
5. `p5XgacMxfnk.deep.md` 粗粒度支持：`CloudBot/MoatBot + To Do List + Codespaces + GitHub push + README` 构成“任务协议 -> 执行 -> 提交 -> 文档收口”的交付链，这继续支持 durable 产物优先于聊天窗口。
6. `_research\\stellarlinkco-codex\\docs\\exec.md`、`sandbox.md`、`skills.md` 三份本地 docs 当前只是官方原文入口壳，本身不提供足够实现语义，不能压过前面已经读到的 `execpolicy / network-proxy / shell-command / exec-server / app-server tests` 这批更实的 supplemental。

### 2026-03-12 10:41:30（openclaw24_deep 第三批：记忆 / spec / skills / 数据入口）
1. `45LHV3tynB8.deep.md` 只提供弱信号：`self-improving agent = skills + memory + agent`。它能加强“记忆与技能要形成闭环”的方向，但不足以支持“生产主链运行时自进化”。当前仍只保留观察，不进入默认主线。
2. `7eKq4DY62xM.deep.md` 更像 `OpenCloud + Lens DB + API Key` 的概念/营销叙事。它最多支持“外部记忆/检索底座可以产品化”，不足以改变当前“先检索控制与写入纪律，再考虑换底座”的排序。
3. `9ZmsoNOGJSw.deep.md` 是这批里最有价值的一条：它把 `Skill Vetting / VirusTotal / Self-improving Agent / Playwright Scraper / GitHub review/issue/PR / take the wheel / Mail/Notion/Mac/Chrome` 串成了“可信执行 + 人工接管 + 生态接入”链。这继续支持：高权限动作要有筛选、接管点和审计链。
4. `BslzLq-Zncs.deep.md` 继续把 `brainstorming -> planning -> spec` 与 `git repo -> review/feature/bug` 钉成一条更稳的工程闭环，继续支持 `spec-first` 与 `仓库产物优先`。
5. `TXLOCdRqhRw.deep.md` 的高价值只在于“Awesome skills 仓库是发现入口，不是能力决策层”。它继续支持：skills 发现层不等于当前主线优先级。
6. `yxc2qlkd2-o.deep.md` 因证据极薄，只能保留一个方法论启发：极噪音输入也必须先做 `证据层 / 推断层 / 验证层` 分离，不能因为出现 `Claude Bot / skill` 就提前下实施结论。
7. `iNpP7f5T0ag.deep.md` 是这批另一个高价值材料：`WebFetch -> HTTP/cookie -> HTML -> Markdown -> LastThirtyDays -> X/Reddit/YouTube/Hacker News -> OpenCloud.json/.env -> Relay/Chrome Extension -> token/issue` 这条链说明，数据入口 skill 真正值钱的是“可运营的数据抓取+整理+多源比较”，而不是再多一个提示词。
8. `3oSL3fxEJqs.deep.md` 只粗粒度支持“统一入口 + 多平台 + Gemini 参与”的跨平台内容工作流。它不足以改变当前主线，只保留观察。

### 2026-03-12 10:48:10（openclaw24_deep 尾项与闭合判断）
1. `h6e4sogMQr4.deep.md` 继续把 `OpenCloud + LensDB/LanceDB + Session + Gateway + BM25/MMR/Rerank + GitHub/Markdown` 串成“检索治理 + 工程闭环”链。这继续支持：主解不是换更强模型，而是把检索质量、会话连续性和工程沉淀一起做好。
2. `ldaM6N5lgGM.deep.md` 的高价值在“多组件接入先拆角色”：`OpenClou -> CrazyRouter API -> Cloude Opus`，再叠加 `Gateway Status / Curl / HTTP / Token / API Key / App ID/App Secret`。它继续支持：配置、鉴权与链路检查先于模型炫技。
3. `tHzef6d08ac.deep.md` 继续强化：`OpenCloud + AI Agent + skills + GitHub/QQ/APP + BUG->OK` 更像“平台化与故障闭环叙事”，说明一个成熟系统必须能留失败证据，而不是只展示 OK。
4. `1rgGQZ28uxc.deep.md` 仍只保留方法论价值：高噪音输入下，先做 `术语锚点 -> 证据层/推断层分离 -> 待验证问题`，不要把碎词自动拼成实施结论。
5. 到目前为止，`openclaw24_deep` 正文文件没有产出能推翻当前主线的新证据；它主要起到“把主线继续压实”和“把弱信号降权”的作用。
## 2026-03-12 10:37:43（primary 清点完毕，继续补实现语义）
1. 经过重新校准后，按 `primary-like` 口径排除 `_tmp / media / transcripts_s* / summary* / dup_hits`，`D:\Projects\灵感包\转写目录` 当前已无真正未纳入的根级主证据 transcript。后续继续深读时，重点已从“补 primary 空白”转向“补 supplemental 的实现语义校准”。
2. `01_Jn3ywgwIpw0.txt` 再次把“默认先单体 agent”钉实：真实落地里先保持简单、模块化、可观测，只有复杂度真的越界后，多 agent 才开始有意义。这条继续支持当前默认主线，不支持为了架构炫技过度工程化。
3. `02_kZ0-h7csizM.txt` 提供了一个比“怎样让 agent 更会做事”更底层的长期判断：软件本身正在从“为人设计”转向“为 agent 设计”。当前真正值钱的不是漂亮 UI，而是 `API / MCP / CLI / 结构化搜索 / 身份 / 审计 / 计费` 这些 machine-usable surfaces。
4. `01_QpM8abg6s8Y.txt` 仍存在明显编码污染，因此只能粗粒度支持 `OpenViking` 的文件系统式组织、`L0/L1/L2` 分层加载与透明检索路径；在语料修复前，不承担细节比较，也不压过其他质量更高的 primary transcript。
5. `dynamic_tools.rs` 把动态工具的真实语义钉实了：它是 `thread-start` 时注入到线程工具注册表里的动态协议对象，之后通过 `DynamicToolCall -> client response -> function_call_output` 闭环返回模型。它支持“按线程、按任务、按需升格”的方向，不支持“默认全局热插拔工具面”。
6. `rate_limits.rs` 说明账户速率限制是第一等 runtime signal，而不是外围提示。它还明确区分 `codex account auth`、`chatgpt auth` 和 `api key auth` 的边界，这继续支持：模型可用性、额度和账户状态应进入 harness 控制面，而不是留给前台人格临场猜测。
7. `thread_status.rs` 说明 `thread/status/changed` 是正式的线程级运行态事件，而且支持客户端 opt-out；这继续强化“线程状态流和事件通知”比“前台说自己在忙/已完成”更值得信赖。
8. `docs/agents_md.md`、`docs/prompts.md`、`docs/execpolicy.md` 这三份 supplemental 文档当前都只是官方原文入口壳。它们可证明“存在正式文档入口”，但不能单独承担实现语义判断，后续仍应让位于更实的测试与源码证据。

## 2026-03-12 10:45:16（supplemental：thread lifecycle / output schema / steer）
1. `authentication.md` 当前仍只提供官方文档入口，不足以承担实现语义判断；后续关于认证的强结论，仍应优先来自测试与源码。
2. `output_schema.rs` 把一个很关键的控制面钉实了：结构化输出约束是 `turn_start` 时单轮注入的 `json_schema`，下一轮如果不显式传入就不会自动继承。这说明“结果契约”更适合按任务注入，而不是做成全线程永久人格。
3. `thread_resume.rs` 说明 thread 的恢复前提是 rollout 已 materialize；没有真实落盘历史，就不能只靠 thread id 恢复。这继续支持“durable state > 聊天窗口记忆”。
4. 同一条 `thread_resume.rs` 还说明：当线程正在运行时，`resume` 的正确语义是 `rejoin running thread`，而不是趁机重写历史或改路径；对运行中线程传 `history`/`mismatched path` 会被拒绝。这是很硬的运行边界。
5. `thread_resume.rs` 还给出一个对当前主线很值钱的判断：required MCP 初始化失败会直接阻断 thread 恢复。这说明外部能力依赖不是外围小问题，而是 thread lifecycle 的正式阻塞条件。
6. `turn_steer.rs` 说明 steer 不是普通聊天插话，而是正式的运行时协议操作：必须存在 active turn，且 `expected_turn_id` 与当前运行 turn 对上，才能成功插入 steering 输入。
7. 这几条合在一起，把一个更稳的实现语义钉死了：Codex 的真实控制面是 `thread + turn + rollout + protocol events + per-turn constraints`，不是“单轮聊天 + 更厚 prompt”。

## 2026-03-12 10:52:30（supplemental：thread start/read/fork/rollback）
1. `thread_start.rs` 说明 thread 在第一条用户消息前是“已注册但未 materialize”的状态：会有绝对 path 预计算，但 rollout 文件尚不存在。这进一步说明 thread 不是普通聊天窗口，而是可先建立控制对象、后落盘内容的 runtime entity。
2. 同一条 `thread_start.rs` 还给出两个对当前主线很值钱的边界：`ephemeral=true` 的 thread 可以无 path；trusted workspace 下的 project config 会直接影响新 thread 的推理参数。这说明 thread start 本身就会吃到项目级治理配置。
3. `thread_start.rs` 再次确认：required MCP 初始化失败不仅会阻断 resume，也会阻断新 thread start。MCP 依赖属于 lifecycle 正式阻塞条件，不是外围小故障。
4. `thread_read.rs` 把读取面拆得很清楚：`include_turns=false` 只拿 summary/path/status，`include_turns=true` 才要求 rollout 已 materialize。也就是说，“看摘要”和“读全轨迹”是两个不同成本、不同前提的操作。
5. `thread_read.rs` 还说明 thread name 是正式字段，不是 UI 临时标题；并且失败后的 thread status 会进入 `SystemError`。这继续支持：真正可靠的状态应来自线程字段，不来自前台口头描述。
6. `thread_fork.rs` 说明 fork 的高价值语义是：从已 materialize 的 rollout 复制出新 thread，保留 turn 历史，但不修改原 rollout，也不继承 `name`。这更像 durable workflow 的分支操作，而不是会话层复制粘贴。
7. `thread_rollback.rs` 说明 rollback 是正式的持久化工作流操作：它会裁掉最近 turns，并把裁剪后的结果回写到 rollout。也就是说，thread 真的具备“历史可恢复、分支可衍生、最近步骤可回退”的工程语义。
8. 这四条和前面 `resume / steer / output_schema / status` 合在一起，已经把一个更完整的判断钉实了：Codex 的真实高价值控制面是 `thread lifecycle object model`，不是“把更多上下文塞进单轮聊天”。
## 2026-03-12 10:55:28
- `thread/list` 的价值不只是“列出会话”，而是把 thread inventory 协议化成了真实运行控制面：它能按 `provider / cwd / source kind / archived / sort key` 过滤，还会把 `SystemError`、git 信息和 subagent 变体带出来。这说明线程目录本身就是运维对象，不是聊天侧边栏。
- `thread_archive / thread_unarchive` 把 thread 生命周期补成了“热态、冷态、恢复态”的 durable 工作流，而不是只有 active chat 一种状态。特别是“没有 materialized rollout 就不能 archive”这条，非常支持“先落盘、再治理”的总方向。
- `thread_loaded_list` 把一个容易被忽略的边界钉死了：`runtime loaded` 与 `on-disk exists` 是两个不同层次的 truth。后面做 agent 控制面时，不能把“看得到线程”误当成“线程已经在运行或已载入”。
- `model_list` 说明模型不是黑盒字符串，而是可被协议消费的 catalog：模型升级目标、可用推理强度、模态、默认模型位都属于 runtime metadata。后续模型治理更适合走 catalog/control-plane，而不是让前台人格口头声明。
- `config_rpc` 是这轮最有价值的 supplemental 之一：它证明配置治理完全可以被做成 `RPC + layered origins + project trust + version conflict + batch write`。这对用户自己的 harness 研究很关键，因为它把“配置与治理”从文档习惯提升成了系统协议。
- `turn_start` 再次强化了一个长期判断：真正有价值的是 `per-turn approval contract`，不是更厚的安全提示词。无论是 `FileChangeRequestApproval`、`AcceptForSession`，还是 `CommandExecutionStatus / process_id` 持续一致，都是协议级控制，不是前台临场判断。
- `turn_interrupt` 说明“中途打断正在运行任务”也应被视为一等控制面；它不是聊天里说一句“停”，而是带 `thread_id + turn_id` 的正式操作，并落到 `Interrupted` 状态。
- `windows_sandbox_setup` 继续支持一个更硬的判断：Windows 本地执行面同样值得被当成受治理的正式系统，而不是只能靠“运行就运行”。

## 2026-03-12 10:55:28
- `initialize` 证明“客户端是谁、愿意收什么通知、有没有实验能力”都属于协议握手的一部分。也就是说，入口客户端本身就是 harness 配置的一环，而不是透明无差别的壳。
- `request_user_input` 把“人类进入 loop”的正确位置钉死了：它不是普通对话，而是有 mode、有 item_id、有 answers payload 的正式工具回路。后面如果真做高质量 supervisor-in-the-loop，这条实现语义很关键。
- `experimental_api` 把另一个边界讲清楚了：实验字段/方法不能靠“前台知道就能用”，必须有客户端 capability 明示授权。这继续支持“能力门控 > 提示词暗示”。
- `safety_check_downgrade` 很值钱，因为它把“模型被安全重路由”从黑盒现象提升成显式事件：如果后续研究多模型 harness，不该只盯最终回复，还要盯 `model/rerouted` 这类正式信号。

## 2026-03-12 11:09:48
- `account.rs` 说明 account/workspace/auth refresh 是正式运行控制面：`logout_account` 会删除 auth 文件并发 `account/updated`；`chatgpt auth tokens` 登录会更新账户状态；`requires_openai_auth` 是 surfaced runtime property；`401` 后可触发正式 refresh request 再重试；`forced_chatgpt_workspace_id` 是协议化边界。
- `app_list.rs` 说明 apps/connectors 应被视为动态缓存目录，而非静态配置：目录列表与可访问工具列表会异步合并，`app/list/updated` 会随着快照刷新逐步发出；thread_id 会改变 feature flag 视图；config 中的 `[apps.<id>] enabled = false` 会直接进入返回面。
- `collaboration_mode_list.rs` 说明 collaboration mode 是可枚举的内建预设，不是自由文本；当前至少 `Plan` 与 `Default` 以稳定顺序暴露。
- `connection_handling_websocket.rs` 说明 transport/handshake 隔离是正式协议保证：每个 WebSocket 连接都必须单独 initialize；未初始化连接会得到 `Not initialized`；相同 request-id 在不同连接间互不污染。
- `experimental_feature_list.rs` 说明 feature governance 也是控制面：实验功能具备 `stage / enabled / default_enabled / display_name / description / announcement` 的正式列表面。
- `plan_item.rs` 说明 Plan mode 的 `<proposed_plan>` 会被提升成正式 `ThreadItem::Plan` 与 `item/plan/delta` 事件流；没有该块时不会发出 plan item。
- `review.rs` 说明 review 是协议化 workflow，不是普通 turn 的语气变化：支持 `inline` 与 `detached`，并通过 `EnteredReviewMode / ExitedReviewMode` 与 code review item 进入线程历史。
- `compaction.rs` 说明 context compaction 具备 thread 级 started/completed 生命周期，可自动触发也可手动触发；“压缩”是系统能力，不是前台习惯。
- `skills_list.rs` 说明 skill roots 也是受治理目录面：extra user roots 必须是绝对路径，且按 cwd 绑定并受缓存与 force-reload 控制，不支持任意相对路径热插拔。

## 2026-03-12 11:14:08
- `analytics.rs` 说明 analytics 默认是否启用由显式 flag 决定；它更像观测/遥测开关，而不是会改变当前 harness 主轴排序的核心控制面。
- `turn_start_zsh_fork.rs` 说明 shell 执行后端可以替换成 zsh fork 变体，但高价值主链仍是 `turn_start -> command item -> approval -> interrupt/completed` 这一套协议对象；执行后端替换不改变主控制模型。
- `mod.rs` 只是 app-server v2 测试簇索引，它的价值在于帮助确认当前 supplemental 控制面覆盖较完整，而不是提供新的实现语义。

## 2026-03-12 11:20:08
- `codex-rs\\protocol\\src\\items.rs` 里的 `TurnItem` 仍是轻量核心项：`UserMessage / AgentMessage / Plan / Reasoning / WebSearch / ContextCompaction`。而 `app-server-protocol v2.rs` 里的 `ThreadItem` 已扩展成 app-server 侧的统一运行轨迹对象，额外正式承载 `CommandExecution / FileChange / McpToolCall / CollabAgentToolCall / Review / ContextCompaction`。这说明“线程历史”不是 raw model stream，而是被系统二次整形后的 durable view。
- `Thread` 与 `Turn` 的默认返回面是刻意瘦身的：普通通知不会总带完整 `turns/items`，只有 `resume / fork / read(includeTurns=true)` 这种显式历史动作才拿完整轨迹。这继续支持“运行控制面”和“前台展示面”分离。
- `ThreadTokenUsageUpdatedNotification`、`ThreadNameUpdatedNotification`、`TurnPlanUpdatedNotification` 说明 token 使用、线程命名、计划状态都是 first-class event stream，不应再被视为 UI 文案层信息。
- `CommandExecutionRequestApprovalParams` 不只是 yes/no 提示，它还正式携带 `approval_id`、`network_approval_context`、`command_actions` 和 `proposed_execpolicy_amendment`；`FileChangeRequestApprovalParams` 还带 `grant_root`。审批本身已经是 policy/governance 面，而不是聊天里临时问一句。
- `request_user_input` 在 `protocol` 与 `app-server-protocol` 两层都存在明确对象结构，说明“人类补输入”已经被协议化成受约束的工具回路，而不是对话例外。
- `thread_history.rs` 最值钱的实现语义是：历史重建不是简单回放，而是按 `turn_id` 把晚到的 `exec complete / turn complete / turn abort` 回挂到原始 turn，保留 compaction-only turn，并显式避免 `ThreadRollbackFailed` 与 out-of-turn error 误污染当前活 turn。

## 2026-03-12 11:25:59
- `ConfigLayerSource` 的 precedence 明确说明了 Codex 配置不是一份平面 TOML，而是 `MDM/System/User/Project/SessionFlags/LegacyManaged` 的分层治理对象。后续做 AI harness 时，真正稳的不是“加更多说明”，而是显式层与覆盖关系。
- `ConfigReadResponse` 的 `origins/layers` 与 `ConfigWriteResponse` 的 `version/overridden_metadata/file_path` 说明配置读取和写入都已经被协议化成“可审计、可回溯、可冲突检测”的控制面，而不是文本习惯。
- `ConfigRequirements`/`NetworkRequirements` 说明“允许哪些 approval/sandbox/web search/residency/network shape”本身就是一等要求对象，不应再被当成外围安全建议。
- `AppsConfig`/`AppConfig`/`AppToolApproval` 把 connectors/apps 做成了正式治理目录；尤其 `destructive_enabled`、`open_world_enabled`、`default_tools_approval_mode` 很像未来 AI 应用中“能力目录 + 风险目录”的原型。
- `SandboxPolicy` 继续证明最值钱的不是 prompt 里说“请小心”，而是把 `read_only_access / writable_roots / network_access / external sandbox` 这些边界做成正式对象。

## 2026-03-12 11:31:54
- `account.rs` 把一个很硬的边界钉死了：账号、workspace 和 token refresh 不是外围状态，而是 turn 级成败条件。`401 -> refresh request -> retry` 是正式回路；若 refresh 返回错误 workspace 或非法 token，turn 会直接进入 failed。
- `app_list.rs` 说明 app/connectors 的正确产品理解是“动态目录 + 渐进合并 + 缓存回退”，不是静态配置页。目录元数据和可访问工具列表会异步合并，并持续通过 `app/list/updated` 推送；`force_refetch` 失败时保留旧缓存，这是很典型的“目录面高可用”语义。
- `review.rs` 说明 review 已经是正式 workflow，而不是普通 turn 上贴一层评语：`inline` 走原线程，`detached` 会产出新 `review_thread_id`；`EnteredReviewMode / ExitedReviewMode` 会进入 thread history，review 的审批 item 还能和命令执行 item 对齐。
- `compaction.rs` 说明 compaction 不只是自动压缩，而是 thread 级 started/completed 生命周期；既可以 auto，也可以 `thread_compact_start` 手动触发。后面做 AI harness 时，压缩应被当作正式 lifecycle，而不是聊天习惯。
- `skills_list.rs` 继续把 skill 目录面钉实：它受 `cwd + absolute extra roots + cache + force_reload` 约束，不接受相对路径热插拔。这说明真正稳的 skill 体系更像“受治理的工作区目录”，不是任意扩展槽。
- `collaboration_mode_list.rs` 与 `experimental_feature_list.rs` 一起说明：mode 和 feature 都已经是正式 catalog object，具备稳定枚举、stage、默认值和 enabled 状态。后续更值钱的是围绕目录治理，而不是围绕前台人格宣称。

## 2026-03-12 11:36:35
- `connection_handling_websocket.rs` 把 transport 的真正边界钉死了：initialize 是 per-connection 握手，request-id 也是 per-connection 路由键。即使两个连接共用相同 request-id，响应也必须严格回到各自连接。这说明多窗口/多客户端系统里，transport isolation 本身就是控制面，不该被当成实现细节。
- `plan_item.rs` 说明 plan item 不是“模型说了几条计划”就自然存在，而是只有出现 `<proposed_plan>` block 时才正式提升为 `ThreadItem::Plan` 和 `item/plan/delta`。这进一步支持：结构化工作流对象不能靠自然语言猜，必须靠显式协议标记。
- 从 `plan_item.rs + v2.rs` 一起看，Plan mode 的真正价值不是多说一步“我来计划”，而是把计划本身变成 thread timeline 上的正式 item。这样 plan 才能进入历史、被审计、被增量更新、被后续 worker 消费。
- `app_list.rs` 再补了一层很值钱的高可用语义：目录更新不是一次性替换，而是允许中间快照先到、最终快照后到。这说明能力目录的正确设计更像缓存合并系统，而不是简单接口返回值。
- 当前控制面通知的主线越来越清楚：`initialize / item started / item completed / plan delta / app list updated / turn completed` 这些事件才是真运行态；前台自然语言更像对这些事件的解释层，而不应被当作真相源。

## 2026-03-12 12:02:34
- `bespoke_event_handling.rs` 继续把 app-server 的高价值职责钉实了：它不是简单转发 raw events，而是把命令执行、文件改动、MCP 工具、review 进入/退出、plan delta、token/rate-limit 等事件重整成 `ThreadItem + typed notifications` 的 curated timeline。
- `RawResponseItem` 现在可以更准确地下结论了：它属于可选调试层。`codex_message_processor.rs` 明确表明，当 `experimental_raw_events` 没开时，`EventMsg::RawResponseItem` 会被直接跳过，不进入默认通知流。这说明 durable truth 默认不是 raw model items，而是系统整理后的事件/对象视图。
- listener fanout 的模型也更清楚了：thread 监听器服务于“订阅连接集合”，不是单连接私有实例；连接关闭会撤销自己的订阅，最后一个订阅者离开时才真正清理 listener。这个实现语义对多窗口协作非常关键，因为它说明 fanout 是正式订阅系统，不是 UI 偶然行为。
- `experimental_raw_events` 在同一 thread 上是 last-write-wins，这意味着 raw event 视图本身也不是全局真相，而是某个当前监听配置下的调试投影。
- `handle_token_count_event` 说明 token 与额度不是前台文字总结，而是两条正式通知：`thread/tokenUsage/updated` 和 `account/rateLimits/updated`。这让“成本/配额/上下文窗”天然属于控制面，不该再混进人格自述。
- `handle_turn_diff` 与 `construct_mcp_tool_call_*` 进一步钉实：`turn/diff/updated`、`McpToolCall` started/completed、结构化 `arguments/result/error/duration` 都已经是正式轨迹对象；MCP/命令/文件改动正在被统一收敛到 item 化历史，而不是散落在聊天文本里。

## 2026-03-12 12:09:34
- `output_schema.rs` 把一个很值钱的边界钉死了：`output_schema` 是 per-turn contract，而不是 thread 级永久属性。它会在本轮 `turn/start` 被编码成严格 `json_schema` 下发给模型，下一轮如果没再传，就不会继续继承。
- `thread_status.rs` 说明 `thread/status/changed` 是正式 runtime surface：线程会显式经历 `Active -> Idle/SystemError/NotLoaded` 迁移；而且该通知本身还能被客户端按连接 opt-out。这进一步支持“事件流是运行真相，前台自然语言只是解释层”。
- `turn_steer.rs` 把 `steer` 的真正语义讲清楚了：它不是补发一条普通消息，而是向正在执行的 turn 注入后续输入；如果没有 active turn 或 `expected_turn_id` 不匹配，就会正式失败。这说明 steer 属于 active-turn 控制面，不是聊天层 UX 小技巧。
- `dynamic_tools.rs` 说明动态工具的正确产品理解是“thread 级实验能力目录”：声明发生在 `thread/start`，调用通过正式 `DynamicToolCall` request/response round-trip，把结构化输出重新喂回模型。它更像线程级工具注册表，而不是全局热插拔外挂。
- `app-server/README.md` 又补强了一层 authoritative-state 语义：命令执行、文件改动、review 等 item 都应该以 `item/completed` 作为最终真相；`turn/completed` 目前 even 可能带空 `items`，因此不适合被当成 canonical item list。
- `rate_limits.rs` 继续确认：`account/rateLimits/read` 是单独的认证面，且读取额度要求 ChatGPT auth，不是任意登录态都能拿。这说明 quota/rate-limit 也是正式 account control surface，而不是顺手可取的附属信息。

## 2026-03-12 12:19:37
- `app-server-protocol common.rs` 把一个非常关键的不对称性钉死了：`ServerRequest` 是窄控制回路，而 `ServerNotification` 是宽状态总线。前者主要只有审批、动态工具、人工补输入与账号刷新；后者才承载线程/回合/item 的大部分运行事实。
- 这意味着前台或 IDE 客户端如果只把注意力放在 request/response 上，会天然漏掉绝大多数 authoritative state；真正稳的消费面必须长期盯 `item/started -> delta -> item/completed` 和 thread/turn 级通知。
- `CommandExecutionRequestApprovalParams` 里 `approval_id` 的存在很值钱：普通 shell approval 可为空，但某些子命令回调场景会用它把多个 approval callback 和同一父 item 解歧。这说明 approval 本身已经是可路由对象，不是简单按钮弹窗。
- 同一个审批对象里还带 `network_approval_context`、`command_actions`、`proposed_execpolicy_amendment`，说明“要不要放行”只是表面；更深层其实是在协商网络语义、命令语义和未来可复用的 execpolicy 补丁。
- `FileChangeRequestApprovalParams.grant_root` 则继续说明文件审批并不只是单次 patch 允许/拒绝，它已经触碰到“为本 session 扩大写权限根”的治理边界，哪怕 README 也明确标注了其行为今天仍可能不稳定。
- `ToolRequestUserInputParams/Response` 说明人工补输入已经被约束成 `thread_id / turn_id / item_id / questions / answers` 的正式 schema；这支持“supervisor-in-the-loop 走工具协议回路”，不支持把它混成普通聊天历史。
- `protocol/items.rs` 的轻量 `TurnItem` 与 app-server 的富化 `ThreadItem` 继续强化当前架构判断：底层协议保持小对象，运行面在 app-server 聚合成更适合 durable history、UI 渲染和审计的富对象。

## 2026-03-12 12:24:35
- `thread_read.rs` 把一个容易混淆的边界钉死了：`thread/read` 默认是摘要读取面，不是完整恢复面。`includeTurns=false` 时只返回 summary/path/status；只有显式 `includeTurns=true` 才把 turns 带回来。
- 同一个文件还说明了 `NotLoaded` 与 `Idle` 的差别：磁盘上已有 rollout 但尚未加载的 durable thread 可以是 `NotLoaded`；而刚 `thread/start` 生成、path 已预计算但 rollout 尚未 materialize 的新 thread 可以是 `Idle`。所以“有 path”不等于“已有 durable history”。
- `thread_resume.rs` 把 resume 的真正语义讲清楚了：它首先是 rejoin / reload，而不是任意改写 thread。未 materialize thread 无法 resume；无 overrides 的 resume 不会改 `updated_at` 或 rollout mtime。
- 同一个文件还证明，running thread 上禁止两类破坏性覆盖：`history` override 和 mismatched `path`。但 `model/cwd` 这类 override mismatch 在 running thread 上会被忽略，resume 仍回到当前活 thread，并返回真实运行中的模型/状态。这说明 running thread 的活态真相优先于客户端想象中的覆盖参数。
- `thread_resume_supports_history_and_overrides` 说明已 materialize 的 durable thread 可以在 resume 时显式注入新的 `history + model_provider`，并把 history 文本提升成 preview；这说明 resume 不是纯只读动作，而是受约束的恢复/重建接口。
- `thread_resume_accepts_personality_override` 说明 `personality` override 不是去篡改旧历史，而是在后续 turn 的 developer 输入中注入 `<personality_spec>`；同时原始 base instructions 仍从历史继承。这是一个很关键的“覆盖走 developer layer，不改历史底稿”语义。
- `thread_fork.rs` 说明 fork 是真正的 durable branch：复制 rollout 历史到新 thread，不改原 rollout，不继承 `name`，并通过 `thread/started` 宣告新 branch 进入系统。
- `thread_rollback.rs` 说明 rollback 不是 UI 撤销，而是实打实地裁剪并持久化 rollout 历史；之后 `resume` 看到的就是被裁过的 turns。
- `turn_interrupt.rs` 说明 interrupt 的最终完成信号不是客户端自己猜，而是 `turn/completed` with `status=Interrupted`；只有看到这个事件，才应认为 Codex 侧清理完成。

## 2026-03-12 12:30:56
- `thread_start.rs` 把 thread 的出生语义钉死了：`thread/start` 先创建的是 `Idle` 控制对象，而不是已 materialize 的历史。新 thread 默认 `preview` 为空，path 可预计算但首条用户消息前 rollout 尚未落盘；`ephemeral=true` 时甚至可以完全无 path。
- `thread/start` 还会正式吃进 `cwd` 对应项目层配置。trusted project 下 `.codex/config.toml` 的 `model_reasoning_effort` 等值会直接出现在 `ThreadStartResponse`；required MCP 初始化失败时，thread/start 会直接报错，说明依赖健康属于启动边界，而不是后补逻辑。
- `TurnStartParams` 里的大部分 override 都应理解成“新默认层”，而不只是本轮临时值：协议注释已经明确 `cwd / approval_policy / sandbox_policy / model / effort / summary / personality` 会作用于本轮及后续 turn。
- `collaboration_mode` 的优先级是正式协议语义，不是实现巧合。测试表明它会压过同一 turn 里传入的普通 `model / effort / developer instructions` override，因此 collaboration mode 更像高阶 preset，而不是并列参数。
- `turn_start_exec_approval_toggle_v2`、`turn_start_updates_sandbox_and_cwd_between_turns_v2`、`turn_start_file_change_approval_accept_for_session_persists_v2` 一起说明：审批策略、cwd、sandbox、session 级文件改动批准记忆都会跨 turn 持续。这让 `turn/start` 更像 thread 运行态的配置更新接口，而不只是“发一句新消息”。

## 2026-03-12 12:42:24
- `agent teams` 的高价值本体是 durable workflow 对象，而不是多加几个前台人格。真正的一等对象包括：`teams/<team_id>/config.json`、`tasks/<team_id>/*.json`、`inbox/<thread_id>.jsonl`、`inbox/<thread_id>.cursor.json`、`inbox/<thread_id>.lock`、`tasks.lock`。
- `team_message / team_broadcast / team_ask_lead` 的正确语义是 durable-first append，再做 best-effort live delivery；delivery error 不会抹掉已持久化消息。
- `team_inbox_ack` 是正式治理面，不是“收到了就算”：ack token 需要绑定 team/thread/line index/last_entry_id，并满足单调性；invalid token 与 team/thread mismatch 都是正式错误。
- `team_task_claim` 和 `team_task_complete` 都明确做了并发正确性约束，说明 task board 是有锁的 durable state machine，不是 prompt 约定。
- `worktree=true` 让 team member 获得独立 git worktree，并在 close/cleanup 时一并回收；这说明 team 的正确理解更接近“持久化 inbox + task registry + isolated execution leases”，而不是“更多聊天窗口”。

## 2026-03-12 12:49:31
- `CollabAgentSpawnBeginEvent / EndEvent` 说明 subagent spawn 已经是正式 lifecycle，而不是内部偶发动作；spawn 完成后 `subagent_start` hook 还能把 `additional_context` 注入子 agent 的 developer layer。
- `team_task_complete` 先拿 completion lock、再跑 `task_completed` hook、最后写 Completed 状态，说明“任务完成后的自动化链路”被设计成并发安全的一等流程，而不是后置脚本。
- hooks 注册表把 `TaskCompleted / SubagentStart / SubagentStop / WorktreeCreate / WorktreeRemove / PreCompact` 全部提升成正式 `HookEvent`，这说明 review/compaction/team/worktree 这些“二阶对象”都已拥有自己的 lifecycle 面。
- `worktree_create / worktree_remove` hook 让隔离执行环境本身也成为可治理对象：不仅能创建/回收，还能通过 hook 传入/返回结构化上下文，例如 `worktree_path`。

## 2026-03-12 12:51:42
- `close_team.rs` 暴露了一个关键边界：它不是“删除 team”的同义词，而是“按成员执行关闭并尝试从 team record 中移除成功成员”。因此 `close_team` 支持 partial success，天然保留失败成员和剩余队伍。
- `team_cleanup.rs` 则是更强语义：同样会逐成员 shutdown + cleanup，但其目标是彻底拆队；当 remaining_team 为空且持久化删除成功时，`removed_from_registry / removed_team_config / removed_task_dir` 才一起成立。
- `spawn_team.rs` 说明 team spawn 的真实一等对象不是成员列表本身，而是 `TeamRecord + initial_tasks + optional worktree lease + spawn lifecycle events`。这让 team 从一开始就带持久化任务面，而不是等 worker 自己在聊天里补全任务分工。
- `multi_agents tests` 进一步钉实两个高价值行为：
  - `close_team` 和 `team_cleanup` 都能释放已 shutdown 成员占用的线程槽位，说明“关闭/清理”不只是 UI 收口，而是会回收运行容量。
  - `worktree_create/worktree_remove` hook 能接管 worktree 生命周期，使“非 git cwd 也能走隔离执行”成为受治理升级链，而不是硬编码例外。

## 2026-03-12 12:58:54
- `review.rs` 把 review 钉成了正式子线程 workflow，而不是普通 prompt 变体：
  - review 线程会强制禁用 `web search` 与 `collab`
  - 基础指令改成 `REVIEW_PROMPT`
  - 审批策略强制 `AskForApproval::Never`
  - review model 可独立于主模型
- `core/tests/suite/review.rs` 证明 review 的输入与父线程历史隔离；但完成后 review 结果会回灌父线程历史，因此 review 的真正产品语义是“隔离执行，结构化合流”。
- review 流中 assistant message 的 streaming/delta 会被显式抑制，说明 review 过程不应被前台误消费成普通聊天流；前台真正该盯的是 `ExitedReviewMode(review_output)` 与最终回写的 rollout。
- `compact.rs` 说明 local compaction 是正式 lifecycle：`TurnStarted -> ContextCompaction started -> completed -> rollout Compacted item -> warning`；它不是隐式后台摘要。
- `compact.rs` 还说明 local compaction 的核心价值是“重写后续模型可见历史”：
  - 会从历史中剥离尾部 model-switch developer message
  - 只保留 token 预算内的 user messages
  - 把 summary 作为 user message 重新压回历史
  - 按规则把 canonical initial context 插回最后一个真实 user message 之前
- `compact_remote.rs` 说明 remote compaction 更像受治理的控制面：
  - 失败会记录 compact request 的 model-visible bytes 与 token breakdown
  - 会先裁掉超出 context window 的 codex-generated item
  - 会保留 ghost snapshots 以维持 `/undo`
  - 只允许保留适合 durable history 的 compacted item 类型

## 2026-03-12 13:05:49
- `compact_remote.rs` 继续把一个关键边界钉死了：remote compaction 的 follow-up 请求优先消费返回的 compaction item；如果 remote 输出只剩 compaction item，旧 assistant/user 历史可以被整体替换掉，而不是自动回补。
- remote pre-turn compaction 当前仍有两个显式“当前行为”边界：
  - compact request 会排除 incoming user
  - 模型切换时会先剥离 incoming `<model_switch>`，再在 post-compaction follow-up request 中把新 user 与 model-switch 恢复进去
- remote compaction 失败会停止本轮 agent loop；`invalid compact payload` 和 `context window exceeded` 都不会进入 post-compaction follow-up turn。
- `compact_resume_fork.rs` 把 durable history 的主不变量钉实了：`compact -> resume -> fork -> compact -> resume` 之后，新请求仍应以前一轮 compact 后的历史为前缀，只在尾部追加新的 user turn；ghost snapshot 只属于过滤层，不应污染主历史判断。

## 2026-03-12 13:09:31
- `message_history.rs` 把一个关键分工钉死了：全局 `history.jsonl` 只是 append-only 文本日志，字段只有 `session_id/ts/text`，它不是 thread 的 durable workflow 历史。
- `rollout/recorder.rs` 说明 durable thread history 的正确落点是 rollout，而不是全局 history；而且 rollout 采用 deferred materialization，显式 `persist()` 前即使已缓冲事件和 user-message-like item，也不会真的落盘。
- `rollout/policy.rs` 说明 rollout 落盘是强筛选而非原样录制：`Limited/Extended` 决定哪些事件/response items 进入持久化文件；plan item completion、compaction、ghost snapshot、部分 command/tool 结果是显式纳入的对象。
- `rollout/truncation.rs + thread_manager.rs` 说明 fork/截断按“真实 user turn 边界”做，并且会应用 `ThreadRolledBack` marker、忽略 session prefix；因此 fork 看到的是 post-rollback 的有效历史，不是原始流切片。
- `thread_manager.rs` 还把一个重要边界钉实了：`SessionConfigured` 必须是 first event，thread 的 durable 真相要通过 thread manager 的握手建立，不能由前台自己猜。

## 2026-03-12 13:14:18
- `state_db.rs` 把一个重要分工钉实了：SQLite state_db 是索引/修复层，不是 durable truth。线程列表默认仍是 filesystem-first，再由 DB repair stale path / backfill metadata；backfill 未完成时，state_db 不应被当成可靠控制面。
- `state/session.rs + context_manager/history.rs` 说明“下一轮模型实际看到什么”的主面不在 rollout 文件，而在运行时 `SessionState.history(ContextManager)`：它维护 model-visible items、token info、reference context、previous model，以及历史替换/裁剪逻辑。
- `session_prefix.rs` 说明 `<environment_context> / <turn_aborted> / <subagent_notification>` 这类 session prefix 会进入历史，但不构成真实 user-turn boundary；因此“模型可见”不等于“用户意图边界”。
- `context_manager/updates.rs` 说明环境、权限、collaboration mode、personality、model switch 都通过显式 update items 进入模型视图，而不是静默修改旧历史；而且 model-switch 指令会优先注入。
- `state/turn.rs` 说明审批、request_user_input、dynamic tool response、pending input 都只属于 active turn 协调层；它们是 runtime control objects，不应被误解成 durable history 本体。

## 2026-03-12 13:21:30
- `context_manager/normalize.rs` 说明运行时历史的第一层治理是“不变量修复”，不是“总结历史”：
  - 缺失的 `FunctionCallOutput / CustomToolCallOutput` 会被补成 `aborted`
  - orphan outputs 会被删除
  - 模型不支持图片时，图片会被替换成占位文本而不是整条消息丢弃
- `context_manager/history.rs` 说明运行时截断是有选择性的：默认只截断工具输出，不主动压缩普通 `Message / Reasoning / FunctionCall / LocalShellCall / WebSearchCall / Compaction`。
- `history_tests.rs` 进一步钉实：真实 user-turn 边界必须排除 `session_prefix`、`user_instructions`、`AGENTS/skill 注入`、`user_shell_command`、`subagent_notification`；它们虽然以 user-role 进入模型视图，但不应参与 rollback/drop-last-turn 之类的 turn 级操作。
- `history.rs + history_tests.rs` 说明 token 账本是两段式：服务器已计入的最近一次响应，与其后本地追加的 user/tool-output items 必须分开估算后再求和。

## 2026-03-12 13:30:01
- `protocol.rs` 直接把会话定性成 `SQ/EQ`（Submission Queue / Event Queue）异步协议，而不是“前台聊天请求/响应”。这进一步支持“真正真相在事件流里，不在前台自述里”。
- `protocol.rs` 里的 `OverrideTurnContext` 说明“改默认值”和“发起新一轮 turn”是两种正式操作：前者不带用户输入，只更新后续 turn 的默认上下文；后者才会携带 items 启动本轮执行。
- `TurnContextItem` 是完整运行上下文快照，而不是零散 diff：它把 `cwd / sandbox / approval / network / model / personality / collaboration_mode / effort / summary / user/developer instructions / final schema / truncation policy` 一起对象化。
- `environment_context.rs` 说明模型可见的 `<environment_context>` 不是环境全量镜像，而是 sparse diff XML。turn-to-turn 比较时忽略 shell 差异，只在 `cwd / network` 真变化时生成更新；网络也只投影允许/拒绝域名列表。

## 2026-03-12 13:35:27
- `permissions_messages.rs` 钉实：权限说明不是临时文案，而是会随着 override、resume、fork 被重放/追加的 developer-layer 对象。
- `send_message.rs` 钉实：raw item opt-in 后，模型可见前导层顺序稳定，先权限、再 developer instructions、再 AGENTS/instructions、再 environment，最后才是本轮用户输入。
- `send_message.rs` 还钉实：resume 后的 `model_switch` developer message 是 bounded injection，不应在第二个 post-resume turn 再重复新增。

## 2026-03-12 16:31:49
- `approvals.rs` 钉实：审批对象的高价值不在 yes/no，而在 `approval_id / network_approval_context / proposed_execpolicy_amendment / grant_root` 这些 policy 协商字段。
- `user_input.rs` 钉实：文本、图片、本地图片、skill 选择、mention 都是正式输入对象，富输入不应再被理解成前台字符串拼接技巧。
- `mcp.rs` 钉实：MCP 在 protocol 层的正确产品理解是统一类型适配面，不是让前台直接面对异构 wire JSON。
- `send_input.rs / resume_agent.rs` 钉实：team member 是可持续投喂、可恢复的 durable worker；`resume_agent` 还受 thread depth limit 约束。
- `locks.rs` 钉实：multi-agent 并发正确性依赖显式文件锁，Windows 也有正式 `share_mode(0) + retry` 语义，而不是“大家别撞”式软约定。

## 2026-03-12 16:35:46
- `team_message.rs / team_broadcast.rs` 钉实：团队消息面是 durable-first 语义，先落 inbox，再 best-effort live delivery；所以“发给成员”本质上是写持久收件箱并尝试即时唤醒，不是一次性 RPC。
- `team_inbox_pop.rs / team_inbox_ack.rs` 钉实：team inbox 不是临时 UI 列表，而是带 `ack_token` 的正式 cursor/ack 协议；token 绑定 `team_id + thread_id`，空 token 与非法 token 都有明确边界。
- `team_task_claim.rs / team_task_claim_next.rs` 钉实：任务 claim 受成员合法性和依赖满足条件共同约束；`claim_next` 会在“待办、依赖已满足、成员匹配”的候选里自动选下一项，而不是任意拿一个任务。
- `team_task_complete.rs` 钉实：完成态写入带独立 completion lock，completion hook 的正确语义是“并发下只触发一次”，这说明 team task board 是真正的 durable state machine。
- `wait.rs / wait_team.rs` 钉实：等待不是聊天动作，而是正式 lifecycle object；`Any/All + timeout + triggered_member + team idle hook` 都通过事件流进入轨迹。

## 2026-03-12 16:42:33
- `thread_id.rs` 钉实：`ThreadId` 是 UUIDv7 的强类型协议对象。它虽然在 TS/JSON Schema 面上表现为字符串，但语义上是可生成、可解析、可跨边界稳定传递的 opaque handle。
- `openai_models.rs` 钉实：模型目录的正确产品理解是 rich catalog object，不是模型名数组；`visibility / supported_in_api / shell_type / reasoning presets / truncation policy / context_window / auto_compact limit / input modalities / prefer_websockets / personality template` 都是一等字段。
- `rollout/metadata.rs` 钉实：state db 元数据是从 rollout 派生和回填出来的，优先读 `SessionMeta`，缺失时才从 rollout 文件名回推出 `thread_id + created_at`；dynamic tools 也会从 session meta 反向回填。
- `session_index.rs` 钉实：thread 名字解析依赖 append-only 的 `session_index.jsonl`，并按“从尾部反扫、最后一条获胜”的 append order 语义工作；它是 alias index，不是真相数据库。
- `state/service.rs` 钉实：session-scoped 服务面本身就是 harness 主体之一；auth/models/mcp/skills/exec-policy/hooks/network-approval/state-db/model-client 都属于会话服务编排层，而不是前台 prompt 的一部分。

## 2026-03-12 16:46:16
- `config_types.rs` 钉实：`SandboxMode / WindowsSandboxLevel / Personality / WebSearchMode / TrustLevel / AltScreenMode / ModeKind / CollaborationMode / CollaborationModeMask` 都是正式协议对象，不是前台 UI 说明文字。
- `config_types.rs` 还钉实：协作模式的正确理解是 preset + settings mask；mode 不只影响显示名，还直接决定像 `request_user_input` 这样的能力边界。
- `custom_prompts.rs` 钉实：custom prompt 属于 slash-command 级命令目录对象，不应被误解成 thread/turn 主控制面的一部分。
- `message_history.rs` 再次钉实：全局 history 仍只是 `conversation_id / ts / text` 的轻量日志条目，应继续和 rollout / durable history 分层。
- `app-server-protocol/v1.rs + mappers.rs` 钉实：v1 是兼容层和前台便利壳，保留 `conversation` 命名、saved config/profile、one-off command 等旧式前台对象；真正真相仍在 v2/core protocol，对接靠显式 mapper。

## 2026-03-12 16:50:32
- `account.rs` 钉实：`PlanType` 目前在 protocol 层只是 entitlement/capability 等级枚举，不应被误看成复杂账户控制面。
- `parse_command.rs` 钉实：底层命令解释不会追求 shell 全语义建模，而是收成 `Read / ListFiles / Search / Unknown` 这类少量稳定类别，供审批和 UI 做可解释展示。
- `models.rs` 钉实：真正的响应对象中心在 `ResponseItem`，它统一承载 `Message / Reasoning / LocalShellCall / FunctionCall / FunctionCallOutput / CustomToolCall / WebSearchCall / GhostSnapshot / Compaction`，说明“模型输出”本身就是多对象流。
- `models.rs` 还钉实：permissions、sandbox、collaboration mode、model switch 不该由前台临场拼文案，而是通过 `DeveloperInstructions` 等 developer-layer 对象进入模型视图。
- `num_format.rs` 钉实：数值格式化是展示层 concern，不参与 durable truth；token/数字的“好读”与“真实对象层”应继续分开。

## 2026-03-12 16:56:45
- `request_user_input.rs` 钉实：人类补输入是正式协议对象，不是普通聊天插话。对象级字段至少包括 `questions/options/isOther/isSecret/answers/call_id/turn_id`。
- `common.rs` 钉实：app-server common 层的正确理解是“方法目录 + schema 导出 + 版本边界 + experimental gating”，而不是业务逻辑承载层。
- `common.rs` 还钉实：v2 request/notification 目录与一段显式 `DEPRECATED` 的 v1 兼容区并存，说明兼容层不该再被误认成真相层。
- `thread_history.rs` 钉实：rich thread history 是由 rollout/event 重建出来的视图，而不是 raw transcript 回放。
- `thread_history.rs` 还钉实：late `ExecCommandEnd / TurnComplete / TurnAborted` 会优先按 `turn_id` 回挂原 turn；`rollback failed` 和 out-of-turn error 不应污染正确 turn 状态。

## 2026-03-12 17:00:51
- `approvals.rs` 钉实：审批对象的真正价值在 policy negotiation 字段，不在 accept/decline 二元结果本身。
- `approvals.rs` 还钉实：命令审批和补丁审批都带正式治理字段，如 `approval_id / network_approval_context / proposed_execpolicy_amendment / grant_root / parsed_cmd`，说明审批是控制面协商，不是前台弹窗。
- `mcp.rs` 钉实：MCP 在 protocol 层的正确产品理解是“统一类型适配面”，不是把原始异构 wire JSON 直接暴露给前台。
- `mcp.rs` 还钉实：`Tool / Resource / ResourceTemplate / CallToolResult` 都是为了 TS/JsonSchema 友好和跨 crate 复用而设计的稳定对象。
- `dynamic_tools.rs` 钉实：动态工具是 thread/turn 绑定的最小协议对象集，不是无限热插拔能力总线；输出面也刻意收成少量稳定内容项。

## 2026-03-12 17:12:25
- `user_input.rs` 钉实：`UserInput` 是富输入协议对象，不只是单字符串；`Text / Image / LocalImage / Skill / Mention` 都是一等输入类型。
- `user_input.rs` 还钉实：`TextElement` 的 byte-range + placeholder 语义说明 rich marker 应依附原始 UTF-8 文本缓冲区持久化和恢复，而不是通过改写用户字面文本来保结构。
- `inbox.rs` 钉实：team inbox 的真正底座是 append-only JSONL + cursor.json + exclusive file lock；`TeamInboxEntry / AckToken / Cursor` 共同构成 durable 收件协议。
- `spawn.rs` 钉实：spawn 的高价值不在“再开一个 agent”，而在深度限制、可选 worktree 租约、spawn begin/end 事件、hook 注入、失败回滚这些正式生命周期控制。
- `spawn.rs` 还钉实：subagent_start hook 注入和 `send_spawn_input` 都是 spawn lifecycle 的正式组成部分，不应再被理解成额外小技巧。

## 2026-03-12 17:17:26
- `resume_agent.rs` 钉实：`resume_agent` 不是 casual reopen，而是 rollout-backed recovery；它先查当前状态，只有 `AgentStatus::NotFound` 才走 `resume_agent_from_rollout`，并同时受 `thread_spawn_depth_limit` 与 `AgentLimitReached -> reap_finished_agents_for_slots -> retry` 约束。
- `send_input.rs` 与 `multi_agents.rs` 钉实：`send_input` 不是简单 message forward，而是受治理的成员交互面；`interrupt=true` 会先打断目标，再通过 `CollabAgentInteractionBegin/End` 包裹一次正式输入投递。
- `team_ask_lead.rs` 钉实：向 lead 升级不是 ephemeral chat，而是 durable-first escalation；只有非 lead 且属于 team 的成员能发起，系统会先 append lead inbox，再做 best-effort live delivery。
- `team_ask_lead.rs` 还钉实：返回值同时暴露 durable truth 与 live truth：`inbox_entry_id` 说明持久消息已存在，`delivered/submission_id/error` 说明本次即时交付是否成功。
- `parse_collab_input / input_preview` 钉实：team 协作输入必须是 `message` 与 `items` 二选一且不能为空；preview 会把 `text / image / local_image / skill / mention` 统一规范化，说明协作输入是对象流，不是裸聊天字符串。

## 2026-03-12 17:25:06
- `AgentControl` 钉实：它是 per-session multi-agent control plane，不是 per-thread helper；`Guards` 让 spawn depth、slot 数和 agent nickname 统一绑定到同一用户会话治理。
- `spawn_agent_thread / spawn_agent / send_spawn_input` 钉实：子代理启动是 reserve -> create thread -> send input -> optional completion watcher 的正式生命周期，不是“顺手多开一个 thread”。
- `resume_agent_from_rollout` 钉实：resume 会走 rollout 路径查找，并尽量从 state_db 元数据恢复 `agent_nickname / agent_role / source`，然后重新挂 watcher；所以 resume 本质是带源信息重水化，不是 reopen。
- `maybe_start_completion_watcher` 钉实：子代理终态会通过 `format_subagent_notification_message()` 回灌父线程；这是一条正式的 completion notification 回路，但不应被误认成真实 user-turn 边界。
- `ModelClient` / `ModelClientSession` 钉实：客户端本身是 session-scoped + turn-scoped 双层；WebSocket sticky routing 依赖 `x-codex-turn-state`，subagent 来源则通过 `x-openai-subagent` 请求头显式上送。
- `thread/status/changed` 钉实：thread 运行状态是正式 runtime surface，且客户端可以按连接 opt-out；说明“是否订阅状态通知”也是协议级边界，而不是固定 UI 行为。

## 2026-03-12 17:29:57
- `ModelClientSession::build_responses_options` 钉实：provider 请求层会同时携带 `conversation_id / session_source / turn_state / turn_metadata_header`；因此 thread/source/sticky routing 都是 transport truth，不该靠前台文案解释。
- `client.rs` 钉实：websocket prewarm 只是握手预热，真正 turn 仍由后续显式 `response.create` 启动；而 websocket fallback 一旦激活，会以 session-scoped 方式影响本会话后续 turns。
- `initialize.rs` 钉实：`clientInfo.name` 会进入 `user_agent/originator`，而且必须是合法 HTTP header 值；非法值会在握手层直接拒绝，不会拖到 turn 阶段再报错。
- `turn_start.rs` 钉实：`turn_start` 会把 `originator` 头真实带给 provider；rich input 的 `text_elements` 也会原样进入 `ThreadItem::UserMessage`，说明 client identity 与 rich input 都是协议真相。
- `thread_status.rs` 钉实：`thread/status/changed` 和 `thread/started` 都支持按连接 opt-out，因此通知扇出是 connection-scoped capability，而不是所有前台都必须消费同一完整通知流。

## 2026-03-12 17:34:18
- `turn_start.rs` 钉实：`collaboration_mode` 不是普通并列字段，而是高阶 preset；它会压过同轮 `model / effort` override，并把 mode 绑定的 developer instructions 一并注入请求。
- `turn_start.rs` 还钉实：`personality` override 只在发生变化时才追加新的 `<personality_spec>` developer-layer 注入，说明 override 的正确语义是“更新后续默认层”，不是每轮重放提示词。
- `turn_steer.rs` 钉实：`turn_steer` 是 active-turn control，不是补发一句用户话；只有命中当前活 turn 且 `expected_turn_id` 匹配时才成立。
- `client.rs` 钉实：增量请求的 baseline 不是只看上一轮原始输入，而是 `previous_request.input + server-added items`；只有非 input 字段完全一致且新输入严格扩展 baseline 时，才允许 append。
- `client.rs` 还钉实：websocket v2 倾向 `response.create(previous_response_id=...)`，旧路径才走 `response.append`；两者都受 `can_append` 和 baseline 校验共同约束，因此“连续同一 turn”本质是 transport continuity，不是 prompt 连续体。

## 2026-03-12 17:34:12
- `config_rpc.rs` 钉实：`config/read` 的真相面不是单一 effective value，而是 `effective config + origins + ordered layers`；因此配置控制面天然是可追溯、可分层解释的对象系统。
- `config_rpc.rs` 还钉实：managed/user/system/project 不是平铺配置源；project layer 会按 `cwd + trust level` 动态加入，而 `expected_version` 与 `configVersionConflict` 则说明配置写入是 versioned write，不是盲覆盖。
- `config_batch_write` 钉实：多字段修改是正式批处理对象，不需要依赖前台逐项改配置；这继续支持“控制面对象优先，不靠手工文案引导”。
- `model_list.rs` 钉实：模型目录是 rich catalog + pagination surface，支持 `limit/cursor/include_hidden`；非法 cursor 会正式报错，说明 model catalog 不是前台 convenience list，而是正式查询面。
- `account.rs` 钉实：账号面真正值钱的是 `auth state + account metadata + refresh workflow`；外部模式下 `refresh_token=true` 不会私自发 refresh request，而 401 才会触发正式 `account/chatgptAuthTokens/refresh` 回路并重试。

## 2026-03-12 17:41:57
- `locks.rs` 钉实：durable team inbox/task/workflow 的并发底座不是“逻辑 token 自觉遵守”，而是跨平台 OS 文件锁；Windows 分支用 `share_mode(0)` 独占打开，遇到 `ERROR_SHARING_VIOLATION / ERROR_LOCK_VIOLATION` 会 50ms 阻塞重试。
- `windows_sandbox_setup.rs` 钉实：`windowsSandbox/setupStart` 不是 UI 按钮动作，而是正式 RPC；`windowsSandbox/setupCompleted` completion notification 才是 setup 完成真相面。
- `rollout/list.rs` 钉实：thread 列表面默认是 `summary-first`，并带 `MAX_SCAN_FILES`、cursor、created/updated sort 和 head/user-event scan cap；说明线程发现面是正式受限扫描器，不是无限遍历。
- `rollout/tests.rs` 钉实：state db 中 rollout path 陈旧或缺行时，系统会回退到文件系统 rollout 路径并修复 state db；因此 state db 继续只是 derived index，不是 durable truth。
- `protocol/src/prompts/base_instructions/default.md` 与 `permissions/**.md` 钉实：默认前导与权限文案只是把 control-plane state 渲染成文本壳；approval policy 和 sandbox mode 的真相仍然在协议对象/配置层，不在模板文本本身。

## 2026-03-13 12:27:42
- `event_mapping.rs` 钉实：真实 user-turn 不是 role=`user` 的机械切片；`user instructions / skill instructions / session_prefix / user shell command` 都会被排除在 turn 边界之外，图片标签则会被正规化成 `UserInput::Image`。
- `event_mapping.rs` 还钉实：只有 `UserMessage / AgentMessage / Reasoning / WebSearch` 这几类对象会被提升成 `TurnItem`；其他 raw `ResponseItem` 不会自动升格成 turn-level 真相。
- `context_manager/mod.rs` 钉实：真正高价值的 runtime projection 导出面是 `ContextManager / TotalTokenUsageBreakdown / estimate_response_item_model_visible_bytes / is_codex_generated_item / is_user_turn_boundary`，说明模型可见投影高于 raw transcript。
- `state/mod.rs` 钉实：会话状态被正式拆成 `SessionServices / SessionState / ActiveTurn / RunningTask / TaskKind`；state 分层是 harness 设计的一部分，不是代码组织巧合。
- `protocol/lib.rs` 钉实：正式协议对象目录包括 `account / approvals / config_types / custom_prompts / dynamic_tools / items / mcp / models / plan_tool / request_user_input / user_input`；对象中心高于前台人格中心。

## 2026-03-12 17:46:10
- `rollout/policy.rs` 钉实：durable rollout 不是原样保存所有事件；`ResponseItem` 只保留少量稳定对象，`EventMsg` 只按 `Limited/Extended` 分级持久化，且 `ItemCompleted` 里只有 `Plan` 会进入 limited replay。
- `rollout/policy.rs` 还钉实：memory 持久化过滤器与 rollout 过滤器不同；developer message、reasoning、ghost snapshot、compaction 不会默认进入 memories，说明 durable history 与长期记忆必须分层。
- `rollout/truncation.rs` 钉实：rollout 截断以真实 user-turn 为语义边界，并显式应用 `ThreadRolledBack` marker，同时忽略 `session_prefix`；raw stream 不能直接拿来当有效历史。
- `multi_agents/tests.rs` 钉实：spawn/resume 配置会继承 turn 级运行时上下文，但会强制把 approval policy 收成 `Never`；resume 配置还会清掉 caller `base_instructions`，说明子代理不是“前台人格克隆体”。
- `agent_teams.rs` 钉实：team/worktree 的 durable workflow 收口依赖真实资源回收；cleanup 会删除 team config、task dir、worktree，并且 task claim/complete 在并发下只允许单次成功。

## 2026-03-13 12:36:16
- `state/session.rs` 钉实：`SessionState` 的高价值不只是保存 `ContextManager`，而是把 `previous_model`、rate limits、dependency env、MCP/connector selection、startup regular task、reference context item 都作为 session 级控制对象收拢到一起。
- `state/turn.rs` 钉实：`ActiveTurn/TurnState` 是与 durable history 明确分层的 active-turn 协调面；审批、人类补输入、动态工具回包、临时 pending input 都停在 turn 内存态，不该混写进 rollout 真相层。
- `rollout/error.rs` 钉实：session storage 权限错误、目录缺失、路径类型异常、数据损坏都被映射成 operator-facing fatal error 与可执行修复提示；这说明 rollout/session storage 是平台依赖，不是可忽略的实现细节。

## 2026-03-13 12:39:40
- `state/service.rs` 钉实：`SessionServices` 是 session-scoped service graph，不是外围杂项；`auth/models/MCP/skills/exec policy/hooks/network approval/state_db/model_client` 都被正式并入同一会话级服务层。
- `plan_tool.rs` 钉实：`update_plan` 的语义被有意收成 checklist protocol，只有 `Pending / InProgress / Completed` 三态与结构化 `step`，说明计划对象属于可治理工单层，不是开放式自由文本规划器。
- `account.rs` 钉实：`PlanType` 只是 entitlement taxonomy（Free/Go/Plus/Pro/Team/Business/Enterprise/Edu），用于账户能力分层，不应被误读成执行模式或 thread/turn 控制对象。

## 2026-03-13 12:42:45（supplemental：rollout recorder 物化生命周期 / command-directory extension layer）
- `rollout/mod.rs` 钉实：rollout 模块的正式职责是 `persistence + discovery of session rollout files`，并明确区分 `sessions / archived_sessions / interactive session sources`，说明 rollout 从一开始就是 durable artifact layer，不是普通聊天日志目录。
- `rollout/recorder.rs` 钉实：fresh session 只预计算 path/meta，真正 rollout 文件 materialization 要等显式 `persist()`；`record_items` 只是排队可持久化对象，不等于已落盘。
- `rollout/recorder.rs` 还钉实：`persist / flush / shutdown` 是 rollout writer 的一等生命周期动作；没有 `persist()`，即使缓冲了 user-message-like items 也不会自动创建 rollout 文件。
- `rollout/recorder.rs` 继续支持：thread 发现面保持 filesystem-first，再通过 `read_repair_rollout_path / reconcile_rollout / apply_rollout_items` 对账回 `state_db`；因此 rollout 仍是真相源，`state_db` 仍是 derived/reconciled index。
- `custom_prompts.rs` 钉实：custom prompts 继续只是 slash-command/命令目录扩展层（`prompts:<name>`），不属于 thread/turn 主控制面。

## 2026-03-13 12:48:48（supplemental：settings diff 注入顺序 / state_db 派生索引治理）
- `context_manager/updates.rs` 钉实：设置更新不是整包重放，而是按优先级注入差分对象，固定顺序为 `model switch -> environment diff -> permissions -> collaboration mode -> personality`；这说明 developer-layer update 是对象流，不是重写旧 prompt。
- `context_manager/updates.rs` 还钉实：`EnvironmentContext` 只在与上一轮相比发生有效 diff 时才生成 update item，且比较时忽略 shell 差异；runtime projection 继续是 sparse diff，而不是环境全量镜像重放。
- `state_db.rs` 钉实：`state_db` 的正式语义不是“普通缓存”，而是带 `feature gate + backfill complete gate + list/query + reconcile + read-repair + incremental apply` 的派生索引治理层。
- `state_db.rs` 继续支持：即使 `state_db` 可以承担 backfill、repair 和加速查询，rollout 文件系统仍是真相源；`state_db` 只是 derived/reconciled index，不应被误当成 durable truth。

## 2026-03-13 12:50:41（supplemental：agent role 配置层 / event-derived status）
- `agent/role.rs` 钉实：agent role 的正确理解不是人格标签，而是正式配置层；`apply_role_to_config()` 会把 role config 解析并作为 `ConfigLayerSource::SessionFlags` 插入 `config_layer_stack`，同时保留未指定键。
- `agent/role.rs` 还钉实：built-in role catalog 当前只有 `default / explorer / worker`；`explorer` 和 `worker` 主要通过描述文本定义使用边界，而不是先天绑定沉重 preset。
- `builtins/explorer.toml` 当前为空，说明内建 `explorer` 现在更像声明性治理角色，而不是已经装满具体配置的执行 profile。
- `agent/status.rs` 钉实：agent status 是事件派生对象，不是前台自述；`TurnStarted / TurnComplete / TurnAborted / Error / ShutdownComplete` 才是状态演进真相面。

## 2026-03-13 12:54:23（supplemental：plan block parser / turn diff truth / hierarchical project docs / turn metadata / request_user_input gate）
- `proposed_plan_parser.rs` 钉实：plan 不是“看起来像计划”的自然语言段落，而是显式 `<proposed_plan>...</proposed_plan>` 标签块；解析器本身是 line-based streaming parser，`finish()` 还会为未终止块补 `ProposedPlanEnd`，所以 plan item 真相优先看标记协议，不看自由文本猜测。
- `turn_diff_tracker.rs` 钉实：turn 级文件改动真相不是 patch 文案回放，而是“首次触达时建立 baseline snapshot + 稳定内部 UUID 文件名 + 当前磁盘状态重算 unified diff”；rename 跟踪是对象级的，不是纯路径字符串级的。
- `turn_diff_tracker.rs` 还钉实：新增文件故意不建旧 baseline，删除/二进制/符号链接都走独立分支；git root 发现与 repo-relative path 显示属于 diff 真相的一部分，不是 UI 便利层。
- `project_doc.rs` 钉实：project docs 不是“读一个本地 AGENTS.md”，而是从 git root 到 cwd 的层级发现管线；`AGENTS.override.md` 优先于 `AGENTS.md`，并受 `project_doc_max_bytes`、fallback filename、skills/js_repl/child-agents 附加 instruction layer 共同治理。
- `turn_metadata.rs` 钉实：`TurnMetadataState` 通过 header 上送 `turn_id + sandbox tag + repo_root/workspace git metadata`；base header 先出，git enrichment 再后台异步增强，说明 turn metadata 也是对象化控制面，不是聊天注释。
- `tools/handlers/request_user_input.rs` 钉实：`request_user_input` 的 core gate 在 collaboration mode；每题必须有非空 options，且 handler 会强制补 `is_other=true`，取消时返回正式错误对象，而不是前台自由问答兜底。

## 2026-03-13 13:02:11（supplemental：compaction / MCP tool catalog / network decision / session prefix / review target / web search display）
- `compact.rs` 钉实：compaction 本身也是正式 turn/item lifecycle，并显式区分 `BeforeLastUserMessage` 与 `DoNotInject` 两种 initial-context reinjection 策略；pre-turn/manual compaction 不注入初始上下文，mid-turn compaction 才会把初始上下文插到最后真实 user 前。
- `compact.rs` 还钉实：compaction 请求会先剥离 trailing `<model_switch>` developer message，成功后再重新挂回；`ContextWindowExceeded` 会触发“移除最旧历史项后重试”，而 compact payload 无效或其他 fatal 错误则会正式 stop，不会偷偷降级继续。
- `mcp_connection_manager.rs` 钉实：MCP 连接管理器的高价值不只是“连上 server”，而是按 server 聚合工具目录，并把 fully-qualified tool name 规范化成 Responses API 允许的稳定名字；startup/status/elicitation 也都进入正式事件与审批回路。
- `network_policy_decision.rs` 钉实：network policy 决策是结构化对象；只有 `Ask + Decider` 才会提升成 `NetworkApprovalContext`，deny 也会从 machine reason code 生成受控的人类可读阻断解释。
- `session_prefix.rs` 钉实：`<environment_context> / <turn_aborted> / <subagent_notification>` 都是 model-visible session prefix；它们虽然以 user-role 进入模型视图，但不应形成真实 user-turn boundary。
- `review_prompts.rs` 与 `review_format.rs` 钉实：review target 不是自由 prompt，而是 target-resolved request（`uncommitted / base branch(merge-base) / commit / custom`）加 UI-agnostic findings formatter；`web_search.rs` 的 detail helper 只属于展示层摘要，不是 durable search truth。

## 2026-03-13 13:08:54（supplemental：command canonicalization / mentions / user_shell_command / provider catalog / connectors / exec policy）
- `command_canonicalization.rs` 钉实：approval cache 不是拿原始 argv 直接匹配，而是先 canonicalize；普通 `bash -lc` 单命令会还原成内层 argv，复杂 heredoc 与 PowerShell wrapper 会落成稳定 script key，避免包装器路径差异击穿审批缓存。
- `mentions.rs` 钉实：mention 收集不是字符串启发式，而是把 linked text mention、structured mention、app path/skill path 分层归并成对象；显式 connector/app 引用会被收成 app id 集合，而不是裸文本标签。
- `user_shell_command.rs` 钉实：用户 shell 记录会被包装成 model-visible 的 `<user_shell_command>` user-role 对象，包含命令、退出码、时长与聚合输出；它属于运行态记录层，不应被误认成真实用户意图。
- `model_provider_info.rs` 钉实：`ModelProviderInfo` 是 rich provider object，不是“模型名 + base_url”小配置；`wire_api / auth mode / headers / query params / retries / stream idle timeout / websocket support` 都是 provider 语义本体。
- `connectors.rs` 钉实：connectors 面不是 raw MCP 工具列表，而是 feature-gated、按 `chatgpt_base_url + account/user identity` keyed 的 accessible-connectors 目录缓存；`codex_apps_ready / force_refetch / TTL` 都属于目录治理层。
- `exec_policy.rs` 钉实：`ExecPolicyManager` 是正式 policy layer；它组合规则文件、safe/danger heuristics、approval policy、sandbox policy 与 prefix-rule amendment，approval/forbidden 结论来自策略求值，不是前台人格临场判断。

## 2026-03-13 13:10:07（supplemental：auth / api bridge / realtime / MCP pipeline / memory ETL / network proxy）
- `auth.rs` 钉实：auth 不只是凭据存取，而是正式控制面对象层；`AuthMode / CodexAuth / ExternalAuthRefreshContext` 明确区分 API key、ChatGPT 登录态和外部 token 刷新上下文。
- `auth/storage.rs` 钉实：auth 持久化本身也有治理语义，明确分成 `file / keyring / auto / ephemeral` 四种模式；`auto` 会在 keyring 失败时回落到文件存储，并通过 `codex_home` 派生稳定 store key。
- `api_bridge.rs` 钉实：API-facing 错误不是自由文本，而是精确 runtime category；context window、quota、usage-not-included、retry-limit、server overload、invalid-image 都会被映射成正式 `CodexErr`，并保留 `request id / cf-ray / active limit` 这类追踪元数据。
- `realtime_conversation.rs` 钉实：realtime conversation 是独立 runtime subsystem，不是 thread/turn 的聊天变种；它有自己的输入队列、`start/audio_in/text_in/shutdown` 生命周期，以及 started/closed/realtime event fanout。
- `mcp_tool_call.rs` 钉实：MCP tool call 是正式的审计化流水线：`parse args -> begin event -> optional approval -> call -> sanitize -> end event -> analytics`；模型不支持图片输入时，MCP 图片结果会被主动降格成文本占位。
- `memory_trace.rs` 钉实：trace-to-memory 不是“从日志随便记点笔记”，而是标准化 ETL 流程：先加载和解码 trace，再做 payload 归一化与允许项过滤，最后才调用模型生成 memory summary。
- `network_proxy_loader.rs` 钉实：网络代理状态来自分层配置与 trusted constraints，不是平铺读一个配置文件；user/project/session 层不会反向抬高 trusted constraints，且整体带 mtime-based reload。
- `codex.rs` 钉实：Session control plane 是真正的汇聚层；`RealtimeConversationManager / SessionServices / RolloutRecorder / MCP manager / memories / network proxy / TurnMetadataState` 都在这里正式拼接成一条会话级运行面。

## 2026-03-13 13:16:25（supplemental：model presets / network approval / MCP auth / skill metadata / plan handler）
- `models_manager/model_info.rs` 钉实：runtime model descriptor 与 picker preset 不是一层；unknown slug 仍会生成带 `context_window/truncation_policy/input_modalities` 的 fallback `ModelInfo`，而 config override 可继续覆盖 `context_window/auto_compact/tool_output_limit/base_instructions`。
- `models_manager/model_presets.rs` 钉实：preset 只是 entitlement/picker catalog，不是 runtime truth；`is_default/show_in_picker/upgrade/supports_personality/default_reasoning_effort` 都属于选择层元数据。
- `tools/network_approval.rs` 钉实：网络授权已经是正式 approval service，不是前台一次性确认框；它区分 `Immediate/Deferred`、按 `host+protocol+port` 去重、支持 `AllowOnce/AllowForSession/Deny`，并维护会话级 `session_approved_hosts` 缓存。
- `config/network_proxy_spec.rs` 钉实：网络代理 builder 会受 sandbox policy 直接约束；在 `ReadOnly/WorkspaceWrite` 下启用 approval flow 时，allowlist miss 会被提升成 `NetworkDecision::ask("not_allowed")`，而不是直接硬拒绝。
- `tools/handlers/plan.rs` 钉实：`update_plan` 真正有价值的是结构化输入和 `EventMsg::PlanUpdate`；tool 输出文本本身几乎无价值，而且该工具在 `Plan` mode 下被显式禁用，说明 plan item 更像客户端可渲染治理对象，而不是模型自用推理链。
- `mcp/auth.rs` 钉实：MCP auth 是目录化状态面；只有 `StreamableHttp` 且未绑定 bearer env var 时才探测 OAuth 登录支持，最终按 server 产出 `McpAuthStatusEntry` 目录，而不是前台临时猜测是否能登录。
- `skills/model.rs` 钉实：skill 目录继续对象化；`SkillMetadata` 除描述外还包含 `interface/dependencies/policy/permissions/scope`，并通过 disabled path 与 `allow_implicit_invocation` 共同决定哪些 skill 能被默认隐式触发。
- `function_tool.rs` 钉实：function tool 错误面被有意压成极少数稳定类别：`RespondToModel / MissingLocalShellCallId / Fatal`，说明 tool failure surface 本身就是受治理的协议语义，不该退化成自由异常文本。

## 2026-03-13 13:19:52（supplemental：task runner / detached review / BM25 tool discovery / network approval lifecycle）
- `tasks/compact.rs` 钉实：compact task 更像 task runner 壳，不是核心语义本体；它会按 provider 选择 `local compact` 或 `remote compact` 路径，并把 compact 作为正式 `TaskKind::Compact` lifecycle 上报。
- `tasks/review.rs` 钉实：review 是 detached reviewer workflow，不是前台顺手“再看一眼”；它会启动带 `REVIEW_PROMPT`、禁用 web/collab、`approval_policy=Never` 的 sub-codex one-shot 线程，再把 `ReviewOutputEvent` 结构化回灌并显式 `ExitedReviewMode`。
- `search_tool_bm25.rs` 钉实：tool discovery 不应等于全量工具暴露，而应先变成目录化搜索面；它按 `name/title/description/connector/input_keys` 建 BM25 索引，再把命中的工具并回当前 MCP selection。
- `tools/network_approval.rs` 钉实：network approval 已经是 formal service，不是临时确认框；它区分 `Immediate/Deferred`，按 `host+protocol+port` 去重，维护 pending approval 与 `session_approved_hosts`，并把策略拒绝与用户拒绝记录成不同 outcome。

## 2026-03-13 13:28:43（supplemental：tool assembly / router / registry / skills injection / config service / orchestrator）
- `tools/spec.rs` 钉实：工具面本身是 capability-gated assembly，不是 prompt 文案层；`ToolsConfig` 由 `model_info + feature flags + web_search_mode` 派生，shell/apply_patch/search/js_repl/collab 都属于目录装配结果。
- `tools/router.rs` 钉实：模型输出不会直接“调用工具”，而是先被路由层整形成 `ToolCall{tool_name,call_id,payload}`；`Function/Custom/LocalShell/MCP` 是不同 payload 家族，`js_repl_tools_only` 还能显式禁止 direct tool call。
- `tools/registry.rs` 钉实：tool 执行真相在 registry/hook/gate/object 流水线里，最小稳定顺序是 `handler kind match -> mutating gate -> pre-tool hook -> handle -> post-tool/post-failure hook -> response item`。
- `skills/injection.rs` 钉实：skill 注入不是单纯拼 prompt 文本；skills 会变成正式 `ResponseItem`，还能从 frontmatter 解析 skill-scoped hooks，并把注入行为写入 analytics。
- `skills/manager.rs` 钉实：skills 真相在分层目录加载与 per-cwd cache；它结合 config layer stack、agents roots、extra user roots 与 disabled paths 产出 `SkillLoadOutcome`，说明 skill 面是 catalog+cache，不是前台清单。
- `config/service.rs` 钉实：config service 是正式 control plane，不是“改 config.toml 的小脚本”；`read` 返回 `effective + origins + ordered layers`，`write/batch_write` 是限定路径的 versioned write，并对只读层和路径不匹配抛正式错误。
- `config/profile.rs` 钉实：profile 只是常用配置包聚合层，不是 runtime model truth，也不是 thread/turn 控制对象本体。
- `tools/orchestrator.rs` 钉实：approval、sandbox selection、network approval、retry/escalation 都在统一执行编排层里；真正值钱的是正式的“批准-尝试-升级”语义，不是前台人格决定要不要重试。

## 2026-03-13 13:33:51（supplemental：memories pipeline / tool events / sandbox substrate / MCP skill dependency install）
- `memories/start.rs`、`phase1.rs`、`phase2.rs` 钉实：memory 不是单次摘要，而是正式两阶段流水线；只有非 ephemeral、非 subagent、启用 `MemoryTool` 且存在 `state_db` 时才启动，先做 stage-1 rollout 抽取，再跑全局 consolidation agent。
- `memories/storage.rs` 钉实：memory artifact 也是分层派生面；`raw_memories.md` 是 stage-1 合并视图，`rollout_summaries/*.md` 是 thread 级摘要工件，无记忆时还会主动清理 `MEMORY.md / memory_summary.md / skills/`。
- `memories/prompts.rs` 钉实：memory prompt 受 token budget 约束；stage-1 输入会按 active model 的有效上下文窗口截断 rollout 内容，而 memory tool developer instructions 只读 `memory_summary.md` 的受限摘要。
- `memories/usage.rs` 钉实：memory 使用面也是正式观测层；只有安全 command 才会被 parse，并按 `MEMORY.md / memory_summary.md / raw_memories.md / rollout_summaries / memories/skills` 分类打点。
- `tools/context.rs` 与 `tools/events.rs` 钉实：tool runtime 真相继续在对象/事件层；`ToolInvocation/ToolPayload/ToolOutput` 是最小稳定对象，而 `ExecCommandBegin/End`、`PatchApplyBegin/End`、`TurnDiffEvent` 才是 durable event surface。
- `tools/parallel.rs` 钉实：并行是 capability-gated，不是默认全开；支持并行的工具走读锁，其余走写锁串行，abort 也会被编码成不同 payload 族的正式输出对象。
- `tools/sandboxing.rs` 钉实：审批/沙箱是共享策略层；`ApprovalStore` 用序列化 key 做会话级缓存，`ExecApprovalRequirement` 明确区分 `Skip/NeedsApproval/Forbidden`，默认 approval requirement 由 `approval_policy + sandbox_policy` 共同决定。
- `config/permissions.rs` 钉实：网络权限不是单个布尔开关，而是 `PermissionsToml.NetworkToml -> NetworkProxyConfig` 的对象化映射层。
- `mcp/skill_dependencies.rs` 钉实：skills 的 MCP 依赖安装不是 prompt 技巧，而是 gated workflow；非一方客户端不启用、full access 可自动装，否则走 `request_user_input` 结构化提问、配置持久化和 OAuth 登录。

## 2026-03-13 13:41:42（supplemental：core tool handlers / unified exec / windows sandbox setup）
- `tools/handlers/apply_patch.rs` 钉实：`apply_patch` 不是“让模型输出一段 diff 文本再交给 shell 执行”，而是 grammar-verified patch 对象流。命中 apply_patch 语法时，会先走 `codex_apply_patch::maybe_parse_apply_patch_verified()`，再进入专用 patch runtime/orchestrator；只有必要时才委派到底层 exec。
- `apply_patch.rs` 还钉实：patch approval key 不是随便拼文件名，而是从 patch action 里解析出的绝对路径集合，连 move destination 也会进入 approval key；因此 patch 审批也是对象层治理，不是命令文本治理。
- `read_file.rs` 钉实：文件读取面被故意收成“绝对路径 + offset/limit + slice/indentation mode”这类稳定参数；`Indentation` 模式还会做 header/sibling/max_levels 控制，说明高价值 harness 默认偏向透明代码阅读，而不是 semantic black box。
- `list_dir.rs` 钉实：目录枚举不是无限遍历，而是 `absolute path + offset + limit + depth` 的 BFS 派生视图；结果是排序后的 display tree，并会显式返回 `More than N entries found`，所以列表面是受限 discoverability，不是原始 filesystem dump。
- `grep_files.rs` 钉实：默认检索面继续优先透明 `rg --files-with-matches`；它刻意返回“文件列表”而不是上下文片段，并带 `path/include/limit/timeout` 边界。这继续支持“agentic search 优先于重 semantic search”的主线。
- `shell.rs` 钉实：`shell` 与 `shell_command` 的高价值在统一执行治理，而不是多开一个命令别名。两者都会：
  - 解析到 `ExecParams`
  - 做 known-safe mutating 判断
  - 走 `exec_policy.create_exec_approval_requirement_for_command()`
  - 走统一 `ToolOrchestrator`
  - 在命中 patch 语法时优先拦截到 `apply_patch`
- `unified_exec.rs` 钉实：统一执行不是“更快的 shell”，而是正式进程生命周期面：
  - `allocate_process_id`
  - `exec_command`
  - `write_stdin`
  - `refresh_process_state`
  - `store_process`
  - `spawn_exit_watcher`
  - `prune_processes_if_needed`
  这说明 process lifecycle 本身就是 harness 一等对象。
- `unified_exec/process_manager.rs` 继续钉实：长命令的真相不在前台消息，而在 `reserved ids + process store + deferred network approval cleanup + output streaming + watcher completion + LRU prune`。
- `view_image.rs` 钉实：图片查看能力也不是前台人格声称“我看到了图片”，而是 capability-gated input injection。只有模型支持 `InputModality::Image` 时，才会通过 `local_image_content_items_with_label_number()` 注入正式 `ResponseInputItem::Message`。
- `dynamic.rs` 钉实：动态工具 handler 的真相是 turn 级 request-response 桥：
  - 先在 active turn state 里登记 pending dynamic tool
  - 发送 `DynamicToolCallRequest`
  - 等待 oneshot 回灌 `DynamicToolResponse`
  所以动态工具仍然是受 turn 生命周期治理的 scoped registry，不是全局热插拔总线。
- `windows_sandbox.rs` 钉实：Windows sandbox setup 不是 feature flag，而是正式控制动作：
  - `resolve_windows_sandbox_mode()`
  - `sandbox_setup_is_complete()`
  - `run_elevated_setup / run_legacy_setup_preflight / run_setup_refresh_with_extra_read_roots`
  - `run_windows_sandbox_setup_and_persist()`
  - 成败 metrics
  - `ConfigEditsBuilder::set_windows_sandbox_mode()`
  这说明 setup/preflight/refresh/persist 都属于 durable control-plane lifecycle。

## 2026-03-13 13:49:31（supplemental：runtimes / hooks executor / js_repl）
- `tools/runtimes/mod.rs` 钉实：runtime 层不是第二套 orchestrator，而是小而聚焦的执行适配层；真正的 approval/sandbox/retry 语义仍留在上层统一编排。
- `tools/runtimes/apply_patch.rs` 钉实：apply-patch runtime 假设验证和审批已在上游完成，只复用 cached approval，构造最小环境的 `CommandSpec`，再以 `--codex-run-as-apply-patch` 自调用方式执行。这继续支持“patch 真相在 object/runtime，不在 shell wrapper 文本”。
- `tools/runtimes/shell.rs` 钉实：shell runtime 的高价值在 approval key 规范化、PowerShell UTF-8 前缀和 snapshot wrapper 注入；网络审批模式是 `Immediate`，说明 one-shot command 会把联网判决前置到运行前。
- `tools/runtimes/unified_exec.rs` 钉实：unified exec runtime 与 shell runtime 的关键差异是 lifecycle，不是 argv 形式；它返回 `UnifiedExecProcess`，网络审批走 `Deferred`，最终由 process manager 接管长进程会话。
- `hooks_executor.rs` 钉实：non-command hooks 已被正式拆成两条路径：`prompt hook` 走 JSON-schema 模型判决，`agent hook` 走 `approval_policy=Never` 的 one-shot agent，并从 rollout 取最后 assistant/compacted 内容解析 JSON；hook 判决也在受治理的对象/生命周期层。
- `tools/handlers/js_repl.rs` 钉实：JS REPL 是 feature-gated、raw-JS-only、带 begin/end 事件的专用执行面；它会拒绝 JSON、quoted code 和 markdown fence，并把执行结果包装成正式 `FunctionCallOutput`，而不是把 REPL 降格成普通 shell 别名。

## 2026-03-13 14:05:34（supplemental：MCP catalog / model cache / collaboration mode preset）
- `core/src/mcp/mod.rs` 钉实：MCP 的高价值不在 raw wire JSON，而在受治理的目录层：`effective_mcp_servers()`、`compute_auth_statuses()`、snapshot collection、qualified tool-name 归一化、`Tool/Resource/ResourceTemplate` 结构化转换共同构成真相面。
- 同一文件还钉实：Codex Apps MCP gateway 不是静态 server 列表的一部分，而是按 `features + auth + base_url` 动态注入的治理对象；`LegacyMCPGateway/MCPGateway` 也是正式配置分支，不是前台文案。
- `models_manager/cache.rs` 钉实：model cache 是正式控制层，不是 convenience cache；`TTL + client-version + etag` 共同决定能否复用，cache 失真与版本错配都属于 model catalog 治理语义。
- `models_manager/collaboration_mode_presets.rs` 钉实：collaboration mode 是 preset/mask，而不是自由人格；它会显式装配 developer instructions，并正式决定 `request_user_input` 可用性。
- `models_manager/manager.rs` 钉实：运行态 model truth 不是单一 slug，而是 `refresh strategy + auth gating + remote catalog + fallback metadata + config override` 共同求值的结果；picker preset 与 runtime catalog 仍是两层。
- `protocol/lib.rs`、`app-server-protocol/protocol/mod.rs`、`models_manager/mod.rs` 反查结果也一致：这些模块根文件主要承担目录/导出职责，说明当前研究线已开始逼近“剩余 mostly wiring、鲜有新边界”的收口阶段。

## 2026-03-13 14:18:22（supplemental：skill dependency install / discovery roots / permission compile / config edits）
- `mcp/skill_dependencies.rs` 钉实：skills 的 MCP 依赖安装不是 prompt 技巧，而是 canonical dependency identity 去重、first-party gating、full-access 自动安装、否则走 `request_user_input + ConfigEditsBuilder + OAuth` 的正式 workflow。
- `skills/loader.rs` 钉实：skill discovery 的真相在分层 root/scope 治理：repo/user/system/admin roots 会共同参与，但 repo 搜索不会逃逸 git root；去重按 canonical path，不按 skill 名称强行合并，因此同名 skill 可以在不同路径并存。
- `skills/permissions.rs` 钉实：skill manifest permissions 会编译成真实 permission profile；写根会提升成 `WorkspaceWrite`，只读根则收成受限 `ReadOnly`，网络权限也正式进入 sandbox/profile，而不是停留在说明文字。
- `config/edit.rs` 钉实：配置写入是离散 mutation object 驱动的治理动作，不是文本覆写；它会尽量保留注释/格式，并通过原子写入持久化结构变化。
- `skills/remote.rs` 钉实：remote skills 属于受 ChatGPT auth、product surface、scope 和 zip export/install 治理的远程目录层，不应与本地 skills 真相层混成一体。
- `skills/env_var_dependencies.rs` 钉实：env-var skill dependencies 也是正式运行时契约：优先读 session cache 与环境变量，缺失时再走 secret `request_user_input`，并只在当前 session 内持有。

## 2026-03-13 14:24:56（supplemental：schema/export/render 层收口确认）
- `config/schema.rs` 钉实：配置 schema fixture/canonicalize 属于 export 层，不新增 durable boundary；它负责把对象层稳定导出，而不是引入新的控制面语义。
- `skills/system.rs` 钉实：system skills 这里只剩 re-export 壳，不新增控制面对象。
- `skills/render.rs` 钉实：skill 列表与使用说明的渲染属于 display layer，不是真相层；它负责前台展示，不负责 durable truth。
- 到这一轮为止，白名单 supplemental 的剩余高价值内容已基本穷尽；继续往下更多只会重复 schema/export/render/wiring 共识，而不会新增 durable boundary。

## 2026-03-13 14:31:18（supplemental：types/mod 壳层收口确认）
- `config/types.rs` 钉实：这里主要提供类型定义与反序列化约束；它会强化既有的配置控制面分层，但不再新增 durable boundary。
- `config/mod.rs` 钉实：这里主要承担配置装配壳、导出面与常量/默认值汇总，不再新增新的对象语义。
- `skills/mod.rs` 钉实：这里只是 skills 子模块的导出壳，不新增控制面信息。
- 由此可确认：当前白名单 supplemental 的高价值层已经读尽，继续深读只会重复类型壳、模块壳、schema/export 壳与 wiring 共识。

## 2026-03-13 14:46:30（新增 primary：AEglJaDW_80 / 新 RAG 打包）
- 新增 primary `AEglJaDW_80` 的高价值不在“多 agent 很强”，而在把引入条件和代价同时说透：
  - 收益：面对极度开放、存在领域冲突、或需要多方向并行的任务，多 agent 可能显著优于单体。
  - 代价：token 成本、调试复杂度、循环对话风险、主管上下文膨胀、去中心化通信复杂度都会同步升高。
- 这条新增源继续强化当前主线，而不是推翻它：
  - 先轻量路由，再决定是否升级到多 agent；
  - 必须建立全链路可观测性；
  - 必须按可扩展/热插拔设计，而不是把业务逻辑写死在单一架构里。
- 新版 `20260309_rag_corpus_v1` 已把它正式纳入 `primary`，说明当前研究入口和 RAG 语料层是同步的，不存在“新源到了但语料没跟上”的断层。

## 2026-03-13 16:14:26（新增 RAG 配套文档：handoff / retrieval / schema）
- 新增 RAG 配套文档没有推翻现有主线，而是把检索 SOP 明确成稳定顺序：
  1. `tag_index.jsonl`
  2. `source_catalog.jsonl`
  3. `chunk_corpus.jsonl`
  4. `sentence_corpus.jsonl`
  5. 原始 `source_path`
- 这意味着：
  - 主题收缩和文档层筛选优先于逐句硬搜；
  - `sentence_corpus` 更适合做精确原话取证，而不是默认第一跳；
  - `chunk_corpus` 才是做横向比较时更自然的中层证据面。
- `handoff_prompt.md` 还把另一条边界显式写死：
  - `primary` 必须优先；
  - `supplemental` 只能补充；
  - `quality=degraded` 只能降置信度使用；
  - 多文档同题时，优先并排比较，不要只摘一个观点。

## 2026-03-13 16:18:40（新增 RAG 构建脚本 / stats）
- `build_rag_corpus.py` 的高价值不在实现细节，而在把“什么算主证据层新增”正式代码化：
  - 纳入批次是白名单控制，不是自动扫描所有目录；
  - transcript 按 `source_id` 做主归档去重；
  - 批次优先级是显式字典，不是按目录时间猜；
  - `SKIP_FILE_NAMES` 明确排除了 `summary.txt / README.md / dup_hits.txt` 这类辅助文件；
  - `_all` 批次被当作最终合并结果优先处理。
- 这意味着后面再有新增时，不能只看“目录里多了文件”，而要先确认：
  - 它是否被构建脚本纳入；
  - 是否进入 `source_catalog.jsonl`；
  - 是否影响 `corpus_stats.json`。
- 新增这波内容没有改变研究主线，只是把语料层真相进一步从“目录直觉”收到了“构建规则 + 文档索引 + 统计对象”。

## 2026-03-13 16:22:48（RAG 包内部检索顺序口径冲突）
- 已核实：同一个 `20260309_rag_corpus_v1` 包里存在两套检索顺序口径。
  - 生成型 `README.md` 的“使用建议”写的是：
    1. `source_catalog.jsonl`
    2. `sentence_corpus.jsonl`
    3. `chunk_corpus.jsonl`
    4. `tag_index.jsonl`
    5. `source_path`
  - 手写的 `retrieval_recipes.md` 和 `handoff_prompt.md` 写的是：
    1. `tag_index.jsonl`
    2. `source_catalog.jsonl`
    3. `chunk_corpus.jsonl`
    4. `sentence_corpus.jsonl`
    5. `source_path`
- 边界判断：
  - 这不是“主证据层冲突”，而是“概览说明”和“运行时 SOP”两个层级没完全一致。
  - 当前更应信后者，即 `handoff_prompt.md + retrieval_recipes.md`，因为它们专门定义了检索动作本身，而且和当前研究线中“先主题收缩、再文档层、再上下文块、最后逐句取证”的主判断一致。

## 2026-03-13 16:26:14（冲突根因回到生成脚本）
- 已继续把 `build_rag_corpus.py` 后半段读完，确认：
  - `schema.md`
  - `retrieval_recipes.md`
  - `handoff_prompt.md`
  也全部是脚本直接生成的。
- 因此上一个发现里的“README 与 handoff/retrieval 口径冲突”，根因不是人工维护失同步，而是脚本内部模板就存在双口径。
- 边界判断：
  - 若以后需要修这条研究入口，真正该改的是 `build_rag_corpus.py` 的模板段；
  - 单改生成产物，只会被下次重新构建覆盖。

## 2026-03-13 17:50:24（新增 primary 与旧多-agent 主证据横向收口）
- 已将新增 `AEglJaDW_80` 与既有 `Jn3ywgwIpw0`、`91PTF0hfgek`、`iGqUPV2WN98` 做横向比较。
- 新的细粒度结论是：
  - `AEglJaDW_80` 提供的是“何时值得升级到多 agent”的判别条件：极度开放、领域冲突、真实并行三类至少命中其一。
  - `Jn3ywgwIpw0` 提供的是“默认起手式”：极简单体起步、先模块化/skill、先可观测性，再谈架构升级。
  - `91PTF0hfgek` 提供的是“正收益结构化框架”：上下文保护、并行化、专业化三类收益场景都必须带明确前提，不满足条件时优先用工具检索和上下文工程补救。
  - `iGqUPV2WN98` 提供的是“强耦合代码任务边界”：核心代码开发和长链推理更稳的仍是 `one brain one stream`，子代理优先只读研究，不分散写权限。
- 收口后的总判断：
  - 多 agent 不是默认答案；
  - 默认先单体 + 轻路由；
  - 强耦合代码主线维持单决策流；
  - 多 agent 主要用于研究、过滤、搜索、验证这类弱耦合升级链路。

## 2026-03-13 18:06:47（最终总表已成）
- 当前研究线最关键的冲突已经全部裁决完毕：
  - 单体 vs 多 agent：默认单体，明确条件再升级
  - 更大上下文 vs 状态外化：先状态外化
  - 厚 prompt vs 对象/事件/rollout：先对象层
  - memory = 进化：否，memory 是 ETL 与检索控制
  - 工具越多越强：否，先目录化搜索与 capability-gated assembly
- 最终高价值主轴已固定为：
  - 协议对象
  - 事件流
  - rollout/workflow artifacts
  - session/turn layering
  - 目录/策略层
- 这意味着后续产品与架构判断默认应以 [harness_executable_master_table.md](D:\Projects\vrplayer\harness_executable_master_table.md) 为总参照，而不是回头重扫灵感库。

## 2026-03-13 18:44:29（用户裁决：高权限自动化不再以隔离为前提）
- 已确认需要修正的是“自动化升级链路前提”，不是整条研究线主结论。
- 新边界是：
  - 高权限浏览器 / 桌面 / RPA / 本机应用自动化可以直接建设；
  - 若仍保留能力分层，其目标是稳定性、速度、调试成本和可维护性，而不是安全隔离。
- 这条裁决已与总表保持一致，后续不应再出现“高权限自动化必须先隔离”的旧口径。

## 2026-03-13 20:41:15（main 锁死根因与恢复口径）
- `main` 的最新失稳根因不是模型链坏掉，也不是 `tools.profile=minimal` 本身有问题，而是上一轮 `gateway --force` 留下了一条孤儿进程链：
  - `cmd.exe (51056)`
  - `node openclaw.mjs gateway --force (46612)`
  - `node.exe ... openclaw.mjs gateway --force (45828)`
- 上述孤儿链会继续持有旧主会话文件锁，并导致：
  - gateway 请求超时后 fallback 到 embedded
  - embedded 再次撞同一把 session lock
  - `main` 表现为“所有模型都失败”，但真正失败点是同一个 `.jsonl.lock`
- `main` 的恢复 SOP 已收口为：
  1. 杀掉残留的 `gateway --force` 孤儿进程链
  2. 归档并重置 `C:\Users\Lenovo\.openclaw\agents\main\sessions`
  3. 重新拉起 Gateway
  4. 用单独串行的 `main` 最小请求做 fresh 验证，不和其他探针并行
- 当前还需记住的真边界：
  - `openclaw.json` 不支持 `skillsFilter`
  - `workspace/TOOLS.md` 不能再把“想要的 skills 面”写成“运行真相”
  - `main` 并行探针更容易复现旧锁链路，串行验证更可靠

## 2026-03-14 12:39:42（新增两天转写整合后的模式路由细化）
- `6qU71R2VmKk` 把架构选型压成四个问题：控制度、问题复杂度、资源约束、领域专业度。对当前产品线最值钱的边界是：能画流程图先上 workflow，能顺序处理先用单体+skills，预算和上线节奏紧时不要为了“看起来高级”直接上多 agent。
- `mgq3Jua03KQ` 把三种 workflow 的适用边界讲清了：
  - `Sequential` 解决可控性、审计性、逐步校验；
  - `Parallel` 解决独立子任务的速度或多视角置信度；
  - `Evaluator-Optimizer` 只解决“标准明确、且值得反复打磨”的质量问题。
- 这两条新增 `primary` 与既有 `Jn3ywgwIpw0 / 91PTF0hfgek / iGqUPV2WN98` 已形成稳定共识：
  - 默认先单体与轻路由；
  - 先 workflow，再考虑多 agent；
  - 强耦合代码主线维持 `one brain one stream`；
  - 多 agent 主要用于研究、过滤、搜索、验证等弱耦合链路。
- 研究入口层新增一个源头级问题已确认：`D:\Projects\灵感包\入口脚本\build_rag_corpus.py` 同时生成了两套检索顺序口径；运行时应以 `handoff_prompt.md + retrieval_recipes.md` 为准，而不是以生成型 `README.md` 为准。

## 2026-03-14 12:46:40（模式路由运行态偏差与收口）
- fresh smoke 已确认：`telegram-fast` 对“固定流程图 + 中间校验”可稳定回到 `workflow/sequential`，但 `main` 在 fresh session 里仍答成 `evaluator/review`。
- 这说明当前问题不再是“规则没写进文件”，而是“后台总管并不稳定承担自然语言模式分类职责”。
- 因此当前最稳的产品化分工应明确为：
  - `telegram-fast` 负责前台自然语言模式初判；
  - `main` 负责接收已判定模式后的计划、监督、review、compaction 和后台收口；
  - `ops-exec` 负责高权限执行承接。
- 同时也顺手收掉了一条配置漂移：`C:\Users\Lenovo\.openclaw\workspace\MEMORY.md` 里仍写着旧的 `gemini-3.1-pro-preview` 主链口径，现已更正回真实的 `gemini-3-flash-preview`。

## 2026-03-14 18:57:39
- `start-node-host.ps1` 之前的误报失败，不是单纯“等待时间不够”，而是：
  - node host 真指纹已经从旧的 `index.js` 形态切到 `openclaw.mjs node run`
  - 成功条件没有把“节点连上 gateway”与“宿主进程已经存在”分层
- 当前一次真实 `openclaw node run` 会形成“wrapper node -> real node”的双 `node.exe` 进程链；这不是重复启动，而是同一条宿主链的两层进程。
- 因此运行统计若直接数匹配到的 `node.exe`，会把单次宿主高估成 2；`oc-runtime-heal.ps1` 现已改为只数根进程。
- 最新 stop/start 回放已证明：
  - 新指纹能杀到真 node host
  - 节点会先回到 `connected=false`
  - 新脚本执行后不再误报失败
  - 节点最终恢复到 `connected=true`

## 2026-03-14 19:51:14（统一 runtime truth 真相面）
- 运行真相仍然被分散在 8 条官方 JSON 命令和 3 份 agent session store 里；这次已通过 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py` 收口成单一快照入口。
- 当前最容易误导排障的一条新发现是 Telegram 通道口径分裂：
  - `openclaw health --json` 会显示 `running=false / tokenSource=none`
  - `openclaw channels status --probe --json` 真实却是 `running=true / tokenSource=config / mode=polling / probe.ok=true`
- 这说明 `health --json` 当前更像派生/展示层，而 `channels status --probe --json` 更接近通道运行真相。
- 因此判断 Telegram 是否真正在线时，后续应优先信：
  - `openclaw channels status --probe --json`
  - `openclaw_runtime_truth.latest.json`
  而不是把 `health --json` 的 channel 字段直接当最终真相。

## 2026-03-14 20:26:12（oc-runtime-truth 包装器误报收口）
- `openclaw_runtime_truth.py` 的活故障根因已经钉实：不是 OpenClaw CLI 本身不稳，而是 retry 补丁里出现了非法 Python 语法 `last_error = RuntimeError(...) from exc`。
- 修掉这处语法错误后，`oc-runtime-truth.cmd` 默认/`-Raw`/`-Markdown` 三种模式均已 fresh 通过。
- 此前 shell 回放里出现的“打印成功但 exit code=1”并不是入口故障，而是把 `... | Select-Object -First ...` 当成验证命令造成的截流假象；后续不再用该口径判断 wrapper 是否健康。

## 2026-03-14 20:35:47（runtime truth 前台化补一层）
- 当前 `runtime truth` 的最小高价值前台化，不是立刻再造一个 UI 系统，而是先把统一快照产物补成可直接打开的 HTML 状态面。
- `openclaw_runtime_truth.latest.html` 已经满足这一层：它把 checks、Telegram truth 和 per-agent transcript/tool/error 摘要收成一个单页状态面。
- 因此第二阶段当前更稳的产品判断是：
  - JSON 继续承担机器真相
  - Markdown 继续承担文本归档
  - HTML 承担本地直接消费状态面

## 2026-03-14 20:40:23（runtime truth 直接消费入口再补一层）
- 仅有 `-Html` 仍然要求人手去找文件路径，本质上还是“半成品入口”。
- 当前更稳的最小产品化补丁不是新造 UI，而是让包装器直接承担“刷新 + 打开”的最后一步。
- 因此 `oc-runtime-truth` 现在的更合理入口层次应是：
  - 默认 summary：命令行快速判断
  - `-Raw / -Markdown / -Html`：定向取产物
  - `-Open`：直接打开 HTML 状态面

## 2026-03-14 21:23:02（runtime truth 错误统计误导点收口）
- 之前 `runtime truth` 只给出 `recentErrors`，容易把历史 transcript 样本误读成“当前 agent 仍在报错”。
- 这次最小且有效的修复已经成立：
  - `activeErrors`：只保留最后一次成功之后仍未被覆盖的错误
  - `historicalErrorCount`：保留累计旧错误数量
- `recentErrors`：只做最近 5 条历史样本回看
- fresh 快照已经证明当前三个 agent 都是 `activeErrors=0`；也就是说，当前链路健康与历史排障证据现在终于分开了。

## 2026-03-14 21:33:46（监督入口再减一步认知负担）
- 仅有 `oc-runtime-truth -Open` 仍要求人记一个特定参数，本质上还不是“默认入口”。
- 当前更稳的最小产品化补丁已经成立：
  - 新增 `oc-supervise.cmd/.ps1`
  - 默认直接等价于 `oc-runtime-truth -Open`
  - 再额外落桌面快捷方式
- 这一步的价值不在新能力，而在把“监督入口”从记忆型命令变成约定型入口，进一步降低本机日常使用成本。

## 2026-03-14 21:45:46（监督菜单面与编码边界收口）
- 仅有 wrapper 和桌面快捷方式，仍然要求使用者记住“哪个入口负责什么”；对本机日常监督来说，这层心智负担仍偏高。
- 当前更稳的最小补丁已经成立：新增 `oc-supervise-menu`，把常用监督动作固定成菜单，不再靠记忆多个命令和参数。
- 这轮还钉实了一个 Windows PowerShell 边界：直接执行的 GUI 入口文件不应依赖中文脚本文案，否则在无 BOM/本机默认编码场景下容易被误解并触发 parser error。当前最稳做法是让这类脚本保持 ASCII 文案。
## 2026-03-14 22:08:50
1. `runtime truth` 的下一层高价值产品化不是再堆 agent 卡片，而是把运行真相拆成对象级状态面：`alerts / services / recent sessions`。
2. `alerts` 当前已经能把“当前活问题”和“展示层口径偏差”放到同一层看待；本轮 fresh 结果只剩 `Telegram health/channel mismatch`，browser 恢复后已不再保留浏览器链告警。
3. `services` 把 gateway / telegram / browser / nodes / approvals 五类控制面收成统一摘要，这比继续翻多条 CLI JSON 更接近监督真相面。
4. `recent sessions` 已证明会话层真相也应对象化，不该继续停留在 transcript 级回看；当前最值钱的字段是 `agentId / sessionId / model / percentUsed / age / abortedLastRun`。
5. 当前 authoritative surface 再次被钉实：运行真相优先看 `runtime truth` 聚合对象和 `channels --probe`，`health --json` 的 Telegram 字段继续只作辅助展示层。

## 2026-03-15 10:50:53
1. Windows node 当前真实阻塞不是 identity mismatch，而是同一设备身份的 `node` role-upgrade 未批准。gateway paired table 里 `deviceId=96c978...` 原本只有 `roles=["operator"]`，因此 `openclaw node run` 会触发 `pairing required`。
2. `pending.json` 里的 `node-host` repair 请求并不代表身份漂移；它说明同一公钥/同一 deviceId 正在请求从 `operator` 升到 `node`。正式批准后 paired entry 会扩成 `roles=["operator","node"]` 并补出 `tokens.node`。
3. 当前最稳的恢复链不是手改 state，而是：
   - `openclaw devices approve --latest --json`
   - `C:\Users\Lenovo\.openclaw\start-node-host.ps1`
   - `openclaw nodes status --json`
4. pairing 真相优先级应明确为：
   - `openclaw devices list --json`
   - `openclaw nodes status --json`
   - `paired.json / pending.json`
   `pending.json` 可短暂滞后，不应单独当最终真相。
5. `runtime truth` 的 node service 字段此前混入了本机中文错误串乱码；这不是运行失败，而是展示层口径问题。当前更稳的状态面应把 “Scheduled Task 未安装” 与 “用户态 node host 已连上” 分开表达。

## 2026-03-15 11:23:58
1. `runtime truth` 过去只给 `connectedCount`，不足以回答“paired 了吗、node role 给了吗、还有 pending repair 吗”。这层真相现在已经对象化成 `nodePairing`。
2. 当前 node 真相应明确分成两层：
   - 连接层：`nodes status.connected`
   - 配对层：`devices list / nodePairing`
3. `nodePairing` 的最小高价值字段已经固定为：
   - `pairedDeviceCount`
   - `pendingDeviceCount`
   - `nodeRoleGrantedCount`
   - `pairedRoles`
   - `pairedDevices`
   - `pendingDevices`
4. 当前全量 fresh `runtime truth` 大约需要 `50s`，因为会串行跑 9 条官方 JSON 命令；这属于正常刷新成本，不是新故障。

## 2026-03-15 14:08:50
1. live dashboard 之前真正的卡点，不是旧服务残留，也不是 fresh snapshot 本身，而是把长动作端点当同步 RPC 用。`approve-latest-device` direct wrapper 即使在 no-op 状态也要约 `24s`，`follow-recommendations` 更重；如果端点还要在动作后同步 fresh truth，就会稳定撞上 HTTP 超时。
2. 这次最小且正确的修复不是继续调大 HTTP 超时，而是把动作端点改成后台 job：POST 立即返回 `running=true`，完成态统一走 `/api/action-status`。
3. 当前 `action-status` 的高价值字段已经固定为：
   - `running`
   - `action`
   - `status`
   - `startedAt / finishedAt`
   - `result`
   - `snapshot`
   - `needsRefresh`
   - `error`
4. 这也再次证明第二阶段的产品方向是对的：高价值的不是把前台 prompt 写厚，而是把长动作做成正式 lifecycle surface。

## 2026-03-15 15:13:58
1. live dashboard 动作链异步化后，新的误导点不是动作没跑完，而是 `/api/action-status` 与 `/api/truth` 可能停在两份不同时间的 snapshot。这样 `Heal Runtime` 明明成功，页面仍可能继续显示 browser down。
2. 这次真正正确的修复不是再让前端多做一次补刷判断，而是把 authoritative truth refresh 收到 server 端：后台动作完成时优先执行 `build_snapshot(refresh=True)`；只有 fresh 失败时才允许返回 stale snapshot，并明确打上 `needsRefresh=true`。
3. `Action Output` 之前直接 dump 整份嵌套 snapshot JSON，本质上还是 debug transcript，不是产品态监督面。当前最小可用收口是 compact summary，只保留动作状态、时间、错误、结果键和缩略 snapshot 摘要。
4. 这条修复进一步说明：第二阶段的高价值不只是“动作能跑”，而是“动作完成后 truth 要自动收敛到同一份 authoritative state”。

## 2026-03-15 15:26:51（Current Action 真相面收口）
1. `Action Output` 虽然已经压成 compact summary，但它仍然是 debug transcript，不适合作为当前动作的主要可视状态面。
2. 当前更稳的产品化补丁已经成立：把 `Current Action` 正式拆成两层：
   - `action-banner`：当前状态标题 + 摘要
   - `action-timeline`：accepted/running/completed/refresh/result/error 的关键事件
3. 这让 live dashboard 的动作面第一次从“要读 JSON 才懂”推进到了“直接看状态条和时间线就能懂”。
4. fresh DevTools 验收已完成：页面快照确认新 UI 已渲染；console 唯一报错是 `favicon.ico` 404；主 API 请求全部 `200`。因此这轮没有新增活故障。

## 2026-03-15 15:40:31（Debug Output 降级收口）
1. `Action Output` 即使已经压成 compact summary，仍然会抢占主状态面的视觉焦点，产品语义不够稳。
2. 当前更稳的收口已经成立：把它降成折叠式 `Debug Output`，默认折叠，失败时自动展开。
3. 这样当前动作状态的主真相正式只剩两层：
   - `action-banner`
   - `action-timeline`
   debug 面板只在排障时出场。
4. fresh DevTools 验收结果比上一轮更干净：当前 console 已无报错，主 API 请求继续全部 `200`。
## 2026-03-15 15:53:47（Recent Actions 历史视图）
1. live supervision 之前已经有 `Current Action` 和折叠式 `Debug Output`，但仍缺一个稳定回答“上一轮到底做了什么、成功还是失败”的前台历史层。
2. 当前最小且正确的产品补丁已经成立：把动作历史持久化到 `D:\Projects\vrplayer\openclaw_supervision_action_history.latest.json`，并通过 `/api/action-status.history` 正式暴露出来。
3. 这样当前动作面正式分成三层：
   - `Current Action`：当前运行中的 banner/timeline
   - `Recent Actions`：最近已完成/失败动作历史
   - `Debug Output`：仅排障使用的折叠面板
4. 这比继续扩展当前动作 JSON 更符合总表主线：把 lifecycle 真相拆成对象层和历史层，而不是继续让人读 transcript。
## 2026-03-15 16:03:10（Recent Actions 分组/筛选 + truth 联动）
1. 纯 `Recent Actions` 表格仍然不够产品化，因为它不能直接回答“失败多不多、完成多不多、最新一轮有没有把 truth 刷新成功”。
2. 当前更稳的补丁已经成立：给历史面补 `All / Completed / Failed` 计数摘要和状态筛选按钮，把“读全表”变成“先看聚合，再看筛选结果”。
3. 历史项里的 `Truth` 列也已经正式联动到 truth refresh 结果：completed 动作会带 `truthGeneratedAt`，页面直接显示 `fresh @ generatedAt`；如果 future 动作只完成执行但还没拿到 fresh truth，就会回落成 `needs refresh`。
4. 这让 live supervision 的三层分工更完整：`Current Action` 看运行中，`Recent Actions` 看历史与 truth 对齐，`Debug Output` 看排障细节。
## 2026-03-15 16:35:51（历史筛选与 truth-driven recommendations）
1. `Recent Actions` 只有状态筛选仍然不够，因为它无法快速回答“最近一小时做了什么”“某一种动作最近连续跑了几次”。更稳的产品形态是把历史面做成三维筛选：状态、时间范围、动作类型。
2. 时间/类型筛选一旦成立，`Recent Actions` 的价值就从“动作日志表”升级成“监督查询面”。这比继续堆更多列更接近第二阶段后半段要的产品化。
3. `follow-recommendations` 之前的核心缺陷不是动作本身，而是它只消费一份初始 recommendations 快照。对 node pairing 这类会在动作中途改变 truth 的链路，这会导致推荐动作停在旧状态。
4. 更稳的做法已经成立：每一步前后都重新读取最新 `runtime truth`，按 `approve-latest-device -> heal -> start-node-host` 的优先级逐步选择下一步，并把 `before/after` 摘要落到 step timeline。动作计划应信实时 truth，不应信起跑时的旧 recommendations。

## 2026-03-15 16:55:25
1. 当前 live supervision 和 `runtime truth` 之前最大的残缺不是服务状态没前台化，而是控制状态仍散落在 agent 自述、零散 CLI 文本和 JSON 细项里，没有正式对象面。
2. 这轮已经把高价值控制真相收成 `controlPlane`：`approvals / sessions / presence / governance`。后续判断控制面时，应优先看这四层对象，而不是再回到自然语言解释。
3. `Control Plane` 的价值不在“多一块卡片”，而在它把第二阶段后半段的监督重心从“服务有没有在线”推进到了“控制状态是不是正确”。这是从运行可用走向产品可管的必要一步。

## 2026-03-15 17:20:37
1. `Control Plane` 只是对象摘要，离真正可消费的监督面还差一层信号化。当前更稳的产品补丁已经成立：把控制面再压成固定四个 `Control Signals`，让前台直接回答“是否对齐”，而不是让人继续手工读卡片。
2. 一个成熟的 signal 面不该只给 `ok/warn/error`，还必须同时给出 `detail / automatable / endpoint`。这样监督层才能区分“需要人判断”“可自动动作”“仅供观察”的不同处置路径。
3. 这轮 live 验收也再次证明：源码和单元测试都不足以代替运行中 server 真相。18891 端口上的旧 supervision server 会让前台继续展示旧页面；真正成立的验收口径必须包含 server 重启后的 fresh 页面 refresh。

## 2026-03-15 18:22:52
1. `Control Signals` 和对象级监督已经进入默认 UI 之后，新的高价值阻塞不是功能缺失，而是 canonical live server 可能继续复用旧代码。只要 18891 端口上的旧进程还活着，前台就会继续展示旧页面，即使仓库源码和测试都已更新。
2. 这类问题不能再靠“换一个临时端口验证新页面”长期存在。更稳的产品态是：默认入口自己判断 server 是否 stale，并自动淘汰旧 listener。
3. 当前最小且正确的收口已经成立：把 `stateVersion + scriptMtimeUtc` 写进 `openclaw_supervision_server.latest.json` 和 `/api/ping`，再由 `oc-supervise-live.ps1` 在默认入口处做版本比对；不匹配就自动杀旧进程并拉起新 server。
4. 这也进一步钉实了一个第二阶段后半段原则：默认入口必须对“运行中对象真相”负责，不能把“你自己记得重启旧 server”留给人来兜底。

## 2026-03-15 18:50:47（对象级监督 signal/history）
1. `Object Supervision` 的下一层产品化不该继续堆原始 transcript，而应把 `thread / turn / item` 压成可消费的 canonical signals 与历史 artifact。
2. 本轮已确认当前最稳定的对象级信号集合是：
   - `thread-state-visible`
   - `thread-errors-cleared`
   - `turn-boundaries-visible`
   - `turn-prompt-clean`
   - `item-flow-visible`
   - `item-roundtrip-aligned`
   - `approval-status-linked`
   - `session-object-aligned`
3. 当前唯一对象级 `warn` 不是活执行故障，而是监督层暴露出的历史 prompt error 样本：`turn-prompt-clean` 对 `main / telegram-fast / ops-exec` 都仍为 `warn`。
4. 当前对象级强健康信号已成立：
   - `toolRoundTripMismatchCount=0`
   - `agentsWithActiveErrors=[]`
   - `browserRunning=true`
   - `browserCdpReady=true`
   - `connectedNodeCount=1`
5. `openclaw_object_history.latest.json` 现已成为对象级历史真相源；它比滚动 transcript 更适合回答“过去几轮对象信号是否稳定、哪些 agent 持续受影响”。
6. `chrome-devtools` 本轮仍不可用，表现为 transport closed；因此本轮 live 验证主证据为 `py_compile + unittest + fresh runtime truth + live server restart + runtime heal`。

## 2026-03-15 19:13:07（对象历史聚合与 control-plane 误报修正）
1. `objectHistory` 如果只保留平铺快照列表，监督面仍然会退化成“人工扫表”；真正高价值的是把它压成 `signalSummary + agentSummary`，让人先看到持续热点，再回到单条快照。
2. 当前对象历史已经进入这种形态：每条 `warn` 快照会显式携带 `warnSignals`，并且 truth 层会稳定输出：
   - `objectHistory.signalSummary`
   - `objectHistory.agentSummary`
3. live supervision 这轮已经把对象历史真正做成可查询面，而不是只做展示：
   - `signal` 筛选
   - `agent` 筛选
   - `Signal Hotspots`
   - `Agent Hotspots`
4. fresh runtime truth 暴露了一个新的误导点：`backend-presence-ready` 之前仍把 `presence.backendRoles` 缺 `node` 当成控制面漂移，即使当前用户态 node 主链已健康。
5. 当前稳定口径已经修正：只要 `connectedNodeCount>0` 或 `nodeRoleGrantedCount>0`，就视为 `nodeOperational=true`；因此用户态 node 主链健康时，`backend-presence-ready` 不应继续报 `warn`。
6. fresh 结果已确认：
   - `recommendedActions=[]`
   - `backend-presence-ready=ok`
   - `nodeOperational=true`
   - `objectHistory.signalSummary[0].id=turn-prompt-clean`
   - `objectHistory.agentSummary` 已覆盖 `main / ops-exec / telegram-fast`

## 2026-03-15 19:36:39（审批/状态细信号与对象级推荐动作）
1. `approval-status-linked / session-object-aligned` 这种粗信号已经不够用了。它们会把审批默认值、socket 就绪、session 覆盖、队列健康这几类问题混成两个桶，导致历史热点和推荐动作都不够可解释。
2. 当前更稳定的对象级监督面已经改成 4 个细信号：
   - `approval-defaults-ready`
   - `approval-socket-ready`
   - `status-session-coverage-aligned`
   - `status-queue-clean`
3. 这轮 fresh truth 证明拆细是有效的：当前新的对象级 `warn` 不再只有 `turn-prompt-clean`，还显式暴露出 `status-session-coverage-aligned`，其 detail 已直接定位为 `configuredSessionCount=4, sessionObjectCount=3, transcriptVisibleCount=3`。
4. 对象级 drift 现在不再只停留在表格和历史里，而是正式进入 `recommendedActions`。当前 authoritative action 已收口为：
   - `inspect-object-supervision`
   - reason: `turn-prompt-clean, status-session-coverage-aligned`
5. live `/api/truth` 已确认这次 truth refresh 不是本地脚本独有结果，而是前台监督入口当前真实可见的 authoritative truth。

## 2026-03-15 19:41:19（对象级推荐动作继续拆细）
1. 单条 `inspect-object-supervision` 仍然过粗。它虽然把视线拉回了对象层，但没有直接回答“这次应先看 turn prompt，还是先看 session coverage”。
2. 当前更稳定的产品形态已经继续拆成两条具体动作：
   - `inspect-turn-prompts`
   - `inspect-session-coverage`
3. 这两条动作的好处是把 signal -> action 映射继续前台化了：
   - `turn-prompt-clean` 直接映射到 turn prompt 检查
   - `status-session-coverage-aligned` 直接映射到 session coverage 检查
4. fresh truth 已确认这次拆分生效，当前 `recommendedActions` 不再是单条总入口，而是两条具体对象级监督动作。

## 2026-03-15 19:49:18（推荐动作直达对象信号视图）
1. 只把 recommendation 拆成 `inspect-turn-prompts / inspect-session-coverage` 还不够；如果前台还只是显示两条文字建议，监督层仍然要人工去找对应 signal 和历史记录。
2. 当前更稳定的产品化收口已经成立：手动 recommendation 也应显式携带 `signalId/group`，并在 live 页面上直接把视线聚焦到对应 `Object Signals` 分组与 `Object History` signal 过滤。
3. 这一层前台化的价值不是“多一个按钮”，而是把 `signal -> action -> evidence view` 连成闭环。当前 `inspect-turn-prompts` 已直连 `turn-prompt-clean / group=turn`，`inspect-session-coverage` 已直连 `status-session-coverage-aligned / group=status`。
4. 这也再次验证了一条主线：高价值 supervision 不应停在 recommendation 文本，而应继续把 recommendation 绑定到 authoritative object surface。

## 2026-03-15 19:55:47（Focused Inspection 检查视图）
1. recommendation 即使已经能聚焦筛选，仍然不够高效；用户还需要在 `Object Signals / Object History / Object Supervision` 三块之间自己拼装证据。
2. 当前更稳的产品形态已经继续推进成 `Focused Inspection`：点击 recommendation 后，页面直接渲染该 signal 的专用检查视图，而不是只切一组通用过滤器。
3. 这轮最值钱的不是又多一块卡片，而是把 recommendation 真正推进成“可消费的检查面”。当前：
   - `turn-prompt-clean` 会直出 prompt drift agents 表
   - `status-session-coverage-aligned` 会直出 session coverage 差值摘要
4. 这进一步压实了一条主线：高价值监督面不应只给“去哪看”的建议，而应直接把对应 evidence bundle 前台化。

## 2026-03-15 20:26:27（Focused Inspection authoritative evidence）
1. `Focused Inspection` 如果只停在 signal 摘要，监督仍然会退化成“看到了 drift，但还要自己拼证据”。更稳的产品形态是直接消费 authoritative `objectEvidence`，把当前 signal 对应的活证据前台化。
2. 当前这一层已经成立：`turn-prompt-clean` 现在不只给 prompt drift agents，还会直接暴露 `promptErrorSamples`，并显式带出 `sessionId / transcriptPath`；因此 turn prompt 问题现在已经能从对象面直接跳到 transcript 证据，不再需要人工二次检索。
3. `status-session-coverage-aligned` 这轮最值钱的新结论是：当前 drift 的活根因不是 session object 丢失，而是 duplicate configured `telegram-fast` rows。authoritative truth 已直接给出：
   - `configuredSessionCount=4`
   - `sessionObjectCount=3`
   - `duplicateConfiguredAgents=telegram-fast x2`
   - `missingSessionObjectRows=[]`
4. 这把对象级监督再往前推进了一层：高价值 recommendation 不应只把视线拉回某个 signal，而应直接把“当前到底是 duplicate row、missing object，还是 prompt error sample”说清楚。只有这样，后续 drill-down 才不会又退化成人工扫表。

## 2026-03-16 08:13:42（session coverage drift 的 active/stale 根因前台化）
1. 仅仅知道 `duplicateConfiguredAgents=telegram-fast x2` 还不够，排障仍然会卡在“哪一条是当前 active row，哪一条是 stale row”。更高价值的产品面必须把 configured row 角色直接对象化，而不是让人再去人工对比 thread session。
2. 当前 authoritative evidence 已继续收口为 row 级 drill-down：`configuredSessionRows` 现在直接给出 `coverageRole / coverageRoleLabel / threadSessionId / threadSessionMatch`；`duplicateConfiguredAgents` 也直接给出 `activeSessionId / staleSessionIds`。这使 `status-session-coverage-aligned` 第一次真正能回答“当前重复里谁是活行、谁是陈旧行”。
3. live `Focused Inspection` 的正确前台化也已经成立：`Configured Session Rows`、`Duplicate Configured Agents`、`Duplicate Session Row Drilldown` 三块合在一起，已经足够直接支持 active/stale 判因，不需要再把人拉回通用 signal 表或原始 JSON。
4. 当前 fresh truth 已钉实：
   - active configured row = `98f92cc1-5854-4bb6-9b25-23948ee4ecab`
   - stale configured row = `c7110231-7ebf-47f4-872b-fd4311cb6a2a`
   - `missingSessionObjectRows=[]`
   所以后续若继续处理 `status-session-coverage-aligned`，优先方向应是去重 configured session rows，而不是追 session object 丢失。

## 2026-03-16 08:31:23（coverage drift 与 stale row 分离后的稳定结论）
1. `status-session-coverage-aligned` 不应继续把 stale duplicate configured row 误算成 live coverage drift。当前 authoritative truth 已确认 live session objects 与 visible transcripts 是对齐的，因此该 signal 应为 `ok`。
2. stale duplicate configured row 应单独进入 `status-stale-configured-rows`。当前唯一活问题不是 coverage 缺口，而是 `telegram-fast` 仍保留一条 stale configured row：`c7110231-7ebf-47f4-872b-fd4311cb6a2a`。
3. `telegram-fast` 的 active companion row 已钉实为 `98f92cc1-5854-4bb6-9b25-23948ee4ecab`；当前 stale-row hygiene 与 live coverage 已不再混层。
4. 因此对象级 recommendation 也应同步改口径：当前应优先 `inspect-stale-configured-rows`，而不是继续泛化成 `inspect-session-coverage`。

## 2026-03-16 08:58:02（surface row 归类修正后的稳定结论）
1. 之前把 `telegram-fast:c7110231-7ebf-47f4-872b-fd4311cb6a2a` 直接判成 stale configured row 是过度简化。当前 authoritative truth 已证明它对应的是 `agent:telegram-fast:telegram:direct:1262756389` 这条 Telegram direct surface session。
2. 对象级监督现在应明确区分三类 row：
   - configured active row
   - configured stale row
   - valid surface row
3. `surface-row` 不应再进入 `duplicateConfiguredAgents`、`duplicateConfiguredRowDrilldown`、`status-stale-configured-rows` 的活问题计算；否则 supervision 会把合法多 surface 暴露误报成 hygiene drift。
4. 当前 fresh 结果已经说明修正后口径更稳定：
   - `status-session-coverage-aligned=ok`
   - `status-stale-configured-rows=ok`
   - `recommendedActions=[inspect-turn-prompts]`
5. 因此当前对象级排障重心应正式从 session coverage/stale-row 转回 `turn-prompt-clean`，不要再在 Telegram direct recent row 上继续误耗精力。

## 2026-03-16 09:09:38（turn-prompt-clean 进入 turn 级 drill-down）
1. `inspect-turn-prompts` 如果只停在 `Prompt Drift Agents + Prompt Error Samples`，监督层依然要自己把 session 摘要、最近错误和 transcript 位置拼回同一张图。更高价值的产品形态是直接给出 turn 级 evidence row。
2. 当前更稳的收口已经成立：`objectEvidence.turn-prompt-clean` 现已新增 `promptTurnDrilldown`，并直接给出 `agentId / sessionId / transcriptPath / latestPromptErrorTimestamp / latestPromptErrorModel / latestPromptErrorMessage / lastUser / lastAssistant / lastSuccessAge`。
3. live `Focused Inspection` 的正确前台化也已经跟上：`Prompt Drift Turn Drilldown` 现在直接把每个 agent 的最新 prompt debt 摘成一行，监督不再需要在 `Prompt Drift Agents` 与 `Prompt Error Samples` 两张表之间手工跳转。
4. 当前 fresh truth 已确认这层证据有效：
   - `recommendedActions=[inspect-turn-prompts]`
   - `promptTurnDrilldown count=3`
   - 首条 drill-down 来自 `telegram-fast`
   - `latestPromptErrorMessage=aborted`
5. 这把对象级监督再往前推进了一层：后续 prompt drift 的下一步不该再是“继续堆样本”，而应开始明确区分 live prompt drift 与 purely historical prompt debt。

## 2026-03-16 09:24:47（live prompt drift 与 historical prompt debt 分层）
1. `turn-prompt-clean` 如果继续把旧 prompt error 样本和当前活 drift 混在一起，监督 recommendation 会长期停在 `inspect-turn-prompts`，即使当前系统已经没有 live drift。这会把历史债误报成当前故障。
2. 当前更稳的产品形态已经成立：`turn-prompt-clean` 只表示 live active prompt drift，另起 `turn-prompt-debt-contained` 单独承载 historical prompt debt。
3. 这层分离的关键不在多一个 signal，而在 authoritative evidence 终于分家：
   - live drift 继续看 `promptDriftAgents / promptTurnDrilldown / promptErrorSamples`
   - historical debt 改看 `historicalPromptDebtAgents / historicalPromptDebtDrilldown / historicalPromptErrorSamples`
4. current fresh truth 已证明这条分层是有效的：
   - `turn-prompt-clean=ok`
   - `turn-prompt-debt-contained=warn`
   - `activePromptErrorAgentCount=0`
   - `historicalPromptDebtAgentCount=3`
   - `recommendedActions=[inspect-prompt-debt]`
5. 因此当前 prompt 监督的下一层高价值不再是继续看“有没有活 drift”，而是把 historical debt 做成更细的 transcript/turn timeline，服务后续 debt 清理，而不是误触发运行面修复。

## 2026-03-16 09:49:24（historical prompt debt timeline 聚合与筛选）
1. 仅有 `Historical Prompt Debt Timeline` 长表还不够，监督层仍然会在“哪类 debt 最集中、该先看哪个 agent/model”上耗时间。更高价值的产品形态必须先给聚合，再给筛选，最后才给明细。
2. 当前更稳的收口已经成立：`turn-prompt-debt-contained` 现已固定暴露 `historicalPromptDebtTimelineAgentSummary / historicalPromptDebtTimelineModelSummary / historicalPromptDebtTimeline` 三层 evidence，分别回答“债集中在哪些 agent”“集中在哪些 model”“具体发生过哪些 debt 事件”。
3. live `Focused Inspection` 也已经跟上这层分工：`Historical Prompt Debt Agent Hotspots / Historical Prompt Debt Model Hotspots / timeline agent filter / visibleRows` 使监督先看热点再下钻，不再被一张长 timeline 表牵着走。
4. 当前 fresh truth 已确认这层 evidence 有效：
   - `recommendedActions=[inspect-prompt-debt]`
   - `historicalPromptDebtTimeline count=6`
   - `historicalPromptDebtTimelineAgentSummary count=3`
   - `historicalPromptDebtTimelineModelSummary count=3`
   - `firstAgentSummary=main`
   - `firstModelSummary=gemini-3-pro-preview`
5. 因此 prompt debt 的下一层高价值不再是继续加样本，而是把这层 timeline 聚合继续推进成 transcript 级 debt timeline drill-down 与时间窗治理视图，服务后续 debt 清理和回放。

## 2026-03-16 10:05:18（historical prompt debt 时间窗治理）
1. 只按 agent/model 聚合 historical prompt debt 还不够，监督层依然无法直接判断“这是最近 24h 的活债、近 72h 的存量债，还是更老的历史债”。时间语义如果不进入 authoritative evidence，recommendation 依然会停留在“看一张长表”。
2. 当前更稳的产品化收口已经成立：`turn-prompt-debt-contained` 现已固定暴露 `historicalPromptDebtTimelineWindowSummary`，并让 timeline 每条事件显式携带 `windowKey/windowLabel`。这样 evidence 终于同时回答了“债在哪些 agent/model 上集中”以及“这些债主要落在哪个时间窗口”。
3. live `Focused Inspection` 也已经补齐对应消费顺序：`Historical Prompt Debt Time Windows` 负责给出时间窗热点，`timeline window` 过滤器负责把时间语义直接落进明细表，再叠加原有 `timeline agent` 过滤形成双筛选。
4. 当前 fresh truth 已确认这层时间窗治理有效：
   - `recommendedActions=[inspect-prompt-debt]`
   - `historicalPromptDebtTimelineWindowSummary count=1`
   - `firstWindow=Last 72h`
   - `timelineFirstWindow=72h`
5. 因此 prompt debt 的下一层高价值已经从“继续堆 timeline 聚合”收口为“继续把 transcript/turn debt drill-down 与时间窗治理联动”，也就是让监督层能回答“哪些 transcript 债最该先清、是近期债还是旧债”。

## 2026-03-16 10:18:17（historical prompt debt transcript/session 清债优先级）
1. 只有时间窗还不够，监督层仍然无法直接回答“先清哪一个 transcript/session”。如果没有 transcript/session 级 priority，`inspect-prompt-debt` 依然会停在“知道债在哪一段时间里”，但不知道该先处理哪条债。
2. 当前更稳的产品化收口已经成立：`turn-prompt-debt-contained` 现已固定暴露 `historicalPromptDebtTranscriptSummary` 与 `historicalPromptDebtCleanupPriority`。前者回答“哪些 transcript/session 承载了多少债”，后者回答“哪些 transcript/session 该先清、为什么先清”。
3. 当前 priority 规则已经足够稳定可用：先按 freshest window 排序，再按 debtEventCount 增权。也就是先看 `24h/72h/7d/older`，同一时间窗内再看债务事件数量，而不是继续人工扫长 timeline。
4. 当前 fresh truth 已确认这层 transcript/session 清债治理有效：
   - `recommendedActions=[inspect-prompt-debt]`
   - `historicalPromptDebtTranscriptSummary count=3`
   - `historicalPromptDebtCleanupPriority count=3`
   - `firstTranscriptAgent=main`
   - `firstTranscriptWindow=Last 72h`
   - `firstPriority=P2/Next`
5. 因此 prompt debt 的下一层高价值已不再是继续扩聚合表，而是把 transcript/session priority 继续推进到 turn-level cleanup rules，明确“先清哪段 transcript、要不要修 prompt baseline、要不要归并成历史债归档”。

## 2026-03-16 10:57:48（prompt debt cleanup rules）
1. 只有 transcript/session priority 还不够，监督层依然需要人工把“优先级”翻译成“具体怎么清”。如果 cleanup priority 不能继续变成 cleanup rules，它仍然只是更漂亮的排序表。
2. 当前更稳的产品化收口已经成立：`turn-prompt-debt-contained` 现已固定暴露 `historicalPromptDebtCleanupRules` 与 `historicalPromptDebtTurnRules`。前者回答“这条 transcript/session 债该怎么清”，后者回答“应该落到哪一条 latest debt turn 去执行或验证”。
3. transcript 级规则现在已经收成少量稳定动作，而不是自由解释：
   - `rebaseline-prompt-baseline`
   - `queue-transcript-cleanup`
   - `archive-historical-debt`
   - `observe-only`
4. turn 级规则把 transcript 债与最新 debt turn 锚点显式连起来，避免监督层继续在 timeline 里人工定位“到底看哪一轮”。
5. 当前 fresh truth 已确认这层 cleanup rules 有效：
   - `recommendedActions=[inspect-prompt-debt]`
   - `historicalPromptDebtCleanupRules count=3`
   - `historicalPromptDebtTurnRules count=3`
   - `browserRunning=true`
   - `browserCdpReady=true`
   - `connectedNodeCount=1`
6. 因此下一层若继续推进，只有一种情况值得做：把 cleanup rules 继续变成真正的 cleanup execution/stop criteria；如果只是把规则表再拆细，就属于无用功。
## 2026-03-16 11:16:06（prompt debt execution / stop criteria）
1. cleanup rules 仍然不够，因为它们只回答“怎么清”，还没回答“现在先执行哪一步”和“到什么条件可以停止”。如果这两点不对象化，监督层仍然需要人工把规则翻译成动作和结束标准。
2. 当前更稳的产品化收口已经成立：`turn-prompt-debt-contained` 现已固定暴露 `historicalPromptDebtExecutionPlan` 与 `historicalPromptDebtStopCriteria`。前者回答“先做哪一步、先落 transcript 动作还是 turn 锚点动作”，后者回答“做到什么条件算这条债已经清完或可停止继续下钻”。
3. execution plan 已经收成少量稳定阶段，而不是自由解释：`Now / Next / Queue / Archive / Observe`。这保证后续如果要自动化，也只需要围绕少量稳定动作扩展，而不是再发明一套新的治理词汇。
4. stop criteria 也已经固定进入 authoritative truth，不再只是文档经验。当前 recent debt 的停止条件已明确要求“退出 24h/72h 窗口 + 无 live drift”，这直接改变了什么时候算清完的判断口径。
5. 当前 fresh truth 已确认这层治理有效：
   - `recommendedActions=[inspect-prompt-debt]`
   - `historicalPromptDebtExecutionPlan count=3`
   - `historicalPromptDebtStopCriteria count=3`
   - `firstExecution=E2/Next/rebaseline-prompt-baseline`
   - `firstStop=S2/P2`
6. 因此后续如果继续推进，只有一种情况值得做：把 execution plan/stop criteria 真正落成自动清理动作；如果做不到改变执行链，就不再继续细分监督面。
7. 2026-03-16 11:36:51 已验证当前并不存在可直接复用的真实清债原语：`openclaw sessions cleanup --all-agents --dry-run --json` 返回 `wouldMutate=false`，不会处理这批 `prompt debt` transcript。继续保留 `inspect-prompt-debt` 只会制造伪任务。
8. 因此当前更稳的产品判断已改为：近窗 historical prompt debt 若仅落在 `24h/72h`，且无 active prompt drift，则监督层应收口为 `deferred review + nextReviewAt`，而不是继续产出即时人工 recommendation。只有出现真正可执行 backlog，才重新恢复 prompt debt 推荐动作。
9. `deferred review` 如果只留在 truth JSON 里，监督面仍会出现“无动作但是 warn”的认知空档。已补 `Prompt Debt Review State` 前台摘要，把“当前不用处理、下一次何时再看”直接显示出来。

## 2026-03-16 12:29:53
1. `approval-defaults-ready / approval-socket-ready / status-queue-clean` 之前被 generic object supervision 吞掉时，会把三类不同根因压成同一条人工检查建议，导致排障顺序不稳定。
2. 当前更稳的收口已经成立：这三类 signal 现已各自拥有独立 recommendation 和 `Focused Inspection` evidence，只有在它们真的非 `ok` 时才值得进入 approval/status 排障。
3. fresh truth 已确认这三类 signal 当前全部 `ok`；因此后续若再出现运行问题，主判断应继续回到 browser/runtime，而不是在 approval/status 上做无效细分。

## 2026-03-16 12:56:03
1. 当当前活阻塞已经明确是 browser runtime 时，只在 `alerts/services` 里显示 `browserRunning/cdpReady=false` 仍然不够，因为这不能直接改变 recommendation 和 inspection 路径。
2. 当前更稳的产品化收口已经成立：`runtime-browser-ready` 已进入对象级监督主线，并单独产出 `inspect-browser-runtime` recommendation；同时保留 `heal-runtime` 作为自动恢复入口。
3. live `Focused Inspection` 也已补齐 browser 专用 evidence，当前稳定消费顺序已变成：
   - 先看 `Browser Runtime State`
   - 再看 `Browser Runtime Detail`
   - 最后看 `Browser Runtime Recovery`
4. fresh truth 已确认这条对象化有效：
   - `recommendedActions=[follow-recommendations, heal-runtime, inspect-browser-runtime]`
   - `runtime-browser-ready=warn`
   - `browserRunning=false`
   - `browserCdpReady=false`
   - `healRecommended=true`
5. 因此后续 triage 顺序已经变了：当 browser 是活阻塞时，先进 `runtime-browser-ready` 的对象证据与恢复面，不再先回头查 approval/status 或 prompt debt。

## 2026-03-16 13:08:00
1. 当前 vrplayer 并不具备“单馆单 URL 壳层”的基础行为：`handleRoute()` 只要命中 `scene`，就会先 `clearView()`，而 `clearView()` 会直接 `dispose()` 掉 `PanoViewer`、`SceneUiRuntime`、`viewerContainer` 和整棵场景 UI。这个生命周期天然会让热点切景表现成网页换页，而不是同一馆内连续漫游。
2. 现有渲染层并不是主要障碍。`PanoViewer.loadScene(scene)` 已经在一个 viewer 实例里完成“清旧 tile/fallback/geometry -> 加载新 scene”的热切逻辑，所以 MVP 不需要重写全景播放器，重点应该放在 App 壳层：保留 viewer 根实例、把场景切换改成壳层状态机、在 viewer 上方叠加 cover gate 和 transition overlay。
3. 现有数据源已经足够先做兼容式 MVP。虽然配置里还没有 GPT 任务书里的 `MuseumManifest.cover.brandLogos / Scene.preview / Scene.neighbors` 这些显式字段，但当前已有 `museum.cover`、`museum.description / marketing`、`scene.thumb`、`scene.panoLow / panoTiles`、`scene.hotspots.target.sceneId`，足以先派生 cover 文案、过渡预览和相邻场景预热。
4. 现有路由也已经是 SPA 形式，`navigateToScene()` 走 `pushState + popstate`，所以“URL 深链 + 返回键回上一个 scene”并不需要重做路由器；真正要修的是：`museum` 路由不能再立刻重定向到 entry scene，而应先进入 cover gate；同一 museum 内的 `scene` 切换要变成浅更新驱动的壳层状态变化。
## 2026-03-16 13:25:04
- 第二阶段 supervision 线的 stop criteria 已正式对象化：
  - `summary.phaseReadiness`
- 当前封版条件已满足：
  - runtime blocker cleared
  - control-plane blocker cleared
  - object blocker cleared
  - 仅剩 `turn-prompt-debt-contained + deferredReview`
- 因此后续不再继续做 supervision 面细分；继续做这条线只会回到无用功。

## 2026-03-16 13:32:05
1. 18891 live server 的真实根因不是模板没改进去，而是旧进程会在 `/api/ping` 中读取磁盘上的最新文件 mtime，导致 launcher 误以为旧进程已经加载了新代码。
2. 正确修复不是继续手工重启记忆，而是把“进程启动时加载的脚本版本”正式对象化。当前稳定口径已改为：
   - `startupScriptMtimeUtc`
   - `startupScriptSha256`
3. `oc-supervise-live.ps1` 现在按 startup fingerprint 和 `stateVersion=3` 判断是否复用旧进程；后续若页面 HTML 没吃到新模板，先看 `/api/ping` 的 startup fingerprint，不再信磁盘 mtime。

## 2026-03-16 13:56:27（museum shell gate + same-canvas reuse）
1. 当前馆内“像换页而不是同馆连续漫游”的根因已经被正面消掉了：不是渲染器不会热切，而是 `App.handleRoute()` 过去会在每次命中 `scene` 时先 `clearView()`，从而销毁 `viewerContainer / PanoViewer / SceneUiRuntime`。现在同馆切景不再默认走这条销毁链。
2. `museum-only route` 的产品语义也已经收紧：`?museum=<id>` 不再自动重定向 entry scene，首次 deep link `?museum=<id>&scene=<id>` 也不再绕过馆级入口，而是统一先显示 cover gate，再用 CTA 进入目标场景。这让“馆级封面、品牌氛围、用户确认进入”第一次变成正式路由行为，而不是临时页面技巧。
3. 同馆切景现在已经不只是“看起来平滑”，而是有对象级运行规则：同馆且 URL 未显式给 `yaw/pitch/fov` 时，复用同一 viewer shell 并保留当前视角；如果 URL 明确带了相机参数，则仍复用 shell，但要重置到目标视角。这样既保住了连续漫游，也保住了 deep link 的精确定位能力。
4. 这轮最值钱的不是新 UI，而是把同馆切景从“重新 mount 一整页”改成“同一 shell 内切换 scene”。本地 DevTools 取证已经确认 `south_gate -> west_room_1` 时 `canvas` 仍是同一个 DOM 节点，所以后续若再出现馆内黑屏/重建感，优先回查是否又回到了无条件 `clearView()`。

## 2026-03-16 14:06:20（museumShellState 缺失文件与 Node ESM 扩展名）
1. 本轮真实故障不是 museum shell 策略判断错误，而是 `src/app/museumShellState.ts` 根本缺失，导致 `main.ts` 和 `museumShellState.test.ts` 同时悬空。也就是说，之前这组策略在仓库里属于“调用点已经存在，但状态层实体没落盘”的不完整状态。
2. 构建与测试的故障表现还分成了两层：补文件后，`npm run build` 立即恢复，但 `node --test` 仍会因为 Node ESM 不补扩展名而在运行时报 `ERR_MODULE_NOT_FOUND`。这说明当前仓库里凡是被 Node 直接加载的 `.ts` 状态模块，都必须按 Node ESM 口径写显式 `.ts` value import，不能只按 Vite 解析习惯省略扩展名。
3. 当前更稳的产品化收口已经成立：museum shell 的四个关键决策函数已进入 `src/app/museumShellState.ts`，且实页验收再次确认三条核心不变量同时成立：
   - `?museum=linzexu` 先出馆级 cover gate
   - fresh `?museum=linzexu&scene=west_room_1` 也先出馆级 cover gate
   - 同馆切到 `east_room_1` 时 `sameCanvas=true`
4. 因此后续若这条主线再出问题，第一优先应检查的是“状态层文件/Node ESM import 规则是否完整”，而不是重新怀疑 museum shell 的产品策略本身。
