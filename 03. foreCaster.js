function attachEvents() {
    const inputLocation = document.getElementById('location');
    const btn = document.getElementById('submit');

    const symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;'
    };

    btn.addEventListener('click', () => {
        const inputLoc = inputLocation.value;
        const forecastDiv = document.getElementById('forecast');

        // всеки път почваме на чисто: двете кутии с техните надписи
        forecastDiv.innerHTML = `
            <div id="current"><div class="label">Current conditions</div></div>
            <div id="upcoming"><div class="label">Three-day forecast</div></div>`;
        const current = document.getElementById('current');
        const upcoming = document.getElementById('upcoming');

        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            return response.json();
        }).then((data) => {
            const location = data.find((city) => city.name === inputLoc);

            if (!location) {
                throw new Error('Error');
            }

            return fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.code}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            }).then((today) => {
                forecastDiv.style.display = 'block';

                current.innerHTML += `
                <div class="forecasts">
                    <span class="condition symbol">${symbols[today.forecast.condition]}</span>
                    <span class="condition">
                        <span class="forecast-data">${today.name}</span>
                        <span class="forecast-data">${today.forecast.low}&#176;/${today.forecast.high}&#176;</span>
                        <span class="forecast-data">${today.forecast.condition}</span>
                    </span>
                </div>`;

                return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`);
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            }).then((upcomingData) => {
                const days = upcomingData.forecast.map((day) => `
                    <span class="upcoming">
                        <span class="symbol">${symbols[day.condition]}</span>
                        <span class="forecast-data">${day.low}&#176;/${day.high}&#176;</span>
                        <span class="forecast-data">${day.condition}</span>
                    </span>`).join('');

                upcoming.innerHTML += `<div class="forecast-info">${days}</div>`;
            });
        }).catch((error) => {
            forecastDiv.style.display = 'block';
            forecastDiv.textContent = 'Error';
        });
    });
}

attachEvents();