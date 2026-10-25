fetch('https://api.github.com/users/konstantingeorg03-coder').then((response) => {
    console.log('Status:', response.status);
    return response.json();
})
.then((data) => {
    console.log('Profile:', data.login);
    console.log('Repositories:', data.public_repos);
})
.catch((error) => {
    console.log('Error');
})
console.log('Request is send....');

