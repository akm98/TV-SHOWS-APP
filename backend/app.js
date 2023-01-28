const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: "config/config.env" });
}
const userRoutes = require("./routes/userRoutes");

const corsOptions = {
	origin: ["http://localhost:3000", "https://akashmishra-tvshows.vercel.app"],
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/", userRoutes);

module.exports = app;
