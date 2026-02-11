type IdleHandle = number;

type PickCallbacks = {
  onStart: (clientX: number, clientY: number) => void;
  onMove: (clientX: number, clientY: number) => void;
  onEnd: (clientX: number, clientY: number) => void;
};

type LifecycleOptions = {
  debugMode: boolean;
  longPressThreshold: number;
  onPointerDown: (event: MouseEvent) => void;
  onPointerMove: (event: MouseEvent) => void;
  onPointerUp: () => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: () => void;
  onWheel: (event: WheelEvent) => void;
  onDebugClick: (clientX: number, clientY: number) => void;
  onResize: () => void;
  onTick: (dtMs: number) => void;
};

type EventDisposer = () => void;

export class PanoLifecycleRuntime {
  private readonly dom: HTMLElement;
  private readonly options: LifecycleOptions;
  private readonly eventDisposers: EventDisposer[] = [];
  private readonly pickEventDisposers: EventDisposer[] = [];
  private disposed = false;
  private animationId: number | null = null;
  private lastFrameTimeMs: number | null = null;
  private longPressTimer: number | null = null;

  constructor(dom: HTMLElement, options: LifecycleOptions) {
    this.dom = dom;
    this.options = options;
  }

  bindBaseEvents(): void {
    if (this.disposed) return;

    this.addDomListener('mousedown', (event) => this.options.onPointerDown(event as MouseEvent));
    this.addDomListener('mousemove', (event) => this.options.onPointerMove(event as MouseEvent));
    this.addDomListener('mouseup', () => this.options.onPointerUp());
    this.addDomListener('mouseleave', () => this.options.onPointerUp());

    this.addDomListener('touchstart', (event) => this.options.onTouchStart(event as TouchEvent), {
      passive: false,
    });
    this.addDomListener('touchmove', (event) => this.options.onTouchMove(event as TouchEvent), {
      passive: false,
    });
    this.addDomListener('touchend', () => this.options.onTouchEnd());

    this.addDomListener('wheel', (event) => this.options.onWheel(event as WheelEvent), { passive: false });
    window.addEventListener('resize', this.options.onResize);
    this.eventDisposers.push(() => {
      window.removeEventListener('resize', this.options.onResize);
    });

    if (!this.options.debugMode) {
      return;
    }

    this.addDomListener('dblclick', (event) => {
      const mouseEvent = event as MouseEvent;
      this.options.onDebugClick(mouseEvent.clientX, mouseEvent.clientY);
    });

    this.addDomListener(
      'touchstart',
      (event) => {
        const touchEvent = event as TouchEvent;
        if (touchEvent.touches.length !== 1) return;
        const clientX = touchEvent.touches[0].clientX;
        const clientY = touchEvent.touches[0].clientY;
        this.clearLongPressTimer();
        this.longPressTimer = window.setTimeout(() => {
          this.options.onDebugClick(clientX, clientY);
          this.longPressTimer = null;
        }, this.options.longPressThreshold);
      },
      { passive: true },
    );

    this.addDomListener(
      'touchmove',
      () => {
        this.clearLongPressTimer();
      },
      { passive: true },
    );
    this.addDomListener(
      'touchend',
      () => {
        this.clearLongPressTimer();
      },
      { passive: true },
    );
  }

  startAnimationLoop(): void {
    if (this.disposed || this.animationId !== null) return;
    this.lastFrameTimeMs = null;
    const tick = () => {
      if (this.disposed) return;
      const now = performance.now();
      const dtMs = this.lastFrameTimeMs ? now - this.lastFrameTimeMs : 16.7;
      this.lastFrameTimeMs = now;
      this.options.onTick(dtMs);
      if (this.disposed) return;
      this.animationId = requestAnimationFrame(tick);
    };
    this.animationId = requestAnimationFrame(tick);
  }

  stopAnimationLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.lastFrameTimeMs = null;
  }

  enablePickMode(callbacks: PickCallbacks): void {
    this.disablePickMode();
    if (this.disposed) return;

    const resolvePoint = (
      event: PointerEvent | MouseEvent | TouchEvent,
      useChangedTouches: boolean,
    ): { clientX: number; clientY: number } | null => {
      if (event instanceof TouchEvent) {
        const source = useChangedTouches ? event.changedTouches : event.touches;
        if (source.length !== 1) return null;
        return { clientX: source[0].clientX, clientY: source[0].clientY };
      }
      return { clientX: event.clientX, clientY: event.clientY };
    };

    const addPickListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: AddEventListenerOptions,
    ) => {
      this.dom.addEventListener(type, listener, options);
      this.pickEventDisposers.push(() => {
        this.dom.removeEventListener(type, listener, options as EventListenerOptions);
      });
    };

    const onDown = (event: PointerEvent | MouseEvent | TouchEvent) => {
      const point = resolvePoint(event, false);
      if (!point) return;
      callbacks.onStart(point.clientX, point.clientY);
    };
    const onMove = (event: PointerEvent | MouseEvent | TouchEvent) => {
      const point = resolvePoint(event, false);
      if (!point) return;
      callbacks.onMove(point.clientX, point.clientY);
    };
    const onUp = (event: PointerEvent | MouseEvent | TouchEvent) => {
      const point = resolvePoint(event, true);
      if (!point) return;
      callbacks.onEnd(point.clientX, point.clientY);
    };

    addPickListener('pointerdown', onDown);
    addPickListener('mousedown', onDown);
    addPickListener('touchstart', onDown, { passive: true });
    addPickListener('pointermove', onMove);
    addPickListener('mousemove', onMove);
    addPickListener('touchmove', onMove, { passive: true });
    addPickListener('pointerup', onUp);
    addPickListener('mouseup', onUp);
    addPickListener('touchend', onUp, { passive: true });
  }

  disablePickMode(): void {
    for (const dispose of this.pickEventDisposers) {
      dispose();
    }
    this.pickEventDisposers.length = 0;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.stopAnimationLoop();
    this.disablePickMode();
    this.clearLongPressTimer();
    for (const dispose of this.eventDisposers) {
      dispose();
    }
    this.eventDisposers.length = 0;
  }

  private addDomListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions,
  ): void {
    this.dom.addEventListener(type, listener, options);
    this.eventDisposers.push(() => {
      this.dom.removeEventListener(type, listener, options as EventListenerOptions);
    });
  }

  private clearLongPressTimer(): void {
    if (this.longPressTimer !== null) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }
}

