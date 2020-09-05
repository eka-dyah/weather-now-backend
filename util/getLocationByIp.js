const axios = require("axios");
const HttpError = require("../models/http-error");
const { url, key } = require("../config").weatherApi;

const getLocationByIp = async (ipAddress, next) => {
    // default city : London
    let defaultCity;
    try {
        defaultCity = await axios.get(`${url}search.json?${key}&q=london`);
    } catch (error) {
        return next(new HttpError("Something error", 502));
    }

	let location;
	try {
        location = await axios.get(`${url}ip.json?${key}&q=${ipAddress}`);
	} catch (err) {
		location = defaultCity.data[0];
	}

	if (Object.entries(location.data).length === 0) {
		return next(new HttpError("Something error", 500));
	}
    
    const locationReturn = {
        id: location.data.geoname_id,
        name: `${location.data.city}, ${location.data.country_name}`,
        region: location.data.region,
        country: location.data.country_name,
        lat: location.data.lat,
        lon: location.data.lon
    }

	return locationReturn;
};

module.exports = getLocationByIp;
