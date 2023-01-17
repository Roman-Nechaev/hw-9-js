function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

const DELAY_TIME = 1000;

btnStartRef.addEventListener('click', () => {
  intervalСhangeBg.onPushStartBtn();
});
btnStopRef.addEventListener('click', () => {
  intervalСhangeBg.onPushStopBtn();
});

class TimerBG {
  constructor(st) {
    this.timerId = null;
    this.isActiv = false;
    this.DELAY_TIME = 1000;
  }
  onPushStartBtn() {
    if (this.isActiv) {
      return;
    }

    this.isActiv = true;
    this.timerId = setInterval(() => {
      bodyRef.style.backgroundColor = getRandomHexColor();
    }, DELAY_TIME);
  }
  onPushStopBtn() {
    clearInterval(this.timerId);
    this.isActiv = false;
  }
}
const intervalСhangeBg = new TimerBG();
