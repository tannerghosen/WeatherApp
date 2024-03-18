import React, { useEffect, useState } from 'react';
// Config
import config from './config.json';
const apikey = config.apikey; // api key, set in config.json
const debug = config.debug; // debug flag, set in config.json
if (!localStorage.getItem("measurement")) // default measurement on first page load, set in config.json. I = Imperial, M = Metric.
{
    localStorage.setItem("measurement", config.measurement);
}
let measurement = localStorage.getItem("measurement"); // we use localstorage to load the measurement. 
let lat = "", lon = ""; // latitude and longitude, which is needed to get the weather in that user's area.
let location = false; // used to determine if we've tried to get the location yet.

// Error-related things
const [errortitle, errormessage, erroricon] = ["An error has occured.", "Please try again later. If this occurs often, report the error below.<br>Error: ", "❌"]

// Weather function, splits off into Forecast if we're on the 5 Day Forecast Page
export async function GetWeather(type)
{
    if (lat !== "" && lon !== "")
    {
        switch (type)
        {
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
        if (location === false) // geolocation api wasn't called yet or failed?
        {
            await Location(); // better call geolocating saul
        }
        setTimeout(() => GetWeather(type), 1000); // let's wait 1 second and call the function again.
    }
}

// Weather is called on the Weather Page once we're sure the Geolocation API was called via GetWeather.
function Weather()
{
        let name = document.getElementById("weathername");
        let desc = document.getElementById("weatherdesc");
        let icon = document.getElementById("weathericon");
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apikey) // use fetch to fetch data from the API about the weather conds in the user's area
            .then((response) => // we try to get a response
            {
                if (response.ok)
                {
                    return response.json(); // we get the response in JSON
                }
                return false;
            })
            .then((data) => // we got a response, here's the data
            {
                // get the elements that need changing later on
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
                return true;
            })
            .catch((error) =>
            {
                name.innerHTML = errortitle;
                desc.innerHTML = errormessage + error;
                icon.innerHTML = erroricon;
                console.error(error); // fetch doesn't work
                return false;

            });
}

// Forecast is called on 5 Day Forecast once we're sure the Geolocation API was called via GetWeather.
function Forecast()
{
        let day = document.getElementById("day");
        let name = document.getElementById("weathername");
        let icon = document.getElementById("weathericon");
        let desc = document.getElementById("weatherd");
        let hi = document.getElementById("hi");
        fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apikey) // use fetch to fetch data from the API about the weather conds in the user's area
            .then((response) => // we try to get a response
            {
                if (response.ok)
                {
                    return response.json(); // we get the response in JSON
                }
                return false;
            })
            .then((data) => // we got a response, here's the data
            {
                let city = data.city.name;
                hi.innerHTML = "Here's your 5 Day Forecast for " + city + ".";
                const { list } = data; // our data that we read in our for loop that contains weather information for up to 5 days.
                const WeatherData = []; // contains our 5 days once the for loop below is done
                for (let i = 0; i < list.length; i++) // go through the list of weathers we got for 5 days, it's not just 5 results.
                {
                    // get the day, main (which is where we get temp), weather, and wind (which is where we get speed/dir) from the current data row.
                    const { dt, main, weather, wind } = list[i];

                    let date = new Date(dt * 1000);
                    let dayofweek = date.toLocaleDateString('en-US', { weekday: 'long' });
                    let weathername = weather[0].main;
                    let temp = TempConverter(main.temp);
                    let windspeed = WindSpeedConverter(wind.speed);
                    let winddirection = WindDirection(wind.deg);


                    // Check if data for this day exists already in the WeatherData array
                    const ExistingData = WeatherData.find((data) => data[0]?.day === dayofweek);
                    if (!ExistingData && (date.getHours() >= 12)) // if it doesn't exist in our WeatherData array and the time is greater than 12, continue
                    {
                        // Make Day Object which will be pushed to our WeatherData Array
                        const Day =
                        {
                            day: dayofweek, // day of the week
                            weathername: weathername, // weather's name (for the condition and icon)
                            temp: temp, // temp (converted prior to getting here)
                            windspeed: windspeed, // wind speed (same as above)
                            winddirection: winddirection, //wind direction (same as above)
                        };

                        WeatherData.push([Day]); // we add to our WeatherData array.
                        // Why do I want 12 or later?
                        // Because we'll get the first result it possibly can otherwise, which doesn't accurately reflect the general weather of the day at 12am.
                    }
                }
                // if they were used previously we want to clear them of anything in there
                name.innerHTML = icon.innerHTML = day.innerHTML = desc.innerHTML = " ";
                for (let i = 0; i < 5; i++) // insert each day's weather info into each of the rows
                {
                    const Day = WeatherData[i];
                    // We access the Day object at [0], because that's the only Day object for that individual day.
                    day.innerHTML += `<td><h5>${Day[0].day}</h5></td>`;
                    icon.innerHTML += `<td><div id="weathericon">${WeatherIcon(Day[0].weathername)}</div></td>`;
                    name.innerHTML += `<td><h1 id="weathername">${Day[0].weathername}</h1></td>`;
                    desc.innerHTML += `<td><p>${Day[0].temp}<br>Winds ${Day[0].winddirection} at ${Day[0].windspeed}.</p></td>`;
                }
                return true;
            })
            .catch((error) =>
            {
                name.innerHTML = icon.innerHTML = day.innerHTML = desc.innerHTML = " ";
                hi.innerHTML = errortitle;
                desc.innerHTML = "<td><p>" + errormessage + error + "</p></td>";
                icon.innerHTML = "<td><div id='weathericon'>" + erroricon + "</div></td>";
                console.error(error); // fetch doesn't work
                return false;
            });
}

