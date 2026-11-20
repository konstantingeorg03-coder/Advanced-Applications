import { render, html } from './node_modules/lit-html/lit-html.js'

const inputTowns = document.getElementById('towns');
const divTowns = document.getElementById('root');

const townsList = (towns) => html`
    <ul>
        ${towns.map((town) => html`<li>${town}</li>`)}
    </ul>`;

const loadBtn = document.getElementById('btnLoadTowns');

loadBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const inputValue = inputTowns.value.split(', ');

    render(townsList(inputValue), divTowns);
})