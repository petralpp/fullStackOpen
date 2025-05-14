const api_key = import.meta.env.VITE_SOME_KEY

import { useState, useEffect } from "react";
import axios from 'axios'

export const CountryInfo = ({countryInfo}) => {
    const [temp, setTemp] = useState(0);
    const [wind, setWind] = useState(0);
    const [icon, setIcon] = useState("")

    const getWeatherInfo = (lat, lon) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(res => {
        setTemp(res.data.main.temp)
        setWind(res.data.wind.speed)
        setIcon(res.data.weather[0].icon)
      })
      .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${countryInfo.capital},${countryInfo.code}&limit=1&appid=${api_key}`)
        .then(res => {
          const lat = res.data[0].lat;
          const lon = res.data[0].lon;
          getWeatherInfo(lat, lon);
        })
        .catch(err => console.log(err));
    }, [countryInfo])

    return(
    <div>
      <h1>{countryInfo.name}</h1>
      <p>Capital {countryInfo.capital}</p>
      <p>Area {countryInfo.area}</p>
      <h2>Languages</h2>
      <ul>
          {countryInfo.languages.map((language, i) => (
            <li key={i}>{language}</li>
          ))}
      </ul>
      <img src={countryInfo.flag} alt="flag"/>
      <h2>Weather in {countryInfo.capital}</h2>
      <p>Temperature {temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p>Wind {wind} m/s</p>
    </div>
    );
}