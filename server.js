const express = require('express');
const https = require('https');//to send a get req from our server to the api server
// const bodyParser = require('body-parser'); //allows to look through the body of post requests
// const { send } = require('process');

const app = express();//initialized app as an express app

app.listen(3000, () => console.log(" server is listening on port 3000"))

// app.use(bodyParser.urlencoded({extended:true})); //code necessary to start parsing
app.use(express.static('public'));  //host static files
































// let requestedCountryCode = null;
// let newConfirmed = null;
// let totalConfirmed = null;
// let newDeaths = null;
// let totalDeaths = null;
// let newRecovered = null;
// let totalRecovered = null; 

// app.post("/", (req, res) => {
//     let selectedCountry = req.body.searchInput;
//     ltBraceIndex = selectedCountry.indexOf('(');
//     requestedCountryCode = selectedCountry.slice(ltBraceIndex+1, ltBraceIndex+3)

//     //Get Covid details
//     const covidUrl = "https://api.covid19api.com/summary"
//     https.get(covidUrl, (response) => {    
        
//         let chunks = []; //since this api call returns a very large set. we need to get it in chunks
//         response
//             .on('data', (chunk)=>{//'data' events can be fired multiple times, so you have to collect all the data values and concatenate them together when the 'end' event has fires
//                 chunks.push(chunk);
//                 //console.log(response.statusCode);
//             })                    // now chunks = [<Buffer 7b 22 47...>, <Buffer 66 69 62...>, <Buffer 63 33 2c...>, ...]
//             .on('end', ()=>{
//                 let data = Buffer.concat(chunks);
//                 let covidData = JSON.parse(data)  //data is stored in countiesData (which is an object 
//                 covidData.Countries.forEach(Object => {
//                     if(Object.CountryCode === requestedCountryCode){
//                         newConfirmed = Object.NewConfirmed;
//                         newDeaths = Object.NewDeaths;
//                         newRecovered = Object.NewRecovered;
//                         totalConfirmed = Object.TotalConfirmed;
//                         totalDeaths = Object.TotalDeaths;
//                         totalRecovered = Object.TotalRecovered;
//                         console.log(newConfirmed); 
//                         send(newConfirmed)
//                     }
//                 });
//             })
//             .on("error", (error) => { //'error' catches the error and passes to the function)
//                 console.error(error);
//             });
        
         
        
//     })
// });
// app.get("/", (req, res) => {

//     res.sendFile(__dirname + "/index.html");    
// })





