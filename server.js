const express = require('express');
const fetch = require("node-fetch");
const https = require('https');//to send a get req from our server to the api server
// const bodyParser = require('body-parser'); //allows to look through the body of post requests
// const { send } = require('process');

const app = express();//initialized app as an express app

app.listen(3000, () => console.log(" server is listening on port 3000"))

app.use(express.static('public'));  //host static files
app.use(express.json({ limit: '1mb' }));

//record user geolocation
app.post('/location', (req, res) => {//  '/location is the route for getting location data'
    console.log('server got a request on route "/location"!');
    console.log(req.body);

    res.json({
        status: 'location received by server. Success!'
    });
});




app.post('/reqCovidDetails', async (req, res) => {
    console.log('server got a request on route "/getCovidDetails"!');
    const requestedCountryCode = req.body.requestedCountryCode;

    //Get Covid details
    let countryCovidDetails = {};
    const covidUrl = "https://api.covid19api.com/summary"
    const response = await fetch(covidUrl);
    const covidData = await response.json();

    covidData.Countries.forEach(Object => {
        if (Object.CountryCode === requestedCountryCode) {
            console.log(Object);
            countryCovidDetails = Object;
            res.json(Object);
        }
    });
});


// app.post("/getCovidDetails", (req, res) => {
//     console.log('server got a request on route "/getCovidDetails"!');
//     const requestedCountryCode = req.body.requestedCountryCode;
//
//     let countryCovidDetails = {};
//     //Get Covid details
//     const covidUrl = "https://api.covid19api.com/summary"
//
//     https.get(covidUrl, (response) => {
//         let chunks = []; //since this api call returns a very large set. we need to get it in chunks
//         response
//             .on('data', (chunk) => {//'data' events can be fired multiple times, so you have to collect all the data values and concatenate them together when the 'end' event has fires
//                 chunks.push(chunk);
//                 //console.log(response.statusCode);
//             })                    // now chunks = [<Buffer 7b 22 47...>, <Buffer 66 69 62...>, <Buffer 63 33 2c...>, ...]
//             .on('end', () => {
//                 let data = Buffer.concat(chunks);
//                 let covidData = JSON.parse(data)  //data is stored in countiesData (which is an object 
//                 covidData.Countries.forEach(Object => {
//                     if (Object.CountryCode === requestedCountryCode) {
//                         console.log(Object);
//                         countryCovidDetails = Object;
//                         res.json(Object);
//                     }
//                 });
//             })
//             .on("error", (error) => { //'error' catches the error and passes to the function)
//                 console.error(error);
//             });
//     });
// });

// let requestedCountryCode = null;
// let newConfirmed = null;
// let totalConfirmed = null;
// let newDeaths = null;
// let totalDeaths = null;
// let newRecovered = null;
// let totalRecovered = null; 