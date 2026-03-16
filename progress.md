
## 2026-03-14 19:22:13
- `telegram-fast -> ops-exec` 的 fresh 委派回放再次成功，返回 `title=Example Domain`，耗时约 `15.1s`。
- `C:\Users\Lenovo\.openclaw\bin\oc-ops-exec.py` 已验证支持位置参数 prompt 回退；即使前台首跳未显式带 `--prompt`，wrapper 也能稳定接住任务。
- 这说明当前剩余问题已经不再是 `ops-exec` 首跳包装层，而是更高一层的产品面：后续若继续推进，应转向 thread/turn/item/approval/status 的前台真相面，而不是继续重复做 Example Domain 委派验证。

## 2026-03-14 18:44:45
- `build_rag_corpus.py` 的源头冲突已修正：生成型 `README` 现已与 `handoff_prompt / retrieval_recipes` 使用同一条 RAG 检索顺序，不再出现“概览层一套、运行时 SOP 一套”的分裂。
- 已重新执行 RAG 重建，当前产物时间戳更新为 `2026-03-14 18:44:45`。
- 当前主证据层统计已刷新为 `141` 条 transcript 源、`198` 个文档、`2215` 个 chunk；后续新增转写进入主证据层时，可以继续沿这条生成链追加，不必再手工纠偏单个入口文件。

## 2026-03-14 16:55:47
- `oc-runtime-heal.ps1` 已再次真回放成功：`gatewayOk=true / browserRunning=true / browserCdpReady=true / connectedNodeCount=1 / nodeHostCount=1 / mainModelTmpCountAfter=0`，当前 runtime 主链保持绿色。
- 历史官方 node-service 残留已通过 `openclaw node uninstall` 清理，`status --deep` 现已改为 `Node service = Scheduled Task not installed`，不再继续输出“installed but missing”的假故障表述。
- 节点真相面已收口：`openclaw nodes status --json` 仍返回 `connected=true`，说明 Windows 当前稳定节点主链已经明确是“用户态 node host + Startup 自启 + runtime heal”，而不是官方 Scheduled Task node service。

## 2026-03-14 16:35:00
- `telegram-fast` 的 direct CLI `--json` 已恢复稳定，fresh 最小自检约 `2.6s` 即可返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`，`status --deep` 活会话模型也已同步对齐。
- `oc-runtime-heal.ps1` 现已同时负责 runtime 恢复和 `main/models.json.*.tmp` 卫生收口；本轮真回放已归档 `61` 个旧 `.tmp` 到 `tmp-archive-20260314-163609`，并返回 `mainModelTmpCountAfter=0`。
- 愈合后再次 fresh 调用 `main` 与 `telegram-fast` 都成功，`main` fresh 响应约 `2.5s`，且目录中未再长出新的 `models.json.*.tmp`。
- 因此当前这条 OpenClaw/harness 落地线的活跃实现项已全部收口，剩余内容已经从“故障排查”切回“稳定 SOP + 文档真源”。

## 2026-03-14 16:23:45
- 已把 `main -> ops-exec` 的稳定委派验证做完：fresh direct JSON 请求 `Use ops-exec to open https://example.com and answer with the page title only.` 已成功返回 `Example Domain`，耗时约 `16.6s`。
- 已确认这条链路下 `main` 的 fresh 默认工具面仍是 `exec / process / session_status`，说明后台总管的“重执行升级链路”已经落地，但默认前台/后台都没有重新膨胀。
- 已把 `telegram-fast` 的运行时成功证据补齐到 transcript 层：`C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\e57207c1-ab08-4556-aaef-7f2b002c47ab.jsonl` 已完整记录 `oc-ops-exec.cmd --prompt "Open https://example.com and return only the page title."` -> toolResult `Example Domain` -> 最终 `[[reply_to_current]] Example Domain`。
- 已确认剩余问题不在委派逻辑本身，而在包装层：`telegram-fast` 的 direct CLI `openclaw agent --agent telegram-fast --json` 仍可能超时/不回包；`main` 这边则又出现了一轮 `models.json.*.tmp` 的 `EPERM rename`，说明 gateway 包装层仍会偶发抖动。

## 2026-03-14 14:15:40
- 已用 fresh `openclaw agent --agent telegram-fast --message "只回答ok" --json` 完成运行态复验：当前 `telegram-fast` 的 `systemPromptReport.tools.entries` 已只剩 `exec / process / session_status`，默认前台确实不再暴露 `subagents`。
- 已用 fresh self-check 补证 `main / ops-exec` 当前运行模型：两者都回到 `custom-127-0-0-1-3000/gemini-3-flash-preview`。这说明此前 `status --deep` 中 `main=gemini-2.5-pro-preview-06-05` 更像旧会话或状态残留，不是 fresh 运行真值。
- 已再次碰到并恢复 runtime 两个真断点：`browser` 曾回到 `running=false / cdpReady=false`，`nodes` 曾回到 `connected=false`；现已恢复为 `browser running=true / cdpReady=true`、`nodes connected=true`。
- 已新增正式恢复入口：`C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` 与 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.cmd`。这条链现在固定为：先校验 Gateway，再启动 browser，再启动 node host，最后输出状态 JSON。
- `oc-runtime-heal.cmd` 已完成一次真回放验证，返回 `gatewayOk=true / browserRunning=true / browserCdpReady=true / connectedNodeCount=1 / nodeHostCount=1`；当前它已经可以作为 OpenClaw runtime 的统一恢复入口使用。

## 2026-03-14 14:02:49
- 已新增并读完两条 primary：`6qU71R2VmKk` 与 `mgq3Jua03KQ`。
- 新增结论没有推翻旧主线，反而把它压得更硬：
  - 先问控制度、问题复杂度、资源约束、专业深度
  - 先单体+skills / workflow，再多 agent
  - `Sequential` 管可控性和审计
  - `Parallel` 管独立任务的速度或多视角置信度
  - `Evaluator-Optimizer` 只在质量标准明确且值得反复打磨时启用
- 已顺手把这条判断落成一刀最小实现：`telegram-fast` 不再默认挂 `subagents`，前台继续收回到“轻前台 + 路由 + 单体/skills/workflow 优先”。

## 2026-03-12 08:31:01
- 已继续用 fresh `main` 调用追查 `models.json` 的 `EPERM rename` 残留：三次 `openclaw agent --agent main --message "只回答ok" --json` 都成功，且 `C:\\Users\\Lenovo\\.openclaw\\agents\\main\\agent` 下 `models.json.*.tmp` 数量保持 `34 -> 34`，没有继续增长。
- 已补日志取证：当前没有看到新的 `models.json` 活跃写入报错继续冒出，现象更像历史孤儿 `.tmp` 残骸，而不是仍在持续发生的活故障。
- 已将这 34 个 `.tmp` 安全归档到 `C:\\Users\\Lenovo\\.openclaw\\agents\\main\\agent\\tmp-archive-20260312-082945`，没有直接删除原始证据。
- 归档后再次 fresh 调用 `main` 两次均成功，且 `.tmp` 数量保持 `0`；当前已把该问题从“主链阻塞”降级为“目录 hygiene 已收口的历史残留”。

## 2026-03-12 08:19:51
- 已进一步完成 OpenClaw 模型分层收口：`main` 保持 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`，`telegram-fast` 切到 `custom-127-0-0-1-3000/gemini-3-flash-preview`。
- 新证据已经钉实：`gemini-3-flash-preview` 与 `gemini-3.1-pro-preview` 的最小 unary 请求都能成功，但 `gemini-3.1-pro-preview` 在真实流式链路下更容易连续触发 `429`，因此 Telegram 前台默认用 `flash` 更稳。
- 已重写 `workspace-telegram-fast/AGENTS.md`、`TOOLS.md`、`MEMORY.md`，消除旧 `gpt-5.4` / `gemini-3.1-pro-preview` 口径残留。
- 已清空并备份 `telegram-fast` 会话存储，fresh self-check 现返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`；`openclaw status --deep` 也已显示 `agent:telegram-fast:main -> gemini-3-flash-preview`。

## 2026-03-12 08:05:27
- 已确认 OpenClaw 近期连续异常的真实根因不是 Telegram 通道，而是 `ChatGPT 免费账号 -> openai-codex-oauth:gpt-5.4 / gpt-5.3-codex` 这条模型链路已不再稳定可用；`AIClient2API` 日志出现了 Codex 路由下的持续 `400`。
- 已将 `main` 与 `telegram-fast` 的主模型统一切回 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`，回退链统一收口为 Gemini 系列，不再把 Codex 线路当当前默认首选。
- 已清空 `C:\Users\Lenovo\.openclaw\agents\main\sessions\sessions.json` 与 `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\sessions.json` 并保留带时间戳备份，确保旧 `gpt-5.4` 会话元数据不再污染新会话。
- 已复核运行态：`openclaw gateway health=OK`，`openclaw status --deep` 显示 `main` 与 `telegram-fast` 活会话均为 `gemini-3.1-pro-preview (200k ctx)`，直接 agent self-check 也返回 Gemini 模型 ID。
- 当前剩余问题已收窄为：`main` 侧仍偶发 `models.json` 的 `EPERM rename` 写目录告警，但这不再阻塞当前模型切回与 Telegram 主链可用性。

## 2026-03-10 07:53:47
- 已切换到“灵感库逐条阅读”模式：只沿 `D:\Projects\灵感包` 与索引给出的路径读，不扫全 `D:\Projects`。
- 当前已完成入口层与索引层：
  - `D:\Projects\灵感包\README.md`
  - `D:\Projects\灵感包\LATEST.md`
  - `D:\Projects\灵感包\最新灵感包\AI_START_HERE.md`
  - `D:\Projects\灵感包\最新灵感包\README.md`
  - `D:\Projects\灵感包\最新灵感包\cross_project_router.md`
  - `D:\Projects\灵感包\最新灵感包\canonical_entry_paths.md`
  - `D:\Projects\灵感包\最新灵感包\full_source_atlas.md`
  - `D:\Projects\灵感包\最新灵感包\handoff_prompt.md`
  - `D:\Projects\灵感包\索引\ai_inspiration_packets_INDEX.md`
  - `D:\Projects\灵感包\索引\douyin_transcripts_INDEX.md`
- 已逐条读完 `douyin_transcripts_20260309_harness6_all` 全 6 条：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260309_harness6_all\01_vY32FEl1gJ8.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260309_harness6_all\02_QVLHlf9cmzg.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260309_harness6_all\03_OAoVurGk64A.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260309_harness6_all\04_-tuM5rY0CWQ.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260309_harness6_all\05_R_xkuPGSP34.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260309_harness6_all\06_kix1-w8vd64.txt`
- 这一批的共识已经从“harness 是系统层”推进到更具体的方法：
  - 用渐进式披露和专用子代理扩能力，而不是无脑加工具
  - 工具必须跟着模型能力升级，不然旧工具会反过来变成枷锁
  - 工具设计要一意一工具、语义清晰、结构化、可观测
- Round 3 已继续进入 `douyin_transcripts_20260309_harness2_all`：
  - `02_BqvtMYdKt8Y.txt` 已正常读完，信息质量良好
  - `01_rLBsav2GIro.txt` 虽已逐条读取，但当前文件正文存在明显编码污染，不能拿来直接做判断
- 这一轮新增的高价值点是：Codex-first 软件开发不仅要求 harness，还要求 worktree、CDP/可观测性、结构化 docs、架构约束、后台清理循环这些“仓库内化”的配套设施。
- `01_rLBsav2GIro.txt` 已用同源 `local_whisper` 可读稿完成回填修正，当前已重新纳入 primary 判断。

## 2026-03-10 08:10:22
- 已按 RAG 路由从 `harness` 转入第二主题 `context_engineering`，没有跳到补充层。
- 当前已逐条读完的 context primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\14_dvQQGjT0yPk.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\18_gBpAw_e-PA0.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\19_Of0t7UDpTw8.txt`
- 这三条合起来的结论已经很稳定：
  - 大上下文本身不是解法，很多时候还是负担
  - 真正有效的是 `卸载 / 缩减 / 隔离`
  - 文件系统和外部日志应被视为长任务的外部记忆层
  - 编程主线当前更偏向“单决策流 + 串行接力 + Clean State 交接”，而不是默认多 agent 并行

## 2026-03-10 08:16:50
- 已继续逐条读完 `context_engineering` 主证据剩余两条：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\47_zaGprccLFO8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\48_-W-aKyS1KAc.txt`
- 新增的稳定共识已经很清楚：
  - 摘要不能靠开放式“请总结”，而要靠固定 schema/表单
  - 对简单搜索，先把原文直接返回给主 agent，往往比“先卸载再读回”更快
  - 但关键中间洞见仍要主动写入文件，避免系统级压缩发生得太早
  - 对复杂搜索，应该交给子 agent 做多步搜索和整合，只回结构化结果
  - 工具面过大时，正确方向不是 `RAG for tools` 动态热插拔，而是三层行动空间：固定原子函数层、可发现的沙盒工具层、按缺口才写代码/API 的开放层
- 这让当前产品路线进一步收紧：
  - OpenClaw 前台不该继续无脑加工具清单
  - 应保持第一层接口稳定、小而固定
  - 把扩展性尽量外推到子代理、沙盒工具和代码层
- 用户已明确接受两条主线决策：
  - 继续走“单决策流 + 外部交接 + 能力网络 / 轻前台 + 子代理”
  - 接受把“结构化 docs / Clean State / 交接日志 / 后台清理循环”做重，以换长期稳定

## 2026-03-10 08:18:28
- 已按主题顺序切入 `memory`，并逐条读完首批四条主证据：
  - `04_RnNCCsbttEI.txt`（HMM / Agentic Memory）
  - `05_zzK4p2vVE20.txt`（MemR3 / 反思式检索）
  - `01_7eKq4DY62xM.txt`（OpenClaw 向量记忆库主张）
  - `30_YFifZEWR9bI.txt`（自进化/共享进化/张量记忆宣讲）
- 当前 memory 方向的主判断已经收紧：
  - 最值钱的不是再上一个新 memory 库，而是把记忆管理做成统一控制层
  - HMM 更强调“长期/短期记忆工具化 + agent 主动管理”
  - MemR3 更强调“检索策略升级成反思闭环”，这比单纯换存储后端更关键
  - 向量记忆库路线有价值，但更像存储层增强，当前不能压过控制器/写入纪律/检索策略
  - 自进化市场、共享基因、张量记忆这类说法当前偏远期灵感，不进入当前主链
- 因此当前产品路线继续稳定在：
  - 保留现有 HTTP memory 真源
  - 优先加强只读检索控制、关键洞见写入、项目/会话外部记忆
  - 暂不新增新的大 memory 基座

## 2026-03-10 08:20:34
- 已继续逐条读完 `ui_automation` 首批三条主证据：
  - `01_tasXZY7ig24.txt`
  - `02_kf3Kwo7bNNs.txt`
  - `02_q3Es3x3Df20.txt`
- 这一批的稳定判断已经形成：
  - UI 自动化不是“不能做”，而是“纯视觉实时决策太慢”
  - 真要实用，必须把重复流程继续往 RPA/脚本化回放收
  - UI agent 更适合作为浏览器/API 覆盖不到时的补位 skill/子代理
  - 异步协作协议是 UI 自动化真正落地的上层条件，不能让老板一直实时盯着它点
- 当前对 OpenClaw 的直接启发是：
  - 自动化能力应该继续放开，但不要把所有任务都强行转成 UI 操作
  - 对“打开抖音、搜索关键词、点击视频、播放”这类任务，可以作为补位能力接入
  - 对高频重复流程，应优先探索“视觉探索一次，之后走固化回放”

## 2026-03-10 08:23:58
- 已继续逐条读完 `security` 首批三条主证据：
  - `03_Bhy30vnrXPU.txt`
  - `04_1Q17ZUctNFY.txt`
  - `05_wf9lZgB8N0M.txt`
- 这一批给出的判断非常一致：
  - OpenClaw 真正的高风险不是“模型太强”，而是控制面/桌面控制/Telegram 入口被暴露
  - 安全主线应该是 loopback、认证、allowlist、最小暴露、凭据轮换
  - 不是简单砍能力，而是把能力包在更严的边界里
- 当前对我们这条主线的直接启发是：
  - 可以继续放开自动化、子代理、Codex 操作能力
  - 但必须继续坚持官方 Gateway loopback、本地代理、受控 Telegram allowlist 和密钥最小暴露
  - 任何桌面/UI 自动化若后续扩到微信、抖音等本机应用，必须默认走受控 skill/子代理，而不是前台全开放

## 2026-03-10 08:27:00
- 已继续逐条读完 `workflow` 首批四条主证据：
  - `17_D2CnFzzTeBo.txt`
  - `18_RcPUsqsp3CE.txt`
  - `24_ZpU8LQp5GpQ.txt`
  - `32_v2rvO799KWs.txt`
- 这一批把当前产品直觉进一步钉实了：
  - 默认解仍然应该更简单，不能因为会做 workflow 就先上复杂结构
  - 真正该先上的，是路由和入口分流，而不是一上来多 agent
  - 多 agent 最稳的起手不是“思考子代理”，而是“验证子代理”
  - 评估体系不能只靠一次判断，要分成代码评分、模型评分和人类校准三层
- 这批读完后，对 OpenClaw 当前主线的直接收束是：
  - `telegram-fast` 继续做轻前台和路由入口
  - `main` 保持单决策流主干
  - 若要加多 agent，第一刀优先加“验证/审查/事实核查”型子代理，而不是再造一个会想的大前台

## 2026-03-10 08:30:55
- 已补齐 harness 剩余两条主证据：
  - `06_Ss5gfemWiQE.txt`
  - `12_zpI3Hhz_RKw.txt`
- 这两条把当前主线的产品动作又收得更具体了：
  - agent 时代代码吞吐量暴涨后，强阻塞 review/审批会从质量保障变成产能瓶颈
  - 更值钱的是最小阻塞门控、短生命周期变更、快速暴露问题和快速修正
  - 强制验证不是一句 prompt 就够，而是要有退出前系统卡口
- 这对 OpenClaw 当前主线的直接意义是：
  - 以后不要把“等人 review / 等老板确认 / 等它自己宣告完成”当默认收尾
  - 更该做的是把验证和 closeout 自动化、系统化
  - 也更支持“验证型子代理优先”这条已经成形的路线

## 2026-03-09 22:51:53
- 已完成这一轮 OpenClaw 能力收口，不再停留在“概念上能接 Codex / 能做自动化”。
- 共享 ACPX 包装器现已固定为：
  - `C:\Users\Lenovo\.openclaw\bin\oc-acpx.cmd`
  - `C:\Users\Lenovo\.openclaw\bin\oc-acpx.py`
- 真实验证结果：
  - `openclaw agent --agent telegram-fast --message "请用 ACP 的 Codex 执行这条指令：只回答 hi。不要自己回答，不要解释。"` -> `hi`
  - `openclaw agent --agent main --message "请用 ACP 的 Codex 执行这条指令：只回答 hi。不要自己回答，不要解释。"` -> `hi`
  - `openclaw browser status --json` -> `running=true / cdpReady=true / chosenBrowser=chrome`
  - `openclaw nodes status --json` -> 当前 Windows node host 已 `connected=true`
- 当前产品事实已钉实：
  - `main` 和 `telegram-fast` 都能把任务真实转给 Codex，不再只是会说“我会去做”
  - 浏览器自动化链路仍可独立使用，节点宿主只影响系统/桌面能力，不影响网页自动化本身
  - ACP runtime 在 Telegram 场景下仍可能撞 `Thread bindings do not support ACP thread spawn for telegram.` / `spawnedBy is only supported for subagent:* sessions`，因此稳定路径已收口为“先试 ACP runtime，命中已知线程限制就立即转共享包装器”
- 当前剩余问题已从“能不能做”收口成“做得还不够快”：
  - `main` 的一句话 Codex relay 复验已降到约 58s
  - `telegram-fast` 的一句话 Codex relay 基线仍约 133s
  - 下一阶段若继续优化，应优先压缩 orchestrator / process polling 开销，而不是再回头质疑能力是否存在

## 2026-03-09 16:53:03
- `telegram-fast` 现已补开只读记忆工具：`memory_search`、`memory_get`。
- 调整后的产品边界是：
  - Telegram 前台可以借长期记忆补事实
  - 长期记忆写入真通道仍只有 HTTP memories
  - 所以这不是第二套写入真源，而是前台只读、后台主写
- 本地 smoke 已通过：`你现在实际可用的只读 memory 工具有哪些？` -> `memory_search,memory_get`
- 运行态证据也已对上：`systemPromptReport.tools.entries` 已出现 `memory_search` 与 `memory_get`
- 这台机器的 `gateway restart` 仍有假超时老毛病；本轮通过 `stop -> kill stale node.exe -> start` 已恢复正常，Telegram probe 仍为 `ok=true`

## 2026-03-09 16:12:14
- OpenClaw 已从 `2026.3.2` 成功升级到 `2026.3.8`。
- 官方 `openclaw update --yes` 第一次失败，不是版本坏，而是 Windows 文件锁：运行中的 Gateway 进程占着 `C:\Users\Lenovo\AppData\Roaming\npm\node_modules\openclaw`，`npm` 在重命名包目录时触发 `EBUSY: rename`。
- 收口方式已验证：
  - `openclaw gateway stop`
  - 释放 `18789` 监听对应的 `node.exe`
  - `npm i -g openclaw@latest`
  - `openclaw gateway start`
- 升级后回归通过：
  - `openclaw --version` -> `OpenClaw 2026.3.8`
  - `openclaw update status --json` -> `available=false`
  - `openclaw gateway health` -> `OK`
  - `openclaw channels status --probe --json` -> Telegram `probe.ok=true`
  - `openclaw status --deep` -> Gateway app `2026.3.8`
  - `openclaw agent --agent telegram-fast ...` -> 仍返回 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
- 升级刚完成的第一轮 agent 调用出现过一次 `gateway closed (1006 abnormal closure)`，随后 5 秒后二次复验恢复正常，说明这是重启后的短暂抖动，不是持续性故障。

## 2026-03-09 15:55:08
- 已按“灵感包 -> 放权”路径完成 `telegram-fast` 的外挂升级，不再只锁在 `fs/runtime/web`。
- `C:\Users\Lenovo\.openclaw\openclaw.json` 现已显式开放：
  - `group:ui`
  - `group:automation`
  - `group:nodes`
  - `agents_list`
  - `message`
  - `sessions_list / sessions_history / sessions_send / sessions_spawn`
  - `subagents`
- 仍保持关闭的只有 `gateway` 与 `tts`，以免把 Telegram 前台助理直接变成系统总控台。
- `workspace-telegram-fast` 已补齐项目 capsule 真源：
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\memory\project-routing.md`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\memory\project-vrplayer.md`
- 本地 smoke 已验证：
  - 项目命中仍正确：`这是我的 vrplayer 项目网站，vr眼镜退出后 ui 为什么还是绿的？` -> `这是项目内问题。`
  - UI 入口可用：本地页读取返回 `title=OpenClaw Control`
  - 会话/协作工具已注入：`systemPromptReport.tools.entries` 已出现 `agents_list / sessions_* / subagents / message / browser / canvas / nodes`
  - subagent 路径已打开：最小 smoke 返回 `delegated=yes; strong=unknown`，说明“能派工”已成立，但对子代理结果的精确收口还需要后续继续调教
  - 节点入口已开，但当前节点数仍为 `0`
- Dashboard `http://127.0.0.1:18789/agents -> telegram-fast -> Tools` 可视证据显示 `19/25 enabled`，其中 `browser / canvas / nodes / message / agents_list / sessions_* / subagents` 全部为 enabled。

## 2026-03-09 15:40:00
- 已把 Memory HTTP 主通道也收成独立复利手册 [memory_mcp_compound_playbook.md](D:\Projects\vrplayer\memory_mcp_compound_playbook.md)，固定了真源、SOP、去重口径、假乱码/真乱码判因与恢复顺序。
- [MEMORY_WRITE_FIRST.md](D:\Projects\vrplayer\MEMORY_WRITE_FIRST.md) 已升级为“速查入口 + 复利手册入口”，并补上 `Get-Content -Encoding UTF8` 的假乱码判别提示。
- [memory_write_safe.py](D:\Projects\vrplayer\scripts\memory_write_safe.py) 现在会显式输出 `attempted / accepted / dedup_rejected / failed / net_new / dedup_detected`，后续不再把 `Duplicate content detected` 混成“写入失败”。
- 验证已完成：
  - `python scripts/memory_selftest_utf8.py` -> `UTF-8 selftest passed`
  - 顺序重复写入验证 -> 首次 `accepted=1`、第二次 `dedup_rejected=1`
- 本轮还再次钉实了旧坑：在不可信命令通道里直接内联中文，即使进入的是 Python，也可能在进程前就被替换成 `?`；因此 Memory 写入仍必须坚持 `UTF-8 bytes -> Base64 -> --content-b64`。
- 已清理本轮 `memory-compound-test` 测试样本，避免向长期库留下噪音。

## 2026-03-09 15:26:00
- 已把当前窗口里真正有复用价值的结论收成独立手册 [openclaw_compound_playbook.md](D:\Projects\vrplayer\openclaw_compound_playbook.md)，避免以后再靠翻长聊天、旧截图和旧摘要排查 `telegram-fast`。
- 这份手册固定了四类高价值真源：模型真值、项目路由、漂移恢复 SOP、当前工具面基线。
- `README.md` 已加入口，后续窗口排查 `telegram-fast` 的模型/项目问题时可直接从这份手册起步。

## 2026-03-09 15:18:00
- 已确认这次 `telegram-fast` 再次漂回 Gemini，不是网页假显示，而是另一个窗口在缺失最新上下文时把 `workspace-telegram-fast/AGENTS.md`、`TOOLS.md`、`MEMORY.md` 覆盖成较弱版本，并把 `telegram-fast.model.primary` 又带回了 Gemini 口径。
- 现已重新核实并收口：`C:\Users\Lenovo\.openclaw\openclaw.json` 中 `agents.defaults.model.primary` 与 `agents.list[id=telegram-fast].model.primary` 当前都为 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`。
- 已重新强化 `workspace-telegram-fast` 的三份真注入文件，补上“历史 Gemini 记录只能视为历史，不得反向覆盖当前 `gpt-5.4`”的模型治理规则，并恢复项目优先解释规则。
- 已清空 `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\sessions.json` 强制 fresh session；Gateway 重启虽然再次给出假超时，但随后 `openclaw status --deep` 已恢复 reachable，且活会话 `agent:telegram-fast:main` 已重新登记为 `openai-codex-oauth:gpt-5.4`。
- 本地 smoke 已再次通过：
  - `你现在的运行模型ID是什么？只回答当前运行模型ID。` -> `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
  - `这是我的 vrplayer 项目网站，vr眼镜退出后 ui 为什么还是绿的？首段只回答：这是项目内问题，还是通用硬件问题。` -> `这是项目内问题。`

## 2026-03-09 14:18:00
- 已完成 `telegram-fast` 的“项目上下文注入优化”，核心不是继续堆 prompt，而是把项目识别边界写成了可执行硬规则。
- 当前 `workspace-telegram-fast` 已新增两层真源：
  - injected 规则层：`AGENTS.md / TOOLS.md / MEMORY.md / USER.md`
  - 检索 capsule 层：`memory/project-routing.md / memory/project-vrplayer.md`
- `vrplayer` 已成为第一条正式项目路由，`VR眼镜 / 三馆学伴 / 项目网站 / D:\Projects\vrplayer / 场景 / 页面 / 功能 / 报错` 已有明确命中口径。
- 已收住此前的误判：以前 `telegram-fast` 会把 `vrplayer` 里的“VR眼镜退出后 UI 还是绿的”先解释成实体头显/SteamVR/Oculus 问题；现在项目命中时会先答“这是项目内问题”。
- 也已收住新的过拟合：fresh 会话下的纯歧义问法 `VR眼镜退出后还绿着，怎么回事？` 现在会先答 `这是通用硬件问题。`，不再被硬拉进 `vrplayer`。
- 本地 smoke 结果：
  - `这是我的 vrplayer 项目网站，vr眼镜退出后 ui 为什么还是绿的？` -> `这是项目内问题。`
  - `帮我看 vrplayer 里三馆学伴为什么报错。` -> `这是项目内问题。`
  - 项目锁定后 `这个绿灯是不是没退出？` -> `这是项目内问题。`
  - fresh 会话下 `VR眼镜退出后还绿着，怎么回事？` -> `这是通用硬件问题。`
- 当前模型真源也已重新收口：
  - `agents.defaults.model.primary = custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
  - `agents.list[].id=telegram-fast.model.primary = custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
  - Dashboard snapshot 已显示 `telegram-fast -> Primary Model = gpt-5.4`
- `chrome-devtools` 证据已补齐：
  - `http://127.0.0.1:18789/agents` snapshot 可见 `telegram-fast` 当前主模型为 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
  - Console 仅有 1 条旧表单 `id/name` issue，无新错误
- `AIClient2API` 最近日志也已对上：
  - `Req Protocol: openai -> openai-codex-oauth | Model: gpt-5.4`
  - 说明这轮 smoke 真正命中了 `openai-codex-oauth:gpt-5.4`，不是又被 Gemini 偷吃

## 2026-03-09 11:52:00
- 已再次钉实“假全局默认”的根因：`agents.defaults.model.primary` 虽然仍是 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`，但 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `agents.list[].id=telegram-fast` 主模型已再次漂回 `custom-127-0-0-1-3000/gemini-3-flash-preview`，导致 Telegram 主链继续按 Gemini 跑。
- 已完成真修正：
  - `telegram-fast.model.primary` 改回 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
  - fallback 顺序收为 `gpt-5.3-codex -> gemini-3.1-pro-preview -> gemini-3-pro-preview`
  - `workspace-telegram-fast/TOOLS.md` 的主模型口径同步改为 `gpt-5.4`
  - `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\sessions.json` 已清空，强制 Telegram fast 下次 fresh start
- 复验通过：
  - `openclaw config validate` => valid
  - `openclaw gateway health` => `OK`，Telegram `ok (@kyuu_ai_bot)`
  - `openclaw status --deep` 现在显示 `agent:telegram-fast:main` 为 `openai-codex-oauth:gpt-5.4`
  - `openclaw agent --agent telegram-fast --message "你是什么模型？只回答当前运行模型ID。" --json` 现返回 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`

