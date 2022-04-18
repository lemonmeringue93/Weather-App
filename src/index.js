let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//new day format
let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

//print zeros before less than 10 hrs and minutes
if (hour < 10) {
  hour = "0" + hour;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}

//get everythihng on opening page
navigator.geolocation.getCurrentPosition(geolocTemp);
//change h2 to present time
let newDate = `${day} / ${hour}:${minutes}`;

let date = document.querySelector("#date");
date.innerHTML = newDate;
console.log(new Date());

let search = document.querySelector("#search");
let apiKey = "798023fb3d35165272c1fae40ceef0ea";
search.addEventListener("click", getTemp);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
//display forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="date">
                ${formatDay(forecastDay.dt)}
                </div>
                <img 
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="36"
                />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}</span>°   <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}</span>°
              </div>
            </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//get temp  of city from openweather
function getTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let h1 = document.querySelector("#cityhead");
  h1.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  celsius.classList.add("active");
}

//calL API forecast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "798023fb3d35165272c1fae40ceef0ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
//call API AQI
function getAQI(coordinates) {
  console.log(coordinates);
  let apiKey = "798023fb3d35165272c1fae40ceef0ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayAQI);
  console.log(apiUrl);
}
//displau AQI
function displayAQI(response) {
  console.log(response.data);
  let aqi = response.data.list[0].main.aqi;
  let aqiElement = document.querySelector("#aqi");
  if (aqi == 1) {
    aqiElement.innerHTML = aqi + " (Good)";
  } else if (aqi == 2) {
    aqiElement.innerHTML = aqi + " (Fair)";
  } else if (aqi == 3) {
    aqiElement.innerHTML = aqi + " (Moderate)";
  } else if (aqi == 4) {
    aqiElement.innerHTML = aqi + " (Poor)";
  } else if (aqi == 5) {
    aqiElement.innerHTML = aqi + " (Very Poor)";
  }
}

//change temp and humidity
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  console.log(response.data);
  let temperatureElement = document.querySelector("#newTemp");
  temperatureElement.innerHTML = temperature;
  let humidityElement = document.querySelector("#humid");
  humidityElement.innerHTML = humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  let geoCity = document.querySelector("#cityhead");
  geoCity.innerHTML = `${response.data.name}`;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;
  console.log(response.data);

  getForecast(response.data.coord);

  getAQI(response.data.coord);
}

//get temp of city from geolocation
function geolocTemp(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  let apiKey = "798023fb3d35165272c1fae40ceef0ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geolocTemp);
}

let geoEmoji = document.querySelector("#location");
geoEmoji.addEventListener("click", getLocation);

//convert to Fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#newTemp");
  //remove active class from celsius link
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

//convert to celsius
function displayCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#newTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//change temperature
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);
