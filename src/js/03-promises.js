import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';


const formClassElement = document.querySelector('.form');
formClassElement.addEventListener('submit', onbtnSubmit);

function onbtnSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget;

  let delayFirst = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountNumber = Number(amount.value);

  for (let position = 1; position <= amountNumber; position += 1) {
    createPromise(position, delayFirst);
    delayFirst += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });


  promise
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
        fontSize: '14px',
      });
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
        fontSize: '14px',
      });
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}