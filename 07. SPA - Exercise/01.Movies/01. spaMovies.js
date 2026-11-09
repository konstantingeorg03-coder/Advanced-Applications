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
        sessionStorage.setItem('emailUser', curData.email);
        sessionStorage.setItem('userId', curData._id);

        showView('home-page');
    })
});

