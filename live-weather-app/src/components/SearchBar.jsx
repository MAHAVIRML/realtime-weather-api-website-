import { useState } from "react";
import { getWeather, getForecast } from "../services/weatherApi";

function SearchBar({ setWeather, setForecast }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cityName = city.trim();

      const weatherData = await getWeather(cityName);
      const forecastData = await getForecast(cityName);

      console.log("Weather:", weatherData);
      console.log("Forecast:", forecastData);

      setWeather(weatherData);
      setForecast(forecastData);

      setCity("");
    } catch (error) {
      console.error("Weather error:", error);

      setWeather(null);
      setForecast(null);
      setError("City not found. Please try another city.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span>
              Searching
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {error && <p className="error-message">⚠️ {error}</p>}
    </div>
  );
}

export default SearchBar;