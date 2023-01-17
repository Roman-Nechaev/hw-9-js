import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);
// let position = 0;
let amountValue = 0;
let firstDelay = 0;
let delayStep = 0;
let timerId = null;
let intervalId = null;
let repetitionRate = 0;

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target;

  firstDelay = Number(delay.value);
  delayStep = Number(step.value);
  amountValue = Number(amount.value);
  RunPromis(delayStep, amountValue);
}

function createPromise(position, firstDelay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timerId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, firstDelay });
      } else {
        reject({ position, firstDelay });
      }
    }, firstDelay);
  });
}

function RunPromis(delayStep, amountValue) {
  intervalId = setInterval(() => {
    repetitionRate += 1;
    createPromise(repetitionRate, firstDelay)
      .then(({ position, firstDelay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${firstDelay}ms`);

        console.log(`✅ Fulfilled promise ${position} in ${firstDelay}ms`);
      })
      .catch(({ position, firstDelay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${firstDelay}ms`);

        console.log(`❌ Rejected promise ${position} in ${firstDelay}ms`);
      });
    if (repetitionRate >= amountValue) {
      clearInterval(intervalId);
      repetitionRate = 0;
    }

    firstDelay += delayStep;
  }, delayStep);
}
