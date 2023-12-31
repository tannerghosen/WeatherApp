import React, { useState } from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Weather from "./pages/Weather";
import Forecast from "./pages/Forecast";
import NoPage from "./pages/NoPage";


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
                    <Route index element={<Weather />} />
                    <Route path="/forecast" element={<Forecast />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
 }
export default App;