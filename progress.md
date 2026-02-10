# progress.md

## 2026-02-10 21:46:36
- åˆ›å»º `task_plan.md` / `findings.md` / `progress.md`ã€‚
- è¿›å…¥åˆ†é˜¶æ®µå®žæ–½ã€‚

## 2026-02-10 22:00:12
- å®Œæˆå…¥å£åŠ¨æ€åŠ è½½æ”¹é€ ï¼ˆ`ConfigStudio`ã€`DebugPanel`ã€`StructureView3D`ã€`NorthCalibrationPanel`ã€`FcChatPanel/FcChatClient`ï¼‰ã€‚
- å®Œæˆç¨³å®šæ€§ä¿®å¤ï¼ˆç›‘å¬å™¨ä¸Ž RAF æ¸…ç†ï¼‰ã€‚

## 2026-02-10 22:08:27
- å®Œæˆ `DockPanels.tsx` å¼‚æ­¥é¢æ¿åŠ è½½ä¸Ž `Dollhouse3DPanel.tsx` åŠ¨æ€åœºæ™¯åŠ è½½ã€‚
- å®Œæˆ `assetResolver.ts` ä¸Šæ¬¡æˆåŠŸ CDN ç¼“å­˜ + TTL + åŽå°å¤æŽ¢æµ‹ã€‚

## 2026-02-10 22:12:54
- ä¿®å¤ `main.ts` è¯­æ³•æ–­ç‚¹ä¸Žå¼‚å¸¸æ³¨é‡Šå—ï¼Œæ¢å¤å¯æž„å»ºçŠ¶æ€ã€‚
- `npm run build` é€šè¿‡ã€‚

## 2026-02-10 22:15:09
- é‡æž„ `BottomDock.tsx` ä¸ºæŒ‰éœ€åŠ è½½ `DockPanels`ï¼Œä¿®æ­£ optional chunk é¦–å±é¢„æ‹‰å–ã€‚
- è°ƒæ•´ `vite.config.ts`ï¼ˆ`onlyExplicitManualChunks` + æ‰‹å·¥åˆ†åŒ…ï¼‰ã€‚
- å®Œæˆå¤šè½® `chrome-devtools` è¯æ®é‡‡æ ·ï¼ˆnormal/debug/editor/community/map/dollhouse/structure3dï¼‰ã€‚
- å¾…æ‰§è¡Œï¼š`dist -> docs -> commit -> push` å‘å¸ƒé“¾è·¯ã€‚

## 2026-02-10 22:20:43
- å·²æ‰§è¡Œå‘å¸ƒé“¾è·¯ï¼š`git pull --rebase`ï¼ˆé€šè¿‡ï¼‰â†’ `npm run build`ï¼ˆé€šè¿‡ï¼‰â†’ `robocopy dist docs /MIR`ï¼ˆé€šè¿‡ï¼‰â†’ `git commit` â†’ `git push`ã€‚
- å‘å¸ƒæäº¤ï¼š`588dfbb4fe435c30966aa0466c6038b9aaf84d1c`ã€‚
- è¿œç«¯åˆ†æ”¯å·²å¯¹é½è¯¥æäº¤ï¼›`https://wokao4360-rgb.github.io/vrplayer/` å·²è¿”å›žæ–°å“ˆå¸Œ `index-QqKJpH12.js`ã€‚

## 2026-02-10 22:53:11
- Íê³É `PanoViewer.ts` / `TileMeshPano.ts` ²ð·Ö£º`TileMeshPano` Óë `KTX2Loader` ¸ÄÎª¶¯Ì¬¼ÓÔØ¡£
- Íê³É `main.ts` Ê×½»»¥ÁÄÌì´¥·¢ÓëÇåÀíÂß¼­£¬ÒÆ³ý³¡¾° idle ×Ô¶¯Ô¤ÈÈÁÄÌì¡£

## 2026-02-10 23:02:47
- Íê³É `main.ts` ¶þ¶ÎÊ½ UI ¹ÒÔØ£º`VideoPlayer/GuideTray/SceneGuideDrawer/BottomDock/TopModeTabs/Hotspots/QualityIndicator` ÔÚ LOW_READY ºóÒì²½¼ÓÔØ¡£
- Íê³É `StructureView3D.ts` Óë `PanoViewer.ts` resize ¼àÌý³É¶Ô½â°ó¡£
- Íê³É `public/sw.js` ¿Ç²ãÔ¤»º´æÓë `/config.json` ÐÂÏÊ¶È²ßÂÔ¡£

## 2026-02-10 23:08:18
- `npm run build` Í¨¹ý£»Ö÷°ü½µÖÁ `180.66 kB`£¬`dist/index.html` ÒÑÎÞ `three-extras` preload¡£
- Íê³É chrome-devtools Ö¤¾Ý²ÉÑù£ºnormal/debug/editor + Ê×½»»¥ÁÄÌì + community ÀÁ¼ÓÔØ + ·Ç KTX2 ³¡¾°ÎÞ `three-extras` ÇëÇó¡£
- ´ýÖ´ÐÐ£º·¢²¼Á´Â· `dist -> docs -> commit -> push`¡£

## 2026-02-10 23:25:52
- °´ÓÃ»§ÒªÇó¹Ø±Õ PR #1£¨²»×ß PR ºÏ²¢£©£¬²¢Ö±½ÓÉÏÏß¡£
- `main` ÒÑ fast-forward ºÏÈëÓÅ»¯Ìá½» `78d2e06`¡£
- Ö´ÐÐ·¢²¼Á´Â·£º`npm run build` -> `robocopy .\\dist .\\docs /MIR` -> Ìá½» `43c3287` -> `git push origin main`¡£
- Ô¶¶Ë `origin/main` ÒÑ¶ÔÆë `43c3287`£¬ÏßÉÏ `https://wokao4360-rgb.github.io/vrplayer/` ÒÑ´Ó `index-QqKJpH12.js` ¸üÐÂµ½ `index-DVqOpICs.js`¡£

## 2026-02-11 00:06:15
- Ö´ÐÐµÚÈýÂÖÉîÈëÖØ¹¹£ºmain.ts Èë¿Ú½âñî + ³¡¾°/ÁÐ±íÂ·ÓÉ¼¶ÀÁ¼ÓÔØ¡£
- ÐÂÔö src/ui/SceneListPage.ts£¬½«³¡¾°ÁÐ±íÒ³ÃæäÖÈ¾ÓëÑùÊ½´Ó main.ts ²ð³ö¡£
- ÐÂÔö src/types/loadStatus.ts£¬PanoViewer/QualityIndicator/main ¸ÄÎªÒÀÀµ¹²ÏíÀàÐÍ£¬Ïû³ý UI ·´ÏòñîºÏ¡£
- rMode ¸Ä°´Ðè¼ÓÔØ³õÊ¼»¯£¬É¾³ýÈë¿Ú¾²Ì¬ÒÀÀµ£¬ÑéÖ¤ ?museum=wangding Â·ÓÉ²»ÔÙÇëÇó 	hree-core¡£
- Íê³É chrome-devtools Ö¤¾Ý²ÉÑù£ºsnapshot + network + console ¸²¸Ç³¡¾°Â·ÓÉÓëÁÐ±íÂ·ÓÉ¡£
- µ±Ç°´ýÖ´ÐÐ£ºÊÇ·ñ°´ SOP ·¢²¼£¨dist -> docs -> commit -> push£©¡£
