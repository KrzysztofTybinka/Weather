
// fetch("https://api.openweathermap.org/data/2.5/forecast?lat=52.5244&lon=13.4105&units=metric&appid=b3ae74932b305e9002676ce8ef72bfbb")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })

// let req111 = fetch("http://api.openweathermap.org/geo/1.0/direct?q=Berlin&limit=5&appid=b3ae74932b305e9002676ce8ef72bfbb")
//     .then(response => response.json())

(async () => {
    const ress = await getCitiesJson('Berlin');
    console.log(ress[0].lat);
})()

async function getCitiesJson(cityName) {
    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=b3ae74932b305e9002676ce8ef72bfbb");
    const cityData = await response.json();
    return cityData;
}
