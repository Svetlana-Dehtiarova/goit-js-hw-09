import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('button[data-start]');
let inputDate = document.querySelector('#datetime-picker');

let intervalId = null;
let selectedDate = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.setAttribute('disabled', true);
    } else {
      buttonStart.removeAttribute('disabled', '');
    }
  },
};
buttonStart.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  buttonStart.setAttribute('disabled', '');
  inputDate.setAttribute('disabled', '');
  intervalId = setInterval(countDownTime, 1000);
}

function countDownTime() {
  const diff = selectedDate - new Date();
  if (diff <= 0) {
    Notiflix.Notify.success('Timer is Over!');
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(diff);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(inputDate, options);
