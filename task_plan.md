# task_plan.md

## 浠诲姟
VRPlayer 棣栬疆楂?ROI 鍏ㄤ粨浼樺寲锛堟€ц兘浼樺厛 + 鍏抽敭绋冲畾鎬т慨澶嶏級

## 鏃堕棿
- 鍒涘缓鏃堕棿: 2026-02-10 21:46:36
- 鏈€鏂版洿鏂? 2026-02-10 22:15:09

## 闃舵鐘舵€?
- [x] 闃舵1 鍏ュ彛渚濊禆鐦﹁韩锛坄main.ts` 鍔ㄦ€佸姞杞?`editor/debug/structure3d/north-calibration/chat`锛?
- [x] 闃舵2 Dock 闈㈡澘鎯版€у寲锛坄DockPanels.tsx` 闈㈡澘 loader锛沗BottomDock.tsx` 鎸夐渶鍔犺浇 `DockPanels`锛?
- [x] 闃舵3 Dollhouse 闄嶈€︼紙`Dollhouse3DPanel.tsx` 鍔ㄦ€佸姞杞?`DollhouseScene` + token 闃插苟鍙戯級
- [x] 闃舵4 CDN 鎺㈡祴鍘婚樆濉烇紙`assetResolver.ts` 缂撳瓨涓婃鎴愬姛 CDN + TTL + 鍚庡彴澶嶆帰娴嬶紱`main.ts` 涓嶉樆濉炵瓑寰咃級
- [x] 闃舵5 鍏抽敭绋冲畾鎬т慨澶嶏紙鍏ㄥ眬鐩戝惉涓?RAF 鐢熷懡鍛ㄦ湡娓呯悊锛?
- [x] 闃舵6 鏋勫缓鎷嗗寘锛坄vite.config.ts` manualChunks + `onlyExplicitManualChunks`锛?
- [x] 闃舵7 鍙戝竷锛坄dist -> docs -> commit -> push`锛?

## 绾︽潫
- 浠呬慨鏀?`src/**`銆乣README.md`銆佽鍒掕褰曟枃浠躲€?
- 涓嶆墜鏀?`dist/**`銆乣docs/**`銆?
- 缁撹鍓嶅繀椤绘湁鏋勫缓涓?`chrome-devtools` 璇佹嵁閲囨牱锛坰napshot + network/console锛夈€?

## 第二轮任务
VRPlayer 第二轮深入优化（首屏链路再瘦身 + 稳定性收口）

## 时间
- 创建时间: 2026-02-10 22:46:15
- 最新更新: 2026-02-10 23:08:18

## 阶段状态
- [x] 阶段0 规划文件与 memory 关键节点记录
- [x] 阶段1 去除 `three-extras` 首屏链路（`TileMeshPano/KTX2Loader` 动态加载）
- [x] 阶段2 聊天改为首交互触发（移除 idle 自动预热）
- [x] 阶段3 场景 UI 二段式挂载（LOW_READY 后异步加载）
- [x] 阶段4 SW 壳层预缓存 + `/config.json` 新鲜度保护
- [x] 阶段5 `PanoViewer/StructureView3D` resize 监听成对清理
- [x] 阶段6 构建与拆包验证（主包体积与 preload 结果）
- [x] 阶段7 发布（`dist -> docs -> commit -> push`）

## 第三轮任务（深入优化）
VRPlayer 第三轮深入优化（入口解耦 + 路由级按需加载 + VR 模块去静态依赖）

## 时间
- 创建时间: 2026-02-11 00:06:15
- 最新更新: 2026-02-11 00:06:15

## 阶段状态
- [x] 阶段1 入口解耦：main.ts 抽离 SceneList 页面实现到 SceneListPage 模块
- [x] 阶段2 路由级按需：PanoViewer/TopRightControls/BrandMark/StructureView2D 改懒加载
- [x] 阶段3 类型去耦：LoadStatus 下沉到 src/types/loadStatus.ts
- [x] 阶段4 VR 去静态依赖：vrMode 模块改按需初始化
- [x] 阶段5 预加载策略：移除 HTML 对 three-core/three-extras 的 modulepreload
- [x] 阶段6 证据化验证：chrome-devtools snapshot + network + console
- [x] 阶段7 发布（dist -> docs -> commit -> push）

