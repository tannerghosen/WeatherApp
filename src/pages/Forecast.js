import { Weather, WeatherUpdater, ToggleMeasurements } from '../Weather.js';
const Forecast = () =>
{
    setTimeout(() =>
        Weather("forecast"), 1000);
    WeatherUpdater("forecast");
    return (
        <div className="App">
            <div className="App-header body">
                <h3 id="hi">Please let your browser see your location! Otherwise this will not work!</h3>
                <table>
                    <tbody>
                    <tr id="weatheroutput">
                        
                    </tr>
                    </tbody>
                </table>
            </div>
            <span width="100%"><button id="refreshweather" onClick={Weather("forecast")}>Refresh</button> <button id="refreshweather" onClick={ToggleMeasurements}>Toggle Imperial/Metric</button></span>
        </div>
    );
};

export default Forecast;
