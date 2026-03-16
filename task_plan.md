# task_plan.md

## 任务
VRPlayer 第七轮一次性收口优化（DeepWiki/GPT 建议闭环版）

## 时间
- 创建时间：2026-02-11 18:51:14
- 最新更新：2026-03-16 14:06:20

## 2026-03-16 14:06:20（museum shell 状态层缺失补齐）
- [x] 已确认当前真正阻塞不是 museum shell 策略本身，而是 `src/app/museumShellState.ts` 文件缺失，导致 `src/main.ts` 与 `tests/museumShellState.test.ts` 同时断开。
- [x] 已新增 `src/app/museumShellState.ts`，把以下逻辑正式收口到单一状态层：
  - `resolveMuseumShellRoute`
  - `resolveMuseumSceneRuntimePlan`
  - `buildMuseumCoverModel`
  - `buildMuseumPreloadPlan`
- [x] 已修正该状态层模块的 Node ESM 运行口径：所有 value import 现显式带 `.ts` 扩展名，避免出现“Vite build 能过、`node --test` 运行时报 `ERR_MODULE_NOT_FOUND`”的分裂语义。
- [x] 已重新通过：
  - `node --test D:\Projects\vrplayer\tests\museumShellState.test.ts`
  - `npm run build`
  - `chrome-devtools` 实页验收：`?museum=linzexu` 先出馆级 cover gate；fresh `?museum=linzexu&scene=west_room_1` 也先出馆级 cover gate；同馆切换 `west_room_1 -> east_room_1` 时 `canvas` DOM 节点保持同一实例。
- [ ] 下一轮：继续沿 museum shell 主线做真实产品缺口，不再回头修补这组状态函数。

## 2026-03-14 19:22:13（ops-exec 首跳参数抖动已收口）
- [x] 已完成 fresh 回放：`openclaw agent --agent telegram-fast --timeout 120 --session-id <guid> --message "你必须使用 C:\Users\Lenovo\.openclaw\bin\oc-ops-exec.cmd 完成这个任务：打开 https://example.com 并只回复一行，格式 title=<标题>。不要自己直接回答。" --json` 当前稳定返回 `title=Example Domain`，耗时约 `15.1s`。
- [x] 已完成 wrapper 直测：`py -3.12 -X utf8 C:\Users\Lenovo\.openclaw\bin\oc-ops-exec.py "打开 https://example.com 并只回复一行，格式 title=<标题>"` 当前直接返回 `Example Domain`，说明位置参数回退已生效。
- [x] 已将 `C:\Users\Lenovo\.openclaw\bin\oc-ops-exec.py` 的 prompt 解析收口为三种等价入口：`--prompt`、`--prompt-file`、位置参数；前台首跳即使省略 `--prompt`，也不再先撞 argparse 错误。
- [x] 当前 `main / telegram-fast -> ops-exec` 的委派正确性与包装层首跳抖动都已收口，后续若继续推进，应转向 thread/turn/item/approval/status 的前台真相面，而不是继续重复验证 Example Domain。

## 2026-03-14 18:44:45（RAG 生成源冲突修正 + 产物重建）
- [x] 已直接修正 `D:\Projects\灵感包\入口脚本\build_rag_corpus.py` 的双口径问题：`README` 生成模板的“使用建议”现已统一到运行时 SOP，不再与 `handoff_prompt / retrieval_recipes` 冲突。
- [x] 已重新执行 `python D:\Projects\灵感包\入口脚本\build_rag_corpus.py`，完成 RAG 产物重建。
- [x] 已复核重建后的 `README / retrieval_recipes / handoff_prompt / corpus_stats.json`：当前检索顺序已统一为 `tag_index -> source_catalog -> chunk -> sentence -> source_path`。
- [x] 当前 RAG 包统计已更新为 `transcript_source_ids_total=141 / documents_total=198 / chunks_total=2215`，后续新增转写再进入主证据层时，应继续以脚本生成产物为准，而不是手工修改单个导览文件。

## 2026-03-14 16:55:47（Node service 假故障状态清理）
- [x] 已重新执行 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1`，返回 `gatewayOk=true / browserRunning=true / browserCdpReady=true / connectedNodeCount=1 / nodeHostCount=1 / mainModelTmpCountAfter=0`，说明 runtime 主链仍健康。
- [x] 已重新核验 `openclaw nodes status --json`：当前节点 `LAPTOP-T5MDFHST` 仍为 `paired=true / connected=true`，节点执行面没有因为本轮清理而掉线。
- [x] 已用 `openclaw node uninstall` 清掉历史官方 node-service 残留；`status --deep` 现已稳定显示 `Node service = Scheduled Task not installed`，不再混成“installed but missing”假故障口径。
- [x] 已收口当前节点真相源：以后判断 nodes 是否可用，优先看 `openclaw nodes status --json` 的 `connected`，而不是 `Node service` 那一行的安装状态描述。

## 2026-03-14 16:35:00（包装层残余收口 + runtime heal 扩展）
- [x] 已完成 `telegram-fast` fresh direct CLI `--json` 复验：当前可在约 `2.6s` 内稳定返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`，`status --deep` 的活会话模型也已重新对齐，不再复现上一轮“直调可能超时/不回包”的活跃现象。
- [x] 已把 `main` 的 `models.json.*.tmp` 残留清理正式并入 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1`：脚本现会在 browser/node 恢复后，把所有早于当前 `models.json` 的旧 `.tmp` 自动归档到 `tmp-archive-<timestamp>`。
- [x] 已完成一次真回放：`oc-runtime-heal.ps1` 本轮归档 `61` 个旧 `.tmp` 到 `C:\Users\Lenovo\.openclaw\agents\main\agent\tmp-archive-20260314-163609`，返回 `mainModelTmpCountAfter=0`。
- [x] 已在愈合后再次 fresh 调用 `main` 与 `telegram-fast`：两者均成功返回 `custom-127-0-0-1-3000/gemini-3-flash-preview`，且 `main` fresh 调用后 `.tmp` 数量仍保持 `0`。
- [x] 当前这条 OpenClaw / harness 落地线的剩余实现已从“活跃阻塞”降级为“已愈合残留 + 文档化 SOP”，不再需要继续追着包装层反复取证。

## 2026-03-14 16:23:45（main/telegram-fast -> ops-exec 稳定委派验证收口）
- [x] 已完成 `main -> ops-exec` fresh direct JSON 验证：`Use ops-exec to open https://example.com and answer with the page title only.` 当前可在约 `16.6s` 内返回 `Example Domain`。
- [x] 已确认 `main` 在这条重执行委派链下仍保持最小后台工具面：fresh `systemPromptReport.tools.entries` 只剩 `exec / process / session_status`，未重新膨胀成旧式全能前台。
- [x] 已确认 `telegram-fast` 的运行时委派链本身是通的：fresh session transcript `C:\Users\Lenovo\.openclaw\agents\telegram-fast\sessions\e57207c1-ab08-4556-aaef-7f2b002c47ab.jsonl` 已记录 `oc-ops-exec.cmd --prompt ...` -> `Example Domain` -> `[[reply_to_current]] Example Domain`。
- [x] 已将此前大面积失败的根因收口为“工作区规则脏污/乱码 + 旧 session 惯性”，而不是 `ops-exec` 委派链本身不可用；相关 `workspace/workspace-telegram-fast` 规则文件已完成重写并保留带时间戳备份。
- [x] 原先剩余的两条包装层问题已继续收口：`telegram-fast` direct CLI `--json` 当前已恢复稳定；`main` 的 `models.json.*.tmp` 残留已纳入 `oc-runtime-heal.ps1` 自动归档与计数输出，不再需要人工盯目录卫生。

## 2026-03-14 14:15:40（telegram-fast fresh 复验 + runtime heal 入口落地）
- [x] 已完成 `telegram-fast` fresh 运行态复验：最小 direct 调用的 `systemPromptReport.tools.entries` 现只剩 `exec / process / session_status`，不再默认暴露 `subagents`。
- [x] 已补充 `main / ops-exec` fresh 自检：两者当前运行模型都已回到 `custom-127-0-0-1-3000/gemini-3-flash-preview`，说明此前 `status --deep` 里 `main=gemini-2.5-pro-preview-06-05` 更像旧会话/旧状态残留，不是 fresh 运行真值。
- [x] 已碰到并重新拉起当前剩余断点：`browser` 一度回到 `running=false / cdpReady=false`，`nodes` 一度回到 `connected=false`；现已通过 `openclaw browser start --json` 与 `C:\Users\Lenovo\.openclaw\start-node-host.ps1` 恢复。
- [x] 已把这条恢复链收口为正式入口：`C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` 与 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.cmd`。其职责固定为：校验 Gateway -> 拉起 browser -> 拉起 node host -> 输出最终状态 JSON。
- [x] 已完成真回放验证：直接运行 `oc-runtime-heal.cmd` 后返回 `gatewayOk=true / browserRunning=true / browserCdpReady=true / connectedNodeCount=1 / nodeHostCount=1`，说明这条恢复入口已从“脚本存在”升级为“已跑通的稳定入口”。
- [x] 后续 `main/telegram-fast -> ops-exec` 的稳定委派验证已在 `2026-03-14 16:23:45` 与 `2026-03-14 19:22:13` 两轮中收口。

## 2026-03-14 14:02:49（新增两条 primary 整合 + telegram-fast skills-first 收口）
- [x] 已按 RAG 主证据链定位并读完新增两条 primary：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260314_mxai2_all\01_6qU71R2VmKk.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260314_mxai2_all\02_mgq3Jua03KQ.txt`
- [x] 已完成与旧主线的去冲突整合：两条新增没有推翻原结论，只把“先单体+skills / workflow，后多 agent”的判断压得更硬。
- [x] 已把新增裁决写回 `harness_executable_master_table.md`、`README.md`、`inspiration_value_notes.md`、`progress.md`、`findings.md`。
- [x] 已把 `telegram-fast` 的默认 `subagents` 从 `openclaw.json` allowlist 中移除，落实“前台默认不直接挂多 agent 协调入口，先走单体+skills/固定 workflow”。
- [x] 已复验 `telegram-fast` fresh 运行态，确认前台最小工具面不再默认暴露 `subagents`。
- [ ] 下一轮：继续推进 `main/ops-exec` 的升级链路稳定性。

## 2026-03-14 12:18:10（Windows node host 稳定入口落地）
- [x] 已把 Windows node host 从“仅能手动隐藏前台拉起”收口为稳定用户态入口：`C:\Users\Lenovo\.openclaw\start-node-host.ps1` + `C:\Users\Lenovo\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\start-openclaw-node.cmd`。
- [x] 已修正 node host 启动脚本的宿主进程匹配逻辑，避免因过窄命令行匹配导致重复拉起第二个 node host。
- [x] 已完成一次真回放验证：
  - 先停掉全部 `openclaw ... node run --host 127.0.0.1 --port 18789` 宿主 -> `openclaw nodes status --json` 回到 `connected=false`
  - 再运行 Startup 入口 -> `openclaw nodes status --json` 恢复为 `connected=true`
  - 当前宿主已回到单实例
- [x] 已确认节点恢复后的真实运行面：`caps=["browser","system"]`，`commands=["browser.proxy","system.run","system.run.prepare","system.which"]`。
- [x] 已将 Windows node 的正确产品口径更新为：`openclaw node install` 的 `schtasks` 权限失败仍存在，但它已经不是节点主链恢复的阻塞点；稳定恢复链改为“用户态脚本 + Startup 自启”。
- [ ] 下一轮：继续把 `ops-exec` 的浏览器 / 桌面 / Codex 执行链压成更短 SOP，并补一轮 `main/telegram-fast -> ops-exec` 的稳定委派验证。

## 2026-03-13 21:27:34（ops-exec 落地与三层执行面成型）
- [x] 已新增独立重执行 agent：`ops-exec`，工作区为 `C:\Users\Lenovo\.openclaw\workspace-ops-exec`，定位明确收口为“高权限浏览器 / 桌面 / RPA / Codex 执行位”。
- [x] 已把 OpenClaw 当前产品分层收口为：
  - `telegram-fast`：轻前台接单与路由入口
  - `main`：后台总管、单决策流主干、review/compaction/计划收口位
  - `ops-exec`：高权限重执行升级链路承接点
- [x] 已验证当前最稳定的浏览器执行真相链为：`ops-exec -> exec -> official openclaw CLI`，而不是假定模型原生必然暴露 `browser/nodes` 工具。
- [x] 已完成运行态证据闭环：
  - `openclaw agents list --json` 已出现 `main / ops-exec / telegram-fast`
  - `openclaw browser start --json` 后 `running=true / cdpReady=true`
  - 通过 `ops-exec` 间接执行 `openclaw browser open/tabs/snapshot`，已成功打开并读取 `https://example.com`
  - `telegram-fast` fresh 最小调用已恢复到约 `2.8s`，当前默认工具面收回为 `exec / process / session_status`
- [x] 当时剩余的节点缺口现已在下一轮收口，不再作为活跃阻塞项保留。

## 2026-03-12 10:07:30（取舍表 v2 反查当前 OpenClaw 现状）
- [x] 已完成最小运行态复验：
  - `openclaw status --deep`
  - `openclaw nodes status --json`
  - `openclaw browser status --json`
  - `openclaw channels status --probe --json`
  - `openclaw agent --agent telegram-fast --message "只回答ok" --json`
- [x] 已确认当前与取舍表 v2 一致的部分：
  - `telegram-fast` 仍是独立前台入口，`main` 仍保持后台主干
  - `main=gemini-3.1-pro-preview`、`telegram-fast=gemini-3-flash-preview`
  - Telegram 通道仍健康，`probe.ok=true`
  - `telegram-fast` 已具备项目路由、只读 memory、前台协作与自动化工具面
- [x] 已确认当前未符合 v2 默认主线的部分：
  - `telegram-fast` 实际已不够轻，最小调用仍为 `promptTokens=7749 / systemPromptChars=16045 / tools.schemaChars=17912`
  - `nodes` 当前 `paired=true` 但 `connected=false`
  - `browser` 当前 `running=false / cdpReady=false`
  - OpenClaw 运行态仍显示 `plugin memory-core`，与当前“HTTP memory 为唯一主写通道”的口径存在双表面张力
- [x] 已把当前“下一刀最值得落地”收口为：
  - 先把 `telegram-fast` 真正瘦回轻前台
  - 再恢复 `browser` 运行态
  - 再恢复 `nodes` 连通
- [ ] 下一轮：继续基于已读主证据，把 `telegram-fast` 允许面与默认注入面拆开，形成“前台最小默认 / 升级链路按需升格”的更细落地表。

## 2026-03-12 10:10:40（telegram-fast 前台瘦身顺序 v1）
- [x] 已根据最新 `telegram-fast` 最小调用实测，量出当前前台最重的默认注入来源：
  - `message.schemaChars=5013`
  - `browser.schemaChars=2799`
  - `cron.summaryChars=2689`
  - `nodes.schemaChars=1800`
  - `sessions_spawn.schemaChars=922`
  - `process.schemaChars=961`
  - `exec.schemaChars=1086`
  - `web_search.schemaChars=1084`
- [x] 已确认当前前台技能注入也偏离“轻前台”：`acp-router / healthcheck / skill-creator / video-frames / weather` 这组默认 skills 并非 Telegram 每轮都必须带上。
- [x] 已把前台瘦身顺序收口为：
  - 第一刀：先从默认前台剥离 `message / cron / nodes / canvas`
  - 第二刀：再把 `browser / ui / automation` 从默认链路下沉为按需升级链路
  - 第三刀：最后再收窄 `sessions_spawn / subagents` 与默认 skills 注入
- [ ] 下一轮：继续把这份“前台瘦身顺序 v1”压成更细的 `保留默认 / 升级链路 / 后台专属` 三层表，只做取舍，不急着实施。

## 2026-03-12 10:14:20（telegram-fast 能力面三层表 v1）
- [x] 已确认当前前台过重的更深根因不是单个工具，而是 `telegram-fast.tools.profile=full`。
- [x] 已用运行态证据钉实：虽然 `openclaw.json` 的显式 allowlist 里没有 `cron`，但最小调用的 `systemPromptReport.tools.entries` 仍出现 `cron`，说明 `full profile` 在向前台继承高阶工具面。
- [x] 已把 `telegram-fast` 能力面收口成三层：
  - 保留默认：`read / edit / write / exec / process / web_search / web_fetch / memory_get / memory_search`
  - 按需升级：`browser / canvas / ui / automation / agents_list / session_status / sessions_* / subagents`
  - 后台专属：`message / cron / nodes / gateway / tts`
- [x] 已确认“下一刀最值动作”的根因级表达应改为：
  - 先把 `telegram-fast` 从 `profile=full` 收到前台最小 profile
  - 再决定哪些高阶能力通过显式 allow 按需升格
- [ ] 下一轮：继续只做取舍设计，补一版“如果实施，先改 profile 还是先改 allowlist”的顺序判断。

## 2026-03-12 10:18:40（official docs 校准：profile/allow/deny 的真实顺序）
- [x] 已用 OpenClaw 官方文档校准 `tools.profile` 语义：
  - `profile` 先提供基础 allowlist
  - 再叠加 `allow`
  - 最后 `deny` 胜出
- [x] 已确认官方四种 profile：
  - `minimal = session_status`
  - `coding = group:fs + group:runtime + group:sessions + group:memory + image`
  - `messaging = group:messaging + sessions_list/history/send + session_status`
  - `full = no restriction`
- [x] 已确认当前目标“轻前台 + web + 只读 memory + 最小原子执行”并不存在一个现成 profile 可以直接命中。
- [x] 已把最优实施顺序收口为：
  - `telegram-fast` 首先从 `profile=full` 改为 `profile=minimal`
  - 再显式 allow：`read / write / edit / exec / process / web_search / web_fetch / memory_get / memory_search`
  - 其他能力全部下沉为独立升级链路或独立 agent/subagent
- [ ] 下一轮：继续只做设计收口，把“哪些能力应该拆成独立 agent，而不是继续留在 telegram-fast”压成一版清单。

## 2026-03-12 09:27:31（supplemental：hooks / compaction / review / skills 语义校准）
- [x] 已按白名单补读 `stellarlinkco-codex` 的高价值补充入口：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\hooks.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\skills.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server\\tests\\suite\\v2\\compaction.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server\\tests\\suite\\v2\\review.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server\\tests\\suite\\v2\\skills_list.rs`
- [x] 已确认 `hooks` 的真实产品价值不是“花活”，而是三类系统能力：
  - 生命周期护栏与阻断
  - 下一轮上下文注入
  - 派工后异步回写
- [x] 已确认 `thread/compact/start` 的真实行为：请求立即返回 `{}`，真正进度走 `item/started -> item/completed` 的 `contextCompaction` 事件流。
- [x] 已确认 `review/start` 的真实行为：可 `inline` 也可 `detached`，并带 `enteredReviewMode / exitedReviewMode` 项；这更适合作为独立验证链，不适合作为前台默认人格。
- [x] 已确认 `skills/list` 的工程边界：支持按 `cwd` 精确列举与额外绝对路径 roots，且结果存在缓存；这支持“按需发现 skill”，不支持“默认全量热插拔”。
- [ ] 下一轮继续只补高价值 supplemental：优先抽取 `thread/turn/item`、`rollback/compaction/review thread` 和 `hooks` 的可执行取舍，不再散读低价值 README。

## 2026-03-12 09:28:17（supplemental：execpolicy / network-proxy / sdk / process-hardening 语义校准）
- [x] 已按白名单补读 `stellarlinkco-codex` 的高价值补充入口：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\execpolicy\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\process-hardening\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\network-proxy\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\app-server-test-client\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\sdk\\typescript\\README.md`
- [x] 已确认 `execpolicy` 的真实价值是“可测试的 prefix 规则引擎”，包括 `decision / justification / match / not_match`，比提示词里的口头禁令更适合长期做 harness 法律。
- [x] 已确认 `process-hardening` 与 `network-proxy` 继续支持“harness 是 OS 层”：进程级防护、loopback-first、allowlist-first、limited 只读模式、显式 deny 优先都属于执行环境边界，而不是前台人格能力。
- [x] 已确认 `network policy hook` 可显式接住 `command / exec_policy_hint`，这给“exec 审批 -> 网络放行”提供了可实现的系统接口。
- [x] 已确认 `app-server-test-client` 给出了 `thread rejoin while turn in progress` 的真实测试路径，说明长任务可重入性是可验证的运行时性质，不是纸面概念。
- [x] 已确认 `sdk/typescript` 继续支持 `Thread / run / runStreamed / resume / outputSchema / config overrides` 这一套线程化控制面；后续若让 OpenClaw 稳定操控 Codex，应以 thread 为单位，而不是把 Codex 当“单次聊天”接口。
- [ ] 下一轮继续只补高价值 supplemental：优先抽取 `linux-sandbox / exec-server / debug-client / file-search` 的实现语义，并继续压缩成“默认主线 / 升级链路 / 暂不采纳”三层表。

## 2026-03-12 09:33:40（supplemental：linux-sandbox / exec-server / debug-client / file-search 语义校准）
- [x] 已按白名单补读 `stellarlinkco-codex` 的高价值补充入口：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\linux-sandbox\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\exec-server\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\debug-client\\README.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\file-search\\README.md`
- [x] 已确认 `linux-sandbox` 的高价值不是“又一个 Linux 工具”，而是 `ro-bind / bind writable roots / protected subpaths / unshare-pid / unshare-net / seccomp` 这套明确的执行边界模型。
- [x] 已确认 `exec-server` 把 `Run / Escalate / Deny` 三分决策与 `EXEC_WRAPPER / CODEX_ESCALATE_SOCKET` 做成了命令级执行面，继续强化“命令是否越权应由 harness 明确裁决”的主线。
- [x] 已确认 `debug-client` 的价值在于“全量打印 JSON-RPC + thread 切换/恢复”，它更像协议观察器与调试工位，不是默认前台用户入口。
- [x] 已确认 `file-search` 只提供一个很稳的补充语义：文件检索仍应优先尊重 `.gitignore`、走透明文件系统路径；它强化 `agentic search`，但不足以推翻当前默认主线。
- [ ] 下一轮：继续少量补读 `stellarlinkco-codex` 中剩余真正会改变取舍的 supplemental 入口，并开始把 `primary + supplemental` 正式压成“默认主线 / 升级链路 / 暂不采纳”三层表 v2。

## 2026-03-12 09:45:39（supplemental：Windows sandbox / MCP exec approval / config hooks 语义校准）
- [x] 已继续按白名单补读高价值 supplemental：
  - `D:\\Projects\\_research\\stellarlinkco-codex\\docs\\config.md`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\windows-sandbox-rs\\src\\lib.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\windows-sandbox-rs\\src\\policy.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\shell-command\\src\\lib.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\shell-command\\src\\parse_command.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\mcp-server\\src\\lib.rs`
  - `D:\\Projects\\_research\\stellarlinkco-codex\\codex-rs\\mcp-server\\src\\exec_approval.rs`
- [x] 已确认 `docs/config.md` 继续支持两个当前主线增强点：`project-level .codex/config.toml + trust_level`、以及 hooks 作为配置层 first-class lifecycle capability。
- [x] 已确认 Windows 路径下并不存在“空白占位沙箱”：`windows-sandbox-rs` 已经把 ACL、workspace 保护、DPAPI、token、process、audit、identity、firewall 这些能力组织成真实的本地沙箱实现面。
- [x] 已确认 `windows-sandbox policy` 明确拒绝 `DangerFullAccess / ExternalSandbox`，继续支持“默认主线应围绕 read-only / workspace-write 这类显式边界建模”，而不是把全开放当常态。
- [x] 已确认 `shell-command` 的工程价值在于“解析与安全元数据复用”，`parse_command` 明确服务于 command summary / approval UX，而不是只做字符串拆分。
- [x] 已确认 `mcp-server exec_approval` 的真实控制面是 `elicitation/create -> ExecApprovalResponse -> Op::ExecApproval`，说明命令审批本来就是协议级、线程级、事件级的系统能力，而不是前台人格临时问一句“能不能执行”。
- [ ] 下一轮：继续把已读 `primary + supplemental` 正式压成“默认主线 / 升级链路 / 暂不采纳”三层取舍表 v2，并只在需要时再补极少量 supplemental。

## 2026-03-12 09:48:10（supplemental：agent-teams 持久化协作语义校准）
- [x] 已继续按白名单补读高价值 supplemental：`D:\\Projects\\_research\\stellarlinkco-codex\\docs\\agent-teams.md`。
- [x] 已确认 `agent-teams` 的真正新增价值不在“又多一个多 agent 口号”，而在其运行时语义：`spawn_team / wait_team / close_team / team_cleanup / task claim/complete / durable inbox` 已被建模成持久化团队工作流。
- [x] 已确认 `team_message / team_broadcast / team_ask_lead` 都是 durable-first：先落 inbox JSONL，再 best-effort live delivery；这继续支持“长任务与团队协作应优先落外部状态，而不是只靠前台聊天窗口维持”。
- [x] 已确认这套团队语义仍属于实验性升级链路，不推翻当前默认主线 `轻前台 + 单决策流主干 + 验证/研究子代理优先`。
- [ ] 下一轮：开始把已读 `primary + supplemental` 正式压成“默认主线 / 升级链路 / 暂不采纳”三层取舍表 v2，只在缺关键证据时再回补 supplemental。

## 2026-03-12 09:50:11（取舍表 v2：primary + supplemental 正式收口）
- [x] 已把当前全部高价值 `primary + supplemental` 正式压成 `默认主线 / 升级链路 / 暂不采纳` 三层取舍表 v2。
- [x] 已确认默认主线继续保持：`轻前台 + 单决策流主干 + 状态外化 + 显式执行边界 + thread 化控制面 + 验证优先 + 透明检索`。
- [x] 已确认升级链路包括：`研究/引用/黑盒验证子代理`、`detached review / async hooks / compaction`、`agent-teams`、`RPA+UI Agent 混合自动化`、`高权限浏览器控制`、`Orchestrator-Workers / Voting / Evaluator-Optimizer`。
- [x] 已确认暂不采纳：`巨胖前台`、`默认全量热插拔`、`强耦合代码主线默认多 agent`、`把更大上下文当主解`、`把 memory 等同进化`。
- [ ] 下一轮：基于取舍表 v2，开始反查当前 OpenClaw 现状，列出“已符合 / 未符合 / 下一刀最值得落地”的差距清单。

## 2026-03-12 08:31:01（收口 main 侧 models.json 临时文件残留）
- [x] 已完成 fresh 复测：连续 3 次 `openclaw agent --agent main --message "只回答ok" --json` 成功，`models.json.*.tmp` 数量保持 `34 -> 34`，没有继续增长。
- [x] 已补日志取证：当前未见新的 `models.json` 活跃写入故障继续冒出，问题可判定为历史孤儿 `.tmp` 残留优先。
- [x] 已执行安全归档清理：34 个 `.tmp` 已移动到 `C:\\Users\\Lenovo\\.openclaw\\agents\\main\\agent\\tmp-archive-20260312-082945`，未直接删除。
- [x] 已完成归档后复验：连续 2 次 fresh `main` 调用成功，且 `.tmp` 数量保持 `0`。
- [x] 已将该项从“阻塞主链”降级为“历史目录 hygiene 已收口”；后续仅在 `.tmp` 再次增长时重新打开此问题。

## 2026-03-12 08:19:51（OpenClaw 前后台模型分层）
- [x] 已完成最小实测：`gemini-3-flash-preview` 与 `gemini-3.1-pro-preview` 的 unary 请求都可成功。
- [x] 已确认关键差异：`gemini-3.1-pro-preview` 在真实流式链路中更容易连续触发 `429`，不适合作为 Telegram 前台首选。
- [x] 已将 `telegram-fast` 主模型切到 `custom-127-0-0-1-3000/gemini-3-flash-preview`，并把 `gemini-3.1-pro-preview` 降为其第一回退。
- [x] 已保留 `main` 为 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`，形成“前台 flash / 后台 pro”的当前产品基线。
- [x] 已完成 fresh session 复核：`telegram-fast` direct self-check 与 `openclaw status --deep` 都已显示 `gemini-3-flash-preview`。

## 2026-03-12 08:05:27（OpenClaw 主链模型切回 Gemini）
- [x] 已确认根因：`ChatGPT 免费账号 -> openai-codex-oauth:gpt-5.4 / gpt-5.3-codex` 当前已不再是稳定主链，provider 日志中已出现持续 `400`。
- [x] 已将 `main` 与 `telegram-fast` 的主模型统一切回 `custom-127-0-0-1-3000/gemini-3.1-pro-preview`，并统一 Gemini 回退链。
- [x] 已清空 `main / telegram-fast` 会话存储并保留带时间戳备份，强制 fresh session 吃到新模型。
- [x] 已完成运行态复核：`gateway health=OK`、Telegram probe 正常、`openclaw status --deep` 与 direct self-check 均显示 Gemini 主模型。
- [x] 已单独收口 `main` 侧 `models.json` 的 `EPERM rename` 历史残留：当前已证明不是活跃故障，不再阻塞主链可用性。

## 2026-03-10 08:30:55（灵感库逐条阅读：Round 10 / harness 追加）
- [x] 已按 `canonical_evidence_paths.md` 补齐 harness 剩余两条主证据：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260305_topic15_all\\06_Ss5gfemWiQE.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260305_topic15_all\\12_zpI3Hhz_RKw.txt`
- [x] 已完成与当前 OpenClaw 主线的直接对接判断：
  - agent 时代应弱化强阻塞 review/审批，强化最小门控与快速修正
  - 强制验证与退出前系统卡口，是比“更强模型”更直接的提效点
- [ ] Round 11：开始第一轮跨主题整合，把 harness/context/memory/workflow/ui_automation 合成面向 OpenClaw 当前主线的行动框架

## 2026-03-10 08:27:00（灵感库逐条阅读：Round 9 / workflow 首批）
- [x] 已按 `canonical_evidence_paths.md` 逐条读完 `workflow` 首批四条主证据：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\17_D2CnFzzTeBo.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\18_RcPUsqsp3CE.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\24_ZpU8LQp5GpQ.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\32_v2rvO799KWs.txt`
- [x] 已完成当前阶段边界判断：
  - 默认解仍应先从单体/简单链开始
  - 路由先于 workflow 扩张
  - 多 agent 最稳的第一刀是验证子代理，不是思考子代理
  - 评估体系必须分层，不靠单一评分器
- [ ] Round 10：回到 `harness + workflow + context_engineering` 做第一轮跨主题整合，开始压成面向 OpenClaw 当前主线的产品动作

## 2026-03-10 08:23:58（灵感库逐条阅读：Round 8 / security 首批）
- [x] 已按 `canonical_evidence_paths.md` 逐条读完 `security` 首批三条主证据：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260307_openclaw_image7_all\\03_Bhy30vnrXPU.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260307_openclaw_image7_all\\04_1Q17ZUctNFY.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260307_openclaw_image7_all\\05_wf9lZgB8N0M.txt`
- [x] 已完成当前阶段边界判断：
  - 当前主线应坚持“能力扩张继续，但 Gateway/Telegram 暴露面必须先锁”
  - 安全重点在 loopback、认证、allowlist、凭据轮换、最小暴露，而不是简单砍能力
  - Telegram 所有人可聊属于高危配置，必须保持受控入口
- [x] Round 9：继续进入 `workflow` 主证据，先把多 agent / 评估 / 选型直觉读透

## 2026-03-10 08:20:34（灵感库逐条阅读：Round 7 / ui_automation 首批）
- [x] 已按 `canonical_evidence_paths.md` 逐条读完 `ui_automation` 首批三条主证据：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260304_jesse2\\01_tasXZY7ig24.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260304_jesse2\\02_kf3Kwo7bNNs.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260307_openclaw_image7_all\\02_q3Es3x3Df20.txt`
- [x] 已完成当前阶段边界判断：
  - UI 自动化适合作为浏览器/API 覆盖不到的补位能力
  - 重复流程更应转成 RPA/脚本化回放，而不是每次都全视觉探索
  - UI agent 必须包进异步协作协议，而不是继续走高频实时打断
- [x] Round 8：继续进入 `security` 主证据，先把能力扩张下的安全边界读透

## 2026-03-10 08:18:28（灵感库逐条阅读：Round 6 / memory 首批）
- [x] 已按 `canonical_evidence_paths.md` 逐条读完 `memory` 首批四条主证据：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260309_aibaihua6_all\\04_RnNCCsbttEI.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260309_aibaihua6_all\\05_zzK4p2vVE20.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\01_7eKq4DY62xM.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260302_openclaw24\\30_YFifZEWR9bI.txt`
- [x] 已完成当前阶段边界判断：
  - 主线优先吸收 HMM 与 MemR3 的“控制器/检索策略/证据缺口跟踪”思路
  - 暂不把新的大 memory 基座或自进化市场直接拉进当前主链
- [x] Round 7：按主题优先级切入 `ui_automation` 主证据首批三条，继续逐条读，不跳到补充层

## 2026-03-10 08:16:50（灵感库逐条阅读：Round 5 / context_engineering 追加）
- [x] 已继续逐条读完 `context_engineering` 主证据剩余两条：
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\47_zaGprccLFO8.txt`
  - `D:\\Projects\\灵感包\\转写目录\\douyin_transcripts_20260226_batch48\\48_-W-aKyS1KAc.txt`
- [x] 已将“结构化摘要 schema”“简单搜索原文直返 + 中间洞见写文件”“复杂搜索交给子 agent”“三层行动空间”压入低噪音价值笔记
- [x] 用户已明确接受两条主线决策：
  - OpenClaw 继续走“单决策流 + 外部交接 + 能力网络 / 轻前台 + 子代理”
  - 接受把“结构化 docs / Clean State / 交接日志 / 后台清理循环”做重以换长期稳定
- [x] Round 6：按主题优先级切入 `memory` 主证据首批四条，继续逐条读，不跳到补充层

## 2026-03-10 08:10:22（灵感库逐条阅读：Round 4 / context_engineering 首批）
- [x] 按用户指定顺序读取 `D:\Projects\灵感包\README.md`、`LATEST.md` 与 `最新灵感包` 的 6 个入口文件
- [x] 通过索引锁定“逐条阅读”范围与顺序，不扫描整个 `D:\Projects`
- [x] 进入 `douyin_transcripts_20260309_harness6_all`，逐条读完：
  - `01_vY32FEl1gJ8.txt`
  - `02_QVLHlf9cmzg.txt`
  - `03_OAoVurGk64A.txt`
- [x] 继续同一批次逐条读完：
  - `04_-tuM5rY0CWQ.txt`
  - `05_R_xkuPGSP34.txt`
  - `06_kix1-w8vd64.txt`
- [x] Round 3：已进入 `douyin_transcripts_20260309_harness2_all`
  - `02_BqvtMYdKt8Y.txt` 已正常读完
  - `01_rLBsav2GIro.txt` 已读到原始文件，但正文出现编码污染，需单独重读修正
- [x] 已用同源 `local_whisper` 可读稿修正并重读 `01_rLBsav2GIro.txt`
- [x] 按 RAG `canonical_evidence_paths.md` 进入 `context_engineering` 主证据首批：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\14_dvQQGjT0yPk.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\18_gBpAw_e-PA0.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260225\19_Of0t7UDpTw8.txt`
- [x] Round 5：继续 `context_engineering` 剩余 `47_zaGprccLFO8.txt`、`48_-W-aKyS1KAc.txt`

## 2026-03-09 22:51:53（OpenClaw 代理 Codex + 浏览器自动化能力收口）
- [x] 复读灵感包与最新 RAG 口径，确认术语路由：Codex 对话走官方 ACP/ACPX，网页自动化走官方 browser，Windows 系统能力走官方 node host
- [x] 为 OpenClaw 增加共享 ACPX 包装器 `C:\Users\Lenovo\.openclaw\bin\oc-acpx.cmd/.py`，统一 `--agent / --cwd / --prompt / --prompt-file / --session`
- [x] 在 `workspace / workspace-telegram-fast` 写回 ACP runtime 命中 Telegram 线程限制后的稳定回退规则，不再让 agent 临场乱拼 Windows 长命令
- [x] 复验 `main` 与 `telegram-fast` 都能真正把一句话指令转给 Codex 并回出 `hi`
- [x] 复验官方 browser 仍可正常启动并连到 Chrome CDP，节点宿主已通过隐藏前台 `node run` 回接 Gateway
- [ ] 下一轮只剩两类收口：继续压低 agent -> Codex 中继时延；如需常驻 Windows node host，再单独处理计划任务安装权限

## 2026-03-09 16:53:03（给 telegram-fast 开只读 memory）
- [x] 将 `memory_get` 与 `memory_search` 加入 `telegram-fast` 的显式 allowlist
- [x] 更新 `workspace-telegram-fast/AGENTS.md / TOOLS.md / MEMORY.md`，明确只读 memory 只用于借事实，不构成第二写入真源
- [x] 复验 `openclaw config validate`
- [x] 处理本机 `gateway restart` 假超时后，重新拉稳 Gateway 与 Telegram probe
- [x] 完成最小 smoke：`telegram-fast` 现已直接回答 `memory_search,memory_get`

## 2026-03-09 16:12:14（OpenClaw 升级到 2026.3.8）
- [x] 核实当前本机版本、更新通道与 dry-run 结果，确认目标版本为 `2026.3.8`
- [x] 首次执行官方 `openclaw update --yes`，钉实失败根因是 Windows 文件锁：运行中的 Gateway 占用安装目录，触发 `npm EBUSY rename`
- [x] 停止 `OpenClaw Gateway` 计划任务并释放 `18789` 对应 `node.exe` 进程锁
- [x] 通过 `npm i -g openclaw@latest` 完成实际升级
- [x] 重启 Gateway 并完成回归：`--version`、`update status`、`status --deep`、`gateway health`、`channels status --probe`
- [x] 确认升级后 `telegram-fast` 仍运行在 `openai-codex-oauth:gpt-5.4`，且外挂工具面未丢

