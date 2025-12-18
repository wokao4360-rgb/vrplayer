# VR 全景 Web 播放器

自研的 VR 全景 Web 播放器，基于 Three.js 实现，支持多馆多场景、热点导航、地图导览等功能。

## 功能特性

- 🏛️ **多馆多场景**：支持多个展馆，每个展馆包含多个全景场景
- 🎯 **热点导航**：点击热点可跳转到其他场景或播放视频
- 🗺️ **地图导览**：右上角地图按钮，显示场景点位，点击切换场景
- 📱 **移动端优化**：支持触控拖拽、双指缩放（FOV）
- 🎬 **视频播放**：支持视频热点，弹出视频播放器
- ⚡ **性能优化**：预加载下一场景缩略图，显示加载状态

## 技术栈

- **Three.js**：3D 全景渲染
- **TypeScript**：类型安全
- **Vite**：快速构建工具
- **原生 HTML/CSS/JS**：无 UI 框架依赖

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:3000` 查看效果。

### 本地全景图（避免跨域）

- 将临时全景图放在 `public/assets/panos/demo.jpg`（如果是 JPG，请改为 `demo.jpg` 并同步修改 `public/config.json` 中的路径）。
- 示例配置中，王鼎纪念馆的所有场景已指向 `/assets/panos/demo.jpg`，本地开发时无需跨域即可加载。

### 云资源接入说明

- 全景图 / 视频 / 缩略图建议统一存放在腾讯云 COS，并通过 **https** 访问，例如 `https://<bucket>.cos.<region>.myqcloud.com/panos/demo.jpg`。
- App / 小程序仅负责打开播放器 URL（`?museum=xxx&scene=yyy`），不直接承载静态资源。
- COS 公有读或临时签名均可；播放器保持现有 Three.js TextureLoader 直连加载，无需额外 CORS 配置。

## App / 小程序对接方式（最小可用）

- 播放器是一个“URL 驱动的独立 VR 页面”。
- App / 小程序只需打开：`http://host/?museum=xxx&scene=yyy`
- 可选参数：`yaw`、`pitch`、`render`（如需原始画质可设 `render=original`，默认使用 `render=enhanced` 研学展示档）
- 当前阶段不涉及登录，也不需要 WebView 专有能力或额外 SDK。

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 配置说明

### config.json 结构

配置文件位于 `public/config.json`，是整个应用的配置中心。

