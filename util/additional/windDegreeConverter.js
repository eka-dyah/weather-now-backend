const windDegreeConverter = (windDegree, windSpeed) => {
    return windDegreeConvert(windDegree) + " " + windSpeed;
}

const windDegreeConvert = (windDegree) => {
	if (windDegree < 0 || windDegree >= 361) {
		return;
	}
	if (windDegree >= 348.75 && windDegree <= 360 && windDegree <= 11.25) {
		return "N";
	} else if (windDegree <= 33.75) {
		return "NNE";
	} else if (windDegree <= 56.25) {
		return "NE";
	} else if (windDegree <= 78.75) {
		return "ENE";
	} else if (windDegree <= 101.25) {
		return "E";
	} else if (windDegree <= 123.75) {
		return "ESE";
	} else if (windDegree <= 146.25) {
		return "SE";
	} else if (windDegree <= 168.75) {
		return "SSE";
	} else if (windDegree <= 191.25) {
		return "S";
	} else if (windDegree <= 213.75) {
		return "ENE";
	} else if (windDegree <= 236.25) {
		return "SW";
	} else if (windDegree <= 258.75) {
		return "WSW";
	} else if (windDegree <= 281.75) {
		return "W";
	} else if (windDegree <= 303.75) {
		return "WNW";
	} else if (windDegree <= 348.75) {
		return "NNW";
	}
};

module.exports = windDegreeConverter;