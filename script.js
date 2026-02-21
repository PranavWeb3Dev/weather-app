document.addEventListener('DOMContentLoaded', () => {

    const cityInput = document.getElementById('city');
    const getWeatherBtn = document.getElementById('getWeather');
    const showCityName = document.getElementById("city-name");
    const cityTemp = document.getElementById('city-temp');
    const extraInfo = document.getElementById("extra-info");
    const dataInfo = document.getElementById("data-col");
    const error = document.getElementById("error-message");
    const weatherIcon = document.getElementById("weather-icon");
     const loader = document.getElementById("loader");

    const API_KEY = "463125d4efac2e9b64437cd63fed479c";

   getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // Show loader
    loader.classList.remove("hidden");
    dataInfo.classList.add("hidden");
    error.classList.add("hidden");

    try {
        const data = await getWeatherData(city);
        showWeatherData(data);
    } catch (err) {
        showError();
    } finally {
        // Hide loader after request finishes
        loader.classList.add("hidden");
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("City not found");
    }

    return await response.json();
}

function showWeatherData(data) {
    error.classList.add("hidden");
    dataInfo.classList.remove("hidden");

    const { name, main, weather } = data;

    showCityName.textContent = name;
    cityTemp.textContent = `${main.temp}°C`;
    extraInfo.textContent = weather[0].description;

    setWeatherIcon(weather[0].main);
}

function showError() {
    dataInfo.classList.add("hidden");
    error.classList.remove("hidden");
}

function setWeatherIcon(condition) {
    if (condition === "Clear") {
        weatherIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="#facc15">
          <circle cx="12" cy="12" r="5"/>
        </svg>`;
    } 
    else if (condition === "Clouds") {
        weatherIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="#cbd5e1">
          <path d="M6 19h13a4 4 0 0 0 0-8 5 5 0 0 0-9.7-1.5A4 4 0 0 0 6 19z"/>
        </svg>`;
    } 
    else if (condition === "Rain") {
        weatherIcon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="#60a5fa">
          <path d="M6 15h13a4 4 0 0 0 0-8 5 5 0 0 0-9.7-1.5A4 4 0 0 0 6 15z"/>
          <line x1="8" y1="17" x2="8" y2="21" stroke="#60a5fa" stroke-width="2"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="#60a5fa" stroke-width="2"/>
        </svg>`;
    } 
    else {
        weatherIcon.innerHTML = "";
    }
}
});