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
            <div className="App-header body">
                <div id="weathericon"></div>
                <h1 id="weathername">Please let your browser see your location!</h1>
                <div id="weatherdesc">Otherwise this will not work!</div>
            </div>
            <span width="100%"><button id="refreshweather" onClick={GetWeather}>Refresh</button> <button id="refreshweather" onClick={ToggleMeasurements}>Toggle Imperial/Metric</button></span>
        </div>
    );
};

export default weather;
