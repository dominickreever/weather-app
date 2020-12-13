// Handle user input to return correct data

const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  getLocation();
  form.reset();
}

function getLocation() {
  const input = document.querySelector('input[type="text"]');
  const location = input.value;
  getWeather(location);
}

async function getWeather(location) {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=10db6a9dd5afaca5cf1fe1e960dbe7bf`, {mode: 'cors'});
  const weatherData = await response.json();
  console.log(weatherData)
  processWeather(weatherData);
}

// Process weather data into a usable format
// Temperature data from API measured in Kelvin

function toFahrenheit(k) {
  return Math.round(k * 9/5 - 459.67);
}

function toCelsius(k) {
  return Math.round(k - 273.15);
}

function processWeather(weatherData) {
  const formattedData = {
    condition: weatherData.weather[0].main,
    feelsLike: {
      f: toFahrenheit(weatherData.main.feels_like),
      c: toCelsius(weatherData.main.feels_like),
    },
    currentTemp: {
      f: toFahrenheit(weatherData.main.temp),
      c: toCelsius(weatherData.main.temp),
    },
    humidity: weatherData.main.humidity,
    location: weatherData.name.toUpperCase()
  };
  console.log(formattedData)
  displayData(formattedData);
}

// Display data on page

function displayData(formattedData) {
      document.querySelector('.temp').textContent = `${formattedData.currentTemp.c} ℃`;
      document.querySelector('.feels-like').textContent = `Feels Like: ${formattedData.feelsLike.c} ℃`; 
/*
      document.querySelector('.temp').textContent = `${formattedData.currentTemp.f} ℉`;
      document.querySelector('.feels-like').textContent = `Feels Like: ${formattedData.feelsLike.f} ℉`;
*/
  document.querySelector('.location').textContent = formattedData.location;
  document.querySelector('.condition').textContent = formattedData.condition;
  document.querySelector('.humidity').textContent = `Humidity: ${formattedData.humidity}%`;
}

getLocation("New York");

/*
// Receive gif data
function getGif() {
  fetch('https://api.giphy.com/v1/gifs/translate?api_key=kArV8hWY3k6g9psYaNSYrpSWDirGkpTA&s=weather', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
    });
}
getGif();
*/
