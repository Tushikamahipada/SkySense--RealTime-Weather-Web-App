const apiKey = "0aff9c9a8cc06dd9a563515b10fee17c";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorBox = document.getElementById("error-message");

const weatherFields = {
  location: document.getElementById("location"),
  temperature: document.getElementById("temperature"),
  description: document.getElementById("description"),
  humidity: document.getElementById("humidity"),
  windSpeed: document.getElementById("wind-speed"),
};

searchBtn.addEventListener("click", () => {
  getWeather(cityInput.value.trim());
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather(cityInput.value.trim());
});

function getWeather(city) {
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        showError(data.message);
        clearWeather();
        updateBackground("default");
      } else {
        errorBox.classList.add("hidden");
        showWeather(data);
        updateBackground(data.weather[0].main);
      }
    })
    .catch(() => {
      showError("Unable to fetch weather. Try again.");
      clearWeather();
      updateBackground("default");
    });
}

function showWeather(data) {
  const { name, sys, main, weather, wind } = data;
  weatherFields.location.innerText = `${name}, ${sys.country}`;
  weatherFields.temperature.innerText = `${Math.round(main.temp)}°C`;
  weatherFields.description.innerText = `${weather[0].main} (${weather[0].description})`;
  weatherFields.humidity.innerText = `${main.humidity}%`;
  weatherFields.windSpeed.innerText = `${wind.speed} m/s`;
}

function clearWeather() {
  Object.values(weatherFields).forEach(el => el.innerText = "");
}

function showError(message) {
  errorBox.innerText = `⚠️ ${message}`;
  errorBox.classList.remove("hidden");
}

function updateBackground(condition) {
  const body = document.body;
  const backgrounds = {
    clear: "sunny.jpg",
    clouds: "cloudy.jpg",
    rain: "rain.jpg",
    snow: "snow.jpg",
    thunderstorm: "thunderstorm.jpg",
    mist: "fog.jpg",
    fog: "fog.jpg",
    haze: "fog.jpg",
    drizzle: "rain.jpg",
  };
  const file = backgrounds[condition.toLowerCase()] || "default.jpg";
  body.style.backgroundImage = `url('background images/${file}')`;
}
