window.addEventListener('load', loadRecipes);

function loadRecipes(){
    fetch('http://localhost:3030/jsonstore/cookbook/recipes')
    .then((response) => {
        if(!response.ok){
            throw new Error (`${response.status}`);
        }

        return response.json();
    }).then((data) => {
        const main = document.querySelector('main');
        main.innerHTML = '';

        const recipes = Object.values(data).map((recipe) => 
        `<article class="preview">
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src="${recipe.img}">
        </div>
        </article>`
        );

        main.innerHTML = recipes.join('');
    });
}