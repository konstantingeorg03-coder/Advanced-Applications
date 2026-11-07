function attachEvents(){
    const list = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const name = document.getElementById('person');
    const phone = document.getElementById('phone');
    const createBtn = document.getElementById('btnCreate');

    loadBtn.addEventListener('click', () => {
        fetch('http://localhost:3030/jsonstore/phonebook')
        .then((response) => {
            if(!response.ok) throw new Error (`${response.status}`);

            return response.json();
        }).then((data) => {
            const dataList = Object.values(data).map((contact) =>
            `<li>${contact.person}: ${contact.phone}<button id="${contact._id}">Delete</button></li>`).join('');

            list.innerHTML = dataList;

            const deleteBtns = list.querySelectorAll('button');

            deleteBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    fetch(`http://localhost:3030/jsonstore/phonebook/${btn.id}`,{method: 'DELETE'})
                    .then((response) => {
                        if(!response.ok) throw new Error (`${response.status}`);

                        return response.json();

                    }).then((userData) => {
                        btn.parentElement.remove();
                    }).catch((err) => {
                        alert(`Error: ${err.message}`);
                    });
                });
            });
        });
    });

    createBtn.addEventListener('click', () => {
        const nameUser = name.value;
        const phoneUser = phone.value;

        fetch('http://localhost:3030/jsonstore/phonebook', 
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({person: nameUser, phone: phoneUser})
            }
        ).then((response) => {
            if(!response.ok) throw new Error (`${response.status}`);

            return response.json();
        }).then((createData) => {
            name.value = '';
            phone.value = '';

            loadBtn.click();
        })
    });
}

attachEvents();