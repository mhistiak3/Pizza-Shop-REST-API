// dependencies
import express from "express";
import { APP_PORT, DB_URL } from "./config";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import mongoose from "mongoose";

// app object
const app = express();

// database connection
mongoose
  .connect(DB_URL, {})
  .then(() => console.log(`Connect Successful`))
  .catch((err) => console.log(err));


// Application Middlware
app.use(express.json())

// Routes Middleware
app.use("/api", routes);

// Error Handling Middleware
app.use(errorHandler);

// listening server
app.listen(APP_PORT, () =>
  console.log(`Server start on: http://localhost:${APP_PORT}`)
);
