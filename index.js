const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const HttpError = require("./models/http-error");

const app = express();

const currentRouter = require("./routes/weather");
const locationRouter = require("./routes/location");

app.use(bodyParser.json());
app.use(logger("dev"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000, weathernow-app.web.app, weathernow-app.firebaseapp.com");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	next();
});

app.use("/current", currentRouter);

app.use("/location", locationRouter);

app.use((req, res, next) => {
	const error = new HttpError("Not found", 404);
	throw error;
});

app.use((error, req, res, next) => {
	res.status(error.code || 500).json({
		error: error.code || 500,
		message: error.message || "An unknown error occured",
	});
});

app.listen(process.env.PORT || 8000);
