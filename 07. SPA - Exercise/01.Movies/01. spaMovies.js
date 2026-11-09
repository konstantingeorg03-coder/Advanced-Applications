function showView(id){
    const sections = document.querySelectorAll('.view-section');

    sections.forEach((section) => {
        section.style.display = 'none';
    });

    const needSection = document.getElementById(id);

    needSection.style.display = 'block';
}
showView('home-page');

const login = document.querySelector('.nav-item.guest .nav-link');

login.addEventListener('click', () => {
    showView('form-login');
});

const links = document.querySelectorAll('.nav-link');

const register = links[3];

register.addEventListener('click', () => {
    showView('form-sign-up');
});

const movies = document.querySelector('.navbar-brand');

movies.addEventListener('click', (event) => {
    event.preventDefault();
    showView('home-page');
});

const formLogin = document.getElementById('login-form');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data =  new FormData(formLogin);
    const email = data.get('email');
    const password = data.get('password');

    await fetch('http://localhost:3030/users/login', 
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then((curData) => {
        sessionStorage.setItem('token', curData.accessToken);
        sessionStorage.setItem('email', curData.email);
        sessionStorage.setItem('userId', curData._id);

        showView('home-page');
    });
});

const formRegister = document.getElementById('register-form');

formRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const regData = new FormData(formRegister);
    const email = regData.get('email');
    const password = regData.get('password');
    const repPassword = regData.get('repeatPassword');

    if(email === '' || password.length < 6){
        return;
    }

    if(repPassword !== password){
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
        sessionStorage.setItem('email', userData.email);
        sessionStorage.setItem('userId', userData._id);
         
        showView('home-page');
    });
});

const userToken = sessionStorage.getItem('token');

const linksUser = document.querySelectorAll('.user');

linksUser.forEach((link) => {
    if(userToken){
        link.style.display = 'block';
    }else{
        link.style.display = 'none';
    }
});

const logLinks = document.querySelectorAll('.guest');

logLinks.forEach((logLink) => {
    if(userToken){
        logLink.style.display = 'none';
    }else{
        logLink.style.display = 'block';
    }
});

const logOut = links[1];

logOut.addEventListener('click', (event) => {
    event.preventDefault();

    fetch('http://localhost:3030/users/logout',
        {
            headers: {'X-Authorization': sessionStorage.getItem('token')}
        }
    )
    .then(() => {
        sessionStorage.clear();
        showView('form-login');
    })
})



