import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let selectedDate = null;
let intervalId = null;

startBtn.disabled = true;

flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const date = selectedDates[0];
        if (date <= new Date()) {
            iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
            startBtn.disabled = true;
        } else {
            selectedDate = date;
            startBtn.disabled = false;
        }
    },
});

startBtn.addEventListener('click', startCountdown);

function startCountdown() {
    startBtn.disabled = true;
    dateTimePicker.disabled = true;

    intervalId = setInterval(() => {
        const timeLeft = selectedDate - new Date();

        if (timeLeft <= 0) {
            clearInterval(intervalId);
            updateDisplay(0, 0, 0, 0);
            dateTimePicker.disabled = false;
        } else {
            const { days, hours, minutes, seconds } = convertMs(timeLeft);
            updateDisplay(days, hours, minutes, seconds);
        }
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateDisplay(days, hours, minutes, seconds) {
    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}