const timeOnTimezone = (time, timezoneOffset) => {
	return new Date(
		time * 1000 +
			new Date().getTimezoneOffset() * 60 * 1000 +
			timezoneOffset * 1000
	);
};

module.exports = timeOnTimezone;
