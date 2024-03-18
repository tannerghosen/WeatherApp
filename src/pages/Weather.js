import { GetWeather, WeatherUpdater, ToggleMeasurements } from '../Weather.js';
import { Spin } from '../Effects.js';
const weather = () =>
{
    setTimeout(() =>
    {
        GetWeather();
        Spin();
    }, 1000);
    WeatherUpdater();
    return (
        <div className="App">
            <div className="body">
                <div id="weathericon"></div>
                <h1 id="weathername">Loading...</h1>
                <div id="weatherdesc">Please wait.</div>
            </div>
            <span width="100%"><button id="refreshweather" onClick={GetWeather}>Refresh</button> <button id="refreshweather" onClick={ToggleMeasurements, GetWeather}>Toggle Imperial/Metric</button></span>
        </div>
    );
};

export default weather;
