const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const price = data.get('price');

    let product = {name, price};

    fetch('http://localhost:3030/jsonstore/warehouse', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })
})