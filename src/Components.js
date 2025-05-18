// Components for the Weather App
export function WeatherPage()
{
    return <><div id="weathericon"></div><h1 id="weathername">Loading...</h1><div id="weatherdesc">Please wait.</div></>;
}

export function ForecastPage()
{
    return <>
        <h3 id="toptext">Loading...</h3>
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
        </table></>;
}
export function AboutPage()
{
    return <><div id="weathericon">🌙</div><h1 id="weathername">Weather App</h1><div id="weatherdesc">A JavaScript app made by Tanner Ghosen utilizing JavaScript with some React.js and React Router.</div></>
}

export function EasterEgg()
{
}