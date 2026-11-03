const form = document.querySelector('form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const firstNum = data.get('a');
    const secondNum = data.get('b');

    const sum = Number(firstNum) + Number(secondNum)

    result.textContent = `Сборът е: ${sum}`;

    form.reset();
})