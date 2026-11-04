const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');
    const rePass = data.get('rePass');

    if(rePass !== password){
        alert("Passwords don't match");

        return;
    }

    fetch('http://localhost:3030/users/register', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }
    ).then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((userData) => {
        sessionStorage.setItem('token', userData.accessToken);

        window.location = 'index.html';
    })
})