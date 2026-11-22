import { html, render } from './node_modules/lit-html/lit-html.js'

const input = document.getElementById('itemText');
const menu = document.getElementById('menu');

const form = document.querySelector('form');
const options = (option) => html`
${option.map((el) => html`<option value=${el._id}>${el.text}</option>`)}`;

function loadItems(){
fetch('http://localhost:3030/jsonstore/advanced/dropdown')
.then((response) => {
    if(!response.ok) throw new Error(`${response.status}`);

    return response.json();

}).then((data) => {
    render(options(Object.values(data)), menu);
});
}

loadItems();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValue = input.value;

    fetch('http://localhost:3030/jsonstore/advanced/dropdown', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: inputValue})
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then(() => {
        loadItems();

        input.value = '';
    })
})