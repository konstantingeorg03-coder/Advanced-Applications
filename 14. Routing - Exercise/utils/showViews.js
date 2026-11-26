import { render } from '/node_modules/lit-html/lit-html.js'

export function renderToMain(content){
    const main = document.querySelector('main');

    render(content, main);
}