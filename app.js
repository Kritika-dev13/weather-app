const apiKey = "0df20f921c54d42b114839063efcabb6";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeatherByLocation(city) {
  try {
    const resp = await fetch(url(city));
    const data = await resp.json();

    if (data.cod === 404) {
      main.innerHTML = `<h2>❌ City not found</h2>`;
      return;
    }

    addWeatherToPage(data);
  } catch (error) {
    main.innerHTML = `<h2>⚠️ Error fetching weather</h2>`;
  }
}

function addWeatherToPage(data) {
  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      ${Math.round(data.main.temp)}°C
    </h2>
    <small>${data.weather[0].main}</small>
  `;

  main.innerHTML = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value.trim();
  if (city) getWeatherByLocation(city);
});
