var W=Object.defineProperty;var j=(b,e,r)=>e in b?W(b,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):b[e]=r;var s=(b,e,r)=>j(b,typeof e!="symbol"?e+"":e,r);import{n as q,r as D,A as F}from"./index-B41CKJJF.js";import{t as U}from"./externalImage-C8_s6D1F.js";import{g as B}from"./index-DnDnySW2.js";import"./three-renderer-sQHNT78z.js";const M="data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1F2933"/>
          <stop offset="1" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" fill="rgba(255,255,255,0.72)" font-size="20" text-anchor="middle" font-family="STKaiti,Kaiti SC,KaiTi,Songti SC,SimSun,Source Han Serif SC,Noto Serif SC,serif">
        暂无封面
      </text>
    </svg>`),Y={wangding:[{id:"family",title:"家风研学线",summary:"先看家风家讯，再看清廉立身与文化成就，最后在连屋收束成一句“如何立身”。",sceneIds:["family_instruction","culture_achievement","lianwu"]},{id:"spirit",title:"精神研学线",summary:"围绕担当、气节与时代价值展开，快速抓住人物精神主线。",sceneIds:["south_gate","political_chapter","prominent_achievement"]},{id:"study",title:"速览研学线",summary:"在最短时间内串起南门与核心展区，适合入馆预习和快速导览。",sceneIds:["south_gate","point_1","study_room"]}],yanghucheng:[{id:"spirit",title:"担当研学线",summary:"聚焦家国担当与关键择拼，形成一条红色主题导览线。",sceneIds:["entrance","west_room_1","east_room_1"]},{id:"war",title:"抗战研学线",summary:"围绕西安事变与抗战背景展开，把历史事件主线串起来。",sceneIds:["entrance","east_room_1","east_room_2"]},{id:"study",title:"速览研学线",summary:"用最少时间串起纪念馆关键点位，适合第一次进入馆内时预习。",sceneIds:["entrance","west_room_1","east_room_1"]}],linzexu:[{id:"spirit",title:"气节研学线",summary:"从禁烟行动与民族意识切入，抓住林则徐的气节与责任。",sceneIds:["south_gate","cross_mid","north_house_west"]},{id:"patriot",title:"家国研学线",summary:"围绕危机意识与个人担当展开，适合爱国主义教育场景。",sceneIds:["south_gate","lianwu_1","north_house_east"]},{id:"study",title:"速览研学线",summary:"串联南门、连屋与核心展点，适合短时数字导览与预习。",sceneIds:["south_gate","cross_mid","north_house_west"]}]};class X{constructor(e){s(this,"element");s(this,"isOpen",!1);s(this,"museumId");s(this,"currentSceneId");s(this,"scenes");s(this,"filteredScenes");s(this,"listEl",null);s(this,"previewImgEl",null);s(this,"previewTitleEl",null);s(this,"previewIdEl",null);s(this,"previewRouteEl",null);s(this,"previewOrderEl",null);s(this,"previewHintEl",null);s(this,"routeTitleEl",null);s(this,"routeFlowEl",null);s(this,"routeStateEl",null);s(this,"routeChipWrapEl",null);s(this,"routeSummaryEl",null);s(this,"searchInputEl",null);s(this,"hoveredSceneId",null);s(this,"selectedSceneId",null);s(this,"selectedRouteId",null);s(this,"searchQuery","");s(this,"onClose");s(this,"onEnterScene");this.museumId=e.museumId,this.currentSceneId=e.currentSceneId,this.scenes=e.scenes,this.filteredScenes=e.scenes,this.onClose=e.onClose,this.onEnterScene=e.onEnterScene,this.injectStyles(),this.element=document.createElement("div"),this.element.className="vr-guide-drawer",this.element.setAttribute("aria-label","场景导览抽屉");const r=document.createElement("div");r.className="vr-guide-mask";const i=document.createElement("div");i.className="vr-guide-panel";const t=document.createElement("div");t.className="vr-guide-header";const n=document.createElement("div");n.className="vr-guide-header-left";const d=document.createElement("div");d.className="vr-guide-title",d.textContent="场景导览";const l=document.createElement("div");l.className="vr-guide-subtitle",l.textContent="把搜索、路线、预览和进入收成一条线，先看清楚，再决定下一步。";const a=document.createElement("button");a.className="vr-guide-close",a.type="button",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),this.close()}),t.appendChild(n),t.appendChild(d),t.appendChild(l);const u=document.createElement("div");u.className="vr-guide-innovation-strip",[{label:"搜索点位",detail:"在整馆里快速定位目标场景。"},{label:"任务路线",detail:"把点位串成可以直接执行的导览线。"},{label:"重点预览",detail:"先看图和摘要，再决定是否进入。"},{label:"一键进入",detail:"确认后直接跳转到当前场景。"}].forEach(m=>{const g=document.createElement("div");g.className="vr-guide-innovation-chip";const P=document.createElement("strong");P.textContent=m.label;const H=document.createElement("span");H.textContent=m.detail,g.appendChild(P),g.appendChild(H),u.appendChild(g)}),t.appendChild(u),t.appendChild(a);const o=document.createElement("div");o.className="vr-guide-search";const c=document.createElement("span");c.className="vr-guide-search-icon",c.innerHTML=B("search");const p=document.createElement("input");p.className="vr-guide-search-input",p.type="search",p.id="vr-guide-search-input",p.name="scene-search",p.setAttribute("aria-label","搜索点位"),p.placeholder="查找点位",o.appendChild(c),o.appendChild(p),this.searchInputEl=p;const E=document.createElement("div");E.className="vr-guide-body";const I=document.createElement("div");I.className="vr-guide-list",this.listEl=I;const h=document.createElement("div");h.className="vr-guide-preview";const x=document.createElement("img");x.className="vr-guide-preview-image",x.referrerPolicy="no-referrer",x.crossOrigin="anonymous",x.decoding="async",x.loading="lazy",this.previewImgEl=x;const C=document.createElement("div");C.className="vr-guide-preview-title",this.previewTitleEl=C;const R=document.createElement("div");R.className="vr-guide-preview-id",this.previewIdEl=R;const N=document.createElement("div");N.className="vr-guide-preview-id",this.previewRouteEl=N;const z=document.createElement("div");z.className="vr-guide-route-summary",this.previewOrderEl=z;const _=document.createElement("div");_.className="vr-guide-route-summary",this.previewHintEl=_;const w=document.createElement("button");w.className="vr-guide-preview-enter",w.type="button";const k=document.createElement("span");k.className="vr-guide-enter-icon",k.innerHTML=B("arrow-right");const T=document.createElement("span");T.textContent="进入当前点位",w.appendChild(k),w.appendChild(T),w.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation();const g=this.selectedSceneId||this.currentSceneId;g&&g!==this.currentSceneId?(this.onEnterScene?this.onEnterScene(g,void 0,{source:"guide-drawer"}):q(this.museumId,g),this.close()):g===this.currentSceneId&&this.close()}),h.appendChild(x),h.appendChild(C),h.appendChild(R),h.appendChild(N),h.appendChild(z),h.appendChild(_),h.appendChild(w);const f=document.createElement("div");f.className="vr-guide-route-card";const S=document.createElement("div");S.className="vr-guide-route-title",S.textContent="任务化研学路线",this.routeTitleEl=S;const y=document.createElement("div");y.className="vr-guide-route-summary",y.textContent="1 搜点位 · 2 选路线 · 3 看预览 · 4 进当前点位",this.routeFlowEl=y;const L=document.createElement("div");L.className="vr-guide-preview-id",this.routeStateEl=L;const O=document.createElement("div");O.className="vr-guide-route-chips",this.routeChipWrapEl=O;const A=document.createElement("div");A.className="vr-guide-route-summary",this.routeSummaryEl=A,f.appendChild(S),f.appendChild(y),f.appendChild(L),f.appendChild(O),f.appendChild(A),h.appendChild(f),E.appendChild(I),E.appendChild(h),r.addEventListener("click",()=>this.close()),i.addEventListener("click",m=>m.stopPropagation()),i.appendChild(t),i.appendChild(o),i.appendChild(E),this.element.appendChild(r),this.element.appendChild(i),this.bindSearch(),this.renderList(),this.renderRouteSamples(),this.updatePreview()}open(){var e;this.isOpen||(this.isOpen=!0,this.element.classList.add("open"),this.updateOverlayState(),this.selectedSceneId=this.currentSceneId,this.selectedRouteId=((e=this.getRouteSamples().find(r=>r.sceneIds.includes(this.currentSceneId)))==null?void 0:e.id)??null,this.hoveredSceneId=null,this.updateActiveState(),this.renderRouteSamples(),this.updatePreview())}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("open"),this.updateOverlayState(),(e=this.onClose)==null||e.call(this))}updateOverlayState(){const e=document.querySelector(".fcchat-root");!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")&&this.isOpen||e&&e.style.display==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}toggle(){this.isOpen?this.close():this.open()}getElement(){return this.element}remove(){this.element.remove()}setCurrentScene(e){var r;this.currentSceneId=e,this.selectedSceneId=e,this.selectedRouteId=((r=this.getRouteSamples().find(i=>i.sceneIds.includes(e)))==null?void 0:r.id)??null,this.hoveredSceneId=null,this.updateActiveState(),this.renderRouteSamples(),this.updatePreview()}getRouteSamples(){return Y[this.museumId]||[]}getActiveRoute(){const e=this.getRouteSamples();return this.selectedRouteId&&e.find(r=>r.id===this.selectedRouteId)||e.find(r=>r.sceneIds.includes(this.currentSceneId))}getSceneOrderInRoute(e,r){return e?e.sceneIds.indexOf(r):-1}getBestPreviewSceneId(e){var i;const r=this.filteredScenes.length>0?this.filteredScenes:this.scenes;if(this.hoveredSceneId&&r.some(t=>t.id===this.hoveredSceneId))return this.hoveredSceneId;if(this.selectedSceneId&&r.some(t=>t.id===this.selectedSceneId))return this.selectedSceneId;if(e){const t=r.find(d=>d.id===this.currentSceneId);if(t)return t.id;const n=r.find(d=>e.sceneIds.includes(d.id));if(n)return n.id}return((i=r[0])==null?void 0:i.id)||null}bindSearch(){this.searchInputEl&&this.searchInputEl.addEventListener("input",()=>{var e;this.searchQuery=(((e=this.searchInputEl)==null?void 0:e.value)||"").trim().toLowerCase(),this.filteredScenes=this.applyFilters(),this.renderList(),this.renderRouteSamples(),this.updatePreview()})}applyFilters(){let e=[...this.scenes];const i=this.getRouteSamples().find(n=>n.id===this.selectedRouteId);if(i){const n=new Set(i.sceneIds);e=e.filter(d=>n.has(d.id))}const t=this.searchQuery;return t&&(e=e.filter(n=>(n.name||"").toLowerCase().includes(t)||n.id.toLowerCase().includes(t))),e}renderList(){if(!this.listEl)return;if(this.listEl.innerHTML="",this.filteredScenes.length===0){const i=document.createElement("div");i.className="vr-guide-empty",i.textContent="当前路线下暂时没有匹配点位，可以切换路线或调整搜索条件。",this.listEl.appendChild(i);return}const e=this.getActiveRoute(),r=this.selectedSceneId||this.currentSceneId;for(const i of this.filteredScenes){const t=document.createElement("div");t.className="vr-guide-item",t.setAttribute("data-scene-id",i.id),i.id===this.currentSceneId&&t.classList.add("active"),i.id===r&&t.classList.add("selected");const n=document.createElement("img");n.className="vr-guide-thumb",n.referrerPolicy="no-referrer",n.crossOrigin="anonymous",n.decoding="async",n.loading="lazy";const d=i.thumb?D(i.thumb,F.THUMB):"",l=d?U(d):M;n.src=l,n.alt=i.name||i.id;const a=document.createElement("div");a.className="vr-guide-meta";const u=document.createElement("div");u.className="vr-guide-name",u.textContent=i.name||i.id;const v=document.createElement("div");if(v.className="vr-guide-id",v.textContent=i.id,a.appendChild(u),a.appendChild(v),e){const o=this.getSceneOrderInRoute(e,i.id),c=document.createElement("div");c.className="vr-guide-id",i.id===this.currentSceneId?c.textContent=o>=0?"当前点位 · 路线第 "+(o+1)+" 站":"当前点位 · 不在本条路线":c.textContent=o>=0?"重点点位 · 路线第 "+(o+1)+" 站":"路线外点位",a.appendChild(c)}t.appendChild(n),t.appendChild(a),t.addEventListener("mouseenter",()=>{this.hoveredSceneId=i.id,this.updatePreview()}),t.addEventListener("mouseleave",()=>{this.hoveredSceneId=null,this.updatePreview()}),t.addEventListener("click",o=>{var c;o.preventDefault(),o.stopPropagation(),this.selectedSceneId=i.id,(c=this.listEl)==null||c.querySelectorAll(".vr-guide-item").forEach(p=>{p.classList.remove("selected")}),t.classList.add("selected"),this.updatePreview()}),this.listEl.appendChild(t)}}updateActiveState(){if(!this.listEl)return;const e=this.selectedSceneId||this.currentSceneId;this.listEl.querySelectorAll(".vr-guide-item").forEach(r=>{const i=r.getAttribute("data-scene-id"),t=i===this.currentSceneId;r.classList.toggle("active",t),r.classList.toggle("selected",i===e)})}updatePreview(){if(!this.previewImgEl||!this.previewTitleEl||!this.previewIdEl||!this.previewRouteEl||!this.previewOrderEl||!this.previewHintEl)return;const e=this.getActiveRoute(),r=this.getBestPreviewSceneId(e)||this.currentSceneId,i=this.filteredScenes.length>0?this.filteredScenes:this.scenes,t=i.find(l=>l.id===r)||i[0];if(!t)return;const n=t.thumb?D(t.thumb,F.THUMB):"",d=n?U(n):M;if(this.previewImgEl.src=d,this.previewImgEl.alt=t.name||t.id,this.previewTitleEl.textContent=t.name||t.id,this.previewIdEl.textContent=t.id,e){const l=this.getSceneOrderInRoute(e,t.id);this.previewRouteEl.textContent="任务路线："+e.title,this.previewOrderEl.textContent=l>=0?"这是本路线第 "+(l+1)+" 个重点点位，下一步可以继续按线路往下看。":"当前预览不在「"+e.title+"」这条任务线中，先确认是否需要切换路线。",this.previewHintEl.textContent=t.id===this.currentSceneId?"可以直接进入当前点位，或切换路线继续看。":"先确认当前点位，再点击进入当前场景。"}else this.previewRouteEl.textContent="自由浏览",this.previewOrderEl.textContent="当前点位没有匹配的任务路线，适合先看完预览再决定要不要加入路线。",this.previewHintEl.textContent=t.id===this.currentSceneId?"可以直接进入当前点位，或继续搜索别的场景。":"先确认当前点位，再点击进入当前场景。"}renderRouteSamples(){if(!this.routeTitleEl||!this.routeFlowEl||!this.routeStateEl||!this.routeChipWrapEl||!this.routeSummaryEl)return;const e=this.getRouteSamples();if(this.routeChipWrapEl.innerHTML="",e.length===0){this.routeStateEl.textContent="当前馆还没有配置任务化路线。",this.routeSummaryEl.textContent="你仍然可以直接搜索场景，自由浏览全部点位。";return}const r=e.find(t=>t.sceneIds.includes(this.currentSceneId)),i=this.selectedRouteId&&e.find(t=>t.id===this.selectedRouteId)||r||null;if(this.routeTitleEl.textContent="任务化研学路线",this.routeFlowEl.textContent="1 搜点位 · 2 选路线 · 3 看预览 · 4 进当前点位",i){const t=i.sceneIds.length;this.routeStateEl.textContent="当前已选："+i.title+" · 已锁定 "+t+" 个重点点位",this.routeSummaryEl.textContent=i.summary}else this.routeStateEl.textContent="当前点位暂无匹配的任务路线。",this.routeSummaryEl.textContent="可以先自由浏览，或者从下方选一条更贴近当前点位的路线。";e.forEach(t=>{var d;const n=document.createElement("button");n.type="button",n.className="vr-guide-route-chip",t.id===this.selectedRouteId&&n.classList.add("is-active"),n.textContent=t.title+" · "+t.sceneIds.length+" 站",n.title=t.summary,n.addEventListener("click",l=>{var u,v;l.preventDefault(),l.stopPropagation(),this.selectedRouteId=t.id,this.filteredScenes=this.applyFilters();const a=((u=this.filteredScenes.find(o=>o.id===this.currentSceneId))==null?void 0:u.id)||((v=this.filteredScenes[0])==null?void 0:v.id)||this.currentSceneId;this.selectedSceneId=a,this.renderList(),this.renderRouteSamples(),this.updatePreview()}),(d=this.routeChipWrapEl)==null||d.appendChild(n)})}injectStyles(){if(document.getElementById("scene-guide-drawer-style"))return;const e=document.createElement("style");e.id="scene-guide-drawer-style",e.textContent=`
      .vr-guide-drawer{
        position: fixed;
        inset: 0;
        z-index: 2600;
        pointer-events: none;
        opacity: 0;
        transition: opacity 180ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-drawer.open{
        pointer-events: auto;
        opacity: 1;
      }
      .vr-guide-mask{
        position: absolute;
        inset: 0;
        background: rgba(28, 21, 16, 0.26);
        backdrop-filter: blur(2px);
      }
      .vr-guide-panel{
        position: absolute;
        right: 18px;
        bottom: calc(18px + env(safe-area-inset-bottom, 0px));
        width: min(1080px, calc(100vw - 36px));
        height: min(78vh, 760px);
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: 1px solid rgba(103, 78, 54, 0.16);
        background:
          radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.88) 0%, transparent 42%),
          linear-gradient(145deg, rgba(252, 248, 241, 0.98) 0%, rgba(244, 236, 224, 0.98) 100%);
        box-shadow: 0 18px 44px rgba(73, 49, 28, 0.2);
        color: #1f1c17;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 220ms cubic-bezier(.2,.8,.2,1), transform 220ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-drawer.open .vr-guide-panel{
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .vr-guide-header{
        padding: 14px 16px 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-bottom: 1px solid rgba(103, 78, 54, 0.16);
        background:
          linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248, 241, 231, 0.96) 100%);
      }
      .vr-guide-header-left{
        width: 0;
        flex: 0;
      }
      .vr-guide-title{
        font-size: 22px;
        line-height: 1.2;
        font-weight: 600;
        letter-spacing: 0.01em;
        color: #1f1c17;
        font-family: var(--vr-font-chat-title, Georgia, serif);
      }
      .vr-guide-subtitle{
        margin-top: -2px;
        font-size: 13px;
        line-height: 1.55;
        color: rgba(106, 97, 87, 0.95);
        max-width: 56ch;
      }
      .vr-guide-innovation-strip{
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 8px;
      }
      .vr-guide-innovation-chip{
        min-height: 56px;
        padding: 10px 11px;
        border-radius: 14px;
        border: 1px solid rgba(201, 100, 66, 0.12);
        background: rgba(255, 255, 255, 0.72);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .vr-guide-innovation-chip strong{
        font-size: 13px;
        line-height: 1.2;
        font-weight: 600;
        color: #a84e2d;
      }
      .vr-guide-innovation-chip span{
        font-size: 11px;
        line-height: 1.45;
        color: rgba(106, 97, 87, 0.92);
      }
      .vr-guide-close{
        position: absolute;
        top: 14px;
        right: 16px;
        width: 32px;
        height: 32px;
        border-radius: 999px;
        border: 1px solid rgba(103, 78, 54, 0.14);
        background: rgba(255,255,255,0.72);
        color: #1f1c17;
        display: grid;
        place-items: center;
        font-size: 18px;
        line-height: 1;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-close:hover{
        background: rgba(255,255,255,0.9);
        box-shadow: 0 6px 14px rgba(166, 77, 45, 0.14);
      }
      .vr-guide-close:active{
        transform: scale(0.96);
      }
      .vr-guide-search{
        padding: 0 16px 12px;
        position: relative;
        display: flex;
        align-items: center;
      }
      .vr-guide-search-icon{
        position: absolute;
        left: 28px;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(106, 97, 87, 0.6);
        pointer-events: none;
      }
      .vr-guide-search-icon svg{
        width: 100%;
        height: 100%;
        stroke: currentColor;
        fill: none;
      }
      .vr-guide-search-input{
        width: 100%;
        height: 36px;
        border-radius: 999px;
        border: 1px solid rgba(103, 78, 54, 0.18);
        background: rgba(255, 255, 255, 0.88);
        color: #1f1c17;
        padding: 0 14px 0 44px;
        font-size: 13px;
        outline: none;
        box-sizing: border-box;
      }
      .vr-guide-search-input::placeholder{
        color: rgba(106, 97, 87, 0.68);
      }
      .vr-guide-search-input:focus{
        border-color: rgba(168, 78, 45, 0.42);
        box-shadow: 0 0 0 3px rgba(168, 78, 45, 0.12);
      }
      .vr-guide-body{
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(280px, 1.12fr) minmax(320px, 0.88fr);
        gap: 12px;
        padding: 0 16px 16px;
        overflow: hidden;
      }
      .vr-guide-list{
        flex: 1;
        padding: 0 2px 0 0;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        gap: 6px;
        pointer-events: auto;
        scroll-padding-top: 12px;
      }
      .vr-guide-item{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px;
        border-radius: 14px;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1), border-color 150ms cubic-bezier(.2,.8,.2,1);
        border: 1px solid transparent;
        min-width: 0;
      }
      .vr-guide-item:hover{
        background: rgba(201, 100, 66, 0.06);
        transform: translateY(-1px);
      }
      .vr-guide-item.active{
        background: rgba(201, 100, 66, 0.08);
        border-color: rgba(201, 100, 66, 0.12);
      }
      .vr-guide-item.selected{
        background: rgba(168, 78, 45, 0.12);
        border-color: rgba(168, 78, 45, 0.24);
      }
      .vr-guide-thumb{
        width: 58px;
        height: 58px;
        border-radius: 12px;
        flex-shrink: 0;
        object-fit: cover;
        background: rgba(255,255,255,0.66);
        box-shadow: inset 0 0 0 1px rgba(103, 78, 54, 0.12);
      }
      .vr-guide-meta{
        flex: 1;
        min-width: 0;
      }
      .vr-guide-name{
        font-size: 13px;
        font-weight: 600;
        color: #1f1c17;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .vr-guide-id{
        margin-top: 2px;
        font-size: 11px;
        line-height: 1.45;
        color: rgba(106, 97, 87, 0.84);
      }
      .vr-guide-empty{
        padding: 14px 12px;
        border-radius: 12px;
        background: rgba(255,255,255,0.74);
        border: 1px dashed rgba(103, 78, 54, 0.16);
        color: rgba(106, 97, 87, 0.92);
        font-size: 12px;
        line-height: 1.55;
      }
      .vr-guide-preview{
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }
      .vr-guide-preview-image{
        width: 100%;
        height: 210px;
        border-radius: 16px;
        object-fit: cover;
        background: rgba(255,255,255,0.72);
        box-shadow: inset 0 0 0 1px rgba(103, 78, 54, 0.12);
      }
      .vr-guide-preview-title{
        font-size: 14px;
        font-weight: 600;
        line-height: 1.3;
        color: #1f1c17;
      }
      .vr-guide-preview-id{
        font-size: 11px;
        line-height: 1.45;
        color: rgba(106, 97, 87, 0.84);
      }
      .vr-guide-route-card{
        margin-top: 2px;
        padding: 14px;
        border-radius: 16px;
        background:
          radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.72) 0%, transparent 48%),
          linear-gradient(145deg, rgba(201, 100, 66, 0.08) 0%, rgba(245, 238, 228, 0.94) 100%);
        border: 1px solid rgba(103, 78, 54, 0.14);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .vr-guide-route-title{
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: rgba(168, 78, 45, 0.96);
        text-transform: uppercase;
      }
      .vr-guide-route-chips{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .vr-guide-route-chip{
        height: 28px;
        padding: 0 12px;
        border-radius: 999px;
        border: 1px solid rgba(103, 78, 54, 0.14);
        background: rgba(255,255,255,0.72);
        color: #1f1c17;
        font-size: 12px;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1), border-color 150ms cubic-bezier(.2,.8,.2,1);
      }
      .vr-guide-route-chip:hover{
        background: rgba(201, 100, 66, 0.1);
        border-color: rgba(201, 100, 66, 0.22);
        transform: translateY(-1px);
      }
      .vr-guide-route-chip:active{
        transform: translateY(0);
      }
      .vr-guide-route-chip.is-active{
        background: linear-gradient(145deg, rgba(201, 100, 66, 0.96) 0%, rgba(168, 78, 45, 0.96) 100%);
        border-color: transparent;
        color: #fff;
      }
      .vr-guide-route-summary{
        font-size: 12px;
        line-height: 1.55;
        color: rgba(106, 97, 87, 0.92);
      }
      .vr-guide-preview-enter{
        margin-top: auto;
        align-self: flex-start;
        height: 34px;
        padding: 0 14px;
        border-radius: 999px;
        background: linear-gradient(145deg, rgba(201, 100, 66, 0.96) 0%, rgba(168, 78, 45, 0.96) 100%);
        color: #fff;
        font-size: 13px;
        cursor: pointer;
        border: 0;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1);
        box-shadow: 0 10px 20px rgba(166, 77, 45, 0.2);
      }
      .vr-guide-preview-enter:hover{
        transform: translateY(-1px);
        box-shadow: 0 12px 24px rgba(166, 77, 45, 0.24);
      }
      .vr-guide-preview-enter:active{
        transform: translateY(0);
      }
      .vr-guide-enter-icon{
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .vr-guide-enter-icon svg{
        width: 100%;
        height: 100%;
        stroke: currentColor;
        fill: none;
      }
      @media (max-width: 899px){
        .vr-guide-panel{
          left: 12px;
          right: 12px;
          width: auto;
          height: min(82vh, 760px);
        }
        .vr-guide-innovation-strip{
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .vr-guide-body{
          grid-template-columns: 1fr;
          grid-template-rows: auto minmax(0, 1fr);
        }
        .vr-guide-preview{
          order: -1;
        }
        .vr-guide-preview-image{
          height: 170px;
        }
      }
      @media (max-width: 520px){
        .vr-guide-panel{
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: min(86vh, 780px);
          border-radius: 18px 18px 0 0;
        }
        .vr-guide-header{
          padding: 14px 14px 12px;
        }
        .vr-guide-search{
          padding: 0 14px 12px;
        }
        .vr-guide-body{
          padding: 0 14px 14px;
        }
        .vr-guide-title{
          font-size: 20px;
        }
        .vr-guide-preview-image{
          height: 148px;
        }
      }
    `,document.head.appendChild(e)}}export{X as SceneGuideDrawer};
