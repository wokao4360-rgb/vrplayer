const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./PanoViewer-CWN_vCDJ.js","./three-renderer-sQHNT78z.js","./externalImage-C8_s6D1F.js","./TopRightControls-3s5TYdCt.js","./BrandMark-bMNafDG3.js","./StructureView2D-zkjJIym3.js","./autoLayout-ZgSeGcPI.js","./floorplanAdapter-BDPh-WSw.js","./renderFloorplanSvg-BfGGYliK.js","./dock-panels-DHLox7kQ.js","./MuseumList-h1x7llH4.js","./SceneListPage-lCfLpChX.js","./sceneGraph-BFajjk2P.js","./vrMode-D0JfzTr1.js","./three.module-Brkpord5.js","./appModals-Be8StHqP.js","./Modal-Cmv3TBkb.js","./copyText-CwU0x1sN.js","./scene-runtime--JK5eek1.js","./warmupScheduler-BzjA17cw.js","./ConfigErrorPanel-Bi87Tz5b.js","./errorMessages-fN8dki0I.js","./editor-debug-D45gsJxt.js","./draftStorage-Be1LM_rK.js"])))=>i.map(i=>d[i]);
var Wt=Object.defineProperty;var zt=(t,e,r)=>e in t?Wt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var a=(t,e,r)=>zt(t,typeof e!="symbol"?e+"":e,r);import{V as Xt,W as qt,S as jt,O as Qt,a as Zt,P as Jt,M as Kt,T as er,b as tr,C as Je,L as Ke}from"./three-renderer-sQHNT78z.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();const rr="modulepreload",ir=function(t,e){return new URL(t,e).href},et={},_=function(e,r,i){let n=Promise.resolve();if(r&&r.length>0){const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=Promise.allSettled(r.map(d=>{if(d=ir(d,i),d in et)return;et[d]=!0;const u=d.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(!!i)for(let v=o.length-1;v>=0;v--){const f=o[v];if(f.href===d&&(!u||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${m}`))return;const M=document.createElement("link");if(M.rel=u?"stylesheet":rr,u||(M.as="script"),M.crossOrigin="",M.href=d,l&&M.setAttribute("nonce",l),document.head.appendChild(M),u)return new Promise((v,f)=>{M.addEventListener("load",v),M.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return n.then(o=>{for(const c of o||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})},h={INVALID_ROOT:"INVALID_ROOT",MISSING_APP_NAME:"MISSING_APP_NAME",MISSING_LANDING:"MISSING_LANDING",MISSING_LANDING_BRAND_TITLE:"MISSING_LANDING_BRAND_TITLE",MISSING_LANDING_HERO_TITLE:"MISSING_LANDING_HERO_TITLE",MISSING_LANDING_HERO_SUBTITLE:"MISSING_LANDING_HERO_SUBTITLE",MUSEUMS_NOT_ARRAY:"MUSEUMS_NOT_ARRAY",MUSEUMS_EMPTY:"MUSEUMS_EMPTY",MISSING_MUSEUM_ID:"MISSING_MUSEUM_ID",DUPLICATE_MUSEUM_ID:"DUPLICATE_MUSEUM_ID",MISSING_MUSEUM_NAME:"MISSING_MUSEUM_NAME",MISSING_MUSEUM_COVER:"MISSING_MUSEUM_COVER",INVALID_MUSEUM_MARKETING:"INVALID_MUSEUM_MARKETING",MISSING_MUSEUM_MARKETING_HOOK:"MISSING_MUSEUM_MARKETING_HOOK",INVALID_MUSEUM_MARKETING_TAGS:"INVALID_MUSEUM_MARKETING_TAGS",MISSING_MUSEUM_MAP:"MISSING_MUSEUM_MAP",MISSING_MAP_IMAGE:"MISSING_MAP_IMAGE",INVALID_MAP_WIDTH:"INVALID_MAP_WIDTH",INVALID_MAP_HEIGHT:"INVALID_MAP_HEIGHT",INVALID_MAP_NODES:"INVALID_MAP_NODES",DUPLICATE_FLOORPLAN_NODE_ID:"DUPLICATE_FLOORPLAN_NODE_ID",INVALID_FLOORPLAN_NODE:"INVALID_FLOORPLAN_NODE",INVALID_MAP_PATHS:"INVALID_MAP_PATHS",INVALID_FLOORPLAN_PATH:"INVALID_FLOORPLAN_PATH",SCENES_NOT_ARRAY:"SCENES_NOT_ARRAY",SCENES_EMPTY:"SCENES_EMPTY",MISSING_SCENE_ID:"MISSING_SCENE_ID",DUPLICATE_SCENE_ID:"DUPLICATE_SCENE_ID",MISSING_SCENE_NAME:"MISSING_SCENE_NAME",MISSING_PANO:"MISSING_PANO",INVALID_PANO_URL:"INVALID_PANO_URL",INVALID_PANOLOW_URL:"INVALID_PANOLOW_URL",MISSING_THUMB:"MISSING_THUMB",MISSING_INITIAL_VIEW:"MISSING_INITIAL_VIEW",INVALID_YAW:"INVALID_YAW",INVALID_PITCH:"INVALID_PITCH",INVALID_FOV:"INVALID_FOV",MISSING_MAP_POINT:"MISSING_MAP_POINT",INVALID_MAP_POINT_X:"INVALID_MAP_POINT_X",INVALID_MAP_POINT_Y:"INVALID_MAP_POINT_Y",HOTSPOTS_NOT_ARRAY:"HOTSPOTS_NOT_ARRAY",MISSING_HOTSPOT_ID:"MISSING_HOTSPOT_ID",DUPLICATE_HOTSPOT_ID:"DUPLICATE_HOTSPOT_ID",INVALID_HOTSPOT_TYPE:"INVALID_HOTSPOT_TYPE",MISSING_HOTSPOT_LABEL:"MISSING_HOTSPOT_LABEL",INVALID_HOTSPOT_YAW:"INVALID_HOTSPOT_YAW",INVALID_HOTSPOT_PITCH:"INVALID_HOTSPOT_PITCH",MISSING_HOTSPOT_TARGET:"MISSING_HOTSPOT_TARGET",MISSING_TARGET_MUSEUM_ID:"MISSING_TARGET_MUSEUM_ID",MISSING_TARGET_SCENE_ID:"MISSING_TARGET_SCENE_ID",INVALID_TARGET_YAW:"INVALID_TARGET_YAW",INVALID_TARGET_PITCH:"INVALID_TARGET_PITCH",INVALID_TARGET_FOV:"INVALID_TARGET_FOV",MISSING_TARGET_URL:"MISSING_TARGET_URL"};function nr(t){const e=[];if(!t||typeof t!="object")return e.push({code:h.INVALID_ROOT,path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!t.appName||typeof t.appName!="string"||t.appName.trim()==="")&&e.push({code:h.MISSING_APP_NAME,path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!t.landing||typeof t.landing!="object"?e.push({code:h.MISSING_LANDING,path:"landing",message:"landing 必须是对象",fieldName:"首页入口文案"}):((typeof t.landing.brandTitle!="string"||t.landing.brandTitle.trim()==="")&&e.push({code:h.MISSING_LANDING_BRAND_TITLE,path:"landing.brandTitle",message:"landing.brandTitle 必须是非空字符串",fieldName:"首页品牌标题"}),(typeof t.landing.heroTitle!="string"||t.landing.heroTitle.trim()==="")&&e.push({code:h.MISSING_LANDING_HERO_TITLE,path:"landing.heroTitle",message:"landing.heroTitle 必须是非空字符串",fieldName:"首页主标题"}),(typeof t.landing.heroSubtitle!="string"||t.landing.heroSubtitle.trim()==="")&&e.push({code:h.MISSING_LANDING_HERO_SUBTITLE,path:"landing.heroSubtitle",message:"landing.heroSubtitle 必须是非空字符串",fieldName:"首页副标题"})),!Array.isArray(t.museums))return e.push({code:h.MUSEUMS_NOT_ARRAY,path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;t.museums.length===0&&e.push({code:h.MUSEUMS_EMPTY,path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const r=new Set;return t.museums.forEach((i,n)=>{const s=`museums[${n}]`,o=i.name&&typeof i.name=="string"?i.name:void 0;if(!i.id||typeof i.id!="string"||i.id.trim()===""?e.push({code:h.MISSING_MUSEUM_ID,path:`${s}.id`,message:"id 必须是非空字符串",museumName:o,fieldName:"博物馆 ID"}):(r.has(i.id)&&e.push({code:h.DUPLICATE_MUSEUM_ID,path:`${s}.id`,message:`博物馆 ID "${i.id}" 重复`,museumName:o,fieldName:"博物馆 ID"}),r.add(i.id)),(!i.name||typeof i.name!="string"||i.name.trim()==="")&&e.push({code:h.MISSING_MUSEUM_NAME,path:`${s}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),!i.marketing||typeof i.marketing!="object"?e.push({code:h.INVALID_MUSEUM_MARKETING,path:`${s}.marketing`,message:"marketing 必须是对象",museumName:o,fieldName:"首页运营文案"}):((typeof i.marketing.hook!="string"||i.marketing.hook.trim()==="")&&e.push({code:h.MISSING_MUSEUM_MARKETING_HOOK,path:`${s}.marketing.hook`,message:"marketing.hook 必须是非空字符串",museumName:o,fieldName:"首页钩子文案"}),(!Array.isArray(i.marketing.tags)||i.marketing.tags.length===0||i.marketing.tags.some(c=>typeof c!="string"||c.trim()===""))&&e.push({code:h.INVALID_MUSEUM_MARKETING_TAGS,path:`${s}.marketing.tags`,message:"marketing.tags 必须是仅包含非空字符串的数组",museumName:o,fieldName:"首页标签"})),(!i.cover||typeof i.cover!="string"||i.cover.trim()==="")&&e.push({code:h.MISSING_MUSEUM_COVER,path:`${s}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:o,fieldName:"封面图"}),!i.map||typeof i.map!="object")e.push({code:h.MISSING_MUSEUM_MAP,path:`${s}.map`,message:"map 必须是对象",museumName:o,fieldName:"地图配置"});else{i.map.image!==void 0&&(typeof i.map.image!="string"||i.map.image.trim()==="")&&e.push({code:h.MISSING_MAP_IMAGE,path:`${s}.map.image`,message:"map.image 如提供，必须是非空字符串",museumName:o,fieldName:"地图图片"}),(typeof i.map.width!="number"||i.map.width<=0)&&e.push({code:h.INVALID_MAP_WIDTH,path:`${s}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:o,fieldName:"地图宽度"}),(typeof i.map.height!="number"||i.map.height<=0)&&e.push({code:h.INVALID_MAP_HEIGHT,path:`${s}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:o,fieldName:"地图高度"}),i.map.nodes!==void 0&&!Array.isArray(i.map.nodes)&&e.push({code:h.INVALID_MAP_NODES,path:`${s}.map.nodes`,message:"map.nodes 如提供，必须是数组",museumName:o,fieldName:"平面图节点"});const c=new Set;Array.isArray(i.map.nodes)&&i.map.nodes.forEach((l,d)=>{const u=`${s}.map.nodes[${d}]`;if(!l||typeof l!="object"){e.push({code:h.INVALID_FLOORPLAN_NODE,path:u,message:"floorplan node 必须是对象",museumName:o,fieldName:"平面图节点"});return}!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.id`,message:"floorplan node.id 必须是非空字符串",museumName:o,fieldName:"平面图节点 ID"}):c.has(l.id)?e.push({code:h.DUPLICATE_FLOORPLAN_NODE_ID,path:`${u}.id`,message:`floorplan node.id "${l.id}" 重复`,museumName:o,fieldName:"平面图节点 ID"}):c.add(l.id),(typeof l.x!="number"||typeof l.y!="number")&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:u,message:"floorplan node.x / node.y 必须是数字",museumName:o,fieldName:"平面图节点坐标"}),(typeof l.label!="string"||l.label.trim()==="")&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.label`,message:"floorplan node.label 必须是非空字符串",museumName:o,fieldName:"平面图节点名称"}),l.kind!=="scene"&&l.kind!=="waypoint"&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.kind`,message:"floorplan node.kind 只能是 scene 或 waypoint",museumName:o,fieldName:"平面图节点类型"}),l.status!=="ready"&&l.status!=="disabled"&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.status`,message:"floorplan node.status 只能是 ready 或 disabled",museumName:o,fieldName:"平面图节点状态"}),l.sceneId!==void 0&&(typeof l.sceneId!="string"||l.sceneId.trim()==="")&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.sceneId`,message:"floorplan node.sceneId 如提供，必须是非空字符串",museumName:o,fieldName:"平面图节点 sceneId"})}),i.map.paths!==void 0&&!Array.isArray(i.map.paths)&&e.push({code:h.INVALID_MAP_PATHS,path:`${s}.map.paths`,message:"map.paths 如提供，必须是数组",museumName:o,fieldName:"平面图路径"}),Array.isArray(i.map.paths)&&i.map.paths.forEach((l,d)=>{const u=`${s}.map.paths[${d}]`;if(!l||typeof l!="object"){e.push({code:h.INVALID_FLOORPLAN_PATH,path:u,message:"floorplan path 必须是对象",museumName:o,fieldName:"平面图路径"});return}if((!l.id||typeof l.id!="string"||l.id.trim()==="")&&e.push({code:h.INVALID_FLOORPLAN_PATH,path:`${u}.id`,message:"floorplan path.id 必须是非空字符串",museumName:o,fieldName:"平面图路径 ID"}),!Array.isArray(l.points)||l.points.length<2){e.push({code:h.INVALID_FLOORPLAN_PATH,path:`${u}.points`,message:"floorplan path.points 必须是至少包含 2 个节点 ID 的数组",museumName:o,fieldName:"平面图路径点位"});return}l.points.forEach((m,y)=>{(typeof m!="string"||m.trim()===""||!c.has(m))&&e.push({code:h.INVALID_FLOORPLAN_PATH,path:`${u}.points[${y}]`,message:"floorplan path.points 里的节点 ID 必须存在于 map.nodes",museumName:o,fieldName:"平面图路径点位"})})})}if(!Array.isArray(i.scenes))e.push({code:h.SCENES_NOT_ARRAY,path:`${s}.scenes`,message:"scenes 必须是数组",museumName:o,fieldName:"场景列表"});else{i.scenes.length===0&&e.push({code:h.SCENES_EMPTY,path:`${s}.scenes`,message:"scenes 数组不能为空",museumName:o,fieldName:"场景列表"});const c=new Set;i.scenes.forEach((l,d)=>{var f;const u=`${s}.scenes[${d}]`,m=l.name&&typeof l.name=="string"?l.name:void 0;!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:h.MISSING_SCENE_ID,path:`${u}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:m,fieldName:"场景 ID"}):(c.has(l.id)&&e.push({code:h.DUPLICATE_SCENE_ID,path:`${u}.id`,message:`场景 ID "${l.id}" 在博物馆内重复`,museumName:o,sceneName:m,fieldName:"场景 ID"}),c.add(l.id)),(!l.name||typeof l.name!="string"||l.name.trim()==="")&&e.push({code:h.MISSING_SCENE_NAME,path:`${u}.name`,message:"name 必须是非空字符串",museumName:o,sceneName:void 0,fieldName:"场景名称"});const y=!!l.pano,M=!!l.panoLow,v=!!((f=l.panoTiles)!=null&&f.manifest);if(!y&&!M&&!v?e.push({code:h.MISSING_PANO,path:`${u}.pano`,message:"pano / panoLow / panoTiles 至少需要提供一个",museumName:o,sceneName:m,fieldName:"全景图"}):(l.pano&&(typeof l.pano!="string"||l.pano.trim()==="")&&e.push({code:h.INVALID_PANO_URL,path:`${u}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:o,sceneName:m,fieldName:"高清全景图"}),l.panoLow&&(typeof l.panoLow!="string"||l.panoLow.trim()==="")&&e.push({code:h.INVALID_PANOLOW_URL,path:`${u}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:o,sceneName:m,fieldName:"低清全景图"}),l.panoTiles&&(typeof l.panoTiles!="object"?e.push({code:h.INVALID_PANO_URL,path:`${u}.panoTiles`,message:"panoTiles 必须是对象，包含 manifest",museumName:o,sceneName:m,fieldName:"瓦片元数据"}):(!l.panoTiles.manifest||typeof l.panoTiles.manifest!="string"||l.panoTiles.manifest.trim()==="")&&e.push({code:h.INVALID_PANO_URL,path:`${u}.panoTiles.manifest`,message:"panoTiles.manifest 必须是有效的字符串",museumName:o,sceneName:m,fieldName:"瓦片 manifest"}))),(!l.thumb||typeof l.thumb!="string"||l.thumb.trim()==="")&&e.push({code:h.MISSING_THUMB,path:`${u}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:o,sceneName:m,fieldName:"缩略图"}),!l.initialView||typeof l.initialView!="object"?e.push({code:h.MISSING_INITIAL_VIEW,path:`${u}.initialView`,message:"initialView 必须是对象",museumName:o,sceneName:m,fieldName:"初始视角"}):(typeof l.initialView.yaw!="number"&&e.push({code:h.INVALID_YAW,path:`${u}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:o,sceneName:m,fieldName:"水平角度"}),typeof l.initialView.pitch!="number"&&e.push({code:h.INVALID_PITCH,path:`${u}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:o,sceneName:m,fieldName:"垂直角度"}),l.initialView.fov!==void 0&&typeof l.initialView.fov!="number"&&e.push({code:h.INVALID_FOV,path:`${u}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:o,sceneName:m,fieldName:"视野角度"})),!l.mapPoint||typeof l.mapPoint!="object"?e.push({code:h.MISSING_MAP_POINT,path:`${u}.mapPoint`,message:"mapPoint 必须是对象",museumName:o,sceneName:m,fieldName:"地图点位"}):(typeof l.mapPoint.x!="number"&&e.push({code:h.INVALID_MAP_POINT_X,path:`${u}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:o,sceneName:m,fieldName:"地图点位 X 坐标"}),typeof l.mapPoint.y!="number"&&e.push({code:h.INVALID_MAP_POINT_Y,path:`${u}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:o,sceneName:m,fieldName:"地图点位 Y 坐标"})),!Array.isArray(l.hotspots))e.push({code:h.HOTSPOTS_NOT_ARRAY,path:`${u}.hotspots`,message:"hotspots 必须是数组",museumName:o,sceneName:m,fieldName:"热点列表"});else{const A=new Set;l.hotspots.forEach((w,le)=>{const D=`${u}.hotspots[${le}]`;!w.id||typeof w.id!="string"||w.id.trim()===""?e.push({code:h.MISSING_HOTSPOT_ID,path:`${D}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:m,fieldName:"热点 ID"}):(A.has(w.id)&&e.push({code:h.DUPLICATE_HOTSPOT_ID,path:`${D}.id`,message:`热点 ID "${w.id}" 在场景内重复`,museumName:o,sceneName:m,fieldName:"热点 ID"}),A.add(w.id)),w.type!=="scene"&&w.type!=="video"&&w.type!=="image"&&w.type!=="info"&&e.push({code:h.INVALID_HOTSPOT_TYPE,path:`${D}.type`,message:'type 必须是 "scene"、"video"、"image" 或 "info"',museumName:o,sceneName:m,fieldName:"热点类型"}),(!w.label||typeof w.label!="string"||w.label.trim()==="")&&e.push({code:h.MISSING_HOTSPOT_LABEL,path:`${D}.label`,message:"label 必须是非空字符串",museumName:o,sceneName:m,fieldName:"热点标签"}),typeof w.yaw!="number"&&e.push({code:h.INVALID_HOTSPOT_YAW,path:`${D}.yaw`,message:"yaw 必须是数字",museumName:o,sceneName:m,fieldName:"热点水平角度"}),typeof w.pitch!="number"&&e.push({code:h.INVALID_HOTSPOT_PITCH,path:`${D}.pitch`,message:"pitch 必须是数字",museumName:o,sceneName:m,fieldName:"热点垂直角度"}),w.type==="scene"?!w.target||typeof w.target!="object"?e.push({code:h.MISSING_HOTSPOT_TARGET,path:`${D}.target`,message:"scene 类型热点必须提供 target 对象",museumName:o,sceneName:m,fieldName:"热点目标配置"}):((!w.target.museumId||typeof w.target.museumId!="string")&&e.push({code:h.MISSING_TARGET_MUSEUM_ID,path:`${D}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:o,sceneName:m,fieldName:"目标博物馆 ID"}),typeof w.target.sceneId!="string"&&e.push({code:h.MISSING_TARGET_SCENE_ID,path:`${D}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）",museumName:o,sceneName:m,fieldName:"目标场景 ID"}),w.target.yaw!==void 0&&typeof w.target.yaw!="number"&&e.push({code:h.INVALID_TARGET_YAW,path:`${D}.target.yaw`,message:"target.yaw 必须是数字",museumName:o,sceneName:m,fieldName:"目标水平角度"}),w.target.pitch!==void 0&&typeof w.target.pitch!="number"&&e.push({code:h.INVALID_TARGET_PITCH,path:`${D}.target.pitch`,message:"target.pitch 必须是数字",museumName:o,sceneName:m,fieldName:"目标垂直角度"}),w.target.fov!==void 0&&typeof w.target.fov!="number"&&e.push({code:h.INVALID_TARGET_FOV,path:`${D}.target.fov`,message:"target.fov 必须是数字",museumName:o,sceneName:m,fieldName:"目标视野角度"})):w.type==="video"&&w.target&&typeof w.target!="object"&&e.push({code:h.MISSING_HOTSPOT_TARGET,path:`${D}.target`,message:"video 类型热点的 target 必须是对象（如果提供）",museumName:o,sceneName:m,fieldName:"热点目标配置"})})}})}}),e}let ee=null;async function tt(){if(ee)return ee;try{const t=await fetch("./config.json",{cache:"no-store"});if(!t.ok)throw new Error(`加载配置失败: ${t.status}`);const e=await t.json(),r=nr(e);if(r.length>0){const i=new Error("配置校验失败");throw i.validationErrors=r,i}return ee=e,ee}catch(t){throw console.error("加载配置失败:",t),t}}function rt(){ee=null}function Et(t){if(ee)return ee.museums.find(e=>e.id===t)}function or(t,e){const r=Et(t);if(r)return r.scenes.find(i=>i.id===e)}function $e(t){const e=new URL(window.location.href),r=new URLSearchParams(e.search);return Object.entries(t).forEach(([i,n])=>{if(n==null||n===""){r.delete(i);return}r.set(i,String(n))}),e.search=r.toString(),e.pathname+e.search+e.hash}function sr(){return window.location.pathname}function ar(){if(window.location.pathname.includes("//")){const t=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",t+window.location.search+window.location.hash)}}let it=null,nt=0;const lr=200;function cr(t){if(t.type==="focus"){const e=`${t.museumId}:${t.sceneId}`,r=Date.now();if(e===it&&r-nt<lr)return;it=e,nt=r}window.dispatchEvent(new CustomEvent("vr:scene-focus",{detail:t}))}function an(t){const e=r=>{t(r.detail)};return window.addEventListener("vr:scene-focus",e),()=>{window.removeEventListener("vr:scene-focus",e)}}function Ye(t,e){if(e==="replace"){window.history.replaceState({},"",t);return}window.history.pushState({},"",t)}function Re(){const t=new URLSearchParams(window.location.search),e=t.get("yaw"),r=t.get("pitch"),i=t.get("fov");return{museumId:t.get("museum")||void 0,sceneId:t.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:r?parseFloat(r):void 0,fov:i?parseFloat(i):void 0}}function ur(){return new URLSearchParams(window.location.search).get("debug")==="1"}function dr(){const t=new URLSearchParams(window.location.search);return t.get("editor")==="1"||t.get("debug")==="1"}function ot(){const t=sr();window.history.pushState({},"",t),window.dispatchEvent(new Event("popstate"))}function ln(t){const e=$e({museum:t,scene:null,yaw:null,pitch:null,fov:null});Ye(e,"push"),window.dispatchEvent(new Event("popstate"))}function st(t,e,r,i){const n=$e({museum:t,scene:e,yaw:r==null?void 0:r.yaw,pitch:r==null?void 0:r.pitch,fov:r==null?void 0:r.fov});Ye(n,(i==null?void 0:i.history)??"push"),(i==null?void 0:i.emitFocus)!==!1&&cr({type:"focus",museumId:t,sceneId:e,source:(i==null?void 0:i.focusSource)??"dock",ts:Date.now()}),window.dispatchEvent(new Event("popstate"))}function hr(t,e,r){const i=$e({museum:t,scene:e,yaw:r==null?void 0:r.yaw,pitch:r==null?void 0:r.pitch,fov:r==null?void 0:r.fov});Ye(i,"replace")}function ke(){const t=document;return!!(document.fullscreenElement||t.webkitFullscreenElement)}function mr(){const t=()=>{};document.addEventListener("fullscreenchange",t),document.addEventListener("webkitfullscreenchange",t)}class pr{constructor(){a(this,"element");a(this,"contentMounted",!1);this.element=document.createElement("div"),this.element.className="loading-overlay",this.applyStyles();const e=()=>{ke()&&this.hide()};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}render(){this.contentMounted||(this.element.innerHTML=`
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">加载中...</p>
      </div>
    `,this.contentMounted=!0)}clearContent(){this.contentMounted&&(this.element.replaceChildren(),this.contentMounted=!1)}applyStyles(){const e=document.createElement("style");e.textContent=`
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
      }
      .loading-overlay.show {
        opacity: 1;
        pointer-events: all;
      }
      .loading-spinner {
        text-align: center;
        color: #fff;
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      }
      .loading-text {
        font-size: 14px;
        margin: 0;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,document.head.appendChild(e)}show(){ke()||(this.render(),this.element.classList.add("show"))}hide(){this.element.classList.remove("show"),this.clearContent()}getElement(){return this.element}remove(){this.element.remove()}}var T=(t=>(t.LOADING_LOW="loadingLow",t.LOW_READY="lowReady",t.LOADING_HIGH="loadingHigh",t.HIGH_READY="highReady",t.DEGRADED="degraded",t.ERROR="error",t))(T||{});async function gr(t,e){for(const r of t)if(await e(r))return r;return null}var B=(t=>(t.THUMB="thumb",t.PANO_LOW="panoLow",t.PANO="pano",t.VIDEO="video",t.COVER="cover",t.MAP="map",t.DOLLHOUSE="dollhouse",t))(B||{});const vr=["/assets/panos/"],fr=[],wr="/config.json",Sr=1e3,me="vrplayer.assetCdn.lastSuccess",yr=24*60*60*1e3;let se=null,te=null,z="idle",J=0;function Mr(t){const e=t.trim();return e?e.startsWith("/")?e:`/${e}`:""}function at(t,e){const r=Array.isArray(t)&&t.length>0?t:e,i=new Set;for(const n of r){if(typeof n!="string")continue;const s=Mr(n);s&&i.add(s)}return Array.from(i)}function Pt(t){return t.replace(/\/+$/,"")}function Ir(t){const e=[];Array.isArray(t.baseUrls)&&e.push(...t.baseUrls),typeof t.baseUrl=="string"&&e.push(t.baseUrl);const r=new Set;for(const i of e){if(typeof i!="string")continue;const n=Pt(i.trim());n&&r.add(n)}return Array.from(r)}function Er(){var t;return typeof window<"u"&&((t=window.location)!=null&&t.origin)?window.location.origin:typeof location<"u"&&location.origin?location.origin:null}function Tt(){var e;const t=[typeof document<"u"?document.baseURI:null,typeof window<"u"?(e=window.location)==null?void 0:e.href:null,typeof location<"u"?location.href:null];for(const r of t)if(r)try{return new URL("./",r).toString()}catch{}return null}function Pr(){const t=Tt();if(!t)return"";try{const e=new URL(t).pathname||"";return e.endsWith("/")?e.slice(0,-1):e}catch{return""}}function bt(t){const e=Pr();return!e||e==="/"?t:t===e?"/":t.startsWith(`${e}/`)?t.slice(e.length)||"/":t}function Tr(t){if(!t.startsWith("/")||t.startsWith("//"))return t;const e=Tt();if(!e)return t;try{return new URL(t.slice(1),e).toString()}catch{return t}}function We(){if(typeof window>"u")return null;try{return window.localStorage}catch{return null}}function br(t){const e=We();if(!e)return null;try{const r=e.getItem(me);if(!r)return null;const i=JSON.parse(r),n=typeof i.baseUrl=="string"?Pt(i.baseUrl.trim()):"",s=typeof i.expiresAt=="number"&&Number.isFinite(i.expiresAt)?i.expiresAt:0;return!n||s<=Date.now()||!t.baseUrls.includes(n)?(e.removeItem(me),null):n}catch{return e.removeItem(me),null}}function _r(t,e){const r=We();if(!r||!e.baseUrls.includes(t))return;const i=Date.now(),n={baseUrl:t,updatedAt:i,expiresAt:i+yr};try{r.setItem(me,JSON.stringify(n))}catch{}}function lt(){const t=We();if(t)try{t.removeItem(me)}catch{}}function _t(t){const e=t.match(/^([^?#]*)([?#].*)?$/);return e?{path:e[1]||"",suffix:e[2]||""}:{path:t,suffix:""}}function ct(t,e){return e.some(r=>t.startsWith(r))}function Dt(t,e){return!(!ct(t,e.includePrefixes)||ct(t,e.excludePrefixes))}function At(t,e){const{path:r,suffix:i}=_t(t);return`${e}${r}${i}`}function Dr(t,e,r){if(!/^https?:\/\//i.test(t))return null;try{const i=new URL(t),n=Er();if(!n||i.origin!==n)return null;const s=bt(i.pathname);return Dt(s,e)?At(`${s}${i.search}${i.hash}`,r):null}catch{return null}}function Ar(t){if(typeof t!="string"||t.trim()==="")return wr;const e=t.trim();return e.startsWith("/")?e:`/${e}`}function Rr(t,e){const r=e.includes("?")?"&":"?";return`${t}${e}${r}__cdn_probe=${Date.now()}`}async function Nr(t,e,r){if(r!==J||typeof window>"u"||typeof fetch!="function")return!1;const i=typeof AbortController<"u"?new AbortController:null,n=window.setTimeout(()=>i==null?void 0:i.abort(),e.probeTimeoutMs);try{return(await fetch(Rr(t,e.probePath),{method:"GET",mode:"cors",cache:"no-store",referrerPolicy:"no-referrer",signal:i==null?void 0:i.signal})).ok}catch{return!1}finally{window.clearTimeout(n)}}function Rt(t=!1){const e=se;if(!e||!e.enabled||!t&&te||z==="probing")return;if(typeof window>"u"||typeof fetch!="function"){z="failed";return}z="probing";const r=++J;(async()=>{const i=await gr(e.baseUrls,n=>Nr(n,e,r));if(r===J){if(i){te=i,_r(i,e),z="ok";return}r===J&&(te=null,lt(),z="failed")}})().catch(()=>{r===J&&(te=null,lt(),z="failed")}).finally(()=>{})}function Ne(t){if(J+=1,te=null,z="idle",!t||t.enabled===!1){se=null;return}const e=Ir(t);if(e.length===0){se=null;return}se={enabled:!0,baseUrls:e,includePrefixes:at(t.includePrefixes,vr),excludePrefixes:at(t.excludePrefixes,fr),probePath:Ar(t.probePath),probeTimeoutMs:typeof t.probeTimeoutMs=="number"&&Number.isFinite(t.probeTimeoutMs)?Math.max(200,Math.floor(t.probeTimeoutMs)):Sr};const r=br(se);if(r){te=r,z="ok";return}Rt(!1)}function Z(t,e){if(!t||typeof t!="string"||t.trim()==="")return"";const r=t.trim();if(/^(?:data|blob):/i.test(r)||r.startsWith("//"))return r;const i=Tr(r),n=se;if(!n||!n.enabled)return i;const s=te;if(!s)return Rt(),i;const o=Dr(r,n,s);if(o)return o;const{path:c}=_t(r),l=bt(c);return!l.startsWith("/")||!Dt(l,n)?i:At(r===c?l:`${l}${r.slice(c.length)}`,s)}let Y=null;function Nt(){return Y!==null?Y:typeof navigator<"u"&&navigator.maxTouchPoints>0||typeof window<"u"&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)?(Y="touch",Y):(Y="mouse",Y)}function cn(){return Nt()==="touch"}function Lr(){return Nt()==="mouse"}let re=null;function Lt(t,e=1500){if(ke())return;const r=document.querySelector(".vr-toast"),i=r??document.createElement("div");i.className="vr-toast",i.textContent=t,r||document.body.appendChild(i),window.requestAnimationFrame(()=>i.classList.add("show")),re&&window.clearTimeout(re),re=window.setTimeout(()=>{i.classList.remove("show"),window.setTimeout(()=>i.remove(),220),re=null},e)}function xr(){const t=document.querySelector(".vr-toast");t&&(t.classList.remove("show"),window.setTimeout(()=>t.remove(),220)),re&&(window.clearTimeout(re),re=null)}function Cr(){const t=document;return document.fullscreenElement||t.webkitFullscreenElement||null}function xt(){return!!Cr()}async function Or(t){const e=t;if(e.requestFullscreen){await e.requestFullscreen();return}if(e.webkitRequestFullscreen){await e.webkitRequestFullscreen();return}throw new Error("Fullscreen API not supported")}async function Vr(){const t=document;if(document.exitFullscreen){await document.exitFullscreen();return}if(t.webkitExitFullscreen){await t.webkitExitFullscreen();return}}async function kr(t){const e=t||document.body;!xt()&&Lr()&&Lt("鼠标滑至最上方可退出全屏",700),await Or(e)}async function ut(){try{await Vr(),Ct()}catch(t){console.debug("[fullscreen] exitFullscreenBestEffort failed:",t)}}function Ct(){var t,e;try{(e=(t=screen.orientation)==null?void 0:t.unlock)==null||e.call(t)}catch{}}class Ur{constructor(e){a(this,"element");a(this,"isOpen",!1);a(this,"options");this.options=e;const r=document.createElement("div");r.className="vr-modal vr-modal--media vr-modal--image";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--media vr-modal-card--image",n.addEventListener("click",u=>u.stopPropagation());const s=document.createElement("div");s.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"图片预览";const c=document.createElement("button");c.className="vr-btn vr-modal-close-icon",c.setAttribute("aria-label","关闭"),c.textContent="×",c.addEventListener("click",()=>this.handleClose()),s.appendChild(o),s.appendChild(c);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--image";const d=document.createElement("img");d.className="vr-modal-image",e.src&&(d.src=e.src),d.alt=e.title||"热点图片",d.loading="lazy",l.appendChild(d),n.appendChild(s),n.appendChild(l),r.appendChild(i),r.appendChild(n),this.element=r}handleClose(){var e,r;this.close(),(r=(e=this.options).onClose)==null||r.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class Fr{constructor(e){a(this,"element");a(this,"isOpen",!1);a(this,"options");this.options=e;const r=document.createElement("div");r.className="vr-modal vr-modal--info";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--info",n.addEventListener("click",d=>d.stopPropagation());const s=document.createElement("div");s.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"详情";const c=document.createElement("button");c.className="vr-btn vr-modal-close-icon",c.setAttribute("aria-label","关闭"),c.textContent="×",c.addEventListener("click",()=>this.handleClose()),s.appendChild(o),s.appendChild(c);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--info",l.textContent=e.text||"未配置内容",n.appendChild(s),n.appendChild(l),r.appendChild(i),r.appendChild(n),this.element=r}handleClose(){var e,r;this.close(),(r=(e=this.options).onClose)==null||r.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class Gr{constructor(e){a(this,"element");a(this,"isOpen",!1);a(this,"videoEl");a(this,"options");this.options=e;const r=document.createElement("div");r.className="vr-modal vr-modal--media vr-modal--video";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--media vr-modal-card--video",n.addEventListener("click",u=>u.stopPropagation());const s=document.createElement("div");s.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"视频";const c=document.createElement("button");c.className="vr-btn vr-modal-close-icon",c.setAttribute("aria-label","关闭"),c.textContent="×",c.addEventListener("click",()=>this.handleClose()),s.appendChild(o),s.appendChild(c);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--video";const d=document.createElement("video");d.className="vr-modal-video",e.src&&(d.src=e.src),e.poster&&(d.poster=e.poster),d.controls=!0,d.playsInline=!0,d.preload="metadata",this.videoEl=d,l.appendChild(d),n.appendChild(s),n.appendChild(l),r.appendChild(i),r.appendChild(n),this.element=r}handleClose(){var e,r;this.close(),(r=(e=this.options).onClose)==null||r.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){if(this.isOpen){this.isOpen=!1,this.element.classList.remove("open");try{this.videoEl.pause(),this.videoEl.currentTime=0,this.videoEl.removeAttribute("src"),this.videoEl.load()}catch{}}}getElement(){return this.element}destroy(){this.close(),this.element.remove()}}const Ot="vr:open-modal",Vt="vr:close-modal";function un(t){window.dispatchEvent(new CustomEvent(Ot,{detail:t}))}function Le(){window.dispatchEvent(new CustomEvent(Vt))}class Br{constructor(e){a(this,"rootEl");a(this,"current",null);a(this,"handleKeyDownBound");this.rootEl=e,this.handleKeyDownBound=r=>this.handleKeyDown(r),window.addEventListener(Ot,r=>{const i=r;this.handleOpen(i.detail)}),window.addEventListener(Vt,()=>this.close()),window.addEventListener("keydown",this.handleKeyDownBound)}handleKeyDown(e){e.key==="Escape"&&this.close()}handleOpen(e){this.close();let r=null;e.type==="image"?r=new Ur({src:e.payload.src,title:e.payload.title,onClose:()=>Le()}):e.type==="info"?r=new Fr({title:e.payload.title,text:e.payload.text,onClose:()=>Le()}):e.type==="video"&&(r=new Gr({src:e.payload.src,poster:e.payload.poster,title:e.payload.title,onClose:()=>Le()})),r&&(this.current=r,this.rootEl.innerHTML="",this.rootEl.appendChild(r.getElement()),r.open())}close(){this.current&&(this.current.close(),this.current.destroy(),this.current=null,this.rootEl.innerHTML="")}}let dt=null;function Hr(){if(dt)return;let t=document.getElementById("vr-modal-root");t||(t=document.createElement("div"),t.id="vr-modal-root",document.body.appendChild(t)),dt=new Br(t)}function $r(t,e,r){const i=t.getBoundingClientRect(),n=e-i.left,s=r-i.top,o=document.createElement("div");o.className="vr-pick-marker",o.style.position="absolute",o.style.left="0",o.style.top="0",o.style.transform=`translate3d(${n}px, ${s}px, 0)`,o.style.pointerEvents="none",o.style.zIndex="1000",t.style.position="relative",t.appendChild(o),window.requestAnimationFrame(()=>{o.classList.add("show")}),window.setTimeout(()=>{o.classList.remove("show"),window.setTimeout(()=>{o.parentNode&&o.parentNode.removeChild(o)},200)},1500)}const kt="vr_last_pick_v1";let ze=null;function Yr(){try{const t=localStorage.getItem(kt);if(t){const e=JSON.parse(t);typeof e.yaw=="number"&&typeof e.pitch=="number"&&typeof e.ts=="number"&&(ze=e)}}catch{}}Yr();function Wr(t){ze=t;try{localStorage.setItem(kt,JSON.stringify(t))}catch{}}function dn(){return ze}class zr{constructor(){a(this,"listeners",new Map);a(this,"lastInteractionTs",0);a(this,"idleDelay",800);a(this,"idleTimer",null);a(this,"rafId",null);a(this,"isScheduled",!1);this.listeners.set("user-interacting",new Set),this.listeners.set("user-idle",new Set),this.listeners.set("ui-engaged",new Set)}on(e,r){const i=this.listeners.get(e);return i?(i.add(r),()=>{i.delete(r)}):(console.warn(`[InteractionBus] 未知事件类型: ${e}`),()=>{})}off(e,r){const i=this.listeners.get(e);i&&i.delete(r)}emit(e){this.isScheduled||(this.isScheduled=!0,this.rafId=requestAnimationFrame(()=>{this.isScheduled=!1;const r=this.listeners.get(e);r&&r.forEach(i=>{try{i()}catch(n){console.error("[InteractionBus] 事件监听器执行失败:",n)}})}))}emitInteracting(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("user-interacting")}scheduleIdle(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.idleTimer=window.setTimeout(()=>{Date.now()-this.lastInteractionTs>=this.idleDelay&&(this.idleTimer=null,this.emit("user-idle"))},this.idleDelay)}emitUIEngaged(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("ui-engaged")}dispose(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.listeners.forEach(e=>e.clear()),this.listeners.clear()}}const ne=new zr,Xr=Object.freeze(Object.defineProperty({__proto__:null,interactionBus:ne},Symbol.toStringTag,{value:"Module"})),qr=150,jr=150,Qr=400;function Zr(){return{fadeMs:qr,restoreMs:jr,restoreDelayMs:Qr}}function Jr(){ne.on("user-interacting",()=>{}),ne.on("user-idle",()=>{}),ne.on("ui-engaged",()=>{})}let F=null;function Kr(){const t=Zr();ne.on("user-interacting",()=>{F!==null&&(clearTimeout(F),F=null),document.documentElement.classList.add("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")}),ne.on("user-idle",()=>{F!==null&&(clearTimeout(F),F=null),document.documentElement.classList.remove("vr-ui-interacting"),F=window.setTimeout(()=>{document.documentElement.classList.remove("vr-ui-restoring"),F=null},t.restoreDelayMs)}),ne.on("ui-engaged",()=>{F!==null&&(clearTimeout(F),F=null),document.documentElement.classList.remove("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")})}const X=typeof window<"u"?new URLSearchParams(window.location.search).get("debug")==="1":!1;function hn(...t){X&&console.debug("[VR Debug]",...t)}class ei{constructor(e){a(this,"options");a(this,"structure3DLoadToken",0);a(this,"structureView2D",null);a(this,"structureView3D",null);a(this,"structureOverlayOpen",!1);this.options=e}isStructureOverlayOpen(){return this.structureOverlayOpen}clearOverlayState(){this.structure3DLoadToken+=1,this.structureOverlayOpen=!1,this.structureView2D&&(this.structureView2D.remove(),this.structureView2D=null),this.structureView3D&&(this.structureView3D.remove(),this.structureView3D=null),document.body.style.overflow="",document.body.style.touchAction="",document.body.style.overscrollBehavior=""}async openStructure2D(){const e=this.options.getCurrentMuseum(),r=this.options.getCurrentScene();if(!e||!r)return;this.structureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),this.structure3DLoadToken+=1;const i=this.structure3DLoadToken,[{buildSceneGraph:n},{StructureView2D:s}]=await Promise.all([this.options.loadSceneGraphModule(),this.options.loadStructureView2DModule()]);if(i!==this.structure3DLoadToken||this.options.getMode()!=="structure2d")return;const o=this.options.getCurrentMuseum(),c=this.options.getCurrentScene();if(!o||!c)return;const l=n(o,c.id);this.structureView2D?this.structureView2D.updateContext({museum:o,graph:l,currentSceneId:c.id}):(this.structureView2D=new s({museum:o,graph:l,currentSceneId:c.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(d,u)=>{this.closeStructureOverlay({toTour:!1}),this.options.navigateToScene(d,u)}}),this.options.appElement.appendChild(this.structureView2D.getElement())),this.structureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView2D.open()}async openStructure3D(){const e=this.options.getCurrentMuseum(),r=this.options.getCurrentScene();if(!e||!r)return;this.structureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),this.structure3DLoadToken+=1;const i=this.structure3DLoadToken,[{buildSceneGraph:n},{StructureView3D:s}]=await Promise.all([this.options.loadSceneGraphModule(),this.options.loadStructureView3DModule()]);if(i!==this.structure3DLoadToken||this.options.getMode()!=="structure3d")return;const o=this.options.getCurrentMuseum(),c=this.options.getCurrentScene();if(!o||!c)return;const l=n(o,c.id);this.structureView3D?this.structureView3D.updateContext({museum:o,graph:l,currentSceneId:c.id}):(this.structureView3D=new s({museum:o,graph:l,currentSceneId:c.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(d,u)=>{this.closeStructureOverlay({toTour:!1}),this.options.navigateToScene(d,u)}}),this.options.appElement.appendChild(this.structureView3D.getElement())),this.structureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView3D.open()}closeStructureOverlay(e){this.structureOverlayOpen&&(this.clearOverlayState(),e.toTour&&this.options.onSwitchToTour())}dispose(){this.clearOverlayState()}}const ti={brand:{name:"VR 全景导览",copyright:"© 2026 VR 全景导览"},dock:{guide:"导览",community:"社区",info:"信息",settings:"更多"},modal:{infoTitle:"信息",settingsTitle:"更多",museumLabel:"展馆",sceneLabel:"场景",collectDateLabel:"采集日期",qualityLabel:"画质",qualityHigh:"高清",qualityLow:"省流",viewLabel:"视角",resetView:"恢复初始视角",vrLabel:"VR 眼镜",zoomLabel:"缩放",zoomIn:"放大",zoomOut:"缩小"}};function Ut(t){var e;return!t||!Array.isArray(t.scenes)||t.scenes.length===0?null:((e=t.scenes[0])==null?void 0:e.id)??null}const Se={brandTitle:"鼎虎清源",heroTitle:"三馆全景导览",heroSubtitle:"用一座馆的门廊、一封遗墨、一道回廊，把历史从课本里请回眼前。",projectNote:"这是一个服务研学的公益全景项目。我们用实地采集与轻量交互，把纪念馆里的历史现场重新组织成可抵达、可观看、可讲述的沉浸入口。"},ri={wangding:{hook:"一死醒天下：探寻晚清名臣尸谏救国的铮铮铁骨。",tags:["VR沉浸","24个历史场景","独家全景"]},yanghucheng:{hook:"民族危亡的抉择：重返风云激荡的西安事变发生地。",tags:["360°漫游","将领故居","历史现场"]},linzexu:{hook:"苟利国家生死以：穿梭百年，见证虎门销烟外的旷世长歌。",tags:["12个高清实拍","历史遗迹","人文研学"]}};function ye(t){const e=t==null?void 0:t.landing;return{brandTitle:typeof(e==null?void 0:e.brandTitle)=="string"&&e.brandTitle.trim()!==""?e.brandTitle:Se.brandTitle,heroTitle:typeof(e==null?void 0:e.heroTitle)=="string"&&e.heroTitle.trim()!==""?e.heroTitle:Se.heroTitle,heroSubtitle:typeof(e==null?void 0:e.heroSubtitle)=="string"&&e.heroSubtitle.trim()!==""?e.heroSubtitle:Se.heroSubtitle,projectNote:typeof(e==null?void 0:e.projectNote)=="string"&&e.projectNote.trim()!==""?e.projectNote:Se.projectNote}}function mn(t){var i,n,s;const e=ri[t.id]??{hook:((i=t.description)==null?void 0:i.trim())||`${t.name} 沉浸式全景导览`,tags:["沉浸导览",`${t.scenes.length}个场景`]},r=Array.isArray((n=t.marketing)==null?void 0:n.tags)?t.marketing.tags.filter(o=>typeof o=="string"&&o.trim()!==""):[];return{hook:typeof((s=t.marketing)==null?void 0:s.hook)=="string"&&t.marketing.hook.trim()!==""?t.marketing.hook:e.hook,tags:r.length>0?r:e.tags}}function Ft(t){var r,i;const e=(r=t==null?void 0:t.panoTiles)==null?void 0:r.worldYawOffset;return typeof e=="number"&&Number.isFinite(e)?e:(i=t==null?void 0:t.panoTiles)!=null&&i.manifest?180:0}function ht(t,e){const r=-(e+Ft(t));return Object.is(r,-0)?0:r}function ii(t){const e=((t+180)%360+360)%360-180;return Object.is(e,-0)?0:e}function mt(t,e){return ii(-e-Ft(t))}function ni({museum:t,requestedSceneId:e,hasEnteredMuseum:r}){const i=Ut(t),n=e??i;if(!n)throw new Error(`museum ${t.id} does not contain any scenes`);return!r||!e?{kind:"cover",museumId:t.id,targetSceneId:n,requestedSceneId:e??null}:{kind:"scene",museumId:t.id,targetSceneId:n}}function oi({currentMuseumId:t,hasViewerShell:e,nextMuseumId:r,requestedView:i}){return!(e&&t&&t===r)?{shellStrategy:"mount-shell",transitionDriver:"shell",viewStrategy:"reset-to-target"}:{shellStrategy:"reuse-shell",transitionDriver:"viewer",viewStrategy:li(i)?"reset-to-target":"preserve-current"}}function si({appName:t,brandTitle:e,museum:r,targetSceneId:i}){var n,s,o;return{appName:t,brandTitle:e,title:r.name,subtitle:((s=(n=r.marketing)==null?void 0:n.hook)==null?void 0:s.trim())||((o=r.description)==null?void 0:o.trim())||`${r.name} 单馆连续漫游，进入后可在同一壳层内切换场景。`,ctaLabel:"点击开启 VR 漫游",heroImage:r.cover,targetSceneId:i}}function ai({museum:t,targetSceneId:e}){const r=t.scenes.find(o=>o.id===e)??null,i=r?[r.id]:[],n=r?ci(r):[],s=di([(r==null?void 0:r.panoLow)??(r==null?void 0:r.thumb),...n.map(o=>{const c=t.scenes.find(l=>l.id===o);return(c==null?void 0:c.panoLow)??(c==null?void 0:c.thumb)})]);return{primarySceneIds:i,neighborSceneIds:n,previewAssets:s}}function li(t){return t?[t.yaw,t.pitch,t.fov].some(e=>typeof e=="number"&&Number.isFinite(e)):!1}function ci(t){const e=t.hotspots.filter(ui).map(r=>{var i;return(i=r.target)==null?void 0:i.sceneId}).filter(r=>typeof r=="string"&&r.length>0);return Array.from(new Set(e))}function ui(t){var e;return t.type==="scene"&&!!((e=t.target)!=null&&e.sceneId)}function di(t){const e=new Set,r=[];for(const i of t)!i||e.has(i)||(e.add(i),r.push(i));return r}const hi=720,pt=900,Ue=1040,mi=.62,pi=36;function gi({currentWorldYaw:t,targetWorldYaw:e,hotspotScreenX:r,fromMapPoint:i,toMapPoint:n}){const s=Ii(t,e),o=wi(s,r,i,n),c=Math.abs(s),l=Si(r,i,n),d=yi(i,n),u=vt(Mi(c,l,d)),m=c<8&&l<.18&&d>=.52,y=fi(c,d),M=y>=Ue?140:120,v=Ei(Math.min(pi,Math.max(0,c>=8?c*mi:l>0?10+l*14:0))),f=vt(oe(Math.max(c>=8?Math.max(0,c-8)/26:l*.72,d*.78),0,1));return{durationMs:y,settleMs:M,travelDirX:o,wipeFrom:m?"center":o>0?"right":"left",turnLead:v,curveStrength:f,forwardDriveStrength:u}}function xe(){return{active:null,pending:null}}function gt(t,e){return t.active?{active:t.active,pending:e}:{active:e,pending:null}}function vi(t){return t.pending?{next:t.pending,state:{active:t.pending,pending:null}}:{next:null,state:{active:null,pending:null}}}function fi(t,e){return t<18?e>=.82?Ue:e>=.52?pt+80:hi:t<72?pt:Ue}function wi(t,e,r,i){return Math.abs(t)>=8?t>=0?1:-1:typeof e=="number"&&Number.isFinite(e)?e<.5?-1:1:r&&i&&r.x!==i.x?i.x>=r.x?1:-1:t>=0?1:-1}function Si(t,e,r){if(typeof t=="number"&&Number.isFinite(t)){const i=oe(Math.abs(t-.5)*2,0,1);if(i>=.18)return i}if(e&&r){const i=Math.abs(r.x-e.x);if(i>=36)return oe((i-36)/180,.18,1)}return 0}function yi(t,e){if(!t||!e)return 0;const r=e.x-t.x,i=e.y-t.y,n=Math.sqrt(r*r+i*i);return oe((n-90)/520,0,1)}function Mi(t,e,r){const i=1-oe(t/24,0,1),n=r*(.58+i*.68),s=e*(.3+i*.38),o=i*oe((r-.22)/.78,0,1)*.18;return oe(Math.max(n,s)+o,0,1)}function Ii(t,e){let r=e-t;for(;r>180;)r-=360;for(;r<-180;)r+=360;return r}function oe(t,e,r){return Math.max(e,Math.min(r,t))}function Ei(t){return Number(t.toFixed(1))}function vt(t){return Number(t.toFixed(2))}function ft(t){return t.prefer==="panoLow"?ae(t.panoLowUrl,t.thumbUrl):ae(t.thumbUrl,t.panoLowUrl)}function Pi(t){const e=ae(t.sourcePreviewUrl),r=t.targetPreviewAlreadyReady?ae(t.targetPreviewUrl):void 0;return t.coverWasVisible?{fromImage:ae(r,e,t.previousScenePreviewImage,t.viewerSnapshot,t.coverHeroUrl),targetPreviewImage:r}:{fromImage:ae(t.viewerSnapshot,e,t.previousScenePreviewImage,r,t.coverHeroUrl),targetPreviewImage:r}}function ae(...t){for(const e of t)if(typeof e=="string"&&e.trim().length>0)return e}function wt(t,e){const r=t.sourceKind==="scene",i=r&&t.wipeFrom==="center",n=r&&e&&!t.targetReady,s=r?t.stage==="turn-in"?t.targetReady?.88+t.stageProgress*.06:n?i?.42+t.stageProgress*.08+t.forwardDriveStrength*.08:.54+t.stageProgress*.1+t.forwardDriveStrength*.08:.46+t.stageProgress*.1+t.forwardDriveStrength*.06:t.stage==="travel"?t.targetReady?Math.min(i?.76:.98,(i?.68:.9)+t.targetFocus*(i?.02:.05)+t.revealProgress*(i?.015:.03)):n?Math.min(i?.72:.84,(i?.44:.58)+t.targetFocus*(i?.03:.08)+t.stageProgress*(i?.08:.14)+t.forwardDriveStrength*.08):Math.min(.72,.5+t.stageProgress*.1+t.forwardDriveStrength*.05):Math.max(.12,.26-t.settleStrength*.14):1,o=t.targetReady&&e?r?Math.max(t.blurPx*.5,4.5):Math.max(t.blurPx*.7,6):Math.max(t.blurPx*(r?.48-t.forwardDriveStrength*.1:1.35),r?10:24),c=t.fromOpacity*(r?t.targetReady?i?.38:.42:n?i?Math.max(.22,.42-t.forwardDriveStrength*.02):Math.max(.04,.18-t.forwardDriveStrength*.08):Math.max(.08,.24-t.forwardDriveStrength*.08):.74),l=r?t.stage==="settle"?1:t.targetReady&&i?.48-t.forwardDriveStrength*.04:n?(i?.56:.82)-t.forwardDriveStrength*(i?.08:.06):.9-t.forwardDriveStrength*.04:t.stage==="settle"?.9:.82,d=r?t.targetReady?i?44+t.fromEdgeMix*14:26+t.fromEdgeMix*18:n?i?58+t.fromEdgeMix*12+t.forwardDriveStrength*8:46+t.fromEdgeMix*16+t.forwardDriveStrength*10:34+t.fromEdgeMix*14+t.forwardDriveStrength*8:24+t.fromEdgeMix*12,u=r?Math.max(t.blurPx*(t.targetReady?.26:.3),2.5):Math.max(t.blurPx*(.5-t.settleStrength*.18),3),m=e?t.targetReady?r?Math.min(Math.max(t.revealProgress*(i?.08:.18)+t.targetMixProgress*(i?.04:.08)+t.targetFocus*(i?.02:.04),t.stage==="settle"?i?.1:.18:.02),i?.08:.16):Math.min(Math.max(t.targetMixProgress*.64+t.targetFocus*.22,t.stage==="settle"?.68:.18),.96):r?n?Math.min(i?.12:.46,.04+t.stageProgress*(i?.04:.18)+t.targetFocus*(i?.03:.18)+t.forwardDriveStrength*(i?.03:.14)):0:Math.min(.16,.06+t.targetFocus*.22):0,y=e?t.targetReady?Math.max(t.revealProgress*(r?i?.58:.96:1),t.targetMixProgress*(r?i?.16:.42:.46)+t.targetFocus*(r?i?.05:.12:.16)):r?n?i?Math.min(.24,.02+t.stageProgress*.035+t.targetFocus*.02+t.forwardDriveStrength*.04):Math.min(.78,.34+t.stageProgress*.26+t.targetFocus*.12+t.forwardDriveStrength*.18):0:Math.max(.12,t.targetFocus*.28):Math.max(0,t.revealProgress);return{stageOpacity:Me(s),fallbackBlur:he(o),fromBackdropOpacity:Me(c),backdropBrightness:Me(l),fromCenterCutInner:he(d),fromCenterCutOuter:he(Math.min(d+18,100)),targetBackdropBlur:he(u),targetBackdropOpacity:Me(m),targetRevealInset:he(Math.max(0,(1-y)*100))}}function he(t){return Math.round(t*100)/100}function Me(t){return Math.round(t*1e3)/1e3}const St="vr-travel-transition-overlay-style",Ti=220,bi=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,_i=`
  precision mediump float;

  uniform sampler2D uFromTex;
  uniform sampler2D uToTex;
  uniform vec2 uResolution;
  uniform float uRevealProgress;
  uniform float uTargetMixProgress;
  uniform float uProgress;
  uniform float uTravelDirX;
  uniform float uCenterRevealMode;
  uniform float uCurveStrength;
  uniform float uForwardDriveStrength;
  uniform float uWipeSoftness;
  uniform float uDistortionStrength;
  uniform float uBlurStrength;
  uniform float uMotionBlurStrength;
  uniform float uGlassAlpha;
  uniform float uOcclusionOpacity;
  uniform float uZoomScale;
  uniform float uFromShift;
  uniform float uToShift;
  uniform float uShearRad;
  uniform float uSettleStrength;
  uniform float uTargetPreviewLoaded;
  uniform float uTargetMixReady;
  uniform float uFromOpacity;
  uniform float uFromEdgeMix;
  uniform float uTargetFocus;

  varying vec2 vUv;

  vec2 clampUv(vec2 uv) {
    return clamp(uv, vec2(0.001), vec2(0.999));
  }

  vec2 coverUv(vec2 uv, float scale, float shiftPercent, float shearRad) {
    vec2 p = uv - 0.5;
    p.x += shiftPercent * 0.01;
    p.y += p.x * tan(shearRad) * 0.18;
    p /= max(scale, 0.0001);
    return clampUv(p + 0.5);
  }

  vec4 sampleLayer(sampler2D tex, vec2 uv, vec2 dir, float blurPx) {
    vec2 px = 1.0 / max(uResolution, vec2(1.0));
    vec2 delta = dir * blurPx * px;
    vec4 color = texture2D(tex, clampUv(uv)) * 0.42;
    color += texture2D(tex, clampUv(uv + delta * 0.3)) * 0.24;
    color += texture2D(tex, clampUv(uv + delta * 0.72)) * 0.18;
    color += texture2D(tex, clampUv(uv + delta * 1.08)) * 0.1;
    color += texture2D(tex, clampUv(uv - delta * 0.2)) * 0.06;
    return color;
  }

  void main() {
    float reveal = clamp(uRevealProgress, 0.0, 1.0);
    float mixProgress = clamp(uTargetMixProgress, 0.0, 1.0);
    float settleStrength = clamp(uSettleStrength, 0.0, 1.0);
    float previewReady = clamp(uTargetPreviewLoaded, 0.0, 1.0);
    float mixReady = clamp(uTargetMixReady, 0.0, 1.0);
    float targetHold = 1.0 - mixReady;
    float soft = max(0.014, uWipeSoftness * 0.82);
    float centerMode = clamp(uCenterRevealMode, 0.0, 1.0);
    float seam = uTravelDirX > 0.0 ? 1.0 - reveal : reveal;
    float lateralMask = uTravelDirX > 0.0
      ? smoothstep(seam - soft, seam + soft, vUv.x)
      : 1.0 - smoothstep(seam - soft, seam + soft, vUv.x);
    float lateralSeamDistance = abs(vUv.x - seam);
    float centerHalfWidth = mix(0.0, 0.62, reveal);
    float centerDistance = abs(vUv.x - 0.5);
    float centerMask = 1.0 - smoothstep(centerHalfWidth - soft * 0.6, centerHalfWidth + soft * 1.3, centerDistance);
    float centerSeamDistance = abs(centerDistance - centerHalfWidth);
    float mask = mix(lateralMask, centerMask, centerMode);
    float seamDistance = mix(lateralSeamDistance, centerSeamDistance, centerMode);
    float edge = 1.0 - smoothstep(0.0, soft * mix(2.1, 1.35, centerMode), seamDistance);
    float sweepBand = 1.0 - smoothstep(0.0, soft * mix(1.7, 1.16, centerMode), seamDistance);
    float streakCenter = mix(
      seam - uTravelDirX * mix(0.12, 0.03, clamp(uProgress, 0.0, 1.0)),
      centerHalfWidth + mix(0.08, 0.03, clamp(uProgress, 0.0, 1.0)),
      centerMode
    );
    float streak = mix(
      1.0 - smoothstep(0.0, soft * 2.1, abs(vUv.x - streakCenter)),
      1.0 - smoothstep(0.0, soft * 2.4, abs(centerDistance - streakCenter)),
      centerMode
    );
    float bend = sin((vUv.y + uProgress * 0.26) * 3.14159265) * 0.62
      + sin((vUv.y * 2.0 - 1.0) * 1.57079632) * 0.3;
    vec2 travelDir = mix(
      vec2(uTravelDirX, bend * (0.05 + uCurveStrength * 0.095)),
      vec2(0.0, -0.08 + bend * (0.06 + uCurveStrength * 0.03)),
      centerMode
    );
    float distortion = max(max(edge, sweepBand * 0.82), streak * 0.9) * uDistortionStrength * (0.03 + uCurveStrength * 0.038);
    float motionAmount = uMotionBlurStrength * 10.8;

    vec2 smearDir = normalize(mix(
      vec2(uTravelDirX, bend * 0.26 + 0.0001),
      vec2(0.0, -0.2 + bend * 0.2),
      centerMode
    ));
    vec2 fromUv = coverUv(vUv, uZoomScale + uFromEdgeMix * 0.08, uFromShift, uShearRad * 0.4);
    vec2 toUv = coverUv(vUv, max(1.0, uZoomScale - 0.01), uToShift, uShearRad * 0.85);
    vec2 tunnelCenter = mix(
      vec2(0.5 - uTravelDirX * 0.012 * (1.0 - mixProgress), 0.5 + bend * 0.012),
      vec2(0.5, 0.5 + bend * 0.008),
      centerMode
    );
    vec2 tunnelVector = vUv - tunnelCenter;

    fromUv += travelDir * distortion * 0.62;
    toUv += travelDir * distortion * 1.18;
    toUv.y += edge * uCurveStrength * 0.014 * bend;
    fromUv -= smearDir * streak * 0.004 * (0.4 + uCurveStrength * 0.4);
    toUv += smearDir * streak * 0.007 * (0.46 + uCurveStrength * 0.5);

    float corridor = 1.0 - smoothstep(0.04, 0.22, abs(vUv.y - 0.5 - bend * 0.024));
    float forwardCorridor = 1.0 - smoothstep(
      0.04,
      mix(0.22, 0.1, clamp(uForwardDriveStrength, 0.0, 1.0)),
      abs(vUv.y - 0.5 - bend * 0.02)
    );
    float centerFocus = 1.0 - smoothstep(
      0.08,
      0.42,
      length(vUv - mix(
        vec2(0.5 - uTravelDirX * 0.05 * (1.0 - mixProgress), 0.49 + bend * 0.02),
        vec2(0.5, 0.49 + bend * 0.012),
        centerMode
      ))
    );
    float portalRing = centerMode * smoothstep(0.12, 0.2, centerDistance) * (1.0 - smoothstep(0.28, 0.38, centerDistance));
    vec2 tunnelDir = normalize(tunnelVector + vec2(0.0001, 0.0001));
    float forwardPulse = clamp(
      (0.22 + sweepBand * 0.38 + streak * 0.24 + forwardCorridor * 0.36) * uForwardDriveStrength,
      0.0,
      0.62
    );
    fromUv += tunnelVector * forwardPulse * 0.036;
    toUv += tunnelVector * forwardPulse * 0.082;
    fromUv += tunnelDir * portalRing * uForwardDriveStrength * 0.008;
    toUv -= tunnelDir * portalRing * (0.01 + uTargetFocus * 0.004);
    float edgeBand = max(
      1.0 - smoothstep(0.02, 0.14 + uCurveStrength * 0.04, vUv.x),
      1.0 - smoothstep(0.02, 0.14 + uCurveStrength * 0.04, 1.0 - vUv.x)
    );
    float sourceSideResidue = mix(
      uTravelDirX > 0.0
        ? 1.0 - smoothstep(0.2, 0.62, vUv.x)
        : 1.0 - smoothstep(0.2, 0.62, 1.0 - vUv.x),
      smoothstep(0.16, 0.5, centerDistance),
      centerMode
    );
    float centerCut = 1.0 - smoothstep(
      0.16,
      0.34 + (1.0 - uFromEdgeMix) * 0.12,
      length(vUv - mix(
        vec2(0.5 - uTravelDirX * 0.03 * (1.0 - mixProgress), 0.5 + bend * 0.015),
        vec2(0.5, 0.5 + bend * 0.01),
        centerMode
      ))
    );
    float sourceResidueMask = max(edge, edgeBand * max(0.42, sourceSideResidue));
    float forwardOuterShell = smoothstep(0.18, 0.5, centerDistance);
    sourceResidueMask = mix(sourceResidueMask, max(edge, forwardOuterShell * 0.94), centerMode);
    float sourceMask = mix(1.0 - centerCut, sourceResidueMask, clamp(uFromEdgeMix, 0.0, 1.0));
    sourceMask *= clamp(uFromOpacity, 0.0, 1.0);
    float directionalGate = mix(
      uTravelDirX > 0.0
        ? smoothstep(seam - soft * 0.08, seam + soft * 1.85, vUv.x)
        : 1.0 - smoothstep(seam - soft * 1.85, seam + soft * 0.08, vUv.x),
      mask,
      centerMode
    );

    vec4 fromColor = sampleLayer(
      uFromTex,
      fromUv,
      smearDir,
      max(15.0, uBlurStrength * (0.5 + (1.0 - uFromOpacity) * 0.62) + motionAmount * 0.28)
    );
    vec4 frostedFrom = sampleLayer(
      uFromTex,
      coverUv(vUv, uZoomScale + 0.16 + uFromEdgeMix * 0.04, uFromShift * 1.3, uShearRad * 0.18),
      smearDir,
      max(18.0, uBlurStrength * (1.14 + uFromEdgeMix * 0.62))
    );
    vec4 abstractFrom = sampleLayer(
      uFromTex,
      coverUv(vUv, uZoomScale + 0.22 + uFromEdgeMix * 0.06, uFromShift * 1.45, uShearRad * 0.12),
      smearDir,
      max(22.0, uBlurStrength * (1.34 + uFromEdgeMix * 0.62))
    );
    float centerSuppression = (1.0 - smoothstep(
      0.1,
      0.24,
      length(vUv - mix(
        vec2(0.5 - uTravelDirX * 0.02 * (1.0 - mixProgress), 0.5 + bend * 0.012),
        vec2(0.5, 0.5 + bend * 0.008),
        centerMode
      ))
    )) * min(0.34, max(0.0, uFromEdgeMix - 0.18) * (0.3 + targetHold * 0.08));
    float sourceLiteralMix = clamp(
      sourceMask * mix(
        0.92,
        mix(0.54, 0.78, centerMode),
        clamp(mixProgress * 0.55 + reveal * 0.25, 0.0, 1.0)
      ),
      0.0,
      1.0
    );
    vec4 sourceBase = mix(
      frostedFrom,
      fromColor,
      sourceLiteralMix
    );
    float abstractResidue = clamp(
      edge * (0.18 + targetHold * 0.1) +
      edgeBand * 0.06 +
      max(0.0, sourceSideResidue - 0.24) * 0.08,
      0.0,
      0.28
    );
    sourceBase = mix(sourceBase, abstractFrom, abstractResidue);
    float sourceLuma = dot(sourceBase.rgb, vec3(0.299, 0.587, 0.114));
    float holdCorridor = targetHold * corridor * (0.008 + edge * 0.03 + centerFocus * 0.012);
    sourceBase.rgb = mix(
      sourceBase.rgb,
      vec3(sourceLuma) * vec3(1.0, 0.975, 0.94),
      centerSuppression * (0.016 + targetHold * 0.012) + holdCorridor * 0.016
    );
    sourceBase.rgb = mix(
      sourceBase.rgb,
      vec3(sourceLuma) * vec3(0.95, 0.92, 0.88),
      holdCorridor * 0.012
    );
    sourceBase.rgb *= mix(1.0, 0.992, centerSuppression * (0.024 + targetHold * 0.014) + holdCorridor * 0.008);

    vec4 toBlur = sampleLayer(
      uToTex,
      toUv,
      smearDir,
      max(0.0, uBlurStrength * (0.42 - reveal * 0.18) + motionAmount * 0.72)
    );
    vec4 toPreview = sampleLayer(
      uToTex,
      coverUv(vUv, uZoomScale + 0.03, uToShift * 0.35, uShearRad * 0.42),
      smearDir,
      max(18.0, uBlurStrength * (1.18 + targetHold * 0.6) + motionAmount * 0.42)
    );
    vec4 toSharp = texture2D(uToTex, clampUv(toUv));
    vec4 toMain = mix(
      toBlur,
      toSharp,
      clamp(0.22 + mixProgress * 0.58 + settleStrength * 0.14, 0.0, 1.0)
    );

    float gatedMixProgress = mixProgress * mixReady;
    float targetCoreGate = clamp(
      reveal * 1.08 +
      gatedMixProgress * 0.34 +
      settleStrength * 0.28,
      0.0,
      1.0
    );
    float targetPresence = clamp(
      directionalGate * (0.04 + reveal * 0.88) +
      sweepBand * (0.24 + uTargetFocus * 0.3) +
      streak * (0.12 + uTargetFocus * 0.14) +
      corridor * sweepBand * 0.05 +
      forwardCorridor * (0.12 + uForwardDriveStrength * 0.18) +
      centerFocus * sweepBand * (0.06 + uForwardDriveStrength * 0.04) * (0.12 + reveal * 0.88),
      0.0,
      1.0
    ) * mixReady * clamp(0.16 + targetCoreGate * 0.96, 0.0, 1.0);
    float forwardTargetPresence = clamp(
      mask * (0.12 + reveal * 0.74 + uTargetFocus * 0.12) +
      edge * (0.22 + uTargetFocus * 0.18) +
      streak * (0.16 + uTargetFocus * 0.1) +
      forwardCorridor * mask * (0.16 + uForwardDriveStrength * 0.14) +
      centerFocus * mask * 0.06,
      0.0,
      1.0
    ) * mixReady * clamp(0.14 + targetCoreGate * 1.02, 0.0, 1.0);
    targetPresence = mix(
      targetPresence,
      forwardTargetPresence * mix(0.46, 0.88, clamp(reveal * 0.7 + mixProgress * 0.5, 0.0, 1.0)),
      centerMode
    );
    float preRevealHold = 1.0 - clamp(targetCoreGate * 1.72 + reveal * 0.42, 0.0, 1.0);
    float previewPresence = previewReady * clamp(
      targetHold * (
        sweepBand * (0.22 + uTargetFocus * 0.16) +
        streak * (0.14 + uTargetFocus * 0.14) +
        forwardCorridor * (0.14 + uForwardDriveStrength * 0.16) +
        directionalGate * 0.08
      ) +
      (1.0 - smoothstep(0.24, 0.76, mixProgress)) * (
        sweepBand * (0.06 + uTargetFocus * 0.05) +
        streak * (0.05 + uTargetFocus * 0.04) +
        forwardCorridor * (0.08 + uForwardDriveStrength * 0.08)
      ),
      0.0,
      0.42
    ) * mix(1.0, 0.12, preRevealHold);
    float forwardPreviewPresence = previewReady * clamp(
      targetHold * (
        mask * (0.12 + uTargetFocus * 0.1) +
        edge * (0.22 + uTargetFocus * 0.1) +
        streak * (0.14 + uTargetFocus * 0.1) +
        forwardCorridor * mask * (0.12 + uForwardDriveStrength * 0.12)
      ) +
      (1.0 - smoothstep(0.24, 0.72, mixProgress)) * (
        mask * 0.08 +
        streak * 0.05 +
        forwardCorridor * edge * (0.05 + uForwardDriveStrength * 0.05)
      ),
      0.0,
      0.32
    ) * mix(1.0, 0.12, preRevealHold);
    previewPresence *= smoothstep(0.12, 0.4, uProgress) * smoothstep(0.06, 0.24, reveal + mixReady * 0.62);
    forwardPreviewPresence *= smoothstep(0.08, 0.32, uProgress) * smoothstep(0.04, 0.2, reveal + mixReady * 0.62);
    previewPresence = mix(
      previewPresence,
      forwardPreviewPresence * (0.56 + forwardCorridor * 0.1),
      centerMode
    );

    vec4 color = mix(sourceBase, toPreview, previewPresence);
    color = mix(color, toMain, targetPresence);

    float occlusion = edge * uOcclusionOpacity * (0.72 + uFromOpacity * 0.28);
    color.rgb *= 1.0 - occlusion * (0.14 + (1.0 - preRevealHold) * 0.2);
    color.rgb *= 1.0 - sweepBand * mix(
      0.025 + (1.0 - preRevealHold) * 0.04 + targetHold * 0.015,
      0.08 + (1.0 - preRevealHold) * 0.06 + targetHold * 0.025,
      centerMode
    );
    color.rgb += sweepBand *
      mix(vec3(1.0, 0.93, 0.84), vec3(0.97, 0.91, 0.84), centerMode) *
      mix(0.12 + uGlassAlpha * 0.06 + targetHold * 0.02, 0.032 + uGlassAlpha * 0.018 + targetHold * 0.006, centerMode);
    color.rgb += streak *
      mix(vec3(1.0, 0.96, 0.9), vec3(0.98, 0.92, 0.86), centerMode) *
      mix(0.05 + uGlassAlpha * 0.04 + targetHold * 0.02, 0.014 + uGlassAlpha * 0.014 + targetHold * 0.004, centerMode);
    color.rgb += edge * vec3(1.0, 0.95, 0.88) * 0.12 * uGlassAlpha * (0.82 + mixProgress * 0.2);
    color.rgb += forwardCorridor * vec3(1.0, 0.95, 0.88) *
      mix(0.026 + uForwardDriveStrength * 0.04, 0.006 + uForwardDriveStrength * 0.012, centerMode) *
      (0.32 + targetHold * 0.72);

    float radial = 1.0 - smoothstep(0.12, 0.92, length(vUv - vec2(0.5, 0.44)));
    float topGlow = 1.0 - smoothstep(0.18, 0.92, 1.0 - vUv.y);
    vec3 glassTint = vec3(1.0, 0.97, 0.92);
    color.rgb += glassTint * (0.032 * uGlassAlpha * radial + 0.005 * uGlassAlpha * topGlow * edge) * (1.0 - settleStrength * 0.6) * mix(1.0, 0.46, centerMode);
    color.rgb *= mix(0.92, 1.0, radial) * mix(0.98, 1.015, settleStrength);
    color.rgb = mix(color.rgb, color.rgb * 1.03 + vec3(0.008, 0.006, 0.004), settleStrength * 0.22);
    float liveWindow = targetHold * clamp(
      sweepBand * 0.045 +
      corridor * 0.02 +
      centerFocus * 0.01 +
      (1.0 - sourceSideResidue) * 0.018 -
      edge * 0.02,
      0.0,
      0.06
    );
    liveWindow *= smoothstep(0.4, 0.62, uProgress) * smoothstep(0.26, 0.52, targetCoreGate + reveal * 0.6);
    float directionalVeil = mix(
      targetHold * (
        uTravelDirX > 0.0
          ? smoothstep(0.0, 0.28 + uCurveStrength * 0.1, vUv.x) * (1.0 - smoothstep(0.58, 0.88, vUv.x))
          : smoothstep(0.0, 0.28 + uCurveStrength * 0.1, 1.0 - vUv.x) * (1.0 - smoothstep(0.58, 0.88, 1.0 - vUv.x))
      ),
      targetHold * smoothstep(0.18, 0.48, centerDistance) * (0.62 + uForwardDriveStrength * 0.22),
      centerMode
    );
    color.rgb *= 1.0 - directionalVeil * mix(0.028, 0.11, centerMode);
    color.rgb *= 1.0 - (1.0 - forwardCorridor) * uForwardDriveStrength * mix(0.18, 0.44, centerMode);
    color.rgb *= 1.0 - portalRing * (0.028 + uForwardDriveStrength * 0.06);
    color.rgb += portalRing * vec3(1.0, 0.94, 0.86) * (0.004 + reveal * 0.012 + uTargetFocus * 0.01);
    float centerToneDown = centerMode * clamp(
      0.06 +
      targetHold * 0.1 +
      uForwardDriveStrength * 0.04 +
      directionalVeil * 0.08 -
      settleStrength * 0.05,
      0.0,
      0.22
    );
    color.rgb *= 1.0 - centerToneDown;
    float outputAlphaFloor = mix(0.48, 0.72, mixReady);
    float outputAlphaCeil = 0.94 - targetHold * 0.12;
    float outputAlpha = clamp(
      (1.0 - liveWindow * 0.72) * mix(
        mix(outputAlphaCeil, 0.74, centerMode),
        mix(0.86, 0.78, centerMode),
        clamp(targetCoreGate * 0.92 + settleStrength * 0.4, 0.0, 1.0)
      ),
      outputAlphaFloor,
      0.995
    );

    gl_FragColor = vec4(color.rgb, outputAlpha);
  }
`;function Di(){if(document.getElementById(St))return;const t=document.createElement("style");t.id=St,t.textContent=`
    .vr-travel-transition {
      position: fixed;
      inset: 0;
      z-index: 4350;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      overflow: hidden;
      transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), visibility 180ms cubic-bezier(0.16, 1, 0.3, 1);
      --vr-travel-backdrop-blur: 28px;
      --vr-travel-backdrop-scale: 1.03;
      --vr-travel-backdrop-shift: 0%;
      --vr-travel-from-backdrop-opacity: 1;
      --vr-travel-backdrop-brightness: 0.92;
      --vr-travel-target-backdrop-blur: 18px;
      --vr-travel-target-backdrop-scale: 1.01;
      --vr-travel-target-backdrop-shift: 0%;
      --vr-travel-target-backdrop-opacity: 0;
      --vr-travel-target-reveal-inset: 100%;
      --vr-travel-from-cut-inner: 0%;
      --vr-travel-from-cut-outer: 100%;
      --vr-travel-sweep-offset: 0%;
      --vr-travel-sweep-rotate: 0deg;
      --vr-travel-sweep-opacity: 0;
      --vr-travel-corridor-opacity: 0;
      --vr-travel-directional-veil-opacity: 0;
      --vr-travel-directional-veil-width: 44%;
    }

    .vr-travel-transition.is-active {
      opacity: 1;
      visibility: visible;
      pointer-events: none;
    }

    .vr-travel-transition__fallback,
    .vr-travel-transition__canvas {
      position: absolute;
      inset: 0;
    }

    .vr-travel-transition__fallback {
      inset: -7%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      will-change: transform, filter, opacity, clip-path;
    }

    .vr-travel-transition__fallback--from {
      filter: blur(var(--vr-travel-backdrop-blur)) saturate(0.92) brightness(var(--vr-travel-backdrop-brightness));
      transform: translate3d(var(--vr-travel-backdrop-shift), 0, 0) scale(var(--vr-travel-backdrop-scale));
      opacity: var(--vr-travel-from-backdrop-opacity);
      -webkit-mask-image: radial-gradient(
        circle at 50% 50%,
        transparent 0%,
        transparent var(--vr-travel-from-cut-inner),
        rgba(0, 0, 0, 0.95) var(--vr-travel-from-cut-outer),
        #000 100%
      );
      mask-image: radial-gradient(
        circle at 50% 50%,
        transparent 0%,
        transparent var(--vr-travel-from-cut-inner),
        rgba(0, 0, 0, 0.95) var(--vr-travel-from-cut-outer),
        #000 100%
      );
    }

    .vr-travel-transition__fallback--to {
      filter: blur(var(--vr-travel-target-backdrop-blur)) saturate(0.98) brightness(0.98);
      transform: translate3d(var(--vr-travel-target-backdrop-shift), 0, 0) scale(var(--vr-travel-target-backdrop-scale));
      opacity: var(--vr-travel-target-backdrop-opacity);
    }

    .vr-travel-transition[data-wipe-from="right"] .vr-travel-transition__fallback--to {
      clip-path: inset(0 0 0 var(--vr-travel-target-reveal-inset));
    }

    .vr-travel-transition[data-wipe-from="left"] .vr-travel-transition__fallback--to {
      clip-path: inset(0 var(--vr-travel-target-reveal-inset) 0 0);
    }

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__fallback--to {
      clip-path: inset(0 calc(var(--vr-travel-target-reveal-inset) / 2) 0 calc(var(--vr-travel-target-reveal-inset) / 2));
    }

    .vr-travel-transition__canvas canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .vr-travel-transition__corridor,
    .vr-travel-transition__sweep,
    .vr-travel-transition__directional-veil {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .vr-travel-transition__corridor {
      inset: -10%;
      background:
        radial-gradient(
          82% 46% at 50% 50%,
          rgba(255, 248, 236, 0.02) 0%,
          rgba(255, 248, 236, 0.02) 28%,
          rgba(20, 24, 32, 0.08) 46%,
          rgba(10, 12, 18, 0.22) 66%,
          rgba(4, 6, 10, 0.44) 86%,
          rgba(2, 3, 6, 0.58) 100%
        );
      mix-blend-mode: multiply;
      opacity: var(--vr-travel-corridor-opacity);
      transition: opacity 120ms linear;
    }

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__corridor {
      background:
        radial-gradient(
          68% 38% at 50% 50%,
          rgba(255, 248, 236, 0.02) 0%,
          rgba(255, 248, 236, 0.01) 18%,
          rgba(18, 22, 30, 0.16) 34%,
          rgba(8, 10, 16, 0.36) 52%,
          rgba(3, 4, 8, 0.6) 74%,
          rgba(2, 3, 6, 0.78) 100%
        );
    }

    .vr-travel-transition__sweep {
      inset: -18%;
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0) 0%,
          rgba(8, 10, 16, 0.08) 18%,
          rgba(10, 12, 18, 0.26) 34%,
          rgba(244, 228, 201, 0.18) 45%,
          rgba(255, 248, 236, 0.72) 50%,
          rgba(244, 228, 201, 0.24) 57%,
          rgba(10, 12, 18, 0.22) 72%,
          rgba(8, 10, 16, 0) 100%
        );
      filter: blur(22px) saturate(0.94);
      mix-blend-mode: normal;
      opacity: var(--vr-travel-sweep-opacity);
      transform: translate3d(var(--vr-travel-sweep-offset), 0, 0) rotate(var(--vr-travel-sweep-rotate));
      transform-origin: center center;
      transition:
        opacity 120ms linear,
        transform 120ms linear;
    }

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__sweep {
      inset: -12%;
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0.72) 0%,
          rgba(8, 10, 16, 0.46) 18%,
          rgba(244, 228, 201, 0.01) 40%,
          rgba(255, 246, 230, 0.18) 50%,
          rgba(244, 228, 201, 0.01) 60%,
          rgba(8, 10, 16, 0.46) 82%,
          rgba(8, 10, 16, 0.72) 100%
        );
      filter: blur(10px) saturate(0.74);
      transform: translate3d(0, 0, 0) rotate(0deg);
    }

    .vr-travel-transition__directional-veil {
      opacity: var(--vr-travel-directional-veil-opacity);
      transition: opacity 120ms linear;
      mix-blend-mode: multiply;
    }

    .vr-travel-transition[data-wipe-from="right"] .vr-travel-transition__directional-veil {
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0) 0%,
          rgba(8, 10, 16, 0.04) 24%,
          rgba(8, 10, 16, 0.12) 48%,
          rgba(8, 10, 16, 0.32) 78%,
          rgba(8, 10, 16, 0.46) 100%
        );
      clip-path: inset(0 0 0 calc(100% - var(--vr-travel-directional-veil-width)));
    }

    .vr-travel-transition[data-wipe-from="left"] .vr-travel-transition__directional-veil {
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0.46) 0%,
          rgba(8, 10, 16, 0.32) 22%,
          rgba(8, 10, 16, 0.12) 52%,
          rgba(8, 10, 16, 0.04) 76%,
          rgba(8, 10, 16, 0) 100%
        );
      clip-path: inset(0 calc(100% - var(--vr-travel-directional-veil-width)) 0 0);
    }

    .vr-travel-transition[data-wipe-from="center"] .vr-travel-transition__directional-veil {
      background:
        linear-gradient(
          90deg,
          rgba(8, 10, 16, 0.68) 0%,
          rgba(8, 10, 16, 0.4) 18%,
          rgba(8, 10, 16, 0.1) 38%,
          rgba(8, 10, 16, 0) 50%,
          rgba(8, 10, 16, 0.1) 62%,
          rgba(8, 10, 16, 0.4) 82%,
          rgba(8, 10, 16, 0.68) 100%
        );
      clip-path: inset(0 calc((100% - var(--vr-travel-directional-veil-width)) / 2));
    }
  `,document.head.appendChild(t)}class Ai{constructor(){a(this,"element");a(this,"fromBackdrop");a(this,"toBackdrop");a(this,"canvasHost");a(this,"corridorLayer");a(this,"sweepLayer");a(this,"directionalVeilLayer");a(this,"renderer",null);a(this,"scene",null);a(this,"camera",null);a(this,"material",null);a(this,"quad",null);a(this,"resolution",new Xt(1,1));a(this,"active",!1);a(this,"webglEnabled",!1);a(this,"targetImageLoaded",!1);a(this,"currentSize",{width:0,height:0});a(this,"clearTimer",null);a(this,"fromTexture",null);a(this,"toTexture",null);a(this,"fromLoadToken",0);a(this,"toLoadToken",0);a(this,"currentFromUrl");a(this,"currentToUrl");Di(),this.element=document.createElement("div"),this.element.className="vr-travel-transition",this.element.dataset.wipeFrom="right",this.fromBackdrop=document.createElement("div"),this.fromBackdrop.className="vr-travel-transition__fallback vr-travel-transition__fallback--from",this.toBackdrop=document.createElement("div"),this.toBackdrop.className="vr-travel-transition__fallback vr-travel-transition__fallback--to",this.canvasHost=document.createElement("div"),this.canvasHost.className="vr-travel-transition__canvas",this.corridorLayer=document.createElement("div"),this.corridorLayer.className="vr-travel-transition__corridor",this.sweepLayer=document.createElement("div"),this.sweepLayer.className="vr-travel-transition__sweep",this.directionalVeilLayer=document.createElement("div"),this.directionalVeilLayer.className="vr-travel-transition__directional-veil",this.element.append(this.fromBackdrop,this.toBackdrop,this.canvasHost,this.directionalVeilLayer,this.corridorLayer,this.sweepLayer),this.initWebgl()}getElement(){return this.element}start(e){this.clearTimer!==null&&(window.clearTimeout(this.clearTimer),this.clearTimer=null),this.active=!0,this.targetImageLoaded=!1,this.currentFromUrl=e.fromImage,this.currentToUrl=e.targetImage,this.canvasHost.style.opacity="0",this.element.style.transition="none",this.element.style.opacity="1",this.element.style.visibility="visible",this.element.style.pointerEvents="none",this.element.style.setProperty("--vr-travel-backdrop-blur",e.targetImage?"12px":"22px"),this.element.style.setProperty("--vr-travel-target-backdrop-blur",e.targetImage?"8px":"0px"),this.element.style.setProperty("--vr-travel-from-backdrop-opacity",e.targetImage?"0.14":"0.46"),this.element.style.setProperty("--vr-travel-target-backdrop-opacity",e.targetImage?"0.28":"0"),this.element.style.setProperty("--vr-travel-target-reveal-inset",e.targetImage?"62%":"100%"),this.element.style.setProperty("--vr-travel-from-cut-inner",e.targetImage?"56%":"30%"),this.element.style.setProperty("--vr-travel-from-cut-outer",e.targetImage?"78%":"48%"),this.element.style.setProperty("--vr-travel-backdrop-brightness",e.targetImage?"0.82":"0.9"),this.element.style.setProperty("--vr-travel-sweep-offset",e.targetImage?"16%":"0%"),this.element.style.setProperty("--vr-travel-sweep-rotate",e.targetImage?"7deg":"0deg"),this.element.style.setProperty("--vr-travel-sweep-opacity",e.targetImage?"0.18":"0"),this.element.style.setProperty("--vr-travel-corridor-opacity",e.targetImage?"0.2":"0.08"),this.element.style.setProperty("--vr-travel-directional-veil-opacity",e.targetImage?"0.14":"0"),this.element.style.setProperty("--vr-travel-directional-veil-width",e.targetImage?"48%":"0%"),this.setBackdropImage(this.fromBackdrop,e.fromImage),this.setBackdropImage(this.toBackdrop,e.targetImage),this.element.classList.add("is-active"),this.element.dataset.stage="starting",this.element.dataset.progress="0",this.element.dataset.targetReady="false",this.loadTexture("from",e.fromImage),this.loadTexture("to",e.targetImage)}setTargetImage(e){this.currentToUrl=e,this.setBackdropImage(this.toBackdrop,e),this.loadTexture("to",e)}render(e){if(!this.active)return;const r=wt(e,this.targetImageLoaded);if(this.element.style.visibility="visible",this.element.style.pointerEvents="none",this.element.style.opacity=String(r.stageOpacity),this.element.dataset.stage=e.stage,this.element.dataset.progress=String(e.progress),this.element.dataset.targetReady=String(e.targetReady),this.updateFallbackMotion(e,r),this.element.dataset.wipeFrom=e.wipeFrom,!this.webglEnabled||!this.renderer||!this.material)return;const i=!!this.fromTexture;if(this.canvasHost.style.opacity=i?String(e.targetReady?1:.84+e.stageProgress*.1):"0",!i)return;this.ensureRendererSize();const n=this.material.uniforms;n.uProgress.value=e.progress,n.uRevealProgress.value=e.revealProgress,n.uTargetMixProgress.value=e.targetMixProgress,n.uTravelDirX.value=e.travelDirX,n.uCenterRevealMode.value=e.wipeFrom==="center"?1:0,n.uCurveStrength.value=e.curveStrength,n.uForwardDriveStrength.value=e.forwardDriveStrength,n.uWipeSoftness.value=e.wipeSoftness,n.uDistortionStrength.value=e.distortionStrength,n.uBlurStrength.value=e.blurPx,n.uMotionBlurStrength.value=e.motionBlurStrength,n.uGlassAlpha.value=e.glassAlpha,n.uOcclusionOpacity.value=e.occlusionOpacity,n.uZoomScale.value=e.zoomScale,n.uFromShift.value=e.fromShiftPercent,n.uToShift.value=e.toShiftPercent,n.uShearRad.value=Li(e.shearDeg),n.uSettleStrength.value=e.settleStrength,n.uTargetPreviewLoaded.value=this.targetImageLoaded?1:0,n.uTargetMixReady.value=this.targetImageLoaded&&e.targetReady?Math.min(1,Math.max(e.revealProgress*.82+e.targetMixProgress*.3+e.targetFocus*.08,e.stage==="settle"?.82:.12)):0,n.uFromOpacity.value=e.fromOpacity,n.uFromEdgeMix.value=e.fromEdgeMix,n.uTargetFocus.value=e.targetFocus,this.renderer.render(this.scene,this.camera)}hide(){this.active&&(this.active=!1,this.element.style.transition="opacity 140ms cubic-bezier(0.16, 1, 0.3, 1), visibility 140ms cubic-bezier(0.16, 1, 0.3, 1)",this.element.style.opacity="0",this.element.style.visibility="hidden",this.element.style.pointerEvents="none",this.element.style.setProperty("--vr-travel-from-backdrop-opacity","0"),this.element.style.setProperty("--vr-travel-target-backdrop-opacity","0"),this.element.style.setProperty("--vr-travel-target-reveal-inset","100%"),this.element.style.setProperty("--vr-travel-backdrop-blur","0px"),this.element.style.setProperty("--vr-travel-target-backdrop-blur","0px"),this.element.style.setProperty("--vr-travel-sweep-opacity","0"),this.element.style.setProperty("--vr-travel-corridor-opacity","0"),this.element.style.setProperty("--vr-travel-directional-veil-opacity","0"),this.canvasHost.style.opacity="0",this.element.dataset.stage="idle",this.element.dataset.progress="1",this.element.dataset.targetReady="false",this.element.classList.remove("is-active"),this.clearTimer=window.setTimeout(()=>{this.active||(this.element.style.opacity="",this.element.style.visibility="",this.element.style.transition="",this.element.style.pointerEvents="",this.setBackdropImage(this.fromBackdrop,void 0),this.setBackdropImage(this.toBackdrop,void 0),this.targetImageLoaded=!1,this.currentFromUrl=void 0,this.currentToUrl=void 0)},Ti))}isActive(){return this.active}initWebgl(){try{this.renderer=new qt({antialias:!1,alpha:!0,premultipliedAlpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.setClearColor(0,0),this.scene=new jt,this.camera=new Qt(-1,1,1,-1,0,1),this.material=new Zt({transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uFromTex:{value:null},uToTex:{value:null},uResolution:{value:this.resolution},uRevealProgress:{value:0},uTargetMixProgress:{value:0},uProgress:{value:0},uTravelDirX:{value:1},uCenterRevealMode:{value:0},uCurveStrength:{value:0},uForwardDriveStrength:{value:0},uWipeSoftness:{value:.16},uDistortionStrength:{value:.22},uBlurStrength:{value:24},uMotionBlurStrength:{value:.1},uGlassAlpha:{value:.22},uOcclusionOpacity:{value:.18},uZoomScale:{value:1.02},uFromShift:{value:0},uToShift:{value:0},uShearRad:{value:0},uSettleStrength:{value:0},uTargetPreviewLoaded:{value:0},uTargetMixReady:{value:0},uFromOpacity:{value:1},uFromEdgeMix:{value:0},uTargetFocus:{value:0}},vertexShader:bi,fragmentShader:_i});const e=new Jt(2,2);this.quad=new Kt(e,this.material),this.scene.add(this.quad),this.canvasHost.appendChild(this.renderer.domElement),this.webglEnabled=!0,this.ensureRendererSize()}catch{this.webglEnabled=!1,this.renderer=null,this.scene=null,this.camera=null,this.material=null,this.quad=null}}ensureRendererSize(){if(!this.renderer)return;const e=Math.max(window.innerWidth,1),r=Math.max(window.innerHeight,1);this.currentSize.width===e&&this.currentSize.height===r||(this.currentSize={width:e,height:r},this.resolution.set(e,r),this.renderer.setSize(e,r,!1))}async loadTexture(e,r){const i=e==="from"?"fromLoadToken":"toLoadToken",n=e==="from"?"currentFromUrl":"currentToUrl",s=this[i]+1;if(this[i]=s,!r){this.applyTexture(e,null,void 0,s);return}if(this[n]===r&&this.getTexture(e)){e==="to"&&(this.targetImageLoaded=!0);return}try{const o=await Ni(r),c=Ri(o);this.applyTexture(e,c,r,s),e==="to"&&(this.targetImageLoaded=!0)}catch{e==="to"&&(this.targetImageLoaded=!1),this.applyTexture(e,null,r,s)}}applyTexture(e,r,i,n){const s=e==="from"?this.fromLoadToken:this.toLoadToken;if(n!==s){r==null||r.dispose();return}const o=this.getTexture(e);if(o&&o!==r&&o.dispose(),e==="from"){this.fromTexture=r,this.currentFromUrl=i,this.setBackdropImage(this.fromBackdrop,i),this.material&&(this.material.uniforms.uFromTex.value=r,this.toTexture||(this.material.uniforms.uToTex.value=r));return}this.toTexture=r,this.currentToUrl=i,this.setBackdropImage(this.toBackdrop,i),this.material&&(this.material.uniforms.uToTex.value=r??this.fromTexture)}getTexture(e){return e==="from"?this.fromTexture:this.toTexture}updateFallbackMotion(e,r=wt(e,this.targetImageLoaded)){let i=r.fallbackBlur,n=r.fromBackdropOpacity,s=r.targetBackdropBlur,o=r.targetBackdropOpacity;const c=!!this.fromTexture,l=!!this.toTexture&&this.targetImageLoaded;if(this.webglEnabled&&c){const A=e.targetReady?Math.min(1,.48+e.revealProgress*.32+e.targetMixProgress*.22):Math.min(.74,.18+e.targetFocus*.28+e.revealProgress*.14);i=Math.max(2.2,i*(1-A*.78)),n*=e.targetReady?Math.max(.1,.34-A*.16):Math.max(.24,.72-A*.28)}if(this.webglEnabled&&l){const A=e.targetReady?Math.min(1,.42+e.revealProgress*.34+e.targetMixProgress*.24):Math.min(.68,.22+e.targetFocus*.28+e.revealProgress*.12);s=Math.max(1.2,s*(1-A*.88)),o*=e.targetReady?Math.max(.02,.08-A*.06):Math.max(0,.02-A*.02)}this.element.style.setProperty("--vr-travel-backdrop-blur",`${i}px`),this.element.style.setProperty("--vr-travel-backdrop-scale",String(Number((e.zoomScale+e.fromEdgeMix*(e.sourceKind==="cover"?.08:.03)).toFixed(4)))),this.element.style.setProperty("--vr-travel-backdrop-shift",`${e.fromShiftPercent}%`),this.element.style.setProperty("--vr-travel-from-backdrop-opacity",String(n)),this.element.style.setProperty("--vr-travel-backdrop-brightness",String(r.backdropBrightness)),this.element.style.setProperty("--vr-travel-from-cut-inner",`${r.fromCenterCutInner}%`),this.element.style.setProperty("--vr-travel-from-cut-outer",`${r.fromCenterCutOuter}%`),this.element.style.setProperty("--vr-travel-target-backdrop-blur",`${s}px`),this.element.style.setProperty("--vr-travel-target-backdrop-scale",String(Number(Math.max(1,e.zoomScale-.01).toFixed(4)))),this.element.style.setProperty("--vr-travel-target-backdrop-shift",`${e.toShiftPercent}%`),this.element.style.setProperty("--vr-travel-target-backdrop-opacity",String(o)),this.element.style.setProperty("--vr-travel-target-reveal-inset",`${r.targetRevealInset}%`);const d=e.wipeFrom==="center",u=d?(e.stage==="turn-in"||e.stage==="travel",0):e.travelDirX*(e.stage==="turn-in"?8-e.stageProgress*22:e.stage==="travel"?-4-e.stageProgress*32:-12+e.settleStrength*8),m=d?e.stage==="turn-in"?e.curveStrength*1.2:e.stage==="travel"?e.curveStrength*1.8:0:e.travelDirX*(e.stage==="turn-in"?6+e.curveStrength*5+e.forwardDriveStrength*4:e.stage==="travel"?8+e.curveStrength*8+e.forwardDriveStrength*5:2+e.curveStrength*2),y=Ie(e.stage==="settle"?.22-e.settleStrength*.18:d?.26+e.stageProgress*.18+e.forwardDriveStrength*.14+e.curveStrength*.03:.24+e.stageProgress*.22+e.forwardDriveStrength*.2+e.curveStrength*.1,0,d?.68:.72),M=Ie(e.stage==="settle"?.12-e.settleStrength*.1:d?.24+e.forwardDriveStrength*.2+e.curveStrength*.03+e.targetFocus*.03:.16+e.forwardDriveStrength*.18+e.curveStrength*.06+e.targetFocus*.08,0,d?.54:.44);this.element.style.setProperty("--vr-travel-sweep-offset",`${u}%`),this.element.style.setProperty("--vr-travel-sweep-rotate",`${m}deg`),this.element.style.setProperty("--vr-travel-sweep-opacity",String(Ee(y))),this.element.style.setProperty("--vr-travel-corridor-opacity",String(Ee(M)));const v=Ie(e.stage==="settle"?.1-e.settleStrength*.08:d?.26+e.stageProgress*.1+e.forwardDriveStrength*.16:.16+e.stageProgress*.12+e.forwardDriveStrength*.1+e.curveStrength*.08,0,d?.58:.38),f=Ie(d?34+e.forwardDriveStrength*14:38+e.forwardDriveStrength*10+e.curveStrength*12,d?28:34,d?52:58);this.element.style.setProperty("--vr-travel-directional-veil-opacity",String(Ee(v))),this.element.style.setProperty("--vr-travel-directional-veil-width",`${Ee(f)}%`)}setBackdropImage(e,r){e.style.backgroundImage=r?`url("${r}")`:""}}function Ri(t){const e=new er(t);return e.colorSpace=tr,e.wrapS=Je,e.wrapT=Je,e.minFilter=Ke,e.magFilter=Ke,e.generateMipmaps=!1,e.needsUpdate=!0,e}function Ie(t,e,r){return Math.max(e,Math.min(r,t))}function Ee(t){return Math.round(t*1e3)/1e3}function Ni(t){return new Promise((e,r)=>{const i=new Image;i.decoding="async",i.crossOrigin="anonymous",i.onload=()=>e(i),i.onerror=()=>r(new Error(`image load failed: ${t}`)),i.src=t,typeof i.decode=="function"&&i.decode().then(()=>e(i)).catch(()=>{})})}function Li(t){return t*Math.PI/180}function xi({frame:t,currentWorldView:e,targetWorldView:r,loadCommitted:i}){if(t.progress>=1)return{...r};const n=Ci(t,i),s=G(e.pitch,r.pitch,n),o=G(e.fov,r.fov,n),c=Oi(t);return{yaw:t.displayWorldYaw,pitch:yt(s+c),fov:yt(o+t.fovDelta)}}function Ci(t,e){if(t.stage==="turn-in"){const r=G(.02,.08,t.stageProgress);return K(e?r+.05:r,0,.16)}if(t.stage==="travel"){if(t.stageProgress<.38)return K(G(e?.18:.06,e?.4:.16,t.stageProgress/.38),0,e?.4:.16);if(t.stageProgress<.72){const i=(t.stageProgress-.38)/.34;return K(G(e?.4:.16,e?.78:.34,i),0,e?.78:.34)}const r=(t.stageProgress-.72)/.28;return K(G(e?.78:.34,e?.92:.5,r),0,e?.92:.5)}return K(G(e?.84:.52,1,t.stageProgress),0,1)}function Oi(t){const e=K(t.forwardDriveStrength,0,1);if(e<=.04)return 0;const r=t.wipeFrom==="center"?1.2:1;return t.stage==="turn-in"?G(-.35,-2.4*r,t.stageProgress)*e:t.stage==="travel"?t.stageProgress<.42?G(-2.4*r,-.9*r,t.stageProgress/.42)*e:G(-.9*r,.75,(t.stageProgress-.42)/.58)*e:G(.75,0,t.stageProgress)*e}function G(t,e,r){return t+(e-t)*K(r,0,1)}function K(t,e,r){return Math.max(e,Math.min(r,t))}function yt(t){return Number(t.toFixed(2))}const Pe=.86,Vi=460,ki=.56;function Fe(t,e="high"){return t.failed?!0:t.loadCommitted?e==="low"&&t.lowReady||t.sharpReady:!1}function Ui({ts:t,startTs:e,durationMs:r,settleMs:i,state:n,releaseMode:s="high"}){const o=Te((t-e)/Math.max(r,1)*Pe,0,Pe);if(!n.targetReady||n.targetReadyAtTs==null)return o;const c=Te(Math.max(n.targetReadyProgress,o,n.currentProgress),0,Pe);if(!Fe(n,s)||n.releaseAtTs==null)return c;const l=t-n.releaseAtTs,d=Te(Math.max(n.releaseProgress,c),0,Pe);return Te(d+l/Math.max(i+Vi,1)*(1-d),0,1)}function Te(t,e,r){return Math.max(e,Math.min(r,t))}const Fi=.72;function Gi(t){return{targetReady:!1,lowReady:!1,sharpReady:!1,loadCommitted:!1,failed:!1,currentProgress:0,targetReadyAtTs:null,targetReadyProgress:0,releaseAtTs:null,releaseProgress:0}}function Bi(t,e){return!e||typeof t.panoLow=="string"&&t.panoLow.trim().length>0?t:{...t,panoLow:e}}function Hi(t){return t.stage==="settle"||t.stage==="travel"&&t.stageProgress>=Fi}function $i(t,e){return t?e==="lowReady"||e==="highReady"||e==="degraded":!1}const ie=.44,Ce=.08,Oe=.4,W=16,Ge=-5.8,Mt=2.8,Yi=.12,Wi=.2,It=.22,Ve=.3,zi=.38;function Xi({currentWorldYaw:t,targetWorldYaw:e,plan:r,progress:i,targetReady:n,targetReadyProgress:s,sourceKind:o="scene"}){const c=V(i,0,1),l=r.durationMs+r.settleMs,u=1-V(r.settleMs/Math.max(l,1),Yi,Wi),m=r.wipeFrom==="center",y=m?.18:1,M=Be(t+r.travelDirX*r.turnLead),v=ji({normalizedProgress:c,settleStart:u,targetReady:n,targetReadyProgress:s,sourceKind:o,forwardRevealMode:m});if(c<=ie){const E=He(q(c,ie)),k=be(t,M,E),R=r.forwardDriveStrength*(.22+E*.28),N=g(W*.92,W*.68,E)-R*1.3;return{progress:H(c),stageProgress:H(E),targetReady:n,stage:"turn-in",sourceKind:o,displayWorldYaw:k,travelDirX:r.travelDirX,wipeFrom:r.wipeFrom,revealProgress:0,targetMixProgress:0,settleStrength:0,fromOpacity:S(o==="cover"?g(.28,.16,E):m?g(.94,.78,E)-R*.04:g(.9,.7,E)-R*.1),fromEdgeMix:S(o==="cover"?.995:m?g(.34,.7,E)+R*.08:g(.26,.6,E)+R*.06),targetFocus:S(o==="cover"?g(.22,.38,E):m?g(.04,.1,E)+R*.08:g(.08,.18,E)+R*.14),wipeSoftness:Ce,distortionStrength:S(Oe*(o==="cover"?.68:.92)*(1+R*.4)),blurPx:C(Math.max(7.5,N)),glassAlpha:Ve,motionBlurStrength:S(.11+R*.12),fovDelta:C(Ge*(.68+.32*E)),zoomScale:H(1+.032*E+R*.04),fromShiftPercent:C(r.travelDirX*(o==="cover"?3.4:3.4+R*2.8)*E*y),toShiftPercent:C(r.travelDirX*(12.6+R*6.4)*(1-E*.9)*y),shearDeg:C(r.travelDirX*(2.1+r.curveStrength*4.8)*E*y),curveStrength:S(Math.min(1,r.curveStrength*1.08)),forwardDriveStrength:S(r.forwardDriveStrength),occlusionOpacity:S((.22+r.curveStrength*.28+r.forwardDriveStrength*.18)*E)}}if(c<u){const E=q(c-ie,u-ie),k=Xe(E),R=be(M,e,k),N=Qi(E),b=n?g(W*(o==="cover"?.62:.48),W*.08,v.revealProgress):W*(o==="cover"?.94:.68),L=r.forwardDriveStrength*(.32+N*.68),j=b+W*.05*N,ge=Oe*(1.08+.5*N+r.curveStrength*.24+r.forwardDriveStrength*.3),U=n?o==="cover"?g(.22,.02,v.targetMixProgress):m?g(.84,.28,v.targetMixProgress):g(.66,.12,v.targetMixProgress):o==="cover"?.28:m?g(.82,.64,k)-L*.02:g(.62,.38,k)-L*.12,ve=o==="cover"?.98:n?m?g(.68,.94,v.targetMixProgress):g(.52,.9,v.targetMixProgress):m?g(.62,.88,k)+L*.08:g(.52,.88,k)+L*.12,ce=n?m?v.targetFocus*.76:v.targetFocus:o==="cover"?.16:m?g(.08,.16,N)+L*.04:g(.16,.36,N)+L*.14;return{progress:H(c),stageProgress:H(k),targetReady:n,stage:"travel",sourceKind:o,displayWorldYaw:R,travelDirX:r.travelDirX,wipeFrom:r.wipeFrom,revealProgress:S(v.revealProgress),targetMixProgress:S(v.targetMixProgress),settleStrength:0,fromOpacity:S(U),fromEdgeMix:S(ve),targetFocus:S(ce),wipeSoftness:S(Ce+r.curveStrength*.03),distortionStrength:S(ge),blurPx:C(Math.max(m?6.6:5.5,j-r.forwardDriveStrength*(m?2.4:4.1))),glassAlpha:S(n?It:Ve),motionBlurStrength:S(.2+N*.38+r.forwardDriveStrength*(m?.16:.12)),fovDelta:C(qi(c,u)),zoomScale:H(1+.05+N*.072+r.forwardDriveStrength*(m?.052+N*.07:.036+N*.054)),fromShiftPercent:C(r.travelDirX*g(o==="cover"?3.8:3.2,o==="cover"?9.4:8.4,k)*y),toShiftPercent:C(r.travelDirX*g(14.8+r.forwardDriveStrength*6,.3,v.revealProgress)*y),shearDeg:C(r.travelDirX*(3.4+r.curveStrength*7.6+r.forwardDriveStrength*2.8)*N*y),curveStrength:S(Math.min(1,r.curveStrength*1.1)),forwardDriveStrength:S(r.forwardDriveStrength),occlusionOpacity:S((.28+r.curveStrength*(zi+.12)+r.forwardDriveStrength*.24)*N)}}const f=Gt(q(c-u,1-u)),A=be(M,e,1),w=n?g(W*.22,0,f):W*.88,le=n?S(g(v.revealProgress,1,f)):0,D=n?S(g(v.targetMixProgress,1,f)):0,pe=n?S(g(v.targetFocus,1,f)):.34;return{progress:H(c),stageProgress:H(f),targetReady:n,stage:"settle",sourceKind:o,displayWorldYaw:be(A,e,f),travelDirX:r.travelDirX,wipeFrom:r.wipeFrom,revealProgress:le,targetMixProgress:D,settleStrength:S(n?f:0),fromOpacity:S(n?g(o==="cover"?g(.1,.02,v.targetMixProgress):g(.22,.06,v.targetMixProgress),0,f):o==="cover"?.32:.18),fromEdgeMix:S(o==="cover"?1:n?g(.9,.98,f):.98),targetFocus:pe,wipeSoftness:S(Ce+r.curveStrength*.02),distortionStrength:S(Oe*(1-f*.8)),blurPx:C(w),glassAlpha:S(n?g(It,.08,f):Ve),motionBlurStrength:S(n?g(.12,0,f):.07),fovDelta:C(g(.55,0,f)),zoomScale:H(g(1.02,1,f)),fromShiftPercent:C(r.travelDirX*g(o==="cover"?3.6:3,0,f)*y),toShiftPercent:C(r.travelDirX*g(1.4,0,f)*y),shearDeg:C(r.travelDirX*g(1.9+r.curveStrength*2.5,0,f)*y),curveStrength:S(Math.min(1,r.curveStrength*1.08)),forwardDriveStrength:S(r.forwardDriveStrength),occlusionOpacity:S(g(.16+r.curveStrength*.2+r.forwardDriveStrength*.08,0,f))}}function qi(t,e){return t<=.26?g(0,Ge,He(q(t,.26))):t<=.54?g(Ge,Mt,Xe(q(t-.26,.28))):t<=e?g(Mt,.6,He(q(t-.54,Math.max(e-.54,.001)))):.6}function ji({normalizedProgress:t,settleStart:e,targetReady:r,targetReadyProgress:i,sourceKind:n,forwardRevealMode:s}){if(!r)return{revealProgress:0,targetMixProgress:0,targetFocus:0};const o=V(Math.max(i??ie,n==="scene"?ie+(s?.18:.1):ie+.05),0,Math.min(t,e)),c=Math.max((1-o)*(s?.82:.68),.001),l=Math.max(t-o,0),d=q(l,c),u=s?Math.pow(d,1.28):d,m=Xe(u),y=Gt(q(l,c*(s?1.04:.88))),M=V((n==="cover"?.03:0)+m*(n==="cover"?.82:s?.54:.72)+y*(n==="cover"?.12:s?.07:.1),0,s?.72:.94),v=V((n==="cover"?.2:s?.02:.04)+m*(n==="cover"?.66:s?.42:.56)+y*(n==="cover"?.12:s?.06:.1),0,1);return{revealProgress:m,targetMixProgress:M,targetFocus:v}}function be(t,e,r){const i=Be(e-t);return C(Be(t+i*V(r,0,1)))}function Be(t){const e=((t+180)%360+360)%360-180;return Object.is(e,-0)?0:e}function q(t,e){return e<=0?1:V(t/e,0,1)}function Qi(t){const e=V(t,0,1);return 1-Math.pow(e*2-1,2)}function He(t){const e=1-V(t,0,1);return 1-e*e*e}function Xe(t){const e=V(t,0,1);return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function Gt(t){const e=V(t,0,1);return 1-(1-e)*(1-e)}function g(t,e,r){return t+(e-t)*V(r,0,1)}function V(t,e,r){return Math.max(e,Math.min(r,t))}function C(t){return Number(t.toFixed(2))}function S(t){return Number(t.toFixed(3))}function H(t){return Number(t.toFixed(4))}class Zi{constructor(e){a(this,"overlay");a(this,"activeSession",null);this.overlay=new Ai,e.appendChild(this.overlay.getElement())}start(e){var i;(i=this.activeSession)==null||i.cancel();const r=new Ji(this.overlay,e,()=>{this.activeSession===r&&(this.activeSession=null)});return this.activeSession=r,r.start(),r}isActive(){var e;return((e=this.activeSession)==null?void 0:e.isActive())??!1}}class Ji{constructor(e,r,i){a(this,"plan");a(this,"overlay");a(this,"args");a(this,"handleDispose");a(this,"rafId",null);a(this,"startTs",0);a(this,"completionPromise");a(this,"resolveCompletion");a(this,"state");a(this,"active",!1);a(this,"renderFrame",e=>{if(!this.active)return;this.startTs||(this.startTs=e,this.state.targetReady&&this.state.targetReadyAtTs===0&&(this.state.targetReadyAtTs=e));let r=this.computeProgress(e);this.state.currentProgress=r,this.maybeActivateReveal(e,r)&&(r=this.computeProgress(e),this.state.currentProgress=r);const i=Xi({currentWorldYaw:this.args.currentWorldView.yaw,targetWorldYaw:this.args.targetWorldView.yaw,plan:this.plan,progress:r,targetReady:this.state.targetReady,targetReadyProgress:this.state.targetReadyProgress,sourceKind:this.args.sourceKind??"scene"});if(this.overlay.render(i),this.driveCamera(i),r>=1&&Fe(this.state,this.args.releaseMode??"high")){this.finish();return}this.rafId=window.requestAnimationFrame(this.renderFrame)});this.overlay=e,this.args=r,this.handleDispose=i,this.plan=gi({currentWorldYaw:r.currentWorldView.yaw,targetWorldYaw:r.targetWorldView.yaw,hotspotScreenX:r.hotspotScreenX,fromMapPoint:r.fromMapPoint,toMapPoint:r.toMapPoint}),this.state=Gi(r.targetPreviewImage),this.completionPromise=new Promise(n=>{this.resolveCompletion=n})}start(){var r,i;this.active=!0,(i=(r=this.args).onInteractionLock)==null||i.call(r,!0);const e=this.overlay.getElement();e.dataset.durationMs=String(this.plan.durationMs),e.dataset.settleMs=String(this.plan.settleMs),e.dataset.turnLead=String(this.plan.turnLead),this.overlay.start({fromImage:this.args.fromImage,targetImage:this.args.targetPreviewImage}),this.rafId=window.requestAnimationFrame(this.renderFrame)}setTargetPreviewImage(e){e&&this.overlay.setTargetImage(e)}markTargetReady(){this.maybeActivateReveal(performance.now(),this.state.currentProgress)}markLoadCommitted(){this.state.loadCommitted=!0}markStatus(e){if(e===T.LOW_READY){this.state.lowReady=!0,this.maybeActivateReveal(performance.now(),this.state.currentProgress);return}(e===T.HIGH_READY||e===T.DEGRADED)&&(this.state.lowReady=!0,this.state.sharpReady=!0,this.maybeActivateReveal(performance.now(),this.state.currentProgress))}markError(){this.state.failed=!0,this.maybeActivateReveal(performance.now(),this.state.currentProgress)}isActive(){return this.active}waitForCompletion(){return this.completionPromise}cancel(){var e,r;this.active&&(this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null),this.overlay.hide(),(r=(e=this.args).onInteractionLock)==null||r.call(e,!1),this.active=!1,this.resolveCompletion("cancelled"),this.handleDispose())}computeProgress(e){return Ui({ts:e,startTs:this.startTs,durationMs:this.plan.durationMs,settleMs:this.plan.settleMs,state:this.state,releaseMode:this.args.releaseMode??"high"})}driveCamera(e){if(!this.args.onCameraFrame)return;const r=xi({frame:e,currentWorldView:this.args.currentWorldView,targetWorldView:this.args.targetWorldView,loadCommitted:this.state.loadCommitted});this.args.onCameraFrame(r,{useTargetScene:this.state.loadCommitted,frame:e})}finish(){var e,r;this.active&&(this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null),this.overlay.hide(),(r=(e=this.args).onInteractionLock)==null||r.call(e,!1),this.active=!1,this.resolveCompletion("completed"),this.handleDispose())}maybeActivateReveal(e,r){return this.state.targetReady||!(this.state.failed||this.state.loadCommitted&&(this.state.lowReady||this.state.sharpReady))||r<ki?!1:(this.state.targetReady=!0,this.state.targetReadyAtTs=e,this.state.targetReadyProgress=r,this.markReleaseReady(e),!0)}markReleaseReady(e){this.state.releaseAtTs==null&&Fe(this.state,this.args.releaseMode??"high")&&(this.state.releaseAtTs=e,this.state.releaseProgress=this.state.currentProgress)}}function Ki({width:t,height:e,coarsePointer:r}){const i=Math.max(0,t),n=Math.max(0,e),s=Math.min(i,n),o=Math.max(i,n);return i<=820||r&&s<=900&&o<=1400?"mobile-compact":"desktop"}function en(t=window){var r;const e=((r=t.matchMedia)==null?void 0:r.call(t,"(pointer: coarse)").matches)??!1;return Ki({width:t.innerWidth,height:t.innerHeight,coarsePointer:e})}function tn(t=document,e){var r,i;t.documentElement.dataset.vrLayout=e,(r=t.body)==null||r.setAttribute("data-vr-layout",e),(i=t.body)==null||i.classList.toggle("vr-layout-mobile-compact",e==="mobile-compact")}X&&Promise.all([_(()=>import("./debugHelper-CkxFqbpw.js"),[],import.meta.url),_(()=>Promise.resolve().then(()=>Xr),void 0,import.meta.url)]).then(([t,e])=>{const{dumpVRState:r,resetVRUI:i}=t,{interactionBus:n}=e;window.__vrDump=()=>{const s=r();return console.debug("[VR State Snapshot]",s),s},window.__vrResetUI=()=>{console.debug("[VR Reset UI] 正在清理所有 UI 状态..."),i(n),console.debug("[VR Reset UI] 清理完成")},console.debug("[VR Debug] 调试模式已启用。使用 __vrDump() 查看状态，使用 __vrResetUI() 复位 UI")}).catch(()=>{});ar();Jr();Kr();mr();const Bt=()=>{const t=document;!!(document.fullscreenElement||t.webkitFullscreenElement)&&xr()};document.addEventListener("fullscreenchange",Bt);document.addEventListener("webkitfullscreenchange",Bt);function rn(){const t=new URLSearchParams(location.search);return t.has("development")||t.get("dev")==="1"||location.hash.includes("development")}class nn{constructor(){a(this,"appElement");a(this,"config",null);a(this,"panoViewer",null);a(this,"titleBar",null);a(this,"topRightControls",null);a(this,"topModeTabs",null);a(this,"sceneTitleEl",null);a(this,"brandMark",null);a(this,"bottomDock",null);a(this,"sceneGuideDrawer",null);a(this,"guideTray",null);a(this,"museumList",null);a(this,"sceneListPage",null);a(this,"hotspots",null);a(this,"videoPlayer",null);a(this,"loading");a(this,"debugPanel",null);a(this,"configStudio",null);a(this,"qualityIndicator",null);a(this,"northCalibrationPanel",null);a(this,"currentMuseum",null);a(this,"currentScene",null);a(this,"viewerContainer",null);a(this,"museumShellChrome",null);a(this,"sceneTransitionController",null);a(this,"activeTransitionSession",null);a(this,"transitionIntentState",xe());a(this,"activeSceneEnterMeta",null);a(this,"pendingSceneEnterMeta",null);a(this,"sceneUiRuntime",null);a(this,"chatRuntime",null);a(this,"viewSessionRuntime");a(this,"enteredMuseumIds",new Set);a(this,"routeViewSyncDisposer",null);a(this,"lastRouteViewSyncAt",0);a(this,"lastRouteViewSignature","");a(this,"hasBoundFullscreenEvents",!1);a(this,"mode","tour");a(this,"infoModalMounted",null);a(this,"settingsModalMounted",null);a(this,"handlePopState",null);a(this,"handlePickEvent",null);a(this,"handlePickModeEvent",null);a(this,"debugPanelRafId",null);a(this,"panoViewerModulePromise",null);a(this,"topRightControlsModulePromise",null);a(this,"brandMarkModulePromise",null);a(this,"structureView2DModulePromise",null);a(this,"structureView3DModulePromise",null);a(this,"titleBarModulePromise",null);a(this,"museumListModulePromise",null);a(this,"sceneListPageModulePromise",null);a(this,"sceneGraphModulePromise",null);a(this,"vrModeModulePromise",null);a(this,"vrModeInitialized",!1);a(this,"externalImageModulePromise",null);a(this,"appModalsModulePromise",null);a(this,"sceneUiRuntimeModulePromise",null);a(this,"chatRuntimeModulePromise",null);a(this,"configErrorPanelModulePromise",null);a(this,"museumShellChromeModulePromise",null);a(this,"handleLayoutProfileSync",()=>{this.syncLayoutProfile()});a(this,"uiErrorElement",null);const e=document.getElementById("app");if(!e)throw new Error("找不到 #app 元素");this.appElement=e,this.syncLayoutProfile(),window.addEventListener("resize",this.handleLayoutProfileSync,{passive:!0}),window.addEventListener("orientationchange",this.handleLayoutProfileSync),Hr(),this.loading=new pr,this.appElement.appendChild(this.loading.getElement()),this.viewSessionRuntime=new ei({appElement:this.appElement,getCurrentMuseum:()=>this.currentMuseum,getCurrentScene:()=>this.currentScene,getMode:()=>this.mode,onSwitchToTour:()=>{var r;this.mode="tour",(r=this.topModeTabs)==null||r.setMode("tour")},navigateToScene:(r,i)=>{this.requestSceneEntry(r,i,void 0,{source:"guide-drawer"})},loadSceneGraphModule:()=>this.loadSceneGraphModule(),loadStructureView2DModule:()=>this.loadStructureView2DModule(),loadStructureView3DModule:()=>this.loadStructureView3DModule()}),this.bindFullscreenEventsOnce(),this.init()}syncLayoutProfile(){const e=en(window);document.documentElement.dataset.vrLayout=e,tn(document,e)}bindFullscreenEventsOnce(){if(this.hasBoundFullscreenEvents)return;this.hasBoundFullscreenEvents=!0;const e=()=>{var r;(r=this.topRightControls)==null||r.syncFullscreenState(),xt()||(this.syncVrModeUi(!1),Ct())};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}loadPanoViewerModule(){return this.panoViewerModulePromise||(this.panoViewerModulePromise=_(()=>import("./PanoViewer-CWN_vCDJ.js").then(e=>e.P),__vite__mapDeps([0,1,2]),import.meta.url)),this.panoViewerModulePromise}loadTopRightControlsModule(){return this.topRightControlsModulePromise||(this.topRightControlsModulePromise=_(()=>import("./TopRightControls-3s5TYdCt.js"),__vite__mapDeps([3,1]),import.meta.url)),this.topRightControlsModulePromise}loadBrandMarkModule(){return this.brandMarkModulePromise||(this.brandMarkModulePromise=_(()=>import("./BrandMark-bMNafDG3.js"),__vite__mapDeps([4,1]),import.meta.url)),this.brandMarkModulePromise}loadStructureView2DModule(){return this.structureView2DModulePromise||(this.structureView2DModulePromise=_(()=>import("./StructureView2D-zkjJIym3.js"),__vite__mapDeps([5,6,7,8,1]),import.meta.url)),this.structureView2DModulePromise}loadStructureView3DModule(){return this.structureView3DModulePromise||(this.structureView3DModulePromise=_(()=>import("./dock-panels-DHLox7kQ.js").then(e=>e.S),__vite__mapDeps([9,7,8]),import.meta.url)),this.structureView3DModulePromise}loadTitleBarModule(){return this.titleBarModulePromise||(this.titleBarModulePromise=_(()=>import("./TitleBar-Dc3zo5Aq.js"),[],import.meta.url)),this.titleBarModulePromise}loadMuseumListModule(){return this.museumListModulePromise||(this.museumListModulePromise=_(()=>import("./MuseumList-h1x7llH4.js"),__vite__mapDeps([10,1]),import.meta.url)),this.museumListModulePromise}loadSceneListPageModule(){return this.sceneListPageModulePromise||(this.sceneListPageModulePromise=_(()=>import("./SceneListPage-lCfLpChX.js"),__vite__mapDeps([11,1]),import.meta.url)),this.sceneListPageModulePromise}loadSceneGraphModule(){return this.sceneGraphModulePromise||(this.sceneGraphModulePromise=_(()=>import("./sceneGraph-BFajjk2P.js"),__vite__mapDeps([12,7]),import.meta.url)),this.sceneGraphModulePromise}loadVrModeModule(){return this.vrModeModulePromise||(this.vrModeModulePromise=_(()=>import("./vrMode-D0JfzTr1.js"),__vite__mapDeps([13,14,1]),import.meta.url)),this.vrModeModulePromise}loadAppModalsModule(){return this.appModalsModulePromise||(this.appModalsModulePromise=_(()=>import("./appModals-Be8StHqP.js"),__vite__mapDeps([15,16,17,1]),import.meta.url)),this.appModalsModulePromise}setDocumentTitle(...e){const r=e.map(i=>typeof i=="string"?i.trim():"").filter(i=>i.length>0);document.title=r.length>0?r.join(" - "):"VR 全景导览"}syncVrModeUi(e){this.panoViewer&&this.panoViewer.setVrModeEnabled(e),this.topRightControls&&this.topRightControls.updateVrModeState(e),window.dispatchEvent(new CustomEvent("vr:mode-change",{detail:{active:e}}))}loadSceneUiRuntimeModule(){return this.sceneUiRuntimeModulePromise||(this.sceneUiRuntimeModulePromise=_(()=>import("./scene-runtime--JK5eek1.js").then(e=>e.s),__vite__mapDeps([18,19]),import.meta.url)),this.sceneUiRuntimeModulePromise}loadChatRuntimeModule(){return this.chatRuntimeModulePromise||(this.chatRuntimeModulePromise=_(()=>import("./scene-runtime--JK5eek1.js").then(e=>e.c),__vite__mapDeps([18,19]),import.meta.url)),this.chatRuntimeModulePromise}loadConfigErrorPanelModule(){return this.configErrorPanelModulePromise||(this.configErrorPanelModulePromise=_(()=>import("./ConfigErrorPanel-Bi87Tz5b.js"),__vite__mapDeps([20,21,1]),import.meta.url)),this.configErrorPanelModulePromise}loadMuseumShellChromeModule(){return this.museumShellChromeModulePromise||(this.museumShellChromeModulePromise=_(()=>import("./MuseumShellChrome-DFMuZk0r.js"),[],import.meta.url)),this.museumShellChromeModulePromise}async ensureVrModeInitialized(){const e=await this.loadVrModeModule();return this.vrModeInitialized||(e.initVrMode(),this.vrModeInitialized=!0),e}async resolveProxiedImageUrl(e){this.externalImageModulePromise||(this.externalImageModulePromise=_(()=>import("./externalImage-C8_s6D1F.js").then(r=>r.e),[],import.meta.url));try{const{toProxiedImageUrl:r}=await this.externalImageModulePromise;return r(e)}catch{return e}}async ensureMuseumShellChrome(){if(this.museumShellChrome)this.museumShellChrome.getElement().isConnected||this.appElement.appendChild(this.museumShellChrome.getElement());else{const{MuseumShellChrome:e}=await this.loadMuseumShellChromeModule();this.museumShellChrome=new e,this.appElement.appendChild(this.museumShellChrome.getElement())}return this.museumShellChrome}ensureSceneTransitionController(){return this.sceneTransitionController||(this.sceneTransitionController=new Zi(this.appElement)),this.sceneTransitionController}buildMuseumTransitionModel(e,r){return{brandTitle:ye(this.config).brandTitle,title:r.name,subtitle:`${e.name} · 正在进入下一个展点`,backgroundImage:Z(e.cover,B.COVER)||"",snapshotImage:this.resolveScenePreviewAsset(r)}}warmMuseumPreviewAssets(e,r){const i=ai({museum:e,targetSceneId:r});for(const n of i.previewAssets){const s=new Image;s.decoding="async",s.loading="eager",s.src=Z(n,B.THUMB)||Z(n,B.PANO)||n}}async showMuseumCover(e,r){if(!this.config)return;this.currentMuseum=e,this.currentScene=null,this.setDocumentTitle(e.name,this.config.appName),this.loading.hide(),this.loadPanoViewerModule(),this.loadTopRightControlsModule(),this.loadBrandMarkModule();const i=ye(this.config),n=await this.ensureMuseumShellChrome();n.setCoverAction(()=>{this.enteredMuseumIds.add(e.id),this.requestSceneEntry(e.id,r,void 0,{source:"cover-cta"})}),n.showCover(si({appName:this.config.appName,brandTitle:i.brandTitle,museum:e,targetSceneId:r})),this.warmMuseumPreviewAssets(e,r)}ensureLoadingElementAttached(){const e=this.loading.getElement();e.isConnected||this.appElement.appendChild(e)}async ensureViewerShell(e){if(this.viewerContainer?this.viewerContainer.isConnected||this.appElement.appendChild(this.viewerContainer):(this.viewerContainer=document.createElement("div"),this.viewerContainer.className="viewer-container",this.viewerContainer.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      `,this.appElement.appendChild(this.viewerContainer)),!this.panoViewer){const{PanoViewer:r}=await this.loadPanoViewerModule();this.panoViewer=new r(this.viewerContainer,e)}return this.viewerContainer}resolveScenePreviewAsset(e){return this.resolveSourceScenePreviewAsset(e)}resolveSourceScenePreviewAsset(e){return ft({thumbUrl:this.resolveTransitionPreviewAssetUrl(e.thumb,B.THUMB),panoLowUrl:this.resolveTransitionPreviewAssetUrl(e.panoLow,B.PANO),prefer:"thumb"})||""}resolveTargetScenePreviewAsset(e){return ft({thumbUrl:this.resolveTransitionPreviewAssetUrl(e.thumb,B.THUMB),panoLowUrl:this.resolveTransitionPreviewAssetUrl(e.panoLow,B.PANO),prefer:"thumb"})||""}resolveTransitionPreviewAssetUrl(e,r){if(!e||typeof e!="string"||e.trim()==="")return"";const i=e.trim();if(/^(?:data|blob):/i.test(i))return i;const n=this.rewriteRepoDocsAssetToCurrentOrigin(i);if(n)return n;if(/^https?:\/\//i.test(i)||i.startsWith("//"))return Z(i)||i;try{return i.startsWith("/")?new URL(i.slice(1),document.baseURI).toString():new URL(i,document.baseURI).toString()}catch{return Z(i)||i}}rewriteRepoDocsAssetToCurrentOrigin(e){const r=e.trim(),i=r.match(/^https:\/\/raw\.githubusercontent\.com\/wokao4360-rgb\/vrplayer\/main\/docs\/(.+)$/i);if(i)return new URL(i[1],document.baseURI).toString();const n=r.match(/^https:\/\/wokao4360-rgb\.github\.io\/vrplayer\/(.+)$/i);return n?new URL(n[1],document.baseURI).toString():""}captureViewerSnapshot(){var r;const e=(r=this.panoViewer)==null?void 0:r.getDomElement();if(!(e instanceof HTMLCanvasElement))return"";try{return e.toDataURL("image/jpeg",.76)}catch{return""}}requestSceneEntry(e,r,i,n={source:"route"}){var o;const s={museumId:e,sceneId:r,view:i};if((o=this.activeTransitionSession)!=null&&o.isActive()){this.transitionIntentState=gt(this.transitionIntentState,s),this.pendingSceneEnterMeta=n;return}this.transitionIntentState=gt(xe(),s),this.activeSceneEnterMeta=n,st(e,r,i,{focusSource:n.source==="hotspot"?"pano":"dock"})}flushQueuedSceneEntry(){const{next:e,state:r}=vi(this.transitionIntentState);if(this.transitionIntentState=r,this.activeSceneEnterMeta=null,!e){this.pendingSceneEnterMeta=null;return}const i=this.pendingSceneEnterMeta??{source:"route"};this.pendingSceneEnterMeta=null,window.setTimeout(()=>{this.requestSceneEntry(e.museumId,e.sceneId,e.view,i)},0)}detachRouteViewSync(){this.routeViewSyncDisposer&&(this.routeViewSyncDisposer(),this.routeViewSyncDisposer=null),this.lastRouteViewSyncAt=0,this.lastRouteViewSignature=""}bindRouteViewSync(){this.detachRouteViewSync(),this.panoViewer&&(this.routeViewSyncDisposer=this.panoViewer.onFrame(()=>{var c;if(!this.panoViewer||!this.currentMuseum||!this.currentScene||(c=this.museumShellChrome)!=null&&c.isCoverVisible())return;const e=performance.now();if(e-this.lastRouteViewSyncAt<480)return;const r=Re();if(r.museumId!==this.currentMuseum.id||r.sceneId!==this.currentScene.id)return;const i=this.panoViewer.getCurrentView(),n={yaw:Number(mt(this.currentScene,i.yaw).toFixed(2)),pitch:Number(i.pitch.toFixed(2)),fov:Number(i.fov.toFixed(1))},s=`${n.yaw}/${n.pitch}/${n.fov}`,o=`${r.yaw??""}/${r.pitch??""}/${r.fov??""}`;s===o||s===this.lastRouteViewSignature||(this.lastRouteViewSignature=s,this.lastRouteViewSyncAt=e,hr(this.currentMuseum.id,this.currentScene.id,n))}))}async init(){try{if(this.loading.show(),dr()){await this.initEditorMode(),this.loading.hide();return}this.config=await tt(),Ne(this.config.assetCdn),this.setDocumentTitle(this.config.appName),this.titleBar&&this.titleBar.setTitle(this.config.appName),this.handlePopState||(this.handlePopState=()=>{this.handleRoute()},window.addEventListener("popstate",this.handlePopState)),await this.handleRoute(),this.loading.hide()}catch(e){console.error("配置加载失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?await this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await tt(),Ne(this.config.assetCdn),this.appElement.innerHTML="";const{ConfigStudio:e}=await _(async()=>{const{ConfigStudio:r}=await import("./editor-debug-D45gsJxt.js").then(i=>i.C);return{ConfigStudio:r}},__vite__mapDeps([22,21,23,17]),import.meta.url);this.configStudio=new e(this.config,r=>{this.config=r,Ne(r.assetCdn),rt()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?await this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async showConfigErrorPanel(e){this.appElement.innerHTML="";const{ConfigErrorPanel:r}=await this.loadConfigErrorPanelModule(),i=new r(e,()=>{rt(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(i.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>config.json 示例</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              background: #1a1a1a;
              color: #fff;
            }
            pre {
              background: #0f0f0f;
              padding: 20px;
              border-radius: 8px;
              overflow-x: auto;
            }
            code {
              color: #4a90e2;
            }
          </style>
        </head>
        <body>
          <h1>config.json 示例配置</h1>
          <pre><code>{
  "appName": "应用名称",
  "museums": [
    {
      "id": "museum_id",
      "name": "展馆名称",
      "cover": "https://example.com/cover.jpg",
      "map": {
        "image": "https://example.com/map.jpg",
        "width": 1000,
        "height": 600
      },
      "scenes": [
        {
          "id": "scene_id",
          "name": "场景名称",
          "panoLow": "https://example.com/pano-low.jpg",
          "pano": "https://example.com/pano.jpg",
          "thumb": "https://example.com/thumb.jpg",
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
                "museumId": "museum_id",
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
}</code></pre>
          <p>详细配置说明请查看 README.md</p>
        </body>
        </html>
      `)}async handleRoute(){var c,l,d;if(!this.config)return;const e=Re();if(e.sceneId&&(this.loadPanoViewerModule(),this.loadTopRightControlsModule(),this.loadBrandMarkModule()),!e.museumId){this.clearView(),this.setDocumentTitle(this.config.appName),await this.showMuseumList();return}const r=Et(e.museumId);if(!r){this.clearView(),this.showError("未找到指定展馆"),ot();return}const i=ni({museum:r,requestedSceneId:e.sceneId,hasEnteredMuseum:this.enteredMuseumIds.has(r.id)});if(i.kind==="cover"){const u=((c=this.currentMuseum)==null?void 0:c.id)===r.id&&!!(this.panoViewer&&this.viewerContainer);this.clearView({preserveViewerShell:u,preserveMuseumShell:u}),await this.showMuseumCover(r,i.targetSceneId);return}const n=or(e.museumId,i.targetSceneId);if(!n){this.clearView(),this.showError("未找到指定场景");const u=Ut(r);if(u){st(r.id,u);return}ot();return}const s=oi({currentMuseumId:((l=this.currentMuseum)==null?void 0:l.id)??null,hasViewerShell:!!(this.panoViewer&&this.viewerContainer),nextMuseumId:r.id,requestedView:{yaw:e.yaw,pitch:e.pitch,fov:e.fov}}),o=s.shellStrategy==="reuse-shell"&&this.currentScene&&this.panoViewer?(()=>{const u=this.panoViewer.getCurrentView();return{scene:this.currentScene,worldView:{yaw:mt(this.currentScene,u.yaw),pitch:u.pitch,fov:u.fov}}})():{scene:null,worldView:null};this.clearView({preserveViewerShell:s.shellStrategy==="reuse-shell",preserveMuseumShell:s.shellStrategy==="reuse-shell"||((d=this.museumShellChrome)==null?void 0:d.isCoverVisible())===!0}),await this.showScene(r,n,s,o)}async showMuseumList(){if(!this.config)return;const[{TitleBar:e},{MuseumList:r}]=await Promise.all([this.loadTitleBarModule(),this.loadMuseumListModule()]),i=ye(this.config);this.titleBar=new e(i.brandTitle),this.appElement.appendChild(this.titleBar.getElement()),this.setDocumentTitle(this.config.appName),this.museumList=new r(this.config),this.appElement.appendChild(this.museumList.getElement())}async showSceneList(e){var n;const{TitleBar:r}=await this.loadTitleBarModule();this.titleBar=new r(e.name),this.appElement.appendChild(this.titleBar.getElement()),this.setDocumentTitle(e.name,(n=this.config)==null?void 0:n.appName);const{SceneListPage:i}=await this.loadSceneListPageModule();this.sceneListPage=new i(e),this.appElement.appendChild(this.sceneListPage.getElement())}async showScene(e,r,i,n){var je,Qe,Ze;const s=Re(),o=i.transitionDriver==="viewer",c=ur(),l=rn();this.currentMuseum=e,this.currentScene=o?null:r,this.enteredMuseumIds.add(e.id),this.loading.hide(),this.setDocumentTitle(r.name,e.name,(je=this.config)==null?void 0:je.appName);const d=await this.ensureViewerShell(c),u=await this.ensureMuseumShellChrome(),m=u.isCoverVisible(),y=this.buildMuseumTransitionModel(e,r);o?u.completeTransition():i.shellStrategy==="reuse-shell"?u.startSceneTransition({...y,snapshotImage:this.captureViewerSnapshot()||y.snapshotImage}):u.isCoverVisible()?u.showEnterPreloading(y):u.completeTransition(),o||this.mountTopRightControls(d,r,l);const M=(n==null?void 0:n.scene)??null,v=s.yaw!==void 0?s.yaw:r.initialView.yaw||0,f=s.pitch!==void 0?s.pitch:r.initialView.pitch||0,A=s.fov!==void 0?s.fov:r.initialView.fov||75,w=(n==null?void 0:n.worldView)??{yaw:v,pitch:f,fov:A},le=(M?this.resolveSourceScenePreviewAsset(M):this.resolveSourceScenePreviewAsset(r))||void 0,D=this.resolveTargetScenePreviewAsset(r)||void 0,pe=Pi({coverWasVisible:m,sourcePreviewUrl:le,targetPreviewUrl:D,targetPreviewAlreadyReady:!!D,coverHeroUrl:Z(e.cover,B.COVER)||e.cover,viewerSnapshot:o?void 0:this.captureViewerSnapshot(),previousScenePreviewImage:M?this.resolveSourceScenePreviewAsset(M):""}),E=Bi(r,D),k=this.activeSceneEnterMeta??{};this.activeSceneEnterMeta=null;const R={yaw:v,pitch:f,fov:A};let N=!1,b=null,L=!o,j=!1,ge=!1,U=!1,ve=!1,ce=!1,fe=null,ue=()=>{var p,I,P,x,O,$,Q;this.bottomDock=((p=this.sceneUiRuntime)==null?void 0:p.getBottomDock())??null,this.topModeTabs=((I=this.sceneUiRuntime)==null?void 0:I.getTopModeTabs())??null,this.hotspots=((P=this.sceneUiRuntime)==null?void 0:P.getHotspots())??null,this.videoPlayer=((x=this.sceneUiRuntime)==null?void 0:x.getVideoPlayer())??null,this.guideTray=((O=this.sceneUiRuntime)==null?void 0:O.getGuideTray())??null,this.sceneGuideDrawer=(($=this.sceneUiRuntime)==null?void 0:$.getSceneGuideDrawer())??null,this.qualityIndicator=((Q=this.sceneUiRuntime)==null?void 0:Q.getQualityIndicator())??null},_e=()=>{},we=()=>{};const De=()=>{fe!=null&&(window.clearTimeout(fe),fe=null)},de=()=>{U||(U=!0,De(),we())},Ae=()=>{j||(j=!0,_e())},qe=p=>{ce||(ce=!0,u.markPreviewReady(),window.setTimeout(()=>{u.completeTransition()},260))},Ht=()=>{L||!this.panoViewer||(L=!0,b==null||b.markLoadCommitted(),this.currentMuseum=e,this.currentScene=r,this.hideUIError(),Ae(),ue(),de(),this.mountTopRightControls(d,r,l),this.panoViewer.loadScene(E,{preserveView:!0,silentFallback:!0}),this.panoViewer.setSceneData(e.id,r.id,r.hotspots),this.bindRouteViewSync())};if(o&&(b=this.ensureSceneTransitionController().start({currentWorldView:w,targetWorldView:R,sourceKind:m?"cover":"scene",fromMapPoint:M==null?void 0:M.mapPoint,toMapPoint:r.mapPoint,fromImage:pe.fromImage,targetPreviewImage:pe.targetPreviewImage,hotspotScreenX:k.hotspotScreenX,releaseMode:"low",onCameraFrame:(I,P)=>{if(!this.panoViewer)return;if(!L&&Hi(P.frame)&&Ht(),this.panoViewer.isInteracting()){N=!0;return}if(N)return;const x=L||P.useTargetScene?r:M??r,O=ht(x,I.yaw);this.panoViewer.setView(O,I.pitch,I.fov)}}),this.activeTransitionSession=b,b.waitForCompletion().then(I=>{if(this.activeTransitionSession===b&&(this.activeTransitionSession=null),I==="completed"){this.flushQueuedSceneEntry();return}this.transitionIntentState=xe(),this.pendingSceneEnterMeta=null,this.activeSceneEnterMeta=null})),this.sceneTitleEl=document.createElement("div"),this.sceneTitleEl.className="vr-scenetitle",this.sceneTitleEl.textContent=r.name||((Qe=this.config)==null?void 0:Qe.appName)||"VR Player",this.appElement.appendChild(this.sceneTitleEl),this.handlePickEvent&&(window.removeEventListener("vr:pick",this.handlePickEvent),this.handlePickEvent=null),this.handlePickEvent=p=>{const I=p,{x:P,y:x,yaw:O,pitch:$}=I.detail;if(Wr({yaw:O,pitch:$,ts:Date.now()}),Lt(`已复制 yaw: ${O.toFixed(2)}, pitch: ${$.toFixed(2)}`),this.panoViewer){const Q=this.panoViewer.getDomElement();$r(Q,P,x)}},window.addEventListener("vr:pick",this.handlePickEvent),this.handlePickModeEvent&&(window.removeEventListener("vr:pickmode",this.handlePickModeEvent),this.handlePickModeEvent=null),this.handlePickModeEvent=p=>{const I=p;this.panoViewer&&!I.detail.enabled&&this.panoViewer.isPickModeEnabled()&&this.panoViewer.disablePickMode()},window.addEventListener("vr:pickmode",this.handlePickModeEvent),this.mountBrandMark(),c&&!this.debugPanel){const{DebugPanel:p}=await _(async()=>{const{DebugPanel:P}=await import("./editor-debug-D45gsJxt.js").then(x=>x.D);return{DebugPanel:P}},__vite__mapDeps([22,21,23,17]),import.meta.url);this.debugPanel=new p,this.appElement.appendChild(this.debugPanel.getElement()),this.debugPanelRafId!==null&&(cancelAnimationFrame(this.debugPanelRafId),this.debugPanelRafId=null);const I=()=>{if(this.debugPanel&&this.panoViewer){const P=this.panoViewer.getCurrentView();this.debugPanel.updateView(P.yaw,P.pitch,P.fov)}this.debugPanelRafId=requestAnimationFrame(I)};I()}this.panoViewer&&this.debugPanel&&this.panoViewer.setOnDebugClick((p,I,P,x,O)=>{this.debugPanel&&this.debugPanel.show(p,I,P,x,O)});const[{ChatRuntime:$t},{SceneUiRuntime:Yt}]=await Promise.all([this.loadChatRuntimeModule(),this.loadSceneUiRuntimeModule()]);if(this.chatRuntime=new $t({captureCurrentViewImage:()=>this.captureViewerSnapshot()}),this.chatRuntime.updateContext({museum:e,scene:r,fcChatConfig:(Ze=this.config)==null?void 0:Ze.fcChat}),this.sceneUiRuntime=new Yt({appElement:this.appElement,viewerContainer:d,museum:e,scene:r,initialMode:this.mode,getPanoViewer:()=>this.panoViewer,getCurrentSceneId:()=>{var p;return((p=this.currentScene)==null?void 0:p.id)??null},onModeChange:p=>{this.setMode(p)},onEnterScene:(p,I,P)=>{this.requestSceneEntry(e.id,p,I,P??{source:"route"})},onOpenInfo:()=>{this.openInfoModal()},onOpenSettings:()=>{this.openSettingsModal()},onOpenCommunity:()=>{var p;(p=this.chatRuntime)==null||p.ensureInit()},onSmartNarration:()=>{var p;de(),(p=this.chatRuntime)==null||p.ensureInit()},onPhotoAsk:()=>{var p;de(),(p=this.chatRuntime)==null||p.ensureInit()},onWarmupFeatures:async()=>{await this.loadAppModalsModule()}}),ue=()=>{var p,I,P,x,O,$,Q;this.bottomDock=((p=this.sceneUiRuntime)==null?void 0:p.getBottomDock())??null,this.topModeTabs=((I=this.sceneUiRuntime)==null?void 0:I.getTopModeTabs())??null,this.hotspots=((P=this.sceneUiRuntime)==null?void 0:P.getHotspots())??null,this.videoPlayer=((x=this.sceneUiRuntime)==null?void 0:x.getVideoPlayer())??null,this.guideTray=((O=this.sceneUiRuntime)==null?void 0:O.getGuideTray())??null,this.sceneGuideDrawer=(($=this.sceneUiRuntime)==null?void 0:$.getSceneGuideDrawer())??null,this.qualityIndicator=((Q=this.sceneUiRuntime)==null?void 0:Q.getQualityIndicator())??null},_e=()=>{var p;!j||ge||!this.sceneUiRuntime||(ge=!0,(p=this.sceneUiRuntime)==null||p.mountCore().then(()=>{ue()}).catch(I=>{X&&console.debug("[showScene] 核心场景 UI 创建失败，已跳过",I)}))},we=()=>{!U||ve||!this.chatRuntime||(ve=!0,this.chatRuntime.ensureInit())},U||(fe=window.setTimeout(()=>{U||(U=!0,we(),X&&console.debug("[showScene] chat init fallback triggered"))},3500)),ue(),j&&_e(),U&&we(),this.panoViewer.setOnStatusChange(p=>{var P,x;const I=$i(L,p);L&&((P=this.sceneUiRuntime)==null||P.handleStatusChange(p),ue()),!o&&(i.shellStrategy==="reuse-shell"||u.isCoverVisible())&&(p===T.LOW_READY||p===T.HIGH_READY||p===T.DEGRADED)&&qe(),I&&(p===T.LOW_READY||p===T.HIGH_READY||p===T.DEGRADED?window.requestAnimationFrame(()=>{const O=this.captureViewerSnapshot()||D;b==null||b.setTargetPreviewImage(O),b==null||b.markStatus(p)}):b==null||b.markStatus(p)),L&&!j&&(p===T.LOW_READY||p===T.HIGH_READY||p===T.DEGRADED)&&window.setTimeout(()=>{Ae()},0),(p===T.HIGH_READY||p===T.DEGRADED)&&((x=this.sceneUiRuntime)==null||x.scheduleFeatureWarmup(p===T.HIGH_READY?"immediate":"idle")),L&&!U&&(p===T.LOW_READY||p===T.HIGH_READY||p===T.DEGRADED)&&de(),L&&(p===T.LOW_READY||p===T.HIGH_READY||p===T.DEGRADED)&&this.loading.hide()}),this.panoViewer.setOnLoad(()=>{Ae(),U||de(),De(),this.loading.hide(),this.hideUIError(),!o&&!ce&&qe(T.HIGH_READY),this.preloadNextScene(e,r)}),this.panoViewer.setOnError(p=>{De(),console.error("加载场景失败:",p),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),o?b==null||b.markError():u.showErrorFallback({...this.buildMuseumTransitionModel(e,r),snapshotImage:this.captureViewerSnapshot()||y.snapshotImage})}),i.viewStrategy==="reset-to-target"){const p=ht(r,v);this.panoViewer.setView(p,f,A)}o||(this.panoViewer.loadScene(r,{preserveView:!0}),this.panoViewer.setSceneData(e.id,r.id,r.hotspots),this.bindRouteViewSync())}async mountTopRightControls(e,r,i){var n;try{const{TopRightControls:s}=await this.loadTopRightControlsModule();if(!this.panoViewer||!this.currentScene||this.currentScene.id!==r.id)return;(n=this.topRightControls)==null||n.remove(),this.topRightControls=new s({viewerRootEl:e,onTogglePickMode:i?()=>this.panoViewer?(this.panoViewer.isPickModeEnabled()?this.panoViewer.disablePickMode():this.panoViewer.enablePickMode(),this.panoViewer.isPickModeEnabled()):!1:void 0,onOpenNorthCalibration:i?()=>{this.openNorthCalibration(r.id)}:void 0,showNorthCalibration:i,onToggleVrMode:async()=>this.toggleVrModeFromUI(e)}),this.appElement.appendChild(this.topRightControls.getElement())}catch(s){X&&console.debug("[showScene] TopRightControls 创建失败，已跳过",s),this.topRightControls=null}}async mountBrandMark(){var e;try{const{BrandMark:r}=await this.loadBrandMarkModule();if(this.appElement.querySelector(".vr-brandmark"))return;this.brandMark=new r({appName:(e=this.config)==null?void 0:e.appName,brandText:this.config?ye(this.config).brandTitle:ti.brand.name});const n=this.brandMark.getElement();n.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),this.openDingHuQingYuan()}),this.appElement.appendChild(n)}catch(r){X&&console.debug("[showScene] BrandMark 创建失败，已跳过",r),this.brandMark=null}}preloadNextScene(e,r){const n=(e.scenes.findIndex(o=>o.id===r.id)+1)%e.scenes.length,s=e.scenes[n];if(s&&s.thumb){const o=Z(s.thumb,B.THUMB);if(o){const c=new Image;c.referrerPolicy="no-referrer",c.crossOrigin="anonymous",c.loading="lazy",c.decoding="async",this.resolveProxiedImageUrl(o).then(l=>{c.src=l}).catch(()=>{c.src=o})}}}clearView(e={}){var n,s,o;const r=e.preserveViewerShell===!0,i=e.preserveMuseumShell===!0;this.viewSessionRuntime.clearOverlayState(),(n=this.activeTransitionSession)==null||n.cancel(),this.activeTransitionSession=null,this.detachRouteViewSync(),this.handlePickEvent&&(window.removeEventListener("vr:pick",this.handlePickEvent),this.handlePickEvent=null),this.handlePickModeEvent&&(window.removeEventListener("vr:pickmode",this.handlePickModeEvent),this.handlePickModeEvent=null),this.debugPanelRafId!==null&&(cancelAnimationFrame(this.debugPanelRafId),this.debugPanelRafId=null),(s=this.infoModalMounted)==null||s.close(),this.infoModalMounted=null,(o=this.settingsModalMounted)==null||o.close(),this.settingsModalMounted=null,this.chatRuntime&&(this.chatRuntime.dispose(),this.chatRuntime=null),this.sceneUiRuntime&&(this.sceneUiRuntime.dispose(),this.sceneUiRuntime=null),this.bottomDock=null,this.topModeTabs=null,this.hotspots=null,this.videoPlayer=null,this.guideTray=null,this.sceneGuideDrawer=null,this.qualityIndicator=null,!r&&this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.topRightControls&&(this.topRightControls.remove(),this.topRightControls=null),this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),this.sceneTitleEl&&(this.sceneTitleEl.remove(),this.sceneTitleEl=null),this.brandMark&&(this.brandMark.remove(),this.brandMark=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneListPage&&(this.sceneListPage.remove(),this.sceneListPage=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),!i&&this.museumShellChrome&&(this.museumShellChrome.getElement().remove(),this.museumShellChrome=null),!r&&this.viewerContainer&&(this.viewerContainer.remove(),this.viewerContainer=null),this.mode="tour",this.currentScene=null,r||(this.currentMuseum=null),this.ensureLoadingElementAttached()}hideUIError(){this.uiErrorElement&&this.uiErrorElement.parentNode&&(this.uiErrorElement.parentNode.removeChild(this.uiErrorElement),this.uiErrorElement=null)}setMode(e){this.mode!==e&&(this.mode=e,this.topModeTabs&&this.topModeTabs.setMode(e),e==="tour"&&this.viewSessionRuntime.isStructureOverlayOpen()&&this.viewSessionRuntime.closeStructureOverlay({toTour:!1}),e==="structure2d"?this.viewSessionRuntime.openStructure2D():e==="structure3d"&&this.viewSessionRuntime.openStructure3D())}async openNorthCalibration(e){if(this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),!this.panoViewer){console.warn("[openNorthCalibration] PanoViewer 未初始化");return}try{const{NorthCalibrationPanel:r}=await _(async()=>{const{NorthCalibrationPanel:i}=await import("./editor-debug-D45gsJxt.js").then(n=>n.N);return{NorthCalibrationPanel:i}},__vite__mapDeps([22,21,23,17]),import.meta.url);this.northCalibrationPanel=new r({getCurrentYaw:()=>{var n;const i=(n=this.panoViewer)==null?void 0:n.getCurrentView();return(i==null?void 0:i.yaw)??0},sceneId:e,onClose:()=>{this.northCalibrationPanel=null}})}catch(r){console.error("[openNorthCalibration] 创建校准面板失败:",r),this.northCalibrationPanel=null}}showError(e){this.hideUIError(),this.uiErrorElement=document.createElement("div"),this.uiErrorElement.className="error-message",this.uiErrorElement.textContent=e,this.uiErrorElement.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: #fff;
      padding: 20px 30px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 16px;
      text-align: center;
      max-width: 80vw;
    `,this.appElement.appendChild(this.uiErrorElement),setTimeout(()=>{this.hideUIError()},3e3)}openDingHuQingYuan(){if(this.brandMark)try{this.brandMark.getAboutModal().open()}catch(e){X&&console.debug("[openDingHuQingYuan] 打开团队介绍失败:",e)}}async openInfoModal(){var r,i,n;(r=this.infoModalMounted)==null||r.close(),this.infoModalMounted=null;const{openInfoModal:e}=await this.loadAppModalsModule();this.infoModalMounted=e({museumName:((i=this.currentMuseum)==null?void 0:i.name)||"-",sceneName:((n=this.currentScene)==null?void 0:n.name)||"-",onOpenBrand:()=>{this.openDingHuQingYuan()},onDockTabClose:()=>{this.infoModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"info"}}))}})}async toggleVrModeFromUI(e){if(!this.panoViewer)return!1;const r=await this.ensureVrModeInitialized();if(r.isVrModeEnabled())return r.disableVrMode(),this.syncVrModeUi(!1),await ut(),!1;{try{await kr(e)}catch(o){return X&&console.debug("[VRMode] fullscreen request failed",o),!1}const n=this.panoViewer.getCurrentView();return r.setInteractingCallback(()=>{var o;return((o=this.panoViewer)==null?void 0:o.isInteracting())??!1}),await r.enableVrMode((o,c)=>{if(this.panoViewer){const l=n.yaw+o,d=Math.max(-90,Math.min(90,n.pitch+c));this.panoViewer.setView(l,d)}})?(this.syncVrModeUi(!0),!0):(await ut(),!1)}}async openSettingsModal(){var r;(r=this.settingsModalMounted)==null||r.close(),this.settingsModalMounted=null;const{openSettingsModal:e}=await this.loadAppModalsModule();this.settingsModalMounted=e({currentScene:this.currentScene,panoViewer:this.panoViewer,bottomDock:this.bottomDock,onToggleVrMode:async i=>this.toggleVrModeFromUI(i),onDockTabClose:()=>{this.settingsModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"settings"}}))}})}}new nn;"serviceWorker"in navigator&&window.addEventListener("load",()=>{const t=new URL("./",window.location.href),e=new URL("sw.js",t);navigator.serviceWorker.register(e.toString(),{scope:t.pathname}).catch(()=>{})});export{B as A,h as E,T as L,ti as Z,_,xt as a,ut as b,kr as c,hn as d,cr as e,X as f,dn as g,cn as h,ne as i,Hr as j,mn as k,ye as l,ln as m,st as n,an as o,ke as p,Lr as q,Z as r,Lt as s,mt as t,un as u,nr as v,ht as w};
