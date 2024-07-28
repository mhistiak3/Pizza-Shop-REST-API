// dependencies
import express from "express";
import { registerController } from "../controllers";

// Application Routes
const router = express.Router();

// register a user
router.post("/register", registerController.register);

export default router;
