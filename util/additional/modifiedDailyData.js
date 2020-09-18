const timeOnTimezone = require("./timeOnTimezone");
const windDegreeConverter = require("./windDegreeConverter");

const optionsFormatTime = (hour12 = true) => {
	return {
		hour: "numeric",
		minute: "numeric",
		hour12,
	};
};

const optionsFormatDate = {
	day: "numeric",
	weekday: "short",
	month: "short",
	year: "numeric",
};

const modifiedDailyData = (daily, timezoneOffset) => {
	const dailyNew = daily.map((data) => {
		return {
			dt: data.dt,
			date: timeOnTimezone(data.dt, timezoneOffset).toLocaleString(
				"en-US",
				optionsFormatDate
			),
			weather: {
				...data.weather[0],
				icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
			},
			info: [
				{
					title: "Sunrise",
					value: timeOnTimezone(
						data.sunrise,
						timezoneOffset
					).toLocaleString("en-US", optionsFormatTime()),
					subsup: null,
					unit: "",
				},
				{
					title: "Sunset",
					value: timeOnTimezone(
						data.sunset,
						timezoneOffset
					).toLocaleString("en-US", optionsFormatTime()),
					subsub: null,
					unit: "",
				},
				{
					title: "Min Temp",
					value: data.temp.min,
					subsup: "<sup>o</sup>",
					unit: "C",
				},
				{
					title: "Max Temp",
					value: data.temp.max,
					subsup: "<sup>o</sup>",
					unit: "C",
				},
				{
					title: "UV Index",
					value: data.uvi,
					subsup: null,
					unit: "",
				},
				{
					title: "Clouds",
					value: data.clouds,
					subsup: null,
					unit: "%",
				},
				{
					title: "Humidity",
					value: data.humidity,
					subsup: null,
					unit: "%",
				},
				{
					title: "Wind speed",
					value: windDegreeConverter(data.wind_deg, data.wind_speed),
					subsup: null,
					unit: "m/s",
				},
			],
		};
	});
	return dailyNew;
};

module.exports = modifiedDailyData;