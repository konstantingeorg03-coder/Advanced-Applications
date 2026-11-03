// ===== 1. ВХОД =====
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(loginForm);
    const email = data.get('email');
    const password = data.get('password');

    fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then((curData) => {
        console.log(curData);
        sessionStorage.setItem('token', curData.accessToken);
        sessionStorage.setItem('userId', curData._id);
    });
});

// ===== 2. СЪЗДАВАНЕ =====
const createForm = document.getElementById('createForm');

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(createForm);
    const name = data.get('name');
    const price = data.get('price');

    const token = sessionStorage.getItem('token');

    fetch('http://localhost:3030/data/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
        body: JSON.stringify({ name, price })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then((secondData) => {
        console.log(secondData);
    });
});

// ===== 3. РЕГИСТРАЦИЯ =====
const registrationForm = document.getElementById('registration');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(registrationForm);
    const email = data.get('email');
    const password = data.get('password');

    fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then((curData) => {
        console.log(curData);
        sessionStorage.setItem('token', curData.accessToken);
        sessionStorage.setItem('userId', curData._id);
    });
});

const btn = document.getElementById('loadBtn');
const list = document.getElementById('list');

btn.addEventListener('click', () => {
    fetch('http://localhost:3030/data/products')
    .then((response) => {
        if(!response.ok){
            throw new Error (`${response.status}`);
        }

        return response.json();
    }).then((products) => {
        console.log(products);
    })
})