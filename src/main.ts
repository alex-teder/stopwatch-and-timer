import "./style.css";
import { Stopwatch, StopwatchFace } from "./Stopwatch";
import { Timer, TimerFace } from "./Timer";

// -------- STOPWATCH --------
const swFace = document.querySelector("#sw-face") as HTMLElement;
const swResetBtn = document.querySelector("#sw-reset") as HTMLButtonElement;
const swStartStopBtn = document.querySelector("#sw-startstop") as HTMLButtonElement;

const sw = new Stopwatch();
const swf = new StopwatchFace(sw);
swf.mount(swFace, swResetBtn, swStartStopBtn);

// --------- TIMER ---------
const minField = document.querySelector("#min-field") as HTMLInputElement;
const secField = document.querySelector("#sec-field") as HTMLInputElement;
const timerStartStopBtn = document.querySelector("#timer-startstop") as HTMLButtonElement;

const t = new Timer();
const tf = new TimerFace(t);
tf.mount(minField, secField, timerStartStopBtn);