```json
{
  "appName": "应用名称",
  "museums": [
    {
      "id": "museum_id",
      "name": "展馆名称",
      "cover": "封面图 URL",
      "map": {
        "image": "地图图片 URL",
        "width": 1000,
        "height": 600
      },
      "scenes": [
        {
          "id": "scene_id",
          "name": "场景名称",
          "pano": "全景图 URL（equirectangular JPG）",
          "thumb": "缩略图 URL",
          "initialView": {
            "yaw": 0,
            "pitch": 0,
            "fov": 75
          },
          "mapPoint": {
            "x": 420,
            "y": 310
          },
          "hotspots": [
            {
              "id": "hotspot_id",
              "type": "scene",
              "label": "热点标签",
              "yaw": 35,
              "pitch": -5,
              "target": {
                "museumId": "target_museum_id",
                "sceneId": "target_scene_id",
                "yaw": 120,
                "pitch": 0
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### 配置字段说明

- **appName**：应用标题
- **museums**：展馆数组
  - **id**：展馆唯一标识
  - **name**：展馆名称
  - **cover**：封面图 URL（用于馆列表展示）
  - **map**：地图配置
    - **image**：地图图片 URL
    - **width/height**：地图原始尺寸（用于计算点位坐标）
  - **scenes**：场景数组
    - **id**：场景唯一标识
    - **name**：场景名称
    - **pano**：全景图 URL（建议 4096x2048 或更高分辨率）
    - **thumb**：缩略图 URL（用于场景列表）
    - **initialView**：初始视角
      - **yaw**：水平角度（-180 到 180）
      - **pitch**：垂直角度（-90 到 90）
      - **fov**：视野角度（30 到 120）
    - **mapPoint**：地图上的点位坐标
      - **x/y**：相对于地图图片的像素坐标
    - **hotspots**：热点数组
      - **id**：热点唯一标识
      - **type**：热点类型（`scene` 或 `video`）
      - **label**：热点标签文本
      - **yaw/pitch**：热点在全景图中的位置（角度）
      - **target**：目标配置
        - **scene 类型**：`museumId`、`sceneId`、`yaw`、`pitch`
        - **video 类型**：`url`

## 从 0 配一个馆

本指南面向不会写代码的用户，帮助您快速配置一个完整的展馆。

### 必填字段清单

配置一个展馆，以下字段是**必须**的：

**根级别：**
- `appName`：应用名称（字符串）

**博物馆级别：**
- `id`：博物馆唯一标识（字符串，不能重复）
- `name`：博物馆名称（字符串）
- `cover`：封面图 URL（字符串，有效的图片链接）
- `map.image`：地图图片 URL（字符串）
- `map.width`：地图宽度（数字，大于 0）
- `map.height`：地图高度（数字，大于 0）
- `scenes`：场景数组（至少包含 1 个场景）

**场景级别：**
- `id`：场景唯一标识（字符串，同一博物馆内不能重复）
- `name`：场景名称（字符串）
- `pano` 或 `panoLow`：至少提供一个全景图 URL（字符串）
- `thumb`：缩略图 URL（字符串）
- `initialView.yaw`：初始水平角度（数字）
- `initialView.pitch`：初始垂直角度（数字）
- `mapPoint.x`：地图点位 X 坐标（数字）
- `mapPoint.y`：地图点位 Y 坐标（数字）
- `hotspots`：热点数组（可以为空数组 `[]`）

**热点级别（如果配置了热点）：**
- `id`：热点唯一标识（字符串，同一场景内不能重复）
- `type`：热点类型，必须是 `"scene"` 或 `"video"`（字符串）
- `label`：热点标签文本（字符串）
- `yaw`：热点水平角度（数字）
- `pitch`：热点垂直角度（数字）
- `target`：目标配置（对象）
  - `scene` 类型：必须包含 `museumId` 和 `sceneId`（字符串）
  - `video` 类型：必须包含 `url`（字符串）

### 多馆/多场景最小示例

以下是一个包含 2 个博物馆、每个博物馆 2 个场景的最小配置示例：

```json
{
  "appName": "我的 VR 展馆",
  "museums": [
    {
      "id": "museum1",
      "name": "第一展馆",
      "cover": "https://example.com/museum1-cover.jpg",
      "map": {
        "image": "https://example.com/museum1-map.jpg",
        "width": 1000,
        "height": 600
      },
      "scenes": [
        {
          "id": "scene1",
          "name": "场景一",
          "pano": "https://example.com/scene1-pano.jpg",
          "thumb": "https://example.com/scene1-thumb.jpg",
          "initialView": {
            "yaw": 0,
            "pitch": 0,
            "fov": 75
          },
          "mapPoint": {
            "x": 300,
            "y": 200
          },
          "hotspots": []
        },
        {
          "id": "scene2",
          "name": "场景二",
          "pano": "https://example.com/scene2-pano.jpg",
          "thumb": "https://example.com/scene2-thumb.jpg",
          "initialView": {
            "yaw": 0,
            "pitch": 0,
            "fov": 75
          },
          "mapPoint": {
            "x": 600,
            "y": 400
          },
          "hotspots": [
            {
              "id": "to_scene1",
              "type": "scene",
              "label": "返回场景一",
              "yaw": -180,
              "pitch": 0,
              "target": {
                "museumId": "museum1",
                "sceneId": "scene1"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "museum2",
      "name": "第二展馆",
      "cover": "https://example.com/museum2-cover.jpg",
      "map": {
        "image": "https://example.com/museum2-map.jpg",
        "width": 800,
        "height": 500
      },
      "scenes": [
        {
          "id": "scene1",
          "name": "场景一",
          "pano": "https://example.com/museum2-scene1-pano.jpg",
          "thumb": "https://example.com/museum2-scene1-thumb.jpg",
          "initialView": {
            "yaw": 0,
            "pitch": 0,
            "fov": 75
          },
          "mapPoint": {
            "x": 200,
            "y": 150
          },
          "hotspots": []
        }
      ]
    }
  ]
}
```

### panoLow / pano 渐进式加载配置

为了提升加载体验，播放器支持**渐进式加载**：先显示低清图，后台加载高清图后无缝替换。

**配置方式：**

1. **只配置 `pano`（传统方式）**：
   ```json
   {
     "pano": "https://example.com/scene-hd.jpg"
   }
   ```
   播放器会直接加载高清图。

2. **同时配置 `panoLow` 和 `pano`（推荐）**：
   ```json
   {
     "panoLow": "https://example.com/scene-low.jpg",
     "pano": "https://example.com/scene-hd.jpg"
   }
   ```
   播放器会先加载低清图（快速显示），然后后台加载高清图并无缝替换。

3. **只配置 `panoLow`**：
   ```json
   {
     "panoLow": "https://example.com/scene-low.jpg"
   }
   ```
   播放器只加载低清图（适合网络较慢的场景）。

**建议：**
- `panoLow`：分辨率建议 2048x1024 或更低，文件大小 < 2MB
- `pano`：分辨率建议 4096x2048 或更高，文件大小 < 10MB
- 两者都配置时，确保两张图是同一场景的不同分辨率版本

### ?debug=1 调试模式：如何打热点

调试模式可以帮助您快速确定热点的位置坐标（yaw/pitch）。

#### 如何开启调试模式

在浏览器地址栏的 URL 后面添加 `&debug=1`：

```
http://localhost:5173/?museum=wangding&scene=front_yard&debug=1
```

#### 如何使用调试模式打热点

1. **打开调试模式**：在 URL 中添加 `?debug=1` 或 `&debug=1`

2. **查看当前位置参数**：
   - **PC 端**：双击全景图的任意位置
   - **移动端**：长按（约 0.5 秒）全景图的任意位置
   
   会弹出调试面板，显示当前视角的 `yaw`、`pitch`、`fov` 值。

3. **复制热点 JSON**：
   - 点击调试面板中的「📋 复制热点 JSON」按钮
   - 会自动复制一个热点 JSON 片段到剪贴板
   - 格式如下：
     ```json
     {
       "id": "hs_1234567890",
       "yaw": 12.3,
       "pitch": -4.5,
       "type": "scene",
       "targetSceneId": "",
       "label": "热点"
     }
     ```

4. **完善热点配置**：
   - 将复制的 JSON 粘贴到 `config.json` 的 `hotspots` 数组中
   - 修改 `id` 为有意义的名称（如 `"to_exhibit_hall"`）
   - 修改 `label` 为热点显示的文字（如 `"进入展厅"`）
   - 如果是场景跳转热点：
     - 设置 `type: "scene"`
     - 在 `target` 中添加 `museumId` 和 `sceneId`
     - 可选：添加 `target.yaw`、`target.pitch` 指定跳转后的视角
   - 如果是视频热点：
     - 设置 `type: "video"`
     - 在 `target` 中添加 `url`（视频链接）

**示例：打一个场景跳转热点**

1. 在调试模式下，双击/长按目标位置，复制 JSON
2. 修改为：
   ```json
   {
     "id": "to_exhibit",
     "type": "scene",
     "label": "进入展厅",
     "yaw": 35.2,
     "pitch": -5.1,
     "target": {
       "museumId": "wangding",
       "sceneId": "exhibit_hall",
       "yaw": 120,
       "pitch": 0
     }
   }
   ```

**示例：打一个视频热点**

```json
{
  "id": "play_video",
  "type": "video",
  "label": "观看讲解视频",
  "yaw": -20.5,
  "pitch": -2.3,
  "target": {
    "url": "https://example.com/video.mp4"
  }
}
```

### 常见错误与对应提示

配置错误时，页面会显示错误清单面板，列出所有错误。以下是常见错误及解决方法：

| 错误路径 | 错误信息 | 解决方法 |
|---------|---------|---------|
| `appName` | appName 必须是非空字符串 | 检查 `appName` 字段是否存在且不为空 |
| `museums[0].id` | id 必须是非空字符串 | 检查博物馆的 `id` 字段 |
| `museums[0].id` | 博物馆 ID "xxx" 重复 | 确保每个博物馆的 `id` 唯一 |
| `museums[0].scenes[1].pano` | pano 或 panoLow 至少需要提供一个 | 场景必须提供 `pano` 或 `panoLow` 至少一个 |
| `museums[0].scenes[1].pano` | pano 必须是有效的 URL 字符串 | 检查 `pano` 字段是否为有效的 URL |
| `museums[0].scenes[1].id` | 场景 ID "xxx" 在博物馆内重复 | 确保同一博物馆内场景 `id` 唯一 |
| `museums[0].scenes[1].hotspots[0].type` | type 必须是 "scene" 或 "video" | 热点 `type` 只能是 `"scene"` 或 `"video"` |
| `museums[0].scenes[1].hotspots[0].target.museumId` | scene 类型热点的 target.museumId 必须是非空字符串 | 场景跳转热点必须提供 `target.museumId` |
| `museums[0].scenes[1].hotspots[0].target.url` | video 类型热点的 target.url 必须是有效的 URL 字符串 | 视频热点必须提供 `target.url` |

**错误面板操作：**
- **🔄 刷新重试**：修复配置后点击此按钮重新加载
- **📖 查看示例配置**：打开新窗口查看配置示例

## 路由说明

播放器支持 URL 参数控制显示内容：

- **无参数**：显示馆列表
  ```
  http://your-domain.com/
  ```

- **只有 museum**：显示该馆的场景列表
  ```
  http://your-domain.com/?museum=wangding
  ```

- **museum + scene**：直接进入场景
  ```
  http://your-domain.com/?museum=wangding&scene=front_yard
  ```

- **启用调试模式**：添加 `debug=1` 参数
  ```
  http://your-domain.com/?museum=wangding&scene=front_yard&debug=1
  ```

## 部署到微信云开发静态网站托管

### 1. 准备资源

1. **全景图/缩略图/地图图**：上传到云存储（建议开启 CDN）
2. **config.json**：更新其中的 URL 为云存储地址
3. **构建项目**：运行 `npm run build`

### 2. 上传到静态网站托管

1. 登录微信云开发控制台
2. 进入「静态网站托管」
3. 上传 `dist/` 目录中的所有文件
4. 设置默认首页为 `index.html`

### 3. 配置域名（可选）

在静态网站托管中配置自定义域名，即可通过域名访问。

## 全景图要求

- **格式**：JPG 或 PNG
- **投影**：Equirectangular（等距圆柱投影）
- **分辨率**：建议 4096x2048 或更高（4096x2048 为 2:1 比例）
- **文件大小**：建议单张不超过 10MB（可通过压缩优化）

## 移动端适配

- ✅ 支持触控拖拽查看全景
- ✅ 支持双指缩放（调整 FOV）
- ✅ 适配微信小程序 web-view
- ✅ 适配 App WebView
- ✅ 考虑安全区域（safe-area-inset）
- ✅ 考虑微信胶囊按钮位置

## 资源加载与清晰度策略

播放器采用**渐进式加载**策略，确保低网速环境下也能快速显示内容，不白屏。

### 四类资源的用途

播放器将资源分为四类，每类有不同的加载策略：

1. **thumb（缩略图）**
   - **用途**：列表/预览显示
   - **加载时机**：进入场景列表时加载，预加载下一场景
   - **推荐规格**：400x200 或更小，< 100KB

2. **panoLow（低清全景图）**
   - **用途**：首屏快速加载，优先显示
   - **加载时机**：进入场景时立即加载
   - **推荐规格**：2048x1024，< 2MB
   - **必需性**：如果配置了 `pano`，建议同时配置 `panoLow`

3. **pano（高清全景图）**
   - **用途**：高清替换，提升视觉质量
   - **加载时机**：低清图加载完成后，后台自动加载
   - **推荐规格**：4096x2048 或更高，< 10MB
   - **必需性**：如果只配置了 `panoLow`，可以不配置 `pano`

4. **video（视频）**
   - **用途**：热点视频播放
   - **加载时机**：点击视频热点后才加载（延迟加载，节省带宽）
   - **推荐规格**：MP4/H.264，根据网络情况选择分辨率

### 加载状态说明

播放器会显示当前加载状态，右下角会显示状态提示：

- **⏳ 正在加载低清图...**：首次进入场景时显示
- **✅ 低清图已加载**：低清图加载完成，可以开始交互（3秒后自动隐藏）
- **⏳ 正在加载高清图...**：后台加载高清图时显示
- **✨ 已切换至高清**：高清图加载完成并替换（3秒后自动隐藏）
- **⚠️ 当前为低清模式（网络较慢）**：高清图加载失败，继续使用低清图（降级模式）
- **❌ 加载失败**：所有资源加载失败

### 失败兜底逻辑

播放器具备完善的失败兜底机制，确保不白屏：

#### 场景 1：高清图加载失败
- **行为**：保留低清图，继续正常使用
- **状态**：标记为降级模式（degraded）
- **提示**：显示"当前为低清模式（网络较慢）"
- **用户体验**：可以正常浏览，只是清晰度较低

#### 场景 2：低清图加载失败
- **行为**：尝试加载高清图作为兜底
- **状态**：如果高清图也失败，则显示错误提示
- **提示**：显示"加载失败"，提供重试选项
- **用户体验**：不会白屏，会显示明确的错误信息

#### 场景 3：所有资源加载失败
- **行为**：显示错误 UI，不崩溃
- **状态**：ERROR 状态
- **提示**：显示友好的错误提示，提供刷新重试
- **用户体验**：明确知道问题所在，可以采取行动

### 推荐分辨率

| 资源类型 | 推荐分辨率 | 文件大小 | 格式建议 |
|---------|-----------|---------|---------|
| thumb | 400x200 | < 100KB | JPG/WebP |
| panoLow | 2048x1024 | < 2MB | JPG |
| pano | 4096x2048 | < 10MB | JPG |
| video | 720p/1080p | 根据网络 | MP4/H.264 |

### 网络差时的表现

- **网络较慢**：
  - 低清图快速显示（1-3秒）
  - 高清图后台加载，加载完成后自动替换
  - 用户体验：可以立即开始浏览，随后自动变清晰

- **网络很差**：
  - 低清图可能需要较长时间（5-10秒）
  - 高清图可能加载失败，使用低清图（降级模式）
  - 用户体验：可以正常使用，清晰度较低但可用

- **网络中断**：
  - 如果低清图已加载，可以继续使用
  - 如果所有资源都未加载，显示错误提示
  - 用户体验：不会白屏，有明确的错误提示

### 常见错误排查

#### 问题：图片加载失败
- **检查项**：
  1. URL 是否正确（完整路径，包含协议）
  2. 图片是否存在（访问 URL 验证）
  3. CORS 配置（如果跨域）
  4. 文件格式是否支持（JPG/PNG）

#### 问题：高清图一直不加载
- **可能原因**：
  1. 网络较慢，还在加载中
  2. 高清图 URL 错误或不存在
  3. 浏览器缓存问题
- **解决方案**：
  1. 检查网络连接
  2. 验证高清图 URL
  3. 清除浏览器缓存重试

#### 问题：显示"降级模式"
- **含义**：高清图加载失败，使用低清图
- **原因**：网络问题或高清图 URL 错误
- **解决方案**：
  1. 检查网络连接
  2. 验证高清图 URL 是否正确
  3. 可以继续使用低清图，不影响基本功能

## 性能优化建议

1. **图片优化**：
   - 使用 WebP 格式（需浏览器支持）
   - 压缩全景图（平衡质量和大小）
   - 缩略图使用较低分辨率

2. **CDN 加速**：
   - 将资源放在 CDN 上
   - 启用 HTTP/2

3. **预加载**：
   - 已实现预加载下一场景缩略图
   - 可根据需要扩展预加载策略

4. **渐进式加载**：
   - 同时配置 `panoLow` 和 `pano`，获得最佳体验
   - 低清图快速显示，高清图后台加载

## 浏览器兼容性

- Chrome/Edge（推荐）
- Safari（iOS/macOS）
- 微信内置浏览器
- 其他现代浏览器

## 开发注意事项

1. **热点位置计算**：当前热点位置计算较为简化，如需精确位置，需要根据相机视角进行 3D 到 2D 的投影计算
2. **视频播放**：视频播放依赖浏览器原生 `<video>` 标签，某些浏览器可能需要用户交互才能自动播放
3. **内存管理**：切换场景时会清理旧资源，避免内存泄漏

## 许可证

MIT License