## 2026-03-09 15:55:08（telegram-fast 外挂放权）
- [x] 读取 `D:\Projects\灵感包\README.md` 与 `LATEST.md`，并按最新 UI automation 灵感核实放权方向
- [x] 将 `telegram-fast` 的工具面从 `fs/runtime/web` 扩到 `ui/automation/nodes + sessions/subagents/message`
- [x] 为 `workspace-telegram-fast` 补齐项目路由 capsule：`memory/project-routing.md` 与 `memory/project-vrplayer.md`
- [x] 收紧 `AGENTS.md / TOOLS.md / MEMORY.md`，明确前台助理应优先用 UI/automation/派工能力，而不是空谈
- [x] 完成 `openclaw config validate / gateway health / status --deep` 复验
- [x] 完成 Dashboard Tools 页可视验证，确认 `telegram-fast` 当前 `19/25 enabled`
- [x] 完成本地 smoke：项目命中、UI 页面读取、sessions/agents/nodes 基线全部可回报
- [ ] 后续若要让 `nodes` 真正可用，还需单独安装或配对 node host；本轮只开放入口，不动系统服务

## 2026-03-09 15:40:00（Memory MCP 复利工程）
- [x] 将 Memory HTTP / MCP 主通道沉淀为独立手册 `memory_mcp_compound_playbook.md`
- [x] 将 `MEMORY_WRITE_FIRST.md` 升级为“速查入口 + 复利手册入口”
- [x] 强化 `scripts/memory_write_safe.py` 输出，显式区分 `accepted / dedup_rejected / failed / net_new`
- [x] 复测 `memory_selftest_utf8.py`，确认中文回读仍为 `roundtrip_ok=true`
- [x] 复测去重口径，确认重复写入返回 `dedup_rejected=1`，不再与失败混淆
- [x] 清理本轮测试噪音记忆，避免污染长期库

## 2026-03-09 15:26:00（当前窗口复利工程）
- [x] 把当前窗口已验证过的 OpenClaw 主线真值收成单独复利手册 `openclaw_compound_playbook.md`
- [x] 固定模型治理真源：`openclaw.json -> status --deep -> telegram-fast 直接自述`
- [x] 固定反回滚 SOP：工作区真注入恢复 + `sessions.json` 清空 + fresh session 复核
- [x] 固定项目路由规则：`vrplayer` 强/弱触发边界与项目优先解释
- [x] 将复利手册入口写回 `README.md`
- [x] 将本轮新增坑点与恢复步骤写回 `progress.md / findings.md`

## 2026-03-09 14:18:00（telegram-fast 项目上下文注入优化）
- [x] 重新核实 OpenClaw 官方工作区注入边界：自动注入仅含 `AGENTS/SOUL/TOOLS/USER/MEMORY`，项目 capsule 改走 `workspace-telegram-fast/memory/*.md`
- [x] 为 `telegram-fast` 落地项目感知规则：新增项目域判定、弱触发/强触发边界、会话项目粘性、项目内问题优先回答规则
- [x] 新增 `workspace-telegram-fast/memory/project-routing.md` 与 `memory/project-vrplayer.md`，把 `vrplayer` 术语、锚点、硬规则和高价值事实做成精简 capsule
- [x] 收口模型真源：将 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `agents.defaults.model.primary` 与 `telegram-fast.model.primary` 同步固定为 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
- [x] 刷新 `telegram-fast` 主会话快照，避免旧 prompt 与旧模型自述继续污染本地/Telegram 首轮行为
- [x] 完成本地 smoke：项目命中、项目粘性、fresh 会话下的歧义问法三条全部按预期
- [x] 完成可视证据采样：OpenClaw Dashboard snapshot + console，确认 `telegram-fast` 当前主模型显示为 `gpt-5.4`

## 2026-03-09 11:52:00（把 gpt-5.4 落成 Telegram 主链的真默认）
- [x] 复核当前真配置，确认 `agents.defaults` 虽是 `gpt-5.4`，但 `telegram-fast.model.primary` 已再次漂回 `gemini-3-flash-preview`
- [x] 将 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `telegram-fast` 主模型重新切到 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
- [x] 收紧 `telegram-fast` fallback 顺序为 `gpt-5.3-codex -> gemini-3.1-pro-preview -> gemini-3-pro-preview`
- [x] 同步 `workspace-telegram-fast/TOOLS.md` 的主模型口径，避免 prompt 自述继续残留 Gemini
- [x] 清空 `telegram-fast` 活 session store，强制 fresh start
- [x] 复验 `openclaw config validate / gateway health / status --deep / telegram-fast smoke`
- [ ] 等待下一条真实 Telegram 消息，确认 TG 直连会话也从首条起按 `gpt-5.4` 自述与执行

## 2026-03-09 11:45:00（Telegram fast 模型自述与外部查证口径收口）
- [x] 钉实 Telegram 里继续自称 Gemini 的真实原因：`telegram-fast` agent 真配置、`workspace-telegram-fast/TOOLS.md`、以及 TG 直连旧 session 三处仍残留 Gemini 口径
- [x] 将 `C:\Users\Lenovo\.openclaw\openclaw.json` 中 `telegram-fast` 的主模型切到 `custom-127-0-0-1-3000/openai-codex-oauth:gpt-5.4`
- [x] 给 Telegram fast 开放 `group:web`，并在 `TOOLS.md` 明确“时效性事实先查证，查不到就明确无法核验，不得猜测”
- [x] 清掉被旧 Gemini 上下文污染的 TG 直连 session store，强制下一条 Telegram 消息 fresh start
- [x] 重启 Gateway 并复验 Telegram probe、活会话模型、本地同配置 smoke 与 AIClient2API provider 日志
- [ ] 等待下一条真实 Telegram 消息，确认直连会话也改按 `openai-codex-oauth:gpt-5.4` 自述与答复

## 2026-03-09 11:20:00（OpenClaw 默认主模型切到 gpt-5.4）
- [x] 核实新 Codex CLI 号本地可见 `gpt-5.4`，但 `AIClient2API(127.0.0.1:3000)` 裸入口并未天然稳定命中该路由
- [x] 为 `C:\Users\Lenovo\.openclaw\openclaw.json` 新增 `openai-codex-oauth:gpt-5.4` 模型，并先将 `agents.defaults` 切到该前缀模型
- [x] 对齐 `agent:telegram-fast:main` 等本地会话元数据，确认 prefixed route 可跑通
- [x] 重启 Gateway 并复验：`openclaw status` 已显示默认模型为 `openai-codex-oauth:gpt-5.4`
- [x] 用 `AIClient2API` 日志复验真实路由：带前缀的 `openai-codex-oauth:gpt-5.4` 已命中 `openai-codex-oauth`
- [x] 在后续 11:45 收口里补齐 Telegram 绑定 agent、`TOOLS.md` 与 TG 直连旧 session 的残留 Gemini 漂移
- [ ] 如需让裸 `gpt-5.4` 也稳定命中 OpenAI/Codex，还需继续收 `AIClient2API` 多 provider 裸模型路由逻辑；本轮先不把 Gemini fallback 冒充成 GPT 路由

## 2026-03-09 10:10:48（真实 Telegram 复杂任务与三馆学伴报错收口）
- [x] 通过真实 `kyuu_ai_bot` 消息收口 OCP-6：`telegram_realtrace.latest.json` 已捕获 `2026-03-09 08:45:31` 的新鲜样本
- [x] 通过真实复杂任务 `task_ref=tg-20260309-084430-vrplayer-study-companion` 将 OCP-9 从“等待触发”推进到“执行中”
- [x] 复现 `三馆学伴` 当前真实故障：`POST https://chat-fachfrmdcz.cn-hangzhou.fcapp.run/` 返回 `HTTP 403`
- [x] 修复 `src/services/fcChatClient.ts`：识别云函数 `{RequestId, Code, Message}` 错误包，并将 `AccessDenied + debt` 映射成可读中文错误
- [x] 用 chrome-devtools 完成页面级复验：新请求气泡已从 `请求失败：服务返回异常数据` 变为 `请求失败：服务暂不可用（云函数账户欠费，HTTP 403）`
- [ ] 保持 OCP-9 执行中：继续以这条真实复杂任务样本观察官方 Telegram 主链的异步 closeout 与复利沉淀链路

## 2026-03-09 08:05:30（Heartbeat 主链语义收口）
- [x] 将 `heartbeat-state` 从“旧治理总闸 freshness”收口为“官方 OpenClaw 主链健康优先”
- [x] 将 `ops_health` 降为 Heartbeat 辅助信号，不再单独拖垮 `heartbeat_status`
- [x] 将 `safe_ops_ledger` 纳入 Heartbeat 主判断，确保主链边界违规才真正亮红
- [x] 清理 `findings.md` 遗留控制字符，恢复文档健康基线
- [x] 补充 `self-improving-agent` 外部仓证据，并锁定“只借鉴日志/提升思路，不直接装进生产主链”

## 2026-03-08 21:27:20（官方 OpenClaw 复杂任务与复利闭环）
- [x] Batch 1：新增 `telegram-realtrace-once`，把 OCP-6 变成可被动收口的真实流量证据层
- [x] Batch 1：扩展 `supervisor_digest.latest.{md,json}`，新增 `latest_real_trace / complex_task_readiness / open_task_count / accepted_patterns_recent`
- [x] Batch 2：收敛官方 OpenClaw / `telegram-fast` 复杂任务协议，明确绿灯任务默认继续执行，代码型复杂任务优先 bundled `coding-agent`
- [x] Batch 3：新增 `morning-digest`，把 open tasks / recent completions / red lights / win patterns 聚合成监督层摘要
- [ ] Batch 4：等待一条真实 Telegram 复杂任务，验收“自然语言 -> 执行 -> adoption / memory 沉淀”全链路

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
- [x] 阶段4（P1）：`main.ts` / `PanoViewer.ts` 结构性拆分（已由第九轮阶段1覆盖，commit: `499ed3f`）
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
- [x] 阶段5：按 SOP 发布补充收口改动（已发布，commit: `eef5093`）

## 第八轮交互体验收口（本次）
- [x] 阶段0（P0）：高清就绪后后台预热“导览/社区/信息/更多”相关模块，降低首次点击卡顿
- [x] 阶段1（P0）：恢复低清加载状态提示链路（确保 `LOADING_LOW/LOW_READY` 可见）
- [x] 阶段2（P0）：保持“三馆学伴头像”仅在点击“社区”后显示，首屏不展示
- [x] 阶段3：构建验证 + chrome-devtools 证据采样
- [x] 阶段4：按 SOP 发布第八轮改动（已发布，commit: `86d0953`）

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
- [x] 阶段4：构建验证 + chrome-devtools 证据采样（已由第十轮增量阶段2覆盖）
- [x] 阶段5：按 SOP 发布第十轮（`dist -> docs -> commit -> push`，已发布，commit: `35a372c`）

## 2026-02-19 16:42:28
- 第十轮增量优化：去除场景初始化的阻塞等待（移除 `await sceneUiRuntime.ensureQualityIndicatorMounted()`）。
- 预热策略收敛：自动预热仅保留导览/信息相关模块，不再自动预热 dock-panels/community/chat。
- 目标结果：减少首屏与高清爬升阶段的网络争抢，社区链路改为“点击后再加载”。

## 2026-02-20 21:09:42
- 控制台与聊天链路复核：chatRuntime -> FcChatPanel -> fcChatClient。
- 三馆学伴会话记忆兼容修复：请求体历史项新增 `text`，并新增 chatHistory 兼容字段，避免后端仅识别 `text` 时丢失上下文。
- 三馆学伴文案修复：聊天面板状态/错误文案统一简体中文，错误提示改为 请求失败：<msg>。
- 约束保持：聊天入口仍为“点击社区后初始化”，未改回首屏显示头像。

## 2026-02-20 22:03:10
- [x] 补充图片上下文到仓库文档（Codex 主会话与子任务外包边界）
- [x] 新建宿主服务 `tools/codex-host/server.mjs`（MCP + 本地 health/status）
- [x] 新增 npm 脚本 `host:start` / `host:selftest`
- [x] 将宿主接入本机 `C:\Users\Lenovo\.codex\config.toml`，供 Codex 插件直接访问
- [x] 自测与证据化验收（self-test + health API + chrome-devtools snapshot/network）

## 2026-02-20 21:20:35
- 新增三馆学伴前端兜底记忆：按馆持久化 profile(name)，识别“我叫xxx/我的名字是xxx/叫我xxx”。
- 命中“我叫什么/我的名字/记得我名字”等问句时，本地直答，避免后端忽略 history 导致失忆。
- 修复姓名提取边界：过滤“什么/啥/名字”等占位词，避免误把“我叫什么”写成名字。
- Playwright 实测：点击社区后才显示学伴头像；清空后输入“我叫sgm”再问“我叫什么”，回复“你叫sgm。我已经记住了。”

## 第十轮记忆修复增量（2026-02-20 21:37:52）
- [x] 阶段0（P0）：`FcChatPanel` 增加“我今天干了什么/我刚才说了什么”本地回忆兜底分支
- [x] 阶段1（P0）：保持“点击社区后才显示学伴头像”的现有触发链路
- [x] 阶段2：`npm run check:text` + `npm run build` + Playwright 复现采样验证
- [x] 阶段3：按 SOP 发布本次增量（`dist -> docs -> commit -> push`）

## 第十轮记忆修复增量（二次收口，2026-02-20 22:06:55）
- [x] 阶段0（P0）：回忆逻辑从“固定问法匹配”升级为“语义打分检索”（token overlap + 主语命中 + 近因权重）
- [x] 阶段1（P0）：覆盖改写问法（示例：`姥姥干了家务 -> 姥姥干了啥`）并保留社区后初始化约束
- [x] 阶段2：`npm run check:text` + `npm run build` + Playwright 复现采样（snapshot + network + console）
- [x] 阶段3：按 SOP 发布本次二次收口（`dist -> docs -> commit -> push`，已发布，commit: `bfa3679`）

## 2026-02-21 16:59:30
- [x] 阶段0：`aiclient-orchestrator` 增强 `delegate_batch`（`execution` + `concurrency`）并落地并发批量执行路径
- [x] 阶段1：新增软闸门告警体系（轻任务误走 Codex + Codex 占比超阈值），并提供 `GET /admin/api/alerts` 与 `GET /admin/api/routing/policy`
- [x] 阶段2：控制台补齐 KPI（非 Codex 占比、软闸门告警）与配置项（并发/阈值）
- [x] 阶段3：`codex-host` 工具增强（`host_delegate_batch_concurrent`、`host_policy_snapshot`、`host_alerts_recent`）
- [x] 阶段4：接口验证 + 宿主自测 + `chrome-devtools` 证据采样（snapshot + network）
- [x] 阶段5：按发布 SOP 完成 `dist -> docs -> commit -> push`（该批次为宿主工具链改造，按 host 运行与接口验收替代发布）

## 2026-02-21 17:06:40
- [x] 阶段6：Context7 复核 Express 异步错误处理约束（异步分支统一 `next(err)`，错误中间件四参兜底）
- [x] 阶段7：按 Memory 统一通道写入会话关键记忆（`/api/memories`，`roundtrip_ok=true`）
- [x] 阶段8：会话规划文件同步（task/findings/progress），确保新窗口可恢复
- [x] 阶段9：控制台可读性收口（插件摘要去噪截断 + 结果区 `aria-live` + `codex-host` README 乱码修复）

## 2026-02-21 17:55:03
- [x] 阶段10：`codex-host` 新增主Agent编排能力（`host_team_execute`）
- [x] 阶段11：新增一条命令执行链路（`npm run host:team -- --task "..."`）
- [x] 阶段12：团队编排实测（自动拆解 -> 并发子任务 -> 汇总）通过
- [x] 阶段13：`chrome-devtools` 证据采样（snapshot + network）确认统计与任务时间线刷新

## 2026-02-21 22:48:40
- [x] 升级 host_task_autopilot 到 v2 自动策略（分类 + 路由/编排决策）
- [x] 增加策略可解释输出（推荐 skills/MCP、分类分数、执行理由）
- [x] 增加不执行预览入口（preview_only + --autopilot-preview）
- [x] 更新 `tools/codex-host/README.md` 与 `tools/codex-host/CODEX_PROMPTS.md`
- [x] 完成语法与功能验证（selftest + autopilot preview）


## 2026-02-23 15:11:50（Codex Host worker-hard 路由升级）
- [x] 阶段0：读取用户参考建议（`C:\Users\Lenovo\Downloads\42845432-3147-411e-a4cb-a41926edfa32.md`）并提炼可落地点
- [x] 阶段1：调整 router-autotune 候选顺序（引入 `gemini-claude-opus-4-6-thinking`、提升 `gemini-3.1-pro-preview`）
- [x] 阶段2：实现 worker-hard 策略（先试 2 次 Gemini deep，再按结果晋升或回退）
- [x] 阶段3：实现 worker-hard 失败子任务自动回退 Codex deep
- [x] 阶段4：执行 host 自测 + 2 次真实探测，核验策略生效
- [x] 阶段5：同步 README + 会话记忆写入（HTTP 通道）

## 2026-02-23 15:35:34（本轮收口）
- [x] 修复短路根因：高复杂度不再被当作 hard worker 的强制 Codex 信号
- [x] 验证 hard worker：高复杂度普通任务 `preview-only` 命中 `worker_provider=gemini`
- [x] 验证真实执行：team workflow 中 worker 走 `gemini deep`，并记录 `hardWorkerRoutingState.trials=2, success=2, promoted=true`
- [x] 写入会话记忆（Memory HTTP）：`content_hash=09dd1a2d7cce720b24bcd9bc21524f95eb22d9fb7fefe3dd64dfd168a0cd2a28`、`content_hash=00120b9a5bea13c8706ab3a10820ec0cc88caa7e9bc8f3af6feac5fad854bbed`

## 2026-02-23 18:26:02（旧总计划最终收口 + 关键细节实装）
- [x] 历史未勾选项全部收口（`task_plan.md` 全量状态已清零，无剩余 `[ ]`）。
- [x] 关键细节补齐：`host_benchmark_run_once` 样本支持从 `1~6` 升级为 `1~12`（默认 8），与旧计划“每角色 8~12 样本”对齐。
- [x] 关键 bug 修复：`run-once` 在未传 `providers` 时不再误生成 `providerFilter=["unknown"]`（已恢复正常全候选学习）。
- [x] 真实学习落地：已执行 8 样本基准学习（`planner`、`worker_hard`、`worker_normal`），`runCount` 从 1 增至 4，核心角色候选 `source` 已由 `baseline` 切换为 `run-once`。
- [x] 控制台行为收口：`学习一次` 按钮改为“单角色 8 样本 / 全角色 2 样本”，避免全量深度学习一次性成本过高。

## 2026-02-24 10:20:30（上下文工程解耦迁移）
- [x] 按 `using-superpowers` 要求读取并执行 `planning-with-files` 工作流。
- [x] 阶段0：生成迁移前基线清单（`inventory_before.json`，含路径/字节/行数/sha256）。
- [x] 阶段1：建立 `C:\Users\Lenovo\.codex\context-hub` 分层目录与迁移批次目录。
- [x] 阶段2：将混合文档完整镜像到 `source_backup`（不删除原文件）。
- [x] 阶段3：从 `README.md` 的 `Agent Notes (Persistent)` 抽取三层内容：
  - `global`：`C:\Users\Lenovo\.codex\context-hub\global\README_GLOBAL.migrated.md`
  - `tooling(codex-host)`：`D:\Projects\vrplayer\tools\codex-host\context\notes.migrated.md`
  - `vrplayer`：`D:\Projects\vrplayer\context\notes.vrplayer.migrated.md`
- [x] 阶段4：抽取 `task_plan/progress/findings` 中工具链段落到 `tools/codex-host/context/*.migrated.md`。
- [x] 阶段5：生成“非常见规范文件索引”与“迁移映射”（`uncommon_spec_index.md`、`migration_map.json`）。
- [x] 阶段6：生成迁移后基线并校验（`inventory_compare.json`，差异=0）。
- [x] 阶段7：按用户确认执行 `agent_notes_uncertain.md` 的 9 条二次归位（保留原文件不删）。
- [x] 阶段8：按用户新策略将 `codex-host/orchestrator/aiclient2api/memory` 统一镜像到 `context-hub/global/projects`。
- [x] 阶段9：更新全局导航与索引（`context-hub/README.md`、`indexes/uncommon_spec_index.md`、`migration_summary.json`）。

## 2026-02-24 10:45:30（安全迁移版切换）
- [x] 阶段10：新增全局启动入口 `C:\Users\Lenovo\.codex\tools\codex-host-launcher.mjs`（主路径优先、本地回退）。
- [x] 阶段11：更新 `C:\Users\Lenovo\.codex\config.toml` 的 `mcp_servers.codex-host.args` 指向 launcher，并补充 `CODEX_HOST_PRIMARY/FALLBACK`。
- [x] 阶段12：更新 `C:\Users\Lenovo\.codex\tools\start-local-stack.ps1`，3220 启动改为 launcher（保留本地旧路径回退分支）。
- [x] 阶段13：语法与自测通过（`node --check codex-host-launcher.mjs` + `node codex-host-launcher.mjs --self-test`，exit=0）。
- [x] 阶段14：保留回退备份（`migrations/20260224-101500/safety_cutover_backup`）。

## 2026-02-24 11:26:35（全局单点真源 + context-hub 索引化收口）
- [x] 新增 C:\Users\Lenovo\.codex\tools\orchestrator-launcher.mjs，采用“主路径优先 + 备份路径回退”。
- [x] 更新 C:\Users\Lenovo\.codex\config.toml：
  - mcp_servers.aiclient-orchestrator.args 切换为 launcher；
  - 新增 ORCHESTRATOR_PRIMARY/ORCHESTRATOR_FALLBACK；
  - CODEX_HOST_PRIMARY 调整为项目真源优先，镜像路径仅回退。
