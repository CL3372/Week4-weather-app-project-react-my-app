import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherForecast({ city }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!city) return;

    const apiKey = "d35958b1b5b4f82862278d8c8b675391";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }, [city]);

  function handleResponse(response) {
    setForecast(response.data.list);
  }

  function toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }


  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  if (!forecast) {
    return null;
  }

  return (
    <div className="weather-forecast">
      <div className="row">
        {forecast
          .filter((item, index) => index % 8 === 0)
          .slice(0, 5)
          .map(function (forecastDay, index) {
            return (
              <div className="col" key={index}>
                <div className="weather-forecast-date">
                  {formatDay(forecastDay.dt)}
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png`}
                  alt={forecastDay.weather[0].description}
                  width="48"
                />
                <div className="weather-forecast-temperatures">
                  <span className="weather-forecast-temperature-max">
                    {Math.round(forecastDay.main.temp_max)}°C |{" "}
                    {toFahrenheit(forecastDay.main.temp_max)}°F
                  </span>
                 
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

