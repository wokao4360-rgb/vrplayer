# Survey FC App

最小阿里云 FC 问卷后端，配套 `public/survey/` 独立问卷页使用。

## 能力

- `POST /submit`
  - 接收一份真实问卷答卷
  - 一答卷一 JSON 写入 OSS
- `GET /stats`
  - 聚合当前所有真实答卷
  - 返回总样本数、各题统计、高频问题、开放题摘录
- `GET /health`
  - 健康检查

## 环境变量

- `OSS_REGION`
  - 例如 `oss-cn-hangzhou`
- `OSS_BUCKET`
  - 例如后续创建的问卷专用 bucket
- `SURVEY_PREFIX`
  - 默认 `survey-responses`
- `ALLOWED_ORIGINS`
  - 逗号分隔，至少包含：
    - `https://xn--48s508d.xyz`
    - `https://研学.xyz`
    - `http://127.0.0.1:4174`
    - `http://localhost:4174`

## 运行时要求

- Node.js HTTP Handler
- 入口：`index.handler`
- 函数角色必须具备写 OSS 和读 OSS 的权限

## 本地检查

```powershell
cd D:\Projects\vrplayer_museum_shell_full\survey-fc-app
npm install
npm run check
```
