var T=Object.defineProperty;var S=(r,t,e)=>t in r?T(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var a=(r,t,e)=>S(r,typeof t!="symbol"?t+"":t,e);import{l as B,a as N,g as E,t as M,b as I,c as L,d as _}from"./store-B83L8bDT.js";import{s as b}from"./index-CH8d6S_0.js";const g=40,O="fcchat_history_v2",P="fcchat_session_v1",z="fcchat_profile_v1";function v(r,t){const e=(t||"global").trim()||"global";return`${r}:${e}`}function k(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`fcchat_${Date.now()}_${Math.random().toString(36).slice(2,10)}`}class A{constructor(t,e){a(this,"client");a(this,"context");a(this,"root");a(this,"header");a(this,"body");a(this,"list");a(this,"input");a(this,"sendBtn");a(this,"clearBtn");a(this,"closeBtn");a(this,"statusLine");a(this,"dragging",!1);a(this,"dragOffsetX",0);a(this,"dragOffsetY",0);a(this,"isMobile",!1);a(this,"swipeStartY",0);a(this,"swipeActive",!1);a(this,"messages",[]);a(this,"isOpen",!1);a(this,"fabButton",null);a(this,"historyStorageKey");a(this,"sessionStorageKey");a(this,"profileStorageKey");a(this,"sessionId");a(this,"profile",{});a(this,"snapTimer",null);a(this,"isDragging",!1);a(this,"startX",0);a(this,"startY",0);a(this,"startLeft",0);a(this,"startTop",0);a(this,"lastLeft",0);a(this,"lastTop",0);a(this,"moved",!1);a(this,"hasUserPlaced",!1);a(this,"typingTimer",null);a(this,"typingAbortToken",0);this.client=t,this.context=e,this.historyStorageKey=v(O,e.museumId),this.sessionStorageKey=v(P,e.museumId),this.profileStorageKey=v(z,e.museumId),this.sessionId=this.loadSessionId(),this.profile=this.loadProfile(),this.mount(),this.injectStyles(),this.detectMobile(),this.restoreHistoryOrWelcome()}destroy(){var t,e;this.stopTyping(!0),this.snapTimer&&(window.clearTimeout(this.snapTimer),this.snapTimer=null),(t=this.root)==null||t.remove(),(e=this.fabButton)==null||e.remove(),this.fabButton=null}detectMobile(){var s,n;const t=((s=window.matchMedia)==null?void 0:s.call(window,"(max-width: 768px)").matches)??!1,e=((n=window.matchMedia)==null?void 0:n.call(window,"(pointer: coarse)").matches)??!1;this.isMobile=t||e,this.root.dataset.mobile=this.isMobile?"1":"0"}mount(){this.root=document.createElement("div"),this.root.className="fcchat-root",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-label","三馆学伴"),this.header=document.createElement("div"),this.header.className="fcchat-header";const t=document.createElement("div");t.className="fcchat-title",t.textContent="三馆学伴";const e=document.createElement("div");e.className="fcchat-header-right",this.clearBtn=document.createElement("button"),this.clearBtn.className="fcchat-btn fcchat-btn-ghost",this.clearBtn.type="button",this.clearBtn.textContent="清空",this.clearBtn.addEventListener("click",()=>this.clear()),this.closeBtn=document.createElement("button"),this.closeBtn.className="fcchat-btn fcchat-btn-ghost fcchat-close",this.closeBtn.type="button",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.textContent="×",this.closeBtn.addEventListener("click",()=>this.toggle()),e.appendChild(this.clearBtn),e.appendChild(this.closeBtn);const s=document.createElement("div");s.className="fcchat-header-row",s.appendChild(t),s.appendChild(e),this.header.appendChild(s);const n=document.createElement("div");n.className="fcchat-disclaimer",n.textContent="提示：AI 可能会出错，内容仅供参考；请以现场展陈/讲解为准。",this.header.appendChild(n),this.body=document.createElement("div"),this.body.className="fcchat-body",this.list=document.createElement("div"),this.list.className="fcchat-list",this.body.appendChild(this.list),this.statusLine=document.createElement("div"),this.statusLine.className="fcchat-status",this.statusLine.textContent="",this.body.appendChild(this.statusLine);const i=document.createElement("div");i.className="fcchat-inputbar",this.input=document.createElement("input"),this.input.className="fcchat-input",this.input.type="text",this.input.placeholder="输入问题，回车发送",this.input.addEventListener("keydown",o=>{o.key==="Enter"&&this.onSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="fcchat-btn fcchat-btn-primary",this.sendBtn.type="button",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.onSend()),i.appendChild(this.input),i.appendChild(this.sendBtn),this.root.appendChild(this.header),this.root.appendChild(this.body),this.root.appendChild(i),document.body.appendChild(this.root),this.root.style.display="none",this.root.style.right="18px",this.root.style.bottom="18px",this.ensureToggleButton(),this.header.addEventListener("mousedown",o=>this.onDragStart(o)),window.addEventListener("mousemove",o=>this.onDragMove(o)),window.addEventListener("mouseup",()=>this.onDragEnd()),this.header.addEventListener("pointerdown",o=>this.onSwipeStart(o),{passive:!1}),this.header.addEventListener("pointermove",o=>this.onSwipeMove(o),{passive:!1}),this.header.addEventListener("pointerup",o=>this.onSwipeEnd(o)),this.header.addEventListener("pointercancel",o=>this.onSwipeEnd(o)),window.addEventListener("resize",()=>this.detectMobile())}hide(){this.isOpen&&(this.isOpen=!1,this.stopTyping(!0),this.root.style.display="none",this.root.classList.remove("fcchat-open"),this.fabButton&&this.fabButton.classList.add("fcchat-docked"),document.body.classList.remove("fcchat-open"),this.updateOverlayState())}show(){this.isOpen||(this.isOpen=!0,this.detectMobile(),this.root.style.display="flex",this.root.classList.add("fcchat-open"),this.fabButton&&this.fabButton.classList.remove("fcchat-docked"),document.body.classList.add("fcchat-open"),this.scrollToBottom(),this.isMobile||this.input.focus(),this.updateOverlayState())}toggle(){this.isOpen?this.hide():this.show()}updateOverlayState(){!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||this.root&&this.root.style.display==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}getSafeBounds(){const t=window.innerWidth,e=window.innerHeight,s=this.fabButton;if(!s)return{minLeft:8,maxLeft:t-52,minTop:12,maxTop:e-64};const n=s.getBoundingClientRect(),i=n.width,o=n.height,c=12+(this.isMobile?56:12),h=12+(this.isMobile?96:12);return{minLeft:8,maxLeft:t-i-8,minTop:c,maxTop:e-o-h}}clampPos(t,e){const s=this.getSafeBounds();return{left:Math.max(s.minLeft,Math.min(t,s.maxLeft)),top:Math.max(s.minTop,Math.min(e,s.maxTop))}}snapToEdge(){const t=this.fabButton;if(!t)return;const e=this.getSafeBounds(),s=t.getBoundingClientRect(),n=s.left,i=s.top,o=n-e.minLeft,c=e.maxLeft-n,h=i-e.minTop,m=e.maxTop-i,l=Math.min(o,c,h,m);let p=n,d=i;l===o?p=e.minLeft:l===c?p=e.maxLeft:l===h?d=e.minTop:l===m&&(d=e.maxTop),t.style.left=`${p}px`,t.style.top=`${d}px`,t.style.right="auto",t.style.bottom="auto",localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:p,top:d})),setTimeout(()=>{t.classList.remove("fcchat-snapping")},220)}ensureToggleButton(){if(this.fabButton)return;const t=new URLSearchParams(location.search);if(t.get("reset_ui")==="1"){localStorage.removeItem("vr_fcchat_dock_state"),t.delete("reset_ui");const n=location.pathname+(t.toString()?"?"+t.toString():"")+location.hash;history.replaceState({},"",n)}const e=document.createElement("button");e.id="fcchat-fab",e.className="fcchat-fab fcchat-docked",e.type="button",e.setAttribute("aria-label","打开三馆学伴"),e.innerHTML=`<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,e.addEventListener("pointerdown",n=>this.onFabPointerDown(n),{passive:!1}),e.addEventListener("pointermove",n=>this.onFabPointerMove(n),{passive:!1}),e.addEventListener("pointerup",n=>this.onFabPointerUp(n),{passive:!1}),e.addEventListener("pointercancel",n=>this.onFabPointerUp(n),{passive:!1}),this.fabButton=e,document.body.appendChild(e);const s=localStorage.getItem("fcchat_fab_pos_v1");if(s)try{const n=JSON.parse(s);e.style.left=`${n.left}px`,e.style.top=`${n.top}px`,e.style.right="auto",e.style.bottom="auto",e.classList.remove("fcchat-docked"),this.hasUserPlaced=!0}catch{}!this.hasUserPlaced&&!this.isOpen&&e.classList.add("fcchat-docked"),this.maybeShowFirstVisitHint()}maybeShowFirstVisitHint(){const t="fcchat_first_hint_shown";if(sessionStorage.getItem(t))return;sessionStorage.setItem(t,"1");const e=this.fabButton;if(!e)return;const s=document.createElement("div");s.className="fcchat-first-hint",s.textContent="我是三馆学伴，为你解疑答惑😉",document.body.appendChild(s);const n=()=>{const i=e.getBoundingClientRect();s.style.left=`${i.left-8}px`,s.style.top=`${i.top+i.height/2}px`};n(),window.addEventListener("resize",n),setTimeout(()=>{s.classList.add("is-hide"),setTimeout(()=>{window.removeEventListener("resize",n),s.remove()},300)},1e4)}onFabPointerDown(t){const e=this.fabButton;if(!e)return;t.preventDefault(),this.isDragging=!1,this.moved=!1,this.startX=t.clientX,this.startY=t.clientY;const s=e.getBoundingClientRect(),n=parseFloat(e.style.left||""),i=parseFloat(e.style.top||"");this.startLeft=Number.isFinite(n)?n:s.left,this.startTop=Number.isFinite(i)?i:s.top;try{e.setPointerCapture(t.pointerId)}catch{}e.classList.remove("fcchat-docked")}onFabPointerMove(t){const e=this.fabButton;if(!e)return;t.preventDefault();const s=t.clientX-this.startX,n=t.clientY-this.startY;if(!this.isDragging){if(Math.abs(s)+Math.abs(n)<4)return;this.isDragging=!0,e.classList.add("fcchat-dragging")}const i=this.clampPos(this.startLeft+s,this.startTop+n);this.lastLeft=i.left,this.lastTop=i.top,e.style.left=`${this.lastLeft}px`,e.style.top=`${this.lastTop}px`,e.style.right="auto",e.style.bottom="auto",this.hasUserPlaced=!0}onFabPointerUp(t){const e=this.fabButton;if(e){t.preventDefault();try{e.releasePointerCapture(t.pointerId)}catch{}if(!this.isDragging){this.toggle();return}this.isDragging=!1,e.classList.remove("fcchat-dragging");try{localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:this.lastLeft,top:this.lastTop}))}catch{}this.snapTimer&&window.clearTimeout(this.snapTimer),e.classList.add("fcchat-snapping"),this.snapTimer=window.setTimeout(()=>{this.snapToEdge(),this.snapTimer=null},5e3)}}onDragStart(t){if(this.isMobile||t.target.closest("button"))return;this.dragging=!0;const s=this.root.getBoundingClientRect();this.dragOffsetX=t.clientX-s.left,this.dragOffsetY=t.clientY-s.top,this.root.style.right="auto",this.root.style.bottom="auto",this.root.style.left=s.left+"px",this.root.style.top=s.top+"px"}onDragMove(t){if(!this.dragging||this.isMobile)return;const e=window.innerWidth,s=window.innerHeight,n=this.root.getBoundingClientRect();let i=t.clientX-this.dragOffsetX,o=t.clientY-this.dragOffsetY;i=Math.max(8,Math.min(i,e-n.width-8)),o=Math.max(8,Math.min(o,s-n.height-8)),this.root.style.left=i+"px",this.root.style.top=o+"px"}onDragEnd(){this.dragging=!1}onSwipeStart(t){!this.isMobile||t.target.closest("button")||(this.swipeActive=!0,this.swipeStartY=t.clientY,this.root.classList.add("is-swiping"),t.preventDefault(),this.header.setPointerCapture(t.pointerId))}onSwipeMove(t){if(!this.isMobile||!this.swipeActive)return;t.preventDefault();const e=t.clientY-this.swipeStartY;if(e<=0){this.root.style.transform="";return}this.root.style.transform=`translateY(${Math.min(e,200)}px)`}onSwipeEnd(t){if(!this.isMobile||!this.swipeActive)return;const s=(this.root.style.transform||"").match(/translateY\(([-\d.]+)px\)/),n=s?Number(s[1]):0;this.swipeActive=!1,this.root.classList.remove("is-swiping"),this.root.style.transform="",t&&this.header.releasePointerCapture(t.pointerId),n>=90&&this.hide()}clear(){this.stopTyping(!0),this.messages=[],this.list.innerHTML="",this.statusLine.textContent="",this.sessionId=k(),this.persistSessionId(),this.persistMessages(),this.ensureWelcome()}loadSessionId(){try{const e=localStorage.getItem(this.sessionStorageKey);if(e&&e.trim())return e}catch{}const t=k();try{localStorage.setItem(this.sessionStorageKey,t)}catch{}return t}persistSessionId(){try{localStorage.setItem(this.sessionStorageKey,this.sessionId)}catch{}}loadProfile(){try{const t=localStorage.getItem(this.profileStorageKey);if(!t)return{};const e=JSON.parse(t);if(!e||typeof e!="object")return{};const s=typeof e.name=="string"?e.name.trim():"";return s?{name:s}:{}}catch{return{}}}persistProfile(){try{localStorage.setItem(this.profileStorageKey,JSON.stringify(this.profile))}catch{}}extractUserName(t){const s=t.trim().match(/(?:我叫|我的名字是|叫我)\s*([A-Za-z0-9_\-\u4e00-\u9fa5]{1,20})/);if(!s)return null;const n=(s[1]||"").trim();return!n||/^(什么|啥|名字|呢|啊|呀)$/u.test(n)?null:n||null}isAskUserName(t){const e=t.replace(/\s+/g,"");return/我叫什么|我的名字|记得我名字|你记得我是谁/.test(e)}restoreHistoryOrWelcome(){let t=!1;try{const e=localStorage.getItem(this.historyStorageKey);if(e){const s=JSON.parse(e);if(Array.isArray(s)){const n=s.map(i=>({role:(i==null?void 0:i.role)==="assistant"?"assistant":"user",text:typeof(i==null?void 0:i.text)=="string"?i.text.trim():""})).filter(i=>!!i.text);n.length>0&&(this.messages=n.slice(-g),this.renderMessages(),t=!0)}}}catch{}t||(this.ensureWelcome(),this.persistMessages())}renderMessages(){this.list.innerHTML="";for(const t of this.messages){const e=document.createElement("div");e.className=`fcchat-row ${t.role==="user"?"is-user":"is-assistant"}`;const s=document.createElement("div");s.className=`fcchat-bubble ${t.role==="user"?"bubble-user":"bubble-assistant"}`,s.textContent=this.normalizeText(t.text),e.appendChild(s),this.list.appendChild(e)}this.scrollToBottom()}persistMessages(){try{localStorage.setItem(this.historyStorageKey,JSON.stringify(this.messages.slice(-g)))}catch{}}ensureWelcome(){this.messages.length>0||this.addMessage("assistant","我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。")}setBusy(t,e=""){this.sendBtn.disabled=t,this.input.disabled=t,this.statusLine.textContent=e}normalizeText(t){return(t??"").replace(/^\s+/,"")}addMessage(t,e){const s={role:t,text:this.normalizeText(e)};this.messages.push(s),this.messages.length>g&&(this.messages=this.messages.slice(-g));const n=document.createElement("div");n.className=`fcchat-row ${t==="user"?"is-user":"is-assistant"}`;const i=document.createElement("div");i.className=`fcchat-bubble ${t==="user"?"bubble-user":"bubble-assistant"}`,i.textContent=s.text,n.appendChild(i),this.list.appendChild(n),this.scrollToBottom(),this.persistMessages()}addAssistantBubbleLoading(){const t=document.createElement("div");t.className="fcchat-row is-assistant",t.dataset.loading="1";const e=document.createElement("div");return e.className="fcchat-bubble bubble-assistant",e.innerHTML='<span class="fcchat-typing"><span></span><span></span><span></span></span>',t.appendChild(e),this.list.appendChild(t),this.scrollToBottom(),{row:t,bubble:e}}addAssistantBubbleEmpty(){const t=document.createElement("div");t.className="fcchat-row is-assistant";const e=document.createElement("div");return e.className="fcchat-bubble bubble-assistant",e.textContent="",t.appendChild(e),this.list.appendChild(t),this.scrollToBottom(),e}replaceLoadingWithEmpty(t){t.removeAttribute("data-loading");const e=t.querySelector(".fcchat-bubble");return e&&(e.innerHTML="",e.textContent=""),e}scrollToBottom(){this.list.scrollTop=this.list.scrollHeight}stopTyping(t){this.typingAbortToken++,this.typingTimer!=null&&(window.clearTimeout(this.typingTimer),this.typingTimer=null)}async typewriterRender(t,e){const s=++this.typingAbortToken,n=this.normalizeText(e),i=n.length;let o=1200;i<=120?o=900+Math.floor(Math.random()*400):i<=400?o=1800+Math.floor(Math.random()*800):o=3e3+Math.floor(Math.random()*1e3);let c=0;const h=performance.now();return await new Promise(m=>{const l=()=>{if(s!==this.typingAbortToken){t.textContent=n,this.scrollToBottom(),m();return}const p=performance.now()-h,d=i-c;if(p>=o||d<=0){t.textContent=n,this.scrollToBottom(),m();return}const y=c/Math.max(1,i);let f=1;const u=Math.random();y<.15?f=u<.75?1:2:y<.7?f=u<.35?2:u<.75?3:4:f=u<.5?2:3,f=Math.min(f,d);const x=n.slice(0,c+f);c+=f,t.textContent=x,this.scrollToBottom();let C=18+Math.floor(Math.random()*38);Math.random()<.06&&(C+=60+Math.floor(Math.random()*90)),this.typingTimer=window.setTimeout(l,C)};l()})}async onSend(){const t=this.input.value.trim();if(!t)return;this.stopTyping(!0),this.input.value="",this.addMessage("user",t);const e=this.extractUserName(t);if(e&&(this.profile.name=e,this.persistProfile()),this.isAskUserName(t)&&this.profile.name){const i=`你叫${this.profile.name}。我已经记住了。`;this.addMessage("assistant",i),this.setBusy(!1,""),this.scrollToBottom();return}const{row:s,bubble:n}=this.addAssistantBubbleLoading();this.setBusy(!0,"输出中...");try{const i=this.messages.slice(-g),o=await this.client.ask(t,this.context,i,this.sessionId),c=this.replaceLoadingWithEmpty(s);this.setBusy(!0,"输出中..."),await this.typewriterRender(c,o.answer),this.messages.push({role:"assistant",text:this.normalizeText(o.answer)}),this.messages.length>g&&(this.messages=this.messages.slice(-g)),this.persistMessages(),this.setBusy(!1,"")}catch(i){const o=s.querySelector(".fcchat-bubble");if(o){s.removeAttribute("data-loading");const h=`请求失败：${typeof(i==null?void 0:i.message)=="string"?i.message:String(i)}`;o.textContent=h,this.messages.push({role:"assistant",text:h}),this.messages.length>g&&(this.messages=this.messages.slice(-g)),this.persistMessages()}this.setBusy(!1,"")}this.scrollToBottom()}injectStyles(){if(document.getElementById("fcchat-style"))return;const t=document.createElement("style");t.id="fcchat-style",t.textContent=`
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
    `,document.head.appendChild(t)}getElement(){return this.root}remove(){this.destroy()}}const q=Object.freeze(Object.defineProperty({__proto__:null,FcChatPanel:A},Symbol.toStringTag,{value:"Module"}));function D(r){try{return JSON.parse(r)}catch{return null}}function w(r){return typeof r=="string"?r:""}function $(r){return r.endsWith("/")?r:r+"/"}function X(r,t,e=[],s=""){const n=e.map(o=>({role:o.role==="assistant"?"assistant":"user",content:typeof o.text=="string"?o.text.trim():"",text:typeof o.text=="string"?o.text.trim():""})).filter(o=>!!o.content),i={question:r};return s&&(i.sessionId=s,i.conversationId=s),n.length>0&&(i.history=n,i.messages=n,i.chatHistory=n.map(o=>({role:o.role,text:o.text}))),t&&typeof t=="object"&&(i.context={museumId:t.museumId||"",museumName:t.museumName||"",sceneId:t.sceneId||"",sceneTitle:t.sceneTitle||"",url:t.url||"",sessionId:s||"",historyLength:n.length}),i}function R(r){if(r&&typeof r=="object"&&typeof r.answer=="string"&&r.answer.trim())return{ok:!0,answer:r.answer.trim(),model:w(r.model)||void 0};if(r&&typeof r=="object"&&("code"in r||"msg"in r||"data"in r)){const t=typeof r.code=="number"?r.code:void 0,e=w(r.msg)||"",s=r.data;if((t===0||t===void 0)&&s&&typeof s=="object"){const n=typeof s.answer=="string"?s.answer.trim():"";if(n)return{ok:!0,answer:n,model:w(s.model)||void 0}}if(t===40101||e.toLowerCase()==="unauthorized")return{ok:!1,code:40101,msg:"unauthorized"};if(t!==void 0&&t!==0)return{ok:!1,code:t,msg:e||`error code=${t}`};if(e&&e.toLowerCase()!=="ok")return{ok:!1,code:t,msg:e}}return{ok:!1,msg:"bad response"}}class F{constructor(t){a(this,"endpoint");a(this,"authToken");a(this,"timeoutMs");if(!(t!=null&&t.endpoint))throw new Error("fcChat endpoint is empty");this.endpoint=$(t.endpoint),this.authToken=t.authToken||"",this.timeoutMs=typeof t.timeoutMs=="number"&&t.timeoutMs>0?t.timeoutMs:15e3}async ask(t,e,s=[],n=""){const i=(t||"").trim();if(!i)throw new Error("empty question");const o=new AbortController,c=setTimeout(()=>o.abort(),this.timeoutMs);try{const h={"Content-Type":"application/json"};this.authToken&&(h.Authorization=this.authToken.startsWith("Bearer ")?this.authToken:`Bearer ${this.authToken}`);const m=await fetch(this.endpoint,{method:"POST",headers:h,body:JSON.stringify(X(i,e,s,n)),signal:o.signal}),l=await m.text(),p=D(l);if(!p){const f=l?`bad response: ${l}`:`http ${m.status}`;throw new Error(f)}const d=R(p);if(d.ok)return{answer:d.answer,model:d.model};if(d.code===40101){const f=new Error("unauthorized (code=40101)");throw f.code=40101,f}const y=d.code?`${d.msg} (code=${d.code})`:d.msg;throw new Error(y||"request failed")}catch(h){throw(h==null?void 0:h.name)==="AbortError"?new Error(`timeout (${this.timeoutMs}ms)`):h}finally{clearTimeout(c)}}}const J=Object.freeze(Object.defineProperty({__proto__:null,FcChatClient:F},Symbol.toStringTag,{value:"Module"}));class H{constructor(t={}){a(this,"element");a(this,"isOpen",!1);a(this,"inputEl");a(this,"options");a(this,"handleKeyDownBound");this.options=t,this.handleKeyDownBound=u=>this.handleKeyDown(u),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const e=document.createElement("div");e.className="vr-modal-mask";const s=document.createElement("div");s.className="vr-modal-card vr-login-card";const n=document.createElement("div");n.className="vr-login-title-row";const i=document.createElement("div");i.className="vr-modal-title",i.textContent="登录";const o=document.createElement("button");o.className="vr-btn vr-login-close",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.close()),n.appendChild(i),n.appendChild(o);const c=document.createElement("div");c.className="vr-modal-desc",c.textContent="输入用户名即可参与互动";const h=document.createElement("div");h.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",u=>{u.key==="Enter"&&this.handleConfirm()});const m=document.createElement("div");m.className="vr-modal-actions vr-login-actions";const l=document.createElement("button");l.className="vr-btn vr-login-btn",l.textContent="取消",l.addEventListener("click",()=>this.close());const p=document.createElement("button");p.className="vr-btn vr-login-btn danger",p.textContent="退出登录",p.addEventListener("click",()=>{var u,x;B(),(x=(u=this.options).onLogout)==null||x.call(u),this.close()});const d=document.createElement("button");d.className="vr-btn vr-login-btn primary",d.textContent="确认",d.addEventListener("click",()=>this.handleConfirm()),m.appendChild(l),m.appendChild(p),m.appendChild(d),h.appendChild(this.inputEl),s.appendChild(n),s.appendChild(c),s.appendChild(h),s.appendChild(m),e.addEventListener("click",()=>this.close()),s.addEventListener("click",u=>u.stopPropagation()),this.element.appendChild(e),this.element.appendChild(s);const y=()=>{const u=E();p.style.display=u?"inline-flex":"none"},f=this.open.bind(this);this.open=()=>{y(),f()}}handleKeyDown(t){this.isOpen&&t.key==="Escape"&&this.close()}handleConfirm(){var s,n;const t=(this.inputEl.value||"").trim();if(t.length<2||t.length>12){b("用户名需 2-12 字");return}const e=N(t);(n=(s=this.options).onLogin)==null||n.call(s,e),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const t=E();this.inputEl.value=(t==null?void 0:t.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class K{constructor(t){a(this,"element");a(this,"sceneId");a(this,"sceneName");a(this,"onClose");a(this,"subtitleEl");a(this,"loginHintBtn");a(this,"userLineEl");a(this,"userNameEl");a(this,"likeBtn");a(this,"likeCountEl");a(this,"commentsEl");a(this,"inputEl");a(this,"sendBtn");a(this,"loginModal");a(this,"highlightNextFirstComment",!1);this.sceneId=t.sceneId,this.sceneName=t.sceneName,this.onClose=t.onClose,this.element=document.createElement("div"),this.element.className="vr-community";const e=document.createElement("div");e.className="vr-community-header";const s=document.createElement("div");s.className="vr-community-title",s.textContent="社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle";const n=document.createElement("button");n.className="vr-community-close",n.innerHTML="×",n.setAttribute("aria-label","关闭"),n.style.pointerEvents="auto",n.style.zIndex="10",n.addEventListener("click",l=>{var p;l.preventDefault(),l.stopPropagation(),l.stopImmediatePropagation(),(p=this.onClose)==null||p.call(this),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"community"}}))}),e.appendChild(s),e.appendChild(this.subtitleEl),e.appendChild(n);const i=document.createElement("div");i.className="vr-community-content";const o=document.createElement("div");o.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可参与互动",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const c=document.createElement("button");c.className="vr-btn vr-community-logout",c.textContent="退出登录",c.addEventListener("click",()=>{B(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(c),o.appendChild(this.loginHintBtn),o.appendChild(this.userLineEl);const h=document.createElement("div");h.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="点赞",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const l=M(this.sceneId);if(!l.ok){b("请先登录"),this.loginModal.open();return}this.renderLikes(l.count,l.action==="liked"),b(l.action==="liked"?"已点赞":"已取消点赞")}),h.appendChild(this.likeBtn),h.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const m=document.createElement("div");m.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",l=>{l.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),m.appendChild(this.inputEl),m.appendChild(this.sendBtn),i.appendChild(o),i.appendChild(h),i.appendChild(this.commentsEl),i.appendChild(m),this.element.appendChild(e),this.element.appendChild(i),this.loginModal=new H({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(t.sceneId,t.sceneName)}setScene(t,e){this.sceneId=t,this.sceneName=e,this.subtitleEl.textContent=this.sceneName?this.sceneName:t,this.refresh()}toastByReason(t){t==="not_logged_in"?b("请先登录"):t==="banned"?b("内容包含敏感词，已拦截"):t==="cooldown"?b("评论过于频繁，请稍后再试"):t==="EMPTY"&&b("内容不能为空")}formatRelativeTime(t){const e=Date.now()-t;if(e<6e4)return"刚刚";const s=Math.floor(e/6e4);if(s<60)return`${s} 分钟前`;const n=Math.floor(s/60);return n<24?`${n} 小时前`:new Date(t).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(t,e){this.likeCountEl.textContent=String(t),this.likeBtn.classList.toggle("liked",e)}renderComments(t){this.commentsEl.innerHTML="";const e=document.createElement("div");if(e.className="vr-community-tip",e.textContent="本场景最近 50 条留言",this.commentsEl.appendChild(e),!t.length){const n=document.createElement("div");n.className="vr-community-empty",n.textContent="此场景暂无留言",this.commentsEl.appendChild(n);return}let s=null;for(const n of t){const i=document.createElement("div");i.className="vr-community-comment";const o=document.createElement("div");o.className="vr-community-comment-meta",o.textContent=`${n.userName} · ${this.formatRelativeTime(n.ts)}`;const c=document.createElement("div");c.className="vr-community-comment-text",c.textContent=n.text,i.appendChild(o),i.appendChild(c),this.commentsEl.appendChild(i),s||(s=i)}s&&this.highlightNextFirstComment&&(s.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{s==null||s.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const e=(this.inputEl.value||"").trim();if(!e){this.toastByReason("EMPTY");return}const s=I(this.sceneId,e);if(!s.ok){s.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(s.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,b("评论已发布")}refresh(){const t=E();this.loginHintBtn.style.display=t?"none":"inline-flex",this.userLineEl.style.display=t?"flex":"none",this.userNameEl.textContent=t?t.name:"";const e=L(this.sceneId,(t==null?void 0:t.id)||"anon").count,s=t?L(this.sceneId,t.id).liked:!1;this.renderLikes(e,s),this.renderComments(_(this.sceneId));const n=!t;this.inputEl.disabled=n,this.sendBtn.classList.toggle("disabled",n)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}const j=Object.freeze(Object.defineProperty({__proto__:null,CommunityPanel:K},Symbol.toStringTag,{value:"Module"}));export{j as C,q as F,J as f};
