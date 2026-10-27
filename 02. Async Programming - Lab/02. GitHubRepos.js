function loadRepos(){
    const inputValue = document.getElementById('username').value;
    const url = `https://api.github.com/users/${inputValue}/repos`;

    fetch(url)
    .then((response) => {
        if(!response.ok){
            throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
    }).then((data) => {
        const list = document.getElementById('repos');
        list.innerHTML = '';

        list.innerHTML = data.map((repo) => ```<li><a href="${repo.html_url}">${repo.full_name}</a></li>`).join('');
    }).catch((error) => {
        const list = document.getElementById('repos');
        list.innerHTML = `<li>${error.message}</li>`;
    });
}