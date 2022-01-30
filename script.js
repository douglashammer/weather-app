const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');
const weatherIcon = document.getElementById('weather-img');
const city = document.getElementById('city');
const conditions = document.getElementById('conditions');
const tempF = document.getElementById('temp-f');
const tempC = document.getElementById('temp-c');
const tempHighF = document.getElementById('hi-temp-f');
const tempHighC = document.getElementById('hi-temp-c');
const tempLowF = document.getElementById('low-temp-f');
const tempLowC = document.getElementById('low-temp-c');
const key = 'a4249fd3cf6bd3f2078d25a5c4a3e0ec';

window.onload = () => {
	navigator.geolocation.getCurrentPosition(geoSuccess, geoErr);
};

const geoSuccess = (position) => {
	let { latitude, longitude } = position.coords;
	getWeatherByCoords(latitude, longitude);
};

const geoErr = () => {
	getWeatherByCity('Los Angeles');
};

const getWeatherByCoords = async (lat, lon) => {
	const base = `https://api.openweathermap.org/data/2.5/weather`;
	const query = `?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;

	const response = await fetch(base + query);
	const data = await response
		.json()
		.then((data) => {
			weatherUI(data);
		})
		.catch((err) => {
			alert(err.message);
		});
};

const getWeatherByCity = async (city) => {
	const base = `https://api.openweathermap.org/data/2.5/weather`;
	const query = `?q=${city}&units=imperial&appid=${key}`;

	const response = await fetch(base + query);
	const data = await response
		.json()
		.then((data) => {
			weatherUI(data);
		})
		.catch((err) => {});
};

const weatherUI = (data) => {
	city.textContent = `${data.name}, ${data.sys.country}`;
	conditions.textContent = data.weather[0].main;

	tempF.textContent = Math.round(data.main.temp);
	tempC.textContent = Math.round((tempF.textContent - 32) / 1.8);

	tempHighF.textContent = Math.round(data.main.temp_max);
	tempHighC.textContent = Math.round((tempHighF.textContent - 32) / 1.8);

	tempLowF.textContent = Math.round(data.main.temp_min);
	tempLowC.textContent = Math.round((tempLowF.textContent - 32) / 1.8);

	const icon = data.weather[0].icon;
	const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
	weatherIcon.src = iconURL;
};

const resetSearch = () => {
	searchInput.value = '';
};

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	getWeatherByCity(searchInput.value);
	resetSearch();
});

const tempToggle = document.querySelector('.switch-button-checkbox');
tempToggle.addEventListener('click', (e) => {
	if (tempToggle.checked) {
		tempF.style.display = 'none';
		tempHighF.style.display = 'none';
		tempLowF.style.display = 'none';

		tempC.style.display = 'block';
		tempHighC.style.display = 'block';
		tempLowC.style.display = 'block';
	} else {
		tempC.style.display = 'none';
		tempHighC.style.display = 'none';
		tempLowC.style.display = 'none';

		tempF.style.display = 'block';
		tempHighF.style.display = 'block';
		tempLowF.style.display = 'block';
	}
});
