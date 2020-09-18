const timeOnTimezone = require("./timeOnTimezone");
const windDegreeConverter = require("./windDegreeConverter");

const optionsFormatDate = (hour12 = true) => {
	return {
		hour: "numeric",
		minute: "numeric",
		hour12,
		day: "numeric",
		weekday: "long",
		month: "short",
		year: "numeric",
	};
};

const optionsFormatTime = (hour12 = true) => {
	return {
		hour: "numeric",
		minute: "numeric",
		hour12,
	};
};

const modifiedCurrentData = (current, timezoneOffset) => {
	const currentTime = timeOnTimezone(current.dt, timezoneOffset);

	const currentNew = {
		temp: current.temp,
		unit: "C",
		time24: currentTime.toLocaleString("en-US", optionsFormatDate(false)),
		time12: currentTime.toLocaleString("en-US", optionsFormatDate()),
		dt: current.dt,
		weather: {
			...current.weather[0],
			icon: `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
		},
		info: [
			{
				title: "Feels Like",
				value: current.feels_like,
				subsup: "<sup>o</sup>",
				unit: "C",
			},
			{
				title: "UV Index",
				value: current.uvi,
				subsup: null,
				unit: "",
			},
			{
				title: "Clouds",
				value: current.clouds,
				subsup: null,
				unit: "%",
			},
			{
				title: "Humidity",
				value: current.humidity,
				subsup: null,
				unit: "%",
			},
			{
				title: "Wind speed",
				value: windDegreeConverter(
					current.wind_deg,
					current.wind_speed
				),
				subsup: null,
				unit: "m/s",
			},
			{
				title: "Sunrise",
				dt: current.sunrise,
				value: timeOnTimezone(
					current.sunrise,
					timezoneOffset
				).toLocaleString("en-US", optionsFormatTime()),
				subsup: null,
				unit: "",
			},
			{
				title: "Sunset",
				dt: current.sunset,
				value: timeOnTimezone(
					current.sunset,
					timezoneOffset
				).toLocaleString("en-US", optionsFormatTime()),
				subsup: null,
				unit: "",
			},
		],
	};

	return currentNew;
};

module.exports = modifiedCurrentData;
