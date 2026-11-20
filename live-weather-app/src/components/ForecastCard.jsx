function ForecastCard({ forecast }) {
  const forecastList = Array.isArray(forecast) ? forecast : forecast?.list;

  if (!forecastList || forecastList.length === 0) return null;

  // 1. Group all 3-hour forecast blocks by local date
  const groupedByDate = {};
  forecastList.forEach((item) => {
    const dateKey = new Date(item.dt * 1000).toLocaleDateString("en-CA"); // YYYY-MM-DD
    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = [];
    }
    groupedByDate[dateKey].push(item);
  });

  // 2. Calculate true High (Max), Low (Min), and daytime icon for each day
  const dailyForecast = Object.values(groupedByDate)
    .slice(0, 5)
    .map((items) => {
      const temps = items.map((i) => i.main.temp);
      const maxTemp = Math.round(Math.max(...temps));
      const minTemp = Math.round(Math.min(...temps));

      // Pick the reading closest to 12:00 PM local time for the icon & description
      const middayItem = items.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.dt * 1000).getHours() - 12);
        const currDiff = Math.abs(new Date(curr.dt * 1000).getHours() - 12);
        return currDiff < prevDiff ? curr : prev;
      });

      return {
        dt: middayItem.dt,
        maxTemp,
        minTemp,
        icon: middayItem.weather[0].icon,
        description: middayItem.weather[0].description,
      };
    });

  return (
    <div className="forecast-section">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecast.map((day) => {
          const dayName = new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          });
          const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

          return (
            <div key={day.dt} className="forecast-card">
              <p>{dayName}</p>
              <img src={iconUrl} alt={day.description} />
              <div>
                <strong>
                  {day.maxTemp}° / {day.minTemp}°
                </strong>
                <span style={{ marginLeft: "8px", textTransform: "capitalize" }}>
                  {day.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastCard;