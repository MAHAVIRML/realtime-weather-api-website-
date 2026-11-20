import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import LocationButton from "../components/LocationButton";
import ForecastCard from "../components/ForecastCard";

function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const weatherType =
    weather?.weather?.[0]?.main?.toLowerCase() || "";

  // Calculate real Min & Max from the next 24 hours of forecast data
  let updatedWeather = weather;
  const forecastList = Array.isArray(forecast) ? forecast : forecast?.list;

  if (weather && forecastList?.length > 0) {
    const next24Hours = forecastList.slice(0, 8);
    const temps = next24Hours.map((item) => item.main.temp);

    updatedWeather = {
      ...weather,
      main: {
        ...weather.main,
        temp_min: Math.min(...temps, weather.main.temp),
        temp_max: Math.max(...temps, weather.main.temp),
      },
    };
  }

  return (
    <div className={`home ${weatherType} ${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        {/* Header */}
        <div className="header">
          <span className="header-icon">☁️</span>

          <h1>Live Weather</h1>

          <p>
            Get real-time weather information anywhere in the world
          </p>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Search */}
        <SearchBar
          setWeather={setWeather}
          setForecast={setForecast}
        />

        {/* Divider */}
        <div className="or-divider">
          <span>OR</span>
        </div>

        {/* Current Location */}
        <LocationButton
          setWeather={setWeather}
        />

        {/* Current Weather */}
        <WeatherCard weather={updatedWeather} />

        {/* 5-Day Forecast */}
        <ForecastCard forecast={forecast} />

        {/* Welcome Message */}
        {!weather && (
          <div className="welcome-card">
            <div className="welcome-icon">🌍</div>

            <h2>Check the Weather</h2>

            <p>
              Search for any city or use your current location to see
              real-time weather information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;