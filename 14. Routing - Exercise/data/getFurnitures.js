export function getFurnitures(){
    return fetch('http://localhost:3030/data/catalog').
    then((response) => {
        if(!response.ok) throw new Error(`${response.status}`);

        return response.json();
    }).then((data) => {
        return data;
    })
}