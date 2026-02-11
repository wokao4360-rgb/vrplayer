var m=Object.defineProperty;var p=(n,e,i)=>e in n?m(n,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[e]=i;var s=(n,e,i)=>p(n,typeof e!="symbol"?e+"":e,i);import{L as t,l as w}from"./index-eWkhSg8A.js";class y{constructor(){s(this,"element");s(this,"currentStatus",t.LOADING_LOW);s(this,"autoHideTimer",null);s(this,"maxVisibleTimer",null);s(this,"pendingStatusTimer",null);s(this,"maxVisibleMs",1e4);s(this,"readyHideMs",2500);s(this,"lowLoadingMinVisibleMs",500);s(this,"lowReadyMinVisibleMs",1200);s(this,"lowLoadingShownAt",0);s(this,"lowReadyShownAt",0);s(this,"metricsText","");this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){if(w()){this.hide();return}this.pendingStatusTimer&&(clearTimeout(this.pendingStatusTimer),this.pendingStatusTimer=null);const i=this.getTransitionDelay(e);if(i>0){this.pendingStatusTimer=window.setTimeout(()=>{this.pendingStatusTimer=null,this.updateStatus(e)},i);return}const a=Date.now();if(this.currentStatus=e,e===t.LOADING_LOW&&(this.lowLoadingShownAt=a),e===t.LOW_READY&&(this.lowReadyShownAt=a),this.render(),this.autoHideTimer&&(clearTimeout(this.autoHideTimer),this.autoHideTimer=null),this.maxVisibleTimer&&(clearTimeout(this.maxVisibleTimer),this.maxVisibleTimer=null),e===t.LOADING_LOW||e===t.LOADING_HIGH||e===t.ERROR||e===t.DEGRADED){this.show(),this.maxVisibleTimer=window.setTimeout(()=>{this.hide()},this.maxVisibleMs);return}(e===t.HIGH_READY||e===t.LOW_READY)&&(this.show(),this.autoHideTimer=window.setTimeout(()=>{this.hide()},this.readyHideMs))}getTransitionDelay(e){const i=Date.now();if(this.currentStatus===t.LOADING_LOW&&e!==t.LOADING_LOW){const a=i-this.lowLoadingShownAt;if(this.lowLoadingShownAt>0&&a<this.lowLoadingMinVisibleMs)return this.lowLoadingMinVisibleMs-a}if(this.currentStatus===t.LOW_READY&&(e===t.LOADING_HIGH||e===t.HIGH_READY||e===t.DEGRADED)){const a=i-this.lowReadyShownAt;if(this.lowReadyShownAt>0&&a<this.lowReadyMinVisibleMs)return this.lowReadyMinVisibleMs-a}return 0}updateMetrics(e){const i=new URLSearchParams(window.location.search);if(!(i.get("metrics")==="1"||i.get("metrics")==="true"||i.get("tilesDebug")==="1"))return;const l=e.lowReadyMs??-1,d=e.highReadyMs??-1,c=e.tileHitRate??0,h=e.tilesFailed??0,u=e.tilesRetries??0,r=e.perfMode??"",o=e.renderSource??"";this.metricsText=`low:${l}ms high:${d}ms hit:${c}% fail:${h} retry:${u} `+`${r?`perf:${r} `:""}${o?`src:${o}`:""}`.trim(),this.render()}render(){const{text:e,icon:i,className:a}=this.getStatusInfo();this.element.innerHTML=`
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
    `,document.head.appendChild(e)}}export{t as LoadStatus,y as QualityIndicator};
