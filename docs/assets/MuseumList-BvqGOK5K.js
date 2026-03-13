var n=Object.defineProperty;var v=(a,e,s)=>e in a?n(a,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[e]=s;var t=(a,e,s)=>v(a,typeof e!="symbol"?e+"":e,s);import{k as d,r as l,A as o,l as m,m as u}from"./index-BU3Hy0r9.js";class y{constructor(e){t(this,"element");this.config=e,this.element=document.createElement("div"),this.element.className="vr-discovery-page",this.render(),this.markReady()}renderMuseumCard(e,s){const r=d(e),i=l(e.cover,o.COVER);return`
      <article class="vr-museum-card vr-card-enter" style="--vr-card-index:${s}">
        <button class="vr-museum-card__button" type="button" data-museum-id="${e.id}" aria-label="进入${e.name}">
          <div class="vr-museum-card__media">
            <img src="${i}" alt="${e.name}" loading="lazy" decoding="async">
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
              <span class="vr-museum-card__cta">点击进入</span>
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
          <div class="vr-discovery-hero-meta" aria-label="项目亮点">
            <span class="vr-discovery-pill">公益研学</span>
            <span class="vr-discovery-pill">${e.length} 座展馆开放</span>
            <span class="vr-discovery-pill">真实历史现场</span>
          </div>
        </section>

        <section class="vr-discovery-section">
          <div class="vr-discovery-section-head vr-page-enter">
            <div>
              <div class="vr-discovery-eyebrow">馆藏入口</div>
              <h2 class="vr-discovery-section-title">从一张门票感，走进一段正在发生的历史</h2>
            </div>
            <p class="vr-discovery-section-note">
              这里不是开发态的点位清单，而是面向研学的沉浸式入口。先选一座馆，再沿着空间与故事进入现场。
            </p>
          </div>

          <div class="vr-museum-grid">
            ${e.map((r,i)=>this.renderMuseumCard(r,i)).join("")}
          </div>
        </section>

        <section class="vr-discovery-note-card vr-page-enter">
          ${s.projectNote}
        </section>
      </div>
    `,this.element.querySelectorAll(".vr-museum-card__button").forEach(r=>{r.addEventListener("click",()=>{const i=r.getAttribute("data-museum-id");i&&u(i)})})}markReady(){requestAnimationFrame(()=>{this.element.classList.add("is-ready")})}getElement(){return this.element}remove(){this.element.remove()}}export{y as MuseumList};
