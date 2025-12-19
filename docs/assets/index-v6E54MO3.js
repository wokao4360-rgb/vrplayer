var Tl=Object.defineProperty;var wl=(i,e,t)=>e in i?Tl(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var E=(i,e,t)=>wl(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Al="modulepreload",Cl=function(i,e){return new URL(i,e).href},kr={},hr=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(c=>{if(c=Cl(c,n),c in kr)return;kr[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(!!n)for(let v=a.length-1;v>=0;v--){const g=a[v];if(g.href===c&&(!d||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Al,d||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((v,g)=>{p.addEventListener("load",v),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};var te=(i=>(i.INVALID_ROOT="INVALID_ROOT",i.MISSING_APP_NAME="MISSING_APP_NAME",i.MUSEUMS_NOT_ARRAY="MUSEUMS_NOT_ARRAY",i.MUSEUMS_EMPTY="MUSEUMS_EMPTY",i.MISSING_MUSEUM_ID="MISSING_MUSEUM_ID",i.DUPLICATE_MUSEUM_ID="DUPLICATE_MUSEUM_ID",i.MISSING_MUSEUM_NAME="MISSING_MUSEUM_NAME",i.MISSING_MUSEUM_COVER="MISSING_MUSEUM_COVER",i.MISSING_MUSEUM_MAP="MISSING_MUSEUM_MAP",i.MISSING_MAP_IMAGE="MISSING_MAP_IMAGE",i.INVALID_MAP_WIDTH="INVALID_MAP_WIDTH",i.INVALID_MAP_HEIGHT="INVALID_MAP_HEIGHT",i.SCENES_NOT_ARRAY="SCENES_NOT_ARRAY",i.SCENES_EMPTY="SCENES_EMPTY",i.MISSING_SCENE_ID="MISSING_SCENE_ID",i.DUPLICATE_SCENE_ID="DUPLICATE_SCENE_ID",i.MISSING_SCENE_NAME="MISSING_SCENE_NAME",i.MISSING_PANO="MISSING_PANO",i.INVALID_PANO_URL="INVALID_PANO_URL",i.INVALID_PANOLOW_URL="INVALID_PANOLOW_URL",i.MISSING_THUMB="MISSING_THUMB",i.MISSING_INITIAL_VIEW="MISSING_INITIAL_VIEW",i.INVALID_YAW="INVALID_YAW",i.INVALID_PITCH="INVALID_PITCH",i.INVALID_FOV="INVALID_FOV",i.MISSING_MAP_POINT="MISSING_MAP_POINT",i.INVALID_MAP_POINT_X="INVALID_MAP_POINT_X",i.INVALID_MAP_POINT_Y="INVALID_MAP_POINT_Y",i.HOTSPOTS_NOT_ARRAY="HOTSPOTS_NOT_ARRAY",i.MISSING_HOTSPOT_ID="MISSING_HOTSPOT_ID",i.DUPLICATE_HOTSPOT_ID="DUPLICATE_HOTSPOT_ID",i.INVALID_HOTSPOT_TYPE="INVALID_HOTSPOT_TYPE",i.MISSING_HOTSPOT_LABEL="MISSING_HOTSPOT_LABEL",i.INVALID_HOTSPOT_YAW="INVALID_HOTSPOT_YAW",i.INVALID_HOTSPOT_PITCH="INVALID_HOTSPOT_PITCH",i.MISSING_HOTSPOT_TARGET="MISSING_HOTSPOT_TARGET",i.MISSING_TARGET_MUSEUM_ID="MISSING_TARGET_MUSEUM_ID",i.MISSING_TARGET_SCENE_ID="MISSING_TARGET_SCENE_ID",i.INVALID_TARGET_YAW="INVALID_TARGET_YAW",i.INVALID_TARGET_PITCH="INVALID_TARGET_PITCH",i.INVALID_TARGET_FOV="INVALID_TARGET_FOV",i.MISSING_TARGET_URL="MISSING_TARGET_URL",i))(te||{});function wo(i){const e=[];if(!i||typeof i!="object")return e.push({code:"INVALID_ROOT",path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!i.appName||typeof i.appName!="string"||i.appName.trim()==="")&&e.push({code:"MISSING_APP_NAME",path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!Array.isArray(i.museums))return e.push({code:"MUSEUMS_NOT_ARRAY",path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;i.museums.length===0&&e.push({code:"MUSEUMS_EMPTY",path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const t=new Set;return i.museums.forEach((n,s)=>{const r=`museums[${s}]`,a=n.name&&typeof n.name=="string"?n.name:void 0;if(!n.id||typeof n.id!="string"||n.id.trim()===""?e.push({code:"MISSING_MUSEUM_ID",path:`${r}.id`,message:"id 必须是非空字符串",museumName:a,fieldName:"博物馆 ID"}):(t.has(n.id)&&e.push({code:"DUPLICATE_MUSEUM_ID",path:`${r}.id`,message:`博物馆 ID "${n.id}" 重复`,museumName:a,fieldName:"博物馆 ID"}),t.add(n.id)),(!n.name||typeof n.name!="string"||n.name.trim()==="")&&e.push({code:"MISSING_MUSEUM_NAME",path:`${r}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),(!n.cover||typeof n.cover!="string"||n.cover.trim()==="")&&e.push({code:"MISSING_MUSEUM_COVER",path:`${r}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:a,fieldName:"封面图"}),!n.map||typeof n.map!="object"?e.push({code:"MISSING_MUSEUM_MAP",path:`${r}.map`,message:"map 必须是对象",museumName:a,fieldName:"地图配置"}):((!n.map.image||typeof n.map.image!="string"||n.map.image.trim()==="")&&e.push({code:"MISSING_MAP_IMAGE",path:`${r}.map.image`,message:"map.image 必须是有效的 URL 字符串",museumName:a,fieldName:"地图图片"}),(typeof n.map.width!="number"||n.map.width<=0)&&e.push({code:"INVALID_MAP_WIDTH",path:`${r}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:a,fieldName:"地图宽度"}),(typeof n.map.height!="number"||n.map.height<=0)&&e.push({code:"INVALID_MAP_HEIGHT",path:`${r}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:a,fieldName:"地图高度"})),!Array.isArray(n.scenes))e.push({code:"SCENES_NOT_ARRAY",path:`${r}.scenes`,message:"scenes 必须是数组",museumName:a,fieldName:"场景列表"});else{n.scenes.length===0&&e.push({code:"SCENES_EMPTY",path:`${r}.scenes`,message:"scenes 数组不能为空",museumName:a,fieldName:"场景列表"});const o=new Set;n.scenes.forEach((l,c)=>{const d=`${r}.scenes[${c}]`,h=l.name&&typeof l.name=="string"?l.name:void 0;if(!l.id||typeof l.id!="string"||l.id.trim()===""?e.push({code:"MISSING_SCENE_ID",path:`${d}.id`,message:"id 必须是非空字符串",museumName:a,sceneName:h,fieldName:"场景 ID"}):(o.has(l.id)&&e.push({code:"DUPLICATE_SCENE_ID",path:`${d}.id`,message:`场景 ID "${l.id}" 在博物馆内重复`,museumName:a,sceneName:h,fieldName:"场景 ID"}),o.add(l.id)),(!l.name||typeof l.name!="string"||l.name.trim()==="")&&e.push({code:"MISSING_SCENE_NAME",path:`${d}.name`,message:"name 必须是非空字符串",museumName:a,sceneName:void 0,fieldName:"场景名称"}),!l.pano&&!l.panoLow?e.push({code:"MISSING_PANO",path:`${d}.pano`,message:"pano 或 panoLow 至少需要提供一个",museumName:a,sceneName:h,fieldName:"全景图"}):(l.pano&&(typeof l.pano!="string"||l.pano.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${d}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"高清全景图"}),l.panoLow&&(typeof l.panoLow!="string"||l.panoLow.trim()==="")&&e.push({code:"INVALID_PANOLOW_URL",path:`${d}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"低清全景图"})),(!l.thumb||typeof l.thumb!="string"||l.thumb.trim()==="")&&e.push({code:"MISSING_THUMB",path:`${d}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:a,sceneName:h,fieldName:"缩略图"}),!l.initialView||typeof l.initialView!="object"?e.push({code:"MISSING_INITIAL_VIEW",path:`${d}.initialView`,message:"initialView 必须是对象",museumName:a,sceneName:h,fieldName:"初始视角"}):(typeof l.initialView.yaw!="number"&&e.push({code:"INVALID_YAW",path:`${d}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:a,sceneName:h,fieldName:"水平角度"}),typeof l.initialView.pitch!="number"&&e.push({code:"INVALID_PITCH",path:`${d}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:a,sceneName:h,fieldName:"垂直角度"}),l.initialView.fov!==void 0&&typeof l.initialView.fov!="number"&&e.push({code:"INVALID_FOV",path:`${d}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:a,sceneName:h,fieldName:"视野角度"})),!l.mapPoint||typeof l.mapPoint!="object"?e.push({code:"MISSING_MAP_POINT",path:`${d}.mapPoint`,message:"mapPoint 必须是对象",museumName:a,sceneName:h,fieldName:"地图点位"}):(typeof l.mapPoint.x!="number"&&e.push({code:"INVALID_MAP_POINT_X",path:`${d}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:a,sceneName:h,fieldName:"地图点位 X 坐标"}),typeof l.mapPoint.y!="number"&&e.push({code:"INVALID_MAP_POINT_Y",path:`${d}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:a,sceneName:h,fieldName:"地图点位 Y 坐标"})),!Array.isArray(l.hotspots))e.push({code:"HOTSPOTS_NOT_ARRAY",path:`${d}.hotspots`,message:"hotspots 必须是数组",museumName:a,sceneName:h,fieldName:"热点列表"});else{const f=new Set;l.hotspots.forEach((p,v)=>{const g=`${d}.hotspots[${v}]`;!p.id||typeof p.id!="string"||p.id.trim()===""?e.push({code:"MISSING_HOTSPOT_ID",path:`${g}.id`,message:"id 必须是非空字符串",museumName:a,sceneName:h,fieldName:"热点 ID"}):(f.has(p.id)&&e.push({code:"DUPLICATE_HOTSPOT_ID",path:`${g}.id`,message:`热点 ID "${p.id}" 在场景内重复`,museumName:a,sceneName:h,fieldName:"热点 ID"}),f.add(p.id)),p.type!=="scene"&&p.type!=="video"&&p.type!=="image"&&p.type!=="info"&&e.push({code:"INVALID_HOTSPOT_TYPE",path:`${g}.type`,message:'type 必须是 "scene"、"video"、"image" 或 "info"',museumName:a,sceneName:h,fieldName:"热点类型"}),(!p.label||typeof p.label!="string"||p.label.trim()==="")&&e.push({code:"MISSING_HOTSPOT_LABEL",path:`${g}.label`,message:"label 必须是非空字符串",museumName:a,sceneName:h,fieldName:"热点标签"}),typeof p.yaw!="number"&&e.push({code:"INVALID_HOTSPOT_YAW",path:`${g}.yaw`,message:"yaw 必须是数字",museumName:a,sceneName:h,fieldName:"热点水平角度"}),typeof p.pitch!="number"&&e.push({code:"INVALID_HOTSPOT_PITCH",path:`${g}.pitch`,message:"pitch 必须是数字",museumName:a,sceneName:h,fieldName:"热点垂直角度"}),p.type==="scene"?!p.target||typeof p.target!="object"?e.push({code:"MISSING_HOTSPOT_TARGET",path:`${g}.target`,message:"scene 类型热点必须提供 target 对象",museumName:a,sceneName:h,fieldName:"热点目标配置"}):((!p.target.museumId||typeof p.target.museumId!="string")&&e.push({code:"MISSING_TARGET_MUSEUM_ID",path:`${g}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:a,sceneName:h,fieldName:"目标博物馆 ID"}),typeof p.target.sceneId!="string"&&e.push({code:"MISSING_TARGET_SCENE_ID",path:`${g}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）",museumName:a,sceneName:h,fieldName:"目标场景 ID"}),p.target.yaw!==void 0&&typeof p.target.yaw!="number"&&e.push({code:"INVALID_TARGET_YAW",path:`${g}.target.yaw`,message:"target.yaw 必须是数字",museumName:a,sceneName:h,fieldName:"目标水平角度"}),p.target.pitch!==void 0&&typeof p.target.pitch!="number"&&e.push({code:"INVALID_TARGET_PITCH",path:`${g}.target.pitch`,message:"target.pitch 必须是数字",museumName:a,sceneName:h,fieldName:"目标垂直角度"}),p.target.fov!==void 0&&typeof p.target.fov!="number"&&e.push({code:"INVALID_TARGET_FOV",path:`${g}.target.fov`,message:"target.fov 必须是数字",museumName:a,sceneName:h,fieldName:"目标视野角度"})):p.type==="video"&&p.target&&typeof p.target!="object"&&e.push({code:"MISSING_HOTSPOT_TARGET",path:`${g}.target`,message:"video 类型热点的 target 必须是对象（如果提供）",museumName:a,sceneName:h,fieldName:"热点目标配置"})})}})}}),e}let Cn=null;async function Br(){if(Cn)return Cn;try{const i=await fetch("./config.json",{cache:"no-store"});if(!i.ok)throw new Error(`加载配置失败: ${i.status}`);const e=await i.json(),t=wo(e);if(t.length>0){const n=new Error("配置校验失败");throw n.validationErrors=t,n}return Cn=e,Cn}catch(i){throw console.error("加载配置失败:",i),i}}function Hr(){Cn=null}function Zs(i){if(Cn)return Cn.museums.find(e=>e.id===i)}function Il(i,e){const t=Zs(i);if(t)return t.scenes.find(n=>n.id===e)}function Ao(i){const e=new URL(window.location.href);return e.search="",Object.entries(i).forEach(([t,n])=>{n!=null&&n!==""&&e.searchParams.set(t,String(n))}),e.pathname+e.search+e.hash}function Ll(){return window.location.pathname}function Rl(){if(window.location.pathname.includes("//")){const i=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",i+window.location.search+window.location.hash)}}let Gr=null,Vr=0;const Pl=200;function Nt(i){if(i.type==="focus"){const e=`${i.museumId}:${i.sceneId}`,t=Date.now();if(e===Gr&&t-Vr<Pl)return;Gr=e,Vr=t}window.dispatchEvent(new CustomEvent("vr:scene-focus",{detail:i}))}function wi(i){const e=t=>{i(t.detail)};return window.addEventListener("vr:scene-focus",e),()=>{window.removeEventListener("vr:scene-focus",e)}}function zr(){const i=new URLSearchParams(window.location.search),e=i.get("yaw"),t=i.get("pitch"),n=i.get("fov");return{museumId:i.get("museum")||void 0,sceneId:i.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:t?parseFloat(t):void 0,fov:n?parseFloat(n):void 0}}function Nl(){return new URLSearchParams(window.location.search).get("debug")==="1"}function Dl(){const i=new URLSearchParams(window.location.search);return i.get("editor")==="1"||i.get("debug")==="1"}function Wr(){const i=Ll();window.history.pushState({},"",i),window.dispatchEvent(new Event("popstate"))}function Js(i){const e=Ao({museum:i});window.history.pushState({},"",e),window.dispatchEvent(new Event("popstate"))}function qt(i,e,t){const n=Ao({museum:i,scene:e,yaw:t==null?void 0:t.yaw,pitch:t==null?void 0:t.pitch,fov:t==null?void 0:t.fov});window.history.pushState({},"",n),Nt({type:"focus",museumId:i,sceneId:e,source:"dock",ts:Date.now()}),window.dispatchEvent(new Event("popstate"))}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ur="160",Ug={ROTATE:0,DOLLY:1,PAN:2},Og={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ul=0,Xr=1,Ol=2,Co=1,Fl=2,tn=3,vn=0,At=1,Yt=2,mn=0,ei=1,Yr=2,qr=3,$r=4,kl=5,wn=100,Bl=101,Hl=102,jr=103,Kr=104,Gl=200,Vl=201,zl=202,Wl=203,Qs=204,er=205,Xl=206,Yl=207,ql=208,$l=209,jl=210,Kl=211,Zl=212,Jl=213,Ql=214,ec=0,tc=1,nc=2,ss=3,ic=4,sc=5,rc=6,ac=7,Io=0,oc=1,lc=2,sn=0,cc=1,dc=2,hc=3,Lo=4,uc=5,fc=6,Ro=300,ni=301,ii=302,tr=303,nr=304,ds=306,ir=1e3,Vt=1001,sr=1002,yt=1003,Zr=1004,Es=1005,wt=1006,pc=1007,Rn=1008,gn=1009,mc=1010,gc=1011,fr=1012,Po=1013,fn=1014,pn=1015,Ei=1016,No=1017,Do=1018,In=1020,vc=1021,zt=1023,_c=1024,xc=1025,Ln=1026,si=1027,Ec=1028,Uo=1029,Sc=1030,Oo=1031,Fo=1033,Ss=33776,Ms=33777,bs=33778,ys=33779,Jr=35840,Qr=35841,ea=35842,ta=35843,ko=36196,na=37492,ia=37496,sa=37808,ra=37809,aa=37810,oa=37811,la=37812,ca=37813,da=37814,ha=37815,ua=37816,fa=37817,pa=37818,ma=37819,ga=37820,va=37821,Ts=36492,_a=36494,xa=36495,Mc=36283,Ea=36284,Sa=36285,Ma=36286,Bo=3e3,rn=3001,bc=3200,yc=3201,Ho=0,Tc=1,Ft="",rt="srgb",an="srgb-linear",pr="display-p3",hs="display-p3-linear",rs="linear",Ze="srgb",as="rec709",os="p3",Un=7680,ba=519,wc=512,Ac=513,Cc=514,Go=515,Ic=516,Lc=517,Rc=518,Pc=519,ya=35044,Ta="300 es",rr=1035,nn=2e3,ls=2001;class oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wa=1234567;const vi=Math.PI/180,Si=180/Math.PI;function li(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pt[i&255]+pt[i>>8&255]+pt[i>>16&255]+pt[i>>24&255]+"-"+pt[e&255]+pt[e>>8&255]+"-"+pt[e>>16&15|64]+pt[e>>24&255]+"-"+pt[t&63|128]+pt[t>>8&255]+"-"+pt[t>>16&255]+pt[t>>24&255]+pt[n&255]+pt[n>>8&255]+pt[n>>16&255]+pt[n>>24&255]).toLowerCase()}function gt(i,e,t){return Math.max(e,Math.min(t,i))}function mr(i,e){return(i%e+e)%e}function Nc(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Dc(i,e,t){return i!==e?(t-i)/(e-i):0}function _i(i,e,t){return(1-t)*i+t*e}function Uc(i,e,t,n){return _i(i,e,1-Math.exp(-t*n))}function Oc(i,e=1){return e-Math.abs(mr(i,e*2)-e)}function Fc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function kc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Bc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Hc(i,e){return i+Math.random()*(e-i)}function Gc(i){return i*(.5-Math.random())}function Vc(i){i!==void 0&&(wa=i);let e=wa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zc(i){return i*vi}function Wc(i){return i*Si}function ar(i){return(i&i-1)===0&&i!==0}function Xc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cs(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Yc(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),h=r((e-n)/2),f=a((e-n)/2),p=r((n-e)/2),v=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*h,l*f,o*c);break;case"YZY":i.set(l*f,o*d,l*h,o*c);break;case"ZXZ":i.set(l*h,l*f,o*d,o*c);break;case"XZX":i.set(o*d,l*v,l*p,o*c);break;case"YXY":i.set(l*p,o*d,l*v,o*c);break;case"ZYZ":i.set(l*v,l*p,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Zn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function St(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Pn={DEG2RAD:vi,RAD2DEG:Si,generateUUID:li,clamp:gt,euclideanModulo:mr,mapLinear:Nc,inverseLerp:Dc,lerp:_i,damp:Uc,pingpong:Oc,smoothstep:Fc,smootherstep:kc,randInt:Bc,randFloat:Hc,randFloatSpread:Gc,seededRandom:Vc,degToRad:zc,radToDeg:Wc,isPowerOfTwo:ar,ceilPowerOfTwo:Xc,floorPowerOfTwo:cs,setQuaternionFromProperEuler:Yc,normalize:St,denormalize:Zn};class Ge{constructor(e=0,t=0){Ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Be{constructor(e,t,n,s,r,a,o,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],h=n[7],f=n[2],p=n[5],v=n[8],g=s[0],m=s[3],u=s[6],y=s[1],x=s[4],w=s[7],R=s[2],I=s[5],C=s[8];return r[0]=a*g+o*y+l*R,r[3]=a*m+o*x+l*I,r[6]=a*u+o*w+l*C,r[1]=c*g+d*y+h*R,r[4]=c*m+d*x+h*I,r[7]=c*u+d*w+h*C,r[2]=f*g+p*y+v*R,r[5]=f*m+p*x+v*I,r[8]=f*u+p*w+v*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,f=o*l-d*r,p=c*r-a*l,v=t*h+n*f+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=h*g,e[1]=(s*c-d*n)*g,e[2]=(o*n-s*a)*g,e[3]=f*g,e[4]=(d*t-s*l)*g,e[5]=(s*r-o*t)*g,e[6]=p*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ws.makeScale(e,t)),this}rotate(e){return this.premultiply(ws.makeRotation(-e)),this}translate(e,t){return this.premultiply(ws.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ws=new Be;function Vo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Mi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qc(){const i=Mi("canvas");return i.style.display="block",i}const Aa={};function xi(i){i in Aa||(Aa[i]=!0,console.warn(i))}const Ca=new Be().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ia=new Be().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Pi={[an]:{transfer:rs,primaries:as,toReference:i=>i,fromReference:i=>i},[rt]:{transfer:Ze,primaries:as,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[hs]:{transfer:rs,primaries:os,toReference:i=>i.applyMatrix3(Ia),fromReference:i=>i.applyMatrix3(Ca)},[pr]:{transfer:Ze,primaries:os,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ia),fromReference:i=>i.applyMatrix3(Ca).convertLinearToSRGB()}},$c=new Set([an,hs]),qe={enabled:!0,_workingColorSpace:an,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!$c.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Pi[e].toReference,s=Pi[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Pi[i].primaries},getTransfer:function(i){return i===Ft?rs:Pi[i].transfer}};function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function As(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let On;class zo{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{On===void 0&&(On=Mi("canvas")),On.width=e.width,On.height=e.height;const n=On.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=On}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Mi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ti(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ti(t[n]/255)*255):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jc=0;class Wo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jc++}),this.uuid=li(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Cs(s[a].image)):r.push(Cs(s[a]))}else r=Cs(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Cs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?zo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kc=0;class Tt extends oi{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=Vt,s=Vt,r=wt,a=Rn,o=zt,l=gn,c=Tt.DEFAULT_ANISOTROPY,d=Ft){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kc++}),this.uuid=li(),this.name="",this.source=new Wo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof d=="string"?this.colorSpace=d:(xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=d===rn?rt:Ft),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ro)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ir:e.x=e.x-Math.floor(e.x);break;case Vt:e.x=e.x<0?0:1;break;case sr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ir:e.y=e.y-Math.floor(e.y);break;case Vt:e.y=e.y<0?0:1;break;case sr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===rt?rn:Bo}set encoding(e){xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===rn?rt:Ft}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Ro;Tt.DEFAULT_ANISOTROPY=1;class ut{constructor(e=0,t=0,n=0,s=1){ut.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],p=l[5],v=l[9],g=l[2],m=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-g)<.01&&Math.abs(v-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+g)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,w=(p+1)/2,R=(u+1)/2,I=(d+f)/4,C=(h+g)/4,q=(v+m)/4;return x>w&&x>R?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=I/n,r=C/n):w>R?w<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),n=I/s,r=q/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=C/r,s=q/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-v)*(m-v)+(h-g)*(h-g)+(f-d)*(f-d));return Math.abs(y)<.001&&(y=1),this.x=(m-v)/y,this.y=(h-g)/y,this.z=(f-d)/y,this.w=Math.acos((c+p+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zc extends oi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(xi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===rn?rt:Ft),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Tt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Wo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends Zc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Xo extends Tt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=Vt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jc extends Tt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=yt,this.minFilter=yt,this.wrapR=Vt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ai{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],h=n[s+3];const f=r[a+0],p=r[a+1],v=r[a+2],g=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=v,e[t+3]=g;return}if(h!==g||l!==f||c!==p||d!==v){let m=1-o;const u=l*f+c*p+d*v+h*g,y=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const R=Math.sqrt(x),I=Math.atan2(R,u*y);m=Math.sin(m*I)/R,o=Math.sin(o*I)/R}const w=o*y;if(l=l*m+f*w,c=c*m+p*w,d=d*m+v*w,h=h*m+g*w,m===1-o){const R=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=R,c*=R,d*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],h=r[a],f=r[a+1],p=r[a+2],v=r[a+3];return e[t]=o*v+d*h+l*p-c*f,e[t+1]=l*v+d*f+c*h-o*p,e[t+2]=c*v+d*p+o*f-l*h,e[t+3]=d*v-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),h=o(r/2),f=l(n/2),p=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=f*d*h+c*p*v,this._y=c*p*h-f*d*v,this._z=c*d*v+f*p*h,this._w=c*d*h-f*p*v;break;case"YXZ":this._x=f*d*h+c*p*v,this._y=c*p*h-f*d*v,this._z=c*d*v-f*p*h,this._w=c*d*h+f*p*v;break;case"ZXY":this._x=f*d*h-c*p*v,this._y=c*p*h+f*d*v,this._z=c*d*v+f*p*h,this._w=c*d*h-f*p*v;break;case"ZYX":this._x=f*d*h-c*p*v,this._y=c*p*h+f*d*v,this._z=c*d*v-f*p*h,this._w=c*d*h+f*p*v;break;case"YZX":this._x=f*d*h+c*p*v,this._y=c*p*h+f*d*v,this._z=c*d*v-f*p*h,this._w=c*d*h-f*p*v;break;case"XZY":this._x=f*d*h-c*p*v,this._y=c*p*h-f*d*v,this._z=c*d*v+f*p*h,this._w=c*d*h+f*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],f=n+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-t)*d)/c,f=Math.sin(t*d)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(La.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(La.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*d,this.y=n+l*d+o*c-r*h,this.z=s+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Is.copy(this).projectOnVector(e),this.sub(Is)}reflect(e){return this.sub(Is.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Is=new N,La=new Ai;class Ci{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,kt):kt.fromBufferAttribute(r,a),kt.applyMatrix4(e.matrixWorld),this.expandByPoint(kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ni.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ni.copy(n.boundingBox)),Ni.applyMatrix4(e.matrixWorld),this.union(Ni)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,kt),kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ui),Di.subVectors(this.max,ui),Fn.subVectors(e.a,ui),kn.subVectors(e.b,ui),Bn.subVectors(e.c,ui),ln.subVectors(kn,Fn),cn.subVectors(Bn,kn),En.subVectors(Fn,Bn);let t=[0,-ln.z,ln.y,0,-cn.z,cn.y,0,-En.z,En.y,ln.z,0,-ln.x,cn.z,0,-cn.x,En.z,0,-En.x,-ln.y,ln.x,0,-cn.y,cn.x,0,-En.y,En.x,0];return!Ls(t,Fn,kn,Bn,Di)||(t=[1,0,0,0,1,0,0,0,1],!Ls(t,Fn,kn,Bn,Di))?!1:(Ui.crossVectors(ln,cn),t=[Ui.x,Ui.y,Ui.z],Ls(t,Fn,kn,Bn,Di))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Kt=[new N,new N,new N,new N,new N,new N,new N,new N],kt=new N,Ni=new Ci,Fn=new N,kn=new N,Bn=new N,ln=new N,cn=new N,En=new N,ui=new N,Di=new N,Ui=new N,Sn=new N;function Ls(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Sn.fromArray(i,r);const o=s.x*Math.abs(Sn.x)+s.y*Math.abs(Sn.y)+s.z*Math.abs(Sn.z),l=e.dot(Sn),c=t.dot(Sn),d=n.dot(Sn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Qc=new Ci,fi=new N,Rs=new N;class gr{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Qc.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fi.subVectors(e,this.center);const t=fi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(fi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fi.copy(e.center).add(Rs)),this.expandByPoint(fi.copy(e.center).sub(Rs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Zt=new N,Ps=new N,Oi=new N,dn=new N,Ns=new N,Fi=new N,Ds=new N;class Yo{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Zt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Zt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Zt.copy(this.origin).addScaledVector(this.direction,t),Zt.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ps.copy(e).add(t).multiplyScalar(.5),Oi.copy(t).sub(e).normalize(),dn.copy(this.origin).sub(Ps);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Oi),o=dn.dot(this.direction),l=-dn.dot(Oi),c=dn.lengthSq(),d=Math.abs(1-a*a);let h,f,p,v;if(d>0)if(h=a*l-o,f=a*o-l,v=r*d,h>=0)if(f>=-v)if(f<=v){const g=1/d;h*=g,f*=g,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ps).addScaledVector(Oi,f),p}intersectSphere(e,t){Zt.subVectors(e.center,this.origin);const n=Zt.dot(this.direction),s=Zt.dot(Zt)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),d>=0?(r=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Zt)!==null}intersectTriangle(e,t,n,s,r){Ns.subVectors(t,e),Fi.subVectors(n,e),Ds.crossVectors(Ns,Fi);let a=this.direction.dot(Ds),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;dn.subVectors(this.origin,e);const l=o*this.direction.dot(Fi.crossVectors(dn,Fi));if(l<0)return null;const c=o*this.direction.dot(Ns.cross(dn));if(c<0||l+c>a)return null;const d=-o*dn.dot(Ds);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,s,r,a,o,l,c,d,h,f,p,v,g,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,h,f,p,v,g,m)}set(e,t,n,s,r,a,o,l,c,d,h,f,p,v,g,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=p,u[7]=v,u[11]=g,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Hn.setFromMatrixColumn(e,0).length(),r=1/Hn.setFromMatrixColumn(e,1).length(),a=1/Hn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*d,p=a*h,v=o*d,g=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+v*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=v+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*d,p=l*h,v=c*d,g=c*h;t[0]=f+g*o,t[4]=v*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=p*o-v,t[6]=g+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*d,p=l*h,v=c*d,g=c*h;t[0]=f-g*o,t[4]=-a*h,t[8]=v+p*o,t[1]=p+v*o,t[5]=a*d,t[9]=g-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*d,p=a*h,v=o*d,g=o*h;t[0]=l*d,t[4]=v*c-p,t[8]=f*c+g,t[1]=l*h,t[5]=g*c+f,t[9]=p*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,v=o*l,g=o*c;t[0]=l*d,t[4]=g-f*h,t[8]=v*h+p,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*h+v,t[10]=f-g*h}else if(e.order==="XZY"){const f=a*l,p=a*c,v=o*l,g=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=f*h+g,t[5]=a*d,t[9]=p*h-v,t[2]=v*h-p,t[6]=o*d,t[10]=g*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ed,e,td)}lookAt(e,t,n){const s=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),hn.crossVectors(n,It),hn.lengthSq()===0&&(Math.abs(n.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),hn.crossVectors(n,It)),hn.normalize(),ki.crossVectors(It,hn),s[0]=hn.x,s[4]=ki.x,s[8]=It.x,s[1]=hn.y,s[5]=ki.y,s[9]=It.y,s[2]=hn.z,s[6]=ki.z,s[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],h=n[5],f=n[9],p=n[13],v=n[2],g=n[6],m=n[10],u=n[14],y=n[3],x=n[7],w=n[11],R=n[15],I=s[0],C=s[4],q=s[8],M=s[12],T=s[1],H=s[5],j=s[9],se=s[13],L=s[2],k=s[6],V=s[10],X=s[14],W=s[3],z=s[7],Z=s[11],ee=s[15];return r[0]=a*I+o*T+l*L+c*W,r[4]=a*C+o*H+l*k+c*z,r[8]=a*q+o*j+l*V+c*Z,r[12]=a*M+o*se+l*X+c*ee,r[1]=d*I+h*T+f*L+p*W,r[5]=d*C+h*H+f*k+p*z,r[9]=d*q+h*j+f*V+p*Z,r[13]=d*M+h*se+f*X+p*ee,r[2]=v*I+g*T+m*L+u*W,r[6]=v*C+g*H+m*k+u*z,r[10]=v*q+g*j+m*V+u*Z,r[14]=v*M+g*se+m*X+u*ee,r[3]=y*I+x*T+w*L+R*W,r[7]=y*C+x*H+w*k+R*z,r[11]=y*q+x*j+w*V+R*Z,r[15]=y*M+x*se+w*X+R*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],p=e[14],v=e[3],g=e[7],m=e[11],u=e[15];return v*(+r*l*h-s*c*h-r*o*f+n*c*f+s*o*p-n*l*p)+g*(+t*l*p-t*c*f+r*a*f-s*a*p+s*c*d-r*l*d)+m*(+t*c*h-t*o*p-r*a*h+n*a*p+r*o*d-n*c*d)+u*(-s*o*d-t*l*h+t*o*f+s*a*h-n*a*f+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],p=e[11],v=e[12],g=e[13],m=e[14],u=e[15],y=h*m*c-g*f*c+g*l*p-o*m*p-h*l*u+o*f*u,x=v*f*c-d*m*c-v*l*p+a*m*p+d*l*u-a*f*u,w=d*g*c-v*h*c+v*o*p-a*g*p-d*o*u+a*h*u,R=v*h*l-d*g*l-v*o*f+a*g*f+d*o*m-a*h*m,I=t*y+n*x+s*w+r*R;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/I;return e[0]=y*C,e[1]=(g*f*r-h*m*r-g*s*p+n*m*p+h*s*u-n*f*u)*C,e[2]=(o*m*r-g*l*r+g*s*c-n*m*c-o*s*u+n*l*u)*C,e[3]=(h*l*r-o*f*r-h*s*c+n*f*c+o*s*p-n*l*p)*C,e[4]=x*C,e[5]=(d*m*r-v*f*r+v*s*p-t*m*p-d*s*u+t*f*u)*C,e[6]=(v*l*r-a*m*r-v*s*c+t*m*c+a*s*u-t*l*u)*C,e[7]=(a*f*r-d*l*r+d*s*c-t*f*c-a*s*p+t*l*p)*C,e[8]=w*C,e[9]=(v*h*r-d*g*r-v*n*p+t*g*p+d*n*u-t*h*u)*C,e[10]=(a*g*r-v*o*r+v*n*c-t*g*c-a*n*u+t*o*u)*C,e[11]=(d*o*r-a*h*r-d*n*c+t*h*c+a*n*p-t*o*p)*C,e[12]=R*C,e[13]=(d*g*s-v*h*s+v*n*f-t*g*f-d*n*m+t*h*m)*C,e[14]=(v*o*s-a*g*s-v*n*l+t*g*l+a*n*m-t*o*m)*C,e[15]=(a*h*s-d*o*s+d*n*l-t*h*l-a*n*f+t*o*f)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,f=r*c,p=r*d,v=r*h,g=a*d,m=a*h,u=o*h,y=l*c,x=l*d,w=l*h,R=n.x,I=n.y,C=n.z;return s[0]=(1-(g+u))*R,s[1]=(p+w)*R,s[2]=(v-x)*R,s[3]=0,s[4]=(p-w)*I,s[5]=(1-(f+u))*I,s[6]=(m+y)*I,s[7]=0,s[8]=(v+x)*C,s[9]=(m-y)*C,s[10]=(1-(f+g))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Hn.set(s[0],s[1],s[2]).length();const a=Hn.set(s[4],s[5],s[6]).length(),o=Hn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Bt.copy(this);const c=1/r,d=1/a,h=1/o;return Bt.elements[0]*=c,Bt.elements[1]*=c,Bt.elements[2]*=c,Bt.elements[4]*=d,Bt.elements[5]*=d,Bt.elements[6]*=d,Bt.elements[8]*=h,Bt.elements[9]*=h,Bt.elements[10]*=h,t.setFromRotationMatrix(Bt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=nn){const l=this.elements,c=2*r/(t-e),d=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s);let p,v;if(o===nn)p=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===ls)p=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=nn){const l=this.elements,c=1/(t-e),d=1/(n-s),h=1/(a-r),f=(t+e)*c,p=(n+s)*d;let v,g;if(o===nn)v=(a+r)*h,g=-2*h;else if(o===ls)v=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Hn=new N,Bt=new at,ed=new N(0,0,0),td=new N(1,1,1),hn=new N,ki=new N,It=new N,Ra=new at,Pa=new Ai;class us{constructor(e=0,t=0,n=0,s=us.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],h=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ra.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ra,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pa.setFromEuler(this),this.setFromQuaternion(Pa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}us.DEFAULT_ORDER="XYZ";class vr{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nd=0;const Na=new N,Gn=new Ai,Jt=new at,Bi=new N,pi=new N,id=new N,sd=new Ai,Da=new N(1,0,0),Ua=new N(0,1,0),Oa=new N(0,0,1),rd={type:"added"},ad={type:"removed"};class vt extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new N,t=new us,n=new Ai,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new at},normalMatrix:{value:new Be}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gn.setFromAxisAngle(e,t),this.quaternion.multiply(Gn),this}rotateOnWorldAxis(e,t){return Gn.setFromAxisAngle(e,t),this.quaternion.premultiply(Gn),this}rotateX(e){return this.rotateOnAxis(Da,e)}rotateY(e){return this.rotateOnAxis(Ua,e)}rotateZ(e){return this.rotateOnAxis(Oa,e)}translateOnAxis(e,t){return Na.copy(e).applyQuaternion(this.quaternion),this.position.add(Na.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Da,e)}translateY(e){return this.translateOnAxis(Ua,e)}translateZ(e){return this.translateOnAxis(Oa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Bi.copy(e):Bi.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),pi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jt.lookAt(pi,Bi,this.up):Jt.lookAt(Bi,pi,this.up),this.quaternion.setFromRotationMatrix(Jt),s&&(Jt.extractRotation(s.matrixWorld),Gn.setFromRotationMatrix(Jt),this.quaternion.premultiply(Gn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(rd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ad)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pi,e,id),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pi,sd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new N(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ht=new N,Qt=new N,Us=new N,en=new N,Vn=new N,zn=new N,Fa=new N,Os=new N,Fs=new N,ks=new N;let Hi=!1;class Gt{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ht.subVectors(e,t),s.cross(Ht);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ht.subVectors(s,t),Qt.subVectors(n,t),Us.subVectors(e,t);const a=Ht.dot(Ht),o=Ht.dot(Qt),l=Ht.dot(Us),c=Qt.dot(Qt),d=Qt.dot(Us),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-o*d)*f,v=(a*d-o*l)*f;return r.set(1-p-v,v,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,en)===null?!1:en.x>=0&&en.y>=0&&en.x+en.y<=1}static getUV(e,t,n,s,r,a,o,l){return Hi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Hi=!0),this.getInterpolation(e,t,n,s,r,a,o,l)}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,en)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,en.x),l.addScaledVector(a,en.y),l.addScaledVector(o,en.z),l)}static isFrontFacing(e,t,n,s){return Ht.subVectors(n,t),Qt.subVectors(e,t),Ht.cross(Qt).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ht.subVectors(this.c,this.b),Qt.subVectors(this.a,this.b),Ht.cross(Qt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Hi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Hi=!0),Gt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Gt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Vn.subVectors(s,n),zn.subVectors(r,n),Os.subVectors(e,n);const l=Vn.dot(Os),c=zn.dot(Os);if(l<=0&&c<=0)return t.copy(n);Fs.subVectors(e,s);const d=Vn.dot(Fs),h=zn.dot(Fs);if(d>=0&&h<=d)return t.copy(s);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Vn,a);ks.subVectors(e,r);const p=Vn.dot(ks),v=zn.dot(ks);if(v>=0&&p<=v)return t.copy(r);const g=p*c-l*v;if(g<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(zn,o);const m=d*v-p*h;if(m<=0&&h-d>=0&&p-v>=0)return Fa.subVectors(r,s),o=(h-d)/(h-d+(p-v)),t.copy(s).addScaledVector(Fa,o);const u=1/(m+g+f);return a=g*u,o=f*u,t.copy(n).addScaledVector(Vn,a).addScaledVector(zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const qo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},un={h:0,s:0,l:0},Gi={h:0,s:0,l:0};function Bs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=mr(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Bs(a,r,e+1/3),this.g=Bs(a,r,e),this.b=Bs(a,r,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,t=rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rt){const n=qo[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=As(e.r),this.g=As(e.g),this.b=As(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rt){return qe.fromWorkingColorSpace(mt.copy(this),e),Math.round(gt(mt.r*255,0,255))*65536+Math.round(gt(mt.g*255,0,255))*256+Math.round(gt(mt.b*255,0,255))}getHexString(e=rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(mt.copy(this),t);const n=mt.r,s=mt.g,r=mt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(mt.copy(this),t),e.r=mt.r,e.g=mt.g,e.b=mt.b,e}getStyle(e=rt){qe.fromWorkingColorSpace(mt.copy(this),e);const t=mt.r,n=mt.g,s=mt.b;return e!==rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(un),this.setHSL(un.h+e,un.s+t,un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(un),e.getHSL(Gi);const n=_i(un.h,Gi.h,t),s=_i(un.s,Gi.s,t),r=_i(un.l,Gi.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mt=new ze;ze.NAMES=qo;let od=0;class Ii extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=li(),this.name="",this.type="Material",this.blending=ei,this.side=vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qs,this.blendDst=er,this.blendEquation=wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ba,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Un,this.stencilZFail=Un,this.stencilZPass=Un,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ei&&(n.blending=this.blending),this.side!==vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qs&&(n.blendSrc=this.blendSrc),this.blendDst!==er&&(n.blendDst=this.blendDst),this.blendEquation!==wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ss&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ba&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Un&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Un&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Un&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class bi extends Ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Io,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const st=new N,Vi=new Ge;class $t{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ya,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Vi.fromBufferAttribute(this,t),Vi.applyMatrix3(e),this.setXY(t,Vi.x,Vi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)st.fromBufferAttribute(this,t),st.applyMatrix3(e),this.setXYZ(t,st.x,st.y,st.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)st.fromBufferAttribute(this,t),st.applyMatrix4(e),this.setXYZ(t,st.x,st.y,st.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)st.fromBufferAttribute(this,t),st.applyNormalMatrix(e),this.setXYZ(t,st.x,st.y,st.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)st.fromBufferAttribute(this,t),st.transformDirection(e),this.setXYZ(t,st.x,st.y,st.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Zn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),s=St(s,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ya&&(e.usage=this.usage),e}}class $o extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class jo extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Dt extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}}let ld=0;const Ot=new at,Hs=new vt,Wn=new N,Lt=new Ci,mi=new Ci,ht=new N;class on extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vo(e)?jo:$o)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Be().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ot.makeRotationFromQuaternion(e),this.applyMatrix4(Ot),this}rotateX(e){return Ot.makeRotationX(e),this.applyMatrix4(Ot),this}rotateY(e){return Ot.makeRotationY(e),this.applyMatrix4(Ot),this}rotateZ(e){return Ot.makeRotationZ(e),this.applyMatrix4(Ot),this}translate(e,t,n){return Ot.makeTranslation(e,t,n),this.applyMatrix4(Ot),this}scale(e,t,n){return Ot.makeScale(e,t,n),this.applyMatrix4(Ot),this}lookAt(e){return Hs.lookAt(e),Hs.updateMatrix(),this.applyMatrix4(Hs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wn).negate(),this.translate(Wn.x,Wn.y,Wn.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Dt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Lt.setFromBufferAttribute(r),this.morphTargetsRelative?(ht.addVectors(this.boundingBox.min,Lt.min),this.boundingBox.expandByPoint(ht),ht.addVectors(this.boundingBox.max,Lt.max),this.boundingBox.expandByPoint(ht)):(this.boundingBox.expandByPoint(Lt.min),this.boundingBox.expandByPoint(Lt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Lt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];mi.setFromBufferAttribute(o),this.morphTargetsRelative?(ht.addVectors(Lt.min,mi.min),Lt.expandByPoint(ht),ht.addVectors(Lt.max,mi.max),Lt.expandByPoint(ht)):(Lt.expandByPoint(mi.min),Lt.expandByPoint(mi.max))}Lt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)ht.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(ht));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)ht.fromBufferAttribute(o,c),l&&(Wn.fromBufferAttribute(e,c),ht.add(Wn)),s=Math.max(s,n.distanceToSquared(ht))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],d=[];for(let T=0;T<o;T++)c[T]=new N,d[T]=new N;const h=new N,f=new N,p=new N,v=new Ge,g=new Ge,m=new Ge,u=new N,y=new N;function x(T,H,j){h.fromArray(s,T*3),f.fromArray(s,H*3),p.fromArray(s,j*3),v.fromArray(a,T*2),g.fromArray(a,H*2),m.fromArray(a,j*2),f.sub(h),p.sub(h),g.sub(v),m.sub(v);const se=1/(g.x*m.y-m.x*g.y);isFinite(se)&&(u.copy(f).multiplyScalar(m.y).addScaledVector(p,-g.y).multiplyScalar(se),y.copy(p).multiplyScalar(g.x).addScaledVector(f,-m.x).multiplyScalar(se),c[T].add(u),c[H].add(u),c[j].add(u),d[T].add(y),d[H].add(y),d[j].add(y))}let w=this.groups;w.length===0&&(w=[{start:0,count:n.length}]);for(let T=0,H=w.length;T<H;++T){const j=w[T],se=j.start,L=j.count;for(let k=se,V=se+L;k<V;k+=3)x(n[k+0],n[k+1],n[k+2])}const R=new N,I=new N,C=new N,q=new N;function M(T){C.fromArray(r,T*3),q.copy(C);const H=c[T];R.copy(H),R.sub(C.multiplyScalar(C.dot(H))).normalize(),I.crossVectors(q,H);const se=I.dot(d[T])<0?-1:1;l[T*4]=R.x,l[T*4+1]=R.y,l[T*4+2]=R.z,l[T*4+3]=se}for(let T=0,H=w.length;T<H;++T){const j=w[T],se=j.start,L=j.count;for(let k=se,V=se+L;k<V;k+=3)M(n[k+0]),M(n[k+1]),M(n[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,d=new N,h=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){const v=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),n.setXYZ(f+0,d.x,d.y,d.z),n.setXYZ(f+1,d.x,d.y,d.z),n.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ht.fromBufferAttribute(e,t),ht.normalize(),e.setXYZ(t,ht.x,ht.y,ht.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,f=new c.constructor(l.length*d);let p=0,v=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*d;for(let u=0;u<d;u++)f[v++]=c[p++]}return new $t(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new on,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=e(f,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let f=0,p=h.length;f<p;f++)d.push(h[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ka=new at,Mn=new Yo,zi=new gr,Ba=new N,Xn=new N,Yn=new N,qn=new N,Gs=new N,Wi=new N,Xi=new Ge,Yi=new Ge,qi=new Ge,Ha=new N,Ga=new N,Va=new N,$i=new N,ji=new N;class Pt extends vt{constructor(e=new on,t=new bi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Wi.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(Gs.fromBufferAttribute(h,e),a?Wi.addScaledVector(Gs,d):Wi.addScaledVector(Gs.sub(t),d))}t.add(Wi)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zi.copy(n.boundingSphere),zi.applyMatrix4(r),Mn.copy(e.ray).recast(e.near),!(zi.containsPoint(Mn.origin)===!1&&(Mn.intersectSphere(zi,Ba)===null||Mn.origin.distanceToSquared(Ba)>(e.far-e.near)**2))&&(ka.copy(r).invert(),Mn.copy(e.ray).applyMatrix4(ka),!(n.boundingBox!==null&&Mn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Mn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,g=f.length;v<g;v++){const m=f[v],u=a[m.materialIndex],y=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let w=y,R=x;w<R;w+=3){const I=o.getX(w),C=o.getX(w+1),q=o.getX(w+2);s=Ki(this,u,e,n,c,d,h,I,C,q),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=v,u=g;m<u;m+=3){const y=o.getX(m),x=o.getX(m+1),w=o.getX(m+2);s=Ki(this,a,e,n,c,d,h,y,x,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,g=f.length;v<g;v++){const m=f[v],u=a[m.materialIndex],y=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let w=y,R=x;w<R;w+=3){const I=w,C=w+1,q=w+2;s=Ki(this,u,e,n,c,d,h,I,C,q),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=v,u=g;m<u;m+=3){const y=m,x=m+1,w=m+2;s=Ki(this,a,e,n,c,d,h,y,x,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function cd(i,e,t,n,s,r,a,o){let l;if(e.side===At?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===vn,o),l===null)return null;ji.copy(o),ji.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ji);return c<t.near||c>t.far?null:{distance:c,point:ji.clone(),object:i}}function Ki(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Xn),i.getVertexPosition(l,Yn),i.getVertexPosition(c,qn);const d=cd(i,e,t,n,Xn,Yn,qn,$i);if(d){s&&(Xi.fromBufferAttribute(s,o),Yi.fromBufferAttribute(s,l),qi.fromBufferAttribute(s,c),d.uv=Gt.getInterpolation($i,Xn,Yn,qn,Xi,Yi,qi,new Ge)),r&&(Xi.fromBufferAttribute(r,o),Yi.fromBufferAttribute(r,l),qi.fromBufferAttribute(r,c),d.uv1=Gt.getInterpolation($i,Xn,Yn,qn,Xi,Yi,qi,new Ge),d.uv2=d.uv1),a&&(Ha.fromBufferAttribute(a,o),Ga.fromBufferAttribute(a,l),Va.fromBufferAttribute(a,c),d.normal=Gt.getInterpolation($i,Xn,Yn,qn,Ha,Ga,Va,new N),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new N,materialIndex:0};Gt.getNormal(Xn,Yn,qn,h.normal),d.face=h}return d}class ci extends on{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let f=0,p=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(d,3)),this.setAttribute("uv",new Dt(h,2));function v(g,m,u,y,x,w,R,I,C,q,M){const T=w/C,H=R/q,j=w/2,se=R/2,L=I/2,k=C+1,V=q+1;let X=0,W=0;const z=new N;for(let Z=0;Z<V;Z++){const ee=Z*H-se;for(let de=0;de<k;de++){const G=de*T-j;z[g]=G*y,z[m]=ee*x,z[u]=L,c.push(z.x,z.y,z.z),z[g]=0,z[m]=0,z[u]=I>0?1:-1,d.push(z.x,z.y,z.z),h.push(de/C),h.push(1-Z/q),X+=1}}for(let Z=0;Z<q;Z++)for(let ee=0;ee<C;ee++){const de=f+ee+k*Z,G=f+ee+k*(Z+1),Y=f+(ee+1)+k*(Z+1),le=f+(ee+1)+k*Z;l.push(de,G,le),l.push(G,Y,le),W+=6}o.addGroup(p,W,M),p+=W,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ri(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Mt(i){const e={};for(let t=0;t<i.length;t++){const n=ri(i[t]);for(const s in n)e[s]=n[s]}return e}function dd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ko(i){return i.getRenderTarget()===null?i.outputColorSpace:qe.workingColorSpace}const hd={clone:ri,merge:Mt};var ud=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends Ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ud,this.fragmentShader=fd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ri(e.uniforms),this.uniformsGroups=dd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Zo extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=nn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Rt extends Zo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Si*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Si*2*Math.atan(Math.tan(vi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $n=-90,jn=1;class pd extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rt($n,jn,e,t);s.layers=this.layers,this.add(s);const r=new Rt($n,jn,e,t);r.layers=this.layers,this.add(r);const a=new Rt($n,jn,e,t);a.layers=this.layers,this.add(a);const o=new Rt($n,jn,e,t);o.layers=this.layers,this.add(o);const l=new Rt($n,jn,e,t);l.layers=this.layers,this.add(l);const c=new Rt($n,jn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),e.render(t,d),e.setRenderTarget(h,f,p),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Jo extends Tt{constructor(e,t,n,s,r,a,o,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:ni,super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class md extends Nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(xi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===rn?rt:Ft),this.texture=new Jo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:wt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ci(5,5,5),r=new Dn({name:"CubemapFromEquirect",uniforms:ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:At,blending:mn});r.uniforms.tEquirect.value=t;const a=new Pt(s,r),o=t.minFilter;return t.minFilter===Rn&&(t.minFilter=wt),new pd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Vs=new N,gd=new N,vd=new Be;class yn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Vs.subVectors(n,t).cross(gd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Vs),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vd.getNormalMatrix(e),s=this.coplanarPoint(Vs).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const bn=new gr,Zi=new N;class _r{constructor(e=new yn,t=new yn,n=new yn,s=new yn,r=new yn,a=new yn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=nn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],h=s[6],f=s[7],p=s[8],v=s[9],g=s[10],m=s[11],u=s[12],y=s[13],x=s[14],w=s[15];if(n[0].setComponents(l-r,f-c,m-p,w-u).normalize(),n[1].setComponents(l+r,f+c,m+p,w+u).normalize(),n[2].setComponents(l+a,f+d,m+v,w+y).normalize(),n[3].setComponents(l-a,f-d,m-v,w-y).normalize(),n[4].setComponents(l-o,f-h,m-g,w-x).normalize(),t===nn)n[5].setComponents(l+o,f+h,m+g,w+x).normalize();else if(t===ls)n[5].setComponents(o,h,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bn)}intersectsSprite(e){return bn.center.set(0,0,0),bn.radius=.7071067811865476,bn.applyMatrix4(e.matrixWorld),this.intersectsSphere(bn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Zi.x=s.normal.x>0?e.max.x:e.min.x,Zi.y=s.normal.y>0?e.max.y:e.min.y,Zi.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Zi)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Qo(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function _d(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,d){const h=c.array,f=c.usage,p=h.byteLength,v=i.createBuffer();i.bindBuffer(d,v),i.bufferData(d,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=i.SHORT;else if(h instanceof Uint32Array)g=i.UNSIGNED_INT;else if(h instanceof Int32Array)g=i.INT;else if(h instanceof Int8Array)g=i.BYTE;else if(h instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,d,h){const f=d.array,p=d._updateRange,v=d.updateRanges;if(i.bindBuffer(h,c),p.count===-1&&v.length===0&&i.bufferSubData(h,0,f),v.length!==0){for(let g=0,m=v.length;g<m;g++){const u=v[g];t?i.bufferSubData(h,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):i.bufferSubData(h,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}d.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),d.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);d&&(i.deleteBuffer(d.buffer),n.delete(c))}function l(c,d){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,s(c,d));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,d),h.version=c.version}}return{get:a,remove:o,update:l}}class xr extends on{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,h=e/o,f=t/l,p=[],v=[],g=[],m=[];for(let u=0;u<d;u++){const y=u*f-a;for(let x=0;x<c;x++){const w=x*h-r;v.push(w,-y,0),g.push(0,0,1),m.push(x/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let y=0;y<o;y++){const x=y+c*u,w=y+c*(u+1),R=y+1+c*(u+1),I=y+1+c*u;p.push(x,w,I),p.push(w,R,I)}this.setIndex(p),this.setAttribute("position",new Dt(v,3)),this.setAttribute("normal",new Dt(g,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.width,e.height,e.widthSegments,e.heightSegments)}}var xd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ed=`#ifdef USE_ALPHAHASH
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
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Md=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,yd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Td=`#ifdef USE_AOMAP
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
#endif`,wd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ad=`#ifdef USE_BATCHING
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
#endif`,Cd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ld=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pd=`#ifdef USE_IRIDESCENCE
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
#endif`,Nd=`#ifdef USE_BUMPMAP
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
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Vd=`#define PI 3.141592653589793
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
} // validated`,zd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Wd=`vec3 transformedNormal = objectNormal;
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
#endif`,Xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kd=`
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
}`,Zd=`#ifdef USE_ENVMAP
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
#endif`,Jd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qd=`#ifdef USE_ENVMAP
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
#endif`,eh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,th=`#ifdef USE_ENVMAP
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
#endif`,nh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ih=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ah=`#ifdef USE_GRADIENTMAP
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
}`,oh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,lh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ch=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hh=`uniform bool receiveShadow;
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
#endif`,uh=`#ifdef USE_ENVMAP
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
#endif`,fh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ph=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vh=`PhysicalMaterial material;
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
#endif`,_h=`struct PhysicalMaterial {
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
}`,xh=`
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
#endif`,Eh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bh=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yh=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Th=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,wh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ah=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ch=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ih=`#if defined( USE_POINTS_UV )
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
#endif`,Lh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ph=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nh=`#ifdef USE_MORPHNORMALS
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
#endif`,Dh=`#ifdef USE_MORPHTARGETS
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
#endif`,Uh=`#ifdef USE_MORPHTARGETS
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
#endif`,Oh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gh=`#ifdef USE_NORMALMAP
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
#endif`,Vh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$h=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,iu=`float getShadowMask() {
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
}`,su=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ru=`#ifdef USE_SKINNING
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
#endif`,au=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ou=`#ifdef USE_SKINNING
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
#endif`,lu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,du=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,uu=`#ifdef USE_TRANSMISSION
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
#endif`,fu=`#ifdef USE_TRANSMISSION
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
#endif`,pu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _u=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xu=`uniform sampler2D t2D;
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
}`,Eu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Su=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Mu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yu=`#include <common>
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
}`,Tu=`#if DEPTH_PACKING == 3200
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
}`,wu=`#define DISTANCE
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
}`,Au=`#define DISTANCE
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
}`,Cu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Iu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lu=`uniform float scale;
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
}`,Ru=`uniform vec3 diffuse;
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
}`,Pu=`#include <common>
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
}`,Nu=`uniform vec3 diffuse;
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
}`,Du=`#define LAMBERT
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
}`,Uu=`#define LAMBERT
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
}`,Ou=`#define MATCAP
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
}`,Fu=`#define MATCAP
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
}`,ku=`#define NORMAL
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
}`,Bu=`#define NORMAL
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
}`,Hu=`#define PHONG
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
}`,Gu=`#define PHONG
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
}`,Vu=`#define STANDARD
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
}`,zu=`#define STANDARD
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
}`,Wu=`#define TOON
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
}`,Xu=`#define TOON
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
}`,Yu=`uniform float size;
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
}`,qu=`uniform vec3 diffuse;
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
}`,$u=`#include <common>
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
}`,ju=`uniform vec3 color;
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
}`,Ku=`uniform float rotation;
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
}`,Zu=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:xd,alphahash_pars_fragment:Ed,alphamap_fragment:Sd,alphamap_pars_fragment:Md,alphatest_fragment:bd,alphatest_pars_fragment:yd,aomap_fragment:Td,aomap_pars_fragment:wd,batching_pars_vertex:Ad,batching_vertex:Cd,begin_vertex:Id,beginnormal_vertex:Ld,bsdfs:Rd,iridescence_fragment:Pd,bumpmap_pars_fragment:Nd,clipping_planes_fragment:Dd,clipping_planes_pars_fragment:Ud,clipping_planes_pars_vertex:Od,clipping_planes_vertex:Fd,color_fragment:kd,color_pars_fragment:Bd,color_pars_vertex:Hd,color_vertex:Gd,common:Vd,cube_uv_reflection_fragment:zd,defaultnormal_vertex:Wd,displacementmap_pars_vertex:Xd,displacementmap_vertex:Yd,emissivemap_fragment:qd,emissivemap_pars_fragment:$d,colorspace_fragment:jd,colorspace_pars_fragment:Kd,envmap_fragment:Zd,envmap_common_pars_fragment:Jd,envmap_pars_fragment:Qd,envmap_pars_vertex:eh,envmap_physical_pars_fragment:uh,envmap_vertex:th,fog_vertex:nh,fog_pars_vertex:ih,fog_fragment:sh,fog_pars_fragment:rh,gradientmap_pars_fragment:ah,lightmap_fragment:oh,lightmap_pars_fragment:lh,lights_lambert_fragment:ch,lights_lambert_pars_fragment:dh,lights_pars_begin:hh,lights_toon_fragment:fh,lights_toon_pars_fragment:ph,lights_phong_fragment:mh,lights_phong_pars_fragment:gh,lights_physical_fragment:vh,lights_physical_pars_fragment:_h,lights_fragment_begin:xh,lights_fragment_maps:Eh,lights_fragment_end:Sh,logdepthbuf_fragment:Mh,logdepthbuf_pars_fragment:bh,logdepthbuf_pars_vertex:yh,logdepthbuf_vertex:Th,map_fragment:wh,map_pars_fragment:Ah,map_particle_fragment:Ch,map_particle_pars_fragment:Ih,metalnessmap_fragment:Lh,metalnessmap_pars_fragment:Rh,morphcolor_vertex:Ph,morphnormal_vertex:Nh,morphtarget_pars_vertex:Dh,morphtarget_vertex:Uh,normal_fragment_begin:Oh,normal_fragment_maps:Fh,normal_pars_fragment:kh,normal_pars_vertex:Bh,normal_vertex:Hh,normalmap_pars_fragment:Gh,clearcoat_normal_fragment_begin:Vh,clearcoat_normal_fragment_maps:zh,clearcoat_pars_fragment:Wh,iridescence_pars_fragment:Xh,opaque_fragment:Yh,packing:qh,premultiplied_alpha_fragment:$h,project_vertex:jh,dithering_fragment:Kh,dithering_pars_fragment:Zh,roughnessmap_fragment:Jh,roughnessmap_pars_fragment:Qh,shadowmap_pars_fragment:eu,shadowmap_pars_vertex:tu,shadowmap_vertex:nu,shadowmask_pars_fragment:iu,skinbase_vertex:su,skinning_pars_vertex:ru,skinning_vertex:au,skinnormal_vertex:ou,specularmap_fragment:lu,specularmap_pars_fragment:cu,tonemapping_fragment:du,tonemapping_pars_fragment:hu,transmission_fragment:uu,transmission_pars_fragment:fu,uv_pars_fragment:pu,uv_pars_vertex:mu,uv_vertex:gu,worldpos_vertex:vu,background_vert:_u,background_frag:xu,backgroundCube_vert:Eu,backgroundCube_frag:Su,cube_vert:Mu,cube_frag:bu,depth_vert:yu,depth_frag:Tu,distanceRGBA_vert:wu,distanceRGBA_frag:Au,equirect_vert:Cu,equirect_frag:Iu,linedashed_vert:Lu,linedashed_frag:Ru,meshbasic_vert:Pu,meshbasic_frag:Nu,meshlambert_vert:Du,meshlambert_frag:Uu,meshmatcap_vert:Ou,meshmatcap_frag:Fu,meshnormal_vert:ku,meshnormal_frag:Bu,meshphong_vert:Hu,meshphong_frag:Gu,meshphysical_vert:Vu,meshphysical_frag:zu,meshtoon_vert:Wu,meshtoon_frag:Xu,points_vert:Yu,points_frag:qu,shadow_vert:$u,shadow_frag:ju,sprite_vert:Ku,sprite_frag:Zu},ie={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},Xt={basic:{uniforms:Mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:Mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:Mt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:Mt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:Mt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:Mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:Mt([ie.points,ie.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:Mt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:Mt([ie.common,ie.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:Mt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:Mt([ie.sprite,ie.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:Mt([ie.common,ie.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:Mt([ie.lights,ie.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Xt.physical={uniforms:Mt([Xt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Ji={r:0,b:0,g:0};function Ju(i,e,t,n,s,r,a){const o=new ze(0);let l=r===!0?0:1,c,d,h=null,f=0,p=null;function v(m,u){let y=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?t:e).get(x)),x===null?g(o,l):x&&x.isColor&&(g(x,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ds)?(d===void 0&&(d=new Pt(new ci(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:ri(Xt.backgroundCube.uniforms),vertexShader:Xt.backgroundCube.vertexShader,fragmentShader:Xt.backgroundCube.fragmentShader,side:At,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,I,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,d.material.toneMapped=qe.getTransfer(x.colorSpace)!==Ze,(h!==x||f!==x.version||p!==i.toneMapping)&&(d.material.needsUpdate=!0,h=x,f=x.version,p=i.toneMapping),d.layers.enableAll(),m.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Pt(new xr(2,2),new Dn({name:"BackgroundMaterial",uniforms:ri(Xt.background.uniforms),vertexShader:Xt.background.vertexShader,fragmentShader:Xt.background.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=qe.getTransfer(x.colorSpace)!==Ze,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,f=x.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function g(m,u){m.getRGB(Ji,Ko(i)),n.buffers.color.setClear(Ji.r,Ji.g,Ji.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(m,u=1){o.set(m),l=u,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,g(o,l)},render:v}}function Qu(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null);let c=l,d=!1;function h(L,k,V,X,W){let z=!1;if(a){const Z=g(X,V,k);c!==Z&&(c=Z,p(c.object)),z=u(L,X,V,W),z&&y(L,X,V,W)}else{const Z=k.wireframe===!0;(c.geometry!==X.id||c.program!==V.id||c.wireframe!==Z)&&(c.geometry=X.id,c.program=V.id,c.wireframe=Z,z=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(z||d)&&(d=!1,q(L,k,V,X),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function p(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function v(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function g(L,k,V){const X=V.wireframe===!0;let W=o[L.id];W===void 0&&(W={},o[L.id]=W);let z=W[k.id];z===void 0&&(z={},W[k.id]=z);let Z=z[X];return Z===void 0&&(Z=m(f()),z[X]=Z),Z}function m(L){const k=[],V=[],X=[];for(let W=0;W<s;W++)k[W]=0,V[W]=0,X[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:X,object:L,attributes:{},index:null}}function u(L,k,V,X){const W=c.attributes,z=k.attributes;let Z=0;const ee=V.getAttributes();for(const de in ee)if(ee[de].location>=0){const Y=W[de];let le=z[de];if(le===void 0&&(de==="instanceMatrix"&&L.instanceMatrix&&(le=L.instanceMatrix),de==="instanceColor"&&L.instanceColor&&(le=L.instanceColor)),Y===void 0||Y.attribute!==le||le&&Y.data!==le.data)return!0;Z++}return c.attributesNum!==Z||c.index!==X}function y(L,k,V,X){const W={},z=k.attributes;let Z=0;const ee=V.getAttributes();for(const de in ee)if(ee[de].location>=0){let Y=z[de];Y===void 0&&(de==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),de==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor));const le={};le.attribute=Y,Y&&Y.data&&(le.data=Y.data),W[de]=le,Z++}c.attributes=W,c.attributesNum=Z,c.index=X}function x(){const L=c.newAttributes;for(let k=0,V=L.length;k<V;k++)L[k]=0}function w(L){R(L,0)}function R(L,k){const V=c.newAttributes,X=c.enabledAttributes,W=c.attributeDivisors;V[L]=1,X[L]===0&&(i.enableVertexAttribArray(L),X[L]=1),W[L]!==k&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,k),W[L]=k)}function I(){const L=c.newAttributes,k=c.enabledAttributes;for(let V=0,X=k.length;V<X;V++)k[V]!==L[V]&&(i.disableVertexAttribArray(V),k[V]=0)}function C(L,k,V,X,W,z,Z){Z===!0?i.vertexAttribIPointer(L,k,V,W,z):i.vertexAttribPointer(L,k,V,X,W,z)}function q(L,k,V,X){if(n.isWebGL2===!1&&(L.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=X.attributes,z=V.getAttributes(),Z=k.defaultAttributeValues;for(const ee in z){const de=z[ee];if(de.location>=0){let G=W[ee];if(G===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(G=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(G=L.instanceColor)),G!==void 0){const Y=G.normalized,le=G.itemSize,ve=t.get(G);if(ve===void 0)continue;const ge=ve.buffer,Ie=ve.type,Re=ve.bytesPerElement,be=n.isWebGL2===!0&&(Ie===i.INT||Ie===i.UNSIGNED_INT||G.gpuType===Po);if(G.isInterleavedBufferAttribute){const Ve=G.data,D=Ve.stride,_t=G.offset;if(Ve.isInstancedInterleavedBuffer){for(let xe=0;xe<de.locationSize;xe++)R(de.location+xe,Ve.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Ve.meshPerAttribute*Ve.count)}else for(let xe=0;xe<de.locationSize;xe++)w(de.location+xe);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let xe=0;xe<de.locationSize;xe++)C(de.location+xe,le/de.locationSize,Ie,Y,D*Re,(_t+le/de.locationSize*xe)*Re,be)}else{if(G.isInstancedBufferAttribute){for(let Ve=0;Ve<de.locationSize;Ve++)R(de.location+Ve,G.meshPerAttribute);L.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Ve=0;Ve<de.locationSize;Ve++)w(de.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,ge);for(let Ve=0;Ve<de.locationSize;Ve++)C(de.location+Ve,le/de.locationSize,Ie,Y,le*Re,le/de.locationSize*Ve*Re,be)}}else if(Z!==void 0){const Y=Z[ee];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(de.location,Y);break;case 3:i.vertexAttrib3fv(de.location,Y);break;case 4:i.vertexAttrib4fv(de.location,Y);break;default:i.vertexAttrib1fv(de.location,Y)}}}}I()}function M(){j();for(const L in o){const k=o[L];for(const V in k){const X=k[V];for(const W in X)v(X[W].object),delete X[W];delete k[V]}delete o[L]}}function T(L){if(o[L.id]===void 0)return;const k=o[L.id];for(const V in k){const X=k[V];for(const W in X)v(X[W].object),delete X[W];delete k[V]}delete o[L.id]}function H(L){for(const k in o){const V=o[k];if(V[L.id]===void 0)continue;const X=V[L.id];for(const W in X)v(X[W].object),delete X[W];delete V[L.id]}}function j(){se(),d=!0,c!==l&&(c=l,p(c.object))}function se(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:j,resetDefaultState:se,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:H,initAttributes:x,enableAttribute:w,disableUnusedAttributes:I}}function ef(i,e,t,n){const s=n.isWebGL2;let r;function a(d){r=d}function o(d,h){i.drawArrays(r,d,h),t.update(h,r,1)}function l(d,h,f){if(f===0)return;let p,v;if(s)p=i,v="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[v](r,d,h,f),t.update(h,r,f)}function c(d,h,f){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<f;v++)this.render(d[v],h[v]);else{p.multiDrawArraysWEBGL(r,d,0,h,0,f);let v=0;for(let g=0;g<f;g++)v+=h[g];t.update(v,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function tf(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),d=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,w=a||e.has("OES_texture_float"),R=x&&w,I=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:d,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:v,maxAttributes:g,maxVertexUniforms:m,maxVaryings:u,maxFragmentUniforms:y,vertexTextures:x,floatFragmentTextures:w,floatVertexTextures:R,maxSamples:I}}function nf(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new yn,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||s;return s=f,n=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=d(h,f,0)},this.setState=function(h,f,p){const v=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,u=i.get(h);if(!s||v===null||v.length===0||r&&!m)r?d(null):c();else{const y=r?0:n,x=y*4;let w=u.clippingState||null;l.value=w,w=d(v,f,x,p);for(let R=0;R!==x;++R)w[R]=t[R];u.clippingState=w,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,f,p,v){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=l.value,v!==!0||m===null){const u=p+g*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<u)&&(m=new Float32Array(u));for(let x=0,w=p;x!==g;++x,w+=4)a.copy(h[x]).applyMatrix4(y,o),a.normal.toArray(m,w),m[w+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function sf(i){let e=new WeakMap;function t(a,o){return o===tr?a.mapping=ni:o===nr&&(a.mapping=ii),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===tr||o===nr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new md(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class el extends Zo{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Jn=4,za=[.125,.215,.35,.446,.526,.582],An=20,zs=new el,Wa=new ze;let Ws=null,Xs=0,Ys=0;const Tn=(1+Math.sqrt(5))/2,Kn=1/Tn,Xa=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,Tn,Kn),new N(0,Tn,-Kn),new N(Kn,0,Tn),new N(-Kn,0,Tn),new N(Tn,Kn,0),new N(-Tn,Kn,0)];class Ya{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ws=this._renderer.getRenderTarget(),Xs=this._renderer.getActiveCubeFace(),Ys=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ja(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$a(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ws,Xs,Ys),e.scissorTest=!1,Qi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ni||e.mapping===ii?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ws=this._renderer.getRenderTarget(),Xs=this._renderer.getActiveCubeFace(),Ys=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Ei,format:zt,colorSpace:an,depthBuffer:!1},s=qa(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qa(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rf(r)),this._blurMaterial=af(r,e,t)}return s}_compileMaterial(e){const t=new Pt(this._lodPlanes[0],e);this._renderer.compile(t,zs)}_sceneToCubeUV(e,t,n,s){const o=new Rt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Wa),d.toneMapping=sn,d.autoClear=!1;const p=new bi({name:"PMREM.Background",side:At,depthWrite:!1,depthTest:!1}),v=new Pt(new ci,p);let g=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,g=!0):(p.color.copy(Wa),g=!0);for(let u=0;u<6;u++){const y=u%3;y===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):y===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const x=this._cubeSize;Qi(s,y*x,u>2?x:0,x,x),d.setRenderTarget(s),g&&d.render(v,o),d.render(e,o)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ni||e.mapping===ii;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ja()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$a());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Pt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Qi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,zs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Xa[(s-1)%Xa.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Pt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*An-1),g=r/v,m=isFinite(r)?1+Math.floor(d*g):An;m>An&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${An}`);const u=[];let y=0;for(let C=0;C<An;++C){const q=C/g,M=Math.exp(-q*q/2);u.push(M),C===0?y+=M:C<m&&(y+=2*M)}for(let C=0;C<u.length;C++)u[C]=u[C]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=v,f.mipInt.value=x-n;const w=this._sizeLods[s],R=3*w*(s>x-Jn?s-x+Jn:0),I=4*(this._cubeSize-w);Qi(t,R,I,3*w,2*w),l.setRenderTarget(t),l.render(h,zs)}}function rf(i){const e=[],t=[],n=[];let s=i;const r=i-Jn+1+za.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Jn?l=za[a-i+Jn-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,v=6,g=3,m=2,u=1,y=new Float32Array(g*v*p),x=new Float32Array(m*v*p),w=new Float32Array(u*v*p);for(let I=0;I<p;I++){const C=I%3*2/3-1,q=I>2?0:-1,M=[C,q,0,C+2/3,q,0,C+2/3,q+1,0,C,q,0,C+2/3,q+1,0,C,q+1,0];y.set(M,g*v*I),x.set(f,m*v*I);const T=[I,I,I,I,I,I];w.set(T,u*v*I)}const R=new on;R.setAttribute("position",new $t(y,g)),R.setAttribute("uv",new $t(x,m)),R.setAttribute("faceIndex",new $t(w,u)),e.push(R),s>Jn&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qa(i,e,t){const n=new Nn(i,e,t);return n.texture.mapping=ds,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qi(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function af(i,e,t){const n=new Float32Array(An),s=new N(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:An,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Er(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function $a(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Er(),fragmentShader:`

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
		`,blending:mn,depthTest:!1,depthWrite:!1})}function ja(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Er(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mn,depthTest:!1,depthWrite:!1})}function Er(){return`

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
	`}function of(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===tr||l===nr,d=l===ni||l===ii;if(c||d)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Ya(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||d&&h&&s(h)){t===null&&(t=new Ya(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function lf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function cf(i,e,t,n){const s={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);for(const v in f.morphAttributes){const g=f.morphAttributes[v];for(let m=0,u=g.length;m<u;m++)e.remove(g[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const v in f)e.update(f[v],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const v in p){const g=p[v];for(let m=0,u=g.length;m<u;m++)e.update(g[m],i.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,v=h.attributes.position;let g=0;if(p!==null){const y=p.array;g=p.version;for(let x=0,w=y.length;x<w;x+=3){const R=y[x+0],I=y[x+1],C=y[x+2];f.push(R,I,I,C,C,R)}}else if(v!==void 0){const y=v.array;g=v.version;for(let x=0,w=y.length/3-1;x<w;x+=3){const R=x+0,I=x+1,C=x+2;f.push(R,I,I,C,C,R)}}else return;const m=new(Vo(f)?jo:$o)(f,1);m.version=g;const u=r.get(h);u&&e.remove(u),r.set(h,m)}function d(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function df(i,e,t,n){const s=n.isWebGL2;let r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function d(p,v){i.drawElements(r,v,o,p*l),t.update(v,r,1)}function h(p,v,g){if(g===0)return;let m,u;if(s)m=i,u="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[u](r,v,o,p*l,g),t.update(v,r,g)}function f(p,v,g){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<g;u++)this.render(p[u]/l,v[u]);else{m.multiDrawElementsWEBGL(r,v,0,o,p,0,g);let u=0;for(let y=0;y<g;y++)u+=v[y];t.update(u,r,1)}}this.setMode=a,this.setIndex=c,this.render=d,this.renderInstances=h,this.renderMultiDraw=f}function hf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function uf(i,e){return i[0]-e[0]}function ff(i,e){return Math.abs(e[1])-Math.abs(i[1])}function pf(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new ut,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,d,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=p!==void 0?p.length:0;let g=r.get(d);if(g===void 0||g.count!==v){let L=function(){j.dispose(),r.delete(d),d.removeEventListener("dispose",L)};g!==void 0&&g.texture.dispose();const y=d.morphAttributes.position!==void 0,x=d.morphAttributes.normal!==void 0,w=d.morphAttributes.color!==void 0,R=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],C=d.morphAttributes.color||[];let q=0;y===!0&&(q=1),x===!0&&(q=2),w===!0&&(q=3);let M=d.attributes.position.count*q,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const H=new Float32Array(M*T*4*v),j=new Xo(H,M,T,v);j.type=pn,j.needsUpdate=!0;const se=q*4;for(let k=0;k<v;k++){const V=R[k],X=I[k],W=C[k],z=M*T*4*k;for(let Z=0;Z<V.count;Z++){const ee=Z*se;y===!0&&(a.fromBufferAttribute(V,Z),H[z+ee+0]=a.x,H[z+ee+1]=a.y,H[z+ee+2]=a.z,H[z+ee+3]=0),x===!0&&(a.fromBufferAttribute(X,Z),H[z+ee+4]=a.x,H[z+ee+5]=a.y,H[z+ee+6]=a.z,H[z+ee+7]=0),w===!0&&(a.fromBufferAttribute(W,Z),H[z+ee+8]=a.x,H[z+ee+9]=a.y,H[z+ee+10]=a.z,H[z+ee+11]=W.itemSize===4?a.w:1)}}g={count:v,texture:j,size:new Ge(M,T)},r.set(d,g),d.addEventListener("dispose",L)}let m=0;for(let y=0;y<f.length;y++)m+=f[y];const u=d.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",u),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",g.size)}else{const p=f===void 0?0:f.length;let v=n[d.id];if(v===void 0||v.length!==p){v=[];for(let x=0;x<p;x++)v[x]=[x,0];n[d.id]=v}for(let x=0;x<p;x++){const w=v[x];w[0]=x,w[1]=f[x]}v.sort(ff);for(let x=0;x<8;x++)x<p&&v[x][1]?(o[x][0]=v[x][0],o[x][1]=v[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(uf);const g=d.morphAttributes.position,m=d.morphAttributes.normal;let u=0;for(let x=0;x<8;x++){const w=o[x],R=w[0],I=w[1];R!==Number.MAX_SAFE_INTEGER&&I?(g&&d.getAttribute("morphTarget"+x)!==g[R]&&d.setAttribute("morphTarget"+x,g[R]),m&&d.getAttribute("morphNormal"+x)!==m[R]&&d.setAttribute("morphNormal"+x,m[R]),s[x]=I,u+=I):(g&&d.hasAttribute("morphTarget"+x)===!0&&d.deleteAttribute("morphTarget"+x),m&&d.hasAttribute("morphNormal"+x)===!0&&d.deleteAttribute("morphNormal"+x),s[x]=0)}const y=d.morphTargetsRelative?1:1-u;h.getUniforms().setValue(i,"morphTargetBaseInfluence",y),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function mf(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class tl extends Tt{constructor(e,t,n,s,r,a,o,l,c,d){if(d=d!==void 0?d:Ln,d!==Ln&&d!==si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===Ln&&(n=fn),n===void 0&&d===si&&(n=In),super(null,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:yt,this.minFilter=l!==void 0?l:yt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const nl=new Tt,il=new tl(1,1);il.compareFunction=Go;const sl=new Xo,rl=new Jc,al=new Jo,Ka=[],Za=[],Ja=new Float32Array(16),Qa=new Float32Array(9),eo=new Float32Array(4);function di(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ka[s];if(r===void 0&&(r=new Float32Array(s),Ka[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function ot(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fs(i,e){let t=Za[e];t===void 0&&(t=new Int32Array(e),Za[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function gf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2fv(this.addr,e),lt(t,e)}}function _f(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ot(t,e))return;i.uniform3fv(this.addr,e),lt(t,e)}}function xf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4fv(this.addr,e),lt(t,e)}}function Ef(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),lt(t,e)}else{if(ot(t,n))return;eo.set(n),i.uniformMatrix2fv(this.addr,!1,eo),lt(t,n)}}function Sf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),lt(t,e)}else{if(ot(t,n))return;Qa.set(n),i.uniformMatrix3fv(this.addr,!1,Qa),lt(t,n)}}function Mf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),lt(t,e)}else{if(ot(t,n))return;Ja.set(n),i.uniformMatrix4fv(this.addr,!1,Ja),lt(t,n)}}function bf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function yf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2iv(this.addr,e),lt(t,e)}}function Tf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;i.uniform3iv(this.addr,e),lt(t,e)}}function wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4iv(this.addr,e),lt(t,e)}}function Af(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Cf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2uiv(this.addr,e),lt(t,e)}}function If(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;i.uniform3uiv(this.addr,e),lt(t,e)}}function Lf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4uiv(this.addr,e),lt(t,e)}}function Rf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?il:nl;t.setTexture2D(e||r,s)}function Pf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||rl,s)}function Nf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||al,s)}function Df(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||sl,s)}function Uf(i){switch(i){case 5126:return gf;case 35664:return vf;case 35665:return _f;case 35666:return xf;case 35674:return Ef;case 35675:return Sf;case 35676:return Mf;case 5124:case 35670:return bf;case 35667:case 35671:return yf;case 35668:case 35672:return Tf;case 35669:case 35673:return wf;case 5125:return Af;case 36294:return Cf;case 36295:return If;case 36296:return Lf;case 35678:case 36198:case 36298:case 36306:case 35682:return Rf;case 35679:case 36299:case 36307:return Pf;case 35680:case 36300:case 36308:case 36293:return Nf;case 36289:case 36303:case 36311:case 36292:return Df}}function Of(i,e){i.uniform1fv(this.addr,e)}function Ff(i,e){const t=di(e,this.size,2);i.uniform2fv(this.addr,t)}function kf(i,e){const t=di(e,this.size,3);i.uniform3fv(this.addr,t)}function Bf(i,e){const t=di(e,this.size,4);i.uniform4fv(this.addr,t)}function Hf(i,e){const t=di(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gf(i,e){const t=di(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Vf(i,e){const t=di(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function zf(i,e){i.uniform1iv(this.addr,e)}function Wf(i,e){i.uniform2iv(this.addr,e)}function Xf(i,e){i.uniform3iv(this.addr,e)}function Yf(i,e){i.uniform4iv(this.addr,e)}function qf(i,e){i.uniform1uiv(this.addr,e)}function $f(i,e){i.uniform2uiv(this.addr,e)}function jf(i,e){i.uniform3uiv(this.addr,e)}function Kf(i,e){i.uniform4uiv(this.addr,e)}function Zf(i,e,t){const n=this.cache,s=e.length,r=fs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),lt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||nl,r[a])}function Jf(i,e,t){const n=this.cache,s=e.length,r=fs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),lt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||rl,r[a])}function Qf(i,e,t){const n=this.cache,s=e.length,r=fs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),lt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||al,r[a])}function ep(i,e,t){const n=this.cache,s=e.length,r=fs(t,s);ot(n,r)||(i.uniform1iv(this.addr,r),lt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||sl,r[a])}function tp(i){switch(i){case 5126:return Of;case 35664:return Ff;case 35665:return kf;case 35666:return Bf;case 35674:return Hf;case 35675:return Gf;case 35676:return Vf;case 5124:case 35670:return zf;case 35667:case 35671:return Wf;case 35668:case 35672:return Xf;case 35669:case 35673:return Yf;case 5125:return qf;case 36294:return $f;case 36295:return jf;case 36296:return Kf;case 35678:case 36198:case 36298:case 36306:case 35682:return Zf;case 35679:case 36299:case 36307:return Jf;case 35680:case 36300:case 36308:case 36293:return Qf;case 36289:case 36303:case 36311:case 36292:return ep}}class np{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Uf(t.type)}}class ip{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tp(t.type)}}class sp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const qs=/(\w+)(\])?(\[|\.)?/g;function to(i,e){i.seq.push(e),i.map[e.id]=e}function rp(i,e,t){const n=i.name,s=n.length;for(qs.lastIndex=0;;){const r=qs.exec(n),a=qs.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){to(t,c===void 0?new np(o,i,e):new ip(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new sp(o),to(t,h)),t=h}}}class is{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);rp(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function no(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ap=37297;let op=0;function lp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function cp(i){const e=qe.getPrimaries(qe.workingColorSpace),t=qe.getPrimaries(i);let n;switch(e===t?n="":e===os&&t===as?n="LinearDisplayP3ToLinearSRGB":e===as&&t===os&&(n="LinearSRGBToLinearDisplayP3"),i){case an:case hs:return[n,"LinearTransferOETF"];case rt:case pr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function io(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+lp(i.getShaderSource(e),a)}else return s}function dp(i,e){const t=cp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function hp(i,e){let t;switch(e){case cc:t="Linear";break;case dc:t="Reinhard";break;case hc:t="OptimizedCineon";break;case Lo:t="ACESFilmic";break;case fc:t="AgX";break;case uc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function up(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Qn).join(`
`)}function fp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Qn).join(`
`)}function pp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Qn(i){return i!==""}function so(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ro(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gp=/^[ \t]*#include +<([\w\d./]+)>/gm;function or(i){return i.replace(gp,_p)}const vp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function _p(i,e){let t=Ne[e];if(t===void 0){const n=vp.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return or(t)}const xp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ao(i){return i.replace(xp,Ep)}function Ep(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function oo(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Sp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Co?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===tn&&(e="SHADOWMAP_TYPE_VSM"),e}function Mp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ni:case ii:e="ENVMAP_TYPE_CUBE";break;case ds:e="ENVMAP_TYPE_CUBE_UV";break}return e}function bp(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ii:e="ENVMAP_MODE_REFRACTION";break}return e}function yp(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Io:e="ENVMAP_BLENDING_MULTIPLY";break;case oc:e="ENVMAP_BLENDING_MIX";break;case lc:e="ENVMAP_BLENDING_ADD";break}return e}function Tp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function wp(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Sp(t),c=Mp(t),d=bp(t),h=yp(t),f=Tp(t),p=t.isWebGL2?"":up(t),v=fp(t),g=pp(r),m=s.createProgram();let u,y,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qn).join(`
`),u.length>0&&(u+=`
`),y=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qn).join(`
`),y.length>0&&(y+=`
`)):(u=[oo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qn).join(`
`),y=[p,oo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==sn?"#define TONE_MAPPING":"",t.toneMapping!==sn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==sn?hp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,dp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qn).join(`
`)),a=or(a),a=so(a,t),a=ro(a,t),o=or(o),o=so(o,t),o=ro(o,t),a=ao(a),o=ao(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Ta?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ta?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const w=x+u+a,R=x+y+o,I=no(s,s.VERTEX_SHADER,w),C=no(s,s.FRAGMENT_SHADER,R);s.attachShader(m,I),s.attachShader(m,C),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function q(j){if(i.debug.checkShaderErrors){const se=s.getProgramInfoLog(m).trim(),L=s.getShaderInfoLog(I).trim(),k=s.getShaderInfoLog(C).trim();let V=!0,X=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,I,C);else{const W=io(s,I,"vertex"),z=io(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+se+`
`+W+`
`+z)}else se!==""?console.warn("THREE.WebGLProgram: Program Info Log:",se):(L===""||k==="")&&(X=!1);X&&(j.diagnostics={runnable:V,programLog:se,vertexShader:{log:L,prefix:u},fragmentShader:{log:k,prefix:y}})}s.deleteShader(I),s.deleteShader(C),M=new is(s,m),T=mp(s,m)}let M;this.getUniforms=function(){return M===void 0&&q(this),M};let T;this.getAttributes=function(){return T===void 0&&q(this),T};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=s.getProgramParameter(m,ap)),H},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=op++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=I,this.fragmentShader=C,this}let Ap=0;class Cp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ip(e),t.set(e,n)),n}}class Ip{constructor(e){this.id=Ap++,this.code=e,this.usedTimes=0}}function Lp(i,e,t,n,s,r,a){const o=new vr,l=new Cp,c=[],d=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return M===0?"uv":`uv${M}`}function m(M,T,H,j,se){const L=j.fog,k=se.geometry,V=M.isMeshStandardMaterial?j.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),W=X&&X.mapping===ds?X.image.height:null,z=v[M.type];M.precision!==null&&(p=s.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const Z=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ee=Z!==void 0?Z.length:0;let de=0;k.morphAttributes.position!==void 0&&(de=1),k.morphAttributes.normal!==void 0&&(de=2),k.morphAttributes.color!==void 0&&(de=3);let G,Y,le,ve;if(z){const xt=Xt[z];G=xt.vertexShader,Y=xt.fragmentShader}else G=M.vertexShader,Y=M.fragmentShader,l.update(M),le=l.getVertexShaderID(M),ve=l.getFragmentShaderID(M);const ge=i.getRenderTarget(),Ie=se.isInstancedMesh===!0,Re=se.isBatchedMesh===!0,be=!!M.map,Ve=!!M.matcap,D=!!X,_t=!!M.aoMap,xe=!!M.lightMap,Ae=!!M.bumpMap,fe=!!M.normalMap,Je=!!M.displacementMap,De=!!M.emissiveMap,b=!!M.metalnessMap,_=!!M.roughnessMap,O=M.anisotropy>0,J=M.clearcoat>0,K=M.iridescence>0,Q=M.sheen>0,pe=M.transmission>0,oe=O&&!!M.anisotropyMap,he=J&&!!M.clearcoatMap,Me=J&&!!M.clearcoatNormalMap,Ue=J&&!!M.clearcoatRoughnessMap,$=K&&!!M.iridescenceMap,Ye=K&&!!M.iridescenceThicknessMap,He=Q&&!!M.sheenColorMap,we=Q&&!!M.sheenRoughnessMap,_e=!!M.specularMap,ue=!!M.specularColorMap,Pe=!!M.specularIntensityMap,Xe=pe&&!!M.transmissionMap,et=pe&&!!M.thicknessMap,Fe=!!M.gradientMap,ne=!!M.alphaMap,A=M.alphaTest>0,re=!!M.alphaHash,ae=!!M.extensions,ye=!!k.attributes.uv1,Ee=!!k.attributes.uv2,$e=!!k.attributes.uv3;let je=sn;return M.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:d,shaderID:z,shaderType:M.type,shaderName:M.name,vertexShader:G,fragmentShader:Y,defines:M.defines,customVertexShaderID:le,customFragmentShaderID:ve,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Re,instancing:Ie,instancingColor:Ie&&se.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:an,map:be,matcap:Ve,envMap:D,envMapMode:D&&X.mapping,envMapCubeUVHeight:W,aoMap:_t,lightMap:xe,bumpMap:Ae,normalMap:fe,displacementMap:f&&Je,emissiveMap:De,normalMapObjectSpace:fe&&M.normalMapType===Tc,normalMapTangentSpace:fe&&M.normalMapType===Ho,metalnessMap:b,roughnessMap:_,anisotropy:O,anisotropyMap:oe,clearcoat:J,clearcoatMap:he,clearcoatNormalMap:Me,clearcoatRoughnessMap:Ue,iridescence:K,iridescenceMap:$,iridescenceThicknessMap:Ye,sheen:Q,sheenColorMap:He,sheenRoughnessMap:we,specularMap:_e,specularColorMap:ue,specularIntensityMap:Pe,transmission:pe,transmissionMap:Xe,thicknessMap:et,gradientMap:Fe,opaque:M.transparent===!1&&M.blending===ei,alphaMap:ne,alphaTest:A,alphaHash:re,combine:M.combine,mapUv:be&&g(M.map.channel),aoMapUv:_t&&g(M.aoMap.channel),lightMapUv:xe&&g(M.lightMap.channel),bumpMapUv:Ae&&g(M.bumpMap.channel),normalMapUv:fe&&g(M.normalMap.channel),displacementMapUv:Je&&g(M.displacementMap.channel),emissiveMapUv:De&&g(M.emissiveMap.channel),metalnessMapUv:b&&g(M.metalnessMap.channel),roughnessMapUv:_&&g(M.roughnessMap.channel),anisotropyMapUv:oe&&g(M.anisotropyMap.channel),clearcoatMapUv:he&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:Me&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:He&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(M.sheenRoughnessMap.channel),specularMapUv:_e&&g(M.specularMap.channel),specularColorMapUv:ue&&g(M.specularColorMap.channel),specularIntensityMapUv:Pe&&g(M.specularIntensityMap.channel),transmissionMapUv:Xe&&g(M.transmissionMap.channel),thicknessMapUv:et&&g(M.thicknessMap.channel),alphaMapUv:ne&&g(M.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(fe||O),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:ye,vertexUv2s:Ee,vertexUv3s:$e,pointsUvs:se.isPoints===!0&&!!k.attributes.uv&&(be||ne),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:se.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:de,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&H.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:be&&M.map.isVideoTexture===!0&&qe.getTransfer(M.map.colorSpace)===Ze,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Yt,flipSided:M.side===At,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ae&&M.extensions.derivatives===!0,extensionFragDepth:ae&&M.extensions.fragDepth===!0,extensionDrawBuffers:ae&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:d||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:d||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:d||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function u(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const H in M.defines)T.push(H),T.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(y(T,M),x(T,M),T.push(i.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function y(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function w(M){const T=v[M.type];let H;if(T){const j=Xt[T];H=hd.clone(j.uniforms)}else H=M.uniforms;return H}function R(M,T){let H;for(let j=0,se=c.length;j<se;j++){const L=c[j];if(L.cacheKey===T){H=L,++H.usedTimes;break}}return H===void 0&&(H=new wp(i,T,M,r),c.push(H)),H}function I(M){if(--M.usedTimes===0){const T=c.indexOf(M);c[T]=c[c.length-1],c.pop(),M.destroy()}}function C(M){l.remove(M)}function q(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:w,acquireProgram:R,releaseProgram:I,releaseShaderCache:C,programs:c,dispose:q}}function Rp(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Pp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function lo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function co(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,f,p,v,g,m){let u=i[e];return u===void 0?(u={id:h.id,object:h,geometry:f,material:p,groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},i[e]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=p,u.groupOrder=v,u.renderOrder=h.renderOrder,u.z=g,u.group=m),e++,u}function o(h,f,p,v,g,m){const u=a(h,f,p,v,g,m);p.transmission>0?n.push(u):p.transparent===!0?s.push(u):t.push(u)}function l(h,f,p,v,g,m){const u=a(h,f,p,v,g,m);p.transmission>0?n.unshift(u):p.transparent===!0?s.unshift(u):t.unshift(u)}function c(h,f){t.length>1&&t.sort(h||Pp),n.length>1&&n.sort(f||lo),s.length>1&&s.sort(f||lo)}function d(){for(let h=e,f=i.length;h<f;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function Np(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new co,i.set(n,[a])):s>=r.length?(a=new co,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Dp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ze};break;case"SpotLight":t={position:new N,direction:new N,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function Up(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Op=0;function Fp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function kp(i,e){const t=new Dp,n=Up(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)s.probe.push(new N);const r=new N,a=new at,o=new at;function l(d,h){let f=0,p=0,v=0;for(let j=0;j<9;j++)s.probe[j].set(0,0,0);let g=0,m=0,u=0,y=0,x=0,w=0,R=0,I=0,C=0,q=0,M=0;d.sort(Fp);const T=h===!0?Math.PI:1;for(let j=0,se=d.length;j<se;j++){const L=d[j],k=L.color,V=L.intensity,X=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=k.r*V*T,p+=k.g*V*T,v+=k.b*V*T;else if(L.isLightProbe){for(let z=0;z<9;z++)s.probe[z].addScaledVector(L.sh.coefficients[z],V);M++}else if(L.isDirectionalLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const Z=L.shadow,ee=n.get(L);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,s.directionalShadow[g]=ee,s.directionalShadowMap[g]=W,s.directionalShadowMatrix[g]=L.shadow.matrix,w++}s.directional[g]=z,g++}else if(L.isSpotLight){const z=t.get(L);z.position.setFromMatrixPosition(L.matrixWorld),z.color.copy(k).multiplyScalar(V*T),z.distance=X,z.coneCos=Math.cos(L.angle),z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),z.decay=L.decay,s.spot[u]=z;const Z=L.shadow;if(L.map&&(s.spotLightMap[C]=L.map,C++,Z.updateMatrices(L),L.castShadow&&q++),s.spotLightMatrix[u]=Z.matrix,L.castShadow){const ee=n.get(L);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,s.spotShadow[u]=ee,s.spotShadowMap[u]=W,I++}u++}else if(L.isRectAreaLight){const z=t.get(L);z.color.copy(k).multiplyScalar(V),z.halfWidth.set(L.width*.5,0,0),z.halfHeight.set(0,L.height*.5,0),s.rectArea[y]=z,y++}else if(L.isPointLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity*T),z.distance=L.distance,z.decay=L.decay,L.castShadow){const Z=L.shadow,ee=n.get(L);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,ee.shadowCameraNear=Z.camera.near,ee.shadowCameraFar=Z.camera.far,s.pointShadow[m]=ee,s.pointShadowMap[m]=W,s.pointShadowMatrix[m]=L.shadow.matrix,R++}s.point[m]=z,m++}else if(L.isHemisphereLight){const z=t.get(L);z.skyColor.copy(L.color).multiplyScalar(V*T),z.groundColor.copy(L.groundColor).multiplyScalar(V*T),s.hemi[x]=z,x++}}y>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_FLOAT_1,s.rectAreaLTC2=ie.LTC_FLOAT_2):(s.rectAreaLTC1=ie.LTC_HALF_1,s.rectAreaLTC2=ie.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_FLOAT_1,s.rectAreaLTC2=ie.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ie.LTC_HALF_1,s.rectAreaLTC2=ie.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=p,s.ambient[2]=v;const H=s.hash;(H.directionalLength!==g||H.pointLength!==m||H.spotLength!==u||H.rectAreaLength!==y||H.hemiLength!==x||H.numDirectionalShadows!==w||H.numPointShadows!==R||H.numSpotShadows!==I||H.numSpotMaps!==C||H.numLightProbes!==M)&&(s.directional.length=g,s.spot.length=u,s.rectArea.length=y,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=w,s.directionalShadowMap.length=w,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=I,s.spotShadowMap.length=I,s.directionalShadowMatrix.length=w,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=I+C-q,s.spotLightMap.length=C,s.numSpotLightShadowsWithMaps=q,s.numLightProbes=M,H.directionalLength=g,H.pointLength=m,H.spotLength=u,H.rectAreaLength=y,H.hemiLength=x,H.numDirectionalShadows=w,H.numPointShadows=R,H.numSpotShadows=I,H.numSpotMaps=C,H.numLightProbes=M,s.version=Op++)}function c(d,h){let f=0,p=0,v=0,g=0,m=0;const u=h.matrixWorldInverse;for(let y=0,x=d.length;y<x;y++){const w=d[y];if(w.isDirectionalLight){const R=s.directional[f];R.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(u),f++}else if(w.isSpotLight){const R=s.spot[v];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(u),R.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(u),v++}else if(w.isRectAreaLight){const R=s.rectArea[g];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(u),o.identity(),a.copy(w.matrixWorld),a.premultiply(u),o.extractRotation(a),R.halfWidth.set(w.width*.5,0,0),R.halfHeight.set(0,w.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){const R=s.point[p];R.position.setFromMatrixPosition(w.matrixWorld),R.position.applyMatrix4(u),p++}else if(w.isHemisphereLight){const R=s.hemi[m];R.direction.setFromMatrixPosition(w.matrixWorld),R.direction.transformDirection(u),m++}}}return{setup:l,setupView:c,state:s}}function ho(i,e){const t=new kp(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(h){n.push(h)}function o(h){s.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Bp(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new ho(i,e),t.set(r,[l])):a>=o.length?(l=new ho(i,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class Hp extends Ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gp extends Ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Vp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zp=`uniform sampler2D shadow_pass;
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
}`;function Wp(i,e,t){let n=new _r;const s=new Ge,r=new Ge,a=new ut,o=new Hp({depthPacking:yc}),l=new Gp,c={},d=t.maxTextureSize,h={[vn]:At,[At]:vn,[Yt]:Yt},f=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:Vp,fragmentShader:zp}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const v=new on;v.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Pt(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Co;let u=this.type;this.render=function(I,C,q){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const M=i.getRenderTarget(),T=i.getActiveCubeFace(),H=i.getActiveMipmapLevel(),j=i.state;j.setBlending(mn),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const se=u!==tn&&this.type===tn,L=u===tn&&this.type!==tn;for(let k=0,V=I.length;k<V;k++){const X=I[k],W=X.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const z=W.getFrameExtents();if(s.multiply(z),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/z.x),s.x=r.x*z.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/z.y),s.y=r.y*z.y,W.mapSize.y=r.y)),W.map===null||se===!0||L===!0){const ee=this.type!==tn?{minFilter:yt,magFilter:yt}:{};W.map!==null&&W.map.dispose(),W.map=new Nn(s.x,s.y,ee),W.map.texture.name=X.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const Z=W.getViewportCount();for(let ee=0;ee<Z;ee++){const de=W.getViewport(ee);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),j.viewport(a),W.updateMatrices(X,ee),n=W.getFrustum(),w(C,q,W.camera,X,this.type)}W.isPointLightShadow!==!0&&this.type===tn&&y(W,q),W.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(M,T,H)};function y(I,C){const q=e.update(g);f.defines.VSM_SAMPLES!==I.blurSamples&&(f.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Nn(s.x,s.y)),f.uniforms.shadow_pass.value=I.map.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,i.setRenderTarget(I.mapPass),i.clear(),i.renderBufferDirect(C,null,q,f,g,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,i.setRenderTarget(I.map),i.clear(),i.renderBufferDirect(C,null,q,p,g,null)}function x(I,C,q,M){let T=null;const H=q.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(H!==void 0)T=H;else if(T=q.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const j=T.uuid,se=C.uuid;let L=c[j];L===void 0&&(L={},c[j]=L);let k=L[se];k===void 0&&(k=T.clone(),L[se]=k,C.addEventListener("dispose",R)),T=k}if(T.visible=C.visible,T.wireframe=C.wireframe,M===tn?T.side=C.shadowSide!==null?C.shadowSide:C.side:T.side=C.shadowSide!==null?C.shadowSide:h[C.side],T.alphaMap=C.alphaMap,T.alphaTest=C.alphaTest,T.map=C.map,T.clipShadows=C.clipShadows,T.clippingPlanes=C.clippingPlanes,T.clipIntersection=C.clipIntersection,T.displacementMap=C.displacementMap,T.displacementScale=C.displacementScale,T.displacementBias=C.displacementBias,T.wireframeLinewidth=C.wireframeLinewidth,T.linewidth=C.linewidth,q.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const j=i.properties.get(T);j.light=q}return T}function w(I,C,q,M,T){if(I.visible===!1)return;if(I.layers.test(C.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&T===tn)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,I.matrixWorld);const se=e.update(I),L=I.material;if(Array.isArray(L)){const k=se.groups;for(let V=0,X=k.length;V<X;V++){const W=k[V],z=L[W.materialIndex];if(z&&z.visible){const Z=x(I,z,M,T);I.onBeforeShadow(i,I,C,q,se,Z,W),i.renderBufferDirect(q,null,se,Z,I,W),I.onAfterShadow(i,I,C,q,se,Z,W)}}}else if(L.visible){const k=x(I,L,M,T);I.onBeforeShadow(i,I,C,q,se,k,null),i.renderBufferDirect(q,null,se,k,I,null),I.onAfterShadow(i,I,C,q,se,k,null)}}const j=I.children;for(let se=0,L=j.length;se<L;se++)w(j[se],C,q,M,T)}function R(I){I.target.removeEventListener("dispose",R);for(const q in c){const M=c[q],T=I.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function Xp(i,e,t){const n=t.isWebGL2;function s(){let A=!1;const re=new ut;let ae=null;const ye=new ut(0,0,0,0);return{setMask:function(Ee){ae!==Ee&&!A&&(i.colorMask(Ee,Ee,Ee,Ee),ae=Ee)},setLocked:function(Ee){A=Ee},setClear:function(Ee,$e,je,ct,xt){xt===!0&&(Ee*=ct,$e*=ct,je*=ct),re.set(Ee,$e,je,ct),ye.equals(re)===!1&&(i.clearColor(Ee,$e,je,ct),ye.copy(re))},reset:function(){A=!1,ae=null,ye.set(-1,0,0,0)}}}function r(){let A=!1,re=null,ae=null,ye=null;return{setTest:function(Ee){Ee?Re(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(Ee){re!==Ee&&!A&&(i.depthMask(Ee),re=Ee)},setFunc:function(Ee){if(ae!==Ee){switch(Ee){case ec:i.depthFunc(i.NEVER);break;case tc:i.depthFunc(i.ALWAYS);break;case nc:i.depthFunc(i.LESS);break;case ss:i.depthFunc(i.LEQUAL);break;case ic:i.depthFunc(i.EQUAL);break;case sc:i.depthFunc(i.GEQUAL);break;case rc:i.depthFunc(i.GREATER);break;case ac:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=Ee}},setLocked:function(Ee){A=Ee},setClear:function(Ee){ye!==Ee&&(i.clearDepth(Ee),ye=Ee)},reset:function(){A=!1,re=null,ae=null,ye=null}}}function a(){let A=!1,re=null,ae=null,ye=null,Ee=null,$e=null,je=null,ct=null,xt=null;return{setTest:function(Ke){A||(Ke?Re(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(Ke){re!==Ke&&!A&&(i.stencilMask(Ke),re=Ke)},setFunc:function(Ke,Et,Wt){(ae!==Ke||ye!==Et||Ee!==Wt)&&(i.stencilFunc(Ke,Et,Wt),ae=Ke,ye=Et,Ee=Wt)},setOp:function(Ke,Et,Wt){($e!==Ke||je!==Et||ct!==Wt)&&(i.stencilOp(Ke,Et,Wt),$e=Ke,je=Et,ct=Wt)},setLocked:function(Ke){A=Ke},setClear:function(Ke){xt!==Ke&&(i.clearStencil(Ke),xt=Ke)},reset:function(){A=!1,re=null,ae=null,ye=null,Ee=null,$e=null,je=null,ct=null,xt=null}}}const o=new s,l=new r,c=new a,d=new WeakMap,h=new WeakMap;let f={},p={},v=new WeakMap,g=[],m=null,u=!1,y=null,x=null,w=null,R=null,I=null,C=null,q=null,M=new ze(0,0,0),T=0,H=!1,j=null,se=null,L=null,k=null,V=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,z=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(Z)[1]),W=z>=1):Z.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),W=z>=2);let ee=null,de={};const G=i.getParameter(i.SCISSOR_BOX),Y=i.getParameter(i.VIEWPORT),le=new ut().fromArray(G),ve=new ut().fromArray(Y);function ge(A,re,ae,ye){const Ee=new Uint8Array(4),$e=i.createTexture();i.bindTexture(A,$e),i.texParameteri(A,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(A,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<ae;je++)n&&(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)?i.texImage3D(re,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(re+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return $e}const Ie={};Ie[i.TEXTURE_2D]=ge(i.TEXTURE_2D,i.TEXTURE_2D,1),Ie[i.TEXTURE_CUBE_MAP]=ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[i.TEXTURE_2D_ARRAY]=ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ie[i.TEXTURE_3D]=ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Re(i.DEPTH_TEST),l.setFunc(ss),De(!1),b(Xr),Re(i.CULL_FACE),fe(mn);function Re(A){f[A]!==!0&&(i.enable(A),f[A]=!0)}function be(A){f[A]!==!1&&(i.disable(A),f[A]=!1)}function Ve(A,re){return p[A]!==re?(i.bindFramebuffer(A,re),p[A]=re,n&&(A===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=re),A===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=re)),!0):!1}function D(A,re){let ae=g,ye=!1;if(A)if(ae=v.get(re),ae===void 0&&(ae=[],v.set(re,ae)),A.isWebGLMultipleRenderTargets){const Ee=A.texture;if(ae.length!==Ee.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let $e=0,je=Ee.length;$e<je;$e++)ae[$e]=i.COLOR_ATTACHMENT0+$e;ae.length=Ee.length,ye=!0}}else ae[0]!==i.COLOR_ATTACHMENT0&&(ae[0]=i.COLOR_ATTACHMENT0,ye=!0);else ae[0]!==i.BACK&&(ae[0]=i.BACK,ye=!0);ye&&(t.isWebGL2?i.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function _t(A){return m!==A?(i.useProgram(A),m=A,!0):!1}const xe={[wn]:i.FUNC_ADD,[Bl]:i.FUNC_SUBTRACT,[Hl]:i.FUNC_REVERSE_SUBTRACT};if(n)xe[jr]=i.MIN,xe[Kr]=i.MAX;else{const A=e.get("EXT_blend_minmax");A!==null&&(xe[jr]=A.MIN_EXT,xe[Kr]=A.MAX_EXT)}const Ae={[Gl]:i.ZERO,[Vl]:i.ONE,[zl]:i.SRC_COLOR,[Qs]:i.SRC_ALPHA,[jl]:i.SRC_ALPHA_SATURATE,[ql]:i.DST_COLOR,[Xl]:i.DST_ALPHA,[Wl]:i.ONE_MINUS_SRC_COLOR,[er]:i.ONE_MINUS_SRC_ALPHA,[$l]:i.ONE_MINUS_DST_COLOR,[Yl]:i.ONE_MINUS_DST_ALPHA,[Kl]:i.CONSTANT_COLOR,[Zl]:i.ONE_MINUS_CONSTANT_COLOR,[Jl]:i.CONSTANT_ALPHA,[Ql]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(A,re,ae,ye,Ee,$e,je,ct,xt,Ke){if(A===mn){u===!0&&(be(i.BLEND),u=!1);return}if(u===!1&&(Re(i.BLEND),u=!0),A!==kl){if(A!==y||Ke!==H){if((x!==wn||I!==wn)&&(i.blendEquation(i.FUNC_ADD),x=wn,I=wn),Ke)switch(A){case ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yr:i.blendFunc(i.ONE,i.ONE);break;case qr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $r:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}else switch(A){case ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case qr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $r:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",A);break}w=null,R=null,C=null,q=null,M.set(0,0,0),T=0,y=A,H=Ke}return}Ee=Ee||re,$e=$e||ae,je=je||ye,(re!==x||Ee!==I)&&(i.blendEquationSeparate(xe[re],xe[Ee]),x=re,I=Ee),(ae!==w||ye!==R||$e!==C||je!==q)&&(i.blendFuncSeparate(Ae[ae],Ae[ye],Ae[$e],Ae[je]),w=ae,R=ye,C=$e,q=je),(ct.equals(M)===!1||xt!==T)&&(i.blendColor(ct.r,ct.g,ct.b,xt),M.copy(ct),T=xt),y=A,H=!1}function Je(A,re){A.side===Yt?be(i.CULL_FACE):Re(i.CULL_FACE);let ae=A.side===At;re&&(ae=!ae),De(ae),A.blending===ei&&A.transparent===!1?fe(mn):fe(A.blending,A.blendEquation,A.blendSrc,A.blendDst,A.blendEquationAlpha,A.blendSrcAlpha,A.blendDstAlpha,A.blendColor,A.blendAlpha,A.premultipliedAlpha),l.setFunc(A.depthFunc),l.setTest(A.depthTest),l.setMask(A.depthWrite),o.setMask(A.colorWrite);const ye=A.stencilWrite;c.setTest(ye),ye&&(c.setMask(A.stencilWriteMask),c.setFunc(A.stencilFunc,A.stencilRef,A.stencilFuncMask),c.setOp(A.stencilFail,A.stencilZFail,A.stencilZPass)),O(A.polygonOffset,A.polygonOffsetFactor,A.polygonOffsetUnits),A.alphaToCoverage===!0?Re(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function De(A){j!==A&&(A?i.frontFace(i.CW):i.frontFace(i.CCW),j=A)}function b(A){A!==Ul?(Re(i.CULL_FACE),A!==se&&(A===Xr?i.cullFace(i.BACK):A===Ol?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),se=A}function _(A){A!==L&&(W&&i.lineWidth(A),L=A)}function O(A,re,ae){A?(Re(i.POLYGON_OFFSET_FILL),(k!==re||V!==ae)&&(i.polygonOffset(re,ae),k=re,V=ae)):be(i.POLYGON_OFFSET_FILL)}function J(A){A?Re(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function K(A){A===void 0&&(A=i.TEXTURE0+X-1),ee!==A&&(i.activeTexture(A),ee=A)}function Q(A,re,ae){ae===void 0&&(ee===null?ae=i.TEXTURE0+X-1:ae=ee);let ye=de[ae];ye===void 0&&(ye={type:void 0,texture:void 0},de[ae]=ye),(ye.type!==A||ye.texture!==re)&&(ee!==ae&&(i.activeTexture(ae),ee=ae),i.bindTexture(A,re||Ie[A]),ye.type=A,ye.texture=re)}function pe(){const A=de[ee];A!==void 0&&A.type!==void 0&&(i.bindTexture(A.type,null),A.type=void 0,A.texture=void 0)}function oe(){try{i.compressedTexImage2D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Me(){try{i.texSubImage2D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Ue(){try{i.texSubImage3D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function $(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Ye(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function He(){try{i.texStorage2D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function we(){try{i.texStorage3D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function ue(){try{i.texImage3D.apply(i,arguments)}catch(A){console.error("THREE.WebGLState:",A)}}function Pe(A){le.equals(A)===!1&&(i.scissor(A.x,A.y,A.z,A.w),le.copy(A))}function Xe(A){ve.equals(A)===!1&&(i.viewport(A.x,A.y,A.z,A.w),ve.copy(A))}function et(A,re){let ae=h.get(re);ae===void 0&&(ae=new WeakMap,h.set(re,ae));let ye=ae.get(A);ye===void 0&&(ye=i.getUniformBlockIndex(re,A.name),ae.set(A,ye))}function Fe(A,re){const ye=h.get(re).get(A);d.get(re)!==ye&&(i.uniformBlockBinding(re,ye,A.__bindingPointIndex),d.set(re,ye))}function ne(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ee=null,de={},p={},v=new WeakMap,g=[],m=null,u=!1,y=null,x=null,w=null,R=null,I=null,C=null,q=null,M=new ze(0,0,0),T=0,H=!1,j=null,se=null,L=null,k=null,V=null,le.set(0,0,i.canvas.width,i.canvas.height),ve.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Re,disable:be,bindFramebuffer:Ve,drawBuffers:D,useProgram:_t,setBlending:fe,setMaterial:Je,setFlipSided:De,setCullFace:b,setLineWidth:_,setPolygonOffset:O,setScissorTest:J,activeTexture:K,bindTexture:Q,unbindTexture:pe,compressedTexImage2D:oe,compressedTexImage3D:he,texImage2D:_e,texImage3D:ue,updateUBOMapping:et,uniformBlockBinding:Fe,texStorage2D:He,texStorage3D:we,texSubImage2D:Me,texSubImage3D:Ue,compressedTexSubImage2D:$,compressedTexSubImage3D:Ye,scissor:Pe,viewport:Xe,reset:ne}}function Yp(i,e,t,n,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,_){return p?new OffscreenCanvas(b,_):Mi("canvas")}function g(b,_,O,J){let K=1;if((b.width>J||b.height>J)&&(K=J/Math.max(b.width,b.height)),K<1||_===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const Q=_?cs:Math.floor,pe=Q(K*b.width),oe=Q(K*b.height);h===void 0&&(h=v(pe,oe));const he=O?v(pe,oe):h;return he.width=pe,he.height=oe,he.getContext("2d").drawImage(b,0,0,pe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+pe+"x"+oe+")."),he}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return ar(b.width)&&ar(b.height)}function u(b){return o?!1:b.wrapS!==Vt||b.wrapT!==Vt||b.minFilter!==yt&&b.minFilter!==wt}function y(b,_){return b.generateMipmaps&&_&&b.minFilter!==yt&&b.minFilter!==wt}function x(b){i.generateMipmap(b)}function w(b,_,O,J,K=!1){if(o===!1)return _;if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Q=_;if(_===i.RED&&(O===i.FLOAT&&(Q=i.R32F),O===i.HALF_FLOAT&&(Q=i.R16F),O===i.UNSIGNED_BYTE&&(Q=i.R8)),_===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Q=i.R8UI),O===i.UNSIGNED_SHORT&&(Q=i.R16UI),O===i.UNSIGNED_INT&&(Q=i.R32UI),O===i.BYTE&&(Q=i.R8I),O===i.SHORT&&(Q=i.R16I),O===i.INT&&(Q=i.R32I)),_===i.RG&&(O===i.FLOAT&&(Q=i.RG32F),O===i.HALF_FLOAT&&(Q=i.RG16F),O===i.UNSIGNED_BYTE&&(Q=i.RG8)),_===i.RGBA){const pe=K?rs:qe.getTransfer(J);O===i.FLOAT&&(Q=i.RGBA32F),O===i.HALF_FLOAT&&(Q=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Q=pe===Ze?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(b,_,O){return y(b,O)===!0||b.isFramebufferTexture&&b.minFilter!==yt&&b.minFilter!==wt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function I(b){return b===yt||b===Zr||b===Es?i.NEAREST:i.LINEAR}function C(b){const _=b.target;_.removeEventListener("dispose",C),M(_),_.isVideoTexture&&d.delete(_)}function q(b){const _=b.target;_.removeEventListener("dispose",q),H(_)}function M(b){const _=n.get(b);if(_.__webglInit===void 0)return;const O=b.source,J=f.get(O);if(J){const K=J[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&T(b),Object.keys(J).length===0&&f.delete(O)}n.remove(b)}function T(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const O=b.source,J=f.get(O);delete J[_.__cacheKey],a.memory.textures--}function H(b){const _=b.texture,O=n.get(b),J=n.get(_);if(J.__webglTexture!==void 0&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(O.__webglFramebuffer[K]))for(let Q=0;Q<O.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(O.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(O.__webglFramebuffer[K]);O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer[K])}else{if(Array.isArray(O.__webglFramebuffer))for(let K=0;K<O.__webglFramebuffer.length;K++)i.deleteFramebuffer(O.__webglFramebuffer[K]);else i.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&i.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let K=0;K<O.__webglColorRenderbuffer.length;K++)O.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(O.__webglColorRenderbuffer[K]);O.__webglDepthRenderbuffer&&i.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let K=0,Q=_.length;K<Q;K++){const pe=n.get(_[K]);pe.__webglTexture&&(i.deleteTexture(pe.__webglTexture),a.memory.textures--),n.remove(_[K])}n.remove(_),n.remove(b)}let j=0;function se(){j=0}function L(){const b=j;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),j+=1,b}function k(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function V(b,_){const O=n.get(b);if(b.isVideoTexture&&Je(b),b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){const J=b.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(O,b,_);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+_)}function X(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){le(O,b,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+_)}function W(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){le(O,b,_);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+_)}function z(b,_){const O=n.get(b);if(b.version>0&&O.__version!==b.version){ve(O,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+_)}const Z={[ir]:i.REPEAT,[Vt]:i.CLAMP_TO_EDGE,[sr]:i.MIRRORED_REPEAT},ee={[yt]:i.NEAREST,[Zr]:i.NEAREST_MIPMAP_NEAREST,[Es]:i.NEAREST_MIPMAP_LINEAR,[wt]:i.LINEAR,[pc]:i.LINEAR_MIPMAP_NEAREST,[Rn]:i.LINEAR_MIPMAP_LINEAR},de={[wc]:i.NEVER,[Pc]:i.ALWAYS,[Ac]:i.LESS,[Go]:i.LEQUAL,[Cc]:i.EQUAL,[Rc]:i.GEQUAL,[Ic]:i.GREATER,[Lc]:i.NOTEQUAL};function G(b,_,O){if(O?(i.texParameteri(b,i.TEXTURE_WRAP_S,Z[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Z[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Z[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ee[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ee[_.minFilter])):(i.texParameteri(b,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(b,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(_.wrapS!==Vt||_.wrapT!==Vt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(b,i.TEXTURE_MAG_FILTER,I(_.magFilter)),i.texParameteri(b,i.TEXTURE_MIN_FILTER,I(_.minFilter)),_.minFilter!==yt&&_.minFilter!==wt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,de[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===yt||_.minFilter!==Es&&_.minFilter!==Rn||_.type===pn&&e.has("OES_texture_float_linear")===!1||o===!1&&_.type===Ei&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||n.get(_).__currentAnisotropy)&&(i.texParameterf(b,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy)}}function Y(b,_){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",C));const J=_.source;let K=f.get(J);K===void 0&&(K={},f.set(J,K));const Q=k(_);if(Q!==b.__cacheKey){K[Q]===void 0&&(K[Q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[Q].usedTimes++;const pe=K[b.__cacheKey];pe!==void 0&&(K[b.__cacheKey].usedTimes--,pe.usedTimes===0&&T(_)),b.__cacheKey=Q,b.__webglTexture=K[Q].texture}return O}function le(b,_,O){let J=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(J=i.TEXTURE_3D);const K=Y(b,_),Q=_.source;t.bindTexture(J,b.__webglTexture,i.TEXTURE0+O);const pe=n.get(Q);if(Q.version!==pe.__version||K===!0){t.activeTexture(i.TEXTURE0+O);const oe=qe.getPrimaries(qe.workingColorSpace),he=_.colorSpace===Ft?null:qe.getPrimaries(_.colorSpace),Me=_.colorSpace===Ft||oe===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ue=u(_)&&m(_.image)===!1;let $=g(_.image,Ue,!1,s.maxTextureSize);$=De(_,$);const Ye=m($)||o,He=r.convert(_.format,_.colorSpace);let we=r.convert(_.type),_e=w(_.internalFormat,He,we,_.colorSpace,_.isVideoTexture);G(J,_,Ye);let ue;const Pe=_.mipmaps,Xe=o&&_.isVideoTexture!==!0&&_e!==ko,et=pe.__version===void 0||K===!0,Fe=R(_,$,Ye);if(_.isDepthTexture)_e=i.DEPTH_COMPONENT,o?_.type===pn?_e=i.DEPTH_COMPONENT32F:_.type===fn?_e=i.DEPTH_COMPONENT24:_.type===In?_e=i.DEPTH24_STENCIL8:_e=i.DEPTH_COMPONENT16:_.type===pn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===Ln&&_e===i.DEPTH_COMPONENT&&_.type!==fr&&_.type!==fn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=fn,we=r.convert(_.type)),_.format===si&&_e===i.DEPTH_COMPONENT&&(_e=i.DEPTH_STENCIL,_.type!==In&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=In,we=r.convert(_.type))),et&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,_e,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,_e,$.width,$.height,0,He,we,null));else if(_.isDataTexture)if(Pe.length>0&&Ye){Xe&&et&&t.texStorage2D(i.TEXTURE_2D,Fe,_e,Pe[0].width,Pe[0].height);for(let ne=0,A=Pe.length;ne<A;ne++)ue=Pe[ne],Xe?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,He,we,ue.data):t.texImage2D(i.TEXTURE_2D,ne,_e,ue.width,ue.height,0,He,we,ue.data);_.generateMipmaps=!1}else Xe?(et&&t.texStorage2D(i.TEXTURE_2D,Fe,_e,$.width,$.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,$.width,$.height,He,we,$.data)):t.texImage2D(i.TEXTURE_2D,0,_e,$.width,$.height,0,He,we,$.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Xe&&et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,_e,Pe[0].width,Pe[0].height,$.depth);for(let ne=0,A=Pe.length;ne<A;ne++)ue=Pe[ne],_.format!==zt?He!==null?Xe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,$.depth,He,ue.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,_e,ue.width,ue.height,$.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,$.depth,He,we,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,_e,ue.width,ue.height,$.depth,0,He,we,ue.data)}else{Xe&&et&&t.texStorage2D(i.TEXTURE_2D,Fe,_e,Pe[0].width,Pe[0].height);for(let ne=0,A=Pe.length;ne<A;ne++)ue=Pe[ne],_.format!==zt?He!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,He,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,_e,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,He,we,ue.data):t.texImage2D(i.TEXTURE_2D,ne,_e,ue.width,ue.height,0,He,we,ue.data)}else if(_.isDataArrayTexture)Xe?(et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Fe,_e,$.width,$.height,$.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,He,we,$.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,_e,$.width,$.height,$.depth,0,He,we,$.data);else if(_.isData3DTexture)Xe?(et&&t.texStorage3D(i.TEXTURE_3D,Fe,_e,$.width,$.height,$.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,He,we,$.data)):t.texImage3D(i.TEXTURE_3D,0,_e,$.width,$.height,$.depth,0,He,we,$.data);else if(_.isFramebufferTexture){if(et)if(Xe)t.texStorage2D(i.TEXTURE_2D,Fe,_e,$.width,$.height);else{let ne=$.width,A=$.height;for(let re=0;re<Fe;re++)t.texImage2D(i.TEXTURE_2D,re,_e,ne,A,0,He,we,null),ne>>=1,A>>=1}}else if(Pe.length>0&&Ye){Xe&&et&&t.texStorage2D(i.TEXTURE_2D,Fe,_e,Pe[0].width,Pe[0].height);for(let ne=0,A=Pe.length;ne<A;ne++)ue=Pe[ne],Xe?t.texSubImage2D(i.TEXTURE_2D,ne,0,0,He,we,ue):t.texImage2D(i.TEXTURE_2D,ne,_e,He,we,ue);_.generateMipmaps=!1}else Xe?(et&&t.texStorage2D(i.TEXTURE_2D,Fe,_e,$.width,$.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,He,we,$)):t.texImage2D(i.TEXTURE_2D,0,_e,He,we,$);y(_,Ye)&&x(J),pe.__version=Q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ve(b,_,O){if(_.image.length!==6)return;const J=Y(b,_),K=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+O);const Q=n.get(K);if(K.version!==Q.__version||J===!0){t.activeTexture(i.TEXTURE0+O);const pe=qe.getPrimaries(qe.workingColorSpace),oe=_.colorSpace===Ft?null:qe.getPrimaries(_.colorSpace),he=_.colorSpace===Ft||pe===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Me=_.isCompressedTexture||_.image[0].isCompressedTexture,Ue=_.image[0]&&_.image[0].isDataTexture,$=[];for(let ne=0;ne<6;ne++)!Me&&!Ue?$[ne]=g(_.image[ne],!1,!0,s.maxCubemapSize):$[ne]=Ue?_.image[ne].image:_.image[ne],$[ne]=De(_,$[ne]);const Ye=$[0],He=m(Ye)||o,we=r.convert(_.format,_.colorSpace),_e=r.convert(_.type),ue=w(_.internalFormat,we,_e,_.colorSpace),Pe=o&&_.isVideoTexture!==!0,Xe=Q.__version===void 0||J===!0;let et=R(_,Ye,He);G(i.TEXTURE_CUBE_MAP,_,He);let Fe;if(Me){Pe&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,et,ue,Ye.width,Ye.height);for(let ne=0;ne<6;ne++){Fe=$[ne].mipmaps;for(let A=0;A<Fe.length;A++){const re=Fe[A];_.format!==zt?we!==null?Pe?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A,0,0,re.width,re.height,we,re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A,ue,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A,0,0,re.width,re.height,we,_e,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A,ue,re.width,re.height,0,we,_e,re.data)}}}else{Fe=_.mipmaps,Pe&&Xe&&(Fe.length>0&&et++,t.texStorage2D(i.TEXTURE_CUBE_MAP,et,ue,$[0].width,$[0].height));for(let ne=0;ne<6;ne++)if(Ue){Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,$[ne].width,$[ne].height,we,_e,$[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ue,$[ne].width,$[ne].height,0,we,_e,$[ne].data);for(let A=0;A<Fe.length;A++){const ae=Fe[A].image[ne].image;Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A+1,0,0,ae.width,ae.height,we,_e,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A+1,ue,ae.width,ae.height,0,we,_e,ae.data)}}else{Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,we,_e,$[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,ue,we,_e,$[ne]);for(let A=0;A<Fe.length;A++){const re=Fe[A];Pe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A+1,0,0,we,_e,re.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,A+1,ue,we,_e,re.image[ne])}}}y(_,He)&&x(i.TEXTURE_CUBE_MAP),Q.__version=K.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ge(b,_,O,J,K,Q){const pe=r.convert(O.format,O.colorSpace),oe=r.convert(O.type),he=w(O.internalFormat,pe,oe,O.colorSpace);if(!n.get(_).__hasExternalTextures){const Ue=Math.max(1,_.width>>Q),$=Math.max(1,_.height>>Q);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,Q,he,Ue,$,_.depth,0,pe,oe,null):t.texImage2D(K,Q,he,Ue,$,0,pe,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),fe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,K,n.get(O).__webglTexture,0,Ae(_)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,K,n.get(O).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(b,_,O){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer&&!_.stencilBuffer){let J=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(O||fe(_)){const K=_.depthTexture;K&&K.isDepthTexture&&(K.type===pn?J=i.DEPTH_COMPONENT32F:K.type===fn&&(J=i.DEPTH_COMPONENT24));const Q=Ae(_);fe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,J,_.width,_.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,J,_.width,_.height)}else i.renderbufferStorage(i.RENDERBUFFER,J,_.width,_.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,b)}else if(_.depthBuffer&&_.stencilBuffer){const J=Ae(_);O&&fe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,_.width,_.height):fe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,b)}else{const J=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let K=0;K<J.length;K++){const Q=J[K],pe=r.convert(Q.format,Q.colorSpace),oe=r.convert(Q.type),he=w(Q.internalFormat,pe,oe,Q.colorSpace),Me=Ae(_);O&&fe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,he,_.width,_.height):fe(_)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,he,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,he,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Re(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V(_.depthTexture,0);const J=n.get(_.depthTexture).__webglTexture,K=Ae(_);if(_.depthTexture.format===Ln)fe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(_.depthTexture.format===si)fe(_)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function be(b){const _=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Re(_.__webglFramebuffer,b)}else if(O){_.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[J]),_.__webglDepthbuffer[J]=i.createRenderbuffer(),Ie(_.__webglDepthbuffer[J],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=i.createRenderbuffer(),Ie(_.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ve(b,_,O){const J=n.get(b);_!==void 0&&ge(J.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&be(b)}function D(b){const _=b.texture,O=n.get(b),J=n.get(_);b.addEventListener("dispose",q),b.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=_.version,a.memory.textures++);const K=b.isWebGLCubeRenderTarget===!0,Q=b.isWebGLMultipleRenderTargets===!0,pe=m(b)||o;if(K){O.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(o&&_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[oe]=[];for(let he=0;he<_.mipmaps.length;he++)O.__webglFramebuffer[oe][he]=i.createFramebuffer()}else O.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(o&&_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let oe=0;oe<_.mipmaps.length;oe++)O.__webglFramebuffer[oe]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Q)if(s.drawBuffers){const oe=b.texture;for(let he=0,Me=oe.length;he<Me;he++){const Ue=n.get(oe[he]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&fe(b)===!1){const oe=Q?_:[_];O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let he=0;he<oe.length;he++){const Me=oe[he];O.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[he]);const Ue=r.convert(Me.format,Me.colorSpace),$=r.convert(Me.type),Ye=w(Me.internalFormat,Ue,$,Me.colorSpace,b.isXRRenderTarget===!0),He=Ae(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,Ye,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,O.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),G(i.TEXTURE_CUBE_MAP,_,pe);for(let oe=0;oe<6;oe++)if(o&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)ge(O.__webglFramebuffer[oe][he],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else ge(O.__webglFramebuffer[oe],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);y(_,pe)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const oe=b.texture;for(let he=0,Me=oe.length;he<Me;he++){const Ue=oe[he],$=n.get(Ue);t.bindTexture(i.TEXTURE_2D,$.__webglTexture),G(i.TEXTURE_2D,Ue,pe),ge(O.__webglFramebuffer,b,Ue,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),y(Ue,pe)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?oe=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,J.__webglTexture),G(oe,_,pe),o&&_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)ge(O.__webglFramebuffer[he],b,_,i.COLOR_ATTACHMENT0,oe,he);else ge(O.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,oe,0);y(_,pe)&&x(oe),t.unbindTexture()}b.depthBuffer&&be(b)}function _t(b){const _=m(b)||o,O=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let J=0,K=O.length;J<K;J++){const Q=O[J];if(y(Q,_)){const pe=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,oe=n.get(Q).__webglTexture;t.bindTexture(pe,oe),x(pe),t.unbindTexture()}}}function xe(b){if(o&&b.samples>0&&fe(b)===!1){const _=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],O=b.width,J=b.height;let K=i.COLOR_BUFFER_BIT;const Q=[],pe=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(b),he=b.isWebGLMultipleRenderTargets===!0;if(he)for(let Me=0;Me<_.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Me=0;Me<_.length;Me++){Q.push(i.COLOR_ATTACHMENT0+Me),b.depthBuffer&&Q.push(pe);const Ue=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Ue===!1&&(b.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Me]),Ue===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[pe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[pe])),he){const $=n.get(_[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$,0)}i.blitFramebuffer(0,0,O,J,0,0,O,J,K,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Me=0;Me<_.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,oe.__webglColorRenderbuffer[Me]);const Ue=n.get(_[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,Ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Ae(b){return Math.min(s.maxSamples,b.samples)}function fe(b){const _=n.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Je(b){const _=a.render.frame;d.get(b)!==_&&(d.set(b,_),b.update())}function De(b,_){const O=b.colorSpace,J=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===rr||O!==an&&O!==Ft&&(qe.getTransfer(O)===Ze?o===!1?e.has("EXT_sRGB")===!0&&J===zt?(b.format=rr,b.minFilter=wt,b.generateMipmaps=!1):_=zo.sRGBToLinear(_):(J!==zt||K!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),_}this.allocateTextureUnit=L,this.resetTextureUnits=se,this.setTexture2D=V,this.setTexture2DArray=X,this.setTexture3D=W,this.setTextureCube=z,this.rebindTextures=Ve,this.setupRenderTarget=D,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=fe}function qp(i,e,t){const n=t.isWebGL2;function s(r,a=Ft){let o;const l=qe.getTransfer(a);if(r===gn)return i.UNSIGNED_BYTE;if(r===No)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Do)return i.UNSIGNED_SHORT_5_5_5_1;if(r===mc)return i.BYTE;if(r===gc)return i.SHORT;if(r===fr)return i.UNSIGNED_SHORT;if(r===Po)return i.INT;if(r===fn)return i.UNSIGNED_INT;if(r===pn)return i.FLOAT;if(r===Ei)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===vc)return i.ALPHA;if(r===zt)return i.RGBA;if(r===_c)return i.LUMINANCE;if(r===xc)return i.LUMINANCE_ALPHA;if(r===Ln)return i.DEPTH_COMPONENT;if(r===si)return i.DEPTH_STENCIL;if(r===rr)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Ec)return i.RED;if(r===Uo)return i.RED_INTEGER;if(r===Sc)return i.RG;if(r===Oo)return i.RG_INTEGER;if(r===Fo)return i.RGBA_INTEGER;if(r===Ss||r===Ms||r===bs||r===ys)if(l===Ze)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ss)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ms)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===bs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ys)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ss)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ms)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===bs)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ys)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Jr||r===Qr||r===ea||r===ta)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Jr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Qr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ea)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ta)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ko)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===na||r===ia)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===na)return l===Ze?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ia)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===sa||r===ra||r===aa||r===oa||r===la||r===ca||r===da||r===ha||r===ua||r===fa||r===pa||r===ma||r===ga||r===va)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===sa)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ra)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===aa)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===oa)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===la)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ca)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===da)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ha)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ua)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===fa)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===pa)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ma)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ga)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===va)return l===Ze?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ts||r===_a||r===xa)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Ts)return l===Ze?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===_a)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===xa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Mc||r===Ea||r===Sa||r===Ma)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Ts)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Ea)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Sa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ma)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===In?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class $p extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class es extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jp={type:"move"};class $s{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new es,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new es,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new es,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),u=this._getHandJoint(c,g);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&f>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new es;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Kp extends oi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,f=null,p=null,v=null;const g=t.getContextAttributes();let m=null,u=null;const y=[],x=[],w=new Ge;let R=null;const I=new Rt;I.layers.enable(1),I.viewport=new ut;const C=new Rt;C.layers.enable(2),C.viewport=new ut;const q=[I,C],M=new $p;M.layers.enable(1),M.layers.enable(2);let T=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let Y=y[G];return Y===void 0&&(Y=new $s,y[G]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(G){let Y=y[G];return Y===void 0&&(Y=new $s,y[G]=Y),Y.getGripSpace()},this.getHand=function(G){let Y=y[G];return Y===void 0&&(Y=new $s,y[G]=Y),Y.getHandSpace()};function j(G){const Y=x.indexOf(G.inputSource);if(Y===-1)return;const le=y[Y];le!==void 0&&(le.update(G.inputSource,G.frame,c||a),le.dispatchEvent({type:G.type,data:G.inputSource}))}function se(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",se),s.removeEventListener("inputsourceschange",L);for(let G=0;G<y.length;G++){const Y=x[G];Y!==null&&(x[G]=null,y[G].disconnect(Y))}T=null,H=null,e.setRenderTarget(m),p=null,f=null,h=null,s=null,u=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",se),s.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(w),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Y={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,Y),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),u=new Nn(p.framebufferWidth,p.framebufferHeight,{format:zt,type:gn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let Y=null,le=null,ve=null;g.depth&&(ve=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=g.stencil?si:Ln,le=g.stencil?In:fn);const ge={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),u=new Nn(f.textureWidth,f.textureHeight,{format:zt,type:gn,depthTexture:new tl(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Ie=e.properties.get(u);Ie.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),de.setContext(s),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(G){for(let Y=0;Y<G.removed.length;Y++){const le=G.removed[Y],ve=x.indexOf(le);ve>=0&&(x[ve]=null,y[ve].disconnect(le))}for(let Y=0;Y<G.added.length;Y++){const le=G.added[Y];let ve=x.indexOf(le);if(ve===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=x.length){x.push(le),ve=Ie;break}else if(x[Ie]===null){x[Ie]=le,ve=Ie;break}if(ve===-1)break}const ge=y[ve];ge&&ge.connect(le)}}const k=new N,V=new N;function X(G,Y,le){k.setFromMatrixPosition(Y.matrixWorld),V.setFromMatrixPosition(le.matrixWorld);const ve=k.distanceTo(V),ge=Y.projectionMatrix.elements,Ie=le.projectionMatrix.elements,Re=ge[14]/(ge[10]-1),be=ge[14]/(ge[10]+1),Ve=(ge[9]+1)/ge[5],D=(ge[9]-1)/ge[5],_t=(ge[8]-1)/ge[0],xe=(Ie[8]+1)/Ie[0],Ae=Re*_t,fe=Re*xe,Je=ve/(-_t+xe),De=Je*-_t;Y.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(De),G.translateZ(Je),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const b=Re+Je,_=be+Je,O=Ae-De,J=fe+(ve-De),K=Ve*be/_*b,Q=D*be/_*b;G.projectionMatrix.makePerspective(O,J,K,Q,b,_),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function W(G,Y){Y===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(Y.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;M.near=C.near=I.near=G.near,M.far=C.far=I.far=G.far,(T!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,H=M.far);const Y=G.parent,le=M.cameras;W(M,Y);for(let ve=0;ve<le.length;ve++)W(le[ve],Y);le.length===2?X(M,I,C):M.projectionMatrix.copy(I.projectionMatrix),z(G,M,Y)};function z(G,Y,le){le===null?G.matrix.copy(Y.matrixWorld):(G.matrix.copy(le.matrixWorld),G.matrix.invert(),G.matrix.multiply(Y.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Si*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)};let Z=null;function ee(G,Y){if(d=Y.getViewerPose(c||a),v=Y,d!==null){const le=d.views;p!==null&&(e.setRenderTargetFramebuffer(u,p.framebuffer),e.setRenderTarget(u));let ve=!1;le.length!==M.cameras.length&&(M.cameras.length=0,ve=!0);for(let ge=0;ge<le.length;ge++){const Ie=le[ge];let Re=null;if(p!==null)Re=p.getViewport(Ie);else{const Ve=h.getViewSubImage(f,Ie);Re=Ve.viewport,ge===0&&(e.setRenderTargetTextures(u,Ve.colorTexture,f.ignoreDepthValues?void 0:Ve.depthStencilTexture),e.setRenderTarget(u))}let be=q[ge];be===void 0&&(be=new Rt,be.layers.enable(ge),be.viewport=new ut,q[ge]=be),be.matrix.fromArray(Ie.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Ie.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Re.x,Re.y,Re.width,Re.height),ge===0&&(M.matrix.copy(be.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ve===!0&&M.cameras.push(be)}}for(let le=0;le<y.length;le++){const ve=x[le],ge=y[le];ve!==null&&ge!==void 0&&ge.update(ve,Y,c||a)}Z&&Z(G,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),v=null}const de=new Qo;de.setAnimationLoop(ee),this.setAnimationLoop=function(G){Z=G},this.dispose=function(){}}}function Zp(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,Ko(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,y,x,w){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),h(m,u)):u.isMeshPhongMaterial?(r(m,u),d(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,w)):u.isMeshMatcapMaterial?(r(m,u),v(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),g(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,y,x):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===At&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===At&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const y=e.get(u).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap){m.lightMap.value=u.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=u.lightMapIntensity*x,t(u.lightMap,m.lightMapTransform)}u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,y,x){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*y,m.scale.value=x*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),e.get(u).envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,y){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===At&&m.clearcoatNormalScale.value.negate())),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,u){u.matcap&&(m.matcap.value=u.matcap)}function g(m,u){const y=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Jp(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,x){const w=x.program;n.uniformBlockBinding(y,w)}function c(y,x){let w=s[y.id];w===void 0&&(v(y),w=d(y),s[y.id]=w,y.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(y,R);const I=e.render.frame;r[y.id]!==I&&(f(y),r[y.id]=I)}function d(y){const x=h();y.__bindingPointIndex=x;const w=i.createBuffer(),R=y.__size,I=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,R,I),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,w),w}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const x=s[y.id],w=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let I=0,C=w.length;I<C;I++){const q=Array.isArray(w[I])?w[I]:[w[I]];for(let M=0,T=q.length;M<T;M++){const H=q[M];if(p(H,I,M,R)===!0){const j=H.__offset,se=Array.isArray(H.value)?H.value:[H.value];let L=0;for(let k=0;k<se.length;k++){const V=se[k],X=g(V);typeof V=="number"||typeof V=="boolean"?(H.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,j+L,H.__data)):V.isMatrix3?(H.__data[0]=V.elements[0],H.__data[1]=V.elements[1],H.__data[2]=V.elements[2],H.__data[3]=0,H.__data[4]=V.elements[3],H.__data[5]=V.elements[4],H.__data[6]=V.elements[5],H.__data[7]=0,H.__data[8]=V.elements[6],H.__data[9]=V.elements[7],H.__data[10]=V.elements[8],H.__data[11]=0):(V.toArray(H.__data,L),L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,j,H.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,x,w,R){const I=y.value,C=x+"_"+w;if(R[C]===void 0)return typeof I=="number"||typeof I=="boolean"?R[C]=I:R[C]=I.clone(),!0;{const q=R[C];if(typeof I=="number"||typeof I=="boolean"){if(q!==I)return R[C]=I,!0}else if(q.equals(I)===!1)return q.copy(I),!0}return!1}function v(y){const x=y.uniforms;let w=0;const R=16;for(let C=0,q=x.length;C<q;C++){const M=Array.isArray(x[C])?x[C]:[x[C]];for(let T=0,H=M.length;T<H;T++){const j=M[T],se=Array.isArray(j.value)?j.value:[j.value];for(let L=0,k=se.length;L<k;L++){const V=se[L],X=g(V),W=w%R;W!==0&&R-W<X.boundary&&(w+=R-W),j.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=w,w+=X.storage}}}const I=w%R;return I>0&&(w+=R-I),y.__size=w,y.__cache={},this}function g(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const w=a.indexOf(x.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function u(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:u}}class Sr{constructor(e={}){const{canvas:t=qc(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const u=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rt,this._useLegacyLights=!1,this.toneMapping=sn,this.toneMappingExposure=1;const x=this;let w=!1,R=0,I=0,C=null,q=-1,M=null;const T=new ut,H=new ut;let j=null;const se=new ze(0);let L=0,k=t.width,V=t.height,X=1,W=null,z=null;const Z=new ut(0,0,k,V),ee=new ut(0,0,k,V);let de=!1;const G=new _r;let Y=!1,le=!1,ve=null;const ge=new at,Ie=new Ge,Re=new N,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ve(){return C===null?X:1}let D=n;function _t(S,P){for(let F=0;F<S.length;F++){const B=S[F],U=t.getContext(B,P);if(U!==null)return U}return null}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ur}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",A,!1),t.addEventListener("webglcontextcreationerror",re,!1),D===null){const P=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&P.shift(),D=_t(P,S),D===null)throw _t(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let xe,Ae,fe,Je,De,b,_,O,J,K,Q,pe,oe,he,Me,Ue,$,Ye,He,we,_e,ue,Pe,Xe;function et(){xe=new lf(D),Ae=new tf(D,xe,e),xe.init(Ae),ue=new qp(D,xe,Ae),fe=new Xp(D,xe,Ae),Je=new hf(D),De=new Rp,b=new Yp(D,xe,fe,De,Ae,ue,Je),_=new sf(x),O=new of(x),J=new _d(D,Ae),Pe=new Qu(D,xe,J,Ae),K=new cf(D,J,Je,Pe),Q=new mf(D,K,J,Je),He=new pf(D,Ae,b),Ue=new nf(De),pe=new Lp(x,_,O,xe,Ae,Pe,Ue),oe=new Zp(x,De),he=new Np,Me=new Bp(xe,Ae),Ye=new Ju(x,_,O,fe,Q,f,l),$=new Wp(x,Q,Ae),Xe=new Jp(D,Je,Ae,fe),we=new ef(D,xe,Je,Ae),_e=new df(D,xe,Je,Ae),Je.programs=pe.programs,x.capabilities=Ae,x.extensions=xe,x.properties=De,x.renderLists=he,x.shadowMap=$,x.state=fe,x.info=Je}et();const Fe=new Kp(x,D);this.xr=Fe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=xe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=xe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(S){S!==void 0&&(X=S,this.setSize(k,V,!1))},this.getSize=function(S){return S.set(k,V)},this.setSize=function(S,P,F=!0){if(Fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=S,V=P,t.width=Math.floor(S*X),t.height=Math.floor(P*X),F===!0&&(t.style.width=S+"px",t.style.height=P+"px"),this.setViewport(0,0,S,P)},this.getDrawingBufferSize=function(S){return S.set(k*X,V*X).floor()},this.setDrawingBufferSize=function(S,P,F){k=S,V=P,X=F,t.width=Math.floor(S*F),t.height=Math.floor(P*F),this.setViewport(0,0,S,P)},this.getCurrentViewport=function(S){return S.copy(T)},this.getViewport=function(S){return S.copy(Z)},this.setViewport=function(S,P,F,B){S.isVector4?Z.set(S.x,S.y,S.z,S.w):Z.set(S,P,F,B),fe.viewport(T.copy(Z).multiplyScalar(X).floor())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,P,F,B){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,P,F,B),fe.scissor(H.copy(ee).multiplyScalar(X).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(S){fe.setScissorTest(de=S)},this.setOpaqueSort=function(S){W=S},this.setTransparentSort=function(S){z=S},this.getClearColor=function(S){return S.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(S=!0,P=!0,F=!0){let B=0;if(S){let U=!1;if(C!==null){const ce=C.texture.format;U=ce===Fo||ce===Oo||ce===Uo}if(U){const ce=C.texture.type,me=ce===gn||ce===fn||ce===fr||ce===In||ce===No||ce===Do,Se=Ye.getClearColor(),Te=Ye.getClearAlpha(),Oe=Se.r,Ce=Se.g,Le=Se.b;me?(p[0]=Oe,p[1]=Ce,p[2]=Le,p[3]=Te,D.clearBufferuiv(D.COLOR,0,p)):(v[0]=Oe,v[1]=Ce,v[2]=Le,v[3]=Te,D.clearBufferiv(D.COLOR,0,v))}else B|=D.COLOR_BUFFER_BIT}P&&(B|=D.DEPTH_BUFFER_BIT),F&&(B|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",A,!1),t.removeEventListener("webglcontextcreationerror",re,!1),he.dispose(),Me.dispose(),De.dispose(),_.dispose(),O.dispose(),Q.dispose(),Pe.dispose(),Xe.dispose(),pe.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",xt),Fe.removeEventListener("sessionend",Ke),ve&&(ve.dispose(),ve=null),Et.stop()};function ne(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function A(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const S=Je.autoReset,P=$.enabled,F=$.autoUpdate,B=$.needsUpdate,U=$.type;et(),Je.autoReset=S,$.enabled=P,$.autoUpdate=F,$.needsUpdate=B,$.type=U}function re(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const P=S.target;P.removeEventListener("dispose",ae),ye(P)}function ye(S){Ee(S),De.remove(S)}function Ee(S){const P=De.get(S).programs;P!==void 0&&(P.forEach(function(F){pe.releaseProgram(F)}),S.isShaderMaterial&&pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,P,F,B,U,ce){P===null&&(P=be);const me=U.isMesh&&U.matrixWorld.determinant()<0,Se=Sl(S,P,F,B,U);fe.setMaterial(B,me);let Te=F.index,Oe=1;if(B.wireframe===!0){if(Te=K.getWireframeAttribute(F),Te===void 0)return;Oe=2}const Ce=F.drawRange,Le=F.attributes.position;let it=Ce.start*Oe,Ct=(Ce.start+Ce.count)*Oe;ce!==null&&(it=Math.max(it,ce.start*Oe),Ct=Math.min(Ct,(ce.start+ce.count)*Oe)),Te!==null?(it=Math.max(it,0),Ct=Math.min(Ct,Te.count)):Le!=null&&(it=Math.max(it,0),Ct=Math.min(Ct,Le.count));const dt=Ct-it;if(dt<0||dt===1/0)return;Pe.setup(U,B,Se,F,Te);let jt,Qe=we;if(Te!==null&&(jt=J.get(Te),Qe=_e,Qe.setIndex(jt)),U.isMesh)B.wireframe===!0?(fe.setLineWidth(B.wireframeLinewidth*Ve()),Qe.setMode(D.LINES)):Qe.setMode(D.TRIANGLES);else if(U.isLine){let ke=B.linewidth;ke===void 0&&(ke=1),fe.setLineWidth(ke*Ve()),U.isLineSegments?Qe.setMode(D.LINES):U.isLineLoop?Qe.setMode(D.LINE_LOOP):Qe.setMode(D.LINE_STRIP)}else U.isPoints?Qe.setMode(D.POINTS):U.isSprite&&Qe.setMode(D.TRIANGLES);if(U.isBatchedMesh)Qe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)Qe.renderInstances(it,dt,U.count);else if(F.isInstancedBufferGeometry){const ke=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,gs=Math.min(F.instanceCount,ke);Qe.renderInstances(it,dt,gs)}else Qe.render(it,dt)};function $e(S,P,F){S.transparent===!0&&S.side===Yt&&S.forceSinglePass===!1?(S.side=At,S.needsUpdate=!0,Ri(S,P,F),S.side=vn,S.needsUpdate=!0,Ri(S,P,F),S.side=Yt):Ri(S,P,F)}this.compile=function(S,P,F=null){F===null&&(F=S),m=Me.get(F),m.init(),y.push(m),F.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),S!==F&&S.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights(x._useLegacyLights);const B=new Set;return S.traverse(function(U){const ce=U.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const Se=ce[me];$e(Se,F,U),B.add(Se)}else $e(ce,F,U),B.add(ce)}),y.pop(),m=null,B},this.compileAsync=function(S,P,F=null){const B=this.compile(S,P,F);return new Promise(U=>{function ce(){if(B.forEach(function(me){De.get(me).currentProgram.isReady()&&B.delete(me)}),B.size===0){U(S);return}setTimeout(ce,10)}xe.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let je=null;function ct(S){je&&je(S)}function xt(){Et.stop()}function Ke(){Et.start()}const Et=new Qo;Et.setAnimationLoop(ct),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(S){je=S,Fe.setAnimationLoop(S),S===null?Et.stop():Et.start()},Fe.addEventListener("sessionstart",xt),Fe.addEventListener("sessionend",Ke),this.render=function(S,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(P),P=Fe.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,P,C),m=Me.get(S,y.length),m.init(),y.push(m),ge.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),G.setFromProjectionMatrix(ge),le=this.localClippingEnabled,Y=Ue.init(this.clippingPlanes,le),g=he.get(S,u.length),g.init(),u.push(g),Wt(S,P,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(W,z),this.info.render.frame++,Y===!0&&Ue.beginShadows();const F=m.state.shadowsArray;if($.render(F,S,P),Y===!0&&Ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(g,S),m.setupLights(x._useLegacyLights),P.isArrayCamera){const B=P.cameras;for(let U=0,ce=B.length;U<ce;U++){const me=B[U];Pr(g,S,me,me.viewport)}}else Pr(g,S,P);C!==null&&(b.updateMultisampleRenderTarget(C),b.updateRenderTargetMipmap(C)),S.isScene===!0&&S.onAfterRender(x,S,P),Pe.resetDefaultState(),q=-1,M=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,u.pop(),u.length>0?g=u[u.length-1]:g=null};function Wt(S,P,F,B){if(S.visible===!1)return;if(S.layers.test(P.layers)){if(S.isGroup)F=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(P);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||G.intersectsSprite(S)){B&&Re.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);const me=Q.update(S),Se=S.material;Se.visible&&g.push(S,me,Se,F,Re.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||G.intersectsObject(S))){const me=Q.update(S),Se=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Re.copy(S.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Re.copy(me.boundingSphere.center)),Re.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(Se)){const Te=me.groups;for(let Oe=0,Ce=Te.length;Oe<Ce;Oe++){const Le=Te[Oe],it=Se[Le.materialIndex];it&&it.visible&&g.push(S,me,it,F,Re.z,Le)}}else Se.visible&&g.push(S,me,Se,F,Re.z,null)}}const ce=S.children;for(let me=0,Se=ce.length;me<Se;me++)Wt(ce[me],P,F,B)}function Pr(S,P,F,B){const U=S.opaque,ce=S.transmissive,me=S.transparent;m.setupLightsView(F),Y===!0&&Ue.setGlobalState(x.clippingPlanes,F),ce.length>0&&El(U,ce,P,F),B&&fe.viewport(T.copy(B)),U.length>0&&Li(U,P,F),ce.length>0&&Li(ce,P,F),me.length>0&&Li(me,P,F),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function El(S,P,F,B){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;const ce=Ae.isWebGL2;ve===null&&(ve=new Nn(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?Ei:gn,minFilter:Rn,samples:ce?4:0})),x.getDrawingBufferSize(Ie),ce?ve.setSize(Ie.x,Ie.y):ve.setSize(cs(Ie.x),cs(Ie.y));const me=x.getRenderTarget();x.setRenderTarget(ve),x.getClearColor(se),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=sn,Li(S,F,B),b.updateMultisampleRenderTarget(ve),b.updateRenderTargetMipmap(ve);let Te=!1;for(let Oe=0,Ce=P.length;Oe<Ce;Oe++){const Le=P[Oe],it=Le.object,Ct=Le.geometry,dt=Le.material,jt=Le.group;if(dt.side===Yt&&it.layers.test(B.layers)){const Qe=dt.side;dt.side=At,dt.needsUpdate=!0,Nr(it,F,B,Ct,dt,jt),dt.side=Qe,dt.needsUpdate=!0,Te=!0}}Te===!0&&(b.updateMultisampleRenderTarget(ve),b.updateRenderTargetMipmap(ve)),x.setRenderTarget(me),x.setClearColor(se,L),x.toneMapping=Se}function Li(S,P,F){const B=P.isScene===!0?P.overrideMaterial:null;for(let U=0,ce=S.length;U<ce;U++){const me=S[U],Se=me.object,Te=me.geometry,Oe=B===null?me.material:B,Ce=me.group;Se.layers.test(F.layers)&&Nr(Se,P,F,Te,Oe,Ce)}}function Nr(S,P,F,B,U,ce){S.onBeforeRender(x,P,F,B,U,ce),S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(x,P,F,B,S,ce),U.transparent===!0&&U.side===Yt&&U.forceSinglePass===!1?(U.side=At,U.needsUpdate=!0,x.renderBufferDirect(F,P,B,U,S,ce),U.side=vn,U.needsUpdate=!0,x.renderBufferDirect(F,P,B,U,S,ce),U.side=Yt):x.renderBufferDirect(F,P,B,U,S,ce),S.onAfterRender(x,P,F,B,U,ce)}function Ri(S,P,F){P.isScene!==!0&&(P=be);const B=De.get(S),U=m.state.lights,ce=m.state.shadowsArray,me=U.state.version,Se=pe.getParameters(S,U.state,ce,P,F),Te=pe.getProgramCacheKey(Se);let Oe=B.programs;B.environment=S.isMeshStandardMaterial?P.environment:null,B.fog=P.fog,B.envMap=(S.isMeshStandardMaterial?O:_).get(S.envMap||B.environment),Oe===void 0&&(S.addEventListener("dispose",ae),Oe=new Map,B.programs=Oe);let Ce=Oe.get(Te);if(Ce!==void 0){if(B.currentProgram===Ce&&B.lightsStateVersion===me)return Ur(S,Se),Ce}else Se.uniforms=pe.getUniforms(S),S.onBuild(F,Se,x),S.onBeforeCompile(Se,x),Ce=pe.acquireProgram(Se,Te),Oe.set(Te,Ce),B.uniforms=Se.uniforms;const Le=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Le.clippingPlanes=Ue.uniform),Ur(S,Se),B.needsLights=bl(S),B.lightsStateVersion=me,B.needsLights&&(Le.ambientLightColor.value=U.state.ambient,Le.lightProbe.value=U.state.probe,Le.directionalLights.value=U.state.directional,Le.directionalLightShadows.value=U.state.directionalShadow,Le.spotLights.value=U.state.spot,Le.spotLightShadows.value=U.state.spotShadow,Le.rectAreaLights.value=U.state.rectArea,Le.ltc_1.value=U.state.rectAreaLTC1,Le.ltc_2.value=U.state.rectAreaLTC2,Le.pointLights.value=U.state.point,Le.pointLightShadows.value=U.state.pointShadow,Le.hemisphereLights.value=U.state.hemi,Le.directionalShadowMap.value=U.state.directionalShadowMap,Le.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Le.spotShadowMap.value=U.state.spotShadowMap,Le.spotLightMatrix.value=U.state.spotLightMatrix,Le.spotLightMap.value=U.state.spotLightMap,Le.pointShadowMap.value=U.state.pointShadowMap,Le.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=Ce,B.uniformsList=null,Ce}function Dr(S){if(S.uniformsList===null){const P=S.currentProgram.getUniforms();S.uniformsList=is.seqWithValue(P.seq,S.uniforms)}return S.uniformsList}function Ur(S,P){const F=De.get(S);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function Sl(S,P,F,B,U){P.isScene!==!0&&(P=be),b.resetTextureUnits();const ce=P.fog,me=B.isMeshStandardMaterial?P.environment:null,Se=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:an,Te=(B.isMeshStandardMaterial?O:_).get(B.envMap||me),Oe=B.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ce=!!F.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Le=!!F.morphAttributes.position,it=!!F.morphAttributes.normal,Ct=!!F.morphAttributes.color;let dt=sn;B.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(dt=x.toneMapping);const jt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Qe=jt!==void 0?jt.length:0,ke=De.get(B),gs=m.state.lights;if(Y===!0&&(le===!0||S!==M)){const Ut=S===M&&B.id===q;Ue.setState(B,S,Ut)}let tt=!1;B.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==gs.state.version||ke.outputColorSpace!==Se||U.isBatchedMesh&&ke.batching===!1||!U.isBatchedMesh&&ke.batching===!0||U.isInstancedMesh&&ke.instancing===!1||!U.isInstancedMesh&&ke.instancing===!0||U.isSkinnedMesh&&ke.skinning===!1||!U.isSkinnedMesh&&ke.skinning===!0||U.isInstancedMesh&&ke.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&ke.instancingColor===!1&&U.instanceColor!==null||ke.envMap!==Te||B.fog===!0&&ke.fog!==ce||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Ue.numPlanes||ke.numIntersection!==Ue.numIntersection)||ke.vertexAlphas!==Oe||ke.vertexTangents!==Ce||ke.morphTargets!==Le||ke.morphNormals!==it||ke.morphColors!==Ct||ke.toneMapping!==dt||Ae.isWebGL2===!0&&ke.morphTargetsCount!==Qe)&&(tt=!0):(tt=!0,ke.__version=B.version);let _n=ke.currentProgram;tt===!0&&(_n=Ri(B,P,U));let Or=!1,hi=!1,vs=!1;const ft=_n.getUniforms(),xn=ke.uniforms;if(fe.useProgram(_n.program)&&(Or=!0,hi=!0,vs=!0),B.id!==q&&(q=B.id,hi=!0),Or||M!==S){ft.setValue(D,"projectionMatrix",S.projectionMatrix),ft.setValue(D,"viewMatrix",S.matrixWorldInverse);const Ut=ft.map.cameraPosition;Ut!==void 0&&Ut.setValue(D,Re.setFromMatrixPosition(S.matrixWorld)),Ae.logarithmicDepthBuffer&&ft.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ft.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,hi=!0,vs=!0)}if(U.isSkinnedMesh){ft.setOptional(D,U,"bindMatrix"),ft.setOptional(D,U,"bindMatrixInverse");const Ut=U.skeleton;Ut&&(Ae.floatVertexTextures?(Ut.boneTexture===null&&Ut.computeBoneTexture(),ft.setValue(D,"boneTexture",Ut.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}U.isBatchedMesh&&(ft.setOptional(D,U,"batchingTexture"),ft.setValue(D,"batchingTexture",U._matricesTexture,b));const _s=F.morphAttributes;if((_s.position!==void 0||_s.normal!==void 0||_s.color!==void 0&&Ae.isWebGL2===!0)&&He.update(U,F,_n),(hi||ke.receiveShadow!==U.receiveShadow)&&(ke.receiveShadow=U.receiveShadow,ft.setValue(D,"receiveShadow",U.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(xn.envMap.value=Te,xn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),hi&&(ft.setValue(D,"toneMappingExposure",x.toneMappingExposure),ke.needsLights&&Ml(xn,vs),ce&&B.fog===!0&&oe.refreshFogUniforms(xn,ce),oe.refreshMaterialUniforms(xn,B,X,V,ve),is.upload(D,Dr(ke),xn,b)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(is.upload(D,Dr(ke),xn,b),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ft.setValue(D,"center",U.center),ft.setValue(D,"modelViewMatrix",U.modelViewMatrix),ft.setValue(D,"normalMatrix",U.normalMatrix),ft.setValue(D,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Ut=B.uniformsGroups;for(let xs=0,yl=Ut.length;xs<yl;xs++)if(Ae.isWebGL2){const Fr=Ut[xs];Xe.update(Fr,_n),Xe.bind(Fr,_n)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return _n}function Ml(S,P){S.ambientLightColor.needsUpdate=P,S.lightProbe.needsUpdate=P,S.directionalLights.needsUpdate=P,S.directionalLightShadows.needsUpdate=P,S.pointLights.needsUpdate=P,S.pointLightShadows.needsUpdate=P,S.spotLights.needsUpdate=P,S.spotLightShadows.needsUpdate=P,S.rectAreaLights.needsUpdate=P,S.hemisphereLights.needsUpdate=P}function bl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(S,P,F){De.get(S.texture).__webglTexture=P,De.get(S.depthTexture).__webglTexture=F;const B=De.get(S);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=F===void 0,B.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,P){const F=De.get(S);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(S,P=0,F=0){C=S,R=P,I=F;let B=!0,U=null,ce=!1,me=!1;if(S){const Te=De.get(S);Te.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(D.FRAMEBUFFER,null),B=!1):Te.__webglFramebuffer===void 0?b.setupRenderTarget(S):Te.__hasExternalTextures&&b.rebindTextures(S,De.get(S.texture).__webglTexture,De.get(S.depthTexture).__webglTexture);const Oe=S.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(me=!0);const Ce=De.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ce[P])?U=Ce[P][F]:U=Ce[P],ce=!0):Ae.isWebGL2&&S.samples>0&&b.useMultisampledRTT(S)===!1?U=De.get(S).__webglMultisampledFramebuffer:Array.isArray(Ce)?U=Ce[F]:U=Ce,T.copy(S.viewport),H.copy(S.scissor),j=S.scissorTest}else T.copy(Z).multiplyScalar(X).floor(),H.copy(ee).multiplyScalar(X).floor(),j=de;if(fe.bindFramebuffer(D.FRAMEBUFFER,U)&&Ae.drawBuffers&&B&&fe.drawBuffers(S,U),fe.viewport(T),fe.scissor(H),fe.setScissorTest(j),ce){const Te=De.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,Te.__webglTexture,F)}else if(me){const Te=De.get(S.texture),Oe=P||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Te.__webglTexture,F||0,Oe)}q=-1},this.readRenderTargetPixels=function(S,P,F,B,U,ce,me){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=De.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){fe.bindFramebuffer(D.FRAMEBUFFER,Se);try{const Te=S.texture,Oe=Te.format,Ce=Te.type;if(Oe!==zt&&ue.convert(Oe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Ce===Ei&&(xe.has("EXT_color_buffer_half_float")||Ae.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Ce!==gn&&ue.convert(Ce)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ce===pn&&(Ae.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=S.width-B&&F>=0&&F<=S.height-U&&D.readPixels(P,F,B,U,ue.convert(Oe),ue.convert(Ce),ce)}finally{const Te=C!==null?De.get(C).__webglFramebuffer:null;fe.bindFramebuffer(D.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(S,P,F=0){const B=Math.pow(2,-F),U=Math.floor(P.image.width*B),ce=Math.floor(P.image.height*B);b.setTexture2D(P,0),D.copyTexSubImage2D(D.TEXTURE_2D,F,0,0,S.x,S.y,U,ce),fe.unbindTexture()},this.copyTextureToTexture=function(S,P,F,B=0){const U=P.image.width,ce=P.image.height,me=ue.convert(F.format),Se=ue.convert(F.type);b.setTexture2D(F,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment),P.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,B,S.x,S.y,U,ce,me,Se,P.image.data):P.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,B,S.x,S.y,P.mipmaps[0].width,P.mipmaps[0].height,me,P.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,B,S.x,S.y,me,Se,P.image),B===0&&F.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(S,P,F,B,U=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=S.max.x-S.min.x+1,me=S.max.y-S.min.y+1,Se=S.max.z-S.min.z+1,Te=ue.convert(B.format),Oe=ue.convert(B.type);let Ce;if(B.isData3DTexture)b.setTexture3D(B,0),Ce=D.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)b.setTexture2DArray(B,0),Ce=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,B.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,B.unpackAlignment);const Le=D.getParameter(D.UNPACK_ROW_LENGTH),it=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ct=D.getParameter(D.UNPACK_SKIP_PIXELS),dt=D.getParameter(D.UNPACK_SKIP_ROWS),jt=D.getParameter(D.UNPACK_SKIP_IMAGES),Qe=F.isCompressedTexture?F.mipmaps[U]:F.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,Qe.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Qe.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,S.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,S.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,S.min.z),F.isDataTexture||F.isData3DTexture?D.texSubImage3D(Ce,U,P.x,P.y,P.z,ce,me,Se,Te,Oe,Qe.data):F.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Ce,U,P.x,P.y,P.z,ce,me,Se,Te,Qe.data)):D.texSubImage3D(Ce,U,P.x,P.y,P.z,ce,me,Se,Te,Oe,Qe),D.pixelStorei(D.UNPACK_ROW_LENGTH,Le),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,it),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ct),D.pixelStorei(D.UNPACK_SKIP_ROWS,dt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,jt),U===0&&B.generateMipmaps&&D.generateMipmap(Ce),fe.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){R=0,I=0,C=null,fe.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===pr?"display-p3":"srgb",t.unpackColorSpace=qe.workingColorSpace===hs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===rt?rn:Bo}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===rn?rt:an}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Qp extends Sr{}Qp.prototype.isWebGL1Renderer=!0;class ol extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class uo extends Tt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mr extends on{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new N,d=new Ge;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const p=n+h/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(a[f]/e+1)/2,d.y=(a[f+1]/e+1)/2,l.push(d.x,d.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Dt(a,3)),this.setAttribute("normal",new Dt(o,3)),this.setAttribute("uv",new Dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ps extends on{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new N,f=new N,p=[],v=[],g=[],m=[];for(let u=0;u<=n;u++){const y=[],x=u/n;let w=0;u===0&&a===0?w=.5/t:u===n&&l===Math.PI&&(w=-.5/t);for(let R=0;R<=t;R++){const I=R/t;h.x=-e*Math.cos(s+I*r)*Math.sin(a+x*o),h.y=e*Math.cos(a+x*o),h.z=e*Math.sin(s+I*r)*Math.sin(a+x*o),v.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(I+w,1-x),y.push(c++)}d.push(y)}for(let u=0;u<n;u++)for(let y=0;y<t;y++){const x=d[u][y+1],w=d[u][y],R=d[u+1][y],I=d[u+1][y+1];(u!==0||a>0)&&p.push(x,w,I),(u!==n-1||l<Math.PI)&&p.push(w,R,I)}this.setIndex(p),this.setAttribute("position",new Dt(v,3)),this.setAttribute("normal",new Dt(g,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class em extends Ii{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ho,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const fo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class tm{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,f=c.length;h<f;h+=2){const p=c[h],v=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return v}return null}}}const nm=new tm;class br{constructor(e){this.manager=e!==void 0?e:nm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}br.DEFAULT_MATERIAL_NAME="__DEFAULT";class im extends br{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=fo.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Mi("img");function l(){d(),fo.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){d(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class sm extends br{constructor(e){super(e)}load(e,t,n,s){const r=new Tt,a=new im(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ll extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const js=new at,po=new N,mo=new N;class rm{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _r,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;po.setFromMatrixPosition(e.matrixWorld),t.position.copy(po),mo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(mo),t.updateMatrixWorld(),js.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(js),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(js)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class am extends rm{constructor(){super(new el(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class om extends ll{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new am}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class lm extends ll{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class lr{constructor(e,t,n=0,s=1/0){this.ray=new Yo(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new vr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return cr(e,this,n,t),n.sort(go),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)cr(e[s],this,n,t);return n.sort(go),n}}function go(i,e){return i.distance-e.distance}function cr(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)cr(s[r],e,t,!0)}}class Fg{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(gt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ur}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ur);var ai=(i=>(i.THUMB="thumb",i.PANO_LOW="panoLow",i.PANO="pano",i.VIDEO="video",i.COVER="cover",i.MAP="map",i))(ai||{});function yi(i,e){return!i||typeof i!="string"||i.trim()===""?"":i.trim()}const cm=Object.freeze(Object.defineProperty({__proto__:null,AssetType:ai,resolveAssetUrl:yi},Symbol.toStringTag,{value:"Module"}));var bt=(i=>(i.LOADING_LOW="loadingLow",i.LOW_READY="lowReady",i.LOADING_HIGH="loadingHigh",i.HIGH_READY="highReady",i.DEGRADED="degraded",i.ERROR="error",i))(bt||{});class dm{constructor(){E(this,"element");E(this,"currentStatus","loadingLow");E(this,"autoHideTimer",null);this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){this.currentStatus=e,this.render(),e==="highReady"||e==="lowReady"?(this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.autoHideTimer=window.setTimeout(()=>{this.hide()},3e3)):this.show()}render(){const{text:e,icon:t,className:n}=this.getStatusInfo();this.element.innerHTML=`
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
    `,document.head.appendChild(e)}}function hm(i=512){const e=document.createElement("canvas");e.width=i,e.height=i;const t=e.getContext("2d");if(!t){const d=new uo(e);return d.needsUpdate=!0,d}const n=i/2,s=i/2,r=i/2*.92;t.clearRect(0,0,i,i);const a=t.createRadialGradient(n,s,r*.25,n,s,r);a.addColorStop(0,"rgba(0,0,0,0.00)"),a.addColorStop(.55,"rgba(0,0,0,0.18)"),a.addColorStop(1,"rgba(0,0,0,0.55)"),t.fillStyle=a,t.beginPath(),t.arc(n,s,r,0,Math.PI*2),t.closePath(),t.fill(),t.fillStyle="rgba(0,0,0,0.55)",t.beginPath(),t.arc(n,s,r*.28,0,Math.PI*2),t.closePath(),t.fill();const o=t.createRadialGradient(n,s,0,n,s,r*.42);o.addColorStop(0,"rgba(0,0,0,0.22)"),o.addColorStop(1,"rgba(0,0,0,0.00)"),t.fillStyle=o,t.beginPath(),t.arc(n,s,r*.42,0,Math.PI*2),t.closePath(),t.fill(),t.save(),t.translate(n,s);for(let d=0;d<360;d+=30){const h=d*Math.PI/180,f=d%90===0,p=f?r*.12:r*.07,v=f?2:1;t.strokeStyle=f?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.14)",t.lineWidth=v,t.beginPath(),t.moveTo(Math.sin(h)*(r-p),-Math.cos(h)*(r-p)),t.lineTo(Math.sin(h)*r,-Math.cos(h)*r),t.stroke()}t.restore();const l=(d,h)=>{const f=h*Math.PI/180,p=n+Math.sin(f)*(r*.56),v=s-Math.cos(f)*(r*.56);t.fillStyle="rgba(255,255,255,0.55)",t.font=`600 ${Math.round(i*.06)}px system-ui, -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(d,p,v)};l("N",0),l("E",90),l("S",180),l("W",270),t.strokeStyle="rgba(255,255,255,0.08)",t.lineWidth=2,t.beginPath(),t.arc(n,s,r,0,Math.PI*2),t.closePath(),t.stroke();const c=new uo(e);return c.colorSpace=rt,c.needsUpdate=!0,c}function um(i){return Math.max(0,Math.min(1,i))}function fm(i){const e=um(i);return e*e*(3-2*e)}class pm{constructor(e,t){E(this,"mesh");E(this,"texture");E(this,"radius");E(this,"opacity",0);E(this,"showPitchDeg",-45);E(this,"fadeRangeDeg",18);E(this,"fadeTauMs",140);this.radius=t;const n=t*.18,s=new Mr(n,96);s.rotateX(Math.PI/2),this.texture=hm(512);const r=new bi({map:this.texture,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,side:Yt});this.mesh=new Pt(s,r),this.mesh.position.set(0,-t+.5,0),this.mesh.renderOrder=9999,this.mesh.visible=!1,e.add(this.mesh)}update(e,t,n){const s=Pn.degToRad(t.yaw);this.mesh.rotation.y=-s;const a=fm((this.showPitchDeg-t.pitch)/this.fadeRangeDeg),o=1-Math.exp(-(n||16.7)/this.fadeTauMs);this.opacity=this.opacity+(a-this.opacity)*o;const l=this.mesh.material;l.opacity=this.opacity,this.mesh.visible=this.opacity>.01}dispose(e){e.remove(this.mesh),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.texture.dispose()}}function mm(i,e,t){const n=(i-t.left)/t.width*2-1,s=-((e-t.top)/t.height*2-1);return{x:n,y:s}}function gm(i,e,t,n=500){const s=new lr;s.setFromCamera(new Ge(i,e),t);const r=new ps(n,32,32),a=new Pt(r);a.position.set(0,0,0);const o=s.intersectObject(a);if(o.length===0)return null;const c=o[0].point.normalize(),d=Pn.radToDeg(Math.asin(Math.max(-1,Math.min(1,c.y))));return{yaw:Pn.radToDeg(Math.atan2(c.x,c.z)),pitch:d}}const dr=-55,vm=-90;function yr(i){const e=Math.max(0,Math.min(1,(i-dr)/(vm-dr))),t=e,n=-e*8,s=1-e*.7,r=e*2;return{opacity:t,translateY:n,scaleY:s,blur:r,clarity:e}}function Tr(i){return i<=dr}class _m{constructor(){E(this,"listeners",new Map);E(this,"lastInteractionTs",0);E(this,"idleDelay",800);E(this,"idleTimer",null);E(this,"rafId",null);E(this,"isScheduled",!1);this.listeners.set("user-interacting",new Set),this.listeners.set("user-idle",new Set),this.listeners.set("ui-engaged",new Set)}on(e,t){const n=this.listeners.get(e);return n?(n.add(t),()=>{n.delete(t)}):(console.warn(`[InteractionBus] 未知事件类型: ${e}`),()=>{})}off(e,t){const n=this.listeners.get(e);n&&n.delete(t)}emit(e){this.isScheduled||(this.isScheduled=!0,this.rafId=requestAnimationFrame(()=>{this.isScheduled=!1;const t=this.listeners.get(e);t&&t.forEach(n=>{try{n()}catch(s){console.error("[InteractionBus] 事件监听器执行失败:",s)}})}))}emitInteracting(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("user-interacting")}scheduleIdle(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.idleTimer=window.setTimeout(()=>{Date.now()-this.lastInteractionTs>=this.idleDelay&&(this.idleTimer=null,this.emit("user-idle"))},this.idleDelay)}emitUIEngaged(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("ui-engaged")}dispose(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.listeners.forEach(e=>e.clear()),this.listeners.clear()}}const We=new _m;class xm{constructor(e={}){E(this,"root");E(this,"disk");E(this,"mask");E(this,"polemask");E(this,"northLabel");E(this,"eastLabel");E(this,"southLabel");E(this,"westLabel");E(this,"currentYaw",0);E(this,"currentPitch",0);E(this,"isVisible",!1);E(this,"unsubscribeInteracting",null);E(this,"unsubscribeIdle",null);E(this,"unsubscribeUIEngaged",null);E(this,"baseOpacity",0);this.root=document.createElement("div"),this.root.className="vr-compass",this.disk=document.createElement("div"),this.disk.className="vr-compass__disk",this.mask=document.createElement("div"),this.mask.className="vr-compass__mask",this.polemask=document.createElement("div"),this.polemask.className="vr-compass__polemask",this.polemask.setAttribute("aria-hidden","true"),this.northLabel=document.createElement("div"),this.northLabel.className="vr-compass__label vr-compass__label--north",this.northLabel.textContent="N",this.eastLabel=document.createElement("div"),this.eastLabel.className="vr-compass__label vr-compass__label--east",this.eastLabel.textContent="E",this.southLabel=document.createElement("div"),this.southLabel.className="vr-compass__label vr-compass__label--south",this.southLabel.textContent="S",this.westLabel=document.createElement("div"),this.westLabel.className="vr-compass__label vr-compass__label--west",this.westLabel.textContent="W",this.disk.appendChild(this.mask),this.disk.appendChild(this.polemask),this.disk.appendChild(this.northLabel),this.disk.appendChild(this.eastLabel),this.disk.appendChild(this.southLabel),this.disk.appendChild(this.westLabel),this.root.appendChild(this.disk),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.setupInteractionListeners()}setupInteractionListeners(){this.unsubscribeInteracting=We.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=We.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=We.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}mount(e){e.appendChild(this.root)}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,Tr(t)){const s=yr(t);this.baseOpacity=s.opacity,this.root.style.setProperty("--vr-ground-clarity",String(s.clarity)),this.root.style.opacity=s.opacity.toString();const r=`translateX(-50%) translateY(${s.translateY}px) scaleY(${s.scaleY})`;this.root.classList.contains("vr-ui-interacting")?this.root.style.transform=r:this.root.style.transform=r,this.root.style.setProperty("--vr-ground-base-blur",`${s.blur}px`);const a=-e;this.disk.style.transform=`rotateZ(${a}deg)`,this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1,this.baseOpacity=0)}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}const vo=60;class Em{constructor(e){E(this,"root");E(this,"container");E(this,"dots",new Map);E(this,"currentYaw",0);E(this,"currentPitch",0);E(this,"isVisible",!1);E(this,"museumId");E(this,"currentSceneId");E(this,"sceneHotspots");E(this,"hoverSceneId",null);E(this,"onNavigateToScene");E(this,"unsubscribeFocus");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.sceneHotspots=e.sceneHotspots,this.onNavigateToScene=e.onNavigateToScene||qt,this.root=document.createElement("div"),this.root.className="vr-groundnav",this.container=document.createElement("div"),this.container.className="vr-groundnav__container",this.root.appendChild(this.container),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.unsubscribeFocus=wi(t=>{this.handleSceneFocus(t)}),this.renderDots()}handleSceneFocus(e){e.type==="hover"?this.hoverSceneId=e.sceneId:e.type==="focus"&&(this.currentSceneId=e.sceneId,this.hoverSceneId=null),this.updateDotStates()}updateDotStates(){this.dots.forEach((e,t)=>{e.classList.remove("is-current","is-hover"),t===this.currentSceneId?e.classList.add("is-current"):t===this.hoverSceneId&&e.classList.add("is-hover")})}renderDots(){this.container.innerHTML="",this.dots.clear(),this.sceneHotspots.filter(t=>{var n;return(n=t.target)==null?void 0:n.sceneId}).forEach(t=>{const n=document.createElement("div");n.className="vr-groundnav__dot",n.setAttribute("data-scene-id",t.target.sceneId),n.setAttribute("title",t.label),n.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),Nt({type:"focus",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()}),window.dispatchEvent(new CustomEvent("vr:close-panels")),this.onNavigateToScene(t.target.museumId,t.target.sceneId)}),n.addEventListener("mouseenter",()=>{Nt({type:"hover",museumId:t.target.museumId,sceneId:t.target.sceneId,source:"pano",ts:Date.now()})}),n.addEventListener("mouseleave",()=>{Nt({type:"hover",museumId:t.target.museumId,sceneId:null,source:"pano",ts:Date.now()})}),this.container.appendChild(n),this.dots.set(t.target.sceneId,n)}),this.updateDotStates(),this.updateDotPositions()}updateDotPositions(){this.sceneHotspots.filter(t=>{var n;return(n=t.target)==null?void 0:n.sceneId}).forEach(t=>{const n=this.dots.get(t.target.sceneId);if(!n)return;const s=t.yaw*Math.PI/180,r=Math.sin(s)*vo,a=-Math.cos(s)*vo;n.style.transform=`translate(${r}px, ${a}px)`})}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,Tr(t)){const s=yr(t);this.root.style.setProperty("--vr-ground-clarity",String(s.clarity)),this.root.style.opacity=s.opacity.toString(),this.root.style.transform=`translateX(-50%) translateY(${s.translateY}px) scaleY(${s.scaleY})`,this.root.style.setProperty("--vr-ground-base-blur",`${s.blur}px`),this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1);this.updateDotPositions()}updateScene(e,t,n){this.museumId=e,this.currentSceneId=t,this.sceneHotspots=n,this.hoverSceneId=null,this.renderDots()}mount(e){e.appendChild(this.root)}dispose(){this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class Sm{constructor(e={}){E(this,"root");E(this,"textEl");E(this,"isModalOpen",!1);E(this,"modalInstance",null);E(this,"unsubscribeInteracting",null);E(this,"unsubscribeIdle",null);E(this,"unsubscribeUIEngaged",null);this.root=document.createElement("div"),this.root.className="vr-watermark",this.textEl=document.createElement("div"),this.textEl.className="vr-watermark__text",this.textEl.textContent="鼎虎清源",this.root.appendChild(this.textEl),this.textEl.addEventListener("click",()=>{We.emitUIEngaged(),this.handleClick()}),this.textEl.addEventListener("touchstart",t=>{t.stopPropagation(),We.emitUIEngaged(),this.handleClick()}),this.root.style.pointerEvents="none",this.textEl.style.pointerEvents="auto",this.setupInteractionListeners()}setupInteractionListeners(){this.unsubscribeInteracting=We.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=We.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=We.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}mount(e){e.appendChild(this.root)}handleClick(){this.isModalOpen||(this.modalInstance?(this.modalInstance.open(),this.isModalOpen=!0):hr(()=>import("./TeamIntroModal-Q9fh-ATv.js"),[],import.meta.url).then(e=>{const t=e.TeamIntroModal;this.modalInstance=new t({onClose:()=>{this.isModalOpen=!1}}),this.modalInstance.mount(document.body),this.modalInstance.open(),this.isModalOpen=!0}))}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.modalInstance&&this.modalInstance.dispose(),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}class Mm{constructor(e,t={}){E(this,"root");E(this,"inner");E(this,"wedge");E(this,"northTick");E(this,"currentYaw",0);E(this,"currentPitch",0);E(this,"isVisible",!1);E(this,"unsubscribeInteracting");E(this,"unsubscribeIdle");E(this,"unsubscribeUIEngaged");this.root=document.createElement("div"),this.root.className="vr-groundheading",this.inner=document.createElement("div"),this.inner.className="vr-groundheading__inner",this.wedge=document.createElement("div"),this.wedge.className="vr-groundheading__wedge",this.northTick=document.createElement("div"),this.northTick.className="vr-groundheading__northTick",this.inner.appendChild(this.wedge),this.inner.appendChild(this.northTick),this.root.appendChild(this.inner),this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),e.appendChild(this.root),this.setupInteractionListeners()}setYawPitch(e,t){if(this.currentYaw=e,this.currentPitch=t,Tr(t)){const s=yr(t);this.root.style.setProperty("--vr-ground-clarity",String(s.clarity)),this.root.style.opacity=s.opacity.toString(),this.root.style.transform=`translateX(-50%) translateY(${s.translateY}px) scaleY(${s.scaleY})`,this.root.style.setProperty("--vr-ground-base-blur",`${s.blur}px`);const r=-e;this.inner.style.transform=`rotateZ(${r}deg)`,this.isVisible||(this.isVisible=!0)}else this.isVisible&&(this.root.style.opacity="0",this.root.style.transform="translateX(-50%) translateY(0px) scaleY(1)",this.root.style.setProperty("--vr-ground-base-blur","0px"),this.isVisible=!1)}setInteracting(e){e?this.root.classList.add("vr-ui-interacting"):this.root.classList.remove("vr-ui-interacting")}setupInteractionListeners(){this.unsubscribeInteracting=We.on("user-interacting",()=>{this.root.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=We.on("user-idle",()=>{this.root.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=We.on("ui-engaged",()=>{this.root.classList.remove("vr-ui-interacting")})}dispose(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.root.parentNode&&this.root.parentNode.removeChild(this.root)}getElement(){return this.root}}const gi={original:{renderer:{pixelRatio:Math.min(window.devicePixelRatio||1,2),toneMapping:sn,toneMappingExposure:1,output:"srgb",clearColor:void 0},camera:{defaultFov:75},texture:{anisotropyLimit:8,minFilter:Rn,magFilter:wt,generateMipmaps:!0,colorSpace:"srgb"}},enhanced:{renderer:{pixelRatio:Math.min(window.devicePixelRatio,2),toneMapping:Lo,toneMappingExposure:.95,output:"srgb",clearColor:{color:0,alpha:1}},camera:{defaultFov:70},texture:{anisotropyLimit:12,minFilter:Rn,magFilter:wt,generateMipmaps:!0,colorSpace:"srgb"}}};class bm{constructor(e,t=!1){E(this,"scene");E(this,"camera");E(this,"renderer");E(this,"sphere",null);E(this,"container");E(this,"frameListeners",[]);E(this,"nadirPatch",null);E(this,"compassDisk",null);E(this,"groundNavDots",null);E(this,"groundHeading",null);E(this,"brandWatermark",null);E(this,"renderProfile","enhanced");E(this,"isDragging",!1);E(this,"lastMouseX",0);E(this,"lastMouseY",0);E(this,"yaw",0);E(this,"pitch",0);E(this,"fov",75);E(this,"onLoadCallback");E(this,"onErrorCallback");E(this,"onStatusChangeCallback");E(this,"debugMode",!1);E(this,"onDebugClick");E(this,"longPressTimer",null);E(this,"longPressThreshold",500);E(this,"aspectWarnedUrls",new Set);E(this,"loadStatus",bt.LOADING_LOW);E(this,"isDegradedMode",!1);E(this,"pickMode",!1);E(this,"pickModeListeners",[]);E(this,"pickStartX",0);E(this,"pickStartY",0);E(this,"pickStartTime",0);E(this,"pickHasMoved",!1);E(this,"pickDragThreshold",8);E(this,"pickTimeThreshold",250);E(this,"lastYaw",0);E(this,"lastPitch",0);E(this,"lastFov",75);E(this,"isViewChanging",!1);E(this,"viewChangeThreshold",.5);E(this,"touchStartX",0);E(this,"touchStartY",0);E(this,"lastTouchDistance",0);E(this,"isPinching",!1);E(this,"lastFrameTimeMs",null);this.container=e,this.debugMode=t,this.renderProfile=this.detectRenderProfile(),this.scene=new ol,this.camera=new Rt(gi[this.renderProfile].camera.defaultFov,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,0,0),this.fov=gi[this.renderProfile].camera.defaultFov,this.renderer=new Sr({antialias:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.applyRendererProfile(),e.appendChild(this.renderer.domElement),this.nadirPatch=new pm(this.scene,500),this.compassDisk=new xm,this.compassDisk.mount(e),this.groundNavDots=new Em({museumId:"",currentSceneId:"",sceneHotspots:[]}),this.groundNavDots.mount(e),this.groundHeading=new Mm(e),this.brandWatermark=new Sm,this.brandWatermark.mount(e),this.setupEvents(),this.animate(),window.addEventListener("resize",()=>this.handleResize())}setupEvents(){const e=this.renderer.domElement;if(e.addEventListener("mousedown",t=>this.onPointerDown(t)),e.addEventListener("mousemove",t=>this.onPointerMove(t)),e.addEventListener("mouseup",()=>this.onPointerUp()),e.addEventListener("mouseleave",()=>this.onPointerUp()),e.addEventListener("touchstart",t=>this.onTouchStart(t),{passive:!1}),e.addEventListener("touchmove",t=>this.onTouchMove(t),{passive:!1}),e.addEventListener("touchend",()=>this.onTouchEnd()),e.addEventListener("wheel",t=>this.onWheel(t),{passive:!1}),this.debugMode){e.addEventListener("dblclick",s=>this.handleDebugClick(s.clientX,s.clientY));let t=0,n=0;e.addEventListener("touchstart",s=>{s.touches.length===1&&(t=s.touches[0].clientX,n=s.touches[0].clientY,this.longPressTimer=window.setTimeout(()=>{this.handleDebugClick(t,n)},this.longPressThreshold))},{passive:!0}),e.addEventListener("touchmove",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0}),e.addEventListener("touchend",()=>{this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)},{passive:!0})}}handleDebugClick(e,t){if(this.onDebugClick&&this.debugMode){const n=this.getCurrentView();this.onDebugClick(e,t,n.yaw,n.pitch,n.fov)}}setOnDebugClick(e){this.onDebugClick=e}onPointerDown(e){this.isDragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,We.emitInteracting()}onPointerMove(e){if(!this.isDragging)return;const t=e.clientX-this.lastMouseX,n=e.clientY-this.lastMouseY;this.yaw-=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.clientX,this.lastMouseY=e.clientY,this.updateCamera(),this.debugMode&&this.onDebugClick&&this.getCurrentView()}onPointerUp(){this.isDragging=!1}onTouchStart(e){if(e.touches.length===1)this.isDragging=!0,this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.lastMouseX=this.touchStartX,this.lastMouseY=this.touchStartY,We.emitInteracting();else if(e.touches.length===2){this.isPinching=!0,this.isDragging=!1;const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY;this.lastTouchDistance=Math.sqrt(t*t+n*n),We.emitInteracting()}}onTouchMove(e){if(e.preventDefault(),this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null),e.touches.length===1&&this.isDragging){const t=e.touches[0].clientX-this.lastMouseX,n=e.touches[0].clientY-this.lastMouseY;this.yaw-=t*.5,this.pitch+=n*.5,this.pitch=Math.max(-90,Math.min(90,this.pitch)),this.lastMouseX=e.touches[0].clientX,this.lastMouseY=e.touches[0].clientY,this.updateCamera()}else if(e.touches.length===2&&this.isPinching){const t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY,s=Math.sqrt(t*t+n*n),r=this.lastTouchDistance-s;this.fov+=r*.5,this.fov=Math.max(30,Math.min(120,this.fov)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.lastTouchDistance=s}}onTouchEnd(){this.isDragging=!1,this.isPinching=!1}onWheel(e){e.preventDefault(),this.fov+=e.deltaY*.1,this.fov=Math.max(30,Math.min(120,this.fov)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),We.emitInteracting(),this.debugMode&&this.onDebugClick&&this.getCurrentView()}updateCamera(){const e=Pn.degToRad(this.yaw),t=Pn.degToRad(this.pitch),n=Math.cos(t)*Math.sin(e),s=Math.sin(t),r=Math.cos(t)*Math.cos(e);this.camera.lookAt(n,s,r)}loadScene(e){if(this.isDegradedMode=!1,this.updateLoadStatus(bt.LOADING_LOW),this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const l=this.sphere.material;l.map&&l.map.dispose(),l.dispose()}const t=e.initialView;this.yaw=t.yaw||0,this.pitch=t.pitch||0;const n=gi[this.renderProfile];this.fov=t.fov!==void 0?t.fov:n.camera.defaultFov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.updateCamera(),this.lastYaw=this.yaw,this.lastPitch=this.pitch,this.lastFov=this.fov,this.isViewChanging=!1;const s=new ps(500,64,64);s.scale(-1,1,1);const r=new sm;r.setCrossOrigin("anonymous");const a=yi(e.panoLow,ai.PANO_LOW),o=yi(e.pano,ai.PANO);if(!a&&o){this.loadSingleTexture(r,s,o,!1);return}if(a&&!o){this.loadSingleTexture(r,s,a,!0);return}if(a&&o){this.loadProgressiveTextures(r,s,a,o);return}this.updateLoadStatus(bt.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error("场景未提供全景图 URL"))}loadSingleTexture(e,t,n,s){s?this.updateLoadStatus(bt.LOADING_LOW):this.updateLoadStatus(bt.LOADING_HIGH),e.load(n,r=>{this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,n);const a=new bi({map:r});this.sphere=new Pt(t,a),this.scene.add(this.sphere),s?this.updateLoadStatus(bt.LOW_READY):this.updateLoadStatus(bt.HIGH_READY),this.onLoadCallback&&this.onLoadCallback()},void 0,r=>{console.error("加载全景图失败:",n,r),this.updateLoadStatus(bt.ERROR),this.onErrorCallback&&this.onErrorCallback(new Error(`加载全景图失败：${n}`))})}loadProgressiveTextures(e,t,n,s){this.updateLoadStatus(bt.LOADING_LOW),e.load(n,r=>{this.applyTextureSettings(r),this.warnIfNotPanoAspect(r,n);const a=new bi({map:r});this.sphere=new Pt(t,a),this.scene.add(this.sphere),this.updateLoadStatus(bt.LOW_READY),this.onLoadCallback&&this.onLoadCallback(),this.updateLoadStatus(bt.LOADING_HIGH),e.load(s,o=>{this.applyTextureSettings(o),this.warnIfNotPanoAspect(o,s);const l=this.getCurrentView();if(this.sphere&&this.sphere.material&&"map"in this.sphere.material){const c=this.sphere.material;c.map&&c.map.dispose(),c.map=o,c.needsUpdate=!0}this.setView(l.yaw,l.pitch,l.fov),this.updateLoadStatus(bt.HIGH_READY),this.isDegradedMode=!1},void 0,o=>{console.error("高清全景图加载失败，继续使用低清图:",s,o),this.isDegradedMode=!0,this.updateLoadStatus(bt.DEGRADED)})},void 0,r=>{console.error("低清全景图加载失败，尝试加载高清图:",n,r),this.loadSingleTexture(e,t,s,!1)})}setOnLoad(e){this.onLoadCallback=e}setOnError(e){this.onErrorCallback=e}setOnStatusChange(e){this.onStatusChangeCallback=e}getLoadStatus(){return this.loadStatus}isInDegradedMode(){return this.isDegradedMode}updateLoadStatus(e){this.loadStatus=e,this.onStatusChangeCallback&&this.onStatusChangeCallback(e)}getCurrentView(){return{yaw:this.yaw,pitch:this.pitch,fov:this.fov}}setView(e,t,n){this.yaw=e,this.pitch=Math.max(-90,Math.min(90,t)),n!==void 0&&(this.fov=Math.max(30,Math.min(120,n)),this.camera.fov=this.fov,this.camera.updateProjectionMatrix()),this.updateCamera()}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}animate(){requestAnimationFrame(()=>this.animate());const e=performance.now(),t=this.lastFrameTimeMs?e-this.lastFrameTimeMs:16.7;this.lastFrameTimeMs=e;const n=this.getCurrentView(),s=Math.abs(n.yaw-this.lastYaw),r=Math.abs(n.pitch-this.lastPitch),a=Math.abs(n.fov-this.lastFov);s>this.viewChangeThreshold||r>this.viewChangeThreshold||a>this.viewChangeThreshold?this.isViewChanging||(this.isViewChanging=!0,We.emitInteracting()):this.isViewChanging&&(this.isViewChanging=!1,We.scheduleIdle()),this.lastYaw=n.yaw,this.lastPitch=n.pitch,this.lastFov=n.fov,this.nadirPatch&&this.nadirPatch.update(this.camera,{yaw:n.yaw,pitch:n.pitch},t),this.compassDisk&&this.compassDisk.setYawPitch(n.yaw,n.pitch),this.groundNavDots&&this.groundNavDots.setYawPitch(n.yaw,n.pitch),this.groundHeading&&this.groundHeading.setYawPitch(n.yaw,n.pitch);for(const l of this.frameListeners)l(t);this.renderer.render(this.scene,this.camera)}onFrame(e){return this.frameListeners.push(e),()=>{const t=this.frameListeners.indexOf(e);t>=0&&this.frameListeners.splice(t,1)}}getCamera(){return this.camera}getDomElement(){return this.renderer.domElement}setSceneData(e,t,n){if(this.groundNavDots){const s=n.filter(r=>{var a;return r.type==="scene"&&((a=r.target)==null?void 0:a.sceneId)}).map(r=>({id:r.id,label:r.label,yaw:r.yaw,pitch:r.pitch,target:{museumId:r.target.museumId,sceneId:r.target.sceneId}}));this.groundNavDots.updateScene(e,t,s)}}getSphereRadius(){return 500}getViewportSize(){return{width:this.container.clientWidth,height:this.container.clientHeight}}enablePickMode(){this.pickMode||(this.pickMode=!0,this.setupPickModeListeners())}disablePickMode(){this.pickMode&&(this.pickMode=!1,this.removePickModeListeners())}togglePickMode(){return this.pickMode?this.disablePickMode():this.enablePickMode(),this.pickMode}isPickModeEnabled(){return this.pickMode}setupPickModeListeners(){const e=this.renderer.domElement,t=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.touches.length!==1)return;a=r.touches[0].clientX,o=r.touches[0].clientY}else a=r.clientX,o=r.clientY;this.pickStartX=a,this.pickStartY=o,this.pickStartTime=Date.now(),this.pickHasMoved=!1},n=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.touches.length!==1)return;a=r.touches[0].clientX,o=r.touches[0].clientY}else a=r.clientX,o=r.clientY;const l=Math.abs(a-this.pickStartX),c=Math.abs(o-this.pickStartY);Math.sqrt(l*l+c*c)>this.pickDragThreshold&&(this.pickHasMoved=!0)},s=r=>{if(!this.pickMode)return;let a,o;if(r instanceof TouchEvent){if(r.changedTouches.length!==1)return;a=r.changedTouches[0].clientX,o=r.changedTouches[0].clientY}else a=r.clientX,o=r.clientY;const l=Date.now()-this.pickStartTime,c=Math.abs(a-this.pickStartX),d=Math.abs(o-this.pickStartY);Math.sqrt(c*c+d*d)>this.pickDragThreshold||l>this.pickTimeThreshold&&this.pickHasMoved||this.handlePick(a,o),this.pickHasMoved=!1};e.addEventListener("pointerdown",t),e.addEventListener("mousedown",t),e.addEventListener("touchstart",t,{passive:!0}),e.addEventListener("pointermove",n),e.addEventListener("mousemove",n),e.addEventListener("touchmove",n,{passive:!0}),e.addEventListener("pointerup",s),e.addEventListener("mouseup",s),e.addEventListener("touchend",s,{passive:!0}),this.pickModeListeners.push(()=>{e.removeEventListener("pointerdown",t),e.removeEventListener("mousedown",t),e.removeEventListener("touchstart",t),e.removeEventListener("pointermove",n),e.removeEventListener("mousemove",n),e.removeEventListener("touchmove",n),e.removeEventListener("pointerup",s),e.removeEventListener("mouseup",s),e.removeEventListener("touchend",s)})}removePickModeListeners(){this.pickModeListeners.forEach(e=>e()),this.pickModeListeners=[]}handlePick(e,t){const n=this.renderer.domElement.getBoundingClientRect(),s=mm(e,t,n),r=gm(s.x,s.y,this.camera,this.getSphereRadius());if(!r){console.warn("[pick] 未能计算 yaw/pitch");return}const{yaw:a,pitch:o}=r,l=`yaw: ${a.toFixed(2)}, pitch: ${o.toFixed(2)}`;console.log(`[pick] yaw=${a.toFixed(2)}, pitch=${o.toFixed(2)}`),navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(l).catch(()=>{}),window.dispatchEvent(new CustomEvent("vr:pick",{detail:{x:e,y:t,yaw:a,pitch:o}}))}warnIfNotPanoAspect(e,t){if(!e.image)return;const n=e.image,s=n.width,r=n.height;if(!s||!r)return;const a=s/r;Math.abs(a-2)>.02&&!this.aspectWarnedUrls.has(t)&&(console.warn(`[PanoViewer] 全景图比例不是 2:1，可能出现轻微变形（实际 ${a.toFixed(2)}），来源: ${t}`),this.aspectWarnedUrls.add(t))}dispose(){if(this.sphere&&(this.scene.remove(this.sphere),this.sphere.geometry&&this.sphere.geometry.dispose(),this.sphere.material&&"map"in this.sphere.material)){const e=this.sphere.material;e.map&&e.map.dispose(),e.dispose()}this.nadirPatch&&(this.nadirPatch.dispose(this.scene),this.nadirPatch=null),this.compassDisk&&(this.compassDisk.dispose(),this.compassDisk=null),this.groundNavDots&&(this.groundNavDots.dispose(),this.groundNavDots=null),this.groundHeading&&(this.groundHeading.dispose(),this.groundHeading=null),this.brandWatermark&&(this.brandWatermark.dispose(),this.brandWatermark=null),this.renderer.dispose(),window.removeEventListener("resize",()=>this.handleResize())}applyRendererProfile(){const e=gi[this.renderProfile];this.renderer.setPixelRatio(e.renderer.pixelRatio),"outputColorSpace"in this.renderer?this.renderer.outputColorSpace=rt:this.renderer.outputEncoding=rn,this.renderer.toneMapping=e.renderer.toneMapping,this.renderer.toneMappingExposure=e.renderer.toneMappingExposure,e.renderer.clearColor&&this.renderer.setClearColor(e.renderer.clearColor.color,e.renderer.clearColor.alpha)}detectRenderProfile(){try{const t=new URLSearchParams(window.location.search).get("render");if(t&&t.toLowerCase()==="original")return"original"}catch{}return"enhanced"}applyTextureSettings(e){const t=gi[this.renderProfile],n=this.renderer.capabilities.getMaxAnisotropy?this.renderer.capabilities.getMaxAnisotropy():1;if(e.anisotropy=Math.min(t.texture.anisotropyLimit,Math.max(1,n||1)),e.minFilter=t.texture.minFilter,e.magFilter=t.texture.magFilter,e.generateMipmaps=t.texture.generateMipmaps,"colorSpace"in e?e.colorSpace=rt:e.encoding=rn,e.needsUpdate=!0,this.debugMode){const s=e.image||{};console.log("pano texture",{w:s.width,h:s.height,colorSpace:e.colorSpace,encoding:e.encoding,anisotropy:e.anisotropy,minFilter:e.minFilter,magFilter:e.magFilter})}}}class _o{constructor(e){E(this,"element");this.element=document.createElement("div"),this.element.className="title-bar",this.element.innerHTML=`
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
    `,document.head.appendChild(e)}setTitle(e){const t=this.element.querySelector(".title-text");t&&(t.textContent=e)}getElement(){return this.element}remove(){this.element.remove()}}class ym{constructor(e){E(this,"element");E(this,"museums");this.museums=e,this.element=document.createElement("div"),this.element.className="museum-list",this.render(),this.applyStyles()}render(){const e=this.museums.filter(n=>n.id==="wangding"),t=this.museums.filter(n=>n.id!=="wangding");this.element.innerHTML=`
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
    `,this.element.querySelectorAll(".museum-card-active").forEach(n=>{n.addEventListener("click",()=>{const s=n.getAttribute("data-museum-id");s&&Js(s)})})}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}function Tm(i,e){const t=Pn.degToRad(i),n=Pn.degToRad(e),s=Math.cos(n)*Math.sin(t),r=Math.sin(n),a=Math.cos(n)*Math.cos(t);return new N(s,r,a)}function wm(i,e,t){const n=new N,s=new N;if(e.getWorldPosition(n),e.getWorldDirection(s),new N().copy(i).sub(n).dot(s)<=0)return{x:0,y:0,visible:!1};const a=new N().copy(i).project(e);if(!(a.x>=-1&&a.x<=1&&a.y>=-1&&a.y<=1&&a.z>=-1&&a.z<=1))return{x:0,y:0,visible:!1};const l=t.clientWidth,c=t.clientHeight,d=(a.x+1)*.5*l,h=(1-(a.y+1)*.5)*c;return{x:d,y:h,visible:!0}}function Am(i,e,t,n,s=500){const a=Tm(i,e).clone().multiplyScalar(s);return wm(a,t,n)}function Cm(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" stroke-width="2" />
  <path d="M16.2 16.2 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`}function Im(){return`
<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 7.5v9l8-4.5-8-4.5Z"/>
</svg>`}function Lm(i){const e=document.createElement("div");return e.className="hotspot-tooltip",e.textContent=i||"",e.setAttribute("role","tooltip"),e}function ts(i,e){const t=document.createElement("div");return t.className=`hotspot-icon-circle${e?` ${e}`:""}`,t.innerHTML=i,t}function Rm(){return`
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4v16M12 4l6 6M12 4l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function Pm(i){const e=Lm(i.tooltip),t=i.isGround??!1;let n="hotspot hotspot--unknown",s=document.createElement("div");s.className="hotspot-dot";const r=i.type;if(t){n="hotspot hotspot--ground";const a=document.createElement("div");a.className="hotspot-ground-ring",s=a}else r==="scene"?(n="hotspot hotspot--scene",s=ts(Rm(),"hotspot-icon hotspot-icon-arrow")):r==="image"?(n="hotspot hotspot--image",s=ts(Cm(),"hotspot-icon")):r==="info"?(n="hotspot hotspot--info",s=ts('<span class="hotspot-info-text">i</span>',"hotspot-icon")):r==="video"&&(n="hotspot hotspot--video",s=ts(Im(),"hotspot-icon hotspot-icon-play"));return{rootClassName:n,contentEl:s,tooltipEl:e}}class Nm{constructor(e){E(this,"element");E(this,"isOpen",!1);E(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--image";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const s=document.createElement("div");s.className="vr-modal-card vr-modal-card--media vr-modal-card--image",s.addEventListener("click",d=>d.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"图片预览";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--image";const c=document.createElement("img");c.className="vr-modal-image",e.src&&(c.src=e.src),c.alt=e.title||"热点图片",c.loading="lazy",l.appendChild(c),s.appendChild(r),s.appendChild(l),t.appendChild(n),t.appendChild(s),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class Dm{constructor(e){E(this,"element");E(this,"isOpen",!1);E(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--info";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const s=document.createElement("div");s.className="vr-modal-card vr-modal-card--info",s.addEventListener("click",c=>c.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"详情";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--info",l.textContent=e.text||"未配置内容",s.appendChild(r),s.appendChild(l),t.appendChild(n),t.appendChild(s),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class Um{constructor(e){E(this,"element");E(this,"isOpen",!1);E(this,"videoEl");E(this,"options");this.options=e;const t=document.createElement("div");t.className="vr-modal vr-modal--media vr-modal--video";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const s=document.createElement("div");s.className="vr-modal-card vr-modal-card--media vr-modal-card--video",s.addEventListener("click",d=>d.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const a=document.createElement("div");a.className="vr-modal-title",a.textContent=e.title||"视频";const o=document.createElement("button");o.className="vr-btn vr-modal-close-icon",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.handleClose()),r.appendChild(a),r.appendChild(o);const l=document.createElement("div");l.className="vr-modal-body vr-modal-body--video";const c=document.createElement("video");c.className="vr-modal-video",e.src&&(c.src=e.src),e.poster&&(c.poster=e.poster),c.controls=!0,c.playsInline=!0,c.preload="metadata",this.videoEl=c,l.appendChild(c),s.appendChild(r),s.appendChild(l),t.appendChild(n),t.appendChild(s),this.element=t}handleClose(){var e,t;this.close(),(t=(e=this.options).onClose)==null||t.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){if(this.isOpen){this.isOpen=!1,this.element.classList.remove("open");try{this.videoEl.pause(),this.videoEl.currentTime=0,this.videoEl.removeAttribute("src"),this.videoEl.load()}catch{}}}getElement(){return this.element}destroy(){this.close(),this.element.remove()}}const cl="vr:open-modal",dl="vr:close-modal";function wr(i){window.dispatchEvent(new CustomEvent(cl,{detail:i}))}function Ks(){window.dispatchEvent(new CustomEvent(dl))}class Om{constructor(e){E(this,"rootEl");E(this,"current",null);E(this,"handleKeyDownBound");this.rootEl=e,this.handleKeyDownBound=t=>this.handleKeyDown(t),window.addEventListener(cl,t=>{const n=t;this.handleOpen(n.detail)}),window.addEventListener(dl,()=>this.close()),window.addEventListener("keydown",this.handleKeyDownBound)}handleKeyDown(e){e.key==="Escape"&&this.close()}handleOpen(e){this.close();let t=null;e.type==="image"?t=new Nm({src:e.payload.src,title:e.payload.title,onClose:()=>Ks()}):e.type==="info"?t=new Dm({title:e.payload.title,text:e.payload.text,onClose:()=>Ks()}):e.type==="video"&&(t=new Um({src:e.payload.src,poster:e.payload.poster,title:e.payload.title,onClose:()=>Ks()})),t&&(this.current=t,this.rootEl.innerHTML="",this.rootEl.appendChild(t.getElement()),t.open())}close(){this.current&&(this.current.close(),this.current.destroy(),this.current=null,this.rootEl.innerHTML="")}}let xo=null;function Fm(){if(xo)return;let i=document.getElementById("vr-modal-root");i||(i=document.createElement("div"),i.id="vr-modal-root",document.body.appendChild(i)),xo=new Om(i)}let ns=null;function nt(i,e=1500){const t=document.querySelector(".vr-toast"),n=t??document.createElement("div");n.className="vr-toast",n.textContent=i,t||document.body.appendChild(n),window.requestAnimationFrame(()=>n.classList.add("show")),ns&&window.clearTimeout(ns),ns=window.setTimeout(()=>{n.classList.remove("show"),window.setTimeout(()=>n.remove(),220),ns=null},e)}class ms{constructor(e){E(this,"data");E(this,"el");E(this,"contentEl");E(this,"tooltipEl");E(this,"worldPos");E(this,"radius",500);E(this,"tooltipTimer",null);var a,o;this.data=e,this.el=document.createElement("div");const t=e.pitch<-20,n=Pm({id:e.id,type:e.type,tooltip:e.tooltip,isGround:t});this.el.className=n.rootClassName,t&&this.el.classList.add("hotspot--ground"),this.el.setAttribute("data-hotspot-id",e.id),this.el.setAttribute("data-hotspot-type",e.type),this.el.style.pointerEvents="auto",this.el.style.position="absolute",this.el.style.left="0",this.el.style.top="0",this.contentEl=n.contentEl,this.tooltipEl=n.tooltipEl,this.el.appendChild(this.contentEl),this.el.appendChild(this.tooltipEl),(((o=(a=window.matchMedia)==null?void 0:a.call(window,"(hover: hover) and (pointer: fine)"))==null?void 0:o.matches)??!1)&&(this.el.addEventListener("mouseenter",()=>this.showTooltip()),this.el.addEventListener("mouseleave",()=>this.hideTooltip())),this.el.addEventListener("pointerdown",l=>{l.stopPropagation(),this.el.classList.add("is-pressed")});const r=()=>this.el.classList.remove("is-pressed");this.el.addEventListener("pointerup",r),this.el.addEventListener("pointercancel",r),this.el.addEventListener("pointerleave",r)}getElement(){return this.el}getData(){return this.data}updateScreenPosition(e,t){const n=Am(this.data.yaw,this.data.pitch,e,t,this.radius);if(!n.visible){this.el.style.display="none",this.el.style.opacity="0";return}this.el.style.display="",this.el.style.opacity="1",this.el.style.setProperty("--hs-x",`${n.x}px`),this.el.style.setProperty("--hs-y",`${n.y}px`),this.el.style.transform=`translate3d(${n.x}px, ${n.y}px, 0) translate(-50%, -50%)`}showTooltip(e){this.data.tooltip&&(this.tooltipEl.classList.add("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null),e&&e>0&&(this.tooltipTimer=window.setTimeout(()=>this.hideTooltip(),e)))}hideTooltip(){this.tooltipEl.classList.remove("show"),this.tooltipTimer&&(window.clearTimeout(this.tooltipTimer),this.tooltipTimer=null)}}class km extends ms{onClick(){console.log("[hotspot] scene click",{id:this.data.id,targetSceneId:this.data.targetSceneId})}}class Bm extends ms{onClick(){if(!this.data.imageUrl){console.warn("[hotspot] image click but no src configured",this.data),nt("未配置内容",1500);return}wr({type:"image",payload:{src:this.data.imageUrl,title:this.data.title||this.data.tooltip}})}}class Hm extends ms{onClick(){if(!!!(this.data.text||this.data.title||this.data.tooltip)){console.warn("[hotspot] info click but no text/title configured",this.data),nt("未配置内容",1500);return}wr({type:"info",payload:{title:this.data.title||this.data.tooltip,text:this.data.text}})}}class Gm extends ms{onClick(){if(!this.data.url){console.warn("[hotspot] video click but no src/url configured",this.data),nt("未配置内容",1500);return}wr({type:"video",payload:{src:this.data.url,poster:this.data.poster,title:this.data.title||this.data.tooltip}})}}class Vm{constructor(e,t,n={}){E(this,"element");E(this,"viewer");E(this,"disposeFrameListener",null);E(this,"hotspotInstances",[]);E(this,"options");E(this,"unsubscribeFocus",null);E(this,"hoveredSceneId",null);this.viewer=e,this.options=n,this.element=document.createElement("div"),this.element.className="hotspots-container",this.element.style.pointerEvents="none",this.updateHotspots(t);const s=this.viewer.getDomElement();this.disposeFrameListener=this.viewer.onFrame(()=>{const r=this.viewer.getCamera();for(const a of this.hotspotInstances)a.updateScreenPosition(r,s)}),this.unsubscribeFocus=wi(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="hover"&&e.source!=="pano"){if(this.options.museumId&&e.museumId!==this.options.museumId)return;const t=e.sceneId;this.hoveredSceneId!==t&&(this.hoveredSceneId&&this.setHotspotHighlight(this.hoveredSceneId,!1),this.hoveredSceneId=t,t&&this.setHotspotHighlight(t,!0))}}setHotspotHighlight(e,t){this.hotspotInstances.forEach(n=>{const s=n.getData();if(s.type==="scene"&&s.targetSceneId===e){const a=n.getElement();t?a.classList.add("hotspot--external-hover"):a.classList.remove("hotspot--external-hover")}})}updateHotspots(e){var s,r;this.hotspotInstances=[],this.element.innerHTML="";const t=((r=(s=window.matchMedia)==null?void 0:s.call(window,"(hover: none) and (pointer: coarse)"))==null?void 0:r.matches)??!1,n=a=>{var o,l,c,d,h,f,p,v;if(a.type==="scene"){const g=(o=a.target)==null?void 0:o.sceneId,u=`进入：${(g?(c=(l=this.options).resolveSceneName)==null?void 0:c.call(l,g):void 0)||a.label||g||"未知场景"}`;return new km({id:a.id,type:"scene",yaw:a.yaw,pitch:a.pitch,tooltip:u,targetSceneId:g})}if(a.type==="video"){const g=((d=a.target)==null?void 0:d.url)||a.src,m=((h=a.target)==null?void 0:h.poster)||a.poster,u=a.title||a.label;return new Gm({id:a.id,type:"video",yaw:a.yaw,pitch:a.pitch,tooltip:u,url:g,poster:m,title:u})}if(a.type==="image"){const g=((f=a.target)==null?void 0:f.imageUrl)||((p=a.target)==null?void 0:p.url)||a.src,m=a.title||a.label;return new Bm({id:a.id,type:"image",yaw:a.yaw,pitch:a.pitch,tooltip:m,imageUrl:g,title:m})}if(a.type==="info"){const g=a.title||a.label,m=((v=a.target)==null?void 0:v.text)||a.text;return new Hm({id:a.id,type:"info",yaw:a.yaw,pitch:a.pitch,tooltip:g,text:m,title:g})}return null};for(const a of e){const o=n(a);o&&(o.getElement().addEventListener("click",l=>{var h,f;l.preventDefault(),l.stopPropagation();const c=o.getData(),d=c.type==="scene";if(t&&o.showTooltip(1200),d){const p=c.targetSceneId;if(p&&this.options.onEnterScene){nt(`进入 ${((f=(h=this.options).resolveSceneName)==null?void 0:f.call(h,p))||p}`,1e3),this.options.onEnterScene(p);return}}o.onClick()}),this.hotspotInstances.push(o),this.element.appendChild(o.getElement()))}}getElement(){return this.element}remove(){this.disposeFrameListener&&(this.disposeFrameListener(),this.disposeFrameListener=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class zm{constructor(){E(this,"element");E(this,"videoElement");E(this,"isOpen",!1);this.element=document.createElement("div"),this.element.className="video-player-overlay",this.videoElement=document.createElement("video"),this.videoElement.controls=!0,this.videoElement.playsInline=!0,this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="video-player-backdrop"></div>
      <div class="video-player-content">
        <button class="video-player-close">×</button>
        <div class="video-container"></div>
      </div>
    `;const e=this.element.querySelector(".video-container");e&&e.appendChild(this.videoElement);const t=this.element.querySelector(".video-player-backdrop"),n=this.element.querySelector(".video-player-close");t==null||t.addEventListener("click",()=>this.close()),n==null||n.addEventListener("click",()=>this.close())}play(e){const t=yi(e,ai.VIDEO);if(!t){console.error("视频 URL 为空");return}this.videoElement.src=t,this.videoElement.load(),this.open(),this.videoElement.play().catch(n=>{console.warn("自动播放失败，需要用户交互:",n)})}open(){this.isOpen=!0,this.element.classList.add("open"),document.body.style.overflow="hidden"}close(){this.isOpen=!1,this.element.classList.remove("open"),this.videoElement.pause(),this.videoElement.src="",document.body.style.overflow=""}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class Wm{constructor(){E(this,"element");this.element=document.createElement("div"),this.element.className="loading-overlay",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
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
    `,document.head.appendChild(e)}show(){this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.element.remove()}}const hl={[te.INVALID_ROOT]:"配置格式错误",[te.MISSING_APP_NAME]:"缺少应用名称",[te.MUSEUMS_NOT_ARRAY]:"博物馆列表格式错误",[te.MUSEUMS_EMPTY]:"博物馆列表为空",[te.MISSING_MUSEUM_ID]:"缺少博物馆 ID",[te.DUPLICATE_MUSEUM_ID]:"博物馆 ID 重复",[te.MISSING_MUSEUM_NAME]:"缺少博物馆名称",[te.MISSING_MUSEUM_COVER]:"缺少封面图",[te.MISSING_MUSEUM_MAP]:"缺少地图配置",[te.MISSING_MAP_IMAGE]:"缺少地图图片",[te.INVALID_MAP_WIDTH]:"地图宽度无效",[te.INVALID_MAP_HEIGHT]:"地图高度无效",[te.SCENES_NOT_ARRAY]:"场景列表格式错误",[te.SCENES_EMPTY]:"场景列表为空",[te.MISSING_SCENE_ID]:"缺少场景 ID",[te.DUPLICATE_SCENE_ID]:"场景 ID 重复",[te.MISSING_SCENE_NAME]:"缺少场景名称",[te.MISSING_PANO]:"缺少全景图",[te.INVALID_PANO_URL]:"高清全景图 URL 无效",[te.INVALID_PANOLOW_URL]:"低清全景图 URL 无效",[te.MISSING_THUMB]:"缺少缩略图",[te.MISSING_INITIAL_VIEW]:"缺少初始视角配置",[te.INVALID_YAW]:"水平角度无效",[te.INVALID_PITCH]:"垂直角度无效",[te.INVALID_FOV]:"视野角度无效",[te.MISSING_MAP_POINT]:"缺少地图点位",[te.INVALID_MAP_POINT_X]:"地图点位 X 坐标无效",[te.INVALID_MAP_POINT_Y]:"地图点位 Y 坐标无效",[te.HOTSPOTS_NOT_ARRAY]:"热点列表格式错误",[te.MISSING_HOTSPOT_ID]:"缺少热点 ID",[te.DUPLICATE_HOTSPOT_ID]:"热点 ID 重复",[te.INVALID_HOTSPOT_TYPE]:"热点类型无效",[te.MISSING_HOTSPOT_LABEL]:"缺少热点标签",[te.INVALID_HOTSPOT_YAW]:"热点水平角度无效",[te.INVALID_HOTSPOT_PITCH]:"热点垂直角度无效",[te.MISSING_HOTSPOT_TARGET]:"缺少热点目标配置",[te.MISSING_TARGET_MUSEUM_ID]:"缺少目标博物馆 ID",[te.MISSING_TARGET_SCENE_ID]:"缺少目标场景 ID",[te.INVALID_TARGET_YAW]:"目标水平角度无效",[te.INVALID_TARGET_PITCH]:"目标垂直角度无效",[te.INVALID_TARGET_FOV]:"目标视野角度无效",[te.MISSING_TARGET_URL]:"缺少视频链接"},ul={[te.INVALID_ROOT]:"请确保 config.json 是一个有效的 JSON 对象",[te.MISSING_APP_NAME]:'请在配置中添加 "appName" 字段，例如："appName": "我的 VR 展馆"',[te.MUSEUMS_NOT_ARRAY]:'请确保 "museums" 是一个数组，例如："museums": []',[te.MUSEUMS_EMPTY]:'请至少添加一个博物馆到 "museums" 数组中',[te.MISSING_MUSEUM_ID]:'请为该博物馆添加 "id" 字段，例如："id": "museum1"',[te.DUPLICATE_MUSEUM_ID]:'请确保每个博物馆的 "id" 都是唯一的，不能重复',[te.MISSING_MUSEUM_NAME]:'请为该博物馆添加 "name" 字段，例如："name": "第一展馆"',[te.MISSING_MUSEUM_COVER]:'请为该博物馆添加 "cover" 字段，填入封面图的 URL',[te.MISSING_MUSEUM_MAP]:'请为该博物馆添加 "map" 对象配置',[te.MISSING_MAP_IMAGE]:'请在地图配置中添加 "image" 字段，填入地图图片的 URL',[te.INVALID_MAP_WIDTH]:'请确保 "map.width" 是一个大于 0 的数字',[te.INVALID_MAP_HEIGHT]:'请确保 "map.height" 是一个大于 0 的数字',[te.SCENES_NOT_ARRAY]:'请确保 "scenes" 是一个数组，例如："scenes": []',[te.SCENES_EMPTY]:"请至少为该博物馆添加一个场景",[te.MISSING_SCENE_ID]:'请为该场景添加 "id" 字段，例如："id": "scene1"',[te.DUPLICATE_SCENE_ID]:'请确保同一博物馆内每个场景的 "id" 都是唯一的',[te.MISSING_SCENE_NAME]:'请为该场景添加 "name" 字段，例如："name": "正门"',[te.MISSING_PANO]:'请为该场景添加 "pano" 或 "panoLow" 字段，至少提供一个全景图 URL',[te.INVALID_PANO_URL]:'请确保 "pano" 字段是一个有效的图片 URL 字符串',[te.INVALID_PANOLOW_URL]:'请确保 "panoLow" 字段是一个有效的图片 URL 字符串',[te.MISSING_THUMB]:'请为该场景添加 "thumb" 字段，填入缩略图的 URL',[te.MISSING_INITIAL_VIEW]:'请为该场景添加 "initialView" 对象配置',[te.INVALID_YAW]:'请确保 "initialView.yaw" 是一个数字（水平角度，范围 -180 到 180）',[te.INVALID_PITCH]:'请确保 "initialView.pitch" 是一个数字（垂直角度，范围 -90 到 90）',[te.INVALID_FOV]:'请确保 "initialView.fov" 是一个数字（视野角度，范围 30 到 120）',[te.MISSING_MAP_POINT]:'请为该场景添加 "mapPoint" 对象配置',[te.INVALID_MAP_POINT_X]:'请确保 "mapPoint.x" 是一个数字（地图上的 X 坐标）',[te.INVALID_MAP_POINT_Y]:'请确保 "mapPoint.y" 是一个数字（地图上的 Y 坐标）',[te.HOTSPOTS_NOT_ARRAY]:'请确保 "hotspots" 是一个数组，例如："hotspots": []',[te.MISSING_HOTSPOT_ID]:'请为该热点添加 "id" 字段，例如："id": "hotspot1"',[te.DUPLICATE_HOTSPOT_ID]:'请确保同一场景内每个热点的 "id" 都是唯一的',[te.INVALID_HOTSPOT_TYPE]:'请确保 "type" 字段是 "scene" 或 "video" 之一',[te.MISSING_HOTSPOT_LABEL]:'请为该热点添加 "label" 字段，例如："label": "进入展厅"',[te.INVALID_HOTSPOT_YAW]:'请确保 "yaw" 是一个数字（热点在全景图中的水平位置）',[te.INVALID_HOTSPOT_PITCH]:'请确保 "pitch" 是一个数字（热点在全景图中的垂直位置）',[te.MISSING_HOTSPOT_TARGET]:'请为该热点添加 "target" 对象配置',[te.MISSING_TARGET_MUSEUM_ID]:'场景跳转类型的热点必须包含 "target.museumId" 字段',[te.MISSING_TARGET_SCENE_ID]:'场景跳转类型的热点必须包含 "target.sceneId" 字段',[te.INVALID_TARGET_YAW]:'请确保 "target.yaw" 是一个数字（跳转后的水平角度）',[te.INVALID_TARGET_PITCH]:'请确保 "target.pitch" 是一个数字（跳转后的垂直角度）',[te.INVALID_TARGET_FOV]:'请确保 "target.fov" 是一个数字（跳转后的视野角度）',[te.MISSING_TARGET_URL]:'视频类型的热点必须包含 "target.url" 字段，填入视频的 URL'};class Xm{constructor(e,t,n){E(this,"element");this.element=document.createElement("div"),this.element.className="config-error-panel",this.render(e,t,n),this.applyStyles()}render(e,t,n){this.element.innerHTML=`
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
    `;const s=this.element.querySelector("#retry-btn"),r=this.element.querySelector("#example-btn");s&&s.addEventListener("click",t),r&&r.addEventListener("click",n)}renderErrorCard(e,t){const n=hl[e.code]||"配置错误",s=ul[e.code]||"请检查配置文件的格式和内容",r=[];e.museumName&&r.push(`馆：${e.museumName}`),e.sceneName&&r.push(`场景：${e.sceneName}`);const a=r.length>0?r.join(" / "):"全局配置";return`
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
            <span class="hint-text">${this.escapeHtml(s)}</span>
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}class Ym{constructor(){E(this,"element");E(this,"isVisible",!1);E(this,"currentYaw",0);E(this,"currentPitch",0);E(this,"currentFov",75);E(this,"clickX",0);E(this,"clickY",0);this.element=document.createElement("div"),this.element.className="debug-panel",this.element.style.display="none",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
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
    `;const e=this.element.querySelector("#debug-close-btn");e&&e.addEventListener("click",()=>{this.hide()});const t=this.element.querySelector("#debug-copy-btn");t&&t.addEventListener("click",()=>{this.copyHotspotJSON()})}show(e,t,n,s,r){this.clickX=e,this.clickY=t,this.currentYaw=n,this.currentPitch=s,this.currentFov=r;const a=this.element.querySelector("#debug-yaw"),o=this.element.querySelector("#debug-pitch"),l=this.element.querySelector("#debug-fov");a&&(a.textContent=n.toFixed(1)),o&&(o.textContent=s.toFixed(1)),l&&(l.textContent=r.toFixed(1));const c=280,d=200,h=20;let f=e-c/2,p=t-d/2;f=Math.max(h,Math.min(f,window.innerWidth-c-h)),p=Math.max(h,Math.min(p,window.innerHeight-d-h)),this.element.style.left=`${f}px`,this.element.style.top=`${p}px`,this.element.style.display="block",this.isVisible=!0}hide(){this.element.style.display="none",this.isVisible=!1}updateView(e,t,n){if(this.currentYaw=e,this.currentPitch=t,this.currentFov=n,this.isVisible){const s=this.element.querySelector("#debug-yaw"),r=this.element.querySelector("#debug-pitch"),a=this.element.querySelector("#debug-fov");s&&(s.textContent=e.toFixed(1)),r&&(r.textContent=t.toFixed(1)),a&&(a.textContent=n.toFixed(1))}}async copyHotspotJSON(){const e={id:`hs_${Date.now()}`,yaw:Math.round(this.currentYaw*10)/10,pitch:Math.round(this.currentPitch*10)/10,type:"scene",targetSceneId:"",label:"热点"},t=JSON.stringify(e,null,2);try{await navigator.clipboard.writeText(t),this.showToast("✅ 已复制到剪贴板")}catch{const s=document.createElement("textarea");s.value=t,s.style.position="fixed",s.style.opacity="0",document.body.appendChild(s),s.select();try{document.execCommand("copy"),this.showToast("✅ 已复制到剪贴板")}catch{this.showToast("❌ 复制失败，请手动复制")}document.body.removeChild(s)}}showToast(e){const t=document.createElement("div");t.className="debug-toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.classList.add("show")},10),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>{document.body.removeChild(t)},300)},2e3)}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}const Ar="vrplayer_config_draft_v1";function Eo(){try{const i=localStorage.getItem(Ar);return i?JSON.parse(i):null}catch(i){return console.warn("加载草稿失败",i),null}}function qm(i){try{const e=JSON.stringify(i);return localStorage.setItem(Ar,e),{ok:!0}}catch(e){return console.warn("保存草稿失败",e),{ok:!1,reason:e instanceof Error?e.message:"unknown"}}}function $m(){try{localStorage.removeItem(Ar)}catch(i){console.warn("清空草稿失败",i)}}const fl="vr_last_pick_v1";let Cr=null;function jm(){try{const i=localStorage.getItem(fl);if(i){const e=JSON.parse(i);typeof e.yaw=="number"&&typeof e.pitch=="number"&&typeof e.ts=="number"&&(Cr=e)}}catch{}}jm();function Km(i){Cr=i;try{localStorage.setItem(fl,JSON.stringify(i))}catch{}}function So(){return Cr}const Mo="vrplayer_config_draft_ignore_session";class Zm{constructor(e,t){E(this,"element");E(this,"config");E(this,"initialConfig");E(this,"editingTarget",{type:"global"});E(this,"simpleMode",!0);E(this,"validationErrors",[]);E(this,"validationDebounceTimer",null);E(this,"draftSaveTimer",null);E(this,"draftLoaded",!1);E(this,"draftIgnoreSession",!1);E(this,"draftBannerMessage",null);E(this,"onConfigChange");this.config=JSON.parse(JSON.stringify(e)),this.initialConfig=JSON.parse(JSON.stringify(e)),this.onConfigChange=t;try{this.draftIgnoreSession=sessionStorage.getItem(Mo)==="1"}catch(n){console.warn("读取草稿忽略状态失败",n),this.draftIgnoreSession=!1}this.tryRestoreDraft(),this.element=document.createElement("div"),this.element.className="config-studio",this.render(),this.applyStyles(),this.renderDraftBanner(),this.validateConfig()}tryRestoreDraft(){if(this.draftIgnoreSession)return;const e=Eo();e&&(this.config=JSON.parse(JSON.stringify(e)),this.draftLoaded=!0,this.draftBannerMessage="检测到未导出的草稿，已自动恢复。",this.onConfigChange&&this.onConfigChange(this.config))}renderDraftBanner(){const e=this.element.querySelector("#draft-banner");if(!e)return;if(!this.draftLoaded||this.draftIgnoreSession){e.innerHTML="",e.style.display="none";return}const t=this.draftBannerMessage||"检测到未导出的草稿，已自动恢复。";e.innerHTML=`
      <div class="draft-banner-content">
        <span class="draft-banner-text">${this.escapeHtml(t)}</span>
        <div class="draft-banner-actions">
          <button class="banner-btn" data-banner-action="export">导出</button>
          <button class="banner-btn" data-banner-action="clear">清空草稿</button>
          <button class="banner-btn" data-banner-action="ignore">忽略本次</button>
        </div>
      </div>
    `,e.style.display="flex",this.bindDraftBannerEvents()}bindDraftBannerEvents(){const e=this.element.querySelector("#draft-banner");e&&e.querySelectorAll("[data-banner-action]").forEach(t=>{t.addEventListener("click",n=>{const s=n.currentTarget.getAttribute("data-banner-action");s==="export"?this.handleExport():s==="clear"?this.handleClearDraft():s==="ignore"&&this.handleIgnoreDraft()})})}handleIgnoreDraft(){this.draftIgnoreSession=!0;try{sessionStorage.setItem(Mo,"1")}catch(e){console.warn("记录忽略草稿状态失败",e)}this.config=JSON.parse(JSON.stringify(this.initialConfig)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.bindEvents(),this.debouncedValidate(),this.notifyChange({skipDraftSave:!0}),this.renderDraftBanner(),this.showToast("已忽略草稿，本次会话使用默认配置")}handleClearDraft(){confirm("确定清空本地草稿？")&&($m(),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderDraftBanner(),this.showToast("草稿已清空"))}handleExport(){this.exportConfig();const e=Eo();e&&this.isConfigSameAs(e)&&this.showToast("已导出（草稿仍保留）")}exportConfig(){const e=JSON.stringify(this.config,null,2),t=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(t),s=document.createElement("a");s.href=n,s.download="config.json",s.click(),URL.revokeObjectURL(n)}isConfigSameAs(e){try{return JSON.stringify(this.config)===JSON.stringify(e)}catch{return!1}}render(){this.element.innerHTML=`
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
        ${t.scenes.map((s,r)=>`
          <div class="tree-item scene-item ${this.editingTarget.type==="scene"&&this.editingTarget.museumIndex===n&&this.editingTarget.sceneIndex===r?"active":""}" data-target="scene:${n}:${r}">
            <span class="tree-icon">📷</span>
            <span class="tree-label">${this.escapeHtml(s.name)}</span>
            ${this.simpleMode?`
              <button class="tree-btn-add" data-action="add-hotspot-scene" data-museum="${n}" data-scene="${r}" title="添加跳转热点">+ 添加跳转</button>
              <button class="tree-btn-add" data-action="add-hotspot-video" data-museum="${n}" data-scene="${r}" title="添加视频热点">+ 添加视频</button>
            `:`
              <button class="tree-btn-add" data-action="add-hotspot" data-museum="${n}" data-scene="${r}" title="添加热点">+</button>
            `}
            <button class="tree-btn-del" data-action="del-scene" data-museum="${n}" data-scene="${r}" title="删除场景">×</button>
          </div>
          ${s.hotspots.map((a,o)=>`
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
      `;return}if(this.editingTarget.type==="hotspot"){const n=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex],s=n.type==="scene",r=n.type==="video";if(e.textContent=`编辑热点：${n.label}`,!s&&!r){t.innerHTML=`
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
            <option value="scene" ${s?"selected":""}>跳转场景</option>
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
        ${s?`
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
    `}renderHotspotForm(e,t,n,s){const r=e.type==="scene";return`
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
    `}bindEvents(){var a;const e=this.element.querySelector("#import-btn"),t=this.element.querySelector("#export-btn"),n=this.element.querySelector("#reset-btn"),s=this.element.querySelector("#clear-draft-btn");this.element.querySelector("#file-input");const r=this.element.querySelector("#simple-mode-toggle");r&&(r.checked=this.simpleMode,r.addEventListener("change",()=>{this.simpleMode=r.checked,this.renderSidebar(),this.renderEditor(),this.bindEvents()})),e==null||e.addEventListener("click",()=>{const o=prompt("请粘贴 JSON 配置：");if(o)try{const l=JSON.parse(o);this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(l){alert("JSON 格式错误："+l)}}),t==null||t.addEventListener("click",()=>{this.handleExport()}),n==null||n.addEventListener("click",async()=>{try{const l=await(await fetch("./config.json",{cache:"no-store"})).json();this.config=l,this.initialConfig=JSON.parse(JSON.stringify(l)),this.draftLoaded=!1,this.draftBannerMessage=null,this.renderSidebar(),this.renderEditor(),this.validateConfig(),this.notifyChange(),this.renderDraftBanner()}catch(o){alert("加载示例配置失败："+o)}}),s==null||s.addEventListener("click",()=>{this.handleClearDraft()}),this.element.querySelectorAll(".tree-item[data-target]").forEach(o=>{o.addEventListener("click",l=>{const c=o.getAttribute("data-target");if(c){if(c==="global")this.editingTarget={type:"global"};else if(c.startsWith("museum:")){const d=parseInt(c.split(":")[1]);this.editingTarget={type:"museum",museumIndex:d}}else if(c.startsWith("scene:")){const[d,h,f]=c.split(":").map(Number);this.editingTarget={type:"scene",museumIndex:h,sceneIndex:f}}else if(c.startsWith("hotspot:")){const[d,h,f,p]=c.split(":").map(Number);this.editingTarget={type:"hotspot",museumIndex:h,sceneIndex:f,hotspotIndex:p}}this.renderSidebar(),this.renderEditor(),this.bindFormEvents()}})}),(a=this.element.querySelector("#add-museum-btn"))==null||a.addEventListener("click",()=>{this.addMuseum()}),this.element.querySelectorAll("[data-action]").forEach(o=>{o.addEventListener("click",l=>{l.stopPropagation();const c=o.getAttribute("data-action"),d=parseInt(o.getAttribute("data-museum")||"0"),h=parseInt(o.getAttribute("data-scene")||"0"),f=parseInt(o.getAttribute("data-hotspot")||"0");c==="add-scene"?this.addScene(d):c==="del-museum"?confirm("确定删除此博物馆？")&&this.deleteMuseum(d):c==="add-hotspot"?this.addHotspot(d,h,"scene"):c==="add-hotspot-scene"?this.addHotspot(d,h,"scene"):c==="add-hotspot-video"?this.addHotspot(d,h,"video"):c==="del-scene"?confirm("确定删除此场景？")&&this.deleteScene(d,h):c==="del-hotspot"&&confirm("确定删除此热点？")&&this.deleteHotspot(d,h,f)})}),this.bindFormEvents()}bindFormEvents(){if(this.editingTarget.type==="global"){const e=this.element.querySelector("#field-appName");e==null||e.addEventListener("input",()=>{this.config.appName=e.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="museum"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-cover");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].cover=n.value,this.debouncedValidate(),this.notifyChange()})}if(this.editingTarget.type==="scene"){const e=this.element.querySelector("#field-id"),t=this.element.querySelector("#field-name"),n=this.element.querySelector("#field-thumb"),s=this.element.querySelector("#field-panoLow"),r=this.element.querySelector("#field-pano"),a=this.element.querySelector("#preview-scene-btn");e==null||e.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].id=e.value,this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].name=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].thumb=n.value,this.debouncedValidate(),this.notifyChange()}),s==null||s.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];s.value?l.panoLow=s.value:delete l.panoLow,this.debouncedValidate(),this.notifyChange()}),r==null||r.addEventListener("input",()=>{const l=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex];r.value?l.pano=r.value:delete l.pano,this.debouncedValidate(),this.notifyChange()}),a==null||a.addEventListener("click",()=>{const l=this.config.museums[this.editingTarget.museumIndex],c=l.scenes[this.editingTarget.sceneIndex];qt(l.id,c.id)});const o=this.element.querySelector("#pick-hotspot-btn");o==null||o.addEventListener("click",()=>{this.handleAddHotspotFromPick()})}if(this.editingTarget.type==="hotspot"){const e=this.element.querySelector("#field-type"),t=this.element.querySelector("#field-label"),n=this.element.querySelector("#field-yaw"),s=this.element.querySelector("#field-pitch"),r=this.element.querySelector("#field-target-museumId"),a=this.element.querySelector("#field-target-sceneId"),o=this.element.querySelector("#field-target-url");e==null||e.addEventListener("change",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex];c.type=e.value,c.type==="scene"?c.target={museumId:"",sceneId:""}:c.target={url:""},this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}),t==null||t.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].label=t.value,this.renderSidebar(),this.debouncedValidate(),this.notifyChange()}),n==null||n.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].yaw=parseFloat(n.value)||0,this.debouncedValidate(),this.notifyChange()}),s==null||s.addEventListener("input",()=>{this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].pitch=parseFloat(s.value)||0,this.debouncedValidate(),this.notifyChange()});const l=this.element.querySelector("#pick-reposition-btn");l==null||l.addEventListener("click",()=>{this.handleRepositionHotspot()}),r&&r.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.museumId||(c.museumId=""),c.museumId=r.value,this.debouncedValidate(),this.notifyChange()}),a&&a.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.sceneId||(c.sceneId=""),c.sceneId=a.value,this.debouncedValidate(),this.notifyChange()}),o&&o.addEventListener("input",()=>{const c=this.config.museums[this.editingTarget.museumIndex].scenes[this.editingTarget.sceneIndex].hotspots[this.editingTarget.hotspotIndex].target;c.url||(c.url=""),c.url=o.value,this.debouncedValidate(),this.notifyChange()})}}addMuseum(){const e={id:`museum_${Date.now()}`,name:"新博物馆",cover:"",map:{image:"",width:1e3,height:600},scenes:[]};this.config.museums.push(e),this.editingTarget={type:"museum",museumIndex:this.config.museums.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addScene(e){const t={id:`scene_${Date.now()}`,name:"新场景",thumb:"",pano:"",initialView:{yaw:0,pitch:0,fov:75},mapPoint:{x:0,y:0},hotspots:[]};this.config.museums[e].scenes.push(t),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:this.config.museums[e].scenes.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}addHotspot(e,t,n="scene"){const s={id:`hotspot_${Date.now()}`,type:n,label:n==="video"?"新视频热点":"新跳转热点",yaw:0,pitch:0,target:n==="video"?{url:""}:{museumId:this.config.museums[e].id,sceneId:""}};this.config.museums[e].scenes[t].hotspots.push(s),this.editingTarget={type:"hotspot",museumIndex:e,sceneIndex:t,hotspotIndex:this.config.museums[e].scenes[t].hotspots.length-1},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteMuseum(e){this.config.museums.splice(e,1),this.editingTarget={type:"global"},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteScene(e,t){this.config.museums[e].scenes.splice(t,1),this.editingTarget={type:"museum",museumIndex:e},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}deleteHotspot(e,t,n){this.config.museums[e].scenes[t].hotspots.splice(n,1),this.editingTarget={type:"scene",museumIndex:e,sceneIndex:t},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange()}debouncedValidate(){this.validationDebounceTimer&&clearTimeout(this.validationDebounceTimer),this.validationDebounceTimer=window.setTimeout(()=>{this.validateConfig()},200)}validateConfig(){this.validationErrors=wo(this.config),this.updateValidationStatus(),this.renderErrors()}scheduleDraftSave(e){e||(this.draftSaveTimer&&clearTimeout(this.draftSaveTimer),this.draftSaveTimer=window.setTimeout(()=>{const t=qm(this.config);t.ok?this.draftLoaded=!0:this.showToast(`草稿保存失败：${t.reason||"未知原因"}`)},300))}updateValidationStatus(){const e=this.element.querySelector("#validation-status");e&&(this.validationErrors.length===0?(e.innerHTML="✅ 配置通过",e.className="validation-status status-ok"):(e.innerHTML=`❌ ${this.validationErrors.length} 个错误`,e.className="validation-status status-error"))}renderErrors(){const e=this.element.querySelector("#studio-errors");if(e){if(this.validationErrors.length===0){e.innerHTML="";return}e.innerHTML=`
      <div class="studio-errors-content">
        <div class="errors-header">配置错误 (${this.validationErrors.length} 个)</div>
        <div class="errors-list">
          ${this.validationErrors.map(t=>{const n=t.code&&hl[t.code]||"配置错误",s=t.code&&ul[t.code]||"请检查配置",r=[];t.museumName&&r.push(`馆：${t.museumName}`),t.sceneName&&r.push(`场景：${t.sceneName}`);const a=r.length>0?r.join(" / "):"全局配置";return`
              <div class="error-card-mini">
                <div class="error-card-header">
                  <span class="error-icon">❌</span>
                  <span class="error-title">${this.escapeHtml(n)}</span>
                </div>
                <div class="error-card-body">
                  <div class="error-location">📍 ${this.escapeHtml(a)}</div>
                  ${t.fieldName?`<div class="error-field">字段：${this.escapeHtml(t.fieldName)}</div>`:""}
                  <div class="error-hint">💡 ${this.escapeHtml(s)}</div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `}}notifyChange(e){this.onConfigChange&&this.onConfigChange(this.config),this.scheduleDraftSave(!!(e!=null&&e.skipDraftSave))}showToast(e){const t=document.createElement("div");t.className="studio-toast",t.textContent=e,this.element.appendChild(t),requestAnimationFrame(()=>{t.classList.add("show")}),window.setTimeout(()=>{t.classList.remove("show"),window.setTimeout(()=>t.remove(),300)},2e3)}escapeHtml(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}handleAddHotspotFromPick(){const e=So();if(!e){nt("没有拾取点：先点右上角🎯，在全景里点一下");return}if(this.editingTarget.type!=="scene"){nt("请先选择一个场景");return}const{museumIndex:t,sceneIndex:n}=this.editingTarget,s=this.config.museums[t].scenes[n],r={id:`hs_${Date.now()}`,type:"scene",yaw:e.yaw,pitch:e.pitch,label:"进入场景",target:{sceneId:""}};s.hotspots||(s.hotspots=[]),s.hotspots.push(r),this.renderSidebar(),this.renderEditor(),this.bindFormEvents();const a=s.hotspots.length-1;this.highlightNewHotspot(t,n,a),this.editingTarget={type:"hotspot",museumIndex:t,sceneIndex:n,hotspotIndex:a},this.renderSidebar(),this.renderEditor(),this.bindFormEvents(),this.debouncedValidate(),this.notifyChange(),nt("已新增热点：请在配置里补全目标场景")}highlightNewHotspot(e,t,n){window.setTimeout(()=>{const s=this.element.querySelector("#sidebar-tree");if(!s)return;const r=s.querySelectorAll(".hotspot-item"),a=r[r.length-1];a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}handleRepositionHotspot(){if(this.editingTarget.type!=="hotspot"){nt("请先选择一个热点");return}const e=So();if(!e){nt("没有拾取点：先点右上角🎯，在全景里点一下");return}const{museumIndex:t,sceneIndex:n,hotspotIndex:s}=this.editingTarget,r=this.config.museums[t].scenes[n].hotspots[s],a=c=>Math.round(c*10)/10,o=a(e.yaw),l=a(e.pitch);r.yaw=o,r.pitch=l,this.renderEditor(),this.bindFormEvents(),this.highlightHotspotItem(t,n,s),this.debouncedValidate(),this.notifyChange(),window.dispatchEvent(new CustomEvent("vr:pickmode",{detail:{enabled:!1}})),nt(`已更新位置 yaw:${o.toFixed(1)} pitch:${l.toFixed(1)}`)}highlightHotspotItem(e,t,n){window.setTimeout(()=>{const s=this.element.querySelector("#sidebar-tree");if(!s)return;const r=`hotspot:${e}:${t}:${n}`,a=s.querySelector(`[data-target="${r}"]`);a&&(a.classList.add("tree-item--flash"),window.setTimeout(()=>{a.classList.remove("tree-item--flash")},300))},50)}getConfig(){return this.config}getElement(){return this.element}remove(){this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}}function Jm(){const i=document;return document.fullscreenElement||i.webkitFullscreenElement||null}function Ir(){return!!Jm()}async function Qm(i){const e=i;if(e.requestFullscreen){await e.requestFullscreen();return}if(e.webkitRequestFullscreen){await e.webkitRequestFullscreen();return}throw new Error("Fullscreen API not supported")}async function eg(){const i=document;if(document.exitFullscreen){await document.exitFullscreen();return}if(i.webkitExitFullscreen){await i.webkitExitFullscreen();return}}function tg(){const i=navigator.userAgent||"";return/Android|iPhone|iPad|iPod|Mobile/i.test(i)}async function ng(){var i;try{if((i=screen.orientation)!=null&&i.lock){await screen.orientation.lock("landscape");return}throw new Error("screen.orientation.lock not available")}catch{tg()&&nt("建议横屏观看")}}function ig(){var i,e;try{(e=(i=screen.orientation)==null?void 0:i.unlock)==null||e.call(i)}catch{}}async function sg(i){if(Ir()){await eg();return}await Qm(i),await ng()}function rg(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 4H4V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 4H20V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 20H4V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 20H20V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}function ag(){return`
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 9V4h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 9V4h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 15v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 15v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 9l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 9l3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 15l-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 15l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`}class og{constructor(e){E(this,"element");E(this,"titleEl");E(this,"fullscreenBtn");E(this,"pickModeBtn",null);E(this,"viewerRootEl");E(this,"onTogglePickMode");E(this,"isPickModeActive",!1);this.viewerRootEl=e.viewerRootEl,this.onTogglePickMode=e.onTogglePickMode,this.element=document.createElement("div"),this.element.className="vr-topbar vr-glass";const t=a=>{const o=a;this.updatePickModeState(o.detail.enabled)};window.addEventListener("vr:pickmode",t);const n=document.createElement("div");n.className="vr-topbar-inner";const s=document.createElement("div");this.titleEl=document.createElement("div"),this.titleEl.className="vr-topbar-title",this.titleEl.textContent=e.title;const r=document.createElement("div");r.className="vr-topbar-right",this.fullscreenBtn=document.createElement("button"),this.fullscreenBtn.className="vr-btn vr-icon-btn",this.fullscreenBtn.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation();const o=this.viewerRootEl;if(!o){console.warn("[ui] fullscreen target not set");return}try{await sg(o)}catch(l){console.warn("[ui] toggleFullscreen failed",l)}finally{this.syncFullscreenState()}}),this.syncFullscreenState(),this.onTogglePickMode&&(this.pickModeBtn=document.createElement("button"),this.pickModeBtn.className="vr-btn vr-icon-btn",this.pickModeBtn.setAttribute("aria-label","拾取模式"),this.pickModeBtn.title="拾取模式：点一下画面获取 yaw/pitch",this.pickModeBtn.textContent="🎯",this.pickModeBtn.style.fontSize="18px",this.pickModeBtn.addEventListener("click",a=>{if(a.preventDefault(),a.stopPropagation(),this.onTogglePickMode){const o=this.onTogglePickMode();this.updatePickModeState(o)}}),r.appendChild(this.pickModeBtn)),r.appendChild(this.fullscreenBtn),n.appendChild(s),n.appendChild(this.titleEl),n.appendChild(r),this.element.appendChild(n)}updatePickModeState(e){this.isPickModeActive=e,this.pickModeBtn&&(this.pickModeBtn.setAttribute("aria-label",e?"关闭拾取模式":"开启拾取模式"),this.pickModeBtn.title=e?"关闭拾取模式":"开启拾取模式：点一下画面获取 yaw/pitch",e?this.pickModeBtn.style.background="rgba(255,255,255,0.18)":this.pickModeBtn.style.background="")}setViewerRootEl(e){this.viewerRootEl=e}syncFullscreenState(){const e=Ir();this.fullscreenBtn.setAttribute("aria-label",e?"退出全屏":"进入全屏"),this.fullscreenBtn.title=e?"退出全屏":"进入全屏",this.fullscreenBtn.innerHTML=e?ag():rg()}setTitle(e){this.titleEl.textContent=e}getElement(){return this.element}remove(){this.element.remove()}}class lg{constructor(e={}){E(this,"element");E(this,"isOpen",!1);this.element=document.createElement("div"),this.element.className="vr-modal";const t=document.createElement("div");t.className="vr-modal-mask";const n=document.createElement("div");n.className="vr-modal-card";const s=document.createElement("div");s.className="vr-modal-title",s.textContent=e.brandText||"鼎虎清源";const r=document.createElement("div");r.className="vr-modal-desc",r.innerHTML=`
      <div>欢迎体验 ${e.appName?`<b>${e.appName}</b>`:"VR 全景导览"}。</div>
      <div style="margin-top:8px;">这是一个多展馆/多场景的 360° 全景演示播放器：支持场景传送（热点/导览）、地图入口（后续扩展位），并对移动端手势做了适配。</div>
    `;const a=document.createElement("div");a.className="vr-modal-actions";const o=document.createElement("button");o.className="vr-btn vr-modal-close",o.textContent="知道了",o.addEventListener("click",()=>this.close()),a.appendChild(o),n.appendChild(s),n.appendChild(r),n.appendChild(a),t.addEventListener("click",()=>this.close()),n.addEventListener("click",l=>l.stopPropagation()),this.element.appendChild(t),this.element.appendChild(n)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}}class cg{constructor(e={}){E(this,"element");E(this,"aboutModal");this.aboutModal=new lg({appName:e.appName,brandText:e.brandText||"鼎虎清源"}),this.element=document.createElement("div"),this.element.className="vr-brandmark",this.element.textContent=e.brandText||"鼎虎清源",this.element.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),this.aboutModal.open()})}getElement(){return this.element}getAboutModal(){return this.aboutModal}remove(){this.element.remove(),this.aboutModal.remove()}}const dg=["辱骂","傻逼","垃圾","滚开","暴力","色情","黄色","毒品","赌博","诈骗","恐怖","自杀","枪","炸弹","仇恨","歧视","hate","suicide","bomb","porn"];function bo(i){return(i||"").toLowerCase().replace(/\s+/g,"").replace(/[^\p{L}\p{N}]+/gu,"")}function hg(i){const e=bo(i);return e?dg.some(t=>e.includes(bo(String(t)))):!1}const Lr="vr_user",pl="vr_comments_v1",ml="vr_likes_v1",ug=1e4,fg=200,pg=50;function Rr(i,e){if(!i)return e;try{return JSON.parse(i)}catch{return e}}function gl(i){return`${i}_${Date.now()}_${Math.random().toString(16).slice(2,8)}`}function Ti(){const i=Rr(localStorage.getItem(Lr),null);return!i||typeof i!="object"||typeof i.id!="string"||typeof i.name!="string"?null:{id:i.id,name:i.name}}function mg(i){const e={id:gl("u"),name:i};return localStorage.setItem(Lr,JSON.stringify(e)),e}function vl(){localStorage.removeItem(Lr)}function _l(){const i=Rr(localStorage.getItem(pl),[]);return Array.isArray(i)?i:[]}function gg(i){localStorage.setItem(pl,JSON.stringify(i))}function vg(i){return _l().filter(e=>e.sceneId===i).sort((e,t)=>t.ts-e.ts).slice(0,pg)}function _g(i,e){const t=Ti();if(!t)return{ok:!1,reason:"not_logged_in"};const n=(e||"").trim();if(hg(n))return{ok:!1,reason:"banned"};const s=_l(),r=s.filter(l=>l.sceneId===i&&l.userId===t.id).sort((l,c)=>c.ts-l.ts)[0];if(r&&Date.now()-r.ts<ug)return{ok:!1,reason:"cooldown"};const o=[{id:gl("c"),sceneId:i,userId:t.id,userName:t.name,text:n,ts:Date.now()},...s].slice(0,fg);return gg(o),{ok:!0}}function xl(){return Rr(localStorage.getItem(ml),{likesCountByScene:{},likedByUser:{}})}function xg(i){localStorage.setItem(ml,JSON.stringify(i))}function Eg(i,e){var r;const t=xl(),n=t.likesCountByScene[i]||0,s=e?!!((r=t.likedByUser[e])!=null&&r[i]):!1;return{count:n,liked:s}}function yo(i,e){return Eg(i,e)}function Sg(i){const e=Ti();if(!e)return{ok:!1,reason:"login_required"};const t=xl();t.likedByUser[e.id]||(t.likedByUser[e.id]={});const s=!!!t.likedByUser[e.id][i];t.likedByUser[e.id][i]=s;const r=t.likesCountByScene[i]||0;return t.likesCountByScene[i]=Math.max(0,r+(s?1:-1)),xg(t),{ok:!0,action:s?"liked":"unliked",count:t.likesCountByScene[i]}}class Mg{constructor(e={}){E(this,"element");E(this,"isOpen",!1);E(this,"inputEl");E(this,"options");E(this,"handleKeyDownBound");this.options=e,this.handleKeyDownBound=g=>this.handleKeyDown(g),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const t=document.createElement("div");t.className="vr-modal-mask";const n=document.createElement("div");n.className="vr-modal-card vr-login-card";const s=document.createElement("div");s.className="vr-login-title-row";const r=document.createElement("div");r.className="vr-modal-title",r.textContent="登录";const a=document.createElement("button");a.className="vr-btn vr-login-close",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",()=>this.close()),s.appendChild(r),s.appendChild(a);const o=document.createElement("div");o.className="vr-modal-desc",o.textContent="输入用户名后，可点赞与留言（本地存储）。";const l=document.createElement("div");l.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",g=>{g.key==="Enter"&&this.handleConfirm()});const c=document.createElement("div");c.className="vr-modal-actions vr-login-actions";const d=document.createElement("button");d.className="vr-btn vr-login-btn",d.textContent="取消",d.addEventListener("click",()=>this.close());const h=document.createElement("button");h.className="vr-btn vr-login-btn danger",h.textContent="退出登录",h.addEventListener("click",()=>{var g,m;vl(),(m=(g=this.options).onLogout)==null||m.call(g),this.close()});const f=document.createElement("button");f.className="vr-btn vr-login-btn primary",f.textContent="确认",f.addEventListener("click",()=>this.handleConfirm()),c.appendChild(d),c.appendChild(h),c.appendChild(f),l.appendChild(this.inputEl),n.appendChild(s),n.appendChild(o),n.appendChild(l),n.appendChild(c),t.addEventListener("click",()=>this.close()),n.addEventListener("click",g=>g.stopPropagation()),this.element.appendChild(t),this.element.appendChild(n);const p=()=>{const g=Ti();h.style.display=g?"inline-flex":"none"},v=this.open.bind(this);this.open=()=>{p(),v()}}handleKeyDown(e){this.isOpen&&e.key==="Escape"&&this.close()}handleConfirm(){var n,s;const e=(this.inputEl.value||"").trim();if(e.length<2||e.length>12){nt("用户名需 2-12 字");return}const t=mg(e);(s=(n=this.options).onLogin)==null||s.call(n,t),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const e=Ti();this.inputEl.value=(e==null?void 0:e.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class bg{constructor(e){E(this,"element");E(this,"sceneId");E(this,"sceneName");E(this,"subtitleEl");E(this,"loginHintBtn");E(this,"userLineEl");E(this,"userNameEl");E(this,"likeBtn");E(this,"likeCountEl");E(this,"commentsEl");E(this,"inputEl");E(this,"sendBtn");E(this,"loginModal");E(this,"highlightNextFirstComment",!1);this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.element=document.createElement("div"),this.element.className="vr-community";const t=document.createElement("div");t.className="vr-community-header";const n=document.createElement("div");n.className="vr-community-title",n.textContent="微社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle",t.appendChild(n),t.appendChild(this.subtitleEl);const s=document.createElement("div");s.className="vr-community-content";const r=document.createElement("div");r.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可点赞/留言",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const a=document.createElement("button");a.className="vr-btn vr-community-logout",a.textContent="退出登录",a.addEventListener("click",()=>{vl(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(a),r.appendChild(this.loginHintBtn),r.appendChild(this.userLineEl);const o=document.createElement("div");o.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="Like",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const c=Sg(this.sceneId);if(!c.ok){nt("请先登录"),this.loginModal.open();return}this.renderLikes(c.count,c.action==="liked"),nt(c.action==="liked"?"已点赞":"已取消点赞")}),o.appendChild(this.likeBtn),o.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const l=document.createElement("div");l.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",c=>{c.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),l.appendChild(this.inputEl),l.appendChild(this.sendBtn),s.appendChild(r),s.appendChild(o),s.appendChild(this.commentsEl),s.appendChild(l),this.element.appendChild(t),this.element.appendChild(s),this.loginModal=new Mg({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(e.sceneId,e.sceneName)}setScene(e,t){this.sceneId=e,this.sceneName=t,this.subtitleEl.textContent=this.sceneName?`当前：${this.sceneName}`:`当前场景：${this.sceneId}`,this.refresh()}toastByReason(e){e==="not_logged_in"?nt("请先登录"):e==="banned"?nt("内容包含敏感词，已拦截"):e==="cooldown"?nt("评论过于频繁，请稍后再试"):e==="EMPTY"&&nt("请输入内容")}formatRelativeTime(e){const t=Date.now()-e;if(t<6e4)return"刚刚";const n=Math.floor(t/6e4);if(n<60)return`${n} 分钟前`;const s=Math.floor(n/60);return s<24?`${s} 小时前`:new Date(e).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(e,t){this.likeCountEl.textContent=String(e),this.likeBtn.classList.toggle("liked",t)}renderComments(e){this.commentsEl.innerHTML="";const t=document.createElement("div");if(t.className="vr-community-tip",t.textContent="仅显示本场景的最近 50 条留言",this.commentsEl.appendChild(t),!e.length){const s=document.createElement("div");s.className="vr-community-empty",s.textContent="还没有留言，来做第一个发言的人吧。",this.commentsEl.appendChild(s);return}let n=null;for(const s of e){const r=document.createElement("div");r.className="vr-community-comment";const a=document.createElement("div");a.className="vr-community-comment-meta",a.textContent=`${s.userName} · ${this.formatRelativeTime(s.ts)}`;const o=document.createElement("div");o.className="vr-community-comment-text",o.textContent=s.text,r.appendChild(a),r.appendChild(o),this.commentsEl.appendChild(r),n||(n=r)}n&&this.highlightNextFirstComment&&(n.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{n==null||n.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const t=(this.inputEl.value||"").trim();if(!t){this.toastByReason("EMPTY");return}const n=_g(this.sceneId,t);if(!n.ok){n.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(n.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,nt("评论已发布")}refresh(){const e=Ti();this.loginHintBtn.style.display=e?"none":"inline-flex",this.userLineEl.style.display=e?"flex":"none",this.userNameEl.textContent=e?e.name:"";const t=yo(this.sceneId,(e==null?void 0:e.id)||"anon").count,n=e?yo(this.sceneId,e.id).liked:!1;this.renderLikes(t,n),this.renderComments(vg(this.sceneId));const s=!e;this.inputEl.disabled=s,this.sendBtn.classList.toggle("disabled",s)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}class yg{constructor(e){E(this,"element");E(this,"museum");E(this,"scenes");E(this,"currentSceneId");E(this,"onClose");E(this,"mapContainer");E(this,"mapImage");E(this,"pointsContainer");E(this,"unsubscribeFocus",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-map-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-map-header";const t=document.createElement("div");t.className="vr-map-title",t.textContent="平面图";const n=document.createElement("button");n.className="vr-btn vr-map-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(n),this.mapContainer=document.createElement("div"),this.mapContainer.className="vr-map-container",this.mapImage=document.createElement("img"),this.mapImage.className="vr-map-image",this.mapImage.src=this.museum.map.image,this.mapImage.alt=`${this.museum.name} 平面图`,this.mapImage.style.width="100%",this.mapImage.style.height="auto",this.mapImage.style.display="block",this.pointsContainer=document.createElement("div"),this.pointsContainer.className="vr-map-points",this.mapContainer.appendChild(this.mapImage),this.mapContainer.appendChild(this.pointsContainer);const s=document.createElement("div");s.className="vr-map-body",s.appendChild(this.mapContainer),this.element.appendChild(e),this.element.appendChild(s),this.mapImage.addEventListener("load",()=>{this.renderPoints()}),this.mapImage.complete&&this.renderPoints(),this.unsubscribeFocus=wi(r=>{this.handleSceneFocus(r)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="map"){const t=this.pointsContainer.querySelector(`[data-scene-id="${e.sceneId}"]`);t&&(t.classList.add("vr-map-point--focus-flash"),setTimeout(()=>{t.classList.remove("vr-map-point--focus-flash")},300))}}renderPoints(){if(this.pointsContainer.innerHTML="",!this.mapImage.complete||!this.mapContainer.offsetWidth){setTimeout(()=>this.renderPoints(),100);return}const e=this.museum.map.width,t=this.museum.map.height,n=this.mapContainer.offsetWidth,s=n*t/e;this.mapContainer.style.height=`${s}px`;const r=n/e,a=s/t;this.scenes.forEach(o=>{if(!o.mapPoint)return;const l=document.createElement("button");l.className="vr-btn vr-map-point",l.setAttribute("data-scene-id",o.id),l.setAttribute("aria-label",o.name),o.id===this.currentSceneId&&l.classList.add("vr-map-point--current");const d=o.mapPoint.x*r,h=o.mapPoint.y*a;l.style.left=`${d}px`,l.style.top=`${h}px`;const f=document.createElement("div");f.className="vr-map-point-marker",l.appendChild(f);const p=document.createElement("div");p.className="vr-map-point-tooltip",p.textContent=o.name,l.appendChild(p),l.addEventListener("mouseenter",()=>{Nt({type:"hover",museumId:this.museum.id,sceneId:o.id,source:"map",ts:Date.now()})}),l.addEventListener("mouseleave",()=>{Nt({type:"hover",museumId:this.museum.id,sceneId:null,source:"map",ts:Date.now()})}),l.addEventListener("click",v=>{v.preventDefault(),v.stopPropagation(),Nt({type:"focus",museumId:this.museum.id,sceneId:o.id,source:"map",ts:Date.now()}),qt(this.museum.id,o.id),this.onClose&&this.onClose()}),this.pointsContainer.appendChild(l)})}updateCurrentScene(e){this.currentSceneId=e,this.renderPoints()}updateMuseum(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.mapImage.src=e.map.image,this.renderPoints()}getElement(){return this.element}remove(){this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.element.remove()}}class Tg{constructor(e,t,n,s,r,a){E(this,"scene");E(this,"camera");E(this,"renderer");E(this,"container");E(this,"controls");E(this,"sceneNodes",new Map);E(this,"currentSceneId",null);E(this,"animationId",null);E(this,"museumId");E(this,"museum",null);E(this,"scenes");E(this,"onSceneClick");E(this,"unsubscribeFocus",null);E(this,"hoveredSceneId",null);E(this,"focusAnimation",null);E(this,"animate",()=>{this.animationId=requestAnimationFrame(this.animate),this.controls&&this.controls.update(),this.focusAnimation&&(this.focusAnimation.progress+=.05,this.focusAnimation.progress>=1?(this.camera.position.copy(this.focusAnimation.target),this.camera.lookAt(0,0,0),this.controls&&this.controls.update(),this.focusAnimation=null):(this.camera.position.lerpVectors(this.focusAnimation.start,this.focusAnimation.target,this.focusAnimation.progress),this.camera.lookAt(0,0,0)));const e=Date.now()*.001;this.sceneNodes.forEach(t=>{if(t.userData.isCurrent){const n=Math.sin(e*2)*.1+1;t.scale.set(n*1.2,n*1.2,n*1.2);const s=t.material;s.opacity=.6+Math.sin(e*2)*.2}}),this.renderer.render(this.scene,this.camera)});this.container=e,this.museumId=t,this.museum=a||null,this.scenes=n,this.currentSceneId=s,this.onSceneClick=r,this.scene=new ol,this.scene.background=null,this.camera=new Rt(50,e.clientWidth/e.clientHeight,.1,1e3),this.camera.position.set(0,5,10),this.camera.lookAt(0,0,0),this.renderer=new Sr({antialias:!0,alpha:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(this.renderer.domElement),this.initControls(),this.generateNodes(),this.setupLighting(),this.animate(),window.addEventListener("resize",()=>this.handleResize()),this.unsubscribeFocus=wi(o=>{this.handleSceneFocus(o)})}handleSceneFocus(e){if(e.type==="focus"&&e.source!=="dollhouse"){const t=this.sceneNodes.get(e.sceneId);if(t){const n=t.position.clone(),s=new N(n.x*.3,n.y+3,n.z+8);this.focusAnimation={target:s,start:this.camera.position.clone(),progress:0}}}}async initControls(){try{const{OrbitControls:e}=await hr(async()=>{const{OrbitControls:t}=await import("./OrbitControls-DDOaVyOJ.js");return{OrbitControls:t}},[],import.meta.url);this.controls=new e(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=3,this.controls.maxDistance=30,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.minPolarAngle=Math.PI/6}catch(e){console.warn("Failed to load OrbitControls:",e)}}setupLighting(){const e=new lm(16777215,.6);this.scene.add(e);const t=new om(16777215,.4);t.position.set(5,10,5),this.scene.add(t)}generateNodes(){this.sceneNodes.forEach(t=>{this.scene.remove(t),t.geometry.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material.dispose()}),this.sceneNodes.clear();const e=this.calculateLayout();this.scenes.forEach((t,n)=>{const s=e[n],r=this.createSceneNode(t,s,t.id===this.currentSceneId);this.sceneNodes.set(t.id,r),this.scene.add(r)})}calculateLayout(){var s,r,a,o;const e=[],t=this.scenes.filter(l=>l.mapPoint);if(t.length>0){const l=((r=(s=this.museum)==null?void 0:s.map)==null?void 0:r.width)||1e3,c=((o=(a=this.museum)==null?void 0:a.map)==null?void 0:o.height)||600;let d=1/0,h=-1/0,f=1/0,p=-1/0;t.forEach(w=>{w.mapPoint&&(d=Math.min(d,w.mapPoint.x),h=Math.max(h,w.mapPoint.x),f=Math.min(f,w.mapPoint.y),p=Math.max(p,w.mapPoint.y))});const v=h-d||l,g=p-f||c,m=v>0?10/v:.01,u=g>0?10/g:.01,y=(d+h)/2,x=(f+p)/2;for(const w of this.scenes)if(w.mapPoint)e.push({x:(w.mapPoint.x-y)*m,y:0,z:(w.mapPoint.y-x)*u});else{const R=Math.ceil(Math.sqrt(this.scenes.length)),I=Math.floor(e.length/R),C=e.length%R;e.push({x:(C-R/2)*2,y:0,z:(I-R/2)*2})}}else{const l=Math.ceil(Math.sqrt(this.scenes.length));for(let c=0;c<this.scenes.length;c++){const d=Math.floor(c/l),h=c%l;e.push({x:(h-l/2)*2,y:0,z:(d-l/2)*2})}}return e}createSceneNode(e,t,n){const s=new ci(1,1,1),r=n?4886754:8947848,a=new em({color:r,opacity:n?.8:.5,transparent:!0,metalness:.1,roughness:.7}),o=new Pt(s,a);return o.position.set(t.x,t.y,t.z),o.userData={sceneId:e.id,sceneName:e.name},o.userData.onClick=()=>{this.onSceneClick&&this.onSceneClick(this.museumId,e.id)},n&&(o.userData.isCurrent=!0,o.scale.set(1.2,1.2,1.2)),o}handleResize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}updateCurrentScene(e){this.currentSceneId=e,this.generateNodes()}updateScenes(e,t){this.scenes=e,this.currentSceneId=t,this.generateNodes()}setOnSceneClick(e){this.onSceneClick=e}handleClick(e){const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,s=-((e.clientY-t.top)/t.height)*2+1,r=new lr;r.setFromCamera(new Ge(n,s),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(a.length>0){const o=a[0].object,l=o.userData.sceneId;Nt({type:"focus",museumId:this.museumId,sceneId:l,source:"dollhouse",ts:Date.now()}),o.userData.onClick&&o.userData.onClick()}}handleMouseMove(e){const t=this.renderer.domElement.getBoundingClientRect(),n=(e.clientX-t.left)/t.width*2-1,s=-((e.clientY-t.top)/t.height)*2+1,r=new lr;r.setFromCamera(new Ge(n,s),this.camera);const a=r.intersectObjects(Array.from(this.sceneNodes.values()));if(this.sceneNodes.forEach(o=>{const l=o.material;o.userData.isCurrent||(l.opacity=.5)}),a.length>0){const o=a[0].object,l=o.material,c=o.userData.sceneId;o.userData.isCurrent||(l.opacity=.7),this.hoveredSceneId!==c&&(this.hoveredSceneId=c,Nt({type:"hover",museumId:this.museumId,sceneId:c,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="pointer"}else this.hoveredSceneId!==null&&(this.hoveredSceneId=null,Nt({type:"hover",museumId:this.museumId,sceneId:null,source:"dollhouse",ts:Date.now()})),this.renderer.domElement.style.cursor="default"}getDomElement(){return this.renderer.domElement}dispose(){this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=null),this.sceneNodes.forEach(e=>{this.scene.remove(e),e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.sceneNodes.clear(),this.renderer.dispose(),this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement),this.controls&&this.controls.dispose()}}class wg{constructor(e){E(this,"element");E(this,"museum");E(this,"scenes");E(this,"currentSceneId");E(this,"onClose");E(this,"container");E(this,"dollhouseScene",null);this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-dollhouse-panel",this.render()}render(){const e=document.createElement("div");e.className="vr-dollhouse-header";const t=document.createElement("div");t.className="vr-dollhouse-title",t.textContent="三维图";const n=document.createElement("button");n.className="vr-btn vr-dollhouse-close",n.innerHTML="✕",n.setAttribute("aria-label","关闭"),n.addEventListener("click",()=>{this.onClose&&this.onClose()}),e.appendChild(t),e.appendChild(n),this.container=document.createElement("div"),this.container.className="vr-dollhouse-container";const s=document.createElement("div");s.className="vr-dollhouse-body",s.appendChild(this.container),this.element.appendChild(e),this.element.appendChild(s),this.initDollhouseScene()}initDollhouseScene(){this.dollhouseScene&&this.dollhouseScene.dispose(),this.dollhouseScene=new Tg(this.container,this.museum.id,this.scenes,this.currentSceneId,(t,n)=>{qt(t,n),this.onClose&&this.onClose()},this.museum);const e=this.dollhouseScene.getDomElement();e.addEventListener("click",t=>{var n;(n=this.dollhouseScene)==null||n.handleClick(t)}),e.addEventListener("mousemove",t=>{var n;(n=this.dollhouseScene)==null||n.handleMouseMove(t)})}updateCurrentScene(e){this.currentSceneId=e,this.dollhouseScene&&this.dollhouseScene.updateCurrentScene(e)}updateMuseum(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.dollhouseScene?this.dollhouseScene.updateScenes(t,n):this.initDollhouseScene()}getElement(){return this.element}remove(){this.dollhouseScene&&(this.dollhouseScene.dispose(),this.dollhouseScene=null),this.element.remove()}}class Ag{constructor(e){E(this,"element");E(this,"currentTab");E(this,"sceneId");E(this,"sceneName");E(this,"museum");E(this,"scenes");E(this,"currentSceneId");E(this,"communityPanel",null);E(this,"mapPanel",null);E(this,"dollhousePanel",null);E(this,"unsubscribeInteracting",null);E(this,"unsubscribeIdle",null);E(this,"unsubscribeUIEngaged",null);this.currentTab=e.initialTab,this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.museum=e.museum,this.scenes=e.scenes,this.currentSceneId=e.currentSceneId||e.sceneId,this.element=document.createElement("div"),this.element.className="vr-panel vr-glass hidden",this.render(),this.setupInteractionListeners()}setupInteractionListeners(){this.unsubscribeInteracting=We.on("user-interacting",()=>{this.element.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=We.on("user-idle",()=>{this.element.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=We.on("ui-engaged",()=>{this.element.classList.remove("vr-ui-interacting")}),this.element.addEventListener("click",e=>{We.emitUIEngaged()},!0)}render(){if(this.element.classList.remove("vr-panel--community","vr-panel--map","vr-panel--dollhouse"),this.currentTab==="community"){this.element.classList.add("vr-panel--community"),this.element.innerHTML="";const n=this.sceneId||"unknown";this.communityPanel?this.communityPanel.setScene(n,this.sceneName):this.communityPanel=new bg({sceneId:n,sceneName:this.sceneName}),this.element.appendChild(this.communityPanel.getElement());return}if(this.currentTab==="map"){if(this.element.classList.add("vr-panel--map"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.museum&&this.scenes&&this.scenes.length>0){const n=this.currentSceneId||this.sceneId||this.scenes[0].id;this.mapPanel?this.mapPanel.updateCurrentScene(n):this.mapPanel=new yg({museum:this.museum,scenes:this.scenes,currentSceneId:n,onClose:()=>{this.setTab("guide")}}),this.element.appendChild(this.mapPanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">平面图</div>
          <div class="vr-panel-body">暂无平面图数据</div>
        `;return}if(this.currentTab==="dollhouse"){if(this.element.classList.add("vr-panel--dollhouse"),this.element.innerHTML="",this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.museum&&this.scenes&&this.scenes.length>0){const n=this.currentSceneId||this.sceneId||this.scenes[0].id;this.dollhousePanel?this.dollhousePanel.updateCurrentScene(n):this.dollhousePanel=new wg({museum:this.museum,scenes:this.scenes,currentSceneId:n,onClose:()=>{this.setTab("guide")}}),this.element.appendChild(this.dollhousePanel.getElement())}else this.element.innerHTML=`
          <div class="vr-panel-title">三维图</div>
          <div class="vr-panel-body">暂无场景数据</div>
        `;return}this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null);const{title:e,body:t}=this.getContentForTab(this.currentTab);this.element.innerHTML=`
      <div class="vr-panel-title">${e}</div>
      <div class="vr-panel-body">${t}</div>
    `}getContentForTab(e){return e==="guide"?{title:"导览",body:"打开导览抽屉，选择一个场景进入（当前仅 console.log）。"}:e==="info"?{title:"信息",body:"这里预留展示当前场景/展馆信息（后续接入配置与热点说明）。"}:e==="settings"?{title:"设置",body:"这里预留清晰度/灵敏度/陀螺仪等设置入口（仅骨架）。"}:{title:"社区",body:""}}setSceneContext(e,t){this.sceneId=e,this.sceneName=t,this.currentSceneId=e,this.currentTab==="community"&&this.communityPanel&&this.communityPanel.setScene(e,t),this.currentTab==="map"&&this.mapPanel&&this.mapPanel.updateCurrentScene(e),this.currentTab==="dollhouse"&&this.dollhousePanel&&this.dollhousePanel.updateCurrentScene(e)}setMuseumContext(e,t,n){this.museum=e,this.scenes=t,this.currentSceneId=n,this.currentTab==="map"&&this.mapPanel?this.mapPanel.updateMuseum(e,t,n):this.currentTab==="map"&&this.render(),this.currentTab==="dollhouse"&&this.dollhousePanel?this.dollhousePanel.updateMuseum(e,t,n):this.currentTab==="dollhouse"&&this.render()}setVisible(e){this.element.classList.remove("hidden","visible"),this.element.classList.add(e?"visible":"hidden")}setTab(e){this.currentTab=e,this.setVisible(!1),window.setTimeout(()=>{this.render(),this.setVisible(!0)},40)}getElement(){return this.element}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.communityPanel&&(this.communityPanel.remove(),this.communityPanel=null),this.mapPanel&&(this.mapPanel.remove(),this.mapPanel=null),this.dollhousePanel&&(this.dollhousePanel.remove(),this.dollhousePanel=null),this.element.remove()}}const Cg=[{key:"guide",label:"导览"},{key:"map",label:"平面图"},{key:"dollhouse",label:"三维图"},{key:"community",label:"社区"},{key:"settings",label:"设置"},{key:"info",label:"信息"}];class Ig{constructor(e={}){E(this,"element");E(this,"dockEl");E(this,"panels");E(this,"activeTab");E(this,"unsubscribeInteracting",null);E(this,"unsubscribeIdle",null);E(this,"unsubscribeUIEngaged",null);this.activeTab=e.initialTab||"guide",this.element=document.createElement("div"),this.element.className="vr-dock-wrap",this.panels=new Ag({initialTab:this.activeTab,sceneId:e.sceneId,sceneName:e.sceneName,museum:e.museum,scenes:e.scenes,currentSceneId:e.currentSceneId||e.sceneId}),this.panels.setVisible(!0),this.dockEl=document.createElement("div"),this.dockEl.className="vr-dock vr-glass";for(const t of Cg){const n=document.createElement("button");n.className="vr-btn vr-dock-tab",n.setAttribute("data-tab",t.key),n.innerHTML=`<div class="vr-dock-tab-label">${t.label}</div>`,n.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),We.emitUIEngaged(),this.setActiveTab(t.key),t.key==="guide"&&e.onGuideClick&&e.onGuideClick()}),this.dockEl.appendChild(n)}this.element.appendChild(this.panels.getElement()),this.element.appendChild(this.dockEl),this.syncActiveClass(),this.setupInteractionListeners()}setupInteractionListeners(){this.unsubscribeInteracting=We.on("user-interacting",()=>{this.element.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=We.on("user-idle",()=>{this.element.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=We.on("ui-engaged",()=>{this.element.classList.remove("vr-ui-interacting")})}syncActiveClass(){this.dockEl.querySelectorAll(".vr-dock-tab").forEach(e=>{const t=e.getAttribute("data-tab");t&&e.classList.toggle("active",t===this.activeTab)})}setActiveTab(e){this.activeTab!==e&&(this.activeTab=e,this.syncActiveClass(),this.panels.setTab(e))}setSceneContext(e,t){this.panels.setSceneContext(e,t)}setMuseumContext(e,t,n){this.panels.setMuseumContext(e,t,n)}getElement(){return this.element}remove(){this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=null),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=null),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=null),this.panels.remove(),this.element.remove()}}const To="data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
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
    </svg>`);class Lg{constructor(e){E(this,"element");E(this,"isOpen",!1);E(this,"museumId");E(this,"currentSceneId");E(this,"scenes");E(this,"filteredScenes");E(this,"listEl",null);E(this,"previewImgEl",null);E(this,"previewTitleEl",null);E(this,"previewIdEl",null);E(this,"searchInputEl",null);E(this,"hoveredSceneId",null);E(this,"onClose");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.filteredScenes=e.scenes,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-guide-drawer";const t=document.createElement("div");t.className="vr-guide-mask";const n=document.createElement("div");n.className="vr-guide-panel";const s=document.createElement("div");s.className="vr-guide-header";const r=document.createElement("div");r.className="vr-guide-title",r.textContent="导览";const a=document.createElement("button");a.className="vr-btn vr-guide-close",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),this.close()}),s.appendChild(r),s.appendChild(a);const o=document.createElement("div");o.className="vr-guide-search";const l=document.createElement("input");l.className="vr-guide-search-input",l.type="search",l.placeholder="搜索场景",o.appendChild(l),this.searchInputEl=l;const c=document.createElement("div");c.className="vr-guide-body";const d=document.createElement("div");d.className="vr-guide-list",this.listEl=d;const h=document.createElement("div");h.className="vr-guide-preview";const f=document.createElement("img");f.className="vr-guide-preview-image",this.previewImgEl=f;const p=document.createElement("div");p.className="vr-guide-preview-title",this.previewTitleEl=p;const v=document.createElement("div");v.className="vr-guide-preview-id",this.previewIdEl=v;const g=document.createElement("button");g.className="vr-btn vr-guide-preview-enter",g.textContent="进入",g.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const u=this.hoveredSceneId||this.currentSceneId;u&&(qt(this.museumId,u),this.close())}),h.appendChild(f),h.appendChild(p),h.appendChild(v),h.appendChild(g),c.appendChild(d),c.appendChild(h),t.addEventListener("click",()=>this.close()),n.addEventListener("click",m=>m.stopPropagation()),n.appendChild(s),n.appendChild(o),n.appendChild(c),this.element.appendChild(t),this.element.appendChild(n),this.bindSearch(),this.renderList(),this.updatePreview()}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"),(e=this.onClose)==null||e.call(this))}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}setCurrentScene(e){this.currentSceneId=e,this.updateActiveState(),this.updatePreview()}bindSearch(){this.searchInputEl&&this.searchInputEl.addEventListener("input",()=>{var t;const e=(((t=this.searchInputEl)==null?void 0:t.value)||"").trim().toLowerCase();e?this.filteredScenes=this.scenes.filter(n=>(n.name||"").toLowerCase().includes(e)||n.id.toLowerCase().includes(e)):this.filteredScenes=this.scenes,this.renderList(),this.updatePreview()})}renderList(){if(this.listEl){this.listEl.innerHTML="";for(const e of this.filteredScenes){const t=document.createElement("div");t.className="vr-guide-item",t.setAttribute("data-scene-id",e.id),e.id===this.currentSceneId&&t.classList.add("active");const n=document.createElement("img");n.className="vr-guide-thumb",n.loading="lazy",n.src=e.thumb||To,n.alt=e.name||e.id;const s=document.createElement("div");s.className="vr-guide-meta";const r=document.createElement("div");r.className="vr-guide-name",r.textContent=e.name||e.id;const a=document.createElement("div");a.className="vr-guide-id",a.textContent=e.id,s.appendChild(r),s.appendChild(a),t.appendChild(n),t.appendChild(s),t.addEventListener("mouseenter",()=>{this.hoveredSceneId=e.id,this.updatePreview()}),t.addEventListener("mouseleave",()=>{this.hoveredSceneId=null,this.updatePreview()}),t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),qt(this.museumId,e.id),this.close()}),this.listEl.appendChild(t)}}}updateActiveState(){this.listEl&&this.listEl.querySelectorAll(".vr-guide-item").forEach(e=>{const t=e.getAttribute("data-scene-id");e.classList.toggle("active",t===this.currentSceneId)})}updatePreview(){if(!this.previewImgEl||!this.previewTitleEl||!this.previewIdEl)return;const e=this.hoveredSceneId||this.currentSceneId,t=this.scenes.find(n=>n.id===e)||this.scenes[0];t&&(this.previewImgEl.src=t.thumb||To,this.previewImgEl.alt=t.name||t.id,this.previewTitleEl.textContent=t.name||t.id,this.previewIdEl.textContent=t.id)}}class Rg{constructor(e){E(this,"element");E(this,"scrollContainer");E(this,"museumId");E(this,"currentSceneId");E(this,"hotspots");E(this,"scenes");E(this,"onNavigateToScene");E(this,"sceneItems",new Map);E(this,"unsubscribeFocus");E(this,"unsubscribeInteracting");E(this,"unsubscribeIdle");E(this,"unsubscribeUIEngaged");E(this,"userScrolling",!1);E(this,"lastUserScrollTs",0);E(this,"userScrollCheckTimer",null);E(this,"scrollHandlers",[]);E(this,"itemsSignature","");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.hotspots=e.hotspots,this.scenes=e.scenes,this.onNavigateToScene=e.onNavigateToScene,this.element=document.createElement("div"),this.element.className="vr-scenestrip",this.scrollContainer=document.createElement("div"),this.scrollContainer.className="vr-scenestrip__scroll",this.element.appendChild(this.scrollContainer),this.renderItems(),this.setupFocusListener(),this.setupInteractionListeners(),this.setupUserScrollDetection()}getSceneHotspots(){return this.hotspots.filter(t=>{var n;return t.type==="scene"&&((n=t.target)==null?void 0:n.sceneId)}).map(t=>({...t,sceneId:t.target.sceneId})).sort((t,n)=>{const s=r=>{let a=r%360;return a<0&&(a+=360),a};return s(t.yaw)-s(n.yaw)})}getSceneInfo(e){const t=this.scenes.find(s=>s.id===e);if(t)return{name:t.name,thumb:t.thumb||null};const n=this.hotspots.find(s=>{var r;return((r=s.target)==null?void 0:r.sceneId)===e});return{name:(n==null?void 0:n.label)||e,thumb:null}}renderItems(){this.scrollContainer.innerHTML="",this.sceneItems.clear();const e=this.getSceneHotspots();this.itemsSignature=e.map(t=>t.sceneId).join("|"),e.forEach(t=>{const n=t.sceneId,s=this.getSceneInfo(n),r=n===this.currentSceneId,a=document.createElement("div");a.className="vr-scenestrip__item",a.setAttribute("data-scene-id",n),r&&a.classList.add("is-current");const o=document.createElement("div");if(o.className="vr-scenestrip__thumb",s.thumb){const c=yi(s.thumb,ai.THUMB);if(c){const d=document.createElement("img");d.src=c,d.alt=s.name,d.loading="lazy",o.appendChild(d)}else o.style.background="linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"}else o.style.background="linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)";const l=document.createElement("div");l.className="vr-scenestrip__name",l.textContent=s.name,a.appendChild(o),a.appendChild(l),a.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),We.emitUIEngaged(),Nt({type:"focus",museumId:this.museumId,sceneId:n,source:"dock",ts:Date.now()}),window.dispatchEvent(new CustomEvent("vr:close-panels")),this.onNavigateToScene(n)}),a.addEventListener("mouseenter",()=>{Nt({type:"hover",museumId:this.museumId,sceneId:n,source:"dock",ts:Date.now()})}),a.addEventListener("mouseleave",()=>{Nt({type:"hover",museumId:this.museumId,sceneId:null,source:"dock",ts:Date.now()})}),this.scrollContainer.appendChild(a),this.sceneItems.set(n,a)}),requestAnimationFrame(()=>{this.scrollToCurrent()})}scrollToItem(e,t="smooth",n=!1){const s=this.sceneItems.get(e);if(!s||!this.scrollContainer||this.userScrolling&&!n)return;const r=this.scrollContainer.getBoundingClientRect(),a=s.getBoundingClientRect(),o=r.left+r.width/2,c=a.left+a.width/2-o,d=this.scrollContainer.scrollLeft+c;this.scrollContainer.scrollTo({left:d,behavior:t})}scrollToCurrent(){this.scrollToItem(this.currentSceneId,"smooth",!1)}setupFocusListener(){this.unsubscribeFocus=wi(e=>{e.source!=="dock"&&this.sceneItems.forEach((t,n)=>{e.type==="hover"?e.sceneId===n?(t.classList.add("is-hover"),e.museumId===this.museumId&&this.scrollToItem(n,"smooth",!1)):t.classList.remove("is-hover"):e.type==="focus"&&(t.classList.remove("is-hover"),e.museumId===this.museumId&&e.sceneId===n&&(this.sceneItems.forEach((s,r)=>{r===n?s.classList.add("is-current"):s.classList.remove("is-current")}),this.currentSceneId=n,this.scrollToItem(n,"smooth",!0)))})})}setupInteractionListeners(){this.unsubscribeInteracting=We.on("user-interacting",()=>{this.element.classList.add("vr-ui-interacting")}),this.unsubscribeIdle=We.on("user-idle",()=>{this.element.classList.remove("vr-ui-interacting")}),this.unsubscribeUIEngaged=We.on("ui-engaged",()=>{this.element.classList.remove("vr-ui-interacting")}),this.scrollContainer.addEventListener("click",()=>{We.emitUIEngaged()},!0)}setupUserScrollDetection(){const e=()=>{performance.now()-this.lastUserScrollTs>=400?(this.userScrolling=!1,this.element.classList.remove("is-user-scrolling"),this.userScrollCheckTimer=null):this.userScrollCheckTimer=requestAnimationFrame(e)},t=()=>{this.userScrolling=!0,this.lastUserScrollTs=performance.now(),this.element.classList.add("is-user-scrolling"),this.userScrollCheckTimer!==null&&cancelAnimationFrame(this.userScrollCheckTimer),this.userScrollCheckTimer=requestAnimationFrame(e)},n=()=>{t()},s=()=>{t()},r=()=>{t()},a=()=>{t()};this.scrollContainer.addEventListener("scroll",n,{passive:!0}),this.scrollContainer.addEventListener("pointerdown",s,{passive:!0}),this.scrollContainer.addEventListener("touchstart",r,{passive:!0}),this.scrollContainer.addEventListener("wheel",a,{passive:!0}),this.scrollHandlers.push(()=>{this.scrollContainer.removeEventListener("scroll",n),this.scrollContainer.removeEventListener("pointerdown",s),this.scrollContainer.removeEventListener("touchstart",r),this.scrollContainer.removeEventListener("wheel",a)})}updateCurrentScene(e){if(this.currentSceneId===e)return;const t=this.sceneItems.get(this.currentSceneId);t&&t.classList.remove("is-current"),this.currentSceneId=e;const n=this.sceneItems.get(e);n&&(n.classList.add("is-current"),requestAnimationFrame(()=>{this.scrollToCurrent()}))}updateHotspots(e){this.hotspots=e,this.renderItems()}getElement(){return this.element}dispose(){this.userScrollCheckTimer!==null&&(cancelAnimationFrame(this.userScrollCheckTimer),this.userScrollCheckTimer=null),this.scrollHandlers.forEach(e=>e()),this.scrollHandlers=[],this.unsubscribeFocus&&(this.unsubscribeFocus(),this.unsubscribeFocus=void 0),this.unsubscribeInteracting&&(this.unsubscribeInteracting(),this.unsubscribeInteracting=void 0),this.unsubscribeIdle&&(this.unsubscribeIdle(),this.unsubscribeIdle=void 0),this.unsubscribeUIEngaged&&(this.unsubscribeUIEngaged(),this.unsubscribeUIEngaged=void 0),this.element.parentNode&&this.element.parentNode.removeChild(this.element)}}function Pg(i,e,t){const n=i.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=document.createElement("div");a.className="vr-pick-marker",a.style.position="absolute",a.style.left="0",a.style.top="0",a.style.transform=`translate3d(${s}px, ${r}px, 0)`,a.style.pointerEvents="none",a.style.zIndex="1000",i.style.position="relative",i.appendChild(a),window.requestAnimationFrame(()=>{a.classList.add("show")}),window.setTimeout(()=>{a.classList.remove("show"),window.setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},200)},1500)}Rl();class Ng{constructor(){E(this,"appElement");E(this,"config",null);E(this,"panoViewer",null);E(this,"titleBar",null);E(this,"topBar",null);E(this,"brandMark",null);E(this,"bottomDock",null);E(this,"sceneGuideDrawer",null);E(this,"sceneStrip",null);E(this,"museumList",null);E(this,"sceneList",null);E(this,"mapOverlay",null);E(this,"hotspots",null);E(this,"videoPlayer",null);E(this,"controlBar",null);E(this,"loading");E(this,"debugPanel",null);E(this,"configStudio",null);E(this,"qualityIndicator",null);E(this,"currentMuseum",null);E(this,"currentScene",null);E(this,"hasBoundFullscreenEvents",!1);const e=document.getElementById("app");if(!e)throw new Error("找不到 #app 元素");this.appElement=e,Fm(),this.loading=new Wm,this.appElement.appendChild(this.loading.getElement()),this.bindFullscreenEventsOnce(),this.init()}bindFullscreenEventsOnce(){if(this.hasBoundFullscreenEvents)return;this.hasBoundFullscreenEvents=!0;const e=()=>{var t;(t=this.topBar)==null||t.syncFullscreenState(),Ir()||ig()};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}async init(){try{if(this.loading.show(),Dl()){await this.initEditorMode(),this.loading.hide();return}this.config=await Br(),this.titleBar&&this.titleBar.setTitle(this.config.appName),window.addEventListener("popstate",()=>this.handleRoute()),await this.handleRoute(),this.loading.hide()}catch(e){console.error("初始化失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await Br(),this.appElement.innerHTML="",this.configStudio=new Zm(this.config,e=>{this.config=e,Hr()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}showConfigErrorPanel(e){this.appElement.innerHTML="";const t=new Xm(e,()=>{Hr(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(t.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
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
      `)}async handleRoute(){if(!this.config)return;const e=zr();if(this.clearView(),!e.museumId){const t=this.config.museums.find(n=>n.id==="wangding")||this.config.museums[0];if(t){if(t.scenes&&t.scenes.length>0){qt(t.id,t.scenes[0].id);return}Js(t.id);return}}if(!e.museumId)this.showMuseumList();else if(e.sceneId){const t=Zs(e.museumId),n=Il(e.museumId,e.sceneId);t&&n?await this.showScene(t,n):(this.showError("未找到指定的场景"),t?Js(t.id):Wr())}else{const t=Zs(e.museumId);t?this.showSceneList(t):(this.showError("未找到指定的展馆"),Wr())}}showMuseumList(){this.config&&(this.titleBar=new _o(this.config.appName),this.appElement.appendChild(this.titleBar.getElement()),this.museumList=new ym(this.config.museums),this.appElement.appendChild(this.museumList.getElement()))}showSceneList(e){this.titleBar=new _o(e.name),this.appElement.appendChild(this.titleBar.getElement());const t=document.createElement("div");t.className="scene-list-page",t.innerHTML=`
      <div class="scene-list-container">
        <h1 class="scene-list-title">${e.name} - 场景列表</h1>
        ${e.description?`<p class="scene-list-desc">${e.description}</p>`:""}
        <div class="scene-grid">
          ${e.scenes.map(s=>`
            <div class="scene-card" data-scene-id="${s.id}">
              <div class="scene-cover">
                <img src="${s.thumb}" alt="${s.name}" loading="lazy">
                <div class="scene-overlay">
                  <h2 class="scene-name">${s.name}</h2>
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
    `,document.head.appendChild(n),t.querySelectorAll(".scene-card").forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-scene-id");r&&qt(e.id,r)})}),this.appElement.appendChild(t)}async showScene(e,t){var p,v;this.currentMuseum=e,this.currentScene=t,this.loading.show();const n=document.createElement("div");n.className="viewer-container",n.style.cssText=`
      position: fixed;
      top: calc(44px + env(safe-area-inset-top, 0px));
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `,this.appElement.appendChild(n);const s=Nl();this.panoViewer=new bm(n,s),this.topBar=new og({title:t.name||((p=this.config)==null?void 0:p.appName)||"VR Player",viewerRootEl:n,onTogglePickMode:()=>{if(!this.panoViewer)return!1;const g=this.panoViewer.togglePickMode();return nt(g?"拾取已开启：点一下画面获取 yaw/pitch":"拾取已关闭"),g}}),this.appElement.appendChild(this.topBar.getElement());const r=g=>{const m=g,{x:u,y,yaw:x,pitch:w}=m.detail;if(Km({yaw:x,pitch:w,ts:Date.now()}),nt(`已复制 yaw: ${x.toFixed(2)}, pitch: ${w.toFixed(2)}`),this.panoViewer){const R=this.panoViewer.getDomElement();Pg(R,u,y)}};window.addEventListener("vr:pick",r);const a=g=>{const m=g;this.panoViewer&&!m.detail.enabled&&this.panoViewer.isPickModeEnabled()&&(this.panoViewer.disablePickMode(),this.topBar)};if(window.addEventListener("vr:pickmode",a),this.brandMark=new cg({appName:(v=this.config)==null?void 0:v.appName,brandText:"鼎虎清源"}),this.appElement.appendChild(this.brandMark.getElement()),this.appElement.appendChild(this.brandMark.getAboutModal().getElement()),s){this.debugPanel=new Ym,this.appElement.appendChild(this.debugPanel.getElement()),this.panoViewer.setOnDebugClick((m,u,y,x,w)=>{this.debugPanel&&this.debugPanel.show(m,u,y,x,w)});const g=()=>{if(this.debugPanel&&this.panoViewer){const m=this.panoViewer.getCurrentView();this.debugPanel.updateView(m.yaw,m.pitch,m.fov)}requestAnimationFrame(g)};g()}this.videoPlayer=new zm,this.appElement.appendChild(this.videoPlayer.getElement()),this.sceneGuideDrawer=new Lg({scenes:e.scenes}),this.appElement.appendChild(this.sceneGuideDrawer.getElement());const o=e.scenes.flatMap(g=>g.hotspots);this.sceneStrip=new Rg({museumId:e.id,currentSceneId:t.id,hotspots:o,scenes:e.scenes,onNavigateToScene:g=>{qt(e.id,g)}}),n.appendChild(this.sceneStrip.getElement()),this.bottomDock=new Ig({initialTab:"guide",onGuideClick:()=>{var g;return(g=this.sceneGuideDrawer)==null?void 0:g.toggle()},sceneId:t.id,sceneName:t.name,museum:e,scenes:e.scenes,currentSceneId:t.id}),this.appElement.appendChild(this.bottomDock.getElement());const l=new Map(e.scenes.map(g=>[g.id,g.name]));this.hotspots=new Vm(this.panoViewer,t.hotspots,{resolveSceneName:g=>l.get(g),onEnterScene:g=>{qt(e.id,g)},museumId:e.id}),n.appendChild(this.hotspots.getElement()),this.qualityIndicator=new dm,this.appElement.appendChild(this.qualityIndicator.getElement()),this.panoViewer.setOnStatusChange(g=>{this.qualityIndicator&&this.qualityIndicator.updateStatus(g)}),this.panoViewer.setOnLoad(()=>{this.loading.hide(),this.preloadNextScene(e,t)}),this.panoViewer.setOnError(g=>{console.error("加载场景失败:",g),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),this.qualityIndicator&&this.qualityIndicator.updateStatus(bt.ERROR)});const c=zr(),d=c.yaw!==void 0?c.yaw:t.initialView.yaw||0,h=c.pitch!==void 0?c.pitch:t.initialView.pitch||0,f=c.fov!==void 0?c.fov:t.initialView.fov||75;this.panoViewer.setView(d,h,f),this.panoViewer.loadScene(t),this.panoViewer.setSceneData(e.id,t.id,t.hotspots)}preloadNextScene(e,t){const s=(e.scenes.findIndex(a=>a.id===t.id)+1)%e.scenes.length,r=e.scenes[s];r&&r.thumb&&hr(async()=>{const{resolveAssetUrl:a,AssetType:o}=await Promise.resolve().then(()=>cm);return{resolveAssetUrl:a,AssetType:o}},void 0,import.meta.url).then(({resolveAssetUrl:a,AssetType:o})=>{const l=a(r.thumb,o.THUMB);if(l){const c=new Image;c.src=l}})}clearView(){this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.topBar&&(this.topBar.remove(),this.topBar=null),this.brandMark&&(this.brandMark.remove(),this.brandMark=null),this.bottomDock&&(this.bottomDock.remove(),this.bottomDock=null),this.sceneGuideDrawer&&(this.sceneGuideDrawer.remove(),this.sceneGuideDrawer=null),this.sceneStrip&&(this.sceneStrip.dispose(),this.sceneStrip=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneList&&(this.sceneList.remove(),this.sceneList=null),this.mapOverlay&&(this.mapOverlay.remove(),this.mapOverlay=null),this.hotspots&&(this.hotspots.remove(),this.hotspots=null),this.videoPlayer&&(this.videoPlayer.remove(),this.videoPlayer=null),this.controlBar&&(this.controlBar.remove(),this.controlBar=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),this.qualityIndicator&&(this.qualityIndicator.remove(),this.qualityIndicator=null),this.appElement.innerHTML="",this.appElement.appendChild(this.loading.getElement())}showError(e){const t=document.createElement("div");t.className="error-message",t.textContent=e,t.style.cssText=`
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
    `,this.appElement.appendChild(t),setTimeout(()=>{t.remove()},3e3)}}new Ng;export{oi as E,Ug as M,yn as P,Ai as Q,Yo as R,Fg as S,Og as T,N as V,Ge as a,Pn as b};
