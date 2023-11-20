
// fetch("https://api.openweathermap.org/data/2.5/forecast?lat=52.5244&lon=13.4105&units=metric&appid=b3ae74932b305e9002676ce8ef72bfbb")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })

// let req111 = fetch("http://api.openweathermap.org/geo/1.0/direct?q=Berlin&limit=5&appid=b3ae74932b305e9002676ce8ef72bfbb")
//     .then(response => response.json())

// (async () => {
//     const ress = await getCitiesJson('Berlin');
//     console.log(ress[0].lat);
// })()

matchCitiesTest()


async function getCitiesJson(cityName) {
    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=b3ae74932b305e9002676ce8ef72bfbb");
    const cityData = await response.json();
    return cityData;
}

function searchCity(input) {
    if (input.value.length >= 2) {
        console.log(matchCities(input.value))
    }
}

async function matchCities(input) {
    const response = await fetch("https://localhost:7084/cities?startsWith=" + input + "&limit=5");
    const cities = await response.json();
    debugger;
    return cities;
}


async function matchCitiesTest() {
    const response = await fetch('https://localhost:7084/cities?startsWith=Kra&limit=5', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });
    debugger;
    const cities = await response.json();
    return cities;
}
