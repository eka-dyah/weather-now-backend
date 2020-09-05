const express = require("express");
const { default: Axios } = require("axios");

const getLocation = require("../util/getLocation");
const HttpError = require("../models/http-error");
const { url, key } = require("../config").weatherApi;

const route = express.Router();

route.route("/").post(async (req, res, next) => {
	const location = await getLocation(req.body.loc, req.body.ip, next);
	
	if (!location) {
		return next(new Error());
	}

	res.json({ location });
});

route.route("/update").post(async (req, res, next) => {
	let location = {};

	try {
		location = await Axios.get(
			`${url}search.json?${key}&q=${req.body.loc}`
        );
	} catch (error) {
        return next(new HttpError(error, 500));
	}

	if (!location) {
		return next(new Error());
	}

	if (location.data.length === 0) {
        return next(new HttpError("Not found", 404));
	}

	res.json({ location: location.data[0] });
});

module.exports = route;
