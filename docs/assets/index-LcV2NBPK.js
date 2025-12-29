var Ld=Object.defineProperty;var Rd=(s,e,t)=>e in s?Ld(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var _=(s,e,t)=>Rd(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Pd="modulepreload",Nd=function(s,e){return new URL(s,e).href},ro={},Zs=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(c=>{if(c=Nd(c,n),c in ro)return;ro[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(!!n)for(let v=a.length-1;v>=0;v--){const g=a[v];if(g.href===c&&(!d||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Pd,d||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),d)return new Promise((v,g)=>{f.addEventListener("load",v),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return i.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};var te=(s=>(s.INVALID_ROOT="INVALID_ROOT",s.MISSING_APP_NAME="MISSING_APP_NAME",s.MUSEUMS_NOT_ARRAY="MUSEUMS_NOT_ARRAY",s.MUSEUMS_EMPTY="MUSEUMS_EMPTY",s.MISSING_MUSEUM_ID="MISSING_MUSEUM_ID",s.DUPLICATE_MUSEUM_ID="DUPLICATE_MUSEUM_ID",s.MISSING_MUSEUM_NAME="MISSING_MUSEUM_NAME",s.MISSING_MUSEUM_COVER="MISSING_MUSEUM_COVER",s.MISSING_MUSEUM_MAP="MISSING_MUSEUM_MAP",s.MISSING_MAP_IMAGE="MISSING_MAP_IMAGE",s.INVALID_MAP_WIDTH="INVALID_MAP_WIDTH",s.INVALID_MAP_HEIGHT="INVALID_MAP_HEIGHT",s.SCENES_NOT_ARRAY="SCENES_NOT_ARRAY",s.SCENES_EMPTY="SCENES_EMPTY",s.MISSING_SCENE_ID="MISSING_SCENE_ID",s.DUPLICATE_SCENE_ID="DUPLICATE_SCENE_ID",s.MISSING_SCENE_NAME="MISSING_SCENE_NAME",s.MISSING_PANO="MISSING_PANO",s.INVALID_PANO_URL="INVALID_PANO_URL",s.INVALID_PANOLOW_URL="INVALID_PANOLOW_URL",s.MISSING_THUMB="MISSING_THUMB",s.MISSING_INITIAL_VIEW="MISSING_INITIAL_VIEW",s.INVALID_YAW="INVALID_YAW",s.INVALID_PITCH="INVALID_PITCH",s.INVALID_FOV="INVALID_FOV",s.MISSING_MAP_POINT="MISSING_MAP_POINT",s.INVALID_MAP_POINT_X="INVALID_MAP_POINT_X",s.INVALID_MAP_POINT_Y="INVALID_MAP_POINT_Y",s.HOTSPOTS_NOT_ARRAY="HOTSPOTS_NOT_ARRAY",s.MISSING_HOTSPOT_ID="MISSING_HOTSPOT_ID",s.DUPLICATE_HOTSPOT_ID="DUPLICATE_HOTSPOT_ID",s.INVALID_HOTSPOT_TYPE="INVALID_HOTSPOT_TYPE",s.MISSING_HOTSPOT_LABEL="MISSING_HOTSPOT_LABEL",s.INVALID_HOTSPOT_YAW="INVALID_HOTSPOT_YAW",s.INVALID_HOTSPOT_PITCH="INVALID_HOTSPOT_PITCH",s.MISSING_HOTSPOT_TARGET="MISSING_HOTSPOT_TARGET",s.MISSING_TARGET_MUSEUM_ID="MISSING_TARGET_MUSEUM_ID",s.MISSING_TARGET_SCENE_ID="MISSING_TARGET_SCENE_ID",s.INVALID_TARGET_YAW="INVALID_TARGET_YAW",s.INVALID_TARGET_PITCH="INVALID_TARGET_PITCH",s.INVALID_TARGET_FOV="INVALID_TARGET_FOV",s.MISSING_TARGET_URL="MISSING_TARGET_URL",s))(te||{});function xc(s){const e=[];if(!s||typeof s!="object")return e.push({code:"INVALID_ROOT",path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!s.appName||typeof s.appName!="string"||s.appName.trim()==="")&&e.push({code:"MISSING_APP_NAME",path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!Array.isArray(s.museums))return e.push({code:"MUSEUMS_NOT_ARRAY",path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;s.museums.length===0&&e.push({code:"MUSEUMS_EMPTY",path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const t=new Set;return s.museums.forEach((n,i)=>{const r=`museums[${i}]`,a=n.name&&typeof n.name=="string"?n.name:void 0;if(!n.id||typeof n.id!="string"||n.id.trim()===""?e.push({code:"MISSING_MUSEUM_ID",path:`${r}.id`,message:"id 必须是非空字符串",museumName:a,fieldName:"博物馆 ID"}):(t.has(n.id)&&e.push({code:"DUPLICATE_MUSEUM_ID",path:`${r}.id`,message:`博物馆 ID "${n.id}" 重复`,museumName:a,fieldName:"博物馆 ID"}),t.add(n.id)),(!n.name||typeof n.name!="string"||n.name.trim()==="")&&e.push({code:"MISSING_MUSEUM_NAME",path:`${r}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),(!n.cover||typeof n.cover!="string"||n.cover.trim()==="")&&e.push({code:"MISSING_MUSEUM_COVER",path:`${r}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:a,fieldName:"封面图"}),!n.map||typeof n.map!="object"?e.push({code:"MISSING_MUSEUM_MAP",path:`${r}.map`,message:"map 必须是对象",museumName:a,fieldName:"地图配置"}):((!n.map.image||typeof n.map.image!="string"||n.map.image.trim()==="")&&e.push({code:"MISSING_MAP_IMAGE",path:`${r}.map.image`,message:"map.image 必须是有效的 URL 字符串",museumName:a,fieldName:"地图图片"}),(typeof n.map.width!="number"||n.map.width<=0)&&e.push({code:"INVALID_MAP_WIDTH",path:`${r}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:a,fieldName:"地图宽度"}),(typeof n.map.height!="number"||n.map.height<=0)&&e.push({code:"INVALID_MAP_HEIGHT",path:`${r}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:a,fieldName:"地图高度"})),!Array.isArray(n.scenes))e.push({code:"SCENES_NOT_ARRAY",path:`${r}.scenes`,message:"scenes 必须是数组",museumName:a,fieldName:"场景列表"});else{n.scenes.length===0&&e.push({code:"SCENES_EMPTY",path:`${r}.scenes`,message:"scenes 数组不能为空",museumName:a,fieldName:"场景列表"});const o=new Set;n.scenes.forEach((l,c)=>{const d=`${r}.scenes[${c}]`,h=l.name&&typeof l.name=="string"?l.name:void 0;if(!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:"MISSING_SCENE_ID",path:`${d}.id`,message:"id 必须是非空字符串",museumName:a,sceneName:h,fieldName:"场景 ID"}):(o.has(l.id)&&e.push({code:"DUPLICATE_SCENE_ID",path:`${d}.id`,message:`场景 ID "${l.id}" 在博物馆内重复`,museumName:a,sceneName:h,fieldName:"场景 ID"}),o.add(l.id)),(!l.name||typeof l.name!="string"||l.name.trim()==="")&&e.push({code:"MISSING_SCENE_NAME",path:`${d}.name`,message:"name 必须是非空字符串",museumName:a,sceneName:void 0,fieldName:"场景名称"}),!l.pano&&!l.panoLow?e.push({code:"MISSING_PANO",path:`${d}.pano`,message:"pano 或 panoLow 至少需要提供一个",museumName:a,sceneName:h,fieldName:"全景图"}):(l.pano&&(typeof l.pano!="string"||l.pano.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${d}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"高清全景图"}),l.panoLow&&(typeof l.panoLow!="string"||l.panoLow.trim()==="")&&e.push({code:"INVALID_PANOLOW_URL",path:`${d}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"低清全景图"})),(!l.thumb||typeof l.thumb!="string"||l.thumb.trim()==="")&&e.push({code:"MISSING_THUMB",path:`${d}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"缩略图"}),!l.initialView||typeof l.initialView!="object"?e.push({code:"MISSING_INITIAL_VIEW",path:`${d}.initialView`,message:"initialView 必须是对象",museumName:a,sceneName:h,fieldName:"初始视角"}):(typeof l.initialView.yaw!="number"&&e.push({code:"INVALID_YAW",path:`${d}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:a,sceneName:h,fieldName:"水平角度"}),typeof l.initialView.pitch!="number"&&e.push({code:"INVALID_PITCH",path:`${d}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:a,sceneName:h,fieldName:"垂直角度"}),l.initialView.fov!==void 0&&typeof l.initialView.fov!="number"&&e.push({code:"INVALID_FOV",path:`${d}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:a,sceneName:h,fieldName:"视野角度"})),!l.mapPoint||typeof l.mapPoint!="object"?e.push({code:"MISSING_MAP_POINT",path:`${d}.mapPoint`,message:"mapPoint 必须是对象",museumName:a,sceneName:h,fieldName:"地图点位"}):(typeof l.mapPoint.x!="number"&&e.push({code:"INVALID_MAP_POINT_X",path:`${d}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:a,sceneName:h,fieldName:"地图点位 X 坐标"}),typeof l.mapPoint.y!="number"&&e.push({code:"INVALID_MAP_POINT_Y",path:`${d}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:a,sceneName:h,fieldName:"地图点位 Y 坐标"})),!Array.isArray(l.hotspots))e.push({code:"HOTSPOTS_NOT_ARRAY",path:`${d}.hotspots`,message:"hotspots 必须是数组",museumName:a,sceneName:h,fieldName:"热点列表"});else{const u=new Set;l.hotspots.forEach((f,v)=>{const g=`${d}.hotspots[${v}]`;!f.id||typeof f.id!="string"||f.id.trim()===""?e.push({code:"MISSING_HOTSPOT_ID",path:`${g}.id`,message:"id 必须是非空字符串",museumName:a,sceneName:h,fieldName:"热点 ID"}):(u.has(f.id)&&e.push({code:"DUPLICATE_HOTSPOT_ID",path:`${g}.id`,message:`热点 ID "${f.id}" 在场景内重复`,museumName:a,sceneName:h,fieldName:"热点 ID"}),u.add(f.id)),f.type!=="scene"&&f.type!=="video"&&f.type!=="image"&&f.type!=="info"&&e.push({code:"INVALID_HOTSPOT_TYPE",path:`${g}.type`,message:'type 必须是 "scene"、"video"、"image" 或 "info"',museumName:a,sceneName:h,fieldName:"热点类型"}),(!f.label||typeof f.label!="string"||f.label.trim()==="")&&e.push({code:"MISSING_HOTSPOT_LABEL",path:`${g}.label`,message:"label 必须是非空字符串",museumName:a,sceneName:h,fieldName:"热点标签"}),typeof f.yaw!="number"&&e.push({code:"INVALID_HOTSPOT_YAW",path:`${g}.yaw`,message:"yaw 必须是数字",museumName:a,sceneName:h,fieldName:"热点水平角度"}),typeof f.pitch!="number"&&e.push({code:"INVALID_HOTSPOT_PITCH",path:`${g}.pitch`,message:"pitch 必须是数字",museumName:a,sceneName:h,fieldName:"热点垂直角度"}),f.type==="scene"?!f.target||typeof f.target!="object"?e.push({code:"MISSING_HOTSPOT_TARGET",path:`${g}.target`,message:"scene 类型热点必须提供 target 对象",museumName:a,sceneName:h,fieldName:"热点目标配置"}):((!f.target.museumId||typeof f.target.museumId!="string")&&e.push({code:"MISSING_TARGET_MUSEUM_ID",path:`${g}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:a,sceneName:h,fieldName:"目标博物馆 ID"}),typeof f.target.sceneId!="string"&&e.push({code:"MISSING_TARGET_SCENE_ID",path:`${g}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）",museumName:a,sceneName:h,fieldName:"目标场景 ID"}),f.target.yaw!==void 0&&typeof f.target.yaw!="number"&&e.push({code:"INVALID_TARGET_YAW",path:`${g}.target.yaw`,message:"target.yaw 必须是数字",museumName:a,sceneName:h,fieldName:"目标水平角度"}),f.target.pitch!==void 0&&typeof f.target.pitch!="number"&&e.push({code:"INVALID_TARGET_PITCH",path:`${g}.target.pitch`,message:"target.pitch 必须是数字",museumName:a,sceneName:h,fieldName:"目标垂直角度"}),f.target.fov!==void 0&&typeof f.target.fov!="number"&&e.push({code:"INVALID_TARGET_FOV",path:`${g}.target.fov`,message:"target.fov 必须是数字",museumName:a,sceneName:h,fieldName:"目标视野角度"})):f.type==="video"&&f.target&&typeof f.target!="object"&&e.push({code:"MISSING_HOTSPOT_TARGET",path:`${g}.target`,message:"video 类型热点的 target 必须是对象（如果提供）",museumName:a,sceneName:h,fieldName:"热点目标配置"})})}})}}),e}let Yn=null;async function ao(){if(Yn)return Yn;try{const s=await fetch("./config.json",{cache:"no-store"});if(!s.ok)throw new Error(`加载配置失败: ${s.status}`);const e=await s.json(),t=xc(e);if(t.length>0){const n=new Error("配置校验失败");throw n.validationErrors=t,n}return Yn=e,Yn}catch(s){throw console.error("加载配置失败:",s),s}}function oo(){Yn=null}function ha(s){if(Yn)return Yn.museums.find(e=>e.id===s)}function Dd(s,e){const t=ha(s);if(t)return t.scenes.find(n=>n.id===e)}function yc(s){const e=new URL(window.location.href);return e.search="",Object.entries(s).forEach(([t,n])=>{n!=null&&n!==""&&e.searchParams.set(t,String(n))}),e.pathname+e.search+e.hash}function Ud(){return window.location.pathname}function Od(){if(window.location.pathname.includes("//")){const s=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",s+window.location.search+window.location.hash)}}let lo=null,co=0;const Fd=200;function Zt(s){if(s.type==="focus"){const e=`${s.museumId}:${s.sceneId}`,t=Date.now();if(e===lo&&t-co<Fd)return;lo=e,co=t}window.dispatchEvent(new CustomEvent("vr:scene-focus",{detail:s}))}function hr(s){const e=t=>{s(t.detail)};return window.addEventListener("vr:scene-focus",e),()=>{window.removeEventListener("vr:scene-focus",e)}}function ho(){const s=new URLSearchParams(window.location.search),e=s.get("yaw"),t=s.get("pitch"),n=s.get("fov");return{museumId:s.get("museum")||void 0,sceneId:s.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:t?parseFloat(t):void 0,fov:n?parseFloat(n):void 0}}function kd(){return new URLSearchParams(window.location.search).get("debug")==="1"}function Bd(){const s=new URLSearchParams(window.location.search);return s.get("editor")==="1"||s.get("debug")==="1"}function uo(){const s=Ud();window.history.pushState({},"",s),window.dispatchEvent(new Event("popstate"))}function ua(s){const e=yc({museum:s});window.history.pushState({},"",e),window.dispatchEvent(new Event("popstate"))}function jt(s,e,t){const n=yc({museum:s,scene:e,yaw:t==null?void 0:t.yaw,pitch:t==null?void 0:t.pitch,fov:t==null?void 0:t.fov});window.history.pushState({},"",n),Zt({type:"focus",museumId:s,sceneId:e,source:"dock",ts:Date.now()}),window.dispatchEvent(new Event("popstate"))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ia="160",W0={ROTATE:0,DOLLY:1,PAN:2},Y0={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Vd=0,po=1,Hd=2,bc=1,zd=2,fn=3,Nn=0,Ut=1,tn=2,Rn=0,wi=1,fo=2,mo=3,go=4,Gd=5,Gn=100,Wd=101,Yd=102,vo=103,_o=104,Xd=200,qd=201,$d=202,jd=203,pa=204,fa=205,Kd=206,Zd=207,Jd=208,Qd=209,eh=210,th=211,nh=212,ih=213,sh=214,rh=0,ah=1,oh=2,Js=3,lh=4,ch=5,dh=6,hh=7,Ec=0,uh=1,ph=2,vn=0,fh=1,mh=2,gh=3,Sc=4,vh=5,_h=6,xo="attached",xh="detached",Mc=300,Ai=301,Ci=302,ma=303,ga=304,ur=306,va=1e3,Kt=1001,_a=1002,yt=1003,yo=1004,wr=1005,Dt=1006,yh=1007,Kn=1008,Pn=1009,bh=1010,Eh=1011,La=1012,wc=1013,In=1014,mn=1015,is=1016,Tc=1017,Ac=1018,qn=1020,Sh=1021,zt=1023,Mh=1024,wh=1025,$n=1026,Ii=1027,Th=1028,Cc=1029,Ah=1030,Ic=1031,Lc=1033,Tr=33776,Ar=33777,Cr=33778,Ir=33779,bo=35840,Eo=35841,So=35842,Mo=35843,Rc=36196,wo=37492,To=37496,Ao=37808,Co=37809,Io=37810,Lo=37811,Ro=37812,Po=37813,No=37814,Do=37815,Uo=37816,Oo=37817,Fo=37818,ko=37819,Bo=37820,Vo=37821,Lr=36492,Ho=36494,zo=36495,Ch=36283,Go=36284,Wo=36285,Yo=36286,Qs=2300,er=2301,Rr=2302,Xo=2400,qo=2401,$o=2402,Ih=2500,X0=0,q0=1,$0=2,Pc=3e3,_n=3001,Lh=3200,Rh=3201,Nc=0,Ph=1,Gt="",ht="srgb",yn="srgb-linear",Ra="display-p3",pr="display-p3-linear",tr="linear",nt="srgb",nr="rec709",ir="p3",Qn=7680,jo=519,Nh=512,Dh=513,Uh=514,Dc=515,Oh=516,Fh=517,kh=518,Bh=519,xa=35044,Ko="300 es",ya=1035,gn=2e3,sr=2001;class Ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zo=1234567;const Zi=Math.PI/180,Li=180/Math.PI;function Jt(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(St[s&255]+St[s>>8&255]+St[s>>16&255]+St[s>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function bt(s,e,t){return Math.max(e,Math.min(t,s))}function Pa(s,e){return(s%e+e)%e}function Vh(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Hh(s,e,t){return s!==e?(t-s)/(e-s):0}function Ji(s,e,t){return(1-t)*s+t*e}function zh(s,e,t,n){return Ji(s,e,1-Math.exp(-t*n))}function Gh(s,e=1){return e-Math.abs(Pa(s,e*2)-e)}function Wh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Yh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Xh(s,e){return s+Math.floor(Math.random()*(e-s+1))}function qh(s,e){return s+Math.random()*(e-s)}function $h(s){return s*(.5-Math.random())}function jh(s){s!==void 0&&(Zo=s);let e=Zo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Kh(s){return s*Zi}function Zh(s){return s*Li}function ba(s){return(s&s-1)===0&&s!==0}function Jh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function rr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Qh(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),h=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),v=a((n-e)/2);switch(i){case"XYX":s.set(o*d,l*h,l*u,o*c);break;case"YZY":s.set(l*u,o*d,l*h,o*c);break;case"ZXZ":s.set(l*h,l*u,o*d,o*c);break;case"XZX":s.set(o*d,l*v,l*f,o*c);break;case"YXY":s.set(l*f,o*d,l*v,o*c);break;case"ZYZ":s.set(l*v,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function nn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function $e(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const xn={DEG2RAD:Zi,RAD2DEG:Li,generateUUID:Jt,clamp:bt,euclideanModulo:Pa,mapLinear:Vh,inverseLerp:Hh,lerp:Ji,damp:zh,pingpong:Gh,smoothstep:Wh,smootherstep:Yh,randInt:Xh,randFloat:qh,randFloatSpread:$h,seededRandom:jh,degToRad:Kh,radToDeg:Zh,isPowerOfTwo:ba,ceilPowerOfTwo:Jh,floorPowerOfTwo:rr,setQuaternionFromProperEuler:Qh,normalize:$e,denormalize:nn};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,i,r,a,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=i,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],f=n[5],v=n[8],g=i[0],m=i[3],p=i[6],E=i[1],x=i[4],T=i[7],R=i[2],A=i[5],C=i[8];return r[0]=a*g+o*E+l*R,r[3]=a*m+o*x+l*A,r[6]=a*p+o*T+l*C,r[1]=c*g+d*E+h*R,r[4]=c*m+d*x+h*A,r[7]=c*p+d*T+h*C,r[2]=u*g+f*E+v*R,r[5]=u*m+f*x+v*A,r[8]=u*p+f*T+v*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,u=o*l-d*r,f=c*r-a*l,v=t*h+n*u+i*f;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=h*g,e[1]=(i*c-d*n)*g,e[2]=(o*n-i*a)*g,e[3]=u*g,e[4]=(d*t-i*l)*g,e[5]=(i*r-o*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pr.makeScale(e,t)),this}rotate(e){return this.premultiply(Pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pr=new Ve;function Uc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ss(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function eu(){const s=ss("canvas");return s.style.display="block",s}const Jo={};function Qi(s){s in Jo||(Jo[s]=!0,console.warn(s))}const Qo=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),el=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ps={[yn]:{transfer:tr,primaries:nr,toReference:s=>s,fromReference:s=>s},[ht]:{transfer:nt,primaries:nr,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[pr]:{transfer:tr,primaries:ir,toReference:s=>s.applyMatrix3(el),fromReference:s=>s.applyMatrix3(Qo)},[Ra]:{transfer:nt,primaries:ir,toReference:s=>s.convertSRGBToLinear().applyMatrix3(el),fromReference:s=>s.applyMatrix3(Qo).convertLinearToSRGB()}},tu=new Set([yn,pr]),Ke={enabled:!0,_workingColorSpace:yn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!tu.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=ps[e].toReference,i=ps[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return ps[s].primaries},getTransfer:function(s){return s===Gt?tr:ps[s].transfer}};function Ti(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Nr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ei;class Oc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ei===void 0&&(ei=ss("canvas")),ei.width=e.width,ei.height=e.height;const n=ei.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ei}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ss("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Ti(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nu=0;class Fc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=Jt(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Dr(i[a].image)):r.push(Dr(i[a]))}else r=Dr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Dr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Oc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let iu=0;class Tt extends Ni{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=Kt,i=Kt,r=Dt,a=Kn,o=zt,l=Pn,c=Tt.DEFAULT_ANISOTROPY,d=Gt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Jt(),this.name="",this.source=new Fc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(Qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===_n?ht:Gt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case va:e.x=e.x-Math.floor(e.x);break;case Kt:e.x=e.x<0?0:1;break;case _a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case va:e.y=e.y-Math.floor(e.y);break;case Kt:e.y=e.y<0?0:1;break;case _a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ht?_n:Pc}set encoding(e){Qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===_n?ht:Gt}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Mc;Tt.DEFAULT_ANISOTROPY=1;class Ze{constructor(e=0,t=0,n=0,i=1){Ze.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],f=l[5],v=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-g)<.01&&Math.abs(v-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+g)<.1&&Math.abs(v+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,T=(f+1)/2,R=(p+1)/2,A=(d+u)/4,C=(h+g)/4,z=(v+m)/4;return x>T&&x>R?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=A/n,r=C/n):T>R?T<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(T),n=A/i,r=z/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=C/r,i=z/r),this.set(n,i,r,t),this}let E=Math.sqrt((m-v)*(m-v)+(h-g)*(h-g)+(u-d)*(u-d));return Math.abs(E)<.001&&(E=1),this.x=(m-v)/E,this.y=(h-g)/E,this.z=(u-d)/E,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class su extends Ni{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(Qi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===_n?ht:Gt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Tt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zn extends su{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kc extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=yt,this.minFilter=yt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ru extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=yt,this.minFilter=yt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let Di=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],d=n[i+2],h=n[i+3];const u=r[a+0],f=r[a+1],v=r[a+2],g=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=v,e[t+3]=g;return}if(h!==g||l!==u||c!==f||d!==v){let m=1-o;const p=l*u+c*f+d*v+h*g,E=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),A=Math.atan2(R,p*E);m=Math.sin(m*A)/R,o=Math.sin(o*A)/R}const T=o*E;if(l=l*m+u*T,c=c*m+f*T,d=d*m+v*T,h=h*m+g*T,m===1-o){const R=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=R,c*=R,d*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],d=n[i+3],h=r[a],u=r[a+1],f=r[a+2],v=r[a+3];return e[t]=o*v+d*h+l*f-c*u,e[t+1]=l*v+d*u+c*h-o*f,e[t+2]=c*v+d*f+o*u-l*h,e[t+3]=d*v-o*h-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(i/2),h=o(r/2),u=l(n/2),f=l(i/2),v=l(r/2);switch(a){case"XYZ":this._x=u*d*h+c*f*v,this._y=c*f*h-u*d*v,this._z=c*d*v+u*f*h,this._w=c*d*h-u*f*v;break;case"YXZ":this._x=u*d*h+c*f*v,this._y=c*f*h-u*d*v,this._z=c*d*v-u*f*h,this._w=c*d*h+u*f*v;break;case"ZXY":this._x=u*d*h-c*f*v,this._y=c*f*h+u*d*v,this._z=c*d*v+u*f*h,this._w=c*d*h-u*f*v;break;case"ZYX":this._x=u*d*h-c*f*v,this._y=c*f*h+u*d*v,this._z=c*d*v-u*f*h,this._w=c*d*h+u*f*v;break;case"YZX":this._x=u*d*h+c*f*v,this._y=c*f*h+u*d*v,this._z=c*d*v-u*f*h,this._w=c*d*h-u*f*v;break;case"XZY":this._x=u*d*h-c*f*v,this._y=c*f*h-u*d*v,this._z=c*d*v+u*f*h,this._w=c*d*h+u*f*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(d-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+i*c-r*l,this._y=i*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-i*o,this._w=a*d-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-t)*d)/c,u=Math.sin(t*d)/c;return this._w=a*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),d=2*(o*t-r*i),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*d,this.y=n+l*d+o*c-r*h,this.z=i+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ur.copy(this).projectOnVector(e),this.sub(Ur)}reflect(e){return this.sub(Ur.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ur=new L,tl=new Di;class sn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(r,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fs.copy(n.boundingBox)),fs.applyMatrix4(e.matrixWorld),this.union(fs)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vi),ms.subVectors(this.max,Vi),ti.subVectors(e.a,Vi),ni.subVectors(e.b,Vi),ii.subVectors(e.c,Vi),Sn.subVectors(ni,ti),Mn.subVectors(ii,ni),Fn.subVectors(ti,ii);let t=[0,-Sn.z,Sn.y,0,-Mn.z,Mn.y,0,-Fn.z,Fn.y,Sn.z,0,-Sn.x,Mn.z,0,-Mn.x,Fn.z,0,-Fn.x,-Sn.y,Sn.x,0,-Mn.y,Mn.x,0,-Fn.y,Fn.x,0];return!Or(t,ti,ni,ii,ms)||(t=[1,0,0,0,1,0,0,0,1],!Or(t,ti,ni,ii,ms))?!1:(gs.crossVectors(Sn,Mn),t=[gs.x,gs.y,gs.z],Or(t,ti,ni,ii,ms))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ln=[new L,new L,new L,new L,new L,new L,new L,new L],Yt=new L,fs=new sn,ti=new L,ni=new L,ii=new L,Sn=new L,Mn=new L,Fn=new L,Vi=new L,ms=new L,gs=new L,kn=new L;function Or(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){kn.fromArray(s,r);const o=i.x*Math.abs(kn.x)+i.y*Math.abs(kn.y)+i.z*Math.abs(kn.z),l=e.dot(kn),c=t.dot(kn),d=n.dot(kn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const au=new sn,Hi=new L,Fr=new L;class En{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):au.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hi.subVectors(e,this.center);const t=Hi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Hi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hi.copy(e.center).add(Fr)),this.expandByPoint(Hi.copy(e.center).sub(Fr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const cn=new L,kr=new L,vs=new L,wn=new L,Br=new L,_s=new L,Vr=new L;class ls{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cn.copy(this.origin).addScaledVector(this.direction,t),cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){kr.copy(e).add(t).multiplyScalar(.5),vs.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(kr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(vs),o=wn.dot(this.direction),l=-wn.dot(vs),c=wn.lengthSq(),d=Math.abs(1-a*a);let h,u,f,v;if(d>0)if(h=a*l-o,u=a*o-l,v=r*d,h>=0)if(u>=-v)if(u<=v){const g=1/d;h*=g,u*=g,f=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u<=-v?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c):u<=v?(h=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(kr).addScaledVector(vs,u),f}intersectSphere(e,t){cn.subVectors(e.center,this.origin);const n=cn.dot(this.direction),i=cn.dot(cn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,cn)!==null}intersectTriangle(e,t,n,i,r){Br.subVectors(t,e),_s.subVectors(n,e),Vr.crossVectors(Br,_s);let a=this.direction.dot(Vr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wn.subVectors(this.origin,e);const l=o*this.direction.dot(_s.crossVectors(wn,_s));if(l<0)return null;const c=o*this.direction.dot(Br.cross(wn));if(c<0||l+c>a)return null;const d=-o*wn.dot(Vr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ge{constructor(e,t,n,i,r,a,o,l,c,d,h,u,f,v,g,m){Ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,d,h,u,f,v,g,m)}set(e,t,n,i,r,a,o,l,c,d,h,u,f,v,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=v,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ge().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/si.setFromMatrixColumn(e,0).length(),r=1/si.setFromMatrixColumn(e,1).length(),a=1/si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=a*d,f=a*h,v=o*d,g=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+v*c,t[5]=u-g*c,t[9]=-o*l,t[2]=g-u*c,t[6]=v+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,f=l*h,v=c*d,g=c*h;t[0]=u+g*o,t[4]=v*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-v,t[6]=g+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,f=l*h,v=c*d,g=c*h;t[0]=u-g*o,t[4]=-a*h,t[8]=v+f*o,t[1]=f+v*o,t[5]=a*d,t[9]=g-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,f=a*h,v=o*d,g=o*h;t[0]=l*d,t[4]=v*c-f,t[8]=u*c+g,t[1]=l*h,t[5]=g*c+u,t[9]=f*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,v=o*l,g=o*c;t[0]=l*d,t[4]=g-u*h,t[8]=v*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*h+v,t[10]=u-g*h}else if(e.order==="XZY"){const u=a*l,f=a*c,v=o*l,g=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+g,t[5]=a*d,t[9]=f*h-v,t[2]=v*h-f,t[6]=o*d,t[10]=g*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ou,e,lu)}lookAt(e,t,n){const i=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Tn.crossVectors(n,Ft),Tn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Tn.crossVectors(n,Ft)),Tn.normalize(),xs.crossVectors(Ft,Tn),i[0]=Tn.x,i[4]=xs.x,i[8]=Ft.x,i[1]=Tn.y,i[5]=xs.y,i[9]=Ft.y,i[2]=Tn.z,i[6]=xs.z,i[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],f=n[13],v=n[2],g=n[6],m=n[10],p=n[14],E=n[3],x=n[7],T=n[11],R=n[15],A=i[0],C=i[4],z=i[8],S=i[12],w=i[1],V=i[5],W=i[9],ne=i[13],P=i[2],D=i[6],G=i[10],q=i[14],X=i[3],Y=i[7],Z=i[11],ee=i[15];return r[0]=a*A+o*w+l*P+c*X,r[4]=a*C+o*V+l*D+c*Y,r[8]=a*z+o*W+l*G+c*Z,r[12]=a*S+o*ne+l*q+c*ee,r[1]=d*A+h*w+u*P+f*X,r[5]=d*C+h*V+u*D+f*Y,r[9]=d*z+h*W+u*G+f*Z,r[13]=d*S+h*ne+u*q+f*ee,r[2]=v*A+g*w+m*P+p*X,r[6]=v*C+g*V+m*D+p*Y,r[10]=v*z+g*W+m*G+p*Z,r[14]=v*S+g*ne+m*q+p*ee,r[3]=E*A+x*w+T*P+R*X,r[7]=E*C+x*V+T*D+R*Y,r[11]=E*z+x*W+T*G+R*Z,r[15]=E*S+x*ne+T*q+R*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],f=e[14],v=e[3],g=e[7],m=e[11],p=e[15];return v*(+r*l*h-i*c*h-r*o*u+n*c*u+i*o*f-n*l*f)+g*(+t*l*f-t*c*u+r*a*u-i*a*f+i*c*d-r*l*d)+m*(+t*c*h-t*o*f-r*a*h+n*a*f+r*o*d-n*c*d)+p*(-i*o*d-t*l*h+t*o*u+i*a*h-n*a*u+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],f=e[11],v=e[12],g=e[13],m=e[14],p=e[15],E=h*m*c-g*u*c+g*l*f-o*m*f-h*l*p+o*u*p,x=v*u*c-d*m*c-v*l*f+a*m*f+d*l*p-a*u*p,T=d*g*c-v*h*c+v*o*f-a*g*f-d*o*p+a*h*p,R=v*h*l-d*g*l-v*o*u+a*g*u+d*o*m-a*h*m,A=t*E+n*x+i*T+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=E*C,e[1]=(g*u*r-h*m*r-g*i*f+n*m*f+h*i*p-n*u*p)*C,e[2]=(o*m*r-g*l*r+g*i*c-n*m*c-o*i*p+n*l*p)*C,e[3]=(h*l*r-o*u*r-h*i*c+n*u*c+o*i*f-n*l*f)*C,e[4]=x*C,e[5]=(d*m*r-v*u*r+v*i*f-t*m*f-d*i*p+t*u*p)*C,e[6]=(v*l*r-a*m*r-v*i*c+t*m*c+a*i*p-t*l*p)*C,e[7]=(a*u*r-d*l*r+d*i*c-t*u*c-a*i*f+t*l*f)*C,e[8]=T*C,e[9]=(v*h*r-d*g*r-v*n*f+t*g*f+d*n*p-t*h*p)*C,e[10]=(a*g*r-v*o*r+v*n*c-t*g*c-a*n*p+t*o*p)*C,e[11]=(d*o*r-a*h*r-d*n*c+t*h*c+a*n*f-t*o*f)*C,e[12]=R*C,e[13]=(d*g*i-v*h*i+v*n*u-t*g*u-d*n*m+t*h*m)*C,e[14]=(v*o*i-a*g*i-v*n*l+t*g*l+a*n*m-t*o*m)*C,e[15]=(a*h*i-d*o*i+d*n*l-t*h*l-a*n*u+t*o*u)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,d*o+n,d*l-i*a,0,c*l-i*o,d*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,u=r*c,f=r*d,v=r*h,g=a*d,m=a*h,p=o*h,E=l*c,x=l*d,T=l*h,R=n.x,A=n.y,C=n.z;return i[0]=(1-(g+p))*R,i[1]=(f+T)*R,i[2]=(v-x)*R,i[3]=0,i[4]=(f-T)*A,i[5]=(1-(u+p))*A,i[6]=(m+E)*A,i[7]=0,i[8]=(v+x)*C,i[9]=(m-E)*C,i[10]=(1-(u+g))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=si.set(i[0],i[1],i[2]).length();const a=si.set(i[4],i[5],i[6]).length(),o=si.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Xt.copy(this);const c=1/r,d=1/a,h=1/o;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=d,Xt.elements[5]*=d,Xt.elements[6]*=d,Xt.elements[8]*=h,Xt.elements[9]*=h,Xt.elements[10]*=h,t.setFromRotationMatrix(Xt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=gn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-i),h=(t+e)/(t-e),u=(n+i)/(n-i);let f,v;if(o===gn)f=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===sr)f=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=gn){const l=this.elements,c=1/(t-e),d=1/(n-i),h=1/(a-r),u=(t+e)*c,f=(n+i)*d;let v,g;if(o===gn)v=(a+r)*h,g=-2*h;else if(o===sr)v=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const si=new L,Xt=new Ge,ou=new L(0,0,0),lu=new L(1,1,1),Tn=new L,xs=new L,Ft=new L,nl=new Ge,il=new Di;class fr{constructor(e=0,t=0,n=0,i=fr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],d=i[9],h=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return il.setFromEuler(this),this.setFromQuaternion(il,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fr.DEFAULT_ORDER="XYZ";class Na{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cu=0;const sl=new L,ri=new Di,dn=new Ge,ys=new L,zi=new L,du=new L,hu=new Di,rl=new L(1,0,0),al=new L(0,1,0),ol=new L(0,0,1),uu={type:"added"},pu={type:"removed"};class ct extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Jt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ct.DEFAULT_UP.clone();const e=new L,t=new fr,n=new Di,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ge},normalMatrix:{value:new Ve}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.multiply(ri),this}rotateOnWorldAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.premultiply(ri),this}rotateX(e){return this.rotateOnAxis(rl,e)}rotateY(e){return this.rotateOnAxis(al,e)}rotateZ(e){return this.rotateOnAxis(ol,e)}translateOnAxis(e,t){return sl.copy(e).applyQuaternion(this.quaternion),this.position.add(sl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rl,e)}translateY(e){return this.translateOnAxis(al,e)}translateZ(e){return this.translateOnAxis(ol,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ys.copy(e):ys.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(zi,ys,this.up):dn.lookAt(ys,zi,this.up),this.quaternion.setFromRotationMatrix(dn),i&&(dn.extractRotation(i.matrixWorld),ri.setFromRotationMatrix(dn),this.quaternion.premultiply(ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(uu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,e,du),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zi,hu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),f=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),v.length>0&&(n.nodes=v)}return n.object=i,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ct.DEFAULT_UP=new L(0,1,0);ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qt=new L,hn=new L,Hr=new L,un=new L,ai=new L,oi=new L,ll=new L,zr=new L,Gr=new L,Wr=new L;let bs=!1;class Ht{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),qt.subVectors(e,t),i.cross(qt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){qt.subVectors(i,t),hn.subVectors(n,t),Hr.subVectors(e,t);const a=qt.dot(qt),o=qt.dot(hn),l=qt.dot(Hr),c=hn.dot(hn),d=hn.dot(Hr),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const u=1/h,f=(c*l-o*d)*u,v=(a*d-o*l)*u;return r.set(1-f-v,v,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,un)===null?!1:un.x>=0&&un.y>=0&&un.x+un.y<=1}static getUV(e,t,n,i,r,a,o,l){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),this.getInterpolation(e,t,n,i,r,a,o,l)}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,un.x),l.addScaledVector(a,un.y),l.addScaledVector(o,un.z),l)}static isFrontFacing(e,t,n,i){return qt.subVectors(n,t),hn.subVectors(e,t),qt.cross(hn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),qt.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ht.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ht.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),Ht.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return Ht.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Ht.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ht.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;ai.subVectors(i,n),oi.subVectors(r,n),zr.subVectors(e,n);const l=ai.dot(zr),c=oi.dot(zr);if(l<=0&&c<=0)return t.copy(n);Gr.subVectors(e,i);const d=ai.dot(Gr),h=oi.dot(Gr);if(d>=0&&h<=d)return t.copy(i);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(ai,a);Wr.subVectors(e,r);const f=ai.dot(Wr),v=oi.dot(Wr);if(v>=0&&f<=v)return t.copy(r);const g=f*c-l*v;if(g<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(oi,o);const m=d*v-f*h;if(m<=0&&h-d>=0&&f-v>=0)return ll.subVectors(r,i),o=(h-d)/(h-d+(f-v)),t.copy(i).addScaledVector(ll,o);const p=1/(m+g+u);return a=g*p,o=u*p,t.copy(n).addScaledVector(ai,a).addScaledVector(oi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},Es={h:0,s:0,l:0};function Yr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class He{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=Pa(e,1),t=bt(t,0,1),n=bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Yr(a,r,e+1/3),this.g=Yr(a,r,e),this.b=Yr(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,i),this}setStyle(e,t=ht){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){const n=Bc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=Nr(e.r),this.g=Nr(e.g),this.b=Nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return Ke.fromWorkingColorSpace(Mt.copy(this),e),Math.round(bt(Mt.r*255,0,255))*65536+Math.round(bt(Mt.g*255,0,255))*256+Math.round(bt(Mt.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Mt.copy(this),t);const n=Mt.r,i=Mt.g,r=Mt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=ht){Ke.fromWorkingColorSpace(Mt.copy(this),e);const t=Mt.r,n=Mt.g,i=Mt.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(Es);const n=Ji(An.h,Es.h,t),i=Ji(An.s,Es.s,t),r=Ji(An.l,Es.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new He;He.NAMES=Bc;let fu=0;class Dn extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Jt(),this.name="",this.type="Material",this.blending=wi,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pa,this.blendDst=fa,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qn,this.stencilZFail=Qn,this.stencilZPass=Qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pa&&(n.blendSrc=this.blendSrc),this.blendDst!==fa&&(n.blendDst=this.blendDst),this.blendEquation!==Gn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Js&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ri extends Dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new L,Ss=new Se;class Wt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ss.fromBufferAttribute(this,t),Ss.applyMatrix3(e),this.setXY(t,Ss.x,Ss.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$e(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array),r=$e(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xa&&(e.usage=this.usage),e}}class Vc extends Wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Hc extends Wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ft extends Wt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let mu=0;const Vt=new Ge,Xr=new ct,li=new L,kt=new sn,Gi=new sn,xt=new L;class Nt extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=Jt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uc(e)?Hc:Vc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,n){return Vt.makeTranslation(e,t,n),this.applyMatrix4(Vt),this}scale(e,t,n){return Vt.makeScale(e,t,n),this.applyMatrix4(Vt),this}lookAt(e){return Xr.lookAt(e),Xr.updateMatrix(),this.applyMatrix4(Xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ft(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];kt.setFromBufferAttribute(r),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new En);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Gi.setFromBufferAttribute(o),this.morphTargetsRelative?(xt.addVectors(kt.min,Gi.min),kt.expandByPoint(xt),xt.addVectors(kt.max,Gi.max),kt.expandByPoint(xt)):(kt.expandByPoint(Gi.min),kt.expandByPoint(Gi.max))}kt.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)xt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(xt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)xt.fromBufferAttribute(o,c),l&&(li.fromBufferAttribute(e,c),xt.add(li)),i=Math.max(i,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let w=0;w<o;w++)c[w]=new L,d[w]=new L;const h=new L,u=new L,f=new L,v=new Se,g=new Se,m=new Se,p=new L,E=new L;function x(w,V,W){h.fromArray(i,w*3),u.fromArray(i,V*3),f.fromArray(i,W*3),v.fromArray(a,w*2),g.fromArray(a,V*2),m.fromArray(a,W*2),u.sub(h),f.sub(h),g.sub(v),m.sub(v);const ne=1/(g.x*m.y-m.x*g.y);isFinite(ne)&&(p.copy(u).multiplyScalar(m.y).addScaledVector(f,-g.y).multiplyScalar(ne),E.copy(f).multiplyScalar(g.x).addScaledVector(u,-m.x).multiplyScalar(ne),c[w].add(p),c[V].add(p),c[W].add(p),d[w].add(E),d[V].add(E),d[W].add(E))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let w=0,V=T.length;w<V;++w){const W=T[w],ne=W.start,P=W.count;for(let D=ne,G=ne+P;D<G;D+=3)x(n[D+0],n[D+1],n[D+2])}const R=new L,A=new L,C=new L,z=new L;function S(w){C.fromArray(r,w*3),z.copy(C);const V=c[w];R.copy(V),R.sub(C.multiplyScalar(C.dot(V))).normalize(),A.crossVectors(z,V);const ne=A.dot(d[w])<0?-1:1;l[w*4]=R.x,l[w*4+1]=R.y,l[w*4+2]=R.z,l[w*4+3]=ne}for(let w=0,V=T.length;w<V;++w){const W=T[w],ne=W.start,P=W.count;for(let D=ne,G=ne+P;D<G;D+=3)S(n[D+0]),S(n[D+1]),S(n[D+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new L,r=new L,a=new L,o=new L,l=new L,c=new L,d=new L,h=new L;if(e)for(let u=0,f=e.count;u<f;u+=3){const v=e.getX(u+0),g=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(i,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let f=0,v=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*d;for(let p=0;p<d;p++)u[v++]=c[f++]}return new Wt(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Nt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(i[l]=d,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const d=i[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cl=new Ge,Bn=new ls,Ms=new En,dl=new L,ci=new L,di=new L,hi=new L,qr=new L,ws=new L,Ts=new Se,As=new Se,Cs=new Se,hl=new L,ul=new L,pl=new L,Is=new L,Ls=new L;class pt extends ct{constructor(e=new Nt,t=new Ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){ws.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(qr.fromBufferAttribute(h,e),a?ws.addScaledVector(qr,d):ws.addScaledVector(qr.sub(t),d))}t.add(ws)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ms.copy(n.boundingSphere),Ms.applyMatrix4(r),Bn.copy(e.ray).recast(e.near),!(Ms.containsPoint(Bn.origin)===!1&&(Bn.intersectSphere(Ms,dl)===null||Bn.origin.distanceToSquared(dl)>(e.far-e.near)**2))&&(cl.copy(r).invert(),Bn.copy(e.ray).applyMatrix4(cl),!(n.boundingBox!==null&&Bn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Bn)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,g=u.length;v<g;v++){const m=u[v],p=a[m.materialIndex],E=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let T=E,R=x;T<R;T+=3){const A=o.getX(T),C=o.getX(T+1),z=o.getX(T+2);i=Rs(this,p,e,n,c,d,h,A,C,z),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const v=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=v,p=g;m<p;m+=3){const E=o.getX(m),x=o.getX(m+1),T=o.getX(m+2);i=Rs(this,a,e,n,c,d,h,E,x,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,g=u.length;v<g;v++){const m=u[v],p=a[m.materialIndex],E=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let T=E,R=x;T<R;T+=3){const A=T,C=T+1,z=T+2;i=Rs(this,p,e,n,c,d,h,A,C,z),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const v=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=v,p=g;m<p;m+=3){const E=m,x=m+1,T=m+2;i=Rs(this,a,e,n,c,d,h,E,x,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function gu(s,e,t,n,i,r,a,o){let l;if(e.side===Ut?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Nn,o),l===null)return null;Ls.copy(o),Ls.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ls);return c<t.near||c>t.far?null:{distance:c,point:Ls.clone(),object:s}}function Rs(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,ci),s.getVertexPosition(l,di),s.getVertexPosition(c,hi);const d=gu(s,e,t,n,ci,di,hi,Is);if(d){i&&(Ts.fromBufferAttribute(i,o),As.fromBufferAttribute(i,l),Cs.fromBufferAttribute(i,c),d.uv=Ht.getInterpolation(Is,ci,di,hi,Ts,As,Cs,new Se)),r&&(Ts.fromBufferAttribute(r,o),As.fromBufferAttribute(r,l),Cs.fromBufferAttribute(r,c),d.uv1=Ht.getInterpolation(Is,ci,di,hi,Ts,As,Cs,new Se),d.uv2=d.uv1),a&&(hl.fromBufferAttribute(a,o),ul.fromBufferAttribute(a,l),pl.fromBufferAttribute(a,c),d.normal=Ht.getInterpolation(Is,ci,di,hi,hl,ul,pl,new L),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};Ht.getNormal(ci,di,hi,h.normal),d.face=h}return d}class Ui extends Nt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let u=0,f=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,i,a,2),v("x","z","y",1,-1,e,n,-t,i,a,3),v("x","y","z",1,-1,e,t,n,i,r,4),v("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(d,3)),this.setAttribute("uv",new ft(h,2));function v(g,m,p,E,x,T,R,A,C,z,S){const w=T/C,V=R/z,W=T/2,ne=R/2,P=A/2,D=C+1,G=z+1;let q=0,X=0;const Y=new L;for(let Z=0;Z<G;Z++){const ee=Z*V-ne;for(let de=0;de<D;de++){const H=de*w-W;Y[g]=H*E,Y[m]=ee*x,Y[p]=P,c.push(Y.x,Y.y,Y.z),Y[g]=0,Y[m]=0,Y[p]=A>0?1:-1,d.push(Y.x,Y.y,Y.z),h.push(de/C),h.push(1-Z/z),q+=1}}for(let Z=0;Z<z;Z++)for(let ee=0;ee<C;ee++){const de=u+ee+D*Z,H=u+ee+D*(Z+1),$=u+(ee+1)+D*(Z+1),le=u+(ee+1)+D*Z;l.push(de,H,le),l.push(H,$,le),X+=6}o.addGroup(f,X,S),f+=X,u+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ui(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Pi(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Rt(s){const e={};for(let t=0;t<s.length;t++){const n=Pi(s[t]);for(const i in n)e[i]=n[i]}return e}function vu(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function zc(s){return s.getRenderTarget()===null?s.outputColorSpace:Ke.workingColorSpace}const _u={clone:Pi,merge:Rt};var xu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends Dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xu,this.fragmentShader=yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pi(e.uniforms),this.uniformsGroups=vu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Gc extends ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class wt extends Gc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Li*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Li*2*Math.atan(Math.tan(Zi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zi*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ui=-90,pi=1;class bu extends ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new wt(ui,pi,e,t);i.layers=this.layers,this.add(i);const r=new wt(ui,pi,e,t);r.layers=this.layers,this.add(r);const a=new wt(ui,pi,e,t);a.layers=this.layers,this.add(a);const o=new wt(ui,pi,e,t);o.layers=this.layers,this.add(o);const l=new wt(ui,pi,e,t);l.layers=this.layers,this.add(l);const c=new wt(ui,pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Wc extends Tt{constructor(e,t,n,i,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Ai,super(e,t,n,i,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Eu extends Zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Qi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===_n?ht:Gt),this.texture=new Wc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ui(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:Rn});r.uniforms.tEquirect.value=t;const a=new pt(i,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=Dt),new bu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const $r=new L,Su=new L,Mu=new Ve;class Hn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=$r.subVectors(n,t).cross(Su.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta($r),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Mu.getNormalMatrix(e),i=this.coplanarPoint($r).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new En,Ps=new L;class Da{constructor(e=new Hn,t=new Hn,n=new Hn,i=new Hn,r=new Hn,a=new Hn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gn){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],d=i[5],h=i[6],u=i[7],f=i[8],v=i[9],g=i[10],m=i[11],p=i[12],E=i[13],x=i[14],T=i[15];if(n[0].setComponents(l-r,u-c,m-f,T-p).normalize(),n[1].setComponents(l+r,u+c,m+f,T+p).normalize(),n[2].setComponents(l+a,u+d,m+v,T+E).normalize(),n[3].setComponents(l-a,u-d,m-v,T-E).normalize(),n[4].setComponents(l-o,u-h,m-g,T-x).normalize(),t===gn)n[5].setComponents(l+o,u+h,m+g,T+x).normalize();else if(t===sr)n[5].setComponents(o,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){return Vn.center.set(0,0,0),Vn.radius=.7071067811865476,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ps.x=i.normal.x>0?e.max.x:e.min.x,Ps.y=i.normal.y>0?e.max.y:e.min.y,Ps.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yc(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function wu(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,d){const h=c.array,u=c.usage,f=h.byteLength,v=s.createBuffer();s.bindBuffer(d,v),s.bufferData(d,h,u),c.onUploadCallback();let g;if(h instanceof Float32Array)g=s.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=s.SHORT;else if(h instanceof Uint32Array)g=s.UNSIGNED_INT;else if(h instanceof Int32Array)g=s.INT;else if(h instanceof Int8Array)g=s.BYTE;else if(h instanceof Uint8Array)g=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,d,h){const u=d.array,f=d._updateRange,v=d.updateRanges;if(s.bindBuffer(h,c),f.count===-1&&v.length===0&&s.bufferSubData(h,0,u),v.length!==0){for(let g=0,m=v.length;g<m;g++){const p=v[g];t?s.bufferSubData(h,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count):s.bufferSubData(h,p.start*u.BYTES_PER_ELEMENT,u.subarray(p.start,p.start+p.count))}d.clearUpdateRanges()}f.count!==-1&&(t?s.bufferSubData(h,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(h,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),d.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(s.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,i(c,d));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,d),h.version=c.version}}return{get:a,remove:o,update:l}}class Ua extends Nt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,d=l+1,h=e/o,u=t/l,f=[],v=[],g=[],m=[];for(let p=0;p<d;p++){const E=p*u-a;for(let x=0;x<c;x++){const T=x*h-r;v.push(T,-E,0),g.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){const x=E+c*p,T=E+c*(p+1),R=E+1+c*(p+1),A=E+1+c*p;f.push(x,T,A),f.push(T,R,A)}this.setIndex(f),this.setAttribute("position",new ft(v,3)),this.setAttribute("normal",new ft(g,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ua(e.width,e.height,e.widthSegments,e.heightSegments)}}var Tu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Au=`#ifdef USE_ALPHAHASH
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
#endif`,Cu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Iu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pu=`#ifdef USE_AOMAP
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
#endif`,Nu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Du=`#ifdef USE_BATCHING
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
#endif`,Uu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ou=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ku=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bu=`#ifdef USE_IRIDESCENCE
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
#endif`,Vu=`#ifdef USE_BUMPMAP
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
#endif`,Hu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,ju=`#define PI 3.141592653589793
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
} // validated`,Ku=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Zu=`vec3 transformedNormal = objectNormal;
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
#endif`,Ju=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,np="gl_FragColor = linearToOutputTexel( gl_FragColor );",ip=`
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
}`,sp=`#ifdef USE_ENVMAP
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
#endif`,rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ap=`#ifdef USE_ENVMAP
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
#endif`,op=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lp=`#ifdef USE_ENVMAP
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
#endif`,cp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pp=`#ifdef USE_GRADIENTMAP
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
}`,fp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,mp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_p=`uniform bool receiveShadow;
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
#endif`,xp=`#ifdef USE_ENVMAP
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
#endif`,yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ep=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mp=`PhysicalMaterial material;
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
#endif`,wp=`struct PhysicalMaterial {
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
}`,Tp=`
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
#endif`,Ap=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ip=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Pp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Np=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Op=`#if defined( USE_POINTS_UV )
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
#endif`,Fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vp=`#ifdef USE_MORPHNORMALS
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
#endif`,Hp=`#ifdef USE_MORPHTARGETS
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
#endif`,zp=`#ifdef USE_MORPHTARGETS
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
#endif`,Gp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$p=`#ifdef USE_NORMALMAP
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
#endif`,jp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ef=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,af=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,of=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,df=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hf=`float getShadowMask() {
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
}`,uf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pf=`#ifdef USE_SKINNING
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
#endif`,ff=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mf=`#ifdef USE_SKINNING
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
#endif`,gf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_f=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yf=`#ifdef USE_TRANSMISSION
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
#endif`,bf=`#ifdef USE_TRANSMISSION
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
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Af=`uniform sampler2D t2D;
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
}`,Cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,If=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`#include <common>
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
}`,Nf=`#if DEPTH_PACKING == 3200
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
}`,Df=`#define DISTANCE
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
}`,Uf=`#define DISTANCE
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
}`,Of=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ff=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`uniform float scale;
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
}`,Bf=`uniform vec3 diffuse;
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
}`,Vf=`#include <common>
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
}`,Hf=`uniform vec3 diffuse;
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
}`,zf=`#define LAMBERT
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
}`,Gf=`#define LAMBERT
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
}`,Wf=`#define MATCAP
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
}`,Yf=`#define MATCAP
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
}`,Xf=`#define NORMAL
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
}`,qf=`#define NORMAL
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
}`,$f=`#define PHONG
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
}`,jf=`#define PHONG
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
}`,Kf=`#define STANDARD
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
}`,Zf=`#define STANDARD
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
}`,Jf=`#define TOON
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
}`,Qf=`#define TOON
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
}`,em=`uniform float size;
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
}`,tm=`uniform vec3 diffuse;
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
}`,nm=`#include <common>
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
}`,im=`uniform vec3 color;
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
}`,sm=`uniform float rotation;
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
}`,rm=`uniform vec3 diffuse;
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
}`,De={alphahash_fragment:Tu,alphahash_pars_fragment:Au,alphamap_fragment:Cu,alphamap_pars_fragment:Iu,alphatest_fragment:Lu,alphatest_pars_fragment:Ru,aomap_fragment:Pu,aomap_pars_fragment:Nu,batching_pars_vertex:Du,batching_vertex:Uu,begin_vertex:Ou,beginnormal_vertex:Fu,bsdfs:ku,iridescence_fragment:Bu,bumpmap_pars_fragment:Vu,clipping_planes_fragment:Hu,clipping_planes_pars_fragment:zu,clipping_planes_pars_vertex:Gu,clipping_planes_vertex:Wu,color_fragment:Yu,color_pars_fragment:Xu,color_pars_vertex:qu,color_vertex:$u,common:ju,cube_uv_reflection_fragment:Ku,defaultnormal_vertex:Zu,displacementmap_pars_vertex:Ju,displacementmap_vertex:Qu,emissivemap_fragment:ep,emissivemap_pars_fragment:tp,colorspace_fragment:np,colorspace_pars_fragment:ip,envmap_fragment:sp,envmap_common_pars_fragment:rp,envmap_pars_fragment:ap,envmap_pars_vertex:op,envmap_physical_pars_fragment:xp,envmap_vertex:lp,fog_vertex:cp,fog_pars_vertex:dp,fog_fragment:hp,fog_pars_fragment:up,gradientmap_pars_fragment:pp,lightmap_fragment:fp,lightmap_pars_fragment:mp,lights_lambert_fragment:gp,lights_lambert_pars_fragment:vp,lights_pars_begin:_p,lights_toon_fragment:yp,lights_toon_pars_fragment:bp,lights_phong_fragment:Ep,lights_phong_pars_fragment:Sp,lights_physical_fragment:Mp,lights_physical_pars_fragment:wp,lights_fragment_begin:Tp,lights_fragment_maps:Ap,lights_fragment_end:Cp,logdepthbuf_fragment:Ip,logdepthbuf_pars_fragment:Lp,logdepthbuf_pars_vertex:Rp,logdepthbuf_vertex:Pp,map_fragment:Np,map_pars_fragment:Dp,map_particle_fragment:Up,map_particle_pars_fragment:Op,metalnessmap_fragment:Fp,metalnessmap_pars_fragment:kp,morphcolor_vertex:Bp,morphnormal_vertex:Vp,morphtarget_pars_vertex:Hp,morphtarget_vertex:zp,normal_fragment_begin:Gp,normal_fragment_maps:Wp,normal_pars_fragment:Yp,normal_pars_vertex:Xp,normal_vertex:qp,normalmap_pars_fragment:$p,clearcoat_normal_fragment_begin:jp,clearcoat_normal_fragment_maps:Kp,clearcoat_pars_fragment:Zp,iridescence_pars_fragment:Jp,opaque_fragment:Qp,packing:ef,premultiplied_alpha_fragment:tf,project_vertex:nf,dithering_fragment:sf,dithering_pars_fragment:rf,roughnessmap_fragment:af,roughnessmap_pars_fragment:of,shadowmap_pars_fragment:lf,shadowmap_pars_vertex:cf,shadowmap_vertex:df,shadowmask_pars_fragment:hf,skinbase_vertex:uf,skinning_pars_vertex:pf,skinning_vertex:ff,skinnormal_vertex:mf,specularmap_fragment:gf,specularmap_pars_fragment:vf,tonemapping_fragment:_f,tonemapping_pars_fragment:xf,transmission_fragment:yf,transmission_pars_fragment:bf,uv_pars_fragment:Ef,uv_pars_vertex:Sf,uv_vertex:Mf,worldpos_vertex:wf,background_vert:Tf,background_frag:Af,backgroundCube_vert:Cf,backgroundCube_frag:If,cube_vert:Lf,cube_frag:Rf,depth_vert:Pf,depth_frag:Nf,distanceRGBA_vert:Df,distanceRGBA_frag:Uf,equirect_vert:Of,equirect_frag:Ff,linedashed_vert:kf,linedashed_frag:Bf,meshbasic_vert:Vf,meshbasic_frag:Hf,meshlambert_vert:zf,meshlambert_frag:Gf,meshmatcap_vert:Wf,meshmatcap_frag:Yf,meshnormal_vert:Xf,meshnormal_frag:qf,meshphong_vert:$f,meshphong_frag:jf,meshphysical_vert:Kf,meshphysical_frag:Zf,meshtoon_vert:Jf,meshtoon_frag:Qf,points_vert:em,points_frag:tm,shadow_vert:nm,shadow_frag:im,sprite_vert:sm,sprite_frag:rm},se={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},en={basic:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new He(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:Rt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:Rt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:Rt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new He(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:Rt([se.points,se.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:Rt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:Rt([se.common,se.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:Rt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:Rt([se.sprite,se.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:Rt([se.common,se.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:Rt([se.lights,se.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};en.physical={uniforms:Rt([en.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const Ns={r:0,b:0,g:0};function am(s,e,t,n,i,r,a){const o=new He(0);let l=r===!0?0:1,c,d,h=null,u=0,f=null;function v(m,p){let E=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?g(o,l):x&&x.isColor&&(g(x,1),E=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||E)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ur)?(d===void 0&&(d=new pt(new Ui(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:Pi(en.backgroundCube.uniforms),vertexShader:en.backgroundCube.vertexShader,fragmentShader:en.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,d.material.toneMapped=Ke.getTransfer(x.colorSpace)!==nt,(h!==x||u!==x.version||f!==s.toneMapping)&&(d.material.needsUpdate=!0,h=x,u=x.version,f=s.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new pt(new Ua(2,2),new Jn({name:"BackgroundMaterial",uniforms:Pi(en.background.uniforms),vertexShader:en.background.vertexShader,fragmentShader:en.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||u!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,u=x.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function g(m,p){m.getRGB(Ns,zc(s)),n.buffers.color.setClear(Ns.r,Ns.g,Ns.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,g(o,l)},render:v}}function om(s,e,t,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null);let c=l,d=!1;function h(P,D,G,q,X){let Y=!1;if(a){const Z=g(q,G,D);c!==Z&&(c=Z,f(c.object)),Y=p(P,q,G,X),Y&&E(P,q,G,X)}else{const Z=D.wireframe===!0;(c.geometry!==q.id||c.program!==G.id||c.wireframe!==Z)&&(c.geometry=q.id,c.program=G.id,c.wireframe=Z,Y=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Y||d)&&(d=!1,z(P,D,G,q),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function u(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(P){return n.isWebGL2?s.bindVertexArray(P):r.bindVertexArrayOES(P)}function v(P){return n.isWebGL2?s.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function g(P,D,G){const q=G.wireframe===!0;let X=o[P.id];X===void 0&&(X={},o[P.id]=X);let Y=X[D.id];Y===void 0&&(Y={},X[D.id]=Y);let Z=Y[q];return Z===void 0&&(Z=m(u()),Y[q]=Z),Z}function m(P){const D=[],G=[],q=[];for(let X=0;X<i;X++)D[X]=0,G[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:G,attributeDivisors:q,object:P,attributes:{},index:null}}function p(P,D,G,q){const X=c.attributes,Y=D.attributes;let Z=0;const ee=G.getAttributes();for(const de in ee)if(ee[de].location>=0){const $=X[de];let le=Y[de];if(le===void 0&&(de==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),de==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),$===void 0||$.attribute!==le||le&&$.data!==le.data)return!0;Z++}return c.attributesNum!==Z||c.index!==q}function E(P,D,G,q){const X={},Y=D.attributes;let Z=0;const ee=G.getAttributes();for(const de in ee)if(ee[de].location>=0){let $=Y[de];$===void 0&&(de==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),de==="instanceColor"&&P.instanceColor&&($=P.instanceColor));const le={};le.attribute=$,$&&$.data&&(le.data=$.data),X[de]=le,Z++}c.attributes=X,c.attributesNum=Z,c.index=q}function x(){const P=c.newAttributes;for(let D=0,G=P.length;D<G;D++)P[D]=0}function T(P){R(P,0)}function R(P,D){const G=c.newAttributes,q=c.enabledAttributes,X=c.attributeDivisors;G[P]=1,q[P]===0&&(s.enableVertexAttribArray(P),q[P]=1),X[P]!==D&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,D),X[P]=D)}function A(){const P=c.newAttributes,D=c.enabledAttributes;for(let G=0,q=D.length;G<q;G++)D[G]!==P[G]&&(s.disableVertexAttribArray(G),D[G]=0)}function C(P,D,G,q,X,Y,Z){Z===!0?s.vertexAttribIPointer(P,D,G,X,Y):s.vertexAttribPointer(P,D,G,q,X,Y)}function z(P,D,G,q){if(n.isWebGL2===!1&&(P.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const X=q.attributes,Y=G.getAttributes(),Z=D.defaultAttributeValues;for(const ee in Y){const de=Y[ee];if(de.location>=0){let H=X[ee];if(H===void 0&&(ee==="instanceMatrix"&&P.instanceMatrix&&(H=P.instanceMatrix),ee==="instanceColor"&&P.instanceColor&&(H=P.instanceColor)),H!==void 0){const $=H.normalized,le=H.itemSize,ve=t.get(H);if(ve===void 0)continue;const ge=ve.buffer,Le=ve.type,Pe=ve.bytesPerElement,Me=n.isWebGL2===!0&&(Le===s.INT||Le===s.UNSIGNED_INT||H.gpuType===wc);if(H.isInterleavedBufferAttribute){const We=H.data,U=We.stride,At=H.offset;if(We.isInstancedInterleavedBuffer){for(let xe=0;xe<de.locationSize;xe++)R(de.location+xe,We.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let xe=0;xe<de.locationSize;xe++)T(de.location+xe);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let xe=0;xe<de.locationSize;xe++)C(de.location+xe,le/de.locationSize,Le,$,U*Pe,(At+le/de.locationSize*xe)*Pe,Me)}else{if(H.isInstancedBufferAttribute){for(let We=0;We<de.locationSize;We++)R(de.location+We,H.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let We=0;We<de.locationSize;We++)T(de.location+We);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let We=0;We<de.locationSize;We++)C(de.location+We,le/de.locationSize,Le,$,le*Pe,le/de.locationSize*We*Pe,Me)}}else if(Z!==void 0){const $=Z[ee];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(de.location,$);break;case 3:s.vertexAttrib3fv(de.location,$);break;case 4:s.vertexAttrib4fv(de.location,$);break;default:s.vertexAttrib1fv(de.location,$)}}}}A()}function S(){W();for(const P in o){const D=o[P];for(const G in D){const q=D[G];for(const X in q)v(q[X].object),delete q[X];delete D[G]}delete o[P]}}function w(P){if(o[P.id]===void 0)return;const D=o[P.id];for(const G in D){const q=D[G];for(const X in q)v(q[X].object),delete q[X];delete D[G]}delete o[P.id]}function V(P){for(const D in o){const G=o[D];if(G[P.id]===void 0)continue;const q=G[P.id];for(const X in q)v(q[X].object),delete q[X];delete G[P.id]}}function W(){ne(),d=!0,c!==l&&(c=l,f(c.object))}function ne(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:W,resetDefaultState:ne,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:V,initAttributes:x,enableAttribute:T,disableUnusedAttributes:A}}function lm(s,e,t,n){const i=n.isWebGL2;let r;function a(d){r=d}function o(d,h){s.drawArrays(r,d,h),t.update(h,r,1)}function l(d,h,u){if(u===0)return;let f,v;if(i)f=s,v="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[v](r,d,h,u),t.update(h,r,u)}function c(d,h,u){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let v=0;v<u;v++)this.render(d[v],h[v]);else{f.multiDrawArraysWEBGL(r,d,0,h,0,u);let v=0;for(let g=0;g<u;g++)v+=h[g];t.update(v,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function cm(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),v=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),E=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,T=a||e.has("OES_texture_float"),R=x&&T,A=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:v,maxAttributes:g,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:E,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:R,maxSamples:A}}function dm(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Hn,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const f=h.length!==0||u||n!==0||i;return i=u,n=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){const v=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||v===null||v.length===0||r&&!m)r?d(null):c();else{const E=r?0:n,x=E*4;let T=p.clippingState||null;l.value=T,T=d(v,u,x,f);for(let R=0;R!==x;++R)T[R]=t[R];p.clippingState=T,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,f,v){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,v!==!0||m===null){const p=f+g*4,E=u.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,T=f;x!==g;++x,T+=4)a.copy(h[x]).applyMatrix4(E,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function hm(s){let e=new WeakMap;function t(a,o){return o===ma?a.mapping=Ai:o===ga&&(a.mapping=Ci),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ma||o===ga)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Eu(l.height/2);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Xc extends Gc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const yi=4,fl=[.125,.215,.35,.446,.526,.582],Wn=20,jr=new Xc,ml=new He;let Kr=null,Zr=0,Jr=0;const zn=(1+Math.sqrt(5))/2,fi=1/zn,gl=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,zn,fi),new L(0,zn,-fi),new L(fi,0,zn),new L(-fi,0,zn),new L(zn,fi,0),new L(-zn,fi,0)];class vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Kr=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Kr,Zr,Jr),e.scissorTest=!1,Ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ai||e.mapping===Ci?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kr=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:is,format:zt,colorSpace:yn,depthBuffer:!1},i=_l(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_l(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=um(r)),this._blurMaterial=pm(r,e,t)}return i}_compileMaterial(e){const t=new pt(this._lodPlanes[0],e);this._renderer.compile(t,jr)}_sceneToCubeUV(e,t,n,i){const o=new wt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,u=d.toneMapping;d.getClearColor(ml),d.toneMapping=vn,d.autoClear=!1;const f=new Ri({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),v=new pt(new Ui,f);let g=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,g=!0):(f.color.copy(ml),g=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):E===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const x=this._cubeSize;Ds(i,E*x,p>2?x:0,x,x),d.setRenderTarget(i),g&&d.render(v,o),d.render(e,o)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=u,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Ai||e.mapping===Ci;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new pt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ds(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,jr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=gl[(i-1)%gl.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new pt(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Wn-1),g=r/v,m=isFinite(r)?1+Math.floor(d*g):Wn;m>Wn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wn}`);const p=[];let E=0;for(let C=0;C<Wn;++C){const z=C/g,S=Math.exp(-z*z/2);p.push(S),C===0?E+=S:C<m&&(E+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=v,u.mipInt.value=x-n;const T=this._sizeLods[i],R=3*T*(i>x-yi?i-x+yi:0),A=4*(this._cubeSize-T);Ds(t,R,A,3*T,2*T),l.setRenderTarget(t),l.render(h,jr)}}function um(s){const e=[],t=[],n=[];let i=s;const r=s-yi+1+fl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-yi?l=fl[a-s+yi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,v=6,g=3,m=2,p=1,E=new Float32Array(g*v*f),x=new Float32Array(m*v*f),T=new Float32Array(p*v*f);for(let A=0;A<f;A++){const C=A%3*2/3-1,z=A>2?0:-1,S=[C,z,0,C+2/3,z,0,C+2/3,z+1,0,C,z,0,C+2/3,z+1,0,C,z+1,0];E.set(S,g*v*A),x.set(u,m*v*A);const w=[A,A,A,A,A,A];T.set(w,p*v*A)}const R=new Nt;R.setAttribute("position",new Wt(E,g)),R.setAttribute("uv",new Wt(x,m)),R.setAttribute("faceIndex",new Wt(T,p)),e.push(R),i>yi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function _l(s,e,t){const n=new Zn(s,e,t);return n.texture.mapping=ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ds(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function pm(s,e,t){const n=new Float32Array(Wn),i=new L(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:Wn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Oa(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function xl(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oa(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function yl(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Oa(){return`

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
	`}function fm(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ma||l===ga,d=l===Ai||l===Ci;if(c||d)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new vl(s)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||d&&h&&i(h)){t===null&&(t=new vl(s));const u=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function mm(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function gm(s,e,t,n){const i={},r=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const v in u.attributes)e.remove(u.attributes[v]);for(const v in u.morphAttributes){const g=u.morphAttributes[v];for(let m=0,p=g.length;m<p;m++)e.remove(g[m])}u.removeEventListener("dispose",a),delete i[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(h){const u=h.attributes;for(const v in u)e.update(u[v],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const v in f){const g=f[v];for(let m=0,p=g.length;m<p;m++)e.update(g[m],s.ARRAY_BUFFER)}}function c(h){const u=[],f=h.index,v=h.attributes.position;let g=0;if(f!==null){const E=f.array;g=f.version;for(let x=0,T=E.length;x<T;x+=3){const R=E[x+0],A=E[x+1],C=E[x+2];u.push(R,A,A,C,C,R)}}else if(v!==void 0){const E=v.array;g=v.version;for(let x=0,T=E.length/3-1;x<T;x+=3){const R=x+0,A=x+1,C=x+2;u.push(R,A,A,C,C,R)}}else return;const m=new(Uc(u)?Hc:Vc)(u,1);m.version=g;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function d(h){const u=r.get(h);if(u){const f=h.index;f!==null&&u.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function vm(s,e,t,n){const i=n.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function d(f,v){s.drawElements(r,v,o,f*l),t.update(v,r,1)}function h(f,v,g){if(g===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,v,o,f*l,g),t.update(v,r,g)}function u(f,v,g){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<g;p++)this.render(f[p]/l,v[p]);else{m.multiDrawElementsWEBGL(r,v,0,o,f,0,g);let p=0;for(let E=0;E<g;E++)p+=v[E];t.update(p,r,1)}}this.setMode=a,this.setIndex=c,this.render=d,this.renderInstances=h,this.renderMultiDraw=u}function _m(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function xm(s,e){return s[0]-e[0]}function ym(s,e){return Math.abs(e[1])-Math.abs(s[1])}function bm(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,a=new Ze,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,d,h){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=f!==void 0?f.length:0;let g=r.get(d);if(g===void 0||g.count!==v){let P=function(){W.dispose(),r.delete(d),d.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const E=d.morphAttributes.position!==void 0,x=d.morphAttributes.normal!==void 0,T=d.morphAttributes.color!==void 0,R=d.morphAttributes.position||[],A=d.morphAttributes.normal||[],C=d.morphAttributes.color||[];let z=0;E===!0&&(z=1),x===!0&&(z=2),T===!0&&(z=3);let S=d.attributes.position.count*z,w=1;S>e.maxTextureSize&&(w=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const V=new Float32Array(S*w*4*v),W=new kc(V,S,w,v);W.type=mn,W.needsUpdate=!0;const ne=z*4;for(let D=0;D<v;D++){const G=R[D],q=A[D],X=C[D],Y=S*w*4*D;for(let Z=0;Z<G.count;Z++){const ee=Z*ne;E===!0&&(a.fromBufferAttribute(G,Z),V[Y+ee+0]=a.x,V[Y+ee+1]=a.y,V[Y+ee+2]=a.z,V[Y+ee+3]=0),x===!0&&(a.fromBufferAttribute(q,Z),V[Y+ee+4]=a.x,V[Y+ee+5]=a.y,V[Y+ee+6]=a.z,V[Y+ee+7]=0),T===!0&&(a.fromBufferAttribute(X,Z),V[Y+ee+8]=a.x,V[Y+ee+9]=a.y,V[Y+ee+10]=a.z,V[Y+ee+11]=X.itemSize===4?a.w:1)}}g={count:v,texture:W,size:new Se(S,w)},r.set(d,g),d.addEventListener("dispose",P)}let m=0;for(let E=0;E<u.length;E++)m+=u[E];const p=d.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",p),h.getUniforms().setValue(s,"morphTargetInfluences",u),h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}else{const f=u===void 0?0:u.length;let v=n[d.id];if(v===void 0||v.length!==f){v=[];for(let x=0;x<f;x++)v[x]=[x,0];n[d.id]=v}for(let x=0;x<f;x++){const T=v[x];T[0]=x,T[1]=u[x]}v.sort(ym);for(let x=0;x<8;x++)x<f&&v[x][1]?(o[x][0]=v[x][0],o[x][1]=v[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(xm);const g=d.morphAttributes.position,m=d.morphAttributes.normal;let p=0;for(let x=0;x<8;x++){const T=o[x],R=T[0],A=T[1];R!==Number.MAX_SAFE_INTEGER&&A?(g&&d.getAttribute("morphTarget"+x)!==g[R]&&d.setAttribute("morphTarget"+x,g[R]),m&&d.getAttribute("morphNormal"+x)!==m[R]&&d.setAttribute("morphNormal"+x,m[R]),i[x]=A,p+=A):(g&&d.hasAttribute("morphTarget"+x)===!0&&d.deleteAttribute("morphTarget"+x),m&&d.hasAttribute("morphNormal"+x)===!0&&d.deleteAttribute("morphNormal"+x),i[x]=0)}const E=d.morphTargetsRelative?1:1-p;h.getUniforms().setValue(s,"morphTargetBaseInfluence",E),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function Em(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return h}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class qc extends Tt{constructor(e,t,n,i,r,a,o,l,c,d){if(d=d!==void 0?d:$n,d!==$n&&d!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===$n&&(n=In),n===void 0&&d===Ii&&(n=qn),super(null,i,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:yt,this.minFilter=l!==void 0?l:yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $c=new Tt,jc=new qc(1,1);jc.compareFunction=Dc;const Kc=new kc,Zc=new ru,Jc=new Wc,bl=[],El=[],Sl=new Float32Array(16),Ml=new Float32Array(9),wl=new Float32Array(4);function Oi(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=bl[i];if(r===void 0&&(r=new Float32Array(i),bl[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function mt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function gt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function mr(s,e){let t=El[e];t===void 0&&(t=new Int32Array(e),El[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Sm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2fv(this.addr,e),gt(t,e)}}function wm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;s.uniform3fv(this.addr,e),gt(t,e)}}function Tm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4fv(this.addr,e),gt(t,e)}}function Am(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;wl.set(n),s.uniformMatrix2fv(this.addr,!1,wl),gt(t,n)}}function Cm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Ml.set(n),s.uniformMatrix3fv(this.addr,!1,Ml),gt(t,n)}}function Im(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Sl.set(n),s.uniformMatrix4fv(this.addr,!1,Sl),gt(t,n)}}function Lm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Rm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2iv(this.addr,e),gt(t,e)}}function Pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;s.uniform3iv(this.addr,e),gt(t,e)}}function Nm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4iv(this.addr,e),gt(t,e)}}function Dm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Um(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2uiv(this.addr,e),gt(t,e)}}function Om(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;s.uniform3uiv(this.addr,e),gt(t,e)}}function Fm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4uiv(this.addr,e),gt(t,e)}}function km(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?jc:$c;t.setTexture2D(e||r,i)}function Bm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Zc,i)}function Vm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Jc,i)}function Hm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kc,i)}function zm(s){switch(s){case 5126:return Sm;case 35664:return Mm;case 35665:return wm;case 35666:return Tm;case 35674:return Am;case 35675:return Cm;case 35676:return Im;case 5124:case 35670:return Lm;case 35667:case 35671:return Rm;case 35668:case 35672:return Pm;case 35669:case 35673:return Nm;case 5125:return Dm;case 36294:return Um;case 36295:return Om;case 36296:return Fm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return Bm;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Hm}}function Gm(s,e){s.uniform1fv(this.addr,e)}function Wm(s,e){const t=Oi(e,this.size,2);s.uniform2fv(this.addr,t)}function Ym(s,e){const t=Oi(e,this.size,3);s.uniform3fv(this.addr,t)}function Xm(s,e){const t=Oi(e,this.size,4);s.uniform4fv(this.addr,t)}function qm(s,e){const t=Oi(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function $m(s,e){const t=Oi(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function jm(s,e){const t=Oi(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Km(s,e){s.uniform1iv(this.addr,e)}function Zm(s,e){s.uniform2iv(this.addr,e)}function Jm(s,e){s.uniform3iv(this.addr,e)}function Qm(s,e){s.uniform4iv(this.addr,e)}function eg(s,e){s.uniform1uiv(this.addr,e)}function tg(s,e){s.uniform2uiv(this.addr,e)}function ng(s,e){s.uniform3uiv(this.addr,e)}function ig(s,e){s.uniform4uiv(this.addr,e)}function sg(s,e,t){const n=this.cache,i=e.length,r=mr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||$c,r[a])}function rg(s,e,t){const n=this.cache,i=e.length,r=mr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Zc,r[a])}function ag(s,e,t){const n=this.cache,i=e.length,r=mr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Jc,r[a])}function og(s,e,t){const n=this.cache,i=e.length,r=mr(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Kc,r[a])}function lg(s){switch(s){case 5126:return Gm;case 35664:return Wm;case 35665:return Ym;case 35666:return Xm;case 35674:return qm;case 35675:return $m;case 35676:return jm;case 5124:case 35670:return Km;case 35667:case 35671:return Zm;case 35668:case 35672:return Jm;case 35669:case 35673:return Qm;case 5125:return eg;case 36294:return tg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return og}}class cg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zm(t.type)}}class dg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lg(t.type)}}class hg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const Qr=/(\w+)(\])?(\[|\.)?/g;function Tl(s,e){s.seq.push(e),s.map[e.id]=e}function ug(s,e,t){const n=s.name,i=n.length;for(Qr.lastIndex=0;;){const r=Qr.exec(n),a=Qr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Tl(t,c===void 0?new cg(o,s,e):new dg(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new hg(o),Tl(t,h)),t=h}}}class Xs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);ug(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Al(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const pg=37297;let fg=0;function mg(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function gg(s){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(s);let n;switch(e===t?n="":e===ir&&t===nr?n="LinearDisplayP3ToLinearSRGB":e===nr&&t===ir&&(n="LinearSRGBToLinearDisplayP3"),s){case yn:case pr:return[n,"LinearTransferOETF"];case ht:case Ra:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Cl(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+mg(s.getShaderSource(e),a)}else return i}function vg(s,e){const t=gg(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function _g(s,e){let t;switch(e){case fh:t="Linear";break;case mh:t="Reinhard";break;case gh:t="OptimizedCineon";break;case Sc:t="ACESFilmic";break;case _h:t="AgX";break;case vh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function xg(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(bi).join(`
`)}function yg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(bi).join(`
`)}function bg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Eg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function bi(s){return s!==""}function Il(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ll(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(s){return s.replace(Sg,wg)}const Mg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wg(s,e){let t=De[e];if(t===void 0){const n=Mg.get(e);if(n!==void 0)t=De[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ea(t)}const Tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rl(s){return s.replace(Tg,Ag)}function Ag(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Pl(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Cg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===bc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===zd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===fn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ig(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ai:case Ci:e="ENVMAP_TYPE_CUBE";break;case ur:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ci:e="ENVMAP_MODE_REFRACTION";break}return e}function Rg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ec:e="ENVMAP_BLENDING_MULTIPLY";break;case uh:e="ENVMAP_BLENDING_MIX";break;case ph:e="ENVMAP_BLENDING_ADD";break}return e}function Pg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Ng(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Cg(t),c=Ig(t),d=Lg(t),h=Rg(t),u=Pg(t),f=t.isWebGL2?"":xg(t),v=yg(t),g=bg(r),m=i.createProgram();let p,E,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(bi).join(`
`),p.length>0&&(p+=`
`),E=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(bi).join(`
`),E.length>0&&(E+=`
`)):(p=[Pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bi).join(`
`),E=[f,Pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?De.tonemapping_pars_fragment:"",t.toneMapping!==vn?_g("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,vg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(bi).join(`
`)),a=Ea(a),a=Il(a,t),a=Ll(a,t),o=Ea(o),o=Il(o,t),o=Ll(o,t),a=Rl(a),o=Rl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Ko?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ko?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const T=x+p+a,R=x+E+o,A=Al(i,i.VERTEX_SHADER,T),C=Al(i,i.FRAGMENT_SHADER,R);i.attachShader(m,A),i.attachShader(m,C),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function z(W){if(s.debug.checkShaderErrors){const ne=i.getProgramInfoLog(m).trim(),P=i.getShaderInfoLog(A).trim(),D=i.getShaderInfoLog(C).trim();let G=!0,q=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,A,C);else{const X=Cl(i,A,"vertex"),Y=Cl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+ne+`
`+X+`
`+Y)}else ne!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ne):(P===""||D==="")&&(q=!1);q&&(W.diagnostics={runnable:G,programLog:ne,vertexShader:{log:P,prefix:p},fragmentShader:{log:D,prefix:E}})}i.deleteShader(A),i.deleteShader(C),S=new Xs(i,m),w=Eg(i,m)}let S;this.getUniforms=function(){return S===void 0&&z(this),S};let w;this.getAttributes=function(){return w===void 0&&z(this),w};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=i.getProgramParameter(m,pg)),V},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=fg++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=C,this}let Dg=0;class Ug{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Og(e),t.set(e,n)),n}}class Og{constructor(e){this.id=Dg++,this.code=e,this.usedTimes=0}}function Fg(s,e,t,n,i,r,a){const o=new Na,l=new Ug,c=[],d=i.isWebGL2,h=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return S===0?"uv":`uv${S}`}function m(S,w,V,W,ne){const P=W.fog,D=ne.geometry,G=S.isMeshStandardMaterial?W.environment:null,q=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),X=q&&q.mapping===ur?q.image.height:null,Y=v[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const Z=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ee=Z!==void 0?Z.length:0;let de=0;D.morphAttributes.position!==void 0&&(de=1),D.morphAttributes.normal!==void 0&&(de=2),D.morphAttributes.color!==void 0&&(de=3);let H,$,le,ve;if(Y){const Ct=en[Y];H=Ct.vertexShader,$=Ct.fragmentShader}else H=S.vertexShader,$=S.fragmentShader,l.update(S),le=l.getVertexShaderID(S),ve=l.getFragmentShaderID(S);const ge=s.getRenderTarget(),Le=ne.isInstancedMesh===!0,Pe=ne.isBatchedMesh===!0,Me=!!S.map,We=!!S.matcap,U=!!q,At=!!S.aoMap,xe=!!S.lightMap,Ce=!!S.bumpMap,pe=!!S.normalMap,st=!!S.displacementMap,Ue=!!S.emissiveMap,M=!!S.metalnessMap,y=!!S.roughnessMap,F=S.anisotropy>0,J=S.clearcoat>0,K=S.iridescence>0,Q=S.sheen>0,fe=S.transmission>0,oe=F&&!!S.anisotropyMap,he=J&&!!S.clearcoatMap,Ee=J&&!!S.clearcoatNormalMap,Oe=J&&!!S.clearcoatRoughnessMap,j=K&&!!S.iridescenceMap,Xe=K&&!!S.iridescenceThicknessMap,ze=Q&&!!S.sheenColorMap,Ae=Q&&!!S.sheenRoughnessMap,_e=!!S.specularMap,ue=!!S.specularColorMap,Ne=!!S.specularIntensityMap,Ye=fe&&!!S.transmissionMap,at=fe&&!!S.thicknessMap,ke=!!S.gradientMap,ie=!!S.alphaMap,I=S.alphaTest>0,re=!!S.alphaHash,ae=!!S.extensions,we=!!D.attributes.uv1,ye=!!D.attributes.uv2,Je=!!D.attributes.uv3;let Qe=vn;return S.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Qe=s.toneMapping),{isWebGL2:d,shaderID:Y,shaderType:S.type,shaderName:S.name,vertexShader:H,fragmentShader:$,defines:S.defines,customVertexShaderID:le,customFragmentShaderID:ve,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Pe,instancing:Le,instancingColor:Le&&ne.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:yn,map:Me,matcap:We,envMap:U,envMapMode:U&&q.mapping,envMapCubeUVHeight:X,aoMap:At,lightMap:xe,bumpMap:Ce,normalMap:pe,displacementMap:u&&st,emissiveMap:Ue,normalMapObjectSpace:pe&&S.normalMapType===Ph,normalMapTangentSpace:pe&&S.normalMapType===Nc,metalnessMap:M,roughnessMap:y,anisotropy:F,anisotropyMap:oe,clearcoat:J,clearcoatMap:he,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Oe,iridescence:K,iridescenceMap:j,iridescenceThicknessMap:Xe,sheen:Q,sheenColorMap:ze,sheenRoughnessMap:Ae,specularMap:_e,specularColorMap:ue,specularIntensityMap:Ne,transmission:fe,transmissionMap:Ye,thicknessMap:at,gradientMap:ke,opaque:S.transparent===!1&&S.blending===wi,alphaMap:ie,alphaTest:I,alphaHash:re,combine:S.combine,mapUv:Me&&g(S.map.channel),aoMapUv:At&&g(S.aoMap.channel),lightMapUv:xe&&g(S.lightMap.channel),bumpMapUv:Ce&&g(S.bumpMap.channel),normalMapUv:pe&&g(S.normalMap.channel),displacementMapUv:st&&g(S.displacementMap.channel),emissiveMapUv:Ue&&g(S.emissiveMap.channel),metalnessMapUv:M&&g(S.metalnessMap.channel),roughnessMapUv:y&&g(S.roughnessMap.channel),anisotropyMapUv:oe&&g(S.anisotropyMap.channel),clearcoatMapUv:he&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&g(S.sheenRoughnessMap.channel),specularMapUv:_e&&g(S.specularMap.channel),specularColorMapUv:ue&&g(S.specularColorMap.channel),specularIntensityMapUv:Ne&&g(S.specularIntensityMap.channel),transmissionMapUv:Ye&&g(S.transmissionMap.channel),thicknessMapUv:at&&g(S.thicknessMap.channel),alphaMapUv:ie&&g(S.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(pe||F),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:ye,vertexUv3s:Je,pointsUvs:ne.isPoints===!0&&!!D.attributes.uv&&(Me||ie),fog:!!P,useFog:S.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:ne.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:de,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:Qe,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Me&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===nt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===tn,flipSided:S.side===Ut,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ae&&S.extensions.derivatives===!0,extensionFragDepth:ae&&S.extensions.fragDepth===!0,extensionDrawBuffers:ae&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function p(S){const w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(const V in S.defines)w.push(V),w.push(S.defines[V]);return S.isRawShaderMaterial===!1&&(E(w,S),x(w,S),w.push(s.outputColorSpace)),w.push(S.customProgramCacheKey),w.join()}function E(S,w){S.push(w.precision),S.push(w.outputColorSpace),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.anisotropyMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.numLightProbes),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function x(S,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),S.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function T(S){const w=v[S.type];let V;if(w){const W=en[w];V=_u.clone(W.uniforms)}else V=S.uniforms;return V}function R(S,w){let V;for(let W=0,ne=c.length;W<ne;W++){const P=c[W];if(P.cacheKey===w){V=P,++V.usedTimes;break}}return V===void 0&&(V=new Ng(s,w,S,r),c.push(V)),V}function A(S){if(--S.usedTimes===0){const w=c.indexOf(S);c[w]=c[c.length-1],c.pop(),S.destroy()}}function C(S){l.remove(S)}function z(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:R,releaseProgram:A,releaseShaderCache:C,programs:c,dispose:z}}function kg(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Bg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Nl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Dl(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,u,f,v,g,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:u,material:f,groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=u,p.material=f,p.groupOrder=v,p.renderOrder=h.renderOrder,p.z=g,p.group=m),e++,p}function o(h,u,f,v,g,m){const p=a(h,u,f,v,g,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(h,u,f,v,g,m){const p=a(h,u,f,v,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(h,u){t.length>1&&t.sort(h||Bg),n.length>1&&n.sort(u||Nl),i.length>1&&i.sort(u||Nl)}function d(){for(let h=e,u=s.length;h<u;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:d,sort:c}}function Vg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Dl,s.set(n,[a])):i>=r.length?(a=new Dl,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Hg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new He};break;case"SpotLight":t={position:new L,direction:new L,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function zg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Gg=0;function Wg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Yg(s,e){const t=new Hg,n=zg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new L);const r=new L,a=new Ge,o=new Ge;function l(d,h){let u=0,f=0,v=0;for(let W=0;W<9;W++)i.probe[W].set(0,0,0);let g=0,m=0,p=0,E=0,x=0,T=0,R=0,A=0,C=0,z=0,S=0;d.sort(Wg);const w=h===!0?Math.PI:1;for(let W=0,ne=d.length;W<ne;W++){const P=d[W],D=P.color,G=P.intensity,q=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=D.r*G*w,f+=D.g*G*w,v+=D.b*G*w;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],G);S++}else if(P.isDirectionalLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*w),P.castShadow){const Z=P.shadow,ee=n.get(P);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,i.directionalShadow[g]=ee,i.directionalShadowMap[g]=X,i.directionalShadowMatrix[g]=P.shadow.matrix,T++}i.directional[g]=Y,g++}else if(P.isSpotLight){const Y=t.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(D).multiplyScalar(G*w),Y.distance=q,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[p]=Y;const Z=P.shadow;if(P.map&&(i.spotLightMap[C]=P.map,C++,Z.updateMatrices(P),P.castShadow&&z++),i.spotLightMatrix[p]=Z.matrix,P.castShadow){const ee=n.get(P);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,i.spotShadow[p]=ee,i.spotShadowMap[p]=X,A++}p++}else if(P.isRectAreaLight){const Y=t.get(P);Y.color.copy(D).multiplyScalar(G),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[E]=Y,E++}else if(P.isPointLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity*w),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const Z=P.shadow,ee=n.get(P);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,ee.shadowCameraNear=Z.camera.near,ee.shadowCameraFar=Z.camera.far,i.pointShadow[m]=ee,i.pointShadowMap[m]=X,i.pointShadowMatrix[m]=P.shadow.matrix,R++}i.point[m]=Y,m++}else if(P.isHemisphereLight){const Y=t.get(P);Y.skyColor.copy(P.color).multiplyScalar(G*w),Y.groundColor.copy(P.groundColor).multiplyScalar(G*w),i.hemi[x]=Y,x++}}E>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=v;const V=i.hash;(V.directionalLength!==g||V.pointLength!==m||V.spotLength!==p||V.rectAreaLength!==E||V.hemiLength!==x||V.numDirectionalShadows!==T||V.numPointShadows!==R||V.numSpotShadows!==A||V.numSpotMaps!==C||V.numLightProbes!==S)&&(i.directional.length=g,i.spot.length=p,i.rectArea.length=E,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=A+C-z,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=z,i.numLightProbes=S,V.directionalLength=g,V.pointLength=m,V.spotLength=p,V.rectAreaLength=E,V.hemiLength=x,V.numDirectionalShadows=T,V.numPointShadows=R,V.numSpotShadows=A,V.numSpotMaps=C,V.numLightProbes=S,i.version=Gg++)}function c(d,h){let u=0,f=0,v=0,g=0,m=0;const p=h.matrixWorldInverse;for(let E=0,x=d.length;E<x;E++){const T=d[E];if(T.isDirectionalLight){const R=i.directional[u];R.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),u++}else if(T.isSpotLight){const R=i.spot[v];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),v++}else if(T.isRectAreaLight){const R=i.rectArea[g];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(p),o.identity(),a.copy(T.matrixWorld),a.premultiply(p),o.extractRotation(a),R.halfWidth.set(T.width*.5,0,0),R.halfHeight.set(0,T.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const R=i.point[f];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(p),f++}else if(T.isHemisphereLight){const R=i.hemi[m];R.direction.setFromMatrixPosition(T.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:i}}function Ul(s,e){const t=new Yg(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Xg(s,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Ul(s,e),t.set(r,[l])):a>=o.length?(l=new Ul(s,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class qg extends Dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $g extends Dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const jg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kg=`uniform sampler2D shadow_pass;
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
}`;function Zg(s,e,t){let n=new Da;const i=new Se,r=new Se,a=new Ze,o=new qg({depthPacking:Rh}),l=new $g,c={},d=t.maxTextureSize,h={[Nn]:Ut,[Ut]:Nn,[tn]:tn},u=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:jg,fragmentShader:Kg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const v=new Nt;v.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new pt(v,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bc;let p=this.type;this.render=function(A,C,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=s.getRenderTarget(),w=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),W=s.state;W.setBlending(Rn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const ne=p!==fn&&this.type===fn,P=p===fn&&this.type!==fn;for(let D=0,G=A.length;D<G;D++){const q=A[D],X=q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const Y=X.getFrameExtents();if(i.multiply(Y),r.copy(X.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(r.x=Math.floor(d/Y.x),i.x=r.x*Y.x,X.mapSize.x=r.x),i.y>d&&(r.y=Math.floor(d/Y.y),i.y=r.y*Y.y,X.mapSize.y=r.y)),X.map===null||ne===!0||P===!0){const ee=this.type!==fn?{minFilter:yt,magFilter:yt}:{};X.map!==null&&X.map.dispose(),X.map=new Zn(i.x,i.y,ee),X.map.texture.name=q.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const Z=X.getViewportCount();for(let ee=0;ee<Z;ee++){const de=X.getViewport(ee);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),W.viewport(a),X.updateMatrices(q,ee),n=X.getFrustum(),T(C,z,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===fn&&E(X,z),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,w,V)};function E(A,C){const z=e.update(g);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Zn(i.x,i.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,z,u,g,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,z,f,g,null)}function x(A,C,z,S){let w=null;const V=z.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(V!==void 0)w=V;else if(w=z.isPointLight===!0?l:o,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const W=w.uuid,ne=C.uuid;let P=c[W];P===void 0&&(P={},c[W]=P);let D=P[ne];D===void 0&&(D=w.clone(),P[ne]=D,C.addEventListener("dispose",R)),w=D}if(w.visible=C.visible,w.wireframe=C.wireframe,S===fn?w.side=C.shadowSide!==null?C.shadowSide:C.side:w.side=C.shadowSide!==null?C.shadowSide:h[C.side],w.alphaMap=C.alphaMap,w.alphaTest=C.alphaTest,w.map=C.map,w.clipShadows=C.clipShadows,w.clippingPlanes=C.clippingPlanes,w.clipIntersection=C.clipIntersection,w.displacementMap=C.displacementMap,w.displacementScale=C.displacementScale,w.displacementBias=C.displacementBias,w.wireframeLinewidth=C.wireframeLinewidth,w.linewidth=C.linewidth,z.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const W=s.properties.get(w);W.light=z}return w}function T(A,C,z,S,w){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===fn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,A.matrixWorld);const ne=e.update(A),P=A.material;if(Array.isArray(P)){const D=ne.groups;for(let G=0,q=D.length;G<q;G++){const X=D[G],Y=P[X.materialIndex];if(Y&&Y.visible){const Z=x(A,Y,S,w);A.onBeforeShadow(s,A,C,z,ne,Z,X),s.renderBufferDirect(z,null,ne,Z,A,X),A.onAfterShadow(s,A,C,z,ne,Z,X)}}}else if(P.visible){const D=x(A,P,S,w);A.onBeforeShadow(s,A,C,z,ne,D,null),s.renderBufferDirect(z,null,ne,D,A,null),A.onAfterShadow(s,A,C,z,ne,D,null)}}const W=A.children;for(let ne=0,P=W.length;ne<P;ne++)T(W[ne],C,z,S,w)}function R(A){A.target.removeEventListener("dispose",R);for(const z in c){const S=c[z],w=A.target.uuid;w in S&&(S[w].dispose(),delete S[w])}}}function Jg(s,e,t){const n=t.isWebGL2;function i(){let I=!1;const re=new Ze;let ae=null;const we=new Ze(0,0,0,0);return{setMask:function(ye){ae!==ye&&!I&&(s.colorMask(ye,ye,ye,ye),ae=ye)},setLocked:function(ye){I=ye},setClear:function(ye,Je,Qe,vt,Ct){Ct===!0&&(ye*=vt,Je*=vt,Qe*=vt),re.set(ye,Je,Qe,vt),we.equals(re)===!1&&(s.clearColor(ye,Je,Qe,vt),we.copy(re))},reset:function(){I=!1,ae=null,we.set(-1,0,0,0)}}}function r(){let I=!1,re=null,ae=null,we=null;return{setTest:function(ye){ye?Pe(s.DEPTH_TEST):Me(s.DEPTH_TEST)},setMask:function(ye){re!==ye&&!I&&(s.depthMask(ye),re=ye)},setFunc:function(ye){if(ae!==ye){switch(ye){case rh:s.depthFunc(s.NEVER);break;case ah:s.depthFunc(s.ALWAYS);break;case oh:s.depthFunc(s.LESS);break;case Js:s.depthFunc(s.LEQUAL);break;case lh:s.depthFunc(s.EQUAL);break;case ch:s.depthFunc(s.GEQUAL);break;case dh:s.depthFunc(s.GREATER);break;case hh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ae=ye}},setLocked:function(ye){I=ye},setClear:function(ye){we!==ye&&(s.clearDepth(ye),we=ye)},reset:function(){I=!1,re=null,ae=null,we=null}}}function a(){let I=!1,re=null,ae=null,we=null,ye=null,Je=null,Qe=null,vt=null,Ct=null;return{setTest:function(et){I||(et?Pe(s.STENCIL_TEST):Me(s.STENCIL_TEST))},setMask:function(et){re!==et&&!I&&(s.stencilMask(et),re=et)},setFunc:function(et,It,Qt){(ae!==et||we!==It||ye!==Qt)&&(s.stencilFunc(et,It,Qt),ae=et,we=It,ye=Qt)},setOp:function(et,It,Qt){(Je!==et||Qe!==It||vt!==Qt)&&(s.stencilOp(et,It,Qt),Je=et,Qe=It,vt=Qt)},setLocked:function(et){I=et},setClear:function(et){Ct!==et&&(s.clearStencil(et),Ct=et)},reset:function(){I=!1,re=null,ae=null,we=null,ye=null,Je=null,Qe=null,vt=null,Ct=null}}}const o=new i,l=new r,c=new a,d=new WeakMap,h=new WeakMap;let u={},f={},v=new WeakMap,g=[],m=null,p=!1,E=null,x=null,T=null,R=null,A=null,C=null,z=null,S=new He(0,0,0),w=0,V=!1,W=null,ne=null,P=null,D=null,G=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Y=0;const Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(Z)[1]),X=Y>=1):Z.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),X=Y>=2);let ee=null,de={};const H=s.getParameter(s.SCISSOR_BOX),$=s.getParameter(s.VIEWPORT),le=new Ze().fromArray(H),ve=new Ze().fromArray($);function ge(I,re,ae,we){const ye=new Uint8Array(4),Je=s.createTexture();s.bindTexture(I,Je),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Qe=0;Qe<ae;Qe++)n&&(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)?s.texImage3D(re,0,s.RGBA,1,1,we,0,s.RGBA,s.UNSIGNED_BYTE,ye):s.texImage2D(re+Qe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ye);return Je}const Le={};Le[s.TEXTURE_2D]=ge(s.TEXTURE_2D,s.TEXTURE_2D,1),Le[s.TEXTURE_CUBE_MAP]=ge(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Le[s.TEXTURE_2D_ARRAY]=ge(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Le[s.TEXTURE_3D]=ge(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Pe(s.DEPTH_TEST),l.setFunc(Js),Ue(!1),M(po),Pe(s.CULL_FACE),pe(Rn);function Pe(I){u[I]!==!0&&(s.enable(I),u[I]=!0)}function Me(I){u[I]!==!1&&(s.disable(I),u[I]=!1)}function We(I,re){return f[I]!==re?(s.bindFramebuffer(I,re),f[I]=re,n&&(I===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=re),I===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=re)),!0):!1}function U(I,re){let ae=g,we=!1;if(I)if(ae=v.get(re),ae===void 0&&(ae=[],v.set(re,ae)),I.isWebGLMultipleRenderTargets){const ye=I.texture;if(ae.length!==ye.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let Je=0,Qe=ye.length;Je<Qe;Je++)ae[Je]=s.COLOR_ATTACHMENT0+Je;ae.length=ye.length,we=!0}}else ae[0]!==s.COLOR_ATTACHMENT0&&(ae[0]=s.COLOR_ATTACHMENT0,we=!0);else ae[0]!==s.BACK&&(ae[0]=s.BACK,we=!0);we&&(t.isWebGL2?s.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function At(I){return m!==I?(s.useProgram(I),m=I,!0):!1}const xe={[Gn]:s.FUNC_ADD,[Wd]:s.FUNC_SUBTRACT,[Yd]:s.FUNC_REVERSE_SUBTRACT};if(n)xe[vo]=s.MIN,xe[_o]=s.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(xe[vo]=I.MIN_EXT,xe[_o]=I.MAX_EXT)}const Ce={[Xd]:s.ZERO,[qd]:s.ONE,[$d]:s.SRC_COLOR,[pa]:s.SRC_ALPHA,[eh]:s.SRC_ALPHA_SATURATE,[Jd]:s.DST_COLOR,[Kd]:s.DST_ALPHA,[jd]:s.ONE_MINUS_SRC_COLOR,[fa]:s.ONE_MINUS_SRC_ALPHA,[Qd]:s.ONE_MINUS_DST_COLOR,[Zd]:s.ONE_MINUS_DST_ALPHA,[th]:s.CONSTANT_COLOR,[nh]:s.ONE_MINUS_CONSTANT_COLOR,[ih]:s.CONSTANT_ALPHA,[sh]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(I,re,ae,we,ye,Je,Qe,vt,Ct,et){if(I===Rn){p===!0&&(Me(s.BLEND),p=!1);return}if(p===!1&&(Pe(s.BLEND),p=!0),I!==Gd){if(I!==E||et!==V){if((x!==Gn||A!==Gn)&&(s.blendEquation(s.FUNC_ADD),x=Gn,A=Gn),et)switch(I){case wi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case fo:s.blendFunc(s.ONE,s.ONE);break;case mo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case go:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case wi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case fo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case mo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case go:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}T=null,R=null,C=null,z=null,S.set(0,0,0),w=0,E=I,V=et}return}ye=ye||re,Je=Je||ae,Qe=Qe||we,(re!==x||ye!==A)&&(s.blendEquationSeparate(xe[re],xe[ye]),x=re,A=ye),(ae!==T||we!==R||Je!==C||Qe!==z)&&(s.blendFuncSeparate(Ce[ae],Ce[we],Ce[Je],Ce[Qe]),T=ae,R=we,C=Je,z=Qe),(vt.equals(S)===!1||Ct!==w)&&(s.blendColor(vt.r,vt.g,vt.b,Ct),S.copy(vt),w=Ct),E=I,V=!1}function st(I,re){I.side===tn?Me(s.CULL_FACE):Pe(s.CULL_FACE);let ae=I.side===Ut;re&&(ae=!ae),Ue(ae),I.blending===wi&&I.transparent===!1?pe(Rn):pe(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),o.setMask(I.colorWrite);const we=I.stencilWrite;c.setTest(we),we&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),F(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Pe(s.SAMPLE_ALPHA_TO_COVERAGE):Me(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(I){W!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),W=I)}function M(I){I!==Vd?(Pe(s.CULL_FACE),I!==ne&&(I===po?s.cullFace(s.BACK):I===Hd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Me(s.CULL_FACE),ne=I}function y(I){I!==P&&(X&&s.lineWidth(I),P=I)}function F(I,re,ae){I?(Pe(s.POLYGON_OFFSET_FILL),(D!==re||G!==ae)&&(s.polygonOffset(re,ae),D=re,G=ae)):Me(s.POLYGON_OFFSET_FILL)}function J(I){I?Pe(s.SCISSOR_TEST):Me(s.SCISSOR_TEST)}function K(I){I===void 0&&(I=s.TEXTURE0+q-1),ee!==I&&(s.activeTexture(I),ee=I)}function Q(I,re,ae){ae===void 0&&(ee===null?ae=s.TEXTURE0+q-1:ae=ee);let we=de[ae];we===void 0&&(we={type:void 0,texture:void 0},de[ae]=we),(we.type!==I||we.texture!==re)&&(ee!==ae&&(s.activeTexture(ae),ee=ae),s.bindTexture(I,re||Le[I]),we.type=I,we.texture=re)}function fe(){const I=de[ee];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function oe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function he(){try{s.compressedTexImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ee(){try{s.texSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Oe(){try{s.texSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Xe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ze(){try{s.texStorage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{s.texStorage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function _e(){try{s.texImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ue(){try{s.texImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ne(I){le.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),le.copy(I))}function Ye(I){ve.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),ve.copy(I))}function at(I,re){let ae=h.get(re);ae===void 0&&(ae=new WeakMap,h.set(re,ae));let we=ae.get(I);we===void 0&&(we=s.getUniformBlockIndex(re,I.name),ae.set(I,we))}function ke(I,re){const we=h.get(re).get(I);d.get(re)!==we&&(s.uniformBlockBinding(re,we,I.__bindingPointIndex),d.set(re,we))}function ie(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ee=null,de={},f={},v=new WeakMap,g=[],m=null,p=!1,E=null,x=null,T=null,R=null,A=null,C=null,z=null,S=new He(0,0,0),w=0,V=!1,W=null,ne=null,P=null,D=null,G=null,le.set(0,0,s.canvas.width,s.canvas.height),ve.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Pe,disable:Me,bindFramebuffer:We,drawBuffers:U,useProgram:At,setBlending:pe,setMaterial:st,setFlipSided:Ue,setCullFace:M,setLineWidth:y,setPolygonOffset:F,setScissorTest:J,activeTexture:K,bindTexture:Q,unbindTexture:fe,compressedTexImage2D:oe,compressedTexImage3D:he,texImage2D:_e,texImage3D:ue,updateUBOMapping:at,uniformBlockBinding:ke,texStorage2D:ze,texStorage3D:Ae,texSubImage2D:Ee,texSubImage3D:Oe,compressedTexSubImage2D:j,compressedTexSubImage3D:Xe,scissor:Ne,viewport:Ye,reset:ie}}function Qg(s,e,t,n,i,r,a){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let h;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(M,y){return f?new OffscreenCanvas(M,y):ss("canvas")}function g(M,y,F,J){let K=1;if((M.width>J||M.height>J)&&(K=J/Math.max(M.width,M.height)),K<1||y===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){const Q=y?rr:Math.floor,fe=Q(K*M.width),oe=Q(K*M.height);h===void 0&&(h=v(fe,oe));const he=F?v(fe,oe):h;return he.width=fe,he.height=oe,he.getContext("2d").drawImage(M,0,0,fe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+fe+"x"+oe+")."),he}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function m(M){return ba(M.width)&&ba(M.height)}function p(M){return o?!1:M.wrapS!==Kt||M.wrapT!==Kt||M.minFilter!==yt&&M.minFilter!==Dt}function E(M,y){return M.generateMipmaps&&y&&M.minFilter!==yt&&M.minFilter!==Dt}function x(M){s.generateMipmap(M)}function T(M,y,F,J,K=!1){if(o===!1)return y;if(M!==null){if(s[M]!==void 0)return s[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let Q=y;if(y===s.RED&&(F===s.FLOAT&&(Q=s.R32F),F===s.HALF_FLOAT&&(Q=s.R16F),F===s.UNSIGNED_BYTE&&(Q=s.R8)),y===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(Q=s.R8UI),F===s.UNSIGNED_SHORT&&(Q=s.R16UI),F===s.UNSIGNED_INT&&(Q=s.R32UI),F===s.BYTE&&(Q=s.R8I),F===s.SHORT&&(Q=s.R16I),F===s.INT&&(Q=s.R32I)),y===s.RG&&(F===s.FLOAT&&(Q=s.RG32F),F===s.HALF_FLOAT&&(Q=s.RG16F),F===s.UNSIGNED_BYTE&&(Q=s.RG8)),y===s.RGBA){const fe=K?tr:Ke.getTransfer(J);F===s.FLOAT&&(Q=s.RGBA32F),F===s.HALF_FLOAT&&(Q=s.RGBA16F),F===s.UNSIGNED_BYTE&&(Q=fe===nt?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(M,y,F){return E(M,F)===!0||M.isFramebufferTexture&&M.minFilter!==yt&&M.minFilter!==Dt?Math.log2(Math.max(y.width,y.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?y.mipmaps.length:1}function A(M){return M===yt||M===yo||M===wr?s.NEAREST:s.LINEAR}function C(M){const y=M.target;y.removeEventListener("dispose",C),S(y),y.isVideoTexture&&d.delete(y)}function z(M){const y=M.target;y.removeEventListener("dispose",z),V(y)}function S(M){const y=n.get(M);if(y.__webglInit===void 0)return;const F=M.source,J=u.get(F);if(J){const K=J[y.__cacheKey];K.usedTimes--,K.usedTimes===0&&w(M),Object.keys(J).length===0&&u.delete(F)}n.remove(M)}function w(M){const y=n.get(M);s.deleteTexture(y.__webglTexture);const F=M.source,J=u.get(F);delete J[y.__cacheKey],a.memory.textures--}function V(M){const y=M.texture,F=n.get(M),J=n.get(y);if(J.__webglTexture!==void 0&&(s.deleteTexture(J.__webglTexture),a.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(F.__webglFramebuffer[K]))for(let Q=0;Q<F.__webglFramebuffer[K].length;Q++)s.deleteFramebuffer(F.__webglFramebuffer[K][Q]);else s.deleteFramebuffer(F.__webglFramebuffer[K]);F.__webglDepthbuffer&&s.deleteRenderbuffer(F.__webglDepthbuffer[K])}else{if(Array.isArray(F.__webglFramebuffer))for(let K=0;K<F.__webglFramebuffer.length;K++)s.deleteFramebuffer(F.__webglFramebuffer[K]);else s.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&s.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&s.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let K=0;K<F.__webglColorRenderbuffer.length;K++)F.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(F.__webglColorRenderbuffer[K]);F.__webglDepthRenderbuffer&&s.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let K=0,Q=y.length;K<Q;K++){const fe=n.get(y[K]);fe.__webglTexture&&(s.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(y[K])}n.remove(y),n.remove(M)}let W=0;function ne(){W=0}function P(){const M=W;return M>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+i.maxTextures),W+=1,M}function D(M){const y=[];return y.push(M.wrapS),y.push(M.wrapT),y.push(M.wrapR||0),y.push(M.magFilter),y.push(M.minFilter),y.push(M.anisotropy),y.push(M.internalFormat),y.push(M.format),y.push(M.type),y.push(M.generateMipmaps),y.push(M.premultiplyAlpha),y.push(M.flipY),y.push(M.unpackAlignment),y.push(M.colorSpace),y.join()}function G(M,y){const F=n.get(M);if(M.isVideoTexture&&st(M),M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){const J=M.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(F,M,y);return}}t.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+y)}function q(M,y){const F=n.get(M);if(M.version>0&&F.__version!==M.version){le(F,M,y);return}t.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+y)}function X(M,y){const F=n.get(M);if(M.version>0&&F.__version!==M.version){le(F,M,y);return}t.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+y)}function Y(M,y){const F=n.get(M);if(M.version>0&&F.__version!==M.version){ve(F,M,y);return}t.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+y)}const Z={[va]:s.REPEAT,[Kt]:s.CLAMP_TO_EDGE,[_a]:s.MIRRORED_REPEAT},ee={[yt]:s.NEAREST,[yo]:s.NEAREST_MIPMAP_NEAREST,[wr]:s.NEAREST_MIPMAP_LINEAR,[Dt]:s.LINEAR,[yh]:s.LINEAR_MIPMAP_NEAREST,[Kn]:s.LINEAR_MIPMAP_LINEAR},de={[Nh]:s.NEVER,[Bh]:s.ALWAYS,[Dh]:s.LESS,[Dc]:s.LEQUAL,[Uh]:s.EQUAL,[kh]:s.GEQUAL,[Oh]:s.GREATER,[Fh]:s.NOTEQUAL};function H(M,y,F){if(F?(s.texParameteri(M,s.TEXTURE_WRAP_S,Z[y.wrapS]),s.texParameteri(M,s.TEXTURE_WRAP_T,Z[y.wrapT]),(M===s.TEXTURE_3D||M===s.TEXTURE_2D_ARRAY)&&s.texParameteri(M,s.TEXTURE_WRAP_R,Z[y.wrapR]),s.texParameteri(M,s.TEXTURE_MAG_FILTER,ee[y.magFilter]),s.texParameteri(M,s.TEXTURE_MIN_FILTER,ee[y.minFilter])):(s.texParameteri(M,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(M,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(M===s.TEXTURE_3D||M===s.TEXTURE_2D_ARRAY)&&s.texParameteri(M,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(y.wrapS!==Kt||y.wrapT!==Kt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(M,s.TEXTURE_MAG_FILTER,A(y.magFilter)),s.texParameteri(M,s.TEXTURE_MIN_FILTER,A(y.minFilter)),y.minFilter!==yt&&y.minFilter!==Dt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(s.texParameteri(M,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(M,s.TEXTURE_COMPARE_FUNC,de[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===yt||y.minFilter!==wr&&y.minFilter!==Kn||y.type===mn&&e.has("OES_texture_float_linear")===!1||o===!1&&y.type===is&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(s.texParameterf(M,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function $(M,y){let F=!1;M.__webglInit===void 0&&(M.__webglInit=!0,y.addEventListener("dispose",C));const J=y.source;let K=u.get(J);K===void 0&&(K={},u.set(J,K));const Q=D(y);if(Q!==M.__cacheKey){K[Q]===void 0&&(K[Q]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[Q].usedTimes++;const fe=K[M.__cacheKey];fe!==void 0&&(K[M.__cacheKey].usedTimes--,fe.usedTimes===0&&w(y)),M.__cacheKey=Q,M.__webglTexture=K[Q].texture}return F}function le(M,y,F){let J=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(J=s.TEXTURE_3D);const K=$(M,y),Q=y.source;t.bindTexture(J,M.__webglTexture,s.TEXTURE0+F);const fe=n.get(Q);if(Q.version!==fe.__version||K===!0){t.activeTexture(s.TEXTURE0+F);const oe=Ke.getPrimaries(Ke.workingColorSpace),he=y.colorSpace===Gt?null:Ke.getPrimaries(y.colorSpace),Ee=y.colorSpace===Gt||oe===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Oe=p(y)&&m(y.image)===!1;let j=g(y.image,Oe,!1,i.maxTextureSize);j=Ue(y,j);const Xe=m(j)||o,ze=r.convert(y.format,y.colorSpace);let Ae=r.convert(y.type),_e=T(y.internalFormat,ze,Ae,y.colorSpace,y.isVideoTexture);H(J,y,Xe);let ue;const Ne=y.mipmaps,Ye=o&&y.isVideoTexture!==!0&&_e!==Rc,at=fe.__version===void 0||K===!0,ke=R(y,j,Xe);if(y.isDepthTexture)_e=s.DEPTH_COMPONENT,o?y.type===mn?_e=s.DEPTH_COMPONENT32F:y.type===In?_e=s.DEPTH_COMPONENT24:y.type===qn?_e=s.DEPTH24_STENCIL8:_e=s.DEPTH_COMPONENT16:y.type===mn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===$n&&_e===s.DEPTH_COMPONENT&&y.type!==La&&y.type!==In&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=In,Ae=r.convert(y.type)),y.format===Ii&&_e===s.DEPTH_COMPONENT&&(_e=s.DEPTH_STENCIL,y.type!==qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=qn,Ae=r.convert(y.type))),at&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,_e,j.width,j.height):t.texImage2D(s.TEXTURE_2D,0,_e,j.width,j.height,0,ze,Ae,null));else if(y.isDataTexture)if(Ne.length>0&&Xe){Ye&&at&&t.texStorage2D(s.TEXTURE_2D,ke,_e,Ne[0].width,Ne[0].height);for(let ie=0,I=Ne.length;ie<I;ie++)ue=Ne[ie],Ye?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,ze,Ae,ue.data):t.texImage2D(s.TEXTURE_2D,ie,_e,ue.width,ue.height,0,ze,Ae,ue.data);y.generateMipmaps=!1}else Ye?(at&&t.texStorage2D(s.TEXTURE_2D,ke,_e,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,j.width,j.height,ze,Ae,j.data)):t.texImage2D(s.TEXTURE_2D,0,_e,j.width,j.height,0,ze,Ae,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ye&&at&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ke,_e,Ne[0].width,Ne[0].height,j.depth);for(let ie=0,I=Ne.length;ie<I;ie++)ue=Ne[ie],y.format!==zt?ze!==null?Ye?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,j.depth,ze,ue.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ie,_e,ue.width,ue.height,j.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,j.depth,ze,Ae,ue.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ie,_e,ue.width,ue.height,j.depth,0,ze,Ae,ue.data)}else{Ye&&at&&t.texStorage2D(s.TEXTURE_2D,ke,_e,Ne[0].width,Ne[0].height);for(let ie=0,I=Ne.length;ie<I;ie++)ue=Ne[ie],y.format!==zt?ze!==null?Ye?t.compressedTexSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,ze,ue.data):t.compressedTexImage2D(s.TEXTURE_2D,ie,_e,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,ze,Ae,ue.data):t.texImage2D(s.TEXTURE_2D,ie,_e,ue.width,ue.height,0,ze,Ae,ue.data)}else if(y.isDataArrayTexture)Ye?(at&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ke,_e,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ze,Ae,j.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,_e,j.width,j.height,j.depth,0,ze,Ae,j.data);else if(y.isData3DTexture)Ye?(at&&t.texStorage3D(s.TEXTURE_3D,ke,_e,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ze,Ae,j.data)):t.texImage3D(s.TEXTURE_3D,0,_e,j.width,j.height,j.depth,0,ze,Ae,j.data);else if(y.isFramebufferTexture){if(at)if(Ye)t.texStorage2D(s.TEXTURE_2D,ke,_e,j.width,j.height);else{let ie=j.width,I=j.height;for(let re=0;re<ke;re++)t.texImage2D(s.TEXTURE_2D,re,_e,ie,I,0,ze,Ae,null),ie>>=1,I>>=1}}else if(Ne.length>0&&Xe){Ye&&at&&t.texStorage2D(s.TEXTURE_2D,ke,_e,Ne[0].width,Ne[0].height);for(let ie=0,I=Ne.length;ie<I;ie++)ue=Ne[ie],Ye?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ze,Ae,ue):t.texImage2D(s.TEXTURE_2D,ie,_e,ze,Ae,ue);y.generateMipmaps=!1}else Ye?(at&&t.texStorage2D(s.TEXTURE_2D,ke,_e,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ze,Ae,j)):t.texImage2D(s.TEXTURE_2D,0,_e,ze,Ae,j);E(y,Xe)&&x(J),fe.__version=Q.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function ve(M,y,F){if(y.image.length!==6)return;const J=$(M,y),K=y.source;t.bindTexture(s.TEXTURE_CUBE_MAP,M.__webglTexture,s.TEXTURE0+F);const Q=n.get(K);if(K.version!==Q.__version||J===!0){t.activeTexture(s.TEXTURE0+F);const fe=Ke.getPrimaries(Ke.workingColorSpace),oe=y.colorSpace===Gt?null:Ke.getPrimaries(y.colorSpace),he=y.colorSpace===Gt||fe===oe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ee=y.isCompressedTexture||y.image[0].isCompressedTexture,Oe=y.image[0]&&y.image[0].isDataTexture,j=[];for(let ie=0;ie<6;ie++)!Ee&&!Oe?j[ie]=g(y.image[ie],!1,!0,i.maxCubemapSize):j[ie]=Oe?y.image[ie].image:y.image[ie],j[ie]=Ue(y,j[ie]);const Xe=j[0],ze=m(Xe)||o,Ae=r.convert(y.format,y.colorSpace),_e=r.convert(y.type),ue=T(y.internalFormat,Ae,_e,y.colorSpace),Ne=o&&y.isVideoTexture!==!0,Ye=Q.__version===void 0||J===!0;let at=R(y,Xe,ze);H(s.TEXTURE_CUBE_MAP,y,ze);let ke;if(Ee){Ne&&Ye&&t.texStorage2D(s.TEXTURE_CUBE_MAP,at,ue,Xe.width,Xe.height);for(let ie=0;ie<6;ie++){ke=j[ie].mipmaps;for(let I=0;I<ke.length;I++){const re=ke[I];y.format!==zt?Ae!==null?Ne?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I,0,0,re.width,re.height,Ae,re.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I,ue,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I,0,0,re.width,re.height,Ae,_e,re.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I,ue,re.width,re.height,0,Ae,_e,re.data)}}}else{ke=y.mipmaps,Ne&&Ye&&(ke.length>0&&at++,t.texStorage2D(s.TEXTURE_CUBE_MAP,at,ue,j[0].width,j[0].height));for(let ie=0;ie<6;ie++)if(Oe){Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,j[ie].width,j[ie].height,Ae,_e,j[ie].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,j[ie].width,j[ie].height,0,Ae,_e,j[ie].data);for(let I=0;I<ke.length;I++){const ae=ke[I].image[ie].image;Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I+1,0,0,ae.width,ae.height,Ae,_e,ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I+1,ue,ae.width,ae.height,0,Ae,_e,ae.data)}}else{Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ae,_e,j[ie]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,Ae,_e,j[ie]);for(let I=0;I<ke.length;I++){const re=ke[I];Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I+1,0,0,Ae,_e,re.image[ie]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,I+1,ue,Ae,_e,re.image[ie])}}}E(y,ze)&&x(s.TEXTURE_CUBE_MAP),Q.__version=K.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function ge(M,y,F,J,K,Q){const fe=r.convert(F.format,F.colorSpace),oe=r.convert(F.type),he=T(F.internalFormat,fe,oe,F.colorSpace);if(!n.get(y).__hasExternalTextures){const Oe=Math.max(1,y.width>>Q),j=Math.max(1,y.height>>Q);K===s.TEXTURE_3D||K===s.TEXTURE_2D_ARRAY?t.texImage3D(K,Q,he,Oe,j,y.depth,0,fe,oe,null):t.texImage2D(K,Q,he,Oe,j,0,fe,oe,null)}t.bindFramebuffer(s.FRAMEBUFFER,M),pe(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,K,n.get(F).__webglTexture,0,Ce(y)):(K===s.TEXTURE_2D||K>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,K,n.get(F).__webglTexture,Q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(M,y,F){if(s.bindRenderbuffer(s.RENDERBUFFER,M),y.depthBuffer&&!y.stencilBuffer){let J=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(F||pe(y)){const K=y.depthTexture;K&&K.isDepthTexture&&(K.type===mn?J=s.DEPTH_COMPONENT32F:K.type===In&&(J=s.DEPTH_COMPONENT24));const Q=Ce(y);pe(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Q,J,y.width,y.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,Q,J,y.width,y.height)}else s.renderbufferStorage(s.RENDERBUFFER,J,y.width,y.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,M)}else if(y.depthBuffer&&y.stencilBuffer){const J=Ce(y);F&&pe(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,J,s.DEPTH24_STENCIL8,y.width,y.height):pe(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,J,s.DEPTH24_STENCIL8,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,M)}else{const J=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let K=0;K<J.length;K++){const Q=J[K],fe=r.convert(Q.format,Q.colorSpace),oe=r.convert(Q.type),he=T(Q.internalFormat,fe,oe,Q.colorSpace),Ee=Ce(y);F&&pe(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ee,he,y.width,y.height):pe(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ee,he,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,he,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Pe(M,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,M),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const J=n.get(y.depthTexture).__webglTexture,K=Ce(y);if(y.depthTexture.format===$n)pe(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(y.depthTexture.format===Ii)pe(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Me(M){const y=n.get(M),F=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Pe(y.__webglFramebuffer,M)}else if(F){y.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[J]),y.__webglDepthbuffer[J]=s.createRenderbuffer(),Le(y.__webglDepthbuffer[J],M,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=s.createRenderbuffer(),Le(y.__webglDepthbuffer,M,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function We(M,y,F){const J=n.get(M);y!==void 0&&ge(J.__webglFramebuffer,M,M.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Me(M)}function U(M){const y=M.texture,F=n.get(M),J=n.get(y);M.addEventListener("dispose",z),M.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=y.version,a.memory.textures++);const K=M.isWebGLCubeRenderTarget===!0,Q=M.isWebGLMultipleRenderTargets===!0,fe=m(M)||o;if(K){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(o&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let he=0;he<y.mipmaps.length;he++)F.__webglFramebuffer[oe][he]=s.createFramebuffer()}else F.__webglFramebuffer[oe]=s.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<y.mipmaps.length;oe++)F.__webglFramebuffer[oe]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Q)if(i.drawBuffers){const oe=M.texture;for(let he=0,Ee=oe.length;he<Ee;he++){const Oe=n.get(oe[he]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&M.samples>0&&pe(M)===!1){const oe=Q?y:[y];F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let he=0;he<oe.length;he++){const Ee=oe[he];F.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[he]);const Oe=r.convert(Ee.format,Ee.colorSpace),j=r.convert(Ee.type),Xe=T(Ee.internalFormat,Oe,j,Ee.colorSpace,M.isXRRenderTarget===!0),ze=Ce(M);s.renderbufferStorageMultisample(s.RENDERBUFFER,ze,Xe,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,F.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),M.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),Le(F.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),H(s.TEXTURE_CUBE_MAP,y,fe);for(let oe=0;oe<6;oe++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let he=0;he<y.mipmaps.length;he++)ge(F.__webglFramebuffer[oe][he],M,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else ge(F.__webglFramebuffer[oe],M,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);E(y,fe)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const oe=M.texture;for(let he=0,Ee=oe.length;he<Ee;he++){const Oe=oe[he],j=n.get(Oe);t.bindTexture(s.TEXTURE_2D,j.__webglTexture),H(s.TEXTURE_2D,Oe,fe),ge(F.__webglFramebuffer,M,Oe,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,0),E(Oe,fe)&&x(s.TEXTURE_2D)}t.unbindTexture()}else{let oe=s.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(o?oe=M.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,J.__webglTexture),H(oe,y,fe),o&&y.mipmaps&&y.mipmaps.length>0)for(let he=0;he<y.mipmaps.length;he++)ge(F.__webglFramebuffer[he],M,y,s.COLOR_ATTACHMENT0,oe,he);else ge(F.__webglFramebuffer,M,y,s.COLOR_ATTACHMENT0,oe,0);E(y,fe)&&x(oe),t.unbindTexture()}M.depthBuffer&&Me(M)}function At(M){const y=m(M)||o,F=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let J=0,K=F.length;J<K;J++){const Q=F[J];if(E(Q,y)){const fe=M.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,oe=n.get(Q).__webglTexture;t.bindTexture(fe,oe),x(fe),t.unbindTexture()}}}function xe(M){if(o&&M.samples>0&&pe(M)===!1){const y=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],F=M.width,J=M.height;let K=s.COLOR_BUFFER_BIT;const Q=[],fe=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=n.get(M),he=M.isWebGLMultipleRenderTargets===!0;if(he)for(let Ee=0;Ee<y.length;Ee++)t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Ee=0;Ee<y.length;Ee++){Q.push(s.COLOR_ATTACHMENT0+Ee),M.depthBuffer&&Q.push(fe);const Oe=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Oe===!1&&(M.depthBuffer&&(K|=s.DEPTH_BUFFER_BIT),M.stencilBuffer&&(K|=s.STENCIL_BUFFER_BIT)),he&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]),Oe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[fe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[fe])),he){const j=n.get(y[Ee]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,j,0)}s.blitFramebuffer(0,0,F,J,0,0,F,J,K,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let Ee=0;Ee<y.length;Ee++){t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]);const Oe=n.get(y[Ee]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ee,s.TEXTURE_2D,Oe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Ce(M){return Math.min(i.maxSamples,M.samples)}function pe(M){const y=n.get(M);return o&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function st(M){const y=a.render.frame;d.get(M)!==y&&(d.set(M,y),M.update())}function Ue(M,y){const F=M.colorSpace,J=M.format,K=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===ya||F!==yn&&F!==Gt&&(Ke.getTransfer(F)===nt?o===!1?e.has("EXT_sRGB")===!0&&J===zt?(M.format=ya,M.minFilter=Dt,M.generateMipmaps=!1):y=Oc.sRGBToLinear(y):(J!==zt||K!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}this.allocateTextureUnit=P,this.resetTextureUnits=ne,this.setTexture2D=G,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=We,this.setupRenderTarget=U,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=pe}function ev(s,e,t){const n=t.isWebGL2;function i(r,a=Gt){let o;const l=Ke.getTransfer(a);if(r===Pn)return s.UNSIGNED_BYTE;if(r===Tc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Ac)return s.UNSIGNED_SHORT_5_5_5_1;if(r===bh)return s.BYTE;if(r===Eh)return s.SHORT;if(r===La)return s.UNSIGNED_SHORT;if(r===wc)return s.INT;if(r===In)return s.UNSIGNED_INT;if(r===mn)return s.FLOAT;if(r===is)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Sh)return s.ALPHA;if(r===zt)return s.RGBA;if(r===Mh)return s.LUMINANCE;if(r===wh)return s.LUMINANCE_ALPHA;if(r===$n)return s.DEPTH_COMPONENT;if(r===Ii)return s.DEPTH_STENCIL;if(r===ya)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Th)return s.RED;if(r===Cc)return s.RED_INTEGER;if(r===Ah)return s.RG;if(r===Ic)return s.RG_INTEGER;if(r===Lc)return s.RGBA_INTEGER;if(r===Tr||r===Ar||r===Cr||r===Ir)if(l===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Tr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ar)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Cr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ir)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Tr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ar)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Cr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ir)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===bo||r===Eo||r===So||r===Mo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===bo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Eo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===So)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Mo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Rc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===wo||r===To)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===wo)return l===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===To)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ao||r===Co||r===Io||r===Lo||r===Ro||r===Po||r===No||r===Do||r===Uo||r===Oo||r===Fo||r===ko||r===Bo||r===Vo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Ao)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Co)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Io)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Lo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ro)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Po)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===No)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Do)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Uo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Oo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Fo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ko)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Bo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Vo)return l===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Lr||r===Ho||r===zo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Lr)return l===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ho)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===zo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Ch||r===Go||r===Wo||r===Yo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Lr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Go)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Wo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Yo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===qn?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class tv extends wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ei extends ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nv={type:"move"};class ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,v=.005;c.inputState.pinching&&u>f+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ei;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class iv extends Ni{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,f=null,v=null;const g=t.getContextAttributes();let m=null,p=null;const E=[],x=[],T=new Se;let R=null;const A=new wt;A.layers.enable(1),A.viewport=new Ze;const C=new wt;C.layers.enable(2),C.viewport=new Ze;const z=[A,C],S=new tv;S.layers.enable(1),S.layers.enable(2);let w=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let $=E[H];return $===void 0&&($=new ea,E[H]=$),$.getTargetRaySpace()},this.getControllerGrip=function(H){let $=E[H];return $===void 0&&($=new ea,E[H]=$),$.getGripSpace()},this.getHand=function(H){let $=E[H];return $===void 0&&($=new ea,E[H]=$),$.getHandSpace()};function W(H){const $=x.indexOf(H.inputSource);if($===-1)return;const le=E[$];le!==void 0&&(le.update(H.inputSource,H.frame,c||a),le.dispatchEvent({type:H.type,data:H.inputSource}))}function ne(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",ne),i.removeEventListener("inputsourceschange",P);for(let H=0;H<E.length;H++){const $=x[H];$!==null&&(x[H]=null,E[H].disconnect($))}w=null,V=null,e.setRenderTarget(m),f=null,u=null,h=null,i=null,p=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",ne),i.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(T),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const $={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,$),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Zn(f.framebufferWidth,f.framebufferHeight,{format:zt,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let $=null,le=null,ve=null;g.depth&&(ve=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=g.stencil?Ii:$n,le=g.stencil?qn:In);const ge={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};h=new XRWebGLBinding(i,t),u=h.createProjectionLayer(ge),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),p=new Zn(u.textureWidth,u.textureHeight,{format:zt,type:Pn,depthTexture:new qc(u.textureWidth,u.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Le=e.properties.get(p);Le.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),de.setContext(i),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(H){for(let $=0;$<H.removed.length;$++){const le=H.removed[$],ve=x.indexOf(le);ve>=0&&(x[ve]=null,E[ve].disconnect(le))}for(let $=0;$<H.added.length;$++){const le=H.added[$];let ve=x.indexOf(le);if(ve===-1){for(let Le=0;Le<E.length;Le++)if(Le>=x.length){x.push(le),ve=Le;break}else if(x[Le]===null){x[Le]=le,ve=Le;break}if(ve===-1)break}const ge=E[ve];ge&&ge.connect(le)}}const D=new L,G=new L;function q(H,$,le){D.setFromMatrixPosition($.matrixWorld),G.setFromMatrixPosition(le.matrixWorld);const ve=D.distanceTo(G),ge=$.projectionMatrix.elements,Le=le.projectionMatrix.elements,Pe=ge[14]/(ge[10]-1),Me=ge[14]/(ge[10]+1),We=(ge[9]+1)/ge[5],U=(ge[9]-1)/ge[5],At=(ge[8]-1)/ge[0],xe=(Le[8]+1)/Le[0],Ce=Pe*At,pe=Pe*xe,st=ve/(-At+xe),Ue=st*-At;$.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Ue),H.translateZ(st),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const M=Pe+st,y=Me+st,F=Ce-Ue,J=pe+(ve-Ue),K=We*Me/y*M,Q=U*Me/y*M;H.projectionMatrix.makePerspective(F,J,K,Q,M,y),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function X(H,$){$===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices($.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;S.near=C.near=A.near=H.near,S.far=C.far=A.far=H.far,(w!==S.near||V!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),w=S.near,V=S.far);const $=H.parent,le=S.cameras;X(S,$);for(let ve=0;ve<le.length;ve++)X(le[ve],$);le.length===2?q(S,A,C):S.projectionMatrix.copy(A.projectionMatrix),Y(H,S,$)};function Y(H,$,le){le===null?H.matrix.copy($.matrixWorld):(H.matrix.copy(le.matrixWorld),H.matrix.invert(),H.matrix.multiply($.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Li*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(H){l=H,u!==null&&(u.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)};let Z=null;function ee(H,$){if(d=$.getViewerPose(c||a),v=$,d!==null){const le=d.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let ve=!1;le.length!==S.cameras.length&&(S.cameras.length=0,ve=!0);for(let ge=0;ge<le.length;ge++){const Le=le[ge];let Pe=null;if(f!==null)Pe=f.getViewport(Le);else{const We=h.getViewSubImage(u,Le);Pe=We.viewport,ge===0&&(e.setRenderTargetTextures(p,We.colorTexture,u.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(p))}let Me=z[ge];Me===void 0&&(Me=new wt,Me.layers.enable(ge),Me.viewport=new Ze,z[ge]=Me),Me.matrix.fromArray(Le.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(Le.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),ge===0&&(S.matrix.copy(Me.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ve===!0&&S.cameras.push(Me)}}for(let le=0;le<E.length;le++){const ve=x[le],ge=E[le];ve!==null&&ge!==void 0&&ge.update(ve,$,c||a)}Z&&Z(H,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),v=null}const de=new Yc;de.setAnimationLoop(ee),this.setAnimationLoop=function(H){Z=H},this.dispose=function(){}}}function sv(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,zc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,E,x,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),v(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),g(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,E,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ut&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ut&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=e.get(p).envMap;if(E&&(m.envMap.value=E,m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ut&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function rv(s,e,t,n){let i={},r={},a=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,x){const T=x.program;n.uniformBlockBinding(E,T)}function c(E,x){let T=i[E.id];T===void 0&&(v(E),T=d(E),i[E.id]=T,E.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(E,R);const A=e.render.frame;r[E.id]!==A&&(u(E),r[E.id]=A)}function d(E){const x=h();E.__bindingPointIndex=x;const T=s.createBuffer(),R=E.__size,A=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,R,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,T),T}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){const x=i[E.id],T=E.uniforms,R=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let A=0,C=T.length;A<C;A++){const z=Array.isArray(T[A])?T[A]:[T[A]];for(let S=0,w=z.length;S<w;S++){const V=z[S];if(f(V,A,S,R)===!0){const W=V.__offset,ne=Array.isArray(V.value)?V.value:[V.value];let P=0;for(let D=0;D<ne.length;D++){const G=ne[D],q=g(G);typeof G=="number"||typeof G=="boolean"?(V.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,W+P,V.__data)):G.isMatrix3?(V.__data[0]=G.elements[0],V.__data[1]=G.elements[1],V.__data[2]=G.elements[2],V.__data[3]=0,V.__data[4]=G.elements[3],V.__data[5]=G.elements[4],V.__data[6]=G.elements[5],V.__data[7]=0,V.__data[8]=G.elements[6],V.__data[9]=G.elements[7],V.__data[10]=G.elements[8],V.__data[11]=0):(G.toArray(V.__data,P),P+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,W,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(E,x,T,R){const A=E.value,C=x+"_"+T;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const z=R[C];if(typeof A=="number"||typeof A=="boolean"){if(z!==A)return R[C]=A,!0}else if(z.equals(A)===!1)return z.copy(A),!0}return!1}function v(E){const x=E.uniforms;let T=0;const R=16;for(let C=0,z=x.length;C<z;C++){const S=Array.isArray(x[C])?x[C]:[x[C]];for(let w=0,V=S.length;w<V;w++){const W=S[w],ne=Array.isArray(W.value)?W.value:[W.value];for(let P=0,D=ne.length;P<D;P++){const G=ne[P],q=g(G),X=T%R;X!==0&&R-X<q.boundary&&(T+=R-X),W.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=T,T+=q.storage}}}const A=T%R;return A>0&&(T+=R-A),E.__size=T,E.__cache={},this}function g(E){const x={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(x.boundary=4,x.storage=4):E.isVector2?(x.boundary=8,x.storage=8):E.isVector3||E.isColor?(x.boundary=16,x.storage=12):E.isVector4?(x.boundary=16,x.storage=16):E.isMatrix3?(x.boundary=48,x.storage=48):E.isMatrix4?(x.boundary=64,x.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),x}function m(E){const x=E.target;x.removeEventListener("dispose",m);const T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const E in i)s.deleteBuffer(i[E]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class gr{constructor(e={}){const{canvas:t=eu(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=a;const f=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const p=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ht,this._useLegacyLights=!1,this.toneMapping=vn,this.toneMappingExposure=1;const x=this;let T=!1,R=0,A=0,C=null,z=-1,S=null;const w=new Ze,V=new Ze;let W=null;const ne=new He(0);let P=0,D=t.width,G=t.height,q=1,X=null,Y=null;const Z=new Ze(0,0,D,G),ee=new Ze(0,0,D,G);let de=!1;const H=new Da;let $=!1,le=!1,ve=null;const ge=new Ge,Le=new Se,Pe=new L,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return C===null?q:1}let U=n;function At(b,N){for(let k=0;k<b.length;k++){const B=b[k],O=t.getContext(B,N);if(O!==null)return O}return null}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ia}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",re,!1),U===null){const N=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&N.shift(),U=At(N,b),U===null)throw At(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let xe,Ce,pe,st,Ue,M,y,F,J,K,Q,fe,oe,he,Ee,Oe,j,Xe,ze,Ae,_e,ue,Ne,Ye;function at(){xe=new mm(U),Ce=new cm(U,xe,e),xe.init(Ce),ue=new ev(U,xe,Ce),pe=new Jg(U,xe,Ce),st=new _m(U),Ue=new kg,M=new Qg(U,xe,pe,Ue,Ce,ue,st),y=new hm(x),F=new fm(x),J=new wu(U,Ce),Ne=new om(U,xe,J,Ce),K=new gm(U,J,st,Ne),Q=new Em(U,K,J,st),ze=new bm(U,Ce,M),Oe=new dm(Ue),fe=new Fg(x,y,F,xe,Ce,Ne,Oe),oe=new sv(x,Ue),he=new Vg,Ee=new Xg(xe,Ce),Xe=new am(x,y,F,pe,Q,u,l),j=new Zg(x,Q,Ce),Ye=new rv(U,st,Ce,pe),Ae=new lm(U,xe,st,Ce),_e=new vm(U,xe,st,Ce),st.programs=fe.programs,x.capabilities=Ce,x.extensions=xe,x.properties=Ue,x.renderLists=he,x.shadowMap=j,x.state=pe,x.info=st}at();const ke=new iv(x,U);this.xr=ke,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const b=xe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=xe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(b){b!==void 0&&(q=b,this.setSize(D,G,!1))},this.getSize=function(b){return b.set(D,G)},this.setSize=function(b,N,k=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=b,G=N,t.width=Math.floor(b*q),t.height=Math.floor(N*q),k===!0&&(t.style.width=b+"px",t.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(D*q,G*q).floor()},this.setDrawingBufferSize=function(b,N,k){D=b,G=N,q=k,t.width=Math.floor(b*k),t.height=Math.floor(N*k),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(Z)},this.setViewport=function(b,N,k,B){b.isVector4?Z.set(b.x,b.y,b.z,b.w):Z.set(b,N,k,B),pe.viewport(w.copy(Z).multiplyScalar(q).floor())},this.getScissor=function(b){return b.copy(ee)},this.setScissor=function(b,N,k,B){b.isVector4?ee.set(b.x,b.y,b.z,b.w):ee.set(b,N,k,B),pe.scissor(V.copy(ee).multiplyScalar(q).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(b){pe.setScissorTest(de=b)},this.setOpaqueSort=function(b){X=b},this.setTransparentSort=function(b){Y=b},this.getClearColor=function(b){return b.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor.apply(Xe,arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha.apply(Xe,arguments)},this.clear=function(b=!0,N=!0,k=!0){let B=0;if(b){let O=!1;if(C!==null){const ce=C.texture.format;O=ce===Lc||ce===Ic||ce===Cc}if(O){const ce=C.texture.type,me=ce===Pn||ce===In||ce===La||ce===qn||ce===Tc||ce===Ac,be=Xe.getClearColor(),Te=Xe.getClearAlpha(),Fe=be.r,Ie=be.g,Re=be.b;me?(f[0]=Fe,f[1]=Ie,f[2]=Re,f[3]=Te,U.clearBufferuiv(U.COLOR,0,f)):(v[0]=Fe,v[1]=Ie,v[2]=Re,v[3]=Te,U.clearBufferiv(U.COLOR,0,v))}else B|=U.COLOR_BUFFER_BIT}N&&(B|=U.DEPTH_BUFFER_BIT),k&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",re,!1),he.dispose(),Ee.dispose(),Ue.dispose(),y.dispose(),F.dispose(),Q.dispose(),Ne.dispose(),Ye.dispose(),fe.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",Ct),ke.removeEventListener("sessionend",et),ve&&(ve.dispose(),ve=null),It.stop()};function ie(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const b=st.autoReset,N=j.enabled,k=j.autoUpdate,B=j.needsUpdate,O=j.type;at(),st.autoReset=b,j.enabled=N,j.autoUpdate=k,j.needsUpdate=B,j.type=O}function re(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ae(b){const N=b.target;N.removeEventListener("dispose",ae),we(N)}function we(b){ye(b),Ue.remove(b)}function ye(b){const N=Ue.get(b).programs;N!==void 0&&(N.forEach(function(k){fe.releaseProgram(k)}),b.isShaderMaterial&&fe.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,k,B,O,ce){N===null&&(N=Me);const me=O.isMesh&&O.matrixWorld.determinant()<0,be=Td(b,N,k,B,O);pe.setMaterial(B,me);let Te=k.index,Fe=1;if(B.wireframe===!0){if(Te=K.getWireframeAttribute(k),Te===void 0)return;Fe=2}const Ie=k.drawRange,Re=k.attributes.position;let dt=Ie.start*Fe,Ot=(Ie.start+Ie.count)*Fe;ce!==null&&(dt=Math.max(dt,ce.start*Fe),Ot=Math.min(Ot,(ce.start+ce.count)*Fe)),Te!==null?(dt=Math.max(dt,0),Ot=Math.min(Ot,Te.count)):Re!=null&&(dt=Math.max(dt,0),Ot=Math.min(Ot,Re.count));const _t=Ot-dt;if(_t<0||_t===1/0)return;Ne.setup(O,B,be,k,Te);let on,rt=Ae;if(Te!==null&&(on=J.get(Te),rt=_e,rt.setIndex(on)),O.isMesh)B.wireframe===!0?(pe.setLineWidth(B.wireframeLinewidth*We()),rt.setMode(U.LINES)):rt.setMode(U.TRIANGLES);else if(O.isLine){let Be=B.linewidth;Be===void 0&&(Be=1),pe.setLineWidth(Be*We()),O.isLineSegments?rt.setMode(U.LINES):O.isLineLoop?rt.setMode(U.LINE_LOOP):rt.setMode(U.LINE_STRIP)}else O.isPoints?rt.setMode(U.POINTS):O.isSprite&&rt.setMode(U.TRIANGLES);if(O.isBatchedMesh)rt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)rt.renderInstances(dt,_t,O.count);else if(k.isInstancedBufferGeometry){const Be=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,br=Math.min(k.instanceCount,Be);rt.renderInstances(dt,_t,br)}else rt.render(dt,_t)};function Je(b,N,k){b.transparent===!0&&b.side===tn&&b.forceSinglePass===!1?(b.side=Ut,b.needsUpdate=!0,us(b,N,k),b.side=Nn,b.needsUpdate=!0,us(b,N,k),b.side=tn):us(b,N,k)}this.compile=function(b,N,k=null){k===null&&(k=b),m=Ee.get(k),m.init(),E.push(m),k.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),b!==k&&b.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights(x._useLegacyLights);const B=new Set;return b.traverse(function(O){const ce=O.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const be=ce[me];Je(be,k,O),B.add(be)}else Je(ce,k,O),B.add(ce)}),E.pop(),m=null,B},this.compileAsync=function(b,N,k=null){const B=this.compile(b,N,k);return new Promise(O=>{function ce(){if(B.forEach(function(me){Ue.get(me).currentProgram.isReady()&&B.delete(me)}),B.size===0){O(b);return}setTimeout(ce,10)}xe.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Qe=null;function vt(b){Qe&&Qe(b)}function Ct(){It.stop()}function et(){It.start()}const It=new Yc;It.setAnimationLoop(vt),typeof self<"u"&&It.setContext(self),this.setAnimationLoop=function(b){Qe=b,ke.setAnimationLoop(b),b===null?It.stop():It.start()},ke.addEventListener("sessionstart",Ct),ke.addEventListener("sessionend",et),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(N),N=ke.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,N,C),m=Ee.get(b,E.length),m.init(),E.push(m),ge.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),H.setFromProjectionMatrix(ge),le=this.localClippingEnabled,$=Oe.init(this.clippingPlanes,le),g=he.get(b,p.length),g.init(),p.push(g),Qt(b,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(X,Y),this.info.render.frame++,$===!0&&Oe.beginShadows();const k=m.state.shadowsArray;if(j.render(k,b,N),$===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Xe.render(g,b),m.setupLights(x._useLegacyLights),N.isArrayCamera){const B=N.cameras;for(let O=0,ce=B.length;O<ce;O++){const me=B[O];Qa(g,b,me,me.viewport)}}else Qa(g,b,N);C!==null&&(M.updateMultisampleRenderTarget(C),M.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(x,b,N),Ne.resetDefaultState(),z=-1,S=null,E.pop(),E.length>0?m=E[E.length-1]:m=null,p.pop(),p.length>0?g=p[p.length-1]:g=null};function Qt(b,N,k,B){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)k=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||H.intersectsSprite(b)){B&&Pe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ge);const me=Q.update(b),be=b.material;be.visible&&g.push(b,me,be,k,Pe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||H.intersectsObject(b))){const me=Q.update(b),be=b.material;if(B&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Pe.copy(b.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Pe.copy(me.boundingSphere.center)),Pe.applyMatrix4(b.matrixWorld).applyMatrix4(ge)),Array.isArray(be)){const Te=me.groups;for(let Fe=0,Ie=Te.length;Fe<Ie;Fe++){const Re=Te[Fe],dt=be[Re.materialIndex];dt&&dt.visible&&g.push(b,me,dt,k,Pe.z,Re)}}else be.visible&&g.push(b,me,be,k,Pe.z,null)}}const ce=b.children;for(let me=0,be=ce.length;me<be;me++)Qt(ce[me],N,k,B)}function Qa(b,N,k,B){const O=b.opaque,ce=b.transmissive,me=b.transparent;m.setupLightsView(k),$===!0&&Oe.setGlobalState(x.clippingPlanes,k),ce.length>0&&wd(O,ce,N,k),B&&pe.viewport(w.copy(B)),O.length>0&&hs(O,N,k),ce.length>0&&hs(ce,N,k),me.length>0&&hs(me,N,k),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function wd(b,N,k,B){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const ce=Ce.isWebGL2;ve===null&&(ve=new Zn(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?is:Pn,minFilter:Kn,samples:ce?4:0})),x.getDrawingBufferSize(Le),ce?ve.setSize(Le.x,Le.y):ve.setSize(rr(Le.x),rr(Le.y));const me=x.getRenderTarget();x.setRenderTarget(ve),x.getClearColor(ne),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const be=x.toneMapping;x.toneMapping=vn,hs(b,k,B),M.updateMultisampleRenderTarget(ve),M.updateRenderTargetMipmap(ve);let Te=!1;for(let Fe=0,Ie=N.length;Fe<Ie;Fe++){const Re=N[Fe],dt=Re.object,Ot=Re.geometry,_t=Re.material,on=Re.group;if(_t.side===tn&&dt.layers.test(B.layers)){const rt=_t.side;_t.side=Ut,_t.needsUpdate=!0,eo(dt,k,B,Ot,_t,on),_t.side=rt,_t.needsUpdate=!0,Te=!0}}Te===!0&&(M.updateMultisampleRenderTarget(ve),M.updateRenderTargetMipmap(ve)),x.setRenderTarget(me),x.setClearColor(ne,P),x.toneMapping=be}function hs(b,N,k){const B=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ce=b.length;O<ce;O++){const me=b[O],be=me.object,Te=me.geometry,Fe=B===null?me.material:B,Ie=me.group;be.layers.test(k.layers)&&eo(be,N,k,Te,Fe,Ie)}}function eo(b,N,k,B,O,ce){b.onBeforeRender(x,N,k,B,O,ce),b.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(x,N,k,B,b,ce),O.transparent===!0&&O.side===tn&&O.forceSinglePass===!1?(O.side=Ut,O.needsUpdate=!0,x.renderBufferDirect(k,N,B,O,b,ce),O.side=Nn,O.needsUpdate=!0,x.renderBufferDirect(k,N,B,O,b,ce),O.side=tn):x.renderBufferDirect(k,N,B,O,b,ce),b.onAfterRender(x,N,k,B,O,ce)}function us(b,N,k){N.isScene!==!0&&(N=Me);const B=Ue.get(b),O=m.state.lights,ce=m.state.shadowsArray,me=O.state.version,be=fe.getParameters(b,O.state,ce,N,k),Te=fe.getProgramCacheKey(be);let Fe=B.programs;B.environment=b.isMeshStandardMaterial?N.environment:null,B.fog=N.fog,B.envMap=(b.isMeshStandardMaterial?F:y).get(b.envMap||B.environment),Fe===void 0&&(b.addEventListener("dispose",ae),Fe=new Map,B.programs=Fe);let Ie=Fe.get(Te);if(Ie!==void 0){if(B.currentProgram===Ie&&B.lightsStateVersion===me)return no(b,be),Ie}else be.uniforms=fe.getUniforms(b),b.onBuild(k,be,x),b.onBeforeCompile(be,x),Ie=fe.acquireProgram(be,Te),Fe.set(Te,Ie),B.uniforms=be.uniforms;const Re=B.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Re.clippingPlanes=Oe.uniform),no(b,be),B.needsLights=Cd(b),B.lightsStateVersion=me,B.needsLights&&(Re.ambientLightColor.value=O.state.ambient,Re.lightProbe.value=O.state.probe,Re.directionalLights.value=O.state.directional,Re.directionalLightShadows.value=O.state.directionalShadow,Re.spotLights.value=O.state.spot,Re.spotLightShadows.value=O.state.spotShadow,Re.rectAreaLights.value=O.state.rectArea,Re.ltc_1.value=O.state.rectAreaLTC1,Re.ltc_2.value=O.state.rectAreaLTC2,Re.pointLights.value=O.state.point,Re.pointLightShadows.value=O.state.pointShadow,Re.hemisphereLights.value=O.state.hemi,Re.directionalShadowMap.value=O.state.directionalShadowMap,Re.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Re.spotShadowMap.value=O.state.spotShadowMap,Re.spotLightMatrix.value=O.state.spotLightMatrix,Re.spotLightMap.value=O.state.spotLightMap,Re.pointShadowMap.value=O.state.pointShadowMap,Re.pointShadowMatrix.value=O.state.pointShadowMatrix),B.currentProgram=Ie,B.uniformsList=null,Ie}function to(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Xs.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function no(b,N){const k=Ue.get(b);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function Td(b,N,k,B,O){N.isScene!==!0&&(N=Me),M.resetTextureUnits();const ce=N.fog,me=B.isMeshStandardMaterial?N.environment:null,be=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:yn,Te=(B.isMeshStandardMaterial?F:y).get(B.envMap||me),Fe=B.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ie=!!k.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Re=!!k.morphAttributes.position,dt=!!k.morphAttributes.normal,Ot=!!k.morphAttributes.color;let _t=vn;B.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(_t=x.toneMapping);const on=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,rt=on!==void 0?on.length:0,Be=Ue.get(B),br=m.state.lights;if($===!0&&(le===!0||b!==S)){const Bt=b===S&&B.id===z;Oe.setState(B,b,Bt)}let ot=!1;B.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==br.state.version||Be.outputColorSpace!==be||O.isBatchedMesh&&Be.batching===!1||!O.isBatchedMesh&&Be.batching===!0||O.isInstancedMesh&&Be.instancing===!1||!O.isInstancedMesh&&Be.instancing===!0||O.isSkinnedMesh&&Be.skinning===!1||!O.isSkinnedMesh&&Be.skinning===!0||O.isInstancedMesh&&Be.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Be.instancingColor===!1&&O.instanceColor!==null||Be.envMap!==Te||B.fog===!0&&Be.fog!==ce||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Oe.numPlanes||Be.numIntersection!==Oe.numIntersection)||Be.vertexAlphas!==Fe||Be.vertexTangents!==Ie||Be.morphTargets!==Re||Be.morphNormals!==dt||Be.morphColors!==Ot||Be.toneMapping!==_t||Ce.isWebGL2===!0&&Be.morphTargetsCount!==rt)&&(ot=!0):(ot=!0,Be.__version=B.version);let Un=Be.currentProgram;ot===!0&&(Un=us(B,N,O));let io=!1,Bi=!1,Er=!1;const Et=Un.getUniforms(),On=Be.uniforms;if(pe.useProgram(Un.program)&&(io=!0,Bi=!0,Er=!0),B.id!==z&&(z=B.id,Bi=!0),io||S!==b){Et.setValue(U,"projectionMatrix",b.projectionMatrix),Et.setValue(U,"viewMatrix",b.matrixWorldInverse);const Bt=Et.map.cameraPosition;Bt!==void 0&&Bt.setValue(U,Pe.setFromMatrixPosition(b.matrixWorld)),Ce.logarithmicDepthBuffer&&Et.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Et.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,Bi=!0,Er=!0)}if(O.isSkinnedMesh){Et.setOptional(U,O,"bindMatrix"),Et.setOptional(U,O,"bindMatrixInverse");const Bt=O.skeleton;Bt&&(Ce.floatVertexTextures?(Bt.boneTexture===null&&Bt.computeBoneTexture(),Et.setValue(U,"boneTexture",Bt.boneTexture,M)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Et.setOptional(U,O,"batchingTexture"),Et.setValue(U,"batchingTexture",O._matricesTexture,M));const Sr=k.morphAttributes;if((Sr.position!==void 0||Sr.normal!==void 0||Sr.color!==void 0&&Ce.isWebGL2===!0)&&ze.update(O,k,Un),(Bi||Be.receiveShadow!==O.receiveShadow)&&(Be.receiveShadow=O.receiveShadow,Et.setValue(U,"receiveShadow",O.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(On.envMap.value=Te,On.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),Bi&&(Et.setValue(U,"toneMappingExposure",x.toneMappingExposure),Be.needsLights&&Ad(On,Er),ce&&B.fog===!0&&oe.refreshFogUniforms(On,ce),oe.refreshMaterialUniforms(On,B,q,G,ve),Xs.upload(U,to(Be),On,M)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Xs.upload(U,to(Be),On,M),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Et.setValue(U,"center",O.center),Et.setValue(U,"modelViewMatrix",O.modelViewMatrix),Et.setValue(U,"normalMatrix",O.normalMatrix),Et.setValue(U,"modelMatrix",O.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Bt=B.uniformsGroups;for(let Mr=0,Id=Bt.length;Mr<Id;Mr++)if(Ce.isWebGL2){const so=Bt[Mr];Ye.update(so,Un),Ye.bind(so,Un)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Un}function Ad(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function Cd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,N,k){Ue.get(b.texture).__webglTexture=N,Ue.get(b.depthTexture).__webglTexture=k;const B=Ue.get(b);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=k===void 0,B.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,N){const k=Ue.get(b);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,k=0){C=b,R=N,A=k;let B=!0,O=null,ce=!1,me=!1;if(b){const Te=Ue.get(b);Te.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(U.FRAMEBUFFER,null),B=!1):Te.__webglFramebuffer===void 0?M.setupRenderTarget(b):Te.__hasExternalTextures&&M.rebindTextures(b,Ue.get(b.texture).__webglTexture,Ue.get(b.depthTexture).__webglTexture);const Fe=b.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(me=!0);const Ie=Ue.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ie[N])?O=Ie[N][k]:O=Ie[N],ce=!0):Ce.isWebGL2&&b.samples>0&&M.useMultisampledRTT(b)===!1?O=Ue.get(b).__webglMultisampledFramebuffer:Array.isArray(Ie)?O=Ie[k]:O=Ie,w.copy(b.viewport),V.copy(b.scissor),W=b.scissorTest}else w.copy(Z).multiplyScalar(q).floor(),V.copy(ee).multiplyScalar(q).floor(),W=de;if(pe.bindFramebuffer(U.FRAMEBUFFER,O)&&Ce.drawBuffers&&B&&pe.drawBuffers(b,O),pe.viewport(w),pe.scissor(V),pe.setScissorTest(W),ce){const Te=Ue.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,Te.__webglTexture,k)}else if(me){const Te=Ue.get(b.texture),Fe=N||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Te.__webglTexture,k||0,Fe)}z=-1},this.readRenderTargetPixels=function(b,N,k,B,O,ce,me){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ue.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be){pe.bindFramebuffer(U.FRAMEBUFFER,be);try{const Te=b.texture,Fe=Te.format,Ie=Te.type;if(Fe!==zt&&ue.convert(Fe)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Re=Ie===is&&(xe.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Ie!==Pn&&ue.convert(Ie)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===mn&&(Ce.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Re){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-B&&k>=0&&k<=b.height-O&&U.readPixels(N,k,B,O,ue.convert(Fe),ue.convert(Ie),ce)}finally{const Te=C!==null?Ue.get(C).__webglFramebuffer:null;pe.bindFramebuffer(U.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(b,N,k=0){const B=Math.pow(2,-k),O=Math.floor(N.image.width*B),ce=Math.floor(N.image.height*B);M.setTexture2D(N,0),U.copyTexSubImage2D(U.TEXTURE_2D,k,0,0,b.x,b.y,O,ce),pe.unbindTexture()},this.copyTextureToTexture=function(b,N,k,B=0){const O=N.image.width,ce=N.image.height,me=ue.convert(k.format),be=ue.convert(k.type);M.setTexture2D(k,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment),N.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,B,b.x,b.y,O,ce,me,be,N.image.data):N.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,B,b.x,b.y,N.mipmaps[0].width,N.mipmaps[0].height,me,N.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,B,b.x,b.y,me,be,N.image),B===0&&k.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(b,N,k,B,O=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=b.max.x-b.min.x+1,me=b.max.y-b.min.y+1,be=b.max.z-b.min.z+1,Te=ue.convert(B.format),Fe=ue.convert(B.type);let Ie;if(B.isData3DTexture)M.setTexture3D(B,0),Ie=U.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)M.setTexture2DArray(B,0),Ie=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);const Re=U.getParameter(U.UNPACK_ROW_LENGTH),dt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Ot=U.getParameter(U.UNPACK_SKIP_PIXELS),_t=U.getParameter(U.UNPACK_SKIP_ROWS),on=U.getParameter(U.UNPACK_SKIP_IMAGES),rt=k.isCompressedTexture?k.mipmaps[O]:k.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,rt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,rt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,b.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,b.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,b.min.z),k.isDataTexture||k.isData3DTexture?U.texSubImage3D(Ie,O,N.x,N.y,N.z,ce,me,be,Te,Fe,rt.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ie,O,N.x,N.y,N.z,ce,me,be,Te,rt.data)):U.texSubImage3D(Ie,O,N.x,N.y,N.z,ce,me,be,Te,Fe,rt),U.pixelStorei(U.UNPACK_ROW_LENGTH,Re),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,dt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ot),U.pixelStorei(U.UNPACK_SKIP_ROWS,_t),U.pixelStorei(U.UNPACK_SKIP_IMAGES,on),O===0&&B.generateMipmaps&&U.generateMipmap(Ie),pe.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?M.setTextureCube(b,0):b.isData3DTexture?M.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?M.setTexture2DArray(b,0):M.setTexture2D(b,0),pe.unbindTexture()},this.resetState=function(){R=0,A=0,C=null,pe.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ra?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===pr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ht?_n:Pc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===_n?ht:yn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class av extends gr{}av.prototype.isWebGL1Renderer=!0;class Fa extends ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class ov{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Jt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Lt=new L;class ar{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),n=$e(n,this.array),i=$e(i,this.array),r=$e(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ar(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Qc extends Dn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let mi;const Wi=new L,gi=new L,vi=new L,_i=new Se,Yi=new Se,ed=new Ge,Us=new L,Xi=new L,Os=new L,Ol=new Se,ta=new Se,Fl=new Se;class lv extends ct{constructor(e=new Qc){if(super(),this.isSprite=!0,this.type="Sprite",mi===void 0){mi=new Nt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ov(t,5);mi.setIndex([0,1,2,0,2,3]),mi.setAttribute("position",new ar(n,3,0,!1)),mi.setAttribute("uv",new ar(n,2,3,!1))}this.geometry=mi,this.material=e,this.center=new Se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gi.setFromMatrixScale(this.matrixWorld),ed.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),vi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gi.multiplyScalar(-vi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Fs(Us.set(-.5,-.5,0),vi,a,gi,i,r),Fs(Xi.set(.5,-.5,0),vi,a,gi,i,r),Fs(Os.set(.5,.5,0),vi,a,gi,i,r),Ol.set(0,0),ta.set(1,0),Fl.set(1,1);let o=e.ray.intersectTriangle(Us,Xi,Os,!1,Wi);if(o===null&&(Fs(Xi.set(-.5,.5,0),vi,a,gi,i,r),ta.set(0,1),o=e.ray.intersectTriangle(Us,Os,Xi,!1,Wi),o===null))return;const l=e.ray.origin.distanceTo(Wi);l<e.near||l>e.far||t.push({distance:l,point:Wi.clone(),uv:Ht.getInterpolation(Wi,Us,Xi,Os,Ol,ta,Fl,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Fs(s,e,t,n,i,r){_i.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Yi.x=r*_i.x-i*_i.y,Yi.y=i*_i.x+r*_i.y):Yi.copy(_i),s.copy(e),s.x+=Yi.x,s.y+=Yi.y,s.applyMatrix4(ed)}const kl=new L,Bl=new Ze,Vl=new Ze,cv=new L,Hl=new Ge,ks=new L,na=new En,zl=new Ge,ia=new ls;class K0 extends pt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=xo,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new sn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ks),this.boundingBox.expandByPoint(ks)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new En),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ks),this.boundingSphere.expandByPoint(ks)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),na.copy(this.boundingSphere),na.applyMatrix4(i),e.ray.intersectsSphere(na)!==!1&&(zl.copy(i).invert(),ia.copy(e.ray).applyMatrix4(zl),!(this.boundingBox!==null&&ia.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ia)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ze,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===xo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===xh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Bl.fromBufferAttribute(i.attributes.skinIndex,e),Vl.fromBufferAttribute(i.attributes.skinWeight,e),kl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Vl.getComponent(r);if(a!==0){const o=Bl.getComponent(r);Hl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(cv.copy(kl).applyMatrix4(Hl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class dv extends ct{constructor(){super(),this.isBone=!0,this.type="Bone"}}class hv extends Tt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=yt,d=yt,h,u){super(null,a,o,l,c,d,i,r,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Gl=new Ge,uv=new Ge;class td{constructor(e=[],t=[]){this.uuid=Jt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:uv;Gl.multiplyMatrices(o,t[r]),Gl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new td(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new hv(t,e,e,zt,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new dv),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Wl extends Wt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const xi=new Ge,Yl=new Ge,Bs=[],Xl=new sn,pv=new Ge,qi=new pt,$i=new En;class Z0 extends pt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,pv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xi),Xl.copy(e.boundingBox).applyMatrix4(xi),this.boundingBox.union(Xl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new En),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xi),$i.copy(e.boundingSphere).applyMatrix4(xi),this.boundingSphere.union($i)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(qi.geometry=this.geometry,qi.material=this.material,qi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$i.copy(this.boundingSphere),$i.applyMatrix4(n),e.ray.intersectsSphere($i)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,xi),Yl.multiplyMatrices(n,xi),qi.matrixWorld=Yl,qi.raycast(e,Bs);for(let a=0,o=Bs.length;a<o;a++){const l=Bs[a];l.instanceId=r,l.object=this,t.push(l)}Bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Wl(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class ka extends Dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ql=new L,$l=new L,jl=new Ge,sa=new ls,Vs=new En;class Ba extends ct{constructor(e=new Nt,t=new ka){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)ql.fromBufferAttribute(t,i-1),$l.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ql.distanceTo($l);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(i),Vs.radius+=r,e.ray.intersectsSphere(Vs)===!1)return;jl.copy(i).invert(),sa.copy(e.ray).applyMatrix4(jl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new L,d=new L,h=new L,u=new L,f=this.isLineSegments?2:1,v=n.index,m=n.attributes.position;if(v!==null){const p=Math.max(0,a.start),E=Math.min(v.count,a.start+a.count);for(let x=p,T=E-1;x<T;x+=f){const R=v.getX(x),A=v.getX(x+1);if(c.fromBufferAttribute(m,R),d.fromBufferAttribute(m,A),sa.distanceSqToSegment(c,d,u,h)>l)continue;u.applyMatrix4(this.matrixWorld);const z=e.ray.origin.distanceTo(u);z<e.near||z>e.far||t.push({distance:z,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),E=Math.min(m.count,a.start+a.count);for(let x=p,T=E-1;x<T;x+=f){if(c.fromBufferAttribute(m,x),d.fromBufferAttribute(m,x+1),sa.distanceSqToSegment(c,d,u,h)>l)continue;u.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(u);A<e.near||A>e.far||t.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Kl=new L,Zl=new L;class fv extends Ba{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Kl.fromBufferAttribute(t,i),Zl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Kl.distanceTo(Zl);e.setAttribute("lineDistance",new ft(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class J0 extends Ba{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class mv extends Dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new He(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Jl=new Ge,Sa=new ls,Hs=new En,zs=new L;class Q0 extends ct{constructor(e=new Nt,t=new mv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(i),Hs.radius+=r,e.ray.intersectsSphere(Hs)===!1)return;Jl.copy(i).invert(),Sa.copy(e.ray).applyMatrix4(Jl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let v=u,g=f;v<g;v++){const m=c.getX(v);zs.fromBufferAttribute(h,m),Ql(zs,m,l,i,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let v=u,g=f;v<g;v++)zs.fromBufferAttribute(h,v),Ql(zs,v,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ql(s,e,t,n,i,r,a){const o=Sa.distanceSqToPoint(s);if(o<t){const l=new L;Sa.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Ma extends Tt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Va extends Nt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new L,d=new Se;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,u=3;h<=t;h++,u+=3){const f=n+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[u]/e+1)/2,d.y=(a[u+1]/e+1)/2,l.push(d.x,d.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new ft(a,3)),this.setAttribute("normal",new ft(o,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Va(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ha extends Nt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const d=[],h=[],u=[],f=[];let v=0;const g=[],m=n/2;let p=0;E(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new ft(h,3)),this.setAttribute("normal",new ft(u,3)),this.setAttribute("uv",new ft(f,2));function E(){const T=new L,R=new L;let A=0;const C=(t-e)/n;for(let z=0;z<=r;z++){const S=[],w=z/r,V=w*(t-e)+e;for(let W=0;W<=i;W++){const ne=W/i,P=ne*l+o,D=Math.sin(P),G=Math.cos(P);R.x=V*D,R.y=-w*n+m,R.z=V*G,h.push(R.x,R.y,R.z),T.set(D,C,G).normalize(),u.push(T.x,T.y,T.z),f.push(ne,1-w),S.push(v++)}g.push(S)}for(let z=0;z<i;z++)for(let S=0;S<r;S++){const w=g[S][z],V=g[S+1][z],W=g[S+1][z+1],ne=g[S][z+1];d.push(w,V,ne),d.push(V,W,ne),A+=6}c.addGroup(p,A,0),p+=A}function x(T){const R=v,A=new Se,C=new L;let z=0;const S=T===!0?e:t,w=T===!0?1:-1;for(let W=1;W<=i;W++)h.push(0,m*w,0),u.push(0,w,0),f.push(.5,.5),v++;const V=v;for(let W=0;W<=i;W++){const P=W/i*l+o,D=Math.cos(P),G=Math.sin(P);C.x=S*G,C.y=m*w,C.z=S*D,h.push(C.x,C.y,C.z),u.push(0,w,0),A.x=D*.5+.5,A.y=G*.5*w+.5,f.push(A.x,A.y),v++}for(let W=0;W<i;W++){const ne=R+W,P=V+W;T===!0?d.push(P,P+1,ne):d.push(P+1,P,ne),z+=3}c.addGroup(p,z,T===!0?1:2),p+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ha(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class vr extends Nt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new L,u=new L,f=[],v=[],g=[],m=[];for(let p=0;p<=n;p++){const E=[],x=p/n;let T=0;p===0&&a===0?T=.5/t:p===n&&l===Math.PI&&(T=-.5/t);for(let R=0;R<=t;R++){const A=R/t;h.x=-e*Math.cos(i+A*r)*Math.sin(a+x*o),h.y=e*Math.cos(a+x*o),h.z=e*Math.sin(i+A*r)*Math.sin(a+x*o),v.push(h.x,h.y,h.z),u.copy(h).normalize(),g.push(u.x,u.y,u.z),m.push(A+T,1-x),E.push(c++)}d.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){const x=d[p][E+1],T=d[p][E],R=d[p+1][E],A=d[p+1][E+1];(p!==0||a>0)&&f.push(x,T,A),(p!==n-1||l<Math.PI)&&f.push(T,R,A)}this.setIndex(f),this.setAttribute("position",new ft(v,3)),this.setAttribute("normal",new ft(g,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class za extends Dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nc,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ex extends za{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Gs(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function gv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function vv(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function ec(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function nd(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class _r{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class _v extends _r{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xo,endingEnd:Xo}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case qo:r=e,o=2*t-n;break;case $o:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case qo:a=e,l=2*n-t;break;case $o:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,f=this._weightNext,v=(n-t)/(i-t),g=v*v,m=g*v,p=-u*m+2*u*g-u*v,E=(1+u)*m+(-1.5-2*u)*g+(-.5+u)*v+1,x=(-1-f)*m+(1.5+f)*g+.5*v,T=f*m-f*g;for(let R=0;R!==o;++R)r[R]=p*a[d+R]+E*a[c+R]+x*a[l+R]+T*a[h+R];return r}}class xv extends _r{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(n-t)/(i-t),h=1-d;for(let u=0;u!==o;++u)r[u]=a[c+u]*h+a[l+u]*d;return r}}class yv extends _r{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class an{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gs(t,this.TimeBufferType),this.values=Gs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Gs(e.times,Array),values:Gs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new _v(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Qs:t=this.InterpolantFactoryMethodDiscrete;break;case er:t=this.InterpolantFactoryMethodLinear;break;case Rr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qs;case this.InterpolantFactoryMethodLinear:return er;case this.InterpolantFactoryMethodSmooth:return Rr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&gv(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Rr,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(i)l=!0;else{const h=o*n,u=h-n,f=h+n;for(let v=0;v!==n;++v){const g=t[h+v];if(g!==t[u+v]||g!==t[f+v]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const h=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}an.prototype.TimeBufferType=Float32Array;an.prototype.ValueBufferType=Float32Array;an.prototype.DefaultInterpolation=er;class Fi extends an{}Fi.prototype.ValueTypeName="bool";Fi.prototype.ValueBufferType=Array;Fi.prototype.DefaultInterpolation=Qs;Fi.prototype.InterpolantFactoryMethodLinear=void 0;Fi.prototype.InterpolantFactoryMethodSmooth=void 0;class id extends an{}id.prototype.ValueTypeName="color";class or extends an{}or.prototype.ValueTypeName="number";class bv extends _r{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let d=c+o;c!==d;c+=4)Di.slerpFlat(r,0,a,c-o,a,c,l);return r}}class cs extends an{InterpolantFactoryMethodLinear(e){return new bv(this.times,this.values,this.getValueSize(),e)}}cs.prototype.ValueTypeName="quaternion";cs.prototype.DefaultInterpolation=er;cs.prototype.InterpolantFactoryMethodSmooth=void 0;class ki extends an{}ki.prototype.ValueTypeName="string";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=Qs;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;class lr extends an{}lr.prototype.ValueTypeName="vector";class tx{constructor(e,t=-1,n,i=Ih){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Jt(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Sv(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(an.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const d=vv(l);l=ec(l,1,d),c=ec(c,1,d),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new or(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],d=c.name.match(r);if(d&&d.length>1){const h=d[1];let u=i[h];u||(i[h]=u=[]),u.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,u,f,v,g){if(f.length!==0){const m=[],p=[];nd(f,m,p,v),m.length!==0&&g.push(new h(u,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const u=c[h].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let v;for(v=0;v<u.length;v++)if(u[v].morphTargets)for(let g=0;g<u[v].morphTargets.length;g++)f[u[v].morphTargets[g]]=-1;for(const g in f){const m=[],p=[];for(let E=0;E!==u[v].morphTargets.length;++E){const x=u[v];m.push(x.time),p.push(x.morphTarget===g?1:0)}i.push(new or(".morphTargetInfluence["+g+"]",m,p))}l=f.length*a}else{const f=".bones["+t[h].name+"]";n(lr,f+".position",u,"pos",i),n(cs,f+".quaternion",u,"rot",i),n(lr,f+".scale",u,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ev(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return or;case"vector":case"vector2":case"vector3":case"vector4":return lr;case"color":return id;case"quaternion":return cs;case"bool":case"boolean":return Fi;case"string":return ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Sv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ev(s.type);if(s.times===void 0){const t=[],n=[];nd(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Ln={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Mv{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&i.onStart!==void 0&&i.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,i.onProgress!==void 0&&i.onProgress(d,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(d){i.onError!==void 0&&i.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){const f=c[h],v=c[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return v}return null}}}const wv=new Mv;class ds{constructor(e){this.manager=e!==void 0?e:wv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ds.DEFAULT_MATERIAL_NAME="__DEFAULT";const pn={};class Tv extends Error{constructor(e,t){super(e),this.response=t}}class nx extends ds{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ln.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(pn[e]!==void 0){pn[e].push({onLoad:t,onProgress:n,onError:i});return}pn[e]=[],pn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const d=pn[e],h=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=u?parseInt(u):0,v=f!==0;let g=0;const m=new ReadableStream({start(p){E();function E(){h.read().then(({done:x,value:T})=>{if(x)p.close();else{g+=T.byteLength;const R=new ProgressEvent("progress",{lengthComputable:v,loaded:g,total:f});for(let A=0,C=d.length;A<C;A++){const z=d[A];z.onProgress&&z.onProgress(R)}p.enqueue(T),E()}})}}});return new Response(m)}else throw new Tv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(d=>new DOMParser().parseFromString(d,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(v=>f.decode(v))}}}).then(c=>{Ln.add(e,c);const d=pn[e];delete pn[e];for(let h=0,u=d.length;h<u;h++){const f=d[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const d=pn[e];if(d===void 0)throw this.manager.itemError(e),c;delete pn[e];for(let h=0,u=d.length;h<u;h++){const f=d[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Av extends ds{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ln.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=ss("img");function l(){d(),Ln.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){d(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Cv extends ds{constructor(e){super(e)}load(e,t,n,i){const r=new Tt,a=new Av(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class xr extends ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const ra=new Ge,tc=new L,nc=new L;class Ga{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Da,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;tc.setFromMatrixPosition(e.matrixWorld),t.position.copy(tc),nc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nc),t.updateMatrixWorld(),ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Iv extends Ga{constructor(){super(new wt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Li*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ix extends xr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Iv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ic=new Ge,ji=new L,aa=new L;class Lv extends Ga{constructor(){super(new wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Se(4,2),this._viewportCount=6,this._viewports=[new Ze(2,1,1,1),new Ze(0,1,1,1),new Ze(3,1,1,1),new Ze(1,1,1,1),new Ze(3,0,1,1),new Ze(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ji.setFromMatrixPosition(e.matrixWorld),n.position.copy(ji),aa.copy(n.position),aa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(aa),n.updateMatrixWorld(),i.makeTranslation(-ji.x,-ji.y,-ji.z),ic.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ic)}}class sx extends xr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Lv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Rv extends Ga{constructor(){super(new Xc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sd extends xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ct.DEFAULT_UP),this.updateMatrix(),this.target=new ct,this.shadow=new Rv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class rd extends xr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class rx{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ax extends ds{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Ln.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ln.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Ln.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Ln.add(e,l),r.manager.itemStart(e)}}const Wa="\\[\\]\\.:\\/",Pv=new RegExp("["+Wa+"]","g"),Ya="[^"+Wa+"]",Nv="[^"+Wa.replace("\\.","")+"]",Dv=/((?:WC+[\/:])*)/.source.replace("WC",Ya),Uv=/(WCOD+)?/.source.replace("WCOD",Nv),Ov=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ya),Fv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ya),kv=new RegExp("^"+Dv+Uv+Ov+Fv+"$"),Bv=["material","materials","bones","map"];class Vv{constructor(e,t,n){const i=n||je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class je{constructor(e,t,n){this.path=t,this.parsedPath=n||je.parseTrackName(t),this.node=je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new je.Composite(e,t,n):new je(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Pv,"")}static parseTrackName(e){const t=kv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Bv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}je.Composite=Vv;je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};je.prototype.GetterByBindingType=[je.prototype._getValue_direct,je.prototype._getValue_array,je.prototype._getValue_arrayElement,je.prototype._getValue_toArray];je.prototype.SetterByBindingTypeAndVersioning=[[je.prototype._setValue_direct,je.prototype._setValue_direct_setNeedsUpdate,je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[je.prototype._setValue_array,je.prototype._setValue_array_setNeedsUpdate,je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[je.prototype._setValue_arrayElement,je.prototype._setValue_arrayElement_setNeedsUpdate,je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[je.prototype._setValue_fromArray,je.prototype._setValue_fromArray_setNeedsUpdate,je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class rs{constructor(e,t,n=0,i=1/0){this.ray=new ls(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Na,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return wa(e,this,n,t),n.sort(sc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)wa(e[i],this,n,t);return n.sort(sc),n}}function sc(s,e){return s.distance-e.distance}function wa(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,a=i.length;r<a;r++)wa(i[r],e,t,!0)}}class ox{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(bt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Hv extends fv{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Nt;i.setAttribute("position",new ft(t,3)),i.setAttribute("color",new ft(n,3));const r=new ka({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){const i=new He,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ia}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ia);var rn=(s=>(s.THUMB="thumb",s.PANO_LOW="panoLow",s.PANO="pano",s.VIDEO="video",s.COVER="cover",s.MAP="map",s.DOLLHOUSE="dollhouse",s))(rn||{});function bn(s,e){return!s||typeof s!="string"||s.trim()===""?"":s.trim()}const zv=Object.freeze(Object.defineProperty({__proto__:null,AssetType:rn,resolveAssetUrl:bn},Symbol.toStringTag,{value:"Module"}));function as(){const s=document;return!!(document.fullscreenElement||s.webkitFullscreenElement)}function Gv(){const s=()=>{};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}var Pt=(s=>(s.LOADING_LOW="loadingLow",s.LOW_READY="lowReady",s.LOADING_HIGH="loadingHigh",s.HIGH_READY="highReady",s.DEGRADED="degraded",s.ERROR="error",s))(Pt||{});class Wv{constructor(){_(this,"element");_(this,"currentStatus","loadingLow");_(this,"autoHideTimer",null);this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){if(as()){this.hide();return}this.currentStatus=e,this.render(),e==="highReady"||e==="lowReady"?(this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.autoHideTimer=window.setTimeout(()=>{this.hide()},3e3)):this.show()}render(){const{text:e,icon:t,className:n}=this.getStatusInfo();this.element.innerHTML=`
      <div class="quality-indicator-content ${n}">
        <span class="quality-icon">${t}</span>
        <span class="quality-text">${e}</span>
      </div>
    `}getStatusInfo(){switch(this.currentStatus){case"loadingLow":return{text:"正在加载低清图...",icon:"⏳",className:"status-loading"};case"lowReady":return{text:"低清图已加载",icon:"✅",className:"status-ready"};case"loadingHigh":return{text:"正在加载高清图...",icon:"⏳",className:"status-loading"};case"highReady":return{text:"已切换至高清",icon:"✨",className:"status-ready"};case"degraded":return{text:"当前为低清模式（网络较慢）",icon:"⚠️",className:"status-degraded"};case"error":return{text:"加载失败",icon:"❌",className:"status-error"};default:return{text:"",icon:"",className:""}}}show(){this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
      .quality-indicator {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s, transform 0.3s;
      }
      .quality-indicator.show {
        opacity: 1;
        transform: translateY(0);
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
        .quality-indicator {
          left: 50%;
          right: auto;
          bottom: auto;
          top: calc(12px + env(safe-area-inset-top, 0px));
          transform: translateX(-50%) translateY(10px);
        }
        .quality-indicator.show {
          transform: translateX(-50%) translateY(0);
        }
        .quality-indicator-content {
          padding: 6px 12px;
          font-size: 12px;
        }
      }
    `,document.head.appendChild(e)}}function Yv(s=512){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");if(!t){const c=new Ma(e);return c.needsUpdate=!0,c}const n=s/2,i=s/2,r=s/2*.92;t.clearRect(0,0,s,s);const a=t.createRadialGradient(n,i,r*.25,n,i,r);a.addColorStop(0,"rgba(0,0,0,0.00)"),a.addColorStop(.55,"rgba(0,0,0,0.18)"),a.addColorStop(1,"rgba(0,0,0,0.55)"),t.fillStyle=a,t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.closePath(),t.fill(),t.fillStyle="rgba(0,0,0,0.55)",t.beginPath(),t.arc(n,i,r*.28,0,Math.PI*2),t.closePath(),t.fill();const o=t.createRadialGradient(n,i,0,n,i,r*.42);o.addColorStop(0,"rgba(0,0,0,0.22)"),o.addColorStop(1,"rgba(0,0,0,0.00)"),t.fillStyle=o,t.beginPath(),t.arc(n,i,r*.42,0,Math.PI*2),t.closePath(),t.fill(),t.save(),t.translate(n,i);for(let c=0;c<360;c+=30){const d=c*Math.PI/180,h=c%90===0,u=h?r*.12:r*.07,f=h?2:1;t.strokeStyle=h?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.14)",t.lineWidth=f,t.beginPath(),t.moveTo(Math.sin(d)*(r-u),-Math.cos(d)*(r-u)),t.lineTo(Math.sin(d)*r,-Math.cos(d)*r),t.stroke()}t.restore(),t.strokeStyle="rgba(255,255,255,0.08)",t.lineWidth=2,t.beginPath(),t.arc(n,i,r,0,Math.PI*2),t.closePath(),t.stroke();const l=new Ma(e);return l.colorSpace=ht,l.center.set(.5,.5),l.rotation=0,l.flipY=!1,l.needsUpdate=!0,l}const lt=typeof window<"u"?new URLSearchParams(window.location.search).get("debug")==="1":!1;function qe(...s){lt&&console.debug("[VR Debug]",...s)}function Xv(s){return Math.max(0,Math.min(1,s))}function qv(s){const e=Xv(s);return e*e*(3-2*e)}class $v{constructor(e,t){_(this,"mesh");_(this,"needleMesh",null);_(this,"texture");_(this,"radius");_(this,"opacity",0);_(this,"northYaw",0);_(this,"debugHelper",null);_(this,"labelSprites",new Map);_(this,"patchRadius",0);_(this,"showPitchDeg",-45);_(this,"fadeRangeDeg",18);_(this,"fadeTauMs",140);_(this,"lastRotationY",0);_(this,"debugFrameCount",0);_(this,"isDebugVisible",!0);this.radius=t;const n=t*.18;this.patchRadius=n;const i=new Va(n,96);i.rotateX(Math.PI/2),this.texture=Yv(512);const r=new Ri({map:this.texture,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:tn});this.mesh=new pt(i,r),this.mesh.name="NadirPatch-compass-disk",this.mesh.position.set(0,-t+.5,0),this.mesh.renderOrder=9999,this.mesh.visible=!1,this.mesh.rotation.y=0,e.add(this.mesh);const a=n*.008,o=n*.35,l=new Ha(a,a,o,8);l.rotateX(Math.PI/2),l.translate(0,0,o/2);const c=new Ri({color:16777215,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1});if(this.needleMesh=new pt(l,c),this.needleMesh.name="NadirPatch-compass-needle",this.needleMesh.position.set(0,-t+.51,0),this.needleMesh.rotation.order="YXZ",this.needleMesh.renderOrder=1e4,this.needleMesh.visible=!1,e.add(this.needleMesh),this.createLabelSprites(e,n,t),lt&&(r.color.setHex(65535),this.debugHelper=new Hv(n*.5),this.debugHelper.position.copy(this.mesh.position),this.debugHelper.renderOrder=10001,e.add(this.debugHelper),console.debug("[NadirPatch] 对象已创建:",{uuid:this.mesh.uuid,name:this.mesh.name,type:this.mesh.type,position:this.mesh.position,rotation:this.mesh.rotation})),typeof window<"u"){const d=h=>{(h.key==="N"||h.key==="n")&&!(h.target instanceof HTMLInputElement||h.target instanceof HTMLTextAreaElement)&&(h.preventDefault(),this.isDebugVisible=!this.isDebugVisible,this.mesh.visible=this.isDebugVisible&&this.opacity>.01,this.needleMesh&&(this.needleMesh.visible=this.isDebugVisible&&this.opacity>.01),this.debugHelper&&(this.debugHelper.visible=this.isDebugVisible&&this.opacity>.01),console.debug(`[NadirPatch] 显示状态切换为: ${this.isDebugVisible?"显示":"隐藏"}`))};window.addEventListener("keydown",d)}}setNorthYaw(e){this.northYaw=e}update(e,t,n){var f;const i=t.yaw,r=this.northYaw??0,a=xn.degToRad(-r);this.mesh.rotation.y=a,this.texture.rotation=0,this.texture.center.set(.5,.5);const o=-r;this.updateLabelSprites(o),this.needleMesh&&(this.needleMesh.rotation.y=xn.degToRad(i)),lt&&(this.debugFrameCount++,this.debugFrameCount%30===0&&(Math.abs(this.mesh.rotation.y-this.lastRotationY)>.001&&console.debug("[NadirPatch] 旋转变化:",{frame:this.debugFrameCount,cameraYaw:i.toFixed(2),northYaw:r.toFixed(2),needleYaw:i.toFixed(2),diskRotationY:this.mesh.rotation.y,needleRotationY:(f=this.needleMesh)==null?void 0:f.rotation.y,diskPosition:this.mesh.position}),this.lastRotationY=this.mesh.rotation.y));const c=qv((this.showPitchDeg-t.pitch)/this.fadeRangeDeg),d=1-Math.exp(-(n||16.7)/this.fadeTauMs);this.opacity=this.opacity+(c-this.opacity)*d;const h=this.mesh.material;h.opacity=this.opacity;const u=this.isDebugVisible&&this.opacity>.01;if(this.mesh.visible=u,this.needleMesh){this.needleMesh.visible=u;const v=this.needleMesh.material;v.opacity=this.opacity*.9}this.labelSprites.forEach(v=>{v.visible=u;const g=v.material;g.opacity=this.opacity*.85}),this.debugHelper&&(this.debugHelper.visible=u)}createLabelSprites(e,t,n){[{text:"北",baseAngle:0},{text:"东",baseAngle:270},{text:"南",baseAngle:180},{text:"西",baseAngle:90}].forEach(({text:r})=>{const a=document.createElement("canvas"),o=128;a.width=o,a.height=o;const l=a.getContext("2d");if(!l)return;l.clearRect(0,0,o,o),l.save(),l.shadowColor="rgba(255, 255, 255, 0.8)",l.shadowBlur=8,l.shadowOffsetX=0,l.shadowOffsetY=0,l.fillStyle="rgba(255, 255, 255, 0.85)",l.font=`600 ${Math.round(o*.5)}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`,l.textAlign="center",l.textBaseline="middle",l.fillText(r,o/2,o/2),l.restore();const c=new Ma(a);c.colorSpace=ht,c.needsUpdate=!0;const d=new Qc({map:c,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1}),h=new lv(d);h.name=`NadirPatch-label-${r}`,h.position.set(0,-n+.52,0),h.renderOrder=10001,h.visible=!1;const u=t*.15;h.scale.set(u,u,1),e.add(h),this.labelSprites.set(r,h)})}updateLabelSprites(e){[{text:"北",baseAngle:0},{text:"东",baseAngle:270},{text:"南",baseAngle:180},{text:"西",baseAngle:90}].forEach(({text:n,baseAngle:i})=>{const r=this.labelSprites.get(n);if(!r)return;const a=i+e,o=this.patchRadius*.56,l=xn.degToRad(a),c=-this.radius+.5,d=Math.sin(l)*o,h=Math.cos(l)*o;r.position.set(d,c+.02,h);const u=new L(0,0,0);r.lookAt(u)})}dispose(e){e.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.texture.dispose(),this.needleMesh&&(e.remove(this.needleMesh),this.needleMesh.geometry.dispose(),this.needleMesh.material.dispose()),this.labelSprites.forEach(t=>{e.remove(t),t.material.dispose(),t.material.map&&t.material.map.dispose()}),this.labelSprites.clear(),this.debugHelper&&(e.remove(this.debugHelper),this.debugHelper.dispose())}}function jv(s,e,t){const n=(s-t.left)/t.width*2-1,i=-((e-t.top)/t.height*2-1);return{x:n,y:i}}function Kv(s,e,t,n=500){const i=new rs;i.setFromCamera(new Se(s,e),t);const r=i.ray.direction;if(!r||r.length()===0)return null;const a=r.normalize(),o=Math.asin(Math.max(-1,Math.min(1,a.y))),l=xn.radToDeg(o),c=Math.atan2(a.x,a.z);return{yaw:xn.radToDeg(c),pitch:l}}const Ta=-55,Zv=-90;function Xa(s){const e=Math.max(0,Math.min(1,(s-Ta)/(Zv-Ta))),t=e,n=-e*8,i=1-e*.7,r=e*2;return{opacity:t,translateY:n,scaleY:i,blur:r,clarity:e}}function qa(s){return s<=Ta}class Jv{constructor(){_(this,"listeners",new Map);_(this,"lastInteractionTs",0);_(this,"idleDelay",800);_(this,"idleTimer",null);_(this,"rafId",null);_(this,"isScheduled",!1);this.listeners.set("user-interacting",new Set),this.listeners.set("user-idle",new Set),this.listeners.set("ui-engaged",new Set)}on(e,t){const n=this.listeners.get(e);return n?(n.add(t),()=>{n.delete(t)}):(console.warn(`[InteractionBus] 未知事件类型: ${e}`),()=>{})}off(e,t){const n=this.listeners.get(e);n&&n.delete(t)}emit(e){this.isScheduled||(this.isScheduled=!0,this.rafId=requestAnimationFrame(()=>{this.isScheduled=!1;const t=this.listeners.get(e);t&&t.forEach(n=>{try{n()}catch(i){console.error("[InteractionBus] 事件监听器执行失败:",i)}})}))}emitInteracting(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("user-interacting")}scheduleIdle(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.idleTimer=window.setTimeout(()=>{Date.now()-this.lastInteractionTs>=this.idleDelay&&(this.idleTimer=null,this.emit("user-idle"))},this.idleDelay)}emitUIEngaged(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("ui-engaged")}dispose(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.listeners.forEach(e=>e.clear()),this.listeners.clear()}}const it=new Jv;class Qv{constructor(e={}){_(this,"root");_(this,"disk");_(this,"mask");_(this,"polemask");_(this,"northLabel");_(this,"eastLabel");_(this,"southLabel");_(this,"westLabel");_(this,"needle");_(this,"currentYaw",0);_(this,"currentPitch",0);_(this,"northYaw",0);_(this,"sceneId","");_(this,"northYawLabel",null);_(this,"isVisible",!1);_(this,"unsubscribeInteracting",null);_(this,"unsubscribeIdle",null);_(this,"unsubscribeUIEngaged",null);_(this,"baseOpacity",0);this.root=document.createElement("div"),this.root.className="vr-compass",this.root.setAttribute("data-ui","CompassDisk"),this.root.style.outline="2px solid #ff00ff",this.disk=document.createElement("div"),this.disk.className="vr-compass__disk",this.disk.setAttribute("data-ui","CompassDisk-disk"),this.mask=document.createElement("div"),this.mask.className="vr-compass__mask",this.polemask=document.createElement("div"),this.polemask.className="vr-compass__polemask",this.polemask.setAttribute("aria-hidden","true"),this.northLabel=document.createElement("div"),this.northLabel.className="vr-compass__label vr-compass__label--north",this.northLabel.textContent="北",this.eastLabel=document.createElement("div"),this.eastLabel.className="vr-compass__label vr-compass__label--east",this.eastLabel.textContent="东",this.southLabel=document.createElement("div"),this.southLabel.className="vr-compass__label vr-compass__label--south",this.southLabel.textContent="南",this.westLabel=document.createElement("div"),this.westLabel.className="vr-compass__label vr-compass__label--west",this.westLabel.textContent="西",this.needle=document.createElement("div"),this.needle.className="vr-compass__needle",this.needle.setAttribute("data-ui","CompassDisk-needle"),this.northYawLabel=document.createElement("div"),this.northYawLabel.className="vr-compass__north-yaw-label",this.northYawLabel.style.cssText=`
      position: absolute;
      bottom: -20px;
      right: 10px;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.6);
      font-family: monospace;
      pointer-events: none;
      display: none;
    `,this.disk.appendChild(this.mask),this.disk.appendChild(this.polemask),this.disk.appendChild(this.northLabel),this.disk.appendChild(this.eastLabel),this.disk.appendChild(this.southLabel),this.disk.appendChild(this.westLabel),this.disk.appendChild(this.needle),this.root.appendChild(this.disk),this.root.appendChild(this.northYawLabel),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.root.style.setProperty("--compass-disk-rot","0deg"),this.root.style.setProperty("--compass-needle-rot","0deg"),this.root.style.setProperty("--compass-label-counter-rot","0deg"),this.setupInteractionListeners()}setupInteractionListeners(){this.unsubscribeInteracting=it.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=it.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=it.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}mount(e){e.appendChild(this.root)}setSceneId(e){this.sceneId=e,this.updateNorthYawLabel()}setNorthYaw(e){this.northYaw=e,this.updateNorthYawLabel()}updateNorthYawLabel(){this.northYawLabel&&(this.sceneId==="gate"&&typeof this.northYaw=="number"?(this.northYawLabel.textContent=`N=${this.northYaw.toFixed(1)}`,this.northYawLabel.style.display="block"):this.northYawLabel.style.display="none")}updateYawLabel(e){this.northYawLabel&&(this.sceneId==="gate"&&typeof this.northYaw=="number"?(this.northYawLabel.textContent=`N=${this.northYaw.toFixed(1)} Yaw=${e.toFixed(1)}`,this.northYawLabel.style.display="block"):this.northYawLabel.style.display="none")}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,qa(t)){const i=Xa(t);this.baseOpacity=i.opacity,this.root.style.setProperty("--vr-ground-clarity",String(i.clarity)),this.root.style.opacity=i.opacity.toString();const r=`translateX(-50%) translateY(${i.translateY}px) scaleY(${i.scaleY})`;this.root.classList.contains("vr-ui-interacting")?this.root.style.transform=r:this.root.style.transform=r,this.root.style.setProperty("--vr-ground-base-blur",`${i.blur}px`);const a=e,l=-(this.northYaw??0),c=a;this.root.style.setProperty("--compass-disk-rot",`${l}deg`),this.root.style.setProperty("--compass-needle-rot",`${c}deg`);const d=42,h=(u,f)=>{const v=f+l,g=v+180;u.style.transform=`rotate(${v}deg) translateY(-${d}%) rotate(${g}deg)`};h(this.northLabel,0),h(this.eastLabel,270),h(this.southLabel,180),h(this.westLabel,90),this.updateYawLabel(e),this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.northLabel.style.transform="",this.eastLabel.style.transform="",this.southLabel.style.transform="",this.westLabel.style.transform="",this.isVisible=!1,this.baseOpacity=0)}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}const rc=60,oa=14,e_=4,ac=650,t_=120,oc=900,Ws=-62,n_=150;class i_{constructor(e){_(this,"root");_(this,"container");_(this,"dots",new Map);_(this,"dotYawDeg",new Map);_(this,"currentYaw",0);_(this,"currentPitch",0);_(this,"isVisible",!1);_(this,"museumId");_(this,"currentSceneId");_(this,"sceneHotspots");_(this,"hoverSceneId",null);_(this,"onNavigateToScene");_(this,"unsubscribeFocus");_(this,"lastYawDeg",0);_(this,"lastPitchDeg",0);_(this,"aimedSceneId",null);_(this,"isInteracting",!1);_(this,"unsubscribeInteracting");_(this,"unsubscribeIdle");_(this,"unsubscribeUIEngaged");_(this,"idleRecoveryTimer",null);_(this,"lastAimChangeTs",0);_(this,"autoNavTimer",null);_(this,"autoNavTargetSceneId",null);_(this,"lastAutoNavTs",0);_(this,"aimDebounceTimer",null);this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.sceneHotspots=e.sceneHotspots,this.onNavigateToScene=e.onNavigateToScene||jt,this.root=document.createElement("div"),this.root.className="vr-groundnav",this.root.setAttribute("data-ui","GroundNavDots"),this.root.style.outline="2px solid #00ffff",this.container=document.createElement("div"),this.container.className="vr-groundnav__container",this.root.appendChild(this.container),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.unsubscribeFocus=hr(t=>{this.handleSceneFocus(t)}),this.setupInteractionListeners(),this.renderDots()}setupInteractionListeners(){this.unsubscribeInteracting=it.on("user-interacting",()=>{qe("统一终止触发点: 用户交互"),this.isInteracting=!0,this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav()}),this.unsubscribeIdle=it.on("user-idle",()=>{this.idleRecoveryTimer!==null&&(clearTimeout(this.idleRecoveryTimer),this.idleRecoveryTimer=null),this.idleRecoveryTimer=window.setTimeout(()=>{if(this.idleRecoveryTimer=null,!this.root.parentNode){qe("idleRecoveryTimer: component disposed, skipping");return}this.isInteracting=!1},400)}),this.unsubscribeUIEngaged=it.on("ui-engaged",()=>{qe("统一终止触发点: UI 点击"),this.clearAllTimers(),this.isInteracting=!1,this.clearAimed(),this.cancelAutoNav()})}clearAimDebounce(){this.aimDebounceTimer!==null&&(window.clearTimeout(this.aimDebounceTimer),this.aimDebounceTimer=null)}clearAllTimers(){this.clearAimDebounce(),this.idleRecoveryTimer!==null&&(clearTimeout(this.idleRecoveryTimer),this.idleRecoveryTimer=null),this.autoNavTimer!==null&&(clearTimeout(this.autoNavTimer),this.autoNavTimer=null)}normalizeDeg(e){return(e%360+360)%360}shortestDeltaDeg(e,t){return(this.normalizeDeg(e)-this.normalizeDeg(t)+180)%360-180}clearAimed(){if(this.aimedSceneId!==null){const e=this.dots.get(this.aimedSceneId);e&&(e.classList.remove("is-aimed","is-autonav","is-autonav-progress"),this.removeProgress(this.aimedSceneId)),this.aimedSceneId=null,this.clearAimDebounce(),this.emitSceneAim("clear",null)}this.cancelAutoNav()}cancelAutoNav(){if(this.autoNavTimer!=null&&(window.clearTimeout(this.autoNavTimer),this.autoNavTimer=null),this.autoNavTargetSceneId!==null){const e=this.autoNavTargetSceneId;if(e){this.removeProgress(e);const t=this.dots.get(e);t&&t.classList.remove("is-autonav","is-autonav-progress"),this.emitSceneAutoNav("cancel",e)}this.autoNavTargetSceneId=null}}removeProgress(e){const t=this.dots.get(e);if(!t)return;const n=t.querySelector(".vr-groundnav__progress");n&&t.removeChild(n)}addProgress(e){const t=this.dots.get(e);if(!t)return;this.removeProgress(e);const n=document.createElement("div");n.className="vr-groundnav__progress",n.style.setProperty("--progress-duration",`${ac}ms`),t.appendChild(n),t.classList.add("is-autonav-progress")}scheduleAutoNavIfAllowed(e){if(!e){qe("scheduleAutoNavIfAllowed: sceneId is missing, skipping");return}const t=Date.now();if(this.isInteracting){qe("scheduleAutoNavIfAllowed: isInteracting, skipping");return}if(this.lastPitchDeg>Ws){qe("scheduleAutoNavIfAllowed: pitch too high, skipping",this.lastPitchDeg);return}if(t-this.lastAutoNavTs<oc){qe("scheduleAutoNavIfAllowed: cooldown, skipping");return}if(t-this.lastAimChangeTs<t_){qe("scheduleAutoNavIfAllowed: min dwell, skipping");return}if(this.currentSceneId&&e===this.currentSceneId){qe("scheduleAutoNavIfAllowed: same as current scene, skipping");return}this.autoNavTargetSceneId!==null&&this.autoNavTargetSceneId!==e&&this.cancelAutoNav(),qe("scene-autonav: start",{sceneId:e}),this.autoNavTargetSceneId=e;const n=this.dots.get(e);n&&(n.classList.add("is-autonav"),this.addProgress(e)),this.emitSceneAutoNav("start",e),this.autoNavTimer=window.setTimeout(()=>{if(this.autoNavTimer=null,!this.root.parentNode){qe("autoNavTimer: component disposed, skipping");return}if(!e){qe("autoNavTimer: sceneId is missing, skipping");return}this.tryAutoNavigate(e)},ac)}tryAutoNavigate(e){if(!e){qe("tryAutoNavigate: sceneId is missing, skipping"),this.cancelAutoNav();return}if(this.isInteracting){qe("tryAutoNavigate: isInteracting, canceling"),this.cancelAutoNav(),this.clearAimed();return}if(!this.aimedSceneId||this.aimedSceneId!==e){qe("tryAutoNavigate: aimedSceneId mismatch, canceling",{aimedSceneId:this.aimedSceneId,sceneId:e}),this.cancelAutoNav(),this.clearAimed();return}if(this.lastPitchDeg>Ws){qe("tryAutoNavigate: pitch too high, canceling",this.lastPitchDeg),this.cancelAutoNav(),this.clearAimed();return}const t=Date.now();if(t-this.lastAutoNavTs<oc){qe("tryAutoNavigate: cooldown, canceling"),this.cancelAutoNav(),this.clearAimed();return}if(!this.museumId){qe("tryAutoNavigate: museumId is missing, canceling"),this.cancelAutoNav(),this.clearAimed();return}qe("scene-autonav: trigger",{museumId:this.museumId,sceneId:e});const n=e;this.cancelAutoNav(),this.clearAimed(),this.lastAutoNavTs=t,window.dispatchEvent(new CustomEvent("vr:close-panels")),Zt({type:"focus",museumId:this.museumId,sceneId:n,source:"pano-auto",ts:t}),this.onNavigateToScene(this.museumId,n)}maybeRescheduleOrCancelByPitch(e){e>Ws?(this.autoNavTargetSceneId&&this.cancelAutoNav(),this.aimedSceneId&&this.clearAimed()):this.aimedSceneId&&e<=Ws&&!this.isInteracting&&!this.autoNavTimer&&this.aimedSceneId!==this.autoNavTargetSceneId&&this.scheduleAutoNavIfAllowed(this.aimedSceneId)}emitSceneAim(e,t){if(!this.museumId){qe("emitSceneAim: museumId is missing, skipping");return}qe("scene-aim",{type:e,museumId:this.museumId,sceneId:t}),window.dispatchEvent(new CustomEvent("vr:scene-aim",{detail:{type:e,museumId:this.museumId,sceneId:t||void 0,source:"groundnav",ts:Date.now()}}))}emitSceneAutoNav(e,t){if(!this.museumId){qe("emitSceneAutoNav: museumId is missing, skipping");return}qe("scene-autonav",{type:e,museumId:this.museumId,sceneId:t}),window.dispatchEvent(new CustomEvent("vr:scene-autonav",{detail:{type:e,museumId:this.museumId,sceneId:t??void 0,ts:Date.now()}}))}updateAimed(e){if(this.isInteracting||!this.isVisible){this.clearAimed();return}const t=this.sceneHotspots.filter(a=>{var o;return(o=a.target)==null?void 0:o.sceneId});if(t.length===0){this.clearAimed();return}let n=null,i=1/0;t.forEach(a=>{const o=a.target.sceneId;if(o===this.currentSceneId)return;const l=a.yaw,c=Math.abs(this.shortestDeltaDeg(e,l));c<i&&(i=c,n=o)});let r=!1;if(n!==null&&(this.aimedSceneId===null?r=i<=oa:n===this.aimedSceneId?r=i<=oa+e_:r=i<=oa),this.isInteracting){this.clearAimed();return}if(r&&n!==null)if(this.aimedSceneId!==n){if(this.lastAimChangeTs=Date.now(),this.cancelAutoNav(),this.aimedSceneId!==null){const o=this.dots.get(this.aimedSceneId);o&&(o.classList.remove("is-aimed","is-autonav","is-autonav-progress"),this.removeProgress(this.aimedSceneId))}this.aimedSceneId=n;const a=this.dots.get(n);a&&a.classList.add("is-aimed"),this.clearAimDebounce(),this.aimDebounceTimer=window.setTimeout(()=>{if(this.aimDebounceTimer=null,!this.root.parentNode){qe("aimDebounceTimer: component disposed, skipping");return}this.aimedSceneId===n&&!this.isInteracting&&this.isVisible?(this.emitSceneAim("aim",n),this.scheduleAutoNavIfAllowed(n)):this.aimedSceneId===n&&this.clearAimed()},n_)}else!this.autoNavTimer&&this.aimedSceneId!==this.autoNavTargetSceneId&&this.scheduleAutoNavIfAllowed(n);else this.clearAimed()}handleSceneFocus(e){e.type==="hover"?this.hoverSceneId=e.sceneId:e.type==="focus"&&(qe("统一终止触发点: 场景切换",{sceneId:e.sceneId}),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),e.sceneId&&(this.currentSceneId=e.sceneId),this.hoverSceneId=null),this.updateDotStates()}updateDotStates(){this.dots.forEach((e,t)=>{e.classList.remove("is-current","is-hover"),t===this.currentSceneId?e.classList.add("is-current"):t===this.hoverSceneId&&e.classList.add("is-hover")})}renderDots(){this.container.innerHTML="",this.dots.clear(),this.dotYawDeg.clear(),this.aimedSceneId=null,this.sceneHotspots.filter(t=>{var n;return(n=t.target)==null?void 0:n.sceneId}).forEach(t=>{const n=t.target.sceneId,i=document.createElement("div");i.className="vr-groundnav__dot",i.setAttribute("data-scene-id",n),i.setAttribute("title",t.label),this.dotYawDeg.set(n,t.yaw),i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),it.emitUIEngaged(),Zt({type:"focus",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()}),window.dispatchEvent(new CustomEvent("vr:close-panels")),t.target.museumId&&t.target.sceneId?this.onNavigateToScene(t.target.museumId,t.target.sceneId):qe("dot click: museumId or sceneId is missing, skipping navigation")}),i.addEventListener("mouseenter",()=>{Zt({type:"hover",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()})}),i.addEventListener("mouseleave",()=>{Zt({type:"hover",museumId:t.target.museumId,sceneId:null,source:"pano",ts:Date.now()})}),this.container.appendChild(i),this.dots.set(t.target.sceneId,i)}),this.updateDotStates(),this.updateDotPositions()}updateDotPositions(){this.sceneHotspots.filter(t=>{var n;return(n=t.target)==null?void 0:n.sceneId}).forEach(t=>{const n=this.dots.get(t.target.sceneId);if(!n)return;const i=t.yaw*Math.PI/180,r=Math.sin(i)*rc,a=-Math.cos(i)*rc;n.style.transform=`translate(${r}px, ${a}px)`})}setYawPitch(e,t){this.currentYaw=e,this.currentPitch=t;const n=Math.abs(this.lastYawDeg-e)>.1;if(this.lastYawDeg=e,this.lastPitchDeg=t,qa(t)){const r=Xa(t),a=String(r.clarity);this.root.style.getPropertyValue("--vr-ground-clarity")!==a&&this.root.style.setProperty("--vr-ground-clarity",a);const o=r.opacity.toString();this.root.style.opacity!==o&&(this.root.style.opacity=o);const l=`translateX(-50%) translateY(${r.translateY}px) scaleY(${r.scaleY})`;this.root.style.transform!==l&&(this.root.style.transform=l);const c=`${r.blur}px`;this.root.style.getPropertyValue("--vr-ground-base-blur")!==c&&this.root.style.setProperty("--vr-ground-base-blur",c),this.isVisible||(this.isVisible=!0),!this.isInteracting&&n&&(this.updateAimed(e),this.maybeRescheduleOrCancelByPitch(t))}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1,this.clearAimed());n&&this.updateDotPositions()}updateScene(e,t,n){if(qe("统一终止触发点: 博物馆/场景切换",{museumId:e,currentSceneId:t}),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),!e){qe("updateScene: museumId is missing");return}this.museumId=e,this.currentSceneId=t,this.sceneHotspots=n,this.hoverSceneId=null,this.renderDots()}mount(e){e.appendChild(this.root)}dispose(){this.clearAllTimers(),this.cancelAutoNav(),this.clearAimed(),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=void 0),this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class s_{constructor(e,t={}){_(this,"root");_(this,"inner");_(this,"wedge");_(this,"northTick");_(this,"needle");_(this,"currentYaw",0);_(this,"currentPitch",0);_(this,"northYaw",0);_(this,"isVisible",!1);_(this,"unsubscribeInteracting");_(this,"unsubscribeIdle");_(this,"unsubscribeUIEngaged");this.root=document.createElement("div"),this.root.className="vr-groundheading",this.root.setAttribute("data-ui","GroundHeadingMarker"),this.root.style.outline="2px solid #00ffff",this.inner=document.createElement("div"),this.inner.className="vr-groundheading__inner",this.wedge=document.createElement("div"),this.wedge.className="vr-groundheading__wedge",this.northTick=document.createElement("div"),this.northTick.className="vr-groundheading__northTick",this.needle=document.createElement("div"),this.needle.className="vr-groundheading__needle",this.inner.appendChild(this.wedge),this.inner.appendChild(this.northTick),this.inner.appendChild(this.needle),this.root.appendChild(this.inner),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.root.style.setProperty("--groundheading-disk-rot","0deg"),this.root.style.setProperty("--groundheading-needle-rot","0deg"),e.appendChild(this.root),this.setupInteractionListeners()}setNorthYaw(e){this.northYaw=e}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,qa(t)){const i=Xa(t);this.root.style.setProperty("--vr-ground-clarity",String(i.clarity)),this.root.style.opacity=i.opacity.toString(),this.root.style.transform=`translateX(-50%) translateY(${i.translateY}px) scaleY(${i.scaleY})`,this.root.style.setProperty("--vr-ground-base-blur",`${i.blur}px`);const r=e,o=-(this.northYaw??0),l=r;this.root.style.setProperty("--groundheading-disk-rot",`${o}deg`),this.root.style.setProperty("--groundheading-needle-rot",`${l}deg`),this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1)}setInteracting(e){e?this.root.classList.add("vr-ui-interacting"):this.root.classList.remove("vr-ui-interacting")}setupInteractionListeners(){this.unsubscribeInteracting=it.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=it.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=it.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}const Ki={original:{renderer:{pixelRatio:Math.min(window.devicePixelRatio||1,2),toneMapping:vn,toneMappingExposure:1,output:"srgb",clearColor:void 0},camera:{defaultFov:75},texture:{anisotropyLimit:8,minFilter:Kn,magFilter:Dt,generateMipmaps:!0,colorSpace:"srgb"}},enhanced:{renderer:{pixelRatio:Math.min(window.devicePixelRatio,2),toneMapping:Sc,toneMappingExposure:.95,output:"srgb",clearColor:{color:0,alpha:1}},camera:{defaultFov:70},texture:{anisotropyLimit:12,minFilter:Kn,magFilter:Dt,generateMipmaps:!0,colorSpace:"srgb"}}};class r_{constructor(e,t=!1){_(this,"scene");_(this,"camera");_(this,"renderer");_(this,"sphere",null);_(this,"container");_(this,"frameListeners",[]);_(this,"nadirPatch",null);_(this,"compassDisk",null);_(this,"groundNavDots",null);_(this,"groundHeading",null);_(this,"renderProfile","enhanced");_(this,"isDragging",!1);_(this,"lastMouseX",0);_(this,"lastMouseY",0);_(this,"yaw",0);_(this,"pitch",0);_(this,"fov",75);_(this,"onLoadCallback");_(this,"onErrorCallback");_(this,"onStatusChangeCallback");_(this,"debugMode",!1);_(this,"onDebugClick");_(this,"longPressTimer",null);_(this,"longPressThreshold",500);_(this,"aspectWarnedUrls",new Set);_(this,"loadStatus",Pt.LOADING_LOW);_(this,"isDegradedMode",!1);_(this,"pickMode",!1);_(this,"pickModeListeners",[]);_(this,"pickStartX",0);_(this,"pickStartY",0);_(this,"pickStartTime",0);_(this,"pickHasMoved",!1);_(this,"pickDragThreshold",8);_(this,"pickTimeThreshold",250);_(this,"lastYaw",0);_(this,"lastPitch",0);_(this,"lastFov",75);_(this,"isViewChanging",!1);_(this,"viewChangeThreshold",.5);_(this,"vrModeEnabled",!1);_(this,"touchStartX",0);_(this,"touchStartY",0);_(this,"lastTouchDistance",0);_(this,"isPinching",!1);_(this,"lastFrameTimeMs",null);this.container=e,this.debugMode=t,this.renderProfile=this.detectRenderProfile(),this.scene=new Fa,this.camera=new wt(Ki[this.renderProfile].camera.defaultFov,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,0,0),this.fov=Ki[this.renderProfile].camera.defaultFov,this.renderer=new gr({antialias:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.applyRendererProfile(),e.appendChild(this.renderer.domElement),this.nadirPatch=new $v(this.scene,500),this.compassDisk=new Qv,this.compassDisk.mount(e),this.compassDisk.getElement().style.display="none",this.groundNavDots=new i_({museumId:"",currentSceneId:"",sceneHotspots:[]}),this.groundNavDots.mount(e),this.groundNavDots.getElement().style.display="none",this.groundHeading=new s_(e),this.groundHeading.getElement().style.display="none",this.setupEvents(),this.animate(),window.addEventListener("resize",()=>this.handleResize())}setupEvents(){const e=this.renderer.domElement;if(e.addEventListener("mousedown",t=>this.onPointerDown(t)),e.addEventListener("mousemove",t=>this.onPointerMove(t)),e.addEventListener("mouseup",()=>this.onPointerUp()),e.addEventListener("mouseleave",()=>this.onPointerUp()),e.addEventListener("touchstart",t=>this.onTouchStart(t),{passive:!1}),e.addEventListener("touchmove",t=>this.onTouchMove(t),{passive:!1}),e.addEventListener("touchend",()=>this.onTouchEnd()),e.addEventListener("wheel",t=>this.onWheel(t),{passive:!1}),this.debugMode){e.addEventListener("dblclick",i=>this.handleDebugClick(i.clientX,i.clientY));let t=0,n=0;e.addEventListener("touchstart",i=>{i.touches.length===1&&(t=i.touches[0].clientX,n=i.touches[0].clientY,this.longPressTimer=window.setTimeout(()=>{this.handleDebugClick(t,n)},this.longPressThreshold))},{passive:!0}),e.addEventListener("touchmove",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0}),e.addEventListener("touchend",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0})}}handleDebugClick(e,t){if(this.onDebugClick&&this.debugMode){const n=this.getCurrentView();this.onDebugClick(e,t,n.yaw,n.pitch,n.fov)}}setOnDebugClick(e){this.onDebugClick=e}onPointerDown(e){this.isDragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,it.emitInteracting()}onPointerMove(e){if(!this.isDragging||this.vrModeEnabled)return;const t=e.clientX-this.lastMouseX,n=e.clientY-this.lastMouseY;this.yaw+=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,this.updateCamera(),this.debugMode&&this.onDebugClick&&this.getCurrentView()}onPointerUp(){this.isDragging=!1}onTouchStart(e){if(e.touches.length===1)this.isDragging=!0,this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.lastMouseX=this.touchStartX,this.lastMouseY=this.touchStartY,it.emitInteracting();else if(e.touches.length===2){this.isPinching=!0,this.isDragging=!1;const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(t*t+n*n),it.emitInteracting()}}onTouchMove(e){if(e.preventDefault(),this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null),e.touches.length===1&&this.isDragging){if(this.vrModeEnabled)return;const t=e.touches[0].clientX-this.lastMouseX,n=e.touches[0].clientY-this.lastMouseY;this.yaw+=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.touches[0].clientX,this.lastMouseY=e.touches[0].clientY,this.updateCamera()}else if(e.touches.length===2&&this.isPinching){const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY,i=Math.sqrt(t*t+n*n),r=this.lastTouchDistance-i;this.fov+=r*.5,this.fov=Math.max(30,Math.min(120,this.fov)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.lastTouchDistance=i}}onTouchEnd(){this.isDragging=!1,this.isPinching=!1}onWheel(e){e.preventDefault(),this.fov+=e.deltaY*.1,this.fov=Math.max(30,Math.min(120,this.fov)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),it.emitInteracting(),this.debugMode&&this.onDebugClick&&this.getCurrentView()}updateCamera(){const e=xn.degToRad(this.yaw),t=xn.degToRad(this.pitch),n=Math.cos(t)*Math.sin(e),i=Math.sin(t),r=Math.cos(t)*Math.cos(e);this.camera.lookAt(n,i,r)}loadScene(e){var h;if(this.isDegradedMode=!1,this.updateLoadStatus(Pt.LOADING_LOW),this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const u=this.sphere.material;u.map&&u.map.dispose(),u.dispose()}const t=e.initialView,n=t.yaw||0;this.yaw===0&&n!==0&&(this.yaw=-n),this.pitch=t.pitch||0;const i=Ki[this.renderProfile];this.fov=t.fov!==void 0?t.fov:i.camera.defaultFov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.updateCamera(),this.lastYaw=this.yaw,this.lastPitch=this.pitch,this.lastFov=this.fov,this.isViewChanging=!1;const a=-(typeof e.northYaw=="number"?e.northYaw:((h=e.initialView)==null?void 0:h.yaw)??0);this.nadirPatch&&this.nadirPatch.setNorthYaw(a),this.compassDisk&&(this.compassDisk.setSceneId(e.id),this.compassDisk.setNorthYaw(a)),this.groundHeading&&this.groundHeading.setNorthYaw(a);const o=new vr(500,64,64);o.scale(-1,1,1);const l=new Cv;l.setCrossOrigin("anonymous");const c=bn(e.panoLow,rn.PANO_LOW),d=bn(e.pano,rn.PANO);if(!c&&d){this.loadSingleTexture(l,o,d,!1);return}if(c&&!d){this.loadSingleTexture(l,o,c,!0);return}if(c&&d){this.loadProgressiveTextures(l,o,c,d);return}this.updateLoadStatus(Pt.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error("场景未提供全景图 URL"))}loadSingleTexture(e,t,n,i){i?this.updateLoadStatus(Pt.LOADING_LOW):this.updateLoadStatus(Pt.LOADING_HIGH),e.load(n,r=>{this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,n);const a=new Ri({map:r});this.sphere=new pt(t,a),this.scene.add(this.sphere),i?this.updateLoadStatus(Pt.LOW_READY):this.updateLoadStatus(Pt.HIGH_READY),this.onLoadCallback&&this.onLoadCallback()},void 0,r=>{console.error("加载全景图失败:",n,r),this.updateLoadStatus(Pt.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error(`加载全景图失败：${n}`))})}loadProgressiveTextures(e,t,n,i){this.updateLoadStatus(Pt.LOADING_LOW),e.load(n,r=>{this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,n);const a=new Ri({map:r});this.sphere=new pt(t,a),this.scene.add(this.sphere),this.updateLoadStatus(Pt.LOW_READY),this.onLoadCallback&&this.onLoadCallback(),this.updateLoadStatus(Pt.LOADING_HIGH),e.load(i,o=>{this.applyTextureSettings(o),this.warnIfNotPanoAspect(o,i);const l=this.getCurrentView();if(this.sphere&&this.sphere.material&&"map"in this.sphere.material){const c=this.sphere.material;c.map&&c.map.dispose(),c.map=o,c.needsUpdate=!0}this.setView(l.yaw,l.pitch,l.fov),this.updateLoadStatus(Pt.HIGH_READY),this.isDegradedMode=!1},void 0,o=>{console.error("高清全景图加载失败，继续使用低清图:",i,o),this.isDegradedMode=!0,this.updateLoadStatus(Pt.DEGRADED)})},void 0,r=>{console.error("低清全景图加载失败，尝试加载高清图:",n,r),this.loadSingleTexture(e,t,i,!1)})}setOnLoad(e){this.onLoadCallback=e}setOnError(e){this.onErrorCallback=e}setOnStatusChange(e){this.onStatusChangeCallback=e}getLoadStatus(){return this.loadStatus}isInDegradedMode(){return this.isDegradedMode}updateLoadStatus(e){this.loadStatus=e,this.onStatusChangeCallback&&this.onStatusChangeCallback(e)}getCurrentView(){return{yaw:this.yaw,pitch:this.pitch,fov:this.fov}}setView(e,t,n){this.yaw=e,this.pitch=Math.max(-90,Math.min(90,t)),n!==void 0&&(this.fov=Math.max(30,Math.min(120,n)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix()),this.updateCamera()}setVrModeEnabled(e){this.vrModeEnabled=e,e||(this.isDragging=!1)}isVrModeEnabled(){return this.vrModeEnabled}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}animate(){requestAnimationFrame(()=>this.animate());const e=performance.now(),t=this.lastFrameTimeMs?e-this.lastFrameTimeMs:16.7;this.lastFrameTimeMs=e;const n=this.getCurrentView(),i=Math.abs(n.yaw-this.lastYaw),r=Math.abs(n.pitch-this.lastPitch),a=Math.abs(n.fov-this.lastFov);i>this.viewChangeThreshold||r>this.viewChangeThreshold||a>this.viewChangeThreshold?this.isViewChanging||(this.isViewChanging=!0,it.emitInteracting()):this.isViewChanging&&(this.isViewChanging=!1,it.scheduleIdle()),this.lastYaw=n.yaw,this.lastPitch=n.pitch,this.lastFov=n.fov,this.updateCamera(),this.nadirPatch&&this.nadirPatch.update(this.camera,{yaw:n.yaw,pitch:n.pitch},t),this.compassDisk&&this.compassDisk.setYawPitch(n.yaw,n.pitch),this.groundNavDots&&this.groundNavDots.setYawPitch(n.yaw,n.pitch),this.groundHeading&&this.groundHeading.setYawPitch(n.yaw,n.pitch);for(const l of this.frameListeners)l(t);this.renderer.render(this.scene,this.camera)}onFrame(e){return this.frameListeners.push(e),()=>{const t=this.frameListeners.indexOf(e);t>=0&&this.frameListeners.splice(t,1)}}getCamera(){return this.camera}getDomElement(){return this.renderer.domElement}setSceneData(e,t,n){if(this.groundNavDots){const i=n.filter(r=>{var a;return r.type==="scene"&&((a=r.target)==null?void 0:a.sceneId)}).map(r=>({id:r.id,label:r.label,yaw:r.yaw,pitch:r.pitch,target:{museumId:r.target.museumId,sceneId:r.target.sceneId}}));this.groundNavDots.updateScene(e,t,i)}}getSphereRadius(){return 500}getViewportSize(){return{width:this.container.clientWidth,height:this.container.clientHeight}}enablePickMode(){this.pickMode||(this.pickMode=!0,this.setupPickModeListeners())}disablePickMode(){this.pickMode&&(this.pickMode=!1,this.removePickModeListeners())}togglePickMode(){return this.pickMode?this.disablePickMode():this.enablePickMode(),this.pickMode}isPickModeEnabled(){return this.pickMode}setupPickModeListeners(){const e=this.renderer.domElement,t=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.touches.length!==1)return;a=r.touches[0].clientX,o=r.touches[0].clientY}else a=r.clientX,o=r.clientY;this.pickStartX=a,this.pickStartY=o,this.pickStartTime=Date.now(),this.pickHasMoved=!1},n=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.touches.length!==1)return;a=r.touches[0].clientX,o=r.touches[0].clientY}else a=r.clientX,o=r.clientY;const l=Math.abs(a-this.pickStartX),c=Math.abs(o-this.pickStartY);Math.sqrt(l*l+c*c)>this.pickDragThreshold&&(this.pickHasMoved=!0)},i=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.changedTouches.length!==1)return;a=r.changedTouches[0].clientX,o=r.changedTouches[0].clientY}else a=r.clientX,o=r.clientY;const l=Date.now()-this.pickStartTime,c=Math.abs(a-this.pickStartX),d=Math.abs(o-this.pickStartY);Math.sqrt(c*c+d*d)>this.pickDragThreshold||l>this.pickTimeThreshold&&this.pickHasMoved||this.handlePick(a,o),this.pickHasMoved=!1};e.addEventListener("pointerdown",t),e.addEventListener("mousedown",t),e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("pointermove",n),e.addEventListener("mousemove",n),e.addEventListener("touchmove",n,{passive:!0}),e.addEventListener("pointerup",i),e.addEventListener("mouseup",i),e.addEventListener("touchend",i,{passive:!0}),this.pickModeListeners.push(()=>{e.removeEventListener("pointerdown",t),e.removeEventListener("mousedown",t),e.removeEventListener("touchstart",t),e.removeEventListener("pointermove",n),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n),e.removeEventListener("pointerup",i),e.removeEventListener("mouseup",i),e.removeEventListener("touchend",i)})}removePickModeListeners(){this.pickModeListeners.forEach(e=>e()),this.pickModeListeners=[]}handlePick(e,t){const n=this.renderer.domElement.getBoundingClientRect(),i=jv(e,t,n),r=Kv(i.x,i.y,this.camera,this.getSphereRadius());if(!r){typeof __VR_DEBUG__<"u"&&__VR_DEBUG__&&console.debug("[pick] 未能计算 yaw/pitch（ray.direction 为空）");return}const{yaw:a,pitch:o}=r,l=`yaw: ${a.toFixed(2)}, pitch: ${o.toFixed(2)}`;console.log(`[pick] yaw=${a.toFixed(2)}, pitch=${o.toFixed(2)}`),navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(l).catch(()=>{}),window.dispatchEvent(new CustomEvent("vr:pick",{detail:{x:e,y:t,yaw:a,pitch:o}}))}warnIfNotPanoAspect(e,t){if(!e.image)return;const n=e.image,i=n.width,r=n.height;if(!i||!r)return;const a=i/r;Math.abs(a-2)>.02&&!this.aspectWarnedUrls.has(t)&&(console.warn(`[PanoViewer] 全景图比例不是 2:1，可能出现轻微变形（实际 ${a.toFixed(2)}），来源: ${t}`),this.aspectWarnedUrls.add(t))}dispose(){if(this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const e=this.sphere.material;e.map&&e.map.dispose(),e.dispose()}this.nadirPatch&&(this.nadirPatch.dispose(this.scene),this.nadirPatch=null),this.compassDisk&&(this.compassDisk.dispose(),this.compassDisk=null),this.groundNavDots&&(this.groundNavDots.dispose(),this.groundNavDots=null),this.groundHeading&&(this.groundHeading.dispose(),this.groundHeading=null),this.renderer.dispose(),window.removeEventListener("resize",()=>this.handleResize())}applyRendererProfile(){const e=Ki[this.renderProfile];this.renderer.setPixelRatio(e.renderer.pixelRatio),"outputColorSpace"in this.renderer?this.renderer.outputColorSpace=ht:this.renderer.outputEncoding=_n,this.renderer.toneMapping=e.renderer.toneMapping,this.renderer.toneMappingExposure=e.renderer.toneMappingExposure,e.renderer.clearColor&&this.renderer.setClearColor(e.renderer.clearColor.color,e.renderer.clearColor.alpha)}detectRenderProfile(){try{const t=new URLSearchParams(window.location.search).get("render");if(t&&t.toLowerCase()==="original")return"original"}catch{}return"enhanced"}applyTextureSettings(e){const t=Ki[this.renderProfile],n=this.renderer.capabilities.getMaxAnisotropy?this.renderer.capabilities.getMaxAnisotropy():1;if(e.anisotropy=Math.min(t.texture.anisotropyLimit,Math.max(1,n||1)),e.minFilter=t.texture.minFilter,e.magFilter=t.texture.magFilter,e.generateMipmaps=t.texture.generateMipmaps,"colorSpace"in e?e.colorSpace=ht:e.encoding=_n,e.needsUpdate=!0,this.debugMode){const i=e.image||{};console.log("pano texture",{w:i.width,h:i.height,colorSpace:e.colorSpace,encoding:e.encoding,anisotropy:e.anisotropy,minFilter:e.minFilter,magFilter:e.magFilter})}}}class lc{constructor(e){_(this,"element");this.element=document.createElement("div"),this.element.className="title-bar",this.element.innerHTML=`
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
    `,document.head.appendChild(e)}setTitle(e){const t=this.element.querySelector(".title-text");t&&(t.textContent=e)}getElement(){return this.element}remove(){this.element.remove()}}class a_{constructor(e){_(this,"element");_(this,"museums");this.museums=e,this.element=document.createElement("div"),this.element.className="museum-list",this.render(),this.applyStyles()}render(){const e=this.museums.filter(n=>n.id==="wangding"),t=this.museums.filter(n=>n.id!=="wangding");this.element.innerHTML=`
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
    `,this.element.querySelectorAll(".museum-card-active").forEach(n=>{n.addEventListener("click",()=>{const i=n.getAttribute("data-museum-id");i&&ua(i)})})}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}function o_(s,e){const t=xn.degToRad(s),n=xn.degToRad(e),i=Math.cos(n)*Math.sin(t),r=Math.sin(n),a=Math.cos(n)*Math.cos(t);return new L(i,r,a)}function l_(s,e,t){const n=new L,i=new L;if(e.getWorldPosition(n),e.getWorldDirection(i),new L().copy(s).sub(n).dot(i)<=0)return{x:0,y:0,visible:!1};const a=new L().copy(s).project(e);if(!(a.x>=-1&&a.x<=1&&a.y>=-1&&a.y<=1&&a.z>=-1&&a.z<=1))return{x:0,y:0,visible:!1};const l=t.clientWidth,c=t.clientHeight,d=(a.x+1)*.5*l,h=(1-(a.y+1)*.5)*c;return{x:d,y:h,visible:!0}}function c_(s,e,t,n,i=500){const a=o_(s,e).clone().multiplyScalar(i);return l_(a,t,n)}function d_(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" />
  <path d="M16.2 16.2 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`}function h_(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 7.5v9l8-4.5-8-4.5Z"/>
</svg>`}function u_(s){const e=document.createElement("div");return e.className="hotspot-tooltip",e.textContent=s||"",e.setAttribute("role","tooltip"),e}function Ys(s,e){const t=document.createElement("div");return t.className=`hotspot-icon-circle${e?` ${e}`:""}`,t.innerHTML=s,t}function p_(){return`
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4v16M12 4l6 6M12 4l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function f_(s){const e=u_(s.tooltip),t=s.isGround??!1;let n="hotspot hotspot--unknown",i=document.createElement("div");i.className="hotspot-dot";const r=s.type;if(t){n="hotspot hotspot--ground";const a=document.createElement("div");a.className="hotspot-ground-ring",i=a}else r==="scene"?(n="hotspot hotspot--scene",i=Ys(p_(),"hotspot-icon hotspot-icon-arrow")):r==="image"?(n="hotspot hotspot--image",i=Ys(d_(),"hotspot-icon")):r==="info"?(n="hotspot hotspot--info",i=Ys('<span class="hotspot-info-text">i</span>',"hotspot-icon")):r==="video"&&(n="hotspot hotspot--video",i=Ys(h_(),"hotspot-icon hotspot-icon-play"));return{rootClassName:n,contentEl:i,tooltipEl:e}}class m_{constructor(e){_(this,"element");_(this,"isOpen",!1);_(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--image";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const i=document.createElement("div");i.className="vr-modal-card vr-modal-card--media vr-modal-card--image",i.addEventListener("click",d=>d.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"图片预览";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--image";const c=document.createElement("img");c.className="vr-modal-image",e.src&&(c.src=e.src),c.alt=e.title||"热点图片",c.loading="lazy",l.appendChild(c),i.appendChild(r),i.appendChild(l),t.appendChild(n),t.appendChild(i),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class g_{constructor(e){_(this,"element");_(this,"isOpen",!1);_(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--info";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const i=document.createElement("div");i.className="vr-modal-card vr-modal-card--info",i.addEventListener("click",c=>c.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"详情";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--info",l.textContent=e.text||"未配置内容",i.appendChild(r),i.appendChild(l),t.appendChild(n),t.appendChild(i),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class v_{constructor(e){_(this,"element");_(this,"isOpen",!1);_(this,"videoEl");_(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--video";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const i=document.createElement("div");i.className="vr-modal-card vr-modal-card--media vr-modal-card--video",i.addEventListener("click",d=>d.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"视频";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--video";const c=document.createElement("video");c.className="vr-modal-video",e.src&&(c.src=e.src),e.poster&&(c.poster=e.poster),c.controls=!0,c.playsInline=!0,c.preload="metadata",this.videoEl=c,l.appendChild(c),i.appendChild(r),i.appendChild(l),t.appendChild(n),t.appendChild(i),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){if(this.isOpen){this.isOpen=!1,this.element.classList.remove("open");try{this.videoEl.pause(),this.videoEl.currentTime=0,this.videoEl.removeAttribute("src"),this.videoEl.load()}catch{}}}getElement(){return this.element}destroy(){this.close(),this.element.remove()}}const ad="vr:open-modal",od="vr:close-modal";function $a(s){window.dispatchEvent(new CustomEvent(ad,{detail:s}))}function la(){window.dispatchEvent(new CustomEvent(od))}class __{constructor(e){_(this,"rootEl");_(this,"current",null);_(this,"handleKeyDownBound");this.rootEl=e,this.handleKeyDownBound=t=>this.handleKeyDown(t),window.addEventListener(ad,t=>{const n=t;this.handleOpen(n.detail)}),window.addEventListener(od,()=>this.close()),window.addEventListener("keydown",this.handleKeyDownBound)}handleKeyDown(e){e.key==="Escape"&&this.close()}handleOpen(e){this.close();let t=null;e.type==="image"?t=new m_({src:e.payload.src,title:e.payload.title,onClose:()=>la()}):e.type==="info"?t=new g_({title:e.payload.title,text:e.payload.text,onClose:()=>la()}):e.type==="video"&&(t=new v_({src:e.payload.src,poster:e.payload.poster,title:e.payload.title,onClose:()=>la()})),t&&(this.current=t,this.rootEl.innerHTML="",this.rootEl.appendChild(t.getElement()),t.open())}close(){this.current&&(this.current.close(),this.current.destroy(),this.current=null,this.rootEl.innerHTML="")}}let cc=null;function ld(){if(cc)return;let s=document.getElementById("vr-modal-root");s||(s=document.createElement("div"),s.id="vr-modal-root",document.body.appendChild(s)),cc=new __(s)}let Xn=null;function tt(s,e=1500){if(as())return;const t=document.querySelector(".vr-toast"),n=t??document.createElement("div");n.className="vr-toast",n.textContent=s,t||document.body.appendChild(n),window.requestAnimationFrame(()=>n.classList.add("show")),Xn&&window.clearTimeout(Xn),Xn=window.setTimeout(()=>{n.classList.remove("show"),window.setTimeout(()=>n.remove(),220),Xn=null},e)}function x_(){const s=document.querySelector(".vr-toast");s&&(s.classList.remove("show"),window.setTimeout(()=>s.remove(),220)),Xn&&(window.clearTimeout(Xn),Xn=null)}class yr{constructor(e){_(this,"data");_(this,"el");_(this,"contentEl");_(this,"tooltipEl");_(this,"worldPos");_(this,"radius",500);_(this,"tooltipTimer",null);var a,o;this.data=e,this.el=document.createElement("div");const t=e.pitch<-20,n=f_({id:e.id,type:e.type,tooltip:e.tooltip,isGround:t});this.el.className=n.rootClassName,t&&this.el.classList.add("hotspot--ground"),this.el.setAttribute("data-hotspot-id",e.id),this.el.setAttribute("data-hotspot-type",e.type),this.el.style.pointerEvents="auto",this.el.style.position="absolute",this.el.style.left="0",this.el.style.top="0",this.contentEl=n.contentEl,this.tooltipEl=n.tooltipEl,this.el.appendChild(this.contentEl),this.el.appendChild(this.tooltipEl),(((o=(a=window.matchMedia)==null?void 0:a.call(window,"(hover: hover) and (pointer: fine)"))==null?void 0:o.matches)??!1)&&(this.el.addEventListener("mouseenter",()=>this.showTooltip()),this.el.addEventListener("mouseleave",()=>this.hideTooltip())),this.el.addEventListener("pointerdown",l=>{l.stopPropagation(),this.el.classList.add("is-pressed")});const r=()=>this.el.classList.remove("is-pressed");this.el.addEventListener("pointerup",r),this.el.addEventListener("pointercancel",r),this.el.addEventListener("pointerleave",r)}getElement(){return this.el}getData(){return this.data}updateScreenPosition(e,t){const n=c_(this.data.yaw,this.data.pitch,e,t,this.radius);if(!n.visible){this.el.style.display="none",this.el.style.opacity="0";return}this.el.style.display="",this.el.style.opacity="1",this.el.style.setProperty("--hs-x",`${n.x}px`),this.el.style.setProperty("--hs-y",`${n.y}px`),this.el.style.transform=`translate3d(${n.x}px, ${n.y}px, 0) translate(-50%, -50%)`}showTooltip(e){this.data.tooltip&&(this.tooltipEl.classList.add("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null),e&&e>0&&(this.tooltipTimer=window.setTimeout(()=>this.hideTooltip(),e)))}hideTooltip(){this.tooltipEl.classList.remove("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null)}}class y_ extends yr{onClick(){console.log("[hotspot] scene click",{id:this.data.id,targetSceneId:this.data.targetSceneId})}}class b_ extends yr{onClick(){if(!this.data.imageUrl){console.warn("[hotspot] image click but no src configured",this.data),tt("未配置内容",1500);return}$a({type:"image",payload:{src:this.data.imageUrl,title:this.data.title||this.data.tooltip}})}}class E_ extends yr{onClick(){if(!!!(this.data.text||this.data.title||this.data.tooltip)){console.warn("[hotspot] info click but no text/title configured",this.data),tt("未配置内容",1500);return}$a({type:"info",payload:{title:this.data.title||this.data.tooltip,text:this.data.text}})}}class S_ extends yr{onClick(){if(!this.data.url){console.warn("[hotspot] video click but no src/url configured",this.data),tt("未配置内容",1500);return}$a({type:"video",payload:{src:this.data.url,poster:this.data.poster,title:this.data.title||this.data.tooltip}})}}class M_{constructor(e,t,n={}){_(this,"element");_(this,"viewer");_(this,"disposeFrameListener",null);_(this,"hotspotInstances",[]);_(this,"options");_(this,"unsubscribeFocus",null);_(this,"hoveredSceneId",null);this.viewer=e,this.options=n,this.element=document.createElement("div"),this.element.className="hotspots-container",this.element.style.pointerEvents="none",this.updateHotspots(t);const i=this.viewer.getDomElement();this.disposeFrameListener=this.viewer.onFrame(()=>{const r=this.viewer.getCamera();for(const a of this.hotspotInstances)a.updateScreenPosition(r,i)}),this.unsubscribeFocus=hr(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="hover"&&e.source!=="pano"){if(this.options.museumId&&e.museumId!==this.options.museumId)return;const t=e.sceneId;this.hoveredSceneId!==t&&(this.hoveredSceneId&&this.setHotspotHighlight(this.hoveredSceneId,!1),this.hoveredSceneId=t,t&&this.setHotspotHighlight(t,!0))}}setHotspotHighlight(e,t){this.hotspotInstances.forEach(n=>{const i=n.getData();if(i.type==="scene"&&i.targetSceneId===e){const a=n.getElement();t?a.classList.add("hotspot--external-hover"):a.classList.remove("hotspot--external-hover")}})}updateHotspots(e){var i,r;this.hotspotInstances=[],this.element.innerHTML="";const t=((r=(i=window.matchMedia)==null?void 0:i.call(window,"(hover: none) and (pointer: coarse)"))==null?void 0:r.matches)??!1,n=a=>{var o,l,c,d,h,u,f,v;if(a.type==="scene"){const g=(o=a.target)==null?void 0:o.sceneId,p=`进入：${(g?(c=(l=this.options).resolveSceneName)==null?void 0:c.call(l,g):void 0)||a.label||g||"未知场景"}`;return new y_({id:a.id,type:"scene",yaw:a.yaw,pitch:a.pitch,tooltip:p,targetSceneId:g})}if(a.type==="video"){const g=((d=a.target)==null?void 0:d.url)||a.src,m=((h=a.target)==null?void 0:h.poster)||a.poster,p=a.title||a.label;return new S_({id:a.id,type:"video",yaw:a.yaw,pitch:a.pitch,tooltip:p,url:g,poster:m,title:p})}if(a.type==="image"){const g=((u=a.target)==null?void 0:u.imageUrl)||((f=a.target)==null?void 0:f.url)||a.src,m=a.title||a.label;return new b_({id:a.id,type:"image",yaw:a.yaw,pitch:a.pitch,tooltip:m,imageUrl:g,title:m})}if(a.type==="info"){const g=a.title||a.label,m=((v=a.target)==null?void 0:v.text)||a.text;return new E_({id:a.id,type:"info",yaw:a.yaw,pitch:a.pitch,tooltip:g,text:m,title:g})}return null};for(const a of e){const o=n(a);o&&(o.getElement().addEventListener("click",l=>{var h,u;l.preventDefault(),l.stopPropagation();const c=o.getData(),d=c.type==="scene";if(t&&o.showTooltip(1200),d){const f=c.targetSceneId;if(f&&this.options.onEnterScene){tt(`进入 ${((u=(h=this.options).resolveSceneName)==null?void 0:u.call(h,f))||f}`,1e3),this.options.onEnterScene(f);return}}o.onClick()}),this.hotspotInstances.push(o),this.element.appendChild(o.getElement()))}}getElement(){return this.element}remove(){this.disposeFrameListener&&(this.disposeFrameListener(),this.disposeFrameListener=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class w_{constructor(){_(this,"element");_(this,"videoElement");_(this,"isOpen",!1);this.element=document.createElement("div"),this.element.className="video-player-overlay",this.videoElement=document.createElement("video"),this.videoElement.controls=!0,this.videoElement.playsInline=!0,this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="video-player-backdrop"></div>
      <div class="video-player-content">
        <button class="video-player-close">×</button>
        <div class="video-container"></div>
      </div>
    `;const e=this.element.querySelector(".video-container");e&&e.appendChild(this.videoElement);const t=this.element.querySelector(".video-player-backdrop"),n=this.element.querySelector(".video-player-close");t==null||t.addEventListener("click",()=>this.close()),n==null||n.addEventListener("click",()=>this.close())}play(e){const t=bn(e,rn.VIDEO);if(!t){console.error("视频 URL 为空");return}this.videoElement.src=t,this.videoElement.load(),this.open(),this.videoElement.play().catch(n=>{console.warn("自动播放失败，需要用户交互:",n)})}open(){this.isOpen=!0,this.element.classList.add("open"),document.body.style.overflow="hidden"}close(){this.isOpen=!1,this.element.classList.remove("open"),this.videoElement.pause(),this.videoElement.src="",document.body.style.overflow=""}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class T_{constructor(){_(this,"element");this.element=document.createElement("div"),this.element.className="loading-overlay",this.render(),this.applyStyles();const e=()=>{as()&&this.hide()};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}render(){this.element.innerHTML=`
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
    `,document.head.appendChild(e)}show(){as()||this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.element.remove()}}const cd={[te.INVALID_ROOT]:"配置格式错误",[te.MISSING_APP_NAME]:"缺少应用名称",[te.MUSEUMS_NOT_ARRAY]:"博物馆列表格式错误",[te.MUSEUMS_EMPTY]:"博物馆列表为空",[te.MISSING_MUSEUM_ID]:"缺少博物馆 ID",[te.DUPLICATE_MUSEUM_ID]:"博物馆 ID 重复",[te.MISSING_MUSEUM_NAME]:"缺少博物馆名称",[te.MISSING_MUSEUM_COVER]:"缺少封面图",[te.MISSING_MUSEUM_MAP]:"缺少地图配置",[te.MISSING_MAP_IMAGE]:"缺少地图图片",[te.INVALID_MAP_WIDTH]:"地图宽度无效",[te.INVALID_MAP_HEIGHT]:"地图高度无效",[te.SCENES_NOT_ARRAY]:"场景列表格式错误",[te.SCENES_EMPTY]:"场景列表为空",[te.MISSING_SCENE_ID]:"缺少场景 ID",[te.DUPLICATE_SCENE_ID]:"场景 ID 重复",[te.MISSING_SCENE_NAME]:"缺少场景名称",[te.MISSING_PANO]:"缺少全景图",[te.INVALID_PANO_URL]:"高清全景图 URL 无效",[te.INVALID_PANOLOW_URL]:"低清全景图 URL 无效",[te.MISSING_THUMB]:"缺少缩略图",[te.MISSING_INITIAL_VIEW]:"缺少初始视角配置",[te.INVALID_YAW]:"水平角度无效",[te.INVALID_PITCH]:"垂直角度无效",[te.INVALID_FOV]:"视野角度无效",[te.MISSING_MAP_POINT]:"缺少地图点位",[te.INVALID_MAP_POINT_X]:"地图点位 X 坐标无效",[te.INVALID_MAP_POINT_Y]:"地图点位 Y 坐标无效",[te.HOTSPOTS_NOT_ARRAY]:"热点列表格式错误",[te.MISSING_HOTSPOT_ID]:"缺少热点 ID",[te.DUPLICATE_HOTSPOT_ID]:"热点 ID 重复",[te.INVALID_HOTSPOT_TYPE]:"热点类型无效",[te.MISSING_HOTSPOT_LABEL]:"缺少热点标签",[te.INVALID_HOTSPOT_YAW]:"热点水平角度无效",[te.INVALID_HOTSPOT_PITCH]:"热点垂直角度无效",[te.MISSING_HOTSPOT_TARGET]:"缺少热点目标配置",[te.MISSING_TARGET_MUSEUM_ID]:"缺少目标博物馆 ID",[te.MISSING_TARGET_SCENE_ID]:"缺少目标场景 ID",[te.INVALID_TARGET_YAW]:"目标水平角度无效",[te.INVALID_TARGET_PITCH]:"目标垂直角度无效",[te.INVALID_TARGET_FOV]:"目标视野角度无效",[te.MISSING_TARGET_URL]:"缺少视频链接"},dd={[te.INVALID_ROOT]:"请确保 config.json 是一个有效的 JSON 对象",[te.MISSING_APP_NAME]:'请在配置中添加 "appName" 字段，例如："appName": "我的 VR 展馆"',[te.MUSEUMS_NOT_ARRAY]:'请确保 "museums" 是一个数组，例如："museums": []',[te.MUSEUMS_EMPTY]:'请至少添加一个博物馆到 "museums" 数组中',[te.MISSING_MUSEUM_ID]:'请为该博物馆添加 "id" 字段，例如："id": "museum1"',[te.DUPLICATE_MUSEUM_ID]:'请确保每个博物馆的 "id" 都是唯一的，不能重复',[te.MISSING_MUSEUM_NAME]:'请为该博物馆添加 "name" 字段，例如："name": "第一展馆"',[te.MISSING_MUSEUM_COVER]:'请为该博物馆添加 "cover" 字段，填入封面图的 URL',[te.MISSING_MUSEUM_MAP]:'请为该博物馆添加 "map" 对象配置',[te.MISSING_MAP_IMAGE]:'请在地图配置中添加 "image" 字段，填入地图图片的 URL',[te.INVALID_MAP_WIDTH]:'请确保 "map.width" 是一个大于 0 的数字',[te.INVALID_MAP_HEIGHT]:'请确保 "map.height" 是一个大于 0 的数字',[te.SCENES_NOT_ARRAY]:'请确保 "scenes" 是一个数组，例如："scenes": []',[te.SCENES_EMPTY]:"请至少为该博物馆添加一个场景",[te.MISSING_SCENE_ID]:'请为该场景添加 "id" 字段，例如："id": "scene1"',[te.DUPLICATE_SCENE_ID]:'请确保同一博物馆内每个场景的 "id" 都是唯一的',[te.MISSING_SCENE_NAME]:'请为该场景添加 "name" 字段，例如："name": "正门"',[te.MISSING_PANO]:'请为该场景添加 "pano" 或 "panoLow" 字段，至少提供一个全景图 URL',[te.INVALID_PANO_URL]:'请确保 "pano" 字段是一个有效的图片 URL 字符串',[te.INVALID_PANOLOW_URL]:'请确保 "panoLow" 字段是一个有效的图片 URL 字符串',[te.MISSING_THUMB]:'请为该场景添加 "thumb" 字段，填入缩略图的 URL',[te.MISSING_INITIAL_VIEW]:'请为该场景添加 "initialView" 对象配置',[te.INVALID_YAW]:'请确保 "initialView.yaw" 是一个数字（水平角度，范围 -180 到 180）',[te.INVALID_PITCH]:'请确保 "initialView.pitch" 是一个数字（垂直角度，范围 -90 到 90）',[te.INVALID_FOV]:'请确保 "initialView.fov" 是一个数字（视野角度，范围 30 到 120）',[te.MISSING_MAP_POINT]:'请为该场景添加 "mapPoint" 对象配置',[te.INVALID_MAP_POINT_X]:'请确保 "mapPoint.x" 是一个数字（地图上的 X 坐标）',[te.INVALID_MAP_POINT_Y]:'请确保 "mapPoint.y" 是一个数字（地图上的 Y 坐标）',[te.HOTSPOTS_NOT_ARRAY]:'请确保 "hotspots" 是一个数组，例如："hotspots": []',[te.MISSING_HOTSPOT_ID]:'请为该热点添加 "id" 字段，例如："id": "hotspot1"',[te.DUPLICATE_HOTSPOT_ID]:'请确保同一场景内每个热点的 "id" 都是唯一的',[te.INVALID_HOTSPOT_TYPE]:'请确保 "type" 字段是 "scene" 或 "video" 之一',[te.MISSING_HOTSPOT_LABEL]:'请为该热点添加 "label" 字段，例如："label": "进入展厅"',[te.INVALID_HOTSPOT_YAW]:'请确保 "yaw" 是一个数字（热点在全景图中的水平位置）',[te.INVALID_HOTSPOT_PITCH]:'请确保 "pitch" 是一个数字（热点在全景图中的垂直位置）',[te.MISSING_HOTSPOT_TARGET]:'请为该热点添加 "target" 对象配置',[te.MISSING_TARGET_MUSEUM_ID]:'场景跳转类型的热点必须包含 "target.museumId" 字段',[te.MISSING_TARGET_SCENE_ID]:'场景跳转类型的热点必须包含 "target.sceneId" 字段',[te.INVALID_TARGET_YAW]:'请确保 "target.yaw" 是一个数字（跳转后的水平角度）',[te.INVALID_TARGET_PITCH]:'请确保 "target.pitch" 是一个数字（跳转后的垂直角度）',[te.INVALID_TARGET_FOV]:'请确保 "target.fov" 是一个数字（跳转后的视野角度）',[te.MISSING_TARGET_URL]:'视频类型的热点必须包含 "target.url" 字段，填入视频的 URL'};class A_{constructor(e,t,n){_(this,"element");this.element=document.createElement("div"),this.element.className="config-error-panel",this.render(e,t,n),this.applyStyles()}render(e,t,n){this.element.innerHTML=`
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
    `;const i=this.element.querySelector("#retry-btn"),r=this.element.querySelector("#example-btn");i&&i.addEventListener("click",t),r&&r.addEventListener("click",n)}renderErrorCard(e,t){const n=cd[e.code]||"配置错误",i=dd[e.code]||"请检查配置文件的格式和内容",r=[];e.museumName&&r.push(`馆：${e.museumName}`),e.sceneName&&r.push(`场景：${e.sceneName}`);const a=r.length>0?r.join(" / "):"全局配置";return`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class C_{constructor(){_(this,"element");_(this,"isVisible",!1);_(this,"currentYaw",0);_(this,"currentPitch",0);_(this,"currentFov",75);_(this,"clickX",0);_(this,"clickY",0);this.element=document.createElement("div"),this.element.className="debug-panel",this.element.style.display="none",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
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
    `;const e=this.element.querySelector("#debug-close-btn");e&&e.addEventListener("click",()=>{this.hide()});const t=this.element.querySelector("#debug-copy-btn");t&&t.addEventListener("click",()=>{this.copyHotspotJSON()})}show(e,t,n,i,r){this.clickX=e,this.clickY=t,this.currentYaw=n,this.currentPitch=i,this.currentFov=r;const a=this.element.querySelector("#debug-yaw"),o=this.element.querySelector("#debug-pitch"),l=this.element.querySelector("#debug-fov");a&&(a.textContent=n.toFixed(1)),o&&(o.textContent=i.toFixed(1)),l&&(l.textContent=r.toFixed(1));const c=280,d=200,h=20;let u=e-c/2,f=t-d/2;u=Math.max(h,Math.min(u,window.innerWidth-c-h)),f=Math.max(h,Math.min(f,window.innerHeight-d-h)),this.element.style.left=`${u}px`,this.element.style.top=`${f}px`,this.element.style.display="block",this.isVisible=!0}hide(){this.element.style.display="none",this.isVisible=!1}updateView(e,t,n){if(this.currentYaw=e,this.currentPitch=t,this.currentFov=n,this.isVisible){const i=this.element.querySelector("#debug-yaw"),r=this.element.querySelector("#debug-pitch"),a=this.element.querySelector("#debug-fov");i&&(i.textContent=e.toFixed(1)),r&&(r.textContent=t.toFixed(1)),a&&(a.textContent=n.toFixed(1))}}async copyHotspotJSON(){const e={id:`hs_${Date.now()}`,yaw:Math.round(this.currentYaw*10)/10,pitch:Math.round(this.currentPitch*10)/10,type:"scene",targetSceneId:"",label:"热点"},t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),this.showToast("✅ 已复制到剪贴板")}catch{const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select();try{document.execCommand("copy"),this.showToast("✅ 已复制到剪贴板")}catch{this.showToast("❌ 复制失败，请手动复制")}document.body.removeChild(i)}}showToast(e){const t=document.createElement("div");t.className="debug-toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},10),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},2e3)}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}const ja="vrplayer_config_draft_v1";function dc(){try{const s=localStorage.getItem(ja);return s?JSON.parse(s):null}catch(s){return console.warn("加载草稿失败",s),null}}function I_(s){try{const e=JSON.stringify(s);return localStorage.setItem(ja,e),{ok:!0}}catch(e){return console.warn("保存草稿失败",e),{ok:!1,reason:e instanceof Error?e.message:"unknown"}}}function L_(){try{localStorage.removeItem(ja)}catch(s){console.warn("清空草稿失败",s)}}const hd="vr_last_pick_v1";let Ka=null;function R_(){try{const s=localStorage.getItem(hd);if(s){const e=JSON.parse(s);typeof e.yaw=="number"&&typeof e.pitch=="number"&&typeof e.ts=="number"&&(Ka=e)}}catch{}}R_();function P_(s){Ka=s;try{localStorage.setItem(hd,JSON.stringify(s))}catch{}}function hc(){return Ka}const uc="vrplayer_config_draft_ignore_session";class N_{constructor(e,t){_(this,"element");_(this,"config");_(this,"initialConfig");_(this,"editingTarget",{type:"global"});_(this,"simpleMode",!0);_(this,"validationErrors",[]);_(this,"validationDebounceTimer",null);_(this,"draftSaveTimer",null);_(this,"draftLoaded",!1);_(this,"draftIgnoreSession",!1);_(this,"draftBannerMessage",null);_(this,"onConfigChange");this.config=JSON.parse(JSON.stringify(e)),this.initialConfig=JSON.parse(JSON.stringify(e)),this.onConfigChange=t;try{this.draftIgnoreSession=sessionStorage.getItem(uc)==="1"}catch(n){console.warn("读取草稿忽略状态失败",n),this.draftIgnoreSession=!1}this.tryRestoreDraft(),this.element=document.createElement("div"),this.element.className="config-studio",this.render(),this.applyStyles(),this.renderDraftBanner(),this.validateConfig()}tryRestoreDraft(){if(this.draftIgnoreSession)return;const e=dc();e&&(this.config=JSON.parse(JSON.stringify(e)),this.draftLoaded=!0,this.draftBannerMessage="检测到未导出的草稿，已自动恢复。",this.onConfigChange&&this.onConfigChange(this.config))}renderDraftBanner(){const e=this.element.querySelector("#draft-banner");if(!e)return;if(!this.draftLoaded||this.draftIgnoreSession){e.innerHTML="",e.style.display="none";return}const t=this.draftBannerMessage||"检测到未导出的草稿，已自动恢复。";e.innerHTML=`
      <div class="draft-banner-content">
        <span class="draft-banner-text">${this.escapeHtml(t)}</span>
        <div class="draft-banner-actions">
          <button class="banner-btn" data-banner-action="export">导出</button>
          <button class="banner-btn" data-banner-action="clear">清空草稿</button>
          <button class="banner-btn" data-banner-action="ignore">忽略本次</button>
        </div>
      </div>
    `,e.style.display="flex",this.bindDraftBannerEvents()}bindDraftBannerEvents(){const e=this.element.querySelector("#draft-banner");e&&e.querySelectorAll("[data-banner-action]").forEach(t=>{t.addEventListener("click",n=>{const i=n.currentTarget.getAttribute("data-banner-action");i==="export"?this.handleExport():i==="clear"?this.handleClearDraft():i==="ignore"&&this.handleIgnoreDraft()})})}handleIgnoreDraft(){this.draftIgnoreSession=!0;try{sessionStorage.setItem(uc,"1")}catch(e){console.warn("记录忽略草稿状态失败",e)}this.config=JSON.parse(JSON.stringify(this.initialConfig)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.bindEvents(),this.debouncedValidate(),this.notifyChange({skipDraftSave:!0}),this.renderDraftBanner(),this.showToast("已忽略草稿，本次会话使用默认配置")}handleClearDraft(){confirm("确定清空本地草稿？")&&(L_(),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderDraftBanner(),this.showToast("草稿已清空"))}handleExport(){this.exportConfig();const e=dc();e&&this.isConfigSameAs(e)&&this.showToast("已导出（草稿仍保留）")}exportConfig(){const e=JSON.stringify(this.config,null,2),t=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(t),i=document.createElement("a");i.href=n,i.download="config.json",i.click(),URL.revokeObjectURL(n)}isConfigSameAs(e){try{return JSON.stringify(this.config)===JSON.stringify(e)}catch{return!1}}render(){this.element.innerHTML=`
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
    `}bindEvents(){var a;const e=this.element.querySelector("#import-btn"),t=this.element.querySelector("#export-btn"),n=this.element.querySelector("#reset-btn"),i=this.element.querySelector("#clear-draft-btn");this.element.querySelector("#file-input");const r=this.element.querySelector("#simple-mode-toggle");r&&(r.checked=this.simpleMode,r.addEventListener("change",()=>{this.simpleMode=r.checked,this.renderSidebar(),this.renderEditor(),this.bindEvents()})),e==null||e.addEventListener("click",()=>{const o=prompt("请粘贴 JSON 配置：");if(o)try{const l=JSON.parse(o);this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(l){alert("JSON 格式错误："+l)}}),t==null||t.addEventListener("click",()=>{this.handleExport()}),n==null||n.addEventListener("click",async()=>{try{const l=await(await fetch("./config.json",{cache:"no-store"})).json();this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(o){alert("加载示例配置失败："+o)}}),i==null||i.addEventListener("click",()=>{this.handleClearDraft()}),this.element.querySelectorAll(".tree-item[data-target]").forEach(o=>{o.addEventListener("click",l=>{const c=o.getAttribute("data-target");if(c){if(c==="global")this.editingTarget={type:"global"};else if(c.startsWith("museum:")){const d=parseInt(c.split(":")[1]);this.editingTarget={type:"museum",museumIndex:d}}else if(c.startsWith("scene:")){const[d,h,u]=c.split(":").map(Number);this.editingTarget={type:"scene",museumIndex:h,sceneIndex:u}}else if(c.startsWith("hotspot:")){const[d,h,u,f]=c.split(":").map(Number);this.editingTarget={type:"hotspot",museumIndex:h,sceneIndex:u,hotspotIndex:f}}this.renderSidebar(),this.renderEditor(),this.bindFormEvents()}})}),(a=this.element.querySelector("#add-museum-btn"))==null||a.addEventListener("click",()=>{this.addMuseum()}),this.element.querySelectorAll("[data-action]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const c=o.getAttribute("data-action"),d=parseInt(o.getAttribute("data-museum")||"0"),h=parseInt(o.getAttribute("data-scene")||"0"),u=parseInt(o.getAttribute("data-hotspot")||"0");c==="add-scene"?this.addScene(d):c==="del-museum"?confirm("确定删除此博物馆？")&&this.deleteMuseum(d):c==="add-hotspot"?this.addHotspot(d,h,"scene"):c==="add-hotspot-scene"?this.addHotspot(d,h,"scene"):c==="add-hotspot-video"?this.addHotspot(d,h,"video"):c==="del-scene"?confirm("确定删除此场景？")&&this.deleteScene(d,h):c==="del-hotspot"&&confirm("确定删除此热点？")&&this.deleteHotspot(d,h,u)})}),this.bindFormEvents()}bindFormEvents(){if(this.editingTarget.type==="global"){const e=this.element.querySelector("#field-appName");e==null||e.addEventListener("input",()=>{this.config.appName=e.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="museum"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-cover");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].cover=n.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="scene"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-thumb"),i=this.element.querySelector("#field-panoLow"),r=this.element.querySelector("#field-pano"),a=this.element.querySelector("#preview-scene-btn");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].thumb=n.value,this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];i.value?l.panoLow=i.value:delete l.panoLow,this.debouncedValidate(),this.notifyChange()}),r==null||r.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];r.value?l.pano=r.value:delete l.pano,this.debouncedValidate(),this.notifyChange()}),a==null||a.addEventListener("click",()=>{const l=this.config.museums[this.editingTarget.museumIndex],c=l.scenes[this.editingTarget.sceneIndex];jt(l.id,c.id)});const o=this.element.querySelector("#pick-hotspot-btn");o==null||o.addEventListener("click",()=>{this.handleAddHotspotFromPick()})}if(this.editingTarget.type==="hotspot"){const e=this.element.querySelector("#field-type"),t=this.element.querySelector("#field-label"),n=this.element.querySelector("#field-yaw"),i=this.element.querySelector("#field-pitch"),r=this.element.querySelector("#field-target-museumId"),a=this.element.querySelector("#field-target-sceneId"),o=this.element.querySelector("#field-target-url");e==null||e.addEventListener("change",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];c.type=e.value,c.type==="scene"?c.target={museumId:"",sceneId:""}:c.target={url:""},this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].label=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].yaw=parseFloat(n.value)||0,this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].pitch=parseFloat(i.value)||0,this.debouncedValidate(),this.notifyChange()});const l=this.element.querySelector("#pick-reposition-btn");l==null||l.addEventListener("click",()=>{this.handleRepositionHotspot()}),r&&r.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.museumId||(c.museumId=""),c.museumId=r.value,this.debouncedValidate(),this.notifyChange()}),a&&a.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.sceneId||(c.sceneId=""),c.sceneId=a.value,this.debouncedValidate(),this.notifyChange()}),o&&o.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.url||(c.url=""),c.url=o.value,this.debouncedValidate(),this.notifyChange()})}}addMuseum(){const e={id:`museum_${Date.now()}`,name:"新博物馆",cover:"",map:{image:"",width:1e3,height:600},scenes:[]};this.config.museums.push(e),this.editingTarget={type:"museum",museumIndex:this.config.museums.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addScene(e){const t={id:`scene_${Date.now()}`,name:"新场景",thumb:"",pano:"",initialView:{yaw:0,pitch:0,fov:75},mapPoint:{x:0,y:0},hotspots:[]};this.config.museums[e].scenes.push(t),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:this.config.museums[e].scenes.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addHotspot(e,t,n="scene"){const i={id:`hotspot_${Date.now()}`,type:n,label:n==="video"?"新视频热点":"新跳转热点",yaw:0,pitch:0,target:n==="video"?{url:""}:{museumId:this.config.museums[e].id,sceneId:""}};this.config.museums[e].scenes[t].hotspots.push(i),this.editingTarget={type:"hotspot",museumIndex:e,sceneIndex:t,hotspotIndex:this.config.museums[e].scenes[t].hotspots.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteMuseum(e){this.config.museums.splice(e,1),this.editingTarget={type:"global"},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteScene(e,t){this.config.museums[e].scenes.splice(t,1),this.editingTarget={type:"museum",museumIndex:e},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteHotspot(e,t,n){this.config.museums[e].scenes[t].hotspots.splice(n,1),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:t},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}debouncedValidate(){this.validationDebounceTimer&&clearTimeout(this.validationDebounceTimer),this.validationDebounceTimer=window.setTimeout(()=>{this.validateConfig()},200)}validateConfig(){this.validationErrors=xc(this.config),this.updateValidationStatus(),this.renderErrors()}scheduleDraftSave(e){e||(this.draftSaveTimer&&clearTimeout(this.draftSaveTimer),this.draftSaveTimer=window.setTimeout(()=>{const t=I_(this.config);t.ok?this.draftLoaded=!0:this.showToast(`草稿保存失败：${t.reason||"未知原因"}`)},300))}updateValidationStatus(){const e=this.element.querySelector("#validation-status");e&&(this.validationErrors.length===0?(e.innerHTML="✅ 配置通过",e.className="validation-status status-ok"):(e.innerHTML=`❌ ${this.validationErrors.length} 个错误`,e.className="validation-status status-error"))}renderErrors(){const e=this.element.querySelector("#studio-errors");if(e){if(this.validationErrors.length===0){e.innerHTML="";return}e.innerHTML=`
      <div class="studio-errors-content">
        <div class="errors-header">配置错误 (${this.validationErrors.length} 个)</div>
        <div class="errors-list">
          ${this.validationErrors.map(t=>{const n=t.code&&cd[t.code]||"配置错误",i=t.code&&dd[t.code]||"请检查配置",r=[];t.museumName&&r.push(`馆：${t.museumName}`),t.sceneName&&r.push(`场景：${t.sceneName}`);const a=r.length>0?r.join(" / "):"全局配置";return`
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
    `}}notifyChange(e){this.onConfigChange&&this.onConfigChange(this.config),this.scheduleDraftSave(!!(e!=null&&e.skipDraftSave))}showToast(e){const t=document.createElement("div");t.className="studio-toast",t.textContent=e,this.element.appendChild(t),requestAnimationFrame(()=>{t.classList.add("show")}),window.setTimeout(()=>{t.classList.remove("show"),window.setTimeout(()=>t.remove(),300)},2e3)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}handleAddHotspotFromPick(){const e=hc();if(!e){tt("没有拾取点：先点右上角🎯，在全景里点一下");return}if(this.editingTarget.type!=="scene"){tt("请先选择一个场景");return}const{museumIndex:t,sceneIndex:n}=this.editingTarget,i=this.config.museums[t].scenes[n],r={id:`hs_${Date.now()}`,type:"scene",yaw:e.yaw,pitch:e.pitch,label:"进入场景",target:{sceneId:""}};i.hotspots||(i.hotspots=[]),i.hotspots.push(r),this.renderSidebar(),this.renderEditor(),this.bindFormEvents();const a=i.hotspots.length-1;this.highlightNewHotspot(t,n,a),this.editingTarget={type:"hotspot",museumIndex:t,sceneIndex:n,hotspotIndex:a},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange(),tt("已新增热点：请在配置里补全目标场景")}highlightNewHotspot(e,t,n){window.setTimeout(()=>{const i=this.element.querySelector("#sidebar-tree");if(!i)return;const r=i.querySelectorAll(".hotspot-item"),a=r[r.length-1];a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}handleRepositionHotspot(){if(this.editingTarget.type!=="hotspot"){tt("请先选择一个热点");return}const e=hc();if(!e){tt("没有拾取点：先点右上角🎯，在全景里点一下");return}const{museumIndex:t,sceneIndex:n,hotspotIndex:i}=this.editingTarget,r=this.config.museums[t].scenes[n].hotspots[i],a=c=>Math.round(c*10)/10,o=a(e.yaw),l=a(e.pitch);r.yaw=o,r.pitch=l,this.renderEditor(),this.bindFormEvents(),this.highlightHotspotItem(t,n,i),this.debouncedValidate(),this.notifyChange(),window.dispatchEvent(new CustomEvent("vr:pickmode",{detail:{enabled:!1}})),tt(`已更新位置 yaw:${o.toFixed(1)} pitch:${l.toFixed(1)}`)}highlightHotspotItem(e,t,n){window.setTimeout(()=>{const i=this.element.querySelector("#sidebar-tree");if(!i)return;const r=`hotspot:${e}:${t}:${n}`,a=i.querySelector(`[data-target="${r}"]`);a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}getConfig(){return this.config}getElement(){return this.element}remove(){this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}}let Cn=null;function ud(){return Cn!==null?Cn:typeof navigator<"u"&&navigator.maxTouchPoints>0||typeof window<"u"&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)?(Cn="touch",Cn):(Cn="mouse",Cn)}function D_(){return ud()==="touch"}function U_(){return ud()==="mouse"}function O_(){const s=document;return document.fullscreenElement||s.webkitFullscreenElement||null}function cr(){return!!O_()}async function F_(s){const e=s;if(e.requestFullscreen){await e.requestFullscreen();return}if(e.webkitRequestFullscreen){await e.webkitRequestFullscreen();return}throw new Error("Fullscreen API not supported")}async function k_(){const s=document;if(document.exitFullscreen){await document.exitFullscreen();return}if(s.webkitExitFullscreen){await s.webkitExitFullscreen();return}}async function pd(s){const e=s||document.body;!cr()&&U_()&&tt("鼠标滑至最上方可退出全屏",700),await F_(e)}async function Aa(){try{await k_(),fd()}catch(s){console.debug("[fullscreen] exitFullscreenBestEffort failed:",s)}}function fd(){var s,e;try{(e=(s=screen.orientation)==null?void 0:s.unlock)==null||e.call(s)}catch{}}function B_(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 4H4V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 4H20V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 20H4V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 20H20V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function V_(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 9V4h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 9V4h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 15v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 15v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 9l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 9l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 15l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 15l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}class H_{constructor(e={}){_(this,"element");_(this,"fullscreenBtn");_(this,"pickModeBtn",null);_(this,"northCalibrationBtn",null);_(this,"vrModeBtn",null);_(this,"viewerRootEl");_(this,"onTogglePickMode");_(this,"onOpenNorthCalibration");_(this,"onToggleVrMode");_(this,"isPickModeActive",!1);_(this,"isVrModeActive",!1);this.viewerRootEl=e.viewerRootEl,this.onTogglePickMode=e.onTogglePickMode,this.onOpenNorthCalibration=e.onOpenNorthCalibration,this.onToggleVrMode=e.onToggleVrMode,this.element=document.createElement("div"),this.element.className="vr-topright-controls";const t=r=>{const a=r;this.updatePickModeState(a.detail.enabled)};window.addEventListener("vr:pickmode",t);const n=()=>{this.syncFullscreenState()};document.addEventListener("fullscreenchange",n),document.addEventListener("webkitfullscreenchange",n),this.fullscreenBtn=document.createElement("button"),this.fullscreenBtn.className="vr-topright-btn",this.fullscreenBtn.setAttribute("aria-label","进入全屏"),this.fullscreenBtn.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation();const a=cr();try{if(a)await Aa();else{const o=this.viewerRootEl;if(!o){console.warn("[TopRightControls] fullscreen target not set");return}await pd(o)}}catch(o){lt&&console.debug("[TopRightControls] fullscreen toggle failed",o)}finally{setTimeout(()=>{this.syncFullscreenState()},100)}}),this.syncFullscreenState(),this.onTogglePickMode&&(this.pickModeBtn=document.createElement("button"),this.pickModeBtn.className="vr-topright-btn",this.pickModeBtn.setAttribute("aria-label","拾取模式"),this.pickModeBtn.title="拾取模式：点一下画面获取 yaw/pitch",this.pickModeBtn.textContent="🎯",this.pickModeBtn.style.fontSize="18px",this.pickModeBtn.addEventListener("click",r=>{if(r.preventDefault(),r.stopPropagation(),this.onTogglePickMode){const a=this.onTogglePickMode();this.updatePickModeState(a)}}),this.element.appendChild(this.pickModeBtn)),e.showNorthCalibration!==!1&&(e.onOpenNorthCalibration||lt)&&this.onOpenNorthCalibration&&(this.northCalibrationBtn=document.createElement("button"),this.northCalibrationBtn.className="vr-topright-btn",this.northCalibrationBtn.setAttribute("aria-label","校准北向"),this.northCalibrationBtn.title="校准北向：设置当前场景的北方向",this.northCalibrationBtn.textContent="🧭",this.northCalibrationBtn.style.fontSize="18px",this.northCalibrationBtn.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.onOpenNorthCalibration&&this.onOpenNorthCalibration()}),this.element.appendChild(this.northCalibrationBtn)),D_()&&this.onToggleVrMode&&(this.vrModeBtn=document.createElement("button"),this.vrModeBtn.className="vr-topright-btn",this.vrModeBtn.setAttribute("aria-label","VR眼镜"),this.vrModeBtn.title="VR眼镜：转动设备控制视角",this.vrModeBtn.textContent="🥽",this.vrModeBtn.style.fontSize="18px",this.vrModeBtn.addEventListener("click",async r=>{if(r.preventDefault(),r.stopPropagation(),this.onToggleVrMode)try{const a=await this.onToggleVrMode();this.updateVrModeState(a)}catch(a){lt&&console.debug("[TopRightControls] VR mode toggle failed",a)}}),this.element.appendChild(this.vrModeBtn)),this.element.appendChild(this.fullscreenBtn)}updatePickModeState(e){this.isPickModeActive=e,this.pickModeBtn&&(this.pickModeBtn.setAttribute("aria-label",e?"关闭拾取模式":"开启拾取模式"),this.pickModeBtn.title=e?"关闭拾取模式":"开启拾取模式：点一下画面获取 yaw/pitch",e?this.pickModeBtn.style.background="rgba(255,255,255,0.18)":this.pickModeBtn.style.background="")}updateVrModeState(e){this.isVrModeActive=e,this.vrModeBtn&&(this.vrModeBtn.setAttribute("aria-label",e?"退出VR模式":"进入VR模式"),this.vrModeBtn.title=e?"退出VR模式":"VR眼镜：转动设备控制视角",e?this.vrModeBtn.style.background="rgba(255,255,255,0.18)":this.vrModeBtn.style.background="")}setViewerRootEl(e){this.viewerRootEl=e}syncFullscreenState(){const e=cr();this.fullscreenBtn.setAttribute("aria-label",e?"退出全屏":"进入全屏"),this.fullscreenBtn.title=e?"退出全屏":"进入全屏",this.fullscreenBtn.innerHTML=e?V_():B_()}getElement(){return this.element}remove(){this.element.remove()}}async function Ca(s){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(s),!0}catch(e){console.debug("[copyText] Clipboard API failed, using fallback:",e)}try{const e=document.createElement("textarea");e.value=s,e.style.position="fixed",e.style.top="-9999px",e.style.left="-9999px",e.style.opacity="0",e.setAttribute("readonly","readonly"),document.body.appendChild(e),e.select(),e.setSelectionRange(0,s.length);const t=document.execCommand("copy");return document.body.removeChild(e),t}catch(e){return console.debug("[copyText] execCommand fallback failed:",e),!1}}class z_{constructor(e={}){_(this,"root");_(this,"backdrop");_(this,"card");_(this,"closeBtn");_(this,"isOpen",!1);_(this,"onCloseCallback");_(this,"escapeHandler");this.onCloseCallback=e.onClose,this.root=document.createElement("div"),this.root.className="vr-teammodal",this.backdrop=document.createElement("div"),this.backdrop.className="vr-teammodal-backdrop",this.backdrop.addEventListener("click",()=>this.close()),this.root.appendChild(this.backdrop),this.card=document.createElement("div"),this.card.className="vr-teammodal-card",this.closeBtn=document.createElement("button"),this.closeBtn.className="vr-teammodal-close",this.closeBtn.innerHTML="×",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.addEventListener("click",()=>this.close()),this.closeBtn.addEventListener("touchstart",g=>{g.stopPropagation(),this.close()});const t=document.createElement("div");t.className="vr-teammodal-title",t.textContent="鼎虎清源";const n=document.createElement("div");n.className="vr-teammodal-subtitle",n.textContent="VR 研学项目";const i=document.createElement("div");i.className="vr-teammodal-content";const r=document.createElement("p");r.className="vr-teammodal-text",r.textContent="致力于打造沉浸式虚拟现实研学体验，让学习更生动、更直观。";const a=document.createElement("p");a.className="vr-teammodal-text",a.textContent="通过 360° 全景技术，为师生提供身临其境的探索之旅。";const o=document.createElement("p");o.className="vr-teammodal-text",o.textContent="融合创新科技与教育理念，开启数字化学习新篇章。";const l=document.createElement("div");l.className="vr-teammodal-support";const c=document.createElement("div");c.textContent="技术支持：kyu",l.appendChild(c);const d=document.createElement("div");d.className="copyable",d.setAttribute("data-copy","onekyu"),d.textContent="微信：onekyu(点此复制)",d.style.cursor="pointer",d.addEventListener("click",async()=>{const g=d.getAttribute("data-copy");g&&await Ca(g)&&(tt("微信号已复制"),lt&&console.debug("[TeamIntroModal] 微信号已复制:",g))}),l.appendChild(d);const h=document.createElement("div");h.className="copyable",h.setAttribute("data-copy","3386453830"),h.textContent="QQ：3386453830(点此复制)",h.style.cursor="pointer",h.addEventListener("click",async()=>{const g=h.getAttribute("data-copy");g&&await Ca(g)&&(tt("QQ号已复制"),lt&&console.debug("[TeamIntroModal] QQ号已复制:",g))}),l.appendChild(h);const u=document.createElement("a");u.href="https://qm.qq.com/q/sNWlsarvtS",u.target="_blank",u.rel="noreferrer noopener",u.textContent="点此唤起QQ",l.appendChild(u);const f=document.createElement("div");f.className="vr-teammodal-footer",f.textContent="© 2025 鼎虎清源",i.appendChild(r),i.appendChild(a),i.appendChild(o),i.appendChild(l);const v=document.createElement("div");v.className="vr-teammodal-header",v.appendChild(t),v.appendChild(this.closeBtn),this.card.appendChild(v),this.card.appendChild(n),this.card.appendChild(i),this.card.appendChild(f),this.root.appendChild(this.card),this.escapeHandler=g=>{g.key==="Escape"&&this.isOpen&&this.close()},window.addEventListener("keydown",this.escapeHandler)}getModalRoot(){let e=document.getElementById("vr-modal-root");if(!e&&(ld(),e=document.getElementById("vr-modal-root"),!e))throw new Error("vr-modal-root missing, please call ensureModalHost() first");return e}mount(e){this.root.parentNode!==e&&(this.root.parentNode&&this.root.parentNode.removeChild(this.root),e.appendChild(this.root))}open(){if(lt&&console.debug("[TeamIntroModal] open called",new Error().stack),this.isOpen)return;const e=this.getModalRoot();this.root.parentNode!==e&&(this.root.parentNode&&this.root.parentNode.removeChild(this.root),e.appendChild(this.root)),this.isOpen=!0,requestAnimationFrame(()=>{this.root.classList.add("open")})}close(){this.isOpen&&(this.isOpen=!1,this.root.classList.remove("open"),this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.onCloseCallback&&this.onCloseCallback())}dispose(){this.escapeHandler&&window.removeEventListener("keydown",this.escapeHandler),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class G_{constructor(e={}){_(this,"element");_(this,"teamIntroModal");this.teamIntroModal=new z_({}),this.element=document.createElement("div"),this.element.className="vr-brandmark",this.element.textContent=e.brandText||"鼎虎清源",this.element.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this.teamIntroModal.open()})}getElement(){return this.element}getAboutModal(){return this.teamIntroModal}remove(){this.element.remove(),this.teamIntroModal.dispose()}}const W_=["辱骂","傻逼","垃圾","滚开","暴力","色情","黄色","毒品","赌博","诈骗","恐怖","自杀","枪","炸弹","仇恨","歧视","hate","suicide","bomb","porn"];function pc(s){return(s||"").toLowerCase().replace(/\s+/g,"").replace(/[^\p{L}\p{N}]+/gu,"")}function Y_(s){const e=pc(s);return e?W_.some(t=>e.includes(pc(String(t)))):!1}const Za="vr_user",md="vr_comments_v1",gd="vr_likes_v1",X_=1e4,q_=200,$_=50;function Ja(s,e){if(!s)return e;try{return JSON.parse(s)}catch{return e}}function vd(s){return`${s}_${Date.now()}_${Math.random().toString(16).slice(2,8)}`}function os(){const s=Ja(localStorage.getItem(Za),null);return!s||typeof s!="object"||typeof s.id!="string"||typeof s.name!="string"?null:{id:s.id,name:s.name}}function j_(s){const e={id:vd("u"),name:s};return localStorage.setItem(Za,JSON.stringify(e)),e}function _d(){localStorage.removeItem(Za)}function xd(){const s=Ja(localStorage.getItem(md),[]);return Array.isArray(s)?s:[]}function K_(s){localStorage.setItem(md,JSON.stringify(s))}function Z_(s){return xd().filter(e=>e.sceneId===s).sort((e,t)=>t.ts-e.ts).slice(0,$_)}function J_(s,e){const t=os();if(!t)return{ok:!1,reason:"not_logged_in"};const n=(e||"").trim();if(Y_(n))return{ok:!1,reason:"banned"};const i=xd(),r=i.filter(l=>l.sceneId===s&&l.userId===t.id).sort((l,c)=>c.ts-l.ts)[0];if(r&&Date.now()-r.ts<X_)return{ok:!1,reason:"cooldown"};const o=[{id:vd("c"),sceneId:s,userId:t.id,userName:t.name,text:n,ts:Date.now()},...i].slice(0,q_);return K_(o),{ok:!0}}function yd(){return Ja(localStorage.getItem(gd),{likesCountByScene:{},likedByUser:{}})}function Q_(s){localStorage.setItem(gd,JSON.stringify(s))}function e0(s,e){var r;const t=yd(),n=t.likesCountByScene[s]||0,i=e?!!((r=t.likedByUser[e])!=null&&r[s]):!1;return{count:n,liked:i}}function fc(s,e){return e0(s,e)}function t0(s){const e=os();if(!e)return{ok:!1,reason:"login_required"};const t=yd();t.likedByUser[e.id]||(t.likedByUser[e.id]={});const i=!!!t.likedByUser[e.id][s];t.likedByUser[e.id][s]=i;const r=t.likesCountByScene[s]||0;return t.likesCountByScene[s]=Math.max(0,r+(i?1:-1)),Q_(t),{ok:!0,action:i?"liked":"unliked",count:t.likesCountByScene[s]}}class n0{constructor(e={}){_(this,"element");_(this,"isOpen",!1);_(this,"inputEl");_(this,"options");_(this,"handleKeyDownBound");this.options=e,this.handleKeyDownBound=g=>this.handleKeyDown(g),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const t=document.createElement("div");t.className="vr-modal-mask";const n=document.createElement("div");n.className="vr-modal-card vr-login-card";const i=document.createElement("div");i.className="vr-login-title-row";const r=document.createElement("div");r.className="vr-modal-title",r.textContent="登录";const a=document.createElement("button");a.className="vr-btn vr-login-close",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",()=>this.close()),i.appendChild(r),i.appendChild(a);const o=document.createElement("div");o.className="vr-modal-desc",o.textContent="输入用户名后，可点赞与留言（本地存储）。";const l=document.createElement("div");l.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",g=>{g.key==="Enter"&&this.handleConfirm()});const c=document.createElement("div");c.className="vr-modal-actions vr-login-actions";const d=document.createElement("button");d.className="vr-btn vr-login-btn",d.textContent="取消",d.addEventListener("click",()=>this.close());const h=document.createElement("button");h.className="vr-btn vr-login-btn danger",h.textContent="退出登录",h.addEventListener("click",()=>{var g,m;_d(),(m=(g=this.options).onLogout)==null||m.call(g),this.close()});const u=document.createElement("button");u.className="vr-btn vr-login-btn primary",u.textContent="确认",u.addEventListener("click",()=>this.handleConfirm()),c.appendChild(d),c.appendChild(h),c.appendChild(u),l.appendChild(this.inputEl),n.appendChild(i),n.appendChild(o),n.appendChild(l),n.appendChild(c),t.addEventListener("click",()=>this.close()),n.addEventListener("click",g=>g.stopPropagation()),this.element.appendChild(t),this.element.appendChild(n);const f=()=>{const g=os();h.style.display=g?"inline-flex":"none"},v=this.open.bind(this);this.open=()=>{f(),v()}}handleKeyDown(e){this.isOpen&&e.key==="Escape"&&this.close()}handleConfirm(){var n,i;const e=(this.inputEl.value||"").trim();if(e.length<2||e.length>12){tt("用户名需 2-12 字");return}const t=j_(e);(i=(n=this.options).onLogin)==null||i.call(n,t),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const e=os();this.inputEl.value=(e==null?void 0:e.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class i0{constructor(e){_(this,"element");_(this,"sceneId");_(this,"sceneName");_(this,"subtitleEl");_(this,"loginHintBtn");_(this,"userLineEl");_(this,"userNameEl");_(this,"likeBtn");_(this,"likeCountEl");_(this,"commentsEl");_(this,"inputEl");_(this,"sendBtn");_(this,"loginModal");_(this,"highlightNextFirstComment",!1);this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.element=document.createElement("div"),this.element.className="vr-community";const t=document.createElement("div");t.className="vr-community-header";const n=document.createElement("div");n.className="vr-community-title",n.textContent="微社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle";const i=document.createElement("button");i.className="vr-community-close",i.innerHTML="×",i.setAttribute("aria-label","关闭"),i.style.pointerEvents="auto",i.style.zIndex="10",i.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation(),d.stopImmediatePropagation(),window.dispatchEvent(new CustomEvent("vr:close-panels"))}),t.appendChild(n),t.appendChild(this.subtitleEl),t.appendChild(i);const r=document.createElement("div");r.className="vr-community-content";const a=document.createElement("div");a.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可点赞/留言",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const o=document.createElement("button");o.className="vr-btn vr-community-logout",o.textContent="退出登录",o.addEventListener("click",()=>{_d(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(o),a.appendChild(this.loginHintBtn),a.appendChild(this.userLineEl);const l=document.createElement("div");l.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="Like",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const d=t0(this.sceneId);if(!d.ok){tt("请先登录"),this.loginModal.open();return}this.renderLikes(d.count,d.action==="liked"),tt(d.action==="liked"?"已点赞":"已取消点赞")}),l.appendChild(this.likeBtn),l.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const c=document.createElement("div");c.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",d=>{d.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),c.appendChild(this.inputEl),c.appendChild(this.sendBtn),r.appendChild(a),r.appendChild(l),r.appendChild(this.commentsEl),r.appendChild(c),this.element.appendChild(t),this.element.appendChild(r),this.loginModal=new n0({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(e.sceneId,e.sceneName)}setScene(e,t){this.sceneId=e,this.sceneName=t,this.subtitleEl.textContent=this.sceneName?`当前：${this.sceneName}`:`当前场景：${this.sceneId}`,this.refresh()}toastByReason(e){e==="not_logged_in"?tt("请先登录"):e==="banned"?tt("内容包含敏感词，已拦截"):e==="cooldown"?tt("评论过于频繁，请稍后再试"):e==="EMPTY"&&tt("请输入内容")}formatRelativeTime(e){const t=Date.now()-e;if(t<6e4)return"刚刚";const n=Math.floor(t/6e4);if(n<60)return`${n} 分钟前`;const i=Math.floor(n/60);return i<24?`${i} 小时前`:new Date(e).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(e,t){this.likeCountEl.textContent=String(e),this.likeBtn.classList.toggle("liked",t)}renderComments(e){this.commentsEl.innerHTML="";const t=document.createElement("div");if(t.className="vr-community-tip",t.textContent="仅显示本场景的最近 50 条留言",this.commentsEl.appendChild(t),!e.length){const i=document.createElement("div");i.className="vr-community-empty",i.textContent="还没有留言，来做第一个发言的人吧。",this.commentsEl.appendChild(i);return}let n=null;for(const i of e){const r=document.createElement("div");r.className="vr-community-comment";const a=document.createElement("div");a.className="vr-community-comment-meta",a.textContent=`${i.userName} · ${this.formatRelativeTime(i.ts)}`;const o=document.createElement("div");o.className="vr-community-comment-text",o.textContent=i.text,r.appendChild(a),r.appendChild(o),this.commentsEl.appendChild(r),n||(n=r)}n&&this.highlightNextFirstComment&&(n.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{n==null||n.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const t=(this.inputEl.value||"").trim();if(!t){this.toastByReason("EMPTY");return}const n=J_(this.sceneId,t);if(!n.ok){n.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(n.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,tt("评论已发布")}refresh(){const e=os();this.loginHintBtn.style.display=e?"none":"inline-flex",this.userLineEl.style.display=e?"flex":"none",this.userNameEl.textContent=e?e.name:"";const t=fc(this.sceneId,(e==null?void 0:e.id)||"anon").count,n=e?fc(this.sceneId,e.id).liked:!1;this.renderLikes(t,n),this.renderComments(Z_(this.sceneId));const i=!e;this.inputEl.disabled=i,this.sendBtn.classList.toggle("disabled",i)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}class s0{constructor(e){_(this,"element");_(this,"museum");_(this,"scenes");_(this,"currentSceneId");_(this,"onClose");_(this,"mapContainer");_(this,"mapImage");_(this,"pointsContainer");_(this,"unsubscribeFocus",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-map-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-map-header";const t=document.createElement("div");t.className="vr-map-title",t.textContent="平面图";const n=document.createElement("button");n.className="vr-btn vr-map-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(n),this.mapContainer=document.createElement("div"),this.mapContainer.className="vr-map-container",this.mapImage=document.createElement("img"),this.mapImage.className="vr-map-image",this.mapImage.src=this.museum.map.image,this.mapImage.alt=`${this.museum.name} 平面图`,this.mapImage.style.width="100%",this.mapImage.style.height="auto",this.mapImage.style.display="block",this.pointsContainer=document.createElement("div"),this.pointsContainer.className="vr-map-points",this.mapContainer.appendChild(this.mapImage),this.mapContainer.appendChild(this.pointsContainer);const i=document.createElement("div");i.className="vr-map-body",i.appendChild(this.mapContainer),this.element.appendChild(e),this.element.appendChild(i),this.mapImage.addEventListener("load",()=>{this.renderPoints()}),this.mapImage.complete&&this.renderPoints(),this.unsubscribeFocus=hr(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="map"){const t=this.pointsContainer.querySelector(`[data-scene-id="${e.sceneId}"]`);t&&(t.classList.add("vr-map-point--focus-flash"),setTimeout(()=>{t.classList.remove("vr-map-point--focus-flash")},300))}}renderPoints(){if(this.pointsContainer.innerHTML="",!this.mapImage.complete||!this.mapContainer.offsetWidth){setTimeout(()=>this.renderPoints(),100);return}const e=this.museum.map.width,t=this.museum.map.height,n=this.mapContainer.offsetWidth,i=n*t/e;this.mapContainer.style.height=`${i}px`;const r=n/e,a=i/t;this.scenes.forEach(o=>{if(!o.mapPoint)return;const l=document.createElement("button");l.className="vr-btn vr-map-point",l.setAttribute("data-scene-id",o.id),l.setAttribute("aria-label",o.name),o.id===this.currentSceneId&&l.classList.add("vr-map-point--current");const d=o.mapPoint.x*r,h=o.mapPoint.y*a;l.style.left=`${d}px`,l.style.top=`${h}px`;const u=document.createElement("div");u.className="vr-map-point-marker",l.appendChild(u);const f=document.createElement("div");f.className="vr-map-point-tooltip",f.textContent=o.name,l.appendChild(f),l.addEventListener("mouseenter",()=>{Zt({type:"hover",museumId:this.museum.id,sceneId:o.id,source:"map",ts:Date.now()})}),l.addEventListener("mouseleave",()=>{Zt({type:"hover",museumId:this.museum.id,sceneId:null,source:"map",ts:Date.now()})}),l.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),Zt({type:"focus",museumId:this.museum.id,sceneId:o.id,source:"map",ts:Date.now()}),jt(this.museum.id,o.id),this.onClose&&this.onClose()}),this.pointsContainer.appendChild(l)})}updateCurrentScene(e){this.currentSceneId=e,this.renderPoints()}updateMuseum(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.mapImage.src=e.map.image,this.renderPoints()}getElement(){return this.element}remove(){this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class r0{constructor(e,t,n,i,r,a){_(this,"scene");_(this,"camera");_(this,"renderer");_(this,"container");_(this,"controls");_(this,"sceneNodes",new Map);_(this,"currentSceneId",null);_(this,"animationId",null);_(this,"museumId");_(this,"museum",null);_(this,"scenes");_(this,"onSceneClick");_(this,"unsubscribeFocus",null);_(this,"hoveredSceneId",null);_(this,"focusAnimation",null);_(this,"animate",()=>{this.animationId=requestAnimationFrame(this.animate),this.controls&&this.controls.update(),this.focusAnimation&&(this.focusAnimation.progress+=.05,this.focusAnimation.progress>=1?(this.camera.position.copy(this.focusAnimation.target),this.camera.lookAt(0,0,0),this.controls&&this.controls.update(),this.focusAnimation=null):(this.camera.position.lerpVectors(this.focusAnimation.start,this.focusAnimation.target,this.focusAnimation.progress),this.camera.lookAt(0,0,0)));const e=Date.now()*.001;this.sceneNodes.forEach(t=>{if(t.userData.isCurrent){const n=Math.sin(e*2)*.1+1;t.scale.set(n*1.2,n*1.2,n*1.2);const i=t.material;i.opacity=.6+Math.sin(e*2)*.2}}),this.renderer.render(this.scene,this.camera)});this.container=e,this.museumId=t,this.museum=a||null,this.scenes=n,this.currentSceneId=i,this.onSceneClick=r,this.scene=new Fa,this.scene.background=null,this.camera=new wt(50,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,5,10),this.camera.lookAt(0,0,0),this.renderer=new gr({antialias:!0,alpha:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(this.renderer.domElement),this.initControls(),this.generateNodes(),this.setupLighting(),this.animate(),window.addEventListener("resize",()=>this.handleResize()),this.unsubscribeFocus=hr(o=>{this.handleSceneFocus(o)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="dollhouse"){const t=this.sceneNodes.get(e.sceneId);if(t){const n=t.position.clone(),i=new L(n.x*.3,n.y+3,n.z+8);this.focusAnimation={target:i,start:this.camera.position.clone(),progress:0}}}}async initControls(){try{const{OrbitControls:e}=await Zs(async()=>{const{OrbitControls:t}=await import("./OrbitControls-VUEjplfA.js");return{OrbitControls:t}},[],import.meta.url);this.controls=new e(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=3,this.controls.maxDistance=30,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.minPolarAngle=Math.PI/6}catch(e){console.warn("Failed to load OrbitControls:",e)}}setupLighting(){const e=new rd(16777215,.6);this.scene.add(e);const t=new sd(16777215,.4);t.position.set(5,10,5),this.scene.add(t)}generateNodes(){this.sceneNodes.forEach(t=>{this.scene.remove(t),t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose()}),this.sceneNodes.clear();const e=this.calculateLayout();this.scenes.forEach((t,n)=>{const i=e[n],r=this.createSceneNode(t,i,t.id===this.currentSceneId);this.sceneNodes.set(t.id,r),this.scene.add(r)})}calculateLayout(){var i,r,a,o;const e=[],t=this.scenes.filter(l=>l.mapPoint);if(t.length>0){const l=((r=(i=this.museum)==null?void 0:i.map)==null?void 0:r.width)||1e3,c=((o=(a=this.museum)==null?void 0:a.map)==null?void 0:o.height)||600;let d=1/0,h=-1/0,u=1/0,f=-1/0;t.forEach(T=>{T.mapPoint&&(d=Math.min(d,T.mapPoint.x),h=Math.max(h,T.mapPoint.x),u=Math.min(u,T.mapPoint.y),f=Math.max(f,T.mapPoint.y))});const v=h-d||l,g=f-u||c,m=v>0?10/v:.01,p=g>0?10/g:.01,E=(d+h)/2,x=(u+f)/2;for(const T of this.scenes)if(T.mapPoint)e.push({x:(T.mapPoint.x-E)*m,y:0,z:(T.mapPoint.y-x)*p});else{const R=Math.ceil(Math.sqrt(this.scenes.length)),A=Math.floor(e.length/R),C=e.length%R;e.push({x:(C-R/2)*2,y:0,z:(A-R/2)*2})}}else{const l=Math.ceil(Math.sqrt(this.scenes.length));for(let c=0;c<this.scenes.length;c++){const d=Math.floor(c/l),h=c%l;e.push({x:(h-l/2)*2,y:0,z:(d-l/2)*2})}}return e}createSceneNode(e,t,n){const i=new Ui(1,1,1),r=n?4886754:8947848,a=new za({color:r,opacity:n?.8:.5,transparent:!0,metalness:.1,roughness:.7}),o=new pt(i,a);return o.position.set(t.x,t.y,t.z),o.userData={sceneId:e.id,sceneName:e.name},o.userData.onClick=()=>{this.onSceneClick&&this.onSceneClick(this.museumId,e.id)},n&&(o.userData.isCurrent=!0,o.scale.set(1.2,1.2,1.2)),o}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}updateCurrentScene(e){this.currentSceneId=e,this.generateNodes()}updateScenes(e,t){this.scenes=e,this.currentSceneId=t,this.generateNodes()}setOnSceneClick(e){this.onSceneClick=e}handleClick(e){const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new rs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(a.length>0){const o=a[0].object,l=o.userData.sceneId;Zt({type:"focus",museumId:this.museumId,sceneId:l,source:"dollhouse",ts:Date.now()}),o.userData.onClick&&o.userData.onClick()}}handleMouseMove(e){const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new rs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(this.sceneNodes.forEach(o=>{const l=o.material;o.userData.isCurrent||(l.opacity=.5)}),a.length>0){const o=a[0].object,l=o.material,c=o.userData.sceneId;o.userData.isCurrent||(l.opacity=.7),this.hoveredSceneId!==c&&(this.hoveredSceneId=c,Zt({type:"hover",museumId:this.museumId,sceneId:c,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="pointer"}else this.hoveredSceneId!==null&&(this.hoveredSceneId=null,Zt({type:"hover",museumId:this.museumId,sceneId:null,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="default"}getDomElement(){return this.renderer.domElement}dispose(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.sceneNodes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.sceneNodes.clear(),this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.controls&&this.controls.dispose()}}class a0{constructor(e){_(this,"element");_(this,"museum");_(this,"scenes");_(this,"currentSceneId");_(this,"onClose");_(this,"container");_(this,"dollhouseScene",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-dollhouse-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-dollhouse-header";const t=document.createElement("div");t.className="vr-dollhouse-title",t.textContent="三维图";const n=document.createElement("button");n.className="vr-btn vr-dollhouse-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(n),this.container=document.createElement("div"),this.container.className="vr-dollhouse-container";const i=document.createElement("div");i.className="vr-dollhouse-body",i.appendChild(this.container),this.element.appendChild(e),this.element.appendChild(i),this.initDollhouseScene()}initDollhouseScene(){this.dollhouseScene&&this.dollhouseScene.dispose(),this.dollhouseScene=new r0(this.container,this.museum.id,this.scenes,this.currentSceneId,(t,n)=>{jt(t,n),this.onClose&&this.onClose()},this.museum);const e=this.dollhouseScene.getDomElement();e.addEventListener("click",t=>{var n;(n=this.dollhouseScene)==null||n.handleClick(t)}),e.addEventListener("mousemove",t=>{var n;(n=this.dollhouseScene)==null||n.handleMouseMove(t)})}updateCurrentScene(e){this.currentSceneId=e,this.dollhouseScene&&this.dollhouseScene.updateCurrentScene(e)}updateMuseum(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.dollhouseScene?this.dollhouseScene.updateScenes(t,n):this.initDollhouseScene()}getElement(){return this.element}remove(){this.dollhouseScene&&(this.dollhouseScene.dispose(),this.dollhouseScene=null),this.element.remove()}}class o0{constructor(e){_(this,"element");_(this,"currentTab");_(this,"sceneId");_(this,"sceneName");_(this,"museum");_(this,"scenes");_(this,"currentSceneId");_(this,"communityPanel",null);_(this,"mapPanel",null);_(this,"dollhousePanel",null);_(this,"unsubscribeInteracting",null);_(this,"unsubscribeIdle",null);_(this,"unsubscribeUIEngaged",null);this.currentTab=e.initialTab,this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId||e.sceneId,this.element=document.createElement("div"),this.element.className="vr-panl vr-glass hidden",this.render(),this.setupInteractionListeners()}setupInteractionListeners(){this.element.addEventListener("click",t=>{it.emitUIEngaged()},!0);const e=()=>{this.currentTab==="community"&&(this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.setTab("guide"),window.dispatchEvent(new CustomEvent("vr:bottom-dock-tab-change",{detail:{tab:"guide"}})))};window.addEventListener("vr:close-panels",e)}render(){if(this.element.classList.remove("vr-panel--community","vr-panel--map","vr-panel--dollhouse"),this.currentTab==="community"){this.element.classList.add("vr-panel--community"),this.element.innerHTML="";const e=this.sceneId||"unknown";this.communityPanel?this.communityPanel.setScene(e,this.sceneName):this.communityPanel=new i0({sceneId:e,sceneName:this.sceneName}),this.element.appendChild(this.communityPanel.getElement());return}if(this.currentTab==="map"){if(this.element.classList.add("vr-panel--map"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.museum&&this.scenes&&this.scenes.length>0){const e=this.currentSceneId||this.sceneId||this.scenes[0].id;this.mapPanel?this.mapPanel.updateCurrentScene(e):this.mapPanel=new s0({museum:this.museum,scenes:this.scenes,currentSceneId:e,onClose:()=>{this.setTab("guide")}}),this.element.appendChild(this.mapPanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">平面图</div>
          <div class="vr-panel-body">暂无平面图数据</div>
        `;return}if(this.currentTab==="dollhouse"){if(this.element.classList.add("vr-panel--dollhouse"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.museum&&this.scenes&&this.scenes.length>0){const e=this.currentSceneId||this.sceneId||this.scenes[0].id;this.dollhousePanel?this.dollhousePanel.updateCurrentScene(e):this.dollhousePanel=new a0({museum:this.museum,scenes:this.scenes,currentSceneId:e,onClose:()=>{this.setTab("guide")}}),this.element.appendChild(this.dollhousePanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">三维图</div>
          <div class="vr-panel-body">暂无场景数据</div>
        `;return}this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.classList.add("hidden"),this.element.innerHTML=""}setSceneContext(e,t){this.sceneId=e,this.sceneName=t,this.currentSceneId=e,this.currentTab==="community"&&this.communityPanel&&this.communityPanel.setScene(e,t),this.currentTab==="map"&&this.mapPanel&&this.mapPanel.updateCurrentScene(e),this.currentTab==="dollhouse"&&this.dollhousePanel&&this.dollhousePanel.updateCurrentScene(e)}setMuseumContext(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.currentTab==="map"&&this.mapPanel?this.mapPanel.updateMuseum(e,t,n):this.currentTab==="map"&&this.render(),this.currentTab==="dollhouse"&&this.dollhousePanel?this.dollhousePanel.updateMuseum(e,t,n):this.currentTab==="dollhouse"&&this.render()}setVisible(e){this.element.classList.remove("hidden","visible"),this.element.classList.add(e?"visible":"hidden")}setTab(e){this.currentTab=e,this.setVisible(!1),window.setTimeout(()=>{this.render(),this.setVisible(!0)},40)}getElement(){return this.element}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.remove()}}const l0=[{key:"guide",label:"导览"},{key:"community",label:"社区"},{key:"settings",label:"设置"},{key:"info",label:"信息"}];class c0{constructor(e={}){_(this,"element");_(this,"dockEl");_(this,"panels");_(this,"activeTab");_(this,"unsubscribeInteracting",null);_(this,"unsubscribeIdle",null);_(this,"unsubscribeUIEngaged",null);this.activeTab=e.initialTab||"guide",this.element=document.createElement("div"),this.element.className="vr-dock-wrap",this.panels=new o0({initialTab:this.activeTab,sceneId:e.sceneId,sceneName:e.sceneName,museum:e.museum,scenes:e.scenes,currentSceneId:e.currentSceneId||e.sceneId}),this.panels.setVisible(!0),this.dockEl=document.createElement("div"),this.dockEl.className="vr-dock vr-glass";for(const n of l0){const i=document.createElement("button");i.className="vr-btn vr-dock-tab",i.setAttribute("data-tab",n.key),i.innerHTML=`<div class="vr-dock-tab-label">${n.label}</div>`,i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),it.emitUIEngaged(),this.setActiveTab(n.key),n.key==="guide"&&e.onGuideClick&&e.onGuideClick()}),this.dockEl.appendChild(i)}this.element.appendChild(this.panels.getElement()),this.element.appendChild(this.dockEl),this.syncActiveClass(),this.setupInteractionListeners();const t=n=>{const i=n;i.detail.tab&&i.detail.tab!==this.activeTab&&(this.activeTab=i.detail.tab,this.syncActiveClass())};window.addEventListener("vr:bottom-dock-tab-change",t)}setupInteractionListeners(){}syncActiveClass(){this.dockEl.querySelectorAll(".vr-dock-tab").forEach(e=>{const t=e.getAttribute("data-tab");t&&e.classList.toggle("active",t===this.activeTab)})}setActiveTab(e){this.activeTab!==e&&(this.activeTab=e,this.syncActiveClass(),this.panels.setTab(e),window.dispatchEvent(new CustomEvent("vr:bottom-dock-tab-change",{detail:{tab:e}})))}getActiveTab(){return this.activeTab}setSceneContext(e,t){this.panels.setSceneContext(e,t)}setMuseumContext(e,t,n){this.panels.setMuseumContext(e,t,n)}getElement(){return this.element}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.panels.remove(),this.element.remove()}}const mc="data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
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
    </svg>`);class d0{constructor(e){_(this,"element");_(this,"isOpen",!1);_(this,"museumId");_(this,"currentSceneId");_(this,"scenes");_(this,"filteredScenes");_(this,"listEl",null);_(this,"previewImgEl",null);_(this,"previewTitleEl",null);_(this,"previewIdEl",null);_(this,"searchInputEl",null);_(this,"hoveredSceneId",null);_(this,"selectedSceneId",null);_(this,"onClose");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.filteredScenes=e.scenes,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-guide-drawer";const t=document.createElement("div");t.className="vr-guide-mask";const n=document.createElement("div");n.className="vr-guide-panel";const i=document.createElement("div");i.className="vr-guide-header";const r=document.createElement("div");r.className="vr-guide-header-left";const a=document.createElement("div");a.className="vr-guide-title",a.textContent="导览";const o=document.createElement("button");o.className="vr-btn vr-guide-close",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),this.close()}),i.appendChild(r),i.appendChild(a),i.appendChild(o);const l=document.createElement("div");l.className="vr-guide-search";const c=document.createElement("input");c.className="vr-guide-search-input",c.type="search",c.placeholder="搜索场景",l.appendChild(c),this.searchInputEl=c;const d=document.createElement("div");d.className="vr-guide-body";const h=document.createElement("div");h.className="vr-guide-list",this.listEl=h;const u=document.createElement("div");u.className="vr-guide-preview";const f=document.createElement("img");f.className="vr-guide-preview-image",this.previewImgEl=f;const v=document.createElement("div");v.className="vr-guide-preview-title",this.previewTitleEl=v;const g=document.createElement("div");g.className="vr-guide-preview-id",this.previewIdEl=g;const m=document.createElement("button");m.className="vr-btn vr-guide-preview-enter",m.textContent="进入",m.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation();const E=this.selectedSceneId||this.currentSceneId;E&&E!==this.currentSceneId?(jt(this.museumId,E),this.close()):E===this.currentSceneId&&this.close()}),u.appendChild(f),u.appendChild(v),u.appendChild(g),u.appendChild(m),d.appendChild(h),d.appendChild(u),t.addEventListener("click",()=>this.close()),n.addEventListener("click",p=>p.stopPropagation()),n.appendChild(i),n.appendChild(l),n.appendChild(d),this.element.appendChild(t),this.element.appendChild(n),this.bindSearch(),this.renderList(),this.updatePreview()}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"),this.selectedSceneId||(this.selectedSceneId=this.currentSceneId),this.updateActiveState(),this.updatePreview())}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"),(e=this.onClose)==null||e.call(this))}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}setCurrentScene(e){this.currentSceneId=e,this.updateActiveState(),this.updatePreview()}bindSearch(){this.searchInputEl&&this.searchInputEl.addEventListener("input",()=>{var t;const e=(((t=this.searchInputEl)==null?void 0:t.value)||"").trim().toLowerCase();e?this.filteredScenes=this.scenes.filter(n=>(n.name||"").toLowerCase().includes(e)||n.id.toLowerCase().includes(e)):this.filteredScenes=this.scenes,this.renderList(),this.updatePreview()})}renderList(){if(this.listEl){this.listEl.innerHTML="";for(const e of this.filteredScenes){const t=document.createElement("div");t.className="vr-guide-item",t.setAttribute("data-scene-id",e.id),e.id===this.currentSceneId&&t.classList.add("active");const n=document.createElement("img");n.className="vr-guide-thumb",n.loading="lazy",n.src=e.thumb||mc,n.alt=e.name||e.id;const i=document.createElement("div");i.className="vr-guide-meta";const r=document.createElement("div");r.className="vr-guide-name",r.textContent=e.name||e.id;const a=document.createElement("div");a.className="vr-guide-id",a.textContent=e.id,i.appendChild(r),i.appendChild(a),t.appendChild(n),t.appendChild(i),t.addEventListener("mouseenter",()=>{this.hoveredSceneId=e.id,this.updatePreview()}),t.addEventListener("mouseleave",()=>{this.hoveredSceneId=null,this.updatePreview()}),t.addEventListener("click",o=>{var l;o.preventDefault(),o.stopPropagation(),this.selectedSceneId=e.id,(l=this.listEl)==null||l.querySelectorAll(".vr-guide-item").forEach(c=>{c.classList.remove("selected")}),t.classList.add("selected"),this.updatePreview()}),this.listEl.appendChild(t)}}}updateActiveState(){this.listEl&&this.listEl.querySelectorAll(".vr-guide-item").forEach(e=>{const n=e.getAttribute("data-scene-id")===this.currentSceneId;e.classList.toggle("active",n),n&&!this.selectedSceneId&&(this.selectedSceneId=this.currentSceneId,e.classList.add("selected"))})}updatePreview(){if(!this.previewImgEl||!this.previewTitleEl||!this.previewIdEl)return;const e=this.selectedSceneId||this.hoveredSceneId||this.currentSceneId,t=this.scenes.find(n=>n.id===e)||this.scenes[0];t&&(this.previewImgEl.src=t.thumb||mc,this.previewImgEl.alt=t.name||t.id,this.previewTitleEl.textContent=t.name||t.id,this.previewIdEl.textContent=t.id)}}class h0{constructor(e){_(this,"element");_(this,"scrollEl");_(this,"museumId");_(this,"currentSceneId");_(this,"scenes");_(this,"onSceneClick");_(this,"onMoreClick");_(this,"onClose");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.onSceneClick=e.onSceneClick,this.onMoreClick=e.onMoreClick,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-guidetray";const t=document.createElement("div");t.className="vr-guidetray-header";const n=document.createElement("button");n.className="vr-btn vr-guidetray-more",n.textContent="更多",n.addEventListener("click",r=>{var a;r.preventDefault(),r.stopPropagation(),(a=this.onMoreClick)==null||a.call(this)});const i=document.createElement("button");i.className="vr-btn vr-guidetray-close",i.textContent="×",i.setAttribute("aria-label","关闭"),i.addEventListener("click",r=>{var a;r.preventDefault(),r.stopPropagation(),(a=this.onClose)==null||a.call(this)}),t.appendChild(n),t.appendChild(i),this.scrollEl=document.createElement("div"),this.scrollEl.className="vr-guidetray-scroll",this.element.appendChild(t),this.element.appendChild(this.scrollEl),this.render()}render(){this.scrollEl.innerHTML="",this.scenes.forEach(t=>{const n=document.createElement("div");n.className="vr-guidetray-item",n.setAttribute("data-scene-id",t.id),t.id===this.currentSceneId&&n.classList.add("is-current");const i=document.createElement("img");i.className="vr-guidetray-item-thumb";const r=t.thumb?bn(t.thumb,rn.THUMB):void 0;r&&(i.src=r),i.alt=t.name;const a=document.createElement("div");a.className="vr-guidetray-item-title",a.textContent=t.name,n.appendChild(i),n.appendChild(a),n.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),this.onSceneClick&&this.onSceneClick(t.id)}),this.scrollEl.appendChild(n)});const e=document.createElement("div");e.className="vr-guidetray-item vr-guidetray-item-more",e.innerHTML=`
      <div class="vr-guidetray-item-thumb vr-guidetray-more-icon">+</div>
      <div class="vr-guidetray-item-title">更多</div>
    `,e.addEventListener("click",t=>{var n;t.preventDefault(),t.stopPropagation(),(n=this.onMoreClick)==null||n.call(this)}),this.scrollEl.appendChild(e)}updateCurrentScene(e){this.currentSceneId=e,this.scrollEl.querySelectorAll(".vr-guidetray-item").forEach(t=>{const n=t;n.getAttribute("data-scene-id")===e?n.classList.add("is-current"):n.classList.remove("is-current")})}setVisible(e){this.element.classList.toggle("visible",e)}getElement(){return this.element}remove(){this.element.remove()}}class u0{constructor(e={}){_(this,"element");_(this,"currentMode");_(this,"onModeChange");this.currentMode=e.initialMode||"tour",this.onModeChange=e.onModeChange,this.element=document.createElement("div"),this.element.className="vr-topmodes",[{key:"tour",label:"漫游"},{key:"structure2d",label:"结构图"},{key:"structure3d",label:"三维模型"}].forEach(n=>{const i=document.createElement("button");i.className="vr-topmodes__btn",i.textContent=n.label,i.setAttribute("data-mode",n.key),n.key===this.currentMode&&i.classList.add("is-active"),i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.setMode(n.key)}),this.element.appendChild(i)}),this.syncActiveState()}syncActiveState(){this.element.querySelectorAll(".vr-topmodes__btn").forEach(e=>{const t=e.getAttribute("data-mode");e.classList.toggle("is-active",t===this.currentMode)})}setMode(e){this.currentMode!==e&&(this.currentMode=e,this.syncActiveState(),this.onModeChange&&this.onModeChange(e))}getMode(){return this.currentMode}getElement(){return this.element}}const p0={iterations:300,width:1e3,height:1e3,padding:40,repulsion:.15,spring:.12,damping:.88};function bd(s,e,t){const n={...p0,...t},i=s.length;if(i===0)return{};const r={},a=Math.max(1,Math.sqrt(i)*.5);s.forEach((c,d)=>{const h=2*Math.PI*d/i,u=(Math.random()-.5)*.2;r[c.id]={x:a*Math.cos(h)+u,y:a*Math.sin(h)+u,vx:0,vy:0}});const o=e.length>0?e:s.length>1?s.slice(0,-1).map((c,d)=>({from:c.id,to:s[d+1].id})):[];for(let c=0;c<n.iterations;c++){for(let d=0;d<i;d++){const h=s[d],u=r[h.id];for(let f=d+1;f<i;f++){const v=s[f],g=r[v.id];let m=u.x-g.x,p=u.y-g.y;const E=m*m+p*p||1e-4,x=n.repulsion/E;m*=x,p*=x,u.vx+=m,u.vy+=p,g.vx-=m,g.vy-=p}}for(const d of o){const h=r[d.from],u=r[d.to];if(!h||!u)continue;const f=u.x-h.x,v=u.y-h.y,g=Math.sqrt(f*f+v*v)||1e-4,p=n.spring*(g-1),E=f/g*p,x=v/g*p;h.vx+=E,h.vy+=x,u.vx-=E,u.vy-=x}for(const d in r){const h=r[d];h.vx*=n.damping,h.vy*=n.damping,h.x+=h.vx*.1,h.y+=h.vy*.1}}const l={};for(const c in r)l[c]={x:r[c].x,y:r[c].y};return f0(l,n.width,n.height,n.padding)}function f0(s,e,t,n){const i=Object.entries(s);if(i.length===0)return{};let r=1/0,a=-1/0,o=1/0,l=-1/0;for(const[,p]of i)r=Math.min(r,p.x),a=Math.max(a,p.x),o=Math.min(o,p.y),l=Math.max(l,p.y);const c=a-r||1,d=l-o||1,h=e-2*n,u=t-2*n,f=h/c,v=u/d,g=Math.min(f,v),m={};for(const[p,E]of i)m[p]={x:n+(E.x-r)*g+(h-c*g)/2,y:n+(E.y-o)*g+(u-d*g)/2};return m}function Ed(s){const e=s.filter(h=>h.mapPoint);if(e.length<s.length)return!0;if(e.length<2)return!1;const t=e.map(h=>h.mapPoint.x),n=e.map(h=>h.mapPoint.y),i=Math.min(...t),r=Math.max(...t),a=Math.min(...n),o=Math.max(...n),l=r-i,c=o-a,d=100;return l<d||c<d}class m0{constructor(e){_(this,"element");_(this,"canvasContainer");_(this,"svg");_(this,"floorplanImg",null);_(this,"statusEl",null);_(this,"toggleBtn",null);_(this,"museum");_(this,"graph");_(this,"currentSceneId");_(this,"onClose");_(this,"onNodeClick");_(this,"layout",{});_(this,"mode","graph");_(this,"hasFloorplan",!1);var t;this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.onNodeClick=e.onNodeClick,this.hasFloorplan=!!((t=this.museum.map)!=null&&t.image),this.mode=this.hasFloorplan?"floorplan":"graph",this.element=document.createElement("div"),this.element.className="vr-structure2d-overlay",this.render(),this.bindEvents()}render(){var r;const e=document.createElement("div");e.className="vr-structure2d-header";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";const n=document.createElement("div");n.className="vr-structure2d-title",n.textContent="结构图",this.statusEl=document.createElement("div"),this.statusEl.className="vr-structure2d-status",this.updateStatusText(),t.appendChild(n),t.appendChild(this.statusEl),this.hasFloorplan&&(this.toggleBtn=document.createElement("button"),this.toggleBtn.className="vr-btn vr-structure2d-toggle",this.toggleBtn.textContent=this.mode==="floorplan"?"结构图":"平面图",this.toggleBtn.addEventListener("click",()=>{this.mode=this.mode==="floorplan"?"graph":"floorplan",this.toggleBtn.textContent=this.mode==="floorplan"?"结构图":"平面图",this.updateStatusText(),this.renderContent()}),e.appendChild(this.toggleBtn));const i=document.createElement("button");if(i.className="vr-btn vr-structure2d-close",i.innerHTML="✕",i.setAttribute("aria-label","关闭"),i.addEventListener("click",()=>{this.close()}),e.appendChild(t),e.appendChild(i),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="vr-structure2d-canvas",this.svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svg.setAttribute("width","100%"),this.svg.setAttribute("height","100%"),this.svg.setAttribute("class","vr-structure2d-svg"),this.canvasContainer.appendChild(this.svg),this.hasFloorplan&&((r=this.museum.map)!=null&&r.image)){const a=bn(this.museum.map.image,rn.MAP);a&&(this.floorplanImg=document.createElement("img"),this.floorplanImg.className="vr-structure2d-floorplan",this.floorplanImg.src=a,this.floorplanImg.style.display="none",this.canvasContainer.appendChild(this.floorplanImg),this.floorplanImg.onload=()=>{this.mode==="floorplan"&&this.renderContent()})}this.element.appendChild(e),this.element.appendChild(this.canvasContainer),this.computeLayout(),this.renderContent()}updateStatusText(){if(!this.statusEl)return;const e=this.graph.nodes.length;this.statusEl.textContent=`mode: ${this.mode}, nodes: ${e}`}renderContent(){this.mode==="floorplan"?this.renderFloorplan():this.renderGraph()}computeLayout(){var i,r;const e=((i=this.museum.map)==null?void 0:i.width)||1e3,t=((r=this.museum.map)==null?void 0:r.height)||600;if(Ed(this.graph.nodes))this.layout=bd(this.graph.nodes,this.graph.edges,{width:e,height:t,iterations:300,padding:40});else{this.layout={};for(const a of this.graph.nodes)a.mapPoint&&(this.layout[a.id]={x:a.mapPoint.x,y:a.mapPoint.y})}}renderFloorplan(){var i,r;this.svg&&(this.svg.style.display="none"),this.floorplanImg&&(this.floorplanImg.style.display="block"),this.svg.innerHTML="",this.svg.style.display="block",this.svg.style.position="absolute",this.svg.style.top="0",this.svg.style.left="0",this.svg.style.pointerEvents="none";const e=((i=this.museum.map)==null?void 0:i.width)||1e3,t=((r=this.museum.map)==null?void 0:r.height)||600;this.svg.setAttribute("viewBox",`0 0 ${e} ${t}`),this.svg.style.pointerEvents="auto";const n=document.createElementNS("http://www.w3.org/2000/svg","g");n.setAttribute("class","vr-structure2d-nodes");for(const a of this.graph.nodes){const o=this.layout[a.id];if(!o)continue;const l=a.id===this.currentSceneId,c=document.createElementNS("http://www.w3.org/2000/svg","g");c.setAttribute("class",`vr-structure2d-node ${l?"is-current":""}`),c.setAttribute("data-scene-id",a.id),c.style.cursor="pointer";const d=document.createElementNS("http://www.w3.org/2000/svg","circle");d.setAttribute("cx",o.x.toString()),d.setAttribute("cy",o.y.toString()),d.setAttribute("r",l?"12":"8"),d.setAttribute("class","vr-structure2d-node-circle");const h=document.createElementNS("http://www.w3.org/2000/svg","text");h.setAttribute("x",o.x.toString()),h.setAttribute("y",(o.y+(l?25:20)).toString()),h.setAttribute("class","vr-structure2d-node-label"),h.setAttribute("text-anchor","middle"),h.textContent=a.name,c.appendChild(d),c.appendChild(h),n.appendChild(c),c.addEventListener("click",()=>{this.onNodeClick&&this.onNodeClick(this.museum.id,a.id)})}this.svg.appendChild(n)}renderGraph(){var r,a;this.floorplanImg&&(this.floorplanImg.style.display="none"),this.svg&&(this.svg.style.display="block",this.svg.style.position="",this.svg.style.pointerEvents="auto"),this.svg.innerHTML="";const e=((r=this.museum.map)==null?void 0:r.width)||1e3,t=((a=this.museum.map)==null?void 0:a.height)||600;this.svg.setAttribute("viewBox",`0 0 ${e} ${t}`);const n=document.createElementNS("http://www.w3.org/2000/svg","g");n.setAttribute("class","vr-structure2d-edges");for(const o of this.graph.edges){const l=this.layout[o.from],c=this.layout[o.to];if(!l||!c)continue;const d=document.createElementNS("http://www.w3.org/2000/svg","line");d.setAttribute("x1",l.x.toString()),d.setAttribute("y1",l.y.toString()),d.setAttribute("x2",c.x.toString()),d.setAttribute("y2",c.y.toString()),d.setAttribute("class","vr-structure2d-edge"),n.appendChild(d)}this.svg.appendChild(n);const i=document.createElementNS("http://www.w3.org/2000/svg","g");i.setAttribute("class","vr-structure2d-nodes");for(const o of this.graph.nodes){const l=this.layout[o.id];if(!l)continue;const c=o.id===this.currentSceneId,d=document.createElementNS("http://www.w3.org/2000/svg","g");d.setAttribute("class",`vr-structure2d-node ${c?"is-current":""}`),d.setAttribute("data-scene-id",o.id),d.style.cursor="pointer";const h=document.createElementNS("http://www.w3.org/2000/svg","circle");h.setAttribute("cx",l.x.toString()),h.setAttribute("cy",l.y.toString()),h.setAttribute("r",c?"12":"8"),h.setAttribute("class","vr-structure2d-node-circle");const u=document.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("x",l.x.toString()),u.setAttribute("y",(l.y+(c?25:20)).toString()),u.setAttribute("class","vr-structure2d-node-label"),u.setAttribute("text-anchor","middle"),u.textContent=o.name,d.appendChild(h),d.appendChild(u),i.appendChild(d),d.addEventListener("click",()=>{this.onNodeClick&&this.onNodeClick(this.museum.id,o.id)})}this.svg.appendChild(i)}bindEvents(){const e=t=>{t.key==="Escape"&&this.close()};document.addEventListener("keydown",e),this.element.addEventListener("vr:cleanup",()=>{document.removeEventListener("keydown",e)})}updateContext(e){var t;this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.hasFloorplan=!!((t=this.museum.map)!=null&&t.image),this.computeLayout(),this.updateStatusText(),this.renderContent()}open(){this.element.classList.add("is-visible")}close(){this.element.classList.remove("is-visible"),this.onClose&&this.onClose()}getElement(){return this.element}remove(){this.element.remove()}}function gc(s,e){var r;const t=s.scenes.map(a=>({id:a.id,name:a.name,scene:a,mapPoint:a.mapPoint,initialView:a.initialView})),n=new Set(t.map(a=>a.id)),i=[];for(const a of s.scenes)for(const o of a.hotspots){if(o.type!=="scene"||!((r=o.target)!=null&&r.sceneId))continue;const l=o.target.museumId??s.id,c=o.target.sceneId;l!==s.id||!n.has(c)||i.some(h=>h.from===a.id&&h.to===c)||i.push({from:a.id,to:c})}return{nodes:t,edges:i,currentNodeId:e&&n.has(e)?e:void 0}}function g0(s,e){let t=0;for(const n of s.edges)(n.from===e||n.to===e)&&t++;return t}class v0{constructor(e){_(this,"element");_(this,"container");_(this,"scene",null);_(this,"camera",null);_(this,"renderer",null);_(this,"controls");_(this,"museum");_(this,"graph");_(this,"currentSceneId");_(this,"onClose");_(this,"onNodeClick");_(this,"animationId",null);_(this,"sceneNodes",new Map);_(this,"edgeLines",[]);_(this,"hoveredSceneId",null);_(this,"resizeObserver",null);_(this,"statusEl",null);_(this,"webglErrorEl",null);_(this,"modelErrorEl",null);_(this,"modelGroup",null);_(this,"modelLoaded",!1);_(this,"animate",()=>{if(!this.renderer||!this.scene||!this.camera)return;this.animationId=requestAnimationFrame(this.animate),this.controls&&this.controls.update();const e=Date.now()*.001;this.sceneNodes.forEach(t=>{if(t.userData.isCurrent){const n=Math.sin(e*2)*.1+1;t.scale.set(n*1.2,n*1.2,n*1.2);const i=t.material;i.opacity=.7+Math.sin(e*2)*.2}}),this.renderer.render(this.scene,this.camera)});this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.onNodeClick=e.onNodeClick,this.element=document.createElement("div"),this.element.className="vr-structure3d-overlay",this.container=document.createElement("div"),this.container.className="vr-structure3d-canvas",this.render(),this.init3D().then(()=>{this.bindEvents()})}render(){const e=document.createElement("div");e.className="vr-structure3d-header";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";const n=document.createElement("div");n.className="vr-structure3d-title",n.textContent="三维模型",this.statusEl=document.createElement("div"),this.statusEl.className="vr-structure3d-status",this.updateStatusText(),t.appendChild(n),t.appendChild(this.statusEl);const i=document.createElement("button");i.className="vr-btn vr-structure3d-close",i.innerHTML="✕",i.setAttribute("aria-label","关闭"),i.addEventListener("click",()=>{this.close()}),e.appendChild(t),e.appendChild(i),this.webglErrorEl=document.createElement("div"),this.webglErrorEl.className="vr-structure3d-webgl-error",this.webglErrorEl.style.display="none",this.webglErrorEl.innerHTML=`
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">WebGL 不可用</div>
        <div style="font-size: 13px; opacity: 0.8;">请尝试更换浏览器或设备</div>
      </div>
    `,this.modelErrorEl=document.createElement("div"),this.modelErrorEl.className="vr-structure3d-model-error",this.modelErrorEl.style.display="none",this.modelErrorEl.innerHTML=`
      <div style="text-align: center; padding: 40px 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: rgba(255,200,100,0.95);">模型加载失败</div>
        <div style="font-size: 13px; opacity: 0.8;">请检查 URL 或网络连接</div>
      </div>
    `,this.element.appendChild(e),this.element.appendChild(this.container),this.element.appendChild(this.webglErrorEl),this.element.appendChild(this.modelErrorEl)}updateStatusText(){var a,o,l;if(!this.statusEl)return;const e=this.graph.nodes.length,t=this.graph.edges.length,n=((a=this.container)==null?void 0:a.clientWidth)||0,i=((o=this.container)==null?void 0:o.clientHeight)||0,r=this.modelLoaded?"loaded":(l=this.museum.dollhouse)!=null&&l.modelUrl?"loading":"none";e===0?(this.statusEl.textContent=`model: ${r}, No nodes (check museum.scenes)`,this.statusEl.style.color="rgba(255,200,100,0.9)"):(this.statusEl.textContent=`model: ${r}, nodes: ${e}, edges: ${t}, size: ${n}x${i}`,this.statusEl.style.color="rgba(255,255,255,0.65)")}async init3D(){var e;try{this.scene=new Fa,this.scene.background=null;const t=this.container.clientWidth>0?this.container.clientWidth/this.container.clientHeight:window.innerWidth/window.innerHeight;this.camera=new wt(60,t,.1,1e3),this.camera.position.set(0,12,18),this.camera.lookAt(0,0,0);try{this.renderer=new gr({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement)}catch{this.webglErrorEl&&(this.webglErrorEl.style.display="block");return}try{const{OrbitControls:r}=await Zs(async()=>{const{OrbitControls:a}=await import("./OrbitControls-VUEjplfA.js");return{OrbitControls:a}},[],import.meta.url);this.controls=new r(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=3,this.controls.maxDistance=50,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.minPolarAngle=Math.PI/6,this.controls.target.set(0,0,0)}catch{}const n=new rd(16777215,.6);this.scene.add(n);const i=new sd(16777215,.4);i.position.set(5,10,5),this.scene.add(i),this.modelGroup=new Ei,this.scene.add(this.modelGroup),(e=this.museum.dollhouse)!=null&&e.modelUrl?this.loadModel():this.generateGraph(),this.setupResizeObserver(),this.updateStatusText()}catch{this.webglErrorEl&&(this.webglErrorEl.style.display="block")}}async loadModel(){var t;if(!((t=this.museum.dollhouse)!=null&&t.modelUrl)||!this.scene||!this.modelGroup)return;const e=bn(this.museum.dollhouse.modelUrl,rn.DOLLHOUSE);if(e)try{const{GLTFLoader:n}=await Zs(async()=>{const{GLTFLoader:c}=await import("./GLTFLoader-CrYWPZGn.js");return{GLTFLoader:c}},[],import.meta.url),r=await new n().loadAsync(e);for(;this.modelGroup.children.length>0;){const c=this.modelGroup.children[0];this.modelGroup.remove(c),(c instanceof pt||c instanceof Ei)&&c.traverse(d=>{var h,u;d instanceof pt&&((h=d.geometry)==null||h.dispose(),Array.isArray(d.material)?d.material.forEach(f=>f.dispose()):(u=d.material)==null||u.dispose())})}const a=r.scene,o=this.museum.dollhouse.scale??1,l=this.museum.dollhouse.offset??{x:0,y:0,z:0};a.scale.set(o,o,o),a.position.set(l.x,l.y,l.z),this.modelGroup.add(a),this.modelLoaded=!0,this.generateGraph(),this.fitModelToView(),this.updateStatusText(),this.modelErrorEl&&(this.modelErrorEl.style.display="none")}catch{this.modelLoaded=!1,this.updateStatusText(),this.modelErrorEl&&(this.modelErrorEl.style.display="block"),this.generateGraph()}}fitModelToView(){if(!this.modelGroup||!this.scene||!this.camera||!this.controls)return;const e=new sn().setFromObject(this.modelGroup),t=e.getCenter(new L),n=e.getSize(new L),i=Math.max(n.x,n.y,n.z),r=i*2;this.camera.position.set(t.x,t.y+n.y*.5,t.z+r),this.camera.lookAt(t),this.camera.updateProjectionMatrix(),this.controls.target.copy(t),this.controls.update(),this.controls.minDistance=i*.5,this.controls.maxDistance=i*5}setupResizeObserver(){if(!this.container||typeof ResizeObserver>"u"){window.addEventListener("resize",()=>this.handleResize());return}this.resizeObserver=new ResizeObserver(()=>{this.handleResize()}),this.resizeObserver.observe(this.container)}handleResize(){if(!this.renderer||!this.camera||!this.container)return;const e=this.container.clientWidth,t=this.container.clientHeight;e===0||t===0||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.updateStatusText())}generateGraph(){var l,c;if(!this.scene)return;this.sceneNodes.forEach(d=>{this.scene.remove(d),d.geometry.dispose(),Array.isArray(d.material)?d.material.forEach(h=>h.dispose()):d.material.dispose()}),this.sceneNodes.clear(),this.edgeLines.forEach(d=>{this.scene.remove(d),d.geometry.dispose(),Array.isArray(d.material)?d.material.forEach(h=>h.dispose()):d.material.dispose()}),this.edgeLines=[];const e=this.modelLoaded&&this.modelGroup&&this.modelGroup.children.length>0,t=Ed(this.graph.nodes),n=((l=this.museum.map)==null?void 0:l.width)||1e3,i=((c=this.museum.map)==null?void 0:c.height)||600;let r={};if(t)r=bd(this.graph.nodes,this.graph.edges,{width:n,height:i,iterations:300,padding:40});else for(const d of this.graph.nodes)d.mapPoint&&(r[d.id]={x:d.mapPoint.x,y:d.mapPoint.y});const o=(d=>{const h=Object.entries(d);if(h.length===0)return{};let u=1/0,f=-1/0,v=1/0,g=-1/0;for(const[,C]of h)u=Math.min(u,C.x),f=Math.max(f,C.x),v=Math.min(v,C.y),g=Math.max(g,C.y);const m=f-u||1,p=g-v||1,E=20/m,x=20/p,T=(u+f)/2,R=(v+g)/2,A={};for(const[C,z]of h){const S=g0(this.graph,C),w=(Math.random()-.5)*.5;A[C]={x:(z.x-T)*E,y:S*1.5+w,z:(z.y-R)*x}}return A})(r);if(!e)for(const d of this.graph.edges){const h=o[d.from],u=o[d.to];if(!h||!u)continue;const f=new Nt().setFromPoints([new L(h.x,h.y,h.z),new L(u.x,u.y,u.z)]),v=new ka({color:16777215,opacity:.3,transparent:!0}),g=new Ba(f,v);this.scene.add(g),this.edgeLines.push(g)}for(const d of this.graph.nodes){const h=o[d.id];if(!h)continue;const u=d.id===this.currentSceneId,f=new vr(u?.8:.6,16,16),v=new za({color:u?4886754:8947848,opacity:u?.9:.7,transparent:!0,metalness:.1,roughness:.7}),g=new pt(f,v);if(e&&this.modelGroup){const m=new sn().setFromObject(this.modelGroup),p=m.getCenter(new L),E=m.getSize(new L);g.position.set(p.x+h.x*.1,p.y+E.y*.5+h.y*.1+1,p.z+h.z*.1)}else g.position.set(h.x,h.y,h.z);g.userData={sceneId:d.id,sceneName:d.name},u&&(g.userData.isCurrent=!0,g.scale.set(1.2,1.2,1.2)),this.scene.add(g),this.sceneNodes.set(d.id,g)}}handleClick(e){if(!this.renderer||!this.camera||this.sceneNodes.size===0)return;const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new rs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(a.length>0){const l=a[0].object.userData.sceneId;l&&this.onNodeClick&&this.onNodeClick(this.museum.id,l)}}handleMouseMove(e){if(!this.renderer||!this.camera||this.sceneNodes.size===0)return;const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,i=-((e.clientY-t.top)/t.height)*2+1,r=new rs;r.setFromCamera(new Se(n,i),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(this.sceneNodes.forEach(o=>{const l=o.material;o.userData.isCurrent||(l.opacity=.7)}),a.length>0){const o=a[0].object,l=o.material,c=o.userData.sceneId;o.userData.isCurrent||(l.opacity=.9),this.hoveredSceneId=c,this.renderer.domElement.style.cursor="pointer"}else this.hoveredSceneId=null,this.renderer.domElement.style.cursor="default"}bindEvents(){if(!this.renderer)return;const e=this.renderer.domElement;e.addEventListener("click",n=>this.handleClick(n)),e.addEventListener("mousemove",n=>this.handleMouseMove(n));const t=n=>{n.key==="Escape"&&this.close()};document.addEventListener("keydown",t),this.element.addEventListener("vr:cleanup",()=>{document.removeEventListener("keydown",t)})}updateContext(e){var t,n;if(this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.scene){const i=(t=e.museum.dollhouse)==null?void 0:t.modelUrl,r=(n=this.museum.dollhouse)==null?void 0:n.modelUrl;if(i!==r){if(this.modelGroup)for(;this.modelGroup.children.length>0;){const a=this.modelGroup.children[0];this.modelGroup.remove(a)}this.modelLoaded=!1,i?this.loadModel():this.generateGraph()}else this.generateGraph();this.updateStatusText()}}open(){this.element.classList.add("is-visible"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.handleResize(),!this.animationId&&this.renderer&&this.scene&&this.camera&&this.animate()})})}close(){this.element.classList.remove("is-visible"),this.onClose&&this.onClose()}getElement(){return this.element}remove(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.scene&&(this.sceneNodes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.sceneNodes.clear(),this.edgeLines.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.edgeLines=[],this.modelGroup&&(this.modelGroup.traverse(e=>{var t,n;e instanceof pt&&((t=e.geometry)==null||t.dispose(),Array.isArray(e.material)?e.material.forEach(i=>i.dispose()):(n=e.material)==null||n.dispose())}),this.scene.remove(this.modelGroup),this.modelGroup=null)),this.renderer&&(this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.renderer=null),this.controls&&(this.controls.dispose(),this.controls=null),window.removeEventListener("resize",()=>this.handleResize()),this.scene=null,this.camera=null,this.element.remove()}}function _0(s,e,t){const n=s.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=document.createElement("div");a.className="vr-pick-marker",a.style.position="absolute",a.style.left="0",a.style.top="0",a.style.transform=`translate3d(${i}px, ${r}px, 0)`,a.style.pointerEvents="none",a.style.zIndex="1000",s.style.position="relative",s.appendChild(a),window.requestAnimationFrame(()=>{a.classList.add("show")}),window.setTimeout(()=>{a.classList.remove("show"),window.setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},200)},1500)}const x0=150,y0=150,b0=400;function E0(){return{fadeMs:x0,restoreMs:y0,restoreDelayMs:b0}}function S0(){it.on("user-interacting",()=>{}),it.on("user-idle",()=>{}),it.on("ui-engaged",()=>{})}let $t=null;function M0(){const s=E0();it.on("user-interacting",()=>{$t!==null&&(clearTimeout($t),$t=null),document.documentElement.classList.add("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")}),it.on("user-idle",()=>{$t!==null&&(clearTimeout($t),$t=null),document.documentElement.classList.remove("vr-ui-interacting"),$t=window.setTimeout(()=>{document.documentElement.classList.remove("vr-ui-restoring"),$t=null},s.restoreDelayMs)}),it.on("ui-engaged",()=>{$t!==null&&(clearTimeout($t),$t=null),document.documentElement.classList.remove("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")})}function w0(){const s={};try{const e=new URLSearchParams(window.location.search),t=e.get("museum"),n=e.get("scene");t&&(s.museumId=t),n&&(s.currentSceneId=n)}catch{}try{const e=document.querySelector(".vr-groundnav");if(e){s.groundNavDots={};const t=e.querySelector(".vr-groundnav__dot.is-aimed");t&&(s.groundNavDots.aimedSceneId=t.getAttribute("data-scene-id")||void 0);const n=e.querySelector(".vr-groundnav__dot.is-autonav");if(n){s.groundNavDots.isAutoNavActive=!0,s.groundNavDots.autoNavTargetSceneId=n.getAttribute("data-scene-id")||void 0;const i=n.querySelector(".vr-groundnav__progress");s.groundNavDots.hasProgressElement=!!i}}}catch{}try{const e=document.querySelector(".vr-previewcard");if(e){s.scenePreviewCard={},s.scenePreviewCard.isVisible=e.classList.contains("is-visible");const t=e.querySelector(".vr-previewcard__hint");t&&(s.scenePreviewCard.hintVisible=t.classList.contains("is-visible"),s.scenePreviewCard.hintEmphasizing=t.classList.contains("is-emphasizing"))}}catch{}try{const e=document.querySelector(".vr-scenestrip");e&&(s.sceneStrip={},s.sceneStrip.userScrolling=e.classList.contains("is-user-scrolling"))}catch{}try{const e=document.documentElement,t=Array.from(e.classList).filter(n=>n==="vr-ui-interacting"||n==="vr-ui-restoring");t.length>0&&(s.yieldClassManager={classes:t})}catch{}return s}function T0(s){try{window.dispatchEvent(new CustomEvent("vr:close-panels"))}catch{}try{s?(s.emitInteracting(),setTimeout(()=>{try{document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}},100)):document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}}class A0{constructor(e){_(this,"element");_(this,"overlay");_(this,"getCurrentYaw");_(this,"sceneId");_(this,"onClose");_(this,"currentYawEl",null);_(this,"resultEl",null);_(this,"updateTimer",null);_(this,"northYawValue",null);this.getCurrentYaw=e.getCurrentYaw,this.sceneId=e.sceneId,this.onClose=e.onClose,this.overlay=document.createElement("div"),this.overlay.className="vr-north-calibration-overlay",this.overlay.style.cssText=`
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
    `;const n=this.element.querySelector(".vr-close-btn");n&&(n.addEventListener("click",()=>this.close()),n.addEventListener("mouseenter",function(){this.style.background="rgba(255, 255, 255, 0.1)",this.style.color="rgba(255, 255, 255, 0.9)"}),n.addEventListener("mouseleave",function(){this.style.background="none",this.style.color="rgba(255, 255, 255, 0.6)"}));const i=this.element.querySelector(".vr-set-north-btn");i&&(i.addEventListener("click",()=>this.handleSetNorth()),i.addEventListener("mouseenter",function(){this.style.background="rgba(33, 150, 243, 0.4)"}),i.addEventListener("mouseleave",function(){this.style.background="rgba(33, 150, 243, 0.3)"}),i.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),i.addEventListener("mouseup",function(){this.style.transform="scale(1)"}));const r=this.element.querySelector(".vr-copy-btn");r&&(r.addEventListener("click",()=>this.handleCopy()),r.addEventListener("mouseenter",function(){this.style.background="rgba(76, 175, 80, 0.4)"}),r.addEventListener("mouseleave",function(){this.style.background="rgba(76, 175, 80, 0.3)"}),r.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),r.addEventListener("mouseup",function(){this.style.transform="scale(1)"})),this.currentYawEl=this.element.querySelector(".vr-current-yaw"),this.resultEl=this.element.querySelector(".vr-calibration-result")}startYawUpdate(){const e=()=>{if(this.currentYawEl&&!this.northYawValue){const t=this.getCurrentYaw();this.currentYawEl.textContent=`${t.toFixed(1)}°`}this.updateTimer=window.setTimeout(e,100)};e()}stopYawUpdate(){this.updateTimer!==null&&(clearTimeout(this.updateTimer),this.updateTimer=null)}handleSetNorth(){const e=this.getCurrentYaw();this.northYawValue=e,this.resultEl&&(this.resultEl.style.display="block");const t=this.element.querySelector(".vr-copy-target");if(t){const n=`"northYaw": ${e.toFixed(1)}`;t.textContent=n,t.setAttribute("data-copy-text",n)}this.stopYawUpdate(),this.currentYawEl&&(this.currentYawEl.textContent=`${e.toFixed(1)}°`),tt(`已记录北向值: ${e.toFixed(1)}°`)}async handleCopy(){const e=this.element.querySelector(".vr-copy-target");if(!e)return;const t=e.getAttribute("data-copy-text")||e.textContent||"";if(await Ca(t)){tt("已复制到剪贴板");const i=this.element.querySelector(".vr-copy-btn");if(i){const r=i.textContent;i.textContent="✓ 已复制",setTimeout(()=>{i.textContent=r},2e3)}}else tt("复制失败，请手动选择文本")}close(){this.stopYawUpdate(),this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.onClose&&this.onClose()}getElement(){return this.overlay}}class C0{constructor(e,t){_(this,"client");_(this,"context");_(this,"root");_(this,"header");_(this,"body");_(this,"list");_(this,"input");_(this,"sendBtn");_(this,"clearBtn");_(this,"closeBtn");_(this,"statusLine");_(this,"dragging",!1);_(this,"dragOffsetX",0);_(this,"dragOffsetY",0);_(this,"isMobile",!1);_(this,"swipeStartY",0);_(this,"swipeActive",!1);_(this,"messages",[]);_(this,"typingTimer",null);_(this,"typingAbortToken",0);this.client=e,this.context=t,this.mount(),this.injectStyles(),this.detectMobile(),this.ensureWelcome()}destroy(){var e,t;this.stopTyping(!0),(e=this.root)==null||e.remove(),(t=document.getElementById("fcchat-toggle-btn"))==null||t.remove()}detectMobile(){var n,i;const e=((n=window.matchMedia)==null?void 0:n.call(window,"(max-width: 768px)").matches)??!1,t=((i=window.matchMedia)==null?void 0:i.call(window,"(pointer: coarse)").matches)??!1;this.isMobile=e||t,this.root.dataset.mobile=this.isMobile?"1":"0"}mount(){this.root=document.createElement("div"),this.root.className="fcchat-root",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-label","三馆学伴"),this.header=document.createElement("div"),this.header.className="fcchat-header";const e=document.createElement("div");e.className="fcchat-title",e.textContent="三馆学伴";const t=document.createElement("div");t.className="fcchat-header-right",this.clearBtn=document.createElement("button"),this.clearBtn.className="fcchat-btn fcchat-btn-ghost",this.clearBtn.type="button",this.clearBtn.textContent="清空",this.clearBtn.addEventListener("click",()=>this.clear()),this.closeBtn=document.createElement("button"),this.closeBtn.className="fcchat-btn fcchat-btn-ghost fcchat-close",this.closeBtn.type="button",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.textContent="×",this.closeBtn.addEventListener("click",()=>this.hide()),t.appendChild(this.clearBtn),t.appendChild(this.closeBtn);const n=document.createElement("div");n.className="fcchat-header-row",n.appendChild(e),n.appendChild(t),this.header.appendChild(n),this.body=document.createElement("div"),this.body.className="fcchat-body",this.list=document.createElement("div"),this.list.className="fcchat-list",this.body.appendChild(this.list),this.statusLine=document.createElement("div"),this.statusLine.className="fcchat-status",this.statusLine.textContent="",this.body.appendChild(this.statusLine);const i=document.createElement("div");i.className="fcchat-inputbar",this.input=document.createElement("input"),this.input.className="fcchat-input",this.input.type="text",this.input.placeholder="输入问题，回车发送",this.input.addEventListener("keydown",r=>{r.key==="Enter"&&this.onSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="fcchat-btn fcchat-btn-primary",this.sendBtn.type="button",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.onSend()),i.appendChild(this.input),i.appendChild(this.sendBtn),this.root.appendChild(this.header),this.root.appendChild(this.body),this.root.appendChild(i),document.body.appendChild(this.root),this.root.style.right="18px",this.root.style.bottom="18px",this.header.addEventListener("mousedown",r=>this.onDragStart(r)),window.addEventListener("mousemove",r=>this.onDragMove(r)),window.addEventListener("mouseup",()=>this.onDragEnd()),this.header.addEventListener("pointerdown",r=>this.onSwipeStart(r),{passive:!1}),this.header.addEventListener("pointermove",r=>this.onSwipeMove(r),{passive:!1}),this.header.addEventListener("pointerup",r=>this.onSwipeEnd(r)),this.header.addEventListener("pointercancel",r=>this.onSwipeEnd(r)),window.addEventListener("resize",()=>this.detectMobile())}hide(){this.stopTyping(!0),this.root.style.display="none",this.ensureToggleButton()}show(){var e;this.detectMobile(),this.root.style.display="flex",(e=document.getElementById("fcchat-toggle-btn"))==null||e.remove(),this.scrollToBottom(),this.input.focus()}ensureToggleButton(){if(document.getElementById("fcchat-toggle-btn"))return;const e=document.createElement("button");e.id="fcchat-toggle-btn",e.className="fcchat-toggle-btn",e.type="button",e.textContent="三馆学伴",e.addEventListener("click",()=>this.show()),document.body.appendChild(e)}onDragStart(e){if(this.isMobile||e.target.closest("button"))return;this.dragging=!0;const n=this.root.getBoundingClientRect();this.dragOffsetX=e.clientX-n.left,this.dragOffsetY=e.clientY-n.top,this.root.style.right="auto",this.root.style.bottom="auto",this.root.style.left=n.left+"px",this.root.style.top=n.top+"px"}onDragMove(e){if(!this.dragging||this.isMobile)return;const t=window.innerWidth,n=window.innerHeight,i=this.root.getBoundingClientRect();let r=e.clientX-this.dragOffsetX,a=e.clientY-this.dragOffsetY;r=Math.max(8,Math.min(r,t-i.width-8)),a=Math.max(8,Math.min(a,n-i.height-8)),this.root.style.left=r+"px",this.root.style.top=a+"px"}onDragEnd(){this.dragging=!1}onSwipeStart(e){!this.isMobile||e.target.closest("button")||(this.swipeActive=!0,this.swipeStartY=e.clientY,this.root.classList.add("is-swiping"),e.preventDefault(),this.header.setPointerCapture(e.pointerId))}onSwipeMove(e){if(!this.isMobile||!this.swipeActive)return;e.preventDefault();const t=e.clientY-this.swipeStartY;if(t<=0){this.root.style.transform="";return}this.root.style.transform=`translateY(${Math.min(t,200)}px)`}onSwipeEnd(e){if(!this.isMobile||!this.swipeActive)return;const n=(this.root.style.transform||"").match(/translateY\(([-\d.]+)px\)/),i=n?Number(n[1]):0;this.swipeActive=!1,this.root.classList.remove("is-swiping"),this.root.style.transform="",e&&this.header.releasePointerCapture(e.pointerId),i>=90&&this.hide()}clear(){this.stopTyping(!0),this.messages=[],this.list.innerHTML="",this.statusLine.textContent="",this.ensureWelcome()}ensureWelcome(){this.messages.length>0||this.addMessage("assistant","我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。")}setBusy(e,t=""){this.sendBtn.disabled=e,this.input.disabled=e,this.statusLine.textContent=t}normalizeText(e){return(e??"").replace(/^\s+/,"")}addMessage(e,t){const n={role:e,text:this.normalizeText(t)};this.messages.push(n);const i=document.createElement("div");i.className=`fcchat-row ${e==="user"?"is-user":"is-assistant"}`;const r=document.createElement("div");r.className=`fcchat-bubble ${e==="user"?"bubble-user":"bubble-assistant"}`,r.textContent=n.text,i.appendChild(r),this.list.appendChild(i),this.scrollToBottom()}addAssistantBubbleLoading(){const e=document.createElement("div");e.className="fcchat-row is-assistant",e.dataset.loading="1";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.innerHTML='<span class="fcchat-typing"><span></span><span></span><span></span></span>',e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),{row:e,bubble:t}}addAssistantBubbleEmpty(){const e=document.createElement("div");e.className="fcchat-row is-assistant";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.textContent="",e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),t}replaceLoadingWithEmpty(e){e.removeAttribute("data-loading");const t=e.querySelector(".fcchat-bubble");return t&&(t.innerHTML="",t.textContent=""),t}scrollToBottom(){this.list.scrollTop=this.list.scrollHeight}stopTyping(e){this.typingAbortToken++,this.typingTimer!=null&&(window.clearTimeout(this.typingTimer),this.typingTimer=null)}async typewriterRender(e,t){const n=++this.typingAbortToken,i=this.normalizeText(t),r=i.length;let a=1200;r<=120?a=900+Math.floor(Math.random()*400):r<=400?a=1800+Math.floor(Math.random()*800):a=3e3+Math.floor(Math.random()*1e3);let o=0;const l=performance.now();return await new Promise(c=>{const d=()=>{if(n!==this.typingAbortToken){e.textContent=i,this.scrollToBottom(),c();return}const h=performance.now()-l,u=r-o;if(h>=a||u<=0){e.textContent=i,this.scrollToBottom(),c();return}const f=o/Math.max(1,r);let v=1;const g=Math.random();f<.15?v=g<.75?1:2:f<.7?v=g<.35?2:g<.75?3:4:v=g<.5?2:3,v=Math.min(v,u);const m=i.slice(0,o+v);o+=v,e.textContent=m,this.scrollToBottom();let p=18+Math.floor(Math.random()*38);Math.random()<.06&&(p+=60+Math.floor(Math.random()*90)),this.typingTimer=window.setTimeout(d,p)};d()})}async onSend(){const e=this.input.value.trim();if(!e)return;this.stopTyping(!0),this.input.value="",this.addMessage("user",e);const{row:t,bubble:n}=this.addAssistantBubbleLoading();this.setBusy(!0,"");try{const i=await this.client.ask(e,this.context),r=this.replaceLoadingWithEmpty(t);this.setBusy(!0,"输出中…"),await this.typewriterRender(r,i.answer),this.messages.length>0&&this.messages[this.messages.length-1].role==="assistant"&&(this.messages[this.messages.length-1].text=i.answer),this.setBusy(!1,"")}catch(i){const r=t.querySelector(".fcchat-bubble");if(r){t.removeAttribute("data-loading");const a=typeof(i==null?void 0:i.message)=="string"?i.message:String(i);r.textContent=`请求失败：${a}`,this.messages.length>0&&this.messages[this.messages.length-1].role==="assistant"&&(this.messages[this.messages.length-1].text=`请求失败：${a}`)}this.setBusy(!1,"")}this.scrollToBottom()}injectStyles(){if(document.getElementById("fcchat-style"))return;const e=document.createElement("style");e.id="fcchat-style",e.textContent=`
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

      .fcchat-toggle-btn{
        position: fixed;
        z-index: 99998;
        right: 18px;
        bottom: 18px;
        height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: none;
        background: #2563eb;
        color: #fff;
        font-size: 13px;
        box-shadow: 0 10px 30px rgba(37,99,235,.35);
        cursor: pointer;
        white-space: nowrap;
        line-height: 1;
        min-width: 88px;
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
        .fcchat-toggle-btn{
          right: 14px;
          bottom: calc(72px + env(safe-area-inset-bottom, 0px)) !important;
          white-space: nowrap !important;
          line-height: 1 !important;
          min-width: 88px !important;
          font-size: 12px !important;
          padding: 0 12px !important;
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
    `,document.head.appendChild(e)}getElement(){return this.root}remove(){this.destroy()}}function I0(s){try{return JSON.parse(s)}catch{return null}}function ca(s){return typeof s=="string"?s:""}function L0(s){return s.endsWith("/")?s:s+"/"}function R0(s,e){const t={question:s};return e&&typeof e=="object"&&(t.context={museumId:e.museumId||"",museumName:e.museumName||"",sceneId:e.sceneId||"",sceneTitle:e.sceneTitle||"",url:e.url||""}),t}function P0(s){if(s&&typeof s=="object"&&typeof s.answer=="string"&&s.answer.trim())return{ok:!0,answer:s.answer.trim(),model:ca(s.model)||void 0};if(s&&typeof s=="object"&&("code"in s||"msg"in s||"data"in s)){const e=typeof s.code=="number"?s.code:void 0,t=ca(s.msg)||"",n=s.data;if((e===0||e===void 0)&&n&&typeof n=="object"){const i=typeof n.answer=="string"?n.answer.trim():"";if(i)return{ok:!0,answer:i,model:ca(n.model)||void 0}}if(e===40101||t.toLowerCase()==="unauthorized")return{ok:!1,code:40101,msg:"unauthorized"};if(e!==void 0&&e!==0)return{ok:!1,code:e,msg:t||`error code=${e}`};if(t&&t.toLowerCase()!=="ok")return{ok:!1,code:e,msg:t}}return{ok:!1,msg:"bad response"}}class N0{constructor(e){_(this,"endpoint");_(this,"authToken");_(this,"timeoutMs");if(!(e!=null&&e.endpoint))throw new Error("fcChat endpoint is empty");this.endpoint=L0(e.endpoint),this.authToken=e.authToken||"",this.timeoutMs=typeof e.timeoutMs=="number"&&e.timeoutMs>0?e.timeoutMs:15e3}async ask(e,t){const n=(e||"").trim();if(!n)throw new Error("empty question");const i=new AbortController,r=setTimeout(()=>i.abort(),this.timeoutMs);try{const a={"Content-Type":"application/json"};this.authToken&&(a.Authorization=this.authToken.startsWith("Bearer ")?this.authToken:`Bearer ${this.authToken}`);const o=await fetch(this.endpoint,{method:"POST",headers:a,body:JSON.stringify(R0(n,t)),signal:i.signal}),l=await o.text(),c=I0(l);if(!c){const u=l?`bad response: ${l}`:`http ${o.status}`;throw new Error(u)}const d=P0(c);if(d.ok)return{answer:d.answer,model:d.model};if(d.code===40101){const u=new Error("unauthorized (code=40101)");throw u.code=40101,u}const h=d.code?`${d.msg} (code=${d.code})`:d.msg;throw new Error(h||"request failed")}catch(a){throw(a==null?void 0:a.name)==="AbortError"?new Error(`timeout (${this.timeoutMs}ms)`):a}finally{clearTimeout(r)}}}let jn=!1,es=null,qs=null,$s=null,js=null,Ks=!1,Si=0,Mi=0,dr=!0;class ts{constructor(e=0,t=0,n=0,i=1){_(this,"x");_(this,"y");_(this,"z");_(this,"w");this.x=e,this.y=t,this.z=n,this.w=i}multiply(e){return new ts(this.w*e.x+this.x*e.w+this.y*e.z-this.z*e.y,this.w*e.y-this.x*e.z+this.y*e.w+this.z*e.x,this.w*e.z+this.x*e.y-this.y*e.x+this.z*e.w,this.w*e.w-this.x*e.x-this.y*e.y-this.z*e.z)}normalize(){const e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?new ts(0,0,0,1):new ts(this.x/e,this.y/e,this.z/e,this.w/e)}}function da(s,e,t){const n=s*Math.PI/180,i=e*Math.PI/180,r=t*Math.PI/180,a=Math.cos(n*.5),o=Math.sin(n*.5),l=Math.cos(i*.5),c=Math.sin(i*.5),d=Math.cos(r*.5),h=Math.sin(r*.5);return new ts(a*l*h-o*c*d,o*l*h+a*c*d,o*l*d-a*c*h,a*l*d+o*c*h).normalize()}function D0(s){const e=s.x,t=s.y,n=s.z,i=s.w,r=2*(i*n+e*t),a=1-2*(t*t+n*n),o=Math.atan2(r,a),l=2*(i*t-n*e);let c;Math.abs(l)>=1?c=Math.sign(l)*Math.PI/2:c=Math.asin(l);const d=2*(i*e+t*n),h=1-2*(e*e+t*t),u=Math.atan2(d,h);return{yaw:o*180/Math.PI,pitch:c*180/Math.PI,roll:u*180/Math.PI}}function U0(){return typeof screen<"u"&&screen.orientation&&typeof screen.orientation.angle=="number"?screen.orientation.angle:typeof window<"u"&&typeof window.orientation=="number"?window.orientation:0}function ns(s){for(;s>180;)s-=360;for(;s<-180;)s+=360;return s}function vc(s,e,t){s=ns(s),e=ns(e);let n=e-s;return n>180&&(n-=360),n<-180&&(n+=360),ns(s+n*t)}function O0(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)}async function F0(){if(!O0())return!0;if(typeof DeviceOrientationEvent.requestPermission=="function")try{return await DeviceOrientationEvent.requestPermission()==="granted"}catch(s){return console.warn("[VRMode] iOS permission request failed:",s),!1}return!0}function k0(s,e,t){if(s===null||e===null||t===null)return null;const n=da(s,e,-t),i=da(0,0,-90),r=U0(),o=da(r,0,0).multiply(i).multiply(n).normalize(),l=D0(o);let c=Math.max(-85,Math.min(85,l.pitch)),d=ns(l.yaw);return dr?(Si=d,Mi=c,dr=!1):(Si=vc(Si,d,.15),Mi=vc(Mi,c,.2)),{yaw:Si,pitch:Mi}}async function B0(s){return jn?!0:await F0()?(Ks=!1,$s=null,js=null,Si=0,Mi=0,dr=!0,qs=s,es=t=>{if(!jn||!qs)return;const n=k0(t.alpha,t.beta,t.gamma);if(!n)return;if(!Ks){$s=n.yaw,js=n.pitch,Ks=!0;return}const i=ns(n.yaw-($s??0)),r=n.pitch-(js??0);qs(i,r)},window.addEventListener("deviceorientation",es),jn=!0,!0):(tt("未获得陀螺仪权限，无法进入VR模式"),!1)}function Sd(){jn&&(es&&(window.removeEventListener("deviceorientation",es),es=null),qs=null,jn=!1,Ks=!1,$s=null,js=null,Si=0,Mi=0,dr=!0)}function _c(){return jn}function V0(){const s=()=>{!as()&&jn&&Sd()};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}lt&&(window.__vrDump=()=>{const s=w0();return console.debug("[VR State Snapshot]",s),s},window.__vrResetUI=()=>{console.debug("[VR Reset UI] 正在清理所有 UI 状态..."),T0(it),console.debug("[VR Reset UI] 清理完成")},console.debug("[VR Debug] 调试模式已启用。使用 __vrDump() 查看状态，使用 __vrResetUI() 复位 UI"));Od();S0();M0();Gv();V0();const Md=()=>{const s=document;!!(document.fullscreenElement||s.webkitFullscreenElement)&&x_()};document.addEventListener("fullscreenchange",Md);document.addEventListener("webkitfullscreenchange",Md);function H0(){const s=new URLSearchParams(location.search);return s.has("development")||s.get("dev")==="1"||location.hash.includes("development")}class z0{constructor(){_(this,"appElement");_(this,"config",null);_(this,"panoViewer",null);_(this,"titleBar",null);_(this,"topRightControls",null);_(this,"topModeTabs",null);_(this,"sceneTitleEl",null);_(this,"brandMark",null);_(this,"bottomDock",null);_(this,"sceneGuideDrawer",null);_(this,"guideTray",null);_(this,"museumList",null);_(this,"sceneList",null);_(this,"mapOverlay",null);_(this,"hotspots",null);_(this,"videoPlayer",null);_(this,"controlBar",null);_(this,"loading");_(this,"debugPanel",null);_(this,"configStudio",null);_(this,"qualityIndicator",null);_(this,"northCalibrationPanel",null);_(this,"currentMuseum",null);_(this,"currentScene",null);_(this,"hasBoundFullscreenEvents",!1);_(this,"mode","tour");_(this,"isStructureOverlayOpen",!1);_(this,"structureView2D",null);_(this,"structureView3D",null);_(this,"fcChatPanel",null);_(this,"uiErrorElement",null);const e=document.getElementById("app");if(!e)throw new Error("找不到 #app 元素");this.appElement=e,ld(),this.loading=new T_,this.appElement.appendChild(this.loading.getElement()),this.bindFullscreenEventsOnce(),this.init()}bindFullscreenEventsOnce(){if(this.hasBoundFullscreenEvents)return;this.hasBoundFullscreenEvents=!0;const e=()=>{var t;(t=this.topRightControls)==null||t.syncFullscreenState(),cr()||(this.topRightControls&&!_c()&&this.topRightControls.updateVrModeState(!1),this.panoViewer&&this.panoViewer.isVrModeEnabled()&&this.panoViewer.setVrModeEnabled(!1),fd())};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}async init(){try{if(this.loading.show(),Bd()){await this.initEditorMode(),this.loading.hide();return}this.config=await ao(),this.titleBar&&this.titleBar.setTitle(this.config.appName),window.addEventListener("popstate",()=>this.handleRoute()),await this.handleRoute(),this.loading.hide()}catch(e){console.error("配置加载失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await ao(),this.appElement.innerHTML="",this.configStudio=new N_(this.config,e=>{this.config=e,oo()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}showConfigErrorPanel(e){this.appElement.innerHTML="";const t=new A_(e,()=>{oo(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(t.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
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
      `)}async handleRoute(){if(!this.config)return;const e=ho();if(this.clearView(),!e.museumId){const t=this.config.museums.find(n=>n.id==="wangding")||this.config.museums[0];if(t){if(t.scenes&&t.scenes.length>0){jt(t.id,t.scenes[0].id);return}ua(t.id);return}}if(!e.museumId)this.showMuseumList();else if(e.sceneId){const t=ha(e.museumId),n=Dd(e.museumId,e.sceneId);t&&n?await this.showScene(t,n):(this.showError("未找到指定的场景"),t?ua(t.id):uo())}else{const t=ha(e.museumId);t?this.showSceneList(t):(this.showError("未找到指定的展馆"),uo())}}showMuseumList(){this.config&&(this.titleBar=new lc(this.config.appName),this.appElement.appendChild(this.titleBar.getElement()),this.museumList=new a_(this.config.museums),this.appElement.appendChild(this.museumList.getElement()))}showSceneList(e){this.titleBar=new lc(e.name),this.appElement.appendChild(this.titleBar.getElement());const t=document.createElement("div");t.className="scene-list-page",t.innerHTML=`
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
    `,document.head.appendChild(n),t.querySelectorAll(".scene-card").forEach(i=>{i.addEventListener("click",()=>{const r=i.getAttribute("data-scene-id");r&&jt(e.id,r)})}),this.appElement.appendChild(t)}async showScene(e,t){var v,g,m;this.currentMuseum=e,this.currentScene=t,this.loading.show();const n=document.createElement("div");n.className="viewer-container",n.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `,this.appElement.appendChild(n);const i=kd();this.panoViewer=new r_(n,i);const r=H0();try{this.topRightControls=new H_({viewerRootEl:n,onTogglePickMode:r?()=>this.panoViewer?(this.panoViewer.isPickModeEnabled()?this.panoViewer.disablePickMode():this.panoViewer.enablePickMode(),this.panoViewer.isPickModeEnabled()):!1:void 0,onOpenNorthCalibration:r?()=>{this.openNorthCalibration(t.id)}:void 0,showNorthCalibration:r,onToggleVrMode:async()=>{if(!this.panoViewer)return!1;if(_c())return Sd(),this.panoViewer.setVrModeEnabled(!1),this.topRightControls&&this.topRightControls.updateVrModeState(!1),await Aa(),!1;{try{await pd(n)}catch(T){return lt&&console.debug("[VRMode] fullscreen request failed",T),!1}const E=this.panoViewer.getCurrentView();return await B0((T,R)=>{if(this.panoViewer){const A=E.yaw+T,C=Math.max(-90,Math.min(90,E.pitch+R));this.panoViewer.setView(A,C)}})?(this.panoViewer.setVrModeEnabled(!0),!0):(await Aa(),!1)}}}),this.appElement.appendChild(this.topRightControls.getElement())}catch(p){lt&&console.debug("[showScene] TopRightControls 创建失败，跳过:",p),this.topRightControls=null}this.sceneTitleEl=document.createElement("div"),this.sceneTitleEl.className="vr-scenetitle",this.sceneTitleEl.textContent=t.name||((v=this.config)==null?void 0:v.appName)||"VR Player",this.appElement.appendChild(this.sceneTitleEl);const a=p=>{const E=p,{x,y:T,yaw:R,pitch:A}=E.detail;if(P_({yaw:R,pitch:A,ts:Date.now()}),tt(`已复制 yaw: ${R.toFixed(2)}, pitch: ${A.toFixed(2)}`),this.panoViewer){const C=this.panoViewer.getDomElement();_0(C,x,T)}};window.addEventListener("vr:pick",a);const o=p=>{const E=p;this.panoViewer&&!E.detail.enabled&&this.panoViewer.isPickModeEnabled()&&this.panoViewer.disablePickMode()};window.addEventListener("vr:pickmode",o);try{this.appElement.querySelector(".vr-brandmark")?lt&&console.debug("[showScene] BrandMark 已存在，跳过重复创建"):(this.brandMark=new G_({appName:(g=this.config)==null?void 0:g.appName,brandText:"鼎虎清源"}),this.appElement.appendChild(this.brandMark.getElement()))}catch(p){lt&&console.debug("[showScene] BrandMark 创建失败，跳过:",p),this.brandMark=null}if(i){this.debugPanel=new C_,this.appElement.appendChild(this.debugPanel.getElement()),this.panoViewer.setOnDebugClick((E,x,T,R,A)=>{this.debugPanel&&this.debugPanel.show(E,x,T,R,A)});const p=()=>{if(this.debugPanel&&this.panoViewer){const E=this.panoViewer.getCurrentView();this.debugPanel.updateView(E.yaw,E.pitch,E.fov)}requestAnimationFrame(p)};p()}try{this.videoPlayer=new w_,this.appElement.appendChild(this.videoPlayer.getElement())}catch(p){lt&&console.debug("[showScene] VideoPlayer 创建失败，跳过:",p),this.videoPlayer=null}try{this.guideTray=new h0({museumId:e.id,currentSceneId:t.id,scenes:e.scenes,onSceneClick:p=>{jt(e.id,p)},onMoreClick:()=>{if(!this.sceneGuideDrawer)try{this.sceneGuideDrawer=new d0({museumId:e.id,currentSceneId:t.id,scenes:e.scenes,onClose:()=>{}}),this.appElement.appendChild(this.sceneGuideDrawer.getElement())}catch(p){lt&&console.debug("[GuideTray] SceneGuideDrawer 创建失败:",p)}this.guideTray&&this.guideTray.setVisible(!1),this.sceneGuideDrawer&&this.sceneGuideDrawer.open()},onClose:()=>{this.guideTray&&this.guideTray.setVisible(!1)}}),this.guideTray.setVisible(!1),this.appElement.appendChild(this.guideTray.getElement())}catch(p){lt&&console.debug("[showScene] GuideTray 创建失败，跳过:",p),this.guideTray=null}const l=new Map;e.scenes.forEach(p=>{let E;if(p.panoLow){const x=bn(p.panoLow,rn.PANO_LOW);x&&(E=x)}else if(p.pano){const x=bn(p.pano,rn.PANO);x&&(E=x)}l.set(p.id,{title:p.name,thumb:p.thumb,panoUrl:E})});try{this.bottomDock=new c0({initialTab:"guide",onGuideClick:()=>{this.guideTray&&this.guideTray.setVisible(!0)},sceneId:t.id,sceneName:t.name,museum:e,scenes:e.scenes,currentSceneId:t.id}),this.appElement.appendChild(this.bottomDock.getElement())}catch(p){lt&&console.debug("[showScene] BottomDock 创建失败，跳过:",p),this.bottomDock=null}try{this.topModeTabs=new u0({initialMode:this.mode,onModeChange:p=>{this.setMode(p)}}),this.appElement.appendChild(this.topModeTabs.getElement())}catch(p){lt&&console.debug("[showScene] TopModeTabs 创建失败，跳过:",p),this.topModeTabs=null}try{const p=new Map(e.scenes.map(E=>[E.id,E.name]));this.hotspots=new M_(this.panoViewer,t.hotspots,{resolveSceneName:E=>p.get(E),onEnterScene:E=>{jt(e.id,E)},museumId:e.id}),n.appendChild(this.hotspots.getElement())}catch(p){lt&&console.debug("[showScene] Hotspots 创建失败，跳过:",p),this.hotspots=null}try{this.qualityIndicator=new Wv,this.appElement.appendChild(this.qualityIndicator.getElement())}catch(p){lt&&console.debug("[showScene] QualityIndicator 创建失败，跳过:",p),this.qualityIndicator=null}this.panoViewer.setOnStatusChange(p=>{this.qualityIndicator&&this.qualityIndicator.updateStatus(p)}),this.panoViewer.setOnLoad(()=>{this.loading.hide(),this.hideUIError(),this.preloadNextScene(e,t)}),this.panoViewer.setOnError(p=>{console.error("加载场景失败:",p),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),this.qualityIndicator&&this.qualityIndicator.updateStatus(Pt.ERROR)});const c=ho(),d=c.yaw!==void 0?c.yaw:t.initialView.yaw||0,h=c.pitch!==void 0?c.pitch:t.initialView.pitch||0,u=c.fov!==void 0?c.fov:t.initialView.fov||75,f=-d;this.panoViewer.setView(f,h,u),this.panoViewer.loadScene(t),this.panoViewer.setSceneData(e.id,t.id,t.hotspots);try{const p=(m=this.config)==null?void 0:m.fcChat;if(p!=null&&p.endpoint&&p.endpoint.trim()){const E={endpoint:p.endpoint,authToken:p.authToken,timeoutMs:15e3},x=new N0(E);this.fcChatPanel=new C0(x,{museumId:e.id,sceneId:t.id,sceneTitle:t.name,museumName:e.name,url:window.location.href})}}catch(p){lt&&console.debug("[showScene] FcChatPanel 创建失败，跳过:",p),this.fcChatPanel=null}}preloadNextScene(e,t){const i=(e.scenes.findIndex(a=>a.id===t.id)+1)%e.scenes.length,r=e.scenes[i];r&&r.thumb&&Zs(async()=>{const{resolveAssetUrl:a,AssetType:o}=await Promise.resolve().then(()=>zv);return{resolveAssetUrl:a,AssetType:o}},void 0,import.meta.url).then(({resolveAssetUrl:a,AssetType:o})=>{const l=a(r.thumb,o.THUMB);if(l){const c=new Image;c.src=l}})}clearView(){if(this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.topRightControls&&(this.topRightControls.remove(),this.topRightControls=null),this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),this.topModeTabs&&(this.topModeTabs.getElement().remove(),this.topModeTabs=null),this.sceneTitleEl&&(this.sceneTitleEl.remove(),this.sceneTitleEl=null),this.brandMark&&(this.brandMark.remove(),this.brandMark=null),this.bottomDock&&(this.bottomDock.remove(),this.bottomDock=null),this.guideTray&&(this.guideTray.remove(),this.guideTray=null),this.sceneGuideDrawer&&(this.sceneGuideDrawer.remove(),this.sceneGuideDrawer=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneList&&(this.sceneList.remove(),this.sceneList=null),this.mapOverlay&&(this.mapOverlay.remove(),this.mapOverlay=null),this.hotspots&&(this.hotspots.remove(),this.hotspots=null),this.videoPlayer&&(this.videoPlayer.remove(),this.videoPlayer=null),this.controlBar&&(this.controlBar.remove(),this.controlBar=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),this.qualityIndicator&&(this.qualityIndicator.remove(),this.qualityIndicator=null),this.structureView2D){const e=this.structureView2D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView2D=null}if(this.structureView3D){const e=this.structureView3D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView3D=null}this.isStructureOverlayOpen=!1,this.fcChatPanel&&(this.fcChatPanel.remove(),this.fcChatPanel=null),this.mode="tour",this.appElement.innerHTML="",this.appElement.appendChild(this.loading.getElement())}hideUIError(){this.uiErrorElement&&this.uiErrorElement.parentNode&&(this.uiErrorElement.parentNode.removeChild(this.uiErrorElement),this.uiErrorElement=null)}setMode(e){this.mode!==e&&(this.mode,this.mode=e,this.topModeTabs&&this.topModeTabs.setMode(e),e==="tour"&&this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),e==="structure2d"?this.openStructure2D():e==="structure3d"&&this.openStructure3D())}openStructure2D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1});const e=gc(this.currentMuseum,this.currentScene.id);this.structureView2D?this.structureView2D.updateContext({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id}):(this.structureView2D=new m0({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(t,n)=>{this.closeStructureOverlay({toTour:!1}),jt(t,n)}}),this.appElement.appendChild(this.structureView2D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView2D.open()}openStructure3D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1});const e=gc(this.currentMuseum,this.currentScene.id);this.structureView3D?this.structureView3D.updateContext({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id}):(this.structureView3D=new v0({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(t,n)=>{this.closeStructureOverlay({toTour:!1}),jt(t,n)}}),this.appElement.appendChild(this.structureView3D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView3D.open()}closeStructureOverlay(e){if(this.isStructureOverlayOpen){if(this.isStructureOverlayOpen=!1,this.structureView2D){const t=this.structureView2D.getElement();t&&t.parentNode&&t.parentNode.removeChild(t),this.structureView2D=null}if(this.structureView3D){const t=this.structureView3D.getElement();t&&t.parentNode&&t.parentNode.removeChild(t),this.structureView3D=null}document.body.style.overflow="",document.body.style.touchAction="",document.body.style.overscrollBehavior="",e.toTour&&(this.mode="tour",this.topModeTabs&&this.topModeTabs.setMode("tour"))}}openNorthCalibration(e){if(this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),!this.panoViewer){console.warn("[openNorthCalibration] PanoViewer 未初始化");return}try{this.northCalibrationPanel=new A0({getCurrentYaw:()=>{var n;const t=(n=this.panoViewer)==null?void 0:n.getCurrentView();return(t==null?void 0:t.yaw)??0},sceneId:e,onClose:()=>{this.northCalibrationPanel=null}})}catch(t){console.error("[openNorthCalibration] 创建校准面板失败:",t),this.northCalibrationPanel=null}}showError(e){this.hideUIError(),this.uiErrorElement=document.createElement("div"),this.uiErrorElement.className="error-message",this.uiErrorElement.textContent=e,this.uiErrorElement.style.cssText=`
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
    `,this.appElement.appendChild(this.uiErrorElement),setTimeout(()=>{this.hideUIError()},3e3)}}new z0;export{Q0 as $,ka as A,Wt as B,He as C,sd as D,Ni as E,nx as F,za as G,tn as H,Z0 as I,Ri as J,je as K,ds as L,W0 as M,wr as N,ct as O,Hn as P,Di as Q,ls as R,ox as S,Y0 as T,Nt as U,L as V,K0 as W,pt as X,fv as Y,Ba as Z,J0 as _,Se as a,Ei as a0,wt as a1,Xc as a2,td as a3,tx as a4,dv as a5,Qs as a6,er as a7,ar as a8,Tt as a9,lr as aa,or as ab,cs as ac,Ke as ad,Nn as ae,_r as af,sn as ag,En as ah,xn as b,X0 as c,$0 as d,q0 as e,rx as f,ex as g,yn as h,ht as i,ix as j,sx as k,Ge as l,Wl as m,Cv as n,ax as o,ov as p,Kn as q,yh as r,yo as s,Dt as t,yt as u,va as v,_a as w,Kt as x,mv as y,Dn as z};
