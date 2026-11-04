const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const img = data.get('img');
    const ingredients = data.get('ingredients');
    const steps = data.get('steps');

    const ingredientsList = ingredients.split('\n');
    const stepsList = steps.split('\n');

    const token = sessionStorage.getItem('token');

    fetch('http://localhost:3030/data/recipes', 
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json', 'X-Authorization': token},
            body: JSON.stringify({name, img, ingredients: ingredientsList, steps: stepsList})
        }
    ).then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((userData) => {
        window.location = 'index.html';
    })
})