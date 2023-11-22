
async function searchCity(input) {

    if (input.value.length >= 1) {
        const cities = await matchCities(input.value)
        $('#search-box-list').empty();

        for (city of cities) {
            $('#search-box-list').append(`<li onclick="chooseCity(this)" lat="${city.lat}" lng="${city.lon}">${city.name} ${city.country_code} ${city.timezone}</li>`);
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


function chooseCity(city) {
    $('#search-box-list').empty();
    $('#search-box-input').val(city.innerHTML)
}


async function getCitiesJson(cityName) {
    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=b3ae74932b305e9002676ce8ef72bfbb");
    const cityData = await response.json();
    return cityData;
}





