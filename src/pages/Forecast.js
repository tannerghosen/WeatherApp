import { GetWeather, WeatherUpdater, ToggleMeasurements } from '../Weather.js';
const Forecast = () =>
{
    setTimeout(() =>
        GetWeather("forecast"), 1000);
    WeatherUpdater("forecast");
    return (
        <div className="App">
            <div className="App-header body">
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
            <span width="100%"><button id="refreshweather" onClick={() => GetWeather("forecast")}>Refresh</button> <button id="refreshweather" onClick={() => ToggleMeasurements("forecast")}>Toggle Imperial/Metric</button></span>
        </div>
    );
};

export default Forecast;
