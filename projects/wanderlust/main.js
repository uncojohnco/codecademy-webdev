"use strict";

// API KEYS
if (Object.values(config).includes('')) {
  const msg = `API KEYS are undefined!\n ${JSON.stringify(config)}`;
  console.log(msg);
  alert(msg);
  throw new Error('API KEYS are undefined!');
}
const clientId = config.FOUR_SQUARE_CLIENT_ID;
const clientSecret = config.FOUR_SQUARE_CLIENT_SECRET;
const openWeatherKey = config.OPENWEATHER_API_KEY;


const BASE_URL = 'https://api.foursquare.com/v2/venues/';
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
const fetchVenueDetails = async (venueid) => {

  const urlToFetch = [
    BASE_URL, venueid,
    '?client_id=' + clientId,
    '&client_secret=' + clientSecret,
    '&v=' + today,
  ].join('');
  // console.log(urlToFetch);

  const response = await fetch(urlToFetch);

  if (response.ok) {
    const jsonResponse = await response.json();
    return await jsonResponse.response.venue;
  } else {
    const jsonResponse = await response.text();
    console.log('Failed to fetch venue details!', jsonResponse)
  }

};


const fetchVenues = async (city) => {

  const urlToFetch = [
    BASE_URL + 'explore',
    '?client_id=' + clientId,
    '&client_secret=' + clientSecret,
    '&near=' + city,
    '&limit=' + 10,
    '&v=' + today,
  ].join('');
  //   console.log(urlToFetch);

  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    return await jsonResponse.response.groups[0]
      .items;
  }

};


const getVenues = async (city) => {

  //  Check if venueData exists in localStorage
  if (
    localStorage.getItem('city') === city &&
    localStorage.getItem('venueData')
  ) {
    console.log(`Retriving venueData for ${city} from localStorage`);
    const venueData = localStorage.getItem('venueData');
    return JSON.parse(venueData);
  }

  const venues = await fetchVenues(city)

  const venueData = await Promise.all(
    venues.map(async (v) => {
      const venue = v.venue;
      venue.details = await fetchVenueDetails(v.venue.id);
      return venue;
    })
  );

  localStorage.setItem('city', city);
  localStorage.setItem('venueData', venueData);
  console.log(`Cache venueData for ${city} in localStorage`);

  return venueData;
}


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

const resetPage = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
};


const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);

};


const renderVenues = (venues) => {

  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueContent = createVenueHTML(venue);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);

};


const updatePage = () => {

  const city = $input.val() || 'sydney';

  getForecast(city)
    .then(forecast =>
      renderForecast(forecast)
    );
  // .then(forecast => console.log(forecast));

  getVenues(city)
    .then(venues =>
      renderVenues(venues)
    );
  // .then(venues => console.log(venues));
}


const executeSearch = () => {

  resetPage();
  updatePage();

  return false;
}

$submit.click(executeSearch)