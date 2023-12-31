import React, { useEffect, useState } from 'react';
// Config
import config from './config.json';
const apikey = config.apikey; // api key, set in config.json
let measurement = config.measurement; // default measurement on page load, set in config.json. I = Imperial, M = Metric.
let lat = "", lon = ""; // latitude and longitude, which is needed to get the weather in that user's area.
let location = false; // used to determine if we've tried to get the location yet.
let success = true; // used to determine if it succeeded in getting the location.

// Weather function, splits off into Forecast if we're on the 5 Day Forecast Page
export function GetWeather(type)
{
    if (lat !== "" && lon !== "")
    {
        switch (type) {
            default:
            case "weather":
                // Weather Page
                Weather();
                break;

            case "forecast":
                // Forecast Page, let Forecast handle it.
                Forecast();
                break;
        }
    }
    else // if lat and lon aren't set, geolocation api hasn't finished running / hasn't been called yet
    {
        if (location === false) // geolocation api wasn't called yet ?
        {
            Location() // better call geolocating saul
            location = true; // it has been called, no need to call it again (unless it fails)
        }
        else if (success === false) // geolocation api didn't succeed?
        {
            Location() // try again.
        }
        setTimeout(() => GetWeather(type), 10000); // let's wait 10 seconds and call the function again.
    }
}

// Weather is called on the Weather Page once we're sure the Geolocation API was called via GetWeather.
function Weather()
{
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apikey) // use fetch to fetch data from the API about the weather conds in the user's area
            .then((response) => // we try to get a response
            {
                if (response.ok) {
                    return response.json(); // we get the response in JSON
                }
                throw new Error("If you got this error, either the API is down or you do not have a valid API Key.");
            })
            .then((data) => // we got a response, here's the data
            {
                // get the elements that need changing later on
                let name = document.getElementById("weathername");
                let desc = document.getElementById("weatherdesc");
                let icon = document.getElementById("weathericon");
                // This is based on the structure of the JSON response openweathermap gives us.
                let weathername = data.weather[0].main;
                let weatherdesc = data.weather[0].description;
                weatherdesc = weatherdesc.charAt(0).toUpperCase() + weatherdesc.slice(1); // They tend to send description as all lowercase, no puncutation.
                let city = data.name;
                let temp = TempConverter(data.main.temp); // temp is in Kelvin
                let windspeed = WindSpeedConverter(data.wind.speed); // wind is in m / s
                let winddirection = WindDirection(data.wind.deg); // we convert wind degree to a direction

                icon.innerHTML = WeatherIcon(weathername);
                name.innerHTML = weathername === "Squall" ? "Windy" : weathername; // squall is a wind storm

                desc.innerHTML = weatherdesc + " in  " + city + ". Temperature is " + temp + ". Winds " + winddirection + " at " + windspeed + ".";
            })
            .catch((error) =>
            {
                console.error(error); // fetch doesn't work
            });
}

// Forecast is called on 5 Day Forecast once we're sure the Geolocation API was called via GetWeather.
function Forecast()
{
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apikey) // use fetch to fetch data from the API about the weather conds in the user's area
            .then((response) => // we try to get a response
            {
                if (response.ok)
                {
                    return response.json(); // we get the response in JSON
                }
                throw new Error("If you got this error, either the API is down or you do not have a valid API Key.");
            })
            .then((data) => // we got a response, here's the data
            {
                let hi = document.getElementById("hi");
                let city = data.city.name;
                hi.innerHTML = "Here's your 5 Day Forecast for " + city + ".";
                const { list/*, city*/ } = data;
                const WeatherData = [];
                for (let i = 0; i < list.length; i++)
                {
                    // get the day, main (which is where we getr temp), weather, and wind speed/dir from the current data row.
                    const { dt, main, weather, wind } = list[i];

                    let date = new Date(dt * 1000);
                    let dayofweek = date.toLocaleDateString('en-US', { weekday: 'long' });
                    let weathername = weather[0].main;
                    let temp = TempConverter(main.temp);
                    let windspeed = WindSpeedConverter(wind.speed);
                    let winddirection = WindDirection(wind.deg);

                    // Check if data for this day exists already in the WeatherData array, to prevent duplicates.
                    const ExistingData = WeatherData.find((data) => data[0]?.day === dayofweek);
                    // Make Day Object which will be pushed to our WeatherData Array
                    const Day =
                    {
                        day: dayofweek, // day of the week
                        weathername: weathername, // weather's name (for the condition and icon)
                        temp: temp, // temp (converted prior to getting here)
                        windspeed: windspeed, // wind speed (same as above)
                        winddirection: winddirection, //wind direction (same as above)
                    };

                    if (!ExistingData && (date.getHours() >= 12)) // if it doesn't exist and the data for that time is somewhere around 12 (or later if it's later in the day of current day), we add to our WeatherData array.
                    {
                        WeatherData.push([Day]);
                    }
                }
                // get individual rows we'll be outputting into
                let day = document.getElementById("day");
                let name = document.getElementById("weathername");
                let icon = document.getElementById("weathericon");
                let desc = document.getElementById("weatherd");
                // if they were used previously we want to clear them of anything in there
                name.innerHTML = icon.innerHTML = day.innerHTML = desc.innerHTML = " ";
                for (let i = 0; i < 5; i++)
                {
                    const Day = WeatherData[i];
                    day.innerHTML += `<td><h5>${Day[0].day}</h5></td>`;
                    icon.innerHTML += `<td><div id="weathericon">${WeatherIcon(Day[0].weathername)}</div></td>`;
                    name.innerHTML += `<td><h1 id="weathername">${Day[0].weathername}</h1></td>`;
                    desc.innerHTML += `<td><p>${Day[0].temp}<br>Winds ${Day[0].winddirection} at ${Day[0].windspeed}.</p></td>`;
                }
            })
            .catch((error) =>
            {
                console.error(error); // fetch doesn't work
            });
}

