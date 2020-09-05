const getLocationByIp = require("./getLocationByIp");

const validationDataLoc = {
	id: { type: "number", max: null, min: null },
	name: { type: "string", max: null, min: null },
	region: { type: "string", max: null, min: null },
	country: { type: "string", max: null, min: null },
	lat: { type: "number", max: 90, min: -90 },
	lon: { type: "number", max: 180, min: -180 },
};

const validateLoc = (location, validationLoc) => 
    Object.keys(validationLoc).every(key => {
        if (!Object.keys(location).includes(key)) {
            return false;
        }
        if (typeof location[key] !== validationLoc[key].type) {
            return false;
        }
        if (validationLoc[key].max !== null) {
            if (!(location[key] < validationLoc[key].max)) {
                return false;
            }
        }
        if (validationLoc[key].min !== null) {
            if (!(location[key] > validationLoc[key].min)) {
                return false;
            }
        }
        return true;
    })

const getLocation = async (loc, ip, next) => {
	let location;

	try {
		if (!(typeof loc === "object" && loc !== null)) {
			throw new Error();
		} else if (!validateLoc(loc, validationDataLoc)) {
            throw new Error();
        }
        location = loc;
	} catch (err) {
		location = await getLocationByIp(ip, next);
	}

	if (!location) {
		return next(new Error());
	}

	return location;
};

module.exports = getLocation;
