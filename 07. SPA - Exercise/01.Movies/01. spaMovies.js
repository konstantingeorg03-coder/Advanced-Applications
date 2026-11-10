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
        updateNav();
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
        updateNav();
    });
});

function updateNav() {
    const userToken = sessionStorage.getItem('token');

    document.querySelectorAll('.user').forEach((link) => {
        link.style.display = userToken ? 'block' : 'none';
    });

    document.querySelectorAll('.guest').forEach((link) => {
        link.style.display = userToken ? 'none' : 'block';
    });

    document.getElementById('welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
}

updateNav();

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
        updateNav();
    });
});

function loadMovies(){
fetch('http://localhost:3030/data/movies')
.then((response) => {
    if(!response.ok) throw new Error (`${response.status}`);

    return response.json();

}).then((movieData) => {
    const ul = document.getElementById('movies-list');

    ul.textContent = '';

    movieData.forEach((movie) => {
        const homeMovie = document.createElement('li'); homeMovie.className = 'card mb-4';

        homeMovie.innerHTML = `
        <img class="card-img-top" src="${movie.img}">
                <div class="card-body">
                  <h4 class="card-title">${movie.title}</h4>
                  <a href="#">
                  </a>
                </div>
                <div class="card-footer">
                  <button type="button" class="btn btn-info">Details</button>
                </div>`;

        ul.appendChild(homeMovie);

        const btnDetails = homeMovie.querySelector('.btn-info');

        btnDetails.addEventListener('click', () => {
            showDetails(movie);
        });
    });
});
}

loadMovies();

function showDetails(movie){
    showView('movie-example');

    const section = document.getElementById('movie-example');

            section.innerHTML = `
            <div class="container">
                <div class="row bg-light text-dark">
                <h1>Movie title: ${movie.title}</h1>
                <div class="wrapper">
                    <div class="col-md-8">
                        <img class="img-thumbnail" src="${movie.img}" alt="Movie" />
                        </div>
                    <div class="col-md-4 text-center">
                        <h3 class="my-3">Movie Description</h3>
                        <p>${movie.description}</p>
                        <a class="btn btn-danger" href="#">Delete</a>
                        <a class="btn btn-warning" href="#">Edit</a>
                        <a class="btn btn-primary" href="#">Like</a>
                        <span class="enrolled-span">Liked 1</span>
                    </div>
                </div>
            </div>
        </div>`;
}


const btnAddMovie = document.querySelector('#add-movie-button .btn-warning');

btnAddMovie.addEventListener('click', (event) => {
    event.preventDefault();

    showView('add-movie');
});

const formSubmit = document.getElementById('add-movie-form');

formSubmit.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(formSubmit);
    const description = data.get('description');
    const title = data.get('title');
    const img = data.get('img');

    if(description === '' || title === '' || img === ''){
        return;
    }

    
        fetch('http://localhost:3030/data/movies', 
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json', 'X-Authorization': sessionStorage.getItem('token')}, 
            body: JSON.stringify({description, title, img})
        }
    ).then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((moviesData) => {
        showView('home-page');
        loadMovies();
    })
});












