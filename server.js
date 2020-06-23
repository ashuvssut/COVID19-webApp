
// const _filter = require("./assets/js/filter.js");
const express = require('express');
const https = require('https');//to send a get req from our server to the api server

const app = express();//initialized app as an express app

let RequestedCountryCode = 'IN';
let newConfirmed = null;
let totalConfirmed = null;
let newDeaths = null;
let totalDeaths = null;
let newRecovered = null;
let totalRecovered = null; 

class CountryName{
    constructor(CountryName, CountryCode){
        this.CountryName= CountryName;
        this.CountryCode= CountryCode;
    }
}
let countryArray = [];

app.get("/", (req, res) => {

    const countryUrl = "https://api.covid19api.com/countries"
    https.get(countryUrl, (response) => {
        //console.log(response.headers);
        
        //since this api call returns a very large set. we need to get it in chunks
        let chunks = [];
        response
            .on('data', (chunk)=>{//'data' events can be fired multiple times, so you have to collect all the data values and concatenate them together when the 'end' event has fires
                chunks.push(chunk);
                //console.log(response.statusCode);
            })
            .on('end', ()=>{
                let countryData = Buffer.concat(chunks);
                countryArray = JSON.parse(countryData);
                
                _filter.generateFilterTable(countryArray);
                // const filterTable = document.querySelector('.filter-table');

                // countryArray.forEach(Object => {
                //     let tr = document.createElement('tr');

                //     let td1 = document.createElement('td');
                //     td1.textContent = Object.Country;

                //     let td2 = document.createElement('td');
                //     td2.textContent = Object.ISO2;

                //     tr.appendChild(td1);
                //     tr.appendChild(td2);

                //     filterTable.appendChild(tr);
                // });                  
            })
            .on('error', (error)=> console.error(error))
    });     

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