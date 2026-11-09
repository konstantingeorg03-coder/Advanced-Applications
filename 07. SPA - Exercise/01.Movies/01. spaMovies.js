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
})

