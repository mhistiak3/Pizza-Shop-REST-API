// dependencies
import express from "express";
import { APP_PORT } from "./config";

// app object
const app = express();

// listening server
app.listen(APP_PORT, () => console.log(`Server start on: http://localhost:${APP_PORT}`));
