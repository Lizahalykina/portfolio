import React, { useState } from 'react';
import './WeatherWindow.css';

const WeatherWindow: React.FC = () => {
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clearNight' | 'cloudyNight' | 'rainyNight' | 'snowyNight'>('sunny');

  const handleWeatherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeather(e.target.value as 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clearNight' | 'cloudyNight' | 'rainyNight' | 'snowyNight');
  };

  return (
    <div className="weather-window-container">
      <select onChange={handleWeatherChange} value={weather} className="weather-select">
        <option value="sunny">Sunny (Day)</option>
        <option value="cloudy">Cloudy (Day)</option>
        <option value="rainy">Rainy (Day)</option>
        <option value="snowy">Snowy (Day)</option>
        <option value="clearNight">Clear (Night)</option>
        <option value="cloudyNight">Cloudy (Night)</option>
        <option value="rainyNight">Rainy (Night)</option>
        <option value="snowyNight">Snowy (Night)</option>
      </select>

      <div className={`weather-window ${weather}`}>
        {weather === 'sunny' && <div className="sun"></div>}
        {weather === 'cloudy' && <div className="cloud"></div>}
        {weather === 'rainy' && <div className="rain"></div>}
        {weather === 'snowy' && <div className="snow"></div>}
        {weather === 'clearNight' && <div className="moon"></div>}
        {weather === 'cloudyNight' && <div className="cloud"></div>}
        {weather === 'rainyNight' && <div className="rain"></div>}
        {weather === 'snowyNight' && <div className="snow"></div>}
      </div>
    </div>
  );
};

export default WeatherWindow;
