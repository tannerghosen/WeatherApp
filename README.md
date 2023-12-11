# Weather App
By Tanner Ghosen

<b>Requirements:</b>
<ul>
<li>Visual Studio 2019-2022 with Node.js OR Node.js standalone</li>
<li>OpenWeatherMap API Key (Free would suffice)</li>
</ul>

# Summary
## What is this program and how was it made?
This is a weather browser app made with React that tells you the weather in your location at that very point in time, using built in browser APIs to get your 
geolocation and fetch the weather from the API using your latitude and longitude. The API used for weather is OpenWeatherMap, which has a free API Key. The program
offers a refresh button and automatically refreshes every 15 minutes the page is open.

## How can I run it?
You can either run it through Visual Studio 2019 through 2022 (potentially earlier) using Node.js developer tools, or Node.js itself.<br>
For Visual Studio, simply clone this project from GitHub and run the program in Visual Studio.<br>
For Node.js, open up command prompt and cd to the project folder. Then, type npm start when you're located inside the project folder.<br>
In either case, it will run by default on localhost on port 3000.
The API Key needs to be inputted into the program in order for it to run, which can be found in Weather.js as "const apikey = '';". Put the API key 
the website gives you between the '' 's.
