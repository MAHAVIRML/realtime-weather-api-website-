import { useState } from "react";
import {
  getWeatherByLocation,
  getForecastByLocation
} from "../services/weatherApi";

function LocationButton({ setWeather, setForecast }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const [weatherData, forecastData] = await Promise.all([
            getWeatherByLocation(latitude, longitude),
            getForecastByLocation(latitude, longitude)
          ]);

          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          setError(err.message || "Unable to fetch location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Please allow location access to use this feature.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="location-wrapper">
      <button
        className="location-button"
        onClick={handleLocation}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner dark"></span>
            Getting Location...
          </>
        ) : (
          <>📍 Use My Location</>
        )}
      </button>

      {error && <p className="location-error">⚠️ {error}</p>}
    </div>
  );
}

export default LocationButton;