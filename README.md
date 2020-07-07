# COVID19-webApp

API | express.js  
Get regular daily updates on the pandemic across the globe.

## App Features

-----------------

1. It has a Search box to search COVID-19 reports based on Country Name or Country Code. All the Countries data is fetched using [this API](https://api.covid19api.com/countries) (Client-side). See filter.js to see its usage.

2. It can automatically fill the search-box using your Geo-location and give the COVID-19 reports of your country (server-side) on just one click.

## TODO

-----------------

1. server.js DB implementation

2. Graphing data retrieved from [this API](https://api.covid19api.com/dayone/country/india) by Chart.js is pending. This api url given shows data of India. To search for other countries replace 'india' with any other country-slug-name (for eg :- afghanistan) in the url.

## Run the Web App

-----------------

1. Clone this repo locally on your PC in a local directory.

2. Open terminal and ```cd``` to the local directory. Use the command ```npm install``` to install all the dependencies.

    **NOTE**: before proceeding to step 2 make sure you have node.js installed.

3. Run the local server by using command ```node server.js```.

4. Open your browser and enter ```http://localhost:3000/``` in  your browser to run the Web App.
