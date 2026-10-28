window.addEventListener('load', loadRecipes);

function loadRecipes(){
    fetch('http://localhost:3030/jsonstore/cookbook/recipes')
    .then((response) => {
        if(!response.ok){
            throw new Error(`${response.status}`);
        }

        return response.json();
    }).then((data) => {
        const main = document.querySelector('main');
        main.innerHTML = '';

        const recipes = Object.values(data).map((recipe) =>
        `<article class="preview" data-id="${recipe._id}">
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src="${recipe.img}">
        </div>
        </article>`
        );

        main.innerHTML = recipes.join('');

        // НОВО: закачаме клик на всяка карта
        document.querySelectorAll('.preview').forEach((article) => {
            article.addEventListener('click', () => loadDetails(article));
        });
    }).catch((error) => {
        const main = document.querySelector('main');
        main.innerHTML = `Error: ${error.message}`;
    });
}

// НОВО: втори fetch при клик
function loadDetails(article){
    const id = article.dataset.id;

    fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`)
    .then((response) => {
        if(!response.ok){
            throw new Error(`${response.status}`);
        }

        return response.json();
    }).then((recipe) => {
        const details = document.createElement('article');
        details.innerHTML = `
        <h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${recipe.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipe.steps.map((step) => `<p>${step}</p>`).join('')}
        </div>`;

        details.addEventListener('click', () => details.replaceWith(article));
        article.replaceWith(details);
    }).catch((error) => {
        alert(`Error: ${error.message}`);
    });
}