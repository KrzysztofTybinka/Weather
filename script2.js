const forecastApiKey = 'b3ae74932b305e9002676ce8ef72bfbb'
const forecastIconsUrl = 'https://openweathermap.org/img/wn/'
const cities = []
const filteredCities = []
const maxRequestNumber = 1000
const minRequestNumber = 100
const dropDownLength = 5

$('#search-box-input').keyup(function (letters) {

    if (cities) {
        requestCities(letters, citiesRequestLimit())
    }
    if (!citiesMatchLetters(letters)) {
        requestCities(letters, citiesRequestLimit())
    }
    buildCitiesDropDown()
})

async function buildCitiesDropDown() {

}

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

async function citiesMatchLetters(letters) {

}

async function requestCities(letters, limit) {
    const response = await fetch("https://localhost:7084/api/cities?startsWith=" + letters + "&limit=" + limit)
    cities = await response.json()
}

//Exponential function, higher lettersNumber 
//lower return number, but never smaller than 
//minRequestNumber and never greater than maxRequestNumber
function citiesRequestLimit(lettersNumber) {

    if (lettersNumber) {
        return maxRequestNumber
    }
    let returnValue = maxRequestNumber / (lettersNumber * lettersNumber)

    if (returnValue < minRequestNumber) {
        return minRequestNumber
    }
    return Math.Floor(returnValue)
}