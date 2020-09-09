const { default: Axios } = require("axios");
const modifiedCurrentData = require("./additional/modifiedCurrentData.js");
const modifiedHourlyData = require("./additional/modifiedHourlyData.js");
const modifiedDailyData = require("./additional/modifiedDailyData.js");
const HttpError = require("../models/http-error.js");
const modifiedTomorrowData = require("./additional/modifiedTomorrowData.js");
const { url, key } = require("../config.js").openWeather;

const getWeatherData = async (latitude, longitude, next) => {
	let current;

	try {
		current = await Axios.get(
			`${url}onecall?${key}&lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely`
		);
	} catch (error) {
		return next(new HttpError(error, 500));
	}

	if (Object.entries(current.data).length === 0) {
		return next(new HttpError(error, 500));
	}

	const atZeroHourUTC = new Date();
	atZeroHourUTC.setUTCHours(0, 0, 0, 0);

	const atZeroHourFixedTimeZone = new Date(
		atZeroHourUTC.valueOf() - current.data.timezone_offset * 1000
	);

	const atTwentyThreeHourUTC = new Date();
	atTwentyThreeHourUTC.setUTCHours(23, 0, 0, 0);

	const atTwentyThreeHourFixedTimeZone = new Date(
		atTwentyThreeHourUTC.valueOf() - current.data.timezone_offset * 1000
	);

	if (
		!current.data.hourly.some(
			(time) => time.dt === atZeroHourFixedTimeZone.valueOf() / 1000
		)
	) {
		let extended;

		try {
			extended = await Axios.get(
				`${url}onecall/timemachine?${key}&lat=${latitude}&lon=${longitude}&units=metric&dt=${
					atZeroHourFixedTimeZone.valueOf() / 1000
				}`
			);
		} catch (error) {
			console.log("error", error);
		}

		if (Object.entries(extended.data).length === 0) {
			extended.data = [{ error: "An error has occured" }];
		} else {
			current.data.hourly.unshift(...extended.data.hourly);
		}
	}

	current.data.tomorrow = current.data.hourly.filter(
		(time) =>
			time.dt > atTwentyThreeHourFixedTimeZone.valueOf() / 1000
	);

	current.data.hourly = current.data.hourly.filter(
		(time) =>
			time.dt >= atZeroHourFixedTimeZone.valueOf() / 1000 &&
			time.dt <= atTwentyThreeHourFixedTimeZone.valueOf() / 1000
	);

	const currentNew = modifiedCurrentData(
		current.data.current,
		current.data.timezone_offset
	);
	const hourlyNew = modifiedHourlyData(
		current.data.hourly,
		current.data.timezone_offset
	);
	const tomorrowNew = modifiedTomorrowData(
		current.data.tomorrow,
		current.data.timezone_offset
	);
	const dailyNew = modifiedDailyData(
		current.data.daily,
		current.data.timezone_offset
	);

	const dataNew = {
		...current.data,
		current: currentNew,
		hourly: hourlyNew,
		tomorrow: tomorrowNew,
		daily: dailyNew,
	};

	return dataNew;
};

module.exports = getWeatherData;
