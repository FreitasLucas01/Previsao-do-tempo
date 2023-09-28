const container = document.querySelector(".container");
const input = document.querySelector("input");
const search = document.querySelector("button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const img = document.querySelector(".weather-box img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");

async function handleClick() {
  const APIKey = "ba605efc18f1572f61892fe426f18a1a";
  const city = document.querySelector("input").value;

  if (city === "") return;

  const weatherAPI = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${APIKey}&lang=pt_br`
  );
  const weatherJSON = await weatherAPI.json();
  console.log(weatherJSON);

  if (weatherJSON.cod === "404") {
    container.style.height = "450px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
    return;
  }

  error404.style.display = "none";
  error404.classList.remove("fadeIn");

  switch (weatherJSON.weather[0].main) {
    case "Clear":
      img.src = "img/clear.png";
      break;
    case "Rain":
      img.src = "img/rain.png";
      break;
    case "Snow":
      img.src = "img/snow.png";
      break;
    case "Clouds":
      img.src = "img/cloud.png";
      break;
    case "Clear":
      img.src = "img/clear.png";
      break;
    case "Haze":
      img.src = "img/haze.png";
      break;
    case "Mist":
      img.src = "img/mist.png";
      break;
    case "Drizzle":
      img.src = "img/rain.png";
      break;
    default:
      img.src = "";
  }

  temperature.innerHTML = `${(weatherJSON.main.temp - 273.15).toFixed(
    0
  )}<span>°C</span>`;
  description.innerHTML = `${weatherJSON.weather[0].description}`;
  humidity.innerHTML = `${weatherJSON.main.humidity}%`;
  wind.innerHTML = `${parseInt(weatherJSON.wind.speed)}Km/h`;

  weatherBox.style.display = "";
  weatherBox.classList.add("fadeIn");
  weatherDetails.style.display = "";
  weatherDetails.classList.add("fadeIn");
  container.style.height = "650px";

  if (window.matchMedia("(max-width: 365px)").matches){
    container.style.height = "400px";
  }
}

search.addEventListener("click", handleClick);

input.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    handleClick();
  }
});
