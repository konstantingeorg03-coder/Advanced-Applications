const loadBtn = document.getElementById('loadBooks');
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
let editId = null;

loadBtn.addEventListener('click', () => {
    fetch('http://localhost:3030/jsonstore/collections/books')
    .then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((data) => {
        const entries = Object.entries(data).map(([id, book]) => 
            `<tr id="${id}">
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                </td>
            </tr>`).join('');

        tbody.innerHTML = entries;

        const deleteBtns = tbody.querySelectorAll('.deleteBtn');

        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const row = btn.parentElement.parentElement;

                fetch(`http://localhost:3030/jsonstore/collections/books/${row.id}`, 
                    {
                        method: 'DELETE'
                    }
                ).then((response) => {
                    if(!response.ok) throw new Error (`${response.status}`);

                }).then((deleteData) => {
                    row.remove();
                }).catch((err) => {
                    alert(`Error: ${err.message}`);
                })
            });
        });

        const editBtns = tbody.querySelectorAll('.editBtn');
        
        editBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const editRow = btn.parentElement.parentElement;

                form.querySelector('input[name="title"]').value = editRow.children[0].textContent;
                form.querySelector('input[name="author"]').value = editRow.children[1].textContent;

                editId = editRow.id;
                form.querySelector('h3').textContent = 'Edit FORM';
                form.querySelector('button').textContent = 'Save';
            })
        })
    })
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const title = data.get('title');
    const author = data.get('author');

    if(title === '' || author === ''){
        return;
    }

    let url = 'http://localhost:3030/jsonstore/collections/books';
    let method = 'POST';

    if(editId !== null){
        url = `http://localhost:3030/jsonstore/collections/books/${editId}`;
        method = 'PUT';
    }

    fetch(url, 
        {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author, title})
        }
    ).then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((bookData) => {
        form.reset();
        editId = null;
        form.querySelector('h3').textContent = 'FORM';
        form.querySelector('button').textContent = 'Submit';
        loadBtn.click();
    })
})