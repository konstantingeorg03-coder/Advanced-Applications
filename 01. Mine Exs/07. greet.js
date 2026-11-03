const form = document.querySelector('form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const username = data.get('username');

    result.textContent = `Hello ${username}`;

    form.reset();
})
