import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate = null;
let intervalId = null;

startBtn.disabled = true;

flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        handleDateSelection(selectedDates[0]);
    },
});

function handleDateSelection(date) {
    if (date <= new Date()) {
        iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
        startBtn.disabled = true;
    } else {
        selectedDate = date;
        startBtn.disabled = false;
    }
}

