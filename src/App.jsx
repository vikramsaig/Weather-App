
import './App.css'
import { Search, MapPin, Wind } from 'react-feather'
import GetWeather from './api/api.jsx';
import { useState , useEffect } from 'react';
import dateFormat from 'dateformat';

function App() {
const[city,setCity]=useState("");
const [weatherinfo,setWeatherinfo]=useState({});
const [error, setError] = useState("");

useEffect(()=>{

  setWeatherinfo(JSON.parse(localStorage.getItem("weatherinfo")));
},[])
useEffect(()=>{
  setTimeout(() => {
    
      localStorage.setItem("weatherinfo",JSON.stringify(weatherinfo))
  }, 100);
})


async function GetweatherbyCity(){
  if (city.trim() === "") {
    setError("Please enter a city name.");
 
    setCity("");
    return;
  }
  setError("");
  const weatherData=await GetWeather(city);
  setWeatherinfo(weatherData);
  setCity("");
}

function getDate(){
  let date= new Date();
  return dateFormat(date, "dddd,mmmm dS , h:MM TT");
}


  return (
    <div className='app'>
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" placeholder="enter city name "value={city} onChange={(e)=>setCity(e.target.value)} />
        <button onClick={()=>GetweatherbyCity()}>
          <Search></Search>
        </button>
      </div>
      {error && <div className="content">
          <h4>{error}</h4>
        </div>}
      {weatherinfo && weatherinfo.weather && !error&&
      <div className="content">
        <div className="location">
           <h2> <MapPin></MapPin>{weatherinfo.name} <span>{weatherinfo.sys.country}</span></h2> 
        </div>
        <p className="datetext">{getDate()} </p>
        <div className="weatherdesc">
          <img src={`https://openweathermap.org/img/wn/${weatherinfo.weather[0].icon}@2x.png`} alt="icon" />
          <h3>{weatherinfo.weather[0].description}</h3>
        </div>
        <div className="tempstats">
          <h1>{weatherinfo.main.temp} <span>&deg;C</span></h1>
          <h3>Feels Like {weatherinfo.main.feels_like} <span>&deg;C</span></h3>
        </div>
        <div className="windstats">

        <h3><Wind></Wind>Wind speed is {weatherinfo.wind.speed}meter/sec     {/*, in {weatherinfo.wind.deg} &deg;C */}</h3> 
        </div>
        </div>
      }
 
      {!weatherinfo.weather && !error&&
        <div className="content">
          <h4>No data found!</h4>
        </div>
}
    
    </div>
  )
}

export default App