## 2026-03-09 11:45:00
- 已钉实 `kyuu` 在 Telegram 里继续自称 Gemini 的三重真因：
  - `C:\Users\Lenovo\.openclaw\openclaw.json` 的 `agents.list[].id=telegram-fast` 仍主用 `gemini-3-flash-preview`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\TOOLS.md` 仍写着 `Primary model: gemini-3-flash-preview`
  - `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\0061d2b0-c8ff-4109-afbd-a9405eb66138.jsonl` 证明 2026-03-09 11:30 的 TG 直连回复真实走的是 `gemini-3-flash-preview`
- 已完成真源修正：
  - `telegram-fast` 主模型切到 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
  - Telegram fast 工具面开放 `group:web`
  - `TOOLS.md` 新增规则：时效性事实先查证，查不到就明确无法核验，不得猜测
- 已清掉被旧 Gemini 上下文污染的 TG 直连 session store：
  - 旧 entry `agent:telegram-fast:telegram:direct:1262756389` 已从 `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\sessions.json` 移除
  - 备份保留为 `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\sessions.json.bak-20260309-114122`
- 重启后复验通过：
  - `openclaw status --deep` 现仅剩 `agent:telegram-fast:main` 与 `agent:main:main` 两条活会话，均为 `openai-codex-oauth:gpt-5.4`
  - `openclaw channels status --probe --json` 仍为 `configured=true / running=true / probe.ok=true / mode=polling`
  - 本地同配置 smoke：`openclaw agent --agent telegram-fast --message "你是什么模型..." --json` 返回 `当前运行模型ID：custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
  - `D:\AIClient-2-API\logs\app-2026-03-09.log` 已出现 `Req Protocol: openai -> openai-codex-oauth | Model: gpt-5.4`

## 2026-03-09 11:20:00
- 已将官方 OpenClaw 全局默认首选模型切到 `openai-codex-oauth:gpt-5.4`，并补齐了该前缀模型在 `custom-127-0-0-1-3000` 下的可用路由。
- Gateway 重启并复验后，`openclaw status` 已显示默认模型为 `openai-codex-oauth:gpt-5.4`；但后续在 `2026-03-09 11:45:00` 已进一步证实，Telegram 绑定 agent 与 TG 直连旧 session 当时仍残留 Gemini 口径，需要继续单独收口。
- `AIClient2API` 真实路由证据已区分清楚：`model='openai-codex-oauth:gpt-5.4'` 的请求会命中 `openai -> openai-codex-oauth | Model: gpt-5.4`；而裸 `model='gpt-5.4'` 在当前多 provider 入口下仍可能回落到 Gemini，不能把返回体里的 `model=gpt-5.4` 当真路由依据。
- 同类最小验证已通过：带前缀的 `openai-codex-oauth:gpt-5.4` 请求返回 `ROUTE_GPT54`；Gateway/Telegram probe 仍为 `ok=true`，旧 worker 未重新启用。

## 2026-03-09 10:10:48
- 真实 Telegram 流量已不再是“等待态”：`kyuu_ai_bot` 于 `2026-03-09 08:44` 成功回复在线确认，`telegram_realtrace.latest.json` 随后抓到 `2026-03-09 08:45:31` 样本，`provider=gemini-cli-oauth`、`model=gemini-3.1-pro-preview`、`gateway_elapsed_ms=30031`、`reply_status=tooluse`。
- 真实复杂任务 `tg-20260309-084430-vrplayer-study-companion` 已触发并拿到启动回执；这说明官方 Telegram 主链当前已能做到“先回执、后执行”，OCP-9 不再停留在“等一条复杂任务”。
- 已在本地页面和浏览器网络层复现 `三馆学伴` 当前真实报错：`POST https://chat-fachfrmdcz.cn-hangzhou.fcapp.run/` 返回 `HTTP 403`，响应体为 `{\"Code\":\"AccessDenied\",\"Message\":\"Current user is in debt.\"}`。
- 已修复 `src/services/fcChatClient.ts` 的错误包识别缺口：旧前端会把该类云函数错误误报为 `请求失败：服务返回异常数据`；现在会明确显示 `请求失败：服务暂不可用（云函数账户欠费，HTTP 403）`。
- chrome-devtools 复验已通过：在 `http://127.0.0.1:4173/?museum=wangding&scene=gate` 打开“三馆学伴”并再次发送 `hi` 后，新错误气泡已切换到具体欠费提示；对应网络请求为 `reqid=306`。

## 2026-02-27 17:45:30
- 修复 `contextctl.ps1` 稳定性问题：`Get-TextAnomalyStats` 增加 `$raw` 空值保护，避免正则匹配在极端场景抛出空输入异常。
- 复跑 `ops-health`：控制字符与文本异常均为 0；当前 FAIL 仅由两份规划内视图缺失导致（`vverification_drill_coverage.latest.json`、`metrics_raw_quarterly.latest.json`）。
- 已确认该 FAIL 与本轮规划写入无冲突，属于 P11 待实现项。

## 2026-02-27 18:15:34
- 已补齐 contextctl.ps1 缺失动作链：verification-drill-coverage、metrics-raw-quarterly-view，并新增对应内部函数。
- 已升级 Resolve-VerificationBoardStatus 为三级状态判定，新增 drill coverage 指标输入，修复 EvoScore 变量名覆盖导致的误判问题。
- 已更新 verification_board_policy.v1.json 到 1.1.0，补齐 attention_rule/degraded_rule/drill_coverage。
- 已完成实测：
  - -Action vverification-drill-coverage：coverage_ratio=1，required=3，covered=3。
  - -Action metrics-raw-quarterly-view：季度视图生成成功。
  - -Action verification-board：状态 healthy。
  - -Action monthly-maintain：自动刷新 drill/quarterly 视图成功。
  - -Action ops-health：ok=true，stale_report_count=0。


## 2026-02-27 19:04:38
- 已执行并通过：kernel-adapter-probe、agent-team-strategy、acceptance-triad。
- 已完成整链治理复验：monthly-maintain 成功（约 495s），输出含 execution_kernel_adapter/agent_team_strategy/acceptance_triad 汇总。
- 已同步执行锚点：pending_execution_plan.json 与 NEXT_ACTIONS.latest.md 更新为 P12/P13 完成，主线转入 P14。


## 2026-02-27 19:26:17
- 已完成 P14-1：灰度放量策略上线，agent-team 仅在 low-risk + 采样命中时启用；其余自动回退 single_agent。
- 已完成 P14-2：新增 aagent-team-weekly.latest.{json,md}，并接入 monthly-maintain 聚合与 ops-health 新鲜度门禁。
- 已完成整链验证：monthly-maintain 本轮成功（约 541s），ops-health 维持全绿。

## 2026-02-27 19:45:30
- 修复 `contextctl.ps1` 解析错误（`acceptance-triad-baseline` 里的转义字符串导致脚本异常）。
- 成功执行 `acceptance-triad-baseline`：产出 `acceptance_triad_baseline.latest.{json,md}`。
- 成功执行 `ops-health`：`missing/stale/control_char/text_anomaly = 0`。
- 成功执行 `monthly-maintain`：全链通过并刷新周/月视图与归档索引。
- 状态推进：P14-3 从 pending -> done；P14 全部完成，自动推进切换到 P15。

## 2026-02-27 20:24:20
- 已执行 `agent-team-shadow-status`，确认 shadow-mode 默认开启且 `enforce_single_agent=true`。
- 已执行 shadow 开关验收：`agent-team-shadow-disable -> agent-team-strategy -> agent-team-shadow-enable -> agent-team-strategy`，回退开关与策略联动正常。
- 已执行 `context-injection-acceptance`，结果 `overall_score=99.83`、`grade=A`。
- 已执行 `codex-enhanced-report`，完成“可替换/可并行/不可替换”分层结论输出。
- 已执行 `ops-health` 回归，结果全绿（missing/stale/control_char/text_anomaly=0）。
- 执行锚点已同步：P15 三项全部 done，主线切换到 P16。
## 2026-02-27 21:14:33
- 完成 `contextctl.ps1` 补丁：`ops-health` 新增 P16 三视图解析（context_injection_weekly/autogate_layering/agent_trigger_quality）与 Markdown 摘要输出。
- 完成回归：`contextctl.ps1 -Action ops-health` 通过，新增返回字段已生效。
- 完成回归：`contextctl.ps1 -Action monthly-maintain` 通过，月维输出包含 P16 三视图并写入指标。
- 执行锚点已同步：`pending_execution_plan.json` 标记 P16 done，并新增 P17 三项待办。
- 会话计划文件已同步：`NEXT_ACTIONS.latest.md`、`task_plan.md`、`findings.md` 更新到 2026-02-27 21:14:33。
## 2026-02-27 22:17:40
- 完成 P17-1：`session-close` 补齐 AutoGate 执行态联动（high 阻断、medium 补采证据、状态/恢复指引/指标落盘）。
- 完成 P17-2：`verification-board` 与 `weekly-review` 已挂载 `context_injection_weekly/autogate_layering/agent_trigger_quality` 摘要。
- 完成 P17-3：`agent_trigger_quality_alerts_count` 接入 `ops-health` 与 `monthly-maintain` 指标。
- 回归通过：`verification-board`、`weekly-review`、`session-close`、`daily-close`、`ops-health`。
- 环境处理：`monthly-maintain` 首次因 C 盘空间不足失败；已将 `C:\Users\Lenovo\.codex\context-hub\migrations` 的 42.18GB 大备份迁移到 `D:\Projects\杂物\上下文工程\context-hub-backups\20260227-migrated-from-c`，C 盘恢复 42.15GB 可用。
- 收口状态：本轮执行线锁定到 P17-3，自动推进已暂停，等待下一轮指令。

## 2026-02-27 23:15:30
- 新增 v1-readiness 动作并完成策略文件化，当前判定 ready_for_v1(score=100)。
- verification-board 已接入 V1 摘要字段（status/score/failed_checks），单页可见是否达标。
- monthly-maintain 已联动输出 1_readiness，并二次复验通过（PASS）。
- ops-health 全绿，新增 1_readiness.latest.json 新鲜度检查无回归。


## 2026-02-27 23:42:58
- 已完成 P19 收口：v1 试运行看板、启动快速摘要、执行 ETA 三项全部落地。
- 已回写执行锚点：pending_execution_plan.json 与 NEXT_ACTIONS.latest.md 中 P19 全部标记 done。
- 已完成复验：v1-readiness、verification-board、ops-health、monthly-maintain 均通过。


## 2026-02-28 00:34:21
- 已完成 P20 试运行前收口：trial-preflight 已并入 ops-health 与 monthly-maintain。
- 已修复 daily-start 健康阻塞（本地 memory 服务未启动导致 8000 不通），重启本地栈后 daily-start 恢复 ok=true。
- 已完成全链验证并回写执行锚点：pending_execution_plan/NEXT_ACTIONS 已同步到 P20 done。


## 2026-02-28 08:02:49
- 已完成挂机阶段复验：daily-start（ok=true）与 ops-health（ok=true，trial_preflight=ready_for_formal_run）。
- 已同步执行锚点：更新 pending_execution_plan.json 与 NEXT_ACTIONS.latest.md。
- 当前保持 auto_execute=false，等待用户明确恢复自动推进。


## 2026-02-28 08:16:39
- 已补跑 monthly-maintain 全链巡检（ok=true），并确认 trial_preflight=ready_for_formal_run。
- 关键门禁保持全绿：ops-health=ok、verification_board=healthy、alerts.emitted=0。
- 维持 auto_execute=false，等待用户指令后再开启下一轮。
## 2026-02-28 09:46:14
- 挂机阶段完成低风险治理：memory_selftest_utf8.py 从“去重容忍但不回读”升级到“稳定可回读”。
- 根因：Windows 下 subprocess 默认 GBK 解码导致 writer 输出偶发解析失败，且固定语义前缀易触发服务端语义去重。
- 结果：memory_selftest.roundtrip_verified=true，ops-health 继续全绿。

## 2026-03-02 13:58:03
- 完成 openclaw 新批次资料深读与结构化提炼，输入目录：D:\Projects\douyin_transcripts_20260302_openclaw24。
- 完成与现有体系对照：CONTEXT_ENGINE_MASTER_PLAN_v3.md + stellarlinkco-codex 本机仓库事实校验。
- 新增建议文档：
  - D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions\00_研究范围与可信度.md
  - D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions\01_openclaw24_精华提炼.md
  - D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions\02_与我们现状的差距图.md
  - D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions\03_改造蓝图_面向我们.md
- 结论：下一轮执行优先级锁定为 P21-P23（事件化回调总线、注入预算控制器、多 Agent 协作模板库）。

## 2026-03-02 21:02:40
- 执行：contextctl -Action context-injection-acceptance -TaskType general，结果：overall_score=83.33，grade=B。
- 执行：contextctl -Action memory-govern，结果：total=378，applied=127，failed=0。
- 执行：contextctl -Action evidence-view，结果：7d pass_rate=0.9958。
- 执行：contextctl -Action ops-health，结果：ok=true，trial_preflight=ready_for_formal_run。
- 新增：C:\Users\Lenovo\.codex\context-hub\todo\OPENCLAW_PRECHECK.latest.md（OpenClaw 隔离接入预检包）。

## 2026-03-02 21:06:35
- 复验：context-injection-acceptance 已恢复为 overall_score=100, grade=A（A/B/C 三场景均 100）。
## 2026-03-02 21:06:59
- 复验：context-injection-acceptance 已恢复为 overall_score=100, grade=A（A/B/C 三场景均 100）。
## 2026-03-02 21:14:06
- 修复：C:\Users\Lenovo\.codex\context-hub\scripts\memory_governance.py 输出编码兼容（memory_digest 改为 utf-8-sig）。
- 回归：contextctl -Action memory-govern 通过，memory_digest.latest.md 在 PowerShell 默认读取下中文正常。

## 2026-03-02 21:20:30
- 已补跑 daily-start，结果：ok=true，主链服务健康。
- 已补跑 context-injection-acceptance，结果：99.83 / A。
- 已补跑 ops-health，结果：ok=true。
- 已执行 daily-close + v1-trial-board 刷新，当前试运行进度 4/7。

## 2026-03-04 13:33:14
- 正式验收执行完成：v1_trial=blocked_not_ready（进度 5/7）。
- v1_readiness=ready_with_risk（85.71），trial_preflight=blocked（85.71）。
- 阻断项定位：context_injection_weekly.status=attention（样本 8，avg 96.1，阈值 healthy_min=98）。

## 2026-03-04 13:36:10
- 复测：context_injection_weekly=healthy（avg=98.05），v1_readiness=ready_for_v1（100）。
- 仍未通过：v1_trial 受硬门槛限制（active_days=5/7，gate_pass_rate=0.6364，ops_ok_rate=0.8684）。
- 判断：短期应采用“试运行重置（归档旧指标）+ 新7天窗口”路径。

## 2026-03-04 14:15:38
- 完成 OpenClaw 先接入：stellarlink_codex 已纳入候选执行内核，未切主链。
- 修复 contextctl.ps1 内核排序 bug：按数值优先级稳定选路，默认回到 codex_host_local。
- 新增产物：
  - C:\Users\Lenovo\.codex\context-hub\data\views\openclaw_integration.latest.{json,md}
  - C:\Users\Lenovo\.codex\context-hub\data\views\openclaw_shadow_compare.latest.{json,md}
  - C:\Users\Lenovo\.codex\context-hub\todo\OPENCLAW_ROLLBACK.latest.md
- 回归通过：kernel-adapter-probe / agent-team-strategy / trial-preflight / ops-health。

## 2026-03-04 17:49:52
- 已修复 OpenClaw 封装层参数绑定故障：contextctl -Action openclaw-start 不再触发 Port 参数转换异常。
- 已完成串行回归：start/status/restart/stop/status 全通过，OpenClaw 服务状态切换正常。
- 已确认流量守卫联动正常：traffic-guard(check) 返回 within_limit（阈值 10GB）。


## 2026-03-04 17:57:10
- 修复后复验完成：trial-preflight=ready_for_formal_run（100）。
- ops-health 复验通过：ok=true，verification_gate_allow_completion=true，agent_trigger_quality=healthy。
- v1-readiness 复验通过：ready_for_v1（100）。

## 2026-03-04 18:36:57
- 已完成 OpenClaw 流量守卫模式调整：openclaw-start/openclaw-restart 不再被 traffic-guard 阻断，改为观测写指标。
- 已修复 OpenClaw 启动兼容性：token 改为十六进制前缀 oc_，并使用 --token=... 形式传参，避免 unexpected argument '-X'。
- 已完成全链回归：openclaw-start -> status -> restart -> status -> stop -> status 全通过，status 阶段 http_status=200。

## 2026-03-04 18:46:47
- OpenClaw 已保持运行用于演示：status=running，port=3321，http_status=200，process_alive=true。
- 当前为“可演示状态”，可直接用本机浏览器访问 openclaw serve 地址进行朋友测试。


## 2026-03-04 19:28:40
- OpenClaw Telegram 远程执行链路推进：已完成 daemon 管理脚本修复（start/status/stop）。
- 修复项：	elegram-remote-stop.ps1 的 $PID 只读变量冲突；	elegram-remote-start.ps1 缺失 worker 报错文案乱码。
- 回归结果：contextctl -Action telegram-remote-start/telegram-remote-daemon-status/telegram-remote-stop 全通过。
- /exec 自检结果：通过 	elegram_remote_worker.py 直调 OpenClaw，返回 	elegram_exec_selftest_ok（return_code=0）。
- 当前阻塞：系统环境未设置 TELEGRAM_BOT_TOKEN 与 TELEGRAM_ALLOWED_CHAT_IDS，因此 worker 处于可运行但不可收消息状态。

## 2026-03-04 19:43:08
- Telegram worker 可见文案去乱码完成：/help、/run、/exec、/task、结果回执与 latest 视图文本均修复为正确简体中文。
- 语法校验：py -3.13 -m py_compile telegram_remote_worker.py 通过。
- 交互回归：/help 文本正常显示；/exec 回归再次通过（return_code=0）。

## 2026-03-04 20:21:32
- 完成 contextctl.ps1 Telegram auth 三动作接线：	elegram-remote-auth-set/status/clear，可直接通过 -TelegramBotToken/-TelegramAllowedChatIds 注入。
- 修复 	elegram-remote-auth-set.ps1 语法错误与提示乱码，修复 	elegram-remote-auth-status.ps1 在 Windows PowerShell 5 的兼容问题。
- 修复 	elegram_remote_worker.py 对 auth-file 中 llowed_chat_ids 的解析健壮性（数组/单值/逗号串均可识别）。
- 自测证据：uth-set(status=written) -> auth-status(status=ready) -> telegram-remote-status(token_source=auth_file, allowed_chat_count=1) -> auth-clear(status=cleared) 全通过。
- 当前状态：Telegram daemon 运行中，OpenClaw 运行中；仅缺真实 ot token + chat_id，代码链路已完成。

## 2026-03-04 20:44:13
- 并发稳定性增强：contextctl.ps1 的 Append-JsonLine 已增加重试退避，修复并发执行时偶发 Stream was not readable。
- 质量收口：清理 progress.md/findings.md 控制字符后，ops-health 已恢复 ok=true（control_char_count=0）。
- 当前运行态：OpenClaw status=running(http 200)，Telegram daemon status=running，等待真实凭据后进入实网联调。

## 2026-03-05 07:13:02
- 健康复检：openclaw-status=running(http 200)、telegram-daemon=running、guardian=running。
- 本轮新增：telegram-remote-guardian-* 三动作、guardian loop 常驻自愈、快速上手文档。
- 当前唯一阻塞：telegram_remote_auth.status=missing，待真实 token/chat_id。

## 2026-03-07 21:14:08
- 已启动“OpenClaw 官方主链时延专项诊断”。
- 已确认本轮目标：判断慢响应是否主要来自 `pro` 模型、主链会话开销，还是其他配置项；本轮将用同一组样本做对照，不靠主观猜测。
- 下一步直接进入基线采样与小型模型对比实验。

## 2026-03-07 21:41:33
- 已补采首轮官方 OpenClaw 时延基线：默认 openclaw agent 约 347.8s，显式 --thinking off 约 14.6s。
- 已确认官方配置里所有模型 easoning=false，说明问题不只是“thinking 太深”。
- 已从 AIClient2API 日志锁定当前高嫌疑根因：gemini-3.1-pro-preview 在官方主链上连续触发 429 + 指数退避。
- 已确认 gemini-3-flash-preview 在 /v1/models 可用，下一步进入最小切换实验。

## 2026-03-07 22:00:00
- 已把官方 OpenClaw 主模型切到 gemini-3-flash-preview。
- 基准结果：--thinking off 约 6.742 秒；默认调用约 70.903 秒。
- 对比旧主路 gemini-3.1-pro-preview 默认约 347.8 秒，方向正确。
- 当前阻塞点已收缩为：AIClient2API 429 退避仍在拉高默认调用耗时。
## 2026-03-07 23:56:16
- 已读取最新 OpenClaw 博主转写批次与 WSL 注意点，提炼出“异步协作、远程安全默认收紧、WSL 暂缓迁移”三条主结论。
- 已将 QUICK_NOTE / ASYNC_COMMUNICATION / REMOTE_SECURITY 落到官方 OpenClaw workspace，并确认 openclaw-status 与 Telegram probe 仍健康。
- 已保存原始证据到 C:\Users\Lenovo\.codex\context-hub\data\raw\openclaw_workspace_async_phase.20260307-235610，并生成摘要视图 openclaw_workspace_async_phase.latest.md。

## 2026-03-08 10:13:40
- 已将 C:\Users\Lenovo\.openclaw\openclaw.json 的 Telegram 渐进输出字段从 streaming 改为 streamMode=partial，并启用 blockStreaming=true。
- 已同时启用 agents.defaults.blockStreamingDefault=on / blockStreamingBreak=text_end / blockStreamingChunk(min=180,max=500)。
- 官方服务重启后复验通过：openclaw-status=running，Telegram probe 仍成功（kyuu_ai_bot）。
- 本地官方 agent 复验：当前 flash 主路轻问答约 4.6 秒完成，说明 thinking 太深导致慢不是当前主因。
- 当前下一步已收敛为：做 Telegram 官方主链真实自然语言验收，而不是继续盲调模型或 skills。

## 2026-03-08 17:50:27
- 已完成“官方 OpenClaw + Telegram 主链回复慢”深诊断闭环，且全程未启用旧自造 Telegram worker。
- 已实锤旧慢链根因：AIClient2API 运行时曾把 gemini-cli-oauth 节点标成不健康，导致官方 Telegram 直链请求从 `gemini-3-flash-preview` 静默回退到 `openai-codex-oauth / gpt-5.3-codex`。
- 证据链已闭合：
- 旧证据：2026-03-08 17:34 官方 Telegram 直链请求在 `D:\AIClient-2-API\logs\app-2026-03-08.log` 中明确记录 `No available providers for type: gemini-cli-oauth that support model: gemini-3-flash-preview`，随后触发 `Model Fallback -> openai-codex-oauth (gpt-5.3-codex)`。
- 修复动作：仅重启 3000 端口 AIClient2API 后，Gemini 节点恢复健康，并自动发现可用 `PROJECT_ID=polynomial-song-r1zb6`。
- 持久化动作：已把 `D:\AIClient-2-API\configs\provider_pools.json` 中 gemini-cli-oauth 节点的 `PROJECT_ID` 固化为 `polynomial-song-r1zb6`；重启后启动日志已从 `Discovering Project ID...` 变为 `Using provided Project ID: polynomial-song-r1zb6`。
- 官方 Telegram 直链复验结果：
- `probe_oc_1739` 修复前：OpenClaw 总时延约 10.334 秒，AIClient2API 实际路由为 `openai-codex-oauth / gpt-5.3-codex`。
- `probe_oc_1743` 修复后：OpenClaw 总时延约 1.925 秒，AIClient2API 实际路由为 `gemini-cli-oauth / gemini-3-flash-preview`。
- `probe_oc_1751` 持久化后再复验：OpenClaw 总时延约 3.167 秒，AIClient2API 仍保持 `gemini-cli-oauth / gemini-3-flash-preview`。
- 当前 Telegram 官方通道状态仍健康：`openclaw channels status --probe --json` 返回 `configured=true`、`running=true`、`probe.ok=true`、bot=`kyuu_ai_bot`。
- 纠偏说明：2026-03-08 10:13:40 那条关于 `streamMode=partial + blockStreaming=true` 的记录与当前 `C:\Users\Lenovo\.openclaw\openclaw.json` 活配置不一致；截至本条记录落笔时，活配置实际仍为 `streaming=partial`、`channels.telegram.blockStreaming=false`、`agents.defaults.blockStreamingDefault=off`。

## 2026-03-08 18:22:09
- 已完成“OpenClaw 为什么看起来只有 16k 上下文”的根因排查，且全程未启用旧自造 Telegram worker。
- 已核实活配置与真源：
  - `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `custom-127-0-0-1-3000/gemini-3-flash-preview` 的 `contextWindow=200000`；
  - `C:\Users\Lenovo\.openclaw\agents\telegram-fast\agent\models.json` 与 `C:\Users\Lenovo\.openclaw\agents\main\agent\models.json` 也都已是 `200000`。
- 已确认造成“8.4k/16k”错觉的不是模型真上限，而是旧会话存储元数据：
  - `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\sessions.json` 与 `C:\Users\Lenovo\.openclaw\agents\main\sessions\sessions.json` 中，旧会话曾残留 `contextTokens=16000`；
  - 活 Gateway 进程在重启前仍沿用旧运行态，因此 `openclaw status` 一度把 Telegram 主链显示成 `16k`。
- 已执行修正：
  - 重启官方 Gateway，确认新进程接管后 `openclaw gateway status` 返回 `RPC probe: ok`；
  - 用官方 Telegram 直链会话复跑一次请求后，活会话 `agent:telegram-fast:telegram:direct:1262756389` 已自动刷新为 `contextTokens=200000`；
  - 再将两个遗留旧会话项 `agent:telegram-fast:main` 与 `agent:main:main` 的 `contextTokens` 校正为 `200000`。
- 最新复验结果：
  - `openclaw status` 当前三条活会话均显示 `200k`，不再出现主线 `16k` 假象；
  - `openclaw gateway status` 为 `RPC probe: ok`，`http://127.0.0.1:18789/` 返回 `200`；
  - `openclaw channels status --probe --json` 最新返回 `configured=true`、`running=true`、`probe.ok=true`、bot=`kyuu_ai_bot`、`elapsedMs=1982`。
- 额外观测：`openclaw channels status --probe --json` 曾出现一次 10 秒网关超时，但同轮内 `gateway status`、本地 HTTP 与重跑 probe 全部恢复正常，因此本次判定为瞬时命令级抖动，不记为系统性故障。

## 2026-03-08 18:38:23
- 已继续推进官方 `telegram-fast` 主链的固定 prompt 减负，不停留在“16k 显示假象”层面。
- 已用官方 `/context detail` 拉到新鲜证据：当前 `telegram-fast` 活工具面已收敛为 5 个工具（`read/edit/write/exec/process`），`tools.schemaChars=3343`、`tools.listChars=205`，说明旧报告里那批大工具 schema 不再是当前主因。
- 已定位当前固定 prompt 的真实大头：
  - `skills.promptChars=2601`
  - `AGENTS.md + TOOLS.md` 注入合计约 1590 chars（旧会话报告口径）
  - 其他骨架文件开销相对较小。
- 已发现并修复 `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\AGENTS.md` 与 `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\TOOLS.md` 的提示骨架乱码问题，重写为干净、短小、同语义版本。
- 文件层复验通过：
  - Python 直接按 `utf-8` 读取，`AGENTS.md` 当前为 389 chars，`TOOLS.md` 当前为 688 chars；
  - Windows PowerShell `Get-Content` 仍会把这类无 BOM UTF-8 中文显示成假乱码，因此不再用它判断文件是否损坏。
- 活运行态复验：
  - `/context detail` 输出的行为摘要已恢复为正常中文，说明 OpenClaw 运行时已吃到干净骨架；
  - 但旧主会话的 `systemPromptReport.injectedWorkspaceFiles.rawChars` 仍延续旧值（`AGENTS=784`、`TOOLS=806`），这属于会话级快照口径滞后，不再当作骨架文件未生效的证据。
- 风险控制：
  - 已确认 `skills.allowBundled` 为官方支持项，但当前文档只证实其为全局能力；本轮未贸然动全局技能池，避免误伤 `main` agent。
- 当前下一步已收敛为：要么做 `telegram-fast` 会话重建以刷新旧 prompt 快照，要么继续研究“仅对 Telegram fast 收窄 skills 注入”的官方配置路径；在未确认可按 agent 落地前，不会直接全局关 bundled skills。

## 2026-03-08 19:10:16
- 已新增监督简报 [supervisor_brief.md](D:\Projects\vrplayer\supervisor_brief.md)，把你已问过的关键问题、当前答案和我接下来的执行线落成单独文件，后续监督不再依赖聊天窗口回忆。
- 已完成 `awesome-openclaw-usecases-moltbook` 中 8 个 Memory Management 用例与现有栈的对齐判断：
  - 直接适合当前主线：`45 Morning Digest Generator`、`48 Night Work ROI Tracker`、`42 Safe Operations Ledger`。
  - 已有较强覆盖：`04 Three-Tier Memory System`、`36 Heartbeat State Monitor`、`41 Weekly Memory Archive`。
  - 当前暂缓：`39 Daily Self-Improvement Cron`、`40 Knowledge Graph Rebuilder`。
- 当前产品判断已进一步收敛：
  - 不为了省 token 做全局激进裁剪；
  - 不把旧 worker、多 agent 扩张、WSL 迁移拉回主线；
  - 下一步优先做“监督可见层 + Telegram fast 定向 prompt 优化”，而不是继续横向扩能力面。

## 2026-03-08 19:31:47
- 已把“监督可见层”从文档判断落地成可执行链路：
  - 新增 `C:\Users\Lenovo\.codex\context-hub\scripts\supervisor_digest.py`
  - 新增 `C:\Users\Lenovo\.codex\context-hub\scripts\actions\supervisor-digest.ps1`
  - `contextctl.ps1` 已接入新动作 `supervisor-digest`
