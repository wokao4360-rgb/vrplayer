var B=Object.defineProperty;var S=(r,t,e)=>t in r?B(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var a=(r,t,e)=>S(r,typeof t!="symbol"?t+"":t,e);import{l as T,a as N,g as E,t as M,b as I,c as k,d as _}from"./store-B83L8bDT.js";import{s as y}from"./index-DxvcuABd.js";const b=40,z="fcchat_history_v2",O="fcchat_session_v1",P="fcchat_profile_v1";function v(r,t){const e=(t||"global").trim()||"global";return`${r}:${e}`}function L(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`fcchat_${Date.now()}_${Math.random().toString(36).slice(2,10)}`}class R{constructor(t,e){a(this,"client");a(this,"context");a(this,"root");a(this,"header");a(this,"body");a(this,"list");a(this,"input");a(this,"sendBtn");a(this,"clearBtn");a(this,"closeBtn");a(this,"statusLine");a(this,"dragging",!1);a(this,"dragOffsetX",0);a(this,"dragOffsetY",0);a(this,"isMobile",!1);a(this,"swipeStartY",0);a(this,"swipeActive",!1);a(this,"messages",[]);a(this,"isOpen",!1);a(this,"fabButton",null);a(this,"historyStorageKey");a(this,"sessionStorageKey");a(this,"profileStorageKey");a(this,"sessionId");a(this,"profile",{});a(this,"snapTimer",null);a(this,"isDragging",!1);a(this,"startX",0);a(this,"startY",0);a(this,"startLeft",0);a(this,"startTop",0);a(this,"lastLeft",0);a(this,"lastTop",0);a(this,"moved",!1);a(this,"hasUserPlaced",!1);a(this,"typingTimer",null);a(this,"typingAbortToken",0);this.client=t,this.context=e,this.historyStorageKey=v(z,e.museumId),this.sessionStorageKey=v(O,e.museumId),this.profileStorageKey=v(P,e.museumId),this.sessionId=this.loadSessionId(),this.profile=this.loadProfile(),this.mount(),this.injectStyles(),this.detectMobile(),this.restoreHistoryOrWelcome()}destroy(){var t,e;this.stopTyping(!0),this.snapTimer&&(window.clearTimeout(this.snapTimer),this.snapTimer=null),(t=this.root)==null||t.remove(),(e=this.fabButton)==null||e.remove(),this.fabButton=null}detectMobile(){var s,n;const t=((s=window.matchMedia)==null?void 0:s.call(window,"(max-width: 768px)").matches)??!1,e=((n=window.matchMedia)==null?void 0:n.call(window,"(pointer: coarse)").matches)??!1;this.isMobile=t||e,this.root.dataset.mobile=this.isMobile?"1":"0"}mount(){this.root=document.createElement("div"),this.root.className="fcchat-root",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-label","三馆学伴"),this.header=document.createElement("div"),this.header.className="fcchat-header";const t=document.createElement("div");t.className="fcchat-title",t.textContent="三馆学伴";const e=document.createElement("div");e.className="fcchat-header-right",this.clearBtn=document.createElement("button"),this.clearBtn.className="fcchat-btn fcchat-btn-ghost",this.clearBtn.type="button",this.clearBtn.textContent="清空",this.clearBtn.addEventListener("click",()=>this.clear()),this.closeBtn=document.createElement("button"),this.closeBtn.className="fcchat-btn fcchat-btn-ghost fcchat-close",this.closeBtn.type="button",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.textContent="×",this.closeBtn.addEventListener("click",()=>this.toggle()),e.appendChild(this.clearBtn),e.appendChild(this.closeBtn);const s=document.createElement("div");s.className="fcchat-header-row",s.appendChild(t),s.appendChild(e),this.header.appendChild(s);const n=document.createElement("div");n.className="fcchat-disclaimer",n.textContent="提示：AI 可能会出错，内容仅供参考；请以现场展陈/讲解为准。",this.header.appendChild(n),this.body=document.createElement("div"),this.body.className="fcchat-body",this.list=document.createElement("div"),this.list.className="fcchat-list",this.body.appendChild(this.list),this.statusLine=document.createElement("div"),this.statusLine.className="fcchat-status",this.statusLine.textContent="",this.body.appendChild(this.statusLine);const i=document.createElement("div");i.className="fcchat-inputbar",this.input=document.createElement("input"),this.input.className="fcchat-input",this.input.type="text",this.input.placeholder="输入问题，回车发送",this.input.addEventListener("keydown",o=>{o.key==="Enter"&&this.onSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="fcchat-btn fcchat-btn-primary",this.sendBtn.type="button",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.onSend()),i.appendChild(this.input),i.appendChild(this.sendBtn),this.root.appendChild(this.header),this.root.appendChild(this.body),this.root.appendChild(i),document.body.appendChild(this.root),this.root.style.display="none",this.root.style.right="18px",this.root.style.bottom="18px",this.ensureToggleButton(),this.header.addEventListener("mousedown",o=>this.onDragStart(o)),window.addEventListener("mousemove",o=>this.onDragMove(o)),window.addEventListener("mouseup",()=>this.onDragEnd()),this.header.addEventListener("pointerdown",o=>this.onSwipeStart(o),{passive:!1}),this.header.addEventListener("pointermove",o=>this.onSwipeMove(o),{passive:!1}),this.header.addEventListener("pointerup",o=>this.onSwipeEnd(o)),this.header.addEventListener("pointercancel",o=>this.onSwipeEnd(o)),window.addEventListener("resize",()=>this.detectMobile())}hide(){this.isOpen&&(this.isOpen=!1,this.stopTyping(!0),this.root.style.display="none",this.root.classList.remove("fcchat-open"),this.fabButton&&this.fabButton.classList.add("fcchat-docked"),document.body.classList.remove("fcchat-open"),this.updateOverlayState())}show(){this.isOpen||(this.isOpen=!0,this.detectMobile(),this.root.style.display="flex",this.root.classList.add("fcchat-open"),this.fabButton&&this.fabButton.classList.remove("fcchat-docked"),document.body.classList.add("fcchat-open"),this.scrollToBottom(),this.isMobile||this.input.focus(),this.updateOverlayState())}toggle(){this.isOpen?this.hide():this.show()}updateOverlayState(){!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||this.root&&this.root.style.display==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}getSafeBounds(){const t=window.innerWidth,e=window.innerHeight,s=this.fabButton;if(!s)return{minLeft:8,maxLeft:t-52,minTop:12,maxTop:e-64};const n=s.getBoundingClientRect(),i=n.width,o=n.height,c=12+(this.isMobile?56:12),d=12+(this.isMobile?96:12);return{minLeft:8,maxLeft:t-i-8,minTop:c,maxTop:e-o-d}}clampPos(t,e){const s=this.getSafeBounds();return{left:Math.max(s.minLeft,Math.min(t,s.maxLeft)),top:Math.max(s.minTop,Math.min(e,s.maxTop))}}snapToEdge(){const t=this.fabButton;if(!t)return;const e=this.getSafeBounds(),s=t.getBoundingClientRect(),n=s.left,i=s.top,o=n-e.minLeft,c=e.maxLeft-n,d=i-e.minTop,l=e.maxTop-i,h=Math.min(o,c,d,l);let m=n,p=i;h===o?m=e.minLeft:h===c?m=e.maxLeft:h===d?p=e.minTop:h===l&&(p=e.maxTop),t.style.left=`${m}px`,t.style.top=`${p}px`,t.style.right="auto",t.style.bottom="auto",localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:m,top:p})),setTimeout(()=>{t.classList.remove("fcchat-snapping")},220)}ensureToggleButton(){if(this.fabButton)return;const t=new URLSearchParams(location.search);if(t.get("reset_ui")==="1"){localStorage.removeItem("vr_fcchat_dock_state"),t.delete("reset_ui");const n=location.pathname+(t.toString()?"?"+t.toString():"")+location.hash;history.replaceState({},"",n)}const e=document.createElement("button");e.id="fcchat-fab",e.className="fcchat-fab fcchat-docked",e.type="button",e.setAttribute("aria-label","打开三馆学伴"),e.innerHTML=`<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,e.addEventListener("pointerdown",n=>this.onFabPointerDown(n),{passive:!1}),e.addEventListener("pointermove",n=>this.onFabPointerMove(n),{passive:!1}),e.addEventListener("pointerup",n=>this.onFabPointerUp(n),{passive:!1}),e.addEventListener("pointercancel",n=>this.onFabPointerUp(n),{passive:!1}),this.fabButton=e,document.body.appendChild(e);const s=localStorage.getItem("fcchat_fab_pos_v1");if(s)try{const n=JSON.parse(s);e.style.left=`${n.left}px`,e.style.top=`${n.top}px`,e.style.right="auto",e.style.bottom="auto",e.classList.remove("fcchat-docked"),this.hasUserPlaced=!0}catch{}!this.hasUserPlaced&&!this.isOpen&&e.classList.add("fcchat-docked"),this.maybeShowFirstVisitHint()}maybeShowFirstVisitHint(){const t="fcchat_first_hint_shown";if(sessionStorage.getItem(t))return;sessionStorage.setItem(t,"1");const e=this.fabButton;if(!e)return;const s=document.createElement("div");s.className="fcchat-first-hint",s.textContent="我是三馆学伴，为你解疑答惑😉",document.body.appendChild(s);const n=()=>{const i=e.getBoundingClientRect();s.style.left=`${i.left-8}px`,s.style.top=`${i.top+i.height/2}px`};n(),window.addEventListener("resize",n),setTimeout(()=>{s.classList.add("is-hide"),setTimeout(()=>{window.removeEventListener("resize",n),s.remove()},300)},1e4)}onFabPointerDown(t){const e=this.fabButton;if(!e)return;t.preventDefault(),this.isDragging=!1,this.moved=!1,this.startX=t.clientX,this.startY=t.clientY;const s=e.getBoundingClientRect(),n=parseFloat(e.style.left||""),i=parseFloat(e.style.top||"");this.startLeft=Number.isFinite(n)?n:s.left,this.startTop=Number.isFinite(i)?i:s.top;try{e.setPointerCapture(t.pointerId)}catch{}e.classList.remove("fcchat-docked")}onFabPointerMove(t){const e=this.fabButton;if(!e)return;t.preventDefault();const s=t.clientX-this.startX,n=t.clientY-this.startY;if(!this.isDragging){if(Math.abs(s)+Math.abs(n)<4)return;this.isDragging=!0,e.classList.add("fcchat-dragging")}const i=this.clampPos(this.startLeft+s,this.startTop+n);this.lastLeft=i.left,this.lastTop=i.top,e.style.left=`${this.lastLeft}px`,e.style.top=`${this.lastTop}px`,e.style.right="auto",e.style.bottom="auto",this.hasUserPlaced=!0}onFabPointerUp(t){const e=this.fabButton;if(e){t.preventDefault();try{e.releasePointerCapture(t.pointerId)}catch{}if(!this.isDragging){this.toggle();return}this.isDragging=!1,e.classList.remove("fcchat-dragging");try{localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:this.lastLeft,top:this.lastTop}))}catch{}this.snapTimer&&window.clearTimeout(this.snapTimer),e.classList.add("fcchat-snapping"),this.snapTimer=window.setTimeout(()=>{this.snapToEdge(),this.snapTimer=null},5e3)}}onDragStart(t){if(this.isMobile||t.target.closest("button"))return;this.dragging=!0;const s=this.root.getBoundingClientRect();this.dragOffsetX=t.clientX-s.left,this.dragOffsetY=t.clientY-s.top,this.root.style.right="auto",this.root.style.bottom="auto",this.root.style.left=s.left+"px",this.root.style.top=s.top+"px"}onDragMove(t){if(!this.dragging||this.isMobile)return;const e=window.innerWidth,s=window.innerHeight,n=this.root.getBoundingClientRect();let i=t.clientX-this.dragOffsetX,o=t.clientY-this.dragOffsetY;i=Math.max(8,Math.min(i,e-n.width-8)),o=Math.max(8,Math.min(o,s-n.height-8)),this.root.style.left=i+"px",this.root.style.top=o+"px"}onDragEnd(){this.dragging=!1}onSwipeStart(t){!this.isMobile||t.target.closest("button")||(this.swipeActive=!0,this.swipeStartY=t.clientY,this.root.classList.add("is-swiping"),t.preventDefault(),this.header.setPointerCapture(t.pointerId))}onSwipeMove(t){if(!this.isMobile||!this.swipeActive)return;t.preventDefault();const e=t.clientY-this.swipeStartY;if(e<=0){this.root.style.transform="";return}this.root.style.transform=`translateY(${Math.min(e,200)}px)`}onSwipeEnd(t){if(!this.isMobile||!this.swipeActive)return;const s=(this.root.style.transform||"").match(/translateY\(([-\d.]+)px\)/),n=s?Number(s[1]):0;this.swipeActive=!1,this.root.classList.remove("is-swiping"),this.root.style.transform="",t&&this.header.releasePointerCapture(t.pointerId),n>=90&&this.hide()}clear(){this.stopTyping(!0),this.messages=[],this.list.innerHTML="",this.statusLine.textContent="",this.sessionId=L(),this.persistSessionId(),this.persistMessages(),this.ensureWelcome()}loadSessionId(){try{const e=localStorage.getItem(this.sessionStorageKey);if(e&&e.trim())return e}catch{}const t=L();try{localStorage.setItem(this.sessionStorageKey,t)}catch{}return t}persistSessionId(){try{localStorage.setItem(this.sessionStorageKey,this.sessionId)}catch{}}loadProfile(){try{const t=localStorage.getItem(this.profileStorageKey);if(!t)return{};const e=JSON.parse(t);if(!e||typeof e!="object")return{};const s=typeof e.name=="string"?e.name.trim():"";return s?{name:s}:{}}catch{return{}}}persistProfile(){try{localStorage.setItem(this.profileStorageKey,JSON.stringify(this.profile))}catch{}}extractUserName(t){const s=t.trim().match(/(?:我叫|我的名字是|叫我)\s*([A-Za-z0-9_\-\u4e00-\u9fa5]{1,20})/);if(!s)return null;const n=(s[1]||"").trim();return!n||/^(什么|啥|名字|呢|啊|呀)$/u.test(n)?null:n||null}isAskUserName(t){const e=t.replace(/\s+/g,"");return/我叫什么|我的名字|记得我名字|你记得我是谁/.test(e)}normalizeForIntent(t){return t.replace(/\s+/g,"").replace(/[，。！？、,.!?；;：“”"'`（）()【】\[\]<>《》]/g,"").trim()}isLikelyRecallQuestion(t){const e=this.normalizeForIntent(t);return e?/还记得|记不记得|刚才|刚刚|之前|前面|上句|上一句|我说|我做|我干|我刚|我今天/.test(e)?!0:/干了啥|干了什么|做了啥|做了什么|说了啥|说了什么|讲了啥|讲了什么|去了哪|去了哪里|哪句话|哪一句|叫什么/.test(e)?/我|你|他|她|它|我们|你们|他们|姥姥|奶奶|爷爷|外婆|妈妈|爸爸|朋友|同学|老师|孩子/.test(e):!1:!1}buildRecallTokenSet(t){const s=this.normalizeForIntent(t).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g,""),n=new Set;if(!s)return n;const i=s.match(/[a-z0-9]+|[\u4e00-\u9fa5]/g)||[];for(const o of i)o&&n.add(o);s.length<=3&&n.add(s);for(let o=0;o<s.length-1;o++)n.add(s.slice(o,o+2));return n}scoreTokenSimilarity(t,e){if(t.size===0||e.size===0)return 0;let s=0;for(const i of t)e.has(i)&&s++;const n=t.size+e.size-s;return n<=0?0:s/n}extractRecallSubject(t){const s=this.normalizeForIntent(t).match(/^(.{1,10}?)(?:干了啥|干了什么|做了啥|做了什么|说了啥|说了什么|讲了啥|讲了什么|去了哪|去了哪里|哪句话|哪一句|叫什么)$/);return s?(s[1]||"").trim():""}shouldSkipRecallSource(t){const e=this.normalizeForIntent(t);return!e||this.isAskUserName(t)||this.isLikelyRecallQuestion(t)?!0:/^(?:你好|在吗|ok|好的|谢谢|嗯|哦)$/.test(e)}buildRecallAnswer(t){if(!this.isLikelyRecallQuestion(t))return null;const e=this.messages.slice(0,-1).filter(l=>l.role==="user").map(l=>this.normalizeText(l.text)).filter(l=>!this.shouldSkipRecallSource(l));if(e.length===0)return"你还没有说具体行程，你可以先告诉我一句，我会记住。";const s=this.buildRecallTokenSet(t),n=this.extractRecallSubject(t);let i=0,o="";for(let l=e.length-1;l>=0;l--){const h=e[l],m=this.normalizeForIntent(h);if(!m)continue;const p=this.buildRecallTokenSet(m);let g=this.scoreTokenSimilarity(s,p);n&&m.includes(n)&&(g+=.35),/(?:今天|刚才|刚刚|去了|参观|看了|吃了|做了|学习了|完成了|准备了|说了|讲了)/.test(m)&&(g+=.08);const u=e.length-1-l;g+=Math.max(0,.12-u*.02),g>i&&(i=g,o=h)}return!o||i<(n?.18:.28)?n?`你刚才还没提到“${n}”做了什么，你可以再说一遍，我会记住。`:"我没抓到你前面那句具体内容，你可以再说一遍，我会直接记住。":`你刚才提到：${o.length>120?`${o.slice(0,120)}...`:o}`}restoreHistoryOrWelcome(){let t=!1;try{const e=localStorage.getItem(this.historyStorageKey);if(e){const s=JSON.parse(e);if(Array.isArray(s)){const n=s.map(i=>({role:(i==null?void 0:i.role)==="assistant"?"assistant":"user",text:typeof(i==null?void 0:i.text)=="string"?i.text.trim():""})).filter(i=>!!i.text);n.length>0&&(this.messages=n.slice(-b),this.renderMessages(),t=!0)}}}catch{}t||(this.ensureWelcome(),this.persistMessages())}renderMessages(){this.list.innerHTML="";for(const t of this.messages){const e=document.createElement("div");e.className=`fcchat-row ${t.role==="user"?"is-user":"is-assistant"}`;const s=document.createElement("div");s.className=`fcchat-bubble ${t.role==="user"?"bubble-user":"bubble-assistant"}`,s.textContent=this.normalizeText(t.text),e.appendChild(s),this.list.appendChild(e)}this.scrollToBottom()}persistMessages(){try{localStorage.setItem(this.historyStorageKey,JSON.stringify(this.messages.slice(-b)))}catch{}}ensureWelcome(){this.messages.length>0||this.addMessage("assistant","我是三馆学伴，可以为你介绍展览亮点、参观路线和人物故事。")}setBusy(t,e=""){this.sendBtn.disabled=t,this.input.disabled=t,this.statusLine.textContent=e}normalizeText(t){return(t??"").replace(/^\s+/,"")}addMessage(t,e){const s={role:t,text:this.normalizeText(e)};this.messages.push(s),this.messages.length>b&&(this.messages=this.messages.slice(-b));const n=document.createElement("div");n.className=`fcchat-row ${t==="user"?"is-user":"is-assistant"}`;const i=document.createElement("div");i.className=`fcchat-bubble ${t==="user"?"bubble-user":"bubble-assistant"}`,i.textContent=s.text,n.appendChild(i),this.list.appendChild(n),this.scrollToBottom(),this.persistMessages()}addAssistantBubbleLoading(){const t=document.createElement("div");t.className="fcchat-row is-assistant",t.dataset.loading="1";const e=document.createElement("div");return e.className="fcchat-bubble bubble-assistant",e.innerHTML='<span class="fcchat-typing"><span></span><span></span><span></span></span>',t.appendChild(e),this.list.appendChild(t),this.scrollToBottom(),{row:t,bubble:e}}addAssistantBubbleEmpty(){const t=document.createElement("div");t.className="fcchat-row is-assistant";const e=document.createElement("div");return e.className="fcchat-bubble bubble-assistant",e.textContent="",t.appendChild(e),this.list.appendChild(t),this.scrollToBottom(),e}replaceLoadingWithEmpty(t){t.removeAttribute("data-loading");const e=t.querySelector(".fcchat-bubble");return e&&(e.innerHTML="",e.textContent=""),e}scrollToBottom(){this.list.scrollTop=this.list.scrollHeight}stopTyping(t){this.typingAbortToken++,this.typingTimer!=null&&(window.clearTimeout(this.typingTimer),this.typingTimer=null)}async typewriterRender(t,e){const s=++this.typingAbortToken,n=this.normalizeText(e),i=n.length;let o=1200;i<=120?o=900+Math.floor(Math.random()*400):i<=400?o=1800+Math.floor(Math.random()*800):o=3e3+Math.floor(Math.random()*1e3);let c=0;const d=performance.now();return await new Promise(l=>{const h=()=>{if(s!==this.typingAbortToken){t.textContent=n,this.scrollToBottom(),l();return}const m=performance.now()-d,p=i-c;if(m>=o||p<=0){t.textContent=n,this.scrollToBottom(),l();return}const g=c/Math.max(1,i);let u=1;const f=Math.random();g<.15?u=f<.75?1:2:g<.7?u=f<.35?2:f<.75?3:4:u=f<.5?2:3,u=Math.min(u,p);const x=n.slice(0,c+u);c+=u,t.textContent=x,this.scrollToBottom();let C=18+Math.floor(Math.random()*38);Math.random()<.06&&(C+=60+Math.floor(Math.random()*90)),this.typingTimer=window.setTimeout(h,C)};h()})}async onSend(){const t=this.input.value.trim();if(!t)return;this.stopTyping(!0),this.input.value="",this.addMessage("user",t);const e=this.extractUserName(t);if(e&&(this.profile.name=e,this.persistProfile()),this.isAskUserName(t)&&this.profile.name){const o=`你叫${this.profile.name}。我已经记住了。`;this.addMessage("assistant",o),this.setBusy(!1,""),this.scrollToBottom();return}const s=this.buildRecallAnswer(t);if(s){this.addMessage("assistant",s),this.setBusy(!1,""),this.scrollToBottom();return}const{row:n,bubble:i}=this.addAssistantBubbleLoading();this.setBusy(!0,"输出中...");try{const o=this.messages.slice(-b),c=await this.client.ask(t,this.context,o,this.sessionId),d=this.replaceLoadingWithEmpty(n);this.setBusy(!0,"输出中..."),await this.typewriterRender(d,c.answer),this.messages.push({role:"assistant",text:this.normalizeText(c.answer)}),this.messages.length>b&&(this.messages=this.messages.slice(-b)),this.persistMessages(),this.setBusy(!1,"")}catch(o){const c=n.querySelector(".fcchat-bubble");if(c){n.removeAttribute("data-loading");const l=`请求失败：${typeof(o==null?void 0:o.message)=="string"?o.message:String(o)}`;c.textContent=l,this.messages.push({role:"assistant",text:l}),this.messages.length>b&&(this.messages=this.messages.slice(-b)),this.persistMessages()}this.setBusy(!1,"")}this.scrollToBottom()}injectStyles(){if(document.getElementById("fcchat-style"))return;const t=document.createElement("style");t.id="fcchat-style",t.textContent=`
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
    `,document.head.appendChild(t)}getElement(){return this.root}remove(){this.destroy()}}const q=Object.freeze(Object.defineProperty({__proto__:null,FcChatPanel:R},Symbol.toStringTag,{value:"Module"}));function A(r){try{return JSON.parse(r)}catch{return null}}function w(r){return typeof r=="string"?r:""}function $(r){return r.endsWith("/")?r:r+"/"}function D(r,t,e=[],s=""){const n=e.map(o=>({role:o.role==="assistant"?"assistant":"user",content:typeof o.text=="string"?o.text.trim():"",text:typeof o.text=="string"?o.text.trim():""})).filter(o=>!!o.content),i={question:r};return s&&(i.sessionId=s,i.conversationId=s),n.length>0&&(i.history=n,i.messages=n,i.chatHistory=n.map(o=>({role:o.role,text:o.text}))),t&&typeof t=="object"&&(i.context={museumId:t.museumId||"",museumName:t.museumName||"",sceneId:t.sceneId||"",sceneTitle:t.sceneTitle||"",url:t.url||"",sessionId:s||"",historyLength:n.length}),i}function F(r){if(r&&typeof r=="object"&&typeof r.answer=="string"&&r.answer.trim())return{ok:!0,answer:r.answer.trim(),model:w(r.model)||void 0};if(r&&typeof r=="object"&&("code"in r||"msg"in r||"data"in r)){const t=typeof r.code=="number"?r.code:void 0,e=w(r.msg)||"",s=r.data;if((t===0||t===void 0)&&s&&typeof s=="object"){const n=typeof s.answer=="string"?s.answer.trim():"";if(n)return{ok:!0,answer:n,model:w(s.model)||void 0}}if(t===40101||e.toLowerCase()==="unauthorized")return{ok:!1,code:40101,msg:"unauthorized"};if(t!==void 0&&t!==0)return{ok:!1,code:t,msg:e||`error code=${t}`};if(e&&e.toLowerCase()!=="ok")return{ok:!1,code:t,msg:e}}return{ok:!1,msg:"bad response"}}class X{constructor(t){a(this,"endpoint");a(this,"authToken");a(this,"timeoutMs");if(!(t!=null&&t.endpoint))throw new Error("fcChat endpoint is empty");this.endpoint=$(t.endpoint),this.authToken=t.authToken||"",this.timeoutMs=typeof t.timeoutMs=="number"&&t.timeoutMs>0?t.timeoutMs:15e3}async ask(t,e,s=[],n=""){const i=(t||"").trim();if(!i)throw new Error("empty question");const o=new AbortController,c=setTimeout(()=>o.abort(),this.timeoutMs);try{const d={"Content-Type":"application/json"};this.authToken&&(d.Authorization=this.authToken.startsWith("Bearer ")?this.authToken:`Bearer ${this.authToken}`);const l=await fetch(this.endpoint,{method:"POST",headers:d,body:JSON.stringify(D(i,e,s,n)),signal:o.signal}),h=await l.text(),m=A(h);if(!m){const u=h?`bad response: ${h}`:`http ${l.status}`;throw new Error(u)}const p=F(m);if(p.ok)return{answer:p.answer,model:p.model};if(p.code===40101){const u=new Error("unauthorized (code=40101)");throw u.code=40101,u}const g=p.code?`${p.msg} (code=${p.code})`:p.msg;throw new Error(g||"request failed")}catch(d){throw(d==null?void 0:d.name)==="AbortError"?new Error(`timeout (${this.timeoutMs}ms)`):d}finally{clearTimeout(c)}}}const J=Object.freeze(Object.defineProperty({__proto__:null,FcChatClient:X},Symbol.toStringTag,{value:"Module"}));class H{constructor(t={}){a(this,"element");a(this,"isOpen",!1);a(this,"inputEl");a(this,"options");a(this,"handleKeyDownBound");this.options=t,this.handleKeyDownBound=f=>this.handleKeyDown(f),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const e=document.createElement("div");e.className="vr-modal-mask";const s=document.createElement("div");s.className="vr-modal-card vr-login-card";const n=document.createElement("div");n.className="vr-login-title-row";const i=document.createElement("div");i.className="vr-modal-title",i.textContent="登录";const o=document.createElement("button");o.className="vr-btn vr-login-close",o.setAttribute("aria-label","关闭"),o.textContent="×",o.addEventListener("click",()=>this.close()),n.appendChild(i),n.appendChild(o);const c=document.createElement("div");c.className="vr-modal-desc",c.textContent="输入用户名即可参与互动";const d=document.createElement("div");d.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",f=>{f.key==="Enter"&&this.handleConfirm()});const l=document.createElement("div");l.className="vr-modal-actions vr-login-actions";const h=document.createElement("button");h.className="vr-btn vr-login-btn",h.textContent="取消",h.addEventListener("click",()=>this.close());const m=document.createElement("button");m.className="vr-btn vr-login-btn danger",m.textContent="退出登录",m.addEventListener("click",()=>{var f,x;T(),(x=(f=this.options).onLogout)==null||x.call(f),this.close()});const p=document.createElement("button");p.className="vr-btn vr-login-btn primary",p.textContent="确认",p.addEventListener("click",()=>this.handleConfirm()),l.appendChild(h),l.appendChild(m),l.appendChild(p),d.appendChild(this.inputEl),s.appendChild(n),s.appendChild(c),s.appendChild(d),s.appendChild(l),e.addEventListener("click",()=>this.close()),s.addEventListener("click",f=>f.stopPropagation()),this.element.appendChild(e),this.element.appendChild(s);const g=()=>{const f=E();m.style.display=f?"inline-flex":"none"},u=this.open.bind(this);this.open=()=>{g(),u()}}handleKeyDown(t){this.isOpen&&t.key==="Escape"&&this.close()}handleConfirm(){var s,n;const t=(this.inputEl.value||"").trim();if(t.length<2||t.length>12){y("用户名需 2-12 字");return}const e=N(t);(n=(s=this.options).onLogin)==null||n.call(s,e),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const t=E();this.inputEl.value=(t==null?void 0:t.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class K{constructor(t){a(this,"element");a(this,"sceneId");a(this,"sceneName");a(this,"onClose");a(this,"subtitleEl");a(this,"loginHintBtn");a(this,"userLineEl");a(this,"userNameEl");a(this,"likeBtn");a(this,"likeCountEl");a(this,"commentsEl");a(this,"inputEl");a(this,"sendBtn");a(this,"loginModal");a(this,"highlightNextFirstComment",!1);this.sceneId=t.sceneId,this.sceneName=t.sceneName,this.onClose=t.onClose,this.element=document.createElement("div"),this.element.className="vr-community";const e=document.createElement("div");e.className="vr-community-header";const s=document.createElement("div");s.className="vr-community-title",s.textContent="社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle";const n=document.createElement("button");n.className="vr-community-close",n.innerHTML="×",n.setAttribute("aria-label","关闭"),n.style.pointerEvents="auto",n.style.zIndex="10",n.addEventListener("click",h=>{var m;h.preventDefault(),h.stopPropagation(),h.stopImmediatePropagation(),(m=this.onClose)==null||m.call(this),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"community"}}))}),e.appendChild(s),e.appendChild(this.subtitleEl),e.appendChild(n);const i=document.createElement("div");i.className="vr-community-content";const o=document.createElement("div");o.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可参与互动",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const c=document.createElement("button");c.className="vr-btn vr-community-logout",c.textContent="退出登录",c.addEventListener("click",()=>{T(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(c),o.appendChild(this.loginHintBtn),o.appendChild(this.userLineEl);const d=document.createElement("div");d.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="点赞",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const h=M(this.sceneId);if(!h.ok){y("请先登录"),this.loginModal.open();return}this.renderLikes(h.count,h.action==="liked"),y(h.action==="liked"?"已点赞":"已取消点赞")}),d.appendChild(this.likeBtn),d.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const l=document.createElement("div");l.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",h=>{h.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),l.appendChild(this.inputEl),l.appendChild(this.sendBtn),i.appendChild(o),i.appendChild(d),i.appendChild(this.commentsEl),i.appendChild(l),this.element.appendChild(e),this.element.appendChild(i),this.loginModal=new H({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(t.sceneId,t.sceneName)}setScene(t,e){this.sceneId=t,this.sceneName=e,this.subtitleEl.textContent=this.sceneName?this.sceneName:t,this.refresh()}toastByReason(t){t==="not_logged_in"?y("请先登录"):t==="banned"?y("内容包含敏感词，已拦截"):t==="cooldown"?y("评论过于频繁，请稍后再试"):t==="EMPTY"&&y("内容不能为空")}formatRelativeTime(t){const e=Date.now()-t;if(e<6e4)return"刚刚";const s=Math.floor(e/6e4);if(s<60)return`${s} 分钟前`;const n=Math.floor(s/60);return n<24?`${n} 小时前`:new Date(t).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(t,e){this.likeCountEl.textContent=String(t),this.likeBtn.classList.toggle("liked",e)}renderComments(t){this.commentsEl.innerHTML="";const e=document.createElement("div");if(e.className="vr-community-tip",e.textContent="本场景最近 50 条留言",this.commentsEl.appendChild(e),!t.length){const n=document.createElement("div");n.className="vr-community-empty",n.textContent="此场景暂无留言",this.commentsEl.appendChild(n);return}let s=null;for(const n of t){const i=document.createElement("div");i.className="vr-community-comment";const o=document.createElement("div");o.className="vr-community-comment-meta",o.textContent=`${n.userName} · ${this.formatRelativeTime(n.ts)}`;const c=document.createElement("div");c.className="vr-community-comment-text",c.textContent=n.text,i.appendChild(o),i.appendChild(c),this.commentsEl.appendChild(i),s||(s=i)}s&&this.highlightNextFirstComment&&(s.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{s==null||s.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const e=(this.inputEl.value||"").trim();if(!e){this.toastByReason("EMPTY");return}const s=I(this.sceneId,e);if(!s.ok){s.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(s.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,y("评论已发布")}refresh(){const t=E();this.loginHintBtn.style.display=t?"none":"inline-flex",this.userLineEl.style.display=t?"flex":"none",this.userNameEl.textContent=t?t.name:"";const e=k(this.sceneId,(t==null?void 0:t.id)||"anon").count,s=t?k(this.sceneId,t.id).liked:!1;this.renderLikes(e,s),this.renderComments(_(this.sceneId));const n=!t;this.inputEl.disabled=n,this.sendBtn.classList.toggle("disabled",n)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}const j=Object.freeze(Object.defineProperty({__proto__:null,CommunityPanel:K},Symbol.toStringTag,{value:"Module"}));export{j as C,q as F,J as f};
