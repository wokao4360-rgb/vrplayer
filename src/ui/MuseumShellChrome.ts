export type MuseumShellCoverViewModel = {
  appName: string;
  brandTitle: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  heroImage: string;
};

export type MuseumShellTransitionViewModel = {
  brandTitle: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  snapshotImage?: string;
  progressLabel?: string;
  accentLabel?: string;
};

const STYLE_ID = 'vr-museum-shell-chrome-style';

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
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
      visibility: hidden;
      pointer-events: none;
      transition: opacity 360ms var(--vr-shell-ease-out), visibility 360ms var(--vr-shell-ease-out);
      overflow: hidden;
    }

    .vr-shell-chrome__layer.is-active {
      opacity: 1;
      visibility: visible;
    }

    .vr-shell-chrome__layer.is-interactive {
      pointer-events: auto;
    }

    .vr-shell-chrome__layer.is-leaving {
      opacity: 0;
      visibility: hidden;
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
        radial-gradient(circle at 50% 18%, rgba(255, 246, 232, 0.24), transparent 44%),
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
      background: linear-gradient(135deg, rgba(255, 240, 213, 0.96), rgba(210, 169, 109, 0.94));
      box-shadow: 0 16px 36px rgba(19, 12, 6, 0.18), inset 0 1px 0 rgba(255,255,255,0.55);
      font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.06em;
      transition: transform 160ms var(--vr-shell-ease-out), box-shadow 220ms var(--vr-shell-ease-out);
    }

    .vr-shell-chrome__cta:hover {
      transform: translateY(-1px) scale(1.01);
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

    .vr-shell-chrome__progress[hidden] {
      display: none;
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

      .vr-shell-chrome__cta {
        width: 100%;
      }
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__content {
      align-items: end;
      padding: 14px 12px calc(24px + env(safe-area-inset-bottom, 0px));
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__card {
      width: min(100%, 420px);
      border-radius: 24px;
      padding: 16px 14px 14px;
      box-shadow: 0 18px 42px rgba(18, 14, 8, 0.22);
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__brand-row {
      margin-bottom: 12px;
      gap: 10px;
      font-size: 10px;
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__brand-badge {
      gap: 8px;
      padding: 8px 12px;
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__eyebrow {
      margin-bottom: 8px;
      font-size: 10px;
      letter-spacing: 0.12em;
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__title {
      font-size: clamp(26px, 8.2vw, 34px);
      line-height: 1.04;
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__subtitle {
      margin-top: 12px;
      font-size: 13px;
      line-height: 1.6;
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__footer {
      margin-top: 18px;
      gap: 10px;
      align-items: stretch;
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__cta {
      width: 100%;
      min-width: 0;
      padding: 13px 18px;
      font-size: 13px;
    }

    html[data-vr-layout="mobile-compact"] .vr-shell-chrome__cta-note {
      font-size: 10px;
      letter-spacing: 0.06em;
    }
  `;

  document.head.appendChild(style);
}

export class MuseumShellChrome {
  private readonly element: HTMLDivElement;
  private readonly coverLayer: HTMLDivElement;
  private readonly transitionLayer: HTMLDivElement;
  private readonly coverBackground: HTMLDivElement;
  private readonly transitionBackground: HTMLDivElement;
  private readonly transitionSnapshot: HTMLDivElement;
  private readonly coverBrand: HTMLSpanElement;
  private readonly coverAppName: HTMLSpanElement;
  private readonly coverTitle: HTMLHeadingElement;
  private readonly coverSubtitle: HTMLParagraphElement;
  private readonly coverCta: HTMLButtonElement;
  private readonly transitionBrand: HTMLSpanElement;
  private readonly transitionAccent: HTMLSpanElement;
  private readonly transitionTitle: HTMLHeadingElement;
  private readonly transitionSubtitle: HTMLParagraphElement;
  private readonly transitionProgress: HTMLDivElement;
  private readonly transitionProgressLabel: HTMLDivElement;
  private onEnter: (() => void) | null = null;

  constructor() {
    ensureStyles();

    this.element = document.createElement('div');
    this.element.className = 'vr-shell-chrome';

    this.coverLayer = document.createElement('div');
    this.coverLayer.className = 'vr-shell-chrome__layer';
    this.coverLayer.dataset.stage = 'cover';
    this.coverBackground = document.createElement('div');
    this.coverBackground.className = 'vr-shell-chrome__bg';

    const coverContent = document.createElement('div');
    coverContent.className = 'vr-shell-chrome__content';
    const coverCard = document.createElement('div');
    coverCard.className = 'vr-shell-chrome__card';
    const coverBrandRow = document.createElement('div');
    coverBrandRow.className = 'vr-shell-chrome__brand-row';
    const coverBrandBadge = document.createElement('div');
    coverBrandBadge.className = 'vr-shell-chrome__brand-badge';
    const coverDot = document.createElement('span');
    coverDot.className = 'vr-shell-chrome__brand-dot';
    this.coverBrand = document.createElement('span');
    this.coverAppName = document.createElement('span');
    coverBrandBadge.append(coverDot, this.coverBrand);
    coverBrandRow.append(coverBrandBadge, this.coverAppName);
    const coverEyebrow = document.createElement('div');
    coverEyebrow.className = 'vr-shell-chrome__eyebrow';
    coverEyebrow.textContent = 'Museum Immersion';
    this.coverTitle = document.createElement('h1');
    this.coverTitle.className = 'vr-shell-chrome__title';
    this.coverSubtitle = document.createElement('p');
    this.coverSubtitle.className = 'vr-shell-chrome__subtitle';
    const coverFooter = document.createElement('div');
    coverFooter.className = 'vr-shell-chrome__footer';
    this.coverCta = document.createElement('button');
    this.coverCta.type = 'button';
    this.coverCta.className = 'vr-shell-chrome__cta';
    this.coverCta.addEventListener('click', () => {
      this.onEnter?.();
    });
    const coverNote = document.createElement('div');
    coverNote.className = 'vr-shell-chrome__cta-note';
    coverNote.textContent = '进入同一馆壳层内的连续漫游';
    coverFooter.append(this.coverCta, coverNote);
    coverCard.append(coverBrandRow, coverEyebrow, this.coverTitle, this.coverSubtitle, coverFooter);
    coverContent.appendChild(coverCard);
    this.coverLayer.append(this.coverBackground, createVeil(), createGrain(), coverContent);

    this.transitionLayer = document.createElement('div');
    this.transitionLayer.className = 'vr-shell-chrome__layer';
    this.transitionLayer.dataset.stage = 'transition';
    this.transitionBackground = document.createElement('div');
    this.transitionBackground.className = 'vr-shell-chrome__bg';
    this.transitionSnapshot = document.createElement('div');
    this.transitionSnapshot.className = 'vr-shell-chrome__snapshot';
    const transitionContent = document.createElement('div');
    transitionContent.className = 'vr-shell-chrome__content';
    const transitionCard = document.createElement('div');
    transitionCard.className = 'vr-shell-chrome__card';
    const transitionBrandRow = document.createElement('div');
    transitionBrandRow.className = 'vr-shell-chrome__brand-row';
    const transitionBrandBadge = document.createElement('div');
    transitionBrandBadge.className = 'vr-shell-chrome__brand-badge';
    const transitionDot = document.createElement('span');
    transitionDot.className = 'vr-shell-chrome__brand-dot';
    this.transitionBrand = document.createElement('span');
    this.transitionAccent = document.createElement('span');
    this.transitionAccent.className = 'vr-shell-chrome__cta-note';
    transitionBrandBadge.append(transitionDot, this.transitionBrand);
    transitionBrandRow.append(transitionBrandBadge, this.transitionAccent);
    const transitionEyebrow = document.createElement('div');
    transitionEyebrow.className = 'vr-shell-chrome__eyebrow';
    transitionEyebrow.textContent = '正在切换展点';
    this.transitionTitle = document.createElement('h2');
    this.transitionTitle.className = 'vr-shell-chrome__title';
    this.transitionSubtitle = document.createElement('p');
    this.transitionSubtitle.className = 'vr-shell-chrome__subtitle';
    this.transitionProgress = document.createElement('div');
    this.transitionProgress.className = 'vr-shell-chrome__progress';
    this.transitionProgress.hidden = true;
    this.transitionProgressLabel = document.createElement('div');
    this.transitionProgressLabel.className = 'vr-shell-chrome__progress-label';
    const progressBar = document.createElement('div');
    progressBar.className = 'vr-shell-chrome__progress-bar';
    this.transitionProgress.append(this.transitionProgressLabel, progressBar);
    transitionCard.append(
      transitionBrandRow,
      transitionEyebrow,
      this.transitionTitle,
      this.transitionSubtitle,
      this.transitionProgress,
    );
    transitionContent.appendChild(transitionCard);
    this.transitionLayer.append(
      this.transitionBackground,
      this.transitionSnapshot,
      createVeil(),
      createGrain(),
      transitionContent,
    );

    this.element.append(this.coverLayer, this.transitionLayer);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  setCoverAction(onEnter: () => void): void {
    this.onEnter = onEnter;
  }

  showCover(model: MuseumShellCoverViewModel): void {
    this.coverBrand.textContent = model.brandTitle;
    this.coverAppName.textContent = model.appName;
    this.coverTitle.textContent = model.title;
    this.coverSubtitle.textContent = model.subtitle;
    this.coverCta.textContent = model.ctaLabel;
    this.coverBackground.style.backgroundImage = model.heroImage ? `url("${model.heroImage}")` : '';
    this.coverLayer.classList.add('is-active', 'is-interactive');
    this.coverLayer.classList.remove('is-leaving');
  }

  showEnterPreloading(model: MuseumShellTransitionViewModel): void {
    this.setTransitionModel(model, '即将进入首个场景');
    this.transitionLayer.dataset.stage = 'enter-preloading';
    this.transitionLayer.classList.add('is-active', 'is-interactive');
    this.transitionLayer.classList.remove('is-leaving');
  }

  startSceneTransition(model: MuseumShellTransitionViewModel): void {
    this.setTransitionModel(model, 'Scene handoff');
    this.transitionLayer.dataset.stage = 'transition';
    this.transitionLayer.classList.add('is-active', 'is-interactive');
    this.transitionLayer.classList.remove('is-leaving');
  }

  showErrorFallback(model: MuseumShellTransitionViewModel): void {
    this.setTransitionModel(model, '载入受阻');
    this.transitionLayer.dataset.stage = 'error';
    this.transitionLayer.classList.add('is-active', 'is-interactive');
    this.transitionLayer.classList.remove('is-leaving');
  }

  markPreviewReady(progressLabel?: string): void {
    this.transitionLayer.dataset.stage = 'preview-ready';
    this.setTransitionProgressLabel(progressLabel);
  }

  completeTransition(): void {
    this.coverLayer.classList.remove('is-active', 'is-interactive');
    this.coverLayer.classList.add('is-leaving');
    this.transitionLayer.classList.remove('is-active', 'is-interactive');
    this.transitionLayer.classList.add('is-leaving');
    window.setTimeout(() => {
      this.coverLayer.classList.remove('is-leaving');
      this.transitionLayer.classList.remove('is-leaving');
      this.transitionLayer.dataset.stage = 'transition';
      this.transitionSnapshot.style.backgroundImage = '';
      this.setTransitionProgressLabel(undefined);
    }, 420);
  }

  isCoverVisible(): boolean {
    return this.coverLayer.classList.contains('is-active');
  }

  private setTransitionModel(model: MuseumShellTransitionViewModel, accentLabel: string): void {
    this.transitionBrand.textContent = model.brandTitle;
    this.transitionAccent.textContent = model.accentLabel || accentLabel;
    this.transitionTitle.textContent = model.title;
    this.transitionSubtitle.textContent = model.subtitle;
    this.setTransitionProgressLabel(model.progressLabel);
    this.transitionBackground.style.backgroundImage = model.backgroundImage
      ? `url("${model.backgroundImage}")`
      : '';
    this.transitionSnapshot.style.backgroundImage = model.snapshotImage
      ? `url("${model.snapshotImage}")`
      : '';
  }

  private setTransitionProgressLabel(progressLabel?: string): void {
    const nextLabel = progressLabel?.trim() ?? '';
    this.transitionProgressLabel.textContent = nextLabel;
    this.transitionProgress.hidden = nextLabel.length === 0;
  }
}

function createVeil(): HTMLDivElement {
  const veil = document.createElement('div');
  veil.className = 'vr-shell-chrome__veil';
  return veil;
}

function createGrain(): HTMLDivElement {
  const grain = document.createElement('div');
  grain.className = 'vr-shell-chrome__grain';
  return grain;
}
