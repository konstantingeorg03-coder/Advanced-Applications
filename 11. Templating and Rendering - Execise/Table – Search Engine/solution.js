import { html, render } from './node_modules/lit-html/lit-html.js'

const input = document.getElementById('searchField');
const btn = document.getElementById('searchBtn');
const tbodyForStudents = document.querySelector('tbody');

let students = [];

const templates = (elements ,match) => html`${elements.map((el) => html`
   <tr class=${isMatch(el, match) ? 'select' : ''}>
      <td>${el.firstName} ${el.lastName}</td>
      <td>${el.email}</td>
      <td>${el.course}</td>
   </tr>`)}`;

fetch('http://localhost:3030/jsonstore/advanced/table')
.then((response) => {
   if(!response.ok) throw new Error(`${response.status}`);

   return response.json();
}).then((data) => {
   students = Object.values(data);
   render(templates(students), tbodyForStudents);
});

btn.addEventListener('click', () => {
   const inputValue = input.value;

   render(templates(students, inputValue), tbodyForStudents);

   input.value = '';
});

function isMatch(el, match){
   if(!match) return false;

   const text = `${el.firstName} ${el.lastName} ${el.email} ${el.course}`.toLowerCase();

   return text.includes(match.toLowerCase());
}
