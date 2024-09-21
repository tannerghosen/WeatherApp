import { Spin } from '../Effects.js';
const About = () => {
    setTimeout(() => {
        Spin();
    }, 1000);
    return (
        <div className="App" id="App">
            <div className="body">
                <div id="weathericon">⛈️</div><h1 id="weathername">Weather App</h1><div id="weatherdesc">Weather App is a JavaScript application made by Tanner Ghosen. Utilizing mostly vanilla Javascript and some React (for useEffect, useState and React Router DOM), this application is used to gather at the moment weather or a 5 day forecast. The weather service used is provided by OpenWeatherMap and their API. More info on this app can be found <a href="https://github.com/tannerghosen/WeatherApp">here</a>.</div>
            </div>
        </div>
    );
};

export default About;
