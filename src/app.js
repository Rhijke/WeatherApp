if (process.env.NODE_ENV !== 'production') {
  console.log('require dotenv');
  require('dotenv').config();
}
const key1 = process.env.GOOGLE_KEY;
const key2 = process.env.DARK_SKY_KEY;
console.log(`${key1} ${key2}`);
window.addEventListener('load', () => {
  let long, latitude, location, celcius, temperature;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature-section');
  const temperatureSpan = document.querySelector(
    '.temperature-section span h2'
  );
  let searchBar = document.querySelector('.search form i');
  let weeklyTemps = [
    document.querySelector('#monday p'),
    document.querySelector('#tuesday p'),
    document.querySelector('#wednesday p'),
    document.querySelector('#thursday p'),
    document.querySelector('#friday p'),
    document.querySelector('#saturday p'),
    document.querySelector('#sunday p')
  ];
  searchBar.addEventListener('click', () => {
    location = document.getElementById('search-form').elements[
      'search-location'
    ].value;
    getLocation();
    temperatureDegree.removeEventListener('click', convertDegrees);
    weeklyTemperature.removeEventListener('click', convertDegreesWeekly);
  });
  let weeklyTemperature = document.querySelector('.temperature-weekly h2');
  const weeklyTemperatureSpan = document.querySelector(
    '.temperature-weekly h2 span'
  );
  var convertDegrees = function() {
    console.log('clicked currently');
    if (temperatureSpan.textContent === 'F') {
      console.log('F');
      temperatureDegree.textContent = celcius;
      temperatureSpan.textContent = 'C';
    } else {
      console.log('C');
      temperatureSpan.textContent = 'F';
      temperatureDegree.textContent = temperature;
    }
  };
  var convertDegreesWeekly = function() {
    console.log('clicked qweekly');
    if (weeklyTemperatureSpan.textContent === '(F)') {
      for (let i = 0; i < 7; i++) {
        weeklyTemps[i].textContent = Math.floor(
          (weeklyTemps[i].textContent - 32) * (5 / 9)
        );
      }
      weeklyTemperatureSpan.textContent = '(C)';
    } else {
      for (let i = 0; i < 7; i++) {
        weeklyTemps[i].textContent = Math.floor(
          (weeklyTemps[i].textContent =
            weeklyTemps[i].textContent * (9 / 5) + 33)
        );
      }
      weeklyTemperatureSpan.textContent = '(F)';
    }
  };

  function getLocation() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.replace(
      /_/,
      '+'
    )}&key=${key1}`;
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { lat, lng } = data.results[0].geometry.location;
        latitude = lat;
        long = lng;
        locationTimezone.textContent = data.results[0].formatted_address.replace(
          /_/,
          ' '
        );
        console.log(data);
      })
      .then(() => {
        getWeather();
      });
  }

  if (navigator.geolocation && !location) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      latitude = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${long}&key=${key1}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          locationTimezone.textContent = data.results[7].formatted_address;
        });
      getWeather();
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function getWeather() {
    console.log(`${location} lat = ${latitude} long = ${long}`);
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/${key2}/${latitude},${long}`;
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(info => {
        console.log(info);
        const { temperature, summary, icon } = info.currently;
        const { data } = info.daily;
        // set DOM elements from API
        temperatureSpan.textContent = 'F';
        temperatureDegree.textContent = Math.floor(temperature);
        temperatureDescription.textContent = summary;

        console.log(data);
        // Initialise weekly temperatures
        for (let i = 0; i < 7; i++) {
          weeklyTemps[i].textContent = Math.floor(
            data[i].apparentTemperatureMax
          );
        }
        // Set icon
        setIcons(icon, document.querySelector('.icon'));
      })
      .then(() => {
        temperature = temperatureDegree.textContent;
        celcius = Math.floor((temperature - 32) * (5 / 9));
        // Allow user to convert from F to C, vice versa
        temperatureSection.addEventListener('click', convertDegrees);
        weeklyTemperature.addEventListener('click', convertDegreesWeekly);
      });
  }
});
