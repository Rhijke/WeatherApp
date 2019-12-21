if (process.env.NODE_ENV !== 'production') {
  console.log('require dotenv');
  require('dotenv').config();
}
import config from '../config';
const key1 = config.MAPQUEST_KEY;
const key2 = config.DARKSKY_KEY;
const proxy = 'https://cors-anywhere.herokuapp.com/';

window.addEventListener('load', () => {
  let long, latitude, location, celcius, temperature;
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.temperature-section');
  const temperatureSpan = document.querySelector(
    '.temperature-section span h2'
  );
  const searchInput = document.querySelector('.search form input');
  const searchSubmit = document.querySelector('.search form i');
  const weeklyTemps = [
    document.querySelector('#monday p'),
    document.querySelector('#tuesday p'),
    document.querySelector('#wednesday p'),
    document.querySelector('#thursday p'),
    document.querySelector('#friday p'),
    document.querySelector('#saturday p'),
    document.querySelector('#sunday p')
  ];

  // Handle weather search
  searchInput.addEventListener('keydown', e => {
    if (e.keyCode == 13) {
      e.preventDefault();
      console.log('Search bar clicked');
      location = document.getElementById('search-form').elements[
        'search-location'
      ].value;
      getLocation();
      temperatureDegree.removeEventListener('click', convertDegrees);
      weeklyTemperature.removeEventListener('click', convertDegreesWeekly);
    }
  });

  searchSubmit.addEventListener('click', e => {
    console.log('Clicked seardch submit');
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
    const api = `${proxy}https://www.mapquestapi.com/geocoding/v1/address?key=${key1}&location=${location.replace(
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
        locationTimezone.textContent = `${data.results[0].locations[0].adminArea5}, ${data.results[0].locations[0].adminArea3}`;
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
      const api = `${proxy}http://open.mapquestapi.com/geocoding/v1/reverse?key=${key1}&location=${latitude},${long}&`;
      fetch(api)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          locationTimezone.textContent = `${data.results[0].locations[0].adminArea5}, ${data.results[0].locations[0].adminArea3}`;
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
