export default function WeatherInfo({ weather }) {
  if (!weather) return null;

  function toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  return (
    <div className="weather-app-information">
      <div>
        <h1 className="weather-app-city">{weather.city}</h1>
        <p className="weather-app-info">
          <span>{weather.time}</span> <span>{weather.description}</span>
          <br />
          Humidity: <strong>{weather.humidity}%</strong>, Wind:{" "}
          <strong>{weather.windSpeed} km/h</strong>
        </p>
      </div>

      <div className="weather-app-temperature-container">
        <img src={weather.icon} alt={weather.description} />
        <div className="weather-app-temp">
          <span className="weather-app-temp-value">
            {weather.temperature}°C
          </span>
          <span className="weather-app-temp-separator">/</span>
          <span className="weather-app-temp-value">
            {toFahrenheit(weather.temperature)}°F
          </span>
        </div>
      </div>
    </div>
  );
}
