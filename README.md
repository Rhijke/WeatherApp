# WeatherApp
[Weather app](https://rhijke.github.io/WeatherAppDisplay/) displays current and weekly weather forecast.

## User Stories

The User can:

- [X] View the temperature in their current location.
- [X] Look up the temperature in another location.
- [X] View the weekly weather forecast.
- [X] Toggle temperature between Fahrenheit and Celcius.

## Notes

Weather information was fetched from **Dark Sky API** by using latitude and longitude coordinates.
**MapQuest Geocoding API's** reverse geocoding feature was used to allow the user to search for the weather in different locations.
**MapQuest Geocoding API** returned the latitude and longitude coordinates of a user's search which was then used to fetch the weather through **Dark Sky API**.

## Open-source libraries used

- [Dark Sky API](https://darksky.net/dev) - The Dark Sky API allows you to look up the weather anywhere on the globe
- [MapQuest Goeocoding API](https://developer.mapquest.com/documentation/geocoding-api/) - Geocoding API
- [Searchbar](https://codepen.io/menelaosly/pen/rZddyb) - Exapandable Searchbar Animation by Menelaos
