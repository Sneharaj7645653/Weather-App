document.getElementById('weatherForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const error = document.getElementById('error');
    const cityName = document.getElementById('cityName');
    const weatherDescription = document.getElementById('weatherDescription');
    const temperature = document.getElementById('temperature');

    // Clear previous results
    weatherResult.style.display = 'none';
    error.style.display = 'none';

    const city = cityInput.value.trim();
    if (!city) {
        error.textContent = 'Please enter a city name.';
        error.style.display = 'block';
        return;
    }

    try {
        const apiKey = 'e5c2bd07aa4ef0191cae8ce785c09dde'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found.');
        }

        const data = await response.json();
        const { name, weather, main } = data;

        // Update weather details in the UI
        cityName.textContent = name;
        weatherDescription.textContent = weather[0].description;
        temperature.textContent = main.temp;

        weatherResult.style.display = 'block';
    } catch (err) {
        error.textContent = 'Could not fetch weather data. Please check the city name or try again later.';
        error.style.display = 'block';
    }
});