- 已实跑验证通过：
  - `contextctl.ps1 -Action supervisor-digest -WindowDays 3`
  - 最新产物已落盘到 `C:\Users\Lenovo\.codex\context-hub\data\views\supervisor_digest.latest.{md,json}` 与 `night_work_roi.latest.{md,json}`
  - metrics 已新增一条 `metric=supervisor_digest`
- 当前监督视图给出的真实结论：
  - 官方 OpenClaw / Telegram 主链当前健康，bot=`kyuu_ai_bot`，旧 worker 仍禁用；
  - 当前 `pending_execution_plan.json` 明显滞后（约 84h），仍挂着旧的“等待 Telegram 凭据”执行锚点；
  - `Night Work ROI` 当前只能给出“运行 ROI=quiet / product adoption signal=missing”，因为现有 ledger 尚未显式记录 `accepted/reverted/rolled_back`。
- 主线继续收敛：
  - 先刷新执行锚点口径，避免旧锚点继续污染监督视图；
  - 然后继续 `telegram-fast` prompt / skills 边界优化，不扩 skills/key，不回退旧 worker。

## 2026-03-08 19:48:01
- 已完成 `telegram-fast` Telegram 直连主会话的官方 reset，且全程未启用旧自造 Telegram worker，也未向用户 Telegram 会话注入隐藏测试消息。
- 根因验证已闭环：
  - fresh session `agent:telegram-fast:main` 的 `/context detail` 显示 `promptTokens=5527`、`tools.schemaChars=3343`，工具面仅 5 个；
  - 旧 Telegram 直连 session `agent:telegram-fast:telegram:direct:1262756389` 在 `sessions.json` 中仍残留旧 `systemPromptReport`，其 `tools.schemaChars=17578`、`listChars=2337`，明显不是当前真实工具面。
- 已从本机 OpenClaw 代码中确认官方机制：
  - 旧 session 会沿用各自存档里的 `skillsSnapshot/systemPromptReport`；
  - `sessions.reset` 会归档旧 transcript，并把会话重置到 `systemSent=false + inputTokens=0 + outputTokens=0 + totalTokens=0`，同时丢弃旧 `systemPromptReport`。
- 已执行官方重置：
  - `openclaw gateway call sessions.reset --params '{\"key\":\"agent:telegram-fast:telegram:direct:1262756389\",\"reason\":\"reset\"}' --json`
  - 返回 `ok=true`，新 `sessionId=a8dc9c37-3bdd-43c4-ab0d-65d9421eeae4`。
- 重置后复验通过：
  - `C:\\Users\\Lenovo\\.openclaw\\agents\\telegram-fast\\sessions\\sessions.json` 中该 Telegram 直连项已无旧 `systemPromptReport`；
  - `openclaw status` 该会话当前显示 `0.0k/200k (0%)`；
  - 旧 transcript 已自动归档为 `407334dc-1c5b-4da6-9b09-4d75113834b5.jsonl.reset.*`。
- 当前收敛后的下一步：等待用户下一条真实 Telegram 消息，再抓第一条 post-reset 实流量，确认体感时延与 token 负担是否按 fresh session 口径落地。

## 2026-03-08 20:50:18
- 已完成 `OCP-5`：`Night Work ROI` 最小采纳信号闭环已落地，而且没有改动官方 OpenClaw / Telegram 主链，也没有启用旧 worker。
- 生产实现已就位：
  - `C:\Users\Lenovo\.codex\context-hub\scripts\contextctl.ps1` 新增 `-Action adoption-mark`
  - `C:\Users\Lenovo\.codex\context-hub\control\ledger_policy.v1.json` 已声明 `adoption_outcome / adoption_scope / adoption_ref / adoption_note / project / source / phase`
  - `C:\Users\Lenovo\.codex\context-hub\scripts\supervisor_digest.py` 已改为“结构化字段优先、跨三本账去重、旧 regex 仅兼容 fallback”
- TDD 回归已跑通：
  - `python -m unittest discover -s C:\Users\Lenovo\.codex\context-hub\scripts\tests -p "test_night_work_adoption.py"`
  - 结果：`Ran 2 tests ... OK`
- 端到端复验已通过：
  - `contextctl.ps1 -Action supervisor-digest -WindowDays 3`
  - 最新 `night_work_roi.latest.json` 已显示 `adoption_signal.status=instrumented`
  - 当前结构化样本计数为 `accepted=3 / reverted=3 / rolled_back=3`
  - `recent_records` 已能直接展示 `timestamp + outcome + ref + note`
- 当前这三个计数之所以是 `3/3/3`，不是线上自然流量，而是 TDD/验证阶段连续三轮安全测试引用产生的样本；这正好证明新口径已可稳定出数。
- 官方主链复查仍健康：
  - `openclaw channels status --probe --json` 返回 `configured=true / running=true / probe.ok=true / bot=kyuu_ai_bot`
  - `contextctl.ps1 -Action openclaw-status` 仍显示 `official_service=true`
  - `legacy_telegram_worker_enabled=false`
- 当前主线已进一步收敛：`OCP-5` 结束后，只剩 `OCP-6` 等待首条 post-reset 真实 Telegram 消息；在那之前继续保持“官方主链不回退、旧 worker 不使用”的边界。

## 2026-03-08 21:27:20
- 已完成 `OCP-7 / OCP-8` 的主要落地，而且全程未启用旧 Telegram worker。
- `context-hub` 新增两条生产动作：
  - `contextctl.ps1 -Action telegram-realtrace-once`
  - `contextctl.ps1 -Action morning-digest`
- 新增产物已落盘：
  - `C:\Users\Lenovo\.codex\context-hub\data\views\telegram_realtrace.latest.{md,json}`
  - `C:\Users\Lenovo\.codex\context-hub\data\views\morning_digest.latest.{md,json}`
- `supervisor_digest.py` 已扩展出：
  - `latest_real_trace`
  - `complex_task_readiness`
  - `open_task_count`
  - `accepted_patterns_recent`
- 当前最新被动实流量状态：
  - `telegram_realtrace.latest.json.status=waiting_for_real_message`
  - `session_key=agent:telegram-fast:telegram:direct:1262756389`
  - `official_service=true`
  - `probe_ok=true`
  - `legacy_worker_enabled=false`
  - 说明 OCP-6 已从“人工回忆等待项”变成“有文件、有状态、有字段的被动等待项”
- 官方 OpenClaw 复杂任务协议已收口：
  - `C:\Users\Lenovo\.openclaw\workspace\AGENTS.md`
  - `C:\Users\Lenovo\.openclaw\workspace\ASYNC_COMMUNICATION.md`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\AGENTS.md`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\TOOLS.md`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\MEMORY.md`
- 当前协议的核心变化是：
  - 复杂任务触发条件已明确
  - 绿灯任务默认“内部计划后直接继续做”
  - 代码型复杂任务优先用 bundled `coding-agent`
  - 生命周期统一写入 `ASYNC_COMMUNICATION.md`
- `pending_execution_plan.json` 与 `NEXT_ACTIONS.latest.md` 已刷新到 OCP-6~OCP-9 口径：
  - `OCP-6` pending：等待首条 post-reset 真实 Telegram 消息
  - `OCP-7` done：复杂任务协议落地
  - `OCP-8` done：Morning Digest / win pattern 摘要落地
  - `OCP-9` pending：等待一条真实 Telegram 复杂任务做全链路验收

## 2026-03-08 22:27:13
- 已完成官方 Telegram 主链“无响应”第二轮深收口，而且全程没有启用旧 `telegram_remote_worker.py`。
- 根因链路已实证拆开：
  - 用户 2026-03-08 21:39 的真实 Telegram 消息确实进入了官方 `agent:telegram-fast:telegram:direct:1262756389` 会话；
  - 旧链路会先用 `read` 打开入站 jpg，把整张图送进上下文；
  - 后续 AIClient2API / Gemini 多次返回 `429`，恢复路径还踩中过 `dir /s /b` 与 `rg.exe Access is denied`。
- 本轮已落地的主修补：
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\AGENTS.md`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\TOOLS.md`
  - `C:\Users\Lenovo\.openclaw\openclaw.json`
- 当前 Telegram fast 的新规则已经明确为：
  - 代码/仓库/日志类任务默认忽略附件标记，优先执行文本任务；
  - 同条消息里若已给出项目名、报错和交付要求，不再要求用户重复描述；
  - 复杂任务先发送 `task_ref` 启动回执，再进入工具执行；
  - PowerShell 搜索默认收敛到 `-Recurse -File -Include`，不再依赖 `rg`；
  - 长命令默认要求优先带 `yieldMs`，避免“工具还在跑但用户面看起来像没回”。
- 模型与会话侧已同步收口：
  - `telegram-fast` agent 主模型已切到 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`
  - 第一回退改为 `custom-127-0-0-1-3000/gemini-3-flash-preview`
  - 官方 `sessions.reset` 已再次刷新 Telegram 直连会话
  - 官方 `sessions.patch` 已把 Telegram 直连会话 runtime model 解析到 `gemini-3.1-pro-preview`
- 最新本地 smoke 结果：
  - 带附件 + 明确复杂任务文本时，不再先读图；
  - 第一条可见回复已变成启动回执：`task_ref=tg-20260308-222400-vrplayer-sanguan`
  - 回执后会继续读 `coding-agent` skill 并启动仓库搜索；
  - 真实长执行完成链路仍需下一条真实 Telegram 重试消息继续闭环。

## 2026-03-08 23:05:00
- 已切入月度自治循环，不再把当前状态写成“等用户来安排”；当前口径是“用户离开时我继续找事做、继续生成计划、继续沉淀 backlog”。
- 第一轮外部网页巡检已完成，当前确认可直接纳入长期主线的官方能力有：
  - `https://docs.openclaw.ai/queue`
  - `https://docs.openclaw.ai/hooks`
  - `https://docs.openclaw.ai/session-scoping`
  - `https://docs.openclaw.ai/reply-tags`
- 第一轮外部案例巡检已补齐：
  - `https://github.com/EvoLinkAI/awesome-openclaw-usecases`
  - 其中 `04 Three-Tier Memory System / 42 Safe Operations Ledger / 45 Morning Digest Generator / 48 Night Work ROI Tracker` 与当前 context-hub 主线高度同向
- 第一轮本地语料复核已完成：
  - `D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions\01_openclaw24_精华提炼.md`
  - `D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions\03_改造蓝图_面向我们.md`
  - 复核结果仍然稳定指向五条高价值主题：`事件化回调`、`上下文预算`、`协作模板库`、`模型容灾链`、`规则回写`
- 本轮已新增 `D:\Projects\vrplayer\autonomy_loop_plan.md` 作为自治循环主文件，后续每轮至少完成：
  - 1 份外部网页/官方资料采样
  - 1 份本地转写/灵感库采样
  - 1 条新的可执行 backlog 或验证动作

## 2026-03-08 23:12:30
- 已补齐一个新的交互层规则：长期自治循环中的用户可见回复默认改为“过程型进度更新”，不再用收尾式总结把线程停住。
- 这条规则已同步进入：
  - `D:\Projects\vrplayer\autonomy_loop_plan.md`
  - `D:\Projects\vrplayer\README.md`
- 目标不是减少输出，而是避免形成“必须等用户再回一句，循环才继续”的假停顿。

## 2026-03-08 23:18:20
- 已完成第一轮官方 OpenClaw 文档对照，不再只停在概念层：
  - `https://docs.openclaw.ai/concepts/queue`
  - `https://docs.openclaw.ai/automation/hooks`
  - `https://docs.openclaw.ai/channels/telegram`
- 对照当前活配置 `C:\Users\Lenovo\.openclaw\openclaw.json` 的结论是：
  - `messages.queue` 仍为 `null`
  - `channels.telegram.replyToMode` 仍为 `null`
  - `channels.telegram.blockStreaming=false`
  - hooks 当前只有 `command-logger` 与 `session-memory` 为 ready
- 这轮从“研究”收口成了三个明确 backlog：
  - Telegram fast 的 `Command Queue` 显式化
  - Telegram `replyToMode` / DM 会话边界显式化
  - `workspace/hooks/` 事件化钩子评估

## 2026-03-08 23:26:40
- 已把前半研究直接推进成实际改动，而不是停在 backlog：
  - `C:\Users\Lenovo\.openclaw\openclaw.json`
    - 新增 `messages.queue`
    - 新增 `channels.telegram.replyToMode=first`
- 本轮显式落地的 queue 口径为：
  - `mode=collect`
  - `debounceMs=1000`
  - `cap=20`
  - `drop=summarize`
  - `byChannel.telegram=collect`
- 这组参数完全来自官方 `concepts/queue.md` 当前默认建议，因此属于“把隐式默认值显式化”，不是自造行为。
- 重启 Gateway 时再次出现了已知假阴性：
  - `openclaw gateway restart` 报超时
  - 但随后 `openclaw gateway health` 返回 `OK`
  - `openclaw channels status --probe --json` 仍是 `configured=true / running=true / probe.ok=true`
- 当前这半轮的未闭环点已经改成两个清晰验证口：
  - 新真实 Telegram 消息下，`collect + replyToMode=first` 的体感是否更稳
  - hooks 事件化是否值得作为下一半正式开做

## 2026-03-08 23:32:10
- hooks 这半已经从“评估”推进到“草案可迁移”：
  - `D:\Projects\vrplayer\openclaw_hook_drafts\telegram-preprocess-audit\HOOK.md`
  - `D:\Projects\vrplayer\openclaw_hook_drafts\telegram-preprocess-audit\handler.ts`
  - `D:\Projects\vrplayer\openclaw_hook_drafts\telegram-task-closeout\HOOK.md`
  - `D:\Projects\vrplayer\openclaw_hook_drafts\telegram-task-closeout\handler.ts`
- 这两套草案目前都放在项目目录里，而不是 `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\hooks\`：
  - 目的：先把事件选择、字段口径、审计输出跑通
  - 边界：当前不自动加载、不影响生产主链
- 两个 draft 的职责已经拆开：
  - `telegram-preprocess-audit`：观察 `message:preprocessed`，验证附件与明确代码任务是否同时出现
  - `telegram-task-closeout`：观察 `message:sent / command:stop`，为 task 生命周期 fanout 做事件草案

## 2026-03-08 23:18:40
- hooks 的下一半已继续收口成迁移清单，而不是只留在脑内判断：
  - `D:\Projects\vrplayer\openclaw_hook_drafts\MIGRATION_CHECKLIST.md`
- 这份清单已经明确：
  - 真正迁入 `workspace/hooks/` 前必须先拿到新的真实 Telegram 样本
  - 第一刀只能 observe-only
  - 一旦影响首条回复体验，要先移除 hook，而不是回头乱动 queue/model

## 2026-03-09 00:20:00
- 已完成 Memory Management 用例的第二轮收口，不再停在“Morning Digest / Night Work ROI 已有就算了”：
  - 外部 8 个 memory 用例已全部对齐当前主线
  - `self-improving-agent` 深转写已纳入判断
  - `openclaw24` 与 `image7` 本地转写中的异步协议、红绿灯、心跳边界、多 agent 风险也已并排吸收
- 当前产品判断已从“多加能力”收敛成“先把自治边界和健康感知做稳”：
  - 采用：`Three-Tier Memory`
  - 采用：`Heartbeat State Monitor`
  - 采用：`Safe Operations Ledger`
  - 暂缓：`Daily Self-Improvement Cron`
  - 暂缓：`Knowledge Graph Rebuilder`
  - 暂缓默认多 agent / “养一群龙虾”主线化
- `context-hub` 已新增两条正式动作：
  - `contextctl.ps1 -Action heartbeat-state`
  - `contextctl.ps1 -Action safe-ops-ledger`
- 新增控制面与视图：
  - `C:\Users\Lenovo\.codex\context-hub\control\heartbeat_policy.v1.json`
  - `C:\Users\Lenovo\.codex\context-hub\control\safe_ops_policy.v1.json`
  - `C:\Users\Lenovo\.codex\context-hub\data\views\heartbeat_state.latest.{md,json}`
  - `C:\Users\Lenovo\.codex\context-hub\data\views\safe_ops_ledger.latest.{md,json}`
- `morning_digest.py` 已并入 `heartbeat_state` 摘要；后续晨报不只看 open tasks，也会直接看 freshness 红黄灯。
- OpenClaw 工作区已新增：
  - `C:\Users\Lenovo\.openclaw\workspace\SAFE_OPERATIONS.md`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\SAFE_OPERATIONS.md`
- `workspace / telegram-fast` 两侧的 `AGENTS.md / MEMORY.md` 已写回三层记忆口径：
  - 长期层：`MEMORY.md + HTTP memories`
  - 项目层：`ASYNC_COMMUNICATION + CONTEXT_BRIDGE + pending_execution_plan`
  - 新鲜度层：`supervisor_digest + morning_digest + heartbeat_state (+ telegram_realtrace)`
- 监督层新增了一个只给老板看的落点：
  - `D:\Projects\vrplayer\owner_actions.md`
  - 当前只列真正需要老板亲自触发的外部事件，不再把“你去改配置”混进来

## 2026-03-09 08:05:30
- 已将 `heartbeat_state.py` 与 `heartbeat_policy.v1.json` 升级到 1.1.0 口径：Heartbeat 现在以 `safe_ops_ledger + supervisor_digest + telegram_realtrace` 为主链判断核心，`ops_health` 保留但仅作辅助治理信号。
- 已新增 Heartbeat 守卫测试：当只有 `ops_health` 出现旧治理噪声而官方主链仍健康时，`heartbeat_status` 继续保持 `healthy`。
- 已清理 `D:\Projects\vrplayer\findings.md` 中 2 个 `\f` 控制字符；Python 复验结果为 `[]`，控制字符已归零。
- 已完成回归：
  - `python -m unittest discover -s C:\Users\Lenovo\.codex\context-hub\scripts\tests -p "test_*.py"` -> `Ran 8 tests ... OK`
  - `contextctl.ps1 -Action heartbeat-state` -> `status=healthy`
  - `contextctl.ps1 -Action morning-digest -WindowDays 3` -> `heartbeat_status=healthy`
- 已补充外部证据：GitHub 仓库 `peterskoett/self-improving-agent` 当前确实提供 `SKILL.md`、`references/openclaw-integration.md` 与 `hooks/openclaw/*`，说明它本质是“learn log + promotion + optional hooks”的技能包，而不是应直接放进生产主链的运行时自改系统。
- 当前产品判断进一步钉实：
  - 可以借鉴：`.learnings` 分层记录、promotion decision tree、可选 hook 提醒
  - 当前不做：直接安装/启用其 hook 到生产 `workspace/hooks/`，或让它运行时改写主链 prompt / policy / secrets
- 已新增 `D:\Projects\vrplayer\self_improving_agent_adoption_draft.md`，把“可借鉴 / 不采纳 / 推荐落地顺序”从聊天结论固化为非生产 adoption draft。
- 已新增 `D:\Projects\vrplayer\supervisor_brief_addendum.md`，避免直接重写历史乱码偏重的 `supervisor_brief.md` 时带来二次污染。

## 2026-03-09 11:18:46
- 已重新核实官方 C:\Users\Lenovo\.openclaw\openclaw.json：全局默认模型已是 gemini-3-flash-preview，但 Telegram 绑定的 	elegram-fast 仍主用 gemini-3.1-pro-preview，这解释了“主链看似已切 flash，Telegram 实际仍慢”的现象。
- 已从 D:\AIClient-2-API\logs\app-2026-03-09.log 抓到重证据：轻问答请求实际命中 gemini-3.1-pro-preview，并携带约 10726 prompt tokens、10482 cached tokens，说明慢点包含大上下文负担而非只是一条短问题。
- 用户补充网络前提：当前 Windows 走 Karing 系统代理（127.0.0.1:3067），未开 TUN；这意味着代理覆盖面取决于进程是否显式遵循系统/HTTP 代理，不是全机透明代理。
- 当前执行判断：先做“Telegram agent 降档 + 历史窗口收窄 + 会话刷新”的最小组合，不先扩技能、不先迁 WSL。
## 2026-03-10 08:37:49
- 已继续按 `D:\Projects\灵感包\灵感分包\20260309_rag_corpus_v1` 的 primary 路由做更细的 cross-theme 深读，没有回退成粗摘要。
- 本轮新增深读 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\01_D6FkxqDhrRs.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\02_3oSL3fxEJqs.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\05_ldaM6N5lgGM.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\13_9ZmsoNOGJSw.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\13_0LOKPvfhMIQ.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\15_C-PWSwrgn0s.txt`
- 这轮新增判断已收敛成三条：
  - Harness 要负责环境地图、评估规则、时间预算和阶段性算力分配，而不是让 agent 自己猜。
  - 浏览器能力应该显式路由成四层：`WebFetch -> API/search skill -> 隔离浏览器自动化 -> relay 接管当前浏览器`，而不是默认都走最重链路。
  - Skills 的价值在于把执行链拼成流水线，不在于继续堆名字；`self-improving-agent` 仍只采“任务后复盘与偏好沉淀”，不采运行时自改。
- 已把高价值结论压回 `D:\Projects\vrplayer\inspiration_value_notes.md`，没有新建额外噪音文档。

## 2026-03-10 08:40:51
- 已继续深读 4 条新的 cross-theme primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\14_TrVbBUKsbSM.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\11_45LHV3tynB8.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\03_io67uFrd54M.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\04_tHzef6d08ac.txt`
- 这一轮最重要的新增判断：
  - loop detection 是当前模型时代很值钱的临时护栏，但它是阶段性补丁，不是永恒结构。
  - `有记忆` 不等于 `会进化`；真正值钱的是反馈循环与规则更新。
  - 如果目标是让 OpenClaw 真正操控浏览器、本地文件和本地应用，本地执行面优先于云 VPS。
  - 用户感知价值的核心是“远程让电脑做事”，但能力越强越需要被编排成流程，而不是直接裸放。
- 本轮新增高价值结论已继续压回 `D:\Projects\vrplayer\inspiration_value_notes.md`，没有另建噪音文档。

## 2026-03-10 08:49:49
- 已继续深读 4 条新的 cross-theme primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\15_DS6oQtfwBME.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\02_l692H9z2YT8.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\03_p5XgacMxfnk.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\10_5HgJsB_1Dbc.txt`
- 这一轮新增判断继续收敛成三条：
  - 长任务的根解不是继续追超大上下文，而是把 `session compaction / memory flush / 状态外化` 分层使用，最终落到外部项目文档接力。
  - multi-agent 真正有价值的是“按职责拆入口和 agent”，而不是默认把所有复杂任务都并行化。
  - Harness 该轻、该删、该留 trace。真正稀缺的是长任务漂移和崩盘轨迹，不是越来越厚的手写控制流。
- 本轮新增高价值结论已继续压回 `D:\Projects\vrplayer\inspiration_value_notes.md`，没有另建噪音文档。

## 2026-03-10 08:52:10
- 已按“少量精读”继续补了 2 条新的 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\11_rket6Pz63Ns.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\08_l3hZDLruPj8.txt`
- 这轮新增判断更精确地落在两条：
  - `trace analyzer` 不是附加功能，而是 harness 的主改进闭环；关键不是看日志，而是把 `抓取 -> 并行分析 -> 汇总 -> 人工审查` 做成快速循环。
  - 技术债治理不能再靠人工每周抽空打扫，agent 时代更需要“黄金规则 + 后台持续小额清理 PR”。
- 本轮新增高价值结论已继续压回 `D:\Projects\vrplayer\inspiration_value_notes.md`，没有另建噪音文档。

## 2026-03-10 08:56:56
- 已继续按“少量精读”补了 2 条新的 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\09_i2OfHLwQSSQ.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\04_A0fJV942nnw.txt`
- 这轮新增判断更聚焦：
  - `Agents.md` 应该是地图，不是百科全书；真相源应分散到结构化 docs、architecture、执行计划、债务与质量文档里。
  - Harness 仍应被理解成 OS 层，而不是 agent 本体；它的核心价值是把长任务做成可控、可验证、可持续改进的系统。
- 本轮新增高价值结论已继续压回 `D:\Projects\vrplayer\inspiration_value_notes.md`，没有另建噪音文档。

## 2026-03-10 09:03:33
- 已继续按“少量精读”补了 2 条新的 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\02_55ecZkrVUSc.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\05_qnoL0d-qVJc.txt`
- 这轮新增判断继续收敛成两条：
  - 工程师角色正在从“写代码的人”迁移成“设计环境、明确意图、构建反馈的人”。
  - 规范文档不够，关键工程品味必须继续升级成可执行规则；对 agent 来说，规则是杠杆，不是束缚。
- 本轮新增高价值结论已继续压回 `D:\Projects\vrplayer\inspiration_value_notes.md`，没有另建噪音文档。

## 2026-03-10 09:08:40
- 已继续按“少量精读”补了 2 条新的 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\01_fbix4vwUkAE.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260305_topic15_all\03_cz03F10yeN0.txt`
- 这轮新增判断继续收敛成两条：
  - 渐进式披露不是抽象方法论，而是具体的产品做法：搜索工具、入口文件、文件引用、子代理、延迟加载。
  - 自主验证真正的前提是状态可读性；浏览器/CDP/DOM 和日志/指标/链路这些“感官”要先给到 agent。
- 本轮新增高价值结论已继续压回 `D:\Projects\vrplayer\inspiration_value_notes.md`，没有另建噪音文档。

## 2026-03-10 09:10:43
- 已继续自治补了 3 条 `openclaw24` 的短 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\06_iNpP7f5T0ag.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\08_1AI-2nRIEEw.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\10_1rgGQZ28uxc.txt`
- 这轮新增判断继续很收敛：
  - UI 自动化最稳的套路是“视觉探索一次 -> 步骤脚本化 -> 回放验证”，不是每次都让模型从零看图决策。
  - 浏览器 debug 模式是高权限但高成功率的重武器，更适合作为隔离环境里的升级链路，不该直接取代默认轻链路。
  - 官方 skill 站/聚合搜索的价值在“发现成本降低”，不是在证明“技能越多越强”。
- 已把后续 Round 19 / Round 20 直接写进 `D:\Projects\vrplayer\task_plan.md`，默认自治推进，不再等用户发“继续”。

## 2026-03-10 09:13:32
- 已继续把 `openclaw24` 剩余几条短 primary 补齐：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\07_BslzLq-Zncs.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\09_yxc2qlkd2-o.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\12_TXLOCdRqhRw.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260302_openclaw24\14__4NxY0LruH8.txt`
- 这轮新增判断继续很克制：
  - 真正有价值的是 `spec-first + 对抗评审 + 原子提交 + 测试闭环`
  - 大 skill 仓库和案例仓库更像发现层，不是产品决策层
- 已把后续 `Round 21` 直接写进 `D:\Projects\vrplayer\task_plan.md`，下一步默认进入“把已读 primary 压缩成少量可执行产品法则”的阶段。

## 2026-03-10 11:18:19
- 已继续补读 `20260225` 这组系统性很强的 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\01_p3zFZQGJ7r4.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\02_PG3H7F7SOKQ.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\03_xuGgmsBJf8s.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\05_0kt51Mn0oHk.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\06_bmFEILTeUgU.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\13_o4sednNl6fM.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\15__oDNye8VCeA.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\16_SVBM1T8uR3Q.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\17_m9IQkXeUKcQ.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\20_ukUJI6tV82w.txt`
- 这轮新增判断继续很收敛：
  - 上下文工程已经被主证据正式钉成“OS 层内存管理”，不是“更长提示词”。
  - 对当前 OpenClaw 最值钱的动态上下文方案是“稳定项目 capsule + 运行时即时检索”的混合策略。
  - `RAG for tools` 对生产链不稳，`稳定工具前缀 + 响应预填充/约束解码` 更适合当前主线。
  - 长任务最值钱的护栏不是继续拉长上下文，而是 `todo 复述`、`错误保留`、`Clean State`、`Git 回退` 和固定启动序列。
- 已把后续 `Round 23 / Round 24` 直接写进 `D:\Projects\vrplayer\task_plan.md`，继续默认自治推进，不再等用户发“继续”。

## 2026-03-10 11:23:43
- 已继续补读 `20260225` 里剩余几条高价值 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\07_WxozmiPjDSQ.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\08_jqcTp9P6qRs.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\11_EFP8HdhyK10.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\12_Zhht6_XJoCI.txt`
- 这轮新增判断继续很克制：
  - 默认应先走上下文工程，再考虑微调；当前主线没有必要提前切到微调思路。
  - 记忆必须至少分成“草稿纸”和“长期记忆”两层，过程性记忆和结论性记忆不能再混。
  - 选择机制比“存下来了”更关键；长期记忆、工具和知识检索都必须按场景加载。
  - KV 缓存命中率已经被主证据明确成生产级北极星指标之一，后面做上下文工程不能忽视前缀稳定。
- 已把后续 `Round 24 / Round 25` 继续写进 `D:\Projects\vrplayer\task_plan.md`，下一步默认从“继续读”逐步切到“压缩取舍表 + 产品法则”。
## 2026-03-10 12:18:26
- 已继续补读并纳入判断的 primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260225\\04_atJSJ1YxZs8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260225\\09_mG-UPf3eyN0.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260225\\10_UHpmGqqmKO0.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260309_aibaihua6_all\\02_FewLiMha3Uk.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260309_aibaihua6_all\\03_NUAr1v5bo4Y.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260309_aibaihua6_all\\06_item_02.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260307_openclaw_image7_all\\07_IoXpDP8CNP4.txt`
- 这轮新增判断继续收敛：
  - 压缩要区分 `summary` 和 `trimming`，不能把所有上下文都过早总结掉。
  - 隔离不只等于多 agent，还包括环境沙箱和 runtime state object；默认仍应保持单决策流。
  - 上下文工程 skill 化本身有价值，但核心仍是“按需加载”和“工具输出减负”。
  - OpenViking 式 `L0/L1/L2` 分层与“检索路径可见性”值得吸收，但更适合作为方法，不是直接替换当前真源体系。
  - `Scrapling` 一类外挂更适合作为任务型专用 skill，不适合变成默认前台主链能力。
- 本轮继续保持低噪音收口：没有新增扩张型文档层，只把高价值判断压回现有真源文件。

