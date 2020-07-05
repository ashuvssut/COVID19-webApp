if('geolocation' in navigator){  //check if geolocation is available
    console.log('geolocation available');
    
    navigator.geolocation.getCurrentPosition(async(position) => {
        const lat= position.coords.latitude;
        const lon= position.coords.longitude;

        //get the country name autofill searchbox. OSM api:- https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&format=json
        
        const getLocation_Url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        const response = await fetch(getLocation_Url);
        const LocationObject = await response.json();

        // const locationAddress = LocationObject.display_name;
        // alert(`Location Address nearest to you: ${locationAddress}.
        // Location data is based on OpenStreetMap(OSM) results`);

        const countryName = LocationObject.address.country;
        const countryCode = LocationObject.address.country_code.toUpperCase();
        const inputText = `${countryName} (${countryCode})`;
        
        //input the searchBox value with inputText
        document.querySelector('#search-input').value = inputText;
        
    })
}
else{
    console.log('geolocation not available');
}