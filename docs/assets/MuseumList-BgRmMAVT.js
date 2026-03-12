var l=Object.defineProperty;var u=(i,s,t)=>s in i?l(i,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[s]=t;var m=(i,s,t)=>u(i,typeof s!="symbol"?s+"":s,t);import{r as n,A as r,k as d}from"./index-DhC4A5tG.js";class g{constructor(s,t="VR 全景导览"){m(this,"element");this.museums=s,this.appName=t,this.element=document.createElement("div"),this.element.className="museum-list",this.render(),this.applyStyles()}render(){const s=this.museums.filter(e=>e.scenes.length>0),t=this.museums.filter(e=>e.scenes.length===0),o=s.length>1?`当前开放 ${s.length} 个展馆`:s.length===1?"当前开放 1 个展馆":"展馆内容正在整理中";this.element.innerHTML=`
      <div class="museum-list-container">
        <h1 class="museum-list-title">${this.appName}</h1>
        <p class="museum-list-subtitle">${o}</p>
        <div class="museum-grid">
          ${s.map(e=>`
            <div class="museum-card museum-card-active" data-museum-id="${e.id}">
              <div class="museum-cover">
                <img src="${n(e.cover,r.COVER)}" alt="${e.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${e.name}</h2>
                  ${e.description?`<p class="museum-desc">${e.description}</p>`:""}
                  <p class="museum-scene-count">${e.scenes.length} 个场景</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        ${t.length>0?`
          <div class="museum-section-label">内容筹备中</div>
          <div class="museum-grid muted">
            ${t.map(e=>`
              <div class="museum-card museum-card-disabled" aria-disabled="true">
                <div class="museum-cover">
                  <img src="${n(e.cover,r.COVER)}" alt="${e.name}" loading="lazy">
                  <div class="museum-overlay">
                    <h2 class="museum-name">${e.name}</h2>
                    <p class="museum-desc">暂未开放线上参观</p>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `:""}
      </div>
    `,this.element.querySelectorAll(".museum-card-active").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-museum-id");a&&d(a)})})}applyStyles(){const s=document.createElement("style");s.textContent=`
      .museum-list {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding-top: calc(44px + env(safe-area-inset-top, 0px));
      }
      .museum-list-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .museum-list-title {
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 12px;
      }
      .museum-list-subtitle {
        font-size: 16px;
        color: rgba(255,255,255,0.9);
        text-align: center;
        margin-bottom: 24px;
      }
      .museum-section-label {
        margin: 28px 0 12px;
        color: rgba(255,255,255,0.9);
        font-size: 14px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .museum-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .museum-grid.muted {
        opacity: 0.72;
      }
      .museum-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .museum-card-active:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);
      }
      .museum-card-disabled {
        cursor: not-allowed;
        filter: grayscale(0.3);
      }
      .museum-card:active {
        transform: scale(0.98);
      }
      .museum-card-disabled:active {
        transform: none;
      }
      .museum-cover {
        position: relative;
        width: 100%;
        padding-top: 60%;
        overflow: hidden;
      }
      .museum-cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .museum-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.82), transparent);
        padding: 20px;
        color: #fff;
      }
      .museum-name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .museum-desc {
        font-size: 14px;
        margin: 6px 0;
        line-height: 1.5;
      }
      .museum-scene-count {
        font-size: 14px;
        opacity: 0.9;
      }
    `,document.head.appendChild(s)}getElement(){return this.element}remove(){this.element.remove()}}export{g as MuseumList};
