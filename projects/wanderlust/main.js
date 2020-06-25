"use strict";


// Foursquare API Info
try {
  console.log(config);
} catch (err) {
  if (err instanceof ReferenceError) { // Handle 
    alert('API KEYS are undefined!');
    throw new Error('API KEYS are undefined!');
  }
}

const clientId = config.FOUR_SQUARE_CLIENT_ID;
const clientSecret = config.FOUR_SQUARE_CLIENT_SECRET;
const openWeatherKey = config.OPENWEATHER_API_KEY;

const url = 'https://api.foursquare.com/v2/venues';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';


// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = todaysDate();

// Add AJAX functions here:
const getVenueDetails = async (venue) => {

  const urlToFetch = [url, 'venues', venue.id].join('/');
  const response = await fetch(urlToFetch);

  if (response.ok) {
    const jsonResponse = await response.json();
    const details = await jsonResponse.response;
    return {
      venue: venue,
      details: details,
    };
  }

};


const getVenues = async (city) => {

  const urlToFetch = [
     url + '/explore?near=' + city,
    '&limit=' + 10,
    '&client_id=' + clientId,
    '&client_secret=' + clientSecret,
    '&v=' + today,
  ].join('');
  //   console.log(urlToFetch);

  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    const venues = await jsonResponse.response
      .groups[0].items
      .map(item => 
        getVenueDetails(item.venue)
      );
    return venues;
  }


};


const getForecast = async (city) => {

  const urlToFetch = [
    weatherUrl,
    '?&q=' + city,
    '&APPID=' + openWeatherKey,
  ].join('');
  // console.log(urlToFetch);

  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  };

};


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueContent = createVenueHTML(venue);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);

};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");

  const city = $input.val();

  getVenues(city || 'sydney')
    .then(venues => 
      renderVenues(venues)
    );
  // .then(venues => console.log(venues));

  getForecast(city || 'sydney')
    .then(forecast =>
      renderForecast(forecast)
    );
  // .then(forecast => console.log(forecast));

  return false;
}

$submit.click(executeSearch)