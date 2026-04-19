var A=Object.defineProperty;var P=(l,e,t)=>e in l?A(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var o=(l,e,t)=>P(l,typeof e!="symbol"?e+"":e,t);import{l as I,a as z,g as L,t as R,b as O,c as N,d as $}from"./store-B83L8bDT.js";import{s as v}from"./index-mBoIt9Gn.js";const x=40,C=120,_="fcchat_history_v2",U="fcchat_session_v1",F="fcchat_scene_v1",D="fcchat_user_memory_v1";function E(l,e){const t=(e||"global").trim()||"global";return`${l}:${t}`}function M(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`fcchat_${Date.now()}_${Math.random().toString(36).slice(2,10)}`}function T(){return`msg_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}class K{constructor(e,t,s={}){o(this,"client");o(this,"context");o(this,"root");o(this,"header");o(this,"body");o(this,"list");o(this,"input");o(this,"sendBtn");o(this,"clearBtn");o(this,"recallBtn");o(this,"closeBtn");o(this,"statusLine");o(this,"contextBar");o(this,"audienceMenu");o(this,"workbench");o(this,"workbenchPanel");o(this,"reviewActions");o(this,"captionOverlay");o(this,"recallPanel");o(this,"dragging",!1);o(this,"dragOffsetX",0);o(this,"dragOffsetY",0);o(this,"isMobile",!1);o(this,"swipeStartY",0);o(this,"swipeActive",!1);o(this,"messages",[]);o(this,"isOpen",!1);o(this,"fabButton",null);o(this,"historyStorageKey");o(this,"sessionStorageKey");o(this,"sceneStorageKey");o(this,"userMemoryStorageKey");o(this,"sessionId");o(this,"userMemory",[]);o(this,"sceneUserMemory",[]);o(this,"sceneTurnAnchor",0);o(this,"contextVersion",0);o(this,"recallOpen",!1);o(this,"requestInFlight",!1);o(this,"isSpeaking",!1);o(this,"audienceMode","highschool");o(this,"audienceMenuOpen",!1);o(this,"lastAssistantMessageId",null);o(this,"snapTimer",null);o(this,"isDragging",!1);o(this,"startX",0);o(this,"startY",0);o(this,"startLeft",0);o(this,"startTop",0);o(this,"lastLeft",0);o(this,"lastTop",0);o(this,"moved",!1);o(this,"hasUserPlaced",!1);o(this,"captureCurrentViewImage");o(this,"handleDocumentPointerDown",e=>{if(!this.audienceMenuOpen)return;const t=e.target;t&&this.header.contains(t)||this.setAudienceMenuOpen(!1)});o(this,"typingTimer",null);o(this,"typingAbortToken",0);o(this,"statusTimer",null);this.client=e,this.context=t,this.captureCurrentViewImage=s.captureCurrentViewImage,this.historyStorageKey=E(_,t.museumId),this.sessionStorageKey=E(U,t.museumId),this.sceneStorageKey=E(F,t.museumId),this.userMemoryStorageKey=E(D,t.museumId),this.sessionId=this.loadSessionId(),this.userMemory=this.loadUserMemory();const n=this.loadStoredSceneId();this.mount(),this.injectStyles(),this.detectMobile(),this.restoreHistoryOrWelcome(),this.applySceneChange(n),this.persistCurrentSceneId()}destroy(){var e,t,s;this.stopTyping(!0),this.stopSpeaking(),this.clearStatusTimer(),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),this.snapTimer&&(window.clearTimeout(this.snapTimer),this.snapTimer=null),(e=this.root)==null||e.remove(),(t=this.fabButton)==null||t.remove(),this.fabButton=null,(s=this.captionOverlay)==null||s.remove()}updateContext(e){const t=this.context.sceneId;this.context={...this.context,...e},this.contextVersion+=1,this.applySceneChange(t),this.persistCurrentSceneId(),this.renderContextBar(),this.renderWorkbench()}detectMobile(){var s,n;const e=((s=window.matchMedia)==null?void 0:s.call(window,"(max-width: 768px)").matches)??!1,t=((n=window.matchMedia)==null?void 0:n.call(window,"(pointer: coarse)").matches)??!1;this.isMobile=e||t,this.root.dataset.mobile=this.isMobile?"1":"0"}mount(){this.root=document.createElement("div"),this.root.className="fcchat-root",this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-label","三馆学伴"),this.header=document.createElement("div"),this.header.className="fcchat-header";const e=document.createElement("div");e.className="fcchat-title",e.textContent="三馆学伴";const t=document.createElement("div");t.className="fcchat-header-right",this.clearBtn=document.createElement("button"),this.clearBtn.className="fcchat-btn fcchat-btn-ghost",this.clearBtn.type="button",this.clearBtn.addEventListener("click",()=>this.clear()),this.recallBtn=document.createElement("button"),this.recallBtn.className="fcchat-btn fcchat-btn-ghost",this.recallBtn.type="button",this.recallBtn.setAttribute("aria-label","查看会话回看"),this.recallBtn.setAttribute("aria-pressed","false"),this.recallBtn.addEventListener("click",()=>this.toggleRecallPanel()),this.closeBtn=document.createElement("button"),this.closeBtn.className="fcchat-btn fcchat-btn-ghost fcchat-close",this.closeBtn.type="button",this.closeBtn.setAttribute("aria-label","关闭"),this.closeBtn.textContent="×",this.closeBtn.addEventListener("click",()=>this.toggle()),t.appendChild(this.closeBtn);const s=document.createElement("div");s.className="fcchat-header-row",s.appendChild(e),s.appendChild(t),this.header.appendChild(s);const n=document.createElement("div");n.className="fcchat-disclaimer",n.textContent="AI 可能会出错，仅供参考，请以现场讲解为准。",this.header.appendChild(n),this.contextBar=document.createElement("div"),this.contextBar.className="fcchat-contextbar",this.header.appendChild(this.contextBar),this.audienceMenu=document.createElement("div"),this.audienceMenu.className="fcchat-audience-menu",this.audienceMenu.setAttribute("role","menu"),this.audienceMenu.hidden=!0,this.header.appendChild(this.audienceMenu),this.workbench=document.createElement("div"),this.workbench.className="fcchat-workbench",this.workbenchPanel=document.createElement("div"),this.workbenchPanel.className="fcchat-workbench-panel",this.reviewActions=document.createElement("div"),this.reviewActions.className="fcchat-workbench-actions",this.workbench.appendChild(this.workbenchPanel),this.captionOverlay=document.createElement("div"),this.captionOverlay.className="fcchat-caption-overlay",this.captionOverlay.hidden=!0,this.body=document.createElement("div"),this.body.className="fcchat-body",this.recallPanel=document.createElement("div"),this.recallPanel.className="fcchat-recall-panel",this.recallPanel.hidden=!0,this.body.appendChild(this.recallPanel),this.list=document.createElement("div"),this.list.className="fcchat-list",this.body.appendChild(this.list),this.statusLine=document.createElement("div"),this.statusLine.className="fcchat-status",this.statusLine.textContent="",this.body.appendChild(this.statusLine);const i=document.createElement("div");i.className="fcchat-inputbar",this.input=document.createElement("input"),this.input.className="fcchat-input",this.input.type="text",this.input.id="fcchat-message-input",this.input.name="message",this.input.autocomplete="off",this.input.placeholder="继续提问",this.input.addEventListener("keydown",c=>{c.key==="Enter"&&this.onSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="fcchat-btn fcchat-btn-primary",this.sendBtn.type="button",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.onSend()),i.appendChild(this.input),i.appendChild(this.sendBtn);const a=document.createElement("div");a.className="fcchat-composer",a.appendChild(i),this.root.appendChild(this.header),this.root.appendChild(this.workbench),this.root.appendChild(this.body),this.root.appendChild(a),document.body.appendChild(this.root),document.body.appendChild(this.captionOverlay),document.addEventListener("pointerdown",this.handleDocumentPointerDown),this.root.style.display="none",this.root.style.right="18px",this.root.style.bottom="18px",this.ensureToggleButton(),this.renderContextBar(),this.renderWorkbench(),this.header.addEventListener("mousedown",c=>this.onDragStart(c)),window.addEventListener("mousemove",c=>this.onDragMove(c)),window.addEventListener("mouseup",()=>this.onDragEnd()),this.header.addEventListener("pointerdown",c=>this.onSwipeStart(c),{passive:!1}),this.header.addEventListener("pointermove",c=>this.onSwipeMove(c),{passive:!1}),this.header.addEventListener("pointerup",c=>this.onSwipeEnd(c)),this.header.addEventListener("pointercancel",c=>this.onSwipeEnd(c)),window.addEventListener("resize",()=>this.detectMobile()),this.syncActionButtonsDisabled()}renderContextBar(){if(!this.contextBar)return;this.contextBar.innerHTML="",this.audienceMenu.innerHTML="";const e=document.createElement("span");e.className="fcchat-context-pill",e.textContent=this.context.museumName||"当前展馆";const t=document.createElement("span");t.className="fcchat-context-pill",t.textContent=this.context.sceneTitle||"当前点位";const s=document.createElement("button");s.type="button",s.className="fcchat-context-pill",s.textContent=this.getAudienceModeLabel(),s.setAttribute("aria-haspopup","menu"),s.setAttribute("aria-expanded",this.audienceMenuOpen?"true":"false"),s.addEventListener("click",()=>this.toggleAudienceMenu()),this.contextBar.appendChild(e),this.contextBar.appendChild(t),this.contextBar.appendChild(s),[{label:"中学版",value:"highschool"},{label:"教师版",value:"teacher"},{label:"英语版",value:"english"},{label:"通用版",value:"default"}].forEach(i=>{const a=document.createElement("button");a.type="button",a.className="fcchat-chip fcchat-chip-audience",a.textContent=i.label,a.setAttribute("role","menuitemradio"),a.setAttribute("aria-checked",this.audienceMode===i.value?"true":"false"),a.classList.toggle("is-active",this.audienceMode===i.value),a.addEventListener("click",()=>this.selectAudienceMode(i.value)),this.audienceMenu.appendChild(a)}),this.setAudienceMenuOpen(this.audienceMenuOpen)}renderWorkbench(){if(!this.workbench)return;this.workbench.classList.add("is-feedback-only"),this.workbenchPanel.hidden=!1,this.workbenchPanel.innerHTML="",this.workbenchPanel.className="fcchat-feedback-strip",this.workbenchPanel.classList.toggle("is-passive",!this.shouldShowFeedbackActions());const e=document.createElement("span");if(e.className="fcchat-feedback-label",e.textContent="学习反馈",this.workbenchPanel.appendChild(e),this.shouldShowFeedbackActions()){this.renderReviewWorkbench(),this.workbenchPanel.appendChild(this.reviewActions);return}const t=document.createElement("span");t.className="fcchat-feedback-hint",t.textContent="提问后可复盘",this.workbenchPanel.appendChild(t)}renderReviewWorkbench(){this.reviewActions.innerHTML="",[{label:"行后复盘",prompt:this.buildReviewCardPrompt(),responseKind:"review-card"},{label:"推荐回看点位",prompt:this.buildReviewRoutePrompt(),responseKind:"route-card"}].forEach(t=>{const s=this.createActionChip(t.label,"fcchat-chip fcchat-chip-review");s.addEventListener("click",()=>void this.sendPresetPrompt({displayText:t.label,prompt:t.prompt,responseKind:t.responseKind,fallbackKind:t.responseKind})),this.reviewActions.appendChild(s)})}setAudienceMenuOpen(e){var t;this.audienceMenuOpen=e,this.audienceMenu&&(this.audienceMenu.hidden=!e,this.audienceMenu.classList.toggle("is-open",e)),(t=this.contextBar)==null||t.querySelectorAll("button.fcchat-context-pill").forEach(s=>{const n=e&&s.textContent===this.getAudienceModeLabel();s.setAttribute("aria-expanded",n?"true":"false"),s.classList.toggle("is-active",n)})}toggleAudienceMenu(){this.setAudienceMenuOpen(!this.audienceMenuOpen)}selectAudienceMode(e){this.audienceMode=e,this.setAudienceMenuOpen(!1),this.renderContextBar(),this.announceStatus(`已切换为${this.getAudienceModeLabel()}，仅影响下一次回答。`)}cycleAudienceMode(){const e=["highschool","teacher","english","default"],t=Math.max(0,e.indexOf(this.audienceMode));this.audienceMode=e[(t+1)%e.length],this.renderContextBar()}createActionChip(e,t){const s=document.createElement("button");return s.type="button",s.className=t,s.textContent=e,s}buildWelcomeText(){return`你现在在“${this.context.sceneTitle||"当前点位"}”。先点底部“拍照”看这一幕，或点“智能讲解”听讲解。`}buildScenePrompt(e){const t=this.context.sceneTitle||"当前点位",s=this.context.museumName||"当前展馆";return e==="view"?`我现在正在 ${s} 的“${t}”。请围绕我眼前这一幕，用 3 到 4 句话告诉我先看什么、为什么值得看。`:e==="story"?`请围绕 ${s} 的“${t}”，用适合现场导览的方式讲清这个点位主要在讲什么。`:`请结合 ${s} 的“${t}”，告诉我这里主要体现了什么精神线索，并说明它和今天有什么关系。`}buildPhotoPrompt(){const e=this.context.sceneTitle||"当前点位";return`我现在正在 ${this.context.museumName||"当前展馆"} 的“${e}”，并附上了我当前视角的截图。请先根据这张图判断我眼前最值得先看的内容，再用 3 到 4 句话说明为什么值得看。`}buildNarrationPrompt(){const e=this.context.sceneTitle||"当前点位";return`请为 ${this.context.museumName||"当前展馆"} 的“${e}”生成一段约 30 秒的陪伴式讲解，口语化一些，适合直接播报。`}buildSceneFallbackText(e){const t=this.context.sceneTitle||"当前点位",s=this.context.museumName||"当前展馆";return this.audienceMode==="english"?e==="scene-view"?`You are now at ${t} in ${s}. Start by noticing the space in front of you and ask what kind of first impression this scene is trying to create. Then look for the clue that tells you who is being remembered here and why this stop matters.`:e==="scene-story"?`At ${t} in ${s}, this stop works like an opening frame. It helps visitors enter the historical setting, identify the central figure, and understand why the later exhibits carry weight.`:"The spirit here is responsibility turned into action. This scene is not only about a place; it invites you to ask how personal choices become part of a larger national story.":this.audienceMode==="teacher"?e==="scene-view"?`现在你在 ${s} 的“${t}”。如果带队，可以先请学生观察入口空间最显眼的线索，再追问：这里为什么适合做整馆叙事的起点。先让大家说看到什么，再补充史实，效果会更稳。`:e==="scene-story"?`“${t}”适合先用半分钟交代它在整馆里的功能：它不是单独的景，而是在把人物、时代和后续展陈的主线铺开。接下来可顺势追问学生，这个点位最先想让我们记住什么。`:"这里适合提炼的精神线索是：把家国责任落实到具体行动。带队讲解时，不必先下结论，可以先让学生从空间、文字和人物处境里自己归纳，再做提升。":this.audienceMode==="highschool"?e==="scene-view"?`你现在看到的是 ${s} 的“${t}”。先把它当成整段故事的开场：别急着记结论，先看这里最想让你注意的空间和细节，再想它为什么被放在这里。`:e==="scene-story"?"这个点位主要不是在堆信息，而是在告诉你：后面整座馆会围绕什么人物和什么时代问题展开。抓住“为什么从这里开始”，后面的内容会更容易串起来。":"这里体现出来的精神，不是抽象口号，而是人在关键时刻怎么做选择。你可以带着一个问题继续看：如果换成自己站在那个时代，会不会也能做出同样的决定。":e==="scene-view"?`你现在来到 ${s} 的“${t}”。先别急着往里走，先看这里最先进入视线的空间和细节，它们通常在告诉你这段历史该从哪里开始理解。`:e==="scene-story"?`“${t}”更像这座馆的叙事入口。它先把人物、时代和后续展陈的观看方式定下来，让你知道后面不是零散陈列，而是一条可以一路追下去的故事线。`:"这里最值得抓住的精神线索，是把家国责任落到具体选择上。它提醒我们，历史并不只是被讲述出来的，也是人在关键时刻一步步做出来的。"}buildNarrationFallbackText(){const e=this.context.sceneTitle||"当前点位",t=this.context.museumName||"当前展馆";return this.audienceMode==="english"?`We are now at ${e} in ${t}. Treat this as the opening scene of the museum, not just a doorway. As you move on, keep one question in mind: what does this place want you to remember first about the person, the time, and the choices that followed?`:this.audienceMode==="teacher"?`现在我们来到 ${t} 的“${e}”。如果你在带队，可以先请学生用十秒钟说出这里最先看到的线索，再追问它为什么适合作为整馆叙事的开场。带着“这里先让我们理解什么”继续往里走，后面的讲解会更容易组织起来。`:this.audienceMode==="highschool"?`现在我们来到 ${t} 的“${e}”。先把这里当成故事开头，不用急着背知识点，先看它最想让你注意什么。带着“为什么从这里开始讲”这个问题继续往里走，你会更容易把整座馆的线索连起来。`:`现在我们来到 ${t} 的“${e}”。先别急着往里走，先把这里当成一段历史的开场：它在提醒我们，后面的每个点位都不是孤立陈列，而是在把人物、时代和选择慢慢铺开。带着“这里为什么值得先看”这个问题继续往里走，你会更容易把整座馆串起来。`}playPresetNarration(){const e=this.buildNarrationFallbackText();this.speakText(e),this.captionOverlay.textContent=e,this.captionOverlay.hidden=!1}askCurrentView(){var t;this.isOpen||this.show();const e=((t=this.captureCurrentViewImage)==null?void 0:t.call(this))??null;this.sendPresetPrompt({displayText:"拍照",prompt:e!=null&&e.dataUrl?this.buildPhotoPrompt():this.buildScenePrompt("view"),fallbackKind:"scene-view",imageAttachment:e?{type:"image",dataUrl:e.dataUrl,mimeType:e.mimeType||"image/jpeg",width:e.width,height:e.height,sceneId:this.context.sceneId,sceneTitle:this.context.sceneTitle}:null})}buildReviewCardPrompt(){return`请根据我们刚才围绕 ${this.context.museumName||"当前展馆"} 的交流，给我一张简短的行后复盘卡：包括 3 个记住点、1 个值得再想的问题、1 条现实启发。`}buildReviewRoutePrompt(){const e=this.context.museumName||"当前展馆",t=this.context.sceneTitle||"当前点位";return`如果我在 ${e} 看完“${t}”后还想继续，请推荐 2 到 3 个值得回看或继续走的点位，并说明每个点位应该带着什么问题去看。`}getAudienceModeLabel(){switch(this.audienceMode){case"highschool":return"中学版";case"teacher":return"教师版";case"english":return"英语版";default:return"通用版"}}getCardTitle(e){if(e==="review-card")return"行后复盘";if(e==="route-card")return"推荐回看点位"}isStructuredCardKind(e){return e==="review-card"||e==="route-card"}buildFallbackCardText(e){const t=this.context.museumName||"当前展馆",s=this.context.sceneTitle||"当前点位";return e==="review-card"?["说明：云端讲解暂不可用，以下为当前点位的本地示意卡。","记住点",`1. “${s}”是你进入 ${t} 当前叙事的重要落点，先抓住它在整馆里的位置。`,"2. 先看最直观的空间线索，再回到人物、事件和时代背景，理解会更稳。","3. 把“这个点位想让我记住什么”作为主问题，后续场景会更容易串起来。","值得再想的问题",`1. 如果你只给同伴 30 秒介绍“${s}”，你会先保留哪一个细节？`,"现实启发","1. 面对历史现场时，先看证据、再下判断，比直接背结论更容易形成自己的理解。","提示：云端恢复后，可再次点击入口生成实时讲解卡。"].join(`
`):["说明：云端讲解暂不可用，以下为当前点位的本地示意路线卡。","推荐回看点位",`1. 先回看“${s}”，确认它在 ${t} 整体叙事里承担的是开场、转折还是落点。`,"2. 再找一个能补充人物行动或时代背景的点位，把单点观察串成完整故事线。","建议问题","1. 这个点位和我刚看过的内容，哪一处在回答“为什么发生”，哪一处在回答“如何被记住”？","2. 如果带着同学继续走，下一站最值得让大家停下来的细节是什么？","下一步建议","1. 带着一个具体问题继续走，比泛泛地看下一个点位更容易形成记忆。","提示：云端恢复后，可再次点击入口生成实时推荐卡。"].join(`
`)}buildPresetFallbackText(e){return e==="review-card"||e==="route-card"?this.buildFallbackCardText(e):e==="narration"?this.buildNarrationFallbackText():this.buildSceneFallbackText(e)}getFallbackStatusText(e){return e==="narration"?"云端讲解暂不可用，已切换为本地陪伴式讲解。":e==="review-card"||e==="route-card"?"云端讲解暂不可用，已切换为本地示意卡。":"云端讲解暂不可用，已切换为本地示意讲解。"}hide(){this.isOpen&&(this.isOpen=!1,this.stopTyping(!0),this.setAudienceMenuOpen(!1),this.toggleRecallPanel(!1),this.root.style.display="none",this.root.classList.remove("fcchat-open"),this.fabButton&&this.fabButton.classList.add("fcchat-docked"),document.body.classList.remove("fcchat-open"),this.updateOverlayState())}show(){this.isOpen||(this.isOpen=!0,this.detectMobile(),this.root.style.display="flex",this.root.classList.add("fcchat-open"),this.fabButton&&this.fabButton.classList.remove("fcchat-docked"),document.body.classList.add("fcchat-open"),this.scrollToBottom(),this.isMobile||this.input.focus(),this.updateOverlayState())}toggle(){this.isOpen?this.hide():this.show()}updateOverlayState(){!!(document.querySelector(".vr-modal-overlay")||document.querySelector(".vr-guide-drawer.open")||this.root&&this.root.style.display==="flex")?document.documentElement.classList.add("vr-overlay-open"):document.documentElement.classList.remove("vr-overlay-open")}getSafeBounds(){const e=window.innerWidth,t=window.innerHeight,s=this.fabButton;if(!s)return{minLeft:8,maxLeft:e-52,minTop:12,maxTop:t-64};const n=s.getBoundingClientRect(),i=n.width,a=n.height,c=12+(this.isMobile?56:12),h=12+(this.isMobile?96:12);return{minLeft:8,maxLeft:e-i-8,minTop:c,maxTop:t-a-h}}clampPos(e,t){const s=this.getSafeBounds();return{left:Math.max(s.minLeft,Math.min(e,s.maxLeft)),top:Math.max(s.minTop,Math.min(t,s.maxTop))}}snapToEdge(){const e=this.fabButton;if(!e)return;const t=this.getSafeBounds(),s=e.getBoundingClientRect(),n=s.left,i=s.top,a=n-t.minLeft,c=t.maxLeft-n,h=i-t.minTop,u=t.maxTop-i,d=Math.min(a,c,h,u);let p=n,b=i;d===a?p=t.minLeft:d===c?p=t.maxLeft:d===h?b=t.minTop:d===u&&(b=t.maxTop),e.style.left=`${p}px`,e.style.top=`${b}px`,e.style.right="auto",e.style.bottom="auto",localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:p,top:b})),setTimeout(()=>{e.classList.remove("fcchat-snapping")},220)}ensureToggleButton(){if(this.fabButton)return;const e=new URLSearchParams(location.search);if(e.get("reset_ui")==="1"){localStorage.removeItem("vr_fcchat_dock_state"),e.delete("reset_ui");const n=location.pathname+(e.toString()?"?"+e.toString():"")+location.hash;history.replaceState({},"",n)}const t=document.createElement("button");t.id="fcchat-fab",t.className="fcchat-fab fcchat-docked",t.type="button",t.setAttribute("aria-label","打开三馆学伴"),t.innerHTML=`<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`,t.addEventListener("pointerdown",n=>this.onFabPointerDown(n),{passive:!1}),t.addEventListener("pointermove",n=>this.onFabPointerMove(n),{passive:!1}),t.addEventListener("pointerup",n=>this.onFabPointerUp(n),{passive:!1}),t.addEventListener("pointercancel",n=>this.onFabPointerUp(n),{passive:!1}),this.fabButton=t,document.body.appendChild(t);const s=localStorage.getItem("fcchat_fab_pos_v1");if(s)try{const n=JSON.parse(s);t.style.left=`${n.left}px`,t.style.top=`${n.top}px`,t.style.right="auto",t.style.bottom="auto",t.classList.remove("fcchat-docked"),this.hasUserPlaced=!0}catch{}!this.hasUserPlaced&&!this.isOpen&&t.classList.add("fcchat-docked"),this.maybeShowFirstVisitHint()}maybeShowFirstVisitHint(){const e="fcchat_first_hint_shown";if(sessionStorage.getItem(e))return;sessionStorage.setItem(e,"1");const t=this.fabButton;if(!t)return;const s=document.createElement("div");s.className="fcchat-first-hint",s.textContent="我是三馆学伴，为你解疑答惑😉",document.body.appendChild(s);const n=()=>{const i=t.getBoundingClientRect();s.style.left=`${i.left-8}px`,s.style.top=`${i.top+i.height/2}px`};n(),window.addEventListener("resize",n),setTimeout(()=>{s.classList.add("is-hide"),setTimeout(()=>{window.removeEventListener("resize",n),s.remove()},300)},1e4)}onFabPointerDown(e){const t=this.fabButton;if(!t)return;e.preventDefault(),this.isDragging=!1,this.moved=!1,this.startX=e.clientX,this.startY=e.clientY;const s=t.getBoundingClientRect(),n=parseFloat(t.style.left||""),i=parseFloat(t.style.top||"");this.startLeft=Number.isFinite(n)?n:s.left,this.startTop=Number.isFinite(i)?i:s.top;try{t.setPointerCapture(e.pointerId)}catch{}t.classList.remove("fcchat-docked")}onFabPointerMove(e){const t=this.fabButton;if(!t)return;e.preventDefault();const s=e.clientX-this.startX,n=e.clientY-this.startY;if(!this.isDragging){if(Math.abs(s)+Math.abs(n)<4)return;this.isDragging=!0,t.classList.add("fcchat-dragging")}const i=this.clampPos(this.startLeft+s,this.startTop+n);this.lastLeft=i.left,this.lastTop=i.top,t.style.left=`${this.lastLeft}px`,t.style.top=`${this.lastTop}px`,t.style.right="auto",t.style.bottom="auto",this.hasUserPlaced=!0}onFabPointerUp(e){const t=this.fabButton;if(t){e.preventDefault();try{t.releasePointerCapture(e.pointerId)}catch{}if(!this.isDragging){this.toggle();return}this.isDragging=!1,t.classList.remove("fcchat-dragging");try{localStorage.setItem("fcchat_fab_pos_v1",JSON.stringify({left:this.lastLeft,top:this.lastTop}))}catch{}this.snapTimer&&window.clearTimeout(this.snapTimer),t.classList.add("fcchat-snapping"),this.snapTimer=window.setTimeout(()=>{this.snapToEdge(),this.snapTimer=null},5e3)}}onDragStart(e){if(this.isMobile||e.target.closest("button"))return;this.dragging=!0;const s=this.root.getBoundingClientRect();this.dragOffsetX=e.clientX-s.left,this.dragOffsetY=e.clientY-s.top,this.root.style.right="auto",this.root.style.bottom="auto",this.root.style.left=s.left+"px",this.root.style.top=s.top+"px"}onDragMove(e){if(!this.dragging||this.isMobile)return;const t=window.innerWidth,s=window.innerHeight,n=this.root.getBoundingClientRect();let i=e.clientX-this.dragOffsetX,a=e.clientY-this.dragOffsetY;i=Math.max(8,Math.min(i,t-n.width-8)),a=Math.max(8,Math.min(a,s-n.height-8)),this.root.style.left=i+"px",this.root.style.top=a+"px"}onDragEnd(){this.dragging=!1}onSwipeStart(e){!this.isMobile||e.target.closest("button")||(this.swipeActive=!0,this.swipeStartY=e.clientY,this.root.classList.add("is-swiping"),e.preventDefault(),this.header.setPointerCapture(e.pointerId))}onSwipeMove(e){if(!this.isMobile||!this.swipeActive)return;e.preventDefault();const t=e.clientY-this.swipeStartY;if(t<=0){this.root.style.transform="";return}this.root.style.transform=`translateY(${Math.min(t,200)}px)`}onSwipeEnd(e){if(!this.isMobile||!this.swipeActive)return;const s=(this.root.style.transform||"").match(/translateY\(([-\d.]+)px\)/),n=s?Number(s[1]):0;this.swipeActive=!1,this.root.classList.remove("is-swiping"),this.root.style.transform="",e&&this.header.releasePointerCapture(e.pointerId),n>=90&&this.hide()}clear(){this.stopTyping(!0),this.stopSpeaking(),this.setAudienceMenuOpen(!1),this.messages=[],this.userMemory=[],this.sceneUserMemory=[],this.sceneTurnAnchor=0,this.lastAssistantMessageId=null,this.list.innerHTML="",this.statusLine.textContent="",this.sessionId=M(),this.persistSessionId(),this.persistMessages(),this.persistUserMemory(),this.ensureWelcome(),this.renderWorkbench(),this.renderContextBar(),this.renderRecallPanel()}loadSessionId(){try{const t=localStorage.getItem(this.sessionStorageKey);if(t&&t.trim())return t}catch{}const e=M();try{localStorage.setItem(this.sessionStorageKey,e)}catch{}return e}loadStoredSceneId(){var e;try{return((e=localStorage.getItem(this.sceneStorageKey))==null?void 0:e.trim())||""}catch{return""}}persistSessionId(){try{localStorage.setItem(this.sessionStorageKey,this.sessionId)}catch{}}persistCurrentSceneId(){try{localStorage.setItem(this.sceneStorageKey,this.context.sceneId||"")}catch{}}applySceneChange(e){const t=this.context.sceneId||"";if(!t||t===e)return;this.sceneTurnAnchor=this.messages.length,this.sceneUserMemory=[],this.sessionId=M(),this.persistSessionId(),this.stopSpeaking(),this.setAudienceMenuOpen(!1),(this.messages.some(n=>n.role==="user")||this.messages.filter(n=>n.role==="assistant").length>1)&&this.addSceneDivider(this.context.sceneTitle||"当前点位"),this.statusLine.textContent="",this.renderContextBar(),this.renderWorkbench()}loadUserMemory(){try{const e=localStorage.getItem(this.userMemoryStorageKey);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.map(s=>typeof s=="string"?this.normalizeText(s).trim():"").filter(s=>!!s).slice(-C):[]}catch{return[]}}persistUserMemory(){try{localStorage.setItem(this.userMemoryStorageKey,JSON.stringify(this.userMemory.slice(-C)))}catch{}}rememberUserMessage(e){const t=this.normalizeText(e).trim();t&&this.userMemory[this.userMemory.length-1]!==t&&(this.userMemory.push(t),this.userMemory.length>C&&(this.userMemory=this.userMemory.slice(-C)),this.persistUserMemory())}isConversationMessage(e){return e.role==="assistant"||e.role==="user"}getRequestText(e){return this.normalizeText(e.requestText??e.text).trim()}buildRequestContext(e){const t=this.normalizeText(e||"").trim(),s=this.userMemory.filter(p=>p!==t),n=this.sceneUserMemory.filter(p=>p!==t),i=[...s,...n].slice(-30),a=this.messages.filter(p=>this.isConversationMessage(p)),h=this.messages.slice(this.sceneTurnAnchor).filter(p=>this.isConversationMessage(p)).slice(-8).map(p=>({role:p.role,text:this.getRequestText(p)})).filter(p=>!!p.text),u=[...a].reverse().find(p=>p.role==="user"&&!!this.getRequestText(p)&&this.getRequestText(p)!==t),d=[...a].reverse().find(p=>p.role==="assistant"&&!!this.getRequestText(p));return{...this.context,userMemory:i,lastUserUtterance:u?this.getRequestText(u):"",lastAssistantReply:d?this.getRequestText(d):"",recentTurns:h}}restoreHistoryOrWelcome(){let e=!1;try{const t=localStorage.getItem(this.historyStorageKey);if(t){const s=JSON.parse(t);if(Array.isArray(s)){const n=s.map(i=>({id:typeof(i==null?void 0:i.id)=="string"&&i.id.trim()?i.id.trim():T(),role:(i==null?void 0:i.role)==="assistant"?"assistant":(i==null?void 0:i.role)==="system"?"system":"user",text:typeof(i==null?void 0:i.text)=="string"?i.text.trim():"",requestText:typeof(i==null?void 0:i.requestText)=="string"?i.requestText.trim():void 0,kind:(i==null?void 0:i.kind)==="review-card"||(i==null?void 0:i.kind)==="route-card"?i.kind:void 0,cardTitle:typeof(i==null?void 0:i.cardTitle)=="string"?i.cardTitle.trim():void 0})).filter(i=>!!i.text);n.length>0&&(this.messages=n.slice(-x),this.lastAssistantMessageId=this.getLatestAssistantMessageId(),this.renderMessages(),e=!0)}}}catch{}e||(this.ensureWelcome(),this.persistMessages()),this.userMemory.length===0&&this.messages.length>0&&(this.userMemory=this.messages.filter(t=>t.role==="user").map(t=>this.normalizeText(t.text).trim()).filter(t=>!!t).slice(-C),this.persistUserMemory()),this.renderRecallPanel()}renderMessages(){var t,s;this.list.innerHTML="";const e=this.messages.length===1&&((t=this.messages[0])==null?void 0:t.role)==="assistant"&&((s=this.messages[0])==null?void 0:s.variant)==="welcome";this.list.classList.toggle("is-welcome-only",e),this.lastAssistantMessageId=this.getLatestAssistantMessageId();for(const n of this.messages)this.list.appendChild(this.createMessageRow(n));this.scrollToBottom(),this.renderRecallPanel()}persistMessages(){try{localStorage.setItem(this.historyStorageKey,JSON.stringify(this.messages.slice(-x)))}catch{}}ensureWelcome(){this.messages.length>0||this.addMessage("assistant",this.buildWelcomeText(),void 0,{variant:"welcome"})}shouldShowFeedbackActions(){return this.messages.some(e=>e.role==="user")}setBusy(e,t=""){t&&this.clearStatusTimer(),this.requestInFlight=e,this.sendBtn.disabled=e,this.input.disabled=e,this.statusLine.textContent=t,this.syncActionButtonsDisabled()}clearStatusTimer(){this.statusTimer!=null&&(window.clearTimeout(this.statusTimer),this.statusTimer=null)}announceStatus(e,t=2600){this.clearStatusTimer(),this.statusLine.textContent=e,t>0&&(this.statusTimer=window.setTimeout(()=>{!this.requestInFlight&&this.statusLine.textContent===e&&(this.statusLine.textContent=""),this.statusTimer=null},t))}syncActionButtonsDisabled(){[".fcchat-workbench-panel button",".fcchat-feedback-strip button",".fcchat-followup-actions button"].forEach(t=>{this.root.querySelectorAll(t).forEach(s=>{s.disabled=this.requestInFlight})})}stopSpeaking(){typeof window<"u"&&"speechSynthesis"in window&&window.speechSynthesis.cancel(),this.isSpeaking=!1,this.captionOverlay&&(this.captionOverlay.hidden=!0),this.syncActionButtonsDisabled()}speakText(e){if(typeof window>"u"||!("speechSynthesis"in window))return;this.stopSpeaking();const t=new SpeechSynthesisUtterance(e);t.lang=this.audienceMode==="english"?"en-US":"zh-CN",t.rate=this.audienceMode==="teacher"?.95:1,t.onend=()=>{this.isSpeaking=!1,this.syncActionButtonsDisabled()},t.onerror=()=>{this.isSpeaking=!1,this.syncActionButtonsDisabled()},this.isSpeaking=!0,this.syncActionButtonsDisabled(),window.speechSynthesis.speak(t)}rememberSceneMessage(e){const t=this.normalizeText(e).trim();t&&this.sceneUserMemory[this.sceneUserMemory.length-1]!==t&&(this.sceneUserMemory.push(t),this.sceneUserMemory.length>12&&(this.sceneUserMemory=this.sceneUserMemory.slice(-12)))}getAudienceInstruction(){switch(this.audienceMode){case"highschool":return"请用适合中学生研学的方式回答，尽量具体、易懂、有启发。";case"teacher":return"请用适合教师带队讲解的方式回答，突出教学组织和可讨论的问题。";case"english":return"Please answer in natural English for a museum guide context.";default:return"请用自然、克制、适合第一次参观者理解的方式回答。"}}composeQuestion(e){return`${this.getAudienceInstruction()}

${e}`}async sendPresetPrompt({displayText:e,prompt:t,responseKind:s,fallbackKind:n,speakAfter:i,imageAttachment:a}){this.requestInFlight||await this.sendQuestion(t,{displayText:e,responseKind:s,fallbackKind:n,speakAfter:i,imageAttachment:a})}normalizeText(e){return(e??"").replace(/^\s+/,"")}isResponseSectionTitle(e){return/^(记住点|值得再想的问题|现实启发|推荐回看点位|建议问题|下一步建议|带着什么问题去看)\s*[：:]?$/.test(e)}isResponseListItem(e){return/^([0-9一二三四五六七八九十]+[\.、]|[-•·])\s*/.test(e)}cleanResponseListItem(e){return e.replace(/^([0-9一二三四五六七八九十]+[\.、]|[-•·])\s*/,"").trim()}isResponseNote(e){return/^(说明|提示)\s*[：:]/.test(e)}buildStructuredResponseCardBody(e){const t=document.createElement("div");t.className="fcchat-response-card-body";const s=this.normalizeText(e).split(/\n+/).map(a=>a.trim()).filter(Boolean);if(s.length===0){const a=document.createElement("p");return a.textContent="",t.appendChild(a),t}let n=null;const i=()=>{n=null};return s.forEach(a=>{if(this.isResponseSectionTitle(a)){i();const h=document.createElement("div");h.className="fcchat-response-section-title",h.textContent=a.replace(/[：:]$/,""),t.appendChild(h);return}if(this.isResponseListItem(a)){n||(n=document.createElement("ul"),n.className="fcchat-response-list",t.appendChild(n));const h=document.createElement("li");h.className="fcchat-response-list-item",h.textContent=this.cleanResponseListItem(a),n.appendChild(h);return}if(this.isResponseNote(a)){i();const h=document.createElement("div");h.className="fcchat-response-note",h.textContent=a,t.appendChild(h);return}i();const c=document.createElement("p");c.textContent=a,t.appendChild(c)}),t}getLatestConversationMessageId(){const e=this.messages[this.messages.length-1];return!e||!this.isConversationMessage(e)?null:e.id}getLatestAssistantMessageId(){const e=[...this.messages].reverse().find(t=>t.role==="assistant");return(e==null?void 0:e.id)??null}shouldShowFollowupActions(e){return e.role==="assistant"&&!this.requestInFlight&&this.lastAssistantMessageId===e.id&&this.getLatestConversationMessageId()===e.id}shuffleReplyPrompts(e){const t=[...e];for(let s=t.length-1;s>0;s-=1){const n=Math.floor(Math.random()*(s+1));[t[s],t[n]]=[t[n],t[s]]}return t}createFollowupActions(e){const t=document.createElement("div");t.className="fcchat-followup-actions";const s=this.shuffleReplyPrompts([{label:"这个点位讲了什么",prompt:this.buildScenePrompt("story"),fallbackKind:"scene-story"},{label:"这里体现了什么精神",prompt:this.buildScenePrompt("spirit"),fallbackKind:"scene-spirit"},{label:"回顾上文",prompt:"请先用三句话回顾我们刚才已经讲到的重点，再继续回答。"}]);return(e.variant==="welcome"?s.filter(a=>a.label!=="回顾上文").map(a=>({...a,label:a.label==="这个点位讲了什么"?"看这处在讲什么":a.label==="这里体现了什么精神"?"看这处体现什么精神":a.label})):s).forEach(a=>{const c=document.createElement("button");c.type="button",c.className="fcchat-chip fcchat-chip-secondary",c.textContent=a.label,c.addEventListener("click",()=>void this.sendPresetPrompt({displayText:a.label,prompt:a.prompt,fallbackKind:"fallbackKind"in a?a.fallbackKind:void 0})),t.appendChild(c)}),e.variant==="welcome"||[{label:"重新生成",action:"retry"},{label:"换个版本",action:"version"}].forEach(a=>{const c=document.createElement("button");c.type="button",c.className="fcchat-chip fcchat-chip-secondary",c.textContent=a.label,c.addEventListener("click",()=>{a.action==="version"&&this.cycleAudienceMode();const h=[...this.messages].reverse().find(d=>d.role==="user"),u=h?this.getRequestText(h):a.label;this.sendPresetPrompt({displayText:a.label,prompt:u})}),t.appendChild(c)}),t}createMessageRow(e){const t=document.createElement("div");if(t.className=e.role==="system"?"fcchat-row is-system":`fcchat-row ${e.role==="user"?"is-user":"is-assistant"}`,e.role==="system"){const i=document.createElement("div");return i.className="fcchat-scene-divider",i.textContent=this.normalizeText(e.text),t.appendChild(i),t}const s=document.createElement("div");if(s.className="fcchat-message-stack",e.role==="assistant"&&e.kind&&e.kind!=="text"){const i=document.createElement("div");i.className=`fcchat-response-card ${e.kind}`;const a=document.createElement("div");return a.className="fcchat-response-card-title",a.textContent=e.cardTitle||this.getCardTitle(e.kind)||"学习反馈",i.appendChild(a),i.appendChild(this.buildStructuredResponseCardBody(e.text)),s.appendChild(i),this.shouldShowFollowupActions(e)&&s.appendChild(this.createFollowupActions(e)),t.appendChild(s),t}const n=document.createElement("div");return n.className=`fcchat-bubble ${e.role==="user"?"bubble-user":"bubble-assistant"}`,n.textContent=this.normalizeText(e.text),s.appendChild(n),this.shouldShowFollowupActions(e)&&s.appendChild(this.createFollowupActions(e)),t.appendChild(s),t}addMessage(e,t,s=t,n={}){const i=this.normalizeText(t),a=this.normalizeText(s),c={id:T(),role:e,text:i,kind:n.kind,cardTitle:n.cardTitle,variant:n.variant};e!=="system"&&(c.requestText=a),this.messages.push(c),this.messages.length>x&&(this.messages=this.messages.slice(-x)),c.role==="assistant"&&(this.lastAssistantMessageId=c.id),this.renderMessages(),this.persistMessages(),this.renderRecallPanel()}addSceneDivider(e){this.addMessage("system",`已切换到：${e}`)}toggleRecallPanel(e){const t=typeof e=="boolean"?e:!this.recallOpen;this.recallOpen=t,this.body.classList.toggle("is-recall-open",t),this.recallPanel.hidden=!t,this.list.hidden=t,this.statusLine.hidden=t,this.recallBtn.setAttribute("aria-pressed",t?"true":"false"),this.recallBtn.classList.toggle("is-active",t),t?this.renderRecallPanel():this.scrollToBottom()}renderRecallPanel(){if(!this.recallPanel)return;this.recallPanel.innerHTML="";const e=this.messages.filter(t=>t.role!=="system").map(t=>({role:t.role,text:this.normalizeText(t.text).trim()})).filter(t=>!!t.text).slice(-12).reverse();if(e.length===0){const t=document.createElement("div");t.className="fcchat-recall-empty",t.textContent="暂无可回顾内容，先聊一句吧。",this.recallPanel.appendChild(t);return}e.forEach(t=>{const s=document.createElement("button");s.type="button",s.className=`fcchat-recall-card ${t.role==="user"?"is-user":"is-assistant"}`;const n=document.createElement("span");n.className="fcchat-recall-role",n.textContent=t.role==="user"?"你":"学伴";const i=document.createElement("span");i.className="fcchat-recall-text",i.textContent=t.text.length>96?`${t.text.slice(0,96)}...`:t.text,s.appendChild(n),s.appendChild(i),s.addEventListener("click",()=>{this.input.value=t.text,this.isOpen||this.show(),this.isMobile||this.input.focus()}),this.recallPanel.appendChild(s)})}addAssistantBubbleLoading(){const e=document.createElement("div");e.className="fcchat-row is-assistant",e.dataset.loading="1";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.innerHTML='<span class="fcchat-typing"><span></span><span></span><span></span></span>',e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),{row:e,bubble:t}}addAssistantBubbleEmpty(){const e=document.createElement("div");e.className="fcchat-row is-assistant";const t=document.createElement("div");return t.className="fcchat-bubble bubble-assistant",t.textContent="",e.appendChild(t),this.list.appendChild(e),this.scrollToBottom(),t}replaceLoadingWithEmpty(e){e.removeAttribute("data-loading");const t=e.querySelector(".fcchat-bubble");return t&&(t.innerHTML="",t.textContent=""),t}scrollToBottom(){this.list.scrollTop=this.list.scrollHeight}stopTyping(e){this.typingAbortToken++,this.typingTimer!=null&&(window.clearTimeout(this.typingTimer),this.typingTimer=null)}async typewriterRender(e,t){const s=++this.typingAbortToken,n=this.normalizeText(t),i=n.length;let a=1200;i<=120?a=900+Math.floor(Math.random()*400):i<=400?a=1800+Math.floor(Math.random()*800):a=3e3+Math.floor(Math.random()*1e3);let c=0;const h=performance.now();return await new Promise(u=>{const d=()=>{if(s!==this.typingAbortToken){e.textContent=n,this.scrollToBottom(),u();return}const p=performance.now()-h,b=i-c;if(p>=a||b<=0){e.textContent=n,this.scrollToBottom(),u();return}const f=c/Math.max(1,i);let m=1;const r=Math.random();f<.15?m=r<.75?1:2:f<.7?m=r<.35?2:r<.75?3:4:m=r<.5?2:3,m=Math.min(m,b);const g=n.slice(0,c+m);c+=m,e.textContent=g,this.scrollToBottom();let y=18+Math.floor(Math.random()*38);Math.random()<.06&&(y+=60+Math.floor(Math.random()*90)),this.typingTimer=window.setTimeout(d,y)};d()})}async onSend(){const e=this.input.value.trim();!e||this.requestInFlight||(this.input.value="",await this.sendQuestion(e))}async sendQuestion(e,t={}){const s=e.trim(),{displayText:n,responseKind:i,fallbackKind:a,imageAttachment:c}=t;if(!s)return;this.recallOpen&&this.toggleRecallPanel(!1),this.stopTyping(!0),this.stopSpeaking(),this.setAudienceMenuOpen(!1),this.addMessage("user",n??s,s);const{row:h}=this.addAssistantBubbleLoading();this.setBusy(!0,"正在整理讲解...");try{const u=this.contextVersion,d=this.context.sceneId||"",p=this.messages.slice(this.sceneTurnAnchor).filter(r=>this.isConversationMessage(r)).slice(-x),b=this.buildRequestContext(s);this.rememberUserMessage(s),this.rememberSceneMessage(s);const f=await this.client.ask(this.composeQuestion(s),b,p.map(r=>({role:r.role,text:this.getRequestText(r)})).filter(r=>!!r.text),this.sessionId,c??void 0);if(u!==this.contextVersion||d!==(this.context.sceneId||"")){const r=h.querySelector(".fcchat-bubble");r&&(h.removeAttribute("data-loading"),r.textContent="点位已经切换，请重新围绕当前点位发问。"),this.setBusy(!1,"");return}const m={id:T(),role:"assistant",text:this.normalizeText(f.answer),requestText:this.normalizeText(f.answer),kind:i,cardTitle:this.getCardTitle(i)};if(!i||i==="text"){const r=this.replaceLoadingWithEmpty(h);this.setBusy(!0,"正在整理讲解..."),await this.typewriterRender(r,f.answer)}this.messages.push(m),this.lastAssistantMessageId=m.id,this.messages.length>x&&(this.messages=this.messages.slice(-x)),this.renderMessages(),this.persistMessages(),this.renderRecallPanel(),this.setBusy(!1,""),this.renderMessages(),t.speakAfter&&this.speakText(f.answer)}catch(u){const d=h.querySelector(".fcchat-bubble");if(d){h.removeAttribute("data-loading");const b=`请求失败：${typeof(u==null?void 0:u.message)=="string"?u.message:String(u)}`,f=a||(this.isStructuredCardKind(i)?i:void 0),m=f?this.buildPresetFallbackText(f):b,r=f==="review-card"||f==="route-card"?f:void 0,g={id:T(),role:"assistant",text:m,requestText:f?"":b,kind:r,cardTitle:this.getCardTitle(r)};f&&!r?(d.textContent="",await this.typewriterRender(d,m)):d.textContent=b,this.messages.push(g),this.lastAssistantMessageId=g.id,this.messages.length>x&&(this.messages=this.messages.slice(-x)),this.renderMessages(),this.persistMessages(),this.renderRecallPanel(),f==="narration"&&t.speakAfter&&this.speakText(m)}this.setBusy(!1,a?this.getFallbackStatusText(a):this.isStructuredCardKind(i)?"云端讲解暂不可用，已切换为本地示意卡。":""),this.renderMessages()}this.scrollToBottom()}injectStyles(){if(document.getElementById("fcchat-style"))return;const e=document.createElement("style");e.id="fcchat-style",e.textContent=`
      .fcchat-root{
        --fcchat-paper: #f5f1e7;
        --fcchat-paper-soft: #fcfaf4;
        --fcchat-ink: #1f1c17;
        --fcchat-ink-soft: #6a6157;
        --fcchat-border: rgba(103, 78, 54, 0.18);
        --fcchat-accent: #c96442;
        --fcchat-accent-strong: #a84e2d;
        --fcchat-assistant: #f7efe4;
        --fcchat-assistant-border: rgba(201, 100, 66, 0.18);
        --fcchat-chip-bg: rgba(201, 100, 66, 0.08);
        --fcchat-chip-border: rgba(201, 100, 66, 0.18);
        --fcchat-shadow: 0 18px 44px rgba(73, 49, 28, 0.18);
        position: fixed;
        z-index: 99999;
        width: min(400px, calc(100vw - 24px));
        height: min(520px, calc(100vh - 28px));
        display: flex;
        flex-direction: column;
        border-radius: 18px;
        background:
          radial-gradient(120% 100% at 0% 0%, rgba(255, 255, 255, 0.86) 0%, transparent 42%),
          linear-gradient(145deg, var(--fcchat-paper-soft) 0%, var(--fcchat-paper) 100%);
        box-shadow: var(--fcchat-shadow);
        border: 1px solid rgba(103, 78, 54, 0.18);
        overflow: hidden;
        resize: both;
        min-width: 320px;
        min-height: 340px;
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
        gap: 5px;
        padding: 12px 14px 8px;
        border-bottom: 1px solid var(--fcchat-border);
        background:
          linear-gradient(180deg, rgba(255,252,246,0.96) 0%, rgba(245,237,225,0.92) 100%);
        cursor: move;
        user-select: none;
      }
      .fcchat-header-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
      }
      .fcchat-title{
        font-size: 22px;
        font-weight: 500;
        letter-spacing: 0.01em;
        color: var(--fcchat-ink);
        font-family: var(--vr-font-chat-title, Georgia, serif);
      }
      .fcchat-header-right{
        display:flex;
        align-items:center;
        gap: 8px;
      }
      .fcchat-disclaimer{
        margin-top: -1px;
        font-size: 10px;
        line-height: 1.35;
        color: rgba(106, 97, 87, 0.78);
      }
      .fcchat-contextbar{
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .fcchat-context-pill{
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        padding: 0 10px;
        border-radius: 999px;
        border: 1px solid rgba(168, 78, 45, 0.12);
        background: rgba(255, 255, 255, 0.72);
        color: var(--fcchat-ink-soft);
        font-size: 12px;
        line-height: 1;
      }
      button.fcchat-context-pill{
        cursor: pointer;
      }
      button.fcchat-context-pill.is-active{
        border-color: rgba(201, 100, 66, 0.22);
        background: rgba(255, 249, 244, 0.94);
        color: var(--fcchat-accent-strong);
      }
      .fcchat-audience-menu{
        display: none;
        margin-top: 6px;
        padding: 8px 0 0;
        gap: 6px;
        flex-wrap: wrap;
      }
      .fcchat-audience-menu.is-open{
        display: flex;
      }
      .fcchat-section-label{
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(106, 97, 87, 0.88);
      }
      .fcchat-workbench{
        padding: 6px 12px 7px;
        border-bottom: 1px solid rgba(103, 78, 54, 0.12);
        background: rgba(250, 247, 241, 0.94);
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .fcchat-workbench.is-feedback-only{
        gap: 0;
      }
      .fcchat-feedback-strip{
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        padding-top: 0;
      }
      .fcchat-feedback-strip.is-passive{
        gap: 8px;
      }
      .fcchat-feedback-label{
        font-size: 11px;
        color: var(--fcchat-ink-soft);
        margin-right: 2px;
      }
      .fcchat-feedback-hint{
        font-size: 11px;
        color: rgba(106, 97, 87, 0.76);
      }
      .fcchat-workbench-tabs{
        display: flex;
        align-items: center;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: thin;
      }
      .fcchat-workbench-tab{
        height: 34px;
        border-radius: 999px;
        border: 1px solid rgba(209, 207, 197, 0.9);
        background: rgba(255,255,255,0.72);
        color: rgba(77, 76, 72, 0.92);
        padding: 0 14px;
        font-size: 13px;
        cursor: pointer;
        white-space: nowrap;
        transition: background 160ms cubic-bezier(.2,.8,.2,1), color 160ms cubic-bezier(.2,.8,.2,1), box-shadow 160ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-workbench-tab.is-active{
        color: #fff;
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        border-color: transparent;
        box-shadow: 0 0 0 1px rgba(201, 100, 66, 0.18);
      }
      .fcchat-workbench-summary{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: 34px;
      }
      .fcchat-workbench-summary-text{
        font-size: 12px;
        line-height: 1.5;
        color: rgba(106, 97, 87, 0.92);
        flex: 1;
      }
      .fcchat-workbench-expand{
        flex-shrink: 0;
      }
      .fcchat-workbench-panel{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px 12px 14px;
        border-radius: 16px;
        border: 1px solid rgba(240, 238, 230, 0.96);
        background: rgba(255,255,255,0.66);
        box-shadow: 0 0 0 1px rgba(209, 207, 197, 0.3);
        max-height: 188px;
        overflow: auto;
      }
      .fcchat-workbench-actions{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .fcchat-inline-state{
        font-size: 12px;
        line-height: 1.55;
        color: rgba(106, 97, 87, 0.95);
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(255,255,255,0.72);
        border: 1px solid rgba(209, 207, 197, 0.68);
      }

      .fcchat-composer{
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 10px 12px 12px;
        border-top: 1px solid var(--fcchat-border);
        background: rgba(255, 253, 249, 0.9);
        backdrop-filter: blur(6px);
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
      .fcchat-chip:disabled{
        opacity: .55;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
      .fcchat-chip:hover{
        transform: translateY(-1px);
        background: rgba(201, 100, 66, 0.14);
        box-shadow: 0 4px 12px rgba(166, 77, 45, 0.16);
      }
      .fcchat-chip:active{
        transform: translateY(0);
      }
      .fcchat-chip-primary,
      .fcchat-chip.is-active{
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 8px 16px rgba(166, 77, 45, 0.18);
      }
      .fcchat-chip-primary.is-speaking{
        box-shadow: 0 0 0 2px rgba(201, 100, 66, 0.22);
      }
      .fcchat-chip-secondary{
        background: rgba(255, 255, 255, 0.7);
      }
      .fcchat-chip-scene{
        background: rgba(201, 100, 66, 0.12);
      }
      .fcchat-chip-audience{
        background: rgba(103, 78, 54, 0.08);
      }
      .fcchat-chip-review{
        background: rgba(168, 78, 45, 0.1);
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
        border: 1px solid rgba(103, 78, 54, 0.18);
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
        letter-spacing: 0.01em;
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
        padding: 10px 14px 10px 14px;
        display:flex;
        flex-direction: column;
        gap: 12px;
        -webkit-overflow-scrolling: touch;
      }
      .fcchat-list.is-welcome-only{
        justify-content: flex-start;
        padding-top: 18px;
      }

      .fcchat-row{
        display:flex;
        animation: fcchat-bubble-in 220ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-row.is-user{ justify-content:flex-end; }
      .fcchat-row.is-assistant{ justify-content:flex-start; }
      .fcchat-row.is-system{ justify-content:center; }
      .fcchat-message-stack{
        display:flex;
        flex-direction:column;
        gap: 8px;
        max-width: 88%;
      }
      .fcchat-row.is-user .fcchat-message-stack{
        align-items:flex-end;
      }
      .fcchat-row.is-assistant .fcchat-message-stack{
        align-items:flex-start;
      }
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
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color:#fff;
        border-top-right-radius: 6px;
        box-shadow: 0 10px 22px rgba(37, 99, 235, 0.24);
      }
      .bubble-assistant{
        background: linear-gradient(150deg, rgba(255, 255, 255, 0.96) 0%, var(--fcchat-assistant) 100%);
        color: var(--fcchat-ink);
        border-top-left-radius: 6px;
        border-color: var(--fcchat-assistant-border);
      }
      .fcchat-response-card{
        max-width: 88%;
        border-radius: 18px;
        padding: 14px 14px 12px;
        border: 1px solid #f0eee6;
        background: #faf9f5;
        box-shadow:
          0 0 0 1px rgba(209, 207, 197, 0.55),
          0 8px 22px rgba(20, 20, 19, 0.05);
      }
      .fcchat-response-card.review-card{
        border-color: rgba(201, 100, 66, 0.2);
        box-shadow:
          0 0 0 1px rgba(201, 100, 66, 0.12),
          0 8px 22px rgba(20, 20, 19, 0.05);
      }
      .fcchat-response-card.route-card{
        border-color: rgba(143, 86, 56, 0.18);
        box-shadow:
          0 0 0 1px rgba(143, 86, 56, 0.1),
          0 8px 22px rgba(20, 20, 19, 0.05);
      }
      .fcchat-response-card-title{
        font-size: 18px;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: 0.01em;
        color: #141413;
        font-family: var(--vr-font-chat-title, Georgia, serif);
      }
      .fcchat-response-card-body{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .fcchat-response-section-title{
        margin-top: 2px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(168, 78, 45, 0.92);
      }
      .fcchat-response-list{
        margin: 0;
        padding-left: 18px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .fcchat-response-list-item{
        font-size: 14px;
        line-height: 1.6;
        color: var(--fcchat-ink);
      }
      .fcchat-response-note{
        font-size: 12px;
        line-height: 1.55;
        color: var(--fcchat-ink-soft);
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(232, 230, 220, 0.7);
        border: 1px solid rgba(209, 207, 197, 0.65);
      }
      .fcchat-response-card-body p{
        margin: 0;
        font-size: 14px;
        line-height: 1.65;
        color: var(--fcchat-ink);
        white-space: pre-wrap;
        word-break: break-word;
      }
      .fcchat-followup-actions{
        display:flex;
        flex-wrap:wrap;
        gap: 6px;
      }
      .fcchat-scene-divider{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 28px;
        padding: 0 12px;
        border-radius: 999px;
        background: rgba(103, 78, 54, 0.08);
        color: var(--fcchat-ink-soft);
        font-size: 12px;
        letter-spacing: 0.04em;
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
        padding: 2px 0 0;
        border-top: 0;
        background: transparent;
        backdrop-filter: none;
      }
      .fcchat-input{
        flex:1;
        height: 44px;
        border-radius: 12px;
        border: 1px solid rgba(103, 78, 54, 0.18);
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
        border: 1px solid rgba(103, 78, 54, 0.18);
        padding: 0 12px;
        font-size: 14px;
        cursor:pointer;
        user-select:none;
        transition: transform 150ms cubic-bezier(.2,.8,.2,1), box-shadow 150ms cubic-bezier(.2,.8,.2,1), background 150ms cubic-bezier(.2,.8,.2,1);
      }
      .fcchat-btn:disabled{ opacity:.6; cursor:not-allowed; }
      .fcchat-btn-primary{
        min-width: 84px;
        background: linear-gradient(145deg, var(--fcchat-accent) 0%, var(--fcchat-accent-strong) 100%);
        color:#fff;
        border-color: transparent;
        box-shadow: 0 8px 16px rgba(166, 77, 45, 0.22);
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
        padding: 2px 0 0;
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
        box-shadow: 0 8px 20px rgba(166, 77, 45, 0.28);
        padding: 2px 0 0;
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
        box-shadow: 0 10px 24px rgba(166, 77, 45, 0.34);
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
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        transform: translate3d(12px, 0, 0) scale(0.92);
      }
      .fcchat-caption-overlay{
        position: fixed;
        left: 50%;
        bottom: calc(env(safe-area-inset-bottom, 0px) + 72px);
        transform: translateX(-50%);
        z-index: 2602;
        width: min(520px, calc(100vw - 32px));
        max-height: 96px;
        overflow: auto;
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.22);
        background: rgba(20, 20, 20, 0.62);
        color: rgba(255,255,255,0.95);
        padding: 10px 12px;
        font-size: 13px;
        line-height: 1.55;
        box-shadow: 0 10px 26px rgba(0,0,0,0.26);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }
      .fcchat-caption-overlay[hidden]{
        display: none !important;
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
          height: min(78vh, 720px) !important;
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
        .fcchat-caption-overlay{
          bottom: calc(env(safe-area-inset-bottom, 0px) + 62px);
          max-height: 88px;
        }
        .fcchat-title{
          font-size: 20px;
        }
        .fcchat-workbench{
          padding: 8px 10px 10px;
        }
        .fcchat-workbench-panel{
          max-height: 164px;
          padding: 10px 10px 12px;
        }
        .fcchat-workbench-tab{
          height: 36px;
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

      html[data-vr-layout="mobile-compact"] .fcchat-root{
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        top: auto !important;
        width: 100vw !important;
        height: min(70vh, 620px) !important;
        border-radius: 22px 22px 0 0 !important;
        box-shadow: 0 -14px 38px rgba(31, 23, 18, 0.22);
      }
      html[data-vr-layout="mobile-compact"] .fcchat-header{
        cursor: default !important;
        padding: 12px 14px 10px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-title{
        font-size: 18px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-disclaimer{
        font-size: 11px;
        line-height: 1.45;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-contextbar{
        gap: 6px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-context-pill{
        height: 28px;
        padding: 0 10px;
        font-size: 11px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-workbench{
        padding: 6px 10px 8px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-workbench-panel{
        max-height: 140px;
        padding: 8px 9px 10px;
        border-radius: 14px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-workbench-tab{
        height: 32px;
        font-size: 12px;
        padding: 0 12px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-list{
        padding: 8px 10px;
        gap: 10px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-bubble{
        max-width: 90%;
        padding: 9px 11px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.55;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-response-card{
        max-width: 92%;
        border-radius: 15px;
        padding: 12px 12px 10px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-response-card-title{
        font-size: 16px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-response-card-body p,
      html[data-vr-layout="mobile-compact"] .fcchat-response-list-item{
        font-size: 13px;
        line-height: 1.55;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-status{
        padding: 5px 10px 0;
        font-size: 11px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-composer{
        padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
      }
      html[data-vr-layout="mobile-compact"] .fcchat-inputbar{
        gap: 8px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-input{
        height: 40px;
        border-radius: 12px;
        font-size: 15px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-btn-primary{
        min-width: 72px;
        height: 40px;
        border-radius: 12px;
        font-size: 14px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-recall-panel{
        max-height: 122px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-fab{
        left: 12px;
        right: auto;
        top: auto;
        bottom: calc(env(safe-area-inset-bottom, 0px) + 90px);
        width: 42px;
        height: 42px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-fab svg{
        width: 42px;
        height: 42px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-caption-overlay{
        width: min(320px, calc(100vw - 24px));
        bottom: calc(env(safe-area-inset-bottom, 0px) + 70px);
        max-height: 84px;
        padding: 8px 10px;
        font-size: 12px;
      }
      html[data-vr-layout="mobile-compact"] .fcchat-first-hint{
        max-width: 188px;
        font-size: 12px;
        white-space: normal;
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
        border: 1px solid rgba(103, 78, 54, 0.18);
        background: linear-gradient(140deg, rgba(255,255,255,0.96), rgba(246, 238, 227, 0.96));
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
    `,document.head.appendChild(e)}getElement(){return this.root}remove(){this.destroy()}}const te=Object.freeze(Object.defineProperty({__proto__:null,FcChatPanel:K},Symbol.toStringTag,{value:"Module"})),w=1600,q=800,H=3200;function Y(l){try{return JSON.parse(l)}catch{return null}}function k(l){return typeof l=="string"?l:""}function X(l){return l.endsWith("/")?l:l+"/"}function S(l){return(l||"").replace(/\s+/g,"").trim()}function W(l,e,t=[],s="",n){const i=t.map(r=>({role:r.role==="assistant"?"assistant":"user",content:typeof r.text=="string"?r.text.trim():"",text:typeof r.text=="string"?r.text.trim():""})).filter(r=>!!r.content),a=S(l),c=Array.isArray(e==null?void 0:e.userMemory)?e.userMemory.map(r=>typeof r=="string"?r.trim():"").filter(r=>!!r).filter(r=>S(r)!==a).slice(-30):[],h=(r,g)=>{const y=r.trim();return y.length<=g?y:`${y.slice(0,g)}...`};let u="",d=!1;for(let r=i.length-1;r>=0;r--){const g=i[r];if(g.role!=="user"||!g.text)continue;const y=S(g.text);if(!d&&y===a){d=!0;continue}u=g.text;break}let p="";for(let r=i.length-1;r>=0;r--){const g=i[r];if(g.role==="assistant"&&g.text){p=g.text;break}}const b=i.slice(-8).map(r=>({role:r.role,text:h(r.text,w),content:h(r.text,w)})),f=i.slice(-20).map(r=>({role:r.role,text:h(r.text,w),content:h(r.text,w)})),m={question:l,rawQuestion:l};if(s&&(m.sessionId=s,m.conversationId=s),i.length>0&&(m.history=i,m.messages=i,m.chatHistory=i.map(r=>({role:r.role,text:r.text}))),e&&typeof e=="object"){const r=Array.isArray(e.recentTurns)?e.recentTurns:[];m.context={museumId:e.museumId||"",museumName:e.museumName||"",sceneId:e.sceneId||"",sceneTitle:e.sceneTitle||"",url:e.url||"",sessionId:s||"",historyLength:i.length,userMemory:c,userMemoryLength:c.length,lastUserUtterance:e!=null&&e.lastUserUtterance||u?h((e==null?void 0:e.lastUserUtterance)||u,q):"",lastAssistantReply:e!=null&&e.lastAssistantReply||p?h((e==null?void 0:e.lastAssistantReply)||p,H):"",recentTurns:r.length>0?r.slice(-8).map(g=>({role:g.role==="assistant"?"assistant":"user",text:h(typeof g.text=="string"?g.text:"",w),content:h(typeof g.text=="string"?g.text:"",w)})):b,history:f,messages:f,chatHistory:f.map(g=>({role:g.role,text:g.text}))}}return n!=null&&n.dataUrl&&(m.imageDataUrl=n.dataUrl,m.attachments=[{type:"image",mimeType:n.mimeType||"image/jpeg",dataUrl:n.dataUrl,width:n.width??0,height:n.height??0,sceneId:n.sceneId||(e==null?void 0:e.sceneId)||"",sceneTitle:n.sceneTitle||(e==null?void 0:e.sceneTitle)||""}],m.context&&typeof m.context=="object"&&(m.context.currentViewImage={hasImage:!0,mimeType:n.mimeType||"image/jpeg",width:n.width??0,height:n.height??0,sceneId:n.sceneId||(e==null?void 0:e.sceneId)||"",sceneTitle:n.sceneTitle||(e==null?void 0:e.sceneTitle)||""})),m}function V(l){if(l&&typeof l=="object"&&typeof l.answer=="string"&&l.answer.trim())return{ok:!0,answer:l.answer.trim(),model:k(l.model)||void 0};if(l&&typeof l=="object"&&("code"in l||"msg"in l||"data"in l)){const e=typeof l.code=="number"?l.code:void 0,t=k(l.msg)||"",s=l.data;if((e===0||e===void 0)&&s&&typeof s=="object"){const n=typeof s.answer=="string"?s.answer.trim():"";if(n)return{ok:!0,answer:n,model:k(s.model)||void 0}}if(e===40101||t.toLowerCase()==="unauthorized")return{ok:!1,code:40101,msg:"unauthorized"};if(e!==void 0&&e!==0)return{ok:!1,code:e,msg:t||`error code=${e}`};if(t&&t.toLowerCase()!=="ok")return{ok:!1,code:e,msg:t}}if(l&&typeof l=="object"&&("Code"in l||"Message"in l||"RequestId"in l)){const e=k(l.Code)||void 0,t=k(l.Message)||"服务暂不可用",s=k(l.RequestId)||void 0;return{ok:!1,code:e,msg:t,requestId:s}}return{ok:!1,msg:"服务返回异常数据"}}function B(l,e){const t=(e.msg||"").trim(),s=typeof e.code=="string"?e.code.trim():e.code,n=t.toLowerCase(),i=typeof s=="string"?s.toLowerCase():s;if(l===403&&(i==="accessdenied"||n.includes("access denied"))&&n.includes("debt"))return"服务暂不可用（云函数账户欠费，HTTP 403）";if(l===401||s===40101||n==="unauthorized")return"服务未授权，请检查服务端鉴权配置";if(l>=400){const a=[];typeof s=="string"&&s&&a.push(s),t&&t!=="服务返回异常数据"&&a.push(t);const c=a.length>0?`：${a.join(" / ")}`:"";return`服务暂不可用（HTTP ${l}${c}）`}return t&&t.toLowerCase().includes("bad response")?"服务返回异常数据":t||"请求失败"}class j{constructor(e){o(this,"endpoint");o(this,"authToken");o(this,"timeoutMs");if(!(e!=null&&e.endpoint))throw new Error("fcChat endpoint is empty");this.endpoint=X(e.endpoint),this.authToken=e.authToken||"",this.timeoutMs=typeof e.timeoutMs=="number"&&e.timeoutMs>0?e.timeoutMs:15e3}async ask(e,t,s=[],n="",i){const a=(e||"").trim();if(!a)throw new Error("empty question");const c=new AbortController,h=setTimeout(()=>c.abort(),this.timeoutMs);try{const u={"Content-Type":"application/json"};this.authToken&&(u.Authorization=this.authToken.startsWith("Bearer ")?this.authToken:`Bearer ${this.authToken}`);const d=await fetch(this.endpoint,{method:"POST",headers:u,body:JSON.stringify(W(a,t,s,n,i)),signal:c.signal}),p=await d.text(),b=Y(p);if(!b)throw d.ok?new Error("服务返回异常数据"):new Error(`服务暂不可用（HTTP ${d.status}）`);const f=V(b);if(!d.ok&&!f.ok)throw new Error(B(d.status,f));if(f.ok)return{answer:f.answer,model:f.model};if(f.code===40101){const r=new Error("unauthorized (code=40101)");throw r.code=40101,r}const m=B(d.status,f);throw new Error(m||"请求失败")}catch(u){throw(u==null?void 0:u.name)==="AbortError"?new Error(`timeout (${this.timeoutMs}ms)`):u}finally{clearTimeout(h)}}}const se=Object.freeze(Object.defineProperty({__proto__:null,FcChatClient:j},Symbol.toStringTag,{value:"Module"}));class J{constructor(e={}){o(this,"element");o(this,"isOpen",!1);o(this,"inputEl");o(this,"options");o(this,"handleKeyDownBound");this.options=e,this.handleKeyDownBound=r=>this.handleKeyDown(r),this.element=document.createElement("div"),this.element.className="vr-modal vr-login-modal";const t=document.createElement("div");t.className="vr-modal-mask";const s=document.createElement("div");s.className="vr-modal-card vr-login-card";const n=document.createElement("div");n.className="vr-login-title-row";const i=document.createElement("div");i.className="vr-modal-title",i.textContent="登录";const a=document.createElement("button");a.className="vr-btn vr-login-close",a.setAttribute("aria-label","关闭"),a.textContent="×",a.addEventListener("click",()=>this.close()),n.appendChild(i),n.appendChild(a);const c=document.createElement("div");c.className="vr-modal-desc",c.textContent="输入用户名即可参与互动";const h=document.createElement("div");h.className="vr-login-form",this.inputEl=document.createElement("input"),this.inputEl.className="vr-login-input",this.inputEl.type="text",this.inputEl.id="community-login-name",this.inputEl.name="username",this.inputEl.autocomplete="nickname",this.inputEl.placeholder="用户名（2-12字）",this.inputEl.maxLength=12,this.inputEl.addEventListener("keydown",r=>{r.key==="Enter"&&this.handleConfirm()});const u=document.createElement("div");u.className="vr-modal-actions vr-login-actions";const d=document.createElement("button");d.className="vr-btn vr-login-btn",d.textContent="取消",d.addEventListener("click",()=>this.close());const p=document.createElement("button");p.className="vr-btn vr-login-btn danger",p.textContent="退出登录",p.addEventListener("click",()=>{var r,g;I(),(g=(r=this.options).onLogout)==null||g.call(r),this.close()});const b=document.createElement("button");b.className="vr-btn vr-login-btn primary",b.textContent="确认",b.addEventListener("click",()=>this.handleConfirm()),u.appendChild(d),u.appendChild(p),u.appendChild(b),h.appendChild(this.inputEl),s.appendChild(n),s.appendChild(c),s.appendChild(h),s.appendChild(u),t.addEventListener("click",()=>this.close()),s.addEventListener("click",r=>r.stopPropagation()),this.element.appendChild(t),this.element.appendChild(s);const f=()=>{const r=L();p.style.display=r?"inline-flex":"none"},m=this.open.bind(this);this.open=()=>{f(),m()}}handleKeyDown(e){this.isOpen&&e.key==="Escape"&&this.close()}handleConfirm(){var s,n;const e=(this.inputEl.value||"").trim();if(e.length<2||e.length>12){v("用户名需 2-12 字");return}const t=z(e);(n=(s=this.options).onLogin)==null||n.call(s,t),this.close()}open(){if(this.isOpen)return;this.isOpen=!0,window.addEventListener("keydown",this.handleKeyDownBound);const e=L();this.inputEl.value=(e==null?void 0:e.name)||"",this.element.classList.add("open"),window.setTimeout(()=>this.inputEl.focus(),60)}close(){this.isOpen&&(this.isOpen=!1,window.removeEventListener("keydown",this.handleKeyDownBound),this.element.classList.remove("open"))}getElement(){return this.element}remove(){window.removeEventListener("keydown",this.handleKeyDownBound),this.element.remove()}}class Q{constructor(e){o(this,"element");o(this,"sceneId");o(this,"sceneName");o(this,"onClose");o(this,"subtitleEl");o(this,"loginHintBtn");o(this,"userLineEl");o(this,"userNameEl");o(this,"likeBtn");o(this,"likeCountEl");o(this,"commentsEl");o(this,"inputEl");o(this,"sendBtn");o(this,"loginModal");o(this,"highlightNextFirstComment",!1);this.sceneId=e.sceneId,this.sceneName=e.sceneName,this.onClose=e.onClose,this.element=document.createElement("div"),this.element.className="vr-community";const t=document.createElement("div");t.className="vr-community-header";const s=document.createElement("div");s.className="vr-community-title",s.textContent="社区",this.subtitleEl=document.createElement("div"),this.subtitleEl.className="vr-community-subtitle";const n=document.createElement("button");n.className="vr-community-close",n.innerHTML="×",n.setAttribute("aria-label","关闭"),n.style.pointerEvents="auto",n.style.zIndex="10",n.addEventListener("click",d=>{var p;d.preventDefault(),d.stopPropagation(),d.stopImmediatePropagation(),(p=this.onClose)==null||p.call(this),window.dispatchEvent(new CustomEvent("vr:dock-tab-close",{detail:{tab:"community"}}))}),t.appendChild(s),t.appendChild(this.subtitleEl),t.appendChild(n);const i=document.createElement("div");i.className="vr-community-content";const a=document.createElement("div");a.className="vr-community-auth",this.loginHintBtn=document.createElement("button"),this.loginHintBtn.className="vr-btn vr-community-login-hint",this.loginHintBtn.textContent="登录后可参与互动",this.userLineEl=document.createElement("div"),this.userLineEl.className="vr-community-userline",this.userNameEl=document.createElement("div"),this.userNameEl.className="vr-community-username";const c=document.createElement("button");c.className="vr-btn vr-community-logout",c.textContent="退出登录",c.addEventListener("click",()=>{I(),this.refresh(),this.toast("已退出登录")}),this.userLineEl.appendChild(this.userNameEl),this.userLineEl.appendChild(c),a.appendChild(this.loginHintBtn),a.appendChild(this.userLineEl);const h=document.createElement("div");h.className="vr-community-like",this.likeBtn=document.createElement("button"),this.likeBtn.className="vr-btn vr-community-likebtn",this.likeBtn.textContent="点赞",this.likeCountEl=document.createElement("div"),this.likeCountEl.className="vr-community-likecount",this.likeBtn.addEventListener("click",()=>{const d=R(this.sceneId);if(!d.ok){v("请先登录"),this.loginModal.open();return}this.renderLikes(d.count,d.action==="liked"),v(d.action==="liked"?"已点赞":"已取消点赞")}),h.appendChild(this.likeBtn),h.appendChild(this.likeCountEl),this.commentsEl=document.createElement("div"),this.commentsEl.className="vr-community-comments";const u=document.createElement("div");u.className="vr-community-inputrow",this.inputEl=document.createElement("input"),this.inputEl.className="vr-community-input",this.inputEl.type="text",this.inputEl.id="community-comment-input",this.inputEl.name="comment",this.inputEl.autocomplete="off",this.inputEl.placeholder="写下你的想法…",this.inputEl.maxLength=120,this.inputEl.addEventListener("keydown",d=>{d.key==="Enter"&&this.handleSend()}),this.sendBtn=document.createElement("button"),this.sendBtn.className="vr-btn vr-community-send",this.sendBtn.textContent="发送",this.sendBtn.addEventListener("click",()=>this.handleSend()),u.appendChild(this.inputEl),u.appendChild(this.sendBtn),i.appendChild(a),i.appendChild(h),i.appendChild(this.commentsEl),i.appendChild(u),this.element.appendChild(t),this.element.appendChild(i),this.loginModal=new J({onLogin:()=>{this.refresh(),this.toast("登录成功")},onLogout:()=>{this.refresh()}}),document.body.appendChild(this.loginModal.getElement()),this.loginHintBtn.addEventListener("click",()=>this.loginModal.open()),this.setScene(e.sceneId,e.sceneName)}setScene(e,t){this.sceneId=e,this.sceneName=t,this.subtitleEl.textContent=this.sceneName?this.sceneName:e,this.refresh()}toastByReason(e){e==="not_logged_in"?v("请先登录"):e==="banned"?v("内容包含敏感词，已拦截"):e==="cooldown"?v("评论过于频繁，请稍后再试"):e==="EMPTY"&&v("内容不能为空")}formatRelativeTime(e){const t=Date.now()-e;if(t<6e4)return"刚刚";const s=Math.floor(t/6e4);if(s<60)return`${s} 分钟前`;const n=Math.floor(s/60);return n<24?`${n} 小时前`:new Date(e).toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"})}renderLikes(e,t){this.likeCountEl.textContent=String(e),this.likeBtn.classList.toggle("liked",t)}renderComments(e){this.commentsEl.innerHTML="";const t=document.createElement("div");if(t.className="vr-community-tip",t.textContent="本场景最近 50 条留言",this.commentsEl.appendChild(t),!e.length){const n=document.createElement("div");n.className="vr-community-empty",n.textContent="此场景暂无留言",this.commentsEl.appendChild(n);return}let s=null;for(const n of e){const i=document.createElement("div");i.className="vr-community-comment";const a=document.createElement("div");a.className="vr-community-comment-meta",a.textContent=`${n.userName} · ${this.formatRelativeTime(n.ts)}`;const c=document.createElement("div");c.className="vr-community-comment-text",c.textContent=n.text,i.appendChild(a),i.appendChild(c),this.commentsEl.appendChild(i),s||(s=i)}s&&this.highlightNextFirstComment&&(s.classList.add("vr-community-comment--flash"),this.commentsEl.scrollTop=0,window.setTimeout(()=>{s==null||s.classList.remove("vr-community-comment--flash")},300)),this.highlightNextFirstComment=!1}handleSend(){const t=(this.inputEl.value||"").trim();if(!t){this.toastByReason("EMPTY");return}const s=O(this.sceneId,t);if(!s.ok){s.reason==="not_logged_in"?(this.toastByReason("not_logged_in"),this.loginModal.open()):this.toastByReason(s.reason);return}this.inputEl.value="",this.refresh(),this.highlightNextFirstComment=!0,v("评论已发布")}refresh(){const e=L();this.loginHintBtn.style.display=e?"none":"inline-flex",this.userLineEl.style.display=e?"flex":"none",this.userNameEl.textContent=e?e.name:"";const t=N(this.sceneId,(e==null?void 0:e.id)||"anon").count,s=e?N(this.sceneId,e.id).liked:!1;this.renderLikes(t,s),this.renderComments($(this.sceneId));const n=!e;this.inputEl.disabled=n,this.sendBtn.classList.toggle("disabled",n)}getElement(){return this.element}remove(){this.loginModal.remove(),this.element.remove()}}const ne=Object.freeze(Object.defineProperty({__proto__:null,CommunityPanel:Q},Symbol.toStringTag,{value:"Module"}));export{ne as C,te as F,se as f};
