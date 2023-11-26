let weather = {
  apiKey: "fa3a28fc983e9aa1a93928146c0fec55",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found!  \nPlease type the correct name of the city.");
          throw new Error("No weather found!  \nPlease type the correct name of the city.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    const { temp } = data.main;
    const { humidity } = data.main;
    const { temp_min } = data.main;
    const { temp_max } = data.main;
    const { feels_like } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText =
      "Weather in " + name + ", " + country;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".temp_max_min").innerText =
      temp_max + "° | " + temp_min + "°";
    document.querySelector(".feels_like").innerText =
      "Feels like: " + feels_like + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Budapest");
