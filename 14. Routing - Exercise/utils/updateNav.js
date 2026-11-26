export function updateNav(){
    const logUser = document.getElementById('user');
    const guest = document.getElementById('guest');

    const token = sessionStorage.getItem('accessToken');

    if(token) {
        guest.style.display = 'none';

        logUser.style.display = 'inline-block';
    }else{
        guest.style.display = 'inline-block';

        logUser.style.display = 'none';
    }
}