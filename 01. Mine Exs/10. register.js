const form = document.querySelector('form');
const message = document.getElementById('message')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');
    const rePassword = data.get('rePass');

    if(email === '' || password === '' || rePassword === ''){
        message.textContent = 'Всички полета са задължителни';

        return;
    }

    if(password !== rePassword){
        message.textContent = 'Паролите не съвпадат';

        return;
    }

    message.textContent = `Успешна регистрация, ${email}`;

    form.reset();
});