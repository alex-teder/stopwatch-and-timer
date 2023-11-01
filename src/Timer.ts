export class Timer {
  private intervalId: number | null = null;
  private value = 0;

  constructor() {}

  get isRunning() {
    return !!this.intervalId;
  }

  getValue() {
    return Math.ceil(this.value);
  }

  setValue(newValue: number) {
    this.value = newValue;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.value -= 0.1;
    }, 100);
  }

  stop() {
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }
}

export class TimerFace {
  private readonly REFRESH_RATE_MS = 64;
  private intervalId: number | null = null;
  private minField: HTMLInputElement | null = null;
  private secField: HTMLInputElement | null = null;
  private button: HTMLButtonElement | null = null;
  timer: Timer;

  constructor(timer: Timer) {
    this.timer = timer;
  }

  private toTimerValue(minutes: number, seconds: number) {
    return minutes * 60 + seconds;
  }

  private toReadable(value: number) {
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (value % 60).toString().padStart(2, "0");
    return { minutes, seconds };
  }

  private deactivateFields() {
    this.minField!.readOnly = true;
    this.secField!.readOnly = true;
  }

  private reactivateFields() {
    this.minField!.readOnly = false;
    this.secField!.readOnly = false;
  }

  mount(minField: HTMLInputElement, secField: HTMLInputElement, button: HTMLButtonElement) {
    this.minField = minField;
    this.secField = secField;
    this.button = button;

    this.button.addEventListener("click", () => {
      if (!this.timer.isRunning) {
        this.deactivateFields();
        this.startTimer();
        this.button!.innerText = "STOP";
      } else {
        this.stopTimer();
        this.reactivateFields();
        this.button!.innerText = "START";
      }
    });

    this.minField.addEventListener("input", () => {
      if (this.minField!.value.length > 2) {
        this.minField!.value = this.minField!.value.slice(0, 2);
      }
    });

    this.secField.addEventListener("input", () => {
      if (this.secField!.value.length > 2) {
        this.secField!.value = this.secField!.value.slice(0, 2);
      }
    });

    this.minField.addEventListener("blur", () => {
      if (this.minField!.value.length === 0) {
        this.minField!.value = "00";
      }
    });

    this.secField.addEventListener("blur", () => {
      if (this.secField!.value.length === 0) {
        this.secField!.value = "00";
      }
    });
  }

  startTimer() {
    const readMinutes = parseInt(this.minField!.value);
    const readSeconds = parseInt(this.secField!.value);
    this.timer.setValue(this.toTimerValue(readMinutes, readSeconds));
    this.timer.start();

    this.intervalId = setInterval(() => {
      const { minutes, seconds } = this.toReadable(this.timer.getValue());
      this.minField!.value = minutes;
      this.secField!.value = seconds;

      if (minutes === "00" && seconds === "00") {
        this.endTimer();
      }
    }, this.REFRESH_RATE_MS);
  }

  stopTimer() {
    this.timer.stop();
    clearInterval(this.intervalId!);
    this.intervalId = null;
  }

  async endTimer() {
    this.button!.disabled = true;
    this.stopTimer();

    // blinking animation
    await new Promise<void>((resolve) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        if (counter % 2 !== 0) {
          this.minField!.parentElement!.style.color = "transparent";
        } else {
          this.minField!.parentElement!.style.color = "inherit";
        }
        if (counter === 10) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });

    this.button!.innerText = "START";
    this.button!.disabled = false;
    this.reactivateFields();
  }
}
