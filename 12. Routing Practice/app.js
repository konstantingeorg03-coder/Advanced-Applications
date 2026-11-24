import { html, render } from '../node_modules/lit-html/lit-html.js'

import page from '../node_modules/page/page.mjs'

const main = document.querySelector('main');

function homeView(){
    render(html`<h1>Home page </h1>`, main);
}

function aboutView(ctx){
    console.log('4. aboutView започва, получих ctx:', ctx);
    ctx.render(html`<h1>About page</h1>`);
}

function contactView(){
    render(html`<h1>Contact page</h1>`, main);
}

function logger(ctx, next){
    console.log('1. logger започва, ctx е:', ctx);

    ctx.render = (content) => render(content, main);

    console.log('2. добавих ctx.render:', ctx.render);

    console.log('3. викам next()');

    next();
}

page(logger);
page('/', homeView);
page('/about', aboutView);
page('/contact', contactView);
page('/products', productsView);
page('/products/:id', productDetailsView);
page('/home', () => page.redirect('/'));
page('*', notFoundView);

page.start();

function productsView(){
    render(html`
        <h1>Products</h1>
        <ul>
            <li>
                <a href="/products/1">Phone</a>
            </li>

            <li>
                <a href="/products/2">Laptop</a>
            </li>

            <li>
                <a href="/products/3">Tablet</a>
            </li>
        </ul>`, main);
}

function productDetailsView(ctx) {
    render(html`<h1>Products id ${ctx.params.id}</h1>`, main);
}

function notFoundView(){
    render(html`<h1>404 - Page not found</h1>`, main);
}