var Io=Object.defineProperty;var Po=(i,e,t)=>e in i?Io(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var J=(i,e,t)=>Po(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Do="modulepreload",No=function(i,e){return new URL(i,e).href},fs={},Uo=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));r=Promise.allSettled(t.map(c=>{if(c=No(c,n),c in fs)return;fs[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(!!n)for(let _=o.length-1;_>=0;_--){const v=o[_];if(v.href===c&&(!d||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Do,d||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((_,v)=>{p.addEventListener("load",_),p.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};var te=(i=>(i.INVALID_ROOT="INVALID_ROOT",i.MISSING_APP_NAME="MISSING_APP_NAME",i.MUSEUMS_NOT_ARRAY="MUSEUMS_NOT_ARRAY",i.MUSEUMS_EMPTY="MUSEUMS_EMPTY",i.MISSING_MUSEUM_ID="MISSING_MUSEUM_ID",i.DUPLICATE_MUSEUM_ID="DUPLICATE_MUSEUM_ID",i.MISSING_MUSEUM_NAME="MISSING_MUSEUM_NAME",i.MISSING_MUSEUM_COVER="MISSING_MUSEUM_COVER",i.MISSING_MUSEUM_MAP="MISSING_MUSEUM_MAP",i.MISSING_MAP_IMAGE="MISSING_MAP_IMAGE",i.INVALID_MAP_WIDTH="INVALID_MAP_WIDTH",i.INVALID_MAP_HEIGHT="INVALID_MAP_HEIGHT",i.SCENES_NOT_ARRAY="SCENES_NOT_ARRAY",i.SCENES_EMPTY="SCENES_EMPTY",i.MISSING_SCENE_ID="MISSING_SCENE_ID",i.DUPLICATE_SCENE_ID="DUPLICATE_SCENE_ID",i.MISSING_SCENE_NAME="MISSING_SCENE_NAME",i.MISSING_PANO="MISSING_PANO",i.INVALID_PANO_URL="INVALID_PANO_URL",i.INVALID_PANOLOW_URL="INVALID_PANOLOW_URL",i.MISSING_THUMB="MISSING_THUMB",i.MISSING_INITIAL_VIEW="MISSING_INITIAL_VIEW",i.INVALID_YAW="INVALID_YAW",i.INVALID_PITCH="INVALID_PITCH",i.INVALID_FOV="INVALID_FOV",i.MISSING_MAP_POINT="MISSING_MAP_POINT",i.INVALID_MAP_POINT_X="INVALID_MAP_POINT_X",i.INVALID_MAP_POINT_Y="INVALID_MAP_POINT_Y",i.HOTSPOTS_NOT_ARRAY="HOTSPOTS_NOT_ARRAY",i.MISSING_HOTSPOT_ID="MISSING_HOTSPOT_ID",i.DUPLICATE_HOTSPOT_ID="DUPLICATE_HOTSPOT_ID",i.INVALID_HOTSPOT_TYPE="INVALID_HOTSPOT_TYPE",i.MISSING_HOTSPOT_LABEL="MISSING_HOTSPOT_LABEL",i.INVALID_HOTSPOT_YAW="INVALID_HOTSPOT_YAW",i.INVALID_HOTSPOT_PITCH="INVALID_HOTSPOT_PITCH",i.MISSING_HOTSPOT_TARGET="MISSING_HOTSPOT_TARGET",i.MISSING_TARGET_MUSEUM_ID="MISSING_TARGET_MUSEUM_ID",i.MISSING_TARGET_SCENE_ID="MISSING_TARGET_SCENE_ID",i.INVALID_TARGET_YAW="INVALID_TARGET_YAW",i.INVALID_TARGET_PITCH="INVALID_TARGET_PITCH",i.INVALID_TARGET_FOV="INVALID_TARGET_FOV",i.MISSING_TARGET_URL="MISSING_TARGET_URL",i))(te||{});function Va(i){const e=[];if(!i||typeof i!="object")return e.push({code:"INVALID_ROOT",path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!i.appName||typeof i.appName!="string"||i.appName.trim()==="")&&e.push({code:"MISSING_APP_NAME",path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!Array.isArray(i.museums))return e.push({code:"MUSEUMS_NOT_ARRAY",path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;i.museums.length===0&&e.push({code:"MUSEUMS_EMPTY",path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const t=new Set;return i.museums.forEach((n,r)=>{const s=`museums[${r}]`,o=n.name&&typeof n.name=="string"?n.name:void 0;if(!n.id||typeof n.id!="string"||n.id.trim()===""?e.push({code:"MISSING_MUSEUM_ID",path:`${s}.id`,message:"id 必须是非空字符串",museumName:o,fieldName:"博物馆 ID"}):(t.has(n.id)&&e.push({code:"DUPLICATE_MUSEUM_ID",path:`${s}.id`,message:`博物馆 ID "${n.id}" 重复`,museumName:o,fieldName:"博物馆 ID"}),t.add(n.id)),(!n.name||typeof n.name!="string"||n.name.trim()==="")&&e.push({code:"MISSING_MUSEUM_NAME",path:`${s}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),(!n.cover||typeof n.cover!="string"||n.cover.trim()==="")&&e.push({code:"MISSING_MUSEUM_COVER",path:`${s}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:o,fieldName:"封面图"}),!n.map||typeof n.map!="object"?e.push({code:"MISSING_MUSEUM_MAP",path:`${s}.map`,message:"map 必须是对象",museumName:o,fieldName:"地图配置"}):((!n.map.image||typeof n.map.image!="string"||n.map.image.trim()==="")&&e.push({code:"MISSING_MAP_IMAGE",path:`${s}.map.image`,message:"map.image 必须是有效的 URL 字符串",museumName:o,fieldName:"地图图片"}),(typeof n.map.width!="number"||n.map.width<=0)&&e.push({code:"INVALID_MAP_WIDTH",path:`${s}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:o,fieldName:"地图宽度"}),(typeof n.map.height!="number"||n.map.height<=0)&&e.push({code:"INVALID_MAP_HEIGHT",path:`${s}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:o,fieldName:"地图高度"})),!Array.isArray(n.scenes))e.push({code:"SCENES_NOT_ARRAY",path:`${s}.scenes`,message:"scenes 必须是数组",museumName:o,fieldName:"场景列表"});else{n.scenes.length===0&&e.push({code:"SCENES_EMPTY",path:`${s}.scenes`,message:"scenes 数组不能为空",museumName:o,fieldName:"场景列表"});const a=new Set;n.scenes.forEach((l,c)=>{const d=`${s}.scenes[${c}]`,h=l.name&&typeof l.name=="string"?l.name:void 0;if(!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:"MISSING_SCENE_ID",path:`${d}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:h,fieldName:"场景 ID"}):(a.has(l.id)&&e.push({code:"DUPLICATE_SCENE_ID",path:`${d}.id`,message:`场景 ID "${l.id}" 在博物馆内重复`,museumName:o,sceneName:h,fieldName:"场景 ID"}),a.add(l.id)),(!l.name||typeof l.name!="string"||l.name.trim()==="")&&e.push({code:"MISSING_SCENE_NAME",path:`${d}.name`,message:"name 必须是非空字符串",museumName:o,sceneName:void 0,fieldName:"场景名称"}),!l.pano&&!l.panoLow?e.push({code:"MISSING_PANO",path:`${d}.pano`,message:"pano 或 panoLow 至少需要提供一个",museumName:o,sceneName:h,fieldName:"全景图"}):(l.pano&&(typeof l.pano!="string"||l.pano.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${d}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:o,sceneName:h,fieldName:"高清全景图"}),l.panoLow&&(typeof l.panoLow!="string"||l.panoLow.trim()==="")&&e.push({code:"INVALID_PANOLOW_URL",path:`${d}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:o,sceneName:h,fieldName:"低清全景图"})),(!l.thumb||typeof l.thumb!="string"||l.thumb.trim()==="")&&e.push({code:"MISSING_THUMB",path:`${d}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:o,sceneName:h,fieldName:"缩略图"}),!l.initialView||typeof l.initialView!="object"?e.push({code:"MISSING_INITIAL_VIEW",path:`${d}.initialView`,message:"initialView 必须是对象",museumName:o,sceneName:h,fieldName:"初始视角"}):(typeof l.initialView.yaw!="number"&&e.push({code:"INVALID_YAW",path:`${d}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:o,sceneName:h,fieldName:"水平角度"}),typeof l.initialView.pitch!="number"&&e.push({code:"INVALID_PITCH",path:`${d}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:o,sceneName:h,fieldName:"垂直角度"}),l.initialView.fov!==void 0&&typeof l.initialView.fov!="number"&&e.push({code:"INVALID_FOV",path:`${d}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:o,sceneName:h,fieldName:"视野角度"})),!l.mapPoint||typeof l.mapPoint!="object"?e.push({code:"MISSING_MAP_POINT",path:`${d}.mapPoint`,message:"mapPoint 必须是对象",museumName:o,sceneName:h,fieldName:"地图点位"}):(typeof l.mapPoint.x!="number"&&e.push({code:"INVALID_MAP_POINT_X",path:`${d}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:o,sceneName:h,fieldName:"地图点位 X 坐标"}),typeof l.mapPoint.y!="number"&&e.push({code:"INVALID_MAP_POINT_Y",path:`${d}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:o,sceneName:h,fieldName:"地图点位 Y 坐标"})),!Array.isArray(l.hotspots))e.push({code:"HOTSPOTS_NOT_ARRAY",path:`${d}.hotspots`,message:"hotspots 必须是数组",museumName:o,sceneName:h,fieldName:"热点列表"});else{const f=new Set;l.hotspots.forEach((p,_)=>{const v=`${d}.hotspots[${_}]`;!p.id||typeof p.id!="string"||p.id.trim()===""?e.push({code:"MISSING_HOTSPOT_ID",path:`${v}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:h,fieldName:"热点 ID"}):(f.has(p.id)&&e.push({code:"DUPLICATE_HOTSPOT_ID",path:`${v}.id`,message:`热点 ID "${p.id}" 在场景内重复`,museumName:o,sceneName:h,fieldName:"热点 ID"}),f.add(p.id)),p.type!=="scene"&&p.type!=="video"&&e.push({code:"INVALID_HOTSPOT_TYPE",path:`${v}.type`,message:'type 必须是 "scene" 或 "video"',museumName:o,sceneName:h,fieldName:"热点类型"}),(!p.label||typeof p.label!="string"||p.label.trim()==="")&&e.push({code:"MISSING_HOTSPOT_LABEL",path:`${v}.label`,message:"label 必须是非空字符串",museumName:o,sceneName:h,fieldName:"热点标签"}),typeof p.yaw!="number"&&e.push({code:"INVALID_HOTSPOT_YAW",path:`${v}.yaw`,message:"yaw 必须是数字",museumName:o,sceneName:h,fieldName:"热点水平角度"}),typeof p.pitch!="number"&&e.push({code:"INVALID_HOTSPOT_PITCH",path:`${v}.pitch`,message:"pitch 必须是数字",museumName:o,sceneName:h,fieldName:"热点垂直角度"}),!p.target||typeof p.target!="object"?e.push({code:"MISSING_HOTSPOT_TARGET",path:`${v}.target`,message:"target 必须是对象",museumName:o,sceneName:h,fieldName:"热点目标配置"}):p.type==="scene"?((!p.target.museumId||typeof p.target.museumId!="string")&&e.push({code:"MISSING_TARGET_MUSEUM_ID",path:`${v}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:o,sceneName:h,fieldName:"目标博物馆 ID"}),(!p.target.sceneId||typeof p.target.sceneId!="string")&&e.push({code:"MISSING_TARGET_SCENE_ID",path:`${v}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是非空字符串",museumName:o,sceneName:h,fieldName:"目标场景 ID"}),p.target.yaw!==void 0&&typeof p.target.yaw!="number"&&e.push({code:"INVALID_TARGET_YAW",path:`${v}.target.yaw`,message:"target.yaw 必须是数字",museumName:o,sceneName:h,fieldName:"目标水平角度"}),p.target.pitch!==void 0&&typeof p.target.pitch!="number"&&e.push({code:"INVALID_TARGET_PITCH",path:`${v}.target.pitch`,message:"target.pitch 必须是数字",museumName:o,sceneName:h,fieldName:"目标垂直角度"}),p.target.fov!==void 0&&typeof p.target.fov!="number"&&e.push({code:"INVALID_TARGET_FOV",path:`${v}.target.fov`,message:"target.fov 必须是数字",museumName:o,sceneName:h,fieldName:"目标视野角度"})):p.type==="video"&&(!p.target.url||typeof p.target.url!="string"||p.target.url.trim()==="")&&e.push({code:"MISSING_TARGET_URL",path:`${v}.target.url`,message:"video 类型热点的 target.url 必须是有效的 URL 字符串",museumName:o,sceneName:h,fieldName:"视频链接"})})}})}}),e}let bn=null;async function ps(){if(bn)return bn;try{const i=await fetch("./config.json",{cache:"no-store"});if(!i.ok)throw new Error(`加载配置失败: ${i.status}`);const e=await i.json(),t=Va(e);if(t.length>0){const n=new Error("配置校验失败");throw n.validationErrors=t,n}return bn=e,bn}catch(i){throw console.error("加载配置失败:",i),i}}function ms(){bn=null}function Gr(i){if(bn)return bn.museums.find(e=>e.id===i)}function Oo(i,e){const t=Gr(i);if(t)return t.scenes.find(n=>n.id===e)}function ka(i){const e=new URL(window.location.href);return e.search="",Object.entries(i).forEach(([t,n])=>{n!=null&&n!==""&&e.searchParams.set(t,String(n))}),e.pathname+e.search+e.hash}function Fo(){return window.location.pathname}function Bo(){if(window.location.pathname.includes("//")){const i=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",i+window.location.search+window.location.hash)}}function gs(){const i=new URLSearchParams(window.location.search),e=i.get("yaw"),t=i.get("pitch"),n=i.get("fov");return{museumId:i.get("museum")||void 0,sceneId:i.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:t?parseFloat(t):void 0,fov:n?parseFloat(n):void 0}}function Ho(){return new URLSearchParams(window.location.search).get("debug")==="1"}function Go(){const i=new URLSearchParams(window.location.search);return i.get("editor")==="1"||i.get("debug")==="1"}function _s(){const i=Fo();window.history.pushState({},"",i),window.dispatchEvent(new Event("popstate"))}function zr(i){const e=ka({museum:i});window.history.pushState({},"",e),window.dispatchEvent(new Event("popstate"))}function Zn(i,e,t){const n=ka({museum:i,scene:e,yaw:t==null?void 0:t.yaw,pitch:t==null?void 0:t.pitch,fov:t==null?void 0:t.fov});window.history.pushState({},"",n),window.dispatchEvent(new Event("popstate"))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zr="160",zo=0,vs=1,Vo=2,Wa=1,ko=2,Kt=3,un=0,yt=1,Zt=2,dn=0,jn=1,xs=2,Ss=3,Ms=4,Wo=5,En=100,Xo=101,qo=102,Es=103,ys=104,Yo=200,$o=201,jo=202,Ko=203,Vr=204,kr=205,Zo=206,Jo=207,Qo=208,el=209,tl=210,nl=211,il=212,rl=213,sl=214,al=0,ol=1,ll=2,Yi=3,cl=4,dl=5,hl=6,ul=7,Xa=0,fl=1,pl=2,Qt=0,ml=1,gl=2,_l=3,qa=4,vl=5,xl=6,Ya=300,Jn=301,Qn=302,Wr=303,Xr=304,tr=306,qr=1e3,Ft=1001,Yr=1002,St=1003,bs=1004,dr=1005,Et=1006,Sl=1007,wn=1008,hn=1009,Ml=1010,El=1011,Jr=1012,$a=1013,ln=1014,cn=1015,pi=1016,ja=1017,Ka=1018,Tn=1020,yl=1021,Bt=1023,bl=1024,Tl=1025,An=1026,ei=1027,Al=1028,Za=1029,wl=1030,Ja=1031,Qa=1033,hr=33776,ur=33777,fr=33778,pr=33779,Ts=35840,As=35841,ws=35842,Rs=35843,eo=36196,Cs=37492,Ls=37496,Is=37808,Ps=37809,Ds=37810,Ns=37811,Us=37812,Os=37813,Fs=37814,Bs=37815,Hs=37816,Gs=37817,zs=37818,Vs=37819,ks=37820,Ws=37821,mr=36492,Xs=36494,qs=36495,Rl=36283,Ys=36284,$s=36285,js=36286,to=3e3,en=3001,Cl=3200,Ll=3201,Il=0,Pl=1,Pt="",it="srgb",tn="srgb-linear",Qr="display-p3",nr="display-p3-linear",$i="linear",Ke="srgb",ji="rec709",Ki="p3",Ln=7680,Ks=519,Dl=512,Nl=513,Ul=514,no=515,Ol=516,Fl=517,Bl=518,Hl=519,Zs=35044,Js="300 es",$r=1035,Jt=2e3,Zi=2001;class ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qs=1234567;const hi=Math.PI/180,mi=180/Math.PI;function ii(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ut[i&255]+ut[i>>8&255]+ut[i>>16&255]+ut[i>>24&255]+"-"+ut[e&255]+ut[e>>8&255]+"-"+ut[e>>16&15|64]+ut[e>>24&255]+"-"+ut[t&63|128]+ut[t>>8&255]+"-"+ut[t>>16&255]+ut[t>>24&255]+ut[n&255]+ut[n>>8&255]+ut[n>>16&255]+ut[n>>24&255]).toLowerCase()}function Mt(i,e,t){return Math.max(e,Math.min(t,i))}function es(i,e){return(i%e+e)%e}function Gl(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function zl(i,e,t){return i!==e?(t-i)/(e-i):0}function ui(i,e,t){return(1-t)*i+t*e}function Vl(i,e,t,n){return ui(i,e,1-Math.exp(-t*n))}function kl(i,e=1){return e-Math.abs(es(i,e*2)-e)}function Wl(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Xl(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ql(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Yl(i,e){return i+Math.random()*(e-i)}function $l(i){return i*(.5-Math.random())}function jl(i){i!==void 0&&(Qs=i);let e=Qs+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Kl(i){return i*hi}function Zl(i){return i*mi}function jr(i){return(i&i-1)===0&&i!==0}function Jl(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ji(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ql(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),d=o((e+n)/2),h=s((e-n)/2),f=o((e-n)/2),p=s((n-e)/2),_=o((n-e)/2);switch(r){case"XYX":i.set(a*d,l*h,l*f,a*c);break;case"YZY":i.set(l*f,a*d,l*h,a*c);break;case"ZXZ":i.set(l*h,l*f,a*d,a*c);break;case"XZX":i.set(a*d,l*_,l*p,a*c);break;case"YXY":i.set(l*p,a*d,l*_,a*c);break;case"ZYZ":i.set(l*_,l*p,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function qn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function _t(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ea={DEG2RAD:hi,RAD2DEG:mi,generateUUID:ii,clamp:Mt,euclideanModulo:es,mapLinear:Gl,inverseLerp:zl,lerp:ui,damp:Vl,pingpong:kl,smoothstep:Wl,smootherstep:Xl,randInt:ql,randFloat:Yl,randFloatSpread:$l,seededRandom:jl,degToRad:Kl,radToDeg:Zl,isPowerOfTwo:jr,ceilPowerOfTwo:Jl,floorPowerOfTwo:Ji,setQuaternionFromProperEuler:Ql,normalize:_t,denormalize:qn};class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,r,s,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=t,d[4]=s,d[5]=l,d[6]=n,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],d=n[4],h=n[7],f=n[2],p=n[5],_=n[8],v=r[0],m=r[3],u=r[6],b=r[1],x=r[4],w=r[7],I=r[2],R=r[5],A=r[8];return s[0]=o*v+a*b+l*I,s[3]=o*m+a*x+l*R,s[6]=o*u+a*w+l*A,s[1]=c*v+d*b+h*I,s[4]=c*m+d*x+h*R,s[7]=c*u+d*w+h*A,s[2]=f*v+p*b+_*I,s[5]=f*m+p*x+_*R,s[8]=f*u+p*w+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-n*s*d+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,f=a*l-d*s,p=c*s-o*l,_=t*h+n*f+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=h*v,e[1]=(r*c-d*n)*v,e[2]=(a*n-r*o)*v,e[3]=f*v,e[4]=(d*t-r*l)*v,e[5]=(r*s-a*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(gr.makeScale(e,t)),this}rotate(e){return this.premultiply(gr.makeRotation(-e)),this}translate(e,t){return this.premultiply(gr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gr=new He;function io(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function gi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ec(){const i=gi("canvas");return i.style.display="block",i}const ta={};function fi(i){i in ta||(ta[i]=!0,console.warn(i))}const na=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ia=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),yi={[tn]:{transfer:$i,primaries:ji,toReference:i=>i,fromReference:i=>i},[it]:{transfer:Ke,primaries:ji,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[nr]:{transfer:$i,primaries:Ki,toReference:i=>i.applyMatrix3(ia),fromReference:i=>i.applyMatrix3(na)},[Qr]:{transfer:Ke,primaries:Ki,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ia),fromReference:i=>i.applyMatrix3(na).convertLinearToSRGB()}},tc=new Set([tn,nr]),We={enabled:!0,_workingColorSpace:tn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!tc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=yi[e].toReference,r=yi[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return yi[i].primaries},getTransfer:function(i){return i===Pt?$i:yi[i].transfer}};function Kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _r(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let In;class ro{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{In===void 0&&(In=gi("canvas")),In.width=e.width,In.height=e.height;const n=In.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=In}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=gi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Kn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Kn(t[n]/255)*255):t[n]=Kn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nc=0;class so{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nc++}),this.uuid=ii(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(vr(r[o].image)):s.push(vr(r[o]))}else s=vr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function vr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ro.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ic=0;class bt extends ni{constructor(e=bt.DEFAULT_IMAGE,t=bt.DEFAULT_MAPPING,n=Ft,r=Ft,s=Et,o=wn,a=Bt,l=hn,c=bt.DEFAULT_ANISOTROPY,d=Pt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ic++}),this.uuid=ii(),this.name="",this.source=new so(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===en?it:Pt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ya)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qr:e.x=e.x-Math.floor(e.x);break;case Ft:e.x=e.x<0?0:1;break;case Yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qr:e.y=e.y-Math.floor(e.y);break;case Ft:e.y=e.y<0?0:1;break;case Yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===it?en:to}set encoding(e){fi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===en?it:Pt}}bt.DEFAULT_IMAGE=null;bt.DEFAULT_MAPPING=Ya;bt.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,n=0,r=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],p=l[5],_=l[9],v=l[2],m=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,w=(p+1)/2,I=(u+1)/2,R=(d+f)/4,A=(h+v)/4,q=(_+m)/4;return x>w&&x>I?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=R/n,s=A/n):w>I?w<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(w),n=R/r,s=q/r):I<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),n=A/s,r=q/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-_)*(m-_)+(h-v)*(h-v)+(f-d)*(f-d));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(h-v)/b,this.z=(f-d)/b,this.w=Math.acos((c+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rc extends ni{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(fi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===en?it:Pt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Et,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new bt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new so(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rn extends rc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ao extends bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sc extends bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=Ft,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],d=n[r+2],h=n[r+3];const f=s[o+0],p=s[o+1],_=s[o+2],v=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=_,e[t+3]=v;return}if(h!==v||l!==f||c!==p||d!==_){let m=1-a;const u=l*f+c*p+d*_+h*v,b=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const I=Math.sqrt(x),R=Math.atan2(I,u*b);m=Math.sin(m*R)/I,a=Math.sin(a*R)/I}const w=a*b;if(l=l*m+f*w,c=c*m+p*w,d=d*m+_*w,h=h*m+v*w,m===1-a){const I=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=I,c*=I,d*=I,h*=I}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],d=n[r+3],h=s[o],f=s[o+1],p=s[o+2],_=s[o+3];return e[t]=a*_+d*h+l*p-c*f,e[t+1]=l*_+d*f+c*h-a*p,e[t+2]=c*_+d*p+a*f-l*h,e[t+3]=d*_-a*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),d=a(r/2),h=a(s/2),f=l(n/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=f*d*h+c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h-f*p*_;break;case"YXZ":this._x=f*d*h+c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h+f*p*_;break;case"ZXY":this._x=f*d*h-c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h-f*p*_;break;case"ZYX":this._x=f*d*h-c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h+f*p*_;break;case"YZX":this._x=f*d*h+c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h-f*p*_;break;case"XZY":this._x=f*d*h-c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],f=n+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(d-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+o*a+r*c-s*l,this._y=r*d+o*l+s*a-n*c,this._z=s*d+o*c+n*l-r*a,this._w=o*d-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,n=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ra.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ra.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),d=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*d,this.y=n+l*d+a*c-s*h,this.z=r+l*h+s*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xr.copy(this).projectOnVector(e),this.sub(xr)}reflect(e){return this.sub(xr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xr=new O,ra=new vi;class xi{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Dt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Dt):Dt.fromBufferAttribute(s,o),Dt.applyMatrix4(e.matrixWorld),this.expandByPoint(Dt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),bi.copy(n.boundingBox)),bi.applyMatrix4(e.matrixWorld),this.union(bi)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Dt),Dt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ai),Ti.subVectors(this.max,ai),Pn.subVectors(e.a,ai),Dn.subVectors(e.b,ai),Nn.subVectors(e.c,ai),nn.subVectors(Dn,Pn),rn.subVectors(Nn,Dn),gn.subVectors(Pn,Nn);let t=[0,-nn.z,nn.y,0,-rn.z,rn.y,0,-gn.z,gn.y,nn.z,0,-nn.x,rn.z,0,-rn.x,gn.z,0,-gn.x,-nn.y,nn.x,0,-rn.y,rn.x,0,-gn.y,gn.x,0];return!Sr(t,Pn,Dn,Nn,Ti)||(t=[1,0,0,0,1,0,0,0,1],!Sr(t,Pn,Dn,Nn,Ti))?!1:(Ai.crossVectors(nn,rn),t=[Ai.x,Ai.y,Ai.z],Sr(t,Pn,Dn,Nn,Ti))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Xt=[new O,new O,new O,new O,new O,new O,new O,new O],Dt=new O,bi=new xi,Pn=new O,Dn=new O,Nn=new O,nn=new O,rn=new O,gn=new O,ai=new O,Ti=new O,Ai=new O,_n=new O;function Sr(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){_n.fromArray(i,s);const a=r.x*Math.abs(_n.x)+r.y*Math.abs(_n.y)+r.z*Math.abs(_n.z),l=e.dot(_n),c=t.dot(_n),d=n.dot(_n);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const ac=new xi,oi=new O,Mr=new O;class ts{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ac.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;oi.subVectors(e,this.center);const t=oi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(oi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(oi.copy(e.center).add(Mr)),this.expandByPoint(oi.copy(e.center).sub(Mr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qt=new O,Er=new O,wi=new O,sn=new O,yr=new O,Ri=new O,br=new O;class oc{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qt.copy(this.origin).addScaledVector(this.direction,t),qt.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Er.copy(e).add(t).multiplyScalar(.5),wi.copy(t).sub(e).normalize(),sn.copy(this.origin).sub(Er);const s=e.distanceTo(t)*.5,o=-this.direction.dot(wi),a=sn.dot(this.direction),l=-sn.dot(wi),c=sn.lengthSq(),d=Math.abs(1-o*o);let h,f,p,_;if(d>0)if(h=o*l-a,f=o*a-l,_=s*d,h>=0)if(f>=-_)if(f<=_){const v=1/d;h*=v,f*=v,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Er).addScaledVector(wi,f),p}intersectSphere(e,t){qt.subVectors(e.center,this.origin);const n=qt.dot(this.direction),r=qt.dot(qt)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,o=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,o=(e.min.y-f.y)*d),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,qt)!==null}intersectTriangle(e,t,n,r,s){yr.subVectors(t,e),Ri.subVectors(n,e),br.crossVectors(yr,Ri);let o=this.direction.dot(br),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;sn.subVectors(this.origin,e);const l=a*this.direction.dot(Ri.crossVectors(sn,Ri));if(l<0)return null;const c=a*this.direction.dot(yr.cross(sn));if(c<0||l+c>o)return null;const d=-a*sn.dot(br);return d<0?null:this.at(d/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dt{constructor(e,t,n,r,s,o,a,l,c,d,h,f,p,_,v,m){dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,d,h,f,p,_,v,m)}set(e,t,n,r,s,o,a,l,c,d,h,f,p,_,v,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=p,u[7]=_,u[11]=v,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Un.setFromMatrixColumn(e,0).length(),s=1/Un.setFromMatrixColumn(e,1).length(),o=1/Un.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*d,p=o*h,_=a*d,v=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+_*c,t[5]=f-v*c,t[9]=-a*l,t[2]=v-f*c,t[6]=_+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*d,p=l*h,_=c*d,v=c*h;t[0]=f+v*a,t[4]=_*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=p*a-_,t[6]=v+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*d,p=l*h,_=c*d,v=c*h;t[0]=f-v*a,t[4]=-o*h,t[8]=_+p*a,t[1]=p+_*a,t[5]=o*d,t[9]=v-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*d,p=o*h,_=a*d,v=a*h;t[0]=l*d,t[4]=_*c-p,t[8]=f*c+v,t[1]=l*h,t[5]=v*c+f,t[9]=p*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,_=a*l,v=a*c;t[0]=l*d,t[4]=v-f*h,t[8]=_*h+p,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=p*h+_,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*l,p=o*c,_=a*l,v=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=f*h+v,t[5]=o*d,t[9]=p*h-_,t[2]=_*h-p,t[6]=a*d,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lc,e,cc)}lookAt(e,t,n){const r=this.elements;return At.subVectors(e,t),At.lengthSq()===0&&(At.z=1),At.normalize(),an.crossVectors(n,At),an.lengthSq()===0&&(Math.abs(n.z)===1?At.x+=1e-4:At.z+=1e-4,At.normalize(),an.crossVectors(n,At)),an.normalize(),Ci.crossVectors(At,an),r[0]=an.x,r[4]=Ci.x,r[8]=At.x,r[1]=an.y,r[5]=Ci.y,r[9]=At.y,r[2]=an.z,r[6]=Ci.z,r[10]=At.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],d=n[1],h=n[5],f=n[9],p=n[13],_=n[2],v=n[6],m=n[10],u=n[14],b=n[3],x=n[7],w=n[11],I=n[15],R=r[0],A=r[4],q=r[8],M=r[12],y=r[1],H=r[5],$=r[9],re=r[13],C=r[2],F=r[6],z=r[10],W=r[14],k=r[3],V=r[7],K=r[11],ee=r[15];return s[0]=o*R+a*y+l*C+c*k,s[4]=o*A+a*H+l*F+c*V,s[8]=o*q+a*$+l*z+c*K,s[12]=o*M+a*re+l*W+c*ee,s[1]=d*R+h*y+f*C+p*k,s[5]=d*A+h*H+f*F+p*V,s[9]=d*q+h*$+f*z+p*K,s[13]=d*M+h*re+f*W+p*ee,s[2]=_*R+v*y+m*C+u*k,s[6]=_*A+v*H+m*F+u*V,s[10]=_*q+v*$+m*z+u*K,s[14]=_*M+v*re+m*W+u*ee,s[3]=b*R+x*y+w*C+I*k,s[7]=b*A+x*H+w*F+I*V,s[11]=b*q+x*$+w*z+I*K,s[15]=b*M+x*re+w*W+I*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],p=e[14],_=e[3],v=e[7],m=e[11],u=e[15];return _*(+s*l*h-r*c*h-s*a*f+n*c*f+r*a*p-n*l*p)+v*(+t*l*p-t*c*f+s*o*f-r*o*p+r*c*d-s*l*d)+m*(+t*c*h-t*a*p-s*o*h+n*o*p+s*a*d-n*c*d)+u*(-r*a*d-t*l*h+t*a*f+r*o*h-n*o*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],p=e[11],_=e[12],v=e[13],m=e[14],u=e[15],b=h*m*c-v*f*c+v*l*p-a*m*p-h*l*u+a*f*u,x=_*f*c-d*m*c-_*l*p+o*m*p+d*l*u-o*f*u,w=d*v*c-_*h*c+_*a*p-o*v*p-d*a*u+o*h*u,I=_*h*l-d*v*l-_*a*f+o*v*f+d*a*m-o*h*m,R=t*b+n*x+r*w+s*I;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=b*A,e[1]=(v*f*s-h*m*s-v*r*p+n*m*p+h*r*u-n*f*u)*A,e[2]=(a*m*s-v*l*s+v*r*c-n*m*c-a*r*u+n*l*u)*A,e[3]=(h*l*s-a*f*s-h*r*c+n*f*c+a*r*p-n*l*p)*A,e[4]=x*A,e[5]=(d*m*s-_*f*s+_*r*p-t*m*p-d*r*u+t*f*u)*A,e[6]=(_*l*s-o*m*s-_*r*c+t*m*c+o*r*u-t*l*u)*A,e[7]=(o*f*s-d*l*s+d*r*c-t*f*c-o*r*p+t*l*p)*A,e[8]=w*A,e[9]=(_*h*s-d*v*s-_*n*p+t*v*p+d*n*u-t*h*u)*A,e[10]=(o*v*s-_*a*s+_*n*c-t*v*c-o*n*u+t*a*u)*A,e[11]=(d*a*s-o*h*s-d*n*c+t*h*c+o*n*p-t*a*p)*A,e[12]=I*A,e[13]=(d*v*r-_*h*r+_*n*f-t*v*f-d*n*m+t*h*m)*A,e[14]=(_*a*r-o*v*r-_*n*l+t*v*l+o*n*m-t*a*m)*A,e[15]=(o*h*r-d*a*r+d*n*l-t*h*l-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,d=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,d*a+n,d*l-r*o,0,c*l-r*a,d*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,d=o+o,h=a+a,f=s*c,p=s*d,_=s*h,v=o*d,m=o*h,u=a*h,b=l*c,x=l*d,w=l*h,I=n.x,R=n.y,A=n.z;return r[0]=(1-(v+u))*I,r[1]=(p+w)*I,r[2]=(_-x)*I,r[3]=0,r[4]=(p-w)*R,r[5]=(1-(f+u))*R,r[6]=(m+b)*R,r[7]=0,r[8]=(_+x)*A,r[9]=(m-b)*A,r[10]=(1-(f+v))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Un.set(r[0],r[1],r[2]).length();const o=Un.set(r[4],r[5],r[6]).length(),a=Un.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Nt.copy(this);const c=1/s,d=1/o,h=1/a;return Nt.elements[0]*=c,Nt.elements[1]*=c,Nt.elements[2]*=c,Nt.elements[4]*=d,Nt.elements[5]*=d,Nt.elements[6]*=d,Nt.elements[8]*=h,Nt.elements[9]*=h,Nt.elements[10]*=h,t.setFromRotationMatrix(Nt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=Jt){const l=this.elements,c=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let p,_;if(a===Jt)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Zi)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Jt){const l=this.elements,c=1/(t-e),d=1/(n-r),h=1/(o-s),f=(t+e)*c,p=(n+r)*d;let _,v;if(a===Jt)_=(o+s)*h,v=-2*h;else if(a===Zi)_=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Un=new O,Nt=new dt,lc=new O(0,0,0),cc=new O(1,1,1),an=new O,Ci=new O,At=new O,sa=new dt,aa=new vi;class ir{constructor(e=0,t=0,n=0,r=ir.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],d=r[9],h=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return aa.setFromEuler(this),this.setFromQuaternion(aa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ir.DEFAULT_ORDER="XYZ";class oo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dc=0;const oa=new O,On=new vi,Yt=new dt,Li=new O,li=new O,hc=new O,uc=new vi,la=new O(1,0,0),ca=new O(0,1,0),da=new O(0,0,1),fc={type:"added"},pc={type:"removed"};class Rt extends ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dc++}),this.uuid=ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new O,t=new ir,n=new vi,r=new O(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new He}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return On.setFromAxisAngle(e,t),this.quaternion.multiply(On),this}rotateOnWorldAxis(e,t){return On.setFromAxisAngle(e,t),this.quaternion.premultiply(On),this}rotateX(e){return this.rotateOnAxis(la,e)}rotateY(e){return this.rotateOnAxis(ca,e)}rotateZ(e){return this.rotateOnAxis(da,e)}translateOnAxis(e,t){return oa.copy(e).applyQuaternion(this.quaternion),this.position.add(oa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(la,e)}translateY(e){return this.translateOnAxis(ca,e)}translateZ(e){return this.translateOnAxis(da,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Li.copy(e):Li.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),li.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yt.lookAt(li,Li,this.up):Yt.lookAt(Li,li,this.up),this.quaternion.setFromRotationMatrix(Yt),r&&(Yt.extractRotation(r.matrixWorld),On.setFromRotationMatrix(Yt),this.quaternion.premultiply(On.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(fc)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(li,e,hc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(li,uc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Rt.DEFAULT_UP=new O(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ut=new O,$t=new O,Tr=new O,jt=new O,Fn=new O,Bn=new O,ha=new O,Ar=new O,wr=new O,Rr=new O;let Ii=!1;class Ot{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ut.subVectors(e,t),r.cross(Ut);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Ut.subVectors(r,t),$t.subVectors(n,t),Tr.subVectors(e,t);const o=Ut.dot(Ut),a=Ut.dot($t),l=Ut.dot(Tr),c=$t.dot($t),d=$t.dot(Tr),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-a*d)*f,_=(o*d-a*l)*f;return s.set(1-p-_,_,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,jt)===null?!1:jt.x>=0&&jt.y>=0&&jt.x+jt.y<=1}static getUV(e,t,n,r,s,o,a,l){return Ii===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ii=!0),this.getInterpolation(e,t,n,r,s,o,a,l)}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,jt)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,jt.x),l.addScaledVector(o,jt.y),l.addScaledVector(a,jt.z),l)}static isFrontFacing(e,t,n,r){return Ut.subVectors(n,t),$t.subVectors(e,t),Ut.cross($t).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ut.subVectors(this.c,this.b),$t.subVectors(this.a,this.b),Ut.cross($t).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ot.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ot.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return Ii===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ii=!0),Ot.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return Ot.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Ot.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ot.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Fn.subVectors(r,n),Bn.subVectors(s,n),Ar.subVectors(e,n);const l=Fn.dot(Ar),c=Bn.dot(Ar);if(l<=0&&c<=0)return t.copy(n);wr.subVectors(e,r);const d=Fn.dot(wr),h=Bn.dot(wr);if(d>=0&&h<=d)return t.copy(r);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(n).addScaledVector(Fn,o);Rr.subVectors(e,s);const p=Fn.dot(Rr),_=Bn.dot(Rr);if(_>=0&&p<=_)return t.copy(s);const v=p*c-l*_;if(v<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Bn,a);const m=d*_-p*h;if(m<=0&&h-d>=0&&p-_>=0)return ha.subVectors(s,r),a=(h-d)/(h-d+(p-_)),t.copy(r).addScaledVector(ha,a);const u=1/(m+v+f);return o=v*u,a=f*u,t.copy(n).addScaledVector(Fn,o).addScaledVector(Bn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const lo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},on={h:0,s:0,l:0},Pi={h:0,s:0,l:0};function Cr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=it){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=We.workingColorSpace){if(e=es(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Cr(o,s,e+1/3),this.g=Cr(o,s,e),this.b=Cr(o,s,e-1/3)}return We.toWorkingColorSpace(this,r),this}setStyle(e,t=it){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=it){const n=lo[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Kn(e.r),this.g=Kn(e.g),this.b=Kn(e.b),this}copyLinearToSRGB(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=it){return We.fromWorkingColorSpace(ft.copy(this),e),Math.round(Mt(ft.r*255,0,255))*65536+Math.round(Mt(ft.g*255,0,255))*256+Math.round(Mt(ft.b*255,0,255))}getHexString(e=it){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(ft.copy(this),t);const n=ft.r,r=ft.g,s=ft.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(ft.copy(this),t),e.r=ft.r,e.g=ft.g,e.b=ft.b,e}getStyle(e=it){We.fromWorkingColorSpace(ft.copy(this),e);const t=ft.r,n=ft.g,r=ft.b;return e!==it?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(on),this.setHSL(on.h+e,on.s+t,on.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(on),e.getHSL(Pi);const n=ui(on.h,Pi.h,t),r=ui(on.s,Pi.s,t),s=ui(on.l,Pi.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ft=new Xe;Xe.NAMES=lo;let mc=0;class rr extends ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mc++}),this.uuid=ii(),this.name="",this.type="Material",this.blending=jn,this.side=un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vr,this.blendDst=kr,this.blendEquation=En,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ks,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ln,this.stencilZFail=Ln,this.stencilZPass=Ln,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==jn&&(n.blending=this.blending),this.side!==un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vr&&(n.blendSrc=this.blendSrc),this.blendDst!==kr&&(n.blendDst=this.blendDst),this.blendEquation!==En&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ks&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ln&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ln&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ln&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qi extends rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Xa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const nt=new O,Di=new qe;class Vt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zs,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Di.fromBufferAttribute(this,t),Di.applyMatrix3(e),this.setXY(t,Di.x,Di.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.applyMatrix3(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.applyMatrix4(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.applyNormalMatrix(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nt.fromBufferAttribute(this,t),nt.transformDirection(e),this.setXYZ(t,nt.x,nt.y,nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),r=_t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),r=_t(r,this.array),s=_t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zs&&(e.usage=this.usage),e}}class co extends Vt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ho extends Vt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kt extends Vt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gc=0;const Lt=new dt,Lr=new Rt,Hn=new O,wt=new xi,ci=new xi,lt=new O;class fn extends ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gc++}),this.uuid=ii(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(io(e)?ho:co)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new He().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Lt.makeRotationFromQuaternion(e),this.applyMatrix4(Lt),this}rotateX(e){return Lt.makeRotationX(e),this.applyMatrix4(Lt),this}rotateY(e){return Lt.makeRotationY(e),this.applyMatrix4(Lt),this}rotateZ(e){return Lt.makeRotationZ(e),this.applyMatrix4(Lt),this}translate(e,t,n){return Lt.makeTranslation(e,t,n),this.applyMatrix4(Lt),this}scale(e,t,n){return Lt.makeScale(e,t,n),this.applyMatrix4(Lt),this}lookAt(e){return Lr.lookAt(e),Lr.updateMatrix(),this.applyMatrix4(Lr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hn).negate(),this.translate(Hn.x,Hn.y,Hn.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new kt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];wt.setFromBufferAttribute(s),this.morphTargetsRelative?(lt.addVectors(this.boundingBox.min,wt.min),this.boundingBox.expandByPoint(lt),lt.addVectors(this.boundingBox.max,wt.max),this.boundingBox.expandByPoint(lt)):(this.boundingBox.expandByPoint(wt.min),this.boundingBox.expandByPoint(wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ts);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(e){const n=this.boundingSphere.center;if(wt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ci.setFromBufferAttribute(a),this.morphTargetsRelative?(lt.addVectors(wt.min,ci.min),wt.expandByPoint(lt),lt.addVectors(wt.max,ci.max),wt.expandByPoint(lt)):(wt.expandByPoint(ci.min),wt.expandByPoint(ci.max))}wt.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)lt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(lt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)lt.fromBufferAttribute(a,c),l&&(Hn.fromBufferAttribute(e,c),lt.add(Hn)),r=Math.max(r,n.distanceToSquared(lt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let y=0;y<a;y++)c[y]=new O,d[y]=new O;const h=new O,f=new O,p=new O,_=new qe,v=new qe,m=new qe,u=new O,b=new O;function x(y,H,$){h.fromArray(r,y*3),f.fromArray(r,H*3),p.fromArray(r,$*3),_.fromArray(o,y*2),v.fromArray(o,H*2),m.fromArray(o,$*2),f.sub(h),p.sub(h),v.sub(_),m.sub(_);const re=1/(v.x*m.y-m.x*v.y);isFinite(re)&&(u.copy(f).multiplyScalar(m.y).addScaledVector(p,-v.y).multiplyScalar(re),b.copy(p).multiplyScalar(v.x).addScaledVector(f,-m.x).multiplyScalar(re),c[y].add(u),c[H].add(u),c[$].add(u),d[y].add(b),d[H].add(b),d[$].add(b))}let w=this.groups;w.length===0&&(w=[{start:0,count:n.length}]);for(let y=0,H=w.length;y<H;++y){const $=w[y],re=$.start,C=$.count;for(let F=re,z=re+C;F<z;F+=3)x(n[F+0],n[F+1],n[F+2])}const I=new O,R=new O,A=new O,q=new O;function M(y){A.fromArray(s,y*3),q.copy(A);const H=c[y];I.copy(H),I.sub(A.multiplyScalar(A.dot(H))).normalize(),R.crossVectors(q,H);const re=R.dot(d[y])<0?-1:1;l[y*4]=I.x,l[y*4+1]=I.y,l[y*4+2]=I.z,l[y*4+3]=re}for(let y=0,H=w.length;y<H;++y){const $=w[y],re=$.start,C=$.count;for(let F=re,z=re+C;F<z;F+=3)M(n[F+0]),M(n[F+1]),M(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const r=new O,s=new O,o=new O,a=new O,l=new O,c=new O,d=new O,h=new O;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(d),l.add(d),c.add(d),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),d.subVectors(o,s),h.subVectors(r,s),d.cross(h),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)lt.fromBufferAttribute(e,t),lt.normalize(),e.setXYZ(t,lt.x,lt.y,lt.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,f=new c.constructor(l.length*d);let p=0,_=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*d;for(let u=0;u<d;u++)f[_++]=c[p++]}return new Vt(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new fn,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=e(f,n);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let f=0,p=h.length;f<p;f++)d.push(h[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ua=new dt,vn=new oc,Ni=new ts,fa=new O,Gn=new O,zn=new O,Vn=new O,Ir=new O,Ui=new O,Oi=new qe,Fi=new qe,Bi=new qe,pa=new O,ma=new O,ga=new O,Hi=new O,Gi=new O;class zt extends Rt{constructor(e=new fn,t=new Qi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ui.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=a[l],h=s[l];d!==0&&(Ir.fromBufferAttribute(h,e),o?Ui.addScaledVector(Ir,d):Ui.addScaledVector(Ir.sub(t),d))}t.add(Ui)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ni.copy(n.boundingSphere),Ni.applyMatrix4(s),vn.copy(e.ray).recast(e.near),!(Ni.containsPoint(vn.origin)===!1&&(vn.intersectSphere(Ni,fa)===null||vn.origin.distanceToSquared(fa)>(e.far-e.near)**2))&&(ua.copy(s).invert(),vn.copy(e.ray).applyMatrix4(ua),!(n.boundingBox!==null&&vn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,vn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],u=o[m.materialIndex],b=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let w=b,I=x;w<I;w+=3){const R=a.getX(w),A=a.getX(w+1),q=a.getX(w+2);r=zi(this,u,e,n,c,d,h,R,A,q),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=_,u=v;m<u;m+=3){const b=a.getX(m),x=a.getX(m+1),w=a.getX(m+2);r=zi(this,o,e,n,c,d,h,b,x,w),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],u=o[m.materialIndex],b=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let w=b,I=x;w<I;w+=3){const R=w,A=w+1,q=w+2;r=zi(this,u,e,n,c,d,h,R,A,q),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=_,u=v;m<u;m+=3){const b=m,x=m+1,w=m+2;r=zi(this,o,e,n,c,d,h,b,x,w),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function _c(i,e,t,n,r,s,o,a){let l;if(e.side===yt?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===un,a),l===null)return null;Gi.copy(a),Gi.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Gi);return c<t.near||c>t.far?null:{distance:c,point:Gi.clone(),object:i}}function zi(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,Gn),i.getVertexPosition(l,zn),i.getVertexPosition(c,Vn);const d=_c(i,e,t,n,Gn,zn,Vn,Hi);if(d){r&&(Oi.fromBufferAttribute(r,a),Fi.fromBufferAttribute(r,l),Bi.fromBufferAttribute(r,c),d.uv=Ot.getInterpolation(Hi,Gn,zn,Vn,Oi,Fi,Bi,new qe)),s&&(Oi.fromBufferAttribute(s,a),Fi.fromBufferAttribute(s,l),Bi.fromBufferAttribute(s,c),d.uv1=Ot.getInterpolation(Hi,Gn,zn,Vn,Oi,Fi,Bi,new qe),d.uv2=d.uv1),o&&(pa.fromBufferAttribute(o,a),ma.fromBufferAttribute(o,l),ga.fromBufferAttribute(o,c),d.normal=Ot.getInterpolation(Hi,Gn,zn,Vn,pa,ma,ga,new O),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new O,materialIndex:0};Ot.getNormal(Gn,zn,Vn,h.normal),d.face=h}return d}class Si extends fn{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],d=[],h=[];let f=0,p=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,r,o,2),_("x","z","y",1,-1,e,n,-t,r,o,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new kt(c,3)),this.setAttribute("normal",new kt(d,3)),this.setAttribute("uv",new kt(h,2));function _(v,m,u,b,x,w,I,R,A,q,M){const y=w/A,H=I/q,$=w/2,re=I/2,C=R/2,F=A+1,z=q+1;let W=0,k=0;const V=new O;for(let K=0;K<z;K++){const ee=K*H-re;for(let de=0;de<F;de++){const G=de*y-$;V[v]=G*b,V[m]=ee*x,V[u]=C,c.push(V.x,V.y,V.z),V[v]=0,V[m]=0,V[u]=R>0?1:-1,d.push(V.x,V.y,V.z),h.push(de/A),h.push(1-K/q),W+=1}}for(let K=0;K<q;K++)for(let ee=0;ee<A;ee++){const de=f+ee+F*K,G=f+ee+F*(K+1),X=f+(ee+1)+F*(K+1),le=f+(ee+1)+F*K;l.push(de,G,le),l.push(G,X,le),k+=6}a.addGroup(p,k,M),p+=k,f+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ti(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function vt(i){const e={};for(let t=0;t<i.length;t++){const n=ti(i[t]);for(const r in n)e[r]=n[r]}return e}function vc(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function uo(i){return i.getRenderTarget()===null?i.outputColorSpace:We.workingColorSpace}const xc={clone:ti,merge:vt};var Sc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Cn extends rr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sc,this.fragmentShader=Mc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ti(e.uniforms),this.uniformsGroups=vc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class fo extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=Jt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class It extends fo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=mi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return mi*2*Math.atan(Math.tan(hi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(hi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const kn=-90,Wn=1;class Ec extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new It(kn,Wn,e,t);r.layers=this.layers,this.add(r);const s=new It(kn,Wn,e,t);s.layers=this.layers,this.add(s);const o=new It(kn,Wn,e,t);o.layers=this.layers,this.add(o);const a=new It(kn,Wn,e,t);a.layers=this.layers,this.add(a);const l=new It(kn,Wn,e,t);l.layers=this.layers,this.add(l);const c=new It(kn,Wn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Jt)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zi)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(h,f,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class po extends bt{constructor(e,t,n,r,s,o,a,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:Jn,super(e,t,n,r,s,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yc extends Rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(fi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===en?it:Pt),this.texture=new po(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Et}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Si(5,5,5),s=new Cn({name:"CubemapFromEquirect",uniforms:ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yt,blending:dn});s.uniforms.tEquirect.value=t;const o=new zt(r,s),a=t.minFilter;return t.minFilter===wn&&(t.minFilter=Et),new Ec(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const Pr=new O,bc=new O,Tc=new He;class Sn{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Pr.subVectors(n,t).cross(bc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pr),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Tc.getNormalMatrix(e),r=this.coplanarPoint(Pr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xn=new ts,Vi=new O;class mo{constructor(e=new Sn,t=new Sn,n=new Sn,r=new Sn,s=new Sn,o=new Sn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jt){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],d=r[5],h=r[6],f=r[7],p=r[8],_=r[9],v=r[10],m=r[11],u=r[12],b=r[13],x=r[14],w=r[15];if(n[0].setComponents(l-s,f-c,m-p,w-u).normalize(),n[1].setComponents(l+s,f+c,m+p,w+u).normalize(),n[2].setComponents(l+o,f+d,m+_,w+b).normalize(),n[3].setComponents(l-o,f-d,m-_,w-b).normalize(),n[4].setComponents(l-a,f-h,m-v,w-x).normalize(),t===Jt)n[5].setComponents(l+a,f+h,m+v,w+x).normalize();else if(t===Zi)n[5].setComponents(a,h,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xn)}intersectsSprite(e){return xn.center.set(0,0,0),xn.radius=.7071067811865476,xn.applyMatrix4(e.matrixWorld),this.intersectsSphere(xn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Vi.x=r.normal.x>0?e.max.x:e.min.x,Vi.y=r.normal.y>0?e.max.y:e.min.y,Vi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Vi)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function go(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ac(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,d){const h=c.array,f=c.usage,p=h.byteLength,_=i.createBuffer();i.bindBuffer(d,_),i.bufferData(d,h,f),c.onUploadCallback();let v;if(h instanceof Float32Array)v=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)v=i.SHORT;else if(h instanceof Uint32Array)v=i.UNSIGNED_INT;else if(h instanceof Int32Array)v=i.INT;else if(h instanceof Int8Array)v=i.BYTE;else if(h instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,d,h){const f=d.array,p=d._updateRange,_=d.updateRanges;if(i.bindBuffer(h,c),p.count===-1&&_.length===0&&i.bufferSubData(h,0,f),_.length!==0){for(let v=0,m=_.length;v<m;v++){const u=_[v];t?i.bufferSubData(h,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):i.bufferSubData(h,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),d.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(i.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,r(c,d));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,d),h.version=c.version}}return{get:o,remove:a,update:l}}class ns extends fn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,d=l+1,h=e/a,f=t/l,p=[],_=[],v=[],m=[];for(let u=0;u<d;u++){const b=u*f-o;for(let x=0;x<c;x++){const w=x*h-s;_.push(w,-b,0),v.push(0,0,1),m.push(x/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let b=0;b<a;b++){const x=b+c*u,w=b+c*(u+1),I=b+1+c*(u+1),R=b+1+c*u;p.push(x,w,R),p.push(w,I,R)}this.setIndex(p),this.setAttribute("position",new kt(_,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ns(e.width,e.height,e.widthSegments,e.heightSegments)}}var wc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rc=`#ifdef USE_ALPHAHASH
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
#endif`,Cc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ic=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Pc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dc=`#ifdef USE_AOMAP
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
#endif`,Nc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uc=`#ifdef USE_BATCHING
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
#endif`,Oc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Fc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hc=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gc=`#ifdef USE_IRIDESCENCE
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
#endif`,zc=`#ifdef USE_BUMPMAP
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
#endif`,Vc=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$c=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,jc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Kc=`#define PI 3.141592653589793
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
} // validated`,Zc=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jc=`vec3 transformedNormal = objectNormal;
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
#endif`,Qc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ed=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,td=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,id="gl_FragColor = linearToOutputTexel( gl_FragColor );",rd=`
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
}`,sd=`#ifdef USE_ENVMAP
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
#endif`,ad=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,od=`#ifdef USE_ENVMAP
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
#endif`,ld=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cd=`#ifdef USE_ENVMAP
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
#endif`,dd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ud=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pd=`#ifdef USE_GRADIENTMAP
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
}`,md=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,gd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_d=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xd=`uniform bool receiveShadow;
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
#endif`,Sd=`#ifdef USE_ENVMAP
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
#endif`,Md=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ed=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Td=`PhysicalMaterial material;
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
#endif`,Ad=`struct PhysicalMaterial {
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
}`,wd=`
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
#endif`,Rd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Cd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ld=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Id=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Dd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Nd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ud=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Od=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fd=`#if defined( USE_POINTS_UV )
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
#endif`,Bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zd=`#ifdef USE_MORPHNORMALS
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
#endif`,Vd=`#ifdef USE_MORPHTARGETS
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
#endif`,kd=`#ifdef USE_MORPHTARGETS
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
#endif`,Wd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jd=`#ifdef USE_NORMALMAP
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
#endif`,Kd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,th=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ih=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ah=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ch=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hh=`float getShadowMask() {
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
}`,uh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fh=`#ifdef USE_SKINNING
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
#endif`,ph=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mh=`#ifdef USE_SKINNING
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
#endif`,gh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_h=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sh=`#ifdef USE_TRANSMISSION
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
#endif`,Mh=`#ifdef USE_TRANSMISSION
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
#endif`,Eh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Th=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ah=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wh=`uniform sampler2D t2D;
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
}`,Rh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ch=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ih=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ph=`#include <common>
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
}`,Dh=`#if DEPTH_PACKING == 3200
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
}`,Nh=`#define DISTANCE
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
}`,Uh=`#define DISTANCE
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
}`,Oh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bh=`uniform float scale;
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
}`,Hh=`uniform vec3 diffuse;
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
}`,Gh=`#include <common>
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
}`,zh=`uniform vec3 diffuse;
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
}`,Vh=`#define LAMBERT
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
}`,kh=`#define LAMBERT
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
}`,Wh=`#define MATCAP
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
}`,Xh=`#define MATCAP
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
}`,qh=`#define NORMAL
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
}`,Yh=`#define NORMAL
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
}`,$h=`#define PHONG
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
}`,jh=`#define PHONG
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
}`,Kh=`#define STANDARD
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
}`,Zh=`#define STANDARD
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
}`,Jh=`#define TOON
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
}`,Qh=`#define TOON
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
}`,eu=`uniform float size;
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
}`,tu=`uniform vec3 diffuse;
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
}`,nu=`#include <common>
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
}`,iu=`uniform vec3 color;
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
}`,ru=`uniform float rotation;
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
}`,su=`uniform vec3 diffuse;
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
}`,De={alphahash_fragment:wc,alphahash_pars_fragment:Rc,alphamap_fragment:Cc,alphamap_pars_fragment:Lc,alphatest_fragment:Ic,alphatest_pars_fragment:Pc,aomap_fragment:Dc,aomap_pars_fragment:Nc,batching_pars_vertex:Uc,batching_vertex:Oc,begin_vertex:Fc,beginnormal_vertex:Bc,bsdfs:Hc,iridescence_fragment:Gc,bumpmap_pars_fragment:zc,clipping_planes_fragment:Vc,clipping_planes_pars_fragment:kc,clipping_planes_pars_vertex:Wc,clipping_planes_vertex:Xc,color_fragment:qc,color_pars_fragment:Yc,color_pars_vertex:$c,color_vertex:jc,common:Kc,cube_uv_reflection_fragment:Zc,defaultnormal_vertex:Jc,displacementmap_pars_vertex:Qc,displacementmap_vertex:ed,emissivemap_fragment:td,emissivemap_pars_fragment:nd,colorspace_fragment:id,colorspace_pars_fragment:rd,envmap_fragment:sd,envmap_common_pars_fragment:ad,envmap_pars_fragment:od,envmap_pars_vertex:ld,envmap_physical_pars_fragment:Sd,envmap_vertex:cd,fog_vertex:dd,fog_pars_vertex:hd,fog_fragment:ud,fog_pars_fragment:fd,gradientmap_pars_fragment:pd,lightmap_fragment:md,lightmap_pars_fragment:gd,lights_lambert_fragment:_d,lights_lambert_pars_fragment:vd,lights_pars_begin:xd,lights_toon_fragment:Md,lights_toon_pars_fragment:Ed,lights_phong_fragment:yd,lights_phong_pars_fragment:bd,lights_physical_fragment:Td,lights_physical_pars_fragment:Ad,lights_fragment_begin:wd,lights_fragment_maps:Rd,lights_fragment_end:Cd,logdepthbuf_fragment:Ld,logdepthbuf_pars_fragment:Id,logdepthbuf_pars_vertex:Pd,logdepthbuf_vertex:Dd,map_fragment:Nd,map_pars_fragment:Ud,map_particle_fragment:Od,map_particle_pars_fragment:Fd,metalnessmap_fragment:Bd,metalnessmap_pars_fragment:Hd,morphcolor_vertex:Gd,morphnormal_vertex:zd,morphtarget_pars_vertex:Vd,morphtarget_vertex:kd,normal_fragment_begin:Wd,normal_fragment_maps:Xd,normal_pars_fragment:qd,normal_pars_vertex:Yd,normal_vertex:$d,normalmap_pars_fragment:jd,clearcoat_normal_fragment_begin:Kd,clearcoat_normal_fragment_maps:Zd,clearcoat_pars_fragment:Jd,iridescence_pars_fragment:Qd,opaque_fragment:eh,packing:th,premultiplied_alpha_fragment:nh,project_vertex:ih,dithering_fragment:rh,dithering_pars_fragment:sh,roughnessmap_fragment:ah,roughnessmap_pars_fragment:oh,shadowmap_pars_fragment:lh,shadowmap_pars_vertex:ch,shadowmap_vertex:dh,shadowmask_pars_fragment:hh,skinbase_vertex:uh,skinning_pars_vertex:fh,skinning_vertex:ph,skinnormal_vertex:mh,specularmap_fragment:gh,specularmap_pars_fragment:_h,tonemapping_fragment:vh,tonemapping_pars_fragment:xh,transmission_fragment:Sh,transmission_pars_fragment:Mh,uv_pars_fragment:Eh,uv_pars_vertex:yh,uv_vertex:bh,worldpos_vertex:Th,background_vert:Ah,background_frag:wh,backgroundCube_vert:Rh,backgroundCube_frag:Ch,cube_vert:Lh,cube_frag:Ih,depth_vert:Ph,depth_frag:Dh,distanceRGBA_vert:Nh,distanceRGBA_frag:Uh,equirect_vert:Oh,equirect_frag:Fh,linedashed_vert:Bh,linedashed_frag:Hh,meshbasic_vert:Gh,meshbasic_frag:zh,meshlambert_vert:Vh,meshlambert_frag:kh,meshmatcap_vert:Wh,meshmatcap_frag:Xh,meshnormal_vert:qh,meshnormal_frag:Yh,meshphong_vert:$h,meshphong_frag:jh,meshphysical_vert:Kh,meshphysical_frag:Zh,meshtoon_vert:Jh,meshtoon_frag:Qh,points_vert:eu,points_frag:tu,shadow_vert:nu,shadow_frag:iu,sprite_vert:ru,sprite_frag:su},ie={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Gt={basic:{uniforms:vt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:vt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:vt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:vt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:vt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Xe(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:vt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:vt([ie.points,ie.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:vt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:vt([ie.common,ie.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:vt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:vt([ie.sprite,ie.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:vt([ie.common,ie.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:vt([ie.lights,ie.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};Gt.physical={uniforms:vt([Gt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const ki={r:0,b:0,g:0};function au(i,e,t,n,r,s,o){const a=new Xe(0);let l=s===!0?0:1,c,d,h=null,f=0,p=null;function _(m,u){let b=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?t:e).get(x)),x===null?v(a,l):x&&x.isColor&&(v(x,1),b=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||b)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===tr)?(d===void 0&&(d=new zt(new Si(1,1,1),new Cn({name:"BackgroundCubeMaterial",uniforms:ti(Gt.backgroundCube.uniforms),vertexShader:Gt.backgroundCube.vertexShader,fragmentShader:Gt.backgroundCube.fragmentShader,side:yt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.toneMapped=We.getTransfer(x.colorSpace)!==Ke,(h!==x||f!==x.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,h=x,f=x.version,p=i.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new zt(new ns(2,2),new Cn({name:"BackgroundMaterial",uniforms:ti(Gt.background.uniforms),vertexShader:Gt.background.vertexShader,fragmentShader:Gt.background.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=We.getTransfer(x.colorSpace)!==Ke,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,u){m.getRGB(ki,uo(i)),n.buffers.color.setClear(ki.r,ki.g,ki.b,u,o)}return{getClearColor:function(){return a},setClearColor:function(m,u=1){a.set(m),l=u,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(a,l)},render:_}}function ou(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,d=!1;function h(C,F,z,W,k){let V=!1;if(o){const K=v(W,z,F);c!==K&&(c=K,p(c.object)),V=u(C,W,z,k),V&&b(C,W,z,k)}else{const K=F.wireframe===!0;(c.geometry!==W.id||c.program!==z.id||c.wireframe!==K)&&(c.geometry=W.id,c.program=z.id,c.wireframe=K,V=!0)}k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(V||d)&&(d=!1,q(C,F,z,W),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(C){return n.isWebGL2?i.bindVertexArray(C):s.bindVertexArrayOES(C)}function _(C){return n.isWebGL2?i.deleteVertexArray(C):s.deleteVertexArrayOES(C)}function v(C,F,z){const W=z.wireframe===!0;let k=a[C.id];k===void 0&&(k={},a[C.id]=k);let V=k[F.id];V===void 0&&(V={},k[F.id]=V);let K=V[W];return K===void 0&&(K=m(f()),V[W]=K),K}function m(C){const F=[],z=[],W=[];for(let k=0;k<r;k++)F[k]=0,z[k]=0,W[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:W,object:C,attributes:{},index:null}}function u(C,F,z,W){const k=c.attributes,V=F.attributes;let K=0;const ee=z.getAttributes();for(const de in ee)if(ee[de].location>=0){const X=k[de];let le=V[de];if(le===void 0&&(de==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),de==="instanceColor"&&C.instanceColor&&(le=C.instanceColor)),X===void 0||X.attribute!==le||le&&X.data!==le.data)return!0;K++}return c.attributesNum!==K||c.index!==W}function b(C,F,z,W){const k={},V=F.attributes;let K=0;const ee=z.getAttributes();for(const de in ee)if(ee[de].location>=0){let X=V[de];X===void 0&&(de==="instanceMatrix"&&C.instanceMatrix&&(X=C.instanceMatrix),de==="instanceColor"&&C.instanceColor&&(X=C.instanceColor));const le={};le.attribute=X,X&&X.data&&(le.data=X.data),k[de]=le,K++}c.attributes=k,c.attributesNum=K,c.index=W}function x(){const C=c.newAttributes;for(let F=0,z=C.length;F<z;F++)C[F]=0}function w(C){I(C,0)}function I(C,F){const z=c.newAttributes,W=c.enabledAttributes,k=c.attributeDivisors;z[C]=1,W[C]===0&&(i.enableVertexAttribArray(C),W[C]=1),k[C]!==F&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,F),k[C]=F)}function R(){const C=c.newAttributes,F=c.enabledAttributes;for(let z=0,W=F.length;z<W;z++)F[z]!==C[z]&&(i.disableVertexAttribArray(z),F[z]=0)}function A(C,F,z,W,k,V,K){K===!0?i.vertexAttribIPointer(C,F,z,k,V):i.vertexAttribPointer(C,F,z,W,k,V)}function q(C,F,z,W){if(n.isWebGL2===!1&&(C.isInstancedMesh||W.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const k=W.attributes,V=z.getAttributes(),K=F.defaultAttributeValues;for(const ee in V){const de=V[ee];if(de.location>=0){let G=k[ee];if(G===void 0&&(ee==="instanceMatrix"&&C.instanceMatrix&&(G=C.instanceMatrix),ee==="instanceColor"&&C.instanceColor&&(G=C.instanceColor)),G!==void 0){const X=G.normalized,le=G.itemSize,_e=t.get(G);if(_e===void 0)continue;const ge=_e.buffer,Ce=_e.type,Ie=_e.bytesPerElement,ye=n.isWebGL2===!0&&(Ce===i.INT||Ce===i.UNSIGNED_INT||G.gpuType===$a);if(G.isInterleavedBufferAttribute){const ze=G.data,P=ze.stride,pt=G.offset;if(ze.isInstancedInterleavedBuffer){for(let xe=0;xe<de.locationSize;xe++)I(de.location+xe,ze.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let xe=0;xe<de.locationSize;xe++)w(de.location+xe);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let xe=0;xe<de.locationSize;xe++)A(de.location+xe,le/de.locationSize,Ce,X,P*Ie,(pt+le/de.locationSize*xe)*Ie,ye)}else{if(G.isInstancedBufferAttribute){for(let ze=0;ze<de.locationSize;ze++)I(de.location+ze,G.meshPerAttribute);C.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let ze=0;ze<de.locationSize;ze++)w(de.location+ze);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let ze=0;ze<de.locationSize;ze++)A(de.location+ze,le/de.locationSize,Ce,X,le*Ie,le/de.locationSize*ze*Ie,ye)}}else if(K!==void 0){const X=K[ee];if(X!==void 0)switch(X.length){case 2:i.vertexAttrib2fv(de.location,X);break;case 3:i.vertexAttrib3fv(de.location,X);break;case 4:i.vertexAttrib4fv(de.location,X);break;default:i.vertexAttrib1fv(de.location,X)}}}}R()}function M(){$();for(const C in a){const F=a[C];for(const z in F){const W=F[z];for(const k in W)_(W[k].object),delete W[k];delete F[z]}delete a[C]}}function y(C){if(a[C.id]===void 0)return;const F=a[C.id];for(const z in F){const W=F[z];for(const k in W)_(W[k].object),delete W[k];delete F[z]}delete a[C.id]}function H(C){for(const F in a){const z=a[F];if(z[C.id]===void 0)continue;const W=z[C.id];for(const k in W)_(W[k].object),delete W[k];delete z[C.id]}}function $(){re(),d=!0,c!==l&&(c=l,p(c.object))}function re(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:$,resetDefaultState:re,dispose:M,releaseStatesOfGeometry:y,releaseStatesOfProgram:H,initAttributes:x,enableAttribute:w,disableUnusedAttributes:R}}function lu(i,e,t,n){const r=n.isWebGL2;let s;function o(d){s=d}function a(d,h){i.drawArrays(s,d,h),t.update(h,s,1)}function l(d,h,f){if(f===0)return;let p,_;if(r)p=i,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](s,d,h,f),t.update(h,s,f)}function c(d,h,f){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f;_++)this.render(d[_],h[_]);else{p.multiDrawArraysWEBGL(s,d,0,h,0,f);let _=0;for(let v=0;v<f;v++)_+=h[v];t.update(_,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function cu(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),v=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,w=o||e.has("OES_texture_float"),I=x&&w,R=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:b,vertexTextures:x,floatFragmentTextures:w,floatVertexTextures:I,maxSamples:R}}function du(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Sn,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||r;return r=f,n=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,p){const _=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,u=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?d(null):c();else{const b=s?0:n,x=b*4;let w=u.clippingState||null;l.value=w,w=d(_,f,x,p);for(let I=0;I!==x;++I)w[I]=t[I];u.clippingState=w,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,f,p,_){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const u=p+v*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<u)&&(m=new Float32Array(u));for(let x=0,w=p;x!==v;++x,w+=4)o.copy(h[x]).applyMatrix4(b,a),o.normal.toArray(m,w),m[w+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function hu(i){let e=new WeakMap;function t(o,a){return a===Wr?o.mapping=Jn:a===Xr&&(o.mapping=Qn),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wr||a===Xr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new yc(l.height/2);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class uu extends fo{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Yn=4,_a=[.125,.215,.35,.446,.526,.582],yn=20,Dr=new uu,va=new Xe;let Nr=null,Ur=0,Or=0;const Mn=(1+Math.sqrt(5))/2,Xn=1/Mn,xa=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,Mn,Xn),new O(0,Mn,-Xn),new O(Xn,0,Mn),new O(-Xn,0,Mn),new O(Mn,Xn,0),new O(-Mn,Xn,0)];class Sa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Nr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Or=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ya(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ea(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nr,Ur,Or),e.scissorTest=!1,Wi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Jn||e.mapping===Qn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nr=this._renderer.getRenderTarget(),Ur=this._renderer.getActiveCubeFace(),Or=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Et,minFilter:Et,generateMipmaps:!1,type:pi,format:Bt,colorSpace:tn,depthBuffer:!1},r=Ma(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ma(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fu(s)),this._blurMaterial=pu(s,e,t)}return r}_compileMaterial(e){const t=new zt(this._lodPlanes[0],e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,r){const a=new It(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(va),d.toneMapping=Qt,d.autoClear=!1;const p=new Qi({name:"PMREM.Background",side:yt,depthWrite:!1,depthTest:!1}),_=new zt(new Si,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(va),v=!0);for(let u=0;u<6;u++){const b=u%3;b===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):b===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));const x=this._cubeSize;Wi(r,b*x,u>2?x:0,x,x),d.setRenderTarget(r),v&&d.render(_,a),d.render(e,a)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Jn||e.mapping===Qn;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ya()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ea());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new zt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Wi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=xa[(r-1)%xa.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new zt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*yn-1),v=s/_,m=isFinite(s)?1+Math.floor(d*v):yn;m>yn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${yn}`);const u=[];let b=0;for(let A=0;A<yn;++A){const q=A/v,M=Math.exp(-q*q/2);u.push(M),A===0?b+=M:A<m&&(b+=2*M)}for(let A=0;A<u.length;A++)u[A]=u[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-n;const w=this._sizeLods[r],I=3*w*(r>x-Yn?r-x+Yn:0),R=4*(this._cubeSize-w);Wi(t,I,R,3*w,2*w),l.setRenderTarget(t),l.render(h,Dr)}}function fu(i){const e=[],t=[],n=[];let r=i;const s=i-Yn+1+_a.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Yn?l=_a[o-i+Yn-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,_=6,v=3,m=2,u=1,b=new Float32Array(v*_*p),x=new Float32Array(m*_*p),w=new Float32Array(u*_*p);for(let R=0;R<p;R++){const A=R%3*2/3-1,q=R>2?0:-1,M=[A,q,0,A+2/3,q,0,A+2/3,q+1,0,A,q,0,A+2/3,q+1,0,A,q+1,0];b.set(M,v*_*R),x.set(f,m*_*R);const y=[R,R,R,R,R,R];w.set(y,u*_*R)}const I=new fn;I.setAttribute("position",new Vt(b,v)),I.setAttribute("uv",new Vt(x,m)),I.setAttribute("faceIndex",new Vt(w,u)),e.push(I),r>Yn&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ma(i,e,t){const n=new Rn(i,e,t);return n.texture.mapping=tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function pu(i,e,t){const n=new Float32Array(yn),r=new O(0,1,0);return new Cn({name:"SphericalGaussianBlur",defines:{n:yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:is(),fragmentShader:`

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
		`,blending:dn,depthTest:!1,depthWrite:!1})}function Ea(){return new Cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:is(),fragmentShader:`

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
		`,blending:dn,depthTest:!1,depthWrite:!1})}function ya(){return new Cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dn,depthTest:!1,depthWrite:!1})}function is(){return`

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
	`}function mu(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Wr||l===Xr,d=l===Jn||l===Qn;if(c||d)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new Sa(i)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||d&&h&&r(h)){t===null&&(t=new Sa(i));const f=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",s),f.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function gu(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function _u(i,e,t,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const v=f.morphAttributes[_];for(let m=0,u=v.length;m<u;m++)e.remove(v[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)e.update(f[_],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const v=p[_];for(let m=0,u=v.length;m<u;m++)e.update(v[m],i.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,_=h.attributes.position;let v=0;if(p!==null){const b=p.array;v=p.version;for(let x=0,w=b.length;x<w;x+=3){const I=b[x+0],R=b[x+1],A=b[x+2];f.push(I,R,R,A,A,I)}}else if(_!==void 0){const b=_.array;v=_.version;for(let x=0,w=b.length/3-1;x<w;x+=3){const I=x+0,R=x+1,A=x+2;f.push(I,R,R,A,A,I)}}else return;const m=new(io(f)?ho:co)(f,1);m.version=v;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function d(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function vu(i,e,t,n){const r=n.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function d(p,_){i.drawElements(s,_,a,p*l),t.update(_,s,1)}function h(p,_,v){if(v===0)return;let m,u;if(r)m=i,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](s,_,a,p*l,v),t.update(_,s,v)}function f(p,_,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<v;u++)this.render(p[u]/l,_[u]);else{m.multiDrawElementsWEBGL(s,_,0,a,p,0,v);let u=0;for(let b=0;b<v;b++)u+=_[b];t.update(u,s,1)}}this.setMode=o,this.setIndex=c,this.render=d,this.renderInstances=h,this.renderMultiDraw=f}function xu(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Su(i,e){return i[0]-e[0]}function Mu(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Eu(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,o=new ct,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,d,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=p!==void 0?p.length:0;let v=s.get(d);if(v===void 0||v.count!==_){let C=function(){$.dispose(),s.delete(d),d.removeEventListener("dispose",C)};v!==void 0&&v.texture.dispose();const b=d.morphAttributes.position!==void 0,x=d.morphAttributes.normal!==void 0,w=d.morphAttributes.color!==void 0,I=d.morphAttributes.position||[],R=d.morphAttributes.normal||[],A=d.morphAttributes.color||[];let q=0;b===!0&&(q=1),x===!0&&(q=2),w===!0&&(q=3);let M=d.attributes.position.count*q,y=1;M>e.maxTextureSize&&(y=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const H=new Float32Array(M*y*4*_),$=new ao(H,M,y,_);$.type=cn,$.needsUpdate=!0;const re=q*4;for(let F=0;F<_;F++){const z=I[F],W=R[F],k=A[F],V=M*y*4*F;for(let K=0;K<z.count;K++){const ee=K*re;b===!0&&(o.fromBufferAttribute(z,K),H[V+ee+0]=o.x,H[V+ee+1]=o.y,H[V+ee+2]=o.z,H[V+ee+3]=0),x===!0&&(o.fromBufferAttribute(W,K),H[V+ee+4]=o.x,H[V+ee+5]=o.y,H[V+ee+6]=o.z,H[V+ee+7]=0),w===!0&&(o.fromBufferAttribute(k,K),H[V+ee+8]=o.x,H[V+ee+9]=o.y,H[V+ee+10]=o.z,H[V+ee+11]=k.itemSize===4?o.w:1)}}v={count:_,texture:$,size:new qe(M,y)},s.set(d,v),d.addEventListener("dispose",C)}let m=0;for(let b=0;b<f.length;b++)m+=f[b];const u=d.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",u),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",v.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}else{const p=f===void 0?0:f.length;let _=n[d.id];if(_===void 0||_.length!==p){_=[];for(let x=0;x<p;x++)_[x]=[x,0];n[d.id]=_}for(let x=0;x<p;x++){const w=_[x];w[0]=x,w[1]=f[x]}_.sort(Mu);for(let x=0;x<8;x++)x<p&&_[x][1]?(a[x][0]=_[x][0],a[x][1]=_[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(Su);const v=d.morphAttributes.position,m=d.morphAttributes.normal;let u=0;for(let x=0;x<8;x++){const w=a[x],I=w[0],R=w[1];I!==Number.MAX_SAFE_INTEGER&&R?(v&&d.getAttribute("morphTarget"+x)!==v[I]&&d.setAttribute("morphTarget"+x,v[I]),m&&d.getAttribute("morphNormal"+x)!==m[I]&&d.setAttribute("morphNormal"+x,m[I]),r[x]=R,u+=R):(v&&d.hasAttribute("morphTarget"+x)===!0&&d.deleteAttribute("morphTarget"+x),m&&d.hasAttribute("morphNormal"+x)===!0&&d.deleteAttribute("morphNormal"+x),r[x]=0)}const b=d.morphTargetsRelative?1:1-u;h.getUniforms().setValue(i,"morphTargetBaseInfluence",b),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function yu(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class _o extends bt{constructor(e,t,n,r,s,o,a,l,c,d){if(d=d!==void 0?d:An,d!==An&&d!==ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===An&&(n=ln),n===void 0&&d===ei&&(n=Tn),super(null,r,s,o,a,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const vo=new bt,xo=new _o(1,1);xo.compareFunction=no;const So=new ao,Mo=new sc,Eo=new po,ba=[],Ta=[],Aa=new Float32Array(16),wa=new Float32Array(9),Ra=new Float32Array(4);function ri(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=ba[r];if(s===void 0&&(s=new Float32Array(r),ba[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function st(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function sr(i,e){let t=Ta[e];t===void 0&&(t=new Int32Array(e),Ta[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function bu(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Tu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2fv(this.addr,e),st(t,e)}}function Au(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rt(t,e))return;i.uniform3fv(this.addr,e),st(t,e)}}function wu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4fv(this.addr,e),st(t,e)}}function Ru(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;Ra.set(n),i.uniformMatrix2fv(this.addr,!1,Ra),st(t,n)}}function Cu(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;wa.set(n),i.uniformMatrix3fv(this.addr,!1,wa),st(t,n)}}function Lu(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),st(t,e)}else{if(rt(t,n))return;Aa.set(n),i.uniformMatrix4fv(this.addr,!1,Aa),st(t,n)}}function Iu(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Pu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2iv(this.addr,e),st(t,e)}}function Du(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;i.uniform3iv(this.addr,e),st(t,e)}}function Nu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4iv(this.addr,e),st(t,e)}}function Uu(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ou(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rt(t,e))return;i.uniform2uiv(this.addr,e),st(t,e)}}function Fu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rt(t,e))return;i.uniform3uiv(this.addr,e),st(t,e)}}function Bu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rt(t,e))return;i.uniform4uiv(this.addr,e),st(t,e)}}function Hu(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?xo:vo;t.setTexture2D(e||s,r)}function Gu(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Mo,r)}function zu(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Eo,r)}function Vu(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||So,r)}function ku(i){switch(i){case 5126:return bu;case 35664:return Tu;case 35665:return Au;case 35666:return wu;case 35674:return Ru;case 35675:return Cu;case 35676:return Lu;case 5124:case 35670:return Iu;case 35667:case 35671:return Pu;case 35668:case 35672:return Du;case 35669:case 35673:return Nu;case 5125:return Uu;case 36294:return Ou;case 36295:return Fu;case 36296:return Bu;case 35678:case 36198:case 36298:case 36306:case 35682:return Hu;case 35679:case 36299:case 36307:return Gu;case 35680:case 36300:case 36308:case 36293:return zu;case 36289:case 36303:case 36311:case 36292:return Vu}}function Wu(i,e){i.uniform1fv(this.addr,e)}function Xu(i,e){const t=ri(e,this.size,2);i.uniform2fv(this.addr,t)}function qu(i,e){const t=ri(e,this.size,3);i.uniform3fv(this.addr,t)}function Yu(i,e){const t=ri(e,this.size,4);i.uniform4fv(this.addr,t)}function $u(i,e){const t=ri(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ju(i,e){const t=ri(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ku(i,e){const t=ri(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Zu(i,e){i.uniform1iv(this.addr,e)}function Ju(i,e){i.uniform2iv(this.addr,e)}function Qu(i,e){i.uniform3iv(this.addr,e)}function ef(i,e){i.uniform4iv(this.addr,e)}function tf(i,e){i.uniform1uiv(this.addr,e)}function nf(i,e){i.uniform2uiv(this.addr,e)}function rf(i,e){i.uniform3uiv(this.addr,e)}function sf(i,e){i.uniform4uiv(this.addr,e)}function af(i,e,t){const n=this.cache,r=e.length,s=sr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||vo,s[o])}function of(i,e,t){const n=this.cache,r=e.length,s=sr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Mo,s[o])}function lf(i,e,t){const n=this.cache,r=e.length,s=sr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Eo,s[o])}function cf(i,e,t){const n=this.cache,r=e.length,s=sr(t,r);rt(n,s)||(i.uniform1iv(this.addr,s),st(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||So,s[o])}function df(i){switch(i){case 5126:return Wu;case 35664:return Xu;case 35665:return qu;case 35666:return Yu;case 35674:return $u;case 35675:return ju;case 35676:return Ku;case 5124:case 35670:return Zu;case 35667:case 35671:return Ju;case 35668:case 35672:return Qu;case 35669:case 35673:return ef;case 5125:return tf;case 36294:return nf;case 36295:return rf;case 36296:return sf;case 35678:case 36198:case 36298:case 36306:case 35682:return af;case 35679:case 36299:case 36307:return of;case 35680:case 36300:case 36308:case 36293:return lf;case 36289:case 36303:case 36311:case 36292:return cf}}class hf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ku(t.type)}}class uf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=df(t.type)}}class ff{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Fr=/(\w+)(\])?(\[|\.)?/g;function Ca(i,e){i.seq.push(e),i.map[e.id]=e}function pf(i,e,t){const n=i.name,r=n.length;for(Fr.lastIndex=0;;){const s=Fr.exec(n),o=Fr.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Ca(t,c===void 0?new hf(a,i,e):new uf(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new ff(a),Ca(t,h)),t=h}}}class qi{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);pf(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function La(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const mf=37297;let gf=0;function _f(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function vf(i){const e=We.getPrimaries(We.workingColorSpace),t=We.getPrimaries(i);let n;switch(e===t?n="":e===Ki&&t===ji?n="LinearDisplayP3ToLinearSRGB":e===ji&&t===Ki&&(n="LinearSRGBToLinearDisplayP3"),i){case tn:case nr:return[n,"LinearTransferOETF"];case it:case Qr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Ia(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+_f(i.getShaderSource(e),o)}else return r}function xf(i,e){const t=vf(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Sf(i,e){let t;switch(e){case ml:t="Linear";break;case gl:t="Reinhard";break;case _l:t="OptimizedCineon";break;case qa:t="ACESFilmic";break;case xl:t="AgX";break;case vl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Mf(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter($n).join(`
