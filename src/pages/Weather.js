import { GetWeather, WeatherUpdater, ToggleMeasurements } from '../Weather.js';
import { WeatherPage } from '../PageHandler.js';
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
        <div className="App" id="App">
            <div className="body">
                <WeatherPage></WeatherPage>
            </div>
            <span width="100%"><button className="settingbutton" onClick={GetWeather}>Refresh</button> <button className="settingbutton" onClick={() => { ToggleMeasurements(); GetWeather(); }}>Toggle Imperial/Metric</button></span>
        </div>
    );
};

export default weather;
