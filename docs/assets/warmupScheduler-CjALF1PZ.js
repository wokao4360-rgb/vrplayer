var f=Object.defineProperty;var g=(n,e,i)=>e in n?f(n,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[e]=i;var s=(n,e,i)=>g(n,typeof e!="symbol"?e+"":e,i);import{L as t,p as w}from"./index-BLXdvUAm.js";function x(){const n=new URLSearchParams(window.location.search);return n.get("debug")==="1"||n.get("metrics")==="1"||n.get("metrics")==="true"||n.get("tilesDebug")==="1"||n.get("tilesDebug")==="true"||n.get("tilesDebug")==="on"}class y{constructor(){s(this,"element");s(this,"currentStatus",t.LOADING_LOW);s(this,"autoHideTimer",null);s(this,"maxVisibleTimer",null);s(this,"pendingStatusTimer",null);s(this,"maxVisibleMs",1e4);s(this,"readyHideMs",2500);s(this,"lowLoadingMinVisibleMs",500);s(this,"lowReadyMinVisibleMs",1200);s(this,"lowLoadingShownAt",0);s(this,"lowReadyShownAt",0);s(this,"metricsText","");this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){if(w()){this.hide();return}this.pendingStatusTimer&&(clearTimeout(this.pendingStatusTimer),this.pendingStatusTimer=null);const i=this.getTransitionDelay(e);if(i>0){this.pendingStatusTimer=window.setTimeout(()=>{this.pendingStatusTimer=null,this.updateStatus(e)},i);return}const a=Date.now();if(this.currentStatus=e,e===t.LOADING_LOW&&(this.lowLoadingShownAt=a),e===t.LOW_READY&&(this.lowReadyShownAt=a),this.render(),this.autoHideTimer&&(clearTimeout(this.autoHideTimer),this.autoHideTimer=null),this.maxVisibleTimer&&(clearTimeout(this.maxVisibleTimer),this.maxVisibleTimer=null),e===t.LOADING_LOW||e===t.LOADING_HIGH||e===t.ERROR||e===t.DEGRADED){this.show(),this.maxVisibleTimer=window.setTimeout(()=>{this.hide()},this.maxVisibleMs);return}(e===t.HIGH_READY||e===t.LOW_READY)&&(this.show(),this.autoHideTimer=window.setTimeout(()=>{this.hide()},this.readyHideMs))}getTransitionDelay(e){const i=Date.now();if(this.currentStatus===t.LOADING_LOW&&e!==t.LOADING_LOW){const a=i-this.lowLoadingShownAt;if(this.lowLoadingShownAt>0&&a<this.lowLoadingMinVisibleMs)return this.lowLoadingMinVisibleMs-a}if(this.currentStatus===t.LOW_READY&&(e===t.LOADING_HIGH||e===t.HIGH_READY||e===t.DEGRADED)){const a=i-this.lowReadyShownAt;if(this.lowReadyShownAt>0&&a<this.lowReadyMinVisibleMs)return this.lowReadyMinVisibleMs-a}return 0}updateMetrics(e){const i=new URLSearchParams(window.location.search);if(!(i.get("metrics")==="1"||i.get("metrics")==="true"||i.get("tilesDebug")==="1"))return;const r=e.lowReadyMs??-1,h=e.highReadyMs??-1,c=e.tileHitRate??0,m=e.tilesFailed??0,p=e.tilesRetries??0,d=e.perfMode??"",u=e.renderSource??"";this.metricsText=`low:${r}ms high:${h}ms hit:${c}% fail:${m} retry:${p} `+`${d?`perf:${d} `:""}${u?`src:${u}`:""}`.trim(),this.render()}render(){const{text:e,icon:i,className:a}=this.getStatusInfo();this.element.innerHTML=`
      <div class="quality-indicator-content ${a}">
        <span class="quality-icon">${i}</span>
        <span class="quality-text">${e}</span>
        ${this.metricsText?`<span class="quality-metrics">${this.metricsText}</span>`:""}
      </div>
    `}getStatusInfo(){switch(this.currentStatus){case t.LOADING_LOW:return{text:"正在加载低清图...",icon:"⏳",className:"status-loading"};case t.LOW_READY:return{text:"低清图已加载",icon:"✨",className:"status-ready"};case t.LOADING_HIGH:return{text:"正在加载高清图...",icon:"⏳",className:"status-loading"};case t.HIGH_READY:return{text:"已切换至高清",icon:"✨",className:"status-ready"};case t.DEGRADED:return{text:"网络较慢，已先使用低清",icon:"⚠️",className:"status-degraded"};case t.ERROR:return{text:"加载失败",icon:"❌",className:"status-error"};default:return{text:"",icon:"",className:""}}}show(){this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.maxVisibleTimer&&clearTimeout(this.maxVisibleTimer),this.pendingStatusTimer&&clearTimeout(this.pendingStatusTimer),this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}}const D=Object.freeze(Object.defineProperty({__proto__:null,LoadStatus:t,QualityIndicator:y,isQualityIndicatorDebugEnabled:x},Symbol.toStringTag,{value:"Module"})),l=typeof window<"u"&&"requestIdleCallback"in window?window.requestIdleCallback:null,o=typeof window<"u"&&"cancelIdleCallback"in window?window.cancelIdleCallback:null;function T(){const e=navigator.connection,i=(e==null?void 0:e.effectiveType)||"",a=!!(e!=null&&e.saveData),r=(e==null?void 0:e.downlink)||0;return a||i.includes("2g")?{maxConcurrent:1,staggerMs:260,idleTimeoutMs:2200}:i.includes("3g")||r<1.5?{maxConcurrent:1,staggerMs:180,idleTimeoutMs:1800}:r>0&&r<5?{maxConcurrent:2,staggerMs:140,idleTimeoutMs:1500}:{maxConcurrent:3,staggerMs:100,idleTimeoutMs:1200}}class M{constructor(){s(this,"disposed",!1);s(this,"started",!1);s(this,"queue",[]);s(this,"active",0);s(this,"budget",T());s(this,"idleHandle",null);s(this,"timerHandle",null)}schedule(e,i="idle"){if(!(this.disposed||this.started||e.length===0)){if(this.started=!0,this.queue=e.slice().sort((a,r)=>this.priorityWeight(a.priority)-this.priorityWeight(r.priority)).map(a=>a.task),i==="immediate"){this.pump();return}this.startWhenIdle()}}dispose(){this.disposed=!0,this.queue=[],this.idleHandle!==null&&(l&&o?o(this.idleHandle):clearTimeout(this.idleHandle),this.idleHandle=null),this.timerHandle!==null&&(clearTimeout(this.timerHandle),this.timerHandle=null)}startWhenIdle(){if(!this.disposed){if(l&&o){this.idleHandle=l(()=>{this.idleHandle=null,this.pump()},{timeout:this.budget.idleTimeoutMs});return}this.idleHandle=window.setTimeout(()=>{this.idleHandle=null,this.pump()},220)}}pump(){if(!this.disposed)for(;this.active<this.budget.maxConcurrent&&this.queue.length>0;){const e=this.queue.shift();e&&(this.active+=1,Promise.resolve(e()).catch(()=>{}).finally(()=>{this.active=Math.max(0,this.active-1),!this.disposed&&(this.queue.length===0&&this.active===0||(this.timerHandle!==null&&clearTimeout(this.timerHandle),this.timerHandle=window.setTimeout(()=>{this.timerHandle=null,this.pump()},this.budget.staggerMs)))}))}}priorityWeight(e){return e==="high"?0:e==="low"?2:1}}export{D as Q,M as W,x as i};
