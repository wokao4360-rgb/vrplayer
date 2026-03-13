var l=Object.defineProperty;var r=(n,e,t)=>e in n?l(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var i=(n,e,t)=>r(n,typeof e!="symbol"?e+"":e,t);class s{constructor(e){i(this,"element");this.element=document.createElement("div"),this.element.className="title-bar",this.element.innerHTML=`
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
        background: linear-gradient(180deg, rgba(247, 240, 227, 0.86), rgba(247, 240, 227, 0));
        backdrop-filter: blur(12px);
        padding-top: env(safe-area-inset-top, 0px);
        height: calc(44px + env(safe-area-inset-top, 0px));
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      .title-bar-content {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 18px;
        min-width: min(92vw, 320px);
        border-radius: 999px;
        border: 1px solid rgba(116, 88, 52, 0.14);
        background: rgba(255, 252, 246, 0.78);
        box-shadow: 0 12px 30px rgba(90, 59, 30, 0.08);
      }
      .title-text {
        font-size: 14px;
        font-weight: 700;
        color: #2b2019;
        letter-spacing: 0.08em;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,document.head.appendChild(e)}setTitle(e){const t=this.element.querySelector(".title-text");t&&(t.textContent=e)}getElement(){return this.element}remove(){this.element.remove()}}export{s as TitleBar};
