const express = require('express');
const fetch = require("node-fetch");

const app = express();//initialized app as an express app

app.listen(process.env.PORT || 3000, () => console.log(" server is listening on port 3000"))

app.use(express.static('public'));  //host static files
app.use(express.json({ limit: '1mb' }));

//record user geolocation
app.post('/location', (req, res) => {//  '/location is the route for getting location data'
    console.log('server got a request on route "/location"!');
    console.log(req.body);

    res.json({
        status: 'location received by server. Success!',
        location: req.body
    });
});


app.post('/reqCovidDetails', async (req, res) => {
    console.log('server got a request on route "/reqCovidDetails"!');
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