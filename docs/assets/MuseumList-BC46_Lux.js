var n=Object.defineProperty;var d=(t,e,s)=>e in t?n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var i=(t,e,s)=>d(t,typeof e!="symbol"?e+"":e,s);import{z as v,r as o,A as l,B as m,C as u}from"./index-CkrVXPeQ.js";import"./three-renderer-33ZpdWmj.js";class g{constructor(e){i(this,"element");this.config=e,this.element=document.createElement("div"),this.element.className="vr-discovery-page",this.render(),this.markReady()}renderMuseumCard(e,s){const r=v(e),a=o(e.cover,l.COVER);return`
      <article class="vr-museum-card vr-card-enter" style="--vr-card-index:${s}">
        <button
          class="vr-museum-card__button"
          type="button"
          data-museum-id="${e.id}"
          aria-label="进入${e.name}"
        >
          <div class="vr-museum-card__media">
            <img src="${a}" alt="${e.name}" loading="lazy" decoding="async">
            <div class="vr-museum-card__veil"></div>
            <span class="vr-museum-card__seal">纪念馆</span>
          </div>
          <div class="vr-museum-card__body">
            <div class="vr-museum-card__eyebrow">沉浸研学</div>
            <h2 class="vr-museum-card__name">${e.name}</h2>
            <p class="vr-museum-card__hook">${r.hook}</p>
            <div class="vr-discovery-tags">
              ${r.tags.slice(0,3).map(c=>`<span class="vr-discovery-tag">${c}</span>`).join("")}
            </div>
            <div class="vr-museum-card__footer">
              <span>${e.scenes.length} 个场景</span>
              <span class="vr-museum-card__cta">进入封面页</span>
            </div>
          </div>
        </button>
      </article>
    `}render(){const e=this.config.museums.filter(r=>r.scenes.length>0),s=m(this.config);this.element.innerHTML=`
      <div class="vr-discovery-shell">
        <section class="vr-discovery-hero vr-page-enter">
          <div class="vr-discovery-brand">${s.brandTitle}</div>
          <h1 class="vr-discovery-hero-title">${s.heroTitle}</h1>
          <p class="vr-discovery-hero-subtitle">${s.heroSubtitle}</p>
        </section>

        <section class="vr-discovery-section">
          <div class="vr-discovery-section-head vr-page-enter">
            <div>
              <div class="vr-discovery-eyebrow">馆藏入口</div>
              <h2 class="vr-discovery-section-title">从一张门票感，走进一段正在发生的历史</h2>
            </div>
            <p class="vr-discovery-section-note">
              这里不是开发态的点位列表，而是面向研学的沉浸式入口。先选一座馆，再沿着空间与故事进入现场。
            </p>
          </div>

          <div class="vr-museum-grid">
            ${e.map((r,a)=>this.renderMuseumCard(r,a)).join("")}
          </div>
        </section>

        <section class="vr-discovery-note-card vr-page-enter">
          ${s.projectNote}
        </section>
      </div>
    `,this.element.querySelectorAll(".vr-museum-card__button").forEach(r=>{r.addEventListener("click",()=>{const a=r.getAttribute("data-museum-id");a&&u(a)})})}markReady(){requestAnimationFrame(()=>{this.element.classList.add("is-ready")})}getElement(){return this.element}remove(){this.element.remove()}}export{g as MuseumList};
