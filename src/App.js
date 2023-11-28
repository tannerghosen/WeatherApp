import React, { useEffect } from 'react';
import './App.css';
const apikey = '';

function WindDirection(degree)
{
    // directions are clockwise as that's how degrees also go, in a clockwise fashion
    var directions = ["North", "North East", "East", "South East", "South", "South West", "West", "North West"];
    let i = Math.round(((degree % 360) / 45) % 8);
    return directions[i];
}
function Weather()
{
    // get the elements that need changing later on
    let name = document.getElementById("weathername");
    let desc = document.getElementById("weatherdesc");
    let icon = document.getElementById("weathericon");

    let lat = "", lon = ""; // latitude and longitude, which is needed to get the weather in that user's area.
    if (navigator.geolocation) // we use the built-in geolocation API to get the user's latitude and longitude, but with their permission.
    {
        // we get their position
        navigator.geolocation.getCurrentPosition( 
            (position) =>
            {
               lat = position.coords.latitude; // set lat and lon to the coords we got.
               lon = position.coords.longitude;
                fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+apikey) // use fetch to fetch data from the API about the weather conds in the user's area
                    .then((response) => // we try to get a response
                    {
                        if (response.ok)
                        {
                            return response.json(); // we get the response in JSON
                        }
                        throw new Error('If you got this error, either the API is down or you do not have a valid API Key.');
                    })
                    .then((data) => // we got a response, here's the data
                    {
                        // This is based on the structure of the JSON response openweathermap gives us.
                        let weathername = data.weather[0].main;
                        let weatherdesc = data.weather[0].description;
                        weatherdesc = weatherdesc.charAt(0).toUpperCase() + weatherdesc.slice(1); // They tend to send description as all lowercase, no puncutation.
                        let city = data.name;
                        let temp = data.main.temp; // temp is in Kelvin
                        temp = Math.round(((temp - 273.15) * 9) / 5) + 32;
                        let windspeed = data.wind.speed; // wind is in m / s
                        windspeed = Math.round(windspeed / 0.44704);
                        let winddegree = data.wind.deg; // we convert wind degree to a direction
                        let winddirection = WindDirection(winddegree);

                        name.innerHTML = weathername;
                        switch (weathername)
                        {
                            // https://openweathermap.org/weather-conditions
                            case 'Snow':
                                icon.innerHTML = "🌨️"
                                break;
                            case 'Rain':
                            case 'Drizzle':
                                icon.innerHTML = "🌧️"
                                break;
                            case 'Thunderstorm':
                                icon.innerHTML = "🌩️"
                                break;
                            case 'Clouds':
                                icon.innerHTML = "☁️"
                                break;
                            case 'Clear':
                                let time = new Date();
                                let hour = time.getHours();
                                if (hour >= 18 || hour <= 6)
                                {
                                    icon.innerHTML = "🌙"
                                }
                                else
                                {
                                    icon.innerHTML = "☀️";
                                }
                                break;
                            case 'Fog':
                            case 'Haze':
                            case 'Mist':
                            case 'Dust':
                            case 'Ash':
                            case 'Sand':
                            case 'Smoke':
                                icon.innerHTML = "🌁";
                                break;
                            case 'Tornado':
                                icon.innerHTML = "🌪️";
                                break;
                            case 'Squall': // wind storm
                                icon.innerHTML = "💨";
                                weathername = "Windy";
                                break;
                            default:
                                icon.innerHTML = "❓";
                                break;
                        }
                        desc.innerHTML = weatherdesc + " in  " + city + ". Temperature is " + temp + "F. Winds " + winddirection + " at " + windspeed + " miles per hour. ";
                    })
                    .catch((error) => // something went wrong?
                    {
                        console.error(error); // fetch doesn't work
                 });
            },
            (error) =>
            {
                console.error(error); // geolocator doesn't work
            }
        );
    }
    else
    {
        console.log("Geolocation is not supported by this browser or is disabled by user choice");
    }
}

function WeatherUpdater()
{
    useEffect(() => // we use an useEffect hook to directly be able to update the DOM with new weather every 15 minutes.
    {
        const interval = setInterval(() =>
        {
            Weather();
        }, 900000);

        return () => clearInterval(interval); // clear on page change
    }, []); 
}

function App()
{
    // add a timeout so it doesn't try to call the Weather function before the page is fully loaded.
    setTimeout(() =>
        Weather(), 1000);
    WeatherUpdater();
  return (
    <div className="App">
        <div className="App-header body">
        <div id="weathericon"></div>
        <h1 id="weathername">Please let your browser see your location!</h1>
        <div id="weatherdesc">Otherwise this will not work!</div>
        <button id="refreshweather" onClick={Weather} >Refresh</button>
        </div>
    </div>
  );
}

export default App;
