const express = require('express');
const https = require('https');//to send a get req from our server to the api server

const app = express();//initialized app as an express app

let RequestedCountryCode = null;
let newConfirmed = null;
let totalConfirmed = null;
let newDeaths = null;
let totalDeaths = null;
let newRecovered = null;
let totalRecovered = null; 

app.get("/", (req, res) => {

    const covidUrl = "https://api.covid19api.com/summary"
    https.get(covidUrl, (response) => {
        //console.log(response.headers);
        
        //since this api call returns a very large set. we need to get it in chunks
        let chunks = [];
        response
            .on('data', (chunk)=>{//'data' events can be fired multiple times, so you have to collect all the data values and concatenate them together when the 'end' event has fires
                chunks.push(chunk);
                //console.log(response.statusCode);
            })                    // now chunks = [<Buffer 7b 22 47...>, <Buffer 66 69 62...>, <Buffer 63 33 2c...>, ...]
            .on('end', ()=>{
                let data = Buffer.concat(chunks);
                let covidData = JSON.parse(data)  //data is stored in countiesData (which is an object 
                covidData.Countries.forEach(Object => {
                    if(Object.CountryCode === RequestedCountryCode){
                        newConfirmed = Object.NewConfirmed;
                        newDeaths = Object.NewDeaths;
                        newRecovered = Object.NewRecovered;
                        totalConfirmed = Object.TotalConfirmed;
                        totalDeaths = Object.TotalDeaths;
                        totalRecovered = Object.TotalRecovered;
                    }
                });
            })
            .on("error", (error) => { //'error' catches the error and passes to the function)
                console.error(error);
            });
            console.log(newConfirmed);
            
    })
    res.send("hey")
})





app.listen(3000, () => console.log(" server is running on port 3000"))

// app.use("/public", express.static(__dirname + "/public"))

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// })

// app.listen(1337, () => {
//   console.log("The server is up and running!");
// });