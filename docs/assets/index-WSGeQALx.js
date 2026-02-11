const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./PanoViewer-BIpMsy5Y.js","./three-core-0fX1SOzE.js","./qualityPreference-BRkZdVpy.js","./externalImage-Cn8sVw7v.js","./BrandMark-BEHHO9Nu.js","./copyText-CwU0x1sN.js","./StructureView2D-YNggYitX.js","./autoLayout-ZgSeGcPI.js","./vrMode-DyIJynW0.js","./appModals-C7Mh3qzo.js","./Modal-Cmv3TBkb.js","./editor-debug-5l2Y-X-O.js","./draftStorage-Be1LM_rK.js","./GuideTray-DOOT9VrQ.js","./SceneGuideDrawer-Y6PNcZSx.js","./index-DnDnySW2.js","./BottomDock-l2TZYbO6.js","./Hotspots-bVfrAHPp.js","./chat-community-Br_nepnd.js","./store-B83L8bDT.js","./dock-panels-Cs9Sxynv.js","./sceneGraph-CaQzl5R8.js"])))=>i.map(i=>d[i]);
var ve=Object.defineProperty;var Se=(t,e,i)=>e in t?ve(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var l=(t,e,i)=>Se(t,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const Me="modulepreload",Te=function(t,e){return new URL(t,e).href},j={},f=function(e,i,n){let o=Promise.resolve();if(i&&i.length>0){const s=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),c=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));o=Promise.allSettled(i.map(h=>{if(h=Te(h,n),h in j)return;j[h]=!0;const m=h.endsWith(".css"),p=m?'[rel="stylesheet"]':"";if(!!n)for(let T=s.length-1;T>=0;T--){const M=s[T];if(M.href===h&&(!m||M.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${p}`))return;const v=document.createElement("link");if(v.rel=m?"stylesheet":Me,m||(v.as="script"),v.crossOrigin="",v.href=h,c&&v.setAttribute("nonce",c),document.head.appendChild(v),m)return new Promise((T,M)=>{v.addEventListener("load",T),v.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(s){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=s,window.dispatchEvent(d),!d.defaultPrevented)throw s}return o.then(s=>{for(const d of s||[])d.status==="rejected"&&r(d.reason);return e().catch(r)})};var a=(t=>(t.INVALID_ROOT="INVALID_ROOT",t.MISSING_APP_NAME="MISSING_APP_NAME",t.MUSEUMS_NOT_ARRAY="MUSEUMS_NOT_ARRAY",t.MUSEUMS_EMPTY="MUSEUMS_EMPTY",t.MISSING_MUSEUM_ID="MISSING_MUSEUM_ID",t.DUPLICATE_MUSEUM_ID="DUPLICATE_MUSEUM_ID",t.MISSING_MUSEUM_NAME="MISSING_MUSEUM_NAME",t.MISSING_MUSEUM_COVER="MISSING_MUSEUM_COVER",t.MISSING_MUSEUM_MAP="MISSING_MUSEUM_MAP",t.MISSING_MAP_IMAGE="MISSING_MAP_IMAGE",t.INVALID_MAP_WIDTH="INVALID_MAP_WIDTH",t.INVALID_MAP_HEIGHT="INVALID_MAP_HEIGHT",t.SCENES_NOT_ARRAY="SCENES_NOT_ARRAY",t.SCENES_EMPTY="SCENES_EMPTY",t.MISSING_SCENE_ID="MISSING_SCENE_ID",t.DUPLICATE_SCENE_ID="DUPLICATE_SCENE_ID",t.MISSING_SCENE_NAME="MISSING_SCENE_NAME",t.MISSING_PANO="MISSING_PANO",t.INVALID_PANO_URL="INVALID_PANO_URL",t.INVALID_PANOLOW_URL="INVALID_PANOLOW_URL",t.MISSING_THUMB="MISSING_THUMB",t.MISSING_INITIAL_VIEW="MISSING_INITIAL_VIEW",t.INVALID_YAW="INVALID_YAW",t.INVALID_PITCH="INVALID_PITCH",t.INVALID_FOV="INVALID_FOV",t.MISSING_MAP_POINT="MISSING_MAP_POINT",t.INVALID_MAP_POINT_X="INVALID_MAP_POINT_X",t.INVALID_MAP_POINT_Y="INVALID_MAP_POINT_Y",t.HOTSPOTS_NOT_ARRAY="HOTSPOTS_NOT_ARRAY",t.MISSING_HOTSPOT_ID="MISSING_HOTSPOT_ID",t.DUPLICATE_HOTSPOT_ID="DUPLICATE_HOTSPOT_ID",t.INVALID_HOTSPOT_TYPE="INVALID_HOTSPOT_TYPE",t.MISSING_HOTSPOT_LABEL="MISSING_HOTSPOT_LABEL",t.INVALID_HOTSPOT_YAW="INVALID_HOTSPOT_YAW",t.INVALID_HOTSPOT_PITCH="INVALID_HOTSPOT_PITCH",t.MISSING_HOTSPOT_TARGET="MISSING_HOTSPOT_TARGET",t.MISSING_TARGET_MUSEUM_ID="MISSING_TARGET_MUSEUM_ID",t.MISSING_TARGET_SCENE_ID="MISSING_TARGET_SCENE_ID",t.INVALID_TARGET_YAW="INVALID_TARGET_YAW",t.INVALID_TARGET_PITCH="INVALID_TARGET_PITCH",t.INVALID_TARGET_FOV="INVALID_TARGET_FOV",t.MISSING_TARGET_URL="MISSING_TARGET_URL",t))(a||{});function Pe(t){const e=[];if(!t||typeof t!="object")return e.push({code:"INVALID_ROOT",path:"root",message:"配置必须是对象",fieldName:"配置根对象"}),e;if((!t.appName||typeof t.appName!="string"||t.appName.trim()==="")&&e.push({code:"MISSING_APP_NAME",path:"appName",message:"appName 必须是非空字符串",fieldName:"应用名称"}),!Array.isArray(t.museums))return e.push({code:"MUSEUMS_NOT_ARRAY",path:"museums",message:"museums 必须是数组",fieldName:"博物馆列表"}),e;t.museums.length===0&&e.push({code:"MUSEUMS_EMPTY",path:"museums",message:"museums 数组不能为空",fieldName:"博物馆列表"});const i=new Set;return t.museums.forEach((n,o)=>{const r=`museums[${o}]`,s=n.name&&typeof n.name=="string"?n.name:void 0;if(!n.id||typeof n.id!="string"||n.id.trim()===""?e.push({code:"MISSING_MUSEUM_ID",path:`${r}.id`,message:"id 必须是非空字符串",museumName:s,fieldName:"博物馆 ID"}):(i.has(n.id)&&e.push({code:"DUPLICATE_MUSEUM_ID",path:`${r}.id`,message:`博物馆 ID "${n.id}" 重复`,museumName:s,fieldName:"博物馆 ID"}),i.add(n.id)),(!n.name||typeof n.name!="string"||n.name.trim()==="")&&e.push({code:"MISSING_MUSEUM_NAME",path:`${r}.name`,message:"name 必须是非空字符串",museumName:void 0,fieldName:"博物馆名称"}),(!n.cover||typeof n.cover!="string"||n.cover.trim()==="")&&e.push({code:"MISSING_MUSEUM_COVER",path:`${r}.cover`,message:"cover 必须是有效的 URL 字符串",museumName:s,fieldName:"封面图"}),!n.map||typeof n.map!="object"?e.push({code:"MISSING_MUSEUM_MAP",path:`${r}.map`,message:"map 必须是对象",museumName:s,fieldName:"地图配置"}):((!n.map.image||typeof n.map.image!="string"||n.map.image.trim()==="")&&e.push({code:"MISSING_MAP_IMAGE",path:`${r}.map.image`,message:"map.image 必须是有效的 URL 字符串",museumName:s,fieldName:"地图图片"}),(typeof n.map.width!="number"||n.map.width<=0)&&e.push({code:"INVALID_MAP_WIDTH",path:`${r}.map.width`,message:"map.width 必须是大于 0 的数字",museumName:s,fieldName:"地图宽度"}),(typeof n.map.height!="number"||n.map.height<=0)&&e.push({code:"INVALID_MAP_HEIGHT",path:`${r}.map.height`,message:"map.height 必须是大于 0 的数字",museumName:s,fieldName:"地图高度"})),!Array.isArray(n.scenes))e.push({code:"SCENES_NOT_ARRAY",path:`${r}.scenes`,message:"scenes 必须是数组",museumName:s,fieldName:"场景列表"});else{n.scenes.length===0&&e.push({code:"SCENES_EMPTY",path:`${r}.scenes`,message:"scenes 数组不能为空",museumName:s,fieldName:"场景列表"});const d=new Set;n.scenes.forEach((c,h)=>{var M;const m=`${r}.scenes[${h}]`,p=c.name&&typeof c.name=="string"?c.name:void 0;!c.id||typeof c.id!="string"||c.id.trim()===""?e.push({code:"MISSING_SCENE_ID",path:`${m}.id`,message:"id 必须是非空字符串",museumName:s,sceneName:p,fieldName:"场景 ID"}):(d.has(c.id)&&e.push({code:"DUPLICATE_SCENE_ID",path:`${m}.id`,message:`场景 ID "${c.id}" 在博物馆内重复`,museumName:s,sceneName:p,fieldName:"场景 ID"}),d.add(c.id)),(!c.name||typeof c.name!="string"||c.name.trim()==="")&&e.push({code:"MISSING_SCENE_NAME",path:`${m}.name`,message:"name 必须是非空字符串",museumName:s,sceneName:void 0,fieldName:"场景名称"});const H=!!c.pano,v=!!c.panoLow,T=!!((M=c.panoTiles)!=null&&M.manifest);if(!H&&!v&&!T?e.push({code:"MISSING_PANO",path:`${m}.pano`,message:"pano / panoLow / panoTiles 至少需要提供一个",museumName:s,sceneName:p,fieldName:"全景图"}):(c.pano&&(typeof c.pano!="string"||c.pano.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${m}.pano`,message:"pano 必须是有效的 URL 字符串",museumName:s,sceneName:p,fieldName:"高清全景图"}),c.panoLow&&(typeof c.panoLow!="string"||c.panoLow.trim()==="")&&e.push({code:"INVALID_PANOLOW_URL",path:`${m}.panoLow`,message:"panoLow 必须是有效的 URL 字符串",museumName:s,sceneName:p,fieldName:"低清全景图"}),c.panoTiles&&(typeof c.panoTiles!="object"?e.push({code:"INVALID_PANO_URL",path:`${m}.panoTiles`,message:"panoTiles 必须是对象，包含 manifest",museumName:s,sceneName:p,fieldName:"瓦片元数据"}):(!c.panoTiles.manifest||typeof c.panoTiles.manifest!="string"||c.panoTiles.manifest.trim()==="")&&e.push({code:"INVALID_PANO_URL",path:`${m}.panoTiles.manifest`,message:"panoTiles.manifest 必须是有效的字符串",museumName:s,sceneName:p,fieldName:"瓦片 manifest"}))),(!c.thumb||typeof c.thumb!="string"||c.thumb.trim()==="")&&e.push({code:"MISSING_THUMB",path:`${m}.thumb`,message:"thumb 必须是有效的 URL 字符串",museumName:s,sceneName:p,fieldName:"缩略图"}),!c.initialView||typeof c.initialView!="object"?e.push({code:"MISSING_INITIAL_VIEW",path:`${m}.initialView`,message:"initialView 必须是对象",museumName:s,sceneName:p,fieldName:"初始视角"}):(typeof c.initialView.yaw!="number"&&e.push({code:"INVALID_YAW",path:`${m}.initialView.yaw`,message:"initialView.yaw 必须是数字",museumName:s,sceneName:p,fieldName:"水平角度"}),typeof c.initialView.pitch!="number"&&e.push({code:"INVALID_PITCH",path:`${m}.initialView.pitch`,message:"initialView.pitch 必须是数字",museumName:s,sceneName:p,fieldName:"垂直角度"}),c.initialView.fov!==void 0&&typeof c.initialView.fov!="number"&&e.push({code:"INVALID_FOV",path:`${m}.initialView.fov`,message:"initialView.fov 必须是数字",museumName:s,sceneName:p,fieldName:"视野角度"})),!c.mapPoint||typeof c.mapPoint!="object"?e.push({code:"MISSING_MAP_POINT",path:`${m}.mapPoint`,message:"mapPoint 必须是对象",museumName:s,sceneName:p,fieldName:"地图点位"}):(typeof c.mapPoint.x!="number"&&e.push({code:"INVALID_MAP_POINT_X",path:`${m}.mapPoint.x`,message:"mapPoint.x 必须是数字",museumName:s,sceneName:p,fieldName:"地图点位 X 坐标"}),typeof c.mapPoint.y!="number"&&e.push({code:"INVALID_MAP_POINT_Y",path:`${m}.mapPoint.y`,message:"mapPoint.y 必须是数字",museumName:s,sceneName:p,fieldName:"地图点位 Y 坐标"})),!Array.isArray(c.hotspots))e.push({code:"HOTSPOTS_NOT_ARRAY",path:`${m}.hotspots`,message:"hotspots 必须是数组",museumName:s,sceneName:p,fieldName:"热点列表"});else{const E=new Set;c.hotspots.forEach((u,w)=>{const I=`${m}.hotspots[${w}]`;!u.id||typeof u.id!="string"||u.id.trim()===""?e.push({code:"MISSING_HOTSPOT_ID",path:`${I}.id`,message:"id 必须是非空字符串",museumName:s,sceneName:p,fieldName:"热点 ID"}):(E.has(u.id)&&e.push({code:"DUPLICATE_HOTSPOT_ID",path:`${I}.id`,message:`热点 ID "${u.id}" 在场景内重复`,museumName:s,sceneName:p,fieldName:"热点 ID"}),E.add(u.id)),u.type!=="scene"&&u.type!=="video"&&u.type!=="image"&&u.type!=="info"&&e.push({code:"INVALID_HOTSPOT_TYPE",path:`${I}.type`,message:'type 必须是 "scene"、"video"、"image" 或 "info"',museumName:s,sceneName:p,fieldName:"热点类型"}),(!u.label||typeof u.label!="string"||u.label.trim()==="")&&e.push({code:"MISSING_HOTSPOT_LABEL",path:`${I}.label`,message:"label 必须是非空字符串",museumName:s,sceneName:p,fieldName:"热点标签"}),typeof u.yaw!="number"&&e.push({code:"INVALID_HOTSPOT_YAW",path:`${I}.yaw`,message:"yaw 必须是数字",museumName:s,sceneName:p,fieldName:"热点水平角度"}),typeof u.pitch!="number"&&e.push({code:"INVALID_HOTSPOT_PITCH",path:`${I}.pitch`,message:"pitch 必须是数字",museumName:s,sceneName:p,fieldName:"热点垂直角度"}),u.type==="scene"?!u.target||typeof u.target!="object"?e.push({code:"MISSING_HOTSPOT_TARGET",path:`${I}.target`,message:"scene 类型热点必须提供 target 对象",museumName:s,sceneName:p,fieldName:"热点目标配置"}):((!u.target.museumId||typeof u.target.museumId!="string")&&e.push({code:"MISSING_TARGET_MUSEUM_ID",path:`${I}.target.museumId`,message:"scene 类型热点的 target.museumId 必须是非空字符串",museumName:s,sceneName:p,fieldName:"目标博物馆 ID"}),typeof u.target.sceneId!="string"&&e.push({code:"MISSING_TARGET_SCENE_ID",path:`${I}.target.sceneId`,message:"scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）",museumName:s,sceneName:p,fieldName:"目标场景 ID"}),u.target.yaw!==void 0&&typeof u.target.yaw!="number"&&e.push({code:"INVALID_TARGET_YAW",path:`${I}.target.yaw`,message:"target.yaw 必须是数字",museumName:s,sceneName:p,fieldName:"目标水平角度"}),u.target.pitch!==void 0&&typeof u.target.pitch!="number"&&e.push({code:"INVALID_TARGET_PITCH",path:`${I}.target.pitch`,message:"target.pitch 必须是数字",museumName:s,sceneName:p,fieldName:"目标垂直角度"}),u.target.fov!==void 0&&typeof u.target.fov!="number"&&e.push({code:"INVALID_TARGET_FOV",path:`${I}.target.fov`,message:"target.fov 必须是数字",museumName:s,sceneName:p,fieldName:"目标视野角度"})):u.type==="video"&&u.target&&typeof u.target!="object"&&e.push({code:"MISSING_HOTSPOT_TARGET",path:`${I}.target`,message:"video 类型热点的 target 必须是对象（如果提供）",museumName:s,sceneName:p,fieldName:"热点目标配置"})})}})}}),e}let L=null;async function X(){if(L)return L;try{const t=await fetch("./config.json",{cache:"no-store"});if(!t.ok)throw new Error(`加载配置失败: ${t.status}`);const e=await t.json(),i=Pe(e);if(i.length>0){const n=new Error("配置校验失败");throw n.validationErrors=i,n}return L=e,L}catch(t){throw console.error("加载配置失败:",t),t}}function K(){L=null}function B(t){if(L)return L.museums.find(e=>e.id===t)}function Ne(t,e){const i=B(t);if(i)return i.scenes.find(n=>n.id===e)}function ae(t){const e=new URL(window.location.href);return e.search="",Object.entries(t).forEach(([i,n])=>{n!=null&&n!==""&&e.searchParams.set(i,String(n))}),e.pathname+e.search+e.hash}function ye(){return window.location.pathname}function be(){if(window.location.pathname.includes("//")){const t=window.location.pathname.replace(/\/{2,}/g,"/");history.replaceState({},"",t+window.location.search+window.location.hash)}}let Q=null,J=0;const Ae=200;function Le(t){if(t.type==="focus"){const e=`${t.museumId}:${t.sceneId}`,i=Date.now();if(e===Q&&i-J<Ae)return;Q=e,J=i}window.dispatchEvent(new CustomEvent("vr:scene-focus",{detail:t}))}function Nt(t){const e=i=>{t(i.detail)};return window.addEventListener("vr:scene-focus",e),()=>{window.removeEventListener("vr:scene-focus",e)}}function Z(){const t=new URLSearchParams(window.location.search),e=t.get("yaw"),i=t.get("pitch"),n=t.get("fov");return{museumId:t.get("museum")||void 0,sceneId:t.get("scene")||void 0,yaw:e?parseFloat(e):void 0,pitch:i?parseFloat(i):void 0,fov:n?parseFloat(n):void 0}}function De(){return new URLSearchParams(window.location.search).get("debug")==="1"}function Ve(){const t=new URLSearchParams(window.location.search);return t.get("editor")==="1"||t.get("debug")==="1"}function ee(){const t=ye();window.history.pushState({},"",t),window.dispatchEvent(new Event("popstate"))}function te(t){const e=ae({museum:t});window.history.pushState({},"",e),window.dispatchEvent(new Event("popstate"))}function k(t,e,i){const n=ae({museum:t,scene:e,yaw:i==null?void 0:i.yaw,pitch:i==null?void 0:i.pitch,fov:i==null?void 0:i.fov});window.history.pushState({},"",n),Le({type:"focus",museumId:t,sceneId:e,source:"dock",ts:Date.now()}),window.dispatchEvent(new Event("popstate"))}function Y(){const t=document;return!!(document.fullscreenElement||t.webkitFullscreenElement)}function Oe(){const t=()=>{};document.addEventListener("fullscreenchange",t),document.addEventListener("webkitfullscreenchange",t)}class Ce{constructor(){l(this,"element");this.element=document.createElement("div"),this.element.className="loading-overlay",this.render(),this.applyStyles();const e=()=>{Y()&&this.hide()};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}render(){this.element.innerHTML=`
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
    `,document.head.appendChild(e)}show(){Y()||this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.element.remove()}}const Re={[a.INVALID_ROOT]:"配置格式错误",[a.MISSING_APP_NAME]:"缺少应用名称",[a.MUSEUMS_NOT_ARRAY]:"博物馆列表格式错误",[a.MUSEUMS_EMPTY]:"博物馆列表为空",[a.MISSING_MUSEUM_ID]:"缺少博物馆 ID",[a.DUPLICATE_MUSEUM_ID]:"博物馆 ID 重复",[a.MISSING_MUSEUM_NAME]:"缺少博物馆名称",[a.MISSING_MUSEUM_COVER]:"缺少封面图",[a.MISSING_MUSEUM_MAP]:"缺少地图配置",[a.MISSING_MAP_IMAGE]:"缺少地图图片",[a.INVALID_MAP_WIDTH]:"地图宽度无效",[a.INVALID_MAP_HEIGHT]:"地图高度无效",[a.SCENES_NOT_ARRAY]:"场景列表格式错误",[a.SCENES_EMPTY]:"场景列表为空",[a.MISSING_SCENE_ID]:"缺少场景 ID",[a.DUPLICATE_SCENE_ID]:"场景 ID 重复",[a.MISSING_SCENE_NAME]:"缺少场景名称",[a.MISSING_PANO]:"缺少全景图",[a.INVALID_PANO_URL]:"高清全景图 URL 无效",[a.INVALID_PANOLOW_URL]:"低清全景图 URL 无效",[a.MISSING_THUMB]:"缺少缩略图",[a.MISSING_INITIAL_VIEW]:"缺少初始视角配置",[a.INVALID_YAW]:"水平角度无效",[a.INVALID_PITCH]:"垂直角度无效",[a.INVALID_FOV]:"视野角度无效",[a.MISSING_MAP_POINT]:"缺少地图点位",[a.INVALID_MAP_POINT_X]:"地图点位 X 坐标无效",[a.INVALID_MAP_POINT_Y]:"地图点位 Y 坐标无效",[a.HOTSPOTS_NOT_ARRAY]:"热点列表格式错误",[a.MISSING_HOTSPOT_ID]:"缺少热点 ID",[a.DUPLICATE_HOTSPOT_ID]:"热点 ID 重复",[a.INVALID_HOTSPOT_TYPE]:"热点类型无效",[a.MISSING_HOTSPOT_LABEL]:"缺少热点标签",[a.INVALID_HOTSPOT_YAW]:"热点水平角度无效",[a.INVALID_HOTSPOT_PITCH]:"热点垂直角度无效",[a.MISSING_HOTSPOT_TARGET]:"缺少热点目标配置",[a.MISSING_TARGET_MUSEUM_ID]:"缺少目标博物馆 ID",[a.MISSING_TARGET_SCENE_ID]:"缺少目标场景 ID",[a.INVALID_TARGET_YAW]:"目标水平角度无效",[a.INVALID_TARGET_PITCH]:"目标垂直角度无效",[a.INVALID_TARGET_FOV]:"目标视野角度无效",[a.MISSING_TARGET_URL]:"缺少视频链接"},Ue={[a.INVALID_ROOT]:"请确保 config.json 是一个有效的 JSON 对象",[a.MISSING_APP_NAME]:'请在配置中添加 "appName" 字段，例如："appName": "我的 VR 展馆"',[a.MUSEUMS_NOT_ARRAY]:'请确保 "museums" 是一个数组，例如："museums": []',[a.MUSEUMS_EMPTY]:'请至少添加一个博物馆到 "museums" 数组中',[a.MISSING_MUSEUM_ID]:'请为该博物馆添加 "id" 字段，例如："id": "museum1"',[a.DUPLICATE_MUSEUM_ID]:'请确保每个博物馆的 "id" 都是唯一的，不能重复',[a.MISSING_MUSEUM_NAME]:'请为该博物馆添加 "name" 字段，例如："name": "第一展馆"',[a.MISSING_MUSEUM_COVER]:'请为该博物馆添加 "cover" 字段，填入封面图的 URL',[a.MISSING_MUSEUM_MAP]:'请为该博物馆添加 "map" 对象配置',[a.MISSING_MAP_IMAGE]:'请在地图配置中添加 "image" 字段，填入地图图片的 URL',[a.INVALID_MAP_WIDTH]:'请确保 "map.width" 是一个大于 0 的数字',[a.INVALID_MAP_HEIGHT]:'请确保 "map.height" 是一个大于 0 的数字',[a.SCENES_NOT_ARRAY]:'请确保 "scenes" 是一个数组，例如："scenes": []',[a.SCENES_EMPTY]:"请至少为该博物馆添加一个场景",[a.MISSING_SCENE_ID]:'请为该场景添加 "id" 字段，例如："id": "scene1"',[a.DUPLICATE_SCENE_ID]:'请确保同一博物馆内每个场景的 "id" 都是唯一的',[a.MISSING_SCENE_NAME]:'请为该场景添加 "name" 字段，例如："name": "正门"',[a.MISSING_PANO]:'请为该场景添加 "pano"、"panoLow" 或 "panoTiles" 字段，至少提供一种全景来源',[a.INVALID_PANO_URL]:'请确保 "pano" 字段是一个有效的图片 URL 字符串',[a.INVALID_PANOLOW_URL]:'请确保 "panoLow" 字段是一个有效的图片 URL 字符串',[a.MISSING_THUMB]:'请为该场景添加 "thumb" 字段，填入缩略图的 URL',[a.MISSING_INITIAL_VIEW]:'请为该场景添加 "initialView" 对象配置',[a.INVALID_YAW]:'请确保 "initialView.yaw" 是一个数字（水平角度，范围 -180 到 180）',[a.INVALID_PITCH]:'请确保 "initialView.pitch" 是一个数字（垂直角度，范围 -90 到 90）',[a.INVALID_FOV]:'请确保 "initialView.fov" 是一个数字（视野角度，范围 30 到 120）',[a.MISSING_MAP_POINT]:'请为该场景添加 "mapPoint" 对象配置',[a.INVALID_MAP_POINT_X]:'请确保 "mapPoint.x" 是一个数字（地图上的 X 坐标）',[a.INVALID_MAP_POINT_Y]:'请确保 "mapPoint.y" 是一个数字（地图上的 Y 坐标）',[a.HOTSPOTS_NOT_ARRAY]:'请确保 "hotspots" 是一个数组，例如："hotspots": []',[a.MISSING_HOTSPOT_ID]:'请为该热点添加 "id" 字段，例如："id": "hotspot1"',[a.DUPLICATE_HOTSPOT_ID]:'请确保同一场景内每个热点的 "id" 都是唯一的',[a.INVALID_HOTSPOT_TYPE]:'请确保 "type" 字段是 "scene" 或 "video" 之一',[a.MISSING_HOTSPOT_LABEL]:'请为该热点添加 "label" 字段，例如："label": "进入展厅"',[a.INVALID_HOTSPOT_YAW]:'请确保 "yaw" 是一个数字（热点在全景图中的水平位置）',[a.INVALID_HOTSPOT_PITCH]:'请确保 "pitch" 是一个数字（热点在全景图中的垂直位置）',[a.MISSING_HOTSPOT_TARGET]:'请为该热点添加 "target" 对象配置',[a.MISSING_TARGET_MUSEUM_ID]:'场景跳转类型的热点必须包含 "target.museumId" 字段',[a.MISSING_TARGET_SCENE_ID]:'场景跳转类型的热点必须包含 "target.sceneId" 字段',[a.INVALID_TARGET_YAW]:'请确保 "target.yaw" 是一个数字（跳转后的水平角度）',[a.INVALID_TARGET_PITCH]:'请确保 "target.pitch" 是一个数字（跳转后的垂直角度）',[a.INVALID_TARGET_FOV]:'请确保 "target.fov" 是一个数字（跳转后的视野角度）',[a.MISSING_TARGET_URL]:'视频类型的热点必须包含 "target.url" 字段，填入视频的 URL'};class xe{constructor(e,i,n){l(this,"element");this.element=document.createElement("div"),this.element.className="config-error-panel",this.render(e,i,n),this.applyStyles()}render(e,i,n){this.element.innerHTML=`
      <div class="error-panel-content">
        <div class="error-panel-header">
          <h2>⚠️ 配置错误</h2>
          <p class="error-summary">发现 ${e.length} 个配置错误，请检查 config.json</p>
        </div>
        <div class="error-list">
          ${e.map((s,d)=>this.renderErrorCard(s,d)).join("")}
        </div>
        <div class="error-actions">
          <button class="btn btn-primary" id="retry-btn">🔄 刷新重试</button>
          <button class="btn btn-secondary" id="example-btn">📖 查看示例配置</button>
        </div>
      </div>
    `;const o=this.element.querySelector("#retry-btn"),r=this.element.querySelector("#example-btn");o&&o.addEventListener("click",i),r&&r.addEventListener("click",n)}renderErrorCard(e,i){const n=Re[e.code]||"配置错误",o=Ue[e.code]||"请检查配置文件的格式和内容",r=[];e.museumName&&r.push(`馆：${e.museumName}`),e.sceneName&&r.push(`场景：${e.sceneName}`);const s=r.length>0?r.join(" / "):"全局配置";return`
      <div class="error-card">
        <div class="error-card-header">
          <span class="error-icon">❌</span>
          <span class="error-title">${this.escapeHtml(n)}</span>
        </div>
        <div class="error-card-body">
          <div class="error-location">
            <span class="location-icon">📍</span>
            <span class="location-text">${this.escapeHtml(s)}</span>
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
            <span class="hint-text">${this.escapeHtml(o)}</span>
          </div>
        </div>
      </div>
    `}escapeHtml(e){const i=document.createElement("div");return i.textContent=e,i.innerHTML}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}var y=(t=>(t.LOADING_LOW="loadingLow",t.LOW_READY="lowReady",t.LOADING_HIGH="loadingHigh",t.HIGH_READY="highReady",t.DEGRADED="degraded",t.ERROR="error",t))(y||{}),le=(t=>(t.THUMB="thumb",t.PANO_LOW="panoLow",t.PANO="pano",t.VIDEO="video",t.COVER="cover",t.MAP="map",t.DOLLHOUSE="dollhouse",t))(le||{});const ke=["/assets/panos/"],Ge=[],He="/config.json",Fe=1e3,G="vrplayer.assetCdn.lastSuccess",$e=12*60*60*1e3;let U=null,D=null,b="idle",A=0;function Be(t){const e=t.trim();return e?e.startsWith("/")?e:`/${e}`:""}function ie(t,e){const i=Array.isArray(t)&&t.length>0?t:e,n=new Set;for(const o of i){if(typeof o!="string")continue;const r=Be(o);r&&n.add(r)}return Array.from(n)}function ce(t){return t.replace(/\/+$/,"")}function Ye(t){const e=[];Array.isArray(t.baseUrls)&&e.push(...t.baseUrls),typeof t.baseUrl=="string"&&e.push(t.baseUrl);const i=new Set;for(const n of e){if(typeof n!="string")continue;const o=ce(n.trim());o&&i.add(o)}return Array.from(i)}function We(){var t;return typeof window<"u"&&((t=window.location)!=null&&t.origin)?window.location.origin:typeof location<"u"&&location.origin?location.origin:null}function q(){if(typeof window>"u")return null;try{return window.localStorage}catch{return null}}function qe(t){const e=q();if(!e)return null;try{const i=e.getItem(G);if(!i)return null;const n=JSON.parse(i),o=typeof n.baseUrl=="string"?ce(n.baseUrl.trim()):"",r=typeof n.expiresAt=="number"&&Number.isFinite(n.expiresAt)?n.expiresAt:0;return!o||r<=Date.now()||!t.baseUrls.includes(o)?(e.removeItem(G),null):o}catch{return e.removeItem(G),null}}function ze(t,e){const i=q();if(!i||!e.baseUrls.includes(t))return;const n=Date.now(),o={baseUrl:t,updatedAt:n,expiresAt:n+$e};try{i.setItem(G,JSON.stringify(o))}catch{}}function ne(){const t=q();if(t)try{t.removeItem(G)}catch{}}function de(t){const e=t.match(/^([^?#]*)([?#].*)?$/);return e?{path:e[1]||"",suffix:e[2]||""}:{path:t,suffix:""}}function se(t,e){return e.some(i=>t.startsWith(i))}function ue(t,e){return!(!se(t,e.includePrefixes)||se(t,e.excludePrefixes))}function he(t,e){const{path:i,suffix:n}=de(t);return`${e}${i}${n}`}function je(t,e,i){if(!/^https?:\/\//i.test(t))return null;try{const n=new URL(t),o=We();return!o||n.origin!==o||!ue(n.pathname,e)?null:he(`${n.pathname}${n.search}${n.hash}`,i)}catch{return null}}function Xe(t){if(typeof t!="string"||t.trim()==="")return He;const e=t.trim();return e.startsWith("/")?e:`/${e}`}function Ke(t,e){const i=e.includes("?")?"&":"?";return`${t}${e}${i}__cdn_probe=${Date.now()}`}async function Qe(t,e,i){if(i!==A||typeof window>"u"||typeof fetch!="function")return!1;const n=typeof AbortController<"u"?new AbortController:null,o=window.setTimeout(()=>n==null?void 0:n.abort(),e.probeTimeoutMs);try{return(await fetch(Ke(t,e.probePath),{method:"GET",mode:"cors",cache:"no-store",referrerPolicy:"no-referrer",signal:n==null?void 0:n.signal})).ok}catch{return!1}finally{window.clearTimeout(o)}}async function Je(t,e){if(t.baseUrls.length===0)return null;const i=t.baseUrls.map(async s=>{if(!await Qe(s,t,e))throw new Error(`probe failed: ${s}`);return s}),n=Promise.any;if(typeof n=="function")try{return await n.call(Promise,i)}catch{return null}const r=(await Promise.all(i.map(s=>s.then(d=>({ok:!0,baseUrl:d})).catch(()=>({ok:!1,baseUrl:null}))))).find(s=>s.ok&&typeof s.baseUrl=="string");return(r==null?void 0:r.baseUrl)??null}function W(t=!1){const e=U;if(!e||!e.enabled||!t&&D||b==="probing")return;if(typeof window>"u"||typeof fetch!="function"){b="failed";return}b="probing";const i=++A;(async()=>{const n=await Je(e,i);if(i===A){if(n){D=n,ze(n,e),b="ok";return}i===A&&(D=null,ne(),b="failed")}})().catch(()=>{i===A&&(D=null,ne(),b="failed")}).finally(()=>{})}function F(t){if(A+=1,D=null,b="idle",!t||t.enabled===!1){U=null;return}const e=Ye(t);if(e.length===0){U=null;return}U={enabled:!0,baseUrls:e,includePrefixes:ie(t.includePrefixes,ke),excludePrefixes:ie(t.excludePrefixes,Ge),probePath:Xe(t.probePath),probeTimeoutMs:typeof t.probeTimeoutMs=="number"&&Number.isFinite(t.probeTimeoutMs)?Math.max(200,Math.floor(t.probeTimeoutMs)):Fe};const i=qe(U);if(i){D=i,b="ok",W(!0);return}W(!1)}function Ze(t,e){if(!t||typeof t!="string"||t.trim()==="")return"";const i=t.trim(),n=U;if(!n||!n.enabled)return i;const o=D;if(!o)return W(),i;const r=je(i,n,o);if(r)return r;if(i.startsWith("//"))return i;const{path:s}=de(i);return!s.startsWith("/")||!ue(s,n)?i:he(i,o)}let N=null;function me(){return N!==null?N:typeof navigator<"u"&&navigator.maxTouchPoints>0||typeof window<"u"&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch)?(N="touch",N):(N="mouse",N)}function yt(){return me()==="touch"}function et(){return me()==="mouse"}let V=null;function pe(t,e=1500){if(Y())return;const i=document.querySelector(".vr-toast"),n=i??document.createElement("div");n.className="vr-toast",n.textContent=t,i||document.body.appendChild(n),window.requestAnimationFrame(()=>n.classList.add("show")),V&&window.clearTimeout(V),V=window.setTimeout(()=>{n.classList.remove("show"),window.setTimeout(()=>n.remove(),220),V=null},e)}function tt(){const t=document.querySelector(".vr-toast");t&&(t.classList.remove("show"),window.setTimeout(()=>t.remove(),220)),V&&(window.clearTimeout(V),V=null)}function it(){const t=document;return document.fullscreenElement||t.webkitFullscreenElement||null}function fe(){return!!it()}async function nt(t){const e=t;if(e.requestFullscreen){await e.requestFullscreen();return}if(e.webkitRequestFullscreen){await e.webkitRequestFullscreen();return}throw new Error("Fullscreen API not supported")}async function st(){const t=document;if(document.exitFullscreen){await document.exitFullscreen();return}if(t.webkitExitFullscreen){await t.webkitExitFullscreen();return}}async function ot(t){const e=t||document.body;!fe()&&et()&&pe("鼠标滑至最上方可退出全屏",700),await nt(e)}async function oe(){try{await st(),Ie()}catch(t){console.debug("[fullscreen] exitFullscreenBestEffort failed:",t)}}function Ie(){var t,e;try{(e=(t=screen.orientation)==null?void 0:t.unlock)==null||e.call(t)}catch{}}class rt{constructor(e){l(this,"element");l(this,"isOpen",!1);l(this,"options");this.options=e;const i=document.createElement("div");i.className="vr-modal vr-modal--media vr-modal--image";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const o=document.createElement("div");o.className="vr-modal-card vr-modal-card--media vr-modal-card--image",o.addEventListener("click",m=>m.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const s=document.createElement("div");s.className="vr-modal-title",s.textContent=e.title||"图片预览";const d=document.createElement("button");d.className="vr-btn vr-modal-close-icon",d.setAttribute("aria-label","关闭"),d.textContent="×",d.addEventListener("click",()=>this.handleClose()),r.appendChild(s),r.appendChild(d);const c=document.createElement("div");c.className="vr-modal-body vr-modal-body--image";const h=document.createElement("img");h.className="vr-modal-image",e.src&&(h.src=e.src),h.alt=e.title||"热点图片",h.loading="lazy",c.appendChild(h),o.appendChild(r),o.appendChild(c),i.appendChild(n),i.appendChild(o),this.element=i}handleClose(){var e,i;this.close(),(i=(e=this.options).onClose)==null||i.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class at{constructor(e){l(this,"element");l(this,"isOpen",!1);l(this,"options");this.options=e;const i=document.createElement("div");i.className="vr-modal vr-modal--info";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const o=document.createElement("div");o.className="vr-modal-card vr-modal-card--info",o.addEventListener("click",h=>h.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const s=document.createElement("div");s.className="vr-modal-title",s.textContent=e.title||"详情";const d=document.createElement("button");d.className="vr-btn vr-modal-close-icon",d.setAttribute("aria-label","关闭"),d.textContent="×",d.addEventListener("click",()=>this.handleClose()),r.appendChild(s),r.appendChild(d);const c=document.createElement("div");c.className="vr-modal-body vr-modal-body--info",c.textContent=e.text||"未配置内容",o.appendChild(r),o.appendChild(c),i.appendChild(n),i.appendChild(o),this.element=i}handleClose(){var e,i;this.close(),(i=(e=this.options).onClose)==null||i.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"))}getElement(){return this.element}destroy(){this.element.remove()}}class lt{constructor(e){l(this,"element");l(this,"isOpen",!1);l(this,"videoEl");l(this,"options");this.options=e;const i=document.createElement("div");i.className="vr-modal vr-modal--media vr-modal--video";const n=document.createElement("div");n.className="vr-modal-mask",n.addEventListener("click",()=>this.handleClose());const o=document.createElement("div");o.className="vr-modal-card vr-modal-card--media vr-modal-card--video",o.addEventListener("click",m=>m.stopPropagation());const r=document.createElement("div");r.className="vr-modal-header";const s=document.createElement("div");s.className="vr-modal-title",s.textContent=e.title||"视频";const d=document.createElement("button");d.className="vr-btn vr-modal-close-icon",d.setAttribute("aria-label","关闭"),d.textContent="×",d.addEventListener("click",()=>this.handleClose()),r.appendChild(s),r.appendChild(d);const c=document.createElement("div");c.className="vr-modal-body vr-modal-body--video";const h=document.createElement("video");h.className="vr-modal-video",e.src&&(h.src=e.src),e.poster&&(h.poster=e.poster),h.controls=!0,h.playsInline=!0,h.preload="metadata",this.videoEl=h,c.appendChild(h),o.appendChild(r),o.appendChild(c),i.appendChild(n),i.appendChild(o),this.element=i}handleClose(){var e,i;this.close(),(i=(e=this.options).onClose)==null||i.call(e)}open(){this.isOpen||(this.isOpen=!0,this.element.classList.add("open"))}close(){if(this.isOpen){this.isOpen=!1,this.element.classList.remove("open");try{this.videoEl.pause(),this.videoEl.currentTime=0,this.videoEl.removeAttribute("src"),this.videoEl.load()}catch{}}}getElement(){return this.element}destroy(){this.close(),this.element.remove()}}const ge="vr:open-modal",Ee="vr:close-modal";function bt(t){window.dispatchEvent(new CustomEvent(ge,{detail:t}))}function $(){window.dispatchEvent(new CustomEvent(Ee))}class ct{constructor(e){l(this,"rootEl");l(this,"current",null);l(this,"handleKeyDownBound");this.rootEl=e,this.handleKeyDownBound=i=>this.handleKeyDown(i),window.addEventListener(ge,i=>{const n=i;this.handleOpen(n.detail)}),window.addEventListener(Ee,()=>this.close()),window.addEventListener("keydown",this.handleKeyDownBound)}handleKeyDown(e){e.key==="Escape"&&this.close()}handleOpen(e){this.close();let i=null;e.type==="image"?i=new rt({src:e.payload.src,title:e.payload.title,onClose:()=>$()}):e.type==="info"?i=new at({title:e.payload.title,text:e.payload.text,onClose:()=>$()}):e.type==="video"&&(i=new lt({src:e.payload.src,poster:e.payload.poster,title:e.payload.title,onClose:()=>$()})),i&&(this.current=i,this.rootEl.innerHTML="",this.rootEl.appendChild(i.getElement()),i.open())}close(){this.current&&(this.current.close(),this.current.destroy(),this.current=null,this.rootEl.innerHTML="")}}let re=null;function dt(){if(re)return;let t=document.getElementById("vr-modal-root");t||(t=document.createElement("div"),t.id="vr-modal-root",document.body.appendChild(t)),re=new ct(t)}function ut(t,e,i){const n=t.getBoundingClientRect(),o=e-n.left,r=i-n.top,s=document.createElement("div");s.className="vr-pick-marker",s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.transform=`translate3d(${o}px, ${r}px, 0)`,s.style.pointerEvents="none",s.style.zIndex="1000",t.style.position="relative",t.appendChild(s),window.requestAnimationFrame(()=>{s.classList.add("show")}),window.setTimeout(()=>{s.classList.remove("show"),window.setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},200)},1500)}const _e="vr_last_pick_v1";let z=null;function ht(){try{const t=localStorage.getItem(_e);if(t){const e=JSON.parse(t);typeof e.yaw=="number"&&typeof e.pitch=="number"&&typeof e.ts=="number"&&(z=e)}}catch{}}ht();function mt(t){z=t;try{localStorage.setItem(_e,JSON.stringify(t))}catch{}}function At(){return z}class pt{constructor(){l(this,"listeners",new Map);l(this,"lastInteractionTs",0);l(this,"idleDelay",800);l(this,"idleTimer",null);l(this,"rafId",null);l(this,"isScheduled",!1);this.listeners.set("user-interacting",new Set),this.listeners.set("user-idle",new Set),this.listeners.set("ui-engaged",new Set)}on(e,i){const n=this.listeners.get(e);return n?(n.add(i),()=>{n.delete(i)}):(console.warn(`[InteractionBus] 未知事件类型: ${e}`),()=>{})}off(e,i){const n=this.listeners.get(e);n&&n.delete(i)}emit(e){this.isScheduled||(this.isScheduled=!0,this.rafId=requestAnimationFrame(()=>{this.isScheduled=!1;const i=this.listeners.get(e);i&&i.forEach(n=>{try{n()}catch(o){console.error("[InteractionBus] 事件监听器执行失败:",o)}})}))}emitInteracting(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("user-interacting")}scheduleIdle(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.idleTimer=window.setTimeout(()=>{Date.now()-this.lastInteractionTs>=this.idleDelay&&(this.idleTimer=null,this.emit("user-idle"))},this.idleDelay)}emitUIEngaged(){this.lastInteractionTs=Date.now(),this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.emit("ui-engaged")}dispose(){this.idleTimer!==null&&(clearTimeout(this.idleTimer),this.idleTimer=null),this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.listeners.forEach(e=>e.clear()),this.listeners.clear()}}const O=new pt,ft=150,It=150,gt=400;function Et(){return{fadeMs:ft,restoreMs:It,restoreDelayMs:gt}}function _t(){O.on("user-interacting",()=>{}),O.on("user-idle",()=>{}),O.on("ui-engaged",()=>{})}let S=null;function wt(){const t=Et();O.on("user-interacting",()=>{S!==null&&(clearTimeout(S),S=null),document.documentElement.classList.add("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")}),O.on("user-idle",()=>{S!==null&&(clearTimeout(S),S=null),document.documentElement.classList.remove("vr-ui-interacting"),S=window.setTimeout(()=>{document.documentElement.classList.remove("vr-ui-restoring"),S=null},t.restoreDelayMs)}),O.on("ui-engaged",()=>{S!==null&&(clearTimeout(S),S=null),document.documentElement.classList.remove("vr-ui-interacting"),document.documentElement.classList.remove("vr-ui-restoring")})}const _=typeof window<"u"?new URLSearchParams(window.location.search).get("debug")==="1":!1;function Lt(...t){_&&console.debug("[VR Debug]",...t)}function vt(){const t={};try{const e=new URLSearchParams(window.location.search),i=e.get("museum"),n=e.get("scene");i&&(t.museumId=i),n&&(t.currentSceneId=n)}catch{}try{const e=document.querySelector(".vr-groundnav");if(e){t.groundNavDots={};const i=e.querySelector(".vr-groundnav__dot.is-aimed");i&&(t.groundNavDots.aimedSceneId=i.getAttribute("data-scene-id")||void 0);const n=e.querySelector(".vr-groundnav__dot.is-autonav");if(n){t.groundNavDots.isAutoNavActive=!0,t.groundNavDots.autoNavTargetSceneId=n.getAttribute("data-scene-id")||void 0;const o=n.querySelector(".vr-groundnav__progress");t.groundNavDots.hasProgressElement=!!o}}}catch{}try{const e=document.querySelector(".vr-previewcard");if(e){t.scenePreviewCard={},t.scenePreviewCard.isVisible=e.classList.contains("is-visible");const i=e.querySelector(".vr-previewcard__hint");i&&(t.scenePreviewCard.hintVisible=i.classList.contains("is-visible"),t.scenePreviewCard.hintEmphasizing=i.classList.contains("is-emphasizing"))}}catch{}try{const e=document.querySelector(".vr-scenestrip");e&&(t.sceneStrip={},t.sceneStrip.userScrolling=e.classList.contains("is-user-scrolling"))}catch{}try{const e=document.documentElement,i=Array.from(e.classList).filter(n=>n==="vr-ui-interacting"||n==="vr-ui-restoring");i.length>0&&(t.yieldClassManager={classes:i})}catch{}return t}function St(t){try{window.dispatchEvent(new CustomEvent("vr:close-panels"))}catch{}try{t?(t.emitInteracting(),setTimeout(()=>{try{document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}},100)):document.documentElement.classList.remove("vr-ui-interacting","vr-ui-restoring")}catch{}}_&&(window.__vrDump=()=>{const t=vt();return console.debug("[VR State Snapshot]",t),t},window.__vrResetUI=()=>{console.debug("[VR Reset UI] 姝ｅ湪娓呯悊鎵€鏈?UI 鐘舵€?.."),St(O),console.debug("[VR Reset UI] 娓呯悊瀹屾垚")},console.debug("[VR Debug] 璋冭瘯妯″紡宸插惎鐢ㄣ€備娇鐢?__vrDump() 鏌ョ湅鐘舵€侊紝浣跨敤 __vrResetUI() 澶嶄綅 UI"));be();_t();wt();Oe();const we=()=>{const t=document;!!(document.fullscreenElement||t.webkitFullscreenElement)&&tt()};document.addEventListener("fullscreenchange",we);document.addEventListener("webkitfullscreenchange",we);function Mt(){const t=new URLSearchParams(location.search);return t.has("development")||t.get("dev")==="1"||location.hash.includes("development")}class Tt{constructor(){l(this,"appElement");l(this,"config",null);l(this,"panoViewer",null);l(this,"titleBar",null);l(this,"topRightControls",null);l(this,"topModeTabs",null);l(this,"sceneTitleEl",null);l(this,"brandMark",null);l(this,"bottomDock",null);l(this,"sceneGuideDrawer",null);l(this,"guideTray",null);l(this,"museumList",null);l(this,"sceneListPage",null);l(this,"hotspots",null);l(this,"videoPlayer",null);l(this,"loading");l(this,"debugPanel",null);l(this,"configStudio",null);l(this,"qualityIndicator",null);l(this,"northCalibrationPanel",null);l(this,"currentMuseum",null);l(this,"currentScene",null);l(this,"hasBoundFullscreenEvents",!1);l(this,"mode","tour");l(this,"isStructureOverlayOpen",!1);l(this,"structureView2D",null);l(this,"structureView3D",null);l(this,"fcChatPanel",null);l(this,"infoModalMounted",null);l(this,"settingsModalMounted",null);l(this,"handlePopState",null);l(this,"handlePickEvent",null);l(this,"handlePickModeEvent",null);l(this,"handleMetricsEvent",null);l(this,"debugPanelRafId",null);l(this,"structure3DLoadToken",0);l(this,"chatInitToken",0);l(this,"chatFirstInteractionHandler",null);l(this,"panoViewerModulePromise",null);l(this,"topRightControlsModulePromise",null);l(this,"brandMarkModulePromise",null);l(this,"structureView2DModulePromise",null);l(this,"titleBarModulePromise",null);l(this,"museumListModulePromise",null);l(this,"sceneListPageModulePromise",null);l(this,"sceneGraphModulePromise",null);l(this,"vrModeModulePromise",null);l(this,"vrModeInitialized",!1);l(this,"externalImageModulePromise",null);l(this,"appModalsModulePromise",null);l(this,"uiErrorElement",null);const e=document.getElementById("app");if(!e)throw new Error("鎵句笉鍒?#app 鍏冪礌");this.appElement=e,dt(),this.loading=new Ce,this.appElement.appendChild(this.loading.getElement()),this.bindFullscreenEventsOnce(),this.init()}bindFullscreenEventsOnce(){if(this.hasBoundFullscreenEvents)return;this.hasBoundFullscreenEvents=!0;const e=()=>{var i;(i=this.topRightControls)==null||i.syncFullscreenState(),fe()||(this.topRightControls&&this.topRightControls.updateVrModeState(!1),this.panoViewer&&this.panoViewer.isVrModeEnabled()&&this.panoViewer.setVrModeEnabled(!1),Ie())};document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e)}loadPanoViewerModule(){return this.panoViewerModulePromise||(this.panoViewerModulePromise=f(()=>import("./PanoViewer-BIpMsy5Y.js").then(e=>e.P),__vite__mapDeps([0,1,2,3]),import.meta.url)),this.panoViewerModulePromise}loadTopRightControlsModule(){return this.topRightControlsModulePromise||(this.topRightControlsModulePromise=f(()=>import("./TopRightControls-DAEBYAUE.js"),[],import.meta.url)),this.topRightControlsModulePromise}loadBrandMarkModule(){return this.brandMarkModulePromise||(this.brandMarkModulePromise=f(()=>import("./BrandMark-BEHHO9Nu.js"),__vite__mapDeps([4,5]),import.meta.url)),this.brandMarkModulePromise}loadStructureView2DModule(){return this.structureView2DModulePromise||(this.structureView2DModulePromise=f(()=>import("./StructureView2D-YNggYitX.js"),__vite__mapDeps([6,7]),import.meta.url)),this.structureView2DModulePromise}loadTitleBarModule(){return this.titleBarModulePromise||(this.titleBarModulePromise=f(()=>import("./TitleBar-DAY6bVbi.js"),[],import.meta.url)),this.titleBarModulePromise}loadMuseumListModule(){return this.museumListModulePromise||(this.museumListModulePromise=f(()=>import("./MuseumList-BKzJ8JVk.js"),[],import.meta.url)),this.museumListModulePromise}loadSceneListPageModule(){return this.sceneListPageModulePromise||(this.sceneListPageModulePromise=f(()=>import("./SceneListPage-CxD4QxIb.js"),[],import.meta.url)),this.sceneListPageModulePromise}loadSceneGraphModule(){return this.sceneGraphModulePromise||(this.sceneGraphModulePromise=f(()=>import("./sceneGraph-CaQzl5R8.js"),[],import.meta.url)),this.sceneGraphModulePromise}loadVrModeModule(){return this.vrModeModulePromise||(this.vrModeModulePromise=f(()=>import("./vrMode-DyIJynW0.js"),__vite__mapDeps([8,1]),import.meta.url)),this.vrModeModulePromise}loadAppModalsModule(){return this.appModalsModulePromise||(this.appModalsModulePromise=f(()=>import("./appModals-C7Mh3qzo.js"),__vite__mapDeps([9,10,2]),import.meta.url)),this.appModalsModulePromise}async ensureVrModeInitialized(){const e=await this.loadVrModeModule();return this.vrModeInitialized||(e.initVrMode(),this.vrModeInitialized=!0),e}async resolveProxiedImageUrl(e){this.externalImageModulePromise||(this.externalImageModulePromise=f(()=>import("./externalImage-Cn8sVw7v.js"),[],import.meta.url));try{const{toProxiedImageUrl:i}=await this.externalImageModulePromise;return i(e)}catch{return e}}async init(){try{if(this.loading.show(),Ve()){await this.initEditorMode(),this.loading.hide();return}this.config=await X(),F(this.config.assetCdn),this.titleBar&&this.titleBar.setTitle(this.config.appName),this.handlePopState||(this.handlePopState=()=>{this.handleRoute()},window.addEventListener("popstate",this.handlePopState)),await this.handleRoute(),this.loading.hide()}catch(e){console.error("配置加载失败:",e),this.loading.hide(),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}async initEditorMode(){try{this.config=await X(),F(this.config.assetCdn),this.appElement.innerHTML="";const{ConfigStudio:e}=await f(async()=>{const{ConfigStudio:i}=await import("./editor-debug-5l2Y-X-O.js").then(n=>n.C);return{ConfigStudio:i}},__vite__mapDeps([11,12,5]),import.meta.url);this.configStudio=new e(this.config,i=>{this.config=i,F(i.assetCdn),K()}),this.appElement.appendChild(this.configStudio.getElement())}catch(e){console.error("初始化编辑器模式失败:",e),e.validationErrors&&Array.isArray(e.validationErrors)?this.showConfigErrorPanel(e.validationErrors):this.showError("加载配置失败，请刷新页面重试")}}showConfigErrorPanel(e){this.appElement.innerHTML="";const i=new xe(e,()=>{K(),window.location.reload()},()=>{this.showConfigExample()});this.appElement.appendChild(i.getElement())}showConfigExample(){const e=window.open("","_blank");e&&e.document.write(`
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
      `)}async handleRoute(){if(!this.config)return;const e=Z();if(e.sceneId&&(this.loadPanoViewerModule(),this.loadTopRightControlsModule(),this.loadBrandMarkModule()),this.clearView(),!e.museumId){const i=this.config.museums.find(n=>n.id==="wangding")||this.config.museums[0];if(i){if(i.scenes&&i.scenes.length>0){k(i.id,i.scenes[0].id);return}te(i.id);return}}if(!e.museumId)await this.showMuseumList();else if(e.sceneId){const i=B(e.museumId),n=Ne(e.museumId,e.sceneId);i&&n?await this.showScene(i,n):(this.showError("未找到指定场景"),i?te(i.id):ee())}else{const i=B(e.museumId);i?await this.showSceneList(i):(this.showError("未找到指定展馆"),ee())}}async showMuseumList(){if(!this.config)return;const[{TitleBar:e},{MuseumList:i}]=await Promise.all([this.loadTitleBarModule(),this.loadMuseumListModule()]);this.titleBar=new e(this.config.appName),this.appElement.appendChild(this.titleBar.getElement()),this.museumList=new i(this.config.museums),this.appElement.appendChild(this.museumList.getElement())}async showSceneList(e){const{TitleBar:i}=await this.loadTitleBarModule();this.titleBar=new i(e.name),this.appElement.appendChild(this.titleBar.getElement());const{SceneListPage:n}=await this.loadSceneListPageModule();this.sceneListPage=new n(e),this.appElement.appendChild(this.sceneListPage.getElement())}async showScene(e,i){var M;this.currentMuseum=e,this.currentScene=i,this.loading.show();const n=document.createElement("div");n.className="viewer-container",n.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    `,this.appElement.appendChild(n);const o=De(),{PanoViewer:r}=await this.loadPanoViewerModule();this.panoViewer=new r(n,o);const s=Mt();if(this.mountTopRightControls(n,i,s),this.sceneTitleEl=document.createElement("div"),this.sceneTitleEl.className="vr-scenetitle",this.sceneTitleEl.textContent=i.name||((M=this.config)==null?void 0:M.appName)||"VR Player",this.appElement.appendChild(this.sceneTitleEl),this.handlePickEvent&&(window.removeEventListener("vr:pick",this.handlePickEvent),this.handlePickEvent=null),this.handlePickEvent=E=>{const u=E,{x:w,y:I,yaw:C,pitch:R}=u.detail;if(mt({yaw:C,pitch:R,ts:Date.now()}),pe(`宸插鍒?yaw: ${C.toFixed(2)}, pitch: ${R.toFixed(2)}`),this.panoViewer){const x=this.panoViewer.getDomElement();ut(x,w,I)}},window.addEventListener("vr:pick",this.handlePickEvent),this.handlePickModeEvent&&(window.removeEventListener("vr:pickmode",this.handlePickModeEvent),this.handlePickModeEvent=null),this.handlePickModeEvent=E=>{const u=E;this.panoViewer&&!u.detail.enabled&&this.panoViewer.isPickModeEnabled()&&this.panoViewer.disablePickMode()},window.addEventListener("vr:pickmode",this.handlePickModeEvent),this.mountBrandMark(),o){const{DebugPanel:E}=await f(async()=>{const{DebugPanel:w}=await import("./editor-debug-5l2Y-X-O.js").then(I=>I.D);return{DebugPanel:w}},__vite__mapDeps([11,12,5]),import.meta.url);this.debugPanel=new E,this.appElement.appendChild(this.debugPanel.getElement()),this.panoViewer.setOnDebugClick((w,I,C,R,x)=>{this.debugPanel&&this.debugPanel.show(w,I,C,R,x)}),this.debugPanelRafId!==null&&(cancelAnimationFrame(this.debugPanelRafId),this.debugPanelRafId=null);const u=()=>{if(this.debugPanel&&this.panoViewer){const w=this.panoViewer.getCurrentView();this.debugPanel.updateView(w.yaw,w.pitch,w.fov)}this.debugPanelRafId=requestAnimationFrame(u)};u()}let d=!1,c=!1;const h=async()=>{if(!(d||c)&&this.panoViewer&&!(!this.currentScene||this.currentScene.id!==i.id)){c=!0;try{const[{VideoPlayer:E},{GuideTray:u},{SceneGuideDrawer:w},{BottomDock:I},{TopModeTabs:C},{Hotspots:R},{QualityIndicator:x}]=await Promise.all([f(()=>import("./VideoPlayer-DQjQhWxS.js"),[],import.meta.url),f(()=>import("./GuideTray-DOOT9VrQ.js"),__vite__mapDeps([13,3]),import.meta.url),f(()=>import("./SceneGuideDrawer-Y6PNcZSx.js"),__vite__mapDeps([14,3,15]),import.meta.url),f(()=>import("./BottomDock-l2TZYbO6.js"),__vite__mapDeps([16,10,15]),import.meta.url),f(()=>import("./TopModeTabs-psisWFio.js"),[],import.meta.url),f(()=>import("./Hotspots-bVfrAHPp.js"),__vite__mapDeps([17,1]),import.meta.url),f(()=>import("./QualityIndicator-BGhaumER.js"),[],import.meta.url)]);if(d||!this.panoViewer||!this.currentScene||this.currentScene.id!==i.id)return;d=!0;try{this.videoPlayer=new E,this.appElement.appendChild(this.videoPlayer.getElement())}catch(g){_&&console.debug("[showScene] VideoPlayer 创建失败，已跳过",g),this.videoPlayer=null}try{this.guideTray=new u({museumId:e.id,currentSceneId:i.id,scenes:e.scenes,onSceneClick:g=>{k(e.id,g)},onMoreClick:()=>{if(!this.sceneGuideDrawer)try{this.sceneGuideDrawer=new w({museumId:e.id,currentSceneId:i.id,scenes:e.scenes,onClose:()=>{}}),this.appElement.appendChild(this.sceneGuideDrawer.getElement())}catch(g){_&&console.debug("[GuideTray] SceneGuideDrawer 创建失败:",g)}this.guideTray&&this.guideTray.setVisible(!1),this.sceneGuideDrawer&&this.sceneGuideDrawer.open()},onClose:()=>{this.guideTray&&this.guideTray.setVisible(!1),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"guide"}}))}}),this.guideTray.setVisible(!1),this.appElement.appendChild(this.guideTray.getElement())}catch(g){_&&console.debug("[showScene] GuideTray 创建失败，已跳过",g),this.guideTray=null}try{this.bottomDock=new I({onGuideClick:()=>{this.guideTray&&this.guideTray.setVisible(!0)},onOpenInfo:()=>{this.openInfoModal()},onOpenSettings:()=>{this.openSettingsModal()},sceneId:i.id,sceneName:i.name,museum:e,scenes:e.scenes,currentSceneId:i.id}),this.appElement.appendChild(this.bottomDock.getElement())}catch(g){_&&console.debug("[showScene] BottomDock 创建失败，已跳过",g),this.bottomDock=null}try{this.topModeTabs=new C({initialMode:this.mode,onModeChange:g=>{this.setMode(g)}}),this.appElement.appendChild(this.topModeTabs.getElement())}catch(g){_&&console.debug("[showScene] TopModeTabs 创建失败，已跳过",g),this.topModeTabs=null}try{const g=new Map(e.scenes.map(P=>[P.id,P.name]));this.hotspots=new R(this.panoViewer,i.hotspots,{resolveSceneName:P=>g.get(P),onEnterScene:P=>{k(e.id,P)},museumId:e.id}),n.appendChild(this.hotspots.getElement())}catch(g){_&&console.debug("[showScene] Hotspots 创建失败，已跳过",g),this.hotspots=null}try{this.qualityIndicator=new x,this.appElement.appendChild(this.qualityIndicator.getElement()),this.panoViewer&&this.qualityIndicator.updateStatus(this.panoViewer.getLoadStatus())}catch(g){_&&console.debug("[showScene] QualityIndicator 创建失败，已跳过",g),this.qualityIndicator=null}this.handleMetricsEvent&&(window.removeEventListener("vr:metrics",this.handleMetricsEvent),this.handleMetricsEvent=null),this.handleMetricsEvent=g=>{if(!this.qualityIndicator)return;const P=g.detail||{};this.qualityIndicator.updateMetrics(P)},window.addEventListener("vr:metrics",this.handleMetricsEvent)}finally{c=!1}}};this.panoViewer.setOnStatusChange(E=>{this.qualityIndicator&&this.qualityIndicator.updateStatus(E),!d&&(E===y.LOW_READY||E===y.HIGH_READY||E===y.DEGRADED)&&window.setTimeout(()=>{h()},0),(E===y.LOW_READY||E===y.HIGH_READY||E===y.DEGRADED)&&this.loading.hide()}),this.panoViewer.setOnLoad(()=>{h(),this.loading.hide(),this.hideUIError(),this.preloadNextScene(e,i)}),this.panoViewer.setOnError(E=>{console.error("加载场景失败:",E),this.loading.hide(),this.showError("加载全景图失败，请检查网络连接"),this.qualityIndicator&&this.qualityIndicator.updateStatus(y.ERROR)});const m=Z(),p=m.yaw!==void 0?m.yaw:i.initialView.yaw||0,H=m.pitch!==void 0?m.pitch:i.initialView.pitch||0,v=m.fov!==void 0?m.fov:i.initialView.fov||75,T=-p;this.panoViewer.setView(T,H,v),this.panoViewer.loadScene(i),this.panoViewer.setSceneData(e.id,i.id,i.hotspots),this.setupChatOnFirstInteraction(e,i)}async mountTopRightControls(e,i,n){var o;try{const{TopRightControls:r}=await this.loadTopRightControlsModule();if(!this.panoViewer||!this.currentScene||this.currentScene.id!==i.id)return;(o=this.topRightControls)==null||o.remove(),this.topRightControls=new r({viewerRootEl:e,onTogglePickMode:n?()=>this.panoViewer?(this.panoViewer.isPickModeEnabled()?this.panoViewer.disablePickMode():this.panoViewer.enablePickMode(),this.panoViewer.isPickModeEnabled()):!1:void 0,onOpenNorthCalibration:n?()=>{this.openNorthCalibration(i.id)}:void 0,showNorthCalibration:n,onToggleVrMode:async()=>this.toggleVrModeFromUI(e)}),this.appElement.appendChild(this.topRightControls.getElement())}catch(r){_&&console.debug("[showScene] TopRightControls 创建失败，已跳过",r),this.topRightControls=null}}async mountBrandMark(){var e;try{const{BrandMark:i}=await this.loadBrandMarkModule();if(this.appElement.querySelector(".vr-brandmark"))return;this.brandMark=new i({appName:(e=this.config)==null?void 0:e.appName,brandText:"鼎虎清源"});const o=this.brandMark.getElement();o.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),this.openDingHuQingYuan()}),this.appElement.appendChild(o)}catch(i){_&&console.debug("[showScene] BrandMark 创建失败，已跳过",i),this.brandMark=null}}setupChatOnFirstInteraction(e,i){var s;this.chatInitToken+=1,this.clearChatFirstInteractionListeners();const n=(s=this.config)==null?void 0:s.fcChat;if(!(n!=null&&n.endpoint)||!n.endpoint.trim())return;const o=this.chatInitToken,r=()=>{this.clearChatFirstInteractionListeners(),this.initChatPanel(o,n,e,i)};this.chatFirstInteractionHandler=r,window.addEventListener("pointerdown",r,{passive:!0}),window.addEventListener("touchstart",r,{passive:!0}),window.addEventListener("keydown",r)}async initChatPanel(e,i,n,o){if(e===this.chatInitToken&&!(!this.currentScene||this.currentScene.id!==o.id))try{const[{FcChatPanel:r},{FcChatClient:s}]=await Promise.all([f(()=>import("./chat-community-Br_nepnd.js").then(h=>h.F),__vite__mapDeps([18,19]),import.meta.url),f(()=>import("./chat-community-Br_nepnd.js").then(h=>h.f),__vite__mapDeps([18,19]),import.meta.url)]);if(e!==this.chatInitToken||!this.currentScene||this.currentScene.id!==o.id)return;const d={endpoint:i.endpoint,authToken:i.authToken,timeoutMs:15e3},c=new s(d);this.fcChatPanel&&(this.fcChatPanel.remove(),this.fcChatPanel=null),this.fcChatPanel=new r(c,{museumId:n.id,sceneId:o.id,sceneTitle:o.name,museumName:n.name,url:window.location.href})}catch(r){_&&console.debug("[showScene] FcChatPanel 创建失败，已跳过",r),this.fcChatPanel=null}}clearChatFirstInteractionListeners(){this.chatFirstInteractionHandler&&(window.removeEventListener("pointerdown",this.chatFirstInteractionHandler),window.removeEventListener("touchstart",this.chatFirstInteractionHandler),window.removeEventListener("keydown",this.chatFirstInteractionHandler),this.chatFirstInteractionHandler=null)}preloadNextScene(e,i){const o=(e.scenes.findIndex(s=>s.id===i.id)+1)%e.scenes.length,r=e.scenes[o];if(r&&r.thumb){const s=Ze(r.thumb,le.THUMB);if(s){const d=new Image;d.referrerPolicy="no-referrer",d.crossOrigin="anonymous",d.loading="lazy",d.decoding="async",this.resolveProxiedImageUrl(s).then(c=>{d.src=c}).catch(()=>{d.src=s})}}}clearView(){if(this.chatInitToken+=1,this.clearChatFirstInteractionListeners(),this.structure3DLoadToken+=1,this.handlePickEvent&&(window.removeEventListener("vr:pick",this.handlePickEvent),this.handlePickEvent=null),this.handlePickModeEvent&&(window.removeEventListener("vr:pickmode",this.handlePickModeEvent),this.handlePickModeEvent=null),this.handleMetricsEvent&&(window.removeEventListener("vr:metrics",this.handleMetricsEvent),this.handleMetricsEvent=null),this.debugPanelRafId!==null&&(cancelAnimationFrame(this.debugPanelRafId),this.debugPanelRafId=null),this.panoViewer&&(this.panoViewer.dispose(),this.panoViewer=null),this.titleBar&&(this.titleBar.remove(),this.titleBar=null),this.topRightControls&&(this.topRightControls.remove(),this.topRightControls=null),this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),this.topModeTabs&&(this.topModeTabs.getElement().remove(),this.topModeTabs=null),this.sceneTitleEl&&(this.sceneTitleEl.remove(),this.sceneTitleEl=null),this.brandMark&&(this.brandMark.remove(),this.brandMark=null),this.bottomDock&&(this.bottomDock.remove(),this.bottomDock=null),this.guideTray&&(this.guideTray.remove(),this.guideTray=null),this.sceneGuideDrawer&&(this.sceneGuideDrawer.remove(),this.sceneGuideDrawer=null),this.museumList&&(this.museumList.remove(),this.museumList=null),this.sceneListPage&&(this.sceneListPage.remove(),this.sceneListPage=null),this.hotspots&&(this.hotspots.remove(),this.hotspots=null),this.videoPlayer&&(this.videoPlayer.remove(),this.videoPlayer=null),this.debugPanel&&(this.debugPanel.remove(),this.debugPanel=null),this.configStudio&&(this.configStudio.remove(),this.configStudio=null),this.qualityIndicator&&(this.qualityIndicator.remove(),this.qualityIndicator=null),this.structureView2D){const e=this.structureView2D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView2D=null}if(this.structureView3D){const e=this.structureView3D.getElement();e&&e.parentNode&&e.parentNode.removeChild(e),this.structureView3D=null}this.isStructureOverlayOpen=!1,this.fcChatPanel&&(this.fcChatPanel.remove(),this.fcChatPanel=null),this.mode="tour",this.appElement.innerHTML="",this.appElement.appendChild(this.loading.getElement())}hideUIError(){this.uiErrorElement&&this.uiErrorElement.parentNode&&(this.uiErrorElement.parentNode.removeChild(this.uiErrorElement),this.uiErrorElement=null)}setMode(e){this.mode!==e&&(this.mode,this.mode=e,this.topModeTabs&&this.topModeTabs.setMode(e),e==="tour"&&this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),e==="structure2d"?this.openStructure2D():e==="structure3d"&&this.openStructure3D())}async openStructure2D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),this.structure3DLoadToken+=1;const e=this.structure3DLoadToken,[{buildSceneGraph:i},{StructureView2D:n}]=await Promise.all([this.loadSceneGraphModule(),this.loadStructureView2DModule()]);if(e!==this.structure3DLoadToken||this.mode!=="structure2d"||!this.currentMuseum||!this.currentScene)return;const o=i(this.currentMuseum,this.currentScene.id);this.structureView2D?this.structureView2D.updateContext({museum:this.currentMuseum,graph:o,currentSceneId:this.currentScene.id}):(this.structureView2D=new n({museum:this.currentMuseum,graph:o,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(r,s)=>{this.closeStructureOverlay({toTour:!1}),k(r,s)}}),this.appElement.appendChild(this.structureView2D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView2D.open()}async openStructure3D(){if(!this.currentMuseum||!this.currentScene)return;this.isStructureOverlayOpen&&this.closeStructureOverlay({toTour:!1}),this.structure3DLoadToken+=1;const e=this.structure3DLoadToken,[{buildSceneGraph:i},{StructureView3D:n}]=await Promise.all([this.loadSceneGraphModule(),f(()=>import("./dock-panels-Cs9Sxynv.js").then(r=>r.S),__vite__mapDeps([20,1,21,7]),import.meta.url)]);if(e!==this.structure3DLoadToken||this.mode!=="structure3d"||!this.currentMuseum||!this.currentScene)return;const o=i(this.currentMuseum,this.currentScene.id);this.structureView3D?this.structureView3D.updateContext({museum:this.currentMuseum,graph:o,currentSceneId:this.currentScene.id}):(this.structureView3D=new n({museum:this.currentMuseum,graph:o,currentSceneId:this.currentScene.id,onClose:()=>{this.closeStructureOverlay({toTour:!0})},onNodeClick:(r,s)=>{this.closeStructureOverlay({toTour:!1}),k(r,s)}}),this.appElement.appendChild(this.structureView3D.getElement())),this.isStructureOverlayOpen=!0,document.body.style.overflow="hidden",this.structureView3D.open()}closeStructureOverlay(e){if(this.isStructureOverlayOpen){if(this.structure3DLoadToken+=1,this.isStructureOverlayOpen=!1,this.structureView2D){const i=this.structureView2D.getElement();i&&i.parentNode&&i.parentNode.removeChild(i),this.structureView2D=null}if(this.structureView3D){const i=this.structureView3D.getElement();i&&i.parentNode&&i.parentNode.removeChild(i),this.structureView3D=null}document.body.style.overflow="",document.body.style.touchAction="",document.body.style.overscrollBehavior="",e.toTour&&(this.mode="tour",this.topModeTabs&&this.topModeTabs.setMode("tour"))}}async openNorthCalibration(e){if(this.northCalibrationPanel&&(this.northCalibrationPanel.close(),this.northCalibrationPanel=null),!this.panoViewer){console.warn("[openNorthCalibration] PanoViewer 未初始化");return}try{const{NorthCalibrationPanel:i}=await f(async()=>{const{NorthCalibrationPanel:n}=await import("./editor-debug-5l2Y-X-O.js").then(o=>o.N);return{NorthCalibrationPanel:n}},__vite__mapDeps([11,12,5]),import.meta.url);this.northCalibrationPanel=new i({getCurrentYaw:()=>{var o;const n=(o=this.panoViewer)==null?void 0:o.getCurrentView();return(n==null?void 0:n.yaw)??0},sceneId:e,onClose:()=>{this.northCalibrationPanel=null}})}catch(i){console.error("[openNorthCalibration] 创建校准面板失败:",i),this.northCalibrationPanel=null}}showError(e){this.hideUIError(),this.uiErrorElement=document.createElement("div"),this.uiErrorElement.className="error-message",this.uiErrorElement.textContent=e,this.uiErrorElement.style.cssText=`
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
    `,this.appElement.appendChild(this.uiErrorElement),setTimeout(()=>{this.hideUIError()},3e3)}openDingHuQingYuan(){if(this.brandMark)try{this.brandMark.getAboutModal().open()}catch(e){_&&console.debug("[openDingHuQingYuan] 打开团队介绍失败:",e)}}async openInfoModal(){var i,n,o;(i=this.infoModalMounted)==null||i.close(),this.infoModalMounted=null;const{openInfoModal:e}=await this.loadAppModalsModule();this.infoModalMounted=e({museumName:((n=this.currentMuseum)==null?void 0:n.name)||"-",sceneName:((o=this.currentScene)==null?void 0:o.name)||"-",onOpenBrand:()=>{this.openDingHuQingYuan()},onDockTabClose:()=>{this.infoModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"info"}}))}})}async toggleVrModeFromUI(e){if(!this.panoViewer)return!1;const i=await this.ensureVrModeInitialized();if(i.isVrModeEnabled())return i.disableVrMode(),this.panoViewer.setVrModeEnabled(!1),this.topRightControls&&this.topRightControls.updateVrModeState(!1),await oe(),!1;{try{await ot(e)}catch(s){return _&&console.debug("[VRMode] fullscreen request failed",s),!1}const o=this.panoViewer.getCurrentView();return i.setInteractingCallback(()=>{var s;return((s=this.panoViewer)==null?void 0:s.isInteracting())??!1}),await i.enableVrMode((s,d)=>{if(this.panoViewer){const c=o.yaw+s,h=Math.max(-90,Math.min(90,o.pitch+d));this.panoViewer.setView(c,h)}})?(this.panoViewer.setVrModeEnabled(!0),this.topRightControls&&this.topRightControls.updateVrModeState(!0),!0):(await oe(),!1)}}async openSettingsModal(){var i;(i=this.settingsModalMounted)==null||i.close(),this.settingsModalMounted=null;const{openSettingsModal:e}=await this.loadAppModalsModule();this.settingsModalMounted=e({currentScene:this.currentScene,panoViewer:this.panoViewer,bottomDock:this.bottomDock,onToggleVrMode:async n=>this.toggleVrModeFromUI(n),onDockTabClose:()=>{this.settingsModalMounted=null,window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"settings"}}))}})}}new Tt;"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(()=>{})});export{le as A,Re as E,y as L,f as _,Ue as a,_ as b,fe as c,Lt as d,Le as e,oe as f,At as g,ot as h,O as i,yt as j,dt as k,te as l,Y as m,k as n,Nt as o,et as p,bt as q,Ze as r,pe as s,Pe as v};
