var a=Object.defineProperty;var r=(i,e,t)=>e in i?a(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var s=(i,e,t)=>r(i,typeof e!="symbol"?e+"":e,t);import{n as o}from"./index-CntEWe8z.js";let n=!1;class d{constructor(e){s(this,"element");this.museum=e,this.element=document.createElement("div"),this.element.className="scene-list-page",this.render(),this.applyStyles()}render(){this.element.innerHTML=`
      <div class="scene-list-container">
        <h1 class="scene-list-title">${this.museum.name} - 场景列表</h1>
        ${this.museum.description?`<p class="scene-list-desc">${this.museum.description}</p>`:""}
        <div class="scene-grid">
          ${this.museum.scenes.map(e=>`
            <div class="scene-card" data-scene-id="${e.id}">
              <div class="scene-cover">
                <img src="${e.thumb}" alt="${e.name}" loading="lazy">
                <div class="scene-overlay">
                  <h2 class="scene-name">${e.name}</h2>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `,this.element.querySelectorAll(".scene-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-scene-id");t&&o(this.museum.id,t)})})}applyStyles(){if(n)return;n=!0;const e=document.createElement("style");e.textContent=`
      .scene-list-page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding-top: calc(44px + env(safe-area-inset-top, 0px));
      }
      .scene-list-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .scene-list-title {
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
      }
      .scene-list-desc {
        max-width: 820px;
        margin: -12px auto 26px;
        color: rgba(255, 255, 255, 0.92);
        font-size: 15px;
        line-height: 1.6;
        text-align: center;
      }
      .scene-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }
      .scene-card {
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }
      .scene-card:active {
        transform: scale(0.98);
      }
      .scene-cover {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        overflow: hidden;
      }
      .scene-cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .scene-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        padding: 15px;
        color: #fff;
      }
      .scene-name {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
      }
    `,document.head.appendChild(e)}getElement(){return this.element}remove(){this.element.remove()}}export{d as SceneListPage};
