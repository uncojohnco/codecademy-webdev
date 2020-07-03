const createVenueHTML = (venue) => {

  const location = venue.location;

  const venueIcon = venue.categories[0].icon;
  const iconSource = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;

  let bestPhotoSource;
  if (venue.details) {
    const size = '300x300';
    const bestPhoto = venue.details.bestPhoto;
    bestPhotoSource = bestPhoto.prefix + size + bestPhoto.suffix;
  }

  return `
    <div class="venue-header">
      <img class="venue-icon" src="${iconSource}"/>
      <h2>${venue.name}</h2>
    </div>

    </div class="container">
      <div class="venue-address">
        <h3>Address:</h3>
        <p>${location.address}</p>
        <p>${location.city}</p>
        <p>${location.country}</p>
      </div>
      <img class="venue-photo" src="${bestPhotoSource}"/>
    </div>
    `;
};


const createWeatherHTML = (currentDay) => {

  const _getTemp = (_temp) => {
    const c = kelvinToCelsius(_temp);
    const f = celsiusToFahrenheit(c);
    return {
      c: c,
      f: f
    };
  }

  const temp = {
    main: _getTemp(currentDay.main.temp),
    feels_like: _getTemp(currentDay.main.feels_like),
    min: _getTemp(currentDay.main.temp_min),
    max: _getTemp(currentDay.main.temp_max),
  };

  console.log(currentDay);

  const day = weekDays[new Date().getDay()];
  const weather = currentDay.weather[0];


  const srcImg = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return `
    <h2>Today: ${day}</h2>

    <h2>Condition: ${weather.description}</h2>
    <img src="${srcImg}">
    <h2>Temperature: ${temp.main.c}&deg;C,${temp.main.f}&deg;F</h2>
    <h2>Feels_like: ${temp.feels_like.c}&deg;C,${temp.feels_like.f}&deg;F</h2>
    <h2>Min: ${temp.min.c}&deg;C,${temp.min.f}&deg;F</h2>
    <h2>Max: ${temp.max.c}&deg;C,${temp.max.f}&deg;F</h2>

    <h2>Pressure: ${currentDay.main.pressure} hPa</h2>
    <h2>Humidity: ${currentDay.main.humidity}%</h2>
  `;
};

const kelvinToCelsius = (k) => (k - 273.15).toFixed(0);
const celsiusToFahrenheit = (c) => ((c * 9 / 5) + 32).toFixed(0);

function todaysDate() {
  //https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date

  const _pad = (str) => ("0" + str).slice(-2);

  const d = new Date();
  const YYYY = d.getFullYear();
  const MM = _pad(d.getMonth());
  const DD = _pad(d.getDate());

  return `${YYYY}${MM}${DD}`;
}
