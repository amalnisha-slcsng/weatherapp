import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  function handleCity(e) {
    setCity(e.target.value);
  }

  function getWeather() {
    const apiKey = '012fe8c656f86b7567bc74bb351e1cdc';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url)
      .then(response => {
        setWeather(response.data);
        setError("");
      })
      .catch(error => {
        setError("There was an error fetching the weather data. Please try again.");
        setWeather(null);
      });
  }

  function getWeatherEmoji(weatherMain) {
    switch (weatherMain) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Drizzle':
        return '🌦️';
      case 'Thunderstorm':
        return '⛈️';
      case 'Snow':
        return '❄️';
      case 'Mist':
      case 'Fog':
        return '🌫️';
      default:
        return '🌡️';
    }
  }

  return (
    <div className="p-[50px] bg-gray-800 min-h-screen flex justify-center items-center">
      <div className="p-[30px] bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-black font-bold text-3xl text-center mb-4">Weather Report {getWeatherEmoji(weather ? weather.weather[0].main : '')}</h1>
        <p className='text-center font-medium mb-4'>Get the latest weather updates for your city!</p>
        <input 
          type='text' 
          onChange={handleCity} 
          value={city}
          placeholder="Enter city"
          className='w-full p-2 border border-gray-300 rounded-lg mb-4'
        />
        <button 
          onClick={getWeather} 
          className='w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>
          Get Report
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        
        {weather && (
          <div className='mt-5'>
            <h2 className='font-bold text-xl'>Weather in {weather.name}, {weather.sys.country} {getWeatherEmoji(weather.weather[0].main)}</h2>
            <p className='font-medium'>Weather: {weather.weather[0].main} {getWeatherEmoji(weather.weather[0].main)}</p>
            <p className='font-medium'>Temperature: {weather.main.temp}°C</p>
            <p className='font-medium'>Description: {weather.weather[0].description}</p>
            <p className='font-medium'>Humidity: {weather.main.humidity}%</p>
            <p className='font-medium'>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
