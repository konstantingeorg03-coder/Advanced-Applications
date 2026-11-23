import { html, render } from './node_modules/lit-html/lit-html.js'

const body = document.querySelector('body');

let booksNeed = [];
let editBook = null;

const templates = (books) => html`
<button id="loadBooks" @click=${loadBooks}>LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        ${books.map(([id, book]) => html`
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button @click=${() => onEdit(id, book)}>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>`)}
        </tbody>
    </table>

    ${editBook
        ? html`
        <form id="edit-form" @submit=${onSave}>
            <input type="hidden" name="id">
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title..." .value=${editBook.title}>
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author..." .value=${editBook.author}>
            <input type="submit" value="Save">
        </form>`
        : html`
        <form id="add-form" @submit=${onAdd}>
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Submit">
        </form>`}
`;

    render(templates(booksNeed), body);

function loadBooks(){
    fetch('http://localhost:3030/jsonstore/collections/books')
    .then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then((data) => {
        booksNeed = Object.entries(data);
        console.log(booksNeed);

        render(templates(booksNeed), body);
    })
}
loadBooks();

function onAdd(event){
    event.preventDefault();

    const data = new FormData(event.target);
    const title = data.get('title');
    const author = data.get('author');

    if(title === '' || author === '') return;

    fetch('http://localhost:3030/jsonstore/collections/books', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, author})
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then(() => {
        loadBooks();

        event.target.reset();
    });
}

function onEdit(id, book){
    editBook = {id, title: book.title, author: book.author};

    render(templates(booksNeed), body);
}

function onSave(event){
    event.preventDefault();

    const data = new FormData(event.target);
    const title = data.get('title');
    const author = data.get('author');

    if(title === '' || author === '') return;

    fetch(`http://localhost:3030/jsonstore/collections/books/${editBook.id}`, 
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, author})
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then(() => {
        loadBooks();

        event.target.reset();

        editBook = null;
    });
}
