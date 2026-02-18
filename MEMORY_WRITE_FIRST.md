# Memory 写入前必读

更新时间：`2026-02-19 00:08:00`

## 关键结论
- Memory 写不进去的常见根因是鉴权不完整，不是“没读文档”本身。
- 典型报错：`insufficient_scope`、`401`、`403`。

## 固定写法（必须照做）
1. 先查健康与目标库：
```powershell
Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/health/detailed'
```
2. 写入前设置 UTF-8：
```powershell
chcp 65001
$env:PYTHONUTF8=1
```
3. 写入时必须带 Bearer：
```powershell
$token=$env:MCP_API_KEY
$body=@{
  content='2026-02-19 00:08:00 [tags:workflow] memory write sample'
  metadata=@{ tags=@('workflow'); timestamp='2026-02-19 00:08:00'; source='codex' }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/memories' -Method Post `
  -Headers @{ Authorization = "Bearer $token" } `
  -ContentType 'application/json; charset=utf-8' -Body $body
```

## 会话要求（给新窗口 AI）
- 先读：`AGENTS.md`、`README.md`、`MEMORY_WRITE_FIRST.md`。
- 再执行 memory 写入。
