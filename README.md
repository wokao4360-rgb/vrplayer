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
- 生成脚本：`npm run tiles:yhc-dongwu3`（封装 `scripts/generate-pano-tiles.mjs`，固定 tileSize=512，z0 1x1 → z1 2x1 → z2 4x2 → z3 8x4），可重复执行。
- manifest 结构：`type`、`tileSize`、`levels[{z,cols,rows}]`、`baseUrl`；放在输出目录 `manifest.json`。
- Viewer 判定顺序：若 scene.panoTiles.manifest 存在则走瓦片 → 失败则回退 fallback → 若仍无则按旧 pano/panoLow 流程。
- 首屏策略：先加载 z0 单张底图，立即出画面；随后按视角优先依次补齐 z2（低清）→ z3（高清）。
- 视角优先算法：基于相机 forward 向量与 tile 中心方向点积；阈值 `cos(fov/2+20°)`；每 150ms 重新排队，避免抖动。
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
