import { GetWeather, WeatherUpdater, ToggleMeasurements } from '../Weather.js';
import { ForecastPage } from '../PageHandler.js';
import { Spin } from '../Effects.js';
const Forecast = () =>
{
    setTimeout(() =>
    {
        GetWeather("forecast");
        Spin();
    }, 1000);
    WeatherUpdater("forecast");
    return (
        <div className="App" id="App">
            <div className="body">
                <ForecastPage></ForecastPage>
            </div>
            <span width="100%"><button className="settingbutton" onClick={() => GetWeather("forecast")}>Refresh</button> <button className="settingbutton" onClick={() => { ToggleMeasurements(); GetWeather("forecast") } }>Toggle Imperial/Metric</button></span>
        </div>
    );
};

export default Forecast;
