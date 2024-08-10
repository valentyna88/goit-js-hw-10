import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })

})