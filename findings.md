# findings.md

## 2026-02-10 21:46:36 基线
- `main.ts` 入口存在多处可选功能静态耦合，导致首屏依赖链偏重。
- `DockPanels.tsx` 和 `Dollhouse3DPanel.tsx` 存在可选模块静态引入。
- CDN 探测仅有 probe，无“上次成功节点缓存”。
- 多处全局监听与 RAF 缺少统一清理。

## 2026-02-10 22:15:09 本轮关键发现与结果
- 首屏入口主包已明显下降：`dist/assets/index-QqKJpH12.js` 为 `223.77 kB`（minified）。
- `index.html` 仅保留 `three-core` 与 `three-extras` 的 modulepreload；`editor-debug/chat-community/dock-panels` 不再首屏预拉取。
- `chat-community` 仍按“场景可见后 idle 初始化”触发自动加载（非阻塞首屏，但会在空闲时请求）。
- `dock-panels` 已验证按触发加载：首次打开社区或切到 3D 结构图时才请求。
- `editor-debug` 已验证仅在 `?debug=1` / `?editor=1` 触发请求。
- MCP 采样中无新的运行时错误；仅保留已有警告（`apple-mobile-web-app-capable`、`favicon 404`、表单可访问性提示）。

## 2026-02-10 22:20:43 发布验证
- 发布提交：`588dfbb4fe435c30966aa0466c6038b9aaf84d1c`，已推送到 `origin/main`。
- 远端 `main` HEAD 与本地 HEAD 一致。
- 页面资源已切换到新构建：`https://wokao4360-rgb.github.io/vrplayer/` 返回 `assets/index-QqKJpH12.js`。

## 2026-02-10 23:08:18 �ڶ��ֹؼ���������
- ���������`dist/assets/index-DVqOpICs.js` = `180.66 kB`��Ŀ�� `<= 210 kB` ��ɣ���
- ���� preload��`dist/index.html` ������ `three-core`�����Ƴ� `three-extras` Ԥ���ء�
- `TileMeshPano` �� `KTX2Loader` ��Ϊ���趯̬���أ��� KTX2 ������`scene=gate`�������в����� `three-extras` / `tile-ktx2`��
- �����Ϊ�׽���������`scene=gate` ��ʼ���󲻺� `chat-community`���״ε��������� `assets/chat-community-*.js`��
- Dock ��屣�ְ��裺��������������״����� `assets/dock-panels-*.js`��
- `?debug=1` / `?editor=1` ���ڶ�Ӧģʽ���� `assets/editor-debug-*.js`��
- �ȶ����޸���`PanoViewer.ts` �� `StructureView3D.ts` �� `resize` ������Ϊ�־����ã�`add/remove` �ɶ�������
- SW ���Ը��£������ǲ�Ԥ���棨index + js/css����`/config.json` ��ʽ�� network-only����д��ǲ㻺�棩��

## 2026-02-10 23:25:52 ֱ��������֤
- PR �ѹرգ�https://github.com/wokao4360-rgb/vrplayer/pull/1����
- �����ύ��`43c3287`��
- ���ϲ���ȷ�ϣ���ҳ�ű� hash ���� `assets/index-DVqOpICs.js`����ʾ Pages �Ѳ��𵽱��β��
