import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import NewWeather from "./pages/NewWeather";
import About from "./pages/About";
/*
function App()
{
    // add a timeout so it doesn't try to call the Weather function before the page is fully loaded.
    setTimeout(() =>
        Weather(), 1000);
    WeatherUpdater();
  return (
    <div className="App">
        <div className="App-header body">
        <div id="weathericon"></div>
        <h1 id="weathername">Please let your browser see your location!</h1>
        <div id="weatherdesc">Otherwise this will not work!</div>
        <span width="100%"><button id="refreshweather" onClick={Weather}>Refresh</button> <button id="refreshweather" onClick={ToggleMeasurements}>Toggle Imperial/Metric</button></span>
        </div>
    </div>
  );
}

export default App;
*/

function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<NewWeather />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
 }
export default App;