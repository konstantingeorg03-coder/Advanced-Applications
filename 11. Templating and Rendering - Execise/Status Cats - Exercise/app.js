import {html, render} from './node_modules/lit-html/lit-html.js'

import { cats } from './catSeeder.js'

const sectionCats = document.getElementById('allCats');

const showCats = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
    <button class="showBtn" @click="${details}">Show status code</button>
        <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

const allCats = (cats) => html`
<ul>
${cats.map((cat) => showCats(cat))}
</ul>`;

render(allCats(cats), sectionCats);

function details(event){
    const target = event.target.nextElementSibling;

    if(target.style.display === 'block'){
        target.style.display = 'none';

        event.target.textContent = 'Show status code';
    }else{
        target.style.display = 'block';

        event.target.textContent = 'Hide status code';
    }
}







