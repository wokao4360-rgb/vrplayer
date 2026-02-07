# VR 全景 Web 播放器（vrplayer）

自研的 VR 全景 Web 播放器，基于 Three.js 实现。支持多馆多场景、热点导航、地图导览等功能。  
本项目采用 **AI 协作（Codex / Cursor）** 开发，协作铁律见：`AGENTS.md`。

---

## 功能特性

- 🏛️ 多馆多场景：`museums → scenes → hotspots`
- 🎯 热点导航：scene 热点跳转 / video 热点播放
- 🗺️ 地图导览：地图点位切换场景（可选）
- 📱 移动端优化：触控拖拽、双指缩放（FOV）
- 🎬 视频播放：视频热点弹窗播放
- ⚡ 渐进式加载：`panoLow` 优先显示，后台加载 `pano` 高清替换

---

## 技术栈

- Three.js（全景球渲染）
- TypeScript
- Vite
- 原生 HTML/CSS/JS（无重 UI 框架依赖）

---

## 本地开发

### 安装依赖
```bash
npm install
启动开发
bash
复制代码
npm run dev
资源策略（强约束）
默认稳定方案（推荐）
关键全景图 / 纹理 / 图片全部同源放 Pages 站点目录中（例如 /assets/、/panos/）

避免 R2 作为关键纹理存储（CORS + 缓存排障成本高）

配置：public/config.json（唯一配置源）
public/config.json 是唯一源文件。
dist/config.json 与 docs/config.json 都是构建产物，禁止手改。

结构概览（示意）
json
复制代码
{
  "appName": "应用名称",
  "museums": [
    {
      "id": "museum_id",
      "name": "展馆名称",
      "cover": "封面图 URL",
      "map": { "image": "地图图片 URL", "width": 1000, "height": 600 },
      "scenes": [
        {
          "id": "scene_id",
          "name": "场景名称",
          "panoLow": "/assets/panos/xxx-low.jpg",
          "pano": "/assets/panos/xxx.jpg",
          "thumb": "/assets/thumbs/xxx.jpg",
          "initialView": { "yaw": 0, "pitch": 0, "fov": 75 },
          "northYaw": 0,
          "mapPoint": { "x": 420, "y": 310 },
          "hotspots": []
        }
      ]
    }
  ]
}
字段语义（项目最终约定）
initialView.yaw：首屏朝向（现实世界角度）

initialView.pitch：首屏俯仰

northYaw：现实世界北向角度（盘面 N 指向的方向）

hotspots[].yaw/pitch：热点位置（现实世界角度）

热点（Hotspots）
type: "scene"：跳转到目标 museum/scene，可选设置目标 yaw/pitch

type: "video"：弹出视频播放器播放 target.url

渐进式加载：panoLow / pano
推荐同时提供：

panoLow：2048×1024，<2MB

pano：4096×2048，<10MB

行为：

先加载 panoLow 快速可交互

后台加载 pano 成功后自动替换

pano 失败则继续用 panoLow（不白屏）

部署（Cloudflare Pages / GitHub Pages）
Cloudflare Pages（当前稳定方案）
Pages Root directory = docs

不使用 Pages 自动 build（本地 build）

发布 SOP（唯一正确版本｜PowerShell）
必须在 系统 PowerShell，并且在 D:\Projects\vrplayer（带 .git 的目录）执行。

powershell
复制代码
cd D:\Projects\vrplayer
git checkout main
git pull --rebase origin main
npm run build
robocopy .\dist .\docs /MIR
git add -A
git commit -m "chore: publish"
git push origin main
发布成功的唯一判断标准：

git log -1 是刚刚的 commit

GitHub 仓库首页最新 commit 已更新

Pages 已部署到该 commit

再进行浏览器硬刷新验证（Ctrl+F5 / 无痕）

常见爆雷与排查顺序（只按这个顺序）
1) 线上没变化（90% 不是代码）
优先检查：是否漏了 robocopy / 是否没有新 commit / push 是否成功 / Pages 是否部署到该 commit / 是否缓存

2) 白屏 + module script MIME type is video/mp2t
优先检查：Pages Root directory 与产物目录是否对齐
本项目要求：dist → docs → deploy

3) R2 资源能打开但 three.js 加载失败
原因通常是：CORS 头或缓存导致 WebGL 被拒绝
默认策略：关键纹理同源放 Pages

Agent Notes (Persistent) — 给“新 Codex 窗口”的快速定位区
  - 质量红线：每次改动都要“先用 MCP/skills 验证，再提交发布”；至少执行一次 `chrome-devtools` 的页面截图或 Network/Console 采样，避免只凭代码推断
  - chrome-devtools MCP 的 Network 结果是事实来源（用于判断 tile 请求/命中）
- 本机项目路径：D:\Projects\vrplayer
- KTX2/Basis：先 `npm run ktx2:setup`，再 `npm run tiles:ktx2 -- --in <tiles_dir>`；manifest 需 `tileFormat=ktx2`，运行时优先 KTX2，失败回退 jpg
- Cloudflare 可能对 tiles JPG 做强压缩导致发糊；已通过 `public/_headers` 为 `/assets/panos/tiles/*` 与 `/assets/panos/*.jpg` 添加 `Cache-Control: ... no-transform`，必要时用新 tiles 目录名做缓存隔离
- 若“只用瓦片”出现黑屏：优先检查 WebGL `maxTextureSize`；canvas 尺寸超过上限会导致纹理不可用（黑屏）。已在 TileCanvasPano 按 `maxTextureSize` 自动缩放画布以避免黑屏
- 若线上仍命中旧构建：通常是 `index.html`/CDN/浏览器缓存导致继续引用旧 hash 资源；发布后优先用带版本参数的 URL 校验（例如 `?v=时间戳`）
- 瓦片画面泛白：CanvasTexture 需标记 sRGB，材质关闭 toneMapping；否则亮部发灰泛白
- 低清→高清分块：低清层优先排队，首屏可视高清块同时并发；低清作为底图保留避免黑屏
- 全景/瓦片纹理不要再做 repeat.set(1,-1)/offset.set(0,1) 这类垂直翻转，容易导致“上下两张全景”分割错位
  - 当前工程的稳定链路是：`SphereGeometry.scale(-1,1,1)` + `texture.flipY = false`（低清/高清/Canvas/JPG tile 统一）
  - KTX2 转码保持默认方向（不要加 `--lower_left_maps_to_s0t0`），由现有 UV 链路统一处理；否则会触发“整体上下倒置”
- 纯全景（pano/panoLow/fallback）与瓦片链路不要混用同一翻转手段：若出现“整图倒立但 KTX2 正常”，优先检查 `loadExternalImageBitmap` 的 `createImageBitmap` 方向参数；纯全景需在解码阶段显式使用 `imageOrientation: 'flipY'`，避免与 tiles UV 链路冲突
- 预览图（导览/列表）统一使用 `*-nail.jpg` 小图；低清全景使用 `*-low.jpg`
- TileMeshPano 分片球体必须把 UV 归一化到 0..1，并对 V 做翻转（`v = 1 - v`），否则会出现“上下两张全景”/分片错位/上下颠倒
- tileFormat=ktx2 走 TileMeshPano（KTX2Loader）；其它格式走 TileCanvasPano（Canvas 拼接）
- 关键指标打点：PanoViewer 会输出 `window.__VR_METRICS__` 并触发 `vr:metrics` 事件，包含首屏低清/高清耗时、tile 命中率、失败/重试数、当前性能档位；`?metrics=1` 会把这些指标显示在顶部提示中
- 外链资源本地化脚本：`node scripts/localize-external-assets.mjs`（仅图片，失败会保留原 URL）；`i.ibb.co` 在本机可能不可达，需手动提供源图或替换为站内文件
- WebGPU 预研记录：`webgpu.md`（非主线，不影响线上）
- 若 config.json 发生变更且疑似仍在使用旧配置，需提升 `public/sw.js` 的 `CACHE_VERSION` 以清理旧缓存
本区是“断上下文恢复区”。当发现新的关键坑或新铁律时，必须补充到这里（保持短、可搜索）。

协作铁律（摘要）
用户只执行 Cursor/PowerShell

不看控制台，不手改 config，不给多方案，不允许“试试看”

修改必须可发布、且确认已发布后再验证

三罗盘系统（必须同步修改）
src/ui/CompassDisk.ts

src/ui/GroundHeadingMarker.ts

src/viewer/NadirPatch.ts

坐标系铁律（只允许一个入口取反一次）
config/URL yaw = 现实世界角度

internalYaw = -worldYaw（只在一个入口做一次）

罗盘产品最终形态（不允许改设计）
盘面表示 northYaw（世界北）

指针表示 cameraYaw（相机朝向）

盘面不跟相机转；指针跟相机转

当 cameraYaw == northYaw：指针角度必须为 0 且指向盘面 N


## Working Notes (Codex)
- 2026-01-26: 瓦片加载替换方案落地，`panoTiles.manifest` 优先，失败自动回退到 fallbackPano/panoLow；不再依赖外网 URL。
- 源图放置：`public/assets/panos/demo.jpg`；瓦片输出固定在 `public/assets/panos/tiles/<scene>/`，生成后需入库。
- 生成脚本：`npm run tiles:yhc-dongwu3`（封装 `scripts/generate-pano-tiles.mjs`，支持 `--tileSize`，默认 512；z0 1x1 → z1 2x1 → z2 4x2 → z3 8x4），可重复执行。
- manifest 结构：`type`、`tileSize`、`levels[{z,cols,rows}]`、`baseUrl`；放在输出目录 `manifest.json`。
- Viewer 判定顺序：若 scene.panoTiles.manifest 存在则走瓦片 → 失败则回退 fallback → 若仍无则按旧 pano/panoLow 流程。
- 首屏策略：先加载 z0 单张底图，立即出画面；随后按视角优先依次补齐 z2（低清）→ z3（高清）。
- 视角优先算法：按相机 yaw/pitch + 余量计算需要的 cols/rows，每 150ms 重新排队，避免抖动。
- 加载顺序/并发：z2 队列优先，其次 z3；并发 4；同一 tile 状态 empty/loading/ready，不重复请求。
- LRU：z3 保留 64 张，超出立即释放纹理，防止内存暴涨。
- 回退保障：manifest 拉取或 tile 失败会自动转用 fallback pano/panoLow；仍缺失则报错，不白屏。
- 罗盘/拾取/热点无改动；仅渲染管线新增 TilePanoSphere。
- 路径与同源：所有瓦片与 manifest 均在 `public/` 下，避免跨域与 MIME 问题。
- 发布链路强制：`npm run tiles:yhc-dongwu3 && npm run build && robocopy dist -> docs /MIR && git add -A && git commit && git push`，禁止直接改 docs/dist。
- 不要手动编辑 `docs/`、`dist/`；仅通过 build+robocopy 生成。
- 杨虎城纪念馆「东屋3」已切换为本地 demo.jpg 瓦片；原外链 URL 记录在 `panoTiles.fallback*` 便于回退。
- 热点文本标签保留：`src/ui/Hotspots.ts` + `.hotspot-label`，随热点一起移动/显隐。
- 中文乱码根因：曾用 PowerShell 重定向生成 UTF-16 BOM 文件，浏览器解码错误导致文字异常；已改为 UTF-8 无 BOM 并恢复中文内容。
- 黑屏根因：瓦片模式移除了整图后等待首瓦片，方向判定偏差仅加载少量瓦片；现新增 panoLow/pano 兜底首屏，修正 tile 中心方向 & 队列持续加载，保证“永不黑屏”。
- 黑屏闪烁二次根因：瓦片 z0 就绪即移除兜底，实际可见瓦片未稳定渲染导致回黑；现改为“可见帧确认”并保留兜底至连续 10 帧 tilesActiveCount>0。
- 渲染顺序：fallback sphere renderOrder=0 且 depthTest/depthWrite=false；tiles renderOrder=1、opacity 受控，未可见前保持 0，不再遮挡兜底。
- 状态条：加 `?tilesDebug=1` 可在左上角查看 mode/tilesActiveCount/lastError，无需控制台排查。
- 放弃多 mesh 瓦片：TilePanoSphere 方案的 UV/几何拆分导致 equirect 瓦片不可见，改用单球 + CanvasTexture 拼瓦片（TileCanvasPano），tile 仅作逻辑分块。
- Canvas 拼瓦片：按 manifest 读取 z0 首屏，z2/z3 视角驱动加载并绘制到同一 canvas，再驱动 MeshBasicMaterial(map=CanvasTexture)；保留 manifest/生成命令不变，仅影响东屋3。
- 发布铁律：`npm run build && robocopy dist docs /MIR && git add -A && git commit && git push`，严禁直接修改 docs/dist。
- 2026-01-27: 再次黑屏根因：多 mesh 方案已移除，但 Canvas 模式存在画布尺寸/队列计算不稳，tiles 请求停滞且 WebGL 报 offset 溢出，低清提示不消失。修复：canvas 尺寸固定为 zMax(cols*tileSize, rows*tileSize)，绘制前 clamp 坐标，仅全量 CanvasTexture 更新；视角经纬度→tile 范围映射，始终队列中心+邻近 tiles，保持 z0 首屏、z2/z3 持续请求；tilesDebug 显示 queued/loading/loaded/lastError，低清首帧即标记 ready 隐藏提示，仅东屋3 受影响。
- 2026-01-27（黑屏在缓存开启场景复现）：复现步骤：正常缓存开启刷新东屋3，低清闪现后黑屏；Disable cache 时不会黑。验收口径：缓存开启也必须始终有画面。根因（推测）：兜底/低清球在 tiles 状态更新时被清理或覆盖；渲染源切换缺少保护。修复：永不清理 fallback/低清球体，仅叠加 tiles；新增渲染源状态记录（fallback/low/tiles）、切换原因、清空计数，tilesDebug 可视；首屏低清一旦显示即保持可见，高精/瓦片失败不再影响画面。
- 2026-01-27 PM: 缓存开启复现：正常刷新进入“杨虎城纪念馆·东屋3”低清 png 短暂出现后黑屏；勾选 Disable cache 则低清常驻。验收口径：即便开启缓存也必须始终有画面（低清/备用/瓦片），不可回黑。推测根因：tile canvas 初始黑底覆盖 fallback 且可能清理/遮挡兜底，缓存命中导致瓦片队列停滞时黑底外泄。修复策略：fallback 常驻背景不清理；tile 材质初始透明，至少一块瓦片绘制且参与渲染后再显示；保留/增强渲染源状态、切换原因与清空计数，任何退化都留存低清/备用；tilesDebug 展示 mode/source/lastReason/clearedCount 便于肉眼排查。
- 2026-02-01: 关键资源优先级细化：外链图片支持 fetchPriority（panoLow/兜底高优先，pano 后台低优先）；瓦片高优先队列与低清队列按视角中心距离排序，首屏中心瓦片更早到位。
- 2026-02-01: KTX2 解码失败会自动禁用并降级 JPG，避免 .ktx2 + .jpg 双下载；最高层瓦片缩小视角边距且不扩邻，减少首屏传输量。
- 2026-02-01: 瓦片预加载顺序固定：先加载首屏左右 180 度（前半球），再加载后 180 度，正后方瓦片最后；无需等用户转动视角。

- KTX2/Basis: ??? `npm run ktx2:setup` ?? transcoder ? `public/assets/basis`??? `npm run tiles:ktx2 -- --in <tiles??>` ?? .ktx2?manifest ??? tileFormat=ktx2?????? KTX2 ???? jpg
