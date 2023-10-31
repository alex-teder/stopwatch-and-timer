import "./style.css";
import Stopwatch from "./Stopwatch";

const sw = new Stopwatch();

document.querySelector("#sw-startstop")?.addEventListener("click", () => {
  if (sw.isRunning) {
    sw.stop();
  } else {
    sw.start();
  }
});
