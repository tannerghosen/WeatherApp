import { GetWeather, WeatherUpdater, ToggleMeasurements } from '../Weather.js';
import { ForecastPage, WeatherPage } from '../Components.js';
import { Spin } from '../Effects.js';
import React, { useEffect , useState } from 'react';

const NewWeather = () =>
{
    const [page, setpage] = useState("weather"); // use a state to store what 'page' we're on
    useEffect(() => // init useeffect that's called every time the page re-renders, to 1. call getweather to get weather and 2. re-setup spin after a 1 second delay
    {
        const init = () =>
        {
            GetWeather(page);
            Spin();
        };
        let timeout = setTimeout(init, 1000); // produce a timeout
        return () => clearTimeout(timeout); // clear timeout if this useeffect exit criteria happens (it will exit if the page re-renders (via 'page' changing))
    }, [page]);
    WeatherUpdater(page); // Why isn't this in the above UseEffect? 2 reasons, 1. you can't put a hook in a hook, and
    // 2. WeatherUpdater also uses UseEffect, meaning it is affected by page re-renders and will exit the function as the page re-rendered, and will be called
    // again with the updated page value.
    function ToggleWeather() // Toggle Weather function, essentially setpage will update the page to either forecast if the current page is weather, or vice versa.
    {
        setpage(thepage => (thepage === "weather" ? "forecast" : "weather")); // set's page to forecast if thepage (current page) is equal to weather, else weather
    }
    // if page === weather, get the weather page skeleton, else get forecast page skeleton
    // if page === weather, <weatherpage>, else <forecastpage>
    return (
        <div className="App" id="App">
            <div className="body">
                {page === "weather" ? <WeatherPage></WeatherPage> : <ForecastPage></ForecastPage>}  
            </div>
            <span width="100%"><button className="settingbutton" onClick={() => { GetWeather(page) }}>Refresh</button> <button className="settingbutton" onClick={() => { ToggleMeasurements(); GetWeather(page); }}>Toggle Imperial/Metric</button> <button className="settingbutton" onClick={() => { ToggleWeather(); }}>Toggle Weather</button></span>
        </div>
    ); 
};

export default NewWeather;
