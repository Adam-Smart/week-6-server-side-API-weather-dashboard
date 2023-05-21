const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = '3770aa61038a0816864d556d797ecb9f';
// 3770aa61038a0816864d556d797ecb9f
// 2efadc37633599cf59a59b304f97af51
const MAX_DAILY_FORECAST = 5;
const recentLocations = []
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

    saveLocation(search);

    // Lookup the location to get the Lat/Lon
    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            var lat = data[0].lat;
            var lon = data[0].lon;

            document.getElementById("location-name").textContent =`${data[0].name}`

            

            // Get the Weather for the cached location
            
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
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

    document.getElementById("temp-val").textContent =`${currentWeather.temp}°C`
    document.getElementById("wind-val").textContent = `${currentWeather.wind_speed}Mph`
    document.getElementById("humidity-val").textContent = `${currentWeather.humidity}%`

    console.log (currentWeather)

    var weatherIcon = document.getElementById('weather-icon');
    weatherIcon.innerHTML = '';

    var img = document.createElement("div");
    img.innerHTML = ` <img src="https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png"/>`
    weatherIcon.appendChild(img);

}
var displayForecast = (weatherData) => {
    var dailyData = (weatherData.daily)

     var dailyForecast = dailyData[1];
     var day1 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'})

 console.log(day1)

    $('#day1-val').text(day1);
    var weatherForecast = weatherData.daily[0]
    document.getElementById("day1temp-val").textContent = `${weatherForecast.temp.day}°C`
    document.getElementById("day1wind-val").textContent = `${weatherForecast.wind_speed}Mph`
    document.getElementById("day1humidity-val").textContent = `${weatherForecast.humidity}%`

    console.log (dailyData)

    var dailyForecast = dailyData[2];
     var day2 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'})

    $('#day2-val').text(day2);
    var weatherForecast = weatherData.daily[1]
    document.getElementById("day2temp-val").textContent = `${weatherForecast.temp.day}°C`
    document.getElementById("day2wind-val").textContent = `${weatherForecast.wind_speed}Mph`
    document.getElementById("day2humidity-val").textContent = `${weatherForecast.humidity}%`

    var dailyForecast = dailyData[3];
     var day3 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'})

    var weatherForecast = weatherData.daily[2]

    $('#day3-val').text(day3);
    document.getElementById("day3temp-val").textContent = `${weatherForecast.temp.day}°C`
    document.getElementById("day3wind-val").textContent = `${weatherForecast.wind_speed}Mph`
    document.getElementById("day3humidity-val").textContent = `${weatherForecast.humidity}%`

    var dailyForecast = dailyData[4];
     var day4 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'})

    var weatherForecast = weatherData.daily[3]
    
    $('#day4-val').text(day4);
    document.getElementById("day4temp-val").textContent = `${weatherForecast.temp.day}°C`
    document.getElementById("day4wind-val").textContent = `${weatherForecast.wind_speed}Mph`
    document.getElementById("day4humidity-val").textContent = `${weatherForecast.humidity}%`

    var dailyForecast = dailyData[5];
     var day5 = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'})

    var weatherForecast = weatherData.daily[4]
    
    $('#day5-val').text(day5);
    document.getElementById("day5temp-val").textContent = `${weatherForecast.temp.day}°C`
    document.getElementById("day5wind-val").textContent = `${weatherForecast.wind_speed}Mph`
    document.getElementById("day5humidity-val").textContent = `${weatherForecast.humidity}%`
    
   
}




function loadLocation(){
    const storedLocations = JSON.parse(localStorage.getItem("recentLocations"));

    if (storedLocations !== null) {
        recentLocations.push(...storedLocations);

        for (let i = 0; i < recentLocations.length; i++){
            var newLocation = document.createElement("div");
            newLocation.classList.add("recent-location");
            newLocation.textContent = recentLocations[i];
            newLocation.addEventListener("click",saveLocationOnClick);

            document.getElementById("recent-locations").appendChild(newLocation)
console.log(newLocation)
console.log(recentLocations[i])
        }
    }
    
}


function saveLocationOnClick (event){
    console.log ("This will save location")

    const location = event.target.textContent;
    lookupLocation(location);

}
function saveLocation(location){
    const index = recentLocations.indexOf(location);

    if (index === -1){
        recentLocations.push(location);
    
        localStorage.setItem("recentLocations", JSON.stringify(recentLocations))
    }

}

var locationInput = document.getElementById('location');
var searchBtn = $('#searchButton');

searchBtn.on('click', getLocation);

loadLocation();


// Add an event handler for the search button
