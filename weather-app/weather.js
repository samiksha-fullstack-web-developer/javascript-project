    // 1. WeatherAPI credentials
    let weatherApi = {
      key: "41efe43089e74e23b73124144250108",
      baseUrl: "https://api.weatherapi.com/v1/current.json"
    };

    // 2. On page load – try to fetch user location
    window.onload = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    function successCallback(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const coords = `${lat},${lon}`;
      getWeather(coords); // Get weather using lat,lng
    }

    function errorCallback(error) {
      console.warn("Geolocation error:", error.message);
    }

    // 3. Event Listener: On Enter key press, fetch weather
    let searchbox = document.getElementById("input-box");
    searchbox.addEventListener('keypress', function (e) {
      if (e.code === "Enter") {
        getWeather(searchbox.value);
      }
    });

    // 4. Get weather from WeatherAPI
    function getWeather(location) {
      fetch(`${weatherApi.baseUrl}?key=${weatherApi.key}&q=${location}`)
        .then(response => response.json())
        .then(showWeather)
        .catch(err => {
          console.log("Error fetching weather:", err);
          document.getElementById("city").innerText = "Location not found";
        });
    }

    // 5. Show weather on screen
    function showWeather(weather) {
      let city = document.getElementById('city');
      city.innerText = `${weather.location.name}, ${weather.location.country}`;

      let temp = document.getElementById('temp');
      temp.innerHTML = `${Math.round(weather.current.temp_c)}&deg;C`;

      let minmax = document.getElementById('max-min');
      minmax.innerHTML = `Feels like: ${weather.current.feelslike_c}&deg;C`;

      let status = document.getElementById('status');
      status.innerHTML = `${weather.current.condition.text}`;
      // Change background video based on weather
      let condition = weather.current.condition.text.toLowerCase();

      let video = document.getElementById("weather-video");
      let videoSource = video.querySelector("source");

      if (condition.includes("clear") || condition.includes("sunny")) {
        videoSource.src = "/src/clear.mp4";
      } else if (condition.includes("cloud")) {
        videoSource.src = "/src/cloud.mp4";
      } else if (condition.includes("rain")) {
        videoSource.src = "/src/rainy.mp4";
      } else if (condition.includes("snow")) {
        videoSource.src = "/src/snow.mp4";
      } else if (condition.includes("thunder")) {
        videoSource.src = "/src/thunderstrom.mp4";
      } else if (condition.includes("haze") || condition.includes("fog") || condition.includes("mist")) {
        videoSource.src = "/src/haze.mp4";
      } else {
        videoSource.src = "/src/clear.mp4"; // default
      }

      video.load(); // Reload new video
    }

    // 6. Show date
    function showdaymonth() {
      let daymonth = new Date();
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      let day = daymonth.getDay();
      let month = daymonth.getMonth();
      let year = daymonth.getFullYear();
      let date = daymonth.getDate();
      let currentfullday = `${date} ${months[month]} (${days[day]}), ${year}`;
      document.getElementById("date").innerHTML = currentfullday;
    }
    showdaymonth();