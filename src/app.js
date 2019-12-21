if (process.env.NODE_ENV !== 'production') {
  console.log('require dotenv');
  require('dotenv').config();
}

require('dotenv').config();
console.log(process.env);
const key1 = 'pWYAAr0tBI1nbA6qjNhzi9Y6MY5ySP0a';
const key2 = '4fae24c3fba51aed589f8d54e76ef903';
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
    console.log('Search bar clicked');
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
      temperatureDegree.textContent = celcius;
      temperatureSpan.textContent = 'C';
    } else {
      temperatureSpan.textContent = 'F';
      temperatureDegree.textContent = temperature;
    }
  };
  var convertDegreesWeekly = function() {
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
    console.log('Called getlocation()');
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `http://www.mapquestapi.com/geocoding/v1/address?key=${key1}&location=${location.replace(
      /_/,
      '+'
    )}`;
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('Search for ' + location);
        console.log(data);
        const { lat, lng } = data.results[0].locations[0].latLng;
        latitude = lat;
        long = lng;
        locationTimezone.textContent = data.results[0].formatted_address.replace(
          /_/,
          ' '
        );
        console.log('Data: \n' + data);
      })
      .then(() => {
        getWeather();
      });
  }

  if (navigator.geolocation && !location) {
    console.log('No location searched');
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      latitude = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}http://open.mapquestapi.com/geocoding/v1/reverse?key=${key1}&location=${latitude},${long}&`;
      fetch(api)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          locationTimezone.textContent =
            data.results[0].locations[0].adminArea5;
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
    console.log('getWeather()');
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
