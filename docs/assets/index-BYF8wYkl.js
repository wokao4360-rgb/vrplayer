var Xd=Object.defineProperty;var $d=(s,e,t)=>e in s?Xd(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var v=(s,e,t)=>$d(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const qd="modulepreload",jd=function(s,e){return new URL(s,e).href},mo={},Di=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(c=>{if(c=jd(c,n),c in mo)return;mo[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(!!n)for(let _=a.length-1;_>=0;_--){const g=a[_];if(g.href===c&&(!d||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":qd,d||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),d)return new Promise((_,g)=>{f.addEventListener("load",_),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return i.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};var ne=(s=>(s.INVALID_ROOT="INVALID_ROOT",s.MISSING_APP_NAME="MISSING_APP_NAME",s.MUSEUMS_NOT_ARRAY="MUSEUMS_NOT_ARRAY",s.MUSEUMS_EMPTY="MUSEUMS_EMPTY",s.MISSING_MUSEUM_ID="MISSING_MUSEUM_ID",s.DUPLICATE_MUSEUM_ID="DUPLICATE_MUSEUM_ID",s.MISSING_MUSEUM_NAME="MISSING_MUSEUM_NAME",s.MISSING_MUSEUM_COVER="MISSING_MUSEUM_COVER",s.MISSING_MUSEUM_MAP="MISSING_MUSEUM_MAP",s.MISSING_MAP_IMAGE="MISSING_MAP_IMAGE",s.INVALID_MAP_WIDTH="INVALID_MAP_WIDTH",s.INVALID_MAP_HEIGHT="INVALID_MAP_HEIGHT",s.SCENES_NOT_ARRAY="SCENES_NOT_ARRAY",s.SCENES_EMPTY="SCENES_EMPTY",s.MISSING_SCENE_ID="MISSING_SCENE_ID",s.DUPLICATE_SCENE_ID="DUPLICATE_SCENE_ID",s.MISSING_SCENE_NAME="MISSING_SCENE_NAME",s.MISSING_PANO="MISSING_PANO",s.INVALID_PANO_URL="INVALID_PANO_URL",s.INVALID_PANOLOW_URL="INVALID_PANOLOW_URL",s.MISSING_THUMB="MISSING_THUMB",s.MISSING_INITIAL_VIEW="MISSING_INITIAL_VIEW",s.INVALID_YAW="INVALID_YAW",s.INVALID_PITCH="INVALID_PITCH",s.INVALID_FOV="INVALID_FOV",s.MISSING_MAP_POINT="MISSING_MAP_POINT",s.INVALID_MAP_POINT_X="INVALID_MAP_POINT_X",s.INVALID_MAP_POINT_Y="INVALID_MAP_POINT_Y",s.HOTSPOTS_NOT_ARRAY="HOTSPOTS_NOT_ARRAY",s.MISSING_HOTSPOT_ID="MISSING_HOTSPOT_ID",s.DUPLICATE_HOTSPOT_ID="DUPLICATE_HOTSPOT_ID",s.INVALID_HOTSPOT_TYPE="INVALID_HOTSPOT_TYPE",s.MISSING_HOTSPOT_LABEL="MISSING_HOTSPOT_LABEL",s.INVALID_HOTSPOT_YAW="INVALID_HOTSPOT_YAW",s.INVALID_HOTSPOT_PITCH="INVALID_HOTSPOT_PITCH",s.MISSING_HOTSPOT_TARGET="MISSING_HOTSPOT_TARGET",s.MISSING_TARGET_MUSEUM_ID="MISSING_TARGET_MUSEUM_ID",s.MISSING_TARGET_SCENE_ID="MISSING_TARGET_SCENE_ID",s.INVALID_TARGET_YAW="INVALID_TARGET_YAW",s.INVALID_TARGET_PITCH="INVALID_TARGET_PITCH",s.INVALID_TARGET_FOV="INVALID_TARGET_FOV",s.MISSING_TARGET_URL="MISSING_TARGET_URL",s))(ne||{});function Cc(s){const e=[];if(!s||typeof s!="object")return e.push({code:"INVALID_ROOT",path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!s.appName||typeof s.appName!="string"||s.appName.trim()==="")&&e.push({code:"MISSING_APP_NAME",path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!Array.isArray(s.museums))return e.push({code:"MUSEUMS_NOT_ARRAY",path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;s.museums.length===0&&e.push({code:"MUSEUMS_EMPTY",path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const t=new Set;return s.museums.forEach((n,i)=>{const r=`museums[${i}]`,a=n.name&&typeof n.name=="string"?n.name:void 0;if(!n.id||typeof n.id!="string"||n.id.trim()===""?e.push({code:"MISSING_MUSEUM_ID",path:`${r}.id`,message:"id 必须是非空字符串",museumName:a,fieldName:"博物馆 ID"}):(t.has(n.id)&&e.push({code:"DUPLICATE_MUSEUM_ID",path:`${r}.id`,message:`博物馆 ID "${n.id}" 重复`,museumName:a,fieldName:"博物馆 ID"}),t.add(n.id)),(!n.name||typeof n.name!="string"||n.name.trim()==="")&&e.push({code:"MISSING_MUSEUM_NAME",path:`${r}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),(!n.cover||typeof n.cover!="string"||n.cover.trim()==="")&&e.push({code:"MISSING_MUSEUM_COVER",path:`${r}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:a,fieldName:"封面图"}),!n.map||typeof n.map!="object"?e.push({code:"MISSING_MUSEUM_MAP",path:`${r}.map`,message:"map 必须是对象",museumName:a,fieldName:"地图配置"}):((!n.map.image||typeof n.map.image!="string"||n.map.image.trim()==="")&&e.push({code:"MISSING_MAP_IMAGE",path:`${r}.map.image`,message:"map.image 必须是有效的 URL 字符串",museumName:a,fieldName:"地图图片"}),(typeof n.map.width!="number"||n.map.width<=0)&&e.push({code:"INVALID_MAP_WIDTH",path:`${r}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:a,fieldName:"地图宽度"}),(typeof n.map.height!="number"||n.map.height<=0)&&e.push({code:"INVALID_MAP_HEIGHT",path:`${r}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:a,fieldName:"地图高度"})),!Array.isArray(n.scenes))e.push({code:"SCENES_NOT_ARRAY",path:`${r}.scenes`,message:"scenes 必须是数组",museumName:a,fieldName:"场景列表"});else{n.scenes.length===0&&e.push({code:"SCENES_EMPTY",path:`${r}.scenes`,message:"scenes 数组不能为空",museumName:a,fieldName:"场景列表"});const o=new Set;n.scenes.forEach((l,c)=>{var g;const d=`${r}.scenes[${c}]`,h=l.name&&typeof l.name=="string"?l.name:void 0;!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:"MISSING_SCENE_ID",path:`${d}.id`,message:"id 必须是非空字符串",museumName:a,sceneName:h,fieldName:"场景 ID"}):(o.has(l.id)&&e.push({code:"DUPLICATE_SCENE_ID",path:`${d}.id`,message:`场景 ID "${l.id}" 在博物馆内重复`,museumName:a,sceneName:h,fieldName:"场景 ID"}),o.add(l.id)),(!l.name||typeof l.name!="string"||l.name.trim()==="")&&e.push({code:"MISSING_SCENE_NAME",path:`${d}.name`,message:"name 必须是非空字符串",museumName:a,sceneName:void 0,fieldName:"场景名称"});const p=!!l.pano,f=!!l.panoLow,_=!!((g=l.panoTiles)!=null&&g.manifest);if(!p&&!f&&!_?e.push({code:"MISSING_PANO",path:`${d}.pano`,message:"pano / panoLow / panoTiles 至少需要提供一个",museumName:a,sceneName:h,fieldName:"全景图"}):(l.pano&&(typeof l.pano!="string"||l.pano.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${d}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"高清全景图"}),l.panoLow&&(typeof l.panoLow!="string"||l.panoLow.trim()==="")&&e.push({code:"INVALID_PANOLOW_URL",path:`${d}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"低清全景图"}),l.panoTiles&&(typeof l.panoTiles!="object"?e.push({code:"INVALID_PANO_URL",path:`${d}.panoTiles`,message:"panoTiles 必须是对象，包含 manifest",museumName:a,sceneName:h,fieldName:"瓦片元数据"}):(!l.panoTiles.manifest||typeof l.panoTiles.manifest!="string"||l.panoTiles.manifest.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${d}.panoTiles.manifest`,message:"panoTiles.manifest 必须是有效的字符串",museumName:a,sceneName:h,fieldName:"瓦片 manifest"}))),(!l.thumb||typeof l.thumb!="string"||l.thumb.trim()==="")&&e.push({code:"MISSING_THUMB",path:`${d}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"缩略图"}),!l.initialView||typeof l.initialView!="object"?e.push({code:"MISSING_INITIAL_VIEW",path:`${d}.initialView`,message:"initialView 必须是对象",museumName:a,sceneName:h,fieldName:"初始视角"}):(typeof l.initialView.yaw!="number"&&e.push({code:"INVALID_YAW",path:`${d}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:a,sceneName:h,fieldName:"水平角度"}),typeof l.initialView.pitch!="number"&&e.push({code:"INVALID_PITCH",path:`${d}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:a,sceneName:h,fieldName:"垂直角度"}),l.initialView.fov!==void 0&&typeof l.initialView.fov!="number"&&e.push({code:"INVALID_FOV",path:`${d}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:a,sceneName:h,fieldName:"视野角度"})),!l.mapPoint||typeof l.mapPoint!="object"?e.push({code:"MISSING_MAP_POINT",path:`${d}.mapPoint`,message:"mapPoint 必须是对象",museumName:a,sceneName:h,fieldName:"地图点位"}):(typeof l.mapPoint.x!="number"&&e.push({code:"INVALID_MAP_POINT_X",path:`${d}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:a,sceneName:h,fieldName:"地图点位 X 坐标"}),typeof l.mapPoint.y!="number"&&e.push({code:"INVALID_MAP_POINT_Y",path:`${d}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:a,sceneName:h,fieldName:"地图点位 Y 坐标"})),!Array.isArray(l.hotspots))e.push({code:"HOTSPOTS_NOT_ARRAY",path:`${d}.hotspots`,message:"hotspots 必须是数组",museumName:a,sceneName:h,fieldName:"热点列表"});else{const m=new Set;l.hotspots.forEach((u,b)=>{const y=`${d}.hotspots[${b}]`;!u.id||typeof u.id!="string"||u.id.trim()===""?e.push({code:"MISSING_HOTSPOT_ID",path:`${y}.id`,message:"id 必须是非空字符串",museumName:a,sceneName:h,fieldName:"热点 ID"}):(m.has(u.id)&&e.push({code:"DUPLICATE_HOTSPOT_ID",path:`${y}.id`,message:`热点 ID "${u.id}" 在场景内重复`,museumName:a,sceneName:h,fieldName:"热点 ID"}),m.add(u.id)),u.type!=="scene"&&u.type!=="video"&&u.type!=="image"&&u.type!=="info"&&e.push({code:"INVALID_HOTSPOT_TYPE",path:`${y}.type`,message:'type 必须是 "scene"、"video"、"image" 或 "info"',museumName:a,sceneName:h,fieldName:"热点类型"}),(!u.label||typeof u.label!="string"||u.label.trim()==="")&&e.push({code:"MISSING_HOTSPOT_LABEL",path:`${y}.label`,message:"label 必须是非空字符串",museumName:a,sceneName:h,fieldName:"热点标签"}),typeof u.yaw!="number"&&e.push({code:"INVALID_HOTSPOT_YAW",path:`${y}.yaw`,message:"yaw 必须是数字",museumName:a,sceneName:h,fieldName:"热点水平角度"}),typeof u.pitch!="number"&&e.push({code:"INVALID_HOTSPOT_PITCH",path:`${y}.pitch`,message:"pitch 必须是数字",museumName:a,sceneName:h,fieldName:"热点垂直角度"}),u.type==="scene"?!u.target||typeof u.target!="object"?e.push({code:"MISSING_HOTSPOT_TARGET",path:`${y}.target`,message:"scene 类型热点必须提供 target 对象",museumName:a,sceneName:h,fieldName:"热点目标配置"}):((!u.target.museumId||typeof u.target.museumId!="string")&&e.push({code:"MISSING_TARGET_MUSEUM_ID",path:`${y}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:a,sceneName:h,fieldName:"目标博物馆 ID"}),typeof u.target.sceneId!="string"&&e.push({code:"MISSING_TARGET_SCENE_ID",path:`${y}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）",museumName:a,sceneName:h,fieldName:"目标场景 ID"}),u.target.yaw!==void 0&&typeof u.target.yaw!="number"&&e.push({code:"INVALID_TARGET_YAW",path:`${y}.target.yaw`,message:"target.yaw 必须是数字",museumName:a,sceneName:h,fieldName:"目标水平角度"}),u.target.pitch!==void 0&&typeof u.target.pitch!="number"&&e.push({code:"INVALID_TARGET_PITCH",path:`${y}.target.pitch`,message:"target.pitch 必须是数字",museumName:a,sceneName:h,fieldName:"目标垂直角度"}),u.target.fov!==void 0&&typeof u.target.fov!="number"&&e.push({code:"INVALID_TARGET_FOV",path:`${y}.target.fov`,message:"target.fov 必须是数字",museumName:a,sceneName:h,fieldName:"目标视野角度"})):u.type==="video"&&u.target&&typeof u.target!="object"&&e.push({code:"MISSING_HOTSPOT_TARGET",path:`${y}.target`,message:"video 类型热点的 target 必须是对象（如果提供）",museumName:a,sceneName:h,fieldName:"热点目标配置"})})}})}}),e}let Zn=null;async function go(){if(Zn)return Zn;try{const s=await fetch("./config.json",{cache:"no-store"});if(!s.ok)throw new Error(`加载配置失败: ${s.status}`);const e=await s.json(),t=Cc(e);if(t.length>0){const n=new Error("配置校验失败");throw n.validationErrors=t,n}return Zn=e,Zn}catch(s){throw console.error("加载配置失败:",s),s}}function vo(){Zn=null}function ya(s){if(Zn)return Zn.museums.find(e=>e.id===s)}function Kd(s,e){const t=ya(s);if(t)return t.scenes.find(n=>n.id===e)}function Ic(s){const e=new URL(window.location.href);return e.search="",Object.entries(s).forEach(([t,n])=>{n!=null&&n!==""&&e.searchParams.set(t,String(n))}),e.pathname+e.search+e.hash}function Zd(){return window.location.pathname}function Jd(){if(window.location.pathname.includes("//")){const s=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",s+window.location.search+window.location.hash)}}let _o=null,yo=0;const Qd=200;function en(s){if(s.type==="focus"){const e=`${s.museumId}:${s.sceneId}`,t=Date.now();if(e===_o&&t-yo<Qd)return;_o=e,yo=t}window.dispatchEvent(new CustomEvent("vr:scene-focus",{detail:s}))}function yr(s){const e=t=>{s(t.detail)};return window.addEventListener("vr:scene-focus",e),()=>{window.removeEventListener("vr:scene-focus",e)}}function xo(){const s=new URLSearchParams(window.location.search),e=s.get("yaw"),t=s.get("pitch"),n=s.get("fov");return{museumId:s.get("museum")||void 0,sceneId:s.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:t?parseFloat(t):void 0,fov:n?parseFloat(n):void 0}}function eh(){return new URLSearchParams(window.location.search).get("debug")==="1"}function th(){const s=new URLSearchParams(window.location.search);return s.get("editor")==="1"||s.get("debug")==="1"}function bo(){const s=Zd();window.history.pushState({},"",s),window.dispatchEvent(new Event("popstate"))}function xa(s){const e=Ic({museum:s});window.history.pushState({},"",e),window.dispatchEvent(new Event("popstate"))}function Qt(s,e,t){const n=Ic({museum:s,scene:e,yaw:t==null?void 0:t.yaw,pitch:t==null?void 0:t.pitch,fov:t==null?void 0:t.fov});window.history.pushState({},"",n),en({type:"focus",museumId:s,sceneId:e,source:"dock",ts:Date.now()}),window.dispatchEvent(new Event("popstate"))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fa="160",fy={ROTATE:0,DOLLY:1,PAN:2},my={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nh=0,Eo=1,ih=2,Lc=1,sh=2,vn=3,Fn=0,Ut=1,an=2,Un=0,Pi=1,So=2,Mo=3,wo=4,rh=5,jn=100,ah=101,oh=102,To=103,Ao=104,lh=200,ch=201,dh=202,hh=203,ba=204,Ea=205,uh=206,ph=207,fh=208,mh=209,gh=210,vh=211,_h=212,yh=213,xh=214,bh=0,Eh=1,Sh=2,rr=3,Mh=4,wh=5,Th=6,Ah=7,Rc=0,Ch=1,Ih=2,bn=0,Lh=1,Rh=2,Ph=3,Pc=4,Nh=5,Dh=6,Co="attached",Uh="detached",Nc=300,Ui=301,Oi=302,Sa=303,Ma=304,xr=306,wa=1e3,pt=1001,Ta=1002,St=1003,Io=1004,Rr=1005,kt=1006,Oh=1007,ni=1008,On=1009,kh=1010,Fh=1011,Ba=1012,Dc=1013,Pn=1014,_n=1015,os=1016,Uc=1017,Oc=1018,Qn=1020,Bh=1021,Xt=1023,Vh=1024,Hh=1025,ei=1026,ki=1027,zh=1028,kc=1029,Gh=1030,Fc=1031,Bc=1033,Pr=33776,Nr=33777,Dr=33778,Ur=33779,Lo=35840,Ro=35841,Po=35842,No=35843,Vc=36196,Do=37492,Uo=37496,Oo=37808,ko=37809,Fo=37810,Bo=37811,Vo=37812,Ho=37813,zo=37814,Go=37815,Wo=37816,Yo=37817,Xo=37818,$o=37819,qo=37820,jo=37821,Or=36492,Ko=36494,Zo=36495,Wh=36283,Jo=36284,Qo=36285,el=36286,ar=2300,or=2301,kr=2302,tl=2400,nl=2401,il=2402,Yh=2500,gy=0,vy=1,_y=2,Hc=3e3,En=3001,Xh=3200,$h=3201,zc=0,qh=1,$t="",ft="srgb",Sn="srgb-linear",Va="display-p3",br="display-p3-linear",lr="linear",nt="srgb",cr="rec709",dr="p3",ri=7680,sl=519,jh=512,Kh=513,Zh=514,Gc=515,Jh=516,Qh=517,eu=518,tu=519,Aa=35044,rl="300 es",Ca=1035,yn=2e3,hr=2001;class Hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let al=1234567;const is=Math.PI/180,Fi=180/Math.PI;function tn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[s&255]+Tt[s>>8&255]+Tt[s>>16&255]+Tt[s>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function Mt(s,e,t){return Math.max(e,Math.min(t,s))}function Ha(s,e){return(s%e+e)%e}function nu(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function iu(s,e,t){return s!==e?(t-s)/(e-s):0}function ss(s,e,t){return(1-t)*s+t*e}function su(s,e,t,n){return ss(s,e,1-Math.exp(-t*n))}function ru(s,e=1){return e-Math.abs(Ha(s,e*2)-e)}function au(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function ou(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function lu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function cu(s,e){return s+Math.random()*(e-s)}function du(s){return s*(.5-Math.random())}function hu(s){s!==void 0&&(al=s);let e=al+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function uu(s){return s*is}function pu(s){return s*Fi}function Ia(s){return(s&s-1)===0&&s!==0}function fu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ur(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function mu(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),h=r((e-n)/2),p=a((e-n)/2),f=r((n-e)/2),_=a((n-e)/2);switch(i){case"XYX":s.set(o*d,l*h,l*p,o*c);break;case"YZY":s.set(l*p,o*d,l*h,o*c);break;case"ZXZ":s.set(l*h,l*p,o*d,o*c);break;case"XZX":s.set(o*d,l*_,l*f,o*c);break;case"YXY":s.set(l*f,o*d,l*_,o*c);break;case"ZYZ":s.set(l*_,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function on(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function qe(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const gt={DEG2RAD:is,RAD2DEG:Fi,generateUUID:tn,clamp:Mt,euclideanModulo:Ha,mapLinear:nu,inverseLerp:iu,lerp:ss,damp:su,pingpong:ru,smoothstep:au,smootherstep:ou,randInt:lu,randFloat:cu,randFloatSpread:du,seededRandom:hu,degToRad:uu,radToDeg:pu,isPowerOfTwo:Ia,ceilPowerOfTwo:fu,floorPowerOfTwo:ur,setQuaternionFromProperEuler:mu,normalize:qe,denormalize:on};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,i,r,a,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=i,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],h=n[7],p=n[2],f=n[5],_=n[8],g=i[0],m=i[3],u=i[6],b=i[1],y=i[4],T=i[7],I=i[2],C=i[5],A=i[8];return r[0]=a*g+o*b+l*I,r[3]=a*m+o*y+l*C,r[6]=a*u+o*T+l*A,r[1]=c*g+d*b+h*I,r[4]=c*m+d*y+h*C,r[7]=c*u+d*T+h*A,r[2]=p*g+f*b+_*I,r[5]=p*m+f*y+_*C,r[8]=p*u+f*T+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,p=o*l-d*r,f=c*r-a*l,_=t*h+n*p+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(i*c-d*n)*g,e[2]=(o*n-i*a)*g,e[3]=p*g,e[4]=(d*t-i*l)*g,e[5]=(i*r-o*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Fr.makeScale(e,t)),this}rotate(e){return this.premultiply(Fr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Fr=new Ve;function Wc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ls(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function gu(){const s=ls("canvas");return s.style.display="block",s}const ol={};function rs(s){s in ol||(ol[s]=!0,console.warn(s))}const ll=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),cl=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ys={[Sn]:{transfer:lr,primaries:cr,toReference:s=>s,fromReference:s=>s},[ft]:{transfer:nt,primaries:cr,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[br]:{transfer:lr,primaries:dr,toReference:s=>s.applyMatrix3(cl),fromReference:s=>s.applyMatrix3(ll)},[Va]:{transfer:nt,primaries:dr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(cl),fromReference:s=>s.applyMatrix3(ll).convertLinearToSRGB()}},vu=new Set([Sn,br]),Ke={enabled:!0,_workingColorSpace:Sn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!vu.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=ys[e].toReference,i=ys[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return ys[s].primaries},getTransfer:function(s){return s===$t?lr:ys[s].transfer}};function Ni(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Br(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ai;class Yc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ai===void 0&&(ai=ls("canvas")),ai.width=e.width,ai.height=e.height;const n=ai.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ai}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ls("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Ni(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ni(t[n]/255)*255):t[n]=Ni(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _u=0;class Xc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=tn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Vr(i[a].image)):r.push(Vr(i[a]))}else r=Vr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Vr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Yc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let yu=0;class It extends Hi{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=pt,i=pt,r=kt,a=ni,o=Xt,l=On,c=It.DEFAULT_ANISOTROPY,d=$t){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=tn(),this.name="",this.source=new Xc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(rs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===En?ft:$t),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wa:e.x=e.x-Math.floor(e.x);break;case pt:e.x=e.x<0?0:1;break;case Ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wa:e.y=e.y-Math.floor(e.y);break;case pt:e.y=e.y<0?0:1;break;case Ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return rs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ft?En:Hc}set encoding(e){rs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===En?ft:$t}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=Nc;It.DEFAULT_ANISOTROPY=1;class Je{constructor(e=0,t=0,n=0,i=1){Je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],d=l[4],h=l[8],p=l[1],f=l[5],_=l[9],g=l[2],m=l[6],u=l[10];if(Math.abs(d-p)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+p)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,T=(f+1)/2,I=(u+1)/2,C=(d+p)/4,A=(h+g)/4,H=(_+m)/4;return y>T&&y>I?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=C/n,r=A/n):T>I?T<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(T),n=C/i,r=H/i):I<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(I),n=A/r,i=H/r),this.set(n,i,r,t),this}let b=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(p-d)*(p-d));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(h-g)/b,this.z=(p-d)/b,this.w=Math.acos((c+f+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xu extends Hi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(rs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===En?ft:$t),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new It(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Xc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class $c extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=pt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bu extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=pt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],d=n[i+2],h=n[i+3];const p=r[a+0],f=r[a+1],_=r[a+2],g=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=p,e[t+1]=f,e[t+2]=_,e[t+3]=g;return}if(h!==g||l!==p||c!==f||d!==_){let m=1-o;const u=l*p+c*f+d*_+h*g,b=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const I=Math.sqrt(y),C=Math.atan2(I,u*b);m=Math.sin(m*C)/I,o=Math.sin(o*C)/I}const T=o*b;if(l=l*m+p*T,c=c*m+f*T,d=d*m+_*T,h=h*m+g*T,m===1-o){const I=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=I,c*=I,d*=I,h*=I}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],d=n[i+3],h=r[a],p=r[a+1],f=r[a+2],_=r[a+3];return e[t]=o*_+d*h+l*f-c*p,e[t+1]=l*_+d*p+c*h-o*f,e[t+2]=c*_+d*f+o*p-l*h,e[t+3]=d*_-o*h-l*p-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(i/2),h=o(r/2),p=l(n/2),f=l(i/2),_=l(r/2);switch(a){case"XYZ":this._x=p*d*h+c*f*_,this._y=c*f*h-p*d*_,this._z=c*d*_+p*f*h,this._w=c*d*h-p*f*_;break;case"YXZ":this._x=p*d*h+c*f*_,this._y=c*f*h-p*d*_,this._z=c*d*_-p*f*h,this._w=c*d*h+p*f*_;break;case"ZXY":this._x=p*d*h-c*f*_,this._y=c*f*h+p*d*_,this._z=c*d*_+p*f*h,this._w=c*d*h-p*f*_;break;case"ZYX":this._x=p*d*h-c*f*_,this._y=c*f*h+p*d*_,this._z=c*d*_-p*f*h,this._w=c*d*h+p*f*_;break;case"YZX":this._x=p*d*h+c*f*_,this._y=c*f*h+p*d*_,this._z=c*d*_-p*f*h,this._w=c*d*h-p*f*_;break;case"XZY":this._x=p*d*h-c*f*_,this._y=c*f*h-p*d*_,this._z=c*d*_+p*f*h,this._w=c*d*h+p*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],p=n+o+h;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(d-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+i*c-r*l,this._y=i*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-i*o,this._w=a*d-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-t)*d)/c,p=Math.sin(t*d)/c;return this._w=a*h+this._w*p,this._x=n*h+this._x*p,this._y=i*h+this._y*p,this._z=r*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(e=0,t=0,n=0){R.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),d=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*d,this.y=n+l*d+o*c-r*h,this.z=i+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Hr.copy(this).projectOnVector(e),this.sub(Hr)}reflect(e){return this.sub(Hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new R,dl=new Mn;class ln{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,jt):jt.fromBufferAttribute(r,a),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xs.copy(n.boundingBox)),xs.applyMatrix4(e.matrixWorld),this.union(xs)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($i),bs.subVectors(this.max,$i),oi.subVectors(e.a,$i),li.subVectors(e.b,$i),ci.subVectors(e.c,$i),Tn.subVectors(li,oi),An.subVectors(ci,li),zn.subVectors(oi,ci);let t=[0,-Tn.z,Tn.y,0,-An.z,An.y,0,-zn.z,zn.y,Tn.z,0,-Tn.x,An.z,0,-An.x,zn.z,0,-zn.x,-Tn.y,Tn.x,0,-An.y,An.x,0,-zn.y,zn.x,0];return!zr(t,oi,li,ci,bs)||(t=[1,0,0,0,1,0,0,0,1],!zr(t,oi,li,ci,bs))?!1:(Es.crossVectors(Tn,An),t=[Es.x,Es.y,Es.z],zr(t,oi,li,ci,bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hn=[new R,new R,new R,new R,new R,new R,new R,new R],jt=new R,xs=new ln,oi=new R,li=new R,ci=new R,Tn=new R,An=new R,zn=new R,$i=new R,bs=new R,Es=new R,Gn=new R;function zr(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Gn.fromArray(s,r);const o=i.x*Math.abs(Gn.x)+i.y*Math.abs(Gn.y)+i.z*Math.abs(Gn.z),l=e.dot(Gn),c=t.dot(Gn),d=n.dot(Gn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Eu=new ln,qi=new R,Gr=new R;class wn{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Eu.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qi.subVectors(e,this.center);const t=qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(qi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qi.copy(e.center).add(Gr)),this.expandByPoint(qi.copy(e.center).sub(Gr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const un=new R,Wr=new R,Ss=new R,Cn=new R,Yr=new R,Ms=new R,Xr=new R;class us{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(un.copy(this.origin).addScaledVector(this.direction,t),un.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Wr.copy(e).add(t).multiplyScalar(.5),Ss.copy(t).sub(e).normalize(),Cn.copy(this.origin).sub(Wr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ss),o=Cn.dot(this.direction),l=-Cn.dot(Ss),c=Cn.lengthSq(),d=Math.abs(1-a*a);let h,p,f,_;if(d>0)if(h=a*l-o,p=a*o-l,_=r*d,h>=0)if(p>=-_)if(p<=_){const g=1/d;h*=g,p*=g,f=h*(h+a*p+2*o)+p*(a*h+p+2*l)+c}else p=r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;else p=-r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;else p<=-_?(h=Math.max(0,-(-a*r+o)),p=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+p*(p+2*l)+c):p<=_?(h=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(h=Math.max(0,-(a*r+o)),p=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+p*(p+2*l)+c);else p=a>0?-r:r,h=Math.max(0,-(a*p+o)),f=-h*h+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Wr).addScaledVector(Ss,p),f}intersectSphere(e,t){un.subVectors(e.center,this.origin);const n=un.dot(this.direction),i=un.dot(un)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,i=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,i=(e.min.x-p.x)*c),d>=0?(r=(e.min.y-p.y)*d,a=(e.max.y-p.y)*d):(r=(e.max.y-p.y)*d,a=(e.min.y-p.y)*d),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(o=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,un)!==null}intersectTriangle(e,t,n,i,r){Yr.subVectors(t,e),Ms.subVectors(n,e),Xr.crossVectors(Yr,Ms);let a=this.direction.dot(Xr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Cn.subVectors(this.origin,e);const l=o*this.direction.dot(Ms.crossVectors(Cn,Ms));if(l<0)return null;const c=o*this.direction.dot(Yr.cross(Cn));if(c<0||l+c>a)return null;const d=-o*Cn.dot(Xr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ge{constructor(e,t,n,i,r,a,o,l,c,d,h,p,f,_,g,m){Ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,d,h,p,f,_,g,m)}set(e,t,n,i,r,a,o,l,c,d,h,p,f,_,g,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=i,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=p,u[3]=f,u[7]=_,u[11]=g,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ge().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/di.setFromMatrixColumn(e,0).length(),r=1/di.setFromMatrixColumn(e,1).length(),a=1/di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const p=a*d,f=a*h,_=o*d,g=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+_*c,t[5]=p-g*c,t[9]=-o*l,t[2]=g-p*c,t[6]=_+f*c,t[10]=a*l}else if(e.order==="YXZ"){const p=l*d,f=l*h,_=c*d,g=c*h;t[0]=p+g*o,t[4]=_*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-_,t[6]=g+p*o,t[10]=a*l}else if(e.order==="ZXY"){const p=l*d,f=l*h,_=c*d,g=c*h;t[0]=p-g*o,t[4]=-a*h,t[8]=_+f*o,t[1]=f+_*o,t[5]=a*d,t[9]=g-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const p=a*d,f=a*h,_=o*d,g=o*h;t[0]=l*d,t[4]=_*c-f,t[8]=p*c+g,t[1]=l*h,t[5]=g*c+p,t[9]=f*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const p=a*l,f=a*c,_=o*l,g=o*c;t[0]=l*d,t[4]=g-p*h,t[8]=_*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*h+_,t[10]=p-g*h}else if(e.order==="XZY"){const p=a*l,f=a*c,_=o*l,g=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=p*h+g,t[5]=a*d,t[9]=f*h-_,t[2]=_*h-f,t[6]=o*d,t[10]=g*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Su,e,Mu)}lookAt(e,t,n){const i=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),In.crossVectors(n,Bt),In.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),In.crossVectors(n,Bt)),In.normalize(),ws.crossVectors(Bt,In),i[0]=In.x,i[4]=ws.x,i[8]=Bt.x,i[1]=In.y,i[5]=ws.y,i[9]=Bt.y,i[2]=In.z,i[6]=ws.z,i[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],h=n[5],p=n[9],f=n[13],_=n[2],g=n[6],m=n[10],u=n[14],b=n[3],y=n[7],T=n[11],I=n[15],C=i[0],A=i[4],H=i[8],E=i[12],w=i[1],D=i[5],G=i[9],te=i[13],P=i[2],U=i[6],W=i[10],$=i[14],X=i[3],Y=i[7],Z=i[11],ee=i[15];return r[0]=a*C+o*w+l*P+c*X,r[4]=a*A+o*D+l*U+c*Y,r[8]=a*H+o*G+l*W+c*Z,r[12]=a*E+o*te+l*$+c*ee,r[1]=d*C+h*w+p*P+f*X,r[5]=d*A+h*D+p*U+f*Y,r[9]=d*H+h*G+p*W+f*Z,r[13]=d*E+h*te+p*$+f*ee,r[2]=_*C+g*w+m*P+u*X,r[6]=_*A+g*D+m*U+u*Y,r[10]=_*H+g*G+m*W+u*Z,r[14]=_*E+g*te+m*$+u*ee,r[3]=b*C+y*w+T*P+I*X,r[7]=b*A+y*D+T*U+I*Y,r[11]=b*H+y*G+T*W+I*Z,r[15]=b*E+y*te+T*$+I*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],p=e[10],f=e[14],_=e[3],g=e[7],m=e[11],u=e[15];return _*(+r*l*h-i*c*h-r*o*p+n*c*p+i*o*f-n*l*f)+g*(+t*l*f-t*c*p+r*a*p-i*a*f+i*c*d-r*l*d)+m*(+t*c*h-t*o*f-r*a*h+n*a*f+r*o*d-n*c*d)+u*(-i*o*d-t*l*h+t*o*p+i*a*h-n*a*p+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],p=e[10],f=e[11],_=e[12],g=e[13],m=e[14],u=e[15],b=h*m*c-g*p*c+g*l*f-o*m*f-h*l*u+o*p*u,y=_*p*c-d*m*c-_*l*f+a*m*f+d*l*u-a*p*u,T=d*g*c-_*h*c+_*o*f-a*g*f-d*o*u+a*h*u,I=_*h*l-d*g*l-_*o*p+a*g*p+d*o*m-a*h*m,C=t*b+n*y+i*T+r*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=b*A,e[1]=(g*p*r-h*m*r-g*i*f+n*m*f+h*i*u-n*p*u)*A,e[2]=(o*m*r-g*l*r+g*i*c-n*m*c-o*i*u+n*l*u)*A,e[3]=(h*l*r-o*p*r-h*i*c+n*p*c+o*i*f-n*l*f)*A,e[4]=y*A,e[5]=(d*m*r-_*p*r+_*i*f-t*m*f-d*i*u+t*p*u)*A,e[6]=(_*l*r-a*m*r-_*i*c+t*m*c+a*i*u-t*l*u)*A,e[7]=(a*p*r-d*l*r+d*i*c-t*p*c-a*i*f+t*l*f)*A,e[8]=T*A,e[9]=(_*h*r-d*g*r-_*n*f+t*g*f+d*n*u-t*h*u)*A,e[10]=(a*g*r-_*o*r+_*n*c-t*g*c-a*n*u+t*o*u)*A,e[11]=(d*o*r-a*h*r-d*n*c+t*h*c+a*n*f-t*o*f)*A,e[12]=I*A,e[13]=(d*g*i-_*h*i+_*n*p-t*g*p-d*n*m+t*h*m)*A,e[14]=(_*o*i-a*g*i-_*n*l+t*g*l+a*n*m-t*o*m)*A,e[15]=(a*h*i-d*o*i+d*n*l-t*h*l-a*n*p+t*o*p)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,d*o+n,d*l-i*a,0,c*l-i*o,d*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,p=r*c,f=r*d,_=r*h,g=a*d,m=a*h,u=o*h,b=l*c,y=l*d,T=l*h,I=n.x,C=n.y,A=n.z;return i[0]=(1-(g+u))*I,i[1]=(f+T)*I,i[2]=(_-y)*I,i[3]=0,i[4]=(f-T)*C,i[5]=(1-(p+u))*C,i[6]=(m+b)*C,i[7]=0,i[8]=(_+y)*A,i[9]=(m-b)*A,i[10]=(1-(p+g))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=di.set(i[0],i[1],i[2]).length();const a=di.set(i[4],i[5],i[6]).length(),o=di.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Kt.copy(this);const c=1/r,d=1/a,h=1/o;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=d,Kt.elements[5]*=d,Kt.elements[6]*=d,Kt.elements[8]*=h,Kt.elements[9]*=h,Kt.elements[10]*=h,t.setFromRotationMatrix(Kt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=yn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-i),h=(t+e)/(t-e),p=(n+i)/(n-i);let f,_;if(o===yn)f=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===hr)f=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=yn){const l=this.elements,c=1/(t-e),d=1/(n-i),h=1/(a-r),p=(t+e)*c,f=(n+i)*d;let _,g;if(o===yn)_=(a+r)*h,g=-2*h;else if(o===hr)_=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const di=new R,Kt=new Ge,Su=new R(0,0,0),Mu=new R(1,1,1),In=new R,ws=new R,Bt=new R,hl=new Ge,ul=new Mn;class ps{constructor(e=0,t=0,n=0,i=ps.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],d=i[9],h=i[2],p=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ul.setFromEuler(this),this.setFromQuaternion(ul,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ps.DEFAULT_ORDER="XYZ";class za{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wu=0;const pl=new R,hi=new Mn,pn=new Ge,Ts=new R,ji=new R,Tu=new R,Au=new Mn,fl=new R(1,0,0),ml=new R(0,1,0),gl=new R(0,0,1),Cu={type:"added"},Iu={type:"removed"};class ht extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ht.DEFAULT_UP.clone();const e=new R,t=new ps,n=new Mn,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ge},normalMatrix:{value:new Ve}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new za,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(fl,e)}rotateY(e){return this.rotateOnAxis(ml,e)}rotateZ(e){return this.rotateOnAxis(gl,e)}translateOnAxis(e,t){return pl.copy(e).applyQuaternion(this.quaternion),this.position.add(pl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fl,e)}translateY(e){return this.translateOnAxis(ml,e)}translateZ(e){return this.translateOnAxis(gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ts.copy(e):Ts.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(ji,Ts,this.up):pn.lookAt(Ts,ji,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),hi.setFromRotationMatrix(pn),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Cu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Iu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,e,Tu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,Au,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),p=a(e.skeletons),f=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ht.DEFAULT_UP=new R(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new R,fn=new R,$r=new R,mn=new R,ui=new R,pi=new R,vl=new R,qr=new R,jr=new R,Kr=new R;let As=!1;class Yt{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Zt.subVectors(e,t),i.cross(Zt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Zt.subVectors(i,t),fn.subVectors(n,t),$r.subVectors(e,t);const a=Zt.dot(Zt),o=Zt.dot(fn),l=Zt.dot($r),c=fn.dot(fn),d=fn.dot($r),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const p=1/h,f=(c*l-o*d)*p,_=(a*d-o*l)*p;return r.set(1-f-_,_,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getUV(e,t,n,i,r,a,o,l){return As===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),As=!0),this.getInterpolation(e,t,n,i,r,a,o,l)}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mn.x),l.addScaledVector(a,mn.y),l.addScaledVector(o,mn.z),l)}static isFrontFacing(e,t,n,i){return Zt.subVectors(n,t),fn.subVectors(e,t),Zt.cross(fn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),Zt.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return As===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),As=!0),Yt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;ui.subVectors(i,n),pi.subVectors(r,n),qr.subVectors(e,n);const l=ui.dot(qr),c=pi.dot(qr);if(l<=0&&c<=0)return t.copy(n);jr.subVectors(e,i);const d=ui.dot(jr),h=pi.dot(jr);if(d>=0&&h<=d)return t.copy(i);const p=l*h-d*c;if(p<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(ui,a);Kr.subVectors(e,r);const f=ui.dot(Kr),_=pi.dot(Kr);if(_>=0&&f<=_)return t.copy(r);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(pi,o);const m=d*_-f*h;if(m<=0&&h-d>=0&&f-_>=0)return vl.subVectors(r,i),o=(h-d)/(h-d+(f-_)),t.copy(i).addScaledVector(vl,o);const u=1/(m+g+p);return a=g*u,o=p*u,t.copy(n).addScaledVector(ui,a).addScaledVector(pi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function Zr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class He{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=Ha(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Zr(a,r,e+1/3),this.g=Zr(a,r,e),this.b=Zr(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,i),this}setStyle(e,t=ft){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){const n=qc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=Br(e.r),this.g=Br(e.g),this.b=Br(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return Ke.fromWorkingColorSpace(At.copy(this),e),Math.round(Mt(At.r*255,0,255))*65536+Math.round(Mt(At.g*255,0,255))*256+Math.round(Mt(At.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(At.copy(this),t);const n=At.r,i=At.g,r=At.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=ft){Ke.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,i=At.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Cs);const n=ss(Ln.h,Cs.h,t),i=ss(Ln.s,Cs.s,t),r=ss(Ln.l,Cs.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new He;He.NAMES=qc;let Lu=0;class Bn extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=tn(),this.name="",this.type="Material",this.blending=Pi,this.side=Fn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ba,this.blendDst=Ea,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==Fn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ba&&(n.blendSrc=this.blendSrc),this.blendDst!==Ea&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==rr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class kn extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new R,Is=new Se;class qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Aa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Is.fromBufferAttribute(this,t),Is.applyMatrix3(e),this.setXY(t,Is.x,Is.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=on(t,this.array)),t}setX(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=on(t,this.array)),t}setY(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=on(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=on(t,this.array)),t}setW(e,t){return this.normalized&&(t=qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array),r=qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Aa&&(e.usage=this.usage),e}}class jc extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Kc extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ru=0;const Wt=new Ge,Jr=new ht,fi=new R,Vt=new ln,Ki=new ln,Et=new R;class Ot extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=tn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wc(e)?Kc:jc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return Jr.lookAt(e),Jr.updateMatrix(),this.applyMatrix4(Jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new vt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ki.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Vt.min,Ki.min),Vt.expandByPoint(Et),Et.addVectors(Vt.max,Ki.max),Vt.expandByPoint(Et)):(Vt.expandByPoint(Ki.min),Vt.expandByPoint(Ki.max))}Vt.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Et.fromBufferAttribute(o,c),l&&(fi.fromBufferAttribute(e,c),Et.add(fi)),i=Math.max(i,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let w=0;w<o;w++)c[w]=new R,d[w]=new R;const h=new R,p=new R,f=new R,_=new Se,g=new Se,m=new Se,u=new R,b=new R;function y(w,D,G){h.fromArray(i,w*3),p.fromArray(i,D*3),f.fromArray(i,G*3),_.fromArray(a,w*2),g.fromArray(a,D*2),m.fromArray(a,G*2),p.sub(h),f.sub(h),g.sub(_),m.sub(_);const te=1/(g.x*m.y-m.x*g.y);isFinite(te)&&(u.copy(p).multiplyScalar(m.y).addScaledVector(f,-g.y).multiplyScalar(te),b.copy(f).multiplyScalar(g.x).addScaledVector(p,-m.x).multiplyScalar(te),c[w].add(u),c[D].add(u),c[G].add(u),d[w].add(b),d[D].add(b),d[G].add(b))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let w=0,D=T.length;w<D;++w){const G=T[w],te=G.start,P=G.count;for(let U=te,W=te+P;U<W;U+=3)y(n[U+0],n[U+1],n[U+2])}const I=new R,C=new R,A=new R,H=new R;function E(w){A.fromArray(r,w*3),H.copy(A);const D=c[w];I.copy(D),I.sub(A.multiplyScalar(A.dot(D))).normalize(),C.crossVectors(H,D);const te=C.dot(d[w])<0?-1:1;l[w*4]=I.x,l[w*4+1]=I.y,l[w*4+2]=I.z,l[w*4+3]=te}for(let w=0,D=T.length;w<D;++w){const G=T[w],te=G.start,P=G.count;for(let U=te,W=te+P;U<W;U+=3)E(n[U+0]),E(n[U+1]),E(n[U+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);const i=new R,r=new R,a=new R,o=new R,l=new R,c=new R,d=new R,h=new R;if(e)for(let p=0,f=e.count;p<f;p+=3){const _=e.getX(p+0),g=e.getX(p+1),m=e.getX(p+2);i.fromBufferAttribute(t,_),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=t.count;p<f;p+=3)i.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,p=new c.constructor(l.length*d);let f=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*d;for(let u=0;u<d;u++)p[_++]=c[f++]}return new qt(p,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const p=c[d],f=e(p,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,p=c.length;h<p;h++){const f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(i[l]=d,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const d=i[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let p=0,f=h.length;p<f;p++)d.push(h[p].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _l=new Ge,Wn=new us,Ls=new wn,yl=new R,mi=new R,gi=new R,vi=new R,Qr=new R,Rs=new R,Ps=new Se,Ns=new Se,Ds=new Se,xl=new R,bl=new R,El=new R,Us=new R,Os=new R;class dt extends ht{constructor(e=new Ot,t=new kn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Rs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(Qr.fromBufferAttribute(h,e),a?Rs.addScaledVector(Qr,d):Rs.addScaledVector(Qr.sub(t),d))}t.add(Rs)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere),Ls.applyMatrix4(r),Wn.copy(e.ray).recast(e.near),!(Ls.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(Ls,yl)===null||Wn.origin.distanceToSquared(yl)>(e.far-e.near)**2))&&(_l.copy(r).invert(),Wn.copy(e.ray).applyMatrix4(_l),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const m=p[_],u=a[m.materialIndex],b=Math.max(m.start,f.start),y=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let T=b,I=y;T<I;T+=3){const C=o.getX(T),A=o.getX(T+1),H=o.getX(T+2);i=ks(this,u,e,n,c,d,h,C,A,H),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=_,u=g;m<u;m+=3){const b=o.getX(m),y=o.getX(m+1),T=o.getX(m+2);i=ks(this,a,e,n,c,d,h,b,y,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=p.length;_<g;_++){const m=p[_],u=a[m.materialIndex],b=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let T=b,I=y;T<I;T+=3){const C=T,A=T+1,H=T+2;i=ks(this,u,e,n,c,d,h,C,A,H),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=_,u=g;m<u;m+=3){const b=m,y=m+1,T=m+2;i=ks(this,a,e,n,c,d,h,b,y,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Pu(s,e,t,n,i,r,a,o){let l;if(e.side===Ut?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Fn,o),l===null)return null;Os.copy(o),Os.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Os);return c<t.near||c>t.far?null:{distance:c,point:Os.clone(),object:s}}function ks(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,mi),s.getVertexPosition(l,gi),s.getVertexPosition(c,vi);const d=Pu(s,e,t,n,mi,gi,vi,Us);if(d){i&&(Ps.fromBufferAttribute(i,o),Ns.fromBufferAttribute(i,l),Ds.fromBufferAttribute(i,c),d.uv=Yt.getInterpolation(Us,mi,gi,vi,Ps,Ns,Ds,new Se)),r&&(Ps.fromBufferAttribute(r,o),Ns.fromBufferAttribute(r,l),Ds.fromBufferAttribute(r,c),d.uv1=Yt.getInterpolation(Us,mi,gi,vi,Ps,Ns,Ds,new Se),d.uv2=d.uv1),a&&(xl.fromBufferAttribute(a,o),bl.fromBufferAttribute(a,l),El.fromBufferAttribute(a,c),d.normal=Yt.getInterpolation(Us,mi,gi,vi,xl,bl,El,new R),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new R,materialIndex:0};Yt.getNormal(mi,gi,vi,h.normal),d.face=h}return d}class zi extends Ot{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let p=0,f=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,i,a,2),_("x","z","y",1,-1,e,n,-t,i,a,3),_("x","y","z",1,-1,e,t,n,i,r,4),_("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new vt(c,3)),this.setAttribute("normal",new vt(d,3)),this.setAttribute("uv",new vt(h,2));function _(g,m,u,b,y,T,I,C,A,H,E){const w=T/A,D=I/H,G=T/2,te=I/2,P=C/2,U=A+1,W=H+1;let $=0,X=0;const Y=new R;for(let Z=0;Z<W;Z++){const ee=Z*D-te;for(let de=0;de<U;de++){const z=de*w-G;Y[g]=z*b,Y[m]=ee*y,Y[u]=P,c.push(Y.x,Y.y,Y.z),Y[g]=0,Y[m]=0,Y[u]=C>0?1:-1,d.push(Y.x,Y.y,Y.z),h.push(de/A),h.push(1-Z/H),$+=1}}for(let Z=0;Z<H;Z++)for(let ee=0;ee<A;ee++){const de=p+ee+U*Z,z=p+ee+U*(Z+1),q=p+(ee+1)+U*(Z+1),le=p+(ee+1)+U*Z;l.push(de,z,le),l.push(z,q,le),X+=6}o.addGroup(f,X,E),f+=X,p+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Bi(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Dt(s){const e={};for(let t=0;t<s.length;t++){const n=Bi(s[t]);for(const i in n)e[i]=n[i]}return e}function Nu(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Zc(s){return s.getRenderTarget()===null?s.outputColorSpace:Ke.workingColorSpace}const Du={clone:Bi,merge:Dt};var Uu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ou=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class si extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uu,this.fragmentShader=Ou,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=Nu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Jc extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=yn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ct extends Jc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Fi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(is*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Fi*2*Math.atan(Math.tan(is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(is*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const _i=-90,yi=1;class ku extends ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ct(_i,yi,e,t);i.layers=this.layers,this.add(i);const r=new Ct(_i,yi,e,t);r.layers=this.layers,this.add(r);const a=new Ct(_i,yi,e,t);a.layers=this.layers,this.add(a);const o=new Ct(_i,yi,e,t);o.layers=this.layers,this.add(o);const l=new Ct(_i,yi,e,t);l.layers=this.layers,this.add(l);const c=new Ct(_i,yi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===yn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(h,p,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Qc extends It{constructor(e,t,n,i,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Ui,super(e,t,n,i,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Fu extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(rs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===En?ft:$t),this.texture=new Qc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new zi(5,5,5),r=new si({name:"CubemapFromEquirect",uniforms:Bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:Un});r.uniforms.tEquirect.value=t;const a=new dt(i,r),o=t.minFilter;return t.minFilter===ni&&(t.minFilter=kt),new ku(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const ea=new R,Bu=new R,Vu=new Ve;class Xn{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ea.subVectors(n,t).cross(Bu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ea),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Vu.getNormalMatrix(e),i=this.coplanarPoint(ea).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new wn,Fs=new R;class Ga{constructor(e=new Xn,t=new Xn,n=new Xn,i=new Xn,r=new Xn,a=new Xn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yn){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],d=i[5],h=i[6],p=i[7],f=i[8],_=i[9],g=i[10],m=i[11],u=i[12],b=i[13],y=i[14],T=i[15];if(n[0].setComponents(l-r,p-c,m-f,T-u).normalize(),n[1].setComponents(l+r,p+c,m+f,T+u).normalize(),n[2].setComponents(l+a,p+d,m+_,T+b).normalize(),n[3].setComponents(l-a,p-d,m-_,T-b).normalize(),n[4].setComponents(l-o,p-h,m-g,T-y).normalize(),t===yn)n[5].setComponents(l+o,p+h,m+g,T+y).normalize();else if(t===hr)n[5].setComponents(o,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){return Yn.center.set(0,0,0),Yn.radius=.7071067811865476,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Fs.x=i.normal.x>0?e.max.x:e.min.x,Fs.y=i.normal.y>0?e.max.y:e.min.y,Fs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ed(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Hu(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,d){const h=c.array,p=c.usage,f=h.byteLength,_=s.createBuffer();s.bindBuffer(d,_),s.bufferData(d,h,p),c.onUploadCallback();let g;if(h instanceof Float32Array)g=s.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=s.SHORT;else if(h instanceof Uint32Array)g=s.UNSIGNED_INT;else if(h instanceof Int32Array)g=s.INT;else if(h instanceof Int8Array)g=s.BYTE;else if(h instanceof Uint8Array)g=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,d,h){const p=d.array,f=d._updateRange,_=d.updateRanges;if(s.bindBuffer(h,c),f.count===-1&&_.length===0&&s.bufferSubData(h,0,p),_.length!==0){for(let g=0,m=_.length;g<m;g++){const u=_[g];t?s.bufferSubData(h,u.start*p.BYTES_PER_ELEMENT,p,u.start,u.count):s.bufferSubData(h,u.start*p.BYTES_PER_ELEMENT,p.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}f.count!==-1&&(t?s.bufferSubData(h,f.offset*p.BYTES_PER_ELEMENT,p,f.offset,f.count):s.bufferSubData(h,f.offset*p.BYTES_PER_ELEMENT,p.subarray(f.offset,f.offset+f.count)),f.count=-1),d.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(s.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const p=n.get(c);(!p||p.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,i(c,d));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,d),h.version=c.version}}return{get:a,remove:o,update:l}}class Wa extends Ot{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,d=l+1,h=e/o,p=t/l,f=[],_=[],g=[],m=[];for(let u=0;u<d;u++){const b=u*p-a;for(let y=0;y<c;y++){const T=y*h-r;_.push(T,-b,0),g.push(0,0,1),m.push(y/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let b=0;b<o;b++){const y=b+c*u,T=b+c*(u+1),I=b+1+c*(u+1),C=b+1+c*u;f.push(y,T,C),f.push(T,I,C)}this.setIndex(f),this.setAttribute("position",new vt(_,3)),this.setAttribute("normal",new vt(g,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wa(e.width,e.height,e.widthSegments,e.heightSegments)}}var zu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,$u=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ju=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ku=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ju=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ep=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,np=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,hp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,up=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,pp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_p="gl_FragColor = linearToOutputTexel( gl_FragColor );",yp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ep=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ap=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ip=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Lp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Rp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Np=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Up=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Hp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Wp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$p=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,qp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,jp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Jp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ef=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,sf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,af=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,of=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,df=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,uf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_f=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ef=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Af=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,If=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Pf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Df=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Of=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Hf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Kf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,tm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,om=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,cm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_m=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,De={alphahash_fragment:zu,alphahash_pars_fragment:Gu,alphamap_fragment:Wu,alphamap_pars_fragment:Yu,alphatest_fragment:Xu,alphatest_pars_fragment:$u,aomap_fragment:qu,aomap_pars_fragment:ju,batching_pars_vertex:Ku,batching_vertex:Zu,begin_vertex:Ju,beginnormal_vertex:Qu,bsdfs:ep,iridescence_fragment:tp,bumpmap_pars_fragment:np,clipping_planes_fragment:ip,clipping_planes_pars_fragment:sp,clipping_planes_pars_vertex:rp,clipping_planes_vertex:ap,color_fragment:op,color_pars_fragment:lp,color_pars_vertex:cp,color_vertex:dp,common:hp,cube_uv_reflection_fragment:up,defaultnormal_vertex:pp,displacementmap_pars_vertex:fp,displacementmap_vertex:mp,emissivemap_fragment:gp,emissivemap_pars_fragment:vp,colorspace_fragment:_p,colorspace_pars_fragment:yp,envmap_fragment:xp,envmap_common_pars_fragment:bp,envmap_pars_fragment:Ep,envmap_pars_vertex:Sp,envmap_physical_pars_fragment:Up,envmap_vertex:Mp,fog_vertex:wp,fog_pars_vertex:Tp,fog_fragment:Ap,fog_pars_fragment:Cp,gradientmap_pars_fragment:Ip,lightmap_fragment:Lp,lightmap_pars_fragment:Rp,lights_lambert_fragment:Pp,lights_lambert_pars_fragment:Np,lights_pars_begin:Dp,lights_toon_fragment:Op,lights_toon_pars_fragment:kp,lights_phong_fragment:Fp,lights_phong_pars_fragment:Bp,lights_physical_fragment:Vp,lights_physical_pars_fragment:Hp,lights_fragment_begin:zp,lights_fragment_maps:Gp,lights_fragment_end:Wp,logdepthbuf_fragment:Yp,logdepthbuf_pars_fragment:Xp,logdepthbuf_pars_vertex:$p,logdepthbuf_vertex:qp,map_fragment:jp,map_pars_fragment:Kp,map_particle_fragment:Zp,map_particle_pars_fragment:Jp,metalnessmap_fragment:Qp,metalnessmap_pars_fragment:ef,morphcolor_vertex:tf,morphnormal_vertex:nf,morphtarget_pars_vertex:sf,morphtarget_vertex:rf,normal_fragment_begin:af,normal_fragment_maps:of,normal_pars_fragment:lf,normal_pars_vertex:cf,normal_vertex:df,normalmap_pars_fragment:hf,clearcoat_normal_fragment_begin:uf,clearcoat_normal_fragment_maps:pf,clearcoat_pars_fragment:ff,iridescence_pars_fragment:mf,opaque_fragment:gf,packing:vf,premultiplied_alpha_fragment:_f,project_vertex:yf,dithering_fragment:xf,dithering_pars_fragment:bf,roughnessmap_fragment:Ef,roughnessmap_pars_fragment:Sf,shadowmap_pars_fragment:Mf,shadowmap_pars_vertex:wf,shadowmap_vertex:Tf,shadowmask_pars_fragment:Af,skinbase_vertex:Cf,skinning_pars_vertex:If,skinning_vertex:Lf,skinnormal_vertex:Rf,specularmap_fragment:Pf,specularmap_pars_fragment:Nf,tonemapping_fragment:Df,tonemapping_pars_fragment:Uf,transmission_fragment:Of,transmission_pars_fragment:kf,uv_pars_fragment:Ff,uv_pars_vertex:Bf,uv_vertex:Vf,worldpos_vertex:Hf,background_vert:zf,background_frag:Gf,backgroundCube_vert:Wf,backgroundCube_frag:Yf,cube_vert:Xf,cube_frag:$f,depth_vert:qf,depth_frag:jf,distanceRGBA_vert:Kf,distanceRGBA_frag:Zf,equirect_vert:Jf,equirect_frag:Qf,linedashed_vert:em,linedashed_frag:tm,meshbasic_vert:nm,meshbasic_frag:im,meshlambert_vert:sm,meshlambert_frag:rm,meshmatcap_vert:am,meshmatcap_frag:om,meshnormal_vert:lm,meshnormal_frag:cm,meshphong_vert:dm,meshphong_frag:hm,meshphysical_vert:um,meshphysical_frag:pm,meshtoon_vert:fm,meshtoon_frag:mm,points_vert:gm,points_frag:vm,shadow_vert:_m,shadow_frag:ym,sprite_vert:xm,sprite_frag:bm},se={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},rn={basic:{uniforms:Dt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:Dt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new He(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:Dt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:Dt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:Dt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new He(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:Dt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:Dt([se.points,se.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:Dt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:Dt([se.common,se.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:Dt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:Dt([se.sprite,se.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:Dt([se.common,se.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:Dt([se.lights,se.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};rn.physical={uniforms:Dt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const Bs={r:0,b:0,g:0};function Em(s,e,t,n,i,r,a){const o=new He(0);let l=r===!0?0:1,c,d,h=null,p=0,f=null;function _(m,u){let b=!1,y=u.isScene===!0?u.background:null;y&&y.isTexture&&(y=(u.backgroundBlurriness>0?t:e).get(y)),y===null?g(o,l):y&&y.isColor&&(g(y,1),b=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||b)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===xr)?(d===void 0&&(d=new dt(new zi(1,1,1),new si({name:"BackgroundCubeMaterial",uniforms:Bi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),d.material.uniforms.envMap.value=y,d.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.toneMapped=Ke.getTransfer(y.colorSpace)!==nt,(h!==y||p!==y.version||f!==s.toneMapping)&&(d.material.needsUpdate=!0,h=y,p=y.version,f=s.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new dt(new Wa(2,2),new si({name:"BackgroundMaterial",uniforms:Bi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(y.colorSpace)!==nt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||p!==y.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,p=y.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function g(m,u){m.getRGB(Bs,Zc(s)),n.buffers.color.setClear(Bs.r,Bs.g,Bs.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(m,u=1){o.set(m),l=u,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,g(o,l)},render:_}}function Sm(s,e,t,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null);let c=l,d=!1;function h(P,U,W,$,X){let Y=!1;if(a){const Z=g($,W,U);c!==Z&&(c=Z,f(c.object)),Y=u(P,$,W,X),Y&&b(P,$,W,X)}else{const Z=U.wireframe===!0;(c.geometry!==$.id||c.program!==W.id||c.wireframe!==Z)&&(c.geometry=$.id,c.program=W.id,c.wireframe=Z,Y=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Y||d)&&(d=!1,H(P,U,W,$),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function p(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(P){return n.isWebGL2?s.bindVertexArray(P):r.bindVertexArrayOES(P)}function _(P){return n.isWebGL2?s.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function g(P,U,W){const $=W.wireframe===!0;let X=o[P.id];X===void 0&&(X={},o[P.id]=X);let Y=X[U.id];Y===void 0&&(Y={},X[U.id]=Y);let Z=Y[$];return Z===void 0&&(Z=m(p()),Y[$]=Z),Z}function m(P){const U=[],W=[],$=[];for(let X=0;X<i;X++)U[X]=0,W[X]=0,$[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:W,attributeDivisors:$,object:P,attributes:{},index:null}}function u(P,U,W,$){const X=c.attributes,Y=U.attributes;let Z=0;const ee=W.getAttributes();for(const de in ee)if(ee[de].location>=0){const q=X[de];let le=Y[de];if(le===void 0&&(de==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),de==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),q===void 0||q.attribute!==le||le&&q.data!==le.data)return!0;Z++}return c.attributesNum!==Z||c.index!==$}function b(P,U,W,$){const X={},Y=U.attributes;let Z=0;const ee=W.getAttributes();for(const de in ee)if(ee[de].location>=0){let q=Y[de];q===void 0&&(de==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),de==="instanceColor"&&P.instanceColor&&(q=P.instanceColor));const le={};le.attribute=q,q&&q.data&&(le.data=q.data),X[de]=le,Z++}c.attributes=X,c.attributesNum=Z,c.index=$}function y(){const P=c.newAttributes;for(let U=0,W=P.length;U<W;U++)P[U]=0}function T(P){I(P,0)}function I(P,U){const W=c.newAttributes,$=c.enabledAttributes,X=c.attributeDivisors;W[P]=1,$[P]===0&&(s.enableVertexAttribArray(P),$[P]=1),X[P]!==U&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,U),X[P]=U)}function C(){const P=c.newAttributes,U=c.enabledAttributes;for(let W=0,$=U.length;W<$;W++)U[W]!==P[W]&&(s.disableVertexAttribArray(W),U[W]=0)}function A(P,U,W,$,X,Y,Z){Z===!0?s.vertexAttribIPointer(P,U,W,X,Y):s.vertexAttribPointer(P,U,W,$,X,Y)}function H(P,U,W,$){if(n.isWebGL2===!1&&(P.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();const X=$.attributes,Y=W.getAttributes(),Z=U.defaultAttributeValues;for(const ee in Y){const de=Y[ee];if(de.location>=0){let z=X[ee];if(z===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(z=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(z=P.instanceColor)),z!==void 0){const q=z.normalized,le=z.itemSize,ve=t.get(z);if(ve===void 0)continue;const ge=ve.buffer,Le=ve.type,Pe=ve.bytesPerElement,Me=n.isWebGL2===!0&&(Le===s.INT||Le===s.UNSIGNED_INT||z.gpuType===Dc);if(z.isInterleavedBufferAttribute){const We=z.data,O=We.stride,Lt=z.offset;if(We.isInstancedInterleavedBuffer){for(let ye=0;ye<de.locationSize;ye++)I(de.location+ye,We.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let ye=0;ye<de.locationSize;ye++)T(de.location+ye);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let ye=0;ye<de.locationSize;ye++)A(de.location+ye,le/de.locationSize,Le,q,O*Pe,(Lt+le/de.locationSize*ye)*Pe,Me)}else{if(z.isInstancedBufferAttribute){for(let We=0;We<de.locationSize;We++)I(de.location+We,z.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let We=0;We<de.locationSize;We++)T(de.location+We);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let We=0;We<de.locationSize;We++)A(de.location+We,le/de.locationSize,Le,q,le*Pe,le/de.locationSize*We*Pe,Me)}}else if(Z!==void 0){const q=Z[ee];if(q!==void 0)switch(q.length){case 2:s.vertexAttrib2fv(de.location,q);break;case 3:s.vertexAttrib3fv(de.location,q);break;case 4:s.vertexAttrib4fv(de.location,q);break;default:s.vertexAttrib1fv(de.location,q)}}}}C()}function E(){G();for(const P in o){const U=o[P];for(const W in U){const $=U[W];for(const X in $)_($[X].object),delete $[X];delete U[W]}delete o[P]}}function w(P){if(o[P.id]===void 0)return;const U=o[P.id];for(const W in U){const $=U[W];for(const X in $)_($[X].object),delete $[X];delete U[W]}delete o[P.id]}function D(P){for(const U in o){const W=o[U];if(W[P.id]===void 0)continue;const $=W[P.id];for(const X in $)_($[X].object),delete $[X];delete W[P.id]}}function G(){te(),d=!0,c!==l&&(c=l,f(c.object))}function te(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:G,resetDefaultState:te,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:D,initAttributes:y,enableAttribute:T,disableUnusedAttributes:C}}function Mm(s,e,t,n){const i=n.isWebGL2;let r;function a(d){r=d}function o(d,h){s.drawArrays(r,d,h),t.update(h,r,1)}function l(d,h,p){if(p===0)return;let f,_;if(i)f=s,_="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[_](r,d,h,p),t.update(h,r,p)}function c(d,h,p){if(p===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<p;_++)this.render(d[_],h[_]);else{f.multiDrawArraysWEBGL(r,d,0,h,0,p);let _=0;for(let g=0;g<p;g++)_+=h[g];t.update(_,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function wm(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),u=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=p>0,T=a||e.has("OES_texture_float"),I=y&&T,C=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:p,maxTextureSize:f,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:b,vertexTextures:y,floatFragmentTextures:T,floatVertexTextures:I,maxSamples:C}}function Tm(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Xn,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const f=h.length!==0||p||n!==0||i;return i=p,n=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,p){t=d(h,p,0)},this.setState=function(h,p,f){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,u=s.get(h);if(!i||_===null||_.length===0||r&&!m)r?d(null):c();else{const b=r?0:n,y=b*4;let T=u.clippingState||null;l.value=T,T=d(_,p,y,f);for(let I=0;I!==y;++I)T[I]=t[I];u.clippingState=T,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,p,f,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const u=f+g*4,b=p.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<u)&&(m=new Float32Array(u));for(let y=0,T=f;y!==g;++y,T+=4)a.copy(h[y]).applyMatrix4(b,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Am(s){let e=new WeakMap;function t(a,o){return o===Sa?a.mapping=Ui:o===Ma&&(a.mapping=Oi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Sa||o===Ma)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Fu(l.height/2);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class td extends Jc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ci=4,Sl=[.125,.215,.35,.446,.526,.582],Kn=20,ta=new td,Ml=new He;let na=null,ia=0,sa=0;const $n=(1+Math.sqrt(5))/2,xi=1/$n,wl=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,$n,xi),new R(0,$n,-xi),new R(xi,0,$n),new R(-xi,0,$n),new R($n,xi,0),new R(-$n,xi,0)];class Tl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(na,ia,sa),e.scissorTest=!1,Vs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===Oi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:os,format:Xt,colorSpace:Sn,depthBuffer:!1},i=Al(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cm(r)),this._blurMaterial=Im(r,e,t)}return i}_compileMaterial(e){const t=new dt(this._lodPlanes[0],e);this._renderer.compile(t,ta)}_sceneToCubeUV(e,t,n,i){const o=new Ct(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Ml),d.toneMapping=bn,d.autoClear=!1;const f=new kn({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),_=new dt(new zi,f);let g=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,g=!0):(f.color.copy(Ml),g=!0);for(let u=0;u<6;u++){const b=u%3;b===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):b===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const y=this._cubeSize;Vs(i,b*y,u>2?y:0,y,y),d.setRenderTarget(i),g&&d.render(_,o),d.render(e,o)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=p,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ui||e.mapping===Oi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Il()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Vs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ta)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=wl[(i-1)%wl.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new dt(this._lodPlanes[i],c),p=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Kn-1),g=r/_,m=isFinite(r)?1+Math.floor(d*g):Kn;m>Kn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Kn}`);const u=[];let b=0;for(let A=0;A<Kn;++A){const H=A/g,E=Math.exp(-H*H/2);u.push(E),A===0?b+=E:A<m&&(b+=2*E)}for(let A=0;A<u.length;A++)u[A]=u[A]/b;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:y}=this;p.dTheta.value=_,p.mipInt.value=y-n;const T=this._sizeLods[i],I=3*T*(i>y-Ci?i-y+Ci:0),C=4*(this._cubeSize-T);Vs(t,I,C,3*T,2*T),l.setRenderTarget(t),l.render(h,ta)}}function Cm(s){const e=[],t=[],n=[];let i=s;const r=s-Ci+1+Sl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-Ci?l=Sl[a-s+Ci-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,p=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,_=6,g=3,m=2,u=1,b=new Float32Array(g*_*f),y=new Float32Array(m*_*f),T=new Float32Array(u*_*f);for(let C=0;C<f;C++){const A=C%3*2/3-1,H=C>2?0:-1,E=[A,H,0,A+2/3,H,0,A+2/3,H+1,0,A,H,0,A+2/3,H+1,0,A,H+1,0];b.set(E,g*_*C),y.set(p,m*_*C);const w=[C,C,C,C,C,C];T.set(w,u*_*C)}const I=new Ot;I.setAttribute("position",new qt(b,g)),I.setAttribute("uv",new qt(y,m)),I.setAttribute("faceIndex",new qt(T,u)),e.push(I),i>Ci&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Al(s,e,t){const n=new ii(s,e,t);return n.texture.mapping=xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vs(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Im(s,e,t){const n=new Float32Array(Kn),i=new R(0,1,0);return new si({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Cl(){return new si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Il(){return new si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Ya(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Lm(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Sa||l===Ma,d=l===Ui||l===Oi;if(c||d)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Tl(s)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||d&&h&&i(h)){t===null&&(t=new Tl(s));const p=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,p),o.addEventListener("dispose",r),p.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Rm(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Pm(s,e,t,n){const i={},r=new WeakMap;function a(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const _ in p.attributes)e.remove(p.attributes[_]);for(const _ in p.morphAttributes){const g=p.morphAttributes[_];for(let m=0,u=g.length;m<u;m++)e.remove(g[m])}p.removeEventListener("dispose",a),delete i[p.id];const f=r.get(p);f&&(e.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(h,p){return i[p.id]===!0||(p.addEventListener("dispose",a),i[p.id]=!0,t.memory.geometries++),p}function l(h){const p=h.attributes;for(const _ in p)e.update(p[_],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const _ in f){const g=f[_];for(let m=0,u=g.length;m<u;m++)e.update(g[m],s.ARRAY_BUFFER)}}function c(h){const p=[],f=h.index,_=h.attributes.position;let g=0;if(f!==null){const b=f.array;g=f.version;for(let y=0,T=b.length;y<T;y+=3){const I=b[y+0],C=b[y+1],A=b[y+2];p.push(I,C,C,A,A,I)}}else if(_!==void 0){const b=_.array;g=_.version;for(let y=0,T=b.length/3-1;y<T;y+=3){const I=y+0,C=y+1,A=y+2;p.push(I,C,C,A,A,I)}}else return;const m=new(Wc(p)?Kc:jc)(p,1);m.version=g;const u=r.get(h);u&&e.remove(u),r.set(h,m)}function d(h){const p=r.get(h);if(p){const f=h.index;f!==null&&p.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function Nm(s,e,t,n){const i=n.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function d(f,_){s.drawElements(r,_,o,f*l),t.update(_,r,1)}function h(f,_,g){if(g===0)return;let m,u;if(i)m=s,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](r,_,o,f*l,g),t.update(_,r,g)}function p(f,_,g){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<g;u++)this.render(f[u]/l,_[u]);else{m.multiDrawElementsWEBGL(r,_,0,o,f,0,g);let u=0;for(let b=0;b<g;b++)u+=_[b];t.update(u,r,1)}}this.setMode=a,this.setIndex=c,this.render=d,this.renderInstances=h,this.renderMultiDraw=p}function Dm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Um(s,e){return s[0]-e[0]}function Om(s,e){return Math.abs(e[1])-Math.abs(s[1])}function km(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,a=new Je,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,d,h){const p=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=f!==void 0?f.length:0;let g=r.get(d);if(g===void 0||g.count!==_){let P=function(){G.dispose(),r.delete(d),d.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const b=d.morphAttributes.position!==void 0,y=d.morphAttributes.normal!==void 0,T=d.morphAttributes.color!==void 0,I=d.morphAttributes.position||[],C=d.morphAttributes.normal||[],A=d.morphAttributes.color||[];let H=0;b===!0&&(H=1),y===!0&&(H=2),T===!0&&(H=3);let E=d.attributes.position.count*H,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const D=new Float32Array(E*w*4*_),G=new $c(D,E,w,_);G.type=_n,G.needsUpdate=!0;const te=H*4;for(let U=0;U<_;U++){const W=I[U],$=C[U],X=A[U],Y=E*w*4*U;for(let Z=0;Z<W.count;Z++){const ee=Z*te;b===!0&&(a.fromBufferAttribute(W,Z),D[Y+ee+0]=a.x,D[Y+ee+1]=a.y,D[Y+ee+2]=a.z,D[Y+ee+3]=0),y===!0&&(a.fromBufferAttribute($,Z),D[Y+ee+4]=a.x,D[Y+ee+5]=a.y,D[Y+ee+6]=a.z,D[Y+ee+7]=0),T===!0&&(a.fromBufferAttribute(X,Z),D[Y+ee+8]=a.x,D[Y+ee+9]=a.y,D[Y+ee+10]=a.z,D[Y+ee+11]=X.itemSize===4?a.w:1)}}g={count:_,texture:G,size:new Se(E,w)},r.set(d,g),d.addEventListener("dispose",P)}let m=0;for(let b=0;b<p.length;b++)m+=p[b];const u=d.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",u),h.getUniforms().setValue(s,"morphTargetInfluences",p),h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}else{const f=p===void 0?0:p.length;let _=n[d.id];if(_===void 0||_.length!==f){_=[];for(let y=0;y<f;y++)_[y]=[y,0];n[d.id]=_}for(let y=0;y<f;y++){const T=_[y];T[0]=y,T[1]=p[y]}_.sort(Om);for(let y=0;y<8;y++)y<f&&_[y][1]?(o[y][0]=_[y][0],o[y][1]=_[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(Um);const g=d.morphAttributes.position,m=d.morphAttributes.normal;let u=0;for(let y=0;y<8;y++){const T=o[y],I=T[0],C=T[1];I!==Number.MAX_SAFE_INTEGER&&C?(g&&d.getAttribute("morphTarget"+y)!==g[I]&&d.setAttribute("morphTarget"+y,g[I]),m&&d.getAttribute("morphNormal"+y)!==m[I]&&d.setAttribute("morphNormal"+y,m[I]),i[y]=C,u+=C):(g&&d.hasAttribute("morphTarget"+y)===!0&&d.deleteAttribute("morphTarget"+y),m&&d.hasAttribute("morphNormal"+y)===!0&&d.deleteAttribute("morphNormal"+y),i[y]=0)}const b=d.morphTargetsRelative?1:1-u;h.getUniforms().setValue(s,"morphTargetBaseInfluence",b),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function Fm(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;i.get(p)!==c&&(p.update(),i.set(p,c))}return h}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class nd extends It{constructor(e,t,n,i,r,a,o,l,c,d){if(d=d!==void 0?d:ei,d!==ei&&d!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===ei&&(n=Pn),n===void 0&&d===ki&&(n=Qn),super(null,i,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const id=new It,sd=new nd(1,1);sd.compareFunction=Gc;const rd=new $c,ad=new bu,od=new Qc,Ll=[],Rl=[],Pl=new Float32Array(16),Nl=new Float32Array(9),Dl=new Float32Array(4);function Gi(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Ll[i];if(r===void 0&&(r=new Float32Array(i),Ll[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function _t(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function yt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Er(s,e){let t=Rl[e];t===void 0&&(t=new Int32Array(e),Rl[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Bm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Vm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;s.uniform2fv(this.addr,e),yt(t,e)}}function Hm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;s.uniform3fv(this.addr,e),yt(t,e)}}function zm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;s.uniform4fv(this.addr,e),yt(t,e)}}function Gm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;Dl.set(n),s.uniformMatrix2fv(this.addr,!1,Dl),yt(t,n)}}function Wm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;Nl.set(n),s.uniformMatrix3fv(this.addr,!1,Nl),yt(t,n)}}function Ym(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;Pl.set(n),s.uniformMatrix4fv(this.addr,!1,Pl),yt(t,n)}}function Xm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function $m(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;s.uniform2iv(this.addr,e),yt(t,e)}}function qm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;s.uniform3iv(this.addr,e),yt(t,e)}}function jm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;s.uniform4iv(this.addr,e),yt(t,e)}}function Km(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Zm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;s.uniform2uiv(this.addr,e),yt(t,e)}}function Jm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;s.uniform3uiv(this.addr,e),yt(t,e)}}function Qm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;s.uniform4uiv(this.addr,e),yt(t,e)}}function eg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?sd:id;t.setTexture2D(e||r,i)}function tg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ad,i)}function ng(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||od,i)}function ig(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||rd,i)}function sg(s){switch(s){case 5126:return Bm;case 35664:return Vm;case 35665:return Hm;case 35666:return zm;case 35674:return Gm;case 35675:return Wm;case 35676:return Ym;case 5124:case 35670:return Xm;case 35667:case 35671:return $m;case 35668:case 35672:return qm;case 35669:case 35673:return jm;case 5125:return Km;case 36294:return Zm;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return eg;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ig}}function rg(s,e){s.uniform1fv(this.addr,e)}function ag(s,e){const t=Gi(e,this.size,2);s.uniform2fv(this.addr,t)}function og(s,e){const t=Gi(e,this.size,3);s.uniform3fv(this.addr,t)}function lg(s,e){const t=Gi(e,this.size,4);s.uniform4fv(this.addr,t)}function cg(s,e){const t=Gi(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function dg(s,e){const t=Gi(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function hg(s,e){const t=Gi(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ug(s,e){s.uniform1iv(this.addr,e)}function pg(s,e){s.uniform2iv(this.addr,e)}function fg(s,e){s.uniform3iv(this.addr,e)}function mg(s,e){s.uniform4iv(this.addr,e)}function gg(s,e){s.uniform1uiv(this.addr,e)}function vg(s,e){s.uniform2uiv(this.addr,e)}function _g(s,e){s.uniform3uiv(this.addr,e)}function yg(s,e){s.uniform4uiv(this.addr,e)}function xg(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);_t(n,r)||(s.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||id,r[a])}function bg(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);_t(n,r)||(s.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||ad,r[a])}function Eg(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);_t(n,r)||(s.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||od,r[a])}function Sg(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);_t(n,r)||(s.uniform1iv(this.addr,r),yt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||rd,r[a])}function Mg(s){switch(s){case 5126:return rg;case 35664:return ag;case 35665:return og;case 35666:return lg;case 35674:return cg;case 35675:return dg;case 35676:return hg;case 5124:case 35670:return ug;case 35667:case 35671:return pg;case 35668:case 35672:return fg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return vg;case 36295:return _g;case 36296:return yg;case 35678:case 36198:case 36298:case 36306:case 35682:return xg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return Sg}}class wg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=sg(t.type)}}class Tg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Mg(t.type)}}class Ag{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function Ul(s,e){s.seq.push(e),s.map[e.id]=e}function Cg(s,e,t){const n=s.name,i=n.length;for(ra.lastIndex=0;;){const r=ra.exec(n),a=ra.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Ul(t,c===void 0?new wg(o,s,e):new Tg(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new Ag(o),Ul(t,h)),t=h}}}class er{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);Cg(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Ol(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const Ig=37297;let Lg=0;function Rg(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Pg(s){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(s);let n;switch(e===t?n="":e===dr&&t===cr?n="LinearDisplayP3ToLinearSRGB":e===cr&&t===dr&&(n="LinearSRGBToLinearDisplayP3"),s){case Sn:case br:return[n,"LinearTransferOETF"];case ft:case Va:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function kl(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Rg(s.getShaderSource(e),a)}else return i}function Ng(s,e){const t=Pg(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Dg(s,e){let t;switch(e){case Lh:t="Linear";break;case Rh:t="Reinhard";break;case Ph:t="OptimizedCineon";break;case Pc:t="ACESFilmic";break;case Dh:t="AgX";break;case Nh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ug(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ii).join(`
`)}function Og(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ii).join(`
`)}function kg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Fg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ii(s){return s!==""}function Fl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Bg=/^[ \t]*#include +<([\w\d./]+)>/gm;function La(s){return s.replace(Bg,Hg)}const Vg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Hg(s,e){let t=De[e];if(t===void 0){const n=Vg.get(e);if(n!==void 0)t=De[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return La(t)}const zg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vl(s){return s.replace(zg,Gg)}function Gg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Hl(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Wg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Lc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===sh?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function Yg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ui:case Oi:e="ENVMAP_TYPE_CUBE";break;case xr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Oi:e="ENVMAP_MODE_REFRACTION";break}return e}function $g(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Rc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ch:e="ENVMAP_BLENDING_MIX";break;case Ih:e="ENVMAP_BLENDING_ADD";break}return e}function qg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function jg(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Wg(t),c=Yg(t),d=Xg(t),h=$g(t),p=qg(t),f=t.isWebGL2?"":Ug(t),_=Og(t),g=kg(r),m=i.createProgram();let u,b,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ii).join(`
`),u.length>0&&(u+=`
`),b=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ii).join(`
`),b.length>0&&(b+=`
`)):(u=[Hl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ii).join(`
`),b=[f,Hl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?De.tonemapping_pars_fragment:"",t.toneMapping!==bn?Dg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,Ng("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ii).join(`
`)),a=La(a),a=Fl(a,t),a=Bl(a,t),o=La(o),o=Fl(o,t),o=Bl(o,t),a=Vl(a),o=Vl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,u=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const T=y+u+a,I=y+b+o,C=Ol(i,i.VERTEX_SHADER,T),A=Ol(i,i.FRAGMENT_SHADER,I);i.attachShader(m,C),i.attachShader(m,A),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function H(G){if(s.debug.checkShaderErrors){const te=i.getProgramInfoLog(m).trim(),P=i.getShaderInfoLog(C).trim(),U=i.getShaderInfoLog(A).trim();let W=!0,$=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,C,A);else{const X=kl(i,C,"vertex"),Y=kl(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+te+`
`+X+`
`+Y)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(P===""||U==="")&&($=!1);$&&(G.diagnostics={runnable:W,programLog:te,vertexShader:{log:P,prefix:u},fragmentShader:{log:U,prefix:b}})}i.deleteShader(C),i.deleteShader(A),E=new er(i,m),w=Fg(i,m)}let E;this.getUniforms=function(){return E===void 0&&H(this),E};let w;this.getAttributes=function(){return w===void 0&&H(this),w};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(m,Ig)),D},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Lg++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=A,this}let Kg=0;class Zg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Jg(e),t.set(e,n)),n}}class Jg{constructor(e){this.id=Kg++,this.code=e,this.usedTimes=0}}function Qg(s,e,t,n,i,r,a){const o=new za,l=new Zg,c=[],d=i.isWebGL2,h=i.logarithmicDepthBuffer,p=i.vertexTextures;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return E===0?"uv":`uv${E}`}function m(E,w,D,G,te){const P=G.fog,U=te.geometry,W=E.isMeshStandardMaterial?G.environment:null,$=(E.isMeshStandardMaterial?t:e).get(E.envMap||W),X=$&&$.mapping===xr?$.image.height:null,Y=_[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const Z=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ee=Z!==void 0?Z.length:0;let de=0;U.morphAttributes.position!==void 0&&(de=1),U.morphAttributes.normal!==void 0&&(de=2),U.morphAttributes.color!==void 0&&(de=3);let z,q,le,ve;if(Y){const Rt=rn[Y];z=Rt.vertexShader,q=Rt.fragmentShader}else z=E.vertexShader,q=E.fragmentShader,l.update(E),le=l.getVertexShaderID(E),ve=l.getFragmentShaderID(E);const ge=s.getRenderTarget(),Le=te.isInstancedMesh===!0,Pe=te.isBatchedMesh===!0,Me=!!E.map,We=!!E.matcap,O=!!$,Lt=!!E.aoMap,ye=!!E.lightMap,Ce=!!E.bumpMap,pe=!!E.normalMap,st=!!E.displacementMap,Ue=!!E.emissiveMap,M=!!E.metalnessMap,x=!!E.roughnessMap,F=E.anisotropy>0,J=E.clearcoat>0,K=E.iridescence>0,Q=E.sheen>0,fe=E.transmission>0,oe=F&&!!E.anisotropyMap,he=J&&!!E.clearcoatMap,Ee=J&&!!E.clearcoatNormalMap,Oe=J&&!!E.clearcoatRoughnessMap,j=K&&!!E.iridescenceMap,Xe=K&&!!E.iridescenceThicknessMap,ze=Q&&!!E.sheenColorMap,Ae=Q&&!!E.sheenRoughnessMap,_e=!!E.specularMap,ue=!!E.specularColorMap,Ne=!!E.specularIntensityMap,Ye=fe&&!!E.transmissionMap,ot=fe&&!!E.thicknessMap,Fe=!!E.gradientMap,ie=!!E.alphaMap,L=E.alphaTest>0,re=!!E.alphaHash,ae=!!E.extensions,we=!!U.attributes.uv1,xe=!!U.attributes.uv2,Qe=!!U.attributes.uv3;let et=bn;return E.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(et=s.toneMapping),{isWebGL2:d,shaderID:Y,shaderType:E.type,shaderName:E.name,vertexShader:z,fragmentShader:q,defines:E.defines,customVertexShaderID:le,customFragmentShaderID:ve,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Pe,instancing:Le,instancingColor:Le&&te.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Sn,map:Me,matcap:We,envMap:O,envMapMode:O&&$.mapping,envMapCubeUVHeight:X,aoMap:Lt,lightMap:ye,bumpMap:Ce,normalMap:pe,displacementMap:p&&st,emissiveMap:Ue,normalMapObjectSpace:pe&&E.normalMapType===qh,normalMapTangentSpace:pe&&E.normalMapType===zc,metalnessMap:M,roughnessMap:x,anisotropy:F,anisotropyMap:oe,clearcoat:J,clearcoatMap:he,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Oe,iridescence:K,iridescenceMap:j,iridescenceThicknessMap:Xe,sheen:Q,sheenColorMap:ze,sheenRoughnessMap:Ae,specularMap:_e,specularColorMap:ue,specularIntensityMap:Ne,transmission:fe,transmissionMap:Ye,thicknessMap:ot,gradientMap:Fe,opaque:E.transparent===!1&&E.blending===Pi,alphaMap:ie,alphaTest:L,alphaHash:re,combine:E.combine,mapUv:Me&&g(E.map.channel),aoMapUv:Lt&&g(E.aoMap.channel),lightMapUv:ye&&g(E.lightMap.channel),bumpMapUv:Ce&&g(E.bumpMap.channel),normalMapUv:pe&&g(E.normalMap.channel),displacementMapUv:st&&g(E.displacementMap.channel),emissiveMapUv:Ue&&g(E.emissiveMap.channel),metalnessMapUv:M&&g(E.metalnessMap.channel),roughnessMapUv:x&&g(E.roughnessMap.channel),anisotropyMapUv:oe&&g(E.anisotropyMap.channel),clearcoatMapUv:he&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&g(E.sheenRoughnessMap.channel),specularMapUv:_e&&g(E.specularMap.channel),specularColorMapUv:ue&&g(E.specularColorMap.channel),specularIntensityMapUv:Ne&&g(E.specularIntensityMap.channel),transmissionMapUv:Ye&&g(E.transmissionMap.channel),thicknessMapUv:ot&&g(E.thicknessMap.channel),alphaMapUv:ie&&g(E.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(pe||F),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:xe,vertexUv3s:Qe,pointsUvs:te.isPoints===!0&&!!U.attributes.uv&&(Me||ie),fog:!!P,useFog:E.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:te.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:de,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:et,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Me&&E.map.isVideoTexture===!0&&Ke.getTransfer(E.map.colorSpace)===nt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===an,flipSided:E.side===Ut,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:ae&&E.extensions.derivatives===!0,extensionFragDepth:ae&&E.extensions.fragDepth===!0,extensionDrawBuffers:ae&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function u(E){const w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(const D in E.defines)w.push(D),w.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(b(w,E),y(w,E),w.push(s.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function b(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function y(E,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),E.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),E.push(o.mask)}function T(E){const w=_[E.type];let D;if(w){const G=rn[w];D=Du.clone(G.uniforms)}else D=E.uniforms;return D}function I(E,w){let D;for(let G=0,te=c.length;G<te;G++){const P=c[G];if(P.cacheKey===w){D=P,++D.usedTimes;break}}return D===void 0&&(D=new jg(s,w,E,r),c.push(D)),D}function C(E){if(--E.usedTimes===0){const w=c.indexOf(E);c[w]=c[c.length-1],c.pop(),E.destroy()}}function A(E){l.remove(E)}function H(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:T,acquireProgram:I,releaseProgram:C,releaseShaderCache:A,programs:c,dispose:H}}function ev(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function tv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function zl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Gl(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,p,f,_,g,m){let u=s[e];return u===void 0?(u={id:h.id,object:h,geometry:p,material:f,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},s[e]=u):(u.id=h.id,u.object=h,u.geometry=p,u.material=f,u.groupOrder=_,u.renderOrder=h.renderOrder,u.z=g,u.group=m),e++,u}function o(h,p,f,_,g,m){const u=a(h,p,f,_,g,m);f.transmission>0?n.push(u):f.transparent===!0?i.push(u):t.push(u)}function l(h,p,f,_,g,m){const u=a(h,p,f,_,g,m);f.transmission>0?n.unshift(u):f.transparent===!0?i.unshift(u):t.unshift(u)}function c(h,p){t.length>1&&t.sort(h||tv),n.length>1&&n.sort(p||zl),i.length>1&&i.sort(p||zl)}function d(){for(let h=e,p=s.length;h<p;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:d,sort:c}}function nv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Gl,s.set(n,[a])):i>=r.length?(a=new Gl,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function iv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new He};break;case"SpotLight":t={position:new R,direction:new R,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function sv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let rv=0;function av(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function ov(s,e){const t=new iv,n=sv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new R);const r=new R,a=new Ge,o=new Ge;function l(d,h){let p=0,f=0,_=0;for(let G=0;G<9;G++)i.probe[G].set(0,0,0);let g=0,m=0,u=0,b=0,y=0,T=0,I=0,C=0,A=0,H=0,E=0;d.sort(av);const w=h===!0?Math.PI:1;for(let G=0,te=d.length;G<te;G++){const P=d[G],U=P.color,W=P.intensity,$=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)p+=U.r*W*w,f+=U.g*W*w,_+=U.b*W*w;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],W);E++}else if(P.isDirectionalLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*w),P.castShadow){const Z=P.shadow,ee=n.get(P);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,i.directionalShadow[g]=ee,i.directionalShadowMap[g]=X,i.directionalShadowMatrix[g]=P.shadow.matrix,T++}i.directional[g]=Y,g++}else if(P.isSpotLight){const Y=t.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(U).multiplyScalar(W*w),Y.distance=$,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[u]=Y;const Z=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,Z.updateMatrices(P),P.castShadow&&H++),i.spotLightMatrix[u]=Z.matrix,P.castShadow){const ee=n.get(P);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,i.spotShadow[u]=ee,i.spotShadowMap[u]=X,C++}u++}else if(P.isRectAreaLight){const Y=t.get(P);Y.color.copy(U).multiplyScalar(W),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[b]=Y,b++}else if(P.isPointLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*w),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const Z=P.shadow,ee=n.get(P);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,ee.shadowCameraNear=Z.camera.near,ee.shadowCameraFar=Z.camera.far,i.pointShadow[m]=ee,i.pointShadowMap[m]=X,i.pointShadowMatrix[m]=P.shadow.matrix,I++}i.point[m]=Y,m++}else if(P.isHemisphereLight){const Y=t.get(P);Y.skyColor.copy(P.color).multiplyScalar(W*w),Y.groundColor.copy(P.groundColor).multiplyScalar(W*w),i.hemi[y]=Y,y++}}b>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=p,i.ambient[1]=f,i.ambient[2]=_;const D=i.hash;(D.directionalLength!==g||D.pointLength!==m||D.spotLength!==u||D.rectAreaLength!==b||D.hemiLength!==y||D.numDirectionalShadows!==T||D.numPointShadows!==I||D.numSpotShadows!==C||D.numSpotMaps!==A||D.numLightProbes!==E)&&(i.directional.length=g,i.spot.length=u,i.rectArea.length=b,i.point.length=m,i.hemi.length=y,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=I,i.pointShadowMap.length=I,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=I,i.spotLightMatrix.length=C+A-H,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=H,i.numLightProbes=E,D.directionalLength=g,D.pointLength=m,D.spotLength=u,D.rectAreaLength=b,D.hemiLength=y,D.numDirectionalShadows=T,D.numPointShadows=I,D.numSpotShadows=C,D.numSpotMaps=A,D.numLightProbes=E,i.version=rv++)}function c(d,h){let p=0,f=0,_=0,g=0,m=0;const u=h.matrixWorldInverse;for(let b=0,y=d.length;b<y;b++){const T=d[b];if(T.isDirectionalLight){const I=i.directional[p];I.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(u),p++}else if(T.isSpotLight){const I=i.spot[_];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(u),I.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(u),_++}else if(T.isRectAreaLight){const I=i.rectArea[g];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(u),o.identity(),a.copy(T.matrixWorld),a.premultiply(u),o.extractRotation(a),I.halfWidth.set(T.width*.5,0,0),I.halfHeight.set(0,T.height*.5,0),I.halfWidth.applyMatrix4(o),I.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const I=i.point[f];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(u),f++}else if(T.isHemisphereLight){const I=i.hemi[m];I.direction.setFromMatrixPosition(T.matrixWorld),I.direction.transformDirection(u),m++}}}return{setup:l,setupView:c,state:i}}function Wl(s,e){const t=new ov(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function lv(s,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Wl(s,e),t.set(r,[l])):a>=o.length?(l=new Wl(s,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class cv extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class dv extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const hv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pv(s,e,t){let n=new Ga;const i=new Se,r=new Se,a=new Je,o=new cv({depthPacking:$h}),l=new dv,c={},d=t.maxTextureSize,h={[Fn]:Ut,[Ut]:Fn,[an]:an},p=new si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:hv,fragmentShader:uv}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const _=new Ot;_.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new dt(_,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lc;let u=this.type;this.render=function(C,A,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const E=s.getRenderTarget(),w=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),G=s.state;G.setBlending(Un),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const te=u!==vn&&this.type===vn,P=u===vn&&this.type!==vn;for(let U=0,W=C.length;U<W;U++){const $=C[U],X=$.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const Y=X.getFrameExtents();if(i.multiply(Y),r.copy(X.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(r.x=Math.floor(d/Y.x),i.x=r.x*Y.x,X.mapSize.x=r.x),i.y>d&&(r.y=Math.floor(d/Y.y),i.y=r.y*Y.y,X.mapSize.y=r.y)),X.map===null||te===!0||P===!0){const ee=this.type!==vn?{minFilter:St,magFilter:St}:{};X.map!==null&&X.map.dispose(),X.map=new ii(i.x,i.y,ee),X.map.texture.name=$.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const Z=X.getViewportCount();for(let ee=0;ee<Z;ee++){const de=X.getViewport(ee);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),G.viewport(a),X.updateMatrices($,ee),n=X.getFrustum(),T(A,H,X.camera,$,this.type)}X.isPointLightShadow!==!0&&this.type===vn&&b(X,H),X.needsUpdate=!1}u=this.type,m.needsUpdate=!1,s.setRenderTarget(E,w,D)};function b(C,A){const H=e.update(g);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ii(i.x,i.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(A,null,H,p,g,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(A,null,H,f,g,null)}function y(C,A,H,E){let w=null;const D=H.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)w=D;else if(w=H.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const G=w.uuid,te=A.uuid;let P=c[G];P===void 0&&(P={},c[G]=P);let U=P[te];U===void 0&&(U=w.clone(),P[te]=U,A.addEventListener("dispose",I)),w=U}if(w.visible=A.visible,w.wireframe=A.wireframe,E===vn?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:h[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,H.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const G=s.properties.get(w);G.light=H}return w}function T(C,A,H,E,w){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&w===vn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,C.matrixWorld);const te=e.update(C),P=C.material;if(Array.isArray(P)){const U=te.groups;for(let W=0,$=U.length;W<$;W++){const X=U[W],Y=P[X.materialIndex];if(Y&&Y.visible){const Z=y(C,Y,E,w);C.onBeforeShadow(s,C,A,H,te,Z,X),s.renderBufferDirect(H,null,te,Z,C,X),C.onAfterShadow(s,C,A,H,te,Z,X)}}}else if(P.visible){const U=y(C,P,E,w);C.onBeforeShadow(s,C,A,H,te,U,null),s.renderBufferDirect(H,null,te,U,C,null),C.onAfterShadow(s,C,A,H,te,U,null)}}const G=C.children;for(let te=0,P=G.length;te<P;te++)T(G[te],A,H,E,w)}function I(C){C.target.removeEventListener("dispose",I);for(const H in c){const E=c[H],w=C.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}function fv(s,e,t){const n=t.isWebGL2;function i(){let L=!1;const re=new Je;let ae=null;const we=new Je(0,0,0,0);return{setMask:function(xe){ae!==xe&&!L&&(s.colorMask(xe,xe,xe,xe),ae=xe)},setLocked:function(xe){L=xe},setClear:function(xe,Qe,et,xt,Rt){Rt===!0&&(xe*=xt,Qe*=xt,et*=xt),re.set(xe,Qe,et,xt),we.equals(re)===!1&&(s.clearColor(xe,Qe,et,xt),we.copy(re))},reset:function(){L=!1,ae=null,we.set(-1,0,0,0)}}}function r(){let L=!1,re=null,ae=null,we=null;return{setTest:function(xe){xe?Pe(s.DEPTH_TEST):Me(s.DEPTH_TEST)},setMask:function(xe){re!==xe&&!L&&(s.depthMask(xe),re=xe)},setFunc:function(xe){if(ae!==xe){switch(xe){case bh:s.depthFunc(s.NEVER);break;case Eh:s.depthFunc(s.ALWAYS);break;case Sh:s.depthFunc(s.LESS);break;case rr:s.depthFunc(s.LEQUAL);break;case Mh:s.depthFunc(s.EQUAL);break;case wh:s.depthFunc(s.GEQUAL);break;case Th:s.depthFunc(s.GREATER);break;case Ah:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ae=xe}},setLocked:function(xe){L=xe},setClear:function(xe){we!==xe&&(s.clearDepth(xe),we=xe)},reset:function(){L=!1,re=null,ae=null,we=null}}}function a(){let L=!1,re=null,ae=null,we=null,xe=null,Qe=null,et=null,xt=null,Rt=null;return{setTest:function(tt){L||(tt?Pe(s.STENCIL_TEST):Me(s.STENCIL_TEST))},setMask:function(tt){re!==tt&&!L&&(s.stencilMask(tt),re=tt)},setFunc:function(tt,Pt,nn){(ae!==tt||we!==Pt||xe!==nn)&&(s.stencilFunc(tt,Pt,nn),ae=tt,we=Pt,xe=nn)},setOp:function(tt,Pt,nn){(Qe!==tt||et!==Pt||xt!==nn)&&(s.stencilOp(tt,Pt,nn),Qe=tt,et=Pt,xt=nn)},setLocked:function(tt){L=tt},setClear:function(tt){Rt!==tt&&(s.clearStencil(tt),Rt=tt)},reset:function(){L=!1,re=null,ae=null,we=null,xe=null,Qe=null,et=null,xt=null,Rt=null}}}const o=new i,l=new r,c=new a,d=new WeakMap,h=new WeakMap;let p={},f={},_=new WeakMap,g=[],m=null,u=!1,b=null,y=null,T=null,I=null,C=null,A=null,H=null,E=new He(0,0,0),w=0,D=!1,G=null,te=null,P=null,U=null,W=null;const $=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Y=0;const Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(Z)[1]),X=Y>=1):Z.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),X=Y>=2);let ee=null,de={};const z=s.getParameter(s.SCISSOR_BOX),q=s.getParameter(s.VIEWPORT),le=new Je().fromArray(z),ve=new Je().fromArray(q);function ge(L,re,ae,we){const xe=new Uint8Array(4),Qe=s.createTexture();s.bindTexture(L,Qe),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let et=0;et<ae;et++)n&&(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)?s.texImage3D(re,0,s.RGBA,1,1,we,0,s.RGBA,s.UNSIGNED_BYTE,xe):s.texImage2D(re+et,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xe);return Qe}const Le={};Le[s.TEXTURE_2D]=ge(s.TEXTURE_2D,s.TEXTURE_2D,1),Le[s.TEXTURE_CUBE_MAP]=ge(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Le[s.TEXTURE_2D_ARRAY]=ge(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Le[s.TEXTURE_3D]=ge(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Pe(s.DEPTH_TEST),l.setFunc(rr),Ue(!1),M(Eo),Pe(s.CULL_FACE),pe(Un);function Pe(L){p[L]!==!0&&(s.enable(L),p[L]=!0)}function Me(L){p[L]!==!1&&(s.disable(L),p[L]=!1)}function We(L,re){return f[L]!==re?(s.bindFramebuffer(L,re),f[L]=re,n&&(L===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=re),L===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=re)),!0):!1}function O(L,re){let ae=g,we=!1;if(L)if(ae=_.get(re),ae===void 0&&(ae=[],_.set(re,ae)),L.isWebGLMultipleRenderTargets){const xe=L.texture;if(ae.length!==xe.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let Qe=0,et=xe.length;Qe<et;Qe++)ae[Qe]=s.COLOR_ATTACHMENT0+Qe;ae.length=xe.length,we=!0}}else ae[0]!==s.COLOR_ATTACHMENT0&&(ae[0]=s.COLOR_ATTACHMENT0,we=!0);else ae[0]!==s.BACK&&(ae[0]=s.BACK,we=!0);we&&(t.isWebGL2?s.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Lt(L){return m!==L?(s.useProgram(L),m=L,!0):!1}const ye={[jn]:s.FUNC_ADD,[ah]:s.FUNC_SUBTRACT,[oh]:s.FUNC_REVERSE_SUBTRACT};if(n)ye[To]=s.MIN,ye[Ao]=s.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(ye[To]=L.MIN_EXT,ye[Ao]=L.MAX_EXT)}const Ce={[lh]:s.ZERO,[ch]:s.ONE,[dh]:s.SRC_COLOR,[ba]:s.SRC_ALPHA,[gh]:s.SRC_ALPHA_SATURATE,[fh]:s.DST_COLOR,[uh]:s.DST_ALPHA,[hh]:s.ONE_MINUS_SRC_COLOR,[Ea]:s.ONE_MINUS_SRC_ALPHA,[mh]:s.ONE_MINUS_DST_COLOR,[ph]:s.ONE_MINUS_DST_ALPHA,[vh]:s.CONSTANT_COLOR,[_h]:s.ONE_MINUS_CONSTANT_COLOR,[yh]:s.CONSTANT_ALPHA,[xh]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(L,re,ae,we,xe,Qe,et,xt,Rt,tt){if(L===Un){u===!0&&(Me(s.BLEND),u=!1);return}if(u===!1&&(Pe(s.BLEND),u=!0),L!==rh){if(L!==b||tt!==D){if((y!==jn||C!==jn)&&(s.blendEquation(s.FUNC_ADD),y=jn,C=jn),tt)switch(L){case Pi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case So:s.blendFunc(s.ONE,s.ONE);break;case Mo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Pi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case So:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Mo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}T=null,I=null,A=null,H=null,E.set(0,0,0),w=0,b=L,D=tt}return}xe=xe||re,Qe=Qe||ae,et=et||we,(re!==y||xe!==C)&&(s.blendEquationSeparate(ye[re],ye[xe]),y=re,C=xe),(ae!==T||we!==I||Qe!==A||et!==H)&&(s.blendFuncSeparate(Ce[ae],Ce[we],Ce[Qe],Ce[et]),T=ae,I=we,A=Qe,H=et),(xt.equals(E)===!1||Rt!==w)&&(s.blendColor(xt.r,xt.g,xt.b,Rt),E.copy(xt),w=Rt),b=L,D=!1}function st(L,re){L.side===an?Me(s.CULL_FACE):Pe(s.CULL_FACE);let ae=L.side===Ut;re&&(ae=!ae),Ue(ae),L.blending===Pi&&L.transparent===!1?pe(Un):pe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const we=L.stencilWrite;c.setTest(we),we&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),F(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Pe(s.SAMPLE_ALPHA_TO_COVERAGE):Me(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(L){G!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),G=L)}function M(L){L!==nh?(Pe(s.CULL_FACE),L!==te&&(L===Eo?s.cullFace(s.BACK):L===ih?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Me(s.CULL_FACE),te=L}function x(L){L!==P&&(X&&s.lineWidth(L),P=L)}function F(L,re,ae){L?(Pe(s.POLYGON_OFFSET_FILL),(U!==re||W!==ae)&&(s.polygonOffset(re,ae),U=re,W=ae)):Me(s.POLYGON_OFFSET_FILL)}function J(L){L?Pe(s.SCISSOR_TEST):Me(s.SCISSOR_TEST)}function K(L){L===void 0&&(L=s.TEXTURE0+$-1),ee!==L&&(s.activeTexture(L),ee=L)}function Q(L,re,ae){ae===void 0&&(ee===null?ae=s.TEXTURE0+$-1:ae=ee);let we=de[ae];we===void 0&&(we={type:void 0,texture:void 0},de[ae]=we),(we.type!==L||we.texture!==re)&&(ee!==ae&&(s.activeTexture(ae),ee=ae),s.bindTexture(L,re||Le[L]),we.type=L,we.texture=re)}function fe(){const L=de[ee];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function oe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Xe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _e(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ne(L){le.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),le.copy(L))}function Ye(L){ve.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),ve.copy(L))}function ot(L,re){let ae=h.get(re);ae===void 0&&(ae=new WeakMap,h.set(re,ae));let we=ae.get(L);we===void 0&&(we=s.getUniformBlockIndex(re,L.name),ae.set(L,we))}function Fe(L,re){const we=h.get(re).get(L);d.get(re)!==we&&(s.uniformBlockBinding(re,we,L.__bindingPointIndex),d.set(re,we))}function ie(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),p={},ee=null,de={},f={},_=new WeakMap,g=[],m=null,u=!1,b=null,y=null,T=null,I=null,C=null,A=null,H=null,E=new He(0,0,0),w=0,D=!1,G=null,te=null,P=null,U=null,W=null,le.set(0,0,s.canvas.width,s.canvas.height),ve.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Pe,disable:Me,bindFramebuffer:We,drawBuffers:O,useProgram:Lt,setBlending:pe,setMaterial:st,setFlipSided:Ue,setCullFace:M,setLineWidth:x,setPolygonOffset:F,setScissorTest:J,activeTexture:K,bindTexture:Q,unbindTexture:fe,compressedTexImage2D:oe,compressedTexImage3D:he,texImage2D:_e,texImage3D:ue,updateUBOMapping:ot,uniformBlockBinding:Fe,texStorage2D:ze,texStorage3D:Ae,texSubImage2D:Ee,texSubImage3D:Oe,compressedTexSubImage2D:j,compressedTexSubImage3D:Xe,scissor:Ne,viewport:Ye,reset:ie}}function mv(s,e,t,n,i,r,a){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let h;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(M,x){return f?new OffscreenCanvas(M,x):ls("canvas")}function g(M,x,F,J){let K=1;if((M.width>J||M.height>J)&&(K=J/Math.max(M.width,M.height)),K<1||x===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const Q=x?ur:Math.floor,fe=Q(K*M.width),oe=Q(K*M.height);h===void 0&&(h=_(fe,oe));const he=F?_(fe,oe):h;return he.width=fe,he.height=oe,he.getContext("2d").drawImage(M,0,0,fe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+fe+"x"+oe+")."),he}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function m(M){return Ia(M.width)&&Ia(M.height)}function u(M){return o?!1:M.wrapS!==pt||M.wrapT!==pt||M.minFilter!==St&&M.minFilter!==kt}function b(M,x){return M.generateMipmaps&&x&&M.minFilter!==St&&M.minFilter!==kt}function y(M){s.generateMipmap(M)}function T(M,x,F,J,K=!1){if(o===!1)return x;if(M!==null){if(s[M]!==void 0)return s[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let Q=x;if(x===s.RED&&(F===s.FLOAT&&(Q=s.R32F),F===s.HALF_FLOAT&&(Q=s.R16F),F===s.UNSIGNED_BYTE&&(Q=s.R8)),x===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(Q=s.R8UI),F===s.UNSIGNED_SHORT&&(Q=s.R16UI),F===s.UNSIGNED_INT&&(Q=s.R32UI),F===s.BYTE&&(Q=s.R8I),F===s.SHORT&&(Q=s.R16I),F===s.INT&&(Q=s.R32I)),x===s.RG&&(F===s.FLOAT&&(Q=s.RG32F),F===s.HALF_FLOAT&&(Q=s.RG16F),F===s.UNSIGNED_BYTE&&(Q=s.RG8)),x===s.RGBA){const fe=K?lr:Ke.getTransfer(J);F===s.FLOAT&&(Q=s.RGBA32F),F===s.HALF_FLOAT&&(Q=s.RGBA16F),F===s.UNSIGNED_BYTE&&(Q=fe===nt?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function I(M,x,F){return b(M,F)===!0||M.isFramebufferTexture&&M.minFilter!==St&&M.minFilter!==kt?Math.log2(Math.max(x.width,x.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?x.mipmaps.length:1}function C(M){return M===St||M===Io||M===Rr?s.NEAREST:s.LINEAR}function A(M){const x=M.target;x.removeEventListener("dispose",A),E(x),x.isVideoTexture&&d.delete(x)}function H(M){const x=M.target;x.removeEventListener("dispose",H),D(x)}function E(M){const x=n.get(M);if(x.__webglInit===void 0)return;const F=M.source,J=p.get(F);if(J){const K=J[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&w(M),Object.keys(J).length===0&&p.delete(F)}n.remove(M)}function w(M){const x=n.get(M);s.deleteTexture(x.__webglTexture);const F=M.source,J=p.get(F);delete J[x.__cacheKey],a.memory.textures--}function D(M){const x=M.texture,F=n.get(M),J=n.get(x);if(J.__webglTexture!==void 0&&(s.deleteTexture(J.__webglTexture),a.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(F.__webglFramebuffer[K]))for(let Q=0;Q<F.__webglFramebuffer[K].length;Q++)s.deleteFramebuffer(F.__webglFramebuffer[K][Q]);else s.deleteFramebuffer(F.__webglFramebuffer[K]);F.__webglDepthbuffer&&s.deleteRenderbuffer(F.__webglDepthbuffer[K])}else{if(Array.isArray(F.__webglFramebuffer))for(let K=0;K<F.__webglFramebuffer.length;K++)s.deleteFramebuffer(F.__webglFramebuffer[K]);else s.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&s.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&s.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let K=0;K<F.__webglColorRenderbuffer.length;K++)F.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(F.__webglColorRenderbuffer[K]);F.__webglDepthRenderbuffer&&s.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let K=0,Q=x.length;K<Q;K++){const fe=n.get(x[K]);fe.__webglTexture&&(s.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(x[K])}n.remove(x),n.remove(M)}let G=0;function te(){G=0}function P(){const M=G;return M>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+i.maxTextures),G+=1,M}function U(M){const x=[];return x.push(M.wrapS),x.push(M.wrapT),x.push(M.wrapR||0),x.push(M.magFilter),x.push(M.minFilter),x.push(M.anisotropy),x.push(M.internalFormat),x.push(M.format),x.push(M.type),x.push(M.generateMipmaps),x.push(M.premultiplyAlpha),x.push(M.flipY),x.push(M.unpackAlignment),x.push(M.colorSpace),x.join()}function W(M,x){const F=n.get(M);if(M.isVideoTexture&&st(M),M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){const J=M.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(F,M,x);return}}t.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+x)}function $(M,x){const F=n.get(M);if(M.version>0&&F.__version!==M.version){le(F,M,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+x)}function X(M,x){const F=n.get(M);if(M.version>0&&F.__version!==M.version){le(F,M,x);return}t.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+x)}function Y(M,x){const F=n.get(M);if(M.version>0&&F.__version!==M.version){ve(F,M,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+x)}const Z={[wa]:s.REPEAT,[pt]:s.CLAMP_TO_EDGE,[Ta]:s.MIRRORED_REPEAT},ee={[St]:s.NEAREST,[Io]:s.NEAREST_MIPMAP_NEAREST,[Rr]:s.NEAREST_MIPMAP_LINEAR,[kt]:s.LINEAR,[Oh]:s.LINEAR_MIPMAP_NEAREST,[ni]:s.LINEAR_MIPMAP_LINEAR},de={[jh]:s.NEVER,[tu]:s.ALWAYS,[Kh]:s.LESS,[Gc]:s.LEQUAL,[Zh]:s.EQUAL,[eu]:s.GEQUAL,[Jh]:s.GREATER,[Qh]:s.NOTEQUAL};function z(M,x,F){if(F?(s.texParameteri(M,s.TEXTURE_WRAP_S,Z[x.wrapS]),s.texParameteri(M,s.TEXTURE_WRAP_T,Z[x.wrapT]),(M===s.TEXTURE_3D||M===s.TEXTURE_2D_ARRAY)&&s.texParameteri(M,s.TEXTURE_WRAP_R,Z[x.wrapR]),s.texParameteri(M,s.TEXTURE_MAG_FILTER,ee[x.magFilter]),s.texParameteri(M,s.TEXTURE_MIN_FILTER,ee[x.minFilter])):(s.texParameteri(M,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(M,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(M===s.TEXTURE_3D||M===s.TEXTURE_2D_ARRAY)&&s.texParameteri(M,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(x.wrapS!==pt||x.wrapT!==pt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(M,s.TEXTURE_MAG_FILTER,C(x.magFilter)),s.texParameteri(M,s.TEXTURE_MIN_FILTER,C(x.minFilter)),x.minFilter!==St&&x.minFilter!==kt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(s.texParameteri(M,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(M,s.TEXTURE_COMPARE_FUNC,de[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===St||x.minFilter!==Rr&&x.minFilter!==ni||x.type===_n&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===os&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(s.texParameterf(M,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function q(M,x){let F=!1;M.__webglInit===void 0&&(M.__webglInit=!0,x.addEventListener("dispose",A));const J=x.source;let K=p.get(J);K===void 0&&(K={},p.set(J,K));const Q=U(x);if(Q!==M.__cacheKey){K[Q]===void 0&&(K[Q]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[Q].usedTimes++;const fe=K[M.__cacheKey];fe!==void 0&&(K[M.__cacheKey].usedTimes--,fe.usedTimes===0&&w(x)),M.__cacheKey=Q,M.__webglTexture=K[Q].texture}return F}function le(M,x,F){let J=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(J=s.TEXTURE_3D);const K=q(M,x),Q=x.source;t.bindTexture(J,M.__webglTexture,s.TEXTURE0+F);const fe=n.get(Q);if(Q.version!==fe.__version||K===!0){t.activeTexture(s.TEXTURE0+F);const oe=Ke.getPrimaries(Ke.workingColorSpace),he=x.colorSpace===$t?null:Ke.getPrimaries(x.colorSpace),Ee=x.colorSpace===$t||oe===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Oe=u(x)&&m(x.image)===!1;let j=g(x.image,Oe,!1,i.maxTextureSize);j=Ue(x,j);const Xe=m(j)||o,ze=r.convert(x.format,x.colorSpace);let Ae=r.convert(x.type),_e=T(x.internalFormat,ze,Ae,x.colorSpace,x.isVideoTexture);z(J,x,Xe);let ue;const Ne=x.mipmaps,Ye=o&&x.isVideoTexture!==!0&&_e!==Vc,ot=fe.__version===void 0||K===!0,Fe=I(x,j,Xe);if(x.isDepthTexture)_e=s.DEPTH_COMPONENT,o?x.type===_n?_e=s.DEPTH_COMPONENT32F:x.type===Pn?_e=s.DEPTH_COMPONENT24:x.type===Qn?_e=s.DEPTH24_STENCIL8:_e=s.DEPTH_COMPONENT16:x.type===_n&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===ei&&_e===s.DEPTH_COMPONENT&&x.type!==Ba&&x.type!==Pn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Pn,Ae=r.convert(x.type)),x.format===ki&&_e===s.DEPTH_COMPONENT&&(_e=s.DEPTH_STENCIL,x.type!==Qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Qn,Ae=r.convert(x.type))),ot&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,_e,j.width,j.height):t.texImage2D(s.TEXTURE_2D,0,_e,j.width,j.height,0,ze,Ae,null));else if(x.isDataTexture)if(Ne.length>0&&Xe){Ye&&ot&&t.texStorage2D(s.TEXTURE_2D,Fe,_e,Ne[0].width,Ne[0].height);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],Ye?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,ze,Ae,ue.data):t.texImage2D(s.TEXTURE_2D,ie,_e,ue.width,ue.height,0,ze,Ae,ue.data);x.generateMipmaps=!1}else Ye?(ot&&t.texStorage2D(s.TEXTURE_2D,Fe,_e,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,j.width,j.height,ze,Ae,j.data)):t.texImage2D(s.TEXTURE_2D,0,_e,j.width,j.height,0,ze,Ae,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ye&&ot&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Fe,_e,Ne[0].width,Ne[0].height,j.depth);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],x.format!==Xt?ze!==null?Ye?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,j.depth,ze,ue.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ie,_e,ue.width,ue.height,j.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,j.depth,ze,Ae,ue.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ie,_e,ue.width,ue.height,j.depth,0,ze,Ae,ue.data)}else{Ye&&ot&&t.texStorage2D(s.TEXTURE_2D,Fe,_e,Ne[0].width,Ne[0].height);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],x.format!==Xt?ze!==null?Ye?t.compressedTexSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,ze,ue.data):t.compressedTexImage2D(s.TEXTURE_2D,ie,_e,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,ze,Ae,ue.data):t.texImage2D(s.TEXTURE_2D,ie,_e,ue.width,ue.height,0,ze,Ae,ue.data)}else if(x.isDataArrayTexture)Ye?(ot&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Fe,_e,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ze,Ae,j.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,_e,j.width,j.height,j.depth,0,ze,Ae,j.data);else if(x.isData3DTexture)Ye?(ot&&t.texStorage3D(s.TEXTURE_3D,Fe,_e,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ze,Ae,j.data)):t.texImage3D(s.TEXTURE_3D,0,_e,j.width,j.height,j.depth,0,ze,Ae,j.data);else if(x.isFramebufferTexture){if(ot)if(Ye)t.texStorage2D(s.TEXTURE_2D,Fe,_e,j.width,j.height);else{let ie=j.width,L=j.height;for(let re=0;re<Fe;re++)t.texImage2D(s.TEXTURE_2D,re,_e,ie,L,0,ze,Ae,null),ie>>=1,L>>=1}}else if(Ne.length>0&&Xe){Ye&&ot&&t.texStorage2D(s.TEXTURE_2D,Fe,_e,Ne[0].width,Ne[0].height);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],Ye?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ze,Ae,ue):t.texImage2D(s.TEXTURE_2D,ie,_e,ze,Ae,ue);x.generateMipmaps=!1}else Ye?(ot&&t.texStorage2D(s.TEXTURE_2D,Fe,_e,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ze,Ae,j)):t.texImage2D(s.TEXTURE_2D,0,_e,ze,Ae,j);b(x,Xe)&&y(J),fe.__version=Q.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function ve(M,x,F){if(x.image.length!==6)return;const J=q(M,x),K=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,M.__webglTexture,s.TEXTURE0+F);const Q=n.get(K);if(K.version!==Q.__version||J===!0){t.activeTexture(s.TEXTURE0+F);const fe=Ke.getPrimaries(Ke.workingColorSpace),oe=x.colorSpace===$t?null:Ke.getPrimaries(x.colorSpace),he=x.colorSpace===$t||fe===oe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ee=x.isCompressedTexture||x.image[0].isCompressedTexture,Oe=x.image[0]&&x.image[0].isDataTexture,j=[];for(let ie=0;ie<6;ie++)!Ee&&!Oe?j[ie]=g(x.image[ie],!1,!0,i.maxCubemapSize):j[ie]=Oe?x.image[ie].image:x.image[ie],j[ie]=Ue(x,j[ie]);const Xe=j[0],ze=m(Xe)||o,Ae=r.convert(x.format,x.colorSpace),_e=r.convert(x.type),ue=T(x.internalFormat,Ae,_e,x.colorSpace),Ne=o&&x.isVideoTexture!==!0,Ye=Q.__version===void 0||J===!0;let ot=I(x,Xe,ze);z(s.TEXTURE_CUBE_MAP,x,ze);let Fe;if(Ee){Ne&&Ye&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ot,ue,Xe.width,Xe.height);for(let ie=0;ie<6;ie++){Fe=j[ie].mipmaps;for(let L=0;L<Fe.length;L++){const re=Fe[L];x.format!==Xt?Ae!==null?Ne?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Ae,re.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,ue,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Ae,_e,re.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,ue,re.width,re.height,0,Ae,_e,re.data)}}}else{Fe=x.mipmaps,Ne&&Ye&&(Fe.length>0&&ot++,t.texStorage2D(s.TEXTURE_CUBE_MAP,ot,ue,j[0].width,j[0].height));for(let ie=0;ie<6;ie++)if(Oe){Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,j[ie].width,j[ie].height,Ae,_e,j[ie].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,j[ie].width,j[ie].height,0,Ae,_e,j[ie].data);for(let L=0;L<Fe.length;L++){const ae=Fe[L].image[ie].image;Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,ae.width,ae.height,Ae,_e,ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,ue,ae.width,ae.height,0,Ae,_e,ae.data)}}else{Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ae,_e,j[ie]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,Ae,_e,j[ie]);for(let L=0;L<Fe.length;L++){const re=Fe[L];Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,Ae,_e,re.image[ie]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,ue,Ae,_e,re.image[ie])}}}b(x,ze)&&y(s.TEXTURE_CUBE_MAP),Q.__version=K.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function ge(M,x,F,J,K,Q){const fe=r.convert(F.format,F.colorSpace),oe=r.convert(F.type),he=T(F.internalFormat,fe,oe,F.colorSpace);if(!n.get(x).__hasExternalTextures){const Oe=Math.max(1,x.width>>Q),j=Math.max(1,x.height>>Q);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?t.texImage3D(K,Q,he,Oe,j,x.depth,0,fe,oe,null):t.texImage2D(K,Q,he,Oe,j,0,fe,oe,null)}t.bindFramebuffer(s.FRAMEBUFFER,M),pe(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,K,n.get(F).__webglTexture,0,Ce(x)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,K,n.get(F).__webglTexture,Q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(M,x,F){if(s.bindRenderbuffer(s.RENDERBUFFER,M),x.depthBuffer&&!x.stencilBuffer){let J=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(F||pe(x)){const K=x.depthTexture;K&&K.isDepthTexture&&(K.type===_n?J=s.DEPTH_COMPONENT32F:K.type===Pn&&(J=s.DEPTH_COMPONENT24));const Q=Ce(x);pe(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Q,J,x.width,x.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,Q,J,x.width,x.height)}else s.renderbufferStorage(s.RENDERBUFFER,J,x.width,x.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,M)}else if(x.depthBuffer&&x.stencilBuffer){const J=Ce(x);F&&pe(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,J,s.DEPTH24_STENCIL8,x.width,x.height):pe(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,J,s.DEPTH24_STENCIL8,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,M)}else{const J=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let K=0;K<J.length;K++){const Q=J[K],fe=r.convert(Q.format,Q.colorSpace),oe=r.convert(Q.type),he=T(Q.internalFormat,fe,oe,Q.colorSpace),Ee=Ce(x);F&&pe(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ee,he,x.width,x.height):pe(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ee,he,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,he,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Pe(M,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,M),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W(x.depthTexture,0);const J=n.get(x.depthTexture).__webglTexture,K=Ce(x);if(x.depthTexture.format===ei)pe(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(x.depthTexture.format===ki)pe(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Me(M){const x=n.get(M),F=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Pe(x.__webglFramebuffer,M)}else if(F){x.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[J]),x.__webglDepthbuffer[J]=s.createRenderbuffer(),Le(x.__webglDepthbuffer[J],M,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=s.createRenderbuffer(),Le(x.__webglDepthbuffer,M,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function We(M,x,F){const J=n.get(M);x!==void 0&&ge(J.__webglFramebuffer,M,M.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Me(M)}function O(M){const x=M.texture,F=n.get(M),J=n.get(x);M.addEventListener("dispose",H),M.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=x.version,a.memory.textures++);const K=M.isWebGLCubeRenderTarget===!0,Q=M.isWebGLMultipleRenderTargets===!0,fe=m(M)||o;if(K){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let he=0;he<x.mipmaps.length;he++)F.__webglFramebuffer[oe][he]=s.createFramebuffer()}else F.__webglFramebuffer[oe]=s.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<x.mipmaps.length;oe++)F.__webglFramebuffer[oe]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Q)if(i.drawBuffers){const oe=M.texture;for(let he=0,Ee=oe.length;he<Ee;he++){const Oe=n.get(oe[he]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&M.samples>0&&pe(M)===!1){const oe=Q?x:[x];F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let he=0;he<oe.length;he++){const Ee=oe[he];F.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[he]);const Oe=r.convert(Ee.format,Ee.colorSpace),j=r.convert(Ee.type),Xe=T(Ee.internalFormat,Oe,j,Ee.colorSpace,M.isXRRenderTarget===!0),ze=Ce(M);s.renderbufferStorageMultisample(s.RENDERBUFFER,ze,Xe,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,F.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),M.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),Le(F.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),z(s.TEXTURE_CUBE_MAP,x,fe);for(let oe=0;oe<6;oe++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let he=0;he<x.mipmaps.length;he++)ge(F.__webglFramebuffer[oe][he],M,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else ge(F.__webglFramebuffer[oe],M,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);b(x,fe)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const oe=M.texture;for(let he=0,Ee=oe.length;he<Ee;he++){const Oe=oe[he],j=n.get(Oe);t.bindTexture(s.TEXTURE_2D,j.__webglTexture),z(s.TEXTURE_2D,Oe,fe),ge(F.__webglFramebuffer,M,Oe,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,0),b(Oe,fe)&&y(s.TEXTURE_2D)}t.unbindTexture()}else{let oe=s.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(o?oe=M.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,J.__webglTexture),z(oe,x,fe),o&&x.mipmaps&&x.mipmaps.length>0)for(let he=0;he<x.mipmaps.length;he++)ge(F.__webglFramebuffer[he],M,x,s.COLOR_ATTACHMENT0,oe,he);else ge(F.__webglFramebuffer,M,x,s.COLOR_ATTACHMENT0,oe,0);b(x,fe)&&y(oe),t.unbindTexture()}M.depthBuffer&&Me(M)}function Lt(M){const x=m(M)||o,F=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let J=0,K=F.length;J<K;J++){const Q=F[J];if(b(Q,x)){const fe=M.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,oe=n.get(Q).__webglTexture;t.bindTexture(fe,oe),y(fe),t.unbindTexture()}}}function ye(M){if(o&&M.samples>0&&pe(M)===!1){const x=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],F=M.width,J=M.height;let K=s.COLOR_BUFFER_BIT;const Q=[],fe=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=n.get(M),he=M.isWebGLMultipleRenderTargets===!0;if(he)for(let Ee=0;Ee<x.length;Ee++)t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Ee=0;Ee<x.length;Ee++){Q.push(s.COLOR_ATTACHMENT0+Ee),M.depthBuffer&&Q.push(fe);const Oe=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Oe===!1&&(M.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),M.stencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),he&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]),Oe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[fe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[fe])),he){const j=n.get(x[Ee]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,j,0)}s.blitFramebuffer(0,0,F,J,0,0,F,J,K,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let Ee=0;Ee<x.length;Ee++){t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]);const Oe=n.get(x[Ee]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,Oe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Ce(M){return Math.min(i.maxSamples,M.samples)}function pe(M){const x=n.get(M);return o&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function st(M){const x=a.render.frame;d.get(M)!==x&&(d.set(M,x),M.update())}function Ue(M,x){const F=M.colorSpace,J=M.format,K=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===Ca||F!==Sn&&F!==$t&&(Ke.getTransfer(F)===nt?o===!1?e.has("EXT_sRGB")===!0&&J===Xt?(M.format=Ca,M.minFilter=kt,M.generateMipmaps=!1):x=Yc.sRGBToLinear(x):(J!==Xt||K!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}this.allocateTextureUnit=P,this.resetTextureUnits=te,this.setTexture2D=W,this.setTexture2DArray=$,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=We,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=pe}function gv(s,e,t){const n=t.isWebGL2;function i(r,a=$t){let o;const l=Ke.getTransfer(a);if(r===On)return s.UNSIGNED_BYTE;if(r===Uc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Oc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===kh)return s.BYTE;if(r===Fh)return s.SHORT;if(r===Ba)return s.UNSIGNED_SHORT;if(r===Dc)return s.INT;if(r===Pn)return s.UNSIGNED_INT;if(r===_n)return s.FLOAT;if(r===os)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Bh)return s.ALPHA;if(r===Xt)return s.RGBA;if(r===Vh)return s.LUMINANCE;if(r===Hh)return s.LUMINANCE_ALPHA;if(r===ei)return s.DEPTH_COMPONENT;if(r===ki)return s.DEPTH_STENCIL;if(r===Ca)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===zh)return s.RED;if(r===kc)return s.RED_INTEGER;if(r===Gh)return s.RG;if(r===Fc)return s.RG_INTEGER;if(r===Bc)return s.RGBA_INTEGER;if(r===Pr||r===Nr||r===Dr||r===Ur)if(l===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Pr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Nr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Dr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ur)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Pr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Nr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Dr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ur)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Lo||r===Ro||r===Po||r===No)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Lo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ro)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Po)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===No)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Vc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Do||r===Uo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Do)return l===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Uo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Oo||r===ko||r===Fo||r===Bo||r===Vo||r===Ho||r===zo||r===Go||r===Wo||r===Yo||r===Xo||r===$o||r===qo||r===jo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Oo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ko)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Fo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Bo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Vo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ho)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===zo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Go)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Wo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Yo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Xo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===$o)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===qo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===jo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Or||r===Ko||r===Zo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Or)return l===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ko)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Zo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Wh||r===Jo||r===Qo||r===el)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Or)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Jo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Qo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===el)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Qn?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class vv extends Ct{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Li extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _v={type:"move"};class aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),u=this._getHandJoint(c,g);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=d.position.distanceTo(h.position),f=.02,_=.005;c.inputState.pinching&&p>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_v)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Li;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class yv extends Hi{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,p=null,f=null,_=null;const g=t.getContextAttributes();let m=null,u=null;const b=[],y=[],T=new Se;let I=null;const C=new Ct;C.layers.enable(1),C.viewport=new Je;const A=new Ct;A.layers.enable(2),A.viewport=new Je;const H=[C,A],E=new vv;E.layers.enable(1),E.layers.enable(2);let w=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let q=b[z];return q===void 0&&(q=new aa,b[z]=q),q.getTargetRaySpace()},this.getControllerGrip=function(z){let q=b[z];return q===void 0&&(q=new aa,b[z]=q),q.getGripSpace()},this.getHand=function(z){let q=b[z];return q===void 0&&(q=new aa,b[z]=q),q.getHandSpace()};function G(z){const q=y.indexOf(z.inputSource);if(q===-1)return;const le=b[q];le!==void 0&&(le.update(z.inputSource,z.frame,c||a),le.dispatchEvent({type:z.type,data:z.inputSource}))}function te(){i.removeEventListener("select",G),i.removeEventListener("selectstart",G),i.removeEventListener("selectend",G),i.removeEventListener("squeeze",G),i.removeEventListener("squeezestart",G),i.removeEventListener("squeezeend",G),i.removeEventListener("end",te),i.removeEventListener("inputsourceschange",P);for(let z=0;z<b.length;z++){const q=y[z];q!==null&&(y[z]=null,b[z].disconnect(q))}w=null,D=null,e.setRenderTarget(m),f=null,p=null,h=null,i=null,u=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(z){if(i=z,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",G),i.addEventListener("selectstart",G),i.addEventListener("selectend",G),i.addEventListener("squeeze",G),i.addEventListener("squeezestart",G),i.addEventListener("squeezeend",G),i.addEventListener("end",te),i.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(T),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const q={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,q),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),u=new ii(f.framebufferWidth,f.framebufferHeight,{format:Xt,type:On,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let q=null,le=null,ve=null;g.depth&&(ve=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=g.stencil?ki:ei,le=g.stencil?Qn:Pn);const ge={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};h=new XRWebGLBinding(i,t),p=h.createProjectionLayer(ge),i.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),u=new ii(p.textureWidth,p.textureHeight,{format:Xt,type:On,depthTexture:new nd(p.textureWidth,p.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Le=e.properties.get(u);Le.__ignoreDepthValues=p.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),de.setContext(i),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(z){for(let q=0;q<z.removed.length;q++){const le=z.removed[q],ve=y.indexOf(le);ve>=0&&(y[ve]=null,b[ve].disconnect(le))}for(let q=0;q<z.added.length;q++){const le=z.added[q];let ve=y.indexOf(le);if(ve===-1){for(let Le=0;Le<b.length;Le++)if(Le>=y.length){y.push(le),ve=Le;break}else if(y[Le]===null){y[Le]=le,ve=Le;break}if(ve===-1)break}const ge=b[ve];ge&&ge.connect(le)}}const U=new R,W=new R;function $(z,q,le){U.setFromMatrixPosition(q.matrixWorld),W.setFromMatrixPosition(le.matrixWorld);const ve=U.distanceTo(W),ge=q.projectionMatrix.elements,Le=le.projectionMatrix.elements,Pe=ge[14]/(ge[10]-1),Me=ge[14]/(ge[10]+1),We=(ge[9]+1)/ge[5],O=(ge[9]-1)/ge[5],Lt=(ge[8]-1)/ge[0],ye=(Le[8]+1)/Le[0],Ce=Pe*Lt,pe=Pe*ye,st=ve/(-Lt+ye),Ue=st*-Lt;q.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ue),z.translateZ(st),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const M=Pe+st,x=Me+st,F=Ce-Ue,J=pe+(ve-Ue),K=We*Me/x*M,Q=O*Me/x*M;z.projectionMatrix.makePerspective(F,J,K,Q,M,x),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function X(z,q){q===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(q.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(i===null)return;E.near=A.near=C.near=z.near,E.far=A.far=C.far=z.far,(w!==E.near||D!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),w=E.near,D=E.far);const q=z.parent,le=E.cameras;X(E,q);for(let ve=0;ve<le.length;ve++)X(le[ve],q);le.length===2?$(E,C,A):E.projectionMatrix.copy(C.projectionMatrix),Y(z,E,q)};function Y(z,q,le){le===null?z.matrix.copy(q.matrixWorld):(z.matrix.copy(le.matrixWorld),z.matrix.invert(),z.matrix.multiply(q.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(q.projectionMatrix),z.projectionMatrixInverse.copy(q.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Fi*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(z){l=z,p!==null&&(p.fixedFoveation=z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=z)};let Z=null;function ee(z,q){if(d=q.getViewerPose(c||a),_=q,d!==null){const le=d.views;f!==null&&(e.setRenderTargetFramebuffer(u,f.framebuffer),e.setRenderTarget(u));let ve=!1;le.length!==E.cameras.length&&(E.cameras.length=0,ve=!0);for(let ge=0;ge<le.length;ge++){const Le=le[ge];let Pe=null;if(f!==null)Pe=f.getViewport(Le);else{const We=h.getViewSubImage(p,Le);Pe=We.viewport,ge===0&&(e.setRenderTargetTextures(u,We.colorTexture,p.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(u))}let Me=H[ge];Me===void 0&&(Me=new Ct,Me.layers.enable(ge),Me.viewport=new Je,H[ge]=Me),Me.matrix.fromArray(Le.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(Le.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),ge===0&&(E.matrix.copy(Me.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ve===!0&&E.cameras.push(Me)}}for(let le=0;le<b.length;le++){const ve=y[le],ge=b[le];ve!==null&&ge!==void 0&&ge.update(ve,q,c||a)}Z&&Z(z,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),_=null}const de=new ed;de.setAnimationLoop(ee),this.setAnimationLoop=function(z){Z=z},this.dispose=function(){}}}function xv(s,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,Zc(s)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function i(m,u,b,y,T){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),h(m,u)):u.isMeshPhongMaterial?(r(m,u),d(m,u)):u.isMeshStandardMaterial?(r(m,u),p(m,u),u.isMeshPhysicalMaterial&&f(m,u,T)):u.isMeshMatcapMaterial?(r(m,u),_(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),g(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,b,y):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===Ut&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===Ut&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const b=e.get(u).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;const y=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*y,t(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,b,y){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*b,m.scale.value=y*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function p(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function f(m,u,b){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ut&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function g(m,u){const b=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function bv(s,e,t,n){let i={},r={},a=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,y){const T=y.program;n.uniformBlockBinding(b,T)}function c(b,y){let T=i[b.id];T===void 0&&(_(b),T=d(b),i[b.id]=T,b.addEventListener("dispose",m));const I=y.program;n.updateUBOMapping(b,I);const C=e.render.frame;r[b.id]!==C&&(p(b),r[b.id]=C)}function d(b){const y=h();b.__bindingPointIndex=y;const T=s.createBuffer(),I=b.__size,C=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,I,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,T),T}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const y=i[b.id],T=b.uniforms,I=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let C=0,A=T.length;C<A;C++){const H=Array.isArray(T[C])?T[C]:[T[C]];for(let E=0,w=H.length;E<w;E++){const D=H[E];if(f(D,C,E,I)===!0){const G=D.__offset,te=Array.isArray(D.value)?D.value:[D.value];let P=0;for(let U=0;U<te.length;U++){const W=te[U],$=g(W);typeof W=="number"||typeof W=="boolean"?(D.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,G+P,D.__data)):W.isMatrix3?(D.__data[0]=W.elements[0],D.__data[1]=W.elements[1],D.__data[2]=W.elements[2],D.__data[3]=0,D.__data[4]=W.elements[3],D.__data[5]=W.elements[4],D.__data[6]=W.elements[5],D.__data[7]=0,D.__data[8]=W.elements[6],D.__data[9]=W.elements[7],D.__data[10]=W.elements[8],D.__data[11]=0):(W.toArray(D.__data,P),P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(b,y,T,I){const C=b.value,A=y+"_"+T;if(I[A]===void 0)return typeof C=="number"||typeof C=="boolean"?I[A]=C:I[A]=C.clone(),!0;{const H=I[A];if(typeof C=="number"||typeof C=="boolean"){if(H!==C)return I[A]=C,!0}else if(H.equals(C)===!1)return H.copy(C),!0}return!1}function _(b){const y=b.uniforms;let T=0;const I=16;for(let A=0,H=y.length;A<H;A++){const E=Array.isArray(y[A])?y[A]:[y[A]];for(let w=0,D=E.length;w<D;w++){const G=E[w],te=Array.isArray(G.value)?G.value:[G.value];for(let P=0,U=te.length;P<U;P++){const W=te[P],$=g(W),X=T%I;X!==0&&I-X<$.boundary&&(T+=I-X),G.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=T,T+=$.storage}}}const C=T%I;return C>0&&(T+=I-C),b.__size=T,b.__cache={},this}function g(b){const y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){const y=b.target;y.removeEventListener("dispose",m);const T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function u(){for(const b in i)s.deleteBuffer(i[b]);a=[],i={},r={}}return{bind:l,update:c,dispose:u}}class Sr{constructor(e={}){const{canvas:t=gu(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let p;n!==null?p=n.getContextAttributes().alpha:p=a;const f=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const u=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ft,this._useLegacyLights=!1,this.toneMapping=bn,this.toneMappingExposure=1;const y=this;let T=!1,I=0,C=0,A=null,H=-1,E=null;const w=new Je,D=new Je;let G=null;const te=new He(0);let P=0,U=t.width,W=t.height,$=1,X=null,Y=null;const Z=new Je(0,0,U,W),ee=new Je(0,0,U,W);let de=!1;const z=new Ga;let q=!1,le=!1,ve=null;const ge=new Ge,Le=new Se,Pe=new R,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return A===null?$:1}let O=n;function Lt(S,N){for(let B=0;B<S.length;B++){const V=S[B],k=t.getContext(V,N);if(k!==null)return k}return null}try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fa}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",re,!1),O===null){const N=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&N.shift(),O=Lt(N,S),O===null)throw Lt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ye,Ce,pe,st,Ue,M,x,F,J,K,Q,fe,oe,he,Ee,Oe,j,Xe,ze,Ae,_e,ue,Ne,Ye;function ot(){ye=new Rm(O),Ce=new wm(O,ye,e),ye.init(Ce),ue=new gv(O,ye,Ce),pe=new fv(O,ye,Ce),st=new Dm(O),Ue=new ev,M=new mv(O,ye,pe,Ue,Ce,ue,st),x=new Am(y),F=new Lm(y),J=new Hu(O,Ce),Ne=new Sm(O,ye,J,Ce),K=new Pm(O,J,st,Ne),Q=new Fm(O,K,J,st),ze=new km(O,Ce,M),Oe=new Tm(Ue),fe=new Qg(y,x,F,ye,Ce,Ne,Oe),oe=new xv(y,Ue),he=new nv,Ee=new lv(ye,Ce),Xe=new Em(y,x,F,pe,Q,p,l),j=new pv(y,Q,Ce),Ye=new bv(O,st,Ce,pe),Ae=new Mm(O,ye,st,Ce),_e=new Nm(O,ye,st,Ce),st.programs=fe.programs,y.capabilities=Ce,y.extensions=ye,y.properties=Ue,y.renderLists=he,y.shadowMap=j,y.state=pe,y.info=st}ot();const Fe=new yv(y,O);this.xr=Fe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=ye.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ye.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(S){S!==void 0&&($=S,this.setSize(U,W,!1))},this.getSize=function(S){return S.set(U,W)},this.setSize=function(S,N,B=!0){if(Fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=S,W=N,t.width=Math.floor(S*$),t.height=Math.floor(N*$),B===!0&&(t.style.width=S+"px",t.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(U*$,W*$).floor()},this.setDrawingBufferSize=function(S,N,B){U=S,W=N,$=B,t.width=Math.floor(S*B),t.height=Math.floor(N*B),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(w)},this.getViewport=function(S){return S.copy(Z)},this.setViewport=function(S,N,B,V){S.isVector4?Z.set(S.x,S.y,S.z,S.w):Z.set(S,N,B,V),pe.viewport(w.copy(Z).multiplyScalar($).floor())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,N,B,V){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,N,B,V),pe.scissor(D.copy(ee).multiplyScalar($).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(S){pe.setScissorTest(de=S)},this.setOpaqueSort=function(S){X=S},this.setTransparentSort=function(S){Y=S},this.getClearColor=function(S){return S.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor.apply(Xe,arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha.apply(Xe,arguments)},this.clear=function(S=!0,N=!0,B=!0){let V=0;if(S){let k=!1;if(A!==null){const ce=A.texture.format;k=ce===Bc||ce===Fc||ce===kc}if(k){const ce=A.texture.type,me=ce===On||ce===Pn||ce===Ba||ce===Qn||ce===Uc||ce===Oc,be=Xe.getClearColor(),Te=Xe.getClearAlpha(),ke=be.r,Ie=be.g,Re=be.b;me?(f[0]=ke,f[1]=Ie,f[2]=Re,f[3]=Te,O.clearBufferuiv(O.COLOR,0,f)):(_[0]=ke,_[1]=Ie,_[2]=Re,_[3]=Te,O.clearBufferiv(O.COLOR,0,_))}else V|=O.COLOR_BUFFER_BIT}N&&(V|=O.DEPTH_BUFFER_BIT),B&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",re,!1),he.dispose(),Ee.dispose(),Ue.dispose(),x.dispose(),F.dispose(),Q.dispose(),Ne.dispose(),Ye.dispose(),fe.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Rt),Fe.removeEventListener("sessionend",tt),ve&&(ve.dispose(),ve=null),Pt.stop()};function ie(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=st.autoReset,N=j.enabled,B=j.autoUpdate,V=j.needsUpdate,k=j.type;ot(),st.autoReset=S,j.enabled=N,j.autoUpdate=B,j.needsUpdate=V,j.type=k}function re(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const N=S.target;N.removeEventListener("dispose",ae),we(N)}function we(S){xe(S),Ue.remove(S)}function xe(S){const N=Ue.get(S).programs;N!==void 0&&(N.forEach(function(B){fe.releaseProgram(B)}),S.isShaderMaterial&&fe.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,B,V,k,ce){N===null&&(N=Me);const me=k.isMesh&&k.matrixWorld.determinant()<0,be=zd(S,N,B,V,k);pe.setMaterial(V,me);let Te=B.index,ke=1;if(V.wireframe===!0){if(Te=K.getWireframeAttribute(B),Te===void 0)return;ke=2}const Ie=B.drawRange,Re=B.attributes.position;let ut=Ie.start*ke,Ft=(Ie.start+Ie.count)*ke;ce!==null&&(ut=Math.max(ut,ce.start*ke),Ft=Math.min(Ft,(ce.start+ce.count)*ke)),Te!==null?(ut=Math.max(ut,0),Ft=Math.min(Ft,Te.count)):Re!=null&&(ut=Math.max(ut,0),Ft=Math.min(Ft,Re.count));const bt=Ft-ut;if(bt<0||bt===1/0)return;Ne.setup(k,V,be,B,Te);let dn,rt=Ae;if(Te!==null&&(dn=J.get(Te),rt=_e,rt.setIndex(dn)),k.isMesh)V.wireframe===!0?(pe.setLineWidth(V.wireframeLinewidth*We()),rt.setMode(O.LINES)):rt.setMode(O.TRIANGLES);else if(k.isLine){let Be=V.linewidth;Be===void 0&&(Be=1),pe.setLineWidth(Be*We()),k.isLineSegments?rt.setMode(O.LINES):k.isLineLoop?rt.setMode(O.LINE_LOOP):rt.setMode(O.LINE_STRIP)}else k.isPoints?rt.setMode(O.POINTS):k.isSprite&&rt.setMode(O.TRIANGLES);if(k.isBatchedMesh)rt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)rt.renderInstances(ut,bt,k.count);else if(B.isInstancedBufferGeometry){const Be=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ar=Math.min(B.instanceCount,Be);rt.renderInstances(ut,bt,Ar)}else rt.render(ut,bt)};function Qe(S,N,B){S.transparent===!0&&S.side===an&&S.forceSinglePass===!1?(S.side=Ut,S.needsUpdate=!0,_s(S,N,B),S.side=Fn,S.needsUpdate=!0,_s(S,N,B),S.side=an):_s(S,N,B)}this.compile=function(S,N,B=null){B===null&&(B=S),m=Ee.get(B),m.init(),b.push(m),B.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),S!==B&&S.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights(y._useLegacyLights);const V=new Set;return S.traverse(function(k){const ce=k.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const be=ce[me];Qe(be,B,k),V.add(be)}else Qe(ce,B,k),V.add(ce)}),b.pop(),m=null,V},this.compileAsync=function(S,N,B=null){const V=this.compile(S,N,B);return new Promise(k=>{function ce(){if(V.forEach(function(me){Ue.get(me).currentProgram.isReady()&&V.delete(me)}),V.size===0){k(S);return}setTimeout(ce,10)}ye.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let et=null;function xt(S){et&&et(S)}function Rt(){Pt.stop()}function tt(){Pt.start()}const Pt=new ed;Pt.setAnimationLoop(xt),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(S){et=S,Fe.setAnimationLoop(S),S===null?Pt.stop():Pt.start()},Fe.addEventListener("sessionstart",Rt),Fe.addEventListener("sessionend",tt),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(N),N=Fe.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,N,A),m=Ee.get(S,b.length),m.init(),b.push(m),ge.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),z.setFromProjectionMatrix(ge),le=this.localClippingEnabled,q=Oe.init(this.clippingPlanes,le),g=he.get(S,u.length),g.init(),u.push(g),nn(S,N,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(X,Y),this.info.render.frame++,q===!0&&Oe.beginShadows();const B=m.state.shadowsArray;if(j.render(B,S,N),q===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Xe.render(g,S),m.setupLights(y._useLegacyLights),N.isArrayCamera){const V=N.cameras;for(let k=0,ce=V.length;k<ce;k++){const me=V[k];lo(g,S,me,me.viewport)}}else lo(g,S,N);A!==null&&(M.updateMultisampleRenderTarget(A),M.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(y,S,N),Ne.resetDefaultState(),H=-1,E=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,u.pop(),u.length>0?g=u[u.length-1]:g=null};function nn(S,N,B,V){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||z.intersectsSprite(S)){V&&Pe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);const me=Q.update(S),be=S.material;be.visible&&g.push(S,me,be,B,Pe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||z.intersectsObject(S))){const me=Q.update(S),be=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Pe.copy(S.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Pe.copy(me.boundingSphere.center)),Pe.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(be)){const Te=me.groups;for(let ke=0,Ie=Te.length;ke<Ie;ke++){const Re=Te[ke],ut=be[Re.materialIndex];ut&&ut.visible&&g.push(S,me,ut,B,Pe.z,Re)}}else be.visible&&g.push(S,me,be,B,Pe.z,null)}}const ce=S.children;for(let me=0,be=ce.length;me<be;me++)nn(ce[me],N,B,V)}function lo(S,N,B,V){const k=S.opaque,ce=S.transmissive,me=S.transparent;m.setupLightsView(B),q===!0&&Oe.setGlobalState(y.clippingPlanes,B),ce.length>0&&Hd(k,ce,N,B),V&&pe.viewport(w.copy(V)),k.length>0&&vs(k,N,B),ce.length>0&&vs(ce,N,B),me.length>0&&vs(me,N,B),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Hd(S,N,B,V){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const ce=Ce.isWebGL2;ve===null&&(ve=new ii(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?os:On,minFilter:ni,samples:ce?4:0})),y.getDrawingBufferSize(Le),ce?ve.setSize(Le.x,Le.y):ve.setSize(ur(Le.x),ur(Le.y));const me=y.getRenderTarget();y.setRenderTarget(ve),y.getClearColor(te),P=y.getClearAlpha(),P<1&&y.setClearColor(16777215,.5),y.clear();const be=y.toneMapping;y.toneMapping=bn,vs(S,B,V),M.updateMultisampleRenderTarget(ve),M.updateRenderTargetMipmap(ve);let Te=!1;for(let ke=0,Ie=N.length;ke<Ie;ke++){const Re=N[ke],ut=Re.object,Ft=Re.geometry,bt=Re.material,dn=Re.group;if(bt.side===an&&ut.layers.test(V.layers)){const rt=bt.side;bt.side=Ut,bt.needsUpdate=!0,co(ut,B,V,Ft,bt,dn),bt.side=rt,bt.needsUpdate=!0,Te=!0}}Te===!0&&(M.updateMultisampleRenderTarget(ve),M.updateRenderTargetMipmap(ve)),y.setRenderTarget(me),y.setClearColor(te,P),y.toneMapping=be}function vs(S,N,B){const V=N.isScene===!0?N.overrideMaterial:null;for(let k=0,ce=S.length;k<ce;k++){const me=S[k],be=me.object,Te=me.geometry,ke=V===null?me.material:V,Ie=me.group;be.layers.test(B.layers)&&co(be,N,B,Te,ke,Ie)}}function co(S,N,B,V,k,ce){S.onBeforeRender(y,N,B,V,k,ce),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(y,N,B,V,S,ce),k.transparent===!0&&k.side===an&&k.forceSinglePass===!1?(k.side=Ut,k.needsUpdate=!0,y.renderBufferDirect(B,N,V,k,S,ce),k.side=Fn,k.needsUpdate=!0,y.renderBufferDirect(B,N,V,k,S,ce),k.side=an):y.renderBufferDirect(B,N,V,k,S,ce),S.onAfterRender(y,N,B,V,k,ce)}function _s(S,N,B){N.isScene!==!0&&(N=Me);const V=Ue.get(S),k=m.state.lights,ce=m.state.shadowsArray,me=k.state.version,be=fe.getParameters(S,k.state,ce,N,B),Te=fe.getProgramCacheKey(be);let ke=V.programs;V.environment=S.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(S.isMeshStandardMaterial?F:x).get(S.envMap||V.environment),ke===void 0&&(S.addEventListener("dispose",ae),ke=new Map,V.programs=ke);let Ie=ke.get(Te);if(Ie!==void 0){if(V.currentProgram===Ie&&V.lightsStateVersion===me)return uo(S,be),Ie}else be.uniforms=fe.getUniforms(S),S.onBuild(B,be,y),S.onBeforeCompile(be,y),Ie=fe.acquireProgram(be,Te),ke.set(Te,Ie),V.uniforms=be.uniforms;const Re=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=Oe.uniform),uo(S,be),V.needsLights=Wd(S),V.lightsStateVersion=me,V.needsLights&&(Re.ambientLightColor.value=k.state.ambient,Re.lightProbe.value=k.state.probe,Re.directionalLights.value=k.state.directional,Re.directionalLightShadows.value=k.state.directionalShadow,Re.spotLights.value=k.state.spot,Re.spotLightShadows.value=k.state.spotShadow,Re.rectAreaLights.value=k.state.rectArea,Re.ltc_1.value=k.state.rectAreaLTC1,Re.ltc_2.value=k.state.rectAreaLTC2,Re.pointLights.value=k.state.point,Re.pointLightShadows.value=k.state.pointShadow,Re.hemisphereLights.value=k.state.hemi,Re.directionalShadowMap.value=k.state.directionalShadowMap,Re.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Re.spotShadowMap.value=k.state.spotShadowMap,Re.spotLightMatrix.value=k.state.spotLightMatrix,Re.spotLightMap.value=k.state.spotLightMap,Re.pointShadowMap.value=k.state.pointShadowMap,Re.pointShadowMatrix.value=k.state.pointShadowMatrix),V.currentProgram=Ie,V.uniformsList=null,Ie}function ho(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=er.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function uo(S,N){const B=Ue.get(S);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function zd(S,N,B,V,k){N.isScene!==!0&&(N=Me),M.resetTextureUnits();const ce=N.fog,me=V.isMeshStandardMaterial?N.environment:null,be=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Sn,Te=(V.isMeshStandardMaterial?F:x).get(V.envMap||me),ke=V.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ie=!!B.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Re=!!B.morphAttributes.position,ut=!!B.morphAttributes.normal,Ft=!!B.morphAttributes.color;let bt=bn;V.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(bt=y.toneMapping);const dn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,rt=dn!==void 0?dn.length:0,Be=Ue.get(V),Ar=m.state.lights;if(q===!0&&(le===!0||S!==E)){const Gt=S===E&&V.id===H;Oe.setState(V,S,Gt)}let lt=!1;V.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Ar.state.version||Be.outputColorSpace!==be||k.isBatchedMesh&&Be.batching===!1||!k.isBatchedMesh&&Be.batching===!0||k.isInstancedMesh&&Be.instancing===!1||!k.isInstancedMesh&&Be.instancing===!0||k.isSkinnedMesh&&Be.skinning===!1||!k.isSkinnedMesh&&Be.skinning===!0||k.isInstancedMesh&&Be.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Be.instancingColor===!1&&k.instanceColor!==null||Be.envMap!==Te||V.fog===!0&&Be.fog!==ce||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Oe.numPlanes||Be.numIntersection!==Oe.numIntersection)||Be.vertexAlphas!==ke||Be.vertexTangents!==Ie||Be.morphTargets!==Re||Be.morphNormals!==ut||Be.morphColors!==Ft||Be.toneMapping!==bt||Ce.isWebGL2===!0&&Be.morphTargetsCount!==rt)&&(lt=!0):(lt=!0,Be.__version=V.version);let Vn=Be.currentProgram;lt===!0&&(Vn=_s(V,N,k));let po=!1,Xi=!1,Cr=!1;const wt=Vn.getUniforms(),Hn=Be.uniforms;if(pe.useProgram(Vn.program)&&(po=!0,Xi=!0,Cr=!0),V.id!==H&&(H=V.id,Xi=!0),po||E!==S){wt.setValue(O,"projectionMatrix",S.projectionMatrix),wt.setValue(O,"viewMatrix",S.matrixWorldInverse);const Gt=wt.map.cameraPosition;Gt!==void 0&&Gt.setValue(O,Pe.setFromMatrixPosition(S.matrixWorld)),Ce.logarithmicDepthBuffer&&wt.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&wt.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),E!==S&&(E=S,Xi=!0,Cr=!0)}if(k.isSkinnedMesh){wt.setOptional(O,k,"bindMatrix"),wt.setOptional(O,k,"bindMatrixInverse");const Gt=k.skeleton;Gt&&(Ce.floatVertexTextures?(Gt.boneTexture===null&&Gt.computeBoneTexture(),wt.setValue(O,"boneTexture",Gt.boneTexture,M)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}k.isBatchedMesh&&(wt.setOptional(O,k,"batchingTexture"),wt.setValue(O,"batchingTexture",k._matricesTexture,M));const Ir=B.morphAttributes;if((Ir.position!==void 0||Ir.normal!==void 0||Ir.color!==void 0&&Ce.isWebGL2===!0)&&ze.update(k,B,Vn),(Xi||Be.receiveShadow!==k.receiveShadow)&&(Be.receiveShadow=k.receiveShadow,wt.setValue(O,"receiveShadow",k.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Hn.envMap.value=Te,Hn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),Xi&&(wt.setValue(O,"toneMappingExposure",y.toneMappingExposure),Be.needsLights&&Gd(Hn,Cr),ce&&V.fog===!0&&oe.refreshFogUniforms(Hn,ce),oe.refreshMaterialUniforms(Hn,V,$,W,ve),er.upload(O,ho(Be),Hn,M)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(er.upload(O,ho(Be),Hn,M),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&wt.setValue(O,"center",k.center),wt.setValue(O,"modelViewMatrix",k.modelViewMatrix),wt.setValue(O,"normalMatrix",k.normalMatrix),wt.setValue(O,"modelMatrix",k.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Gt=V.uniformsGroups;for(let Lr=0,Yd=Gt.length;Lr<Yd;Lr++)if(Ce.isWebGL2){const fo=Gt[Lr];Ye.update(fo,Vn),Ye.bind(fo,Vn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Vn}function Gd(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Wd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,N,B){Ue.get(S.texture).__webglTexture=N,Ue.get(S.depthTexture).__webglTexture=B;const V=Ue.get(S);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=B===void 0,V.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,N){const B=Ue.get(S);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,B=0){A=S,I=N,C=B;let V=!0,k=null,ce=!1,me=!1;if(S){const Te=Ue.get(S);Te.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(O.FRAMEBUFFER,null),V=!1):Te.__webglFramebuffer===void 0?M.setupRenderTarget(S):Te.__hasExternalTextures&&M.rebindTextures(S,Ue.get(S.texture).__webglTexture,Ue.get(S.depthTexture).__webglTexture);const ke=S.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(me=!0);const Ie=Ue.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ie[N])?k=Ie[N][B]:k=Ie[N],ce=!0):Ce.isWebGL2&&S.samples>0&&M.useMultisampledRTT(S)===!1?k=Ue.get(S).__webglMultisampledFramebuffer:Array.isArray(Ie)?k=Ie[B]:k=Ie,w.copy(S.viewport),D.copy(S.scissor),G=S.scissorTest}else w.copy(Z).multiplyScalar($).floor(),D.copy(ee).multiplyScalar($).floor(),G=de;if(pe.bindFramebuffer(O.FRAMEBUFFER,k)&&Ce.drawBuffers&&V&&pe.drawBuffers(S,k),pe.viewport(w),pe.scissor(D),pe.setScissorTest(G),ce){const Te=Ue.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,Te.__webglTexture,B)}else if(me){const Te=Ue.get(S.texture),ke=N||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Te.__webglTexture,B||0,ke)}H=-1},this.readRenderTargetPixels=function(S,N,B,V,k,ce,me){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ue.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be){pe.bindFramebuffer(O.FRAMEBUFFER,be);try{const Te=S.texture,ke=Te.format,Ie=Te.type;if(ke!==Xt&&ue.convert(ke)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Re=Ie===os&&(ye.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Ie!==On&&ue.convert(Ie)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===_n&&(Ce.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Re){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-V&&B>=0&&B<=S.height-k&&O.readPixels(N,B,V,k,ue.convert(ke),ue.convert(Ie),ce)}finally{const Te=A!==null?Ue.get(A).__webglFramebuffer:null;pe.bindFramebuffer(O.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(S,N,B=0){const V=Math.pow(2,-B),k=Math.floor(N.image.width*V),ce=Math.floor(N.image.height*V);M.setTexture2D(N,0),O.copyTexSubImage2D(O.TEXTURE_2D,B,0,0,S.x,S.y,k,ce),pe.unbindTexture()},this.copyTextureToTexture=function(S,N,B,V=0){const k=N.image.width,ce=N.image.height,me=ue.convert(B.format),be=ue.convert(B.type);M.setTexture2D(B,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment),N.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,V,S.x,S.y,k,ce,me,be,N.image.data):N.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,V,S.x,S.y,N.mipmaps[0].width,N.mipmaps[0].height,me,N.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,V,S.x,S.y,me,be,N.image),V===0&&B.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(S,N,B,V,k=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=S.max.x-S.min.x+1,me=S.max.y-S.min.y+1,be=S.max.z-S.min.z+1,Te=ue.convert(V.format),ke=ue.convert(V.type);let Ie;if(V.isData3DTexture)M.setTexture3D(V,0),Ie=O.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)M.setTexture2DArray(V,0),Ie=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const Re=O.getParameter(O.UNPACK_ROW_LENGTH),ut=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Ft=O.getParameter(O.UNPACK_SKIP_PIXELS),bt=O.getParameter(O.UNPACK_SKIP_ROWS),dn=O.getParameter(O.UNPACK_SKIP_IMAGES),rt=B.isCompressedTexture?B.mipmaps[k]:B.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,rt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,rt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,S.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,S.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,S.min.z),B.isDataTexture||B.isData3DTexture?O.texSubImage3D(Ie,k,N.x,N.y,N.z,ce,me,be,Te,ke,rt.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Ie,k,N.x,N.y,N.z,ce,me,be,Te,rt.data)):O.texSubImage3D(Ie,k,N.x,N.y,N.z,ce,me,be,Te,ke,rt),O.pixelStorei(O.UNPACK_ROW_LENGTH,Re),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ut),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ft),O.pixelStorei(O.UNPACK_SKIP_ROWS,bt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,dn),k===0&&V.generateMipmaps&&O.generateMipmap(Ie),pe.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?M.setTextureCube(S,0):S.isData3DTexture?M.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?M.setTexture2DArray(S,0):M.setTexture2D(S,0),pe.unbindTexture()},this.resetState=function(){I=0,C=0,A=null,pe.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Va?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===br?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ft?En:Hc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===En?ft:Sn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Ev extends Sr{}Ev.prototype.isWebGL1Renderer=!0;class Xa extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Sv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Aa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Nt=new R;class pr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}setX(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=on(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=on(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=on(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=on(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=qe(t,this.array),n=qe(n,this.array),i=qe(i,this.array),r=qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new pr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ld extends Bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let bi;const Zi=new R,Ei=new R,Si=new R,Mi=new Se,Ji=new Se,cd=new Ge,Hs=new R,Qi=new R,zs=new R,Yl=new Se,oa=new Se,Xl=new Se;class Mv extends ht{constructor(e=new ld){if(super(),this.isSprite=!0,this.type="Sprite",bi===void 0){bi=new Ot;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Sv(t,5);bi.setIndex([0,1,2,0,2,3]),bi.setAttribute("position",new pr(n,3,0,!1)),bi.setAttribute("uv",new pr(n,2,3,!1))}this.geometry=bi,this.material=e,this.center=new Se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ei.setFromMatrixScale(this.matrixWorld),cd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Si.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ei.multiplyScalar(-Si.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Gs(Hs.set(-.5,-.5,0),Si,a,Ei,i,r),Gs(Qi.set(.5,-.5,0),Si,a,Ei,i,r),Gs(zs.set(.5,.5,0),Si,a,Ei,i,r),Yl.set(0,0),oa.set(1,0),Xl.set(1,1);let o=e.ray.intersectTriangle(Hs,Qi,zs,!1,Zi);if(o===null&&(Gs(Qi.set(-.5,.5,0),Si,a,Ei,i,r),oa.set(0,1),o=e.ray.intersectTriangle(Hs,zs,Qi,!1,Zi),o===null))return;const l=e.ray.origin.distanceTo(Zi);l<e.near||l>e.far||t.push({distance:l,point:Zi.clone(),uv:Yt.getInterpolation(Zi,Hs,Qi,zs,Yl,oa,Xl,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Gs(s,e,t,n,i,r){Mi.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ji.x=r*Mi.x-i*Mi.y,Ji.y=i*Mi.x+r*Mi.y):Ji.copy(Mi),s.copy(e),s.x+=Ji.x,s.y+=Ji.y,s.applyMatrix4(cd)}const $l=new R,ql=new Je,jl=new Je,wv=new R,Kl=new Ge,Ws=new R,la=new wn,Zl=new Ge,ca=new us;class yy extends dt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Co,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ln),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ws),this.boundingBox.expandByPoint(Ws)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ws),this.boundingSphere.expandByPoint(Ws)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),la.copy(this.boundingSphere),la.applyMatrix4(i),e.ray.intersectsSphere(la)!==!1&&(Zl.copy(i).invert(),ca.copy(e.ray).applyMatrix4(Zl),!(this.boundingBox!==null&&ca.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ca)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Je,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Co?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Uh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ql.fromBufferAttribute(i.attributes.skinIndex,e),jl.fromBufferAttribute(i.attributes.skinWeight,e),$l.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=jl.getComponent(r);if(a!==0){const o=ql.getComponent(r);Kl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(wv.copy($l).applyMatrix4(Kl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class Tv extends ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Av extends It{constructor(e=null,t=1,n=1,i,r,a,o,l,c=St,d=St,h,p){super(null,a,o,l,c,d,i,r,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Jl=new Ge,Cv=new Ge;class dd{constructor(e=[],t=[]){this.uuid=tn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Cv;Jl.multiplyMatrices(o,t[r]),Jl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new dd(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Av(t,e,e,Xt,_n);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Tv),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Ql extends qt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wi=new Ge,ec=new Ge,Ys=[],tc=new ln,Iv=new Ge,es=new dt,ts=new wn;class xy extends dt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ql(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Iv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),tc.copy(e.boundingBox).applyMatrix4(wi),this.boundingBox.union(tc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),ts.copy(e.boundingSphere).applyMatrix4(wi),this.boundingSphere.union(ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(es.geometry=this.geometry,es.material=this.material,es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ts.copy(this.boundingSphere),ts.applyMatrix4(n),e.ray.intersectsSphere(ts)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,wi),ec.multiplyMatrices(n,wi),es.matrixWorld=ec,es.raycast(e,Ys);for(let a=0,o=Ys.length;a<o;a++){const l=Ys[a];l.instanceId=r,l.object=this,t.push(l)}Ys.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ql(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class $a extends Bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const nc=new R,ic=new R,sc=new Ge,da=new us,Xs=new wn;class qa extends ht{constructor(e=new Ot,t=new $a){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)nc.fromBufferAttribute(t,i-1),ic.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=nc.distanceTo(ic);e.setAttribute("lineDistance",new vt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(i),Xs.radius+=r,e.ray.intersectsSphere(Xs)===!1)return;sc.copy(i).invert(),da.copy(e.ray).applyMatrix4(sc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new R,d=new R,h=new R,p=new R,f=this.isLineSegments?2:1,_=n.index,m=n.attributes.position;if(_!==null){const u=Math.max(0,a.start),b=Math.min(_.count,a.start+a.count);for(let y=u,T=b-1;y<T;y+=f){const I=_.getX(y),C=_.getX(y+1);if(c.fromBufferAttribute(m,I),d.fromBufferAttribute(m,C),da.distanceSqToSegment(c,d,p,h)>l)continue;p.applyMatrix4(this.matrixWorld);const H=e.ray.origin.distanceTo(p);H<e.near||H>e.far||t.push({distance:H,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,a.start),b=Math.min(m.count,a.start+a.count);for(let y=u,T=b-1;y<T;y+=f){if(c.fromBufferAttribute(m,y),d.fromBufferAttribute(m,y+1),da.distanceSqToSegment(c,d,p,h)>l)continue;p.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(p);C<e.near||C>e.far||t.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const rc=new R,ac=new R;class Lv extends qa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)rc.fromBufferAttribute(t,i),ac.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rc.distanceTo(ac);e.setAttribute("lineDistance",new vt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class by extends qa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Rv extends Bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const oc=new Ge,Ra=new us,$s=new wn,qs=new R;class Ey extends ht{constructor(e=new Ot,t=new Rv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(i),$s.radius+=r,e.ray.intersectsSphere($s)===!1)return;oc.copy(i).invert(),Ra.copy(e.ray).applyMatrix4(oc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const p=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let _=p,g=f;_<g;_++){const m=c.getX(_);qs.fromBufferAttribute(h,m),lc(qs,m,l,i,e,t,this)}}else{const p=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let _=p,g=f;_<g;_++)qs.fromBufferAttribute(h,_),lc(qs,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function lc(s,e,t,n,i,r,a){const o=Ra.distanceSqToPoint(s);if(o<t){const l=new R;Ra.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Nn extends It{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ja extends Ot{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new R,d=new Se;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,p=3;h<=t;h++,p+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[p]/e+1)/2,d.y=(a[p+1]/e+1)/2,l.push(d.x,d.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new vt(a,3)),this.setAttribute("normal",new vt(o,3)),this.setAttribute("uv",new vt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ja(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ka extends Ot{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const d=[],h=[],p=[],f=[];let _=0;const g=[],m=n/2;let u=0;b(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(d),this.setAttribute("position",new vt(h,3)),this.setAttribute("normal",new vt(p,3)),this.setAttribute("uv",new vt(f,2));function b(){const T=new R,I=new R;let C=0;const A=(t-e)/n;for(let H=0;H<=r;H++){const E=[],w=H/r,D=w*(t-e)+e;for(let G=0;G<=i;G++){const te=G/i,P=te*l+o,U=Math.sin(P),W=Math.cos(P);I.x=D*U,I.y=-w*n+m,I.z=D*W,h.push(I.x,I.y,I.z),T.set(U,A,W).normalize(),p.push(T.x,T.y,T.z),f.push(te,1-w),E.push(_++)}g.push(E)}for(let H=0;H<i;H++)for(let E=0;E<r;E++){const w=g[E][H],D=g[E+1][H],G=g[E+1][H+1],te=g[E][H+1];d.push(w,D,te),d.push(D,G,te),C+=6}c.addGroup(u,C,0),u+=C}function y(T){const I=_,C=new Se,A=new R;let H=0;const E=T===!0?e:t,w=T===!0?1:-1;for(let G=1;G<=i;G++)h.push(0,m*w,0),p.push(0,w,0),f.push(.5,.5),_++;const D=_;for(let G=0;G<=i;G++){const P=G/i*l+o,U=Math.cos(P),W=Math.sin(P);A.x=E*W,A.y=m*w,A.z=E*U,h.push(A.x,A.y,A.z),p.push(0,w,0),C.x=U*.5+.5,C.y=W*.5*w+.5,f.push(C.x,C.y),_++}for(let G=0;G<i;G++){const te=I+G,P=D+G;T===!0?d.push(P,P+1,te):d.push(P+1,P,te),H+=3}c.addGroup(u,H,T===!0?1:2),u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ka(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class fs extends Ot{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new R,p=new R,f=[],_=[],g=[],m=[];for(let u=0;u<=n;u++){const b=[],y=u/n;let T=0;u===0&&a===0?T=.5/t:u===n&&l===Math.PI&&(T=-.5/t);for(let I=0;I<=t;I++){const C=I/t;h.x=-e*Math.cos(i+C*r)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(i+C*r)*Math.sin(a+y*o),_.push(h.x,h.y,h.z),p.copy(h).normalize(),g.push(p.x,p.y,p.z),m.push(C+T,1-y),b.push(c++)}d.push(b)}for(let u=0;u<n;u++)for(let b=0;b<t;b++){const y=d[u][b+1],T=d[u][b],I=d[u+1][b],C=d[u+1][b+1];(u!==0||a>0)&&f.push(y,T,C),(u!==n-1||l<Math.PI)&&f.push(T,I,C)}this.setIndex(f),this.setAttribute("position",new vt(_,3)),this.setAttribute("normal",new vt(g,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Za extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sy extends Za{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function js(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Pv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Nv(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function cc(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function hd(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Mr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Dv extends Mr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:tl,endingEnd:tl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case nl:r=e,o=2*t-n;break;case il:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case nl:a=e,l=2*n-t;break;case il:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,h=this._offsetNext,p=this._weightPrev,f=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,u=-p*m+2*p*g-p*_,b=(1+p)*m+(-1.5-2*p)*g+(-.5+p)*_+1,y=(-1-f)*m+(1.5+f)*g+.5*_,T=f*m-f*g;for(let I=0;I!==o;++I)r[I]=u*a[d+I]+b*a[c+I]+y*a[l+I]+T*a[h+I];return r}}class Uv extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(i-t),h=1-d;for(let p=0;p!==o;++p)r[p]=a[c+p]*h+a[l+p]*d;return r}}class Ov extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class cn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=js(t,this.TimeBufferType),this.values=js(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:js(e.times,Array),values:js(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ov(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Uv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Dv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ar:t=this.InterpolantFactoryMethodDiscrete;break;case or:t=this.InterpolantFactoryMethodLinear;break;case kr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ar;case this.InterpolantFactoryMethodLinear:return or;case this.InterpolantFactoryMethodSmooth:return kr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Pv(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===kr,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(i)l=!0;else{const h=o*n,p=h-n,f=h+n;for(let _=0;_!==n;++_){const g=t[h+_];if(g!==t[p+_]||g!==t[f+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,p=a*n;for(let f=0;f!==n;++f)t[p+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=or;class Wi extends cn{}Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=ar;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;class ud extends cn{}ud.prototype.ValueTypeName="color";class fr extends cn{}fr.prototype.ValueTypeName="number";class kv extends Mr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let d=c+o;c!==d;c+=4)Mn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class ms extends cn{InterpolantFactoryMethodLinear(e){return new kv(this.times,this.values,this.getValueSize(),e)}}ms.prototype.ValueTypeName="quaternion";ms.prototype.DefaultInterpolation=or;ms.prototype.InterpolantFactoryMethodSmooth=void 0;class Yi extends cn{}Yi.prototype.ValueTypeName="string";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=ar;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;class mr extends cn{}mr.prototype.ValueTypeName="vector";class My{constructor(e,t=-1,n,i=Yh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=tn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Bv(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(cn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const d=Nv(l);l=cc(l,1,d),c=cc(c,1,d),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new fr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],d=c.name.match(r);if(d&&d.length>1){const h=d[1];let p=i[h];p||(i[h]=p=[]),p.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,p,f,_,g){if(f.length!==0){const m=[],u=[];hd(f,m,u,_),m.length!==0&&g.push(new h(p,m,u))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const p=c[h].keys;if(!(!p||p.length===0))if(p[0].morphTargets){const f={};let _;for(_=0;_<p.length;_++)if(p[_].morphTargets)for(let g=0;g<p[_].morphTargets.length;g++)f[p[_].morphTargets[g]]=-1;for(const g in f){const m=[],u=[];for(let b=0;b!==p[_].morphTargets.length;++b){const y=p[_];m.push(y.time),u.push(y.morphTarget===g?1:0)}i.push(new fr(".morphTargetInfluence["+g+"]",m,u))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(mr,f+".position",p,"pos",i),n(ms,f+".quaternion",p,"rot",i),n(mr,f+".scale",p,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Fv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fr;case"vector":case"vector2":case"vector3":case"vector4":return mr;case"color":return ud;case"quaternion":return ms;case"bool":case"boolean":return Wi;case"string":return Yi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Bv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Fv(s.type);if(s.times===void 0){const t=[],n=[];hd(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Dn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Vv{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&i.onStart!==void 0&&i.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,i.onProgress!==void 0&&i.onProgress(d,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,p=c.length;h<p;h+=2){const f=c[h],_=c[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return _}return null}}}const Hv=new Vv;class gs{constructor(e){this.manager=e!==void 0?e:Hv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}gs.DEFAULT_MATERIAL_NAME="__DEFAULT";const gn={};class zv extends Error{constructor(e,t){super(e),this.response=t}}class wy extends gs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Dn.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(gn[e]!==void 0){gn[e].push({onLoad:t,onProgress:n,onError:i});return}gn[e]=[],gn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=gn[e],h=c.body.getReader(),p=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=p?parseInt(p):0,_=f!==0;let g=0;const m=new ReadableStream({start(u){b();function b(){h.read().then(({done:y,value:T})=>{if(y)u.close();else{g+=T.byteLength;const I=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:f});for(let C=0,A=d.length;C<A;C++){const H=d[C];H.onProgress&&H.onProgress(I)}u.enqueue(T),b()}})}}});return new Response(m)}else throw new zv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),p=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(p);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{Dn.add(e,c);const d=gn[e];delete gn[e];for(let h=0,p=d.length;h<p;h++){const f=d[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const d=gn[e];if(d===void 0)throw this.manager.itemError(e),c;delete gn[e];for(let h=0,p=d.length;h<p;h++){const f=d[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Gv extends gs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Dn.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=ls("img");function l(){d(),Dn.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){d(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Ty extends gs{constructor(e){super(e)}load(e,t,n,i){const r=new It,a=new Gv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class wr extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const ha=new Ge,dc=new R,hc=new R;class Ja{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ga,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;dc.setFromMatrixPosition(e.matrixWorld),t.position.copy(dc),hc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hc),t.updateMatrixWorld(),ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ha),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Wv extends Ja{constructor(){super(new Ct(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Fi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ay extends wr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Wv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const uc=new Ge,ns=new R,ua=new R;class Yv extends Ja{constructor(){super(new Ct(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Se(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ns.setFromMatrixPosition(e.matrixWorld),n.position.copy(ns),ua.copy(n.position),ua.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ua),n.updateMatrixWorld(),i.makeTranslation(-ns.x,-ns.y,-ns.z),uc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc)}}class Cy extends wr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Yv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Xv extends Ja{constructor(){super(new td(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pd extends wr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new Xv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class fd extends wr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Iy{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Ly extends gs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Dn.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Dn.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Dn.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Dn.add(e,l),r.manager.itemStart(e)}}const Qa="\\[\\]\\.:\\/",$v=new RegExp("["+Qa+"]","g"),eo="[^"+Qa+"]",qv="[^"+Qa.replace("\\.","")+"]",jv=/((?:WC+[\/:])*)/.source.replace("WC",eo),Kv=/(WCOD+)?/.source.replace("WCOD",qv),Zv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",eo),Jv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",eo),Qv=new RegExp("^"+jv+Kv+Zv+Jv+"$"),e_=["material","materials","bones","map"];class t_{constructor(e,t,n){const i=n||je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class je{constructor(e,t,n){this.path=t,this.parsedPath=n||je.parseTrackName(t),this.node=je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new je.Composite(e,t,n):new je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($v,"")}static parseTrackName(e){const t=Qv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);e_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}je.Composite=t_;je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};je.prototype.GetterByBindingType=[je.prototype._getValue_direct,je.prototype._getValue_array,je.prototype._getValue_arrayElement,je.prototype._getValue_toArray];je.prototype.SetterByBindingTypeAndVersioning=[[je.prototype._setValue_direct,je.prototype._setValue_direct_setNeedsUpdate,je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[je.prototype._setValue_array,je.prototype._setValue_array_setNeedsUpdate,je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[je.prototype._setValue_arrayElement,je.prototype._setValue_arrayElement_setNeedsUpdate,je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[je.prototype._setValue_fromArray,je.prototype._setValue_fromArray_setNeedsUpdate,je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class cs{constructor(e,t,n=0,i=1/0){this.ray=new us(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new za,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Pa(e,this,n,t),n.sort(pc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Pa(e[i],this,n,t);return n.sort(pc),n}}function pc(s,e){return s.distance-e.distance}function Pa(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,a=i.length;r<a;r++)Pa(i[r],e,t,!0)}}class Ry{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Mt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class n_ extends Lv{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ot;i.setAttribute("position",new vt(t,3)),i.setAttribute("color",new vt(n,3));const r=new $a({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){const i=new He,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fa);var Ht=(s=>(s.THUMB="thumb",s.PANO_LOW="panoLow",s.PANO="pano",s.VIDEO="video",s.COVER="cover",s.MAP="map",s.DOLLHOUSE="dollhouse",s))(Ht||{});function zt(s,e){return!s||typeof s!="string"||s.trim()===""?"":s.trim()}function i_(s,e){return new Promise((t,n)=>{const i=zt(s);if(!i){n(new Error(`资源 URL 为空 (${e})`));return}if(e==="video"){const r=document.createElement("video");r.preload="metadata",r.onloadedmetadata=()=>t(),r.onerror=()=>n(new Error(`视频加载失败: ${i}`)),r.src=i}else Di(async()=>{const{toProxiedImageUrl:r}=await Promise.resolve().then(()=>_d);return{toProxiedImageUrl:r}},void 0,import.meta.url).then(({toProxiedImageUrl:r})=>{const a=new Image;a.referrerPolicy="no-referrer",a.crossOrigin="anonymous",a.loading="lazy",a.decoding="async",a.onload=()=>t(),a.onerror=()=>n(new Error(`图片加载失败: ${i}`)),a.src=r(i)}).catch(r=>{n(new Error(`导入代理工具失败: ${r}`))})})}const s_=Object.freeze(Object.defineProperty({__proto__:null,AssetType:Ht,preloadAsset:i_,resolveAssetUrl:zt},Symbol.toStringTag,{value:"Module"}));function ds(){const s=document;return!!(document.fullscreenElement||s.webkitFullscreenElement)}function r_(){const s=()=>{};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}var at=(s=>(s.LOADING_LOW="loadingLow",s.LOW_READY="lowReady",s.LOADING_HIGH="loadingHigh",s.HIGH_READY="highReady",s.DEGRADED="degraded",s.ERROR="error",s))(at||{});class a_{constructor(){v(this,"element");v(this,"currentStatus","loadingLow");v(this,"autoHideTimer",null);this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){if(ds()){this.hide();return}this.currentStatus=e,this.render(),e==="highReady"||e==="lowReady"?(this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.autoHideTimer=window.setTimeout(()=>{this.hide()},3e3)):this.show()}render(){const{text:e,icon:t,className:n}=this.getStatusInfo();this.element.innerHTML=`
      <div class="quality-indicator-content ${n}">
        <span class="quality-icon">${t}</span>
        <span class="quality-text">${e}</span>
      </div>
    `}getStatusInfo(){switch(this.currentStatus){case"loadingLow":return{text:"正在加载低清图...",icon:"⏳",className:"status-loading"};case"lowReady":return{text:"低清图已加载",icon:"✅",className:"status-ready"};case"loadingHigh":return{text:"正在加载高清图...",icon:"⏳",className:"status-loading"};case"highReady":return{text:"已切换至高清",icon:"✨",className:"status-ready"};case"degraded":return{text:"当前为低清模式（网络较慢）",icon:"⚠️",className:"status-degraded"};case"error":return{text:"加载失败",icon:"❌",className:"status-error"};default:return{text:"",icon:"",className:""}}}show(){this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
      .quality-indicator {
        position: fixed;
        left: 50%;
        top: calc(16px + env(safe-area-inset-top, 0px));
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
      }
      .quality-indicator.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .quality-indicator-content {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(0, 0, 0, 0.75);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        font-size: 13px;
        color: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      .quality-icon {
        font-size: 14px;
      }
      .quality-text {
        white-space: nowrap;
      }
      .status-loading {
        border-left: 3px solid #4a90e2;
      }
      .status-ready {
        border-left: 3px solid #27ae60;
      }
      .status-degraded {
        border-left: 3px solid #f39c12;
      }
      .status-error {
        border-left: 3px solid #e74c3c;
      }
      @media (max-width: 480px), ((max-width: 520px) and (pointer: coarse)) {
        .quality-indicator-content {
          padding: 6px 12px;
          font-size: 12px;
        }
      }
    `,document.head.appendChild(e)}}const md="vr_quality";function Na(){if(typeof window>"u")return"high";try{const s=window.localStorage.getItem(md);if(s==="low"||s==="high")return s}catch{}return"high"}function o_(s){if(!(typeof window>"u"))try{window.localStorage.setItem(md,s)}catch{}}function l_(s=512){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");if(!t){const c=new Nn(e);return c.needsUpdate=!0,c}const n=s/2,i=s/2,r=s/2*.92;t.clearRect(0,0,s,s);const a=t.createRadialGradient(n,i,r*.25,n,i,r);a.addColorStop(0,"rgba(0,0,0,0.00)"),a.addColorStop(.55,"rgba(0,0,0,0.18)"),a.addColorStop(1,"rgba(0,0,0,0.55)"),t.fillStyle=a,t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.closePath(),t.fill(),t.fillStyle="rgba(0,0,0,0.55)",t.beginPath(),t.arc(n,i,r*.28,0,Math.PI*2),t.closePath(),t.fill();const o=t.createRadialGradient(n,i,0,n,i,r*.42);o.addColorStop(0,"rgba(0,0,0,0.22)"),o.addColorStop(1,"rgba(0,0,0,0.00)"),t.fillStyle=o,t.beginPath(),t.arc(n,i,r*.42,0,Math.PI*2),t.closePath(),t.fill(),t.save(),t.translate(n,i);for(let c=0;c<360;c+=30){const d=c*Math.PI/180,h=c%90===0,p=h?r*.12:r*.07,f=h?2:1;t.strokeStyle=h?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.14)",t.lineWidth=f,t.beginPath(),t.moveTo(Math.sin(d)*(r-p),-Math.cos(d)*(r-p)),t.lineTo(Math.sin(d)*r,-Math.cos(d)*r),t.stroke()}t.restore(),t.strokeStyle="rgba(255,255,255,0.08)",t.lineWidth=2,t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.closePath(),t.stroke();const l=new Nn(e);return l.colorSpace=ft,l.center.set(.5,.5),l.rotation=0,l.flipY=!1,l.needsUpdate=!0,l}const ct=typeof window<"u"?new URLSearchParams(window.location.search).get("debug")==="1":!1;function $e(...s){ct&&console.debug("[VR Debug]",...s)}function c_(s){return Math.max(0,Math.min(1,s))}function d_(s){const e=c_(s);return e*e*(3-2*e)}class h_{constructor(e,t){v(this,"mesh");v(this,"needleMesh",null);v(this,"texture");v(this,"radius");v(this,"opacity",0);v(this,"northYaw",0);v(this,"debugHelper",null);v(this,"labelSprites",new Map);v(this,"patchRadius",0);v(this,"showPitchDeg",-45);v(this,"fadeRangeDeg",18);v(this,"fadeTauMs",140);v(this,"lastRotationY",0);v(this,"debugFrameCount",0);v(this,"isDebugVisible",!0);this.radius=t;const n=t*.18;this.patchRadius=n;const i=new ja(n,96);i.rotateX(Math.PI/2),this.texture=l_(512);const r=new kn({map:this.texture,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:an});this.mesh=new dt(i,r),this.mesh.name="NadirPatch-compass-disk",this.mesh.position.set(0,-t+.5,0),this.mesh.renderOrder=9999,this.mesh.visible=!1,this.mesh.rotation.y=0,e.add(this.mesh);const a=n*.008,o=n*.35,l=new Ka(a,a,o,8);l.rotateX(Math.PI/2),l.translate(0,0,o/2);const c=new kn({color:16777215,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1});if(this.needleMesh=new dt(l,c),this.needleMesh.name="NadirPatch-compass-needle",this.needleMesh.position.set(0,-t+.51,0),this.needleMesh.rotation.order="YXZ",this.needleMesh.renderOrder=1e4,this.needleMesh.visible=!1,e.add(this.needleMesh),this.createLabelSprites(e,n,t),ct&&(r.color.setHex(65535),this.debugHelper=new n_(n*.5),this.debugHelper.position.copy(this.mesh.position),this.debugHelper.renderOrder=10001,e.add(this.debugHelper),console.debug("[NadirPatch] 对象已创建:",{uuid:this.mesh.uuid,name:this.mesh.name,type:this.mesh.type,position:this.mesh.position,rotation:this.mesh.rotation})),typeof window<"u"){const d=h=>{(h.key==="N"||h.key==="n")&&!(h.target instanceof HTMLInputElement||h.target instanceof HTMLTextAreaElement)&&(h.preventDefault(),this.isDebugVisible=!this.isDebugVisible,this.mesh.visible=this.isDebugVisible&&this.opacity>.01,this.needleMesh&&(this.needleMesh.visible=this.isDebugVisible&&this.opacity>.01),this.debugHelper&&(this.debugHelper.visible=this.isDebugVisible&&this.opacity>.01),console.debug(`[NadirPatch] 显示状态切换为: ${this.isDebugVisible?"显示":"隐藏"}`))};window.addEventListener("keydown",d)}}setNorthYaw(e){this.northYaw=e}update(e,t,n){var f;const i=t.yaw,r=this.northYaw??0,a=gt.degToRad(-r);this.mesh.rotation.y=a,this.texture.rotation=0,this.texture.center.set(.5,.5);const o=-r;this.updateLabelSprites(o),this.needleMesh&&(this.needleMesh.rotation.y=gt.degToRad(i)),ct&&(this.debugFrameCount++,this.debugFrameCount%30===0&&(Math.abs(this.mesh.rotation.y-this.lastRotationY)>.001&&console.debug("[NadirPatch] 旋转变化:",{frame:this.debugFrameCount,cameraYaw:i.toFixed(2),northYaw:r.toFixed(2),needleYaw:i.toFixed(2),diskRotationY:this.mesh.rotation.y,needleRotationY:(f=this.needleMesh)==null?void 0:f.rotation.y,diskPosition:this.mesh.position}),this.lastRotationY=this.mesh.rotation.y));const c=d_((this.showPitchDeg-t.pitch)/this.fadeRangeDeg),d=1-Math.exp(-(n||16.7)/this.fadeTauMs);this.opacity=this.opacity+(c-this.opacity)*d;const h=this.mesh.material;h.opacity=this.opacity;const p=this.isDebugVisible&&this.opacity>.01;if(this.mesh.visible=p,this.needleMesh){this.needleMesh.visible=p;const _=this.needleMesh.material;_.opacity=this.opacity*.9}this.labelSprites.forEach(_=>{_.visible=p;const g=_.material;g.opacity=this.opacity*.85}),this.debugHelper&&(this.debugHelper.visible=p)}createLabelSprites(e,t,n){[{text:"北",baseAngle:0},{text:"东",baseAngle:270},{text:"南",baseAngle:180},{text:"西",baseAngle:90}].forEach(({text:r})=>{const a=document.createElement("canvas"),o=128;a.width=o,a.height=o;const l=a.getContext("2d");if(!l)return;l.clearRect(0,0,o,o),l.save(),l.shadowColor="rgba(255, 255, 255, 0.8)",l.shadowBlur=8,l.shadowOffsetX=0,l.shadowOffsetY=0,l.fillStyle="rgba(255, 255, 255, 0.85)",l.font=`600 ${Math.round(o*.5)}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`,l.textAlign="center",l.textBaseline="middle",l.fillText(r,o/2,o/2),l.restore();const c=new Nn(a);c.colorSpace=ft,c.needsUpdate=!0;const d=new ld({map:c,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1}),h=new Mv(d);h.name=`NadirPatch-label-${r}`,h.position.set(0,-n+.52,0),h.renderOrder=10001,h.visible=!1;const p=t*.15;h.scale.set(p,p,1),e.add(h),this.labelSprites.set(r,h)})}updateLabelSprites(e){[{text:"北",baseAngle:0},{text:"东",baseAngle:270},{text:"南",baseAngle:180},{text:"西",baseAngle:90}].forEach(({text:n,baseAngle:i})=>{const r=this.labelSprites.get(n);if(!r)return;const a=i+e,o=this.patchRadius*.56,l=gt.degToRad(a),c=-this.radius+.5,d=Math.sin(l)*o,h=Math.cos(l)*o;r.position.set(d,c+.02,h);const p=new R(0,0,0);r.lookAt(p)})}dispose(e){e.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.texture.dispose(),this.needleMesh&&(e.remove(this.needleMesh),this.needleMesh.geometry.dispose(),this.needleMesh.material.dispose()),this.labelSprites.forEach(t=>{e.remove(t),t.material.dispose(),t.material.map&&t.material.map.dispose()}),this.labelSprites.clear(),this.debugHelper&&(e.remove(this.debugHelper),this.debugHelper.dispose())}}function u_(s,e,t){const n=(s-t.left)/t.width*2-1,i=-((e-t.top)/t.height*2-1);return{x:n,y:i}}function p_(s,e,t,n=500){const i=new cs;i.setFromCamera(new Se(s,e),t);const r=i.ray.direction;if(!r||r.length()===0)return null;const a=r.normalize(),o=Math.asin(Math.max(-1,Math.min(1,a.y))),l=gt.radToDeg(o),c=Math.atan2(a.x,a.z);return{yaw:gt.radToDeg(c),pitch:l}}const Da=-55,f_=-90;function to(s){const e=Math.max(0,Math.min(1,(s-Da)/(f_-Da))),t=e,n=-e*8,i=1-e*.7,r=e*2;return{opacity:t,translateY:n,scaleY:i,blur:r,clarity:e}}function no(s){return s<=Da}class m_{constructor(){v(this,"listeners",new Map);v(this,"lastInteractionTs",0);v(this,"idleDelay",800);v(this,"idleTimer",null);v(this,"rafId",null);v(this,"isScheduled",!1);this.listeners.set("user-interacting",new Set),this.listeners.set("user-idle",new Set),this.listeners.set("ui-engaged",new Set)}on(e,t){const n=this.listeners.get(e);return n?(n.add(t),()=>{n.delete(t)}):(console.warn(`[InteractionBus] 未知事件类型: ${e}`),()=>{})}off(e,t){const n=this.listeners.get(e);n&&n.delete(t)}emit(e){this.isScheduled||(this.isScheduled=!0,this.rafId=requestAnimationFrame(()=>{this.isScheduled=!1;const t=this.listeners.get(e);t&&t.forEach(n=>{try{n()}catch(i){console.error("[InteractionBus] 事件监听器执行失败:",i)}})}))}emitInteracting(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("user-interacting")}scheduleIdle(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.idleTimer=window.setTimeout(()=>{Date.now()-this.lastInteractionTs>=this.idleDelay&&(this.idleTimer=null,this.emit("user-idle"))},this.idleDelay)}emitUIEngaged(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("ui-engaged")}dispose(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.listeners.forEach(e=>e.clear()),this.listeners.clear()}}const it=new m_;class g_{constructor(e={}){v(this,"root");v(this,"disk");v(this,"mask");v(this,"polemask");v(this,"northLabel");v(this,"eastLabel");v(this,"southLabel");v(this,"westLabel");v(this,"needle");v(this,"currentYaw",0);v(this,"currentPitch",0);v(this,"northYaw",0);v(this,"sceneId","");v(this,"northYawLabel",null);v(this,"isVisible",!1);v(this,"unsubscribeInteracting",null);v(this,"unsubscribeIdle",null);v(this,"unsubscribeUIEngaged",null);v(this,"baseOpacity",0);this.root=document.createElement("div"),this.root.className="vr-compass",this.root.setAttribute("data-ui","CompassDisk"),this.root.style.outline="2px solid #ff00ff",this.disk=document.createElement("div"),this.disk.className="vr-compass__disk",this.disk.setAttribute("data-ui","CompassDisk-disk"),this.mask=document.createElement("div"),this.mask.className="vr-compass__mask",this.polemask=document.createElement("div"),this.polemask.className="vr-compass__polemask",this.polemask.setAttribute("aria-hidden","true"),this.northLabel=document.createElement("div"),this.northLabel.className="vr-compass__label vr-compass__label--north",this.northLabel.textContent="北",this.eastLabel=document.createElement("div"),this.eastLabel.className="vr-compass__label vr-compass__label--east",this.eastLabel.textContent="东",this.southLabel=document.createElement("div"),this.southLabel.className="vr-compass__label vr-compass__label--south",this.southLabel.textContent="南",this.westLabel=document.createElement("div"),this.westLabel.className="vr-compass__label vr-compass__label--west",this.westLabel.textContent="西",this.needle=document.createElement("div"),this.needle.className="vr-compass__needle",this.needle.setAttribute("data-ui","CompassDisk-needle"),this.northYawLabel=document.createElement("div"),this.northYawLabel.className="vr-compass__north-yaw-label",this.northYawLabel.style.cssText=`
      position: absolute;
      bottom: -20px;
      right: 10px;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.6);
      font-family: monospace;
      pointer-events: none;
      display: none;
    `,this.disk.appendChild(this.mask),this.disk.appendChild(this.polemask),this.disk.appendChild(this.northLabel),this.disk.appendChild(this.eastLabel),this.disk.appendChild(this.southLabel),this.disk.appendChild(this.westLabel),this.disk.appendChild(this.needle),this.root.appendChild(this.disk),this.root.appendChild(this.northYawLabel),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.root.style.setProperty("--compass-disk-rot","0deg"),this.root.style.setProperty("--compass-needle-rot","0deg"),this.root.style.setProperty("--compass-label-counter-rot","0deg"),this.setupInteractionListeners()}setupInteractionListeners(){this.unsubscribeInteracting=it.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=it.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=it.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}mount(e){e.appendChild(this.root)}setSceneId(e){this.sceneId=e,this.updateNorthYawLabel()}setNorthYaw(e){this.northYaw=e,this.updateNorthYawLabel()}updateNorthYawLabel(){this.northYawLabel&&(this.sceneId==="gate"&&typeof this.northYaw=="number"?(this.northYawLabel.textContent=`N=${this.northYaw.toFixed(1)}`,this.northYawLabel.style.display="block"):this.northYawLabel.style.display="none")}updateYawLabel(e){this.northYawLabel&&(this.sceneId==="gate"&&typeof this.northYaw=="number"?(this.northYawLabel.textContent=`N=${this.northYaw.toFixed(1)} Yaw=${e.toFixed(1)}`,this.northYawLabel.style.display="block"):this.northYawLabel.style.display="none")}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,no(t)){const i=to(t);this.baseOpacity=i.opacity,this.root.style.setProperty("--vr-ground-clarity",String(i.clarity)),this.root.style.opacity=i.opacity.toString();const r=`translateX(-50%) translateY(${i.translateY}px) scaleY(${i.scaleY})`;this.root.classList.contains("vr-ui-interacting")?this.root.style.transform=r:this.root.style.transform=r,this.root.style.setProperty("--vr-ground-base-blur",`${i.blur}px`);const a=e,l=-(this.northYaw??0),c=a;this.root.style.setProperty("--compass-disk-rot",`${l}deg`),this.root.style.setProperty("--compass-needle-rot",`${c}deg`);const d=42,h=(p,f)=>{const _=f+l,g=_+180;p.style.transform=`rotate(${_}deg) translateY(-${d}%) rotate(${g}deg)`};h(this.northLabel,0),h(this.eastLabel,270),h(this.southLabel,180),h(this.westLabel,90),this.updateYawLabel(e),this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.northLabel.style.transform="",this.eastLabel.style.transform="",this.southLabel.style.transform="",this.westLabel.style.transform="",this.isVisible=!1,this.baseOpacity=0)}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}const fc=60,pa=14,v_=4,mc=650,__=120,gc=900,Ks=-62,y_=150;class x_{constructor(e){v(this,"root");v(this,"container");v(this,"dots",new Map);v(this,"dotYawDeg",new Map);v(this,"currentYaw",0);v(this,"currentPitch",0);v(this,"isVisible",!1);v(this,"museumId");v(this,"currentSceneId");v(this,"sceneHotspots");v(this,"hoverSceneId",null);v(this,"onNavigateToScene");v(this,"unsubscribeFocus");v(this,"lastYawDeg",0);v(this,"lastPitchDeg",0);v(this,"aimedSceneId",null);v(this,"isInteracting",!1);v(this,"unsubscribeInteracting");v(this,"unsubscribeIdle");v(this,"unsubscribeUIEngaged");v(this,"idleRecoveryTimer",null);v(this,"lastAimChangeTs",0);v(this,"autoNavTimer",null);v(this,"autoNavTargetSceneId",null);v(this,"lastAutoNavTs",0);v(this,"aimDebounceTimer",null);this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.sceneHotspots=e.sceneHotspots,this.onNavigateToScene=e.onNavigateToScene||Qt,this.root=document.createElement("div"),this.root.className="vr-groundnav",this.root.setAttribute("data-ui","GroundNavDots"),this.root.style.outline="2px solid #00ffff",this.container=document.createElement("div"),this.container.className="vr-groundnav__container",this.root.appendChild(this.container),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.unsubscribeFocus=yr(t=>{this.handleSceneFocus(t)}),this.setupInteractionListeners(),this.renderDots()}setupInteractionListeners(){this.unsubscribeInteracting=it.on("user-interacting",()=>{$e("统一终止触发点: 用户交互"),this.isInteracting=!0,this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav()}),this.unsubscribeIdle=it.on("user-idle",()=>{this.idleRecoveryTimer!==null&&(clearTimeout(this.idleRecoveryTimer),this.idleRecoveryTimer=null),this.idleRecoveryTimer=window.setTimeout(()=>{if(this.idleRecoveryTimer=null,!this.root.parentNode){$e("idleRecoveryTimer: component disposed, skipping");return}this.isInteracting=!1},400)}),this.unsubscribeUIEngaged=it.on("ui-engaged",()=>{$e("统一终止触发点: UI 点击"),this.clearAllTimers(),this.isInteracting=!1,this.clearAimed(),this.cancelAutoNav()})}clearAimDebounce(){this.aimDebounceTimer!==null&&(window.clearTimeout(this.aimDebounceTimer),this.aimDebounceTimer=null)}clearAllTimers(){this.clearAimDebounce(),this.idleRecoveryTimer!==null&&(clearTimeout(this.idleRecoveryTimer),this.idleRecoveryTimer=null),this.autoNavTimer!==null&&(clearTimeout(this.autoNavTimer),this.autoNavTimer=null)}normalizeDeg(e){return(e%360+360)%360}shortestDeltaDeg(e,t){return(this.normalizeDeg(e)-this.normalizeDeg(t)+180)%360-180}clearAimed(){if(this.aimedSceneId!==null){const e=this.dots.get(this.aimedSceneId);e&&(e.classList.remove("is-aimed","is-autonav","is-autonav-progress"),this.removeProgress(this.aimedSceneId)),this.aimedSceneId=null,this.clearAimDebounce(),this.emitSceneAim("clear",null)}this.cancelAutoNav()}cancelAutoNav(){if(this.autoNavTimer!=null&&(window.clearTimeout(this.autoNavTimer),this.autoNavTimer=null),this.autoNavTargetSceneId!==null){const e=this.autoNavTargetSceneId;if(e){this.removeProgress(e);const t=this.dots.get(e);t&&t.classList.remove("is-autonav","is-autonav-progress"),this.emitSceneAutoNav("cancel",e)}this.autoNavTargetSceneId=null}}removeProgress(e){const t=this.dots.get(e);if(!t)return;const n=t.querySelector(".vr-groundnav__progress");n&&t.removeChild(n)}addProgress(e){const t=this.dots.get(e);if(!t)return;this.removeProgress(e);const n=document.createElement("div");n.className="vr-groundnav__progress",n.style.setProperty("--progress-duration",`${mc}ms`),t.appendChild(n),t.classList.add("is-autonav-progress")}scheduleAutoNavIfAllowed(e){if(!e){$e("scheduleAutoNavIfAllowed: sceneId is missing, skipping");return}const t=Date.now();if(this.isInteracting){$e("scheduleAutoNavIfAllowed: isInteracting, skipping");return}if(this.lastPitchDeg>Ks){$e("scheduleAutoNavIfAllowed: pitch too high, skipping",this.lastPitchDeg);return}if(t-this.lastAutoNavTs<gc){$e("scheduleAutoNavIfAllowed: cooldown, skipping");return}if(t-this.lastAimChangeTs<__){$e("scheduleAutoNavIfAllowed: min dwell, skipping");return}if(this.currentSceneId&&e===this.currentSceneId){$e("scheduleAutoNavIfAllowed: same as current scene, skipping");return}this.autoNavTargetSceneId!==null&&this.autoNavTargetSceneId!==e&&this.cancelAutoNav(),$e("scene-autonav: start",{sceneId:e}),this.autoNavTargetSceneId=e;const n=this.dots.get(e);n&&(n.classList.add("is-autonav"),this.addProgress(e)),this.emitSceneAutoNav("start",e),this.autoNavTimer=window.setTimeout(()=>{if(this.autoNavTimer=null,!this.root.parentNode){$e("autoNavTimer: component disposed, skipping");return}if(!e){$e("autoNavTimer: sceneId is missing, skipping");return}this.tryAutoNavigate(e)},mc)}tryAutoNavigate(e){if(!e){$e("tryAutoNavigate: sceneId is missing, skipping"),this.cancelAutoNav();return}if(this.isInteracting){$e("tryAutoNavigate: isInteracting, canceling"),this.cancelAutoNav(),this.clearAimed();return}if(!this.aimedSceneId||this.aimedSceneId!==e){$e("tryAutoNavigate: aimedSceneId mismatch, canceling",{aimedSceneId:this.aimedSceneId,sceneId:e}),this.cancelAutoNav(),this.clearAimed();return}if(this.lastPitchDeg>Ks){$e("tryAutoNavigate: pitch too high, canceling",this.lastPitchDeg),this.cancelAutoNav(),this.clearAimed();return}const t=Date.now();if(t-this.lastAutoNavTs<gc){$e("tryAutoNavigate: cooldown, canceling"),this.cancelAutoNav(),this.clearAimed();return}if(!this.museumId){$e("tryAutoNavigate: museumId is missing, canceling"),this.cancelAutoNav(),this.clearAimed();return}$e("scene-autonav: trigger",{museumId:this.museumId,sceneId:e});const n=e;this.cancelAutoNav(),this.clearAimed(),this.lastAutoNavTs=t,window.dispatchEvent(new CustomEvent("vr:close-panels")),en({type:"focus",museumId:this.museumId,sceneId:n,source:"pano-auto",ts:t}),this.onNavigateToScene(this.museumId,n)}maybeRescheduleOrCancelByPitch(e){e>Ks?(this.autoNavTargetSceneId&&this.cancelAutoNav(),this.aimedSceneId&&this.clearAimed()):this.aimedSceneId&&e<=Ks&&!this.isInteracting&&!this.autoNavTimer&&this.aimedSceneId!==this.autoNavTargetSceneId&&this.scheduleAutoNavIfAllowed(this.aimedSceneId)}emitSceneAim(e,t){if(!this.museumId){$e("emitSceneAim: museumId is missing, skipping");return}$e("scene-aim",{type:e,museumId:this.museumId,sceneId:t}),window.dispatchEvent(new CustomEvent("vr:scene-aim",{detail:{type:e,museumId:this.museumId,sceneId:t||void 0,source:"groundnav",ts:Date.now()}}))}emitSceneAutoNav(e,t){if(!this.museumId){$e("emitSceneAutoNav: museumId is missing, skipping");return}$e("scene-autonav",{type:e,museumId:this.museumId,sceneId:t}),window.dispatchEvent(new CustomEvent("vr:scene-autonav",{detail:{type:e,museumId:this.museumId,sceneId:t??void 0,ts:Date.now()}}))}updateAimed(e){if(this.isInteracting||!this.isVisible){this.clearAimed();return}const t=this.sceneHotspots.filter(a=>{var o;return(o=a.target)==null?void 0:o.sceneId});if(t.length===0){this.clearAimed();return}let n=null,i=1/0;t.forEach(a=>{const o=a.target.sceneId;if(o===this.currentSceneId)return;const l=a.yaw,c=Math.abs(this.shortestDeltaDeg(e,l));c<i&&(i=c,n=o)});let r=!1;if(n!==null&&(this.aimedSceneId===null?r=i<=pa:n===this.aimedSceneId?r=i<=pa+v_:r=i<=pa),this.isInteracting){this.clearAimed();return}if(r&&n!==null)if(this.aimedSceneId!==n){if(this.lastAimChangeTs=Date.now(),this.cancelAutoNav(),this.aimedSceneId!==null){const o=this.dots.get(this.aimedSceneId);o&&(o.classList.remove("is-aimed","is-autonav","is-autonav-progress"),this.removeProgress(this.aimedSceneId))}this.aimedSceneId=n;const a=this.dots.get(n);a&&a.classList.add("is-aimed"),this.clearAimDebounce(),this.aimDebounceTimer=window.setTimeout(()=>{if(this.aimDebounceTimer=null,!this.root.parentNode){$e("aimDebounceTimer: component disposed, skipping");return}this.aimedSceneId===n&&!this.isInteracting&&this.isVisible?(this.emitSceneAim("aim",n),this.scheduleAutoNavIfAllowed(n)):this.aimedSceneId===n&&this.clearAimed()},y_)}else!this.autoNavTimer&&this.aimedSceneId!==this.autoNavTargetSceneId&&this.scheduleAutoNavIfAllowed(n);else this.clearAimed()}handleSceneFocus(e){e.type==="hover"?this.hoverSceneId=e.sceneId:e.type==="focus"&&($e("统一终止触发点: 场景切换",{sceneId:e.sceneId}),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),e.sceneId&&(this.currentSceneId=e.sceneId),this.hoverSceneId=null),this.updateDotStates()}updateDotStates(){this.dots.forEach((e,t)=>{e.classList.remove("is-current","is-hover"),t===this.currentSceneId?e.classList.add("is-current"):t===this.hoverSceneId&&e.classList.add("is-hover")})}renderDots(){this.container.innerHTML="",this.dots.clear(),this.dotYawDeg.clear(),this.aimedSceneId=null,this.sceneHotspots.filter(t=>{var n;return(n=t.target)==null?void 0:n.sceneId}).forEach(t=>{const n=t.target.sceneId,i=document.createElement("div");i.className="vr-groundnav__dot",i.setAttribute("data-scene-id",n),i.setAttribute("title",t.label),this.dotYawDeg.set(n,t.yaw),i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),it.emitUIEngaged(),en({type:"focus",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()}),window.dispatchEvent(new CustomEvent("vr:close-panels")),t.target.museumId&&t.target.sceneId?this.onNavigateToScene(t.target.museumId,t.target.sceneId):$e("dot click: museumId or sceneId is missing, skipping navigation")}),i.addEventListener("mouseenter",()=>{en({type:"hover",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()})}),i.addEventListener("mouseleave",()=>{en({type:"hover",museumId:t.target.museumId,sceneId:null,source:"pano",ts:Date.now()})}),this.container.appendChild(i),this.dots.set(t.target.sceneId,i)}),this.updateDotStates(),this.updateDotPositions()}updateDotPositions(){this.sceneHotspots.filter(t=>{var n;return(n=t.target)==null?void 0:n.sceneId}).forEach(t=>{const n=this.dots.get(t.target.sceneId);if(!n)return;const i=t.yaw*Math.PI/180,r=Math.sin(i)*fc,a=-Math.cos(i)*fc;n.style.transform=`translate(${r}px, ${a}px)`})}setYawPitch(e,t){this.currentYaw=e,this.currentPitch=t;const n=Math.abs(this.lastYawDeg-e)>.1;if(this.lastYawDeg=e,this.lastPitchDeg=t,no(t)){const r=to(t),a=String(r.clarity);this.root.style.getPropertyValue("--vr-ground-clarity")!==a&&this.root.style.setProperty("--vr-ground-clarity",a);const o=r.opacity.toString();this.root.style.opacity!==o&&(this.root.style.opacity=o);const l=`translateX(-50%) translateY(${r.translateY}px) scaleY(${r.scaleY})`;this.root.style.transform!==l&&(this.root.style.transform=l);const c=`${r.blur}px`;this.root.style.getPropertyValue("--vr-ground-base-blur")!==c&&this.root.style.setProperty("--vr-ground-base-blur",c),this.isVisible||(this.isVisible=!0),!this.isInteracting&&n&&(this.updateAimed(e),this.maybeRescheduleOrCancelByPitch(t))}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1,this.clearAimed());n&&this.updateDotPositions()}updateScene(e,t,n){if($e("统一终止触发点: 博物馆/场景切换",{museumId:e,currentSceneId:t}),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),!e){$e("updateScene: museumId is missing");return}this.museumId=e,this.currentSceneId=t,this.sceneHotspots=n,this.hoverSceneId=null,this.renderDots()}mount(e){e.appendChild(this.root)}dispose(){this.clearAllTimers(),this.cancelAutoNav(),this.clearAimed(),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=void 0),this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class b_{constructor(e,t={}){v(this,"root");v(this,"inner");v(this,"wedge");v(this,"northTick");v(this,"needle");v(this,"currentYaw",0);v(this,"currentPitch",0);v(this,"northYaw",0);v(this,"isVisible",!1);v(this,"unsubscribeInteracting");v(this,"unsubscribeIdle");v(this,"unsubscribeUIEngaged");this.root=document.createElement("div"),this.root.className="vr-groundheading",this.root.setAttribute("data-ui","GroundHeadingMarker"),this.root.style.outline="2px solid #00ffff",this.inner=document.createElement("div"),this.inner.className="vr-groundheading__inner",this.wedge=document.createElement("div"),this.wedge.className="vr-groundheading__wedge",this.northTick=document.createElement("div"),this.northTick.className="vr-groundheading__northTick",this.needle=document.createElement("div"),this.needle.className="vr-groundheading__needle",this.inner.appendChild(this.wedge),this.inner.appendChild(this.northTick),this.inner.appendChild(this.needle),this.root.appendChild(this.inner),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.root.style.setProperty("--groundheading-disk-rot","0deg"),this.root.style.setProperty("--groundheading-needle-rot","0deg"),e.appendChild(this.root),this.setupInteractionListeners()}setNorthYaw(e){this.northYaw=e}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,no(t)){const i=to(t);this.root.style.setProperty("--vr-ground-clarity",String(i.clarity)),this.root.style.opacity=i.opacity.toString(),this.root.style.transform=`translateX(-50%) translateY(${i.translateY}px) scaleY(${i.scaleY})`,this.root.style.setProperty("--vr-ground-base-blur",`${i.blur}px`);const r=e,o=-(this.northYaw??0),l=r;this.root.style.setProperty("--groundheading-disk-rot",`${o}deg`),this.root.style.setProperty("--groundheading-needle-rot",`${l}deg`),this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1)}setInteracting(e){e?this.root.classList.add("vr-ui-interacting"):this.root.classList.remove("vr-ui-interacting")}setupInteractionListeners(){this.unsubscribeInteracting=it.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=it.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=it.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}function Vi(s){try{const t=new URL(s).hostname;if(t==="i.ibb.co"||t==="s41.ax1x.com")return`/_img?u=${encodeURIComponent(s)}`}catch{}return s}class xn extends Error{constructor(e,t,n){super(t),this.url=e,this.originalError=n,this.name="ExternalImageLoadError"}}let fa=0;const ma=[];function gd(s){return new Promise((e,t)=>{const n=async()=>{fa++;try{const i=await s();e(i)}catch(i){t(i)}finally{fa--,ma.length>0&&ma.shift()()}};fa<2?n():ma.push(n)})}async function E_(s,e,t,n){let i=null;for(let r=0;r<=t;r++){const a=new AbortController,o=setTimeout(()=>a.abort(),e);try{const l=await fetch(s,{mode:"cors",referrerPolicy:"no-referrer",signal:a.signal});if(clearTimeout(o),!l.ok)throw new Error(`HTTP ${l.status}: ${l.statusText}`);const c=await l.blob();return await createImageBitmap(c)}catch(l){if(clearTimeout(o),i=l instanceof Error?l:new Error(String(l)),r<t){const c=n*Math.pow(2,r);console.warn(`外链图片 fetch 重试 ${r+1}/${t+1}: ${s}`,i.message),await new Promise(d=>setTimeout(d,c))}}}throw new xn(s,`fetch 加载失败（${t+1} 次尝试）: ${(i==null?void 0:i.message)||"未知错误"}`,i||void 0)}async function vd(s,e={}){const{timeoutMs:t=15e3,retries:n=2,retryBaseDelayMs:i=300,referrerPolicy:r="no-referrer",crossOrigin:a="anonymous"}=e,o=Vi(s);return gd(async()=>new Promise((l,c)=>{let d=null,h=0,p=null,f=null;const _=()=>{h++;const g=new Image;f=g,g.decoding="async",g.referrerPolicy=r,g.crossOrigin=a,d!==null&&(clearTimeout(d),d=null),d=window.setTimeout(()=>{if(d=null,p=new Error("加载超时"),f&&(f.onload=null,f.onerror=null,f=null),h<=n){const m=i*Math.pow(2,h-1);console.warn(`外链图片加载超时重试 ${h}/${n+1}: ${o}`),setTimeout(_,m)}else c(new xn(s,`加载超时（${n+1} 次尝试）`,p))},t),g.onload=()=>{d!==null&&(clearTimeout(d),d=null),g.complete&&g.naturalWidth>0?l(g):setTimeout(()=>l(g),0)},g.onerror=m=>{if(d!==null&&(clearTimeout(d),d=null),p=new Error("图片加载失败"),f===g&&(f.onload=null,f.onerror=null,f=null),h<=n){const u=i*Math.pow(2,h-1);console.warn(`外链图片加载失败重试 ${h}/${n+1}: ${o}`,m),setTimeout(_,u)}else c(new xn(s,`图片加载失败（${n+1} 次尝试）`,p))},g.src=o};_()}))}async function Ri(s,e={}){const{timeoutMs:t=15e3,retries:n=2,retryBaseDelayMs:i=300,allowFetchFallback:r=!1}=e,a=Vi(s);return gd(async()=>{try{const o=await vd(a,e);return await createImageBitmap(o,{imageOrientation:"from-image",premultiplyAlpha:"none"})}catch(o){if(r){console.warn(`Image() 加载失败，尝试 fetch 兜底: ${a}`,o);try{return await E_(a,t,n,i)}catch{throw o instanceof xn?o:new xn(s,`Image() 和 fetch 都失败: ${o instanceof Error?o.message:String(o)}`,o instanceof Error?o:void 0)}}else throw o instanceof xn?o:new xn(s,`Image() 加载失败: ${o instanceof Error?o.message:String(o)}`,o instanceof Error?o:void 0)}})}const _d=Object.freeze(Object.defineProperty({__proto__:null,ExternalImageLoadError:xn,loadExternalImageBitmap:Ri,loadExternalImageElement:vd,toProxiedImageUrl:Vi},Symbol.toStringTag,{value:"Module"})),sn=class sn{constructor(){v(this,"element",null);v(this,"textEl",null);v(this,"hideTimer",null)}ensure(){this.element||(this.element=document.createElement("div"),this.element.className="vr-zoom-hud",this.textEl=document.createElement("div"),this.textEl.className="vr-zoom-hud__text",this.textEl.textContent="缩放 100%",this.element.appendChild(this.textEl),document.body.appendChild(this.element))}show(e){this.ensure(),!(!this.element||!this.textEl)&&(this.hideTimer!==null&&(window.clearTimeout(this.hideTimer),this.hideTimer=null),this.textEl.textContent=`缩放 ${e}%`,this.element.classList.add("is-on"),this.hideTimer=window.setTimeout(()=>{this.hide()},600))}hide(){this.hideTimer!==null&&(window.clearTimeout(this.hideTimer),this.hideTimer=null),this.element&&this.element.classList.remove("is-on")}static ensure(){return sn.instance||(sn.instance=new sn),sn.instance}static show(e){sn.ensure().show(e)}static hide(){sn.instance&&sn.instance.hide()}};v(sn,"instance",null);let Ua=sn,Jn=null;function Ze(s,e=1500){if(ds())return;const t=document.querySelector(".vr-toast"),n=t??document.createElement("div");n.className="vr-toast",n.textContent=s,t||document.body.appendChild(n),window.requestAnimationFrame(()=>n.classList.add("show")),Jn&&window.clearTimeout(Jn),Jn=window.setTimeout(()=>{n.classList.remove("show"),window.setTimeout(()=>n.remove(),220),Jn=null},e)}function S_(){const s=document.querySelector(".vr-toast");s&&(s.classList.remove("show"),window.setTimeout(()=>s.remove(),220)),Jn&&(window.clearTimeout(Jn),Jn=null)}class M_{constructor(e,t,n){v(this,"manifest",null);v(this,"canvas",null);v(this,"ctx",null);v(this,"texture",null);v(this,"mesh",null);v(this,"pending",[]);v(this,"activeLoads",0);v(this,"maxConcurrent",4);v(this,"lastUpdate",0);v(this,"tilesMap",new Map);v(this,"highestLevel",null);v(this,"tilesVisible",!1);v(this,"tilesLoadedCount",0);v(this,"tilesLoadingCount",0);v(this,"tilesQueuedCount",0);v(this,"lastTileUrl","");v(this,"lastError","");v(this,"lruLimit",64);v(this,"highReady",!1);this.scene=e,this.onFirstDraw=t,this.onHighReady=n}async load(e){var f,_;const t=await fetch(e);if(!t.ok)throw new Error(`manifest 加载失败: ${e}`);const n=await t.json();if(this.manifest=n,this.highestLevel=n.levels.reduce((g,m)=>m.z>g.z?m:g),!this.highestLevel)throw new Error("manifest 缺少 level");const i=this.highestLevel.cols,r=this.highestLevel.rows,a=n.tileSize;this.canvas=document.createElement("canvas"),this.canvas.width=a*i,this.canvas.height=a*r,this.ctx=this.canvas.getContext("2d",{alpha:!1}),this.texture=new Nn(this.canvas),this.texture.flipY=!1,this.texture.wrapS=pt,this.texture.wrapT=pt,this.texture.repeat.set(1,-1),this.texture.offset.set(0,1),this.texture.needsUpdate=!0;const o=new fs(500,64,64);o.scale(-1,1,1);const l=new kn({map:this.texture,side:Ut,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1});if(this.mesh=new dt(o,l),this.mesh.renderOrder=1,this.scene.add(this.mesh),!n.levels.find(g=>g.z===0))throw new Error("manifest 缺少 z0");const d=`${n.baseUrl}/z0/0_0.jpg`,h=await this.fetchTileBitmap(d);if(await this.drawTile({z:0,col:0,row:0,bitmap:h}),(f=h.close)==null||f.call(h),n.levels.find(g=>g.z===1)){const g=`${n.baseUrl}/z1/0_0.jpg`;try{const u=await this.fetchTileBitmap(g);(_=u.close)==null||_.call(u)}catch(u){this.lastError=u instanceof Error?u.message:String(u)}const m=n.levels.find(u=>u.z===2);m&&this.enqueueLevel(m)}this.onFirstDraw()}dispose(){if(this.tilesMap.forEach(e=>{var t,n;return(n=(t=e.bitmap)==null?void 0:t.close)==null?void 0:n.call(t)}),this.tilesMap.clear(),this.mesh){this.mesh.geometry&&this.mesh.geometry.dispose();const e=this.mesh.material;e.map&&e.map.dispose(),e.dispose(),this.scene.remove(this.mesh)}}update(e){if(!this.manifest||!this.highestLevel||!this.ctx)return;const t=performance.now();if(t-this.lastUpdate<150)return;this.lastUpdate=t;const n=this.manifest.levels.filter(a=>a.z===2||a.z===3);for(const a of n){const o=this.computeNeededTiles(e,a);for(const{col:l,row:c}of o){const d=`${a.z}_${l}_${c}`;let h=this.tilesMap.get(d);h||(h={z:a.z,col:l,row:c,url:`${this.manifest.baseUrl}/z${a.z}/${l}_${c}.jpg`,state:"empty",lastUsed:t},this.tilesMap.set(d,h)),h.lastUsed=t,h.state==="empty"&&(h.state="loading",this.pending.push(h))}}const i=Array.from(this.tilesMap.values()).filter(a=>a.state==="loading").length,r=Array.from(this.tilesMap.values()).filter(a=>a.state==="ready").length;this.tilesQueuedCount=this.pending.length,this.tilesLoadingCount=i,this.tilesLoadedCount=r,this.processQueue(),this.runLru(t)}prime(e){if(!this.manifest||!this.highestLevel||!this.ctx)return;e.updateMatrixWorld(!0);const t=performance.now(),n=this.manifest.levels.filter(i=>i.z===2||i.z===3);for(const i of n){const r=this.computeNeededTiles(e,i);if(r.length===0)continue;const{col:a,row:o}=r[0],l=`${i.z}_${a}_${o}`;let c=this.tilesMap.get(l);c||(c={z:i.z,col:a,row:o,url:`${this.manifest.baseUrl}/z${i.z}/${a}_${o}.jpg`,state:"empty",lastUsed:t},this.tilesMap.set(l,c)),c.lastUsed=t,c.state==="empty"&&(c.state="loading",this.pending.push(c))}this.tilesQueuedCount=this.pending.length,this.tilesLoadingCount=Array.from(this.tilesMap.values()).filter(i=>i.state==="loading").length,this.processQueue()}getStatus(){var e;return{tilesVisible:this.tilesVisible,fallbackVisible:!1,tilesLoadedCount:this.tilesLoadedCount,tilesLoadingCount:this.tilesLoadingCount,tilesQueuedCount:this.tilesQueuedCount,lastTileUrl:this.lastTileUrl,lastError:this.lastError,canvasSize:this.canvas?`${this.canvas.width}x${this.canvas.height}`:"0x0",maxLevel:this.highestLevel?`${this.highestLevel.cols}x${this.highestLevel.rows}`:"",highReady:this.highReady,zMax:((e=this.highestLevel)==null?void 0:e.z)??0,levels:this.manifest?this.manifest.levels.map(t=>t.z).join(","):""}}enqueueLevel(e){const t=performance.now();for(let n=0;n<e.rows;n++)for(let i=0;i<e.cols;i++){const r=`${e.z}_${i}_${n}`;let a=this.tilesMap.get(r);a||(a={z:e.z,col:i,row:n,url:`${this.manifest.baseUrl}/z${e.z}/${i}_${n}.jpg`,state:"empty",lastUsed:t},this.tilesMap.set(r,a)),a.lastUsed=t,a.state==="empty"&&(a.state="loading",this.pending.push(a))}this.tilesQueuedCount=this.pending.length,this.tilesLoadingCount=Array.from(this.tilesMap.values()).filter(n=>n.state==="loading").length,this.processQueue()}processQueue(){for(;this.activeLoads<this.maxConcurrent&&this.pending.length>0;){const e=this.pending.shift();this.loadTile(e)}}async loadTile(e){this.activeLoads+=1,this.lastTileUrl=e.url;try{const t=await this.fetchTileBitmap(e.url);e.bitmap=t,e.state="ready",this.drawTile(e),this.tilesLoadedCount+=1}catch(t){this.lastError=t instanceof Error?t.message:String(t),e.state="empty"}finally{this.activeLoads-=1,this.processQueue()}}async fetchTileBitmap(e,t=12e3){const n=new AbortController,i=window.setTimeout(()=>n.abort(),t);try{const r=await fetch(e,{mode:"cors",cache:"reload",referrerPolicy:"no-referrer",signal:n.signal});if(!r.ok)throw new Error(`tile HTTP ${r.status}: ${e}`);const a=await r.blob();return await createImageBitmap(a)}finally{clearTimeout(i)}}async drawTile(e){var l,c;if(!this.manifest||!this.highestLevel||!this.ctx||!this.canvas||!this.manifest.levels.find(d=>d.z===e.z))return;const n=this.manifest.tileSize,i=e.col*n,r=e.row*n;if(i<0||r<0||i+n>this.canvas.width||r+n>this.canvas.height){this.lastError=`tile out of canvas: z${e.z} ${e.col}_${e.row}`;return}const a=e.bitmap;if(a)this.ctx.drawImage(a,i,r,n,n);else{const d=`${this.manifest.baseUrl}/z${e.z}/${e.col}_${e.row}.jpg`,h=await Ri(d,{timeoutMs:12e3,retries:1});this.ctx.drawImage(h,i,r,n,n),(l=h.close)==null||l.call(h)}this.texture&&(this.texture.needsUpdate=!0),this.tilesVisible=!0;const o=(c=this.mesh)==null?void 0:c.material;o&&(o.opacity=1,o.needsUpdate=!0),e.z===3&&!this.highReady&&(this.highReady=!0,this.onHighReady())}computeNeededTiles(e,t){const n=new R;e.getWorldDirection(n);const i=Math.atan2(n.x,n.z),r=Math.asin(n.y),a=gt.degToRad(e.fov),o=gt.degToRad(20),l=a/2+o,c=a*e.aspect/2+o,d=this.normAngle(i-c),h=this.normAngle(i+c),p=gt.clamp(r-l,-Math.PI/2,Math.PI/2),f=gt.clamp(r+l,-Math.PI/2,Math.PI/2),_=this.yawToCols(d,h,t.cols),g=this.yawToCols(i-1e-6,i+1e-6,t.cols)[0];_.includes(g)||_.push(g);const m=Math.max(0,Math.floor((f*-1+Math.PI/2)/Math.PI*t.rows)),u=Math.min(t.rows-1,Math.floor((p*-1+Math.PI/2)/Math.PI*t.rows)),b=[];for(let A=m;A<=u;A++)b.push(A);const y=Math.floor((-r+Math.PI/2)/Math.PI*t.rows);b.includes(y)||b.push(y);const T=[..._];for(const A of _)T.push(((A+1)%t.cols+t.cols)%t.cols),T.push(((A-1)%t.cols+t.cols)%t.cols);const I=[...b];for(const A of b)A+1<t.rows&&I.push(A+1),A-1>=0&&I.push(A-1);const C=[];for(const A of T)for(const H of I)C.find(E=>E.col===A&&E.row===H)||C.push({col:A,row:H});return C}yawToCols(e,t,n){const i=h=>(h%(Math.PI*2)+Math.PI*2)%(Math.PI*2),r=i(e),a=i(t),o=[],l=h=>{const p=(h%n+n)%n;o.includes(p)||o.push(p)},c=Math.floor(r/(Math.PI*2)*n),d=Math.floor(a/(Math.PI*2)*n);if(r<=a)for(let h=c;h<=d;h++)l(h);else{for(let h=c;h<n;h++)l(h);for(let h=0;h<=d;h++)l(h)}return o}normAngle(e){return(e+Math.PI)%(2*Math.PI)-Math.PI}runLru(e){var i,r;const t=Array.from(this.tilesMap.values()).filter(a=>a.z===3&&a.state==="ready");if(t.length<=this.lruLimit)return;t.sort((a,o)=>a.lastUsed-o.lastUsed);const n=t.slice(0,t.length-this.lruLimit);for(const a of n)(r=(i=a.bitmap)==null?void 0:i.close)==null||r.call(i),a.bitmap=void 0,a.state="empty",this.tilesMap.delete(`${a.z}_${a.col}_${a.row}`)}}const Ti={original:{renderer:{pixelRatio:Math.min(window.devicePixelRatio||1,2),toneMapping:bn,toneMappingExposure:1,output:"srgb",clearColor:void 0},camera:{defaultFov:75},texture:{anisotropyLimit:8,minFilter:ni,magFilter:kt,generateMipmaps:!0,colorSpace:"srgb"}},enhanced:{renderer:{pixelRatio:Math.min(window.devicePixelRatio,2),toneMapping:Pc,toneMappingExposure:.95,output:"srgb",clearColor:{color:0,alpha:1}},camera:{defaultFov:70},texture:{anisotropyLimit:12,minFilter:ni,magFilter:kt,generateMipmaps:!0,colorSpace:"srgb"}}};class w_{constructor(e,t=!1){v(this,"scene");v(this,"camera");v(this,"renderer");v(this,"sphere",null);v(this,"tilePano",null);v(this,"fallbackSphere",null);v(this,"container");v(this,"frameListeners",[]);v(this,"nadirPatch",null);v(this,"compassDisk",null);v(this,"groundNavDots",null);v(this,"groundHeading",null);v(this,"renderProfile","enhanced");v(this,"isDragging",!1);v(this,"lastMouseX",0);v(this,"lastMouseY",0);v(this,"yaw",0);v(this,"pitch",0);v(this,"fov",75);v(this,"onLoadCallback");v(this,"onErrorCallback");v(this,"onStatusChangeCallback");v(this,"debugMode",!1);v(this,"onDebugClick");v(this,"longPressTimer",null);v(this,"tilesDebugEl",null);v(this,"tilesVisibleStableFrames",0);v(this,"tilesLastError","");v(this,"tilesLowReady",!1);v(this,"longPressThreshold",500);v(this,"renderSource","none");v(this,"renderSwitchReason","");v(this,"clearedCount",0);v(this,"aspectWarnedUrls",new Set);v(this,"loadStatus",at.LOADING_LOW);v(this,"isDegradedMode",!1);v(this,"pickMode",!1);v(this,"pickModeListeners",[]);v(this,"pickStartX",0);v(this,"pickStartY",0);v(this,"pickStartTime",0);v(this,"pickHasMoved",!1);v(this,"pickDragThreshold",8);v(this,"pickTimeThreshold",250);v(this,"lastYaw",0);v(this,"lastPitch",0);v(this,"lastFov",75);v(this,"isViewChanging",!1);v(this,"viewChangeThreshold",.5);v(this,"vrModeEnabled",!1);v(this,"touchStartX",0);v(this,"touchStartY",0);v(this,"lastTouchDistance",0);v(this,"isPinching",!1);v(this,"lastFrameTimeMs",null);this.container=e,this.debugMode=t,this.renderProfile=this.detectRenderProfile(),this.scene=new Xa,this.camera=new Ct(Ti[this.renderProfile].camera.defaultFov,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,0,0),this.fov=Ti[this.renderProfile].camera.defaultFov,this.renderer=new Sr({antialias:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.applyRendererProfile(),e.appendChild(this.renderer.domElement),this.nadirPatch=new h_(this.scene,500),this.compassDisk=new g_,this.compassDisk.mount(e),this.compassDisk.getElement().style.display="none",this.groundNavDots=new x_({museumId:"",currentSceneId:"",sceneHotspots:[]}),this.groundNavDots.mount(e),this.groundNavDots.getElement().style.display="none",this.groundHeading=new b_(e),this.groundHeading.getElement().style.display="none",this.setupEvents(),this.animate(),window.addEventListener("resize",()=>this.handleResize())}setupEvents(){const e=this.renderer.domElement;if(e.addEventListener("mousedown",t=>this.onPointerDown(t)),e.addEventListener("mousemove",t=>this.onPointerMove(t)),e.addEventListener("mouseup",()=>this.onPointerUp()),e.addEventListener("mouseleave",()=>this.onPointerUp()),e.addEventListener("touchstart",t=>this.onTouchStart(t),{passive:!1}),e.addEventListener("touchmove",t=>this.onTouchMove(t),{passive:!1}),e.addEventListener("touchend",()=>this.onTouchEnd()),e.addEventListener("wheel",t=>this.onWheel(t),{passive:!1}),this.debugMode){e.addEventListener("dblclick",i=>this.handleDebugClick(i.clientX,i.clientY));let t=0,n=0;e.addEventListener("touchstart",i=>{i.touches.length===1&&(t=i.touches[0].clientX,n=i.touches[0].clientY,this.longPressTimer=window.setTimeout(()=>{this.handleDebugClick(t,n)},this.longPressThreshold))},{passive:!0}),e.addEventListener("touchmove",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0}),e.addEventListener("touchend",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0})}}handleDebugClick(e,t){if(this.onDebugClick&&this.debugMode){const n=this.getCurrentView();this.onDebugClick(e,t,n.yaw,n.pitch,n.fov)}}setOnDebugClick(e){this.onDebugClick=e}onPointerDown(e){this.isDragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,it.emitInteracting()}onPointerMove(e){if(!this.isDragging)return;const t=e.clientX-this.lastMouseX,n=e.clientY-this.lastMouseY;if(this.yaw+=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,this.updateCamera(),this.debugMode&&this.onDebugClick){const i=this.getCurrentView();this.onDebugClick(this.lastMouseX,this.lastMouseY,i.yaw,i.pitch,i.fov)}}onPointerUp(){this.isDragging=!1}onTouchStart(e){if(e.touches.length===1)this.isDragging=!0,this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.lastMouseX=this.touchStartX,this.lastMouseY=this.touchStartY,it.emitInteracting();else if(e.touches.length===2){this.isPinching=!0,this.isDragging=!1;const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(t*t+n*n),it.emitInteracting()}}onTouchMove(e){if(e.preventDefault(),this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null),e.touches.length===1&&this.isDragging){const t=e.touches[0].clientX-this.lastMouseX,n=e.touches[0].clientY-this.lastMouseY;this.yaw+=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.touches[0].clientX,this.lastMouseY=e.touches[0].clientY,this.updateCamera()}else if(e.touches.length===2&&this.isPinching){const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY,i=Math.sqrt(t*t+n*n),r=this.lastTouchDistance-i,a=this.fov+r*.5;this.setFovInternal(a),this.lastTouchDistance=i}}onTouchEnd(){this.isDragging=!1,this.isPinching=!1}onWheel(e){e.preventDefault();const t=this.fov+e.deltaY*.1;if(this.setFovInternal(t),it.emitInteracting(),this.debugMode&&this.onDebugClick){const n=this.getCurrentView();this.onDebugClick(this.lastMouseX,this.lastMouseY,n.yaw,n.pitch,n.fov)}}updateCamera(){const e=gt.degToRad(this.yaw),t=gt.degToRad(this.pitch),n=Math.cos(t)*Math.sin(e),i=Math.sin(t),r=Math.cos(t)*Math.cos(e);this.camera.lookAt(n,i,r)}loadScene(e,t){var h;if(this.isDegradedMode=!1,this.updateLoadStatus(at.LOADING_LOW),this.renderSource="none",this.clearedCount=0,this.tilePano&&(this.tilePano.dispose(),this.tilePano=null),this.clearFallback(),this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const p=this.sphere.material;p.map&&p.map.dispose(),p.dispose()}if(!((t==null?void 0:t.preserveView)===!0)){const p=e.initialView,f=p.yaw||0;this.yaw===0&&f!==0&&(this.yaw=-f),this.pitch=p.pitch||0;const _=Ti[this.renderProfile];this.fov=p.fov!==void 0?p.fov:_.camera.defaultFov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.updateCamera()}this.lastYaw=this.yaw,this.lastPitch=this.pitch,this.lastFov=this.fov,this.isViewChanging=!1;const r=-(typeof e.northYaw=="number"?e.northYaw:((h=e.initialView)==null?void 0:h.yaw)??0);this.nadirPatch&&this.nadirPatch.setNorthYaw(r),this.compassDisk&&(this.compassDisk.setSceneId(e.id),this.compassDisk.setNorthYaw(r)),this.groundHeading&&this.groundHeading.setNorthYaw(r);const a=new fs(500,64,64);a.scale(-1,1,1);const o=e.panoTiles;if(o!=null&&o.manifest){const p=zt(o.manifest,Ht.PANO),f=o.fallbackPanoLow||e.panoLow,_=o.fallbackPano||e.pano;this.tilesVisibleStableFrames=0,this.tilesLastError="",this.tilesLowReady=!1,f?this.showFallbackTexture(zt(f,Ht.PANO_LOW),a,!0):_&&this.showFallbackTexture(zt(_,Ht.PANO),a,!1),this.tilePano=new M_(this.scene,()=>{this.tilesLowReady||(this.tilesLowReady=!0,this.updateLoadStatus(at.LOW_READY),this.setRenderSource("low","tiles z0 棣栧抚鍙"),this.onLoadCallback&&this.onLoadCallback())},()=>{this.updateLoadStatus(at.HIGH_READY),this.setRenderSource("tiles","tiles 楂樻竻鍙")}),this.tilePano.load(p).then(()=>{var g;this.updateLoadStatus(at.LOW_READY),this.onLoadCallback&&this.onLoadCallback(),(g=this.tilePano)==null||g.prime(this.camera)}).catch(g=>{console.error("鐡︾墖鍔犺浇澶辫触锛屽洖閫€浼犵粺鍏ㄦ櫙",g),this.tilesLastError=g instanceof Error?g.message:String(g),Ze("鐡︾墖鍔犺浇澶辫触锛屽凡鍥為€€鍒板叏鏅浘",2e3),this.fallbackToLegacy(e,o)});return}const l=zt(e.panoLow,Ht.PANO_LOW),c=zt(e.pano,Ht.PANO);if(Na()==="low"){if(l){this.loadSingleTexture(a,l,!0);return}if(c){this.loadSingleTexture(a,c,!1);return}}else{if(!l&&c){this.loadSingleTexture(a,c,!1);return}if(l&&!c){this.loadSingleTexture(a,l,!0);return}if(l&&c){this.loadProgressiveTextures(a,l,c);return}}this.updateLoadStatus(at.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error("鍦烘櫙鏈彁渚涘叏鏅浘 URL"))}async loadSingleTexture(e,t,n){n?this.updateLoadStatus(at.LOADING_LOW):this.updateLoadStatus(at.LOADING_HIGH);try{const i=await Ri(t,{timeoutMs:15e3,retries:2,retryBaseDelayMs:300,referrerPolicy:"no-referrer",crossOrigin:"anonymous",allowFetchFallback:!1}),r=new Nn(i);this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,t),r.flipY=!1,r.wrapS=pt,r.wrapT=pt,r.repeat.set(1,-1),r.offset.set(0,1),r.needsUpdate=!0;const a=new kn({map:r});this.sphere=new dt(e,a),this.scene.add(this.sphere),this.setRenderSource(n?"low":"tiles",n?"panoLow 可见":"pano 可见"),n?this.updateLoadStatus(at.LOW_READY):this.updateLoadStatus(at.HIGH_READY),this.onLoadCallback&&this.onLoadCallback()}catch(i){if(console.error("鍔犺浇鍏ㄦ櫙鍥惧け璐?",t,i),this.updateLoadStatus(at.ERROR),this.onErrorCallback){const r=i instanceof xn?`鍔犺浇鍏ㄦ櫙鍥惧け璐ワ細${t} - ${i.message}`:`鍔犺浇鍏ㄦ櫙鍥惧け璐ワ細${t}`;this.onErrorCallback(new Error(r))}}}async loadProgressiveTextures(e,t,n){this.updateLoadStatus(at.LOADING_LOW);try{const i=await Ri(t,{timeoutMs:15e3,retries:2,retryBaseDelayMs:300,referrerPolicy:"no-referrer",crossOrigin:"anonymous",allowFetchFallback:!1}),r=new Nn(i);this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,t),r.flipY=!1,r.wrapS=pt,r.wrapT=pt,r.repeat.set(1,-1),r.offset.set(0,1),r.needsUpdate=!0;const a=new kn({map:r});this.sphere=new dt(e,a),this.scene.add(this.sphere),this.setRenderSource("low","panoLow 可见"),this.updateLoadStatus(at.LOW_READY),this.onLoadCallback&&this.onLoadCallback(),this.updateLoadStatus(at.LOADING_HIGH);try{const o=await Ri(n,{timeoutMs:15e3,retries:2,retryBaseDelayMs:300,referrerPolicy:"no-referrer",crossOrigin:"anonymous",allowFetchFallback:!1}),l=new Nn(o);this.applyTextureSettings(l),this.warnIfNotPanoAspect(l,n),l.flipY=!1,l.wrapS=pt,l.wrapT=pt,l.repeat.set(1,-1),l.offset.set(0,1),l.needsUpdate=!0;const c=this.getCurrentView();if(this.sphere&&this.sphere.material&&"map"in this.sphere.material){const d=this.sphere.material;d.map&&d.map.dispose(),d.map=l,d.needsUpdate=!0,this.setRenderSource("tiles","pano 高清可见")}this.setView(c.yaw,c.pitch,c.fov),this.updateLoadStatus(at.HIGH_READY),this.isDegradedMode=!1}catch(o){console.error("高清全景图加载失败，继续使用低清",n,o),this.isDegradedMode=!0,this.updateLoadStatus(at.DEGRADED)}}catch(i){console.error("低清全景图加载失败，尝试加载高清兜底",t,i),await this.loadSingleTexture(e,n,!1)}}setOnLoad(e){this.onLoadCallback=e}setOnError(e){this.onErrorCallback=e}setOnStatusChange(e){this.onStatusChangeCallback=e}getLoadStatus(){return this.loadStatus}isInDegradedMode(){return this.isDegradedMode}updateLoadStatus(e){this.loadStatus=e,this.onStatusChangeCallback&&this.onStatusChangeCallback(e)}getCurrentView(){return{yaw:this.yaw,pitch:this.pitch,fov:this.fov}}setView(e,t,n){this.yaw=e,this.pitch=Math.max(-90,Math.min(90,t)),n!==void 0&&this.setFovInternal(n,!1),this.updateCamera()}setFovInternal(e,t=!0){if(this.fov=Math.max(30,Math.min(120,e)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),t){const n=Ti[this.renderProfile].camera.defaultFov,i=Math.round(n/this.fov*100),r=Math.max(50,Math.min(250,i));Ua.show(r)}}setFov(e){this.setFovInternal(e,!0)}setVrModeEnabled(e){this.vrModeEnabled=e,e||(this.isDragging=!1)}isVrModeEnabled(){return this.vrModeEnabled}isInteracting(){return this.isDragging||this.isPinching}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}updateTilesDebug(){var y;const e=new URLSearchParams(window.location.search);if(!(e.get("tilesDebug")==="1"||e.get("tilesDebug")==="true"||e.get("tilesDebug")==="on")){this.tilesDebugEl&&(this.tilesDebugEl.remove(),this.tilesDebugEl=null);return}if(!this.tilesDebugEl){const T=document.createElement("div");T.style.position="absolute",T.style.left="8px",T.style.top="8px",T.style.padding="6px 8px",T.style.background="rgba(0,0,0,0.55)",T.style.color="#fff",T.style.fontSize="12px",T.style.lineHeight="1.4",T.style.borderRadius="6px",T.style.zIndex="9999",T.style.pointerEvents="none",this.tilesDebugEl=T,this.container.appendChild(T)}const n=(y=this.tilePano)==null?void 0:y.getStatus(),i=this.tilePano?"tiles":"fallback",r=n!=null&&n.tilesVisible?"true":"false",a=(n==null?void 0:n.tilesLoadedCount)??0,o=(n==null?void 0:n.tilesLoadingCount)??0,l=(n==null?void 0:n.tilesQueuedCount)??0,c=(n==null?void 0:n.lastTileUrl)??"",d=this.tilesLastError||(n==null?void 0:n.lastError)||"",h=this.fallbackSphere?"true":"false",p=(n==null?void 0:n.canvasSize)??"",f=(n==null?void 0:n.maxLevel)??"",_=n!=null&&n.highReady?"true":"false",g=(n==null?void 0:n.levels)??"",m=this.renderSource,u=this.renderSwitchReason,b=this.clearedCount;this.tilesDebugEl.textContent=`mode=${i}
renderSource=${m}
switchReason=${u}
cleared=${b}
fallbackVisible=${h}
tilesVisible=${r}
tilesLoaded=${a}
tilesLoading=${o}
tilesQueued=${l}
lastTileUrl=${c}
lastError=${d}
canvas=${p} zMax=${f} levels=${g} highReady=${_}
lowReady=${this.tilesLowReady}`}animate(){requestAnimationFrame(()=>this.animate());const e=performance.now(),t=this.lastFrameTimeMs?e-this.lastFrameTimeMs:16.7;this.lastFrameTimeMs=e;const n=this.getCurrentView(),i=Math.abs(n.yaw-this.lastYaw),r=Math.abs(n.pitch-this.lastPitch),a=Math.abs(n.fov-this.lastFov);if(i>this.viewChangeThreshold||r>this.viewChangeThreshold||a>this.viewChangeThreshold?this.isViewChanging||(this.isViewChanging=!0,it.emitInteracting()):this.isViewChanging&&(this.isViewChanging=!1,it.scheduleIdle()),this.lastYaw=n.yaw,this.lastPitch=n.pitch,this.lastFov=n.fov,this.updateCamera(),this.tilePano){this.tilePano.update(this.camera);const l=this.tilePano.getStatus(),c=!!this.fallbackSphere,d=l.tilesVisible;!c&&!d&&this.noteCleared("无可见源"),d&&this.renderSource==="fallback"&&this.tilesLowReady&&this.setRenderSource("low","tiles 低清覆盖可见"),d&&l.highReady&&this.setRenderSource("tiles","tiles 高清可见"),l.lastError&&(this.tilesLastError=l.lastError),!this.tilesLowReady&&l.tilesLoadedCount>0&&(this.tilesLowReady=!0,this.updateLoadStatus(at.LOW_READY)),l.highReady&&this.updateLoadStatus(at.HIGH_READY)}this.updateTilesDebug(),this.nadirPatch&&this.nadirPatch.update(this.camera,{yaw:n.yaw,pitch:n.pitch},t),this.compassDisk&&this.compassDisk.setYawPitch(n.yaw,n.pitch),this.groundNavDots&&this.groundNavDots.setYawPitch(n.yaw,n.pitch),this.groundHeading&&this.groundHeading.setYawPitch(n.yaw,n.pitch);for(const l of this.frameListeners)l(t);this.renderer.render(this.scene,this.camera)}onFrame(e){return this.frameListeners.push(e),()=>{const t=this.frameListeners.indexOf(e);t>=0&&this.frameListeners.splice(t,1)}}getCamera(){return this.camera}getDomElement(){return this.renderer.domElement}setSceneData(e,t,n){if(this.groundNavDots){const i=n.filter(r=>{var a;return r.type==="scene"&&((a=r.target)==null?void 0:a.sceneId)}).map(r=>({id:r.id,label:r.label,yaw:r.yaw,pitch:r.pitch,target:{museumId:r.target.museumId,sceneId:r.target.sceneId}}));this.groundNavDots.updateScene(e,t,i)}}getSphereRadius(){return 500}getViewportSize(){return{width:this.container.clientWidth,height:this.container.clientHeight}}enablePickMode(){this.pickMode||(this.pickMode=!0,this.setupPickModeListeners())}disablePickMode(){this.pickMode&&(this.pickMode=!1,this.removePickModeListeners())}togglePickMode(){return this.pickMode?this.disablePickMode():this.enablePickMode(),this.pickMode}isPickModeEnabled(){return this.pickMode}setupPickModeListeners(){const e=this.renderer.domElement,t=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.touches.length!==1)return;a=r.touches[0].clientX,o=r.touches[0].clientY}else a=r.clientX,o=r.clientY;this.pickStartX=a,this.pickStartY=o,this.pickStartTime=Date.now(),this.pickHasMoved=!1},n=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.touches.length!==1)return;a=r.touches[0].clientX,o=r.touches[0].clientY}else a=r.clientX,o=r.clientY;const l=Math.abs(a-this.pickStartX),c=Math.abs(o-this.pickStartY);Math.sqrt(l*l+c*c)>this.pickDragThreshold&&(this.pickHasMoved=!0)},i=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.changedTouches.length!==1)return;a=r.changedTouches[0].clientX,o=r.changedTouches[0].clientY}else a=r.clientX,o=r.clientY;const l=Date.now()-this.pickStartTime,c=Math.abs(a-this.pickStartX),d=Math.abs(o-this.pickStartY);Math.sqrt(c*c+d*d)>this.pickDragThreshold||l>this.pickTimeThreshold&&this.pickHasMoved||this.handlePick(a,o),this.pickHasMoved=!1};e.addEventListener("pointerdown",t),e.addEventListener("mousedown",t),e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("pointermove",n),e.addEventListener("mousemove",n),e.addEventListener("touchmove",n,{passive:!0}),e.addEventListener("pointerup",i),e.addEventListener("mouseup",i),e.addEventListener("touchend",i,{passive:!0}),this.pickModeListeners.push(()=>{e.removeEventListener("pointerdown",t),e.removeEventListener("mousedown",t),e.removeEventListener("touchstart",t),e.removeEventListener("pointermove",n),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n),e.removeEventListener("pointerup",i),e.removeEventListener("mouseup",i),e.removeEventListener("touchend",i)})}removePickModeListeners(){this.pickModeListeners.forEach(e=>e()),this.pickModeListeners=[]}handlePick(e,t){const n=this.renderer.domElement.getBoundingClientRect(),i=u_(e,t,n),r=p_(i.x,i.y,this.camera,this.getSphereRadius());if(!r){typeof __VR_DEBUG__<"u"&&__VR_DEBUG__&&console.debug("[pick] 无法计算 yaw/pitch（ray.direction 为空）");return}const{yaw:a,pitch:o}=r,l=`yaw: ${a.toFixed(2)}, pitch: ${o.toFixed(2)}`;console.log(`[pick] yaw=${a.toFixed(2)}, pitch=${o.toFixed(2)}`),navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(l).catch(()=>{}),window.dispatchEvent(new CustomEvent("vr:pick",{detail:{x:e,y:t,yaw:a,pitch:o}}))}warnIfNotPanoAspect(e,t){if(!e.image)return;const n=e.image,i=n.width,r=n.height;if(!i||!r)return;const a=i/r;Math.abs(a-2)>.02&&!this.aspectWarnedUrls.has(t)&&(console.warn(`[PanoViewer] 鍏ㄦ櫙鍥炬瘮渚嬩笉鏄?2:1锛屽彲鑳藉嚭鐜拌交寰彉褰紙瀹為檯 ${a.toFixed(2)}锛夛紝鏉ユ簮: ${t}`),this.aspectWarnedUrls.add(t))}dispose(){if(this.tilePano&&(this.tilePano.dispose(),this.tilePano=null),this.clearFallback(),this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const e=this.sphere.material;e.map&&e.map.dispose(),e.dispose()}this.nadirPatch&&(this.nadirPatch.dispose(this.scene),this.nadirPatch=null),this.compassDisk&&(this.compassDisk.dispose(),this.compassDisk=null),this.groundNavDots&&(this.groundNavDots.dispose(),this.groundNavDots=null),this.groundHeading&&(this.groundHeading.dispose(),this.groundHeading=null),this.renderer.dispose(),window.removeEventListener("resize",()=>this.handleResize())}applyRendererProfile(){const e=Ti[this.renderProfile];this.renderer.setPixelRatio(e.renderer.pixelRatio),"outputColorSpace"in this.renderer?this.renderer.outputColorSpace=ft:this.renderer.outputEncoding=En,this.renderer.toneMapping=e.renderer.toneMapping,this.renderer.toneMappingExposure=e.renderer.toneMappingExposure,e.renderer.clearColor&&this.renderer.setClearColor(e.renderer.clearColor.color,e.renderer.clearColor.alpha)}detectRenderProfile(){try{const t=new URLSearchParams(window.location.search).get("render");if(t&&t.toLowerCase()==="original")return"original"}catch{}return"enhanced"}fallbackToLegacy(e,t){const n={...e,pano:(t==null?void 0:t.fallbackPano)??e.pano,panoLow:(t==null?void 0:t.fallbackPanoLow)??e.panoLow,panoTiles:void 0};n.pano||n.panoLow?(Ze("鐡︾墖鍔犺浇澶辫触锛屽凡鍥為€€鍒板叏鏅浘",2e3),this.setRenderSource("fallback","tiles 失败自动回退"),this.loadScene(n,{preserveView:!0})):(this.updateLoadStatus(at.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error("瓦片与全景资源均不可用")))}setRenderSource(e,t){(this.renderSource!==e||t)&&(this.renderSource=e,this.renderSwitchReason=t)}noteCleared(e){this.clearedCount+=1,this.renderSwitchReason=e}async showFallbackTexture(e,t,n){try{const i=await Ri(e,{timeoutMs:15e3,retries:1,allowFetchFallback:!0}),r=new Nn(i);this.applyTextureSettings(r),r.flipY=!1,r.wrapS=pt,r.wrapT=pt,r.repeat.set(1,-1),r.offset.set(0,1),r.needsUpdate=!0;const a=new kn({map:r,depthWrite:!1,depthTest:!1}),o=new dt(t.clone(),a);o.renderOrder=0,this.fallbackSphere=o,this.scene.add(o),this.updateLoadStatus(n?at.LOADING_LOW:at.LOADING_HIGH),this.setRenderSource("fallback",n?"fallback 浣庢竻鍙":"fallback 楂樻竻鍙")}catch(i){console.error("fallback 璐村浘鍔犺浇澶辫触",i)}}clearFallback(){if(this.fallbackSphere){this.fallbackSphere.geometry&&this.fallbackSphere.geometry.dispose();const e=this.fallbackSphere.material;e.map&&e.map.dispose(),e.dispose(),this.scene.remove(this.fallbackSphere),this.fallbackSphere=null}}applyTextureSettings(e){const t=Ti[this.renderProfile],n=this.renderer.capabilities.getMaxAnisotropy?this.renderer.capabilities.getMaxAnisotropy():1;if(e.anisotropy=Math.min(t.texture.anisotropyLimit,Math.max(1,n||1)),e.minFilter=t.texture.minFilter,e.magFilter=t.texture.magFilter,e.generateMipmaps=t.texture.generateMipmaps,"colorSpace"in e?e.colorSpace=ft:e.encoding=En,e.needsUpdate=!0,this.debugMode){const i=e.image||{};console.log("pano texture",{w:i.width,h:i.height,colorSpace:e.colorSpace,encoding:e.encoding,anisotropy:e.anisotropy,minFilter:e.minFilter,magFilter:e.magFilter})}}}class vc{constructor(e){v(this,"element");this.element=document.createElement("div"),this.element.className="title-bar",this.element.innerHTML=`
      <div class="title-bar-content">
        <span class="title-text">${e}</span>
      </div>
    `,this.applyStyles()}applyStyles(){const e=document.createElement("style");e.textContent=`
      .title-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        padding-top: env(safe-area-inset-top, 0px);
        height: calc(44px + env(safe-area-inset-top, 0px));
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .title-bar-content {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 60px;
      }
      .title-text {
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,document.head.appendChild(e)}setTitle(e){const t=this.element.querySelector(".title-text");t&&(t.textContent=e)}getElement(){return this.element}remove(){this.element.remove()}}class T_{constructor(e){v(this,"element");v(this,"museums");this.museums=e,this.element=document.createElement("div"),this.element.className="museum-list",this.render(),this.applyStyles()}render(){const e=this.museums.filter(n=>n.id==="wangding"),t=this.museums.filter(n=>n.id!=="wangding");this.element.innerHTML=`
      <div class="museum-list-container">
        <h1 class="museum-list-title">王鼎纪念馆</h1>
        <p class="museum-list-subtitle">以王鼎生平为主线的红色研学展馆</p>
        <div class="museum-grid">
          ${e.map(n=>`
            <div class="museum-card museum-card-active" data-museum-id="${n.id}">
              <div class="museum-cover">
                <img src="${n.cover}" alt="${n.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${n.name}</h2>
                  ${n.description?`<p class="museum-desc">${n.description}</p>`:""}
                  <p class="museum-scene-count">${n.scenes.length} 个场景</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        ${t.length>0?`
        <div class="museum-grid muted">
          ${t.map(n=>`
            <div class="museum-card museum-card-disabled">
              <div class="museum-cover">
                <img src="${n.cover}" alt="${n.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${n.name}</h2>
                  <p class="museum-desc">建设中，敬请期待</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        `:""}
      </div>
    `,this.element.querySelectorAll(".museum-card-active").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-museum-id");i&&xa(i)})})}applyStyles(){const e=document.createElement("style");e.textContent=`
      .museum-list {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding-top: calc(44px + env(safe-area-inset-top, 0px));
      }
      .museum-list-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .museum-list-title {
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
      }
      .museum-list-subtitle {
        font-size: 16px;
        color: rgba(255,255,255,0.9);
        text-align: center;
        margin-top: -12px;
        margin-bottom: 24px;
      }
      .museum-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .museum-grid.muted {
        opacity: 0.7;
      }
      .museum-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .museum-card-disabled {
        cursor: not-allowed;
        filter: grayscale(0.3);
      }
      .museum-card:active {
        transform: scale(0.98);
      }
      .museum-card-disabled:active {
        transform: none;
      }
      .museum-cover {
        position: relative;
        width: 100%;
        padding-top: 60%;
        overflow: hidden;
      }
      .museum-cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .museum-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 20px;
        color: #fff;
      }
      .museum-name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .museum-desc {
        font-size: 14px;
        margin: 6px 0;
        line-height: 1.5;
      }
      .museum-scene-count {
        font-size: 14px;
        opacity: 0.9;
      }
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}function A_(s,e){const t=gt.degToRad(s),n=gt.degToRad(e),i=Math.cos(n)*Math.sin(t),r=Math.sin(n),a=Math.cos(n)*Math.cos(t);return new R(i,r,a)}function C_(s,e,t){const n=new R,i=new R;if(e.getWorldPosition(n),e.getWorldDirection(i),new R().copy(s).sub(n).dot(i)<=0)return{x:0,y:0,visible:!1};const a=new R().copy(s).project(e);if(!(a.x>=-1&&a.x<=1&&a.y>=-1&&a.y<=1&&a.z>=-1&&a.z<=1))return{x:0,y:0,visible:!1};const l=t.clientWidth,c=t.clientHeight,d=(a.x+1)*.5*l,h=(1-(a.y+1)*.5)*c;return{x:d,y:h,visible:!0}}function I_(s,e,t,n,i=500){const a=A_(s,e).clone().multiplyScalar(i);return C_(a,t,n)}function L_(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" />
  <path d="M16.2 16.2 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`}function R_(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 7.5v9l8-4.5-8-4.5Z"/>
</svg>`}function P_(s){const e=document.createElement("div");return e.className="hotspot-tooltip",e.textContent=s||"",e.setAttribute("role","tooltip"),e}function Zs(s,e){const t=document.createElement("div");return t.className=`hotspot-icon-circle${e?` ${e}`:""}`,t.innerHTML=s,t}function N_(){return`
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4v16M12 4l6 6M12 4l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function D_(s){const e=P_(s.tooltip),t=s.isGround??!1;let n="hotspot hotspot--unknown",i=document.createElement("div");i.className="hotspot-dot";const r=s.type;if(t){n="hotspot hotspot--ground";const a=document.createElement("div");a.className="hotspot-ground-ring",i=a}else r==="scene"?(n="hotspot hotspot--scene",i=Zs(N_(),"hotspot-icon hotspot-icon-arrow")):r==="image"?(n="hotspot hotspot--image",i=Zs(L_(),"hotspot-icon")):r==="info"?(n="hotspot hotspot--info",i=Zs('<span class="hotspot-info-text">i</span>',"hotspot-icon")):r==="video"&&(n="hotspot hotspot--video",i=Zs(R_(),"hotspot-icon hotspot-icon-play"));return{rootClassName:n,contentEl:i,tooltipEl:e}}class U_{constructor(e){v(this,"element");v(this,"isOpen",!1);v(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--image";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const i=document.createElement("div");i.className="vr-modal-card vr-modal-card--media vr-modal-card--image",i.addEventListener("click",d=>d.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"图片预览";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--image";const c=document.createElement("img");c.className="vr-modal-image",e.src&&(c.src=e.src),c.alt=e.title||"热点图片",c.loading="lazy",l.appendChild(c),i.appendChild(r),i.appendChild(l),t.appendChild(n),t.appendChild(i),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class O_{constructor(e){v(this,"element");v(this,"isOpen",!1);v(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--info";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const i=document.createElement("div");i.className="vr-modal-card vr-modal-card--info",i.addEventListener("click",c=>c.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"详情";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--info",l.textContent=e.text||"未配置内容",i.appendChild(r),i.appendChild(l),t.appendChild(n),t.appendChild(i),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class k_{constructor(e){v(this,"element");v(this,"isOpen",!1);v(this,"videoEl");v(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--video";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const i=document.createElement("div");i.className="vr-modal-card vr-modal-card--media vr-modal-card--video",i.addEventListener("click",d=>d.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"视频";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--video";const c=document.createElement("video");c.className="vr-modal-video",e.src&&(c.src=e.src),e.poster&&(c.poster=e.poster),c.controls=!0,c.playsInline=!0,c.preload="metadata",this.videoEl=c,l.appendChild(c),i.appendChild(r),i.appendChild(l),t.appendChild(n),t.appendChild(i),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){if(this.isOpen){this.isOpen=!1,this.element.classList.remove("open");try{this.videoEl.pause(),this.videoEl.currentTime=0,this.videoEl.removeAttribute("src"),this.videoEl.load()}catch{}}}getElement(){return this.element}destroy(){this.close(),this.element.remove()}}const yd="vr:open-modal",xd="vr:close-modal";function io(s){window.dispatchEvent(new CustomEvent(yd,{detail:s}))}function ga(){window.dispatchEvent(new CustomEvent(xd))}class F_{constructor(e){v(this,"rootEl");v(this,"current",null);v(this,"handleKeyDownBound");this.rootEl=e,this.handleKeyDownBound=t=>this.handleKeyDown(t),window.addEventListener(yd,t=>{const n=t;this.handleOpen(n.detail)}),window.addEventListener(xd,()=>this.close()),window.addEventListener("keydown",this.handleKeyDownBound)}handleKeyDown(e){e.key==="Escape"&&this.close()}handleOpen(e){this.close();let t=null;e.type==="image"?t=new U_({src:e.payload.src,title:e.payload.title,onClose:()=>ga()}):e.type==="info"?t=new O_({title:e.payload.title,text:e.payload.text,onClose:()=>ga()}):e.type==="video"&&(t=new k_({src:e.payload.src,poster:e.payload.poster,title:e.payload.title,onClose:()=>ga()})),t&&(this.current=t,this.rootEl.innerHTML="",this.rootEl.appendChild(t.getElement()),t.open())}close(){this.current&&(this.current.close(),this.current.destroy(),this.current=null,this.rootEl.innerHTML="")}}let _c=null;function bd(){if(_c)return;let s=document.getElementById("vr-modal-root");s||(s=document.createElement("div"),s.id="vr-modal-root",document.body.appendChild(s)),_c=new F_(s)}class Tr{constructor(e){v(this,"data");v(this,"el");v(this,"contentEl");v(this,"tooltipEl");v(this,"labelEl",null);v(this,"worldPos");v(this,"radius",500);v(this,"tooltipTimer",null);var a,o;this.data=e,this.el=document.createElement("div");const t=e.pitch<-20,n=D_({id:e.id,type:e.type,tooltip:e.tooltip,isGround:t});if(this.el.className=n.rootClassName,t&&this.el.classList.add("hotspot--ground"),this.el.setAttribute("data-hotspot-id",e.id),this.el.setAttribute("data-hotspot-type",e.type),this.el.style.pointerEvents="auto",this.el.style.position="absolute",this.el.style.left="0",this.el.style.top="0",this.contentEl=n.contentEl,this.tooltipEl=n.tooltipEl,e.label){const l=document.createElement("div");l.className="hotspot-label",l.textContent=e.label,l.setAttribute("aria-hidden","true"),this.labelEl=l}this.el.appendChild(this.contentEl),this.el.appendChild(this.tooltipEl),this.labelEl&&this.el.appendChild(this.labelEl),(((o=(a=window.matchMedia)==null?void 0:a.call(window,"(hover: hover) and (pointer: fine)"))==null?void 0:o.matches)??!1)&&(this.el.addEventListener("mouseenter",()=>this.showTooltip()),this.el.addEventListener("mouseleave",()=>this.hideTooltip())),this.el.addEventListener("pointerdown",l=>{l.stopPropagation(),this.el.classList.add("is-pressed")});const r=()=>this.el.classList.remove("is-pressed");this.el.addEventListener("pointerup",r),this.el.addEventListener("pointercancel",r),this.el.addEventListener("pointerleave",r)}getElement(){return this.el}getData(){return this.data}updateScreenPosition(e,t){const n=I_(this.data.yaw,this.data.pitch,e,t,this.radius);if(!n.visible){this.el.style.display="none",this.el.style.opacity="0";return}this.el.style.display="",this.el.style.opacity="1",this.el.style.setProperty("--hs-x",`${n.x}px`),this.el.style.setProperty("--hs-y",`${n.y}px`),this.el.style.transform=`translate3d(${n.x}px, ${n.y}px, 0) translate(-50%, -50%)`}showTooltip(e){this.data.tooltip&&(this.tooltipEl.classList.add("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null),e&&e>0&&(this.tooltipTimer=window.setTimeout(()=>this.hideTooltip(),e)))}hideTooltip(){this.tooltipEl.classList.remove("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null)}}class B_ extends Tr{onClick(){console.log("[hotspot] scene click",{id:this.data.id,targetSceneId:this.data.targetSceneId})}}class V_ extends Tr{onClick(){if(!this.data.imageUrl){console.warn("[hotspot] image click but no src configured",this.data),Ze("未配置内容",1500);return}io({type:"image",payload:{src:this.data.imageUrl,title:this.data.title||this.data.tooltip}})}}class H_ extends Tr{onClick(){if(!!!(this.data.text||this.data.title||this.data.tooltip)){console.warn("[hotspot] info click but no text/title configured",this.data),Ze("未配置内容",1500);return}io({type:"info",payload:{title:this.data.title||this.data.tooltip,text:this.data.text}})}}class z_ extends Tr{onClick(){if(!this.data.url){console.warn("[hotspot] video click but no src/url configured",this.data),Ze("未配置内容",1500);return}io({type:"video",payload:{src:this.data.url,poster:this.data.poster,title:this.data.title||this.data.tooltip}})}}class G_{constructor(e,t,n={}){v(this,"element");v(this,"viewer");v(this,"disposeFrameListener",null);v(this,"hotspotInstances",[]);v(this,"options");v(this,"unsubscribeFocus",null);v(this,"hoveredSceneId",null);this.viewer=e,this.options=n,this.element=document.createElement("div"),this.element.className="hotspots-container",this.element.style.pointerEvents="none",this.updateHotspots(t);const i=this.viewer.getDomElement();this.disposeFrameListener=this.viewer.onFrame(()=>{const r=this.viewer.getCamera();for(const a of this.hotspotInstances)a.updateScreenPosition(r,i)}),this.unsubscribeFocus=yr(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="hover"&&e.source!=="pano"){if(this.options.museumId&&e.museumId!==this.options.museumId)return;const t=e.sceneId;this.hoveredSceneId!==t&&(this.hoveredSceneId&&this.setHotspotHighlight(this.hoveredSceneId,!1),this.hoveredSceneId=t,t&&this.setHotspotHighlight(t,!0))}}setHotspotHighlight(e,t){this.hotspotInstances.forEach(n=>{const i=n.getData();if(i.type==="scene"&&i.targetSceneId===e){const a=n.getElement();t?a.classList.add("hotspot--external-hover"):a.classList.remove("hotspot--external-hover")}})}updateHotspots(e){var i,r;this.hotspotInstances=[],this.element.innerHTML="";const t=((r=(i=window.matchMedia)==null?void 0:i.call(window,"(hover: none) and (pointer: coarse)"))==null?void 0:r.matches)??!1,n=a=>{var o,l,c,d,h,p,f,_;if(a.type==="scene"){const g=(o=a.target)==null?void 0:o.sceneId,m=g?(c=(l=this.options).resolveSceneName)==null?void 0:c.call(l,g):void 0,u=`进入：${m||a.label||g||"未知场景"}`;return new B_({id:a.id,type:"scene",yaw:a.yaw,pitch:a.pitch,label:a.label||m||g,tooltip:u,targetSceneId:g})}if(a.type==="video"){const g=((d=a.target)==null?void 0:d.url)||a.src,m=((h=a.target)==null?void 0:h.poster)||a.poster,u=a.title||a.label;return new z_({id:a.id,type:"video",yaw:a.yaw,pitch:a.pitch,label:a.label,tooltip:u,url:g,poster:m,title:u})}if(a.type==="image"){const g=((p=a.target)==null?void 0:p.imageUrl)||((f=a.target)==null?void 0:f.url)||a.src,m=a.title||a.label;return new V_({id:a.id,type:"image",yaw:a.yaw,pitch:a.pitch,label:a.label,tooltip:m,imageUrl:g,title:m})}if(a.type==="info"){const g=a.title||a.label,m=((_=a.target)==null?void 0:_.text)||a.text;return new H_({id:a.id,type:"info",yaw:a.yaw,pitch:a.pitch,label:a.label,tooltip:g,text:m,title:g})}return null};for(const a of e){const o=n(a);o&&(o.getElement().addEventListener("click",l=>{var h,p;l.preventDefault(),l.stopPropagation();const c=o.getData(),d=c.type==="scene";if(t&&o.showTooltip(1200),d){const f=c.targetSceneId;if(f&&this.options.onEnterScene){Ze(`进入 ${((p=(h=this.options).resolveSceneName)==null?void 0:p.call(h,f))||f}`,1e3),this.options.onEnterScene(f);return}}o.onClick()}),this.hotspotInstances.push(o),this.element.appendChild(o.getElement()))}}getElement(){return this.element}remove(){this.disposeFrameListener&&(this.disposeFrameListener(),this.disposeFrameListener=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class W_{constructor(){v(this,"element");v(this,"videoElement");v(this,"isOpen",!1);this.element=document.createElement("div"),this.element.className="video-player-overlay",this.videoElement=document.createElement("video"),this.videoElement.controls=!0,this.videoElement.playsInline=!0,this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="video-player-backdrop"></div>
      <div class="video-player-content">
        <button class="video-player-close">×</button>
        <div class="video-container"></div>
      </div>
    `;const e=this.element.querySelector(".video-container");e&&e.appendChild(this.videoElement);const t=this.element.querySelector(".video-player-backdrop"),n=this.element.querySelector(".video-player-close");t==null||t.addEventListener("click",()=>this.close()),n==null||n.addEventListener("click",()=>this.close())}play(e){const t=zt(e,Ht.VIDEO);if(!t){console.error("视频 URL 为空");return}this.videoElement.src=t,this.videoElement.load(),this.open(),this.videoElement.play().catch(n=>{console.warn("自动播放失败，需要用户交互:",n)})}open(){this.isOpen=!0,this.element.classList.add("open"),document.body.style.overflow="hidden"}close(){this.isOpen=!1,this.element.classList.remove("open"),this.videoElement.pause(),this.videoElement.src="",document.body.style.overflow=""}applyStyles(){const e=document.createElement("style");e.textContent=`
      .video-player-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .video-player-overlay.open {
        pointer-events: all;
        opacity: 1;
      }
      .video-player-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
      }
      .video-player-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90vw;
        max-width: 800px;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
      }
      .video-player-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        z-index: 10;
        backdrop-filter: blur(10px);
      }
      .video-container {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
      }
      .video-container video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class Y_{constructor(){v(this,"element");this.element=document.createElement("div"),this.element.className="loading-overlay",this.render(),this.applyStyles();const e=()=>{ds()&&this.hide()};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}render(){this.element.innerHTML=`
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">加载中...</p>
      </div>
    `}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}show(){ds()||this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.element.remove()}}const Ed={[ne.INVALID_ROOT]:"配置格式错误",[ne.MISSING_APP_NAME]:"缺少应用名称",[ne.MUSEUMS_NOT_ARRAY]:"博物馆列表格式错误",[ne.MUSEUMS_EMPTY]:"博物馆列表为空",[ne.MISSING_MUSEUM_ID]:"缺少博物馆 ID",[ne.DUPLICATE_MUSEUM_ID]:"博物馆 ID 重复",[ne.MISSING_MUSEUM_NAME]:"缺少博物馆名称",[ne.MISSING_MUSEUM_COVER]:"缺少封面图",[ne.MISSING_MUSEUM_MAP]:"缺少地图配置",[ne.MISSING_MAP_IMAGE]:"缺少地图图片",[ne.INVALID_MAP_WIDTH]:"地图宽度无效",[ne.INVALID_MAP_HEIGHT]:"地图高度无效",[ne.SCENES_NOT_ARRAY]:"场景列表格式错误",[ne.SCENES_EMPTY]:"场景列表为空",[ne.MISSING_SCENE_ID]:"缺少场景 ID",[ne.DUPLICATE_SCENE_ID]:"场景 ID 重复",[ne.MISSING_SCENE_NAME]:"缺少场景名称",[ne.MISSING_PANO]:"缺少全景图",[ne.INVALID_PANO_URL]:"高清全景图 URL 无效",[ne.INVALID_PANOLOW_URL]:"低清全景图 URL 无效",[ne.MISSING_THUMB]:"缺少缩略图",[ne.MISSING_INITIAL_VIEW]:"缺少初始视角配置",[ne.INVALID_YAW]:"水平角度无效",[ne.INVALID_PITCH]:"垂直角度无效",[ne.INVALID_FOV]:"视野角度无效",[ne.MISSING_MAP_POINT]:"缺少地图点位",[ne.INVALID_MAP_POINT_X]:"地图点位 X 坐标无效",[ne.INVALID_MAP_POINT_Y]:"地图点位 Y 坐标无效",[ne.HOTSPOTS_NOT_ARRAY]:"热点列表格式错误",[ne.MISSING_HOTSPOT_ID]:"缺少热点 ID",[ne.DUPLICATE_HOTSPOT_ID]:"热点 ID 重复",[ne.INVALID_HOTSPOT_TYPE]:"热点类型无效",[ne.MISSING_HOTSPOT_LABEL]:"缺少热点标签",[ne.INVALID_HOTSPOT_YAW]:"热点水平角度无效",[ne.INVALID_HOTSPOT_PITCH]:"热点垂直角度无效",[ne.MISSING_HOTSPOT_TARGET]:"缺少热点目标配置",[ne.MISSING_TARGET_MUSEUM_ID]:"缺少目标博物馆 ID",[ne.MISSING_TARGET_SCENE_ID]:"缺少目标场景 ID",[ne.INVALID_TARGET_YAW]:"目标水平角度无效",[ne.INVALID_TARGET_PITCH]:"目标垂直角度无效",[ne.INVALID_TARGET_FOV]:"目标视野角度无效",[ne.MISSING_TARGET_URL]:"缺少视频链接"},Sd={[ne.INVALID_ROOT]:"请确保 config.json 是一个有效的 JSON 对象",[ne.MISSING_APP_NAME]:'请在配置中添加 "appName" 字段，例如："appName": "我的 VR 展馆"',[ne.MUSEUMS_NOT_ARRAY]:'请确保 "museums" 是一个数组，例如："museums": []',[ne.MUSEUMS_EMPTY]:'请至少添加一个博物馆到 "museums" 数组中',[ne.MISSING_MUSEUM_ID]:'请为该博物馆添加 "id" 字段，例如："id": "museum1"',[ne.DUPLICATE_MUSEUM_ID]:'请确保每个博物馆的 "id" 都是唯一的，不能重复',[ne.MISSING_MUSEUM_NAME]:'请为该博物馆添加 "name" 字段，例如："name": "第一展馆"',[ne.MISSING_MUSEUM_COVER]:'请为该博物馆添加 "cover" 字段，填入封面图的 URL',[ne.MISSING_MUSEUM_MAP]:'请为该博物馆添加 "map" 对象配置',[ne.MISSING_MAP_IMAGE]:'请在地图配置中添加 "image" 字段，填入地图图片的 URL',[ne.INVALID_MAP_WIDTH]:'请确保 "map.width" 是一个大于 0 的数字',[ne.INVALID_MAP_HEIGHT]:'请确保 "map.height" 是一个大于 0 的数字',[ne.SCENES_NOT_ARRAY]:'请确保 "scenes" 是一个数组，例如："scenes": []',[ne.SCENES_EMPTY]:"请至少为该博物馆添加一个场景",[ne.MISSING_SCENE_ID]:'请为该场景添加 "id" 字段，例如："id": "scene1"',[ne.DUPLICATE_SCENE_ID]:'请确保同一博物馆内每个场景的 "id" 都是唯一的',[ne.MISSING_SCENE_NAME]:'请为该场景添加 "name" 字段，例如："name": "正门"',[ne.MISSING_PANO]:'请为该场景添加 "pano"、"panoLow" 或 "panoTiles" 字段，至少提供一种全景来源',[ne.INVALID_PANO_URL]:'请确保 "pano" 字段是一个有效的图片 URL 字符串',[ne.INVALID_PANOLOW_URL]:'请确保 "panoLow" 字段是一个有效的图片 URL 字符串',[ne.MISSING_THUMB]:'请为该场景添加 "thumb" 字段，填入缩略图的 URL',[ne.MISSING_INITIAL_VIEW]:'请为该场景添加 "initialView" 对象配置',[ne.INVALID_YAW]:'请确保 "initialView.yaw" 是一个数字（水平角度，范围 -180 到 180）',[ne.INVALID_PITCH]:'请确保 "initialView.pitch" 是一个数字（垂直角度，范围 -90 到 90）',[ne.INVALID_FOV]:'请确保 "initialView.fov" 是一个数字（视野角度，范围 30 到 120）',[ne.MISSING_MAP_POINT]:'请为该场景添加 "mapPoint" 对象配置',[ne.INVALID_MAP_POINT_X]:'请确保 "mapPoint.x" 是一个数字（地图上的 X 坐标）',[ne.INVALID_MAP_POINT_Y]:'请确保 "mapPoint.y" 是一个数字（地图上的 Y 坐标）',[ne.HOTSPOTS_NOT_ARRAY]:'请确保 "hotspots" 是一个数组，例如："hotspots": []',[ne.MISSING_HOTSPOT_ID]:'请为该热点添加 "id" 字段，例如："id": "hotspot1"',[ne.DUPLICATE_HOTSPOT_ID]:'请确保同一场景内每个热点的 "id" 都是唯一的',[ne.INVALID_HOTSPOT_TYPE]:'请确保 "type" 字段是 "scene" 或 "video" 之一',[ne.MISSING_HOTSPOT_LABEL]:'请为该热点添加 "label" 字段，例如："label": "进入展厅"',[ne.INVALID_HOTSPOT_YAW]:'请确保 "yaw" 是一个数字（热点在全景图中的水平位置）',[ne.INVALID_HOTSPOT_PITCH]:'请确保 "pitch" 是一个数字（热点在全景图中的垂直位置）',[ne.MISSING_HOTSPOT_TARGET]:'请为该热点添加 "target" 对象配置',[ne.MISSING_TARGET_MUSEUM_ID]:'场景跳转类型的热点必须包含 "target.museumId" 字段',[ne.MISSING_TARGET_SCENE_ID]:'场景跳转类型的热点必须包含 "target.sceneId" 字段',[ne.INVALID_TARGET_YAW]:'请确保 "target.yaw" 是一个数字（跳转后的水平角度）',[ne.INVALID_TARGET_PITCH]:'请确保 "target.pitch" 是一个数字（跳转后的垂直角度）',[ne.INVALID_TARGET_FOV]:'请确保 "target.fov" 是一个数字（跳转后的视野角度）',[ne.MISSING_TARGET_URL]:'视频类型的热点必须包含 "target.url" 字段，填入视频的 URL'};class X_{constructor(e,t,n){v(this,"element");this.element=document.createElement("div"),this.element.className="config-error-panel",this.render(e,t,n),this.applyStyles()}render(e,t,n){this.element.innerHTML=`
      <div class="error-panel-content">
        <div class="error-panel-header">
          <h2>⚠️ 配置错误</h2>
          <p class="error-summary">发现 ${e.length} 个配置错误，请检查 config.json</p>
        </div>
        <div class="error-list">
          ${e.map((a,o)=>this.renderErrorCard(a,o)).join("")}
        </div>
        <div class="error-actions">
          <button class="btn btn-primary" id="retry-btn">🔄 刷新重试</button>
          <button class="btn btn-secondary" id="example-btn">📖 查看示例配置</button>
        </div>
      </div>
    `;const i=this.element.querySelector("#retry-btn"),r=this.element.querySelector("#example-btn");i&&i.addEventListener("click",t),r&&r.addEventListener("click",n)}renderErrorCard(e,t){const n=Ed[e.code]||"配置错误",i=Sd[e.code]||"请检查配置文件的格式和内容",r=[];e.museumName&&r.push(`馆：${e.museumName}`),e.sceneName&&r.push(`场景：${e.sceneName}`);const a=r.length>0?r.join(" / "):"全局配置";return`
      <div class="error-card">
        <div class="error-card-header">
          <span class="error-icon">❌</span>
          <span class="error-title">${this.escapeHtml(n)}</span>
        </div>
        <div class="error-card-body">
          <div class="error-location">
            <span class="location-icon">📍</span>
            <span class="location-text">${this.escapeHtml(a)}</span>
          </div>
          ${e.fieldName?`
            <div class="error-field">
              <span class="field-label">字段：</span>
              <span class="field-name">${this.escapeHtml(e.fieldName)}</span>
            </div>
          `:""}
          <div class="error-path">
            <span class="path-label">技术路径：</span>
            <code class="path-code">${this.escapeHtml(e.path)}</code>
          </div>
          <div class="error-hint">
            <span class="hint-icon">💡</span>
            <span class="hint-text">${this.escapeHtml(i)}</span>
          </div>
        </div>
      </div>
    `}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}applyStyles(){const e=document.createElement("style");e.textContent=`
      .config-error-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
      }
      .error-panel-content {
        max-width: 800px;
        width: 100%;
        background: #1a1a1a;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      }
      .error-panel-header {
        margin-bottom: 24px;
        text-align: center;
      }
      .error-panel-header h2 {
        font-size: 24px;
        color: #ff6b6b;
        margin-bottom: 8px;
      }
      .error-summary {
        color: #ccc;
        font-size: 14px;
      }
      .error-list {
        max-height: 400px;
        overflow-y: auto;
        margin-bottom: 24px;
        background: #0f0f0f;
        border-radius: 8px;
        padding: 16px;
      }
      .error-card {
        padding: 16px;
        margin-bottom: 12px;
        background: #252525;
        border-left: 4px solid #ff6b6b;
        border-radius: 8px;
        transition: background 0.2s;
      }
      .error-card:hover {
        background: #2a2a2a;
      }
      .error-card:last-child {
        margin-bottom: 0;
      }
      .error-card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      }
      .error-icon {
        font-size: 20px;
      }
      .error-title {
        font-size: 16px;
        font-weight: 600;
        color: #ff6b6b;
      }
      .error-card-body {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .error-location {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #4a90e2;
      }
      .location-icon {
        font-size: 14px;
      }
      .location-text {
        font-weight: 500;
      }
      .error-field {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #ccc;
      }
      .field-label {
        color: #999;
      }
      .field-name {
        color: #ffd93d;
        font-weight: 500;
      }
      .error-path {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
      .path-label {
        color: #666;
        white-space: nowrap;
      }
      .path-code {
        font-family: 'Courier New', monospace;
        color: #888;
        word-break: break-all;
        background: #1a1a1a;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 11px;
      }
      .error-hint {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-top: 8px;
        padding: 10px;
        background: #1a1a1a;
        border-radius: 6px;
        border-left: 3px solid #4a90e2;
      }
      .hint-icon {
        font-size: 16px;
        flex-shrink: 0;
        margin-top: 2px;
      }
      .hint-text {
        font-size: 13px;
        color: #ccc;
        line-height: 1.5;
      }
      .error-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
      }
      .btn-primary {
        background: #4a90e2;
        color: #fff;
      }
      .btn-primary:hover {
        background: #357abd;
      }
      .btn-primary:active {
        transform: scale(0.98);
      }
      .btn-secondary {
        background: #555;
        color: #fff;
      }
      .btn-secondary:hover {
        background: #666;
      }
      .btn-secondary:active {
        transform: scale(0.98);
      }
      @media (max-width: 600px) {
        .error-panel-content {
          padding: 16px;
        }
        .error-actions {
          flex-direction: column;
        }
        .btn {
          width: 100%;
        }
      }
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class $_{constructor(){v(this,"element");v(this,"isVisible",!1);v(this,"currentYaw",0);v(this,"currentPitch",0);v(this,"currentFov",75);v(this,"clickX",0);v(this,"clickY",0);this.element=document.createElement("div"),this.element.className="debug-panel",this.element.style.display="none",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="debug-panel-content">
        <div class="debug-panel-header">
          <h3>🔧 调试信息</h3>
          <button class="debug-close-btn" id="debug-close-btn">×</button>
        </div>
        <div class="debug-info">
          <div class="debug-item">
            <span class="debug-label">Yaw:</span>
            <span class="debug-value" id="debug-yaw">0</span>°
          </div>
          <div class="debug-item">
            <span class="debug-label">Pitch:</span>
            <span class="debug-value" id="debug-pitch">0</span>°
          </div>
          <div class="debug-item">
            <span class="debug-label">FOV:</span>
            <span class="debug-value" id="debug-fov">75</span>°
          </div>
        </div>
        <div class="debug-actions">
          <button class="debug-btn" id="debug-copy-btn">📋 复制热点 JSON</button>
        </div>
      </div>
    `;const e=this.element.querySelector("#debug-close-btn");e&&e.addEventListener("click",()=>{this.hide()});const t=this.element.querySelector("#debug-copy-btn");t&&t.addEventListener("click",()=>{this.copyHotspotJSON()})}show(e,t,n,i,r){this.clickX=e,this.clickY=t,this.currentYaw=n,this.currentPitch=i,this.currentFov=r;const a=this.element.querySelector("#debug-yaw"),o=this.element.querySelector("#debug-pitch"),l=this.element.querySelector("#debug-fov");a&&(a.textContent=n.toFixed(1)),o&&(o.textContent=i.toFixed(1)),l&&(l.textContent=r.toFixed(1));const c=280,d=200,h=20;let p=e-c/2,f=t-d/2;p=Math.max(h,Math.min(p,window.innerWidth-c-h)),f=Math.max(h,Math.min(f,window.innerHeight-d-h)),this.element.style.left=`${p}px`,this.element.style.top=`${f}px`,this.element.style.display="block",this.isVisible=!0}hide(){this.element.style.display="none",this.isVisible=!1}updateView(e,t,n){if(this.currentYaw=e,this.currentPitch=t,this.currentFov=n,this.isVisible){const i=this.element.querySelector("#debug-yaw"),r=this.element.querySelector("#debug-pitch"),a=this.element.querySelector("#debug-fov");i&&(i.textContent=e.toFixed(1)),r&&(r.textContent=t.toFixed(1)),a&&(a.textContent=n.toFixed(1))}}async copyHotspotJSON(){const e={id:`hs_${Date.now()}`,yaw:Math.round(this.currentYaw*10)/10,pitch:Math.round(this.currentPitch*10)/10,type:"scene",targetSceneId:"",label:"热点"},t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),this.showToast("✅ 已复制到剪贴板")}catch{const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select();try{document.execCommand("copy"),this.showToast("✅ 已复制到剪贴板")}catch{this.showToast("❌ 复制失败，请手动复制")}document.body.removeChild(i)}}showToast(e){const t=document.createElement("div");t.className="debug-toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},10),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},2e3)}applyStyles(){const e=document.createElement("style");e.textContent=`
      .debug-panel {
        position: fixed;
        z-index: 10001;
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #4a90e2;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        min-width: 280px;
        max-width: 90vw;
      }
      .debug-panel-content {
        padding: 16px;
      }
      .debug-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
      }
      .debug-panel-header h3 {
        margin: 0;
        font-size: 18px;
        color: #4a90e2;
      }
      .debug-close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background 0.2s;
      }
      .debug-close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      .debug-info {
        margin-bottom: 16px;
      }
      .debug-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #222;
      }
      .debug-item:last-child {
        border-bottom: none;
      }
      .debug-label {
        color: #999;
        font-size: 14px;
      }
      .debug-value {
        color: #4a90e2;
        font-weight: 600;
        font-family: 'Courier New', monospace;
      }
      .debug-actions {
        display: flex;
        gap: 8px;
      }
      .debug-btn {
        flex: 1;
        padding: 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;
        font-family: inherit;
      }
      .debug-btn:hover {
        background: #357abd;
      }
      .debug-btn:active {
        transform: scale(0.98);
      }
      .debug-toast {
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(0, 0, 0, 0.9);
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10002;
        opacity: 0;
        transition: all 0.3s;
        pointer-events: none;
      }
      .debug-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}const so="vrplayer_config_draft_v1";function yc(){try{const s=localStorage.getItem(so);return s?JSON.parse(s):null}catch(s){return console.warn("加载草稿失败",s),null}}function q_(s){try{const e=JSON.stringify(s);return localStorage.setItem(so,e),{ok:!0}}catch(e){return console.warn("保存草稿失败",e),{ok:!1,reason:e instanceof Error?e.message:"unknown"}}}function j_(){try{localStorage.removeItem(so)}catch(s){console.warn("清空草稿失败",s)}}const Md="vr_last_pick_v1";let ro=null;function K_(){try{const s=localStorage.getItem(Md);if(s){const e=JSON.parse(s);typeof e.yaw=="number"&&typeof e.pitch=="number"&&typeof e.ts=="number"&&(ro=e)}}catch{}}K_();function Z_(s){ro=s;try{localStorage.setItem(Md,JSON.stringify(s))}catch{}}function xc(){return ro}const bc="vrplayer_config_draft_ignore_session";class J_{constructor(e,t){v(this,"element");v(this,"config");v(this,"initialConfig");v(this,"editingTarget",{type:"global"});v(this,"simpleMode",!0);v(this,"validationErrors",[]);v(this,"validationDebounceTimer",null);v(this,"draftSaveTimer",null);v(this,"draftLoaded",!1);v(this,"draftIgnoreSession",!1);v(this,"draftBannerMessage",null);v(this,"onConfigChange");this.config=JSON.parse(JSON.stringify(e)),this.initialConfig=JSON.parse(JSON.stringify(e)),this.onConfigChange=t;try{this.draftIgnoreSession=sessionStorage.getItem(bc)==="1"}catch(n){console.warn("读取草稿忽略状态失败",n),this.draftIgnoreSession=!1}this.tryRestoreDraft(),this.element=document.createElement("div"),this.element.className="config-studio",this.render(),this.applyStyles(),this.renderDraftBanner(),this.validateConfig()}tryRestoreDraft(){if(this.draftIgnoreSession)return;const e=yc();e&&(this.config=JSON.parse(JSON.stringify(e)),this.draftLoaded=!0,this.draftBannerMessage="检测到未导出的草稿，已自动恢复。",this.onConfigChange&&this.onConfigChange(this.config))}renderDraftBanner(){const e=this.element.querySelector("#draft-banner");if(!e)return;if(!this.draftLoaded||this.draftIgnoreSession){e.innerHTML="",e.style.display="none";return}const t=this.draftBannerMessage||"检测到未导出的草稿，已自动恢复。";e.innerHTML=`
      <div class="draft-banner-content">
        <span class="draft-banner-text">${this.escapeHtml(t)}</span>
        <div class="draft-banner-actions">
          <button class="banner-btn" data-banner-action="export">导出</button>
          <button class="banner-btn" data-banner-action="clear">清空草稿</button>
          <button class="banner-btn" data-banner-action="ignore">忽略本次</button>
        </div>
      </div>
    `,e.style.display="flex",this.bindDraftBannerEvents()}bindDraftBannerEvents(){const e=this.element.querySelector("#draft-banner");e&&e.querySelectorAll("[data-banner-action]").forEach(t=>{t.addEventListener("click",n=>{const i=n.currentTarget.getAttribute("data-banner-action");i==="export"?this.handleExport():i==="clear"?this.handleClearDraft():i==="ignore"&&this.handleIgnoreDraft()})})}handleIgnoreDraft(){this.draftIgnoreSession=!0;try{sessionStorage.setItem(bc,"1")}catch(e){console.warn("记录忽略草稿状态失败",e)}this.config=JSON.parse(JSON.stringify(this.initialConfig)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.bindEvents(),this.debouncedValidate(),this.notifyChange({skipDraftSave:!0}),this.renderDraftBanner(),this.showToast("已忽略草稿，本次会话使用默认配置")}handleClearDraft(){confirm("确定清空本地草稿？")&&(j_(),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderDraftBanner(),this.showToast("草稿已清空"))}handleExport(){this.exportConfig();const e=yc();e&&this.isConfigSameAs(e)&&this.showToast("已导出（草稿仍保留）")}exportConfig(){const e=JSON.stringify(this.config,null,2),t=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download="config.json",i.click(),URL.revokeObjectURL(n)}isConfigSameAs(e){try{return JSON.stringify(this.config)===JSON.stringify(e)}catch{return!1}}render(){this.element.innerHTML=`
      <div class="studio-container">
        <div class="draft-banner" id="draft-banner" aria-live="polite"></div>
        <!-- 顶部工具条 -->
        <div class="studio-toolbar">
          <div class="toolbar-left">
            <button class="toolbar-btn" id="import-btn">📥 导入配置</button>
            <button class="toolbar-btn" id="export-btn">📤 导出配置</button>
            <button class="toolbar-btn" id="reset-btn">🔄 重置为示例</button>
            <button class="toolbar-btn" id="clear-draft-btn">🗑️ 清空草稿</button>
          </div>
          <div class="toolbar-right">
            <label class="simple-toggle">
              <input type="checkbox" id="simple-mode-toggle" checked>
              <span>简易模式</span>
            </label>
            <div class="validation-status" id="validation-status">⏳ 校验中...</div>
          </div>
        </div>

        <!-- 主内容区：左右两栏 -->
        <div class="studio-content">
          <!-- 左栏：馆/场景树 -->
          <div class="studio-sidebar">
            <div class="sidebar-header">配置结构</div>
            <div class="sidebar-tree" id="sidebar-tree"></div>
          </div>

          <!-- 右栏：表单编辑区 -->
          <div class="studio-editor">
            <div class="editor-header" id="editor-header">选择左侧项目进行编辑</div>
            <div class="editor-form" id="editor-form"></div>
          </div>
        </div>

        <!-- 底部：错误面板 -->
        <div class="studio-errors" id="studio-errors"></div>
      </div>

      <!-- 隐藏的文件输入 -->
      <input type="file" id="file-input" accept=".json" style="display: none;">
    `,this.renderSidebar(),this.renderEditor(),this.bindEvents()}renderSidebar(){const e=this.element.querySelector("#sidebar-tree");e&&(e.innerHTML=`
      <div class="tree-item ${this.editingTarget.type==="global"?"active":""}" data-target="global">
        <span class="tree-icon">🌐</span>
        <span class="tree-label">全局配置</span>
      </div>
      ${this.config.museums.map((t,n)=>`
        <div class="tree-item museum-item ${this.editingTarget.type==="museum"&&this.editingTarget.museumIndex===n?"active":""}" data-target="museum:${n}">
          <span class="tree-icon">🏛️</span>
          <span class="tree-label">${this.escapeHtml(t.name)}</span>
          <button class="tree-btn-add" data-action="add-scene" data-museum="${n}" title="添加场景">+</button>
          <button class="tree-btn-del" data-action="del-museum" data-museum="${n}" title="删除博物馆">×</button>
        </div>
        ${t.scenes.map((i,r)=>`
          <div class="tree-item scene-item ${this.editingTarget.type==="scene"&&this.editingTarget.museumIndex===n&&this.editingTarget.sceneIndex===r?"active":""}" data-target="scene:${n}:${r}">
            <span class="tree-icon">📷</span>
            <span class="tree-label">${this.escapeHtml(i.name)}</span>
            ${this.simpleMode?`
              <button class="tree-btn-add" data-action="add-hotspot-scene" data-museum="${n}" data-scene="${r}" title="添加跳转热点">+ 添加跳转</button>
              <button class="tree-btn-add" data-action="add-hotspot-video" data-museum="${n}" data-scene="${r}" title="添加视频热点">+ 添加视频</button>
            `:`
              <button class="tree-btn-add" data-action="add-hotspot" data-museum="${n}" data-scene="${r}" title="添加热点">+</button>
            `}
            <button class="tree-btn-del" data-action="del-scene" data-museum="${n}" data-scene="${r}" title="删除场景">×</button>
          </div>
          ${i.hotspots.map((a,o)=>`
            <div class="tree-item hotspot-item ${this.editingTarget.type==="hotspot"&&this.editingTarget.museumIndex===n&&this.editingTarget.sceneIndex===r&&this.editingTarget.hotspotIndex===o?"active":""}" data-target="hotspot:${n}:${r}:${o}">
              <span class="tree-icon">📍</span>
              <span class="tree-label">${this.escapeHtml(a.label)}${this.simpleMode&&a.type!=="scene"&&a.type!=="video"?"（高级模式编辑）":""}</span>
              <button class="tree-btn-del" data-action="del-hotspot" data-museum="${n}" data-scene="${r}" data-hotspot="${o}" title="删除热点">×</button>
            </div>
          `).join("")}
        `).join("")}
      `).join("")}
      <div class="tree-item tree-item-add">
        <button class="tree-btn-add-main" id="add-museum-btn">+ 添加博物馆</button>
      </div>
    `)}renderEditor(){const e=this.element.querySelector("#editor-header"),t=this.element.querySelector("#editor-form");!e||!t||(this.simpleMode?this.renderSimpleForm(e,t):this.renderAdvancedForm(e,t))}renderSimpleForm(e,t){if(this.editingTarget.type==="global"){e.textContent="全局配置",t.innerHTML=`
        <div class="form-group">
          <label>应用名称</label>
          <input type="text" id="field-appName" value="${this.escapeHtml(this.config.appName)}" placeholder="应用名称">
        </div>
      `;return}if(this.editingTarget.type==="museum"){const n=this.config.museums[this.editingTarget.museumIndex];e.textContent=`编辑博物馆：${n.name}`,t.innerHTML=`
        <div class="form-group">
          <label>馆ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(n.id)}" placeholder="museum_id">
        </div>
        <div class="form-group">
          <label>馆名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(n.name)}" placeholder="博物馆名称">
        </div>
        <div class="form-group">
          <label>封面图 URL</label>
          <input type="text" id="field-cover" value="${this.escapeHtml(n.cover)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
      `;return}if(this.editingTarget.type==="scene"){const n=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];e.textContent=`编辑场景：${n.name}`,t.innerHTML=`
        <div class="form-group">
          <label>场景ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(n.id)}" placeholder="scene_id">
        </div>
        <div class="form-group">
          <label>场景名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(n.name)}" placeholder="场景名称">
        </div>
        <div class="form-group">
          <label>缩略图</label>
          <input type="text" id="field-thumb" value="${this.escapeHtml(n.thumb)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-group">
          <label>低清全景 (panoLow)</label>
          <input type="text" id="field-panoLow" value="${n.panoLow?this.escapeHtml(n.panoLow):""}" placeholder="https://...">
          <div class="input-hint">首屏快速加载，网络慢时优先使用</div>
        </div>
        <div class="form-group">
          <label>高清全景 (pano)</label>
          <input type="text" id="field-pano" value="${n.pano?this.escapeHtml(n.pano):""}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-actions">
          <button class="btn-preview" id="preview-scene-btn">👁️ 预览此场景</button>
          <button class="btn-pick-hotspot" id="pick-hotspot-btn">🎯 用拾取落点新增热点</button>
        </div>
      `;return}if(this.editingTarget.type==="hotspot"){const n=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex],i=n.type==="scene",r=n.type==="video";if(e.textContent=`编辑热点：${n.label}`,!i&&!r){t.innerHTML=`
          <div class="notice-box">
            该热点类型仅可在高级模式编辑，请切换到高级模式。
          </div>
        `;return}t.innerHTML=`
        <div class="form-actions" style="margin-bottom: 16px;">
          <button class="btn-pick-reposition" id="pick-reposition-btn">🎯 重新拾取位置</button>
        </div>
        <div class="form-group">
          <label>热点类型</label>
          <select id="field-type">
            <option value="scene" ${i?"selected":""}>跳转场景</option>
            <option value="video" ${r?"selected":""}>播放视频</option>
          </select>
        </div>
        <div class="form-group">
          <label>热点标题</label>
          <input type="text" id="field-label" value="${this.escapeHtml(n.label)}" placeholder="如：进入展厅">
        </div>
        <div class="form-group">
          <label>左右角度 (yaw)</label>
          <input type="number" id="field-yaw" value="${n.yaw??0}" step="0.1">
        </div>
        <div class="form-group">
          <label>上下角度 (pitch)</label>
          <input type="number" id="field-pitch" value="${n.pitch??0}" step="0.1">
        </div>
        ${i?`
          <div class="form-group">
            <label>目标场景 ID</label>
            <input type="text" id="field-target-sceneId" value="${n.target.sceneId||""}" placeholder="scene_id">
            <div class="input-hint">跳转到同馆内的场景 ID</div>
          </div>
        `:`
          <div class="form-group">
            <label>视频链接</label>
            <input type="text" id="field-target-url" value="${n.target.url||""}" placeholder="https://...">
            <div class="input-hint">建议使用可直接访问的 https 链接</div>
          </div>
        `}
      `;return}}renderAdvancedForm(e,t){if(this.editingTarget.type==="global")e.textContent="全局配置",t.innerHTML=this.renderGlobalForm();else if(this.editingTarget.type==="museum"){const n=this.config.museums[this.editingTarget.museumIndex];e.textContent=`编辑博物馆：${n.name}`,t.innerHTML=this.renderMuseumForm(n,this.editingTarget.museumIndex)}else if(this.editingTarget.type==="scene"){const n=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];e.textContent=`编辑场景：${n.name}`,t.innerHTML=this.renderSceneForm(n,this.editingTarget.museumIndex,this.editingTarget.sceneIndex)}else if(this.editingTarget.type==="hotspot"){const n=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];e.textContent=`编辑热点：${n.label}`,t.innerHTML=this.renderHotspotForm(n,this.editingTarget.museumIndex,this.editingTarget.sceneIndex,this.editingTarget.hotspotIndex)}}renderGlobalForm(){return`
      <div class="form-group">
        <label>应用名称</label>
        <input type="text" id="field-appName" value="${this.escapeHtml(this.config.appName)}" placeholder="应用名称">
      </div>
    `}renderMuseumForm(e,t){return`
      <div class="form-group">
        <label>博物馆 ID</label>
        <input type="text" id="field-id" value="${this.escapeHtml(e.id)}" placeholder="museum_id">
      </div>
      <div class="form-group">
        <label>博物馆名称</label>
        <input type="text" id="field-name" value="${this.escapeHtml(e.name)}" placeholder="博物馆名称">
      </div>
      <div class="form-group">
        <label>封面图 URL</label>
        <input type="text" id="field-cover" value="${this.escapeHtml(e.cover)}" placeholder="https://...">
      </div>
    `}renderSceneForm(e,t,n){return`
      <div class="form-group">
        <label>场景 ID</label>
        <input type="text" id="field-id" value="${this.escapeHtml(e.id)}" placeholder="scene_id">
      </div>
      <div class="form-group">
        <label>场景名称</label>
        <input type="text" id="field-name" value="${this.escapeHtml(e.name)}" placeholder="场景名称">
      </div>
      <div class="form-group">
        <label>缩略图 URL</label>
        <input type="text" id="field-thumb" value="${this.escapeHtml(e.thumb)}" placeholder="https://...">
      </div>
      <div class="form-group">
        <label>低清全景图 URL (panoLow)</label>
        <input type="text" id="field-panoLow" value="${e.panoLow?this.escapeHtml(e.panoLow):""}" placeholder="https://...">
      </div>
      <div class="form-group">
        <label>高清全景图 URL (pano)</label>
        <input type="text" id="field-pano" value="${e.pano?this.escapeHtml(e.pano):""}" placeholder="https://...">
      </div>
      <div class="form-actions">
        <button class="btn-preview" id="preview-scene-btn">👁️ 预览此场景</button>
      </div>
    `}renderHotspotForm(e,t,n,i){const r=e.type==="scene";return`
      <div class="form-actions" style="margin-bottom: 16px;">
        <button class="btn-pick-reposition" id="pick-reposition-btn">🎯 重新拾取位置</button>
      </div>
      <div class="form-group">
        <label>热点类型</label>
        <select id="field-type">
          <option value="scene" ${r?"selected":""}>场景跳转</option>
          <option value="video" ${r?"":"selected"}>视频播放</option>
        </select>
      </div>
      <div class="form-group">
        <label>热点标签</label>
        <input type="text" id="field-label" value="${this.escapeHtml(e.label)}" placeholder="热点标签">
      </div>
      <div class="form-group">
        <label>水平角度 (yaw)</label>
        <input type="number" id="field-yaw" value="${e.yaw??0}" step="0.1">
      </div>
      <div class="form-group">
        <label>垂直角度 (pitch)</label>
        <input type="number" id="field-pitch" value="${e.pitch??0}" step="0.1">
      </div>
      ${r?`
        <div class="form-group">
          <label>目标博物馆 ID</label>
          <input type="text" id="field-target-museumId" value="${e.target.museumId||""}" placeholder="museum_id">
        </div>
        <div class="form-group">
          <label>目标场景 ID</label>
          <input type="text" id="field-target-sceneId" value="${e.target.sceneId||""}" placeholder="scene_id">
        </div>
      `:`
        <div class="form-group">
          <label>视频 URL</label>
          <input type="text" id="field-target-url" value="${e.target.url||""}" placeholder="https://...">
        </div>
      `}
    `}bindEvents(){var a;const e=this.element.querySelector("#import-btn"),t=this.element.querySelector("#export-btn"),n=this.element.querySelector("#reset-btn"),i=this.element.querySelector("#clear-draft-btn");this.element.querySelector("#file-input");const r=this.element.querySelector("#simple-mode-toggle");r&&(r.checked=this.simpleMode,r.addEventListener("change",()=>{this.simpleMode=r.checked,this.renderSidebar(),this.renderEditor(),this.bindEvents()})),e==null||e.addEventListener("click",()=>{const o=prompt("请粘贴 JSON 配置：");if(o)try{const l=JSON.parse(o);this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(l){alert("JSON 格式错误："+l)}}),t==null||t.addEventListener("click",()=>{this.handleExport()}),n==null||n.addEventListener("click",async()=>{try{const l=await(await fetch("./config.json",{cache:"no-store"})).json();this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(o){alert("加载示例配置失败："+o)}}),i==null||i.addEventListener("click",()=>{this.handleClearDraft()}),this.element.querySelectorAll(".tree-item[data-target]").forEach(o=>{o.addEventListener("click",l=>{const c=o.getAttribute("data-target");if(c){if(c==="global")this.editingTarget={type:"global"};else if(c.startsWith("museum:")){const d=parseInt(c.split(":")[1]);this.editingTarget={type:"museum",museumIndex:d}}else if(c.startsWith("scene:")){const[d,h,p]=c.split(":").map(Number);this.editingTarget={type:"scene",museumIndex:h,sceneIndex:p}}else if(c.startsWith("hotspot:")){const[d,h,p,f]=c.split(":").map(Number);this.editingTarget={type:"hotspot",museumIndex:h,sceneIndex:p,hotspotIndex:f}}this.renderSidebar(),this.renderEditor(),this.bindFormEvents()}})}),(a=this.element.querySelector("#add-museum-btn"))==null||a.addEventListener("click",()=>{this.addMuseum()}),this.element.querySelectorAll("[data-action]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const c=o.getAttribute("data-action"),d=parseInt(o.getAttribute("data-museum")||"0"),h=parseInt(o.getAttribute("data-scene")||"0"),p=parseInt(o.getAttribute("data-hotspot")||"0");c==="add-scene"?this.addScene(d):c==="del-museum"?confirm("确定删除此博物馆？")&&this.deleteMuseum(d):c==="add-hotspot"?this.addHotspot(d,h,"scene"):c==="add-hotspot-scene"?this.addHotspot(d,h,"scene"):c==="add-hotspot-video"?this.addHotspot(d,h,"video"):c==="del-scene"?confirm("确定删除此场景？")&&this.deleteScene(d,h):c==="del-hotspot"&&confirm("确定删除此热点？")&&this.deleteHotspot(d,h,p)})}),this.bindFormEvents()}bindFormEvents(){if(this.editingTarget.type==="global"){const e=this.element.querySelector("#field-appName");e==null||e.addEventListener("input",()=>{this.config.appName=e.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="museum"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-cover");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].cover=n.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="scene"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-thumb"),i=this.element.querySelector("#field-panoLow"),r=this.element.querySelector("#field-pano"),a=this.element.querySelector("#preview-scene-btn");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].thumb=n.value,this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];i.value?l.panoLow=i.value:delete l.panoLow,this.debouncedValidate(),this.notifyChange()}),r==null||r.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];r.value?l.pano=r.value:delete l.pano,this.debouncedValidate(),this.notifyChange()}),a==null||a.addEventListener("click",()=>{const l=this.config.museums[this.editingTarget.museumIndex],c=l.scenes[this.editingTarget.sceneIndex];Qt(l.id,c.id)});const o=this.element.querySelector("#pick-hotspot-btn");o==null||o.addEventListener("click",()=>{this.handleAddHotspotFromPick()})}if(this.editingTarget.type==="hotspot"){const e=this.element.querySelector("#field-type"),t=this.element.querySelector("#field-label"),n=this.element.querySelector("#field-yaw"),i=this.element.querySelector("#field-pitch"),r=this.element.querySelector("#field-target-museumId"),a=this.element.querySelector("#field-target-sceneId"),o=this.element.querySelector("#field-target-url");e==null||e.addEventListener("change",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];c.type=e.value,c.type==="scene"?c.target={museumId:"",sceneId:""}:c.target={url:""},this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].label=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].yaw=parseFloat(n.value)||0,this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].pitch=parseFloat(i.value)||0,this.debouncedValidate(),this.notifyChange()});const l=this.element.querySelector("#pick-reposition-btn");l==null||l.addEventListener("click",()=>{this.handleRepositionHotspot()}),r&&r.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.museumId||(c.museumId=""),c.museumId=r.value,this.debouncedValidate(),this.notifyChange()}),a&&a.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.sceneId||(c.sceneId=""),c.sceneId=a.value,this.debouncedValidate(),this.notifyChange()}),o&&o.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.url||(c.url=""),c.url=o.value,this.debouncedValidate(),this.notifyChange()})}}addMuseum(){const e={id:`museum_${Date.now()}`,name:"新博物馆",cover:"",map:{image:"",width:1e3,height:600},scenes:[]};this.config.museums.push(e),this.editingTarget={type:"museum",museumIndex:this.config.museums.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addScene(e){const t={id:`scene_${Date.now()}`,name:"新场景",thumb:"",pano:"",initialView:{yaw:0,pitch:0,fov:75},mapPoint:{x:0,y:0},hotspots:[]};this.config.museums[e].scenes.push(t),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:this.config.museums[e].scenes.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addHotspot(e,t,n="scene"){const i={id:`hotspot_${Date.now()}`,type:n,label:n==="video"?"新视频热点":"新跳转热点",yaw:0,pitch:0,target:n==="video"?{url:""}:{museumId:this.config.museums[e].id,sceneId:""}};this.config.museums[e].scenes[t].hotspots.push(i),this.editingTarget={type:"hotspot",museumIndex:e,sceneIndex:t,hotspotIndex:this.config.museums[e].scenes[t].hotspots.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteMuseum(e){this.config.museums.splice(e,1),this.editingTarget={type:"global"},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteScene(e,t){this.config.museums[e].scenes.splice(t,1),this.editingTarget={type:"museum",museumIndex:e},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteHotspot(e,t,n){this.config.museums[e].scenes[t].hotspots.splice(n,1),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:t},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}debouncedValidate(){this.validationDebounceTimer&&clearTimeout(this.validationDebounceTimer),this.validationDebounceTimer=window.setTimeout(()=>{this.validateConfig()},200)}validateConfig(){this.validationErrors=Cc(this.config),this.updateValidationStatus(),this.renderErrors()}scheduleDraftSave(e){e||(this.draftSaveTimer&&clearTimeout(this.draftSaveTimer),this.draftSaveTimer=window.setTimeout(()=>{const t=q_(this.config);t.ok?this.draftLoaded=!0:this.showToast(`草稿保存失败：${t.reason||"未知原因"}`)},300))}updateValidationStatus(){const e=this.element.querySelector("#validation-status");e&&(this.validationErrors.length===0?(e.innerHTML="✅ 配置通过",e.className="validation-status status-ok"):(e.innerHTML=`❌ ${this.validationErrors.length} 个错误`,e.className="validation-status status-error"))}renderErrors(){const e=this.element.querySelector("#studio-errors");if(e){if(this.validationErrors.length===0){e.innerHTML="";return}e.innerHTML=`
      <div class="studio-errors-content">
        <div class="errors-header">配置错误 (${this.validationErrors.length} 个)</div>
        <div class="errors-list">
          ${this.validationErrors.map(t=>{const n=t.code&&Ed[t.code]||"配置错误",i=t.code&&Sd[t.code]||"请检查配置",r=[];t.museumName&&r.push(`馆：${t.museumName}`),t.sceneName&&r.push(`点位：${t.sceneName}`);const a=r.length>0?r.join(" / "):"全局配置";return`
              <div class="error-card-mini">
                <div class="error-card-header">
                  <span class="error-icon">❌</span>
                  <span class="error-title">${this.escapeHtml(n)}</span>
                </div>
                <div class="error-card-body">
                  <div class="error-location">📍 ${this.escapeHtml(a)}</div>
                  ${t.fieldName?`<div class="error-field">字段：${this.escapeHtml(t.fieldName)}</div>`:""}
                  <div class="error-hint">💡 ${this.escapeHtml(i)}</div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}}notifyChange(e){this.onConfigChange&&this.onConfigChange(this.config),this.scheduleDraftSave(!!(e!=null&&e.skipDraftSave))}showToast(e){const t=document.createElement("div");t.className="studio-toast",t.textContent=e,this.element.appendChild(t),requestAnimationFrame(()=>{t.classList.add("show")}),window.setTimeout(()=>{t.classList.remove("show"),window.setTimeout(()=>t.remove(),300)},2e3)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}handleAddHotspotFromPick(){const e=xc();if(!e){Ze("没有拾取点：先点右上角🎯，在全景里点一下");return}if(this.editingTarget.type!=="scene"){Ze("请先选择一个场景");return}const{museumIndex:t,sceneIndex:n}=this.editingTarget,i=this.config.museums[t].scenes[n],r={id:`hs_${Date.now()}`,type:"scene",yaw:e.yaw,pitch:e.pitch,label:"进入场景",target:{sceneId:""}};i.hotspots||(i.hotspots=[]),i.hotspots.push(r),this.renderSidebar(),this.renderEditor(),this.bindFormEvents();const a=i.hotspots.length-1;this.highlightNewHotspot(t,n,a),this.editingTarget={type:"hotspot",museumIndex:t,sceneIndex:n,hotspotIndex:a},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange(),Ze("已新增热点：请在配置里补全目标场景")}highlightNewHotspot(e,t,n){window.setTimeout(()=>{const i=this.element.querySelector("#sidebar-tree");if(!i)return;const r=i.querySelectorAll(".hotspot-item"),a=r[r.length-1];a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}handleRepositionHotspot(){if(this.editingTarget.type!=="hotspot"){Ze("请先选择一个热点");return}const e=xc();if(!e){Ze("没有拾取点：先点右上角🎯，在全景里点一下");return}const{museumIndex:t,sceneIndex:n,hotspotIndex:i}=this.editingTarget,r=this.config.museums[t].scenes[n].hotspots[i],a=c=>Math.round(c*10)/10,o=a(e.yaw),l=a(e.pitch);r.yaw=o,r.pitch=l,this.renderEditor(),this.bindFormEvents(),this.highlightHotspotItem(t,n,i),this.debouncedValidate(),this.notifyChange(),window.dispatchEvent(new CustomEvent("vr:pickmode",{detail:{enabled:!1}})),Ze(`已更新位置 yaw:${o.toFixed(1)} pitch:${l.toFixed(1)}`)}highlightHotspotItem(e,t,n){window.setTimeout(()=>{const i=this.element.querySelector("#sidebar-tree");if(!i)return;const r=`hotspot:${e}:${t}:${n}`,a=i.querySelector(`[data-target="${r}"]`);a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}getConfig(){return this.config}getElement(){return this.element}remove(){this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
      .config-studio {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #1a1a1a;
        z-index: 20000;
        display: flex;
        flex-direction: column;
        color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      .studio-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .studio-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 20px;
        background: #252525;
        border-bottom: 1px solid #333;
      }
      .draft-banner {
        display: none;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        background: #2c3e50;
        border-bottom: 1px solid #34495e;
        font-size: 14px;
        color: #fff;
      }
      .draft-banner-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 12px;
      }
      .draft-banner-text {
        flex: 1;
      }
      .draft-banner-actions {
        display: flex;
        gap: 8px;
        flex-shrink: 0;
      }
      .banner-btn {
        padding: 6px 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
      }
      .banner-btn:hover {
        background: #357abd;
      }
      .toolbar-left {
        display: flex;
        gap: 8px;
      }
      .toolbar-right {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .simple-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }
      .simple-toggle input {
        width: 16px;
        height: 16px;
      }
      .toolbar-btn {
        padding: 8px 16px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .toolbar-btn:hover {
        background: #357abd;
      }
      .validation-status {
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
      }
      .status-ok {
        background: #27ae60;
        color: #fff;
      }
      .status-error {
        background: #e74c3c;
        color: #fff;
      }
      .studio-content {
        display: flex;
        flex: 1;
        overflow: hidden;
      }
      .studio-sidebar {
        width: 300px;
        background: #1f1f1f;
        border-right: 1px solid #333;
        overflow-y: auto;
      }
      .sidebar-header {
        padding: 16px;
        font-weight: 600;
        border-bottom: 1px solid #333;
      }
      .sidebar-tree {
        padding: 8px;
      }
      .tree-item {
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
        transition: background 0.2s;
      }
      .tree-item:hover {
        background: #2a2a2a;
      }
      .tree-item.active {
        background: #4a90e2;
      }
      .tree-item-add {
        margin-top: 16px;
        padding: 0;
      }
      .tree-icon {
        font-size: 16px;
      }
      .tree-label {
        flex: 1;
        font-size: 14px;
      }
      .museum-item {
        font-weight: 500;
      }
      .scene-item {
        padding-left: 32px;
        font-size: 13px;
      }
      .hotspot-item {
        padding-left: 56px;
        font-size: 12px;
        color: #ccc;
      }
      .tree-btn-add,
      .tree-btn-del {
        padding: 2px 6px;
        background: transparent;
        border: 1px solid #555;
        color: #fff;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .tree-item:hover .tree-btn-add,
      .tree-item:hover .tree-btn-del {
        opacity: 1;
      }
      .tree-btn-add:hover {
        background: #27ae60;
        border-color: #27ae60;
      }
      .tree-btn-del:hover {
        background: #e74c3c;
        border-color: #e74c3c;
      }
      .tree-btn-add-main {
        width: 100%;
        padding: 10px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      .tree-btn-add-main:hover {
        background: #357abd;
      }
      .studio-editor {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
      }
      .editor-header {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-group label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        color: #ccc;
      }
      .form-group input,
      .form-group select {
        width: 100%;
        padding: 10px;
        background: #252525;
        border: 1px solid #444;
        border-radius: 6px;
        color: #fff;
        font-size: 14px;
        font-family: inherit;
      }
      .input-hint {
        margin-top: 4px;
        color: #888;
        font-size: 12px;
      }
      .notice-box {
        padding: 12px;
        background: #252525;
        border-left: 3px solid #f39c12;
        border-radius: 6px;
        color: #f1c40f;
        font-size: 13px;
      }
      .form-group input:focus,
      .form-group select:focus {
        outline: none;
        border-color: #4a90e2;
      }
      .form-actions {
        margin-top: 24px;
      }
      .btn-preview {
        padding: 10px 20px;
        background: #27ae60;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .btn-preview:hover {
        background: #229954;
      }
      .btn-pick-hotspot {
        padding: 10px 20px;
        background: #f39c12;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 8px;
      }
      .btn-pick-hotspot:hover {
        background: #e67e22;
      }
      .btn-pick-reposition {
        padding: 10px 20px;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .btn-pick-reposition:hover {
        background: #357abd;
      }
      .tree-item--flash {
        animation: tree-item-flash 0.3s ease-out;
      }
      @keyframes tree-item-flash {
        0% { background: rgba(74, 144, 226, 0.4); }
        100% { background: transparent; }
      }
      .studio-errors {
        max-height: 200px;
        overflow-y: auto;
        border-top: 1px solid #333;
        background: #0f0f0f;
      }
      .studio-errors-content {
        padding: 16px;
      }
      .errors-header {
        font-weight: 600;
        margin-bottom: 12px;
        color: #ff6b6b;
      }
      .errors-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .error-card-mini {
        padding: 12px;
        background: #252525;
        border-left: 3px solid #ff6b6b;
        border-radius: 6px;
        font-size: 12px;
      }
      .error-card-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
      }
      .error-icon {
        font-size: 14px;
      }
      .error-title {
        font-weight: 600;
        color: #ff6b6b;
      }
      .error-card-body {
        display: flex;
        flex-direction: column;
        gap: 4px;
        color: #ccc;
      }
      .error-location {
        color: #4a90e2;
      }
      .error-field {
        color: #ffd93d;
      }
      .error-hint {
        color: #999;
        font-size: 11px;
      }
      .studio-toast {
        position: fixed;
        right: 20px;
        top: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 10px 14px;
        border-radius: 6px;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        opacity: 0;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 30000;
      }
      .studio-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
    `,document.head.appendChild(e)}}let Rn=null;function wd(){return Rn!==null?Rn:typeof navigator<"u"&&navigator.maxTouchPoints>0||typeof window<"u"&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)?(Rn="touch",Rn):(Rn="mouse",Rn)}function Td(){return wd()==="touch"}function Ad(){return wd()==="mouse"}function Q_(){const s=document;return document.fullscreenElement||s.webkitFullscreenElement||null}function gr(){return!!Q_()}async function e0(s){const e=s;if(e.requestFullscreen){await e.requestFullscreen();return}if(e.webkitRequestFullscreen){await e.webkitRequestFullscreen();return}throw new Error("Fullscreen API not supported")}async function t0(){const s=document;if(document.exitFullscreen){await document.exitFullscreen();return}if(s.webkitExitFullscreen){await s.webkitExitFullscreen();return}}async function Cd(s){const e=s||document.body;!gr()&&Ad()&&Ze("鼠标滑至最上方可退出全屏",700),await e0(e)}async function Oa(){try{await t0(),Id()}catch(s){console.debug("[fullscreen] exitFullscreenBestEffort failed:",s)}}function Id(){var s,e;try{(e=(s=screen.orientation)==null?void 0:s.unlock)==null||e.call(s)}catch{}}function n0(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 4H4V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 4H20V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 20H4V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 20H20V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function i0(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 9V4h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 9V4h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 15v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 15v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 9l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 9l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 15l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 15l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}class s0{constructor(e={}){v(this,"element");v(this,"fullscreenBtn");v(this,"pickModeBtn",null);v(this,"northCalibrationBtn",null);v(this,"vrModeBtn",null);v(this,"viewerRootEl");v(this,"onTogglePickMode");v(this,"onOpenNorthCalibration");v(this,"onToggleVrMode");v(this,"isPickModeActive",!1);v(this,"isVrModeActive",!1);this.viewerRootEl=e.viewerRootEl,this.onTogglePickMode=e.onTogglePickMode,this.onOpenNorthCalibration=e.onOpenNorthCalibration,this.onToggleVrMode=e.onToggleVrMode,this.element=document.createElement("div"),this.element.className="vr-topright-controls";const t=r=>{const a=r;this.updatePickModeState(a.detail.enabled)};window.addEventListener("vr:pickmode",t);const n=()=>{this.syncFullscreenState()};document.addEventListener("fullscreenchange",n),document.addEventListener("webkitfullscreenchange",n),this.fullscreenBtn=document.createElement("button"),this.fullscreenBtn.className="vr-topright-btn vr-top-icon-only vr-icon-btn",this.fullscreenBtn.setAttribute("aria-label","进入全屏"),this.fullscreenBtn.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation();const a=gr();try{if(a)await Oa();else{const o=this.viewerRootEl;if(!o){console.warn("[TopRightControls] fullscreen target not set");return}await Cd(o)}}catch(o){ct&&console.debug("[TopRightControls] fullscreen toggle failed",o)}finally{setTimeout(()=>{this.syncFullscreenState()},100)}}),this.syncFullscreenState(),this.onTogglePickMode&&(this.pickModeBtn=document.createElement("button"),this.pickModeBtn.className="vr-topright-btn",this.pickModeBtn.setAttribute("aria-label","拾取模式"),this.pickModeBtn.title="拾取模式：点一下画面获取 yaw/pitch",this.pickModeBtn.textContent="🎯",this.pickModeBtn.style.fontSize="18px",this.pickModeBtn.addEventListener("click",r=>{if(r.preventDefault(),r.stopPropagation(),this.onTogglePickMode){const a=this.onTogglePickMode();this.updatePickModeState(a)}}),this.element.appendChild(this.pickModeBtn)),e.showNorthCalibration!==!1&&(e.onOpenNorthCalibration||ct)&&this.onOpenNorthCalibration&&(this.northCalibrationBtn=document.createElement("button"),this.northCalibrationBtn.className="vr-topright-btn",this.northCalibrationBtn.setAttribute("aria-label","校准北向"),this.northCalibrationBtn.title="校准北向：设置当前场景的北方向",this.northCalibrationBtn.textContent="🧭",this.northCalibrationBtn.style.fontSize="18px",this.northCalibrationBtn.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.onOpenNorthCalibration&&this.onOpenNorthCalibration()}),this.element.appendChild(this.northCalibrationBtn)),Td()&&this.onToggleVrMode&&(this.vrModeBtn=document.createElement("button"),this.vrModeBtn.className="vr-topright-btn vr-top-icon-only vr-icon-btn",this.vrModeBtn.setAttribute("aria-label","VR眼镜"),this.vrModeBtn.title="VR眼镜：转动设备控制视角",this.vrModeBtn.textContent="🥽",this.vrModeBtn.style.fontSize="18px",this.vrModeBtn.addEventListener("click",async r=>{if(r.preventDefault(),r.stopPropagation(),this.onToggleVrMode)try{const a=await this.onToggleVrMode();this.updateVrModeState(a)}catch(a){ct&&console.debug("[TopRightControls] VR mode toggle failed",a)}}),this.element.appendChild(this.vrModeBtn)),this.element.appendChild(this.fullscreenBtn)}updatePickModeState(e){this.isPickModeActive=e,this.pickModeBtn&&(this.pickModeBtn.setAttribute("aria-label",e?"关闭拾取模式":"开启拾取模式"),this.pickModeBtn.title=e?"关闭拾取模式":"开启拾取模式：点一下画面获取 yaw/pitch",e?this.pickModeBtn.style.background="rgba(255,255,255,0.18)":this.pickModeBtn.style.background="")}updateVrModeState(e){this.isVrModeActive=e,this.vrModeBtn&&(this.vrModeBtn.setAttribute("aria-label",e?"退出VR模式":"进入VR模式"),this.vrModeBtn.title=e?"退出VR模式":"VR眼镜：转动设备控制视角",e?this.vrModeBtn.style.background="rgba(255,255,255,0.18)":this.vrModeBtn.style.background="")}setViewerRootEl(e){this.viewerRootEl=e}syncFullscreenState(){const e=gr();this.fullscreenBtn.setAttribute("aria-label",e?"退出全屏":"进入全屏"),this.fullscreenBtn.title=e?"退出全屏":"进入全屏",this.fullscreenBtn.innerHTML=e?i0():n0()}getElement(){return this.element}remove(){this.element.remove()}}async function Ld(s){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(s),!0}catch(e){console.debug("[copyText] Clipboard API failed, using fallback:",e)}try{const e=document.createElement("textarea");e.value=s,e.style.position="fixed",e.style.top="-9999px",e.style.left="-9999px",e.style.opacity="0",e.setAttribute("readonly","readonly"),document.body.appendChild(e),e.select(),e.setSelectionRange(0,s.length);const t=document.execCommand("copy");return document.body.removeChild(e),t}catch(e){return console.debug("[copyText] execCommand fallback failed:",e),!1}}class r0{constructor(e={}){v(this,"root");v(this,"backdrop");v(this,"card");v(this,"closeBtn");v(this,"isOpen",!1);v(this,"onCloseCallback");v(this,"escapeHandler");this.onCloseCallback=e.onClose,this.root=document.createElement("div"),this.root.className="vr-teammodal",this.backdrop=document.createElement("div"),this.backdrop.className="vr-teammodal-backdrop",this.backdrop.addEventListener("click",()=>this.close()),this.root.appendChild(this.backdrop),this.card=document.createElement("div"),this.card.className="vr-teammodal-card",this.closeBtn=document.createElement("button"),this.closeBtn.className="vr-teammodal-close",this.closeBtn.innerHTML="×",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.addEventListener("click",()=>this.close()),this.closeBtn.addEventListener("touchstart",f=>{f.stopPropagation(),this.close()});const t=document.createElement("div");t.className="vr-teammodal-title",t.textContent="鼎虎清源";const n=document.createElement("div");n.className="vr-teammodal-subtitle",n.textContent="VR 研学项目";const i=document.createElement("div");i.className="vr-teammodal-content";const r=document.createElement("p");r.className="vr-teammodal-text",r.textContent="致力于打造沉浸式虚拟现实研学体验，让学习更生动、更直观。";const a=document.createElement("p");a.className="vr-teammodal-text",a.textContent="通过 360° 全景技术，为师生提供身临其境的探索之旅。";const o=document.createElement("p");o.className="vr-teammodal-text",o.textContent="融合创新科技与教育理念，开启数字化学习新篇章。";const l=document.createElement("div");l.className="vr-teammodal-support";const c=document.createElement("div");c.textContent="技术支持：kyu",l.appendChild(c);const d=document.createElement("div");d.className="copyable",d.setAttribute("data-copy","onekyu"),d.textContent="微信：onekyu(点此复制)",d.style.cursor="pointer",d.addEventListener("click",async()=>{const f=d.getAttribute("data-copy");f&&await Ld(f)&&(Ze("微信号已复制"),ct&&console.debug("[TeamIntroModal] 微信号已复制:",f))}),l.appendChild(d);const h=document.createElement("div");h.className="vr-teammodal-footer",h.textContent="© 2025 鼎虎清源",i.appendChild(r),i.appendChild(a),i.appendChild(o),i.appendChild(l);const p=document.createElement("div");p.className="vr-teammodal-header",p.appendChild(t),p.appendChild(this.closeBtn),this.card.appendChild(p),this.card.appendChild(n),this.card.appendChild(i),this.card.appendChild(h),this.root.appendChild(this.card),this.escapeHandler=f=>{f.key==="Escape"&&this.isOpen&&this.close()},window.addEventListener("keydown",this.escapeHandler)}getModalRoot(){let e=document.getElementById("vr-modal-root");if(!e&&(bd(),e=document.getElementById("vr-modal-root"),!e))throw new Error("vr-modal-root missing, please call ensureModalHost() first");return e}mount(e){this.root.parentNode!==e&&(this.root.parentNode&&this.root.parentNode.removeChild(this.root),e.appendChild(this.root))}open(){if(ct&&console.debug("[TeamIntroModal] open called",new Error().stack),this.isOpen)return;const e=this.getModalRoot();this.root.parentNode!==e&&(this.root.parentNode&&this.root.parentNode.removeChild(this.root),e.appendChild(this.root)),this.isOpen=!0,requestAnimationFrame(()=>{this.root.classList.add("open")})}close(){this.isOpen&&(this.isOpen=!1,this.root.classList.remove("open"),this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.onCloseCallback&&this.onCloseCallback())}dispose(){this.escapeHandler&&window.removeEventListener("keydown",this.escapeHandler),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class a0{constructor(e={}){v(this,"element");v(this,"teamIntroModal");this.teamIntroModal=new r0({}),this.element=document.createElement("div"),this.element.className="vr-brandmark",this.element.textContent=e.brandText||"鼎虎清源"}getElement(){return this.element}getAboutModal(){return this.teamIntroModal}remove(){this.element.remove(),this.teamIntroModal.dispose()}}const o0=["辱骂","傻逼","垃圾","滚开","暴力","色情","黄色","毒品","赌博","诈骗","恐怖","自杀","枪","炸弹","仇恨","歧视","hate","suicide","bomb","porn"];function Ec(s){return(s||"").toLowerCase().replace(/\s+/g,"").replace(/[^\p{L}\p{N}]+/gu,"")}function l0(s){const e=Ec(s);return e?o0.some(t=>e.includes(Ec(String(t)))):!1}const ao="vr_user",Rd="vr_comments_v1",Pd="vr_likes_v1",c0=1e4,d0=200,h0=50;function oo(s,e){if(!s)return e;try{return JSON.parse(s)}catch{return e}}function Nd(s){return`${s}_${Date.now()}_${Math.random().toString(16).slice(2,8)}`}function hs(){const s=oo(localStorage.getItem(ao),null);return!s||typeof s!="object"||typeof s.id!="string"||typeof s.name!="string"?null:{id:s.id,name:s.name}}function u0(s){const e={id:Nd("u"),name:s};return localStorage.setItem(ao,JSON.stringify(e)),e}function Dd(){localStorage.removeItem(ao)}function Ud(){const s=oo(localStorage.getItem(Rd),[]);return Array.isArray(s)?s:[]}function p0(s){localStorage.setItem(Rd,JSON.stringify(s))}function f0(s){return Ud().filter(e=>e.sceneId===s).sort((e,t)=>t.ts-e.ts).slice(0,h0)}function m0(s,e){const t=hs();if(!t)return{ok:!1,reason:"not_logged_in"};const n=(e||"").trim();if(l0(n))return{ok:!1,reason:"banned"};const i=Ud(),r=i.filter(l=>l.sceneId===s&&l.userId===t.id).sort((l,c)=>c.ts-l.ts)[0];if(r&&Date.now()-r.ts<c0)return{ok:!1,reason:"cooldown"};const o=[{id:Nd("c"),sceneId:s,userId:t.id,userName:t.name,text:n,ts:Date.now()},...i].slice(0,d0);return p0(o),{ok:!0}}function Od(){return oo(localStorage.getItem(Pd),{likesCountByScene:{},likedByUser:{}})}function g0(s){localStorage.setItem(Pd,JSON.stringify(s))}function v0(s,e){var r;const t=Od(),n=t.likesCountByScene[s]||0,i=e?!!((r=t.likedByUser[e])!=null&&r[s]):!1;return{count:n,liked:i}}function Sc(s,e){return v0(s,e)}function _0(s){const e=hs();if(!e)return{ok:!1,reason:"login_required"};const t=Od();t.likedByUser[e.id]||(t.likedByUser[e.id]={});const i=!!!t.likedByUser[e.id][s];t.likedByUser[e.id][s]=i;const r=t.likesCountByScene[s]||0;return t.likesCountByScene[s]=Math.max(0,r+(i?1:-1)),g0(t),{ok:!0,action:i?"liked":"unliked",count:t.likesCountByScene[s]}}class y0{constructor(e={}){v(this,"element");v(this,"isOpen",!1);v(this,"inputEl");v(this,"options");v(this,"handleKeyDownBound");this.options=e,this.handleKeyDownBound=g=>this.handleKeyDown(g),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const t=document.createElement("div");t.className="vr-modal-mask";const n=document.createElement("div");n.className="vr-modal-card vr-login-card";const i=document.createElement("div");i.className="vr-login-title-row";const r=document.createElement("div");r.className="vr-modal-title",r.textContent="登录";const a=document.createElement("button");a.className="vr-btn vr-login-close",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",()=>this.close()),i.appendChild(r),i.appendChild(a);const o=document.createElement("div");o.className="vr-modal-desc",o.textContent="输入用户名即可参与互动";const l=document.createElement("div");l.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",g=>{g.key==="Enter"&&this.handleConfirm()});const c=document.createElement("div");c.className="vr-modal-actions vr-login-actions";const d=document.createElement("button");d.className="vr-btn vr-login-btn",d.textContent="取消",d.addEventListener("click",()=>this.close());const h=document.createElement("button");h.className="vr-btn vr-login-btn danger",h.textContent="退出登录",h.addEventListener("click",()=>{var g,m;Dd(),(m=(g=this.options).onLogout)==null||m.call(g),this.close()});const p=document.createElement("button");p.className="vr-btn vr-login-btn primary",p.textContent="确认",p.addEventListener("click",()=>this.handleConfirm()),c.appendChild(d),c.appendChild(h),c.appendChild(p),l.appendChild(this.inputEl),n.appendChild(i),n.appendChild(o),n.appendChild(l),n.appendChild(c),t.addEventListener("click",()=>this.close()),n.addEventListener("click",g=>g.stopPropagation()),this.element.appendChild(t),this.element.appendChild(n);const f=()=>{const g=hs();h.style.display=g?"inline-flex":"none"},_=this.open.bind(this);this.open=()=>{f(),_()}}handleKeyDown(e){this.isOpen&&e.key==="Escape"&&this.close()}handleConfirm(){var n,i;const e=(this.inputEl.value||"").trim();if(e.length<2||e.length>12){Ze("用户名需 2-12 字");return}const t=u0(e);(i=(n=this.options).onLogin)==null||i.call(n,t),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const e=hs();this.inputEl.value=(e==null?void 0:e.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class x0{constructor(e){v(this,"element");v(this,"sceneId");v(this,"sceneName");v(this,"onClose");v(this,"subtitleEl");v(this,"loginHintBtn");v(this,"userLineEl");v(this,"userNameEl");v(this,"likeBtn");v(this,"likeCountEl");v(this,"commentsEl");v(this,"inputEl");v(this,"sendBtn");v(this,"loginModal");v(this,"highlightNextFirstComment",!1);this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-community";const t=document.createElement("div");t.className="vr-community-header";const n=document.createElement("div");n.className="vr-community-title",n.textContent="社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle";const i=document.createElement("button");i.className="vr-community-close",i.innerHTML="×",i.setAttribute("aria-label","关闭"),i.style.pointerEvents="auto",i.style.zIndex="10",i.addEventListener("click",d=>{var h;d.preventDefault(),d.stopPropagation(),d.stopImmediatePropagation(),(h=this.onClose)==null||h.call(this),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"community"}}))}),t.appendChild(n),t.appendChild(this.subtitleEl),t.appendChild(i);const r=document.createElement("div");r.className="vr-community-content";const a=document.createElement("div");a.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可参与互动",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const o=document.createElement("button");o.className="vr-btn vr-community-logout",o.textContent="退出登录",o.addEventListener("click",()=>{Dd(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(o),a.appendChild(this.loginHintBtn),a.appendChild(this.userLineEl);const l=document.createElement("div");l.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="点赞",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const d=_0(this.sceneId);if(!d.ok){Ze("请先登录"),this.loginModal.open();return}this.renderLikes(d.count,d.action==="liked"),Ze(d.action==="liked"?"已点赞":"已取消点赞")}),l.appendChild(this.likeBtn),l.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const c=document.createElement("div");c.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",d=>{d.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),c.appendChild(this.inputEl),c.appendChild(this.sendBtn),r.appendChild(a),r.appendChild(l),r.appendChild(this.commentsEl),r.appendChild(c),this.element.appendChild(t),this.element.appendChild(r),this.loginModal=new y0({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(e.sceneId,e.sceneName)}setScene(e,t){this.sceneId=e,this.sceneName=t,this.subtitleEl.textContent=this.sceneName?this.sceneName:e,this.refresh()}toastByReason(e){e==="not_logged_in"?Ze("请先登录"):e==="banned"?Ze("内容包含敏感词，已拦截"):e==="cooldown"?Ze("评论过于频繁，请稍后再试"):e==="EMPTY"&&Ze("内容不能为空")}formatRelativeTime(e){const t=Date.now()-e;if(t<6e4)return"刚刚";const n=Math.floor(t/6e4);if(n<60)return`${n} 分钟前`;const i=Math.floor(n/60);return i<24?`${i} 小时前`:new Date(e).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(e,t){this.likeCountEl.textContent=String(e),this.likeBtn.classList.toggle("liked",t)}renderComments(e){this.commentsEl.innerHTML="";const t=document.createElement("div");if(t.className="vr-community-tip",t.textContent="本场景最近 50 条留言",this.commentsEl.appendChild(t),!e.length){const i=document.createElement("div");i.className="vr-community-empty",i.textContent="此场景暂无留言",this.commentsEl.appendChild(i);return}let n=null;for(const i of e){const r=document.createElement("div");r.className="vr-community-comment";const a=document.createElement("div");a.className="vr-community-comment-meta",a.textContent=`${i.userName} · ${this.formatRelativeTime(i.ts)}`;const o=document.createElement("div");o.className="vr-community-comment-text",o.textContent=i.text,r.appendChild(a),r.appendChild(o),this.commentsEl.appendChild(r),n||(n=r)}n&&this.highlightNextFirstComment&&(n.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{n==null||n.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const t=(this.inputEl.value||"").trim();if(!t){this.toastByReason("EMPTY");return}const n=m0(this.sceneId,t);if(!n.ok){n.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(n.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,Ze("评论已发布")}refresh(){const e=hs();this.loginHintBtn.style.display=e?"none":"inline-flex",this.userLineEl.style.display=e?"flex":"none",this.userNameEl.textContent=e?e.name:"";const t=Sc(this.sceneId,(e==null?void 0:e.id)||"anon").count,n=e?Sc(this.sceneId,e.id).liked:!1;this.renderLikes(t,n),this.renderComments(f0(this.sceneId));const i=!e;this.inputEl.disabled=i,this.sendBtn.classList.toggle("disabled",i)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}class b0{constructor(e){v(this,"element");v(this,"museum");v(this,"scenes");v(this,"currentSceneId");v(this,"onClose");v(this,"mapContainer");v(this,"mapImage");v(this,"pointsContainer");v(this,"unsubscribeFocus",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-map-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-map-header";const t=document.createElement("div");t.className="vr-map-title",t.textContent="平面图";const n=document.createElement("button");n.className="vr-btn vr-map-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(n),this.mapContainer=document.createElement("div"),this.mapContainer.className="vr-map-container",this.mapImage=document.createElement("img"),this.mapImage.className="vr-map-image",this.mapImage.src=this.museum.map.image,this.mapImage.alt=`${this.museum.name} 平面图`,this.mapImage.style.width="100%",this.mapImage.style.height="auto",this.mapImage.style.display="block",this.pointsContainer=document.createElement("div"),this.pointsContainer.className="vr-map-points",this.mapContainer.appendChild(this.mapImage),this.mapContainer.appendChild(this.pointsContainer);const i=document.createElement("div");i.className="vr-map-body",i.appendChild(this.mapContainer),this.element.appendChild(e),this.element.appendChild(i),this.mapImage.addEventListener("load",()=>{this.renderPoints()}),this.mapImage.complete&&this.renderPoints(),this.unsubscribeFocus=yr(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="map"){const t=this.pointsContainer.querySelector(`[data-scene-id="${e.sceneId}"]`);t&&(t.classList.add("vr-map-point--focus-flash"),setTimeout(()=>{t.classList.remove("vr-map-point--focus-flash")},300))}}renderPoints(){if(this.pointsContainer.innerHTML="",!this.mapImage.complete||!this.mapContainer.offsetWidth){setTimeout(()=>this.renderPoints(),100);return}const e=this.museum.map.width,t=this.museum.map.height,n=this.mapContainer.offsetWidth,i=n*t/e;this.mapContainer.style.height=`${i}px`;const r=n/e,a=i/t;this.scenes.forEach(o=>{if(!o.mapPoint)return;const l=document.createElement("button");l.className="vr-btn vr-map-point",l.setAttribute("data-scene-id",o.id),l.setAttribute("aria-label",o.name),o.id===this.currentSceneId&&l.classList.add("vr-map-point--current");const d=o.mapPoint.x*r,h=o.mapPoint.y*a;l.style.left=`${d}px`,l.style.top=`${h}px`;const p=document.createElement("div");p.className="vr-map-point-marker",l.appendChild(p);const f=document.createElement("div");f.className="vr-map-point-tooltip",f.textContent=o.name,l.appendChild(f),l.addEventListener("mouseenter",()=>{en({type:"hover",museumId:this.museum.id,sceneId:o.id,source:"map",ts:Date.now()})}),l.addEventListener("mouseleave",()=>{en({type:"hover",museumId:this.museum.id,sceneId:null,source:"map",ts:Date.now()})}),l.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),en({type:"focus",museumId:this.museum.id,sceneId:o.id,source:"map",ts:Date.now()}),Qt(this.museum.id,o.id),this.onClose&&this.onClose()}),this.pointsContainer.appendChild(l)})}updateCurrentScene(e){this.currentSceneId=e,this.renderPoints()}updateMuseum(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.mapImage.src=e.map.image,this.renderPoints()}getElement(){return this.element}remove(){this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class E0{constructor(e,t,n,i,r,a){v(this,"scene");v(this,"camera");v(this,"renderer");v(this,"container");v(this,"controls");v(this,"sceneNodes",new Map);v(this,"currentSceneId",null);v(this,"animationId",null);v(this,"museumId");v(this,"museum",null);v(this,"scenes");v(this,"onSceneClick");v(this,"unsubscribeFocus",null);v(this,"hoveredSceneId",null);v(this,"focusAnimation",null);v(this,"animate",()=>{this.animationId=requestAnimationFrame(this.animate),this.controls&&this.controls.update(),this.focusAnimation&&(this.focusAnimation.progress+=.05,this.focusAnimation.progress>=1?(this.camera.position.copy(this.focusAnimation.target),this.camera.lookAt(0,0,0),this.controls&&this.controls.update(),this.focusAnimation=null):(this.camera.position.lerpVectors(this.focusAnimation.start,this.focusAnimation.target,this.focusAnimation.progress),this.camera.lookAt(0,0,0)));const e=Date.now()*.001;this.sceneNodes.forEach(t=>{if(t.userData.isCurrent){const n=Math.sin(e*2)*.1+1;t.scale.set(n*1.2,n*1.2,n*1.2);const i=t.material;i.opacity=.6+Math.sin(e*2)*.2}}),this.renderer.render(this.scene,this.camera)});this.container=e,this.museumId=t,this.museum=a||null,this.scenes=n,this.currentSceneId=i,this.onSceneClick=r,this.scene=new Xa,this.scene.background=null,this.camera=new Ct(50,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,5,10),this.camera.lookAt(0,0,0),this.renderer=new Sr({antialias:!0,alpha:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(this.renderer.domElement),this.initControls(),this.generateNodes(),this.setupLighting(),this.animate(),window.addEventListener("resize",()=>this.handleResize()),this.unsubscribeFocus=yr(o=>{this.handleSceneFocus(o)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="dollhouse"){const t=this.sceneNodes.get(e.sceneId);if(t){const n=t.position.clone(),i=new R(n.x*.3,n.y+3,n.z+8);this.focusAnimation={target:i,start:this.camera.position.clone(),progress:0}}}}async initControls(){try{const{OrbitControls:e}=await Di(async()=>{const{OrbitControls:t}=await import("./OrbitControls-DSUWnEEy.js");return{OrbitControls:t}},[],import.meta.url);this.controls=new e(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=3,this.controls.maxDistance=30,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.minPolarAngle=Math.PI/6}catch(e){console.warn("Failed to load OrbitControls:",e)}}setupLighting(){const e=new fd(16777215,.6);this.scene.add(e);const t=new pd(16777215,.4);t.position.set(5,10,5),this.scene.add(t)}generateNodes(){this.sceneNodes.forEach(t=>{this.scene.remove(t),t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose()}),this.sceneNodes.clear();const e=this.calculateLayout();this.scenes.forEach((t,n)=>{const i=e[n],r=this.createSceneNode(t,i,t.id===this.currentSceneId);this.sceneNodes.set(t.id,r),this.scene.add(r)})}calculateLayout(){var i,r,a,o;const e=[],t=this.scenes.filter(l=>l.mapPoint);if(t.length>0){const l=((r=(i=this.museum)==null?void 0:i.map)==null?void 0:r.width)||1e3,c=((o=(a=this.museum)==null?void 0:a.map)==null?void 0:o.height)||600;let d=1/0,h=-1/0,p=1/0,f=-1/0;t.forEach(T=>{T.mapPoint&&(d=Math.min(d,T.mapPoint.x),h=Math.max(h,T.mapPoint.x),p=Math.min(p,T.mapPoint.y),f=Math.max(f,T.mapPoint.y))});const _=h-d||l,g=f-p||c,m=_>0?10/_:.01,u=g>0?10/g:.01,b=(d+h)/2,y=(p+f)/2;for(const T of this.scenes)if(T.mapPoint)e.push({x:(T.mapPoint.x-b)*m,y:0,z:(T.mapPoint.y-y)*u});else{const I=Math.ceil(Math.sqrt(this.scenes.length)),C=Math.floor(e.length/I),A=e.length%I;e.push({x:(A-I/2)*2,y:0,z:(C-I/2)*2})}}else{const l=Math.ceil(Math.sqrt(this.scenes.length));for(let c=0;c<this.scenes.length;c++){const d=Math.floor(c/l),h=c%l;e.push({x:(h-l/2)*2,y:0,z:(d-l/2)*2})}}return e}createSceneNode(e,t,n){const i=new zi(1,1,1),r=n?4886754:8947848,a=new Za({color:r,opacity:n?.8:.5,transparent:!0,metalness:.1,roughness:.7}),o=new dt(i,a);return o.position.set(t.x,t.y,t.z),o.userData={sceneId:e.id,sceneName:e.name},o.userData.onClick=()=>{this.onSceneClick&&this.onSceneClick(this.museumId,e.id)},n&&(o.userData.isCurrent=!0,o.scale.set(1.2,1.2,1.2)),o}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}updateCurrentScene(e){this.currentSceneId=e,this.generateNodes()}updateScenes(e,t){this.scenes=e,this.currentSceneId=t,this.generateNodes()}setOnSceneClick(e){this.onSceneClick=e}handleClick(e){const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new cs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(a.length>0){const o=a[0].object,l=o.userData.sceneId;en({type:"focus",museumId:this.museumId,sceneId:l,source:"dollhouse",ts:Date.now()}),o.userData.onClick&&o.userData.onClick()}}handleMouseMove(e){const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new cs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(this.sceneNodes.forEach(o=>{const l=o.material;o.userData.isCurrent||(l.opacity=.5)}),a.length>0){const o=a[0].object,l=o.material,c=o.userData.sceneId;o.userData.isCurrent||(l.opacity=.7),this.hoveredSceneId!==c&&(this.hoveredSceneId=c,en({type:"hover",museumId:this.museumId,sceneId:c,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="pointer"}else this.hoveredSceneId!==null&&(this.hoveredSceneId=null,en({type:"hover",museumId:this.museumId,sceneId:null,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="default"}getDomElement(){return this.renderer.domElement}dispose(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.sceneNodes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.sceneNodes.clear(),this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.controls&&this.controls.dispose()}}class S0{constructor(e){v(this,"element");v(this,"museum");v(this,"scenes");v(this,"currentSceneId");v(this,"onClose");v(this,"container");v(this,"dollhouseScene",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-dollhouse-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-dollhouse-header";const t=document.createElement("div");t.className="vr-dollhouse-title",t.textContent="三维图";const n=document.createElement("button");n.className="vr-btn vr-dollhouse-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(n),this.container=document.createElement("div"),this.container.className="vr-dollhouse-container";const i=document.createElement("div");i.className="vr-dollhouse-body",i.appendChild(this.container),this.element.appendChild(e),this.element.appendChild(i),this.initDollhouseScene()}initDollhouseScene(){this.dollhouseScene&&this.dollhouseScene.dispose(),this.dollhouseScene=new E0(this.container,this.museum.id,this.scenes,this.currentSceneId,(t,n)=>{Qt(t,n),this.onClose&&this.onClose()},this.museum);const e=this.dollhouseScene.getDomElement();e.addEventListener("click",t=>{var n;(n=this.dollhouseScene)==null||n.handleClick(t)}),e.addEventListener("mousemove",t=>{var n;(n=this.dollhouseScene)==null||n.handleMouseMove(t)})}updateCurrentScene(e){this.currentSceneId=e,this.dollhouseScene&&this.dollhouseScene.updateCurrentScene(e)}updateMuseum(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.dollhouseScene?this.dollhouseScene.updateScenes(t,n):this.initDollhouseScene()}getElement(){return this.element}remove(){this.dollhouseScene&&(this.dollhouseScene.dispose(),this.dollhouseScene=null),this.element.remove()}}class M0{constructor(e){v(this,"element");v(this,"currentTab");v(this,"sceneId");v(this,"sceneName");v(this,"museum");v(this,"scenes");v(this,"currentSceneId");v(this,"communityPanel",null);v(this,"mapPanel",null);v(this,"dollhousePanel",null);v(this,"unsubscribeInteracting",null);v(this,"unsubscribeIdle",null);v(this,"unsubscribeUIEngaged",null);v(this,"handleClosePanels");this.currentTab=e.initialTab,this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId||e.sceneId,this.element=document.createElement("div"),this.element.className="vr-panl vr-glass hidden",this.render(),this.setupInteractionListeners(),this.handleClosePanels=()=>{this.closeAllPanels()},window.addEventListener("vr:close-panels",this.handleClosePanels)}setupInteractionListeners(){this.element.addEventListener("click",e=>{it.emitUIEngaged()},!0)}render(){if(this.element.classList.remove("vr-panel--community","vr-panel--map","vr-panel--dollhouse"),!this.currentTab){this.element.classList.add("hidden"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null);return}if(this.currentTab==="community"){this.element.classList.add("vr-panel--community"),this.element.innerHTML="";const e=this.sceneId||"unknown";this.communityPanel?this.communityPanel.setScene(e,this.sceneName):this.communityPanel=new x0({sceneId:e,sceneName:this.sceneName,onClose:()=>{this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.element.classList.add("hidden"),this.element.innerHTML=""}}),this.element.appendChild(this.communityPanel.getElement());return}if(this.currentTab==="map"){if(this.element.classList.add("vr-panel--map"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.museum&&this.scenes&&this.scenes.length>0){const e=this.currentSceneId||this.sceneId||this.scenes[0].id;this.mapPanel?this.mapPanel.updateCurrentScene(e):this.mapPanel=new b0({museum:this.museum,scenes:this.scenes,currentSceneId:e,onClose:()=>{window.dispatchEvent(new CustomEvent("vr:close-panels"))}}),this.element.appendChild(this.mapPanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">平面图</div>
          <div class="vr-panel-body">此展馆暂无平面图</div>
        `;return}if(this.currentTab==="dollhouse"){if(this.element.classList.add("vr-panel--dollhouse"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.museum&&this.scenes&&this.scenes.length>0){const e=this.currentSceneId||this.sceneId||this.scenes[0].id;this.dollhousePanel?this.dollhousePanel.updateCurrentScene(e):this.dollhousePanel=new S0({museum:this.museum,scenes:this.scenes,currentSceneId:e,onClose:()=>{window.dispatchEvent(new CustomEvent("vr:close-panels"))}}),this.element.appendChild(this.dollhousePanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">三维图</div>
          <div class="vr-panel-body">此展馆暂无三维图</div>
        `;return}this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.classList.add("hidden"),this.element.innerHTML=""}setSceneContext(e,t){this.sceneId=e,this.sceneName=t,this.currentSceneId=e,this.currentTab==="community"&&this.communityPanel&&this.communityPanel.setScene(e,t),this.currentTab==="map"&&this.mapPanel&&this.mapPanel.updateCurrentScene(e),this.currentTab==="dollhouse"&&this.dollhousePanel&&this.dollhousePanel.updateCurrentScene(e)}setMuseumContext(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.currentTab==="map"&&this.mapPanel?this.mapPanel.updateMuseum(e,t,n):this.currentTab==="map"&&this.render(),this.currentTab==="dollhouse"&&this.dollhousePanel?this.dollhousePanel.updateMuseum(e,t,n):this.currentTab==="dollhouse"&&this.render()}setVisible(e){this.element.classList.remove("hidden","visible"),this.element.classList.add(e?"visible":"hidden")}setTab(e){this.currentTab=e,this.setVisible(!1),window.setTimeout(()=>{this.render(),this.setVisible(!0)},40)}closeAllPanels(){this.currentTab=null,this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.classList.add("hidden"),this.element.innerHTML=""}getElement(){return this.element}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.handleClosePanels&&(window.removeEventListener("vr:close-panels",this.handleClosePanels),this.handleClosePanels=void 0),this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.remove()}}function w0(){var s;return!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||document.querySelector(".fcchat-root")&&((s=document.querySelector(".fcchat-root"))==null?void 0:s.style.display)==="flex")}function Mc(){w0()?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}function vr(s){const{title:e,contentEl:t,contentHtml:n,onClose:i,panelClassName:r}=s,a=document.createElement("div");a.className="vr-modal-overlay";const o=document.createElement("div");o.className="vr-modal-panel",r&&o.classList.add(r);const l=document.createElement("div");l.className="vr-modal-header";const c=document.createElement("div");c.className="vr-modal-header-title",c.textContent=e;const d=document.createElement("button");d.className="vr-modal-header-close vr-icon-btn",d.type="button",d.setAttribute("aria-label","关闭弹窗"),d.innerHTML="×",l.appendChild(c),l.appendChild(d);const h=document.createElement("div");h.className="vr-modal-body",t?h.appendChild(t):n&&(h.innerHTML=n),o.appendChild(l),o.appendChild(h),a.appendChild(o),document.body.appendChild(a),Mc(),r==="vr-modal-settings"&&(document.documentElement.classList.add("vr-more-open"),requestAnimationFrame(()=>{o.classList.add("is-in")}));let p=!1;const f=u=>{u.key==="Escape"&&(u.stopPropagation(),m.close())},_=u=>{u.target===a&&m.close()},g=u=>{u.preventDefault(),u.stopPropagation(),m.close()};window.addEventListener("keydown",f),a.addEventListener("click",_),d.addEventListener("click",g);const m={close:()=>{if(!p&&(p=!0,window.removeEventListener("keydown",f),a.removeEventListener("click",_),d.removeEventListener("click",g),a.parentNode&&a.parentNode.removeChild(a),r==="vr-modal-settings"&&document.documentElement.classList.remove("vr-more-open"),Mc(),i))try{i()}catch{}}};return m}function ka(s){return{guide:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',community:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',more:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg>',search:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',"arrow-right":'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}[s]||""}const T0=[{key:"guide",label:"导览"},{key:"community",label:"社区"},{key:"info",label:"信息"},{key:"settings",label:"更多"}];class A0{constructor(e={}){v(this,"element");v(this,"dockEl");v(this,"panels");v(this,"activeTabs");v(this,"onOpenInfo");v(this,"onOpenSettings");v(this,"unsubscribeInteracting",null);v(this,"unsubscribeIdle",null);v(this,"unsubscribeUIEngaged",null);v(this,"handleDockTabOpen");v(this,"handleDockTabClose");v(this,"handleClosePanels");this.activeTabs=new Set,this.onOpenInfo=e.onOpenInfo,this.onOpenSettings=e.onOpenSettings,this.element=document.createElement("div"),this.element.className="vr-dock-wrap",this.panels=new M0({initialTab:e.initialTab||"guide",sceneId:e.sceneId,sceneName:e.sceneName,museum:e.museum,scenes:e.scenes,currentSceneId:e.currentSceneId||e.sceneId}),this.panels.setVisible(!0),this.dockEl=document.createElement("div"),this.dockEl.className="vr-dock vr-glass";for(const t of T0){const n=document.createElement("button");n.className="vr-btn vr-dock-tab",n.setAttribute("data-tab",t.key);const i=t.key==="guide"?"guide":t.key==="community"?"community":t.key==="info"?"info":"more";n.innerHTML=`<span class="vr-dock-tab-icon">${ka(i)}</span><div class="vr-dock-tab-label">${t.label}</div>`,n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),it.emitUIEngaged(),t.key==="guide"?(this.setTabActive("guide",!0),e.onGuideClick&&e.onGuideClick()):t.key==="community"?(this.setTabActive("community",!0),this.panels.setTab("community")):t.key==="info"?(this.setTabActive("info",!0),this.onOpenInfo?this.onOpenInfo():this.openFallbackInfoModal()):t.key==="settings"&&(this.setTabActive("settings",!0),this.onOpenSettings?this.onOpenSettings():this.openFallbackSettingsModal())}),this.dockEl.appendChild(n)}this.element.appendChild(this.panels.getElement()),this.element.appendChild(this.dockEl),this.syncActiveClass(),this.setupInteractionListeners(),this.setupDockEventListeners()}setupInteractionListeners(){}syncActiveClass(){this.dockEl.querySelectorAll(".vr-dock-tab").forEach(t=>{const n=t.getAttribute("data-tab");n&&this.activeTabs.has(n)?t.classList.add("active"):t.classList.remove("active")})}setTabActive(e,t){t?this.activeTabs.add(e):this.activeTabs.delete(e),this.syncActiveClass(),t&&(e==="community"||e==="map"||e==="dollhouse")&&this.panels.setTab(e)}isTabActive(e){return this.activeTabs.has(e)}setupDockEventListeners(){this.handleDockTabOpen=e=>{var n;const t=e;(n=t.detail)!=null&&n.tab&&this.setTabActive(t.detail.tab,!0)},this.handleDockTabClose=e=>{var n;const t=e;(n=t.detail)!=null&&n.tab&&this.setTabActive(t.detail.tab,!1)},this.handleClosePanels=()=>{this.setTabActive("community",!1),this.setTabActive("map",!1),this.setTabActive("dollhouse",!1)},window.addEventListener("vr:dock-tab-open",this.handleDockTabOpen),window.addEventListener("vr:dock-tab-close",this.handleDockTabClose),window.addEventListener("vr:close-panels",this.handleClosePanels)}setSceneContext(e,t){this.panels.setSceneContext(e,t)}setMuseumContext(e,t,n){this.panels.setMuseumContext(e,t,n)}getElement(){return this.element}setMoreOpen(e){e?this.element.classList.add("dock--more-open"):this.element.classList.remove("dock--more-open")}openFallbackInfoModal(){vr({title:"信息",contentHtml:`
        <div class="vr-modal-info-list">
          <div><span class="vr-modal-info-row-label">馆：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">场景：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">采集于</span><span> 2025-12-27</span></div>
        </div>
      `})}openFallbackSettingsModal(){vr({title:"设置",contentHtml:`
        <div class="vr-modal-settings-list">
          <div>此版本暂未接入设置功能。</div>
        </div>
      `})}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.handleDockTabOpen&&(window.removeEventListener("vr:dock-tab-open",this.handleDockTabOpen),this.handleDockTabOpen=void 0),this.handleDockTabClose&&(window.removeEventListener("vr:dock-tab-close",this.handleDockTabClose),this.handleDockTabClose=void 0),this.handleClosePanels&&(window.removeEventListener("vr:close-panels",this.handleClosePanels),this.handleClosePanels=void 0),this.panels.remove(),this.element.remove()}}const wc="data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1F2933"/>
          <stop offset="1" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" fill="rgba(255,255,255,0.72)" font-size="20" text-anchor="middle" font-family="system-ui,-apple-system,BlinkMacSystemFont,&apos;Segoe UI&apos;,sans-serif">
        暂无封面
      </text>
    </svg>`);class C0{constructor(e){v(this,"element");v(this,"isOpen",!1);v(this,"museumId");v(this,"currentSceneId");v(this,"scenes");v(this,"filteredScenes");v(this,"listEl",null);v(this,"previewImgEl",null);v(this,"previewTitleEl",null);v(this,"previewIdEl",null);v(this,"searchInputEl",null);v(this,"hoveredSceneId",null);v(this,"selectedSceneId",null);v(this,"onClose");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.filteredScenes=e.scenes,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-guide-drawer";const t=document.createElement("div");t.className="vr-guide-mask";const n=document.createElement("div");n.className="vr-guide-panel";const i=document.createElement("div");i.className="vr-guide-header";const r=document.createElement("div");r.className="vr-guide-header-left";const a=document.createElement("div");a.className="vr-guide-title",a.textContent="导览";const o=document.createElement("button");o.className="vr-btn vr-guide-close",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),this.close()}),i.appendChild(r),i.appendChild(a),i.appendChild(o);const l=document.createElement("div");l.className="vr-guide-search";const c=document.createElement("span");c.className="vr-guide-search-icon",c.innerHTML=ka("search");const d=document.createElement("input");d.className="vr-guide-search-input",d.type="search",d.placeholder="查找场景",l.appendChild(c),l.appendChild(d),this.searchInputEl=d;const h=document.createElement("div");h.className="vr-guide-body";const p=document.createElement("div");p.className="vr-guide-list",this.listEl=p;const f=document.createElement("div");f.className="vr-guide-preview";const _=document.createElement("img");_.className="vr-guide-preview-image",_.referrerPolicy="no-referrer",_.crossOrigin="anonymous",_.decoding="async",_.loading="lazy",this.previewImgEl=_;const g=document.createElement("div");g.className="vr-guide-preview-title",this.previewTitleEl=g;const m=document.createElement("div");m.className="vr-guide-preview-id",this.previewIdEl=m;const u=document.createElement("button");u.className="vr-btn vr-guide-preview-enter",u.innerHTML=`<span class="vr-guide-enter-icon">${ka("arrow-right")}</span><span>前往</span>`,u.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation();const y=this.selectedSceneId||this.currentSceneId;y&&y!==this.currentSceneId?(Qt(this.museumId,y),this.close()):y===this.currentSceneId&&this.close()}),f.appendChild(_),f.appendChild(g),f.appendChild(m),f.appendChild(u),h.appendChild(p),h.appendChild(f),t.addEventListener("click",()=>this.close()),n.addEventListener("click",b=>b.stopPropagation()),n.appendChild(i),n.appendChild(l),n.appendChild(h),this.element.appendChild(t),this.element.appendChild(n),this.bindSearch(),this.renderList(),this.updatePreview()}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"),this.updateOverlayState(),this.selectedSceneId||(this.selectedSceneId=this.currentSceneId),this.updateActiveState(),this.updatePreview())}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"),this.updateOverlayState(),(e=this.onClose)==null||e.call(this))}updateOverlayState(){var t;!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")&&this.isOpen||document.querySelector(".fcchat-root")&&((t=document.querySelector(".fcchat-root"))==null?void 0:t.style.display)==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}setCurrentScene(e){this.currentSceneId=e,this.updateActiveState(),this.updatePreview()}bindSearch(){this.searchInputEl&&this.searchInputEl.addEventListener("input",()=>{var t;const e=(((t=this.searchInputEl)==null?void 0:t.value)||"").trim().toLowerCase();e?this.filteredScenes=this.scenes.filter(n=>(n.name||"").toLowerCase().includes(e)||n.id.toLowerCase().includes(e)):this.filteredScenes=this.scenes,this.renderList(),this.updatePreview()})}renderList(){if(this.listEl){this.listEl.innerHTML="";for(const e of this.filteredScenes){const t=document.createElement("div");t.className="vr-guide-item",t.setAttribute("data-scene-id",e.id),e.id===this.currentSceneId&&t.classList.add("active");const n=document.createElement("img");n.className="vr-guide-thumb",n.referrerPolicy="no-referrer",n.crossOrigin="anonymous",n.decoding="async",n.loading="lazy";const i=e.thumb?Vi(e.thumb):wc;n.src=i,n.alt=e.name||e.id;const r=document.createElement("div");r.className="vr-guide-meta";const a=document.createElement("div");a.className="vr-guide-name",a.textContent=e.name||e.id;const o=document.createElement("div");o.className="vr-guide-id",o.textContent=e.id,r.appendChild(a),r.appendChild(o),t.appendChild(n),t.appendChild(r),t.addEventListener("mouseenter",()=>{this.hoveredSceneId=e.id,this.updatePreview()}),t.addEventListener("mouseleave",()=>{this.hoveredSceneId=null,this.updatePreview()}),t.addEventListener("click",l=>{var c;l.preventDefault(),l.stopPropagation(),this.selectedSceneId=e.id,(c=this.listEl)==null||c.querySelectorAll(".vr-guide-item").forEach(d=>{d.classList.remove("selected")}),t.classList.add("selected"),this.updatePreview()}),this.listEl.appendChild(t)}}}updateActiveState(){this.listEl&&this.listEl.querySelectorAll(".vr-guide-item").forEach(e=>{const n=e.getAttribute("data-scene-id")===this.currentSceneId;e.classList.toggle("active",n),n&&!this.selectedSceneId&&(this.selectedSceneId=this.currentSceneId,e.classList.add("selected"))})}updatePreview(){if(!this.previewImgEl||!this.previewTitleEl||!this.previewIdEl)return;const e=this.selectedSceneId||this.hoveredSceneId||this.currentSceneId,t=this.scenes.find(i=>i.id===e)||this.scenes[0];if(!t)return;const n=t.thumb?Vi(t.thumb):wc;this.previewImgEl.src=n,this.previewImgEl.alt=t.name||t.id,this.previewTitleEl.textContent=t.name||t.id,this.previewIdEl.textContent=t.id}}class I0{constructor(e){v(this,"element");v(this,"scrollEl");v(this,"museumId");v(this,"currentSceneId");v(this,"scenes");v(this,"onSceneClick");v(this,"onMoreClick");v(this,"onClose");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.onSceneClick=e.onSceneClick,this.onMoreClick=e.onMoreClick,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-guidetray";const t=document.createElement("div");t.className="vr-guidetray-header";const n=document.createElement("button");n.className="vr-btn vr-guidetray-more",n.textContent="更多",n.addEventListener("click",r=>{var a;r.preventDefault(),r.stopPropagation(),(a=this.onMoreClick)==null||a.call(this)});const i=document.createElement("button");i.className="vr-btn vr-guidetray-close",i.textContent="×",i.setAttribute("aria-label","关闭"),i.addEventListener("click",r=>{var a;r.preventDefault(),r.stopPropagation(),(a=this.onClose)==null||a.call(this)}),t.appendChild(n),t.appendChild(i),this.scrollEl=document.createElement("div"),this.scrollEl.className="vr-guidetray-scroll",this.element.appendChild(t),this.element.appendChild(this.scrollEl),this.render()}render(){this.scrollEl.innerHTML="",this.scenes.forEach(t=>{const n=document.createElement("div");n.className="vr-guidetray-item",n.setAttribute("data-scene-id",t.id),t.id===this.currentSceneId&&n.classList.add("is-current");const i=document.createElement("img");i.className="vr-guidetray-item-thumb",i.referrerPolicy="no-referrer",i.crossOrigin="anonymous",i.decoding="async",i.loading="lazy";const r=t.thumb?zt(t.thumb,Ht.THUMB):void 0;r&&(i.src=Vi(r)),i.alt=t.name;const a=document.createElement("div");a.className="vr-guidetray-item-title",a.textContent=t.name,n.appendChild(i),n.appendChild(a),n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),this.onSceneClick&&this.onSceneClick(t.id)}),this.scrollEl.appendChild(n)});const e=document.createElement("div");e.className="vr-guidetray-item vr-guidetray-item-more",e.innerHTML=`
      <div class="vr-guidetray-item-thumb vr-guidetray-more-icon">+</div>
      <div class="vr-guidetray-item-title">更多</div>
    `,e.addEventListener("click",t=>{var n;t.preventDefault(),t.stopPropagation(),(n=this.onMoreClick)==null||n.call(this)}),this.scrollEl.appendChild(e)}updateCurrentScene(e){this.currentSceneId=e,this.scrollEl.querySelectorAll(".vr-guidetray-item").forEach(t=>{const n=t;n.getAttribute("data-scene-id")===e?n.classList.add("is-current"):n.classList.remove("is-current")})}setVisible(e){this.element.classList.toggle("visible",e)}getElement(){return this.element}remove(){this.element.remove()}}class L0{constructor(e={}){v(this,"element");v(this,"currentMode");v(this,"onModeChange");this.currentMode=e.initialMode||"tour",this.onModeChange=e.onModeChange,this.element=document.createElement("div"),this.element.className="vr-topmodes",[{key:"tour",label:"漫游"},{key:"structure2d",label:"结构图"},{key:"structure3d",label:"三维模型"}].forEach(n=>{const i=document.createElement("button");i.className="vr-topmodes__btn",i.textContent=n.label,i.setAttribute("data-mode",n.key),n.key===this.currentMode&&i.classList.add("is-active"),i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.setMode(n.key)}),this.element.appendChild(i)}),this.syncActiveState()}syncActiveState(){this.element.querySelectorAll(".vr-topmodes__btn").forEach(e=>{const t=e.getAttribute("data-mode");e.classList.toggle("is-active",t===this.currentMode)})}setMode(e){this.currentMode!==e&&(this.currentMode=e,this.syncActiveState(),this.onModeChange&&this.onModeChange(e))}getMode(){return this.currentMode}getElement(){return this.element}}const R0={iterations:300,width:1e3,height:1e3,padding:40,repulsion:.15,spring:.12,damping:.88};function kd(s,e,t){const n={...R0,...t},i=s.length;if(i===0)return{};const r={},a=Math.max(1,Math.sqrt(i)*.5);s.forEach((c,d)=>{const h=2*Math.PI*d/i,p=(Math.random()-.5)*.2;r[c.id]={x:a*Math.cos(h)+p,y:a*Math.sin(h)+p,vx:0,vy:0}});const o=e.length>0?e:s.length>1?s.slice(0,-1).map((c,d)=>({from:c.id,to:s[d+1].id})):[];for(let c=0;c<n.iterations;c++){for(let d=0;d<i;d++){const h=s[d],p=r[h.id];for(let f=d+1;f<i;f++){const _=s[f],g=r[_.id];let m=p.x-g.x,u=p.y-g.y;const b=m*m+u*u||1e-4,y=n.repulsion/b;m*=y,u*=y,p.vx+=m,p.vy+=u,g.vx-=m,g.vy-=u}}for(const d of o){const h=r[d.from],p=r[d.to];if(!h||!p)continue;const f=p.x-h.x,_=p.y-h.y,g=Math.sqrt(f*f+_*_)||1e-4,u=n.spring*(g-1),b=f/g*u,y=_/g*u;h.vx+=b,h.vy+=y,p.vx-=b,p.vy-=y}for(const d in r){const h=r[d];h.vx*=n.damping,h.vy*=n.damping,h.x+=h.vx*.1,h.y+=h.vy*.1}}const l={};for(const c in r)l[c]={x:r[c].x,y:r[c].y};return P0(l,n.width,n.height,n.padding)}function P0(s,e,t,n){const i=Object.entries(s);if(i.length===0)return{};let r=1/0,a=-1/0,o=1/0,l=-1/0;for(const[,u]of i)r=Math.min(r,u.x),a=Math.max(a,u.x),o=Math.min(o,u.y),l=Math.max(l,u.y);const c=a-r||1,d=l-o||1,h=e-2*n,p=t-2*n,f=h/c,_=p/d,g=Math.min(f,_),m={};for(const[u,b]of i)m[u]={x:n+(b.x-r)*g+(h-c*g)/2,y:n+(b.y-o)*g+(p-d*g)/2};return m}function Fd(s){const e=s.filter(h=>h.mapPoint);if(e.length<s.length)return!0;if(e.length<2)return!1;const t=e.map(h=>h.mapPoint.x),n=e.map(h=>h.mapPoint.y),i=Math.min(...t),r=Math.max(...t),a=Math.min(...n),o=Math.max(...n),l=r-i,c=o-a,d=100;return l<d||c<d}class N0{constructor(e){v(this,"element");v(this,"canvasContainer");v(this,"svg");v(this,"floorplanImg",null);v(this,"statusEl",null);v(this,"toggleBtn",null);v(this,"museum");v(this,"graph");v(this,"currentSceneId");v(this,"onClose");v(this,"onNodeClick");v(this,"layout",{});v(this,"mode","graph");v(this,"hasFloorplan",!1);var t;this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.onNodeClick=e.onNodeClick,this.hasFloorplan=!!((t=this.museum.map)!=null&&t.image),this.mode=this.hasFloorplan?"floorplan":"graph",this.element=document.createElement("div"),this.element.className="vr-structure2d-overlay",this.render(),this.bindEvents()}render(){var r;const e=document.createElement("div");e.className="vr-structure2d-header";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";const n=document.createElement("div");n.className="vr-structure2d-title",n.textContent="结构图",this.statusEl=document.createElement("div"),this.statusEl.className="vr-structure2d-status",this.updateStatusText(),t.appendChild(n),t.appendChild(this.statusEl),this.hasFloorplan&&(this.toggleBtn=document.createElement("button"),this.toggleBtn.className="vr-btn vr-structure2d-toggle",this.toggleBtn.textContent=this.mode==="floorplan"?"结构图":"平面图",this.toggleBtn.addEventListener("click",()=>{this.mode=this.mode==="floorplan"?"graph":"floorplan",this.toggleBtn.textContent=this.mode==="floorplan"?"结构图":"平面图",this.updateStatusText(),this.renderContent()}),e.appendChild(this.toggleBtn));const i=document.createElement("button");if(i.className="vr-btn vr-structure2d-close",i.innerHTML="✕",i.setAttribute("aria-label","关闭"),i.addEventListener("click",()=>{this.close()}),e.appendChild(t),e.appendChild(i),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="vr-structure2d-canvas",this.svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svg.setAttribute("width","100%"),this.svg.setAttribute("height","100%"),this.svg.setAttribute("class","vr-structure2d-svg"),this.canvasContainer.appendChild(this.svg),this.hasFloorplan&&((r=this.museum.map)!=null&&r.image)){const a=zt(this.museum.map.image,Ht.MAP);a&&(this.floorplanImg=document.createElement("img"),this.floorplanImg.className="vr-structure2d-floorplan",this.floorplanImg.src=a,this.floorplanImg.style.display="none",this.canvasContainer.appendChild(this.floorplanImg),this.floorplanImg.onload=()=>{this.mode==="floorplan"&&this.renderContent()})}this.element.appendChild(e),this.element.appendChild(this.canvasContainer),this.computeLayout(),this.renderContent()}updateStatusText(){if(!this.statusEl)return;const e=this.graph.nodes.length;this.statusEl.textContent=`mode: ${this.mode}, nodes: ${e}`}renderContent(){this.mode==="floorplan"?this.renderFloorplan():this.renderGraph()}computeLayout(){var i,r;const e=((i=this.museum.map)==null?void 0:i.width)||1e3,t=((r=this.museum.map)==null?void 0:r.height)||600;if(Fd(this.graph.nodes))this.layout=kd(this.graph.nodes,this.graph.edges,{width:e,height:t,iterations:300,padding:40});else{this.layout={};for(const a of this.graph.nodes)a.mapPoint&&(this.layout[a.id]={x:a.mapPoint.x,y:a.mapPoint.y})}}renderFloorplan(){var i,r;this.svg&&(this.svg.style.display="none"),this.floorplanImg&&(this.floorplanImg.style.display="block"),this.svg.innerHTML="",this.svg.style.display="block",this.svg.style.position="absolute",this.svg.style.top="0",this.svg.style.left="0",this.svg.style.pointerEvents="none";const e=((i=this.museum.map)==null?void 0:i.width)||1e3,t=((r=this.museum.map)==null?void 0:r.height)||600;this.svg.setAttribute("viewBox",`0 0 ${e} ${t}`),this.svg.style.pointerEvents="auto";const n=document.createElementNS("http://www.w3.org/2000/svg","g");n.setAttribute("class","vr-structure2d-nodes");for(const a of this.graph.nodes){const o=this.layout[a.id];if(!o)continue;const l=a.id===this.currentSceneId,c=document.createElementNS("http://www.w3.org/2000/svg","g");c.setAttribute("class",`vr-structure2d-node ${l?"is-current":""}`),c.setAttribute("data-scene-id",a.id),c.style.cursor="pointer";const d=document.createElementNS("http://www.w3.org/2000/svg","circle");d.setAttribute("cx",o.x.toString()),d.setAttribute("cy",o.y.toString()),d.setAttribute("r",l?"12":"8"),d.setAttribute("class","vr-structure2d-node-circle");const h=document.createElementNS("http://www.w3.org/2000/svg","text");h.setAttribute("x",o.x.toString()),h.setAttribute("y",(o.y+(l?25:20)).toString()),h.setAttribute("class","vr-structure2d-node-label"),h.setAttribute("text-anchor","middle"),h.textContent=a.name,c.appendChild(d),c.appendChild(h),n.appendChild(c),c.addEventListener("click",()=>{this.onNodeClick&&this.onNodeClick(this.museum.id,a.id)})}this.svg.appendChild(n)}renderGraph(){var r,a;this.floorplanImg&&(this.floorplanImg.style.display="none"),this.svg&&(this.svg.style.display="block",this.svg.style.position="",this.svg.style.pointerEvents="auto"),this.svg.innerHTML="";const e=((r=this.museum.map)==null?void 0:r.width)||1e3,t=((a=this.museum.map)==null?void 0:a.height)||600;this.svg.setAttribute("viewBox",`0 0 ${e} ${t}`);const n=document.createElementNS("http://www.w3.org/2000/svg","g");n.setAttribute("class","vr-structure2d-edges");for(const o of this.graph.edges){const l=this.layout[o.from],c=this.layout[o.to];if(!l||!c)continue;const d=document.createElementNS("http://www.w3.org/2000/svg","line");d.setAttribute("x1",l.x.toString()),d.setAttribute("y1",l.y.toString()),d.setAttribute("x2",c.x.toString()),d.setAttribute("y2",c.y.toString()),d.setAttribute("class","vr-structure2d-edge"),n.appendChild(d)}this.svg.appendChild(n);const i=document.createElementNS("http://www.w3.org/2000/svg","g");i.setAttribute("class","vr-structure2d-nodes");for(const o of this.graph.nodes){const l=this.layout[o.id];if(!l)continue;const c=o.id===this.currentSceneId,d=document.createElementNS("http://www.w3.org/2000/svg","g");d.setAttribute("class",`vr-structure2d-node ${c?"is-current":""}`),d.setAttribute("data-scene-id",o.id),d.style.cursor="pointer";const h=document.createElementNS("http://www.w3.org/2000/svg","circle");h.setAttribute("cx",l.x.toString()),h.setAttribute("cy",l.y.toString()),h.setAttribute("r",c?"12":"8"),h.setAttribute("class","vr-structure2d-node-circle");const p=document.createElementNS("http://www.w3.org/2000/svg","text");p.setAttribute("x",l.x.toString()),p.setAttribute("y",(l.y+(c?25:20)).toString()),p.setAttribute("class","vr-structure2d-node-label"),p.setAttribute("text-anchor","middle"),p.textContent=o.name,d.appendChild(h),d.appendChild(p),i.appendChild(d),d.addEventListener("click",()=>{this.onNodeClick&&this.onNodeClick(this.museum.id,o.id)})}this.svg.appendChild(i)}bindEvents(){const e=t=>{t.key==="Escape"&&this.close()};document.addEventListener("keydown",e),this.element.addEventListener("vr:cleanup",()=>{document.removeEventListener("keydown",e)})}updateContext(e){var t;this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.hasFloorplan=!!((t=this.museum.map)!=null&&t.image),this.computeLayout(),this.updateStatusText(),this.renderContent()}open(){this.element.classList.add("is-visible")}close(){this.element.classList.remove("is-visible"),this.onClose&&this.onClose()}getElement(){return this.element}remove(){this.element.remove()}}function Tc(s,e){var r;const t=s.scenes.map(a=>({id:a.id,name:a.name,scene:a,mapPoint:a.mapPoint,initialView:a.initialView})),n=new Set(t.map(a=>a.id)),i=[];for(const a of s.scenes)for(const o of a.hotspots){if(o.type!=="scene"||!((r=o.target)!=null&&r.sceneId))continue;const l=o.target.museumId??s.id,c=o.target.sceneId;l!==s.id||!n.has(c)||i.some(h=>h.from===a.id&&h.to===c)||i.push({from:a.id,to:c})}return{nodes:t,edges:i,currentNodeId:e&&n.has(e)?e:void 0}}function D0(s,e){let t=0;for(const n of s.edges)(n.from===e||n.to===e)&&t++;return t}class U0{constructor(e){v(this,"element");v(this,"container");v(this,"scene",null);v(this,"camera",null);v(this,"renderer",null);v(this,"controls");v(this,"museum");v(this,"graph");v(this,"currentSceneId");v(this,"onClose");v(this,"onNodeClick");v(this,"animationId",null);v(this,"sceneNodes",new Map);v(this,"edgeLines",[]);v(this,"hoveredSceneId",null);v(this,"resizeObserver",null);v(this,"statusEl",null);v(this,"webglErrorEl",null);v(this,"modelErrorEl",null);v(this,"modelGroup",null);v(this,"modelLoaded",!1);v(this,"animate",()=>{if(!this.renderer||!this.scene||!this.camera)return;this.animationId=requestAnimationFrame(this.animate),this.controls&&this.controls.update();const e=Date.now()*.001;this.sceneNodes.forEach(t=>{if(t.userData.isCurrent){const n=Math.sin(e*2)*.1+1;t.scale.set(n*1.2,n*1.2,n*1.2);const i=t.material;i.opacity=.7+Math.sin(e*2)*.2}}),this.renderer.render(this.scene,this.camera)});this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.onNodeClick=e.onNodeClick,this.element=document.createElement("div"),this.element.className="vr-structure3d-overlay",this.container=document.createElement("div"),this.container.className="vr-structure3d-canvas",this.render(),this.init3D().then(()=>{this.bindEvents()})}render(){const e=document.createElement("div");e.className="vr-structure3d-header";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";const n=document.createElement("div");n.className="vr-structure3d-title",n.textContent="三维模型",this.statusEl=document.createElement("div"),this.statusEl.className="vr-structure3d-status",this.updateStatusText(),t.appendChild(n),t.appendChild(this.statusEl);const i=document.createElement("button");i.className="vr-btn vr-structure3d-close",i.innerHTML="✕",i.setAttribute("aria-label","关闭"),i.addEventListener("click",()=>{this.close()}),e.appendChild(t),e.appendChild(i),this.webglErrorEl=document.createElement("div"),this.webglErrorEl.className="vr-structure3d-webgl-error",this.webglErrorEl.style.display="none",this.webglErrorEl.innerHTML=`
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">WebGL 不可用</div>
        <div style="font-size: 13px; opacity: 0.8;">请尝试更换浏览器或设备</div>
      </div>
    `,this.modelErrorEl=document.createElement("div"),this.modelErrorEl.className="vr-structure3d-model-error",this.modelErrorEl.style.display="none",this.modelErrorEl.innerHTML=`
      <div style="text-align: center; padding: 40px 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: rgba(255,200,100,0.95);">模型加载失败</div>
        <div style="font-size: 13px; opacity: 0.8;">请检查 URL 或网络连接</div>
      </div>
    `,this.element.appendChild(e),this.element.appendChild(this.container),this.element.appendChild(this.webglErrorEl),this.element.appendChild(this.modelErrorEl)}updateStatusText(){var a,o,l;if(!this.statusEl)return;const e=this.graph.nodes.length,t=this.graph.edges.length,n=((a=this.container)==null?void 0:a.clientWidth)||0,i=((o=this.container)==null?void 0:o.clientHeight)||0,r=this.modelLoaded?"loaded":(l=this.museum.dollhouse)!=null&&l.modelUrl?"loading":"none";e===0?(this.statusEl.textContent=`model: ${r}, No nodes (check museum.scenes)`,this.statusEl.style.color="rgba(255,200,100,0.9)"):(this.statusEl.textContent=`model: ${r}, nodes: ${e}, edges: ${t}, size: ${n}x${i}`,this.statusEl.style.color="rgba(255,255,255,0.65)")}async init3D(){var e;try{this.scene=new Xa,this.scene.background=null;const t=this.container.clientWidth>0?this.container.clientWidth/this.container.clientHeight:window.innerWidth/window.innerHeight;this.camera=new Ct(60,t,.1,1e3),this.camera.position.set(0,12,18),this.camera.lookAt(0,0,0);try{this.renderer=new Sr({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement)}catch{this.webglErrorEl&&(this.webglErrorEl.style.display="block");return}try{const{OrbitControls:r}=await Di(async()=>{const{OrbitControls:a}=await import("./OrbitControls-DSUWnEEy.js");return{OrbitControls:a}},[],import.meta.url);this.controls=new r(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=3,this.controls.maxDistance=50,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.minPolarAngle=Math.PI/6,this.controls.target.set(0,0,0)}catch{}const n=new fd(16777215,.6);this.scene.add(n);const i=new pd(16777215,.4);i.position.set(5,10,5),this.scene.add(i),this.modelGroup=new Li,this.scene.add(this.modelGroup),(e=this.museum.dollhouse)!=null&&e.modelUrl?this.loadModel():this.generateGraph(),this.setupResizeObserver(),this.updateStatusText()}catch{this.webglErrorEl&&(this.webglErrorEl.style.display="block")}}async loadModel(){var t;if(!((t=this.museum.dollhouse)!=null&&t.modelUrl)||!this.scene||!this.modelGroup)return;const e=zt(this.museum.dollhouse.modelUrl,Ht.DOLLHOUSE);if(e)try{const{GLTFLoader:n}=await Di(async()=>{const{GLTFLoader:c}=await import("./GLTFLoader-CMB63bMj.js");return{GLTFLoader:c}},[],import.meta.url),r=await new n().loadAsync(e);for(;this.modelGroup.children.length>0;){const c=this.modelGroup.children[0];this.modelGroup.remove(c),(c instanceof dt||c instanceof Li)&&c.traverse(d=>{var h,p;d instanceof dt&&((h=d.geometry)==null||h.dispose(),Array.isArray(d.material)?d.material.forEach(f=>f.dispose()):(p=d.material)==null||p.dispose())})}const a=r.scene,o=this.museum.dollhouse.scale??1,l=this.museum.dollhouse.offset??{x:0,y:0,z:0};a.scale.set(o,o,o),a.position.set(l.x,l.y,l.z),this.modelGroup.add(a),this.modelLoaded=!0,this.generateGraph(),this.fitModelToView(),this.updateStatusText(),this.modelErrorEl&&(this.modelErrorEl.style.display="none")}catch{this.modelLoaded=!1,this.updateStatusText(),this.modelErrorEl&&(this.modelErrorEl.style.display="block"),this.generateGraph()}}fitModelToView(){if(!this.modelGroup||!this.scene||!this.camera||!this.controls)return;const e=new ln().setFromObject(this.modelGroup),t=e.getCenter(new R),n=e.getSize(new R),i=Math.max(n.x,n.y,n.z),r=i*2;this.camera.position.set(t.x,t.y+n.y*.5,t.z+r),this.camera.lookAt(t),this.camera.updateProjectionMatrix(),this.controls.target.copy(t),this.controls.update(),this.controls.minDistance=i*.5,this.controls.maxDistance=i*5}setupResizeObserver(){if(!this.container||typeof ResizeObserver>"u"){window.addEventListener("resize",()=>this.handleResize());return}this.resizeObserver=new ResizeObserver(()=>{this.handleResize()}),this.resizeObserver.observe(this.container)}handleResize(){if(!this.renderer||!this.camera||!this.container)return;const e=this.container.clientWidth,t=this.container.clientHeight;e===0||t===0||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.updateStatusText())}generateGraph(){var l,c;if(!this.scene)return;this.sceneNodes.forEach(d=>{this.scene.remove(d),d.geometry.dispose(),Array.isArray(d.material)?d.material.forEach(h=>h.dispose()):d.material.dispose()}),this.sceneNodes.clear(),this.edgeLines.forEach(d=>{this.scene.remove(d),d.geometry.dispose(),Array.isArray(d.material)?d.material.forEach(h=>h.dispose()):d.material.dispose()}),this.edgeLines=[];const e=this.modelLoaded&&this.modelGroup&&this.modelGroup.children.length>0,t=Fd(this.graph.nodes),n=((l=this.museum.map)==null?void 0:l.width)||1e3,i=((c=this.museum.map)==null?void 0:c.height)||600;let r={};if(t)r=kd(this.graph.nodes,this.graph.edges,{width:n,height:i,iterations:300,padding:40});else for(const d of this.graph.nodes)d.mapPoint&&(r[d.id]={x:d.mapPoint.x,y:d.mapPoint.y});const o=(d=>{const h=Object.entries(d);if(h.length===0)return{};let p=1/0,f=-1/0,_=1/0,g=-1/0;for(const[,A]of h)p=Math.min(p,A.x),f=Math.max(f,A.x),_=Math.min(_,A.y),g=Math.max(g,A.y);const m=f-p||1,u=g-_||1,b=20/m,y=20/u,T=(p+f)/2,I=(_+g)/2,C={};for(const[A,H]of h){const E=D0(this.graph,A),w=(Math.random()-.5)*.5;C[A]={x:(H.x-T)*b,y:E*1.5+w,z:(H.y-I)*y}}return C})(r);if(!e)for(const d of this.graph.edges){const h=o[d.from],p=o[d.to];if(!h||!p)continue;const f=new Ot().setFromPoints([new R(h.x,h.y,h.z),new R(p.x,p.y,p.z)]),_=new $a({color:16777215,opacity:.3,transparent:!0}),g=new qa(f,_);this.scene.add(g),this.edgeLines.push(g)}for(const d of this.graph.nodes){const h=o[d.id];if(!h)continue;const p=d.id===this.currentSceneId,f=new fs(p?.8:.6,16,16),_=new Za({color:p?4886754:8947848,opacity:p?.9:.7,transparent:!0,metalness:.1,roughness:.7}),g=new dt(f,_);if(e&&this.modelGroup){const m=new ln().setFromObject(this.modelGroup),u=m.getCenter(new R),b=m.getSize(new R);g.position.set(u.x+h.x*.1,u.y+b.y*.5+h.y*.1+1,u.z+h.z*.1)}else g.position.set(h.x,h.y,h.z);g.userData={sceneId:d.id,sceneName:d.name},p&&(g.userData.isCurrent=!0,g.scale.set(1.2,1.2,1.2)),this.scene.add(g),this.sceneNodes.set(d.id,g)}}handleClick(e){if(!this.renderer||!this.camera||this.sceneNodes.size===0)return;const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new cs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(a.length>0){const l=a[0].object.userData.sceneId;l&&this.onNodeClick&&this.onNodeClick(this.museum.id,l)}}handleMouseMove(e){if(!this.renderer||!this.camera||this.sceneNodes.size===0)return;const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new cs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(this.sceneNodes.forEach(o=>{const l=o.material;o.userData.isCurrent||(l.opacity=.7)}),a.length>0){const o=a[0].object,l=o.material,c=o.userData.sceneId;o.userData.isCurrent||(l.opacity=.9),this.hoveredSceneId=c,this.renderer.domElement.style.cursor="pointer"}else this.hoveredSceneId=null,this.renderer.domElement.style.cursor="default"}bindEvents(){if(!this.renderer)return;const e=this.renderer.domElement;e.addEventListener("click",n=>this.handleClick(n)),e.addEventListener("mousemove",n=>this.handleMouseMove(n));const t=n=>{n.key==="Escape"&&this.close()};document.addEventListener("keydown",t),this.element.addEventListener("vr:cleanup",()=>{document.removeEventListener("keydown",t)})}updateContext(e){var t,n;if(this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.scene){const i=(t=e.museum.dollhouse)==null?void 0:t.modelUrl,r=(n=this.museum.dollhouse)==null?void 0:n.modelUrl;if(i!==r){if(this.modelGroup)for(;this.modelGroup.children.length>0;){const a=this.modelGroup.children[0];this.modelGroup.remove(a)}this.modelLoaded=!1,i?this.loadModel():this.generateGraph()}else this.generateGraph();this.updateStatusText()}}open(){this.element.classList.add("is-visible"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.handleResize(),!this.animationId&&this.renderer&&this.scene&&this.camera&&this.animate()})})}close(){this.element.classList.remove("is-visible"),this.onClose&&this.onClose()}getElement(){return this.element}remove(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.scene&&(this.sceneNodes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.sceneNodes.clear(),this.edgeLines.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.edgeLines=[],this.modelGroup&&(this.modelGroup.traverse(e=>{var t,n;e instanceof dt&&((t=e.geometry)==null||t.dispose(),Array.isArray(e.material)?e.material.forEach(i=>i.dispose()):(n=e.material)==null||n.dispose())}),this.scene.remove(this.modelGroup),this.modelGroup=null)),this.renderer&&(this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.renderer=null),this.controls&&(this.controls.dispose(),this.controls=null),window.removeEventListener("resize",()=>this.handleResize()),this.scene=null,this.camera=null,this.element.remove()}}function O0(s,e,t){const n=s.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=document.createElement("div");a.className="vr-pick-marker",a.style.position="absolute",a.style.left="0",a.style.top="0",a.style.transform=`translate3d(${i}px, ${r}px, 0)`,a.style.pointerEvents="none",a.style.zIndex="1000",s.style.position="relative",s.appendChild(a),window.requestAnimationFrame(()=>{a.classList.add("show")}),window.setTimeout(()=>{a.classList.remove("show"),window.setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},200)},1500)}const k0=150,F0=150,B0=400;function V0(){return{fadeMs:k0,restoreMs:F0,restoreDelayMs:B0}}function H0(){it.on("user-interacting",()=>{}),it.on("user-idle",()=>{}),it.on("ui-engaged",()=>{})}let Jt=null;function z0(){const s=V0();it.on("user-interacting",()=>{Jt!==null&&(clearTimeout(Jt),Jt=null),document.documentElement.classList.add("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")}),it.on("user-idle",()=>{Jt!==null&&(clearTimeout(Jt),Jt=null),document.documentElement.classList.remove("vr-ui-interacting"),Jt=window.setTimeout(()=>{document.documentElement.classList.remove("vr-ui-restoring"),Jt=null},s.restoreDelayMs)}),it.on("ui-engaged",()=>{Jt!==null&&(clearTimeout(Jt),Jt=null),document.documentElement.classList.remove("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")})}function G0(){const s={};try{const e=new URLSearchParams(window.location.search),t=e.get("museum"),n=e.get("scene");t&&(s.museumId=t),n&&(s.currentSceneId=n)}catch{}try{const e=document.querySelector(".vr-groundnav");if(e){s.groundNavDots={};const t=e.querySelector(".vr-groundnav__dot.is-aimed");t&&(s.groundNavDots.aimedSceneId=t.getAttribute("data-scene-id")||void 0);const n=e.querySelector(".vr-groundnav__dot.is-autonav");if(n){s.groundNavDots.isAutoNavActive=!0,s.groundNavDots.autoNavTargetSceneId=n.getAttribute("data-scene-id")||void 0;const i=n.querySelector(".vr-groundnav__progress");s.groundNavDots.hasProgressElement=!!i}}}catch{}try{const e=document.querySelector(".vr-previewcard");if(e){s.scenePreviewCard={},s.scenePreviewCard.isVisible=e.classList.contains("is-visible");const t=e.querySelector(".vr-previewcard__hint");t&&(s.scenePreviewCard.hintVisible=t.classList.contains("is-visible"),s.scenePreviewCard.hintEmphasizing=t.classList.contains("is-emphasizing"))}}catch{}try{const e=document.querySelector(".vr-scenestrip");e&&(s.sceneStrip={},s.sceneStrip.userScrolling=e.classList.contains("is-user-scrolling"))}catch{}try{const e=document.documentElement,t=Array.from(e.classList).filter(n=>n==="vr-ui-interacting"||n==="vr-ui-restoring");t.length>0&&(s.yieldClassManager={classes:t})}catch{}return s}function W0(s){try{window.dispatchEvent(new CustomEvent("vr:close-panels"))}catch{}try{s?(s.emitInteracting(),setTimeout(()=>{try{document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}},100)):document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}}class Y0{constructor(e){v(this,"element");v(this,"overlay");v(this,"getCurrentYaw");v(this,"sceneId");v(this,"onClose");v(this,"currentYawEl",null);v(this,"resultEl",null);v(this,"updateTimer",null);v(this,"northYawValue",null);this.getCurrentYaw=e.getCurrentYaw,this.sceneId=e.sceneId,this.onClose=e.onClose,this.overlay=document.createElement("div"),this.overlay.className="vr-north-calibration-overlay",this.overlay.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 3000;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 16px;
      padding-top: calc(16px + env(safe-area-inset-top, 0px));
    `,this.element=document.createElement("div"),this.element.className="vr-north-calibration-panel",this.element.style.cssText=`
      pointer-events: auto;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 12px;
      padding: 20px;
      min-width: 280px;
      max-width: 380px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `,this.render(),this.overlay.appendChild(this.element),document.body.appendChild(this.overlay),this.startYawUpdate(),this.overlay.addEventListener("click",n=>{n.target===this.overlay&&this.close()});const t=n=>{n.key==="Escape"&&(this.close(),n.preventDefault())};window.addEventListener("keydown",t)}render(){const t=this.getCurrentYaw().toFixed(1);this.element.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: rgba(255, 255, 255, 0.95);">
          🧭 校准北向
        </h3>
        <button class="vr-close-btn" style="
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
        ">×</button>
      </div>

      <div style="margin-bottom: 16px; font-size: 13px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
        <div style="margin-bottom: 8px;">
          <strong>场景 ID：</strong><code style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-size: 12px;">${this.sceneId}</code>
        </div>
        <div style="margin-bottom: 12px;">
          <strong>当前 yaw：</strong><span class="vr-current-yaw" style="font-weight: 600; color: rgba(255, 255, 255, 0.9);">${t}°</span>
        </div>
        <div style="margin-top: 12px; padding: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; border-left: 3px solid rgba(255, 255, 255, 0.3);">
          <div style="margin-bottom: 8px; font-weight: 600; color: rgba(255, 255, 255, 0.9);">使用说明：</div>
          <div style="font-size: 12px; line-height: 1.5;">
            1. 将画面对准现实中的<strong>正北方向</strong><br>
            2. 点击下方【设为北】按钮<br>
            3. 复制显示的 <code>northYaw</code> 值<br>
            4. 在 config.json 中该场景的 <code>northYaw</code> 字段填入该值
          </div>
        </div>
        <div style="margin-top: 12px; font-size: 12px; color: rgba(255, 255, 255, 0.6);">
          <strong>含义：</strong>northYaw 表示当你"面向现实北"时的 yaw 值。校准就是：面向北 → 记录当前 yaw → 写入该场景的 northYaw。
        </div>
      </div>

      <div class="vr-calibration-result" style="
        ${this.northYawValue===null?"display: none;":""}
        margin-bottom: 16px;
        padding: 12px;
        background: rgba(76, 175, 80, 0.15);
        border: 1px solid rgba(76, 175, 80, 0.3);
        border-radius: 8px;
      ">
        <div style="font-size: 13px; color: rgba(255, 255, 255, 0.9); margin-bottom: 8px; font-weight: 600;">
          ✅ 已设为北向
        </div>
        <div class="vr-copy-target" style="
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.95);
          background: rgba(0, 0, 0, 0.3);
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 8px;
          word-break: break-all;
          user-select: all;
        "></div>
        <button class="vr-copy-btn" style="
          width: 100%;
          padding: 8px;
          background: rgba(76, 175, 80, 0.3);
          border: 1px solid rgba(76, 175, 80, 0.5);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        ">点击复制</button>
      </div>

      <div style="display: flex; gap: 8px;">
        <button class="vr-set-north-btn" style="
          flex: 1;
          padding: 10px;
          background: rgba(33, 150, 243, 0.3);
          border: 1px solid rgba(33, 150, 243, 0.5);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        ">设为北</button>
      </div>
    `;const n=this.element.querySelector(".vr-close-btn");n&&(n.addEventListener("click",()=>this.close()),n.addEventListener("mouseenter",function(){this.style.background="rgba(255, 255, 255, 0.1)",this.style.color="rgba(255, 255, 255, 0.9)"}),n.addEventListener("mouseleave",function(){this.style.background="none",this.style.color="rgba(255, 255, 255, 0.6)"}));const i=this.element.querySelector(".vr-set-north-btn");i&&(i.addEventListener("click",()=>this.handleSetNorth()),i.addEventListener("mouseenter",function(){this.style.background="rgba(33, 150, 243, 0.4)"}),i.addEventListener("mouseleave",function(){this.style.background="rgba(33, 150, 243, 0.3)"}),i.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),i.addEventListener("mouseup",function(){this.style.transform="scale(1)"}));const r=this.element.querySelector(".vr-copy-btn");r&&(r.addEventListener("click",()=>this.handleCopy()),r.addEventListener("mouseenter",function(){this.style.background="rgba(76, 175, 80, 0.4)"}),r.addEventListener("mouseleave",function(){this.style.background="rgba(76, 175, 80, 0.3)"}),r.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),r.addEventListener("mouseup",function(){this.style.transform="scale(1)"})),this.currentYawEl=this.element.querySelector(".vr-current-yaw"),this.resultEl=this.element.querySelector(".vr-calibration-result")}startYawUpdate(){const e=()=>{if(this.currentYawEl&&!this.northYawValue){const t=this.getCurrentYaw();this.currentYawEl.textContent=`${t.toFixed(1)}°`}this.updateTimer=window.setTimeout(e,100)};e()}stopYawUpdate(){this.updateTimer!==null&&(clearTimeout(this.updateTimer),this.updateTimer=null)}handleSetNorth(){const e=this.getCurrentYaw();this.northYawValue=e,this.resultEl&&(this.resultEl.style.display="block");const t=this.element.querySelector(".vr-copy-target");if(t){const n=`"northYaw": ${e.toFixed(1)}`;t.textContent=n,t.setAttribute("data-copy-text",n)}this.stopYawUpdate(),this.currentYawEl&&(this.currentYawEl.textContent=`${e.toFixed(1)}°`),Ze(`已记录北向值: ${e.toFixed(1)}°`)}async handleCopy(){const e=this.element.querySelector(".vr-copy-target");if(!e)return;const t=e.getAttribute("data-copy-text")||e.textContent||"";if(await Ld(t)){Ze("已复制到剪贴板");const i=this.element.querySelector(".vr-copy-btn");if(i){const r=i.textContent;i.textContent="✓ 已复制",setTimeout(()=>{i.textContent=r},2e3)}}else Ze("复制失败，请手动选择文本")}close(){this.stopYawUpdate(),this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.onClose&&this.onClose()}getElement(){return this.overlay}}class X0{constructor(e,t){v(this,"client");v(this,"context");v(this,"root");v(this,"header");v(this,"body");v(this,"list");v(this,"input");v(this,"sendBtn");v(this,"clearBtn");v(this,"closeBtn");v(this,"statusLine");v(this,"dragging",!1);v(this,"dragOffsetX",0);v(this,"dragOffsetY",0);v(this,"isMobile",!1);v(this,"swipeStartY",0);v(this,"swipeActive",!1);v(this,"messages",[]);v(this,"isOpen",!1);v(this,"fabButton",null);v(this,"snapTimer",null);v(this,"isDragging",!1);v(this,"startX",0);v(this,"startY",0);v(this,"startLeft",0);v(this,"startTop",0);v(this,"lastLeft",0);v(this,"lastTop",0);v(this,"moved",!1);v(this,"hasUserPlaced",!1);v(this,"typingTimer",null);v(this,"typingAbortToken",0);this.client=e,this.context=t,this.mount(),this.injectStyles(),this.detectMobile(),this.ensureWelcome()}destroy(){var e,t;this.stopTyping(!0),this.snapTimer&&(window.clearTimeout(this.snapTimer),this.snapTimer=null),(e=this.root)==null||e.remove(),(t=this.fabButton)==null||t.remove(),this.fabButton=null}detectMobile(){var n,i;const e=((n=window.matchMedia)==null?void 0:n.call(window,"(max-width: 768px)").matches)??!1,t=((i=window.matchMedia)==null?void 0:i.call(window,"(pointer: coarse)").matches)??!1;this.isMobile=e||t,this.root.dataset.mobile=this.isMobile?"1":"0"}mount(){this.root=document.createElement("div"),this.root.className="fcchat-root",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-label","三馆学伴"),this.header=document.createElement("div"),this.header.className="fcchat-header";const e=document.createElement("div");e.className="fcchat-title",e.textContent="三馆学伴";const t=document.createElement("div");t.className="fcchat-header-right",this.clearBtn=document.createElement("button"),this.clearBtn.className="fcchat-btn fcchat-btn-ghost",this.clearBtn.type="button",this.clearBtn.textContent="清空",this.clearBtn.addEventListener("click",()=>this.clear()),this.closeBtn=document.createElement("button"),this.closeBtn.className="fcchat-btn fcchat-btn-ghost fcchat-close",this.closeBtn.type="button",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.textContent="×",this.closeBtn.addEventListener("click",()=>this.toggle()),t.appendChild(this.clearBtn),t.appendChild(this.closeBtn);const n=document.createElement("div");n.className="fcchat-header-row",n.appendChild(e),n.appendChild(t),this.header.appendChild(n);const i=document.createElement("div");i.className="fcchat-disclaimer",i.textContent="提示：AI 可能会出错，内容仅供参考；请以现场展陈/讲解为准。",this.header.appendChild(i),this.body=document.createElement("div"),this.body.className="fcchat-body",this.list=document.createElement("div"),this.list.className="fcchat-list",this.body.appendChild(this.list),this.statusLine=document.createElement("div"),this.statusLine.className="fcchat-status",this.statusLine.textContent="",this.body.appendChild(this.statusLine);const r=document.createElement("div");r.className="fcchat-inputbar",this.input=document.createElement("input"),this.input.className="fcchat-input",this.input.type="text",this.input.placeholder="输入问题，回车发送",this.input.addEventListener("keydown",a=>{a.key==="Enter"&&this.onSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="fcchat-btn fcchat-btn-primary",this.sendBtn.type="button",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.onSend()),r.appendChild(this.input),r.appendChild(this.sendBtn),this.root.appendChild(this.header),this.root.appendChild(this.body),this.root.appendChild(r),document.body.appendChild(this.root),this.root.style.display="none",this.root.style.right="18px",this.root.style.bottom="18px",this.ensureToggleButton(),this.header.addEventListener("mousedown",a=>this.onDragStart(a)),window.addEventListener("mousemove",a=>this.onDragMove(a)),window.addEventListener("mouseup",()=>this.onDragEnd()),this.header.addEventListener("pointerdown",a=>this.onSwipeStart(a),{passive:!1}),this.header.addEventListener("pointermove",a=>this.onSwipeMove(a),{passive:!1}),this.header.addEventListener("pointerup",a=>this.onSwipeEnd(a)),this.header.addEventListener("pointercancel",a=>this.onSwipeEnd(a)),window.addEventListener("resize",()=>this.detectMobile())}hide(){this.isOpen&&(this.isOpen=!1,this.stopTyping(!0),this.root.style.display="none",this.root.classList.remove("fcchat-open"),this.fabButton&&this.fabButton.classList.add("fcchat-docked"),document.body.classList.remove("fcchat-open"),this.updateOverlayState())}show(){this.isOpen||(this.isOpen=!0,this.detectMobile(),this.root.style.display="flex",this.root.classList.add("fcchat-open"),this.fabButton&&this.fabButton.classList.remove("fcchat-docked"),document.body.classList.add("fcchat-open"),this.scrollToBottom(),this.isMobile||this.input.focus(),this.updateOverlayState())}toggle(){this.isOpen?this.hide():this.show()}updateOverlayState(){!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||this.root&&this.root.style.display==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}getSafeBounds(){const e=window.innerWidth,t=window.innerHeight,n=this.fabButton;if(!n)return{minLeft:8,maxLeft:e-52,minTop:12,maxTop:t-64};const i=n.getBoundingClientRect(),r=i.width,a=i.height,o=12+(this.isMobile?56:12),l=12+(this.isMobile?96:12);return{minLeft:8,maxLeft:e-r-8,minTop:o,maxTop:t-a-l}}clampPos(e,t){const n=this.getSafeBounds();return{left:Math.max(n.minLeft,Math.min(e,n.maxLeft)),top:Math.max(n.minTop,Math.min(t,n.maxTop))}}snapToEdge(){const e=this.fabButton;if(!e)return;const t=this.getSafeBounds(),n=e.getBoundingClientRect(),i=n.left,r=n.top,a=i-t.minLeft,o=t.maxLeft-i,l=r-t.minTop,c=t.maxTop-r,d=Math.min(a,o,l,c);let h=i,p=r;d===a?h=t.minLeft:d===o?h=t.maxLeft:d===l?p=t.minTop:d===c&&(p=t.maxTop),e.style.left=`${h}px`,e.style.top=`${p}px`,e.style.right="auto",e.style.bottom="auto",localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:h,top:p})),setTimeout(()=>{e.classList.remove("fcchat-snapping")},220)}ensureToggleButton(){if(this.fabButton)return;const e=new URLSearchParams(location.search);if(e.get("reset_ui")==="1"){localStorage.removeItem("vr_fcchat_dock_state"),e.delete("reset_ui");const i=location.pathname+(e.toString()?"?"+e.toString():"")+location.hash;history.replaceState({},"",i)}const t=document.createElement("button");t.id="fcchat-fab",t.className="fcchat-fab fcchat-docked",t.type="button",t.setAttribute("aria-label","打开三馆学伴"),t.innerHTML=`<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="url(#fcchat-avatar-gradient)"/>
      <defs>
        <linearGradient id="fcchat-avatar-gradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <!-- 脸 -->
      <ellipse cx="22" cy="24" rx="12" ry="13" fill="#ffffff" opacity="0.95"/>
      <!-- 左眼 -->
      <circle cx="18" cy="22" r="2.5" fill="#1e293b"/>
      <!-- 右眼 -->
      <circle cx="26" cy="22" r="2.5" fill="#1e293b"/>
      <!-- 嘴巴（微笑） -->
      <path d="M 18 28 Q 22 31 26 28" stroke="#1e293b" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>`,t.addEventListener("pointerdown",i=>this.onFabPointerDown(i),{passive:!1}),t.addEventListener("pointermove",i=>this.onFabPointerMove(i),{passive:!1}),t.addEventListener("pointerup",i=>this.onFabPointerUp(i),{passive:!1}),t.addEventListener("pointercancel",i=>this.onFabPointerUp(i),{passive:!1}),this.fabButton=t,document.body.appendChild(t);const n=localStorage.getItem("fcchat_fab_pos_v1");if(n)try{const i=JSON.parse(n);t.style.left=`${i.left}px`,t.style.top=`${i.top}px`,t.style.right="auto",t.style.bottom="auto",t.classList.remove("fcchat-docked"),this.hasUserPlaced=!0}catch{}!this.hasUserPlaced&&!this.isOpen&&t.classList.add("fcchat-docked"),this.maybeShowFirstVisitHint()}maybeShowFirstVisitHint(){const e="fcchat_first_hint_shown";if(sessionStorage.getItem(e))return;sessionStorage.setItem(e,"1");const t=this.fabButton;if(!t)return;const n=document.createElement("div");n.className="fcchat-first-hint",n.textContent="我是三馆学伴，为你解疑答惑😉",document.body.appendChild(n);const i=()=>{const r=t.getBoundingClientRect();n.style.left=`${r.left-8}px`,n.style.top=`${r.top+r.height/2}px`};i(),window.addEventListener("resize",i),setTimeout(()=>{n.classList.add("is-hide"),setTimeout(()=>{window.removeEventListener("resize",i),n.remove()},300)},1e4)}onFabPointerDown(e){const t=this.fabButton;if(!t)return;e.preventDefault(),this.isDragging=!1,this.moved=!1,this.startX=e.clientX,this.startY=e.clientY;const n=t.getBoundingClientRect(),i=parseFloat(t.style.left||""),r=parseFloat(t.style.top||"");this.startLeft=Number.isFinite(i)?i:n.left,this.startTop=Number.isFinite(r)?r:n.top;try{t.setPointerCapture(e.pointerId)}catch{}t.classList.remove("fcchat-docked")}onFabPointerMove(e){const t=this.fabButton;if(!t)return;e.preventDefault();const n=e.clientX-this.startX,i=e.clientY-this.startY;if(!this.isDragging){if(Math.abs(n)+Math.abs(i)<4)return;this.isDragging=!0,t.classList.add("fcchat-dragging")}const r=this.clampPos(this.startLeft+n,this.startTop+i);this.lastLeft=r.left,this.lastTop=r.top,t.style.left=`${this.lastLeft}px`,t.style.top=`${this.lastTop}px`,t.style.right="auto",t.style.bottom="auto",this.hasUserPlaced=!0}onFabPointerUp(e){const t=this.fabButton;if(t){e.preventDefault();try{t.releasePointerCapture(e.pointerId)}catch{}if(!this.isDragging){this.toggle();return}this.isDragging=!1,t.classList.remove("fcchat-dragging");try{localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:this.lastLeft,top:this.lastTop}))}catch{}this.snapTimer&&window.clearTimeout(this.snapTimer),t.classList.add("fcchat-snapping"),this.snapTimer=window.setTimeout(()=>{this.snapToEdge(),this.snapTimer=null},5e3)}}onDragStart(e){if(this.isMobile||e.target.closest("button"))return;this.dragging=!0;const n=this.root.getBoundingClientRect();this.dragOffsetX=e.clientX-n.left,this.dragOffsetY=e.clientY-n.top,this.root.style.right="auto",this.root.style.bottom="auto",this.root.style.left=n.left+"px",this.root.style.top=n.top+"px"}onDragMove(e){if(!this.dragging||this.isMobile)return;const t=window.innerWidth,n=window.innerHeight,i=this.root.getBoundingClientRect();let r=e.clientX-this.dragOffsetX,a=e.clientY-this.dragOffsetY;r=Math.max(8,Math.min(r,t-i.width-8)),a=Math.max(8,Math.min(a,n-i.height-8)),this.root.style.left=r+"px",this.root.style.top=a+"px"}onDragEnd(){this.dragging=!1}onSwipeStart(e){!this.isMobile||e.target.closest("button")||(this.swipeActive=!0,this.swipeStartY=e.clientY,this.root.classList.add("is-swiping"),e.preventDefault(),this.header.setPointerCapture(e.pointerId))}onSwipeMove(e){if(!this.isMobile||!this.swipeActive)return;e.preventDefault();const t=e.clientY-this.swipeStartY;if(t<=0){this.root.style.transform="";return}this.root.style.transform=`translateY(${Math.min(t,200)}px)`}onSwipeEnd(e){if(!this.isMobile||!this.swipeActive)return;const n=(this.root.style.transform||"").match(/translateY\(([-\d.]+)px\)/),i=n?Number(n[1]):0;this.swipeActive=!1,this.root.classList.remove("is-swiping"),this.root.style.transform="",e&&this.header.releasePointerCapture(e.pointerId),i>=90&&this.hide()}clear(){this.stopTyping(!0),this.messages=[],this.list.innerHTML="",this.statusLine.textContent="",this.ensureWelcome()}ensureWelcome(){this.messages.length>0||this.addMessage("assistant","我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。")}setBusy(e,t=""){this.sendBtn.disabled=e,this.input.disabled=e,this.statusLine.textContent=t}normalizeText(e){return(e??"").replace(/^\s+/,"")}addMessage(e,t){const n={role:e,text:this.normalizeText(t)};this.messages.push(n);const i=document.createElement("div");i.className=`fcchat-row ${e==="user"?"is-user":"is-assistant"}`;const r=document.createElement("div");r.className=`fcchat-bubble ${e==="user"?"bubble-user":"bubble-assistant"}`,r.textContent=n.text,i.appendChild(r),this.list.appendChild(i),this.scrollToBottom()}addAssistantBubbleLoading(){const e=document.createElement("div");e.className="fcchat-row is-assistant",e.dataset.loading="1";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.innerHTML='<span class="fcchat-typing"><span></span><span></span><span></span></span>',e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),{row:e,bubble:t}}addAssistantBubbleEmpty(){const e=document.createElement("div");e.className="fcchat-row is-assistant";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.textContent="",e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),t}replaceLoadingWithEmpty(e){e.removeAttribute("data-loading");const t=e.querySelector(".fcchat-bubble");return t&&(t.innerHTML="",t.textContent=""),t}scrollToBottom(){this.list.scrollTop=this.list.scrollHeight}stopTyping(e){this.typingAbortToken++,this.typingTimer!=null&&(window.clearTimeout(this.typingTimer),this.typingTimer=null)}async typewriterRender(e,t){const n=++this.typingAbortToken,i=this.normalizeText(t),r=i.length;let a=1200;r<=120?a=900+Math.floor(Math.random()*400):r<=400?a=1800+Math.floor(Math.random()*800):a=3e3+Math.floor(Math.random()*1e3);let o=0;const l=performance.now();return await new Promise(c=>{const d=()=>{if(n!==this.typingAbortToken){e.textContent=i,this.scrollToBottom(),c();return}const h=performance.now()-l,p=r-o;if(h>=a||p<=0){e.textContent=i,this.scrollToBottom(),c();return}const f=o/Math.max(1,r);let _=1;const g=Math.random();f<.15?_=g<.75?1:2:f<.7?_=g<.35?2:g<.75?3:4:_=g<.5?2:3,_=Math.min(_,p);const m=i.slice(0,o+_);o+=_,e.textContent=m,this.scrollToBottom();let u=18+Math.floor(Math.random()*38);Math.random()<.06&&(u+=60+Math.floor(Math.random()*90)),this.typingTimer=window.setTimeout(d,u)};d()})}async onSend(){const e=this.input.value.trim();if(!e)return;this.stopTyping(!0),this.input.value="",this.addMessage("user",e);const{row:t,bubble:n}=this.addAssistantBubbleLoading();this.setBusy(!0,"");try{const i=await this.client.ask(e,this.context),r=this.replaceLoadingWithEmpty(t);this.setBusy(!0,"输出中…"),await this.typewriterRender(r,i.answer),this.messages.length>0&&this.messages[this.messages.length-1].role==="assistant"&&(this.messages[this.messages.length-1].text=i.answer),this.setBusy(!1,"")}catch(i){const r=t.querySelector(".fcchat-bubble");if(r){t.removeAttribute("data-loading");const a=typeof(i==null?void 0:i.message)=="string"?i.message:String(i);r.textContent=`请求失败：${a}`,this.messages.length>0&&this.messages[this.messages.length-1].role==="assistant"&&(this.messages[this.messages.length-1].text=`请求失败：${a}`)}this.setBusy(!1,"")}this.scrollToBottom()}injectStyles(){if(document.getElementById("fcchat-style"))return;const e=document.createElement("style");e.id="fcchat-style",e.textContent=`
      .fcchat-root{
        position: fixed;
        z-index: 99999;
        width: 420px;
        height: 520px;
        display: flex;
        flex-direction: column;
        border-radius: 14px;
        background: #fff;
        box-shadow: 0 14px 50px rgba(0,0,0,.18);
        overflow: hidden;
        resize: both;
        min-width: 320px;
        min-height: 360px;
        transform: none;
      }

      .fcchat-header{
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content:center;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(0,0,0,.06);
        background: #f8fafc;
        cursor: move;
        user-select: none;
      }
      .fcchat-header-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
      }
      .fcchat-title{
        font-size: 15px;
        font-weight: 700;
        color: #111827;
      }
      .fcchat-header-right{
        display:flex;
        align-items:center;
        gap: 8px;
      }
      .fcchat-disclaimer{
        margin-top: 6px;
        font-size: 12px;
        line-height: 1.3;
        opacity: 0.7;
        color: #6b7280;
      }

      .fcchat-body{
        flex: 1;
        display:flex;
        flex-direction: column;
        min-height: 0;
        background: #ffffff;
      }
      .fcchat-list{
        flex: 1;
        overflow: auto;
        padding: 12px;
        display:flex;
        flex-direction: column;
        gap: 10px;
        -webkit-overflow-scrolling: touch;
      }

      .fcchat-row{ display:flex; }
      .fcchat-row.is-user{ justify-content:flex-end; }
      .fcchat-row.is-assistant{ justify-content:flex-start; }

      .fcchat-bubble{
        max-width: 72%;
        padding: 8px 10px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.45;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .bubble-user{
        background: #2563eb;
        color:#fff;
        border-top-right-radius: 6px;
      }
      .bubble-assistant{
        background: #eef2f7;
        color:#111827;
        border-top-left-radius: 6px;
      }

      .fcchat-status{
        padding: 6px 12px 0 12px;
        font-size: 12px;
        color: #6b7280;
        min-height: 18px;
      }

      .fcchat-inputbar{
        display:flex;
        gap: 10px;
        padding: 10px;
        border-top: 1px solid rgba(0,0,0,.06);
        background: #fff;
      }
      .fcchat-input{
        flex:1;
        height: 36px;
        border-radius: 10px;
        border: 1px solid rgba(0,0,0,.12);
        padding: 0 10px;
        font-size: 13px;
        outline:none;
      }
      .fcchat-input:focus{
        border-color: rgba(37,99,235,.55);
        box-shadow: 0 0 0 3px rgba(37,99,235,.12);
      }

      .fcchat-btn{
        height: 36px;
        border-radius: 10px;
        border: 1px solid transparent;
        padding: 0 12px;
        font-size: 13px;
        cursor:pointer;
        user-select:none;
      }
      .fcchat-btn:disabled{ opacity:.6; cursor:not-allowed; }
      .fcchat-btn-primary{ background:#2563eb; color:#fff; }
      .fcchat-btn-ghost{
        background: transparent;
        color: #111827;
        border-color: rgba(0,0,0,.10);
        height: 30px;
        padding: 0 10px;
        border-radius: 10px;
        font-size: 12px;
      }
      .fcchat-close{
        width: 30px;
        padding: 0;
        font-size: 18px;
        line-height: 28px;
      }

      /* 默认：横屏 / 桌面 / 平板 */
      .fcchat-fab{
        position: fixed;
        z-index: 99999;
        right: 16px;
        bottom: calc(env(safe-area-inset-bottom, 0px) + 88px);
        top: auto;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        background: transparent;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 1;
        pointer-events: auto;
        box-shadow: 0 4px 16px rgba(37,99,235,.4);
        padding: 0;
        transition: opacity 200ms ease, box-shadow 200ms ease, transform 200ms ease;
        animation: fcchat-idle 3.8s ease-in-out infinite;
        touch-action: none; /* 关键：禁止浏览器把手势当滚动/缩放 */
        -webkit-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      /* 竖屏手机：靠近全屏按钮 */
      @media (max-width: 768px) and (orientation: portrait){
        .fcchat-fab{
          top: calc(env(safe-area-inset-top, 0px) + 88px);
          right: 12px;
          bottom: auto;
        }
      }
      .fcchat-fab:hover{
        box-shadow: 0 6px 20px rgba(37,99,235,.5);
        transform: scale(1.05);
      }
      .fcchat-fab:active{
        transform: scale(0.98);
      }
      .fcchat-fab svg{
        width: 44px;
        height: 44px;
        display: block;
      }
      /* 拖拽状态 */
      .fcchat-fab.fcchat-dragging{
        transition: none !important;
        cursor: grabbing;
        animation: none !important; /* 拖拽时停止 idle 动画 */
      }
      /* 贴边动画状态 */
      .fcchat-fab.fcchat-snapping{
        transition: left 220ms cubic-bezier(0.2, 0.9, 0.2, 1), top 220ms cubic-bezier(0.2, 0.9, 0.2, 1);
      }
      /* 悬挂隐藏状态：半隐藏在屏幕外 */
      .fcchat-fab.fcchat-docked{
        transform: translateX(26px);
      }
      .fcchat-fab.fcchat-docked:hover{
        transform: translateX(26px) scale(1.05);
      }
      /* 打开状态：降低透明度避免遮挡 */
      body.fcchat-open .fcchat-fab{
        opacity: 0.6;
      }
      @keyframes fcchat-idle{
        0%, 75%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
        77%{
          transform: translate3d(0, -12px, 0) scale(1.12) rotate(5deg);
        }
        79%{
          transform: translate3d(0, -4px, 0) scale(1.06) rotate(-3deg);
        }
        81%{
          transform: translate3d(0, -10px, 0) scale(1.10) rotate(4deg);
        }
        83%{
          transform: translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
        }
        85%{
          transform: translate3d(0, -8px, 0) scale(1.08) rotate(3deg);
        }
        87%, 100%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
      }
      /* 悬挂隐藏状态下的动画需要叠加 translateX */
      .fcchat-fab.fcchat-docked{
        animation: fcchat-idle-docked 3.8s ease-in-out infinite;
      }
      @keyframes fcchat-idle-docked{
        0%, 75%{
          transform: translateX(26px) translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
        77%{
          transform: translateX(26px) translate3d(0, -12px, 0) scale(1.12) rotate(5deg);
        }
        79%{
          transform: translateX(26px) translate3d(0, -4px, 0) scale(1.06) rotate(-3deg);
        }
        81%{
          transform: translateX(26px) translate3d(0, -10px, 0) scale(1.10) rotate(4deg);
        }
        83%{
          transform: translateX(26px) translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
        }
        85%{
          transform: translateX(26px) translate3d(0, -8px, 0) scale(1.08) rotate(3deg);
        }
        87%, 100%{
          transform: translateX(26px) translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
      }
      /* 移动端悬挂隐藏动画 */
      @media (max-width: 768px), (pointer: coarse){
        .fcchat-fab.fcchat-docked{
          animation: fcchat-idle-docked-mobile 3.8s ease-in-out infinite;
        }
        @keyframes fcchat-idle-docked-mobile{
          0%, 75%{
            transform: translateX(20px) translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
          77%{
            transform: translateX(20px) translate3d(0, -12px, 0) scale(1.12) rotate(5deg);
          }
          79%{
            transform: translateX(20px) translate3d(0, -4px, 0) scale(1.06) rotate(-3deg);
          }
          81%{
            transform: translateX(20px) translate3d(0, -10px, 0) scale(1.10) rotate(4deg);
          }
          83%{
            transform: translateX(20px) translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
          }
          85%{
            transform: translateX(20px) translate3d(0, -8px, 0) scale(1.08) rotate(3deg);
          }
          87%, 100%{
            transform: translateX(20px) translate3d(0, 0, 0) scale(1) rotate(0deg);
          }
        }
      }

      @media (max-width: 768px), (pointer: coarse){
        .fcchat-root{
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          top: auto !important;
          width: 100vw !important;
          height: min(75vh, 680px) !important;
          border-radius: 16px 16px 0 0 !important;
          resize: none !important;
          min-width: 0 !important;
          min-height: 0 !important;
          box-shadow: 0 -10px 40px rgba(0,0,0,.20);
        }
        .fcchat-header{
          cursor: default !important;
        }
        .fcchat-bubble{ max-width: 84%; }
        .fcchat-fab{
          width: 40px;
          height: 40px;
        }
        .fcchat-fab svg{
          width: 40px;
          height: 40px;
        }
        /* 移动端悬挂隐藏 */
        .fcchat-fab.fcchat-docked{
          transform: translateX(20px);
        }
      }

      .fcchat-root.is-swiping{
        transition: none;
      }

      /* 思考中动画 */
      .fcchat-typing{
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 0;
      }
      .fcchat-typing span{
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        animation: fcchat-typing-bounce 1.4s infinite ease-in-out;
      }
      .fcchat-typing span:nth-child(1){ animation-delay: -0.32s; }
      .fcchat-typing span:nth-child(2){ animation-delay: -0.16s; }
      .fcchat-typing span:nth-child(3){ animation-delay: 0; }
      @keyframes fcchat-typing-bounce{
        0%, 80%, 100%{ transform: scale(0.8); opacity: 0.5; }
        40%{ transform: scale(1); opacity: 1; }
      }
    `,document.head.appendChild(e)}getElement(){return this.root}remove(){this.destroy()}}function $0(s){try{return JSON.parse(s)}catch{return null}}function va(s){return typeof s=="string"?s:""}function q0(s){return s.endsWith("/")?s:s+"/"}function j0(s,e){const t={question:s};return e&&typeof e=="object"&&(t.context={museumId:e.museumId||"",museumName:e.museumName||"",sceneId:e.sceneId||"",sceneTitle:e.sceneTitle||"",url:e.url||""}),t}function K0(s){if(s&&typeof s=="object"&&typeof s.answer=="string"&&s.answer.trim())return{ok:!0,answer:s.answer.trim(),model:va(s.model)||void 0};if(s&&typeof s=="object"&&("code"in s||"msg"in s||"data"in s)){const e=typeof s.code=="number"?s.code:void 0,t=va(s.msg)||"",n=s.data;if((e===0||e===void 0)&&n&&typeof n=="object"){const i=typeof n.answer=="string"?n.answer.trim():"";if(i)return{ok:!0,answer:i,model:va(n.model)||void 0}}if(e===40101||t.toLowerCase()==="unauthorized")return{ok:!1,code:40101,msg:"unauthorized"};if(e!==void 0&&e!==0)return{ok:!1,code:e,msg:t||`error code=${e}`};if(t&&t.toLowerCase()!=="ok")return{ok:!1,code:e,msg:t}}return{ok:!1,msg:"bad response"}}class Z0{constructor(e){v(this,"endpoint");v(this,"authToken");v(this,"timeoutMs");if(!(e!=null&&e.endpoint))throw new Error("fcChat endpoint is empty");this.endpoint=q0(e.endpoint),this.authToken=e.authToken||"",this.timeoutMs=typeof e.timeoutMs=="number"&&e.timeoutMs>0?e.timeoutMs:15e3}async ask(e,t){const n=(e||"").trim();if(!n)throw new Error("empty question");const i=new AbortController,r=setTimeout(()=>i.abort(),this.timeoutMs);try{const a={"Content-Type":"application/json"};this.authToken&&(a.Authorization=this.authToken.startsWith("Bearer ")?this.authToken:`Bearer ${this.authToken}`);const o=await fetch(this.endpoint,{method:"POST",headers:a,body:JSON.stringify(j0(n,t)),signal:i.signal}),l=await o.text(),c=$0(l);if(!c){const p=l?`bad response: ${l}`:`http ${o.status}`;throw new Error(p)}const d=K0(c);if(d.ok)return{answer:d.answer,model:d.model};if(d.code===40101){const p=new Error("unauthorized (code=40101)");throw p.code=40101,p}const h=d.code?`${d.msg} (code=${d.code})`:d.msg;throw new Error(h||"request failed")}catch(a){throw(a==null?void 0:a.name)==="AbortError"?new Error(`timeout (${this.timeoutMs}ms)`):a}finally{clearTimeout(r)}}}let ti=!1,as=null,tr=null,nr=null,ir=!1,Ai=0,qn=0,sr=!0;const J0=new R(0,0,1),Ac=new ps,Q0=new Mn,ey=new Mn(-Math.sqrt(.5),0,0,Math.sqrt(.5)),Js=new Mn,ty=new R(0,0,-1),ny=new R(0,1,0);let _r=null;function iy(){const s=screen.orientation,e=s&&typeof s.angle=="number"?s.angle:typeof window.orientation=="number"?window.orientation:0;return gt.degToRad(e||0)}function sy(s,e,t){const n=gt.degToRad(s||0),i=gt.degToRad(e||0),r=gt.degToRad(t||0),a=iy();return Ac.set(i,n,-r,"YXZ"),Js.setFromEuler(Ac),Js.multiply(ey),Js.multiply(Q0.setFromAxisAngle(J0,-a)),Js.clone()}function _a(s){for(;s>Math.PI;)s-=2*Math.PI;for(;s<-Math.PI;)s+=2*Math.PI;return s}function ry(s,e,t){s=_a(s),e=_a(e);let n=e-s;return n>Math.PI&&(n-=2*Math.PI),n<-Math.PI&&(n+=2*Math.PI),_a(s+n*t)}function ay(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)}async function oy(){if(!ay())return!0;if(typeof DeviceOrientationEvent.requestPermission=="function")try{return await DeviceOrientationEvent.requestPermission()==="granted"}catch(s){return console.warn("[VRMode] iOS permission request failed:",s),!1}return!0}function ly(s){_r=s}async function cy(s){var t;if(ti)return!0;if(!await oy())return Ze("未获得陀螺仪权限，无法进入VR模式"),!1;ir=!1,nr=null,Ai=0,qn=0,sr=!0,tr=s;try{(t=screen.orientation)!=null&&t.lock&&await screen.orientation.lock("landscape")}catch{}return as=n=>{if(!ti||!tr||n.alpha===null||n.beta===null||n.gamma===null)return;const i=sy(n.alpha,n.beta,n.gamma);if(!ir){nr=i.clone(),ir=!0;return}if(_r&&_r())return;const r=nr.clone().invert(),a=i.clone().multiply(r),o=ty.clone().applyQuaternion(a),l=ny.clone().applyQuaternion(a);let c=Math.atan2(o.x,-o.z);c=-c;let d=Math.atan2(l.z,l.y);d=-d;const h=gt.degToRad(85);d=Math.max(-h,Math.min(h,d)),sr?(Ai=c,qn=d,sr=!1):(Ai=ry(Ai,c,.15),qn=qn+(d-qn)*.2);const p=gt.radToDeg(Ai),f=gt.radToDeg(qn);tr(p,f)},window.addEventListener("deviceorientation",as),ti=!0,!0}function Bd(){var s;if(ti){as&&(window.removeEventListener("deviceorientation",as),as=null),tr=null,ti=!1,ir=!1,nr=null,Ai=0,qn=0,sr=!0,_r=null;try{(s=screen.orientation)!=null&&s.unlock&&screen.orientation.unlock()}catch{}}}function Qs(){return ti}function dy(){const s=()=>{!ds()&&ti&&Bd()};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}ct&&(window.__vrDump=()=>{const s=G0();return console.debug("[VR State Snapshot]",s),s},window.__vrResetUI=()=>{console.debug("[VR Reset UI] 正在清理所有 UI 状态..."),W0(it),console.debug("[VR Reset UI] 清理完成")},console.debug("[VR Debug] 调试模式已启用。使用 __vrDump() 查看状态，使用 __vrResetUI() 复位 UI"));Jd();H0();z0();r_();dy();const Vd=()=>{const s=document;!!(document.fullscreenElement||s.webkitFullscreenElement)&&S_()};document.addEventListener("fullscreenchange",Vd);document.addEventListener("webkitfullscreenchange",Vd);function hy(){const s=new URLSearchParams(location.search);return s.has("development")||s.get("dev")==="1"||location.hash.includes("development")}class uy{constructor(){v(this,"appElement");v(this,"config",null);v(this,"panoViewer",null);v(this,"titleBar",null);v(this,"topRightControls",null);v(this,"topModeTabs",null);v(this,"sceneTitleEl",null);v(this,"brandMark",null);v(this,"bottomDock",null);v(this,"sceneGuideDrawer",null);v(this,"guideTray",null);v(this,"museumList",null);v(this,"sceneList",null);v(this,"mapOverlay",null);v(this,"hotspots",null);v(this,"videoPlayer",null);v(this,"controlBar",null);v(this,"loading");v(this,"debugPanel",null);v(this,"configStudio",null);v(this,"qualityIndicator",null);v(this,"northCalibrationPanel",null);v(this,"currentMuseum",null);v(this,"currentScene",null);v(this,"hasBoundFullscreenEvents",!1);v(this,"mode","tour");v(this,"isStructureOverlayOpen",!1);v(this,"structureView2D",null);v(this,"structureView3D",null);v(this,"fcChatPanel",null);v(this,"infoModalMounted",null);v(this,"settingsModalMounted",null);v(this,"uiErrorElement",null);const e=document.getElementById("app");if(!e)throw new Error("找不到 #app 元素");this.appElement=e,bd(),this.loading=new Y_,this.appElement.appendChild(this.loading.getElement()),this.bindFullscreenEventsOnce(),this.init()}bindFullscreenEventsOnce(){if(this.hasBoundFullscreenEvents)return;this.hasBoundFullscreenEvents=!0;const e=()=>{var t;(t=this.topRightControls)==null||t.syncFullscreenState(),gr()||(this.topRightControls&&!Qs()&&this.topRightControls.updateVrModeState(!1),this.panoViewer&&this.panoViewer.isVrModeEnabled()&&this.panoViewer.setVrModeEnabled(!1),Id())};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}async init(){try{if(this.loading.show(),th()){await this.initEditorMode(),this.loading.hide();return}this.config=await go(),this.titleBar&&this.titleBar.setTitle(this.config.appName),window.addEventListener("popstate",()=>this.handleRoute()),await this.handleRoute(),this.loading.hide()}catch(e){console.error("配置加载失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await go(),this.appElement.innerHTML="",this.configStudio=new J_(this.config,e=>{this.config=e,vo()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}showConfigErrorPanel(e){this.appElement.innerHTML="";const t=new X_(e,()=>{vo(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(t.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
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
      `)}async handleRoute(){if(!this.config)return;const e=xo();if(this.clearView(),!e.museumId){const t=this.config.museums.find(n=>n.id==="wangding")||this.config.museums[0];if(t){if(t.scenes&&t.scenes.length>0){Qt(t.id,t.scenes[0].id);return}xa(t.id);return}}if(!e.museumId)this.showMuseumList();else if(e.sceneId){const t=ya(e.museumId),n=Kd(e.museumId,e.sceneId);t&&n?await this.showScene(t,n):(this.showError("未找到指定的场景"),t?xa(t.id):bo())}else{const t=ya(e.museumId);t?this.showSceneList(t):(this.showError("未找到指定的展馆"),bo())}}showMuseumList(){this.config&&(this.titleBar=new vc(this.config.appName),this.appElement.appendChild(this.titleBar.getElement()),this.museumList=new T_(this.config.museums),this.appElement.appendChild(this.museumList.getElement()))}showSceneList(e){this.titleBar=new vc(e.name),this.appElement.appendChild(this.titleBar.getElement());const t=document.createElement("div");t.className="scene-list-page",t.innerHTML=`
      <div class="scene-list-container">
        <h1 class="scene-list-title">${e.name} - 场景列表</h1>
        ${e.description?`<p class="scene-list-desc">${e.description}</p>`:""}
        <div class="scene-grid">
          ${e.scenes.map(i=>`
            <div class="scene-card" data-scene-id="${i.id}">
              <div class="scene-cover">
                <img src="${i.thumb}" alt="${i.name}" loading="lazy">
                <div class="scene-overlay">
                  <h2 class="scene-name">${i.name}</h2>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;const n=document.createElement("style");n.textContent=`
      .scene-list-page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding-top: calc(44px + env(safe-area-inset-top, 0px));
      }
      .scene-list-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .scene-list-title {
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
      }
      .scene-list-desc {
        max-width: 820px;
        margin: -12px auto 26px;
        color: rgba(255,255,255,0.92);
        font-size: 15px;
        line-height: 1.6;
        text-align: center;
      }
      .scene-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
      .scene-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }
      .scene-card:active {
        transform: scale(0.98);
      }
      .scene-cover {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        overflow: hidden;
      }
      .scene-cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .scene-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 15px;
        color: #fff;
      }
      .scene-name {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }
    `,document.head.appendChild(n),t.querySelectorAll(".scene-card").forEach(i=>{i.addEventListener("click",()=>{const r=i.getAttribute("data-scene-id");r&&Qt(e.id,r)})}),this.appElement.appendChild(t)}async showScene(e,t){var _,g,m;this.currentMuseum=e,this.currentScene=t,this.loading.show();const n=document.createElement("div");n.className="viewer-container",n.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `,this.appElement.appendChild(n);const i=eh();this.panoViewer=new w_(n,i);const r=hy();try{this.topRightControls=new s0({viewerRootEl:n,onTogglePickMode:r?()=>this.panoViewer?(this.panoViewer.isPickModeEnabled()?this.panoViewer.disablePickMode():this.panoViewer.enablePickMode(),this.panoViewer.isPickModeEnabled()):!1:void 0,onOpenNorthCalibration:r?()=>{this.openNorthCalibration(t.id)}:void 0,showNorthCalibration:r,onToggleVrMode:async()=>this.toggleVrModeFromUI(n)}),this.appElement.appendChild(this.topRightControls.getElement())}catch(u){ct&&console.debug("[showScene] TopRightControls 创建失败，跳过:",u),this.topRightControls=null}this.sceneTitleEl=document.createElement("div"),this.sceneTitleEl.className="vr-scenetitle",this.sceneTitleEl.textContent=t.name||((_=this.config)==null?void 0:_.appName)||"VR Player",this.appElement.appendChild(this.sceneTitleEl);const a=u=>{const b=u,{x:y,y:T,yaw:I,pitch:C}=b.detail;if(Z_({yaw:I,pitch:C,ts:Date.now()}),Ze(`已复制 yaw: ${I.toFixed(2)}, pitch: ${C.toFixed(2)}`),this.panoViewer){const A=this.panoViewer.getDomElement();O0(A,y,T)}};window.addEventListener("vr:pick",a);const o=u=>{const b=u;this.panoViewer&&!b.detail.enabled&&this.panoViewer.isPickModeEnabled()&&this.panoViewer.disablePickMode()};window.addEventListener("vr:pickmode",o);try{if(this.appElement.querySelector(".vr-brandmark"))ct&&console.debug("[showScene] BrandMark 已存在，跳过重复创建");else{this.brandMark=new a0({appName:(g=this.config)==null?void 0:g.appName,brandText:"鼎虎清源"});const b=this.brandMark.getElement();b.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),this.openDingHuQingYuan()}),this.appElement.appendChild(b)}}catch(u){ct&&console.debug("[showScene] BrandMark 创建失败，跳过:",u),this.brandMark=null}if(i){this.debugPanel=new $_,this.appElement.appendChild(this.debugPanel.getElement()),this.panoViewer.setOnDebugClick((b,y,T,I,C)=>{this.debugPanel&&this.debugPanel.show(b,y,T,I,C)});const u=()=>{if(this.debugPanel&&this.panoViewer){const b=this.panoViewer.getCurrentView();this.debugPanel.updateView(b.yaw,b.pitch,b.fov)}requestAnimationFrame(u)};u()}try{this.videoPlayer=new W_,this.appElement.appendChild(this.videoPlayer.getElement())}catch(u){ct&&console.debug("[showScene] VideoPlayer 创建失败，跳过:",u),this.videoPlayer=null}try{this.guideTray=new I0({museumId:e.id,currentSceneId:t.id,scenes:e.scenes,onSceneClick:u=>{Qt(e.id,u)},onMoreClick:()=>{if(!this.sceneGuideDrawer)try{this.sceneGuideDrawer=new C0({museumId:e.id,currentSceneId:t.id,scenes:e.scenes,onClose:()=>{}}),this.appElement.appendChild(this.sceneGuideDrawer.getElement())}catch(u){ct&&console.debug("[GuideTray] SceneGuideDrawer 创建失败:",u)}this.guideTray&&this.guideTray.setVisible(!1),this.sceneGuideDrawer&&this.sceneGuideDrawer.open()},onClose:()=>{this.guideTray&&this.guideTray.setVisible(!1),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"guide"}}))}}),this.guideTray.setVisible(!1),this.appElement.appendChild(this.guideTray.getElement())}catch(u){ct&&console.debug("[showScene] GuideTray 创建失败，跳过:",u),this.guideTray=null}const l=new Map;e.scenes.forEach(u=>{let b;if(u.panoLow){const y=zt(u.panoLow,Ht.PANO_LOW);y&&(b=y)}else if(u.pano){const y=zt(u.pano,Ht.PANO);y&&(b=y)}l.set(u.id,{title:u.name,thumb:u.thumb,panoUrl:b})});try{this.bottomDock=new A0({onGuideClick:()=>{this.guideTray&&this.guideTray.setVisible(!0)},onOpenInfo:()=>this.openInfoModal(),onOpenSettings:()=>this.openSettingsModal(),sceneId:t.id,sceneName:t.name,museum:e,scenes:e.scenes,currentSceneId:t.id}),this.appElement.appendChild(this.bottomDock.getElement())}catch(u){ct&&console.debug("[showScene] BottomDock 创建失败，跳过:",u),this.bottomDock=null}try{this.topModeTabs=new L0({initialMode:this.mode,onModeChange:u=>{this.setMode(u)}}),this.appElement.appendChild(this.topModeTabs.getElement())}catch(u){ct&&console.debug("[showScene] TopModeTabs 创建失败，跳过:",u),this.topModeTabs=null}try{const u=new Map(e.scenes.map(b=>[b.id,b.name]));this.hotspots=new G_(this.panoViewer,t.hotspots,{resolveSceneName:b=>u.get(b),onEnterScene:b=>{Qt(e.id,b)},museumId:e.id}),n.appendChild(this.hotspots.getElement())}catch(u){ct&&console.debug("[showScene] Hotspots 创建失败，跳过:",u),this.hotspots=null}try{this.qualityIndicator=new a_,this.appElement.appendChild(this.qualityIndicator.getElement())}catch(u){ct&&console.debug("[showScene] QualityIndicator 创建失败，跳过:",u),this.qualityIndicator=null}this.panoViewer.setOnStatusChange(u=>{this.qualityIndicator&&this.qualityIndicator.updateStatus(u)}),this.panoViewer.setOnLoad(()=>{this.loading.hide(),this.hideUIError(),this.preloadNextScene(e,t)}),this.panoViewer.setOnError(u=>{console.error("加载场景失败:",u),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),this.qualityIndicator&&this.qualityIndicator.updateStatus(at.ERROR)});const c=xo(),d=c.yaw!==void 0?c.yaw:t.initialView.yaw||0,h=c.pitch!==void 0?c.pitch:t.initialView.pitch||0,p=c.fov!==void 0?c.fov:t.initialView.fov||75,f=-d;this.panoViewer.setView(f,h,p),this.panoViewer.loadScene(t),this.panoViewer.setSceneData(e.id,t.id,t.hotspots);try{const u=(m=this.config)==null?void 0:m.fcChat;if(u!=null&&u.endpoint&&u.endpoint.trim()){const b={endpoint:u.endpoint,authToken:u.authToken,timeoutMs:15e3},y=new Z0(b);this.fcChatPanel=new X0(y,{museumId:e.id,sceneId:t.id,sceneTitle:t.name,museumName:e.name,url:window.location.href})}}catch(u){ct&&console.debug("[showScene] FcChatPanel 创建失败，跳过:",u),this.fcChatPanel=null}}preloadNextScene(e,t){const i=(e.scenes.findIndex(a=>a.id===t.id)+1)%e.scenes.length,r=e.scenes[i];r&&r.thumb&&Promise.all([Di(()=>Promise.resolve().then(()=>s_),void 0,import.meta.url),Di(()=>Promise.resolve().then(()=>_d),void 0,import.meta.url)]).then(([{resolveAssetUrl:a,AssetType:o},{toProxiedImageUrl:l}])=>{const c=a(r.thumb,o.THUMB);if(c){const d=new Image;d.referrerPolicy="no-referrer",d.crossOrigin="anonymous",d.loading="lazy",d.decoding="async",d.src=l(c)}})}clearView(){if(this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.topRightControls&&(this.topRightControls.remove(),this.topRightControls=null),this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),this.topModeTabs&&(this.topModeTabs.getElement().remove(),this.topModeTabs=null),this.sceneTitleEl&&(this.sceneTitleEl.remove(),this.sceneTitleEl=null),this.brandMark&&(this.brandMark.remove(),this.brandMark=null),this.bottomDock&&(this.bottomDock.remove(),this.bottomDock=null),this.guideTray&&(this.guideTray.remove(),this.guideTray=null),this.sceneGuideDrawer&&(this.sceneGuideDrawer.remove(),this.sceneGuideDrawer=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneList&&(this.sceneList.remove(),this.sceneList=null),this.mapOverlay&&(this.mapOverlay.remove(),this.mapOverlay=null),this.hotspots&&(this.hotspots.remove(),this.hotspots=null),this.videoPlayer&&(this.videoPlayer.remove(),this.videoPlayer=null),this.controlBar&&(this.controlBar.remove(),this.controlBar=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),this.qualityIndicator&&(this.qualityIndicator.remove(),this.qualityIndicator=null),this.structureView2D){const e=this.structureView2D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView2D=null}if(this.structureView3D){const e=this.structureView3D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView3D=null}this.isStructureOverlayOpen=!1,this.fcChatPanel&&(this.fcChatPanel.remove(),this.fcChatPanel=null),this.mode="tour",this.appElement.innerHTML="",this.appElement.appendChild(this.loading.getElement())}hideUIError(){this.uiErrorElement&&this.uiErrorElement.parentNode&&(this.uiErrorElement.parentNode.removeChild(this.uiErrorElement),this.uiErrorElement=null)}setMode(e){this.mode!==e&&(this.mode,this.mode=e,this.topModeTabs&&this.topModeTabs.setMode(e),e==="tour"&&this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),e==="structure2d"?this.openStructure2D():e==="structure3d"&&this.openStructure3D())}openStructure2D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1});const e=Tc(this.currentMuseum,this.currentScene.id);this.structureView2D?this.structureView2D.updateContext({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id}):(this.structureView2D=new N0({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(t,n)=>{this.closeStructureOverlay({toTour:!1}),Qt(t,n)}}),this.appElement.appendChild(this.structureView2D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView2D.open()}openStructure3D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1});const e=Tc(this.currentMuseum,this.currentScene.id);this.structureView3D?this.structureView3D.updateContext({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id}):(this.structureView3D=new U0({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(t,n)=>{this.closeStructureOverlay({toTour:!1}),Qt(t,n)}}),this.appElement.appendChild(this.structureView3D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView3D.open()}closeStructureOverlay(e){if(this.isStructureOverlayOpen){if(this.isStructureOverlayOpen=!1,this.structureView2D){const t=this.structureView2D.getElement();t&&t.parentNode&&t.parentNode.removeChild(t),this.structureView2D=null}if(this.structureView3D){const t=this.structureView3D.getElement();t&&t.parentNode&&t.parentNode.removeChild(t),this.structureView3D=null}document.body.style.overflow="",document.body.style.touchAction="",document.body.style.overscrollBehavior="",e.toTour&&(this.mode="tour",this.topModeTabs&&this.topModeTabs.setMode("tour"))}}openNorthCalibration(e){if(this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),!this.panoViewer){console.warn("[openNorthCalibration] PanoViewer 未初始化");return}try{this.northCalibrationPanel=new Y0({getCurrentYaw:()=>{var n;const t=(n=this.panoViewer)==null?void 0:n.getCurrentView();return(t==null?void 0:t.yaw)??0},sceneId:e,onClose:()=>{this.northCalibrationPanel=null}})}catch(t){console.error("[openNorthCalibration] 创建校准面板失败:",t),this.northCalibrationPanel=null}}showError(e){this.hideUIError(),this.uiErrorElement=document.createElement("div"),this.uiErrorElement.className="error-message",this.uiErrorElement.textContent=e,this.uiErrorElement.style.cssText=`
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
    `,this.appElement.appendChild(this.uiErrorElement),setTimeout(()=>{this.hideUIError()},3e3)}openDingHuQingYuan(){if(this.brandMark)try{this.brandMark.getAboutModal().open()}catch(e){ct&&console.debug("[openDingHuQingYuan] 打开团队介绍失败:",e)}}openInfoModal(){var r,a,o;(r=this.infoModalMounted)==null||r.close(),this.infoModalMounted=null;const e=((a=this.currentMuseum)==null?void 0:a.name)||"-",t=((o=this.currentScene)==null?void 0:o.name)||"-",n=document.createElement("div");n.className="vr-modal-info-list",n.innerHTML=`
      <div><span class="vr-modal-info-row-label">展馆</span><span>${e}</span></div>
      <div><span class="vr-modal-info-row-label">场景</span><span>${t}</span></div>
      <div><span class="vr-modal-info-row-label">采集时间</span><span> 2025-12-27</span></div>
      <div class="vr-modal-info-copyright">
        <button type="button" role="button" class="vr-modal-info-copyright-btn">© 2025 鼎虎清源</button>
      </div>
    `;const i=n.querySelector(".vr-modal-info-copyright-btn");i&&i.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),this.infoModalMounted&&this.infoModalMounted.close(),setTimeout(()=>{this.openDingHuQingYuan()},0)}),this.infoModalMounted=vr({title:"信息",contentEl:n,onClose:()=>{this.infoModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"info"}}))}})}async toggleVrModeFromUI(e){if(!this.panoViewer)return!1;if(Qs())return Bd(),this.panoViewer.setVrModeEnabled(!1),this.topRightControls&&this.topRightControls.updateVrModeState(!1),await Oa(),!1;{try{await Cd(e)}catch(r){return ct&&console.debug("[VRMode] fullscreen request failed",r),!1}const n=this.panoViewer.getCurrentView();return ly(()=>{var r;return((r=this.panoViewer)==null?void 0:r.isInteracting())??!1}),await cy((r,a)=>{if(this.panoViewer){const o=n.yaw+r,l=Math.max(-90,Math.min(90,n.pitch+a));this.panoViewer.setView(o,l)}})?(this.panoViewer.setVrModeEnabled(!0),this.topRightControls&&this.topRightControls.updateVrModeState(!0),!0):(await Oa(),!1)}}openSettingsModal(){var w;(w=this.settingsModalMounted)==null||w.close(),this.settingsModalMounted=null;const e=Td(),t=Ad(),n=Na(),i=document.createElement("div");i.className="vr-modal-settings-list";const r=document.createElement("div");r.className="vr-modal-settings-item-label",r.textContent="画质";const a=document.createElement("div");a.className="vr-modal-settings-quality";const o=document.createElement("button");o.className="vr-modal-settings-quality-btn",o.textContent="高清",o.dataset.level="high";const l=document.createElement("button");l.className="vr-modal-settings-quality-btn",l.textContent="省流",l.dataset.level="low";const c=D=>{o.classList.toggle("is-active",D==="high"),l.classList.toggle("is-active",D==="low")};c(n);const d=D=>{!this.currentScene||!this.panoViewer||Na()===D||(o_(D),c(D),this.panoViewer.loadScene(this.currentScene,{preserveView:!0}))};o.addEventListener("click",()=>d("high")),l.addEventListener("click",()=>d("low")),a.appendChild(o),a.appendChild(l);const h=document.createElement("div");h.appendChild(r),h.appendChild(a);const p=document.createElement("div");p.className="vr-modal-settings-item-label",p.textContent="视角";const f=document.createElement("button");f.className="vr-modal-settings-row-btn",f.type="button",f.textContent="恢复初始视角",f.addEventListener("click",()=>{if(!this.currentScene||!this.panoViewer)return;const D=this.currentScene.initialView||{yaw:0,pitch:0,fov:75},te=-(D.yaw||0),P=D.pitch||0,U=D.fov??75;this.panoViewer.setView(te,P,U)});const _=document.createElement("div");_.appendChild(p),_.appendChild(f);const g=document.createElement("div");g.className="vr-modal-settings-item-label",g.textContent="VR 眼镜";const m=document.createElement("button");m.className="vr-modal-settings-row-btn",m.type="button",m.textContent="VR 眼镜";const u=()=>{const D=Qs();m.classList.toggle("is-on",D)};if(e)u(),m.addEventListener("click",async()=>{if(!this.panoViewer)return;const D=this.panoViewer.getDomElement(),G=await this.toggleVrModeFromUI(D);Qs(),u()});else if(t){m.classList.add("is-disabled");const D=()=>{Ze("移动端可体验此功能",1500)};m.addEventListener("mouseenter",D),m.addEventListener("click",D)}const b=document.createElement("div");b.appendChild(g),b.appendChild(m);const y=document.createElement("div");y.className="vr-modal-settings-item-label",y.textContent="缩放";const T=document.createElement("div");T.className="vr-modal-settings-quality",T.style.gap="8px";const I=document.createElement("button");I.className="vr-modal-settings-quality-btn",I.textContent="缩小",I.style.minWidth="70px";const C=document.createElement("button");C.className="vr-modal-settings-quality-btn",C.textContent="放大",C.style.minWidth="70px";const A=()=>{if(!this.panoViewer)return;const D=this.panoViewer.getCurrentView(),G=Math.min(120,D.fov*1.12);this.panoViewer.setFov(G)},H=()=>{if(!this.panoViewer)return;const D=this.panoViewer.getCurrentView(),G=Math.max(30,D.fov/1.12);this.panoViewer.setFov(G)};I.addEventListener("click",A),C.addEventListener("click",H),T.appendChild(I),T.appendChild(C);const E=document.createElement("div");E.appendChild(y),E.appendChild(T),i.appendChild(h),i.appendChild(_),i.appendChild(E),i.appendChild(b),this.bottomDock&&this.bottomDock.setMoreOpen(!0),this.settingsModalMounted=vr({title:"更多",contentEl:i,panelClassName:"vr-modal-settings",onClose:()=>{this.bottomDock&&this.bottomDock.setMoreOpen(!1),this.settingsModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"settings"}}))}})}}new uy;export{Ey as $,$a as A,qt as B,He as C,pd as D,Hi as E,wy as F,Za as G,an as H,xy as I,kn as J,je as K,gs as L,fy as M,Rr as N,ht as O,Xn as P,Mn as Q,us as R,Ry as S,my as T,Ot as U,R as V,yy as W,dt as X,Lv as Y,qa as Z,by as _,Se as a,Li as a0,Ct as a1,td as a2,dd as a3,My as a4,Tv as a5,ar as a6,or as a7,pr as a8,It as a9,mr as aa,fr as ab,ms as ac,Ke as ad,Fn as ae,Mr as af,ln as ag,wn as ah,gt as b,gy as c,_y as d,vy as e,Iy as f,Sy as g,Sn as h,ft as i,Ay as j,Cy as k,Ge as l,Ql as m,Ty as n,Ly as o,Sv as p,ni as q,Oh as r,Io as s,kt as t,St as u,wa as v,Ta as w,pt as x,Rv as y,Bn as z};
