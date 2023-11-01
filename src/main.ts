import "./style.css";
import { Stopwatch, StopwatchFace } from "./Stopwatch";
import { Timer, TimerFace } from "./Timer";

// -------- STOPWATCH --------
const swStartStopBtn = document.querySelector("#sw-startstop") as HTMLButtonElement;
const swResetBtn = document.querySelector("#sw-reset") as HTMLButtonElement;

const sw = new Stopwatch();
const swf = new StopwatchFace(sw);
swf.mount(document.querySelector("#sw-face")!);

swStartStopBtn.addEventListener("click", () => {
  if (!sw.isRunning) {
    sw.start();
    swf.watch();
    swStartStopBtn.innerText = "STOP";
  } else {
    sw.stop();
    swf.unwatch();
    swStartStopBtn.innerText = "START";
  }
});

swResetBtn.addEventListener("click", () => {
  sw.reset();
  swf.updateOnce();
});

// --------- TIMER ---------
const minField = document.querySelector("#min-field") as HTMLInputElement;
const secField = document.querySelector("#sec-field") as HTMLInputElement;
const timerStartStopBtn = document.querySelector("#timer-startstop") as HTMLButtonElement;

const t = new Timer();
const tf = new TimerFace(t);
tf.mount(minField, secField, timerStartStopBtn);
