const app = require("./app");
const connectDB = require("./config/database");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: "config/config.env" });
}

// Handling uncaught exception for eg if using an undefiend var
process.on("uncaughtException", (err) => {
	console.log("uncaughtException Error ---->", err.message);
	process.exit(1);
});
connectDB();
const server = app.listen(process.env.PORT, () => {
	console.log("server listening on port " + process.env.PORT);
});

// Unhandled Promise reject eg wrong connection string or some db expception
process.on("unhandledRejection", (err) => {
	console.log("Error: ", err.message);
	console.log("Shutting down server");
	server.close(() => {
		process.exit(1);
	});
});
