// Error-related things
const [errortitle, errormessage, erroricon] = ["An error has occured.", "Please try again later. If this occurs often, report the error below.<br>Error: ", "❌"];

// Error function, handles displaying an error to the screen.
export function WError(error)
{
    let day = document.getElementById("day");
    let name = document.getElementById("weathername");
    let icon = document.getElementById("weathericon");
    let descd = document.getElementById("weatherd");
    let desc = document.getElementById("weatherdesc");
    let hi = document.getElementById("hi");

    // if we're on forecast
    if (hi != null && descd != null)
    {
        name.innerHTML = icon.innerHTML = day.innerHTML = descd.innerHTML = " ";
        hi.innerHTML = errortitle;
        descd.innerHTML = "<td><p>" + errormessage + error + "</p></td>";
        icon.innerHTML = "<td><div id='weathericon'>" + erroricon + "</div></td>";
    }
    else // if we're on weather
    {
        name.innerHTML = errortitle;
        desc.innerHTML = errormessage + error;
        icon.innerHTML = erroricon;
    }
}
