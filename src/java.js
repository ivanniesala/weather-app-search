let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = now.getDate();
let year = now.getFullYear();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];

let day = days[now.getDay()];
let months = [
  `Jan`,
  `Feb`,
  `March`,
  `Apr`,
  `May`,
  `June`,
  `July`,
  `Aug`,
  `Sept`,
  `Oct`,
  `Nov`,
  `Dec`,
];
let month = months[now.getMonth()];
let showDate = document.querySelector("#currentDay");
showDate.innerHTML = ` ${day}, ${month} ${date}, ${year}`;

let nowTime = document.querySelector("#currentTime");
nowTime.innerHTML = `${hours}:${minutes}`;

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  if (cityInput.value) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${cityInput.value}`;
  }
}
let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", enterCity);

function showNewCity(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  let cityTemp = document.querySelector("#currentTemp");
  let temprature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temprature}`;
  fahrenheitTemprature = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let typeOfday = document.querySelector("#type");
  typeOfday.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  let humidityNewCity = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${humidityNewCity}%`;

  let windspeed = document.querySelector("#wind");
  let windNewCity = Math.round(response.data.wind.speed);
  windspeed.innerHTML = `Wind: ${windNewCity} m/s`;

  let removeIntro = document.querySelector("#intro");
  removeIntro.innerHTML = "";

  console.log(response.data);

  getForecast(response.data.coord);

  displayForecast();
}

function searchNewCity(city) {
  let apiKey = "1cf93c53721ba9b39c4037c0ca420677";
  let searchNewCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${searchNewCityUrl}&appid=${apiKey}`).then(showNewCity);
}
function newCitySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchNewCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCitySearch);

function showCelsisusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemprature - 32) * 5) / 9;
  let tempELement = document.querySelector("#currentTemp");
  tempELement.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsisusTemp);

let fahrenheitTemprature = null;

function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempELement = document.querySelector("#currentTemp");
  tempELement.innerHTML = Math.round(fahrenheitTemprature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1cf93c53721ba9b39c4037c0ca420677";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude+hourly,minutely,alerts&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="forecast-date">
                ${formatDate(forecastDay.dt)}
               </div>
              <div id="forecast-icon"><img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"  width="60" />
               
                </div>
                <div class="forecast-temps">
                <span class="forecast-temp-max">
               ${Math.round(forecastDay.temp.max)}°F
                </span>
                <span class="forecast-temp-min">
                ${Math.round(forecastDay.temp.min)}°F
                </span>
              </div>
            </div>      
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
