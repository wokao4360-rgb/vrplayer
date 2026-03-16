# Findings

## 2026-03-16

- 当前已上线实现已经满足 museum shell 的三条核心基线：`?museum=<id>` 先出 cover、同馆切点复用 viewer shell、相机视角通过 `replaceState` 同步 URL。
- 当前缺口不在“有没有壳层”，而在“壳层是否完全产品化”：
  - 状态机未独立建模，仍散落在 `src/main.ts`
  - 预加载只做了 preview 级别的轻预热，没有完整的 L0/L1/L2/L3 调度
  - 转场层尚未完成 `scene A snapshot -> scene B preview` 的显式 crossfade
- 现有 hero tile 方向判定已经成熟，可直接复用：
  - `buildCubeLowFaceOrder()` 实现前/左/右/上/下/后
  - `buildCubeVisibleHighFaces()` 实现当前前半球 3 个面
  - `buildCubeHighTileKeys()` 可稳定给出 12 张 hero 高清块图顺序
- `public/config.json` 当前原始 schema 仍是旧字段：
  - museum：`name/description/cover/marketing/scenes`
  - scene：`pano/panoLow/panoTiles/thumb/initialView/hotspots`
  - 未来要的 `cover.brandLogos/defaultSceneId/preview/hires/neighbors` 需要通过兼容归一化层补出来
- 当前 `MuseumShellChrome` 只有两层底图：
  - `transitionBackground`
  - `transitionSnapshot`
  还没有独立的 target preview 图层，因此 `markPreviewReady()` 只改 label，不会真正完成 preview crossfade。
