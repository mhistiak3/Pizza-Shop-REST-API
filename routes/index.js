// dependencies
import express from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
} from "../controllers";
import auth from "../middleware/auth";

// Application Routes
const router = express.Router();

// register a user
router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me",auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout",auth, loginController.logout);

export default router;
