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

//change h2 to present time
let newDate = `${day} / ${hour}:${minutes}`;

let h2 = document.querySelector("h2");
h2.innerHTML = newDate;
console.log(new Date());

let search = document.querySelector("#search");
let apiKey = "798023fb3d35165272c1fae40ceef0ea";
search.addEventListener("click", getTemp);

//get temp of city from openweather
function getTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//change temp
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = temperature;
}

//get temp of city from geolocation
function geolocTemp(position) {
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  let apiKey = "798023fb3d35165272c1fae40ceef0ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showGeotemp);
}
function getLocation(event) {
  event.preventDefault();
}
navigator.geolocation.getCurrentPosition(geolocTemp);

//change temp ONLY when geolocation emoji is clicked
function showGeotemp(response) {
  let geoTemp = Math.round(response.data.main.temp);
  let geoTempelement = document.querySelector("h3");
  geoTempelement.innerHTML = geoTemp;
  let geoCity = documenmt.querySelector("h1");
  geoCity.innerHTML = "${response.data.name}";
}
let geoEmoji = document.querySelector("#location");
geoEmoji.addEventListener("click", getLocation);
