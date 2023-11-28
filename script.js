const key = 'b3ae74932b305e9002676ce8ef72bfbb'
const iconLink = 'https://openweathermap.org/img/wn/';

let weatherInfo = {
    cityName: null,
    info: []
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

async function matchCities(input) {
    const response = await fetch("https://localhost:7084/cities?startsWith=" + input + "&limit=5");
    const cities = await response.json();
    return cities;
}


async function onCityChosen(city) {
    clearAll();

    $('#search-box-list').empty();
    $('#search-box-input').val(city.innerHTML);

    let lat = $(city).attr('lat');
    let lon = $(city).attr('lon');
    await getWeather(lat, lon);
    fillWeekInfo();
    onDaySet(0);
    onDetailsSet(0, closestHour())
}

function closestHour() {
    let dayInfoArr = weatherInfo.info[0].dayInfo
    let diff = "23:59"
    let hour = new Date().getHours() + ':' + new Date().getMinutes()
    let ix
    debugger;
    for (let i = 0; i < dayInfoArr.length; i++) {
        if (Math.abs(dayInfoArr[i].hour - hour) < diff) {
            ix = i
        }
    }
    return ix
}

function fillWeekInfo() {
    let infoArr = weatherInfo.info;

    for (let i = 0; i < infoArr.length; i++) {
        $('#week-list').append(`<li ix="${i}" onclick="onDaySet(this.attributes.ix.nodeValue)"><span>${infoArr[i].date}</span> <img src="${iconLink + infoArr[i].averageIcon}.png"> <span><b>${infoArr[i].average} ${infoArr[i].maxTemp}</b>/${infoArr[i].minTemp}</span></li>`);
    }
}

function clearAll() {
    $('#week-list').empty();
    weatherInfo = {
        cityName: null,
        info: []
    };
}


async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
    weather = await response.json();
    weatherInfo.cityName = weather.city.name;
    let degreeArr = [];
    let oneDay = [];
    let descArr = [];
    let iconArr = [];
    let counter = 0;

    weather.list.forEach(element => {

        let info = {
            hour: new Date(element.dt_txt).getHours() + ":00",
            temp: Math.round(element.main.temp),
            description: element.weather[0].description,
            icon: element.weather[0].icon,
            details: {
                feelsLike: Math.round(element.main.feels_like),
                humidity: element.main.humidity,
                pressure: element.main.pressure,
                windSpeed: element.wind.speed
            }
        };
        degreeArr.push(info.temp)
        descArr.push(info.description)
        oneDay.push(info);
        iconArr.push(info.icon);

        if ((counter + 1) % 8 === 0) {
            degreeArr.sort()

            weatherInfo.info.push({
                date: day(element.dt_txt),
                average: mostFrequent(descArr),
                averageIcon: mostFrequent(iconArr),
                maxTemp: Math.round(degreeArr.lastIndexOf()),
                minTemp: Math.round(degreeArr[0]),
                dayInfo: oneDay
            });

            degreeArr = [];
            oneDay = [];
            descArr = [];
            iconArr = [];
        }
        counter++;
    });
}

function mostFrequent(arr) {
    var mf = 1;
    var m = 0;
    var item;
    for (let i = 0; i < arr.length; i++) {
        for (var j = i; j < arr.length; j++) {
            if (arr[i] == arr[j])
                m++;
            if (mf < m) {
                mf = m;
                item = arr[i];
            }
        }
        m = 0;
    }
    return item;
}

function day(date) {
    let inputDate = new Date(date);
    let todaysDate = new Date();
    if (inputDate.getDay() == todaysDate.getDay()) {
        return "Today";
    }

    const intDay = {
        1: "Mon", 2: "Tue", 3: "Wed",
        4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun"
    };
    let ix = inputDate.getDay();
    return intDay[ix];
}

function onDaySet(ix) {
    $('#today-info-list').empty();
    const dayInfo = weatherInfo.info[ix].dayInfo;

    for (let i = 0; i < dayInfo.length; i++) {
        $('#today-info-list').append(`<li dayIx="${ix}" hourIx="${i}" onclick="onDetailsSet(this.attributes.dayIx.nodeValue, this.attributes.hourIx.nodeValue)"><p>${dayInfo[i].hour}</p> <img src="${iconLink + dayInfo[i].icon}.png"> <p><b>${dayInfo[i].temp}°<b></p></li>`);
    }
}

function onDetailsSet(dayIx, hourIx) {
    $('#current-info').empty();
    $('#current-image').empty();
    $('#today-details-list').empty();
    let details = weatherInfo.info[dayIx].dayInfo[hourIx];

    $('#current-info').append(`<p><h3>${weatherInfo.cityName}</h3></p>`);
    $('#current-info').append(`<p>${details.description}</p>`);
    $('#current-image').append(`<img src="${iconLink + details.icon}@4x.png">`);
    $('#current-info').append(`<p><h1>${details.temp}°</h1></p>`);

    $('#today-details-list').append(`<li><h5>Feels like</h5>${details.details.feelsLike}°</li>`);
    $('#today-details-list').append(`<li><h5>Humidity</h5>${details.details.humidity}%</li>`);
    $('#today-details-list').append(`<li><h5>Pressure</h5>${details.details.pressure}hPa</li>`);
    $('#today-details-list').append(`<li><h5>Wind speed</h5>${details.details.windSpeed}km/h</li>`);
}
var x
function reset() {
    $('#search-box-input').val('')
}


