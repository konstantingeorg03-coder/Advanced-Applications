function solution(){
    const main = document.getElementById('main');
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
    .then((response) => {
        if(!response.ok){
            throw new Error (`${response.status}`);
        }

        return response.json();
    }).then((data) => {
        let infoArticle = data.map((article) => `
        <div class="accordion">
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}">More</button>
            </div>
            <div class="extra">
                <p></p>
            </div>
        </div> `).join('');

        main.innerHTML = infoArticle;

        const buttons = document.querySelectorAll('button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                let card = button.parentElement.parentElement;

                let extra = card.querySelector('.extra');

                if(button.textContent === 'More'){
                    button.textContent = 'Less';

                    fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${button.id}`)
                    .then((response) => {
                        if(!response.ok){
                            throw new Error (`${response.status}`);
                        }

                        return response.json();
                    }).then((curData) => {
                        extra.innerHTML = `
                        <p>${curData.content}</p>`;

                        extra.style.display = 'block';
                    })
                }else{
                    button.textContent = 'More';

                    extra.style.display = 'none';
                }
            })
        })
    })
}

solution();