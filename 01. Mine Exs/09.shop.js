const form = document.querySelector('form');
const list = document.getElementById('list');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('item');

    list.innerHTML += `<li>${name}</li>`

    form.reset();
})