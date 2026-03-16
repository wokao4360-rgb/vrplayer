var C=Object.defineProperty;var N=(r,e,a)=>e in r?C(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a;var t=(r,e,a)=>N(r,typeof e!="symbol"?e+"":e,a);const E="vr-museum-shell-chrome-style";function S(){if(document.getElementById(E))return;const r=document.createElement("style");r.id=E,r.textContent=`
    .vr-shell-chrome {
      position: fixed;
      inset: 0;
      z-index: 4300;
      pointer-events: none;
      --vr-shell-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
      --vr-shell-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
      --vr-shell-panel: rgba(248, 244, 236, 0.14);
      --vr-shell-panel-border: rgba(255, 255, 255, 0.22);
      --vr-shell-ink: rgba(255, 248, 240, 0.96);
      --vr-shell-muted: rgba(255, 244, 230, 0.72);
      --vr-shell-accent: #d2a96d;
      --vr-shell-shadow: 0 24px 80px rgba(18, 14, 8, 0.28);
      font-family: "Noto Serif SC", "Songti SC", "STSong", serif;
    }

    .vr-shell-chrome__layer {
      position: absolute;
      inset: 0;
      opacity: 0;
      pointer-events: none;
      transition:
        opacity 360ms var(--vr-shell-ease-out),
        visibility 360ms var(--vr-shell-ease-out);
      visibility: hidden;
      overflow: hidden;
    }

    .vr-shell-chrome__layer.is-active {
      opacity: 1;
      visibility: visible;
    }

    .vr-shell-chrome__layer.is-interactive {
      pointer-events: auto;
    }

    .vr-shell-chrome__bg,
    .vr-shell-chrome__snapshot {
      position: absolute;
      inset: -8%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.06);
      filter: blur(22px) saturate(0.9);
      opacity: 0.92;
    }

    .vr-shell-chrome__snapshot {
      opacity: 0;
      transition: opacity 320ms var(--vr-shell-ease-out);
    }

    .vr-shell-chrome__layer[data-stage="transition"] .vr-shell-chrome__snapshot,
    .vr-shell-chrome__layer[data-stage="error"] .vr-shell-chrome__snapshot {
      opacity: 1;
      animation: vr-shell-drift 820ms var(--vr-shell-ease-in-out) forwards;
    }

    .vr-shell-chrome__veil {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 50% 20%, rgba(255, 246, 232, 0.22), transparent 45%),
        linear-gradient(180deg, rgba(17, 14, 10, 0.12), rgba(17, 14, 10, 0.56));
      backdrop-filter: blur(8px);
    }

    .vr-shell-chrome__grain {
      position: absolute;
      inset: 0;
      opacity: 0.12;
      mix-blend-mode: soft-light;
      background-image:
        linear-gradient(0deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08)),
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.42) 0, transparent 18%),
        radial-gradient(circle at 80% 10%, rgba(255,255,255,0.3) 0, transparent 16%),
        radial-gradient(circle at 50% 80%, rgba(255,255,255,0.18) 0, transparent 24%);
    }

    .vr-shell-chrome__content {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 28px;
    }

    .vr-shell-chrome__card {
      width: min(680px, calc(100vw - 40px));
      border: 1px solid var(--vr-shell-panel-border);
      background:
        linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06)),
        rgba(34, 28, 22, 0.16);
      box-shadow: var(--vr-shell-shadow);
      border-radius: 30px;
      padding: 28px 24px 24px;
      color: var(--vr-shell-ink);
      backdrop-filter: blur(24px);
      position: relative;
      overflow: hidden;
    }

    .vr-shell-chrome__card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 1px solid rgba(255,255,255,0.06);
      pointer-events: none;
    }

    .vr-shell-chrome__brand-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-size: 12px;
      color: var(--vr-shell-muted);
    }

    .vr-shell-chrome__brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
    }

    .vr-shell-chrome__brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: radial-gradient(circle, #f6d7aa 0%, #d2a96d 72%, rgba(210,169,109,0.15) 100%);
      box-shadow: 0 0 22px rgba(210, 169, 109, 0.72);
      flex: none;
    }

    .vr-shell-chrome__eyebrow {
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--vr-shell-accent);
      margin-bottom: 12px;
    }

    .vr-shell-chrome__title {
      margin: 0;
      font-size: clamp(34px, 6vw, 56px);
      line-height: 1.02;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-wrap: balance;
    }

    .vr-shell-chrome__subtitle {
      margin: 16px 0 0;
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: clamp(14px, 2.8vw, 17px);
      line-height: 1.75;
      color: var(--vr-shell-muted);
      text-wrap: pretty;
    }

    .vr-shell-chrome__footer {
      margin-top: 26px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .vr-shell-chrome__cta {
      appearance: none;
      border: 0;
      cursor: pointer;
      border-radius: 999px;
      padding: 15px 24px;
      min-width: 198px;
      color: #24170d;
      background:
        linear-gradient(135deg, rgba(255, 240, 213, 0.96), rgba(210, 169, 109, 0.94));
      box-shadow:
        0 16px 36px rgba(19, 12, 6, 0.18),
        inset 0 1px 0 rgba(255,255,255,0.55);
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.06em;
      transition:
        transform 160ms var(--vr-shell-ease-out),
        box-shadow 220ms var(--vr-shell-ease-out),
        filter 220ms var(--vr-shell-ease-out);
    }

    .vr-shell-chrome__cta:hover {
      transform: translateY(-1px) scale(1.01);
      box-shadow:
        0 18px 44px rgba(19, 12, 6, 0.24),
        inset 0 1px 0 rgba(255,255,255,0.6);
      filter: saturate(1.04);
    }

    .vr-shell-chrome__cta:active {
      transform: scale(0.985);
    }

    .vr-shell-chrome__cta-note {
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 244, 230, 0.52);
    }

    .vr-shell-chrome__progress {
      margin-top: 20px;
      display: grid;
      gap: 10px;
    }

    .vr-shell-chrome__progress-label {
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 244, 230, 0.72);
    }

    .vr-shell-chrome__progress-bar {
      position: relative;
      height: 3px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      overflow: hidden;
    }

    .vr-shell-chrome__progress-bar::after {
      content: '';
      position: absolute;
      inset: 0 auto 0 0;
      width: 36%;
      border-radius: inherit;
      background: linear-gradient(90deg, rgba(210,169,109,0.12), rgba(255,240,213,0.92), rgba(210,169,109,0.16));
      animation: vr-shell-progress 1.2s linear infinite;
    }

    .vr-shell-chrome__layer[data-stage="preview-ready"] {
      opacity: 0.88;
    }

    .vr-shell-chrome__layer.is-leaving {
      opacity: 0;
      visibility: hidden;
    }

    @keyframes vr-shell-progress {
      0% { transform: translateX(-30%); }
      100% { transform: translateX(310%); }
    }

    @keyframes vr-shell-drift {
      0% { transform: scale(1.04) translate3d(0, 0, 0); }
      100% { transform: scale(1.085) translate3d(0.6%, -1.2%, 0); }
    }

    @media (max-width: 720px) {
      .vr-shell-chrome__content {
        align-items: end;
        padding: 18px 14px calc(40px + env(safe-area-inset-bottom, 0px));
      }

      .vr-shell-chrome__card {
        width: min(100%, 560px);
        border-radius: 26px;
        padding: 20px 18px 18px;
      }

      .vr-shell-chrome__brand-row {
        margin-bottom: 18px;
      }

      .vr-shell-chrome__footer {
        align-items: stretch;
      }

      .vr-shell-chrome__cta {
        width: 100%;
      }
    }
  `,document.head.appendChild(r)}class B{constructor(){t(this,"element");t(this,"coverLayer");t(this,"transitionLayer");t(this,"coverBackground");t(this,"transitionBackground");t(this,"transitionSnapshot");t(this,"coverTitle");t(this,"coverSubtitle");t(this,"coverBrand");t(this,"coverAppName");t(this,"coverCta");t(this,"transitionBrand");t(this,"transitionTitle");t(this,"transitionSubtitle");t(this,"transitionProgressLabel");t(this,"onEnter",null);S(),this.element=document.createElement("div"),this.element.className="vr-shell-chrome",this.coverLayer=document.createElement("div"),this.coverLayer.className="vr-shell-chrome__layer",this.coverLayer.dataset.stage="cover",this.coverBackground=document.createElement("div"),this.coverBackground.className="vr-shell-chrome__bg";const e=document.createElement("div");e.className="vr-shell-chrome__veil";const a=document.createElement("div");a.className="vr-shell-chrome__grain";const s=document.createElement("div");s.className="vr-shell-chrome__content";const n=document.createElement("div");n.className="vr-shell-chrome__card";const i=document.createElement("div");i.className="vr-shell-chrome__brand-row";const o=document.createElement("div");o.className="vr-shell-chrome__brand-badge";const _=document.createElement("span");_.className="vr-shell-chrome__brand-dot",this.coverBrand=document.createElement("span"),this.coverAppName=document.createElement("span"),o.append(_,this.coverBrand),i.append(o,this.coverAppName);const l=document.createElement("div");l.className="vr-shell-chrome__eyebrow",l.textContent="Museum Immersion",this.coverTitle=document.createElement("h1"),this.coverTitle.className="vr-shell-chrome__title",this.coverSubtitle=document.createElement("p"),this.coverSubtitle.className="vr-shell-chrome__subtitle";const c=document.createElement("div");c.className="vr-shell-chrome__footer",this.coverCta=document.createElement("button"),this.coverCta.type="button",this.coverCta.className="vr-shell-chrome__cta",this.coverCta.addEventListener("click",()=>{var w;(w=this.onEnter)==null||w.call(this)});const h=document.createElement("div");h.className="vr-shell-chrome__cta-note",h.textContent="进入同一馆壳层内的连续漫游",c.append(this.coverCta,h),n.append(i,l,this.coverTitle,this.coverSubtitle,c),s.appendChild(n),this.coverLayer.append(this.coverBackground,e,a,s),this.transitionLayer=document.createElement("div"),this.transitionLayer.className="vr-shell-chrome__layer",this.transitionLayer.dataset.stage="transition",this.transitionBackground=document.createElement("div"),this.transitionBackground.className="vr-shell-chrome__bg",this.transitionSnapshot=document.createElement("div"),this.transitionSnapshot.className="vr-shell-chrome__snapshot";const x=document.createElement("div");x.className="vr-shell-chrome__veil";const y=document.createElement("div");y.className="vr-shell-chrome__grain";const d=document.createElement("div");d.className="vr-shell-chrome__content";const m=document.createElement("div");m.className="vr-shell-chrome__card";const v=document.createElement("div");v.className="vr-shell-chrome__brand-row";const p=document.createElement("div");p.className="vr-shell-chrome__brand-badge";const f=document.createElement("span");f.className="vr-shell-chrome__brand-dot",this.transitionBrand=document.createElement("span");const g=document.createElement("span");g.className="vr-shell-chrome__cta-note",g.textContent="Scene handoff",p.append(f,this.transitionBrand),v.append(p,g);const b=document.createElement("div");b.className="vr-shell-chrome__eyebrow",b.textContent="正在切换展点",this.transitionTitle=document.createElement("h2"),this.transitionTitle.className="vr-shell-chrome__title",this.transitionSubtitle=document.createElement("p"),this.transitionSubtitle.className="vr-shell-chrome__subtitle";const u=document.createElement("div");u.className="vr-shell-chrome__progress",this.transitionProgressLabel=document.createElement("div"),this.transitionProgressLabel.className="vr-shell-chrome__progress-label";const L=document.createElement("div");L.className="vr-shell-chrome__progress-bar",u.append(this.transitionProgressLabel,L),m.append(v,b,this.transitionTitle,this.transitionSubtitle,u),d.appendChild(m),this.transitionLayer.append(this.transitionBackground,this.transitionSnapshot,x,y,d),this.element.append(this.coverLayer,this.transitionLayer)}getElement(){return this.element}setCoverAction(e){this.onEnter=e}showCover(e){this.coverBrand.textContent=e.brandTitle,this.coverAppName.textContent=e.appName,this.coverTitle.textContent=e.title,this.coverSubtitle.textContent=e.subtitle,this.coverCta.textContent=e.ctaLabel,this.coverBackground.style.backgroundImage=e.heroImage?`url("${e.heroImage}")`:"",this.coverLayer.classList.add("is-active","is-interactive"),this.coverLayer.classList.remove("is-leaving")}showEnterPreloading(e){this.setTransitionModel(e),this.transitionLayer.dataset.stage="enter-preloading",this.transitionLayer.classList.add("is-active"),this.transitionLayer.classList.remove("is-leaving")}startSceneTransition(e){this.setTransitionModel(e),this.transitionLayer.dataset.stage="transition",this.transitionLayer.classList.add("is-active"),this.transitionLayer.classList.remove("is-leaving")}showErrorFallback(e){this.setTransitionModel(e),this.transitionLayer.dataset.stage="error",this.transitionLayer.classList.add("is-active"),this.transitionLayer.classList.remove("is-leaving")}markPreviewReady(e="低清预览已就绪，正在恢复清晰"){this.transitionLayer.dataset.stage="preview-ready",this.transitionProgressLabel.textContent=e}completeTransition(){this.coverLayer.classList.remove("is-active","is-interactive"),this.coverLayer.classList.add("is-leaving"),this.transitionLayer.classList.remove("is-active"),this.transitionLayer.classList.add("is-leaving"),window.setTimeout(()=>{this.coverLayer.classList.remove("is-leaving"),this.transitionLayer.classList.remove("is-leaving"),this.transitionLayer.dataset.stage="transition",this.transitionSnapshot.style.backgroundImage=""},420)}isCoverVisible(){return this.coverLayer.classList.contains("is-active")}setTransitionModel(e){this.transitionBrand.textContent=e.brandTitle,this.transitionTitle.textContent=e.title,this.transitionSubtitle.textContent=e.subtitle,this.transitionProgressLabel.textContent=e.progressLabel||"正在准备下一段漫游画面",this.transitionBackground.style.backgroundImage=e.backgroundImage?`url("${e.backgroundImage}")`:"",this.transitionSnapshot.style.backgroundImage=e.snapshotImage?`url("${e.snapshotImage}")`:""}}export{B as MuseumShellChrome};
