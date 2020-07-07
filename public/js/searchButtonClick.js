const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    
    const selectedCountry = document.querySelector('#search-input').value;
    const ltBraceIndex = selectedCountry.indexOf('(');
    const requestedCountryCode = selectedCountry.slice(ltBraceIndex+1, ltBraceIndex+3);

    const data = {requestedCountryCode};

    //reqCovidDetails for the requestedCountryCode
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body : JSON.stringify(data),
    }
    
    const response = await fetch('/reqCovidDetails', options);
    const responseMessage = await response.json();
    console.table({responseMessage});
    displayCovidDetails(responseMessage);
});

function displayCovidDetails({Country, Date, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered }){
    
    const countryName = document.querySelector('.country-name').textContent= Country;
    const date = document.querySelector('.date').textContent= Date;

    const newConfirmed= document.querySelector('.new-confirmed').textContent= NewConfirmed;
    const totalConfirmed = document.querySelector('.total-confirmed').textContent= TotalConfirmed;
    const newDeaths= document.querySelector('.new-deaths').textContent= NewDeaths;
    const totalDeaths = document.querySelector('.total-deaths').textContent= TotalDeaths;
    const newRecovered= document.querySelector('.new-recovered').textContent= NewRecovered;
    const totalRecovered = document.querySelector('.total-recovered').textContent= TotalRecovered;

    //show the results
    document.querySelector('#results').classList.remove('hide');
    document.querySelector('.results-container').classList.remove('hide');
}