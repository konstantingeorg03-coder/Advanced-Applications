function loadCommits(){
    const usernameInput = document.getElementById('username').value;
    const repoInput = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${usernameInput}/${repoInput}/commits`;

    fetch(url)
    .then((response) => {
        if(!response.ok){
            throw new Error (`${response.status}`);
        }

        return response.json();
    }).then((data) => {
        const list = document.getElementById('commits');
        list.innerHTML = '';

        list.innerHTML = data.map((item) => `<li>${item.commit.author.name}: ${item.commit.message}</li>`).join('');
    }).catch((error) => {
        const list = document.getElementById('commits');

        list.innerHTML = `<li>Error: ${error.message} (Not Found)</li>`;
    });
}