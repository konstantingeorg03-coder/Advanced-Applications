export function registerUser(email, password){
    return fetch('http://localhost:3030/users/register', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }
    ).then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();

    }).then((data) => {
        return data;
    })
}

export function loginUser(email, password){
    return fetch('http://localhost:3030/users/login', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }
    ).then((response) => {
        if(!response.ok) throw new Error (`${response.status}`);

        return response.json();

    }).then((data) => {
        return data;
    })
} 

export function logoutUser(){
    return fetch('http://localhost:3030/users/logout',
        {
            headers: {'X-Authorization': sessionStorage.getItem('accessToken')}
        }
    ).
    then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);
    })
}

export function createFurniture(furniture){
    return fetch('http://localhost:3030/data/catalog',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-Authorization': sessionStorage.getItem('accessToken')},
            body: JSON.stringify(furniture)
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();

    }).then((data) => {
        return data;
    })
}

export function getFurnitureById(id){
    return fetch(`http://localhost:3030/data/catalog/${id}`)
    .then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();

    }).then((data) => {
        return data;
    });
}

export function editFurniture(id, furniture){
    return fetch(`http://localhost:3030/data/catalog/${id}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'X-Authorization': sessionStorage.getItem('accessToken')},
            body: JSON.stringify(furniture)
        }
    ).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();

    }).then((data) => {
        return data;
    })
}

export function deleteFurniture(id){
    return fetch(`http://localhost:3030/data/catalog/${id}`, {
        method: 'DELETE',
        headers: {'X-Authorization': sessionStorage.getItem('accessToken')}        
    }).then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);
    })
}

export function getMyFurniture(userId){
    return fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`)
    .then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();

    }).then((data) => {
        return data;
    });
}