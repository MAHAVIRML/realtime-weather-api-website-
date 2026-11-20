const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}

export async function getWeatherByLocation(latitude, longitude) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch location weather");
  }

  return response.json();
}

export async function getForecast(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch forecast");
  }

  return response.json();
}