# task_plan.md

## ä»»åŠ¡
VRPlayer é¦–è½®é«˜ ROI å…¨ä»“ä¼˜åŒ–ï¼ˆæ€§èƒ½ä¼˜å…ˆ + å…³é”®ç¨³å®šæ€§ä¿®å¤ï¼‰

## æ—¶é—´
- åˆ›å»ºæ—¶é—´: 2026-02-10 21:46:36
- æœ€æ–°æ›´æ–°: 2026-02-10 22:15:09

## é˜¶æ®µçŠ¶æ€
- [x] é˜¶æ®µ1 å…¥å£ä¾èµ–ç˜¦èº«ï¼ˆ`main.ts` åŠ¨æ€åŠ è½½ `editor/debug/structure3d/north-calibration/chat`ï¼‰
- [x] é˜¶æ®µ2 Dock é¢æ¿æƒ°æ€§åŒ–ï¼ˆ`DockPanels.tsx` é¢æ¿ loaderï¼›`BottomDock.tsx` æŒ‰éœ€åŠ è½½ `DockPanels`ï¼‰
- [x] é˜¶æ®µ3 Dollhouse é™è€¦ï¼ˆ`Dollhouse3DPanel.tsx` åŠ¨æ€åŠ è½½ `DollhouseScene` + token é˜²å¹¶å‘ï¼‰
- [x] é˜¶æ®µ4 CDN æŽ¢æµ‹åŽ»é˜»å¡žï¼ˆ`assetResolver.ts` ç¼“å­˜ä¸Šæ¬¡æˆåŠŸ CDN + TTL + åŽå°å¤æŽ¢æµ‹ï¼›`main.ts` ä¸é˜»å¡žç­‰å¾…ï¼‰
- [x] é˜¶æ®µ5 å…³é”®ç¨³å®šæ€§ä¿®å¤ï¼ˆå…¨å±€ç›‘å¬ä¸Ž RAF ç”Ÿå‘½å‘¨æœŸæ¸…ç†ï¼‰
- [x] é˜¶æ®µ6 æž„å»ºæ‹†åŒ…ï¼ˆ`vite.config.ts` manualChunks + `onlyExplicitManualChunks`ï¼‰
- [x] é˜¶æ®µ7 å‘å¸ƒï¼ˆ`dist -> docs -> commit -> push`ï¼‰

## çº¦æŸ
- ä»…ä¿®æ”¹ `src/**`ã€`README.md`ã€è§„åˆ’è®°å½•æ–‡ä»¶ã€‚
- ä¸æ‰‹æ”¹ `dist/**`ã€`docs/**`ã€‚
- ç»“è®ºå‰å¿…é¡»æœ‰æž„å»ºä¸Ž `chrome-devtools` è¯æ®é‡‡æ ·ï¼ˆsnapshot + network/consoleï¼‰ã€‚

## µÚ¶þÂÖÈÎÎñ
VRPlayer µÚ¶þÂÖÉîÈëÓÅ»¯£¨Ê×ÆÁÁ´Â·ÔÙÊÝÉí + ÎÈ¶¨ÐÔÊÕ¿Ú£©

## Ê±¼ä
- ´´½¨Ê±¼ä: 2026-02-10 22:46:15
- ×îÐÂ¸üÐÂ: 2026-02-10 23:08:18

## ½×¶Î×´Ì¬
- [x] ½×¶Î0 ¹æ»®ÎÄ¼þÓë memory ¹Ø¼ü½Úµã¼ÇÂ¼
- [x] ½×¶Î1 È¥³ý `three-extras` Ê×ÆÁÁ´Â·£¨`TileMeshPano/KTX2Loader` ¶¯Ì¬¼ÓÔØ£©
- [x] ½×¶Î2 ÁÄÌì¸ÄÎªÊ×½»»¥´¥·¢£¨ÒÆ³ý idle ×Ô¶¯Ô¤ÈÈ£©
- [x] ½×¶Î3 ³¡¾° UI ¶þ¶ÎÊ½¹ÒÔØ£¨LOW_READY ºóÒì²½¼ÓÔØ£©
- [x] ½×¶Î4 SW ¿Ç²ãÔ¤»º´æ + `/config.json` ÐÂÏÊ¶È±£»¤
- [x] ½×¶Î5 `PanoViewer/StructureView3D` resize ¼àÌý³É¶ÔÇåÀí
- [x] ½×¶Î6 ¹¹½¨Óë²ð°üÑéÖ¤£¨Ö÷°üÌå»ýÓë preload ½á¹û£©
- [ ] ½×¶Î7 ·¢²¼£¨`dist -> docs -> commit -> push`£©

## µÚÈýÂÖÈÎÎñ£¨ÉîÈëÓÅ»¯£©
VRPlayer µÚÈýÂÖÉîÈëÓÅ»¯£¨Èë¿Ú½âñî + Â·ÓÉ¼¶°´Ðè¼ÓÔØ + VR Ä£¿éÈ¥¾²Ì¬ÒÀÀµ£©

## Ê±¼ä
- ´´½¨Ê±¼ä: 2026-02-11 00:06:15
- ×îÐÂ¸üÐÂ: 2026-02-11 00:06:15

## ½×¶Î×´Ì¬
- [x] ½×¶Î1 Èë¿Ú½âñî£ºmain.ts ³éÀë SceneList Ò³ÃæÊµÏÖµ½ SceneListPage Ä£¿é
- [x] ½×¶Î2 Â·ÓÉ¼¶°´Ðè£ºPanoViewer/TopRightControls/BrandMark/StructureView2D ¸ÄÀÁ¼ÓÔØ
- [x] ½×¶Î3 ÀàÐÍÈ¥ñî£ºLoadStatus ÏÂ³Áµ½ src/types/loadStatus.ts
- [x] ½×¶Î4 VR È¥¾²Ì¬ÒÀÀµ£ºvrMode Ä£¿é¸Ä°´Ðè³õÊ¼»¯
- [x] ½×¶Î5 Ô¤¼ÓÔØ²ßÂÔ£ºÒÆ³ý HTML ¶Ô three-core/three-extras µÄ modulepreload
- [x] ½×¶Î6 Ö¤¾Ý»¯ÑéÖ¤£ºchrome-devtools snapshot + network + console
- [ ] ½×¶Î7 ·¢²¼£¨dist -> docs -> commit -> push£©
