import "./style.css";
import { Stopwatch, StopwatchFace } from "./Stopwatch";

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
