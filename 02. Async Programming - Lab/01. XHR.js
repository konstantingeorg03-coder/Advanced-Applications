function loadRepos(){
    const request = new XMLHttpRequest;

    request.open('GET', 'https://api.github.com/users/testnakov/repos');

    request.onreadystatechange = function (){
        if(request.readyState === 4){
            document.getElementById('res').textContent = request.responseText;
        }
    }

    request.send();
}