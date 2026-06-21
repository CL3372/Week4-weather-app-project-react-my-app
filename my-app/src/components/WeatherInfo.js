import { useState } from "react";

export default function WeatherInfo({ weather }) {
  const [isCelsius, setIsCelsius] = useState(true);

  if (!weather) return null;

  function toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  const temperature = isCelsius
    ? weather.temperature
    : toFahrenheit(weather.temperature);

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
          {temperature}
          <span className="weather-app-unit">
            <span
              onClick={() => setIsCelsius(true)}
              style={{ cursor: "pointer", opacity: isCelsius ? 1 : 0.4 }}
            >
              °C
            </span>
            {" | "}
            <span
              onClick={() => setIsCelsius(false)}
              style={{ cursor: "pointer", opacity: isCelsius ? 0.4 : 1 }}
            >
              °F
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