`)}function Ef(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter($n).join(`
`)}function yf(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function bf(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function $n(i){return i!==""}function Pa(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Da(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kr(i){return i.replace(Tf,wf)}const Af=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wf(i,e){let t=De[e];if(t===void 0){const n=Af.get(e);if(n!==void 0)t=De[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Kr(t)}const Rf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Na(i){return i.replace(Rf,Cf)}function Cf(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ua(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Lf(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wa?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ko?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Kt&&(e="SHADOWMAP_TYPE_VSM"),e}function If(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Jn:case Qn:e="ENVMAP_TYPE_CUBE";break;case tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Pf(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Qn:e="ENVMAP_MODE_REFRACTION";break}return e}function Df(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Xa:e="ENVMAP_BLENDING_MULTIPLY";break;case fl:e="ENVMAP_BLENDING_MIX";break;case pl:e="ENVMAP_BLENDING_ADD";break}return e}function Nf(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Uf(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Lf(t),c=If(t),d=Pf(t),h=Df(t),f=Nf(t),p=t.isWebGL2?"":Mf(t),_=Ef(t),v=yf(s),m=r.createProgram();let u,b,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter($n).join(`
`),u.length>0&&(u+=`
`),b=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter($n).join(`
`),b.length>0&&(b+=`
`)):(u=[Ua(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($n).join(`
`),b=[p,Ua(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qt?"#define TONE_MAPPING":"",t.toneMapping!==Qt?De.tonemapping_pars_fragment:"",t.toneMapping!==Qt?Sf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,xf("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($n).join(`
`)),o=Kr(o),o=Pa(o,t),o=Da(o,t),a=Kr(a),a=Pa(a,t),a=Da(a,t),o=Na(o),a=Na(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Js?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Js?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const w=x+u+o,I=x+b+a,R=La(r,r.VERTEX_SHADER,w),A=La(r,r.FRAGMENT_SHADER,I);r.attachShader(m,R),r.attachShader(m,A),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function q($){if(i.debug.checkShaderErrors){const re=r.getProgramInfoLog(m).trim(),C=r.getShaderInfoLog(R).trim(),F=r.getShaderInfoLog(A).trim();let z=!0,W=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,R,A);else{const k=Ia(r,R,"vertex"),V=Ia(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+re+`
`+k+`
`+V)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(C===""||F==="")&&(W=!1);W&&($.diagnostics={runnable:z,programLog:re,vertexShader:{log:C,prefix:u},fragmentShader:{log:F,prefix:b}})}r.deleteShader(R),r.deleteShader(A),M=new qi(r,m),y=bf(r,m)}let M;this.getUniforms=function(){return M===void 0&&q(this),M};let y;this.getAttributes=function(){return y===void 0&&q(this),y};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=r.getProgramParameter(m,mf)),H},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gf++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=R,this.fragmentShader=A,this}let Of=0;class Ff{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Bf(e),t.set(e,n)),n}}class Bf{constructor(e){this.id=Of++,this.code=e,this.usedTimes=0}}function Hf(i,e,t,n,r,s,o){const a=new oo,l=new Ff,c=[],d=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return M===0?"uv":`uv${M}`}function m(M,y,H,$,re){const C=$.fog,F=re.geometry,z=M.isMeshStandardMaterial?$.environment:null,W=(M.isMeshStandardMaterial?t:e).get(M.envMap||z),k=W&&W.mapping===tr?W.image.height:null,V=_[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const K=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ee=K!==void 0?K.length:0;let de=0;F.morphAttributes.position!==void 0&&(de=1),F.morphAttributes.normal!==void 0&&(de=2),F.morphAttributes.color!==void 0&&(de=3);let G,X,le,_e;if(V){const mt=Gt[V];G=mt.vertexShader,X=mt.fragmentShader}else G=M.vertexShader,X=M.fragmentShader,l.update(M),le=l.getVertexShaderID(M),_e=l.getFragmentShaderID(M);const ge=i.getRenderTarget(),Ce=re.isInstancedMesh===!0,Ie=re.isBatchedMesh===!0,ye=!!M.map,ze=!!M.matcap,P=!!W,pt=!!M.aoMap,xe=!!M.lightMap,we=!!M.bumpMap,fe=!!M.normalMap,Ze=!!M.displacementMap,Ne=!!M.emissiveMap,E=!!M.metalnessMap,g=!!M.roughnessMap,N=M.anisotropy>0,Z=M.clearcoat>0,j=M.iridescence>0,Q=M.sheen>0,pe=M.transmission>0,oe=N&&!!M.anisotropyMap,he=Z&&!!M.clearcoatMap,Ee=Z&&!!M.clearcoatNormalMap,Ue=Z&&!!M.clearcoatRoughnessMap,Y=j&&!!M.iridescenceMap,ke=j&&!!M.iridescenceThicknessMap,Ge=Q&&!!M.sheenColorMap,Ae=Q&&!!M.sheenRoughnessMap,ve=!!M.specularMap,ue=!!M.specularColorMap,Pe=!!M.specularIntensityMap,Ve=pe&&!!M.transmissionMap,Qe=pe&&!!M.thicknessMap,Fe=!!M.gradientMap,ne=!!M.alphaMap,T=M.alphaTest>0,se=!!M.alphaHash,ae=!!M.extensions,be=!!F.attributes.uv1,Se=!!F.attributes.uv2,Ye=!!F.attributes.uv3;let $e=Qt;return M.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&($e=i.toneMapping),{isWebGL2:d,shaderID:V,shaderType:M.type,shaderName:M.name,vertexShader:G,fragmentShader:X,defines:M.defines,customVertexShaderID:le,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ie,instancing:Ce,instancingColor:Ce&&re.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:tn,map:ye,matcap:ze,envMap:P,envMapMode:P&&W.mapping,envMapCubeUVHeight:k,aoMap:pt,lightMap:xe,bumpMap:we,normalMap:fe,displacementMap:f&&Ze,emissiveMap:Ne,normalMapObjectSpace:fe&&M.normalMapType===Pl,normalMapTangentSpace:fe&&M.normalMapType===Il,metalnessMap:E,roughnessMap:g,anisotropy:N,anisotropyMap:oe,clearcoat:Z,clearcoatMap:he,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Ue,iridescence:j,iridescenceMap:Y,iridescenceThicknessMap:ke,sheen:Q,sheenColorMap:Ge,sheenRoughnessMap:Ae,specularMap:ve,specularColorMap:ue,specularIntensityMap:Pe,transmission:pe,transmissionMap:Ve,thicknessMap:Qe,gradientMap:Fe,opaque:M.transparent===!1&&M.blending===jn,alphaMap:ne,alphaTest:T,alphaHash:se,combine:M.combine,mapUv:ye&&v(M.map.channel),aoMapUv:pt&&v(M.aoMap.channel),lightMapUv:xe&&v(M.lightMap.channel),bumpMapUv:we&&v(M.bumpMap.channel),normalMapUv:fe&&v(M.normalMap.channel),displacementMapUv:Ze&&v(M.displacementMap.channel),emissiveMapUv:Ne&&v(M.emissiveMap.channel),metalnessMapUv:E&&v(M.metalnessMap.channel),roughnessMapUv:g&&v(M.roughnessMap.channel),anisotropyMapUv:oe&&v(M.anisotropyMap.channel),clearcoatMapUv:he&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&v(M.sheenRoughnessMap.channel),specularMapUv:ve&&v(M.specularMap.channel),specularColorMapUv:ue&&v(M.specularColorMap.channel),specularIntensityMapUv:Pe&&v(M.specularIntensityMap.channel),transmissionMapUv:Ve&&v(M.transmissionMap.channel),thicknessMapUv:Qe&&v(M.thicknessMap.channel),alphaMapUv:ne&&v(M.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(fe||N),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:be,vertexUv2s:Se,vertexUv3s:Ye,pointsUvs:re.isPoints===!0&&!!F.attributes.uv&&(ye||ne),fog:!!C,useFog:M.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:re.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:de,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&H.length>0,shadowMapType:i.shadowMap.type,toneMapping:$e,useLegacyLights:i._useLegacyLights,decodeVideoTexture:ye&&M.map.isVideoTexture===!0&&We.getTransfer(M.map.colorSpace)===Ke,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Zt,flipSided:M.side===yt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ae&&M.extensions.derivatives===!0,extensionFragDepth:ae&&M.extensions.fragDepth===!0,extensionDrawBuffers:ae&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function u(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const H in M.defines)y.push(H),y.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(b(y,M),x(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function b(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){a.disableAll(),y.isWebGL2&&a.enable(0),y.supportsVertexTextures&&a.enable(1),y.instancing&&a.enable(2),y.instancingColor&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function w(M){const y=_[M.type];let H;if(y){const $=Gt[y];H=xc.clone($.uniforms)}else H=M.uniforms;return H}function I(M,y){let H;for(let $=0,re=c.length;$<re;$++){const C=c[$];if(C.cacheKey===y){H=C,++H.usedTimes;break}}return H===void 0&&(H=new Uf(i,y,M,s),c.push(H)),H}function R(M){if(--M.usedTimes===0){const y=c.indexOf(M);c[y]=c[c.length-1],c.pop(),M.destroy()}}function A(M){l.remove(M)}function q(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:w,acquireProgram:I,releaseProgram:R,releaseShaderCache:A,programs:c,dispose:q}}function Gf(){let i=new WeakMap;function e(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function t(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function zf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Oa(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fa(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,f,p,_,v,m){let u=i[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:p,groupOrder:_,renderOrder:h.renderOrder,z:v,group:m},i[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=p,u.groupOrder=_,u.renderOrder=h.renderOrder,u.z=v,u.group=m),e++,u}function a(h,f,p,_,v,m){const u=o(h,f,p,_,v,m);p.transmission>0?n.push(u):p.transparent===!0?r.push(u):t.push(u)}function l(h,f,p,_,v,m){const u=o(h,f,p,_,v,m);p.transmission>0?n.unshift(u):p.transparent===!0?r.unshift(u):t.unshift(u)}function c(h,f){t.length>1&&t.sort(h||zf),n.length>1&&n.sort(f||Oa),r.length>1&&r.sort(f||Oa)}function d(){for(let h=e,f=i.length;h<f;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:d,sort:c}}function Vf(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Fa,i.set(n,[o])):r>=s.length?(o=new Fa,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function kf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Xe};break;case"SpotLight":t={position:new O,direction:new O,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function Wf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Xf=0;function qf(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Yf(i,e){const t=new kf,n=Wf(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new O);const s=new O,o=new dt,a=new dt;function l(d,h){let f=0,p=0,_=0;for(let $=0;$<9;$++)r.probe[$].set(0,0,0);let v=0,m=0,u=0,b=0,x=0,w=0,I=0,R=0,A=0,q=0,M=0;d.sort(qf);const y=h===!0?Math.PI:1;for(let $=0,re=d.length;$<re;$++){const C=d[$],F=C.color,z=C.intensity,W=C.distance,k=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)f+=F.r*z*y,p+=F.g*z*y,_+=F.b*z*y;else if(C.isLightProbe){for(let V=0;V<9;V++)r.probe[V].addScaledVector(C.sh.coefficients[V],z);M++}else if(C.isDirectionalLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity*y),C.castShadow){const K=C.shadow,ee=n.get(C);ee.shadowBias=K.bias,ee.shadowNormalBias=K.normalBias,ee.shadowRadius=K.radius,ee.shadowMapSize=K.mapSize,r.directionalShadow[v]=ee,r.directionalShadowMap[v]=k,r.directionalShadowMatrix[v]=C.shadow.matrix,w++}r.directional[v]=V,v++}else if(C.isSpotLight){const V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(F).multiplyScalar(z*y),V.distance=W,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,r.spot[u]=V;const K=C.shadow;if(C.map&&(r.spotLightMap[A]=C.map,A++,K.updateMatrices(C),C.castShadow&&q++),r.spotLightMatrix[u]=K.matrix,C.castShadow){const ee=n.get(C);ee.shadowBias=K.bias,ee.shadowNormalBias=K.normalBias,ee.shadowRadius=K.radius,ee.shadowMapSize=K.mapSize,r.spotShadow[u]=ee,r.spotShadowMap[u]=k,R++}u++}else if(C.isRectAreaLight){const V=t.get(C);V.color.copy(F).multiplyScalar(z),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),r.rectArea[b]=V,b++}else if(C.isPointLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity*y),V.distance=C.distance,V.decay=C.decay,C.castShadow){const K=C.shadow,ee=n.get(C);ee.shadowBias=K.bias,ee.shadowNormalBias=K.normalBias,ee.shadowRadius=K.radius,ee.shadowMapSize=K.mapSize,ee.shadowCameraNear=K.camera.near,ee.shadowCameraFar=K.camera.far,r.pointShadow[m]=ee,r.pointShadowMap[m]=k,r.pointShadowMatrix[m]=C.shadow.matrix,I++}r.point[m]=V,m++}else if(C.isHemisphereLight){const V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(z*y),V.groundColor.copy(C.groundColor).multiplyScalar(z*y),r.hemi[x]=V,x++}}b>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ie.LTC_FLOAT_1,r.rectAreaLTC2=ie.LTC_FLOAT_2):(r.rectAreaLTC1=ie.LTC_HALF_1,r.rectAreaLTC2=ie.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ie.LTC_FLOAT_1,r.rectAreaLTC2=ie.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=ie.LTC_HALF_1,r.rectAreaLTC2=ie.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=p,r.ambient[2]=_;const H=r.hash;(H.directionalLength!==v||H.pointLength!==m||H.spotLength!==u||H.rectAreaLength!==b||H.hemiLength!==x||H.numDirectionalShadows!==w||H.numPointShadows!==I||H.numSpotShadows!==R||H.numSpotMaps!==A||H.numLightProbes!==M)&&(r.directional.length=v,r.spot.length=u,r.rectArea.length=b,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=w,r.directionalShadowMap.length=w,r.pointShadow.length=I,r.pointShadowMap.length=I,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=w,r.pointShadowMatrix.length=I,r.spotLightMatrix.length=R+A-q,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=q,r.numLightProbes=M,H.directionalLength=v,H.pointLength=m,H.spotLength=u,H.rectAreaLength=b,H.hemiLength=x,H.numDirectionalShadows=w,H.numPointShadows=I,H.numSpotShadows=R,H.numSpotMaps=A,H.numLightProbes=M,r.version=Xf++)}function c(d,h){let f=0,p=0,_=0,v=0,m=0;const u=h.matrixWorldInverse;for(let b=0,x=d.length;b<x;b++){const w=d[b];if(w.isDirectionalLight){const I=r.directional[f];I.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(u),f++}else if(w.isSpotLight){const I=r.spot[_];I.position.setFromMatrixPosition(w.matrixWorld),I.position.applyMatrix4(u),I.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(u),_++}else if(w.isRectAreaLight){const I=r.rectArea[v];I.position.setFromMatrixPosition(w.matrixWorld),I.position.applyMatrix4(u),a.identity(),o.copy(w.matrixWorld),o.premultiply(u),a.extractRotation(o),I.halfWidth.set(w.width*.5,0,0),I.halfHeight.set(0,w.height*.5,0),I.halfWidth.applyMatrix4(a),I.halfHeight.applyMatrix4(a),v++}else if(w.isPointLight){const I=r.point[p];I.position.setFromMatrixPosition(w.matrixWorld),I.position.applyMatrix4(u),p++}else if(w.isHemisphereLight){const I=r.hemi[m];I.direction.setFromMatrixPosition(w.matrixWorld),I.direction.transformDirection(u),m++}}}return{setup:l,setupView:c,state:r}}function Ba(i,e){const t=new Yf(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function o(h){n.push(h)}function a(h){r.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function $f(i,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Ba(i,e),t.set(s,[l])):o>=a.length?(l=new Ba(i,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class jf extends rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Kf extends rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Zf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jf=`uniform sampler2D shadow_pass;
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
}`;function Qf(i,e,t){let n=new mo;const r=new qe,s=new qe,o=new ct,a=new jf({depthPacking:Ll}),l=new Kf,c={},d=t.maxTextureSize,h={[un]:yt,[yt]:un,[Zt]:Zt},f=new Cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:Zf,fragmentShader:Jf}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new fn;_.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new zt(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wa;let u=this.type;this.render=function(R,A,q){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),H=i.getActiveMipmapLevel(),$=i.state;$.setBlending(dn),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const re=u!==Kt&&this.type===Kt,C=u===Kt&&this.type!==Kt;for(let F=0,z=R.length;F<z;F++){const W=R[F],k=W.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const V=k.getFrameExtents();if(r.multiply(V),s.copy(k.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/V.x),r.x=s.x*V.x,k.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/V.y),r.y=s.y*V.y,k.mapSize.y=s.y)),k.map===null||re===!0||C===!0){const ee=this.type!==Kt?{minFilter:St,magFilter:St}:{};k.map!==null&&k.map.dispose(),k.map=new Rn(r.x,r.y,ee),k.map.texture.name=W.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const K=k.getViewportCount();for(let ee=0;ee<K;ee++){const de=k.getViewport(ee);o.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),$.viewport(o),k.updateMatrices(W,ee),n=k.getFrustum(),w(A,q,k.camera,W,this.type)}k.isPointLightShadow!==!0&&this.type===Kt&&b(k,q),k.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(M,y,H)};function b(R,A){const q=e.update(v);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Rn(r.x,r.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(A,null,q,f,v,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(A,null,q,p,v,null)}function x(R,A,q,M){let y=null;const H=q.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(H!==void 0)y=H;else if(y=q.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const $=y.uuid,re=A.uuid;let C=c[$];C===void 0&&(C={},c[$]=C);let F=C[re];F===void 0&&(F=y.clone(),C[re]=F,A.addEventListener("dispose",I)),y=F}if(y.visible=A.visible,y.wireframe=A.wireframe,M===Kt?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:h[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,q.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const $=i.properties.get(y);$.light=q}return y}function w(R,A,q,M,y){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Kt)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,R.matrixWorld);const re=e.update(R),C=R.material;if(Array.isArray(C)){const F=re.groups;for(let z=0,W=F.length;z<W;z++){const k=F[z],V=C[k.materialIndex];if(V&&V.visible){const K=x(R,V,M,y);R.onBeforeShadow(i,R,A,q,re,K,k),i.renderBufferDirect(q,null,re,K,R,k),R.onAfterShadow(i,R,A,q,re,K,k)}}}else if(C.visible){const F=x(R,C,M,y);R.onBeforeShadow(i,R,A,q,re,F,null),i.renderBufferDirect(q,null,re,F,R,null),R.onAfterShadow(i,R,A,q,re,F,null)}}const $=R.children;for(let re=0,C=$.length;re<C;re++)w($[re],A,q,M,y)}function I(R){R.target.removeEventListener("dispose",I);for(const q in c){const M=c[q],y=R.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}function ep(i,e,t){const n=t.isWebGL2;function r(){let T=!1;const se=new ct;let ae=null;const be=new ct(0,0,0,0);return{setMask:function(Se){ae!==Se&&!T&&(i.colorMask(Se,Se,Se,Se),ae=Se)},setLocked:function(Se){T=Se},setClear:function(Se,Ye,$e,at,mt){mt===!0&&(Se*=at,Ye*=at,$e*=at),se.set(Se,Ye,$e,at),be.equals(se)===!1&&(i.clearColor(Se,Ye,$e,at),be.copy(se))},reset:function(){T=!1,ae=null,be.set(-1,0,0,0)}}}function s(){let T=!1,se=null,ae=null,be=null;return{setTest:function(Se){Se?Ie(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(Se){se!==Se&&!T&&(i.depthMask(Se),se=Se)},setFunc:function(Se){if(ae!==Se){switch(Se){case al:i.depthFunc(i.NEVER);break;case ol:i.depthFunc(i.ALWAYS);break;case ll:i.depthFunc(i.LESS);break;case Yi:i.depthFunc(i.LEQUAL);break;case cl:i.depthFunc(i.EQUAL);break;case dl:i.depthFunc(i.GEQUAL);break;case hl:i.depthFunc(i.GREATER);break;case ul:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=Se}},setLocked:function(Se){T=Se},setClear:function(Se){be!==Se&&(i.clearDepth(Se),be=Se)},reset:function(){T=!1,se=null,ae=null,be=null}}}function o(){let T=!1,se=null,ae=null,be=null,Se=null,Ye=null,$e=null,at=null,mt=null;return{setTest:function(je){T||(je?Ie(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(je){se!==je&&!T&&(i.stencilMask(je),se=je)},setFunc:function(je,gt,Ht){(ae!==je||be!==gt||Se!==Ht)&&(i.stencilFunc(je,gt,Ht),ae=je,be=gt,Se=Ht)},setOp:function(je,gt,Ht){(Ye!==je||$e!==gt||at!==Ht)&&(i.stencilOp(je,gt,Ht),Ye=je,$e=gt,at=Ht)},setLocked:function(je){T=je},setClear:function(je){mt!==je&&(i.clearStencil(je),mt=je)},reset:function(){T=!1,se=null,ae=null,be=null,Se=null,Ye=null,$e=null,at=null,mt=null}}}const a=new r,l=new s,c=new o,d=new WeakMap,h=new WeakMap;let f={},p={},_=new WeakMap,v=[],m=null,u=!1,b=null,x=null,w=null,I=null,R=null,A=null,q=null,M=new Xe(0,0,0),y=0,H=!1,$=null,re=null,C=null,F=null,z=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,V=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(K)[1]),k=V>=1):K.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),k=V>=2);let ee=null,de={};const G=i.getParameter(i.SCISSOR_BOX),X=i.getParameter(i.VIEWPORT),le=new ct().fromArray(G),_e=new ct().fromArray(X);function ge(T,se,ae,be){const Se=new Uint8Array(4),Ye=i.createTexture();i.bindTexture(T,Ye),i.texParameteri(T,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(T,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $e=0;$e<ae;$e++)n&&(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)?i.texImage3D(se,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(se+$e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return Ye}const Ce={};Ce[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),Ce[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ce[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ce[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ie(i.DEPTH_TEST),l.setFunc(Yi),Ne(!1),E(vs),Ie(i.CULL_FACE),fe(dn);function Ie(T){f[T]!==!0&&(i.enable(T),f[T]=!0)}function ye(T){f[T]!==!1&&(i.disable(T),f[T]=!1)}function ze(T,se){return p[T]!==se?(i.bindFramebuffer(T,se),p[T]=se,n&&(T===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=se),T===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=se)),!0):!1}function P(T,se){let ae=v,be=!1;if(T)if(ae=_.get(se),ae===void 0&&(ae=[],_.set(se,ae)),T.isWebGLMultipleRenderTargets){const Se=T.texture;if(ae.length!==Se.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Ye=0,$e=Se.length;Ye<$e;Ye++)ae[Ye]=i.COLOR_ATTACHMENT0+Ye;ae.length=Se.length,be=!0}}else ae[0]!==i.COLOR_ATTACHMENT0&&(ae[0]=i.COLOR_ATTACHMENT0,be=!0);else ae[0]!==i.BACK&&(ae[0]=i.BACK,be=!0);be&&(t.isWebGL2?i.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function pt(T){return m!==T?(i.useProgram(T),m=T,!0):!1}const xe={[En]:i.FUNC_ADD,[Xo]:i.FUNC_SUBTRACT,[qo]:i.FUNC_REVERSE_SUBTRACT};if(n)xe[Es]=i.MIN,xe[ys]=i.MAX;else{const T=e.get("EXT_blend_minmax");T!==null&&(xe[Es]=T.MIN_EXT,xe[ys]=T.MAX_EXT)}const we={[Yo]:i.ZERO,[$o]:i.ONE,[jo]:i.SRC_COLOR,[Vr]:i.SRC_ALPHA,[tl]:i.SRC_ALPHA_SATURATE,[Qo]:i.DST_COLOR,[Zo]:i.DST_ALPHA,[Ko]:i.ONE_MINUS_SRC_COLOR,[kr]:i.ONE_MINUS_SRC_ALPHA,[el]:i.ONE_MINUS_DST_COLOR,[Jo]:i.ONE_MINUS_DST_ALPHA,[nl]:i.CONSTANT_COLOR,[il]:i.ONE_MINUS_CONSTANT_COLOR,[rl]:i.CONSTANT_ALPHA,[sl]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(T,se,ae,be,Se,Ye,$e,at,mt,je){if(T===dn){u===!0&&(ye(i.BLEND),u=!1);return}if(u===!1&&(Ie(i.BLEND),u=!0),T!==Wo){if(T!==b||je!==H){if((x!==En||R!==En)&&(i.blendEquation(i.FUNC_ADD),x=En,R=En),je)switch(T){case jn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFunc(i.ONE,i.ONE);break;case Ss:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ms:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}else switch(T){case jn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ss:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ms:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}w=null,I=null,A=null,q=null,M.set(0,0,0),y=0,b=T,H=je}return}Se=Se||se,Ye=Ye||ae,$e=$e||be,(se!==x||Se!==R)&&(i.blendEquationSeparate(xe[se],xe[Se]),x=se,R=Se),(ae!==w||be!==I||Ye!==A||$e!==q)&&(i.blendFuncSeparate(we[ae],we[be],we[Ye],we[$e]),w=ae,I=be,A=Ye,q=$e),(at.equals(M)===!1||mt!==y)&&(i.blendColor(at.r,at.g,at.b,mt),M.copy(at),y=mt),b=T,H=!1}function Ze(T,se){T.side===Zt?ye(i.CULL_FACE):Ie(i.CULL_FACE);let ae=T.side===yt;se&&(ae=!ae),Ne(ae),T.blending===jn&&T.transparent===!1?fe(dn):fe(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),l.setFunc(T.depthFunc),l.setTest(T.depthTest),l.setMask(T.depthWrite),a.setMask(T.colorWrite);const be=T.stencilWrite;c.setTest(be),be&&(c.setMask(T.stencilWriteMask),c.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),c.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),N(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?Ie(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(T){$!==T&&(T?i.frontFace(i.CW):i.frontFace(i.CCW),$=T)}function E(T){T!==zo?(Ie(i.CULL_FACE),T!==re&&(T===vs?i.cullFace(i.BACK):T===Vo?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),re=T}function g(T){T!==C&&(k&&i.lineWidth(T),C=T)}function N(T,se,ae){T?(Ie(i.POLYGON_OFFSET_FILL),(F!==se||z!==ae)&&(i.polygonOffset(se,ae),F=se,z=ae)):ye(i.POLYGON_OFFSET_FILL)}function Z(T){T?Ie(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function j(T){T===void 0&&(T=i.TEXTURE0+W-1),ee!==T&&(i.activeTexture(T),ee=T)}function Q(T,se,ae){ae===void 0&&(ee===null?ae=i.TEXTURE0+W-1:ae=ee);let be=de[ae];be===void 0&&(be={type:void 0,texture:void 0},de[ae]=be),(be.type!==T||be.texture!==se)&&(ee!==ae&&(i.activeTexture(ae),ee=ae),i.bindTexture(T,se||Ce[T]),be.type=T,be.texture=se)}function pe(){const T=de[ee];T!==void 0&&T.type!==void 0&&(i.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)}function oe(){try{i.compressedTexImage2D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Ee(){try{i.texSubImage2D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Ue(){try{i.texSubImage3D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Y(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function ke(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Ge(){try{i.texStorage2D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function ve(){try{i.texImage2D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function ue(){try{i.texImage3D.apply(i,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Pe(T){le.equals(T)===!1&&(i.scissor(T.x,T.y,T.z,T.w),le.copy(T))}function Ve(T){_e.equals(T)===!1&&(i.viewport(T.x,T.y,T.z,T.w),_e.copy(T))}function Qe(T,se){let ae=h.get(se);ae===void 0&&(ae=new WeakMap,h.set(se,ae));let be=ae.get(T);be===void 0&&(be=i.getUniformBlockIndex(se,T.name),ae.set(T,be))}function Fe(T,se){const be=h.get(se).get(T);d.get(se)!==be&&(i.uniformBlockBinding(se,be,T.__bindingPointIndex),d.set(se,be))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ee=null,de={},p={},_=new WeakMap,v=[],m=null,u=!1,b=null,x=null,w=null,I=null,R=null,A=null,q=null,M=new Xe(0,0,0),y=0,H=!1,$=null,re=null,C=null,F=null,z=null,le.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ie,disable:ye,bindFramebuffer:ze,drawBuffers:P,useProgram:pt,setBlending:fe,setMaterial:Ze,setFlipSided:Ne,setCullFace:E,setLineWidth:g,setPolygonOffset:N,setScissorTest:Z,activeTexture:j,bindTexture:Q,unbindTexture:pe,compressedTexImage2D:oe,compressedTexImage3D:he,texImage2D:ve,texImage3D:ue,updateUBOMapping:Qe,uniformBlockBinding:Fe,texStorage2D:Ge,texStorage3D:Ae,texSubImage2D:Ee,texSubImage3D:Ue,compressedTexSubImage2D:Y,compressedTexSubImage3D:ke,scissor:Pe,viewport:Ve,reset:ne}}function tp(i,e,t,n,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,g){return p?new OffscreenCanvas(E,g):gi("canvas")}function v(E,g,N,Z){let j=1;if((E.width>Z||E.height>Z)&&(j=Z/Math.max(E.width,E.height)),j<1||g===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const Q=g?Ji:Math.floor,pe=Q(j*E.width),oe=Q(j*E.height);h===void 0&&(h=_(pe,oe));const he=N?_(pe,oe):h;return he.width=pe,he.height=oe,he.getContext("2d").drawImage(E,0,0,pe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+pe+"x"+oe+")."),he}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return jr(E.width)&&jr(E.height)}function u(E){return a?!1:E.wrapS!==Ft||E.wrapT!==Ft||E.minFilter!==St&&E.minFilter!==Et}function b(E,g){return E.generateMipmaps&&g&&E.minFilter!==St&&E.minFilter!==Et}function x(E){i.generateMipmap(E)}function w(E,g,N,Z,j=!1){if(a===!1)return g;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Q=g;if(g===i.RED&&(N===i.FLOAT&&(Q=i.R32F),N===i.HALF_FLOAT&&(Q=i.R16F),N===i.UNSIGNED_BYTE&&(Q=i.R8)),g===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.R8UI),N===i.UNSIGNED_SHORT&&(Q=i.R16UI),N===i.UNSIGNED_INT&&(Q=i.R32UI),N===i.BYTE&&(Q=i.R8I),N===i.SHORT&&(Q=i.R16I),N===i.INT&&(Q=i.R32I)),g===i.RG&&(N===i.FLOAT&&(Q=i.RG32F),N===i.HALF_FLOAT&&(Q=i.RG16F),N===i.UNSIGNED_BYTE&&(Q=i.RG8)),g===i.RGBA){const pe=j?$i:We.getTransfer(Z);N===i.FLOAT&&(Q=i.RGBA32F),N===i.HALF_FLOAT&&(Q=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Q=pe===Ke?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function I(E,g,N){return b(E,N)===!0||E.isFramebufferTexture&&E.minFilter!==St&&E.minFilter!==Et?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function R(E){return E===St||E===bs||E===dr?i.NEAREST:i.LINEAR}function A(E){const g=E.target;g.removeEventListener("dispose",A),M(g),g.isVideoTexture&&d.delete(g)}function q(E){const g=E.target;g.removeEventListener("dispose",q),H(g)}function M(E){const g=n.get(E);if(g.__webglInit===void 0)return;const N=E.source,Z=f.get(N);if(Z){const j=Z[g.__cacheKey];j.usedTimes--,j.usedTimes===0&&y(E),Object.keys(Z).length===0&&f.delete(N)}n.remove(E)}function y(E){const g=n.get(E);i.deleteTexture(g.__webglTexture);const N=E.source,Z=f.get(N);delete Z[g.__cacheKey],o.memory.textures--}function H(E){const g=E.texture,N=n.get(E),Z=n.get(g);if(Z.__webglTexture!==void 0&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(N.__webglFramebuffer[j]))for(let Q=0;Q<N.__webglFramebuffer[j].length;Q++)i.deleteFramebuffer(N.__webglFramebuffer[j][Q]);else i.deleteFramebuffer(N.__webglFramebuffer[j]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[j])}else{if(Array.isArray(N.__webglFramebuffer))for(let j=0;j<N.__webglFramebuffer.length;j++)i.deleteFramebuffer(N.__webglFramebuffer[j]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let j=0;j<N.__webglColorRenderbuffer.length;j++)N.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[j]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let j=0,Q=g.length;j<Q;j++){const pe=n.get(g[j]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),o.memory.textures--),n.remove(g[j])}n.remove(g),n.remove(E)}let $=0;function re(){$=0}function C(){const E=$;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),$+=1,E}function F(E){const g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function z(E,g){const N=n.get(E);if(E.isVideoTexture&&Ze(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const Z=E.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(N,E,g);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+g)}function W(E,g){const N=n.get(E);if(E.version>0&&N.__version!==E.version){le(N,E,g);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+g)}function k(E,g){const N=n.get(E);if(E.version>0&&N.__version!==E.version){le(N,E,g);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+g)}function V(E,g){const N=n.get(E);if(E.version>0&&N.__version!==E.version){_e(N,E,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+g)}const K={[qr]:i.REPEAT,[Ft]:i.CLAMP_TO_EDGE,[Yr]:i.MIRRORED_REPEAT},ee={[St]:i.NEAREST,[bs]:i.NEAREST_MIPMAP_NEAREST,[dr]:i.NEAREST_MIPMAP_LINEAR,[Et]:i.LINEAR,[Sl]:i.LINEAR_MIPMAP_NEAREST,[wn]:i.LINEAR_MIPMAP_LINEAR},de={[Dl]:i.NEVER,[Hl]:i.ALWAYS,[Nl]:i.LESS,[no]:i.LEQUAL,[Ul]:i.EQUAL,[Bl]:i.GEQUAL,[Ol]:i.GREATER,[Fl]:i.NOTEQUAL};function G(E,g,N){if(N?(i.texParameteri(E,i.TEXTURE_WRAP_S,K[g.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,K[g.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,K[g.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ee[g.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ee[g.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(g.wrapS!==Ft||g.wrapT!==Ft)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,R(g.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,R(g.minFilter)),g.minFilter!==St&&g.minFilter!==Et&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),g.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,de[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Z=e.get("EXT_texture_filter_anisotropic");if(g.magFilter===St||g.minFilter!==dr&&g.minFilter!==wn||g.type===cn&&e.has("OES_texture_float_linear")===!1||a===!1&&g.type===pi&&e.has("OES_texture_half_float_linear")===!1)return;(g.anisotropy>1||n.get(g).__currentAnisotropy)&&(i.texParameterf(E,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy)}}function X(E,g){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",A));const Z=g.source;let j=f.get(Z);j===void 0&&(j={},f.set(Z,j));const Q=F(g);if(Q!==E.__cacheKey){j[Q]===void 0&&(j[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,N=!0),j[Q].usedTimes++;const pe=j[E.__cacheKey];pe!==void 0&&(j[E.__cacheKey].usedTimes--,pe.usedTimes===0&&y(g)),E.__cacheKey=Q,E.__webglTexture=j[Q].texture}return N}function le(E,g,N){let Z=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(Z=i.TEXTURE_3D);const j=X(E,g),Q=g.source;t.bindTexture(Z,E.__webglTexture,i.TEXTURE0+N);const pe=n.get(Q);if(Q.version!==pe.__version||j===!0){t.activeTexture(i.TEXTURE0+N);const oe=We.getPrimaries(We.workingColorSpace),he=g.colorSpace===Pt?null:We.getPrimaries(g.colorSpace),Ee=g.colorSpace===Pt||oe===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Ue=u(g)&&m(g.image)===!1;let Y=v(g.image,Ue,!1,r.maxTextureSize);Y=Ne(g,Y);const ke=m(Y)||a,Ge=s.convert(g.format,g.colorSpace);let Ae=s.convert(g.type),ve=w(g.internalFormat,Ge,Ae,g.colorSpace,g.isVideoTexture);G(Z,g,ke);let ue;const Pe=g.mipmaps,Ve=a&&g.isVideoTexture!==!0&&ve!==eo,Qe=pe.__version===void 0||j===!0,Fe=I(g,Y,ke);if(g.isDepthTexture)ve=i.DEPTH_COMPONENT,a?g.type===cn?ve=i.DEPTH_COMPONENT32F:g.type===ln?ve=i.DEPTH_COMPONENT24:g.type===Tn?ve=i.DEPTH24_STENCIL8:ve=i.DEPTH_COMPONENT16:g.type===cn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),g.format===An&&ve===i.DEPTH_COMPONENT&&g.type!==Jr&&g.type!==ln&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),g.type=ln,Ae=s.convert(g.type)),g.format===ei&&ve===i.DEPTH_COMPONENT&&(ve=i.DEPTH_STENCIL,g.type!==Tn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),g.type=Tn,Ae=s.convert(g.type))),Qe&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,ve,Y.width,Y.height):t.texImage2D(i.TEXTURE_2D,0,ve,Y.width,Y.height,0,Ge,Ae,null));else if(g.isDataTexture)if(Pe.length>0&&ke){Ve&&Qe&&t.texStorage2D(i.TEXTURE_2D,Fe,ve,Pe[0].width,Pe[0].height);for(let ne=0,T=Pe.length;ne<T;ne++)ue=Pe[ne],Ve?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,Ge,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,ne,ve,ue.width,ue.height,0,Ge,Ae,ue.data);g.generateMipmaps=!1}else Ve?(Qe&&t.texStorage2D(i.TEXTURE_2D,Fe,ve,Y.width,Y.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Y.width,Y.height,Ge,Ae,Y.data)):t.texImage2D(i.TEXTURE_2D,0,ve,Y.width,Y.height,0,Ge,Ae,Y.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ve&&Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,ve,Pe[0].width,Pe[0].height,Y.depth);for(let ne=0,T=Pe.length;ne<T;ne++)ue=Pe[ne],g.format!==Bt?Ge!==null?Ve?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,Y.depth,Ge,ue.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,ve,ue.width,ue.height,Y.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,Y.depth,Ge,Ae,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,ve,ue.width,ue.height,Y.depth,0,Ge,Ae,ue.data)}else{Ve&&Qe&&t.texStorage2D(i.TEXTURE_2D,Fe,ve,Pe[0].width,Pe[0].height);for(let ne=0,T=Pe.length;ne<T;ne++)ue=Pe[ne],g.format!==Bt?Ge!==null?Ve?t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,Ge,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,Ge,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,ne,ve,ue.width,ue.height,0,Ge,Ae,ue.data)}else if(g.isDataArrayTexture)Ve?(Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,ve,Y.width,Y.height,Y.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,Ge,Ae,Y.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,Y.width,Y.height,Y.depth,0,Ge,Ae,Y.data);else if(g.isData3DTexture)Ve?(Qe&&t.texStorage3D(i.TEXTURE_3D,Fe,ve,Y.width,Y.height,Y.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,Ge,Ae,Y.data)):t.texImage3D(i.TEXTURE_3D,0,ve,Y.width,Y.height,Y.depth,0,Ge,Ae,Y.data);else if(g.isFramebufferTexture){if(Qe)if(Ve)t.texStorage2D(i.TEXTURE_2D,Fe,ve,Y.width,Y.height);else{let ne=Y.width,T=Y.height;for(let se=0;se<Fe;se++)t.texImage2D(i.TEXTURE_2D,se,ve,ne,T,0,Ge,Ae,null),ne>>=1,T>>=1}}else if(Pe.length>0&&ke){Ve&&Qe&&t.texStorage2D(i.TEXTURE_2D,Fe,ve,Pe[0].width,Pe[0].height);for(let ne=0,T=Pe.length;ne<T;ne++)ue=Pe[ne],Ve?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,Ge,Ae,ue):t.texImage2D(i.TEXTURE_2D,ne,ve,Ge,Ae,ue);g.generateMipmaps=!1}else Ve?(Qe&&t.texStorage2D(i.TEXTURE_2D,Fe,ve,Y.width,Y.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ge,Ae,Y)):t.texImage2D(i.TEXTURE_2D,0,ve,Ge,Ae,Y);b(g,ke)&&x(Z),pe.__version=Q.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function _e(E,g,N){if(g.image.length!==6)return;const Z=X(E,g),j=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);const Q=n.get(j);if(j.version!==Q.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const pe=We.getPrimaries(We.workingColorSpace),oe=g.colorSpace===Pt?null:We.getPrimaries(g.colorSpace),he=g.colorSpace===Pt||pe===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Ee=g.isCompressedTexture||g.image[0].isCompressedTexture,Ue=g.image[0]&&g.image[0].isDataTexture,Y=[];for(let ne=0;ne<6;ne++)!Ee&&!Ue?Y[ne]=v(g.image[ne],!1,!0,r.maxCubemapSize):Y[ne]=Ue?g.image[ne].image:g.image[ne],Y[ne]=Ne(g,Y[ne]);const ke=Y[0],Ge=m(ke)||a,Ae=s.convert(g.format,g.colorSpace),ve=s.convert(g.type),ue=w(g.internalFormat,Ae,ve,g.colorSpace),Pe=a&&g.isVideoTexture!==!0,Ve=Q.__version===void 0||Z===!0;let Qe=I(g,ke,Ge);G(i.TEXTURE_CUBE_MAP,g,Ge);let Fe;if(Ee){Pe&&Ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Qe,ue,ke.width,ke.height);for(let ne=0;ne<6;ne++){Fe=Y[ne].mipmaps;for(let T=0;T<Fe.length;T++){const se=Fe[T];g.format!==Bt?Ae!==null?Pe?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T,0,0,se.width,se.height,Ae,se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T,ue,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T,0,0,se.width,se.height,Ae,ve,se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T,ue,se.width,se.height,0,Ae,ve,se.data)}}}else{Fe=g.mipmaps,Pe&&Ve&&(Fe.length>0&&Qe++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Qe,ue,Y[0].width,Y[0].height));for(let ne=0;ne<6;ne++)if(Ue){Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Y[ne].width,Y[ne].height,Ae,ve,Y[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ue,Y[ne].width,Y[ne].height,0,Ae,ve,Y[ne].data);for(let T=0;T<Fe.length;T++){const ae=Fe[T].image[ne].image;Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T+1,0,0,ae.width,ae.height,Ae,ve,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T+1,ue,ae.width,ae.height,0,Ae,ve,ae.data)}}else{Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ae,ve,Y[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ue,Ae,ve,Y[ne]);for(let T=0;T<Fe.length;T++){const se=Fe[T];Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T+1,0,0,Ae,ve,se.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,T+1,ue,Ae,ve,se.image[ne])}}}b(g,Ge)&&x(i.TEXTURE_CUBE_MAP),Q.__version=j.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function ge(E,g,N,Z,j,Q){const pe=s.convert(N.format,N.colorSpace),oe=s.convert(N.type),he=w(N.internalFormat,pe,oe,N.colorSpace);if(!n.get(g).__hasExternalTextures){const Ue=Math.max(1,g.width>>Q),Y=Math.max(1,g.height>>Q);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,Q,he,Ue,Y,g.depth,0,pe,oe,null):t.texImage2D(j,Q,he,Ue,Y,0,pe,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),fe(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,j,n.get(N).__webglTexture,0,we(g)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,j,n.get(N).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(E,g,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),g.depthBuffer&&!g.stencilBuffer){let Z=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||fe(g)){const j=g.depthTexture;j&&j.isDepthTexture&&(j.type===cn?Z=i.DEPTH_COMPONENT32F:j.type===ln&&(Z=i.DEPTH_COMPONENT24));const Q=we(g);fe(g)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,Z,g.width,g.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,Z,g.width,g.height)}else i.renderbufferStorage(i.RENDERBUFFER,Z,g.width,g.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(g.depthBuffer&&g.stencilBuffer){const Z=we(g);N&&fe(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,g.width,g.height):fe(g)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const Z=g.isWebGLMultipleRenderTargets===!0?g.texture:[g.texture];for(let j=0;j<Z.length;j++){const Q=Z[j],pe=s.convert(Q.format,Q.colorSpace),oe=s.convert(Q.type),he=w(Q.internalFormat,pe,oe,Q.colorSpace),Ee=we(g);N&&fe(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,he,g.width,g.height):fe(g)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,he,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,he,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(E,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(g.depthTexture).__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),z(g.depthTexture,0);const Z=n.get(g.depthTexture).__webglTexture,j=we(g);if(g.depthTexture.format===An)fe(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(g.depthTexture.format===ei)fe(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function ye(E){const g=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ie(g.__webglFramebuffer,E)}else if(N){g.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[Z]),g.__webglDepthbuffer[Z]=i.createRenderbuffer(),Ce(g.__webglDepthbuffer[Z],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer=i.createRenderbuffer(),Ce(g.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(E,g,N){const Z=n.get(E);g!==void 0&&ge(Z.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&ye(E)}function P(E){const g=E.texture,N=n.get(E),Z=n.get(g);E.addEventListener("dispose",q),E.isWebGLMultipleRenderTargets!==!0&&(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=g.version,o.memory.textures++);const j=E.isWebGLCubeRenderTarget===!0,Q=E.isWebGLMultipleRenderTargets===!0,pe=m(E)||a;if(j){N.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[oe]=[];for(let he=0;he<g.mipmaps.length;he++)N.__webglFramebuffer[oe][he]=i.createFramebuffer()}else N.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(a&&g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let oe=0;oe<g.mipmaps.length;oe++)N.__webglFramebuffer[oe]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(Q)if(r.drawBuffers){const oe=E.texture;for(let he=0,Ee=oe.length;he<Ee;he++){const Ue=n.get(oe[he]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&fe(E)===!1){const oe=Q?g:[g];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let he=0;he<oe.length;he++){const Ee=oe[he];N.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[he]);const Ue=s.convert(Ee.format,Ee.colorSpace),Y=s.convert(Ee.type),ke=w(Ee.internalFormat,Ue,Y,Ee.colorSpace,E.isXRRenderTarget===!0),Ge=we(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,ke,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,N.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Ce(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),G(i.TEXTURE_CUBE_MAP,g,pe);for(let oe=0;oe<6;oe++)if(a&&g.mipmaps&&g.mipmaps.length>0)for(let he=0;he<g.mipmaps.length;he++)ge(N.__webglFramebuffer[oe][he],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else ge(N.__webglFramebuffer[oe],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);b(g,pe)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const oe=E.texture;for(let he=0,Ee=oe.length;he<Ee;he++){const Ue=oe[he],Y=n.get(Ue);t.bindTexture(i.TEXTURE_2D,Y.__webglTexture),G(i.TEXTURE_2D,Ue,pe),ge(N.__webglFramebuffer,E,Ue,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),b(Ue,pe)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?oe=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,Z.__webglTexture),G(oe,g,pe),a&&g.mipmaps&&g.mipmaps.length>0)for(let he=0;he<g.mipmaps.length;he++)ge(N.__webglFramebuffer[he],E,g,i.COLOR_ATTACHMENT0,oe,he);else ge(N.__webglFramebuffer,E,g,i.COLOR_ATTACHMENT0,oe,0);b(g,pe)&&x(oe),t.unbindTexture()}E.depthBuffer&&ye(E)}function pt(E){const g=m(E)||a,N=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Z=0,j=N.length;Z<j;Z++){const Q=N[Z];if(b(Q,g)){const pe=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,oe=n.get(Q).__webglTexture;t.bindTexture(pe,oe),x(pe),t.unbindTexture()}}}function xe(E){if(a&&E.samples>0&&fe(E)===!1){const g=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],N=E.width,Z=E.height;let j=i.COLOR_BUFFER_BIT;const Q=[],pe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(E),he=E.isWebGLMultipleRenderTargets===!0;if(he)for(let Ee=0;Ee<g.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Ee=0;Ee<g.length;Ee++){Q.push(i.COLOR_ATTACHMENT0+Ee),E.depthBuffer&&Q.push(pe);const Ue=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Ue===!1&&(E.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]),Ue===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[pe])),he){const Y=n.get(g[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Y,0)}i.blitFramebuffer(0,0,N,Z,0,0,N,Z,j,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Ee=0;Ee<g.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]);const Ue=n.get(g[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,Ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function we(E){return Math.min(r.maxSamples,E.samples)}function fe(E){const g=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Ze(E){const g=o.render.frame;d.get(E)!==g&&(d.set(E,g),E.update())}function Ne(E,g){const N=E.colorSpace,Z=E.format,j=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===$r||N!==tn&&N!==Pt&&(We.getTransfer(N)===Ke?a===!1?e.has("EXT_sRGB")===!0&&Z===Bt?(E.format=$r,E.minFilter=Et,E.generateMipmaps=!1):g=ro.sRGBToLinear(g):(Z!==Bt||j!==hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}this.allocateTextureUnit=C,this.resetTextureUnits=re,this.setTexture2D=z,this.setTexture2DArray=W,this.setTexture3D=k,this.setTextureCube=V,this.rebindTextures=ze,this.setupRenderTarget=P,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=ye,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=fe}function np(i,e,t){const n=t.isWebGL2;function r(s,o=Pt){let a;const l=We.getTransfer(o);if(s===hn)return i.UNSIGNED_BYTE;if(s===ja)return i.UNSIGNED_SHORT_4_4_4_4;if(s===Ka)return i.UNSIGNED_SHORT_5_5_5_1;if(s===Ml)return i.BYTE;if(s===El)return i.SHORT;if(s===Jr)return i.UNSIGNED_SHORT;if(s===$a)return i.INT;if(s===ln)return i.UNSIGNED_INT;if(s===cn)return i.FLOAT;if(s===pi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===yl)return i.ALPHA;if(s===Bt)return i.RGBA;if(s===bl)return i.LUMINANCE;if(s===Tl)return i.LUMINANCE_ALPHA;if(s===An)return i.DEPTH_COMPONENT;if(s===ei)return i.DEPTH_STENCIL;if(s===$r)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Al)return i.RED;if(s===Za)return i.RED_INTEGER;if(s===wl)return i.RG;if(s===Ja)return i.RG_INTEGER;if(s===Qa)return i.RGBA_INTEGER;if(s===hr||s===ur||s===fr||s===pr)if(l===Ke)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===hr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ur)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===fr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===pr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===hr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ur)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===fr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===pr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ts||s===As||s===ws||s===Rs)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ts)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===As)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===ws)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Rs)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===eo)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Cs||s===Ls)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Cs)return l===Ke?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ls)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Is||s===Ps||s===Ds||s===Ns||s===Us||s===Os||s===Fs||s===Bs||s===Hs||s===Gs||s===zs||s===Vs||s===ks||s===Ws)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Is)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ps)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ds)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ns)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Us)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Os)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Fs)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Bs)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Hs)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Gs)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===zs)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vs)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ks)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ws)return l===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===mr||s===Xs||s===qs)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===mr)return l===Ke?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Xs)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qs)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Rl||s===Ys||s===$s||s===js)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===mr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Ys)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===$s)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===js)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Tn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class ip extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Xi extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rp={type:"move"};class Br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),u=this._getHandJoint(c,v);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rp)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Xi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class sp extends ni{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,f=null,p=null,_=null;const v=t.getContextAttributes();let m=null,u=null;const b=[],x=[],w=new qe;let I=null;const R=new It;R.layers.enable(1),R.viewport=new ct;const A=new It;A.layers.enable(2),A.viewport=new ct;const q=[R,A],M=new ip;M.layers.enable(1),M.layers.enable(2);let y=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let X=b[G];return X===void 0&&(X=new Br,b[G]=X),X.getTargetRaySpace()},this.getControllerGrip=function(G){let X=b[G];return X===void 0&&(X=new Br,b[G]=X),X.getGripSpace()},this.getHand=function(G){let X=b[G];return X===void 0&&(X=new Br,b[G]=X),X.getHandSpace()};function $(G){const X=x.indexOf(G.inputSource);if(X===-1)return;const le=b[X];le!==void 0&&(le.update(G.inputSource,G.frame,c||o),le.dispatchEvent({type:G.type,data:G.inputSource}))}function re(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",re),r.removeEventListener("inputsourceschange",C);for(let G=0;G<b.length;G++){const X=x[G];X!==null&&(x[G]=null,b[G].disconnect(X))}y=null,H=null,e.setRenderTarget(m),p=null,f=null,h=null,r=null,u=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",re),r.addEventListener("inputsourceschange",C),v.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const X={antialias:r.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,X),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),u=new Rn(p.framebufferWidth,p.framebufferHeight,{format:Bt,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let X=null,le=null,_e=null;v.depth&&(_e=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=v.stencil?ei:An,le=v.stencil?Tn:ln);const ge={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(ge),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),u=new Rn(f.textureWidth,f.textureHeight,{format:Bt,type:hn,depthTexture:new _o(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Ce=e.properties.get(u);Ce.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),de.setContext(r),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function C(G){for(let X=0;X<G.removed.length;X++){const le=G.removed[X],_e=x.indexOf(le);_e>=0&&(x[_e]=null,b[_e].disconnect(le))}for(let X=0;X<G.added.length;X++){const le=G.added[X];let _e=x.indexOf(le);if(_e===-1){for(let Ce=0;Ce<b.length;Ce++)if(Ce>=x.length){x.push(le),_e=Ce;break}else if(x[Ce]===null){x[Ce]=le,_e=Ce;break}if(_e===-1)break}const ge=b[_e];ge&&ge.connect(le)}}const F=new O,z=new O;function W(G,X,le){F.setFromMatrixPosition(X.matrixWorld),z.setFromMatrixPosition(le.matrixWorld);const _e=F.distanceTo(z),ge=X.projectionMatrix.elements,Ce=le.projectionMatrix.elements,Ie=ge[14]/(ge[10]-1),ye=ge[14]/(ge[10]+1),ze=(ge[9]+1)/ge[5],P=(ge[9]-1)/ge[5],pt=(ge[8]-1)/ge[0],xe=(Ce[8]+1)/Ce[0],we=Ie*pt,fe=Ie*xe,Ze=_e/(-pt+xe),Ne=Ze*-pt;X.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Ne),G.translateZ(Ze),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const E=Ie+Ze,g=ye+Ze,N=we-Ne,Z=fe+(_e-Ne),j=ze*ye/g*E,Q=P*ye/g*E;G.projectionMatrix.makePerspective(N,Z,j,Q,E,g),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function k(G,X){X===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(X.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;M.near=A.near=R.near=G.near,M.far=A.far=R.far=G.far,(y!==M.near||H!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),y=M.near,H=M.far);const X=G.parent,le=M.cameras;k(M,X);for(let _e=0;_e<le.length;_e++)k(le[_e],X);le.length===2?W(M,R,A):M.projectionMatrix.copy(R.projectionMatrix),V(G,M,X)};function V(G,X,le){le===null?G.matrix.copy(X.matrixWorld):(G.matrix.copy(le.matrixWorld),G.matrix.invert(),G.matrix.multiply(X.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(X.projectionMatrix),G.projectionMatrixInverse.copy(X.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=mi*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)};let K=null;function ee(G,X){if(d=X.getViewerPose(c||o),_=X,d!==null){const le=d.views;p!==null&&(e.setRenderTargetFramebuffer(u,p.framebuffer),e.setRenderTarget(u));let _e=!1;le.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let ge=0;ge<le.length;ge++){const Ce=le[ge];let Ie=null;if(p!==null)Ie=p.getViewport(Ce);else{const ze=h.getViewSubImage(f,Ce);Ie=ze.viewport,ge===0&&(e.setRenderTargetTextures(u,ze.colorTexture,f.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(u))}let ye=q[ge];ye===void 0&&(ye=new It,ye.layers.enable(ge),ye.viewport=new ct,q[ge]=ye),ye.matrix.fromArray(Ce.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(Ce.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),ge===0&&(M.matrix.copy(ye.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(ye)}}for(let le=0;le<b.length;le++){const _e=x[le],ge=b[le];_e!==null&&ge!==void 0&&ge.update(_e,X,c||o)}K&&K(G,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),_=null}const de=new go;de.setAnimationLoop(ee),this.setAnimationLoop=function(G){K=G},this.dispose=function(){}}}function ap(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,uo(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,b,x,w){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),d(m,u)):u.isMeshStandardMaterial?(s(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,w)):u.isMeshMatcapMaterial?(s(m,u),_(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),v(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,b,x):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===yt&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===yt&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const b=e.get(u).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*x,t(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,b,x){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*b,m.scale.value=x*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,b){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===yt&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function v(m,u){const b=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function op(i,e,t,n){let r={},s={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,x){const w=x.program;n.uniformBlockBinding(b,w)}function c(b,x){let w=r[b.id];w===void 0&&(_(b),w=d(b),r[b.id]=w,b.addEventListener("dispose",m));const I=x.program;n.updateUBOMapping(b,I);const R=e.render.frame;s[b.id]!==R&&(f(b),s[b.id]=R)}function d(b){const x=h();b.__bindingPointIndex=x;const w=i.createBuffer(),I=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,I,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,w),w}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const x=r[b.id],w=b.uniforms,I=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let R=0,A=w.length;R<A;R++){const q=Array.isArray(w[R])?w[R]:[w[R]];for(let M=0,y=q.length;M<y;M++){const H=q[M];if(p(H,R,M,I)===!0){const $=H.__offset,re=Array.isArray(H.value)?H.value:[H.value];let C=0;for(let F=0;F<re.length;F++){const z=re[F],W=v(z);typeof z=="number"||typeof z=="boolean"?(H.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,$+C,H.__data)):z.isMatrix3?(H.__data[0]=z.elements[0],H.__data[1]=z.elements[1],H.__data[2]=z.elements[2],H.__data[3]=0,H.__data[4]=z.elements[3],H.__data[5]=z.elements[4],H.__data[6]=z.elements[5],H.__data[7]=0,H.__data[8]=z.elements[6],H.__data[9]=z.elements[7],H.__data[10]=z.elements[8],H.__data[11]=0):(z.toArray(H.__data,C),C+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,H.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,x,w,I){const R=b.value,A=x+"_"+w;if(I[A]===void 0)return typeof R=="number"||typeof R=="boolean"?I[A]=R:I[A]=R.clone(),!0;{const q=I[A];if(typeof R=="number"||typeof R=="boolean"){if(q!==R)return I[A]=R,!0}else if(q.equals(R)===!1)return q.copy(R),!0}return!1}function _(b){const x=b.uniforms;let w=0;const I=16;for(let A=0,q=x.length;A<q;A++){const M=Array.isArray(x[A])?x[A]:[x[A]];for(let y=0,H=M.length;y<H;y++){const $=M[y],re=Array.isArray($.value)?$.value:[$.value];for(let C=0,F=re.length;C<F;C++){const z=re[C],W=v(z),k=w%I;k!==0&&I-k<W.boundary&&(w+=I-k),$.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=w,w+=W.storage}}}const R=w%I;return R>0&&(w+=I-R),b.__size=w,b.__cache={},this}function v(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const w=o.indexOf(x.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function u(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class yo{constructor(e={}){const{canvas:t=ec(),context:n=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const p=new Uint32Array(4),_=new Int32Array(4);let v=null,m=null;const u=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=it,this._useLegacyLights=!1,this.toneMapping=Qt,this.toneMappingExposure=1;const x=this;let w=!1,I=0,R=0,A=null,q=-1,M=null;const y=new ct,H=new ct;let $=null;const re=new Xe(0);let C=0,F=t.width,z=t.height,W=1,k=null,V=null;const K=new ct(0,0,F,z),ee=new ct(0,0,F,z);let de=!1;const G=new mo;let X=!1,le=!1,_e=null;const ge=new dt,Ce=new qe,Ie=new O,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return A===null?W:1}let P=n;function pt(S,L){for(let U=0;U<S.length;U++){const B=S[U],D=t.getContext(B,L);if(D!==null)return D}return null}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zr}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",T,!1),t.addEventListener("webglcontextcreationerror",se,!1),P===null){const L=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&L.shift(),P=pt(L,S),P===null)throw pt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let xe,we,fe,Ze,Ne,E,g,N,Z,j,Q,pe,oe,he,Ee,Ue,Y,ke,Ge,Ae,ve,ue,Pe,Ve;function Qe(){xe=new gu(P),we=new cu(P,xe,e),xe.init(we),ue=new np(P,xe,we),fe=new ep(P,xe,we),Ze=new xu(P),Ne=new Gf,E=new tp(P,xe,fe,Ne,we,ue,Ze),g=new hu(x),N=new mu(x),Z=new Ac(P,we),Pe=new ou(P,xe,Z,we),j=new _u(P,Z,Ze,Pe),Q=new yu(P,j,Z,Ze),Ge=new Eu(P,we,E),Ue=new du(Ne),pe=new Hf(x,g,N,xe,we,Pe,Ue),oe=new ap(x,Ne),he=new Vf,Ee=new $f(xe,we),ke=new au(x,g,N,fe,Q,f,l),Y=new Qf(x,Q,we),Ve=new op(P,Ze,we,fe),Ae=new lu(P,xe,Ze,we),ve=new vu(P,xe,Ze,we),Ze.programs=pe.programs,x.capabilities=we,x.extensions=xe,x.properties=Ne,x.renderLists=he,x.shadowMap=Y,x.state=fe,x.info=Ze}Qe();const Fe=new sp(x,P);this.xr=Fe,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const S=xe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=xe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(F,z,!1))},this.getSize=function(S){return S.set(F,z)},this.setSize=function(S,L,U=!0){if(Fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=S,z=L,t.width=Math.floor(S*W),t.height=Math.floor(L*W),U===!0&&(t.style.width=S+"px",t.style.height=L+"px"),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(F*W,z*W).floor()},this.setDrawingBufferSize=function(S,L,U){F=S,z=L,W=U,t.width=Math.floor(S*U),t.height=Math.floor(L*U),this.setViewport(0,0,S,L)},this.getCurrentViewport=function(S){return S.copy(y)},this.getViewport=function(S){return S.copy(K)},this.setViewport=function(S,L,U,B){S.isVector4?K.set(S.x,S.y,S.z,S.w):K.set(S,L,U,B),fe.viewport(y.copy(K).multiplyScalar(W).floor())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,L,U,B){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,L,U,B),fe.scissor(H.copy(ee).multiplyScalar(W).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(S){fe.setScissorTest(de=S)},this.setOpaqueSort=function(S){k=S},this.setTransparentSort=function(S){V=S},this.getClearColor=function(S){return S.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor.apply(ke,arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha.apply(ke,arguments)},this.clear=function(S=!0,L=!0,U=!0){let B=0;if(S){let D=!1;if(A!==null){const ce=A.texture.format;D=ce===Qa||ce===Ja||ce===Za}if(D){const ce=A.texture.type,me=ce===hn||ce===ln||ce===Jr||ce===Tn||ce===ja||ce===Ka,Me=ke.getClearColor(),Te=ke.getClearAlpha(),Oe=Me.r,Re=Me.g,Le=Me.b;me?(p[0]=Oe,p[1]=Re,p[2]=Le,p[3]=Te,P.clearBufferuiv(P.COLOR,0,p)):(_[0]=Oe,_[1]=Re,_[2]=Le,_[3]=Te,P.clearBufferiv(P.COLOR,0,_))}else B|=P.COLOR_BUFFER_BIT}L&&(B|=P.DEPTH_BUFFER_BIT),U&&(B|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",T,!1),t.removeEventListener("webglcontextcreationerror",se,!1),he.dispose(),Ee.dispose(),Ne.dispose(),g.dispose(),N.dispose(),Q.dispose(),Pe.dispose(),Ve.dispose(),pe.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",mt),Fe.removeEventListener("sessionend",je),_e&&(_e.dispose(),_e=null),gt.stop()};function ne(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function T(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const S=Ze.autoReset,L=Y.enabled,U=Y.autoUpdate,B=Y.needsUpdate,D=Y.type;Qe(),Ze.autoReset=S,Y.enabled=L,Y.autoUpdate=U,Y.needsUpdate=B,Y.type=D}function se(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const L=S.target;L.removeEventListener("dispose",ae),be(L)}function be(S){Se(S),Ne.remove(S)}function Se(S){const L=Ne.get(S).programs;L!==void 0&&(L.forEach(function(U){pe.releaseProgram(U)}),S.isShaderMaterial&&pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,U,B,D,ce){L===null&&(L=ye);const me=D.isMesh&&D.matrixWorld.determinant()<0,Me=wo(S,L,U,B,D);fe.setMaterial(B,me);let Te=U.index,Oe=1;if(B.wireframe===!0){if(Te=j.getWireframeAttribute(U),Te===void 0)return;Oe=2}const Re=U.drawRange,Le=U.attributes.position;let tt=Re.start*Oe,Tt=(Re.start+Re.count)*Oe;ce!==null&&(tt=Math.max(tt,ce.start*Oe),Tt=Math.min(Tt,(ce.start+ce.count)*Oe)),Te!==null?(tt=Math.max(tt,0),Tt=Math.min(Tt,Te.count)):Le!=null&&(tt=Math.max(tt,0),Tt=Math.min(Tt,Le.count));const ot=Tt-tt;if(ot<0||ot===1/0)return;Pe.setup(D,B,Me,U,Te);let Wt,Je=Ae;if(Te!==null&&(Wt=Z.get(Te),Je=ve,Je.setIndex(Wt)),D.isMesh)B.wireframe===!0?(fe.setLineWidth(B.wireframeLinewidth*ze()),Je.setMode(P.LINES)):Je.setMode(P.TRIANGLES);else if(D.isLine){let Be=B.linewidth;Be===void 0&&(Be=1),fe.setLineWidth(Be*ze()),D.isLineSegments?Je.setMode(P.LINES):D.isLineLoop?Je.setMode(P.LINE_LOOP):Je.setMode(P.LINE_STRIP)}else D.isPoints?Je.setMode(P.POINTS):D.isSprite&&Je.setMode(P.TRIANGLES);if(D.isBatchedMesh)Je.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else if(D.isInstancedMesh)Je.renderInstances(tt,ot,D.count);else if(U.isInstancedBufferGeometry){const Be=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,ar=Math.min(U.instanceCount,Be);Je.renderInstances(tt,ot,ar)}else Je.render(tt,ot)};function Ye(S,L,U){S.transparent===!0&&S.side===Zt&&S.forceSinglePass===!1?(S.side=yt,S.needsUpdate=!0,Ei(S,L,U),S.side=un,S.needsUpdate=!0,Ei(S,L,U),S.side=Zt):Ei(S,L,U)}this.compile=function(S,L,U=null){U===null&&(U=S),m=Ee.get(U),m.init(),b.push(m),U.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(m.pushLight(D),D.castShadow&&m.pushShadow(D))}),S!==U&&S.traverseVisible(function(D){D.isLight&&D.layers.test(L.layers)&&(m.pushLight(D),D.castShadow&&m.pushShadow(D))}),m.setupLights(x._useLegacyLights);const B=new Set;return S.traverse(function(D){const ce=D.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const Me=ce[me];Ye(Me,U,D),B.add(Me)}else Ye(ce,U,D),B.add(ce)}),b.pop(),m=null,B},this.compileAsync=function(S,L,U=null){const B=this.compile(S,L,U);return new Promise(D=>{function ce(){if(B.forEach(function(me){Ne.get(me).currentProgram.isReady()&&B.delete(me)}),B.size===0){D(S);return}setTimeout(ce,10)}xe.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let $e=null;function at(S){$e&&$e(S)}function mt(){gt.stop()}function je(){gt.start()}const gt=new go;gt.setAnimationLoop(at),typeof self<"u"&&gt.setContext(self),this.setAnimationLoop=function(S){$e=S,Fe.setAnimationLoop(S),S===null?gt.stop():gt.start()},Fe.addEventListener("sessionstart",mt),Fe.addEventListener("sessionend",je),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(L),L=Fe.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,L,A),m=Ee.get(S,b.length),m.init(),b.push(m),ge.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),G.setFromProjectionMatrix(ge),le=this.localClippingEnabled,X=Ue.init(this.clippingPlanes,le),v=he.get(S,u.length),v.init(),u.push(v),Ht(S,L,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(k,V),this.info.render.frame++,X===!0&&Ue.beginShadows();const U=m.state.shadowsArray;if(Y.render(U,S,L),X===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),ke.render(v,S),m.setupLights(x._useLegacyLights),L.isArrayCamera){const B=L.cameras;for(let D=0,ce=B.length;D<ce;D++){const me=B[D];os(v,S,me,me.viewport)}}else os(v,S,L);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(x,S,L),Pe.resetDefaultState(),q=-1,M=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,u.pop(),u.length>0?v=u[u.length-1]:v=null};function Ht(S,L,U,B){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)U=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||G.intersectsSprite(S)){B&&Ie.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);const me=Q.update(S),Me=S.material;Me.visible&&v.push(S,me,Me,U,Ie.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||G.intersectsObject(S))){const me=Q.update(S),Me=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ie.copy(S.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ie.copy(me.boundingSphere.center)),Ie.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(Me)){const Te=me.groups;for(let Oe=0,Re=Te.length;Oe<Re;Oe++){const Le=Te[Oe],tt=Me[Le.materialIndex];tt&&tt.visible&&v.push(S,me,tt,U,Ie.z,Le)}}else Me.visible&&v.push(S,me,Me,U,Ie.z,null)}}const ce=S.children;for(let me=0,Me=ce.length;me<Me;me++)Ht(ce[me],L,U,B)}function os(S,L,U,B){const D=S.opaque,ce=S.transmissive,me=S.transparent;m.setupLightsView(U),X===!0&&Ue.setGlobalState(x.clippingPlanes,U),ce.length>0&&Ao(D,ce,L,U),B&&fe.viewport(y.copy(B)),D.length>0&&Mi(D,L,U),ce.length>0&&Mi(ce,L,U),me.length>0&&Mi(me,L,U),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Ao(S,L,U,B){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;const ce=we.isWebGL2;_e===null&&(_e=new Rn(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?pi:hn,minFilter:wn,samples:ce?4:0})),x.getDrawingBufferSize(Ce),ce?_e.setSize(Ce.x,Ce.y):_e.setSize(Ji(Ce.x),Ji(Ce.y));const me=x.getRenderTarget();x.setRenderTarget(_e),x.getClearColor(re),C=x.getClearAlpha(),C<1&&x.setClearColor(16777215,.5),x.clear();const Me=x.toneMapping;x.toneMapping=Qt,Mi(S,U,B),E.updateMultisampleRenderTarget(_e),E.updateRenderTargetMipmap(_e);let Te=!1;for(let Oe=0,Re=L.length;Oe<Re;Oe++){const Le=L[Oe],tt=Le.object,Tt=Le.geometry,ot=Le.material,Wt=Le.group;if(ot.side===Zt&&tt.layers.test(B.layers)){const Je=ot.side;ot.side=yt,ot.needsUpdate=!0,ls(tt,U,B,Tt,ot,Wt),ot.side=Je,ot.needsUpdate=!0,Te=!0}}Te===!0&&(E.updateMultisampleRenderTarget(_e),E.updateRenderTargetMipmap(_e)),x.setRenderTarget(me),x.setClearColor(re,C),x.toneMapping=Me}function Mi(S,L,U){const B=L.isScene===!0?L.overrideMaterial:null;for(let D=0,ce=S.length;D<ce;D++){const me=S[D],Me=me.object,Te=me.geometry,Oe=B===null?me.material:B,Re=me.group;Me.layers.test(U.layers)&&ls(Me,L,U,Te,Oe,Re)}}function ls(S,L,U,B,D,ce){S.onBeforeRender(x,L,U,B,D,ce),S.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),D.onBeforeRender(x,L,U,B,S,ce),D.transparent===!0&&D.side===Zt&&D.forceSinglePass===!1?(D.side=yt,D.needsUpdate=!0,x.renderBufferDirect(U,L,B,D,S,ce),D.side=un,D.needsUpdate=!0,x.renderBufferDirect(U,L,B,D,S,ce),D.side=Zt):x.renderBufferDirect(U,L,B,D,S,ce),S.onAfterRender(x,L,U,B,D,ce)}function Ei(S,L,U){L.isScene!==!0&&(L=ye);const B=Ne.get(S),D=m.state.lights,ce=m.state.shadowsArray,me=D.state.version,Me=pe.getParameters(S,D.state,ce,L,U),Te=pe.getProgramCacheKey(Me);let Oe=B.programs;B.environment=S.isMeshStandardMaterial?L.environment:null,B.fog=L.fog,B.envMap=(S.isMeshStandardMaterial?N:g).get(S.envMap||B.environment),Oe===void 0&&(S.addEventListener("dispose",ae),Oe=new Map,B.programs=Oe);let Re=Oe.get(Te);if(Re!==void 0){if(B.currentProgram===Re&&B.lightsStateVersion===me)return ds(S,Me),Re}else Me.uniforms=pe.getUniforms(S),S.onBuild(U,Me,x),S.onBeforeCompile(Me,x),Re=pe.acquireProgram(Me,Te),Oe.set(Te,Re),B.uniforms=Me.uniforms;const Le=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Le.clippingPlanes=Ue.uniform),ds(S,Me),B.needsLights=Co(S),B.lightsStateVersion=me,B.needsLights&&(Le.ambientLightColor.value=D.state.ambient,Le.lightProbe.value=D.state.probe,Le.directionalLights.value=D.state.directional,Le.directionalLightShadows.value=D.state.directionalShadow,Le.spotLights.value=D.state.spot,Le.spotLightShadows.value=D.state.spotShadow,Le.rectAreaLights.value=D.state.rectArea,Le.ltc_1.value=D.state.rectAreaLTC1,Le.ltc_2.value=D.state.rectAreaLTC2,Le.pointLights.value=D.state.point,Le.pointLightShadows.value=D.state.pointShadow,Le.hemisphereLights.value=D.state.hemi,Le.directionalShadowMap.value=D.state.directionalShadowMap,Le.directionalShadowMatrix.value=D.state.directionalShadowMatrix,Le.spotShadowMap.value=D.state.spotShadowMap,Le.spotLightMatrix.value=D.state.spotLightMatrix,Le.spotLightMap.value=D.state.spotLightMap,Le.pointShadowMap.value=D.state.pointShadowMap,Le.pointShadowMatrix.value=D.state.pointShadowMatrix),B.currentProgram=Re,B.uniformsList=null,Re}function cs(S){if(S.uniformsList===null){const L=S.currentProgram.getUniforms();S.uniformsList=qi.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function ds(S,L){const U=Ne.get(S);U.outputColorSpace=L.outputColorSpace,U.batching=L.batching,U.instancing=L.instancing,U.instancingColor=L.instancingColor,U.skinning=L.skinning,U.morphTargets=L.morphTargets,U.morphNormals=L.morphNormals,U.morphColors=L.morphColors,U.morphTargetsCount=L.morphTargetsCount,U.numClippingPlanes=L.numClippingPlanes,U.numIntersection=L.numClipIntersection,U.vertexAlphas=L.vertexAlphas,U.vertexTangents=L.vertexTangents,U.toneMapping=L.toneMapping}function wo(S,L,U,B,D){L.isScene!==!0&&(L=ye),E.resetTextureUnits();const ce=L.fog,me=B.isMeshStandardMaterial?L.environment:null,Me=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:tn,Te=(B.isMeshStandardMaterial?N:g).get(B.envMap||me),Oe=B.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,Re=!!U.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Le=!!U.morphAttributes.position,tt=!!U.morphAttributes.normal,Tt=!!U.morphAttributes.color;let ot=Qt;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ot=x.toneMapping);const Wt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Je=Wt!==void 0?Wt.length:0,Be=Ne.get(B),ar=m.state.lights;if(X===!0&&(le===!0||S!==M)){const Ct=S===M&&B.id===q;Ue.setState(B,S,Ct)}let et=!1;B.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==ar.state.version||Be.outputColorSpace!==Me||D.isBatchedMesh&&Be.batching===!1||!D.isBatchedMesh&&Be.batching===!0||D.isInstancedMesh&&Be.instancing===!1||!D.isInstancedMesh&&Be.instancing===!0||D.isSkinnedMesh&&Be.skinning===!1||!D.isSkinnedMesh&&Be.skinning===!0||D.isInstancedMesh&&Be.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Be.instancingColor===!1&&D.instanceColor!==null||Be.envMap!==Te||B.fog===!0&&Be.fog!==ce||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Ue.numPlanes||Be.numIntersection!==Ue.numIntersection)||Be.vertexAlphas!==Oe||Be.vertexTangents!==Re||Be.morphTargets!==Le||Be.morphNormals!==tt||Be.morphColors!==Tt||Be.toneMapping!==ot||we.isWebGL2===!0&&Be.morphTargetsCount!==Je)&&(et=!0):(et=!0,Be.__version=B.version);let pn=Be.currentProgram;et===!0&&(pn=Ei(B,L,D));let hs=!1,si=!1,or=!1;const ht=pn.getUniforms(),mn=Be.uniforms;if(fe.useProgram(pn.program)&&(hs=!0,si=!0,or=!0),B.id!==q&&(q=B.id,si=!0),hs||M!==S){ht.setValue(P,"projectionMatrix",S.projectionMatrix),ht.setValue(P,"viewMatrix",S.matrixWorldInverse);const Ct=ht.map.cameraPosition;Ct!==void 0&&Ct.setValue(P,Ie.setFromMatrixPosition(S.matrixWorld)),we.logarithmicDepthBuffer&&ht.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ht.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,si=!0,or=!0)}if(D.isSkinnedMesh){ht.setOptional(P,D,"bindMatrix"),ht.setOptional(P,D,"bindMatrixInverse");const Ct=D.skeleton;Ct&&(we.floatVertexTextures?(Ct.boneTexture===null&&Ct.computeBoneTexture(),ht.setValue(P,"boneTexture",Ct.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}D.isBatchedMesh&&(ht.setOptional(P,D,"batchingTexture"),ht.setValue(P,"batchingTexture",D._matricesTexture,E));const lr=U.morphAttributes;if((lr.position!==void 0||lr.normal!==void 0||lr.color!==void 0&&we.isWebGL2===!0)&&Ge.update(D,U,pn),(si||Be.receiveShadow!==D.receiveShadow)&&(Be.receiveShadow=D.receiveShadow,ht.setValue(P,"receiveShadow",D.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(mn.envMap.value=Te,mn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),si&&(ht.setValue(P,"toneMappingExposure",x.toneMappingExposure),Be.needsLights&&Ro(mn,or),ce&&B.fog===!0&&oe.refreshFogUniforms(mn,ce),oe.refreshMaterialUniforms(mn,B,W,z,_e),qi.upload(P,cs(Be),mn,E)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(qi.upload(P,cs(Be),mn,E),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ht.setValue(P,"center",D.center),ht.setValue(P,"modelViewMatrix",D.modelViewMatrix),ht.setValue(P,"normalMatrix",D.normalMatrix),ht.setValue(P,"modelMatrix",D.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ct=B.uniformsGroups;for(let cr=0,Lo=Ct.length;cr<Lo;cr++)if(we.isWebGL2){const us=Ct[cr];Ve.update(us,pn),Ve.bind(us,pn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return pn}function Ro(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function Co(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,L,U){Ne.get(S.texture).__webglTexture=L,Ne.get(S.depthTexture).__webglTexture=U;const B=Ne.get(S);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=U===void 0,B.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,L){const U=Ne.get(S);U.__webglFramebuffer=L,U.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,U=0){A=S,I=L,R=U;let B=!0,D=null,ce=!1,me=!1;if(S){const Te=Ne.get(S);Te.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(P.FRAMEBUFFER,null),B=!1):Te.__webglFramebuffer===void 0?E.setupRenderTarget(S):Te.__hasExternalTextures&&E.rebindTextures(S,Ne.get(S.texture).__webglTexture,Ne.get(S.depthTexture).__webglTexture);const Oe=S.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(me=!0);const Re=Ne.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Re[L])?D=Re[L][U]:D=Re[L],ce=!0):we.isWebGL2&&S.samples>0&&E.useMultisampledRTT(S)===!1?D=Ne.get(S).__webglMultisampledFramebuffer:Array.isArray(Re)?D=Re[U]:D=Re,y.copy(S.viewport),H.copy(S.scissor),$=S.scissorTest}else y.copy(K).multiplyScalar(W).floor(),H.copy(ee).multiplyScalar(W).floor(),$=de;if(fe.bindFramebuffer(P.FRAMEBUFFER,D)&&we.drawBuffers&&B&&fe.drawBuffers(S,D),fe.viewport(y),fe.scissor(H),fe.setScissorTest($),ce){const Te=Ne.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+L,Te.__webglTexture,U)}else if(me){const Te=Ne.get(S.texture),Oe=L||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Te.__webglTexture,U||0,Oe)}q=-1},this.readRenderTargetPixels=function(S,L,U,B,D,ce,me){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ne.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&me!==void 0&&(Me=Me[me]),Me){fe.bindFramebuffer(P.FRAMEBUFFER,Me);try{const Te=S.texture,Oe=Te.format,Re=Te.type;if(Oe!==Bt&&ue.convert(Oe)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Re===pi&&(xe.has("EXT_color_buffer_half_float")||we.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Re!==hn&&ue.convert(Re)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Re===cn&&(we.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-B&&U>=0&&U<=S.height-D&&P.readPixels(L,U,B,D,ue.convert(Oe),ue.convert(Re),ce)}finally{const Te=A!==null?Ne.get(A).__webglFramebuffer:null;fe.bindFramebuffer(P.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(S,L,U=0){const B=Math.pow(2,-U),D=Math.floor(L.image.width*B),ce=Math.floor(L.image.height*B);E.setTexture2D(L,0),P.copyTexSubImage2D(P.TEXTURE_2D,U,0,0,S.x,S.y,D,ce),fe.unbindTexture()},this.copyTextureToTexture=function(S,L,U,B=0){const D=L.image.width,ce=L.image.height,me=ue.convert(U.format),Me=ue.convert(U.type);E.setTexture2D(U,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment),L.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,B,S.x,S.y,D,ce,me,Me,L.image.data):L.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,B,S.x,S.y,L.mipmaps[0].width,L.mipmaps[0].height,me,L.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,B,S.x,S.y,me,Me,L.image),B===0&&U.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(S,L,U,B,D=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=S.max.x-S.min.x+1,me=S.max.y-S.min.y+1,Me=S.max.z-S.min.z+1,Te=ue.convert(B.format),Oe=ue.convert(B.type);let Re;if(B.isData3DTexture)E.setTexture3D(B,0),Re=P.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)E.setTexture2DArray(B,0),Re=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,B.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,B.unpackAlignment);const Le=P.getParameter(P.UNPACK_ROW_LENGTH),tt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Tt=P.getParameter(P.UNPACK_SKIP_PIXELS),ot=P.getParameter(P.UNPACK_SKIP_ROWS),Wt=P.getParameter(P.UNPACK_SKIP_IMAGES),Je=U.isCompressedTexture?U.mipmaps[D]:U.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Je.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Je.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,S.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,S.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,S.min.z),U.isDataTexture||U.isData3DTexture?P.texSubImage3D(Re,D,L.x,L.y,L.z,ce,me,Me,Te,Oe,Je.data):U.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(Re,D,L.x,L.y,L.z,ce,me,Me,Te,Je.data)):P.texSubImage3D(Re,D,L.x,L.y,L.z,ce,me,Me,Te,Oe,Je),P.pixelStorei(P.UNPACK_ROW_LENGTH,Le),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,tt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Tt),P.pixelStorei(P.UNPACK_SKIP_ROWS,ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Wt),D===0&&B.generateMipmaps&&P.generateMipmap(Re),fe.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){I=0,R=0,A=null,fe.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Qr?"display-p3":"srgb",t.unpackColorSpace=We.workingColorSpace===nr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===it?en:to}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===en?it:tn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class lp extends yo{}lp.prototype.isWebGL1Renderer=!0;class cp extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class rs extends fn{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const d=[],h=new O,f=new O,p=[],_=[],v=[],m=[];for(let u=0;u<=n;u++){const b=[],x=u/n;let w=0;u===0&&o===0?w=.5/t:u===n&&l===Math.PI&&(w=-.5/t);for(let I=0;I<=t;I++){const R=I/t;h.x=-e*Math.cos(r+R*s)*Math.sin(o+x*a),h.y=e*Math.cos(o+x*a),h.z=e*Math.sin(r+R*s)*Math.sin(o+x*a),_.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(R+w,1-x),b.push(c++)}d.push(b)}for(let u=0;u<n;u++)for(let b=0;b<t;b++){const x=d[u][b+1],w=d[u][b],I=d[u+1][b],R=d[u+1][b+1];(u!==0||o>0)&&p.push(x,w,R),(u!==n-1||l<Math.PI)&&p.push(w,I,R)}this.setIndex(p),this.setAttribute("position",new kt(_,3)),this.setAttribute("normal",new kt(v,3)),this.setAttribute("uv",new kt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}const Ha={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class dp{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){a++,s===!1&&r.onStart!==void 0&&r.onStart(d,o,a),s=!0},this.itemEnd=function(d){o++,r.onProgress!==void 0&&r.onProgress(d,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(d){r.onError!==void 0&&r.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=c.length;h<f;h+=2){const p=c[h],_=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return _}return null}}}const hp=new dp;class ss{constructor(e){this.manager=e!==void 0?e:hp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ss.DEFAULT_MATERIAL_NAME="__DEFAULT";class up extends ss{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Ha.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=gi("img");function l(){d(),Ha.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){d(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class fp extends ss{constructor(e){super(e)}load(e,t,n,r){const s=new bt,o=new up(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zr);var _i=(i=>(i.THUMB="thumb",i.PANO_LOW="panoLow",i.PANO="pano",i.VIDEO="video",i.COVER="cover",i.MAP="map",i))(_i||{});function er(i,e){return!i||typeof i!="string"||i.trim()===""?"":i.trim()}const pp=Object.freeze(Object.defineProperty({__proto__:null,AssetType:_i,resolveAssetUrl:er},Symbol.toStringTag,{value:"Module"}));var xt=(i=>(i.LOADING_LOW="loadingLow",i.LOW_READY="lowReady",i.LOADING_HIGH="loadingHigh",i.HIGH_READY="highReady",i.DEGRADED="degraded",i.ERROR="error",i))(xt||{});class mp{constructor(){J(this,"element");J(this,"currentStatus","loadingLow");J(this,"autoHideTimer",null);this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){this.currentStatus=e,this.render(),e==="highReady"||e==="lowReady"?(this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.autoHideTimer=window.setTimeout(()=>{this.hide()},3e3)):this.show()}render(){const{text:e,icon:t,className:n}=this.getStatusInfo();this.element.innerHTML=`
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
      @media (max-width: 600px) {
        .quality-indicator {
          bottom: 80px;
          right: 10px;
          font-size: 12px;
        }
        .quality-indicator-content {
          padding: 6px 12px;
        }
      }
    `,document.head.appendChild(e)}}const di={original:{renderer:{pixelRatio:Math.min(window.devicePixelRatio||1,2),toneMapping:Qt,toneMappingExposure:1,output:"srgb",clearColor:void 0},camera:{defaultFov:75},texture:{anisotropyLimit:8,minFilter:wn,magFilter:Et,generateMipmaps:!0,colorSpace:"srgb"}},enhanced:{renderer:{pixelRatio:Math.min(window.devicePixelRatio,2),toneMapping:qa,toneMappingExposure:.95,output:"srgb",clearColor:{color:0,alpha:1}},camera:{defaultFov:70},texture:{anisotropyLimit:12,minFilter:wn,magFilter:Et,generateMipmaps:!0,colorSpace:"srgb"}}};class gp{constructor(e,t=!1){J(this,"scene");J(this,"camera");J(this,"renderer");J(this,"sphere",null);J(this,"container");J(this,"renderProfile","enhanced");J(this,"isDragging",!1);J(this,"lastMouseX",0);J(this,"lastMouseY",0);J(this,"yaw",0);J(this,"pitch",0);J(this,"fov",75);J(this,"onLoadCallback");J(this,"onErrorCallback");J(this,"onStatusChangeCallback");J(this,"debugMode",!1);J(this,"onDebugClick");J(this,"longPressTimer",null);J(this,"longPressThreshold",500);J(this,"aspectWarnedUrls",new Set);J(this,"loadStatus",xt.LOADING_LOW);J(this,"isDegradedMode",!1);J(this,"touchStartX",0);J(this,"touchStartY",0);J(this,"lastTouchDistance",0);J(this,"isPinching",!1);this.container=e,this.debugMode=t,this.renderProfile=this.detectRenderProfile(),this.scene=new cp,this.camera=new It(di[this.renderProfile].camera.defaultFov,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,0,0),this.fov=di[this.renderProfile].camera.defaultFov,this.renderer=new yo({antialias:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.applyRendererProfile(),e.appendChild(this.renderer.domElement),this.setupEvents(),this.animate(),window.addEventListener("resize",()=>this.handleResize())}setupEvents(){const e=this.renderer.domElement;if(e.addEventListener("mousedown",t=>this.onPointerDown(t)),e.addEventListener("mousemove",t=>this.onPointerMove(t)),e.addEventListener("mouseup",()=>this.onPointerUp()),e.addEventListener("mouseleave",()=>this.onPointerUp()),e.addEventListener("touchstart",t=>this.onTouchStart(t),{passive:!1}),e.addEventListener("touchmove",t=>this.onTouchMove(t),{passive:!1}),e.addEventListener("touchend",()=>this.onTouchEnd()),e.addEventListener("wheel",t=>this.onWheel(t),{passive:!1}),this.debugMode){e.addEventListener("dblclick",r=>this.handleDebugClick(r.clientX,r.clientY));let t=0,n=0;e.addEventListener("touchstart",r=>{r.touches.length===1&&(t=r.touches[0].clientX,n=r.touches[0].clientY,this.longPressTimer=window.setTimeout(()=>{this.handleDebugClick(t,n)},this.longPressThreshold))},{passive:!0}),e.addEventListener("touchmove",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0}),e.addEventListener("touchend",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0})}}handleDebugClick(e,t){if(this.onDebugClick&&this.debugMode){const n=this.getCurrentView();this.onDebugClick(e,t,n.yaw,n.pitch,n.fov)}}setOnDebugClick(e){this.onDebugClick=e}onPointerDown(e){this.isDragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY}onPointerMove(e){if(!this.isDragging)return;const t=e.clientX-this.lastMouseX,n=e.clientY-this.lastMouseY;this.yaw-=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,this.updateCamera(),this.debugMode&&this.onDebugClick&&this.getCurrentView()}onPointerUp(){this.isDragging=!1}onTouchStart(e){if(e.touches.length===1)this.isDragging=!0,this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.lastMouseX=this.touchStartX,this.lastMouseY=this.touchStartY;else if(e.touches.length===2){this.isPinching=!0,this.isDragging=!1;const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(t*t+n*n)}}onTouchMove(e){if(e.preventDefault(),this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null),e.touches.length===1&&this.isDragging){const t=e.touches[0].clientX-this.lastMouseX,n=e.touches[0].clientY-this.lastMouseY;this.yaw-=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.touches[0].clientX,this.lastMouseY=e.touches[0].clientY,this.updateCamera()}else if(e.touches.length===2&&this.isPinching){const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY,r=Math.sqrt(t*t+n*n),s=this.lastTouchDistance-r;this.fov+=s*.5,this.fov=Math.max(30,Math.min(120,this.fov)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.lastTouchDistance=r}}onTouchEnd(){this.isDragging=!1,this.isPinching=!1}onWheel(e){e.preventDefault(),this.fov+=e.deltaY*.1,this.fov=Math.max(30,Math.min(120,this.fov)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.debugMode&&this.onDebugClick&&this.getCurrentView()}updateCamera(){const e=ea.degToRad(this.yaw),t=ea.degToRad(this.pitch),n=Math.cos(t)*Math.sin(e),r=Math.sin(t),s=Math.cos(t)*Math.cos(e);this.camera.lookAt(n,r,s)}loadScene(e){if(this.isDegradedMode=!1,this.updateLoadStatus(xt.LOADING_LOW),this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const l=this.sphere.material;l.map&&l.map.dispose(),l.dispose()}const t=e.initialView;this.yaw=t.yaw||0,this.pitch=t.pitch||0;const n=di[this.renderProfile];this.fov=t.fov!==void 0?t.fov:n.camera.defaultFov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.updateCamera();const r=new rs(500,64,64);r.scale(-1,1,1);const s=new fp;s.setCrossOrigin("anonymous");const o=er(e.panoLow,_i.PANO_LOW),a=er(e.pano,_i.PANO);if(!o&&a){this.loadSingleTexture(s,r,a,!1);return}if(o&&!a){this.loadSingleTexture(s,r,o,!0);return}if(o&&a){this.loadProgressiveTextures(s,r,o,a);return}this.updateLoadStatus(xt.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error("场景未提供全景图 URL"))}loadSingleTexture(e,t,n,r){r?this.updateLoadStatus(xt.LOADING_LOW):this.updateLoadStatus(xt.LOADING_HIGH),e.load(n,s=>{this.applyTextureSettings(s),this.warnIfNotPanoAspect(s,n);const o=new Qi({map:s});this.sphere=new zt(t,o),this.scene.add(this.sphere),r?this.updateLoadStatus(xt.LOW_READY):this.updateLoadStatus(xt.HIGH_READY),this.onLoadCallback&&this.onLoadCallback()},void 0,s=>{console.error("加载全景图失败:",n,s),this.updateLoadStatus(xt.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error(`加载全景图失败：${n}`))})}loadProgressiveTextures(e,t,n,r){this.updateLoadStatus(xt.LOADING_LOW),e.load(n,s=>{this.applyTextureSettings(s),this.warnIfNotPanoAspect(s,n);const o=new Qi({map:s});this.sphere=new zt(t,o),this.scene.add(this.sphere),this.updateLoadStatus(xt.LOW_READY),this.onLoadCallback&&this.onLoadCallback(),this.updateLoadStatus(xt.LOADING_HIGH),e.load(r,a=>{this.applyTextureSettings(a),this.warnIfNotPanoAspect(a,r);const l=this.getCurrentView();if(this.sphere&&this.sphere.material&&"map"in this.sphere.material){const c=this.sphere.material;c.map&&c.map.dispose(),c.map=a,c.needsUpdate=!0}this.setView(l.yaw,l.pitch,l.fov),this.updateLoadStatus(xt.HIGH_READY),this.isDegradedMode=!1},void 0,a=>{console.error("高清全景图加载失败，继续使用低清图:",r,a),this.isDegradedMode=!0,this.updateLoadStatus(xt.DEGRADED)})},void 0,s=>{console.error("低清全景图加载失败，尝试加载高清图:",n,s),this.loadSingleTexture(e,t,r,!1)})}setOnLoad(e){this.onLoadCallback=e}setOnError(e){this.onErrorCallback=e}setOnStatusChange(e){this.onStatusChangeCallback=e}getLoadStatus(){return this.loadStatus}isInDegradedMode(){return this.isDegradedMode}updateLoadStatus(e){this.loadStatus=e,this.onStatusChangeCallback&&this.onStatusChangeCallback(e)}getCurrentView(){return{yaw:this.yaw,pitch:this.pitch,fov:this.fov}}setView(e,t,n){this.yaw=e,this.pitch=Math.max(-90,Math.min(90,t)),n!==void 0&&(this.fov=Math.max(30,Math.min(120,n)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix()),this.updateCamera()}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}animate(){requestAnimationFrame(()=>this.animate()),this.renderer.render(this.scene,this.camera)}warnIfNotPanoAspect(e,t){if(!e.image)return;const n=e.image,r=n.width,s=n.height;if(!r||!s)return;const o=r/s;Math.abs(o-2)>.02&&!this.aspectWarnedUrls.has(t)&&(console.warn(`[PanoViewer] 全景图比例不是 2:1，可能出现轻微变形（实际 ${o.toFixed(2)}），来源: ${t}`),this.aspectWarnedUrls.add(t))}dispose(){if(this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const e=this.sphere.material;e.map&&e.map.dispose(),e.dispose()}this.renderer.dispose(),window.removeEventListener("resize",()=>this.handleResize())}applyRendererProfile(){const e=di[this.renderProfile];this.renderer.setPixelRatio(e.renderer.pixelRatio),"outputColorSpace"in this.renderer?this.renderer.outputColorSpace=it:this.renderer.outputEncoding=en,this.renderer.toneMapping=e.renderer.toneMapping,this.renderer.toneMappingExposure=e.renderer.toneMappingExposure,e.renderer.clearColor&&this.renderer.setClearColor(e.renderer.clearColor.color,e.renderer.clearColor.alpha)}detectRenderProfile(){try{const t=new URLSearchParams(window.location.search).get("render");if(t&&t.toLowerCase()==="original")return"original"}catch{}return"enhanced"}applyTextureSettings(e){const t=di[this.renderProfile],n=this.renderer.capabilities.getMaxAnisotropy?this.renderer.capabilities.getMaxAnisotropy():1;if(e.anisotropy=Math.min(t.texture.anisotropyLimit,Math.max(1,n||1)),e.minFilter=t.texture.minFilter,e.magFilter=t.texture.magFilter,e.generateMipmaps=t.texture.generateMipmaps,"colorSpace"in e?e.colorSpace=it:e.encoding=en,e.needsUpdate=!0,this.debugMode){const r=e.image||{};console.log("pano texture",{w:r.width,h:r.height,colorSpace:e.colorSpace,encoding:e.encoding,anisotropy:e.anisotropy,minFilter:e.minFilter,magFilter:e.magFilter})}}}class Hr{constructor(e){J(this,"element");this.element=document.createElement("div"),this.element.className="title-bar",this.element.innerHTML=`
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
    `,document.head.appendChild(e)}setTitle(e){const t=this.element.querySelector(".title-text");t&&(t.textContent=e)}getElement(){return this.element}remove(){this.element.remove()}}class _p{constructor(e){J(this,"element");J(this,"museums");this.museums=e,this.element=document.createElement("div"),this.element.className="museum-list",this.render(),this.applyStyles()}render(){const e=this.museums.filter(n=>n.id==="wangding"),t=this.museums.filter(n=>n.id!=="wangding");this.element.innerHTML=`
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
    `,this.element.querySelectorAll(".museum-card-active").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-museum-id");r&&zr(r)})})}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class vp{constructor(e,t){J(this,"element");J(this,"hotspots");J(this,"onVideoPlay");this.hotspots=e,this.onVideoPlay=t,this.element=document.createElement("div"),this.element.className="hotspots-container",this.render(),this.applyStyles()}render(){this.element.innerHTML=this.hotspots.map(e=>{const t=e.yaw,n=e.pitch,r=50+t/180*40,s=50-n/90*40,o=Math.max(10,Math.min(90,r)),a=Math.max(10,Math.min(90,s));return`
        <div 
          class="hotspot" 
          data-hotspot-id="${e.id}"
          style="left: ${o}%; top: ${a}%;"
          title="${e.label}"
        >
          <div class="hotspot-icon">📍</div>
          <div class="hotspot-label">${e.label}</div>
        </div>
      `}).join(""),this.element.querySelectorAll(".hotspot").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-hotspot-id"),n=this.hotspots.find(r=>r.id===t);n&&this.handleHotspotClick(n)})})}handleHotspotClick(e){if(e.type==="scene"){const t=e.target;if(t.museumId&&t.sceneId){const n={yaw:t.yaw,pitch:t.pitch,fov:t.fov};Zn(t.museumId,t.sceneId,n)}}else if(e.type==="video"){const t=e.target.url;t&&this.onVideoPlay&&this.onVideoPlay(t)}}updateHotspots(e){this.hotspots=e,this.render()}applyStyles(){const e=document.createElement("style");e.textContent=`
      .hotspots-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 100;
      }
      .hotspot {
        position: absolute;
        transform: translate(-50%, -50%);
        pointer-events: all;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.2s;
      }
      .hotspot:active {
        transform: translate(-50%, -50%) scale(0.9);
      }
      .hotspot-icon {
        font-size: 32px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        animation: hotspot-pulse 2s infinite;
      }
      .hotspot-label {
        margin-top: 4px;
        padding: 4px 8px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .hotspot:hover .hotspot-label,
      .hotspot:active .hotspot-label {
        opacity: 1;
      }
      @keyframes hotspot-pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class xp{constructor(){J(this,"element");J(this,"videoElement");J(this,"isOpen",!1);this.element=document.createElement("div"),this.element.className="video-player-overlay",this.videoElement=document.createElement("video"),this.videoElement.controls=!0,this.videoElement.playsInline=!0,this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="video-player-backdrop"></div>
      <div class="video-player-content">
        <button class="video-player-close">×</button>
        <div class="video-container"></div>
      </div>
    `;const e=this.element.querySelector(".video-container");e&&e.appendChild(this.videoElement);const t=this.element.querySelector(".video-player-backdrop"),n=this.element.querySelector(".video-player-close");t==null||t.addEventListener("click",()=>this.close()),n==null||n.addEventListener("click",()=>this.close())}play(e){const t=er(e,_i.VIDEO);if(!t){console.error("视频 URL 为空");return}this.videoElement.src=t,this.videoElement.load(),this.open(),this.videoElement.play().catch(n=>{console.warn("自动播放失败，需要用户交互:",n)})}open(){this.isOpen=!0,this.element.classList.add("open"),document.body.style.overflow="hidden"}close(){this.isOpen=!1,this.element.classList.remove("open"),this.videoElement.pause(),this.videoElement.src="",document.body.style.overflow=""}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class Sp{constructor(e,t){J(this,"element");J(this,"scenes");J(this,"museumId");J(this,"isOpen",!1);this.museumId=e,this.scenes=t,this.element=document.createElement("div"),this.element.className="scene-list-drawer",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="scene-list-overlay"></div>
      <div class="scene-list-content">
        <div class="scene-list-header">
          <h2>场景列表</h2>
          <button class="scene-list-close">×</button>
        </div>
        <div class="scene-list-items">
          ${this.scenes.map(n=>`
            <div class="scene-item" data-scene-id="${n.id}">
              <img src="${n.thumb}" alt="${n.name}" loading="lazy">
              <div class="scene-item-info">
                <h3>${n.name}</h3>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;const e=this.element.querySelector(".scene-list-overlay"),t=this.element.querySelector(".scene-list-close");e==null||e.addEventListener("click",()=>this.close()),t==null||t.addEventListener("click",()=>this.close()),this.element.querySelectorAll(".scene-item").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-scene-id");r&&(Zn(this.museumId,r),this.close())})})}applyStyles(){const e=document.createElement("style");e.textContent=`
      .scene-list-drawer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .scene-list-drawer.open {
        pointer-events: all;
        opacity: 1;
      }
      .scene-list-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }
      .scene-list-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        border-radius: 20px 20px 0 0;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        transform: translateY(100%);
        transition: transform 0.3s;
      }
      .scene-list-drawer.open .scene-list-content {
        transform: translateY(0);
      }
      .scene-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
      }
      .scene-list-header h2 {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin: 0;
      }
      .scene-list-close {
        width: 32px;
        height: 32px;
        border: none;
        background: #f5f5f5;
        border-radius: 50%;
        font-size: 24px;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      .scene-list-items {
        overflow-y: auto;
        padding: 10px;
        flex: 1;
      }
      .scene-item {
        display: flex;
        align-items: center;
        padding: 12px;
        margin-bottom: 10px;
        background: #f9f9f9;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
      }
      .scene-item:active {
        background: #eee;
      }
      .scene-item img {
        width: 80px;
        height: 45px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 12px;
      }
      .scene-item-info h3 {
        font-size: 16px;
        color: #333;
        margin: 0;
      }
    `,document.head.appendChild(e)}open(){this.isOpen=!0,this.element.classList.add("open")}close(){this.isOpen=!1,this.element.classList.remove("open")}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}}class Mp{constructor(e,t,n,r){J(this,"element");J(this,"mapConfig");J(this,"scenes");J(this,"museumId");J(this,"currentSceneId");J(this,"isOpen",!1);this.museumId=e,this.mapConfig=t,this.scenes=n,this.currentSceneId=r,this.element=document.createElement("div"),this.element.className="map-overlay",this.render(),this.applyStyles()}render(){const e=Math.min(1,window.innerWidth/this.mapConfig.width),t=Math.min(1,window.innerHeight*.8/this.mapConfig.height),n=Math.min(e,t),r=this.mapConfig.width*n,s=this.mapConfig.height*n;this.element.innerHTML=`
      <div class="map-overlay-backdrop"></div>
      <div class="map-overlay-content">
        <div class="map-overlay-header">
          <h3>地图导航</h3>
          <button class="map-overlay-close">×</button>
        </div>
        <div class="map-container" style="width: ${r}px; height: ${s}px;">
          <img src="${this.mapConfig.image}" alt="地图" class="map-image">
          <div class="map-points">
            ${this.scenes.map(l=>{const c=l.mapPoint.x/this.mapConfig.width*100,d=l.mapPoint.y/this.mapConfig.height*100,h=l.id===this.currentSceneId;return`
                <div 
                  class="map-point ${h?"current":""}" 
                  data-scene-id="${l.id}"
                  style="left: ${c}%; top: ${d}%;"
                  title="${l.name}"
                >
                  <div class="map-point-dot"></div>
                  ${h?'<div class="map-point-pulse"></div>':""}
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `;const o=this.element.querySelector(".map-overlay-backdrop"),a=this.element.querySelector(".map-overlay-close");o==null||o.addEventListener("click",()=>this.close()),a==null||a.addEventListener("click",()=>this.close()),this.element.querySelectorAll(".map-point").forEach(l=>{l.addEventListener("click",c=>{c.stopPropagation();const d=l.getAttribute("data-scene-id");d&&d!==this.currentSceneId&&(Zn(this.museumId,d),this.close())})})}applyStyles(){const e=document.createElement("style");e.textContent=`
      .map-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .map-overlay.open {
        pointer-events: all;
        opacity: 1;
      }
      .map-overlay-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }
      .map-overlay-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 12px;
        padding: 20px;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
      }
      .map-overlay-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      .map-overlay-header h3 {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin: 0;
      }
      .map-overlay-close {
        width: 32px;
        height: 32px;
        border: none;
        background: #f5f5f5;
        border-radius: 50%;
        font-size: 24px;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      .map-container {
        position: relative;
        margin: 0 auto;
      }
      .map-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
      }
      .map-points {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .map-point {
        position: absolute;
        transform: translate(-50%, -50%);
        cursor: pointer;
        z-index: 10;
      }
      .map-point-dot {
        width: 16px;
        height: 16px;
        background: #4A90E2;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }
      .map-point:active .map-point-dot {
        transform: scale(0.9);
      }
      .map-point.current .map-point-dot {
        background: #FF6B6B;
        width: 20px;
        height: 20px;
      }
      .map-point-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background: #FF6B6B;
        border-radius: 50%;
        animation: pulse 2s infinite;
        opacity: 0.6;
      }
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `,document.head.appendChild(e)}open(){this.isOpen=!0,this.element.classList.add("open")}close(){this.isOpen=!1,this.element.classList.remove("open")}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}}class Ep{constructor(e,t,n){J(this,"element");J(this,"sceneList");J(this,"mapOverlay");J(this,"videoPlayer");this.videoPlayer=n,this.sceneList=new Sp(e.id,e.scenes),this.mapOverlay=new Mp(e.id,e.map,e.scenes,t.id),this.element=document.createElement("div"),this.element.className="control-bar",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <button class="control-btn scene-list-btn" title="场景列表">
        <span>📋</span>
      </button>
      <button class="control-btn map-btn" title="地图">
        <span>🗺️</span>
      </button>
    `;const e=this.element.querySelector(".scene-list-btn"),t=this.element.querySelector(".map-btn");e==null||e.addEventListener("click",()=>{this.sceneList.toggle()}),t==null||t.addEventListener("click",()=>{this.mapOverlay.toggle()})}applyStyles(){const e=document.createElement("style");e.textContent=`
      .control-bar {
        position: fixed;
        bottom: calc(20px + env(safe-area-inset-bottom, 0px));
        left: 20px;
        z-index: 1500;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .control-btn {
        width: 56px;
        height: 56px;
        border: none;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        border-radius: 50%;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, background 0.2s;
      }
      .control-btn:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.8);
      }
      .control-btn span {
        display: block;
      }
    `,document.head.appendChild(e)}getSceneList(){return this.sceneList}getMapOverlay(){return this.mapOverlay}getElement(){return this.element}remove(){this.element.remove(),this.sceneList.remove(),this.mapOverlay.remove()}}class yp{constructor(){J(this,"element");this.element=document.createElement("div"),this.element.className="loading-overlay",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
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
    `,document.head.appendChild(e)}show(){this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.element.remove()}}const bo={[te.INVALID_ROOT]:"配置格式错误",[te.MISSING_APP_NAME]:"缺少应用名称",[te.MUSEUMS_NOT_ARRAY]:"博物馆列表格式错误",[te.MUSEUMS_EMPTY]:"博物馆列表为空",[te.MISSING_MUSEUM_ID]:"缺少博物馆 ID",[te.DUPLICATE_MUSEUM_ID]:"博物馆 ID 重复",[te.MISSING_MUSEUM_NAME]:"缺少博物馆名称",[te.MISSING_MUSEUM_COVER]:"缺少封面图",[te.MISSING_MUSEUM_MAP]:"缺少地图配置",[te.MISSING_MAP_IMAGE]:"缺少地图图片",[te.INVALID_MAP_WIDTH]:"地图宽度无效",[te.INVALID_MAP_HEIGHT]:"地图高度无效",[te.SCENES_NOT_ARRAY]:"场景列表格式错误",[te.SCENES_EMPTY]:"场景列表为空",[te.MISSING_SCENE_ID]:"缺少场景 ID",[te.DUPLICATE_SCENE_ID]:"场景 ID 重复",[te.MISSING_SCENE_NAME]:"缺少场景名称",[te.MISSING_PANO]:"缺少全景图",[te.INVALID_PANO_URL]:"高清全景图 URL 无效",[te.INVALID_PANOLOW_URL]:"低清全景图 URL 无效",[te.MISSING_THUMB]:"缺少缩略图",[te.MISSING_INITIAL_VIEW]:"缺少初始视角配置",[te.INVALID_YAW]:"水平角度无效",[te.INVALID_PITCH]:"垂直角度无效",[te.INVALID_FOV]:"视野角度无效",[te.MISSING_MAP_POINT]:"缺少地图点位",[te.INVALID_MAP_POINT_X]:"地图点位 X 坐标无效",[te.INVALID_MAP_POINT_Y]:"地图点位 Y 坐标无效",[te.HOTSPOTS_NOT_ARRAY]:"热点列表格式错误",[te.MISSING_HOTSPOT_ID]:"缺少热点 ID",[te.DUPLICATE_HOTSPOT_ID]:"热点 ID 重复",[te.INVALID_HOTSPOT_TYPE]:"热点类型无效",[te.MISSING_HOTSPOT_LABEL]:"缺少热点标签",[te.INVALID_HOTSPOT_YAW]:"热点水平角度无效",[te.INVALID_HOTSPOT_PITCH]:"热点垂直角度无效",[te.MISSING_HOTSPOT_TARGET]:"缺少热点目标配置",[te.MISSING_TARGET_MUSEUM_ID]:"缺少目标博物馆 ID",[te.MISSING_TARGET_SCENE_ID]:"缺少目标场景 ID",[te.INVALID_TARGET_YAW]:"目标水平角度无效",[te.INVALID_TARGET_PITCH]:"目标垂直角度无效",[te.INVALID_TARGET_FOV]:"目标视野角度无效",[te.MISSING_TARGET_URL]:"缺少视频链接"},To={[te.INVALID_ROOT]:"请确保 config.json 是一个有效的 JSON 对象",[te.MISSING_APP_NAME]:'请在配置中添加 "appName" 字段，例如："appName": "我的 VR 展馆"',[te.MUSEUMS_NOT_ARRAY]:'请确保 "museums" 是一个数组，例如："museums": []',[te.MUSEUMS_EMPTY]:'请至少添加一个博物馆到 "museums" 数组中',[te.MISSING_MUSEUM_ID]:'请为该博物馆添加 "id" 字段，例如："id": "museum1"',[te.DUPLICATE_MUSEUM_ID]:'请确保每个博物馆的 "id" 都是唯一的，不能重复',[te.MISSING_MUSEUM_NAME]:'请为该博物馆添加 "name" 字段，例如："name": "第一展馆"',[te.MISSING_MUSEUM_COVER]:'请为该博物馆添加 "cover" 字段，填入封面图的 URL',[te.MISSING_MUSEUM_MAP]:'请为该博物馆添加 "map" 对象配置',[te.MISSING_MAP_IMAGE]:'请在地图配置中添加 "image" 字段，填入地图图片的 URL',[te.INVALID_MAP_WIDTH]:'请确保 "map.width" 是一个大于 0 的数字',[te.INVALID_MAP_HEIGHT]:'请确保 "map.height" 是一个大于 0 的数字',[te.SCENES_NOT_ARRAY]:'请确保 "scenes" 是一个数组，例如："scenes": []',[te.SCENES_EMPTY]:"请至少为该博物馆添加一个场景",[te.MISSING_SCENE_ID]:'请为该场景添加 "id" 字段，例如："id": "scene1"',[te.DUPLICATE_SCENE_ID]:'请确保同一博物馆内每个场景的 "id" 都是唯一的',[te.MISSING_SCENE_NAME]:'请为该场景添加 "name" 字段，例如："name": "正门"',[te.MISSING_PANO]:'请为该场景添加 "pano" 或 "panoLow" 字段，至少提供一个全景图 URL',[te.INVALID_PANO_URL]:'请确保 "pano" 字段是一个有效的图片 URL 字符串',[te.INVALID_PANOLOW_URL]:'请确保 "panoLow" 字段是一个有效的图片 URL 字符串',[te.MISSING_THUMB]:'请为该场景添加 "thumb" 字段，填入缩略图的 URL',[te.MISSING_INITIAL_VIEW]:'请为该场景添加 "initialView" 对象配置',[te.INVALID_YAW]:'请确保 "initialView.yaw" 是一个数字（水平角度，范围 -180 到 180）',[te.INVALID_PITCH]:'请确保 "initialView.pitch" 是一个数字（垂直角度，范围 -90 到 90）',[te.INVALID_FOV]:'请确保 "initialView.fov" 是一个数字（视野角度，范围 30 到 120）',[te.MISSING_MAP_POINT]:'请为该场景添加 "mapPoint" 对象配置',[te.INVALID_MAP_POINT_X]:'请确保 "mapPoint.x" 是一个数字（地图上的 X 坐标）',[te.INVALID_MAP_POINT_Y]:'请确保 "mapPoint.y" 是一个数字（地图上的 Y 坐标）',[te.HOTSPOTS_NOT_ARRAY]:'请确保 "hotspots" 是一个数组，例如："hotspots": []',[te.MISSING_HOTSPOT_ID]:'请为该热点添加 "id" 字段，例如："id": "hotspot1"',[te.DUPLICATE_HOTSPOT_ID]:'请确保同一场景内每个热点的 "id" 都是唯一的',[te.INVALID_HOTSPOT_TYPE]:'请确保 "type" 字段是 "scene" 或 "video" 之一',[te.MISSING_HOTSPOT_LABEL]:'请为该热点添加 "label" 字段，例如："label": "进入展厅"',[te.INVALID_HOTSPOT_YAW]:'请确保 "yaw" 是一个数字（热点在全景图中的水平位置）',[te.INVALID_HOTSPOT_PITCH]:'请确保 "pitch" 是一个数字（热点在全景图中的垂直位置）',[te.MISSING_HOTSPOT_TARGET]:'请为该热点添加 "target" 对象配置',[te.MISSING_TARGET_MUSEUM_ID]:'场景跳转类型的热点必须包含 "target.museumId" 字段',[te.MISSING_TARGET_SCENE_ID]:'场景跳转类型的热点必须包含 "target.sceneId" 字段',[te.INVALID_TARGET_YAW]:'请确保 "target.yaw" 是一个数字（跳转后的水平角度）',[te.INVALID_TARGET_PITCH]:'请确保 "target.pitch" 是一个数字（跳转后的垂直角度）',[te.INVALID_TARGET_FOV]:'请确保 "target.fov" 是一个数字（跳转后的视野角度）',[te.MISSING_TARGET_URL]:'视频类型的热点必须包含 "target.url" 字段，填入视频的 URL'};class bp{constructor(e,t,n){J(this,"element");this.element=document.createElement("div"),this.element.className="config-error-panel",this.render(e,t,n),this.applyStyles()}render(e,t,n){this.element.innerHTML=`
      <div class="error-panel-content">
        <div class="error-panel-header">
          <h2>⚠️ 配置错误</h2>
          <p class="error-summary">发现 ${e.length} 个配置错误，请检查 config.json</p>
        </div>
        <div class="error-list">
          ${e.map((o,a)=>this.renderErrorCard(o,a)).join("")}
        </div>
        <div class="error-actions">
          <button class="btn btn-primary" id="retry-btn">🔄 刷新重试</button>
          <button class="btn btn-secondary" id="example-btn">📖 查看示例配置</button>
        </div>
      </div>
    `;const r=this.element.querySelector("#retry-btn"),s=this.element.querySelector("#example-btn");r&&r.addEventListener("click",t),s&&s.addEventListener("click",n)}renderErrorCard(e,t){const n=bo[e.code]||"配置错误",r=To[e.code]||"请检查配置文件的格式和内容",s=[];e.museumName&&s.push(`馆：${e.museumName}`),e.sceneName&&s.push(`场景：${e.sceneName}`);const o=s.length>0?s.join(" / "):"全局配置";return`
      <div class="error-card">
        <div class="error-card-header">
          <span class="error-icon">❌</span>
          <span class="error-title">${this.escapeHtml(n)}</span>
        </div>
        <div class="error-card-body">
          <div class="error-location">
            <span class="location-icon">📍</span>
            <span class="location-text">${this.escapeHtml(o)}</span>
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
            <span class="hint-text">${this.escapeHtml(r)}</span>
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class Tp{constructor(){J(this,"element");J(this,"isVisible",!1);J(this,"currentYaw",0);J(this,"currentPitch",0);J(this,"currentFov",75);J(this,"clickX",0);J(this,"clickY",0);this.element=document.createElement("div"),this.element.className="debug-panel",this.element.style.display="none",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
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
    `;const e=this.element.querySelector("#debug-close-btn");e&&e.addEventListener("click",()=>{this.hide()});const t=this.element.querySelector("#debug-copy-btn");t&&t.addEventListener("click",()=>{this.copyHotspotJSON()})}show(e,t,n,r,s){this.clickX=e,this.clickY=t,this.currentYaw=n,this.currentPitch=r,this.currentFov=s;const o=this.element.querySelector("#debug-yaw"),a=this.element.querySelector("#debug-pitch"),l=this.element.querySelector("#debug-fov");o&&(o.textContent=n.toFixed(1)),a&&(a.textContent=r.toFixed(1)),l&&(l.textContent=s.toFixed(1));const c=280,d=200,h=20;let f=e-c/2,p=t-d/2;f=Math.max(h,Math.min(f,window.innerWidth-c-h)),p=Math.max(h,Math.min(p,window.innerHeight-d-h)),this.element.style.left=`${f}px`,this.element.style.top=`${p}px`,this.element.style.display="block",this.isVisible=!0}hide(){this.element.style.display="none",this.isVisible=!1}updateView(e,t,n){if(this.currentYaw=e,this.currentPitch=t,this.currentFov=n,this.isVisible){const r=this.element.querySelector("#debug-yaw"),s=this.element.querySelector("#debug-pitch"),o=this.element.querySelector("#debug-fov");r&&(r.textContent=e.toFixed(1)),s&&(s.textContent=t.toFixed(1)),o&&(o.textContent=n.toFixed(1))}}async copyHotspotJSON(){const e={id:`hs_${Date.now()}`,yaw:Math.round(this.currentYaw*10)/10,pitch:Math.round(this.currentPitch*10)/10,type:"scene",targetSceneId:"",label:"热点"},t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),this.showToast("✅ 已复制到剪贴板")}catch{const r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.opacity="0",document.body.appendChild(r),r.select();try{document.execCommand("copy"),this.showToast("✅ 已复制到剪贴板")}catch{this.showToast("❌ 复制失败，请手动复制")}document.body.removeChild(r)}}showToast(e){const t=document.createElement("div");t.className="debug-toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},10),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},2e3)}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}const as="vrplayer_config_draft_v1";function Ga(){try{const i=localStorage.getItem(as);return i?JSON.parse(i):null}catch(i){return console.warn("加载草稿失败",i),null}}function Ap(i){try{const e=JSON.stringify(i);return localStorage.setItem(as,e),{ok:!0}}catch(e){return console.warn("保存草稿失败",e),{ok:!1,reason:e instanceof Error?e.message:"unknown"}}}function wp(){try{localStorage.removeItem(as)}catch(i){console.warn("清空草稿失败",i)}}const za="vrplayer_config_draft_ignore_session";class Rp{constructor(e,t){J(this,"element");J(this,"config");J(this,"initialConfig");J(this,"editingTarget",{type:"global"});J(this,"simpleMode",!0);J(this,"validationErrors",[]);J(this,"validationDebounceTimer",null);J(this,"draftSaveTimer",null);J(this,"draftLoaded",!1);J(this,"draftIgnoreSession",!1);J(this,"draftBannerMessage",null);J(this,"onConfigChange");this.config=JSON.parse(JSON.stringify(e)),this.initialConfig=JSON.parse(JSON.stringify(e)),this.onConfigChange=t;try{this.draftIgnoreSession=sessionStorage.getItem(za)==="1"}catch(n){console.warn("读取草稿忽略状态失败",n),this.draftIgnoreSession=!1}this.tryRestoreDraft(),this.element=document.createElement("div"),this.element.className="config-studio",this.render(),this.applyStyles(),this.renderDraftBanner(),this.validateConfig()}tryRestoreDraft(){if(this.draftIgnoreSession)return;const e=Ga();e&&(this.config=JSON.parse(JSON.stringify(e)),this.draftLoaded=!0,this.draftBannerMessage="检测到未导出的草稿，已自动恢复。",this.onConfigChange&&this.onConfigChange(this.config))}renderDraftBanner(){const e=this.element.querySelector("#draft-banner");if(!e)return;if(!this.draftLoaded||this.draftIgnoreSession){e.innerHTML="",e.style.display="none";return}const t=this.draftBannerMessage||"检测到未导出的草稿，已自动恢复。";e.innerHTML=`
      <div class="draft-banner-content">
        <span class="draft-banner-text">${this.escapeHtml(t)}</span>
        <div class="draft-banner-actions">
          <button class="banner-btn" data-banner-action="export">导出</button>
          <button class="banner-btn" data-banner-action="clear">清空草稿</button>
          <button class="banner-btn" data-banner-action="ignore">忽略本次</button>
        </div>
      </div>
    `,e.style.display="flex",this.bindDraftBannerEvents()}bindDraftBannerEvents(){const e=this.element.querySelector("#draft-banner");e&&e.querySelectorAll("[data-banner-action]").forEach(t=>{t.addEventListener("click",n=>{const r=n.currentTarget.getAttribute("data-banner-action");r==="export"?this.handleExport():r==="clear"?this.handleClearDraft():r==="ignore"&&this.handleIgnoreDraft()})})}handleIgnoreDraft(){this.draftIgnoreSession=!0;try{sessionStorage.setItem(za,"1")}catch(e){console.warn("记录忽略草稿状态失败",e)}this.config=JSON.parse(JSON.stringify(this.initialConfig)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.bindEvents(),this.debouncedValidate(),this.notifyChange({skipDraftSave:!0}),this.renderDraftBanner(),this.showToast("已忽略草稿，本次会话使用默认配置")}handleClearDraft(){confirm("确定清空本地草稿？")&&(wp(),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderDraftBanner(),this.showToast("草稿已清空"))}handleExport(){this.exportConfig();const e=Ga();e&&this.isConfigSameAs(e)&&this.showToast("已导出（草稿仍保留）")}exportConfig(){const e=JSON.stringify(this.config,null,2),t=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(t),r=document.createElement("a");r.href=n,r.download="config.json",r.click(),URL.revokeObjectURL(n)}isConfigSameAs(e){try{return JSON.stringify(this.config)===JSON.stringify(e)}catch{return!1}}render(){this.element.innerHTML=`
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
        ${t.scenes.map((r,s)=>`
          <div class="tree-item scene-item ${this.editingTarget.type==="scene"&&this.editingTarget.museumIndex===n&&this.editingTarget.sceneIndex===s?"active":""}" data-target="scene:${n}:${s}">
            <span class="tree-icon">📷</span>
            <span class="tree-label">${this.escapeHtml(r.name)}</span>
            ${this.simpleMode?`
              <button class="tree-btn-add" data-action="add-hotspot-scene" data-museum="${n}" data-scene="${s}" title="添加跳转热点">+ 添加跳转</button>
              <button class="tree-btn-add" data-action="add-hotspot-video" data-museum="${n}" data-scene="${s}" title="添加视频热点">+ 添加视频</button>
            `:`
              <button class="tree-btn-add" data-action="add-hotspot" data-museum="${n}" data-scene="${s}" title="添加热点">+</button>
            `}
            <button class="tree-btn-del" data-action="del-scene" data-museum="${n}" data-scene="${s}" title="删除场景">×</button>
          </div>
          ${r.hotspots.map((o,a)=>`
            <div class="tree-item hotspot-item ${this.editingTarget.type==="hotspot"&&this.editingTarget.museumIndex===n&&this.editingTarget.sceneIndex===s&&this.editingTarget.hotspotIndex===a?"active":""}" data-target="hotspot:${n}:${s}:${a}">
              <span class="tree-icon">📍</span>
              <span class="tree-label">${this.escapeHtml(o.label)}${this.simpleMode&&o.type!=="scene"&&o.type!=="video"?"（高级模式编辑）":""}</span>
              <button class="tree-btn-del" data-action="del-hotspot" data-museum="${n}" data-scene="${s}" data-hotspot="${a}" title="删除热点">×</button>
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
        </div>
      `;return}if(this.editingTarget.type==="hotspot"){const n=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex],r=n.type==="scene",s=n.type==="video";if(e.textContent=`编辑热点：${n.label}`,!r&&!s){t.innerHTML=`
          <div class="notice-box">
            该热点类型仅可在高级模式编辑，请切换到高级模式。
          </div>
        `;return}t.innerHTML=`
        <div class="form-group">
          <label>热点类型</label>
          <select id="field-type">
            <option value="scene" ${r?"selected":""}>跳转场景</option>
            <option value="video" ${s?"selected":""}>播放视频</option>
          </select>
        </div>
        <div class="form-group">
          <label>热点标题</label>
          <input type="text" id="field-label" value="${this.escapeHtml(n.label)}" placeholder="如：进入展厅">
        </div>
        <div class="form-group">
          <label>左右角度 (yaw)</label>
          <input type="number" id="field-yaw" value="${n.yaw}" step="0.1">
        </div>
        <div class="form-group">
          <label>上下角度 (pitch)</label>
          <input type="number" id="field-pitch" value="${n.pitch}" step="0.1">
        </div>
        ${r?`
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
    `}renderHotspotForm(e,t,n,r){const s=e.type==="scene";return`
      <div class="form-group">
        <label>热点类型</label>
        <select id="field-type">
          <option value="scene" ${s?"selected":""}>场景跳转</option>
          <option value="video" ${s?"":"selected"}>视频播放</option>
        </select>
      </div>
      <div class="form-group">
        <label>热点标签</label>
        <input type="text" id="field-label" value="${this.escapeHtml(e.label)}" placeholder="热点标签">
      </div>
      <div class="form-group">
        <label>水平角度 (yaw)</label>
        <input type="number" id="field-yaw" value="${e.yaw}" step="0.1">
      </div>
      <div class="form-group">
        <label>垂直角度 (pitch)</label>
        <input type="number" id="field-pitch" value="${e.pitch}" step="0.1">
      </div>
      ${s?`
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
    `}bindEvents(){var o;const e=this.element.querySelector("#import-btn"),t=this.element.querySelector("#export-btn"),n=this.element.querySelector("#reset-btn"),r=this.element.querySelector("#clear-draft-btn");this.element.querySelector("#file-input");const s=this.element.querySelector("#simple-mode-toggle");s&&(s.checked=this.simpleMode,s.addEventListener("change",()=>{this.simpleMode=s.checked,this.renderSidebar(),this.renderEditor(),this.bindEvents()})),e==null||e.addEventListener("click",()=>{const a=prompt("请粘贴 JSON 配置：");if(a)try{const l=JSON.parse(a);this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(l){alert("JSON 格式错误："+l)}}),t==null||t.addEventListener("click",()=>{this.handleExport()}),n==null||n.addEventListener("click",async()=>{try{const l=await(await fetch("./config.json",{cache:"no-store"})).json();this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(a){alert("加载示例配置失败："+a)}}),r==null||r.addEventListener("click",()=>{this.handleClearDraft()}),this.element.querySelectorAll(".tree-item[data-target]").forEach(a=>{a.addEventListener("click",l=>{const c=a.getAttribute("data-target");if(c){if(c==="global")this.editingTarget={type:"global"};else if(c.startsWith("museum:")){const d=parseInt(c.split(":")[1]);this.editingTarget={type:"museum",museumIndex:d}}else if(c.startsWith("scene:")){const[d,h,f]=c.split(":").map(Number);this.editingTarget={type:"scene",museumIndex:h,sceneIndex:f}}else if(c.startsWith("hotspot:")){const[d,h,f,p]=c.split(":").map(Number);this.editingTarget={type:"hotspot",museumIndex:h,sceneIndex:f,hotspotIndex:p}}this.renderSidebar(),this.renderEditor(),this.bindFormEvents()}})}),(o=this.element.querySelector("#add-museum-btn"))==null||o.addEventListener("click",()=>{this.addMuseum()}),this.element.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",l=>{l.stopPropagation();const c=a.getAttribute("data-action"),d=parseInt(a.getAttribute("data-museum")||"0"),h=parseInt(a.getAttribute("data-scene")||"0"),f=parseInt(a.getAttribute("data-hotspot")||"0");c==="add-scene"?this.addScene(d):c==="del-museum"?confirm("确定删除此博物馆？")&&this.deleteMuseum(d):c==="add-hotspot"?this.addHotspot(d,h,"scene"):c==="add-hotspot-scene"?this.addHotspot(d,h,"scene"):c==="add-hotspot-video"?this.addHotspot(d,h,"video"):c==="del-scene"?confirm("确定删除此场景？")&&this.deleteScene(d,h):c==="del-hotspot"&&confirm("确定删除此热点？")&&this.deleteHotspot(d,h,f)})}),this.bindFormEvents()}bindFormEvents(){if(this.editingTarget.type==="global"){const e=this.element.querySelector("#field-appName");e==null||e.addEventListener("input",()=>{this.config.appName=e.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="museum"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-cover");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].cover=n.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="scene"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-thumb"),r=this.element.querySelector("#field-panoLow"),s=this.element.querySelector("#field-pano"),o=this.element.querySelector("#preview-scene-btn");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].thumb=n.value,this.debouncedValidate(),this.notifyChange()}),r==null||r.addEventListener("input",()=>{const a=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];r.value?a.panoLow=r.value:delete a.panoLow,this.debouncedValidate(),this.notifyChange()}),s==null||s.addEventListener("input",()=>{const a=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];s.value?a.pano=s.value:delete a.pano,this.debouncedValidate(),this.notifyChange()}),o==null||o.addEventListener("click",()=>{const a=this.config.museums[this.editingTarget.museumIndex],l=a.scenes[this.editingTarget.sceneIndex];Zn(a.id,l.id)})}if(this.editingTarget.type==="hotspot"){const e=this.element.querySelector("#field-type"),t=this.element.querySelector("#field-label"),n=this.element.querySelector("#field-yaw"),r=this.element.querySelector("#field-pitch"),s=this.element.querySelector("#field-target-museumId"),o=this.element.querySelector("#field-target-sceneId"),a=this.element.querySelector("#field-target-url");e==null||e.addEventListener("change",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];l.type=e.value,l.type==="scene"?l.target={museumId:"",sceneId:""}:l.target={url:""},this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].label=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].yaw=parseFloat(n.value)||0,this.debouncedValidate(),this.notifyChange()}),r==null||r.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].pitch=parseFloat(r.value)||0,this.debouncedValidate(),this.notifyChange()}),s&&s.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;l.museumId||(l.museumId=""),l.museumId=s.value,this.debouncedValidate(),this.notifyChange()}),o&&o.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;l.sceneId||(l.sceneId=""),l.sceneId=o.value,this.debouncedValidate(),this.notifyChange()}),a&&a.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;l.url||(l.url=""),l.url=a.value,this.debouncedValidate(),this.notifyChange()})}}addMuseum(){const e={id:`museum_${Date.now()}`,name:"新博物馆",cover:"",map:{image:"",width:1e3,height:600},scenes:[]};this.config.museums.push(e),this.editingTarget={type:"museum",museumIndex:this.config.museums.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addScene(e){const t={id:`scene_${Date.now()}`,name:"新场景",thumb:"",pano:"",initialView:{yaw:0,pitch:0,fov:75},mapPoint:{x:0,y:0},hotspots:[]};this.config.museums[e].scenes.push(t),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:this.config.museums[e].scenes.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addHotspot(e,t,n="scene"){const r={id:`hotspot_${Date.now()}`,type:n,label:n==="video"?"新视频热点":"新跳转热点",yaw:0,pitch:0,target:n==="video"?{url:""}:{museumId:this.config.museums[e].id,sceneId:""}};this.config.museums[e].scenes[t].hotspots.push(r),this.editingTarget={type:"hotspot",museumIndex:e,sceneIndex:t,hotspotIndex:this.config.museums[e].scenes[t].hotspots.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteMuseum(e){this.config.museums.splice(e,1),this.editingTarget={type:"global"},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteScene(e,t){this.config.museums[e].scenes.splice(t,1),this.editingTarget={type:"museum",museumIndex:e},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteHotspot(e,t,n){this.config.museums[e].scenes[t].hotspots.splice(n,1),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:t},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}debouncedValidate(){this.validationDebounceTimer&&clearTimeout(this.validationDebounceTimer),this.validationDebounceTimer=window.setTimeout(()=>{this.validateConfig()},200)}validateConfig(){this.validationErrors=Va(this.config),this.updateValidationStatus(),this.renderErrors()}scheduleDraftSave(e){e||(this.draftSaveTimer&&clearTimeout(this.draftSaveTimer),this.draftSaveTimer=window.setTimeout(()=>{const t=Ap(this.config);t.ok?this.draftLoaded=!0:this.showToast(`草稿保存失败：${t.reason||"未知原因"}`)},300))}updateValidationStatus(){const e=this.element.querySelector("#validation-status");e&&(this.validationErrors.length===0?(e.innerHTML="✅ 配置通过",e.className="validation-status status-ok"):(e.innerHTML=`❌ ${this.validationErrors.length} 个错误`,e.className="validation-status status-error"))}renderErrors(){const e=this.element.querySelector("#studio-errors");if(e){if(this.validationErrors.length===0){e.innerHTML="";return}e.innerHTML=`
      <div class="studio-errors-content">
        <div class="errors-header">配置错误 (${this.validationErrors.length} 个)</div>
        <div class="errors-list">
          ${this.validationErrors.map(t=>{const n=t.code&&bo[t.code]||"配置错误",r=t.code&&To[t.code]||"请检查配置",s=[];t.museumName&&s.push(`馆：${t.museumName}`),t.sceneName&&s.push(`场景：${t.sceneName}`);const o=s.length>0?s.join(" / "):"全局配置";return`
              <div class="error-card-mini">
                <div class="error-card-header">
                  <span class="error-icon">❌</span>
                  <span class="error-title">${this.escapeHtml(n)}</span>
                </div>
                <div class="error-card-body">
                  <div class="error-location">📍 ${this.escapeHtml(o)}</div>
                  ${t.fieldName?`<div class="error-field">字段：${this.escapeHtml(t.fieldName)}</div>`:""}
                  <div class="error-hint">💡 ${this.escapeHtml(r)}</div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}}notifyChange(e){this.onConfigChange&&this.onConfigChange(this.config),this.scheduleDraftSave(!!(e!=null&&e.skipDraftSave))}showToast(e){const t=document.createElement("div");t.className="studio-toast",t.textContent=e,this.element.appendChild(t),requestAnimationFrame(()=>{t.classList.add("show")}),window.setTimeout(()=>{t.classList.remove("show"),window.setTimeout(()=>t.remove(),300)},2e3)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}getConfig(){return this.config}getElement(){return this.element}remove(){this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}}Bo();class Cp{constructor(){J(this,"appElement");J(this,"config",null);J(this,"panoViewer",null);J(this,"titleBar",null);J(this,"museumList",null);J(this,"sceneList",null);J(this,"mapOverlay",null);J(this,"hotspots",null);J(this,"videoPlayer",null);J(this,"controlBar",null);J(this,"loading");J(this,"debugPanel",null);J(this,"configStudio",null);J(this,"qualityIndicator",null);J(this,"currentMuseum",null);J(this,"currentScene",null);const e=document.getElementById("app");if(!e)throw new Error("找不到 #app 元素");this.appElement=e,this.loading=new yp,this.appElement.appendChild(this.loading.getElement()),this.init()}async init(){try{if(this.loading.show(),Go()){await this.initEditorMode(),this.loading.hide();return}this.config=await ps(),this.titleBar&&this.titleBar.setTitle(this.config.appName),window.addEventListener("popstate",()=>this.handleRoute()),await this.handleRoute(),this.loading.hide()}catch(e){console.error("初始化失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await ps(),this.appElement.innerHTML="",this.configStudio=new Rp(this.config,e=>{this.config=e,ms()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}showConfigErrorPanel(e){this.appElement.innerHTML="";const t=new bp(e,()=>{ms(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(t.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
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
      `)}async handleRoute(){if(!this.config)return;const e=gs();if(this.clearView(),!e.museumId){const t=this.config.museums.find(n=>n.id==="wangding")||this.config.museums[0];if(t){if(t.scenes&&t.scenes.length>0){Zn(t.id,t.scenes[0].id);return}zr(t.id);return}}if(!e.museumId)this.showMuseumList();else if(e.sceneId){const t=Gr(e.museumId),n=Oo(e.museumId,e.sceneId);t&&n?await this.showScene(t,n):(this.showError("未找到指定的场景"),t?zr(t.id):_s())}else{const t=Gr(e.museumId);t?this.showSceneList(t):(this.showError("未找到指定的展馆"),_s())}}showMuseumList(){this.config&&(this.titleBar=new Hr(this.config.appName),this.appElement.appendChild(this.titleBar.getElement()),this.museumList=new _p(this.config.museums),this.appElement.appendChild(this.museumList.getElement()))}showSceneList(e){this.titleBar=new Hr(e.name),this.appElement.appendChild(this.titleBar.getElement());const t=document.createElement("div");t.className="scene-list-page",t.innerHTML=`
      <div class="scene-list-container">
        <h1 class="scene-list-title">${e.name} - 场景列表</h1>
        ${e.description?`<p class="scene-list-desc">${e.description}</p>`:""}
        <div class="scene-grid">
          ${e.scenes.map(r=>`
            <div class="scene-card" data-scene-id="${r.id}">
              <div class="scene-cover">
                <img src="${r.thumb}" alt="${r.name}" loading="lazy">
                <div class="scene-overlay">
                  <h2 class="scene-name">${r.name}</h2>
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
    `,document.head.appendChild(n),t.querySelectorAll(".scene-card").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-scene-id");s&&Zn(e.id,s)})}),this.appElement.appendChild(t)}async showScene(e,t){this.currentMuseum=e,this.currentScene=t,this.loading.show(),this.titleBar=new Hr(t.name),this.appElement.appendChild(this.titleBar.getElement());const n=document.createElement("div");n.className="viewer-container",n.style.cssText=`
      position: fixed;
      top: calc(44px + env(safe-area-inset-top, 0px));
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `,this.appElement.appendChild(n);const r=Ho();if(this.panoViewer=new gp(n,r),r){this.debugPanel=new Tp,this.appElement.appendChild(this.debugPanel.getElement()),this.panoViewer.setOnDebugClick((d,h,f,p,_)=>{this.debugPanel&&this.debugPanel.show(d,h,f,p,_)});const c=()=>{if(this.debugPanel&&this.panoViewer){const d=this.panoViewer.getCurrentView();this.debugPanel.updateView(d.yaw,d.pitch,d.fov)}requestAnimationFrame(c)};c()}this.videoPlayer=new xp,this.appElement.appendChild(this.videoPlayer.getElement()),this.controlBar=new Ep(e,t,this.videoPlayer),this.appElement.appendChild(this.controlBar.getElement()),this.sceneList=this.controlBar.getSceneList(),this.appElement.appendChild(this.sceneList.getElement()),this.mapOverlay=this.controlBar.getMapOverlay(),this.appElement.appendChild(this.mapOverlay.getElement()),this.hotspots=new vp(t.hotspots,c=>{this.videoPlayer&&this.videoPlayer.play(c)}),n.appendChild(this.hotspots.getElement()),this.qualityIndicator=new mp,this.appElement.appendChild(this.qualityIndicator.getElement()),this.panoViewer.setOnStatusChange(c=>{this.qualityIndicator&&this.qualityIndicator.updateStatus(c)}),this.panoViewer.setOnLoad(()=>{this.loading.hide(),this.preloadNextScene(e,t)}),this.panoViewer.setOnError(c=>{console.error("加载场景失败:",c),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),this.qualityIndicator&&this.qualityIndicator.updateStatus(xt.ERROR)});const s=gs(),o=s.yaw!==void 0?s.yaw:t.initialView.yaw||0,a=s.pitch!==void 0?s.pitch:t.initialView.pitch||0,l=s.fov!==void 0?s.fov:t.initialView.fov||75;this.panoViewer.setView(o,a,l),this.panoViewer.loadScene(t)}preloadNextScene(e,t){const r=(e.scenes.findIndex(o=>o.id===t.id)+1)%e.scenes.length,s=e.scenes[r];s&&s.thumb&&Uo(async()=>{const{resolveAssetUrl:o,AssetType:a}=await Promise.resolve().then(()=>pp);return{resolveAssetUrl:o,AssetType:a}},void 0,import.meta.url).then(({resolveAssetUrl:o,AssetType:a})=>{const l=o(s.thumb,a.THUMB);if(l){const c=new Image;c.src=l}})}clearView(){this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneList&&(this.sceneList.remove(),this.sceneList=null),this.mapOverlay&&(this.mapOverlay.remove(),this.mapOverlay=null),this.hotspots&&(this.hotspots.remove(),this.hotspots=null),this.videoPlayer&&(this.videoPlayer.remove(),this.videoPlayer=null),this.controlBar&&(this.controlBar.remove(),this.controlBar=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),this.qualityIndicator&&(this.qualityIndicator.remove(),this.qualityIndicator=null),this.appElement.innerHTML="",this.appElement.appendChild(this.loading.getElement())}showError(e){const t=document.createElement("div");t.className="error-message",t.textContent=e,t.style.cssText=`
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
    `,this.appElement.appendChild(t),setTimeout(()=>{t.remove()},3e3)}}new Cp;
