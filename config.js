module.exports = {
	openWeather: {
		url: "https://api.openweathermap.org/data/2.5/",
		key: "appid=" + process.env.OPENWEATHER_API_KEY,
	},
	weatherApi: {
		url: "https://api.weatherapi.com/v1/",
		key: "key=" + process.env.WEATHER_API_KEY,
	},
};
