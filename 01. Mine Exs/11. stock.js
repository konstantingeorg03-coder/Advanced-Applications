const form = document.querySelector('form');
const stock = document.getElementById('stock');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const product = data.get('product');
    const qty = data.get('qty');
    const category = data.get('category');

    if(product === '' || Number(qty) <= 0){
        alert('Invalid data!');

        return;
    }

    stock.innerHTML += `
    <tr>
        <td>${product}</td>
        <td>${Number(qty)}</td>
        <td>${category}</td>
    </tr>`;

    form.reset();
})