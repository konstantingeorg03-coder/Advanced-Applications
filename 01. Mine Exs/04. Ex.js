const btn = document.getElementById('addBtn');

btn.addEventListener('click', () => {
    let product = {name: 'Izar Shoes', price: 300};

    fetch('http://localhost:3030/jsonstore/warehouse', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })
    .then((response) => {
        if(!response.ok){
            throw new Error (`${response.status}`);
        }

        return response.json();
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log('Error:', error.message);
    })
})