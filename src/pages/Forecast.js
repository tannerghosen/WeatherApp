import { GetWeather, WeatherUpdater, ToggleMeasurements } from '../Weather.js';
import { Spin } from '../Effects.js';
const Forecast = () =>
{
    setTimeout(() => {
        GetWeather("forecast");
        Spin();
    }, 1000);
    WeatherUpdater("forecast");
    return (
        <div className="App">
            <div className="body">
                <h3 id="hi">Please let your browser see your location! Otherwise this will not work!</h3>
                <table id="weatherforecast">
                    <tbody>
                    <tr id="day">

                    </tr>
                    <tr id="weathername">
                        
                    </tr>
                    <tr id="weathericon">
                        
                    </tr>
                    <tr id="weatherd">
                        
                    </tr>
                    </tbody>
                </table>
            </div>
            <span width="100%"><button id="refreshweather" onClick={() => GetWeather("forecast")}>Refresh</button> <button id="refreshweather" onClick={() => { ToggleMeasurements("forecast"); GetWeather("forecast") } }>Toggle Imperial/Metric</button></span>
        </div>
    );
};

export default Forecast;
