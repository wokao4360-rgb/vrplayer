var h=Object.defineProperty;var p=(a,e,i)=>e in a?h(a,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[e]=i;var s=(a,e,i)=>p(a,typeof e!="symbol"?e+"":e,i);import{L as t,p as x}from"./index-CGaPg6Yv.js";class T{constructor(){s(this,"element");s(this,"currentStatus",t.LOADING_LOW);s(this,"autoHideTimer",null);s(this,"maxVisibleTimer",null);s(this,"maxVisibleMs",1e4);s(this,"readyHideMs",2500);s(this,"metricsText","");this.element=document.createElement("div"),this.element.className="quality-indicator",this.render(),this.applyStyles()}updateStatus(e){if(x()){this.hide();return}if(this.currentStatus=e,this.render(),this.autoHideTimer&&(clearTimeout(this.autoHideTimer),this.autoHideTimer=null),this.maxVisibleTimer&&(clearTimeout(this.maxVisibleTimer),this.maxVisibleTimer=null),e===t.LOADING_LOW||e===t.LOADING_HIGH||e===t.ERROR||e===t.DEGRADED){this.show(),this.maxVisibleTimer=window.setTimeout(()=>{this.hide()},this.maxVisibleMs);return}(e===t.HIGH_READY||e===t.LOW_READY)&&(this.show(),this.autoHideTimer=window.setTimeout(()=>{this.hide()},this.readyHideMs))}updateMetrics(e){const i=new URLSearchParams(window.location.search);if(!(i.get("metrics")==="1"||i.get("metrics")==="true"||i.get("tilesDebug")==="1"))return;const l=e.lowReadyMs??-1,c=e.highReadyMs??-1,d=e.tileHitRate??0,m=e.tilesFailed??0,u=e.tilesRetries??0,n=e.perfMode??"",o=e.renderSource??"";this.metricsText=`low:${l}ms high:${c}ms hit:${d}% fail:${m} retry:${u} `+`${n?`perf:${n} `:""}${o?`src:${o}`:""}`.trim(),this.render()}render(){const{text:e,icon:i,className:r}=this.getStatusInfo();this.element.innerHTML=`
      <div class="quality-indicator-content ${r}">
        <span class="quality-icon">${i}</span>
        <span class="quality-text">${e}</span>
        ${this.metricsText?`<span class="quality-metrics">${this.metricsText}</span>`:""}
      </div>
    `}getStatusInfo(){switch(this.currentStatus){case t.LOADING_LOW:return{text:"正在加载低清图...",icon:"⏳",className:"status-loading"};case t.LOW_READY:return{text:"低清图已加载",icon:"✨",className:"status-ready"};case t.LOADING_HIGH:return{text:"正在加载高清图...",icon:"⏳",className:"status-loading"};case t.HIGH_READY:return{text:"已切换至高清",icon:"✨",className:"status-ready"};case t.DEGRADED:return{text:"网络较慢，已先使用低清",icon:"⚠️",className:"status-degraded"};case t.ERROR:return{text:"加载失败",icon:"❌",className:"status-error"};default:return{text:"",icon:"",className:""}}}show(){this.element.classList.add("show")}hide(){this.element.classList.remove("show")}getElement(){return this.element}remove(){this.autoHideTimer&&clearTimeout(this.autoHideTimer),this.maxVisibleTimer&&clearTimeout(this.maxVisibleTimer),this.element.remove()}applyStyles(){const e=document.createElement("style");e.textContent=`
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
    `,document.head.appendChild(e)}}export{t as LoadStatus,T as QualityIndicator};
