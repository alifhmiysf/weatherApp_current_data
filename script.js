

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city =  document.getElementById('cityInput').value
    const apiKey = '068e47eb2e272a1c00ca31e5c3bb5ec0'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const tempCelsius = data.main.temp;
        const tempFahrenheit = (tempCelsius * 9/5) + 32;
        const weatherDescription = data.weather[0].description;
        const cityName = data.name;
        const countryCode = data.sys.country;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        document.getElementById('weatherResult').innerHTML = `
            <h2>${cityName}, ${countryCode}</h2>
            <p>Temperature: ${tempFahrenheit.toFixed(1)}°F</p>
            <p>Temperature: ${tempCelsius}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <img src="${weatherIcon}" alt="weather icon">
        `;
    })
    .catch(error => {
        document.getElementById('weatherResult').innerHTML = `<p>Error: Unable to retrieve weather data</p>`;
    });
});