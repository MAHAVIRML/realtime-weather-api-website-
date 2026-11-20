const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

async function fetchWeather(url) {
  if (!API_KEY) {
    throw new Error("Weather API key is missing");
  }

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Weather request failed");
  }

  return response.json();
}

export async function getWeather(city) {
  return fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
}

export async function getWeatherByLocation(latitude, longitude) {
  return fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
}

export async function getForecast(city) {
  return fetchWeather(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
}

export async function getForecastByLocation(latitude, longitude) {
  return fetchWeather(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
}