const homePage = document.getElementById('homePage');
const register = document.getElementById('registerPage');
const login = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard-holder');
const details = document.getElementById('detailsPage');
const create = document.getElementById('createPage');

const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const homeLink = document.getElementById('homeLink');
const dashBoardLink = document.getElementById('dashBoardLink');
const createLink = document.getElementById('createLink');
const logoutLink = document.getElementById('logoutLink');

const footer = document.querySelector('.footer');
showView(homePage);
updateNav();

function showView(section){
    homePage.remove();
    register.remove();
    login.remove();
    dashboard.remove();
    details.remove();
    create.remove();

    footer.before(section);
}

loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    showView(login);
});

registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    showView(register);
});

homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    showView(homePage);
});

dashBoardLink.addEventListener('click', (event) => {
    event.preventDefault();
    showView(dashboard);
});

createLink.addEventListener('click', (event) => {
    event.preventDefault();
    showView(create);
});

function updateNav(){
    if(sessionStorage.getItem('user')){
        createLink.style.display = 'block';
        logoutLink.style.display = 'block';

        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
    }else{
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';

        createLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

const registerForm = register.querySelector('form');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(registerForm);
    const email = data.get('email');
    const password = data.get('password');
    const repeatPassword = data.get('repeatPassword');

    if(email.length < 3 || password.length < 3 || repeatPassword !== password){
        alert('error');
        return;
    }

    fetch('http://localhost:3030/users/register', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();

    }).then((data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        updateNav();
        showView(homePage);
    }).catch((err) => {
        alert(err.message);
    });
});

const loginForm = login.querySelector('form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const logData = new FormData(loginForm);
    const email = logData.get('email');
    const password = logData.get('password');

    fetch('http://localhost:3030/users/login', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then((data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        showView(homePage);
        updateNav();
        loginForm.reset();
    }).catch((error) => {
        alert(error.message);
    });
});

logoutLink.addEventListener('click', (event) => {
    event.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));

    fetch('http://localhost:3030/users/logout', 
        {
            method: 'GET',
            headers: {'X-Authorization': user.accessToken},
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        sessionStorage.removeItem('user');
        showView(homePage);
        updateNav();
    }).catch((error) => {
        alert(error.message);
    })
})






