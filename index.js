const input = document.querySelector("input");
input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    updateWeather();
    input.value = "";
  }
});

const city = document.querySelector(".city");
const currentTemp = document.querySelector(".currentTemp");
const condition = document.querySelector(".condition");
const time = document.querySelector(".time");
const feelsLike = document.querySelector(".feelsLike");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getData() {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ed8b33aec1e74b0b964150809230105&q=${input.value}&days=7`,
  );
  if (!response.ok) {
    throw new Error("City was not found");
  }
  const data = await response.json();
  return data;
}
async function updateWeather() {
  try {
    const data = await getData();
    city.innerHTML = data.location.name + ", " + data.location.country;
    currentTemp.innerHTML = data.current.temp_c + " °C";
    condition.innerHTML = data.current.condition.text;
    time.innerHTML = data.location.localtime;
    feelsLike.innerHTML = data.current.feelslike_c;
    wind.innerHTML = data.current.wind_kph;
    humidity.innerHTML = data.current.humidity;
  } catch (error) {
    alert(error.message);
  }
}
