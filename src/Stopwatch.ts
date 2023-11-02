export class Stopwatch {
  private readonly PRECISION_MS = 10;
  private intervalId: number | null = null;
  /** An integer 0.01 * 1s */
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
  private face: HTMLElement | null = null;
  private resetBtn: HTMLButtonElement | null = null;
  private startStopBtn: HTMLButtonElement | null = null;
  private sw: Stopwatch;

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

  private get textValue() {
    return [this.hours, this.minutes, this.seconds, this.hundredths].map(this.stringify).join(":");
  }

  private updateOnce() {
    this.face!.innerText = this.textValue;
  }

  private watchChanges() {
    this.intervalId = setInterval(() => {
      this.updateOnce();
    }, this.REFRESH_RATE_MS);
  }

  private unwatchChanges() {
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }

  mount(face: HTMLElement, resetBtn: HTMLButtonElement, startStopBtn: HTMLButtonElement) {
    this.face = face;
    this.resetBtn = resetBtn;
    this.startStopBtn = startStopBtn;

    this.updateOnce();

    this.startStopBtn.addEventListener("click", () => {
      if (!this.sw.isRunning) {
        this.sw.start();
        this.watchChanges();
        this.startStopBtn!.innerText = "STOP";
      } else {
        this.sw.stop();
        this.unwatchChanges();
        this.startStopBtn!.innerText = "START";
      }
    });

    this.resetBtn.addEventListener("click", () => {
      this.sw.reset();
      this.updateOnce();
    });
  }
}
