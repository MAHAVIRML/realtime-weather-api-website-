function WeatherCard({ weather }) {
  if (!weather) return null;

  const icon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const temperature = weather.main.temp.toFixed(1);
  const feelsLike = Math.round(weather.main.feels_like);

  return (
    <div className="weather-card">
      <div className="weather-location">
        <span>📍</span>
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.sys.country}</p>
        </div>
      </div>
      

      <div className="weather-card">

  <div className="cloud-effect"></div>

  <div className="weather-content">
    {/* Your existing weather information */}
  </div>

</div>

      <div className="weather-main">
        <img
          src={iconUrl}
          alt={weather.weather[0].description}
          className="weather-icon"
        />

        <div className="temperature">
          <h1>{temperature}°</h1>
          <p>Celsius</p>
        </div>
      </div>

      <p className="weather-condition">
        {weather.weather[0].description}
      </p>

      <div className="weather-divider"></div>

      <div className="weather-details">
        <div className="detail-card">
          <span className="detail-icon">🌡️</span>
          <p>Feels Like</p>
          <strong>{feelsLike}°C</strong>
        </div>

        <div className="detail-card">
          <span className="detail-icon">💧</span>
          <p>Humidity</p>
          <strong>{weather.main.humidity}%</strong>
        </div>

        <div className="detail-card">
          <span className="detail-icon">💨</span>
          <p>Wind</p>
          <strong>{(weather.wind.speed*3.6).toFixed(1)} km/h</strong>
        </div>
      </div>

      <div className="extra-details">
        <div>
          <span>🌡️</span>
          <p>Min</p>
          <strong>{Math.round(weather.main.temp_min)}°C</strong>
        </div>

        <div>
          <span>🌡️</span>
          <p>Max</p>
          <strong>{Math.round(weather.main.temp_max)}°C</strong>
        </div>

        <div>
          <span>📊</span>
          <p>Pressure</p>
          <strong>{weather.main.pressure} hPa</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;