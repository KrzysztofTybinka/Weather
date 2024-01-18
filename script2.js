const forecastApiKey = 'b3ae74932b305e9002676ce8ef72bfbb'
const forecastIconsUrl = 'https://openweathermap.org/img/wn/';
const cities = []
const filteredCities = []
let weatherInfo = {
    cityName: null,
    info: []
}

$('#search-box-input').keyup(function (e) {

});

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

}

async function requestCities(input) {
    const response = await fetch("https://localhost:7084/api/cities?startsWith=" + input + "&limit=5");
    cities = await response.json();
}