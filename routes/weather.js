const express = require("express");

const getWeatherData = require("../util/getWeatherData");

const route = express.Router();

route.route("/").post(async (req, res, next) => {
	const weatherData = await getWeatherData(req.body.lat, req.body.lon, next);

	if(!weatherData) {
		return next(new Error())
	}

	res.json({ ...weatherData });
});

module.exports = route;
