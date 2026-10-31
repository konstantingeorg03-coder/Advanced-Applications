function lockedProfile(){
    const main = document.getElementById('main');

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
    .then((response) => {
        if(!response.ok){
            throw new Error (`${response.status}`);
        }

        return response.json();
    }).then((data) => {
        let users = Object.values(data).map((user) => `
        <div class="profile">
			<img src="./iconProfile2.png" class="userIcon" />
			<label>Lock</label>
			<input type="radio" name="${user.username}Locked" value="lock" checked>
			<label>Unlock</label>
			<input type="radio" name="${user.username}Locked" value="unlock"><br>
			<hr>
			<label>Username</label>
			<input type="text" name="user1Username" value="${user.username}" disabled readonly />
			<div class="user1Username" style="display:none">
				<hr>
				<label>Email:</label>
				<input type="email" name="user1Email" value="${user.email}" disabled readonly />
				<label>Age:</label>
			<input type="number" name="user1Age" value="${user.age}" disabled readonly />
			    </div>
                <button>Show more</button>
		</div>`).join('');

        main.innerHTML = users;

        const buttons = document.querySelectorAll('button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                let card = button.parentElement;

                if(card.querySelector('input[value="unlock"]').checked){
                    let div = card.querySelector('div');

                    if(button.textContent === 'Show more'){
                        button.textContent = 'Hide it';

                        div.style.display = 'block';
                    }else{
                        button.textContent = 'Show more';

                        div.style.display = 'none';
                    }
                }
            });
        })
    })
}