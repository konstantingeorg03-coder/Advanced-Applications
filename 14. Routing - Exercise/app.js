import { getFurnitures } from "./data/getFurnitures.js";
import { furnitureListTemplate } from "./views/furnitureAllViews.js";
import { renderToMain } from "./utils/showViews.js";
import page from '/node_modules/page/page.mjs';
import { updateNav } from "./utils/updateNav.js";
import { registerTemplate } from "./views/formRegister.js";
import { registerUser } from "./data/sendData.js";
import { loginTemplate } from "./views/loginForm.js";
import { loginUser } from "./data/sendData.js";
import { logoutUser } from "./data/sendData.js";
import { createTemplate } from "./views/createForm.js";
import { createFurniture } from "./data/sendData.js";
import { detailsTemplate } from "./views/detailsView.js";
import { getFurnitureById } from "./data/sendData.js";
import { editTemplate } from "./views/editForm.js";
import { editFurniture } from "./data/sendData.js";
import { deleteFurniture } from "./data/sendData.js";
import { myFurnitureTemplate } from "./views/myFurnitureView.js";
import { getMyFurniture } from "./data/sendData.js";

function showFurnitures(){
    getFurnitures().then((furnitures) => renderToMain(furnitureListTemplate(furnitures)));
}

function showRegister(){
    renderToMain(registerTemplate(onRegister));
}

function onRegister(event){
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    const rePass = data.get('rePass');

    if(email === '' || password === '' || rePass === ''){
        alert('Error');
        return;
    }
        
    if(rePass !== password){
        alert('Incorrect Password')

        return;
    }

    registerUser(email, password).then((user) => {
        sessionStorage.setItem('accessToken', user.accessToken);
        sessionStorage.setItem('userId', user._id);
        updateNav();
        page.redirect('/');
    }).catch((err) => {
        alert(err.message);
    });
}

function showLogin(){
    renderToMain(loginTemplate(onLogin));
}

function onLogin(event){
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');

    if(email === '' || password === ''){
        alert('Error: Empty field');

        return;
    }

    loginUser(email, password).then((user) => {
        sessionStorage.setItem('accessToken', user.accessToken);
        sessionStorage.setItem('userId', user._id);
        updateNav();
        page.redirect('/');
    }).catch((err) => {
        alert(err.message);
    })
}

function onLogout(){
    logoutUser().then(() => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userId');
        updateNav();
        page.redirect('/');
    }).catch((err) => {
        alert(err.message);
    });
}

function showCreate(){
    renderToMain(createTemplate(onCreate));
}

function onCreate(event){
    event.preventDefault();

    const data = new FormData(event.target);
    const make = data.get('make');
    const model = data.get('model');
    const year = data.get('year');
    const description = data.get('description');
    const price = data.get('price');
    const img = data.get('img');
    const material = data.get('material');

    if(make.length < 4 || model.length < 4){
        alert('Error -> Too short input');

        return;
    }

    if(year < 1950 || year > 2050){
        alert('Error -> Invalid Year');

        return;
    }

    if(description.length <= 10){
        alert('Invalid Description');

        return;
    }

    if(price <= 0){
        alert('Invalid Price');

        return;
    }

    if(img === ''){
        alert('Error -> invalid img');

        return;
    }

    const furniture = {make: make, model: model, year: Number(year), price: Number(price), description: description, img: img, material: material}

    createFurniture(furniture).
    then(() => {
        page.redirect('/')}).
    catch((err) => {
        alert(err.message);
    })
}

function showDetails(ctx){
    const id = ctx.params.id;
    getFurnitureById(id).
    then((furniture) => {
    const isOwner = sessionStorage.getItem('userId') === furniture._ownerId;
    renderToMain(detailsTemplate(furniture, isOwner, () => onDelete(id)));
    });
}

function showEdit(ctx){
    const id = ctx.params.id;
    getFurnitureById(id).
    then((furniture) => {
    renderToMain(editTemplate(furniture, (event) => onEdit(event, id)));
    });
}

function onEdit(event, id){
    event.preventDefault();

    const data = new FormData(event.target);
    const make = data.get('make');
    const model = data.get('model');
    const year = data.get('year');
    const description = data.get('description');
    const price = data.get('price');
    const img = data.get('img');
    const material = data.get('material');

    if(make.length < 4 || model.length < 4){
        alert('Error -> Too short input');

        return;
    }

    if(year < 1950 || year > 2050){
        alert('Error -> Invalid Year');

        return;
    }

    if(description.length <= 10){
        alert('Invalid Description');

        return;
    }

    if(price <= 0){
        alert('Invalid Price');

        return;
    }

    if(img === ''){
        alert('Error -> invalid img');

        return;
    }

    const furniture = {make: make, model: model, year: Number(year), price: Number(price), description: description, img: img, material: material}

    editFurniture(id, furniture).
    then(() => {
        page.redirect(`/details/${id}`)}).
    catch((err) => {
        alert(err.message);
    })
}

function onDelete(id){
    if(!confirm('Are you sure?')){
        return;
    }

    deleteFurniture(id)
    .then(() => {
        page.redirect('/');
    })
    .catch((err) => {
        alert(err.message);
    });
}

function showMyFurniture(){
    const userId = sessionStorage.getItem('userId')
    getMyFurniture(userId).then((furnitures) => renderToMain(myFurnitureTemplate(furnitures)));

}

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout);

updateNav();
page('/my-furniture', showMyFurniture);
page('/edit/:id', showEdit);
page('/details/:id', showDetails);
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
page('/', showFurnitures);
page.start();



