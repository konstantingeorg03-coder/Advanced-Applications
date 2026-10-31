function attachEvents() {
    const input = document.getElementById('location');
    const btn = document.getElementById('submit');
    const div = document.getElementById('forecast');

    const symbols = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;'
    };

    btn.addEventListener('click', () => {
        let userText = input.value;

        div.innerHTML = `
        <div id="current"><div class="label">Current conditions</div></div>
        <div id="upcoming"><div class="label">Three-day forecast</div></div>`;

        const curWeather = document.getElementById('current');
        const upcoming = document.getElementById('upcoming');

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then((response) => {
            if(!response.ok){
                throw new Error (`${response.status}`);
            }

            return response.json();
        }).then((data) => {
            let findLoc = data.find((city) => city.name === userText);

            if(!findLoc){
                throw new Error ('Error');
            }

            return fetch(`http://localhost:3030/jsonstore/forecaster/today/${findLoc.code}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error (`${response.status}`);
                }

                return response.json();
            }).then((curData) => {
                div.style.display = 'block';

                curWeather.innerHTML += `
                <div class="forecasts">
                    <span class="condition symbol">${symbols[curData.forecast.condition]}</span>
                    <span class="condition">
                        <span class="forecast-data">${curData.name}</span>
                        <span class="forecast-data">${curData.forecast.low}&#176;/${curData.forecast.high}&#176;</span>
                        <span class="forecast-data">${curData.forecast.condition}</span>
                    </span>
                </div>`;

                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${findLoc.code}`)
                .then((response) => {
                    if(!response.ok){
                        throw new Error (`${response.status}`);
                    }

                    return response.json();
                }).then((threeDaysdata) => {
                    const days = threeDaysdata.forecast.map((el) => `
                    <span class="upcoming">
                        <span class="symbol">${symbols[el.condition]}</span>
                        <span class="forecast-data">${el.low}&#176;/${el.high}&#176;</span>
                        <span class="forecast-data">${el.condition}</span>
                    </span>`).join('');

                    upcoming.innerHTML += `<div class="forecast-info">${days}</div>`;
                })
            })
        }).catch((error) => {
            div.style.display = 'block';
            div.textContent = 'Error';
        });

    });
}

attachEvents();