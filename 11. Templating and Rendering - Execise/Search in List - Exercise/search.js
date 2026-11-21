import { html, render } from './node_modules/lit-html/lit-html.js'

import { towns } from './towns.js'

const div = document.getElementById('towns');

const townsList = (towns, match) => html`
<ul>
   ${towns.map((town) => html`<li class="${town.includes(match) ? 'active' : ''}">${town}</li>`)}
</ul>`;

render(townsList(towns), div);

const btnLoad = document.querySelector('button');

btnLoad.addEventListener('click', search);

function search() {
   const inputUserText = document.getElementById('searchText').value;

   render(townsList(towns, inputUserText), div);

   const count = towns.filter((town) => town.includes(inputUserText)).length;

   document.getElementById('result').textContent = `${count} matches found`;
}






