const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./PanoViewer-DMWM3pPK.js","./three-renderer-sQHNT78z.js","./externalImage-C8_s6D1F.js","./TopRightControls-CXAyjiD6.js","./BrandMark-BZs1PMPs.js","./StructureView2D-CUVQwk5H.js","./autoLayout-ZgSeGcPI.js","./floorplanAdapter-BDPh-WSw.js","./renderFloorplanSvg-BfGGYliK.js","./dock-panels-DOH1UeeE.js","./MuseumList-CEnzFrZN.js","./SceneListPage-BOvt1l8s.js","./sceneGraph-BFajjk2P.js","./vrMode-D2Z9XT-U.js","./three.module-Brkpord5.js","./appModals-DdhulQgf.js","./Modal-Cmv3TBkb.js","./copyText-CwU0x1sN.js","./scene-runtime-C_JearJb.js","./warmupScheduler-CUDvVJ93.js","./ConfigErrorPanel-DLx6BPVf.js","./errorMessages-DL6164_V.js","./editor-debug-BEvkMzv3.js","./draftStorage-Be1LM_rK.js"])))=>i.map(i=>d[i]);
var Ht=Object.defineProperty;var $t=(t,e,r)=>e in t?Ht(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var a=(t,e,r)=>$t(t,typeof e!="symbol"?e+"":e,r);import{V as Yt,W as Wt,S as zt,O as Xt,a as qt,P as jt,M as Qt,T as Zt,b as Kt,C as Qe,L as Ze}from"./three-renderer-sQHNT78z.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();const Jt="modulepreload",er=function(t,e){return new URL(t,e).href},Ke={},T=function(e,r,i){let n=Promise.resolve();if(r&&r.length>0){const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=Promise.allSettled(r.map(d=>{if(d=er(d,i),d in Ke)return;Ke[d]=!0;const u=d.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(!!i)for(let A=o.length-1;A>=0;A--){const R=o[A];if(R.href===d&&(!u||R.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${p}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":Jt,u||(g.as="script"),g.crossOrigin="",g.href=d,l&&g.setAttribute("nonce",l),document.head.appendChild(g),u)return new Promise((A,R)=>{g.addEventListener("load",A),g.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return n.then(o=>{for(const c of o||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})},h={INVALID_ROOT:"INVALID_ROOT",MISSING_APP_NAME:"MISSING_APP_NAME",MISSING_LANDING:"MISSING_LANDING",MISSING_LANDING_BRAND_TITLE:"MISSING_LANDING_BRAND_TITLE",MISSING_LANDING_HERO_TITLE:"MISSING_LANDING_HERO_TITLE",MISSING_LANDING_HERO_SUBTITLE:"MISSING_LANDING_HERO_SUBTITLE",MUSEUMS_NOT_ARRAY:"MUSEUMS_NOT_ARRAY",MUSEUMS_EMPTY:"MUSEUMS_EMPTY",MISSING_MUSEUM_ID:"MISSING_MUSEUM_ID",DUPLICATE_MUSEUM_ID:"DUPLICATE_MUSEUM_ID",MISSING_MUSEUM_NAME:"MISSING_MUSEUM_NAME",MISSING_MUSEUM_COVER:"MISSING_MUSEUM_COVER",INVALID_MUSEUM_MARKETING:"INVALID_MUSEUM_MARKETING",MISSING_MUSEUM_MARKETING_HOOK:"MISSING_MUSEUM_MARKETING_HOOK",INVALID_MUSEUM_MARKETING_TAGS:"INVALID_MUSEUM_MARKETING_TAGS",MISSING_MUSEUM_MAP:"MISSING_MUSEUM_MAP",MISSING_MAP_IMAGE:"MISSING_MAP_IMAGE",INVALID_MAP_WIDTH:"INVALID_MAP_WIDTH",INVALID_MAP_HEIGHT:"INVALID_MAP_HEIGHT",INVALID_MAP_NODES:"INVALID_MAP_NODES",DUPLICATE_FLOORPLAN_NODE_ID:"DUPLICATE_FLOORPLAN_NODE_ID",INVALID_FLOORPLAN_NODE:"INVALID_FLOORPLAN_NODE",INVALID_MAP_PATHS:"INVALID_MAP_PATHS",INVALID_FLOORPLAN_PATH:"INVALID_FLOORPLAN_PATH",SCENES_NOT_ARRAY:"SCENES_NOT_ARRAY",SCENES_EMPTY:"SCENES_EMPTY",MISSING_SCENE_ID:"MISSING_SCENE_ID",DUPLICATE_SCENE_ID:"DUPLICATE_SCENE_ID",MISSING_SCENE_NAME:"MISSING_SCENE_NAME",MISSING_PANO:"MISSING_PANO",INVALID_PANO_URL:"INVALID_PANO_URL",INVALID_PANOLOW_URL:"INVALID_PANOLOW_URL",MISSING_THUMB:"MISSING_THUMB",MISSING_INITIAL_VIEW:"MISSING_INITIAL_VIEW",INVALID_YAW:"INVALID_YAW",INVALID_PITCH:"INVALID_PITCH",INVALID_FOV:"INVALID_FOV",MISSING_MAP_POINT:"MISSING_MAP_POINT",INVALID_MAP_POINT_X:"INVALID_MAP_POINT_X",INVALID_MAP_POINT_Y:"INVALID_MAP_POINT_Y",HOTSPOTS_NOT_ARRAY:"HOTSPOTS_NOT_ARRAY",MISSING_HOTSPOT_ID:"MISSING_HOTSPOT_ID",DUPLICATE_HOTSPOT_ID:"DUPLICATE_HOTSPOT_ID",INVALID_HOTSPOT_TYPE:"INVALID_HOTSPOT_TYPE",MISSING_HOTSPOT_LABEL:"MISSING_HOTSPOT_LABEL",INVALID_HOTSPOT_YAW:"INVALID_HOTSPOT_YAW",INVALID_HOTSPOT_PITCH:"INVALID_HOTSPOT_PITCH",MISSING_HOTSPOT_TARGET:"MISSING_HOTSPOT_TARGET",MISSING_TARGET_MUSEUM_ID:"MISSING_TARGET_MUSEUM_ID",MISSING_TARGET_SCENE_ID:"MISSING_TARGET_SCENE_ID",INVALID_TARGET_YAW:"INVALID_TARGET_YAW",INVALID_TARGET_PITCH:"INVALID_TARGET_PITCH",INVALID_TARGET_FOV:"INVALID_TARGET_FOV",MISSING_TARGET_URL:"MISSING_TARGET_URL"};function tr(t){const e=[];if(!t||typeof t!="object")return e.push({code:h.INVALID_ROOT,path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!t.appName||typeof t.appName!="string"||t.appName.trim()==="")&&e.push({code:h.MISSING_APP_NAME,path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!t.landing||typeof t.landing!="object"?e.push({code:h.MISSING_LANDING,path:"landing",message:"landing 必须是对象",fieldName:"首页入口文案"}):((typeof t.landing.brandTitle!="string"||t.landing.brandTitle.trim()==="")&&e.push({code:h.MISSING_LANDING_BRAND_TITLE,path:"landing.brandTitle",message:"landing.brandTitle 必须是非空字符串",fieldName:"首页品牌标题"}),(typeof t.landing.heroTitle!="string"||t.landing.heroTitle.trim()==="")&&e.push({code:h.MISSING_LANDING_HERO_TITLE,path:"landing.heroTitle",message:"landing.heroTitle 必须是非空字符串",fieldName:"首页主标题"}),(typeof t.landing.heroSubtitle!="string"||t.landing.heroSubtitle.trim()==="")&&e.push({code:h.MISSING_LANDING_HERO_SUBTITLE,path:"landing.heroSubtitle",message:"landing.heroSubtitle 必须是非空字符串",fieldName:"首页副标题"})),!Array.isArray(t.museums))return e.push({code:h.MUSEUMS_NOT_ARRAY,path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;t.museums.length===0&&e.push({code:h.MUSEUMS_EMPTY,path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const r=new Set;return t.museums.forEach((i,n)=>{const s=`museums[${n}]`,o=i.name&&typeof i.name=="string"?i.name:void 0;if(!i.id||typeof i.id!="string"||i.id.trim()===""?e.push({code:h.MISSING_MUSEUM_ID,path:`${s}.id`,message:"id 必须是非空字符串",museumName:o,fieldName:"博物馆 ID"}):(r.has(i.id)&&e.push({code:h.DUPLICATE_MUSEUM_ID,path:`${s}.id`,message:`博物馆 ID "${i.id}" 重复`,museumName:o,fieldName:"博物馆 ID"}),r.add(i.id)),(!i.name||typeof i.name!="string"||i.name.trim()==="")&&e.push({code:h.MISSING_MUSEUM_NAME,path:`${s}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),!i.marketing||typeof i.marketing!="object"?e.push({code:h.INVALID_MUSEUM_MARKETING,path:`${s}.marketing`,message:"marketing 必须是对象",museumName:o,fieldName:"首页运营文案"}):((typeof i.marketing.hook!="string"||i.marketing.hook.trim()==="")&&e.push({code:h.MISSING_MUSEUM_MARKETING_HOOK,path:`${s}.marketing.hook`,message:"marketing.hook 必须是非空字符串",museumName:o,fieldName:"首页钩子文案"}),(!Array.isArray(i.marketing.tags)||i.marketing.tags.length===0||i.marketing.tags.some(c=>typeof c!="string"||c.trim()===""))&&e.push({code:h.INVALID_MUSEUM_MARKETING_TAGS,path:`${s}.marketing.tags`,message:"marketing.tags 必须是仅包含非空字符串的数组",museumName:o,fieldName:"首页标签"})),(!i.cover||typeof i.cover!="string"||i.cover.trim()==="")&&e.push({code:h.MISSING_MUSEUM_COVER,path:`${s}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:o,fieldName:"封面图"}),!i.map||typeof i.map!="object")e.push({code:h.MISSING_MUSEUM_MAP,path:`${s}.map`,message:"map 必须是对象",museumName:o,fieldName:"地图配置"});else{i.map.image!==void 0&&(typeof i.map.image!="string"||i.map.image.trim()==="")&&e.push({code:h.MISSING_MAP_IMAGE,path:`${s}.map.image`,message:"map.image 如提供，必须是非空字符串",museumName:o,fieldName:"地图图片"}),(typeof i.map.width!="number"||i.map.width<=0)&&e.push({code:h.INVALID_MAP_WIDTH,path:`${s}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:o,fieldName:"地图宽度"}),(typeof i.map.height!="number"||i.map.height<=0)&&e.push({code:h.INVALID_MAP_HEIGHT,path:`${s}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:o,fieldName:"地图高度"}),i.map.nodes!==void 0&&!Array.isArray(i.map.nodes)&&e.push({code:h.INVALID_MAP_NODES,path:`${s}.map.nodes`,message:"map.nodes 如提供，必须是数组",museumName:o,fieldName:"平面图节点"});const c=new Set;Array.isArray(i.map.nodes)&&i.map.nodes.forEach((l,d)=>{const u=`${s}.map.nodes[${d}]`;if(!l||typeof l!="object"){e.push({code:h.INVALID_FLOORPLAN_NODE,path:u,message:"floorplan node 必须是对象",museumName:o,fieldName:"平面图节点"});return}!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.id`,message:"floorplan node.id 必须是非空字符串",museumName:o,fieldName:"平面图节点 ID"}):c.has(l.id)?e.push({code:h.DUPLICATE_FLOORPLAN_NODE_ID,path:`${u}.id`,message:`floorplan node.id "${l.id}" 重复`,museumName:o,fieldName:"平面图节点 ID"}):c.add(l.id),(typeof l.x!="number"||typeof l.y!="number")&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:u,message:"floorplan node.x / node.y 必须是数字",museumName:o,fieldName:"平面图节点坐标"}),(typeof l.label!="string"||l.label.trim()==="")&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.label`,message:"floorplan node.label 必须是非空字符串",museumName:o,fieldName:"平面图节点名称"}),l.kind!=="scene"&&l.kind!=="waypoint"&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.kind`,message:"floorplan node.kind 只能是 scene 或 waypoint",museumName:o,fieldName:"平面图节点类型"}),l.status!=="ready"&&l.status!=="disabled"&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.status`,message:"floorplan node.status 只能是 ready 或 disabled",museumName:o,fieldName:"平面图节点状态"}),l.sceneId!==void 0&&(typeof l.sceneId!="string"||l.sceneId.trim()==="")&&e.push({code:h.INVALID_FLOORPLAN_NODE,path:`${u}.sceneId`,message:"floorplan node.sceneId 如提供，必须是非空字符串",museumName:o,fieldName:"平面图节点 sceneId"})}),i.map.paths!==void 0&&!Array.isArray(i.map.paths)&&e.push({code:h.INVALID_MAP_PATHS,path:`${s}.map.paths`,message:"map.paths 如提供，必须是数组",museumName:o,fieldName:"平面图路径"}),Array.isArray(i.map.paths)&&i.map.paths.forEach((l,d)=>{const u=`${s}.map.paths[${d}]`;if(!l||typeof l!="object"){e.push({code:h.INVALID_FLOORPLAN_PATH,path:u,message:"floorplan path 必须是对象",museumName:o,fieldName:"平面图路径"});return}if((!l.id||typeof l.id!="string"||l.id.trim()==="")&&e.push({code:h.INVALID_FLOORPLAN_PATH,path:`${u}.id`,message:"floorplan path.id 必须是非空字符串",museumName:o,fieldName:"平面图路径 ID"}),!Array.isArray(l.points)||l.points.length<2){e.push({code:h.INVALID_FLOORPLAN_PATH,path:`${u}.points`,message:"floorplan path.points 必须是至少包含 2 个节点 ID 的数组",museumName:o,fieldName:"平面图路径点位"});return}l.points.forEach((p,S)=>{(typeof p!="string"||p.trim()===""||!c.has(p))&&e.push({code:h.INVALID_FLOORPLAN_PATH,path:`${u}.points[${S}]`,message:"floorplan path.points 里的节点 ID 必须存在于 map.nodes",museumName:o,fieldName:"平面图路径点位"})})})}if(!Array.isArray(i.scenes))e.push({code:h.SCENES_NOT_ARRAY,path:`${s}.scenes`,message:"scenes 必须是数组",museumName:o,fieldName:"场景列表"});else{i.scenes.length===0&&e.push({code:h.SCENES_EMPTY,path:`${s}.scenes`,message:"scenes 数组不能为空",museumName:o,fieldName:"场景列表"});const c=new Set;i.scenes.forEach((l,d)=>{var R;const u=`${s}.scenes[${d}]`,p=l.name&&typeof l.name=="string"?l.name:void 0;!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:h.MISSING_SCENE_ID,path:`${u}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:p,fieldName:"场景 ID"}):(c.has(l.id)&&e.push({code:h.DUPLICATE_SCENE_ID,path:`${u}.id`,message:`场景 ID "${l.id}" 在博物馆内重复`,museumName:o,sceneName:p,fieldName:"场景 ID"}),c.add(l.id)),(!l.name||typeof l.name!="string"||l.name.trim()==="")&&e.push({code:h.MISSING_SCENE_NAME,path:`${u}.name`,message:"name 必须是非空字符串",museumName:o,sceneName:void 0,fieldName:"场景名称"});const S=!!l.pano,g=!!l.panoLow,A=!!((R=l.panoTiles)!=null&&R.manifest);if(!S&&!g&&!A?e.push({code:h.MISSING_PANO,path:`${u}.pano`,message:"pano / panoLow / panoTiles 至少需要提供一个",museumName:o,sceneName:p,fieldName:"全景图"}):(l.pano&&(typeof l.pano!="string"||l.pano.trim()==="")&&e.push({code:h.INVALID_PANO_URL,path:`${u}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:o,sceneName:p,fieldName:"高清全景图"}),l.panoLow&&(typeof l.panoLow!="string"||l.panoLow.trim()==="")&&e.push({code:h.INVALID_PANOLOW_URL,path:`${u}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:o,sceneName:p,fieldName:"低清全景图"}),l.panoTiles&&(typeof l.panoTiles!="object"?e.push({code:h.INVALID_PANO_URL,path:`${u}.panoTiles`,message:"panoTiles 必须是对象，包含 manifest",museumName:o,sceneName:p,fieldName:"瓦片元数据"}):(!l.panoTiles.manifest||typeof l.panoTiles.manifest!="string"||l.panoTiles.manifest.trim()==="")&&e.push({code:h.INVALID_PANO_URL,path:`${u}.panoTiles.manifest`,message:"panoTiles.manifest 必须是有效的字符串",museumName:o,sceneName:p,fieldName:"瓦片 manifest"}))),(!l.thumb||typeof l.thumb!="string"||l.thumb.trim()==="")&&e.push({code:h.MISSING_THUMB,path:`${u}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:o,sceneName:p,fieldName:"缩略图"}),!l.initialView||typeof l.initialView!="object"?e.push({code:h.MISSING_INITIAL_VIEW,path:`${u}.initialView`,message:"initialView 必须是对象",museumName:o,sceneName:p,fieldName:"初始视角"}):(typeof l.initialView.yaw!="number"&&e.push({code:h.INVALID_YAW,path:`${u}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:o,sceneName:p,fieldName:"水平角度"}),typeof l.initialView.pitch!="number"&&e.push({code:h.INVALID_PITCH,path:`${u}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:o,sceneName:p,fieldName:"垂直角度"}),l.initialView.fov!==void 0&&typeof l.initialView.fov!="number"&&e.push({code:h.INVALID_FOV,path:`${u}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:o,sceneName:p,fieldName:"视野角度"})),!l.mapPoint||typeof l.mapPoint!="object"?e.push({code:h.MISSING_MAP_POINT,path:`${u}.mapPoint`,message:"mapPoint 必须是对象",museumName:o,sceneName:p,fieldName:"地图点位"}):(typeof l.mapPoint.x!="number"&&e.push({code:h.INVALID_MAP_POINT_X,path:`${u}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:o,sceneName:p,fieldName:"地图点位 X 坐标"}),typeof l.mapPoint.y!="number"&&e.push({code:h.INVALID_MAP_POINT_Y,path:`${u}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:o,sceneName:p,fieldName:"地图点位 Y 坐标"})),!Array.isArray(l.hotspots))e.push({code:h.HOTSPOTS_NOT_ARRAY,path:`${u}.hotspots`,message:"hotspots 必须是数组",museumName:o,sceneName:p,fieldName:"热点列表"});else{const b=new Set;l.hotspots.forEach((f,re)=>{const v=`${u}.hotspots[${re}]`;!f.id||typeof f.id!="string"||f.id.trim()===""?e.push({code:h.MISSING_HOTSPOT_ID,path:`${v}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:p,fieldName:"热点 ID"}):(b.has(f.id)&&e.push({code:h.DUPLICATE_HOTSPOT_ID,path:`${v}.id`,message:`热点 ID "${f.id}" 在场景内重复`,museumName:o,sceneName:p,fieldName:"热点 ID"}),b.add(f.id)),f.type!=="scene"&&f.type!=="video"&&f.type!=="image"&&f.type!=="info"&&e.push({code:h.INVALID_HOTSPOT_TYPE,path:`${v}.type`,message:'type 必须是 "scene"、"video"、"image" 或 "info"',museumName:o,sceneName:p,fieldName:"热点类型"}),(!f.label||typeof f.label!="string"||f.label.trim()==="")&&e.push({code:h.MISSING_HOTSPOT_LABEL,path:`${v}.label`,message:"label 必须是非空字符串",museumName:o,sceneName:p,fieldName:"热点标签"}),typeof f.yaw!="number"&&e.push({code:h.INVALID_HOTSPOT_YAW,path:`${v}.yaw`,message:"yaw 必须是数字",museumName:o,sceneName:p,fieldName:"热点水平角度"}),typeof f.pitch!="number"&&e.push({code:h.INVALID_HOTSPOT_PITCH,path:`${v}.pitch`,message:"pitch 必须是数字",museumName:o,sceneName:p,fieldName:"热点垂直角度"}),f.type==="scene"?!f.target||typeof f.target!="object"?e.push({code:h.MISSING_HOTSPOT_TARGET,path:`${v}.target`,message:"scene 类型热点必须提供 target 对象",museumName:o,sceneName:p,fieldName:"热点目标配置"}):((!f.target.museumId||typeof f.target.museumId!="string")&&e.push({code:h.MISSING_TARGET_MUSEUM_ID,path:`${v}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:o,sceneName:p,fieldName:"目标博物馆 ID"}),typeof f.target.sceneId!="string"&&e.push({code:h.MISSING_TARGET_SCENE_ID,path:`${v}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）",museumName:o,sceneName:p,fieldName:"目标场景 ID"}),f.target.yaw!==void 0&&typeof f.target.yaw!="number"&&e.push({code:h.INVALID_TARGET_YAW,path:`${v}.target.yaw`,message:"target.yaw 必须是数字",museumName:o,sceneName:p,fieldName:"目标水平角度"}),f.target.pitch!==void 0&&typeof f.target.pitch!="number"&&e.push({code:h.INVALID_TARGET_PITCH,path:`${v}.target.pitch`,message:"target.pitch 必须是数字",museumName:o,sceneName:p,fieldName:"目标垂直角度"}),f.target.fov!==void 0&&typeof f.target.fov!="number"&&e.push({code:h.INVALID_TARGET_FOV,path:`${v}.target.fov`,message:"target.fov 必须是数字",museumName:o,sceneName:p,fieldName:"目标视野角度"})):f.type==="video"&&f.target&&typeof f.target!="object"&&e.push({code:h.MISSING_HOTSPOT_TARGET,path:`${v}.target`,message:"video 类型热点的 target 必须是对象（如果提供）",museumName:o,sceneName:p,fieldName:"热点目标配置"})})}})}}),e}let Q=null;async function Je(){if(Q)return Q;try{const t=await fetch("./config.json",{cache:"no-store"});if(!t.ok)throw new Error(`加载配置失败: ${t.status}`);const e=await t.json(),r=tr(e);if(r.length>0){const i=new Error("配置校验失败");throw i.validationErrors=r,i}return Q=e,Q}catch(t){throw console.error("加载配置失败:",t),t}}function et(){Q=null}function St(t){if(Q)return Q.museums.find(e=>e.id===t)}function rr(t,e){const r=St(t);if(r)return r.scenes.find(i=>i.id===e)}function Fe(t){const e=new URL(window.location.href),r=new URLSearchParams(e.search);return Object.entries(t).forEach(([i,n])=>{if(n==null||n===""){r.delete(i);return}r.set(i,String(n))}),e.search=r.toString(),e.pathname+e.search+e.hash}function ir(){return window.location.pathname}function nr(){if(window.location.pathname.includes("//")){const t=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",t+window.location.search+window.location.hash)}}let tt=null,rt=0;const or=200;function sr(t){if(t.type==="focus"){const e=`${t.museumId}:${t.sceneId}`,r=Date.now();if(e===tt&&r-rt<or)return;tt=e,rt=r}window.dispatchEvent(new CustomEvent("vr:scene-focus",{detail:t}))}function Ji(t){const e=r=>{t(r.detail)};return window.addEventListener("vr:scene-focus",e),()=>{window.removeEventListener("vr:scene-focus",e)}}function Be(t,e){if(e==="replace"){window.history.replaceState({},"",t);return}window.history.pushState({},"",t)}function _e(){const t=new URLSearchParams(window.location.search),e=t.get("yaw"),r=t.get("pitch"),i=t.get("fov");return{museumId:t.get("museum")||void 0,sceneId:t.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:r?parseFloat(r):void 0,fov:i?parseFloat(i):void 0}}function ar(){return new URLSearchParams(window.location.search).get("debug")==="1"}function lr(){const t=new URLSearchParams(window.location.search);return t.get("editor")==="1"||t.get("debug")==="1"}function it(){const t=ir();window.history.pushState({},"",t),window.dispatchEvent(new Event("popstate"))}function en(t){const e=Fe({museum:t,scene:null,yaw:null,pitch:null,fov:null});Be(e,"push"),window.dispatchEvent(new Event("popstate"))}function nt(t,e,r,i){const n=Fe({museum:t,scene:e,yaw:r==null?void 0:r.yaw,pitch:r==null?void 0:r.pitch,fov:r==null?void 0:r.fov});Be(n,(i==null?void 0:i.history)??"push"),(i==null?void 0:i.emitFocus)!==!1&&sr({type:"focus",museumId:t,sceneId:e,source:(i==null?void 0:i.focusSource)??"dock",ts:Date.now()}),window.dispatchEvent(new Event("popstate"))}function cr(t,e,r){const i=Fe({museum:t,scene:e,yaw:r==null?void 0:r.yaw,pitch:r==null?void 0:r.pitch,fov:r==null?void 0:r.fov});Be(i,"replace")}function xe(){const t=document;return!!(document.fullscreenElement||t.webkitFullscreenElement)}function ur(){const t=()=>{};document.addEventListener("fullscreenchange",t),document.addEventListener("webkitfullscreenchange",t)}class dr{constructor(){a(this,"element");a(this,"contentMounted",!1);this.element=document.createElement("div"),this.element.className="loading-overlay",this.applyStyles();const e=()=>{xe()&&this.hide()};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}render(){this.contentMounted||(this.element.innerHTML=`
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
    `,document.head.appendChild(e)}show(){xe()||(this.render(),this.element.classList.add("show"))}hide(){this.element.classList.remove("show"),this.clearContent()}getElement(){return this.element}remove(){this.element.remove()}}var E=(t=>(t.LOADING_LOW="loadingLow",t.LOW_READY="lowReady",t.LOADING_HIGH="loadingHigh",t.HIGH_READY="highReady",t.DEGRADED="degraded",t.ERROR="error",t))(E||{});async function hr(t,e){for(const r of t)if(await e(r))return r;return null}var V=(t=>(t.THUMB="thumb",t.PANO_LOW="panoLow",t.PANO="pano",t.VIDEO="video",t.COVER="cover",t.MAP="map",t.DOLLHOUSE="dollhouse",t))(V||{});const mr=["/assets/panos/"],pr=[],gr="/config.json",vr=1e3,le="vrplayer.assetCdn.lastSuccess",fr=24*60*60*1e3;let ee=null,Z=null,$="idle",j=0;function wr(t){const e=t.trim();return e?e.startsWith("/")?e:`/${e}`:""}function ot(t,e){const r=Array.isArray(t)&&t.length>0?t:e,i=new Set;for(const n of r){if(typeof n!="string")continue;const s=wr(n);s&&i.add(s)}return Array.from(i)}function yt(t){return t.replace(/\/+$/,"")}function Sr(t){const e=[];Array.isArray(t.baseUrls)&&e.push(...t.baseUrls),typeof t.baseUrl=="string"&&e.push(t.baseUrl);const r=new Set;for(const i of e){if(typeof i!="string")continue;const n=yt(i.trim());n&&r.add(n)}return Array.from(r)}function yr(){var t;return typeof window<"u"&&((t=window.location)!=null&&t.origin)?window.location.origin:typeof location<"u"&&location.origin?location.origin:null}function Mt(){var e;const t=[typeof document<"u"?document.baseURI:null,typeof window<"u"?(e=window.location)==null?void 0:e.href:null,typeof location<"u"?location.href:null];for(const r of t)if(r)try{return new URL("./",r).toString()}catch{}return null}function Mr(){const t=Mt();if(!t)return"";try{const e=new URL(t).pathname||"";return e.endsWith("/")?e.slice(0,-1):e}catch{return""}}function It(t){const e=Mr();return!e||e==="/"?t:t===e?"/":t.startsWith(`${e}/`)?t.slice(e.length)||"/":t}function Ir(t){if(!t.startsWith("/")||t.startsWith("//"))return t;const e=Mt();if(!e)return t;try{return new URL(t.slice(1),e).toString()}catch{return t}}function Ge(){if(typeof window>"u")return null;try{return window.localStorage}catch{return null}}function Er(t){const e=Ge();if(!e)return null;try{const r=e.getItem(le);if(!r)return null;const i=JSON.parse(r),n=typeof i.baseUrl=="string"?yt(i.baseUrl.trim()):"",s=typeof i.expiresAt=="number"&&Number.isFinite(i.expiresAt)?i.expiresAt:0;return!n||s<=Date.now()||!t.baseUrls.includes(n)?(e.removeItem(le),null):n}catch{return e.removeItem(le),null}}function Pr(t,e){const r=Ge();if(!r||!e.baseUrls.includes(t))return;const i=Date.now(),n={baseUrl:t,updatedAt:i,expiresAt:i+fr};try{r.setItem(le,JSON.stringify(n))}catch{}}function st(){const t=Ge();if(t)try{t.removeItem(le)}catch{}}function Et(t){const e=t.match(/^([^?#]*)([?#].*)?$/);return e?{path:e[1]||"",suffix:e[2]||""}:{path:t,suffix:""}}function at(t,e){return e.some(r=>t.startsWith(r))}function Pt(t,e){return!(!at(t,e.includePrefixes)||at(t,e.excludePrefixes))}function Tt(t,e){const{path:r,suffix:i}=Et(t);return`${e}${r}${i}`}function Tr(t,e,r){if(!/^https?:\/\//i.test(t))return null;try{const i=new URL(t),n=yr();if(!n||i.origin!==n)return null;const s=It(i.pathname);return Pt(s,e)?Tt(`${s}${i.search}${i.hash}`,r):null}catch{return null}}function br(t){if(typeof t!="string"||t.trim()==="")return gr;const e=t.trim();return e.startsWith("/")?e:`/${e}`}function _r(t,e){const r=e.includes("?")?"&":"?";return`${t}${e}${r}__cdn_probe=${Date.now()}`}async function Dr(t,e,r){if(r!==j||typeof window>"u"||typeof fetch!="function")return!1;const i=typeof AbortController<"u"?new AbortController:null,n=window.setTimeout(()=>i==null?void 0:i.abort(),e.probeTimeoutMs);try{return(await fetch(_r(t,e.probePath),{method:"GET",mode:"cors",cache:"no-store",referrerPolicy:"no-referrer",signal:i==null?void 0:i.signal})).ok}catch{return!1}finally{window.clearTimeout(n)}}function bt(t=!1){const e=ee;if(!e||!e.enabled||!t&&Z||$==="probing")return;if(typeof window>"u"||typeof fetch!="function"){$="failed";return}$="probing";const r=++j;(async()=>{const i=await hr(e.baseUrls,n=>Dr(n,e,r));if(r===j){if(i){Z=i,Pr(i,e),$="ok";return}r===j&&(Z=null,st(),$="failed")}})().catch(()=>{r===j&&(Z=null,st(),$="failed")}).finally(()=>{})}function De(t){if(j+=1,Z=null,$="idle",!t||t.enabled===!1){ee=null;return}const e=Sr(t);if(e.length===0){ee=null;return}ee={enabled:!0,baseUrls:e,includePrefixes:ot(t.includePrefixes,mr),excludePrefixes:ot(t.excludePrefixes,pr),probePath:br(t.probePath),probeTimeoutMs:typeof t.probeTimeoutMs=="number"&&Number.isFinite(t.probeTimeoutMs)?Math.max(200,Math.floor(t.probeTimeoutMs)):vr};const r=Er(ee);if(r){Z=r,$="ok";return}bt(!1)}function q(t,e){if(!t||typeof t!="string"||t.trim()==="")return"";const r=t.trim();if(/^(?:data|blob):/i.test(r)||r.startsWith("//"))return r;const i=Ir(r),n=ee;if(!n||!n.enabled)return i;const s=Z;if(!s)return bt(),i;const o=Tr(r,n,s);if(o)return o;const{path:c}=Et(r),l=It(c);return!l.startsWith("/")||!Pt(l,n)?i:Tt(r===c?l:`${l}${r.slice(c.length)}`,s)}let G=null;function _t(){return G!==null?G:typeof navigator<"u"&&navigator.maxTouchPoints>0||typeof window<"u"&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)?(G="touch",G):(G="mouse",G)}function tn(){return _t()==="touch"}function Ar(){return _t()==="mouse"}let K=null;function Dt(t,e=1500){if(xe())return;const r=document.querySelector(".vr-toast"),i=r??document.createElement("div");i.className="vr-toast",i.textContent=t,r||document.body.appendChild(i),window.requestAnimationFrame(()=>i.classList.add("show")),K&&window.clearTimeout(K),K=window.setTimeout(()=>{i.classList.remove("show"),window.setTimeout(()=>i.remove(),220),K=null},e)}function Rr(){const t=document.querySelector(".vr-toast");t&&(t.classList.remove("show"),window.setTimeout(()=>t.remove(),220)),K&&(window.clearTimeout(K),K=null)}function Nr(){const t=document;return document.fullscreenElement||t.webkitFullscreenElement||null}function At(){return!!Nr()}async function Lr(t){const e=t;if(e.requestFullscreen){await e.requestFullscreen();return}if(e.webkitRequestFullscreen){await e.webkitRequestFullscreen();return}throw new Error("Fullscreen API not supported")}async function Cr(){const t=document;if(document.exitFullscreen){await document.exitFullscreen();return}if(t.webkitExitFullscreen){await t.webkitExitFullscreen();return}}async function xr(t){const e=t||document.body;!At()&&Ar()&&Dt("鼠标滑至最上方可退出全屏",700),await Lr(e)}async function lt(){try{await Cr(),Rt()}catch(t){console.debug("[fullscreen] exitFullscreenBestEffort failed:",t)}}function Rt(){var t,e;try{(e=(t=screen.orientation)==null?void 0:t.unlock)==null||e.call(t)}catch{}}class Or{constructor(e){a(this,"element");a(this,"isOpen",!1);a(this,"options");this.options=e;const r=document.createElement("div");r.className="vr-modal vr-modal--media vr-modal--image";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--media vr-modal-card--image",n.addEventListener("click",u=>u.stopPropagation());const s=document.createElement("div");s.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"图片预览";const c=document.createElement("button");c.className="vr-btn vr-modal-close-icon",c.setAttribute("aria-label","关闭"),c.textContent="×",c.addEventListener("click",()=>this.handleClose()),s.appendChild(o),s.appendChild(c);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--image";const d=document.createElement("img");d.className="vr-modal-image",e.src&&(d.src=e.src),d.alt=e.title||"热点图片",d.loading="lazy",l.appendChild(d),n.appendChild(s),n.appendChild(l),r.appendChild(i),r.appendChild(n),this.element=r}handleClose(){var e,r;this.close(),(r=(e=this.options).onClose)==null||r.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class Vr{constructor(e){a(this,"element");a(this,"isOpen",!1);a(this,"options");this.options=e;const r=document.createElement("div");r.className="vr-modal vr-modal--info";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--info",n.addEventListener("click",d=>d.stopPropagation());const s=document.createElement("div");s.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"详情";const c=document.createElement("button");c.className="vr-btn vr-modal-close-icon",c.setAttribute("aria-label","关闭"),c.textContent="×",c.addEventListener("click",()=>this.handleClose()),s.appendChild(o),s.appendChild(c);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--info",l.textContent=e.text||"未配置内容",n.appendChild(s),n.appendChild(l),r.appendChild(i),r.appendChild(n),this.element=r}handleClose(){var e,r;this.close(),(r=(e=this.options).onClose)==null||r.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class kr{constructor(e){a(this,"element");a(this,"isOpen",!1);a(this,"videoEl");a(this,"options");this.options=e;const r=document.createElement("div");r.className="vr-modal vr-modal--media vr-modal--video";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--media vr-modal-card--video",n.addEventListener("click",u=>u.stopPropagation());const s=document.createElement("div");s.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"视频";const c=document.createElement("button");c.className="vr-btn vr-modal-close-icon",c.setAttribute("aria-label","关闭"),c.textContent="×",c.addEventListener("click",()=>this.handleClose()),s.appendChild(o),s.appendChild(c);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--video";const d=document.createElement("video");d.className="vr-modal-video",e.src&&(d.src=e.src),e.poster&&(d.poster=e.poster),d.controls=!0,d.playsInline=!0,d.preload="metadata",this.videoEl=d,l.appendChild(d),n.appendChild(s),n.appendChild(l),r.appendChild(i),r.appendChild(n),this.element=r}handleClose(){var e,r;this.close(),(r=(e=this.options).onClose)==null||r.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){if(this.isOpen){this.isOpen=!1,this.element.classList.remove("open");try{this.videoEl.pause(),this.videoEl.currentTime=0,this.videoEl.removeAttribute("src"),this.videoEl.load()}catch{}}}getElement(){return this.element}destroy(){this.close(),this.element.remove()}}const Nt="vr:open-modal",Lt="vr:close-modal";function rn(t){window.dispatchEvent(new CustomEvent(Nt,{detail:t}))}function Ae(){window.dispatchEvent(new CustomEvent(Lt))}class Ur{constructor(e){a(this,"rootEl");a(this,"current",null);a(this,"handleKeyDownBound");this.rootEl=e,this.handleKeyDownBound=r=>this.handleKeyDown(r),window.addEventListener(Nt,r=>{const i=r;this.handleOpen(i.detail)}),window.addEventListener(Lt,()=>this.close()),window.addEventListener("keydown",this.handleKeyDownBound)}handleKeyDown(e){e.key==="Escape"&&this.close()}handleOpen(e){this.close();let r=null;e.type==="image"?r=new Or({src:e.payload.src,title:e.payload.title,onClose:()=>Ae()}):e.type==="info"?r=new Vr({title:e.payload.title,text:e.payload.text,onClose:()=>Ae()}):e.type==="video"&&(r=new kr({src:e.payload.src,poster:e.payload.poster,title:e.payload.title,onClose:()=>Ae()})),r&&(this.current=r,this.rootEl.innerHTML="",this.rootEl.appendChild(r.getElement()),r.open())}close(){this.current&&(this.current.close(),this.current.destroy(),this.current=null,this.rootEl.innerHTML="")}}let ct=null;function Fr(){if(ct)return;let t=document.getElementById("vr-modal-root");t||(t=document.createElement("div"),t.id="vr-modal-root",document.body.appendChild(t)),ct=new Ur(t)}function Br(t,e,r){const i=t.getBoundingClientRect(),n=e-i.left,s=r-i.top,o=document.createElement("div");o.className="vr-pick-marker",o.style.position="absolute",o.style.left="0",o.style.top="0",o.style.transform=`translate3d(${n}px, ${s}px, 0)`,o.style.pointerEvents="none",o.style.zIndex="1000",t.style.position="relative",t.appendChild(o),window.requestAnimationFrame(()=>{o.classList.add("show")}),window.setTimeout(()=>{o.classList.remove("show"),window.setTimeout(()=>{o.parentNode&&o.parentNode.removeChild(o)},200)},1500)}const Ct="vr_last_pick_v1";let He=null;function Gr(){try{const t=localStorage.getItem(Ct);if(t){const e=JSON.parse(t);typeof e.yaw=="number"&&typeof e.pitch=="number"&&typeof e.ts=="number"&&(He=e)}}catch{}}Gr();function Hr(t){He=t;try{localStorage.setItem(Ct,JSON.stringify(t))}catch{}}function nn(){return He}class $r{constructor(){a(this,"listeners",new Map);a(this,"lastInteractionTs",0);a(this,"idleDelay",800);a(this,"idleTimer",null);a(this,"rafId",null);a(this,"isScheduled",!1);this.listeners.set("user-interacting",new Set),this.listeners.set("user-idle",new Set),this.listeners.set("ui-engaged",new Set)}on(e,r){const i=this.listeners.get(e);return i?(i.add(r),()=>{i.delete(r)}):(console.warn(`[InteractionBus] 未知事件类型: ${e}`),()=>{})}off(e,r){const i=this.listeners.get(e);i&&i.delete(r)}emit(e){this.isScheduled||(this.isScheduled=!0,this.rafId=requestAnimationFrame(()=>{this.isScheduled=!1;const r=this.listeners.get(e);r&&r.forEach(i=>{try{i()}catch(n){console.error("[InteractionBus] 事件监听器执行失败:",n)}})}))}emitInteracting(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("user-interacting")}scheduleIdle(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.idleTimer=window.setTimeout(()=>{Date.now()-this.lastInteractionTs>=this.idleDelay&&(this.idleTimer=null,this.emit("user-idle"))},this.idleDelay)}emitUIEngaged(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("ui-engaged")}dispose(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.listeners.forEach(e=>e.clear()),this.listeners.clear()}}const J=new $r,Yr=Object.freeze(Object.defineProperty({__proto__:null,interactionBus:J},Symbol.toStringTag,{value:"Module"})),Wr=150,zr=150,Xr=400;function qr(){return{fadeMs:Wr,restoreMs:zr,restoreDelayMs:Xr}}function jr(){J.on("user-interacting",()=>{}),J.on("user-idle",()=>{}),J.on("ui-engaged",()=>{})}let x=null;function Qr(){const t=qr();J.on("user-interacting",()=>{x!==null&&(clearTimeout(x),x=null),document.documentElement.classList.add("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")}),J.on("user-idle",()=>{x!==null&&(clearTimeout(x),x=null),document.documentElement.classList.remove("vr-ui-interacting"),x=window.setTimeout(()=>{document.documentElement.classList.remove("vr-ui-restoring"),x=null},t.restoreDelayMs)}),J.on("ui-engaged",()=>{x!==null&&(clearTimeout(x),x=null),document.documentElement.classList.remove("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")})}const Y=typeof window<"u"?new URLSearchParams(window.location.search).get("debug")==="1":!1;function on(...t){Y&&console.debug("[VR Debug]",...t)}class Zr{constructor(e){a(this,"options");a(this,"structure3DLoadToken",0);a(this,"structureView2D",null);a(this,"structureView3D",null);a(this,"structureOverlayOpen",!1);this.options=e}isStructureOverlayOpen(){return this.structureOverlayOpen}clearOverlayState(){this.structure3DLoadToken+=1,this.structureOverlayOpen=!1,this.structureView2D&&(this.structureView2D.remove(),this.structureView2D=null),this.structureView3D&&(this.structureView3D.remove(),this.structureView3D=null),document.body.style.overflow="",document.body.style.touchAction="",document.body.style.overscrollBehavior=""}async openStructure2D(){const e=this.options.getCurrentMuseum(),r=this.options.getCurrentScene();if(!e||!r)return;this.structureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),this.structure3DLoadToken+=1;const i=this.structure3DLoadToken,[{buildSceneGraph:n},{StructureView2D:s}]=await Promise.all([this.options.loadSceneGraphModule(),this.options.loadStructureView2DModule()]);if(i!==this.structure3DLoadToken||this.options.getMode()!=="structure2d")return;const o=this.options.getCurrentMuseum(),c=this.options.getCurrentScene();if(!o||!c)return;const l=n(o,c.id);this.structureView2D?this.structureView2D.updateContext({museum:o,graph:l,currentSceneId:c.id}):(this.structureView2D=new s({museum:o,graph:l,currentSceneId:c.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(d,u)=>{this.closeStructureOverlay({toTour:!1}),this.options.navigateToScene(d,u)}}),this.options.appElement.appendChild(this.structureView2D.getElement())),this.structureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView2D.open()}async openStructure3D(){const e=this.options.getCurrentMuseum(),r=this.options.getCurrentScene();if(!e||!r)return;this.structureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),this.structure3DLoadToken+=1;const i=this.structure3DLoadToken,[{buildSceneGraph:n},{StructureView3D:s}]=await Promise.all([this.options.loadSceneGraphModule(),this.options.loadStructureView3DModule()]);if(i!==this.structure3DLoadToken||this.options.getMode()!=="structure3d")return;const o=this.options.getCurrentMuseum(),c=this.options.getCurrentScene();if(!o||!c)return;const l=n(o,c.id);this.structureView3D?this.structureView3D.updateContext({museum:o,graph:l,currentSceneId:c.id}):(this.structureView3D=new s({museum:o,graph:l,currentSceneId:c.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(d,u)=>{this.closeStructureOverlay({toTour:!1}),this.options.navigateToScene(d,u)}}),this.options.appElement.appendChild(this.structureView3D.getElement())),this.structureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView3D.open()}closeStructureOverlay(e){this.structureOverlayOpen&&(this.clearOverlayState(),e.toTour&&this.options.onSwitchToTour())}dispose(){this.clearOverlayState()}}const Kr={brand:{name:"VR 全景导览",copyright:"© 2026 VR 全景导览"},dock:{guide:"导览",community:"社区",info:"信息",settings:"更多"},modal:{infoTitle:"信息",settingsTitle:"更多",museumLabel:"展馆",sceneLabel:"场景",collectDateLabel:"采集日期",qualityLabel:"画质",qualityHigh:"高清",qualityLow:"省流",viewLabel:"视角",resetView:"恢复初始视角",vrLabel:"VR 眼镜",zoomLabel:"缩放",zoomIn:"放大",zoomOut:"缩小"}};function xt(t){var e;return!t||!Array.isArray(t.scenes)||t.scenes.length===0?null:((e=t.scenes[0])==null?void 0:e.id)??null}const pe={brandTitle:"鼎虎清源",heroTitle:"三馆全景导览",heroSubtitle:"用一座馆的门廊、一封遗墨、一道回廊，把历史从课本里请回眼前。",projectNote:"这是一个服务研学的公益全景项目。我们用实地采集与轻量交互，把纪念馆里的历史现场重新组织成可抵达、可观看、可讲述的沉浸入口。"},Jr={wangding:{hook:"一死醒天下：探寻晚清名臣尸谏救国的铮铮铁骨。",tags:["VR沉浸","24个历史场景","独家全景"]},yanghucheng:{hook:"民族危亡的抉择：重返风云激荡的西安事变发生地。",tags:["360°漫游","将领故居","历史现场"]},linzexu:{hook:"苟利国家生死以：穿梭百年，见证虎门销烟外的旷世长歌。",tags:["12个高清实拍","历史遗迹","人文研学"]}};function ge(t){const e=t==null?void 0:t.landing;return{brandTitle:typeof(e==null?void 0:e.brandTitle)=="string"&&e.brandTitle.trim()!==""?e.brandTitle:pe.brandTitle,heroTitle:typeof(e==null?void 0:e.heroTitle)=="string"&&e.heroTitle.trim()!==""?e.heroTitle:pe.heroTitle,heroSubtitle:typeof(e==null?void 0:e.heroSubtitle)=="string"&&e.heroSubtitle.trim()!==""?e.heroSubtitle:pe.heroSubtitle,projectNote:typeof(e==null?void 0:e.projectNote)=="string"&&e.projectNote.trim()!==""?e.projectNote:pe.projectNote}}function sn(t){var i,n,s;const e=Jr[t.id]??{hook:((i=t.description)==null?void 0:i.trim())||`${t.name} 沉浸式全景导览`,tags:["沉浸导览",`${t.scenes.length}个场景`]},r=Array.isArray((n=t.marketing)==null?void 0:n.tags)?t.marketing.tags.filter(o=>typeof o=="string"&&o.trim()!==""):[];return{hook:typeof((s=t.marketing)==null?void 0:s.hook)=="string"&&t.marketing.hook.trim()!==""?t.marketing.hook:e.hook,tags:r.length>0?r:e.tags}}function Ot(t){var r,i;const e=(r=t==null?void 0:t.panoTiles)==null?void 0:r.worldYawOffset;return typeof e=="number"&&Number.isFinite(e)?e:(i=t==null?void 0:t.panoTiles)!=null&&i.manifest?180:0}function ut(t,e){const r=-(e+Ot(t));return Object.is(r,-0)?0:r}function ei(t){const e=((t+180)%360+360)%360-180;return Object.is(e,-0)?0:e}function dt(t,e){return ei(-e-Ot(t))}function ti({museum:t,requestedSceneId:e,hasEnteredMuseum:r}){const i=xt(t),n=e??i;if(!n)throw new Error(`museum ${t.id} does not contain any scenes`);return r?{kind:"scene",museumId:t.id,targetSceneId:n}:{kind:"cover",museumId:t.id,targetSceneId:n,requestedSceneId:e??null}}function ri({currentMuseumId:t,hasViewerShell:e,nextMuseumId:r,requestedView:i}){return!(e&&t&&t===r)?{shellStrategy:"mount-shell",transitionDriver:"shell",viewStrategy:"reset-to-target"}:{shellStrategy:"reuse-shell",transitionDriver:"viewer",viewStrategy:oi(i)?"reset-to-target":"preserve-current"}}function ii({appName:t,brandTitle:e,museum:r,targetSceneId:i}){var n,s,o;return{appName:t,brandTitle:e,title:r.name,subtitle:((s=(n=r.marketing)==null?void 0:n.hook)==null?void 0:s.trim())||((o=r.description)==null?void 0:o.trim())||r.name,ctaLabel:"点击开启 VR 漫游",heroImage:r.cover,targetSceneId:i}}function ni({museum:t,targetSceneId:e}){const r=t.scenes.find(o=>o.id===e)??null,i=r?[r.id]:[],n=r?si(r):[],s=li([r==null?void 0:r.panoLow,...n.map(o=>{var c;return(c=t.scenes.find(l=>l.id===o))==null?void 0:c.thumb})]);return{primarySceneIds:i,neighborSceneIds:n,previewAssets:s}}function oi(t){return t?[t.yaw,t.pitch,t.fov].some(e=>typeof e=="number"&&Number.isFinite(e)):!1}function si(t){const e=t.hotspots.filter(ai).map(r=>{var i;return(i=r.target)==null?void 0:i.sceneId}).filter(r=>typeof r=="string"&&r.length>0);return Array.from(new Set(e))}function ai(t){var e;return t.type==="scene"&&!!((e=t.target)!=null&&e.sceneId)}function li(t){const e=new Set,r=[];for(const i of t)!i||e.has(i)||(e.add(i),r.push(i));return r}const ci=480,ui=620,Vt=760,di=.32,hi=18;function mi({currentWorldYaw:t,targetWorldYaw:e,hotspotScreenX:r,fromMapPoint:i,toMapPoint:n}){const s=fi(t,e),o=vi(s,r,i,n),c=Math.abs(s),l=gi(c),d=l>=Vt?140:120,u=Si(Math.min(hi,Math.max(0,c*di))),p=yi(wi(Math.max(0,c-12)/40,0,1));return{durationMs:l,settleMs:d,travelDirX:o,wipeFrom:o>0?"right":"left",turnLead:u,curveStrength:p}}function Re(){return{active:null,pending:null}}function ht(t,e){return t.active?{active:t.active,pending:e}:{active:e,pending:null}}function pi(t){return t.pending?{next:t.pending,state:{active:t.pending,pending:null}}:{next:null,state:{active:null,pending:null}}}function gi(t){return t<18?ci:t<72?ui:Vt}function vi(t,e,r,i){return Math.abs(t)>=8?t>=0?1:-1:typeof e=="number"&&Number.isFinite(e)?e<.5?-1:1:r&&i&&r.x!==i.x?i.x>=r.x?1:-1:t>=0?1:-1}function fi(t,e){let r=e-t;for(;r>180;)r-=360;for(;r<-180;)r+=360;return r}function wi(t,e,r){return Math.max(e,Math.min(r,t))}function Si(t){return Number(t.toFixed(1))}function yi(t){return Number(t.toFixed(2))}function mt(t){return t.prefer==="panoLow"?te(t.panoLowUrl,t.thumbUrl):te(t.thumbUrl,t.panoLowUrl)}function Mi(t){const e=te(t.sourcePreviewUrl),r=t.targetPreviewAlreadyReady?te(t.targetPreviewUrl):void 0;return t.coverWasVisible?{fromImage:te(r,e,t.previousScenePreviewImage,t.viewerSnapshot,t.coverHeroUrl),targetPreviewImage:r}:{fromImage:te(t.viewerSnapshot,e,t.previousScenePreviewImage,r,t.coverHeroUrl),targetPreviewImage:r}}function te(...t){for(const e of t)if(typeof e=="string"&&e.trim().length>0)return e}function pt(t,e){const r=t.sourceKind==="scene",i=r&&e&&!t.targetReady,n=r?t.stage==="turn-in"?t.targetReady?.1+t.stageProgress*.06:i?.22+t.stageProgress*.05:.08+t.stageProgress*.06:t.stage==="travel"?t.targetReady?Math.min(.26,.12+t.targetFocus*.06+t.revealProgress*.06):i?Math.min(.28,.22+t.targetFocus*.05+t.stageProgress*.03):Math.min(.18,.1+t.targetFocus*.04):Math.max(.06,.14-t.settleStrength*.08):1,s=t.targetReady&&e?r?Math.max(t.blurPx*.42,3.5):Math.max(t.blurPx*.7,6):Math.max(t.blurPx*(r?.7:1.35),r?8:24),o=t.fromOpacity*(r?t.targetReady?.24:.18:.74),c=r?t.stage==="settle"?1:.98:t.stage==="settle"?.9:.82,l=r?t.targetReady?34+t.fromEdgeMix*18:40+t.fromEdgeMix*16:24+t.fromEdgeMix*12,d=r?Math.max(t.blurPx*(t.targetReady?.24:.32),2.5):Math.max(t.blurPx*(.5-t.settleStrength*.18),3),u=e?t.targetReady?r?Math.min(Math.max(t.revealProgress*.14+t.targetMixProgress*.04+t.targetFocus*.02,t.stage==="settle"?.08:.02),.14):Math.min(Math.max(t.targetMixProgress*.64+t.targetFocus*.22,t.stage==="settle"?.68:.18),.96):r?Math.min(.03,.004+t.targetFocus*.03):Math.min(.16,.06+t.targetFocus*.22):0,p=e?t.targetReady?Math.max(t.revealProgress,t.targetMixProgress*(r?.22:.46)+t.targetFocus*(r?.04:.16)):Math.max(r?.04:.12,t.targetFocus*(r?.06:.28)):Math.max(0,t.revealProgress);return{stageOpacity:ve(n),fallbackBlur:se(s),fromBackdropOpacity:ve(o),backdropBrightness:ve(c),fromCenterCutInner:se(l),fromCenterCutOuter:se(Math.min(l+18,100)),targetBackdropBlur:se(d),targetBackdropOpacity:ve(u),targetRevealInset:se(Math.max(0,(1-p)*100))}}function se(t){return Math.round(t*100)/100}function ve(t){return Math.round(t*1e3)/1e3}const gt="vr-travel-transition-overlay-style",Ii=220,Ei=`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,Pi=`
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
`;function Ti(){if(document.getElementById(gt))return;const t=document.createElement("style");t.id=gt,t.textContent=`
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
  `,document.head.appendChild(t)}class bi{constructor(){a(this,"element");a(this,"fromBackdrop");a(this,"toBackdrop");a(this,"canvasHost");a(this,"corridorLayer");a(this,"sweepLayer");a(this,"directionalVeilLayer");a(this,"renderer",null);a(this,"scene",null);a(this,"camera",null);a(this,"material",null);a(this,"quad",null);a(this,"resolution",new Yt(1,1));a(this,"active",!1);a(this,"webglEnabled",!1);a(this,"targetImageLoaded",!1);a(this,"currentSize",{width:0,height:0});a(this,"clearTimer",null);a(this,"fromTexture",null);a(this,"toTexture",null);a(this,"fromLoadToken",0);a(this,"toLoadToken",0);a(this,"currentFromUrl");a(this,"currentToUrl");Ti(),this.element=document.createElement("div"),this.element.className="vr-travel-transition",this.element.dataset.wipeFrom="right",this.fromBackdrop=document.createElement("div"),this.fromBackdrop.className="vr-travel-transition__fallback vr-travel-transition__fallback--from",this.toBackdrop=document.createElement("div"),this.toBackdrop.className="vr-travel-transition__fallback vr-travel-transition__fallback--to",this.canvasHost=document.createElement("div"),this.canvasHost.className="vr-travel-transition__canvas",this.corridorLayer=document.createElement("div"),this.corridorLayer.className="vr-travel-transition__corridor",this.sweepLayer=document.createElement("div"),this.sweepLayer.className="vr-travel-transition__sweep",this.directionalVeilLayer=document.createElement("div"),this.directionalVeilLayer.className="vr-travel-transition__directional-veil",this.element.append(this.fromBackdrop,this.toBackdrop,this.canvasHost,this.directionalVeilLayer,this.corridorLayer,this.sweepLayer),this.initWebgl()}getElement(){return this.element}start(e){this.clearTimer!==null&&(window.clearTimeout(this.clearTimer),this.clearTimer=null),this.active=!0,this.targetImageLoaded=!1,this.currentFromUrl=e.fromImage,this.currentToUrl=e.targetImage,this.canvasHost.style.opacity="0",this.element.style.transition="none",this.element.style.opacity="1",this.element.style.visibility="visible",this.element.style.pointerEvents="none",this.element.style.setProperty("--vr-travel-backdrop-blur",e.targetImage?"12px":"22px"),this.element.style.setProperty("--vr-travel-target-backdrop-blur",e.targetImage?"8px":"0px"),this.element.style.setProperty("--vr-travel-from-backdrop-opacity",e.targetImage?"0.14":"0.46"),this.element.style.setProperty("--vr-travel-target-backdrop-opacity",e.targetImage?"0.28":"0"),this.element.style.setProperty("--vr-travel-target-reveal-inset",e.targetImage?"62%":"100%"),this.element.style.setProperty("--vr-travel-from-cut-inner",e.targetImage?"56%":"30%"),this.element.style.setProperty("--vr-travel-from-cut-outer",e.targetImage?"78%":"48%"),this.element.style.setProperty("--vr-travel-backdrop-brightness",e.targetImage?"0.82":"0.9"),this.element.style.setProperty("--vr-travel-sweep-offset",e.targetImage?"16%":"0%"),this.element.style.setProperty("--vr-travel-sweep-rotate",e.targetImage?"7deg":"0deg"),this.element.style.setProperty("--vr-travel-sweep-opacity",e.targetImage?"0.18":"0"),this.element.style.setProperty("--vr-travel-corridor-opacity",e.targetImage?"0.2":"0.08"),this.element.style.setProperty("--vr-travel-directional-veil-opacity",e.targetImage?"0.14":"0"),this.element.style.setProperty("--vr-travel-directional-veil-width",e.targetImage?"48%":"0%"),this.setBackdropImage(this.fromBackdrop,e.fromImage),this.setBackdropImage(this.toBackdrop,e.targetImage),this.element.classList.add("is-active"),this.element.dataset.stage="starting",this.element.dataset.progress="0",this.element.dataset.targetReady="false",this.loadTexture("from",e.fromImage),this.loadTexture("to",e.targetImage)}setTargetImage(e){this.currentToUrl=e,this.setBackdropImage(this.toBackdrop,e),this.loadTexture("to",e)}render(e){if(!this.active)return;const r=pt(e,this.targetImageLoaded);if(this.element.style.visibility="visible",this.element.style.pointerEvents="none",this.element.style.opacity=String(r.stageOpacity),this.element.dataset.stage=e.stage,this.element.dataset.progress=String(e.progress),this.element.dataset.targetReady=String(e.targetReady),this.updateFallbackMotion(e,r),this.element.dataset.wipeFrom=e.wipeFrom,!this.webglEnabled||!this.renderer||!this.material)return;const i=!!this.fromTexture;if(this.canvasHost.style.opacity=i?String(e.targetReady?1:.84+e.stageProgress*.1):"0",!i)return;this.ensureRendererSize();const n=this.material.uniforms;n.uProgress.value=e.progress,n.uRevealProgress.value=e.revealProgress,n.uTargetMixProgress.value=e.targetMixProgress,n.uTravelDirX.value=e.travelDirX,n.uCenterRevealMode.value=e.wipeFrom==="center"?1:0,n.uCurveStrength.value=e.curveStrength,n.uForwardDriveStrength.value=e.forwardDriveStrength,n.uWipeSoftness.value=e.wipeSoftness,n.uDistortionStrength.value=e.distortionStrength,n.uBlurStrength.value=e.blurPx,n.uMotionBlurStrength.value=e.motionBlurStrength,n.uGlassAlpha.value=e.glassAlpha,n.uOcclusionOpacity.value=e.occlusionOpacity,n.uZoomScale.value=e.zoomScale,n.uFromShift.value=e.fromShiftPercent,n.uToShift.value=e.toShiftPercent,n.uShearRad.value=Ai(e.shearDeg),n.uSettleStrength.value=e.settleStrength,n.uTargetPreviewLoaded.value=this.targetImageLoaded?1:0,n.uTargetMixReady.value=this.targetImageLoaded&&e.targetReady?Math.min(1,Math.max(e.revealProgress*.82+e.targetMixProgress*.3+e.targetFocus*.08,e.stage==="settle"?.82:.12)):0,n.uFromOpacity.value=e.fromOpacity,n.uFromEdgeMix.value=e.fromEdgeMix,n.uTargetFocus.value=e.targetFocus,this.renderer.render(this.scene,this.camera)}hide(){this.active&&(this.active=!1,this.element.style.transition="opacity 140ms cubic-bezier(0.16, 1, 0.3, 1), visibility 140ms cubic-bezier(0.16, 1, 0.3, 1)",this.element.style.opacity="0",this.element.style.visibility="hidden",this.element.style.pointerEvents="none",this.element.style.setProperty("--vr-travel-from-backdrop-opacity","0"),this.element.style.setProperty("--vr-travel-target-backdrop-opacity","0"),this.element.style.setProperty("--vr-travel-target-reveal-inset","100%"),this.element.style.setProperty("--vr-travel-backdrop-blur","0px"),this.element.style.setProperty("--vr-travel-target-backdrop-blur","0px"),this.element.style.setProperty("--vr-travel-sweep-opacity","0"),this.element.style.setProperty("--vr-travel-corridor-opacity","0"),this.element.style.setProperty("--vr-travel-directional-veil-opacity","0"),this.canvasHost.style.opacity="0",this.element.dataset.stage="idle",this.element.dataset.progress="1",this.element.dataset.targetReady="false",this.element.classList.remove("is-active"),this.clearTimer=window.setTimeout(()=>{this.active||(this.element.style.opacity="",this.element.style.visibility="",this.element.style.transition="",this.element.style.pointerEvents="",this.setBackdropImage(this.fromBackdrop,void 0),this.setBackdropImage(this.toBackdrop,void 0),this.targetImageLoaded=!1,this.currentFromUrl=void 0,this.currentToUrl=void 0)},Ii))}isActive(){return this.active}initWebgl(){try{this.renderer=new Wt({antialias:!1,alpha:!0,premultipliedAlpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.setClearColor(0,0),this.scene=new zt,this.camera=new Xt(-1,1,1,-1,0,1),this.material=new qt({transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uFromTex:{value:null},uToTex:{value:null},uResolution:{value:this.resolution},uRevealProgress:{value:0},uTargetMixProgress:{value:0},uProgress:{value:0},uTravelDirX:{value:1},uCenterRevealMode:{value:0},uCurveStrength:{value:0},uForwardDriveStrength:{value:0},uWipeSoftness:{value:.16},uDistortionStrength:{value:.22},uBlurStrength:{value:24},uMotionBlurStrength:{value:.1},uGlassAlpha:{value:.22},uOcclusionOpacity:{value:.18},uZoomScale:{value:1.02},uFromShift:{value:0},uToShift:{value:0},uShearRad:{value:0},uSettleStrength:{value:0},uTargetPreviewLoaded:{value:0},uTargetMixReady:{value:0},uFromOpacity:{value:1},uFromEdgeMix:{value:0},uTargetFocus:{value:0}},vertexShader:Ei,fragmentShader:Pi});const e=new jt(2,2);this.quad=new Qt(e,this.material),this.scene.add(this.quad),this.canvasHost.appendChild(this.renderer.domElement),this.webglEnabled=!0,this.ensureRendererSize()}catch{this.webglEnabled=!1,this.renderer=null,this.scene=null,this.camera=null,this.material=null,this.quad=null}}ensureRendererSize(){if(!this.renderer)return;const e=Math.max(window.innerWidth,1),r=Math.max(window.innerHeight,1);this.currentSize.width===e&&this.currentSize.height===r||(this.currentSize={width:e,height:r},this.resolution.set(e,r),this.renderer.setSize(e,r,!1))}async loadTexture(e,r){const i=e==="from"?"fromLoadToken":"toLoadToken",n=e==="from"?"currentFromUrl":"currentToUrl",s=this[i]+1;if(this[i]=s,!r){this.applyTexture(e,null,void 0,s);return}if(this[n]===r&&this.getTexture(e)){e==="to"&&(this.targetImageLoaded=!0);return}try{const o=await Di(r),c=_i(o);this.applyTexture(e,c,r,s),e==="to"&&(this.targetImageLoaded=!0)}catch{e==="to"&&(this.targetImageLoaded=!1),this.applyTexture(e,null,r,s)}}applyTexture(e,r,i,n){const s=e==="from"?this.fromLoadToken:this.toLoadToken;if(n!==s){r==null||r.dispose();return}const o=this.getTexture(e);if(o&&o!==r&&o.dispose(),e==="from"){this.fromTexture=r,this.currentFromUrl=i,this.setBackdropImage(this.fromBackdrop,i),this.material&&(this.material.uniforms.uFromTex.value=r,this.toTexture||(this.material.uniforms.uToTex.value=r));return}this.toTexture=r,this.currentToUrl=i,this.setBackdropImage(this.toBackdrop,i),this.material&&(this.material.uniforms.uToTex.value=r??this.fromTexture)}getTexture(e){return e==="from"?this.fromTexture:this.toTexture}updateFallbackMotion(e,r=pt(e,this.targetImageLoaded)){let i=r.fallbackBlur,n=r.fromBackdropOpacity,s=r.targetBackdropBlur,o=r.targetBackdropOpacity;const c=!!this.fromTexture,l=!!this.toTexture&&this.targetImageLoaded;if(this.webglEnabled&&c){const b=e.targetReady?Math.min(1,.48+e.revealProgress*.32+e.targetMixProgress*.22):Math.min(.74,.18+e.targetFocus*.28+e.revealProgress*.14);i=Math.max(2.2,i*(1-b*.78)),n*=e.targetReady?Math.max(.1,.34-b*.16):Math.max(.24,.72-b*.28)}if(this.webglEnabled&&l){const b=e.targetReady?Math.min(1,.42+e.revealProgress*.34+e.targetMixProgress*.24):Math.min(.68,.22+e.targetFocus*.28+e.revealProgress*.12);s=Math.max(1.2,s*(1-b*.88)),o*=e.targetReady?Math.max(.02,.08-b*.06):Math.max(0,.02-b*.02)}this.element.style.setProperty("--vr-travel-backdrop-blur",`${i}px`),this.element.style.setProperty("--vr-travel-backdrop-scale",String(Number((e.zoomScale+e.fromEdgeMix*(e.sourceKind==="cover"?.08:.03)).toFixed(4)))),this.element.style.setProperty("--vr-travel-backdrop-shift",`${e.fromShiftPercent}%`),this.element.style.setProperty("--vr-travel-from-backdrop-opacity",String(n)),this.element.style.setProperty("--vr-travel-backdrop-brightness",String(r.backdropBrightness)),this.element.style.setProperty("--vr-travel-from-cut-inner",`${r.fromCenterCutInner}%`),this.element.style.setProperty("--vr-travel-from-cut-outer",`${r.fromCenterCutOuter}%`),this.element.style.setProperty("--vr-travel-target-backdrop-blur",`${s}px`),this.element.style.setProperty("--vr-travel-target-backdrop-scale",String(Number(Math.max(1,e.zoomScale-.01).toFixed(4)))),this.element.style.setProperty("--vr-travel-target-backdrop-shift",`${e.toShiftPercent}%`),this.element.style.setProperty("--vr-travel-target-backdrop-opacity",String(o)),this.element.style.setProperty("--vr-travel-target-reveal-inset",`${r.targetRevealInset}%`);const d=e.wipeFrom==="center",u=d?(e.stage==="turn-in"||e.stage==="travel",0):e.travelDirX*(e.stage==="turn-in"?8-e.stageProgress*22:e.stage==="travel"?-4-e.stageProgress*32:-12+e.settleStrength*8),p=d?e.stage==="turn-in"?e.curveStrength*1.2:e.stage==="travel"?e.curveStrength*1.8:0:e.travelDirX*(e.stage==="turn-in"?6+e.curveStrength*5+e.forwardDriveStrength*4:e.stage==="travel"?8+e.curveStrength*8+e.forwardDriveStrength*5:2+e.curveStrength*2),S=fe(e.stage==="settle"?.22-e.settleStrength*.18:d?.26+e.stageProgress*.18+e.forwardDriveStrength*.14+e.curveStrength*.03:.24+e.stageProgress*.22+e.forwardDriveStrength*.2+e.curveStrength*.1,0,d?.68:.72),g=fe(e.stage==="settle"?.12-e.settleStrength*.1:d?.24+e.forwardDriveStrength*.2+e.curveStrength*.03+e.targetFocus*.03:.16+e.forwardDriveStrength*.18+e.curveStrength*.06+e.targetFocus*.08,0,d?.54:.44);this.element.style.setProperty("--vr-travel-sweep-offset",`${u}%`),this.element.style.setProperty("--vr-travel-sweep-rotate",`${p}deg`),this.element.style.setProperty("--vr-travel-sweep-opacity",String(we(S))),this.element.style.setProperty("--vr-travel-corridor-opacity",String(we(g)));const A=fe(e.stage==="settle"?.1-e.settleStrength*.08:d?.26+e.stageProgress*.1+e.forwardDriveStrength*.16:.16+e.stageProgress*.12+e.forwardDriveStrength*.1+e.curveStrength*.08,0,d?.58:.38),R=fe(d?34+e.forwardDriveStrength*14:38+e.forwardDriveStrength*10+e.curveStrength*12,d?28:34,d?52:58);this.element.style.setProperty("--vr-travel-directional-veil-opacity",String(we(A))),this.element.style.setProperty("--vr-travel-directional-veil-width",`${we(R)}%`)}setBackdropImage(e,r){e.style.backgroundImage=r?`url("${r}")`:""}}function _i(t){const e=new Zt(t);return e.colorSpace=Kt,e.wrapS=Qe,e.wrapT=Qe,e.minFilter=Ze,e.magFilter=Ze,e.generateMipmaps=!1,e.needsUpdate=!0,e}function fe(t,e,r){return Math.max(e,Math.min(r,t))}function we(t){return Math.round(t*1e3)/1e3}function Di(t){return new Promise((e,r)=>{const i=new Image;i.decoding="async",i.crossOrigin="anonymous",i.onload=()=>e(i),i.onerror=()=>r(new Error(`image load failed: ${t}`)),i.src=t,typeof i.decode=="function"&&i.decode().then(()=>e(i)).catch(()=>{})})}function Ai(t){return t*Math.PI/180}function Ri({frame:t,currentWorldView:e,targetWorldView:r,loadCommitted:i}){if(t.progress>=1)return{...r};const n=Ni(t,i),s=ce(e.pitch,r.pitch,n),o=ce(e.fov,r.fov,n);return{yaw:t.displayWorldYaw,pitch:vt(s),fov:vt(o+t.fovDelta)}}function Ni(t,e){if(t.stage==="turn-in"){const r=ce(.04,.14,t.stageProgress);return Ie(e?r+.08:r,0,.24)}if(t.stage==="travel"){const r=Math.max(t.revealProgress,t.stageProgress*.72),i=ce(e?.42:.14,e?.86:.42,r);return Ie(i,0,e?.9:.46)}return Ie(ce(e?.82:.42,1,t.stageProgress),0,1)}function ce(t,e,r){return t+(e-t)*Ie(r,0,1)}function Ie(t,e,r){return Math.max(e,Math.min(r,t))}function vt(t){return Number(t.toFixed(2))}const Se=.74,Li=180;function Oe(t,e="high"){return t.failed?!0:t.loadCommitted?e==="low"&&t.lowReady||t.sharpReady:!1}function Ci(t){return t.failed||t.loadCommitted&&(t.lowReady||t.sharpReady)}function xi({ts:t,startTs:e,durationMs:r,settleMs:i,state:n,releaseMode:s="high"}){const o=ye((t-e)/Math.max(r,1)*Se,0,Se);if(!n.targetReady||n.targetReadyAtTs==null)return o;const c=ye(Math.max(n.targetReadyProgress,o,n.currentProgress),0,Se);if(!Oe(n,s)||n.releaseAtTs==null)return c;const l=t-n.releaseAtTs,d=ye(Math.max(n.releaseProgress,c),0,Se);return ye(d+l/Math.max(i+Li,1)*(1-d),0,1)}function ye(t,e,r){return Math.max(e,Math.min(r,t))}const Oi=.58;function Vi(t){return{targetReady:!1,lowReady:!1,sharpReady:!1,loadCommitted:!1,failed:!1,currentProgress:0,targetReadyAtTs:null,targetReadyProgress:0,releaseAtTs:null,releaseProgress:0}}function ki(t,e){var r;return(r=t.panoTiles)!=null&&r.manifest||t.panoLow||t.pano||!e?t:{...t,panoLow:e}}function Ui(t){return t.stage==="settle"||t.stage==="travel"&&t.stageProgress>=Oi}function Fi(t,e){return t?e==="lowReady"||e==="highReady"||e==="degraded":!1}const ae=.22,Ne=.1,Le=.13,H=16,Ve=-2.6,ft=.9,Bi=.12,Gi=.2,wt=.14,Ce=.18,Hi=.22;function $i({currentWorldYaw:t,targetWorldYaw:e,plan:r,progress:i,targetReady:n,targetReadyProgress:s,sourceKind:o="scene"}){const c=L(i,0,1),l=r.durationMs+r.settleMs,u=1-L(r.settleMs/Math.max(l,1),Bi,Gi),p=ke(t+r.travelDirX*r.turnLead),S=Wi({normalizedProgress:c,settleStart:u,targetReady:n,targetReadyProgress:s,sourceKind:o});if(c<=ae){const v=Ue(W(c,ae)),O=Me(t,p,v),ie=w(H,H*.82,v);return{progress:F(c),stageProgress:F(v),targetReady:n,stage:"turn-in",sourceKind:o,displayWorldYaw:O,travelDirX:r.travelDirX,wipeFrom:r.wipeFrom,revealProgress:0,targetMixProgress:0,settleStrength:0,fromOpacity:M(o==="cover"?w(.22,.14,v):w(.68,.42,v)),fromEdgeMix:M(o==="cover"?.98:w(.84,.94,v)),targetFocus:M(o==="cover"?w(.16,.26,v):w(.18,.3,v)),wipeSoftness:Ne,distortionStrength:Le*(o==="cover"?.42:.5),blurPx:D(ie),glassAlpha:Ce,motionBlurStrength:.035,fovDelta:D(Ve*(.6+.4*v)),zoomScale:F(1+.012*v),fromShiftPercent:D(r.travelDirX*(o==="cover"?1.8:1.4)*v),toShiftPercent:D(r.travelDirX*5.8*(1-v)),shearDeg:D(r.travelDirX*(1.1+r.curveStrength*2.6)*v),curveStrength:r.curveStrength,occlusionOpacity:M((.08+r.curveStrength*.12)*v)}}if(c<u){const v=W(c-ae,u-ae),O=$e(v),ie=Me(p,e,O),k=zi(v),ue=(n?w(H*(o==="cover"?.54:.38),H*.08,S.revealProgress):H*(o==="cover"?.96:.7))+H*.08*k,P=Le*(.72+.2*k+r.curveStrength*.12),C=n?o==="cover"?w(.16,.02,S.targetMixProgress):w(.36,.03,S.targetMixProgress):o==="cover"?.24:w(.28,.14,O),z=o==="cover"?.98:n?w(.82,.96,S.targetMixProgress):w(.92,.98,O),de=n?S.targetFocus:o==="cover"?.12:w(.28,.42,k);return{progress:F(c),stageProgress:F(O),targetReady:n,stage:"travel",sourceKind:o,displayWorldYaw:ie,travelDirX:r.travelDirX,wipeFrom:r.wipeFrom,revealProgress:M(S.revealProgress),targetMixProgress:M(S.targetMixProgress),settleStrength:0,fromOpacity:M(C),fromEdgeMix:M(z),targetFocus:M(de),wipeSoftness:M(Ne+r.curveStrength*.03),distortionStrength:M(P),blurPx:D(ue),glassAlpha:M(n?wt:Ce),motionBlurStrength:M(.035+k*.08),fovDelta:D(Yi(c,u)),zoomScale:F(1+.015+k*.02),fromShiftPercent:D(r.travelDirX*w(o==="cover"?2.2:1.8,o==="cover"?5.2:4.2,O)),toShiftPercent:D(r.travelDirX*w(5.4,.4,S.revealProgress)),shearDeg:D(r.travelDirX*(1.4+r.curveStrength*3.4)*k),curveStrength:r.curveStrength,occlusionOpacity:M((.1+r.curveStrength*(Hi*.8))*k)}}const g=kt(W(c-u,1-u)),A=Me(p,e,1),R=n?w(H*.18,0,g):H*.82,b=n?M(w(S.revealProgress,1,g)):0,f=n?M(w(S.targetMixProgress,1,g)):0,re=n?M(w(S.targetFocus,1,g)):.34;return{progress:F(c),stageProgress:F(g),targetReady:n,stage:"settle",sourceKind:o,displayWorldYaw:Me(A,e,g),travelDirX:r.travelDirX,wipeFrom:r.wipeFrom,revealProgress:b,targetMixProgress:f,settleStrength:M(n?g:0),fromOpacity:M(n?w(o==="cover"?w(.08,.02,S.targetMixProgress):w(.12,.04,S.targetMixProgress),0,g):o==="cover"?.28:.16),fromEdgeMix:M(o==="cover"?1:n?w(.9,.98,g):.98),targetFocus:re,wipeSoftness:M(Ne+r.curveStrength*.02),distortionStrength:M(Le*(1-g*.8)),blurPx:D(R),glassAlpha:M(n?w(wt,.08,g):Ce),motionBlurStrength:M(n?w(.08,0,g):.04),fovDelta:D(w(.4,0,g)),zoomScale:F(w(1.012,1,g)),fromShiftPercent:D(r.travelDirX*w(o==="cover"?2.8:2.2,0,g)),toShiftPercent:D(r.travelDirX*w(.8,0,g)),shearDeg:D(r.travelDirX*w(1.2+r.curveStrength*1.8,0,g)),curveStrength:r.curveStrength,occlusionOpacity:M(w(.1+r.curveStrength*.12,0,g))}}function Yi(t,e){return t<=.22?w(0,Ve,Ue(W(t,.22))):t<=.48?w(Ve,ft,$e(W(t-.22,.26))):t<=e?w(ft,.45,Ue(W(t-.48,Math.max(e-.48,.001)))):.45}function Wi({normalizedProgress:t,settleStart:e,targetReady:r,targetReadyProgress:i,sourceKind:n}){if(!r)return{revealProgress:0,targetMixProgress:0,targetFocus:0};const s=L(i??ae,0,Math.min(t,e)),o=Math.max((1-s)*.85,.001),c=Math.max(t-s,0),l=W(c,o),d=$e(l),u=kt(W(c,o*1.08)),p=L((n==="cover"?.03:.02)+d*(n==="cover"?.86:.82)+u*(n==="cover"?.1:.08),0,.97),S=L((n==="cover"?.23:.14)+d*(n==="cover"?.69:.58)+u*(n==="cover"?.1:.08),0,1);return{revealProgress:d,targetMixProgress:p,targetFocus:S}}function Me(t,e,r){const i=ke(e-t);return D(ke(t+i*L(r,0,1)))}function ke(t){const e=((t+180)%360+360)%360-180;return Object.is(e,-0)?0:e}function W(t,e){return e<=0?1:L(t/e,0,1)}function zi(t){const e=L(t,0,1);return 1-Math.pow(e*2-1,2)}function Ue(t){const e=1-L(t,0,1);return 1-e*e*e}function $e(t){const e=L(t,0,1);return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function kt(t){const e=L(t,0,1);return 1-(1-e)*(1-e)}function w(t,e,r){return t+(e-t)*L(r,0,1)}function L(t,e,r){return Math.max(e,Math.min(r,t))}function D(t){return Number(t.toFixed(2))}function M(t){return Number(t.toFixed(3))}function F(t){return Number(t.toFixed(4))}class Xi{constructor(e){a(this,"overlay");a(this,"activeSession",null);this.overlay=new bi,e.appendChild(this.overlay.getElement())}start(e){var i;(i=this.activeSession)==null||i.cancel();const r=new qi(this.overlay,e,()=>{this.activeSession===r&&(this.activeSession=null)});return this.activeSession=r,r.start(),r}isActive(){var e;return((e=this.activeSession)==null?void 0:e.isActive())??!1}}class qi{constructor(e,r,i){a(this,"plan");a(this,"overlay");a(this,"args");a(this,"handleDispose");a(this,"rafId",null);a(this,"startTs",0);a(this,"completionPromise");a(this,"resolveCompletion");a(this,"state");a(this,"active",!1);a(this,"renderFrame",e=>{if(!this.active)return;this.startTs||(this.startTs=e,this.state.targetReady&&this.state.targetReadyAtTs===0&&(this.state.targetReadyAtTs=e));const r=this.computeProgress(e);this.state.currentProgress=r;const i=$i({currentWorldYaw:this.args.currentWorldView.yaw,targetWorldYaw:this.args.targetWorldView.yaw,plan:this.plan,progress:r,targetReady:Ci(this.state),targetReadyProgress:this.state.targetReadyProgress,sourceKind:this.args.sourceKind??"scene"});if(this.overlay.render(i),this.driveCamera(i),r>=1&&Oe(this.state,this.args.releaseMode??"high")){this.finish();return}this.rafId=window.requestAnimationFrame(this.renderFrame)});this.overlay=e,this.args=r,this.handleDispose=i,this.plan=mi({currentWorldYaw:r.currentWorldView.yaw,targetWorldYaw:r.targetWorldView.yaw,hotspotScreenX:r.hotspotScreenX,fromMapPoint:r.fromMapPoint,toMapPoint:r.toMapPoint}),this.state=Vi(r.targetPreviewImage),this.completionPromise=new Promise(n=>{this.resolveCompletion=n})}start(){var e,r;this.active=!0,(r=(e=this.args).onInteractionLock)==null||r.call(e,!0),this.overlay.start({fromImage:this.args.fromImage,targetImage:this.args.targetPreviewImage}),this.rafId=window.requestAnimationFrame(this.renderFrame)}setTargetPreviewImage(e){e&&this.overlay.setTargetImage(e)}markTargetReady(){this.state.targetReady||(this.state.targetReady=!0,this.state.targetReadyAtTs=performance.now(),this.state.targetReadyProgress=this.state.currentProgress,this.markReleaseReady(this.state.targetReadyAtTs))}markLoadCommitted(){this.state.loadCommitted=!0}markStatus(e){if(e===E.LOW_READY){this.state.lowReady=!0,this.markTargetReady(),this.markReleaseReady(performance.now());return}(e===E.HIGH_READY||e===E.DEGRADED)&&(this.state.lowReady=!0,this.state.sharpReady=!0,this.markTargetReady(),this.markReleaseReady(performance.now()))}markError(){this.state.failed=!0,this.markTargetReady(),this.markReleaseReady(performance.now())}isActive(){return this.active}waitForCompletion(){return this.completionPromise}cancel(){var e,r;this.active&&(this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null),this.overlay.hide(),(r=(e=this.args).onInteractionLock)==null||r.call(e,!1),this.active=!1,this.resolveCompletion("cancelled"),this.handleDispose())}computeProgress(e){return xi({ts:e,startTs:this.startTs,durationMs:this.plan.durationMs,settleMs:this.plan.settleMs,state:this.state,releaseMode:this.args.releaseMode??"high"})}driveCamera(e){if(!this.args.onCameraFrame)return;const r=Ri({frame:e,currentWorldView:this.args.currentWorldView,targetWorldView:this.args.targetWorldView,loadCommitted:this.state.loadCommitted});this.args.onCameraFrame(r,{useTargetScene:this.state.loadCommitted,frame:e})}finish(){var e,r;this.active&&(this.rafId!==null&&(window.cancelAnimationFrame(this.rafId),this.rafId=null),this.overlay.hide(),(r=(e=this.args).onInteractionLock)==null||r.call(e,!1),this.active=!1,this.resolveCompletion("completed"),this.handleDispose())}markReleaseReady(e){this.state.releaseAtTs==null&&Oe(this.state,this.args.releaseMode??"high")&&(this.state.releaseAtTs=e,this.state.releaseProgress=this.state.currentProgress)}}Y&&Promise.all([T(()=>import("./debugHelper-CkxFqbpw.js"),[],import.meta.url),T(()=>Promise.resolve().then(()=>Yr),void 0,import.meta.url)]).then(([t,e])=>{const{dumpVRState:r,resetVRUI:i}=t,{interactionBus:n}=e;window.__vrDump=()=>{const s=r();return console.debug("[VR State Snapshot]",s),s},window.__vrResetUI=()=>{console.debug("[VR Reset UI] 正在清理所有 UI 状态..."),i(n),console.debug("[VR Reset UI] 清理完成")},console.debug("[VR Debug] 调试模式已启用。使用 __vrDump() 查看状态，使用 __vrResetUI() 复位 UI")}).catch(()=>{});nr();jr();Qr();ur();const Ut=()=>{const t=document;!!(document.fullscreenElement||t.webkitFullscreenElement)&&Rr()};document.addEventListener("fullscreenchange",Ut);document.addEventListener("webkitfullscreenchange",Ut);function ji(){const t=new URLSearchParams(location.search);return t.has("development")||t.get("dev")==="1"||location.hash.includes("development")}class Qi{constructor(){a(this,"appElement");a(this,"config",null);a(this,"panoViewer",null);a(this,"titleBar",null);a(this,"topRightControls",null);a(this,"topModeTabs",null);a(this,"sceneTitleEl",null);a(this,"brandMark",null);a(this,"bottomDock",null);a(this,"sceneGuideDrawer",null);a(this,"guideTray",null);a(this,"museumList",null);a(this,"sceneListPage",null);a(this,"hotspots",null);a(this,"videoPlayer",null);a(this,"loading");a(this,"debugPanel",null);a(this,"configStudio",null);a(this,"qualityIndicator",null);a(this,"northCalibrationPanel",null);a(this,"currentMuseum",null);a(this,"currentScene",null);a(this,"viewerContainer",null);a(this,"museumShellChrome",null);a(this,"sceneTransitionController",null);a(this,"activeTransitionSession",null);a(this,"transitionIntentState",Re());a(this,"activeSceneEnterMeta",null);a(this,"pendingSceneEnterMeta",null);a(this,"sceneUiRuntime",null);a(this,"chatRuntime",null);a(this,"viewSessionRuntime");a(this,"enteredMuseumIds",new Set);a(this,"routeViewSyncDisposer",null);a(this,"lastRouteViewSyncAt",0);a(this,"lastRouteViewSignature","");a(this,"hasBoundFullscreenEvents",!1);a(this,"mode","tour");a(this,"infoModalMounted",null);a(this,"settingsModalMounted",null);a(this,"handlePopState",null);a(this,"handlePickEvent",null);a(this,"handlePickModeEvent",null);a(this,"debugPanelRafId",null);a(this,"panoViewerModulePromise",null);a(this,"topRightControlsModulePromise",null);a(this,"brandMarkModulePromise",null);a(this,"structureView2DModulePromise",null);a(this,"structureView3DModulePromise",null);a(this,"titleBarModulePromise",null);a(this,"museumListModulePromise",null);a(this,"sceneListPageModulePromise",null);a(this,"sceneGraphModulePromise",null);a(this,"vrModeModulePromise",null);a(this,"vrModeInitialized",!1);a(this,"externalImageModulePromise",null);a(this,"appModalsModulePromise",null);a(this,"sceneUiRuntimeModulePromise",null);a(this,"chatRuntimeModulePromise",null);a(this,"configErrorPanelModulePromise",null);a(this,"museumShellChromeModulePromise",null);a(this,"uiErrorElement",null);const e=document.getElementById("app");if(!e)throw new Error("找不到 #app 元素");this.appElement=e,Fr(),this.loading=new dr,this.appElement.appendChild(this.loading.getElement()),this.viewSessionRuntime=new Zr({appElement:this.appElement,getCurrentMuseum:()=>this.currentMuseum,getCurrentScene:()=>this.currentScene,getMode:()=>this.mode,onSwitchToTour:()=>{var r;this.mode="tour",(r=this.topModeTabs)==null||r.setMode("tour")},navigateToScene:(r,i)=>{this.requestSceneEntry(r,i,void 0,{source:"guide-drawer"})},loadSceneGraphModule:()=>this.loadSceneGraphModule(),loadStructureView2DModule:()=>this.loadStructureView2DModule(),loadStructureView3DModule:()=>this.loadStructureView3DModule()}),this.bindFullscreenEventsOnce(),this.init()}bindFullscreenEventsOnce(){if(this.hasBoundFullscreenEvents)return;this.hasBoundFullscreenEvents=!0;const e=()=>{var r;(r=this.topRightControls)==null||r.syncFullscreenState(),At()||(this.syncVrModeUi(!1),Rt())};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}loadPanoViewerModule(){return this.panoViewerModulePromise||(this.panoViewerModulePromise=T(()=>import("./PanoViewer-DMWM3pPK.js").then(e=>e.P),__vite__mapDeps([0,1,2]),import.meta.url)),this.panoViewerModulePromise}loadTopRightControlsModule(){return this.topRightControlsModulePromise||(this.topRightControlsModulePromise=T(()=>import("./TopRightControls-CXAyjiD6.js"),__vite__mapDeps([3,1]),import.meta.url)),this.topRightControlsModulePromise}loadBrandMarkModule(){return this.brandMarkModulePromise||(this.brandMarkModulePromise=T(()=>import("./BrandMark-BZs1PMPs.js"),__vite__mapDeps([4,1]),import.meta.url)),this.brandMarkModulePromise}loadStructureView2DModule(){return this.structureView2DModulePromise||(this.structureView2DModulePromise=T(()=>import("./StructureView2D-CUVQwk5H.js"),__vite__mapDeps([5,6,7,8,1]),import.meta.url)),this.structureView2DModulePromise}loadStructureView3DModule(){return this.structureView3DModulePromise||(this.structureView3DModulePromise=T(()=>import("./dock-panels-DOH1UeeE.js").then(e=>e.S),__vite__mapDeps([9,7,8]),import.meta.url)),this.structureView3DModulePromise}loadTitleBarModule(){return this.titleBarModulePromise||(this.titleBarModulePromise=T(()=>import("./TitleBar-Dc3zo5Aq.js"),[],import.meta.url)),this.titleBarModulePromise}loadMuseumListModule(){return this.museumListModulePromise||(this.museumListModulePromise=T(()=>import("./MuseumList-CEnzFrZN.js"),__vite__mapDeps([10,1]),import.meta.url)),this.museumListModulePromise}loadSceneListPageModule(){return this.sceneListPageModulePromise||(this.sceneListPageModulePromise=T(()=>import("./SceneListPage-BOvt1l8s.js"),__vite__mapDeps([11,1]),import.meta.url)),this.sceneListPageModulePromise}loadSceneGraphModule(){return this.sceneGraphModulePromise||(this.sceneGraphModulePromise=T(()=>import("./sceneGraph-BFajjk2P.js"),__vite__mapDeps([12,7]),import.meta.url)),this.sceneGraphModulePromise}loadVrModeModule(){return this.vrModeModulePromise||(this.vrModeModulePromise=T(()=>import("./vrMode-D2Z9XT-U.js"),__vite__mapDeps([13,14,1]),import.meta.url)),this.vrModeModulePromise}loadAppModalsModule(){return this.appModalsModulePromise||(this.appModalsModulePromise=T(()=>import("./appModals-DdhulQgf.js"),__vite__mapDeps([15,16,17,1]),import.meta.url)),this.appModalsModulePromise}setDocumentTitle(...e){const r=e.map(i=>typeof i=="string"?i.trim():"").filter(i=>i.length>0);document.title=r.length>0?r.join(" - "):"VR 全景导览"}syncVrModeUi(e){this.panoViewer&&this.panoViewer.setVrModeEnabled(e),this.topRightControls&&this.topRightControls.updateVrModeState(e),window.dispatchEvent(new CustomEvent("vr:mode-change",{detail:{active:e}}))}loadSceneUiRuntimeModule(){return this.sceneUiRuntimeModulePromise||(this.sceneUiRuntimeModulePromise=T(()=>import("./scene-runtime-C_JearJb.js").then(e=>e.s),__vite__mapDeps([18,19]),import.meta.url)),this.sceneUiRuntimeModulePromise}loadChatRuntimeModule(){return this.chatRuntimeModulePromise||(this.chatRuntimeModulePromise=T(()=>import("./scene-runtime-C_JearJb.js").then(e=>e.c),__vite__mapDeps([18,19]),import.meta.url)),this.chatRuntimeModulePromise}loadConfigErrorPanelModule(){return this.configErrorPanelModulePromise||(this.configErrorPanelModulePromise=T(()=>import("./ConfigErrorPanel-DLx6BPVf.js"),__vite__mapDeps([20,21,1]),import.meta.url)),this.configErrorPanelModulePromise}loadMuseumShellChromeModule(){return this.museumShellChromeModulePromise||(this.museumShellChromeModulePromise=T(()=>import("./MuseumShellChrome-b3C9PNqc.js"),[],import.meta.url)),this.museumShellChromeModulePromise}async ensureVrModeInitialized(){const e=await this.loadVrModeModule();return this.vrModeInitialized||(e.initVrMode(),this.vrModeInitialized=!0),e}async resolveProxiedImageUrl(e){this.externalImageModulePromise||(this.externalImageModulePromise=T(()=>import("./externalImage-C8_s6D1F.js").then(r=>r.e),[],import.meta.url));try{const{toProxiedImageUrl:r}=await this.externalImageModulePromise;return r(e)}catch{return e}}async ensureMuseumShellChrome(){if(this.museumShellChrome)this.museumShellChrome.getElement().isConnected||this.appElement.appendChild(this.museumShellChrome.getElement());else{const{MuseumShellChrome:e}=await this.loadMuseumShellChromeModule();this.museumShellChrome=new e,this.appElement.appendChild(this.museumShellChrome.getElement())}return this.museumShellChrome}ensureSceneTransitionController(){return this.sceneTransitionController||(this.sceneTransitionController=new Xi(this.appElement)),this.sceneTransitionController}buildMuseumTransitionModel(e,r){return{brandTitle:ge(this.config).brandTitle,title:r.name,subtitle:`${e.name} · 正在进入下一个展点`,backgroundImage:q(e.cover,V.COVER)||"",snapshotImage:this.resolveScenePreviewAsset(r)}}warmMuseumPreviewAssets(e,r){const i=ni({museum:e,targetSceneId:r});for(const n of i.previewAssets){const s=new Image;s.decoding="async",s.loading="eager",s.src=q(n,V.THUMB)||q(n,V.PANO)||n}}async showMuseumCover(e,r){if(!this.config)return;this.currentMuseum=e,this.currentScene=null,this.setDocumentTitle(e.name,this.config.appName),this.loading.hide(),this.loadPanoViewerModule(),this.loadTopRightControlsModule(),this.loadBrandMarkModule();const i=ge(this.config),n=await this.ensureMuseumShellChrome();n.setCoverAction(()=>{this.enteredMuseumIds.add(e.id),this.requestSceneEntry(e.id,r,void 0,{source:"cover-cta"})}),n.showCover(ii({appName:this.config.appName,brandTitle:i.brandTitle,museum:e,targetSceneId:r})),this.warmMuseumPreviewAssets(e,r)}ensureLoadingElementAttached(){const e=this.loading.getElement();e.isConnected||this.appElement.appendChild(e)}async ensureViewerShell(e){if(this.viewerContainer?this.viewerContainer.isConnected||this.appElement.appendChild(this.viewerContainer):(this.viewerContainer=document.createElement("div"),this.viewerContainer.className="viewer-container",this.viewerContainer.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      `,this.appElement.appendChild(this.viewerContainer)),!this.panoViewer){const{PanoViewer:r}=await this.loadPanoViewerModule();this.panoViewer=new r(this.viewerContainer,e)}return this.viewerContainer}resolveScenePreviewAsset(e){return this.resolveSourceScenePreviewAsset(e)}resolveSourceScenePreviewAsset(e){return mt({thumbUrl:this.resolveTransitionPreviewAssetUrl(e.thumb,V.THUMB),panoLowUrl:this.resolveTransitionPreviewAssetUrl(e.panoLow,V.PANO),prefer:"thumb"})||""}resolveTargetScenePreviewAsset(e){return mt({thumbUrl:this.resolveTransitionPreviewAssetUrl(e.thumb,V.THUMB),panoLowUrl:this.resolveTransitionPreviewAssetUrl(e.panoLow,V.PANO),prefer:"thumb"})||""}resolveTransitionPreviewAssetUrl(e,r){if(!e||typeof e!="string"||e.trim()==="")return"";const i=e.trim();if(/^(?:data|blob):/i.test(i))return i;const n=this.rewriteRepoDocsAssetToCurrentOrigin(i);if(n)return n;if(/^https?:\/\//i.test(i)||i.startsWith("//"))return q(i)||i;try{return i.startsWith("/")?new URL(i.slice(1),document.baseURI).toString():new URL(i,document.baseURI).toString()}catch{return q(i)||i}}rewriteRepoDocsAssetToCurrentOrigin(e){const r=e.trim(),i=r.match(/^https:\/\/raw\.githubusercontent\.com\/wokao4360-rgb\/vrplayer\/main\/docs\/(.+)$/i);if(i)return new URL(i[1],document.baseURI).toString();const n=r.match(/^https:\/\/wokao4360-rgb\.github\.io\/vrplayer\/(.+)$/i);return n?new URL(n[1],document.baseURI).toString():""}captureViewerSnapshot(){var r;const e=(r=this.panoViewer)==null?void 0:r.getDomElement();if(!(e instanceof HTMLCanvasElement))return"";try{return e.toDataURL("image/jpeg",.76)}catch{return""}}requestSceneEntry(e,r,i,n={source:"route"}){var o;const s={museumId:e,sceneId:r,view:i};if((o=this.activeTransitionSession)!=null&&o.isActive()){this.transitionIntentState=ht(this.transitionIntentState,s),this.pendingSceneEnterMeta=n;return}this.transitionIntentState=ht(Re(),s),this.activeSceneEnterMeta=n,nt(e,r,i,{focusSource:n.source==="hotspot"?"pano":"dock"})}flushQueuedSceneEntry(){const{next:e,state:r}=pi(this.transitionIntentState);if(this.transitionIntentState=r,this.activeSceneEnterMeta=null,!e){this.pendingSceneEnterMeta=null;return}const i=this.pendingSceneEnterMeta??{source:"route"};this.pendingSceneEnterMeta=null,window.setTimeout(()=>{this.requestSceneEntry(e.museumId,e.sceneId,e.view,i)},0)}detachRouteViewSync(){this.routeViewSyncDisposer&&(this.routeViewSyncDisposer(),this.routeViewSyncDisposer=null),this.lastRouteViewSyncAt=0,this.lastRouteViewSignature=""}bindRouteViewSync(){this.detachRouteViewSync(),this.panoViewer&&(this.routeViewSyncDisposer=this.panoViewer.onFrame(()=>{var c;if(!this.panoViewer||!this.currentMuseum||!this.currentScene||(c=this.museumShellChrome)!=null&&c.isCoverVisible())return;const e=performance.now();if(e-this.lastRouteViewSyncAt<480)return;const r=_e();if(r.museumId!==this.currentMuseum.id||r.sceneId!==this.currentScene.id)return;const i=this.panoViewer.getCurrentView(),n={yaw:Number(dt(this.currentScene,i.yaw).toFixed(2)),pitch:Number(i.pitch.toFixed(2)),fov:Number(i.fov.toFixed(1))},s=`${n.yaw}/${n.pitch}/${n.fov}`,o=`${r.yaw??""}/${r.pitch??""}/${r.fov??""}`;s===o||s===this.lastRouteViewSignature||(this.lastRouteViewSignature=s,this.lastRouteViewSyncAt=e,cr(this.currentMuseum.id,this.currentScene.id,n))}))}async init(){try{if(this.loading.show(),lr()){await this.initEditorMode(),this.loading.hide();return}this.config=await Je(),De(this.config.assetCdn),this.setDocumentTitle(this.config.appName),this.titleBar&&this.titleBar.setTitle(this.config.appName),this.handlePopState||(this.handlePopState=()=>{this.handleRoute()},window.addEventListener("popstate",this.handlePopState)),await this.handleRoute(),this.loading.hide()}catch(e){console.error("配置加载失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?await this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await Je(),De(this.config.assetCdn),this.appElement.innerHTML="";const{ConfigStudio:e}=await T(async()=>{const{ConfigStudio:r}=await import("./editor-debug-BEvkMzv3.js").then(i=>i.C);return{ConfigStudio:r}},__vite__mapDeps([22,21,23,17]),import.meta.url);this.configStudio=new e(this.config,r=>{this.config=r,De(r.assetCdn),et()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?await this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async showConfigErrorPanel(e){this.appElement.innerHTML="";const{ConfigErrorPanel:r}=await this.loadConfigErrorPanelModule(),i=new r(e,()=>{et(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(i.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
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
      `)}async handleRoute(){var c,l,d;if(!this.config)return;const e=_e();if(e.sceneId&&(this.loadPanoViewerModule(),this.loadTopRightControlsModule(),this.loadBrandMarkModule()),!e.museumId){this.clearView(),this.setDocumentTitle(this.config.appName),await this.showMuseumList();return}const r=St(e.museumId);if(!r){this.clearView(),this.showError("未找到指定展馆"),it();return}const i=ti({museum:r,requestedSceneId:e.sceneId,hasEnteredMuseum:this.enteredMuseumIds.has(r.id)});if(i.kind==="cover"){const u=((c=this.currentMuseum)==null?void 0:c.id)===r.id&&!!(this.panoViewer&&this.viewerContainer);this.clearView({preserveViewerShell:u,preserveMuseumShell:u}),await this.showMuseumCover(r,i.targetSceneId);return}const n=rr(e.museumId,i.targetSceneId);if(!n){this.clearView(),this.showError("未找到指定场景");const u=xt(r);if(u){nt(r.id,u);return}it();return}const s=ri({currentMuseumId:((l=this.currentMuseum)==null?void 0:l.id)??null,hasViewerShell:!!(this.panoViewer&&this.viewerContainer),nextMuseumId:r.id,requestedView:{yaw:e.yaw,pitch:e.pitch,fov:e.fov}}),o=s.shellStrategy==="reuse-shell"&&this.currentScene&&this.panoViewer?(()=>{const u=this.panoViewer.getCurrentView();return{scene:this.currentScene,worldView:{yaw:dt(this.currentScene,u.yaw),pitch:u.pitch,fov:u.fov}}})():{scene:null,worldView:null};this.clearView({preserveViewerShell:s.shellStrategy==="reuse-shell",preserveMuseumShell:s.shellStrategy==="reuse-shell"||((d=this.museumShellChrome)==null?void 0:d.isCoverVisible())===!0}),await this.showScene(r,n,s,o)}async showMuseumList(){if(!this.config)return;const[{TitleBar:e},{MuseumList:r}]=await Promise.all([this.loadTitleBarModule(),this.loadMuseumListModule()]),i=ge(this.config);this.titleBar=new e(i.brandTitle),this.appElement.appendChild(this.titleBar.getElement()),this.setDocumentTitle(this.config.appName),this.museumList=new r(this.config),this.appElement.appendChild(this.museumList.getElement())}async showSceneList(e){var n;const{TitleBar:r}=await this.loadTitleBarModule();this.titleBar=new r(e.name),this.appElement.appendChild(this.titleBar.getElement()),this.setDocumentTitle(e.name,(n=this.config)==null?void 0:n.appName);const{SceneListPage:i}=await this.loadSceneListPageModule();this.sceneListPage=new i(e),this.appElement.appendChild(this.sceneListPage.getElement())}async showScene(e,r,i,n){var Xe,qe,je;const s=_e(),o=i.transitionDriver==="viewer",c=ar(),l=ji();this.currentMuseum=e,this.currentScene=o?null:r,this.enteredMuseumIds.add(e.id),this.loading.hide(),this.setDocumentTitle(r.name,e.name,(Xe=this.config)==null?void 0:Xe.appName);const d=await this.ensureViewerShell(c),u=await this.ensureMuseumShellChrome(),p=u.isCoverVisible(),S=this.buildMuseumTransitionModel(e,r);o?u.completeTransition():i.shellStrategy==="reuse-shell"?u.startSceneTransition({...S,snapshotImage:this.captureViewerSnapshot()||S.snapshotImage}):u.isCoverVisible()?u.showEnterPreloading(S):u.completeTransition(),o||this.mountTopRightControls(d,r,l);const g=(n==null?void 0:n.scene)??null,A=s.yaw!==void 0?s.yaw:r.initialView.yaw||0,R=s.pitch!==void 0?s.pitch:r.initialView.pitch||0,b=s.fov!==void 0?s.fov:r.initialView.fov||75,f=(n==null?void 0:n.worldView)??{yaw:A,pitch:R,fov:b},re=(g?this.resolveSourceScenePreviewAsset(g):this.resolveSourceScenePreviewAsset(r))||void 0,v=this.resolveTargetScenePreviewAsset(r)||void 0,O=Mi({coverWasVisible:p,sourcePreviewUrl:re,targetPreviewUrl:v,targetPreviewAlreadyReady:!!v,coverHeroUrl:q(e.cover,V.COVER)||e.cover,viewerSnapshot:o?void 0:this.captureViewerSnapshot(),previousScenePreviewImage:g?this.resolveSourceScenePreviewAsset(g):""}),ie=ki(r,v),k=this.activeSceneEnterMeta??{};this.activeSceneEnterMeta=null;const Ye={yaw:A,pitch:R,fov:b};let ue=!1,P=null,C=!o,z=!1,de=!1,U=!1,We=!1,Ee=!1,he=null,ne=()=>{var m,y,I,_,N,B,X;this.bottomDock=((m=this.sceneUiRuntime)==null?void 0:m.getBottomDock())??null,this.topModeTabs=((y=this.sceneUiRuntime)==null?void 0:y.getTopModeTabs())??null,this.hotspots=((I=this.sceneUiRuntime)==null?void 0:I.getHotspots())??null,this.videoPlayer=((_=this.sceneUiRuntime)==null?void 0:_.getVideoPlayer())??null,this.guideTray=((N=this.sceneUiRuntime)==null?void 0:N.getGuideTray())??null,this.sceneGuideDrawer=((B=this.sceneUiRuntime)==null?void 0:B.getSceneGuideDrawer())??null,this.qualityIndicator=((X=this.sceneUiRuntime)==null?void 0:X.getQualityIndicator())??null},Pe=()=>{},me=()=>{};const Te=()=>{he!=null&&(window.clearTimeout(he),he=null)},oe=()=>{U||(U=!0,Te(),me())},be=()=>{z||(z=!0,Pe())},ze=m=>{Ee||(Ee=!0,u.markPreviewReady(),window.setTimeout(()=>{u.completeTransition()},260))},Ft=()=>{C||!this.panoViewer||(C=!0,P==null||P.markLoadCommitted(),this.currentMuseum=e,this.currentScene=r,this.hideUIError(),be(),ne(),oe(),this.mountTopRightControls(d,r,l),this.panoViewer.loadScene(ie,{preserveView:!0,silentFallback:!0}),this.panoViewer.setSceneData(e.id,r.id,r.hotspots),this.bindRouteViewSync())};if(o&&(P=this.ensureSceneTransitionController().start({currentWorldView:f,targetWorldView:Ye,sourceKind:p?"cover":"scene",fromMapPoint:g==null?void 0:g.mapPoint,toMapPoint:r.mapPoint,fromImage:O.fromImage,targetPreviewImage:O.targetPreviewImage,hotspotScreenX:k.hotspotScreenX,releaseMode:"low",onCameraFrame:(y,I)=>{if(!this.panoViewer)return;if(!C&&Ui(I.frame)&&Ft(),this.panoViewer.isInteracting()){ue=!0;return}if(ue)return;const _=C||I.useTargetScene?r:g??r,N=ut(_,y.yaw);this.panoViewer.setView(N,y.pitch,y.fov)}}),this.activeTransitionSession=P,P.waitForCompletion().then(y=>{if(this.activeTransitionSession===P&&(this.activeTransitionSession=null),y==="completed"){this.flushQueuedSceneEntry();return}this.transitionIntentState=Re(),this.pendingSceneEnterMeta=null,this.activeSceneEnterMeta=null})),this.sceneTitleEl=document.createElement("div"),this.sceneTitleEl.className="vr-scenetitle",this.sceneTitleEl.textContent=r.name||((qe=this.config)==null?void 0:qe.appName)||"VR Player",this.appElement.appendChild(this.sceneTitleEl),this.handlePickEvent&&(window.removeEventListener("vr:pick",this.handlePickEvent),this.handlePickEvent=null),this.handlePickEvent=m=>{const y=m,{x:I,y:_,yaw:N,pitch:B}=y.detail;if(Hr({yaw:N,pitch:B,ts:Date.now()}),Dt(`已复制 yaw: ${N.toFixed(2)}, pitch: ${B.toFixed(2)}`),this.panoViewer){const X=this.panoViewer.getDomElement();Br(X,I,_)}},window.addEventListener("vr:pick",this.handlePickEvent),this.handlePickModeEvent&&(window.removeEventListener("vr:pickmode",this.handlePickModeEvent),this.handlePickModeEvent=null),this.handlePickModeEvent=m=>{const y=m;this.panoViewer&&!y.detail.enabled&&this.panoViewer.isPickModeEnabled()&&this.panoViewer.disablePickMode()},window.addEventListener("vr:pickmode",this.handlePickModeEvent),this.mountBrandMark(),c&&!this.debugPanel){const{DebugPanel:m}=await T(async()=>{const{DebugPanel:I}=await import("./editor-debug-BEvkMzv3.js").then(_=>_.D);return{DebugPanel:I}},__vite__mapDeps([22,21,23,17]),import.meta.url);this.debugPanel=new m,this.appElement.appendChild(this.debugPanel.getElement()),this.debugPanelRafId!==null&&(cancelAnimationFrame(this.debugPanelRafId),this.debugPanelRafId=null);const y=()=>{if(this.debugPanel&&this.panoViewer){const I=this.panoViewer.getCurrentView();this.debugPanel.updateView(I.yaw,I.pitch,I.fov)}this.debugPanelRafId=requestAnimationFrame(y)};y()}this.panoViewer&&this.debugPanel&&this.panoViewer.setOnDebugClick((m,y,I,_,N)=>{this.debugPanel&&this.debugPanel.show(m,y,I,_,N)});const[{ChatRuntime:Bt},{SceneUiRuntime:Gt}]=await Promise.all([this.loadChatRuntimeModule(),this.loadSceneUiRuntimeModule()]);if(this.chatRuntime=new Bt({captureCurrentViewImage:()=>this.captureViewerSnapshot()}),this.chatRuntime.updateContext({museum:e,scene:r,fcChatConfig:(je=this.config)==null?void 0:je.fcChat}),this.sceneUiRuntime=new Gt({appElement:this.appElement,viewerContainer:d,museum:e,scene:r,initialMode:this.mode,getPanoViewer:()=>this.panoViewer,getCurrentSceneId:()=>{var m;return((m=this.currentScene)==null?void 0:m.id)??null},onModeChange:m=>{this.setMode(m)},onEnterScene:(m,y,I)=>{this.requestSceneEntry(e.id,m,y,I??{source:"route"})},onOpenInfo:()=>{this.openInfoModal()},onOpenSettings:()=>{this.openSettingsModal()},onOpenCommunity:()=>{var m;(m=this.chatRuntime)==null||m.ensureInit()},onSmartNarration:()=>{var m;oe(),(m=this.chatRuntime)==null||m.ensureInit()},onPhotoAsk:()=>{var m;oe(),(m=this.chatRuntime)==null||m.ensureInit()},onWarmupFeatures:async()=>{await this.loadAppModalsModule()}}),ne=()=>{var m,y,I,_,N,B,X;this.bottomDock=((m=this.sceneUiRuntime)==null?void 0:m.getBottomDock())??null,this.topModeTabs=((y=this.sceneUiRuntime)==null?void 0:y.getTopModeTabs())??null,this.hotspots=((I=this.sceneUiRuntime)==null?void 0:I.getHotspots())??null,this.videoPlayer=((_=this.sceneUiRuntime)==null?void 0:_.getVideoPlayer())??null,this.guideTray=((N=this.sceneUiRuntime)==null?void 0:N.getGuideTray())??null,this.sceneGuideDrawer=((B=this.sceneUiRuntime)==null?void 0:B.getSceneGuideDrawer())??null,this.qualityIndicator=((X=this.sceneUiRuntime)==null?void 0:X.getQualityIndicator())??null},Pe=()=>{var m;!z||de||!this.sceneUiRuntime||(de=!0,(m=this.sceneUiRuntime)==null||m.mountCore().then(()=>{ne()}).catch(y=>{Y&&console.debug("[showScene] 核心场景 UI 创建失败，已跳过",y)}))},me=()=>{!U||We||!this.chatRuntime||(We=!0,this.chatRuntime.ensureInit())},U||(he=window.setTimeout(()=>{U||(U=!0,me(),Y&&console.debug("[showScene] chat init fallback triggered"))},3500)),ne(),z&&Pe(),U&&me(),this.panoViewer.setOnStatusChange(m=>{var I,_;const y=Fi(C,m);C&&((I=this.sceneUiRuntime)==null||I.handleStatusChange(m),ne()),!o&&(i.shellStrategy==="reuse-shell"||u.isCoverVisible())&&(m===E.LOW_READY||m===E.HIGH_READY||m===E.DEGRADED)&&ze(),y&&(m===E.LOW_READY||m===E.HIGH_READY||m===E.DEGRADED?window.requestAnimationFrame(()=>{const N=this.captureViewerSnapshot()||v;P==null||P.setTargetPreviewImage(N),P==null||P.markStatus(m)}):P==null||P.markStatus(m)),C&&!z&&(m===E.LOW_READY||m===E.HIGH_READY||m===E.DEGRADED)&&window.setTimeout(()=>{be()},0),(m===E.HIGH_READY||m===E.DEGRADED)&&((_=this.sceneUiRuntime)==null||_.scheduleFeatureWarmup(m===E.HIGH_READY?"immediate":"idle")),C&&!U&&(m===E.LOW_READY||m===E.HIGH_READY||m===E.DEGRADED)&&oe(),C&&(m===E.LOW_READY||m===E.HIGH_READY||m===E.DEGRADED)&&this.loading.hide()}),this.panoViewer.setOnLoad(()=>{be(),U||oe(),Te(),this.loading.hide(),this.hideUIError(),!o&&!Ee&&ze(E.HIGH_READY),this.preloadNextScene(e,r)}),this.panoViewer.setOnError(m=>{Te(),console.error("加载场景失败:",m),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),o?P==null||P.markError():u.showErrorFallback({...this.buildMuseumTransitionModel(e,r),snapshotImage:this.captureViewerSnapshot()||S.snapshotImage})}),i.viewStrategy==="reset-to-target"){const m=ut(r,A);this.panoViewer.setView(m,R,b)}o||(this.panoViewer.loadScene(r,{preserveView:!0}),this.panoViewer.setSceneData(e.id,r.id,r.hotspots),this.bindRouteViewSync())}async mountTopRightControls(e,r,i){var n;try{const{TopRightControls:s}=await this.loadTopRightControlsModule();if(!this.panoViewer||!this.currentScene||this.currentScene.id!==r.id)return;(n=this.topRightControls)==null||n.remove(),this.topRightControls=new s({viewerRootEl:e,onTogglePickMode:i?()=>this.panoViewer?(this.panoViewer.isPickModeEnabled()?this.panoViewer.disablePickMode():this.panoViewer.enablePickMode(),this.panoViewer.isPickModeEnabled()):!1:void 0,onOpenNorthCalibration:i?()=>{this.openNorthCalibration(r.id)}:void 0,showNorthCalibration:i,onToggleVrMode:async()=>this.toggleVrModeFromUI(e)}),this.appElement.appendChild(this.topRightControls.getElement())}catch(s){Y&&console.debug("[showScene] TopRightControls 创建失败，已跳过",s),this.topRightControls=null}}async mountBrandMark(){var e;try{const{BrandMark:r}=await this.loadBrandMarkModule();if(this.appElement.querySelector(".vr-brandmark"))return;this.brandMark=new r({appName:(e=this.config)==null?void 0:e.appName,brandText:this.config?ge(this.config).brandTitle:Kr.brand.name});const n=this.brandMark.getElement();n.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),this.openDingHuQingYuan()}),this.appElement.appendChild(n)}catch(r){Y&&console.debug("[showScene] BrandMark 创建失败，已跳过",r),this.brandMark=null}}preloadNextScene(e,r){const n=(e.scenes.findIndex(o=>o.id===r.id)+1)%e.scenes.length,s=e.scenes[n];if(s&&s.thumb){const o=q(s.thumb,V.THUMB);if(o){const c=new Image;c.referrerPolicy="no-referrer",c.crossOrigin="anonymous",c.loading="lazy",c.decoding="async",this.resolveProxiedImageUrl(o).then(l=>{c.src=l}).catch(()=>{c.src=o})}}}clearView(e={}){var n,s,o;const r=e.preserveViewerShell===!0,i=e.preserveMuseumShell===!0;this.viewSessionRuntime.clearOverlayState(),(n=this.activeTransitionSession)==null||n.cancel(),this.activeTransitionSession=null,this.detachRouteViewSync(),this.handlePickEvent&&(window.removeEventListener("vr:pick",this.handlePickEvent),this.handlePickEvent=null),this.handlePickModeEvent&&(window.removeEventListener("vr:pickmode",this.handlePickModeEvent),this.handlePickModeEvent=null),this.debugPanelRafId!==null&&(cancelAnimationFrame(this.debugPanelRafId),this.debugPanelRafId=null),(s=this.infoModalMounted)==null||s.close(),this.infoModalMounted=null,(o=this.settingsModalMounted)==null||o.close(),this.settingsModalMounted=null,this.chatRuntime&&(this.chatRuntime.dispose(),this.chatRuntime=null),this.sceneUiRuntime&&(this.sceneUiRuntime.dispose(),this.sceneUiRuntime=null),this.bottomDock=null,this.topModeTabs=null,this.hotspots=null,this.videoPlayer=null,this.guideTray=null,this.sceneGuideDrawer=null,this.qualityIndicator=null,!r&&this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.topRightControls&&(this.topRightControls.remove(),this.topRightControls=null),this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),this.sceneTitleEl&&(this.sceneTitleEl.remove(),this.sceneTitleEl=null),this.brandMark&&(this.brandMark.remove(),this.brandMark=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneListPage&&(this.sceneListPage.remove(),this.sceneListPage=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),!i&&this.museumShellChrome&&(this.museumShellChrome.getElement().remove(),this.museumShellChrome=null),!r&&this.viewerContainer&&(this.viewerContainer.remove(),this.viewerContainer=null),this.mode="tour",this.currentScene=null,r||(this.currentMuseum=null),this.ensureLoadingElementAttached()}hideUIError(){this.uiErrorElement&&this.uiErrorElement.parentNode&&(this.uiErrorElement.parentNode.removeChild(this.uiErrorElement),this.uiErrorElement=null)}setMode(e){this.mode!==e&&(this.mode=e,this.topModeTabs&&this.topModeTabs.setMode(e),e==="tour"&&this.viewSessionRuntime.isStructureOverlayOpen()&&this.viewSessionRuntime.closeStructureOverlay({toTour:!1}),e==="structure2d"?this.viewSessionRuntime.openStructure2D():e==="structure3d"&&this.viewSessionRuntime.openStructure3D())}async openNorthCalibration(e){if(this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),!this.panoViewer){console.warn("[openNorthCalibration] PanoViewer 未初始化");return}try{const{NorthCalibrationPanel:r}=await T(async()=>{const{NorthCalibrationPanel:i}=await import("./editor-debug-BEvkMzv3.js").then(n=>n.N);return{NorthCalibrationPanel:i}},__vite__mapDeps([22,21,23,17]),import.meta.url);this.northCalibrationPanel=new r({getCurrentYaw:()=>{var n;const i=(n=this.panoViewer)==null?void 0:n.getCurrentView();return(i==null?void 0:i.yaw)??0},sceneId:e,onClose:()=>{this.northCalibrationPanel=null}})}catch(r){console.error("[openNorthCalibration] 创建校准面板失败:",r),this.northCalibrationPanel=null}}showError(e){this.hideUIError(),this.uiErrorElement=document.createElement("div"),this.uiErrorElement.className="error-message",this.uiErrorElement.textContent=e,this.uiErrorElement.style.cssText=`
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
    `,this.appElement.appendChild(this.uiErrorElement),setTimeout(()=>{this.hideUIError()},3e3)}openDingHuQingYuan(){if(this.brandMark)try{this.brandMark.getAboutModal().open()}catch(e){Y&&console.debug("[openDingHuQingYuan] 打开团队介绍失败:",e)}}async openInfoModal(){var r,i,n;(r=this.infoModalMounted)==null||r.close(),this.infoModalMounted=null;const{openInfoModal:e}=await this.loadAppModalsModule();this.infoModalMounted=e({museumName:((i=this.currentMuseum)==null?void 0:i.name)||"-",sceneName:((n=this.currentScene)==null?void 0:n.name)||"-",onOpenBrand:()=>{this.openDingHuQingYuan()},onDockTabClose:()=>{this.infoModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"info"}}))}})}async toggleVrModeFromUI(e){if(!this.panoViewer)return!1;const r=await this.ensureVrModeInitialized();if(r.isVrModeEnabled())return r.disableVrMode(),this.syncVrModeUi(!1),await lt(),!1;{try{await xr(e)}catch(o){return Y&&console.debug("[VRMode] fullscreen request failed",o),!1}const n=this.panoViewer.getCurrentView();return r.setInteractingCallback(()=>{var o;return((o=this.panoViewer)==null?void 0:o.isInteracting())??!1}),await r.enableVrMode((o,c)=>{if(this.panoViewer){const l=n.yaw+o,d=Math.max(-90,Math.min(90,n.pitch+c));this.panoViewer.setView(l,d)}})?(this.syncVrModeUi(!0),!0):(await lt(),!1)}}async openSettingsModal(){var r;(r=this.settingsModalMounted)==null||r.close(),this.settingsModalMounted=null;const{openSettingsModal:e}=await this.loadAppModalsModule();this.settingsModalMounted=e({currentScene:this.currentScene,panoViewer:this.panoViewer,bottomDock:this.bottomDock,onToggleVrMode:async i=>this.toggleVrModeFromUI(i),onDockTabClose:()=>{this.settingsModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"settings"}}))}})}}new Qi;"serviceWorker"in navigator&&window.addEventListener("load",()=>{const t=new URL("./",window.location.href),e=new URL("sw.js",t);navigator.serviceWorker.register(e.toString(),{scope:t.pathname}).catch(()=>{})});export{V as A,h as E,E as L,Kr as Z,T as _,At as a,lt as b,xr as c,on as d,sr as e,Y as f,nn as g,tn as h,J as i,Fr as j,sn as k,ge as l,en as m,nt as n,Ji as o,xe as p,Ar as q,q as r,Dt as s,dt as t,rn as u,tr as v,ut as w};
