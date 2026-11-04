function updateNav() {
    const token = sessionStorage.getItem('token');

    if (token) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';
    } else {
        document.getElementById('guest').style.display = 'block';
        document.getElementById('user').style.display = 'none';
    }
}

updateNav();
const form = document.getElementById('registerForm');
const result = document.getElementById('info');
const loginForm = document.getElementById('loginForm');
const savedEmail = sessionStorage.getItem('email');
const btn = document.getElementById('logoutBtn');
const noteForm = document.getElementById('noteForm');
const loadBtn = document.getElementById('loadBtn');
const notesList = document.getElementById('notes');

if (savedEmail) {
    result.textContent = `Влязъл като: ${savedEmail}`;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');

    let userData = {email, password};

    fetch('http://localhost:3030/users/register', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        }).then((response) => {
            if(!response.ok) throw new Error(`${response.status}`);

            return response.json();
        }).then((curData) => {
            sessionStorage.setItem('token', curData.accessToken);
            result.textContent = `Регистриран: ${curData.email}`;
            updateNav();
        }).catch((error) => {
            result.textContent = `Error: ${error.message}`;
        });

    form.reset();
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(loginForm);
    const email = data.get('email');
    const password = data.get('password');

    let userData = {email, password};

    fetch('http://localhost:3030/users/login', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        }).then((response) => {
            if(!response.ok) throw new Error(`${response.status}`);

            return response.json();
        }).then((curData) => {
            sessionStorage.setItem('userId', curData._id);
            sessionStorage.setItem('token', curData.accessToken);
            sessionStorage.setItem('email', curData.email);
            result.textContent = `Влязъл като: ${curData.email}`;
            updateNav();
        }).catch((error) => {
            result.textContent = `Error: ${error.message}`;
        });

    loginForm.reset();
})

btn.addEventListener('click', () => {
    const token = sessionStorage.getItem('token');
    fetch('http://localhost:3030/users/logout',
        {
            headers: {'X-Authorization': token }
        }
    )
    .then(() => {
        sessionStorage.clear();
        updateNav();
        result.textContent = 'Гост';
    })
});

noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(noteForm);
    const text = data.get('text');
    const token = sessionStorage.getItem('token');

    fetch('http://localhost:3030/data/notes', 
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json', 'X-Authorization': token},
            body: JSON.stringify({text})
        }).then((response) => {
            if(!response.ok) throw new Error (`${response.status}`);

            return response.json();
        }).then((note) => {
            result.textContent = `Добавена: ${note.text}`;
            noteForm.reset();
        }).catch((error) => {
            result.textContent = `Грешка: ${error.message}`;
        })
})

loadBtn.addEventListener('click', () => {
    fetch('http://localhost:3030/data/notes')
    .then((response) => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.json();
    })
    .then((notes) => {
        const userId = sessionStorage.getItem('userId');

        notesList.innerHTML = notes.map((note) => {
            if (note._ownerId === userId) {
                return `<li>${note.text} <button>Delete</button></li>`;
            }
            return `<li>${note.text}</li>`;
        }).join('');
    });
});