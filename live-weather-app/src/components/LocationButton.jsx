import { useState } from "react";
import { getWeatherByLocation } from "../services/weatherApi";

function LocationButton({ setWeather }) {
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
          const data = await getWeatherByLocation(latitude, longitude);
          setWeather(data);
        } catch (error) {
          setError("Unable to fetch weather for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Please allow location access to use this feature.");
        setLoading(false);
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