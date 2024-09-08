# Weather App
By Tanner Ghosen

<b>Requirements:</b>
<ul>
<li>Visual Studio 2019-2022 with Node.js OR Visual Studio Code with Node.js OR Node.js standalone</li>
<li>React installed locally in node_modules / globally</li>
<li>React Router DOM installed locally in node_modules / globally</li>
<li>OpenWeatherMap API Key (Free would suffice)</li>
</ul>

# Summary
## What is this program and how was it made?
This is a weather browser app made with mostly Javascript and some React that tells you the weather in your location at that very point in time, using built in browser APIs to get your 
geolocation and fetch the weather from the API using your latitude and longitude. The API used for weather is OpenWeatherMap, which has a free API Key. The program
offers a refresh button and automatically refreshes every 15 minutes the page is open.

## How can I run it?
You can either run it through Visual Studio 2019 through 2022 (potentially earlier) using Node.js developer tools, or VS Code with Node.js installed, or Node.js itself<br>
For Visual Studio, in the virtual terminal type npm install to install dependencies then npm start or launch the program manually in the IDE to launch it.<br>
For VS Code, in the virtual terminal type npm install to install dependencies then npm start to launch it.<br>
For Node.js, open up command prompt and cd to the project folder. Then, type npm install to install dependencies then npm start when you're located inside the project folder.<br>
In any case, it will run by default on localhost on port 3000.<br>
The API Key needs to be inputted into the program in order for it to run, which can be found in config.json as "apikey". Put the API key 
the website gives you between the "" 's.<br>
To alter the default measurement on page load, go into config.json and change "measurement" from I for Imperial to M for Metric, or vice versa.