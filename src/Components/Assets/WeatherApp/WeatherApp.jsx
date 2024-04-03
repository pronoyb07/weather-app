import React, { useState } from 'react'
import './WeatherApp.css'


import search_icon from '../search.png'
import clear_icon from '../clear.png'
import cloud_icon from '../cloud.png'
import drizzle_icon from '../drizzle.png'
import rain_icon from '../rain.png'
import snow_icon from '../snow.png'
import wind_icon from '../wind.png'
import humidity_icon from '../humidity.png'


const WeatherApp = () => {
  
  let api_key = '9d3851d162229973640e5dd62d3581b5'

  const [wicon,setWicon] = useState(cloud_icon);
  

  const search = async () =>{
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value === "")
    {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
  const wind = document.getElementsByClassName("wind-rate");
  const temperature = document.getElementsByClassName("weather-temp");
  const location = document.getElementsByClassName("weather-location");
  const celsiusTemperature = data.main.temp - 273.15;

  if (humidity.length > 0) {
    humidity[0].innerHTML = data.main.humidity + " %";
  }
  if (wind.length > 0) {
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
  }
  if (temperature.length > 0) {
    temperature[0].innerHTML = Math.floor(celsiusTemperature) + "°C";
  }
  if (location.length > 0) {
    location[0].innerHTML = data.name;
  }


  if (data.weather && data.weather.length > 0) {
    const weatherIcon = data.weather[0].icon;
    switch (weatherIcon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        break;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        setWicon(drizzle_icon);
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWicon(rain_icon);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        break;
      default:
        setWicon(clear_icon);
        break;
    }
  }    
  }



  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className='cityInput' placeholder='Search' />
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon} alt="Search Image" />
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="cloud icon" />
      </div>
      <div className="weather-temp">24°</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src="" alt="" className='icon' />
          <div className='data'>
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" className='icon' />
          <div className='data'>
            <div className="wind-rate">18 km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp