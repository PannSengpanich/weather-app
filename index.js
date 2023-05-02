const input = document.querySelector("input");
input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    updateWeather();
    input.value = "";
  }
});

const body = document.querySelector("body");
const city = document.querySelector(".city");
const currentTemp = document.querySelector(".currentTemp");
const condition = document.querySelector(".condition");
const time = document.querySelector(".time");
const feelsLike = document.querySelector(".feelsLike");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const days = document.querySelectorAll(".day");

async function getData(cityName) {
  try {
    const now = new Date();
    const hour = now.getUTCHours();
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=ed8b33aec1e74b0b964150809230105&q=${cityName}&days=7&hour=${hour}`,
    );
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch {
    throw new Error("City was not found");
  }
}

async function updateWeather() {
  try {
    let cityName = input.value;
    if (cityName === "") {
      cityName = "Bangkok"; // Set default city to Bangkok
    }
    const data = await getData(cityName);
    city.innerHTML = data.location.name + ", " + data.location.country;
    currentTemp.innerHTML = data.current.temp_c + " °C";
    condition.innerHTML = data.current.condition.text;
    time.innerHTML = data.location.localtime;
    feelsLike.innerHTML = "Feels Like " + data.current.feelslike_c + " °C";
    wind.innerHTML = "Wind " + data.current.wind_kph;
    humidity.innerHTML = "Humidity " + data.current.humidity;
    days.forEach((day, index) => {
      day.innerHTML = "";
      const fcDate = document.createElement("div");
      const fcTemp = document.createElement("div");
      const fcMaxTemp = document.createElement("div");
      const fcMinTemp = document.createElement("div");
      const fcCondition = document.createElement("div");

      fcDate.classList.add("fcDate");
      fcTemp.classList.add("fcTemp");
      fcMaxTemp.classList.add("fcMaxTemp");
      fcMinTemp.classList.add("fcMinTemp");
      fcCondition.classList.add("fcCondition");
      fcDate.innerHTML = data.forecast.forecastday[index].date;
      fcMaxTemp.innerHTML =
        data.forecast.forecastday[index].day.maxtemp_c + " °C";
      fcMinTemp.innerHTML =
        data.forecast.forecastday[index].day.mintemp_c + " °C";
      fcCondition.innerHTML =
        data.forecast.forecastday[index].day.condition.text;
      day.append(fcDate);
      day.append(fcTemp);
      fcTemp.append(fcMaxTemp);
      fcTemp.append(fcMinTemp);
      day.append(fcCondition);
    });
  } catch (error) {
    alert(error.message);
  }
}

updateWeather();
