function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let intervalId = null;
buttonStop.setAttribute('disabled', '');

buttonStart.addEventListener('click', onButtonStartClickChangeColor);
buttonStop.addEventListener('click', onButtonStopClick);

function onButtonStartClickChangeColor() {
  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onButtonStopClick() {
  buttonStop.setAttribute('disabled', true);
  buttonStart.removeAttribute('disabled');
  clearInterval(intervalId);
}
