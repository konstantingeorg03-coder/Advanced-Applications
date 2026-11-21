import { html, render } from './node_modules/lit-html/lit-html.js'

const inputValue = document.getElementById('towns');
const div = document.getElementById('root');
const loadBtn = document.getElementById('btnLoadTowns');

const townsList = (towns) => html`
<ul>
    ${towns.map((town) => html `<li>${town}</li>`)}
</ul>`;

loadBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const userText = inputValue.value;

    const neededText = userText.split(', ');

    render(townsList(neededText), div);
})

