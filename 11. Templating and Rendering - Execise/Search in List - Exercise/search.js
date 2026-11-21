import { html, render } from './node_modules/lit-html/lit-html.js'

import { towns } from './towns.js'

const divForList = document.getElementById('towns');
const resultDiv = document.getElementById('result');
const input = document.getElementById('searchText');
const btn = document.querySelector('button');

const showTowns = (towns, match) => html`
<ul>
${towns.map((town) => html`<li class=${town.includes(match) ? 'active' : ''}>${town}</li>`)}
</ul>`;

render(showTowns(towns), divForList);

btn.addEventListener('click', () => {
   const UserText = input.value;

   render(showTowns(towns, UserText), divForList);

   const count = towns.filter((town) => town.includes(UserText)).length;
   resultDiv.textContent = `${count} matches found`;
});