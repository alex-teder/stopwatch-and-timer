export class Stopwatch {
  private readonly PRECISION_MS = 10;
  private intervalId: number | null = null;
  value = 0;

  constructor() {}

  get isRunning() {
    return !!this.intervalId;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.value++;
    }, this.PRECISION_MS);
  }

  stop() {
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }

  reset() {
    this.value = 0;
  }
}

export class StopwatchFace {
  private readonly REFRESH_RATE_MS = 32;
  private intervalId: number | null = null;
  private element: HTMLElement | null = null;
  sw: Stopwatch;

  constructor(sw: Stopwatch) {
    this.sw = sw;
  }

  private get hours() {
    return Math.floor(this.sw.value / 360000);
  }

  private get minutes() {
    const remainingHundredths = this.sw.value % 360000;
    return Math.floor(remainingHundredths / 6000);
  }

  private get seconds() {
    const remainingHundredths = (this.sw.value % 360000) % 6000;
    return Math.floor(remainingHundredths / 100);
  }

  private get hundredths() {
    return ((this.sw.value % 360000) % 6000) % 100;
  }

  private stringify(value: number) {
    return value.toString().padStart(2, "0");
  }

  private get value() {
    return [this.hours, this.minutes, this.seconds, this.hundredths].map(this.stringify).join(":");
  }

  mount(el: HTMLElement) {
    this.element = el;
    this.element.innerText = this.value;
  }

  updateOnce() {
    this.element!.innerText = this.value;
  }

  watch() {
    this.intervalId = setInterval(() => {
      this.updateOnce();
    }, this.REFRESH_RATE_MS);
  }

  unwatch() {
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }
}
