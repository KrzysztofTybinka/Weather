const forecastApiKey = 'b3ae74932b305e9002676ce8ef72bfbb'
const forecastIconsUrl = 'https://openweathermap.org/img/wn/'
let cities = []
let filteredCities = []
const maxRequestNumber = 100
const minRequestNumber = 10
const dropDownLength = 5

$('#search-box-input').keyup(async function (event) {
    debugger
    let substring = $(this).val()
    if (cities.length == 0) {
        cities = await requestCities(substring, requestLimit(0))
    }

    if (!anyStartsWith(cities, substring)) {
        cities = await requestCities(substring, requestLimit(substring.length))
    }
    filterCities(substring)

    if (filteredCities.length < dropDownLength) {
        cities = await requestCities(substring, requestLimit(substring.length))
        filterCities(substring)
    }

    buildCitiesDropDown()
})

async function buildCitiesDropDown() {

}

function anyStartsWith(collection, substring) {
    return collection.some((e) =>
        e.name.toLowerCase().startsWith(substring.toLowerCase()))
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

function filterCities(substring) {
    filteredCities = []
    cities.filter(function (city) {
        if (city.name.toLowerCase().startsWith(substring.toLowerCase())) {
            filteredCities.push(city)
        }
    });
}

async function requestCities(substring, limit) {
    const response = await fetch("https://localhost:7084/api/cities?startsWith="
        + substring + "&limit=" + limit)
    const citiesJson = await response.json()
    return citiesJson
}

//Exponential function, higher forNumber 
//lower return number, but never smaller than 
//minRequestNumber and never greater than maxRequestNumber
function requestLimit(forNumber) {
    if (forNumber == 0) {
        return maxRequestNumber
    }
    let returnValue = maxRequestNumber / (forNumber * forNumber)

    if (returnValue < minRequestNumber) {
        return minRequestNumber
    }
    return Math.floor(returnValue)
}