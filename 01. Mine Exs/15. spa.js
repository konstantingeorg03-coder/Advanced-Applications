import { showView } from "./15. views.js";

const homeBtn = document.getElementById('homeBtn');
const aboutBtn = document.getElementById('aboutBtn');

homeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showView('home');
});

aboutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showView('about');
});