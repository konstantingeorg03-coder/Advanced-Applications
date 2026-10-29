function getInfo(){
    const inputValue = document.getElementById('stopId').value;
    const list = document.getElementById('buses');
    list.innerHTML = '';

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputValue}`)
    .then((response) => {
        if(!response.ok){
            throw new Error (`${response.status}`);
        }

        return response.json();
    }).then((data) => {
        const div = document.getElementById('stopName');
        div.textContent = `${data.name}`;
        
        const buses = Object.entries(data.buses).map((bus) => `<li>Bus ${bus[0]} arrives in ${bus[1]} minutes</li>`);
        list.innerHTML = buses.join('');
    }).catch((error) => {
        const div = document.getElementById('stopName');
        div.innerHTML = 'Error';
    })
}