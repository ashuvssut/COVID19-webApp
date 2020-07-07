function geoLocate(){
    if('geolocation' in navigator){  //check if geolocation is available
    console.log('geolocation is available in your browser');
    
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat= position.coords.latitude;
        const lon= position.coords.longitude;
        const timestamp = position.timestamp;
        
        //get the country name autofill search box. OSM api:- https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&format=json
        
        const getLocation_Url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        const getLocationResponse = await fetch(getLocation_Url);
        const LocationObject = await getLocationResponse.json();        

        const countryName = LocationObject.address.country;
        const countryCode = LocationObject.address.country_code.toUpperCase();
        const inputText = `${countryName} (${countryCode})`;
        
        //input the searchBox value with inputText
        document.querySelector('#search-input').value = inputText;



        //send location data to server to store in database
        const locationAddress = LocationObject.display_name;
                // alert(`Location Address nearest to you: ${locationAddress}.
                // Location data is based on OpenStreetMap(OSM) results`);
        const data = { timestamp, locationAddress}
        // TODO: Store in DB
        
        //post data to /location route
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body : JSON.stringify(data),
        }
        const response = await fetch('/location', options);
        const responseMessage = await response.json();
        console.log(responseMessage);
        
    });
}
else{
    alert('geolocation not available in your browser');
}
}