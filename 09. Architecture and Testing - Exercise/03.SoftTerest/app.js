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

    fetch('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc')
    .then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((data) => {
        dashboard.innerHTML = '';
        data.forEach((el) => {
            const card = document.createElement('div');
            card.className = 'card overflow-hidden current-card details';
            dashboard.appendChild(card);
            card.innerHTML = `<div class="card-body">
                <p class="card-text">${el.title}</p>
            </div>
            <img class="card-image" src="${el.img}" alt="Card image cap">
            <a class="btn" href="">Details</a>`;

            const detailsBtn = card.querySelector('.btn');

            detailsBtn.addEventListener('click', (event) => {
                event.preventDefault();
                
                fetch(`http://localhost:3030/data/ideas/${el._id}`)
                .then((response) => {
                    if(!response.ok) throw new Error(`${response.status}`);

                    return response.json();
                }).then((data) => {
                    details.innerHTML = `<img class="det-img" src="${data.img}" />
                    <div class="desc">
                        <h2 class="display-5">${data.title}</h2>
                        <p class="infoType">Description:</p>
                        <p class="idea-description">${data.description}</p>
                    </div>`;

                    const user = JSON.parse(sessionStorage.getItem('user'));

                    if(user && user._id === data._ownerId){
                        details.innerHTML += `<div class="text-center"><a class="btn detb" href="">Delete</a></div>`;

                        const deleteBtn = details.querySelector('.detb');

                        deleteBtn.addEventListener('click', (event) => {
                            event.preventDefault();

                            if(!confirm('Are you sure?')) return;

                            fetch(`http://localhost:3030/data/ideas/${data._id}`, 
                                {
                                    method: 'DELETE',
                                    headers: {'X-Authorization': user.accessToken}
                                }
                            ).then((response) => {
                                if(!response.ok) throw new Error (`${response.status}`);

                                dashBoardLink.click();
                            }).catch((error) => {
                                alert(error.message);
                            })
                        })
                    }

                    showView(details);
                    console.log(data);
                }).catch((err) => {
                    alert(err.message);
                })
            })
        })

        if(data.length === 0){
            dashboard.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
        }
    }).catch((error) => {
        alert(error.message);
    })
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
    });
});

const createForm = create.querySelector('form');

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(createForm);
    const title = data.get('title');
    const description = data.get('description');
    const img = data.get('imageURL');

    if(title.length < 6 || description.length < 10 || img.length < 5){
        alert('Error');
        return;
    }

    const user = JSON.parse(sessionStorage.getItem('user'));

    fetch('http://localhost:3030/data/ideas', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-Authorization': user.accessToken},
            body: JSON.stringify({title, description, img})
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();

    }).then((createData) => {
        showView(dashboard);
        createForm.reset();
        dashBoardLink.click();
    }).catch((error) => {
        alert(error.message);
    })
})






