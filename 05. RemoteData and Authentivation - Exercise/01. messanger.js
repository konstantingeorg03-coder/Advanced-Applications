function attachEvents(){
const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refresh');
const authorInput = document.querySelector('input[name="author"]');
const contentInput = document.querySelector('input[name="content"]');
const textArea = document.getElementById('messages');

submitBtn.addEventListener('click', () => {
    const userText = authorInput.value;
    const messageUser = contentInput.value;

    fetch('http://localhost:3030/jsonstore/messenger', 
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({author: userText, content: messageUser})
        }
    ).then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((data) => {
        authorInput.value = '';
        contentInput.value = '';
    }).catch((err) => {
        alert(`Error: ${err.message}`);
    });
});

refreshBtn.addEventListener('click', () => {
    fetch('http://localhost:3030/jsonstore/messenger')
    .then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();
    }).then((data) => {
        const lines = Object.values(data).map((text) => `${text.author}: ${text.content}`).join('\n');

        textArea.value = lines;
    }).catch((err) => {
        alert(`Error: ${err.message}`);
    })
})
}

attachEvents();