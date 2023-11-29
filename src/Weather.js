import { useEffect } from 'react';
const apikey = '';
let measurement = 'I'; // I = Imperial, M = Metric

export function Weather(type) {
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
                fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apikey) // use fetch to fetch data from the API about the weather conds in the user's area
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
                        let windspeed = data.wind.speed; // wind is in m / s
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
                                if (hour >= 18 || hour <= 6) {
                                    icon.innerHTML = "🌙"
                                }
                                else {
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
                        if (measurement === 'I')
                        {
                            temp = Math.round(((temp - 273.15) * 9) / 5) + 32 + "F"; // F is (((Kelvin - 273.15) * 9) / 5) + 32
                            windspeed = Math.round(windspeed / 0.44704) + " miles per hour"; // MPH is M/S / 0.44704
                        }
                        else if (measurement === 'M')
                        {
                            temp = Math.round(((temp - 273.15) * 9) / 5) + "C"; // C is (((Kelvin - 273.15) * 9) / 5)
                            windspeed = Math.round(windspeed * 3.6) + " kilometers per hour"; // KM/H is M/S * 3.6
                        }
                        desc.innerHTML = weatherdesc + " in  " + city + ". Temperature is " + temp + ". Winds " + winddirection + " at " + windspeed + ".";
                    })
                    .catch((error) =>
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
        throw new Error("Geolocation API is not supported by this browser or is disabled by user choice.");
    }
}

export function WeatherUpdater()
{
    useEffect(() => // we use an useEffect hook to directly be able to update the DOM with new weather every 15 minutes.
    {
        const interval = setInterval(() => {
            Weather();
        }, 900000);

        return () => clearInterval(interval); // clear on page change
    }, []);
}

export function ToggleMeasurements()
{
    Weather();
    return measurement === 'I' ? measurement = 'M' : measurement = 'I';
}

function WindDirection(degree)
{
    // directions are clockwise as that's how degrees also go, in a clockwise fashion
    var directions = ["North", "North East", "East", "South East", "South", "South West", "West", "North West"];
    let i = Math.round(((degree % 360) / 45) % 8);
    return directions[i];
}