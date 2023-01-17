import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputFormRef = document.querySelector('input#datetime-picker');
const inputBtnRef = document.querySelector('button[data-start]');

const refs = {
  faceDays: document.querySelector('.value[data-days]'),
  faceHours: document.querySelector('.value[data-hours]'),
  faceMinutes: document.querySelector('.value[data-minutes]'),
  faceSeconds: document.querySelector('.value[data-seconds]'),
};

inputBtnRef.addEventListener('click', () => {
  timerUse.start();
});

class Timer {
  constructor({ onTick, flat }) {
    this.startTime = null;
    this.timerId = null;
    this.isActive = false;
    inputBtnRef.disabled = true;
    this.onTick = onTick;
    this.flat = flat;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const countDownDate = new Date(this.flat.selectedDates);

    this.isActive = true;
    Loading.hourglass('Запушен таймер...');

    this.timerId = setInterval(() => {
      const currentTime = Date.now();

      const goTim = countDownDate - currentTime;
      const { days, hours, minutes, seconds } = this.convertMs(goTim);
      this.onTick({ days, hours, minutes, seconds });
      this.stop(goTim);
    }, 1000);
  }
  stop(tik) {
    if (tik <= '0') {
      Loading.remove();
      clearInterval(this.timerId);
      this.isActive = true;
      this.onTick(this.convertMs(0));
      Report.success('Таймер отработал', 'Спасибо за внимание!', 'Okay');
    }
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  pad(val) {
    return String(val).padStart(2, '0');
  }
}

// ////////////////////////////////////////////////////////
const timerUse = new Timer({
  onTick: updateClockFace,
  flat: flatpickr(inputFormRef, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
        // console.log('❌ Пожалуйста, выберите дату в будущем');
        Notify.failure('Пожалуйста, выберите дату в будущем');
        return;
      }
      Notify.success('Можем запускать таймер!');
      // console.log('✅ Все ок!');
      inputBtnRef.disabled = false;
    },
  }),
});

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.faceDays.textContent = days;
  refs.faceHours.textContent = hours;
  refs.faceMinutes.textContent = minutes;
  refs.faceSeconds.textContent = seconds;
}
