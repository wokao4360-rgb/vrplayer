var n=Object.defineProperty;var o=(i,t,s)=>t in i?n(i,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[t]=s;var a=(i,t,s)=>o(i,typeof t!="symbol"?t+"":t,s);import{k as u}from"./index-CE53-grs.js";class l{constructor(t){a(this,"element");a(this,"museums");this.museums=t,this.element=document.createElement("div"),this.element.className="museum-list",this.render(),this.applyStyles()}render(){const t=this.museums.filter(e=>e.id==="wangding"),s=this.museums.filter(e=>e.id!=="wangding");this.element.innerHTML=`
      <div class="museum-list-container">
        <h1 class="museum-list-title">王鼎纪念馆</h1>
        <p class="museum-list-subtitle">以王鼎生平为主线的红色研学展馆</p>
        <div class="museum-grid">
          ${t.map(e=>`
            <div class="museum-card museum-card-active" data-museum-id="${e.id}">
              <div class="museum-cover">
                <img src="${e.cover}" alt="${e.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${e.name}</h2>
                  ${e.description?`<p class="museum-desc">${e.description}</p>`:""}
                  <p class="museum-scene-count">${e.scenes.length} 个场景</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        ${s.length>0?`
        <div class="museum-grid muted">
          ${s.map(e=>`
            <div class="museum-card museum-card-disabled">
              <div class="museum-cover">
                <img src="${e.cover}" alt="${e.name}" loading="lazy">
                <div class="museum-overlay">
                  <h2 class="museum-name">${e.name}</h2>
                  <p class="museum-desc">建设中，敬请期待</p>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        `:""}
      </div>
    `,this.element.querySelectorAll(".museum-card-active").forEach(e=>{e.addEventListener("click",()=>{const m=e.getAttribute("data-museum-id");m&&u(m)})})}applyStyles(){const t=document.createElement("style");t.textContent=`
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
        margin-bottom: 30px;
      }
      .museum-list-subtitle {
        font-size: 16px;
        color: rgba(255,255,255,0.9);
        text-align: center;
        margin-top: -12px;
        margin-bottom: 24px;
      }
      .museum-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      .museum-grid.muted {
        opacity: 0.7;
      }
      .museum-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s, box-shadow 0.2s;
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
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
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
    `,document.head.appendChild(t)}getElement(){return this.element}remove(){this.element.remove()}}export{l as MuseumList};