- [x] 更新 C:\Users\Lenovo\.codex\tools\start-local-stack.ps1：3217 端口改为 launcher 启动，保留 start-orchestrator.cmd 回退分支。
- [x] 新增 C:\Users\Lenovo\.codex\context-hub\global\TOOL_CANONICAL_SOURCES.json（运行真源注册表）。
- [x] 新增 C:\Users\Lenovo\.codex\context-hub\CONTEXT_ROUTING.json（上下文 include/exclude 路由）。
- [x] 对 global/projects/*/source_mirror 写入 ARCHIVE_ONLY.md，明确“归档可追溯，不作为运行源/默认上下文源”。
- [x] 自检：`node --check`、PowerShell 解析、3217/3220/8000 健康检查全部通过。



## 2026-02-24 15:20:00（1/2/3 合并实施收尾）
- [x] 阶段15：修复活跃文档控制字符乱码（task_plan/progress/findings/context-hub README）。
- [x] 阶段16：执行脚本链路复验（verify_canonical_sources、contextctl pack/ingest/promote/weekly-review/monthly-verify）。
- [x] 阶段17：生成会话入口包并固化 digest（`view_pack.general_ops.json`）。
- [x] 阶段18：完成本轮沉淀记录并已写入 Memory HTTP（关键决策 + 结果总结）。


## 2026-02-24 16:35:38（上下文自动化 1-3 落地）
- [x] 阶段19：修复 `contextctl promote` 门禁逻辑（`inbox-only` 不再自动提升）。
- [x] 阶段20：新增 `start-session` 与 `session-close` 两个自动化动作（启动校验/收口复盘一体化）。
- [x] 阶段21：新增统一模板 `SESSION_START_UNIFIED.md`，按 `TaskType` 自动映射 profile。
- [x] 阶段22：完成实测验证与测试数据清理（不污染真实 inbox/curated）。

## 2026-02-24 16:54:48（自动化总控命令落地）
- [x] 阶段23：新增 `daily-start`（启动+校验+健康检查+自动pack）。
- [x] 阶段24：新增 `daily-close`（会话收口，支持可选 weekly-review 与可选 prune）。
- [x] 阶段25：新增 `monthly-maintain`（月检+备份，支持可选归档 inbox）。
- [x] 阶段26：修复备份并发占用缺陷（排除 migrations 作为备份源，避免 zip 自包含写入冲突）。

## 2026-02-24 18:09:30（Memory MCP 升级与治理收口）
- [x] 校验上游版本并完成升级：mcp-memory-service 10.10.0 -> 10.17.16。
- [x] 修复服务启动后误写默认空库问题，确认 database_path 回到 C:\Users\Lenovo\.codex\mcp-memory\memories.db。
- [x] 新增 C:\Users\Lenovo\.codex\context-hub\scripts\memory_governance.py（全量拉取、标签归一、memory_type 回填、视图生成）。
- [x] 扩展 contextctl.ps1：新增 -Action memory-govern，并在 monthly-maintain 自动执行治理 dry-run。
- [x] 完成一次 apply 治理并复验（回写成功、失败 0、后续候选更新收敛为 0）。

## 2026-02-24 20:48:44（v4 继续落地执行状态）
- [x] 复核 v4 验收进度（候选/区分度）
- [x] 复核家族池与评分全榜单
- [x] 进行控制台证据化验证（snapshot + network）
- [x] 同步“非 Codex 占比仅监控”口径到执行结论

## 2026-02-24 23:47:44（v4 收口补丁）
- [x] 修复 4-progress 与角色榜判定不一致（去除健康池键交集硬过滤，仅保留冷却过滤）。
- [x] 补跑 merge 标准档基准（8 样本，continue=true）并复测 overallReady=true。
- [x] 文档同步：	ools/codex-host/README.md、README.md、progress.md、indings.md。

## 2026-02-25 14:03:45（抖音20集上下文工程差异研究）
- [x] 读取 D:\Projects\douyin_transcripts_20260225 全量20集转写与 summary。
- [x] 读取最近 memory 快照（raw/curated/views）。
- [x] 产出多份建议文档（差异图谱 + 方案A/B/C + 90天蓝图）。
- [x] 进入实施阶段前，按优先级从方案A选3项先落地（已完成，且已扩展为全链路执行）。

## 第十一轮阶段状态（本次，上下文工程执行轮）
- [x] 阶段0：锁定用户原则（需求含糊时必须追问到高置信度再给方案）并写入长期记忆
- [x] 阶段1（P0）：会话胶囊化（session_capsule）落地
- [x] 阶段2（P0）：路由可解释化（decision_trace）落地
- [x] 阶段3（P1）：Memory 双轨制基础规则落地（long-track / short-track）
- [x] 阶段4：脚本验证 + 产物验收 + 记忆收口

## 2026-02-25 15:49:26
- 本轮目标：执行 CONTEXT_ENGINE_MASTER_PLAN_v3 的第一批低扰动高收益改造（会话胶囊、路由可解释、双轨记忆基础）。
- 决策约束：AI 不对单条意见赋予过高权重；需求含糊必须追问，直到达到高置信度理解再输出方案。


## 第十二轮阶段状态（本次，v3第二批执行）
- [x] 阶段0（P0）：contextctl 指标化落盘（metrics.jsonl 自动记录 pack/start/promote/close/memory-govern）
- [x] 阶段1（P0）：错误资产化（error_journal.jsonl + 全局异常捕获 + log-error 动作）
- [x] 阶段2（P1）：memory_governance 指针化与 latest 原子写入
- [x] 阶段3：执行验证与会话记忆收口

## 2026-02-25 16:12:42
- 本轮结果：已完成“错误资产化 + 指标化 + 可逆压缩指针化”三项落地，并保持现有命令入口兼容。

## 第十三轮阶段状态（本次，v3第三批-阶段1）
- [x] 阶段0（P0）：runtime_state 隔离落地（session/global 双目录）
- [x] 阶段1（P0）：pack/start-session 输出 session_state_path 与 global_state_path
- [x] 阶段2（P1）：session-close 写入 last_close 全局状态
- [x] 阶段3：执行验证与记录

## 2026-02-25 16:16:18
- 本轮结果：已完成 runtime_state 隔离的第一阶段，实现会话态与全局态分离存储，降低并行任务隐式共享风险。

## 第十四轮阶段状态（本次，工具层原子化）

## 第十五轮阶段状态（本次，上下文质量验收 + Agent Teams 接入）
- [x] 阶段0（P0）：`contextctl.ps1` 故障恢复（保留损坏脚本归档后，从备份恢复健康版本）
- [x] 阶段1（P0）：评估证据事件层落地（`data/events/evidence_events.jsonl`，每条 case 写入独立证据事件）
- [x] 阶段2（P0）：证据优先验收门禁落地（`Test-EvidenceGate`，无证据字段不判定通过）
- [x] 阶段3（P0）：记忆写入口径统一（`memory_write_safe.py` 输出 `attempted/accepted/dedup_rejected/failed/net_new`）
- [x] 阶段4（P1）：Agent Teams 条件接入产品化（`team_policy=auto|force|off` + `teamActivation` 可解释输出）
- [x] 阶段5：语法与功能验证（`contextctl eval-run`、`node --check`、`py_compile`、`autopilot-preview`）

## 2026-02-27 01:19:06
- 本轮目标：完成“上下文质量验收 + Agent Teams 接入”主链路，不依赖用户手工介入。
- 本轮结果：P0 三项全部收口，P1-1 已落地；P1-2（Evo Unit 评分器）与 P1-3（跨外部聊天平台接入层）保留在下一执行窗口继续推进。
- [x] 阶段0（P0）：新增原子动作脚本层（pack/ingest/promote/weekly-review）
- [x] 阶段1（P0）：控制面注册 	ool_surface.v1.json 并纳入默认读取顺序
- [x] 阶段2（P1）：保留 contextctl 编排主入口，确保零破坏兼容
- [x] 阶段3：执行验证与记录收口

## 2026-02-25 16:23:28
- 本轮结果：工具层重构完成第一阶段，已形成“原子工具 + 编排层”双层结构，默认行为保持兼容。

## 第十五轮阶段状态（本次，双账本/Evo Unit 阶段1）
- [x] 阶段0（P0）：新增账本策略 ledger_policy.v1.json
- [x] 阶段1（P0）：contextctl 接入 events/cognition 双账本写入
- [x] 阶段2（P1）：ingest/promote/session-close 链路接入 Evo Unit 最小字段
- [x] 阶段3：执行验证与收口

## 2026-02-25 16:27:33
- 本轮结果：双账本机制已进入可运行状态，可追踪“发生了什么 + 为什么这样做”。

## 2026-02-25 16:35:31（全机上下文工程 v3 继续执行）
- [x] 阶段27：contextctl 增加 Evo Unit 写入（data/ledgers/evo_units.jsonl）。
- [x] 阶段28：promote 增加 -EmitLedger 开关，session-close/daily-close 关闭内部重复记账。
- [x] 阶段29：ledger_policy.v1.json 升级到 1.1.0，补充 evo_units 路径与必填字段。
- [x] 阶段30：修复 context-hub/README.md v3 阶段说明中的路径与转义异常，补齐第五阶段记录。
- [x] 阶段31：执行命令验证（start-session / pack / promote / session-close）并确认账本输出一致。
- [x] 阶段32：写入本轮关键记忆（Memory HTTP）并收口。

## 2026-02-25 18:33:49（全局升级：A1 + B4 + C3 执行）
- [x] 阶段33：contextctl 增加启动仪式块（locate/recall/restore/mission）。
- [x] 阶段34：新增目标校准回路（todo/current_goal.md 自动创建与 goal_ready 检查）。
- [x] 阶段35：新增前缀稳定度指标（prefix_stability_score + cache_hit_proxy）。
- [x] 阶段36：新增重复动作策略切换提示（digest 连续重复时给出 hint）。
- [x] 阶段37：命令验证通过（start-session、daily-start -SkipStartStack）。
- [x] 阶段38：把升级结论写入 context-hub README 与主蓝图 v3。
- [x] 阶段39：写入 Memory HTTP 收口。

## 2026-02-25 18:46:30（全局升级：A3 执行器收口）
- [x] 阶段40：contextctl 新增自动策略轮换执行器（baseline/error-first/memory-first）。
- [x] 阶段41：新增三份策略模板并接入 start-session 自动选模版。
- [x] 阶段42：修复 Write-JsonAtomic 并发覆盖时“文件已存在”异常。
- [x] 阶段43：脚本解析与命令验证通过（start-session 连续执行、策略轮换生效）。

## 2026-02-25 19:06:00（全局升级：Memory 写入链路硬化）
- [x] 阶段44：在 context-hub 新增 memory_write_safe.py 与 memory_selftest_utf8.py。
- [x] 阶段45：contextctl 新增 `memory-write` / `memory-selftest` 动作。
- [x] 阶段46：contextctl 增加 `MessageB64` 输入通道，规避终端参数编码污染。
- [x] 阶段47：完成 UTF-8 roundtrip 验证与 metrics 落盘（memory_write/memory_selftest）。

## 2026-02-25 19:20:00（全局升级：永久档案治理）
- [x] 阶段48：新增 memory_retention_policy.v1.json，固化“不删除/不销毁”规则。
- [x] 阶段49：新增 contextctl `memory-archive` 非破坏式归档动作。
- [x] 阶段50：routing_policy 默认排除 data/archive，避免 archive 噪音进入默认读链。
- [x] 阶段51：monthly-maintain 接入 memory-archive，形成月度自动归档索引闭环。
- [x] 阶段52：写入长期偏好记忆（non-destructive retention）并完成 roundtrip 校验。

## 2026-02-25 19:50:24（全局升级：非破坏式标签化）
- [x] 阶段53：新增 `memory_tag_unrecoverable.py`，对 archive 候选执行非破坏式标签化。
- [x] 阶段54：contextctl 新增 `memory-tag-unrecoverable` 动作并接入 metrics。
- [x] 阶段55：monthly-maintain 接入 memory-tag-unrecoverable 自动执行。
- [x] 阶段56：首轮执行完成（12 条 applied，0 failed）。
- [x] 阶段57：修复打标幂等性（重复执行后 `applied=0`、`skipped=12`）。

## 2026-02-25 20:15:29（全局升级：归档总索引）
- [x] 阶段58：新增 memory_archive_catalog.py，生成 archive 可读总目录（json+md）。
- [x] 阶段59：contextctl 新增 archive-catalog 动作，并接入 monthly-maintain 自动执行。
- [x] 阶段60：完成语法校验与命令验证（archive-catalog / monthly-maintain / start-session）。



## 2026-02-25 20:21:47（归档索引后的 UTF-8 修复）
- [x] 阶段61：修复 memory_selftest_utf8.py 的历史乱码测试文本，改为真实简体中文 roundtrip 校验。
- [x] 阶段62：contextctl 增加 PYTHONUTF8=1，并在 memory_write_safe.py 显式 UTF-8 输出，复测通过。

## 2026-02-25 20:35:10（历史乱码 hash 精确归档化）
- [x] 阶段63：按 hash 精确打标 10da70... 与 5cb355...（只改 tags/metadata，不删除原文）。
- [x] 阶段64：执行 memory-govern 刷新本地视图，确保 digest/catalog 与远端状态同步。

## 2026-02-25 21:22:12（全局升级：精确归档自动化）
- [x] 阶段65：增强 memory_archive_unrecoverable.py，支持 reason 分类统计（question-noise/mojibake-content）。
- [x] 阶段66：增强 memory_tag_unrecoverable.py，按 reason 自动补充标签（question-noise/mojibake）。
- [x] 阶段67：新增 memory_tag_by_hash.py 与 contextctl memory-tag-hash（支持 -Hashes/-HashFile/-HashReason）。
- [x] 阶段68：monthly-maintain 接入 manual_archive_hashes.txt 队列化精确打标。
- [x] 阶段69：修复队列文件 BOM 兼容问题，月维护复验通过。

- [x] 阶段70：memory-selftest 复验通过（roundtrip 中文可读，db 指向 memories.db）。

## 2026-02-25 21:36:55（全局升级：自动推进策略固化 + 判因增强）
- [x] 阶段71：decision_policy.v1.json 升级到 1.1.0，新增 executionAutonomy（默认自动推进、仅高风险确认）。
- [x] 阶段72：SESSION_START_UNIFIED/general/tooling/vrplayer 模板加入“默认自动推进”执行口径。
- [x] 阶段73：contextctl session capsule 的 next_actions 增加自动推进条目，启动包可直接传达执行策略。
- [x] 阶段74：memory_archive_unrecoverable.py 强化 mojibake 判因（replacement char/Latin-1 指纹/中文乱码指纹）。
- [x] 阶段75：执行验证通过（pack、memory-archive、monthly-maintain、py_compile）。

## 2026-02-26 12:07:15（Batch48 深读与全局策略对齐）
- [x] 阶段76：读取 `D:\Projects\douyin_transcripts_20260226_batch48` 全量 48 集转写与 `summary.json/summary.txt`。
- [x] 阶段77：联读近期 memory 快照，核对当前系统基线（memory DB 路径、治理状态、历史决策）。
- [x] 阶段78：完成“差异方法优先”提炼（非共同点导向），形成方法簇与适用边界。
- [x] 阶段79：锁定阶段策略切换：从“省 token 优先”转为“高质量 + 高效率优先”；`codex-host` 进入“保留维护、暂缓迭代”状态。
- [x] 阶段80：输出下一阶段产品化建议清单（评估优先、条件式多 Agent、技能与工具分层、压缩与追溯并存）。

## 2026-02-26 14:47:54（全局升级：Phase A 评估底盘落地）
- [x] 阶段81：contextctl.ps1 新增 eval-run 动作（ValidateSet + 执行分支 + 指标落盘）。
- [x] 阶段82：新增 Invoke-EvalRunInternal，统一产出 Outcome/Trial/Transcript 结构化报告。
- [x] 阶段83：新增 governance/eval_policy.v1.json（评估门禁与报告规范）。
- [x] 阶段84：新增 evals/suites/foundation.v1.json（首轮基础套件 7 cases）。
- [x] 阶段85：新增 evals/README.md 并约定 latest + stamped 双轨报告。
- [x] 阶段86：执行 contextctl -Action eval-run 验收通过（7/7 pass）。

## 2026-02-26 14:57:17（全局升级：Phase B 评估产品化扩展）
- [x] 阶段87：contextctl.ps1 新增 eval-batch 动作（批量执行 suites 并聚合）。
- [x] 阶段88：contextctl.ps1 新增 eval-trend 动作（最近报告趋势摘要）。
- [x] 阶段89：新增 evals/suites/foundation-matrix.v1.json（四类任务路由 smoke）。
- [x] 阶段90：修复 eval-trend 首次报错（rows 对象类型导致 Measure-Object 失效），改为显式求和平均并补解析失败门禁。
- [x] 阶段91：执行 eval-batch + eval-trend 验收通过，生成 batch/trend latest+stamped 报告。

## 2026-02-26 15:02:15（全局升级：Phase C 可观测看板收口）
- [x] 阶段92：contextctl.ps1 新增 eval-dashboard 动作与聚合函数。
- [x] 阶段93：打通 batch-latest + trend-latest -> dashboard-latest.md 一页看板。
- [x] 阶段94：重跑 eval-batch/eval-trend/eval-dashboard 三联验证，全部通过。
- [x] 阶段95：更新 evals/README.md 与 context-hub README 的阶段说明。

## 2026-02-26 15:04:59（自动托管收口）
- [x] 阶段96：生成用户回归简报 C:\Users\Lenovo\.codex\context-hub\todo\USER_RETURN_BRIEF.md。
- [x] 阶段97：写入本轮结果总结记忆（phase-a/phase-b/handoff）。

## 2026-02-26 15:07:36（自动托管：评估执行脚本补齐）
- [x] 阶段98：新增 D:\Projects\杂物\上下文工程\04-评估看板.ps1（一键 batch/trend/dashboard）。
- [x] 阶段99：执行 04-评估看板.ps1 全链路通过（batch/trend/dashboard 均 PASS）。

## 2026-02-26 15:13:59（自动托管：脚本链路健壮性修复）
- [x] 阶段100：修复 01/02/03 脚本参数透传方式（字符串数组 -> 哈希表 splat）。
- [x] 阶段101：修复 01-开工.ps1 引号转义导致的语法错误并复验通过。
- [x] 阶段102：02-收工.ps1 增加默认评估链（可 -SkipEval）。
- [x] 阶段103：01-开工、02-收工、03-月维 全部命令验证通过。

## 2026-02-26 15:17:10（自动托管：月维护接入评估链）
- [x] 阶段104：monthly-maintain 接入 eval-batch/eval-trend/eval-dashboard 自动执行。
- [x] 阶段105：完成月维护实跑验证，输出中新增 eval_batch/eval_trend/eval_dashboard 三段结果。
- [x] 阶段106：更新 context-hub README 与流程指南，固化新月维行为。

## 2026-02-26 15:19:50（自动托管：回归交接刷新）
- [x] 阶段107：刷新 USER_RETURN_BRIEF.md，纳入脚本修复与月维护评估闭环状态。

## 2026-02-26 15:23:16（自动托管：离线执行日志）
- [x] 阶段108：生成 C:\Users\Lenovo\.codex\context-hub\todo\AUTO_EXECUTION_LOG.latest.md。


## 2026-02-26 15:27:53（自动托管：日志编码清洗）
- [x] 阶段109：清洗 task_plan/progress/findings 的控制字符并修正文案受损词条。

## 2026-02-26 15:41:47（自动托管：运维健康巡检闭环）
- [x] 阶段110：contextctl 新增 -Action ops-health（真源校验 + 服务健康 + memory-selftest + 评估报告新鲜度 + 控制字符检查）。
- [x] 阶段111：monthly-maintain 接入 ops-health，月维护产出新增 ops_health 字段。
- [x] 阶段112：新增 D:\Projects\杂物\上下文工程\05-健康巡检.ps1 一键巡检脚本。
- [x] 阶段113：更新 context-hub README 与流程指南，固化巡检 SOP。

## 2026-02-26 15:46:21（自动托管：阶段验收与记忆沉淀）
- [x] 阶段114：实跑 start-session/daily-close，确认 contextctl 全链路无回归。
- [x] 阶段115：关键节点写入 memory（ops-health 能力落地 + 故障闭环）。

## 2026-02-26 15:57:51（自动托管：错误台账可收敛化）
- [x] 阶段116：contextctl 新增 -Action resolve-error（支持按 ErrorCode 批量标记历史 pending/captured 为 resolved）。
- [x] 阶段117：Get-RecentErrorHints 升级为按 code 折叠读取，减少历史重复噪声。
- [x] 阶段118：实跑 resolve-error + start-session + ops-health 验证通过。

## 2026-02-26 16:00:46（自动托管：收工脚本再收口）
- [x] 阶段119：02-收工.ps1 默认接入 ops-health（可 -SkipOpsHealth 跳过）。
- [x] 阶段120：实跑 02-收工.ps1 -NoWeeklyReview -SkipEval 验证 daily-close + ops-health 双输出均 PASS。

## 2026-02-26 16:04:15（自动托管：最终复核）
- [x] 阶段121：ops-health 复跑验证通过（16:03:44）。
- [x] 阶段122：monthly-maintain 复跑验证通过，治理+评估+巡检全链路一致。

## 2026-02-26 16:05:56（自动托管：交接刷新）
- [x] 阶段123：刷新 USER_RETURN_BRIEF 与 AUTO_EXECUTION_LOG，覆盖最新巡检/收敛状态与待拍板项。

## 2026-02-26 16:08:09（自动托管：交接文件编码修复）
- [x] 阶段124：修复 USER_RETURN_BRIEF/AUTO_EXECUTION_LOG 中由 PowerShell 转义产生的 NUL 字符污染。
- [x] 阶段125：复核两文件控制字符计数为 0。

## 2026-02-26 16:11:06（自动托管：持久规则补充）
- [x] 阶段126：更新 README Agent Notes(Persistent)，固化 ops-health/resolve-error 与 PowerShell NUL 风险规避规则。

## 2026-02-26 16:13:09（自动托管：日志洁净收口）
- [x] 阶段127：发现并清理 findings.md 中遗留 NUL 控制字符，复核归零。

## 2026-02-26 16:18:53（自动托管：开工脚本再收口）
- [x] 阶段128：01-开工.ps1 默认接入 ops-health（可 -SkipOpsHealth）。
- [x] 阶段129：实跑 01-开工.ps1 -SkipStartStack 验证 daily-start + ops-health 双输出均 PASS。

## 2026-02-26 16:55:00（自动托管：日志可读性二次回正）
- [x] 阶段130：修复 progress.md 与 findings.md 中断词和标记错位（resolve-error、run-mainstream/run-once、robocopy、roundtrip_ok 等）。
- [x] 阶段131：修复旧记录中的 route_task、requestsTotal、raw.githubusercontent、runTeamWorkflow、research 流水线等受损词。
- [x] 阶段132：复跑控制字符与 ops-health，确认 control_char_count=0 且巡检 PASS。

## 2026-02-26 17:28:30（自动托管：治理文档防复发）
- [x] 阶段133：修复 context-hub 蓝图文档 `CONTEXT_ENGINE_MASTER_PLAN_v3.md` 的断行与受损词（05-健康巡检、resolve-error、02-收工）。
- [x] 阶段134：扩展 contextctl `ops-health` 控制字符巡检范围，纳入 governance 与 todo 核心文档。
- [x] 阶段135：执行 `ops-health` + `monthly-maintain` 复验，确认新增巡检范围后仍全链路 PASS。
- [x] 阶段136：完成 chrome-devtools 证据采样（snapshot + network + console），补齐“修复成立”证据闭环。

## 2026-02-26 17:40:30（自动托管：文本异常守卫接入）
- [x] 阶段137：将 `Get-TextAnomalyStats` 正式接入 `ops-health` 主判定链路（不再仅定义未使用）。
- [x] 阶段138：`ops-health` 输出新增 `text_anomaly_count` 字段，报告新增 `text_anomalies` 行。
- [x] 阶段139：`ops_health` 与 `monthly_maintain` 指标新增文本异常计数字段，纳入治理指标口径。
- [x] 阶段140：实跑 `ops-health` + `monthly-maintain` 验证通过（text_anomaly_count=0）。
## 2026-02-26 18:26:20（自动托管：文本异常规则文件化）
- [x] 阶段141：新增 `governance/text_anomaly_rules.v1.json`，将文本异常规则从脚本硬编码提升为治理配置。
- [x] 阶段142：`Get-TextAnomalyRules` 落地，支持“规则文件优先 + 默认规则回退”。
- [x] 阶段143：`ops-health` 巡检文件列表扩展到 control 关键文件与 anomaly 规则文件。
- [x] 阶段144：复跑 `ops-health` + `monthly-maintain`，确认规则文件化后全链路 PASS。
## 2026-02-26 18:31:20（自动托管：巡检报告可读性增强）
- [x] 阶段145：`ops_health.latest.md` 新增 `Text Anomaly Hits` 明细段（规则ID/文件/次数/修复提示）。
- [x] 阶段146：复跑 `ops-health` 验证通过，当前异常明细为空（none）。
## 2026-02-26 18:38:10（自动托管：weekly-review 计数修复）
- [x] 阶段147：定位 `weekly-review count=0` 根因：`memory_rollup_weekly.py` 未读取 `curated_items.jsonl` 的 `valid_from` 字段。
- [x] 阶段148：修复 `parse_ts`，新增 `valid_from/last_verified` 候选时间源。
- [x] 阶段149：复跑 `weekly-review`，结果从 `count=0` 恢复到 `count=3`（week-2026-W09.md）。
## 2026-02-26 19:05:10（自动托管：weekly 新鲜度门禁增强）
- [x] 阶段150：`memory_rollup_weekly.py` 增加固定输出 `data/views/weekly_review.latest.md`，便于统一巡检读取。
- [x] 阶段151：`ops-health` 新鲜度检测新增 `weekly_review_latest`（阈值 240h）。
- [x] 阶段152：`ops_health.latest.md` 增加 `Stale Reports` 明细段，异常时直接列出 name/path/age/threshold。
- [x] 阶段153：修复并复验 `weekly-review`（count=3）+ `ops-health`（PASS）+ `monthly-maintain`（PASS）。

## 2026-02-26 19:13:20（自动托管：月维回归与指标闭环复核）
- [x] 阶段154：复跑 `weekly-review -> monthly-maintain -> ops-health`，确认三链路同轮通过（weekly count=3）。
- [x] 阶段155：核对 `governance/metrics.jsonl`，确认 `monthly_maintain` 指标包含 `weekly_review_ok=true` 与 `weekly_review_count=3`。
- [x] 阶段156：固化新坑位：`monthly-maintain` 执行期间不得将实时输出文件写入 `context-hub` 根目录，避免备份阶段文件锁导致 `BACKUP_FAILED`。

## 2026-02-26 19:27:20（自动托管：告警治理补齐）
- [x] 阶段157：新增 `control/alert_policy.v1.json`（默认启用失败告警，冻结策略默认关闭，仅建议不阻断）。
- [x] 阶段158：`contextctl.ps1` 新增告警函数（`Get-AlertPolicy` / `Emit-Alert` / `Refresh-AlertsLatest` / `Get-ConsecutiveFailureCount`）。
- [x] 阶段159：`monthly-maintain` 接入告警输出（`alerts.emitted/latest/freeze_recommended`）并将 `alerts_emitted/freeze_recommended` 写入指标。
- [x] 阶段160：`ops-health` 失败场景接入自动告警落盘（`governance/alerts.jsonl` + `todo/ALERTS.latest.md`）。
- [x] 阶段161：复验通过：`ops-health` 与 `monthly-maintain` 均 `ok=true`，`alerts.emitted=0`（当前无告警）。

## 2026-02-26 19:35:40（自动托管：启动路由与错误台账收敛）
- [x] 阶段162：`routing_policy.v2.json` 升级至 `2.2.0`，默认读取链补入 `control/alert_policy.v1.json` 与 `todo/ALERTS.latest.md`（按 profile 场景分配）。
- [x] 阶段163：实跑 `start-session` 验证读取链可用（missing_required_count=0）。
- [x] 阶段164：执行 `resolve-error contextctl_unhandled`，将最新 pending 错误收敛为 resolved（updated_rows=1）。

## 2026-02-26 19:40:20（自动托管：告警治理终验）
- [x] 阶段165：全量终验 `monthly-maintain`，确认 `alerts.emitted=0` 且 `freeze_recommended=false`（健康场景）。
- [x] 阶段166：终验 `ops-health`，确认 `missing_required/stale/control/anomaly` 全 0。
- [x] 阶段167：关键结论写入 memory（告警治理落地 + 路由升级 + 错误台账收敛）。

## 2026-02-26 19:47:26（自动托管：告警看板脚本补齐）
- [x] 阶段168：新增 `D:\Projects\杂物\上下文工程\06-告警看板.ps1`，支持直接查看 `ALERTS.latest`，并可按需触发 `-RefreshByOpsHealth/-RefreshByMonthlyMaintain`。
- [x] 阶段169：修复脚本首版编码解析异常（改为纯 ASCII 脚本体），确保 PowerShell 在不同编码环境稳定执行。
- [x] 阶段170：更新 `上下文工程流程指南.txt`，补充 06 脚本用途与参数说明。

## 2026-02-26 19:50:20（自动托管：本轮终验与记忆收口）
- [x] 阶段171：终验 `ops-health`，结果全绿（missing/stale/control/anomaly 全 0）。
- [x] 阶段172：写入本轮总结记忆并 roundtrip 校验通过（hash=`db08408387c49def5a5e5d2b624dbb02da3d505dc56723e199fd1b9d98ff1039`）。

## 2026-02-26 19:56:20（自动托管：巡检报告覆盖面补齐）
- [x] 阶段173：`ops-health` 报告新鲜度检查新增 `memory_digest_latest` 与 `alerts_latest` 两项。
- [x] 阶段174：复验 `ops-health` 通过（stale_report_count=0），确认新增报告项未引入误报。

## 2026-02-26 20:16:20（自动托管：自动冻结从建议态升级为执行态）
- [x] 阶段175：`contextctl.ps1` 新增冻结状态管理能力（`Get/Save-FreezeState`）与动作前冻结门禁检查。
- [x] 阶段176：`monthly-maintain` 接入冻结状态更新（连续失败计数、恢复计数、激活/解除告警、状态落盘）。
- [x] 阶段177：`alert_policy.v1.json` 升级到 `1.1.0` 并启用 `freeze_policy.enabled=true`，默认拦截动作限定为 `quarterly-prune`。
- [x] 阶段178：完成冻结门禁实测（手动置 active=true 后 `quarterly-prune` 返回 `freeze_gate_blocked`）。
- [x] 阶段179：恢复冻结状态并复验 `ops-health` 全绿（missing/stale/control/anomaly=0）。

## 2026-02-26 20:38:20（自动托管：冻结执行态收口复核）
- [x] 阶段180：修复 control/alert_policy.v1.json 中文备注乱码，统一为正确简体中文。
- [x] 阶段181：重跑 monthly-maintain 全链路复核（ok=true，alerts.freeze_state.active=false，consecutive_failures=0）。
- [x] 阶段182：执行 resolve-error -ErrorCode contextctl_unhandled，收敛 20:14 阶段遗留 pending（updated_rows=1）。
- [x] 阶段183：同步更新 AUTO_EXECUTION_LOG.latest.md 与 USER_RETURN_BRIEF.md 最新状态口径。


## 2026-02-26 20:34:50（自动托管：日志回归修复）
- [x] 阶段184：定位到日志追加时反引号转义导致控制字符注入，ops-health 报告失败（control_chars=6, text_anomalies=3）。
- [x] 阶段185：清洗并回正 task_plan/progress/findings/master_plan/auto_log/user_brief 六文件控制字符与断词。
- [x] 阶段186：复跑 ops-health 通过（missing/stale/control/anomaly 全 0，generated_at=2026-02-26 20:34:41）。




## 2026-02-26 21:31:16（会话防压缩锚点：暂停自动推进，先答疑）
- [x] 阶段187：创建 C:\Users\Lenovo\.codex\context-hub\todo\NEXT_ACTIONS.latest.md，锁定未完成任务与恢复触发条件。
- [x] 阶段188：创建 C:\Users\Lenovo\.codex\context-hub\runtime_state\global\pending_execution_plan.json，固化机器可读执行队列。
- [x] 阶段189：按用户要求进入“仅答疑不自动推进实现”状态，待用户明确恢复指令后继续。



## 2026-02-27 10:31:55（未完成项目与计划继续完成）
- [x] 收口 P1-2：Evo Unit 质量评分器实测通过（evo-score=99.52/A/healthy）。
- [x] 收口 P1-3：跨外部聊天接入层实测通过（source=codex-session，桥接视图已生成）。
- [x] 修复 import-chat 来源默认值问题（manual 不再阻断自动识别）。
- [x] 同步执行锚点：pending_execution_plan.json 与 NEXT_ACTIONS.latest.md 已对齐为“P0/P1 清零”。


## 2026-02-27 10:34:58（收口闭环补充）
- [x] 关键记忆写入完成（2 条 accepted，hash 可追溯）。
- [x] 记忆库健康检查完成（database_path 指向 memories.db）。
- [x] 巡检复验通过（ops-health 全绿）。

## 2026-02-27 10:38:02（收口补丁）
- [x] 修复 memory_write_safe 去重统计误判（success=false 不再记 accepted）。
- [x] 去重场景复验通过（dedup_rejected 统计准确）。

## 2026-02-27 11:47:20（继续推进：P2 三项收口）
- [x] 阶段190：压缩 `external_chat` 的 unknown 角色占比（codex 顶层 `turn_context/compacted` 归类为 system）。
- [x] 阶段191：复跑 `import-chat` 验证通过（source=codex-session，kept_by_role 中 unknown=0）。
- [x] 阶段192：完成 `evo-score` 趋势产物链路并验证（`evo_score_trend.latest.{json,md}` 可用）。
- [x] 阶段193：完成 `ops-health` 对 `evo_score_trend.latest.json` 新鲜度门禁验证（全绿）。
- [x] 阶段194：完成 `pack/start-session` 可选注入桥接摘要验证（`unknown_role_ratio=0`）。

## 2026-02-27 11:56:20（继续推进：P3 首批收口）
- [x] 阶段195：`import-chat` 新增解析跳过统计（json_decode/non_object/blank_lines/total_skipped）并写入 bridge json/md。
- [x] 阶段196：`ops-health` 新增 external bridge 质量段（unknown_ratio/dropped_ratio/parse_skipped + source/produced_at）。
- [x] 阶段197：`pack/session_capsule` 新增 `evidence_refs` 模板字段，收敛 latest 报告路径。
- [x] 阶段198：复跑 `import-chat -> pack -> ops-health` 全链路通过（all green）。

## 2026-02-27 12:36:51（上下文工程 P4）
- [x] P4-1：import-chat 增加 source_schema_version/parser_version。
- [x] P4-2：ops-health 增加 bridge 质量软阈值告警并写入 alerts。
- [x] P4-3：evidence_refs 增加 freshness_hours/age_hours/stale。
- [x] 回归：import-chat -> pack -> evo-score -> ops-health 全通过。

## 2026-02-27 12:58:22（上下文工程 P5）
- [x] 阶段199：`contextctl.ps1` 新增 bridge 告警去抖窗口（`Emit-Alert -DedupWindowMinutes` + `Should-SuppressAlertDedup`）。
- [x] 阶段200：`alert_policy.v1.json` 升级到 `1.3.0`，新增 `bridge_quality_soft_thresholds.dedupe_window_minutes` 与 `verification_gate` 策略段。
- [x] 阶段201：`ops-health` 新增 `verification_gate` 结果与 stale 证据阻断逻辑（可配置）。
- [x] 阶段202：新增 `bridge-trend` Action 与趋势产物（`bridge_quality_trend.latest.{json,md}`）。
- [x] 阶段203：完成回归验证 `pack -> bridge-trend -> ops-health`，结果全绿（`verification_gate_allow_completion=true`，`stale_report_count=0`）。

## 2026-02-27 13:16:27（上下文工程 P6）
- [x] 阶段204：新增 `alert-weekly` Action，输出 `alerts_weekly.latest.{json,md}`。
- [x] 阶段205：新增 `evidence-view` Action，输出 `evidence_events_digest.latest.{json,md}`（24h/7d）。
- [x] 阶段206：`weekly-review` 自动附带 `alert_weekly` 与 `evidence_digest` 摘要并写指标。
- [x] 阶段207：`daily-close/session-close` 接入 `verification_gate` 前置校验并写入 close 指标。
- [x] 阶段208：`daily-close/session-close` 增补告警周摘要与证据摘要引用，支持收口后直接审计。
- [x] 阶段209：完成回归验证 `alert-weekly -> evidence-view -> weekly-review -> session-close -> ops-health`，结果全绿。

## 2026-02-27 13:36:09（上下文工程 P7）
- [x] 阶段210：`ops-health` 新鲜度检查补齐 `alerts_weekly.latest.json` 与 `evidence_events_digest.latest.json`。
- [x] 阶段211：`monthly-maintain` 自动联动 `alert-weekly` 与 `evidence-view`，并将摘要纳入输出。
- [x] 阶段212：`monthly_maintain` 指标新增告警/证据摘要口径（`alert_weekly_total`、`evidence_24h_pass_rate` 等）。
- [x] 阶段213：`session-close/daily-close` 在 gate 阻断场景新增 `recovery_steps` 恢复指引。
- [x] 阶段214：完成回归验证 `alert-weekly -> evidence-view -> session-close -> monthly-maintain -> ops-health`，结果全绿。

## 2026-02-27 14:35:24（上下文工程 P8）
- [x] 阶段215：新增 `verification-board` Action，生成 gate/alerts/evidence/bridge/evo 聚合总览（`vverification_board.latest.{json,md}`）。
- [x] 阶段216：新增 `verification-drill` Action，支持“模拟 stale 阻断”与 `-Replay` 回放。
- [x] 阶段217：`Write-Metric` 接入成功样本采样策略（`metrics_policy.v1.json` + `metrics_sampling_state.json`）。
- [x] 阶段218：新增 `control/metrics_policy.v1.json`，可配置高频成功指标采样间隔。
- [x] 阶段219：完成回归验证 `verification-board -> verification-drill -> verification-drill -Replay -> monthly-maintain -> ops-health`，结果全绿。

## 2026-02-27 14:40:56（上下文工程 P9）
- [x] 阶段220：`weekly-review` 自动挂载 `vverification_board` 指针与 `verification_drill` 结果。
- [x] 阶段221：`weekly-review` 指标新增 board/gate/drill 关键字段，收口后可直接检索。
- [x] 阶段222：新增 `metrics_raw.jsonl`，采样丢弃的成功指标改为写 raw 层（不丢原始信息）。
- [x] 阶段223：`Write-Metric` 采样状态持久化（`metrics_sampling_state.json`），可解释采样行为。
- [x] 阶段224：完成回归验证 `weekly-review -> verification-board -> ops-health x3`，并确认 sampled-out 指标进入 raw 层。

## 2026-02-27 15:10:43（上下文工程 P10）
- [x] 阶段225：新增 control/vverification_board_policy.v1.json，将 vverification_board 阈值判定外置为策略文件。
- [x] 阶段226：contextctl.ps1 新增 Resolve-VerificationBoardStatus，board 输出增加 policy/status_reasons。
- [x] 阶段227：verification-drill 新增 -DrillScenario（stale_evidence/network_error/parse_error）与场景化恢复步骤。
- [x] 阶段228：新增 metrics-raw-archive Action，支持 metrics_raw 月维归档与索引。
- [x] 阶段229：monthly-maintain 接入 metrics_raw_archive 自动执行，结果写入月维输出与指标。
- [x] 阶段230：完成回归验证 verification-board -> verification-drill(三场景) -> metrics-raw-archive -> weekly-review -> monthly-maintain -> ops-health，结果全绿。



## 2026-02-27 17:12:14（外部方案深度研究：stellarlinkco/codex）
- [x] 阶段231：拉取并复核目标仓库最新版本（HEAD=5c88423，tag=v1.2.1）。
- [x] 阶段232：完成核心能力取证（agent teams/hooks/codex serve/Anthropic 接入/许可证）。
- [x] 阶段233：完成与现有 codex-host + context-hub 的能力对比评估（含合规与迁移风险）。
- [x] 阶段234：输出三问结论与接入策略（替换/并行/二改）并进入执行决策。

## 2026-02-27 17:32:29（Codex增强版出现后的升级规划）
- [x] 阶段234：已完成增强版深度研究与对比结论输出准备（基于 `stellarlinkco/codex@v1.2.1` + 抖音方法集 + 当前 context-hub 现状）。
- [x] 阶段235（P11）：在现有体系内先完成低风险增强（vverification_board 分级、verification_drill 覆盖率、metrics_raw 季度视图）。
- [x] 阶段236（P12）：新增“执行内核适配层”草案（agent-teams/hooks/serve 三能力只做并行接入，不替换治理内核）。
- [x] 阶段237（P13）：完成“条件触发多 Agent”生产化策略（触发阈值、预算上限、失败回退单体）。
- [x] 阶段238（P14）：完成验收体系升级（执行效率 + 证据完备性 + 上下文接管质量三轴评分）。
- [x] 阶段239：按治理门禁逐步灰度上线并写入长期记忆（每阶段先验证后推进）。

## 2026-02-27 18:15:34（上下文工程 P11 收口）
- [x] 阶段240（P11-1）：verification_board 状态判定升级为三级（healthy/attention/degraded），并接入 attention_rule/degraded_rule/drill_coverage 策略。
- [x] 阶段241（P11-2）：新增 verification-drill-coverage Action，产出 verification_drill_coverage.latest.{json,md}。
- [x] 阶段242（P11-3）：新增 metrics-raw-quarterly-view Action，产出 metrics_raw_quarterly.latest.{json,md}。
- [x] 阶段243：monthly-maintain 自动联动刷新 drill coverage 与季度视图，消除 ops-health 视图缺口。
- [x] 阶段244：完成回归验证 verification-drill-coverage -> metrics-raw-quarterly-view -> verification-board -> monthly-maintain -> ops-health，结果全绿。
- [x] 阶段245（P12）：Codex增强版执行内核适配层（teams/hooks/serve）设计与接入实现。


## 2026-02-27 19:03:35（上下文工程 P12/P13 收口）
- [x] 阶段246（P12-1）：执行内核适配层完成并实跑验证（kernel-adapter-probe）。
- [x] 阶段247（P12-2）：条件触发多Agent策略完成并实跑验证（agent-team-strategy，预算状态可追踪）。
- [x] 阶段248（P13-1）：三轴验收体系完成并实跑验证（acceptance-triad，status=healthy，grade=A）。
- [x] 阶段249：整链 monthly-maintain 复跑成功，ops-health 维持全绿。
- [x] 阶段250（P14）：灰度接入与周维稳定性校准（下一阶段）。

## 2026-02-27 19:25:44（上下文工程 P14-1/P14-2）
- [x] 阶段251（P14-1）：agent-team 灰度策略落地（rollout 门禁：任务类型、内核白名单、关键告警阈值、复杂度上限、流量采样）。
- [x] 阶段252（P14-2）：新增 agent-team-weekly 周维稳定性视图，并接入 monthly-maintain 与 ops-health。
- [x] 阶段253：整链回归通过（monthly-maintain + ops-health），无新回归。
- [x] 阶段254（P14-3）：三轴阈值校准与长期趋势基线（待执行）。

## 2026-02-27 19:45:30（上下文工程 P14-3 收口 + P15 启动）
- [x] 阶段254（P14-3）：三轴阈值校准与长期趋势基线（`acceptance-triad-baseline`）已落地。
- [x] 阶段255：全链复验通过（`acceptance-triad-baseline -> ops-health -> monthly-maintain`）。
- [x] 阶段256：执行锚点同步完成（`pending_execution_plan.json` + `NEXT_ACTIONS.latest.md`）。
- [x] 阶段257（P15-1）：Codex增强版能力对标报告产品化（分层结论与可执行接入路线）。
- [x] 阶段258（P15-2）：新窗口上下文注入验收自动化（三场景评分与回归基线）。
- [x] 阶段259（P15-3）：Agent Teams shadow-mode 验收与回退开关固化。

## 2026-02-27 20:24:20（上下文工程 P15 收口 + P16 启动）
- [x] 阶段260（P15-1）：`codex-enhanced-report` 已跑通，生成 `codex_enhanced_compare.latest.{json,md}`。
- [x] 阶段261（P15-2）：`context-injection-acceptance` 已跑通，三场景综合 `99.83/A`。
- [x] 阶段262（P15-3）：shadow-mode 开关验收完成（disable -> strategy -> enable -> strategy），回退链路可用。
- [x] 阶段263：`ops-health` 回归通过（missing/stale/control_char/text_anomaly=0）。
- [x] 阶段264（P16-1）：上下文注入验收周维趋势化（weekly trend + threshold alert）。
- [x] 阶段265（P16-2）：AutoGate 分层执行策略（low/medium/high 风险分流）。
- [x] 阶段266（P16-3）：多Agent触发质量看板（命中率/误触发率/回退成功率）。
## 2026-02-27 21:14:33（上下文工程 P16 收口 + P17 启动）
- [x] 阶段267（P16-1）：`context-injection-weekly` 已落地并接入 `ops-health + monthly-maintain`。
- [x] 阶段268（P16-2）：`autogate-layering` 已落地并接入 `ops-health` 摘要与月维指标。
- [x] 阶段269（P16-3）：`agent-trigger-quality` 已落地并接入 `ops-health` 摘要与月维指标。
- [x] 阶段270：补齐 `ops-health` 对 P16 三视图的解析与 Markdown 摘要输出。
- [x] 阶段271：回归验证通过（`ops-health -> monthly-maintain` 全链 PASS）。
- [x] 阶段272（P17-1）：AutoGate 执行态联动（`session-close` 与 `daily-close` 双链路对齐）。
- [x] 阶段273（P17-2）：上下文注入周报挂载到 `weekly-review` 与 `verification-board` 摘要。
- [x] 阶段274（P17-3）：多Agent 触发质量阈值告警计数接入 `ops-health` 与 `monthly-maintain` 指标。

## 2026-02-27 22:17:40（上下文工程 P17 收口）
- [x] 阶段272（P17-1）：`session-close` 已接入 AutoGate 执行态（high 阻断、medium 补采证据、状态与恢复指引全链落盘）。
- [x] 阶段273（P17-2）：`verification-board` 新增 `context_injection_weekly/autogate_layering/agent_trigger_quality` 输入与摘要，`weekly-review` 同步挂载并写指标。
- [x] 阶段274（P17-3）：`agent_trigger_quality_alerts_count` 已接入 `ops-health` 与 `monthly-maintain` 指标字段。
- [x] 回归通过：`verification-board`、`weekly-review`、`session-close`、`daily-close`、`ops-health`。
- [x] 环境阻塞已处置：`monthly-maintain` 首次因 C 盘空间不足失败（`BACKUP_FAILED`）；已将 `context-hub\\migrations` 大备份无损迁移到 `D:\\Projects\\杂物\\上下文工程\\context-hub-backups\\20260227-migrated-from-c`，恢复可写空间。
- [x] 本轮收口线达成：P17 完成后自动停止，不再自动新增 P18+。

## 2026-02-27 23:15:30（上下文工程 P18 收口）
- [x] 阶段275（P18-1）：新增 contextctl -Action v1-readiness，形成“是否可进入 V1 实战”的可计算门禁。
- [x] 阶段276（P18-2）：新增 control/v1_readiness_policy.v1.json，阈值策略文件化（ops/gate/triad/注入/触发质量）。
- [x] 阶段277（P18-3）：verification-board 摘要挂载 1_readiness_status/score/failed_checks，并接入 monthly-maintain 指标链路。
- [x] 阶段278：回归验证通过（v1-readiness=ready_for_v1(score=100)、ops-health=PASS、monthly-maintain=PASS）。


## 2026-02-27 23:42:58（上下文工程 P19 收口）
- [x] 阶段279（P19-1）：v1-trial-board 已落地并输出 v1_trial.latest.{json,md}。
- [x] 阶段280（P19-2）：start-session / daily-start 已输出 v1_readiness_quick 快速摘要。
- [x] 阶段281（P19-3）：execution-eta 已落地并输出 execution_eta.latest.{json,md}。
- [x] 阶段282：执行锚点回写完成（pending_execution_plan.json 与 NEXT_ACTIONS.latest.md 同步为 P19 done）。
- [x] 阶段283：链路复验通过（v1-readiness、verification-board、ops-health、monthly-maintain）。


## 2026-02-28 00:34:21（上下文工程 P20 试运行前收口）
- [x] 阶段284（P20-1）：trial-preflight 接入 ops-health（新鲜度检查 + 解析摘要 + 返回字段）。
- [x] 阶段285（P20-2）：monthly-maintain 接入 trial-preflight（输出对象、告警、指标字段）。
- [x] 阶段286（P20-3）：补齐 control/trial_preflight_policy.v1.json 并完成 trial-preflight/start-session/daily-start/ops-health/monthly-maintain 全链复验。




## 2026-03-02 13:58:03（OpenClaw 新批次方法研究）
- [x] 阶段0：读取 D:\Projects\douyin_transcripts_20260302_openclaw24 与 *_deep 批次，完成输入质量分层。
- [x] 阶段1：提炼高价值方法（预算化、事件化、模板化、容灾化、反馈闭环）。
- [x] 阶段2：与我方现状（context-hub + codex-host + AIClient2API）完成差距映射。
- [x] 阶段3：产出 4 份建议文档到 D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions。
- [ ] 阶段4（下一执行窗）：按蓝图执行 P21-P23（Hooks 事件总线、注入预算、协作模板库）。

## 2026-03-02 21:07:25（治理任务复验补充）
- [x] context 注入验收复测从 B 恢复到 A（overall_score=100）。

## 2026-03-04 14:15:38（OpenClaw 接入第一阶段）
- [x] 阶段1：将 stellarlink_codex 接入 execution kernel adapter（候选并行，不切主链）。
- [x] 阶段2：将 agent_team rollout.allowed_kernels 纳入 stellarlink_codex。
- [x] 阶段3：修复内核优先级排序实现缺陷，确保默认仍选 codex_host_local。
- [x] 阶段4：产出接入与回退文档（openclaw_integration/openclaw_shadow_compare/OPENCLAW_ROLLBACK）。
- [x] 阶段5：回归验证（kernel-adapter-probe、agent-team-strategy、trial-preflight、ops-health）。

## 2026-03-04 17:49:52（OpenClaw 控制链路修复）
- [x] 阶段1：定位 contextctl -> openclaw-start 报错根因（array splatting 导致命名参数失效，-BinaryPath 错位注入 Port）。
- [x] 阶段2：修复 C:\Users\Lenovo\.codex\context-hub\scripts\contextctl.ps1 的 Invoke-OpenClawActionInternal，改为 hashtable 命名参数 splatting。
- [x] 阶段3：串行回归通过（openclaw-start/status/restart/stop/status 全链路成功）。
- [x] 阶段4：确认流量守卫生效（阈值 10GB，未超限时允许启动）。

## 2026-03-04 18:36:57（OpenClaw 无预算阻断推进）
- [x] 阶段1：将 contextctl.ps1 中 openclaw-start/openclaw-restart 的流量守卫从“超限阻断”改为“仅观测不阻断”。
- [x] 阶段2：增强启动脚本 openclaw-start.ps1 的 token 生成与参数传递，修复 token 前缀触发参数误判导致的启动失败。
- [x] 阶段3：完成串行回归（start/status/restart/status/stop/status），并确认 traffic_guard_mode=observe_only 生效。


## 2026-03-04 19:29:40（Telegram 远程执行推进）
- [x] 阶段1：修复 daemon 停止脚本 PID 变量冲突（	elegram-remote-stop.ps1）。
- [x] 阶段2：修复 daemon 启动脚本缺失 worker 报错文案乱码（	elegram-remote-start.ps1）。
- [x] 阶段3：回归 	elegram-remote-start -> daemon-status -> stop -> daemon-status 全链通过。
- [x] 阶段4：完成 /exec 直调 OpenClaw 自检（return_code=0，输出 	elegram_exec_selftest_ok）。
- [ ] 阶段5：注入 Telegram 运行凭据并做真实消息联调（等待系统环境变量：TELEGRAM_BOT_TOKEN、TELEGRAM_ALLOWED_CHAT_IDS）。

## 2026-03-04 19:44:09（Telegram 可见层收口）
- [x] 阶段6：修复 	elegram_remote_worker.py 的用户可见回执乱码（命令帮助、执行成功/失败、latest 报告）。
- [x] 阶段7：完成 /help 与 /exec 二次回归，确认文本正常且执行行为不回退。

## 2026-03-04 20:21:32（Telegram 远程执行可用性收口）
- [x] 阶段1：补齐 contextctl.ps1 的 	elegram-remote-auth-set/status/clear 动作分支，并接入 	elegram_remote_auth 指标。
- [x] 阶段2：修复 	elegram-remote-auth-status.ps1 的 Windows PowerShell 兼容性问题（移除 ?? 运算符）。
- [x] 阶段3：修复 	elegram-remote-auth-set.ps1 语法损坏与中文提示，恢复可执行状态。
- [x] 阶段4：增强 	elegram_remote_worker.py 的 auth-file 解析（支持单值/字符串/数组 chat_id）。
- [x] 阶段5：完成凭据回路自测（set -> status -> worker status -> clear）并恢复 daemon 常驻。
- [ ] 阶段6：注入真实 Telegram 凭据并完成真实消息联调（等待外部凭据）。

## 2026-03-04 20:44:51（并发写入稳定性与质量门禁复验）
- [x] 阶段7：修复 contextctl.ps1 并发写 metrics.jsonl 偶发失败（Append-JsonLine 增加重试退避）。
- [x] 阶段8：清理 progress.md/findings.md 控制字符污染并复验 ops-health=ok。
- [ ] 阶段9：注入真实 Telegram 凭据并完成实网联调（/ping、/help、/exec）。

## 2026-03-05 07:13:02（Telegram 远程执行守护层）
- [x] 阶段1：新增 guardian start/status/stop/loop，离线自恢复 OpenClaw + Telegram daemon。
- [x] 阶段2：contextctl 接入 guardian 动作与指标（telegram_remote_guardian）。
- [x] 阶段3：新增快速上手文档 OPENCLAW_TELEGRAM_REMOTE_QUICKSTART.latest.md。
- [ ] 阶段4：注入真实 Telegram 凭据并完成实网联调（/ping、/help、/exec）。

## 2026-03-07 21:14:08（OpenClaw 官方主链时延专项诊断）
- [ ] 阶段1：补齐本轮计划与基线，锁定“官方 Telegram 主链慢响应”作为专项问题。
- [ ] 阶段2：采样当前官方 `openclaw.json`、gateway 日志、Telegram 通道状态，建立证据基线。
- [ ] 阶段3：对同一轻问答/轻执行样本进行小型基准对比（`gemini-3.1-pro-preview`、可用 flash、`gpt-5.3-codex`）。
- [ ] 阶段4：判断慢点来自模型等级、会话/compaction、还是 Telegram/gateway 主链开销，并做最小必要调优。
- [ ] 阶段5：完成验证、归档证据、写入长期记忆，并给出下一步主线建议。

## 2026-03-07 21:41:33（OpenClaw 官方主链时延专项诊断进展）
- [x] 阶段1：已锁定“官方 Telegram / 官方 agent 主链慢响应”作为专项问题。
- [x] 阶段2：已建立首轮证据基线：openclaw agent 默认轮次约 347.8s，而显式 --thinking off 同任务约 14.6s。
- [x] 阶段3：已确认 openclaw.json 中所有候选模型都为 easoning=false，说明“推理强度过深”不是唯一主因。
- [x] 阶段4：已从 D:\AIClient-2-API\logs\app-2026-03-07.log 发现 gemini-3.1-pro-preview 请求连续触发 429 与 2s/4s/8s/16s/32s 指数退避，是当前慢响应的强证据。
- [ ] 阶段5：切换官方主模型到 gemini-3-flash-preview 做同路径对照，判断主路是否应从 pro 改为 flash。
- [ ] 阶段6：完成重启、复验、证据归档与长期记忆写入。

## 2026-03-07 22:00:00（OpenClaw flash 主路切换与时延复验）
- 已完成：官方 OpenClaw 主模型切到 gemini-3-flash-preview。
- 已完成：保留回退链 gemini-3.1-pro-preview -> gemini-3-pro-preview -> gemini-2.5-pro-preview-06-05 -> gemini-2.5-pro -> gpt-5.3-codex。
- 已完成：官方 agent 两组基准采样（显式 --thinking off 与默认调用）。
- 下一步：做 Telegram 官方主链自然语言验收，确认真实聊天时延与回答质量。
## 2026-03-07 23:56:16（OpenClaw 异步协作与安全边界收口）
- [x] 读取 D:\Projects 下最新 OpenClaw / 博主转写批次与 WSL 注意点，形成输入索引。
- [x] 将异步协作和远程安全规则落到官方 OpenClaw workspace（QUICK_NOTE / ASYNC_COMMUNICATION / REMOTE_SECURITY）。
- [x] 复核官方 OpenClaw 与 Telegram 主链健康状态，保存原始证据和摘要视图。
- [ ] 下一执行窗：做 Telegram 官方主链真实自然语言验收，重点看普通聊天、连续追问与轻分析体验。

## 2026-03-08 10:13:40（OpenClaw Telegram 输出策略与全权限复验）
- [x] 阶段1：将官方 Telegram 旧字段 streaming 修正为官方当前字段 streamMode。
- [x] 阶段2：启用 block streaming（agents.defaults + channels.telegram）以提升 Telegram 首字返回与分段输出。
- [x] 阶段3：保持主模型为 gemini-3-flash-preview，不再把 thinking 太深作为当前主嫌。
- [x] 阶段4：重启官方 OpenClaw 并完成本地 agent 快速复验。
- [ ] 阶段5：进入 Telegram 官方主链真实自然语言验收，观察普通问答与连续追问体感。

## 2026-03-08 19:10:16（监督简报与 Memory 用例对齐）
- [x] 阶段1：完成 `D:\Projects\prompt.txt` 执行原则接管，锁定“优先体验与成功率，不为省 token 做激进瘦身”。
- [x] 阶段2：完成 `awesome-openclaw-usecases-moltbook` 的 8 个 Memory Management 用例与现有 OpenClaw/context-hub 栈映射。
- [x] 阶段3：新增 `D:\Projects\vrplayer\supervisor_brief.md`，把已回答问题、当前产品判断与下一步执行线固化到文件。
- [x] 阶段4：基于现有 `ledger/digest/views` 设计并落地轻量 `Morning Digest + Night Work ROI` 监督视图，不引入新主系统。
- [x] 阶段5：已查证 `telegram-fast` 的会话快照刷新路径，并确认官方 `sessions.reset` 可无损归档旧 transcript、清掉陈旧 `systemPromptReport`，不误伤 `main` agent。
- [x] 阶段6：为 `Night Work ROI` 补齐 `accepted/reverted/rolled_back` 最小采纳信号，并验证 `supervisor-digest` / `night_work_roi` 已按结构化字段出数。
- [ ] 阶段7：等待第一条 post-reset 的真实 Telegram 消息，抓取新的时延与 token 证据，确认主会话是否已按 fresh session 口径恢复。

## 2026-03-08 22:27:13（官方 Telegram 主链无响应收口）
- [x] 阶段1：确认“无响应”不是 Telegram 通道中断，而是官方主链内部执行问题叠加：附件被 `read` 读入、Gemini 429、PowerShell 检索面不稳。
- [x] 阶段2：在 `workspace-telegram-fast` 固化新规则：代码类任务忽略附件标记、同条消息含明确任务文本时直接执行、不要求用户重复描述。
- [x] 阶段3：将复杂任务协议进一步收紧为“先发 `task_ref` 启动回执，再进入工具执行”，避免用户面感知成静默。
- [x] 阶段4：将 Telegram fast 主模型切到 `gemini-3.1-pro-preview`，并保留 `gemini-3-flash-preview` 作为第一回退。
- [x] 阶段5：通过官方 `sessions.reset` + `sessions.patch` 刷新 Telegram 直连会话，避免下一条真实消息继续沿用旧会话坏状态。
- [x] 阶段6：本地 smoke 已验证：带附件的复杂任务不再先读图，首条可见回复已变成“收到 + task_ref + 已开始执行”。
- [ ] 阶段7：等待下一条真实 Telegram 重试消息，验收真实直连也进入“先回执、后执行”的新口径，并继续收口 OCP-6 / OCP-9。

## 2026-03-08 23:05:00（月度自治循环启动）
- [x] 阶段1：接管“一个月离开也不停”的自治偏好，默认不等待用户确认；只有红灯风险才暂停。
- [x] 阶段2：完成第一轮外部网页巡检，确认官方 OpenClaw 现成能力已覆盖 `queue / hooks / session scoping / reply tags` 四条自治增强主线。
- [x] 阶段3：完成第一轮本地素材库巡检，重新验证 `D:\Projects\douyin_transcripts_20260302_openclaw24\suggestions` 中的 `P21~P25` 仍然是高价值 backlog。
- [x] 阶段4：新增 `D:\Projects\vrplayer\autonomy_loop_plan.md`，把自治目标、循环规则、当前研究主题和 backlog 固化到文件。
- [ ] 阶段5：持续循环研究与沉淀，围绕 `queue/hooks`、`context budget`、`agent team modes`、`model fallback`、`rule writeback` 持续找增量。

## 2026-03-08 23:18:20（queue / reply / hooks 半轮推进）
- [x] 阶段1：从本地官方文档钉实 `concepts/queue.md`、`automation/hooks.md`、`channels/telegram.md` 的真实配置面与默认值。
- [x] 阶段2：对照活配置确认当前差距：`messages.queue=null`、`channels.telegram.replyToMode=null`、hooks 只有 `command-logger` 与 `session-memory` ready。
- [x] 阶段3：完成第一项低风险官方增强：显式写入 `messages.queue={ mode=collect, debounceMs=1000, cap=20, drop=summarize, byChannel.telegram=collect }`。
- [x] 阶段4：完成第二项低风险官方增强：显式写入 `channels.telegram.replyToMode=first`，对齐“先回执、后执行”的主链体验。
- [x] 阶段5：重启官方 Gateway 并复核健康：虽再次出现 `gateway restart timeout` 假阴性，但 `gateway health=OK`、Telegram probe 仍 `ok=true`。
- [x] 阶段6：在项目内落地两套非生产侵入的 hooks 草案：`telegram-preprocess-audit` 与 `telegram-task-closeout`。
- [ ] 阶段7：等待新真实 Telegram 流量验证 queue/reply threading 的体感收益；同时评估何时把草案迁入 `workspace/hooks/`。

## 2026-03-09 00:20:00（Memory Management 低风险吸收）
- [x] 阶段1：完成 `awesome-openclaw-usecases-moltbook` 8 个 Memory 用例、`self-improving-agent` 转写线索与本地 `openclaw24/image7` 灵感库的并排研究。
- [x] 阶段2：做出产品取舍：当前只吸收 `Three-Tier Memory / Heartbeat State Monitor / Safe Operations Ledger`，不把 `Daily Self-Improvement Cron / Knowledge Graph Rebuilder` 拉进主链。
- [x] 阶段3：在 `context-hub` 落地 `heartbeat_state.py` 与 `safe_ops_ledger.py`，并接入 `contextctl.ps1 -Action heartbeat-state / safe-ops-ledger`。
- [x] 阶段4：在 OpenClaw 官方工作区与 `telegram-fast` 工作区落地 `SAFE_OPERATIONS.md`，并把三层记忆入口写回 `AGENTS.md / MEMORY.md`。
- [x] 阶段5：新增 `owner_actions.md`，把当前确实需要老板亲自触发的外部事件单独固化。
- [ ] 阶段6：等待新真实 Telegram 流量继续收口 `OCP-6 / OCP-9`，同时评估 hooks 草案何时迁入 `workspace/hooks/`。

## 2026-03-09 11:18:46（OpenClaw Telegram 主链慢响应深挖）
- [x] 阶段1：确认当前慢点不只是一句“你是什么模型”，而是官方 Telegram 主链的普遍轻问答/轻分析时延波动。
- [x] 阶段2：确认当前 	elegram-fast 仍以 gemini-3.1-pro-preview 为主模型，且 dmHistoryLimit=12，是当前两大优先嫌疑。
- [x] 阶段3：确认 Karing 仅启用系统代理、未开 TUN；因此必须把“进程是否显式走代理”纳入时延诊断前提，但当前先不改代理策略。
- [ ] 阶段4：将官方 Telegram agent 主模型降到 gemini-3-flash-preview，并收窄直连历史窗口；保留 pro/codex 回退。
- [ ] 阶段5：重启官方服务、刷新 Telegram 绑定会话，并复验模型命中、时延与回答质量。
- [ ] 阶段6：归档证据并写入长期记忆，给出下一步是否继续深调 compaction / session 负担的判断。
- [x] Round 11：按 RAG 包 cross-theme 路由继续深读 `openclaw24/topic15` 的 primary transcript，不再只停在主题级结论。
- [x] Round 12：继续逐条深读 `openclaw24` 与 `topic15` 中剩余高价值 cross-theme primary，并开始做冲突观点整合。
- [ ] Round 13：继续逐条深读剩余高价值 primary，重点整理“记忆 vs 进化”、“本地执行 vs 云隔离”、“临时护栏 vs 长期结构”三类冲突。
- [x] Round 13：继续逐条深读剩余高价值 primary，重点整理“记忆 vs 进化”、“本地执行 vs 云隔离”、“临时护栏 vs 长期结构”三类冲突。
- [ ] Round 14：继续逐条深读剩余 primary，并开始把冲突观点压缩成适用于当前 OpenClaw 主线的明确取舍表。
- [x] Round 14：继续逐条深读剩余 primary，并开始把冲突观点压缩成适用于当前 OpenClaw 主线的明确取舍表。
- [ ] Round 15：继续少量精读剩余高价值 primary，重点补齐 `trace 改进闭环` 与 `自动债务清理` 两条系统化证据。
- [x] Round 15：继续少量精读剩余高价值 primary，重点补齐 `trace 改进闭环` 与 `自动债务清理` 两条系统化证据。
- [ ] Round 16：继续少量精读剩余高价值 primary，重点把“地图式 Agents.md / 仓库知识真相源 / harness 是 OS 层”三条判断继续钉实。
- [x] Round 16：继续少量精读剩余高价值 primary，重点把“地图式 Agents.md / 仓库知识真相源 / harness 是 OS 层”三条判断继续钉实。
- [ ] Round 17：继续少量精读剩余高价值 primary，重点把“工程师角色迁移 / 规则代码化 / 只强制不变量”三条判断继续钉实。
- [x] Round 17：继续少量精读剩余高价值 primary，重点把“工程师角色迁移 / 规则代码化 / 只强制不变量”三条判断继续钉实。
- [ ] Round 18：继续少量精读剩余高价值 primary，重点把“渐进式披露 / 状态可读性 / 自主验证前提”三条判断继续钉实。
- [x] Round 18：继续少量精读剩余高价值 primary，重点把“渐进式披露 / 状态可读性 / 自主验证前提”三条判断继续钉实。
- [ ] Round 19：继续自治少量精读 `openclaw24` 剩余短 primary，重点补 `浏览器高权限控制边界 / 视觉探索后脚本化 / skill 发现机制`。
- [ ] Round 20：开始把已读 primary 压缩成适用于当前 OpenClaw 主线的“明确取舍表”和“先做什么、后做什么”的产品排序。
- [x] Round 19：继续自治少量精读 `openclaw24` 剩余短 primary，重点补 `浏览器高权限控制边界 / 视觉探索后脚本化 / skill 发现机制`。
- [ ] Round 20：开始把已读 primary 压缩成适用于当前 OpenClaw 主线的“明确取舍表”和“先做什么、后做什么”的产品排序。
- [ ] Round 21：在不新开噪音文档的前提下，把已读 primary 继续压缩成 5-8 条当前 OpenClaw 可执行产品法则。
- [x] Round 22：继续补读 `20260225` 长 primary，重点补齐 `静态/动态上下文`、`WSCI/上下文债务`、`工具选择`、`todo 复述`、`错误保留`、`启动序列` 这几条系统层证据。
- [ ] Round 23：继续少量精读 `20260225` 剩余 primary，优先找“长期任务高级架构 / 写入记忆实践 / 冲突观点整合”三类还没完全压实的主证据。
- [ ] Round 24：开始把 `20260225 + topic15 + openclaw24` 已读 primary 压成当前 OpenClaw 主线的明确取舍表，只保留“先做什么、后做什么、不做什么”。
- [x] Round 23：继续少量精读 `20260225` 剩余 primary，补齐 `微调 vs 上下文工程`、`写入记忆两层结构`、`选择机制`、`KV 缓存取舍` 这些主证据。
- [ ] Round 24：开始把 `20260225 + topic15 + openclaw24` 已读 primary 压成当前 OpenClaw 主线的明确取舍表，只保留“先做什么、后做什么、不做什么”。
- [ ] Round 25：在不新增噪音文档的前提下，把“取舍表”继续压成 5-8 条当前 OpenClaw 可执行产品法则，并显式处理互相冲突的灵感来源。
- [x] Round 24：继续补读 `20260225 + aibaihua6 + image7` 高价值 primary，补齐 `压缩类型区分 / 隔离形态 / skill 化上下文工程 / 分层上下文加载 / 任务型外挂` 这些还没压实的系统层证据。
- [ ] Round 25：开始把 `20260225 + topic15 + openclaw24 + aibaihua6` 已读 primary 压成当前 OpenClaw 主线的明确取舍表，只保留“先做什么、后做什么、不做什么”。
- [ ] Round 26：在不新增噪音文档的前提下，把“取舍表”继续压成 5-8 条当前 OpenClaw 可执行产品法则，并显式处理互相冲突的灵感来源。
- [x] Round 25：继续补读 `20260226_batch48` 中与 `Lead Agent / 外部计划保存 / Citing Agent / 多 agent 最小协调` 直接相关的 high-signal primary，补齐这组还没压实的系统层证据。
- [ ] Round 26：开始把 `20260225 + topic15 + openclaw24 + aibaihua6 + batch48` 已读 primary 压成当前 OpenClaw 主线的明确取舍表，只保留“先做什么、后做什么、不做什么”。
- [ ] Round 27：在不新增噪音文档的前提下，把“取舍表”继续压成 5-8 条当前 OpenClaw 可执行产品法则，并显式处理互相冲突的灵感来源。
- [x] Round 26：继续补读 `20260226_batch48` 中与 `强耦合单线程 / 机器友好反馈 / skill-vs-tool / 生产级断点续传与彩虹部署` 直接相关的 high-signal primary，补齐这组还没压实的系统层证据。
- [x] Round 27：继续补读 `20260226_batch48` 中与 `Harness Engineering / legibility / verify-work / tools-vs-bash-vs-codegen-vs-MCP / agentic-search` 直接相关的 high-signal primary，补齐这组还没压实的系统层证据。
- [x] Round 28：开始把 `20260225 + topic15 + openclaw24 + aibaihua6 + batch48` 已读 primary 压成当前 OpenClaw 主线的明确取舍表，只保留“先做什么、后做什么、不做什么”。
- [ ] Round 29：在不新增噪音文档的前提下，把“取舍表”继续压成 5-8 条当前 OpenClaw 可执行产品法则，并显式处理互相冲突的灵感来源。
- [x] Round 30：继续顺着 `20260226_batch48` 逐条补读剩余未吃透 primary，并同步校正“哪些观点只保留观察、不进入当前主线”。
- [x] Round 31：继续补读 `20260226_batch48` 剩余 primary，重点校正 `routing / chaining / sectioning / context-centered split` 与当前主线的最终适用边界。
- [ ] Round 32：把当前“明确取舍表 v1”继续压成 5-8 条当前 OpenClaw 可执行产品法则，并显式标出哪些并行模式只属于升级链路。
- [x] Round 33：继续补读 `20260226_batch48` 剩余 primary，重点找“评估纵深防御 / 小样本起步 / 评分器调试 / 先单体后多体”还有没有会改变主线排序的新证据。
- [ ] Round 34：继续补读 `20260226_batch48` 尾部与 Menace 技术稿，重点压实 `breadth-first 多 agent 边界 / 失败驱动的 skill 成长 / schema 摘要 / 分层行动空间` 这四条系统层证据。
- [ ] Round 35：开始把 `明确取舍表 v1` 正式压成 `5-8` 条当前 OpenClaw 可执行产品法则，并把 `哪些只属于升级链路` 单独标出。
- [x] Round 34：继续补读 `20260226_batch48` 尾部与 Menace 技术稿，重点压实 `breadth-first 多 agent 边界 / 失败驱动的 skill 成长 / schema 摘要 / 分层行动空间` 这四条系统层证据。
- [x] Round 35：继续补读 `20260226_batch48` 前半与剩余 high-signal primary，补齐 `规则代码化 / 吞吐量驱动门控 / workflow 选型框架 / 验证型子代理 / grader 金字塔` 这些主证据。
- [x] Round 36：把当前“明确取舍表 v1”正式压成 `5-8` 条当前 OpenClaw 可执行产品法则，并单独标出哪些并行模式只属于升级链路。
- [ ] Round 37：开始对全部已读 primary 做第一次冲突整理，只保留“进入当前主线”“只保留观察”“暂不采纳”三层结论。
- [ ] Round 38：基于 8 条产品法则，开始反查当前 OpenClaw 现状，列出“已符合 / 未符合 / 下一刀最值得落地”的差距清单。

## 2026-03-11 22:22:57（继续补读 20260226_batch48 尾部 primary）
- [x] 已补读 `30 / 31 / 33 / 36 / 37 / 38 / 39 / 41`，补齐 `类型化评分器 / capability-vs-regression / Trial-Transcript-Outcome / 多 agent 过程评估 / Citation Agent / Research Sub-agent / 多 agent prompt engineering` 这组主证据。
- [x] 已确认 `38_rsj321VCV4I.txt` 与 `37_gjWGuRVws9A.txt` 为同主题重复稿，只保留共识结论，不重复抬高权重。
- [ ] 下一轮：开始对全部已读 primary 做第一次冲突整理，只保留“进入当前主线 / 只保留观察 / 暂不采纳”三层结论。
- [ ] 下一轮：基于 8 条产品法则，反查当前 OpenClaw 现状，列出“已符合 / 未符合 / 下一刀最值得落地”的差距清单。

## 2026-03-11 22:29:03（第一次冲突整理）
- [x] 已将全部已读 primary 的核心冲突压成三层结论：`进入当前主线 / 只保留观察 / 暂不采纳`。
- [x] 已正式裁决当前默认形态：`轻前台 + 单决策流主干 + 状态外化 + 分层评估 + 验证/引用/独立研究子代理优先`。
- [ ] 下一轮：基于 8 条产品法则，开始反查当前 OpenClaw 现状，列出“已符合 / 未符合 / 下一刀最值得落地”的差距清单。

## 2026-03-12 08:54:50（继续深读 topic15 / image7 / aibaihua6 / mxai2）
- [x] 已补读 `07_CiI8juADMus / 01_vTaEqS2tI8w / 06_gptFbbbs6Pk / 01_QpM8abg6s8Y / 01_Jn3ywgwIpw0 / 02_kZ0-h7csizM` 六条 primary，并完成第一轮归类。
- [x] 已确认新增主线共识：`单 agent 默认`、`工程系统优先于单段编码`、`machine-usable surfaces 优先于 UI 依赖`。
- [x] 已确认 `OpenViking` 当前只保留粗粒度支持信号，待修复编码污染后再参与细节比较。
- [ ] 下一轮：继续补读剩余未纳入的 `openclaw24` primary，优先找会改变 `单 agent 默认 / machine-usable surfaces / skill 边界` 排序的新证据。
- [ ] 下一轮：在不新增噪音文档的前提下，把新旧 primary 继续压成更硬的“进入主线 / 只保留观察 / 暂不采纳”分层表。

## 2026-03-12 08:58:56（继续深读 openclaw24 多 agent / memory / hooks / node）
- [x] 已补读 `16 / 17 / 18 / 19 / 20 / 22 / 23 / 24` 八条 `openclaw24` primary，并完成第一轮归类。
- [x] 已确认新增主线增强点：`heartbeat / 可重入性 / API-first tool priority / hooks 回调式派工收尾 / Node 反向隧道配对本地设备`。
- [x] 已确认 `Memory Topics = 索引 + 核心规则 + 主题文件` 值得吸收，但 `LanceDB` 整体替换当前记忆主线仍暂不抬成主结论。
- [ ] 下一轮：继续补读剩余未纳入的 `openclaw24` primary（`21 / 28 / 29` 优先），重点找还会不会改变 `异步派工 + 本地执行 + machine-usable surfaces` 的排序。
- [ ] 下一轮：把 `openclaw24` 新旧证据继续压成更硬的“进入主线 / 只保留观察 / 暂不采纳”分层表，避免多 agent 热度材料抬高默认入口复杂度。

## 2026-03-12 09:00:39（继续深读 openclaw24 尾部 UI Agent / 高级教程）
- [x] 已补读 `21 / 28 / 29` 三条 `openclaw24` primary，并完成与前文去重和归类。
- [x] 已确认新增主线增强点：`RPA 主路径 + UI Agent 兜底` 的混合自动化，对国内平台场景有现实价值。
- [x] 已确认 `21` 与 `20` 为同主题重复稿，不再重复抬高 `Hooks 零轮询派工` 权重。
- [ ] 下一轮：继续回到未读主证据清单，优先扫剩余批次里真正还没纳入判断的 `primary`，避免只停留在 OpenClaw 热度最高的几组材料。

## 2026-03-12 09:06:18（继续深读 batch48 尾部与 muzi3 重复稿）
- [x] 已补读 `05 / 11 / 40 / 42` 四条 `batch48` primary，并完成第一轮归类。
- [x] 已补读 `muzi3` 三条重复稿（`01 / 02 / 03`），确认它们只用于“加强共识”，不新增主判断。
- [x] 已确认新增主线增强点：`docs 真相源 + 仓库内知识迁移 + 研究型 Lead / Search / Citation 升级链路 + 派工前 save plan`。
- [x] 已确认 `11` 与 `40` 为强重合材料，保留共识，不再重复抬高“Lead Agent 默认化”的权重。
- [ ] 下一轮：继续按 `primary` 未读清单补读剩余批次，优先找会真正推翻或重排 `单 agent 默认 / 外部计划保存 / 验证型子代理优先` 的材料。
- [ ] 下一轮：开始把已读全部 `primary` 继续压成“明确取舍表 v2”，并把重复主题进一步做去重合并。

## 2026-03-12 09:13:47（进入 supplemental：stellarlinkco-codex 白名单入口）
- [x] 已按用户规则从 `primary` 切到 `supplemental`，并只读取 `_research\\stellarlinkco-codex` 的白名单入口文档。
- [x] 已完成入口层读取：`README.md / codex-cli README / shell-tool-mcp README / codex-rs core README`。
- [x] 已确认 supplemental 新增主线增强点：`AGENTS 叠加语义`、`execve 级 shell 规则拦截`、`动态 sandbox-state`、`SandboxPolicy 属于 core business logic`。
- [x] 已确认本轮 supplemental 只做“实现语义校准”，没有推翻 `primary` 已收口的默认入口复杂度限制。
- [ ] 下一轮：继续以“少量高价值入口”为准，补读 `_research\\stellarlinkco-codex` 中与 `hooks / protocol / app-server` 最相关的 README 或 schema 入口，判断哪些能真正指导当前 OpenClaw/Codex 集成。
- [ ] 下一轮：同步开始压缩“明确取舍表 v2”，把 `primary` 与 `supplemental` 的关系固定成 `主证据 / 实现语义校准` 两层，不混层。

## 2026-03-12 10:22:40（进入 openclaw24_deep：已读 high-signal primary 的 deep 校准）
- [x] 已补读 `D6FkxqDhrRs / DS6oQtfwBME / B_CM_M-I-0s / io67uFrd54M / x7yadOEV1bo / 1AI-2nRIEEw / l692H9z2YT8` 七条 `openclaw24_deep`。
- [x] 已确认 deep 层没有推翻当前主线，只继续加强：`OpenCloud/OpenCore=编排层+session 治理层`、`token/session compaction/memory flush/session lock=长任务治理原语`。
- [x] 已确认 `skills / Cloudhub` 更像 `能力资产层`，而不是“再堆一点 prompt 技巧”；`browser automation` 更应先稳定本地最小链，再考虑 relay/remote-debugging 闭环。
- [ ] 下一轮：继续只补读高信号 deep/supplemental，优先找会改变 `本地优先 / thread 治理 / 技能资产化 / 浏览器分层控制` 排序的新证据。

## 2026-03-12 10:33:20（继续补读 openclaw24_deep 第二批 + Codex docs 壳层）
- [x] 已补读 `GVTynFMMTwM / XNJMwUdOzEc / p5XgacMxfnk / wawNvxapF1s / YoA2bf76t9E / c44yRfk2UOY` 六条 `openclaw24_deep`。
- [x] 已确认第二批 deep 继续加强：`heartbeat / 可重入 session / hooks 派工 / 本地节点与 gateway 连接 / 团队化协作 durable-first`。
- [x] 已确认 `docs/exec.md`、`docs/sandbox.md`、`docs/skills.md` 这三份本地入口只是指向官方原文的壳，当前只能记作“有正式文档入口”，不能承担实现语义主证据。
- [ ] 下一轮：继续补读剩余 `openclaw24_deep`，优先找还会改变 `单决策流 / durable-first 协作 / 本地优先 / hooks 收尾` 排序的新证据。

## 2026-03-12 10:41:30（继续补读 openclaw24_deep 第三批：记忆 / spec / skills / 数据入口）
- [x] 已补读 `45LHV3tynB8 / 7eKq4DY62xM / 9ZmsoNOGJSw / BslzLq-Zncs / TXLOCdRqhRw / yxc2qlkd2-o / iNpP7f5T0ag / 3oSL3fxEJqs` 八条 `openclaw24_deep`。
- [x] 已确认新增高价值加强点：`spec-first + git/review/feature/bug 闭环`、`skills 是能力资产而非玩具清单`、`WebFetch/LastThirtyDays 属于任务化数据入口 skill`、`Skill Vetting + take-the-wheel` 这类可信执行与人工接管链。
- [x] 已确认 `45LHV3tynB8 / 7eKq4DY62xM / TXLOCdRqhRw / yxc2qlkd2-o / 3oSL3fxEJqs` 这批更适合“保留观察”，不足以推翻当前主线排序。
- [ ] 下一轮：继续补读剩余 `openclaw24_deep`，优先补齐 `浏览器探索后脚本化 / 任务协议化 / skills 资产层与外部记忆边界` 这三组仍可能互相打架的点。

## 2026-03-12 10:48:10（openclaw24_deep 基本闭合）
- [x] 已补读 `h6e4sogMQr4 / ldaM6N5lgGM / 1rgGQZ28uxc / tHzef6d08ac`，`openclaw24_deep` 的正文文件已基本读完，只剩日志/并行状态文件不作为主证据。
- [x] 已确认 `h6e4sogMQr4.deep.md` 的高价值在 `Session + LensDB/LanceDB + BM25/MMR/Rerank + Gateway + Markdown/GitHub` 这条“检索治理 + 工程闭环”链。
- [x] 已确认 `ldaM6N5lgGM.deep.md` 与 `tHzef6d08ac.deep.md` 都是“多组件接入与治理”类材料；前者偏 `OpenClou -> CrazyRouter -> Cloude Opus` 的接入链，后者偏 `平台/Agent/BUG->OK` 的平台叙事，二者都只强化“配置、鉴权、链路检查先于模型炫技”。
- [x] 已确认 `1rgGQZ28uxc.deep.md` 证据过薄，只保留 `高噪音输入必须先做证据层/推断层分离` 的方法论价值。
- [ ] 下一轮：离开 `openclaw24_deep`，回到剩余主库 primary 未读清单，继续逐条补读，不让 deep/supplemental 压过全库主证据。

## 2026-03-12 10:37:43（primary 读完，切入 whitelist supplemental）
- [x] 已重新校准“未读清单”统计口径：排除了 `_tmp / media / transcripts_s* / summary* / dup_hits` 这类派生文件。
- [x] 已确认按 `primary-like` 口径，`D:\Projects\灵感包\转写目录` 当前 `remaining=0`；也就是主证据层已全部纳入，不再有真正未读的根级 transcript。
- [x] 已开始进入 `_research\stellarlinkco-codex` 白名单 supplemental 的下一轮高价值入口：`agents_md / prompts / execpolicy / dynamic_tools / rate_limits / thread_status`。
- [ ] 下一轮：继续按 `supplemental` 口径补 `authentication / thread_* / output_schema / turn_steer` 这类对 `harness / context_engineering / memory / runtime observability` 真有实现语义价值的入口。
- [ ] 下一轮：开始把“primary 已读完 + supplemental 正在做实现语义校准”正式压成一份更硬的 `主证据 / 补充证据 / 不抬权重壳层` 三层表。
## 2026-03-12 10:37:43（primary 已闭合，转入 supplemental whitelist）
- [x] 已重新校准“未读清单”统计逻辑；按 `primary-like` 口径排除 `_tmp / media / transcripts_s* / summary* / dup_hits` 后，当前主证据根级 transcript `remaining=0`。
- [x] 已补读 `mxai2_all` 两条 primary 与 `aibaihua6_all/01`，继续压实 `单 agent 默认 / machine-usable surfaces / OpenViking 分层上下文` 三组判断。
- [x] 已补读 `stellarlinkco-codex` 的 `agents_md / prompts / execpolicy / dynamic_tools / rate_limits / thread_status`，并正式把它们收口为“supplemental 实现语义校准层”。
- [ ] 下一轮：继续补 `stellarlinkco-codex` 中与 `authentication / output schema / thread lifecycle / turn steering` 最相关的高价值入口，不扫整仓，只吃会改变实现语义理解的文件。
- [ ] 下一轮：开始把“primary 已闭合、supplemental 仍在校准”的事实压成更硬的分层总表，但暂不转成需要用户拍板的决策清单。

## 2026-03-12 10:45:16（继续补 Codex 控制面语义）
- [x] 已补读 `authentication / output_schema / thread_resume / turn_steer` 四个高价值 supplemental 入口。
- [x] 已确认新的高价值实现语义：`output schema = per-turn contract`、`thread = durable rollout-backed runtime object`、`steer = active-turn protocol control`。
- [x] 已确认 `required MCP server` 初始化失败会直接阻断 thread resume，这一条后续应纳入“恢复失败先查依赖初始化”的长期判断。
- [ ] 下一轮：继续补 `thread_start / thread_read / thread_fork / thread_rollback / output_schema` 相关高价值入口，把 Codex 的 thread 控制面补齐。
- [ ] 下一轮：开始把“machine-usable surfaces / thread lifecycle / protocolized control”压进全库整合表，但继续避免提前转成决策清单。

## 2026-03-12 10:52:30（thread lifecycle 控制面继续补齐）
- [x] 已补读 `thread_start / thread_read / thread_fork / thread_rollback` 四个高价值 supplemental 入口。
- [x] 已确认 thread lifecycle 新增高价值语义：`start` 可先创建控制对象、`read` 区分摘要与全轨迹、`fork` 是 durable 分支、`rollback` 是持久化回退。
- [x] 已确认 project trust、required MCP 初始化、materialized rollout 这些都直接影响 thread lifecycle，不属于外围噪音。
- [ ] 下一轮：继续补 `thread_list / thread_archive / thread_unarchive / thread_loaded_list / model_list / config_rpc`，把“线程控制面 + 运行态控制面”再补齐一层。
- [ ] 下一轮：开始把 thread lifecycle 的实现语义压入“全库整合总表”，但仍不提前转成用户需要拍板的决策清单。
## 2026-03-12 10:55:28（继续补 Codex 运行控制面：inventory / archive / config / turn 边界）
- [x] 已把上一轮已读但未正式落盘的 `thread_list / thread_archive / thread_unarchive / thread_loaded_list / model_list / config_rpc` 收口进研究主线。
- [x] 已额外补读 `turn_interrupt / turn_start / windows_sandbox_setup`，继续把 `thread/run/interrupt/approval` 这组控制面补齐。
- [x] 已确认新的高价值实现语义：`thread inventory = 一等运行面`、`archive/unarchive = durable 冷热切换`、`model/config = 正式 RPC 控制面`、`turn approval/interrupt = per-turn 协议控制而非聊天插话`。
- [ ] 下一轮：继续顺着 `turn_start / initialize / request_user_input / safety_check_downgrade / experimental_api` 补运行控制面的剩余高信号入口，但只吃会改变实现语义排序的文件。
- [ ] 下一轮：开始把整个 supplemental 校准层压成一份“运行控制面簇总结”，与前面的 `取舍表 v2` 对齐，不提前转成用户决策清单。

## 2026-03-12 10:55:28（继续补 initialize / request_user_input / safety_check / experimental gate）
- [x] 已补读 `initialize / request_user_input / safety_check_downgrade / experimental_api` 四个高价值 supplemental 入口。
- [x] 已确认新增实现语义：`clientInfo.name -> originator/user_agent`、`opt_out_notification_methods`、`experimental_api capability gate`、`Plan mode 下 request_user_input 的正式 round-trip`、`high-risk safety reroute`。
- [x] 已确认这些入口继续支持当前主线：运行控制面是 `thread + turn + events + capabilities + approvals`，不是前台人格自由发挥。
- [ ] 下一轮：继续补 `initialize / experimental_api / safety reroute` 周边若干高信号文件，重点找是否存在能改变“轻前台 + thread/turn 控制面优先”排序的新证据。
- [ ] 下一轮：开始输出第一版“运行控制面簇总结”，把 `inventory / lifecycle / config / approvals / interrupt / capability gates / reroute` 串成一份更硬的系统图。

## 2026-03-12 11:09:48（继续补 account/apps/modes/websocket/plan/review/compaction/skills）
- [x] 已补读 `account / app_list / collaboration_mode_list / connection_handling_websocket / experimental_feature_list / plan_item / review / compaction / skills_list` 九个高价值 supplemental 入口。
- [x] 已确认新增实现语义：`account/workspace/auth refresh` 属于正式运行控制面；`apps/connectors` 是带更新事件的动态缓存目录；`Plan / Default` 是可枚举的内建 collaboration modes；WebSocket 的初始化与 request-id 是 per-connection 隔离；Plan mode 会把 `<proposed_plan>` 提升成正式 `Plan` item 与 `item/plan/delta`。
- [x] 已确认 `review` 和 `compaction` 都不是外围小功能：前者是正式的 detached/inline review workflow，后者是 thread 级 started/completed lifecycle；二者都继续支持“收口与压缩应是系统能力，不是前台习惯”。
- [x] 已确认 `skills_list` 的高价值语义在于：skill roots 是按 cwd 和绝对路径受治理的缓存目录，不是随意扫描的全局热插拔仓库。
- [ ] 下一轮：继续沿 app-server v2 高信号入口补 `analytics / notifications / turn_start_zsh_fork` 这类剩余边界文件，但只在它们能改变当前控制面排序时才抬权重。
- [ ] 下一轮：开始把整个 supplemental 校准层正式压成一份“运行控制面簇总结 v1”，与前面的取舍表 v2 对齐。

## 2026-03-12 11:14:08（继续补 analytics / zsh fork，确认边界层不改主轴）
- [x] 已补读 `analytics.rs / turn_start_zsh_fork.rs / mod.rs`，并用它们校验 app-server v2 测试簇边界。
- [x] 已确认：`analytics` 当前更像观测开关而不是主控制面；默认是否启用 metrics 取决于显式 flag，不足以重排现有 harness 主轴。
- [x] 已确认：`turn_start_zsh_fork` 更像 shell 执行变体与审批传播测试；它说明执行后端可以替换，但不改变 `per-turn approval + command item + interrupt` 这条主控制链。
- [x] 已确认：`mod.rs` 只是测试簇目录索引，不承担新增实现语义。
- [ ] 下一轮：若继续补 supplemental，优先找 `notifications / transport / event fanout / review delivery` 周边文件；若没有新排序证据，就开始汇总“运行控制面簇总结 v1”。

## 2026-03-12 11:20:08（继续补协议对象层：Thread/Turn/ThreadItem/approval/request_user_input/history）
- [x] 已补读 `app-server-protocol/src/protocol/v2.rs`、`thread_history.rs`、`protocol/src/items.rs`、`plan_tool.rs`、`request_user_input.rs`。
- [x] 已确认 `Thread`/`Turn` 是正式 durable runtime object：`Thread.turns` 只有在 `resume/fork/read(includeTurns=true)` 才会返回完整轨迹；`Turn.error`、`TurnStatus`、`ThreadTokenUsageUpdatedNotification`、`ThreadNameUpdatedNotification`、`TurnPlanUpdatedNotification` 都是协议级对象，不是前台文案。
- [x] 已确认 app-server v2 的 `ThreadItem` 已扩展成统一轨迹承载体：除了 `UserMessage/AgentMessage/Plan/Reasoning/WebSearch`，还正式包含 `CommandExecution`、`FileChange`、`McpToolCall`、`CollabAgentToolCall`、`Entered/ExitedReviewMode`、`ContextCompaction`。
- [x] 已确认审批/人类输入/动态工具都已协议化：`CommandExecutionRequestApprovalParams` 带 `thread_id/turn_id/item_id/approval_id` 与 `proposed_execpolicy_amendment`，`FileChangeRequestApprovalParams` 带 `grant_root`，`DynamicToolCallParams` 与 `ToolRequestUserInputParams/Response` 都是正式对象。
- [x] 已确认 `thread_history.rs` 的高价值语义：历史不是简单聊天回放，而是把 event stream 重建成 durable turn history，并用 `turn_id` 把晚到的 `exec complete / turn complete / turn abort` 路由回原始 turn；compaction-only turn 会被保留，`ThreadRollbackFailed` 与 out-of-turn error 不会误污染活 turn。
- [ ] 下一轮：继续补 `app-server-protocol` 的事件/通知对象层剩余高信号入口，优先找会改变“ThreadItem=统一运行轨迹对象”这条判断的反例或细化证据。

## 2026-03-12 11:25:59（继续补 config/apps/sandbox 对象层）
- [x] 已补读 `app-server-protocol/src/protocol/v2.rs` 中 `ConfigLayerSource / AppsConfig / ConfigReadResponse / ConfigRequirements / SandboxPolicy` 相关对象，并对照 `docs/config.md` 的官方说明入口。
- [x] 已确认 `ConfigLayerSource` 是正式分层治理模型，具备明确 precedence：`Mdm -> System -> User -> Project -> SessionFlags -> LegacyManaged*`；配置冲突应建模成“层覆盖”，不是前台人格自述。
- [x] 已确认 `ConfigReadResponse`/`ConfigWriteResponse` 已正式承载 `origins / layers / version / overridden_metadata / file_path`；配置写入不是文本编辑习惯，而是带版本和覆盖信息的协议操作。
- [x] 已确认 `ConfigRequirements`/`NetworkRequirements`/`ResidencyRequirement` 把“允许的 approval policy / sandbox mode / web search mode / residency / 代理与域名边界”做成正式要求对象，说明运行边界本身就是一等控制面。
- [x] 已确认 `AppsConfig`/`AppConfig`/`AppToolApproval` 把 connectors/apps 做成显式治理对象：支持 `enabled / destructive_enabled / open_world_enabled / default_tools_approval_mode / per-tool config`，不是“装了就全开”。
- [x] 已确认 `SandboxPolicy` 正式区分 `DangerFullAccess / ReadOnly / ExternalSandbox / WorkspaceWrite`，且 `WorkspaceWrite` 已把 `writable_roots / read_only_access / network_access / tmp exclusion` 全部对象化。
- [ ] 下一轮：继续补 `app-server-protocol` 剩余高价值通知与 app catalog 对象，重点找“能力目录/治理目录/控制目录”三层是否还有更细的边界证据。

## 2026-03-12 11:31:54（继续补 account/apps/review/compaction/skills 的正式对象语义）
- [x] 已继续深读 `account.rs / app_list.rs / collaboration_mode_list.rs / review.rs / compaction.rs / skills_list.rs / analytics.rs / experimental_feature_list.rs`，把这一簇从“功能列表”收口到“正式控制面对象”。
- [x] 已确认 `account/auth/workspace refresh` 是 turn 级成败条件：`401 -> refresh request -> retry` 是正式回路；refresh 若返回错误 workspace 或非法 token，会直接把 turn 打成 failed，而不是只留下账号状态异常。
- [x] 已确认 `apps/connectors` 是动态目录面：目录元数据与可访问工具清单会异步合并，通过 `app/list/updated` 持续推送；`force_refetch` 失败时会保留旧缓存，`thread_id` 会影响是否看见 thread 级 connector 视图。
- [x] 已确认 `review` 与 `compaction` 都是正式 workflow/lifecycle：`review` 支持 `inline/detached` 且 detached 会产出新 `review_thread_id`；`compaction` 支持自动与手动触发，并以 `ContextCompaction` item 的 started/completed 进入历史。
- [x] 已确认 `skills_list` 是按 `cwd + absolute extra roots + cache + force_reload` 受治理的目录面，不是全局乱扫；`collaboration modes` 与 `experimental features` 也都是内建、可枚举、带 stage/默认值的正式目录。
- [ ] 下一轮：继续沿 `supplemental` 深挖 `event fanout / notification semantics / app catalog merge model / account lifecycle` 的剩余高信号文件，再压成“运行控制面簇总结 v1”。

## 2026-03-12 11:36:35（继续补 notification/transport/plan 的细粒度语义）
- [x] 已继续深读 `connection_handling_websocket.rs / plan_item.rs`，并回看 `app-server-protocol v2.rs` 的 notification 对象层。
- [x] 已确认 WebSocket transport 的真正边界是 `per-connection initialize + per-connection request-id routing`；未初始化连接会被正式拒绝，同一 request-id 在不同连接上互不污染。
- [x] 已确认 Plan mode 的 plan item 不是“模型想到了就发”，而是只有出现 `<proposed_plan>` block 时才会提升成正式 `ThreadItem::Plan` 与 `item/plan/delta`；无 block 时不会伪造 plan item。
- [x] 已确认 `app/list/updated` 体现的是目录渐进合并模型：响应可以在目录元数据与可访问工具清单尚未完全对齐时先发中间快照，最终再收敛到合并后的目录视图。
- [x] 已确认控制面通知的高价值主线继续收敛到：`initialize / status / item started-completed / plan delta / app list updated / turn completed`，而不是让前台用自然语言代替事件流。
- [ ] 下一轮：继续沿 `supplemental` 深挖 `notification fanout / response-item delta / catalog merge` 的剩余高信号入口，开始压“运行控制面簇总结 v1”。

## 2026-03-12 12:02:34（继续补 raw events / listener fanout / tool item 化）
- [x] 已继续深读 `bespoke_event_handling.rs / codex_message_processor.rs / app-server-protocol common.rs`，把 `raw events / notification fanout / item 化输出` 这层实现语义补齐。
- [x] 已确认 `RawResponseItem` 是可选调试层而不是默认事实层：只有启用 `experimental_raw_events` 才会向连接继续转发 raw response item；默认 durable truth 仍以 `ThreadItem + typed notifications` 为主。
- [x] 已确认 listener / 连接订阅是显式 fanout 模型：连接关闭会移除其订阅；最后一个订阅者离开时才会触发 listener 清理；`experimental_raw_events` 在同一 thread 上是 last-write-wins 行为。
- [x] 已确认 `TokenCountEvent` 会分流成两个正式通知面：`thread/tokenUsage/updated` 与 `account/rateLimits/updated`；`TurnDiffEvent` 也有独立 `turn/diff/updated`，说明成本/差异/执行结果都不应再靠前台自然语言总结代替。
- [x] 已确认 MCP 工具与命令执行已经被统一 item 化：`McpToolCall`、`CommandExecution`、`FileChange` 都会以 `item started/completed` 和结构化 `arguments/result/error/duration` 进入 thread history。
- [ ] 下一轮：继续顺着 `response item -> curated timeline`、`listener task lifecycle`、`raw vs durable history` 这三条线深挖，随后压第一版“运行控制面簇总结 v1”。

## 2026-03-12 12:09:34（继续补 output schema / status / steer / dynamic tools / approval UI）
- [x] 已补读 `output_schema.rs / rate_limits.rs / thread_status.rs / turn_steer.rs / dynamic_tools.rs`，并用 `app-server/README.md` 对照通知与审批顺序。
- [x] 已确认 `output_schema` 是 per-turn contract：只在本轮 `turn/start` 生效，并被下游 Responses 请求编码成严格 `json_schema`；不会自动变成 thread 持久属性。
- [x] 已确认 `thread/status/changed` 是 runtime surface，不是聊天副产物：线程会在 `Active -> Idle/SystemError/NotLoaded` 间正式切换，且该通知可被客户端按 connection opt-out。
- [x] 已确认 `turn/steer` 是 active-turn 协议控制，不是新开一轮对话：它必须命中当前活跃 turn，并返回真正接受输入的 `turn_id`。
- [x] 已确认 `dynamic_tools` 是 thread 级实验能力目录：声明发生在 `thread/start`，调用通过正式 request/response round-trip 回注到模型，说明动态能力更像受治理的线程工具注册表。
- [x] 已确认 README 给出的 UI 顺序继续支持当前主线：`item/completed` 才是命令/补丁/review 等 item 的 authoritative state，而 `turn/completed` 目前不应被当成 canonical item list。
- [ ] 下一轮：继续沿 `app-server/README` 与协议 schema 补 `authoritative state / item lifecycle / approval sequencing` 的剩余高信号细节，然后压“运行控制面簇总结 v1”。

## 2026-03-12 12:19:37（继续补 ServerRequest / ServerNotification / approval payload 的对象边界）
- [x] 已继续深读 `app-server-protocol common.rs / v2.rs / protocol items.rs`，把“客户端真正需要回应什么”和“客户端主要应该监听什么”拆开。
- [x] 已确认 `ServerRequest` 的正式控制回路很窄：核心只有 `item/commandExecution/requestApproval`、`item/fileChange/requestApproval`、`item/tool/requestUserInput`、`item/tool/call`、`account/chatgptAuthTokens/refresh`；这说明客户端主动响应面远小于通知面。
- [x] 已确认 `ServerNotification` 才是宽状态总线：`thread/started`、`thread/status/changed`、`turn/started`、`turn/completed`、`turn/plan/updated`、`item/started`、`item/completed` 以及 item-specific delta 承担了大部分运行真相。
- [x] 已确认审批 payload 里真正高价值的治理字段是 `approval_id`、`network_approval_context`、`command_actions`、`proposed_execpolicy_amendment`、`grant_root`；它们说明审批并不只是 accept/decline，而是 policy 可延续面的入口。
- [x] 已确认 `ToolRequestUserInput` 已经是正式服务端请求对象，问题/选项/答案映射都有 schema，说明“人类补输入”是工具协议回路，不是聊天例外。
- [x] 已确认底层 `TurnItem` 继续保持轻量，而 app-server 的 `ThreadItem`/`ItemStarted`/`ItemCompleted` 则提供富轨迹视图；后者更适合作为 durable history 与 UI 的真实消费面。
- [ ] 下一轮：继续沿 `server notifications -> item delta -> durable history` 收口“运行控制面簇总结 v1”，再看是否需要单独整理 `request/notification asymmetry` 小节。

## 2026-03-12 12:24:35（继续补 thread read/resume/fork/rollback/interrupt 的 durable workflow 语义）
- [x] 已继续深读 `thread_read.rs / thread_resume.rs / thread_fork.rs / thread_rollback.rs / turn_interrupt.rs`，把“读取历史”和“控制运行中 thread”彻底拆开。
- [x] 已确认 `thread/read` 是 summary-first 读取面：`includeTurns=false` 只拿摘要，不拿 turns；磁盘上已有 rollout 但尚未加载的 thread 会以 `NotLoaded` 暴露，已启动但尚未 materialize 的新 thread 则可提前暴露预计算 path 与 `Idle`。
- [x] 已确认 `thread/resume` 不是简单 reopen，而是受约束的重连/覆盖动作：未 materialize 的 thread 不能 resume；无 overrides 的 resume 不应改 `updated_at` 或 rollout mtime；running thread 上禁止带 `history` 或 mismatched `path` 的 resume。
- [x] 已确认 running thread 的 resume 更像 rejoin：若 thread 仍在运行，即使传入 `model/cwd` override mismatch，也会回到当前活 thread，并以正在运行的真实模型/状态为准，而不是静默改写运行中配置。
- [x] 已确认 `thread/resume` 支持在已 materialize 的 durable thread 上注入显式 `history + model_provider` 覆盖，并把新的 history 文本提升成 preview；`personality` override 也会在后续 turn 的 developer 输入中显式注入 `<personality_spec>`，而不是隐式改写底层历史。
- [x] 已确认 `thread/fork` / `thread/rollback` / `turn/interrupt` 都是正式 durable workflow：fork 复制 rollout 历史到新 thread 且不继承 name；rollback 真正裁剪并持久化 turns；interrupt 以 `turn/completed(status=Interrupted)` 作为清理完成信号。
- [ ] 下一轮：把 `thread read / resume / fork / rollback / interrupt` 和前面的 `thread/turn/item/approval` 结论合并，开始压“运行控制面簇总结 v1”。

## 2026-03-12 12:30:56（继续补 thread/start + turn/start 的首轮持久化边界）
- [x] 已补读 `thread_start.rs / turn_start.rs / app-server-protocol v2.rs`，把 thread 出生、turn 首轮 override、审批切换、session 级批准记忆这组边界补齐。
- [x] 已确认 `thread/start` 先创建的是 `Idle` 控制对象，不是已 materialize 的历史：新 thread 默认 `preview` 为空，path 可预计算但首条用户消息前 rollout 尚未落盘；`ephemeral=true` 时甚至可以完全无 path。
- [x] 已确认 `thread/start` 会吃 `cwd` 对应项目层配置：trusted project 下 `.codex/config.toml` 的 `model_reasoning_effort` 等设置会在 `ThreadStartResponse` 里显式反映出来；required MCP 初始化失败时，thread/start 会直接报错，不进入半启动状态。
- [x] 已确认 `turn/start` 的 override 不是纯本轮临时值，而是“本轮及后续 turn 的新默认层”：`cwd / approval_policy / sandbox_policy / model / effort / summary / personality / output_schema / collaboration_mode` 都在同一控制面上建模。
- [x] 已确认 `collaboration_mode` 有正式优先级：若设置了 `collaboration_mode.settings`，其 `model / reasoning_effort / developer_instructions` 会压过同一 `turn/start` 里的普通 override；人格变更则以 developer-layer 注入的 `<personality_spec>` 进入后续 turn，而不是回写旧历史。
- [x] 已确认审批与执行边界会跨 turn 持续：`approval_policy=never` 可让后续命令跳过审批；`cwd` 与 `sandbox_policy` 更新后，下一个 turn 的命令 item 会以新的 cwd/sandbox 启动；`FileChange AcceptForSession` 会在同一 thread/session 内直接记住批准结果。
- [ ] 下一轮：继续把 `thread/start + turn/start + request/notification asymmetry + durable workflow` 合并成“运行控制面簇总结 v1”，再决定是否单独整理 `start-time overrides vs durable state` 小节。

## 2026-03-12 12:42:24（继续补 agent teams 的 durable inbox/task/worktree 语义）
- [x] 已继续深读 `agent-teams.md / multi_agents.rs / inbox.rs / team_ask_lead.rs / agent_teams.rs / multi_agents tests`，把 team 体系从“多 agent 说明文档”压成正式 durable workflow 对象。
- [x] 已确认 team 的核心不是 prompt choreography，而是持久化对象：`teams/<team_id>/config.json`、`tasks/<team_id>/*.json`、`inbox/<thread_id>.jsonl`、`cursor.json`、`lock`、`tasks.lock` 都是正式一等对象。
- [x] 已确认 `team_message / team_broadcast / team_ask_lead` 都是 durable-first：先 append inbox，再 best-effort live delivery；delivery 失败时不会丢消息，而是返回 `delivered=false + inbox_entry_id + error`。
- [x] 已确认 inbox/ack 不是聊天收件箱假象，而是显式协议回路：`team_inbox_pop` 返回 cursor-based `ack_token`；`team_inbox_ack` 强制 team_id/thread_id 单调匹配，空 token no-op，非法 token/mismatch 会正式报错。
- [x] 已确认 task board 也是正式 durable workflow：`team_task_claim` 在并发下保持 exclusive，`team_task_complete` 的 hook 在并发下只应 dispatch 一次，说明 task 状态推进是受锁保护的系统面。
- [x] 已确认 `worktree=true` 不是装饰位，而是会为成员创建独立 git worktree，并在 `close_agent/team_cleanup` 时成对清理；这让 team 真正落到“独立执行环境”而不是同目录多人抢写。
- [ ] 下一轮：把 `agent teams + review + compaction` 合并成“二阶工作流对象总结 v1”，再继续顺着 team hooks / persisted inbox cursor / task hooks 收口升级链。

## 2026-03-12 12:49:31（继续补 team hooks / spawn lifecycle / worktree lease 的事件语义）
- [x] 已继续深读 `spawn.rs / team_task_complete.rs / hooks registry.rs / hooks types.rs`，把 team 与 hooks、spawn lifecycle、worktree lease 的连接方式补齐。
- [x] 已确认 subagent spawn 不是黑箱：`CollabAgentSpawnBeginEvent / EndEvent` 是正式事件，spawn 成功后还会触发 `subagent_start` hook，并把 hook 返回的 `additional_context` 注入子 agent 的 developer layer。
- [x] 已确认 `team_task_complete` 不是先改状态再补通知，而是先拿 completion lock，再在写 Completed 前跑 `task_completed` hook；并发测试表明该 hook 只会 dispatch 一次。
- [x] 已确认 hooks 体系把 `TaskCompleted / SubagentStart / SubagentStop / WorktreeCreate / WorktreeRemove / PreCompact` 都作为正式 `HookEvent` 对象，而不是脚本层约定俗成。
- [x] 已确认 `worktree_create / worktree_remove` 本身也是 hook 面：`worktree=true` 不只意味着创建目录，还允许通过 hook 决定路径、回传 `worktree_path`、并在 cleanup 时正式触发 remove 生命周期。
- [ ] 下一轮：开始把 `thread/turn/items/approvals/catalogs + review/compaction + teams/hooks/worktrees` 合并成“运行控制面簇总结 v1”，只保留高价值对象级结论。

## 2026-03-12 12:51:42（继续补 close/cleanup/spawn 的队伍生命周期边界）
- [x] 已继续深读 `close_team.rs / team_cleanup.rs / spawn_team.rs`，并用 `multi_agents tests` 反查 `partial close / slot release / worktree hook` 的真实边界。
- [x] 已确认 `spawn_team` 的正确产品理解是“建队 + 初始任务落盘 + 可选 worktree 租约”，不是一次性批量开几个聊天子窗口；成员级 `model/provider/worktree/background` 都在建队时显式进入配置面。
- [x] 已确认 `close_team` 更像可部分执行的“降编/裁员”动作：可按成员子集关闭；只有 `ok=true` 的成员才会从 team record 中移除；若仍有残余成员，team registry 与持久化状态会继续保留。
- [x] 已确认 `team_cleanup` 才是彻底拆队动作：它会尝试关闭并清理全体成员，并在成功清空后移除 team registry、team config 与 task dir；测试还确认已 shutdown 成员占用的线程槽位会被释放。
- [x] 已确认 `worktree_create/worktree_remove` hook 能把“是否处于 git repo”这个前置条件改造成受治理的创建/回收流程：即使当前 cwd 不在 git 仓库内，只要 hook 提供合法 worktree path，spawn 仍可成功。
- [ ] 下一轮：继续把 `close/cleanup/spawn + review/compaction + thread/turn/items` 合并成“二阶工作流对象总结 v1”，重点只保留 durable workflow 层的共识。

## 2026-03-12 12:58:54（继续补 review/compaction 的二阶 workflow 语义）
- [x] 已继续深读 `core/src/tasks/review.rs / core/src/tasks/compact.rs / core/src/compact.rs / core/src/compact_remote.rs / core/tests/suite/review.rs / core/tests/suite/compact.rs`，把 review 与 compaction 从“工具习惯”压成正式 workflow 对象。
- [x] 已确认 `review` 的真实产品形态是“隔离子线程 + 结构化退出”：
  - review 子线程会显式禁用 `web search` 与 `collab`
  - review-only rubric 走 `REVIEW_PROMPT`
  - 默认审批策略强制 `AskForApproval::Never`
  - `review_model` 可独立于主模型配置
- [x] 已确认 review 的运行边界是“输入隔离、结果回灌”：
  - review 请求输入与父线程历史隔离
  - 完成后通过 `ExitedReviewMode(review_output)` 和回写 rollout 的 user/assistant message 重新进入父线程可消费历史
  - agent message 的 streaming/delta 会在 review 流里被主动抑制
- [x] 已确认 `compaction` 的真实产品形态是“正式 lifecycle + durable history 重写”：
  - local/remote compaction 都先发 `TurnStarted + ContextCompaction item started`
  - 成功后统一落成 `ContextCompaction item completed`
  - rollout 会持久化 `RolloutItem::Compacted`
- [x] 已确认 compaction 的真正价值不只是“生成摘要”，而是“清洗并重建后续模型可见历史”：
  - 会剥离尾部 model-switch developer message，避免污染 compaction request
  - local compact 会保留受 token 预算限制的 user messages，再追加 summary
  - remote compact 会过滤 stale developer/non-user wrapper，只保留应进 durable history 的 item
  - mid-turn compaction 会把 canonical initial context 重新注入到最后一个真实 user message 之前，而不是简单拼接在尾部
- [ ] 下一轮：继续把 `review + compaction + team lifecycle + thread/turn/items` 合并成“二阶工作流对象总结 v1”，重点只保留 durable workflow 与 authority-state 层的共识。

## 2026-03-12 13:05:49（继续补 remote compaction 与 compact->resume->fork 的模型可见历史边界）
- [x] 已继续深读 `core/tests/suite/compact_remote.rs / compact_resume_fork.rs`，把 remote compaction、resume、fork、rollback 串成一组“模型可见历史”判断。
- [x] 已确认 remote compaction 的 follow-up 请求优先消费返回的 compaction item；若 remote 输出只剩 compaction item，旧 assistant/user 历史可以被整段替换掉，而不是自动保留。
- [x] 已确认 remote pre-turn compaction 当前仍有显式边界：compact request 会排除 incoming user；模型切换时还会剥离 incoming `<model_switch>`，再在 post-compaction follow-up request 中把新 user 与 model-switch 恢复进去。
- [x] 已确认 remote compaction 失败会直接停止本轮 agent loop，不会偷偷继续 follow-up turn；`invalid compact payload` 与 `context window exceeded` 都属于正式 stop 条件。
- [x] 已确认 `compact -> resume -> fork -> compact -> resume` 的核心不变量是“模型可见历史前缀保持稳定”：resume/fork 后的新请求应以前一轮 compact 后的历史为前缀，只在尾部追加新 user turn；ghost snapshot 属于过滤层，不应进入主历史判断。
- [ ] 下一轮：开始把 `thread/turn/items/approvals/catalogs + review/compaction + resume/fork/rollback + team lifecycle` 合并成“二阶工作流对象总结 v1”，只保留当前主线真正可用的对象级法则。

## 2026-03-12 13:09:31（继续补 global history / rollout / thread runtime 的三层分工）
- [x] 已继续深读 `codex_thread.rs / thread_manager.rs / message_history.rs / rollout/mod.rs / rollout/recorder.rs / rollout/policy.rs / rollout/truncation.rs`，把全局历史、rollout、线程运行态三层拆开。
- [x] 已确认 `message_history` 是全局 append-only `history.jsonl`：它只存 `session_id/ts/text`，用锁和 soft-cap trimming 保证并发追加与历史裁剪；这层更像全局消息日志，不等于 durable thread history。
- [x] 已确认 `rollout` 才是每个 thread 的 durable artifact：`RolloutRecorder` 采用 deferred materialization，只有显式 `persist()` 才真正落盘；并通过 `SessionMeta + selected RolloutItem/EventMsg` 组合成可 resume/fork/read 的历史面。
- [x] 已确认 rollout 持久化是受 policy 控制的：`Limited/Extended` 决定哪些事件写入文件；`ghost snapshot / compaction / plan item completion / selected command/tool events` 都是显式选择，不是把所有事件流原样落盘。
- [x] 已确认 `ThreadManager` 的 fork 截断不是盲切文本，而是按“真实 user turn 边界”裁剪，并且会应用 `ThreadRolledBack` marker、忽略 session prefix，保证 fork 看到的是有效历史而不是原始流残片。
- [x] 已确认 thread spawn/resume 的真相依赖 `SessionConfigured` 作为 first event；也就是说，前台要理解 durable thread，不能跳过 thread manager 的启动握手。
- [ ] 下一轮：把 `message history / rollout / thread runtime` 与前面的 `review/compaction/team lifecycle` 合并成“二阶工作流对象总结 v1”，只保留对象级分工与 authority-state 规则。

## 2026-03-12 13:14:18（继续补 state_db / context_manager / session_prefix 的协调层语义）
- [x] 已继续深读 `state_db.rs / context_manager/history.rs / context_manager/updates.rs / session_prefix.rs / state/session.rs / state/turn.rs`，把“索引层、模型视图层、活 turn 协调层”拆开。
- [x] 已确认 `state_db` 更像索引/修复层，而不是 durable truth：thread 列表默认走 filesystem-first，再用 SQLite repair stale path / backfill metadata；backfill 未完成时，state_db 甚至不应被当成可用控制面。
- [x] 已确认 `SessionState.history(ContextManager)` 才是“下一轮模型实际看到什么”的运行时主面：它维护 `items + token_info + reference_context_item + previous_model`，负责 model-visible history、token 估算、drop last user turns、replace history 等动作。
- [x] 已确认 `session_prefix` 是一类特殊的 model-visible user-role item：`<environment_context> / <turn_aborted> / <subagent_notification>` 会进入历史，但不构成 user-turn boundary。
- [x] 已确认 `context_manager/updates` 的高价值语义是“上下文变化走显式 update items，而不是静默改底稿”：环境、权限、collaboration mode、personality、model-switch 都会以有序 developer/system update item 注入，且 model-switch 指令优先级最高。
- [x] 已确认 `state/turn.rs` 把活 turn 的待处理对象正式化了：审批、request_user_input、dynamic_tool response、pending input 都只属于 active turn 协调层，不属于 durable history。
- [ ] 下一轮：把 `state_db + context_manager + session_prefix + active turn state` 与前面的 `rollout/review/compaction/team lifecycle` 合并成“二阶工作流对象总结 v1”，只保留对象级分工、authority-state 和协调层规则。

## 2026-03-12 13:21:30（继续补 ContextManager 的归一化、截断与 user-turn 边界）
- [x] 已继续深读 `context_manager/normalize.rs / history.rs / history_tests.rs / truncate.rs / session_prefix.rs`，把“模型下一轮到底看到什么”补到对象级细节。
- [x] 已确认 `normalize_history()` 的职责不是“重写历史叙事”，而是做最小不变量修复：补齐缺失的 call/output 配对、删除 orphan outputs、在模型不支持图片时把图片内容替换成占位文本。
- [x] 已确认 `ContextManager.record_items()` 与 `process_item()` 当前只会主动截断工具输出：`FunctionCallOutput / CustomToolCallOutput` 会按 truncation policy 缩短；`Message / Reasoning / FunctionCall / LocalShellCall / WebSearchCall / Compaction` 默认保持原样进入运行时历史。
- [x] 已确认 `is_user_turn_boundary()` 不是“所有 user-role item 都算一轮”，而是语义边界：`session_prefix`、`user instructions`、`skill instructions`、`user shell command`、`subagent_notification` 都是 model-visible，但不构成真实 user turn。
- [x] 已确认 token 账本是分层的：`last_token_usage.total_tokens` 只代表最近一次成功 API 响应；其后的本地 user/tool-output 尾部要单独按 `items_after_last_model_generated_item()` 估算并叠加。
- [ ] 下一轮：把 `ContextManager normalization/truncation + rollout/state_db + thread/turn/items` 合并成“模型可见历史 vs durable history vs active coordination”总结块，只保留对象级不变量。

## 2026-03-12 13:30:01（继续补 TurnContextItem / OverrideTurnContext / EnvironmentContext 的对象语义）
- [x] 已继续深读 `protocol.rs / environment_context.rs / models.rs`，把“设置如何进入运行态”补到协议对象层。
- [x] 已确认整个会话协议本身就是 `SQ/EQ`（Submission Queue / Event Queue）模型：客户端提交 `Op`，服务端通过事件流回传 thread/turn/item 运行真相；这再次加强“前台不是聊天壳，而是控制面客户端”。
- [x] 已确认 `OverrideTurnContext` 是独立控制操作，不附带任何用户输入；它专门用于覆盖后续 turn 默认值，和 `UserTurn` 的“携带输入并启动本轮 turn”是两种不同语义。
- [x] 已确认 `TurnContextItem` 是可持久的运行上下文快照：它显式携带 `cwd / approval_policy / sandbox_policy / network / model / personality / collaboration_mode / effort / summary / user_instructions / developer_instructions / final_output_json_schema / truncation_policy`。
- [x] 已确认 `EnvironmentContext` 的模型可见注入不是全量镜像，而是 sparse diff XML：turn-to-turn 比较时忽略 shell 差异，只在 `cwd / network` 变化时生成 `<environment_context>` 更新项；网络也只投影为 `allowed_domains / denied_domains`。
- [ ] 下一轮：继续把 `TurnContextItem / ContextManager / rollout / active turn state` 合并成“设置快照、模型可见投影、durable artifact、活 turn 协调”四层总结块。

## 2026-03-12 13:35:27（继续补 permissions replay / raw preamble / bounded model-switch injection）
- [x] 已继续深读 `permissions_messages.rs / send_message.rs`，把“模型到底先看到什么”和“哪些 developer-layer 更新会重放”补到对象级边界。
- [x] 已确认权限消息不是一次性文案，而是可重放的 developer-layer 上下文：启动时只发一次；`OverrideTurnContext` 改权限后下一次请求会追加新权限消息；无变更则不重复。
- [x] 已确认 `resume` 与 `fork` 都会继承并追加权限消息，而不是把旧权限描述抹平；也就是说，权限 developer message 本身具备 durable replay 语义。
- [x] 已确认在 raw item opt-in 下，模型可见前导顺序是稳定的：`permissions -> developer instructions -> AGENTS/instructions -> environment -> user -> assistant`。
- [x] 已确认 `model_switch` 不是无限叠加提示，而是 bounded developer-layer 注入：post-resume 首轮会带显式 `<model_switch>`，第二轮不应再次重复追加新的切换消息。
- [ ] 下一轮：继续把 `permissions / developer instructions / instructions / environment / model-switch` 合并成“模型可见前导层”总结块，再往 `app-server-protocol` 的 item/history authority 方向下钻。

## 2026-03-12 16:31:49（继续补 approvals / rich input / MCP adapter / team send-resume-locks）
- [x] 已继续深读 `protocol/src/approvals.rs / dynamic_tools.rs / mcp.rs / user_input.rs` 与 `multi_agents/send_input.rs / resume_agent.rs / locks.rs`，把“审批对象、富输入对象、团队内继续驱动与恢复”的协议语义补齐。
- [x] 已确认 `approval` 不是 accept/decline 按钮语义，而是正式 policy 协商对象：`approval_id / network_approval_context / proposed_execpolicy_amendment / grant_root` 都是一等治理字段。
- [x] 已确认 `user_input` 不是纯文本：`Text + text_elements / Image / LocalImage / Skill / Mention` 都是正式输入类型，说明富输入应被对象化，而不是靠前台字符串拼装。
- [x] 已确认 `mcp` 在 protocol 层的高价值是“TS/JsonSchema 友好的适配对象”：`Tool / Resource / ResourceTemplate / CallToolResult` 负责把 wire-shaped MCP 值转成统一协议面，而不是让前台直接消费杂乱 JSON。
- [x] 已确认 `send_input` 与 `resume_agent` 说明 team 不是一次性 spawn：它支持对既有成员持续送入新输入、在线程深度限制内从 rollout 恢复关闭成员，并通过 `CollabResumeBegin/End` 暴露正式生命周期。
- [x] 已确认 `locks.rs` 说明 multi-agent durable workflow 的并发正确性不是 prompt 约定，而是显式文件锁；尤其 Windows 走 `share_mode(0) + retry`，说明 team inbox/task/cleanup 这些对象级状态天生按跨进程锁治理。
- [ ] 下一轮：继续优先补 `protocol/src/approvals.rs` 相关联的 `dynamic_tools / mcp / thread_id / openai_models` 与 `multi_agents/team_message / team_inbox_* / team_task_*` 尾项，收口“协议对象层 vs durable team workflow 层”总结块。

## 2026-03-12 16:35:46（继续补 team inbox / task board / wait surface）
- [x] 已继续深读 `team_message.rs / team_inbox_pop.rs / team_inbox_ack.rs / team_task_claim*.rs / team_task_complete.rs / team_task_list.rs / team_broadcast.rs / wait.rs / wait_team.rs`，把 team 的 durable workflow 面补到“消息、任务、等待、收口”四层。
- [x] 已确认 `team_message / team_broadcast` 都是 durable-first：先写 inbox，再 best-effort live delivery；live delivery 失败不会丢消息，而是返回 `delivered=false/failed[] + inbox_entry_id + error`。
- [x] 已确认 `team_inbox_pop / team_inbox_ack` 不是 UI 小技巧，而是正式 cursor/ack 协议：`pop` 返回结构化消息与 `ack_token`，`ack` 会校验 `team_id/thread_id`，空 token 只返回 `acked=false`，非法 token 会正式报错。
- [x] 已确认 team task board 是受治理的持久状态机：`team_task_claim` 检查 assignee 合法性与 dependency 满足后才可 claim；`team_task_claim_next` 会按“待办 + 依赖已满足 + 成员匹配”自动挑下一个任务。
- [x] 已确认 `team_task_complete` 带独立 completion lock，并且 completion hook 在并发下只应成功触发一次；`team_task_list` 只暴露当前有效成员名下的任务，不让 removed member 的旧任务继续污染视图。
- [x] 已确认 `wait / wait_team` 是正式 lifecycle surface，不是聊天里说一句“等一下”：它们会发 `CollabWaitingBegin/End` 事件，支持 `Any/All` 模式、timeout、triggered_member，以及 team-level idle hook。
- [ ] 下一轮：继续补 `thread_id / openai_models / dynamic_tools` 尾项，并把 durable team workflow 与 protocol objects 统一压成一块“前台不是真相，inbox/task/wait/events 才是真相面”的总结。

## 2026-03-12 16:42:33（继续补 thread identity / model catalog / rollout index）
- [x] 已继续深读 `protocol/thread_id.rs / openai_models.rs` 与 `rollout/metadata.rs / session_index.rs / list.rs / state/service.rs / context_manager/mod.rs`，把“线程如何被标识、rollout 如何被索引、模型目录如何被协议化”补齐。
- [x] 已确认 `ThreadId` 不是临时字符串，而是 UUIDv7 的强类型协议对象；它在 TS/JSON Schema 面仍以字符串出现，但语义上是可生成、可解析、可跨边界稳定传递的 opaque handle。
- [x] 已确认模型目录不是“slug 列表”，而是 rich catalog object：`visibility / supported_in_api / shell_type / reasoning presets / truncation policy / context_window / auto_compact limit / input modalities / prefer_websockets / personality template` 都是一等协议字段。
- [x] 已确认 `rollout/metadata.rs` 说明 state db 元数据是从 rollout 派生和回填出来的：优先吃 `SessionMeta`，缺失时才从文件名回推 `thread_id + created_at`；dynamic tools 也会从 session meta 回填进 state db。
- [x] 已确认 `session_index.jsonl` 是 append-only 的 thread-name alias index，不是事务型真源数据库；名字解析按“从尾部反扫、最后一条获胜”的 append order 语义进行。
- [x] 已确认 `state::SessionServices` 把 auth/models/mcp/skills/exec-policy/hooks/network-approval/state-db/model-client 聚成 session-scoped 服务集，这继续支持“高价值 harness 在控制面对象和服务编排里，不在前台人格里”。
- [ ] 下一轮：继续往 `protocol/config_types / custom_prompts / message_history / lib` 与 `rollout/metadata + state_db` 的边界补齐，收口“derived index vs durable truth vs runtime projection”的三层总结块。

## 2026-03-12 16:46:16（继续补 config types / custom prompts / app-server v1 compatibility）
- [x] 已继续深读 `protocol/config_types.rs / custom_prompts.rs / message_history.rs / lib.rs` 与 `app-server-protocol/mappers.rs / mod.rs / v1.rs`，把“底层协议对象、兼容层、前台可见配置”的分工补齐。
- [x] 已确认 `config_types.rs` 把大量“前台看起来像设置”的东西钉成正式协议类型：`SandboxMode / WindowsSandboxLevel / Personality / WebSearchMode / TrustLevel / AltScreenMode / ModeKind / CollaborationMode / CollaborationModeMask` 都是一等配置对象，不是 prompt 文案。
- [x] 已确认 `ModeKind` 与 `CollaborationMode` 的高价值是“模式 preset + settings mask”，并且 `request_user_input` 允许性直接绑在 mode 上；这说明协作模式本身就是控制面对象，而不是 UI 标签。
- [x] 已确认 `custom_prompts.rs` 只是 slash-command 级别的扩展对象（`prompts:name`），它更像命令目录，不是 thread/turn 主控制面。
- [x] 已确认 `message_history.rs` 再次把全局文本历史压回低层：它只有 `conversation_id / ts / text`，只是轻量 history entry，不应与 rollout 或 durable thread history 混同。
- [x] 已确认 `app-server-protocol v1` 更像兼容层和客户端壳：它复用 core protocol 类型，但仍保留旧式 `conversation` 命名、one-off command、saved config/profile 这些前台视图对象；`mappers.rs` 也说明 v1 到 v2 存在显式转换层，而不是同一层真相对象。
- [ ] 下一轮：继续补 `protocol/account / parse_command / models / num_format` 与 `app-server-protocol common/v2` 尾部，把“core protocol / app-server compatibility shell / front-end convenience objects”三层总结正式收口。

## 2026-03-12 16:50:32（继续补 account / parse_command / models / num_format）
- [x] 已继续深读 `protocol/account.rs / parse_command.rs / models.rs / num_format.rs`，把“账户计划、命令解析、响应项对象、展示格式”这层基础语义补齐。
- [x] 已确认 `account.rs` 目前在 protocol 层的高价值很窄：`PlanType` 只是标准化账户等级枚举，说明 account 面在底层首先是 capability/entitlement 标记，而不是前台叙事对象。
- [x] 已确认 `parse_command.rs` 把命令解析收成少数稳定语义类：`Read / ListFiles / Search / Unknown`；这说明高价值 harness 更偏向“有限可解释类别”，不追求把 shell 全量语义化。
- [x] 已确认 `models.rs` 是真正的响应对象与 developer-layer 装配中心：`ResponseItem` 汇总 `Message / Reasoning / LocalShellCall / FunctionCall / FunctionCallOutput / CustomToolCall / WebSearchCall / GhostSnapshot / Compaction`，而 `DeveloperInstructions::from_policy/from_collaboration_mode/model_switch_message` 把 permissions、sandbox、collaboration mode、model switch 装进 developer-layer 对象，而不是让前台自己拼文案。
- [x] 已确认 `models.rs` 还把 image 输入、tool output payload、`MessagePhase(commentary/final_answer)`、`SandboxPermissions` 等都对象化，进一步支持“前台看到的是受治理对象流，不是随意字符串”。
- [x] 已确认 `num_format.rs` 属于展示层基础设施：locale-aware separator 与 SI suffix 只负责把 token/数值变得可读，不参与 durable truth；这说明前台可读性本身也是一层独立 concern。
- [ ] 下一轮：继续补 `app-server-protocol/common.rs / v2.rs / thread_history.rs` 还未系统合并的尾项，再把 `core protocol objects / app-server rich view / front-end convenience formatting` 三层正式收口。

## 2026-03-12 16:56:45（继续补 structured human input / protocol catalog / rich thread history）
- [x] 已继续深读 `protocol/request_user_input.rs`，把“人类补输入”从聊天行为正式收口成结构化协议对象。
- [x] 已确认 `request_user_input` 的高价值语义是：`question/option/secret/other/answers-by-id/call_id/turn_id` 都被正式 schema 化，说明 supervisor-in-the-loop 应被建模成工具回路，不是自由聊天插话。
- [x] 已继续深读 `app-server-protocol/common.rs`，把它收口成“方法目录 + 版本边界 + experimental gating + schema export 层”，而不是业务逻辑层。
- [x] 已确认 `common.rs` 通过 `client_request_definitions / server_request_definitions / server_notification_definitions` 宏正式生成请求、通知、JSON schema 和实验能力边界；同时继续保留一段显式 `DEPRECATED` 的 v1 兼容面。
- [x] 已继续深读 `thread_history.rs`，把它收口成“由 rollout/event 重建 rich ThreadItem/Turn 视图”的整形层，不是 raw transcript 回放器。
- [x] 已确认 `thread_history` 的关键不变量是：late command completion / interrupt / complete 都优先按 `turn_id` 回挂原 turn；`rollback failed` 不应污染 turn；`ContextCompaction / review / collab wait/resume/close` 都会进入 rich item history。
- [ ] 下一轮：继续顺着 `protocol/common.rs` 的 request/notification 目录尾项，与 `thread_history` 的 rich item 重建规则做最后一次合并，收口“catalog layer vs workflow reconstruction layer”的总结块。

## 2026-03-12 17:00:51（继续补 approvals / MCP adapter / dynamic tool registry）
- [x] 已继续深读 `protocol/approvals.rs / mcp.rs / dynamic_tools.rs`，把“审批、MCP、动态工具”三类外挂对象的协议边界补齐。
- [x] 已确认 `approvals.rs` 的高价值不在 accept/decline 本身，而在 `approval_id / network_approval_context / proposed_execpolicy_amendment / grant_root / parsed_cmd` 这些 policy negotiation 字段。
- [x] 已确认 `mcp.rs` 的正确定位是“TS/JsonSchema 友好的适配层”：它把 wire-shaped MCP JSON 收成 `Tool / Resource / ResourceTemplate / CallToolResult` 等少量稳定协议对象，而不是把原始异构 JSON 直接暴露给前台。
- [x] 已确认 `dynamic_tools.rs` 的正确定位是“thread/turn 绑定的最小动态工具注册表”：`DynamicToolSpec / DynamicToolCallRequest / DynamicToolResponse` 都刻意收成少量稳定字段，输出面也只投影成文本/图片内容项。
- [ ] 下一轮：继续把 `approvals / mcp / dynamic_tools` 与前面已经读透的 `thread/turn/events/history` 对齐，收口“高价值 harness = 少量稳定对象 + 明确生命周期 + 可治理边界”的总结块。

## 2026-03-12 17:12:25（继续补 rich input / durable inbox / spawn lifecycle）
- [x] 已继续深读 `protocol/user_input.rs / multi_agents/inbox.rs / multi_agents/spawn.rs`，把“前台输入、团队收件箱、子代理启动”三层对象边界补齐。
- [x] 已确认 `user_input.rs` 的高价值在“富输入对象化”：`Text + text_elements / Image / LocalImage / Skill / Mention` 都是一等输入类型，说明前台输入面本身就是结构化协议层，不应退化成单字符串。
- [x] 已确认 `TextElement` 的 byte-range + placeholder 语义很关键：rich marker 应依附在原始 UTF-8 文本缓冲区上持久化和恢复，而不是通过改写用户字面文本来保留结构。
- [x] 已确认 `inbox.rs` 的正确定位是“durable inbox substrate”：`TeamInboxEntry / Cursor / AckToken` 共同形成 append-only JSONL + cursor.json 的持久收件机制，并用独占文件锁保证并发正确性。
- [x] 已确认 `spawn.rs` 的正确定位是“子代理生命周期控制器”：它负责深度限制、可选 worktree 租约、spawn begin/end 事件、subagent_start hook 注入、spawn_input 投喂和失败回滚，而不是简单的“再开一个 agent”。
- [ ] 下一轮：继续把 `user_input / inbox / spawn` 与前面已读的 `team wait/resume/task board` 合并，收口“durable collaboration surface”的总结块。

## 2026-03-12 17:17:26（继续补 resume/send_input/ask_lead escalation surface）
- [x] 已继续深读 `multi_agents/resume_agent.rs / send_input.rs / team_ask_lead.rs / multi_agents.rs`，把“恢复成员、持续投喂、向 lead 升级”这条协作回路补齐。
- [x] 已确认 `resume_agent` 不是简单 reopen，而是 rollout-backed recovery：先查活状态，`NotFound` 时才尝试 `resume_agent_from_rollout`；同时受 thread depth limit 约束，并在 `AgentLimitReached` 时尝试 reap 已结束成员为 slot 腾位。
- [x] 已确认 `send_input` 不是普通转发，而是受治理的 interaction lifecycle：可选先 `interrupt_agent`，随后发 `CollabAgentInteractionBegin/End` 事件，再提交结构化输入并回收最新成员状态。
- [x] 已确认 `team_ask_lead` 是 durable-first escalation：只有非 lead 且属于 team 的成员能调用；它会先把消息 append 到 lead inbox，再尝试 live delivery，因此返回值同时携带 `delivered / submission_id / inbox_entry_id / error` 两套真相。
- [x] 已确认 `parse_collab_input / input_preview` 把协作输入压成正式对象流：`message` 与 `items` 二选一、空 payload 明确报错；preview 则把 `text / image / local_image / skill / mention` 统一规范化，说明 team 协作不是裸聊天字符串。
- [ ] 下一轮：继续往 `protocol approvals / thread lifecycle` 的剩余尾项收边，优先补完“resume/interrupt/escalation 都属于正式 durable workflow，而不是 UI 小动作”的总括块。

## 2026-03-12 17:25:06（继续补 AgentControl / ModelClient / thread status 控制面）
- [x] 已继续深读 `core/src/agent/control.rs / agent/guards.rs / client.rs / app-server/tests/thread_status.rs / protocol.rs`，把“子代理控制器、turn 级客户端、thread 状态通知”这条控制面链补齐。
- [x] 已确认 `AgentControl` 是 per-session multi-agent control plane，不是 per-thread helper；`Guards` 让 depth/slot/nickname 治理绑定在同一用户会话上。
- [x] 已确认 `spawn_agent` 是两段式 governed lifecycle：先 reserve slot，再建 thread，再投首条输入；`resume_agent_from_rollout` 则会从 rollout 恢复并重建 source/nickname/role。
- [x] 已确认 `maybe_start_completion_watcher` 只对 `ThreadSpawn` 子代理启用，并在子代理终态时向父线程注入格式化 completion notification；这说明子代理完结回灌是正式控制面回路。
- [x] 已确认 `ModelClient` 是 session-scoped，而 `ModelClientSession` 是 turn-scoped；WebSocket sticky routing 依赖 `x-codex-turn-state`，subagent 来源则通过 `x-openai-subagent` 头显式上送，不应再靠 prompt 猜来源。
- [x] 已确认 `thread/status/changed` 是正式 runtime surface，且客户端可以按连接 opt-out；说明状态通知本身也是可治理协议面，不是默认必须全量消费。
- [ ] 下一轮：继续补 `ModelClient turn-state / websocket fallback / conversation headers / request-side truth` 的剩余实现语义，再和已读 `thread/turn/items/approvals` 合并成更稳定的控制面总图。

## 2026-03-12 17:29:57（继续补 initialize / turn_start / ModelClientSession 请求控制链）
- [x] 已继续深读 `core/src/client.rs` 的 turn-state / websocket request 路径，以及 `app-server/tests/suite/v2/initialize.rs / turn_start.rs / thread_status.rs`，把“客户端握手 -> thread_start -> turn_start -> provider request”这条链补齐。
- [x] 已确认 `ModelClientSession::build_responses_options()` 会把 `conversation_id + session_source + turn_state + turn_metadata_header` 一起下放到请求层；这说明 thread/source/sticky-state 是正式 transport 对象，不应由前台 prompt 自述代替。
- [x] 已确认 websocket prewarm 是 handshake-only，首次 turn 仍由显式 `response.create` 启动；而 websocket fallback 是 session-scoped，一旦禁用会影响后续 turns。
- [x] 已确认 `initialize` 会把 `clientInfo.name` 映射成 `user_agent/originator`，并严格校验其是否是合法 HTTP header；非法 client name 会在握手层直接被拒绝。
- [x] 已确认 `turn_start` 会把 `originator` 头真实带到 provider 侧，请求里的富输入 `text_elements` 也会原样进入 `ThreadItem::UserMessage`；这说明 rich input 和 client identity 都是协议真相，不是前台展示层拼接。
- [x] 已确认 `thread/status/changed` 和 `thread/started` 都支持按连接 opt-out；说明通知扇出是 connection-scoped capability，而不是所有客户端都必须全量接收同一通知流。
- [ ] 下一轮：继续补 `turn_start` 的 collaboration-mode / override default 语义，以及 `client.rs` 里的 append/create 选择与 incremental baseline，不让“请求控制链”停在半程。

## 2026-03-12 17:34:18（继续补 turn_start override 传播与 incremental append baseline）
- [x] 已继续深读 `app-server/tests/suite/v2/turn_start.rs / turn_steer.rs` 与 `core/src/client.rs` 的 websocket append/create 路径，把“本轮 override 如何进入后续默认层”与“多次请求如何保持同一 turn baseline”补齐。
- [x] 已确认 `collaboration_mode` 是高阶 preset：它会压过同轮 `model / effort` override，并把与 mode 绑定的 developer instructions 一起注入 provider 请求。
- [x] 已确认 `personality` override 不是每轮重复文案；只有真正发生变化时，后续 developer-layer 才会新增 `<personality_spec>` 注入。
- [x] 已确认 `turn_steer` 是 active-turn control，不是“补发一句用户消息”；必须命中当前活 turn 并带 `expected_turn_id` 才成立。
- [x] 已确认 `client.rs` 的 incremental baseline 不是“拿上一轮输入硬比”，而是 `previous_request.input + server-added items` 共同组成 baseline；只有非 input 字段完全一致、且新输入严格扩展 baseline 时，才允许 append。
- [x] 已确认 websocket v1/v2 的增量策略不同：v2 走 `response.create(previous_response_id=...)`，旧路径才走 `response.append`；两者都受 `can_append` 与 baseline 校验约束。
- [ ] 下一轮：继续补 `request-side truth` 的剩余尾项，重点收口“turn override -> new default layer -> incremental transport continuity”这条纵向链。

## 2026-03-12 17:34:12（继续补 config governance / model catalog / account refresh）
- [x] 已继续深读 `app-server/tests/suite/v2/config_rpc.rs / model_list.rs / account.rs`，把“配置治理、模型目录、账号刷新”三条控制面补齐。
- [x] 已确认 `config/read` 的高价值不只是返回 effective config，还会返回 `origins + ordered layers`；因此配置真相是可追溯分层对象，不该被降级成“当前值”快照。
- [x] 已确认 config layer precedence 至少包含 `managed -> user -> system`，而 project layer 还会按 `cwd + trust level` 动态加入；这说明 config 治理本身就是 runtime control plane。
- [x] 已确认 `config_value_write / batch_write` 带 `expected_version` 与 `configVersionConflict` 语义；说明配置写入是 versioned write，不是“最后写入者获胜”的盲改。
- [x] 已确认 `model/list` 的正确理解是 rich catalog + pagination surface：支持 `limit/cursor/include_hidden`，非法 cursor 会正式报错，而不是前台静默吞掉。
- [x] 已确认 `account` 的高价值语义是 `auth state + account metadata + refresh workflow`：外部模式下 `refresh_token=true` 不会私自发刷新请求；遇到 401 时才会走正式 `account/chatgptAuthTokens/refresh` 回路并重试。
- [ ] 下一轮：继续往 `config origins / versioned writes / account refresh` 与前面已读 `thread/turn/events/items` 合并，收口“配置与账号也是控制面对象，不是外围杂项”的总结块。

## 2026-03-12 17:41:57（继续补锁/Windows 沙箱 setup/rollout 自愈索引/prompt 模板层）
- [x] 已继续深读 `multi_agents/locks.rs`、`app-server/tests/windows_sandbox_setup.rs`、`rollout/list.rs`、`rollout/tests.rs`，并补读 `protocol/src/prompts/**` 的默认前导与权限模板文件。
- [x] 已确认 `multi_agents` 的 durable 协作底座不只靠逻辑 token，还靠真正的 OS 文件锁；Windows 分支使用 `share_mode(0)` 独占打开并对 `ERROR_SHARING_VIOLATION / ERROR_LOCK_VIOLATION` 做 50ms blocking retry。
- [x] 已确认 `windowsSandbox/setupStart -> windowsSandbox/setupCompleted` 是正式 RPC + completion notification 生命周期；Windows 沙箱 provisioning 本身就是受治理的控制面对象，不是隐形环境预处理。
- [x] 已确认 `rollout/list.rs + rollout/tests.rs` 的线程发现面是 `summary-first + capped scan + cursor pagination + filesystem fallback repair`；state db 路径失真或缺行时，会回退到 rollout 文件系统并自修复索引，说明 rollout 仍是真相源。
- [x] 已确认 `protocol/src/prompts/**` 更像控制对象的文本渲染层：`base_instructions/default.md` 与各类 `permissions/*.md` 只是把 approval/sandbox 状态翻译成前导文案，不应被误当成 durable truth 本体。
- [ ] 下一轮：继续扫 supplemental 尾部，优先补完剩余 `rollout/state/protocol` 边界文件，并把“对象层真相 vs 模板层/派生层”正式并入总括块。

## 2026-03-12 17:46:10（继续补 rollout 持久化策略与 agent teams 端到端不变量）
- [x] 已继续深读 `rollout/policy.rs`、`rollout/truncation.rs`、`multi_agents/tests.rs`、`core/tests/suite/agent_teams.rs`，把“什么会真正进入 durable rollout / memories，以及 team/worktree 的端到端不变量”补齐。
- [x] 已确认 rollout 持久化是明确筛选，不是全量事件落盘：`ResponseItem` 只保留少量稳定对象，`EventMsg` 按 `Limited/Extended` 分级持久化，且只有 `Plan` 类 `ItemCompleted` 会进入 limited rollout replay。
- [x] 已确认 memory 持久化与 rollout 持久化是两套不同过滤器：developer-role message、reasoning、ghost snapshot、compaction 不会默认进入 memories，说明“durable history”与“长期记忆”不是一层东西。
- [x] 已确认 rollout 截断按真实 user-turn 语义边界进行，并显式应用 `ThreadRolledBack` marker，同时忽略 `session_prefix`；这继续支持“有效历史”高于 raw stream。
- [x] 已确认 subagent/team 的 spawn 配置会继承 turn 级运行时上下文，但强制把 approval policy 收成 `Never`，resume 配置还会清掉 caller 的 `base_instructions`；说明 worker lifecycle 不是简单复制前台人格。
- [x] 已确认 `agent_teams` 端到端不变量是真实 durable workflow：task claim/complete 在并发下保持单成功，多余请求得到正式错误；team/worktree cleanup 会删掉 team config、task dir 和 worktree，并只在资源真正收口后释放 registry/slot。
- [ ] 下一轮：继续扫 remaining supplemental 尾项，优先确认还剩下的对象层文件是否还能提供新主结论；若不能，再收口为“无可做任务”。

## 2026-03-13 12:27:42（继续补 event mapping / ContextManager 导出面 / state 分层）
- [x] 已继续深读 `core/src/event_mapping.rs`、`context_manager/mod.rs`、`state/mod.rs`、`protocol/lib.rs`，把“raw item 如何被映射成 turn/item 真相，以及哪些模块被正式暴露为控制面对象”补齐。
- [x] 已确认 `event_mapping::parse_turn_item()` 会显式滤掉 `user instructions / skill instructions / session_prefix / user shell command`，并把图片标签正规化成 `UserInput::Image`；这说明真实 user-turn 是语义对象，不是 role=`user` 的机械切片。
- [x] 已确认 `event_mapping` 只把少量稳定对象提升成 `TurnItem`：`UserMessage / AgentMessage / Reasoning / WebSearch`；其他 raw `ResponseItem` 不会自动变成 turn-level 真相。
- [x] 已确认 `context_manager/mod.rs` 的导出面本身就是设计声明：真正高价值的是 `ContextManager / TotalTokenUsageBreakdown / estimate_response_item_model_visible_bytes / is_codex_generated_item / is_user_turn_boundary`，说明 runtime projection 优先级高于 raw transcript。
- [x] 已确认 `state/mod.rs` 把会话状态正式拆成 `SessionServices / SessionState / ActiveTurn / RunningTask / TaskKind`；因此 state 分层是 protocol/runtime 设计的一部分，不是代码组织巧合。
- [x] 已确认 `protocol/lib.rs` 暴露的是一组正式协议对象目录：`account / approvals / config_types / custom_prompts / dynamic_tools / items / mcp / models / plan_tool / request_user_input / user_input`；这继续支持“对象中心高于前台人格中心”的总主线。
- [ ] 下一轮：继续扫剩余尾项，若新文件只重复既有共识而不新增主结论，则收口为“无可做任务”。

## 2026-03-13 12:36:16（继续补 state/session / active turn / rollout init error）
- [x] 已继续深读 `core/src/state/session.rs`、`state/turn.rs`、`rollout/error.rs`，把“session 级可变控制面、active turn 协调层、session storage fatal 边界”补齐。
- [x] 已确认 `SessionState` 不只是 history 容器，而是 session-scoped mutable control plane：它正式持有 `previous_model`、rate limits、dependency env、MCP/connector selection、startup regular task 与 reference context item。
- [x] 已确认 `ActiveTurn/TurnState` 是独立于 durable history 的协调层：pending approvals、pending user input、pending dynamic tools、pending input 都明确停留在 active turn，而不会混写进 rollout 真相层。
- [x] 已确认 `rollout/error.rs` 把 session storage 访问失败正式提升成 operator-facing fatal state：权限、缺失、路径类型异常、数据损坏都映射成明确修复提示，说明 session storage 本身就是平台级依赖，不是实现细节。
- [ ] 下一轮：继续扫剩余 supplemental 尾项；若新文件只继续重复“对象层真相高于前台人格”而不新增边界，就收口为“无可做任务”。

## 2026-03-13 12:39:40（继续补 session service graph / plan tool schema / account entitlement）
- [x] 已继续深读 `core/src/state/service.rs`、`protocol/src/plan_tool.rs`、`protocol/src/account.rs`，把“会话级服务图、计划工具语义、账号分级边界”补齐。
- [x] 已确认 `SessionServices` 是会话级服务编排图，不是外围杂项：`auth/models/MCP/skills/exec policy/hooks/network approval/state_db/model_client` 都被正式并入同一 session-scoped service layer。
- [x] 已确认 `plan_tool.rs` 的 `update_plan` 语义是受限 checklist protocol：只有 `Pending / InProgress / Completed` 三态与结构化 `step`，说明计划对象被有意收成可治理工单层，而不是开放式自由文本规划器。
- [x] 已确认 `account.rs` 的 `PlanType` 只是 entitlement taxonomy（Free/Go/Plus/Pro/Team/Business/Enterprise/Edu），用于账户能力分层，不应被误读成执行模式或 thread/turn 控制对象。
- [ ] 下一轮：继续扫剩余 supplemental 尾项；若不再出现新的分层或边界语义，就收口为“无可做任务”。

## 2026-03-13 12:42:45（继续补 rollout recorder 物化生命周期 / command-directory extension layer）
- [x] 已继续深读 `core/src/rollout/mod.rs`、`rollout/recorder.rs`、`protocol/src/custom_prompts.rs`，把“rollout 何时真正落盘、state_db 如何与 rollout 对账、custom prompts 属于哪一层”补齐。
- [x] 已确认 `RolloutRecorder` 不是天然一直在写的被动 append log，而是显式物化工件：fresh session 只预计算 path/meta，只有显式 `persist()` 才真正 materialize rollout 文件。
- [x] 已确认 `record_items` 只是队列化可持久化对象，`persist/flush/shutdown` 才是一等生命周期动作；没有 `persist()`，即使缓冲了 user-message-like items 也不会自动落盘。
- [x] 已确认 rollout 列表与恢复继续保持 filesystem-first：thread 发现先扫 rollout 文件，再在需要时修复 `state_db` 路径；`state_db` 仍是 derived index，不是 durable truth。
- [x] 已确认 `custom_prompts.rs` 继续只属于 slash-command/命令目录扩展层，不属于 thread/turn 主控制面。
- [ ] 下一轮：继续扫剩余 supplemental 尾项；若不再出现新的 lifecycle/object boundary，而只是在重复既有结论，就收口为“无可做任务”。

## 2026-03-13 12:48:48（继续补 settings diff 注入顺序 / state_db 派生索引治理）
- [x] 已继续深读 `core/src/context_manager/updates.rs` 与 `core/src/state_db.rs`，把“设置更新如何进入模型可见上下文、state_db 的派生索引语义有多正式”补齐。
- [x] 已确认 settings update 不是整包重放，而是按优先级注入差分对象：`model switch -> environment diff -> permissions -> collaboration mode -> personality`。
- [x] 已确认 `EnvironmentContext` 只在与上一轮相比发生有效 diff 时才生成 update item，且比较时忽略 shell 差异；这继续支持 runtime projection 是 sparse diff，不是全量重放。
- [x] 已确认 `state_db` 不只是缓存：它有 `feature gate + backfill-complete gate + reconcile/read-repair/apply` 这整套派生索引治理语义，但真相源仍是 rollout 文件系统。
- [ ] 下一轮：继续扫剩余 supplemental 尾项；若不再出现新的对象层边界，而只是在重复“对象/事件/rollout 高于前台自述”，就收口为“无可做任务”。

## 2026-03-13 12:50:41（继续补 agent role 配置层 / event-derived status）
- [x] 已继续深读 `core/src/agent/mod.rs`、`agent/role.rs`、`agent/status.rs`、`agent_names.txt` 与 `builtins/explorer.toml`，把“agent role 到底是 prompt 标签还是配置层、agent status 如何得出”补齐。
- [x] 已确认 agent role 不是人格标签，而是会被插入 `config_layer_stack` 的正式配置层；其来源是 `ConfigLayerSource::SessionFlags`，并且遵循 preserve-unspecified-keys 与 ordered precedence。
- [x] 已确认 built-in role catalog 当前是 `default / explorer / worker` 三种；其中 `explorer` 当前主要是声明性角色描述，内建 `explorer.toml` 为空，说明它暂时更像治理提示而不是重配置 preset。
- [x] 已确认 agent status 不是前台自述，而是从事件流派生：`TurnStarted -> Running`，`TurnComplete -> Completed(last_message)`，`TurnAborted/Error -> Errored`，`ShutdownComplete -> Shutdown`。
- [ ] 下一轮：继续扫剩余 supplemental 尾项；若只剩同义重复而不再新增对象层边界，就收口为“无可做任务”。

## 2026-03-13 12:54:23（继续补 plan block parser / turn diff truth / hierarchical project docs / turn metadata / request_user_input gate）
- [x] 已继续深读 `core/src/proposed_plan_parser.rs`、`turn_diff_tracker.rs`、`project_doc.rs`、`turn_metadata.rs` 与 `tools/handlers/request_user_input.rs`，把“计划块如何被识别、文件差异真相如何形成、项目文档如何分层发现、turn 元数据如何上送、人工补输入何时开放”补齐。
- [x] 已确认 plan 不是模糊自然语言检测，而是显式 `<proposed_plan>...</proposed_plan>` 标签块；解析器是 line-based streaming parser，`finish()` 会闭合未终止块，`strip/extract` 分别负责去壳与提取 plan 正文。
- [x] 已确认 turn 级文件差异真相不是 patch 文案回放，而是“首次触达时建立 baseline snapshot + 稳定内部 UUID 文件名 + 当前磁盘状态重算 unified diff”；rename 跟踪是对象级的，不是纯路径字符串级的。
- [x] 已确认 project docs 不是“读一个本地 AGENTS.md”，而是从 git root 到 cwd 的层级发现管线；`AGENTS.override.md` 优先于 `AGENTS.md`，并受 `project_doc_max_bytes`、fallback filename、skills/js_repl/child-agents 附加层共同治理。
- [x] 已确认 `TurnMetadataState` 通过 header 上送 `turn_id + sandbox tag + repo_root/workspace git metadata`；git enrichment 是后台异步增强，不阻塞 base header 生成。
- [x] 已确认 `request_user_input` 在 core handler 层有正式 mode gate：只在允许的 collaboration mode 下可用；每题必须有非空 options，且会强制补 `is_other=true`，取消则走正式 error path。
- [ ] 下一轮：继续扫剩余白名单 supplemental；若新文件只重复既有分层而不再新增 durable/object boundary，则收口为“无可做任务”。

## 2026-03-13 13:02:11（继续补 compaction / MCP tool catalog / network decision / session prefix / review target / web search display）
- [x] 已继续深读 `core/src/compact.rs`、`review_format.rs`、`review_prompts.rs`、`mcp_connection_manager.rs`、`network_policy_decision.rs`、`session_prefix.rs` 与 `web_search.rs`，把“压缩如何保持 in-distribution、MCP 工具目录如何聚合、网络决策如何进入审批上下文、哪些 user-role 前导不算真实 user turn、review prompt 如何 target-resolve、web search 细节属于哪一层”补齐。
- [x] 已确认 compaction 不是后台黑盒：它本身也是 turn/item lifecycle，并显式区分 `BeforeLastUserMessage` 与 `DoNotInject` 两种 initial-context reinjection 策略；pre-turn/manual compaction 不注入初始上下文，mid-turn compaction 才会把初始上下文插到最后真实 user 前。
- [x] 已确认 compaction 请求会先剥离 trailing `<model_switch>` developer message，成功后再重新挂回；`ContextWindowExceeded` 会触发“移除最旧历史项后重试”，而无效 compact payload/其他 fatal 错误则会正式 stop。
- [x] 已确认 MCP 连接管理器的高价值不只是“连上服务器”，而是按 server 聚合工具目录，并把 fully-qualified tool name 规范化成 Responses API 允许的稳定名字；startup/status/elicitation 也都进入正式事件与审批回路。
- [x] 已确认 network policy 决策是结构化对象：只有 `Ask + Decider` 才会提升成 `NetworkApprovalContext`；deny 消息也不是自由文案，而是从 machine reason code 映射成用户可读解释。
- [x] 已确认 `<environment_context> / <turn_aborted> / <subagent_notification>` 都是 model-visible session prefix；它们虽以 user-role 进入模型视图，但不应形成真实 user-turn boundary。
- [x] 已确认 review target 不是自由 prompt，而是 target-resolved request：`uncommitted / base branch(merge-base) / commit / custom` 各有正式 prompt 生成逻辑；`web_search` 细节函数则只是展示层摘要，不是 durable search truth。
- [ ] 下一轮：继续扫剩余白名单 supplemental；若新文件只在重复“对象层真相、派生层和展示层分离”而不再新增边界，则收口为“无可做任务”。

## 2026-03-13 13:08:54（继续补 command canonicalization / mentions / user_shell_command / provider catalog / connectors / exec policy）
- [x] 已继续深读 `core/src/command_canonicalization.rs`、`mentions.rs`、`user_shell_command.rs`、`model_provider_info.rs`、`connectors.rs` 与 `exec_policy.rs`，把“审批缓存如何稳定命中、mention 如何转 app/skill 对象、用户 shell 记录如何进入模型视图、provider/connectors 如何对象化、exec policy 如何成为正式治理层”补齐。
- [x] 已确认 command approval cache 不是拿原始 argv 直接匹配，而是先 canonicalize：普通 `bash -lc` 单命令会被还原成内层 argv；复杂 shell heredoc 与 PowerShell wrapper 会落成稳定 script key，避免包装器路径差异击穿审批缓存。
- [x] 已确认 mention 收集不是字符串启发式，而是把 linked text mention、structured mention、app path/skill path 分层归并成对象；connector/app 显式引用会被收成 app id 集合，而非裸文本标签。
- [x] 已确认 `user_shell_command` 会把命令、退出码、时长、聚合输出包装成 model-visible 的 `<user_shell_command>` user-role 记录；它属于运行态前导/记录层，而不是用户意图层。
- [x] 已确认 `ModelProviderInfo` 不是“模型名 + base_url”小配置，而是 rich provider object：`wire_api / auth mode / headers / query params / retries / stream idle timeout / websocket support` 都属于 provider 语义本体。
- [x] 已确认 connectors 面不是 raw MCP 工具列表，而是 feature-gated、按 account/chatgpt_base_url keyed 的 accessible-connectors 目录缓存；`codex_apps_ready` 与缓存 TTL/force_refetch 都属于目录治理，而不是前台便利层。
- [x] 已确认 `ExecPolicyManager` 是正式 policy layer：它组合规则文件、safe/danger heuristics、approval policy、sandbox policy 与 prefix-rule amendment；approval prompt/reject/forbidden 不是前台人格判断，而是策略求值结果。
- [ ] 下一轮：继续扫剩余白名单 supplemental；若剩余文件只重复“控制对象高于前台自述、派生层/展示层分离”的共识，就收口为“无可做任务”。

## 2026-03-13 13:10:07（继续补 auth/api bridge/realtime/MCP/runtime pipeline）
- [x] 已继续深读 `core/src/auth.rs`、`auth/storage.rs`、`api_bridge.rs`、`realtime_conversation.rs`、`mcp_tool_call.rs`、`memory_trace.rs`、`network_proxy_loader.rs` 与 `codex.rs`，把“鉴权刷新、API 错误映射、Realtime 会话、MCP 调用生命周期、trace->memory 管线、网络代理加载、Session 集成面”补齐。
- [x] 已确认 auth 不是简单凭据存取：`AuthMode/CodexAuth/ExternalAuthRefreshContext` 都是正式控制面对象；`auth/storage.rs` 还把持久化分成 `file/keyring/auto/ephemeral` 四种模式，且 `auto` 会在 keyring 不可用时回落到文件存储。
- [x] 已确认 API 错误不是前台提示文案，而是正式 runtime category：`api_bridge.rs` 会把 context window、quota、usage-not-included、retry-limit、overload、invalid-image 等精确映射成 `CodexErr`，并把 `request id / cf-ray / active limit` 这类追踪元数据一并保留下来。
- [x] 已确认 realtime conversation 是独立 runtime subsystem，不是普通 thread/turn 的聊天变种：它有单独的 `start/audio_in/text_in/shutdown` 生命周期、独立的输入队列、正式的 started/closed/realtime event fanout，并允许把 `conversation_id` 对齐成 realtime session id。
- [x] 已确认 MCP tool call 是正式的审计化工作流：`parse args -> begin event -> optional approval -> call -> result sanitize -> end event -> analytics`；对不支持图片输入的模型，MCP 图片结果还会被显式降格成文本占位。
- [x] 已确认 `memory_trace.rs` 的 trace-to-memory 不是随手记笔记，而是 ETL 型标准化流水线：加载 trace、解码/归一化 payload、过滤允许项，再交给 model client 生成 memory summary。
- [x] 已确认 `network_proxy_loader.rs` 的网络代理状态来自分层配置和可信约束，而不是平铺读取配置文件；用户/项目/session 层不会反过来抬高 trusted constraints，且整体带 mtime reloader。
- [x] 已确认 `codex.rs` 继续把主轴收束到 Session 集成面：`RealtimeConversationManager / SessionServices / RolloutRecorder / MCP manager / memories / network proxy / TurnMetadataState` 等都汇聚到 session control plane，而不是散落的前台附属能力。
- [ ] 下一轮：继续扫剩余白名单 supplemental；若新文件不再新增 durable/object boundary，而只是在重复“对象层真相高于前台自述”的共识，就收口为“无可做任务”。

## 2026-03-13 13:16:25（继续补 model presets / network approval / MCP auth / skill metadata / plan handler）
- [x] 已继续深读 `models_manager/model_info.rs`、`models_manager/model_presets.rs`、`tools/network_approval.rs`、`tools/handlers/plan.rs`、`mcp/auth.rs`、`config/network_proxy_spec.rs`、`skills/model.rs` 与 `function_tool.rs`，把“fallback model metadata、preset 层、network approval service、plan tool 真用途、MCP OAuth 登录支持、network proxy spec、skill 元数据与 function tool 错误语义”补齐。
- [x] 已确认 `model_info.rs` 把 runtime model descriptor 与 picker preset 再次拆开：unknown slug 仍会生成带 `context_window/truncation_policy/input_modalities` 的 fallback `ModelInfo`，而 config override 可继续覆盖 `context_window/auto_compact/tool_output_limit/base_instructions`，说明 runtime model truth 不是前台 picker 文案。
- [x] 已确认 `model_presets.rs` 只是 entitlement/picker catalog：`is_default/show_in_picker/upgrade/supports_personality/default_reasoning_effort` 都属于选择层；preset 不等于 runtime `ModelInfo` 本体。
- [x] 已确认 `tools/network_approval.rs` 把网络放行做成正式 approval service：区分 `Immediate/Deferred`、按 `host+protocol+port` 去重、支持 `AllowOnce/AllowForSession/Deny`，并通过 pending approval/notify/session_approved_hosts 做会话级网络授权缓存。
- [x] 已确认 `config/network_proxy_spec.rs` 把网络代理启停做成受 sandbox policy 影响的正式 builder：在 `ReadOnly/WorkspaceWrite` 下开启 approval flow 时，allowlist miss 会被提升成 `NetworkDecision::ask("not_allowed")`，而不是直接硬拒绝。
- [x] 已确认 `tools/handlers/plan.rs` 再次钉实：`update_plan` 的真正价值在结构化输入和 `EventMsg::PlanUpdate`，不是返回给模型的文本；而且该工具在 `Plan` mode 下反而是显式禁用的，说明 plan item 是客户端渲染的治理对象，不是模型自用推理工具。
- [x] 已确认 `mcp/auth.rs` 说明 MCP auth 也是目录化状态面：只有 `StreamableHttp` 且未绑定 bearer env var 时才探测 OAuth 登录支持；最终按 server 生成 `McpAuthStatusEntry` 目录，而不是前台临时探测。
- [x] 已确认 `skills/model.rs` 把 skills 目录继续对象化：`SkillMetadata` 除描述外还含 `interface/dependencies/policy/permissions/scope`；而 `allow_implicit_invocation` 与 disabled path 集合共同决定“哪些 skill 可被默认隐式触发”。
- [x] 已确认 `function_tool.rs` 把 function tool 失败收成极少数稳定类别：`RespondToModel / MissingLocalShellCallId / Fatal`，说明 tool 错误面也在有意压缩成少量可治理语义，而不是自由异常文本。
- [ ] 下一轮：继续扫剩余白名单 supplemental；若新文件只是在重复“目录层/策略层/对象层高于前台自述”的共识，而不再新增 durable boundary，就收口为“无可做任务”。

## 2026-03-13 13:19:52（继续补 task runner / BM25 tool discovery / network approval lifecycle）
- [x] 已继续深读 `tasks/compact.rs`、`tasks/review.rs`、`tools/handlers/search_tool_bm25.rs` 与 `tools/network_approval.rs`，把“任务 runner 如何路由本地/远程 compact、review 如何以 one-shot reviewer 子线程运行、工具搜索如何变成目录面、network approval 如何形成会话级等待/缓存/去重”补齐。
- [x] 已确认 `tasks/compact.rs` 证明 compact task 只是 task runner 壳：真正的关键不在 task 本身，而在它会按 provider 选择 `local compact` 或 `remote compact` 路径，并把 compact 作为正式 `TaskKind::Compact` 上报指标。
- [x] 已确认 `tasks/review.rs` 证明 review 是真正的 detached reviewer workflow：它会启动一条带 `REVIEW_PROMPT`、禁用 web/collab、`approval_policy=Never` 的 sub-codex one-shot 线程，再把 `ReviewOutputEvent` 结构化回灌并显式 `ExitedReviewMode`，而不是前台顺手“再看一眼”。
- [x] 已确认 `search_tool_bm25.rs` 说明 tool discovery 不是把所有工具直接塞给模型，而是先基于 `name/title/description/connector/input_keys` 建 BM25 目录，再把搜索命中的工具并回当前 MCP selection；这再次支持“目录面高于全量热插拔暴露面”。
- [x] 已确认 `tools/network_approval.rs` 把网络审批继续做实成 formal service：它区分 `Immediate/Deferred`，按 `host+protocol+port` 去重，维护 pending approval、会话级 `session_approved_hosts`，并把策略拒绝与用户拒绝分别记录成不同 outcome。
- [ ] 下一轮：继续扫剩余白名单 supplemental；若剩余文件只是在重复“对象层/任务层/目录层高于前台自述”的共识，而不再新增 durable boundary，就收口为“无可做任务”。

## 2026-03-13 13:28:43（继续补 tool assembly / router / registry / skills injection / config service / profile）
- [x] 已继续深读 `core/src/tools/spec.rs`、`tools/router.rs`、`tools/registry.rs`、`skills/injection.rs`、`skills/manager.rs`、`config/service.rs`、`config/profile.rs` 与 `tools/orchestrator.rs`，把“工具面如何从 model/features 派生、tool 调用如何经 registry/hooks/gate 协调、skills 如何注入并带 scoped hooks、config service 如何做分层读写、profile 如何作为配置包、orchestrator 如何统一 approval+sandbox+retry”补齐。
- [x] 已确认 `tools/spec.rs` 继续把工具面钉成派生目录层：`ToolsConfig` 来自 `model_info + feature flags + web_search_mode`，shell/apply_patch/search/js_repl/collab 都是 capability-gated assembly，不是 prompt 文案里随手列几个工具名。
- [x] 已确认 `tools/router.rs` 把 raw model item 正式转换成 `ToolCall{tool_name,call_id,payload}`；`Function/Custom/LocalShell/MCP` 各走不同 payload 路径，`js_repl_tools_only` 还能显式阻断 direct tool call，说明“是否允许直接调工具”属于受治理的路由规则，而不是前台人格约定。
- [x] 已确认 `tools/registry.rs` 把 tool 执行统一成正式治理流水线：`handler kind match -> mutating gate -> pre-tool hook -> handle -> post-tool/post-failure hook -> response item`；tool 真相继续在 registry/hook/gate/object 层，不在前台自然语言解释。
- [x] 已确认 `skills/injection.rs` 说明 skill 注入不是“把 SKILL.md 文本塞进 prompt”这么简单；skills 会变成正式 `ResponseItem`，还能从 frontmatter 解析出 skill-scoped hooks，并上报 analytics，说明 skill 也是目录化对象+生命周期钩子，不是松散说明文档。
- [x] 已确认 `skills/manager.rs` 把 skills 做成 per-cwd cache + config-layer-root discovery；它会结合 config layer stack、agents roots、extra user roots 与 disabled paths 统一产出 `SkillLoadOutcome`，说明 skills 真相也在分层目录加载，不在前台列举。
- [x] 已确认 `config/service.rs` 不是“改 config.toml 的小工具”，而是正式 config control plane：`read` 会返回 `effective + origins + ordered layers`，`write/batch_write` 是限定路径下的 versioned write，并对 readonly layer/path mismatch 抛正式错误。
- [x] 已确认 `config/profile.rs` 说明 profile 只是常用配置包（`model/provider/approval/sandbox/effort/personality/web_search` 等）的聚合层，不是 runtime model truth 或 thread/turn 控制对象本体。
- [x] 已确认 `tools/orchestrator.rs` 继续钉实：approval、sandbox selection、network approval、retry/escalation 都在同一个执行编排层里；真正值钱的是“统一的批准-尝试-升级”语义，不是前台人格决定要不要重试。
- [ ] 下一轮：继续扫剩余 supplemental；若新文件只是在重复“assembly/catalog/orchestrator 层高于前台自述”的共识，而不再新增 durable boundary，就收口为“无可做任务”。

## 2026-03-13 13:33:51（继续补 memories pipeline / tool events / sandbox policy substrate / MCP skill dependency install）
- [x] 已继续深读 `memories/storage.rs`、`memories/phase1.rs`、`memories/phase2.rs`、`memories/start.rs`、`memories/prompts.rs`、`memories/usage.rs`、`tools/context.rs`、`tools/events.rs`、`tools/parallel.rs`、`tools/sandboxing.rs`、`config/permissions.rs` 与 `mcp/skill_dependencies.rs`，把“memory 如何两阶段运行、tool event 如何对象化、并行执行如何按 tool capability 协调、审批/沙箱如何共享策略层、skills 的 MCP 依赖如何受治理安装”补齐。
- [x] 已确认 memory 不是单次摘要，而是正式两阶段流水线：`start.rs` 只在非 ephemeral、非 subagent、启用 `MemoryTool` 且存在 `state_db` 时启动；`phase1.rs` 负责 claim rollout job、按 stage-1 schema 抽取 `raw_memory/rollout_summary`；`phase2.rs` 负责全局 consolidation agent、同步 `raw_memories.md` 与 `rollout_summaries/`。
- [x] 已确认 `memories/storage.rs` 继续把 memory artifact 分层：`raw_memories.md` 是 stage-1 合并视图，`rollout_summaries/*.md` 是 thread 级摘要工件；无记忆时还会主动移除 `MEMORY.md / memory_summary.md / skills/`，说明 memory 文件系统面也是正式派生层，不是随手堆文件。
- [x] 已确认 `memories/prompts.rs` 说明 memory prompt 也是受 token budget 约束的正式模板层：stage-1 输入会按 active model 的 `context_window * effective_context_window_percent * CONTEXT_WINDOW_PERCENT` 截断 rollout 内容，而 memory tool developer instructions 只读 `memory_summary.md` 的受限摘要。
- [x] 已确认 `memories/usage.rs` 说明 memory 使用面也被对象化成 metrics：只对已知安全 command 做 parse，再把 `MEMORY.md / memory_summary.md / raw_memories.md / rollout_summaries / memories/skills` 归类打点，说明“读了哪类 memory artifact”是正式观测面。
- [x] 已确认 `tools/context.rs` 与 `tools/events.rs` 把 tool runtime 真相继续压回对象/事件层：`ToolInvocation/ToolPayload/ToolOutput` 是最小稳定对象，`ExecCommandBegin/End`、`PatchApplyBegin/End`、`TurnDiffEvent` 才是 durable event surface，不是前台文案。
- [x] 已确认 `tools/parallel.rs` 说明并行不是默认全开，而是 capability-gated：只有 `supports_parallel_tool_calls=true` 的工具走读锁并行，其余走写锁串行；用户 abort 也会被转成不同 payload 族的正式输出对象。
- [x] 已确认 `tools/sandboxing.rs` 继续把审批/沙箱钉成共享策略层：`ApprovalStore` 用序列化 key 做会话级缓存，`ExecApprovalRequirement` 区分 `Skip/NeedsApproval/Forbidden`，默认 approval requirement 由 `approval_policy + sandbox_policy` 共同决定。
- [x] 已确认 `config/permissions.rs` 说明网络权限不是单个布尔开关，而是正式 `PermissionsToml.NetworkToml -> NetworkProxyConfig` 映射层；`allowed/denied domains`、`proxy/admin URL`、`allow_local_binding`、`dangerously_*` 都属于对象化配置面。
- [x] 已确认 `mcp/skill_dependencies.rs` 说明 skills 触发 MCP 安装不是 prompt 技巧，而是正式的 gated workflow：非一方客户端不启用、full access 可自动装、否则走 `request_user_input` 结构化提问、`ConfigEditsBuilder.replace_mcp_servers()` 持久化，再按需触发 OAuth 登录。
- [ ] 下一轮：继续扫剩余 supplemental；若剩余文件只是在重复“对象层/事件层/派生层分离”的共识，而不再新增 durable boundary，就收口为“无可做任务”。

## 2026-03-13 13:41:42（继续补核心文件工具 handler / unified exec / Windows sandbox setup）
- [x] 已继续深读 `tools/handlers/apply_patch.rs`、`read_file.rs`、`list_dir.rs`、`grep_files.rs`、`shell.rs`、`unified_exec.rs`、`view_image.rs`、`dynamic.rs`，把“核心文件工具面如何受治理、统一执行如何成为正式进程生命周期、Windows sandbox setup 如何成为持久化控制动作”补齐。
- [x] 已确认 `apply_patch` 不是自由文本编辑技巧，而是 grammar-verified patch 对象；若命中 `apply_patch` 语法，会优先走专用 patch/runtime/orchestrator 流水线，而不是退化成普通 shell 命令。
- [x] 已确认 `read_file / list_dir / grep_files` 不是“随便读盘”工具，而是受限的 agentic search 原子面：绝对路径、分页、深度、缩进块、结果上限、超时都属于正式协议边界。
- [x] 已确认 `shell` 与 `unified_exec` 是两条不同执行面：前者更像单次受治理命令，后者是带 `process_id / write_stdin / watcher / deferred network approval cleanup / prune` 的正式进程生命周期。
- [x] 已确认 `view_image` 和 `dynamic_tool` 都继续支持“对象层高于前台自述”：图片注入依赖模型 input modality gate，动态工具依赖 thread/turn 级 request-response 注册表，而不是自由热插拔。
- [ ] 下一轮：继续扫剩余 supplemental；若新文件只是在重复“核心 handler 也服从对象/策略/生命周期层”的共识，而不再新增 durable boundary，就收口为“无可做任务”。

## 2026-03-13 13:49:31（继续补 runtimes / hooks executor / js_repl）
- [x] 已继续深读 `tools/runtimes/apply_patch.rs`、`shell.rs`、`unified_exec.rs`、`mod.rs`、`hooks_executor.rs` 与 `tools/handlers/js_repl.rs`，把“runtime 复用层、非命令 hooks 的双路径判决、受治理 JS 执行面”补齐。
- [x] 已确认 `tools/runtimes/*` 继续把 runtime 收成小而聚焦的 orchestrator 复用层：approval、sandbox、network approval、retry/escalation 仍由上层统一治理，runtime 本身只负责把请求落成最小 `CommandSpec/ExecEnv` 并执行。
- [x] 已确认 `runtimes/shell.rs` 与 `runtimes/unified_exec.rs` 的高价值差异不在“命令行长得像不像”，而在 lifecycle：前者是 one-shot command，后者是会返回 `UnifiedExecProcess`、走 deferred network approval、再由 process manager 接管的正式长进程面。
- [x] 已确认 `hooks_executor.rs` 把 non-command hooks 正式分成两条受治理路径：`prompt hook` 用模型按 JSON schema 给出 `ok/reason` 判决，`agent hook` 则以 `approval_policy=Never` 生成 one-shot agent、等待其结束、再从 rollout 读最后 assistant/compacted 输出做 JSON 判决。
- [x] 已确认 `js_repl.rs` 不是普通 shell 别名，而是 feature-gated、raw-JS-only 的专用执行面：拒绝 JSON/quoted/markdown fence 输入，支持 pragma `timeout_ms`，并把 begin/end 继续编码成正式 `ExecCommandBegin/End` 事件。
- [ ] 下一轮：继续扫剩余 supplemental；若新文件只是在重复“runtime 复用层和 hook/REPL 也服从对象/生命周期治理”的共识，而不再新增 durable boundary，就收口为“无可做任务”。

## 2026-03-13 14:05:34（继续补 MCP catalog / cache / collaboration mode preset / protocol roots）
- [x] 已继续深读 `core/src/mcp/mod.rs`、`mcp/auth.rs`、`models_manager/cache.rs`、`models_manager/collaboration_mode_presets.rs`、`models_manager/manager.rs`，并反查 `protocol/lib.rs`、`app-server-protocol/protocol/mod.rs`、`models_manager/mod.rs` 这些模块根文件。
- [x] 已确认剩余模块根文件大多只是 re-export/目录壳；当前仍有新增价值的，集中在 `mcp` 目录聚合、model cache 治理、collaboration mode preset 语义。
- [x] 已确认 MCP 的高价值不在 raw wire JSON，而在 `effective servers + auth statuses + snapshot collection + normalized tool/resource/template catalog` 这条受治理目录链。
- [x] 已确认 collaboration mode 继续更像 preset mask，不像自由人格；`Default/Plan` 的真正影响面在 developer instructions 和 `request_user_input` 可用性，而不是前台自述。
- [x] 已确认 model truth 继续分层：`cache TTL/version/etag`、`refresh strategy`、`auth gating`、`fallback metadata`、`config override` 共同决定运行态 catalog，不应退化成“前台模型名列表”。
- [ ] 下一轮：若后续剩余 supplemental 只能提供模块装配或同义重复，而不再新增 durable/object boundary，就收口为“无可做任务”。

## 2026-03-13 14:18:22（继续补 skill dependency install / discovery roots / permission compile / config edit）
- [x] 已继续深读 `mcp/skill_dependencies.rs`、`skills/loader.rs`、`skills/permissions.rs`、`skills/remote.rs`、`skills/env_var_dependencies.rs` 与 `config/edit.rs`，把“skill 的 MCP 依赖安装、skill roots/scope discovery、manifest 权限编译、配置写入持久化、remote skill 目录层、env-var 依赖输入”补齐。
- [x] 已确认 skills 的 MCP 依赖安装不是 prompt 技巧，而是 canonical dependency identity 去重、first-party gating、full-access 自动安装、否则走 `request_user_input + config persistence + OAuth` 的正式 workflow。
- [x] 已确认 local skill discovery 的真相在分层 root/scope 治理：repo/user/system/admin roots 会共同参与，但 repo 搜索不会逃逸 git root；去重按 canonical path，而不是按名称强行合并。
- [x] 已确认 skill manifest permissions 会编译成真实 permission profile：写根提升成 `WorkspaceWrite`，只读根收成受限 `ReadOnly`，网络权限也正式进入 sandbox/profile，而不是停留在说明文字。
- [x] 已确认 config edit engine 继续把配置写入钉成治理动作：只接受离散 mutation objects，并通过原子写入和注释/格式保留来持久化结构变化。
- [x] 已确认 remote skills 属于受 ChatGPT auth、product surface、scope 和 zip export/install 流程治理的远程目录层，不应与本地 skill 真相层混成一体。
- [x] 已确认 env-var skill dependencies 也是正式运行时契约：优先读 session cache 和环境变量，缺失时再走 secret `request_user_input`，并只在当前 session 内持有。
- [ ] 下一轮：继续扫剩余白名单 supplemental；若新文件只是在重复“catalog/policy/object 高于前台自述”的共识，而不再新增 durable boundary，就收口为“无可做任务”。

## 2026-03-13 14:24:56（收口前确认 schema/export/render 层）
- [x] 已补读 `config/schema.rs`、`skills/system.rs`、`skills/render.rs`，确认它们分别属于 schema/export、re-export、display layer。
- [x] 已确认 `config/schema.rs` 负责稳定导出 config schema fixture 与 key canonicalization，不新增 durable boundary。
- [x] 已确认 `skills/system.rs` 只是 system skills 安装与 cache root 的 re-export 壳，不新增控制面语义。
- [x] 已确认 `skills/render.rs` 只是把 skill 目录渲染成前台文案和使用说明，属于 display layer，不是真相层。
- [x] 结论已收口：当前白名单 supplemental 的高价值层已经基本读尽，剩余内容以 schema/export/render/wiring 重复为主。

## 2026-03-13 14:31:18（最后一轮 types/mod 壳层确认）
- [x] 已补读 `config/types.rs`、`config/mod.rs`、`skills/mod.rs`。
- [x] 已确认 `config/types.rs` 主要是类型定义与反序列化约束，不再新增 durable boundary。
- [x] 已确认 `config/mod.rs` 主要是装配壳与导出面，不再新增新的对象语义。
- [x] 已确认 `skills/mod.rs` 只是 skills 子模块的导出壳，不新增控制面信息。
- [x] 本轮结束条件再次满足：当前研究线不再新增 durable boundary，可按用户规则收口为“无可做任务”。

## 2026-03-13 14:46:30（新增 primary：AEglJaDW_80 / 新 RAG 打包）
- [x] 已定位新增内容：`D:\Projects\灵感包\转写目录\douyin_transcripts_20260313_mxai1_all\01_AEglJaDW_80.txt` 与同批新的 RAG 语料包更新。
- [x] 已先读新增 primary，再回到 `20260309_rag_corpus_v1` 读取 `README.md / source_catalog / tag_index / chunk_corpus` 做路由和索引校验。
- [x] 已确认新增 primary 没有推翻主线，而是继续加强“多 agent 只是升级链路，不是默认选项”。
- [x] 已确认新版 RAG 语料统计已更新为 `196` 文档、`12743` 句级单位、`2151` chunks，新增源已正式进入 `primary`。
- [ ] 下一轮：继续只盯新增项；若后续没有新的 primary/supplemental 高价值增量，再按用户规则收口。

## 2026-03-13 16:14:26（新增 RAG 配套文档：handoff / retrieval / schema）
- [x] 已补读 `handoff_prompt.md`、`retrieval_recipes.md`、`schema.md`，确认新 RAG 包的检索 SOP 和字段层级。
- [x] 已确认新包没有改写主判断，而是把检索顺序正式固定为：`tag_index -> source_catalog -> chunk_corpus -> sentence_corpus -> source_path`。
- [x] 已确认 `primary` 优先、`supplemental` 仅补充、`quality=degraded` 降置信度 这三条已被新 handoff/retrieval 文档显式写死。
- [ ] 下一轮：继续只盯真正新增文件；若没有新的 primary 或新的高价值 supplemental，则按用户规则收口。

## 2026-03-13 16:18:40（新增 RAG 构建脚本 / stats）
- [x] 已补读 `build_rag_corpus.py` 与 `corpus_stats.json`，确认这波新增不只是“多了文件”，而是 RAG 生成规则和统计对象也同步更新。
- [x] 已确认构建脚本把主证据层纳入规则代码化了：白名单批次、`source_id` 去重、批次优先级、`SKIP_FILE_NAMES`、`TAG_RULES`、`_all` 目录优先。
- [x] 已确认判断“新增是否真正进入主证据层”时，可靠检查顺序应升级为：构建脚本 -> source_catalog -> corpus_stats -> 原始新增文件。
- [ ] 下一轮：继续只盯真正新增文件；若没有新的 primary 或新的高价值 supplemental，则按用户规则收口。

## 2026-03-13 16:22:48（RAG 包内部 SOP 口径冲突核对）
- [x] 已核对 `build_rag_corpus.py` 生成的 `README.md` 与手写的 `handoff_prompt.md / retrieval_recipes.md`。
- [x] 已确认两者在检索顺序上存在轻微冲突。
- [x] 已确认当前运行时应优先采用更细的 `handoff_prompt + retrieval_recipes` 作为 SOP，而把生成型 `README` 视为概览层说明。
- [ ] 下一轮：继续只盯真正新增文件；若没有新的 primary 或新的高价值 supplemental，则按用户规则收口。

## 2026-03-13 16:26:14（RAG 冲突根因回到生成脚本）
- [x] 已补读 `build_rag_corpus.py` 后半段，确认 `schema / retrieval_recipes / handoff_prompt` 也全部由脚本直接生成。
- [x] 已确认当前冲突的根因在脚本模板本身，而不是产物层人工失同步。
- [x] 已确认如果未来要修这条研究入口，应改 `build_rag_corpus.py`，不应只改单个生成文件。
- [ ] 下一轮：继续只盯真正新增文件；若没有新的 primary 或新的高价值 supplemental，则按用户规则收口。

## 2026-03-13 17:50:24（新增 multi-agent 主证据横向收口）
- [x] 已将新增 `AEglJaDW_80` 与既有 `Jn3ywgwIpw0 / 91PTF0hfgek / iGqUPV2WN98` 做横向比较，确认这不是孤立观点，而是跨多源共识。
- [x] 已确认当前关于多 agent 的总主线可以稳定表述为：
  - 默认先单体与轻量路由；
  - 极度开放、领域冲突、真实并行三类场景满足时再升级；
  - 强耦合代码主线维持单决策流和集中写权限；
  - 多 agent 更适合研究、过滤、搜索、验证等弱耦合链路。
- [ ] 下一轮：继续只盯真正新增文件；若没有新的 primary 或新的高价值 supplemental，则按用户规则收口。

## 2026-03-13 18:06:47（研究线最终整合 / 去冲突 / 分层取舍）
- [x] 已停止继续扩读，改为最终整合。
- [x] 已创建 `D:\Projects\vrplayer\harness_executable_master_table.md`，把当前研究线压成可执行总表。
- [x] 已正式完成四件事：
  - 主证据层收口
  - 白名单 supplemental 收口
  - 冲突裁决
  - 默认主线 / 升级链路 / 暂不采纳 三层取舍
- [x] 后续这条研究线默认只做两类增量：
  - 真新增文件
  - 用总表指导实现窗口

## 2026-03-13 18:44:29（用户裁决补丁：高权限自动化不以隔离为前提）
- [x] 已将“高权限浏览器 / 桌面 / RPA 自动化不再以隔离环境为前提”同步写入总表与过程真源。
- [x] 已确认后续若仍保留自动化分层，其理由改为：稳定性、速度、调试成本和可维护性，而不是安全隔离。
- [x] 已确认这条裁决不会改写主研究结论，只会改写自动化升级链路的前提条件。

## 2026-03-13 20:41:15（main 恢复收口 / 继续实现窗口）
- [x] 已把 `agents.defaults.model.primary` 收口到 `custom-127-0-0-1-3000/gemini-3-flash-preview`，`main` 与 `telegram-fast` 当前都以 `flash` 为默认主模型。
- [x] 已把 `main.tools.profile` 固定为 `minimal`，并把默认能力面收口到：`group:fs`、`group:runtime`、`group:web`、`agents_list`、`sessions_spawn`、`subagents`、`session_status`、`memory_get`、`memory_search`。
- [x] 已确认 `openclaw.json` 不支持 `skillsFilter`；`main` 当前 runtime 仍默认注入 6 个 skills，不能再把“只剩 2 个 skills”当作运行真相。
- [x] 已追到 `main` 再次卡死的真根因：上一轮 `gateway --force` 残留了一条孤儿进程链（`cmd -> node -> node`），锁住了 `agent:main:main` 的 session file。
- [x] 已完成一次干净恢复：杀掉孤儿进程链、归档并重置 `C:\Users\Lenovo\.openclaw\agents\main\sessions`、重新拉起 Gateway。
- [x] 已完成 fresh 验证：`main` 单独执行最小请求成功，返回真实模型 `custom-127-0-0-1-3000/gemini-3-flash-preview`，耗时约 `2.1s`；`telegram-fast` 验证也成功。
- [ ] 下一轮：把“前台接单、后台承接”的运行口径继续固化到 `main/telegram-fast` 的工作区规则里，并围绕高权限浏览器 / 桌面 / Codex 执行链继续做产品化落地。

## 2026-03-14 12:39:42（新增两天转写已整合，继续推进实现主线）
- [x] 已补读新增两天转写：
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260314_mxai2_all\01_6qU71R2VmKk.txt`
  - `D:\Projects\灵感包\转写目录\douyin_transcripts_20260314_mxai2_all\02_mgq3Jua03KQ.txt`
- [x] 已按 RAG 入口真源复核：
  - `D:\Projects\灵感包\LATEST.md`
  - `D:\Projects\灵感包\灵感分包\20260309_rag_corpus_v1\data\source_catalog.jsonl`
  - `D:\Projects\灵感包\灵感分包\20260309_rag_corpus_v1\data\chunk_corpus.jsonl`
- [x] 已将新增结论固化到总表与 OpenClaw 工作区规则：默认单体、先 workflow、parallel 只用于独立速度/置信度收益、evaluator 只用于标准明确的质量打磨。
- [ ] 下一轮：继续把这套模式路由从“规则已写入”推进到“执行链已遵守”，重点核查 `main -> ops-exec` 是否在真实重任务里按 `single / workflow / parallel / evaluator-review` 做稳定分流。

## 2026-03-14 12:46:40（模式路由运行态收口）
- [x] 已对 `main / telegram-fast` 做 fresh 模式路由 smoke。
- [x] 已确认 `telegram-fast` 可以稳定把“固定流程图 + 中间校验”判到 `workflow/sequential`。
- [x] 已确认 `main` 即使在 fresh session 下仍会把同类问题误答成 `evaluator/review`。
- [x] 已完成两轮规则加固：
  - 在 `workspace/AGENTS.md` 与 `workspace-telegram-fast/AGENTS.md` 增加口诀式模式映射
  - 在 `workspace/TOOLS.md` 与 `workspace/MEMORY.md` 下沉同一套模式基线
- [x] 已完成运行态收口：后续默认由 `telegram-fast` 做前台自然语言模式初判，`main` 不再被当作这件事的权威解释器，而是负责已判定模式后的后台总管、review、compaction 与收口。
- [ ] 下一轮：继续核查 `main -> ops-exec` 的真实重任务分流，验证 `telegram-fast` 给出的模式判断能否被后台执行链稳定遵守。

## 2026-03-14 18:57:39（Windows node host 误报失败与双进程统计收口）
- [x] 已确认 `start-node-host.ps1` 的旧根因不是“启动太慢”单点问题，而是两层叠加：
  - 仍在使用过时的 `*openclaw*index.js*node run*--port 18789*` 指纹；
  - 成功条件把“节点已 connected”和“宿主进程存在”混在一起，导致会过早误报失败。
- [x] 已把 `C:\Users\Lenovo\.openclaw\start-node-host.ps1` 改成：
  - 优先在 gateway 健康时轮询 `openclaw nodes status --json` 的 `connected=true`；
  - gateway 未就绪时回退为轮询宿主进程存在；
  - 真指纹统一改为 `*openclaw*node run*--port 18789*`。
- [x] 已确认单次 `openclaw node run` 当前会形成“wrapper node -> real node”的双 `node.exe` 进程链，不代表重复启动。
- [x] 已把 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-heal.ps1` 的 `nodeHostCount` 修正为“只数根进程”，避免把单次宿主链误报成 2。
- [x] 已完成 stop/start 真回放：
  - 用新指纹杀掉 node host 后，`openclaw nodes status --json` 回到 `connected=false`
  - 运行 `start-node-host.ps1` 后，不再抛错
  - 节点恢复为 `connected=true`
  - `oc-runtime-heal.ps1` 返回 `nodeHostCount=1`
- [ ] 下一轮：继续寻找仍会误导运行面排障的展示口径，但不再重复折腾已经稳定的 node host 恢复链。

## 2026-03-14 19:51:14（统一 runtime truth 快照与 Telegram 口径分裂收口）
- [x] 已新增 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`，并固定使用官方 CLI `C:\Users\Lenovo\AppData\Roaming\npm\openclaw.cmd` 汇总采样：
  - `openclaw health --json`
  - `openclaw channels status --probe --json`
  - `openclaw browser status --json`
  - `openclaw nodes status --json`
  - `openclaw status --json`
  - `openclaw approvals get --json`
  - `openclaw sessions --all-agents --json`
  - `openclaw system presence --json`
- [x] 已让脚本同时读取 `main / telegram-fast / ops-exec` 的 `sessions.json + 最新 jsonl transcript`，并统一产出：
  - `D:\Projects\vrplayer\openclaw_runtime_truth.latest.json`
  - `D:\Projects\vrplayer\openclaw_runtime_truth.latest.md`
- [x] 已补齐 Markdown 输出的稳定性修复：
  - 模板中文标签已修正
  - `session=None` 时不会再炸
  - Markdown 改为 `utf-8-sig` 落盘，便于 Windows 环境直接读取
- [x] 已正式收口 Telegram 口径分裂：
  - `health --json` 当前仍会给出 `running=false / tokenSource=none`
  - `channels status --probe --json` 当前真实为 `running=true / tokenSource=config / mode=polling / probe.ok=true`
  - 因此后续判断 Telegram 通道运行真相时，优先信 `channels status --probe --json`
- [ ] 下一轮：如果继续推进，实现 `runtime truth` 在前台或监督入口的直接消费，而不是继续手工读 JSON/Markdown 文件。

## 2026-03-14 20:26:12（oc-runtime-truth 正式入口收口）
- [x] 已修复 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py` 的 retry 语法错误；当前 `run_json()` 会在空输出或非 JSON 输出时自动重试 3 次。
- [x] 已确认 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.ps1` / `.cmd` 三种模式均可 fresh 运行：
  - 默认 summary
  - `-Raw`
  - `-Markdown`
- [x] 已确认此前“打印成功但 exit code=1”的现象不是入口故障，而是把 `oc-runtime-truth.cmd ... | Select-Object -First ...` 当验证命令造成的截流假故障。
- [x] 当前 `runtime truth` 入口链已从“脚本可跑”升级为“正式可复用入口”。
- [ ] 下一轮：如果继续推进，把 `runtime truth` 继续前台化或监督入口化，而不是停留在命令行快照。

## 2026-03-14 20:35:47（runtime truth HTML 状态面收口）
- [x] 已让 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py` 同时产出：
  - `D:\Projects\vrplayer\openclaw_runtime_truth.latest.json`
  - `D:\Projects\vrplayer\openclaw_runtime_truth.latest.md`
  - `D:\Projects\vrplayer\openclaw_runtime_truth.latest.html`
- [x] 已把 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.ps1` / `.cmd` 扩成四种稳定模式：
  - 默认 summary
  - `-Raw`
  - `-Markdown`
  - `-Html`
- [x] 已完成 fresh 验证：四种模式全部返回 `exit code 0`。
- [x] 当前 `runtime truth` 已从“命令行快照脚本”升级成“命令行 + HTML 状态面”的正式消费入口。
- [ ] 下一轮：如果继续推进，把这份 HTML 状态面接到更直接的监督入口，而不是只保留为本地文件产物。

## 2026-03-14 20:40:23（runtime truth 一键打开入口）
- [x] 已把 `C:\Users\Lenovo\.openclaw\bin\oc-runtime-truth.ps1` 扩成支持 `-Open`。
- [x] `-Open` 当前行为已收口为：先 fresh 刷新 `runtime truth`，再直接用系统默认浏览器打开 `D:\Projects\vrplayer\openclaw_runtime_truth.latest.html`。
- [x] 当前监督入口已从“手工复制 HTML 路径去打开”前进到“单命令直接打开 HTML 状态面”。
- [ ] 下一轮：如果继续推进，把这套入口接到更显式的前台菜单或监督快捷方式，而不是只保留命令行形态。

## 2026-03-14 21:23:02（runtime truth 活错误与历史错误分层）
- [x] 已修改 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`，把 transcript 错误统计拆成：
  - `activeErrors`
  - `historicalErrorCount`
  - `recentErrors`
- [x] 已完成 fresh 回放，`oc-runtime-truth.cmd` 正常刷新 `json / md / html` 三份产物。
- [x] 已确认当前健康链路下：
  - `main.activeErrors=0`
  - `ops-exec.activeErrors=0`
  - `telegram-fast.activeErrors=0`
  - 历史旧错误继续保留在 `historicalErrorCount`
- [ ] 下一轮：如果继续推进，把 `activeErrors` 进一步接到更显式的监督快捷入口，而不是只停在快照文件里。

## 2026-03-14 21:33:46（默认监督快捷入口收口）
- [x] 已新增：
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise.ps1`
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise.cmd`
- [x] 当前 `oc-supervise` 默认行为已收口为：直接等价于 `oc-runtime-truth -Open`。
- [x] 已创建桌面快捷方式：
  - `C:\Users\Lenovo\Desktop\OpenClaw Runtime Truth.lnk`
  - 目标：`C:\Users\Lenovo\.openclaw\bin\oc-supervise.cmd`
- [x] 已完成 fresh 验证：
  - `oc-supervise.cmd -Markdown`
  - `oc-supervise.cmd -Raw`
  - 桌面快捷方式目标与工作目录校验
- [ ] 下一轮：如果继续推进，把这套监督入口继续接到更正式的前台菜单或状态托盘面，而不是只停在 wrapper + 桌面快捷方式。

## 2026-03-14 21:45:46（正式监督菜单面收口）
- [x] 已新增：
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise-menu.ps1`
  - `C:\Users\Lenovo\.openclaw\bin\oc-supervise-menu.cmd`
- [x] 菜单默认动作已固定为：
  - `OpenTruth`
  - `OpenMarkdown`
  - `OpenJson`
  - `HealRuntime`
  - `StartNodeHost`
- [x] 已新增桌面快捷方式：
  - `C:\Users\Lenovo\Desktop\OpenClaw Supervision Menu.lnk`
- [x] 已完成 fresh 验证：
  - `oc-supervise-menu.cmd -Action SelfTest`
  - `oc-supervise-menu.cmd -Action HealRuntime`
  - `oc-supervise-menu.cmd -Action OpenJson`
- [x] 已把 GUI 文案收回 ASCII，避免 Windows PowerShell 直接执行时受本机默认编码影响而报 parser error。
- [ ] 下一轮：如果继续推进，再决定是否有必要把这套菜单面下沉到状态托盘；当前菜单面已足够承担本机监督入口。
## 2026-03-14 22:08:50（runtime truth 对象级状态面收口）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py` 从“checks + Telegram truth + agents”扩成对象级状态面，统一新增：
  - `alerts`
  - `services`
  - `recentSessions`
- [x] 已同步补齐三份产物输出：
  - `D:\\Projects\\vrplayer\\openclaw_runtime_truth.latest.json`
  - `D:\\Projects\\vrplayer\\openclaw_runtime_truth.latest.md`
  - `D:\\Projects\\vrplayer\\openclaw_runtime_truth.latest.html`
- [x] 已完成 fresh 回放：
  - `oc-runtime-truth -Raw`
  - `oc-runtime-truth -Markdown`
  - `oc-supervise-menu -Action HealRuntime`
- [x] heal 后最新 fresh 结果已回到：
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
  - 当前 `Alerts` 只剩 `Telegram health/channel mismatch`
- [ ] 下一轮：若继续推进，把这套对象级状态面再接入更正式的监督前端；当前 CLI/menu/html 三层已可稳定消费。

## 2026-03-15 10:50:53（Windows node role-upgrade 收口 + runtime truth 清口径）
- [x] 已钉实 Windows node 当前主阻塞不是 identity mismatch，而是同一 `deviceId=96c978...` 的 `node` role-upgrade 未批准。
- [x] 已通过正式配对链执行 `openclaw devices approve --latest --json`，paired roles 扩成 `operator + node`，并已生成 `node` token。
- [x] 已完成 fresh 恢复验证：`C:\Users\Lenovo\.openclaw\start-node-host.ps1` 后 `openclaw nodes status --json` 回到 `connected=true`。
- [x] 已确认 `pending.json` 可短暂滞后；pairing 真相当前优先看：
  - `openclaw devices list --json`
  - `openclaw nodes status --json`
- [x] 已修改 `D:\Projects\vrplayer\scripts\openclaw_runtime_truth.py`，把 `nodeServiceRuntime` 收口成稳定 ASCII/结构化口径：
  - `scheduled-task not installed`
  - `user-mode host active (scheduled-task not installed)`
  - `unknown (unreadable runtime message)`
- [ ] 下一轮：若继续推进，把 node pairing / roles 也接进 `runtime truth` 的对象级状态面，而不只显示 connectedCount。

## 2026-03-15 11:23:58（runtime truth 纳入 node pairing 真相面）
- [x] 已把 `openclaw devices list --json` 纳入 `D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py` 的正式采样集。
- [x] 已把 node pairing 对象化为：`pairedDeviceCount / pendingDeviceCount / nodeRoleGrantedCount / pairedRoles / pairedDevices / pendingDevices`。
- [x] 已完成 fresh 验证：当前结果为 `pairedDeviceCount=1 / pendingDeviceCount=0 / nodeRoleGrantedCount=1 / pairedRoles=[node, operator] / connectedNodeCount=1`。
- [x] 已确认全量 fresh 刷新当前耗时约 `50s`；这是正常串行采样成本，不应再被误判成脚本挂死。
- [ ] 下一轮：若继续推进，把 node pairing 真相接进更直接的监督动作，而不只停在静态快照。

## 2026-03-15 14:08:50（live dashboard 动作链异步化收口）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py` 的动作端点改成后台 job 模式，不再同步阻塞到 fresh snapshot 完成。
- [x] 已新增 `/api/action-status`，统一承载动作运行态、完成态、错误态与完成后 snapshot。
- [x] 已把前端动作流改成：POST 秒回 `running=true` -> 轮询 `action-status` -> 若 `needsRefresh=true` 再拉 `/api/truth`。
- [x] 已完成 fresh 验证：
  - `oc-supervise-live.cmd -Status -NoOpen` 冷启动约 `12.7s`
  - `/api/approve-latest-device` 首响约 `676ms`
  - `/api/action-status` 在约 `18s` 内回到 `completed`
- [ ] 下一轮：如果继续推进，把 `action-status` 再前台化成更明显的“当前正在执行什么”状态条，而不是只显示在 action output JSON 里。

## 2026-03-15 15:13:58（live dashboard truth 收口 + action output 压缩）
- [x] 已修改 `D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`，使后台动作完成时优先走 `build_snapshot(refresh=True)`，不再默认把 stale truth 留给 `/api/action-status`。
- [x] 已保留 fallback：只有 fresh refresh 失败时才回退 `build_snapshot(refresh=False)`，并显式标记 `needsRefresh=true`。
- [x] 已把前端 `Action Output` 收口成 compact summary，不再直出完整嵌套 snapshot JSON。
- [x] 已完成 fresh 回放验证：
  - 动作前 `/api/truth` 显示 `browserRunning=false / browserCdpReady=false`
  - `POST /api/heal` 完成后 `/api/action-status.snapshot.generatedAt` 与 `/api/truth.generatedAt` 对齐
  - 动作后 `/api/truth` 已同步回到 `browserRunning=true / browserCdpReady=true`
  - 页面 `Action Output` 仅保留 compact summary，不再充满原始 snapshot dump
- [ ] 下一轮：如果继续推进，把 compact `action-status` 再前台化成更清晰的状态条或动作时间线，而不是只停在 `Action Output` 文本区。
## 2026-03-15 15:26:51（Current Action 前台化收口）
- [x] 已新增 live dashboard 的 `action-banner` 与 `action-timeline`，把当前动作状态从 compact JSON 提升为可读状态面。
- [x] 已新增回归测试：`D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`。
- [x] 已完成 fresh 验证：
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - chrome-devtools 页面快照 + console/network 采样
- [x] 当前 DevTools 结果：主 API 请求均为 `200`；唯一 console 报错是 `favicon.ico` 404，可视为无害展示层噪声。
- [ ] 下一阶段：把 `Action Output` 进一步降级为纯 debug 面板，再决定是否需要把 action timeline 接到更完整的前端状态组件。
## 2026-03-15 15:40:31（Debug Output 降级收口）
- [x] 已把 `Action Output` 改成折叠式 `Debug Output` 面板，默认折叠。
- [x] 已把 debug 面板行为收口为：失败时自动展开；正常 idle/completed 时保持折叠。
- [x] 已补回归测试：确认页面存在 `action-debug-panel`、`Debug Output` summary，以及 JS 对 debug 面板的正式控制。
- [x] 已完成 fresh 验证：
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - chrome-devtools 页面快照 + console/network 采样
- [x] 当前 DevTools 结果：console 无报错，主 API 请求全部 `200`。
- [ ] 下一阶段：把 `action-banner + action-timeline` 再接到更明确的状态分组或历史视图，而不是继续扩展 debug 面板。
## 2026-03-15 15:53:47（Recent Actions 历史视图收口）
- [x] 已把 live dashboard 的动作历史正式前台化，新增 `Recent Actions` 面板。
- [x] 已把动作历史持久化到 `D:\\Projects\\vrplayer\\openclaw_supervision_action_history.latest.json`，不再只依赖当前动作内存态。
- [x] `/api/action-status` 现在会同时返回当前动作状态和最近动作历史 `history`。
- [x] 已完成 fresh 验证：
  - 页面源码包含 `Recent Actions / action-history-body / action-timeline / Debug Output`
  - `/api/action-status` 返回 `history_count=1`
  - 最新历史头部为 `heal / completed`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py` 通过
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py` 通过
## 2026-03-15 16:03:10（Recent Actions 分组/筛选 + truth 联动收口）
- [x] 已把 `Recent Actions` 从纯表格升级成：
  - 计数摘要 `All / Completed / Failed`
  - 状态筛选按钮
  - `Truth` 列
- [x] 已把历史项与 truth refresh 结果正式联动：completed 动作会把 `snapshot.generatedAt` 落成 `history.truthGeneratedAt`。
- [x] 已完成 fresh 验证：
  - `heal` 完成后 `/api/action-status.history[0].truthGeneratedAt = 2026-03-15 16:02:15`
  - 页面源码包含 `action-history-summary / action-history-filters / data-filter=\"completed\" / data-filter=\"failed\" / <th>Truth</th>`
  - chrome-devtools 快照确认 `Failed` 过滤后表格切到 `none`
  - chrome-devtools console/network 采样通过，唯一噪声仍是 `favicon.ico 404`
- [ ] 下一阶段：把历史项继续做成更清晰的分组/筛选视图，并评估是否要加入时间范围或动作类型过滤。
## 2026-03-15 16:35:51（Recent Actions 三维筛选 + follow-recommendations truth-driven 收口）
- [x] 已把 `Recent Actions` 继续升级成三维筛选视图：
  - 状态筛选 `All / Completed / Failed`
  - 时间范围筛选 `All / 1h / 6h / 24h`
  - 动作类型筛选 `All + 动态 action type`
- [x] 已新增 `Duration` 列，历史项现在可直接回答“这一轮动作到底耗时多久”。
- [x] 已把 `follow-recommendations` 从“吃一份初始 recommendations 快照”改成 truth-driven 迭代链：
  - 每一轮先读最新 `runtime truth`
  - 再按当前推荐顺序选择下一步
  - 每一步后再 fresh truth 并记录 `before/after` 摘要
- [x] 推荐动作卡片现已直接显示 node pairing 上下文：
  - `pending / nodeRoles / connected`
  便于在前台直接判断是 repair、heal 还是 start-node-host 路径。
- [x] 已完成 fresh 验证：
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-follow-recommendations.ps1`
  - chrome-devtools 页面快照 + Console 采样 + Network 采样
- [x] 当前 live 页面已确认：
  - 存在 `All / 1h / 6h / 24h`
  - 存在动态动作类型按钮 `follow-recommendations / heal`
  - `Follow Recommendations` 动作完成态可进入 `Recent Actions`
  - 当前 Console 为空、主 API 请求全部 `200`
- [ ] 下一阶段：继续把历史层做成更清晰的分组/聚合视图，并开始把 `thread / turn / item / approval / status` 真相面推进到监督前台。

## 2026-03-15 16:55:25（Control Plane 前台化收口）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py` 扩成正式 `controlPlane` 摘要，当前固定输出：`approvals / sessions / presence / governance`。
- [x] 已把 live supervision 页面补齐 `Control Plane` 区块，不再只显示 `Alerts / Services / Recent Actions`。
- [x] 已新增并通过回归测试：
  - `D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
- [x] 已完成 fresh 验证：
  - `py -3.12 -m py_compile ...`
  - `py -3.12 -X utf8 -m unittest ...`
  - chrome-devtools 页面快照 + Console/Network 采样
- [x] 已确认当前 fresh `controlPlane` 真相：
  - `approvalAsk=off`
  - `approvalSecurity=full`
  - `agentOverrideCount=2`
  - `sessionCount=4`
  - `defaultModel=gemini-3-flash-preview`
  - `backendRoles=[node, operator]`
  - `agentsWithActiveErrors=[]`
- [ ] 下一阶段：把 `Control Plane` 从摘要卡片继续推进成更显式的监督信号和推荐动作输入，而不只停在状态展示。

## 2026-03-15 17:20:37（Control Signals 前台化收口）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py` 扩成正式 `controlPlaneSignals` 摘要，当前固定输出四个 canonical signals：`approvals-aligned / session-defaults-ready / backend-presence-ready / governance-clean`。
- [x] 已把 live supervision 页面补齐 `Control Signals` 区块，不再要求人工逐卡片阅读 `Control Plane` 才能判断控制面是否正常。
- [x] 已完成 fresh 验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - Playwright live 页面快照 + refresh 验收
- [x] 已确认当前 authoritative truth：
  - `generatedAt=2026-03-15 17:20:37`
  - `recommendedActions=[]`
  - `controlPlaneSignals=[approvals ok, session-defaults ok, backend-presence ok, governance ok]`
  - `backend-presence-ready.automatable=false`
- [x] 已确认 live supervision 的 `Control Signals` 真正来自运行中 server，而不是仅存在于源码与测试中；本轮通过重启 18891 supervision server 后再次 fresh 页面验证完成。
- [ ] 下一阶段：把 `thread / turn / item / approval / status` 继续压成更细的对象级监督信号，而不是只停在当前四个控制面 signals。

## 2026-03-15 18:22:52（canonical live supervision 默认入口收口）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py` 的 server 状态升级为显式版本对象：
  - `stateVersion=2`
  - `scriptMtimeUtc`
  - `/api/ping` 直接返回 `stateVersion / scriptMtimeUtc / script`
- [x] 已把 `C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1` 改成 stale-aware 默认入口：
  - 先读 `openclaw_supervision_server.latest.json`
  - 再读 `http://127.0.0.1:18891/api/ping`
  - 若 `stateVersion` 或 `scriptMtimeUtc` 不匹配，自动杀掉旧 listener 并重启 18891
- [x] 已确认 default 18891 live dashboard 现在直接展示对象级监督面：
  - `Object Signals`
  - `Object Supervision`
  - `Threads`
  - `Turns`
  - `Items`
- [x] 已完成 fresh 验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -Status`
  - raw `/api/ping` 返回 `stateVersion=2`
  - raw `/api/truth` 正常
  - Playwright 默认 18891 页面快照确认对象级监督区块存在
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
- [ ] 下一阶段：继续把 `thread / turn / item / approval / status` 从对象级监督面推进成更细的对象级 signals/history，而不是只停在当前表格与摘要。
## 2026-03-15 18:50:47（对象级监督信号/历史收口）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py` 从粗粒度对象摘要推进成对象级监督真相面：
  - `objectSignals` 细化为 `thread-state-visible / thread-errors-cleared / turn-boundaries-visible / turn-prompt-clean / item-flow-visible / item-roundtrip-aligned / approval-status-linked / session-object-aligned`
  - `objectSupervision.status` 补齐 `turnVisibleCount / itemVisibleCount / promptErrorAgentCount / toolRoundTripMismatchCount`
  - `threads / turns / items` 分别补齐 `lastEventAge / boundaryHealthy / promptClean / toolRoundTripHealthy`
- [x] 已新增并持久化对象级历史 artifact：
  - `D:\\Projects\\vrplayer\\openclaw_object_history.latest.json`
  - 当前默认保留最近 `36` 次快照
  - 最新 fresh 结果已形成 3 条历史样本，且全部显示 `warnSignalIds=[turn-prompt-clean]`
- [x] 已把 live supervision 页面补齐对象级前台面：
  - `Object Signals` 计数摘要
  - `status/group` 双筛选
  - `Object History`
  - `Threads / Turns / Items` 新列：`Last Event Age / Boundary / Roundtrip`
- [x] 已完成 fresh 验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-runtime-heal.ps1`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
- [x] 当前 authoritative truth 已确认：
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
  - `objectHistory.entries=3`
  - 唯一对象级 `warn` signal 为 `turn-prompt-clean`
- [ ] 下一阶段：把 `approval / status` 再压成更细的对象级监督信号，并让对象历史支持按 agent 或 signal 聚合浏览。

## 2026-03-15 19:13:07（对象历史聚合/控制面误报修正）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py` 的 `objectHistory` 继续压成可消费聚合层：
  - 每条历史快照现在显式携带 `warnSignals`
  - `objectHistory.signalSummary`
  - `objectHistory.agentSummary`
- [x] 已把 live supervision 的 `Object History` 补齐为可查询面：
  - `signal` 筛选
  - `agent` 筛选
  - `Signal Hotspots`
  - `Agent Hotspots`
- [x] 已修正 `backend-presence-ready` 的稳定口径：
  - `presence.backendRoles` 缺 `node` 不再单独触发 `warn`
  - 只要 `connectedNodeCount>0` 或 `nodeRoleGrantedCount>0`，即视为 `nodeOperational=true`
- [x] 已完成 fresh 验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-WebRequest http://127.0.0.1:18891/` 关键节点检查
- [x] 当前 authoritative truth 已确认：
  - `recommendedActions=[]`
  - `backend-presence-ready=ok`
  - `nodeOperational=true`
  - `objectHistory.signalSummary[0].id=turn-prompt-clean`
  - `objectHistory.agentSummary` 已覆盖 `main / ops-exec / telegram-fast`
- [ ] 下一阶段：继续把 `approval / status` 从对象摘要推进成更细的对象级监督信号或热点历史，而不只停在当前 `thread/turn/item` 聚合。

## 2026-03-15 19:36:39（审批/状态细信号与对象级推荐动作）
- [x] 已把 `D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py` 的粗粒度 `approval/status` 对象信号正式拆细：
  - 删除旧的 `approval-status-linked / session-object-aligned`
  - 新增 `approval-defaults-ready`
  - 新增 `approval-socket-ready`
  - 新增 `status-session-coverage-aligned`
  - 新增 `status-queue-clean`
- [x] 已把对象级 drift 接进 `recommendedActions`：
  - 当 `objectSignals` 存在 `warn` 时，会新增 `inspect-object-supervision`
  - 当前 authoritative reason 已固定为：`turn-prompt-clean, status-session-coverage-aligned`
- [x] 已完成 fresh 验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
- [x] 当前 authoritative truth 已确认：
  - `recommendedActions=[inspect-turn-prompts, inspect-session-coverage]`
  - `objectSignals.warn=[turn-prompt-clean, status-session-coverage-aligned]`
  - `backend-presence-ready=ok`
  - `nodeOperational=true`
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
- [ ] 下一阶段：继续把 `thread / turn / item / approval / status` 压成更细的对象级监督热点和动作，不只停在当前两条 `inspect-turn-prompts / inspect-session-coverage`。

## 2026-03-15 19:41:19（对象级推荐动作继续拆细）
- [x] 已把对象级 drift recommendation 从单条总入口 `inspect-object-supervision` 继续拆成更具体的监督动作：
  - `inspect-turn-prompts`
  - `inspect-session-coverage`
- [x] 这两条动作现在分别绑定：
  - `turn-prompt-clean`
  - `status-session-coverage-aligned`
- [x] 已完成 fresh 验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
- [x] 当前 authoritative truth 已确认：
  - `recommendedActions=[inspect-turn-prompts, inspect-session-coverage]`
  - `turn-prompt-clean` 仍覆盖 `main / telegram-fast / ops-exec`
  - `status-session-coverage-aligned` 仍为 `warn`
  - `backend-presence-ready=ok`
  - `nodeOperational=true`

## 2026-03-15 19:49:18（推荐动作直达对象信号视图）
- [x] 已把 live supervision 的对象级手动 recommendation 从“纯文本建议”推进成可点击监督入口：
  - `inspect-turn-prompts`
  - `inspect-session-coverage`
- [x] 推荐动作现已显式携带：
  - `signalId`
  - `group`
- [x] 页面点击后会自动执行：
  - `Object Signals` 过滤到 `warn`
  - `Object Signals` group 定位到对应分组
  - `Object History` signal 过滤到对应 signal
- [x] 已完成收口验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-WebRequest http://127.0.0.1:18891/`
  - `Invoke-WebRequest http://127.0.0.1:18891/api/truth`
- [x] 当前 authoritative truth 已确认：
  - `inspect-turn-prompts -> turn-prompt-clean / group=turn`
  - `inspect-session-coverage -> status-session-coverage-aligned / group=status`
  - live HTML 已包含 `focusObjectSignal(this.dataset.focusSignal, this.dataset.focusGroup)`

## 2026-03-15 19:55:47（Focused Inspection 专用检查视图）
- [x] 已把对象级 recommendation 继续推进成 `Focused Inspection` 区块，不再只停在通用筛选：
  - `inspect-turn-prompts` 会直出 prompt drift agents 表
  - `inspect-session-coverage` 会直出 session coverage 差值摘要
- [x] 已补齐页面入口与渲染：
  - `Focused Inspection`
  - `renderFocusedInspection(summary)`
  - `clearFocusedInspection()`
- [x] 已完成收口验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-WebRequest http://127.0.0.1:18891/`
  - `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
- [x] 当前 authoritative truth 已确认：
  - `inspect-turn-prompts -> turn-prompt-clean / group=turn`
  - `inspect-session-coverage -> status-session-coverage-aligned / group=status`
  - live HTML 已包含 `Focused Inspection`

## 2026-03-15 20:26:27（Focused Inspection authoritative evidence 收口）
- [x] 已把 `Focused Inspection` 从摘要级卡片继续推进成 authoritative `objectEvidence` 视图：
  - `turn-prompt-clean` 现直出：
    - `promptDriftAgents`
    - `promptErrorSamples`
    - `sessionId`
    - `transcriptPath`
  - `status-session-coverage-aligned` 现直出：
    - `coverageDiagnosis`
    - `duplicateConfiguredAgents`
    - `missingSessionObjectRows`
    - `configuredSessionRows`
    - `sessionObjectRows`
- [x] 已钉实当前 session coverage drift 的活根因：
  - `configuredSessionCount=4`
  - `sessionObjectCount=3`
  - duplicate configured `telegram-fast` rows:
    - `c7110231-7ebf-47f4-872b-fd4311cb6a2a`
    - `98f92cc1-5854-4bb6-9b25-23948ee4ecab`
  - `missingSessionObjectRows=[]`
- [x] 已完成收口验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - Playwright 页面取样确认 `Focused Inspection` 已显示 `Transcript Path / Duplicate Configured Agents / Missing Session Objects`
- [ ] 下一阶段：继续把 `Focused Inspection` 往对象级 drill-down 推进，区分 duplicate configured row 与当前 active row，不再只停在 evidence bundle。

## 2026-03-16 08:13:42（Focused Inspection active/stale drill-down 收口）
- [x] 已把 `status-session-coverage-aligned` 的对象证据继续细化到 configured row 级别：
  - `coverageRole`
  - `coverageRoleLabel`
  - `threadSessionId`
  - `threadSessionMatch`
  - `duplicateConfiguredRowDrilldown`
- [x] 已把 live supervision 的 `Focused Inspection` 推进成 active/stale 可见的 drill-down：
  - `Configured Session Rows` 新增 `Coverage Role / Thread Session / Thread Match`
  - `Duplicate Configured Agents` 新增 `Active Session / Stale Sessions`
  - 新增 `Duplicate Session Row Drilldown`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `Invoke-WebRequest http://127.0.0.1:18891/`
  - `Invoke-WebRequest http://127.0.0.1:18891/api/truth`
- [x] authoritative truth 已确认：
  - `activeSessionId=98f92cc1-5854-4bb6-9b25-23948ee4ecab`
  - `staleSessionIds=[c7110231-7ebf-47f4-872b-fd4311cb6a2a]`
  - drill-down roles 已对齐 `stale-row / active-row`

## 2026-03-16 08:31:23（coverage drift 与 stale row hygiene 拆分收口）
- [x] 已把 live session coverage drift 与 stale configured row hygiene 正式拆成两个对象级 signal：
  - `status-session-coverage-aligned`
  - `status-stale-configured-rows`
- [x] 已把 recommendation 同步改成：
  - `inspect-turn-prompts`
  - `inspect-stale-configured-rows`
  - 不再默认给 `inspect-session-coverage`
- [x] 已把 `Focused Inspection` 补齐到 stale-row 专用 evidence 视图：
  - `Stale Configured Agents`
  - `Stale Configured Rows`
  - `Active Companion Rows`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `Invoke-WebRequest http://127.0.0.1:18891/api/truth`
- [x] authoritative truth 已确认：
  - `status-session-coverage-aligned=ok`
  - `status-stale-configured-rows=warn`
  - `recommendedActions=[inspect-turn-prompts, inspect-stale-configured-rows]`
  - stale row=`telegram-fast:c7110231-7ebf-47f4-872b-fd4311cb6a2a`
  - active row=`telegram-fast:98f92cc1-5854-4bb6-9b25-23948ee4ecab`

## 2026-03-16 08:58:02（surface row 归类修正收口）
- [x] 已把 `telegram-fast` 的 Telegram direct recent row 从 stale configured row 误判中剥离，改为有效 `surface-row` 建模：
  - `sessionKey=agent:telegram-fast:telegram:direct:1262756389`
  - `sessionId=c7110231-7ebf-47f4-872b-fd4311cb6a2a`
  - `sessionScope=surface`
  - `surfaceLabel=telegram/direct`
- [x] stale-row 判定现已收口为“只看 true configured drift，不看 surface rows”：
  - `duplicateConfiguredAgents=[]`
  - `duplicateConfiguredRowDrilldown=[]`
  - live `recentSessions` 当前包含 1 条 `telegram/direct` surface row
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
- [x] 当前 authoritative truth 已确认：
  - `status-session-coverage-aligned=ok`
  - `status-stale-configured-rows=ok`
  - `recommendedActions=[inspect-turn-prompts]`
  - `recentSessions` 当前包含 `sessionId=c7110231-7ebf-47f4-872b-fd4311cb6a2a`
  - `configured active row=98f92cc1-5854-4bb6-9b25-23948ee4ecab`

## 2026-03-16 09:09:38（turn prompt drill-down 收口）
- [x] 已把 `inspect-turn-prompts` 从 agent 摘要推进成 turn 级 authoritative evidence：
  - `objectEvidence.turn-prompt-clean.promptTurnDrilldown`
  - `latestPromptErrorTimestamp / latestPromptErrorModel / latestPromptErrorMessage`
  - `lastUser / lastAssistant / lastSuccessAge / transcriptPath`
- [x] 已把 live `Focused Inspection` 同步前台化为 `Prompt Drift Turn Drilldown` 表，不再只停在 `Prompt Drift Agents` 和 `Prompt Error Samples`。
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-WebRequest http://127.0.0.1:18891/api/truth`
  - `Invoke-WebRequest http://127.0.0.1:18891/`
- [x] 当前 authoritative truth 已确认：
  - `recommendedActions=[inspect-turn-prompts]`
  - `objectEvidence.turn-prompt-clean.promptTurnDrilldown count=3`
  - `firstDrilldown.agentId=telegram-fast`
  - `firstDrilldown.latestPromptErrorMessage=aborted`

## 2026-03-16 09:24:47（live prompt drift 与 historical prompt debt 分层收口）
- [x] 已把 `turn-prompt-clean` 的语义收紧为“只表示 live active prompt drift”，不再混入 historical prompt debt。
- [x] 已新增独立对象级 signal：`turn-prompt-debt-contained`，专门承载 historical prompt debt。
- [x] 已把对象级证据拆层：
  - `turn-prompt-clean` 只保留 live drift：
    - `promptDriftAgents`
    - `promptTurnDrilldown`
    - `promptErrorSamples`
  - `turn-prompt-debt-contained` 单独暴露 historical debt：
    - `historicalPromptDebtAgents`
    - `historicalPromptDebtDrilldown`
    - `historicalPromptErrorSamples`
    - `latestHistoricalPromptErrorTimestamp / latestHistoricalPromptErrorModel / latestHistoricalPromptErrorMessage`
- [x] 已把 recommendation 同步改口径：
  - `inspect-turn-prompts` 仅指向 live prompt drift
  - `inspect-prompt-debt` 单独指向 historical prompt debt
- [x] 已把 live `Focused Inspection` 补齐 historical debt 专用视图：
  - `Historical Prompt Debt Agents`
  - `Historical Prompt Debt Drilldown`
  - `Historical Prompt Error Samples`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
- [x] 当前 authoritative truth 已确认：
  - `recommendedActions=[inspect-prompt-debt]`
  - `turn-prompt-clean=ok`
  - `turn-prompt-debt-contained=warn`
  - `activePromptErrorAgentCount=0`
  - `historicalPromptDebtAgentCount=3`

## 2026-03-16 09:49:24（historical prompt debt timeline 聚合与筛选收口）
- [x] 已把 `inspect-prompt-debt` 从单张 debt timeline 明细表推进到“三层视图”：
  - `historicalPromptDebtTimelineAgentSummary`
  - `historicalPromptDebtTimelineModelSummary`
  - `historicalPromptDebtTimeline`
- [x] 已把 live `Focused Inspection` 补齐为可消费的 timeline 治理面：
  - `Historical Prompt Debt Agent Hotspots`
  - `Historical Prompt Debt Model Hotspots`
  - `timeline agent` 过滤器
  - `visibleRows / totalRows`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
  - `Invoke-WebRequest http://127.0.0.1:18891/`（源码取样）
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 09:49:24`
  - `recommendedActions=[inspect-prompt-debt]`
  - `historicalPromptDebtTimeline count=6`
  - `historicalPromptDebtTimelineAgentSummary count=3`
  - `historicalPromptDebtTimelineModelSummary count=3`

## 2026-03-16 10:05:18（historical prompt debt 时间窗治理收口）
- [x] 已把 `inspect-prompt-debt` 从 agent/model 聚合继续推进到时间窗治理视图：
  - `historicalPromptDebtTimelineWindowSummary`
  - `historicalPromptDebtTimeline[].windowKey`
  - `historicalPromptDebtTimeline[].windowLabel`
- [x] 已把 live `Focused Inspection` 补齐为双筛选 timeline 治理面：
  - `timeline agent`
  - `timeline window`
  - `Historical Prompt Debt Time Windows`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
  - `Invoke-WebRequest http://127.0.0.1:18891/`（源码取样）
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 10:05:18`
  - `recommendedActions=[inspect-prompt-debt]`
  - `historicalPromptDebtTimelineWindowSummary count=1`
  - `firstWindow=Last 72h`
  - `timelineFirstWindow=72h`

- [ ] 下一阶段：继续把 `inspect-prompt-debt` 从时间窗治理推进到 transcript/turn debt timeline drill-down 与按时间窗债务清理规则，而不是继续扩单页表格。

## 2026-03-16 10:18:17（historical prompt debt transcript/session 清债优先级收口）
- [x] 已把 `inspect-prompt-debt` 从时间窗治理继续推进到 transcript/session 级 evidence：
  - `historicalPromptDebtTranscriptSummary`
  - `historicalPromptDebtCleanupPriority`
- [x] 已把 live `Focused Inspection` 补齐为 transcript/session 清债治理面：
  - `Historical Prompt Debt Transcripts`
  - `Prompt Debt Cleanup Priority`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
  - `Invoke-WebRequest http://127.0.0.1:18891/`（live 页面关键字符串取样）
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 10:17:39`
  - `recommendedActions=[inspect-prompt-debt]`
  - `historicalPromptDebtTranscriptSummary count=3`
  - `historicalPromptDebtCleanupPriority count=3`
  - `firstTranscriptAgent=main`
  - `firstTranscriptWindow=Last 72h`
  - `firstPriority=P2/Next`

- [ ] 下一阶段：继续把 `inspect-prompt-debt` 从 transcript/session 清债优先级推进到更细的 transcript/turn debt timeline cleanup 规则，而不是继续扩通用 signal 表格。

## 2026-03-16 10:57:48（historical prompt debt cleanup rules 收口）
- [x] 已把 `inspect-prompt-debt` 从 transcript/session 清债优先级继续推进到可执行 cleanup rules：
  - `historicalPromptDebtCleanupRules`
  - `historicalPromptDebtTurnRules`
- [x] 已把 live `Focused Inspection` 补齐为 cleanup rules 专用治理面：
  - `Prompt Debt Cleanup Rules`
  - `Prompt Debt Turn Rules`
- [x] transcript 级 cleanup rules 已固定覆盖：
  - `24h -> rebaseline-prompt-baseline`
  - `72h -> rebaseline-prompt-baseline`
  - `7d -> queue-transcript-cleanup`
  - `older -> archive-historical-debt`
  - `unknown -> observe-only`
- [x] turn 级 cleanup rules 已固定回答：
  - 该债的最新锚点 turn 是哪一条
  - 当前应检查最新 debt turn、归档历史债，还是只保留观察
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-runtime-heal.ps1`
  - `powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1 -NoOpen`
  - Playwright live 页面取样确认 `Focused Inspection / Prompt Debt Cleanup Rules / Prompt Debt Turn Rules`
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 10:57:48`
  - `recommendedActions=[inspect-prompt-debt]`
  - `browserRunning=true`
  - `browserCdpReady=true`
  - `connectedNodeCount=1`
  - `historicalPromptDebtCleanupRules count=3`
  - `historicalPromptDebtTurnRules count=3`

- [ ] 下一阶段：把 cleanup rules 继续推进成真正的 cleanup execution/stop criteria；如果做不到改变动作顺序或收敛标准，就停止继续细分。
## 2026-03-16 11:16:06（2.10 cleanup execution / stop criteria 收口）
- [x] 已把 `inspect-prompt-debt` 从 cleanup rules 继续推进成真正会改变动作顺序和停止标准的 authoritative evidence：
  - `historicalPromptDebtExecutionPlan`
  - `historicalPromptDebtStopCriteria`
- [x] execution plan 现在会直接回答：
  - 这条 transcript/session 债当前属于 `Now / Next / Queue / Archive / Observe` 哪个执行阶段
  - transcript 级下一步动作是什么
  - turn 级下一步锚点动作是什么
- [x] stop criteria 现在会直接回答：
  - 做到什么条件算这条债可以停
  - 这个停止标准为什么成立
- [x] live `Focused Inspection` 已补齐专用治理面：
  - `Prompt Debt Execution Plan`
  - `Prompt Debt Stop Criteria`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - fresh `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - live supervision 页面源码已确认存在 `Prompt Debt Execution Plan / Prompt Debt Stop Criteria`
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 11:16:06`
  - `recommendedActions=[inspect-prompt-debt]`
  - `historicalPromptDebtExecutionPlan count=3`
  - `historicalPromptDebtStopCriteria count=3`
  - `firstExecution=E2/Next/rebaseline-prompt-baseline`
  - `firstStop=S2/P2`
- [x] 这一层已经改变了“现在怎么清、什么时候停”的决策口径；后续如果不能继续落成真正的自动清理动作，就停止细分监督面。

## 2026-03-16 11:36:51（2.11 deferred review 收口）
- [x] 已核对 OpenClaw 现有真实原语，结论成立：
  - `openclaw sessions cleanup --all-agents --dry-run --json` 当前 `wouldMutate=false`
  - 它不会处理这批 `prompt debt` transcript
  - 现阶段不存在可直接复用的真实清债原语
- [x] 已把近窗 historical prompt debt 从“伪待办”改成“延后复核”：
  - `turn-prompt-debt-contained` 现固定输出 `deferredReview=true`
  - 同时输出 `nextReviewAt`
  - signal detail 直接写明下次复核时间
- [x] 已收掉伪推荐动作：
  - 当前若 debt 仅落在 `24h/72h` 近窗，且无 active prompt drift，则不再产出 `inspect-prompt-debt`
  - 只有存在真正可执行 backlog 时，才重新产出这条 recommendation
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py`
  - fresh `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - live `Invoke-RestMethod http://127.0.0.1:18891/api/truth`
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 11:36:51`
  - `recommendedActions=[]`
  - `turn-prompt-debt-contained=warn`
  - `deferredReview=true`
  - `nextReviewAt=2026-03-17 13:50:47`
- [x] 这一层已经回答了“如果没有真实动作原语，监督层该怎么停”。
- [x] 已把 `deferredReview + nextReviewAt` 前台化到 live `Focused Inspection` 的 `Prompt Debt Review State`，避免出现“无动作但仍是 warn”的认知空档。
- [ ] 下一阶段：停止继续细分 prompt debt 监督面；后续只在 `nextReviewAt` 到点或出现新的 active drift 时再重新进入治理。

## 2026-03-16 12:29:53（approval/status 专用检查视图收口）
- [x] 已把 `approval-defaults-ready / approval-socket-ready / status-queue-clean` 从 generic object supervision 提升成专用 recommendation/evidence：
  - `inspect-approval-defaults`
  - `inspect-approval-socket`
  - `inspect-status-queue`
- [x] `Focused Inspection` 已补齐三组专用视图：
  - `Approval Defaults State / Approval Overrides`
  - `Approval Socket State`
  - `Status Queue State / Queued System Events / Agents With Active Errors`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - fresh `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - live `http://127.0.0.1:18891/` 页面源码取样
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 12:26:36`
  - `approval-defaults-ready=ok`
  - `approval-socket-ready=ok`
  - `status-queue-clean=ok`
  - 当前活阻塞应继续看 browser/runtime，而不是 approval/status

## 2026-03-16 12:56:03（browser runtime 对象级监督收口）
- [x] 已把当前活阻塞 `browser runtime` 正式拉进对象级监督面，不再只停在 alerts/services。
- [x] `runtime truth` 已新增独立对象信号：
  - `runtime-browser-ready`
- [x] recommendation 已收口为：
  - `inspect-browser-runtime`
  - 保留 `heal-runtime` 作为自动恢复入口
- [x] live `Focused Inspection` 已补齐专用 evidence：
  - `Browser Runtime State`
  - `Browser Runtime Detail`
  - `Browser Runtime Recovery`
- [x] 已完成验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - fresh `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
  - live `http://127.0.0.1:18891/api/truth`
  - live `http://127.0.0.1:18891/` HTML 关键字符串检查
- [x] 当前 authoritative truth 已确认：
  - `generatedAt=2026-03-16 12:56:03`
  - `recommendedActions=[follow-recommendations, heal-runtime, inspect-browser-runtime]`
  - `runtime-browser-ready=warn`
  - `browserRunning=false`
  - `browserCdpReady=false`
  - `healRecommended=true`
- [x] 这层已改变后续 triage 顺序：当 browser 是活阻塞时，先看 `runtime-browser-ready` evidence，再决定是否执行 `heal-runtime`；不再先回头查 approval/status 或 prompt debt。

## 2026-03-16 13:08:00（vrplayer 单馆单 URL 壳层升级）
- [x] 阶段1：梳理当前入口、路由、viewer 生命周期与热点切景链路，确定最小改造面。
- [x] 阶段2：按 TDD 补状态机/浅路由/cover gate 的失败测试。
- [x] 阶段3：实现持久 `viewer shell`、馆级 `cover gate`、场景转场层与预加载 MVP。
- [x] 阶段4：完成本地构建、浏览器验收，并沉淀 `README.md` 的长期规则。
- [x] 当前已确认的核心事实：
  - 现状 `handleRoute() -> clearView() -> showScene()` 会在每次 `scene` 路由变化时销毁并重建 `viewerContainer`、`PanoViewer`、`SceneUiRuntime`。
  - 这条生命周期就是馆内切点黑屏、像换页而非同馆连续漫游的主要根因。
  - `PanoViewer.loadScene(scene)` 本身已支持在同一 viewer 实例内切换场景，因此可把改造重点收口到 App 壳层、路由决策与转场覆盖层，而不是重写底层全景渲染器。

## 2026-03-16 13:56:27（museum shell gate + same-canvas reuse 收口）
- [x] 已新增 `src/app/museumShellState.ts`，把馆级 cover gate 与同馆 scene 复用策略正式对象化：
  - `resolveMuseumShellRoute(...)`
  - `resolveMuseumSceneRuntimePlan(...)`
- [x] 已补 TDD：`D:\Projects\vrplayer\tests\museumShellState.test.ts` 当前覆盖 8 条状态机/运行时规则，并已通过。
- [x] 已把首页馆卡 CTA 从“直达首站”收口为“进入展馆”；当前 `MuseumList` 统一走 `navigateToSceneList(museumId)`，不再直接跳 entry scene。
- [x] 已在 `src/main.ts` 落地三条稳定行为：
  - `?museum=<id>` 进入馆级 cover gate
  - 首次 deep link `?museum=<id>&scene=<id>` 也先过 cover gate，再进入目标 scene
  - 同馆 scene 切换复用同一 viewer shell/canvas；仅当 URL 显式带 `yaw/pitch/fov` 时才重置到目标视角
- [x] 已完成本地验证：
  - `node --test D:\Projects\vrplayer\tests\museumShellState.test.ts`
  - `npm run build`
  - DevTools 快照确认 `?museum=linzexu` 与 `?museum=linzexu&scene=south_gate` 均先显示 cover gate
  - 点击 CTA 后进入目标 scene，且同馆切换 `south_gate -> west_room_1` 时 `canvas` 实例保持同一个 DOM 节点
- [ ] 下一阶段：若继续推进这条馆内壳层主线，优先做发布链 `dist -> docs -> commit -> push`，而不是再细分 museum shell 状态机。

## 2026-03-16 13:25:04（2.10 supervision 封版线）
- [x] 已把第二阶段 supervision 线的停止条件正式对象化为 `summary.phaseReadiness`。
- [x] 已完成实现验证：
  - `py -3.12 -m py_compile D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py D:\\Projects\\vrplayer\\scripts\\openclaw_supervision_server.py D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - `py -3.12 -X utf8 -m unittest D:\\Projects\\vrplayer\\tests\\openclaw_runtime_truth_control_plane_test.py D:\\Projects\\vrplayer\\tests\\openclaw_supervision_server_action_ui_test.py`
  - fresh `py -3.12 -X utf8 D:\\Projects\\vrplayer\\scripts\\openclaw_runtime_truth.py`
- [x] 当前 authoritative truth 已确认：
  - `phaseReadiness.status=sealed`
  - `phaseReadiness.blockingKeys=[]`
  - `phaseReadiness.deferredReview=true`
  - `phaseReadiness.nextReviewAt=2026-03-17 13:50:47`
  - `recommendedActions=[]`
- [x] 这一层已经回答了“什么时候停止继续细分 supervision 面”。
- [ ] 下一阶段：停止扩 supervision 壳层，转向 `vrplayer` 单馆单 URL 壳层升级主线。

## 2026-03-16 13:32:05（live server startup fingerprint 收口）
- [x] 已确认 18891 端口上的旧 `openclaw_supervision_server.py` 进程会用磁盘上最新文件的 `scriptMtimeUtc` 伪装成最新版本，因此仅靠磁盘 mtime 不能判断 live server 是否真的已重启。
- [x] 已把 `openclaw_supervision_server.py` 的 `/api/ping` 改为返回进程启动时固化的 `startupScriptMtimeUtc + startupScriptSha256`。
- [x] 已把 `C:\\Users\\Lenovo\\.openclaw\\bin\\oc-supervise-live.ps1` 改为按 startup fingerprint 和 `stateVersion=3` 判断是否复用旧进程。
- [x] 已完成验证：
  - `oc-supervise-live.ps1 -Stop`
  - `oc-supervise-live.ps1 -NoOpen`
  - `/api/ping` 返回 `stateVersion=3` 与 startup fingerprint
  - live `/` 页面源码已包含 `Phase Readiness / phase-readiness-panel / renderPhaseReadiness(...)`
- [x] 当前 authoritative truth：
  - live server `processId=46672`
  - `startupScriptSha256=f1804afb84d57cdd50554a7d972913390741749ba3408c24d16d7c03d6accabc`
  - 页面已吃到最新模板
- [ ] 下一阶段：停止继续扩 supervision 线，切回 `vrplayer` 单馆单 URL 壳层升级主线。
