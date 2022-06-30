const apiGeoLocation = {
  endpoint: "https://ipgeolocation.abstractapi.com/v1/",
  key: "4700552696e84898962e2457fcf5bc91",
};

const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "a22a507a58126402ba60c7bacce766e4",
};

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

function enter(e) {
  if (e.keyCode === 13) {
    getInfo(input.value);
  }
}

async function getGeoLocation() {
  const resGeoLocation = await fetch(
    `${apiGeoLocation.endpoint}?api_key=${apiGeoLocation.key}`
  );
  const resultGeoLocation = await resGeoLocation.json();
  getInfo(resultGeoLocation.city);
}

getGeoLocation();

async function getInfo(data) {
  const res = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
  );
  const result = await res.json();
  displayResult(result);
}

function displayResult(result) {
  let city = document.querySelector("#city");
  city.textContent = `${result.name}, ${result.sys.country}`;

  getOurDate();

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML =
    `<i class="fa-solid fa-temperature-half"></i> ` +
    "Feels like: " +
    `${Math.round(result.main.feels_like)}<span>°</span>`;

  let conditions = document.querySelector("#conditions");
  conditions.innerHTML = `<i class="fa-solid fa-cloud-sun"></i> ` + `${result.weather[0].description}`;

  let variation = document.querySelector("#variation");
  variation.innerHTML = `<i class="fa-solid fa-temperature-quarter"></i> ` + 
    "Min: " +
    `${Math.round(result.main.temp_min)}<span>°</span>` +
    " " +
    " " +
    `<i class="fa-solid fa-temperature-full"></i> ` + 
    "Max: " +
    `${Math.round(result.main.temp_max)}<span>°</span>`;
}

function getOurDate() {
  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let weekday = days[today.getDay()];

  let day = today.getDate();

  let month = months[today.getMonth()];

  let year = today.getFullYear();

  let showdate = document.querySelector("#date");
  showdate.textContent =
    `${weekday}` + " " + `${day}` + " " + `${month}` + " " + `${year}`;
}
