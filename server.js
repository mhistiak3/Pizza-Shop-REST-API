// dependencies
import express from "express";
import { APP_PORT, DB_URL } from "./config";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import mongoose from "mongoose";
import path from "path";
import { extend } from "joi";

// app object
const app = express();

// global
global.appRoote = path.resolve(__dirname);

// database connection
mongoose
  .connect(DB_URL, {})
  .then(() => console.log(`Connect Successful`))
  .catch((err) => console.log(err));

// Application Middlware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Middleware
app.use("/api", routes);
app.use("/uploads",express.static('uploads'))

// Error Handling Middleware
app.use(errorHandler);

// listening server
app.listen(APP_PORT, () =>
  console.log(`Server start on: http://localhost:${APP_PORT}`)
);