function Location() // used to get the location and set latitude and longitude.
{
        if (navigator.geolocation) // we use the built-in geolocation API to get the user's latitude and longitude, but with their permission.
        {
            navigator.geolocation.getCurrentPosition(
                (position) => // we get their position
                {
                    lat = position.coords.latitude; // set lat and lon to the coords we got.
                    lon = position.coords.longitude;
                    success = true;
                },
                (error) => // geolocator doesn't work
                {
                    console.error(error);
                    success = false;
                }
            );
        }
        else
        {
            throw new Error("Geolocation API is not supported by this browser or is disabled by user choice.");
            success = false;
        }
}

export function WeatherUpdater(arg)
{
    useEffect(() => // we use an useEffect hook to directly be able to update the DOM with new weather every 15 minutes.
    {
        const interval = setInterval(() =>
        {
            GetWeather(arg);
        }, 900000);

        return () => clearInterval(interval); // clear on page change
    }, []);
}

export function ToggleMeasurements(arg)
{
    GetWeather(arg);
    return measurement === 'I' ? measurement = 'M' : measurement = 'I';
}

// Converts wind degrees 
function WindDirection(degree)
{
    // directions are clockwise as that's how degrees also go, in a clockwise fashion
    var directions = ["North", "North East", "East", "South East", "South", "South West", "West", "North West"];
    let i = Math.round(((degree % 360) / 45) % 8);
    return directions[i];
}

// Converts wind speed
function WindSpeedConverter(speed)
{
    switch (measurement)
    {
        case 'I':
        default:
            speed = Math.round(speed / 0.44704) + " miles per hour"; // MPH is M/S / 0.44704
            break;
        case 'M':
            speed = Math.round(speed * 3.6) + " kilometers per hour"; // KM/H is M/S * 3.6
            break;
    }
    return speed;
}

// Converts temp
function TempConverter(temp)
{
    switch (measurement)
    {
        case 'I':
        default:
            temp = Math.round(((temp - 273.15) * 9) / 5) + 32 + "F"; // F is (((Kelvin - 273.15) * 9) / 5) + 32
            break;
        case 'M':
            temp = Math.round(((temp - 273.15) * 9) / 5) + "C"; // C is (((Kelvin - 273.15) * 9) / 5)
            break;
    }
    return temp;
}

// Determines weather icon to display depending on weathername
function WeatherIcon(weathername)
{
    switch (weathername)
    {
        // https://openweathermap.org/weather-conditions
        case 'Snow':
            return "🌨️"
            break;
        case 'Rain':
        case 'Drizzle':
            return "🌧️"
            break;
        case 'Thunderstorm':
            return "🌩️"
            break;
        case 'Clouds':
            return "☁️"
            break;
        case 'Clear':
            let time = new Date();
            let hour = time.getHours();
            if (hour >= 18 || hour <= 6)
            {
                return "🌙"
            }
            else
            {
                return "☀️";
            }
            break;
        case 'Fog':
        case 'Haze':
        case 'Mist':
        case 'Dust':
        case 'Ash':
        case 'Sand':
        case 'Smoke':
            return "🌁";
            break;
        case 'Tornado':
            return "🌪️";
            break;
        case 'Squall': // wind storm
            return "💨";
            break;
        default:
            return "❓";
            break;
    }
}