import './App.css';
// import React Hooks useEffect and useState
import React, { useEffect, useState } from "react";
import Weather from './components/Weather';
import { Dimmer, Loader } from 'semantic-ui-react';
export default function App() {

// create two state variables, one for latitude and one for longitude
const [lat, setLat] = useState([]);
const [long, setLong] = useState([]);
const [data, setData] = useState([]);

// useEffect calls navigator.geolocation function to get latitude and longitude and assigns their values to variables
useEffect(() => {
  // navigator.geolocation function reads in the current latitude and longitude values
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

  // fetch call to get the weather data from the openWeather API
  // process.env.REACT_APP_API_URL gets the openweather API URL from the .env file
  // process.env.REACT_APP_API_KEY gets the openweather API key from the .env file
  // /weather/?lat=${lat}&lon=${long}&units=metric are API paremeters
  // /weather is the data we are requesting
  // /?lat=${lat}&lon=${long} are the paramters we are giving the openweather API for the location that we are asking for weather data for
  // &units=metric is the unit format we are requesting
  await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    // convert the response data into json
    .then(res => res.json())
    .then(result => {
      // setData used to store the result of the fetch call in the data object
      setData(result)
      console.log(result);
    });
  }
  fetchData();
}, [lat, long])

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
       </div>
     )}
    </div>
  );
}