import React, { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import SearchForm from "./components/SearchForm";
import WeatherInfo from "./components/WeatherInfo";
import WeatherFooter from "./components/WeatherFooter";

import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const KEY = "d35958b1b5b4f82862278d8c8b675391";

  const fadeIn = useSpring({
    opacity: weather ? 1 : 0,
    transform: weather ? "translateY(0px)" : "translateY(20px)",
  });

  const handleSearch = async (searchedCity) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${KEY}&units=metric`,
      );

      const icon =
        "https://openweathermap.org/img/wn/" +
        response.data.weather[0].icon +
        "@2x.png";

      const timestamp = new Date(response.data.dt * 1000);
      const day = timestamp.toLocaleDateString("en-GB", {
        weekday: "long",
        timeZone: "UTC",
      });
      const time = timestamp.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        hourCycle: "h23",
        timeZone: "UTC",
      });

      setWeather({
        city: response.data.name,
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        icon: icon,
        time: day + " " + time,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      <animated.div style={fadeIn}>
        <WeatherInfo weather={weather} />
      </animated.div>
      <WeatherFooter />
    </div>
  );
}

export default App;
