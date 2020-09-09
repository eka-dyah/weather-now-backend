const axios = require("axios");
const HttpError = require("../models/http-error");
const { url, key } = require("../config").weatherApi;

const getLocationByIp = async (ipAddress, next) => {
    // default city : Mountain view
    console.log(ipAddress);
    let defaultCity;
    try {
        defaultCity = await axios.get(`${url}search.json?${key}&q=Mountain%20view`);
    } catch (error) {
        return next(new HttpError("Something error", 502));
    }

	let location;
	try {
        location = await axios.get(`${url}ip.json?${key}&q=${ipAddress}`);
        location = location.data;
	} catch (err) {
		location = defaultCity.data[0];
    }
    
    if (!location) {
        return next(new HttpError("Something error", 500));
    }

	if (Object.entries(location).length === 0) {
		return next(new HttpError("Something error", 500));
	}
    
    const locationReturn = {
        id: location.id || location.geoname_id,
        name: location.name || `${location.city}, ${location.country_name}`,
        region: location.region,
        country: location.country_name,
        lat: location.lat,
        lon: location.lon
    }

	return locationReturn;
};

module.exports = getLocationByIp;
