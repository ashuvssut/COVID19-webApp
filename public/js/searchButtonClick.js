const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async event => {
    
    const selectedCountry = document.querySelector('#search-input').value;
    const ltBraceIndex = selectedCountry.indexOf('(');
    const requestedCountryCode = selectedCountry.slice(ltBraceIndex+1, ltBraceIndex+3);

    const data = {requestedCountryCode};

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body : JSON.stringify(data),
    }
    reqCovidDetails(options);
    // const response = await fetch('/getCovidDetails', options);
    // const responseMessage = await response.json();
    // console.log(responseMessage);
    
    
});

async function reqCovidDetails(options){
    const response = await fetch('/reqCovidDetails', options);
    const responseMessage = await response.json();
    console.log(responseMessage);

}