async function Location() // used to get the location and set latitude and longitude.
{
    let day = document.getElementById("day");
    let name = document.getElementById("weathername");
    let icon = document.getElementById("weathericon");
    let descb = document.getElementById("weatherd");
    let desc = document.getElementById("weatherdesc");
    let hi = document.getElementById("hi");
    return new Promise((success, fail) => // make a promise
    {
        if (navigator.geolocation) // we use the built-in geolocation API to get the user's latitude and longitude, but with their permission.
        {
                navigator.geolocation.getCurrentPosition( // using navigator.geolocation.getCurrentPosition function...
                    (position) => // we get their position
                    {
                        lat = position.coords.latitude; // set lat and lon to the coords we got.
                        lon = position.coords.longitude;
                        location = true; // we got the location
                        success(); // we fufilled our promise, success
                    },
                    (error) => // geolocator doesn't work
                    {

                        console.error(error);
                        if (hi != null && descb != null)
                        {
                            name.innerHTML = icon.innerHTML = day.innerHTML = desc.innerHTML = " ";
                            hi.innerHTML = errortitle;
                            desc.innerHTML = "<td><p>" + errormessage + error + "</p></td>";
                            icon.innerHTML = "<td><div id='weathericon'>" + erroricon + "</div></td>";
                        }
                        else
                        {
                            name.innerHTML = errortitle;
                            desc.innerHTML = errormessage + error;
                            icon.innerHTML = erroricon;
                        }
                        location = false; // set it to false so we get called again to get the location.
                        fail(error); // failed
                    }
                );
        }
        else
        {
            fail("Blocked / not supported"); // failed
            location = false; 
        }
    });
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
    // if measurement is I, set it to M, otherwise set it to I
    measurement === 'I' ? measurement = 'M' : measurement = 'I';
    localStorage.setItem("measurement", measurement);
}

// Converts wind degrees 
export function WindDirection(degree)
{
    // directions are clockwise as that's how degrees also go, in a clockwise fashion
    var directions = ["North", "North East", "East", "South East", "South", "South West", "West", "North West"];
    let i = Math.round(((degree % 360) / 45) % 8);
    i = i === 8 ? 0 : i; // if i is 8, it should point to North then, so set it to 0.
    return directions[i];
}

// Converts wind speed
export function WindSpeedConverter(speed)
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
export function TempConverter(temp)
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
export function WeatherIcon(weathername)
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
            return "🌫️";
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