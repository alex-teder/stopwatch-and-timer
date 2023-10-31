class Stopwatch {
  private readonly PRECISION_MS = 10;
  private intervalId: number | null = null;
  value = 0;

  constructor() {
    return this;
  }

  get isRunning() {
    return !!this.intervalId;
  }

  get isZero() {
    return !this.value;
  }

  start() {
    this.intervalId = setInterval(() => console.log(this.value++), this.PRECISION_MS);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.value = 0;
  }
}

export default Stopwatch;
