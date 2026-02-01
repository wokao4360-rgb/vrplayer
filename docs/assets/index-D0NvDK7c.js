var Rd=Object.defineProperty;var Dd=(s,e,t)=>e in s?Rd(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var m=(s,e,t)=>Dd(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Nd="modulepreload",Pd=function(s,e){return new URL(s,e).href},Oa={},Vn=function(e,t,i){let n=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));n=Promise.allSettled(t.map(c=>{if(c=Pd(c,i),c in Oa)return;Oa[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!i)for(let g=o.length-1;g>=0;g--){const E=o[g];if(E.href===c&&(!h||E.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${d}`))return;const p=document.createElement("link");if(p.rel=h?"stylesheet":Nd,h||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),h)return new Promise((g,E)=>{p.addEventListener("load",g),p.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return n.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};var ie=(s=>(s.INVALID_ROOT="INVALID_ROOT",s.MISSING_APP_NAME="MISSING_APP_NAME",s.MUSEUMS_NOT_ARRAY="MUSEUMS_NOT_ARRAY",s.MUSEUMS_EMPTY="MUSEUMS_EMPTY",s.MISSING_MUSEUM_ID="MISSING_MUSEUM_ID",s.DUPLICATE_MUSEUM_ID="DUPLICATE_MUSEUM_ID",s.MISSING_MUSEUM_NAME="MISSING_MUSEUM_NAME",s.MISSING_MUSEUM_COVER="MISSING_MUSEUM_COVER",s.MISSING_MUSEUM_MAP="MISSING_MUSEUM_MAP",s.MISSING_MAP_IMAGE="MISSING_MAP_IMAGE",s.INVALID_MAP_WIDTH="INVALID_MAP_WIDTH",s.INVALID_MAP_HEIGHT="INVALID_MAP_HEIGHT",s.SCENES_NOT_ARRAY="SCENES_NOT_ARRAY",s.SCENES_EMPTY="SCENES_EMPTY",s.MISSING_SCENE_ID="MISSING_SCENE_ID",s.DUPLICATE_SCENE_ID="DUPLICATE_SCENE_ID",s.MISSING_SCENE_NAME="MISSING_SCENE_NAME",s.MISSING_PANO="MISSING_PANO",s.INVALID_PANO_URL="INVALID_PANO_URL",s.INVALID_PANOLOW_URL="INVALID_PANOLOW_URL",s.MISSING_THUMB="MISSING_THUMB",s.MISSING_INITIAL_VIEW="MISSING_INITIAL_VIEW",s.INVALID_YAW="INVALID_YAW",s.INVALID_PITCH="INVALID_PITCH",s.INVALID_FOV="INVALID_FOV",s.MISSING_MAP_POINT="MISSING_MAP_POINT",s.INVALID_MAP_POINT_X="INVALID_MAP_POINT_X",s.INVALID_MAP_POINT_Y="INVALID_MAP_POINT_Y",s.HOTSPOTS_NOT_ARRAY="HOTSPOTS_NOT_ARRAY",s.MISSING_HOTSPOT_ID="MISSING_HOTSPOT_ID",s.DUPLICATE_HOTSPOT_ID="DUPLICATE_HOTSPOT_ID",s.INVALID_HOTSPOT_TYPE="INVALID_HOTSPOT_TYPE",s.MISSING_HOTSPOT_LABEL="MISSING_HOTSPOT_LABEL",s.INVALID_HOTSPOT_YAW="INVALID_HOTSPOT_YAW",s.INVALID_HOTSPOT_PITCH="INVALID_HOTSPOT_PITCH",s.MISSING_HOTSPOT_TARGET="MISSING_HOTSPOT_TARGET",s.MISSING_TARGET_MUSEUM_ID="MISSING_TARGET_MUSEUM_ID",s.MISSING_TARGET_SCENE_ID="MISSING_TARGET_SCENE_ID",s.INVALID_TARGET_YAW="INVALID_TARGET_YAW",s.INVALID_TARGET_PITCH="INVALID_TARGET_PITCH",s.INVALID_TARGET_FOV="INVALID_TARGET_FOV",s.MISSING_TARGET_URL="MISSING_TARGET_URL",s))(ie||{});function Kc(s){const e=[];if(!s||typeof s!="object")return e.push({code:"INVALID_ROOT",path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!s.appName||typeof s.appName!="string"||s.appName.trim()==="")&&e.push({code:"MISSING_APP_NAME",path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!Array.isArray(s.museums))return e.push({code:"MUSEUMS_NOT_ARRAY",path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;s.museums.length===0&&e.push({code:"MUSEUMS_EMPTY",path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const t=new Set;return s.museums.forEach((i,n)=>{const r=`museums[${n}]`,o=i.name&&typeof i.name=="string"?i.name:void 0;if(!i.id||typeof i.id!="string"||i.id.trim()===""?e.push({code:"MISSING_MUSEUM_ID",path:`${r}.id`,message:"id 必须是非空字符串",museumName:o,fieldName:"博物馆 ID"}):(t.has(i.id)&&e.push({code:"DUPLICATE_MUSEUM_ID",path:`${r}.id`,message:`博物馆 ID "${i.id}" 重复`,museumName:o,fieldName:"博物馆 ID"}),t.add(i.id)),(!i.name||typeof i.name!="string"||i.name.trim()==="")&&e.push({code:"MISSING_MUSEUM_NAME",path:`${r}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),(!i.cover||typeof i.cover!="string"||i.cover.trim()==="")&&e.push({code:"MISSING_MUSEUM_COVER",path:`${r}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:o,fieldName:"封面图"}),!i.map||typeof i.map!="object"?e.push({code:"MISSING_MUSEUM_MAP",path:`${r}.map`,message:"map 必须是对象",museumName:o,fieldName:"地图配置"}):((!i.map.image||typeof i.map.image!="string"||i.map.image.trim()==="")&&e.push({code:"MISSING_MAP_IMAGE",path:`${r}.map.image`,message:"map.image 必须是有效的 URL 字符串",museumName:o,fieldName:"地图图片"}),(typeof i.map.width!="number"||i.map.width<=0)&&e.push({code:"INVALID_MAP_WIDTH",path:`${r}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:o,fieldName:"地图宽度"}),(typeof i.map.height!="number"||i.map.height<=0)&&e.push({code:"INVALID_MAP_HEIGHT",path:`${r}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:o,fieldName:"地图高度"})),!Array.isArray(i.scenes))e.push({code:"SCENES_NOT_ARRAY",path:`${r}.scenes`,message:"scenes 必须是数组",museumName:o,fieldName:"场景列表"});else{i.scenes.length===0&&e.push({code:"SCENES_EMPTY",path:`${r}.scenes`,message:"scenes 数组不能为空",museumName:o,fieldName:"场景列表"});const a=new Set;i.scenes.forEach((l,c)=>{var E;const h=`${r}.scenes[${c}]`,d=l.name&&typeof l.name=="string"?l.name:void 0;!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:"MISSING_SCENE_ID",path:`${h}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:d,fieldName:"场景 ID"}):(a.has(l.id)&&e.push({code:"DUPLICATE_SCENE_ID",path:`${h}.id`,message:`场景 ID "${l.id}" 在博物馆内重复`,museumName:o,sceneName:d,fieldName:"场景 ID"}),a.add(l.id)),(!l.name||typeof l.name!="string"||l.name.trim()==="")&&e.push({code:"MISSING_SCENE_NAME",path:`${h}.name`,message:"name 必须是非空字符串",museumName:o,sceneName:void 0,fieldName:"场景名称"});const u=!!l.pano,p=!!l.panoLow,g=!!((E=l.panoTiles)!=null&&E.manifest);if(!u&&!p&&!g?e.push({code:"MISSING_PANO",path:`${h}.pano`,message:"pano / panoLow / panoTiles 至少需要提供一个",museumName:o,sceneName:d,fieldName:"全景图"}):(l.pano&&(typeof l.pano!="string"||l.pano.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${h}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:o,sceneName:d,fieldName:"高清全景图"}),l.panoLow&&(typeof l.panoLow!="string"||l.panoLow.trim()==="")&&e.push({code:"INVALID_PANOLOW_URL",path:`${h}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:o,sceneName:d,fieldName:"低清全景图"}),l.panoTiles&&(typeof l.panoTiles!="object"?e.push({code:"INVALID_PANO_URL",path:`${h}.panoTiles`,message:"panoTiles 必须是对象，包含 manifest",museumName:o,sceneName:d,fieldName:"瓦片元数据"}):(!l.panoTiles.manifest||typeof l.panoTiles.manifest!="string"||l.panoTiles.manifest.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${h}.panoTiles.manifest`,message:"panoTiles.manifest 必须是有效的字符串",museumName:o,sceneName:d,fieldName:"瓦片 manifest"}))),(!l.thumb||typeof l.thumb!="string"||l.thumb.trim()==="")&&e.push({code:"MISSING_THUMB",path:`${h}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:o,sceneName:d,fieldName:"缩略图"}),!l.initialView||typeof l.initialView!="object"?e.push({code:"MISSING_INITIAL_VIEW",path:`${h}.initialView`,message:"initialView 必须是对象",museumName:o,sceneName:d,fieldName:"初始视角"}):(typeof l.initialView.yaw!="number"&&e.push({code:"INVALID_YAW",path:`${h}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:o,sceneName:d,fieldName:"水平角度"}),typeof l.initialView.pitch!="number"&&e.push({code:"INVALID_PITCH",path:`${h}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:o,sceneName:d,fieldName:"垂直角度"}),l.initialView.fov!==void 0&&typeof l.initialView.fov!="number"&&e.push({code:"INVALID_FOV",path:`${h}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:o,sceneName:d,fieldName:"视野角度"})),!l.mapPoint||typeof l.mapPoint!="object"?e.push({code:"MISSING_MAP_POINT",path:`${h}.mapPoint`,message:"mapPoint 必须是对象",museumName:o,sceneName:d,fieldName:"地图点位"}):(typeof l.mapPoint.x!="number"&&e.push({code:"INVALID_MAP_POINT_X",path:`${h}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:o,sceneName:d,fieldName:"地图点位 X 坐标"}),typeof l.mapPoint.y!="number"&&e.push({code:"INVALID_MAP_POINT_Y",path:`${h}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:o,sceneName:d,fieldName:"地图点位 Y 坐标"})),!Array.isArray(l.hotspots))e.push({code:"HOTSPOTS_NOT_ARRAY",path:`${h}.hotspots`,message:"hotspots 必须是数组",museumName:o,sceneName:d,fieldName:"热点列表"});else{const A=new Set;l.hotspots.forEach((f,y)=>{const v=`${h}.hotspots[${y}]`;!f.id||typeof f.id!="string"||f.id.trim()===""?e.push({code:"MISSING_HOTSPOT_ID",path:`${v}.id`,message:"id 必须是非空字符串",museumName:o,sceneName:d,fieldName:"热点 ID"}):(A.has(f.id)&&e.push({code:"DUPLICATE_HOTSPOT_ID",path:`${v}.id`,message:`热点 ID "${f.id}" 在场景内重复`,museumName:o,sceneName:d,fieldName:"热点 ID"}),A.add(f.id)),f.type!=="scene"&&f.type!=="video"&&f.type!=="image"&&f.type!=="info"&&e.push({code:"INVALID_HOTSPOT_TYPE",path:`${v}.type`,message:'type 必须是 "scene"、"video"、"image" 或 "info"',museumName:o,sceneName:d,fieldName:"热点类型"}),(!f.label||typeof f.label!="string"||f.label.trim()==="")&&e.push({code:"MISSING_HOTSPOT_LABEL",path:`${v}.label`,message:"label 必须是非空字符串",museumName:o,sceneName:d,fieldName:"热点标签"}),typeof f.yaw!="number"&&e.push({code:"INVALID_HOTSPOT_YAW",path:`${v}.yaw`,message:"yaw 必须是数字",museumName:o,sceneName:d,fieldName:"热点水平角度"}),typeof f.pitch!="number"&&e.push({code:"INVALID_HOTSPOT_PITCH",path:`${v}.pitch`,message:"pitch 必须是数字",museumName:o,sceneName:d,fieldName:"热点垂直角度"}),f.type==="scene"?!f.target||typeof f.target!="object"?e.push({code:"MISSING_HOTSPOT_TARGET",path:`${v}.target`,message:"scene 类型热点必须提供 target 对象",museumName:o,sceneName:d,fieldName:"热点目标配置"}):((!f.target.museumId||typeof f.target.museumId!="string")&&e.push({code:"MISSING_TARGET_MUSEUM_ID",path:`${v}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:o,sceneName:d,fieldName:"目标博物馆 ID"}),typeof f.target.sceneId!="string"&&e.push({code:"MISSING_TARGET_SCENE_ID",path:`${v}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）",museumName:o,sceneName:d,fieldName:"目标场景 ID"}),f.target.yaw!==void 0&&typeof f.target.yaw!="number"&&e.push({code:"INVALID_TARGET_YAW",path:`${v}.target.yaw`,message:"target.yaw 必须是数字",museumName:o,sceneName:d,fieldName:"目标水平角度"}),f.target.pitch!==void 0&&typeof f.target.pitch!="number"&&e.push({code:"INVALID_TARGET_PITCH",path:`${v}.target.pitch`,message:"target.pitch 必须是数字",museumName:o,sceneName:d,fieldName:"目标垂直角度"}),f.target.fov!==void 0&&typeof f.target.fov!="number"&&e.push({code:"INVALID_TARGET_FOV",path:`${v}.target.fov`,message:"target.fov 必须是数字",museumName:o,sceneName:d,fieldName:"目标视野角度"})):f.type==="video"&&f.target&&typeof f.target!="object"&&e.push({code:"MISSING_HOTSPOT_TARGET",path:`${v}.target`,message:"video 类型热点的 target 必须是对象（如果提供）",museumName:o,sceneName:d,fieldName:"热点目标配置"})})}})}}),e}let tn=null;async function Ga(){if(tn)return tn;try{const s=await fetch("./config.json",{cache:"no-store"});if(!s.ok)throw new Error(`加载配置失败: ${s.status}`);const e=await s.json(),t=Kc(e);if(t.length>0){const i=new Error("配置校验失败");throw i.validationErrors=t,i}return tn=e,tn}catch(s){throw console.error("加载配置失败:",s),s}}function Ha(){tn=null}function Qo(s){if(tn)return tn.museums.find(e=>e.id===s)}function Ud(s,e){const t=Qo(s);if(t)return t.scenes.find(i=>i.id===e)}function jc(s){const e=new URL(window.location.href);return e.search="",Object.entries(s).forEach(([t,i])=>{i!=null&&i!==""&&e.searchParams.set(t,String(i))}),e.pathname+e.search+e.hash}function Fd(){return window.location.pathname}function kd(){if(window.location.pathname.includes("//")){const s=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",s+window.location.search+window.location.hash)}}let Va=null,za=0;const Qd=200;function si(s){if(s.type==="focus"){const e=`${s.museumId}:${s.sceneId}`,t=Date.now();if(e===Va&&t-za<Qd)return;Va=e,za=t}window.dispatchEvent(new CustomEvent("vr:scene-focus",{detail:s}))}function Rr(s){const e=t=>{s(t.detail)};return window.addEventListener("vr:scene-focus",e),()=>{window.removeEventListener("vr:scene-focus",e)}}function Wa(){const s=new URLSearchParams(window.location.search),e=s.get("yaw"),t=s.get("pitch"),i=s.get("fov");return{museumId:s.get("museum")||void 0,sceneId:s.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:t?parseFloat(t):void 0,fov:i?parseFloat(i):void 0}}function Od(){return new URLSearchParams(window.location.search).get("debug")==="1"}function Gd(){const s=new URLSearchParams(window.location.search);return s.get("editor")==="1"||s.get("debug")==="1"}function Ya(){const s=Fd();window.history.pushState({},"",s),window.dispatchEvent(new Event("popstate"))}function Oo(s){const e=jc({museum:s});window.history.pushState({},"",e),window.dispatchEvent(new Event("popstate"))}function ti(s,e,t){const i=jc({museum:s,scene:e,yaw:t==null?void 0:t.yaw,pitch:t==null?void 0:t.pitch,fov:t==null?void 0:t.fov});window.history.pushState({},"",i),si({type:"focus",museumId:s,sceneId:e,source:"dock",ts:Date.now()}),window.dispatchEvent(new Event("popstate"))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ha="160",py={ROTATE:0,DOLLY:1,PAN:2},Ay={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hd=0,qa=1,Vd=2,Zc=1,zd=2,Ii=3,Gi=0,Gt=1,ci=2,Oi=0,Gn=1,Xa=2,$a=3,Ja=4,Wd=5,Zi=100,Yd=101,qd=102,Ka=103,ja=104,Xd=200,$d=201,Jd=202,Kd=203,Go=204,Ho=205,jd=206,Zd=207,eu=208,tu=209,iu=210,nu=211,su=212,ru=213,ou=214,au=0,lu=1,cu=2,gr=3,hu=4,du=5,uu=6,fu=7,eh=0,pu=1,Au=2,wi=0,mu=1,gu=2,Eu=3,th=4,vu=5,yu=6,Za="attached",_u="detached",ih=300,cn=301,zn=302,Vo=303,zo=304,Dr=306,Wo=1e3,ot=1001,Yo=1002,St=1003,el=1004,Wr=1005,gt=1006,Iu=1007,Hi=1008,vt=1009,xu=1010,Cu=1011,da=1012,nh=1013,Fi=1014,Wt=1015,Si=1016,sh=1017,rh=1018,on=1020,bu=1021,bt=1023,wu=1024,Su=1025,an=1026,Wn=1027,Un=1028,oh=1029,Fn=1030,ah=1031,lh=1033,cr=33776,Yr=33777,qr=33778,hr=33779,qo=35840,tl=35841,Xo=35842,il=35843,ua=36196,$o=37492,Jo=37496,Ko=37808,nl=37809,sl=37810,rl=37811,Er=37812,ol=37813,al=37814,ll=37815,cl=37816,hl=37817,dl=37818,ul=37819,fl=37820,pl=37821,dr=36492,Al=36494,ml=36495,Mu=36283,gl=36284,El=36285,vl=36286,vr=2300,yr=2301,Xr=2302,yl=2400,_l=2401,Il=2402,Tu=2500,my=0,gy=1,Ey=2,ch=3e3,$t=3001,Bu=3200,Lu=3201,hh=0,Ru=1,Ot="",st="srgb",ui="srgb-linear",Nr="display-p3",Is="display-p3-linear",_r="linear",nt="srgb",Ir="rec709",xr="p3",un=7680,xl=519,Du=512,Nu=513,Pu=514,dh=515,Uu=516,Fu=517,ku=518,Qu=519,jo=35044,Cl="300 es",Zo=1035,Ci=2e3,Cr=2001;class $n{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,e);e.target=null}}}const Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bl=1234567;const ps=Math.PI/180,Yn=180/Math.PI;function ri(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Bt[s&255]+Bt[s>>8&255]+Bt[s>>16&255]+Bt[s>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[i&255]+Bt[i>>8&255]+Bt[i>>16&255]+Bt[i>>24&255]).toLowerCase()}function Mt(s,e,t){return Math.max(e,Math.min(t,s))}function fa(s,e){return(s%e+e)%e}function Ou(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function Gu(s,e,t){return s!==e?(t-s)/(e-s):0}function As(s,e,t){return(1-t)*s+t*e}function Hu(s,e,t,i){return As(s,e,1-Math.exp(-t*i))}function Vu(s,e=1){return e-Math.abs(fa(s,e*2)-e)}function zu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Wu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Yu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function qu(s,e){return s+Math.random()*(e-s)}function Xu(s){return s*(.5-Math.random())}function $u(s){s!==void 0&&(bl=s);let e=bl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ju(s){return s*ps}function Ku(s){return s*Yn}function ea(s){return(s&s-1)===0&&s!==0}function ju(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function br(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Zu(s,e,t,i,n){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),h=o((e+i)/2),d=r((e-i)/2),u=o((e-i)/2),p=r((i-e)/2),g=o((i-e)/2);switch(n){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*p,a*c);break;case"YXY":s.set(l*p,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function hi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function $e(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const at={DEG2RAD:ps,RAD2DEG:Yn,generateUUID:ri,clamp:Mt,euclideanModulo:fa,mapLinear:Ou,inverseLerp:Gu,lerp:As,damp:Hu,pingpong:Vu,smoothstep:zu,smootherstep:Wu,randInt:Yu,randFloat:qu,randFloatSpread:Xu,seededRandom:$u,degToRad:Ju,radToDeg:Ku,isPowerOfTwo:ea,ceilPowerOfTwo:ju,floorPowerOfTwo:br,setQuaternionFromProperEuler:Zu,normalize:$e,denormalize:hi};class xe{constructor(e=0,t=0){xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Mt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*n+e.x,this.y=r*n+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Oe{constructor(e,t,i,n,r,o,a,l,c){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,l,c)}set(e,t,i,n,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],g=i[8],E=n[0],A=n[3],f=n[6],y=n[1],v=n[4],b=n[7],T=n[2],S=n[5],M=n[8];return r[0]=o*E+a*y+l*T,r[3]=o*A+a*v+l*S,r[6]=o*f+a*b+l*M,r[1]=c*E+h*y+d*T,r[4]=c*A+h*v+d*S,r[7]=c*f+h*b+d*M,r[2]=u*E+p*y+g*T,r[5]=u*A+p*v+g*S,r[8]=u*f+p*b+g*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+n*r*c-n*o*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,p=c*r-o*l,g=t*d+i*u+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/g;return e[0]=d*E,e[1]=(n*c-h*i)*E,e[2]=(a*i-n*o)*E,e[3]=u*E,e[4]=(h*t-n*l)*E,e[5]=(n*r-a*t)*E,e[6]=p*E,e[7]=(i*l-c*t)*E,e[8]=(o*t-i*r)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-n*c,n*l,-n*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply($r.makeScale(e,t)),this}rotate(e){return this.premultiply($r.makeRotation(-e)),this}translate(e,t){return this.premultiply($r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new Oe;function uh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Es(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ef(){const s=Es("canvas");return s.style.display="block",s}const wl={};function ms(s){s in wl||(wl[s]=!0,console.warn(s))}const Sl=new Oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ml=new Oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ms={[ui]:{transfer:_r,primaries:Ir,toReference:s=>s,fromReference:s=>s},[st]:{transfer:nt,primaries:Ir,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Is]:{transfer:_r,primaries:xr,toReference:s=>s.applyMatrix3(Ml),fromReference:s=>s.applyMatrix3(Sl)},[Nr]:{transfer:nt,primaries:xr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Ml),fromReference:s=>s.applyMatrix3(Sl).convertLinearToSRGB()}},tf=new Set([ui,Is]),Ke={enabled:!0,_workingColorSpace:ui,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!tf.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=Ms[e].toReference,n=Ms[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ms[s].primaries},getTransfer:function(s){return s===Ot?_r:Ms[s].transfer}};function Hn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Jr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let fn;class fh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{fn===void 0&&(fn=Es("canvas")),fn.width=e.width,fn.height=e.height;const i=fn.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=fn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let o=0;o<r.length;o++)r[o]=Hn(r[o]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Hn(t[i]/255)*255):t[i]=Hn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nf=0;class ph{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=ri(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?r.push(Kr(n[o].image)):r.push(Kr(n[o]))}else r=Kr(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function Kr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?fh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sf=0;class wt extends $n{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,i=ot,n=ot,r=gt,o=Hi,a=bt,l=vt,c=wt.DEFAULT_ANISOTROPY,h=Ot){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=ri(),this.name="",this.source=new ph(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===$t?st:Ot),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ih)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wo:e.x=e.x-Math.floor(e.x);break;case ot:e.x=e.x<0?0:1;break;case Yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wo:e.y=e.y-Math.floor(e.y);break;case ot:e.y=e.y<0?0:1;break;case Yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===st?$t:ch}set encoding(e){ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===$t?st:Ot}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=ih;wt.DEFAULT_ANISOTROPY=1;class Ze{constructor(e=0,t=0,i=0,n=1){Ze.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*n+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*n+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*n+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],E=l[2],A=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-E)<.01&&Math.abs(g-A)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+E)<.1&&Math.abs(g+A)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,b=(p+1)/2,T=(f+1)/2,S=(h+u)/4,M=(d+E)/4,D=(g+A)/4;return v>b&&v>T?v<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(v),n=S/i,r=M/i):b>T?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=S/n,r=D/n):T<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(T),i=M/r,n=D/r),this.set(i,n,r,t),this}let y=Math.sqrt((A-g)*(A-g)+(d-E)*(d-E)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(A-g)/y,this.y=(d-E)/y,this.z=(u-h)/y,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rf extends $n{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ze(0,0,e,t),this.scissorTest=!1,this.viewport=new Ze(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(ms("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===$t?st:Ot),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new wt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ph(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hn extends rf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ah extends wt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=St,this.minFilter=St,this.wrapR=ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mh extends wt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=St,this.minFilter=St,this.wrapR=ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ti{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,o,a){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3];const u=r[o+0],p=r[o+1],g=r[o+2],E=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=E;return}if(d!==E||l!==u||c!==p||h!==g){let A=1-a;const f=l*u+c*p+h*g+d*E,y=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const T=Math.sqrt(v),S=Math.atan2(T,f*y);A=Math.sin(A*S)/T,a=Math.sin(a*S)/T}const b=a*y;if(l=l*A+u*b,c=c*A+p*b,h=h*A+g*b,d=d*A+E*b,A===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=T,c*=T,h*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,n,r,o){const a=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*d+l*p-c*u,e[t+1]=l*g+h*u+c*d-a*p,e[t+2]=c*g+h*p+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(n/2),d=a(r/2),u=l(i/2),p=l(n/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-n)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(n+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(r-c)/p,this._x=(n+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-n)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+n*c-r*l,this._y=n*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-n*a,this._w=o*h-i*a-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+n*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=n,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*n+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=n*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*n-a*i),h=2*(a*t-r*n),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=n+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=n*l-r*a,this.y=r*o-i*l,this.z=i*a-n*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return jr.copy(this).projectOnVector(e),this.sub(jr)}reflect(e){return this.sub(jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Mt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new L,Tl=new Ti;class fi{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Kt):Kt.fromBufferAttribute(r,o),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ts.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ts.copy(i.boundingBox)),Ts.applyMatrix4(e.matrixWorld),this.union(Ts)}const n=e.children;for(let r=0,o=n.length;r<o;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ns),Bs.subVectors(this.max,ns),pn.subVectors(e.a,ns),An.subVectors(e.b,ns),mn.subVectors(e.c,ns),Li.subVectors(An,pn),Ri.subVectors(mn,An),Yi.subVectors(pn,mn);let t=[0,-Li.z,Li.y,0,-Ri.z,Ri.y,0,-Yi.z,Yi.y,Li.z,0,-Li.x,Ri.z,0,-Ri.x,Yi.z,0,-Yi.x,-Li.y,Li.x,0,-Ri.y,Ri.x,0,-Yi.y,Yi.x,0];return!Zr(t,pn,An,mn,Bs)||(t=[1,0,0,0,1,0,0,0,1],!Zr(t,pn,An,mn,Bs))?!1:(Ls.crossVectors(Li,Ri),t=[Ls.x,Ls.y,Ls.z],Zr(t,pn,An,mn,Bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mi=[new L,new L,new L,new L,new L,new L,new L,new L],Kt=new L,Ts=new fi,pn=new L,An=new L,mn=new L,Li=new L,Ri=new L,Yi=new L,ns=new L,Bs=new L,Ls=new L,qi=new L;function Zr(s,e,t,i,n){for(let r=0,o=s.length-3;r<=o;r+=3){qi.fromArray(s,r);const a=n.x*Math.abs(qi.x)+n.y*Math.abs(qi.y)+n.z*Math.abs(qi.z),l=e.dot(qi),c=t.dot(qi),h=i.dot(qi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const of=new fi,ss=new L,eo=new L;class Bi{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):of.setFromPoints(e).getCenter(i);let n=0;for(let r=0,o=e.length;r<o;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ss.subVectors(e,this.center);const t=ss.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(ss,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(eo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ss.copy(e.center).add(eo)),this.expandByPoint(ss.copy(e.center).sub(eo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new L,to=new L,Rs=new L,Di=new L,io=new L,Ds=new L,no=new L;class xs{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.origin).addScaledVector(this.direction,t),gi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){to.copy(e).add(t).multiplyScalar(.5),Rs.copy(t).sub(e).normalize(),Di.copy(this.origin).sub(to);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Rs),a=Di.dot(this.direction),l=-Di.dot(Rs),c=Di.lengthSq(),h=Math.abs(1-o*o);let d,u,p,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const E=1/h;d*=E,u*=E,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(to).addScaledVector(Rs,u),p}intersectSphere(e,t){gi.subVectors(e.center,this.origin);const i=gi.dot(this.direction),n=gi.dot(gi)-i*i,r=e.radius*e.radius;if(n>r)return null;const o=Math.sqrt(r-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,n=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,n=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||r>n||((r>i||isNaN(i))&&(i=r),(o<n||isNaN(n))&&(n=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,i,n,r){io.subVectors(t,e),Ds.subVectors(i,e),no.crossVectors(io,Ds);let o=this.direction.dot(no),a;if(o>0){if(n)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Di.subVectors(this.origin,e);const l=a*this.direction.dot(Ds.crossVectors(Di,Ds));if(l<0)return null;const c=a*this.direction.dot(io.cross(Di));if(c<0||l+c>o)return null;const h=-a*Di.dot(no);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ve{constructor(e,t,i,n,r,o,a,l,c,h,d,u,p,g,E,A){Ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,l,c,h,d,u,p,g,E,A)}set(e,t,i,n,r,o,a,l,c,h,d,u,p,g,E,A){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=n,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=E,f[15]=A,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ve().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/gn.setFromMatrixColumn(e,0).length(),r=1/gn.setFromMatrixColumn(e,1).length(),o=1/gn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=o*h,p=o*d,g=a*h,E=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=u-E*c,t[9]=-a*l,t[2]=E-u*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,g=c*h,E=c*d;t[0]=u+E*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=E+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,g=c*h,E=c*d;t[0]=u-E*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=E-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,p=o*d,g=a*h,E=a*d;t[0]=l*h,t[4]=g*c-p,t[8]=u*c+E,t[1]=l*d,t[5]=E*c+u,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,g=a*l,E=a*c;t[0]=l*h,t[4]=E-u*d,t[8]=g*d+p,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*d+g,t[10]=u-E*d}else if(e.order==="XZY"){const u=o*l,p=o*c,g=a*l,E=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+E,t[5]=o*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*h,t[10]=E*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(af,e,lf)}lookAt(e,t,i){const n=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Ni.crossVectors(i,Vt),Ni.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Ni.crossVectors(i,Vt)),Ni.normalize(),Ns.crossVectors(Vt,Ni),n[0]=Ni.x,n[4]=Ns.x,n[8]=Vt.x,n[1]=Ni.y,n[5]=Ns.y,n[9]=Vt.y,n[2]=Ni.z,n[6]=Ns.z,n[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],g=i[2],E=i[6],A=i[10],f=i[14],y=i[3],v=i[7],b=i[11],T=i[15],S=n[0],M=n[4],D=n[8],_=n[12],w=n[1],N=n[5],H=n[9],$=n[13],R=n[2],U=n[6],z=n[10],q=n[14],W=n[3],Y=n[7],X=n[11],K=n[15];return r[0]=o*S+a*w+l*R+c*W,r[4]=o*M+a*N+l*U+c*Y,r[8]=o*D+a*H+l*z+c*X,r[12]=o*_+a*$+l*q+c*K,r[1]=h*S+d*w+u*R+p*W,r[5]=h*M+d*N+u*U+p*Y,r[9]=h*D+d*H+u*z+p*X,r[13]=h*_+d*$+u*q+p*K,r[2]=g*S+E*w+A*R+f*W,r[6]=g*M+E*N+A*U+f*Y,r[10]=g*D+E*H+A*z+f*X,r[14]=g*_+E*$+A*q+f*K,r[3]=y*S+v*w+b*R+T*W,r[7]=y*M+v*N+b*U+T*Y,r[11]=y*D+v*H+b*z+T*X,r[15]=y*_+v*$+b*q+T*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],E=e[7],A=e[11],f=e[15];return g*(+r*l*d-n*c*d-r*a*u+i*c*u+n*a*p-i*l*p)+E*(+t*l*p-t*c*u+r*o*u-n*o*p+n*c*h-r*l*h)+A*(+t*c*d-t*a*p-r*o*d+i*o*p+r*a*h-i*c*h)+f*(-n*a*h-t*l*d+t*a*u+n*o*d-i*o*u+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],E=e[13],A=e[14],f=e[15],y=d*A*c-E*u*c+E*l*p-a*A*p-d*l*f+a*u*f,v=g*u*c-h*A*c-g*l*p+o*A*p+h*l*f-o*u*f,b=h*E*c-g*d*c+g*a*p-o*E*p-h*a*f+o*d*f,T=g*d*l-h*E*l-g*a*u+o*E*u+h*a*A-o*d*A,S=t*y+i*v+n*b+r*T;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/S;return e[0]=y*M,e[1]=(E*u*r-d*A*r-E*n*p+i*A*p+d*n*f-i*u*f)*M,e[2]=(a*A*r-E*l*r+E*n*c-i*A*c-a*n*f+i*l*f)*M,e[3]=(d*l*r-a*u*r-d*n*c+i*u*c+a*n*p-i*l*p)*M,e[4]=v*M,e[5]=(h*A*r-g*u*r+g*n*p-t*A*p-h*n*f+t*u*f)*M,e[6]=(g*l*r-o*A*r-g*n*c+t*A*c+o*n*f-t*l*f)*M,e[7]=(o*u*r-h*l*r+h*n*c-t*u*c-o*n*p+t*l*p)*M,e[8]=b*M,e[9]=(g*d*r-h*E*r-g*i*p+t*E*p+h*i*f-t*d*f)*M,e[10]=(o*E*r-g*a*r+g*i*c-t*E*c-o*i*f+t*a*f)*M,e[11]=(h*a*r-o*d*r-h*i*c+t*d*c+o*i*p-t*a*p)*M,e[12]=T*M,e[13]=(h*E*n-g*d*n+g*i*u-t*E*u-h*i*A+t*d*A)*M,e[14]=(g*a*n-o*E*n-g*i*l+t*E*l+o*i*A-t*a*A)*M,e[15]=(o*d*n-h*a*n+h*i*l-t*d*l-o*i*u+t*a*u)*M,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,h*a+i,h*l-n*o,0,c*l-n*a,h*l+n*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,o){return this.set(1,i,r,0,e,1,o,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,p=r*h,g=r*d,E=o*h,A=o*d,f=a*d,y=l*c,v=l*h,b=l*d,T=i.x,S=i.y,M=i.z;return n[0]=(1-(E+f))*T,n[1]=(p+b)*T,n[2]=(g-v)*T,n[3]=0,n[4]=(p-b)*S,n[5]=(1-(u+f))*S,n[6]=(A+y)*S,n[7]=0,n[8]=(g+v)*M,n[9]=(A-y)*M,n[10]=(1-(u+E))*M,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=gn.set(n[0],n[1],n[2]).length();const o=gn.set(n[4],n[5],n[6]).length(),a=gn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],jt.copy(this);const c=1/r,h=1/o,d=1/a;return jt.elements[0]*=c,jt.elements[1]*=c,jt.elements[2]*=c,jt.elements[4]*=h,jt.elements[5]*=h,jt.elements[6]*=h,jt.elements[8]*=d,jt.elements[9]*=d,jt.elements[10]*=d,t.setFromRotationMatrix(jt),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,n,r,o,a=Ci){const l=this.elements,c=2*r/(t-e),h=2*r/(i-n),d=(t+e)/(t-e),u=(i+n)/(i-n);let p,g;if(a===Ci)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Cr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,r,o,a=Ci){const l=this.elements,c=1/(t-e),h=1/(i-n),d=1/(o-r),u=(t+e)*c,p=(i+n)*h;let g,E;if(a===Ci)g=(o+r)*d,E=-2*d;else if(a===Cr)g=r*d,E=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=E,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const gn=new L,jt=new Ve,af=new L(0,0,0),lf=new L(1,1,1),Ni=new L,Ns=new L,Vt=new L,Bl=new Ve,Ll=new Ti;class Cs{constructor(e=0,t=0,i=0,n=Cs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],o=n[4],a=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Bl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ll.setFromEuler(this),this.setFromQuaternion(Ll,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cs.DEFAULT_ORDER="XYZ";class pa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cf=0;const Rl=new L,En=new Ti,Ei=new Ve,Ps=new L,rs=new L,hf=new L,df=new Ti,Dl=new L(1,0,0),Nl=new L(0,1,0),Pl=new L(0,0,1),uf={type:"added"},ff={type:"removed"};class pt extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new L,t=new Cs,i=new Ti,n=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Ve},normalMatrix:{value:new Oe}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return En.setFromAxisAngle(e,t),this.quaternion.multiply(En),this}rotateOnWorldAxis(e,t){return En.setFromAxisAngle(e,t),this.quaternion.premultiply(En),this}rotateX(e){return this.rotateOnAxis(Dl,e)}rotateY(e){return this.rotateOnAxis(Nl,e)}rotateZ(e){return this.rotateOnAxis(Pl,e)}translateOnAxis(e,t){return Rl.copy(e).applyQuaternion(this.quaternion),this.position.add(Rl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dl,e)}translateY(e){return this.translateOnAxis(Nl,e)}translateZ(e){return this.translateOnAxis(Pl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ps.copy(e):Ps.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(rs,Ps,this.up):Ei.lookAt(Ps,rs,this.up),this.quaternion.setFromRotationMatrix(Ei),n&&(Ei.extractRotation(n.matrixWorld),En.setFromRotationMatrix(Ei),this.quaternion.premultiply(En.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(uf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ff)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,e,hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let r=0,o=n.length;r<o;r++){const a=n[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));n.material=a}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];n.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}pt.DEFAULT_UP=new L(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new L,vi=new L,so=new L,yi=new L,vn=new L,yn=new L,Ul=new L,ro=new L,oo=new L,ao=new L;let Us=!1;class Xt{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Zt.subVectors(e,t),n.cross(Zt);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Zt.subVectors(n,t),vi.subVectors(i,t),so.subVectors(e,t);const o=Zt.dot(Zt),a=Zt.dot(vi),l=Zt.dot(so),c=vi.dot(vi),h=vi.dot(so),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getUV(e,t,i,n,r,o,a,l){return Us===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Us=!0),this.getInterpolation(e,t,i,n,r,o,a,l)}static getInterpolation(e,t,i,n,r,o,a,l){return this.getBarycoord(e,t,i,n,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yi.x),l.addScaledVector(o,yi.y),l.addScaledVector(a,yi.z),l)}static isFrontFacing(e,t,i,n){return Zt.subVectors(i,t),vi.subVectors(e,t),Zt.cross(vi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Zt.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return Us===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Us=!0),Xt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return Xt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Xt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let o,a;vn.subVectors(n,i),yn.subVectors(r,i),ro.subVectors(e,i);const l=vn.dot(ro),c=yn.dot(ro);if(l<=0&&c<=0)return t.copy(i);oo.subVectors(e,n);const h=vn.dot(oo),d=yn.dot(oo);if(h>=0&&d<=h)return t.copy(n);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(vn,o);ao.subVectors(e,r);const p=vn.dot(ao),g=yn.dot(ao);if(g>=0&&p<=g)return t.copy(r);const E=p*c-l*g;if(E<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(yn,a);const A=h*g-p*d;if(A<=0&&d-h>=0&&p-g>=0)return Ul.subVectors(r,n),a=(d-h)/(d-h+(p-g)),t.copy(n).addScaledVector(Ul,a);const f=1/(A+E+u);return o=E*f,a=u*f,t.copy(i).addScaledVector(vn,o).addScaledVector(yn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Fs={h:0,s:0,l:0};function lo(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ge{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=st){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=Ke.workingColorSpace){if(e=fa(e,1),t=Mt(t,0,1),i=Mt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=lo(o,r,e+1/3),this.g=lo(o,r,e),this.b=lo(o,r,e-1/3)}return Ke.toWorkingColorSpace(this,n),this}setStyle(e,t=st){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=st){const i=gh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=st){return Ke.fromWorkingColorSpace(Lt.copy(this),e),Math.round(Mt(Lt.r*255,0,255))*65536+Math.round(Mt(Lt.g*255,0,255))*256+Math.round(Mt(Lt.b*255,0,255))}getHexString(e=st){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Lt.copy(this),t);const i=Lt.r,n=Lt.g,r=Lt.b,o=Math.max(i,n,r),a=Math.min(i,n,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(n-r)/d+(n<r?6:0);break;case n:l=(r-i)/d+2;break;case r:l=(i-n)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=st){Ke.fromWorkingColorSpace(Lt.copy(this),e);const t=Lt.r,i=Lt.g,n=Lt.b;return e!==st?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Fs);const i=As(Pi.h,Fs.h,t),n=As(Pi.s,Fs.s,t),r=As(Pi.l,Fs.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new Ge;Ge.NAMES=gh;let pf=0;class Vi extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=ri(),this.name="",this.type="Material",this.blending=Gn,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Ho,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=gr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=un,this.stencilZFail=un,this.stencilZPass=un,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gn&&(i.blending=this.blending),this.side!==Gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Go&&(i.blendSrc=this.blendSrc),this.blendDst!==Ho&&(i.blendDst=this.blendDst),this.blendEquation!==Zi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==gr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==un&&(i.stencilFail=this.stencilFail),this.stencilZFail!==un&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==un&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=n(e.textures),o=n(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Mi extends Vi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=eh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new L,ks=new xe;class Jt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Wt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ks.fromBufferAttribute(this,t),ks.applyMatrix3(e),this.setXY(t,ks.x,ks.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=hi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=$e(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hi(t,this.array)),t}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hi(t,this.array)),t}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hi(t,this.array)),t}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array),r=$e(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jo&&(e.usage=this.usage),e}}class Eh extends Jt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class vh extends Jt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Et extends Jt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Af=0;const qt=new Ve,co=new pt,_n=new L,zt=new fi,os=new fi,Ct=new L;class Qt extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=ri(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(uh(e)?vh:Eh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return co.lookAt(e),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_n).negate(),this.translate(_n.x,_n.y,_n.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Et(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];zt.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];os.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(zt.min,os.min),zt.expandByPoint(Ct),Ct.addVectors(zt.max,os.max),zt.expandByPoint(Ct)):(zt.expandByPoint(os.min),zt.expandByPoint(os.max))}zt.getCenter(i);let n=0;for(let r=0,o=e.count;r<o;r++)Ct.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(Ct));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ct.fromBufferAttribute(a,c),l&&(_n.fromBufferAttribute(e,c),Ct.add(_n)),n=Math.max(n,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,r=t.normal.array,o=t.uv.array,a=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<a;w++)c[w]=new L,h[w]=new L;const d=new L,u=new L,p=new L,g=new xe,E=new xe,A=new xe,f=new L,y=new L;function v(w,N,H){d.fromArray(n,w*3),u.fromArray(n,N*3),p.fromArray(n,H*3),g.fromArray(o,w*2),E.fromArray(o,N*2),A.fromArray(o,H*2),u.sub(d),p.sub(d),E.sub(g),A.sub(g);const $=1/(E.x*A.y-A.x*E.y);isFinite($)&&(f.copy(u).multiplyScalar(A.y).addScaledVector(p,-E.y).multiplyScalar($),y.copy(p).multiplyScalar(E.x).addScaledVector(u,-A.x).multiplyScalar($),c[w].add(f),c[N].add(f),c[H].add(f),h[w].add(y),h[N].add(y),h[H].add(y))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let w=0,N=b.length;w<N;++w){const H=b[w],$=H.start,R=H.count;for(let U=$,z=$+R;U<z;U+=3)v(i[U+0],i[U+1],i[U+2])}const T=new L,S=new L,M=new L,D=new L;function _(w){M.fromArray(r,w*3),D.copy(M);const N=c[w];T.copy(N),T.sub(M.multiplyScalar(M.dot(N))).normalize(),S.crossVectors(D,N);const $=S.dot(h[w])<0?-1:1;l[w*4]=T.x,l[w*4+1]=T.y,l[w*4+2]=T.z,l[w*4+3]=$}for(let w=0,N=b.length;w<N;++w){const H=b[w],$=H.start,R=H.count;for(let U=$,z=$+R;U<z;U+=3)_(i[U+0]),_(i[U+1]),_(i[U+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const n=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,d=new L;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),E=e.getX(u+1),A=e.getX(u+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,E),o.fromBufferAttribute(t,A),h.subVectors(o,r),d.subVectors(n,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,A),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(A,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)n.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(n,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let E=0,A=l.length;E<A;E++){a.isInterleavedBufferAttribute?p=l[E]*a.data.stride+a.offset:p=l[E]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new Jt(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Qt,i=this.index.array,n=this.attributes;for(const a in n){const l=n[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fl=new Ve,Xi=new xs,Qs=new Bi,kl=new L,In=new L,xn=new L,Cn=new L,ho=new L,Os=new L,Gs=new xe,Hs=new xe,Vs=new xe,Ql=new L,Ol=new L,Gl=new L,zs=new L,Ws=new L;class ht extends pt{constructor(e=new Qt,t=new Mi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const a=this.morphTargetInfluences;if(r&&a){Os.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(ho.fromBufferAttribute(d,e),o?Os.addScaledVector(ho,h):Os.addScaledVector(ho.sub(t),h))}t.add(Os)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qs.copy(i.boundingSphere),Qs.applyMatrix4(r),Xi.copy(e.ray).recast(e.near),!(Qs.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Qs,kl)===null||Xi.origin.distanceToSquared(kl)>(e.far-e.near)**2))&&(Fl.copy(r).invert(),Xi.copy(e.ray).applyMatrix4(Fl),!(i.boundingBox!==null&&Xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,i){let n;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,E=u.length;g<E;g++){const A=u[g],f=o[A.materialIndex],y=Math.max(A.start,p.start),v=Math.min(a.count,Math.min(A.start+A.count,p.start+p.count));for(let b=y,T=v;b<T;b+=3){const S=a.getX(b),M=a.getX(b+1),D=a.getX(b+2);n=Ys(this,f,e,i,c,h,d,S,M,D),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=A.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),E=Math.min(a.count,p.start+p.count);for(let A=g,f=E;A<f;A+=3){const y=a.getX(A),v=a.getX(A+1),b=a.getX(A+2);n=Ys(this,o,e,i,c,h,d,y,v,b),n&&(n.faceIndex=Math.floor(A/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,E=u.length;g<E;g++){const A=u[g],f=o[A.materialIndex],y=Math.max(A.start,p.start),v=Math.min(l.count,Math.min(A.start+A.count,p.start+p.count));for(let b=y,T=v;b<T;b+=3){const S=b,M=b+1,D=b+2;n=Ys(this,f,e,i,c,h,d,S,M,D),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=A.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),E=Math.min(l.count,p.start+p.count);for(let A=g,f=E;A<f;A+=3){const y=A,v=A+1,b=A+2;n=Ys(this,o,e,i,c,h,d,y,v,b),n&&(n.faceIndex=Math.floor(A/3),t.push(n))}}}}function mf(s,e,t,i,n,r,o,a){let l;if(e.side===Gt?l=i.intersectTriangle(o,r,n,!0,a):l=i.intersectTriangle(n,r,o,e.side===Gi,a),l===null)return null;Ws.copy(a),Ws.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ws);return c<t.near||c>t.far?null:{distance:c,point:Ws.clone(),object:s}}function Ys(s,e,t,i,n,r,o,a,l,c){s.getVertexPosition(a,In),s.getVertexPosition(l,xn),s.getVertexPosition(c,Cn);const h=mf(s,e,t,i,In,xn,Cn,zs);if(h){n&&(Gs.fromBufferAttribute(n,a),Hs.fromBufferAttribute(n,l),Vs.fromBufferAttribute(n,c),h.uv=Xt.getInterpolation(zs,In,xn,Cn,Gs,Hs,Vs,new xe)),r&&(Gs.fromBufferAttribute(r,a),Hs.fromBufferAttribute(r,l),Vs.fromBufferAttribute(r,c),h.uv1=Xt.getInterpolation(zs,In,xn,Cn,Gs,Hs,Vs,new xe),h.uv2=h.uv1),o&&(Ql.fromBufferAttribute(o,a),Ol.fromBufferAttribute(o,l),Gl.fromBufferAttribute(o,c),h.normal=Xt.getInterpolation(zs,In,xn,Cn,Ql,Ol,Gl,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};Xt.getNormal(In,xn,Cn,d.normal),h.face=d}return h}class Jn extends Qt{constructor(e=1,t=1,i=1,n=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:o};const a=this;n=Math.floor(n),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,n,o,2),g("x","z","y",1,-1,e,i,-t,n,o,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new Et(c,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(d,2));function g(E,A,f,y,v,b,T,S,M,D,_){const w=b/M,N=T/D,H=b/2,$=T/2,R=S/2,U=M+1,z=D+1;let q=0,W=0;const Y=new L;for(let X=0;X<z;X++){const K=X*N-$;for(let le=0;le<U;le++){const V=le*w-H;Y[E]=V*y,Y[A]=K*v,Y[f]=R,c.push(Y.x,Y.y,Y.z),Y[E]=0,Y[A]=0,Y[f]=S>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(le/M),d.push(1-X/D),q+=1}}for(let X=0;X<D;X++)for(let K=0;K<M;K++){const le=u+K+U*X,V=u+K+U*(X+1),J=u+(K+1)+U*(X+1),ce=u+(K+1)+U*X;l.push(le,V,ce),l.push(V,J,ce),W+=6}a.addGroup(p,W,_),p+=W,u+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function qn(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function kt(s){const e={};for(let t=0;t<s.length;t++){const i=qn(s[t]);for(const n in i)e[n]=i[n]}return e}function gf(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function yh(s){return s.getRenderTarget()===null?s.outputColorSpace:Ke.workingColorSpace}const Ef={clone:qn,merge:kt};var vf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends Vi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vf,this.fragmentShader=yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qn(e.uniforms),this.uniformsGroups=gf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const o=this.uniforms[n].value;o&&o.isTexture?t.uniforms[n]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[n]={type:"m4",value:o.toArray()}:t.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class _h extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=Ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Rt extends _h{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yn*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ps*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*n/l,t-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bn=-90,wn=1;class _f extends pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Rt(bn,wn,e,t);n.layers=this.layers,this.add(n);const r=new Rt(bn,wn,e,t);r.layers=this.layers,this.add(r);const o=new Rt(bn,wn,e,t);o.layers=this.layers,this.add(o);const a=new Rt(bn,wn,e,t);a.layers=this.layers,this.add(a);const l=new Rt(bn,wn,e,t);l.layers=this.layers,this.add(l);const c=new Rt(bn,wn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,o),e.setRenderTarget(i,2,n),e.render(t,a),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ih extends wt{constructor(e,t,i,n,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:cn,super(e,t,i,n,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class If extends hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(ms("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===$t?st:Ot),this.texture=new Ih(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:gt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Jn(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:qn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:Oi});r.uniforms.tEquirect.value=t;const o=new ht(n,r),a=t.minFilter;return t.minFilter===Hi&&(t.minFilter=gt),new _f(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,n);e.setRenderTarget(r)}}const uo=new L,xf=new L,Cf=new Oe;class Ji{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=uo.subVectors(i,t).cross(xf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(uo),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Cf.getNormalMatrix(e),n=this.coplanarPoint(uo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new Bi,qs=new L;class Aa{constructor(e=new Ji,t=new Ji,i=new Ji,n=new Ji,r=new Ji,o=new Ji){this.planes=[e,t,i,n,r,o]}set(e,t,i,n,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ci){const i=this.planes,n=e.elements,r=n[0],o=n[1],a=n[2],l=n[3],c=n[4],h=n[5],d=n[6],u=n[7],p=n[8],g=n[9],E=n[10],A=n[11],f=n[12],y=n[13],v=n[14],b=n[15];if(i[0].setComponents(l-r,u-c,A-p,b-f).normalize(),i[1].setComponents(l+r,u+c,A+p,b+f).normalize(),i[2].setComponents(l+o,u+h,A+g,b+y).normalize(),i[3].setComponents(l-o,u-h,A-g,b-y).normalize(),i[4].setComponents(l-a,u-d,A-E,b-v).normalize(),t===Ci)i[5].setComponents(l+a,u+d,A+E,b+v).normalize();else if(t===Cr)i[5].setComponents(a,d,E,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(qs.x=n.normal.x>0?e.max.x:e.min.x,qs.y=n.normal.y>0?e.max.y:e.min.y,qs.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(qs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function xh(){let s=null,e=!1,t=null,i=null;function n(r,o){t(r,o),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function bf(s,e){const t=e.isWebGL2,i=new WeakMap;function n(c,h){const d=c.array,u=c.usage,p=d.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,d,u),c.onUploadCallback();let E;if(d instanceof Float32Array)E=s.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)E=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)E=s.SHORT;else if(d instanceof Uint32Array)E=s.UNSIGNED_INT;else if(d instanceof Int32Array)E=s.INT;else if(d instanceof Int8Array)E=s.BYTE;else if(d instanceof Uint8Array)E=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)E=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:E,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,h,d){const u=h.array,p=h._updateRange,g=h.updateRanges;if(s.bindBuffer(d,c),p.count===-1&&g.length===0&&s.bufferSubData(d,0,u),g.length!==0){for(let E=0,A=g.length;E<A;E++){const f=g[E];t?s.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u,f.start,f.count):s.bufferSubData(d,f.start*u.BYTES_PER_ELEMENT,u.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?s.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u,p.offset,p.count):s.bufferSubData(d,p.offset*u.BYTES_PER_ELEMENT,u.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(s.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=i.get(c);(!u||u.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=i.get(c);if(d===void 0)i.set(c,n(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:o,remove:a,update:l}}class ma extends Qt{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(n),c=a+1,h=l+1,d=e/a,u=t/l,p=[],g=[],E=[],A=[];for(let f=0;f<h;f++){const y=f*u-o;for(let v=0;v<c;v++){const b=v*d-r;g.push(b,-y,0),E.push(0,0,1),A.push(v/a),A.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<a;y++){const v=y+c*f,b=y+c*(f+1),T=y+1+c*(f+1),S=y+1+c*f;p.push(v,b,S),p.push(b,T,S)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(E,3)),this.setAttribute("uv",new Et(A,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.width,e.height,e.widthSegments,e.heightSegments)}}var wf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sf=`#ifdef USE_ALPHAHASH
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
#endif`,Mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rf=`#ifdef USE_AOMAP
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
#endif`,Df=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nf=`#ifdef USE_BATCHING
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
#endif`,Pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Uf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qf=`#ifdef USE_IRIDESCENCE
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
#endif`,Of=`#ifdef USE_BUMPMAP
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
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$f=`#define PI 3.141592653589793
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
} // validated`,Jf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Kf=`vec3 transformedNormal = objectNormal;
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
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ip="gl_FragColor = linearToOutputTexel( gl_FragColor );",np=`
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
	
#endif`,op=`#ifdef USE_ENVMAP
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
#endif`,ap=`#ifdef USE_ENVMAP
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
#endif`,hp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dp=`#ifdef USE_FOG
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
#endif`,fp=`#ifdef USE_GRADIENTMAP
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
}`,pp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ap=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ep=`uniform bool receiveShadow;
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
#endif`,vp=`#ifdef USE_ENVMAP
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
material.diffuseColor = diffuseColor.rgb;`,_p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cp=`PhysicalMaterial material;
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
#endif`,bp=`struct PhysicalMaterial {
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
}`,wp=`
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Tp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Rp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Dp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Up=`#if defined( USE_POINTS_UV )
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
#endif`,Qp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Op=`#ifdef USE_MORPHNORMALS
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
#endif`,Gp=`#ifdef USE_MORPHTARGETS
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
#endif`,Hp=`#ifdef USE_MORPHTARGETS
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
#endif`,Vp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yp=`#ifndef FLAT_SHADED
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
#endif`,Xp=`#ifdef USE_NORMALMAP
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
#endif`,$p=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hA=`float getShadowMask() {
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
}`,dA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uA=`#ifdef USE_SKINNING
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
#endif`,fA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pA=`#ifdef USE_SKINNING
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
#endif`,AA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,EA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vA=`#ifdef USE_TRANSMISSION
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
#endif`,yA=`#ifdef USE_TRANSMISSION
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
#endif`,_A=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wA=`uniform sampler2D t2D;
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
}`,SA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,TA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LA=`#include <common>
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
}`,RA=`#if DEPTH_PACKING == 3200
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
}`,DA=`#define DISTANCE
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
}`,NA=`#define DISTANCE
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
}`,PA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,UA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FA=`uniform float scale;
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
}`,kA=`uniform vec3 diffuse;
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
}`,QA=`#include <common>
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
}`,OA=`uniform vec3 diffuse;
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
}`,GA=`#define LAMBERT
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
}`,HA=`#define LAMBERT
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
}`,VA=`#define MATCAP
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
}`,zA=`#define MATCAP
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
}`,WA=`#define NORMAL
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
}`,YA=`#define NORMAL
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
}`,qA=`#define PHONG
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
}`,XA=`#define PHONG
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
}`,$A=`#define STANDARD
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
}`,JA=`#define STANDARD
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
}`,KA=`#define TOON
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
}`,jA=`#define TOON
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
}`,ZA=`uniform float size;
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
}`,em=`uniform vec3 diffuse;
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
}`,tm=`#include <common>
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
}`,nm=`uniform float rotation;
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
}`,sm=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:wf,alphahash_pars_fragment:Sf,alphamap_fragment:Mf,alphamap_pars_fragment:Tf,alphatest_fragment:Bf,alphatest_pars_fragment:Lf,aomap_fragment:Rf,aomap_pars_fragment:Df,batching_pars_vertex:Nf,batching_vertex:Pf,begin_vertex:Uf,beginnormal_vertex:Ff,bsdfs:kf,iridescence_fragment:Qf,bumpmap_pars_fragment:Of,clipping_planes_fragment:Gf,clipping_planes_pars_fragment:Hf,clipping_planes_pars_vertex:Vf,clipping_planes_vertex:zf,color_fragment:Wf,color_pars_fragment:Yf,color_pars_vertex:qf,color_vertex:Xf,common:$f,cube_uv_reflection_fragment:Jf,defaultnormal_vertex:Kf,displacementmap_pars_vertex:jf,displacementmap_vertex:Zf,emissivemap_fragment:ep,emissivemap_pars_fragment:tp,colorspace_fragment:ip,colorspace_pars_fragment:np,envmap_fragment:sp,envmap_common_pars_fragment:rp,envmap_pars_fragment:op,envmap_pars_vertex:ap,envmap_physical_pars_fragment:vp,envmap_vertex:lp,fog_vertex:cp,fog_pars_vertex:hp,fog_fragment:dp,fog_pars_fragment:up,gradientmap_pars_fragment:fp,lightmap_fragment:pp,lightmap_pars_fragment:Ap,lights_lambert_fragment:mp,lights_lambert_pars_fragment:gp,lights_pars_begin:Ep,lights_toon_fragment:yp,lights_toon_pars_fragment:_p,lights_phong_fragment:Ip,lights_phong_pars_fragment:xp,lights_physical_fragment:Cp,lights_physical_pars_fragment:bp,lights_fragment_begin:wp,lights_fragment_maps:Sp,lights_fragment_end:Mp,logdepthbuf_fragment:Tp,logdepthbuf_pars_fragment:Bp,logdepthbuf_pars_vertex:Lp,logdepthbuf_vertex:Rp,map_fragment:Dp,map_pars_fragment:Np,map_particle_fragment:Pp,map_particle_pars_fragment:Up,metalnessmap_fragment:Fp,metalnessmap_pars_fragment:kp,morphcolor_vertex:Qp,morphnormal_vertex:Op,morphtarget_pars_vertex:Gp,morphtarget_vertex:Hp,normal_fragment_begin:Vp,normal_fragment_maps:zp,normal_pars_fragment:Wp,normal_pars_vertex:Yp,normal_vertex:qp,normalmap_pars_fragment:Xp,clearcoat_normal_fragment_begin:$p,clearcoat_normal_fragment_maps:Jp,clearcoat_pars_fragment:Kp,iridescence_pars_fragment:jp,opaque_fragment:Zp,packing:eA,premultiplied_alpha_fragment:tA,project_vertex:iA,dithering_fragment:nA,dithering_pars_fragment:sA,roughnessmap_fragment:rA,roughnessmap_pars_fragment:oA,shadowmap_pars_fragment:aA,shadowmap_pars_vertex:lA,shadowmap_vertex:cA,shadowmask_pars_fragment:hA,skinbase_vertex:dA,skinning_pars_vertex:uA,skinning_vertex:fA,skinnormal_vertex:pA,specularmap_fragment:AA,specularmap_pars_fragment:mA,tonemapping_fragment:gA,tonemapping_pars_fragment:EA,transmission_fragment:vA,transmission_pars_fragment:yA,uv_pars_fragment:_A,uv_pars_vertex:IA,uv_vertex:xA,worldpos_vertex:CA,background_vert:bA,background_frag:wA,backgroundCube_vert:SA,backgroundCube_frag:MA,cube_vert:TA,cube_frag:BA,depth_vert:LA,depth_frag:RA,distanceRGBA_vert:DA,distanceRGBA_frag:NA,equirect_vert:PA,equirect_frag:UA,linedashed_vert:FA,linedashed_frag:kA,meshbasic_vert:QA,meshbasic_frag:OA,meshlambert_vert:GA,meshlambert_frag:HA,meshmatcap_vert:VA,meshmatcap_frag:zA,meshnormal_vert:WA,meshnormal_frag:YA,meshphong_vert:qA,meshphong_frag:XA,meshphysical_vert:$A,meshphysical_frag:JA,meshtoon_vert:KA,meshtoon_frag:jA,points_vert:ZA,points_frag:em,shadow_vert:tm,shadow_frag:im,sprite_vert:nm,sprite_frag:sm},se={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},li={basic:{uniforms:kt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:kt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:kt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:kt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:kt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:kt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:kt([se.points,se.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:kt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:kt([se.common,se.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:kt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:kt([se.sprite,se.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:kt([se.common,se.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:kt([se.lights,se.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};li.physical={uniforms:kt([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Xs={r:0,b:0,g:0};function rm(s,e,t,i,n,r,o){const a=new Ge(0);let l=r===!0?0:1,c,h,d=null,u=0,p=null;function g(A,f){let y=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?E(a,l):v&&v.isColor&&(E(v,1),y=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(s.autoClear||y)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Dr)?(h===void 0&&(h=new ht(new Jn(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:qn(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,S,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(v.colorSpace)!==nt,(d!==v||u!==v.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,p=s.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ht(new ma(2,2),new dn({name:"BackgroundMaterial",uniforms:qn(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(v.colorSpace)!==nt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,p=s.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function E(A,f){A.getRGB(Xs,yh(s)),i.buffers.color.setClear(Xs.r,Xs.g,Xs.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(A,f=1){a.set(A),l=f,E(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,E(a,l)},render:g}}function om(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},l=A(null);let c=l,h=!1;function d(R,U,z,q,W){let Y=!1;if(o){const X=E(q,z,U);c!==X&&(c=X,p(c.object)),Y=f(R,q,z,W),Y&&y(R,q,z,W)}else{const X=U.wireframe===!0;(c.geometry!==q.id||c.program!==z.id||c.wireframe!==X)&&(c.geometry=q.id,c.program=z.id,c.wireframe=X,Y=!0)}W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,D(R,U,z,q),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function u(){return i.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(R){return i.isWebGL2?s.bindVertexArray(R):r.bindVertexArrayOES(R)}function g(R){return i.isWebGL2?s.deleteVertexArray(R):r.deleteVertexArrayOES(R)}function E(R,U,z){const q=z.wireframe===!0;let W=a[R.id];W===void 0&&(W={},a[R.id]=W);let Y=W[U.id];Y===void 0&&(Y={},W[U.id]=Y);let X=Y[q];return X===void 0&&(X=A(u()),Y[q]=X),X}function A(R){const U=[],z=[],q=[];for(let W=0;W<n;W++)U[W]=0,z[W]=0,q[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:q,object:R,attributes:{},index:null}}function f(R,U,z,q){const W=c.attributes,Y=U.attributes;let X=0;const K=z.getAttributes();for(const le in K)if(K[le].location>=0){const J=W[le];let ce=Y[le];if(ce===void 0&&(le==="instanceMatrix"&&R.instanceMatrix&&(ce=R.instanceMatrix),le==="instanceColor"&&R.instanceColor&&(ce=R.instanceColor)),J===void 0||J.attribute!==ce||ce&&J.data!==ce.data)return!0;X++}return c.attributesNum!==X||c.index!==q}function y(R,U,z,q){const W={},Y=U.attributes;let X=0;const K=z.getAttributes();for(const le in K)if(K[le].location>=0){let J=Y[le];J===void 0&&(le==="instanceMatrix"&&R.instanceMatrix&&(J=R.instanceMatrix),le==="instanceColor"&&R.instanceColor&&(J=R.instanceColor));const ce={};ce.attribute=J,J&&J.data&&(ce.data=J.data),W[le]=ce,X++}c.attributes=W,c.attributesNum=X,c.index=q}function v(){const R=c.newAttributes;for(let U=0,z=R.length;U<z;U++)R[U]=0}function b(R){T(R,0)}function T(R,U){const z=c.newAttributes,q=c.enabledAttributes,W=c.attributeDivisors;z[R]=1,q[R]===0&&(s.enableVertexAttribArray(R),q[R]=1),W[R]!==U&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,U),W[R]=U)}function S(){const R=c.newAttributes,U=c.enabledAttributes;for(let z=0,q=U.length;z<q;z++)U[z]!==R[z]&&(s.disableVertexAttribArray(z),U[z]=0)}function M(R,U,z,q,W,Y,X){X===!0?s.vertexAttribIPointer(R,U,z,W,Y):s.vertexAttribPointer(R,U,z,q,W,Y)}function D(R,U,z,q){if(i.isWebGL2===!1&&(R.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const W=q.attributes,Y=z.getAttributes(),X=U.defaultAttributeValues;for(const K in Y){const le=Y[K];if(le.location>=0){let V=W[K];if(V===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(V=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(V=R.instanceColor)),V!==void 0){const J=V.normalized,ce=V.itemSize,ge=t.get(V);if(ge===void 0)continue;const me=ge.buffer,Be=ge.type,Re=ge.bytesPerElement,Ce=i.isWebGL2===!0&&(Be===s.INT||Be===s.UNSIGNED_INT||V.gpuType===nh);if(V.isInterleavedBufferAttribute){const ze=V.data,F=ze.stride,Dt=V.offset;if(ze.isInstancedInterleavedBuffer){for(let ve=0;ve<le.locationSize;ve++)T(le.location+ve,ze.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let ve=0;ve<le.locationSize;ve++)b(le.location+ve);s.bindBuffer(s.ARRAY_BUFFER,me);for(let ve=0;ve<le.locationSize;ve++)M(le.location+ve,ce/le.locationSize,Be,J,F*Re,(Dt+ce/le.locationSize*ve)*Re,Ce)}else{if(V.isInstancedBufferAttribute){for(let ze=0;ze<le.locationSize;ze++)T(le.location+ze,V.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let ze=0;ze<le.locationSize;ze++)b(le.location+ze);s.bindBuffer(s.ARRAY_BUFFER,me);for(let ze=0;ze<le.locationSize;ze++)M(le.location+ze,ce/le.locationSize,Be,J,ce*Re,ce/le.locationSize*ze*Re,Ce)}}else if(X!==void 0){const J=X[K];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(le.location,J);break;case 3:s.vertexAttrib3fv(le.location,J);break;case 4:s.vertexAttrib4fv(le.location,J);break;default:s.vertexAttrib1fv(le.location,J)}}}}S()}function _(){H();for(const R in a){const U=a[R];for(const z in U){const q=U[z];for(const W in q)g(q[W].object),delete q[W];delete U[z]}delete a[R]}}function w(R){if(a[R.id]===void 0)return;const U=a[R.id];for(const z in U){const q=U[z];for(const W in q)g(q[W].object),delete q[W];delete U[z]}delete a[R.id]}function N(R){for(const U in a){const z=a[U];if(z[R.id]===void 0)continue;const q=z[R.id];for(const W in q)g(q[W].object),delete q[W];delete z[R.id]}}function H(){$(),h=!0,c!==l&&(c=l,p(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:H,resetDefaultState:$,dispose:_,releaseStatesOfGeometry:w,releaseStatesOfProgram:N,initAttributes:v,enableAttribute:b,disableUnusedAttributes:S}}function am(s,e,t,i){const n=i.isWebGL2;let r;function o(h){r=h}function a(h,d){s.drawArrays(r,h,d),t.update(d,r,1)}function l(h,d,u){if(u===0)return;let p,g;if(n)p=s,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,d,u),t.update(d,r,u)}function c(h,d,u){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{p.multiDrawArraysWEBGL(r,h,0,d,0,u);let g=0;for(let E=0;E<u;E++)g+=d[E];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function lm(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(M){if(M==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),E=s.getParameter(s.MAX_VERTEX_ATTRIBS),A=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),f=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=u>0,b=o||e.has("OES_texture_float"),T=v&&b,S=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:p,maxCubemapSize:g,maxAttributes:E,maxVertexUniforms:A,maxVaryings:f,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:b,floatVertexTextures:T,maxSamples:S}}function cm(s){const e=this;let t=null,i=0,n=!1,r=!1;const o=new Ji,a=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||n;return n=u,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,E=d.clipIntersection,A=d.clipShadows,f=s.get(d);if(!n||g===null||g.length===0||r&&!A)r?h(null):c();else{const y=r?0:i,v=y*4;let b=f.clippingState||null;l.value=b,b=h(g,u,v,p);for(let T=0;T!==v;++T)b[T]=t[T];f.clippingState=b,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,g){const E=d!==null?d.length:0;let A=null;if(E!==0){if(A=l.value,g!==!0||A===null){const f=p+E*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(A===null||A.length<f)&&(A=new Float32Array(f));for(let v=0,b=p;v!==E;++v,b+=4)o.copy(d[v]).applyMatrix4(y,a),o.normal.toArray(A,b),A[b+3]=o.constant}l.value=A,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,A}}function hm(s){let e=new WeakMap;function t(o,a){return a===Vo?o.mapping=cn:a===zo&&(o.mapping=zn),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Vo||a===zo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new If(l.height/2);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",n),t(c.texture,o.mapping)}else return null}}return o}function n(o){const a=o.target;a.removeEventListener("dispose",n);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Ch extends _h{constructor(e=-1,t=1,i=1,n=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const kn=4,Hl=[.125,.215,.35,.446,.526,.582],en=20,fo=new Ch,Vl=new Ge;let po=null,Ao=0,mo=0;const Ki=(1+Math.sqrt(5))/2,Sn=1/Ki,zl=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Ki,Sn),new L(0,Ki,-Sn),new L(Sn,0,Ki),new L(-Sn,0,Ki),new L(Ki,Sn,0),new L(-Ki,Sn,0)];class Wl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){po=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ql(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(po,Ao,mo),e.scissorTest=!1,$s(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cn||e.mapping===zn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),po=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:gt,minFilter:gt,generateMipmaps:!1,type:Si,format:bt,colorSpace:ui,depthBuffer:!1},n=Yl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yl(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dm(r)),this._blurMaterial=um(r,e,t)}return n}_compileMaterial(e){const t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,fo)}_sceneToCubeUV(e,t,i,n){const a=new Rt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Vl),h.toneMapping=wi,h.autoClear=!1;const p=new Mi({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),g=new ht(new Jn,p);let E=!1;const A=e.background;A?A.isColor&&(p.color.copy(A),e.background=null,E=!0):(p.color.copy(Vl),E=!0);for(let f=0;f<6;f++){const y=f%3;y===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):y===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const v=this._cubeSize;$s(n,y*v,f>2?v:0,v,v),h.setRenderTarget(n),E&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=A}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===cn||e.mapping===zn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ql());const r=n?this._cubemapMaterial:this._equirectMaterial,o=new ht(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;$s(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,fo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const r=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),o=zl[(n-1)%zl.length];this._blur(e,n-1,n,r,o)}t.autoClear=i}_blur(e,t,i,n,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,n,"latitudinal",r),this._halfBlur(o,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new ht(this._lodPlanes[n],c),u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*en-1),E=r/g,A=isFinite(r)?1+Math.floor(h*E):en;A>en&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${A} samples when the maximum is set to ${en}`);const f=[];let y=0;for(let M=0;M<en;++M){const D=M/E,_=Math.exp(-D*D/2);f.push(_),M===0?y+=_:M<A&&(y+=2*_)}for(let M=0;M<f.length;M++)f[M]=f[M]/y;u.envMap.value=e.texture,u.samples.value=A,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-i;const b=this._sizeLods[n],T=3*b*(n>v-kn?n-v+kn:0),S=4*(this._cubeSize-b);$s(t,T,S,3*b,2*b),l.setRenderTarget(t),l.render(d,fo)}}function dm(s){const e=[],t=[],i=[];let n=s;const r=s-kn+1+Hl.length;for(let o=0;o<r;o++){const a=Math.pow(2,n);t.push(a);let l=1/a;o>s-kn?l=Hl[o-s+kn-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,E=3,A=2,f=1,y=new Float32Array(E*g*p),v=new Float32Array(A*g*p),b=new Float32Array(f*g*p);for(let S=0;S<p;S++){const M=S%3*2/3-1,D=S>2?0:-1,_=[M,D,0,M+2/3,D,0,M+2/3,D+1,0,M,D,0,M+2/3,D+1,0,M,D+1,0];y.set(_,E*g*S),v.set(u,A*g*S);const w=[S,S,S,S,S,S];b.set(w,f*g*S)}const T=new Qt;T.setAttribute("position",new Jt(y,E)),T.setAttribute("uv",new Jt(v,A)),T.setAttribute("faceIndex",new Jt(b,f)),e.push(T),n>kn&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Yl(s,e,t){const i=new hn(s,e,t);return i.texture.mapping=Dr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $s(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function um(s,e,t){const i=new Float32Array(en),n=new L(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:en,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:ga(),fragmentShader:`

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
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function ql(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ga(),fragmentShader:`

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
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Xl(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ga(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function ga(){return`

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
	`}function fm(s){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Vo||l===zo,h=l===cn||l===zn;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new Wl(s)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||h&&d&&n(d)){t===null&&(t=new Wl(s));const u=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,u),a.addEventListener("dispose",r),u.texture}else return null}}}return a}function n(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function pm(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Am(s,e,t,i){const n={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const E=u.morphAttributes[g];for(let A=0,f=E.length;A<f;A++)e.remove(E[A])}u.removeEventListener("dispose",o),delete n[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return n[u.id]===!0||(u.addEventListener("dispose",o),n[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)e.update(u[g],s.ARRAY_BUFFER);const p=d.morphAttributes;for(const g in p){const E=p[g];for(let A=0,f=E.length;A<f;A++)e.update(E[A],s.ARRAY_BUFFER)}}function c(d){const u=[],p=d.index,g=d.attributes.position;let E=0;if(p!==null){const y=p.array;E=p.version;for(let v=0,b=y.length;v<b;v+=3){const T=y[v+0],S=y[v+1],M=y[v+2];u.push(T,S,S,M,M,T)}}else if(g!==void 0){const y=g.array;E=g.version;for(let v=0,b=y.length/3-1;v<b;v+=3){const T=v+0,S=v+1,M=v+2;u.push(T,S,S,M,M,T)}}else return;const A=new(uh(u)?vh:Eh)(u,1);A.version=E;const f=r.get(d);f&&e.remove(f),r.set(d,A)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function mm(s,e,t,i){const n=i.isWebGL2;let r;function o(p){r=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function h(p,g){s.drawElements(r,g,a,p*l),t.update(g,r,1)}function d(p,g,E){if(E===0)return;let A,f;if(n)A=s,f="drawElementsInstanced";else if(A=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",A===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}A[f](r,g,a,p*l,E),t.update(g,r,E)}function u(p,g,E){if(E===0)return;const A=e.get("WEBGL_multi_draw");if(A===null)for(let f=0;f<E;f++)this.render(p[f]/l,g[f]);else{A.multiDrawElementsWEBGL(r,g,0,a,p,0,E);let f=0;for(let y=0;y<E;y++)f+=g[y];t.update(f,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function gm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Em(s,e){return s[0]-e[0]}function vm(s,e){return Math.abs(e[1])-Math.abs(s[1])}function ym(s,e,t){const i={},n=new Float32Array(8),r=new WeakMap,o=new Ze,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0;let E=r.get(h);if(E===void 0||E.count!==g){let R=function(){H.dispose(),r.delete(h),h.removeEventListener("dispose",R)};E!==void 0&&E.texture.dispose();const y=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,b=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],M=h.morphAttributes.color||[];let D=0;y===!0&&(D=1),v===!0&&(D=2),b===!0&&(D=3);let _=h.attributes.position.count*D,w=1;_>e.maxTextureSize&&(w=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const N=new Float32Array(_*w*4*g),H=new Ah(N,_,w,g);H.type=Wt,H.needsUpdate=!0;const $=D*4;for(let U=0;U<g;U++){const z=T[U],q=S[U],W=M[U],Y=_*w*4*U;for(let X=0;X<z.count;X++){const K=X*$;y===!0&&(o.fromBufferAttribute(z,X),N[Y+K+0]=o.x,N[Y+K+1]=o.y,N[Y+K+2]=o.z,N[Y+K+3]=0),v===!0&&(o.fromBufferAttribute(q,X),N[Y+K+4]=o.x,N[Y+K+5]=o.y,N[Y+K+6]=o.z,N[Y+K+7]=0),b===!0&&(o.fromBufferAttribute(W,X),N[Y+K+8]=o.x,N[Y+K+9]=o.y,N[Y+K+10]=o.z,N[Y+K+11]=W.itemSize===4?o.w:1)}}E={count:g,texture:H,size:new xe(_,w)},r.set(h,E),h.addEventListener("dispose",R)}let A=0;for(let y=0;y<u.length;y++)A+=u[y];const f=h.morphTargetsRelative?1:1-A;d.getUniforms().setValue(s,"morphTargetBaseInfluence",f),d.getUniforms().setValue(s,"morphTargetInfluences",u),d.getUniforms().setValue(s,"morphTargetsTexture",E.texture,t),d.getUniforms().setValue(s,"morphTargetsTextureSize",E.size)}else{const p=u===void 0?0:u.length;let g=i[h.id];if(g===void 0||g.length!==p){g=[];for(let v=0;v<p;v++)g[v]=[v,0];i[h.id]=g}for(let v=0;v<p;v++){const b=g[v];b[0]=v,b[1]=u[v]}g.sort(vm);for(let v=0;v<8;v++)v<p&&g[v][1]?(a[v][0]=g[v][0],a[v][1]=g[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Em);const E=h.morphAttributes.position,A=h.morphAttributes.normal;let f=0;for(let v=0;v<8;v++){const b=a[v],T=b[0],S=b[1];T!==Number.MAX_SAFE_INTEGER&&S?(E&&h.getAttribute("morphTarget"+v)!==E[T]&&h.setAttribute("morphTarget"+v,E[T]),A&&h.getAttribute("morphNormal"+v)!==A[T]&&h.setAttribute("morphNormal"+v,A[T]),n[v]=S,f+=S):(E&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),A&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),n[v]=0)}const y=h.morphTargetsRelative?1:1-f;d.getUniforms().setValue(s,"morphTargetBaseInfluence",y),d.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function _m(s,e,t,i){let n=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,d=e.get(l,h);if(n.get(d)!==c&&(e.update(d),n.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),n.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;n.get(u)!==c&&(u.update(),n.set(u,c))}return d}function o(){n=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class bh extends wt{constructor(e,t,i,n,r,o,a,l,c,h){if(h=h!==void 0?h:an,h!==an&&h!==Wn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===an&&(i=Fi),i===void 0&&h===Wn&&(i=on),super(null,n,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const wh=new wt,Sh=new bh(1,1);Sh.compareFunction=dh;const Mh=new Ah,Th=new mh,Bh=new Ih,$l=[],Jl=[],Kl=new Float32Array(16),jl=new Float32Array(9),Zl=new Float32Array(4);function Kn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=$l[n];if(r===void 0&&(r=new Float32Array(n),$l[n]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function yt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function _t(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Pr(s,e){let t=Jl[e];t===void 0&&(t=new Int32Array(e),Jl[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function Im(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function xm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;s.uniform2fv(this.addr,e),_t(t,e)}}function Cm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;s.uniform3fv(this.addr,e),_t(t,e)}}function bm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;s.uniform4fv(this.addr,e),_t(t,e)}}function wm(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(yt(t,i))return;Zl.set(i),s.uniformMatrix2fv(this.addr,!1,Zl),_t(t,i)}}function Sm(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(yt(t,i))return;jl.set(i),s.uniformMatrix3fv(this.addr,!1,jl),_t(t,i)}}function Mm(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(yt(t,i))return;Kl.set(i),s.uniformMatrix4fv(this.addr,!1,Kl),_t(t,i)}}function Tm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Bm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;s.uniform2iv(this.addr,e),_t(t,e)}}function Lm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;s.uniform3iv(this.addr,e),_t(t,e)}}function Rm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;s.uniform4iv(this.addr,e),_t(t,e)}}function Dm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Nm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;s.uniform2uiv(this.addr,e),_t(t,e)}}function Pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yt(t,e))return;s.uniform3uiv(this.addr,e),_t(t,e)}}function Um(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;s.uniform4uiv(this.addr,e),_t(t,e)}}function Fm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?Sh:wh;t.setTexture2D(e||r,n)}function km(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Th,n)}function Qm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Bh,n)}function Om(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Mh,n)}function Gm(s){switch(s){case 5126:return Im;case 35664:return xm;case 35665:return Cm;case 35666:return bm;case 35674:return wm;case 35675:return Sm;case 35676:return Mm;case 5124:case 35670:return Tm;case 35667:case 35671:return Bm;case 35668:case 35672:return Lm;case 35669:case 35673:return Rm;case 5125:return Dm;case 36294:return Nm;case 36295:return Pm;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return km;case 35680:case 36300:case 36308:case 36293:return Qm;case 36289:case 36303:case 36311:case 36292:return Om}}function Hm(s,e){s.uniform1fv(this.addr,e)}function Vm(s,e){const t=Kn(e,this.size,2);s.uniform2fv(this.addr,t)}function zm(s,e){const t=Kn(e,this.size,3);s.uniform3fv(this.addr,t)}function Wm(s,e){const t=Kn(e,this.size,4);s.uniform4fv(this.addr,t)}function Ym(s,e){const t=Kn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function qm(s,e){const t=Kn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Xm(s,e){const t=Kn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function $m(s,e){s.uniform1iv(this.addr,e)}function Jm(s,e){s.uniform2iv(this.addr,e)}function Km(s,e){s.uniform3iv(this.addr,e)}function jm(s,e){s.uniform4iv(this.addr,e)}function Zm(s,e){s.uniform1uiv(this.addr,e)}function eg(s,e){s.uniform2uiv(this.addr,e)}function tg(s,e){s.uniform3uiv(this.addr,e)}function ig(s,e){s.uniform4uiv(this.addr,e)}function ng(s,e,t){const i=this.cache,n=e.length,r=Pr(t,n);yt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let o=0;o!==n;++o)t.setTexture2D(e[o]||wh,r[o])}function sg(s,e,t){const i=this.cache,n=e.length,r=Pr(t,n);yt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let o=0;o!==n;++o)t.setTexture3D(e[o]||Th,r[o])}function rg(s,e,t){const i=this.cache,n=e.length,r=Pr(t,n);yt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let o=0;o!==n;++o)t.setTextureCube(e[o]||Bh,r[o])}function og(s,e,t){const i=this.cache,n=e.length,r=Pr(t,n);yt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let o=0;o!==n;++o)t.setTexture2DArray(e[o]||Mh,r[o])}function ag(s){switch(s){case 5126:return Hm;case 35664:return Vm;case 35665:return zm;case 35666:return Wm;case 35674:return Ym;case 35675:return qm;case 35676:return Xm;case 5124:case 35670:return $m;case 35667:case 35671:return Jm;case 35668:case 35672:return Km;case 35669:case 35673:return jm;case 5125:return Zm;case 36294:return eg;case 36295:return tg;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return ng;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return og}}class lg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Gm(t.type)}}class cg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ag(t.type)}}class hg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,o=n.length;r!==o;++r){const a=n[r];a.setValue(e,t[a.id],i)}}}const go=/(\w+)(\])?(\[|\.)?/g;function ec(s,e){s.seq.push(e),s.map[e.id]=e}function dg(s,e,t){const i=s.name,n=i.length;for(go.lastIndex=0;;){const r=go.exec(i),o=go.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){ec(t,c===void 0?new lg(a,s,e):new cg(a,s,e));break}else{let d=t.map[a];d===void 0&&(d=new hg(a),ec(t,d)),t=d}}}class ur{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),o=e.getUniformLocation(t,r.name);dg(r,o,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const o=e[n];o.id in t&&i.push(o)}return i}}function tc(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const ug=37297;let fg=0;function pg(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=n;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Ag(s){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(s);let i;switch(e===t?i="":e===xr&&t===Ir?i="LinearDisplayP3ToLinearSRGB":e===Ir&&t===xr&&(i="LinearSRGBToLinearDisplayP3"),s){case ui:case Is:return[i,"LinearTransferOETF"];case st:case Nr:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function ic(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+pg(s.getShaderSource(e),o)}else return n}function mg(s,e){const t=Ag(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function gg(s,e){let t;switch(e){case mu:t="Linear";break;case gu:t="Reinhard";break;case Eu:t="OptimizedCineon";break;case th:t="ACESFilmic";break;case yu:t="AgX";break;case vu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Eg(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Qn).join(`
`)}function vg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Qn).join(`
`)}function yg(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function _g(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Qn(s){return s!==""}function nc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ig=/^[ \t]*#include +<([\w\d./]+)>/gm;function ta(s){return s.replace(Ig,Cg)}const xg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Cg(s,e){let t=Ne[e];if(t===void 0){const i=xg.get(e);if(i!==void 0)t=Ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ta(t)}const bg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rc(s){return s.replace(bg,wg)}function wg(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function oc(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Sg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Zc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===zd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ii&&(e="SHADOWMAP_TYPE_VSM"),e}function Mg(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case cn:case zn:e="ENVMAP_TYPE_CUBE";break;case Dr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Tg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case zn:e="ENVMAP_MODE_REFRACTION";break}return e}function Bg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case eh:e="ENVMAP_BLENDING_MULTIPLY";break;case pu:e="ENVMAP_BLENDING_MIX";break;case Au:e="ENVMAP_BLENDING_ADD";break}return e}function Lg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Rg(s,e,t,i){const n=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Sg(t),c=Mg(t),h=Tg(t),d=Bg(t),u=Lg(t),p=t.isWebGL2?"":Eg(t),g=vg(t),E=yg(r),A=n.createProgram();let f,y,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Qn).join(`
`),f.length>0&&(f+=`
`),y=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(Qn).join(`
`),y.length>0&&(y+=`
`)):(f=[oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qn).join(`
`),y=[p,oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wi?"#define TONE_MAPPING":"",t.toneMapping!==wi?Ne.tonemapping_pars_fragment:"",t.toneMapping!==wi?gg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,mg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qn).join(`
`)),o=ta(o),o=nc(o,t),o=sc(o,t),a=ta(a),a=nc(a,t),a=sc(a,t),o=rc(o),a=rc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const b=v+f+o,T=v+y+a,S=tc(n,n.VERTEX_SHADER,b),M=tc(n,n.FRAGMENT_SHADER,T);n.attachShader(A,S),n.attachShader(A,M),t.index0AttributeName!==void 0?n.bindAttribLocation(A,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(A,0,"position"),n.linkProgram(A);function D(H){if(s.debug.checkShaderErrors){const $=n.getProgramInfoLog(A).trim(),R=n.getShaderInfoLog(S).trim(),U=n.getShaderInfoLog(M).trim();let z=!0,q=!0;if(n.getProgramParameter(A,n.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,A,S,M);else{const W=ic(n,S,"vertex"),Y=ic(n,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(A,n.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+W+`
`+Y)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(R===""||U==="")&&(q=!1);q&&(H.diagnostics={runnable:z,programLog:$,vertexShader:{log:R,prefix:f},fragmentShader:{log:U,prefix:y}})}n.deleteShader(S),n.deleteShader(M),_=new ur(n,A),w=_g(n,A)}let _;this.getUniforms=function(){return _===void 0&&D(this),_};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=n.getProgramParameter(A,ug)),N},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(A),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=fg++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=S,this.fragmentShader=M,this}let Dg=0;class Ng{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Pg(e),t.set(e,i)),i}}class Pg{constructor(e){this.id=Dg++,this.code=e,this.usedTimes=0}}function Ug(s,e,t,i,n,r,o){const a=new pa,l=new Ng,c=[],h=n.isWebGL2,d=n.logarithmicDepthBuffer,u=n.vertexTextures;let p=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(_){return _===0?"uv":`uv${_}`}function A(_,w,N,H,$){const R=H.fog,U=$.geometry,z=_.isMeshStandardMaterial?H.environment:null,q=(_.isMeshStandardMaterial?t:e).get(_.envMap||z),W=q&&q.mapping===Dr?q.image.height:null,Y=g[_.type];_.precision!==null&&(p=n.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));const X=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,K=X!==void 0?X.length:0;let le=0;U.morphAttributes.position!==void 0&&(le=1),U.morphAttributes.normal!==void 0&&(le=2),U.morphAttributes.color!==void 0&&(le=3);let V,J,ce,ge;if(Y){const Nt=li[Y];V=Nt.vertexShader,J=Nt.fragmentShader}else V=_.vertexShader,J=_.fragmentShader,l.update(_),ce=l.getVertexShaderID(_),ge=l.getFragmentShaderID(_);const me=s.getRenderTarget(),Be=$.isInstancedMesh===!0,Re=$.isBatchedMesh===!0,Ce=!!_.map,ze=!!_.matcap,F=!!q,Dt=!!_.aoMap,ve=!!_.lightMap,Me=!!_.bumpMap,fe=!!_.normalMap,lt=!!_.displacementMap,Pe=!!_.emissiveMap,C=!!_.metalnessMap,I=!!_.roughnessMap,Q=_.anisotropy>0,ee=_.clearcoat>0,Z=_.iridescence>0,te=_.sheen>0,pe=_.transmission>0,ae=Q&&!!_.anisotropyMap,de=ee&&!!_.clearcoatMap,Ie=ee&&!!_.clearcoatNormalMap,Ue=ee&&!!_.clearcoatRoughnessMap,j=Z&&!!_.iridescenceMap,qe=Z&&!!_.iridescenceThicknessMap,He=te&&!!_.sheenColorMap,Se=te&&!!_.sheenRoughnessMap,Ee=!!_.specularMap,ue=!!_.specularColorMap,De=!!_.specularIntensityMap,Ye=pe&&!!_.transmissionMap,dt=pe&&!!_.thicknessMap,ke=!!_.gradientMap,ne=!!_.alphaMap,B=_.alphaTest>0,re=!!_.alphaHash,oe=!!_.extensions,be=!!U.attributes.uv1,ye=!!U.attributes.uv2,et=!!U.attributes.uv3;let tt=wi;return _.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(tt=s.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:_.type,shaderName:_.name,vertexShader:V,fragmentShader:J,defines:_.defines,customVertexShaderID:ce,customFragmentShaderID:ge,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:Re,instancing:Be,instancingColor:Be&&$.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:me===null?s.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:ui,map:Ce,matcap:ze,envMap:F,envMapMode:F&&q.mapping,envMapCubeUVHeight:W,aoMap:Dt,lightMap:ve,bumpMap:Me,normalMap:fe,displacementMap:u&&lt,emissiveMap:Pe,normalMapObjectSpace:fe&&_.normalMapType===Ru,normalMapTangentSpace:fe&&_.normalMapType===hh,metalnessMap:C,roughnessMap:I,anisotropy:Q,anisotropyMap:ae,clearcoat:ee,clearcoatMap:de,clearcoatNormalMap:Ie,clearcoatRoughnessMap:Ue,iridescence:Z,iridescenceMap:j,iridescenceThicknessMap:qe,sheen:te,sheenColorMap:He,sheenRoughnessMap:Se,specularMap:Ee,specularColorMap:ue,specularIntensityMap:De,transmission:pe,transmissionMap:Ye,thicknessMap:dt,gradientMap:ke,opaque:_.transparent===!1&&_.blending===Gn,alphaMap:ne,alphaTest:B,alphaHash:re,combine:_.combine,mapUv:Ce&&E(_.map.channel),aoMapUv:Dt&&E(_.aoMap.channel),lightMapUv:ve&&E(_.lightMap.channel),bumpMapUv:Me&&E(_.bumpMap.channel),normalMapUv:fe&&E(_.normalMap.channel),displacementMapUv:lt&&E(_.displacementMap.channel),emissiveMapUv:Pe&&E(_.emissiveMap.channel),metalnessMapUv:C&&E(_.metalnessMap.channel),roughnessMapUv:I&&E(_.roughnessMap.channel),anisotropyMapUv:ae&&E(_.anisotropyMap.channel),clearcoatMapUv:de&&E(_.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&E(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&E(_.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&E(_.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&E(_.iridescenceThicknessMap.channel),sheenColorMapUv:He&&E(_.sheenColorMap.channel),sheenRoughnessMapUv:Se&&E(_.sheenRoughnessMap.channel),specularMapUv:Ee&&E(_.specularMap.channel),specularColorMapUv:ue&&E(_.specularColorMap.channel),specularIntensityMapUv:De&&E(_.specularIntensityMap.channel),transmissionMapUv:Ye&&E(_.transmissionMap.channel),thicknessMapUv:dt&&E(_.thicknessMap.channel),alphaMapUv:ne&&E(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(fe||Q),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:be,vertexUv2s:ye,vertexUv3s:et,pointsUvs:$.isPoints===!0&&!!U.attributes.uv&&(Ce||ne),fog:!!R,useFog:_.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:$.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:le,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&N.length>0,shadowMapType:s.shadowMap.type,toneMapping:tt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Ce&&_.map.isVideoTexture===!0&&Ke.getTransfer(_.map.colorSpace)===nt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ci,flipSided:_.side===Gt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:oe&&_.extensions.derivatives===!0,extensionFragDepth:oe&&_.extensions.fragDepth===!0,extensionDrawBuffers:oe&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:oe&&_.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function f(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const N in _.defines)w.push(N),w.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(y(w,_),v(w,_),w.push(s.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function y(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function v(_,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function b(_){const w=g[_.type];let N;if(w){const H=li[w];N=Ef.clone(H.uniforms)}else N=_.uniforms;return N}function T(_,w){let N;for(let H=0,$=c.length;H<$;H++){const R=c[H];if(R.cacheKey===w){N=R,++N.usedTimes;break}}return N===void 0&&(N=new Rg(s,w,_,r),c.push(N)),N}function S(_){if(--_.usedTimes===0){const w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),_.destroy()}}function M(_){l.remove(_)}function D(){l.dispose()}return{getParameters:A,getProgramCacheKey:f,getUniforms:b,acquireProgram:T,releaseProgram:S,releaseShaderCache:M,programs:c,dispose:D}}function Fg(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function i(r,o,a){s.get(r)[o]=a}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function kg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function ac(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function lc(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function o(d,u,p,g,E,A){let f=s[e];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:E,group:A},s[e]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=E,f.group=A),e++,f}function a(d,u,p,g,E,A){const f=o(d,u,p,g,E,A);p.transmission>0?i.push(f):p.transparent===!0?n.push(f):t.push(f)}function l(d,u,p,g,E,A){const f=o(d,u,p,g,E,A);p.transmission>0?i.unshift(f):p.transparent===!0?n.unshift(f):t.unshift(f)}function c(d,u){t.length>1&&t.sort(d||kg),i.length>1&&i.sort(u||ac),n.length>1&&n.sort(u||ac)}function h(){for(let d=e,u=s.length;d<u;d++){const p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:a,unshift:l,finish:h,sort:c}}function Qg(){let s=new WeakMap;function e(i,n){const r=s.get(i);let o;return r===void 0?(o=new lc,s.set(i,[o])):n>=r.length?(o=new lc,r.push(o)):o=r[n],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Og(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ge};break;case"SpotLight":t={position:new L,direction:new L,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function Gg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Hg=0;function Vg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function zg(s,e){const t=new Og,i=Gg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new L);const r=new L,o=new Ve,a=new Ve;function l(h,d){let u=0,p=0,g=0;for(let H=0;H<9;H++)n.probe[H].set(0,0,0);let E=0,A=0,f=0,y=0,v=0,b=0,T=0,S=0,M=0,D=0,_=0;h.sort(Vg);const w=d===!0?Math.PI:1;for(let H=0,$=h.length;H<$;H++){const R=h[H],U=R.color,z=R.intensity,q=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=U.r*z*w,p+=U.g*z*w,g+=U.b*z*w;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(R.sh.coefficients[Y],z);_++}else if(R.isDirectionalLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity*w),R.castShadow){const X=R.shadow,K=i.get(R);K.shadowBias=X.bias,K.shadowNormalBias=X.normalBias,K.shadowRadius=X.radius,K.shadowMapSize=X.mapSize,n.directionalShadow[E]=K,n.directionalShadowMap[E]=W,n.directionalShadowMatrix[E]=R.shadow.matrix,b++}n.directional[E]=Y,E++}else if(R.isSpotLight){const Y=t.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(U).multiplyScalar(z*w),Y.distance=q,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,n.spot[f]=Y;const X=R.shadow;if(R.map&&(n.spotLightMap[M]=R.map,M++,X.updateMatrices(R),R.castShadow&&D++),n.spotLightMatrix[f]=X.matrix,R.castShadow){const K=i.get(R);K.shadowBias=X.bias,K.shadowNormalBias=X.normalBias,K.shadowRadius=X.radius,K.shadowMapSize=X.mapSize,n.spotShadow[f]=K,n.spotShadowMap[f]=W,S++}f++}else if(R.isRectAreaLight){const Y=t.get(R);Y.color.copy(U).multiplyScalar(z),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),n.rectArea[y]=Y,y++}else if(R.isPointLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity*w),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const X=R.shadow,K=i.get(R);K.shadowBias=X.bias,K.shadowNormalBias=X.normalBias,K.shadowRadius=X.radius,K.shadowMapSize=X.mapSize,K.shadowCameraNear=X.camera.near,K.shadowCameraFar=X.camera.far,n.pointShadow[A]=K,n.pointShadowMap[A]=W,n.pointShadowMatrix[A]=R.shadow.matrix,T++}n.point[A]=Y,A++}else if(R.isHemisphereLight){const Y=t.get(R);Y.skyColor.copy(R.color).multiplyScalar(z*w),Y.groundColor.copy(R.groundColor).multiplyScalar(z*w),n.hemi[v]=Y,v++}}y>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=g;const N=n.hash;(N.directionalLength!==E||N.pointLength!==A||N.spotLength!==f||N.rectAreaLength!==y||N.hemiLength!==v||N.numDirectionalShadows!==b||N.numPointShadows!==T||N.numSpotShadows!==S||N.numSpotMaps!==M||N.numLightProbes!==_)&&(n.directional.length=E,n.spot.length=f,n.rectArea.length=y,n.point.length=A,n.hemi.length=v,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=S+M-D,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=_,N.directionalLength=E,N.pointLength=A,N.spotLength=f,N.rectAreaLength=y,N.hemiLength=v,N.numDirectionalShadows=b,N.numPointShadows=T,N.numSpotShadows=S,N.numSpotMaps=M,N.numLightProbes=_,n.version=Hg++)}function c(h,d){let u=0,p=0,g=0,E=0,A=0;const f=d.matrixWorldInverse;for(let y=0,v=h.length;y<v;y++){const b=h[y];if(b.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),u++}else if(b.isSpotLight){const T=n.spot[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),g++}else if(b.isRectAreaLight){const T=n.rectArea[E];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),a.identity(),o.copy(b.matrixWorld),o.premultiply(f),a.extractRotation(o),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),E++}else if(b.isPointLight){const T=n.point[p];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){const T=n.hemi[A];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(f),A++}}}return{setup:l,setupView:c,state:n}}function cc(s,e){const t=new zg(s,e),i=[],n=[];function r(){i.length=0,n.length=0}function o(d){i.push(d)}function a(d){n.push(d)}function l(d){t.setup(i,d)}function c(d){t.setupView(i,d)}return{init:r,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Wg(s,e){let t=new WeakMap;function i(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new cc(s,e),t.set(r,[l])):o>=a.length?(l=new cc(s,e),a.push(l)):l=a[o],l}function n(){t=new WeakMap}return{get:i,dispose:n}}class Yg extends Vi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qg extends Vi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$g=`uniform sampler2D shadow_pass;
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
}`;function Jg(s,e,t){let i=new Aa;const n=new xe,r=new xe,o=new Ze,a=new Yg({depthPacking:Lu}),l=new qg,c={},h=t.maxTextureSize,d={[Gi]:Gt,[Gt]:Gi,[ci]:ci},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:Xg,fragmentShader:$g}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Qt;g.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new ht(g,u),A=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zc;let f=this.type;this.render=function(S,M,D){if(A.enabled===!1||A.autoUpdate===!1&&A.needsUpdate===!1||S.length===0)return;const _=s.getRenderTarget(),w=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),H=s.state;H.setBlending(Oi),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const $=f!==Ii&&this.type===Ii,R=f===Ii&&this.type!==Ii;for(let U=0,z=S.length;U<z;U++){const q=S[U],W=q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;n.copy(W.mapSize);const Y=W.getFrameExtents();if(n.multiply(Y),r.copy(W.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/Y.x),n.x=r.x*Y.x,W.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/Y.y),n.y=r.y*Y.y,W.mapSize.y=r.y)),W.map===null||$===!0||R===!0){const K=this.type!==Ii?{minFilter:St,magFilter:St}:{};W.map!==null&&W.map.dispose(),W.map=new hn(n.x,n.y,K),W.map.texture.name=q.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const X=W.getViewportCount();for(let K=0;K<X;K++){const le=W.getViewport(K);o.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),H.viewport(o),W.updateMatrices(q,K),i=W.getFrustum(),b(M,D,W.camera,q,this.type)}W.isPointLightShadow!==!0&&this.type===Ii&&y(W,D),W.needsUpdate=!1}f=this.type,A.needsUpdate=!1,s.setRenderTarget(_,w,N)};function y(S,M){const D=e.update(E);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new hn(n.x,n.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(M,null,D,u,E,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(M,null,D,p,E,null)}function v(S,M,D,_){let w=null;const N=D.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(N!==void 0)w=N;else if(w=D.isPointLight===!0?l:a,s.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const H=w.uuid,$=M.uuid;let R=c[H];R===void 0&&(R={},c[H]=R);let U=R[$];U===void 0&&(U=w.clone(),R[$]=U,M.addEventListener("dispose",T)),w=U}if(w.visible=M.visible,w.wireframe=M.wireframe,_===Ii?w.side=M.shadowSide!==null?M.shadowSide:M.side:w.side=M.shadowSide!==null?M.shadowSide:d[M.side],w.alphaMap=M.alphaMap,w.alphaTest=M.alphaTest,w.map=M.map,w.clipShadows=M.clipShadows,w.clippingPlanes=M.clippingPlanes,w.clipIntersection=M.clipIntersection,w.displacementMap=M.displacementMap,w.displacementScale=M.displacementScale,w.displacementBias=M.displacementBias,w.wireframeLinewidth=M.wireframeLinewidth,w.linewidth=M.linewidth,D.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const H=s.properties.get(w);H.light=D}return w}function b(S,M,D,_,w){if(S.visible===!1)return;if(S.layers.test(M.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&w===Ii)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,S.matrixWorld);const $=e.update(S),R=S.material;if(Array.isArray(R)){const U=$.groups;for(let z=0,q=U.length;z<q;z++){const W=U[z],Y=R[W.materialIndex];if(Y&&Y.visible){const X=v(S,Y,_,w);S.onBeforeShadow(s,S,M,D,$,X,W),s.renderBufferDirect(D,null,$,X,S,W),S.onAfterShadow(s,S,M,D,$,X,W)}}}else if(R.visible){const U=v(S,R,_,w);S.onBeforeShadow(s,S,M,D,$,U,null),s.renderBufferDirect(D,null,$,U,S,null),S.onAfterShadow(s,S,M,D,$,U,null)}}const H=S.children;for(let $=0,R=H.length;$<R;$++)b(H[$],M,D,_,w)}function T(S){S.target.removeEventListener("dispose",T);for(const D in c){const _=c[D],w=S.target.uuid;w in _&&(_[w].dispose(),delete _[w])}}}function Kg(s,e,t){const i=t.isWebGL2;function n(){let B=!1;const re=new Ze;let oe=null;const be=new Ze(0,0,0,0);return{setMask:function(ye){oe!==ye&&!B&&(s.colorMask(ye,ye,ye,ye),oe=ye)},setLocked:function(ye){B=ye},setClear:function(ye,et,tt,It,Nt){Nt===!0&&(ye*=It,et*=It,tt*=It),re.set(ye,et,tt,It),be.equals(re)===!1&&(s.clearColor(ye,et,tt,It),be.copy(re))},reset:function(){B=!1,oe=null,be.set(-1,0,0,0)}}}function r(){let B=!1,re=null,oe=null,be=null;return{setTest:function(ye){ye?Re(s.DEPTH_TEST):Ce(s.DEPTH_TEST)},setMask:function(ye){re!==ye&&!B&&(s.depthMask(ye),re=ye)},setFunc:function(ye){if(oe!==ye){switch(ye){case au:s.depthFunc(s.NEVER);break;case lu:s.depthFunc(s.ALWAYS);break;case cu:s.depthFunc(s.LESS);break;case gr:s.depthFunc(s.LEQUAL);break;case hu:s.depthFunc(s.EQUAL);break;case du:s.depthFunc(s.GEQUAL);break;case uu:s.depthFunc(s.GREATER);break;case fu:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}oe=ye}},setLocked:function(ye){B=ye},setClear:function(ye){be!==ye&&(s.clearDepth(ye),be=ye)},reset:function(){B=!1,re=null,oe=null,be=null}}}function o(){let B=!1,re=null,oe=null,be=null,ye=null,et=null,tt=null,It=null,Nt=null;return{setTest:function(it){B||(it?Re(s.STENCIL_TEST):Ce(s.STENCIL_TEST))},setMask:function(it){re!==it&&!B&&(s.stencilMask(it),re=it)},setFunc:function(it,Pt,oi){(oe!==it||be!==Pt||ye!==oi)&&(s.stencilFunc(it,Pt,oi),oe=it,be=Pt,ye=oi)},setOp:function(it,Pt,oi){(et!==it||tt!==Pt||It!==oi)&&(s.stencilOp(it,Pt,oi),et=it,tt=Pt,It=oi)},setLocked:function(it){B=it},setClear:function(it){Nt!==it&&(s.clearStencil(it),Nt=it)},reset:function(){B=!1,re=null,oe=null,be=null,ye=null,et=null,tt=null,It=null,Nt=null}}}const a=new n,l=new r,c=new o,h=new WeakMap,d=new WeakMap;let u={},p={},g=new WeakMap,E=[],A=null,f=!1,y=null,v=null,b=null,T=null,S=null,M=null,D=null,_=new Ge(0,0,0),w=0,N=!1,H=null,$=null,R=null,U=null,z=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Y=0;const X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=Y>=1):X.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=Y>=2);let K=null,le={};const V=s.getParameter(s.SCISSOR_BOX),J=s.getParameter(s.VIEWPORT),ce=new Ze().fromArray(V),ge=new Ze().fromArray(J);function me(B,re,oe,be){const ye=new Uint8Array(4),et=s.createTexture();s.bindTexture(B,et),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let tt=0;tt<oe;tt++)i&&(B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY)?s.texImage3D(re,0,s.RGBA,1,1,be,0,s.RGBA,s.UNSIGNED_BYTE,ye):s.texImage2D(re+tt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ye);return et}const Be={};Be[s.TEXTURE_2D]=me(s.TEXTURE_2D,s.TEXTURE_2D,1),Be[s.TEXTURE_CUBE_MAP]=me(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Be[s.TEXTURE_2D_ARRAY]=me(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Be[s.TEXTURE_3D]=me(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Re(s.DEPTH_TEST),l.setFunc(gr),Pe(!1),C(qa),Re(s.CULL_FACE),fe(Oi);function Re(B){u[B]!==!0&&(s.enable(B),u[B]=!0)}function Ce(B){u[B]!==!1&&(s.disable(B),u[B]=!1)}function ze(B,re){return p[B]!==re?(s.bindFramebuffer(B,re),p[B]=re,i&&(B===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=re),B===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=re)),!0):!1}function F(B,re){let oe=E,be=!1;if(B)if(oe=g.get(re),oe===void 0&&(oe=[],g.set(re,oe)),B.isWebGLMultipleRenderTargets){const ye=B.texture;if(oe.length!==ye.length||oe[0]!==s.COLOR_ATTACHMENT0){for(let et=0,tt=ye.length;et<tt;et++)oe[et]=s.COLOR_ATTACHMENT0+et;oe.length=ye.length,be=!0}}else oe[0]!==s.COLOR_ATTACHMENT0&&(oe[0]=s.COLOR_ATTACHMENT0,be=!0);else oe[0]!==s.BACK&&(oe[0]=s.BACK,be=!0);be&&(t.isWebGL2?s.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function Dt(B){return A!==B?(s.useProgram(B),A=B,!0):!1}const ve={[Zi]:s.FUNC_ADD,[Yd]:s.FUNC_SUBTRACT,[qd]:s.FUNC_REVERSE_SUBTRACT};if(i)ve[Ka]=s.MIN,ve[ja]=s.MAX;else{const B=e.get("EXT_blend_minmax");B!==null&&(ve[Ka]=B.MIN_EXT,ve[ja]=B.MAX_EXT)}const Me={[Xd]:s.ZERO,[$d]:s.ONE,[Jd]:s.SRC_COLOR,[Go]:s.SRC_ALPHA,[iu]:s.SRC_ALPHA_SATURATE,[eu]:s.DST_COLOR,[jd]:s.DST_ALPHA,[Kd]:s.ONE_MINUS_SRC_COLOR,[Ho]:s.ONE_MINUS_SRC_ALPHA,[tu]:s.ONE_MINUS_DST_COLOR,[Zd]:s.ONE_MINUS_DST_ALPHA,[nu]:s.CONSTANT_COLOR,[su]:s.ONE_MINUS_CONSTANT_COLOR,[ru]:s.CONSTANT_ALPHA,[ou]:s.ONE_MINUS_CONSTANT_ALPHA};function fe(B,re,oe,be,ye,et,tt,It,Nt,it){if(B===Oi){f===!0&&(Ce(s.BLEND),f=!1);return}if(f===!1&&(Re(s.BLEND),f=!0),B!==Wd){if(B!==y||it!==N){if((v!==Zi||S!==Zi)&&(s.blendEquation(s.FUNC_ADD),v=Zi,S=Zi),it)switch(B){case Gn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xa:s.blendFunc(s.ONE,s.ONE);break;case $a:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ja:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Gn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xa:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case $a:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ja:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}b=null,T=null,M=null,D=null,_.set(0,0,0),w=0,y=B,N=it}return}ye=ye||re,et=et||oe,tt=tt||be,(re!==v||ye!==S)&&(s.blendEquationSeparate(ve[re],ve[ye]),v=re,S=ye),(oe!==b||be!==T||et!==M||tt!==D)&&(s.blendFuncSeparate(Me[oe],Me[be],Me[et],Me[tt]),b=oe,T=be,M=et,D=tt),(It.equals(_)===!1||Nt!==w)&&(s.blendColor(It.r,It.g,It.b,Nt),_.copy(It),w=Nt),y=B,N=!1}function lt(B,re){B.side===ci?Ce(s.CULL_FACE):Re(s.CULL_FACE);let oe=B.side===Gt;re&&(oe=!oe),Pe(oe),B.blending===Gn&&B.transparent===!1?fe(Oi):fe(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),l.setFunc(B.depthFunc),l.setTest(B.depthTest),l.setMask(B.depthWrite),a.setMask(B.colorWrite);const be=B.stencilWrite;c.setTest(be),be&&(c.setMask(B.stencilWriteMask),c.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),c.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Q(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?Re(s.SAMPLE_ALPHA_TO_COVERAGE):Ce(s.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(B){H!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),H=B)}function C(B){B!==Hd?(Re(s.CULL_FACE),B!==$&&(B===qa?s.cullFace(s.BACK):B===Vd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ce(s.CULL_FACE),$=B}function I(B){B!==R&&(W&&s.lineWidth(B),R=B)}function Q(B,re,oe){B?(Re(s.POLYGON_OFFSET_FILL),(U!==re||z!==oe)&&(s.polygonOffset(re,oe),U=re,z=oe)):Ce(s.POLYGON_OFFSET_FILL)}function ee(B){B?Re(s.SCISSOR_TEST):Ce(s.SCISSOR_TEST)}function Z(B){B===void 0&&(B=s.TEXTURE0+q-1),K!==B&&(s.activeTexture(B),K=B)}function te(B,re,oe){oe===void 0&&(K===null?oe=s.TEXTURE0+q-1:oe=K);let be=le[oe];be===void 0&&(be={type:void 0,texture:void 0},le[oe]=be),(be.type!==B||be.texture!==re)&&(K!==oe&&(s.activeTexture(oe),K=oe),s.bindTexture(B,re||Be[B]),be.type=B,be.texture=re)}function pe(){const B=le[K];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ae(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function de(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ie(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ue(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function j(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function qe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function He(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Se(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ee(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ue(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function De(B){ce.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),ce.copy(B))}function Ye(B){ge.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),ge.copy(B))}function dt(B,re){let oe=d.get(re);oe===void 0&&(oe=new WeakMap,d.set(re,oe));let be=oe.get(B);be===void 0&&(be=s.getUniformBlockIndex(re,B.name),oe.set(B,be))}function ke(B,re){const be=d.get(re).get(B);h.get(re)!==be&&(s.uniformBlockBinding(re,be,B.__bindingPointIndex),h.set(re,be))}function ne(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},K=null,le={},p={},g=new WeakMap,E=[],A=null,f=!1,y=null,v=null,b=null,T=null,S=null,M=null,D=null,_=new Ge(0,0,0),w=0,N=!1,H=null,$=null,R=null,U=null,z=null,ce.set(0,0,s.canvas.width,s.canvas.height),ge.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Re,disable:Ce,bindFramebuffer:ze,drawBuffers:F,useProgram:Dt,setBlending:fe,setMaterial:lt,setFlipSided:Pe,setCullFace:C,setLineWidth:I,setPolygonOffset:Q,setScissorTest:ee,activeTexture:Z,bindTexture:te,unbindTexture:pe,compressedTexImage2D:ae,compressedTexImage3D:de,texImage2D:Ee,texImage3D:ue,updateUBOMapping:dt,uniformBlockBinding:ke,texStorage2D:He,texStorage3D:Se,texSubImage2D:Ie,texSubImage3D:Ue,compressedTexSubImage2D:j,compressedTexSubImage3D:qe,scissor:De,viewport:Ye,reset:ne}}function jg(s,e,t,i,n,r,o){const a=n.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,I){return p?new OffscreenCanvas(C,I):Es("canvas")}function E(C,I,Q,ee){let Z=1;if((C.width>ee||C.height>ee)&&(Z=ee/Math.max(C.width,C.height)),Z<1||I===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const te=I?br:Math.floor,pe=te(Z*C.width),ae=te(Z*C.height);d===void 0&&(d=g(pe,ae));const de=Q?g(pe,ae):d;return de.width=pe,de.height=ae,de.getContext("2d").drawImage(C,0,0,pe,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+pe+"x"+ae+")."),de}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function A(C){return ea(C.width)&&ea(C.height)}function f(C){return a?!1:C.wrapS!==ot||C.wrapT!==ot||C.minFilter!==St&&C.minFilter!==gt}function y(C,I){return C.generateMipmaps&&I&&C.minFilter!==St&&C.minFilter!==gt}function v(C){s.generateMipmap(C)}function b(C,I,Q,ee,Z=!1){if(a===!1)return I;if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let te=I;if(I===s.RED&&(Q===s.FLOAT&&(te=s.R32F),Q===s.HALF_FLOAT&&(te=s.R16F),Q===s.UNSIGNED_BYTE&&(te=s.R8)),I===s.RED_INTEGER&&(Q===s.UNSIGNED_BYTE&&(te=s.R8UI),Q===s.UNSIGNED_SHORT&&(te=s.R16UI),Q===s.UNSIGNED_INT&&(te=s.R32UI),Q===s.BYTE&&(te=s.R8I),Q===s.SHORT&&(te=s.R16I),Q===s.INT&&(te=s.R32I)),I===s.RG&&(Q===s.FLOAT&&(te=s.RG32F),Q===s.HALF_FLOAT&&(te=s.RG16F),Q===s.UNSIGNED_BYTE&&(te=s.RG8)),I===s.RGBA){const pe=Z?_r:Ke.getTransfer(ee);Q===s.FLOAT&&(te=s.RGBA32F),Q===s.HALF_FLOAT&&(te=s.RGBA16F),Q===s.UNSIGNED_BYTE&&(te=pe===nt?s.SRGB8_ALPHA8:s.RGBA8),Q===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),Q===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function T(C,I,Q){return y(C,Q)===!0||C.isFramebufferTexture&&C.minFilter!==St&&C.minFilter!==gt?Math.log2(Math.max(I.width,I.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?I.mipmaps.length:1}function S(C){return C===St||C===el||C===Wr?s.NEAREST:s.LINEAR}function M(C){const I=C.target;I.removeEventListener("dispose",M),_(I),I.isVideoTexture&&h.delete(I)}function D(C){const I=C.target;I.removeEventListener("dispose",D),N(I)}function _(C){const I=i.get(C);if(I.__webglInit===void 0)return;const Q=C.source,ee=u.get(Q);if(ee){const Z=ee[I.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&w(C),Object.keys(ee).length===0&&u.delete(Q)}i.remove(C)}function w(C){const I=i.get(C);s.deleteTexture(I.__webglTexture);const Q=C.source,ee=u.get(Q);delete ee[I.__cacheKey],o.memory.textures--}function N(C){const I=C.texture,Q=i.get(C),ee=i.get(I);if(ee.__webglTexture!==void 0&&(s.deleteTexture(ee.__webglTexture),o.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(Q.__webglFramebuffer[Z]))for(let te=0;te<Q.__webglFramebuffer[Z].length;te++)s.deleteFramebuffer(Q.__webglFramebuffer[Z][te]);else s.deleteFramebuffer(Q.__webglFramebuffer[Z]);Q.__webglDepthbuffer&&s.deleteRenderbuffer(Q.__webglDepthbuffer[Z])}else{if(Array.isArray(Q.__webglFramebuffer))for(let Z=0;Z<Q.__webglFramebuffer.length;Z++)s.deleteFramebuffer(Q.__webglFramebuffer[Z]);else s.deleteFramebuffer(Q.__webglFramebuffer);if(Q.__webglDepthbuffer&&s.deleteRenderbuffer(Q.__webglDepthbuffer),Q.__webglMultisampledFramebuffer&&s.deleteFramebuffer(Q.__webglMultisampledFramebuffer),Q.__webglColorRenderbuffer)for(let Z=0;Z<Q.__webglColorRenderbuffer.length;Z++)Q.__webglColorRenderbuffer[Z]&&s.deleteRenderbuffer(Q.__webglColorRenderbuffer[Z]);Q.__webglDepthRenderbuffer&&s.deleteRenderbuffer(Q.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let Z=0,te=I.length;Z<te;Z++){const pe=i.get(I[Z]);pe.__webglTexture&&(s.deleteTexture(pe.__webglTexture),o.memory.textures--),i.remove(I[Z])}i.remove(I),i.remove(C)}let H=0;function $(){H=0}function R(){const C=H;return C>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+n.maxTextures),H+=1,C}function U(C){const I=[];return I.push(C.wrapS),I.push(C.wrapT),I.push(C.wrapR||0),I.push(C.magFilter),I.push(C.minFilter),I.push(C.anisotropy),I.push(C.internalFormat),I.push(C.format),I.push(C.type),I.push(C.generateMipmaps),I.push(C.premultiplyAlpha),I.push(C.flipY),I.push(C.unpackAlignment),I.push(C.colorSpace),I.join()}function z(C,I){const Q=i.get(C);if(C.isVideoTexture&&lt(C),C.isRenderTargetTexture===!1&&C.version>0&&Q.__version!==C.version){const ee=C.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(Q,C,I);return}}t.bindTexture(s.TEXTURE_2D,Q.__webglTexture,s.TEXTURE0+I)}function q(C,I){const Q=i.get(C);if(C.version>0&&Q.__version!==C.version){ce(Q,C,I);return}t.bindTexture(s.TEXTURE_2D_ARRAY,Q.__webglTexture,s.TEXTURE0+I)}function W(C,I){const Q=i.get(C);if(C.version>0&&Q.__version!==C.version){ce(Q,C,I);return}t.bindTexture(s.TEXTURE_3D,Q.__webglTexture,s.TEXTURE0+I)}function Y(C,I){const Q=i.get(C);if(C.version>0&&Q.__version!==C.version){ge(Q,C,I);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture,s.TEXTURE0+I)}const X={[Wo]:s.REPEAT,[ot]:s.CLAMP_TO_EDGE,[Yo]:s.MIRRORED_REPEAT},K={[St]:s.NEAREST,[el]:s.NEAREST_MIPMAP_NEAREST,[Wr]:s.NEAREST_MIPMAP_LINEAR,[gt]:s.LINEAR,[Iu]:s.LINEAR_MIPMAP_NEAREST,[Hi]:s.LINEAR_MIPMAP_LINEAR},le={[Du]:s.NEVER,[Qu]:s.ALWAYS,[Nu]:s.LESS,[dh]:s.LEQUAL,[Pu]:s.EQUAL,[ku]:s.GEQUAL,[Uu]:s.GREATER,[Fu]:s.NOTEQUAL};function V(C,I,Q){if(Q?(s.texParameteri(C,s.TEXTURE_WRAP_S,X[I.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,X[I.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,X[I.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,K[I.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,K[I.minFilter])):(s.texParameteri(C,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(C,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(I.wrapS!==ot||I.wrapT!==ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(C,s.TEXTURE_MAG_FILTER,S(I.magFilter)),s.texParameteri(C,s.TEXTURE_MIN_FILTER,S(I.minFilter)),I.minFilter!==St&&I.minFilter!==gt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),I.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,le[I.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ee=e.get("EXT_texture_filter_anisotropic");if(I.magFilter===St||I.minFilter!==Wr&&I.minFilter!==Hi||I.type===Wt&&e.has("OES_texture_float_linear")===!1||a===!1&&I.type===Si&&e.has("OES_texture_half_float_linear")===!1)return;(I.anisotropy>1||i.get(I).__currentAnisotropy)&&(s.texParameterf(C,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,n.getMaxAnisotropy())),i.get(I).__currentAnisotropy=I.anisotropy)}}function J(C,I){let Q=!1;C.__webglInit===void 0&&(C.__webglInit=!0,I.addEventListener("dispose",M));const ee=I.source;let Z=u.get(ee);Z===void 0&&(Z={},u.set(ee,Z));const te=U(I);if(te!==C.__cacheKey){Z[te]===void 0&&(Z[te]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),Z[te].usedTimes++;const pe=Z[C.__cacheKey];pe!==void 0&&(Z[C.__cacheKey].usedTimes--,pe.usedTimes===0&&w(I)),C.__cacheKey=te,C.__webglTexture=Z[te].texture}return Q}function ce(C,I,Q){let ee=s.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(ee=s.TEXTURE_2D_ARRAY),I.isData3DTexture&&(ee=s.TEXTURE_3D);const Z=J(C,I),te=I.source;t.bindTexture(ee,C.__webglTexture,s.TEXTURE0+Q);const pe=i.get(te);if(te.version!==pe.__version||Z===!0){t.activeTexture(s.TEXTURE0+Q);const ae=Ke.getPrimaries(Ke.workingColorSpace),de=I.colorSpace===Ot?null:Ke.getPrimaries(I.colorSpace),Ie=I.colorSpace===Ot||ae===de?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,I.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,I.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const Ue=f(I)&&A(I.image)===!1;let j=E(I.image,Ue,!1,n.maxTextureSize);j=Pe(I,j);const qe=A(j)||a,He=r.convert(I.format,I.colorSpace);let Se=r.convert(I.type),Ee=b(I.internalFormat,He,Se,I.colorSpace,I.isVideoTexture);V(ee,I,qe);let ue;const De=I.mipmaps,Ye=a&&I.isVideoTexture!==!0&&Ee!==ua,dt=pe.__version===void 0||Z===!0,ke=T(I,j,qe);if(I.isDepthTexture)Ee=s.DEPTH_COMPONENT,a?I.type===Wt?Ee=s.DEPTH_COMPONENT32F:I.type===Fi?Ee=s.DEPTH_COMPONENT24:I.type===on?Ee=s.DEPTH24_STENCIL8:Ee=s.DEPTH_COMPONENT16:I.type===Wt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),I.format===an&&Ee===s.DEPTH_COMPONENT&&I.type!==da&&I.type!==Fi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),I.type=Fi,Se=r.convert(I.type)),I.format===Wn&&Ee===s.DEPTH_COMPONENT&&(Ee=s.DEPTH_STENCIL,I.type!==on&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),I.type=on,Se=r.convert(I.type))),dt&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,Ee,j.width,j.height):t.texImage2D(s.TEXTURE_2D,0,Ee,j.width,j.height,0,He,Se,null));else if(I.isDataTexture)if(De.length>0&&qe){Ye&&dt&&t.texStorage2D(s.TEXTURE_2D,ke,Ee,De[0].width,De[0].height);for(let ne=0,B=De.length;ne<B;ne++)ue=De[ne],Ye?t.texSubImage2D(s.TEXTURE_2D,ne,0,0,ue.width,ue.height,He,Se,ue.data):t.texImage2D(s.TEXTURE_2D,ne,Ee,ue.width,ue.height,0,He,Se,ue.data);I.generateMipmaps=!1}else Ye?(dt&&t.texStorage2D(s.TEXTURE_2D,ke,Ee,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,j.width,j.height,He,Se,j.data)):t.texImage2D(s.TEXTURE_2D,0,Ee,j.width,j.height,0,He,Se,j.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){Ye&&dt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ke,Ee,De[0].width,De[0].height,j.depth);for(let ne=0,B=De.length;ne<B;ne++)ue=De[ne],I.format!==bt?He!==null?Ye?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,j.depth,He,ue.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ne,Ee,ue.width,ue.height,j.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,j.depth,He,Se,ue.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ne,Ee,ue.width,ue.height,j.depth,0,He,Se,ue.data)}else{Ye&&dt&&t.texStorage2D(s.TEXTURE_2D,ke,Ee,De[0].width,De[0].height);for(let ne=0,B=De.length;ne<B;ne++)ue=De[ne],I.format!==bt?He!==null?Ye?t.compressedTexSubImage2D(s.TEXTURE_2D,ne,0,0,ue.width,ue.height,He,ue.data):t.compressedTexImage2D(s.TEXTURE_2D,ne,Ee,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(s.TEXTURE_2D,ne,0,0,ue.width,ue.height,He,Se,ue.data):t.texImage2D(s.TEXTURE_2D,ne,Ee,ue.width,ue.height,0,He,Se,ue.data)}else if(I.isDataArrayTexture)Ye?(dt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ke,Ee,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,He,Se,j.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ee,j.width,j.height,j.depth,0,He,Se,j.data);else if(I.isData3DTexture)Ye?(dt&&t.texStorage3D(s.TEXTURE_3D,ke,Ee,j.width,j.height,j.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,He,Se,j.data)):t.texImage3D(s.TEXTURE_3D,0,Ee,j.width,j.height,j.depth,0,He,Se,j.data);else if(I.isFramebufferTexture){if(dt)if(Ye)t.texStorage2D(s.TEXTURE_2D,ke,Ee,j.width,j.height);else{let ne=j.width,B=j.height;for(let re=0;re<ke;re++)t.texImage2D(s.TEXTURE_2D,re,Ee,ne,B,0,He,Se,null),ne>>=1,B>>=1}}else if(De.length>0&&qe){Ye&&dt&&t.texStorage2D(s.TEXTURE_2D,ke,Ee,De[0].width,De[0].height);for(let ne=0,B=De.length;ne<B;ne++)ue=De[ne],Ye?t.texSubImage2D(s.TEXTURE_2D,ne,0,0,He,Se,ue):t.texImage2D(s.TEXTURE_2D,ne,Ee,He,Se,ue);I.generateMipmaps=!1}else Ye?(dt&&t.texStorage2D(s.TEXTURE_2D,ke,Ee,j.width,j.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,He,Se,j)):t.texImage2D(s.TEXTURE_2D,0,Ee,He,Se,j);y(I,qe)&&v(ee),pe.__version=te.version,I.onUpdate&&I.onUpdate(I)}C.__version=I.version}function ge(C,I,Q){if(I.image.length!==6)return;const ee=J(C,I),Z=I.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+Q);const te=i.get(Z);if(Z.version!==te.__version||ee===!0){t.activeTexture(s.TEXTURE0+Q);const pe=Ke.getPrimaries(Ke.workingColorSpace),ae=I.colorSpace===Ot?null:Ke.getPrimaries(I.colorSpace),de=I.colorSpace===Ot||pe===ae?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,I.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,I.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Ie=I.isCompressedTexture||I.image[0].isCompressedTexture,Ue=I.image[0]&&I.image[0].isDataTexture,j=[];for(let ne=0;ne<6;ne++)!Ie&&!Ue?j[ne]=E(I.image[ne],!1,!0,n.maxCubemapSize):j[ne]=Ue?I.image[ne].image:I.image[ne],j[ne]=Pe(I,j[ne]);const qe=j[0],He=A(qe)||a,Se=r.convert(I.format,I.colorSpace),Ee=r.convert(I.type),ue=b(I.internalFormat,Se,Ee,I.colorSpace),De=a&&I.isVideoTexture!==!0,Ye=te.__version===void 0||ee===!0;let dt=T(I,qe,He);V(s.TEXTURE_CUBE_MAP,I,He);let ke;if(Ie){De&&Ye&&t.texStorage2D(s.TEXTURE_CUBE_MAP,dt,ue,qe.width,qe.height);for(let ne=0;ne<6;ne++){ke=j[ne].mipmaps;for(let B=0;B<ke.length;B++){const re=ke[B];I.format!==bt?Se!==null?De?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B,0,0,re.width,re.height,Se,re.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B,ue,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B,0,0,re.width,re.height,Se,Ee,re.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B,ue,re.width,re.height,0,Se,Ee,re.data)}}}else{ke=I.mipmaps,De&&Ye&&(ke.length>0&&dt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,dt,ue,j[0].width,j[0].height));for(let ne=0;ne<6;ne++)if(Ue){De?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,j[ne].width,j[ne].height,Se,Ee,j[ne].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ue,j[ne].width,j[ne].height,0,Se,Ee,j[ne].data);for(let B=0;B<ke.length;B++){const oe=ke[B].image[ne].image;De?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B+1,0,0,oe.width,oe.height,Se,Ee,oe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B+1,ue,oe.width,oe.height,0,Se,Ee,oe.data)}}else{De?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Se,Ee,j[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ue,Se,Ee,j[ne]);for(let B=0;B<ke.length;B++){const re=ke[B];De?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B+1,0,0,Se,Ee,re.image[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,B+1,ue,Se,Ee,re.image[ne])}}}y(I,He)&&v(s.TEXTURE_CUBE_MAP),te.__version=Z.version,I.onUpdate&&I.onUpdate(I)}C.__version=I.version}function me(C,I,Q,ee,Z,te){const pe=r.convert(Q.format,Q.colorSpace),ae=r.convert(Q.type),de=b(Q.internalFormat,pe,ae,Q.colorSpace);if(!i.get(I).__hasExternalTextures){const Ue=Math.max(1,I.width>>te),j=Math.max(1,I.height>>te);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?t.texImage3D(Z,te,de,Ue,j,I.depth,0,pe,ae,null):t.texImage2D(Z,te,de,Ue,j,0,pe,ae,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),fe(I)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ee,Z,i.get(Q).__webglTexture,0,Me(I)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ee,Z,i.get(Q).__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Be(C,I,Q){if(s.bindRenderbuffer(s.RENDERBUFFER,C),I.depthBuffer&&!I.stencilBuffer){let ee=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(Q||fe(I)){const Z=I.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Wt?ee=s.DEPTH_COMPONENT32F:Z.type===Fi&&(ee=s.DEPTH_COMPONENT24));const te=Me(I);fe(I)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,ee,I.width,I.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,te,ee,I.width,I.height)}else s.renderbufferStorage(s.RENDERBUFFER,ee,I.width,I.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,C)}else if(I.depthBuffer&&I.stencilBuffer){const ee=Me(I);Q&&fe(I)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,s.DEPTH24_STENCIL8,I.width,I.height):fe(I)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,s.DEPTH24_STENCIL8,I.width,I.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,C)}else{const ee=I.isWebGLMultipleRenderTargets===!0?I.texture:[I.texture];for(let Z=0;Z<ee.length;Z++){const te=ee[Z],pe=r.convert(te.format,te.colorSpace),ae=r.convert(te.type),de=b(te.internalFormat,pe,ae,te.colorSpace),Ie=Me(I);Q&&fe(I)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie,de,I.width,I.height):fe(I)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ie,de,I.width,I.height):s.renderbufferStorage(s.RENDERBUFFER,de,I.width,I.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Re(C,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(I.depthTexture).__webglTexture||I.depthTexture.image.width!==I.width||I.depthTexture.image.height!==I.height)&&(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),z(I.depthTexture,0);const ee=i.get(I.depthTexture).__webglTexture,Z=Me(I);if(I.depthTexture.format===an)fe(I)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ee,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ee,0);else if(I.depthTexture.format===Wn)fe(I)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ee,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ce(C){const I=i.get(C),Q=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!I.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");Re(I.__webglFramebuffer,C)}else if(Q){I.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(s.FRAMEBUFFER,I.__webglFramebuffer[ee]),I.__webglDepthbuffer[ee]=s.createRenderbuffer(),Be(I.__webglDepthbuffer[ee],C,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer=s.createRenderbuffer(),Be(I.__webglDepthbuffer,C,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function ze(C,I,Q){const ee=i.get(C);I!==void 0&&me(ee.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Q!==void 0&&Ce(C)}function F(C){const I=C.texture,Q=i.get(C),ee=i.get(I);C.addEventListener("dispose",D),C.isWebGLMultipleRenderTargets!==!0&&(ee.__webglTexture===void 0&&(ee.__webglTexture=s.createTexture()),ee.__version=I.version,o.memory.textures++);const Z=C.isWebGLCubeRenderTarget===!0,te=C.isWebGLMultipleRenderTargets===!0,pe=A(C)||a;if(Z){Q.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&I.mipmaps&&I.mipmaps.length>0){Q.__webglFramebuffer[ae]=[];for(let de=0;de<I.mipmaps.length;de++)Q.__webglFramebuffer[ae][de]=s.createFramebuffer()}else Q.__webglFramebuffer[ae]=s.createFramebuffer()}else{if(a&&I.mipmaps&&I.mipmaps.length>0){Q.__webglFramebuffer=[];for(let ae=0;ae<I.mipmaps.length;ae++)Q.__webglFramebuffer[ae]=s.createFramebuffer()}else Q.__webglFramebuffer=s.createFramebuffer();if(te)if(n.drawBuffers){const ae=C.texture;for(let de=0,Ie=ae.length;de<Ie;de++){const Ue=i.get(ae[de]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&C.samples>0&&fe(C)===!1){const ae=te?I:[I];Q.__webglMultisampledFramebuffer=s.createFramebuffer(),Q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let de=0;de<ae.length;de++){const Ie=ae[de];Q.__webglColorRenderbuffer[de]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Q.__webglColorRenderbuffer[de]);const Ue=r.convert(Ie.format,Ie.colorSpace),j=r.convert(Ie.type),qe=b(Ie.internalFormat,Ue,j,Ie.colorSpace,C.isXRRenderTarget===!0),He=Me(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,He,qe,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+de,s.RENDERBUFFER,Q.__webglColorRenderbuffer[de])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(Q.__webglDepthRenderbuffer=s.createRenderbuffer(),Be(Q.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Z){t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture),V(s.TEXTURE_CUBE_MAP,I,pe);for(let ae=0;ae<6;ae++)if(a&&I.mipmaps&&I.mipmaps.length>0)for(let de=0;de<I.mipmaps.length;de++)me(Q.__webglFramebuffer[ae][de],C,I,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,de);else me(Q.__webglFramebuffer[ae],C,I,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);y(I,pe)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const ae=C.texture;for(let de=0,Ie=ae.length;de<Ie;de++){const Ue=ae[de],j=i.get(Ue);t.bindTexture(s.TEXTURE_2D,j.__webglTexture),V(s.TEXTURE_2D,Ue,pe),me(Q.__webglFramebuffer,C,Ue,s.COLOR_ATTACHMENT0+de,s.TEXTURE_2D,0),y(Ue,pe)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let ae=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(a?ae=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,ee.__webglTexture),V(ae,I,pe),a&&I.mipmaps&&I.mipmaps.length>0)for(let de=0;de<I.mipmaps.length;de++)me(Q.__webglFramebuffer[de],C,I,s.COLOR_ATTACHMENT0,ae,de);else me(Q.__webglFramebuffer,C,I,s.COLOR_ATTACHMENT0,ae,0);y(I,pe)&&v(ae),t.unbindTexture()}C.depthBuffer&&Ce(C)}function Dt(C){const I=A(C)||a,Q=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ee=0,Z=Q.length;ee<Z;ee++){const te=Q[ee];if(y(te,I)){const pe=C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ae=i.get(te).__webglTexture;t.bindTexture(pe,ae),v(pe),t.unbindTexture()}}}function ve(C){if(a&&C.samples>0&&fe(C)===!1){const I=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],Q=C.width,ee=C.height;let Z=s.COLOR_BUFFER_BIT;const te=[],pe=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=i.get(C),de=C.isWebGLMultipleRenderTargets===!0;if(de)for(let Ie=0;Ie<I.length;Ie++)t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let Ie=0;Ie<I.length;Ie++){te.push(s.COLOR_ATTACHMENT0+Ie),C.depthBuffer&&te.push(pe);const Ue=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(Ue===!1&&(C.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),de&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ae.__webglColorRenderbuffer[Ie]),Ue===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[pe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[pe])),de){const j=i.get(I[Ie]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,j,0)}s.blitFramebuffer(0,0,Q,ee,0,0,Q,ee,Z,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),de)for(let Ie=0;Ie<I.length;Ie++){t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,ae.__webglColorRenderbuffer[Ie]);const Ue=i.get(I[Ie]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,Ue,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Me(C){return Math.min(n.maxSamples,C.samples)}function fe(C){const I=i.get(C);return a&&C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function lt(C){const I=o.render.frame;h.get(C)!==I&&(h.set(C,I),C.update())}function Pe(C,I){const Q=C.colorSpace,ee=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===Zo||Q!==ui&&Q!==Ot&&(Ke.getTransfer(Q)===nt?a===!1?e.has("EXT_sRGB")===!0&&ee===bt?(C.format=Zo,C.minFilter=gt,C.generateMipmaps=!1):I=fh.sRGBToLinear(I):(ee!==bt||Z!==vt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),I}this.allocateTextureUnit=R,this.resetTextureUnits=$,this.setTexture2D=z,this.setTexture2DArray=q,this.setTexture3D=W,this.setTextureCube=Y,this.rebindTextures=ze,this.setupRenderTarget=F,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=me,this.useMultisampledRTT=fe}function Zg(s,e,t){const i=t.isWebGL2;function n(r,o=Ot){let a;const l=Ke.getTransfer(o);if(r===vt)return s.UNSIGNED_BYTE;if(r===sh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===rh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===xu)return s.BYTE;if(r===Cu)return s.SHORT;if(r===da)return s.UNSIGNED_SHORT;if(r===nh)return s.INT;if(r===Fi)return s.UNSIGNED_INT;if(r===Wt)return s.FLOAT;if(r===Si)return i?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===bu)return s.ALPHA;if(r===bt)return s.RGBA;if(r===wu)return s.LUMINANCE;if(r===Su)return s.LUMINANCE_ALPHA;if(r===an)return s.DEPTH_COMPONENT;if(r===Wn)return s.DEPTH_STENCIL;if(r===Zo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Un)return s.RED;if(r===oh)return s.RED_INTEGER;if(r===Fn)return s.RG;if(r===ah)return s.RG_INTEGER;if(r===lh)return s.RGBA_INTEGER;if(r===cr||r===Yr||r===qr||r===hr)if(l===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===cr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===qr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===cr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Yr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===qr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===hr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===qo||r===tl||r===Xo||r===il)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===qo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===tl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Xo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===il)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ua)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===$o||r===Jo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===$o)return l===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Jo)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ko||r===nl||r===sl||r===rl||r===Er||r===ol||r===al||r===ll||r===cl||r===hl||r===dl||r===ul||r===fl||r===pl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Ko)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===nl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===sl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===rl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Er)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ol)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===al)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ll)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===cl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===hl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===dl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ul)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===fl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===pl)return l===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===dr||r===Al||r===ml)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===dr)return l===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Al)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ml)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Mu||r===gl||r===El||r===vl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===dr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===gl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===El)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===vl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===on?i?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:n}}class eE extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class nn extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tE={type:"move"};class Eo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const E of e.hand.values()){const A=t.getJointPose(E,i),f=this._getHandJoint(c,E);A!==null&&(f.matrix.fromArray(A.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=A.radius),f.visible=A!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tE)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new nn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class iE extends $n{constructor(e,t){super();const i=this;let n=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const E=t.getContextAttributes();let A=null,f=null;const y=[],v=[],b=new xe;let T=null;const S=new Rt;S.layers.enable(1),S.viewport=new Ze;const M=new Rt;M.layers.enable(2),M.viewport=new Ze;const D=[S,M],_=new eE;_.layers.enable(1),_.layers.enable(2);let w=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let J=y[V];return J===void 0&&(J=new Eo,y[V]=J),J.getTargetRaySpace()},this.getControllerGrip=function(V){let J=y[V];return J===void 0&&(J=new Eo,y[V]=J),J.getGripSpace()},this.getHand=function(V){let J=y[V];return J===void 0&&(J=new Eo,y[V]=J),J.getHandSpace()};function H(V){const J=v.indexOf(V.inputSource);if(J===-1)return;const ce=y[J];ce!==void 0&&(ce.update(V.inputSource,V.frame,c||o),ce.dispatchEvent({type:V.type,data:V.inputSource}))}function $(){n.removeEventListener("select",H),n.removeEventListener("selectstart",H),n.removeEventListener("selectend",H),n.removeEventListener("squeeze",H),n.removeEventListener("squeezestart",H),n.removeEventListener("squeezeend",H),n.removeEventListener("end",$),n.removeEventListener("inputsourceschange",R);for(let V=0;V<y.length;V++){const J=v[V];J!==null&&(v[V]=null,y[V].disconnect(J))}w=null,N=null,e.setRenderTarget(A),p=null,u=null,d=null,n=null,f=null,le.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(V){if(n=V,n!==null){if(A=e.getRenderTarget(),n.addEventListener("select",H),n.addEventListener("selectstart",H),n.addEventListener("selectend",H),n.addEventListener("squeeze",H),n.addEventListener("squeezestart",H),n.addEventListener("squeezeend",H),n.addEventListener("end",$),n.addEventListener("inputsourceschange",R),E.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(b),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:n.renderState.layers===void 0?E.antialias:!0,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,t,J),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new hn(p.framebufferWidth,p.framebufferHeight,{format:bt,type:vt,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil})}else{let J=null,ce=null,ge=null;E.depth&&(ge=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=E.stencil?Wn:an,ce=E.stencil?on:Fi);const me={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};d=new XRWebGLBinding(n,t),u=d.createProjectionLayer(me),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),f=new hn(u.textureWidth,u.textureHeight,{format:bt,type:vt,depthTexture:new bh(u.textureWidth,u.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0});const Be=e.properties.get(f);Be.__ignoreDepthValues=u.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),le.setContext(n),le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function R(V){for(let J=0;J<V.removed.length;J++){const ce=V.removed[J],ge=v.indexOf(ce);ge>=0&&(v[ge]=null,y[ge].disconnect(ce))}for(let J=0;J<V.added.length;J++){const ce=V.added[J];let ge=v.indexOf(ce);if(ge===-1){for(let Be=0;Be<y.length;Be++)if(Be>=v.length){v.push(ce),ge=Be;break}else if(v[Be]===null){v[Be]=ce,ge=Be;break}if(ge===-1)break}const me=y[ge];me&&me.connect(ce)}}const U=new L,z=new L;function q(V,J,ce){U.setFromMatrixPosition(J.matrixWorld),z.setFromMatrixPosition(ce.matrixWorld);const ge=U.distanceTo(z),me=J.projectionMatrix.elements,Be=ce.projectionMatrix.elements,Re=me[14]/(me[10]-1),Ce=me[14]/(me[10]+1),ze=(me[9]+1)/me[5],F=(me[9]-1)/me[5],Dt=(me[8]-1)/me[0],ve=(Be[8]+1)/Be[0],Me=Re*Dt,fe=Re*ve,lt=ge/(-Dt+ve),Pe=lt*-Dt;J.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Pe),V.translateZ(lt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const C=Re+lt,I=Ce+lt,Q=Me-Pe,ee=fe+(ge-Pe),Z=ze*Ce/I*C,te=F*Ce/I*C;V.projectionMatrix.makePerspective(Q,ee,Z,te,C,I),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function W(V,J){J===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(J.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(n===null)return;_.near=M.near=S.near=V.near,_.far=M.far=S.far=V.far,(w!==_.near||N!==_.far)&&(n.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,N=_.far);const J=V.parent,ce=_.cameras;W(_,J);for(let ge=0;ge<ce.length;ge++)W(ce[ge],J);ce.length===2?q(_,S,M):_.projectionMatrix.copy(S.projectionMatrix),Y(V,_,J)};function Y(V,J,ce){ce===null?V.matrix.copy(J.matrixWorld):(V.matrix.copy(ce.matrixWorld),V.matrix.invert(),V.matrix.multiply(J.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Yn*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(V){l=V,u!==null&&(u.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)};let X=null;function K(V,J){if(h=J.getViewerPose(c||o),g=J,h!==null){const ce=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ge=!1;ce.length!==_.cameras.length&&(_.cameras.length=0,ge=!0);for(let me=0;me<ce.length;me++){const Be=ce[me];let Re=null;if(p!==null)Re=p.getViewport(Be);else{const ze=d.getViewSubImage(u,Be);Re=ze.viewport,me===0&&(e.setRenderTargetTextures(f,ze.colorTexture,u.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(f))}let Ce=D[me];Ce===void 0&&(Ce=new Rt,Ce.layers.enable(me),Ce.viewport=new Ze,D[me]=Ce),Ce.matrix.fromArray(Be.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(Be.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Re.x,Re.y,Re.width,Re.height),me===0&&(_.matrix.copy(Ce.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ge===!0&&_.cameras.push(Ce)}}for(let ce=0;ce<y.length;ce++){const ge=v[ce],me=y[ce];ge!==null&&me!==void 0&&me.update(ge,J,c||o)}X&&X(V,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const le=new xh;le.setAnimationLoop(K),this.setAnimationLoop=function(V){X=V},this.dispose=function(){}}}function nE(s,e){function t(A,f){A.matrixAutoUpdate===!0&&A.updateMatrix(),f.value.copy(A.matrix)}function i(A,f){f.color.getRGB(A.fogColor.value,yh(s)),f.isFog?(A.fogNear.value=f.near,A.fogFar.value=f.far):f.isFogExp2&&(A.fogDensity.value=f.density)}function n(A,f,y,v,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(A,f):f.isMeshToonMaterial?(r(A,f),d(A,f)):f.isMeshPhongMaterial?(r(A,f),h(A,f)):f.isMeshStandardMaterial?(r(A,f),u(A,f),f.isMeshPhysicalMaterial&&p(A,f,b)):f.isMeshMatcapMaterial?(r(A,f),g(A,f)):f.isMeshDepthMaterial?r(A,f):f.isMeshDistanceMaterial?(r(A,f),E(A,f)):f.isMeshNormalMaterial?r(A,f):f.isLineBasicMaterial?(o(A,f),f.isLineDashedMaterial&&a(A,f)):f.isPointsMaterial?l(A,f,y,v):f.isSpriteMaterial?c(A,f):f.isShadowMaterial?(A.color.value.copy(f.color),A.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(A,f){A.opacity.value=f.opacity,f.color&&A.diffuse.value.copy(f.color),f.emissive&&A.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(A.map.value=f.map,t(f.map,A.mapTransform)),f.alphaMap&&(A.alphaMap.value=f.alphaMap,t(f.alphaMap,A.alphaMapTransform)),f.bumpMap&&(A.bumpMap.value=f.bumpMap,t(f.bumpMap,A.bumpMapTransform),A.bumpScale.value=f.bumpScale,f.side===Gt&&(A.bumpScale.value*=-1)),f.normalMap&&(A.normalMap.value=f.normalMap,t(f.normalMap,A.normalMapTransform),A.normalScale.value.copy(f.normalScale),f.side===Gt&&A.normalScale.value.negate()),f.displacementMap&&(A.displacementMap.value=f.displacementMap,t(f.displacementMap,A.displacementMapTransform),A.displacementScale.value=f.displacementScale,A.displacementBias.value=f.displacementBias),f.emissiveMap&&(A.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,A.emissiveMapTransform)),f.specularMap&&(A.specularMap.value=f.specularMap,t(f.specularMap,A.specularMapTransform)),f.alphaTest>0&&(A.alphaTest.value=f.alphaTest);const y=e.get(f).envMap;if(y&&(A.envMap.value=y,A.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,A.reflectivity.value=f.reflectivity,A.ior.value=f.ior,A.refractionRatio.value=f.refractionRatio),f.lightMap){A.lightMap.value=f.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;A.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,A.lightMapTransform)}f.aoMap&&(A.aoMap.value=f.aoMap,A.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,A.aoMapTransform))}function o(A,f){A.diffuse.value.copy(f.color),A.opacity.value=f.opacity,f.map&&(A.map.value=f.map,t(f.map,A.mapTransform))}function a(A,f){A.dashSize.value=f.dashSize,A.totalSize.value=f.dashSize+f.gapSize,A.scale.value=f.scale}function l(A,f,y,v){A.diffuse.value.copy(f.color),A.opacity.value=f.opacity,A.size.value=f.size*y,A.scale.value=v*.5,f.map&&(A.map.value=f.map,t(f.map,A.uvTransform)),f.alphaMap&&(A.alphaMap.value=f.alphaMap,t(f.alphaMap,A.alphaMapTransform)),f.alphaTest>0&&(A.alphaTest.value=f.alphaTest)}function c(A,f){A.diffuse.value.copy(f.color),A.opacity.value=f.opacity,A.rotation.value=f.rotation,f.map&&(A.map.value=f.map,t(f.map,A.mapTransform)),f.alphaMap&&(A.alphaMap.value=f.alphaMap,t(f.alphaMap,A.alphaMapTransform)),f.alphaTest>0&&(A.alphaTest.value=f.alphaTest)}function h(A,f){A.specular.value.copy(f.specular),A.shininess.value=Math.max(f.shininess,1e-4)}function d(A,f){f.gradientMap&&(A.gradientMap.value=f.gradientMap)}function u(A,f){A.metalness.value=f.metalness,f.metalnessMap&&(A.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,A.metalnessMapTransform)),A.roughness.value=f.roughness,f.roughnessMap&&(A.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,A.roughnessMapTransform)),e.get(f).envMap&&(A.envMapIntensity.value=f.envMapIntensity)}function p(A,f,y){A.ior.value=f.ior,f.sheen>0&&(A.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),A.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(A.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,A.sheenColorMapTransform)),f.sheenRoughnessMap&&(A.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,A.sheenRoughnessMapTransform))),f.clearcoat>0&&(A.clearcoat.value=f.clearcoat,A.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(A.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,A.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(A.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,A.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(A.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,A.clearcoatNormalMapTransform),A.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Gt&&A.clearcoatNormalScale.value.negate())),f.iridescence>0&&(A.iridescence.value=f.iridescence,A.iridescenceIOR.value=f.iridescenceIOR,A.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],A.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(A.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,A.iridescenceMapTransform)),f.iridescenceThicknessMap&&(A.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,A.iridescenceThicknessMapTransform))),f.transmission>0&&(A.transmission.value=f.transmission,A.transmissionSamplerMap.value=y.texture,A.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(A.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,A.transmissionMapTransform)),A.thickness.value=f.thickness,f.thicknessMap&&(A.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,A.thicknessMapTransform)),A.attenuationDistance.value=f.attenuationDistance,A.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(A.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(A.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,A.anisotropyMapTransform))),A.specularIntensity.value=f.specularIntensity,A.specularColor.value.copy(f.specularColor),f.specularColorMap&&(A.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,A.specularColorMapTransform)),f.specularIntensityMap&&(A.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,A.specularIntensityMapTransform))}function g(A,f){f.matcap&&(A.matcap.value=f.matcap)}function E(A,f){const y=e.get(f).light;A.referencePosition.value.setFromMatrixPosition(y.matrixWorld),A.nearDistance.value=y.shadow.camera.near,A.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function sE(s,e,t,i){let n={},r={},o=[];const a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,v){const b=v.program;i.uniformBlockBinding(y,b)}function c(y,v){let b=n[y.id];b===void 0&&(g(y),b=h(y),n[y.id]=b,y.addEventListener("dispose",A));const T=v.program;i.updateUBOMapping(y,T);const S=e.render.frame;r[y.id]!==S&&(u(y),r[y.id]=S)}function h(y){const v=d();y.__bindingPointIndex=v;const b=s.createBuffer(),T=y.__size,S=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,T,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,b),b}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const v=n[y.id],b=y.uniforms,T=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let S=0,M=b.length;S<M;S++){const D=Array.isArray(b[S])?b[S]:[b[S]];for(let _=0,w=D.length;_<w;_++){const N=D[_];if(p(N,S,_,T)===!0){const H=N.__offset,$=Array.isArray(N.value)?N.value:[N.value];let R=0;for(let U=0;U<$.length;U++){const z=$[U],q=E(z);typeof z=="number"||typeof z=="boolean"?(N.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,H+R,N.__data)):z.isMatrix3?(N.__data[0]=z.elements[0],N.__data[1]=z.elements[1],N.__data[2]=z.elements[2],N.__data[3]=0,N.__data[4]=z.elements[3],N.__data[5]=z.elements[4],N.__data[6]=z.elements[5],N.__data[7]=0,N.__data[8]=z.elements[6],N.__data[9]=z.elements[7],N.__data[10]=z.elements[8],N.__data[11]=0):(z.toArray(N.__data,R),R+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,N.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(y,v,b,T){const S=y.value,M=v+"_"+b;if(T[M]===void 0)return typeof S=="number"||typeof S=="boolean"?T[M]=S:T[M]=S.clone(),!0;{const D=T[M];if(typeof S=="number"||typeof S=="boolean"){if(D!==S)return T[M]=S,!0}else if(D.equals(S)===!1)return D.copy(S),!0}return!1}function g(y){const v=y.uniforms;let b=0;const T=16;for(let M=0,D=v.length;M<D;M++){const _=Array.isArray(v[M])?v[M]:[v[M]];for(let w=0,N=_.length;w<N;w++){const H=_[w],$=Array.isArray(H.value)?H.value:[H.value];for(let R=0,U=$.length;R<U;R++){const z=$[R],q=E(z),W=b%T;W!==0&&T-W<q.boundary&&(b+=T-W),H.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=b,b+=q.storage}}}const S=b%T;return S>0&&(b+=T-S),y.__size=b,y.__cache={},this}function E(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function A(y){const v=y.target;v.removeEventListener("dispose",A);const b=o.indexOf(v.__bindingPointIndex);o.splice(b,1),s.deleteBuffer(n[v.id]),delete n[v.id],delete r[v.id]}function f(){for(const y in n)s.deleteBuffer(n[y]);o=[],n={},r={}}return{bind:l,update:c,dispose:f}}class Ur{constructor(e={}){const{canvas:t=ef(),context:i=null,depth:n=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;i!==null?u=i.getContextAttributes().alpha:u=o;const p=new Uint32Array(4),g=new Int32Array(4);let E=null,A=null;const f=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=st,this._useLegacyLights=!1,this.toneMapping=wi,this.toneMappingExposure=1;const v=this;let b=!1,T=0,S=0,M=null,D=-1,_=null;const w=new Ze,N=new Ze;let H=null;const $=new Ge(0);let R=0,U=t.width,z=t.height,q=1,W=null,Y=null;const X=new Ze(0,0,U,z),K=new Ze(0,0,U,z);let le=!1;const V=new Aa;let J=!1,ce=!1,ge=null;const me=new Ve,Be=new xe,Re=new L,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return M===null?q:1}let F=i;function Dt(x,P){for(let O=0;O<x.length;O++){const G=x[O],k=t.getContext(G,P);if(k!==null)return k}return null}try{const x={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ha}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",B,!1),t.addEventListener("webglcontextcreationerror",re,!1),F===null){const P=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&P.shift(),F=Dt(P,x),F===null)throw Dt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let ve,Me,fe,lt,Pe,C,I,Q,ee,Z,te,pe,ae,de,Ie,Ue,j,qe,He,Se,Ee,ue,De,Ye;function dt(){ve=new pm(F),Me=new lm(F,ve,e),ve.init(Me),ue=new Zg(F,ve,Me),fe=new Kg(F,ve,Me),lt=new gm(F),Pe=new Fg,C=new jg(F,ve,fe,Pe,Me,ue,lt),I=new hm(v),Q=new fm(v),ee=new bf(F,Me),De=new om(F,ve,ee,Me),Z=new Am(F,ee,lt,De),te=new _m(F,Z,ee,lt),He=new ym(F,Me,C),Ue=new cm(Pe),pe=new Ug(v,I,Q,ve,Me,De,Ue),ae=new nE(v,Pe),de=new Qg,Ie=new Wg(ve,Me),qe=new rm(v,I,Q,fe,te,u,l),j=new Jg(v,te,Me),Ye=new sE(F,lt,Me,fe),Se=new am(F,ve,lt,Me),Ee=new mm(F,ve,lt,Me),lt.programs=pe.programs,v.capabilities=Me,v.extensions=ve,v.properties=Pe,v.renderLists=de,v.shadowMap=j,v.state=fe,v.info=lt}dt();const ke=new iE(v,F);this.xr=ke,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const x=ve.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=ve.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(x){x!==void 0&&(q=x,this.setSize(U,z,!1))},this.getSize=function(x){return x.set(U,z)},this.setSize=function(x,P,O=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=x,z=P,t.width=Math.floor(x*q),t.height=Math.floor(P*q),O===!0&&(t.style.width=x+"px",t.style.height=P+"px"),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(U*q,z*q).floor()},this.setDrawingBufferSize=function(x,P,O){U=x,z=P,q=O,t.width=Math.floor(x*O),t.height=Math.floor(P*O),this.setViewport(0,0,x,P)},this.getCurrentViewport=function(x){return x.copy(w)},this.getViewport=function(x){return x.copy(X)},this.setViewport=function(x,P,O,G){x.isVector4?X.set(x.x,x.y,x.z,x.w):X.set(x,P,O,G),fe.viewport(w.copy(X).multiplyScalar(q).floor())},this.getScissor=function(x){return x.copy(K)},this.setScissor=function(x,P,O,G){x.isVector4?K.set(x.x,x.y,x.z,x.w):K.set(x,P,O,G),fe.scissor(N.copy(K).multiplyScalar(q).floor())},this.getScissorTest=function(){return le},this.setScissorTest=function(x){fe.setScissorTest(le=x)},this.setOpaqueSort=function(x){W=x},this.setTransparentSort=function(x){Y=x},this.getClearColor=function(x){return x.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(x=!0,P=!0,O=!0){let G=0;if(x){let k=!1;if(M!==null){const he=M.texture.format;k=he===lh||he===ah||he===oh}if(k){const he=M.texture.type,Ae=he===vt||he===Fi||he===da||he===on||he===sh||he===rh,_e=qe.getClearColor(),we=qe.getClearAlpha(),Fe=_e.r,Te=_e.g,Le=_e.b;Ae?(p[0]=Fe,p[1]=Te,p[2]=Le,p[3]=we,F.clearBufferuiv(F.COLOR,0,p)):(g[0]=Fe,g[1]=Te,g[2]=Le,g[3]=we,F.clearBufferiv(F.COLOR,0,g))}else G|=F.COLOR_BUFFER_BIT}P&&(G|=F.DEPTH_BUFFER_BIT),O&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",B,!1),t.removeEventListener("webglcontextcreationerror",re,!1),de.dispose(),Ie.dispose(),Pe.dispose(),I.dispose(),Q.dispose(),te.dispose(),De.dispose(),Ye.dispose(),pe.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",Nt),ke.removeEventListener("sessionend",it),ge&&(ge.dispose(),ge=null),Pt.stop()};function ne(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const x=lt.autoReset,P=j.enabled,O=j.autoUpdate,G=j.needsUpdate,k=j.type;dt(),lt.autoReset=x,j.enabled=P,j.autoUpdate=O,j.needsUpdate=G,j.type=k}function re(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function oe(x){const P=x.target;P.removeEventListener("dispose",oe),be(P)}function be(x){ye(x),Pe.remove(x)}function ye(x){const P=Pe.get(x).programs;P!==void 0&&(P.forEach(function(O){pe.releaseProgram(O)}),x.isShaderMaterial&&pe.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,O,G,k,he){P===null&&(P=Ce);const Ae=k.isMesh&&k.matrixWorld.determinant()<0,_e=Md(x,P,O,G,k);fe.setMaterial(G,Ae);let we=O.index,Fe=1;if(G.wireframe===!0){if(we=Z.getWireframeAttribute(O),we===void 0)return;Fe=2}const Te=O.drawRange,Le=O.attributes.position;let At=Te.start*Fe,Ht=(Te.start+Te.count)*Fe;he!==null&&(At=Math.max(At,he.start*Fe),Ht=Math.min(Ht,(he.start+he.count)*Fe)),we!==null?(At=Math.max(At,0),Ht=Math.min(Ht,we.count)):Le!=null&&(At=Math.max(At,0),Ht=Math.min(Ht,Le.count));const xt=Ht-At;if(xt<0||xt===1/0)return;De.setup(k,G,_e,O,we);let Ai,ct=Se;if(we!==null&&(Ai=ee.get(we),ct=Ee,ct.setIndex(Ai)),k.isMesh)G.wireframe===!0?(fe.setLineWidth(G.wireframeLinewidth*ze()),ct.setMode(F.LINES)):ct.setMode(F.TRIANGLES);else if(k.isLine){let Qe=G.linewidth;Qe===void 0&&(Qe=1),fe.setLineWidth(Qe*ze()),k.isLineSegments?ct.setMode(F.LINES):k.isLineLoop?ct.setMode(F.LINE_LOOP):ct.setMode(F.LINE_STRIP)}else k.isPoints?ct.setMode(F.POINTS):k.isSprite&&ct.setMode(F.TRIANGLES);if(k.isBatchedMesh)ct.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)ct.renderInstances(At,xt,k.count);else if(O.isInstancedBufferGeometry){const Qe=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Gr=Math.min(O.instanceCount,Qe);ct.renderInstances(At,xt,Gr)}else ct.render(At,xt)};function et(x,P,O){x.transparent===!0&&x.side===ci&&x.forceSinglePass===!1?(x.side=Gt,x.needsUpdate=!0,Ss(x,P,O),x.side=Gi,x.needsUpdate=!0,Ss(x,P,O),x.side=ci):Ss(x,P,O)}this.compile=function(x,P,O=null){O===null&&(O=x),A=Ie.get(O),A.init(),y.push(A),O.traverseVisible(function(k){k.isLight&&k.layers.test(P.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),x!==O&&x.traverseVisible(function(k){k.isLight&&k.layers.test(P.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),A.setupLights(v._useLegacyLights);const G=new Set;return x.traverse(function(k){const he=k.material;if(he)if(Array.isArray(he))for(let Ae=0;Ae<he.length;Ae++){const _e=he[Ae];et(_e,O,k),G.add(_e)}else et(he,O,k),G.add(he)}),y.pop(),A=null,G},this.compileAsync=function(x,P,O=null){const G=this.compile(x,P,O);return new Promise(k=>{function he(){if(G.forEach(function(Ae){Pe.get(Ae).currentProgram.isReady()&&G.delete(Ae)}),G.size===0){k(x);return}setTimeout(he,10)}ve.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let tt=null;function It(x){tt&&tt(x)}function Nt(){Pt.stop()}function it(){Pt.start()}const Pt=new xh;Pt.setAnimationLoop(It),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(x){tt=x,ke.setAnimationLoop(x),x===null?Pt.stop():Pt.start()},ke.addEventListener("sessionstart",Nt),ke.addEventListener("sessionend",it),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(P),P=ke.getCamera()),x.isScene===!0&&x.onBeforeRender(v,x,P,M),A=Ie.get(x,y.length),A.init(),y.push(A),me.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),V.setFromProjectionMatrix(me),ce=this.localClippingEnabled,J=Ue.init(this.clippingPlanes,ce),E=de.get(x,f.length),E.init(),f.push(E),oi(x,P,0,v.sortObjects),E.finish(),v.sortObjects===!0&&E.sort(W,Y),this.info.render.frame++,J===!0&&Ue.beginShadows();const O=A.state.shadowsArray;if(j.render(O,x,P),J===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),qe.render(E,x),A.setupLights(v._useLegacyLights),P.isArrayCamera){const G=P.cameras;for(let k=0,he=G.length;k<he;k++){const Ae=G[k];Na(E,x,Ae,Ae.viewport)}}else Na(E,x,P);M!==null&&(C.updateMultisampleRenderTarget(M),C.updateRenderTargetMipmap(M)),x.isScene===!0&&x.onAfterRender(v,x,P),De.resetDefaultState(),D=-1,_=null,y.pop(),y.length>0?A=y[y.length-1]:A=null,f.pop(),f.length>0?E=f[f.length-1]:E=null};function oi(x,P,O,G){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)O=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)A.pushLight(x),x.castShadow&&A.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||V.intersectsSprite(x)){G&&Re.setFromMatrixPosition(x.matrixWorld).applyMatrix4(me);const Ae=te.update(x),_e=x.material;_e.visible&&E.push(x,Ae,_e,O,Re.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||V.intersectsObject(x))){const Ae=te.update(x),_e=x.material;if(G&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Re.copy(x.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Re.copy(Ae.boundingSphere.center)),Re.applyMatrix4(x.matrixWorld).applyMatrix4(me)),Array.isArray(_e)){const we=Ae.groups;for(let Fe=0,Te=we.length;Fe<Te;Fe++){const Le=we[Fe],At=_e[Le.materialIndex];At&&At.visible&&E.push(x,Ae,At,O,Re.z,Le)}}else _e.visible&&E.push(x,Ae,_e,O,Re.z,null)}}const he=x.children;for(let Ae=0,_e=he.length;Ae<_e;Ae++)oi(he[Ae],P,O,G)}function Na(x,P,O,G){const k=x.opaque,he=x.transmissive,Ae=x.transparent;A.setupLightsView(O),J===!0&&Ue.setGlobalState(v.clippingPlanes,O),he.length>0&&Sd(k,he,P,O),G&&fe.viewport(w.copy(G)),k.length>0&&ws(k,P,O),he.length>0&&ws(he,P,O),Ae.length>0&&ws(Ae,P,O),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Sd(x,P,O,G){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;const he=Me.isWebGL2;ge===null&&(ge=new hn(1,1,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")?Si:vt,minFilter:Hi,samples:he?4:0})),v.getDrawingBufferSize(Be),he?ge.setSize(Be.x,Be.y):ge.setSize(br(Be.x),br(Be.y));const Ae=v.getRenderTarget();v.setRenderTarget(ge),v.getClearColor($),R=v.getClearAlpha(),R<1&&v.setClearColor(16777215,.5),v.clear();const _e=v.toneMapping;v.toneMapping=wi,ws(x,O,G),C.updateMultisampleRenderTarget(ge),C.updateRenderTargetMipmap(ge);let we=!1;for(let Fe=0,Te=P.length;Fe<Te;Fe++){const Le=P[Fe],At=Le.object,Ht=Le.geometry,xt=Le.material,Ai=Le.group;if(xt.side===ci&&At.layers.test(G.layers)){const ct=xt.side;xt.side=Gt,xt.needsUpdate=!0,Pa(At,O,G,Ht,xt,Ai),xt.side=ct,xt.needsUpdate=!0,we=!0}}we===!0&&(C.updateMultisampleRenderTarget(ge),C.updateRenderTargetMipmap(ge)),v.setRenderTarget(Ae),v.setClearColor($,R),v.toneMapping=_e}function ws(x,P,O){const G=P.isScene===!0?P.overrideMaterial:null;for(let k=0,he=x.length;k<he;k++){const Ae=x[k],_e=Ae.object,we=Ae.geometry,Fe=G===null?Ae.material:G,Te=Ae.group;_e.layers.test(O.layers)&&Pa(_e,P,O,we,Fe,Te)}}function Pa(x,P,O,G,k,he){x.onBeforeRender(v,P,O,G,k,he),x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),k.onBeforeRender(v,P,O,G,x,he),k.transparent===!0&&k.side===ci&&k.forceSinglePass===!1?(k.side=Gt,k.needsUpdate=!0,v.renderBufferDirect(O,P,G,k,x,he),k.side=Gi,k.needsUpdate=!0,v.renderBufferDirect(O,P,G,k,x,he),k.side=ci):v.renderBufferDirect(O,P,G,k,x,he),x.onAfterRender(v,P,O,G,k,he)}function Ss(x,P,O){P.isScene!==!0&&(P=Ce);const G=Pe.get(x),k=A.state.lights,he=A.state.shadowsArray,Ae=k.state.version,_e=pe.getParameters(x,k.state,he,P,O),we=pe.getProgramCacheKey(_e);let Fe=G.programs;G.environment=x.isMeshStandardMaterial?P.environment:null,G.fog=P.fog,G.envMap=(x.isMeshStandardMaterial?Q:I).get(x.envMap||G.environment),Fe===void 0&&(x.addEventListener("dispose",oe),Fe=new Map,G.programs=Fe);let Te=Fe.get(we);if(Te!==void 0){if(G.currentProgram===Te&&G.lightsStateVersion===Ae)return Fa(x,_e),Te}else _e.uniforms=pe.getUniforms(x),x.onBuild(O,_e,v),x.onBeforeCompile(_e,v),Te=pe.acquireProgram(_e,we),Fe.set(we,Te),G.uniforms=_e.uniforms;const Le=G.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Le.clippingPlanes=Ue.uniform),Fa(x,_e),G.needsLights=Bd(x),G.lightsStateVersion=Ae,G.needsLights&&(Le.ambientLightColor.value=k.state.ambient,Le.lightProbe.value=k.state.probe,Le.directionalLights.value=k.state.directional,Le.directionalLightShadows.value=k.state.directionalShadow,Le.spotLights.value=k.state.spot,Le.spotLightShadows.value=k.state.spotShadow,Le.rectAreaLights.value=k.state.rectArea,Le.ltc_1.value=k.state.rectAreaLTC1,Le.ltc_2.value=k.state.rectAreaLTC2,Le.pointLights.value=k.state.point,Le.pointLightShadows.value=k.state.pointShadow,Le.hemisphereLights.value=k.state.hemi,Le.directionalShadowMap.value=k.state.directionalShadowMap,Le.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Le.spotShadowMap.value=k.state.spotShadowMap,Le.spotLightMatrix.value=k.state.spotLightMatrix,Le.spotLightMap.value=k.state.spotLightMap,Le.pointShadowMap.value=k.state.pointShadowMap,Le.pointShadowMatrix.value=k.state.pointShadowMatrix),G.currentProgram=Te,G.uniformsList=null,Te}function Ua(x){if(x.uniformsList===null){const P=x.currentProgram.getUniforms();x.uniformsList=ur.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function Fa(x,P){const O=Pe.get(x);O.outputColorSpace=P.outputColorSpace,O.batching=P.batching,O.instancing=P.instancing,O.instancingColor=P.instancingColor,O.skinning=P.skinning,O.morphTargets=P.morphTargets,O.morphNormals=P.morphNormals,O.morphColors=P.morphColors,O.morphTargetsCount=P.morphTargetsCount,O.numClippingPlanes=P.numClippingPlanes,O.numIntersection=P.numClipIntersection,O.vertexAlphas=P.vertexAlphas,O.vertexTangents=P.vertexTangents,O.toneMapping=P.toneMapping}function Md(x,P,O,G,k){P.isScene!==!0&&(P=Ce),C.resetTextureUnits();const he=P.fog,Ae=G.isMeshStandardMaterial?P.environment:null,_e=M===null?v.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:ui,we=(G.isMeshStandardMaterial?Q:I).get(G.envMap||Ae),Fe=G.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Te=!!O.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Le=!!O.morphAttributes.position,At=!!O.morphAttributes.normal,Ht=!!O.morphAttributes.color;let xt=wi;G.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(xt=v.toneMapping);const Ai=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ct=Ai!==void 0?Ai.length:0,Qe=Pe.get(G),Gr=A.state.lights;if(J===!0&&(ce===!0||x!==_)){const Yt=x===_&&G.id===D;Ue.setState(G,x,Yt)}let ut=!1;G.version===Qe.__version?(Qe.needsLights&&Qe.lightsStateVersion!==Gr.state.version||Qe.outputColorSpace!==_e||k.isBatchedMesh&&Qe.batching===!1||!k.isBatchedMesh&&Qe.batching===!0||k.isInstancedMesh&&Qe.instancing===!1||!k.isInstancedMesh&&Qe.instancing===!0||k.isSkinnedMesh&&Qe.skinning===!1||!k.isSkinnedMesh&&Qe.skinning===!0||k.isInstancedMesh&&Qe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Qe.instancingColor===!1&&k.instanceColor!==null||Qe.envMap!==we||G.fog===!0&&Qe.fog!==he||Qe.numClippingPlanes!==void 0&&(Qe.numClippingPlanes!==Ue.numPlanes||Qe.numIntersection!==Ue.numIntersection)||Qe.vertexAlphas!==Fe||Qe.vertexTangents!==Te||Qe.morphTargets!==Le||Qe.morphNormals!==At||Qe.morphColors!==Ht||Qe.toneMapping!==xt||Me.isWebGL2===!0&&Qe.morphTargetsCount!==ct)&&(ut=!0):(ut=!0,Qe.__version=G.version);let zi=Qe.currentProgram;ut===!0&&(zi=Ss(G,P,k));let ka=!1,is=!1,Hr=!1;const Tt=zi.getUniforms(),Wi=Qe.uniforms;if(fe.useProgram(zi.program)&&(ka=!0,is=!0,Hr=!0),G.id!==D&&(D=G.id,is=!0),ka||_!==x){Tt.setValue(F,"projectionMatrix",x.projectionMatrix),Tt.setValue(F,"viewMatrix",x.matrixWorldInverse);const Yt=Tt.map.cameraPosition;Yt!==void 0&&Yt.setValue(F,Re.setFromMatrixPosition(x.matrixWorld)),Me.logarithmicDepthBuffer&&Tt.setValue(F,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Tt.setValue(F,"isOrthographic",x.isOrthographicCamera===!0),_!==x&&(_=x,is=!0,Hr=!0)}if(k.isSkinnedMesh){Tt.setOptional(F,k,"bindMatrix"),Tt.setOptional(F,k,"bindMatrixInverse");const Yt=k.skeleton;Yt&&(Me.floatVertexTextures?(Yt.boneTexture===null&&Yt.computeBoneTexture(),Tt.setValue(F,"boneTexture",Yt.boneTexture,C)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}k.isBatchedMesh&&(Tt.setOptional(F,k,"batchingTexture"),Tt.setValue(F,"batchingTexture",k._matricesTexture,C));const Vr=O.morphAttributes;if((Vr.position!==void 0||Vr.normal!==void 0||Vr.color!==void 0&&Me.isWebGL2===!0)&&He.update(k,O,zi),(is||Qe.receiveShadow!==k.receiveShadow)&&(Qe.receiveShadow=k.receiveShadow,Tt.setValue(F,"receiveShadow",k.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Wi.envMap.value=we,Wi.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),is&&(Tt.setValue(F,"toneMappingExposure",v.toneMappingExposure),Qe.needsLights&&Td(Wi,Hr),he&&G.fog===!0&&ae.refreshFogUniforms(Wi,he),ae.refreshMaterialUniforms(Wi,G,q,z,ge),ur.upload(F,Ua(Qe),Wi,C)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ur.upload(F,Ua(Qe),Wi,C),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Tt.setValue(F,"center",k.center),Tt.setValue(F,"modelViewMatrix",k.modelViewMatrix),Tt.setValue(F,"normalMatrix",k.normalMatrix),Tt.setValue(F,"modelMatrix",k.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Yt=G.uniformsGroups;for(let zr=0,Ld=Yt.length;zr<Ld;zr++)if(Me.isWebGL2){const Qa=Yt[zr];Ye.update(Qa,zi),Ye.bind(Qa,zi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return zi}function Td(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function Bd(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(x,P,O){Pe.get(x.texture).__webglTexture=P,Pe.get(x.depthTexture).__webglTexture=O;const G=Pe.get(x);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=O===void 0,G.__autoAllocateDepthBuffer||ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(x,P){const O=Pe.get(x);O.__webglFramebuffer=P,O.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(x,P=0,O=0){M=x,T=P,S=O;let G=!0,k=null,he=!1,Ae=!1;if(x){const we=Pe.get(x);we.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(F.FRAMEBUFFER,null),G=!1):we.__webglFramebuffer===void 0?C.setupRenderTarget(x):we.__hasExternalTextures&&C.rebindTextures(x,Pe.get(x.texture).__webglTexture,Pe.get(x.depthTexture).__webglTexture);const Fe=x.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Ae=!0);const Te=Pe.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Te[P])?k=Te[P][O]:k=Te[P],he=!0):Me.isWebGL2&&x.samples>0&&C.useMultisampledRTT(x)===!1?k=Pe.get(x).__webglMultisampledFramebuffer:Array.isArray(Te)?k=Te[O]:k=Te,w.copy(x.viewport),N.copy(x.scissor),H=x.scissorTest}else w.copy(X).multiplyScalar(q).floor(),N.copy(K).multiplyScalar(q).floor(),H=le;if(fe.bindFramebuffer(F.FRAMEBUFFER,k)&&Me.drawBuffers&&G&&fe.drawBuffers(x,k),fe.viewport(w),fe.scissor(N),fe.setScissorTest(H),he){const we=Pe.get(x.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+P,we.__webglTexture,O)}else if(Ae){const we=Pe.get(x.texture),Fe=P||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,we.__webglTexture,O||0,Fe)}D=-1},this.readRenderTargetPixels=function(x,P,O,G,k,he,Ae){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Pe.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Ae!==void 0&&(_e=_e[Ae]),_e){fe.bindFramebuffer(F.FRAMEBUFFER,_e);try{const we=x.texture,Fe=we.format,Te=we.type;if(Fe!==bt&&ue.convert(Fe)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Te===Si&&(ve.has("EXT_color_buffer_half_float")||Me.isWebGL2&&ve.has("EXT_color_buffer_float"));if(Te!==vt&&ue.convert(Te)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Te===Wt&&(Me.isWebGL2||ve.has("OES_texture_float")||ve.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-G&&O>=0&&O<=x.height-k&&F.readPixels(P,O,G,k,ue.convert(Fe),ue.convert(Te),he)}finally{const we=M!==null?Pe.get(M).__webglFramebuffer:null;fe.bindFramebuffer(F.FRAMEBUFFER,we)}}},this.copyFramebufferToTexture=function(x,P,O=0){const G=Math.pow(2,-O),k=Math.floor(P.image.width*G),he=Math.floor(P.image.height*G);C.setTexture2D(P,0),F.copyTexSubImage2D(F.TEXTURE_2D,O,0,0,x.x,x.y,k,he),fe.unbindTexture()},this.copyTextureToTexture=function(x,P,O,G=0){const k=P.image.width,he=P.image.height,Ae=ue.convert(O.format),_e=ue.convert(O.type);C.setTexture2D(O,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,O.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,O.unpackAlignment),P.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,G,x.x,x.y,k,he,Ae,_e,P.image.data):P.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,G,x.x,x.y,P.mipmaps[0].width,P.mipmaps[0].height,Ae,P.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,G,x.x,x.y,Ae,_e,P.image),G===0&&O.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(x,P,O,G,k=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=x.max.x-x.min.x+1,Ae=x.max.y-x.min.y+1,_e=x.max.z-x.min.z+1,we=ue.convert(G.format),Fe=ue.convert(G.type);let Te;if(G.isData3DTexture)C.setTexture3D(G,0),Te=F.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)C.setTexture2DArray(G,0),Te=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,G.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,G.unpackAlignment);const Le=F.getParameter(F.UNPACK_ROW_LENGTH),At=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ht=F.getParameter(F.UNPACK_SKIP_PIXELS),xt=F.getParameter(F.UNPACK_SKIP_ROWS),Ai=F.getParameter(F.UNPACK_SKIP_IMAGES),ct=O.isCompressedTexture?O.mipmaps[k]:O.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,ct.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ct.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,x.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,x.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,x.min.z),O.isDataTexture||O.isData3DTexture?F.texSubImage3D(Te,k,P.x,P.y,P.z,he,Ae,_e,we,Fe,ct.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(Te,k,P.x,P.y,P.z,he,Ae,_e,we,ct.data)):F.texSubImage3D(Te,k,P.x,P.y,P.z,he,Ae,_e,we,Fe,ct),F.pixelStorei(F.UNPACK_ROW_LENGTH,Le),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,At),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ht),F.pixelStorei(F.UNPACK_SKIP_ROWS,xt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ai),k===0&&G.generateMipmaps&&F.generateMipmap(Te),fe.unbindTexture()},this.initTexture=function(x){x.isCubeTexture?C.setTextureCube(x,0):x.isData3DTexture?C.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?C.setTexture2DArray(x,0):C.setTexture2D(x,0),fe.unbindTexture()},this.resetState=function(){T=0,S=0,M=null,fe.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Nr?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Is?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===st?$t:ch}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===$t?st:ui}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class rE extends Ur{}rE.prototype.isWebGL1Renderer=!0;class Ea extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class oE{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ri()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new L;class wr{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}setX(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$e(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=hi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=hi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=hi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=hi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=$e(t,this.array),i=$e(i,this.array),n=$e(n,this.array),r=$e(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new wr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Lh extends Vi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Mn;const as=new L,Tn=new L,Bn=new L,Ln=new xe,ls=new xe,Rh=new Ve,Js=new L,cs=new L,Ks=new L,hc=new xe,vo=new xe,dc=new xe;class aE extends pt{constructor(e=new Lh){if(super(),this.isSprite=!0,this.type="Sprite",Mn===void 0){Mn=new Qt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new oE(t,5);Mn.setIndex([0,1,2,0,2,3]),Mn.setAttribute("position",new wr(i,3,0,!1)),Mn.setAttribute("uv",new wr(i,2,3,!1))}this.geometry=Mn,this.material=e,this.center=new xe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Tn.setFromMatrixScale(this.matrixWorld),Rh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Bn.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Tn.multiplyScalar(-Bn.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const o=this.center;js(Js.set(-.5,-.5,0),Bn,o,Tn,n,r),js(cs.set(.5,-.5,0),Bn,o,Tn,n,r),js(Ks.set(.5,.5,0),Bn,o,Tn,n,r),hc.set(0,0),vo.set(1,0),dc.set(1,1);let a=e.ray.intersectTriangle(Js,cs,Ks,!1,as);if(a===null&&(js(cs.set(-.5,.5,0),Bn,o,Tn,n,r),vo.set(0,1),a=e.ray.intersectTriangle(Js,Ks,cs,!1,as),a===null))return;const l=e.ray.origin.distanceTo(as);l<e.near||l>e.far||t.push({distance:l,point:as.clone(),uv:Xt.getInterpolation(as,Js,cs,Ks,hc,vo,dc,new xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function js(s,e,t,i,n,r){Ln.subVectors(s,t).addScalar(.5).multiply(i),n!==void 0?(ls.x=r*Ln.x-n*Ln.y,ls.y=n*Ln.x+r*Ln.y):ls.copy(Ln),s.copy(e),s.x+=ls.x,s.y+=ls.y,s.applyMatrix4(Rh)}const uc=new L,fc=new Ze,pc=new Ze,lE=new L,Ac=new Ve,Zs=new L,yo=new Bi,mc=new Ve,_o=new xs;class vy extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Za,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new fi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Zs),this.boundingBox.expandByPoint(Zs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Bi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Zs),this.boundingSphere.expandByPoint(Zs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yo.copy(this.boundingSphere),yo.applyMatrix4(n),e.ray.intersectsSphere(yo)!==!1&&(mc.copy(n).invert(),_o.copy(e.ray).applyMatrix4(mc),!(this.boundingBox!==null&&_o.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,_o)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ze,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Za?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_u?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,n=this.geometry;fc.fromBufferAttribute(n.attributes.skinIndex,e),pc.fromBufferAttribute(n.attributes.skinWeight,e),uc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=pc.getComponent(r);if(o!==0){const a=fc.getComponent(r);Ac.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(lE.copy(uc).applyMatrix4(Ac),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class cE extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Dh extends wt{constructor(e=null,t=1,i=1,n,r,o,a,l,c=St,h=St,d,u){super(null,o,a,l,c,h,n,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const gc=new Ve,hE=new Ve;class Nh{constructor(e=[],t=[]){this.uuid=ri(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new Ve;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:hE;gc.multiplyMatrices(a,t[r]),gc.toArray(i,r*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new Nh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new Dh(t,e,e,bt,Wt);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){const r=e.bones[i];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new cE),this.bones.push(o),this.boneInverses.push(new Ve().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let n=0,r=t.length;n<r;n++){const o=t[n];e.bones.push(o.uuid);const a=i[n];e.boneInverses.push(a.toArray())}return e}}class Ec extends Jt{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Rn=new Ve,vc=new Ve,er=[],yc=new fi,dE=new Ve,hs=new ht,ds=new Bi;class yy extends ht{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ec(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,dE)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Rn),yc.copy(e.boundingBox).applyMatrix4(Rn),this.boundingBox.union(yc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Rn),ds.copy(e.boundingSphere).applyMatrix4(Rn),this.boundingSphere.union(ds)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const i=this.matrixWorld,n=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(i),e.ray.intersectsSphere(ds)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,Rn),vc.multiplyMatrices(i,Rn),hs.matrixWorld=vc,hs.raycast(e,er);for(let o=0,a=er.length;o<a;o++){const l=er[o];l.instanceId=r,l.object=this,t.push(l)}er.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ec(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class va extends Vi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const _c=new L,Ic=new L,xc=new Ve,Io=new xs,tr=new Bi;class ya extends pt{constructor(e=new Qt,t=new va){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)_c.fromBufferAttribute(t,n-1),Ic.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=_c.distanceTo(Ic);e.setAttribute("lineDistance",new Et(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),tr.copy(i.boundingSphere),tr.applyMatrix4(n),tr.radius+=r,e.ray.intersectsSphere(tr)===!1)return;xc.copy(n).invert(),Io.copy(e.ray).applyMatrix4(xc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new L,h=new L,d=new L,u=new L,p=this.isLineSegments?2:1,g=i.index,A=i.attributes.position;if(g!==null){const f=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let v=f,b=y-1;v<b;v+=p){const T=g.getX(v),S=g.getX(v+1);if(c.fromBufferAttribute(A,T),h.fromBufferAttribute(A,S),Io.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(u);D<e.near||D>e.far||t.push({distance:D,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),y=Math.min(A.count,o.start+o.count);for(let v=f,b=y-1;v<b;v+=p){if(c.fromBufferAttribute(A,v),h.fromBufferAttribute(A,v+1),Io.distanceSqToSegment(c,h,u,d)>l)continue;u.applyMatrix4(this.matrixWorld);const S=e.ray.origin.distanceTo(u);S<e.near||S>e.far||t.push({distance:S,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const Cc=new L,bc=new L;class uE extends ya{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)Cc.fromBufferAttribute(t,n),bc.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Cc.distanceTo(bc);e.setAttribute("lineDistance",new Et(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _y extends ya{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class fE extends Vi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const wc=new Ve,ia=new xs,ir=new Bi,nr=new L;class Iy extends pt{constructor(e=new Qt,t=new fE){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ir.copy(i.boundingSphere),ir.applyMatrix4(n),ir.radius+=r,e.ray.intersectsSphere(ir)===!1)return;wc.copy(n).invert(),ia.copy(e.ray).applyMatrix4(wc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=u,E=p;g<E;g++){const A=c.getX(g);nr.fromBufferAttribute(d,A),Sc(nr,A,l,n,e,t,this)}}else{const u=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=u,E=p;g<E;g++)nr.fromBufferAttribute(d,g),Sc(nr,g,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Sc(s,e,t,i,n,r,o){const a=ia.distanceSqToPoint(s);if(a<t){const l=new L;ia.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Fr extends wt{constructor(e,t,i,n,r,o,a,l,c,h,d,u){super(null,o,a,l,c,h,n,r,d,u),this.isCompressedTexture=!0,this.image={width:t,height:i},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class pE extends Fr{constructor(e,t,i,n,r,o){super(e,t,i,r,o),this.isCompressedArrayTexture=!0,this.image.depth=n,this.wrapR=ot}}class AE extends Fr{constructor(e,t,i){super(void 0,e[0].width,e[0].height,t,i,cn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}}class ki extends wt{constructor(e,t,i,n,r,o,a,l,c){super(e,t,i,n,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _a extends Qt{constructor(e=1,t=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new L,h=new xe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const p=i+d/t*n;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Et(o,3)),this.setAttribute("normal",new Et(a,3)),this.setAttribute("uv",new Et(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _a(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ia extends Qt{constructor(e=1,t=1,i=1,n=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const h=[],d=[],u=[],p=[];let g=0;const E=[],A=i/2;let f=0;y(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Et(d,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(p,2));function y(){const b=new L,T=new L;let S=0;const M=(t-e)/i;for(let D=0;D<=r;D++){const _=[],w=D/r,N=w*(t-e)+e;for(let H=0;H<=n;H++){const $=H/n,R=$*l+a,U=Math.sin(R),z=Math.cos(R);T.x=N*U,T.y=-w*i+A,T.z=N*z,d.push(T.x,T.y,T.z),b.set(U,M,z).normalize(),u.push(b.x,b.y,b.z),p.push($,1-w),_.push(g++)}E.push(_)}for(let D=0;D<n;D++)for(let _=0;_<r;_++){const w=E[_][D],N=E[_+1][D],H=E[_+1][D+1],$=E[_][D+1];h.push(w,N,$),h.push(N,H,$),S+=6}c.addGroup(f,S,0),f+=S}function v(b){const T=g,S=new xe,M=new L;let D=0;const _=b===!0?e:t,w=b===!0?1:-1;for(let H=1;H<=n;H++)d.push(0,A*w,0),u.push(0,w,0),p.push(.5,.5),g++;const N=g;for(let H=0;H<=n;H++){const R=H/n*l+a,U=Math.cos(R),z=Math.sin(R);M.x=_*z,M.y=A*w,M.z=_*U,d.push(M.x,M.y,M.z),u.push(0,w,0),S.x=U*.5+.5,S.y=z*.5*w+.5,p.push(S.x,S.y),g++}for(let H=0;H<n;H++){const $=T+H,R=N+H;b===!0?h.push(R,R+1,$):h.push(R+1,R,$),D+=3}c.addGroup(f,D,b===!0?1:2),f+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ia(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jn extends Qt{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new L,u=new L,p=[],g=[],E=[],A=[];for(let f=0;f<=i;f++){const y=[],v=f/i;let b=0;f===0&&o===0?b=.5/t:f===i&&l===Math.PI&&(b=-.5/t);for(let T=0;T<=t;T++){const S=T/t;d.x=-e*Math.cos(n+S*r)*Math.sin(o+v*a),d.y=e*Math.cos(o+v*a),d.z=e*Math.sin(n+S*r)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),E.push(u.x,u.y,u.z),A.push(S+b,1-v),y.push(c++)}h.push(y)}for(let f=0;f<i;f++)for(let y=0;y<t;y++){const v=h[f][y+1],b=h[f][y],T=h[f+1][y],S=h[f+1][y+1];(f!==0||o>0)&&p.push(v,b,S),(f!==i-1||l<Math.PI)&&p.push(b,T,S)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(E,3)),this.setAttribute("uv",new Et(A,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class xa extends Vi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hh,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xy extends xa{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new xe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function sr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function mE(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function gE(s){function e(n,r){return s[n]-s[r]}const t=s.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function Mc(s,e,t){const i=s.length,n=new s.constructor(i);for(let r=0,o=0;o!==i;++r){const a=t[r]*e;for(let l=0;l!==e;++l)n[o++]=s[a+l]}return n}function Ph(s,e,t,i){let n=1,r=s[0];for(;r!==void 0&&r[i]===void 0;)r=s[n++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[n++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[n++];while(r!==void 0);else do o=r[i],o!==void 0&&(e.push(r.time),t.push(o)),r=s[n++];while(r!==void 0)}class kr{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,n=t[i],r=t[i-1];i:{e:{let o;t:{n:if(!(e<n)){for(let a=i+2;;){if(n===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=n,n=t[++i],e<n)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=t[--i-1],e>=r)break e}o=i,i=0;break t}break i}for(;i<o;){const a=i+o>>>1;e<t[a]?o=a:i=a+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let o=0;o!==n;++o)t[o]=i[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class EE extends kr{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yl,endingEnd:yl}}intervalChanged_(e,t,i){const n=this.parameterPositions;let r=e-2,o=e+1,a=n[r],l=n[o];if(a===void 0)switch(this.getSettings_().endingStart){case _l:r=e,a=2*t-i;break;case Il:r=n.length-2,a=t+n[r]-n[r+1];break;default:r=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case _l:o=e,l=2*i-t;break;case Il:o=1,l=i+n[1]-n[0];break;default:o=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,i,n){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,p=this._weightNext,g=(i-t)/(n-t),E=g*g,A=E*g,f=-u*A+2*u*E-u*g,y=(1+u)*A+(-1.5-2*u)*E+(-.5+u)*g+1,v=(-1-p)*A+(1.5+p)*E+.5*g,b=p*A-p*E;for(let T=0;T!==a;++T)r[T]=f*o[h+T]+y*o[c+T]+v*o[l+T]+b*o[d+T];return r}}class vE extends kr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(i-t)/(n-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}}class yE extends kr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}}class pi{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=sr(t,this.TimeBufferType),this.values=sr(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:sr(e.times,Array),values:sr(e.values,Array)};const n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new yE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vE(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new EE(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case vr:t=this.InterpolantFactoryMethodDiscrete;break;case yr:t=this.InterpolantFactoryMethodLinear;break;case Xr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return vr;case this.InterpolantFactoryMethodLinear:return yr;case this.InterpolantFactoryMethodSmooth:return Xr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){const i=this.times,n=i.length;let r=0,o=n-1;for(;r!==n&&i[r]<e;)++r;for(;o!==-1&&i[o]>t;)--o;if(++o,r!==0||o!==n){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,n=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(n!==void 0&&mE(n))for(let a=0,l=n.length;a!==l;++a){const c=n[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Xr,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(n)l=!0;else{const d=a*i,u=d-i,p=d+i;for(let g=0;g!==i;++g){const E=t[d+g];if(E!==t[u+g]||E!==t[p+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*i,u=o*i;for(let p=0;p!==i;++p)t[u+p]=t[d+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}}pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=yr;class Zn extends pi{}Zn.prototype.ValueTypeName="bool";Zn.prototype.ValueBufferType=Array;Zn.prototype.DefaultInterpolation=vr;Zn.prototype.InterpolantFactoryMethodLinear=void 0;Zn.prototype.InterpolantFactoryMethodSmooth=void 0;class Uh extends pi{}Uh.prototype.ValueTypeName="color";class Sr extends pi{}Sr.prototype.ValueTypeName="number";class _E extends kr{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(n-t);let c=e*a;for(let h=c+a;c!==h;c+=4)Ti.slerpFlat(r,0,o,c-a,o,c,l);return r}}class bs extends pi{InterpolantFactoryMethodLinear(e){return new _E(this.times,this.values,this.getValueSize(),e)}}bs.prototype.ValueTypeName="quaternion";bs.prototype.DefaultInterpolation=yr;bs.prototype.InterpolantFactoryMethodSmooth=void 0;class es extends pi{}es.prototype.ValueTypeName="string";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=vr;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;class Mr extends pi{}Mr.prototype.ValueTypeName="vector";class Cy{constructor(e,t=-1,i,n=Tu){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=ri(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,n=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(xE(i[o]).scale(n));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=i.length;r!==o;++r)t.push(pi.toJSON(i[r]));return n}static CreateFromMorphTargetSequence(e,t,i,n){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=gE(l);l=Mc(l,1,h),c=Mc(c,1,h),!n&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Sr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const n={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const d=h[1];let u=n[d];u||(n[d]=u=[]),u.push(c)}}const o=[];for(const a in n)o.push(this.CreateFromMorphTargetSequence(a,n[a],t,i));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const i=function(d,u,p,g,E){if(p.length!==0){const A=[],f=[];Ph(p,A,f,g),A.length!==0&&E.push(new d(u,A,f))}},n=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const p={};let g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let E=0;E<u[g].morphTargets.length;E++)p[u[g].morphTargets[E]]=-1;for(const E in p){const A=[],f=[];for(let y=0;y!==u[g].morphTargets.length;++y){const v=u[g];A.push(v.time),f.push(v.morphTarget===E?1:0)}n.push(new Sr(".morphTargetInfluence["+E+"]",A,f))}l=p.length*o}else{const p=".bones["+t[d].name+"]";i(Mr,p+".position",u,"pos",n),i(bs,p+".quaternion",u,"rot",n),i(Mr,p+".scale",u,"scl",n)}}return n.length===0?null:new this(r,l,n,a)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,n=e.length;i!==n;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function IE(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Sr;case"vector":case"vector2":case"vector3":case"vector4":return Mr;case"color":return Uh;case"quaternion":return bs;case"bool":case"boolean":return Zn;case"string":return es}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function xE(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=IE(s.type);if(s.times===void 0){const t=[],i=[];Ph(s.keys,t,i,"value"),s.times=t,s.values=i}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Qi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class CE{constructor(e,t,i){const n=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){a++,r===!1&&n.onStart!==void 0&&n.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,n.onProgress!==void 0&&n.onProgress(h,o,a),o===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const p=c[d],g=c[d+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const bE=new CE;class ts{constructor(e){this.manager=e!==void 0?e:bE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ts.DEFAULT_MATERIAL_NAME="__DEFAULT";const _i={};class wE extends Error{constructor(e,t){super(e),this.response=t}}class xo extends ts{constructor(e){super(e)}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Qi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(_i[e]!==void 0){_i[e].push({onLoad:t,onProgress:i,onError:n});return}_i[e]=[],_i[e].push({onLoad:t,onProgress:i,onError:n});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=_i[e],d=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),p=u?parseInt(u):0,g=p!==0;let E=0;const A=new ReadableStream({start(f){y();function y(){d.read().then(({done:v,value:b})=>{if(v)f.close();else{E+=b.byteLength;const T=new ProgressEvent("progress",{lengthComputable:g,loaded:E,total:p});for(let S=0,M=h.length;S<M;S++){const D=h[S];D.onProgress&&D.onProgress(T)}f.enqueue(b),y()}})}}});return new Response(A)}else throw new wE(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(u);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{Qi.add(e,c);const h=_i[e];delete _i[e];for(let d=0,u=h.length;d<u;d++){const p=h[d];p.onLoad&&p.onLoad(c)}}).catch(c=>{const h=_i[e];if(h===void 0)throw this.manager.itemError(e),c;delete _i[e];for(let d=0,u=h.length;d<u;d++){const p=h[d];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class SE extends ts{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Qi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Es("img");function l(){h(),Qi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(d){h(),n&&n(d),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class by extends ts{constructor(e){super(e)}load(e,t,i,n){const r=new wt,o=new SE(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class Qr extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Co=new Ve,Tc=new L,Bc=new L;class Ca{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Aa,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new Ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Tc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tc),Bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bc),t.updateMatrixWorld(),Co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Co)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ME extends Ca{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,i=Yn*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(i!==t.fov||n!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=n,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class wy extends Qr{constructor(e,t,i=0,n=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=i,this.angle=n,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new ME}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Lc=new Ve,us=new L,bo=new L;class TE extends Ca{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xe(4,2),this._viewportCount=6,this._viewports=[new Ze(2,1,1,1),new Ze(0,1,1,1),new Ze(3,1,1,1),new Ze(1,1,1,1),new Ze(3,0,1,1),new Ze(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),us.setFromMatrixPosition(e.matrixWorld),i.position.copy(us),bo.copy(i.position),bo.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(bo),i.updateMatrixWorld(),n.makeTranslation(-us.x,-us.y,-us.z),Lc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lc)}}class Sy extends Qr{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new TE}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class BE extends Ca{constructor(){super(new Ch(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fh extends Qr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new BE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class kh extends Qr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class My{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let i=0,n=e.length;i<n;i++)t+=String.fromCharCode(e[i]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Ty extends ts{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Qi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{n&&n(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Qi.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){n&&n(c),Qi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Qi.add(e,l),r.manager.itemStart(e)}}const ba="\\[\\]\\.:\\/",LE=new RegExp("["+ba+"]","g"),wa="[^"+ba+"]",RE="[^"+ba.replace("\\.","")+"]",DE=/((?:WC+[\/:])*)/.source.replace("WC",wa),NE=/(WCOD+)?/.source.replace("WCOD",RE),PE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wa),UE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wa),FE=new RegExp("^"+DE+NE+PE+UE+"$"),kE=["material","materials","bones","map"];class QE{constructor(e,t,i){const n=i||Je.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class Je{constructor(e,t,i){this.path=t,this.parsedPath=i||Je.parseTrackName(t),this.node=Je.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new Je.Composite(e,t,i):new Je(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(LE,"")}static parseTrackName(e){const t=FE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){const r=i.nodeName.substring(n+1);kE.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=i(a.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,n=t.propertyName;let r=t.propertyIndex;if(e||(e=Je.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[n];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Je.Composite=QE;Je.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Je.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Je.prototype.GetterByBindingType=[Je.prototype._getValue_direct,Je.prototype._getValue_array,Je.prototype._getValue_arrayElement,Je.prototype._getValue_toArray];Je.prototype.SetterByBindingTypeAndVersioning=[[Je.prototype._setValue_direct,Je.prototype._setValue_direct_setNeedsUpdate,Je.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_array,Je.prototype._setValue_array_setNeedsUpdate,Je.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_arrayElement,Je.prototype._setValue_arrayElement_setNeedsUpdate,Je.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Je.prototype._setValue_fromArray,Je.prototype._setValue_fromArray_setNeedsUpdate,Je.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class vs{constructor(e,t,i=0,n=1/0){this.ray=new xs(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new pa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return na(e,this,i,t),i.sort(Rc),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)na(e[n],this,i,t);return i.sort(Rc),i}}function Rc(s,e){return s.distance-e.distance}function na(s,e,t,i){if(s.layers.test(e.layers)&&s.raycast(e,t),i===!0){const n=s.children;for(let r=0,o=n.length;r<o;r++)na(n[r],e,t,!0)}}class By{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Mt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class OE extends uE{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],n=new Qt;n.setAttribute("position",new Et(t,3)),n.setAttribute("color",new Et(i,3));const r=new va({vertexColors:!0,toneMapped:!1});super(n,r),this.type="AxesHelper"}setColors(e,t,i){const n=new Ge,r=this.geometry.attributes.color.array;return n.set(e),n.toArray(r,0),n.toArray(r,3),n.set(t),n.toArray(r,6),n.toArray(r,9),n.set(i),n.toArray(r,12),n.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ha);var ii=(s=>(s.THUMB="thumb",s.PANO_LOW="panoLow",s.PANO="pano",s.VIDEO="video",s.COVER="cover",s.MAP="map",s.DOLLHOUSE="dollhouse",s))(ii||{});function ni(s,e){return!s||typeof s!="string"||s.trim()===""?"":s.trim()}function GE(s,e){return new Promise((t,i)=>{const n=ni(s);if(!n){i(new Error(`资源 URL 为空 (${e})`));return}if(e==="video"){const r=document.createElement("video");r.preload="metadata",r.onloadedmetadata=()=>t(),r.onerror=()=>i(new Error(`视频加载失败: ${n}`)),r.src=n}else Vn(async()=>{const{toProxiedImageUrl:r}=await Promise.resolve().then(()=>Hh);return{toProxiedImageUrl:r}},void 0,import.meta.url).then(({toProxiedImageUrl:r})=>{const o=new Image;o.referrerPolicy="no-referrer",o.crossOrigin="anonymous",o.loading="lazy",o.decoding="async",o.onload=()=>t(),o.onerror=()=>i(new Error(`图片加载失败: ${n}`)),o.src=r(n)}).catch(r=>{i(new Error(`导入代理工具失败: ${r}`))})})}const HE=Object.freeze(Object.defineProperty({__proto__:null,AssetType:ii,preloadAsset:GE,resolveAssetUrl:ni},Symbol.toStringTag,{value:"Module"}));function ys(){const s=document;return!!(document.fullscreenElement||s.webkitFullscreenElement)}function VE(){const s=()=>{};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}var We=(s=>(s.LOADING_LOW="loadingLow",s.LOW_READY="lowReady",s.LOADING_HIGH="loadingHigh",s.HIGH_READY="highReady",s.DEGRADED="degraded",s.ERROR="error",s))(We||{});class zE{constructor(){m(this,"element");m(this,"currentStatus","loadingLow");m(this,"autoHideTimer",null);m(this,"maxVisibleTimer",null);m(this,"maxVisibleMs",1e4);m(this,"readyHideMs",2500);m(this,"metricsText","");this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){if(ys()){this.hide();return}if(this.currentStatus=e,this.render(),this.autoHideTimer&&(clearTimeout(this.autoHideTimer),this.autoHideTimer=null),this.maxVisibleTimer&&(clearTimeout(this.maxVisibleTimer),this.maxVisibleTimer=null),e==="loadingLow"||e==="loadingHigh"||e==="error"||e==="degraded"){this.show(),this.maxVisibleTimer=window.setTimeout(()=>{this.hide()},this.maxVisibleMs);return}(e==="highReady"||e==="lowReady")&&(this.show(),this.autoHideTimer=window.setTimeout(()=>{this.hide()},this.readyHideMs))}updateMetrics(e){const t=new URLSearchParams(window.location.search);if(!(t.get("metrics")==="1"||t.get("metrics")==="true"||t.get("tilesDebug")==="1"))return;const n=e.lowReadyMs??-1,r=e.highReadyMs??-1,o=e.tileHitRate??0,a=e.tilesFailed??0,l=e.tilesRetries??0,c=e.perfMode??"",h=e.renderSource??"";this.metricsText=`low:${n}ms high:${r}ms hit:${o}% fail:${a} retry:${l} `+`${c?`perf:${c} `:""}${h?`src:${h}`:""}`.trim(),this.render()}render(){const{text:e,icon:t,className:i}=this.getStatusInfo();this.element.innerHTML=`
      <div class="quality-indicator-content ${i}">
        <span class="quality-icon">${t}</span>
        <span class="quality-text">${e}</span>
        ${this.metricsText?`<span class="quality-metrics">${this.metricsText}</span>`:""}
      </div>
    `}getStatusInfo(){switch(this.currentStatus){case"loadingLow":return{text:"正在加载低清图...",icon:"⏳",className:"status-loading"};case"lowReady":return{text:"低清图已加载",icon:"✨",className:"status-ready"};case"loadingHigh":return{text:"正在加载高清图...",icon:"⏳",className:"status-loading"};case"highReady":return{text:"已切换至高清",icon:"✨",className:"status-ready"};case"degraded":return{text:"网络较慢，已先使用低清",icon:"⚠️",className:"status-degraded"};case"error":return{text:"加载失败",icon:"❌",className:"status-error"};default:return{text:"",icon:"",className:""}}}show(){this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.maxVisibleTimer&&clearTimeout(this.maxVisibleTimer),this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
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
      .quality-metrics {
        margin-left: 6px;
        font-size: 11px;
        opacity: 0.7;
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
    `,document.head.appendChild(e)}}const Qh="vr_quality";function sa(){if(typeof window>"u")return"high";try{const s=window.localStorage.getItem(Qh);if(s==="low"||s==="high")return s}catch{}return"high"}function WE(s){if(!(typeof window>"u"))try{window.localStorage.setItem(Qh,s)}catch{}}function YE(s=512){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");if(!t){const c=new ki(e);return c.needsUpdate=!0,c}const i=s/2,n=s/2,r=s/2*.92;t.clearRect(0,0,s,s);const o=t.createRadialGradient(i,n,r*.25,i,n,r);o.addColorStop(0,"rgba(0,0,0,0.00)"),o.addColorStop(.55,"rgba(0,0,0,0.18)"),o.addColorStop(1,"rgba(0,0,0,0.55)"),t.fillStyle=o,t.beginPath(),t.arc(i,n,r,0,Math.PI*2),t.closePath(),t.fill(),t.fillStyle="rgba(0,0,0,0.55)",t.beginPath(),t.arc(i,n,r*.28,0,Math.PI*2),t.closePath(),t.fill();const a=t.createRadialGradient(i,n,0,i,n,r*.42);a.addColorStop(0,"rgba(0,0,0,0.22)"),a.addColorStop(1,"rgba(0,0,0,0.00)"),t.fillStyle=a,t.beginPath(),t.arc(i,n,r*.42,0,Math.PI*2),t.closePath(),t.fill(),t.save(),t.translate(i,n);for(let c=0;c<360;c+=30){const h=c*Math.PI/180,d=c%90===0,u=d?r*.12:r*.07,p=d?2:1;t.strokeStyle=d?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.14)",t.lineWidth=p,t.beginPath(),t.moveTo(Math.sin(h)*(r-u),-Math.cos(h)*(r-u)),t.lineTo(Math.sin(h)*r,-Math.cos(h)*r),t.stroke()}t.restore(),t.strokeStyle="rgba(255,255,255,0.08)",t.lineWidth=2,t.beginPath(),t.arc(i,n,r,0,Math.PI*2),t.closePath(),t.stroke();const l=new ki(e);return l.colorSpace=st,l.center.set(.5,.5),l.rotation=0,l.flipY=!1,l.needsUpdate=!0,l}const ft=typeof window<"u"?new URLSearchParams(window.location.search).get("debug")==="1":!1;function Xe(...s){ft&&console.debug("[VR Debug]",...s)}function qE(s){return Math.max(0,Math.min(1,s))}function XE(s){const e=qE(s);return e*e*(3-2*e)}class $E{constructor(e,t){m(this,"mesh");m(this,"needleMesh",null);m(this,"texture");m(this,"radius");m(this,"opacity",0);m(this,"northYaw",0);m(this,"debugHelper",null);m(this,"labelSprites",new Map);m(this,"patchRadius",0);m(this,"showPitchDeg",-45);m(this,"fadeRangeDeg",18);m(this,"fadeTauMs",140);m(this,"lastRotationY",0);m(this,"debugFrameCount",0);m(this,"isDebugVisible",!0);this.radius=t;const i=t*.18;this.patchRadius=i;const n=new _a(i,96);n.rotateX(Math.PI/2),this.texture=YE(512);const r=new Mi({map:this.texture,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:ci});this.mesh=new ht(n,r),this.mesh.name="NadirPatch-compass-disk",this.mesh.position.set(0,-t+.5,0),this.mesh.renderOrder=9999,this.mesh.visible=!1,this.mesh.rotation.y=0,e.add(this.mesh);const o=i*.008,a=i*.35,l=new Ia(o,o,a,8);l.rotateX(Math.PI/2),l.translate(0,0,a/2);const c=new Mi({color:16777215,transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1});if(this.needleMesh=new ht(l,c),this.needleMesh.name="NadirPatch-compass-needle",this.needleMesh.position.set(0,-t+.51,0),this.needleMesh.rotation.order="YXZ",this.needleMesh.renderOrder=1e4,this.needleMesh.visible=!1,e.add(this.needleMesh),this.createLabelSprites(e,i,t),ft&&(r.color.setHex(65535),this.debugHelper=new OE(i*.5),this.debugHelper.position.copy(this.mesh.position),this.debugHelper.renderOrder=10001,e.add(this.debugHelper),console.debug("[NadirPatch] 对象已创建:",{uuid:this.mesh.uuid,name:this.mesh.name,type:this.mesh.type,position:this.mesh.position,rotation:this.mesh.rotation})),typeof window<"u"){const h=d=>{(d.key==="N"||d.key==="n")&&!(d.target instanceof HTMLInputElement||d.target instanceof HTMLTextAreaElement)&&(d.preventDefault(),this.isDebugVisible=!this.isDebugVisible,this.mesh.visible=this.isDebugVisible&&this.opacity>.01,this.needleMesh&&(this.needleMesh.visible=this.isDebugVisible&&this.opacity>.01),this.debugHelper&&(this.debugHelper.visible=this.isDebugVisible&&this.opacity>.01),console.debug(`[NadirPatch] 显示状态切换为: ${this.isDebugVisible?"显示":"隐藏"}`))};window.addEventListener("keydown",h)}}setNorthYaw(e){this.northYaw=e}update(e,t,i){var p;const n=t.yaw,r=this.northYaw??0,o=at.degToRad(-r);this.mesh.rotation.y=o,this.texture.rotation=0,this.texture.center.set(.5,.5);const a=-r;this.updateLabelSprites(a),this.needleMesh&&(this.needleMesh.rotation.y=at.degToRad(n)),ft&&(this.debugFrameCount++,this.debugFrameCount%30===0&&(Math.abs(this.mesh.rotation.y-this.lastRotationY)>.001&&console.debug("[NadirPatch] 旋转变化:",{frame:this.debugFrameCount,cameraYaw:n.toFixed(2),northYaw:r.toFixed(2),needleYaw:n.toFixed(2),diskRotationY:this.mesh.rotation.y,needleRotationY:(p=this.needleMesh)==null?void 0:p.rotation.y,diskPosition:this.mesh.position}),this.lastRotationY=this.mesh.rotation.y));const c=XE((this.showPitchDeg-t.pitch)/this.fadeRangeDeg),h=1-Math.exp(-(i||16.7)/this.fadeTauMs);this.opacity=this.opacity+(c-this.opacity)*h;const d=this.mesh.material;d.opacity=this.opacity;const u=this.isDebugVisible&&this.opacity>.01;if(this.mesh.visible=u,this.needleMesh){this.needleMesh.visible=u;const g=this.needleMesh.material;g.opacity=this.opacity*.9}this.labelSprites.forEach(g=>{g.visible=u;const E=g.material;E.opacity=this.opacity*.85}),this.debugHelper&&(this.debugHelper.visible=u)}createLabelSprites(e,t,i){[{text:"北",baseAngle:0},{text:"东",baseAngle:270},{text:"南",baseAngle:180},{text:"西",baseAngle:90}].forEach(({text:r})=>{const o=document.createElement("canvas"),a=128;o.width=a,o.height=a;const l=o.getContext("2d");if(!l)return;l.clearRect(0,0,a,a),l.save(),l.shadowColor="rgba(255, 255, 255, 0.8)",l.shadowBlur=8,l.shadowOffsetX=0,l.shadowOffsetY=0,l.fillStyle="rgba(255, 255, 255, 0.85)",l.font=`600 ${Math.round(a*.5)}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`,l.textAlign="center",l.textBaseline="middle",l.fillText(r,a/2,a/2),l.restore();const c=new ki(o);c.colorSpace=st,c.needsUpdate=!0;const h=new Lh({map:c,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1}),d=new aE(h);d.name=`NadirPatch-label-${r}`,d.position.set(0,-i+.52,0),d.renderOrder=10001,d.visible=!1;const u=t*.15;d.scale.set(u,u,1),e.add(d),this.labelSprites.set(r,d)})}updateLabelSprites(e){[{text:"北",baseAngle:0},{text:"东",baseAngle:270},{text:"南",baseAngle:180},{text:"西",baseAngle:90}].forEach(({text:i,baseAngle:n})=>{const r=this.labelSprites.get(i);if(!r)return;const o=n+e,a=this.patchRadius*.56,l=at.degToRad(o),c=-this.radius+.5,h=Math.sin(l)*a,d=Math.cos(l)*a;r.position.set(h,c+.02,d);const u=new L(0,0,0);r.lookAt(u)})}dispose(e){e.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.texture.dispose(),this.needleMesh&&(e.remove(this.needleMesh),this.needleMesh.geometry.dispose(),this.needleMesh.material.dispose()),this.labelSprites.forEach(t=>{e.remove(t),t.material.dispose(),t.material.map&&t.material.map.dispose()}),this.labelSprites.clear(),this.debugHelper&&(e.remove(this.debugHelper),this.debugHelper.dispose())}}function JE(s,e,t){const i=(s-t.left)/t.width*2-1,n=-((e-t.top)/t.height*2-1);return{x:i,y:n}}function KE(s,e,t,i=500){const n=new vs;n.setFromCamera(new xe(s,e),t);const r=n.ray.direction;if(!r||r.length()===0)return null;const o=r.normalize(),a=Math.asin(Math.max(-1,Math.min(1,o.y))),l=at.radToDeg(a),c=Math.atan2(o.x,o.z);return{yaw:at.radToDeg(c),pitch:l}}const ra=-55,jE=-90;function Sa(s){const e=Math.max(0,Math.min(1,(s-ra)/(jE-ra))),t=e,i=-e*8,n=1-e*.7,r=e*2;return{opacity:t,translateY:i,scaleY:n,blur:r,clarity:e}}function Ma(s){return s<=ra}class ZE{constructor(){m(this,"listeners",new Map);m(this,"lastInteractionTs",0);m(this,"idleDelay",800);m(this,"idleTimer",null);m(this,"rafId",null);m(this,"isScheduled",!1);this.listeners.set("user-interacting",new Set),this.listeners.set("user-idle",new Set),this.listeners.set("ui-engaged",new Set)}on(e,t){const i=this.listeners.get(e);return i?(i.add(t),()=>{i.delete(t)}):(console.warn(`[InteractionBus] 未知事件类型: ${e}`),()=>{})}off(e,t){const i=this.listeners.get(e);i&&i.delete(t)}emit(e){this.isScheduled||(this.isScheduled=!0,this.rafId=requestAnimationFrame(()=>{this.isScheduled=!1;const t=this.listeners.get(e);t&&t.forEach(i=>{try{i()}catch(n){console.error("[InteractionBus] 事件监听器执行失败:",n)}})}))}emitInteracting(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("user-interacting")}scheduleIdle(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.idleTimer=window.setTimeout(()=>{Date.now()-this.lastInteractionTs>=this.idleDelay&&(this.idleTimer=null,this.emit("user-idle"))},this.idleDelay)}emitUIEngaged(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("ui-engaged")}dispose(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.listeners.forEach(e=>e.clear()),this.listeners.clear()}}const rt=new ZE;class ev{constructor(e={}){m(this,"root");m(this,"disk");m(this,"mask");m(this,"polemask");m(this,"northLabel");m(this,"eastLabel");m(this,"southLabel");m(this,"westLabel");m(this,"needle");m(this,"currentYaw",0);m(this,"currentPitch",0);m(this,"northYaw",0);m(this,"sceneId","");m(this,"northYawLabel",null);m(this,"isVisible",!1);m(this,"unsubscribeInteracting",null);m(this,"unsubscribeIdle",null);m(this,"unsubscribeUIEngaged",null);m(this,"baseOpacity",0);this.root=document.createElement("div"),this.root.className="vr-compass",this.root.setAttribute("data-ui","CompassDisk"),this.root.style.outline="2px solid #ff00ff",this.disk=document.createElement("div"),this.disk.className="vr-compass__disk",this.disk.setAttribute("data-ui","CompassDisk-disk"),this.mask=document.createElement("div"),this.mask.className="vr-compass__mask",this.polemask=document.createElement("div"),this.polemask.className="vr-compass__polemask",this.polemask.setAttribute("aria-hidden","true"),this.northLabel=document.createElement("div"),this.northLabel.className="vr-compass__label vr-compass__label--north",this.northLabel.textContent="北",this.eastLabel=document.createElement("div"),this.eastLabel.className="vr-compass__label vr-compass__label--east",this.eastLabel.textContent="东",this.southLabel=document.createElement("div"),this.southLabel.className="vr-compass__label vr-compass__label--south",this.southLabel.textContent="南",this.westLabel=document.createElement("div"),this.westLabel.className="vr-compass__label vr-compass__label--west",this.westLabel.textContent="西",this.needle=document.createElement("div"),this.needle.className="vr-compass__needle",this.needle.setAttribute("data-ui","CompassDisk-needle"),this.northYawLabel=document.createElement("div"),this.northYawLabel.className="vr-compass__north-yaw-label",this.northYawLabel.style.cssText=`
      position: absolute;
      bottom: -20px;
      right: 10px;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.6);
      font-family: monospace;
      pointer-events: none;
      display: none;
    `,this.disk.appendChild(this.mask),this.disk.appendChild(this.polemask),this.disk.appendChild(this.northLabel),this.disk.appendChild(this.eastLabel),this.disk.appendChild(this.southLabel),this.disk.appendChild(this.westLabel),this.disk.appendChild(this.needle),this.root.appendChild(this.disk),this.root.appendChild(this.northYawLabel),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.root.style.setProperty("--compass-disk-rot","0deg"),this.root.style.setProperty("--compass-needle-rot","0deg"),this.root.style.setProperty("--compass-label-counter-rot","0deg"),this.setupInteractionListeners()}setupInteractionListeners(){this.unsubscribeInteracting=rt.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=rt.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=rt.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}mount(e){e.appendChild(this.root)}setSceneId(e){this.sceneId=e,this.updateNorthYawLabel()}setNorthYaw(e){this.northYaw=e,this.updateNorthYawLabel()}updateNorthYawLabel(){this.northYawLabel&&(this.sceneId==="gate"&&typeof this.northYaw=="number"?(this.northYawLabel.textContent=`N=${this.northYaw.toFixed(1)}`,this.northYawLabel.style.display="block"):this.northYawLabel.style.display="none")}updateYawLabel(e){this.northYawLabel&&(this.sceneId==="gate"&&typeof this.northYaw=="number"?(this.northYawLabel.textContent=`N=${this.northYaw.toFixed(1)} Yaw=${e.toFixed(1)}`,this.northYawLabel.style.display="block"):this.northYawLabel.style.display="none")}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,Ma(t)){const n=Sa(t);this.baseOpacity=n.opacity,this.root.style.setProperty("--vr-ground-clarity",String(n.clarity)),this.root.style.opacity=n.opacity.toString();const r=`translateX(-50%) translateY(${n.translateY}px) scaleY(${n.scaleY})`;this.root.classList.contains("vr-ui-interacting")?this.root.style.transform=r:this.root.style.transform=r,this.root.style.setProperty("--vr-ground-base-blur",`${n.blur}px`);const o=e,l=-(this.northYaw??0),c=o;this.root.style.setProperty("--compass-disk-rot",`${l}deg`),this.root.style.setProperty("--compass-needle-rot",`${c}deg`);const h=42,d=(u,p)=>{const g=p+l,E=g+180;u.style.transform=`rotate(${g}deg) translateY(-${h}%) rotate(${E}deg)`};d(this.northLabel,0),d(this.eastLabel,270),d(this.southLabel,180),d(this.westLabel,90),this.updateYawLabel(e),this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.northLabel.style.transform="",this.eastLabel.style.transform="",this.southLabel.style.transform="",this.westLabel.style.transform="",this.isVisible=!1,this.baseOpacity=0)}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}const Dc=60,wo=14,tv=4,Nc=650,iv=120,Pc=900,rr=-62,nv=150;class sv{constructor(e){m(this,"root");m(this,"container");m(this,"dots",new Map);m(this,"dotYawDeg",new Map);m(this,"currentYaw",0);m(this,"currentPitch",0);m(this,"isVisible",!1);m(this,"museumId");m(this,"currentSceneId");m(this,"sceneHotspots");m(this,"hoverSceneId",null);m(this,"onNavigateToScene");m(this,"unsubscribeFocus");m(this,"lastYawDeg",0);m(this,"lastPitchDeg",0);m(this,"aimedSceneId",null);m(this,"isInteracting",!1);m(this,"unsubscribeInteracting");m(this,"unsubscribeIdle");m(this,"unsubscribeUIEngaged");m(this,"idleRecoveryTimer",null);m(this,"lastAimChangeTs",0);m(this,"autoNavTimer",null);m(this,"autoNavTargetSceneId",null);m(this,"lastAutoNavTs",0);m(this,"aimDebounceTimer",null);this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.sceneHotspots=e.sceneHotspots,this.onNavigateToScene=e.onNavigateToScene||ti,this.root=document.createElement("div"),this.root.className="vr-groundnav",this.root.setAttribute("data-ui","GroundNavDots"),this.root.style.outline="2px solid #00ffff",this.container=document.createElement("div"),this.container.className="vr-groundnav__container",this.root.appendChild(this.container),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.unsubscribeFocus=Rr(t=>{this.handleSceneFocus(t)}),this.setupInteractionListeners(),this.renderDots()}setupInteractionListeners(){this.unsubscribeInteracting=rt.on("user-interacting",()=>{Xe("统一终止触发点: 用户交互"),this.isInteracting=!0,this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav()}),this.unsubscribeIdle=rt.on("user-idle",()=>{this.idleRecoveryTimer!==null&&(clearTimeout(this.idleRecoveryTimer),this.idleRecoveryTimer=null),this.idleRecoveryTimer=window.setTimeout(()=>{if(this.idleRecoveryTimer=null,!this.root.parentNode){Xe("idleRecoveryTimer: component disposed, skipping");return}this.isInteracting=!1},400)}),this.unsubscribeUIEngaged=rt.on("ui-engaged",()=>{Xe("统一终止触发点: UI 点击"),this.clearAllTimers(),this.isInteracting=!1,this.clearAimed(),this.cancelAutoNav()})}clearAimDebounce(){this.aimDebounceTimer!==null&&(window.clearTimeout(this.aimDebounceTimer),this.aimDebounceTimer=null)}clearAllTimers(){this.clearAimDebounce(),this.idleRecoveryTimer!==null&&(clearTimeout(this.idleRecoveryTimer),this.idleRecoveryTimer=null),this.autoNavTimer!==null&&(clearTimeout(this.autoNavTimer),this.autoNavTimer=null)}normalizeDeg(e){return(e%360+360)%360}shortestDeltaDeg(e,t){return(this.normalizeDeg(e)-this.normalizeDeg(t)+180)%360-180}clearAimed(){if(this.aimedSceneId!==null){const e=this.dots.get(this.aimedSceneId);e&&(e.classList.remove("is-aimed","is-autonav","is-autonav-progress"),this.removeProgress(this.aimedSceneId)),this.aimedSceneId=null,this.clearAimDebounce(),this.emitSceneAim("clear",null)}this.cancelAutoNav()}cancelAutoNav(){if(this.autoNavTimer!=null&&(window.clearTimeout(this.autoNavTimer),this.autoNavTimer=null),this.autoNavTargetSceneId!==null){const e=this.autoNavTargetSceneId;if(e){this.removeProgress(e);const t=this.dots.get(e);t&&t.classList.remove("is-autonav","is-autonav-progress"),this.emitSceneAutoNav("cancel",e)}this.autoNavTargetSceneId=null}}removeProgress(e){const t=this.dots.get(e);if(!t)return;const i=t.querySelector(".vr-groundnav__progress");i&&t.removeChild(i)}addProgress(e){const t=this.dots.get(e);if(!t)return;this.removeProgress(e);const i=document.createElement("div");i.className="vr-groundnav__progress",i.style.setProperty("--progress-duration",`${Nc}ms`),t.appendChild(i),t.classList.add("is-autonav-progress")}scheduleAutoNavIfAllowed(e){if(!e){Xe("scheduleAutoNavIfAllowed: sceneId is missing, skipping");return}const t=Date.now();if(this.isInteracting){Xe("scheduleAutoNavIfAllowed: isInteracting, skipping");return}if(this.lastPitchDeg>rr){Xe("scheduleAutoNavIfAllowed: pitch too high, skipping",this.lastPitchDeg);return}if(t-this.lastAutoNavTs<Pc){Xe("scheduleAutoNavIfAllowed: cooldown, skipping");return}if(t-this.lastAimChangeTs<iv){Xe("scheduleAutoNavIfAllowed: min dwell, skipping");return}if(this.currentSceneId&&e===this.currentSceneId){Xe("scheduleAutoNavIfAllowed: same as current scene, skipping");return}this.autoNavTargetSceneId!==null&&this.autoNavTargetSceneId!==e&&this.cancelAutoNav(),Xe("scene-autonav: start",{sceneId:e}),this.autoNavTargetSceneId=e;const i=this.dots.get(e);i&&(i.classList.add("is-autonav"),this.addProgress(e)),this.emitSceneAutoNav("start",e),this.autoNavTimer=window.setTimeout(()=>{if(this.autoNavTimer=null,!this.root.parentNode){Xe("autoNavTimer: component disposed, skipping");return}if(!e){Xe("autoNavTimer: sceneId is missing, skipping");return}this.tryAutoNavigate(e)},Nc)}tryAutoNavigate(e){if(!e){Xe("tryAutoNavigate: sceneId is missing, skipping"),this.cancelAutoNav();return}if(this.isInteracting){Xe("tryAutoNavigate: isInteracting, canceling"),this.cancelAutoNav(),this.clearAimed();return}if(!this.aimedSceneId||this.aimedSceneId!==e){Xe("tryAutoNavigate: aimedSceneId mismatch, canceling",{aimedSceneId:this.aimedSceneId,sceneId:e}),this.cancelAutoNav(),this.clearAimed();return}if(this.lastPitchDeg>rr){Xe("tryAutoNavigate: pitch too high, canceling",this.lastPitchDeg),this.cancelAutoNav(),this.clearAimed();return}const t=Date.now();if(t-this.lastAutoNavTs<Pc){Xe("tryAutoNavigate: cooldown, canceling"),this.cancelAutoNav(),this.clearAimed();return}if(!this.museumId){Xe("tryAutoNavigate: museumId is missing, canceling"),this.cancelAutoNav(),this.clearAimed();return}Xe("scene-autonav: trigger",{museumId:this.museumId,sceneId:e});const i=e;this.cancelAutoNav(),this.clearAimed(),this.lastAutoNavTs=t,window.dispatchEvent(new CustomEvent("vr:close-panels")),si({type:"focus",museumId:this.museumId,sceneId:i,source:"pano-auto",ts:t}),this.onNavigateToScene(this.museumId,i)}maybeRescheduleOrCancelByPitch(e){e>rr?(this.autoNavTargetSceneId&&this.cancelAutoNav(),this.aimedSceneId&&this.clearAimed()):this.aimedSceneId&&e<=rr&&!this.isInteracting&&!this.autoNavTimer&&this.aimedSceneId!==this.autoNavTargetSceneId&&this.scheduleAutoNavIfAllowed(this.aimedSceneId)}emitSceneAim(e,t){if(!this.museumId){Xe("emitSceneAim: museumId is missing, skipping");return}Xe("scene-aim",{type:e,museumId:this.museumId,sceneId:t}),window.dispatchEvent(new CustomEvent("vr:scene-aim",{detail:{type:e,museumId:this.museumId,sceneId:t||void 0,source:"groundnav",ts:Date.now()}}))}emitSceneAutoNav(e,t){if(!this.museumId){Xe("emitSceneAutoNav: museumId is missing, skipping");return}Xe("scene-autonav",{type:e,museumId:this.museumId,sceneId:t}),window.dispatchEvent(new CustomEvent("vr:scene-autonav",{detail:{type:e,museumId:this.museumId,sceneId:t??void 0,ts:Date.now()}}))}updateAimed(e){if(this.isInteracting||!this.isVisible){this.clearAimed();return}const t=this.sceneHotspots.filter(o=>{var a;return(a=o.target)==null?void 0:a.sceneId});if(t.length===0){this.clearAimed();return}let i=null,n=1/0;t.forEach(o=>{const a=o.target.sceneId;if(a===this.currentSceneId)return;const l=o.yaw,c=Math.abs(this.shortestDeltaDeg(e,l));c<n&&(n=c,i=a)});let r=!1;if(i!==null&&(this.aimedSceneId===null?r=n<=wo:i===this.aimedSceneId?r=n<=wo+tv:r=n<=wo),this.isInteracting){this.clearAimed();return}if(r&&i!==null)if(this.aimedSceneId!==i){if(this.lastAimChangeTs=Date.now(),this.cancelAutoNav(),this.aimedSceneId!==null){const a=this.dots.get(this.aimedSceneId);a&&(a.classList.remove("is-aimed","is-autonav","is-autonav-progress"),this.removeProgress(this.aimedSceneId))}this.aimedSceneId=i;const o=this.dots.get(i);o&&o.classList.add("is-aimed"),this.clearAimDebounce(),this.aimDebounceTimer=window.setTimeout(()=>{if(this.aimDebounceTimer=null,!this.root.parentNode){Xe("aimDebounceTimer: component disposed, skipping");return}this.aimedSceneId===i&&!this.isInteracting&&this.isVisible?(this.emitSceneAim("aim",i),this.scheduleAutoNavIfAllowed(i)):this.aimedSceneId===i&&this.clearAimed()},nv)}else!this.autoNavTimer&&this.aimedSceneId!==this.autoNavTargetSceneId&&this.scheduleAutoNavIfAllowed(i);else this.clearAimed()}handleSceneFocus(e){e.type==="hover"?this.hoverSceneId=e.sceneId:e.type==="focus"&&(Xe("统一终止触发点: 场景切换",{sceneId:e.sceneId}),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),e.sceneId&&(this.currentSceneId=e.sceneId),this.hoverSceneId=null),this.updateDotStates()}updateDotStates(){this.dots.forEach((e,t)=>{e.classList.remove("is-current","is-hover"),t===this.currentSceneId?e.classList.add("is-current"):t===this.hoverSceneId&&e.classList.add("is-hover")})}renderDots(){this.container.innerHTML="",this.dots.clear(),this.dotYawDeg.clear(),this.aimedSceneId=null,this.sceneHotspots.filter(t=>{var i;return(i=t.target)==null?void 0:i.sceneId}).forEach(t=>{const i=t.target.sceneId,n=document.createElement("div");n.className="vr-groundnav__dot",n.setAttribute("data-scene-id",i),n.setAttribute("title",t.label),this.dotYawDeg.set(i,t.yaw),n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),rt.emitUIEngaged(),si({type:"focus",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()}),window.dispatchEvent(new CustomEvent("vr:close-panels")),t.target.museumId&&t.target.sceneId?this.onNavigateToScene(t.target.museumId,t.target.sceneId):Xe("dot click: museumId or sceneId is missing, skipping navigation")}),n.addEventListener("mouseenter",()=>{si({type:"hover",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()})}),n.addEventListener("mouseleave",()=>{si({type:"hover",museumId:t.target.museumId,sceneId:null,source:"pano",ts:Date.now()})}),this.container.appendChild(n),this.dots.set(t.target.sceneId,n)}),this.updateDotStates(),this.updateDotPositions()}updateDotPositions(){this.sceneHotspots.filter(t=>{var i;return(i=t.target)==null?void 0:i.sceneId}).forEach(t=>{const i=this.dots.get(t.target.sceneId);if(!i)return;const n=t.yaw*Math.PI/180,r=Math.sin(n)*Dc,o=-Math.cos(n)*Dc;i.style.transform=`translate(${r}px, ${o}px)`})}setYawPitch(e,t){this.currentYaw=e,this.currentPitch=t;const i=Math.abs(this.lastYawDeg-e)>.1;if(this.lastYawDeg=e,this.lastPitchDeg=t,Ma(t)){const r=Sa(t),o=String(r.clarity);this.root.style.getPropertyValue("--vr-ground-clarity")!==o&&this.root.style.setProperty("--vr-ground-clarity",o);const a=r.opacity.toString();this.root.style.opacity!==a&&(this.root.style.opacity=a);const l=`translateX(-50%) translateY(${r.translateY}px) scaleY(${r.scaleY})`;this.root.style.transform!==l&&(this.root.style.transform=l);const c=`${r.blur}px`;this.root.style.getPropertyValue("--vr-ground-base-blur")!==c&&this.root.style.setProperty("--vr-ground-base-blur",c),this.isVisible||(this.isVisible=!0),!this.isInteracting&&i&&(this.updateAimed(e),this.maybeRescheduleOrCancelByPitch(t))}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1,this.clearAimed());i&&this.updateDotPositions()}updateScene(e,t,i){if(Xe("统一终止触发点: 博物馆/场景切换",{museumId:e,currentSceneId:t}),this.clearAllTimers(),this.clearAimed(),this.cancelAutoNav(),!e){Xe("updateScene: museumId is missing");return}this.museumId=e,this.currentSceneId=t,this.sceneHotspots=i,this.hoverSceneId=null,this.renderDots()}mount(e){e.appendChild(this.root)}dispose(){this.clearAllTimers(),this.cancelAutoNav(),this.clearAimed(),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=void 0),this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class rv{constructor(e,t={}){m(this,"root");m(this,"inner");m(this,"wedge");m(this,"northTick");m(this,"needle");m(this,"currentYaw",0);m(this,"currentPitch",0);m(this,"northYaw",0);m(this,"isVisible",!1);m(this,"unsubscribeInteracting");m(this,"unsubscribeIdle");m(this,"unsubscribeUIEngaged");this.root=document.createElement("div"),this.root.className="vr-groundheading",this.root.setAttribute("data-ui","GroundHeadingMarker"),this.root.style.outline="2px solid #00ffff",this.inner=document.createElement("div"),this.inner.className="vr-groundheading__inner",this.wedge=document.createElement("div"),this.wedge.className="vr-groundheading__wedge",this.northTick=document.createElement("div"),this.northTick.className="vr-groundheading__northTick",this.needle=document.createElement("div"),this.needle.className="vr-groundheading__needle",this.inner.appendChild(this.wedge),this.inner.appendChild(this.northTick),this.inner.appendChild(this.needle),this.root.appendChild(this.inner),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.root.style.setProperty("--groundheading-disk-rot","0deg"),this.root.style.setProperty("--groundheading-needle-rot","0deg"),e.appendChild(this.root),this.setupInteractionListeners()}setNorthYaw(e){this.northYaw=e}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,Ma(t)){const n=Sa(t);this.root.style.setProperty("--vr-ground-clarity",String(n.clarity)),this.root.style.opacity=n.opacity.toString(),this.root.style.transform=`translateX(-50%) translateY(${n.translateY}px) scaleY(${n.scaleY})`,this.root.style.setProperty("--vr-ground-base-blur",`${n.blur}px`);const r=e,a=-(this.northYaw??0),l=r;this.root.style.setProperty("--groundheading-disk-rot",`${a}deg`),this.root.style.setProperty("--groundheading-needle-rot",`${l}deg`),this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1)}setInteracting(e){e?this.root.classList.add("vr-ui-interacting"):this.root.classList.remove("vr-ui-interacting")}setupInteractionListeners(){this.unsubscribeInteracting=rt.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=rt.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=rt.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}function Xn(s){try{const t=new URL(s).hostname;if(t==="i.ibb.co"||t==="s41.ax1x.com")return`/_img?u=${encodeURIComponent(s)}`}catch{}return s}class bi extends Error{constructor(e,t,i){super(t),this.url=e,this.originalError=i,this.name="ExternalImageLoadError"}}let So=0;const Mo=[];function Oh(s){return new Promise((e,t)=>{const i=async()=>{So++;try{const n=await s();e(n)}catch(n){t(n)}finally{So--,Mo.length>0&&Mo.shift()()}};So<2?i():Mo.push(i)})}async function ov(s,e,t,i,n){let r=null;for(let o=0;o<=t;o++){const a=new AbortController,l=setTimeout(()=>a.abort(),e);try{const c={mode:"cors",referrerPolicy:"no-referrer",signal:a.signal};n&&(c.priority=n);const h=await fetch(s,c);if(clearTimeout(l),!h.ok)throw new Error(`HTTP ${h.status}: ${h.statusText}`);const d=await h.blob();return await createImageBitmap(d)}catch(c){if(clearTimeout(l),r=c instanceof Error?c:new Error(String(c)),o<t){const h=i*Math.pow(2,o);console.warn(`外链图片 fetch 重试 ${o+1}/${t+1}: ${s}`,r.message),await new Promise(d=>setTimeout(d,h))}}}throw new bi(s,`fetch 加载失败（${t+1} 次尝试）: ${(r==null?void 0:r.message)||"未知错误"}`,r||void 0)}async function Gh(s,e={}){const{timeoutMs:t=15e3,retries:i=2,retryBaseDelayMs:n=300,referrerPolicy:r="no-referrer",crossOrigin:o="anonymous",priority:a}=e,l=Xn(s);return Oh(async()=>new Promise((c,h)=>{let d=null,u=0,p=null,g=null;const E=()=>{u++;const A=new Image;g=A,A.decoding="async",A.referrerPolicy=r,A.crossOrigin=o,a&&(A.fetchPriority=a),d!==null&&(clearTimeout(d),d=null),d=window.setTimeout(()=>{if(d=null,p=new Error("加载超时"),g&&(g.onload=null,g.onerror=null,g=null),u<=i){const f=n*Math.pow(2,u-1);console.warn(`外链图片加载超时重试 ${u}/${i+1}: ${l}`),setTimeout(E,f)}else h(new bi(s,`加载超时（${i+1} 次尝试）`,p))},t),A.onload=()=>{d!==null&&(clearTimeout(d),d=null),A.complete&&A.naturalWidth>0?c(A):setTimeout(()=>c(A),0)},A.onerror=f=>{if(d!==null&&(clearTimeout(d),d=null),p=new Error("图片加载失败"),g===A&&(g.onload=null,g.onerror=null,g=null),u<=i){const y=n*Math.pow(2,u-1);console.warn(`外链图片加载失败重试 ${u}/${i+1}: ${l}`,f),setTimeout(E,y)}else h(new bi(s,`图片加载失败（${i+1} 次尝试）`,p))},A.src=l};E()}))}async function sn(s,e={}){const{timeoutMs:t=15e3,retries:i=2,retryBaseDelayMs:n=300,allowFetchFallback:r=!1}=e,o=Xn(s);return Oh(async()=>{try{const a=await Gh(o,e);return await createImageBitmap(a,{imageOrientation:"from-image",premultiplyAlpha:"none"})}catch(a){if(r){console.warn(`Image() 加载失败，尝试 fetch 兜底: ${o}`,a);try{return await ov(o,t,i,n,e.priority)}catch{throw a instanceof bi?a:new bi(s,`Image() 和 fetch 均失败: ${a instanceof Error?a.message:String(a)}`,a instanceof Error?a:void 0)}}else throw a instanceof bi?a:new bi(s,`Image() 加载失败: ${a instanceof Error?a.message:String(a)}`,a instanceof Error?a:void 0)}})}const Hh=Object.freeze(Object.defineProperty({__proto__:null,ExternalImageLoadError:bi,loadExternalImageBitmap:sn,loadExternalImageElement:Gh,toProxiedImageUrl:Xn},Symbol.toStringTag,{value:"Module"})),ai=class ai{constructor(){m(this,"element",null);m(this,"textEl",null);m(this,"hideTimer",null)}ensure(){this.element||(this.element=document.createElement("div"),this.element.className="vr-zoom-hud",this.textEl=document.createElement("div"),this.textEl.className="vr-zoom-hud__text",this.textEl.textContent="缩放 100%",this.element.appendChild(this.textEl),document.body.appendChild(this.element))}show(e){this.ensure(),!(!this.element||!this.textEl)&&(this.hideTimer!==null&&(window.clearTimeout(this.hideTimer),this.hideTimer=null),this.textEl.textContent=`缩放 ${e}%`,this.element.classList.add("is-on"),this.hideTimer=window.setTimeout(()=>{this.hide()},600))}hide(){this.hideTimer!==null&&(window.clearTimeout(this.hideTimer),this.hideTimer=null),this.element&&this.element.classList.remove("is-on")}static ensure(){return ai.instance||(ai.instance=new ai),ai.instance}static show(e){ai.ensure().show(e)}static hide(){ai.instance&&ai.instance.hide()}};m(ai,"instance",null);let oa=ai,rn=null;function je(s,e=1500){if(ys())return;const t=document.querySelector(".vr-toast"),i=t??document.createElement("div");i.className="vr-toast",i.textContent=s,t||document.body.appendChild(i),window.requestAnimationFrame(()=>i.classList.add("show")),rn&&window.clearTimeout(rn),rn=window.setTimeout(()=>{i.classList.remove("show"),window.setTimeout(()=>i.remove(),220),rn=null},e)}function av(){const s=document.querySelector(".vr-toast");s&&(s.classList.remove("show"),window.setTimeout(()=>s.remove(),220)),rn&&(window.clearTimeout(rn),rn=null)}let Dn=null,lv=0;const On=new Map;function cv(){return typeof Worker>"u"?null:Dn||(Dn=new Worker(new URL(""+new URL("bitmapDecode.worker-BpZrxr-L.js",import.meta.url).href,import.meta.url),{type:"module"}),Dn.onmessage=s=>{const{id:e,bitmap:t,error:i}=s.data||{},n=On.get(e);n&&(On.delete(e),n.timer&&window.clearTimeout(n.timer),i?n.reject(new Error(i)):t?n.resolve(t):n.reject(new Error("worker 返回空结果")))},Dn.onerror=()=>{On.forEach(s=>s.reject(new Error("worker error"))),On.clear()},Dn)}async function Vh(s,e={}){const t=cv();if(!t||typeof createImageBitmap>"u")return null;const i=++lv,n=Math.max(1e3,e.timeoutMs??12e3),r=e.priority??"high";return new Promise((o,a)=>{const l={resolve:o,reject:a};l.timer=window.setTimeout(()=>{On.delete(i),a(new Error("worker decode timeout"))},n+500),On.set(i,l),t.postMessage({id:i,url:s,timeoutMs:n,priority:r})})}class hv{constructor(e,t,i,n=0){m(this,"maxTextureSize");m(this,"manifest",null);m(this,"canvas",null);m(this,"ctx",null);m(this,"texture",null);m(this,"mesh",null);m(this,"pendingLow",[]);m(this,"pendingHigh",[]);m(this,"activeLoads",0);m(this,"activeLowLoads",0);m(this,"activeHighLoads",0);m(this,"maxConcurrent",6);m(this,"maxHighWhileLow",2);m(this,"defaultMaxConcurrent",6);m(this,"defaultMaxHighWhileLow",2);m(this,"lastUpdate",0);m(this,"tilesMap",new Map);m(this,"highestLevel",null);m(this,"lowLevel",null);m(this,"lowReadyCount",0);m(this,"lowTotalCount",0);m(this,"lowFullyReady",!1);m(this,"highSeeded",!1);m(this,"tilesVisible",!1);m(this,"tilesLoadedCount",0);m(this,"tilesLoadingCount",0);m(this,"tilesQueuedCount",0);m(this,"tilesFailedCount",0);m(this,"tilesRetryCount",0);m(this,"lastTileUrl","");m(this,"lastError","");m(this,"lruLimit",64);m(this,"highReady",!1);m(this,"canvasScale",1);m(this,"fallbackVisible",!1);this.scene=e,this.onFirstDraw=t,this.onHighReady=i,this.maxTextureSize=Math.max(0,n)}async load(e,t){var p;if(this.manifest=e,this.fallbackVisible=!!(t!=null&&t.fallbackVisible),this.highestLevel=e.levels.reduce((g,E)=>E.z>g.z?E:g),!this.highestLevel)throw new Error("manifest 缺少 level");this.lruLimit=Math.max(64,Math.min(this.highestLevel.cols*this.highestLevel.rows,256));const i=e.levels.filter(g=>g.z<this.highestLevel.z);this.lowLevel=i.length?i.reduce((g,E)=>E.z>g.z?E:g):null,this.lowReadyCount=0,this.lowTotalCount=this.lowLevel?this.lowLevel.cols*this.lowLevel.rows:0,this.lowFullyReady=this.lowTotalCount===0,this.highSeeded=!1,this.tilesVisible=!1,this.tilesLoadedCount=0,this.tilesLoadingCount=0,this.tilesQueuedCount=0,this.tilesFailedCount=0,this.tilesRetryCount=0,this.activeLoads=0,this.activeLowLoads=0,this.activeHighLoads=0;const n=this.highestLevel.cols,r=this.highestLevel.rows,o=e.tileSize,a=o*n,l=o*r;let c=a,h=l;if(this.canvasScale=1,this.maxTextureSize>0&&(c>this.maxTextureSize||h>this.maxTextureSize)){const g=Math.min(this.maxTextureSize/c,this.maxTextureSize/h);c=Math.max(1,Math.floor(c*g)),h=Math.max(1,Math.floor(h*g)),this.canvasScale=g}this.canvas=document.createElement("canvas"),this.canvas.width=c,this.canvas.height=h,this.ctx=this.canvas.getContext("2d",{alpha:!0}),this.fallbackVisible&&this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.texture=new ki(this.canvas),this.texture.flipY=!0,this.texture.wrapS=ot,this.texture.wrapT=ot,this.texture.minFilter=gt,this.texture.magFilter=gt,this.texture.generateMipmaps=!1,"colorSpace"in this.texture?this.texture.colorSpace=st:this.texture.encoding=$t,this.texture.needsUpdate=!0;const d=new jn(500,64,64);d.scale(-1,1,1);const u=new Mi({map:this.texture,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1});if(u.toneMapped=!1,this.mesh=new ht(d,u),this.mesh.renderOrder=1,this.mesh.frustumCulled=!1,this.scene.add(this.mesh),!this.fallbackVisible){if(!e.levels.find(y=>y.z===0))throw new Error("manifest 缺少 z0");const E=`${e.baseUrl}/z0/0_0.jpg`,A=await this.fetchTileBitmap(E,"high"),f={z:0,col:0,row:0,url:E,state:"ready",priority:"low",bitmap:A,lastUsed:performance.now(),failCount:0};await this.drawTile(f),(p=A.close)==null||p.call(A)}this.lowLevel&&this.enqueueLevel(this.lowLevel,"low")}setPerformanceMode(e){e==="throttle"?(this.maxConcurrent=2,this.maxHighWhileLow=0):(this.maxConcurrent=this.defaultMaxConcurrent,this.maxHighWhileLow=this.defaultMaxHighWhileLow)}dispose(){if(this.tilesMap.forEach(e=>{var t,i;return(i=(t=e.bitmap)==null?void 0:t.close)==null?void 0:i.call(t)}),this.tilesMap.clear(),this.mesh){this.mesh.geometry&&this.mesh.geometry.dispose();const e=this.mesh.material;e.map&&e.map.dispose(),e.dispose(),this.scene.remove(this.mesh)}}update(e){if(!this.manifest||!this.highestLevel||!this.ctx)return;const t=performance.now();if(t-this.lastUpdate<150)return;if(this.lastUpdate=t,(!this.lowLevel||this.lowFullyReady||this.highSeeded)&&this.highestLevel){const o=this.computeNeededTiles(e,this.highestLevel);for(const{col:a,row:l,rank:c}of o){const h=`${this.highestLevel.z}_${a}_${l}`;let d=this.tilesMap.get(h);d||(d={z:this.highestLevel.z,col:a,row:l,url:`${this.manifest.baseUrl}/z${this.highestLevel.z}/${a}_${l}.jpg`,state:"empty",priority:"high",lastUsed:t,failCount:0},this.tilesMap.set(h,d)),d.priority="high",d.priorityRank=c,d.lastUsed=t,d.state==="empty"&&!d.retryTimer&&(d.state="loading",this.pendingHigh.push(d))}}const n=Array.from(this.tilesMap.values()).filter(o=>o.state==="loading").length,r=Array.from(this.tilesMap.values()).filter(o=>o.state==="ready").length;if(this.lowLevel&&!this.lowFullyReady){const o=Array.from(this.tilesMap.values()).filter(a=>a.z===this.lowLevel.z&&a.state==="loading").length;this.pendingLow.length===0&&o===0&&(this.lowFullyReady=!0)}this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.tilesLoadingCount=n,this.tilesLoadedCount=r,this.processQueue(),this.runLru(t)}prime(e){if(!this.manifest||!this.highestLevel||!this.ctx)return;e.updateMatrixWorld(!0);const t=performance.now();if(this.highestLevel&&!this.highSeeded){const i=this.computeNeededTiles(e,this.highestLevel);if(i.length>0){for(const{col:n,row:r,rank:o}of i){const a=`${this.highestLevel.z}_${n}_${r}`;let l=this.tilesMap.get(a);l||(l={z:this.highestLevel.z,col:n,row:r,url:`${this.manifest.baseUrl}/z${this.highestLevel.z}/${n}_${r}.jpg`,state:"empty",priority:"high",lastUsed:t,failCount:0},this.tilesMap.set(a,l)),l.priority="high",l.priorityRank=o,l.lastUsed=t,l.state==="empty"&&!l.retryTimer&&(l.state="loading",this.pendingHigh.push(l))}this.highSeeded=!0}}this.reprioritizeLowQueue(e),this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.tilesLoadingCount=Array.from(this.tilesMap.values()).filter(i=>i.state==="loading").length,this.processQueue()}getStatus(){var e,t;return{tilesVisible:this.tilesVisible,fallbackVisible:this.fallbackVisible,tilesLoadedCount:this.tilesLoadedCount,tilesLoadingCount:this.tilesLoadingCount,tilesQueuedCount:this.tilesQueuedCount,tilesFailedCount:this.tilesFailedCount,tilesRetryCount:this.tilesRetryCount,lastTileUrl:this.lastTileUrl,lastError:this.lastError,canvasSize:this.canvas?`${this.canvas.width}x${this.canvas.height}`:"0x0",canvasScale:this.canvasScale,maxLevel:this.highestLevel?`${this.highestLevel.cols}x${this.highestLevel.rows}`:"",highReady:this.highReady,zMax:((e=this.highestLevel)==null?void 0:e.z)??0,levels:this.manifest?this.manifest.levels.map(i=>i.z).join(","):"",lowReady:this.lowFullyReady,lowLevel:((t=this.lowLevel)==null?void 0:t.z)??""}}enqueueLevel(e,t){const i=performance.now();for(let n=0;n<e.rows;n++)for(let r=0;r<e.cols;r++){const o=`${e.z}_${r}_${n}`;let a=this.tilesMap.get(o);a||(a={z:e.z,col:r,row:n,url:`${this.manifest.baseUrl}/z${e.z}/${r}_${n}.jpg`,state:"empty",priority:t,lastUsed:i,failCount:0},this.tilesMap.set(o,a)),a.priority=t,a.lastUsed=i,a.state==="empty"&&!a.retryTimer&&(a.state="loading",t==="low"?this.pendingLow.push(a):this.pendingHigh.push(a))}this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.tilesLoadingCount=Array.from(this.tilesMap.values()).filter(n=>n.state==="loading").length,this.processQueue()}processQueue(){for(this.sortPendingHighQueue();this.activeLoads<this.maxConcurrent&&(this.pendingLow.length>0||this.pendingHigh.length>0);){const e=this.pendingLow.length>0,i=this.pendingHigh.length>0&&(!e||this.activeHighLoads<this.maxHighWhileLow)?this.pendingHigh.shift():this.pendingLow.shift();this.loadTile(i)}}async loadTile(e){(e.failCount===void 0||e.failCount===null)&&(e.failCount=0),e.priority||(e.priority="high"),this.activeLoads+=1,e.priority==="high"?this.activeHighLoads+=1:this.activeLowLoads+=1,this.lastTileUrl=e.url;try{const t=await this.fetchTileBitmap(e.url,e.priority);e.bitmap=t,e.state="ready",e.failCount=0,e.retryTimer&&(clearTimeout(e.retryTimer),e.retryTimer=void 0),this.drawTile(e),this.tilesLoadedCount+=1,this.lowLevel&&e.z===this.lowLevel.z&&(this.lowReadyCount+=1,this.lowReadyCount>=this.lowTotalCount&&(this.lowFullyReady=!0))}catch(t){this.lastError=t instanceof Error?t.message:String(t),e.state="empty",e.failCount+=1,this.tilesFailedCount+=1;const i=Math.min(1e3*Math.pow(2,Math.max(0,e.failCount-1)),15e3);this.scheduleRetry(e,i)}finally{this.activeLoads-=1,e.priority==="high"?this.activeHighLoads=Math.max(0,this.activeHighLoads-1):this.activeLowLoads=Math.max(0,this.activeLowLoads-1),this.processQueue()}}scheduleRetry(e,t){e.retryTimer||(this.tilesRetryCount+=1,e.retryTimer=window.setTimeout(()=>{e.retryTimer=void 0,e.state==="empty"&&(e.priority==="low"?this.pendingLow.push(e):this.pendingHigh.push(e),this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.processQueue())},t))}async fetchTileBitmap(e,t,i=12e3){try{const o=await Vh(e,{timeoutMs:i,priority:t});if(o)return o}catch{}const n=new AbortController,r=window.setTimeout(()=>n.abort(),i);try{const o={mode:"cors",cache:"default",referrerPolicy:"no-referrer",signal:n.signal};o.priority=t==="high"?"high":"low";const a=await fetch(e,o);if(!a.ok)throw new Error(`tile HTTP ${a.status}: ${e}`);const l=await a.blob();return await createImageBitmap(l)}finally{clearTimeout(r)}}hasHigherReadyTile(e,t,i){if(!this.highestLevel)return!1;const n=this.highestLevel.z;if(e>=n)return!1;const r=1<<n-e;for(let o=0;o<r;o++)for(let a=0;a<r;a++){const l=`${n}_${t*r+a}_${i*r+o}`,c=this.tilesMap.get(l);if(c&&c.state==="ready")return!0}return!1}async drawTile(e){var c,h;if(!this.manifest||!this.highestLevel||!this.ctx||!this.canvas)return;const t=this.manifest.levels.find(d=>d.z===e.z);if(!t||this.hasHigherReadyTile(e.z,e.col,e.row))return;const i=this.canvas.width/t.cols,n=this.canvas.height/t.rows,r=e.col*i,o=e.row*n;if(r<0||o<0||r+i>this.canvas.width||o+n>this.canvas.height){this.lastError=`tile out of canvas: z${e.z} ${e.col}_${e.row}`;return}const a=e.bitmap;if(a)this.ctx.drawImage(a,r,o,i,n);else{const d=e.url||`${this.manifest.baseUrl}/z${e.z}/${e.col}_${e.row}.jpg`,u=await sn(d,{timeoutMs:12e3,retries:1,priority:e.priority});this.ctx.drawImage(u,r,o,i,n),(c=u.close)==null||c.call(u)}this.texture&&(this.texture.needsUpdate=!0),this.tilesVisible||(this.tilesVisible=!0,this.onFirstDraw());const l=(h=this.mesh)==null?void 0:h.material;l&&(l.opacity=1,l.needsUpdate=!0),this.highestLevel&&e.z===this.highestLevel.z&&!this.highReady&&(this.highReady=!0,this.onHighReady())}computeNeededTiles(e,t){const i=new L;e.getWorldDirection(i);const n=-Math.atan2(i.x,i.z),r=Math.asin(i.y),o=at.degToRad(e.fov),a=at.degToRad(20),l=o/2+a,c=o*e.aspect/2+a,h=this.normAngle(n-c),d=this.normAngle(n+c),u=at.clamp(r-l,-Math.PI/2,Math.PI/2),p=at.clamp(r+l,-Math.PI/2,Math.PI/2),g=this.yawToCols(h,d,t.cols),E=this.yawToCols(n-1e-6,n+1e-6,t.cols)[0]??0;g.includes(E)||g.push(E);const A=Math.max(0,Math.floor((p*-1+Math.PI/2)/Math.PI*t.rows)),f=Math.min(t.rows-1,Math.floor((u*-1+Math.PI/2)/Math.PI*t.rows)),y=[];for(let D=A;D<=f;D++)y.push(D);const v=Math.min(t.rows-1,Math.max(0,Math.floor((-r+Math.PI/2)/Math.PI*t.rows)));y.includes(v)||y.push(v);const b=[...g];for(const D of g)b.push(((D+1)%t.cols+t.cols)%t.cols),b.push(((D-1)%t.cols+t.cols)%t.cols);const T=[...y];for(const D of y)D+1<t.rows&&T.push(D+1),D-1>=0&&T.push(D-1);const S=new Map,M=(D,_)=>{const w=`${D}_${_}`,N=Math.abs(D-E),H=Math.min(N,t.cols-N),$=Math.abs(_-v),R=H*H+$*$,U=S.get(w);(!U||R<U.rank)&&S.set(w,{col:D,row:_,rank:R})};for(const D of b)for(const _ of T)M(D,_);return Array.from(S.values()).sort((D,_)=>D.rank!==_.rank?D.rank-_.rank:D.row!==_.row?D.row-_.row:D.col-_.col)}sortPendingHighQueue(){this.pendingHigh.length<2||this.pendingHigh.sort((e,t)=>{const i=e.priorityRank??Number.POSITIVE_INFINITY,n=t.priorityRank??Number.POSITIVE_INFINITY;return i!==n?i-n:t.lastUsed-e.lastUsed})}reprioritizeLowQueue(e){if(!this.lowLevel||this.pendingLow.length<2)return;const t=this.computeNeededTiles(e,this.lowLevel);if(t.length===0)return;const i=new Map;for(const r of t)i.set(`${r.col}_${r.row}`,r.rank);const n=new Map;this.pendingLow.forEach((r,o)=>n.set(r,o)),this.pendingLow.sort((r,o)=>{const a=i.get(`${r.col}_${r.row}`),l=i.get(`${o.col}_${o.row}`),c=a!==void 0,h=l!==void 0;return c&&h&&a!==l?a-l:c&&!h?-1:!c&&h?1:(n.get(r)??0)-(n.get(o)??0)})}yawToCols(e,t,i){const n=u=>(u%(Math.PI*2)+Math.PI*2)%(Math.PI*2),r=Math.PI,o=n(e+r),a=n(t+r),l=[],c=u=>{const p=(u%i+i)%i;l.includes(p)||l.push(p)},h=Math.floor(o/(Math.PI*2)*i),d=Math.floor(a/(Math.PI*2)*i);if(o<=a)for(let u=h;u<=d;u++)c(u);else{for(let u=h;u<i;u++)c(u);for(let u=0;u<=d;u++)c(u)}return l}normAngle(e){return(e+Math.PI)%(2*Math.PI)-Math.PI}runLru(e){var n,r;if(!this.highestLevel)return;const t=Array.from(this.tilesMap.values()).filter(o=>o.z===this.highestLevel.z&&o.state==="ready");if(t.length<=this.lruLimit)return;t.sort((o,a)=>o.lastUsed-a.lastUsed);const i=t.slice(0,t.length-this.lruLimit);for(const o of i)(r=(n=o.bitmap)==null?void 0:n.close)==null||r.call(n),o.bitmap=void 0,o.state="empty",this.tilesMap.delete(`${o.z}_${o.col}_${o.row}`)}}class dv{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(e){if(!this.workers[e]){const t=this.workerCreator();t.addEventListener("message",this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){const i=this.workersResolve[e];if(i&&i(t),this.queue.length){const{resolve:n,msg:r,transfer:o}=this.queue.shift();this.workersResolve[e]=n,this.workers[e].postMessage(r,o)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(i=>{const n=this._getIdleWorker();n!==-1?(this._initWorker(n),this.workerStatus|=1<<n,this.workersResolve[n]=i,this.workers[n].postMessage(e,t)):this.queue.push({resolve:i,msg:e,transfer:t})})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}}const uv=0,Uc=2,fv=1,Fc=2,pv=0,Av=1,mv=10,gv=0,zh=9,Wh=15,Yh=16,qh=22,Xh=37,$h=43,Jh=76,Kh=83,jh=97,Zh=100,ed=103,td=109,id=165,nd=166;class Ev{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}}class fs{constructor(e,t,i,n){this._dataView=new DataView(e.buffer,e.byteOffset+t,i),this._littleEndian=n,this._offset=0}_nextUint8(){const e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){const e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){const e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){const e=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){const e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,t=0){const i=this._offset;let n=0;for(;this._dataView.getUint8(this._offset)!==t&&n<e;)n++,this._offset++;return n<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+i,n)}}const Ft=[171,75,84,88,32,50,48,187,13,10,26,10];function kc(s){return typeof TextDecoder<"u"?new TextDecoder().decode(s):Buffer.from(s).toString("utf8")}function vv(s){const e=new Uint8Array(s.buffer,s.byteOffset,Ft.length);if(e[0]!==Ft[0]||e[1]!==Ft[1]||e[2]!==Ft[2]||e[3]!==Ft[3]||e[4]!==Ft[4]||e[5]!==Ft[5]||e[6]!==Ft[6]||e[7]!==Ft[7]||e[8]!==Ft[8]||e[9]!==Ft[9]||e[10]!==Ft[10]||e[11]!==Ft[11])throw new Error("Missing KTX 2.0 identifier.");const t=new Ev,i=17*Uint32Array.BYTES_PER_ELEMENT,n=new fs(s,Ft.length,i,!0);t.vkFormat=n._nextUint32(),t.typeSize=n._nextUint32(),t.pixelWidth=n._nextUint32(),t.pixelHeight=n._nextUint32(),t.pixelDepth=n._nextUint32(),t.layerCount=n._nextUint32(),t.faceCount=n._nextUint32();const r=n._nextUint32();t.supercompressionScheme=n._nextUint32();const o=n._nextUint32(),a=n._nextUint32(),l=n._nextUint32(),c=n._nextUint32(),h=n._nextUint64(),d=n._nextUint64(),u=new fs(s,Ft.length+i,3*r*8,!0);for(let q=0;q<r;q++)t.levels.push({levelData:new Uint8Array(s.buffer,s.byteOffset+u._nextUint64(),u._nextUint64()),uncompressedByteLength:u._nextUint64()});const p=new fs(s,o,a,!0),g={vendorId:p._skip(4)._nextUint16(),descriptorType:p._nextUint16(),versionNumber:p._nextUint16(),descriptorBlockSize:p._nextUint16(),colorModel:p._nextUint8(),colorPrimaries:p._nextUint8(),transferFunction:p._nextUint8(),flags:p._nextUint8(),texelBlockDimension:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],bytesPlane:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],samples:[]},E=(g.descriptorBlockSize/4-6)/4;for(let q=0;q<E;q++){const W={bitOffset:p._nextUint16(),bitLength:p._nextUint8(),channelType:p._nextUint8(),samplePosition:[p._nextUint8(),p._nextUint8(),p._nextUint8(),p._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&W.channelType?(W.sampleLower=p._nextInt32(),W.sampleUpper=p._nextInt32()):(W.sampleLower=p._nextUint32(),W.sampleUpper=p._nextUint32()),g.samples[q]=W}t.dataFormatDescriptor.length=0,t.dataFormatDescriptor.push(g);const A=new fs(s,l,c,!0);for(;A._offset<c;){const q=A._nextUint32(),W=A._scan(q),Y=kc(W),X=A._scan(q-W.byteLength);t.keyValue[Y]=Y.match(/^ktx/i)?kc(X):X,A._offset%4&&A._skip(4-A._offset%4)}if(d<=0)return t;const f=new fs(s,h,d,!0),y=f._nextUint16(),v=f._nextUint16(),b=f._nextUint32(),T=f._nextUint32(),S=f._nextUint32(),M=f._nextUint32(),D=[];for(let q=0;q<r;q++)D.push({imageFlags:f._nextUint32(),rgbSliceByteOffset:f._nextUint32(),rgbSliceByteLength:f._nextUint32(),alphaSliceByteOffset:f._nextUint32(),alphaSliceByteLength:f._nextUint32()});const _=h+f._offset,w=_+b,N=w+T,H=N+S,$=new Uint8Array(s.buffer,s.byteOffset+_,b),R=new Uint8Array(s.buffer,s.byteOffset+w,T),U=new Uint8Array(s.buffer,s.byteOffset+N,S),z=new Uint8Array(s.buffer,s.byteOffset+H,M);return t.globalData={endpointCount:y,selectorCount:v,imageDescs:D,endpointsData:$,selectorsData:R,tablesData:U,extendedData:z},t}let To,xi,aa;const Bo={env:{emscripten_notify_memory_growth:function(s){aa=new Uint8Array(xi.exports.memory.buffer)}}};class yv{init(){return To||(To=typeof fetch<"u"?fetch("data:application/wasm;base64,"+Qc).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,Bo)).then(this._init):WebAssembly.instantiate(Buffer.from(Qc,"base64"),Bo).then(this._init),To)}_init(e){xi=e.instance,Bo.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!xi)throw new Error("ZSTDDecoder: Await .init() before decoding.");const i=e.byteLength,n=xi.exports.malloc(i);aa.set(e,n),t=t||Number(xi.exports.ZSTD_findDecompressedSize(n,i));const r=xi.exports.malloc(t),o=xi.exports.ZSTD_decompress(r,t,n,i),a=aa.slice(r,r+o);return xi.exports.free(n),xi.exports.free(r),a}}const Qc="AGFzbQEAAAABpQEVYAF/AX9gAn9/AGADf39/AX9gBX9/f39/AX9gAX8AYAJ/fwF/YAR/f39/AX9gA39/fwBgBn9/f39/fwF/YAd/f39/f39/AX9gAn9/AX5gAn5+AX5gAABgBX9/f39/AGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAABf2AIf39/f39/f38Bf2ANf39/f39/f39/f39/fwF/YAF/AX4CJwEDZW52H2Vtc2NyaXB0ZW5fbm90aWZ5X21lbW9yeV9ncm93dGgABANpaAEFAAAFAgEFCwACAQABAgIFBQcAAwABDgsBAQcAEhMHAAUBDAQEAAANBwQCAgYCBAgDAwMDBgEACQkHBgICAAYGAgQUBwYGAwIGAAMCAQgBBwUGCgoEEQAEBAEIAwgDBQgDEA8IAAcABAUBcAECAgUEAQCAAgYJAX8BQaCgwAILB2AHBm1lbW9yeQIABm1hbGxvYwAoBGZyZWUAJgxaU1REX2lzRXJyb3IAaBlaU1REX2ZpbmREZWNvbXByZXNzZWRTaXplAFQPWlNURF9kZWNvbXByZXNzAEoGX3N0YXJ0ACQJBwEAQQELASQKussBaA8AIAAgACgCBCABajYCBAsZACAAKAIAIAAoAgRBH3F0QQAgAWtBH3F2CwgAIABBiH9LC34BBH9BAyEBIAAoAgQiA0EgTQRAIAAoAggiASAAKAIQTwRAIAAQDQ8LIAAoAgwiAiABRgRAQQFBAiADQSBJGw8LIAAgASABIAJrIANBA3YiBCABIARrIAJJIgEbIgJrIgQ2AgggACADIAJBA3RrNgIEIAAgBCgAADYCAAsgAQsUAQF/IAAgARACIQIgACABEAEgAgv3AQECfyACRQRAIABCADcCACAAQQA2AhAgAEIANwIIQbh/DwsgACABNgIMIAAgAUEEajYCECACQQRPBEAgACABIAJqIgFBfGoiAzYCCCAAIAMoAAA2AgAgAUF/ai0AACIBBEAgAEEIIAEQFGs2AgQgAg8LIABBADYCBEF/DwsgACABNgIIIAAgAS0AACIDNgIAIAJBfmoiBEEBTQRAIARBAWtFBEAgACABLQACQRB0IANyIgM2AgALIAAgAS0AAUEIdCADajYCAAsgASACakF/ai0AACIBRQRAIABBADYCBEFsDwsgAEEoIAEQFCACQQN0ams2AgQgAgsWACAAIAEpAAA3AAAgACABKQAINwAICy8BAX8gAUECdEGgHWooAgAgACgCAEEgIAEgACgCBGprQR9xdnEhAiAAIAEQASACCyEAIAFCz9bTvtLHq9lCfiAAfEIfiUKHla+vmLbem55/fgsdAQF/IAAoAgggACgCDEYEfyAAKAIEQSBGBUEACwuCBAEDfyACQYDAAE8EQCAAIAEgAhBnIAAPCyAAIAJqIQMCQCAAIAFzQQNxRQRAAkAgAkEBSARAIAAhAgwBCyAAQQNxRQRAIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBQGshASACQUBrIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQALDAELIANBBEkEQCAAIQIMAQsgA0F8aiIEIABJBEAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCyACIANJBEADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAsMACAAIAEpAAA3AAALQQECfyAAKAIIIgEgACgCEEkEQEEDDwsgACAAKAIEIgJBB3E2AgQgACABIAJBA3ZrIgE2AgggACABKAAANgIAQQALDAAgACABKAIANgAAC/cCAQJ/AkAgACABRg0AAkAgASACaiAASwRAIAAgAmoiBCABSw0BCyAAIAEgAhALDwsgACABc0EDcSEDAkACQCAAIAFJBEAgAwRAIAAhAwwDCyAAQQNxRQRAIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcQ0ACwwBCwJAIAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQhBSAGQQR2IQRBICAAdCIAQQFyIQkgASgCACEPQQAhAiADIQYCQANAIAlBAkggAiAPS3JFBEAgAiEHAkAgCARAA0AgBEH//wNxQf//A0YEQCAHQRhqIQcgBiAQSQR/IAZBAmoiBigAACAFdgUgBUEQaiEFIARBEHYLIQQMAQsLA0AgBEEDcSIIQQNGBEAgBUECaiEFIARBAnYhBCAHQQNqIQcMAQsLIAcgCGoiByAPSw0EIAVBAmohBQNAIAIgB0kEQCANIAJBAXRqQQA7AQAgAkEBaiECDAELCyAGIA5LQQAgBiAFQQN1aiIHIAxLG0UEQCAHKAAAIAVBB3EiBXYhBAwCCyAEQQJ2IQQLIAYhBwsCfyALQX9qIAQgAEF/anEiBiAAQQF0QX9qIgggCWsiEUkNABogBCAIcSIEQQAgESAEIABIG2shBiALCyEIIA0gAkEBdGogBkF/aiIEOwEAIAlBASAGayAEIAZBAUgbayEJA0AgCSAASARAIABBAXUhACALQX9qIQsMAQsLAn8gByAOS0EAIAcgBSAIaiIFQQN1aiIGIAxLG0UEQCAFQQdxDAELIAUgDCIGIAdrQQN0awshBSACQQFqIQIgBEUhCCAGKAAAIAVBH3F2IQQMAQsLQWwgCUEBRyAFQSBKcg0BGiABIAJBf2o2AgAgBiAFQQdqQQN1aiADawwBC0FQCyEAIApBEGokACAACwkAQQFBBSAAGwsMACAAIAEoAAA2AAALqgMBCn8jAEHwAGsiCiQAIAJBAWohDiAAQQhqIQtBgIAEIAVBf2p0QRB1IQxBACECQQEhBkEBIAV0IglBf2oiDyEIA0AgAiAORkUEQAJAIAEgAkEBdCINai8BACIHQf//A0YEQCALIAhBA3RqIAI2AgQgCEF/aiEIQQEhBwwBCyAGQQAgDCAHQRB0QRB1ShshBgsgCiANaiAHOwEAIAJBAWohAgwBCwsgACAFNgIEIAAgBjYCACAJQQN2IAlBAXZqQQNqIQxBACEAQQAhBkEAIQIDQCAGIA5GBEADQAJAIAAgCUYNACAKIAsgAEEDdGoiASgCBCIGQQF0aiICIAIvAQAiAkEBajsBACABIAUgAhAUayIIOgADIAEgAiAIQf8BcXQgCWs7AQAgASAEIAZBAnQiAmooAgA6AAIgASACIANqKAIANgIEIABBAWohAAwBCwsFIAEgBkEBdGouAQAhDUEAIQcDQCAHIA1ORQRAIAsgAkEDdGogBjYCBANAIAIgDGogD3EiAiAISw0ACyAHQQFqIQcMAQsLIAZBAWohBgwBCwsgCkHwAGokAAsjAEIAIAEQCSAAhUKHla+vmLbem55/fkLj3MqV/M7y9YV/fAsQACAAQn43AwggACABNgIACyQBAX8gAARAIAEoAgQiAgRAIAEoAgggACACEQEADwsgABAmCwsfACAAIAEgAi8BABAINgIAIAEQBBogACACQQRqNgIEC0oBAX9BoCAoAgAiASAAaiIAQX9MBEBBiCBBMDYCAEF/DwsCQCAAPwBBEHRNDQAgABBmDQBBiCBBMDYCAEF/DwtBoCAgADYCACABC9cBAQh/Qbp/IQoCQCACKAIEIgggAigCACIJaiIOIAEgAGtLDQBBbCEKIAkgBCADKAIAIgtrSw0AIAAgCWoiBCACKAIIIgxrIQ0gACABQWBqIg8gCyAJQQAQKSADIAkgC2o2AgACQAJAIAwgBCAFa00EQCANIQUMAQsgDCAEIAZrSw0CIAcgDSAFayIAaiIBIAhqIAdNBEAgBCABIAgQDxoMAgsgBCABQQAgAGsQDyEBIAIgACAIaiIINgIEIAEgAGshBAsgBCAPIAUgCEEBECkLIA4hCgsgCgubAgEBfyMAQYABayINJAAgDSADNgJ8AkAgAkEDSwRAQX8hCQwBCwJAAkACQAJAIAJBAWsOAwADAgELIAZFBEBBuH8hCQwEC0FsIQkgBS0AACICIANLDQMgACAHIAJBAnQiAmooAgAgAiAIaigCABA7IAEgADYCAEEBIQkMAwsgASAJNgIAQQAhCQwCCyAKRQRAQWwhCQwCC0EAIQkgC0UgDEEZSHINAUEIIAR0QQhqIQBBACECA0AgAiAATw0CIAJBQGshAgwAAAsAC0FsIQkgDSANQfwAaiANQfgAaiAFIAYQFSICEAMNACANKAJ4IgMgBEsNACAAIA0gDSgCfCAHIAggAxAYIAEgADYCACACIQkLIA1BgAFqJAAgCQsLACAAIAEgAhALGgsQACAALwAAIAAtAAJBEHRyCy8AAn9BuH8gAUEISQ0AGkFyIAAoAAQiAEF3Sw0AGkG4fyAAQQhqIgAgACABSxsLCwkAIAAgATsAAAsDAAELigYBBX8gACAAKAIAIgVBfnE2AgBBACAAIAVBAXZqQYQgKAIAIgQgAEYbIQECQAJAIAAoAgQiAkUNACACKAIAIgNBAXENACACQQhqIgUgA0EBdkF4aiIDQQggA0EISxtnQR9zQQJ0QYAfaiIDKAIARgRAIAMgAigCDDYCAAsgAigCCCIDBEAgAyACKAIMNgIECyACKAIMIgMEQCADIAIoAgg2AgALIAIgAigCACAAKAIAQX5xajYCAEGEICEAAkACQCABRQ0AIAEgAjYCBCABKAIAIgNBAXENASADQQF2QXhqIgNBCCADQQhLG2dBH3NBAnRBgB9qIgMoAgAgAUEIakYEQCADIAEoAgw2AgALIAEoAggiAwRAIAMgASgCDDYCBAsgASgCDCIDBEAgAyABKAIINgIAQYQgKAIAIQQLIAIgAigCACABKAIAQX5xajYCACABIARGDQAgASABKAIAQQF2akEEaiEACyAAIAI2AgALIAIoAgBBAXZBeGoiAEEIIABBCEsbZ0Efc0ECdEGAH2oiASgCACEAIAEgBTYCACACIAA2AgwgAkEANgIIIABFDQEgACAFNgIADwsCQCABRQ0AIAEoAgAiAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAigCACABQQhqRgRAIAIgASgCDDYCAAsgASgCCCICBEAgAiABKAIMNgIECyABKAIMIgIEQCACIAEoAgg2AgBBhCAoAgAhBAsgACAAKAIAIAEoAgBBfnFqIgI2AgACQCABIARHBEAgASABKAIAQQF2aiAANgIEIAAoAgAhAgwBC0GEICAANgIACyACQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgIoAgAhASACIABBCGoiAjYCACAAIAE2AgwgAEEANgIIIAFFDQEgASACNgIADwsgBUEBdkF4aiIBQQggAUEISxtnQR9zQQJ0QYAfaiICKAIAIQEgAiAAQQhqIgI2AgAgACABNgIMIABBADYCCCABRQ0AIAEgAjYCAAsLDgAgAARAIABBeGoQJQsLgAIBA38CQCAAQQ9qQXhxQYQgKAIAKAIAQQF2ayICEB1Bf0YNAAJAQYQgKAIAIgAoAgAiAUEBcQ0AIAFBAXZBeGoiAUEIIAFBCEsbZ0Efc0ECdEGAH2oiASgCACAAQQhqRgRAIAEgACgCDDYCAAsgACgCCCIBBEAgASAAKAIMNgIECyAAKAIMIgFFDQAgASAAKAIINgIAC0EBIQEgACAAKAIAIAJBAXRqIgI2AgAgAkEBcQ0AIAJBAXZBeGoiAkEIIAJBCEsbZ0Efc0ECdEGAH2oiAygCACECIAMgAEEIaiIDNgIAIAAgAjYCDCAAQQA2AgggAkUNACACIAM2AgALIAELtwIBA38CQAJAIABBASAAGyICEDgiAA0AAkACQEGEICgCACIARQ0AIAAoAgAiA0EBcQ0AIAAgA0EBcjYCACADQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgAgAEEIakYEQCABIAAoAgw2AgALIAAoAggiAQRAIAEgACgCDDYCBAsgACgCDCIBBEAgASAAKAIINgIACyACECchAkEAIQFBhCAoAgAhACACDQEgACAAKAIAQX5xNgIAQQAPCyACQQ9qQXhxIgMQHSICQX9GDQIgAkEHakF4cSIAIAJHBEAgACACaxAdQX9GDQMLAkBBhCAoAgAiAUUEQEGAICAANgIADAELIAAgATYCBAtBhCAgADYCACAAIANBAXRBAXI2AgAMAQsgAEUNAQsgAEEIaiEBCyABC7kDAQJ/IAAgA2ohBQJAIANBB0wEQANAIAAgBU8NAiAAIAItAAA6AAAgAEEBaiEAIAJBAWohAgwAAAsACyAEQQFGBEACQCAAIAJrIgZBB00EQCAAIAItAAA6AAAgACACLQABOgABIAAgAi0AAjoAAiAAIAItAAM6AAMgAEEEaiACIAZBAnQiBkHAHmooAgBqIgIQFyACIAZB4B5qKAIAayECDAELIAAgAhAMCyACQQhqIQIgAEEIaiEACwJAAkACQAJAIAUgAU0EQCAAIANqIQEgBEEBRyAAIAJrQQ9Kcg0BA0AgACACEAwgAkEIaiECIABBCGoiACABSQ0ACwwFCyAAIAFLBEAgACEBDAQLIARBAUcgACACa0EPSnINASAAIQMgAiEEA0AgAyAEEAwgBEEIaiEEIANBCGoiAyABSQ0ACwwCCwNAIAAgAhAHIAJBEGohAiAAQRBqIgAgAUkNAAsMAwsgACEDIAIhBANAIAMgBBAHIARBEGohBCADQRBqIgMgAUkNAAsLIAIgASAAa2ohAgsDQCABIAVPDQEgASACLQAAOgAAIAFBAWohASACQQFqIQIMAAALAAsLQQECfyAAIAAoArjgASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigCACACaiAAQQZ2IgFBAnRBsB5qKAIAaiAAQSBxIgBFaiABRSAAQQV2cWoFQbh/CwsdACAAKAKQ4gEQWiAAQQA2AqDiASAAQgA3A5DiAQu1AwEFfyMAQZACayIKJABBuH8hBgJAIAVFDQAgBCwAACIIQf8BcSEHAkAgCEF/TARAIAdBgn9qQQF2IgggBU8NAkFsIQYgB0GBf2oiBUGAAk8NAiAEQQFqIQdBACEGA0AgBiAFTwRAIAUhBiAIIQcMAwUgACAGaiAHIAZBAXZqIgQtAABBBHY6AAAgACAGQQFyaiAELQAAQQ9xOgAAIAZBAmohBgwBCwAACwALIAcgBU8NASAAIARBAWogByAKEFMiBhADDQELIAYhBEEAIQYgAUEAQTQQECEJQQAhBQNAIAQgBkcEQCAAIAZqIggtAAAiAUELSwRAQWwhBgwDBSAJIAFBAnRqIgEgASgCAEEBajYCACAGQQFqIQZBASAILQAAdEEBdSAFaiEFDAILAAsLQWwhBiAFRQ0AIAUQFEEBaiIBQQxLDQAgAyABNgIAQQFBASABdCAFayIDEBQiAXQgA0cNACAAIARqIAFBAWoiADoAACAJIABBAnRqIgAgACgCAEEBajYCACAJKAIEIgBBAkkgAEEBcXINACACIARBAWo2AgAgB0EBaiEGCyAKQZACaiQAIAYLxhEBDH8jAEHwAGsiBSQAQWwhCwJAIANBCkkNACACLwAAIQogAi8AAiEJIAIvAAQhByAFQQhqIAQQDgJAIAMgByAJIApqakEGaiIMSQ0AIAUtAAohCCAFQdgAaiACQQZqIgIgChAGIgsQAw0BIAVBQGsgAiAKaiICIAkQBiILEAMNASAFQShqIAIgCWoiAiAHEAYiCxADDQEgBUEQaiACIAdqIAMgDGsQBiILEAMNASAAIAFqIg9BfWohECAEQQRqIQZBASELIAAgAUEDakECdiIDaiIMIANqIgIgA2oiDiEDIAIhBCAMIQcDQCALIAMgEElxBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgCS0AAyELIAcgBiAFQUBrIAgQAkECdGoiCS8BADsAACAFQUBrIAktAAIQASAJLQADIQogBCAGIAVBKGogCBACQQJ0aiIJLwEAOwAAIAVBKGogCS0AAhABIAktAAMhCSADIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgDS0AAyENIAAgC2oiCyAGIAVB2ABqIAgQAkECdGoiAC8BADsAACAFQdgAaiAALQACEAEgAC0AAyEAIAcgCmoiCiAGIAVBQGsgCBACQQJ0aiIHLwEAOwAAIAVBQGsgBy0AAhABIActAAMhByAEIAlqIgkgBiAFQShqIAgQAkECdGoiBC8BADsAACAFQShqIAQtAAIQASAELQADIQQgAyANaiIDIAYgBUEQaiAIEAJBAnRqIg0vAQA7AAAgBUEQaiANLQACEAEgACALaiEAIAcgCmohByAEIAlqIQQgAyANLQADaiEDIAVB2ABqEA0gBUFAaxANciAFQShqEA1yIAVBEGoQDXJFIQsMAQsLIAQgDksgByACS3INAEFsIQsgACAMSw0BIAxBfWohCQNAQQAgACAJSSAFQdgAahAEGwRAIAAgBiAFQdgAaiAIEAJBAnRqIgovAQA7AAAgBUHYAGogCi0AAhABIAAgCi0AA2oiACAGIAVB2ABqIAgQAkECdGoiCi8BADsAACAFQdgAaiAKLQACEAEgACAKLQADaiEADAEFIAxBfmohCgNAIAVB2ABqEAQgACAKS3JFBEAgACAGIAVB2ABqIAgQAkECdGoiCS8BADsAACAFQdgAaiAJLQACEAEgACAJLQADaiEADAELCwNAIAAgCk0EQCAAIAYgBUHYAGogCBACQQJ0aiIJLwEAOwAAIAVB2ABqIAktAAIQASAAIAktAANqIQAMAQsLAkAgACAMTw0AIAAgBiAFQdgAaiAIEAIiAEECdGoiDC0AADoAACAMLQADQQFGBEAgBUHYAGogDC0AAhABDAELIAUoAlxBH0sNACAFQdgAaiAGIABBAnRqLQACEAEgBSgCXEEhSQ0AIAVBIDYCXAsgAkF9aiEMA0BBACAHIAxJIAVBQGsQBBsEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiIAIAYgBUFAayAIEAJBAnRqIgcvAQA7AAAgBUFAayAHLQACEAEgACAHLQADaiEHDAEFIAJBfmohDANAIAVBQGsQBCAHIAxLckUEQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwNAIAcgDE0EQCAHIAYgBUFAayAIEAJBAnRqIgAvAQA7AAAgBUFAayAALQACEAEgByAALQADaiEHDAELCwJAIAcgAk8NACAHIAYgBUFAayAIEAIiAEECdGoiAi0AADoAACACLQADQQFGBEAgBUFAayACLQACEAEMAQsgBSgCREEfSw0AIAVBQGsgBiAAQQJ0ai0AAhABIAUoAkRBIUkNACAFQSA2AkQLIA5BfWohAgNAQQAgBCACSSAFQShqEAQbBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2oiACAGIAVBKGogCBACQQJ0aiIELwEAOwAAIAVBKGogBC0AAhABIAAgBC0AA2ohBAwBBSAOQX5qIQIDQCAFQShqEAQgBCACS3JFBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsDQCAEIAJNBEAgBCAGIAVBKGogCBACQQJ0aiIALwEAOwAAIAVBKGogAC0AAhABIAQgAC0AA2ohBAwBCwsCQCAEIA5PDQAgBCAGIAVBKGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBKGogAi0AAhABDAELIAUoAixBH0sNACAFQShqIAYgAEECdGotAAIQASAFKAIsQSFJDQAgBUEgNgIsCwNAQQAgAyAQSSAFQRBqEAQbBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2oiACAGIAVBEGogCBACQQJ0aiICLwEAOwAAIAVBEGogAi0AAhABIAAgAi0AA2ohAwwBBSAPQX5qIQIDQCAFQRBqEAQgAyACS3JFBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsDQCADIAJNBEAgAyAGIAVBEGogCBACQQJ0aiIALwEAOwAAIAVBEGogAC0AAhABIAMgAC0AA2ohAwwBCwsCQCADIA9PDQAgAyAGIAVBEGogCBACIgBBAnRqIgItAAA6AAAgAi0AA0EBRgRAIAVBEGogAi0AAhABDAELIAUoAhRBH0sNACAFQRBqIAYgAEECdGotAAIQASAFKAIUQSFJDQAgBUEgNgIUCyABQWwgBUHYAGoQCiAFQUBrEApxIAVBKGoQCnEgBUEQahAKcRshCwwJCwAACwALAAALAAsAAAsACwAACwALQWwhCwsgBUHwAGokACALC7UEAQ5/IwBBEGsiBiQAIAZBBGogABAOQVQhBQJAIARB3AtJDQAgBi0ABCEHIANB8ARqQQBB7AAQECEIIAdBDEsNACADQdwJaiIJIAggBkEIaiAGQQxqIAEgAhAxIhAQA0UEQCAGKAIMIgQgB0sNASADQdwFaiEPIANBpAVqIREgAEEEaiESIANBqAVqIQEgBCEFA0AgBSICQX9qIQUgCCACQQJ0aigCAEUNAAsgAkEBaiEOQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgASALaiAKNgIAIAVBAWohBSAKIAxqIQoMAQsLIAEgCjYCAEEAIQUgBigCCCELA0AgBSALRkUEQCABIAUgCWotAAAiDEECdGoiDSANKAIAIg1BAWo2AgAgDyANQQF0aiINIAw6AAEgDSAFOgAAIAVBAWohBQwBCwtBACEBIANBADYCqAUgBEF/cyAHaiEJQQEhBQNAIAUgDk9FBEAgCCAFQQJ0IgtqKAIAIQwgAyALaiABNgIAIAwgBSAJanQgAWohASAFQQFqIQUMAQsLIAcgBEEBaiIBIAJrIgRrQQFqIQgDQEEBIQUgBCAIT0UEQANAIAUgDk9FBEAgBUECdCIJIAMgBEE0bGpqIAMgCWooAgAgBHY2AgAgBUEBaiEFDAELCyAEQQFqIQQMAQsLIBIgByAPIAogESADIAIgARBkIAZBAToABSAGIAc6AAYgACAGKAIENgIACyAQIQULIAZBEGokACAFC8ENAQt/IwBB8ABrIgUkAEFsIQkCQCADQQpJDQAgAi8AACEKIAIvAAIhDCACLwAEIQYgBUEIaiAEEA4CQCADIAYgCiAMampBBmoiDUkNACAFLQAKIQcgBUHYAGogAkEGaiICIAoQBiIJEAMNASAFQUBrIAIgCmoiAiAMEAYiCRADDQEgBUEoaiACIAxqIgIgBhAGIgkQAw0BIAVBEGogAiAGaiADIA1rEAYiCRADDQEgACABaiIOQX1qIQ8gBEEEaiEGQQEhCSAAIAFBA2pBAnYiAmoiCiACaiIMIAJqIg0hAyAMIQQgCiECA0AgCSADIA9JcQRAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAACAGIAVBQGsgBxACQQF0aiIILQAAIQsgBUFAayAILQABEAEgAiALOgAAIAYgBUEoaiAHEAJBAXRqIggtAAAhCyAFQShqIAgtAAEQASAEIAs6AAAgBiAFQRBqIAcQAkEBdGoiCC0AACELIAVBEGogCC0AARABIAMgCzoAACAGIAVB2ABqIAcQAkEBdGoiCC0AACELIAVB2ABqIAgtAAEQASAAIAs6AAEgBiAFQUBrIAcQAkEBdGoiCC0AACELIAVBQGsgCC0AARABIAIgCzoAASAGIAVBKGogBxACQQF0aiIILQAAIQsgBUEoaiAILQABEAEgBCALOgABIAYgBUEQaiAHEAJBAXRqIggtAAAhCyAFQRBqIAgtAAEQASADIAs6AAEgA0ECaiEDIARBAmohBCACQQJqIQIgAEECaiEAIAkgBUHYAGoQDUVxIAVBQGsQDUVxIAVBKGoQDUVxIAVBEGoQDUVxIQkMAQsLIAQgDUsgAiAMS3INAEFsIQkgACAKSw0BIApBfWohCQNAIAVB2ABqEAQgACAJT3JFBEAgBiAFQdgAaiAHEAJBAXRqIggtAAAhCyAFQdgAaiAILQABEAEgACALOgAAIAYgBUHYAGogBxACQQF0aiIILQAAIQsgBUHYAGogCC0AARABIAAgCzoAASAAQQJqIQAMAQsLA0AgBUHYAGoQBCAAIApPckUEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCwNAIAAgCkkEQCAGIAVB2ABqIAcQAkEBdGoiCS0AACEIIAVB2ABqIAktAAEQASAAIAg6AAAgAEEBaiEADAELCyAMQX1qIQADQCAFQUBrEAQgAiAAT3JFBEAgBiAFQUBrIAcQAkEBdGoiCi0AACEJIAVBQGsgCi0AARABIAIgCToAACAGIAVBQGsgBxACQQF0aiIKLQAAIQkgBUFAayAKLQABEAEgAiAJOgABIAJBAmohAgwBCwsDQCAFQUBrEAQgAiAMT3JFBEAgBiAFQUBrIAcQAkEBdGoiAC0AACEKIAVBQGsgAC0AARABIAIgCjoAACACQQFqIQIMAQsLA0AgAiAMSQRAIAYgBUFAayAHEAJBAXRqIgAtAAAhCiAFQUBrIAAtAAEQASACIAo6AAAgAkEBaiECDAELCyANQX1qIQADQCAFQShqEAQgBCAAT3JFBEAgBiAFQShqIAcQAkEBdGoiAi0AACEKIAVBKGogAi0AARABIAQgCjoAACAGIAVBKGogBxACQQF0aiICLQAAIQogBUEoaiACLQABEAEgBCAKOgABIARBAmohBAwBCwsDQCAFQShqEAQgBCANT3JFBEAgBiAFQShqIAcQAkEBdGoiAC0AACECIAVBKGogAC0AARABIAQgAjoAACAEQQFqIQQMAQsLA0AgBCANSQRAIAYgBUEoaiAHEAJBAXRqIgAtAAAhAiAFQShqIAAtAAEQASAEIAI6AAAgBEEBaiEEDAELCwNAIAVBEGoQBCADIA9PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIAYgBUEQaiAHEAJBAXRqIgAtAAAhAiAFQRBqIAAtAAEQASADIAI6AAEgA0ECaiEDDAELCwNAIAVBEGoQBCADIA5PckUEQCAGIAVBEGogBxACQQF0aiIALQAAIQIgBUEQaiAALQABEAEgAyACOgAAIANBAWohAwwBCwsDQCADIA5JBEAgBiAFQRBqIAcQAkEBdGoiAC0AACECIAVBEGogAC0AARABIAMgAjoAACADQQFqIQMMAQsLIAFBbCAFQdgAahAKIAVBQGsQCnEgBUEoahAKcSAFQRBqEApxGyEJDAELQWwhCQsgBUHwAGokACAJC8oCAQR/IwBBIGsiBSQAIAUgBBAOIAUtAAIhByAFQQhqIAIgAxAGIgIQA0UEQCAEQQRqIQIgACABaiIDQX1qIQQDQCAFQQhqEAQgACAET3JFBEAgAiAFQQhqIAcQAkEBdGoiBi0AACEIIAVBCGogBi0AARABIAAgCDoAACACIAVBCGogBxACQQF0aiIGLQAAIQggBUEIaiAGLQABEAEgACAIOgABIABBAmohAAwBCwsDQCAFQQhqEAQgACADT3JFBEAgAiAFQQhqIAcQAkEBdGoiBC0AACEGIAVBCGogBC0AARABIAAgBjoAACAAQQFqIQAMAQsLA0AgACADT0UEQCACIAVBCGogBxACQQF0aiIELQAAIQYgBUEIaiAELQABEAEgACAGOgAAIABBAWohAAwBCwsgAUFsIAVBCGoQChshAgsgBUEgaiQAIAILtgMBCX8jAEEQayIGJAAgBkEANgIMIAZBADYCCEFUIQQCQAJAIANBQGsiDCADIAZBCGogBkEMaiABIAIQMSICEAMNACAGQQRqIAAQDiAGKAIMIgcgBi0ABEEBaksNASAAQQRqIQogBkEAOgAFIAYgBzoABiAAIAYoAgQ2AgAgB0EBaiEJQQEhBANAIAQgCUkEQCADIARBAnRqIgEoAgAhACABIAU2AgAgACAEQX9qdCAFaiEFIARBAWohBAwBCwsgB0EBaiEHQQAhBSAGKAIIIQkDQCAFIAlGDQEgAyAFIAxqLQAAIgRBAnRqIgBBASAEdEEBdSILIAAoAgAiAWoiADYCACAHIARrIQhBACEEAkAgC0EDTQRAA0AgBCALRg0CIAogASAEakEBdGoiACAIOgABIAAgBToAACAEQQFqIQQMAAALAAsDQCABIABPDQEgCiABQQF0aiIEIAg6AAEgBCAFOgAAIAQgCDoAAyAEIAU6AAIgBCAIOgAFIAQgBToABCAEIAg6AAcgBCAFOgAGIAFBBGohAQwAAAsACyAFQQFqIQUMAAALAAsgAiEECyAGQRBqJAAgBAutAQECfwJAQYQgKAIAIABHIAAoAgBBAXYiAyABa0F4aiICQXhxQQhHcgR/IAIFIAMQJ0UNASACQQhqC0EQSQ0AIAAgACgCACICQQFxIAAgAWpBD2pBeHEiASAAa0EBdHI2AgAgASAANgIEIAEgASgCAEEBcSAAIAJBAXZqIAFrIgJBAXRyNgIAQYQgIAEgAkH/////B3FqQQRqQYQgKAIAIABGGyABNgIAIAEQJQsLygIBBX8CQAJAAkAgAEEIIABBCEsbZ0EfcyAAaUEBR2oiAUEESSAAIAF2cg0AIAFBAnRB/B5qKAIAIgJFDQADQCACQXhqIgMoAgBBAXZBeGoiBSAATwRAIAIgBUEIIAVBCEsbZ0Efc0ECdEGAH2oiASgCAEYEQCABIAIoAgQ2AgALDAMLIARBHksNASAEQQFqIQQgAigCBCICDQALC0EAIQMgAUEgTw0BA0AgAUECdEGAH2ooAgAiAkUEQCABQR5LIQIgAUEBaiEBIAJFDQEMAwsLIAIgAkF4aiIDKAIAQQF2QXhqIgFBCCABQQhLG2dBH3NBAnRBgB9qIgEoAgBGBEAgASACKAIENgIACwsgAigCACIBBEAgASACKAIENgIECyACKAIEIgEEQCABIAIoAgA2AgALIAMgAygCAEEBcjYCACADIAAQNwsgAwvhCwINfwV+IwBB8ABrIgckACAHIAAoAvDhASIINgJcIAEgAmohDSAIIAAoAoDiAWohDwJAAkAgBUUEQCABIQQMAQsgACgCxOABIRAgACgCwOABIREgACgCvOABIQ4gAEEBNgKM4QFBACEIA0AgCEEDRwRAIAcgCEECdCICaiAAIAJqQazQAWooAgA2AkQgCEEBaiEIDAELC0FsIQwgB0EYaiADIAQQBhADDQEgB0EsaiAHQRhqIAAoAgAQEyAHQTRqIAdBGGogACgCCBATIAdBPGogB0EYaiAAKAIEEBMgDUFgaiESIAEhBEEAIQwDQCAHKAIwIAcoAixBA3RqKQIAIhRCEIinQf8BcSEIIAcoAkAgBygCPEEDdGopAgAiFUIQiKdB/wFxIQsgBygCOCAHKAI0QQN0aikCACIWQiCIpyEJIBVCIIghFyAUQiCIpyECAkAgFkIQiKdB/wFxIgNBAk8EQAJAIAZFIANBGUlyRQRAIAkgB0EYaiADQSAgBygCHGsiCiAKIANLGyIKEAUgAyAKayIDdGohCSAHQRhqEAQaIANFDQEgB0EYaiADEAUgCWohCQwBCyAHQRhqIAMQBSAJaiEJIAdBGGoQBBoLIAcpAkQhGCAHIAk2AkQgByAYNwNIDAELAkAgA0UEQCACBEAgBygCRCEJDAMLIAcoAkghCQwBCwJAAkAgB0EYakEBEAUgCSACRWpqIgNBA0YEQCAHKAJEQX9qIgMgA0VqIQkMAQsgA0ECdCAHaigCRCIJIAlFaiEJIANBAUYNAQsgByAHKAJINgJMCwsgByAHKAJENgJIIAcgCTYCRAsgF6chAyALBEAgB0EYaiALEAUgA2ohAwsgCCALakEUTwRAIAdBGGoQBBoLIAgEQCAHQRhqIAgQBSACaiECCyAHQRhqEAQaIAcgB0EYaiAUQhiIp0H/AXEQCCAUp0H//wNxajYCLCAHIAdBGGogFUIYiKdB/wFxEAggFadB//8DcWo2AjwgB0EYahAEGiAHIAdBGGogFkIYiKdB/wFxEAggFqdB//8DcWo2AjQgByACNgJgIAcoAlwhCiAHIAk2AmggByADNgJkAkACQAJAIAQgAiADaiILaiASSw0AIAIgCmoiEyAPSw0AIA0gBGsgC0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdBKGogACgCBBATQQAhBCAHQeAAaiEMIAdB5ABqIQoDQCAHQShqEARBAksgBCAXTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEJIAcoAkggBygCREEDdGopAgAiH0IgiKchCCAeQiCIISAgHUIgiKchAgJAIB9CEIinQf8BcSIDQQJPBEACQCAGRSADQRlJckUEQCAIIAdBKGogA0EgIAcoAixrIg0gDSADSxsiDRAFIAMgDWsiA3RqIQggB0EoahAEGiADRQ0BIAdBKGogAxAFIAhqIQgMAQsgB0EoaiADEAUgCGohCCAHQShqEAQaCyAHKQJUISEgByAINgJUIAcgITcDWAwBCwJAIANFBEAgAgRAIAcoAlQhCAwDCyAHKAJYIQgMAQsCQAJAIAdBKGpBARAFIAggAkVqaiIDQQNGBEAgBygCVEF/aiIDIANFaiEIDAELIANBAnQgB2ooAlQiCCAIRWohCCADQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAg2AlQLICCnIQMgCQRAIAdBKGogCRAFIANqIQMLIAkgC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgAmohAgsgB0EoahAEGiAHIAcoAmggAmoiCSADajYCaCAKIAwgCCAJSxsoAgAhDSAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogB0EoaiAfQhiIp0H/AXEQCCEOIAdB8ABqIARBBHRqIgsgCSANaiAIazYCDCALIAg2AgggCyADNgIEIAsgAjYCACAHIA4gH6dB//8DcWo2AkQgBEEBaiEEDAELCyAEIBdIDQEgEkFgaiEYIAdB4ABqIRogB0HkAGohGyABIQMDQCAHQShqEARBAksgBCAFTnJFBEAgBygCQCAHKAI8QQN0aikCACIdQhCIp0H/AXEhCyAHKAJQIAcoAkxBA3RqKQIAIh5CEIinQf8BcSEIIAcoAkggBygCREEDdGopAgAiH0IgiKchCSAeQiCIISAgHUIgiKchDAJAIB9CEIinQf8BcSICQQJPBEACQCAGRSACQRlJckUEQCAJIAdBKGogAkEgIAcoAixrIgogCiACSxsiChAFIAIgCmsiAnRqIQkgB0EoahAEGiACRQ0BIAdBKGogAhAFIAlqIQkMAQsgB0EoaiACEAUgCWohCSAHQShqEAQaCyAHKQJUISEgByAJNgJUIAcgITcDWAwBCwJAIAJFBEAgDARAIAcoAlQhCQwDCyAHKAJYIQkMAQsCQAJAIAdBKGpBARAFIAkgDEVqaiICQQNGBEAgBygCVEF/aiICIAJFaiEJDAELIAJBAnQgB2ooAlQiCSAJRWohCSACQQFGDQELIAcgBygCWDYCXAsLIAcgBygCVDYCWCAHIAk2AlQLICCnIRQgCARAIAdBKGogCBAFIBRqIRQLIAggC2pBFE8EQCAHQShqEAQaCyALBEAgB0EoaiALEAUgDGohDAsgB0EoahAEGiAHIAcoAmggDGoiGSAUajYCaCAbIBogCSAZSxsoAgAhHCAHIAdBKGogHUIYiKdB/wFxEAggHadB//8DcWo2AjwgByAHQShqIB5CGIinQf8BcRAIIB6nQf//A3FqNgJMIAdBKGoQBBogByAHQShqIB9CGIinQf8BcRAIIB+nQf//A3FqNgJEIAcgB0HwAGogBEEDcUEEdGoiDSkDCCIdNwPIASAHIA0pAwAiHjcDwAECQAJAAkAgBygCvAEiDiAepyICaiIWIBNLDQAgAyAHKALEASIKIAJqIgtqIBhLDQAgEiADayALQSBqTw0BCyAHIAcpA8gBNwMQIAcgBykDwAE3AwggAyASIAdBCGogB0G8AWogEyAPIBUgERAeIQsMAQsgAiADaiEIIAMgDhAHIAJBEU8EQCADQRBqIQIDQCACIA5BEGoiDhAHIAJBEGoiAiAISQ0ACwsgCCAdpyIOayECIAcgFjYCvAEgDiAIIA9rSwRAIA4gCCAVa0sEQEFsIQsMAgsgESACIA9rIgJqIhYgCmogEU0EQCAIIBYgChAPGgwCCyAIIBZBACACaxAPIQggByACIApqIgo2AsQBIAggAmshCCAPIQILIA5BEE8EQCAIIApqIQoDQCAIIAIQByACQRBqIQIgCEEQaiIIIApJDQALDAELAkAgDkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgDkECdCIKQcAeaigCAGoiAhAXIAIgCkHgHmooAgBrIQIgBygCxAEhCgwBCyAIIAIQDAsgCkEJSQ0AIAggCmohCiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAKSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAKSQ0ACwsgCxADBEAgCyEQDAQFIA0gDDYCACANIBkgHGogCWs2AgwgDSAJNgIIIA0gFDYCBCAEQQFqIQQgAyALaiEDDAILAAsLIAQgBUgNASAEIBdrIQtBACEEA0AgCyAFSARAIAcgB0HwAGogC0EDcUEEdGoiAikDCCIdNwPIASAHIAIpAwAiHjcDwAECQAJAAkAgBygCvAEiDCAepyICaiIKIBNLDQAgAyAHKALEASIJIAJqIhBqIBhLDQAgEiADayAQQSBqTw0BCyAHIAcpA8gBNwMgIAcgBykDwAE3AxggAyASIAdBGGogB0G8AWogEyAPIBUgERAeIRAMAQsgAiADaiEIIAMgDBAHIAJBEU8EQCADQRBqIQIDQCACIAxBEGoiDBAHIAJBEGoiAiAISQ0ACwsgCCAdpyIGayECIAcgCjYCvAEgBiAIIA9rSwRAIAYgCCAVa0sEQEFsIRAMAgsgESACIA9rIgJqIgwgCWogEU0EQCAIIAwgCRAPGgwCCyAIIAxBACACaxAPIQggByACIAlqIgk2AsQBIAggAmshCCAPIQILIAZBEE8EQCAIIAlqIQYDQCAIIAIQByACQRBqIQIgCEEQaiIIIAZJDQALDAELAkAgBkEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgBkECdCIGQcAeaigCAGoiAhAXIAIgBkHgHmooAgBrIQIgBygCxAEhCQwBCyAIIAIQDAsgCUEJSQ0AIAggCWohBiAIQQhqIgggAkEIaiICa0EPTARAA0AgCCACEAwgAkEIaiECIAhBCGoiCCAGSQ0ADAIACwALA0AgCCACEAcgAkEQaiECIAhBEGoiCCAGSQ0ACwsgEBADDQMgC0EBaiELIAMgEGohAwwBCwsDQCAEQQNHBEAgACAEQQJ0IgJqQazQAWogAiAHaigCVDYCACAEQQFqIQQMAQsLIAcoArwBIQgLQbp/IRAgEyAIayIAIBIgA2tLDQAgAwR/IAMgCCAAEAsgAGoFQQALIAFrIRALIAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY0AAQMyIFEAMiBg0AIANBHzYCfCADIANB/ABqIANB+ABqIAQgBCAFaiAGGyIEIAEgAmoiAiAEaxAVIgUQAw0AIAMoAnwiBkEfSw0AIAMoAngiB0EJTw0AIABBiCBqIAMgBkGAC0GADCAHEBggA0E0NgJ8IAMgA0H8AGogA0H4AGogBCAFaiIEIAIgBGsQFSIFEAMNACADKAJ8IgZBNEsNACADKAJ4IgdBCk8NACAAQZAwaiADIAZBgA1B4A4gBxAYIANBIzYCfCADIANB/ABqIANB+ABqIAQgBWoiBCACIARrEBUiBRADDQAgAygCfCIGQSNLDQAgAygCeCIHQQpPDQAgACADIAZBwBBB0BEgBxAYIAQgBWoiBEEMaiIFIAJLDQAgAiAFayEFQQAhAgNAIAJBA0cEQCAEKAAAIgZBf2ogBU8NAiAAIAJBAnRqQZzQAWogBjYCACACQQFqIQIgBEEEaiEEDAELCyAEIAFrIQgLIANBgAFqJAAgCAtGAQN/IABBCGohAyAAKAIEIQJBACEAA0AgACACdkUEQCABIAMgAEEDdGotAAJBFktqIQEgAEEBaiEADAELCyABQQggAmt0C4YDAQV/Qbh/IQcCQCADRQ0AIAItAAAiBEUEQCABQQA2AgBBAUG4fyADQQFGGw8LAn8gAkEBaiIFIARBGHRBGHUiBkF/Sg0AGiAGQX9GBEAgA0EDSA0CIAUvAABBgP4BaiEEIAJBA2oMAQsgA0ECSA0BIAItAAEgBEEIdHJBgIB+aiEEIAJBAmoLIQUgASAENgIAIAVBAWoiASACIANqIgNLDQBBbCEHIABBEGogACAFLQAAIgVBBnZBI0EJIAEgAyABa0HAEEHQEUHwEiAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBmCBqIABBCGogBUEEdkEDcUEfQQggASABIAZqIAgbIgEgAyABa0GAC0GADEGAFyAAKAKM4QEgACgCnOIBIAQQHyIGEAMiCA0AIABBoDBqIABBBGogBUECdkEDcUE0QQkgASABIAZqIAgbIgEgAyABa0GADUHgDkGQGSAAKAKM4QEgACgCnOIBIAQQHyIAEAMNACAAIAFqIAJrIQcLIAcLrQMBCn8jAEGABGsiCCQAAn9BUiACQf8BSw0AGkFUIANBDEsNABogAkEBaiELIABBBGohCUGAgAQgA0F/anRBEHUhCkEAIQJBASEEQQEgA3QiB0F/aiIMIQUDQCACIAtGRQRAAkAgASACQQF0Ig1qLwEAIgZB//8DRgRAIAkgBUECdGogAjoAAiAFQX9qIQVBASEGDAELIARBACAKIAZBEHRBEHVKGyEECyAIIA1qIAY7AQAgAkEBaiECDAELCyAAIAQ7AQIgACADOwEAIAdBA3YgB0EBdmpBA2ohBkEAIQRBACECA0AgBCALRkUEQCABIARBAXRqLgEAIQpBACEAA0AgACAKTkUEQCAJIAJBAnRqIAQ6AAIDQCACIAZqIAxxIgIgBUsNAAsgAEEBaiEADAELCyAEQQFqIQQMAQsLQX8gAg0AGkEAIQIDfyACIAdGBH9BAAUgCCAJIAJBAnRqIgAtAAJBAXRqIgEgAS8BACIBQQFqOwEAIAAgAyABEBRrIgU6AAMgACABIAVB/wFxdCAHazsBACACQQFqIQIMAQsLCyEFIAhBgARqJAAgBQvjBgEIf0FsIQcCQCACQQNJDQACQAJAAkACQCABLQAAIgNBA3EiCUEBaw4DAwEAAgsgACgCiOEBDQBBYg8LIAJBBUkNAkEDIQYgASgAACEFAn8CQAJAIANBAnZBA3EiCEF+aiIEQQFNBEAgBEEBaw0BDAILIAVBDnZB/wdxIQQgBUEEdkH/B3EhAyAIRQwCCyAFQRJ2IQRBBCEGIAVBBHZB//8AcSEDQQAMAQsgBUEEdkH//w9xIgNBgIAISw0DIAEtAARBCnQgBUEWdnIhBEEFIQZBAAshBSAEIAZqIgogAksNAgJAIANBgQZJDQAgACgCnOIBRQ0AQQAhAgNAIAJBg4ABSw0BIAJBQGshAgwAAAsACwJ/IAlBA0YEQCABIAZqIQEgAEHw4gFqIQIgACgCDCEGIAUEQCACIAMgASAEIAYQXwwCCyACIAMgASAEIAYQXQwBCyAAQbjQAWohAiABIAZqIQEgAEHw4gFqIQYgAEGo0ABqIQggBQRAIAggBiADIAEgBCACEF4MAQsgCCAGIAMgASAEIAIQXAsQAw0CIAAgAzYCgOIBIABBATYCiOEBIAAgAEHw4gFqNgLw4QEgCUECRgRAIAAgAEGo0ABqNgIMCyAAIANqIgBBiOMBakIANwAAIABBgOMBakIANwAAIABB+OIBakIANwAAIABB8OIBakIANwAAIAoPCwJ/AkACQAJAIANBAnZBA3FBf2oiBEECSw0AIARBAWsOAgACAQtBASEEIANBA3YMAgtBAiEEIAEvAABBBHYMAQtBAyEEIAEQIUEEdgsiAyAEaiIFQSBqIAJLBEAgBSACSw0CIABB8OIBaiABIARqIAMQCyEBIAAgAzYCgOIBIAAgATYC8OEBIAEgA2oiAEIANwAYIABCADcAECAAQgA3AAggAEIANwAAIAUPCyAAIAM2AoDiASAAIAEgBGo2AvDhASAFDwsCfwJAAkACQCADQQJ2QQNxQX9qIgRBAksNACAEQQFrDgIAAgELQQEhByADQQN2DAILQQIhByABLwAAQQR2DAELIAJBBEkgARAhIgJBj4CAAUtyDQFBAyEHIAJBBHYLIQIgAEHw4gFqIAEgB2otAAAgAkEgahAQIQEgACACNgKA4gEgACABNgLw4QEgB0EBaiEHCyAHC0sAIABC+erQ0OfJoeThADcDICAAQgA3AxggAELP1tO+0ser2UI3AxAgAELW64Lu6v2J9eAANwMIIABCADcDACAAQShqQQBBKBAQGgviAgICfwV+IABBKGoiASAAKAJIaiECAn4gACkDACIDQiBaBEAgACkDECIEQgeJIAApAwgiBUIBiXwgACkDGCIGQgyJfCAAKQMgIgdCEol8IAUQGSAEEBkgBhAZIAcQGQwBCyAAKQMYQsXP2bLx5brqJ3wLIAN8IQMDQCABQQhqIgAgAk0EQEIAIAEpAAAQCSADhUIbiUKHla+vmLbem55/fkLj3MqV/M7y9YV/fCEDIAAhAQwBCwsCQCABQQRqIgAgAksEQCABIQAMAQsgASgAAK1Ch5Wvr5i23puef34gA4VCF4lCz9bTvtLHq9lCfkL5893xmfaZqxZ8IQMLA0AgACACSQRAIAAxAABCxc/ZsvHluuonfiADhUILiUKHla+vmLbem55/fiEDIABBAWohAAwBCwsgA0IhiCADhULP1tO+0ser2UJ+IgNCHYggA4VC+fPd8Zn2masWfiIDQiCIIAOFC+8CAgJ/BH4gACAAKQMAIAKtfDcDAAJAAkAgACgCSCIDIAJqIgRBH00EQCABRQ0BIAAgA2pBKGogASACECAgACgCSCACaiEEDAELIAEgAmohAgJ/IAMEQCAAQShqIgQgA2ogAUEgIANrECAgACAAKQMIIAQpAAAQCTcDCCAAIAApAxAgACkAMBAJNwMQIAAgACkDGCAAKQA4EAk3AxggACAAKQMgIABBQGspAAAQCTcDICAAKAJIIQMgAEEANgJIIAEgA2tBIGohAQsgAUEgaiACTQsEQCACQWBqIQMgACkDICEFIAApAxghBiAAKQMQIQcgACkDCCEIA0AgCCABKQAAEAkhCCAHIAEpAAgQCSEHIAYgASkAEBAJIQYgBSABKQAYEAkhBSABQSBqIgEgA00NAAsgACAFNwMgIAAgBjcDGCAAIAc3AxAgACAINwMICyABIAJPDQEgAEEoaiABIAIgAWsiBBAgCyAAIAQ2AkgLCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQEBogAwVBun8LCy8BAX8gAEUEQEG2f0EAIAMbDwtBun8hBCADIAFNBH8gACACIAMQCxogAwVBun8LC6gCAQZ/IwBBEGsiByQAIABB2OABaikDAEKAgIAQViEIQbh/IQUCQCAEQf//B0sNACAAIAMgBBBCIgUQAyIGDQAgACgCnOIBIQkgACAHQQxqIAMgAyAFaiAGGyIKIARBACAFIAYbayIGEEAiAxADBEAgAyEFDAELIAcoAgwhBCABRQRAQbp/IQUgBEEASg0BCyAGIANrIQUgAyAKaiEDAkAgCQRAIABBADYCnOIBDAELAkACQAJAIARBBUgNACAAQdjgAWopAwBCgICACFgNAAwBCyAAQQA2ApziAQwBCyAAKAIIED8hBiAAQQA2ApziASAGQRRPDQELIAAgASACIAMgBSAEIAgQOSEFDAELIAAgASACIAMgBSAEIAgQOiEFCyAHQRBqJAAgBQtnACAAQdDgAWogASACIAAoAuzhARAuIgEQAwRAIAEPC0G4fyECAkAgAQ0AIABB7OABaigCACIBBEBBYCECIAAoApjiASABRw0BC0EAIQIgAEHw4AFqKAIARQ0AIABBkOEBahBDCyACCycBAX8QVyIERQRAQUAPCyAEIAAgASACIAMgBBBLEE8hACAEEFYgAAs/AQF/AkACQAJAIAAoAqDiAUEBaiIBQQJLDQAgAUEBaw4CAAECCyAAEDBBAA8LIABBADYCoOIBCyAAKAKU4gELvAMCB38BfiMAQRBrIgkkAEG4fyEGAkAgBCgCACIIQQVBCSAAKALs4QEiBRtJDQAgAygCACIHQQFBBSAFGyAFEC8iBRADBEAgBSEGDAELIAggBUEDakkNACAAIAcgBRBJIgYQAw0AIAEgAmohCiAAQZDhAWohCyAIIAVrIQIgBSAHaiEHIAEhBQNAIAcgAiAJECwiBhADDQEgAkF9aiICIAZJBEBBuH8hBgwCCyAJKAIAIghBAksEQEFsIQYMAgsgB0EDaiEHAn8CQAJAAkAgCEEBaw4CAgABCyAAIAUgCiAFayAHIAYQSAwCCyAFIAogBWsgByAGEEcMAQsgBSAKIAVrIActAAAgCSgCCBBGCyIIEAMEQCAIIQYMAgsgACgC8OABBEAgCyAFIAgQRQsgAiAGayECIAYgB2ohByAFIAhqIQUgCSgCBEUNAAsgACkD0OABIgxCf1IEQEFsIQYgDCAFIAFrrFINAQsgACgC8OABBEBBaiEGIAJBBEkNASALEEQhDCAHKAAAIAynRw0BIAdBBGohByACQXxqIQILIAMgBzYCACAEIAI2AgAgBSABayEGCyAJQRBqJAAgBgsuACAAECsCf0EAQQAQAw0AGiABRSACRXJFBEBBYiAAIAEgAhA9EAMNARoLQQALCzcAIAEEQCAAIAAoAsTgASABKAIEIAEoAghqRzYCnOIBCyAAECtBABADIAFFckUEQCAAIAEQWwsL0QIBB38jAEEQayIGJAAgBiAENgIIIAYgAzYCDCAFBEAgBSgCBCEKIAUoAgghCQsgASEIAkACQANAIAAoAuzhARAWIQsCQANAIAQgC0kNASADKAAAQXBxQdDUtMIBRgRAIAMgBBAiIgcQAw0EIAQgB2shBCADIAdqIQMMAQsLIAYgAzYCDCAGIAQ2AggCQCAFBEAgACAFEE5BACEHQQAQA0UNAQwFCyAAIAogCRBNIgcQAw0ECyAAIAgQUCAMQQFHQQAgACAIIAIgBkEMaiAGQQhqEEwiByIDa0EAIAMQAxtBCkdyRQRAQbh/IQcMBAsgBxADDQMgAiAHayECIAcgCGohCEEBIQwgBigCDCEDIAYoAgghBAwBCwsgBiADNgIMIAYgBDYCCEG4fyEHIAQNASAIIAFrIQcMAQsgBiADNgIMIAYgBDYCCAsgBkEQaiQAIAcLRgECfyABIAAoArjgASICRwRAIAAgAjYCxOABIAAgATYCuOABIAAoArzgASEDIAAgATYCvOABIAAgASADIAJrajYCwOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ",Lo=new WeakMap;let Ro=0,Do;class di extends ts{constructor(e){super(e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new dv,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER<"u"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature("texture-compression-astc"),etc1Supported:!1,etc2Supported:e.hasFeature("texture-compression-etc2"),dxtSupported:e.hasFeature("texture-compression-bc"),bptcSupported:!1,pvrtcSupported:!1}:(this.workerConfig={astcSupported:e.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:e.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:e.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:e.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:e.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:e.extensions.has("WEBGL_compressed_texture_pvrtc")||e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},e.capabilities.isWebGL2&&(this.workerConfig.etc1Supported=!1)),this}init(){if(!this.transcoderPending){const e=new xo(this.manager);e.setPath(this.transcoderPath),e.setWithCredentials(this.withCredentials);const t=e.loadAsync("basis_transcoder.js"),i=new xo(this.manager);i.setPath(this.transcoderPath),i.setResponseType("arraybuffer"),i.setWithCredentials(this.withCredentials);const n=i.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([t,n]).then(([r,o])=>{const a=di.BasisWorker.toString(),l=["/* constants */","let _EngineFormat = "+JSON.stringify(di.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(di.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(di.BasisFormat),"/* basis_transcoder.js */",r,"/* worker */",a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([l])),this.transcoderBinary=o,this.workerPool.setWorkerCreator(()=>{const c=new Worker(this.workerSourceURL),h=this.transcoderBinary.slice(0);return c.postMessage({type:"init",config:this.workerConfig,transcoderBinary:h},[h]),c})}),Ro>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),Ro++}return this.transcoderPending}load(e,t,i,n){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");const r=new xo(this.manager);r.setResponseType("arraybuffer"),r.setWithCredentials(this.withCredentials),r.load(e,o=>{if(Lo.has(o))return Lo.get(o).promise.then(t).catch(n);this._createTexture(o).then(a=>t?t(a):null).catch(n)},i,n)}_createTextureFrom(e,t){const{faces:i,width:n,height:r,format:o,type:a,error:l,dfdFlags:c}=e;if(a==="error")return Promise.reject(l);let h;if(t.faceCount===6)h=new AE(i,o,vt);else{const d=i[0].mipmaps;h=t.layerCount>1?new pE(d,n,r,t.layerCount,o,vt):new Fr(d,n,r,o,vt)}return h.minFilter=i[0].mipmaps.length===1?gt:Hi,h.magFilter=gt,h.generateMipmaps=!1,h.needsUpdate=!0,h.colorSpace=sd(t),h.premultiplyAlpha=!!(c&fv),h}async _createTexture(e,t={}){const i=vv(new Uint8Array(e));if(i.vkFormat!==gv)return Iv(i);const n=t,r=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:e,taskConfig:n},[e])).then(o=>this._createTextureFrom(o.data,i));return Lo.set(e,{promise:r}),r}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),Ro--,this}}di.BasisFormat={ETC1S:0,UASTC_4x4:1};di.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16};di.EngineFormat={RGBAFormat:bt,RGBA_ASTC_4x4_Format:Ko,RGBA_BPTC_Format:dr,RGBA_ETC2_EAC_Format:Jo,RGBA_PVRTC_4BPPV1_Format:Xo,RGBA_S3TC_DXT5_Format:hr,RGB_ETC1_Format:ua,RGB_ETC2_Format:$o,RGB_PVRTC_4BPPV1_Format:qo,RGB_S3TC_DXT1_Format:cr};di.BasisWorker=function(){let s,e,t;const i=_EngineFormat,n=_TranscoderFormat,r=_BasisFormat;self.addEventListener("message",function(g){const E=g.data;switch(E.type){case"init":s=E.config,o(E.transcoderBinary);break;case"transcode":e.then(()=>{try{const{faces:A,buffers:f,width:y,height:v,hasAlpha:b,format:T,dfdFlags:S}=a(E.buffer);self.postMessage({type:"transcode",id:E.id,faces:A,width:y,height:v,hasAlpha:b,format:T,dfdFlags:S},f)}catch(A){console.error(A),self.postMessage({type:"error",id:E.id,error:A.message})}});break}});function o(g){e=new Promise(E=>{t={wasmBinary:g,onRuntimeInitialized:E},BASIS(t)}).then(()=>{t.initializeBasis(),t.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function a(g){const E=new t.KTX2File(new Uint8Array(g));function A(){E.close(),E.delete()}if(!E.isValid())throw A(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");const f=E.isUASTC()?r.UASTC_4x4:r.ETC1S,y=E.getWidth(),v=E.getHeight(),b=E.getLayers()||1,T=E.getLevels(),S=E.getFaces(),M=E.getHasAlpha(),D=E.getDFDFlags(),{transcoderFormat:_,engineFormat:w}=d(f,y,v,M);if(!y||!v||!T)throw A(),new Error("THREE.KTX2Loader:	Invalid texture");if(!E.startTranscoding())throw A(),new Error("THREE.KTX2Loader: .startTranscoding failed");const N=[],H=[];for(let $=0;$<S;$++){const R=[];for(let U=0;U<T;U++){const z=[];let q,W;for(let X=0;X<b;X++){const K=E.getImageLevelInfo(U,X,$);$===0&&U===0&&X===0&&(K.origWidth%4!==0||K.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),T>1?(q=K.origWidth,W=K.origHeight):(q=K.width,W=K.height);const le=new Uint8Array(E.getImageTranscodedSizeInBytes(U,X,0,_));if(!E.transcodeImage(le,U,X,$,_,0,-1,-1))throw A(),new Error("THREE.KTX2Loader: .transcodeImage failed.");z.push(le)}const Y=p(z);R.push({data:Y,width:q,height:W}),H.push(Y.buffer)}N.push({mipmaps:R,width:y,height:v,format:w})}return A(),{faces:N,buffers:H,width:y,height:v,hasAlpha:M,format:w,dfdFlags:D}}const l=[{if:"astcSupported",basisFormat:[r.UASTC_4x4],transcoderFormat:[n.ASTC_4x4,n.ASTC_4x4],engineFormat:[i.RGBA_ASTC_4x4_Format,i.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[n.BC7_M5,n.BC7_M5],engineFormat:[i.RGBA_BPTC_Format,i.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[n.BC1,n.BC3],engineFormat:[i.RGB_S3TC_DXT1_Format,i.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[n.ETC1,n.ETC2],engineFormat:[i.RGB_ETC2_Format,i.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[n.ETC1],engineFormat:[i.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[n.PVRTC1_4_RGB,n.PVRTC1_4_RGBA],engineFormat:[i.RGB_PVRTC_4BPPV1_Format,i.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],c=l.sort(function(g,E){return g.priorityETC1S-E.priorityETC1S}),h=l.sort(function(g,E){return g.priorityUASTC-E.priorityUASTC});function d(g,E,A,f){let y,v;const b=g===r.ETC1S?c:h;for(let T=0;T<b.length;T++){const S=b[T];if(s[S.if]&&S.basisFormat.includes(g)&&!(f&&S.transcoderFormat.length<2)&&!(S.needsPowerOfTwo&&!(u(E)&&u(A))))return y=S.transcoderFormat[f?1:0],v=S.engineFormat[f?1:0],{transcoderFormat:y,engineFormat:v}}return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),y=n.RGBA32,v=i.RGBAFormat,{transcoderFormat:y,engineFormat:v}}function u(g){return g<=2?!0:(g&g-1)===0&&g!==0}function p(g){if(g.length===1)return g[0];let E=0;for(let y=0;y<g.length;y++){const v=g[y];E+=v.byteLength}const A=new Uint8Array(E);let f=0;for(let y=0;y<g.length;y++){const v=g[y];A.set(v,f),f+=v.byteLength}return A}};const _v=new Set([bt,Fn,Un]),No={[td]:bt,[jh]:bt,[Xh]:bt,[$h]:bt,[ed]:Fn,[Kh]:Fn,[Yh]:Fn,[qh]:Fn,[Zh]:Un,[Jh]:Un,[Wh]:Un,[zh]:Un,[nd]:Er,[id]:Er},Po={[td]:Wt,[jh]:Si,[Xh]:vt,[$h]:vt,[ed]:Wt,[Kh]:Si,[Yh]:vt,[qh]:vt,[Zh]:Wt,[Jh]:Si,[Wh]:vt,[zh]:vt,[nd]:vt,[id]:vt};async function Iv(s){const{vkFormat:e}=s;if(No[e]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");let t;s.supercompressionScheme===Uc&&(Do||(Do=new Promise(async r=>{const o=new yv;await o.init(),r(o)})),t=await Do);const i=[];for(let r=0;r<s.levels.length;r++){const o=Math.max(1,s.pixelWidth>>r),a=Math.max(1,s.pixelHeight>>r),l=s.pixelDepth?Math.max(1,s.pixelDepth>>r):0,c=s.levels[r];let h;if(s.supercompressionScheme===uv)h=c.levelData;else if(s.supercompressionScheme===Uc)h=t.decode(c.levelData,c.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let d;Po[e]===Wt?d=new Float32Array(h.buffer,h.byteOffset,h.byteLength/Float32Array.BYTES_PER_ELEMENT):Po[e]===Si?d=new Uint16Array(h.buffer,h.byteOffset,h.byteLength/Uint16Array.BYTES_PER_ELEMENT):d=h,i.push({data:d,width:o,height:a,depth:l})}let n;if(_v.has(No[e]))n=s.pixelDepth===0?new Dh(i[0].data,s.pixelWidth,s.pixelHeight):new mh(i[0].data,s.pixelWidth,s.pixelHeight,s.pixelDepth);else{if(s.pixelDepth>0)throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");n=new Fr(i,s.pixelWidth,s.pixelHeight)}return n.mipmaps=i,n.type=Po[e],n.format=No[e],n.colorSpace=sd(s),n.needsUpdate=!0,Promise.resolve(n)}function sd(s){const e=s.dataFormatDescriptor[0];return e.colorPrimaries===Av?e.transferFunction===Fc?st:ui:e.colorPrimaries===mv?e.transferFunction===Fc?Nr:Is:(e.colorPrimaries===pv||console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${e.colorPrimaries}"`),Ot)}class xv{constructor(e,t,i,n){m(this,"manifest",null);m(this,"group",null);m(this,"pendingLow",[]);m(this,"pendingHigh",[]);m(this,"activeLoads",0);m(this,"activeLowLoads",0);m(this,"activeHighLoads",0);m(this,"maxConcurrent",6);m(this,"maxHighWhileLow",2);m(this,"defaultMaxConcurrent",6);m(this,"defaultMaxHighWhileLow",2);m(this,"lastUpdate",0);m(this,"tilesMap",new Map);m(this,"highestLevel",null);m(this,"lowLevel",null);m(this,"lowReadyCount",0);m(this,"lowTotalCount",0);m(this,"lowFullyReady",!1);m(this,"highSeeded",!1);m(this,"tilesVisible",!1);m(this,"tilesLoadedCount",0);m(this,"tilesLoadingCount",0);m(this,"tilesQueuedCount",0);m(this,"tilesFailedCount",0);m(this,"tilesRetryCount",0);m(this,"lastTileUrl","");m(this,"lastError","");m(this,"lruLimit",64);m(this,"highReady",!1);m(this,"fallbackVisible",!1);m(this,"useKtx2",!1);m(this,"ktx2Loader");this.scene=e,this.renderer=t,this.onFirstDraw=i,this.onHighReady=n,this.ktx2Loader=new di,this.ktx2Loader.setTranscoderPath("/assets/basis/"),this.ktx2Loader.detectSupport(t),this.ktx2Loader.setWorkerLimit(2)}async load(e,t){if(this.manifest=e,this.useKtx2=e.tileFormat==="ktx2",this.fallbackVisible=!!(t!=null&&t.fallbackVisible),this.highestLevel=e.levels.reduce((n,r)=>r.z>n.z?r:n),!this.highestLevel)throw new Error("manifest 缺少 level");this.lruLimit=Math.max(64,Math.min(this.highestLevel.cols*this.highestLevel.rows,256));const i=e.levels.filter(n=>n.z<this.highestLevel.z);if(this.lowLevel=i.length?i.reduce((n,r)=>r.z>n.z?r:n):null,this.lowReadyCount=0,this.lowTotalCount=this.lowLevel?this.lowLevel.cols*this.lowLevel.rows:0,this.lowFullyReady=this.lowTotalCount===0,this.highSeeded=!1,this.tilesVisible=!1,this.tilesLoadedCount=0,this.tilesLoadingCount=0,this.tilesQueuedCount=0,this.tilesFailedCount=0,this.tilesRetryCount=0,this.activeLoads=0,this.activeLowLoads=0,this.activeHighLoads=0,this.group&&this.scene.remove(this.group),this.group=new nn,this.group.renderOrder=1,this.scene.add(this.group),!this.fallbackVisible){const n=e.levels.find(r=>r.z===0);if(!n)throw new Error("manifest 缺少 z0");await this.loadSingleTile(n.z,0,0,"low")}this.lowLevel&&this.enqueueLevel(this.lowLevel,"low")}setPerformanceMode(e){e==="throttle"?(this.maxConcurrent=2,this.maxHighWhileLow=0):(this.maxConcurrent=this.defaultMaxConcurrent,this.maxHighWhileLow=this.defaultMaxHighWhileLow)}dispose(){this.tilesMap.forEach(e=>{var t;(t=e.texture)==null||t.dispose(),e.mesh&&(e.mesh.geometry.dispose(),e.mesh.material.dispose())}),this.tilesMap.clear(),this.group&&(this.scene.remove(this.group),this.group=null),this.ktx2Loader.dispose()}update(e){if(!this.manifest||!this.highestLevel)return;const t=performance.now();if(t-this.lastUpdate<150)return;if(this.lastUpdate=t,(!this.lowLevel||this.lowFullyReady||this.highSeeded)&&this.highestLevel){const o=this.computeNeededTiles(e,this.highestLevel);for(const{col:a,row:l,rank:c}of o){const h=`${this.highestLevel.z}_${a}_${l}`;let d=this.tilesMap.get(h);d||(d={z:this.highestLevel.z,col:a,row:l,url:this.buildTileUrl(this.highestLevel.z,a,l,this.useKtx2),state:"empty",priority:"high",lastUsed:t,failCount:0},this.tilesMap.set(h,d)),d.priority="high",d.priorityRank=c,d.lastUsed=t,d.state==="empty"&&!d.retryTimer&&(d.state="loading",this.pendingHigh.push(d))}}const n=Array.from(this.tilesMap.values()).filter(o=>o.state==="loading").length,r=Array.from(this.tilesMap.values()).filter(o=>o.state==="ready").length;if(this.lowLevel&&!this.lowFullyReady){const o=Array.from(this.tilesMap.values()).filter(a=>a.z===this.lowLevel.z&&a.state==="loading").length;this.pendingLow.length===0&&o===0&&(this.lowFullyReady=!0)}this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.tilesLoadingCount=n,this.tilesLoadedCount=r,this.processQueue(),this.runLru(t)}prime(e){if(!this.manifest||!this.highestLevel)return;e.updateMatrixWorld(!0);const t=performance.now();if(this.highestLevel&&!this.highSeeded){const i=this.computeNeededTiles(e,this.highestLevel);if(i.length>0){for(const{col:n,row:r,rank:o}of i){const a=`${this.highestLevel.z}_${n}_${r}`;let l=this.tilesMap.get(a);l||(l={z:this.highestLevel.z,col:n,row:r,url:this.buildTileUrl(this.highestLevel.z,n,r,this.useKtx2),state:"empty",priority:"high",lastUsed:t,failCount:0},this.tilesMap.set(a,l)),l.priority="high",l.priorityRank=o,l.lastUsed=t,l.state==="empty"&&!l.retryTimer&&(l.state="loading",this.pendingHigh.push(l))}this.highSeeded=!0}}this.reprioritizeLowQueue(e),this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.tilesLoadingCount=Array.from(this.tilesMap.values()).filter(i=>i.state==="loading").length,this.processQueue()}getStatus(){var e,t;return{tilesVisible:this.tilesVisible,fallbackVisible:this.fallbackVisible,tilesLoadedCount:this.tilesLoadedCount,tilesLoadingCount:this.tilesLoadingCount,tilesQueuedCount:this.tilesQueuedCount,tilesFailedCount:this.tilesFailedCount,tilesRetryCount:this.tilesRetryCount,lastTileUrl:this.lastTileUrl,lastError:this.lastError,canvasSize:"",canvasScale:1,maxLevel:this.highestLevel?`${this.highestLevel.cols}x${this.highestLevel.rows}`:"",highReady:this.highReady,zMax:((e=this.highestLevel)==null?void 0:e.z)??0,levels:this.manifest?this.manifest.levels.map(i=>i.z).join(","):"",lowReady:this.lowFullyReady,lowLevel:((t=this.lowLevel)==null?void 0:t.z)??""}}enqueueLevel(e,t){const i=performance.now();for(let n=0;n<e.rows;n++)for(let r=0;r<e.cols;r++){const o=`${e.z}_${r}_${n}`;let a=this.tilesMap.get(o);a||(a={z:e.z,col:r,row:n,url:this.buildTileUrl(e.z,r,n,this.useKtx2),state:"empty",priority:t,lastUsed:i,failCount:0},this.tilesMap.set(o,a)),a.priority=t,a.lastUsed=i,a.state==="empty"&&!a.retryTimer&&(a.state="loading",t==="low"?this.pendingLow.push(a):this.pendingHigh.push(a))}this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.tilesLoadingCount=Array.from(this.tilesMap.values()).filter(n=>n.state==="loading").length,this.processQueue()}processQueue(){for(this.sortPendingHighQueue();this.activeLoads<this.maxConcurrent&&(this.pendingLow.length>0||this.pendingHigh.length>0);){const e=this.pendingLow.length>0,i=this.pendingHigh.length>0&&(!e||this.activeHighLoads<this.maxHighWhileLow)?this.pendingHigh.shift():this.pendingLow.shift();this.loadTile(i)}}async loadTile(e){(e.failCount===void 0||e.failCount===null)&&(e.failCount=0),e.priority||(e.priority="high"),this.activeLoads+=1,e.priority==="high"?this.activeHighLoads+=1:this.activeLowLoads+=1,this.lastTileUrl=e.url;try{const t=await this.fetchTileTexture(e);e.texture=t,e.state="ready",e.failCount=0,e.retryTimer&&(clearTimeout(e.retryTimer),e.retryTimer=void 0),this.drawTile(e),this.tilesLoadedCount+=1,this.lowLevel&&e.z===this.lowLevel.z&&(this.lowReadyCount+=1,this.lowReadyCount>=this.lowTotalCount&&(this.lowFullyReady=!0))}catch(t){this.lastError=t instanceof Error?t.message:String(t),e.state="empty",e.failCount+=1,this.tilesFailedCount+=1;const i=Math.min(1e3*Math.pow(2,Math.max(0,e.failCount-1)),15e3);this.scheduleRetry(e,i)}finally{this.activeLoads-=1,e.priority==="high"?this.activeHighLoads=Math.max(0,this.activeHighLoads-1):this.activeLowLoads=Math.max(0,this.activeLowLoads-1),this.processQueue()}}scheduleRetry(e,t){e.retryTimer||(this.tilesRetryCount+=1,e.retryTimer=window.setTimeout(()=>{e.retryTimer=void 0,e.state==="empty"&&(e.priority==="low"?this.pendingLow.push(e):this.pendingHigh.push(e),this.tilesQueuedCount=this.pendingLow.length+this.pendingHigh.length,this.processQueue())},t))}async fetchTileTexture(e){const t=`${this.manifest.baseUrl}/z${e.z}/${e.col}_${e.row}`,i=`${t}.ktx2`,n=`${t}.jpg`;if(this.useKtx2)try{const o=await this.loadKtx2Texture(i,e.priority);return o.name=i,o}catch(o){this.lastError=o instanceof Error?o.message:String(o)}const r=await this.loadJpgTexture(n,e.priority);return r.name=n,r}async loadKtx2Texture(e,t){const i={mode:"cors",cache:"default",referrerPolicy:"no-referrer"};i.priority=t==="high"?"high":"low";const n=await fetch(e,i);if(!n.ok)throw new Error(`tile HTTP ${n.status}: ${e}`);const r=await n.arrayBuffer(),o=await this.ktx2Loader._createTexture(r);return o.flipY=!1,"colorSpace"in o?o.colorSpace=st:o.encoding=$t,o.needsUpdate=!0,o}async loadJpgTexture(e,t){let i=null;try{i=await Vh(e,{timeoutMs:12e3,priority:t})}catch{i=null}i||(i=await sn(e,{timeoutMs:12e3,retries:1,allowFetchFallback:!0,priority:t}));const n=new wt(i);return n.flipY=!1,n.wrapS=ot,n.wrapT=ot,n.minFilter=gt,n.magFilter=gt,n.generateMipmaps=!1,"colorSpace"in n?n.colorSpace=st:n.encoding=$t,n.needsUpdate=!0,n}async loadSingleTile(e,t,i,n){const r={z:e,col:t,row:i,url:this.buildTileUrl(e,t,i,this.useKtx2),state:"loading",priority:n,lastUsed:performance.now(),failCount:0};this.tilesMap.set(`${e}_${t}_${i}`,r),await this.loadTile(r)}drawTile(e){if(!this.manifest||!this.group||!e.texture)return;const t=this.manifest.levels.find(o=>o.z===e.z);if(!t)return;const i=this.buildTileGeometry(t,e.col,e.row),n=new Mi({map:e.texture,depthWrite:!1,depthTest:!1});n.toneMapped=!1;const r=new ht(i,n);r.renderOrder=e.priority==="high"?3:2,r.frustumCulled=!1,e.mesh=r,this.group.add(r),this.tilesVisible||(this.tilesVisible=!0,this.onFirstDraw()),this.highestLevel&&e.z===this.highestLevel.z&&!this.highReady&&(this.highReady=!0,this.onHighReady())}buildTileGeometry(e,t,i){const r=Math.PI*2/e.cols,o=Math.PI/e.rows,a=t*r-Math.PI,l=i*o,c=Math.max(4,Math.round(64/e.cols)),h=Math.max(4,Math.round(32/e.rows)),d=new jn(500,c,h,a,r,l,o);d.scale(-1,1,1);const u=d.attributes.uv;let p=1/0,g=-1/0,E=1/0,A=-1/0;for(let v=0;v<u.count;v+=1){const b=u.getX(v),T=u.getY(v);b<p&&(p=b),b>g&&(g=b),T<E&&(E=T),T>A&&(A=T)}const f=g-p||1,y=A-E||1;for(let v=0;v<u.count;v+=1){const b=u.getX(v),T=u.getY(v),S=(b-p)/f,M=(T-E)/y;u.setXY(v,S,1-M)}return u.needsUpdate=!0,d}buildTileUrl(e,t,i,n){const r=n?"ktx2":"jpg";return`${this.manifest.baseUrl}/z${e}/${t}_${i}.${r}`}computeNeededTiles(e,t){const i=new L;e.getWorldDirection(i);const n=-Math.atan2(i.x,i.z),r=Math.asin(i.y),o=at.degToRad(e.fov),a=at.degToRad(20),l=o/2+a,c=o*e.aspect/2+a,h=this.normAngle(n-c),d=this.normAngle(n+c),u=at.clamp(r-l,-Math.PI/2,Math.PI/2),p=at.clamp(r+l,-Math.PI/2,Math.PI/2),g=this.yawToCols(h,d,t.cols),E=this.yawToCols(n-1e-6,n+1e-6,t.cols)[0]??0;g.includes(E)||g.push(E);const A=Math.max(0,Math.floor((p*-1+Math.PI/2)/Math.PI*t.rows)),f=Math.min(t.rows-1,Math.floor((u*-1+Math.PI/2)/Math.PI*t.rows)),y=[];for(let D=A;D<=f;D++)y.push(D);const v=Math.min(t.rows-1,Math.max(0,Math.floor((-r+Math.PI/2)/Math.PI*t.rows)));y.includes(v)||y.push(v);const b=[...g];for(const D of g)b.push(((D+1)%t.cols+t.cols)%t.cols),b.push(((D-1)%t.cols+t.cols)%t.cols);const T=[...y];for(const D of y)D+1<t.rows&&T.push(D+1),D-1>=0&&T.push(D-1);const S=new Map,M=(D,_)=>{const w=`${D}_${_}`,N=Math.abs(D-E),H=Math.min(N,t.cols-N),$=Math.abs(_-v),R=H*H+$*$,U=S.get(w);(!U||R<U.rank)&&S.set(w,{col:D,row:_,rank:R})};for(const D of b)for(const _ of T)M(D,_);return Array.from(S.values()).sort((D,_)=>D.rank!==_.rank?D.rank-_.rank:D.row!==_.row?D.row-_.row:D.col-_.col)}sortPendingHighQueue(){this.pendingHigh.length<2||this.pendingHigh.sort((e,t)=>{const i=e.priorityRank??Number.POSITIVE_INFINITY,n=t.priorityRank??Number.POSITIVE_INFINITY;return i!==n?i-n:t.lastUsed-e.lastUsed})}reprioritizeLowQueue(e){if(!this.lowLevel||this.pendingLow.length<2)return;const t=this.computeNeededTiles(e,this.lowLevel);if(t.length===0)return;const i=new Map;for(const r of t)i.set(`${r.col}_${r.row}`,r.rank);const n=new Map;this.pendingLow.forEach((r,o)=>n.set(r,o)),this.pendingLow.sort((r,o)=>{const a=i.get(`${r.col}_${r.row}`),l=i.get(`${o.col}_${o.row}`),c=a!==void 0,h=l!==void 0;return c&&h&&a!==l?a-l:c&&!h?-1:!c&&h?1:(n.get(r)??0)-(n.get(o)??0)})}yawToCols(e,t,i){const n=u=>(u%(Math.PI*2)+Math.PI*2)%(Math.PI*2),r=Math.PI,o=n(e+r),a=n(t+r),l=[],c=u=>{const p=(u%i+i)%i;l.includes(p)||l.push(p)},h=Math.floor(o/(Math.PI*2)*i),d=Math.floor(a/(Math.PI*2)*i);if(o<=a)for(let u=h;u<=d;u++)c(u);else{for(let u=h;u<i;u++)c(u);for(let u=0;u<=d;u++)c(u)}return l}normAngle(e){return(e+Math.PI)%(2*Math.PI)-Math.PI}runLru(e){var n,r;if(!this.highestLevel)return;const t=Array.from(this.tilesMap.values()).filter(o=>o.z===this.highestLevel.z&&o.state==="ready");if(t.length<=this.lruLimit)return;t.sort((o,a)=>o.lastUsed-a.lastUsed);const i=t.slice(0,t.length-this.lruLimit);for(const o of i)(n=o.texture)==null||n.dispose(),o.mesh&&(o.mesh.geometry.dispose(),o.mesh.material.dispose(),(r=this.group)==null||r.remove(o.mesh)),this.tilesMap.delete(`${o.z}_${o.col}_${o.row}`)}}async function Cv(s){const e={cache:"default"};e.priority="high";const t=await fetch(s,e);if(!t.ok)throw new Error(`manifest 加载失败: ${s}`);const i=await t.json();return i.tileFormat||(i.tileFormat="jpg"),i}const Nn={original:{renderer:{pixelRatio:Math.min(window.devicePixelRatio||1,2),toneMapping:wi,toneMappingExposure:1,output:"srgb",clearColor:void 0},camera:{defaultFov:75},texture:{anisotropyLimit:8,minFilter:Hi,magFilter:gt,generateMipmaps:!0,colorSpace:"srgb"}},enhanced:{renderer:{pixelRatio:Math.min(window.devicePixelRatio,2),toneMapping:th,toneMappingExposure:.95,output:"srgb",clearColor:{color:0,alpha:1}},camera:{defaultFov:70},texture:{anisotropyLimit:12,minFilter:Hi,magFilter:gt,generateMipmaps:!0,colorSpace:"srgb"}}};class bv{constructor(e,t=!1){m(this,"scene");m(this,"camera");m(this,"renderer");m(this,"sphere",null);m(this,"tilePano",null);m(this,"fallbackSphere",null);m(this,"container");m(this,"frameListeners",[]);m(this,"nadirPatch",null);m(this,"compassDisk",null);m(this,"groundNavDots",null);m(this,"groundHeading",null);m(this,"renderProfile","enhanced");m(this,"isDragging",!1);m(this,"lastMouseX",0);m(this,"lastMouseY",0);m(this,"yaw",0);m(this,"pitch",0);m(this,"fov",75);m(this,"onLoadCallback");m(this,"onErrorCallback");m(this,"onStatusChangeCallback");m(this,"debugMode",!1);m(this,"onDebugClick");m(this,"longPressTimer",null);m(this,"tilesDebugEl",null);m(this,"tilesVisibleStableFrames",0);m(this,"tilesLastError","");m(this,"tilesLowReady",!1);m(this,"tilesLastLoadedCount",0);m(this,"tilesLastProgressAt",0);m(this,"tilesHighStartAt",0);m(this,"tilesDegradedNotified",!1);m(this,"longPressThreshold",500);m(this,"renderSource","none");m(this,"perfSamples",[]);m(this,"perfMode","normal");m(this,"perfLastChangeAt",0);m(this,"renderSwitchReason","");m(this,"clearedCount",0);m(this,"aspectWarnedUrls",new Set);m(this,"metrics",{sceneId:"",startAt:0,lowReadyAt:0,highReadyAt:0,tilesLoaded:0,tilesFailed:0,tilesRetries:0,tileHitRate:0,perfMode:"normal",renderSource:"none",lastError:""});m(this,"lastMetricsEmitAt",0);m(this,"loadStatus",We.LOADING_LOW);m(this,"isDegradedMode",!1);m(this,"pickMode",!1);m(this,"pickModeListeners",[]);m(this,"pickStartX",0);m(this,"pickStartY",0);m(this,"pickStartTime",0);m(this,"pickHasMoved",!1);m(this,"pickDragThreshold",8);m(this,"pickTimeThreshold",250);m(this,"lastYaw",0);m(this,"lastPitch",0);m(this,"lastFov",75);m(this,"isViewChanging",!1);m(this,"viewChangeThreshold",.5);m(this,"vrModeEnabled",!1);m(this,"touchStartX",0);m(this,"touchStartY",0);m(this,"lastTouchDistance",0);m(this,"isPinching",!1);m(this,"lastFrameTimeMs",null);this.container=e,this.debugMode=t,this.renderProfile=this.detectRenderProfile(),this.scene=new Ea,this.camera=new Rt(Nn[this.renderProfile].camera.defaultFov,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,0,0),this.fov=Nn[this.renderProfile].camera.defaultFov,this.renderer=new Ur({antialias:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.applyRendererProfile(),e.appendChild(this.renderer.domElement),this.nadirPatch=new $E(this.scene,500),this.compassDisk=new ev,this.compassDisk.mount(e),this.compassDisk.getElement().style.display="none",this.groundNavDots=new sv({museumId:"",currentSceneId:"",sceneHotspots:[]}),this.groundNavDots.mount(e),this.groundNavDots.getElement().style.display="none",this.groundHeading=new rv(e),this.groundHeading.getElement().style.display="none",this.setupEvents(),this.animate(),window.addEventListener("resize",()=>this.handleResize())}setupEvents(){const e=this.renderer.domElement;if(e.addEventListener("mousedown",t=>this.onPointerDown(t)),e.addEventListener("mousemove",t=>this.onPointerMove(t)),e.addEventListener("mouseup",()=>this.onPointerUp()),e.addEventListener("mouseleave",()=>this.onPointerUp()),e.addEventListener("touchstart",t=>this.onTouchStart(t),{passive:!1}),e.addEventListener("touchmove",t=>this.onTouchMove(t),{passive:!1}),e.addEventListener("touchend",()=>this.onTouchEnd()),e.addEventListener("wheel",t=>this.onWheel(t),{passive:!1}),this.debugMode){e.addEventListener("dblclick",n=>this.handleDebugClick(n.clientX,n.clientY));let t=0,i=0;e.addEventListener("touchstart",n=>{n.touches.length===1&&(t=n.touches[0].clientX,i=n.touches[0].clientY,this.longPressTimer=window.setTimeout(()=>{this.handleDebugClick(t,i)},this.longPressThreshold))},{passive:!0}),e.addEventListener("touchmove",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0}),e.addEventListener("touchend",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0})}}handleDebugClick(e,t){if(this.onDebugClick&&this.debugMode){const i=this.getCurrentView();this.onDebugClick(e,t,i.yaw,i.pitch,i.fov)}}setOnDebugClick(e){this.onDebugClick=e}onPointerDown(e){this.isDragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,rt.emitInteracting()}onPointerMove(e){if(!this.isDragging)return;const t=e.clientX-this.lastMouseX,i=e.clientY-this.lastMouseY;if(this.yaw+=t*.5,this.pitch+=i*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,this.updateCamera(),this.debugMode&&this.onDebugClick){const n=this.getCurrentView();this.onDebugClick(this.lastMouseX,this.lastMouseY,n.yaw,n.pitch,n.fov)}}onPointerUp(){this.isDragging=!1}onTouchStart(e){if(e.touches.length===1)this.isDragging=!0,this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.lastMouseX=this.touchStartX,this.lastMouseY=this.touchStartY,rt.emitInteracting();else if(e.touches.length===2){this.isPinching=!0,this.isDragging=!1;const t=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(t*t+i*i),rt.emitInteracting()}}onTouchMove(e){if(e.preventDefault(),this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null),e.touches.length===1&&this.isDragging){const t=e.touches[0].clientX-this.lastMouseX,i=e.touches[0].clientY-this.lastMouseY;this.yaw+=t*.5,this.pitch+=i*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.touches[0].clientX,this.lastMouseY=e.touches[0].clientY,this.updateCamera()}else if(e.touches.length===2&&this.isPinching){const t=e.touches[0].clientX-e.touches[1].clientX,i=e.touches[0].clientY-e.touches[1].clientY,n=Math.sqrt(t*t+i*i),r=this.lastTouchDistance-n,o=this.fov+r*.5;this.setFovInternal(o),this.lastTouchDistance=n}}onTouchEnd(){this.isDragging=!1,this.isPinching=!1}onWheel(e){e.preventDefault();const t=this.fov+e.deltaY*.1;if(this.setFovInternal(t),rt.emitInteracting(),this.debugMode&&this.onDebugClick){const i=this.getCurrentView();this.onDebugClick(this.lastMouseX,this.lastMouseY,i.yaw,i.pitch,i.fov)}}updateCamera(){const e=at.degToRad(this.yaw),t=at.degToRad(this.pitch),i=Math.cos(t)*Math.sin(e),n=Math.sin(t),r=Math.cos(t)*Math.cos(e);this.camera.lookAt(i,n,r)}loadScene(e,t){var d;if(this.isDegradedMode=!1,this.resetMetrics(e.id),this.updateLoadStatus(We.LOADING_LOW),this.renderSource="none",this.clearedCount=0,this.tilePano&&(this.tilePano.dispose(),this.tilePano=null),this.clearFallback(),this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const u=this.sphere.material;u.map&&u.map.dispose(),u.dispose()}if(!((t==null?void 0:t.preserveView)===!0)){const u=e.initialView,p=u.yaw||0;this.yaw===0&&p!==0&&(this.yaw=-p),this.pitch=u.pitch||0;const g=Nn[this.renderProfile];this.fov=u.fov!==void 0?u.fov:g.camera.defaultFov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.updateCamera()}this.lastYaw=this.yaw,this.lastPitch=this.pitch,this.lastFov=this.fov,this.isViewChanging=!1;const r=-(typeof e.northYaw=="number"?e.northYaw:((d=e.initialView)==null?void 0:d.yaw)??0);this.nadirPatch&&this.nadirPatch.setNorthYaw(r),this.compassDisk&&(this.compassDisk.setSceneId(e.id),this.compassDisk.setNorthYaw(r)),this.groundHeading&&this.groundHeading.setNorthYaw(r);const o=new jn(500,64,64);o.scale(-1,1,1);const a=e.panoTiles;if(a!=null&&a.manifest){const u=ni(a.manifest,ii.PANO),p=a.fallbackPanoLow||e.panoLow,g=a.fallbackPano||e.pano,E=!!(p||g);this.tilesVisibleStableFrames=0,this.tilesLastError="",this.tilesLowReady=!1,this.tilesLastLoadedCount=0,this.tilesLastProgressAt=performance.now(),this.tilesHighStartAt=0,this.tilesDegradedNotified=!1,p?this.showFallbackTexture(ni(p,ii.PANO_LOW),o,!0):g&&this.showFallbackTexture(ni(g,ii.PANO),o,!1);const A=()=>{this.tilesLowReady||(this.tilesLowReady=!0,this.updateLoadStatus(We.LOW_READY),this.setRenderSource("low","tiles 首屏可见"),this.onLoadCallback&&this.onLoadCallback()),this.loadStatus!==We.HIGH_READY&&this.updateLoadStatus(We.LOADING_HIGH)},f=()=>{this.updateLoadStatus(We.HIGH_READY),this.setRenderSource("tiles","tiles 高清可见"),this.isDegradedMode=!1};Cv(u).then(y=>(this.tilePano=y.tileFormat==="ktx2"?new xv(this.scene,this.renderer,A,f):new hv(this.scene,A,f,this.renderer.capabilities.maxTextureSize||0),this.tilePano&&"setPerformanceMode"in this.tilePano&&this.tilePano.setPerformanceMode(this.perfMode),this.tilePano.load(y,{fallbackVisible:E}))).then(()=>{var y;this.tilesLowReady||(this.tilesLowReady=!0,this.updateLoadStatus(We.LOW_READY),this.onLoadCallback&&this.onLoadCallback()),(y=this.tilePano)==null||y.prime(this.camera)}).catch(y=>{console.error("瓦片加载失败，回退传统全景",y),this.tilesLastError=y instanceof Error?y.message:String(y),je("瓦片加载失败，已回退到全景图",2e3),this.fallbackToLegacy(e,a)});return}const l=ni(e.panoLow,ii.PANO_LOW),c=ni(e.pano,ii.PANO);if(sa()==="low"){if(l){this.loadSingleTexture(o,l,!0);return}if(c){this.loadSingleTexture(o,c,!1);return}}else{if(!l&&c){this.loadSingleTexture(o,c,!1);return}if(l&&!c){this.loadSingleTexture(o,l,!0);return}if(l&&c){this.loadProgressiveTextures(o,l,c);return}}this.updateLoadStatus(We.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error("场景未提供全景图 URL"))}async loadSingleTexture(e,t,i){i?this.updateLoadStatus(We.LOADING_LOW):this.updateLoadStatus(We.LOADING_HIGH);try{const n=await sn(t,{timeoutMs:15e3,retries:2,retryBaseDelayMs:300,referrerPolicy:"no-referrer",crossOrigin:"anonymous",allowFetchFallback:!1,priority:"high"}),r=new ki(n);this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,t),r.flipY=!1,r.wrapS=ot,r.wrapT=ot,r.needsUpdate=!0;const o=new Mi({map:r});this.sphere=new ht(e,o),this.scene.add(this.sphere),this.setRenderSource(i?"low":"tiles",i?"panoLow 可见":"pano 可见"),i?this.updateLoadStatus(We.LOW_READY):this.updateLoadStatus(We.HIGH_READY),this.onLoadCallback&&this.onLoadCallback()}catch(n){if(console.error("加载全景图失败",t,n),this.updateLoadStatus(We.ERROR),this.onErrorCallback){const r=n instanceof bi?`加载全景图失败：${t} - ${n.message}`:`加载全景图失败：${t}`;this.onErrorCallback(new Error(r))}}}async loadProgressiveTextures(e,t,i){this.updateLoadStatus(We.LOADING_LOW);try{const n=await sn(t,{timeoutMs:15e3,retries:2,retryBaseDelayMs:300,referrerPolicy:"no-referrer",crossOrigin:"anonymous",allowFetchFallback:!1,priority:"high"}),r=new ki(n);this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,t),r.flipY=!1,r.wrapS=ot,r.wrapT=ot,r.needsUpdate=!0;const o=new Mi({map:r});this.sphere=new ht(e,o),this.scene.add(this.sphere),this.setRenderSource("low","panoLow 可见"),this.updateLoadStatus(We.LOW_READY),this.onLoadCallback&&this.onLoadCallback(),this.updateLoadStatus(We.LOADING_HIGH);try{const a=await sn(i,{timeoutMs:15e3,retries:2,retryBaseDelayMs:300,referrerPolicy:"no-referrer",crossOrigin:"anonymous",allowFetchFallback:!1,priority:"low"}),l=new ki(a);this.applyTextureSettings(l),this.warnIfNotPanoAspect(l,i),l.flipY=!1,l.wrapS=ot,l.wrapT=ot,l.needsUpdate=!0;const c=this.getCurrentView();if(this.sphere&&this.sphere.material&&"map"in this.sphere.material){const h=this.sphere.material;h.map&&h.map.dispose(),h.map=l,h.needsUpdate=!0,this.setRenderSource("tiles","pano 高清可见")}this.setView(c.yaw,c.pitch,c.fov),this.updateLoadStatus(We.HIGH_READY),this.isDegradedMode=!1}catch(a){console.error("高清全景图加载失败，继续使用低清",i,a),this.isDegradedMode=!0,this.updateLoadStatus(We.DEGRADED)}}catch(n){console.error("低清全景图加载失败，尝试加载高清兜底",t,n),await this.loadSingleTexture(e,i,!1)}}setOnLoad(e){this.onLoadCallback=e}setOnError(e){this.onErrorCallback=e}setOnStatusChange(e){this.onStatusChangeCallback=e}getLoadStatus(){return this.loadStatus}resetMetrics(e){const t=performance.now();this.metrics={sceneId:e,startAt:t,lowReadyAt:0,highReadyAt:0,tilesLoaded:0,tilesFailed:0,tilesRetries:0,tileHitRate:0,perfMode:this.perfMode,renderSource:this.renderSource,lastError:""},this.emitMetrics("reset",!0)}emitMetrics(e,t=!1){var p;const i=performance.now();if(!t&&i-this.lastMetricsEmitAt<800)return;const n=(p=this.tilePano)==null?void 0:p.getStatus(),r=(n==null?void 0:n.tilesLoadedCount)??0,o=(n==null?void 0:n.tilesFailedCount)??0,a=(n==null?void 0:n.tilesRetryCount)??0,l=r+o,c=l>0?Number((r/l*100).toFixed(2)):0;this.metrics.tilesLoaded=r,this.metrics.tilesFailed=o,this.metrics.tilesRetries=a,this.metrics.tileHitRate=c,this.metrics.perfMode=this.perfMode,this.metrics.renderSource=this.renderSource,this.metrics.lastError=this.tilesLastError||((n==null?void 0:n.lastError)??"");const h=this.metrics.lowReadyAt?Math.round(this.metrics.lowReadyAt-this.metrics.startAt):-1,d=this.metrics.highReadyAt?Math.round(this.metrics.highReadyAt-this.metrics.startAt):-1,u={...this.metrics,lowReadyMs:h,highReadyMs:d,reason:e,at:Math.round(i)};window.__VR_METRICS__=u,window.dispatchEvent(new CustomEvent("vr:metrics",{detail:u})),this.lastMetricsEmitAt=i}isInDegradedMode(){return this.isDegradedMode}updateLoadStatus(e){if(this.loadStatus===e)return;this.loadStatus=e;const t=performance.now();e===We.LOW_READY&&this.metrics.lowReadyAt===0&&(this.metrics.lowReadyAt=t),e===We.HIGH_READY&&this.metrics.highReadyAt===0&&(this.metrics.highReadyAt=t),this.onStatusChangeCallback&&this.onStatusChangeCallback(e),this.emitMetrics(`status:${e}`)}getCurrentView(){return{yaw:this.yaw,pitch:this.pitch,fov:this.fov}}setView(e,t,i){this.yaw=e,this.pitch=Math.max(-90,Math.min(90,t)),i!==void 0&&this.setFovInternal(i,!1),this.updateCamera()}setFovInternal(e,t=!0){if(this.fov=Math.max(30,Math.min(120,e)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),t){const i=Nn[this.renderProfile].camera.defaultFov,n=Math.round(i/this.fov*100),r=Math.max(50,Math.min(250,n));oa.show(r)}}setFov(e){this.setFovInternal(e,!0)}setVrModeEnabled(e){this.vrModeEnabled=e,e||(this.isDragging=!1)}isVrModeEnabled(){return this.vrModeEnabled}isInteracting(){return this.isDragging||this.isPinching}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}updatePerformanceGuard(e){const t=1e3/Math.max(1,e);this.perfSamples.push(t),this.perfSamples.length>30&&this.perfSamples.shift();const i=this.perfSamples.reduce((r,o)=>r+o,0)/this.perfSamples.length,n=performance.now();i<28&&this.perfMode==="normal"&&n-this.perfLastChangeAt>2e3&&(this.perfMode="throttle",this.perfLastChangeAt=n,this.tilePano&&"setPerformanceMode"in this.tilePano&&this.tilePano.setPerformanceMode("throttle"),this.emitMetrics("perf:throttle",!0)),i>45&&this.perfMode==="throttle"&&n-this.perfLastChangeAt>3e3&&(this.perfMode="normal",this.perfLastChangeAt=n,this.tilePano&&"setPerformanceMode"in this.tilePano&&this.tilePano.setPerformanceMode("normal"),this.emitMetrics("perf:normal",!0))}updateTilesDebug(){var v;const e=new URLSearchParams(window.location.search);if(!(e.get("tilesDebug")==="1"||e.get("tilesDebug")==="true"||e.get("tilesDebug")==="on")){this.tilesDebugEl&&(this.tilesDebugEl.remove(),this.tilesDebugEl=null);return}if(!this.tilesDebugEl){const b=document.createElement("div");b.style.position="absolute",b.style.left="8px",b.style.top="8px",b.style.padding="6px 8px",b.style.background="rgba(0,0,0,0.55)",b.style.color="#fff",b.style.fontSize="12px",b.style.lineHeight="1.4",b.style.borderRadius="6px",b.style.zIndex="9999",b.style.pointerEvents="none",this.tilesDebugEl=b,this.container.appendChild(b)}const i=(v=this.tilePano)==null?void 0:v.getStatus(),n=this.tilePano?"tiles":"fallback",r=i!=null&&i.tilesVisible?"true":"false",o=(i==null?void 0:i.tilesLoadedCount)??0,a=(i==null?void 0:i.tilesLoadingCount)??0,l=(i==null?void 0:i.tilesQueuedCount)??0,c=(i==null?void 0:i.lastTileUrl)??"",h=this.tilesLastError||(i==null?void 0:i.lastError)||"",d=this.fallbackSphere?"true":"false",u=(i==null?void 0:i.canvasSize)??"",p=(i==null?void 0:i.maxLevel)??"",g=i!=null&&i.highReady?"true":"false",E=(i==null?void 0:i.levels)??"",A=this.renderSource,f=this.renderSwitchReason,y=this.clearedCount;this.tilesDebugEl.textContent=`mode=${n}
renderSource=${A}
switchReason=${f}
cleared=${y}
fallbackVisible=${d}
tilesVisible=${r}
tilesLoaded=${o}
tilesLoading=${a}
tilesQueued=${l}
lastTileUrl=${c}
lastError=${h}
canvas=${u} zMax=${p} levels=${E} highReady=${g}
lowReady=${this.tilesLowReady}`}animate(){requestAnimationFrame(()=>this.animate());const e=performance.now(),t=this.lastFrameTimeMs?e-this.lastFrameTimeMs:16.7;this.updatePerformanceGuard(t),this.lastFrameTimeMs=e;const i=this.getCurrentView(),n=Math.abs(i.yaw-this.lastYaw),r=Math.abs(i.pitch-this.lastPitch),o=Math.abs(i.fov-this.lastFov);if(n>this.viewChangeThreshold||r>this.viewChangeThreshold||o>this.viewChangeThreshold?this.isViewChanging||(this.isViewChanging=!0,rt.emitInteracting()):this.isViewChanging&&(this.isViewChanging=!1,rt.scheduleIdle()),this.lastYaw=i.yaw,this.lastPitch=i.pitch,this.lastFov=i.fov,this.updateCamera(),this.tilePano){this.tilePano.update(this.camera);const l=this.tilePano.getStatus(),c=!!this.fallbackSphere,h=l.tilesVisible;!c&&!h&&this.noteCleared("无可见源"),h&&this.renderSource==="fallback"&&this.tilesLowReady&&this.setRenderSource("low","tiles 低清覆盖可见"),h&&l.highReady&&this.setRenderSource("tiles","tiles 高清可见"),l.lastError&&(this.tilesLastError=l.lastError),!this.tilesLowReady&&l.tilesLoadedCount>0&&(this.tilesLowReady=!0,this.updateLoadStatus(We.LOW_READY)),l.highReady&&(this.updateLoadStatus(We.HIGH_READY),this.isDegradedMode=!1,this.tilesDegradedNotified=!1),l.tilesLoadedCount>this.tilesLastLoadedCount&&(this.tilesLastLoadedCount=l.tilesLoadedCount,this.tilesLastProgressAt=e,this.tilesDegradedNotified&&!l.highReady&&(this.tilesDegradedNotified=!1)),this.tilesHighStartAt===0&&(l.tilesQueuedCount>0||l.tilesLoadingCount>0)&&(this.tilesHighStartAt=e,this.tilesLastProgressAt===0&&(this.tilesLastProgressAt=e)),this.tilesHighStartAt>0&&e-this.tilesLastProgressAt>12e3&&!l.highReady&&!this.tilesDegradedNotified&&this.tilesLowReady&&(this.isDegradedMode=!0,this.updateLoadStatus(We.DEGRADED),this.tilesDegradedNotified=!0)}this.updateTilesDebug(),this.emitMetrics("frame"),this.nadirPatch&&this.nadirPatch.update(this.camera,{yaw:i.yaw,pitch:i.pitch},t),this.compassDisk&&this.compassDisk.setYawPitch(i.yaw,i.pitch),this.groundNavDots&&this.groundNavDots.setYawPitch(i.yaw,i.pitch),this.groundHeading&&this.groundHeading.setYawPitch(i.yaw,i.pitch);for(const l of this.frameListeners)l(t);this.renderer.render(this.scene,this.camera)}onFrame(e){return this.frameListeners.push(e),()=>{const t=this.frameListeners.indexOf(e);t>=0&&this.frameListeners.splice(t,1)}}getCamera(){return this.camera}getDomElement(){return this.renderer.domElement}setSceneData(e,t,i){if(this.groundNavDots){const n=i.filter(r=>{var o;return r.type==="scene"&&((o=r.target)==null?void 0:o.sceneId)}).map(r=>({id:r.id,label:r.label,yaw:r.yaw,pitch:r.pitch,target:{museumId:r.target.museumId,sceneId:r.target.sceneId}}));this.groundNavDots.updateScene(e,t,n)}}getSphereRadius(){return 500}getViewportSize(){return{width:this.container.clientWidth,height:this.container.clientHeight}}enablePickMode(){this.pickMode||(this.pickMode=!0,this.setupPickModeListeners())}disablePickMode(){this.pickMode&&(this.pickMode=!1,this.removePickModeListeners())}togglePickMode(){return this.pickMode?this.disablePickMode():this.enablePickMode(),this.pickMode}isPickModeEnabled(){return this.pickMode}setupPickModeListeners(){const e=this.renderer.domElement,t=r=>{if(!this.pickMode)return;let o,a;if(r instanceof TouchEvent){if(r.touches.length!==1)return;o=r.touches[0].clientX,a=r.touches[0].clientY}else o=r.clientX,a=r.clientY;this.pickStartX=o,this.pickStartY=a,this.pickStartTime=Date.now(),this.pickHasMoved=!1},i=r=>{if(!this.pickMode)return;let o,a;if(r instanceof TouchEvent){if(r.touches.length!==1)return;o=r.touches[0].clientX,a=r.touches[0].clientY}else o=r.clientX,a=r.clientY;const l=Math.abs(o-this.pickStartX),c=Math.abs(a-this.pickStartY);Math.sqrt(l*l+c*c)>this.pickDragThreshold&&(this.pickHasMoved=!0)},n=r=>{if(!this.pickMode)return;let o,a;if(r instanceof TouchEvent){if(r.changedTouches.length!==1)return;o=r.changedTouches[0].clientX,a=r.changedTouches[0].clientY}else o=r.clientX,a=r.clientY;const l=Date.now()-this.pickStartTime,c=Math.abs(o-this.pickStartX),h=Math.abs(a-this.pickStartY);Math.sqrt(c*c+h*h)>this.pickDragThreshold||l>this.pickTimeThreshold&&this.pickHasMoved||this.handlePick(o,a),this.pickHasMoved=!1};e.addEventListener("pointerdown",t),e.addEventListener("mousedown",t),e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("pointermove",i),e.addEventListener("mousemove",i),e.addEventListener("touchmove",i,{passive:!0}),e.addEventListener("pointerup",n),e.addEventListener("mouseup",n),e.addEventListener("touchend",n,{passive:!0}),this.pickModeListeners.push(()=>{e.removeEventListener("pointerdown",t),e.removeEventListener("mousedown",t),e.removeEventListener("touchstart",t),e.removeEventListener("pointermove",i),e.removeEventListener("mousemove",i),e.removeEventListener("touchmove",i),e.removeEventListener("pointerup",n),e.removeEventListener("mouseup",n),e.removeEventListener("touchend",n)})}removePickModeListeners(){this.pickModeListeners.forEach(e=>e()),this.pickModeListeners=[]}handlePick(e,t){const i=this.renderer.domElement.getBoundingClientRect(),n=JE(e,t,i),r=KE(n.x,n.y,this.camera,this.getSphereRadius());if(!r){typeof __VR_DEBUG__<"u"&&__VR_DEBUG__&&console.debug("[pick] 无法计算 yaw/pitch（ray.direction 为空）");return}const{yaw:o,pitch:a}=r,l=`yaw: ${o.toFixed(2)}, pitch: ${a.toFixed(2)}`;console.log(`[pick] yaw=${o.toFixed(2)}, pitch=${a.toFixed(2)}`),navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(l).catch(()=>{}),window.dispatchEvent(new CustomEvent("vr:pick",{detail:{x:e,y:t,yaw:o,pitch:a}}))}warnIfNotPanoAspect(e,t){if(!e.image)return;const i=e.image,n=i.width,r=i.height;if(!n||!r)return;const o=n/r;Math.abs(o-2)>.02&&!this.aspectWarnedUrls.has(t)&&(console.warn(`[PanoViewer] 全景图比例不是 2:1，可能出现轻微变形（实际 ${o.toFixed(2)}），来源: ${t}`),this.aspectWarnedUrls.add(t))}dispose(){if(this.tilePano&&(this.tilePano.dispose(),this.tilePano=null),this.clearFallback(),this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const e=this.sphere.material;e.map&&e.map.dispose(),e.dispose()}this.nadirPatch&&(this.nadirPatch.dispose(this.scene),this.nadirPatch=null),this.compassDisk&&(this.compassDisk.dispose(),this.compassDisk=null),this.groundNavDots&&(this.groundNavDots.dispose(),this.groundNavDots=null),this.groundHeading&&(this.groundHeading.dispose(),this.groundHeading=null),this.renderer.dispose(),window.removeEventListener("resize",()=>this.handleResize())}applyRendererProfile(){const e=Nn[this.renderProfile];this.renderer.setPixelRatio(e.renderer.pixelRatio),"outputColorSpace"in this.renderer?this.renderer.outputColorSpace=st:this.renderer.outputEncoding=$t,this.renderer.toneMapping=e.renderer.toneMapping,this.renderer.toneMappingExposure=e.renderer.toneMappingExposure,e.renderer.clearColor&&this.renderer.setClearColor(e.renderer.clearColor.color,e.renderer.clearColor.alpha)}detectRenderProfile(){try{const t=new URLSearchParams(window.location.search).get("render");if(t&&t.toLowerCase()==="original")return"original"}catch{}return"enhanced"}fallbackToLegacy(e,t){const i={...e,pano:(t==null?void 0:t.fallbackPano)??e.pano,panoLow:(t==null?void 0:t.fallbackPanoLow)??e.panoLow,panoTiles:void 0};i.pano||i.panoLow?(je("瓦片加载失败，已回退到全景图",2e3),this.setRenderSource("fallback","tiles 失败自动回退"),this.loadScene(i,{preserveView:!0})):(this.updateLoadStatus(We.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error("瓦片与全景资源均不可用")))}setRenderSource(e,t){(this.renderSource!==e||t)&&(this.renderSource=e,this.renderSwitchReason=t)}noteCleared(e){this.clearedCount+=1,this.renderSwitchReason=e}async showFallbackTexture(e,t,i){try{const n=await sn(e,{timeoutMs:15e3,retries:1,allowFetchFallback:!0,priority:"high"}),r=new ki(n);this.applyTextureSettings(r),r.flipY=!1,r.wrapS=ot,r.wrapT=ot,r.needsUpdate=!0;const o=new Mi({map:r,depthWrite:!1,depthTest:!1}),a=new ht(t.clone(),o);a.renderOrder=0,this.fallbackSphere=a,this.scene.add(a),this.updateLoadStatus(i?We.LOW_READY:We.HIGH_READY),this.setRenderSource("fallback",i?"fallback 低清可见":"fallback 高清可见"),i&&(this.tilesLowReady=!0),this.onLoadCallback&&this.onLoadCallback()}catch(n){console.error("fallback 贴图加载失败",n)}}clearFallback(){if(this.fallbackSphere){this.fallbackSphere.geometry&&this.fallbackSphere.geometry.dispose();const e=this.fallbackSphere.material;e.map&&e.map.dispose(),e.dispose(),this.scene.remove(this.fallbackSphere),this.fallbackSphere=null}}applyTextureSettings(e){const t=Nn[this.renderProfile],i=this.renderer.capabilities.getMaxAnisotropy?this.renderer.capabilities.getMaxAnisotropy():1;if(e.anisotropy=Math.min(t.texture.anisotropyLimit,Math.max(1,i||1)),e.minFilter=t.texture.minFilter,e.magFilter=t.texture.magFilter,e.generateMipmaps=t.texture.generateMipmaps,"colorSpace"in e?e.colorSpace=st:e.encoding=$t,e.needsUpdate=!0,this.debugMode){const n=e.image||{};console.log("pano texture",{w:n.width,h:n.height,colorSpace:e.colorSpace,encoding:e.encoding,anisotropy:e.anisotropy,minFilter:e.minFilter,magFilter:e.magFilter})}}}class Oc{constructor(e){m(this,"element");this.element=document.createElement("div"),this.element.className="title-bar",this.element.innerHTML=`
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
    `,document.head.appendChild(e)}setTitle(e){const t=this.element.querySelector(".title-text");t&&(t.textContent=e)}getElement(){return this.element}remove(){this.element.remove()}}class wv{constructor(e){m(this,"element");m(this,"museums");this.museums=e,this.element=document.createElement("div"),this.element.className="museum-list",this.render(),this.applyStyles()}render(){const e=this.museums.filter(i=>i.id==="wangding"),t=this.museums.filter(i=>i.id!=="wangding");this.element.innerHTML=`
      <div class="museum-list-container">
        <h1 class="museum-list-title">王鼎纪念馆</h1>
        <p class="museum-list-subtitle">以王鼎生平为主线的红色研学展馆</p>
        <div class="museum-grid">
          ${e.map(i=>`
            <div class="museum-card museum-card-active" data-museum-id="${i.id}">
              <div class="museum-cover">
                <img src="${i.cover}" alt="${i.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${i.name}</h2>
                  ${i.description?`<p class="museum-desc">${i.description}</p>`:""}
                  <p class="museum-scene-count">${i.scenes.length} 个场景</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        ${t.length>0?`
        <div class="museum-grid muted">
          ${t.map(i=>`
            <div class="museum-card museum-card-disabled">
              <div class="museum-cover">
                <img src="${i.cover}" alt="${i.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${i.name}</h2>
                  <p class="museum-desc">建设中，敬请期待</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        `:""}
      </div>
    `,this.element.querySelectorAll(".museum-card-active").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-museum-id");n&&Oo(n)})})}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}function Sv(s,e){const t=at.degToRad(s),i=at.degToRad(e),n=Math.cos(i)*Math.sin(t),r=Math.sin(i),o=Math.cos(i)*Math.cos(t);return new L(n,r,o)}function Mv(s,e,t){const i=new L,n=new L;if(e.getWorldPosition(i),e.getWorldDirection(n),new L().copy(s).sub(i).dot(n)<=0)return{x:0,y:0,visible:!1};const o=new L().copy(s).project(e);if(!(o.x>=-1&&o.x<=1&&o.y>=-1&&o.y<=1&&o.z>=-1&&o.z<=1))return{x:0,y:0,visible:!1};const l=t.clientWidth,c=t.clientHeight,h=(o.x+1)*.5*l,d=(1-(o.y+1)*.5)*c;return{x:h,y:d,visible:!0}}function Tv(s,e,t,i,n=500){const o=Sv(s,e).clone().multiplyScalar(n);return Mv(o,t,i)}function Bv(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" />
  <path d="M16.2 16.2 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`}function Lv(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 7.5v9l8-4.5-8-4.5Z"/>
</svg>`}function Rv(s){const e=document.createElement("div");return e.className="hotspot-tooltip",e.textContent=s||"",e.setAttribute("role","tooltip"),e}function or(s,e){const t=document.createElement("div");return t.className=`hotspot-icon-circle${e?` ${e}`:""}`,t.innerHTML=s,t}function Dv(){return`
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4v16M12 4l6 6M12 4l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function Nv(s){const e=Rv(s.tooltip),t=s.isGround??!1;let i="hotspot hotspot--unknown",n=document.createElement("div");n.className="hotspot-dot";const r=s.type;if(t){i="hotspot hotspot--ground";const o=document.createElement("div");o.className="hotspot-ground-ring",n=o}else r==="scene"?(i="hotspot hotspot--scene",n=or(Dv(),"hotspot-icon hotspot-icon-arrow")):r==="image"?(i="hotspot hotspot--image",n=or(Bv(),"hotspot-icon")):r==="info"?(i="hotspot hotspot--info",n=or('<span class="hotspot-info-text">i</span>',"hotspot-icon")):r==="video"&&(i="hotspot hotspot--video",n=or(Lv(),"hotspot-icon hotspot-icon-play"));return{rootClassName:i,contentEl:n,tooltipEl:e}}class Pv{constructor(e){m(this,"element");m(this,"isOpen",!1);m(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--image";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--media vr-modal-card--image",n.addEventListener("click",h=>h.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"图片预览";const a=document.createElement("button");a.className="vr-btn vr-modal-close-icon",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",()=>this.handleClose()),r.appendChild(o),r.appendChild(a);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--image";const c=document.createElement("img");c.className="vr-modal-image",e.src&&(c.src=e.src),c.alt=e.title||"热点图片",c.loading="lazy",l.appendChild(c),n.appendChild(r),n.appendChild(l),t.appendChild(i),t.appendChild(n),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class Uv{constructor(e){m(this,"element");m(this,"isOpen",!1);m(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--info";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--info",n.addEventListener("click",c=>c.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"详情";const a=document.createElement("button");a.className="vr-btn vr-modal-close-icon",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",()=>this.handleClose()),r.appendChild(o),r.appendChild(a);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--info",l.textContent=e.text||"未配置内容",n.appendChild(r),n.appendChild(l),t.appendChild(i),t.appendChild(n),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class Fv{constructor(e){m(this,"element");m(this,"isOpen",!1);m(this,"videoEl");m(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--video";const i=document.createElement("div");i.className="vr-modal-mask",i.addEventListener("click",()=>this.handleClose());const n=document.createElement("div");n.className="vr-modal-card vr-modal-card--media vr-modal-card--video",n.addEventListener("click",h=>h.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const o=document.createElement("div");o.className="vr-modal-title",o.textContent=e.title||"视频";const a=document.createElement("button");a.className="vr-btn vr-modal-close-icon",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",()=>this.handleClose()),r.appendChild(o),r.appendChild(a);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--video";const c=document.createElement("video");c.className="vr-modal-video",e.src&&(c.src=e.src),e.poster&&(c.poster=e.poster),c.controls=!0,c.playsInline=!0,c.preload="metadata",this.videoEl=c,l.appendChild(c),n.appendChild(r),n.appendChild(l),t.appendChild(i),t.appendChild(n),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){if(this.isOpen){this.isOpen=!1,this.element.classList.remove("open");try{this.videoEl.pause(),this.videoEl.currentTime=0,this.videoEl.removeAttribute("src"),this.videoEl.load()}catch{}}}getElement(){return this.element}destroy(){this.close(),this.element.remove()}}const rd="vr:open-modal",od="vr:close-modal";function Ta(s){window.dispatchEvent(new CustomEvent(rd,{detail:s}))}function Uo(){window.dispatchEvent(new CustomEvent(od))}class kv{constructor(e){m(this,"rootEl");m(this,"current",null);m(this,"handleKeyDownBound");this.rootEl=e,this.handleKeyDownBound=t=>this.handleKeyDown(t),window.addEventListener(rd,t=>{const i=t;this.handleOpen(i.detail)}),window.addEventListener(od,()=>this.close()),window.addEventListener("keydown",this.handleKeyDownBound)}handleKeyDown(e){e.key==="Escape"&&this.close()}handleOpen(e){this.close();let t=null;e.type==="image"?t=new Pv({src:e.payload.src,title:e.payload.title,onClose:()=>Uo()}):e.type==="info"?t=new Uv({title:e.payload.title,text:e.payload.text,onClose:()=>Uo()}):e.type==="video"&&(t=new Fv({src:e.payload.src,poster:e.payload.poster,title:e.payload.title,onClose:()=>Uo()})),t&&(this.current=t,this.rootEl.innerHTML="",this.rootEl.appendChild(t.getElement()),t.open())}close(){this.current&&(this.current.close(),this.current.destroy(),this.current=null,this.rootEl.innerHTML="")}}let Gc=null;function ad(){if(Gc)return;let s=document.getElementById("vr-modal-root");s||(s=document.createElement("div"),s.id="vr-modal-root",document.body.appendChild(s)),Gc=new kv(s)}class Or{constructor(e){m(this,"data");m(this,"el");m(this,"contentEl");m(this,"tooltipEl");m(this,"labelEl",null);m(this,"worldPos");m(this,"radius",500);m(this,"tooltipTimer",null);var o,a;this.data=e,this.el=document.createElement("div");const t=e.pitch<-20,i=Nv({id:e.id,type:e.type,tooltip:e.tooltip,isGround:t});if(this.el.className=i.rootClassName,t&&this.el.classList.add("hotspot--ground"),this.el.setAttribute("data-hotspot-id",e.id),this.el.setAttribute("data-hotspot-type",e.type),this.el.style.pointerEvents="auto",this.el.style.position="absolute",this.el.style.left="0",this.el.style.top="0",this.contentEl=i.contentEl,this.tooltipEl=i.tooltipEl,e.label){const l=document.createElement("div");l.className="hotspot-label",l.textContent=e.label,l.setAttribute("aria-hidden","true"),this.labelEl=l}this.el.appendChild(this.contentEl),this.el.appendChild(this.tooltipEl),this.labelEl&&this.el.appendChild(this.labelEl),(((a=(o=window.matchMedia)==null?void 0:o.call(window,"(hover: hover) and (pointer: fine)"))==null?void 0:a.matches)??!1)&&(this.el.addEventListener("mouseenter",()=>this.showTooltip()),this.el.addEventListener("mouseleave",()=>this.hideTooltip())),this.el.addEventListener("pointerdown",l=>{l.stopPropagation(),this.el.classList.add("is-pressed")});const r=()=>this.el.classList.remove("is-pressed");this.el.addEventListener("pointerup",r),this.el.addEventListener("pointercancel",r),this.el.addEventListener("pointerleave",r)}getElement(){return this.el}getData(){return this.data}updateScreenPosition(e,t){const i=Tv(this.data.yaw,this.data.pitch,e,t,this.radius);if(!i.visible){this.el.style.display="none",this.el.style.opacity="0";return}this.el.style.display="",this.el.style.opacity="1",this.el.style.setProperty("--hs-x",`${i.x}px`),this.el.style.setProperty("--hs-y",`${i.y}px`),this.el.style.transform=`translate3d(${i.x}px, ${i.y}px, 0) translate(-50%, -50%)`}showTooltip(e){this.data.tooltip&&(this.tooltipEl.classList.add("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null),e&&e>0&&(this.tooltipTimer=window.setTimeout(()=>this.hideTooltip(),e)))}hideTooltip(){this.tooltipEl.classList.remove("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null)}}class Qv extends Or{onClick(){console.log("[hotspot] scene click",{id:this.data.id,targetSceneId:this.data.targetSceneId})}}class Ov extends Or{onClick(){if(!this.data.imageUrl){console.warn("[hotspot] image click but no src configured",this.data),je("未配置内容",1500);return}Ta({type:"image",payload:{src:this.data.imageUrl,title:this.data.title||this.data.tooltip}})}}class Gv extends Or{onClick(){if(!!!(this.data.text||this.data.title||this.data.tooltip)){console.warn("[hotspot] info click but no text/title configured",this.data),je("未配置内容",1500);return}Ta({type:"info",payload:{title:this.data.title||this.data.tooltip,text:this.data.text}})}}class Hv extends Or{onClick(){if(!this.data.url){console.warn("[hotspot] video click but no src/url configured",this.data),je("未配置内容",1500);return}Ta({type:"video",payload:{src:this.data.url,poster:this.data.poster,title:this.data.title||this.data.tooltip}})}}class Vv{constructor(e,t,i={}){m(this,"element");m(this,"viewer");m(this,"disposeFrameListener",null);m(this,"hotspotInstances",[]);m(this,"options");m(this,"unsubscribeFocus",null);m(this,"hoveredSceneId",null);this.viewer=e,this.options=i,this.element=document.createElement("div"),this.element.className="hotspots-container",this.element.style.pointerEvents="none",this.updateHotspots(t);const n=this.viewer.getDomElement();this.disposeFrameListener=this.viewer.onFrame(()=>{const r=this.viewer.getCamera();for(const o of this.hotspotInstances)o.updateScreenPosition(r,n)}),this.unsubscribeFocus=Rr(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="hover"&&e.source!=="pano"){if(this.options.museumId&&e.museumId!==this.options.museumId)return;const t=e.sceneId;this.hoveredSceneId!==t&&(this.hoveredSceneId&&this.setHotspotHighlight(this.hoveredSceneId,!1),this.hoveredSceneId=t,t&&this.setHotspotHighlight(t,!0))}}setHotspotHighlight(e,t){this.hotspotInstances.forEach(i=>{const n=i.getData();if(n.type==="scene"&&n.targetSceneId===e){const o=i.getElement();t?o.classList.add("hotspot--external-hover"):o.classList.remove("hotspot--external-hover")}})}updateHotspots(e){var n,r;this.hotspotInstances=[],this.element.innerHTML="";const t=((r=(n=window.matchMedia)==null?void 0:n.call(window,"(hover: none) and (pointer: coarse)"))==null?void 0:r.matches)??!1,i=o=>{var a,l,c,h,d,u,p,g;if(o.type==="scene"){const E=(a=o.target)==null?void 0:a.sceneId,A=E?(c=(l=this.options).resolveSceneName)==null?void 0:c.call(l,E):void 0,f=`进入：${A||o.label||E||"未知场景"}`;return new Qv({id:o.id,type:"scene",yaw:o.yaw,pitch:o.pitch,label:o.label||A||E,tooltip:f,targetSceneId:E})}if(o.type==="video"){const E=((h=o.target)==null?void 0:h.url)||o.src,A=((d=o.target)==null?void 0:d.poster)||o.poster,f=o.title||o.label;return new Hv({id:o.id,type:"video",yaw:o.yaw,pitch:o.pitch,label:o.label,tooltip:f,url:E,poster:A,title:f})}if(o.type==="image"){const E=((u=o.target)==null?void 0:u.imageUrl)||((p=o.target)==null?void 0:p.url)||o.src,A=o.title||o.label;return new Ov({id:o.id,type:"image",yaw:o.yaw,pitch:o.pitch,label:o.label,tooltip:A,imageUrl:E,title:A})}if(o.type==="info"){const E=o.title||o.label,A=((g=o.target)==null?void 0:g.text)||o.text;return new Gv({id:o.id,type:"info",yaw:o.yaw,pitch:o.pitch,label:o.label,tooltip:E,text:A,title:E})}return null};for(const o of e){const a=i(o);a&&(a.getElement().addEventListener("click",l=>{var d,u;l.preventDefault(),l.stopPropagation();const c=a.getData(),h=c.type==="scene";if(t&&a.showTooltip(1200),h){const p=c.targetSceneId;if(p&&this.options.onEnterScene){je(`进入 ${((u=(d=this.options).resolveSceneName)==null?void 0:u.call(d,p))||p}`,1e3),this.options.onEnterScene(p);return}}a.onClick()}),this.hotspotInstances.push(a),this.element.appendChild(a.getElement()))}}getElement(){return this.element}remove(){this.disposeFrameListener&&(this.disposeFrameListener(),this.disposeFrameListener=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class zv{constructor(){m(this,"element");m(this,"videoElement");m(this,"isOpen",!1);this.element=document.createElement("div"),this.element.className="video-player-overlay",this.videoElement=document.createElement("video"),this.videoElement.controls=!0,this.videoElement.playsInline=!0,this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="video-player-backdrop"></div>
      <div class="video-player-content">
        <button class="video-player-close">×</button>
        <div class="video-container"></div>
      </div>
    `;const e=this.element.querySelector(".video-container");e&&e.appendChild(this.videoElement);const t=this.element.querySelector(".video-player-backdrop"),i=this.element.querySelector(".video-player-close");t==null||t.addEventListener("click",()=>this.close()),i==null||i.addEventListener("click",()=>this.close())}play(e){const t=ni(e,ii.VIDEO);if(!t){console.error("视频 URL 为空");return}this.videoElement.src=t,this.videoElement.load(),this.open(),this.videoElement.play().catch(i=>{console.warn("自动播放失败，需要用户交互:",i)})}open(){this.isOpen=!0,this.element.classList.add("open"),document.body.style.overflow="hidden"}close(){this.isOpen=!1,this.element.classList.remove("open"),this.videoElement.pause(),this.videoElement.src="",document.body.style.overflow=""}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class Wv{constructor(){m(this,"element");this.element=document.createElement("div"),this.element.className="loading-overlay",this.render(),this.applyStyles();const e=()=>{ys()&&this.hide()};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}render(){this.element.innerHTML=`
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
    `,document.head.appendChild(e)}show(){ys()||this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.element.remove()}}const ld={[ie.INVALID_ROOT]:"配置格式错误",[ie.MISSING_APP_NAME]:"缺少应用名称",[ie.MUSEUMS_NOT_ARRAY]:"博物馆列表格式错误",[ie.MUSEUMS_EMPTY]:"博物馆列表为空",[ie.MISSING_MUSEUM_ID]:"缺少博物馆 ID",[ie.DUPLICATE_MUSEUM_ID]:"博物馆 ID 重复",[ie.MISSING_MUSEUM_NAME]:"缺少博物馆名称",[ie.MISSING_MUSEUM_COVER]:"缺少封面图",[ie.MISSING_MUSEUM_MAP]:"缺少地图配置",[ie.MISSING_MAP_IMAGE]:"缺少地图图片",[ie.INVALID_MAP_WIDTH]:"地图宽度无效",[ie.INVALID_MAP_HEIGHT]:"地图高度无效",[ie.SCENES_NOT_ARRAY]:"场景列表格式错误",[ie.SCENES_EMPTY]:"场景列表为空",[ie.MISSING_SCENE_ID]:"缺少场景 ID",[ie.DUPLICATE_SCENE_ID]:"场景 ID 重复",[ie.MISSING_SCENE_NAME]:"缺少场景名称",[ie.MISSING_PANO]:"缺少全景图",[ie.INVALID_PANO_URL]:"高清全景图 URL 无效",[ie.INVALID_PANOLOW_URL]:"低清全景图 URL 无效",[ie.MISSING_THUMB]:"缺少缩略图",[ie.MISSING_INITIAL_VIEW]:"缺少初始视角配置",[ie.INVALID_YAW]:"水平角度无效",[ie.INVALID_PITCH]:"垂直角度无效",[ie.INVALID_FOV]:"视野角度无效",[ie.MISSING_MAP_POINT]:"缺少地图点位",[ie.INVALID_MAP_POINT_X]:"地图点位 X 坐标无效",[ie.INVALID_MAP_POINT_Y]:"地图点位 Y 坐标无效",[ie.HOTSPOTS_NOT_ARRAY]:"热点列表格式错误",[ie.MISSING_HOTSPOT_ID]:"缺少热点 ID",[ie.DUPLICATE_HOTSPOT_ID]:"热点 ID 重复",[ie.INVALID_HOTSPOT_TYPE]:"热点类型无效",[ie.MISSING_HOTSPOT_LABEL]:"缺少热点标签",[ie.INVALID_HOTSPOT_YAW]:"热点水平角度无效",[ie.INVALID_HOTSPOT_PITCH]:"热点垂直角度无效",[ie.MISSING_HOTSPOT_TARGET]:"缺少热点目标配置",[ie.MISSING_TARGET_MUSEUM_ID]:"缺少目标博物馆 ID",[ie.MISSING_TARGET_SCENE_ID]:"缺少目标场景 ID",[ie.INVALID_TARGET_YAW]:"目标水平角度无效",[ie.INVALID_TARGET_PITCH]:"目标垂直角度无效",[ie.INVALID_TARGET_FOV]:"目标视野角度无效",[ie.MISSING_TARGET_URL]:"缺少视频链接"},cd={[ie.INVALID_ROOT]:"请确保 config.json 是一个有效的 JSON 对象",[ie.MISSING_APP_NAME]:'请在配置中添加 "appName" 字段，例如："appName": "我的 VR 展馆"',[ie.MUSEUMS_NOT_ARRAY]:'请确保 "museums" 是一个数组，例如："museums": []',[ie.MUSEUMS_EMPTY]:'请至少添加一个博物馆到 "museums" 数组中',[ie.MISSING_MUSEUM_ID]:'请为该博物馆添加 "id" 字段，例如："id": "museum1"',[ie.DUPLICATE_MUSEUM_ID]:'请确保每个博物馆的 "id" 都是唯一的，不能重复',[ie.MISSING_MUSEUM_NAME]:'请为该博物馆添加 "name" 字段，例如："name": "第一展馆"',[ie.MISSING_MUSEUM_COVER]:'请为该博物馆添加 "cover" 字段，填入封面图的 URL',[ie.MISSING_MUSEUM_MAP]:'请为该博物馆添加 "map" 对象配置',[ie.MISSING_MAP_IMAGE]:'请在地图配置中添加 "image" 字段，填入地图图片的 URL',[ie.INVALID_MAP_WIDTH]:'请确保 "map.width" 是一个大于 0 的数字',[ie.INVALID_MAP_HEIGHT]:'请确保 "map.height" 是一个大于 0 的数字',[ie.SCENES_NOT_ARRAY]:'请确保 "scenes" 是一个数组，例如："scenes": []',[ie.SCENES_EMPTY]:"请至少为该博物馆添加一个场景",[ie.MISSING_SCENE_ID]:'请为该场景添加 "id" 字段，例如："id": "scene1"',[ie.DUPLICATE_SCENE_ID]:'请确保同一博物馆内每个场景的 "id" 都是唯一的',[ie.MISSING_SCENE_NAME]:'请为该场景添加 "name" 字段，例如："name": "正门"',[ie.MISSING_PANO]:'请为该场景添加 "pano"、"panoLow" 或 "panoTiles" 字段，至少提供一种全景来源',[ie.INVALID_PANO_URL]:'请确保 "pano" 字段是一个有效的图片 URL 字符串',[ie.INVALID_PANOLOW_URL]:'请确保 "panoLow" 字段是一个有效的图片 URL 字符串',[ie.MISSING_THUMB]:'请为该场景添加 "thumb" 字段，填入缩略图的 URL',[ie.MISSING_INITIAL_VIEW]:'请为该场景添加 "initialView" 对象配置',[ie.INVALID_YAW]:'请确保 "initialView.yaw" 是一个数字（水平角度，范围 -180 到 180）',[ie.INVALID_PITCH]:'请确保 "initialView.pitch" 是一个数字（垂直角度，范围 -90 到 90）',[ie.INVALID_FOV]:'请确保 "initialView.fov" 是一个数字（视野角度，范围 30 到 120）',[ie.MISSING_MAP_POINT]:'请为该场景添加 "mapPoint" 对象配置',[ie.INVALID_MAP_POINT_X]:'请确保 "mapPoint.x" 是一个数字（地图上的 X 坐标）',[ie.INVALID_MAP_POINT_Y]:'请确保 "mapPoint.y" 是一个数字（地图上的 Y 坐标）',[ie.HOTSPOTS_NOT_ARRAY]:'请确保 "hotspots" 是一个数组，例如："hotspots": []',[ie.MISSING_HOTSPOT_ID]:'请为该热点添加 "id" 字段，例如："id": "hotspot1"',[ie.DUPLICATE_HOTSPOT_ID]:'请确保同一场景内每个热点的 "id" 都是唯一的',[ie.INVALID_HOTSPOT_TYPE]:'请确保 "type" 字段是 "scene" 或 "video" 之一',[ie.MISSING_HOTSPOT_LABEL]:'请为该热点添加 "label" 字段，例如："label": "进入展厅"',[ie.INVALID_HOTSPOT_YAW]:'请确保 "yaw" 是一个数字（热点在全景图中的水平位置）',[ie.INVALID_HOTSPOT_PITCH]:'请确保 "pitch" 是一个数字（热点在全景图中的垂直位置）',[ie.MISSING_HOTSPOT_TARGET]:'请为该热点添加 "target" 对象配置',[ie.MISSING_TARGET_MUSEUM_ID]:'场景跳转类型的热点必须包含 "target.museumId" 字段',[ie.MISSING_TARGET_SCENE_ID]:'场景跳转类型的热点必须包含 "target.sceneId" 字段',[ie.INVALID_TARGET_YAW]:'请确保 "target.yaw" 是一个数字（跳转后的水平角度）',[ie.INVALID_TARGET_PITCH]:'请确保 "target.pitch" 是一个数字（跳转后的垂直角度）',[ie.INVALID_TARGET_FOV]:'请确保 "target.fov" 是一个数字（跳转后的视野角度）',[ie.MISSING_TARGET_URL]:'视频类型的热点必须包含 "target.url" 字段，填入视频的 URL'};class Yv{constructor(e,t,i){m(this,"element");this.element=document.createElement("div"),this.element.className="config-error-panel",this.render(e,t,i),this.applyStyles()}render(e,t,i){this.element.innerHTML=`
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
    `;const n=this.element.querySelector("#retry-btn"),r=this.element.querySelector("#example-btn");n&&n.addEventListener("click",t),r&&r.addEventListener("click",i)}renderErrorCard(e,t){const i=ld[e.code]||"配置错误",n=cd[e.code]||"请检查配置文件的格式和内容",r=[];e.museumName&&r.push(`馆：${e.museumName}`),e.sceneName&&r.push(`场景：${e.sceneName}`);const o=r.length>0?r.join(" / "):"全局配置";return`
      <div class="error-card">
        <div class="error-card-header">
          <span class="error-icon">❌</span>
          <span class="error-title">${this.escapeHtml(i)}</span>
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
            <span class="hint-text">${this.escapeHtml(n)}</span>
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class qv{constructor(){m(this,"element");m(this,"isVisible",!1);m(this,"currentYaw",0);m(this,"currentPitch",0);m(this,"currentFov",75);m(this,"clickX",0);m(this,"clickY",0);this.element=document.createElement("div"),this.element.className="debug-panel",this.element.style.display="none",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
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
    `;const e=this.element.querySelector("#debug-close-btn");e&&e.addEventListener("click",()=>{this.hide()});const t=this.element.querySelector("#debug-copy-btn");t&&t.addEventListener("click",()=>{this.copyHotspotJSON()})}show(e,t,i,n,r){this.clickX=e,this.clickY=t,this.currentYaw=i,this.currentPitch=n,this.currentFov=r;const o=this.element.querySelector("#debug-yaw"),a=this.element.querySelector("#debug-pitch"),l=this.element.querySelector("#debug-fov");o&&(o.textContent=i.toFixed(1)),a&&(a.textContent=n.toFixed(1)),l&&(l.textContent=r.toFixed(1));const c=280,h=200,d=20;let u=e-c/2,p=t-h/2;u=Math.max(d,Math.min(u,window.innerWidth-c-d)),p=Math.max(d,Math.min(p,window.innerHeight-h-d)),this.element.style.left=`${u}px`,this.element.style.top=`${p}px`,this.element.style.display="block",this.isVisible=!0}hide(){this.element.style.display="none",this.isVisible=!1}updateView(e,t,i){if(this.currentYaw=e,this.currentPitch=t,this.currentFov=i,this.isVisible){const n=this.element.querySelector("#debug-yaw"),r=this.element.querySelector("#debug-pitch"),o=this.element.querySelector("#debug-fov");n&&(n.textContent=e.toFixed(1)),r&&(r.textContent=t.toFixed(1)),o&&(o.textContent=i.toFixed(1))}}async copyHotspotJSON(){const e={id:`hs_${Date.now()}`,yaw:Math.round(this.currentYaw*10)/10,pitch:Math.round(this.currentPitch*10)/10,type:"scene",targetSceneId:"",label:"热点"},t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),this.showToast("✅ 已复制到剪贴板")}catch{const n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.opacity="0",document.body.appendChild(n),n.select();try{document.execCommand("copy"),this.showToast("✅ 已复制到剪贴板")}catch{this.showToast("❌ 复制失败，请手动复制")}document.body.removeChild(n)}}showToast(e){const t=document.createElement("div");t.className="debug-toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},10),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},2e3)}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}const Ba="vrplayer_config_draft_v1";function Hc(){try{const s=localStorage.getItem(Ba);return s?JSON.parse(s):null}catch(s){return console.warn("加载草稿失败",s),null}}function Xv(s){try{const e=JSON.stringify(s);return localStorage.setItem(Ba,e),{ok:!0}}catch(e){return console.warn("保存草稿失败",e),{ok:!1,reason:e instanceof Error?e.message:"unknown"}}}function $v(){try{localStorage.removeItem(Ba)}catch(s){console.warn("清空草稿失败",s)}}const hd="vr_last_pick_v1";let La=null;function Jv(){try{const s=localStorage.getItem(hd);if(s){const e=JSON.parse(s);typeof e.yaw=="number"&&typeof e.pitch=="number"&&typeof e.ts=="number"&&(La=e)}}catch{}}Jv();function Kv(s){La=s;try{localStorage.setItem(hd,JSON.stringify(s))}catch{}}function Vc(){return La}const zc="vrplayer_config_draft_ignore_session";class jv{constructor(e,t){m(this,"element");m(this,"config");m(this,"initialConfig");m(this,"editingTarget",{type:"global"});m(this,"simpleMode",!0);m(this,"validationErrors",[]);m(this,"validationDebounceTimer",null);m(this,"draftSaveTimer",null);m(this,"draftLoaded",!1);m(this,"draftIgnoreSession",!1);m(this,"draftBannerMessage",null);m(this,"onConfigChange");this.config=JSON.parse(JSON.stringify(e)),this.initialConfig=JSON.parse(JSON.stringify(e)),this.onConfigChange=t;try{this.draftIgnoreSession=sessionStorage.getItem(zc)==="1"}catch(i){console.warn("读取草稿忽略状态失败",i),this.draftIgnoreSession=!1}this.tryRestoreDraft(),this.element=document.createElement("div"),this.element.className="config-studio",this.render(),this.applyStyles(),this.renderDraftBanner(),this.validateConfig()}tryRestoreDraft(){if(this.draftIgnoreSession)return;const e=Hc();e&&(this.config=JSON.parse(JSON.stringify(e)),this.draftLoaded=!0,this.draftBannerMessage="检测到未导出的草稿，已自动恢复。",this.onConfigChange&&this.onConfigChange(this.config))}renderDraftBanner(){const e=this.element.querySelector("#draft-banner");if(!e)return;if(!this.draftLoaded||this.draftIgnoreSession){e.innerHTML="",e.style.display="none";return}const t=this.draftBannerMessage||"检测到未导出的草稿，已自动恢复。";e.innerHTML=`
      <div class="draft-banner-content">
        <span class="draft-banner-text">${this.escapeHtml(t)}</span>
        <div class="draft-banner-actions">
          <button class="banner-btn" data-banner-action="export">导出</button>
          <button class="banner-btn" data-banner-action="clear">清空草稿</button>
          <button class="banner-btn" data-banner-action="ignore">忽略本次</button>
        </div>
      </div>
    `,e.style.display="flex",this.bindDraftBannerEvents()}bindDraftBannerEvents(){const e=this.element.querySelector("#draft-banner");e&&e.querySelectorAll("[data-banner-action]").forEach(t=>{t.addEventListener("click",i=>{const n=i.currentTarget.getAttribute("data-banner-action");n==="export"?this.handleExport():n==="clear"?this.handleClearDraft():n==="ignore"&&this.handleIgnoreDraft()})})}handleIgnoreDraft(){this.draftIgnoreSession=!0;try{sessionStorage.setItem(zc,"1")}catch(e){console.warn("记录忽略草稿状态失败",e)}this.config=JSON.parse(JSON.stringify(this.initialConfig)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.bindEvents(),this.debouncedValidate(),this.notifyChange({skipDraftSave:!0}),this.renderDraftBanner(),this.showToast("已忽略草稿，本次会话使用默认配置")}handleClearDraft(){confirm("确定清空本地草稿？")&&($v(),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderDraftBanner(),this.showToast("草稿已清空"))}handleExport(){this.exportConfig();const e=Hc();e&&this.isConfigSameAs(e)&&this.showToast("已导出（草稿仍保留）")}exportConfig(){const e=JSON.stringify(this.config,null,2),t=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download="config.json",n.click(),URL.revokeObjectURL(i)}isConfigSameAs(e){try{return JSON.stringify(this.config)===JSON.stringify(e)}catch{return!1}}render(){this.element.innerHTML=`
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
      ${this.config.museums.map((t,i)=>`
        <div class="tree-item museum-item ${this.editingTarget.type==="museum"&&this.editingTarget.museumIndex===i?"active":""}" data-target="museum:${i}">
          <span class="tree-icon">🏛️</span>
          <span class="tree-label">${this.escapeHtml(t.name)}</span>
          <button class="tree-btn-add" data-action="add-scene" data-museum="${i}" title="添加场景">+</button>
          <button class="tree-btn-del" data-action="del-museum" data-museum="${i}" title="删除博物馆">×</button>
        </div>
        ${t.scenes.map((n,r)=>`
          <div class="tree-item scene-item ${this.editingTarget.type==="scene"&&this.editingTarget.museumIndex===i&&this.editingTarget.sceneIndex===r?"active":""}" data-target="scene:${i}:${r}">
            <span class="tree-icon">📷</span>
            <span class="tree-label">${this.escapeHtml(n.name)}</span>
            ${this.simpleMode?`
              <button class="tree-btn-add" data-action="add-hotspot-scene" data-museum="${i}" data-scene="${r}" title="添加跳转热点">+ 添加跳转</button>
              <button class="tree-btn-add" data-action="add-hotspot-video" data-museum="${i}" data-scene="${r}" title="添加视频热点">+ 添加视频</button>
            `:`
              <button class="tree-btn-add" data-action="add-hotspot" data-museum="${i}" data-scene="${r}" title="添加热点">+</button>
            `}
            <button class="tree-btn-del" data-action="del-scene" data-museum="${i}" data-scene="${r}" title="删除场景">×</button>
          </div>
          ${n.hotspots.map((o,a)=>`
            <div class="tree-item hotspot-item ${this.editingTarget.type==="hotspot"&&this.editingTarget.museumIndex===i&&this.editingTarget.sceneIndex===r&&this.editingTarget.hotspotIndex===a?"active":""}" data-target="hotspot:${i}:${r}:${a}">
              <span class="tree-icon">📍</span>
              <span class="tree-label">${this.escapeHtml(o.label)}${this.simpleMode&&o.type!=="scene"&&o.type!=="video"?"（高级模式编辑）":""}</span>
              <button class="tree-btn-del" data-action="del-hotspot" data-museum="${i}" data-scene="${r}" data-hotspot="${a}" title="删除热点">×</button>
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
      `;return}if(this.editingTarget.type==="museum"){const i=this.config.museums[this.editingTarget.museumIndex];e.textContent=`编辑博物馆：${i.name}`,t.innerHTML=`
        <div class="form-group">
          <label>馆ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(i.id)}" placeholder="museum_id">
        </div>
        <div class="form-group">
          <label>馆名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(i.name)}" placeholder="博物馆名称">
        </div>
        <div class="form-group">
          <label>封面图 URL</label>
          <input type="text" id="field-cover" value="${this.escapeHtml(i.cover)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
      `;return}if(this.editingTarget.type==="scene"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];e.textContent=`编辑场景：${i.name}`,t.innerHTML=`
        <div class="form-group">
          <label>场景ID</label>
          <input type="text" id="field-id" value="${this.escapeHtml(i.id)}" placeholder="scene_id">
        </div>
        <div class="form-group">
          <label>场景名</label>
          <input type="text" id="field-name" value="${this.escapeHtml(i.name)}" placeholder="场景名称">
        </div>
        <div class="form-group">
          <label>缩略图</label>
          <input type="text" id="field-thumb" value="${this.escapeHtml(i.thumb)}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-group">
          <label>低清全景 (panoLow)</label>
          <input type="text" id="field-panoLow" value="${i.panoLow?this.escapeHtml(i.panoLow):""}" placeholder="https://...">
          <div class="input-hint">首屏快速加载，网络慢时优先使用</div>
        </div>
        <div class="form-group">
          <label>高清全景 (pano)</label>
          <input type="text" id="field-pano" value="${i.pano?this.escapeHtml(i.pano):""}" placeholder="https://...">
          <div class="input-hint">建议使用可直接访问的 https 链接</div>
        </div>
        <div class="form-actions">
          <button class="btn-preview" id="preview-scene-btn">👁️ 预览此场景</button>
          <button class="btn-pick-hotspot" id="pick-hotspot-btn">🎯 用拾取落点新增热点</button>
        </div>
      `;return}if(this.editingTarget.type==="hotspot"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex],n=i.type==="scene",r=i.type==="video";if(e.textContent=`编辑热点：${i.label}`,!n&&!r){t.innerHTML=`
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
            <option value="scene" ${n?"selected":""}>跳转场景</option>
            <option value="video" ${r?"selected":""}>播放视频</option>
          </select>
        </div>
        <div class="form-group">
          <label>热点标题</label>
          <input type="text" id="field-label" value="${this.escapeHtml(i.label)}" placeholder="如：进入展厅">
        </div>
        <div class="form-group">
          <label>左右角度 (yaw)</label>
          <input type="number" id="field-yaw" value="${i.yaw??0}" step="0.1">
        </div>
        <div class="form-group">
          <label>上下角度 (pitch)</label>
          <input type="number" id="field-pitch" value="${i.pitch??0}" step="0.1">
        </div>
        ${n?`
          <div class="form-group">
            <label>目标场景 ID</label>
            <input type="text" id="field-target-sceneId" value="${i.target.sceneId||""}" placeholder="scene_id">
            <div class="input-hint">跳转到同馆内的场景 ID</div>
          </div>
        `:`
          <div class="form-group">
            <label>视频链接</label>
            <input type="text" id="field-target-url" value="${i.target.url||""}" placeholder="https://...">
            <div class="input-hint">建议使用可直接访问的 https 链接</div>
          </div>
        `}
      `;return}}renderAdvancedForm(e,t){if(this.editingTarget.type==="global")e.textContent="全局配置",t.innerHTML=this.renderGlobalForm();else if(this.editingTarget.type==="museum"){const i=this.config.museums[this.editingTarget.museumIndex];e.textContent=`编辑博物馆：${i.name}`,t.innerHTML=this.renderMuseumForm(i,this.editingTarget.museumIndex)}else if(this.editingTarget.type==="scene"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];e.textContent=`编辑场景：${i.name}`,t.innerHTML=this.renderSceneForm(i,this.editingTarget.museumIndex,this.editingTarget.sceneIndex)}else if(this.editingTarget.type==="hotspot"){const i=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];e.textContent=`编辑热点：${i.label}`,t.innerHTML=this.renderHotspotForm(i,this.editingTarget.museumIndex,this.editingTarget.sceneIndex,this.editingTarget.hotspotIndex)}}renderGlobalForm(){return`
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
    `}renderSceneForm(e,t,i){return`
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
    `}renderHotspotForm(e,t,i,n){const r=e.type==="scene";return`
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
    `}bindEvents(){var o;const e=this.element.querySelector("#import-btn"),t=this.element.querySelector("#export-btn"),i=this.element.querySelector("#reset-btn"),n=this.element.querySelector("#clear-draft-btn");this.element.querySelector("#file-input");const r=this.element.querySelector("#simple-mode-toggle");r&&(r.checked=this.simpleMode,r.addEventListener("change",()=>{this.simpleMode=r.checked,this.renderSidebar(),this.renderEditor(),this.bindEvents()})),e==null||e.addEventListener("click",()=>{const a=prompt("请粘贴 JSON 配置：");if(a)try{const l=JSON.parse(a);this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(l){alert("JSON 格式错误："+l)}}),t==null||t.addEventListener("click",()=>{this.handleExport()}),i==null||i.addEventListener("click",async()=>{try{const l=await(await fetch("./config.json",{cache:"no-store"})).json();this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(a){alert("加载示例配置失败："+a)}}),n==null||n.addEventListener("click",()=>{this.handleClearDraft()}),this.element.querySelectorAll(".tree-item[data-target]").forEach(a=>{a.addEventListener("click",l=>{const c=a.getAttribute("data-target");if(c){if(c==="global")this.editingTarget={type:"global"};else if(c.startsWith("museum:")){const h=parseInt(c.split(":")[1]);this.editingTarget={type:"museum",museumIndex:h}}else if(c.startsWith("scene:")){const[h,d,u]=c.split(":").map(Number);this.editingTarget={type:"scene",museumIndex:d,sceneIndex:u}}else if(c.startsWith("hotspot:")){const[h,d,u,p]=c.split(":").map(Number);this.editingTarget={type:"hotspot",museumIndex:d,sceneIndex:u,hotspotIndex:p}}this.renderSidebar(),this.renderEditor(),this.bindFormEvents()}})}),(o=this.element.querySelector("#add-museum-btn"))==null||o.addEventListener("click",()=>{this.addMuseum()}),this.element.querySelectorAll("[data-action]").forEach(a=>{a.addEventListener("click",l=>{l.stopPropagation();const c=a.getAttribute("data-action"),h=parseInt(a.getAttribute("data-museum")||"0"),d=parseInt(a.getAttribute("data-scene")||"0"),u=parseInt(a.getAttribute("data-hotspot")||"0");c==="add-scene"?this.addScene(h):c==="del-museum"?confirm("确定删除此博物馆？")&&this.deleteMuseum(h):c==="add-hotspot"?this.addHotspot(h,d,"scene"):c==="add-hotspot-scene"?this.addHotspot(h,d,"scene"):c==="add-hotspot-video"?this.addHotspot(h,d,"video"):c==="del-scene"?confirm("确定删除此场景？")&&this.deleteScene(h,d):c==="del-hotspot"&&confirm("确定删除此热点？")&&this.deleteHotspot(h,d,u)})}),this.bindFormEvents()}bindFormEvents(){if(this.editingTarget.type==="global"){const e=this.element.querySelector("#field-appName");e==null||e.addEventListener("input",()=>{this.config.appName=e.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="museum"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),i=this.element.querySelector("#field-cover");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].cover=i.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="scene"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),i=this.element.querySelector("#field-thumb"),n=this.element.querySelector("#field-panoLow"),r=this.element.querySelector("#field-pano"),o=this.element.querySelector("#preview-scene-btn");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].thumb=i.value,this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];n.value?l.panoLow=n.value:delete l.panoLow,this.debouncedValidate(),this.notifyChange()}),r==null||r.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];r.value?l.pano=r.value:delete l.pano,this.debouncedValidate(),this.notifyChange()}),o==null||o.addEventListener("click",()=>{const l=this.config.museums[this.editingTarget.museumIndex],c=l.scenes[this.editingTarget.sceneIndex];ti(l.id,c.id)});const a=this.element.querySelector("#pick-hotspot-btn");a==null||a.addEventListener("click",()=>{this.handleAddHotspotFromPick()})}if(this.editingTarget.type==="hotspot"){const e=this.element.querySelector("#field-type"),t=this.element.querySelector("#field-label"),i=this.element.querySelector("#field-yaw"),n=this.element.querySelector("#field-pitch"),r=this.element.querySelector("#field-target-museumId"),o=this.element.querySelector("#field-target-sceneId"),a=this.element.querySelector("#field-target-url");e==null||e.addEventListener("change",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];c.type=e.value,c.type==="scene"?c.target={museumId:"",sceneId:""}:c.target={url:""},this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].label=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),i==null||i.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].yaw=parseFloat(i.value)||0,this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].pitch=parseFloat(n.value)||0,this.debouncedValidate(),this.notifyChange()});const l=this.element.querySelector("#pick-reposition-btn");l==null||l.addEventListener("click",()=>{this.handleRepositionHotspot()}),r&&r.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.museumId||(c.museumId=""),c.museumId=r.value,this.debouncedValidate(),this.notifyChange()}),o&&o.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.sceneId||(c.sceneId=""),c.sceneId=o.value,this.debouncedValidate(),this.notifyChange()}),a&&a.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.url||(c.url=""),c.url=a.value,this.debouncedValidate(),this.notifyChange()})}}addMuseum(){const e={id:`museum_${Date.now()}`,name:"新博物馆",cover:"",map:{image:"",width:1e3,height:600},scenes:[]};this.config.museums.push(e),this.editingTarget={type:"museum",museumIndex:this.config.museums.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addScene(e){const t={id:`scene_${Date.now()}`,name:"新场景",thumb:"",pano:"",initialView:{yaw:0,pitch:0,fov:75},mapPoint:{x:0,y:0},hotspots:[]};this.config.museums[e].scenes.push(t),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:this.config.museums[e].scenes.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addHotspot(e,t,i="scene"){const n={id:`hotspot_${Date.now()}`,type:i,label:i==="video"?"新视频热点":"新跳转热点",yaw:0,pitch:0,target:i==="video"?{url:""}:{museumId:this.config.museums[e].id,sceneId:""}};this.config.museums[e].scenes[t].hotspots.push(n),this.editingTarget={type:"hotspot",museumIndex:e,sceneIndex:t,hotspotIndex:this.config.museums[e].scenes[t].hotspots.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteMuseum(e){this.config.museums.splice(e,1),this.editingTarget={type:"global"},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteScene(e,t){this.config.museums[e].scenes.splice(t,1),this.editingTarget={type:"museum",museumIndex:e},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteHotspot(e,t,i){this.config.museums[e].scenes[t].hotspots.splice(i,1),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:t},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}debouncedValidate(){this.validationDebounceTimer&&clearTimeout(this.validationDebounceTimer),this.validationDebounceTimer=window.setTimeout(()=>{this.validateConfig()},200)}validateConfig(){this.validationErrors=Kc(this.config),this.updateValidationStatus(),this.renderErrors()}scheduleDraftSave(e){e||(this.draftSaveTimer&&clearTimeout(this.draftSaveTimer),this.draftSaveTimer=window.setTimeout(()=>{const t=Xv(this.config);t.ok?this.draftLoaded=!0:this.showToast(`草稿保存失败：${t.reason||"未知原因"}`)},300))}updateValidationStatus(){const e=this.element.querySelector("#validation-status");e&&(this.validationErrors.length===0?(e.innerHTML="✅ 配置通过",e.className="validation-status status-ok"):(e.innerHTML=`❌ ${this.validationErrors.length} 个错误`,e.className="validation-status status-error"))}renderErrors(){const e=this.element.querySelector("#studio-errors");if(e){if(this.validationErrors.length===0){e.innerHTML="";return}e.innerHTML=`
      <div class="studio-errors-content">
        <div class="errors-header">配置错误 (${this.validationErrors.length} 个)</div>
        <div class="errors-list">
          ${this.validationErrors.map(t=>{const i=t.code&&ld[t.code]||"配置错误",n=t.code&&cd[t.code]||"请检查配置",r=[];t.museumName&&r.push(`馆：${t.museumName}`),t.sceneName&&r.push(`点位：${t.sceneName}`);const o=r.length>0?r.join(" / "):"全局配置";return`
              <div class="error-card-mini">
                <div class="error-card-header">
                  <span class="error-icon">❌</span>
                  <span class="error-title">${this.escapeHtml(i)}</span>
                </div>
                <div class="error-card-body">
                  <div class="error-location">📍 ${this.escapeHtml(o)}</div>
                  ${t.fieldName?`<div class="error-field">字段：${this.escapeHtml(t.fieldName)}</div>`:""}
                  <div class="error-hint">💡 ${this.escapeHtml(n)}</div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}}notifyChange(e){this.onConfigChange&&this.onConfigChange(this.config),this.scheduleDraftSave(!!(e!=null&&e.skipDraftSave))}showToast(e){const t=document.createElement("div");t.className="studio-toast",t.textContent=e,this.element.appendChild(t),requestAnimationFrame(()=>{t.classList.add("show")}),window.setTimeout(()=>{t.classList.remove("show"),window.setTimeout(()=>t.remove(),300)},2e3)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}handleAddHotspotFromPick(){const e=Vc();if(!e){je("没有拾取点：先点右上角🎯，在全景里点一下");return}if(this.editingTarget.type!=="scene"){je("请先选择一个场景");return}const{museumIndex:t,sceneIndex:i}=this.editingTarget,n=this.config.museums[t].scenes[i],r={id:`hs_${Date.now()}`,type:"scene",yaw:e.yaw,pitch:e.pitch,label:"进入场景",target:{sceneId:""}};n.hotspots||(n.hotspots=[]),n.hotspots.push(r),this.renderSidebar(),this.renderEditor(),this.bindFormEvents();const o=n.hotspots.length-1;this.highlightNewHotspot(t,i,o),this.editingTarget={type:"hotspot",museumIndex:t,sceneIndex:i,hotspotIndex:o},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange(),je("已新增热点：请在配置里补全目标场景")}highlightNewHotspot(e,t,i){window.setTimeout(()=>{const n=this.element.querySelector("#sidebar-tree");if(!n)return;const r=n.querySelectorAll(".hotspot-item"),o=r[r.length-1];o&&(o.classList.add("tree-item--flash"),window.setTimeout(()=>{o.classList.remove("tree-item--flash")},300))},50)}handleRepositionHotspot(){if(this.editingTarget.type!=="hotspot"){je("请先选择一个热点");return}const e=Vc();if(!e){je("没有拾取点：先点右上角🎯，在全景里点一下");return}const{museumIndex:t,sceneIndex:i,hotspotIndex:n}=this.editingTarget,r=this.config.museums[t].scenes[i].hotspots[n],o=c=>Math.round(c*10)/10,a=o(e.yaw),l=o(e.pitch);r.yaw=a,r.pitch=l,this.renderEditor(),this.bindFormEvents(),this.highlightHotspotItem(t,i,n),this.debouncedValidate(),this.notifyChange(),window.dispatchEvent(new CustomEvent("vr:pickmode",{detail:{enabled:!1}})),je(`已更新位置 yaw:${a.toFixed(1)} pitch:${l.toFixed(1)}`)}highlightHotspotItem(e,t,i){window.setTimeout(()=>{const n=this.element.querySelector("#sidebar-tree");if(!n)return;const r=`hotspot:${e}:${t}:${i}`,o=n.querySelector(`[data-target="${r}"]`);o&&(o.classList.add("tree-item--flash"),window.setTimeout(()=>{o.classList.remove("tree-item--flash")},300))},50)}getConfig(){return this.config}getElement(){return this.element}remove(){this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}}let Ui=null;function dd(){return Ui!==null?Ui:typeof navigator<"u"&&navigator.maxTouchPoints>0||typeof window<"u"&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)?(Ui="touch",Ui):(Ui="mouse",Ui)}function ud(){return dd()==="touch"}function fd(){return dd()==="mouse"}function Zv(){const s=document;return document.fullscreenElement||s.webkitFullscreenElement||null}function Tr(){return!!Zv()}async function e0(s){const e=s;if(e.requestFullscreen){await e.requestFullscreen();return}if(e.webkitRequestFullscreen){await e.webkitRequestFullscreen();return}throw new Error("Fullscreen API not supported")}async function t0(){const s=document;if(document.exitFullscreen){await document.exitFullscreen();return}if(s.webkitExitFullscreen){await s.webkitExitFullscreen();return}}async function pd(s){const e=s||document.body;!Tr()&&fd()&&je("鼠标滑至最上方可退出全屏",700),await e0(e)}async function la(){try{await t0(),Ad()}catch(s){console.debug("[fullscreen] exitFullscreenBestEffort failed:",s)}}function Ad(){var s,e;try{(e=(s=screen.orientation)==null?void 0:s.unlock)==null||e.call(s)}catch{}}function i0(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 4H4V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 4H20V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 20H4V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 20H20V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function n0(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 9V4h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 9V4h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 15v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 15v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 9l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 9l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 15l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 15l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}class s0{constructor(e={}){m(this,"element");m(this,"fullscreenBtn");m(this,"pickModeBtn",null);m(this,"northCalibrationBtn",null);m(this,"vrModeBtn",null);m(this,"viewerRootEl");m(this,"onTogglePickMode");m(this,"onOpenNorthCalibration");m(this,"onToggleVrMode");m(this,"isPickModeActive",!1);m(this,"isVrModeActive",!1);this.viewerRootEl=e.viewerRootEl,this.onTogglePickMode=e.onTogglePickMode,this.onOpenNorthCalibration=e.onOpenNorthCalibration,this.onToggleVrMode=e.onToggleVrMode,this.element=document.createElement("div"),this.element.className="vr-topright-controls";const t=r=>{const o=r;this.updatePickModeState(o.detail.enabled)};window.addEventListener("vr:pickmode",t);const i=()=>{this.syncFullscreenState()};document.addEventListener("fullscreenchange",i),document.addEventListener("webkitfullscreenchange",i),this.fullscreenBtn=document.createElement("button"),this.fullscreenBtn.className="vr-topright-btn vr-top-icon-only vr-icon-btn",this.fullscreenBtn.setAttribute("aria-label","进入全屏"),this.fullscreenBtn.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation();const o=Tr();try{if(o)await la();else{const a=this.viewerRootEl;if(!a){console.warn("[TopRightControls] fullscreen target not set");return}await pd(a)}}catch(a){ft&&console.debug("[TopRightControls] fullscreen toggle failed",a)}finally{setTimeout(()=>{this.syncFullscreenState()},100)}}),this.syncFullscreenState(),this.onTogglePickMode&&(this.pickModeBtn=document.createElement("button"),this.pickModeBtn.className="vr-topright-btn",this.pickModeBtn.setAttribute("aria-label","拾取模式"),this.pickModeBtn.title="拾取模式：点一下画面获取 yaw/pitch",this.pickModeBtn.textContent="🎯",this.pickModeBtn.style.fontSize="18px",this.pickModeBtn.addEventListener("click",r=>{if(r.preventDefault(),r.stopPropagation(),this.onTogglePickMode){const o=this.onTogglePickMode();this.updatePickModeState(o)}}),this.element.appendChild(this.pickModeBtn)),e.showNorthCalibration!==!1&&(e.onOpenNorthCalibration||ft)&&this.onOpenNorthCalibration&&(this.northCalibrationBtn=document.createElement("button"),this.northCalibrationBtn.className="vr-topright-btn",this.northCalibrationBtn.setAttribute("aria-label","校准北向"),this.northCalibrationBtn.title="校准北向：设置当前场景的北方向",this.northCalibrationBtn.textContent="🧭",this.northCalibrationBtn.style.fontSize="18px",this.northCalibrationBtn.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.onOpenNorthCalibration&&this.onOpenNorthCalibration()}),this.element.appendChild(this.northCalibrationBtn)),ud()&&this.onToggleVrMode&&(this.vrModeBtn=document.createElement("button"),this.vrModeBtn.className="vr-topright-btn vr-top-icon-only vr-icon-btn",this.vrModeBtn.setAttribute("aria-label","VR眼镜"),this.vrModeBtn.title="VR眼镜：转动设备控制视角",this.vrModeBtn.textContent="🥽",this.vrModeBtn.style.fontSize="18px",this.vrModeBtn.addEventListener("click",async r=>{if(r.preventDefault(),r.stopPropagation(),this.onToggleVrMode)try{const o=await this.onToggleVrMode();this.updateVrModeState(o)}catch(o){ft&&console.debug("[TopRightControls] VR mode toggle failed",o)}}),this.element.appendChild(this.vrModeBtn)),this.element.appendChild(this.fullscreenBtn)}updatePickModeState(e){this.isPickModeActive=e,this.pickModeBtn&&(this.pickModeBtn.setAttribute("aria-label",e?"关闭拾取模式":"开启拾取模式"),this.pickModeBtn.title=e?"关闭拾取模式":"开启拾取模式：点一下画面获取 yaw/pitch",e?this.pickModeBtn.style.background="rgba(255,255,255,0.18)":this.pickModeBtn.style.background="")}updateVrModeState(e){this.isVrModeActive=e,this.vrModeBtn&&(this.vrModeBtn.setAttribute("aria-label",e?"退出VR模式":"进入VR模式"),this.vrModeBtn.title=e?"退出VR模式":"VR眼镜：转动设备控制视角",e?this.vrModeBtn.style.background="rgba(255,255,255,0.18)":this.vrModeBtn.style.background="")}setViewerRootEl(e){this.viewerRootEl=e}syncFullscreenState(){const e=Tr();this.fullscreenBtn.setAttribute("aria-label",e?"退出全屏":"进入全屏"),this.fullscreenBtn.title=e?"退出全屏":"进入全屏",this.fullscreenBtn.innerHTML=e?n0():i0()}getElement(){return this.element}remove(){this.element.remove()}}async function md(s){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(s),!0}catch(e){console.debug("[copyText] Clipboard API failed, using fallback:",e)}try{const e=document.createElement("textarea");e.value=s,e.style.position="fixed",e.style.top="-9999px",e.style.left="-9999px",e.style.opacity="0",e.setAttribute("readonly","readonly"),document.body.appendChild(e),e.select(),e.setSelectionRange(0,s.length);const t=document.execCommand("copy");return document.body.removeChild(e),t}catch(e){return console.debug("[copyText] execCommand fallback failed:",e),!1}}class r0{constructor(e={}){m(this,"root");m(this,"backdrop");m(this,"card");m(this,"closeBtn");m(this,"isOpen",!1);m(this,"onCloseCallback");m(this,"escapeHandler");this.onCloseCallback=e.onClose,this.root=document.createElement("div"),this.root.className="vr-teammodal",this.backdrop=document.createElement("div"),this.backdrop.className="vr-teammodal-backdrop",this.backdrop.addEventListener("click",()=>this.close()),this.root.appendChild(this.backdrop),this.card=document.createElement("div"),this.card.className="vr-teammodal-card",this.closeBtn=document.createElement("button"),this.closeBtn.className="vr-teammodal-close",this.closeBtn.innerHTML="×",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.addEventListener("click",()=>this.close()),this.closeBtn.addEventListener("touchstart",p=>{p.stopPropagation(),this.close()});const t=document.createElement("div");t.className="vr-teammodal-title",t.textContent="鼎虎清源";const i=document.createElement("div");i.className="vr-teammodal-subtitle",i.textContent="VR 研学项目";const n=document.createElement("div");n.className="vr-teammodal-content";const r=document.createElement("p");r.className="vr-teammodal-text",r.textContent="致力于打造沉浸式虚拟现实研学体验，让学习更生动、更直观。";const o=document.createElement("p");o.className="vr-teammodal-text",o.textContent="通过 360° 全景技术，为师生提供身临其境的探索之旅。";const a=document.createElement("p");a.className="vr-teammodal-text",a.textContent="融合创新科技与教育理念，开启数字化学习新篇章。";const l=document.createElement("div");l.className="vr-teammodal-support";const c=document.createElement("div");c.textContent="技术支持：kyu",l.appendChild(c);const h=document.createElement("div");h.className="copyable",h.setAttribute("data-copy","onekyu"),h.textContent="微信：onekyu(点此复制)",h.style.cursor="pointer",h.addEventListener("click",async()=>{const p=h.getAttribute("data-copy");p&&await md(p)&&(je("微信号已复制"),ft&&console.debug("[TeamIntroModal] 微信号已复制:",p))}),l.appendChild(h);const d=document.createElement("div");d.className="vr-teammodal-footer",d.textContent="© 2025 鼎虎清源",n.appendChild(r),n.appendChild(o),n.appendChild(a),n.appendChild(l);const u=document.createElement("div");u.className="vr-teammodal-header",u.appendChild(t),u.appendChild(this.closeBtn),this.card.appendChild(u),this.card.appendChild(i),this.card.appendChild(n),this.card.appendChild(d),this.root.appendChild(this.card),this.escapeHandler=p=>{p.key==="Escape"&&this.isOpen&&this.close()},window.addEventListener("keydown",this.escapeHandler)}getModalRoot(){let e=document.getElementById("vr-modal-root");if(!e&&(ad(),e=document.getElementById("vr-modal-root"),!e))throw new Error("vr-modal-root missing, please call ensureModalHost() first");return e}mount(e){this.root.parentNode!==e&&(this.root.parentNode&&this.root.parentNode.removeChild(this.root),e.appendChild(this.root))}open(){if(ft&&console.debug("[TeamIntroModal] open called",new Error().stack),this.isOpen)return;const e=this.getModalRoot();this.root.parentNode!==e&&(this.root.parentNode&&this.root.parentNode.removeChild(this.root),e.appendChild(this.root)),this.isOpen=!0,requestAnimationFrame(()=>{this.root.classList.add("open")})}close(){this.isOpen&&(this.isOpen=!1,this.root.classList.remove("open"),this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.onCloseCallback&&this.onCloseCallback())}dispose(){this.escapeHandler&&window.removeEventListener("keydown",this.escapeHandler),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class o0{constructor(e={}){m(this,"element");m(this,"teamIntroModal");this.teamIntroModal=new r0({}),this.element=document.createElement("div"),this.element.className="vr-brandmark",this.element.textContent=e.brandText||"鼎虎清源"}getElement(){return this.element}getAboutModal(){return this.teamIntroModal}remove(){this.element.remove(),this.teamIntroModal.dispose()}}const a0=["辱骂","傻逼","垃圾","滚开","暴力","色情","黄色","毒品","赌博","诈骗","恐怖","自杀","枪","炸弹","仇恨","歧视","hate","suicide","bomb","porn"];function Wc(s){return(s||"").toLowerCase().replace(/\s+/g,"").replace(/[^\p{L}\p{N}]+/gu,"")}function l0(s){const e=Wc(s);return e?a0.some(t=>e.includes(Wc(String(t)))):!1}const Ra="vr_user",gd="vr_comments_v1",Ed="vr_likes_v1",c0=1e4,h0=200,d0=50;function Da(s,e){if(!s)return e;try{return JSON.parse(s)}catch{return e}}function vd(s){return`${s}_${Date.now()}_${Math.random().toString(16).slice(2,8)}`}function _s(){const s=Da(localStorage.getItem(Ra),null);return!s||typeof s!="object"||typeof s.id!="string"||typeof s.name!="string"?null:{id:s.id,name:s.name}}function u0(s){const e={id:vd("u"),name:s};return localStorage.setItem(Ra,JSON.stringify(e)),e}function yd(){localStorage.removeItem(Ra)}function _d(){const s=Da(localStorage.getItem(gd),[]);return Array.isArray(s)?s:[]}function f0(s){localStorage.setItem(gd,JSON.stringify(s))}function p0(s){return _d().filter(e=>e.sceneId===s).sort((e,t)=>t.ts-e.ts).slice(0,d0)}function A0(s,e){const t=_s();if(!t)return{ok:!1,reason:"not_logged_in"};const i=(e||"").trim();if(l0(i))return{ok:!1,reason:"banned"};const n=_d(),r=n.filter(l=>l.sceneId===s&&l.userId===t.id).sort((l,c)=>c.ts-l.ts)[0];if(r&&Date.now()-r.ts<c0)return{ok:!1,reason:"cooldown"};const a=[{id:vd("c"),sceneId:s,userId:t.id,userName:t.name,text:i,ts:Date.now()},...n].slice(0,h0);return f0(a),{ok:!0}}function Id(){return Da(localStorage.getItem(Ed),{likesCountByScene:{},likedByUser:{}})}function m0(s){localStorage.setItem(Ed,JSON.stringify(s))}function g0(s,e){var r;const t=Id(),i=t.likesCountByScene[s]||0,n=e?!!((r=t.likedByUser[e])!=null&&r[s]):!1;return{count:i,liked:n}}function Yc(s,e){return g0(s,e)}function E0(s){const e=_s();if(!e)return{ok:!1,reason:"login_required"};const t=Id();t.likedByUser[e.id]||(t.likedByUser[e.id]={});const n=!!!t.likedByUser[e.id][s];t.likedByUser[e.id][s]=n;const r=t.likesCountByScene[s]||0;return t.likesCountByScene[s]=Math.max(0,r+(n?1:-1)),m0(t),{ok:!0,action:n?"liked":"unliked",count:t.likesCountByScene[s]}}class v0{constructor(e={}){m(this,"element");m(this,"isOpen",!1);m(this,"inputEl");m(this,"options");m(this,"handleKeyDownBound");this.options=e,this.handleKeyDownBound=E=>this.handleKeyDown(E),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const t=document.createElement("div");t.className="vr-modal-mask";const i=document.createElement("div");i.className="vr-modal-card vr-login-card";const n=document.createElement("div");n.className="vr-login-title-row";const r=document.createElement("div");r.className="vr-modal-title",r.textContent="登录";const o=document.createElement("button");o.className="vr-btn vr-login-close",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.close()),n.appendChild(r),n.appendChild(o);const a=document.createElement("div");a.className="vr-modal-desc",a.textContent="输入用户名即可参与互动";const l=document.createElement("div");l.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",E=>{E.key==="Enter"&&this.handleConfirm()});const c=document.createElement("div");c.className="vr-modal-actions vr-login-actions";const h=document.createElement("button");h.className="vr-btn vr-login-btn",h.textContent="取消",h.addEventListener("click",()=>this.close());const d=document.createElement("button");d.className="vr-btn vr-login-btn danger",d.textContent="退出登录",d.addEventListener("click",()=>{var E,A;yd(),(A=(E=this.options).onLogout)==null||A.call(E),this.close()});const u=document.createElement("button");u.className="vr-btn vr-login-btn primary",u.textContent="确认",u.addEventListener("click",()=>this.handleConfirm()),c.appendChild(h),c.appendChild(d),c.appendChild(u),l.appendChild(this.inputEl),i.appendChild(n),i.appendChild(a),i.appendChild(l),i.appendChild(c),t.addEventListener("click",()=>this.close()),i.addEventListener("click",E=>E.stopPropagation()),this.element.appendChild(t),this.element.appendChild(i);const p=()=>{const E=_s();d.style.display=E?"inline-flex":"none"},g=this.open.bind(this);this.open=()=>{p(),g()}}handleKeyDown(e){this.isOpen&&e.key==="Escape"&&this.close()}handleConfirm(){var i,n;const e=(this.inputEl.value||"").trim();if(e.length<2||e.length>12){je("用户名需 2-12 字");return}const t=u0(e);(n=(i=this.options).onLogin)==null||n.call(i,t),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const e=_s();this.inputEl.value=(e==null?void 0:e.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class y0{constructor(e){m(this,"element");m(this,"sceneId");m(this,"sceneName");m(this,"onClose");m(this,"subtitleEl");m(this,"loginHintBtn");m(this,"userLineEl");m(this,"userNameEl");m(this,"likeBtn");m(this,"likeCountEl");m(this,"commentsEl");m(this,"inputEl");m(this,"sendBtn");m(this,"loginModal");m(this,"highlightNextFirstComment",!1);this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-community";const t=document.createElement("div");t.className="vr-community-header";const i=document.createElement("div");i.className="vr-community-title",i.textContent="社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle";const n=document.createElement("button");n.className="vr-community-close",n.innerHTML="×",n.setAttribute("aria-label","关闭"),n.style.pointerEvents="auto",n.style.zIndex="10",n.addEventListener("click",h=>{var d;h.preventDefault(),h.stopPropagation(),h.stopImmediatePropagation(),(d=this.onClose)==null||d.call(this),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"community"}}))}),t.appendChild(i),t.appendChild(this.subtitleEl),t.appendChild(n);const r=document.createElement("div");r.className="vr-community-content";const o=document.createElement("div");o.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可参与互动",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const a=document.createElement("button");a.className="vr-btn vr-community-logout",a.textContent="退出登录",a.addEventListener("click",()=>{yd(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(a),o.appendChild(this.loginHintBtn),o.appendChild(this.userLineEl);const l=document.createElement("div");l.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="点赞",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const h=E0(this.sceneId);if(!h.ok){je("请先登录"),this.loginModal.open();return}this.renderLikes(h.count,h.action==="liked"),je(h.action==="liked"?"已点赞":"已取消点赞")}),l.appendChild(this.likeBtn),l.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const c=document.createElement("div");c.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",h=>{h.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),c.appendChild(this.inputEl),c.appendChild(this.sendBtn),r.appendChild(o),r.appendChild(l),r.appendChild(this.commentsEl),r.appendChild(c),this.element.appendChild(t),this.element.appendChild(r),this.loginModal=new v0({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(e.sceneId,e.sceneName)}setScene(e,t){this.sceneId=e,this.sceneName=t,this.subtitleEl.textContent=this.sceneName?this.sceneName:e,this.refresh()}toastByReason(e){e==="not_logged_in"?je("请先登录"):e==="banned"?je("内容包含敏感词，已拦截"):e==="cooldown"?je("评论过于频繁，请稍后再试"):e==="EMPTY"&&je("内容不能为空")}formatRelativeTime(e){const t=Date.now()-e;if(t<6e4)return"刚刚";const i=Math.floor(t/6e4);if(i<60)return`${i} 分钟前`;const n=Math.floor(i/60);return n<24?`${n} 小时前`:new Date(e).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(e,t){this.likeCountEl.textContent=String(e),this.likeBtn.classList.toggle("liked",t)}renderComments(e){this.commentsEl.innerHTML="";const t=document.createElement("div");if(t.className="vr-community-tip",t.textContent="本场景最近 50 条留言",this.commentsEl.appendChild(t),!e.length){const n=document.createElement("div");n.className="vr-community-empty",n.textContent="此场景暂无留言",this.commentsEl.appendChild(n);return}let i=null;for(const n of e){const r=document.createElement("div");r.className="vr-community-comment";const o=document.createElement("div");o.className="vr-community-comment-meta",o.textContent=`${n.userName} · ${this.formatRelativeTime(n.ts)}`;const a=document.createElement("div");a.className="vr-community-comment-text",a.textContent=n.text,r.appendChild(o),r.appendChild(a),this.commentsEl.appendChild(r),i||(i=r)}i&&this.highlightNextFirstComment&&(i.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{i==null||i.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const t=(this.inputEl.value||"").trim();if(!t){this.toastByReason("EMPTY");return}const i=A0(this.sceneId,t);if(!i.ok){i.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(i.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,je("评论已发布")}refresh(){const e=_s();this.loginHintBtn.style.display=e?"none":"inline-flex",this.userLineEl.style.display=e?"flex":"none",this.userNameEl.textContent=e?e.name:"";const t=Yc(this.sceneId,(e==null?void 0:e.id)||"anon").count,i=e?Yc(this.sceneId,e.id).liked:!1;this.renderLikes(t,i),this.renderComments(p0(this.sceneId));const n=!e;this.inputEl.disabled=n,this.sendBtn.classList.toggle("disabled",n)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}class _0{constructor(e){m(this,"element");m(this,"museum");m(this,"scenes");m(this,"currentSceneId");m(this,"onClose");m(this,"mapContainer");m(this,"mapImage");m(this,"pointsContainer");m(this,"unsubscribeFocus",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-map-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-map-header";const t=document.createElement("div");t.className="vr-map-title",t.textContent="平面图";const i=document.createElement("button");i.className="vr-btn vr-map-close",i.innerHTML="✕",i.setAttribute("aria-label","关闭"),i.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(i),this.mapContainer=document.createElement("div"),this.mapContainer.className="vr-map-container",this.mapImage=document.createElement("img"),this.mapImage.className="vr-map-image",this.mapImage.src=this.museum.map.image,this.mapImage.alt=`${this.museum.name} 平面图`,this.mapImage.style.width="100%",this.mapImage.style.height="auto",this.mapImage.style.display="block",this.pointsContainer=document.createElement("div"),this.pointsContainer.className="vr-map-points",this.mapContainer.appendChild(this.mapImage),this.mapContainer.appendChild(this.pointsContainer);const n=document.createElement("div");n.className="vr-map-body",n.appendChild(this.mapContainer),this.element.appendChild(e),this.element.appendChild(n),this.mapImage.addEventListener("load",()=>{this.renderPoints()}),this.mapImage.complete&&this.renderPoints(),this.unsubscribeFocus=Rr(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="map"){const t=this.pointsContainer.querySelector(`[data-scene-id="${e.sceneId}"]`);t&&(t.classList.add("vr-map-point--focus-flash"),setTimeout(()=>{t.classList.remove("vr-map-point--focus-flash")},300))}}renderPoints(){if(this.pointsContainer.innerHTML="",!this.mapImage.complete||!this.mapContainer.offsetWidth){setTimeout(()=>this.renderPoints(),100);return}const e=this.museum.map.width,t=this.museum.map.height,i=this.mapContainer.offsetWidth,n=i*t/e;this.mapContainer.style.height=`${n}px`;const r=i/e,o=n/t;this.scenes.forEach(a=>{if(!a.mapPoint)return;const l=document.createElement("button");l.className="vr-btn vr-map-point",l.setAttribute("data-scene-id",a.id),l.setAttribute("aria-label",a.name),a.id===this.currentSceneId&&l.classList.add("vr-map-point--current");const h=a.mapPoint.x*r,d=a.mapPoint.y*o;l.style.left=`${h}px`,l.style.top=`${d}px`;const u=document.createElement("div");u.className="vr-map-point-marker",l.appendChild(u);const p=document.createElement("div");p.className="vr-map-point-tooltip",p.textContent=a.name,l.appendChild(p),l.addEventListener("mouseenter",()=>{si({type:"hover",museumId:this.museum.id,sceneId:a.id,source:"map",ts:Date.now()})}),l.addEventListener("mouseleave",()=>{si({type:"hover",museumId:this.museum.id,sceneId:null,source:"map",ts:Date.now()})}),l.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),si({type:"focus",museumId:this.museum.id,sceneId:a.id,source:"map",ts:Date.now()}),ti(this.museum.id,a.id),this.onClose&&this.onClose()}),this.pointsContainer.appendChild(l)})}updateCurrentScene(e){this.currentSceneId=e,this.renderPoints()}updateMuseum(e,t,i){this.museum=e,this.scenes=t,this.currentSceneId=i,this.mapImage.src=e.map.image,this.renderPoints()}getElement(){return this.element}remove(){this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class I0{constructor(e,t,i,n,r,o){m(this,"scene");m(this,"camera");m(this,"renderer");m(this,"container");m(this,"controls");m(this,"sceneNodes",new Map);m(this,"currentSceneId",null);m(this,"animationId",null);m(this,"museumId");m(this,"museum",null);m(this,"scenes");m(this,"onSceneClick");m(this,"unsubscribeFocus",null);m(this,"hoveredSceneId",null);m(this,"focusAnimation",null);m(this,"animate",()=>{this.animationId=requestAnimationFrame(this.animate),this.controls&&this.controls.update(),this.focusAnimation&&(this.focusAnimation.progress+=.05,this.focusAnimation.progress>=1?(this.camera.position.copy(this.focusAnimation.target),this.camera.lookAt(0,0,0),this.controls&&this.controls.update(),this.focusAnimation=null):(this.camera.position.lerpVectors(this.focusAnimation.start,this.focusAnimation.target,this.focusAnimation.progress),this.camera.lookAt(0,0,0)));const e=Date.now()*.001;this.sceneNodes.forEach(t=>{if(t.userData.isCurrent){const i=Math.sin(e*2)*.1+1;t.scale.set(i*1.2,i*1.2,i*1.2);const n=t.material;n.opacity=.6+Math.sin(e*2)*.2}}),this.renderer.render(this.scene,this.camera)});this.container=e,this.museumId=t,this.museum=o||null,this.scenes=i,this.currentSceneId=n,this.onSceneClick=r,this.scene=new Ea,this.scene.background=null,this.camera=new Rt(50,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,5,10),this.camera.lookAt(0,0,0),this.renderer=new Ur({antialias:!0,alpha:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(this.renderer.domElement),this.initControls(),this.generateNodes(),this.setupLighting(),this.animate(),window.addEventListener("resize",()=>this.handleResize()),this.unsubscribeFocus=Rr(a=>{this.handleSceneFocus(a)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="dollhouse"){const t=this.sceneNodes.get(e.sceneId);if(t){const i=t.position.clone(),n=new L(i.x*.3,i.y+3,i.z+8);this.focusAnimation={target:n,start:this.camera.position.clone(),progress:0}}}}async initControls(){try{const{OrbitControls:e}=await Vn(async()=>{const{OrbitControls:t}=await import("./OrbitControls-CHTjsZVd.js");return{OrbitControls:t}},[],import.meta.url);this.controls=new e(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=3,this.controls.maxDistance=30,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.minPolarAngle=Math.PI/6}catch(e){console.warn("Failed to load OrbitControls:",e)}}setupLighting(){const e=new kh(16777215,.6);this.scene.add(e);const t=new Fh(16777215,.4);t.position.set(5,10,5),this.scene.add(t)}generateNodes(){this.sceneNodes.forEach(t=>{this.scene.remove(t),t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(i=>i.dispose()):t.material.dispose()}),this.sceneNodes.clear();const e=this.calculateLayout();this.scenes.forEach((t,i)=>{const n=e[i],r=this.createSceneNode(t,n,t.id===this.currentSceneId);this.sceneNodes.set(t.id,r),this.scene.add(r)})}calculateLayout(){var n,r,o,a;const e=[],t=this.scenes.filter(l=>l.mapPoint);if(t.length>0){const l=((r=(n=this.museum)==null?void 0:n.map)==null?void 0:r.width)||1e3,c=((a=(o=this.museum)==null?void 0:o.map)==null?void 0:a.height)||600;let h=1/0,d=-1/0,u=1/0,p=-1/0;t.forEach(b=>{b.mapPoint&&(h=Math.min(h,b.mapPoint.x),d=Math.max(d,b.mapPoint.x),u=Math.min(u,b.mapPoint.y),p=Math.max(p,b.mapPoint.y))});const g=d-h||l,E=p-u||c,A=g>0?10/g:.01,f=E>0?10/E:.01,y=(h+d)/2,v=(u+p)/2;for(const b of this.scenes)if(b.mapPoint)e.push({x:(b.mapPoint.x-y)*A,y:0,z:(b.mapPoint.y-v)*f});else{const T=Math.ceil(Math.sqrt(this.scenes.length)),S=Math.floor(e.length/T),M=e.length%T;e.push({x:(M-T/2)*2,y:0,z:(S-T/2)*2})}}else{const l=Math.ceil(Math.sqrt(this.scenes.length));for(let c=0;c<this.scenes.length;c++){const h=Math.floor(c/l),d=c%l;e.push({x:(d-l/2)*2,y:0,z:(h-l/2)*2})}}return e}createSceneNode(e,t,i){const n=new Jn(1,1,1),r=i?4886754:8947848,o=new xa({color:r,opacity:i?.8:.5,transparent:!0,metalness:.1,roughness:.7}),a=new ht(n,o);return a.position.set(t.x,t.y,t.z),a.userData={sceneId:e.id,sceneName:e.name},a.userData.onClick=()=>{this.onSceneClick&&this.onSceneClick(this.museumId,e.id)},i&&(a.userData.isCurrent=!0,a.scale.set(1.2,1.2,1.2)),a}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}updateCurrentScene(e){this.currentSceneId=e,this.generateNodes()}updateScenes(e,t){this.scenes=e,this.currentSceneId=t,this.generateNodes()}setOnSceneClick(e){this.onSceneClick=e}handleClick(e){const t=this.renderer.domElement.getBoundingClientRect(),i=(e.clientX-t.left)/t.width*2-1,n=-((e.clientY-t.top)/t.height)*2+1,r=new vs;r.setFromCamera(new xe(i,n),this.camera);const o=r.intersectObjects(Array.from(this.sceneNodes.values()));if(o.length>0){const a=o[0].object,l=a.userData.sceneId;si({type:"focus",museumId:this.museumId,sceneId:l,source:"dollhouse",ts:Date.now()}),a.userData.onClick&&a.userData.onClick()}}handleMouseMove(e){const t=this.renderer.domElement.getBoundingClientRect(),i=(e.clientX-t.left)/t.width*2-1,n=-((e.clientY-t.top)/t.height)*2+1,r=new vs;r.setFromCamera(new xe(i,n),this.camera);const o=r.intersectObjects(Array.from(this.sceneNodes.values()));if(this.sceneNodes.forEach(a=>{const l=a.material;a.userData.isCurrent||(l.opacity=.5)}),o.length>0){const a=o[0].object,l=a.material,c=a.userData.sceneId;a.userData.isCurrent||(l.opacity=.7),this.hoveredSceneId!==c&&(this.hoveredSceneId=c,si({type:"hover",museumId:this.museumId,sceneId:c,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="pointer"}else this.hoveredSceneId!==null&&(this.hoveredSceneId=null,si({type:"hover",museumId:this.museumId,sceneId:null,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="default"}getDomElement(){return this.renderer.domElement}dispose(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.sceneNodes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.sceneNodes.clear(),this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.controls&&this.controls.dispose()}}class x0{constructor(e){m(this,"element");m(this,"museum");m(this,"scenes");m(this,"currentSceneId");m(this,"onClose");m(this,"container");m(this,"dollhouseScene",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-dollhouse-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-dollhouse-header";const t=document.createElement("div");t.className="vr-dollhouse-title",t.textContent="三维图";const i=document.createElement("button");i.className="vr-btn vr-dollhouse-close",i.innerHTML="✕",i.setAttribute("aria-label","关闭"),i.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(i),this.container=document.createElement("div"),this.container.className="vr-dollhouse-container";const n=document.createElement("div");n.className="vr-dollhouse-body",n.appendChild(this.container),this.element.appendChild(e),this.element.appendChild(n),this.initDollhouseScene()}initDollhouseScene(){this.dollhouseScene&&this.dollhouseScene.dispose(),this.dollhouseScene=new I0(this.container,this.museum.id,this.scenes,this.currentSceneId,(t,i)=>{ti(t,i),this.onClose&&this.onClose()},this.museum);const e=this.dollhouseScene.getDomElement();e.addEventListener("click",t=>{var i;(i=this.dollhouseScene)==null||i.handleClick(t)}),e.addEventListener("mousemove",t=>{var i;(i=this.dollhouseScene)==null||i.handleMouseMove(t)})}updateCurrentScene(e){this.currentSceneId=e,this.dollhouseScene&&this.dollhouseScene.updateCurrentScene(e)}updateMuseum(e,t,i){this.museum=e,this.scenes=t,this.currentSceneId=i,this.dollhouseScene?this.dollhouseScene.updateScenes(t,i):this.initDollhouseScene()}getElement(){return this.element}remove(){this.dollhouseScene&&(this.dollhouseScene.dispose(),this.dollhouseScene=null),this.element.remove()}}class C0{constructor(e){m(this,"element");m(this,"currentTab");m(this,"sceneId");m(this,"sceneName");m(this,"museum");m(this,"scenes");m(this,"currentSceneId");m(this,"communityPanel",null);m(this,"mapPanel",null);m(this,"dollhousePanel",null);m(this,"unsubscribeInteracting",null);m(this,"unsubscribeIdle",null);m(this,"unsubscribeUIEngaged",null);m(this,"handleClosePanels");this.currentTab=e.initialTab,this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId||e.sceneId,this.element=document.createElement("div"),this.element.className="vr-panl vr-glass hidden",this.render(),this.setupInteractionListeners(),this.handleClosePanels=()=>{this.closeAllPanels()},window.addEventListener("vr:close-panels",this.handleClosePanels)}setupInteractionListeners(){this.element.addEventListener("click",e=>{rt.emitUIEngaged()},!0)}render(){if(this.element.classList.remove("vr-panel--community","vr-panel--map","vr-panel--dollhouse"),!this.currentTab){this.element.classList.add("hidden"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null);return}if(this.currentTab==="community"){this.element.classList.add("vr-panel--community"),this.element.innerHTML="";const e=this.sceneId||"unknown";this.communityPanel?this.communityPanel.setScene(e,this.sceneName):this.communityPanel=new y0({sceneId:e,sceneName:this.sceneName,onClose:()=>{this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.element.classList.add("hidden"),this.element.innerHTML=""}}),this.element.appendChild(this.communityPanel.getElement());return}if(this.currentTab==="map"){if(this.element.classList.add("vr-panel--map"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.museum&&this.scenes&&this.scenes.length>0){const e=this.currentSceneId||this.sceneId||this.scenes[0].id;this.mapPanel?this.mapPanel.updateCurrentScene(e):this.mapPanel=new _0({museum:this.museum,scenes:this.scenes,currentSceneId:e,onClose:()=>{window.dispatchEvent(new CustomEvent("vr:close-panels"))}}),this.element.appendChild(this.mapPanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">平面图</div>
          <div class="vr-panel-body">此展馆暂无平面图</div>
        `;return}if(this.currentTab==="dollhouse"){if(this.element.classList.add("vr-panel--dollhouse"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.museum&&this.scenes&&this.scenes.length>0){const e=this.currentSceneId||this.sceneId||this.scenes[0].id;this.dollhousePanel?this.dollhousePanel.updateCurrentScene(e):this.dollhousePanel=new x0({museum:this.museum,scenes:this.scenes,currentSceneId:e,onClose:()=>{window.dispatchEvent(new CustomEvent("vr:close-panels"))}}),this.element.appendChild(this.dollhousePanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">三维图</div>
          <div class="vr-panel-body">此展馆暂无三维图</div>
        `;return}this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.classList.add("hidden"),this.element.innerHTML=""}setSceneContext(e,t){this.sceneId=e,this.sceneName=t,this.currentSceneId=e,this.currentTab==="community"&&this.communityPanel&&this.communityPanel.setScene(e,t),this.currentTab==="map"&&this.mapPanel&&this.mapPanel.updateCurrentScene(e),this.currentTab==="dollhouse"&&this.dollhousePanel&&this.dollhousePanel.updateCurrentScene(e)}setMuseumContext(e,t,i){this.museum=e,this.scenes=t,this.currentSceneId=i,this.currentTab==="map"&&this.mapPanel?this.mapPanel.updateMuseum(e,t,i):this.currentTab==="map"&&this.render(),this.currentTab==="dollhouse"&&this.dollhousePanel?this.dollhousePanel.updateMuseum(e,t,i):this.currentTab==="dollhouse"&&this.render()}setVisible(e){this.element.classList.remove("hidden","visible"),this.element.classList.add(e?"visible":"hidden")}setTab(e){this.currentTab=e,this.setVisible(!1),window.setTimeout(()=>{this.render(),this.setVisible(!0)},40)}closeAllPanels(){this.currentTab=null,this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.classList.add("hidden"),this.element.innerHTML=""}getElement(){return this.element}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.handleClosePanels&&(window.removeEventListener("vr:close-panels",this.handleClosePanels),this.handleClosePanels=void 0),this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.remove()}}function b0(){var s;return!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||document.querySelector(".fcchat-root")&&((s=document.querySelector(".fcchat-root"))==null?void 0:s.style.display)==="flex")}function qc(){b0()?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}function Br(s){const{title:e,contentEl:t,contentHtml:i,onClose:n,panelClassName:r}=s,o=document.createElement("div");o.className="vr-modal-overlay";const a=document.createElement("div");a.className="vr-modal-panel",r&&a.classList.add(r);const l=document.createElement("div");l.className="vr-modal-header";const c=document.createElement("div");c.className="vr-modal-header-title",c.textContent=e;const h=document.createElement("button");h.className="vr-modal-header-close vr-icon-btn",h.type="button",h.setAttribute("aria-label","关闭弹窗"),h.innerHTML="×",l.appendChild(c),l.appendChild(h);const d=document.createElement("div");d.className="vr-modal-body",t?d.appendChild(t):i&&(d.innerHTML=i),a.appendChild(l),a.appendChild(d),o.appendChild(a),document.body.appendChild(o),qc(),r==="vr-modal-settings"&&(document.documentElement.classList.add("vr-more-open"),requestAnimationFrame(()=>{a.classList.add("is-in")}));let u=!1;const p=f=>{f.key==="Escape"&&(f.stopPropagation(),A.close())},g=f=>{f.target===o&&A.close()},E=f=>{f.preventDefault(),f.stopPropagation(),A.close()};window.addEventListener("keydown",p),o.addEventListener("click",g),h.addEventListener("click",E);const A={close:()=>{if(!u&&(u=!0,window.removeEventListener("keydown",p),o.removeEventListener("click",g),h.removeEventListener("click",E),o.parentNode&&o.parentNode.removeChild(o),r==="vr-modal-settings"&&document.documentElement.classList.remove("vr-more-open"),qc(),n))try{n()}catch{}}};return A}function ca(s){return{guide:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',community:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',more:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/></svg>',search:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',"arrow-right":'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}[s]||""}const w0=[{key:"guide",label:"导览"},{key:"community",label:"社区"},{key:"info",label:"信息"},{key:"settings",label:"更多"}];class S0{constructor(e={}){m(this,"element");m(this,"dockEl");m(this,"panels");m(this,"activeTabs");m(this,"onOpenInfo");m(this,"onOpenSettings");m(this,"unsubscribeInteracting",null);m(this,"unsubscribeIdle",null);m(this,"unsubscribeUIEngaged",null);m(this,"handleDockTabOpen");m(this,"handleDockTabClose");m(this,"handleClosePanels");this.activeTabs=new Set,this.onOpenInfo=e.onOpenInfo,this.onOpenSettings=e.onOpenSettings,this.element=document.createElement("div"),this.element.className="vr-dock-wrap",this.panels=new C0({initialTab:e.initialTab||"guide",sceneId:e.sceneId,sceneName:e.sceneName,museum:e.museum,scenes:e.scenes,currentSceneId:e.currentSceneId||e.sceneId}),this.panels.setVisible(!0),this.dockEl=document.createElement("div"),this.dockEl.className="vr-dock vr-glass";for(const t of w0){const i=document.createElement("button");i.className="vr-btn vr-dock-tab",i.setAttribute("data-tab",t.key);const n=t.key==="guide"?"guide":t.key==="community"?"community":t.key==="info"?"info":"more";i.innerHTML=`<span class="vr-dock-tab-icon">${ca(n)}</span><div class="vr-dock-tab-label">${t.label}</div>`,i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),rt.emitUIEngaged(),t.key==="guide"?(this.setTabActive("guide",!0),e.onGuideClick&&e.onGuideClick()):t.key==="community"?(this.setTabActive("community",!0),this.panels.setTab("community")):t.key==="info"?(this.setTabActive("info",!0),this.onOpenInfo?this.onOpenInfo():this.openFallbackInfoModal()):t.key==="settings"&&(this.setTabActive("settings",!0),this.onOpenSettings?this.onOpenSettings():this.openFallbackSettingsModal())}),this.dockEl.appendChild(i)}this.element.appendChild(this.panels.getElement()),this.element.appendChild(this.dockEl),this.syncActiveClass(),this.setupInteractionListeners(),this.setupDockEventListeners()}setupInteractionListeners(){}syncActiveClass(){this.dockEl.querySelectorAll(".vr-dock-tab").forEach(t=>{const i=t.getAttribute("data-tab");i&&this.activeTabs.has(i)?t.classList.add("active"):t.classList.remove("active")})}setTabActive(e,t){t?this.activeTabs.add(e):this.activeTabs.delete(e),this.syncActiveClass(),t&&(e==="community"||e==="map"||e==="dollhouse")&&this.panels.setTab(e)}isTabActive(e){return this.activeTabs.has(e)}setupDockEventListeners(){this.handleDockTabOpen=e=>{var i;const t=e;(i=t.detail)!=null&&i.tab&&this.setTabActive(t.detail.tab,!0)},this.handleDockTabClose=e=>{var i;const t=e;(i=t.detail)!=null&&i.tab&&this.setTabActive(t.detail.tab,!1)},this.handleClosePanels=()=>{this.setTabActive("community",!1),this.setTabActive("map",!1),this.setTabActive("dollhouse",!1)},window.addEventListener("vr:dock-tab-open",this.handleDockTabOpen),window.addEventListener("vr:dock-tab-close",this.handleDockTabClose),window.addEventListener("vr:close-panels",this.handleClosePanels)}setSceneContext(e,t){this.panels.setSceneContext(e,t)}setMuseumContext(e,t,i){this.panels.setMuseumContext(e,t,i)}getElement(){return this.element}setMoreOpen(e){e?this.element.classList.add("dock--more-open"):this.element.classList.remove("dock--more-open")}openFallbackInfoModal(){Br({title:"信息",contentHtml:`
        <div class="vr-modal-info-list">
          <div><span class="vr-modal-info-row-label">馆：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">场景：</span><span>-</span></div>
          <div><span class="vr-modal-info-row-label">采集于</span><span> 2025-12-27</span></div>
        </div>
      `})}openFallbackSettingsModal(){Br({title:"设置",contentHtml:`
        <div class="vr-modal-settings-list">
          <div>此版本暂未接入设置功能。</div>
        </div>
      `})}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.handleDockTabOpen&&(window.removeEventListener("vr:dock-tab-open",this.handleDockTabOpen),this.handleDockTabOpen=void 0),this.handleDockTabClose&&(window.removeEventListener("vr:dock-tab-close",this.handleDockTabClose),this.handleDockTabClose=void 0),this.handleClosePanels&&(window.removeEventListener("vr:close-panels",this.handleClosePanels),this.handleClosePanels=void 0),this.panels.remove(),this.element.remove()}}const Xc="data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
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
    </svg>`);class M0{constructor(e){m(this,"element");m(this,"isOpen",!1);m(this,"museumId");m(this,"currentSceneId");m(this,"scenes");m(this,"filteredScenes");m(this,"listEl",null);m(this,"previewImgEl",null);m(this,"previewTitleEl",null);m(this,"previewIdEl",null);m(this,"searchInputEl",null);m(this,"hoveredSceneId",null);m(this,"selectedSceneId",null);m(this,"onClose");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.filteredScenes=e.scenes,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-guide-drawer";const t=document.createElement("div");t.className="vr-guide-mask";const i=document.createElement("div");i.className="vr-guide-panel";const n=document.createElement("div");n.className="vr-guide-header";const r=document.createElement("div");r.className="vr-guide-header-left";const o=document.createElement("div");o.className="vr-guide-title",o.textContent="导览";const a=document.createElement("button");a.className="vr-btn vr-guide-close",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation(),this.close()}),n.appendChild(r),n.appendChild(o),n.appendChild(a);const l=document.createElement("div");l.className="vr-guide-search";const c=document.createElement("span");c.className="vr-guide-search-icon",c.innerHTML=ca("search");const h=document.createElement("input");h.className="vr-guide-search-input",h.type="search",h.placeholder="查找场景",l.appendChild(c),l.appendChild(h),this.searchInputEl=h;const d=document.createElement("div");d.className="vr-guide-body";const u=document.createElement("div");u.className="vr-guide-list",this.listEl=u;const p=document.createElement("div");p.className="vr-guide-preview";const g=document.createElement("img");g.className="vr-guide-preview-image",g.referrerPolicy="no-referrer",g.crossOrigin="anonymous",g.decoding="async",g.loading="lazy",this.previewImgEl=g;const E=document.createElement("div");E.className="vr-guide-preview-title",this.previewTitleEl=E;const A=document.createElement("div");A.className="vr-guide-preview-id",this.previewIdEl=A;const f=document.createElement("button");f.className="vr-btn vr-guide-preview-enter",f.innerHTML=`<span class="vr-guide-enter-icon">${ca("arrow-right")}</span><span>前往</span>`,f.addEventListener("click",y=>{y.preventDefault(),y.stopPropagation();const v=this.selectedSceneId||this.currentSceneId;v&&v!==this.currentSceneId?(ti(this.museumId,v),this.close()):v===this.currentSceneId&&this.close()}),p.appendChild(g),p.appendChild(E),p.appendChild(A),p.appendChild(f),d.appendChild(u),d.appendChild(p),t.addEventListener("click",()=>this.close()),i.addEventListener("click",y=>y.stopPropagation()),i.appendChild(n),i.appendChild(l),i.appendChild(d),this.element.appendChild(t),this.element.appendChild(i),this.bindSearch(),this.renderList(),this.updatePreview()}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"),this.updateOverlayState(),this.selectedSceneId||(this.selectedSceneId=this.currentSceneId),this.updateActiveState(),this.updatePreview())}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"),this.updateOverlayState(),(e=this.onClose)==null||e.call(this))}updateOverlayState(){var t;!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")&&this.isOpen||document.querySelector(".fcchat-root")&&((t=document.querySelector(".fcchat-root"))==null?void 0:t.style.display)==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}setCurrentScene(e){this.currentSceneId=e,this.updateActiveState(),this.updatePreview()}bindSearch(){this.searchInputEl&&this.searchInputEl.addEventListener("input",()=>{var t;const e=(((t=this.searchInputEl)==null?void 0:t.value)||"").trim().toLowerCase();e?this.filteredScenes=this.scenes.filter(i=>(i.name||"").toLowerCase().includes(e)||i.id.toLowerCase().includes(e)):this.filteredScenes=this.scenes,this.renderList(),this.updatePreview()})}renderList(){if(this.listEl){this.listEl.innerHTML="";for(const e of this.filteredScenes){const t=document.createElement("div");t.className="vr-guide-item",t.setAttribute("data-scene-id",e.id),e.id===this.currentSceneId&&t.classList.add("active");const i=document.createElement("img");i.className="vr-guide-thumb",i.referrerPolicy="no-referrer",i.crossOrigin="anonymous",i.decoding="async",i.loading="lazy";const n=e.thumb?Xn(e.thumb):Xc;i.src=n,i.alt=e.name||e.id;const r=document.createElement("div");r.className="vr-guide-meta";const o=document.createElement("div");o.className="vr-guide-name",o.textContent=e.name||e.id;const a=document.createElement("div");a.className="vr-guide-id",a.textContent=e.id,r.appendChild(o),r.appendChild(a),t.appendChild(i),t.appendChild(r),t.addEventListener("mouseenter",()=>{this.hoveredSceneId=e.id,this.updatePreview()}),t.addEventListener("mouseleave",()=>{this.hoveredSceneId=null,this.updatePreview()}),t.addEventListener("click",l=>{var c;l.preventDefault(),l.stopPropagation(),this.selectedSceneId=e.id,(c=this.listEl)==null||c.querySelectorAll(".vr-guide-item").forEach(h=>{h.classList.remove("selected")}),t.classList.add("selected"),this.updatePreview()}),this.listEl.appendChild(t)}}}updateActiveState(){this.listEl&&this.listEl.querySelectorAll(".vr-guide-item").forEach(e=>{const i=e.getAttribute("data-scene-id")===this.currentSceneId;e.classList.toggle("active",i),i&&!this.selectedSceneId&&(this.selectedSceneId=this.currentSceneId,e.classList.add("selected"))})}updatePreview(){if(!this.previewImgEl||!this.previewTitleEl||!this.previewIdEl)return;const e=this.selectedSceneId||this.hoveredSceneId||this.currentSceneId,t=this.scenes.find(n=>n.id===e)||this.scenes[0];if(!t)return;const i=t.thumb?Xn(t.thumb):Xc;this.previewImgEl.src=i,this.previewImgEl.alt=t.name||t.id,this.previewTitleEl.textContent=t.name||t.id,this.previewIdEl.textContent=t.id}}class T0{constructor(e){m(this,"element");m(this,"scrollEl");m(this,"museumId");m(this,"currentSceneId");m(this,"scenes");m(this,"onSceneClick");m(this,"onMoreClick");m(this,"onClose");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.onSceneClick=e.onSceneClick,this.onMoreClick=e.onMoreClick,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-guidetray";const t=document.createElement("div");t.className="vr-guidetray-header";const i=document.createElement("button");i.className="vr-btn vr-guidetray-more",i.textContent="更多",i.addEventListener("click",r=>{var o;r.preventDefault(),r.stopPropagation(),(o=this.onMoreClick)==null||o.call(this)});const n=document.createElement("button");n.className="vr-btn vr-guidetray-close",n.textContent="×",n.setAttribute("aria-label","关闭"),n.addEventListener("click",r=>{var o;r.preventDefault(),r.stopPropagation(),(o=this.onClose)==null||o.call(this)}),t.appendChild(i),t.appendChild(n),this.scrollEl=document.createElement("div"),this.scrollEl.className="vr-guidetray-scroll",this.element.appendChild(t),this.element.appendChild(this.scrollEl),this.render()}render(){this.scrollEl.innerHTML="",this.scenes.forEach(t=>{const i=document.createElement("div");i.className="vr-guidetray-item",i.setAttribute("data-scene-id",t.id),t.id===this.currentSceneId&&i.classList.add("is-current");const n=document.createElement("img");n.className="vr-guidetray-item-thumb",n.referrerPolicy="no-referrer",n.crossOrigin="anonymous",n.decoding="async",n.loading="lazy";const r=t.thumb?ni(t.thumb,ii.THUMB):void 0;r&&(n.src=Xn(r)),n.alt=t.name;const o=document.createElement("div");o.className="vr-guidetray-item-title",o.textContent=t.name,i.appendChild(n),i.appendChild(o),i.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),this.onSceneClick&&this.onSceneClick(t.id)}),this.scrollEl.appendChild(i)});const e=document.createElement("div");e.className="vr-guidetray-item vr-guidetray-item-more",e.innerHTML=`
      <div class="vr-guidetray-item-thumb vr-guidetray-more-icon">+</div>
      <div class="vr-guidetray-item-title">更多</div>
    `,e.addEventListener("click",t=>{var i;t.preventDefault(),t.stopPropagation(),(i=this.onMoreClick)==null||i.call(this)}),this.scrollEl.appendChild(e)}updateCurrentScene(e){this.currentSceneId=e,this.scrollEl.querySelectorAll(".vr-guidetray-item").forEach(t=>{const i=t;i.getAttribute("data-scene-id")===e?i.classList.add("is-current"):i.classList.remove("is-current")})}setVisible(e){this.element.classList.toggle("visible",e)}getElement(){return this.element}remove(){this.element.remove()}}class B0{constructor(e={}){m(this,"element");m(this,"currentMode");m(this,"onModeChange");this.currentMode=e.initialMode||"tour",this.onModeChange=e.onModeChange,this.element=document.createElement("div"),this.element.className="vr-topmodes",[{key:"tour",label:"漫游"},{key:"structure2d",label:"结构图"},{key:"structure3d",label:"三维模型"}].forEach(i=>{const n=document.createElement("button");n.className="vr-topmodes__btn",n.textContent=i.label,n.setAttribute("data-mode",i.key),i.key===this.currentMode&&n.classList.add("is-active"),n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.setMode(i.key)}),this.element.appendChild(n)}),this.syncActiveState()}syncActiveState(){this.element.querySelectorAll(".vr-topmodes__btn").forEach(e=>{const t=e.getAttribute("data-mode");e.classList.toggle("is-active",t===this.currentMode)})}setMode(e){this.currentMode!==e&&(this.currentMode=e,this.syncActiveState(),this.onModeChange&&this.onModeChange(e))}getMode(){return this.currentMode}getElement(){return this.element}}const L0={iterations:300,width:1e3,height:1e3,padding:40,repulsion:.15,spring:.12,damping:.88};function xd(s,e,t){const i={...L0,...t},n=s.length;if(n===0)return{};const r={},o=Math.max(1,Math.sqrt(n)*.5);s.forEach((c,h)=>{const d=2*Math.PI*h/n,u=(Math.random()-.5)*.2;r[c.id]={x:o*Math.cos(d)+u,y:o*Math.sin(d)+u,vx:0,vy:0}});const a=e.length>0?e:s.length>1?s.slice(0,-1).map((c,h)=>({from:c.id,to:s[h+1].id})):[];for(let c=0;c<i.iterations;c++){for(let h=0;h<n;h++){const d=s[h],u=r[d.id];for(let p=h+1;p<n;p++){const g=s[p],E=r[g.id];let A=u.x-E.x,f=u.y-E.y;const y=A*A+f*f||1e-4,v=i.repulsion/y;A*=v,f*=v,u.vx+=A,u.vy+=f,E.vx-=A,E.vy-=f}}for(const h of a){const d=r[h.from],u=r[h.to];if(!d||!u)continue;const p=u.x-d.x,g=u.y-d.y,E=Math.sqrt(p*p+g*g)||1e-4,f=i.spring*(E-1),y=p/E*f,v=g/E*f;d.vx+=y,d.vy+=v,u.vx-=y,u.vy-=v}for(const h in r){const d=r[h];d.vx*=i.damping,d.vy*=i.damping,d.x+=d.vx*.1,d.y+=d.vy*.1}}const l={};for(const c in r)l[c]={x:r[c].x,y:r[c].y};return R0(l,i.width,i.height,i.padding)}function R0(s,e,t,i){const n=Object.entries(s);if(n.length===0)return{};let r=1/0,o=-1/0,a=1/0,l=-1/0;for(const[,f]of n)r=Math.min(r,f.x),o=Math.max(o,f.x),a=Math.min(a,f.y),l=Math.max(l,f.y);const c=o-r||1,h=l-a||1,d=e-2*i,u=t-2*i,p=d/c,g=u/h,E=Math.min(p,g),A={};for(const[f,y]of n)A[f]={x:i+(y.x-r)*E+(d-c*E)/2,y:i+(y.y-a)*E+(u-h*E)/2};return A}function Cd(s){const e=s.filter(d=>d.mapPoint);if(e.length<s.length)return!0;if(e.length<2)return!1;const t=e.map(d=>d.mapPoint.x),i=e.map(d=>d.mapPoint.y),n=Math.min(...t),r=Math.max(...t),o=Math.min(...i),a=Math.max(...i),l=r-n,c=a-o,h=100;return l<h||c<h}class D0{constructor(e){m(this,"element");m(this,"canvasContainer");m(this,"svg");m(this,"floorplanImg",null);m(this,"statusEl",null);m(this,"toggleBtn",null);m(this,"museum");m(this,"graph");m(this,"currentSceneId");m(this,"onClose");m(this,"onNodeClick");m(this,"layout",{});m(this,"mode","graph");m(this,"hasFloorplan",!1);var t;this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.onNodeClick=e.onNodeClick,this.hasFloorplan=!!((t=this.museum.map)!=null&&t.image),this.mode=this.hasFloorplan?"floorplan":"graph",this.element=document.createElement("div"),this.element.className="vr-structure2d-overlay",this.render(),this.bindEvents()}render(){var r;const e=document.createElement("div");e.className="vr-structure2d-header";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";const i=document.createElement("div");i.className="vr-structure2d-title",i.textContent="结构图",this.statusEl=document.createElement("div"),this.statusEl.className="vr-structure2d-status",this.updateStatusText(),t.appendChild(i),t.appendChild(this.statusEl),this.hasFloorplan&&(this.toggleBtn=document.createElement("button"),this.toggleBtn.className="vr-btn vr-structure2d-toggle",this.toggleBtn.textContent=this.mode==="floorplan"?"结构图":"平面图",this.toggleBtn.addEventListener("click",()=>{this.mode=this.mode==="floorplan"?"graph":"floorplan",this.toggleBtn.textContent=this.mode==="floorplan"?"结构图":"平面图",this.updateStatusText(),this.renderContent()}),e.appendChild(this.toggleBtn));const n=document.createElement("button");if(n.className="vr-btn vr-structure2d-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.close()}),e.appendChild(t),e.appendChild(n),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="vr-structure2d-canvas",this.svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.svg.setAttribute("width","100%"),this.svg.setAttribute("height","100%"),this.svg.setAttribute("class","vr-structure2d-svg"),this.canvasContainer.appendChild(this.svg),this.hasFloorplan&&((r=this.museum.map)!=null&&r.image)){const o=ni(this.museum.map.image,ii.MAP);o&&(this.floorplanImg=document.createElement("img"),this.floorplanImg.className="vr-structure2d-floorplan",this.floorplanImg.src=o,this.floorplanImg.style.display="none",this.canvasContainer.appendChild(this.floorplanImg),this.floorplanImg.onload=()=>{this.mode==="floorplan"&&this.renderContent()})}this.element.appendChild(e),this.element.appendChild(this.canvasContainer),this.computeLayout(),this.renderContent()}updateStatusText(){if(!this.statusEl)return;const e=this.graph.nodes.length;this.statusEl.textContent=`mode: ${this.mode}, nodes: ${e}`}renderContent(){this.mode==="floorplan"?this.renderFloorplan():this.renderGraph()}computeLayout(){var n,r;const e=((n=this.museum.map)==null?void 0:n.width)||1e3,t=((r=this.museum.map)==null?void 0:r.height)||600;if(Cd(this.graph.nodes))this.layout=xd(this.graph.nodes,this.graph.edges,{width:e,height:t,iterations:300,padding:40});else{this.layout={};for(const o of this.graph.nodes)o.mapPoint&&(this.layout[o.id]={x:o.mapPoint.x,y:o.mapPoint.y})}}renderFloorplan(){var n,r;this.svg&&(this.svg.style.display="none"),this.floorplanImg&&(this.floorplanImg.style.display="block"),this.svg.innerHTML="",this.svg.style.display="block",this.svg.style.position="absolute",this.svg.style.top="0",this.svg.style.left="0",this.svg.style.pointerEvents="none";const e=((n=this.museum.map)==null?void 0:n.width)||1e3,t=((r=this.museum.map)==null?void 0:r.height)||600;this.svg.setAttribute("viewBox",`0 0 ${e} ${t}`),this.svg.style.pointerEvents="auto";const i=document.createElementNS("http://www.w3.org/2000/svg","g");i.setAttribute("class","vr-structure2d-nodes");for(const o of this.graph.nodes){const a=this.layout[o.id];if(!a)continue;const l=o.id===this.currentSceneId,c=document.createElementNS("http://www.w3.org/2000/svg","g");c.setAttribute("class",`vr-structure2d-node ${l?"is-current":""}`),c.setAttribute("data-scene-id",o.id),c.style.cursor="pointer";const h=document.createElementNS("http://www.w3.org/2000/svg","circle");h.setAttribute("cx",a.x.toString()),h.setAttribute("cy",a.y.toString()),h.setAttribute("r",l?"12":"8"),h.setAttribute("class","vr-structure2d-node-circle");const d=document.createElementNS("http://www.w3.org/2000/svg","text");d.setAttribute("x",a.x.toString()),d.setAttribute("y",(a.y+(l?25:20)).toString()),d.setAttribute("class","vr-structure2d-node-label"),d.setAttribute("text-anchor","middle"),d.textContent=o.name,c.appendChild(h),c.appendChild(d),i.appendChild(c),c.addEventListener("click",()=>{this.onNodeClick&&this.onNodeClick(this.museum.id,o.id)})}this.svg.appendChild(i)}renderGraph(){var r,o;this.floorplanImg&&(this.floorplanImg.style.display="none"),this.svg&&(this.svg.style.display="block",this.svg.style.position="",this.svg.style.pointerEvents="auto"),this.svg.innerHTML="";const e=((r=this.museum.map)==null?void 0:r.width)||1e3,t=((o=this.museum.map)==null?void 0:o.height)||600;this.svg.setAttribute("viewBox",`0 0 ${e} ${t}`);const i=document.createElementNS("http://www.w3.org/2000/svg","g");i.setAttribute("class","vr-structure2d-edges");for(const a of this.graph.edges){const l=this.layout[a.from],c=this.layout[a.to];if(!l||!c)continue;const h=document.createElementNS("http://www.w3.org/2000/svg","line");h.setAttribute("x1",l.x.toString()),h.setAttribute("y1",l.y.toString()),h.setAttribute("x2",c.x.toString()),h.setAttribute("y2",c.y.toString()),h.setAttribute("class","vr-structure2d-edge"),i.appendChild(h)}this.svg.appendChild(i);const n=document.createElementNS("http://www.w3.org/2000/svg","g");n.setAttribute("class","vr-structure2d-nodes");for(const a of this.graph.nodes){const l=this.layout[a.id];if(!l)continue;const c=a.id===this.currentSceneId,h=document.createElementNS("http://www.w3.org/2000/svg","g");h.setAttribute("class",`vr-structure2d-node ${c?"is-current":""}`),h.setAttribute("data-scene-id",a.id),h.style.cursor="pointer";const d=document.createElementNS("http://www.w3.org/2000/svg","circle");d.setAttribute("cx",l.x.toString()),d.setAttribute("cy",l.y.toString()),d.setAttribute("r",c?"12":"8"),d.setAttribute("class","vr-structure2d-node-circle");const u=document.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("x",l.x.toString()),u.setAttribute("y",(l.y+(c?25:20)).toString()),u.setAttribute("class","vr-structure2d-node-label"),u.setAttribute("text-anchor","middle"),u.textContent=a.name,h.appendChild(d),h.appendChild(u),n.appendChild(h),h.addEventListener("click",()=>{this.onNodeClick&&this.onNodeClick(this.museum.id,a.id)})}this.svg.appendChild(n)}bindEvents(){const e=t=>{t.key==="Escape"&&this.close()};document.addEventListener("keydown",e),this.element.addEventListener("vr:cleanup",()=>{document.removeEventListener("keydown",e)})}updateContext(e){var t;this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.hasFloorplan=!!((t=this.museum.map)!=null&&t.image),this.computeLayout(),this.updateStatusText(),this.renderContent()}open(){this.element.classList.add("is-visible")}close(){this.element.classList.remove("is-visible"),this.onClose&&this.onClose()}getElement(){return this.element}remove(){this.element.remove()}}function $c(s,e){var r;const t=s.scenes.map(o=>({id:o.id,name:o.name,scene:o,mapPoint:o.mapPoint,initialView:o.initialView})),i=new Set(t.map(o=>o.id)),n=[];for(const o of s.scenes)for(const a of o.hotspots){if(a.type!=="scene"||!((r=a.target)!=null&&r.sceneId))continue;const l=a.target.museumId??s.id,c=a.target.sceneId;l!==s.id||!i.has(c)||n.some(d=>d.from===o.id&&d.to===c)||n.push({from:o.id,to:c})}return{nodes:t,edges:n,currentNodeId:e&&i.has(e)?e:void 0}}function N0(s,e){let t=0;for(const i of s.edges)(i.from===e||i.to===e)&&t++;return t}class P0{constructor(e){m(this,"element");m(this,"container");m(this,"scene",null);m(this,"camera",null);m(this,"renderer",null);m(this,"controls");m(this,"museum");m(this,"graph");m(this,"currentSceneId");m(this,"onClose");m(this,"onNodeClick");m(this,"animationId",null);m(this,"sceneNodes",new Map);m(this,"edgeLines",[]);m(this,"hoveredSceneId",null);m(this,"resizeObserver",null);m(this,"statusEl",null);m(this,"webglErrorEl",null);m(this,"modelErrorEl",null);m(this,"modelGroup",null);m(this,"modelLoaded",!1);m(this,"animate",()=>{if(!this.renderer||!this.scene||!this.camera)return;this.animationId=requestAnimationFrame(this.animate),this.controls&&this.controls.update();const e=Date.now()*.001;this.sceneNodes.forEach(t=>{if(t.userData.isCurrent){const i=Math.sin(e*2)*.1+1;t.scale.set(i*1.2,i*1.2,i*1.2);const n=t.material;n.opacity=.7+Math.sin(e*2)*.2}}),this.renderer.render(this.scene,this.camera)});this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.onNodeClick=e.onNodeClick,this.element=document.createElement("div"),this.element.className="vr-structure3d-overlay",this.container=document.createElement("div"),this.container.className="vr-structure3d-canvas",this.render(),this.init3D().then(()=>{this.bindEvents()})}render(){const e=document.createElement("div");e.className="vr-structure3d-header";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="4px";const i=document.createElement("div");i.className="vr-structure3d-title",i.textContent="三维模型",this.statusEl=document.createElement("div"),this.statusEl.className="vr-structure3d-status",this.updateStatusText(),t.appendChild(i),t.appendChild(this.statusEl);const n=document.createElement("button");n.className="vr-btn vr-structure3d-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.close()}),e.appendChild(t),e.appendChild(n),this.webglErrorEl=document.createElement("div"),this.webglErrorEl.className="vr-structure3d-webgl-error",this.webglErrorEl.style.display="none",this.webglErrorEl.innerHTML=`
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">WebGL 不可用</div>
        <div style="font-size: 13px; opacity: 0.8;">请尝试更换浏览器或设备</div>
      </div>
    `,this.modelErrorEl=document.createElement("div"),this.modelErrorEl.className="vr-structure3d-model-error",this.modelErrorEl.style.display="none",this.modelErrorEl.innerHTML=`
      <div style="text-align: center; padding: 40px 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px; color: rgba(255,200,100,0.95);">模型加载失败</div>
        <div style="font-size: 13px; opacity: 0.8;">请检查 URL 或网络连接</div>
      </div>
    `,this.element.appendChild(e),this.element.appendChild(this.container),this.element.appendChild(this.webglErrorEl),this.element.appendChild(this.modelErrorEl)}updateStatusText(){var o,a,l;if(!this.statusEl)return;const e=this.graph.nodes.length,t=this.graph.edges.length,i=((o=this.container)==null?void 0:o.clientWidth)||0,n=((a=this.container)==null?void 0:a.clientHeight)||0,r=this.modelLoaded?"loaded":(l=this.museum.dollhouse)!=null&&l.modelUrl?"loading":"none";e===0?(this.statusEl.textContent=`model: ${r}, No nodes (check museum.scenes)`,this.statusEl.style.color="rgba(255,200,100,0.9)"):(this.statusEl.textContent=`model: ${r}, nodes: ${e}, edges: ${t}, size: ${i}x${n}`,this.statusEl.style.color="rgba(255,255,255,0.65)")}async init3D(){var e;try{this.scene=new Ea,this.scene.background=null;const t=this.container.clientWidth>0?this.container.clientWidth/this.container.clientHeight:window.innerWidth/window.innerHeight;this.camera=new Rt(60,t,.1,1e3),this.camera.position.set(0,12,18),this.camera.lookAt(0,0,0);try{this.renderer=new Ur({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement)}catch{this.webglErrorEl&&(this.webglErrorEl.style.display="block");return}try{const{OrbitControls:r}=await Vn(async()=>{const{OrbitControls:o}=await import("./OrbitControls-CHTjsZVd.js");return{OrbitControls:o}},[],import.meta.url);this.controls=new r(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=3,this.controls.maxDistance=50,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.minPolarAngle=Math.PI/6,this.controls.target.set(0,0,0)}catch{}const i=new kh(16777215,.6);this.scene.add(i);const n=new Fh(16777215,.4);n.position.set(5,10,5),this.scene.add(n),this.modelGroup=new nn,this.scene.add(this.modelGroup),(e=this.museum.dollhouse)!=null&&e.modelUrl?this.loadModel():this.generateGraph(),this.setupResizeObserver(),this.updateStatusText()}catch{this.webglErrorEl&&(this.webglErrorEl.style.display="block")}}async loadModel(){var t;if(!((t=this.museum.dollhouse)!=null&&t.modelUrl)||!this.scene||!this.modelGroup)return;const e=ni(this.museum.dollhouse.modelUrl,ii.DOLLHOUSE);if(e)try{const{GLTFLoader:i}=await Vn(async()=>{const{GLTFLoader:c}=await import("./GLTFLoader-cLbWlffI.js");return{GLTFLoader:c}},[],import.meta.url),r=await new i().loadAsync(e);for(;this.modelGroup.children.length>0;){const c=this.modelGroup.children[0];this.modelGroup.remove(c),(c instanceof ht||c instanceof nn)&&c.traverse(h=>{var d,u;h instanceof ht&&((d=h.geometry)==null||d.dispose(),Array.isArray(h.material)?h.material.forEach(p=>p.dispose()):(u=h.material)==null||u.dispose())})}const o=r.scene,a=this.museum.dollhouse.scale??1,l=this.museum.dollhouse.offset??{x:0,y:0,z:0};o.scale.set(a,a,a),o.position.set(l.x,l.y,l.z),this.modelGroup.add(o),this.modelLoaded=!0,this.generateGraph(),this.fitModelToView(),this.updateStatusText(),this.modelErrorEl&&(this.modelErrorEl.style.display="none")}catch{this.modelLoaded=!1,this.updateStatusText(),this.modelErrorEl&&(this.modelErrorEl.style.display="block"),this.generateGraph()}}fitModelToView(){if(!this.modelGroup||!this.scene||!this.camera||!this.controls)return;const e=new fi().setFromObject(this.modelGroup),t=e.getCenter(new L),i=e.getSize(new L),n=Math.max(i.x,i.y,i.z),r=n*2;this.camera.position.set(t.x,t.y+i.y*.5,t.z+r),this.camera.lookAt(t),this.camera.updateProjectionMatrix(),this.controls.target.copy(t),this.controls.update(),this.controls.minDistance=n*.5,this.controls.maxDistance=n*5}setupResizeObserver(){if(!this.container||typeof ResizeObserver>"u"){window.addEventListener("resize",()=>this.handleResize());return}this.resizeObserver=new ResizeObserver(()=>{this.handleResize()}),this.resizeObserver.observe(this.container)}handleResize(){if(!this.renderer||!this.camera||!this.container)return;const e=this.container.clientWidth,t=this.container.clientHeight;e===0||t===0||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.updateStatusText())}generateGraph(){var l,c;if(!this.scene)return;this.sceneNodes.forEach(h=>{this.scene.remove(h),h.geometry.dispose(),Array.isArray(h.material)?h.material.forEach(d=>d.dispose()):h.material.dispose()}),this.sceneNodes.clear(),this.edgeLines.forEach(h=>{this.scene.remove(h),h.geometry.dispose(),Array.isArray(h.material)?h.material.forEach(d=>d.dispose()):h.material.dispose()}),this.edgeLines=[];const e=this.modelLoaded&&this.modelGroup&&this.modelGroup.children.length>0,t=Cd(this.graph.nodes),i=((l=this.museum.map)==null?void 0:l.width)||1e3,n=((c=this.museum.map)==null?void 0:c.height)||600;let r={};if(t)r=xd(this.graph.nodes,this.graph.edges,{width:i,height:n,iterations:300,padding:40});else for(const h of this.graph.nodes)h.mapPoint&&(r[h.id]={x:h.mapPoint.x,y:h.mapPoint.y});const a=(h=>{const d=Object.entries(h);if(d.length===0)return{};let u=1/0,p=-1/0,g=1/0,E=-1/0;for(const[,M]of d)u=Math.min(u,M.x),p=Math.max(p,M.x),g=Math.min(g,M.y),E=Math.max(E,M.y);const A=p-u||1,f=E-g||1,y=20/A,v=20/f,b=(u+p)/2,T=(g+E)/2,S={};for(const[M,D]of d){const _=N0(this.graph,M),w=(Math.random()-.5)*.5;S[M]={x:(D.x-b)*y,y:_*1.5+w,z:(D.y-T)*v}}return S})(r);if(!e)for(const h of this.graph.edges){const d=a[h.from],u=a[h.to];if(!d||!u)continue;const p=new Qt().setFromPoints([new L(d.x,d.y,d.z),new L(u.x,u.y,u.z)]),g=new va({color:16777215,opacity:.3,transparent:!0}),E=new ya(p,g);this.scene.add(E),this.edgeLines.push(E)}for(const h of this.graph.nodes){const d=a[h.id];if(!d)continue;const u=h.id===this.currentSceneId,p=new jn(u?.8:.6,16,16),g=new xa({color:u?4886754:8947848,opacity:u?.9:.7,transparent:!0,metalness:.1,roughness:.7}),E=new ht(p,g);if(e&&this.modelGroup){const A=new fi().setFromObject(this.modelGroup),f=A.getCenter(new L),y=A.getSize(new L);E.position.set(f.x+d.x*.1,f.y+y.y*.5+d.y*.1+1,f.z+d.z*.1)}else E.position.set(d.x,d.y,d.z);E.userData={sceneId:h.id,sceneName:h.name},u&&(E.userData.isCurrent=!0,E.scale.set(1.2,1.2,1.2)),this.scene.add(E),this.sceneNodes.set(h.id,E)}}handleClick(e){if(!this.renderer||!this.camera||this.sceneNodes.size===0)return;const t=this.renderer.domElement.getBoundingClientRect(),i=(e.clientX-t.left)/t.width*2-1,n=-((e.clientY-t.top)/t.height)*2+1,r=new vs;r.setFromCamera(new xe(i,n),this.camera);const o=r.intersectObjects(Array.from(this.sceneNodes.values()));if(o.length>0){const l=o[0].object.userData.sceneId;l&&this.onNodeClick&&this.onNodeClick(this.museum.id,l)}}handleMouseMove(e){if(!this.renderer||!this.camera||this.sceneNodes.size===0)return;const t=this.renderer.domElement.getBoundingClientRect(),i=(e.clientX-t.left)/t.width*2-1,n=-((e.clientY-t.top)/t.height)*2+1,r=new vs;r.setFromCamera(new xe(i,n),this.camera);const o=r.intersectObjects(Array.from(this.sceneNodes.values()));if(this.sceneNodes.forEach(a=>{const l=a.material;a.userData.isCurrent||(l.opacity=.7)}),o.length>0){const a=o[0].object,l=a.material,c=a.userData.sceneId;a.userData.isCurrent||(l.opacity=.9),this.hoveredSceneId=c,this.renderer.domElement.style.cursor="pointer"}else this.hoveredSceneId=null,this.renderer.domElement.style.cursor="default"}bindEvents(){if(!this.renderer)return;const e=this.renderer.domElement;e.addEventListener("click",i=>this.handleClick(i)),e.addEventListener("mousemove",i=>this.handleMouseMove(i));const t=i=>{i.key==="Escape"&&this.close()};document.addEventListener("keydown",t),this.element.addEventListener("vr:cleanup",()=>{document.removeEventListener("keydown",t)})}updateContext(e){var t,i;if(this.museum=e.museum,this.graph=e.graph,this.currentSceneId=e.currentSceneId,this.scene){const n=(t=e.museum.dollhouse)==null?void 0:t.modelUrl,r=(i=this.museum.dollhouse)==null?void 0:i.modelUrl;if(n!==r){if(this.modelGroup)for(;this.modelGroup.children.length>0;){const o=this.modelGroup.children[0];this.modelGroup.remove(o)}this.modelLoaded=!1,n?this.loadModel():this.generateGraph()}else this.generateGraph();this.updateStatusText()}}open(){this.element.classList.add("is-visible"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.handleResize(),!this.animationId&&this.renderer&&this.scene&&this.camera&&this.animate()})})}close(){this.element.classList.remove("is-visible"),this.onClose&&this.onClose()}getElement(){return this.element}remove(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.scene&&(this.sceneNodes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.sceneNodes.clear(),this.edgeLines.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.edgeLines=[],this.modelGroup&&(this.modelGroup.traverse(e=>{var t,i;e instanceof ht&&((t=e.geometry)==null||t.dispose(),Array.isArray(e.material)?e.material.forEach(n=>n.dispose()):(i=e.material)==null||i.dispose())}),this.scene.remove(this.modelGroup),this.modelGroup=null)),this.renderer&&(this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.renderer=null),this.controls&&(this.controls.dispose(),this.controls=null),window.removeEventListener("resize",()=>this.handleResize()),this.scene=null,this.camera=null,this.element.remove()}}function U0(s,e,t){const i=s.getBoundingClientRect(),n=e-i.left,r=t-i.top,o=document.createElement("div");o.className="vr-pick-marker",o.style.position="absolute",o.style.left="0",o.style.top="0",o.style.transform=`translate3d(${n}px, ${r}px, 0)`,o.style.pointerEvents="none",o.style.zIndex="1000",s.style.position="relative",s.appendChild(o),window.requestAnimationFrame(()=>{o.classList.add("show")}),window.setTimeout(()=>{o.classList.remove("show"),window.setTimeout(()=>{o.parentNode&&o.parentNode.removeChild(o)},200)},1500)}const F0=150,k0=150,Q0=400;function O0(){return{fadeMs:F0,restoreMs:k0,restoreDelayMs:Q0}}function G0(){rt.on("user-interacting",()=>{}),rt.on("user-idle",()=>{}),rt.on("ui-engaged",()=>{})}let ei=null;function H0(){const s=O0();rt.on("user-interacting",()=>{ei!==null&&(clearTimeout(ei),ei=null),document.documentElement.classList.add("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")}),rt.on("user-idle",()=>{ei!==null&&(clearTimeout(ei),ei=null),document.documentElement.classList.remove("vr-ui-interacting"),ei=window.setTimeout(()=>{document.documentElement.classList.remove("vr-ui-restoring"),ei=null},s.restoreDelayMs)}),rt.on("ui-engaged",()=>{ei!==null&&(clearTimeout(ei),ei=null),document.documentElement.classList.remove("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")})}function V0(){const s={};try{const e=new URLSearchParams(window.location.search),t=e.get("museum"),i=e.get("scene");t&&(s.museumId=t),i&&(s.currentSceneId=i)}catch{}try{const e=document.querySelector(".vr-groundnav");if(e){s.groundNavDots={};const t=e.querySelector(".vr-groundnav__dot.is-aimed");t&&(s.groundNavDots.aimedSceneId=t.getAttribute("data-scene-id")||void 0);const i=e.querySelector(".vr-groundnav__dot.is-autonav");if(i){s.groundNavDots.isAutoNavActive=!0,s.groundNavDots.autoNavTargetSceneId=i.getAttribute("data-scene-id")||void 0;const n=i.querySelector(".vr-groundnav__progress");s.groundNavDots.hasProgressElement=!!n}}}catch{}try{const e=document.querySelector(".vr-previewcard");if(e){s.scenePreviewCard={},s.scenePreviewCard.isVisible=e.classList.contains("is-visible");const t=e.querySelector(".vr-previewcard__hint");t&&(s.scenePreviewCard.hintVisible=t.classList.contains("is-visible"),s.scenePreviewCard.hintEmphasizing=t.classList.contains("is-emphasizing"))}}catch{}try{const e=document.querySelector(".vr-scenestrip");e&&(s.sceneStrip={},s.sceneStrip.userScrolling=e.classList.contains("is-user-scrolling"))}catch{}try{const e=document.documentElement,t=Array.from(e.classList).filter(i=>i==="vr-ui-interacting"||i==="vr-ui-restoring");t.length>0&&(s.yieldClassManager={classes:t})}catch{}return s}function z0(s){try{window.dispatchEvent(new CustomEvent("vr:close-panels"))}catch{}try{s?(s.emitInteracting(),setTimeout(()=>{try{document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}},100)):document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}}class W0{constructor(e){m(this,"element");m(this,"overlay");m(this,"getCurrentYaw");m(this,"sceneId");m(this,"onClose");m(this,"currentYawEl",null);m(this,"resultEl",null);m(this,"updateTimer",null);m(this,"northYawValue",null);this.getCurrentYaw=e.getCurrentYaw,this.sceneId=e.sceneId,this.onClose=e.onClose,this.overlay=document.createElement("div"),this.overlay.className="vr-north-calibration-overlay",this.overlay.style.cssText=`
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
    `,this.render(),this.overlay.appendChild(this.element),document.body.appendChild(this.overlay),this.startYawUpdate(),this.overlay.addEventListener("click",i=>{i.target===this.overlay&&this.close()});const t=i=>{i.key==="Escape"&&(this.close(),i.preventDefault())};window.addEventListener("keydown",t)}render(){const t=this.getCurrentYaw().toFixed(1);this.element.innerHTML=`
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
    `;const i=this.element.querySelector(".vr-close-btn");i&&(i.addEventListener("click",()=>this.close()),i.addEventListener("mouseenter",function(){this.style.background="rgba(255, 255, 255, 0.1)",this.style.color="rgba(255, 255, 255, 0.9)"}),i.addEventListener("mouseleave",function(){this.style.background="none",this.style.color="rgba(255, 255, 255, 0.6)"}));const n=this.element.querySelector(".vr-set-north-btn");n&&(n.addEventListener("click",()=>this.handleSetNorth()),n.addEventListener("mouseenter",function(){this.style.background="rgba(33, 150, 243, 0.4)"}),n.addEventListener("mouseleave",function(){this.style.background="rgba(33, 150, 243, 0.3)"}),n.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),n.addEventListener("mouseup",function(){this.style.transform="scale(1)"}));const r=this.element.querySelector(".vr-copy-btn");r&&(r.addEventListener("click",()=>this.handleCopy()),r.addEventListener("mouseenter",function(){this.style.background="rgba(76, 175, 80, 0.4)"}),r.addEventListener("mouseleave",function(){this.style.background="rgba(76, 175, 80, 0.3)"}),r.addEventListener("mousedown",function(){this.style.transform="scale(0.98)"}),r.addEventListener("mouseup",function(){this.style.transform="scale(1)"})),this.currentYawEl=this.element.querySelector(".vr-current-yaw"),this.resultEl=this.element.querySelector(".vr-calibration-result")}startYawUpdate(){const e=()=>{if(this.currentYawEl&&!this.northYawValue){const t=this.getCurrentYaw();this.currentYawEl.textContent=`${t.toFixed(1)}°`}this.updateTimer=window.setTimeout(e,100)};e()}stopYawUpdate(){this.updateTimer!==null&&(clearTimeout(this.updateTimer),this.updateTimer=null)}handleSetNorth(){const e=this.getCurrentYaw();this.northYawValue=e,this.resultEl&&(this.resultEl.style.display="block");const t=this.element.querySelector(".vr-copy-target");if(t){const i=`"northYaw": ${e.toFixed(1)}`;t.textContent=i,t.setAttribute("data-copy-text",i)}this.stopYawUpdate(),this.currentYawEl&&(this.currentYawEl.textContent=`${e.toFixed(1)}°`),je(`已记录北向值: ${e.toFixed(1)}°`)}async handleCopy(){const e=this.element.querySelector(".vr-copy-target");if(!e)return;const t=e.getAttribute("data-copy-text")||e.textContent||"";if(await md(t)){je("已复制到剪贴板");const n=this.element.querySelector(".vr-copy-btn");if(n){const r=n.textContent;n.textContent="✓ 已复制",setTimeout(()=>{n.textContent=r},2e3)}}else je("复制失败，请手动选择文本")}close(){this.stopYawUpdate(),this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.onClose&&this.onClose()}getElement(){return this.overlay}}class Y0{constructor(e,t){m(this,"client");m(this,"context");m(this,"root");m(this,"header");m(this,"body");m(this,"list");m(this,"input");m(this,"sendBtn");m(this,"clearBtn");m(this,"closeBtn");m(this,"statusLine");m(this,"dragging",!1);m(this,"dragOffsetX",0);m(this,"dragOffsetY",0);m(this,"isMobile",!1);m(this,"swipeStartY",0);m(this,"swipeActive",!1);m(this,"messages",[]);m(this,"isOpen",!1);m(this,"fabButton",null);m(this,"snapTimer",null);m(this,"isDragging",!1);m(this,"startX",0);m(this,"startY",0);m(this,"startLeft",0);m(this,"startTop",0);m(this,"lastLeft",0);m(this,"lastTop",0);m(this,"moved",!1);m(this,"hasUserPlaced",!1);m(this,"typingTimer",null);m(this,"typingAbortToken",0);this.client=e,this.context=t,this.mount(),this.injectStyles(),this.detectMobile(),this.ensureWelcome()}destroy(){var e,t;this.stopTyping(!0),this.snapTimer&&(window.clearTimeout(this.snapTimer),this.snapTimer=null),(e=this.root)==null||e.remove(),(t=this.fabButton)==null||t.remove(),this.fabButton=null}detectMobile(){var i,n;const e=((i=window.matchMedia)==null?void 0:i.call(window,"(max-width: 768px)").matches)??!1,t=((n=window.matchMedia)==null?void 0:n.call(window,"(pointer: coarse)").matches)??!1;this.isMobile=e||t,this.root.dataset.mobile=this.isMobile?"1":"0"}mount(){this.root=document.createElement("div"),this.root.className="fcchat-root",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-label","三馆学伴"),this.header=document.createElement("div"),this.header.className="fcchat-header";const e=document.createElement("div");e.className="fcchat-title",e.textContent="三馆学伴";const t=document.createElement("div");t.className="fcchat-header-right",this.clearBtn=document.createElement("button"),this.clearBtn.className="fcchat-btn fcchat-btn-ghost",this.clearBtn.type="button",this.clearBtn.textContent="清空",this.clearBtn.addEventListener("click",()=>this.clear()),this.closeBtn=document.createElement("button"),this.closeBtn.className="fcchat-btn fcchat-btn-ghost fcchat-close",this.closeBtn.type="button",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.textContent="×",this.closeBtn.addEventListener("click",()=>this.toggle()),t.appendChild(this.clearBtn),t.appendChild(this.closeBtn);const i=document.createElement("div");i.className="fcchat-header-row",i.appendChild(e),i.appendChild(t),this.header.appendChild(i);const n=document.createElement("div");n.className="fcchat-disclaimer",n.textContent="提示：AI 可能会出错，内容仅供参考；请以现场展陈/讲解为准。",this.header.appendChild(n),this.body=document.createElement("div"),this.body.className="fcchat-body",this.list=document.createElement("div"),this.list.className="fcchat-list",this.body.appendChild(this.list),this.statusLine=document.createElement("div"),this.statusLine.className="fcchat-status",this.statusLine.textContent="",this.body.appendChild(this.statusLine);const r=document.createElement("div");r.className="fcchat-inputbar",this.input=document.createElement("input"),this.input.className="fcchat-input",this.input.type="text",this.input.placeholder="输入问题，回车发送",this.input.addEventListener("keydown",o=>{o.key==="Enter"&&this.onSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="fcchat-btn fcchat-btn-primary",this.sendBtn.type="button",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.onSend()),r.appendChild(this.input),r.appendChild(this.sendBtn),this.root.appendChild(this.header),this.root.appendChild(this.body),this.root.appendChild(r),document.body.appendChild(this.root),this.root.style.display="none",this.root.style.right="18px",this.root.style.bottom="18px",this.ensureToggleButton(),this.header.addEventListener("mousedown",o=>this.onDragStart(o)),window.addEventListener("mousemove",o=>this.onDragMove(o)),window.addEventListener("mouseup",()=>this.onDragEnd()),this.header.addEventListener("pointerdown",o=>this.onSwipeStart(o),{passive:!1}),this.header.addEventListener("pointermove",o=>this.onSwipeMove(o),{passive:!1}),this.header.addEventListener("pointerup",o=>this.onSwipeEnd(o)),this.header.addEventListener("pointercancel",o=>this.onSwipeEnd(o)),window.addEventListener("resize",()=>this.detectMobile())}hide(){this.isOpen&&(this.isOpen=!1,this.stopTyping(!0),this.root.style.display="none",this.root.classList.remove("fcchat-open"),this.fabButton&&this.fabButton.classList.add("fcchat-docked"),document.body.classList.remove("fcchat-open"),this.updateOverlayState())}show(){this.isOpen||(this.isOpen=!0,this.detectMobile(),this.root.style.display="flex",this.root.classList.add("fcchat-open"),this.fabButton&&this.fabButton.classList.remove("fcchat-docked"),document.body.classList.add("fcchat-open"),this.scrollToBottom(),this.isMobile||this.input.focus(),this.updateOverlayState())}toggle(){this.isOpen?this.hide():this.show()}updateOverlayState(){!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||this.root&&this.root.style.display==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}getSafeBounds(){const e=window.innerWidth,t=window.innerHeight,i=this.fabButton;if(!i)return{minLeft:8,maxLeft:e-52,minTop:12,maxTop:t-64};const n=i.getBoundingClientRect(),r=n.width,o=n.height,a=12+(this.isMobile?56:12),l=12+(this.isMobile?96:12);return{minLeft:8,maxLeft:e-r-8,minTop:a,maxTop:t-o-l}}clampPos(e,t){const i=this.getSafeBounds();return{left:Math.max(i.minLeft,Math.min(e,i.maxLeft)),top:Math.max(i.minTop,Math.min(t,i.maxTop))}}snapToEdge(){const e=this.fabButton;if(!e)return;const t=this.getSafeBounds(),i=e.getBoundingClientRect(),n=i.left,r=i.top,o=n-t.minLeft,a=t.maxLeft-n,l=r-t.minTop,c=t.maxTop-r,h=Math.min(o,a,l,c);let d=n,u=r;h===o?d=t.minLeft:h===a?d=t.maxLeft:h===l?u=t.minTop:h===c&&(u=t.maxTop),e.style.left=`${d}px`,e.style.top=`${u}px`,e.style.right="auto",e.style.bottom="auto",localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:d,top:u})),setTimeout(()=>{e.classList.remove("fcchat-snapping")},220)}ensureToggleButton(){if(this.fabButton)return;const e=new URLSearchParams(location.search);if(e.get("reset_ui")==="1"){localStorage.removeItem("vr_fcchat_dock_state"),e.delete("reset_ui");const n=location.pathname+(e.toString()?"?"+e.toString():"")+location.hash;history.replaceState({},"",n)}const t=document.createElement("button");t.id="fcchat-fab",t.className="fcchat-fab fcchat-docked",t.type="button",t.setAttribute("aria-label","打开三馆学伴"),t.innerHTML=`<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,t.addEventListener("pointerdown",n=>this.onFabPointerDown(n),{passive:!1}),t.addEventListener("pointermove",n=>this.onFabPointerMove(n),{passive:!1}),t.addEventListener("pointerup",n=>this.onFabPointerUp(n),{passive:!1}),t.addEventListener("pointercancel",n=>this.onFabPointerUp(n),{passive:!1}),this.fabButton=t,document.body.appendChild(t);const i=localStorage.getItem("fcchat_fab_pos_v1");if(i)try{const n=JSON.parse(i);t.style.left=`${n.left}px`,t.style.top=`${n.top}px`,t.style.right="auto",t.style.bottom="auto",t.classList.remove("fcchat-docked"),this.hasUserPlaced=!0}catch{}!this.hasUserPlaced&&!this.isOpen&&t.classList.add("fcchat-docked"),this.maybeShowFirstVisitHint()}maybeShowFirstVisitHint(){const e="fcchat_first_hint_shown";if(sessionStorage.getItem(e))return;sessionStorage.setItem(e,"1");const t=this.fabButton;if(!t)return;const i=document.createElement("div");i.className="fcchat-first-hint",i.textContent="我是三馆学伴，为你解疑答惑😉",document.body.appendChild(i);const n=()=>{const r=t.getBoundingClientRect();i.style.left=`${r.left-8}px`,i.style.top=`${r.top+r.height/2}px`};n(),window.addEventListener("resize",n),setTimeout(()=>{i.classList.add("is-hide"),setTimeout(()=>{window.removeEventListener("resize",n),i.remove()},300)},1e4)}onFabPointerDown(e){const t=this.fabButton;if(!t)return;e.preventDefault(),this.isDragging=!1,this.moved=!1,this.startX=e.clientX,this.startY=e.clientY;const i=t.getBoundingClientRect(),n=parseFloat(t.style.left||""),r=parseFloat(t.style.top||"");this.startLeft=Number.isFinite(n)?n:i.left,this.startTop=Number.isFinite(r)?r:i.top;try{t.setPointerCapture(e.pointerId)}catch{}t.classList.remove("fcchat-docked")}onFabPointerMove(e){const t=this.fabButton;if(!t)return;e.preventDefault();const i=e.clientX-this.startX,n=e.clientY-this.startY;if(!this.isDragging){if(Math.abs(i)+Math.abs(n)<4)return;this.isDragging=!0,t.classList.add("fcchat-dragging")}const r=this.clampPos(this.startLeft+i,this.startTop+n);this.lastLeft=r.left,this.lastTop=r.top,t.style.left=`${this.lastLeft}px`,t.style.top=`${this.lastTop}px`,t.style.right="auto",t.style.bottom="auto",this.hasUserPlaced=!0}onFabPointerUp(e){const t=this.fabButton;if(t){e.preventDefault();try{t.releasePointerCapture(e.pointerId)}catch{}if(!this.isDragging){this.toggle();return}this.isDragging=!1,t.classList.remove("fcchat-dragging");try{localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:this.lastLeft,top:this.lastTop}))}catch{}this.snapTimer&&window.clearTimeout(this.snapTimer),t.classList.add("fcchat-snapping"),this.snapTimer=window.setTimeout(()=>{this.snapToEdge(),this.snapTimer=null},5e3)}}onDragStart(e){if(this.isMobile||e.target.closest("button"))return;this.dragging=!0;const i=this.root.getBoundingClientRect();this.dragOffsetX=e.clientX-i.left,this.dragOffsetY=e.clientY-i.top,this.root.style.right="auto",this.root.style.bottom="auto",this.root.style.left=i.left+"px",this.root.style.top=i.top+"px"}onDragMove(e){if(!this.dragging||this.isMobile)return;const t=window.innerWidth,i=window.innerHeight,n=this.root.getBoundingClientRect();let r=e.clientX-this.dragOffsetX,o=e.clientY-this.dragOffsetY;r=Math.max(8,Math.min(r,t-n.width-8)),o=Math.max(8,Math.min(o,i-n.height-8)),this.root.style.left=r+"px",this.root.style.top=o+"px"}onDragEnd(){this.dragging=!1}onSwipeStart(e){!this.isMobile||e.target.closest("button")||(this.swipeActive=!0,this.swipeStartY=e.clientY,this.root.classList.add("is-swiping"),e.preventDefault(),this.header.setPointerCapture(e.pointerId))}onSwipeMove(e){if(!this.isMobile||!this.swipeActive)return;e.preventDefault();const t=e.clientY-this.swipeStartY;if(t<=0){this.root.style.transform="";return}this.root.style.transform=`translateY(${Math.min(t,200)}px)`}onSwipeEnd(e){if(!this.isMobile||!this.swipeActive)return;const i=(this.root.style.transform||"").match(/translateY\(([-\d.]+)px\)/),n=i?Number(i[1]):0;this.swipeActive=!1,this.root.classList.remove("is-swiping"),this.root.style.transform="",e&&this.header.releasePointerCapture(e.pointerId),n>=90&&this.hide()}clear(){this.stopTyping(!0),this.messages=[],this.list.innerHTML="",this.statusLine.textContent="",this.ensureWelcome()}ensureWelcome(){this.messages.length>0||this.addMessage("assistant","我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。")}setBusy(e,t=""){this.sendBtn.disabled=e,this.input.disabled=e,this.statusLine.textContent=t}normalizeText(e){return(e??"").replace(/^\s+/,"")}addMessage(e,t){const i={role:e,text:this.normalizeText(t)};this.messages.push(i);const n=document.createElement("div");n.className=`fcchat-row ${e==="user"?"is-user":"is-assistant"}`;const r=document.createElement("div");r.className=`fcchat-bubble ${e==="user"?"bubble-user":"bubble-assistant"}`,r.textContent=i.text,n.appendChild(r),this.list.appendChild(n),this.scrollToBottom()}addAssistantBubbleLoading(){const e=document.createElement("div");e.className="fcchat-row is-assistant",e.dataset.loading="1";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.innerHTML='<span class="fcchat-typing"><span></span><span></span><span></span></span>',e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),{row:e,bubble:t}}addAssistantBubbleEmpty(){const e=document.createElement("div");e.className="fcchat-row is-assistant";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.textContent="",e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),t}replaceLoadingWithEmpty(e){e.removeAttribute("data-loading");const t=e.querySelector(".fcchat-bubble");return t&&(t.innerHTML="",t.textContent=""),t}scrollToBottom(){this.list.scrollTop=this.list.scrollHeight}stopTyping(e){this.typingAbortToken++,this.typingTimer!=null&&(window.clearTimeout(this.typingTimer),this.typingTimer=null)}async typewriterRender(e,t){const i=++this.typingAbortToken,n=this.normalizeText(t),r=n.length;let o=1200;r<=120?o=900+Math.floor(Math.random()*400):r<=400?o=1800+Math.floor(Math.random()*800):o=3e3+Math.floor(Math.random()*1e3);let a=0;const l=performance.now();return await new Promise(c=>{const h=()=>{if(i!==this.typingAbortToken){e.textContent=n,this.scrollToBottom(),c();return}const d=performance.now()-l,u=r-a;if(d>=o||u<=0){e.textContent=n,this.scrollToBottom(),c();return}const p=a/Math.max(1,r);let g=1;const E=Math.random();p<.15?g=E<.75?1:2:p<.7?g=E<.35?2:E<.75?3:4:g=E<.5?2:3,g=Math.min(g,u);const A=n.slice(0,a+g);a+=g,e.textContent=A,this.scrollToBottom();let f=18+Math.floor(Math.random()*38);Math.random()<.06&&(f+=60+Math.floor(Math.random()*90)),this.typingTimer=window.setTimeout(h,f)};h()})}async onSend(){const e=this.input.value.trim();if(!e)return;this.stopTyping(!0),this.input.value="",this.addMessage("user",e);const{row:t,bubble:i}=this.addAssistantBubbleLoading();this.setBusy(!0,"");try{const n=await this.client.ask(e,this.context),r=this.replaceLoadingWithEmpty(t);this.setBusy(!0,"输出中…"),await this.typewriterRender(r,n.answer),this.messages.length>0&&this.messages[this.messages.length-1].role==="assistant"&&(this.messages[this.messages.length-1].text=n.answer),this.setBusy(!1,"")}catch(n){const r=t.querySelector(".fcchat-bubble");if(r){t.removeAttribute("data-loading");const o=typeof(n==null?void 0:n.message)=="string"?n.message:String(n);r.textContent=`请求失败：${o}`,this.messages.length>0&&this.messages[this.messages.length-1].role==="assistant"&&(this.messages[this.messages.length-1].text=`请求失败：${o}`)}this.setBusy(!1,"")}this.scrollToBottom()}injectStyles(){if(document.getElementById("fcchat-style"))return;const e=document.createElement("style");e.id="fcchat-style",e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.root}remove(){this.destroy()}}function q0(s){try{return JSON.parse(s)}catch{return null}}function Fo(s){return typeof s=="string"?s:""}function X0(s){return s.endsWith("/")?s:s+"/"}function $0(s,e){const t={question:s};return e&&typeof e=="object"&&(t.context={museumId:e.museumId||"",museumName:e.museumName||"",sceneId:e.sceneId||"",sceneTitle:e.sceneTitle||"",url:e.url||""}),t}function J0(s){if(s&&typeof s=="object"&&typeof s.answer=="string"&&s.answer.trim())return{ok:!0,answer:s.answer.trim(),model:Fo(s.model)||void 0};if(s&&typeof s=="object"&&("code"in s||"msg"in s||"data"in s)){const e=typeof s.code=="number"?s.code:void 0,t=Fo(s.msg)||"",i=s.data;if((e===0||e===void 0)&&i&&typeof i=="object"){const n=typeof i.answer=="string"?i.answer.trim():"";if(n)return{ok:!0,answer:n,model:Fo(i.model)||void 0}}if(e===40101||t.toLowerCase()==="unauthorized")return{ok:!1,code:40101,msg:"unauthorized"};if(e!==void 0&&e!==0)return{ok:!1,code:e,msg:t||`error code=${e}`};if(t&&t.toLowerCase()!=="ok")return{ok:!1,code:e,msg:t}}return{ok:!1,msg:"bad response"}}class K0{constructor(e){m(this,"endpoint");m(this,"authToken");m(this,"timeoutMs");if(!(e!=null&&e.endpoint))throw new Error("fcChat endpoint is empty");this.endpoint=X0(e.endpoint),this.authToken=e.authToken||"",this.timeoutMs=typeof e.timeoutMs=="number"&&e.timeoutMs>0?e.timeoutMs:15e3}async ask(e,t){const i=(e||"").trim();if(!i)throw new Error("empty question");const n=new AbortController,r=setTimeout(()=>n.abort(),this.timeoutMs);try{const o={"Content-Type":"application/json"};this.authToken&&(o.Authorization=this.authToken.startsWith("Bearer ")?this.authToken:`Bearer ${this.authToken}`);const a=await fetch(this.endpoint,{method:"POST",headers:o,body:JSON.stringify($0(i,t)),signal:n.signal}),l=await a.text(),c=q0(l);if(!c){const u=l?`bad response: ${l}`:`http ${a.status}`;throw new Error(u)}const h=J0(c);if(h.ok)return{answer:h.answer,model:h.model};if(h.code===40101){const u=new Error("unauthorized (code=40101)");throw u.code=40101,u}const d=h.code?`${h.msg} (code=${h.code})`:h.msg;throw new Error(d||"request failed")}catch(o){throw(o==null?void 0:o.name)==="AbortError"?new Error(`timeout (${this.timeoutMs}ms)`):o}finally{clearTimeout(r)}}}let ln=!1,gs=null,fr=null,pr=null,Ar=!1,Pn=0,ji=0,mr=!0;const j0=new L(0,0,1),Jc=new Cs,Z0=new Ti,ey=new Ti(-Math.sqrt(.5),0,0,Math.sqrt(.5)),ar=new Ti,ty=new L(0,0,-1),iy=new L(0,1,0);let Lr=null;function ny(){const s=screen.orientation,e=s&&typeof s.angle=="number"?s.angle:typeof window.orientation=="number"?window.orientation:0;return at.degToRad(e||0)}function sy(s,e,t){const i=at.degToRad(s||0),n=at.degToRad(e||0),r=at.degToRad(t||0),o=ny();return Jc.set(n,i,-r,"YXZ"),ar.setFromEuler(Jc),ar.multiply(ey),ar.multiply(Z0.setFromAxisAngle(j0,-o)),ar.clone()}function ko(s){for(;s>Math.PI;)s-=2*Math.PI;for(;s<-Math.PI;)s+=2*Math.PI;return s}function ry(s,e,t){s=ko(s),e=ko(e);let i=e-s;return i>Math.PI&&(i-=2*Math.PI),i<-Math.PI&&(i+=2*Math.PI),ko(s+i*t)}function oy(){return/iPhone|iPad|iPod/i.test(navigator.userAgent)}async function ay(){if(!oy())return!0;if(typeof DeviceOrientationEvent.requestPermission=="function")try{return await DeviceOrientationEvent.requestPermission()==="granted"}catch(s){return console.warn("[VRMode] iOS permission request failed:",s),!1}return!0}function ly(s){Lr=s}async function cy(s){var t;if(ln)return!0;if(!await ay())return je("未获得陀螺仪权限，无法进入VR模式"),!1;Ar=!1,pr=null,Pn=0,ji=0,mr=!0,fr=s;try{(t=screen.orientation)!=null&&t.lock&&await screen.orientation.lock("landscape")}catch{}return gs=i=>{if(!ln||!fr||i.alpha===null||i.beta===null||i.gamma===null)return;const n=sy(i.alpha,i.beta,i.gamma);if(!Ar){pr=n.clone(),Ar=!0;return}if(Lr&&Lr())return;const r=pr.clone().invert(),o=n.clone().multiply(r),a=ty.clone().applyQuaternion(o),l=iy.clone().applyQuaternion(o);let c=Math.atan2(a.x,-a.z);c=-c;let h=Math.atan2(l.z,l.y);h=-h;const d=at.degToRad(85);h=Math.max(-d,Math.min(d,h)),mr?(Pn=c,ji=h,mr=!1):(Pn=ry(Pn,c,.15),ji=ji+(h-ji)*.2);const u=at.radToDeg(Pn),p=at.radToDeg(ji);fr(u,p)},window.addEventListener("deviceorientation",gs),ln=!0,!0}function bd(){var s;if(ln){gs&&(window.removeEventListener("deviceorientation",gs),gs=null),fr=null,ln=!1,Ar=!1,pr=null,Pn=0,ji=0,mr=!0,Lr=null;try{(s=screen.orientation)!=null&&s.unlock&&screen.orientation.unlock()}catch{}}}function lr(){return ln}function hy(){const s=()=>{!ys()&&ln&&bd()};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}ft&&(window.__vrDump=()=>{const s=V0();return console.debug("[VR State Snapshot]",s),s},window.__vrResetUI=()=>{console.debug("[VR Reset UI] 正在清理所有 UI 状态..."),z0(rt),console.debug("[VR Reset UI] 清理完成")},console.debug("[VR Debug] 调试模式已启用。使用 __vrDump() 查看状态，使用 __vrResetUI() 复位 UI"));kd();G0();H0();VE();hy();const wd=()=>{const s=document;!!(document.fullscreenElement||s.webkitFullscreenElement)&&av()};document.addEventListener("fullscreenchange",wd);document.addEventListener("webkitfullscreenchange",wd);function dy(){const s=new URLSearchParams(location.search);return s.has("development")||s.get("dev")==="1"||location.hash.includes("development")}class uy{constructor(){m(this,"appElement");m(this,"config",null);m(this,"panoViewer",null);m(this,"titleBar",null);m(this,"topRightControls",null);m(this,"topModeTabs",null);m(this,"sceneTitleEl",null);m(this,"brandMark",null);m(this,"bottomDock",null);m(this,"sceneGuideDrawer",null);m(this,"guideTray",null);m(this,"museumList",null);m(this,"sceneList",null);m(this,"mapOverlay",null);m(this,"hotspots",null);m(this,"videoPlayer",null);m(this,"controlBar",null);m(this,"loading");m(this,"debugPanel",null);m(this,"configStudio",null);m(this,"qualityIndicator",null);m(this,"northCalibrationPanel",null);m(this,"currentMuseum",null);m(this,"currentScene",null);m(this,"hasBoundFullscreenEvents",!1);m(this,"mode","tour");m(this,"isStructureOverlayOpen",!1);m(this,"structureView2D",null);m(this,"structureView3D",null);m(this,"fcChatPanel",null);m(this,"infoModalMounted",null);m(this,"settingsModalMounted",null);m(this,"uiErrorElement",null);const e=document.getElementById("app");if(!e)throw new Error("找不到 #app 元素");this.appElement=e,ad(),this.loading=new Wv,this.appElement.appendChild(this.loading.getElement()),this.bindFullscreenEventsOnce(),this.init()}bindFullscreenEventsOnce(){if(this.hasBoundFullscreenEvents)return;this.hasBoundFullscreenEvents=!0;const e=()=>{var t;(t=this.topRightControls)==null||t.syncFullscreenState(),Tr()||(this.topRightControls&&!lr()&&this.topRightControls.updateVrModeState(!1),this.panoViewer&&this.panoViewer.isVrModeEnabled()&&this.panoViewer.setVrModeEnabled(!1),Ad())};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}async init(){try{if(this.loading.show(),Gd()){await this.initEditorMode(),this.loading.hide();return}this.config=await Ga(),this.titleBar&&this.titleBar.setTitle(this.config.appName),window.addEventListener("popstate",()=>this.handleRoute()),await this.handleRoute(),this.loading.hide()}catch(e){console.error("配置加载失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await Ga(),this.appElement.innerHTML="",this.configStudio=new jv(this.config,e=>{this.config=e,Ha()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}showConfigErrorPanel(e){this.appElement.innerHTML="";const t=new Yv(e,()=>{Ha(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(t.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
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
      `)}async handleRoute(){if(!this.config)return;const e=Wa();if(this.clearView(),!e.museumId){const t=this.config.museums.find(i=>i.id==="wangding")||this.config.museums[0];if(t){if(t.scenes&&t.scenes.length>0){ti(t.id,t.scenes[0].id);return}Oo(t.id);return}}if(!e.museumId)this.showMuseumList();else if(e.sceneId){const t=Qo(e.museumId),i=Ud(e.museumId,e.sceneId);t&&i?await this.showScene(t,i):(this.showError("未找到指定的场景"),t?Oo(t.id):Ya())}else{const t=Qo(e.museumId);t?this.showSceneList(t):(this.showError("未找到指定的展馆"),Ya())}}showMuseumList(){this.config&&(this.titleBar=new Oc(this.config.appName),this.appElement.appendChild(this.titleBar.getElement()),this.museumList=new wv(this.config.museums),this.appElement.appendChild(this.museumList.getElement()))}showSceneList(e){this.titleBar=new Oc(e.name),this.appElement.appendChild(this.titleBar.getElement());const t=document.createElement("div");t.className="scene-list-page",t.innerHTML=`
      <div class="scene-list-container">
        <h1 class="scene-list-title">${e.name} - 场景列表</h1>
        ${e.description?`<p class="scene-list-desc">${e.description}</p>`:""}
        <div class="scene-grid">
          ${e.scenes.map(n=>`
            <div class="scene-card" data-scene-id="${n.id}">
              <div class="scene-cover">
                <img src="${n.thumb}" alt="${n.name}" loading="lazy">
                <div class="scene-overlay">
                  <h2 class="scene-name">${n.name}</h2>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;const i=document.createElement("style");i.textContent=`
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
    `,document.head.appendChild(i),t.querySelectorAll(".scene-card").forEach(n=>{n.addEventListener("click",()=>{const r=n.getAttribute("data-scene-id");r&&ti(e.id,r)})}),this.appElement.appendChild(t)}async showScene(e,t){var g,E,A;this.currentMuseum=e,this.currentScene=t,this.loading.show();const i=document.createElement("div");i.className="viewer-container",i.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `,this.appElement.appendChild(i);const n=Od();this.panoViewer=new bv(i,n);const r=dy();try{this.topRightControls=new s0({viewerRootEl:i,onTogglePickMode:r?()=>this.panoViewer?(this.panoViewer.isPickModeEnabled()?this.panoViewer.disablePickMode():this.panoViewer.enablePickMode(),this.panoViewer.isPickModeEnabled()):!1:void 0,onOpenNorthCalibration:r?()=>{this.openNorthCalibration(t.id)}:void 0,showNorthCalibration:r,onToggleVrMode:async()=>this.toggleVrModeFromUI(i)}),this.appElement.appendChild(this.topRightControls.getElement())}catch(f){ft&&console.debug("[showScene] TopRightControls 创建失败，跳过:",f),this.topRightControls=null}this.sceneTitleEl=document.createElement("div"),this.sceneTitleEl.className="vr-scenetitle",this.sceneTitleEl.textContent=t.name||((g=this.config)==null?void 0:g.appName)||"VR Player",this.appElement.appendChild(this.sceneTitleEl);const o=f=>{const y=f,{x:v,y:b,yaw:T,pitch:S}=y.detail;if(Kv({yaw:T,pitch:S,ts:Date.now()}),je(`已复制 yaw: ${T.toFixed(2)}, pitch: ${S.toFixed(2)}`),this.panoViewer){const M=this.panoViewer.getDomElement();U0(M,v,b)}};window.addEventListener("vr:pick",o);const a=f=>{const y=f;this.panoViewer&&!y.detail.enabled&&this.panoViewer.isPickModeEnabled()&&this.panoViewer.disablePickMode()};window.addEventListener("vr:pickmode",a);try{if(this.appElement.querySelector(".vr-brandmark"))ft&&console.debug("[showScene] BrandMark 已存在，跳过重复创建");else{this.brandMark=new o0({appName:(E=this.config)==null?void 0:E.appName,brandText:"鼎虎清源"});const y=this.brandMark.getElement();y.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),this.openDingHuQingYuan()}),this.appElement.appendChild(y)}}catch(f){ft&&console.debug("[showScene] BrandMark 创建失败，跳过:",f),this.brandMark=null}if(n){this.debugPanel=new qv,this.appElement.appendChild(this.debugPanel.getElement()),this.panoViewer.setOnDebugClick((y,v,b,T,S)=>{this.debugPanel&&this.debugPanel.show(y,v,b,T,S)});const f=()=>{if(this.debugPanel&&this.panoViewer){const y=this.panoViewer.getCurrentView();this.debugPanel.updateView(y.yaw,y.pitch,y.fov)}requestAnimationFrame(f)};f()}try{this.videoPlayer=new zv,this.appElement.appendChild(this.videoPlayer.getElement())}catch(f){ft&&console.debug("[showScene] VideoPlayer 创建失败，跳过:",f),this.videoPlayer=null}try{this.guideTray=new T0({museumId:e.id,currentSceneId:t.id,scenes:e.scenes,onSceneClick:f=>{ti(e.id,f)},onMoreClick:()=>{if(!this.sceneGuideDrawer)try{this.sceneGuideDrawer=new M0({museumId:e.id,currentSceneId:t.id,scenes:e.scenes,onClose:()=>{}}),this.appElement.appendChild(this.sceneGuideDrawer.getElement())}catch(f){ft&&console.debug("[GuideTray] SceneGuideDrawer 创建失败:",f)}this.guideTray&&this.guideTray.setVisible(!1),this.sceneGuideDrawer&&this.sceneGuideDrawer.open()},onClose:()=>{this.guideTray&&this.guideTray.setVisible(!1),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"guide"}}))}}),this.guideTray.setVisible(!1),this.appElement.appendChild(this.guideTray.getElement())}catch(f){ft&&console.debug("[showScene] GuideTray 创建失败，跳过:",f),this.guideTray=null}const l=new Map;e.scenes.forEach(f=>{l.set(f.id,{title:f.name,thumb:f.thumb,panoUrl:void 0})});try{this.bottomDock=new S0({onGuideClick:()=>{this.guideTray&&this.guideTray.setVisible(!0)},onOpenInfo:()=>this.openInfoModal(),onOpenSettings:()=>this.openSettingsModal(),sceneId:t.id,sceneName:t.name,museum:e,scenes:e.scenes,currentSceneId:t.id}),this.appElement.appendChild(this.bottomDock.getElement())}catch(f){ft&&console.debug("[showScene] BottomDock 创建失败，跳过:",f),this.bottomDock=null}try{this.topModeTabs=new B0({initialMode:this.mode,onModeChange:f=>{this.setMode(f)}}),this.appElement.appendChild(this.topModeTabs.getElement())}catch(f){ft&&console.debug("[showScene] TopModeTabs 创建失败，跳过:",f),this.topModeTabs=null}try{const f=new Map(e.scenes.map(y=>[y.id,y.name]));this.hotspots=new Vv(this.panoViewer,t.hotspots,{resolveSceneName:y=>f.get(y),onEnterScene:y=>{ti(e.id,y)},museumId:e.id}),i.appendChild(this.hotspots.getElement())}catch(f){ft&&console.debug("[showScene] Hotspots 创建失败，跳过:",f),this.hotspots=null}try{this.qualityIndicator=new zE,this.appElement.appendChild(this.qualityIndicator.getElement())}catch(f){ft&&console.debug("[showScene] QualityIndicator 创建失败，跳过:",f),this.qualityIndicator=null}window.addEventListener("vr:metrics",f=>{if(!this.qualityIndicator)return;const y=f.detail||{};this.qualityIndicator.updateMetrics(y)}),this.panoViewer.setOnStatusChange(f=>{this.qualityIndicator&&this.qualityIndicator.updateStatus(f),(f===We.LOW_READY||f===We.HIGH_READY||f===We.DEGRADED)&&this.loading.hide()}),this.panoViewer.setOnLoad(()=>{this.loading.hide(),this.hideUIError(),this.preloadNextScene(e,t)}),this.panoViewer.setOnError(f=>{console.error("加载场景失败:",f),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),this.qualityIndicator&&this.qualityIndicator.updateStatus(We.ERROR)});const c=Wa(),h=c.yaw!==void 0?c.yaw:t.initialView.yaw||0,d=c.pitch!==void 0?c.pitch:t.initialView.pitch||0,u=c.fov!==void 0?c.fov:t.initialView.fov||75,p=-h;this.panoViewer.setView(p,d,u),this.panoViewer.loadScene(t),this.panoViewer.setSceneData(e.id,t.id,t.hotspots);try{const f=(A=this.config)==null?void 0:A.fcChat;if(f!=null&&f.endpoint&&f.endpoint.trim()){const y={endpoint:f.endpoint,authToken:f.authToken,timeoutMs:15e3},v=new K0(y);this.fcChatPanel=new Y0(v,{museumId:e.id,sceneId:t.id,sceneTitle:t.name,museumName:e.name,url:window.location.href})}}catch(f){ft&&console.debug("[showScene] FcChatPanel 创建失败，跳过:",f),this.fcChatPanel=null}}preloadNextScene(e,t){const n=(e.scenes.findIndex(o=>o.id===t.id)+1)%e.scenes.length,r=e.scenes[n];r&&r.thumb&&Promise.all([Vn(()=>Promise.resolve().then(()=>HE),void 0,import.meta.url),Vn(()=>Promise.resolve().then(()=>Hh),void 0,import.meta.url)]).then(([{resolveAssetUrl:o,AssetType:a},{toProxiedImageUrl:l}])=>{const c=o(r.thumb,a.THUMB);if(c){const h=new Image;h.referrerPolicy="no-referrer",h.crossOrigin="anonymous",h.loading="lazy",h.decoding="async",h.src=l(c)}})}clearView(){if(this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.topRightControls&&(this.topRightControls.remove(),this.topRightControls=null),this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),this.topModeTabs&&(this.topModeTabs.getElement().remove(),this.topModeTabs=null),this.sceneTitleEl&&(this.sceneTitleEl.remove(),this.sceneTitleEl=null),this.brandMark&&(this.brandMark.remove(),this.brandMark=null),this.bottomDock&&(this.bottomDock.remove(),this.bottomDock=null),this.guideTray&&(this.guideTray.remove(),this.guideTray=null),this.sceneGuideDrawer&&(this.sceneGuideDrawer.remove(),this.sceneGuideDrawer=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneList&&(this.sceneList.remove(),this.sceneList=null),this.mapOverlay&&(this.mapOverlay.remove(),this.mapOverlay=null),this.hotspots&&(this.hotspots.remove(),this.hotspots=null),this.videoPlayer&&(this.videoPlayer.remove(),this.videoPlayer=null),this.controlBar&&(this.controlBar.remove(),this.controlBar=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),this.qualityIndicator&&(this.qualityIndicator.remove(),this.qualityIndicator=null),this.structureView2D){const e=this.structureView2D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView2D=null}if(this.structureView3D){const e=this.structureView3D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView3D=null}this.isStructureOverlayOpen=!1,this.fcChatPanel&&(this.fcChatPanel.remove(),this.fcChatPanel=null),this.mode="tour",this.appElement.innerHTML="",this.appElement.appendChild(this.loading.getElement())}hideUIError(){this.uiErrorElement&&this.uiErrorElement.parentNode&&(this.uiErrorElement.parentNode.removeChild(this.uiErrorElement),this.uiErrorElement=null)}setMode(e){this.mode!==e&&(this.mode,this.mode=e,this.topModeTabs&&this.topModeTabs.setMode(e),e==="tour"&&this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),e==="structure2d"?this.openStructure2D():e==="structure3d"&&this.openStructure3D())}openStructure2D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1});const e=$c(this.currentMuseum,this.currentScene.id);this.structureView2D?this.structureView2D.updateContext({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id}):(this.structureView2D=new D0({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(t,i)=>{this.closeStructureOverlay({toTour:!1}),ti(t,i)}}),this.appElement.appendChild(this.structureView2D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView2D.open()}openStructure3D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1});const e=$c(this.currentMuseum,this.currentScene.id);this.structureView3D?this.structureView3D.updateContext({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id}):(this.structureView3D=new P0({museum:this.currentMuseum,graph:e,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(t,i)=>{this.closeStructureOverlay({toTour:!1}),ti(t,i)}}),this.appElement.appendChild(this.structureView3D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView3D.open()}closeStructureOverlay(e){if(this.isStructureOverlayOpen){if(this.isStructureOverlayOpen=!1,this.structureView2D){const t=this.structureView2D.getElement();t&&t.parentNode&&t.parentNode.removeChild(t),this.structureView2D=null}if(this.structureView3D){const t=this.structureView3D.getElement();t&&t.parentNode&&t.parentNode.removeChild(t),this.structureView3D=null}document.body.style.overflow="",document.body.style.touchAction="",document.body.style.overscrollBehavior="",e.toTour&&(this.mode="tour",this.topModeTabs&&this.topModeTabs.setMode("tour"))}}openNorthCalibration(e){if(this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),!this.panoViewer){console.warn("[openNorthCalibration] PanoViewer 未初始化");return}try{this.northCalibrationPanel=new W0({getCurrentYaw:()=>{var i;const t=(i=this.panoViewer)==null?void 0:i.getCurrentView();return(t==null?void 0:t.yaw)??0},sceneId:e,onClose:()=>{this.northCalibrationPanel=null}})}catch(t){console.error("[openNorthCalibration] 创建校准面板失败:",t),this.northCalibrationPanel=null}}showError(e){this.hideUIError(),this.uiErrorElement=document.createElement("div"),this.uiErrorElement.className="error-message",this.uiErrorElement.textContent=e,this.uiErrorElement.style.cssText=`
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
    `,this.appElement.appendChild(this.uiErrorElement),setTimeout(()=>{this.hideUIError()},3e3)}openDingHuQingYuan(){if(this.brandMark)try{this.brandMark.getAboutModal().open()}catch(e){ft&&console.debug("[openDingHuQingYuan] 打开团队介绍失败:",e)}}openInfoModal(){var r,o,a;(r=this.infoModalMounted)==null||r.close(),this.infoModalMounted=null;const e=((o=this.currentMuseum)==null?void 0:o.name)||"-",t=((a=this.currentScene)==null?void 0:a.name)||"-",i=document.createElement("div");i.className="vr-modal-info-list",i.innerHTML=`
      <div><span class="vr-modal-info-row-label">展馆</span><span>${e}</span></div>
      <div><span class="vr-modal-info-row-label">场景</span><span>${t}</span></div>
      <div><span class="vr-modal-info-row-label">采集时间</span><span> 2025-12-27</span></div>
      <div class="vr-modal-info-copyright">
        <button type="button" role="button" class="vr-modal-info-copyright-btn">© 2025 鼎虎清源</button>
      </div>
    `;const n=i.querySelector(".vr-modal-info-copyright-btn");n&&n.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),this.infoModalMounted&&this.infoModalMounted.close(),setTimeout(()=>{this.openDingHuQingYuan()},0)}),this.infoModalMounted=Br({title:"信息",contentEl:i,onClose:()=>{this.infoModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"info"}}))}})}async toggleVrModeFromUI(e){if(!this.panoViewer)return!1;if(lr())return bd(),this.panoViewer.setVrModeEnabled(!1),this.topRightControls&&this.topRightControls.updateVrModeState(!1),await la(),!1;{try{await pd(e)}catch(r){return ft&&console.debug("[VRMode] fullscreen request failed",r),!1}const i=this.panoViewer.getCurrentView();return ly(()=>{var r;return((r=this.panoViewer)==null?void 0:r.isInteracting())??!1}),await cy((r,o)=>{if(this.panoViewer){const a=i.yaw+r,l=Math.max(-90,Math.min(90,i.pitch+o));this.panoViewer.setView(a,l)}})?(this.panoViewer.setVrModeEnabled(!0),this.topRightControls&&this.topRightControls.updateVrModeState(!0),!0):(await la(),!1)}}openSettingsModal(){var w;(w=this.settingsModalMounted)==null||w.close(),this.settingsModalMounted=null;const e=ud(),t=fd(),i=sa(),n=document.createElement("div");n.className="vr-modal-settings-list";const r=document.createElement("div");r.className="vr-modal-settings-item-label",r.textContent="画质";const o=document.createElement("div");o.className="vr-modal-settings-quality";const a=document.createElement("button");a.className="vr-modal-settings-quality-btn",a.textContent="高清",a.dataset.level="high";const l=document.createElement("button");l.className="vr-modal-settings-quality-btn",l.textContent="省流",l.dataset.level="low";const c=N=>{a.classList.toggle("is-active",N==="high"),l.classList.toggle("is-active",N==="low")};c(i);const h=N=>{!this.currentScene||!this.panoViewer||sa()===N||(WE(N),c(N),this.panoViewer.loadScene(this.currentScene,{preserveView:!0}))};a.addEventListener("click",()=>h("high")),l.addEventListener("click",()=>h("low")),o.appendChild(a),o.appendChild(l);const d=document.createElement("div");d.appendChild(r),d.appendChild(o);const u=document.createElement("div");u.className="vr-modal-settings-item-label",u.textContent="视角";const p=document.createElement("button");p.className="vr-modal-settings-row-btn",p.type="button",p.textContent="恢复初始视角",p.addEventListener("click",()=>{if(!this.currentScene||!this.panoViewer)return;const N=this.currentScene.initialView||{yaw:0,pitch:0,fov:75},$=-(N.yaw||0),R=N.pitch||0,U=N.fov??75;this.panoViewer.setView($,R,U)});const g=document.createElement("div");g.appendChild(u),g.appendChild(p);const E=document.createElement("div");E.className="vr-modal-settings-item-label",E.textContent="VR 眼镜";const A=document.createElement("button");A.className="vr-modal-settings-row-btn",A.type="button",A.textContent="VR 眼镜";const f=()=>{const N=lr();A.classList.toggle("is-on",N)};if(e)f(),A.addEventListener("click",async()=>{if(!this.panoViewer)return;const N=this.panoViewer.getDomElement(),H=await this.toggleVrModeFromUI(N);lr(),f()});else if(t){A.classList.add("is-disabled");const N=()=>{je("移动端可体验此功能",1500)};A.addEventListener("mouseenter",N),A.addEventListener("click",N)}const y=document.createElement("div");y.appendChild(E),y.appendChild(A);const v=document.createElement("div");v.className="vr-modal-settings-item-label",v.textContent="缩放";const b=document.createElement("div");b.className="vr-modal-settings-quality",b.style.gap="8px";const T=document.createElement("button");T.className="vr-modal-settings-quality-btn",T.textContent="缩小",T.style.minWidth="70px";const S=document.createElement("button");S.className="vr-modal-settings-quality-btn",S.textContent="放大",S.style.minWidth="70px";const M=()=>{if(!this.panoViewer)return;const N=this.panoViewer.getCurrentView(),H=Math.min(120,N.fov*1.12);this.panoViewer.setFov(H)},D=()=>{if(!this.panoViewer)return;const N=this.panoViewer.getCurrentView(),H=Math.max(30,N.fov/1.12);this.panoViewer.setFov(H)};T.addEventListener("click",M),S.addEventListener("click",D),b.appendChild(T),b.appendChild(S);const _=document.createElement("div");_.appendChild(v),_.appendChild(b),n.appendChild(d),n.appendChild(g),n.appendChild(_),n.appendChild(y),this.bottomDock&&this.bottomDock.setMoreOpen(!0),this.settingsModalMounted=Br({title:"更多",contentEl:n,panelClassName:"vr-modal-settings",onClose:()=>{this.bottomDock&&this.bottomDock.setMoreOpen(!1),this.settingsModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"settings"}}))}})}}new uy;"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(()=>{})});export{Iy as $,va as A,Jt as B,Ge as C,Fh as D,$n as E,xo as F,xa as G,ci as H,yy as I,Mi as J,Je as K,ts as L,py as M,Wr as N,pt as O,Ji as P,Ti as Q,xs as R,By as S,Ay as T,Qt as U,L as V,vy as W,ht as X,uE as Y,ya as Z,_y as _,xe as a,nn as a0,Rt as a1,Ch as a2,Nh as a3,Cy as a4,cE as a5,vr as a6,yr as a7,wr as a8,wt as a9,Mr as aa,Sr as ab,bs as ac,Ke as ad,Gi as ae,kr as af,fi as ag,Bi as ah,at as b,my as c,Ey as d,gy as e,My as f,xy as g,ui as h,st as i,wy as j,Sy as k,Ve as l,Ec as m,by as n,Ty as o,oE as p,Hi as q,Iu as r,el as s,gt as t,St as u,Wo as v,Yo as w,ot as x,fE as y,Vi as z};
