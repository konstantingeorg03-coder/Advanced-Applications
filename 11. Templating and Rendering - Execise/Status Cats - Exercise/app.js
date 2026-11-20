import { html, render } from './node_modules/lit-html/lit-html.js'

import { cats } from './catSeeder.js'

const catsList = document.getElementById('allCats');

const catTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${details}>Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;

const allCatsTemplate = (cats) => html`
<ul>${cats.map((cat) => catTemplate(cat))}</ul>`

render(allCatsTemplate(cats), catsList);

function details(event){
   const div = event.target.nextElementSibling;

    if(div.style.display === 'block'){
        div.style.display = 'none';

        event.target.textContent = 'Show status code';
    }else{
        div.style.display = 'block';

        event.target.textContent = 'Hide status code';
    }
}

