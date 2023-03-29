let weatherdata_objs = [];
let cityname = '';

// detect the weather icon and feels like
function feelsLike (weather_id) {
    const weather_code = weather_id;
    let weather_icon = '';

    switch(weather_code) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            weather_icon = "resources/thunder storm.png";
            break;
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            weather_icon = "resources/shower rain.png";
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            weather_icon = "resources/rain.png";
            break;
        case 511:
            weather_icon = "resources/snow.png";
            break;
        case 520:
        case 521:
        case 522:
        case 531:
            weather_icon = "resources/shower rain.png";
            break;
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            weather_icon = "resources/snow.png";
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            weather_icon = "resources/mist.png";
        case 800:
            weather_icon = "resources/clear sky.png";
        case 801:
            weather_icon = "resources/few clouds.png";
        case 802:
            weather_icon = "resources/scattered clouds.png";
        case 803:
        case 804:
            weather_icon = "resources/broken clouds.png";
        default:
            console.log("something went wrong😪");
    }

    return weather_icon;

}

// on input of the date in seconds gives back the day it falls into
function weekToday (date) {
    const date_query = new Date(date*1000);
    switch(date_query.getDay()) {
        case 0:
            return "SUN";
            break;
        case 1:
            return "MON";
            break;
        case 2:
            return "TUES";
            break;
        case 3:
            return "WED";
            break;
        case 4:
            return "THURS";
            break;
        case 5:
            return "FRI";
            break;
        case 6:
            return "SAT";
            break;
        default:
            console.log("Sorry! something went wrong fetching day 😭");
    }
}

// functions that updates the weather dashboard on searching up the place
function updateToday () {
    const temp = document.querySelector(".temperature-details>.current-temp");
    temp.textContent = Math.round(weatherdata_objs[0].current_temp);

    const min_max = document.querySelector(".temperature-details>.min-max-temp");
    min_max.textContent = `${Math.round(weatherdata_objs[0].min_temp)}° / ${Math.round(weatherdata_objs[0].max_temp)}°`;

    const humidity = document.querySelector(".humidity-container>.hello>.humidity-data");
    humidity.textContent = weatherdata_objs[0].humidity;

    const wind_speed = document.querySelector(".wind-container>.hello>.wind-data");
    wind_speed.textContent = weatherdata_objs[0].wind;

    let weather_icon = document.querySelector(".weather-dashboard>.weather-icon>img");
    let select_src = feelsLike(weatherdata_objs[0].weather_id);
    console.log(select_src);
    weather_icon.setAttribute("src", select_src);

    let feeling_like = document.querySelector(".weather-like");
    feeling_like.textContent = weatherdata_objs[0].feeling;
}

function updateTommorow () {
    const min_max = document.querySelector(".tommorow-forecast>.min-max");
    min_max.textContent = `${Math.round(weatherdata_objs[1].min_temp)}° / ${Math.round(weatherdata_objs[1].max_temp)}°`;

    let weather_icon = document.querySelector(".tommorow-forecast>.weather-icon>img");
    let select_src = feelsLike(weatherdata_objs[1].weather_id);
    console.log(select_src);
    weather_icon.setAttribute("src", select_src);
}

function updateDaythree () {
    const min_max = document.querySelector(".day3-forecast>.min-max");
    min_max.textContent = `${Math.round(weatherdata_objs[2].min_temp)}° / ${Math.round(weatherdata_objs[2].max_temp)}°`;

    const day = document.querySelector(".day3-forecast>.day");
    day.textContent = weekToday(weatherdata_objs[2].date);

    let weather_icon = document.querySelector(".day3-forecast>.weather-icon>img");
    let select_src = feelsLike(weatherdata_objs[2].weather_id);
    console.log(select_src);
    weather_icon.setAttribute("src", select_src);
}

function updateDayfour () {
    const min_max = document.querySelector(".day4-forecast>.min-max");
    min_max.textContent = `${Math.round(weatherdata_objs[3].min_temp)}° / ${Math.round(weatherdata_objs[3].max_temp)}°`;

    const day = document.querySelector(".day4-forecast>.day");
    day.textContent = weekToday(weatherdata_objs[3].date);

    let weather_icon = document.querySelector(".day4-forecast>.weather-icon>img");
    let select_src = feelsLike(weatherdata_objs[3].weather_id);
    console.log(select_src);
    weather_icon.setAttribute("src", select_src);
}

function updateDayfive () {
    const min_max = document.querySelector(".day5-forecast>.min-max");
    min_max.textContent = `${Math.round(weatherdata_objs[4].min_temp)}° / ${Math.round(weatherdata_objs[4].max_temp)}°`;

    const day = document.querySelector(".day5-forecast>.day");
    day.textContent = weekToday(weatherdata_objs[4].date);  
    
    let weather_icon = document.querySelector(".day5-forecast>.weather-icon>img");
    let select_src = feelsLike(weatherdata_objs[4].weather_id);
    console.log(select_src);
    weather_icon.setAttribute("src", select_src);
}


function updateDashboard () {
    updateToday();
    updateTommorow();
    updateDaythree();
    updateDayfour();
    updateDayfive();
}



// get the name of the place and forecast the weather
const search_place = document.querySelector("#searchbar-text");
const place_name = document.querySelector(".greeting-description>.location");

//  input event listener that updates the value in input field to greeting span for dramatic effect
search_place.addEventListener("input", () => {
    place_name.innerHTML = search_place.value;
});

// searches the place and updates the values in the dashboard
search_place.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        let cityname = search_place.value;
        let weather_api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=2dbc8da0985ae9bae509ddee74baaa29&units=metric`;
        
        weatherdata_objs = [];
        forecastWeather(weather_api);
    }
})

function detectWeather(current_temp, max_temp, min_temp, humidity, wind, date, weather_id, feeling) {
    return {
        current_temp,
        max_temp,
        min_temp,
        humidity,
        wind,
        date,
        weather_id,
        feeling,
    }
}


function forecastWeather (weather_api) {

    fetch(weather_api, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        for (let itr_data = 0; itr_data <=32; itr_data+=8) {
            
            let current_temp = response.list[itr_data].main.temp;
            let min_temp = response.list[itr_data].main.temp_min;
            let max_temp = response.list[itr_data].main.temp_max;
            let wind = response.list[itr_data].wind.speed;
            let humidity = response.list[itr_data].main.humidity;
            // let precipitation = response.list[itr_data].rain['3h'];
            let date = response.list[itr_data].dt;
            let weather_id = response.list[itr_data].weather[0].id;
            let feeling = response.list[itr_data].weather[0].description

            weatherdata_objs.push(detectWeather(current_temp, max_temp, min_temp, humidity, wind, date, weather_id, feeling));
            }

        updateDashboard();
    })
}




