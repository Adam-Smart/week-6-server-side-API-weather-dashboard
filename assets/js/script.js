const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

var locationInput = $("#location")
var getLocation = () => {
    var userLocation = locationInput.value;
    if (userLocation === "") {
        locationError("Enter valid location");
    } else {
        lookupLocation(userLocation)
    }
}

// create an array of searched locations

const lookupLocation = (search) => {

    // Lookup the location to get the Lat/Lon
    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results
            //const location = data[0];
            var lat = data[0].lat;
            var lon = data[0].lon;

            

            // Get the Weather for the cached location
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
            console.log(apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                    // Display the Current Weather
                    displayWeather(data);

                    // Display the 5 Day Forecast
                    displayForecast (data)
                });
        });
}
var displayWeather = (weatherData) => {
    var currentWeather = weatherData.current
    
    document.getElementById("temp-val").textContent =`${currentWeather.temp}`
    document.getElementById("wind-val").textContent = `${currentWeather.wind_speed}`
    document.getElementById("humidity-val").textContent = `${currentWeather.humidity}`
}


var locationInput = document.getElementById('location');
var searchBtn = $('#searchButton');

searchBtn.on('click', getLocation);


// Add an event handler for the search button
