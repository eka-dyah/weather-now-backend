const timeOnTimezone = require("./timeOnTimezone");
const windDegreeConverter = require("./windDegreeConverter");

const optionsFormatTime = (hour12 = true) => {
	return {
		hour: "numeric",
		minute: "numeric",
		hour12,
	};
};

const modifiedHourlyData = (hourly, timezoneOffset) => {
	const hourlyNew = hourly.map((data) => {
		const time = timeOnTimezone(data.dt, timezoneOffset);
		return {
            dt: data.dt,
			time12: time.toLocaleString("en-US", optionsFormatTime()),
			time24: time.toLocaleString("en-US", optionsFormatTime(false)),
			weather: {
				...data.weather[0],
				icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
			},
			info: [
				{
					title: "Temp",
					value: data.temp,
					subsup: "<sup>o</sup>",
					unit: "C",
				},
				{
					title: "Feels Like",
					value: data.feels_like,
					subsup: "<sup>o</sup>",
					unit: "C",
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
    return hourlyNew;
};


module.exports = modifiedHourlyData;