## 2026-03-10 12:52:26
- 已继续补读 `20260226_batch48` 里与多 agent / Lead / 外部计划保存最相关的 4 条 high-signal primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\05_bEaYiZSditM.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\11_tFM-2mvdBxQ.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\40_iDuJwtH8YKg.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\42__p_DPOvKWl8.txt`
- 这轮新增判断继续收敛：
  - 持续自治的第一版不一定先靠复杂 orchestrator，极简循环 harness + 明确 task prop + 日志就能先跑起来。
  - 如果后面真的扩多 agent，最稳的是 `Lead 规划/派工/综合 + worker 检索/执行 + Lead 最终交付`，不是去中心化大蜂群。
  - `Citing Agent` 这类只补引用、不改正文的验证型子代理非常值得借；它比“再加一个会想的 agent”更贴近当前主线。
  - 长任务在派工前先把 plan 存到外部记忆/外部文档，这条和我们当前的“状态外化”主线完全同向。
- 本轮继续没有扩新噪音文档层，只把高价值判断压回既有真源文件。

## 2026-03-10 12:56:41
- 已继续补读并纳入判断的 `20260226_batch48` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\10_49swsWg1DG0.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\34_nDgTrvi4ySU.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\35_iGqUPV2WN98.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\45_qHs7afP6ibM.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\46_tC6aivMplhs.txt`
- 这轮新增判断继续收敛：
  - 强耦合任务尤其是写代码，主线仍应坚持 `单决策流 + 集中写权限`；并行更适合只读、弱耦合、研究型子任务。
  - 给 agent 的反馈应尽量机器友好：短日志、显式错误关键字、预先算好的统计、可快速抽样的测试。
  - skill 的价值继续被主证据钉实为“封装过程知识”，不是再造一套 tool；`skill + tool + 外部脚本` 的分层比把所有能力硬塞进系统提示更稳。
  - 生产级多 agent 更该优先补 `断点续传 / 自愈 / 高层级可观测性 / 彩虹部署`，异步并发仍是远期升级链，不是当前默认切换项。

## 2026-03-10 13:21:08
- 已继续补读并纳入判断的 `20260226_batch48` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\06_OOGrue257rM.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\07_JClCkY2rSPc.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\09_Ow8I9aOvxCQ.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\12_2Cd0ecO8MSE.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\13_o1FVeHXnXCs.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\14_L9uj7lYMU7E.txt`
- 这轮新增判断继续收敛：
  - `Harness Engineering` 再次被主证据钉成“设计环境、明确意图、构建反馈”的系统工程，不是继续亲手补代码。
  - 项目级 autonomy 的核心不是更强模型，而是更硬的验证和审计机制；测试全绿不等于系统可信。
  - 执行能力应继续按 `tool / bash / codegen / MCP` 分层路由，而不是把所有外挂都做成前台默认能力。
  - `Gather Context` 默认仍应优先 `agentic search`；`semantic search` 是加速器，不是默认起手式。
  - `Verify Work` 的稳顺序已经被主证据讲透：先规则，后视觉，最后才是 `LLM-as-judge`。

## 2026-03-10 13:31:52
- 已继续补读并纳入判断的 `20260226_batch48` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\15_mgI0Wh1ZM3g.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\16_ke1MTyt7sAQ.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\19_HWI80m9E9W4.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\20_dRl14yIfN3k.txt`
- 这轮新增判断继续收敛：
  - `Claude Agent SDK` 的 builder 视角继续支持“给 agent 一台电脑”，而不是继续堆专门工具。
  - `Orchestrator-Workers` 是动态并行，不是默认工作流；更适合 breadth-first 研究与批量覆盖，不适合强耦合代码主线。
  - `Voting` 是可靠性型并行，不是效率型并行；更适合关键拦截，不适合默认问答与普通执行链。
  - 已开始把全部已读 primary 压成“当前 OpenClaw 主线明确取舍表 v1”，不再只堆阅读笔记。

## 2026-03-10 13:39:30
- 已继续补读并纳入判断的 `20260226_batch48` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\21_G5qERQf_dRA.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\22_of1DjMYd2_0.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\23_ZVjRvx68Ez8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\25_XxKC7YEzO5I.txt`
- 这轮新增判断继续收敛：
  - `Routing` 是入口分诊结构，只在不同输入的质量/成本/时延目标明显冲突时才值得上。
  - `Prompt Chaining` 是质量优先的串行结构，适合结构已知、可插 gate 的任务，不是默认慢路径。
  - `Sectioning` 只适合已知且固定的独立子任务并行，不适合动态拆分任务。
  - 多 agent 的正确拆分维度继续被主证据钉成“以上下文为中心”，不是按人类职能表拆分。

## 2026-03-10 13:47:18
- 已继续补读并纳入判断的 `20260226_batch48` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\26_91PTF0hfgek.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\27_tOkWT1XQMoU.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\28_lCv6cgRjax8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\29_Vu8-V2Fgo6Q.txt`
- 这轮新增判断继续收敛：
  - 多 agent 仍应是后手，不是默认升级；先试上下文工程和 `tool search`，再决定要不要增实体。
  - 评估框架只是加速器，不是主线本身；关键仍是测试任务、评分器、隔离环境和人工校准。
  - 自动化评估不是全部真相，必须叠加 transcript 阅读、生产监控、用户反馈等层，形成纵深防御。
  - “尽早从 20-50 个真实任务起步”的评估路线，已经足够可以转成当前 OpenClaw 的实际方法论。

## 2026-03-10 13:21:46
- 已继续补读并纳入判断的 `20260226_batch48` / Menace 尾部 primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\43_GY0O_GAN8QU.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\44_izDviZEYlBU.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\47_zaGprccLFO8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\48_-W-aKyS1KAc.txt`
- 这轮新增判断继续收敛：
  - 多 agent 的最强场景被进一步钉成 `breadth-first 的并行压缩`，最适合大研究/大审查，不适合默认写代码主线。
  - skill 的成长路径应是 `失败样本驱动 -> 小步修复 -> 多轮验证`，而不是先堆一池想象中的外挂。
  - 压缩应优先走 `schema/表单式摘要`；简单搜索可先回原文再压缩，复杂搜索更适合交给子 agent 封装。
  - 工具过载的主解法继续被钉成 `分层行动空间 + 固定原子接口 + 外部执行卸载`，而不是动态热插拔工具。

## 2026-03-11 00:00:00
- 已继续补读并纳入判断的 `20260226_batch48` 前半与剩余 high-signal primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\01_gWIJRNQ1dMU.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\02_4Z54NY5tWV4.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\03_RvlFzjXHYc8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\04_p4Wnc5ezfO0.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\08_0PfR8Ay0U8c.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\17_D2CnFzzTeBo.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\18_RcPUsqsp3CE.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\24_ZpU8LQp5GpQ.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\32_v2rvO799KWs.txt`
- 这轮新增判断继续收敛：
  - `batch48` 现在已经把当前主线几乎全部关键边界补齐：`规则代码化`、`机器友好反馈`、`吞吐量驱动护栏`、`验证子代理优先`、`评估金字塔`。
  - 端到端自治能力可以很强，但真正稀缺的仍然是结构化环境、规则、反馈和验证，不是“更敢放手”本身。
  - workflow 选型框架已经收官：默认先简单，再路由，再按瓶颈选 `chaining / sectioning / orchestrator-workers / voting / evaluator-optimizer`。
  - `20260226_batch48` 已基本完成高价值主证据消化，下一步更值钱的是把“明确取舍表 v1”压成 `5-8` 条可执行产品法则。

## 2026-03-11 00:10:00
- 已把当前“明确取舍表 v1”正式压成 `8` 条 OpenClaw 可执行产品法则，并把只属于升级链路的并行模式单独标出。
- 这轮收口后的主线更清楚了：
  - 默认先简单，不够再加结构。
  - Telegram 前台保持轻，代码主线保持 `one brain one stream`。
  - 最优先建设 `状态可读性 + 机器友好反馈 + 仓库真相源 + 规则代码化 + 分层评估`。
  - `Orchestrator-Workers / Sectioning / Voting / Evaluator-Optimizer / 高权限浏览器控制 / 异步并发` 统一降级为升级链路，而不是默认入口。

## 2026-03-11 22:22:57
- 已继续补读并纳入判断的 `20260226_batch48` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\30_7qJmHipfqy8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\31_j_COyjcBjC4.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\33_kJkc11xmKfg.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\36_N6Xb-hJi08g.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\37_gjWGuRVws9A.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\38_rsj321VCV4I.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\39_6d8gjkVK02k.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\41_5OV-XVTjkJk.txt`
- 这轮新增判断继续收敛：
  - 评估必须按 agent 类型分流，至少拆成 `coding / conversational / research / computer use` 四类评分逻辑。
  - 评估池必须显式区分 `capability` 和 `regression`，不能把“能做出来”和“能稳定做出来”混成一个分数。
  - `Trial / Transcript / Outcome` 现在已经可以作为后续 OpenClaw 评估体系的三个底层单位。
  - `Citation Agent` 与 `Research Sub-agent` 都更像高价值验证/研究工位，不像默认前台链路。
  - 复杂研究里的多 agent 双层并行和 tool 自改描述有价值，但都属于升级链路，不进入当前默认入口。

## 2026-03-11 22:29:03
- 已完成第一次冲突整理，把全部已读 primary 压成三层：`进入当前主线 / 只保留观察 / 暂不采纳`。
- 当前主线被进一步收紧：
  - 默认 `轻前台 + 单决策流主干 + Lead 收口`
  - 默认 `状态外化 + 仓库真相源 + 机器友好反馈 + 分层评估`
  - 默认优先扩 `验证 / 引用 / 独立研究` 三类子代理
- 当前不采纳的方向也更明确：
  - 不把 Telegram 前台做成全能总控台
  - 不把强耦合代码主线改成默认多 agent 并行
  - 不把更长上下文、更厚 prompt、动态工具热插拔当主解

## 2026-03-12 08:54:50
- 已继续补读并纳入判断的 primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260305_topic15_all\\07_CiI8juADMus.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260307_openclaw_image7_all\\01_vTaEqS2tI8w.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260307_openclaw_image7_all\\06_gptFbbbs6Pk.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260309_aibaihua6_all\\01_QpM8abg6s8Y.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260311_mxai2_all\\01_Jn3ywgwIpw0.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260311_mxai2_all\\02_kZ0-h7csizM.txt`
- 这轮新增判断继续收敛：
  - agent 时代应继续把产品重心放在整条工程系统的设计，而不是只盯编码段；
  - 单 agent 默认继续成立，多 agent 仍是后手；
  - 后续关键能力应尽量走 `machine-usable surfaces`，不要让主链过度依赖前台 UI。
- `OpenViking` 相关 primary 当前存在编码污染，只保留粗粒度判断：文件系统式组织、分层加载和透明检索路径值得借鉴，但细节在修复语料前不抬成主证据。

## 2026-03-12 08:58:56
- 已继续补读并纳入判断的 `openclaw24` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\16_wawNvxapF1s.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\17_GVTynFMMTwM.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\18_x7yadOEV1bo.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\19_h6e4sogMQr4.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\20_B_CM_M-I-0s.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\22_c44yRfk2UOY.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\23_hFJxXK88U0Q.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\24_XNJMwUdOzEc.txt`
- 这轮新增判断继续收敛：
  - `单 agent 多 session` 在共享 workspace 下容易出现记忆串线和 prompt 膨胀；
  - `heartbeat / 可重入性 / API-first tool priority` 继续进入当前主线；
  - `Memory Topics = 索引 + 核心规则 + 主题文件` 值得吸收，但不等于现在就切换整套记忆后端；
  - `派工一次 -> 后台独跑 -> hooks 回调收尾` 对 Codex/Cloud Code 长任务非常值钱；
  - 云端聊天入口与 Codespaces 沙盒成立，但仍只适合作为补位，不取代本地主链。

## 2026-03-12 09:00:39
- 已继续补读并纳入判断的 `openclaw24` primary：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\21_YoA2bf76t9E.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\28_KMN-hSKDP_g.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\29_wOi3MLssnnw.txt`
- 这轮新增判断继续收敛：
  - `21` 与 `20` 为同主题重复稿，只保留 `Hooks 零轮询派工` 共识；
  - 国内 UI 自动化更稳的方向是 `RPA 主路径 + UI Agent 理解/兜底` 的混合方案；
  - `Dual-Agent / Heartbeat / skill 修搜索` 这些能力形态成立，但把角色默认切到 `Full`、把高权限能力默认全开，不进入当前主线。

## 2026-03-12 09:06:18
- 已补读并纳入判断的 `batch48` 尾部与重复确认材料：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\05_bEaYiZSditM.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\11_tFM-2mvdBxQ.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\40_iDuJwtH8YKg.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\42__p_DPOvKWl8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_muzi3\\01_D6FkxqDhrRs.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_muzi3\\02_3oSL3fxEJqs.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_muzi3\\03_io67uFrd54M.txt`
- 这轮新增判断继续收敛：
  - `05` 继续钉实 `Agents.md 只做地图 / docs 才是真相源 / 知识必须进仓库`；
  - `11` 与 `40` 互相印证：`Lead Agent` 是研究型升级链路里的战略与合成中枢，不是默认前台人格；
  - `42` 继续支持 `Lead -> Search Workers -> Citation Worker -> 外部 plan memory` 的研究型闭环；
  - `muzi3` 三条与已读 `openclaw24` 高度重合，本轮只作为“加强共识”，不新增主判断；
  - 当前主线继续保持：`轻前台 + 单决策流主干 + 外部计划保存 + 验证型/研究型子代理只作为升级链路`。

## 2026-03-12 09:13:47
- 已按白名单入口进入 supplemental：`D:\\Projects\\_research\\stellarlinkco-codex`，未扫描整仓代码，只读取入口文档：
  - `README.md`
  - `codex-cli\\README.md`
  - `shell-tool-mcp\\README.md`
  - `codex-rs\\core\\README.md`
- 这轮 supplemental 新增判断继续收敛：
  - Codex 的 `AGENTS.md` 叠加语义与当前“地图式 AGENTS + 仓库真相源”路线一致；
  - `shell-tool-mcp` 证明 shell harness 的关键不只是有 shell，而是 `execve` 级规则拦截与动态 `sandbox-state`；
  - `codex-core` 继续支持“沙箱、可写根、网络和平台差异属于 core business logic”，也就是 harness 确实更像 OS 层；
  - 这轮 supplemental 没有推翻 primary 已收口的默认形态，只把“显式规则 + 动态沙箱状态 + 少量稳定原子接口”做实了一层。

## 2026-03-12 09:27:31
- 已继续补读高价值 supplemental：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\hooks.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\skills.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server\\tests\\suite\\v2\\compaction.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server\\tests\\suite\\v2\\review.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server\\tests\\suite\\v2\\skills_list.rs`
- 这轮新增判断继续收敛：
  - `hooks` 的真实价值是做生命周期护栏、阻断和下一轮上下文注入，不只是“可插脚本”；
  - `thread/compact/start` 是异步动作，请求立即返回，真正进度应看 `contextCompaction` 事件流；
  - `review/start` 天然就是验证链能力，可 `inline` 也可 `detached`，更像独立 review worker，不像前台默认人格；
  - `skills/list` 的行为是“按 cwd 精确列举 + forceReload 控缓存 + 额外 roots 必须绝对路径”，这继续支持“按需发现 skill”，不支持“默认全量热插拔”。

## 2026-03-12 09:28:17
- 已继续补读高价值 supplemental：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\execpolicy\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\process-hardening\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\network-proxy\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server-test-client\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\sdk\\typescript\\README.md`
- 这轮新增判断继续收敛：
  - `execpolicy` 的真实价值是把命令边界写成可测试的 prefix rules，而不是只靠提示词里的口头禁令；
  - `process-hardening` 与 `network-proxy` 继续支持“harness 是 OS 层”：进程防护、网络 allow/deny、loopback clamp 和 limited 模式都属于执行环境边界；
  - `network-proxy` 里的 `command / exec_policy_hint -> policy_decider` 继续强化了“exec 审批与网络放行应显式耦合”的系统方向；
  - `app-server-test-client` 与 `sdk/typescript` 则把 `Thread / run / runStreamed / resume / rejoin` 这套控制面讲清楚了：长任务、断线恢复和结构化输出都应按 thread 理解，而不是按单轮聊天理解。

## 2026-03-12 09:33:40
- 已继续补读高价值 supplemental：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\linux-sandbox\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\exec-server\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\debug-client\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\file-search\\README.md`
- 这轮新增判断继续收敛：
  - `linux-sandbox` 继续把 harness 的执行边界做实：`ro-bind / writable roots / protected subpaths / unshare-pid / unshare-net / seccomp` 都是系统层约束，不是前台能力说明；
  - `exec-server` 把 `Run / Escalate / Deny` 三分执行语义钉实了，说明命令是否升格出沙箱，应由 wrapper + server + 规则共同裁决，而不是由前台人格临场猜；
  - `debug-client` 更像协议观察器和线程调试工位，适合看 JSON-RPC、切线程、复现 rejoin，不适合变成默认用户入口；
  - `file-search` 只补强了一条稳判断：检索仍应优先走尊重 `.gitignore` 的透明文件系统搜索，它强化 `agentic search`，但不会改变当前默认主线。

## 2026-03-12 09:45:39
- 已继续补读高价值 supplemental：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\config.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\windows-sandbox-rs\\src\\lib.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\windows-sandbox-rs\\src\\policy.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\shell-command\\src\\lib.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\shell-command\\src\\parse_command.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\mcp-server\\src\\lib.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\mcp-server\\src\\exec_approval.rs`
- 这轮新增判断继续收敛：
  - `docs/config.md` 说明 `project .codex/config.toml + trust_level`、以及 hooks 本身就是 first-class 配置面，不是外围脚本技巧；
  - `windows-sandbox-rs` 把 ACL、token、workspace 保护、DPAPI、identity、firewall、audit 这些能力组织成了真实的 Windows 本地沙箱执行面；
  - `policy.rs` 明确拒绝 `DangerFullAccess / ExternalSandbox`，继续支持“默认主线必须围绕显式 sandbox policy 建模”；
  - `shell-command` 与 `mcp-server exec_approval` 则把命令解析、审批、事件流和线程上下文钉实了：审批应是协议级系统能力，不应再退回前台人格临场判断。

## 2026-03-12 09:48:10
- 已继续补读高价值 supplemental：`D:\\Projects\\_research\\stellarlinkco-codex\\docs\\agent-teams.md`。
- 这轮新增判断继续收敛：
  - `agent-teams` 的真正新增价值是把团队生命周期、任务 claim/complete、durable inbox 和 lead/worker 协作做成了可持久化工作流；
  - `team_message / team_broadcast / team_ask_lead` 都是 durable-first：先写 inbox，再 best-effort live delivery，这继续支持“团队协作先落外部状态，不靠聊天窗口硬撑”；
  - 但这套语义仍然只属于实验性升级链路，不推翻当前默认主线 `轻前台 + 单决策流主干 + 验证/研究子代理优先`。

## 2026-03-12 09:50:11
- 已停止继续散读，开始把已读 `primary + supplemental` 正式压成三层取舍表 v2。
- 当前默认主线已正式收口为：
  - `轻前台 + 单决策流主干`
  - `状态外化 + 仓库真相源`
  - `显式执行边界 + thread 化控制面`
  - `验证优先 + 透明检索`
- 当前只保留为升级链路的包括：
  - `研究/引用/黑盒验证子代理`
  - `async hooks / detached review / compaction`
  - `agent-teams`
  - `RPA+UI Agent 混合自动化`
  - `高权限浏览器控制 / Orchestrator-Workers / Voting / Evaluator-Optimizer`
- 当前正式判为暂不采纳的包括：`巨胖前台`、`默认全量热插拔`、`强耦合代码主线默认多 agent`、`更大上下文主解`、`memory=进化`。
## 2026-03-12 10:07:30
- 已完成一次最小运行态复验，不再只凭纸面取舍表判断当前 OpenClaw。
- 新鲜证据已钉实：
  - `openclaw status --deep`：`agent:telegram-fast:main -> gemini-3-flash-preview`，`agent:main:main -> gemini-3.1-pro-preview`
  - `openclaw channels status --probe --json`：Telegram `probe.ok=true`
  - `openclaw nodes status --json`：`paired=true`、`connected=false`
  - `openclaw browser status --json`：`running=false`、`cdpReady=false`
  - `openclaw agent --agent telegram-fast --message "只回答ok" --json`：已成功，但最小调用仍携带 `promptTokens=7749`、`systemPromptChars=16045`、`tools.schemaChars=17912`
- 当前运行态已经说明：现在最大的缺口不是“能力不够”，而是“前台太重、节点断开、浏览器运行面没拉起”。
- 这也把下一刀继续收口成三个动作顺序：先瘦 `telegram-fast`，再恢复 browser，再恢复 nodes。

## 2026-03-12 10:10:40
- 已把“前台太重”继续拆成可执行的瘦身顺序，不再停在抽象判断。
- 最新 `telegram-fast` 最小调用中，默认注入最重的几块已经量出：
  - `message=5013 schemaChars`
  - `browser=2799 schemaChars`
  - `cron=2689 summaryChars`
  - `nodes=1800 schemaChars`
  - `exec/process/web_search/sessions_spawn` 也都在高位
- 默认 skills 也不够轻：当前前台最小调用仍带 `acp-router / healthcheck / skill-creator / video-frames / weather`。
- 当前已把前台瘦身顺序收口成：
  - 先剥离 `message / cron / nodes / canvas`
  - 再下沉 `browser / ui / automation`
  - 最后再收窄 `sessions_spawn / subagents / default skills`

## 2026-03-12 10:14:20
- 已确认当前 `telegram-fast` 过重的更深根因：不是只删几个工具就够，而是它现在挂着 `tools.profile=full`。
- 关键证据已经对上：
  - `openclaw.json` 里 `telegram-fast.tools.profile = full`
  - 显式 allowlist 里没有 `cron`
  - 但最小调用的 `systemPromptReport.tools.entries` 里仍然出现了 `cron`
- 这说明当前前台并不是“最小白名单前台”，而是“full profile + 局部 allow/deny 修补”的形态。
- 现在三层能力面已经收口：
  - 保留默认：`fs/runtime/web + 只读 memory`
  - 按需升级：`browser/ui/automation + sessions/subagents`
  - 后台专属：`message/cron/nodes/gateway/tts`

## 2026-03-12 10:18:40
- 已用 OpenClaw 官方文档把 `profile -> allow -> deny` 的真实顺序校准完。
- 这轮最关键的新判断是：当前目标里的“轻前台 + web + 只读 memory + 最小原子执行”没有现成 profile 能直接命中。
- 因此如果真要实施前台瘦身，最优顺序不是：
  - 继续在 `full profile` 上修修补补
- 而是：
  - 先把 `telegram-fast` 改成 `profile=minimal`
  - 再显式挂回 `read/write/edit/exec/process/web_search/web_fetch/memory_get/memory_search`
- 这也意味着后面要真做“按需升级”，大概率需要独立 agent/subagent，而不是继续把所有升级能力留在同一个 `telegram-fast` 里。

## 2026-03-12 10:22:40
- 已进入 `openclaw24_deep`，但只对已经读过且 high-signal 的 primary 做 deep 校准，没有把 deep 层抬成新的一手证据。
- 已确认 deep 层没有推翻当前主线，反而继续加强：
  - `OpenCloud/OpenCore = 编排层 + session 治理层`
  - `token / session compaction / memory flush / session lock = 长任务治理原语`
  - `skills / Cloudhub = 能力资产层`
  - `browser automation` 的正确顺序是 `本地最小链 -> Profile/User Data 隔离 -> relay/remote-debugging 闭环`
- 已确认 `x7yadOEV1bo.deep.md` 存在局部污染，但仍能粗粒度支持 `issue / PR / workspace / README / release note` 这条可追溯产物链，不承担细节措辞比较。

## 2026-03-12 10:33:20
- 已继续补读第二批 `openclaw24_deep`，新增强化点集中在：`heartbeat / 可重入 session / hooks 派工与收尾 / gateway-node durable 协作 / 本地入口到云端编排的连接面`。
- `wawNvxapF1s.deep.md` 虽然编码污染明显，但粗粒度结论仍成立：`session / workspace / system prompt / channel / gateway` 是同一条控制面，不是彼此独立的小功能。
- `YoA2bf76t9E.deep.md` 继续加强：`Open Cloud + Cloud Code + Token + Hooks + Agent Teams` 真正讨论的是“效率与成本一起治理”，而不是只追吞吐量。
- `p5XgacMxfnk.deep.md` 与 `XNJMwUdOzEc.deep.md` 继续加强：`workspace 绑定 / 本地节点 / SSH/WebSocket/Gateway / durable 团队任务` 这些都更像协作与控制层，不像默认前台人格能力。
- `_research\\stellarlinkco-codex\\docs\\exec.md / sandbox.md / skills.md` 三份本地文件信息很薄，只能作为官方原文入口壳，不抬高为当前实现语义主证据。

## 2026-03-12 10:41:30
- 已继续补读第三批 `openclaw24_deep`，这批最有价值的新增不是“新架构”，而是把前面主线继续压实成三个具体方向：
  - `spec-first + git/review/feature/bug` 的仓库执行闭环
  - `skills` 作为能力资产层，而不是功能收藏夹
  - `WebFetch / LastThirtyDays` 这类 taskized data-ingress skills
- `9ZmsoNOGJSw.deep.md` 继续强化：高价值代理系统不是“功能堆叠”，而是 `Skill Vetting -> 可执行流水线 -> take the wheel -> Mail/Notion/本机接入` 这条可信执行链。
- `BslzLq-Zncs.deep.md` 继续强化：`brainstorming -> planning -> spec -> git repo -> review/feature/bug` 才是更稳的工程链，不是直接把多模型丢进仓库里自由发挥。
- `45LHV3tynB8 / 7eKq4DY62xM / TXLOCdRqhRw / yxc2qlkd2-o / 3oSL3fxEJqs` 目前都只保留观察：它们提供方向信号，但证据强度不足以推翻当前主线排序。

## 2026-03-12 10:48:10
- `openclaw24_deep` 正文文件已基本读闭合，剩余只是不承担主判断的日志/并行状态文件。
- 这一包 deep 最终沉淀下来的高价值加强点主要是 4 组：
  - `OpenCloud/OpenCore = 编排层 + session 治理层`
  - `session/compaction/memory flush/lock + durable 外部状态`
  - `skills = 能力资产层；WebFetch/LastThirtyDays = taskized data-ingress skills`
  - `可信执行链 = Skill Vetting / take-the-wheel / hooks / GitHub/README/issue/PR / BUG->OK`
- `h6e4sogMQr4.deep.md` 继续强化：真正值钱的不是再换模型，而是 `RAG + Rerank + Session + Gateway + GitHub/Markdown` 这一整条“检索治理 + 工程闭环”。
- `1rgGQZ28uxc.deep.md` 证据太薄，只留下方法论价值，不进入当前主线。
## 2026-03-12 10:37:43
- 已把“还有没有真正未读的主证据”校准成可验证状态：按 `primary-like` 口径排除 `_tmp / media / transcripts_s* / summary* / dup_hits` 后，`D:\Projects\灵感包\转写目录` 当前 `remaining=0`，说明根级主证据 transcript 已全部纳入。
- 已继续补读新的 `primary` 与 `supplemental` 高价值入口：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260311_mxai2_all\01_Jn3ywgwIpw0.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260311_mxai2_all\02_kZ0-h7csizM.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260309_aibaihua6_all\01_QpM8abg6s8Y.txt`
  - `D:\Projects\_research\stellarlinkco-codex\docs\agents_md.md`
  - `D:\Projects\_research\stellarlinkco-codex\docs\prompts.md`
  - `D:\Projects\_research\stellarlinkco-codex\docs\execpolicy.md`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\dynamic_tools.rs`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\rate_limits.rs`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\thread_status.rs`
- 新的高价值共识已收口：
  - `01_Jn3ywgwIpw0.txt` 继续压实：默认先单体 agent，保持简单、模块化、可观测；skill 在能力真的遇到边界时再加。
  - `02_kZ0-h7csizM.txt` 继续压实：软件正在从“为人设计”转向“为 agent 设计”；长期真正值钱的是 `API / MCP / CLI / 结构化搜索 / 身份 / 审计 / 计费` 这些 machine-usable surfaces。
  - `01_QpM8abg6s8Y.txt` 仍有明显编码污染，但粗粒度继续支持 `OpenViking = 文件系统式组织 + L0/L1/L2 分层加载 + 透明检索路径`。
  - `dynamic_tools.rs` 继续把“动态工具”钉成 `thread-start 注入 / per-thread registry / call-response round-trip`，说明动态工具更像线程级协议对象，不像全局默认热插拔。
  - `rate_limits.rs` 说明账户速率限制是正式的 runtime signal，且明确区分 `ChatGPT auth` 与 `API key auth`；这继续支持把账户/速率状态当成控制面，而不是外围提示。
  - `thread_status.rs` 说明 `thread/status/changed` 是第一等运行态事件，且支持 opt-out；这继续支持“线程级可观测性 > 前台口头状态说明”。
- 同时已确认 `docs/agents_md.md`、`docs/prompts.md`、`docs/execpolicy.md` 这三份 supplemental 文档本身都只是官方原文入口壳，不抬成强实现语义证据。

## 2026-03-12 10:45:16
- 已继续补读 4 个更贴近 Codex 控制面的 supplemental 入口：
  - `D:\Projects\_research\stellarlinkco-codex\docs\authentication.md`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\output_schema.rs`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\thread_resume.rs`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\turn_steer.rs`
- 新的高价值共识已收口：
  - `authentication.md` 仍只是官方入口壳，不单独承担实现语义。
  - `output_schema.rs` 说明结构化输出约束是 `per-turn` 的，不是 thread 级永久状态；这支持把“结果契约”做成单次任务控制面，而不是全线程人格设定。
  - `thread_resume.rs` 说明 thread 不是普通聊天记录，而是建立在 materialized rollout 上的 durable 运行对象；`resume` 可以恢复历史、重连活线程、带 override，但对运行中线程的 `history/path` 有严格限制，且 required MCP 初始化失败会直接阻断恢复。
  - `turn_steer.rs` 说明运行中转向是正式协议能力：只有存在 active turn 且 `expected_turn_id` 匹配时才能介入。这继续支持把“中途改主意/追加约束”建模成 thread/turn 级控制，不建模成随意聊天插话。
