document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk menampilkan spinner
    function showSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'block'; // Tampilkan spinner
        } else {
            console.error('Spinner tidak ditemukan dalam showSpinner!');
        }
    }

    // Fungsi untuk menyembunyikan spinner
    function hideSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none'; // Sembunyikan spinner
        } else {
            console.error('Spinner tidak ditemukan dalam hideSpinner!');
        }
    }

    // Fungsi untuk mengambil data cuaca berdasarkan kota
    async function fetchWeatherData(city) {
        showSpinner(); // Tampilkan spinner sebelum fetch
    
        try {
            const apiKey = '068e47eb2e272a1c00ca31e5c3bb5ec0'; // Pastikan API Key benar
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
    
            // Proses data dan tampilkan hasil
            const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const tempCelsius = data.main.temp;
            const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
            const weatherDescription = data.weather[0].description;
            const cityName = data.name;
            const countryCode = data.sys.country;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            const weatherResult = document.getElementById('weatherResult');
            if (weatherResult) {
                weatherResult.innerHTML = `
                    <h2>${cityName}, ${countryCode}</h2>
                    <p>Temperature: ${tempFahrenheit.toFixed(1)}°F</p>
                    <p>Temperature: ${tempCelsius}°C</p>
                    <p>Weather: ${weatherDescription}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                    <img src="${weatherIcon}" alt="weather icon">
                `;
            } else {
                console.error('Elemen weatherResult tidak ditemukan!');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            const weatherResult = document.getElementById('weatherResult');
            if (weatherResult) {
                weatherResult.innerHTML = `<p>Error: Unable to retrieve weather data</p>`;
            }
        } finally {
            hideSpinner(); // Sembunyikan spinner setelah fetch
        }
    }

    // Fungsi untuk mengambil data cuaca berdasarkan koordinat lokasi
    async function fetchWeatherDataByLocation(latitude, longitude) {
        showSpinner(); // Tampilkan spinner sebelum fetch

        try {
            const apiKey = '068e47eb2e272a1c00ca31e5c3bb5ec0'; // Pastikan API Key benar
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            displayWeatherData(data, 'geoWeatherResult');
        } catch (error) {
            console.error('Fetch error:', error);
            const geoWeatherResult = document.getElementById('geoWeatherResult');
            if (geoWeatherResult) {
                geoWeatherResult.innerHTML = `<p>Error: Unable to retrieve weather data by location</p>`;
            }
        } finally {
            hideSpinner(); // Sembunyikan spinner setelah fetch
        }
    }

    // Fungsi untuk mengambil ramalan cuaca berdasarkan kota
    async function fetchWeatherForecast(city) {
        showSpinner(); // Tampilkan spinner sebelum fetch

        try {
            const apiKey = '068e47eb2e272a1c00ca31e5c3bb5ec0'; // Pastikan API Key benar
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            displayForecastData(data, 'forecastResult');
        } catch (error) {
            console.error('Fetch error:', error);
            const forecastResult = document.getElementById('forecastResult');
            if (forecastResult) {
                forecastResult.innerHTML = `<p>Error: Unable to retrieve forecast data</p>`;
            }
        } finally {
            hideSpinner(); // Sembunyikan spinner setelah fetch
        }
    }

    // Fungsi untuk mengambil ramalan cuaca berdasarkan koordinat lokasi
    async function fetchWeatherForecastByLocation(latitude, longitude) {
        showSpinner(); // Tampilkan spinner sebelum fetch

        try {
            const apiKey = '068e47eb2e272a1c00ca31e5c3bb5ec0'; // Pastikan API Key benar
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            displayForecastData(data, 'geoForecastResult');
        } catch (error) {
            console.error('Fetch error:', error);
            const geoForecastResult = document.getElementById('geoForecastResult');
            if (geoForecastResult) {
                geoForecastResult.innerHTML = `<p>Error: Unable to retrieve forecast data by location</p>`;
            }
        } finally {
            hideSpinner(); // Sembunyikan spinner setelah fetch
        }
    }

    // Fungsi untuk menampilkan ramalan cuaca
    function displayForecastData(data, resultId) {
        const forecastDiv = document.getElementById(resultId);
        if (!forecastDiv) return;

        const forecastList = data.list.filter((_, index) => index % 8 === 0).map(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const weatherIcon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            const tempCelsius = item.main.temp;
            const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
            const weatherDescription = item.weather[0].description;

            return `
                <div class="forecast-item">
                    <h3>${day}</h3>
                    <p>Temperature: ${tempFahrenheit.toFixed(1)}°F / ${tempCelsius}°C</p>
                    <p>Weather: ${weatherDescription}</p>
                    <img src="${weatherIcon}" alt="weather icon">
                </div>
            `;
        }).join('');

        forecastDiv.innerHTML = `
            <h3>Weather Forecast:</h3>
            ${forecastList}
        `;
    }

    // Fungsi untuk menampilkan data cuaca
    function displayWeatherData(data, resultId) {
        const weatherResult = document.getElementById(resultId);
        if (!weatherResult) return;

        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const tempCelsius = data.main.temp;
        const tempFahrenheit = (tempCelsius * 9 / 5) + 32;
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
    }

    // Fungsi untuk mendapatkan data cuaca berdasarkan lokasi pengguna
    function getUserLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeatherDataByLocation(latitude, longitude);
                fetchWeatherForecastByLocation(latitude, longitude);
            }, (error) => {
                console.error('Geolocation error:', error);
                const geoWeatherResult = document.getElementById('geoWeatherResult');
                if (geoWeatherResult) {
                    geoWeatherResult.innerHTML = `<p>Error: Unable to retrieve location</p>`;
                }
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            const geoWeatherResult = document.getElementById('geoWeatherResult');
            if (geoWeatherResult) {
                geoWeatherResult.innerHTML = `<p>Error: Geolocation is not supported by this browser.</p>`;
            }
        }
    }

    // Panggil fungsi getUserLocationWeather ketika halaman dimuat
    getUserLocationWeather();

    // Event listener untuk tombol Get Weather
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    if (getWeatherBtn) {
        getWeatherBtn.addEventListener('click', () => {
            const cityInput = document.getElementById('cityInput').value;
            if (cityInput) {
                fetchWeatherData(cityInput);
                fetchWeatherForecast(cityInput);
            }
        });
    } else {
        console.error('Tombol getWeatherBtn tidak ditemukan!');
    }

    // Menambahkan event listener untuk toggle theme switch
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const weatherApp = document.querySelector('.weather-app');
            if (themeToggle.checked) {
                weatherApp.classList.add('dark-mode');
                weatherApp.classList.remove('light-mode');
            } else {
                weatherApp.classList.add('light-mode');
                weatherApp.classList.remove('dark-mode');
            }
        });
    } else {
        console.error('Tombol themeToggle tidak ditemukan!');
    }
});
