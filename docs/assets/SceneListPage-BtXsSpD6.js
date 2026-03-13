var t=Object.defineProperty;var d=(r,e,s)=>e in r?t(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s;var a=(r,e,s)=>d(r,typeof e!="symbol"?e+"":e,s);import{r as i,A as n,k as v,n as l}from"./index-CR8Djy5c.js";class u{constructor(e){a(this,"element");this.museum=e,this.element=document.createElement("div"),this.element.className="vr-discovery-page",this.render()}renderSceneCard(e,s){return`
      <article class="vr-scene-card vr-card-enter" style="--vr-card-index:${s}">
        <button class="vr-scene-card__button" type="button" data-scene-id="${e.id}" aria-label="进入${e.name}">
          <div class="vr-scene-card__media">
            <img src="${i(e.thumb,n.THUMB)}" alt="${e.name}" loading="lazy" decoding="async">
            <div class="vr-scene-card__veil"></div>
            <span class="vr-scene-card__seal">场景点位</span>
          </div>
          <div class="vr-scene-card__body">
            <div class="vr-scene-card__eyebrow">实拍场景</div>
            <h2 class="vr-scene-card__name">${e.name}</h2>
            <p class="vr-scene-card__hook">进入这一处空间，沿着真实拍摄视角继续向前漫游。</p>
            <div class="vr-scene-card__footer">
              <span>360° 实拍漫游</span>
              <span class="vr-scene-card__cta">进入场景</span>
            </div>
          </div>
        </button>
      </article>
    `}render(){const e=v(this.museum);this.element.innerHTML=`
      <div class="vr-discovery-shell vr-discovery-shell--scene-list">
        <section class="vr-scene-banner vr-page-enter">
          <div class="vr-scene-banner__copy">
            <div>
              <div class="vr-discovery-eyebrow">馆内目录</div>
              <h1 class="vr-scene-banner__title">${this.museum.name}</h1>
              <p class="vr-scene-banner__desc">${e.hook}</p>
            </div>
            <div>
              <div class="vr-discovery-tags">
                ${e.tags.slice(0,3).map(s=>`<span class="vr-discovery-tag">${s}</span>`).join("")}
              </div>
              ${this.museum.description?`<p class="vr-scene-banner__desc">${this.museum.description}</p>`:""}
            </div>
          </div>
          <div class="vr-scene-banner__media">
            <img src="${i(this.museum.cover,n.COVER)}" alt="${this.museum.name}" loading="eager" decoding="async">
          </div>
        </section>

        <section class="vr-discovery-section">
          <div class="vr-discovery-section-head vr-page-enter">
            <div>
              <div class="vr-discovery-eyebrow">点位目录</div>
              <h2 class="vr-discovery-section-title">从一个门槛、一段回廊，走进展馆真正的空间顺序</h2>
            </div>
            <p class="vr-discovery-section-note">场景卡片会保留你熟悉的进入方式，但以更清楚的目录感呈现，先看清，再进入。</p>
          </div>
          <div class="vr-scene-grid">
            ${this.museum.scenes.map((s,c)=>this.renderSceneCard(s,c)).join("")}
          </div>
        </section>
      </div>
    `,this.element.querySelectorAll(".vr-scene-card__button").forEach(s=>{s.addEventListener("click",()=>{const c=s.getAttribute("data-scene-id");c&&l(this.museum.id,c)})})}getElement(){return this.element}remove(){this.element.remove()}}export{u as SceneListPage};