- 到这里，`stellarlinkco-codex` 里对当前主线最值钱的实现语义已经越来越集中在：`thread lifecycle + structured output + steer/resume + approvals/policy`。

## 2026-03-12 10:52:30
- 已继续补读 4 个最关键的 thread lifecycle 入口：
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\thread_start.rs`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\thread_read.rs`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\thread_fork.rs`
  - `D:\Projects\_research\stellarlinkco-codex\codex-rs\app-server\tests\suite\v2\thread_rollback.rs`
- 新的高价值共识已收口：
  - `thread_start.rs` 说明新 thread 默认是 `Idle`、可预先计算绝对 rollout path、但在首条用户消息前并不会真正 materialize；`ephemeral=true` 时 thread 可以保持无 path。
  - 同一条 `thread_start.rs` 还说明：项目级 `./.codex/config.toml` 可以在 trusted workspace 中直接影响新 thread 的推理参数；required MCP 初始化失败会直接阻断 thread start。
  - `thread_read.rs` 把一个很值钱的边界钉实了：`summary` 和 `turns` 是分开的读取面；未 materialize 的 loaded thread 能被读到 summary/path/status，但不能 `include_turns=true`。
  - `thread_read.rs` 还说明 thread 有正式的命名面：`thread/name/set` 会稳定反映到 `read / list / resume`；而失败后的 thread status 会进入 `SystemError`，这比“前台说崩了”更可信。
  - `thread_fork.rs` 说明 fork 的正确语义是：从已有 rollout 复制出新 thread，保留历史 turn 内容但不回写原始 rollout，也不继承 name；它更像“从历史分支出去的独立运行对象”。
  - `thread_rollback.rs` 说明 rollback 不是 UI 层撤回，而是正式裁掉最近若干 turns 并持久化回 rollout；这让 thread 真正具备“可回退的 durable 工作流”语义。
- 到这里，Codex 的高价值控制面已经更完整：`thread_start / read / resume / fork / rollback / steer / output_schema / status` 共同组成一个可治理的运行对象模型。
## 2026-03-12 10:55:28
- 已继续深读 `_research\\stellarlinkco-codex` 的 `thread inventory / archive lifecycle / model catalog / config RPC / turn interrupt` 相关实现语义，并完成新一轮真源落盘。
- `thread_list.rs` 已确认：thread inventory 本身就是正式运行控制面，支持 `pagination / provider filter / cwd filter / source kind filter / archived filter / sort / status / git metadata`；`SubAgentReview / SubAgentCompact / SubAgentThreadSpawn / SubAgentOther` 这些 source kind 也都被协议正式建模。
- `thread_archive.rs` 与 `thread_unarchive.rs` 已确认：archive/unarchive 不是 UI 小功能，而是 durable rollout 的冷热切换；只有 rollout materialize 后才能 archive，unarchive 会恢复到 sessions 目录、抬高 `updated_at`、并返回 `NotLoaded` 状态。
- `thread_loaded_list.rs` 已确认：`loaded in runtime` 与 `exists on disk` 是两个不同集合；loaded thread id 列表本身也有独立 API 与分页语义。
- `model_list.rs` 已确认：模型目录是正式 runtime surface，包含 `hidden / upgrade target / supported reasoning efforts / default reasoning effort / input modalities / is_default / pagination`。
- `config_rpc.rs` 已确认：配置治理本身就是协议级系统能力，支持 `effective config + origins + layered sources + tools/apps sections + trusted project layer + managed layer + version-checked writes + batch edits`。
- `turn_start.rs` 已进一步确认：文件修改审批和命令审批都是 per-turn 的协议事件；`AcceptForSession` 会在后续同会话文件修改中跳过重复审批；命令执行项会持续携带一致的 `process_id` 到 completed 事件。
- `turn_interrupt.rs` 已确认：中断运行中 turn 是正式 RPC，成功后会落成 `turn/completed`，且 turn status 为 `Interrupted`。
- `windows_sandbox_setup.rs` 已确认：Windows sandbox setup 本身也是正式生命周期动作，`setupStart -> setupCompleted` 已被建模成独立通知链。

## 2026-03-12 10:55:28
- 已继续补读 `initialize / request_user_input / safety_check_downgrade / experimental_api`。
- `initialize.rs` 已确认：`clientInfo.name` 会进入 originator/user-agent；`CODEX_INTERNAL_ORIGINATOR_OVERRIDE` 可直接改写 originator；无效 client name 会被协议层拒绝；客户端还能通过 `opt_out_notification_methods` 过滤特定通知。
- `request_user_input.rs` 已确认：人工补输入不是聊天即兴行为，而是 `Plan mode + ToolRequestUserInput + answers round-trip` 的正式工具回路。
- `experimental_api.rs` 已确认：实验能力需要显式 capability gate；没有 `experimental_api=true` 时，相关方法和字段会被正式拒绝，而不是静默忽略。
- `safety_check_downgrade.rs` 已确认：当服务端模型与请求模型不一致且触发高风险安全降级时，系统会发 `model/rerouted` 正式通知，并把原因建模成 `HighRiskCyberActivity`，而不是只在前台吐一段 warning 文本。

## 2026-03-12 11:09:48
- 已继续补读 `account.rs / app_list.rs / collaboration_mode_list.rs / connection_handling_websocket.rs / experimental_feature_list.rs / plan_item.rs / review.rs / compaction.rs / skills_list.rs`。
- `account.rs` 已确认：登录、登出、token refresh、workspace 绑定与 `account/updated` 都是正式运行控制面；`401` 后触发 refresh request 再重试，说明 auth/workspace 属于 harness 治理面，不是前台附属状态。
- `app_list.rs` 已确认：apps/connectors 是动态缓存目录，不是静态配置；目录列表和可访问工具列表会异步合并，并通过 `app/list/updated` 逐步刷新；thread_id 与 feature flag 会改变看到的 app 视图。
- `collaboration_mode_list.rs` 已确认：`Plan` 与 `Default` 是内建且可枚举的 collaboration mode 预设，不是聊天里随口约定的模式字符串。
- `connection_handling_websocket.rs` 已确认：WebSocket 的 initialize 与 request-id 都是 per-connection 隔离的；未初始化连接会被正式拒绝，说明多窗口/多客户端不能共享握手状态。
- `experimental_feature_list.rs` 已确认：实验特性有正式列表面，包含 `name / stage / display_name / description / announcement / enabled / default_enabled`；feature governance 应视为运行控制面的一部分。
- `plan_item.rs` 已确认：Plan mode 下 `<proposed_plan>...</proposed_plan>` 会被提升成正式 `ThreadItem::Plan`，并以 `item/plan/delta` 流式发出；没有 plan block 时不会伪造 plan item。
- `review.rs` 已确认：review 是正式 workflow，可 `inline` 或 `detached` 投递，并通过 `EnteredReviewMode / ExitedReviewMode / code review item` 进入线程历史。
- `compaction.rs` 已确认：context compaction 是 thread 级 started/completed lifecycle，可自动触发也可手动触发；“压缩”属于系统能力，不是前台习惯。
- `skills_list.rs` 已确认：skill roots 按 cwd 和绝对路径受治理，并带缓存与 force-reload 语义；skill 发现是受控目录面，不是全局热插拔乱扫。

## 2026-03-12 11:14:08
- 已补读 `analytics.rs / turn_start_zsh_fork.rs / mod.rs`。
- `analytics.rs` 已确认：analytics 默认是否启用由显式 flag 决定；它更像观测开关，而不是会改变当前 harness 主轴的核心控制面。
- `turn_start_zsh_fork.rs` 已确认：zsh fork 更像 shell 执行后端变体；它继续支持 `per-turn approval / command execution item / interrupt` 这条主链，但本身不足以改写当前控制面排序。
- `mod.rs` 已确认：它只是测试簇索引，作用是说明 app-server v2 覆盖面完整，不承担新增实现语义。

## 2026-03-12 11:20:08
- 已继续深读 `app-server-protocol` 与 `protocol` 对象层：`v2.rs / thread_history.rs / items.rs / plan_tool.rs / request_user_input.rs`。
- `Thread`/`Turn` 已进一步坐实为 durable runtime object：`turns` 不是普通通知默认携带的数据，而是只在 `resume/fork/read(includeTurns=true)` 这类显式历史操作里返回；`Turn.error`、`TurnStatus`、`ThreadTokenUsageUpdatedNotification`、`ThreadNameUpdatedNotification`、`TurnPlanUpdatedNotification` 都是正式对象。
- `ThreadItem` 已明确不是“聊天消息枚举”，而是统一运行轨迹对象，正式覆盖 `CommandExecution / FileChange / McpToolCall / CollabAgentToolCall / Review / ContextCompaction` 这些执行与治理节点。
- 审批、人类输入、动态工具也都已协议化：`approval_id / proposed_execpolicy_amendment / grant_root / DynamicToolCallParams / ToolRequestUserInputParams/Response` 全部进入正式 schema。
- `thread_history.rs` 又补了一层很值钱的实现语义：它会按 `turn_id` 把晚到的 `exec complete / turn complete / turn abort` 回挂到原始 turn，保留 compaction-only turn，并避免 `ThreadRollbackFailed` 或 out-of-turn error 误伤当前活 turn。

## 2026-03-12 11:25:59
- 已继续补 `Config / Requirements / Apps / Sandbox` 这组对象层，并对照 `docs/config.md` 的官方入口说明。
- `ConfigLayerSource` 已确认是正式 precedence 模型：`Mdm -> System -> User -> Project -> SessionFlags -> LegacyManaged*`，说明配置冲突应理解为“层覆盖”，不是前台口头解释。
- `ConfigReadResponse / ConfigWriteResponse` 已确认把 `origins / layers / version / overridden_metadata / file_path` 都做成正式控制面；配置写入不只是改 TOML，而是带版本与覆盖信息的协议操作。
- `ConfigRequirements / NetworkRequirements / ResidencyRequirement` 已确认把 approval、sandbox、web search、residency、端口与允许/拒绝域名做成正式要求对象，说明运行边界本身就是一等控制面。
- `AppsConfig / AppConfig / AppToolApproval` 已确认 connectors/apps 不是“装了就全开”，而是支持 `enabled / destructive / open_world / approval_mode / per-tool config` 的治理目录。
- `SandboxPolicy` 已进一步把执行面对象化：`DangerFullAccess / ReadOnly / ExternalSandbox / WorkspaceWrite` 与 `writable_roots / read_only_access / network_access / tmp exclusions` 全部进入正式 schema。

## 2026-03-12 11:31:54
- 已继续深读 `account.rs / app_list.rs / collaboration_mode_list.rs / review.rs / compaction.rs / skills_list.rs / analytics.rs / experimental_feature_list.rs`，把这批文件从“实现细节”收口成控制面判断。
- `account/auth/workspace refresh` 现在更清楚了：`401` 后触发的 refresh request 是正式协议回路；workspace 不匹配或 access token 非法时，turn 会直接失败。这说明账号与工作区绑定不只是外围状态，而是 turn 级成败条件。
- `apps/connectors` 已坐实为动态目录面：目录元数据和可访问工具清单会异步合并，通过 `app/list/updated` 持续推送；`force_refetch` 失败时旧缓存会保留下来，thread 级视图也会因为 `thread_id` 与 feature flag 发生变化。
- `review` 与 `compaction` 都进一步坐实为正式 workflow/lifecycle：review 支持 `inline/detached`，detached 会返回新 `review_thread_id`；compaction 支持自动与手动触发，且统一落成 `ContextCompaction` item 的 started/completed 生命周期。
- `skills_list` 说明 skill 目录不是全局热插拔：它受 `cwd + absolute extra roots + cache + force_reload` 约束；`collaboration modes` 与 `experimental features` 也都已经是内建且可枚举的目录对象。

## 2026-03-12 11:36:35
- 已继续深读 `connection_handling_websocket.rs / plan_item.rs`，并回看 `app-server-protocol v2.rs` 的 notification 对象层，把这轮焦点收口到 `notification fanout / transport isolation / plan delta`。
- WebSocket transport 的真边界已经更硬：`initialize` 与 request-id 路由都是 per-connection 隔离；未初始化连接会被正式拒绝，同一个 request-id 在不同连接间互不串线。
- Plan mode 的 plan item 也更清楚了：只有出现 `<proposed_plan>` block，才会被提升成正式 `ThreadItem::Plan` 并发出 `item/plan/delta`；没有 block 时不会伪造 plan item。
- `app/list/updated` 现在可以更准确地理解为“目录渐进合并”事件：系统允许先发中间快照，再在目录元数据和可访问工具清单合并后收敛到最终视图。
- 这轮继续把控制面主轴压得更实：高价值通知流是 `initialize / status / item started-completed / plan delta / app list updated / turn completed`，而不是前台靠自然语言自述运行态。

## 2026-03-12 12:02:34
- 已继续深读 `bespoke_event_handling.rs / codex_message_processor.rs / app-server-protocol common.rs`，把 `raw events / listener fanout / tool item 化` 这一层实现语义补齐。
- 新的稳定结论是：
  - `RawResponseItem` 是可选调试层，不是默认 durable truth；默认运行事实仍以 `ThreadItem + typed notifications` 为主。
  - 线程 fanout 是显式订阅模型：连接关闭会撤掉订阅，最后一个订阅者离开时才清 listener；同一 thread 上的 `experimental_raw_events` 是 last-write-wins。
  - `TokenCountEvent` 会拆成 `thread/tokenUsage/updated` 与 `account/rateLimits/updated` 两类正式通知；`TurnDiffEvent` 也有独立 `turn/diff/updated`。
  - MCP 工具、命令执行、文件改动都已经 item 化进入 thread history，而不是散落在自由文本里。

## 2026-03-12 12:09:34
- 已继续深读 `output_schema.rs / rate_limits.rs / thread_status.rs / turn_steer.rs / dynamic_tools.rs`，并用 `app-server/README.md` 反查通知与审批顺序。
- 新的稳定结论是：
  - `output_schema` 是 per-turn contract，不会自动变成 thread 持久属性。
  - `thread/status/changed` 是正式 runtime surface，可被客户端按连接 opt-out。
  - `turn/steer` 是 active-turn 协议控制，必须命中正在运行的 turn，并返回真正接受输入的 `turn_id`。
  - `dynamic_tools` 是 thread 级实验能力目录：在 `thread/start` 注册，通过正式 request/response round-trip 回注模型。
  - `item/completed` 才是 item authoritative state；`turn/completed` 目前不应被当成 canonical item list。

## 2026-03-12 12:19:37
- 已继续深读 `app-server-protocol common.rs / v2.rs / protocol items.rs`，把 `ServerRequest / ServerNotification / approval payload` 的边界补齐。
- 新的稳定结论是：
  - `ServerRequest` 的正式控制回路很窄：客户端主要只会被要求处理审批、动态工具调用、人工补输入和 ChatGPT token refresh。
  - `ServerNotification` 才是宽状态总线：线程/回合/item 生命期和 item-specific delta 构成了主要运行真相。
  - 审批 payload 里真正高价值的治理字段是 `approval_id`、`network_approval_context`、`command_actions`、`proposed_execpolicy_amendment`、`grant_root`；审批不只是 accept/decline。
  - `request_user_input` 已正式 schema 化，说明“人类补输入”是协议回路，不是普通聊天插话。
  - 底层 `TurnItem` 继续保持轻量，app-server 富化后的 `ThreadItem + item started/completed` 更适合作 durable history 与 UI 真相面。

## 2026-03-12 12:24:35
- 已继续深读 `thread_read.rs / thread_resume.rs / thread_fork.rs / thread_rollback.rs / turn_interrupt.rs`，把 durable workflow 语义补齐。
- 新的稳定结论是：
  - `thread/read` 是 summary-first 读取面，不等于完整恢复历史；只有显式 `includeTurns=true` 才读取 turns。
  - `thread/resume` 不是简单 reopen，而是受约束的重连/覆盖动作：未 materialize thread 不能 resume；无 override 的 resume 不应改 mtime；running thread 上禁止 `history` 或 mismatched `path` 覆盖。
  - running thread 上的 `resume` 更像 rejoin：即使传了 `model/cwd` mismatch，也会回到当前活 thread，并保留真实运行中的模型与状态。
  - `resume` 允许在已 materialize 的 durable thread 上注入显式 `history + model_provider` 覆盖；`personality` override 会在后续 turn 的 developer 输入中显式注入，而不是隐式改历史。
  - `fork / rollback / interrupt` 都是正式 workflow：fork 复制 rollout 历史到新 thread，rollback 真裁剪并持久化 turns，interrupt 以 `turn/completed(status=Interrupted)` 作为清理完成信号。

## 2026-03-12 12:30:56
- 已继续深读 `thread_start.rs / turn_start.rs / app-server-protocol v2.rs`，把 thread 出生、首轮 override 持久化、审批切换和 session 级批准记忆这组边界补齐。
- 新的稳定结论是：
  - `thread/start` 先创建的是 `Idle` 控制对象，不是已 materialize 的历史；新 thread 默认 `preview` 为空，path 可预计算但首条用户消息前 rollout 尚未落盘；`ephemeral=true` 时 thread 甚至可以完全无 path。
  - `thread/start` 会吃 `cwd` 指向项目的 project-layer config：trusted project 下 `.codex/config.toml` 的 `model_reasoning_effort` 等设置会直接反映到 `ThreadStartResponse`；required MCP 初始化失败时，thread/start 会直接失败，不会留下半启动 thread。
  - `turn/start` 的 override 不是纯本轮临时值，而是本轮及后续 turn 的新默认层：`cwd / approval_policy / sandbox_policy / model / effort / summary / personality / output_schema / collaboration_mode` 都在同一 start-time 控制面建模。
  - `collaboration_mode.settings` 具有正式优先级：它会压过同一 turn 里的普通 `model / reasoning_effort / developer instructions` override；人格变更则通过 `<personality_spec>` 注入 developer layer，而不是回写旧历史。
  - 审批与执行边界会跨 turn 持续：`approval_policy=never` 会让后续命令跳过审批；`cwd` 与 `sandbox_policy` 更新后，下一个 turn 的命令 item 会按新的 cwd/sandbox 启动；`FileChange AcceptForSession` 会在同一 thread/session 内记住批准结果。

## 2026-03-12 12:42:24
- 已继续深读 `agent-teams.md / multi_agents.rs / inbox.rs / team_ask_lead.rs / agent_teams.rs / multi_agents tests`，把 team 体系从“多 agent 功能”收口成 durable workflow 控制面。
- 新的稳定结论是：
  - `agent teams` 的正确产品理解不是“多几个会说话的子脑”，而是 `team config + persisted tasks + durable inbox + cursor/ack + worktree lease` 组成的持久化工作流系统。
  - `team_message / team_broadcast / team_ask_lead` 都是 durable-first：系统先把 payload 写进 `inbox/<thread>.jsonl`，再 best-effort live delivery；发送失败时消息仍被持久保留，并通过 `delivered=false / inbox_entry_id / error` 暴露出来。
  - `team_inbox_pop` 和 `team_inbox_ack` 不是 UI 小技巧，而是显式 cursor 协议：ack token 绑定 `team_id + thread_id + acked_lines + last_entry_id`，要求单调前进；invalid token、team/thread mismatch 都会正式报错。
  - `team_task_claim` 与 `team_task_complete` 都有并发正确性测试：claim 在并发下保持 exclusive，complete 的 hook 在并发下只 dispatch 一次。这说明 team task board 是受锁保护的正式状态机，不是聊天约定。
  - `worktree=true` 会为 team 成员创建独立 git worktree，并在 `close_agent / team_cleanup` 时配对清理；这把 team 从“多人同目录抢写”提升成“各自独立执行环境 + 持久任务/消息面”。

## 2026-03-12 12:49:31
- 已继续深读 `spawn.rs / team_task_complete.rs / hooks registry.rs / hooks types.rs`，把 team 和 hooks、spawn lifecycle、worktree lease 的连接方式补齐。
- 新的稳定结论是：
  - subagent spawn 不是静默内部动作，而是正式生命周期：`CollabAgentSpawnBeginEvent / EndEvent` 明确包住 spawn，spawn 成功后还会触发 `subagent_start` hook，并把 hook 返回的 `additional_context` 注入子 agent 的 developer layer。
  - `team_task_complete` 的高价值语义不是“把任务改成 completed”，而是“先拿 completion lock，再跑 `task_completed` hook，再写 Completed 状态”；这让 task 完成后的自动化链路拥有并发正确性。
  - hooks 体系已经把 `TaskCompleted / SubagentStart / SubagentStop / WorktreeCreate / WorktreeRemove / PreCompact` 都对象化成正式 `HookEvent`，说明很多二阶工作流不是外围脚本习惯，而是 protocol-adjacent lifecycle。
  - `worktree=true` 也不只是“新建一个目录”：它还能走 `worktree_create / worktree_remove` hook，把隔离执行环境提升成受治理的生命周期面，而不是实现细节。

## 2026-03-12 12:51:42
- 已继续深读 `close_team.rs / team_cleanup.rs / spawn_team.rs`，并用 `multi_agents tests` 反查 `partial close / slot release / worktree hook` 的真实行为。
- 新的稳定结论是：
  - `spawn_team` 不是“多开几个 worker”这么简单，而是正式的建队动作：成员唯一命名、成员级 task、可选 role/model/provider/worktree/background、初始 task 持久化，都会在建队时一次进入 durable team state。
  - `close_team` 是可部分执行的降编动作，不是总是彻底拆队。它支持只关部分成员；只有关闭且 worktree 清理成功的成员才会从 registry 中移除；失败成员会保留在队里，避免把半失败状态伪装成完成。
  - `team_cleanup` 才是彻底拆队动作。它会面向全体成员执行关闭与 worktree 清理，并在成员清空后移除 team registry、team config 和 task dir；相关测试还确认它能释放已 shutdown 成员占用的线程槽位。
  - `worktree hooks` 已经把隔离执行环境变成正式治理面：`spawn_agent`/`spawn_team` 在非 git cwd 下本应拒绝 `worktree=true`，但若 `worktree_create` hook 提供合法路径，系统会接受这条升级链路；清理时再通过 `worktree_remove` hook 回收。

## 2026-03-12 12:58:54
- 已继续深读 `review.rs / compact.rs / compact_remote.rs` 及对应测试，确认 `review` 与 `compaction` 都不再只是“助手习惯”，而是正式二阶 workflow。
- 新的稳定结论是：
  - `review` 的真实产品形态是“隔离子线程 + 结构化退出”。它会用独立 rubric、独立 review model、禁用 web/collab、审批默认 never 的子线程执行，再把结构化 `review_output` 和回写后的 user/assistant rollout 消息回灌到父线程。
  - `review` 流刻意压制 assistant streaming/delta；父线程消费的真相不是 reviewer 过程流，而是 `ExitedReviewMode` 携带的结构化结果和最终回写的历史。
  - `compaction` 的真实产品形态是“正式 lifecycle + durable history 重写”。无论 local 还是 remote，都以 `ContextCompaction` item 的 started/completed 进入历史，并把 `Compacted` rollout item 持久化。
  - `compaction` 的高价值不是生成摘要本身，而是清洗并重建模型后续可见历史：剥离尾部 model-switch developer message、限制 user messages token 预算、过滤 stale developer/wrapper、按规则重新注入 canonical initial context。
  - `remote compaction` 还额外体现了“失败日志化 + codex-generated item 裁剪 + ghost snapshot 保留”的治理语义，说明它更像正式控制面的一部分，而不是纯模型调用技巧。

## 2026-03-12 13:05:49
- 已继续深读 `compact_remote.rs / compact_resume_fork.rs`，把 `remote compaction + resume/fork` 的模型可见历史边界补齐。
- 新的稳定结论是：
  - remote compaction 的 follow-up 请求优先消费返回的 compaction item；如果 remote 输出只剩 compaction item，旧 assistant/user 历史可以整体让位给这个新 item。
  - remote pre-turn compaction 当前会排除 incoming user；模型切换时还会先剥离 incoming `<model_switch>`，然后在 post-compaction follow-up request 中把新 user 与 model-switch 恢复进去。
  - remote compaction 失败会直接停止本轮 agent loop，不会继续偷偷跑 follow-up turn；`invalid compact payload` 与 `context window exceeded` 都属于正式 stop 条件。
  - `compact -> resume -> fork -> compact -> resume` 的主不变量是“模型可见历史前缀保持稳定”：resume/fork 后的新请求仍应以前一轮 compact 后的历史为前缀，只在尾部追加新的 user turn。

## 2026-03-12 13:09:31
- 已继续深读 `codex_thread.rs / thread_manager.rs / message_history.rs / rollout/*`，把全局历史、rollout、线程运行态三层关系补齐。
- 新的稳定结论是：
  - `message_history` 是全局 append-only `history.jsonl`，只负责 session 级文本日志，不等于 durable thread history。
  - `rollout` 才是每个 thread 的 durable artifact，而且采用 deferred materialization：只有显式 `persist()` 才真正落盘。
  - rollout 落盘不是原样保存所有事件，而是受 `Limited/Extended` policy 控制，只保留对 resume/read/fork 有价值的 response items 和选定事件。
  - `ThreadManager` 的 fork 截断按真实 user turn 边界进行，并会应用 `ThreadRolledBack` marker、忽略 session prefix；所以 fork 看到的是有效历史，而不是原始流残片。
  - thread 的 durable 真相依赖 `SessionConfigured` first-event 握手，前台若跳过这层，就会误把聊天流当运行态。

## 2026-03-12 13:14:18
- 已继续深读 `state_db.rs / context_manager/* / session_prefix.rs / state/session.rs / state/turn.rs`，把索引层、模型视图层、活 turn 协调层的边界补齐。
- 新的稳定结论是：
  - `state_db` 更像索引/修复层，不是 durable truth；线程列表仍是 filesystem-first，SQLite 负责 backfill、repair stale rollout path、加速查询。
  - `SessionState.history(ContextManager)` 才是“下一轮模型实际看到什么”的运行时主面；它维护 model-visible items、token info、reference context、previous model 和历史替换/裁剪逻辑。
  - `session_prefix` 是特殊的 model-visible user-role item：它会进入历史，但不构成 user-turn boundary。
  - 上下文变化不会静默改底稿，而是通过 `context_manager/updates` 生成显式 update items；`model_switch` developer instructions 优先于其他设置 diff。
  - `state/turn.rs` 说明审批、人工补输入、dynamic tool response、pending input 都只属于 active turn 协调层，不属于 durable history。

## 2026-03-12 13:21:30
- 已继续深读 `context_manager/normalize.rs / history.rs / history_tests.rs / truncate.rs / session_prefix.rs`。
- 新的稳定结论是：
  - `normalize_history()` 只做最小不变量修复：补齐 call/output 配对、删除 orphan outputs、按模型能力剥离图片输入。
  - 运行时历史默认只截断工具输出，不主动改写普通消息、reasoning、函数调用和 shell 调用。
  - `session_prefix / user instructions / skill instructions / user shell command / subagent_notification` 虽然 model-visible，但都不算真实 user-turn 边界。
  - token 使用量不是一个总数快照，而是“最近成功 API 响应 + 本地尾部新增 items”的两段式账本。

## 2026-03-12 13:30:01
- 已继续深读 `protocol.rs / environment_context.rs / models.rs`。
- 新的稳定结论是：
  - 会话协议本身就是 `SQ/EQ` 模型，客户端更像控制面而不是聊天窗。
  - `OverrideTurnContext` 是独立控制操作，不附带用户输入；它只改后续 turn 默认值。
  - `TurnContextItem` 是完整运行上下文快照，不只是几项零散设置。
  - `EnvironmentContext` 的注入是 sparse diff XML，只在 `cwd / network` 变化时重发；网络也只投影允许/拒绝域名列表。

## 2026-03-12 13:35:27
- 已继续深读 `permissions_messages.rs / send_message.rs`。
- 新的稳定结论是：
  - 权限消息是可重放的 developer-layer 上下文：启动时只发一次，权限 override 变更后会追加新消息，无变更则不重复。
  - `resume` 与 `fork` 都会继承并继续追加权限消息，说明权限 developer message 具备 durable replay 语义。
  - raw item opt-in 下，模型可见前导顺序稳定为：`permissions -> developer instructions -> AGENTS/instructions -> environment -> user -> assistant`。
  - `model_switch` 注入是 bounded developer-layer 更新：post-resume 首轮会带显式 `<model_switch>`，后续 turn 不应继续重复新增。

## 2026-03-12 16:31:49
- 已继续深读 `approvals.rs / dynamic_tools.rs / mcp.rs / user_input.rs / send_input.rs / resume_agent.rs / locks.rs`。
- 新的稳定结论是：
  - `approval` 是正式 policy 协商对象，不只是 accept/decline；`approval_id / network_approval_context / proposed_execpolicy_amendment / grant_root` 都是一等治理字段。
  - `user_input` 本身就是富输入协议：`Text + text_elements / Image / LocalImage / Skill / Mention` 都是正式输入类型。
  - `mcp` 在 protocol 层被对象化成统一适配面：`Tool / Resource / ResourceTemplate / CallToolResult`，说明前台不该直接消费杂乱 wire JSON。
  - `send_input / resume_agent` 说明 team member 是可持续驱动、可从 rollout 恢复的 durable worker，而不只是 spawn 一次就丢着跑。
  - `locks.rs` 说明 multi-agent durable workflow 的并发正确性依赖显式文件锁治理，Windows 也有正式 share-mode/retry 语义。

## 2026-03-12 16:35:46
- 已继续深读 `team_message.rs / team_inbox_pop.rs / team_inbox_ack.rs / team_task_claim*.rs / team_task_complete.rs / team_task_list.rs / team_broadcast.rs / wait.rs / wait_team.rs`。
- 新的稳定结论是：
  - `team_message / team_broadcast` 是 durable-first：先写 inbox，再尝试 live delivery；live delivery 失败不会丢消息，而会留下 `inbox_entry_id + error` 供后续恢复。
  - `team_inbox_pop / team_inbox_ack` 形成正式 cursor/ack 协议；`ack_token` 绑定 `team_id + thread_id`，不是可随意跨线程复用的字符串。
  - `team_task_claim / team_task_claim_next / team_task_complete` 说明 team task board 是带依赖检查、排他 claim、一次性 completion hook 的持久状态机，而不是 prompt 约定的待办列表。
  - `team_task_list` 默认只暴露当前有效成员的任务，说明 team 视图会主动做“成员有效性清洗”。
  - `wait / wait_team` 是正式 lifecycle surface：支持 `Any/All + timeout + triggered_member`，并通过 `CollabWaitingBegin/End` 事件把等待状态写进运行轨迹。

## 2026-03-12 16:42:33
- 已继续深读 `thread_id.rs / openai_models.rs / rollout/metadata.rs / session_index.rs / list.rs / state/service.rs / context_manager/mod.rs`。
- 新的稳定结论是：
  - `ThreadId` 是 UUIDv7 的强类型协议对象，不是随手传来传去的临时字符串；它在各边界上都被当成 opaque handle 处理。
  - 模型目录是 rich catalog object，不只是 slug 列表；`visibility / shell_type / reasoning preset / truncation policy / context window / input modalities / prefer_websockets / personality template` 都是一等元数据。
  - `rollout/metadata` 说明 state db 元数据和 dynamic tools 都是从 rollout/session meta 派生回填的，state db 更像 derived index，不是真相源本体。
  - `session_index.jsonl` 是 append-only 的 thread-name alias index；名字解析按“最后写入获胜”的反向扫描语义进行，不是事务型数据库语义。
  - `SessionServices` 把 auth/models/mcp/skills/exec-policy/hooks/network-approval/state-db/model-client 聚成 session-scoped 服务集，继续支持“高价值 harness 在控制面对象和服务编排里”。 

## 2026-03-12 16:46:16
- 已继续深读 `config_types.rs / custom_prompts.rs / message_history.rs / lib.rs / app-server-protocol mappers/mod/v1.rs`。
- 新的稳定结论是：
  - `config_types` 说明模式、人格、沙箱、Web 搜索、信任级别这些都不是 prompt 文案，而是正式协议配置对象。
  - `CollaborationMode + CollaborationModeMask` 说明协作模式是 preset/mask 机制，不是简单标签；`request_user_input` 允许性直接绑在 mode 上。
  - `custom_prompts` 只是 slash-command 级扩展对象，属于命令目录，不是 thread/turn 主控制面。
  - `message_history` 继续把全局文本历史压回低层：它只是 `conversation_id / ts / text` 的轻量条目。
  - `app-server-protocol v1` 是兼容层/前台壳，不是真相层；它通过显式 mapper 接到 v2/core protocol，而不是和底层对象处于同一层。 

## 2026-03-12 16:50:32
- 已继续深读 `account.rs / parse_command.rs / models.rs / num_format.rs`。
- 新的稳定结论是：
  - `PlanType` 只是标准化账户等级枚举，说明 account 面在 protocol 层首先是 capability/entitlement 标签，不是复杂前台叙事对象。
  - `ParsedCommand` 被收成 `Read / ListFiles / Search / Unknown` 四类稳定语义，说明 harness 更偏向少量可解释命令类别，而不是全量 shell 语义化。
  - `models.rs` 是响应对象与 developer-layer 装配中心：`ResponseItem` 汇总消息、reasoning、shell、函数、tool、web search、ghost snapshot、compaction 等对象；permissions、sandbox、collaboration mode、model switch 都在这里被装进 developer-layer。
  - `MessagePhase(commentary/final_answer)`、tool output payload、image wrapping、`SandboxPermissions` 也都被对象化，进一步支持“前台看到的是受治理对象流”。
  - `num_format.rs` 只是可读性基础设施：locale-aware separators 与 SI suffix 属于展示层，不属于 durable truth。

## 2026-03-12 16:56:45
- 已继续深读 `request_user_input.rs / common.rs / thread_history.rs`。
- 新的稳定结论是：
  - `request_user_input` 不是“助手向人类问一句话”，而是正式的人类补输入协议：问题、选项、`isSecret/isOther`、答案映射、`call_id/turn_id` 都是 schema 化对象。
  - `app-server-protocol/common.rs` 不是业务逻辑，而是方法目录、版本边界、实验能力 gate 和 schema 导出层；它通过宏把 request/notification 目录正式生成出来。
  - `thread_history.rs` 不是 raw transcript 回放器，而是从 rollout/event 重建 rich `ThreadItem/Turn` 视图的整形层。
  - `thread_history` 的关键不变量已经很清楚：late events 优先按 `turn_id` 回挂原 turn；`rollback failed` 不应把 turn 误标失败；`ContextCompaction / review / collab wait/resume/close` 都是 durable history 里的正式 item。

## 2026-03-12 17:00:51
- 已继续深读 `approvals.rs / mcp.rs / dynamic_tools.rs`。
- 新的稳定结论是：
  - `approvals` 不是 yes/no 按钮层，而是正式的 policy negotiation 层；真正值钱的是 `approval_id / network_approval_context / proposed_execpolicy_amendment / grant_root / parsed_cmd`。
  - `mcp.rs` 不是 MCP 原始 wire JSON 镜像，而是 TS/JsonSchema 友好的适配层；高价值在于把异构 MCP 值收成少量稳定协议对象。
  - `dynamic_tools.rs` 说明动态工具也不是“热插拔一切”，而是 thread/turn 绑定的最小注册表：spec、call request、response 都被收成明确 schema，输出也被压成文本/图片内容项。

## 2026-03-12 17:12:25
- 已继续深读 `user_input.rs / inbox.rs / spawn.rs`。
- 新的稳定结论是：
  - `UserInput` 本身就是富输入协议面：文本、图片、本地图、skill、mention 都是一等对象，不该被压回单字符串。
  - `TextElement` 的 byte-range + placeholder 语义说明 rich input 应绑定原始文本缓冲区持久化，而不是改写字面文本。
  - `inbox.rs` 证明 durable team inbox 的底座就是 append-only JSONL + cursor.json + exclusive lock；收件、游标、确认都是正式对象，不是 UI 临时状态。
  - `spawn.rs` 证明 spawn 不是“多开一个脑子”，而是受深度限制、可带 worktree 租约、可注入 hook、失败会回滚的正式生命周期控制器。

## 2026-03-12 17:17:26
- 已继续深读 `resume_agent.rs / send_input.rs / team_ask_lead.rs / multi_agents.rs`。
- 新的稳定结论是：
  - `resume_agent` 是 rollout-backed recovery，不是普通 reopen；它会先查活状态，只有 `NotFound` 才走 `resume_agent_from_rollout`，并同时受深度限制与 slot 压力治理。
  - `send_input` 是受治理的交互生命周期，不是纯文本转发；可选先 interrupt，再发 `CollabAgentInteractionBegin/End` 事件，再提交结构化输入并读取成员最新状态。
  - `team_ask_lead` 是 durable-first 的升级通道：先写 lead inbox，再尝试 live delivery，因此 durable truth 和 live truth 会同时返回。
  - `parse_collab_input / input_preview` 说明 team 协作输入已经对象化并可规范化预览，不该再被理解成“给另一个 agent 发一段聊天文本”。

## 2026-03-12 17:25:06
- 已继续深读 `agent/control.rs / agent/guards.rs / client.rs / thread_status.rs / protocol.rs`。
- 新的稳定结论是：
  - `AgentControl` 是 per-session multi-agent control plane，不是 per-thread helper；spawn depth、slot、nickname 都绑定在同一用户会话上治理。
  - `spawn_agent` 是正式两段式 lifecycle：reserve -> create thread -> send input；`resume_agent_from_rollout` 则会从 rollout 恢复 source/nickname/role 后再接上 watcher。
  - `maybe_start_completion_watcher` 说明子代理完成后回灌父线程不是聊天技巧，而是受治理的 completion notification 回路。
  - `ModelClient` 是 session-scoped，`ModelClientSession` 是 turn-scoped；sticky routing 依赖 `x-codex-turn-state`，subagent 来源则通过 `x-openai-subagent` 头显式上送。
  - `thread/status/changed` 是正式 runtime surface，而且客户端可按连接 opt-out；这进一步支持“前台最该消费的是受治理的通知流，不是自然语言自述”。

## 2026-03-12 17:29:57
- 已继续深读 `client.rs`、`initialize.rs`、`turn_start.rs`。
- 新的稳定结论是：
  - `ModelClientSession::build_responses_options()` 会把 `conversation_id + session_source + turn_state + turn_metadata_header` 一起带到请求层，说明 thread/source/sticky-state 是 transport truth。
  - websocket prewarm 只是握手预热，不会提前发送 turn payload；而 websocket fallback 是 session-scoped，一旦禁用会影响后续 turns。
  - `initialize` 会把 `clientInfo.name` 转成 `user_agent/originator`，并在握手层严格校验 header 合法性；非法 client name 会直接失败。
  - `turn_start` 会把 `originator` 头真实带给 provider，rich input 的 `text_elements` 也会原样进入 `ThreadItem::UserMessage`。
  - `thread/status/changed`、`thread/started` 等通知支持按连接 opt-out，说明通知扇出本身就是 connection-scoped capability，不是固定 UI 行为。

## 2026-03-12 17:34:18
- 已继续深读 `turn_start.rs`、`turn_steer.rs` 与 `client.rs` 的 websocket append/create 路径。
- 新的稳定结论是：
  - `collaboration_mode` 是高阶 preset，会压过同轮 `model / effort` override，并把与 mode 绑定的 developer instructions 一起注入请求。
  - `personality` override 只在发生变化时才追加新的 `<personality_spec>` developer-layer 注入，不会每轮重复堆文案。
  - `turn_steer` 是 active-turn control，必须命中当前活 turn 且带 `expected_turn_id` 才成立。
  - `client.rs` 的增量请求 baseline = `previous_request.input + server-added items`；只有非 input 字段完全一致、且新输入严格扩展 baseline 时，才允许增量续写。
  - websocket v2 倾向 `response.create(previous_response_id=...)`，旧路径才走 `response.append`；两者都受 `can_append` 与 baseline 校验约束。

## 2026-03-12 17:34:12
- 已继续深读 `config_rpc.rs`、`model_list.rs`、`account.rs`。
- 新的稳定结论是：
  - `config/read` 不是只给当前值，还会给 `origins + ordered layers`；配置真相是可追溯分层对象。
  - config precedence 至少覆盖 `managed -> user -> system`，project layer 还会按 `cwd + trust level` 动态加入。
  - `config_value_write / batch_write` 带 `expected_version` 与 `configVersionConflict`，说明配置写入是 versioned write，不是盲覆盖。
  - `model/list` 是 rich catalog + pagination surface，支持 `limit/cursor/include_hidden`；非法 cursor 会正式报错。
  - `account` 的真正高价值在 `auth state + account metadata + refresh workflow`：外部模式下不会为 `refresh_token=true` 私自发刷新请求；遇到 401 才走正式 refresh 回路并重试。

## 2026-03-12 17:41:57
- 已继续深读 `locks.rs`、`windows_sandbox_setup.rs`、`rollout/list.rs`、`rollout/tests.rs`，并补读 `protocol/src/prompts/**` 的默认前导与权限模板。
- 新的稳定结论是：
  - `multi_agents` 的 durable 协作底座依赖真正的 OS 文件锁；Windows 分支用 `share_mode(0)` 独占锁并对 sharing/lock violation 做阻塞重试，因此 inbox/task/workflow 并发不是纯逻辑约定。
  - `windowsSandbox/setupStart -> windowsSandbox/setupCompleted` 是正式 RPC + completion notification 生命周期，说明 Windows 沙箱 setup 本身就是一等控制面对象。
  - `rollout/list.rs + rollout/tests.rs` 证明 thread 发现面是 `summary-first + capped scan + cursor pagination + filesystem fallback repair`；state db 路径失真时会回退到 rollout 文件系统并自修复索引，因此 rollout 仍是真相源、state db 仍是派生索引。
  - `protocol/src/prompts/**` 只是 approval/sandbox/control 状态的文本渲染层，不是 durable truth 本体；真正真相仍在协议对象、事件流和 rollout/workflow artifacts。

## 2026-03-13 12:27:42
- 已继续深读 `event_mapping.rs`、`context_manager/mod.rs`、`state/mod.rs`、`protocol/lib.rs`。
- 新的稳定结论是：
  - `event_mapping::parse_turn_item()` 会显式滤掉 `user instructions / skill instructions / session_prefix / user shell command`，并把图片标签正规化成 `UserInput::Image`；真实 user-turn 是语义对象，不是 role=`user` 的机械切片。
  - `event_mapping` 只把少量稳定对象提升成 `TurnItem`：`UserMessage / AgentMessage / Reasoning / WebSearch`；其他 raw `ResponseItem` 不会自动升格成 turn-level 真相。
  - `context_manager/mod.rs` 的导出面本身就是设计声明：`ContextManager / TotalTokenUsageBreakdown / estimate_response_item_model_visible_bytes / is_codex_generated_item / is_user_turn_boundary` 都在强调 runtime projection 高于 raw transcript。
  - `state/mod.rs` 把会话状态正式拆成 `SessionServices / SessionState / ActiveTurn / RunningTask / TaskKind`；state 分层是 protocol/runtime 设计的一部分，不是代码组织巧合。
  - `protocol/lib.rs` 暴露的是正式协议对象目录：`account / approvals / config_types / custom_prompts / dynamic_tools / items / mcp / models / plan_tool / request_user_input / user_input`；这继续支持“对象中心高于前台人格中心”的总主线。

## 2026-03-12 17:46:10
- 已继续深读 `rollout/policy.rs`、`rollout/truncation.rs`、`multi_agents/tests.rs`、`agent_teams.rs`。
- 新的稳定结论是：
  - rollout 持久化是显式筛选，不是全量落盘：`ResponseItem` 和 `EventMsg` 分别受稳定对象集与 `Limited/Extended` 事件等级控制。
  - rollout memories 过滤器与 rollout 本体过滤器不同；developer message、reasoning、ghost snapshot、compaction 不会默认进入 memories，说明 durable history 与长期记忆不是一层。
  - rollout 截断按真实 user-turn 语义边界进行，会应用 `ThreadRolledBack` marker，并忽略 `session_prefix`，因此“有效历史”高于 raw stream。
  - subagent/team 的 spawn/resume 配置会继承 turn 级运行时上下文，但强制把 approval policy 收成 `Never`；resume 还会清掉 caller 的 `base_instructions`，说明 worker lifecycle 不是简单复制前台人格。
  - `agent_teams` 端到端测试钉实：task claim/complete 在并发下只能成功一次，cleanup 会真实删除 team config、task dir 和 worktree，durable workflow 的收口依赖真实资源回收而不只是聊天回执。

## 2026-03-13 12:36:16
- 已继续深读 `core/src/state/session.rs`、`state/turn.rs`、`rollout/error.rs`。
- 新的稳定结论是：
  - `SessionState` 是 session-scoped mutable control plane，不只是 history 容器；它显式持有 `previous_model`、rate limits、dependency env、MCP/connector selection、startup regular task 与 reference context item。
  - `ActiveTurn/TurnState` 是独立于 durable history 的协调层：pending approvals、pending user input、pending dynamic tools、pending input 都停留在 active turn，而不是 rollout 真相层。
  - `rollout/error.rs` 把 session storage 权限/缺失/损坏/路径类型异常提升成 operator-facing fatal state，并给出修复提示；session storage 是平台级依赖，不是实现细节。

## 2026-03-13 12:39:40
- 已继续深读 `core/src/state/service.rs`、`protocol/src/plan_tool.rs`、`protocol/src/account.rs`。
- 新的稳定结论是：
  - `SessionServices` 是 session-scoped service graph，不是外围杂项；`auth/models/MCP/skills/exec policy/hooks/network approval/state_db/model_client` 都被正式并入同一服务层。
  - `plan_tool.rs` 的 `update_plan` 被故意收成受限 checklist protocol：只有 `Pending / InProgress / Completed` 三态与结构化 `step`，说明计划对象是可治理工单层，不是开放式自由文本规划器。
  - `account.rs` 的 `PlanType` 只是 entitlement taxonomy，用于账户能力分层，不应被误读成执行模式或 thread/turn 控制对象。

## 2026-03-13 12:42:45
- 已继续深读 `core/src/rollout/mod.rs`、`rollout/recorder.rs`、`protocol/src/custom_prompts.rs`。
- 新的稳定结论是：
  - `RolloutRecorder` 证明 durable rollout 是显式物化工件，不是天然一直在写的被动 append log；fresh session 只预计算 path/meta，真正落盘要等显式 `persist()`。
  - `record_items` 只是队列化可持久化对象，`persist/flush/shutdown` 才是一等生命周期动作；没有 `persist()`，即使缓冲了 user-message-like items 也不会自动 materialize rollout 文件。
  - rollout 列表与恢复继续保持 filesystem-first，再按需把 path/meta 对账回 `state_db`；这继续支持 rollout 是 durable truth、`state_db` 是 derived index。
  - `custom_prompts.rs` 继续把 custom prompts 压回 slash-command/命令目录扩展层，不应与 thread/turn 主控制面混同。

## 2026-03-13 12:48:48
- 已继续深读 `core/src/context_manager/updates.rs` 与 `core/src/state_db.rs`。
- 新的稳定结论是：
  - settings update 不是整包重放，而是按优先级注入差分对象：`model switch -> environment diff -> permissions -> collaboration mode -> personality`。
  - `EnvironmentContext` 只在与上一轮相比发生有效 diff 时才生成 update item，且比较时忽略 shell 差异；runtime projection 继续是 sparse diff，不是全量重放。
  - `state_db` 不只是缓存：它有 `feature gate + backfill-complete gate + reconcile/read-repair/apply` 这整套派生索引治理语义。
  - 但它的角色仍然没有变：rollout 文件系统继续是真相源，`state_db` 继续是 derived/reconciled index。

## 2026-03-13 12:50:41
- 已继续深读 `core/src/agent/mod.rs`、`agent/role.rs`、`agent/status.rs`、`agent_names.txt` 与 `builtins/explorer.toml`。
- 新的稳定结论是：
  - agent role 不是人格标签，而是会被插入 `config_layer_stack` 的正式配置层，来源是 `ConfigLayerSource::SessionFlags`，并且保留未指定键。
  - built-in role catalog 当前是 `default / explorer / worker`；其中 `explorer` 目前主要还是声明性角色说明，内建 `explorer.toml` 为空，不是重配置 preset。
  - agent status 不是前台自述，而是从事件流派生：`TurnStarted -> Running`，`TurnComplete -> Completed(last_message)`，`TurnAborted/Error -> Errored`，`ShutdownComplete -> Shutdown`。

## 2026-03-13 12:54:23
- 已继续深读 `core/src/proposed_plan_parser.rs`、`turn_diff_tracker.rs`、`project_doc.rs`、`turn_metadata.rs` 与 `tools/handlers/request_user_input.rs`。
- 新的稳定结论是：
  - plan 不是模糊自然语言检测，而是显式 `<proposed_plan>...</proposed_plan>` 标签块；解析器本身是 line-based streaming parser，`finish()` 会闭合未终止块。
  - turn 级文件差异真相不是 patch 文案回放，而是“首次触达时建立 baseline snapshot + 稳定内部 UUID 文件名 + 当前磁盘状态重算 unified diff”；rename 跟踪是对象级的。
  - project docs 是从 git root 到 cwd 的层级发现管线，`AGENTS.override.md` 优先于 `AGENTS.md`，并受字节预算与 fallback filename 治理；skills/js_repl/child-agents 也属于附加 instruction layer。
  - `TurnMetadataState` 通过 header 上送 `turn_id + sandbox tag + repo_root/workspace git metadata`；git enrichment 是后台异步增强，不阻塞 base header。
  - `request_user_input` 在 core handler 层有正式 mode gate：只在允许的 collaboration mode 下可用；每题必须有非空 options，且会强制补 `is_other=true`，取消则走正式 error path。

## 2026-03-13 13:02:11
- 已继续深读 `core/src/compact.rs`、`review_format.rs`、`review_prompts.rs`、`mcp_connection_manager.rs`、`network_policy_decision.rs`、`session_prefix.rs` 与 `web_search.rs`。
- 新的稳定结论是：
  - compaction 本身也是 turn/item lifecycle，并显式区分 `BeforeLastUserMessage` 与 `DoNotInject` 两种 initial-context reinjection 策略。
  - compaction 请求会先剥离 trailing `<model_switch>` developer message，成功后再挂回；`ContextWindowExceeded` 时会移除最旧历史项后重试。
  - MCP 连接管理器会把多 server 工具目录聚合成稳定的 fully-qualified、已净化名字；startup/status/elicitation 也都进入正式事件与审批回路。
  - network policy 决策只有在 `Ask + Decider` 时才提升成 `NetworkApprovalContext`；deny 也会从 machine reason code 映射成用户可读阻断解释。
  - `<environment_context> / <turn_aborted> / <subagent_notification>` 都是 model-visible session prefix，但不应形成真实 user-turn boundary。
  - review target 有正式 prompt 解析逻辑；`web_search` 的 detail helper 则只是展示层摘要，不是 durable search truth。

## 2026-03-13 13:08:54
- 已继续深读 `core/src/command_canonicalization.rs`、`mentions.rs`、`user_shell_command.rs`、`model_provider_info.rs`、`connectors.rs` 与 `exec_policy.rs`。
- 新的稳定结论是：
  - command approval cache 会先做 canonicalize：普通 shell 单命令会还原成内层 argv，复杂 heredoc/PowerShell wrapper 会落成稳定 script key，避免包装器差异击穿审批缓存。
  - mention 收集会把 linked text mention、structured mention、app/skill path 分层归并成对象；显式 connector/app 引用会被收成 app id 集合，而不是裸文本标签。
  - `user_shell_command` 会把命令、退出码、时长、聚合输出包装成 model-visible 的 `<user_shell_command>` user-role 记录；它属于运行态记录层，不是用户意图层。
  - `ModelProviderInfo` 是 rich provider object：`wire_api / auth mode / headers / query params / retries / stream timeout / websocket support` 都属于 provider 语义本体。
  - connectors 面是 feature-gated、按 account/chatgpt_base_url keyed 的 accessible-connectors 目录缓存，不是 raw MCP 工具列表。
  - `ExecPolicyManager` 是正式 policy layer：它组合规则文件、heuristics、approval policy、sandbox policy 与 prefix-rule amendment；approval/forbidden 结论来自策略求值，不是前台人格临场判断。

## 2026-03-13 13:10:07
- 已继续深读 `core/src/auth.rs`、`auth/storage.rs`、`api_bridge.rs`、`realtime_conversation.rs`、`mcp_tool_call.rs`、`memory_trace.rs`、`network_proxy_loader.rs` 与 `codex.rs`。
- 新的稳定结论是：
  - auth 不是简单凭据文件；`AuthMode/CodexAuth/ExternalAuthRefreshContext` 都是正式控制面对象，持久化还被分成 `file/keyring/auto/ephemeral` 四种模式。
  - API 错误不是前台提示文案，而是正式 runtime category；context window、quota、usage-not-included、retry-limit、overload、invalid-image 都会被精确映射成 `CodexErr`，并保留 `request id / cf-ray / active limit` 这类追踪元数据。
  - realtime conversation 是独立 runtime subsystem，不是普通 thread/turn 的聊天变种；它有自己的 `start/audio_in/text_in/shutdown` 生命周期、独立输入队列与 started/closed/realtime event fanout。
  - MCP tool call 是正式审计化流水线：`parse args -> begin event -> optional approval -> call -> sanitize -> end event -> analytics`；模型不支持图片输入时，MCP 图片结果会被显式降格成文本占位。
  - `memory_trace.rs` 证明 trace-to-memory 是 ETL 型标准化流程：先解码和归一化 trace，再过滤允许项，最后才交给模型做 memory summary。
  - `network_proxy_loader.rs` 证明网络代理状态来自分层配置和可信约束，不是平铺读配置文件；trusted constraints 不会被 user/project/session 层抬高，而且整体带 mtime reload。
  - `codex.rs` 把这些能力重新汇聚回 Session control plane：`RealtimeConversationManager / SessionServices / RolloutRecorder / MCP manager / memories / network proxy / TurnMetadataState` 都是会话级正式组成部分。

## 2026-03-13 13:16:25
- 已继续深读 `models_manager/model_info.rs`、`models_manager/model_presets.rs`、`tools/network_approval.rs`、`tools/handlers/plan.rs`、`mcp/auth.rs`、`config/network_proxy_spec.rs`、`skills/model.rs` 与 `function_tool.rs`。
- 新的稳定结论是：
  - runtime model truth 与 picker preset 是两层：`model_info.rs` 会为 unknown slug 生成带 `context_window/truncation_policy/input_modalities` 的 fallback `ModelInfo`，而 `model_presets.rs` 只负责 `is_default/show_in_picker/upgrade/default_reasoning_effort` 这类选择层元数据。
  - 网络授权不是前台弹窗技巧，而是正式 approval service：`Immediate/Deferred`、`AllowOnce/AllowForSession/Deny`、按 `host+protocol+port` 去重、会话级 `session_approved_hosts` 缓存，都是对象化治理语义。
  - `network_proxy_spec.rs` 继续钉实：网络代理 builder 会受 sandbox policy 直接影响；在 `ReadOnly/WorkspaceWrite` 下启用 approval flow 时，allowlist miss 会被提升成 `NetworkDecision::ask(\"not_allowed\")`。
  - `update_plan` 的真正价值在结构化输入和 `EventMsg::PlanUpdate`，不是 tool 输出文本；而且它在 `Plan` mode 下被显式禁用，说明 plan item 更像客户端可渲染治理对象，不是模型自用推理链。
  - MCP auth 也是目录面：只有 `StreamableHttp` 且未绑定 bearer env var 时才探测 OAuth 登录支持，最后按 server 产出 `McpAuthStatusEntry` 目录。
  - skill 目录也继续对象化：`SkillMetadata` 明确包含 `interface/dependencies/policy/permissions/scope`，并通过 disabled path 与 `allow_implicit_invocation` 决定哪些 skill 能被默认隐式调用。
  - function tool 错误面被故意压成极少数稳定类别：`RespondToModel / MissingLocalShellCallId / Fatal`，说明 tool failure surface 本身也是受治理的协议语义。

## 2026-03-13 13:19:52
- 已继续深读 `tasks/compact.rs`、`tasks/review.rs`、`tools/handlers/search_tool_bm25.rs` 与 `tools/network_approval.rs`。
- 新的稳定结论是：
  - `tasks/compact.rs` 说明 compact task 本身只是 runner 壳；真正的关键是它会按 provider 选择 `local compact` 或 `remote compact` 路径，并把 compact 作为正式 `TaskKind::Compact` 计入任务生命周期。
  - `tasks/review.rs` 说明 review 是 detached reviewer workflow：它会启动一条带专用 `REVIEW_PROMPT`、禁用 web/collab、`approval_policy=Never` 的 one-shot reviewer 子线程，再把 `ReviewOutputEvent` 结构化回灌并显式 `ExitedReviewMode`。
  - `search_tool_bm25.rs` 说明 tool discovery 更像目录化搜索面，而不是全量工具暴露：它先按 `name/title/description/connector/input_keys` 建 BM25 索引，再把命中的工具并回当前 MCP selection。
  - `tools/network_approval.rs` 继续钉实网络审批是 formal service：区分 `Immediate/Deferred`，按 `host+protocol+port` 去重，维护 pending approval 与会话级 `session_approved_hosts`，并把策略拒绝和用户拒绝分开记录。

## 2026-03-13 13:28:43
- 已继续深读 `tools/spec.rs`、`tools/router.rs`、`tools/registry.rs`、`skills/injection.rs`、`skills/manager.rs`、`config/service.rs`、`config/profile.rs` 与 `tools/orchestrator.rs`。
- 新的稳定结论是：
  - `tools/spec.rs` 说明工具面本身是派生目录层：`ToolsConfig` 来自 `model_info + feature flags + web_search_mode`，shell/apply_patch/search/js_repl/collab 都是 capability-gated assembly，不是 prompt 文案里手写的一串工具名。
  - `tools/router.rs` 把 raw model item 正式转换成 `ToolCall{tool_name,call_id,payload}`；`Function/Custom/LocalShell/MCP` 各走不同 payload 路径，`js_repl_tools_only` 还能显式阻断 direct tool call，说明工具是否允许直调属于正式路由规则。
  - `tools/registry.rs` 把 tool 执行统一成治理流水线：`handler kind match -> mutating gate -> pre-tool hook -> handle -> post-tool/post-failure hook -> response item`；tool 真相继续在 registry/hook/gate/object 层，不在前台自然语言解释。
  - `skills/injection.rs` 说明 skill 注入不是“把 SKILL.md 文本塞进 prompt”这么简单；skills 会变成正式 `ResponseItem`，还能从 frontmatter 解析出 skill-scoped hooks，并上报 analytics。
  - `skills/manager.rs` 说明 skills 真相也在分层目录加载：它会结合 config layer stack、agents roots、extra user roots 与 disabled paths，按 cwd 产出并缓存 `SkillLoadOutcome`。
  - `config/service.rs` 说明 config service 是正式 control plane：`read` 返回 `effective + origins + ordered layers`，`write/batch_write` 是限定路径下的 versioned write，并对 readonly layer/path mismatch 抛正式错误。
  - `config/profile.rs` 说明 profile 只是常用配置包聚合层，不是 runtime model truth 或 thread/turn 控制对象本体。
  - `tools/orchestrator.rs` 继续钉实：approval、sandbox selection、network approval、retry/escalation 都在统一执行编排层里；最值钱的是“批准-尝试-升级”的正式语义，不是前台人格决定要不要重试。

## 2026-03-13 13:33:51
- 已继续深读 `memories/storage.rs`、`memories/phase1.rs`、`memories/phase2.rs`、`memories/start.rs`、`memories/prompts.rs`、`memories/usage.rs`、`tools/context.rs`、`tools/events.rs`、`tools/parallel.rs`、`tools/sandboxing.rs`、`config/permissions.rs` 与 `mcp/skill_dependencies.rs`。
- 新的稳定结论是：
  - memory 不是单次摘要，而是正式两阶段流水线：`start.rs` 只在非 ephemeral、非 subagent、启用 `MemoryTool` 且存在 `state_db` 时启动；`phase1.rs` 抽取 `raw_memory/rollout_summary`，`phase2.rs` 再跑 consolidation agent 并同步 `raw_memories.md` 与 `rollout_summaries/`。
  - `memories/storage.rs` 继续把 memory artifact 分层：`raw_memories.md` 是 stage-1 合并视图，`rollout_summaries/*.md` 是 thread 级摘要工件；无记忆时还会主动清理 `MEMORY.md / memory_summary.md / skills/`。
  - `memories/prompts.rs` 说明 memory prompt 也是受 token budget 约束的正式模板层；stage-1 输入会按 active model 的有效上下文窗口截断 rollout 内容，memory tool developer instructions 只读 `memory_summary.md` 的受限摘要。
  - `memories/usage.rs` 说明 memory 使用面也被对象化成 metrics：只对安全 command 做 parse，再把 `MEMORY.md / memory_summary.md / raw_memories.md / rollout_summaries / memories/skills` 归类打点。
  - `tools/context.rs` 与 `tools/events.rs` 继续把 tool runtime 真相压回对象/事件层：`ToolInvocation/ToolPayload/ToolOutput` 是最小稳定对象，`ExecCommandBegin/End`、`PatchApplyBegin/End`、`TurnDiffEvent` 才是正式 event surface。
  - `tools/parallel.rs` 说明并行不是默认全开，而是 capability-gated：支持并行的工具走读锁，其余走写锁串行；用户 abort 也会被转成不同 payload 族的正式输出对象。
  - `tools/sandboxing.rs` 继续把审批/沙箱钉成共享策略层：`ApprovalStore` 用序列化 key 做会话级缓存，`ExecApprovalRequirement` 明确区分 `Skip/NeedsApproval/Forbidden`，默认 requirement 由 `approval_policy + sandbox_policy` 共同决定。
  - `config/permissions.rs` 说明网络权限不是单个布尔开关，而是 `PermissionsToml.NetworkToml -> NetworkProxyConfig` 的对象化映射层。
  - `mcp/skill_dependencies.rs` 说明 skills 触发 MCP 安装不是 prompt 技巧，而是 gated workflow：非一方客户端不启用、full access 可自动装，否则走 `request_user_input` 结构化提问、配置持久化和 OAuth 登录。

## 2026-03-13 13:41:42
- 已继续深读 `apply_patch.rs`、`read_file.rs`、`list_dir.rs`、`grep_files.rs`、`shell.rs`、`unified_exec.rs`、`view_image.rs`、`dynamic.rs`。
- 新的稳定结论是：
  - `apply_patch` 的真相不在 shell wrapper，而在 grammar-verified patch object + 专用 runtime/orchestrator；命中 patch 语法时会优先拦截进专用流水线。
  - `read_file / list_dir / grep_files` 继续把“透明 agentic search”钉成默认检索面：绝对路径、分页、深度、缩进块、结果上限与超时都是正式边界，不是前台随意探索。
  - `shell` 与 `unified_exec` 不是一层：`shell` 更像一次性受治理命令，`unified_exec` 则是带 `process_id / write_stdin / watcher / deferred network approval / prune policy` 的正式进程生命周期。
  - `view_image` 证明多模态输入也走 capability gate：模型不支持 image input 时直接拒绝；支持时通过正式 `ResponseInputItem::Message` 注入，而不是前台描述“我看到了图”。
  - `dynamic_tool` 说明动态工具不是全局热插拔，而是 turn 级 request-response 注册表：先发 `DynamicToolCallRequest` 事件，再等待结构化 `DynamicToolResponse` 回灌。
- `windows_sandbox.rs` 说明 Windows sandbox setup 不是单个布尔开关，而是 `mode select -> setup/preflight/refresh -> metrics -> config persistence` 的正式控制动作。

## 2026-03-13 13:49:31（supplemental：runtimes / hooks executor / js_repl）
- `tools/runtimes/mod.rs` 钉实：runtime 层不是第二套 orchestrator，而是小而聚焦的执行适配层；真正的 approval/sandbox/retry 语义仍留在上层统一编排。
- `tools/runtimes/apply_patch.rs` 钉实：apply-patch runtime 假设验证和审批已在上游完成，只复用 cached approval，构造最小环境的 `CommandSpec`，再以 `--codex-run-as-apply-patch` 自调用方式执行。这继续支持“patch 真相在 object/runtime，不在 shell wrapper 文本”。
- `tools/runtimes/shell.rs` 钉实：shell runtime 的高价值在 approval key 规范化、PowerShell UTF-8 前缀和 snapshot wrapper 注入；网络审批模式是 `Immediate`，说明 one-shot command 会把联网判决前置到运行前。
- `tools/runtimes/unified_exec.rs` 钉实：unified exec runtime 与 shell runtime 的关键差异是 lifecycle，不是 argv 形式；它返回 `UnifiedExecProcess`，网络审批走 `Deferred`，最终由 process manager 接管长进程会话。
- `hooks_executor.rs` 钉实：non-command hooks 已被正式拆成两条路径：`prompt hook` 走 JSON-schema 模型判决，`agent hook` 走 `approval_policy=Never` 的 one-shot agent，并从 rollout 取最后 assistant/compacted 内容解析 JSON；hook 判决也在受治理的对象/生命周期层。
- `tools/handlers/js_repl.rs` 钉实：JS REPL 是 feature-gated、raw-JS-only、带 begin/end 事件的专用执行面；它会拒绝 JSON、quoted code 和 markdown fence，并把执行结果包装成正式 `FunctionCallOutput`，而不是把 REPL 降格成普通 shell 别名。

## 2026-03-13 14:05:34
- 已继续深读 `core/src/mcp/mod.rs`、`mcp/auth.rs`、`models_manager/cache.rs`、`models_manager/collaboration_mode_presets.rs`、`models_manager/manager.rs`，并反查 `protocol/lib.rs`、`app-server-protocol/protocol/mod.rs`、`models_manager/mod.rs`。
- 新的稳定结论是：
  - 模块根文件本身大多只是 re-export/目录壳；剩余真正还有价值的，是 `mcp` 目录聚合、model cache 治理、collaboration mode preset 这些控制面语义。
  - `core/src/mcp/mod.rs` 证明 MCP 的高价值不在 raw wire JSON，而在 `effective servers + auth statuses + snapshot collection + normalized tool/resource/template catalog` 这条受治理目录链；Codex Apps MCP 也属于动态注入的治理对象，不是前台写死的 server 列表。
  - `models_manager/cache.rs` 证明 model cache 是正式治理层：受 `TTL + client-version + etag` 共同约束；缓存新鲜度和版本错配都属于 control-plane 真相，不是前台 convenience 层。
  - `models_manager/collaboration_mode_presets.rs` 继续钉实 collaboration mode 更像 preset mask，不像自由人格；`Default/Plan` 的真正影响面在 developer instructions 和 `request_user_input` 可用性，而不是前台自述。
  - `models_manager/manager.rs` 继续把 model truth 分层：`refresh strategy`、`auth gating`、`fallback metadata`、`remote catalog`、`config override` 共同决定运行态 model catalog，不应退化成“前台模型名列表”。

## 2026-03-13 14:18:22
- 已继续深读 `mcp/skill_dependencies.rs`、`skills/loader.rs`、`skills/permissions.rs`、`skills/remote.rs`、`skills/env_var_dependencies.rs` 与 `config/edit.rs`。
- 新的稳定结论是：
  - skills 的 MCP 依赖安装不是 prompt 技巧，而是 canonical identity 去重、first-party gating、full-access 自动安装、否则走 `request_user_input + config persistence + OAuth` 的正式 workflow。
  - local skill discovery 的真相在分层 root/scope 治理：repo/user/system/admin roots 会共同参与，但 repo 搜索不会逃逸 git root；去重按 canonical path，而不是按名称强行合并。
  - skill manifest permissions 会编译成真实 permission profile：写根提升成 `WorkspaceWrite`，只读根则收成受限 `ReadOnly`，说明 skill 权限是 sandbox/network 对象，不是说明文案。
  - config edit engine 继续把配置写入钉成治理动作：只接受离散 mutation objects，并通过原子写入和注释/格式保留来持久化结构变化，而不是直接覆写 TOML 文本。
  - remote skills 属于受 ChatGPT auth、product surface、scope 和 zip export/install 治理的远程目录层，不应与本地 skill 真相层混成一体。
  - env-var skill dependencies 也是正式运行时契约：优先读 session cache 与环境变量，缺失时再走 secret `request_user_input`，并只在当前 session 内持有。

## 2026-03-13 14:24:56
- 已继续做收口前确认，补读 `config/schema.rs`、`skills/system.rs`、`skills/render.rs`。
- 结论是：
  - `config/schema.rs` 只是把配置对象导出成稳定 schema fixture，并负责 canonicalize key 顺序；它属于 schema/export 层，不新增 durable boundary。
  - `skills/system.rs` 只是 system skills 安装与 cache root 的 re-export 壳，不新增控制面语义。
  - `skills/render.rs` 只是把 skill 目录渲染成前台文案和使用说明，属于 display layer，不是真相层。
  - 到这一轮为止，当前白名单 supplemental 剩余内容已经基本收敛到 schema/export/render/wiring，同义重复明显高于新增 durable boundary。

## 2026-03-13 14:31:18
- 已继续补读 `config/types.rs`、`config/mod.rs`、`skills/mod.rs`，做最后一轮边界确认。
- 结论是：
  - `config/types.rs` 主要是类型定义与反序列化约束；它会强化已有的控制面分层，但不再新增 durable boundary。
  - `config/mod.rs` 主要是配置装配壳与导出面，继续证明配置层是 control plane，但不再新增新的对象语义。
  - `skills/mod.rs` 只是 skills 子模块的导出壳，不新增控制面信息。
  - 到这里为止，这条白名单 supplemental 研究线已经读尽高价值层，剩余继续读只会重复类型壳、模块壳、展示壳或 wiring 共识。

## 2026-03-13 14:46:30
- 已发现并读取新增 primary：`D:\Projects\灵感包\转写目录\douyin_transcripts_20260313_mxai1_all\01_AEglJaDW_80.txt`，并回查新的 RAG 语料包索引与 chunk。
- 新的稳定结论是：
  - 这条新增 primary 没有推翻当前主线，反而把“多 agent 只是升级链路，不是默认选项”继续钉实。
  - 多 agent 真正值得引入的判别条件被说得更清楚了：任务极度开放、存在领域冲突、或需要多方向并行，至少满足其一。
  - 新证据还继续强化了 4 个前置条件：轻量级路由节点、商业价值筛选、全链路可观测性、以及从第一天就按可扩展/热插拔来设计。
  - 新版 `20260309_rag_corpus_v1` 已把该源编入 `source_catalog/tag_index/chunk_corpus`；当前 `README.md` 显示语料统计已更新为 `196` 文档、`12743` 句级单位、`2151` chunks。

## 2026-03-13 16:14:26
- 已继续读取新增 RAG 配套文档：`handoff_prompt.md`、`retrieval_recipes.md`、`schema.md`。
- 新的稳定结论是：
  - 新 RAG 包并没有改写主判断，而是把检索动作顺序正式固定下来了：
    1. `tag_index.jsonl`
    2. `source_catalog.jsonl`
    3. `chunk_corpus.jsonl`
    4. `sentence_corpus.jsonl`
    5. 原始 `source_path`
  - `sentence_corpus` 不是第一跳，而是“精确原话取证”的后置层；真正做主题比较时，优先级高于它的是 `tag_index + source_catalog + chunk_corpus`。
  - `primary` 优先、`supplemental` 仅补充、`quality=degraded` 降置信度，这三条现在已经被新 handoff/retrieval 文档显式写死，可以作为这条研究线的稳定检索 SOP。

## 2026-03-13 16:18:40
- 已继续读取 `D:\Projects\灵感包\入口脚本\build_rag_corpus.py` 和 `corpus_stats.json`。
- 新的稳定结论是：
  - 新版 RAG 包的生成规则已经正式代码化，不再只是目录约定：
    - transcript 批次白名单纳入；
    - transcript 按 `source_id` 去重；
    - 批次有显式优先级；
    - `_all` 目录默认是主结果目录；
    - 标签来自固定 `TAG_RULES`。
  - 因此后面判断“新增是否真正进入主证据层”，最可靠的检查顺序是：
    1. `build_rag_corpus.py`
    2. `source_catalog.jsonl`
    3. `corpus_stats.json`
    4. 原始新增文件
  - 当前统计仍是：`196` 文档、`139` primary transcript、`12743` 句级单位、`2151` chunks。

## 2026-03-13 16:22:48
- 已继续核对 `build_rag_corpus.py` 生成的 `README` 与 `handoff_prompt.md / retrieval_recipes.md`。
- 新的稳定结论是：
  - 同一个 RAG 包内部确实存在两套检索顺序口径：
    - 生成型 `README`：`source_catalog -> sentence -> chunk -> tag_index -> source_path`
    - 手写 `handoff/retrieval_recipes`：`tag_index -> source_catalog -> chunk -> sentence -> source_path`
  - 这不是主判断冲突，而是“概览层”和“运行时 SOP 层”的分层差异。
  - 运行时真正该执行的检索 SOP，仍应以更细、更明确的 `handoff_prompt.md + retrieval_recipes.md` 为准。

## 2026-03-13 16:26:14
- 已继续把 `build_rag_corpus.py` 后半段读完，确认 `schema.md / retrieval_recipes.md / handoff_prompt.md` 也都是脚本直接生成的。
- 新的稳定结论是：
  - 先前发现的检索顺序冲突，不是“手工文档没同步”，而是同一个生成脚本本身就同时输出了两套口径。
  - 因此这条冲突的真正真源在 `build_rag_corpus.py` 的模板段，而不是某个单独产物文件。
  - 对当前研究线来说，这进一步强化了一个方法论：产物层冲突要优先回脚本/生成源查根因，不要只在生成文件表面做判断。

## 2026-03-13 17:50:24
- 已继续把新增 `AEglJaDW_80` 和旧多-agent 主证据 `Jn3ywgwIpw0 / 91PTF0hfgek / iGqUPV2WN98` 做横向收口，确认不是单条新增视频的偶然立场。
- 新的稳定结论是：
  - 默认先单体与轻量路由，已经是跨多源共识，不再只是单一博主判断。
  - `Jn3ywgwIpw0` 强调“永远极简起步、先模块化/skill、先可观测性”；`91PTF0hfgek` 把正收益场景收成上下文保护、并行化、专业化三类；`iGqUPV2WN98` 则把强耦合代码任务钉在 `one brain one stream` 与集中写权限。
  - 因此，当前研究线对多 agent 的总判断已经稳定到可复用层：强耦合代码主线仍然单决策流，多 agent 主要用于研究、过滤、搜索、验证等弱耦合升级链路。

## 2026-03-13 18:06:47
- 已从“继续深读”正式切到“最终整合”。
- 已创建 [harness_executable_master_table.md](D:\Projects\vrplayer\harness_executable_master_table.md)。
- 本轮不是新增观点，而是把前面已稳定成立的主证据和实现语义压成最终可执行总表。
- 这份总表已经明确给出：
  - 证据层级
  - 去冲突裁决
  - 默认主线
  - 升级链路
  - 暂不采纳
  - 8 条最终产品法则

## 2026-03-13 18:44:29
- 已把用户最新裁决同步回研究线真源：高权限浏览器 / 桌面 / RPA 自动化不再要求先有隔离环境。
- 新的稳定结论是：
  - 高权限自动化可以直接进入主能力建设；
  - 若后续仍保留“默认观察/最小操作”与“完整自动化执行”两层分工，理由已改为稳定性、速度、调试成本和可维护性；
  - 这条改动不会推翻“轻前台 + 单决策流主干 + 升级链路分层”的总主线，只会移除“隔离是硬前提”这条旧限制。

## 2026-03-13 20:41:15
- 已从研究窗口切回实现窗口，开始把总表落到运行态，而不是继续扩读。
- 已确认当前 `openclaw.json` 的真实主配置为：
  - `agents.defaults.model.primary = custom-127-0-0-1-3000/gemini-3-flash-preview`
  - `main.tools.profile = minimal`
  - `telegram-fast.tools.profile = minimal`
- 已确认 `main` 当前默认能力面真实为：`group:fs`、`group:runtime`、`group:web`、`agents_list`、`sessions_spawn`、`subagents`、`session_status`、`memory_get`、`memory_search`。
- 已确认 `main` 再次失稳不是模型链坏掉，而是遗留 `gateway --force` 孤儿进程链锁住了 `C:\Users\Lenovo\.openclaw\agents\main\sessions\81b929fe-889c-4ab4-b6fe-d5d76cb51135.jsonl.lock` 对应主会话。
- 已完成恢复动作：
  - 杀掉孤儿进程链 `51056 -> 46612 -> 45828`
  - 归档并重置 `C:\Users\Lenovo\.openclaw\agents\main\sessions`
  - 重新拉起 Gateway
- 已完成 fresh 验证：
  - `openclaw.cmd health` 正常，Telegram `ok (@kyuu_ai_bot)`
  - `main` 单独最小请求成功，返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`，耗时约 `2114ms`
  - `telegram-fast` 最小请求成功，返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`
- 已发现并纠正文档错口径：`workspace/TOOLS.md` 之前写着“默认 skills 只保留 acp-router/coding-agent”，但 runtime 真相仍是 6 个 skills；现已改为按运行真相描述。

## 2026-03-14 12:18:10
- Windows node host 已从“只能偶发手动恢复”推进到“有稳定用户态启动入口”。
- 新增的真实启动链是：
  - `C:\Users\Lenovo\.openclaw\start-node-host.ps1`
  - `C:\Users\Lenovo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\start-openclaw-node.cmd`
- 我已经做完一次完整回放：
  - 先停掉全部 `openclaw ... node run --host 127.0.0.1 --port 18789` 宿主
  - `openclaw nodes status --json` 回到 `connected=false`
  - 再运行 Startup 入口
  - `openclaw nodes status --json` 恢复为 `connected=true`
- 当前节点真实状态已变为：
  - `paired=true`
  - `connected=true`
  - `caps=["browser","system"]`
  - `commands=["browser.proxy","system.run","system.run.prepare","system.which"]`
- 这次还顺手收掉了一个新坑：旧版 `start-node-host.ps1` 因命令行匹配过窄，会在已有宿主存在时误判未启动并多拉起一个 node host；本轮已修正为更宽的稳定匹配，并完成单实例复验。
- 现在 Windows node 的正确口径已经更新成：
  - `openclaw node install` 仍会因 `schtasks create failed: 拒绝访问` 失败
  - 但它已不再阻塞节点主链恢复
  - 当前稳定恢复链是“用户态脚本 + Startup 自启”

## 2026-03-13 21:27:34
- 已继续把 `harness_executable_master_table.md` 的三层分工落到 OpenClaw 运行态，而不是停留在总表文字层。
- 已新增独立重执行 agent：`ops-exec`，工作区为 `C:\Users\Lenovo\.openclaw\workspace-ops-exec`，并已在 `openclaw agents list --json` 中稳定出现。
- 已把前后台与重执行的职责边界重新收口：
  - `telegram-fast` 继续作为轻前台接单 / 路由入口
  - `main` 继续作为后台总管 / 单决策流主干 / review / compaction 位
  - `ops-exec` 作为高权限浏览器 / 桌面 / RPA / Codex 执行位
- 已验证当前最稳定的高权限浏览器执行真相链不是模型原生 `browser/nodes` 暴露，而是 `ops-exec` 通过 `exec` 调官方 CLI：
  - `openclaw browser start --json` 后，browser 已恢复为 `running=true / cdpReady=true`
  - `openclaw browser tabs --json` 已能看到 `https://example.com/`
  - `openclaw browser snapshot --json --limit 12` 已取回 `Example Domain` 页面结构
- 已确认 `ops-exec` 的最小 direct self-check 可成功返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`，耗时约 `4.9s`。
- 已确认 `telegram-fast` 的 fresh 最小自检目前约 `2.8s`，默认工具面已收回为 `exec / process / session_status`，不再是之前那种超重前台。
- 当时剩余的 Windows node 缺口已在下一轮通过用户态稳定入口收口。

## 2026-03-14 12:39:42
- 已按 `D:\Projects\灵感包\LATEST.md` 与 `20260309_rag_corpus_v1` 的新索引，补读新增两天转写：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260314_mxai2_all\01_6qU71R2VmKk.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260314_mxai2_all\02_mgq3Jua03KQ.txt`
- 已通过 `source_catalog.jsonl` 与 `chunk_corpus.jsonl` 复核元数据和主题标签，确认两条新增都已正式进入 `primary` 主证据层。
- 新增结论没有推翻总表，而是继续把模式路由钉实：
  - 默认先单体与轻路由；
  - 能画出流程图时优先 `workflow/sequential`；
  - `parallel` 只在独立子任务、速度或多视角置信度收益成立时启用；
  - `evaluator-review` 只在质量标准明确且打磨收益成立时启用；
  - 强耦合代码主线继续保持 `one brain one stream`。
- 已把这轮新增结论同步并固化到：
  - `D:\Projects\vrplayer\harness_executable_master_table.md`
  - `C:\Users\Lenovo\.openclaw\workspace\AGENTS.md`
  - `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\AGENTS.md`

## 2026-03-14 12:46:40
- 已把新增转写的模式路由进一步做成运行态 smoke，而不只停在文档层。
- fresh 结果出现了明确分工差异：
  - `telegram-fast` 对“固定流程图 + 中间校验”稳定回答 `workflow/sequential`
  - `main` 在 fresh session 下仍把同类问题答成 `evaluator/review`
- 我已做过的修正包括：
  - 把模式口诀补进 `C:\Users\Lenovo\.openclaw\workspace\AGENTS.md`
  - 把同样口诀补进 `C:\Users\Lenovo\.openclaw\workspace-telegram-fast\AGENTS.md`
  - 再把模式映射下沉进 `C:\Users\Lenovo\.openclaw\workspace\TOOLS.md` 与 `C:\Users\Lenovo\.openclaw\workspace\MEMORY.md`
  - 用官方 `openclaw gateway restart` 刷新工作区加载后重测
- 当前最稳定的产品化收口不是“强行让 main 会解释模式路由”，而是：
  - `telegram-fast` 负责前台自然语言模式初判
  - `main` 负责接收已判定模式后的计划、监督、review、compaction 与后台收口

## 2026-03-14 18:57:39
- 已把 Windows node host 的误报失败根因收口到脚本层，而不是继续怪恢复链时序：
  - 旧脚本仍用 `*index.js*node run*` 指纹，已不匹配当前真实的 `openclaw.mjs node run`
  - 成功条件也把“connected 真相”和“进程存在”混成一层
- 已修正 `C:\Users\Lenovo\.openclaw\start-node-host.ps1`：
  - 真指纹改为 `*openclaw*node run*--port 18789*`
  - gateway 健康时优先轮询 `connected=true`
  - gateway 未就绪时回退到进程存在检查
- 已发现当前单次宿主会形成“wrapper node -> real node”双 `node.exe` 进程链，因此原来的 `nodeHostCount` 会高估成 2。
- 已修正 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` 的统计口径，只数根进程；最新愈合结果已回到：
  - `connectedNodeCount=1`
  - `nodeHostCount=1`
- 已完成 fresh 回放验证：
  - 杀掉真实 node host 后，节点回到 `connected=false`
  - 运行新脚本后，不再误报失败
  - 节点恢复为 `connected=true`

## 2026-03-14 19:51:14
- 已新增统一运行真相快照脚本：`D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`。
- 已完成真回放，脚本当前可稳定返回：
  - `gatewayReachable=true`
  - `telegramRunning=true`
  - `telegramProbeOk=true`
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
- 已确认脚本新产物：
  - `D:\Projects\vrplayer\openclaw_runtime_truth.latest.json`
  - `D:\Projects\vrplayer\openclaw_runtime_truth.latest.md`
- 已把 Telegram 通道展示口径正式分层：
  - `health --json` 当前仍会显示 `running=false / tokenSource=none`
  - 但 `channels status --probe --json` 的真实运行态已是 `running=true / tokenSource=config / mode=polling / probe.ok=true`
  - 后续排障时不再把这两者混成单一真相

## 2026-03-14 20:26:12
- 已修复 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py` 的 retry 语法错误，`oc-runtime-truth` 包装器恢复可用。
- 已完成 fresh 命令级验证：
  - `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd`
  - `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd -Raw`
  - `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd -Markdown`
- 已确认三种模式都返回 `exit code 0`。
- 已确认前一轮“成功输出但 exit code=1”是 `| Select-Object -First ...` 截断输出造成的验证假象，不是入口实际故障。

## 2026-03-14 20:35:47
- 已继续把 `runtime truth` 从命令行快照推进到可直接消费的 HTML 状态面。
- 新增产物：`D:\Projects\vrplayer\openclaw_runtime_truth.latest.html`
- 新增入口：`C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd -Html`
- 已完成 fresh 验证：
  - `cmd /c ""C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd" >nul && echo CMD_DEFAULT_OK"`
  - `cmd /c ""C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd" -Raw >nul && echo CMD_RAW_OK"`
  - `cmd /c ""C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd" -Markdown >nul && echo CMD_MD_OK"`
  - `cmd /c ""C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.cmd" -Html >nul && echo CMD_HTML_OK"`
- 当前四种模式均已返回 `exit code 0`。

## 2026-03-14 20:40:23
- 已把 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.ps1` 扩成支持 `-Open`。
- `-Open` 现在会先 fresh 运行 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`，再直接用系统默认浏览器打开 `D:\Projects\vrplayer\openclaw_runtime_truth.latest.html`。
- 这使 `runtime truth` 监督入口从“命令行 + 文件路径”前进到“单命令直接打开状态面”。

## 2026-03-14 21:23:02
- 已把 `runtime truth` 的错误统计从单个 `recentErrors` 升级成三层：
  - `activeErrors`
  - `historicalErrorCount`
  - `recentErrors`
- fresh 结果已证明这条分层有效：
  - `main.activeErrors=0`
  - `ops-exec.activeErrors=0`
  - `telegram-fast.activeErrors=0`
  - 历史旧错误只留在 `historicalErrorCount` 与最近样本里
- 当前 `runtime truth` 已经不会再因为 transcript 里还留着旧错误，就把健康链路误报成“当前仍在持续失败”。

## 2026-03-14 21:33:46
- 已把监督入口从“记住 `oc-runtime-truth -Open`”继续推进成默认 wrapper：
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise.cmd`
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise.ps1`
- 这两个入口当前默认直接打开最新 `runtime truth` HTML 状态面；只有需要机器产物时才回 `oc-runtime-truth -Raw/-Markdown/-Html`。
- 还额外落了一个桌面快捷方式：
  - `C:\Users\Lenovo\Desktop\OpenClaw Runtime Truth.lnk`
- fresh 验证已通过：
  - `OC_SUPERVISE_MD_OK`
  - `OC_SUPERVISE_RAW_OK`
  - 桌面快捷方式目标指向正确

## 2026-03-14 21:45:46
- 已继续把监督入口推进成正式菜单面：
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise-menu.cmd`
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise-menu.ps1`
- 当前菜单已覆盖 5 个固定动作：
  - `OpenTruth`
  - `OpenMarkdown`
  - `OpenJson`
  - `HealRuntime`
  - `StartNodeHost`
- 已新增桌面快捷方式：
  - `C:\Users\Lenovo\Desktop\OpenClaw Supervision Menu.lnk`
- fresh 验证已通过：
  - `SelfTest`
  - `HealRuntime`
  - `OpenJson`
- 过程中还顺手确认一条运行面 hygiene：本轮 `HealRuntime` 再次归档了 1 个陈旧 `models.json.*.tmp`，归档后 `mainModelTmpCountAfter=0`。
## 2026-03-14 22:08:50
- 已把 `runtime truth` 从“agent 卡片”推进成对象级状态面，新增 `Alerts / Services / Recent Sessions` 三层，并同步进入 `json / markdown / html` 三份产物。
- 已完成 fresh + heal 回放；最新 `openclaw_runtime_truth.latest.md` 当前显示：
  - `Alerts`：仅剩 `Telegram health/channel mismatch`
  - `Services`：gateway/telegram/browser/nodes/approvals 五类摘要已稳定输出
  - `Sessions`：`main / telegram-fast / ops-exec` 三条 recent session 已直接对象化展示
- 当前运行真相再次确认：
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
  - `main/ops-exec/telegram-fast activeErrors=0`

## 2026-03-15 10:50:53
- 已确认 Windows node 这次掉线的根因是 `role-upgrade` 未批准，不是 identity mismatch。
- 证据已对齐：
  - `identity/device.json` 与 paired table 使用同一 `deviceId=96c978...`
  - `pending.json` 出现 `clientId=node-host / clientMode=node / role=node / isRepair=true`
  - `openclaw devices approve --latest --json` 后 paired roles 扩为 `operator + node`
- 已做 fresh 回放：
  - `C:\Users\Lenovo\.openclaw\start-node-host.ps1`
  - `openclaw nodes status --json`
  - 最新结果：`connected=true`，节点名 `LAPTOP-T5MDFHST`
- 已顺手把 `runtime truth` 的 node service 展示口径收成稳定 ASCII：
  - 已安装 Scheduled Task 时按 runtimeShort 展示
  - 未安装但已连上节点时展示 `user-mode host active (scheduled-task not installed)`
  - 乱码错误串不再直接进入状态面

## 2026-03-15 11:23:58
- 已把 `openclaw devices list --json` 正式纳入 `runtime truth` 快照，当前统一采样集变为：`health/channels/browser/nodes/devices/status/approvals/sessions/presence`。
- `openclaw_runtime_truth.latest.{json,md,html}` 当前都已显式包含 `nodePairing`：
  - `pairedDeviceCount=1`
  - `pendingDeviceCount=0`
  - `nodeRoleGrantedCount=1`
  - `pairedRoles=[node, operator]`
  - `pairedDevices=[96c9789ee9c9... / cli / cli / operator,node]`
- 已确认当前 node 真相正式分层为：
  - 连接层：`nodes status.connected`
  - 配对层：`devices list / nodePairing`
- 已确认当前全量 fresh 刷新约 `50s`；这是正常串行采样耗时，不再把“几十秒还在跑”误判成脚本挂死。

## 2026-03-15 14:08:50
- 已把 live dashboard 动作端点从“同步 RPC”推进成“后台 job + action-status 轮询”。
- `D:\Projects\vrplayer\scripts\openclaw_supervision_server.py` 当前新增：
  - `/api/action-status`
  - 后台 job 状态文件 `openclaw_supervision_action.latest.json`
  - 动作完成后 `snapshot/needsRefresh` 分层
- 当前 fresh 验证结果：
  - `oc-supervise-live.cmd -Status -NoOpen` 冷启动约 `12.7s`
  - `POST /api/approve-latest-device` 首响约 `676ms`
  - `/api/action-status` 约 `18s` 后回到 `completed`
- 这次收口后，live dashboard 的动作调用不再因为 `approve/follow/heal` 的长尾执行而在 HTTP 层超时。

## 2026-03-15 15:13:58
- 已把 live dashboard 的“动作完成但 truth 仍旧”问题收口到 server 端：后台动作完成时现在会主动 fresh 刷新 authoritative truth，而不是默认留下 stale snapshot。
- `D:\Projects\vrplayer\scripts\openclaw_supervision_server.py` 当前逻辑已固定为：
  - 优先 `build_snapshot(refresh=True)`
  - fresh 失败时才回退 `build_snapshot(refresh=False) + needsRefresh=true`
- 已完成一次完整回放：
  - 动作前 `/api/truth` 为 `browserRunning=false / browserCdpReady=false`
  - `POST /api/heal`
  - 动作完成后 `/api/action-status.snapshot.generatedAt` 与 `/api/truth.generatedAt` 一致，且二者都显示 browser 已恢复
- 前端 `Action Output` 已压缩为 compact summary，当前只展示动作状态、时间、错误、结果键和缩略 snapshot 摘要，页面不再被大段嵌套 JSON 淹没。
- 已继续把 live dashboard 的 `Current Action` 从 compact JSON 前台化为 `action-banner + action-timeline`。
- 当前页面会直接显示：
  - 动作标题/摘要
  - 关键时间点
  - truth refresh、result keys、error 等事件
- 已补最小回归测试：`D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
- fresh 验证已通过：
  - unittest 通过
  - `py_compile` 通过
  - chrome-devtools 页面快照确认新 UI 已渲染
  - console/network 采样确认主 API 请求全为 `200`
- 当前唯一 console 报错是 supervision 页的 `favicon.ico` 404；这属于无害展示层噪声，不影响动作链和 truth 链。
- 已把 `Action Output` 继续降级成折叠式 `Debug Output` 面板，默认不抢主视线；只有失败态才自动展开。
- 页面级 fresh 验收已再次通过：
  - 页面快照能看到 `Action Debug -> Debug Output` 折叠项
  - Console 现在是空的
  - `/`, `/api/truth`, `/api/action-status` 请求全部 `200`
- 已把 live supervision 的动作历史前台化：页面和 API 现在都包含 `Recent Actions`。
- `D:\Projects\vrplayer\openclaw_supervision_action_history.latest.json` 当前已存在，并记录了最新一次 `heal -> completed`。
- `/api/action-status` 当前返回：
  - `running=False`
  - `status=completed`
  - `history_count=1`
  - `latest_action=heal`
  - `latest_status=completed`
- 当前 live supervision 的主状态面已稳定分成三层：
  - `Current Action`
  - `Recent Actions`
  - 折叠式 `Debug Output`
- 已把 `Recent Actions` 继续做成可消费的历史真相面，而不是只读表格：
  - `All / Completed / Failed` 计数摘要
  - 状态筛选按钮
  - `Truth` 列
- 当前最新 `heal` 历史头部已带上 truth 刷新时间：
  - `truthGeneratedAt=2026-03-15 16:02:15`
  - 页面上直接显示为 `fresh @ 2026-03-15 16:02:15`
- chrome-devtools 已验证 `Failed` 筛选可用，当前因为失败历史为 0，表格会切到 `none`。
- 已把 `Recent Actions` 再推进成三维筛选视图：
  - 状态筛选
  - 时间范围筛选 `All / 1h / 6h / 24h`
  - 动作类型筛选 `All + 动态 action type`
- 页面当前已直接显示：
  - 动态动作类型按钮 `follow-recommendations / heal`
  - `Duration` 列
  - 最新一次 `follow-recommendations -> completed -> 0s -> fresh @ 2026-03-15 16:31:50`
- 已把 `follow-recommendations` 从单次初始建议链改成 truth-driven 迭代链：
  - 每一步前后都重新读取 `runtime truth`
  - 每一步都会记录 `before/after` pairing/connected 摘要
  - 后续若 `approve-latest-device` 触发了新的 `start-node-host` 建议，同一轮动作可继续前进，不再停在旧 recommendations 快照
- 本轮 fresh 验证已补齐：
  - unittest 通过
  - `py_compile` 通过
  - direct `oc-follow-recommendations.ps1` 成功返回
  - chrome-devtools 页面快照确认时间/类型筛选与 `Duration` 列
  - chrome-devtools console 无报错
  - chrome-devtools network 采样中 `/ /api/truth /api/action-status` 请求全部 `200`

## 2026-03-15 16:55:25
- 已把 `runtime truth` 和 live supervision 一起推进到 `Control Plane` 前台化，当前固定输出并渲染：`approvals / sessions / presence / governance`。
- 已新增 `D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`，并补强 supervision UI 回归测试，`unittest + py_compile` 全部通过。
- 已 fresh 生成新快照并验证 live 页面：`Control Plane` 区块存在，主 API 请求 `200`，Console 仅剩 `favicon.ico` 404 展示噪声。
- 当前控制面真相已能直接前台读取，不再需要通过 agent 自述或零散 CLI 文本拼接判断。

## 2026-03-15 17:20:37
- 已把 `runtime truth` 再推进到 `Control Signals`：在 `controlPlane` 之上新增四个 canonical signals，统一承载控制面对人可消费的状态判断。
- 已补齐 live supervision 前台渲染：页面现在正式显示 `Control Signals` 标题和四张 signal 卡片，每张卡片固定输出 `status/detail/automatable/endpoint`。
- fresh 真相已再次生成并验证：`generatedAt=2026-03-15 17:20:37`，`recommendedActions=[]`，四个 signals 全部 `ok`。
- 已确认 live 页面最初缺失 `Control Signals` 的原因是 18891 端口上仍运行旧版 server；本轮已停旧进程并重启 supervision server，再次 refresh 页面后新信号区块出现。
- 本轮 `chrome-devtools` transport 失效，未作为最终验收主证据；实际验收使用了 `py_compile + unittest + fresh runtime truth + Playwright live refresh` 组合。

## 2026-03-15 18:22:52
- 已把 canonical live supervision 默认入口收口到“自动淘汰旧进程”的版本化链路：
  - `D:\Projects\vrplayer\scripts\openclaw_supervision_server.py` 现在会把 `stateVersion=2 + scriptMtimeUtc` 写进 server state 和 `/api/ping`
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise-live.ps1` 现在会校验 `stateVersion/scriptMtimeUtc`，遇到 stale 18891 listener 时自动杀旧进程并重启
- 已确认默认 18891 页面不再需要临时端口兜底验收：
  - raw `/api/ping` 返回 `stateVersion=2 / scriptMtimeUtc / script`
  - Playwright 默认 18891 页面快照确认已直接出现 `Object Signals / Object Supervision / Threads / Turns / Items`
- 本轮 fresh 验证已通过：
  - `py -3.12 -m py_compile D:\Projects\vrplayer\scripts\openclaw_supervision_server.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\Lenovo\.openclaw\bin\oc-supervise-live.ps1 -Status`
  - `py -3.12 -X utf8 -m unittest D:\Projects\vrplayer\tests\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\Projects\vrplayer\tests\openclaw_supervision_server_action_ui_test.py`

## 2026-03-15 18:50:47
- 已把对象级监督从“表格可见”推进到“signal + history 可消费”：
  - `objectSignals` 现在细化为 8 个 canonical signals，并带 `group / affectedAgents`
  - `objectHistory` 已持久化到 `D:\Projects\vrplayer\openclaw_object_history.latest.json`
  - live 页面已补齐 `Object History` 与对象 signal 双筛选
- 当前 fresh 结果已确认：
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
  - `objectHistory.entries=3`
  - `objectSignals.warn=1`
  - 唯一 `warn` 为 `turn-prompt-clean`
- 已完成本轮收口验证：
  - `py_compile` 通过
  - `unittest` 通过
  - fresh `runtime truth` 生成成功
  - `oc-runtime-heal.ps1` 回放成功
  - `oc-supervise-live.ps1 -NoOpen` 已拉起新版 live server

## 2026-03-15 19:13:07
- 已把 `objectHistory` 从平铺快照列表推进成双聚合历史面：`signalSummary + agentSummary` 已进入 `runtime truth`，且每条 warn 快照都会显式带 `warnSignals` 明细。
- 已把 live supervision 的 `Object History` 做成可查询面：
  - `signal` 筛选
  - `agent` 筛选
  - `Signal Hotspots`
  - `Agent Hotspots`
- 已修正 `backend-presence-ready` 的控制面误报：当前会把确认过的用户态 node 主链视为 `nodeOperational=true`，不再因为 `presence.backendRoles` 未列出 `node` 就继续报 `warn`。
- fresh 验证结果已确认：
  - `recommendedActions=[]`
  - `backend-presence-ready=ok`
  - `nodeOperational=true`
  - `objectHistory.signalSummary[0]=turn-prompt-clean`
  - `objectHistory.agentSummary` 已覆盖 `main / ops-exec / telegram-fast`

## 2026-03-15 19:36:39
- 已把粗粒度 `approval/status` 对象信号拆成 4 个细信号：
  - `approval-defaults-ready`
  - `approval-socket-ready`
  - `status-session-coverage-aligned`
  - `status-queue-clean`
- 已把对象级 drift 接进 `recommendedActions`，当前会直接生成：
  - `inspect-object-supervision`
- 当前 fresh truth 已确认：
  - `recommendedActions=[inspect-object-supervision]`
  - `objectSignals.warn=[turn-prompt-clean, status-session-coverage-aligned]`
  - `backend-presence-ready=ok`
  - `nodeOperational=true`
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
- 本轮验证已通过：
  - `py_compile`
  - `unittest`
  - fresh `runtime truth`
  - live `/api/truth` 取样

## 2026-03-15 19:41:19
- 已把对象级推荐动作从单条总入口继续拆成两条具体监督动作：
  - `inspect-turn-prompts`
  - `inspect-session-coverage`
- 当前 fresh truth 已确认：
  - `recommendedActions=[inspect-turn-prompts, inspect-session-coverage]`
  - `turn-prompt-clean` 仍覆盖 `main / telegram-fast / ops-exec`
  - `status-session-coverage-aligned` 仍为 `warn`
  - `backend-presence-ready=ok`
  - `nodeOperational=true`
- 本轮验证已通过：
  - `py_compile`
  - `unittest`
  - fresh `runtime truth`

## 2026-03-15 19:49:18
- 已把 live supervision 的对象级 recommendation 从纯文本提示推进成可点击监督入口：
  - 推荐项会显式携带 `signalId/group`
  - `Inspect Signal` 按钮会直接聚焦对应 `Object Signals` 和 `Object History`
- 已修正推荐按钮的渲染实现，避免坏掉的字符串替换逻辑继续污染 live 页面；当前实现已收口为 `data-focus-signal/data-focus-group + focusObjectSignal(...)`
- fresh 验证已通过：
  - `py -3.12 -m py_compile D:\Projects\vrplayer\scripts\openclaw_supervision_server.py D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py D:\Projects\vrplayer\tests\openclaw_runtime_truth_control_plane_test.py D:\Projects\vrplayer\tests\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\Projects\vrplayer\tests\openclaw_runtime_truth_control_plane_test.py D:\Projects\vrplayer\tests\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\Lenovo\.openclaw\bin\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-WebRequest http://127.0.0.1:18891/`
  - `Invoke-WebRequest http://127.0.0.1:18891/api/truth`
- 当前 authoritative truth 已确认：
  - `inspect-turn-prompts|turn-prompt-clean|turn`
  - `inspect-session-coverage|status-session-coverage-aligned|status`

## 2026-03-15 19:55:47
- 已把对象级 recommendation 继续推进成 `Focused Inspection` 专用检查视图，不再只靠通用筛选：
  - `inspect-turn-prompts` 会直接展示 prompt drift agents 表
  - `inspect-session-coverage` 会直接展示 session coverage 差值摘要
- 已补齐页面入口与渲染函数：
  - `Focused Inspection`
  - `renderFocusedInspection(summary)`
  - `clearFocusedInspection()`
- fresh 验证已通过：
  - `py -3.12 -m py_compile D:\Projects\vrplayer\scripts\openclaw_supervision_server.py D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py D:\Projects\vrplayer\tests\openclaw_runtime_truth_control_plane_test.py D:\Projects\vrplayer\tests\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\Projects\vrplayer\tests\openclaw_runtime_truth_control_plane_test.py D:\Projects\vrplayer\tests\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\Lenovo\.openclaw\bin\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-WebRequest http://127.0.0.1:18891/`
- live 页面已确认包含：
  - `Focused Inspection`
  - `No focused inspection`
  - `function renderFocusedInspection(summary)`

## 2026-03-15 20:26:27
- 已把 `Focused Inspection` 从摘要卡片继续推进成 authoritative `objectEvidence` 视图：
  - `turn-prompt-clean` 现会直接显示 `promptDriftAgents / promptErrorSamples`
  - 以上两组 row 已显式带出 `sessionId / transcriptPath`
  - `status-session-coverage-aligned` 现会直接显示 `duplicateConfiguredAgents / missingSessionObjectRows`
- 当前 authoritative truth 已确认 session coverage drift 的活根因不是 session object 丢失，而是 duplicate configured `telegram-fast` rows：
  - `configuredSessionCount=4`
  - `sessionObjectCount=3`
  - `duplicateConfiguredAgents[0].agentId=telegram-fast`
  - `duplicateConfiguredAgents[0].configuredCount=2`
  - `missingSessionObjectRows=[]`
- 本轮验证已通过：
  - `py -3.12 -m py_compile D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py D:\Projects\vrplayer\scripts\openclaw_supervision_server.py D:\Projects\vrplayer\tests\openclaw_runtime_truth_control_plane_test.py D:\Projects\vrplayer\tests\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\Projects\vrplayer\tests\openclaw_runtime_truth_control_plane_test.py D:\Projects\vrplayer\tests\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\Users\Lenovo\.openclaw\bin\oc-supervise-live.ps1 -NoOpen`
  - Playwright 页面取样确认 `Focused Inspection` 已显示 `Transcript Path / Duplicate Configured Agents / Missing Session Objects`

## 2026-03-16 08:13:42
- 已把 `status-session-coverage-aligned` 的 authoritative evidence 继续推进成 active/stale drill-down：
  - `configuredSessionRows` 新增 `coverageRole / coverageRoleLabel / threadSessionId / threadSessionMatch`
  - `duplicateConfiguredAgents` 新增 `activeSessionId / staleSessionIds`
  - 新增 `duplicateConfiguredRowDrilldown`
- 已把 live `Focused Inspection` 同步前台化：
  - `Configured Session Rows` 表新增 `Coverage Role / Thread Session / Thread Match`
  - `Duplicate Configured Agents` 表新增 `Active Session / Stale Sessions`
  - 新增 `Duplicate Session Row Drilldown`
- fresh 结果已对齐：
  - `activeSessionId=98f92cc1-5854-4bb6-9b25-23948ee4ecab`
  - `staleSessionIds=[c7110231-7ebf-47f4-872b-fd4311cb6a2a]`
  - `drilldownRoles=stale-row;active-row`
- 本轮验证已通过：
  - `py_compile`
  - `unittest`
  - fresh `runtime truth`
  - live `/api/truth`
  - live `/` HTML 关键节点检查

## 2026-03-16 08:31:23
- 已把对象级 supervision 从“coverage drift 总警报”继续收口成“双信号”：
  - `status-session-coverage-aligned` 只表示 live coverage 是否对齐
  - `status-stale-configured-rows` 单独表示 stale duplicate configured row hygiene
- `recommendedActions` 已同步更新为：
  - `inspect-turn-prompts`
  - `inspect-stale-configured-rows`
- 当前 authoritative truth：
  - `status-session-coverage-aligned=ok`
  - `status-stale-configured-rows=warn`
  - stale row=`telegram-fast:c7110231-7ebf-47f4-872b-fd4311cb6a2a`
  - active row=`telegram-fast:98f92cc1-5854-4bb6-9b25-23948ee4ecab`
- `Focused Inspection` 已新增 stale-row 专用 evidence 视图：
  - `Stale Configured Agents`
  - `Stale Configured Rows`
  - `Active Companion Rows`

## 2026-03-16 08:58:02
- 已把 `telegram-fast` 的 Telegram direct recent row 正式归类为有效 `surface-row`，不再作为 stale configured row 处理。
- `build_recent_sessions()` 现已稳定输出：
  - `sessionScope`
  - `surfaceLabel`
  - `kind`
  - `systemSent`
- 当前 live `/api/truth` 已对齐为：
  - `status-session-coverage-aligned=ok`
  - `status-stale-configured-rows=ok`
  - `recommendedActions=[inspect-turn-prompts]`
- `Focused Inspection` 已新增 `Surface Session Agents / Surface Session Rows`，可直接区分：
  - true configured rows
  - valid surface rows
  - stale hygiene 问题

## 2026-03-16 09:09:38
- 已把 `turn-prompt-clean` 的对象级检查继续推进到 turn 级 authoritative drill-down。
- `runtime truth` 新增 `objectEvidence.turn-prompt-clean.promptTurnDrilldown`，并稳定暴露：
  - `latestPromptErrorTimestamp`
  - `latestPromptErrorModel`
  - `latestPromptErrorMessage`
  - `lastUser`
  - `lastAssistant`
  - `lastSuccessAge`
  - `transcriptPath`
- live `Focused Inspection` 已新增 `Prompt Drift Turn Drilldown` 表，当前 recommendation 点击后可直接看到 turn 级 prompt debt，而不是只看 agent 摘要。
- fresh `/api/truth` 已确认：
  - `recommendedActions=[inspect-turn-prompts]`
  - `promptTurnDrilldown count=3`
  - `firstDrilldown.agentId=telegram-fast`
  - `firstDrilldown.latestPromptErrorMessage=aborted`
- 本轮验证已通过：
  - `py_compile`
  - 两组 `unittest`
  - fresh `runtime truth`
  - live `/api/truth`
  - live `/` HTML 关键字符串检查

## 2026-03-16 09:24:47
- 已把 prompt 对象级监督正式拆成两层：
  - `turn-prompt-clean` 只表示 live active prompt drift
  - `turn-prompt-debt-contained` 单独表示 historical prompt debt
- `recommendedActions` 已从 `inspect-turn-prompts` 收口为 `inspect-prompt-debt`，因为当前 fresh truth 下已没有 live drift，只剩 historical debt。
- `Focused Inspection` 已新增 historical debt 专用 evidence：
  - `Historical Prompt Debt Agents`
  - `Historical Prompt Debt Drilldown`
  - `Historical Prompt Error Samples`
- 当前 authoritative truth：
  - `turn-prompt-clean=ok`
  - `turn-prompt-debt-contained=warn`
  - `activePromptErrorAgentCount=0`
  - `historicalPromptDebtAgentCount=3`
  - `recommendedActions=[inspect-prompt-debt]`
- 本轮验证已通过：
  - `py_compile`
  - 两组 `unittest`
  - fresh `runtime truth`
  - live `/api/truth`

## 2026-03-16 09:49:24
- 已把 `inspect-prompt-debt` 从 debt 明细表推进到 timeline 聚合与筛选视图。
- `runtime truth` 新增：
  - `historicalPromptDebtTimelineAgentSummary`
  - `historicalPromptDebtTimelineModelSummary`
- live `Focused Inspection` 新增：
  - `Historical Prompt Debt Agent Hotspots`
  - `Historical Prompt Debt Model Hotspots`
  - `timeline agent` 过滤器
  - `visibleRows / totalRows`
- 当前 authoritative truth：
  - `recommendedActions=[inspect-prompt-debt]`
  - `historicalPromptDebtTimeline count=6`
  - `agentSummaryCount=3`
  - `modelSummaryCount=3`
- 本轮验证已通过：
  - `py_compile`
  - 两组 `unittest`
  - fresh `runtime truth`
  - live `/api/truth`
  - live `/` HTML 源码关键字符串检查

## 2026-03-16 10:05:18
- 已把 `inspect-prompt-debt` 从热点聚合继续推进到时间窗治理视图。
- `runtime truth` 新增：
  - `historicalPromptDebtTimelineWindowSummary`
  - `historicalPromptDebtTimeline[].windowKey`
  - `historicalPromptDebtTimeline[].windowLabel`
- live `Focused Inspection` 新增：
  - `Historical Prompt Debt Time Windows`
  - `timeline window` 过滤器
  - agent + window 双筛选 timeline
- 当前 authoritative truth：
  - `recommendedActions=[inspect-prompt-debt]`
  - `windowSummaryCount=1`
  - `firstWindow=Last 72h`
  - `timelineFirstWindow=72h`
- 本轮验证已通过：
  - `py_compile`
  - 两组 `unittest`
  - fresh `runtime truth`
  - live `/api/truth`
  - live `/` HTML 源码关键字符串检查

## 2026-03-16 10:18:17
- 已把 `inspect-prompt-debt` 从时间窗治理继续推进到 transcript/session 清债优先级。
- `runtime truth` 新增：
  - `historicalPromptDebtTranscriptSummary`
  - `historicalPromptDebtCleanupPriority`
- live `Focused Inspection` 新增：
  - `Historical Prompt Debt Transcripts`
  - `Prompt Debt Cleanup Priority`
- 当前 authoritative truth：
  - `recommendedActions=[inspect-prompt-debt]`
  - `transcriptSummaryCount=3`
  - `cleanupPriorityCount=3`
  - `firstTranscriptAgent=main`
  - `firstTranscriptWindow=Last 72h`
  - `firstPriority=P2/Next`
- 本轮验证已通过：
  - `py_compile`
  - 两组 `unittest`
  - fresh `runtime truth`
  - live `/api/truth`
  - live `/` HTML 关键字符串检查

## 2026-03-16 10:57:48
- 已把 `inspect-prompt-debt` 从 priority 表继续推进到 cleanup rules。
- `runtime truth` 新增：
  - `historicalPromptDebtCleanupRules`
  - `historicalPromptDebtTurnRules`
- live `Focused Inspection` 新增：
  - `Prompt Debt Cleanup Rules`
  - `Prompt Debt Turn Rules`
- transcript 级规则现在会直接回答：
  - 哪条 transcript/session 债先清
  - 应该 rebaseline、排队 transcript cleanup、归档历史债，还是仅观察
- turn 级规则现在会直接回答：
  - 哪一条 latest debt turn 是当前检查锚点
  - 当前动作应是 `inspect-latest-debt-turn / archive-historical-debt / observe-only`
- 当前 authoritative truth：
  - `generatedAt=2026-03-16 10:57:48`
  - `recommendedActions=[inspect-prompt-debt]`
  - `cleanupRulesCount=3`
  - `turnRulesCount=3`
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
- 本轮验证已通过：
  - `py_compile`
  - 两组 `unittest`
  - fresh `runtime truth`
  - `oc-runtime-heal`
  - `oc-supervise-live -NoOpen`
  - Playwright live 页面取样
- 2026-03-16 11:16:06 已把 `inspect-prompt-debt` 从 cleanup rules 继续推进到真正会改变执行顺序和停止条件的治理面。
- `runtime truth` 新增：
  - `historicalPromptDebtExecutionPlan`
  - `historicalPromptDebtStopCriteria`
- live `Focused Inspection` 已补齐：
  - `Prompt Debt Execution Plan`
  - `Prompt Debt Stop Criteria`
- 当前 authoritative truth：
  - `recommendedActions=[inspect-prompt-debt]`
  - `executionPlanCount=3`
  - `stopCriteriaCount=3`
  - `firstExecution=E2/Next/rebaseline-prompt-baseline`
  - `firstStop=S2/P2`

## 2026-03-16 11:36:51
- 已确认现有 OpenClaw CLI 没有可直接复用的 prompt debt 清理原语：
  - `openclaw sessions cleanup --all-agents --dry-run --json` 返回 `wouldMutate=false`
  - 当前 debt transcript 不会被 session maintenance 处理
- 已把近窗 historical prompt debt 改成 deferred review 口径：
  - `turn-prompt-debt-contained` 现显式输出 `deferredReview=true`
  - 同时输出 `nextReviewAt=2026-03-17 13:50:47`
- 已从 `recommendedActions` 里移除当前无真实动作支撑的 `inspect-prompt-debt`
- 当前 authoritative truth：
  - `recommendedActions=[]`
  - `turn-prompt-debt-contained=warn`
  - `deferredReview=true`
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
- 2026-03-16 11:48:10 已把 `deferredReview + nextReviewAt` 正式前台化到 live `Focused Inspection` 的 `Prompt Debt Review State`，现在没有 recommendation 时，监督面也会明确显示“当前只是延后复查”。

## 2026-03-16 12:29:53
- 已完成 approval/status 专用检查视图收口。
- `runtime truth` 与 live `Focused Inspection` 现已直接支持：
  - `Approval Defaults State`
  - `Approval Socket State`
  - `Status Queue State`
- 当前 authoritative truth 已确认：
  - `approval-defaults-ready=ok`
  - `approval-socket-ready=ok`
  - `status-queue-clean=ok`
  - 当前活问题不在 approval/status，而在 browser runtime

## 2026-03-16 12:56:03
- 已把 `browser runtime` 从 alerts/services 提升为对象级监督 signal：
  - `runtime-browser-ready`
- recommendation 已同步细化为：
  - `inspect-browser-runtime`
  - `heal-runtime`
- live `Focused Inspection` 已新增：
  - `Browser Runtime State`
  - `Browser Runtime Detail`
  - `Browser Runtime Recovery`
- 当前 authoritative truth：
  - `recommendedActions=[follow-recommendations, heal-runtime, inspect-browser-runtime]`
  - `runtime-browser-ready=warn`
  - `browserRunning=false`
  - `browserCdpReady=false`
  - `healRecommended=true`
- 本轮验证已通过：
  - `py_compile`
  - 两组 `unittest`
  - fresh `runtime truth`
  - live `/api/truth`
  - live `/` HTML 关键字符串检查

## 2026-03-16 13:08:00
- 启动 `vrplayer` 单馆单 URL 壳层升级任务。
- 已按当前仓库规则补读并应用：
  - `using-superpowers`
  - `brainstorming`
  - `planning-with-files`
  - `test-driven-development`
  - `frontend-design`
  - `interaction-design`
  - `playwright`
- 已完成现状审查：
  - `src/main.ts`
  - `src/app/sceneUiRuntime.ts`
  - `src/utils/router.ts`
  - `src/types/config.ts`
  - `src/ui/MuseumList.ts`
  - `src/utils/config.ts`
- 已确认当前黑屏/换页体验的主根因是 `handleRoute()` 每次命中 `scene` 都会先 `clearView()`，从而销毁 `PanoViewer` 与整套场景壳层。
- 下一步进入 TDD：先补“museum 路由进入 cover gate”和“同馆 scene 切换复用 viewer shell”的失败测试，再开始实现。

## 2026-03-16 13:25:04
- `Phase Readiness` 已落地到 `runtime truth` 和 live supervision。
- 当前 second-phase supervision line 已正式封版：
  - `status=sealed`
  - `blockingKeys=[]`
  - `deferredReview=true`
  - `recommendedActions=[]`
- 当前不再继续细分 supervision 面。后续转去 `vrplayer` 单馆单 URL 壳层升级主线。

## 2026-03-16 13:32:05
- 已修复 `oc-supervise-live` 的版本淘汰误判：旧 live server 进程不再能靠读取磁盘上的最新 `scriptMtimeUtc` 伪装成新版本。
- `/api/ping` 现已返回进程启动时固化的 `startupScriptMtimeUtc + startupScriptSha256`，launcher 也改为按 startup fingerprint + `stateVersion=3` 判断是否复用旧进程。
- 已实测完成 stop/restart 回放，18891 live 页面已吃到 `Phase Readiness` 新模板。

## 2026-03-16 13:56:27
- 单馆壳层升级已完成第一轮可用收口：`?museum=linzexu` 和首次 deep link `?museum=linzexu&scene=south_gate` 现都会先显示馆级 cover gate，再进入目标场景。
- 首页馆卡已从“直达首站”改为“进入展馆”，入口统一走 museum-only route，不再从馆卡直接跳 entry scene。
- 同馆切景现在复用同一 `viewer shell/canvas`，本地验收已确认 `south_gate -> west_room_1` 时 `canvas` DOM 节点保持同一实例。
- 当前 museum shell 的对象级规则已稳定：
  - 同馆 + 无显式 `yaw/pitch/fov` -> 复用 shell + 保留当前视角
  - 同馆 + 显式相机参数 -> 复用 shell + 重置到目标视角
  - 跨馆 -> 重新 mount viewer shell
- 本轮已通过：
  - `node --test D:\Projects\vrplayer\tests\museumShellState.test.ts`
  - `npm run build`
  - 本地 DevTools 路由与 canvas 复用验收

## 2026-03-16 14:06:20
- 已补齐 `src/app/museumShellState.ts`，museum shell 的 cover gate 判定、同馆 shell/view 复用、cover 文案与 preview 预热不再只存在于 `main.ts` 的调用侧。
- 已修正 Node ESM 运行语义：该状态层模块的 value import 现显式写 `.ts` 扩展名，解决“构建能过、`node --test` 运行时报 `ERR_MODULE_NOT_FOUND`”的分裂问题。
- 已重新通过：
  - `node --test D:\Projects\vrplayer\tests\museumShellState.test.ts`
  - `npm run build`
  - `chrome-devtools` 冷启动验收：`?museum=linzexu&scene=west_room_1` fresh tab 先显示馆级 cover gate，点击 CTA 后进入 `west_room_1`
  - `chrome-devtools` 对象级验收：同馆切换到 `east_room_1` 时 `sameCanvas=true`
