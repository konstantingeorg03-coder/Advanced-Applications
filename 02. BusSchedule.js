function solve() {
    let stopId = 'depot';
    let stopName = ''; 
    let span = document.querySelector('span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`)
        .then((response) => {
            if(!response.ok){
                throw new Error(`${response.status}`);
            }

            return response.json();
        }).then((data) => {
            stopName = data.name;
            stopId = data.next;
            span.textContent = `Next stop ${stopName}`;

            departBtn.disabled = true;
            arriveBtn.disabled = false;
        }).catch((error) => {
            span.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        });
    }

    function arrive() {
        span.innerHTML = `Arriving at ${stopName}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();