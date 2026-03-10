let timer = null;
let seconds = 0;
let isRunning = false;
let lapCount = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");
const themeBtn = document.getElementById("themeBtn");

/* Default Theme */
document.body.classList.add("light");

/* START */
startBtn.addEventListener("click", () => {
  if (isRunning) return;

  timer = setInterval(() => {
    seconds++;
    updateDisplay();
  }, 1000);

  isRunning = true;
});

/* PAUSE / RESUME */
pauseBtn.addEventListener("click", () => {
  if (!isRunning && seconds === 0) return;

  if (isRunning) {
    clearInterval(timer);
    pauseBtn.textContent = "Resume";
    isRunning = false;
  } else {
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
    pauseBtn.textContent = "Pause";
    isRunning = true;
  }
});

/* LAP */
lapBtn.addEventListener("click", () => {
  if (!isRunning) return;

  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount++} - ${display.textContent}`;
  laps.appendChild(li);
});

/* RESET */
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  seconds = 0;
  isRunning = false;
  lapCount = 1;
  laps.innerHTML = "";
  pauseBtn.textContent = "Pause";
  updateDisplay();
});

/* UPDATE DISPLAY */
function updateDisplay() {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  display.textContent =
    String(hrs).padStart(2, '0') + ":" +
    String(mins).padStart(2, '0') + ":" +
    String(secs).padStart(2, '0');
}

/* THEME TOGGLE */
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀";
  } else {
    themeBtn.textContent = "🌙";
  }
});