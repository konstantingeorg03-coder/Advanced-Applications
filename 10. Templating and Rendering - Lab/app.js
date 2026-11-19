import {render, html} from './node_modules/lit-html/lit-html.js'

import { contacts } from './contacts.js'

const div = document.getElementById('contacts');

function changeStyle(event){
   const details = event.target.nextElementSibling;

    if(details.style.display === 'block'){
        details.style.display = 'none';
    }else{
        details.style.display = 'block';
    }
}

const contactTemplate = (contact) => html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${contact.name}</h2>
            <button class="detailsBtn" @click=${changeStyle}>Details</button>
            <div class="details" id="${contact.id}">
                <p>Phone number: ${contact.phoneNumber}</p>
                <p>Email: ${contact.email}</p>
            </div>
        </div>
    </div>`;
    
render(contacts.map((contact) => contactTemplate(contact)), div);



