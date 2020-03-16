'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  // functions
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}:${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // initial state
  function setButtonStateInit() {
    start.classList.remove('inactive');;
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  // running state
  function setButtonStateRun() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');;
    reset.classList.add('inactive');
  }

  // stop state
  function setButtonStateStop() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }



  setButtonStateInit();

  // start
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive')) {
      return;
    }
    setButtonStateRun();
    startTime = Date.now();
    countUp();
  });

  // stop
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive')) {
      return;
    }
    setButtonStateStop();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });

  // reset
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive')) {
      return;
    }
    setButtonStateInit();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
}
