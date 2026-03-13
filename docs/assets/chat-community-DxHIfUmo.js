var z=Object.defineProperty;var _=(o,t,e)=>t in o?z(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var a=(o,t,e)=>_(o,typeof t!="symbol"?t+"":t,e);import{l as N,a as P,g as T,t as A,b as R,c as L,d as O}from"./store-B83L8bDT.js";import{s as x}from"./index-BxZQaOqS.js";const y=40,E=120,I="fcchat_history_v2",U="fcchat_session_v1",D="fcchat_user_memory_v1";function C(o,t){const e=(t||"global").trim()||"global";return`${o}:${e}`}function B(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`fcchat_${Date.now()}_${Math.random().toString(36).slice(2,10)}`}class H{constructor(t,e){a(this,"client");a(this,"context");a(this,"root");a(this,"header");a(this,"body");a(this,"list");a(this,"input");a(this,"sendBtn");a(this,"clearBtn");a(this,"recallBtn");a(this,"closeBtn");a(this,"statusLine");a(this,"quickActions");a(this,"recallPanel");a(this,"dragging",!1);a(this,"dragOffsetX",0);a(this,"dragOffsetY",0);a(this,"isMobile",!1);a(this,"swipeStartY",0);a(this,"swipeActive",!1);a(this,"messages",[]);a(this,"isOpen",!1);a(this,"fabButton",null);a(this,"historyStorageKey");a(this,"sessionStorageKey");a(this,"userMemoryStorageKey");a(this,"sessionId");a(this,"userMemory",[]);a(this,"recallOpen",!1);a(this,"snapTimer",null);a(this,"isDragging",!1);a(this,"startX",0);a(this,"startY",0);a(this,"startLeft",0);a(this,"startTop",0);a(this,"lastLeft",0);a(this,"lastTop",0);a(this,"moved",!1);a(this,"hasUserPlaced",!1);a(this,"typingTimer",null);a(this,"typingAbortToken",0);this.client=t,this.context=e,this.historyStorageKey=C(I,e.museumId),this.sessionStorageKey=C(U,e.museumId),this.userMemoryStorageKey=C(D,e.museumId),this.sessionId=this.loadSessionId(),this.userMemory=this.loadUserMemory(),this.mount(),this.injectStyles(),this.detectMobile(),this.restoreHistoryOrWelcome()}destroy(){var t,e;this.stopTyping(!0),this.snapTimer&&(window.clearTimeout(this.snapTimer),this.snapTimer=null),(t=this.root)==null||t.remove(),(e=this.fabButton)==null||e.remove(),this.fabButton=null}detectMobile(){var s,n;const t=((s=window.matchMedia)==null?void 0:s.call(window,"(max-width: 768px)").matches)??!1,e=((n=window.matchMedia)==null?void 0:n.call(window,"(pointer: coarse)").matches)??!1;this.isMobile=t||e,this.root.dataset.mobile=this.isMobile?"1":"0"}mount(){this.root=document.createElement("div"),this.root.className="fcchat-root",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-label","三馆学伴"),this.header=document.createElement("div"),this.header.className="fcchat-header";const t=document.createElement("div");t.className="fcchat-title",t.textContent="三馆学伴";const e=document.createElement("div");e.className="fcchat-header-right",this.clearBtn=document.createElement("button"),this.clearBtn.className="fcchat-btn fcchat-btn-ghost",this.clearBtn.type="button",this.clearBtn.textContent="清空",this.clearBtn.addEventListener("click",()=>this.clear()),this.recallBtn=document.createElement("button"),this.recallBtn.className="fcchat-btn fcchat-btn-ghost",this.recallBtn.type="button",this.recallBtn.textContent="回顾",this.recallBtn.setAttribute("aria-label","查看会话回顾"),this.recallBtn.setAttribute("aria-pressed","false"),this.recallBtn.addEventListener("click",()=>this.toggleRecallPanel()),this.closeBtn=document.createElement("button"),this.closeBtn.className="fcchat-btn fcchat-btn-ghost fcchat-close",this.closeBtn.type="button",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.textContent="×",this.closeBtn.addEventListener("click",()=>this.toggle()),e.appendChild(this.clearBtn),e.appendChild(this.recallBtn),e.appendChild(this.closeBtn);const s=document.createElement("div");s.className="fcchat-header-row",s.appendChild(t),s.appendChild(e),this.header.appendChild(s);const n=document.createElement("div");n.className="fcchat-disclaimer",n.textContent="提示：AI 可能会出错，内容仅供参考；请以现场展陈/讲解为准。",this.header.appendChild(n),this.quickActions=document.createElement("div"),this.quickActions.className="fcchat-quick-actions",[{label:"回顾上文",prompt:"请先简要回顾我们刚才的对话重点，再继续回答。"},{label:"我刚才说了什么？",prompt:"我刚才说了什么？"},{label:"你刚才说了什么？",prompt:"你刚才说了什么？"}].forEach(h=>{const m=document.createElement("button");m.type="button",m.className="fcchat-chip",m.textContent=h.label,m.addEventListener("click",()=>{this.input.value=h.prompt,this.isOpen||this.show(),this.isMobile||this.input.focus()}),this.quickActions.appendChild(m)}),this.body=document.createElement("div"),this.body.className="fcchat-body",this.recallPanel=document.createElement("div"),this.recallPanel.className="fcchat-recall-panel",this.recallPanel.hidden=!0,this.body.appendChild(this.recallPanel),this.list=document.createElement("div"),this.list.className="fcchat-list",this.body.appendChild(this.list),this.statusLine=document.createElement("div"),this.statusLine.className="fcchat-status",this.statusLine.textContent="",this.body.appendChild(this.statusLine);const r=document.createElement("div");r.className="fcchat-inputbar",this.input=document.createElement("input"),this.input.className="fcchat-input",this.input.type="text",this.input.id="fcchat-message-input",this.input.name="message",this.input.placeholder="输入问题，回车发送",this.input.addEventListener("keydown",h=>{h.key==="Enter"&&this.onSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="fcchat-btn fcchat-btn-primary",this.sendBtn.type="button",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.onSend()),r.appendChild(this.input),r.appendChild(this.sendBtn);const c=document.createElement("div");c.className="fcchat-composer",c.appendChild(this.quickActions),c.appendChild(r),this.root.appendChild(this.header),this.root.appendChild(this.body),this.root.appendChild(c),document.body.appendChild(this.root),this.root.style.display="none",this.root.style.right="18px",this.root.style.bottom="18px",this.ensureToggleButton(),this.header.addEventListener("mousedown",h=>this.onDragStart(h)),window.addEventListener("mousemove",h=>this.onDragMove(h)),window.addEventListener("mouseup",()=>this.onDragEnd()),this.header.addEventListener("pointerdown",h=>this.onSwipeStart(h),{passive:!1}),this.header.addEventListener("pointermove",h=>this.onSwipeMove(h),{passive:!1}),this.header.addEventListener("pointerup",h=>this.onSwipeEnd(h)),this.header.addEventListener("pointercancel",h=>this.onSwipeEnd(h)),window.addEventListener("resize",()=>this.detectMobile())}hide(){this.isOpen&&(this.isOpen=!1,this.stopTyping(!0),this.toggleRecallPanel(!1),this.root.style.display="none",this.root.classList.remove("fcchat-open"),this.fabButton&&this.fabButton.classList.add("fcchat-docked"),document.body.classList.remove("fcchat-open"),this.updateOverlayState())}show(){this.isOpen||(this.isOpen=!0,this.detectMobile(),this.root.style.display="flex",this.root.classList.add("fcchat-open"),this.fabButton&&this.fabButton.classList.remove("fcchat-docked"),document.body.classList.add("fcchat-open"),this.scrollToBottom(),this.isMobile||this.input.focus(),this.updateOverlayState())}toggle(){this.isOpen?this.hide():this.show()}updateOverlayState(){!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||this.root&&this.root.style.display==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}getSafeBounds(){const t=window.innerWidth,e=window.innerHeight,s=this.fabButton;if(!s)return{minLeft:8,maxLeft:t-52,minTop:12,maxTop:e-64};const n=s.getBoundingClientRect(),i=n.width,r=n.height,c=12+(this.isMobile?56:12),h=12+(this.isMobile?96:12);return{minLeft:8,maxLeft:t-i-8,minTop:c,maxTop:e-r-h}}clampPos(t,e){const s=this.getSafeBounds();return{left:Math.max(s.minLeft,Math.min(t,s.maxLeft)),top:Math.max(s.minTop,Math.min(e,s.maxTop))}}snapToEdge(){const t=this.fabButton;if(!t)return;const e=this.getSafeBounds(),s=t.getBoundingClientRect(),n=s.left,i=s.top,r=n-e.minLeft,c=e.maxLeft-n,h=i-e.minTop,m=e.maxTop-i,p=Math.min(r,c,h,m);let f=n,u=i;p===r?f=e.minLeft:p===c?f=e.maxLeft:p===h?u=e.minTop:p===m&&(u=e.maxTop),t.style.left=`${f}px`,t.style.top=`${u}px`,t.style.right="auto",t.style.bottom="auto",localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:f,top:u})),setTimeout(()=>{t.classList.remove("fcchat-snapping")},220)}ensureToggleButton(){if(this.fabButton)return;const t=new URLSearchParams(location.search);if(t.get("reset_ui")==="1"){localStorage.removeItem("vr_fcchat_dock_state"),t.delete("reset_ui");const n=location.pathname+(t.toString()?"?"+t.toString():"")+location.hash;history.replaceState({},"",n)}const e=document.createElement("button");e.id="fcchat-fab",e.className="fcchat-fab fcchat-docked",e.type="button",e.setAttribute("aria-label","打开三馆学伴"),e.innerHTML=`<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,e.addEventListener("pointerdown",n=>this.onFabPointerDown(n),{passive:!1}),e.addEventListener("pointermove",n=>this.onFabPointerMove(n),{passive:!1}),e.addEventListener("pointerup",n=>this.onFabPointerUp(n),{passive:!1}),e.addEventListener("pointercancel",n=>this.onFabPointerUp(n),{passive:!1}),this.fabButton=e,document.body.appendChild(e);const s=localStorage.getItem("fcchat_fab_pos_v1");if(s)try{const n=JSON.parse(s);e.style.left=`${n.left}px`,e.style.top=`${n.top}px`,e.style.right="auto",e.style.bottom="auto",e.classList.remove("fcchat-docked"),this.hasUserPlaced=!0}catch{}!this.hasUserPlaced&&!this.isOpen&&e.classList.add("fcchat-docked"),this.maybeShowFirstVisitHint()}maybeShowFirstVisitHint(){const t="fcchat_first_hint_shown";if(sessionStorage.getItem(t))return;sessionStorage.setItem(t,"1");const e=this.fabButton;if(!e)return;const s=document.createElement("div");s.className="fcchat-first-hint",s.textContent="我是三馆学伴，为你解疑答惑😉",document.body.appendChild(s);const n=()=>{const i=e.getBoundingClientRect();s.style.left=`${i.left-8}px`,s.style.top=`${i.top+i.height/2}px`};n(),window.addEventListener("resize",n),setTimeout(()=>{s.classList.add("is-hide"),setTimeout(()=>{window.removeEventListener("resize",n),s.remove()},300)},1e4)}onFabPointerDown(t){const e=this.fabButton;if(!e)return;t.preventDefault(),this.isDragging=!1,this.moved=!1,this.startX=t.clientX,this.startY=t.clientY;const s=e.getBoundingClientRect(),n=parseFloat(e.style.left||""),i=parseFloat(e.style.top||"");this.startLeft=Number.isFinite(n)?n:s.left,this.startTop=Number.isFinite(i)?i:s.top;try{e.setPointerCapture(t.pointerId)}catch{}e.classList.remove("fcchat-docked")}onFabPointerMove(t){const e=this.fabButton;if(!e)return;t.preventDefault();const s=t.clientX-this.startX,n=t.clientY-this.startY;if(!this.isDragging){if(Math.abs(s)+Math.abs(n)<4)return;this.isDragging=!0,e.classList.add("fcchat-dragging")}const i=this.clampPos(this.startLeft+s,this.startTop+n);this.lastLeft=i.left,this.lastTop=i.top,e.style.left=`${this.lastLeft}px`,e.style.top=`${this.lastTop}px`,e.style.right="auto",e.style.bottom="auto",this.hasUserPlaced=!0}onFabPointerUp(t){const e=this.fabButton;if(e){t.preventDefault();try{e.releasePointerCapture(t.pointerId)}catch{}if(!this.isDragging){this.toggle();return}this.isDragging=!1,e.classList.remove("fcchat-dragging");try{localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:this.lastLeft,top:this.lastTop}))}catch{}this.snapTimer&&window.clearTimeout(this.snapTimer),e.classList.add("fcchat-snapping"),this.snapTimer=window.setTimeout(()=>{this.snapToEdge(),this.snapTimer=null},5e3)}}onDragStart(t){if(this.isMobile||t.target.closest("button"))return;this.dragging=!0;const s=this.root.getBoundingClientRect();this.dragOffsetX=t.clientX-s.left,this.dragOffsetY=t.clientY-s.top,this.root.style.right="auto",this.root.style.bottom="auto",this.root.style.left=s.left+"px",this.root.style.top=s.top+"px"}onDragMove(t){if(!this.dragging||this.isMobile)return;const e=window.innerWidth,s=window.innerHeight,n=this.root.getBoundingClientRect();let i=t.clientX-this.dragOffsetX,r=t.clientY-this.dragOffsetY;i=Math.max(8,Math.min(i,e-n.width-8)),r=Math.max(8,Math.min(r,s-n.height-8)),this.root.style.left=i+"px",this.root.style.top=r+"px"}onDragEnd(){this.dragging=!1}onSwipeStart(t){!this.isMobile||t.target.closest("button")||(this.swipeActive=!0,this.swipeStartY=t.clientY,this.root.classList.add("is-swiping"),t.preventDefault(),this.header.setPointerCapture(t.pointerId))}onSwipeMove(t){if(!this.isMobile||!this.swipeActive)return;t.preventDefault();const e=t.clientY-this.swipeStartY;if(e<=0){this.root.style.transform="";return}this.root.style.transform=`translateY(${Math.min(e,200)}px)`}onSwipeEnd(t){if(!this.isMobile||!this.swipeActive)return;const s=(this.root.style.transform||"").match(/translateY\(([-\d.]+)px\)/),n=s?Number(s[1]):0;this.swipeActive=!1,this.root.classList.remove("is-swiping"),this.root.style.transform="",t&&this.header.releasePointerCapture(t.pointerId),n>=90&&this.hide()}clear(){this.stopTyping(!0),this.messages=[],this.userMemory=[],this.list.innerHTML="",this.statusLine.textContent="",this.sessionId=B(),this.persistSessionId(),this.persistMessages(),this.persistUserMemory(),this.ensureWelcome(),this.renderRecallPanel()}loadSessionId(){try{const e=localStorage.getItem(this.sessionStorageKey);if(e&&e.trim())return e}catch{}const t=B();try{localStorage.setItem(this.sessionStorageKey,t)}catch{}return t}persistSessionId(){try{localStorage.setItem(this.sessionStorageKey,this.sessionId)}catch{}}loadUserMemory(){try{const t=localStorage.getItem(this.userMemoryStorageKey);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.map(s=>typeof s=="string"?this.normalizeText(s).trim():"").filter(s=>!!s).slice(-E):[]}catch{return[]}}persistUserMemory(){try{localStorage.setItem(this.userMemoryStorageKey,JSON.stringify(this.userMemory.slice(-E)))}catch{}}rememberUserMessage(t){const e=this.normalizeText(t).trim();e&&this.userMemory[this.userMemory.length-1]!==e&&(this.userMemory.push(e),this.userMemory.length>E&&(this.userMemory=this.userMemory.slice(-E)),this.persistUserMemory())}buildRequestContext(t){const e=this.normalizeText(t||"").trim();let s=this.userMemory.slice();e&&s[s.length-1]===e&&(s=s.slice(0,-1));const n=this.messages.slice(-8).map(c=>({role:c.role,text:this.normalizeText(c.text).trim()})).filter(c=>!!c.text),i=[...this.messages].reverse().find(c=>c.role==="user"&&!!this.normalizeText(c.text).trim()&&this.normalizeText(c.text).trim()!==e),r=[...this.messages].reverse().find(c=>c.role==="assistant"&&!!this.normalizeText(c.text).trim());return{...this.context,userMemory:s.slice(-30),lastUserUtterance:i?this.normalizeText(i.text).trim():"",lastAssistantReply:r?this.normalizeText(r.text).trim():"",recentTurns:n}}restoreHistoryOrWelcome(){let t=!1;try{const e=localStorage.getItem(this.historyStorageKey);if(e){const s=JSON.parse(e);if(Array.isArray(s)){const n=s.map(i=>({role:(i==null?void 0:i.role)==="assistant"?"assistant":"user",text:typeof(i==null?void 0:i.text)=="string"?i.text.trim():""})).filter(i=>!!i.text);n.length>0&&(this.messages=n.slice(-y),this.renderMessages(),t=!0)}}}catch{}t||(this.ensureWelcome(),this.persistMessages()),this.userMemory.length===0&&this.messages.length>0&&(this.userMemory=this.messages.filter(e=>e.role==="user").map(e=>this.normalizeText(e.text).trim()).filter(e=>!!e).slice(-E),this.persistUserMemory()),this.renderRecallPanel()}renderMessages(){this.list.innerHTML="";for(const t of this.messages){const e=document.createElement("div");e.className=`fcchat-row ${t.role==="user"?"is-user":"is-assistant"}`;const s=document.createElement("div");s.className=`fcchat-bubble ${t.role==="user"?"bubble-user":"bubble-assistant"}`,s.textContent=this.normalizeText(t.text),e.appendChild(s),this.list.appendChild(e)}this.scrollToBottom(),this.renderRecallPanel()}persistMessages(){try{localStorage.setItem(this.historyStorageKey,JSON.stringify(this.messages.slice(-y)))}catch{}}ensureWelcome(){this.messages.length>0||this.addMessage("assistant","我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。")}setBusy(t,e=""){this.sendBtn.disabled=t,this.input.disabled=t,this.statusLine.textContent=e}normalizeText(t){return(t??"").replace(/^\s+/,"")}addMessage(t,e){const s={role:t,text:this.normalizeText(e)};this.messages.push(s),this.messages.length>y&&(this.messages=this.messages.slice(-y));const n=document.createElement("div");n.className=`fcchat-row ${t==="user"?"is-user":"is-assistant"}`;const i=document.createElement("div");i.className=`fcchat-bubble ${t==="user"?"bubble-user":"bubble-assistant"}`,i.textContent=s.text,n.appendChild(i),this.list.appendChild(n),this.scrollToBottom(),this.persistMessages(),this.renderRecallPanel()}toggleRecallPanel(t){const e=typeof t=="boolean"?t:!this.recallOpen;this.recallOpen=e,this.body.classList.toggle("is-recall-open",e),this.recallPanel.hidden=!e,this.list.hidden=e,this.statusLine.hidden=e,this.recallBtn.setAttribute("aria-pressed",e?"true":"false"),this.recallBtn.classList.toggle("is-active",e),e?this.renderRecallPanel():this.scrollToBottom()}renderRecallPanel(){if(!this.recallPanel)return;this.recallPanel.innerHTML="";const t=this.messages.map(e=>({role:e.role,text:this.normalizeText(e.text).trim()})).filter(e=>!!e.text).slice(-12).reverse();if(t.length===0){const e=document.createElement("div");e.className="fcchat-recall-empty",e.textContent="暂无可回顾内容，先聊一句吧。",this.recallPanel.appendChild(e);return}t.forEach(e=>{const s=document.createElement("button");s.type="button",s.className=`fcchat-recall-card ${e.role==="user"?"is-user":"is-assistant"}`;const n=document.createElement("span");n.className="fcchat-recall-role",n.textContent=e.role==="user"?"你":"学伴";const i=document.createElement("span");i.className="fcchat-recall-text",i.textContent=e.text.length>96?`${e.text.slice(0,96)}...`:e.text,s.appendChild(n),s.appendChild(i),s.addEventListener("click",()=>{this.input.value=e.text,this.isOpen||this.show(),this.isMobile||this.input.focus()}),this.recallPanel.appendChild(s)})}addAssistantBubbleLoading(){const t=document.createElement("div");t.className="fcchat-row is-assistant",t.dataset.loading="1";const e=document.createElement("div");return e.className="fcchat-bubble bubble-assistant",e.innerHTML='<span class="fcchat-typing"><span></span><span></span><span></span></span>',t.appendChild(e),this.list.appendChild(t),this.scrollToBottom(),{row:t,bubble:e}}addAssistantBubbleEmpty(){const t=document.createElement("div");t.className="fcchat-row is-assistant";const e=document.createElement("div");return e.className="fcchat-bubble bubble-assistant",e.textContent="",t.appendChild(e),this.list.appendChild(t),this.scrollToBottom(),e}replaceLoadingWithEmpty(t){t.removeAttribute("data-loading");const e=t.querySelector(".fcchat-bubble");return e&&(e.innerHTML="",e.textContent=""),e}scrollToBottom(){this.list.scrollTop=this.list.scrollHeight}stopTyping(t){this.typingAbortToken++,this.typingTimer!=null&&(window.clearTimeout(this.typingTimer),this.typingTimer=null)}async typewriterRender(t,e){const s=++this.typingAbortToken,n=this.normalizeText(e),i=n.length;let r=1200;i<=120?r=900+Math.floor(Math.random()*400):i<=400?r=1800+Math.floor(Math.random()*800):r=3e3+Math.floor(Math.random()*1e3);let c=0;const h=performance.now();return await new Promise(m=>{const p=()=>{if(s!==this.typingAbortToken){t.textContent=n,this.scrollToBottom(),m();return}const f=performance.now()-h,u=i-c;if(f>=r||u<=0){t.textContent=n,this.scrollToBottom(),m();return}const g=c/Math.max(1,i);let l=1;const d=Math.random();g<.15?l=d<.75?1:2:g<.7?l=d<.35?2:d<.75?3:4:l=d<.5?2:3,l=Math.min(l,u);const b=n.slice(0,c+l);c+=l,t.textContent=b,this.scrollToBottom();let M=18+Math.floor(Math.random()*38);Math.random()<.06&&(M+=60+Math.floor(Math.random()*90)),this.typingTimer=window.setTimeout(p,M)};p()})}async onSend(){const t=this.input.value.trim();if(!t)return;this.recallOpen&&this.toggleRecallPanel(!1),this.stopTyping(!0),this.input.value="",this.addMessage("user",t);const{row:e}=this.addAssistantBubbleLoading();this.setBusy(!0,"输出中...");try{const s=this.messages.slice(-y),n=this.buildRequestContext(t);this.rememberUserMessage(t);const i=await this.client.ask(t,n,s,this.sessionId),r=this.replaceLoadingWithEmpty(e);this.setBusy(!0,"输出中..."),await this.typewriterRender(r,i.answer),this.messages.push({role:"assistant",text:this.normalizeText(i.answer)}),this.messages.length>y&&(this.messages=this.messages.slice(-y)),this.persistMessages(),this.renderRecallPanel(),this.setBusy(!1,"")}catch(s){const n=e.querySelector(".fcchat-bubble");if(n){e.removeAttribute("data-loading");const r=`请求失败：${typeof(s==null?void 0:s.message)=="string"?s.message:String(s)}`;n.textContent=r,this.messages.push({role:"assistant",text:r}),this.messages.length>y&&(this.messages=this.messages.slice(-y)),this.persistMessages(),this.renderRecallPanel()}this.setBusy(!1,"")}this.scrollToBottom()}injectStyles(){if(document.getElementById("fcchat-style"))return;const t=document.createElement("style");t.id="fcchat-style",t.textContent=`
      .fcchat-root{
        --fcchat-paper: #f7f3e8;
        --fcchat-paper-soft: #fbf8f1;
        --fcchat-ink: #1f2a37;
        --fcchat-ink-soft: #415164;
        --fcchat-border: rgba(77, 56, 34, 0.18);
        --fcchat-accent: #2f5fae;
        --fcchat-accent-strong: #1f4f9d;
        --fcchat-assistant: #e8edf4;
        --fcchat-assistant-border: rgba(31, 79, 157, 0.16);
        --fcchat-chip-bg: rgba(45, 84, 140, 0.08);
        --fcchat-chip-border: rgba(45, 84, 140, 0.2);
        --fcchat-shadow: 0 18px 44px rgba(26, 36, 56, 0.26);
        position: fixed;
        z-index: 99999;
        width: 420px;
        height: 560px;
        display: flex;
        flex-direction: column;
        border-radius: 18px;
        background:
          radial-gradient(120% 100% at 0% 0%, rgba(255, 255, 255, 0.86) 0%, transparent 42%),
          linear-gradient(145deg, var(--fcchat-paper-soft) 0%, var(--fcchat-paper) 100%);
        box-shadow: var(--fcchat-shadow);
        border: 1px solid var(--fcchat-border);
        overflow: hidden;
        resize: both;
        min-width: 320px;
        min-height: 360px;
        transform: none;
        opacity: 0;
        animation: fcchat-panel-in 360ms cubic-bezier(.2,.8,.2,1) forwards;
        font-family: var(--vr-font-chat-body, var(--vr-font-ui));
      }
      .fcchat-root.fcchat-open{
        opacity: 1;
      }
      @keyframes fcchat-panel-in{
        from{ opacity: 0; transform: translate3d(0, 10px, 0) scale(0.98); }
        to{ opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }

      .fcchat-header{
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content:center;
        padding: 12px 14px;
        border-bottom: 1px solid var(--fcchat-border);
        background:
          linear-gradient(160deg, rgba(255,255,255,0.82) 0%, rgba(238,230,214,0.74) 100%);
        cursor: move;
        user-select: none;
      }
      .fcchat-header-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
      }
      .fcchat-title{
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0.06em;
        color: var(--fcchat-ink);
        font-family: var(--vr-font-chat-title, var(--vr-font-ui));
      }
      .fcchat-header-right{
        display:flex;
        align-items:center;
        gap: 8px;
      }
      .fcchat-disclaimer{
        margin-top: 6px;
        font-size: 12px;
        line-height: 1.45;
        color: var(--fcchat-ink-soft);
        opacity: 0.82;
      }

      .fcchat-composer{
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 12px 12px;
        border-top: 1px solid var(--fcchat-border);
        background: rgba(255, 255, 255, 0.72);
        backdrop-filter: blur(6px);
      }
      .fcchat-quick-actions{
        display: flex;
        align-items: center;
        gap: 8px;
        overflow-x: auto;
        padding: 0;
        scrollbar-width: thin;
      }
      .fcchat-quick-actions::-webkit-scrollbar{
        height: 4px;
      }
      .fcchat-chip{
        height: 30px;
        border-radius: 9999px;
        border: 1px solid var(--fcchat-chip-border);
        background: var(--fcchat-chip-bg);
        color: var(--fcchat-accent-strong);
        font-size: 12px;
        padding: 0 12px;
        cursor: pointer;
        white-space: nowrap;
        transition: transform 160ms cubic-bezier(.2,.8,.2,1), box-shadow 160ms cubic-bezier(.2,.8,.2,1), background 160ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-chip:hover{
        transform: translateY(-1px);
        background: rgba(45, 84, 140, 0.14);
        box-shadow: 0 4px 12px rgba(20, 44, 82, 0.15);
      }
      .fcchat-chip:active{
        transform: translateY(0);
      }

      .fcchat-body{
        flex: 1;
        display:flex;
        flex-direction: column;
        min-height: 0;
        background:
          radial-gradient(120% 100% at 100% 0%, rgba(241, 237, 228, 0.75) 0%, transparent 50%),
          linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(246, 243, 236, 0.78) 100%);
      }
      .fcchat-body.is-recall-open .fcchat-recall-panel{
        flex: 1;
        max-height: none;
        border-bottom: none;
      }
      .fcchat-body.is-recall-open .fcchat-list,
      .fcchat-body.is-recall-open .fcchat-status{
        display: none;
      }
      .fcchat-recall-panel{
        max-height: 156px;
        overflow: auto;
        border-bottom: 1px dashed var(--fcchat-border);
        background: rgba(255, 255, 255, 0.55);
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .fcchat-recall-panel[hidden]{
        display: none !important;
      }
      .fcchat-recall-empty{
        font-size: 12px;
        color: var(--fcchat-ink-soft);
        opacity: 0.9;
      }
      .fcchat-recall-card{
        width: 100%;
        border: 1px solid var(--fcchat-border);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.86);
        text-align: left;
        padding: 8px 10px;
        cursor: pointer;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1), border-color 150ms cubic-bezier(.2,.8,.2,1);
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .fcchat-recall-card:hover{
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(31, 79, 157, 0.14);
        border-color: rgba(31, 79, 157, 0.28);
      }
      .fcchat-recall-role{
        font-size: 11px;
        letter-spacing: 0.06em;
        color: var(--fcchat-accent-strong);
        opacity: 0.9;
      }
      .fcchat-recall-card.is-user .fcchat-recall-role{
        color: #2665c3;
      }
      .fcchat-recall-card.is-assistant .fcchat-recall-role{
        color: #8b5a2b;
      }
      .fcchat-recall-text{
        font-size: 13px;
        color: var(--fcchat-ink);
        line-height: 1.45;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .fcchat-list{
        flex: 1;
        overflow: auto;
        padding: 14px 14px 10px 14px;
        display:flex;
        flex-direction: column;
        gap: 12px;
        -webkit-overflow-scrolling: touch;
      }

      .fcchat-row{
        display:flex;
        animation: fcchat-bubble-in 220ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-row.is-user{ justify-content:flex-end; }
      .fcchat-row.is-assistant{ justify-content:flex-start; }
      @keyframes fcchat-bubble-in{
        from{ opacity: 0; transform: translate3d(0, 6px, 0); }
        to{ opacity: 1; transform: translate3d(0, 0, 0); }
      }

      .fcchat-bubble{
        max-width: 80%;
        padding: 11px 13px;
        border-radius: 14px;
        font-size: 17px;
        line-height: 1.62;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        word-break: break-word;
        border: 1px solid transparent;
      }
      .bubble-user{
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, #256cd5 100%);
        color:#fff;
        border-top-right-radius: 5px;
        box-shadow: 0 10px 22px rgba(37, 99, 235, 0.24);
      }
      .bubble-assistant{
        background: linear-gradient(150deg, rgba(255, 255, 255, 0.95) 0%, var(--fcchat-assistant) 100%);
        color: var(--fcchat-ink);
        border-top-left-radius: 5px;
        border-color: var(--fcchat-assistant-border);
      }

      .fcchat-status{
        padding: 6px 14px 0 14px;
        font-size: 12px;
        color: var(--fcchat-ink-soft);
        min-height: 18px;
      }

      .fcchat-inputbar{
        display:flex;
        gap: 10px;
        padding: 0;
        border-top: 0;
        background: transparent;
        backdrop-filter: none;
      }
      .fcchat-input{
        flex:1;
        height: 44px;
        border-radius: 12px;
        border: 1px solid var(--fcchat-border);
        background: rgba(255, 255, 255, 0.92);
        color: var(--fcchat-ink);
        padding: 0 12px;
        font-size: 16px;
        outline:none;
      }
      .fcchat-input:focus{
        border-color: rgba(31,79,157,.45);
        box-shadow: 0 0 0 3px rgba(31,79,157,.14);
      }

      .fcchat-btn{
        height: 44px;
        border-radius: 10px;
        border: 1px solid var(--fcchat-border);
        padding: 0 12px;
        font-size: 14px;
        cursor:pointer;
        user-select:none;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-btn:disabled{ opacity:.6; cursor:not-allowed; }
      .fcchat-btn-primary{
        min-width: 84px;
        background: linear-gradient(150deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color:#fff;
        border-color: transparent;
        box-shadow: 0 8px 16px rgba(31, 79, 157, 0.25);
      }
      .fcchat-btn-primary:hover{
        transform: translateY(-1px);
        box-shadow: 0 10px 20px rgba(31, 79, 157, 0.3);
      }
      .fcchat-btn-primary:active{
        transform: translateY(0);
      }
      .fcchat-btn-ghost{
        background: rgba(255,255,255,.66);
        color: var(--fcchat-ink);
        border-color: var(--fcchat-border);
        height: 30px;
        padding: 0 10px;
        border-radius: 10px;
        font-size: 12px;
      }
      .fcchat-btn-ghost:hover{
        background: rgba(255,255,255,.9);
      }
      .fcchat-btn-ghost.is-active{
        color: #fff;
        background: linear-gradient(145deg, var(--fcchat-accent), var(--fcchat-accent-strong));
        border-color: transparent;
      }
      .fcchat-close{
        width: 30px;
        padding: 0;
        font-size: 18px;
        line-height: 28px;
      }

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
        box-shadow: 0 8px 20px rgba(31, 79, 157, 0.36);
        padding: 0;
        transition: opacity 220ms ease, box-shadow 220ms ease, transform 220ms ease;
        animation: fcchat-idle 3.6s ease-in-out infinite;
        touch-action: none;
        -webkit-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      @media (max-width: 768px) and (orientation: portrait){
        .fcchat-fab{
          top: calc(env(safe-area-inset-top, 0px) + 88px);
          right: 12px;
          bottom: auto;
        }
      }
      .fcchat-fab:hover{
        box-shadow: 0 10px 24px rgba(31, 79, 157, 0.42);
        transform: scale(1.06);
      }
      .fcchat-fab:active{
        transform: scale(0.98);
      }
      .fcchat-fab svg{
        width: 44px;
        height: 44px;
        display: block;
      }
      .fcchat-fab.fcchat-dragging{
        transition: none !important;
        cursor: grabbing;
        animation: none !important;
      }
      .fcchat-fab.fcchat-snapping{
        transition: left 220ms cubic-bezier(0.2, 0.9, 0.2, 1), top 220ms cubic-bezier(0.2, 0.9, 0.2, 1);
      }
      .fcchat-fab.fcchat-docked{
        transform: translateX(14px);
        animation: none;
      }
      .fcchat-fab.fcchat-docked:hover{
        transform: translateX(10px) scale(1.05);
      }
      body.fcchat-open .fcchat-fab{
        opacity: 0.72;
      }
      @keyframes fcchat-idle{
        0%, 68%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
        74%{
          transform: translate3d(0, -10px, 0) scale(1.12) rotate(4deg);
        }
        80%{
          transform: translate3d(0, -2px, 0) scale(1.04) rotate(-2deg);
        }
        87%, 100%{
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
        }
      }

      @media (max-width: 768px), (pointer: coarse){
        .fcchat-root{
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          top: auto !important;
          width: 100vw !important;
          height: min(82vh, 760px) !important;
          border-radius: 18px 18px 0 0 !important;
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
        .fcchat-fab.fcchat-docked{
          transform: translateX(10px);
        }
        .fcchat-title{
          font-size: 20px;
        }
        .fcchat-bubble{
          font-size: 15px;
          line-height: 1.58;
          max-width: 88%;
        }
        .fcchat-input{
          font-size: 16px;
        }
        .fcchat-recall-panel{
          max-height: 138px;
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

      .fcchat-first-hint{
        position: fixed;
        z-index: 99998;
        transform: translate(-100%, -50%);
        max-width: 260px;
        border-radius: 14px;
        border: 1px solid var(--fcchat-border);
        background: linear-gradient(140deg, rgba(255,255,255,0.95), rgba(245, 240, 230, 0.95));
        color: var(--fcchat-ink);
        padding: 10px 12px;
        font-size: 13px;
        line-height: 1.45;
        box-shadow: 0 10px 24px rgba(20, 30, 50, 0.22);
        pointer-events: none;
        opacity: 1;
        transition: opacity 280ms ease, transform 280ms ease;
      }
      .fcchat-first-hint.is-hide{
        opacity: 0;
        transform: translate(calc(-100% - 6px), -50%);
      }
    `,document.head.appendChild(t)}getElement(){return this.root}remove(){this.destroy()}}const j=Object.freeze(Object.defineProperty({__proto__:null,FcChatPanel:H},Symbol.toStringTag,{value:"Module"})),v=1600,$=800,Y=3200;function F(o){try{return JSON.parse(o)}catch{return null}}function w(o){return typeof o=="string"?o:""}function K(o){return o.endsWith("/")?o:o+"/"}function k(o){return(o||"").replace(/\s+/g,"").trim()}function q(o,t,e=[],s=""){const n=e.map(l=>({role:l.role==="assistant"?"assistant":"user",content:typeof l.text=="string"?l.text.trim():"",text:typeof l.text=="string"?l.text.trim():""})).filter(l=>!!l.content),i=k(o),r=Array.isArray(t==null?void 0:t.userMemory)?t.userMemory.map(l=>typeof l=="string"?l.trim():"").filter(l=>!!l).filter(l=>k(l)!==i).slice(-30):[],c=(l,d)=>{const b=l.trim();return b.length<=d?b:`${b.slice(0,d)}...`};let h="",m=!1;for(let l=n.length-1;l>=0;l--){const d=n[l];if(d.role!=="user"||!d.text)continue;const b=k(d.text);if(!m&&b===i){m=!0;continue}h=d.text;break}let p="";for(let l=n.length-1;l>=0;l--){const d=n[l];if(d.role==="assistant"&&d.text){p=d.text;break}}const f=n.slice(-8).map(l=>({role:l.role,text:c(l.text,v),content:c(l.text,v)})),u=n.slice(-20).map(l=>({role:l.role,text:c(l.text,v),content:c(l.text,v)})),g={question:o,rawQuestion:o};if(s&&(g.sessionId=s,g.conversationId=s),n.length>0&&(g.history=n,g.messages=n,g.chatHistory=n.map(l=>({role:l.role,text:l.text}))),t&&typeof t=="object"){const l=Array.isArray(t.recentTurns)?t.recentTurns:[];g.context={museumId:t.museumId||"",museumName:t.museumName||"",sceneId:t.sceneId||"",sceneTitle:t.sceneTitle||"",url:t.url||"",sessionId:s||"",historyLength:n.length,userMemory:r,userMemoryLength:r.length,lastUserUtterance:t!=null&&t.lastUserUtterance||h?c((t==null?void 0:t.lastUserUtterance)||h,$):"",lastAssistantReply:t!=null&&t.lastAssistantReply||p?c((t==null?void 0:t.lastAssistantReply)||p,Y):"",recentTurns:l.length>0?l.slice(-8).map(d=>({role:d.role==="assistant"?"assistant":"user",text:c(typeof d.text=="string"?d.text:"",v),content:c(typeof d.text=="string"?d.text:"",v)})):f,history:u,messages:u,chatHistory:u.map(d=>({role:d.role,text:d.text}))}}return g}function X(o){if(o&&typeof o=="object"&&typeof o.answer=="string"&&o.answer.trim())return{ok:!0,answer:o.answer.trim(),model:w(o.model)||void 0};if(o&&typeof o=="object"&&("code"in o||"msg"in o||"data"in o)){const t=typeof o.code=="number"?o.code:void 0,e=w(o.msg)||"",s=o.data;if((t===0||t===void 0)&&s&&typeof s=="object"){const n=typeof s.answer=="string"?s.answer.trim():"";if(n)return{ok:!0,answer:n,model:w(s.model)||void 0}}if(t===40101||e.toLowerCase()==="unauthorized")return{ok:!1,code:40101,msg:"unauthorized"};if(t!==void 0&&t!==0)return{ok:!1,code:t,msg:e||`error code=${t}`};if(e&&e.toLowerCase()!=="ok")return{ok:!1,code:t,msg:e}}if(o&&typeof o=="object"&&("Code"in o||"Message"in o||"RequestId"in o)){const t=w(o.Code)||void 0,e=w(o.Message)||"服务暂不可用",s=w(o.RequestId)||void 0;return{ok:!1,code:t,msg:e,requestId:s}}return{ok:!1,msg:"服务返回异常数据"}}function S(o,t){const e=(t.msg||"").trim(),s=typeof t.code=="string"?t.code.trim():t.code,n=e.toLowerCase(),i=typeof s=="string"?s.toLowerCase():s;if(o===403&&(i==="accessdenied"||n.includes("access denied"))&&n.includes("debt"))return"服务暂不可用（云函数账户欠费，HTTP 403）";if(o===401||s===40101||n==="unauthorized")return"服务未授权，请检查服务端鉴权配置";if(o>=400){const r=[];typeof s=="string"&&s&&r.push(s),e&&e!=="服务返回异常数据"&&r.push(e);const c=r.length>0?`：${r.join(" / ")}`:"";return`服务暂不可用（HTTP ${o}${c}）`}return e&&e.toLowerCase().includes("bad response")?"服务返回异常数据":e||"请求失败"}class W{constructor(t){a(this,"endpoint");a(this,"authToken");a(this,"timeoutMs");if(!(t!=null&&t.endpoint))throw new Error("fcChat endpoint is empty");this.endpoint=K(t.endpoint),this.authToken=t.authToken||"",this.timeoutMs=typeof t.timeoutMs=="number"&&t.timeoutMs>0?t.timeoutMs:15e3}async ask(t,e,s=[],n=""){const i=(t||"").trim();if(!i)throw new Error("empty question");const r=new AbortController,c=setTimeout(()=>r.abort(),this.timeoutMs);try{const h={"Content-Type":"application/json"};this.authToken&&(h.Authorization=this.authToken.startsWith("Bearer ")?this.authToken:`Bearer ${this.authToken}`);const m=await fetch(this.endpoint,{method:"POST",headers:h,body:JSON.stringify(q(i,e,s,n)),signal:r.signal}),p=await m.text(),f=F(p);if(!f)throw m.ok?new Error("服务返回异常数据"):new Error(`服务暂不可用（HTTP ${m.status}）`);const u=X(f);if(!m.ok&&!u.ok)throw new Error(S(m.status,u));if(u.ok)return{answer:u.answer,model:u.model};if(u.code===40101){const l=new Error("unauthorized (code=40101)");throw l.code=40101,l}const g=S(m.status,u);throw new Error(g||"请求失败")}catch(h){throw(h==null?void 0:h.name)==="AbortError"?new Error(`timeout (${this.timeoutMs}ms)`):h}finally{clearTimeout(c)}}}const tt=Object.freeze(Object.defineProperty({__proto__:null,FcChatClient:W},Symbol.toStringTag,{value:"Module"}));class J{constructor(t={}){a(this,"element");a(this,"isOpen",!1);a(this,"inputEl");a(this,"options");a(this,"handleKeyDownBound");this.options=t,this.handleKeyDownBound=d=>this.handleKeyDown(d),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const e=document.createElement("div");e.className="vr-modal-mask";const s=document.createElement("div");s.className="vr-modal-card vr-login-card";const n=document.createElement("div");n.className="vr-login-title-row";const i=document.createElement("div");i.className="vr-modal-title",i.textContent="登录";const r=document.createElement("button");r.className="vr-btn vr-login-close",r.setAttribute("aria-label","关闭"),r.textContent="×",r.addEventListener("click",()=>this.close()),n.appendChild(i),n.appendChild(r);const c=document.createElement("div");c.className="vr-modal-desc",c.textContent="输入用户名即可参与互动";const h=document.createElement("div");h.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.id="community-login-name",this.inputEl.name="username",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",d=>{d.key==="Enter"&&this.handleConfirm()});const m=document.createElement("div");m.className="vr-modal-actions vr-login-actions";const p=document.createElement("button");p.className="vr-btn vr-login-btn",p.textContent="取消",p.addEventListener("click",()=>this.close());const f=document.createElement("button");f.className="vr-btn vr-login-btn danger",f.textContent="退出登录",f.addEventListener("click",()=>{var d,b;N(),(b=(d=this.options).onLogout)==null||b.call(d),this.close()});const u=document.createElement("button");u.className="vr-btn vr-login-btn primary",u.textContent="确认",u.addEventListener("click",()=>this.handleConfirm()),m.appendChild(p),m.appendChild(f),m.appendChild(u),h.appendChild(this.inputEl),s.appendChild(n),s.appendChild(c),s.appendChild(h),s.appendChild(m),e.addEventListener("click",()=>this.close()),s.addEventListener("click",d=>d.stopPropagation()),this.element.appendChild(e),this.element.appendChild(s);const g=()=>{const d=T();f.style.display=d?"inline-flex":"none"},l=this.open.bind(this);this.open=()=>{g(),l()}}handleKeyDown(t){this.isOpen&&t.key==="Escape"&&this.close()}handleConfirm(){var s,n;const t=(this.inputEl.value||"").trim();if(t.length<2||t.length>12){x("用户名需 2-12 字");return}const e=P(t);(n=(s=this.options).onLogin)==null||n.call(s,e),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const t=T();this.inputEl.value=(t==null?void 0:t.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class Q{constructor(t){a(this,"element");a(this,"sceneId");a(this,"sceneName");a(this,"onClose");a(this,"subtitleEl");a(this,"loginHintBtn");a(this,"userLineEl");a(this,"userNameEl");a(this,"likeBtn");a(this,"likeCountEl");a(this,"commentsEl");a(this,"inputEl");a(this,"sendBtn");a(this,"loginModal");a(this,"highlightNextFirstComment",!1);this.sceneId=t.sceneId,this.sceneName=t.sceneName,this.onClose=t.onClose,this.element=document.createElement("div"),this.element.className="vr-community";const e=document.createElement("div");e.className="vr-community-header";const s=document.createElement("div");s.className="vr-community-title",s.textContent="社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle";const n=document.createElement("button");n.className="vr-community-close",n.innerHTML="×",n.setAttribute("aria-label","关闭"),n.style.pointerEvents="auto",n.style.zIndex="10",n.addEventListener("click",p=>{var f;p.preventDefault(),p.stopPropagation(),p.stopImmediatePropagation(),(f=this.onClose)==null||f.call(this),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"community"}}))}),e.appendChild(s),e.appendChild(this.subtitleEl),e.appendChild(n);const i=document.createElement("div");i.className="vr-community-content";const r=document.createElement("div");r.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可参与互动",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const c=document.createElement("button");c.className="vr-btn vr-community-logout",c.textContent="退出登录",c.addEventListener("click",()=>{N(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(c),r.appendChild(this.loginHintBtn),r.appendChild(this.userLineEl);const h=document.createElement("div");h.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="点赞",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const p=A(this.sceneId);if(!p.ok){x("请先登录"),this.loginModal.open();return}this.renderLikes(p.count,p.action==="liked"),x(p.action==="liked"?"已点赞":"已取消点赞")}),h.appendChild(this.likeBtn),h.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const m=document.createElement("div");m.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.id="community-comment-input",this.inputEl.name="comment",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",p=>{p.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),m.appendChild(this.inputEl),m.appendChild(this.sendBtn),i.appendChild(r),i.appendChild(h),i.appendChild(this.commentsEl),i.appendChild(m),this.element.appendChild(e),this.element.appendChild(i),this.loginModal=new J({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(t.sceneId,t.sceneName)}setScene(t,e){this.sceneId=t,this.sceneName=e,this.subtitleEl.textContent=this.sceneName?this.sceneName:t,this.refresh()}toastByReason(t){t==="not_logged_in"?x("请先登录"):t==="banned"?x("内容包含敏感词，已拦截"):t==="cooldown"?x("评论过于频繁，请稍后再试"):t==="EMPTY"&&x("内容不能为空")}formatRelativeTime(t){const e=Date.now()-t;if(e<6e4)return"刚刚";const s=Math.floor(e/6e4);if(s<60)return`${s} 分钟前`;const n=Math.floor(s/60);return n<24?`${n} 小时前`:new Date(t).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(t,e){this.likeCountEl.textContent=String(t),this.likeBtn.classList.toggle("liked",e)}renderComments(t){this.commentsEl.innerHTML="";const e=document.createElement("div");if(e.className="vr-community-tip",e.textContent="本场景最近 50 条留言",this.commentsEl.appendChild(e),!t.length){const n=document.createElement("div");n.className="vr-community-empty",n.textContent="此场景暂无留言",this.commentsEl.appendChild(n);return}let s=null;for(const n of t){const i=document.createElement("div");i.className="vr-community-comment";const r=document.createElement("div");r.className="vr-community-comment-meta",r.textContent=`${n.userName} · ${this.formatRelativeTime(n.ts)}`;const c=document.createElement("div");c.className="vr-community-comment-text",c.textContent=n.text,i.appendChild(r),i.appendChild(c),this.commentsEl.appendChild(i),s||(s=i)}s&&this.highlightNextFirstComment&&(s.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{s==null||s.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const e=(this.inputEl.value||"").trim();if(!e){this.toastByReason("EMPTY");return}const s=R(this.sceneId,e);if(!s.ok){s.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(s.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,x("评论已发布")}refresh(){const t=T();this.loginHintBtn.style.display=t?"none":"inline-flex",this.userLineEl.style.display=t?"flex":"none",this.userNameEl.textContent=t?t.name:"";const e=L(this.sceneId,(t==null?void 0:t.id)||"anon").count,s=t?L(this.sceneId,t.id).liked:!1;this.renderLikes(e,s),this.renderComments(O(this.sceneId));const n=!t;this.inputEl.disabled=n,this.sendBtn.classList.toggle("disabled",n)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}const et=Object.freeze(Object.defineProperty({__proto__:null,CommunityPanel:Q},Symbol.toStringTag,{value:"Module"}));export{et as C,j as F,tt as f};
