// Fungsi untuk menampilkan spinner
function showSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    console.log('Showing spinner:', spinner); // Debugging
    if (spinner) {
        spinner.style.display = 'block';
    } else {
        console.error('Spinner element not found!');
    }
}

// Fungsi untuk menyembunyikan spinner
function hideSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    console.log('Hiding spinner - before:', spinner); // Debugging
    if (spinner) {
        spinner.style.display = 'none';
    } else {
        console.error('Spinner element not found!');
    }
}

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    
    const apiKey = '068e47eb2e272a1c00ca31e5c3bb5ec0';
    const weatherResult = document.getElementById('weatherResult');
    
    showSpinner(); // Tampilkan spinner

    weatherResult.innerHTML = '';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const tempCelsius = data.main.temp;
            const tempFahrenheit = (tempCelsius * 9/5) + 32;
            const weatherDescription = data.weather[0].description;
            const cityName = data.name;
            const countryCode = data.sys.country;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherResult.innerHTML = `
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
            console.error('Fetch error:', error);
            weatherResult.innerHTML = `<p>Error: Unable to retrieve weather data</p>`;
        })
        .finally(() => {
            console.log('Hiding spinner - finally, before:', document.getElementById('loadingSpinner')); // Debugging
            hideSpinner();
            console.log('Hiding spinner - finally, after:', document.getElementById('loadingSpinner')); // Debugging
        });
});

// Fungsi untuk mengganti tema
const themeToggle = document.getElementById('themeToggle');
const weatherApp = document.querySelector('.weather-app');

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        weatherApp.classList.add('dark-mode');
        weatherApp.classList.remove('light-mode');
    } else {
        weatherApp.classList.add('light-mode');
        weatherApp.classList.remove('dark-mode');
    }
});

// Set default theme saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    weatherApp.classList.add('light-mode'); // Start with light mode by default
});
