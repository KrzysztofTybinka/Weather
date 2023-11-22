const key = 'b3ae74932b305e9002676ce8ef72bfbb';
let todayInfo = {}

async function onCitySearch(input) {

    if (input.value.length >= 1) {
        const cities = await matchCities(input.value)
        $('#search-box-list').empty();

        for (city of cities) {
            $('#search-box-list').append(`<li onclick="onCityChosen(this)" lat="${city.lat}" lon="${city.lon}">${city.name} ${city.country_code} ${city.timezone}</li>`);
        }
    }
    else {
        $('#search-box-list').empty();
    }
}

async function matchCities(input) {
    const response = await fetch("https://localhost:7084/cities?startsWith=" + input + "&limit=5");
    const cities = await response.json();
    return cities;
}


function onCityChosen(city) {
    $('#search-box-list').empty();
    $('#search-box-input').val(city.innerHTML)

    let lat = $(city).attr('lat')
    let lon = $(city).attr('lon')
    getWeather(lat, lon)
}

async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
    const weather = await response.json();
    debugger;
    todayInfo = {
        image: "",
        currentInfo: {
            cityName: weather.name,
            description: weather[0].description,
            degrees: weather.main.temp
        },
    }
}





